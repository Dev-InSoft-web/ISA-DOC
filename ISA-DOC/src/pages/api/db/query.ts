import type { APIRoute } from "astro";
import { getPool } from "../../../lib/db.ts";

export const prerender = false;

interface Body {
	sql?: string;
}

// Endpoint de diagnóstico: ejecuta SELECTs y devuelve recordset.
export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}
	const sql = (payload.sql ?? "").trim();
	if (!sql) return json({ ok: false, error: "SQL vacío" }, 400);

	try {
		const pool = await getPool();
		const result = await pool.request().query(sql);
		return json({ ok: true, recordset: result.recordset ?? [], recordsets: result.recordsets ?? [] });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: msg }, 500);
	}
};

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
