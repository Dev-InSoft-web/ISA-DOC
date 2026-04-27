import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dist/lib/postman → ../../../  (raíz ISA) → ../iss-postman.json  + ../iss-postman/
// En desarrollo (tsx) este __dirname también termina apuntando a src/lib/postman.
function resolveDoc(...p: string[]): string {
	// Buscamos hacia arriba la carpeta "doc" desde __dirname y desde cwd
	const startDirs = [__dirname, process.cwd()];
	for (const start of startDirs) {
		let cur = start;
		for (let i = 0; i < 8; i++) {
			const candidate = resolve(cur, ...p);
			if (existsSync(candidate)) return candidate;
			const docCandidate = resolve(cur, "doc", ...p);
			if (existsSync(docCandidate)) return docCandidate;
			const isaCandidate = resolve(cur, "ISA-MigrarTblsBdd", ...p);
			if (existsSync(isaCandidate)) return isaCandidate;
			cur = resolve(cur, "..");
		}
	}
	// Fallback: ruta relativa al cwd
	return resolve(process.cwd(), ...p);
}

const POSTMAN_FILE = resolveDoc("iss-postman.json");
const POSTMAN_DIR = resolve(dirname(POSTMAN_FILE), "iss-postman");
const COLLECTION_FILE = join(POSTMAN_DIR, "_collection.json");
const ENTITIES_DIR = join(POSTMAN_DIR, "entities");

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
	[k: string]: unknown;
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
}

export function slugify(name: string): string {
	return name
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function ensureDir(p: string): void {
	if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

/** Divide iss-postman.json en _collection.json + entities/*.json */
export function splitCollection(): { ok: true; entities: EntityMeta[] } | { ok: false; error: string } {
	if (!existsSync(POSTMAN_FILE)) {
		return { ok: false, error: `No se encontró ${POSTMAN_FILE}` };
	}
	try {
		const raw = readFileSync(POSTMAN_FILE, "utf8");
		const data = JSON.parse(raw) as PostmanCollection;

		ensureDir(POSTMAN_DIR);
		ensureDir(ENTITIES_DIR);

		const entities: EntityMeta[] = [];
		for (const folder of data.item ?? []) {
			const slug = slugify(folder.name);
			const file: EntityFile = {
				name: folder.name,
				item: folder.item ?? [],
			};
			writeFileSync(join(ENTITIES_DIR, `${slug}.json`), JSON.stringify(file, null, 2), "utf8");
			entities.push({ slug, name: folder.name, count: file.item.length });
		}

		const meta = {
			info: data.info,
			variable: data.variable ?? [],
			entities,
		};
		writeFileSync(COLLECTION_FILE, JSON.stringify(meta, null, 2), "utf8");
		return { ok: true, entities };
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return { ok: false, error: msg };
	}
}

/** Devuelve metadatos de la colección y la lista de entidades persistidas. */
export function loadCollectionMeta(): CollectionMeta | null {
	if (!existsSync(COLLECTION_FILE)) {
		const r = splitCollection();
		if (!r.ok) return null;
	}
	try {
		const raw = readFileSync(COLLECTION_FILE, "utf8");
		const meta = JSON.parse(raw) as CollectionMeta;
		// Reconciliar entidades reales en disco
		if (existsSync(ENTITIES_DIR)) {
			const files = readdirSync(ENTITIES_DIR).filter((f) => f.endsWith(".json"));
			meta.entities = files.map((f) => {
				const slug = f.replace(/\.json$/, "");
				try {
					const j = JSON.parse(readFileSync(join(ENTITIES_DIR, f), "utf8")) as EntityFile;
					return { slug, name: j.name ?? slug, count: (j.item ?? []).length };
				} catch {
					return { slug, name: slug, count: 0 };
				}
			});
		}
		return meta;
	} catch {
		return null;
	}
}

export function loadEntity(slug: string): EntityFile | null {
	const file = join(ENTITIES_DIR, `${slug}.json`);
	if (!existsSync(file)) return null;
	try {
		return JSON.parse(readFileSync(file, "utf8")) as EntityFile;
	} catch {
		return null;
	}
}

export function saveEntity(slug: string, data: EntityFile): { ok: boolean; error?: string } {
	try {
		ensureDir(ENTITIES_DIR);
		writeFileSync(join(ENTITIES_DIR, `${slug}.json`), JSON.stringify(data, null, 2), "utf8");
		// Refrescar meta con conteo actualizado
		const meta = loadCollectionMeta();
		if (meta) writeFileSync(COLLECTION_FILE, JSON.stringify(meta, null, 2), "utf8");
		return { ok: true };
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return { ok: false, error: msg };
	}
}

export function saveCollectionVariables(variable: unknown[]): { ok: boolean; error?: string } {
	try {
		const meta = loadCollectionMeta();
		if (!meta) return { ok: false, error: "Sin metadata" };
		meta.variable = variable;
		writeFileSync(COLLECTION_FILE, JSON.stringify(meta, null, 2), "utf8");
		return { ok: true };
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return { ok: false, error: msg };
	}
}

/** Reconstruye iss-postman.json a partir de _collection.json + entities/*.json */
export function mergeCollection(): { ok: true; path: string; entities: number } | { ok: false; error: string } {
	const meta = loadCollectionMeta();
	if (!meta) return { ok: false, error: "No hay metadata de colección" };

	try {
		const items: PostmanItem[] = [];
		for (const ent of meta.entities) {
			const e = loadEntity(ent.slug);
			if (!e) continue;
			items.push({ name: e.name, item: e.item });
		}
		const collection: PostmanCollection = {
			info: meta.info,
			item: items,
			variable: meta.variable ?? [],
		};
		writeFileSync(POSTMAN_FILE, JSON.stringify(collection, null, 2), "utf8");
		return { ok: true, path: POSTMAN_FILE, entities: items.length };
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return { ok: false, error: msg };
	}
}

export function getPaths(): { collection: string; entities: string; source: string } {
	return { collection: COLLECTION_FILE, entities: ENTITIES_DIR, source: POSTMAN_FILE };
}
