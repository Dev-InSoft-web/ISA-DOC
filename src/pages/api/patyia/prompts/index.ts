import type { APIRoute } from "astro";
import { escribirPromptsConfig, leerPromptsConfig, validarKey, type PromptEntry } from "../../../../lib/patyia/promptsConfig.ts";
import { escribirContenidoLocal, existeContenidoLocal, parsearMd, plantillaVacia, type PromptContentSnapshot } from "../../../../lib/patyia/promptContent.ts";

export const prerender = false;

export const GET: APIRoute = async () => {
	const cfg = await leerPromptsConfig();
	return j({ ok: true, ...cfg });
};

// POST → crea una entrada nueva (solo metadata local; no toca OpenAI).
// body: { key, label?, description?, model? }
export const POST: APIRoute = async ({ request }) => {
	let body: Partial<PromptEntry> & { key?: string };
	try { body = (await request.json()) as Partial<PromptEntry> & { key?: string }; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const key = String(body.key ?? "").trim();
	if (!validarKey(key)) return j({ ok: false, error: "key inválida (A-Z, 0-9, _)" }, 400);

	const cfg = await leerPromptsConfig();
	if (cfg.prompts[key]) return j({ ok: false, error: `key ya existe: ${key}` }, 409);

	cfg.prompts[key] = {
		label: String(body.label ?? key).trim(),
		description: String(body.description ?? "").trim(),
		model: String(body.model ?? "").trim(),
	};
	await escribirPromptsConfig(cfg);

	// Crea plantilla local vacía para que el modal Contenido tenga base editable.
	if (!(await existeContenidoLocal(key))) {
		const md = plantillaVacia();
		const snapshot: PromptContentSnapshot = {
			messages: parsearMd(md),
			model: cfg.prompts[key].model,
			updated_at: new Date().toISOString(),
		};
		await escribirContenidoLocal(key, md, snapshot);
	}

	return j({ ok: true, key, entry: cfg.prompts[key] });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
