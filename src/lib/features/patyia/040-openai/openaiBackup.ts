import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ensureDir, escribirJson, fileDir, safeExt } from "./storage.ts";

const FETCH_TIMEOUT_MS = 30_000;
function signalTO(): AbortSignal { return AbortSignal.timeout(FETCH_TIMEOUT_MS); }

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
		signal: signalTO(),
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
		let r: Response | null = null;
		let text = "";
		for (let intento = 0; intento < 3; intento++) {
			r = await fetch(u.toString(), {
				method: "GET",
				headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "assistants=v2" },
				signal: signalTO(),
			});
			text = await r.text();
			if (r.status !== 429 && r.status < 500) break;
			await new Promise((res) => setTimeout(res, 400 * (intento + 1) ** 2));
		}
		if (!r) throw new Error("sin respuesta");
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

export async function listarArchivosVS(vsId: string, apiKey: string): Promise<string[]> {
	const ids: string[] = [];
	let after: string | null = null;
	for (let i = 0; i < 200; i++) {
		const u = new URL(`https://api.openai.com/v1/vector_stores/${encodeURIComponent(vsId)}/files`);
		u.searchParams.set("limit", "100");
		if (after) u.searchParams.set("after", after);
		let r: Response | null = null;
		let text = "";
		for (let intento = 0; intento < 3; intento++) {
			r = await fetch(u.toString(), {
				method: "GET",
				headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "assistants=v2" },
				signal: signalTO(),
			});
			text = await r.text();
			if (r.status !== 429 && r.status < 500) break;
			await new Promise((res) => setTimeout(res, 400 * (intento + 1) ** 2));
		}
		if (!r || !r.ok) break;
		let parsed: { data?: { id?: string }[]; has_more?: boolean; last_id?: string | null };
		try { parsed = JSON.parse(text); }
		catch { break; }
		for (const it of parsed.data ?? []) if (typeof it.id === "string") ids.push(it.id);
		if (!parsed.has_more || !parsed.last_id) break;
		after = parsed.last_id;
	}
	return ids;
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

	if (typeof meta.created_at !== "number") {
		return { ok: false, file_id: fileId, error: "meta: sin created_at, requerido para folderizar por fecha" };
	}
	const dir = fileDir(fileId, meta.created_at);
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

	const descargarDirecto = async (): Promise<Buffer | null> => {
		const url = `https://api.openai.com/v1/files/${encodeURIComponent(fileId)}/content`;
		const headers = { Authorization: `Bearer ${apiKey}` };
		let r: Response | null = null;
		for (let intento = 0; intento < 3; intento++) {
			r = await fetch(url, { method: "GET", headers, signal: signalTO() });
			if (r.status !== 429 && r.status < 500) break;
			await new Promise((res) => setTimeout(res, 400 * (intento + 1) ** 2));
		}
		if (!r || !r.ok) return null;
		return Buffer.from(await r.arrayBuffer());
	};

	try {
		if (purpose === "assistants" || purpose === "assistants_output") {
			const errores: string[] = [];
			for (const vs of vsIds) {
				try {
					const texto = await descargarDesdeVS(vs, fileId, apiKey);
					return await guardar(texto, `vector_store:${vs}`);
				} catch (err) {
					errores.push(`${vs}: ${msg(err)}`);
				}
			}
			// Fallback: intentar descarga directa (algunos purpose=assistants sí lo permiten).
			const buf = await descargarDirecto();
			if (buf) return await guardar(buf, "files");
			if (!vsIds.length) {
				return { ok: false, file_id: fileId, error: "huérfano: no pertenece a ningún vector store y descarga directa denegada" };
			}
			return { ok: false, file_id: fileId, error: `No descargable. ${errores.join(" | ")}` };
		}

		const buf = await descargarDirecto();
		if (!buf) return { ok: false, file_id: fileId, error: "descarga directa falló" };

		return await guardar(buf, "files");
	} catch (err) {
		return { ok: false, file_id: fileId, error: msg(err) };
	}
}
