import type { APIRoute } from "astro";
import { PATYIA_LOCAL_BASE, resolvePatyiaLocalToken } from "../../../../../lib/features/patyia/020-api/patyiaLocalToken.ts";

export const prerender = false;

/** Proxy SSE → PatyIA local POST /api/conversacion/jailbreak (siempre respuesta libre). */
export const POST: APIRoute = async ({ request }) => {
	const auth = await resolvePatyiaLocalToken();
	if (!auth) {
		return new Response(JSON.stringify({ ok: false, error: "PATYIA_TOKEN o secrets/tokens/token.patyia.json requerido" }), {
			status: 502,
			headers: { "content-type": "application/json" },
		});
	}
	const body = await request.text();
	let upstream: Response;
	try {
		upstream = await fetch(`${PATYIA_LOCAL_BASE}/api/conversacion/jailbreak`, {
			method: "POST",
			headers: {
				"content-type": request.headers.get("content-type") ?? "application/json",
				authorization: `Bearer ${auth.token}`,
			},
			body,
			signal: AbortSignal.timeout(300_000),
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ ok: false, error: `PatyIA local: ${msg}` }), {
			status: 502,
			headers: { "content-type": "application/json" },
		});
	}
	if (!upstream.ok || !upstream.body) {
		const txt = await upstream.text();
		return new Response(txt, {
			status: upstream.status,
			headers: { "content-type": upstream.headers.get("content-type") ?? "application/json" },
		});
	}
	return new Response(upstream.body, {
		status: upstream.status,
		headers: {
			"content-type": upstream.headers.get("content-type") ?? "text/event-stream",
			"cache-control": "no-cache",
			connection: "keep-alive",
		},
	});
};
