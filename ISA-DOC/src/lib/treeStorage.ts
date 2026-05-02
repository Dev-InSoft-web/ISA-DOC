/**
 * Formato persistido del árbol de tablas y de las columnas por tabla.
 *
 * Se almacena un solo `tables-tree.json` para el árbol completo (incluyendo
 * los nodos agrupadores tipo vigilante) y un archivo por tabla en
 * `columns/{TABLENAME}.json` con su árbol de columnas.
 *
 * V4 — formato APLANADO estilo SQL (`NodeStore`):
 *  - `nodes`: array plano de filas de nodo. La identidad de un nodo es su
 *    `flatpath` (notación punteada). Los hijos directos son las filas
 *    cuyo `flatpath` empieza por el del padre seguido de un único segmento.
 *  - `entities`: `{ [ENTITYNAME]: ObjRow[] }`. Bucket por entidad SQL.
 *    Convención: nombre de entidad en MAYÚSCULA SOSTENIDA con `_`
 *    (estilo MSSQL): `TABLE`, `COLUMN`, `DOMAIN`, …
 *  - `NodeRow` SIN `id`, SIN `label`. Sólo `{ flatpath, kind, ireference? }`.
 *    Los nodos puramente estructurales (kind `prefix`, `root`) NO llevan
 *    `ireference` porque no referencian entidad alguna; sus props
 *    (`prefix`/`rowname`) viven en línea dentro de la propia fila.
 *  - `ObjRow`: PK `i<entityname>` (lowercase, sin `_`) inicializada al
 *    `flatpath`. Resto de claves del POJO: minúsculas SIN `_`.
 *
 * Se mantiene una RUTA de migración v3 → v4: si el archivo viene con `root`
 * (anidado, formato legacy) el reader lo aplana en memoria y al siguiente
 * `writeTablesDoc` se persiste como v4. La forma `PersistedNodeJSON`
 * (anidada) sigue siendo la representación canónica EN MEMORIA usada por
 * las clases-nodo (`BaseTreeNode.toJSON()` / `rootFromJSON()`).
 */

import type {
	NodeKind,
	PersistedNodeJSON,
	PersistedTreeDocJSON,
	PersistedNodeDocJSON,
	PersistedWardenRefJSON,
} from "./treeNodes/types.ts";

export const TREE_STORAGE_VERSION = 4 as const;

/** Re-exports para mantener compat de imports existentes. */
export type PersistedKind = NodeKind;
export type PersistedNode = PersistedNodeJSON;
export type {
	PersistedNodeDocJSON as PersistedNodeDoc,
	PersistedEntityDocJSON as PersistedEntityDoc,
	PersistedTreeDocJSON as PersistedTreeDoc,
	PersistedWardenRefJSON as PersistedWardenRef,
} from "./treeNodes/types.ts";

export interface PersistedTablesTree {
	version: number;
	kind: "tables-tree";
	doc?: PersistedTreeDocJSON;
	root: PersistedNodeJSON;
}

export interface PersistedColumnsTreeMeta {
	originalName: string;
	hasIfNotExists: boolean;
}

export interface PersistedColumnsTree {
	version: number;
	kind: "columns-tree";
	/** Nombre bare de la tabla (sin prefijo). Coincide con el filename. */
	tableRef: string;
	tableMeta: PersistedColumnsTreeMeta;
	doc?: PersistedTreeDocJSON;
	root: PersistedNodeJSON;
}

/* ─────────────────────────────────────────────────────────────────────── */
/* V4 — NodeStore aplanado estilo SQL.                                      */
/* ─────────────────────────────────────────────────────────────────────── */

/** kinds que NO referencian entidad: sólo delegan comportamiento por TS. */
const STRUCTURAL_KINDS = new Set<NodeKind>(["root", "prefix", "optional"]);

/** Mapa fijo de kind → nombre de entidad SQL. */
const ENTITY_NAME_BY_KIND: Partial<Record<NodeKind, string>> = {
	table: "TABLE",
	col: "COLUMN",
	domain: "DOMAIN",
};

/** Lista declarada de keys camelCase del `obj` de cada kind con entidad. */
const ENTITY_OBJ_KEYS_BY_KIND: Partial<Record<NodeKind, readonly string[]>> = {
	table: ["tableRef", "rowName", "autoStack", "autoStackHistorial", "relations"],
	col: ["name", "type", "nullable", "defaultValue", "primaryKey", "extra", "kind", "foreignKey"],
	domain: ["domainId", "masterTable"],
};

/** Lista declarada de keys camelCase de los nodos estructurales (inline en NodeRow). */
const STRUCTURAL_INLINE_KEYS_BY_KIND: Partial<Record<NodeKind, readonly string[]>> = {
	prefix: ["rowName", "prefix"],
	root: [],
	optional: ["name"],
};

