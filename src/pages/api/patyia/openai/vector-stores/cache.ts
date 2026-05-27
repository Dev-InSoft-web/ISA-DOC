import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";
import { ensureDir, escribirJson, leerJson, STORAGE_ROOT, VS_CACHE } from "../../../../../lib/patyia/storage.ts";

export const prerender = false;

interface VectorStore {
	id: string;
	name: string;
	bytes?: number;
	file_counts?: { total?: number; completed?: number; in_progress?: number; failed?: number; cancelled?: number };
	status?: string;
	created_at?: number;
}
interface VSList {
	data?: VectorStore[];
	has_more?: boolean;
	error?: { message?: string };
}
interface Cache { updated: string; count: number; items: VectorStore[]; }
const EMPTY: Cache = { updated: "", count: 0, items: [] };

export const GET: APIRoute = async () => {
	const data = await leerJson<Cache>(VS_CACHE, EMPTY);
	return j({ ok: true, ...data });
};

export const POST: APIRoute = async () => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const todos: VectorStore[] = [];
	let after: string | null = null;
	try {
		for (let i = 0; i < 200; i++) {
			const u = new URL("https://api.openai.com/v1/vector_stores");
			u.searchParams.set("limit", "100");
			u.searchParams.set("order", "desc");
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
			const lote = parsed.data ?? [];
			todos.push(...lote);
			if (!parsed.has_more || lote.length === 0) break;
			after = lote[lote.length - 1]!.id;
		}
	} catch (err) {
		return j({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
	}

	const data: Cache = { updated: new Date().toISOString(), count: todos.length, items: todos };
	await ensureDir(STORAGE_ROOT);
	await escribirJson(VS_CACHE, data);
	return j({ ok: true, ...data });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
