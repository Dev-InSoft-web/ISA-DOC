import type { APIRoute } from "astro";
import { escribirPromptsConfig, leerPromptsConfig, validarKey, type PromptEntry } from "../../../../lib/patyia/promptsConfig.ts";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
	const key = (params.key ?? "").trim();
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	const cfg = await leerPromptsConfig();
	const entry = cfg.prompts[key];
	if (!entry) return j({ ok: false, error: "no encontrada" }, 404);
	return j({ ok: true, key, entry });
};

// PUT → actualiza metadata existente. body: Partial<PromptEntry>
export const PUT: APIRoute = async ({ params, request }) => {
	const key = (params.key ?? "").trim();
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);

	let body: Partial<PromptEntry>;
	try { body = (await request.json()) as Partial<PromptEntry>; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const cfg = await leerPromptsConfig();
	const prev = cfg.prompts[key];
	if (!prev) return j({ ok: false, error: "no encontrada" }, 404);

	const next: PromptEntry = {
		label: typeof body.label === "string" ? body.label.trim() : prev.label,
		description: typeof body.description === "string" ? body.description.trim() : prev.description,
		model: typeof body.model === "string" ? body.model.trim() : prev.model,
	};

	cfg.prompts[key] = next;
	await escribirPromptsConfig(cfg);
	return j({ ok: true, key, entry: next });
};

export const DELETE: APIRoute = async ({ params }) => {
	const key = (params.key ?? "").trim();
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	const cfg = await leerPromptsConfig();
	if (!cfg.prompts[key]) return j({ ok: false, error: "no encontrada" }, 404);
	delete cfg.prompts[key];
	await escribirPromptsConfig(cfg);
	return j({ ok: true, key });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
