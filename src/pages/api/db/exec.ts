import type { APIRoute } from "astro";
import { getPool } from "../../../lib/db.ts";

export const prerender = false;

interface Body {
	sql?: string;
}

// Ejecuta SQL ad-hoc enviado por la pestaña Bitácora.
//
// Modos:
//   1) Remoto (recomendado cuando el host local NO alcanza al MSSQL directo):
//      Configurar `ISA_DB_REMOTE_URL` (URL absoluta del endpoint remoto que
//      ejecuta el SQL contra la BD). Opcional: `ISA_DB_REMOTE_TOKEN` para
//      enviar `Authorization: Bearer <token>`. Astro reenvía server-to-server.
//   2) Local: si no hay `ISA_DB_REMOTE_URL`, abre el pool `mssql` con las
//      variables `hostdb/portdb/userdb/passdb/namedb` del `.env`.
export const POST: APIRoute = async ({ request }) => {
	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}
	const sql = (payload.sql ?? "").trim();
	if (!sql) return json({ ok: false, error: "SQL vacío" }, 400);

	const remote = (process.env.ISA_DB_REMOTE_URL ?? "").trim();
	if (remote) return forwardRemote(remote, sql);

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

async function forwardRemote(url: string, sql: string): Promise<Response> {
	const token = (process.env.ISA_DB_REMOTE_TOKEN ?? "").trim();
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
