import type { APIRoute } from "astro";
import { readConvLogFile, ordenarMensajesConvLog } from "../../../../../lib/patyia/readConvLog.ts";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
	const iconversacion = Number(params.id ?? 0);
	if (!Number.isInteger(iconversacion) || iconversacion <= 0) {
		return json({ ok: false, error: "iconversacion inválido" }, 400);
	}

	const log = await readConvLogFile(iconversacion);
	if (!log) {
		return json({ ok: false, error: `Log conv-${iconversacion}.json no encontrado` }, 404);
	}

	return json({
		ok: true,
		iconversacion,
		log: { ...log, mensajes: ordenarMensajesConvLog(log.mensajes) },
	});
};

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
