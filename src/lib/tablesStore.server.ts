import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile, access, mkdir, readdir, unlink, rename } from "node:fs/promises";
import { sqlFilePath, parseSql } from "./sqlFragments.ts";
import { parseTableFragment, newTableId, type ParsedTable, type TableRow } from "./tableSchema.ts";
import {
	TREE_STORAGE_VERSION,
	type PersistedColumnsTree,
	type PersistedTablesTree,
	type PersistedNode,
	type PersistedNodeDoc,
	type PersistedTreeDoc,
	type V4NodeStore,
	type V4PersistedTablesTree,
	type V4PersistedColumnsTree,
	persistedNodeTreeToV4Store,
	v4StoreToPersistedNodeTree,
} from "./treeStorage.ts";
import {
	BaseTreeNode,
	ColumnNode,
	PrefixNode,
	RootNode,
	TableNode,
	rootFromJSON,
	historialTableNameOf,
	deriveHistorialColumns,
	masterPkOf,
} from "./treeNodes/index.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const clientesisDir = path.resolve(__dirname, "..", "..", "public", "db", "clientesis");
export const columnsDir = path.join(clientesisDir, "columns");
export const tablesTreePath = path.join(clientesisDir, "tables-tree.json");
export const tablesJsonPath = path.resolve(__dirname, "..", "..", "public", "db", "tables.json");

export interface TablesDoc {
	version: 1;
	tables: ParsedTable[];
}

interface LegacyFragmentFile {
	version: 1;
	fragmentId: string;
	fragmentName: string;
	tables: ParsedTable[];
}

async function exists(p: string): Promise<boolean> {
	try { await access(p); return true; } catch { return false; }
}

// ---------------------------------------------------------------------------
// Lectura del formato persistido + hidratación a clases.
// ---------------------------------------------------------------------------

export async function readPersistedTree(): Promise<PersistedTablesTree | null> {
	if (!(await exists(tablesTreePath))) return null;
	try {
		const raw = await readFile(tablesTreePath, "utf8");
		const parsed = JSON.parse(raw) as Record<string, unknown>;
		if (!parsed || typeof parsed !== "object") return null;
		if (parsed.kind !== "tables-tree") return null;
		// V4 (NodeStore aplanado) → hidratamos al PersistedNodeJSON anidado.
		if (Array.isArray((parsed as Partial<V4PersistedTablesTree>).nodes)) {
			const v4 = parsed as unknown as V4PersistedTablesTree;
			const root = v4StoreToPersistedNodeTree({ nodes: v4.nodes, entities: v4.entities ?? {} });
			return { version: TREE_STORAGE_VERSION, kind: "tables-tree", root, doc: v4.doc };
		}
		// V3 (anidado) — fallback de compat.
		if ((parsed as Partial<PersistedTablesTree>).root) {
			return parsed as unknown as PersistedTablesTree;
		}
	} catch { /* noop */ }
	return null;
}

export async function readColumnsTree(tableRef: string): Promise<PersistedColumnsTree | null> {
	const file = path.join(columnsDir, `${tableRef}.json`);
	if (!(await exists(file))) return null;
	try {
		const raw = await readFile(file, "utf8");
		const parsed = JSON.parse(raw) as Record<string, unknown>;
		if (!parsed || typeof parsed !== "object") return null;
		if (parsed.kind !== "columns-tree") return null;
		if (Array.isArray((parsed as Partial<V4PersistedColumnsTree>).nodes)) {
			const v4 = parsed as unknown as V4PersistedColumnsTree;
			const root = v4StoreToPersistedNodeTree({ nodes: v4.nodes, entities: v4.entities ?? {} });
			return {
				version: TREE_STORAGE_VERSION,
				kind: "columns-tree",
				tableRef: v4.tableref ?? tableRef,
				tableMeta: {
					originalName: v4.tablemeta?.originalname ?? tableRef,
					hasIfNotExists: v4.tablemeta?.hasifnotexists ?? true,
					extendsModel: (v4.tablemeta as { extendsmodel?: string } | undefined)?.extendsmodel,
				},
				doc: v4.doc,
				root,
			};
		}
		if ((parsed as Partial<PersistedColumnsTree>).root) {
			return parsed as unknown as PersistedColumnsTree;
		}
	} catch { /* noop */ }
	return null;
}

