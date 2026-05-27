import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { resolve, join } from "node:path";

export const STORAGE_ROOT = resolve(process.cwd(), "data", "openai-storage");
export const FILES_ROOT = join(STORAGE_ROOT, "files");
export const VS_ROOT = join(STORAGE_ROOT, "vector-stores");
export const SKILLS_ROOT = join(STORAGE_ROOT, "skills");
export const FILES_CACHE = join(STORAGE_ROOT, "files-cache.json");
export const VS_CACHE = join(STORAGE_ROOT, "vector-stores-cache.json");
export const SKILLS_CACHE = join(STORAGE_ROOT, "skills-cache.json");

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

export function fileDir(fileId: string): string {
	return join(FILES_ROOT, fileId);
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
