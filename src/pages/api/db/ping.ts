import type { APIRoute } from "astro";
import { pingDb } from "../../../lib/db.ts";

export const prerender = false;

// Diagnóstico de conexión a BD: server (Astro) siempre vivo si responde, db
// se prueba con `SELECT 1` usando el pool singleton. Mantener el contrato
// `{ server, db, reason, ts }` estable para el banner del frontend.
export const GET: APIRoute = async () => {
	const result = await pingDb();
	const body = {
		server: true,
		db: result.ok,
		reason: result.ok ? "Conexión OK" : (result.reason ?? "Sin razón"),
		ts: new Date().toISOString(),
	};
	return new Response(JSON.stringify(body), {
		status: 200,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
};