/** Pasa un identificador camelCase a su forma POJO (lowercase, sin `_`). */
function toPojoKey(camel: string): string {
	return camel.toLowerCase().replace(/_/g, "");
}

/** Construye la inversa lowercase→camelCase para una lista declarada. */
function buildReverseMap(keys: readonly string[]): Record<string, string> {
	const out: Record<string, string> = {};
	for (const k of keys) out[toPojoKey(k)] = k;
	return out;
}

const REVERSE_ENTITY_KEYS: Partial<Record<NodeKind, Record<string, string>>> = {
	table: buildReverseMap(ENTITY_OBJ_KEYS_BY_KIND.table!),
	col: buildReverseMap(ENTITY_OBJ_KEYS_BY_KIND.col!),
	domain: buildReverseMap(ENTITY_OBJ_KEYS_BY_KIND.domain!),
};

const REVERSE_STRUCTURAL_KEYS: Partial<Record<NodeKind, Record<string, string>>> = {
	prefix: buildReverseMap(STRUCTURAL_INLINE_KEYS_BY_KIND.prefix!),
	root: {},
	optional: buildReverseMap(STRUCTURAL_INLINE_KEYS_BY_KIND.optional!),
};

export function entityNameForKind(kind: NodeKind): string | null {
	if (STRUCTURAL_KINDS.has(kind)) return null;
	return ENTITY_NAME_BY_KIND[kind] ?? kind.toUpperCase().replace(/[\s-]+/g, "_");
}

export function pkKeyForEntity(entityName: string): string {
	return ("i" + entityName.replace(/_/g, "")).toLowerCase();
}

export interface V4NodeRow {
	flatpath: string;
	kind: NodeKind;
	ireference?: string;
	[k: string]: unknown;
}

export interface V4ObjRow {
	flatpath: string;
	[k: string]: unknown;
}

export interface V4NodeStore {
	nodes: V4NodeRow[];
	entities: Record<string, V4ObjRow[]>;
}

export interface V4PersistedTablesTree {
	version: 4;
	kind: "tables-tree";
	nodes: V4NodeRow[];
	entities: Record<string, V4ObjRow[]>;
	doc?: PersistedTreeDocJSON;
}

export interface V4PersistedColumnsTreeMeta {
	originalname: string;
	hasifnotexists: boolean;
}

export interface V4PersistedColumnsTree {
	version: 4;
	kind: "columns-tree";
	tableref: string;
	tablemeta: V4PersistedColumnsTreeMeta;
	nodes: V4NodeRow[];
	entities: Record<string, V4ObjRow[]>;
	doc?: PersistedTreeDocJSON;
}

/* ─────────────────────────────────────────────────────────────────────── */
/* Codec v4 ↔ PersistedNodeJSON anidado (representación en memoria).        */
/* ─────────────────────────────────────────────────────────────────────── */

function encodeObjForEntity(kind: NodeKind, obj: Record<string, unknown> | undefined): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	if (!obj) return out;
	const allowed = ENTITY_OBJ_KEYS_BY_KIND[kind];
	for (const camel of allowed ?? Object.keys(obj)) {
		const v = obj[camel];
		if (v === undefined || v === null || v === "") continue;
		out[toPojoKey(camel)] = v;
	}
	return out;
}

function decodeEntityToObj(kind: NodeKind, row: V4ObjRow, entityName: string): Record<string, unknown> {
	const reverse = REVERSE_ENTITY_KEYS[kind] ?? {};
	const pk = pkKeyForEntity(entityName);
	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(row)) {
		if (k === pk || k === "flatpath" || k === "doc" || k === "wardenaction" || k === "active") continue;
		const camel = reverse[k] ?? k;
		out[camel] = v;
	}
	return out;
}

function encodeStructuralInline(kind: NodeKind, obj: Record<string, unknown> | undefined): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	if (!obj) return out;
	const allowed = STRUCTURAL_INLINE_KEYS_BY_KIND[kind] ?? [];
	for (const camel of allowed) {
		const v = obj[camel];
		if (v === undefined || v === null || v === "") continue;
		out[toPojoKey(camel)] = v;
	}
	return out;
}

function decodeStructuralInline(kind: NodeKind, row: V4NodeRow): Record<string, unknown> {
	const reverse = REVERSE_STRUCTURAL_KEYS[kind] ?? {};
	const skip = new Set(["flatpath", "kind", "ireference", "doc", "wardenaction", "active"]);
	const out: Record<string, unknown> = {};
	for (const [k, v] of Object.entries(row)) {
		if (skip.has(k)) continue;
		const camel = reverse[k] ?? k;
		out[camel] = v;
	}
	return out;
}

