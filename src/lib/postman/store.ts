/**
 * Postman store · factory por proyecto.
 *
 * Dos modos:
 * - **Monolítico** (ClientesIS): una única fuente `postman-collection.json`.
 *   Las "entidades" se derivan de `col.item[i]` (folders) por slug.
 * - **Fragmentado** (PatyIA): la fuente de verdad son los archivos individuales
 *   bajo `patyia-postman/entities/<Entidad>.json`. El `loadFullCollection()`
 *   hace el join al vuelo y persiste el resultado en
 *   `patyia-postman-collection.json` (descarga consolidada).
 *
 * Exportaciones legacy preservadas para compatibilidad: delegan en
 * `clientesisStore`. Para PatyIA se expone `patyiaStore` con la misma API.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
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
	description?: string;
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

export interface EnvVar { key: string; value: string; type?: string; enabled?: boolean }
export interface Environment { id: string; name: string; values: EnvVar[] }
export interface EnvironmentsFile { active: string; environments: Environment[] }

export interface ProjectConfig {
	projectKey: "clientesis" | "patyia";
	displayName: string;
	collectionFile: string;
	envsFile: string;
	/** Si está presente, el modo es fragmentado: la fuente de verdad son los archivos individuales. */
	entitiesDir?: string;
	defaultEnvs: EnvironmentsFile;
}

