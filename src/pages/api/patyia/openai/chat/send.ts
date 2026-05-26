import type { APIRoute } from "astro";
import { resolveOpenAIKey, jsonResponse } from "../../../../../lib/patyia/openaiKey";

export const prerender = false;

interface ChatMessage {
	role: "system" | "user" | "assistant";
	content: string;
}

interface Body {
	messages?: ChatMessage[];
	model?: string;
	temperature?: number;
}

interface OpenAIChatResponse {
	choices?: Array<{ message?: { role?: string; content?: string }; finish_reason?: string }>;
	usage?: Record<string, number>;
	model?: string;
	error?: { message?: string; type?: string; code?: string };
}

const DEFAULT_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4o-mini";
const ALLOWED_ROLES = new Set(["system", "user", "assistant"]);

export const POST: APIRoute = async ({ request }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return jsonResponse({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return jsonResponse({ ok: false, error: "JSON inválido" }, 400);
	}

	const raw = Array.isArray(payload.messages) ? payload.messages : [];
	const messages: ChatMessage[] = [];
	for (const m of raw) {
		if (!m || typeof m !== "object") continue;
		const role = String(m.role) as ChatMessage["role"];
		const content = typeof m.content === "string" ? m.content : "";
		if (!ALLOWED_ROLES.has(role)) continue;
		if (!content.trim()) continue;
		messages.push({ role, content });
	}
	if (!messages.length) return jsonResponse({ ok: false, error: "messages vacío" }, 400);
	if (messages.length > 50) return jsonResponse({ ok: false, error: "demasiados mensajes (máx 50)" }, 400);

	const model = (typeof payload.model === "string" && payload.model.trim()) ? payload.model.trim() : DEFAULT_MODEL;
	const temperature = typeof payload.temperature === "number" && Number.isFinite(payload.temperature) ? payload.temperature : 0.7;

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

	const reply = parsed?.choices?.[0]?.message;
	const message: ChatMessage = {
		role: (reply?.role === "assistant" || reply?.role === "system" || reply?.role === "user" ? reply.role : "assistant") as ChatMessage["role"],
		content: typeof reply?.content === "string" ? reply.content : "",
	};
	return jsonResponse({ ok: true, model: parsed?.model ?? model, message, usage: parsed?.usage ?? null });
};
