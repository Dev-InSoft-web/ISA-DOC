import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../lib/core/database/paty-pool.ts";
import { forwardMssqlRemote, resolveMssqlRemoteUrl } from "../../../../lib/core/lab-api/mssql-remote.ts";

export const prerender = false;

interface Body {
	sql?: string;
}

/** Consultas SELECT contra PatyIA MSSQL (sin auth). Reenvía a lab si LAB_LANGGRAPH_URL está configurada. */
export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}
	const sql = (typeof payload.sql === "string" ? payload.sql : "").trim();
	if (!sql) return json({ ok: false, error: "SQL vacío" }, 400);

	const remote = resolveMssqlRemoteUrl(process.env.ISA_PATY_DB_QUERY_REMOTE_URL, "paty", "query");
	if (remote) return forwardMssqlRemote(remote, sql, "");

	try {
		const pool = await getPatyPool();
		const result = await pool.request().query(sql);
		const recordsets = Array.isArray(result.recordsets) ? (result.recordsets as unknown[][]) : [];
		return json({
			ok: true,
			recordset: result.recordset ?? recordsets[0] ?? [],
			rows: result.recordset ?? recordsets[0] ?? [],
			recordsets,
		});
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
};
