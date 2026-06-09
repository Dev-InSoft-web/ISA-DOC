import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../lib/core/database/paty-pool.ts";
import {
	forwardMssqlRemote,
	mssqlRemoteToken,
	resolveMssqlRemoteUrl,
} from "../../../../lib/core/lab-api/mssql-remote.ts";

export const prerender = false;

interface Body {
	sql?: string;
}

// Ejecuta SQL ad-hoc contra la BD de PatyIA (AYUDASCP_IA_STAGING).
//
// Modos (prioridad):
//   1) Remoto lab-langgraph: `ISA_PATY_DB_REMOTE_URL` o `LAB_LANGGRAPH_URL` +
//      `/api/mssql/paty/exec`. Bearer: token env o header del request.
//   2) Local: pool con `PATY_MSSQL_*` en `.env` (legacy).
export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}
	const sql = (typeof payload.sql === "string" ? payload.sql : "").trim();
	if (!sql) return json({ ok: false, error: "SQL vacío" }, 400);

	const remote = resolveMssqlRemoteUrl(process.env.ISA_PATY_DB_REMOTE_URL, "paty", "exec");
	if (remote) {
		const token = mssqlRemoteToken(request.headers.get("authorization"));
		return forwardMssqlRemote(remote, sql, token);
	}

	try {
		const pool = await getPatyPool();
		const result = await pool.request().query(sql);
		const rowsAffectedArr = Array.isArray(result.rowsAffected) ? result.rowsAffected : [];
		const affected = rowsAffectedArr.reduce((a, b) => a + b, 0);
		const allSets = Array.isArray(result.recordsets) ? (result.recordsets as unknown[][]) : [];
		const sets = allSets.length;
		const firstRows = allSets[0] ?? [];
		return json({
			ok: true,
			rowsAffected: affected,
			rowsAffectedPerStmt: rowsAffectedArr,
			recordsets: sets,
			rows: firstRows,
			output: `Filas afectadas: ${affected}. Recordsets: ${sets}. Filas devueltas: ${firstRows.length}.`,
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