/**
 * Convierte un árbol persistido anidado (`PersistedNodeJSON`) a v4
 * `NodeStore`. La raíz (`flatpath=""`) NO se incluye en `nodes`.
 */
export function persistedNodeTreeToV4Store(root: PersistedNodeJSON): V4NodeStore {
	const nodes: V4NodeRow[] = [];
	const entities: Record<string, V4ObjRow[]> = {};
	const visit = (n: PersistedNodeJSON, flatpath: string): void => {
		if (flatpath !== "") {
			const kind = n.kind;
			const ireference = entityNameForKind(kind);
			if (ireference) {
				const row: V4NodeRow = { flatpath, ireference, kind };
				if (n.active === false) row.active = false;
				nodes.push(row);
				const objRow: V4ObjRow = {
					[pkKeyForEntity(ireference)]: flatpath,
					flatpath,
					...encodeObjForEntity(kind, n.obj),
				};
				if (n.doc) objRow.doc = n.doc as unknown as Record<string, unknown>;
				if (n.wardenAction) objRow.wardenaction = { idaction: n.wardenAction.idaction };
				(entities[ireference] ??= []).push(objRow);
			} else {
				const row: V4NodeRow = {
					flatpath,
					kind,
					...encodeStructuralInline(kind, n.obj),
				};
				if (n.active === false) row.active = false;
				if (n.doc) row.doc = n.doc as unknown as Record<string, unknown>;
				if (n.wardenAction) row.wardenaction = { idaction: n.wardenAction.idaction };
				nodes.push(row);
			}
		}
		(n.children ?? []).forEach((c, i) => {
			const child = flatpath ? `${flatpath}.${i + 1}` : String(i + 1);
			visit(c, child);
		});
	};
	visit(root, "");
	return { nodes, entities };
}

/**
 * Convierte un v4 `NodeStore` al árbol persistido anidado
 * (`PersistedNodeJSON`) con un nodo raíz sintético (`kind:"root"`,
 * `id:""`). Los hijos quedan jerarquizados por prefijo de `flatpath`.
 */
export function v4StoreToPersistedNodeTree(store: V4NodeStore): PersistedNodeJSON {
	const sortedNodes = [...store.nodes].sort((a, b) => compareFlatpath(a.flatpath, b.flatpath));
	const byPath = new Map<string, PersistedNodeJSON>();
	const root: PersistedNodeJSON = { id: "", kind: "root", children: [] };
	byPath.set("", root);
	for (const row of sortedNodes) {
		const node: PersistedNodeJSON = { id: row.flatpath, kind: row.kind };
		if ((row as Record<string, unknown>).active === false) node.active = false;
		if (row.ireference) {
			const bucket = store.entities[row.ireference] ?? [];
			const objRow = bucket.find((o) => o.flatpath === row.flatpath);
			if (objRow) {
				const obj = decodeEntityToObj(row.kind, objRow, row.ireference);
				if (Object.keys(obj).length) node.obj = obj;
				const docRaw = (objRow as Record<string, unknown>).doc;
				if (docRaw) node.doc = docRaw as PersistedNodeDocJSON;
				const warden = (objRow as Record<string, unknown>).wardenaction as PersistedWardenRefJSON | undefined;
				if (warden?.idaction) node.wardenAction = { idaction: warden.idaction };
				if ((objRow as Record<string, unknown>).active === false) node.active = false;
			}
		} else {
			const obj = decodeStructuralInline(row.kind, row);
			if (Object.keys(obj).length) node.obj = obj;
			const docRaw = (row as Record<string, unknown>).doc;
			if (docRaw) node.doc = docRaw as PersistedNodeDocJSON;
			const warden = (row as Record<string, unknown>).wardenaction as PersistedWardenRefJSON | undefined;
			if (warden?.idaction) node.wardenAction = { idaction: warden.idaction };
		}
		byPath.set(row.flatpath, node);
		const parentPath = parentFlatpathOf(row.flatpath);
		const parent = byPath.get(parentPath);
		if (!parent) throw new Error(`v4StoreToPersistedNodeTree: padre ausente para '${row.flatpath}'.`);
		(parent.children ??= []).push(node);
	}
	return root;
}

function parentFlatpathOf(fp: string): string {
	const idx = fp.lastIndexOf(".");
	return idx < 0 ? "" : fp.slice(0, idx);
}

function compareFlatpath(a: string, b: string): number {
	const A = a.split(".").map((s) => parseInt(s, 10));
	const B = b.split(".").map((s) => parseInt(s, 10));
	const len = Math.min(A.length, B.length);
	for (let i = 0; i < len; i++) {
		if (A[i] !== B[i]) return A[i] - B[i];
	}
	return A.length - B.length;
}