export interface PostmanStore {
	loadCollectionMeta: () => CollectionMeta | null;
	loadEntity: (slug: string) => EntityFile | null;
	saveEntity: (slug: string, data: EntityFile) => { ok: boolean; error?: string };
	saveCollectionVariables: (variable: unknown[]) => { ok: boolean; error?: string };
	loadFullCollection: () => PostmanCollection | null;
	mergeCollection: () => { ok: true; path: string; entities: number } | { ok: false; error: string };
	splitCollection: () => { ok: true; entities: EntityMeta[] } | { ok: false; error: string };
	loadEnvironments: () => EnvironmentsFile;
	saveEnvironments: (data: EnvironmentsFile) => { ok: boolean; error?: string };
	getPaths: () => { collection: string; environments: string; entitiesDir?: string };
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

function envVarsToCollectionVars(env: Environment | undefined): unknown[] {
	if (!env) return [];

	return env.values
		.filter((v) => v.enabled !== false)
		.map((v) => ({ key: v.key, value: v.value, type: v.type ?? "string" }));
}

export function createPostmanStore(cfg: ProjectConfig): PostmanStore {

	const readCollection = (): PostmanCollection | null => {
		if (!existsSync(cfg.collectionFile)) {
			console.warn(`[postman/${cfg.projectKey}] No existe: ${cfg.collectionFile}`);
			return null;
		}
		try { return JSON.parse(readFileSync(cfg.collectionFile, "utf8")) as PostmanCollection; }
		catch (err) {
			console.error(`[postman/${cfg.projectKey}] Error leyendo ${cfg.collectionFile}:`, err);
			return null;
		}
	};

	const writeCollection = (col: PostmanCollection): void => {
		ensureDir(dirname(cfg.collectionFile));
		writeFileSync(cfg.collectionFile, JSON.stringify(col, null, 2), "utf8");
	};

	const listEntityFiles = (): { slug: string; file: string }[] => {
		if (!cfg.entitiesDir || !existsSync(cfg.entitiesDir)) return [];
		const files = readdirSync(cfg.entitiesDir).filter((f) => f.endsWith(".json"));
		const used = new Set<string>();
		const out: { slug: string; file: string }[] = [];
		for (const f of files) {
			const name = f.replace(/\.json$/i, "");
			const base = slugify(name) || name.toLowerCase();
			let s = base;
			let n = 2;
			while (used.has(s)) s = `${base}-${n++}`;
			used.add(s);
			out.push({ slug: s, file: join(cfg.entitiesDir, f) });
		}

		return out;
	};

	const readEntityFile = (file: string): EntityFile | null => {
		try { return JSON.parse(readFileSync(file, "utf8")) as EntityFile; }
		catch (err) { console.error(`[postman/${cfg.projectKey}] Error en ${file}:`, err); return null; }
	};

	const writeEntityFile = (file: string, data: EntityFile): void => {
		ensureDir(dirname(file));
		writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
	};

	const buildJoinedCollection = (): PostmanCollection => {
		const envs = loadEnvironmentsImpl();
		const activeEnv = envs.environments.find((e) => e.id === envs.active) ?? envs.environments[0];
		const items: PostmanItem[] = [];
		for (const { file } of listEntityFiles()) {
			const e = readEntityFile(file);
			if (!e) continue;
			items.push({ name: e.name, description: e.description, item: e.item } as PostmanItem);
		}

		return {
			info: {
				name: cfg.displayName,
				description: `Colección Postman ${cfg.displayName} — generada por join automático desde \`${cfg.entitiesDir}\`.`,
				schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
			},
			item: items,
			variable: envVarsToCollectionVars(activeEnv),
		};
	};

	const buildSlugIndex = (col: PostmanCollection): Map<string, number> => {
		const map = new Map<string, number>();
		const used = new Set<string>();
		for (let i = 0; i < (col.item ?? []).length; i++) {
			const base = slugify(col.item[i].name) || `entidad-${i}`;
			let s = base;
			let n = 2;
			while (used.has(s)) s = `${base}-${n++}`;
			used.add(s);
			map.set(s, i);
		}

		return map;
	};

	function loadCollectionMetaImpl(): CollectionMeta | null {
		if (cfg.entitiesDir) {
			const envs = loadEnvironmentsImpl();
			const activeEnv = envs.environments.find((e) => e.id === envs.active) ?? envs.environments[0];
			const entities: EntityMeta[] = [];
			for (const { slug, file } of listEntityFiles()) {
				const e = readEntityFile(file);
				if (!e) continue;
				entities.push({ slug, name: e.name, count: (e.item ?? []).length });
			}
			if (!entities.length) return null;

			return {
				info: {
					name: cfg.displayName,
					description: `Colección Postman ${cfg.displayName} (fragmentada).`,
					schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
				},
				variable: envVarsToCollectionVars(activeEnv),
				entities,
				path: cfg.collectionFile,
			};
		}
		const col = readCollection();
		if (!col) return null;
		const idx = buildSlugIndex(col);
		const entities: EntityMeta[] = [];
		for (const [slug, i] of idx) {
			const folder = col.item[i];
			entities.push({ slug, name: folder.name, count: (folder.item ?? []).length });
		}

		return { info: col.info, variable: col.variable ?? [], entities, path: cfg.collectionFile };
	}

	function loadEntityImpl(slug: string): EntityFile | null {
		if (cfg.entitiesDir) {
			const hit = listEntityFiles().find((f) => f.slug === slug);
			if (!hit) return null;
			return readEntityFile(hit.file);
		}
		const col = readCollection();
		if (!col) return null;
		const idx = buildSlugIndex(col);
		const i = idx.get(slug);
		if (i == null) return null;
		const folder = col.item[i];

		return {
			name: folder.name,
			item: folder.item ?? [],
			description: typeof folder.description === "string" ? folder.description : undefined,
		};
	}

	function persistJoin(): void {
		if (!cfg.entitiesDir) return;
		try {
			const col = buildJoinedCollection();
			writeCollection(col);
		} catch (err) {
			console.error(`[postman/${cfg.projectKey}] persistJoin falló:`, err);
		}
	}

	function saveEntityImpl(slug: string, data: EntityFile): { ok: boolean; error?: string } {
		if (cfg.entitiesDir) {
			const hit = listEntityFiles().find((f) => f.slug === slug);
			const target = hit?.file ?? join(cfg.entitiesDir, `${data.name || slug}.json`);
			try {
				writeEntityFile(target, { name: data.name, description: data.description, item: data.item });
				persistJoin();
				return { ok: true };
			} catch (err) { return { ok: false, error: err instanceof Error ? err.message : String(err) }; }
		}
		const col = readCollection();
		if (!col) return { ok: false, error: "Sin colección base" };
		const idx = buildSlugIndex(col);
		const i = idx.get(slug);
		if (i == null) return { ok: false, error: `slug no encontrado: ${slug}` };
		col.item[i] = { ...col.item[i], name: data.name, item: data.item };
		try { writeCollection(col); return { ok: true }; }
		catch (err) { return { ok: false, error: err instanceof Error ? err.message : String(err) }; }
	}

	function saveCollectionVariablesImpl(variable: unknown[]): { ok: boolean; error?: string } {
		if (cfg.entitiesDir) {
			persistJoin();
			return { ok: true };
		}
		const col = readCollection();
		if (!col) return { ok: false, error: "Sin colección base" };
		col.variable = variable;
		try { writeCollection(col); return { ok: true }; }
		catch (err) { return { ok: false, error: err instanceof Error ? err.message : String(err) }; }
	}

	function loadFullCollectionImpl(): PostmanCollection | null {
		if (cfg.entitiesDir) {
			const list = listEntityFiles();
			if (!list.length) return null;
			return buildJoinedCollection();
		}

		return readCollection();
	}

	function mergeCollectionImpl(): { ok: true; path: string; entities: number } | { ok: false; error: string } {
		if (cfg.entitiesDir) {
			try {
				persistJoin();
				const col = readCollection();
				return { ok: true, path: cfg.collectionFile, entities: (col?.item ?? []).length };
			} catch (err) { return { ok: false, error: err instanceof Error ? err.message : String(err) }; }
		}
		const col = readCollection();
		if (!col) return { ok: false, error: "Sin colección" };

		return { ok: true, path: cfg.collectionFile, entities: (col.item ?? []).length };
	}

	function splitCollectionImpl(): { ok: true; entities: EntityMeta[] } | { ok: false; error: string } {
		const meta = loadCollectionMetaImpl();
		if (!meta) return { ok: false, error: "Sin colección" };

		return { ok: true, entities: meta.entities };
	}

	function loadEnvironmentsImpl(): EnvironmentsFile {
		if (!existsSync(cfg.envsFile)) {
			ensureDir(dirname(cfg.envsFile));
			writeFileSync(cfg.envsFile, JSON.stringify(cfg.defaultEnvs, null, 2), "utf8");
			return cfg.defaultEnvs;
		}
		try {
			const data = JSON.parse(readFileSync(cfg.envsFile, "utf8")) as EnvironmentsFile;
			if (!data.environments?.length) return cfg.defaultEnvs;
			if (!data.active) data.active = data.environments[0].id;
			return data;
		} catch { return cfg.defaultEnvs; }
	}

	function saveEnvironmentsImpl(data: EnvironmentsFile): { ok: boolean; error?: string } {
		try {
			ensureDir(dirname(cfg.envsFile));
			writeFileSync(cfg.envsFile, JSON.stringify(data, null, 2), "utf8");
			if (cfg.entitiesDir) persistJoin();
			return { ok: true };
		} catch (err) {
			return { ok: false, error: err instanceof Error ? err.message : String(err) };
		}
	}

	return {
		loadCollectionMeta: loadCollectionMetaImpl,
		loadEntity: loadEntityImpl,
		saveEntity: saveEntityImpl,
		saveCollectionVariables: saveCollectionVariablesImpl,
		loadFullCollection: loadFullCollectionImpl,
		mergeCollection: mergeCollectionImpl,
		splitCollection: splitCollectionImpl,
		loadEnvironments: loadEnvironmentsImpl,
		saveEnvironments: saveEnvironmentsImpl,
		getPaths: () => ({ collection: cfg.collectionFile, environments: cfg.envsFile, entitiesDir: cfg.entitiesDir }),
	};
}

// ===========================================================================
// Instancias por proyecto
// ===========================================================================

const CLIENTESIS_DEFAULT_ENVS: EnvironmentsFile = {
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

const PATYIA_DEFAULT_ENVS: EnvironmentsFile = {
	active: "local",
	environments: [
		{
			id: "local",
			name: "local",
			values: [
				{ key: "HOST", value: "http://localhost:7071", enabled: true },
				{ key: "CONTROLKEY", value: "5130489773", type: "secret", enabled: true },
				{ key: "token", value: "", type: "secret", enabled: true },
				{ key: "iconversacion", value: "", enabled: true },
				{ key: "THREAD_ID", value: "", enabled: true },
			],
		},
		{
			id: "staging",
			name: "staging",
			values: [
				{ key: "HOST", value: "https://ayudascp-ia-staging.azurewebsites.net", enabled: true },
				{ key: "CONTROLKEY", value: "", type: "secret", enabled: true },
				{ key: "token", value: "", type: "secret", enabled: true },
				{ key: "iconversacion", value: "", enabled: true },
				{ key: "THREAD_ID", value: "", enabled: true },
			],
		},
		{
			id: "produccion",
			name: "produccion",
			values: [
				{ key: "HOST", value: "https://ayudascp-ia.azurewebsites.net", enabled: true },
				{ key: "CONTROLKEY", value: "", type: "secret", enabled: true },
				{ key: "token", value: "", type: "secret", enabled: true },
				{ key: "iconversacion", value: "", enabled: true },
				{ key: "THREAD_ID", value: "", enabled: true },
			],
		},
	],
};

export const clientesisStore = createPostmanStore({
	projectKey: "clientesis",
	displayName: "ClientesIS · ContaPymeU",
	collectionFile: join(ISA_ROOT, "postman-collection.json"),
	envsFile: join(ISA_ROOT, "postman-environments.json"),
	defaultEnvs: CLIENTESIS_DEFAULT_ENVS,
});

export const patyiaStore = createPostmanStore({
	projectKey: "patyia",
	displayName: "PatyIA · AyudasCP-IA",
	collectionFile: join(ISA_ROOT, "patyia-postman-collection.json"),
	envsFile: join(ISA_ROOT, "patyia-postman-environments.json"),
	entitiesDir: join(ISA_ROOT, "patyia-postman", "entities"),
	defaultEnvs: PATYIA_DEFAULT_ENVS,
});

export function getStore(project: "clientesis" | "patyia"): PostmanStore {

	return project === "patyia" ? patyiaStore : clientesisStore;
}

// ===========================================================================
// Exportaciones legacy (compatibilidad con socket-server / snapshot-data)
// ===========================================================================

export const loadCollectionMeta = clientesisStore.loadCollectionMeta;
export const loadEntity = clientesisStore.loadEntity;
export const saveEntity = clientesisStore.saveEntity;
export const saveCollectionVariables = clientesisStore.saveCollectionVariables;
export const loadFullCollection = clientesisStore.loadFullCollection;
export const mergeCollection = clientesisStore.mergeCollection;
export const splitCollection = clientesisStore.splitCollection;
export const loadEnvironments = clientesisStore.loadEnvironments;
export const saveEnvironments = clientesisStore.saveEnvironments;
export const getPaths = clientesisStore.getPaths;
