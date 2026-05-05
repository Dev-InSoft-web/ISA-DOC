import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPool } from "../../../lib/db.ts";
import { REBUILD_TABLES, type RebuildTableConfig } from "../../../lib/migration/oldRebuildTables.ts";

export const prerender = false;

interface Body {
	tableName?: string;
	all?: boolean;
}

const TSV_DIR = path.resolve(fileURLToPath(new URL("../../../lib/migration/csv/", import.meta.url)));

function todayStamp(): string {
	const d = new Date();
	const y = d.getFullYear().toString().padStart(4, "0");
	const mo = (d.getMonth() + 1).toString().padStart(2, "0");
	const dd = d.getDate().toString().padStart(2, "0");
	const hh = d.getHours().toString().padStart(2, "0");
	const mi = d.getMinutes().toString().padStart(2, "0");
	const ss = d.getSeconds().toString().padStart(2, "0");
	return `${y}${mo}${dd}${hh}${mi}${ss}`;
}

function toTsv(headers: string[], rows: Array<Record<string, unknown>>): string {
	const esc = (v: unknown): string => {
		if (v === null || v === undefined) return "";
		const s = v instanceof Date ? v.toISOString() : typeof v === "boolean" ? (v ? "1" : "0") : String(v);
		// Escape backslash first, luego tab/cr/lf con backslash. Sin reglas de comillas.
		return s
			.replace(/\\/g, "\\\\")
			.replace(/\t/g, "\\t")
			.replace(/\r/g, "\\r")
			.replace(/\n/g, "\\n");
	};
	const out: string[] = [headers.join("\t")];
	for (const row of rows) out.push(headers.map((h) => esc(row[h])).join("\t"));
	return out.join("\n");
}

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}

export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}

	const stamp = todayStamp();
	fs.mkdirSync(TSV_DIR, { recursive: true });

	const writeOne = async (cfg: RebuildTableConfig): Promise<{ table: string; source: string; file: string; rowCount: number }> => {
		const pool = await getPool();
		const destCols = cfg.columns.map((c) => c.name);

		const source = (cfg.oldTableName ?? "").trim() || cfg.tableName;

		// Detectar columnas reales de la fuente para evitar fallar si la
		// OLD no tiene exactamente las mismas columnas que la destino.
		const colsRes = await pool.request()
			.input("t", source)
			.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @t`);
		const sourceColsSet = new Set<string>(
			(colsRes.recordset ?? []).map((r: { COLUMN_NAME: string }) => r.COLUMN_NAME.toUpperCase()),
		);

		if (sourceColsSet.size === 0) {
			throw new Error(`Tabla fuente no existe o sin columnas: ${source}`);
		}

		const selectExpr = destCols
			.map((name) => {
				const override = cfg.columnOverrides?.[name];
				if (override) return `${override} AS [${name}]`;
				return sourceColsSet.has(name.toUpperCase()) ? `src.[${name}]` : `NULL AS [${name}]`;
			})
			.join(", ");

		const r = await pool.request().query(`SELECT ${selectExpr} FROM ${source} AS src`);
		const rows = (r.recordset ?? []) as Array<Record<string, unknown>>;
		const tsv = toTsv(destCols, rows);
		const fileName = `${stamp}-${cfg.tableName}.tsv`;
		fs.writeFileSync(path.join(TSV_DIR, fileName), tsv, { encoding: "utf8" });
		return { table: cfg.tableName, source, file: fileName, rowCount: rows.length };
	};

	try {
		if (payload.all) {
			const results: Array<{ table: string; source: string; file: string; rowCount: number }> = [];
			for (const cfg of REBUILD_TABLES) results.push(await writeOne(cfg));
			return json({ ok: true, stamp, results });
		}
		const tableName = (payload.tableName ?? "").trim();
		if (!tableName) return json({ ok: false, error: "tableName o all requerido" }, 400);
		const cfg = REBUILD_TABLES.find((c) => c.tableName === tableName);
		if (!cfg) return json({ ok: false, error: `Tabla no permitida: ${tableName}` }, 403);
		const out = await writeOne(cfg);
		return json({ ok: true, file: out.file, source: out.source, rowCount: out.rowCount });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: msg }, 500);
	}
};
