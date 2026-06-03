import { mkdir, readFile, readdir, writeFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";

export const STORAGE_ROOT = resolve(process.cwd(), "data", "openai-storage");
export const FILES_ROOT = join(STORAGE_ROOT, "files");
export const VS_ROOT = join(STORAGE_ROOT, "vector-stores");
export const SKILLS_ROOT = join(STORAGE_ROOT, "skills");
export const FILES_CACHE = join(STORAGE_ROOT, "files-cache.json");
export const VS_CACHE = join(STORAGE_ROOT, "vector-stores-cache.json");
export const SKILLS_CACHE = join(STORAGE_ROOT, "skills-cache.json");
export const BACKUP_PROGRESS = join(STORAGE_ROOT, "backup-progress.json");

export interface LocalFileMeta {
	categorias: string[];
	tags: string[];
	descripcion: string;
	notas: string;
	actualizado: string;
}

export const EMPTY_LOCAL_META: LocalFileMeta = {
	categorias: [],
	tags: [],
	descripcion: "",
	notas: "",
	actualizado: "",
};

const FECHA_DIR_RE = /^\d{4}-\d{2}-\d{2}$/;

export function fechaCarpeta(createdAt: number): string {
	const d = new Date(createdAt * 1000);
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}

export function fileDir(fileId: string, createdAt: number): string {
	return join(FILES_ROOT, fechaCarpeta(createdAt), fileId);
}

interface FilesCacheLite { files?: { id?: string; created_at?: number }[]; }

let fechaCachePromise: Promise<Map<string, string>> | null = null;

async function leerFechasDesdeCache(): Promise<Map<string, string>> {
	const cache = await leerJson<FilesCacheLite>(FILES_CACHE, {});
	const m = new Map<string, string>();
	for (const f of cache.files ?? []) {
		if (typeof f.id === "string" && typeof f.created_at === "number") {
			m.set(f.id, fechaCarpeta(f.created_at));
		}
	}
	return m;
}

async function fechasMap(): Promise<Map<string, string>> {
	if (!fechaCachePromise) fechaCachePromise = leerFechasDesdeCache();
	return fechaCachePromise;
}

export function invalidarFechasMap(): void {
	fechaCachePromise = null;
}

// Busca el directorio de un fileId cuando no se conoce su created_at.
// Estrategia: 1) consultar files-cache.json; 2) escanear carpetas YYYY-MM-DD.
export async function findFileDir(fileId: string): Promise<string | null> {
	const map = await fechasMap();
	const fecha = map.get(fileId);
	if (fecha) {
		const candidato = join(FILES_ROOT, fecha, fileId);
		if (await existe(candidato)) return candidato;
	}
	try {
		const entries = await readdir(FILES_ROOT, { withFileTypes: true });
		for (const e of entries) {
			if (!e.isDirectory() || !FECHA_DIR_RE.test(e.name)) continue;
			const candidato = join(FILES_ROOT, e.name, fileId);
			if (await existe(candidato)) return candidato;
		}
	} catch { /* ignore */ }
	return null;
}

export async function ensureDir(dir: string): Promise<void> {
	await mkdir(dir, { recursive: true });
}

export async function leerJson<T>(path: string, fallback: T): Promise<T> {
	try {
		const text = await readFile(path, "utf8");
		return JSON.parse(text) as T;
	} catch {
		return fallback;
	}
}

export async function escribirJson(path: string, data: unknown): Promise<void> {
	await writeFile(path, JSON.stringify(data, null, 2), "utf8");
}

export async function existe(path: string): Promise<boolean> {
	try {
		await stat(path);
		return true;
	} catch {
		return false;
	}
}

export function safeExt(filename: string): string {
	const m = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
	return m ? m[1] : "bin";
}