/** Comentario "Tabla X" — se genera en runtime a partir del nombre efectivo. */
function runtimeTableComment(effectivePrefix: string | undefined, name: string): string {
	const full = `${effectivePrefix ?? ""}${name}`;
	return `Tabla ${full}`;
}

/**
 * Camina el árbol persistido en preorden produciendo, para cada TableNode,
 * su prefijo efectivo (cadena de PrefixNodes ancestros).
 */
function* iterateTables(root: BaseTreeNode): IterableIterator<{ table: TableNode; effectivePrefix: string }> {
	const walk = function* (n: BaseTreeNode, chain: string[]): IterableIterator<{ table: TableNode; effectivePrefix: string }> {
		if (n instanceof TableNode) {
			yield { table: n, effectivePrefix: chain.join("") };
			return;
		}
		const nextChain = n instanceof PrefixNode ? [...chain, n.prefix] : chain;
		for (const c of n.children) yield* walk(c, nextChain);
	};
	yield* walk(root, []);
}

/**
 * Materializa el array de `ParsedTable` que consume el cliente.
 *  1. Lee cada tabla persistida (con su archivo `columns/<X>.json`).
 *  2. Para cada tabla con `obj.stack === true`, INYECTA una tabla virtual
 *     `HISTORIAL<X>` justo después del master, derivada en runtime.
 *  3. Genera `comment` en runtime a partir del prefijo efectivo.
 */
async function materializeTablesFromTree(tree: PersistedTablesTree): Promise<ParsedTable[]> {
	const root = rootFromJSON(tree.root);
	const out: ParsedTable[] = [];
	for (const { table, effectivePrefix } of iterateTables(root)) {
		const cols = await readColumnsTree(table.tableRef);
		if (!cols) continue;
		const meta = cols.tableMeta;
		const columns: TableRow[] = (cols.root.children ?? [])
			.map((c) => {
				const base = (c.obj as Record<string, unknown> | undefined) ?? {};
				// El obj de nodos estructurales (p.ej. `optional`) no lleva `kind`
				// inline (lo guarda el NodeRow). Lo propagamos al obj para que
				// los discriminadores `isOptionalRow`/`isSectionRow` resuelvan.
				// `active` vive a nivel de nodo en el JSON persistido; lo
				// reflejamos en la fila para que los emisores/snippets puedan
				// gating por estado activo de la sección (p.ej. AUDITORIA).
				const merged = {
					...base,
					kind: c.kind,
					...(c.active === false ? { active: false } : {}),
				} as unknown as TableRow;
				return merged;
			})
			.filter((c) => !!c);
		out.push({
			fragmentId: "",
			fragmentName: "",
			id: (table.obj as { tableId?: string }).tableId ?? newTableId(),
			comment: runtimeTableComment(effectivePrefix || undefined, table.tableRef),
			hasIfNotExists: meta.hasIfNotExists ?? true,
			originalName: meta.originalName ?? table.tableRef,
			name: table.tableRef,
			effectivePrefix: effectivePrefix || undefined,
			autoStack: table.hasStack ? true : undefined,
			autoStackHistorial: table.hasStack ? (table.obj.autoStackHistorial !== false) : undefined,
			relations: Array.isArray(table.obj.relations) && table.obj.relations.length
				? table.obj.relations.map((r) => ({ ...r, columns: [...r.columns], refColumns: [...r.refColumns] }))
				: undefined,
			columns,
			compositePrimaryKey: [],
			extraStatements: [],
			trailing: "",
			customization: (() => {
				const base = table.obj.customization && typeof table.obj.customization === "object"
					? (JSON.parse(JSON.stringify(table.obj.customization)) as ParsedTable["customization"])
					: undefined;
				// Promueve `tablemeta.extendsmodel` (modelo cliente base) a customization
				// para que el generador emita `extends T<Modelo>` en lugar de `TObject`.
				const extendsModel = (cols as unknown as { tableMeta?: { extendsModel?: string } }).tableMeta?.extendsModel;
				if (!extendsModel) return base;
				const cls = extendsModel.startsWith("T") ? extendsModel : "T" + extendsModel;
				return { ...(base ?? {}), parentModelClass: cls };
			})(),
			snippets: table.obj.snippets && typeof table.obj.snippets === "object"
				? (JSON.parse(JSON.stringify(table.obj.snippets)) as ParsedTable["snippets"])
				: undefined,
		} as ParsedTable);
		if (table.historialEnabled) {
			const colNodes = (cols.root.children ?? [])
				.map((c) => new ColumnNode(c.obj as never));
			const pk = masterPkOf(colNodes);
			if (pk) {
				const histName = historialTableNameOf(table.tableRef);
				const histCols = deriveHistorialColumns(table.tableRef, pk) as unknown as TableRow[];
				out.push({
					fragmentId: "",
					fragmentName: "",
					id: newTableId(),
					comment: runtimeTableComment(effectivePrefix || undefined, histName),
					hasIfNotExists: true,
					originalName: histName,
					name: histName,
					effectivePrefix: effectivePrefix || undefined,
					columns: histCols,
					compositePrimaryKey: [],
					extraStatements: [],
					trailing: "",
				} as ParsedTable);
			}
		}
	}
	return out;
}

