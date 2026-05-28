import type { APIRoute } from "astro";
import { escribirPromptsConfig, leerPromptsConfig, validarKey, validarPmptId, type PromptEntry } from "../../../../lib/patyia/promptsConfig.ts";

export const prerender = false;

export const GET: APIRoute = async () => {
	const cfg = await leerPromptsConfig();
	return j({ ok: true, ...cfg });
};

// POST → crea una entrada nueva.
// body: { key, id, version?, label?, description? }
export const POST: APIRoute = async ({ request }) => {
	let body: Partial<PromptEntry> & { key?: string };
	try { body = (await request.json()) as Partial<PromptEntry> & { key?: string }; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const key = String(body.key ?? "").trim();
	const id = String(body.id ?? "").trim();
	if (!validarKey(key)) return j({ ok: false, error: "key inválida (A-Z, 0-9, _)" }, 400);
	if (!validarPmptId(id)) return j({ ok: false, error: "id inválido (pmpt_...)" }, 400);

	const cfg = await leerPromptsConfig();
	if (cfg.prompts[key]) return j({ ok: false, error: `key ya existe: ${key}` }, 409);

	cfg.prompts[key] = {
		id,
		version: String(body.version ?? "").trim(),
		label: String(body.label ?? key).trim(),
		description: String(body.description ?? "").trim(),
	};
	await escribirPromptsConfig(cfg);
	return j({ ok: true, key, entry: cfg.prompts[key] });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
