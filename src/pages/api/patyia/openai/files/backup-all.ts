import type { APIRoute } from "astro";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";
import { BACKUP_PROGRESS, ensureDir, escribirJson, fileDir, FILES_CACHE, leerJson, safeExt, STORAGE_ROOT } from "../../../../../lib/patyia/storage.ts";
import { backupOne, listarArchivosVS, type OpenAIFileMetaLite } from "../../../../../lib/patyia/openaiBackup.ts";

export const prerender = false;

interface CachedFile {
	id: string;
	filename: string;
	bytes: number;
	created_at: number;
	purpose: string;
}
interface Cache { updated: string; count: number; files: CachedFile[]; }

interface VSItem { id: string; status?: string; expires_at?: number | null; }
interface VSList { data?: VSItem[]; error?: { message?: string }; }

interface BackupProgress {
	running: boolean;
	total: number;
	hecho: number;
	exitos: number;
	fallos: number;
	currentId: string;
	currentFilename: string;
	iniciado: string;
	finalizado: string;
	ultimosFallos: { id: string; error: string }[];
	cancelRequested: boolean;
}

const EMPTY_PROGRESS: BackupProgress = {
	running: false, total: 0, hecho: 0, exitos: 0, fallos: 0,
	currentId: "", currentFilename: "", iniciado: "", finalizado: "", ultimosFallos: [], cancelRequested: false,
};

// POST → arranca el backup en background. Devuelve inmediatamente.
// El progreso se sigue desde GET /api/patyia/openai/files/backup-progress.
export const POST: APIRoute = async () => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const prev = await leerJson<BackupProgress>(BACKUP_PROGRESS, EMPTY_PROGRESS);
	if (prev.running) return j({ ok: false, error: "Ya hay un backup en progreso" }, 409);

	const cache = await leerJson<Cache>(FILES_CACHE, { updated: "", count: 0, files: [] });
	if (!cache.files.length) return j({ ok: false, error: "Cache vacío. Refresca el listado primero." }, 400);

	await ensureDir(STORAGE_ROOT);
	const inicio: BackupProgress = {
		running: true, total: cache.files.length, hecho: 0, exitos: 0, fallos: 0,
		currentId: "", currentFilename: "", iniciado: new Date().toISOString(), finalizado: "", ultimosFallos: [], cancelRequested: false,
	};
	await escribirJson(BACKUP_PROGRESS, inicio);

	// arranque del worker SIN await (corre en background del proceso Node)
	void ejecutarBackup(apiKey, cache.files, inicio);

	return j({ ok: true, started: true, total: cache.files.length });
};

async function persistir(estado: BackupProgress): Promise<void> {
	// Propaga cancelRequested desde disco antes de pisar el archivo.
	const disco = await leerJson<BackupProgress>(BACKUP_PROGRESS, estado);
	if (disco.cancelRequested) estado.cancelRequested = true;
	await escribirJson(BACKUP_PROGRESS, estado);
}

function yaDescargado(fileId: string, filename: string, createdAt: number): boolean {
	const ext = safeExt(filename);
	return existsSync(join(fileDir(fileId, createdAt), `content.${ext}`));
}

async function ejecutarBackup(apiKey: string, files: CachedFile[], estado: BackupProgress): Promise<void> {
	const vsIds = await listarVS(apiKey);
	// Índice inverso fileId → vsIds[]. Evita iterar TODOS los VS por cada archivo.
	const mapVS = new Map<string, string[]>();
	for (const vs of vsIds) {
		const ids = await listarArchivosVS(vs, apiKey);
		for (const fid of ids) {
			const prev = mapVS.get(fid);
			if (prev) prev.push(vs);
			else mapVS.set(fid, [vs]);
		}
	}
	const CONCURRENCY = 6;
	let cursor = 0;

	async function worker(): Promise<void> {
		while (true) {
			const idx = cursor++;
			if (idx >= files.length) return;
			await persistir(estado);
			if (estado.cancelRequested) return;
			const f = files[idx]!;
			estado.currentId = f.id;
			estado.currentFilename = f.filename;
			if (yaDescargado(f.id, f.filename, f.created_at)) {
				estado.hecho += 1;
				estado.exitos += 1;
				await persistir(estado);
				continue;
			}
			const metaPrev: OpenAIFileMetaLite = {
				id: f.id, filename: f.filename, bytes: f.bytes, created_at: f.created_at, purpose: f.purpose,
			};
			const vsParaFile = mapVS.get(f.id) ?? [];
			const res = await backupOne(f.id, apiKey, vsParaFile, metaPrev);
			estado.hecho += 1;
			if (res.ok) estado.exitos += 1;
			else {
				estado.fallos += 1;
				estado.ultimosFallos.push({ id: res.file_id, error: res.error });
				if (estado.ultimosFallos.length > 20) estado.ultimosFallos.shift();
			}
			await persistir(estado);
		}
	}

	await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

	estado.running = false;
	estado.currentId = "";
	estado.currentFilename = "";
	estado.finalizado = new Date().toISOString();
	await persistir(estado);
}

async function listarVS(apiKey: string): Promise<string[]> {
	try {
		const r = await fetch("https://api.openai.com/v1/vector_stores?limit=100", {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "assistants=v2" },
			signal: AbortSignal.timeout(30_000),
		});
		const text = await r.text();
		const parsed = JSON.parse(text) as VSList;
		if (r.ok) {
			// excluir VS expirados o sin estado válido
			return (parsed.data ?? [])
				.filter((v) => v.status !== "expired" && v.status !== "in_progress")
				.map((v) => v.id);
		}
	} catch {
		// silencioso
	}
	return [];
}

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
