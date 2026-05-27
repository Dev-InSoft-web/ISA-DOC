import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ensureDir, escribirJson, fileDir, safeExt } from "./storage.ts";

export interface OpenAIFileMetaLite {
	id?: string;
	filename?: string;
	bytes?: number;
	created_at?: number;
	purpose?: string;
	error?: { message?: string };
}

interface VectorChunk { type?: string; text?: string; }
interface VectorContentPage {
	data?: VectorChunk[];
	has_more?: boolean;
	next_page?: string | null;
	error?: { message?: string };
}

export interface BackupOk {
	ok: true;
	file_id: string;
	path: string;
	source: string;
	bytes: number;
}
export interface BackupErr {
	ok: false;
	file_id: string;
	error: string;
}
export type BackupResult = BackupOk | BackupErr;

export async function pedirFileMeta(fileId: string, apiKey: string): Promise<OpenAIFileMetaLite> {
	const r = await fetch(`https://api.openai.com/v1/files/${encodeURIComponent(fileId)}`, {
		method: "GET",
		headers: { Authorization: `Bearer ${apiKey}` },
	});
	const text = await r.text();
	let parsed: OpenAIFileMetaLite;
	try { parsed = JSON.parse(text) as OpenAIFileMetaLite; }
	catch { throw new Error(`HTTP ${r.status} no JSON: ${text.slice(0, 200)}`); }
	if (!r.ok) throw new Error(parsed.error?.message ?? `HTTP ${r.status}`);
	return parsed;
}

export async function descargarDesdeVS(vsId: string, fileId: string, apiKey: string): Promise<string> {
	const partes: string[] = [];
	let after: string | null = null;
	for (let i = 0; i < 50; i++) {
		const u = new URL(
			`https://api.openai.com/v1/vector_stores/${encodeURIComponent(vsId)}/files/${encodeURIComponent(fileId)}/content`,
		);
		if (after) u.searchParams.set("after", after);
		const r = await fetch(u.toString(), {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "assistants=v2" },
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

export async function backupOne(
	fileId: string,
	apiKey: string,
	vsIds: string[],
	metaPrev?: OpenAIFileMetaLite,
): Promise<BackupResult> {
	const msg = (e: unknown) => e instanceof Error ? e.message : String(e);
	let meta: OpenAIFileMetaLite;
	try { meta = metaPrev ?? await pedirFileMeta(fileId, apiKey); }
	catch (err) { return { ok: false, file_id: fileId, error: `meta: ${msg(err)}` }; }

	const dir = fileDir(fileId);
	const filename = meta.filename ?? fileId;
	const ext = safeExt(filename);
	const destino = join(dir, `content.${ext}`);
	const purpose = meta.purpose ?? "";

	const guardar = async (contenido: Buffer | string, source: string): Promise<BackupOk> => {
		await ensureDir(dir);
		await escribirJson(join(dir, "meta.json"), meta);
		await writeFile(destino, contenido);
		const bytes = typeof contenido === "string" ? Buffer.byteLength(contenido, "utf8") : contenido.byteLength;

		return { ok: true, file_id: fileId, path: destino, source, bytes };
	};

	try {
		if (purpose === "assistants" || purpose === "assistants_output") {
			if (!vsIds.length) {
				return { ok: false, file_id: fileId, error: "purpose=assistants requiere vector stores" };
			}
			const errores: string[] = [];
			for (const vs of vsIds) {
				try {
					const texto = await descargarDesdeVS(vs, fileId, apiKey);
					return await guardar(texto, `vector_store:${vs}`);
				} catch (err) {
					errores.push(`${vs}: ${msg(err)}`);
				}
			}
			return { ok: false, file_id: fileId, error: `No descargable. ${errores.join(" | ")}` };
		}

		const r = await fetch(`https://api.openai.com/v1/files/${encodeURIComponent(fileId)}/content`, {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}` },
		});
		if (!r.ok) {
			const txt = await r.text();
			return { ok: false, file_id: fileId, error: `HTTP ${r.status}: ${txt.slice(0, 200)}` };
		}
		const buf = Buffer.from(await r.arrayBuffer());

		return await guardar(buf, "files");
	} catch (err) {
		return { ok: false, file_id: fileId, error: msg(err) };
	}
}
