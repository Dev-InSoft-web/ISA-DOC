#!/usr/bin/env node
// Sincroniza el campo `type` de cada columna en
// public/db/clientesis/columns/<TABLE>.json contra los tipos reales en la BD
// (INFORMATION_SCHEMA.COLUMNS) vía el endpoint local /api/db/query.
//
// Uso: node scripts/sync-column-types.mjs [--dry] [--api=http://localhost:4400]
//
// Mapeo de nombre de archivo -> nombre de tabla en BD: primero intenta CAPAC_<name>,
// luego <name> tal cual.
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const COLUMNS_DIR = path.join(ROOT, "public", "db", "clientesis", "columns");

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const apiArg = args.find((a) => a.startsWith("--api="));
const API = (apiArg ? apiArg.slice(6) : "http://localhost:4400") + "/api/db/query";

/** @param {string} sql */
async function query(sql) {
	const res = await fetch(API, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ sql }),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
	const json = await res.json();
	if (!json.ok) throw new Error(`API error: ${json.error}`);
	return json.recordset ?? [];
}

/** Normaliza un tipo MSSQL al formato UPPERCASE usado en los JSON. */
function normalize(row) {
	const dt = String(row.DATA_TYPE).toUpperCase();
	const len = row.CHARACTER_MAXIMUM_LENGTH;
	const prec = row.NUMERIC_PRECISION;
	const scale = row.NUMERIC_SCALE;
	if (["VARCHAR", "NVARCHAR", "CHAR", "NCHAR", "VARBINARY", "BINARY"].includes(dt)) {
		return `${dt}(${len === -1 ? "MAX" : len})`;
	}
	if (["DECIMAL", "NUMERIC"].includes(dt)) {
		return `${dt}(${prec},${scale})`;
	}
	if (["FLOAT"].includes(dt) && prec) return `FLOAT(${prec})`;
	return dt;
}

async function loadDbTypes(dbTableNames) {
	if (!dbTableNames.length) return new Map();
	const inList = dbTableNames.map((n) => `'${n.replace(/'/g, "''")}'`).join(",");
	const sql = `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME IN (${inList})`;
	const rows = await query(sql);
	/** @type {Map<string, Map<string,string>>} */
	const map = new Map();
	for (const r of rows) {
		const t = String(r.TABLE_NAME).toUpperCase();
		const c = String(r.COLUMN_NAME).toUpperCase();
		if (!map.has(t)) map.set(t, new Map());
		map.get(t).set(c, normalize(r));
	}
	return map;
}

async function listExistingDbTables(candidates) {
	const inList = candidates.map((n) => `'${n.replace(/'/g, "''")}'`).join(",");
	const sql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME IN (${inList})`;
	const rows = await query(sql);
	return new Set(rows.map((r) => String(r.TABLE_NAME).toUpperCase()));
}

async function main() {
	const files = (await readdir(COLUMNS_DIR)).filter((f) => f.endsWith(".json"));
	// Candidatos: <base> y CAPAC_<base>
	const candidates = [];
	const fileToBase = new Map();
	for (const f of files) {
		const base = f.replace(/\.json$/i, "").toUpperCase();
		fileToBase.set(f, base);
		candidates.push(base, `CAPAC_${base}`);
	}
	const existing = await listExistingDbTables([...new Set(candidates)]);

	/** @type {Map<string,string>} fileBase -> dbTableName */
	const resolved = new Map();
	const unresolved = [];
	for (const [, base] of fileToBase) {
		const prefixed = `CAPAC_${base}`;
		if (existing.has(prefixed)) resolved.set(base, prefixed);
		else if (existing.has(base)) resolved.set(base, base);
		else unresolved.push(base);
	}
	if (unresolved.length) {
		console.warn("⚠️  Tablas sin match en BD:", unresolved.join(", "));
	}

	const dbTypes = await loadDbTypes([...resolved.values()]);

	let totalChanges = 0;
	let totalCols = 0;
	for (const f of files) {
		const base = fileToBase.get(f);
		const dbTable = resolved.get(base);
		if (!dbTable) continue;
		const dbCols = dbTypes.get(dbTable) ?? new Map();
		const filePath = path.join(COLUMNS_DIR, f);
		const raw = await readFile(filePath, "utf8");
		const hadBom = raw.charCodeAt(0) === 0xfeff;
		const json = JSON.parse(hadBom ? raw.slice(1) : raw);
		const cols = json?.entities?.COLUMN ?? [];
		const changes = [];
		for (const c of cols) {
			totalCols++;
			const colName = String(c.name ?? "").toUpperCase();
			const dbType = dbCols.get(colName);
			if (!dbType) {
				changes.push({ col: c.name, before: c.type, after: null, note: "no existe en BD" });
				continue;
			}
			if (String(c.type).toUpperCase() !== dbType) {
				changes.push({ col: c.name, before: c.type, after: dbType });
				c.type = dbType;
			}
		}
		if (changes.length) {
			console.log(`\n=== ${f}  (${dbTable}) ===`);
			for (const ch of changes) {
				const arrow = ch.after ? `${ch.before}  ->  ${ch.after}` : `${ch.before}  (${ch.note})`;
				console.log(`  - ${ch.col}: ${arrow}`);
				if (ch.after) totalChanges++;
			}
			if (!DRY) {
				const out = (hadBom ? "\ufeff" : "") + JSON.stringify(json, null, 2);
				await writeFile(filePath, out, "utf8");
			}
		}
	}
	console.log(`\n${DRY ? "[DRY] " : ""}Columnas revisadas: ${totalCols}. Cambios aplicados: ${totalChanges}.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
