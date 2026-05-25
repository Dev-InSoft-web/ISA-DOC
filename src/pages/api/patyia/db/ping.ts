import type { APIRoute } from "astro";
import { pingPatyDb } from "../../../../lib/dbPaty.ts";

export const prerender = false;

// Diagnóstico de conexión a la BD de PatyIA (AYUDASCP_IA). Mismo contrato
// que `/api/db/ping` para que el banner del frontend funcione idéntico.
export const GET: APIRoute = async () => {
	const result = await pingPatyDb();
	const body = {
		server: true,
		db: result.ok,
		reason: result.ok ? "Conexión OK · AYUDASCP_IA" : (result.reason ?? "Sin razón"),
		ts: new Date().toISOString(),
	};
	return new Response(JSON.stringify(body), {
		status: 200,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
};
