import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../lib/dbPaty.ts";

export const prerender = false;

interface Body {
	sql?: string;
}

// Ejecuta SQL ad-hoc contra la BD de PatyIA (AYUDASCP_IA). Pareja del
// endpoint genérico `/api/db/exec` (ClientesIS): mismo contrato de
// respuesta, distinta conexión.
//
// Modos:
//   1) Remoto: si `ISA_PATY_DB_REMOTE_URL` está definida, reenvía la
//      petición a esa URL (opcional Bearer con `ISA_PATY_DB_REMOTE_TOKEN`).
//   2) Local: abre el pool con las variables `paty_hostdb/...` del `.env`.
//      Si esas variables no están, cae al pool principal (`hostdb/...`)
//      asumiendo que ese ya apunta a AYUDASCP_IA.
export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}
	const sql = (typeof payload.sql === "string" ? payload.sql : "").trim();
	if (!sql) return json({ ok: false, error: "SQL vacío" }, 400);

	const remote = (process.env.ISA_PATY_DB_REMOTE_URL ?? "").trim();
	if (remote) return forwardRemote(remote, sql);

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

async function forwardRemote(url: string, sql: string): Promise<Response> {
	const token = (process.env.ISA_PATY_DB_REMOTE_TOKEN ?? "").trim();
	const headers: Record<string, string> = { "content-type": "application/json" };
	if (token) headers["authorization"] = `Bearer ${token}`;
	try {
		const r = await fetch(url, { method: "POST", headers, body: JSON.stringify({ sql }) });
		const text = await r.text();
		return new Response(text, {
			status: r.status,
			headers: {
				"content-type": r.headers.get("content-type") ?? "application/json",
				"cache-control": "no-store",
			},
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: `Reenvío a ${url} falló: ${msg}` }, 502);
	}
}
