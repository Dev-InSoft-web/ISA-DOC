import type { APIRoute } from "astro";
import { getPool } from "../../../lib/core/database/clientesis-pool.ts";
import {
	forwardMssqlRemote,
	mssqlRemoteToken,
	resolveMssqlRemoteUrl,
} from "../../../lib/core/lab-api/mssql-remote.ts";

export const prerender = false;

interface Body {
	sql?: string;
}

// Ejecuta SQL ad-hoc enviado por la pestaña Bitácora.
//
// Modos (prioridad):
//   1) Remoto lab-langgraph: `ISA_DB_REMOTE_URL` o `LAB_LANGGRAPH_URL` +
//      `/api/mssql/clientesis/exec`. Bearer: `ISA_DB_REMOTE_TOKEN` o header del request.
//   2) Local: pool `mssql` con `CLIENTESIS_MSSQL_*` en `.env` (legacy).
export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}
	const sql = (payload.sql ?? "").trim();
	if (!sql) return json({ ok: false, error: "SQL vacío" }, 400);

	const remote = resolveMssqlRemoteUrl(process.env.ISA_DB_REMOTE_URL, "clientesis", "exec");
	if (remote) {
		const token = mssqlRemoteToken(request.headers.get("authorization"));
		return forwardMssqlRemote(remote, sql, token);
	}

	try {
		const pool = await getPool();
		const result = await pool.request().query(sql);
		const rowsAffectedArr = Array.isArray(result.rowsAffected) ? result.rowsAffected : [];
		const affected = rowsAffectedArr.reduce((a, b) => a + b, 0);
		const sets = Array.isArray(result.recordsets) ? result.recordsets.length : 0;
		return json({
			ok: true,
			rowsAffected: affected,
			rowsAffectedPerStmt: rowsAffectedArr,
			recordsets: sets,
			output: `Filas afectadas: ${affected}. Recordsets: ${sets}.`,
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
}

