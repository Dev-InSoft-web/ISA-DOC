import { parseTableFragment, type ParsedTable } from "../tableSchema.ts";

interface ColumnRow {
   TABLE_NAME: string;
   COLUMN_NAME: string;
   DATA_TYPE: string;
   CHARACTER_MAXIMUM_LENGTH: number | null;
   IS_NULLABLE: "YES" | "NO" | string;
   ORDINAL_POSITION: number;
}

interface ConstraintRow {
   TABLE_NAME: string;
   CONSTRAINT_TYPE: string;
   COLUMN_NAME: string;
}

const DB_NAME = "AYUDASCP_IA";
const LEN_TYPES = new Set(["varchar", "nvarchar", "char", "nchar", "varbinary", "binary"]);

async function execGet<T>(sql: string): Promise<T[]> {
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

function buildBodySQL(tables: string[], columnsByTable: Map<string, ColumnRow[]>, pkByTable: Map<string, Set<string>>): string {
   const buf: string[] = [];
   for (const name of tables) {
      const cols = columnsByTable.get(name) ?? [];
      if (cols.length === 0) continue;
      const pkSet = pkByTable.get(name) ?? new Set<string>();
      buf.push(`CREATE TABLE ${name} (`);
      const inner: string[] = [];
      for (const c of cols) {
         const typ = formatType(c);
         const nul = c.IS_NULLABLE === "YES" ? "NULL" : "NOT NULL";
         const pk = pkSet.has(c.COLUMN_NAME) ? " PRIMARY KEY" : "";
         inner.push(`   ${c.COLUMN_NAME} ${typ} ${nul}${pk}`);
      }
      buf.push(inner.join(",\n"));
      buf.push(");");
      buf.push("");
   }
   return buf.join("\n");
}

export async function loadPatyiaSchemaAsTables(): Promise<ParsedTable[]> {
   const tablesSql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND TABLE_TYPE = 'BASE TABLE' ORDER BY TABLE_NAME`;
   const colsSql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, IS_NULLABLE, ORDINAL_POSITION FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' ORDER BY TABLE_NAME, ORDINAL_POSITION`;
   const consSql = `SELECT tc.TABLE_NAME, tc.CONSTRAINT_TYPE, kcu.COLUMN_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME WHERE tc.TABLE_SCHEMA = 'dbo' AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY'`;

   const [tablesRaw, columnsRaw, consRaw] = await Promise.all([
      execGet<{ TABLE_NAME: string }>(tablesSql),
      execGet<ColumnRow>(colsSql),
      execGet<ConstraintRow>(consSql),
   ]);

   const tables = tablesRaw.map((r) => r.TABLE_NAME);
   const columnsByTable = new Map<string, ColumnRow[]>();
   for (const c of columnsRaw) {
      const list = columnsByTable.get(c.TABLE_NAME) ?? [];
      list.push(c);
      columnsByTable.set(c.TABLE_NAME, list);
   }
   const pkByTable = new Map<string, Set<string>>();
   for (const c of consRaw) {
      const set = pkByTable.get(c.TABLE_NAME) ?? new Set<string>();
      set.add(c.COLUMN_NAME);
      pkByTable.set(c.TABLE_NAME, set);
   }

   const body = buildBodySQL(tables, columnsByTable, pkByTable);
   return parseTableFragment("patyia-schema", DB_NAME, body);
}