// ---------------------------------------------------------------------------
// Migración legacy (split por fragmento + monolítico).
// ---------------------------------------------------------------------------

async function listLegacyFragmentFiles(): Promise<string[]> {
	if (!(await exists(clientesisDir))) return [];
	const entries = await readdir(clientesisDir);
	return entries
		.filter((e) => e.endsWith(".json")
			&& !e.endsWith(".legacy.json")
			&& e !== "tables-tree.json")
		.map((e) => path.join(clientesisDir, e));
}

async function readLegacySplit(): Promise<TablesDoc | null> {
	const files = await listLegacyFragmentFiles();
	if (files.length === 0) return null;
	const all: ParsedTable[] = [];
	for (const f of files) {
		try {
			const raw = await readFile(f, "utf8");
			const parsed = JSON.parse(raw) as Partial<LegacyFragmentFile>;
			if (parsed && Array.isArray(parsed.tables)) all.push(...(parsed.tables as ParsedTable[]));
		} catch { /* ignore */ }
	}
	return all.length ? { version: 1, tables: all } : null;
}

async function readLegacyMonolithic(): Promise<TablesDoc | null> {
	if (!(await exists(tablesJsonPath))) return null;
	try {
		const raw = await readFile(tablesJsonPath, "utf8");
		const parsed = JSON.parse(raw) as TablesDoc;
		if (parsed?.version === 1 && Array.isArray(parsed.tables)) return parsed;
	} catch { /* noop */ }
	return null;
}

async function archiveLegacyFragments(): Promise<void> {
	const files = await listLegacyFragmentFiles();
	for (const f of files) {
		const target = f.replace(/\.json$/i, ".legacy.json");
		try { await rename(f, target); } catch { /* noop */ }
	}
}

async function seedFromSql(): Promise<TablesDoc> {
	const raw = await readFile(sqlFilePath, "utf8");
	const fragments = parseSql(raw);
	const all: ParsedTable[] = [];
	for (const f of fragments) {
		if (f.kind !== "table") continue;
		for (const t of parseTableFragment(f.id, f.name, f.body)) all.push(t);
	}
	return { version: 1, tables: all };
}

// ---------------------------------------------------------------------------
// Construcción del árbol persistido a partir de ParsedTable[].
// ---------------------------------------------------------------------------

interface PreservedTreeDocs {
	treeDoc?: PersistedTreeDoc;
	rootDoc?: PersistedNodeDoc;
	prefixDocByPrefix: Map<string, PersistedNodeDoc>;
	tableDocByRef: Map<string, PersistedNodeDoc>;
	prefixWarden: Map<string, { idaction: string }>;
	stackByTableRef: Map<string, true>;
	historialDisabledByTableRef: Map<string, true>;
	customizationByTableRef: Map<string, Record<string, unknown>>;
	snippetsByTableRef: Map<string, Record<string, unknown>>;
}

