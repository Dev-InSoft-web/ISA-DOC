import type { APIRoute } from "astro";
import { obtenerPrompt, validarKey } from "../../../../../lib/patyia/promptsConfig.ts";
import {
	escribirContenidoLocal,
	existeContenidoLocal,
	leerContenidoLocal,
	parsearMd,
	plantillaVacia,
	type PromptContentSnapshot,
} from "../../../../../lib/patyia/promptContent.ts";

export const prerender = false;

// GET → devuelve la copia local del .md. Si no existe, crea una plantilla vacía editable.
export const GET: APIRoute = async ({ params }) => {
	const key = String(params.key ?? "");
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	const entry = await obtenerPrompt(key);
	if (!entry) return j({ ok: false, error: "key no encontrada" }, 404);

	if (await existeContenidoLocal(key)) {
		const { markdown, snapshot } = await leerContenidoLocal(key);
		return j({ ok: true, key, markdown, snapshot });
	}

	const md = plantillaVacia();
	const snapshot: PromptContentSnapshot = {
		messages: parsearMd(md),
		model: entry.model,
		updated_at: new Date().toISOString(),
	};
	await escribirContenidoLocal(key, md, snapshot);
	return j({ ok: true, key, markdown: md, snapshot });
};

// PUT → guarda el markdown editado localmente. Body: { markdown }
export const PUT: APIRoute = async ({ params, request }) => {
	const key = String(params.key ?? "");
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	const entry = await obtenerPrompt(key);
	if (!entry) return j({ ok: false, error: "key no encontrada" }, 404);

	let body: { markdown?: string };
	try { body = (await request.json()) as { markdown?: string }; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const md = String(body.markdown ?? "");
	if (!md.trim()) return j({ ok: false, error: "markdown vacío" }, 400);
	const messages = parsearMd(md);
	if (!messages.length) return j({ ok: false, error: "el markdown no contiene bloques <!--role: ...--> ... <!--/role-->" }, 400);

	const snapshot: PromptContentSnapshot = {
		messages,
		model: entry.model,
		updated_at: new Date().toISOString(),
	};
	await escribirContenidoLocal(key, md, snapshot);
	return j({ ok: true, key, messages: messages.length });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
