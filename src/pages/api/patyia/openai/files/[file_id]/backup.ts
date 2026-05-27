import type { APIRoute } from "astro";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { resolveOpenAIKey } from "../../../../../../lib/patyia/openaiKey.ts";
import { ensureDir, escribirJson, fileDir, safeExt } from "../../../../../../lib/patyia/storage.ts";

export const prerender = false;

const FILE_ID_RE = /^file-[A-Za-z0-9]+$/;
const VS_ID_RE = /^vs_[A-Za-z0-9]+$/;

interface OpenAIFileMeta {
	id?: string;
	filename?: string;
	bytes?: number;
	created_at?: number;
	purpose?: string;
	error?: { message?: string };
}

interface VectorChunk {
	type?: string;
	text?: string;
}
interface VectorContentPage {
	data?: VectorChunk[];
	has_more?: boolean;
	next_page?: string | null;
	error?: { message?: string };
}

// POST /api/patyia/openai/files/{file_id}/backup?vs=vs_xxx,vs_yyy
// Descarga el contenido del archivo (directo o vía vector store si purpose=assistants)
// y lo guarda en data/openai-storage/files/<file_id>/.
export const POST: APIRoute = async ({ params, url }) => {
	const fileId = (params.file_id ?? "").trim();
	if (!FILE_ID_RE.test(fileId)) return j({ ok: false, error: "file_id inválido" }, 400);

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const vsIds = (url.searchParams.get("vs") ?? "")
		.split(",")
		.map((s) => s.trim())
		.filter((s) => VS_ID_RE.test(s));

	let meta: OpenAIFileMeta;
	try { meta = await pedirMeta(fileId, apiKey); }
	catch (err) { return j({ ok: false, error: `meta: ${msg(err)}` }, 500); }

	const dir = fileDir(fileId);
	await ensureDir(dir);
	await escribirJson(join(dir, "meta.json"), meta);

	const filename = meta.filename ?? fileId;
	const ext = safeExt(filename);
	const destino = join(dir, `content.${ext}`);
	const purpose = meta.purpose ?? "";

	try {
		if (purpose === "assistants" || purpose === "assistants_output") {
			if (!vsIds.length) {
				return j(
					{ ok: false, error: "Archivo purpose=assistants requiere ?vs=<vector_store_id> para backup", meta },
					400,
				);
			}
			const errores: string[] = [];
			for (const vs of vsIds) {
				try {
					const texto = await descargarVS(vs, fileId, apiKey);
					await writeFile(destino, texto, "utf8");
					return j({ ok: true, file_id: fileId, path: destino, source: `vector_store:${vs}`, bytes: Buffer.byteLength(texto, "utf8") });
				} catch (err) {
					errores.push(`${vs}: ${msg(err)}`);
				}
			}
			return j({ ok: false, error: `No se pudo descargar desde vector stores. ${errores.join(" | ")}` }, 404);
		}

		const r = await fetch(`https://api.openai.com/v1/files/${encodeURIComponent(fileId)}/content`, {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}` },
		});
		if (!r.ok) {
			const txt = await r.text();
			return j({ ok: false, error: `HTTP ${r.status}: ${txt.slice(0, 300)}` }, r.status);
		}
		const buf = Buffer.from(await r.arrayBuffer());
		await writeFile(destino, buf);
		return j({ ok: true, file_id: fileId, path: destino, source: "files", bytes: buf.byteLength });
	} catch (err) {
		return j({ ok: false, error: msg(err) }, 500);
	}
};

async function pedirMeta(fileId: string, apiKey: string): Promise<OpenAIFileMeta> {
	const r = await fetch(`https://api.openai.com/v1/files/${encodeURIComponent(fileId)}`, {
		method: "GET",
		headers: { Authorization: `Bearer ${apiKey}` },
	});
	const text = await r.text();
	let parsed: OpenAIFileMeta;
	try { parsed = JSON.parse(text) as OpenAIFileMeta; }
	catch { throw new Error(`HTTP ${r.status} no JSON: ${text.slice(0, 200)}`); }
	if (!r.ok) throw new Error(parsed.error?.message ?? `HTTP ${r.status}`);
	return parsed;
}

async function descargarVS(vsId: string, fileId: string, apiKey: string): Promise<string> {
	const partes: string[] = [];
	let after: string | null = null;
	for (let i = 0; i < 50; i++) {
		const u = new URL(
			`https://api.openai.com/v1/vector_stores/${encodeURIComponent(vsId)}/files/${encodeURIComponent(fileId)}/content`,
		);
		if (after) u.searchParams.set("after", after);
		const r = await fetch(u.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"OpenAI-Beta": "assistants=v2",
			},
		});
		const text = await r.text();
		let parsed: VectorContentPage;
		try { parsed = JSON.parse(text) as VectorContentPage; }
		catch { throw new Error(`HTTP ${r.status} no JSON: ${text.slice(0, 200)}`); }
		if (!r.ok) throw new Error(parsed.error?.message ?? `HTTP ${r.status}`);
		for (const it of parsed.data ?? []) {
			if (typeof it.text === "string") partes.push(it.text);
		}
		if (!parsed.has_more || !parsed.next_page) break;
		after = parsed.next_page;
	}
	return partes.join("\n\n");
}

function msg(err: unknown): string {
	return err instanceof Error ? err.message : String(err);
}

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
