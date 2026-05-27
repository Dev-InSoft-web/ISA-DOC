import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";
import { FILES_CACHE, leerJson } from "../../../../../lib/patyia/storage.ts";
import { backupOne, type OpenAIFileMetaLite } from "../../../../../lib/patyia/openaiBackup.ts";

export const prerender = false;

interface CachedFile {
	id: string;
	filename: string;
	bytes: number;
	created_at: number;
	purpose: string;
}
interface Cache { updated: string; count: number; files: CachedFile[]; }

interface VSItem { id: string; }
interface VSList { data?: VSItem[]; error?: { message?: string }; }

// POST → recorre el cache local y descarga el contenido de TODOS los files.
// Reutiliza el helper backupOne. Para purpose=assistants requiere listar VS.
export const POST: APIRoute = async () => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const cache = await leerJson<Cache>(FILES_CACHE, { updated: "", count: 0, files: [] });
	if (!cache.files.length) return j({ ok: false, error: "Cache vacío. Refresca el listado primero." }, 400);

	let vsIds: string[] = [];
	try {
		const r = await fetch("https://api.openai.com/v1/vector_stores?limit=100", {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "assistants=v2" },
		});
		const text = await r.text();
		const parsed = JSON.parse(text) as VSList;
		if (r.ok) vsIds = (parsed.data ?? []).map((v) => v.id);
	} catch {
		// continuar sin vs ids (los assistants fallarán)
	}

	const exitos: { id: string; bytes: number; source: string }[] = [];
	const fallos: { id: string; error: string }[] = [];
	for (const f of cache.files) {
		const metaPrev: OpenAIFileMetaLite = {
			id: f.id, filename: f.filename, bytes: f.bytes, created_at: f.created_at, purpose: f.purpose,
		};
		const res = await backupOne(f.id, apiKey, vsIds, metaPrev);
		if (res.ok) exitos.push({ id: res.file_id, bytes: res.bytes, source: res.source });
		else fallos.push({ id: res.file_id, error: res.error });
	}

	return j({ ok: true, total: cache.files.length, exitos: exitos.length, fallos: fallos.length, detalleFallos: fallos });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
