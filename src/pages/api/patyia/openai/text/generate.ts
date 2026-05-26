import type { APIRoute } from "astro";
import { resolveOpenAIKey, jsonResponse } from "../../../../../lib/patyia/openaiKey";

export const prerender = false;

interface Body {
	prompt?: string;
	system?: string;
	model?: string;
	temperature?: number;
}

interface OpenAIChatChoice {
	message?: { role?: string; content?: string };
	finish_reason?: string;
}

interface OpenAIChatResponse {
	choices?: OpenAIChatChoice[];
	usage?: Record<string, number>;
	model?: string;
	error?: { message?: string; type?: string; code?: string };
}

const DEFAULT_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";

export const POST: APIRoute = async ({ request }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return jsonResponse({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return jsonResponse({ ok: false, error: "JSON inválido" }, 400);
	}

	const prompt = (typeof payload.prompt === "string" ? payload.prompt : "").trim();
	if (!prompt) return jsonResponse({ ok: false, error: "prompt vacío" }, 400);
	if (prompt.length > 12000) return jsonResponse({ ok: false, error: "prompt excede 12000 caracteres" }, 400);

	const system = (typeof payload.system === "string" ? payload.system : "").trim();
	const model = (typeof payload.model === "string" && payload.model.trim()) ? payload.model.trim() : DEFAULT_MODEL;
	const temperature = typeof payload.temperature === "number" && Number.isFinite(payload.temperature) ? payload.temperature : 0.7;

	const messages: Array<{ role: string; content: string }> = [];
	if (system) messages.push({ role: "system", content: system });
	messages.push({ role: "user", content: prompt });

	let r: Response;
	try {
		r = await fetch(DEFAULT_URL, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ model, messages, temperature }),
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return jsonResponse({ ok: false, error: `Fallo al invocar OpenAI: ${msg}` }, 502);
	}

	const text = await r.text();
	let parsed: OpenAIChatResponse | null = null;
	try {
		parsed = JSON.parse(text) as OpenAIChatResponse;
	} catch {
		return jsonResponse({ ok: false, error: `OpenAI respondió HTTP ${r.status} no JSON`, raw: text.slice(0, 500) }, r.ok ? 502 : r.status);
	}

	if (!r.ok) {
		const msg = parsed?.error?.message ?? `OpenAI HTTP ${r.status}`;
		return jsonResponse({ ok: false, error: msg, openai: parsed?.error ?? null }, r.status);
	}

	const reply = parsed?.choices?.[0]?.message?.content ?? "";
	const finish = parsed?.choices?.[0]?.finish_reason ?? "";
	return jsonResponse({ ok: true, model: parsed?.model ?? model, text: reply, finish_reason: finish, usage: parsed?.usage ?? null });
};
