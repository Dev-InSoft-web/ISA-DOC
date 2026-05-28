import type { APIRoute } from "astro";
import { resolveOpenAIKey, jsonResponse } from "../../../../lib/patyia/openaiKey";

export const prerender = false;

interface Body {
	promptId?: string;
	promptVersion?: string;
	input?: string;
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

export const POST: APIRoute = async ({ request }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return jsonResponse({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	let body: Body;
	try { body = (await request.json()) as Body; }
	catch { return jsonResponse({ ok: false, error: "JSON inválido" }, 400); }

	const promptId = String(body.promptId ?? "").trim();
	if (!/^pmpt_[A-Za-z0-9]+$/.test(promptId)) {
		return jsonResponse({ ok: false, error: "promptId inválido (esperado pmpt_…)" }, 400);
	}
	const promptVersion = String(body.promptVersion ?? "").trim();
	const input = String(body.input ?? "").trim();
	if (!input) return jsonResponse({ ok: false, error: "input vacío" }, 400);
	if (input.length > 50_000) return jsonResponse({ ok: false, error: "input excede 50k caracteres" }, 400);

	const promptParam: { id: string; version?: string } = { id: promptId };
	if (promptVersion) promptParam.version = promptVersion;

	let r: Response;
	try {
		r = await fetch("https://api.openai.com/v1/responses", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ prompt: promptParam, input }),
			signal: AbortSignal.timeout(60_000),
		});
	} catch (err) {
		return jsonResponse({ ok: false, error: err instanceof Error ? err.message : String(err) }, 502);
	}

	const text = await r.text();
	let parsed: OpenAIResponse;
	try { parsed = JSON.parse(text) as OpenAIResponse; }
	catch { return jsonResponse({ ok: false, error: `HTTP ${r.status} no JSON: ${text.slice(0, 300)}` }, 502); }

	if (!r.ok) return jsonResponse({ ok: false, error: parsed.error?.message ?? `HTTP ${r.status}`, raw: parsed }, r.status);

	const outputText = parsed.output_text ?? extraerTextoSalida(parsed.output);
	return jsonResponse({
		ok: true,
		id: parsed.id ?? "",
		model: parsed.model ?? "",
		output_text: outputText,
		usage: parsed.usage ?? null,
	});
};
