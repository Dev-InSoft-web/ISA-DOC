import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../lib/patyia/openaiKey.ts";
import { leerPromptsConfig, validarKey, validarPmptId } from "../../../../lib/patyia/promptsConfig.ts";

export const prerender = false;

interface Body {
	key?: string;
	id?: string;
	version?: string;
	input?: string;
	variables?: Record<string, string>;
}

interface ResponseContentItem { type?: string; text?: string | { value?: string } }
interface ResponseOutputItem { type?: string; content?: ResponseContentItem[] }
interface OpenAIResponse {
	id?: string;
	model?: string;
	output_text?: string;
	output?: ResponseOutputItem[];
	usage?: Record<string, number>;
	error?: { message?: string };
}

// POST → ejecuta un prompt configurado contra /v1/responses.
// body: { key?: string, id?: string, version?: string, input: string, variables?: Record<string,string> }
// Si se pasa `key` se resuelve desde data/openai-storage/prompts-config.json.
// Si se pasa `id` (y opcional `version`) se usa directo.
export const POST: APIRoute = async ({ request }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	let body: Body;
	try { body = (await request.json()) as Body; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const input = (body.input ?? "").toString();
	if (!input.trim()) return j({ ok: false, error: "input vacío" }, 400);
	if (input.length > 50_000) return j({ ok: false, error: "input excede 50k caracteres" }, 400);

	let promptId: string;
	let promptVersion: string;
	if (body.key) {
		const key = String(body.key).trim();
		if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
		const cfg = await leerPromptsConfig();
		const entry = cfg.prompts[key];
		if (!entry) return j({ ok: false, error: `prompt key no encontrada: ${key}` }, 404);
		promptId = entry.id;
		promptVersion = String(body.version ?? entry.version ?? "").trim();
	} else {
		promptId = String(body.id ?? "").trim();
		promptVersion = String(body.version ?? "").trim();
	}
	if (!validarPmptId(promptId)) return j({ ok: false, error: "id de prompt inválido" }, 400);

	const promptPayload: { id: string; version?: string; variables?: Record<string, string> } = { id: promptId };
	if (promptVersion) promptPayload.version = promptVersion;
	if (body.variables && typeof body.variables === "object") promptPayload.variables = body.variables;

	let r: Response;
	try {
		r = await fetch("https://api.openai.com/v1/responses", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ prompt: promptPayload, input }),
			signal: AbortSignal.timeout(60_000),
		});
	} catch (err) {
		return j({ ok: false, error: err instanceof Error ? err.message : String(err) }, 502);
	}

	const text = await r.text();
	let parsed: OpenAIResponse;
	try { parsed = JSON.parse(text) as OpenAIResponse; }
	catch { return j({ ok: false, error: `HTTP ${r.status} no JSON: ${text.slice(0, 300)}` }, 502); }

	if (!r.ok) return j({ ok: false, error: parsed.error?.message ?? `HTTP ${r.status}`, raw: parsed }, r.status);

	const outputText = parsed.output_text ?? extraerTextoSalida(parsed.output);
	return j({
		ok: true,
		id: parsed.id ?? "",
		model: parsed.model ?? "",
		output_text: outputText,
		usage: parsed.usage ?? null,
		prompt: { id: promptId, version: promptVersion },
		raw: parsed,
	});
};

function extraerTextoSalida(output: ResponseOutputItem[] | undefined): string {
	if (!Array.isArray(output)) return "";
	const partes: string[] = [];
	for (const it of output) {
		for (const c of it.content ?? []) {
			if (typeof c.text === "string") partes.push(c.text);
			else if (c.text && typeof c.text === "object" && typeof c.text.value === "string") partes.push(c.text.value);
		}
	}
	return partes.join("\n");
}

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
