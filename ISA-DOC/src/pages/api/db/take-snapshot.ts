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

const CSV_DIR = path.resolve(fileURLToPath(new URL("../../../lib/migration/csv/", import.meta.url)));

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

function toCsv(headers: string[], rows: Array<Record<string, unknown>>): string {
	const esc = (v: unknown): string => {
		if (v === null || v === undefined) return "";
		const s = v instanceof Date ? v.toISOString() : typeof v === "boolean" ? (v ? "1" : "0") : String(v);
		if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
		return s;
	};
	const out: string[] = [headers.join(",")];
	for (const row of rows) out.push(headers.map((h) => esc(row[h])).join(","));
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
	fs.mkdirSync(CSV_DIR, { recursive: true });

	const writeOne = async (cfg: RebuildTableConfig): Promise<{ table: string; file: string; rowCount: number }> => {
		const pool = await getPool();
		const cols = cfg.columns.map((c) => `[${c.name}]`).join(", ");
		const r = await pool.request().query(`SELECT ${cols} FROM ${cfg.tableName}`);
		const rows = (r.recordset ?? []) as Array<Record<string, unknown>>;
		const headers = cfg.columns.map((c) => c.name);
		const csv = toCsv(headers, rows);
		const fileName = `${stamp}-${cfg.tableName}.csv`;
		fs.writeFileSync(path.join(CSV_DIR, fileName), csv, { encoding: "utf8" });
		return { table: cfg.tableName, file: fileName, rowCount: rows.length };
	};

	try {
		if (payload.all) {
			const results: Array<{ table: string; file: string; rowCount: number }> = [];
			for (const cfg of REBUILD_TABLES) results.push(await writeOne(cfg));
			return json({ ok: true, stamp, results });
		}
		const tableName = (payload.tableName ?? "").trim();
		if (!tableName) return json({ ok: false, error: "tableName o all requerido" }, 400);
		const cfg = REBUILD_TABLES.find((c) => c.tableName === tableName);
		if (!cfg) return json({ ok: false, error: `Tabla no permitida: ${tableName}` }, 403);
		const out = await writeOne(cfg);
		return json({ ok: true, file: out.file, rowCount: out.rowCount });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: msg }, 500);
	}
};
