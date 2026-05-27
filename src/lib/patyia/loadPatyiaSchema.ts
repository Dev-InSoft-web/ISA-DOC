import { parseTableFragment, type ParsedTable } from "../tableSchema.ts";

/**
 * Carga el esquema SQL Server de PatyIA y lo materializa como `ParsedTable[]`.
 *
 * - Consulta `INFORMATION_SCHEMA` y `sys.foreign_keys` para CADA base de datos
 *   en `DATABASES`, usando consultas calificadas `[DB].INFORMATION_SCHEMA.X`
 *   sobre la misma conexión expuesta por `/api/patyia/db/exec`.
 * - Prefija con `STG__` SOLAMENTE las tablas del entorno staging cuyo nombre
 *   también existe en producción (colisión). Las tablas únicas de staging
 *   conservan su nombre original. Esto se decide tras escanear todas las BDs
 *   y calcular el conjunto de nombres en colisión.
 * - Sintetiza un script `CREATE TABLE` con `PRIMARY KEY` inline y `REFERENCES`
 *   inline por cada FK simple. Las FK siempre apuntan a `prefixedName(refDb,
 *   refTable)` para que tras el parseo se conserven las relaciones aun cuando
 *   ambas BDs tengan tablas con el mismo nombre lógico.
 */

const DATABASES = ["AYUDASCP_IA", "AYUDASCP_IA_STAGING"];
const STG_PREFIX = "STG__";
const STAGING_DB = "AYUDASCP_IA_STAGING";
const LEN_TYPES = new Set(["varchar", "nvarchar", "char", "nchar", "varbinary", "binary"]);

interface ColumnRow {
   TABLE_NAME: string;
   COLUMN_NAME: string;
   DATA_TYPE: string;
   CHARACTER_MAXIMUM_LENGTH: number | null;
   IS_NULLABLE: "YES" | "NO" | string;
   ORDINAL_POSITION: number;
}

interface NamePair {
   TABLE_NAME: string;
   COLUMN_NAME: string;
}

interface FkRow extends NamePair {
   REF_TABLE: string;
   REF_COLUMN: string;
}

interface FkRef { refTable: string; refColumn: string; }

interface RawDbSchema {
   db: string;
   tableNames: string[];
   columnsByTable: Map<string, ColumnRow[]>;
   pkByTable: Map<string, Set<string>>;
   fkByTableCol: Map<string, Map<string, FkRef>>;
}

async function execSql<T>(sql: string): Promise<T[]> {
   const resp = await fetch("/api/patyia/db/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sql }),
   });
   const data = await resp.json();
   if (!resp.ok || !data?.ok) throw new Error(data?.error || `HTTP ${resp.status}`);
   return (data.rows ?? []) as T[];
}

function formatType(c: ColumnRow): string {
   const t = (c.DATA_TYPE || "").toLowerCase();
   if (LEN_TYPES.has(t) && c.CHARACTER_MAXIMUM_LENGTH != null) {
      const len = c.CHARACTER_MAXIMUM_LENGTH;
      return `${t.toUpperCase()}(${len === -1 ? "MAX" : len})`;
   }
   return t.toUpperCase();
}

async function loadRawDbSchema(db: string): Promise<RawDbSchema> {
   const tablesSql = `SELECT TABLE_NAME FROM [${db}].INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME`;
   const colsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, ORDINAL_POSITION FROM [${db}].INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME, ORDINAL_POSITION`;
   const pkSql = `SELECT tc.TABLE_NAME, kcu.COLUMN_NAME FROM [${db}].INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc JOIN [${db}].INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME WHERE tc.TABLE_SCHEMA = 'dbo' AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY'`;
   const fkSql = `SELECT t.name AS TABLE_NAME, c.name AS COLUMN_NAME, rt.name AS REF_TABLE, rc.name AS REF_COLUMN FROM [${db}].sys.foreign_keys fk JOIN [${db}].sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id JOIN [${db}].sys.tables t ON fk.parent_object_id = t.object_id JOIN [${db}].sys.columns c ON c.object_id = fkc.parent_object_id AND c.column_id = fkc.parent_column_id JOIN [${db}].sys.tables rt ON fk.referenced_object_id = rt.object_id JOIN [${db}].sys.columns rc ON rc.object_id = fkc.referenced_object_id AND rc.column_id = fkc.referenced_column_id`;

   const [tablesRaw, columnsRaw, pkRaw, fkRaw] = await Promise.all([
      execSql<{ TABLE_NAME: string }>(tablesSql),
      execSql<ColumnRow>(colsSql),
      execSql<NamePair>(pkSql),
      execSql<FkRow>(fkSql),
   ]);

   const columnsByTable = new Map<string, ColumnRow[]>();
   for (const c of columnsRaw) {
      const arr = columnsByTable.get(c.TABLE_NAME) ?? [];
      arr.push(c);
      columnsByTable.set(c.TABLE_NAME, arr);
   }
   const pkByTable = new Map<string, Set<string>>();
   for (const r of pkRaw) {
      const set = pkByTable.get(r.TABLE_NAME) ?? new Set<string>();
      set.add(r.COLUMN_NAME);
      pkByTable.set(r.TABLE_NAME, set);
   }
   const fkByTableCol = new Map<string, Map<string, FkRef>>();
   for (const r of fkRaw) {
      const m = fkByTableCol.get(r.TABLE_NAME) ?? new Map<string, FkRef>();
      m.set(r.COLUMN_NAME, { refTable: r.REF_TABLE, refColumn: r.REF_COLUMN });
      fkByTableCol.set(r.TABLE_NAME, m);
   }

   return { db, tableNames: tablesRaw.map((r) => r.TABLE_NAME), columnsByTable, pkByTable, fkByTableCol };
}

