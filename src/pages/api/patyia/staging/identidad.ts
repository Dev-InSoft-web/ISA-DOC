import type { APIRoute } from "astro";
import { resolverIdentidades } from "../../../../lib/patyia/identidadesCache.ts";
import { jsonResponse } from "../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

// GET ?itercero=...&icontacto=... → resuelve nombres desde cache o BD CLIENTES.
// Persiste lo nuevo en data/patyia/identidades-cache.json.
export const GET: APIRoute = async ({ url }) => {
	const itercero = (url.searchParams.get("itercero") ?? "").trim();
	const icontacto = (url.searchParams.get("icontacto") ?? "").trim();
	if (!itercero && !icontacto) return jsonResponse({ ok: false, error: "itercero o icontacto requerido" }, 400);
	try {
		const { terceros, contactos } = await resolverIdentidades([{ itercero, icontacto }]);
		return jsonResponse({
			ok: true,
			itercero,
			icontacto,
			nombreTercero: itercero ? terceros[itercero] ?? "" : "",
			nombreContacto: icontacto ? contactos[icontacto] ?? "" : "",
		});
	} catch (err) {
		return jsonResponse({ ok: false, error: (err as Error).message }, 500);
	}
};