function collectPreservedDocs(tree: PersistedTablesTree | null): PreservedTreeDocs {
	const acc: PreservedTreeDocs = {
		treeDoc: tree?.doc,
		rootDoc: tree?.root.doc,
		prefixDocByPrefix: new Map(),
		tableDocByRef: new Map(),
		prefixWarden: new Map(),
		stackByTableRef: new Map(),
		historialDisabledByTableRef: new Map(),
		customizationByTableRef: new Map(),
		snippetsByTableRef: new Map(),
	};
	if (!tree) return acc;
	const dfs = (n: PersistedNode): void => {
		if (n.kind === "prefix") {
			const key = String(n.obj?.prefix ?? n.obj?.rowName ?? "");
			if (key) {
				if (n.doc) acc.prefixDocByPrefix.set(key, n.doc);
				if (n.wardenAction) acc.prefixWarden.set(key, { idaction: n.wardenAction.idaction });
			}
		} else if (n.kind === "table") {
			const key = String(n.obj?.tableRef ?? n.obj?.rowName ?? "");
			if (key) {
				if (n.doc) acc.tableDocByRef.set(key, n.doc);
				const nObj = n.obj as { autoStack?: boolean; stack?: boolean; autoStackHistorial?: boolean; customization?: Record<string, unknown>; snippets?: Record<string, unknown> } | undefined;
				if (nObj?.autoStack === true || nObj?.stack === true) acc.stackByTableRef.set(key, true);
				if (nObj?.autoStackHistorial === false) acc.historialDisabledByTableRef.set(key, true);
				if (nObj?.customization && typeof nObj.customization === "object" && Object.keys(nObj.customization).length) {
					acc.customizationByTableRef.set(key, nObj.customization);
				}
				if (nObj?.snippets && typeof nObj.snippets === "object" && Object.keys(nObj.snippets).length) {
					acc.snippetsByTableRef.set(key, nObj.snippets);
				}
			}
		}
		for (const ch of n.children ?? []) dfs(ch);
	};
	dfs(tree.root);
	return acc;
}

interface PreservedColumnsDocs {
	treeDoc?: PersistedTreeDoc;
	rootDoc?: PersistedNodeDoc;
	colDocByName: Map<string, PersistedNodeDoc>;
}

function collectPreservedColumnsDocs(tree: PersistedColumnsTree | null): PreservedColumnsDocs {
	const acc: PreservedColumnsDocs = {
		treeDoc: tree?.doc,
		rootDoc: tree?.root.doc,
		colDocByName: new Map(),
	};
	if (!tree) return acc;
	for (const c of tree.root.children ?? []) {
		const key = String(c.obj?.name ?? "");
		if (key && c.doc) acc.colDocByName.set(key, c.doc);
	}
	return acc;
}

/**
 * Detecta si una tabla entrante es una HISTORIAL derivada (sintética). Si lo
 * es, NO se persiste como tabla independiente; se marca su master con
 * `stack: true` para que se vuelva a derivar al próximo read.
 */
function detectHistorialMaster(t: ParsedTable, allRefs: Set<string>): string | null {
	const ref = t.name.toUpperCase();
	if (!ref.startsWith("HISTORIAL")) return null;
	const candidate = ref.slice("HISTORIAL".length);
	if (candidate && allRefs.has(candidate)) return candidate;
	return null;
}

