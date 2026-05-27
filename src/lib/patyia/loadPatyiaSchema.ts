import { parseTableFragment, type ParsedTable } from "../tableSchema.ts";

/**
 * Carga el esquema SQL Server de PatyIA y lo materializa como `ParsedTable[]`.
 *
 * - Consulta `INFORMATION_SCHEMA` y `sys.foreign_keys` para CADA base de datos
 *   en `DATABASES`, usando consultas calificadas `[DB].INFORMATION_SCHEMA.X`
 *   sobre la misma conexión expuesta por `/api/patyia/db/exec`.
 * - Sintetiza un script `CREATE TABLE` con `PRIMARY KEY` inline y `REFERENCES`
 *   inline por cada FK simple, para que `parseTableFragment` capture PKs y FKs
 *   sin emitir filas de constraint adicionales.
 * - Prefija las tablas del entorno staging con `STG__` en su `name` para
 *   evitar colisiones cuando ambas BDs comparten nombres (caso de
 *   `AYUDASCP_IA_STAGING` vs `AYUDASCP_IA`).
 */

const DATABASES = ["AYUDASCP_IA", "AYUDASCP_IA_STAGING"];
const STG_PREFIX = "STG__";
const LEN_TYPES = new Set(["varchar", "nvarchar", "char", "nchar", "varbinary", "binary"]);

function dbPrefix(db: string): string {
   return db === "AYUDASCP_IA_STAGING" ? STG_PREFIX : "";
}

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

async function execSql<T>(sql: string): Promise<T[]> {
   const resp = await fetch("/api/patyia/db/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sql }),
   });
   const data = await resp.json();
   if (!resp.ok || !data?.ok) {
      throw new Error(data?.error || `HTTP ${resp.status}`);
   }
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

interface FkRef { refTable: string; refColumn: string; }

function buildBodySQL(
   db: string,
   tableNames: string[],
   columnsByTable: Map<string, ColumnRow[]>,
   pkByTable: Map<string, Set<string>>,
   fkByTableCol: Map<string, Map<string, FkRef>>,
): string {
   const px = dbPrefix(db);
   const buf: string[] = [];
   for (const name of tableNames) {
      const cols = columnsByTable.get(name) ?? [];
      if (cols.length === 0) continue;
      const pkSet = pkByTable.get(name) ?? new Set<string>();
      const fkMap = fkByTableCol.get(name) ?? new Map<string, FkRef>();
      buf.push(`CREATE TABLE ${px}${name} (`);
      const inner: string[] = [];
      for (const c of cols) {
         const typ = formatType(c);
         const nul = c.IS_NULLABLE === "YES" ? "NULL" : "NOT NULL";
         const pk = pkSet.has(c.COLUMN_NAME) ? " PRIMARY KEY" : "";
         const fk = fkMap.get(c.COLUMN_NAME);
         const fkClause = fk ? ` REFERENCES ${px}${fk.refTable}(${fk.refColumn})` : "";
         inner.push(`   ${c.COLUMN_NAME} ${typ} ${nul}${pk}${fkClause}`);
      }
      buf.push(inner.join(",\n"));
      buf.push(");");
      buf.push("");
   }
   return buf.join("\n");
}

async function loadOneDatabase(db: string): Promise<ParsedTable[]> {
   const tablesSql = `SELECT TABLE_NAME FROM [${db}].INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME`;
   const colsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, ORDINAL_POSITION FROM [${db}].INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME, ORDINAL_POSITION`;
   const pkSql = `SELECT tc.TABLE_NAME, kcu.COLUMN_NAME FROM [${db}].INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc JOIN [${db}].INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME WHERE tc.TABLE_SCHEMA = 'dbo' AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY'`;
   const fkSql = `SELECT OBJECT_NAME(fk.parent_object_id) AS TABLE_NAME, COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS COLUMN_NAME, OBJECT_NAME(fk.referenced_object_id) AS REF_TABLE, COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS REF_COLUMN FROM [${db}].sys.foreign_keys fk JOIN [${db}].sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id`;

   const [tablesRaw, columnsRaw, pkRaw, fkRaw] = await Promise.all([
      execSql<{ TABLE_NAME: string }>(tablesSql),
      execSql<ColumnRow>(colsSql),
      execSql<NamePair>(pkSql),
      execSql<FkRow>(fkSql),
   ]);

   const tableNames = tablesRaw.map((r) => r.TABLE_NAME);

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

   const body = buildBodySQL(db, tableNames, columnsByTable, pkByTable, fkByTableCol);
   return parseTableFragment(`patyia:${db}`, db, body);
}

export interface PatyiaSchemaResult {
   tables: ParsedTable[];
   /** Mapa `database name -> ids estables de las tablas pertenecientes a esa BD`. */
   tableIdsByDatabase: Record<string, string[]>;
}

export async function loadPatyiaSchema(): Promise<PatyiaSchemaResult> {
   const perDb = await Promise.all(
      DATABASES.map(async (db) => ({ db, tables: await loadOneDatabase(db) })),
   );
   const tables: ParsedTable[] = [];
   const tableIdsByDatabase: Record<string, string[]> = {};
   for (const { db, tables: dbTables } of perDb) {
      tableIdsByDatabase[db] = dbTables.map((t) => t.id);
      tables.push(...dbTables);
   }
   return { tables, tableIdsByDatabase };
}

/** Compat: variante que solo retorna las tablas (sin metadata por BD). */
export async function loadPatyiaSchemaAsTables(): Promise<ParsedTable[]> {
   const { tables } = await loadPatyiaSchema();
   return tables;
}
