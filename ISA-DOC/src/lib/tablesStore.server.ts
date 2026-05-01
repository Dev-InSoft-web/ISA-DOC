import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile, access, mkdir, readdir, unlink } from "node:fs/promises";
import { sqlFilePath, parseSql } from "./sqlFragments.ts";
import { parseTableFragment, type ParsedTable } from "./tableSchema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Carpeta con un JSON por `fragmentId` (split storage). */
export const clientesisDir = path.resolve(__dirname, "..", "..", "public", "db", "clientesis");
/** Ruta legacy del único `tables.json` monolítico. Se conserva sólo para migración inicial. */
export const tablesJsonPath = path.resolve(__dirname, "..", "..", "public", "db", "tables.json");

export interface TablesDoc {
	version: 1;
	tables: ParsedTable[];
}

interface FragmentFile {
	version: 1;
	fragmentId: string;
	fragmentName: string;
	tables: ParsedTable[];
}

async function exists(p: string): Promise<boolean> {
	try { await access(p); return true; } catch { return false; }
}

async function listFragmentFiles(): Promise<string[]> {
	if (!(await exists(clientesisDir))) return [];
	const entries = await readdir(clientesisDir);
	return entries.filter((e) => e.endsWith(".json")).map((e) => path.join(clientesisDir, e));
}

async function readSplit(): Promise<TablesDoc | null> {
	const files = await listFragmentFiles();
	if (files.length === 0) return null;
	const all: ParsedTable[] = [];
	for (const f of files) {
		try {
			const raw = await readFile(f, "utf8");
			const parsed = JSON.parse(raw) as Partial<FragmentFile>;
			if (parsed && Array.isArray(parsed.tables)) all.push(...(parsed.tables as ParsedTable[]));
		} catch { /* ignore corrupt fragment */ }
	}
	return { version: 1, tables: all };
}

async function readLegacy(): Promise<TablesDoc | null> {
	if (!(await exists(tablesJsonPath))) return null;
	try {
		const raw = await readFile(tablesJsonPath, "utf8");
		const parsed = JSON.parse(raw) as TablesDoc;
		if (parsed?.version === 1 && Array.isArray(parsed.tables)) return parsed;
	} catch { /* fallthrough */ }
	return null;
}

async function seedFromSql(): Promise<TablesDoc> {
	const raw = await readFile(sqlFilePath, "utf8");
	const fragments = parseSql(raw);
	const all: ParsedTable[] = [];
	for (const f of fragments) {
		if (f.kind !== "table") continue;
		for (const t of parseTableFragment(f.id, f.name, f.body)) all.push(t);
	}
	return { version: 1, tables: all };
}

export async function readTablesDoc(): Promise<TablesDoc> {
	const split = await readSplit();
	if (split) return split;
	const legacy = await readLegacy();
	if (legacy) {
		// Migración: escribe en split y elimina el monolítico.
		await writeTablesDoc(legacy);
		try { await unlink(tablesJsonPath); } catch { /* noop */ }
		return legacy;
	}
	const seeded = await seedFromSql();
	await writeTablesDoc(seeded);
	return seeded;
}

export async function writeTablesDoc(doc: TablesDoc): Promise<void> {
	await mkdir(clientesisDir, { recursive: true });
	const groups = new Map<string, ParsedTable[]>();
	for (const t of doc.tables) {
		const id = String(t.fragmentId || "_orphan");
		let arr = groups.get(id);
		if (!arr) { arr = []; groups.set(id, arr); }
		arr.push(t);
	}
	const written = new Set<string>();
	for (const [id, tables] of groups) {
		const file = path.join(clientesisDir, `${id}.json`);
		const payload: FragmentFile = {
			version: 1,
			fragmentId: id,
			fragmentName: tables[0]?.fragmentName ?? "",
			tables,
		};
		await writeFile(file, JSON.stringify(payload, null, 2), "utf8");
		written.add(`${id}.json`);
	}
	// Limpia fragmentos huérfanos.
	const existing = (await readdir(clientesisDir)).filter((e) => e.endsWith(".json"));
	for (const e of existing) {
		if (!written.has(e)) {
			try { await unlink(path.join(clientesisDir, e)); } catch { /* noop */ }
		}
	}
}

