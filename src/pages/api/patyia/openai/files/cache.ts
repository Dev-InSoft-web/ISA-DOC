import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";
import { ensureDir, escribirJson, FILES_CACHE, leerJson, STORAGE_ROOT } from "../../../../../lib/patyia/storage.ts";

export const prerender = false;

interface OpenAIFile {
	id: string;
	object?: string;
	bytes: number;
	created_at: number;
	filename: string;
	purpose: string;
	status?: string;
}

interface FilesList {
	data?: OpenAIFile[];
	has_more?: boolean;
	error?: { message?: string };
}

interface CacheShape {
	updated: string;
	count: number;
	files: OpenAIFile[];
}

const EMPTY: CacheShape = { updated: "", count: 0, files: [] };

// GET → devuelve el cache local (sin tocar OpenAI)
export const GET: APIRoute = async () => {
	const data = await leerJson<CacheShape>(FILES_CACHE, EMPTY);
	return j({ ok: true, ...data });
};

// POST → sincroniza el cache trayendo TODOS los files desde OpenAI (paginado)
export const POST: APIRoute = async () => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const todos: OpenAIFile[] = [];
	let after: string | null = null;
	try {
		for (let i = 0; i < 200; i++) {
			const u = new URL("https://api.openai.com/v1/files");
			u.searchParams.set("limit", "10000");
			u.searchParams.set("order", "desc");
			if (after) u.searchParams.set("after", after);
			const r = await fetch(u.toString(), {
				method: "GET",
				headers: { Authorization: `Bearer ${apiKey}` },
			});
			const text = await r.text();
			let parsed: FilesList;
			try { parsed = JSON.parse(text) as FilesList; }
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

	const data: CacheShape = { updated: new Date().toISOString(), count: todos.length, files: todos };
	await ensureDir(STORAGE_ROOT);
	await escribirJson(FILES_CACHE, data);
	return j({ ok: true, ...data });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