function buildPersistedTree(tables: ParsedTable[], preserved: PreservedTreeDocs): { tree: PersistedTablesTree; persistedRefs: Set<string> } {
	const refs = new Set<string>();
	for (const t of tables) refs.add(t.name.toUpperCase());

	// Particionar: tablas a persistir vs historiales sintéticos.
	const persistable: ParsedTable[] = [];
	const stackMasters = new Set<string>();
	for (const t of tables) {
		const master = detectHistorialMaster(t, refs);
		if (master) {
			stackMasters.add(master);
			continue;
		}
		persistable.push(t);
	}
	// Conservar masters que ya estaban marcados aunque la historial no haya
	// llegado en este batch (p.ej. si el cliente no la materializó).
	for (const m of preserved.stackByTableRef.keys()) stackMasters.add(m.toUpperCase());

	const root = new RootNode();
	if (preserved.rootDoc) root.doc = { ...preserved.rootDoc };

	const prefixOrder: string[] = [];
	const byPrefix = new Map<string, ParsedTable[]>();
	for (const t of persistable) {
		const pfx = (t.effectivePrefix ?? "").toString();
		if (!byPrefix.has(pfx)) {
			byPrefix.set(pfx, []);
			prefixOrder.push(pfx);
		}
		byPrefix.get(pfx)!.push(t);
	}

	for (const pfx of prefixOrder) {
		if (pfx === "") {
			for (const t of byPrefix.get(pfx)!) {
				const isMaster = stackMasters.has(t.name.toUpperCase()) || t.autoStack === true;
				const histDisabled = isMaster && (t.autoStackHistorial === false || preserved.historialDisabledByTableRef.has(t.name));
				const customization = (t.customization && Object.keys(t.customization).length
					? (t.customization as Record<string, unknown>)
					: preserved.customizationByTableRef.get(t.name));
				const snippets = (t.snippets && Object.keys(t.snippets).length
					? (t.snippets as Record<string, unknown>)
					: preserved.snippetsByTableRef.get(t.name));
				const tn = new TableNode({
					tableRef: t.name,
					rowName: t.name,
					tableId: t.id || undefined,
					autoStack: isMaster ? true : undefined,
					autoStackHistorial: histDisabled ? false : undefined,
					relations: Array.isArray(t.relations) && t.relations.length ? t.relations.map((r) => ({ ...r })) : undefined,
					customization: customization ? { ...customization } : undefined,
					snippets: snippets ? { ...snippets } : undefined,
				});
				const tdoc = preserved.tableDocByRef.get(t.name);
				if (tdoc) tn.doc = { ...tdoc };
				root.addChild(tn);
			}
			continue;
		}
		const pn = new PrefixNode({ rowName: pfx, prefix: pfx });
		const w = preserved.prefixWarden.get(pfx);
		if (w) pn.wardenAction = { idaction: w.idaction };
		const pdoc = preserved.prefixDocByPrefix.get(pfx);
		if (pdoc) pn.doc = { ...pdoc };
		for (const t of byPrefix.get(pfx)!) {
			const isMaster = stackMasters.has(t.name.toUpperCase()) || t.autoStack === true;
			const histDisabled = isMaster && (t.autoStackHistorial === false || preserved.historialDisabledByTableRef.has(t.name));
			const customization = (t.customization && Object.keys(t.customization).length
				? (t.customization as Record<string, unknown>)
				: preserved.customizationByTableRef.get(t.name));
			const snippets = (t.snippets && Object.keys(t.snippets).length
				? (t.snippets as Record<string, unknown>)
				: preserved.snippetsByTableRef.get(t.name));
			const tn = new TableNode({
				tableRef: t.name,
				rowName: t.name,
				tableId: t.id || undefined,
				autoStack: isMaster ? true : undefined,
				autoStackHistorial: histDisabled ? false : undefined,
				relations: Array.isArray(t.relations) && t.relations.length ? t.relations.map((r) => ({ ...r })) : undefined,
				customization: customization ? { ...customization } : undefined,
				snippets: snippets ? { ...snippets } : undefined,
			});
			const tdoc = preserved.tableDocByRef.get(t.name);
			if (tdoc) tn.doc = { ...tdoc };
			pn.addChild(tn);
		}
		root.addChild(pn);
	}

	root.reindex("");
	const tree: PersistedTablesTree = {
		version: TREE_STORAGE_VERSION,
		kind: "tables-tree",
		root: root.toJSON(),
	};
	if (preserved.treeDoc) tree.doc = { ...preserved.treeDoc };
	const persistedRefs = new Set<string>();
	for (const t of persistable) persistedRefs.add(t.name);
	return { tree, persistedRefs };
}

