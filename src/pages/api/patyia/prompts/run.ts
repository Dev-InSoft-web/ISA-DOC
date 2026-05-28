import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../lib/patyia/openaiKey.ts";
import { leerPromptsConfig, validarKey } from "../../../../lib/patyia/promptsConfig.ts";
import { existeContenidoLocal, leerContenidoLocal, parsearMd } from "../../../../lib/patyia/promptContent.ts";

export const prerender = false;

interface Body {
	key?: string;
	input?: string;
	model?: string;
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

interface InputMessage { role: string; content: string }

function defaultModel(): string {
	return (process.env.paty_openai_model ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini").trim() || "gpt-4o-mini";
}

function aplicarVariables(text: string, vars: Record<string, string> | undefined): string {
	if (!vars) return text;
	return text.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, k: string) => (vars[k] ?? `{{${k}}}`));
}

// POST → ejecuta inline el contenido local del prompt contra /v1/responses.
// body: { key, input, model?, variables? }
export const POST: APIRoute = async ({ request }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	let body: Body;
	try { body = (await request.json()) as Body; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const input = (body.input ?? "").toString();
	if (!input.trim()) return j({ ok: false, error: "input vacío" }, 400);
	if (input.length > 50_000) return j({ ok: false, error: "input excede 50k caracteres" }, 400);

	const key = String(body.key ?? "").trim();
	if (!validarKey(key)) return j({ ok: false, error: "key inválida" }, 400);
	const cfg = await leerPromptsConfig();
	const entry = cfg.prompts[key];
	if (!entry) return j({ ok: false, error: `prompt key no encontrada: ${key}` }, 404);

	if (!(await existeContenidoLocal(key))) {
		return j({ ok: false, error: `sin contenido local para ${key}; ábrelo en "Contenido" y guárdalo` }, 404);
	}
	const { markdown } = await leerContenidoLocal(key);
	const baseMessages = parsearMd(markdown);
	if (!baseMessages.length) {
		return j({ ok: false, error: "el contenido local no tiene mensajes <!--role:...-->" }, 400);
	}

	const model = (body.model ?? entry.model ?? "").trim() || defaultModel();
	const inputMessages: InputMessage[] = baseMessages.map((m) => ({
		role: m.role,
		content: aplicarVariables(m.content, body.variables),
	}));
	inputMessages.push({ role: "user", content: input });

	let r: Response;
	try {
		r = await fetch("https://api.openai.com/v1/responses", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ model, input: inputMessages }),
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
		model: parsed.model ?? model,
		output_text: outputText,
		usage: parsed.usage ?? null,
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
