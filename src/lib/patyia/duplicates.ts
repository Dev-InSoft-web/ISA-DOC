import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { FILES_ROOT, leerJson } from "./storage.ts";

export interface FileEntry {
	id: string;
	filename: string;
	bytes: number;
	path: string;
}

export interface ExactGroup {
	hash: string;
	bytes: number;
	items: FileEntry[];
}

export interface SimilarGroup {
	key: string;
	items: FileEntry[];
}

export interface DuplicatesReport {
	updated: string;
	totalEscaneados: number;
	totalConHash: number;
	exactGroups: ExactGroup[];
	similarGroups: SimilarGroup[];
}

function normalizarNombre(filename: string): string {
	const sinExt = filename.replace(/\.[a-z0-9]+$/i, "");
	return sinExt.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

async function listarLetras(): Promise<string[]> {
	try {
		const entries = await readdir(FILES_ROOT, { withFileTypes: true });
		return entries.filter((e) => e.isDirectory()).map((e) => e.name);
	} catch {
		return [];
	}
}

async function listarFileDirs(letra: string): Promise<string[]> {
	try {
		const entries = await readdir(join(FILES_ROOT, letra), { withFileTypes: true });
		return entries.filter((e) => e.isDirectory() && e.name.startsWith("file-")).map((e) => e.name);
	} catch {
		return [];
	}
}

async function localizarContenido(dir: string): Promise<string | null> {
	try {
		const entries = await readdir(dir);
		const content = entries.find((n) => n.startsWith("content."));
		return content ? join(dir, content) : null;
	} catch {
		return null;
	}
}

async function hashArchivo(path: string): Promise<{ hash: string; bytes: number } | null> {
	try {
		const buf = await readFile(path);
		return { hash: createHash("sha256").update(buf).digest("hex"), bytes: buf.byteLength };
	} catch {
		return null;
	}
}

export async function scanDuplicates(onProgress?: (done: number) => void): Promise<DuplicatesReport> {
	const letras = await listarLetras();
	const todos: { entry: FileEntry; hash: string }[] = [];
	let escaneados = 0;
	let conHash = 0;

	for (const letra of letras) {
		const fileDirs = await listarFileDirs(letra);
		for (const id of fileDirs) {
			escaneados += 1;
			const dir = join(FILES_ROOT, letra, id);
			const contentPath = await localizarContenido(dir);
			const meta = await leerJson<{ filename?: string }>(join(dir, "meta.json"), {});
			const filename = meta.filename ?? id;
			let bytes = 0;
			let hash = "";
			if (contentPath) {
				const h = await hashArchivo(contentPath);
				if (h) { hash = h.hash; bytes = h.bytes; conHash += 1; }
				else {
					try { bytes = (await stat(contentPath)).size; } catch { /* ignore */ }
				}
			}
			const entry: FileEntry = { id, filename, bytes, path: contentPath ?? dir };
			if (hash) todos.push({ entry, hash });
			if (onProgress && escaneados % 50 === 0) onProgress(escaneados);
		}
	}

	const porHash = new Map<string, FileEntry[]>();
	for (const t of todos) {
		const arr = porHash.get(t.hash) ?? [];
		arr.push(t.entry);
		porHash.set(t.hash, arr);
	}
	const exactGroups: ExactGroup[] = [];
	const idsEnExacto = new Set<string>();
	for (const [hash, items] of porHash) {
		if (items.length > 1) {
			exactGroups.push({ hash, bytes: items[0]!.bytes, items });
			for (const it of items) idsEnExacto.add(it.id);
		}
	}

	const porNombre = new Map<string, FileEntry[]>();
	for (const t of todos) {
		if (idsEnExacto.has(t.entry.id)) continue;
		const key = normalizarNombre(t.entry.filename);
		if (!key) continue;
		const arr = porNombre.get(key) ?? [];
		arr.push(t.entry);
		porNombre.set(key, arr);
	}
	const similarGroups: SimilarGroup[] = [];
	for (const [key, items] of porNombre) {
		if (items.length > 1) similarGroups.push({ key, items });
	}

	exactGroups.sort((a, b) => b.items.length - a.items.length);
	similarGroups.sort((a, b) => b.items.length - a.items.length);

	return {
		updated: new Date().toISOString(),
		totalEscaneados: escaneados,
		totalConHash: conHash,
		exactGroups,
		similarGroups,
	};
}
