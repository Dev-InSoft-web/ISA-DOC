import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile, access } from "node:fs/promises";
import { sqlFilePath, parseSql } from "./sqlFragments.ts";
import { parseTableFragment, type ParsedTable } from "./tableSchema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const tablesJsonPath = path.resolve(__dirname, "..", "..", "public", "db", "tables.json");

export interface TablesDoc {
	version: 1;
	tables: ParsedTable[];
}

async function exists(p: string): Promise<boolean> {
	try { await access(p); return true; } catch { return false; }
}

async function seedFromSql(): Promise<TablesDoc> {
	const raw = await readFile(sqlFilePath, "utf8");
	const fragments = parseSql(raw);
	const all: ParsedTable[] = [];
	for (const f of fragments) {
		if (f.kind !== "table") continue;
		for (const t of parseTableFragment(f.id, f.name, f.body)) all.push(t);
	}
	const doc: TablesDoc = { version: 1, tables: all };
	await writeFile(tablesJsonPath, JSON.stringify(doc, null, 2), "utf8");
	return doc;
}

export async function readTablesDoc(): Promise<TablesDoc> {
	if (!(await exists(tablesJsonPath))) return seedFromSql();
	const raw = await readFile(tablesJsonPath, "utf8");
	const parsed = JSON.parse(raw) as TablesDoc;
	if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.tables)) {
		return seedFromSql();
	}
	return parsed;
}

export async function writeTablesDoc(doc: TablesDoc): Promise<void> {
	await writeFile(tablesJsonPath, JSON.stringify(doc, null, 2), "utf8");
}
