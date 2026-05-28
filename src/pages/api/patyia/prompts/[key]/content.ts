import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";
import { obtenerPrompt, validarKey } from "../../../../../lib/patyia/promptsConfig.ts";
import {
	escribirContenidoLocal,
	existeContenidoLocal,
	fetchOpenAIPrompt,
	leerContenidoLocal,
	parsearMd,
	publicarNuevaVersion,
	serializarMd,
	type PromptContentSnapshot,
} from "../../../../../lib/patyia/promptContent.ts";

export const prerender = false;

// GET → devuelve la copia local del .md. Con ?refresh=1 fuerza descarga desde OpenAI.
export const GET: APIRoute = async ({ params, request }) => {
	const key = String(params.key ?? "");
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	const entry = await obtenerPrompt(key);
	if (!entry) return j({ ok: false, error: "key no encontrada" }, 404);

	const refresh = new URL(request.url).searchParams.get("refresh") === "1";

	if (!refresh && (await existeContenidoLocal(key))) {
		const { markdown, snapshot } = await leerContenidoLocal(key);
		return j({ ok: true, key, markdown, snapshot, cached: true });
	}

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	try {
		const res = await fetchOpenAIPrompt(entry.id, entry.version, apiKey);
		const markdown = serializarMd(res.messages);
		const snapshot: PromptContentSnapshot = {
			id: entry.id,
			version: res.version,
			messages: res.messages,
			model: res.model,
			fetched_at: new Date().toISOString(),
			raw: res.raw,
		};
		await escribirContenidoLocal(key, markdown, snapshot);
		return j({ ok: true, key, markdown, snapshot, cached: false, source: "openai" });
	} catch (err) {
		// OpenAI no expone públicamente GET /v1/prompts/{id}. Fallback: crear plantilla local editable.
		const warning = err instanceof Error ? err.message : String(err);
		const markdown = serializarMd([
			{ role: "system", content: "" },
			{ role: "user", content: "" },
		]);
		const snapshot: PromptContentSnapshot = {
			id: entry.id,
			version: entry.version,
			messages: parsearMd(markdown),
			model: "",
			fetched_at: new Date().toISOString(),
			raw: null,
		};
		await escribirContenidoLocal(key, markdown, snapshot);
		return j({ ok: true, key, markdown, snapshot, cached: false, source: "empty", warning });
	}
};

// PUT → guarda el markdown editado localmente. Body: { markdown }
export const PUT: APIRoute = async ({ params, request }) => {
	const key = String(params.key ?? "");
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	if (!(await obtenerPrompt(key))) return j({ ok: false, error: "key no encontrada" }, 404);

	let body: { markdown?: string };
	try { body = (await request.json()) as { markdown?: string }; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const md = String(body.markdown ?? "");
	if (!md.trim()) return j({ ok: false, error: "markdown vacío" }, 400);
	const messages = parsearMd(md);
	if (!messages.length) return j({ ok: false, error: "el markdown no contiene bloques <!--role: ...--> ... <!--/role-->" }, 400);

	let snapshot: PromptContentSnapshot | null = null;
	if (await existeContenidoLocal(key)) {
		try { ({ snapshot } = await leerContenidoLocal(key)); } catch { snapshot = null; }
	}
	if (snapshot) {
		snapshot.messages = messages;
	}
	await escribirContenidoLocal(key, md, snapshot);
	return j({ ok: true, key, messages: messages.length });
};

// POST?publish=1 → toma la copia local y crea una nueva versión en OpenAI.
export const POST: APIRoute = async ({ params, request }) => {
	const key = String(params.key ?? "");
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	const entry = await obtenerPrompt(key);
	if (!entry) return j({ ok: false, error: "key no encontrada" }, 404);

	if (new URL(request.url).searchParams.get("publish") !== "1") {
		return j({ ok: false, error: "acción no soportada (usa ?publish=1)" }, 400);
	}

	if (!(await existeContenidoLocal(key))) return j({ ok: false, error: "no hay copia local que publicar" }, 404);

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const { markdown, snapshot } = await leerContenidoLocal(key);
	const messages = parsearMd(markdown);
	if (!messages.length) return j({ ok: false, error: "el markdown no contiene mensajes" }, 400);

	try {
		const r = await publicarNuevaVersion(entry.id, messages, snapshot?.model ?? "", apiKey);
		return j({ ok: true, key, version: r.version, raw: r.raw });
	} catch (err) {
		return j({ ok: false, error: err instanceof Error ? err.message : String(err) }, 502);
	}
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