function buildBodySQL(raw: RawDbSchema, prefixFor: (db: string, name: string) => string): string {
   const { db, tableNames, columnsByTable, pkByTable, fkByTableCol } = raw;
   const buf: string[] = [];
   for (const name of tableNames) {
      const cols = columnsByTable.get(name) ?? [];
      if (cols.length === 0) continue;
      const pkSet = pkByTable.get(name) ?? new Set<string>();
      const fkMap = fkByTableCol.get(name) ?? new Map<string, FkRef>();
      const fullName = prefixFor(db, name) + name;
      buf.push(`CREATE TABLE ${fullName} (`);
      const inner: string[] = [];
      for (const c of cols) {
         const typ = formatType(c);
         const nul = c.IS_NULLABLE === "YES" ? "NULL" : "NOT NULL";
         const pk = pkSet.has(c.COLUMN_NAME) ? " PRIMARY KEY" : "";
         const fk = fkMap.get(c.COLUMN_NAME);
         const fkClause = fk ? ` REFERENCES ${prefixFor(db, fk.refTable)}${fk.refTable}(${fk.refColumn})` : "";
         inner.push(`   ${c.COLUMN_NAME} ${typ} ${nul}${pk}${fkClause}`);
      }
      buf.push(inner.join(",\n"));
      buf.push(");");
      buf.push("");
   }
   return buf.join("\n");
}

export interface PatyiaSchemaResult {
   tables: ParsedTable[];
   /** Mapa `database name -> ids estables de las tablas pertenecientes a esa BD`. */
   tableIdsByDatabase: Record<string, string[]>;
   /** Mapa `database name -> ParsedTable[]` (mismas instancias que `tables`). */
   tablesByDatabase: Record<string, ParsedTable[]>;
}

export async function loadPatyiaSchema(): Promise<PatyiaSchemaResult> {
   const raws = await Promise.all(DATABASES.map(loadRawDbSchema));
   const namesByDb = new Map(raws.map((r) => [r.db, new Set(r.tableNames)]));
   const collisions = new Set<string>();
   const prodNames = namesByDb.get("AYUDASCP_IA") ?? new Set<string>();
   const stagingNames = namesByDb.get(STAGING_DB) ?? new Set<string>();
   for (const n of stagingNames) if (prodNames.has(n)) collisions.add(n);

   const prefixFor = (db: string, name: string): string =>
      db === STAGING_DB && collisions.has(name) ? STG_PREFIX : "";

   const tables: ParsedTable[] = [];
   const tableIdsByDatabase: Record<string, string[]> = {};
   const tablesByDatabase: Record<string, ParsedTable[]> = {};
   for (const raw of raws) {
      const body = buildBodySQL(raw, prefixFor);
      const parsed = parseTableFragment(`patyia:${raw.db}`, raw.db, body);
      tablesByDatabase[raw.db] = parsed;
      tableIdsByDatabase[raw.db] = parsed.map((t) => t.id);
      tables.push(...parsed);
   }
   return { tables, tableIdsByDatabase, tablesByDatabase };
}

export async function loadPatyiaSchemaAsTables(): Promise<ParsedTable[]> {
   const { tables } = await loadPatyiaSchema();
   return tables;
}
