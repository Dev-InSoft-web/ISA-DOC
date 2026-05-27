import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

interface VectorStore {
	id: string;
	name: string;
	bytes?: number;
	file_counts?: { total?: number; completed?: number; in_progress?: number; failed?: number; cancelled?: number };
	status?: string;
	created_at?: number;
	last_active_at?: number | null;
	expires_after?: { anchor: string; days: number } | null;
	expires_at?: number | null;
}
interface VSList {
	data?: VectorStore[];
	has_more?: boolean;
	error?: { message?: string };
}

export const GET: APIRoute = async ({ url }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const limit = clampInt(url.searchParams.get("limit"), 100, 1, 100);
	const order = url.searchParams.get("order") === "asc" ? "asc" : "desc";
	const after = (url.searchParams.get("after") ?? "").trim();

	const u = new URL("https://api.openai.com/v1/vector_stores");
	u.searchParams.set("limit", String(limit));
	u.searchParams.set("order", order);
	if (after) u.searchParams.set("after", after);

	const r = await fetch(u.toString(), {
		method: "GET",
		headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "assistants=v2" },
	});
	const text = await r.text();
	let parsed: VSList;
	try { parsed = JSON.parse(text) as VSList; }
	catch { return j({ ok: false, error: `HTTP ${r.status} no JSON: ${text.slice(0, 200)}` }, 502); }
	if (!r.ok) return j({ ok: false, error: parsed.error?.message ?? `HTTP ${r.status}` }, r.status);
	return j({ ok: true, data: parsed.data ?? [], has_more: parsed.has_more ?? false });
};

function clampInt(raw: string | null, def: number, min: number, max: number): number {
	const n = Number(raw ?? "");
	if (!Number.isFinite(n)) return def;
	return Math.max(min, Math.min(max, Math.trunc(n)));
}
function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