function buildColumnsTree(t: ParsedTable, preserved: PreservedColumnsDocs): PersistedColumnsTree {
	const root = new RootNode();
	if (preserved.rootDoc) root.doc = { ...preserved.rootDoc };
	for (const col of t.columns) {
		const cn = new ColumnNode(col as never);
		// Reflejar el flag `active: false` (p.ej. AUDITORIA desactivada) al
		// nivel de nodo, que es donde lo persiste BaseTreeNode.toJSON().
		const active = (col as { active?: boolean }).active;
		if (active === false) cn.active = false;
		const cdoc = cn.obj.name ? preserved.colDocByName.get(cn.obj.name) : undefined;
		if (cdoc) cn.doc = { ...cdoc };
		root.addChild(cn);
	}
	root.reindex("");
	const out: PersistedColumnsTree = {
		version: TREE_STORAGE_VERSION,
		kind: "columns-tree",
		tableRef: t.name,
		tableMeta: {
			originalName: t.originalName,
			hasIfNotExists: t.hasIfNotExists ?? true,
		},
		root: root.toJSON(),
	};
	if (preserved.treeDoc) out.doc = { ...preserved.treeDoc };
	return out;
}

// ---------------------------------------------------------------------------
// API pública.
// ---------------------------------------------------------------------------

export async function readTablesDoc(): Promise<TablesDoc> {
	const tree = await readPersistedTree();
	if (tree) {
		const tables = await materializeTablesFromTree(tree);
		return { version: 1, tables };
	}
	const split = await readLegacySplit();
	if (split) {
		await writeTablesDoc(split);
		await archiveLegacyFragments();
		return split;
	}
	const legacy = await readLegacyMonolithic();
	if (legacy) {
		await writeTablesDoc(legacy);
		try { await unlink(tablesJsonPath); } catch { /* noop */ }
		return legacy;
	}
	const seeded = await seedFromSql();
	await writeTablesDoc(seeded);
	return seeded;
}

export async function writeTablesDoc(doc: TablesDoc): Promise<void> {
	await mkdir(clientesisDir, { recursive: true });
	await mkdir(columnsDir, { recursive: true });
	const previousTree = await readPersistedTree();
	const preservedTree = collectPreservedDocs(previousTree);
	const { tree, persistedRefs } = buildPersistedTree(doc.tables, preservedTree);
	await writeFile(tablesTreePath, JSON.stringify(toV4TablesTree(tree), null, 2), "utf8");
	const writtenColumns = new Set<string>();
	for (const t of doc.tables) {
		if (!persistedRefs.has(t.name)) continue; // historiales sintéticos no escriben columnas
		const previousCols = await readColumnsTree(t.name);
		const preservedCols = collectPreservedColumnsDocs(previousCols);
		const file = path.join(columnsDir, `${t.name}.json`);
		const payload = buildColumnsTree(t, preservedCols);
		await writeFile(file, JSON.stringify(toV4ColumnsTree(payload), null, 2), "utf8");
		writtenColumns.add(`${t.name}.json`);
	}
	if (await exists(columnsDir)) {
		const existing = (await readdir(columnsDir)).filter((e) => e.endsWith(".json"));
		for (const e of existing) {
			if (!writtenColumns.has(e)) {
				try { await unlink(path.join(columnsDir, e)); } catch { /* noop */ }
			}
		}
	}
}

function toV4TablesTree(t: PersistedTablesTree): V4PersistedTablesTree {
	const store: V4NodeStore = persistedNodeTreeToV4Store(t.root);
	const out: V4PersistedTablesTree = {
		version: 4,
		kind: "tables-tree",
		nodes: store.nodes,
		entities: store.entities,
	};
	if (t.doc) out.doc = t.doc;
	return out;
}

function toV4ColumnsTree(t: PersistedColumnsTree): V4PersistedColumnsTree {
	const store: V4NodeStore = persistedNodeTreeToV4Store(t.root);
	const out: V4PersistedColumnsTree = {
		version: 4,
		kind: "columns-tree",
		tableref: t.tableRef,
		tablemeta: {
			originalname: t.tableMeta.originalName,
			hasifnotexists: t.tableMeta.hasIfNotExists,
		},
		nodes: store.nodes,
		entities: store.entities,
	};
	if (t.doc) out.doc = t.doc;
	return out;
}
