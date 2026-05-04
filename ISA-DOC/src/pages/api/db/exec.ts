import type { APIRoute } from "astro";
import { getPool } from "../../../lib/db.ts";

export const prerender = false;

interface Body {
	sql?: string;
}

// Ejecuta SQL ad-hoc enviado por la pestaña Bitácora. Cada utilidad ya pasó
// por confirm() en cliente y por el desbloqueo del candado, por lo que aquí
// solo encapsulamos el `request().query()` y devolvemos un resumen seguro.
// No retornamos los rowsets (suelen ser DDL/UPDATE); el cliente solo
// muestra `ok` + `output` informativo.
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
