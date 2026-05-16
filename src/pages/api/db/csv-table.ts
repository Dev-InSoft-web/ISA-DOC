import type { APIRoute } from "astro";
import { getPool } from "../../../lib/db.ts";
import { REBUILD_TABLES, type RebuildTableConfig } from "../../../lib/migration/oldRebuildTables.ts";

export const prerender = false;

interface Body {
	tableName?: string;
}

// Devuelve el contenido de un CAPAC_*_OLD (o tabla destino) como CSV listo
// para pegar en el textarea de la migración. Se valida contra el catálogo
// REBUILD_TABLES para evitar SQL injection vía el nombre.
export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}
	const tableName = (payload.tableName ?? "").trim();
	if (!tableName) return json({ ok: false, error: "tableName requerido" }, 400);

	const cfg: RebuildTableConfig | undefined = REBUILD_TABLES.find(
		(c) => c.oldTableName === tableName || c.tableName === tableName,
	);
	if (!cfg) return json({ ok: false, error: `Tabla no permitida: ${tableName}` }, 403);

	try {
		const pool = await getPool();
		const cols = cfg.columns.map((c) => `[${c.name}]`).join(", ");
		const sql = `SELECT ${cols} FROM ${tableName}`;
		const r = await pool.request().query(sql);
		const rows = (r.recordset ?? []) as Array<Record<string, unknown>>;
		const headers = cfg.columns.map((c) => c.name);
		const tsv = toTsv(headers, rows);
		return json({ ok: true, csv: tsv, rowCount: rows.length });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: msg }, 500);
	}
};

function toTsv(headers: string[], rows: Array<Record<string, unknown>>): string {
	const esc = (v: unknown): string => {
		if (v === null || v === undefined) return "";
		const s = v instanceof Date ? v.toISOString() : typeof v === "boolean" ? (v ? "1" : "0") : String(v);
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
