/**
 * Postman store · versión consolidada.
 *
 * Una única fuente de verdad: `doc/ISA-MigrarTblsBdd/postman-collection.json`.
 * La colección y los environments viven dentro de este proyecto ISA y se
 * editan exclusivamente desde esta UI (no se regeneran desde el ISS).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ISA_ROOT = (() => {
	let cur = __dirname;
	for (let i = 0; i < 8; i++) {
		if (existsSync(resolve(cur, "astro.config.ts")) || existsSync(resolve(cur, "astro.config.mjs"))) return cur;
		cur = resolve(cur, "..");
	}
	return process.cwd();
})();
const COLLECTION_FILE = join(ISA_ROOT, "postman-collection.json");
const ENV_FILE = join(ISA_ROOT, "postman-environments.json");

export interface PostmanItem {
	name: string;
	request?: unknown;
	response?: unknown[];
	item?: PostmanItem[];
	[k: string]: unknown;
}

export interface PostmanCollection {
	info: { name: string; description?: string; schema: string; _postman_id?: string; _exporter_id?: string };
	item: PostmanItem[];
	variable?: unknown[];
	[k: string]: unknown;
}

export interface EntityFile {
	name: string;
	item: PostmanItem[];
}

export interface EntityMeta {
	slug: string;
	name: string;
	count: number;
}

export interface CollectionMeta {
	info: PostmanCollection["info"];
	variable: unknown[];
	entities: EntityMeta[];
	path: string;
}

function ensureDir(p: string): void {
	if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

export function slugify(name: string): string {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function readCollection(): PostmanCollection | null {
	if (!existsSync(COLLECTION_FILE)) {
		console.warn(`[postman/store] No existe: ${COLLECTION_FILE}`);
		return null;
	}
	try { return JSON.parse(readFileSync(COLLECTION_FILE, "utf8")) as PostmanCollection; }
	catch (err) {
		console.error(`[postman/store] Error leyendo ${COLLECTION_FILE}:`, err);
		return null;
	}
}

function writeCollection(col: PostmanCollection): void {
	writeFileSync(COLLECTION_FILE, JSON.stringify(col, null, 2), "utf8");
}

/** Mapa slug -> índice en `item[]`, derivado de los nombres de carpeta. */
function buildSlugIndex(col: PostmanCollection): Map<string, number> {
	const map = new Map<string, number>();
	const used = new Set<string>();
	for (let i = 0; i < (col.item ?? []).length; i++) {
		let base = slugify(col.item[i].name) || `entidad-${i}`;
		let s = base;
		let n = 2;
		while (used.has(s)) s = `${base}-${n++}`;
		used.add(s);
		map.set(s, i);
	}
	return map;
}

export function loadCollectionMeta(): CollectionMeta | null {
	const col = readCollection();
	if (!col) return null;
	const idx = buildSlugIndex(col);
	const entities: EntityMeta[] = [];
	for (const [slug, i] of idx) {
		const folder = col.item[i];
		entities.push({ slug, name: folder.name, count: (folder.item ?? []).length });
	}
	return { info: col.info, variable: col.variable ?? [], entities, path: COLLECTION_FILE };
}

export function loadEntity(slug: string): EntityFile | null {
	const col = readCollection();
	if (!col) return null;
	const idx = buildSlugIndex(col);
	const i = idx.get(slug);
	if (i == null) return null;
	const folder = col.item[i];
	return { name: folder.name, item: folder.item ?? [] };
}

export function saveEntity(slug: string, data: EntityFile): { ok: boolean; error?: string } {
	const col = readCollection();
	if (!col) return { ok: false, error: "Sin colección base" };
	const idx = buildSlugIndex(col);
	const i = idx.get(slug);
	if (i == null) return { ok: false, error: `slug no encontrado: ${slug}` };
	col.item[i] = { ...col.item[i], name: data.name, item: data.item };
	try { writeCollection(col); return { ok: true }; }
	catch (err) { return { ok: false, error: err instanceof Error ? err.message : String(err) }; }
}

export function saveCollectionVariables(variable: unknown[]): { ok: boolean; error?: string } {
	const col = readCollection();
	if (!col) return { ok: false, error: "Sin colección base" };
	col.variable = variable;
	try { writeCollection(col); return { ok: true }; }
	catch (err) { return { ok: false, error: err instanceof Error ? err.message : String(err) }; }
}

/** Devuelve la colección completa (para la pestaña "Resumen"). */
export function loadFullCollection(): PostmanCollection | null {
	return readCollection();
}

/** Compatibilidad: ahora `merge` simplemente devuelve la ruta + número de carpetas. */
export function mergeCollection(): { ok: true; path: string; entities: number } | { ok: false; error: string } {
	const col = readCollection();
	if (!col) return { ok: false, error: "Sin colección" };
	return { ok: true, path: COLLECTION_FILE, entities: (col.item ?? []).length };
}

/** Compatibilidad: ya no hay split físico — se considera siempre listo. */
export function splitCollection(): { ok: true; entities: EntityMeta[] } | { ok: false; error: string } {
	const meta = loadCollectionMeta();
	if (!meta) return { ok: false, error: "Sin colección" };
	return { ok: true, entities: meta.entities };
}

export function getPaths(): { collection: string; environments: string } {
	return { collection: COLLECTION_FILE, environments: ENV_FILE };
}

// === Environments ===========================================================
export interface EnvVar { key: string; value: string; type?: string; enabled?: boolean }
export interface Environment { id: string; name: string; values: EnvVar[] }
export interface EnvironmentsFile { active: string; environments: Environment[] }

const DEFAULT_ENVS: EnvironmentsFile = {
	active: "default",
	environments: [{
		id: "default",
		name: "Default",
		values: [
			{ key: "host_contapymeu", value: "http://localhost:7071", enabled: true },
			{ key: "token", value: "", type: "secret", enabled: true },
		],
	}],
};

export function loadEnvironments(): EnvironmentsFile {
	if (!existsSync(ENV_FILE)) {
		ensureDir(dirname(ENV_FILE));
		writeFileSync(ENV_FILE, JSON.stringify(DEFAULT_ENVS, null, 2), "utf8");
		return DEFAULT_ENVS;
	}
	try {
		const data = JSON.parse(readFileSync(ENV_FILE, "utf8")) as EnvironmentsFile;
		if (!data.environments?.length) return DEFAULT_ENVS;
		if (!data.active) data.active = data.environments[0].id;
		return data;
	} catch { return DEFAULT_ENVS; }
}

export function saveEnvironments(data: EnvironmentsFile): { ok: boolean; error?: string } {
	try {
		ensureDir(dirname(ENV_FILE));
		writeFileSync(ENV_FILE, JSON.stringify(data, null, 2), "utf8");
		return { ok: true };
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : String(err) };
	}
}
