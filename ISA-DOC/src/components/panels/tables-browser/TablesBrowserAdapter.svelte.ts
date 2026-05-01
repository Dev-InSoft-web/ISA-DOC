import {
	createEmptyDomain as createEmptyDomainFn,
	loadChildPrefixes,
	loadDomains,
	loadPrefixOrders,
	loadTopLevelOrder,
	markAsMaster as markMasterFn,
	removeDomain as removeDomainFn,
	renameDomain as renameDomainFn,
	saveChildPrefixes,
	saveDomains,
	savePrefixOrders,
	saveTopLevelOrder,
	type DomainChildRef,
	type DomainDef,
	type DomainsMap,
	type PrefixOrderMap,
	type TopLevelEntry
} from "../../../lib/codeGen/domains.ts";
import type { ParsedTable } from "../../../lib/tableSchema";
import { effectiveTableName } from "../../../lib/tableSchema";
import { TreeAdapterCatalogoStub } from "../../_comps/TreeView/_treeAdapter/CatalogoStub";
import type { TreeViewProps } from "../../_comps/TreeView/TreeRowView.svelte";
import { TreeRowViewAdapter } from "../../_comps/TreeView/TreeRowView.svelte";
import { TTableNodeUX } from "./TTableNodeUX.svelte";

export type TablesBrowserChangeFn = (next: TablesBrowserState) => void;

export interface TablesBrowserState {
	tables: ParsedTable[];
	prefixRenames: Array<{ from: string; to: string }>;
}

export class TablesBrowserStack {
	id: string = "tables";
	rows: TTableNodeUX[] = [];
}

/**
 * Prefijo efectivo de la tabla. Es **explícito**: solo lo lee de
 * `effectivePrefix`. NO se infiere por el `_` del nombre porque las
 * agrupaciones por prefijo deben venir de un vigilante creado explícitamente.
 */
function effPrefixOf(t: ParsedTable): string {
	return t.effectivePrefix ?? "";
}

function tableKey(t: ParsedTable): string {
	return `${t.fragmentId}::${t.originalName}`;
}

export class TablesBrowserAdapter extends TreeRowViewAdapter<TablesBrowserStack, TTableNodeUX> {
	public onChange: TablesBrowserChangeFn = () => undefined;
	public onTableSelect: (key: string) => void = () => undefined;
	public onDomainsChange: (domains: DomainsMap) => void = () => undefined;
	public onAddRoot: () => void = () => undefined;
	public onCascadeAddDomain: () => void = () => undefined;
	public onCascadeAddPrefix: () => void = () => undefined;
	public onCascadeAddChildPrefix: (parent: TTableNodeUX) => void = () => undefined;
	public onGenerateSql: () => void = () => undefined;
	private _tables: ParsedTable[] = [];
	private _domains: DomainsMap = {};
	private _topOrder: TopLevelEntry[] = [];
	private _prefixOrders: PrefixOrderMap = {};
	/** Prefijos vacíos creados manualmente. Key: "" raíz | "prefix:<name>" | "domain:<id>". */
	private _emptyPrefixes: Map<string, string[]> = new Map();

	private persistChildPrefixes(): void {
		const obj: Record<string, string[]> = {};
		for (const [k, v] of this._emptyPrefixes) obj[k] = v.slice();
		saveChildPrefixes(obj);
	}

	constructor(tables: ParsedTable[], onChange?: TablesBrowserChangeFn) {
		const stacker = new TablesBrowserStack();
		const stub = new TreeAdapterCatalogoStub<TTableNodeUX>(() => self);
		super({
			Obj: stacker,
			itdForm: "edit",
			small: false,
			brapido: true,
			disabled: false,
			showToolbar: false,
			bdrag: true,
			CatalogoController: stub as unknown as TreeViewProps<TablesBrowserStack, TTableNodeUX>["CatalogoController"],
			TreeController: undefined as unknown as TreeRowViewAdapter<TablesBrowserStack, TTableNodeUX>,
		} as TreeViewProps<TablesBrowserStack, TTableNodeUX>);
		this.context.TreeController = this;
		const self = this;
		this.applyAdapterConfig({
			floatCard: { tx: "1rem", ty: "-1em", scale: 0.8 },
		});
		if (onChange) this.onChange = onChange;
		this._domains = loadDomains();
		this._topOrder = loadTopLevelOrder();
		this._prefixOrders = loadPrefixOrders();
		const storedChildPrefixes = loadChildPrefixes();
		for (const [k, v] of Object.entries(storedChildPrefixes)) {
			if (Array.isArray(v)) this._emptyPrefixes.set(k, v.slice());
		}
		this.setTables(tables);
	}

	get stack(): TablesBrowserStack { return this.obj; }
	get stackList(): any[] { return this.obj.rows as unknown as any[]; }
	set stackList(value: any[]) { this.obj.rows = value as unknown as TTableNodeUX[]; }

	get istack(): string { return this.obj.id; }
	get nistack(): string { return "id"; }
	get nodeCtor(): new (...args: any[]) => TTableNodeUX { return TTableNodeUX; }
	get nidNode(): string { return "flatPath"; }
	get ntitleNode(): string { return "rowName"; }

	createNode(data: any): TTableNodeUX {
		if (data instanceof TTableNodeUX) {
			data.stack = this.obj;
			data.refreshUX();
			return data;
		}
		return new TTableNodeUX(data as Partial<TTableNodeUX>, this.obj);
	}

	getlevelname(nivel?: number, _record?: any): string {
		return nivel === 1 ? "prefijo" : "tabla";
	}

	getEditDriverAttrs(): any[] { return []; }
	getEditAttrsForLevel(_d: any[], _p: TTableNodeUX): any[] { return []; }
	canEditSelectResource(_p: TTableNodeUX, _d: TTableNodeUX): boolean { return false; }
	getEditAtributoValor(_d: TTableNodeUX, _i: number): string { return ""; }
	setEditAtributoValor(d: TTableNodeUX, _i: number, _v: string): TTableNodeUX { return d; }
	setEditRecursoSelected(d: TTableNodeUX, _r: any): TTableNodeUX { return d; }

	get catalogoController(): TreeViewProps<TablesBrowserStack, TTableNodeUX>["CatalogoController"] {
		return this.context.CatalogoController;
	}

	override onrowclick(node: TTableNodeUX): void {
		super.onrowclick(node);
		if (node.kind === "table" && node.tableKey) {
			this.onTableSelect(node.tableKey);
		}
	}

	protected override getNodeIcon(node: TTableNodeUX) {
		if (node?.kind === "domain") {
			return { icon: "mdi:cube-outline", color: "warning" as const };
		}
		if (node?.kind === "table") {
			if (node.isMaster) return { icon: "mdi:crown", color: "warning" as const };
			return { icon: "mdi:table", color: "info" as const };
		}
		return null;
	}

	protected getNewNodeDefaults(_referenceId: string): Partial<TTableNodeUX> {
		return { kind: "prefix", rowName: "NUEVO_", prefix: "NUEVO_" } as Partial<TTableNodeUX>;
	}

	override getToolsBarActions(): any[] {
		return [
			{
				icon: "mdi:database-export",
				title: "Creación SQL · Resumen completo",
				onClick: () => this.onGenerateSql(),
			},
			{ icon: "mdi:unfold-less-horizontal", title: "Colapsar todo", onClick: () => this.collapseAll?.() },
			{ icon: "mdi:unfold-more-horizontal", title: "Expandir todo", onClick: () => this.expandAll?.() },
		];
	}

	override getToolsBarCascadeOptions(): any[] {
		return [[
			{ icon: "mdi:cube-outline", label: "Agregar dominio", title: "Agregar dominio", onClick: () => this.onCascadeAddDomain() },
			{ icon: "mdi:tag-outline", label: "Agregar prefijo", title: "Agregar prefijo", onClick: () => this.onCascadeAddPrefix() },
		]];
	}

	protected override particularactionsrow(_node: any): any[] { return []; }

	/** Delega la liberación del agrupador (actor `prison`) en los métodos específicos. */
	protected override onrelease(node: TTableNodeUX): void {
		if (!node) return;
		if (node.kind === "domain") this.releaseDomain(node.domainId);
		else if (node.kind === "prefix") this.releasePrefix(node.prefix ?? "");
	}

	/**
	 * Pipeline vigilante: la transformación vive en el propio nodo `prefix`
	 * (`obj.wardenAction.actionsOverNode`). El despachador genérico de
	 * `TARoles.wardenTransform` la invoca; este adapter no necesita override.
	 */

	/**
	 * Cadena de prefijos heredados desde la raíz hasta el nodo (outermost→innermost).
	 * Recorre los ancestros reales del árbol; los dominios son transparentes para
	 * la cadena (el warden del prefijo afecta a sus descendientes aún a través
	 * de un dominio intermedio). Esta es la representación VIRTUAL: no se
	 * almacena en el nodo.
	 */
	chainPrefixOf(rowId: string): string {
		const node = this.findNodeById(String(rowId || "").trim());
		if (!node) return "";
		const parts: string[] = [];
		const seen = new Set<string>();
		let cur: TTableNodeUX | null = node as unknown as TTableNodeUX;
		while (cur) {
			const curId = String(cur.flatPath ?? "").trim();
			if (curId) {
				if (seen.has(curId)) break;
				seen.add(curId);
			}
			const ref = String(cur.ireference || "").trim();
			if (!ref || ref === curId) break;
			const parent = this.findNodeById(ref) as unknown as TTableNodeUX | null;
			if (!parent) break;
			if (parent.kind === "prefix") parts.unshift(parent.prefix || "");
			cur = parent;
		}
		return parts.join("");
	}

	particularcascadeoptionsrow(node: TTableNodeUX): any[] {
		if (!node) return [];
		if (node.kind === "table") {
			const isM = !!node.isMaster;
			const inDom = !!node.domainId;
			return [
				{
					icon: isM ? "mdi:crown" : "mdi:crown-outline",
					label: isM
						? "Master del dominio"
						: inDom
							? "Marcar como master de este dominio"
							: "Crear su dominio",
					title: isM ? "Master del dominio" : "Marcar como master",
					color: isM ? ("warning" as const) : undefined,
					onClick: () => this.markTableAsMaster(node.rowName),
				},
			];
		}
		if (node.kind === "domain") {
			return [
				{
					icon: "mdi:tag-plus-outline",
					label: "Agregar prefijo como hijo",
					title: "Agregar prefijo como hijo",
					onClick: () => this.onCascadeAddChildPrefix(node),
				},
			];
		}
		if (node.kind === "prefix") {
			return [[
				{
					icon: "mdi:tag-plus-outline",
					label: "Agregar prefijo como hijo",
					title: "Agregar prefijo como hijo",
					onClick: () => this.onCascadeAddChildPrefix(node),
				},
				{
					icon: "mdi:cube-outline",
					label: "Agregar dominio como hijo",
					title: "Agregar dominio como hijo",
					onClick: () => this.createChildDomainOfPrefix(node.prefix ?? ""),
				},
			]];
		}
		return [];
	}

	setTables(tables: ParsedTable[]): void {
		this._tables = tables;
		this.rebuildRows();
	}

	/**
	 * Clave estable para el estado de expansión. Los `rowId` son posicionales
	 * y cambian al insertar/quitar nodos; en su lugar identificamos el
	 * agrupador por su tipo + identidad lógica. La capa base
	 * (`_treeAdapter/04-view.ts`) consume este hook para reidentificar nodos
	 * expandidos tras un `rebuildRows`.
	 */
	protected override stableExpandKey(obj: TTableNodeUX | null | undefined): string | null {
		if (!obj) return null;
		if (obj.kind === "domain") return obj.domainId ? `domain:${obj.domainId}` : null;
		if (obj.kind === "prefix") return `prefix:${obj.rowName ?? ""}`;
		if (obj.kind === "table") return obj.tableKey ? `table:${obj.tableKey}` : null;
		return null;
	}

	/**
	 * Actualiza la copia interna de `_tables` sin disparar `rebuildRows`. Se
	 * usa después de `emitChange()`, cuando el panel ya tiene la lista nueva y
	 * el árbol visible ya está consistente; solo necesitamos que el adapter
	 * deje de referenciar el snapshot anterior para evitar `effectivePrefix`
	 * desincronizado en cálculos posteriores.
	 */
	public syncTablesQuiet(tables: ParsedTable[]): void {
		this._tables = tables;
	}

	get domains(): DomainsMap { return this._domains; }

	setDomains(d: DomainsMap, persist: boolean = true): void {
		this._domains = d;
		if (persist) saveDomains(d);
		this.rebuildRows();
		this.onDomainsChange(d);
	}

	markTableAsMaster(tableName: string): void {
		const prefix = TablesBrowserAdapter.detectPrefix(tableName);
		const bare = (prefix ? tableName.slice(prefix.length) : tableName).toLowerCase();
		this.setDomains(markMasterFn(this._domains, tableName, `Dominio ${bare}`, prefix || undefined));
	}

	removeDomain(domainId: string): void {
		this.setDomains(removeDomainFn(this._domains, domainId));
	}

	/**
	 * "Libera" un dominio: sus hijos (tablas y sub-dominios) ocupan el lugar del
	 * dominio dentro de su contenedor (root, prefijo o super-dominio), preservando
	 * el orden. El dominio luego se elimina del mapa.
	 */
	releaseDomain(domainId: string): void {
		if (!domainId) return;
		const d = this._domains[domainId];
		if (!d) return;
		const children = this.effectiveChildrenOf(d);
		// Sub-prefijos vacíos colgados de este dominio se trasladan al padre.
		const childEmptyKey = `domain:${domainId}`;
		const childEmpty = (this._emptyPrefixes.get(childEmptyKey) ?? []).slice();
		this._emptyPrefixes.delete(childEmptyKey);
		const migrateChildEmptyTo = (targetKey: string) => {
			if (!childEmpty.length) return;
			const arr = this._emptyPrefixes.get(targetKey) ?? [];
			for (const cp of childEmpty) if (!arr.includes(cp)) arr.push(cp);
			this._emptyPrefixes.set(targetKey, arr);
		};
		if (typeof d.parentId === "string" && this._domains[d.parentId]) {
			const parent = this._domains[d.parentId];
			const parentChildren = this.effectiveChildrenOf(parent).filter((c) => !(c.kind === "domain" && c.key === domainId));
			const idx = this.effectiveChildrenOf(parent).findIndex((c) => c.kind === "domain" && c.key === domainId);
			const insertAt = idx < 0 ? parentChildren.length : idx;
			parentChildren.splice(insertAt, 0, ...children);
			parent.childrenOrder = parentChildren;
			// Actualizar parentId de sub-dominios y agregar tablas a members del parent.
			const masterUp = (parent.masterTable || "").toUpperCase();
			for (const c of children) {
				if (c.kind === "domain") {
					const sub = this._domains[c.key];
					if (sub) { sub.parentId = parent.id; sub.parentPrefix = undefined; }
				} else if (!parent.members.some((m) => m.toUpperCase() === c.key.toUpperCase()) && c.key.toUpperCase() !== masterUp) {
					parent.members.push(c.key);
				}
			}
			migrateChildEmptyTo(`domain:${parent.id}`);
		} else if (typeof d.parentPrefix === "string") {
			const prefix = d.parentPrefix;
			const list = (this._prefixOrders[prefix] ?? []).slice();
			const idx = list.findIndex((c) => c.kind === "domain" && c.key === domainId);
			const filtered = list.filter((c) => !(c.kind === "domain" && c.key === domainId));
			const translated = children.map((c) =>
				c.kind === "domain" ? { kind: "domain" as const, key: c.key } : { kind: "table" as const, key: c.key },
			);
			const insertAt = idx < 0 ? filtered.length : idx;
			filtered.splice(insertAt, 0, ...translated);
			this._prefixOrders[prefix] = filtered;
			for (const c of children) {
				if (c.kind === "domain") {
					const sub = this._domains[c.key];
					if (sub) { sub.parentId = undefined; sub.parentPrefix = prefix; }
				}
			}
			migrateChildEmptyTo(`prefix:${prefix}`);
		} else {
			const idx = this._topOrder.findIndex((e) => e.kind === "domain" && e.key === domainId);
			const filtered = this._topOrder.filter((e) => !(e.kind === "domain" && e.key === domainId));
			const translated: TopLevelEntry[] = children.map((c) =>
				c.kind === "domain" ? { kind: "domain", key: c.key } : { kind: "table", key: c.key },
			);
			const insertAt = idx < 0 ? filtered.length : idx;
			filtered.splice(insertAt, 0, ...translated);
			this._topOrder = filtered;
			for (const c of children) {
				if (c.kind === "domain") {
					const sub = this._domains[c.key];
					if (sub) { sub.parentId = undefined; sub.parentPrefix = undefined; }
				}
			}
			migrateChildEmptyTo("");
		}
		delete this._domains[domainId];
		this.persistChildPrefixes();
		saveDomains(this._domains);
		saveTopLevelOrder(this._topOrder);
		savePrefixOrders(this._prefixOrders);
		this.onDomainsChange(this._domains);
		this.rebuildRows();
		this.emitChange();
	}

	/**
	 * "Libera" un prefijo en cualquier nivel: sus hijos (tablas, sub-dominios y
	 * sub-prefijos vacíos) ocupan el lugar del prefijo en el contenedor padre,
	 * preservando el orden. El prefijo se elimina de `_topOrder`,
	 * `_prefixOrders` y `_emptyPrefixes`.
	 */
	releasePrefix(prefix: string): void {
		const upper = (s: string) => s.toUpperCase();
		// Localiza el `parentKey` donde vive este prefijo:
		//  "" para raíz, "prefix:<X>" para hijo de prefijo, "domain:<X>" para hijo de dominio.
		let parentKey: string | null = null;
		if (this._topOrder.some((e) => e.kind === "prefix" && e.key === prefix)) parentKey = "";
		if (parentKey === null) {
			for (const [pk, list] of this._emptyPrefixes) {
				if (list.includes(prefix)) { parentKey = pk; break; }
			}
		}
		if (parentKey === null) parentKey = "";

		// Hijos directos (tablas + sub-dominios) registrados en `_prefixOrders`.
		const stored = (this._prefixOrders[prefix] ?? []).slice();
		// Incluir tablas con `effectivePrefix === prefix` no listadas explícitamente.
		const claimed = new Set<string>();
		for (const d of Object.values(this._domains)) d.members.forEach((m) => claimed.add(upper(m)));
		const seenT = new Set(stored.filter((c) => c.kind === "table").map((c) => upper(c.key)));
		for (const t of this._tables) {
			if (claimed.has(upper(effectiveTableName(t)))) continue;
			if ((t.effectivePrefix ?? "") !== prefix) continue;
			const key = effectiveTableName(t);
			if (seenT.has(upper(key))) continue;
			stored.push({ kind: "table", key });
			seenT.add(upper(key));
		}

		// Sub-prefijos vacíos colgados de este prefijo se trasladan al padre.
		const childEmptyKey = `prefix:${prefix}`;
		const childEmpty = (this._emptyPrefixes.get(childEmptyKey) ?? []).slice();
		this._emptyPrefixes.delete(childEmptyKey);

		// Quita el prefijo de la lista del padre en `_emptyPrefixes`.
		const parentList = this._emptyPrefixes.get(parentKey) ?? [];
		const filteredParentList = parentList.filter((p) => p !== prefix);

		if (parentKey === "") {
			// Inserta hijos en `_topOrder` donde estaba el prefijo.
			const translated: TopLevelEntry[] = stored.map((c) =>
				c.kind === "domain" ? { kind: "domain", key: c.key } : { kind: "table", key: c.key },
			);
			const idx = this._topOrder.findIndex((e) => e.kind === "prefix" && e.key === prefix);
			const cleaned = this._topOrder.filter((e) => !(e.kind === "prefix" && e.key === prefix));
			const insertAt = idx < 0 ? cleaned.length : idx;
			cleaned.splice(insertAt, 0, ...translated);
			this._topOrder = cleaned;
			// Sub-dominios bajo el prefijo se vuelven dominios root.
			for (const c of stored) {
				if (c.kind === "domain") {
					const sub = this._domains[c.key];
					if (sub) { sub.parentId = undefined; sub.parentPrefix = undefined; }
				}
			}
			// Empty-prefixes hijos suben a raíz.
			if (childEmpty.length) {
				const list = this._emptyPrefixes.get("") ?? [];
				for (const cp of childEmpty) if (!list.includes(cp)) list.push(cp);
				this._emptyPrefixes.set("", list);
			}
			if (filteredParentList.length || this._emptyPrefixes.has(parentKey)) {
				this._emptyPrefixes.set(parentKey, filteredParentList);
			}
		} else if (parentKey.startsWith("prefix:")) {
			const parentPrefix = parentKey.slice(7);
			// Tablas y sub-dominios pasan a `_prefixOrders[parentPrefix]`.
			const list = (this._prefixOrders[parentPrefix] ?? []).slice();
			list.push(...stored);
			this._prefixOrders[parentPrefix] = list;
			for (const c of stored) {
				if (c.kind === "domain") {
					const sub = this._domains[c.key];
					if (sub) { sub.parentId = undefined; sub.parentPrefix = parentPrefix; }
				}
			}
			// Sub-prefijos vacíos se mueven al padre.
			if (childEmpty.length) {
				const arr = this._emptyPrefixes.get(parentKey) ?? [];
				for (const cp of childEmpty) if (!arr.includes(cp)) arr.push(cp);
				this._emptyPrefixes.set(parentKey, arr);
			}
			this._emptyPrefixes.set(parentKey, filteredParentList.concat(
				(this._emptyPrefixes.get(parentKey) ?? []).filter((p) => !filteredParentList.includes(p)),
			));
		} else if (parentKey.startsWith("domain:")) {
			const parentDomainId = parentKey.slice(7);
			const parent = this._domains[parentDomainId];
			if (parent) {
				const masterUp = (parent.masterTable || "").toUpperCase();
				parent.childrenOrder = parent.childrenOrder ?? [];
				parent.childrenOrder.push(...stored);
				for (const c of stored) {
					if (c.kind === "domain") {
						const sub = this._domains[c.key];
						if (sub) { sub.parentId = parent.id; sub.parentPrefix = undefined; }
					} else if (!parent.members.some((m) => upper(m) === upper(c.key)) && upper(c.key) !== masterUp) {
						parent.members.push(c.key);
					}
				}
			}
			if (childEmpty.length) {
				const arr = this._emptyPrefixes.get(parentKey) ?? [];
				for (const cp of childEmpty) if (!arr.includes(cp)) arr.push(cp);
				this._emptyPrefixes.set(parentKey, arr);
			}
			this._emptyPrefixes.set(parentKey, filteredParentList.concat(
				(this._emptyPrefixes.get(parentKey) ?? []).filter((p) => !filteredParentList.includes(p)),
			));
		}

		delete this._prefixOrders[prefix];
		this.persistChildPrefixes();
		saveDomains(this._domains);
		saveTopLevelOrder(this._topOrder);
		savePrefixOrders(this._prefixOrders);
		this.onDomainsChange(this._domains);
		this.rebuildRows();
		this.emitChange();
	}

	private effectiveChildrenOf(d: DomainDef): DomainChildRef[] {
		const upper = (s: string) => s.toUpperCase();
		if (d.childrenOrder && d.childrenOrder.length > 0) return d.childrenOrder.slice();
		const subs = Object.values(this._domains)
			.filter((x) => x.parentId === d.id)
			.map((x) => ({ kind: "domain" as const, key: x.id }));
		const ms = upper(d.masterTable || "");
		const tables: DomainChildRef[] = [
			...(ms ? [{ kind: "table" as const, key: d.masterTable }] : []),
			...d.members.filter((m) => upper(m) !== ms).map((m) => ({ kind: "table" as const, key: m })),
		];
		return [...subs, ...tables];
	}

	createDomain(name: string): void {
		this.setDomains(createEmptyDomainFn(this._domains, name));
	}

	/**
	 * Resuelve el anclaje del nodo enfocado: bajo qué contenedor ("" raiz | "prefix:.." | "domain:..")
	 * y, si está en raiz, el índice del ancestro raiz dentro de `_topOrder` para insertar después.
	 */
	private resolveCascadeAnchor(): { parentKey: string; insertAfterTop: number } {
		// Sincroniza _topOrder con el orden visual actual para que el anclaje incluya tablas.
		this.syncTopOrderFromVisible();
		const f = this.lastFocusedNode;
		if (!f) return { parentKey: "", insertAfterTop: this._topOrder.length - 1 };
		const upper = (s: string) => s.toUpperCase();
		// Sube hasta encontrar el ancestro de nivel raiz (ireference vacío).
		let cur: any = f;
		while (cur && String(cur.ireference || "").trim()) {
			cur = this.findNodeById(String(cur.ireference || "").trim());
			if (!cur) break;
		}
		const rootObj = (cur?.obj ?? f.obj) as TTableNodeUX;
		const rootIdx = this._topOrder.findIndex((e) =>
			(e.kind === "domain" && rootObj.kind === "domain" && e.key === rootObj.domainId) ||
			(e.kind === "prefix" && rootObj.kind === "prefix" && e.key === (rootObj.prefix ?? "")) ||
			(e.kind === "table" && rootObj.kind === "table" && upper(e.key) === upper(rootObj.rowName)),
		);
		// Determina el contenedor inmediato del foco.
		const parentId = String(f.ireference || "").trim();
		let parentKey = "";
		if (parentId) {
			const parent = this.findNodeById(parentId) as unknown as TTableNodeUX | null;
			if (parent?.kind === "domain") parentKey = `domain:${parent.domainId ?? ""}`;
			else if (parent?.kind === "prefix") parentKey = `prefix:${parent.prefix ?? ""}`;
		}
		return { parentKey, insertAfterTop: rootIdx >= 0 ? rootIdx : this._topOrder.length - 1 };
	}

	/** Materializa el orden actual en `_topOrder` (incluye tablas raíz) para insertar relativamente. */
	private syncTopOrderFromVisible(): void {
		const upper = (s: string) => s.toUpperCase();
		const visible: TopLevelEntry[] = [];
		for (const r of this.obj.rows) {
			if (String(r.ireference || "").trim()) continue;
			if (r.kind === "domain" && r.domainId) visible.push({ kind: "domain", key: r.domainId });
			else if (r.kind === "prefix") visible.push({ kind: "prefix", key: r.prefix ?? "" });
			else if (r.kind === "table") visible.push({ kind: "table", key: r.rowName });
		}
		// Sólo persiste si hay entradas visibles (evita borrar el orden si rows está vacío en una transición).
		if (visible.length) {
			this._topOrder = visible;
			saveTopLevelOrder(this._topOrder);
			void upper;
		}
	}

	/** Genera un nombre único tipo `${base}` o `${base} N` que no choque con dominios existentes. */
	/** Detecta un prefijo `[A-Z][A-Z0-9]*_` al inicio del nombre. */
	private static detectPrefix(name: string): string {
		const m = /^([A-Z][A-Z0-9]*_)/.exec(name);
		return m ? m[1] : "";
	}

	private uniqueDomainName(base: string): string {
		const names = new Set(Object.values(this._domains).map((d) => d.name));
		if (!names.has(base)) return base;
		let i = 2;
		while (names.has(`${base} ${i}`)) i += 1;
		return `${base} ${i}`;
	}

	/** Genera un prefijo único tipo `NUEVO_` o `NUEVO2_` que no choque con prefijos detectados o vacíos. */
	private uniquePrefixName(parentKey: string, base: string = "NUEVO"): string {
		const upper = (s: string) => s.toUpperCase();
		const declared = new Set<string>(this._emptyPrefixes.get(parentKey) ?? []);
		const detected = new Set<string>();
		for (const t of this._tables) detected.add(upper(TablesBrowserAdapter.detectPrefix(t.name)));
		const exists = (n: string) => declared.has(n) || detected.has(n);
		let candidate = `${base}_`;
		let i = 2;
		while (exists(candidate)) {
			candidate = `${base}${i}_`;
			i += 1;
		}
		return candidate;
	}

	/** Crea un dominio vacío en el contenedor del nodo enfocado, justo debajo del foco. */
	addDomainAtFocus(): void {
		const anchor = this.resolveCascadeAnchor();
		const name = this.uniqueDomainName("Nuevo dominio");
		const before = new Set(Object.keys(this._domains));
		let next: DomainsMap;
		if (anchor.parentKey.startsWith("domain:")) {
			next = createEmptyDomainFn(this._domains, name, anchor.parentKey.slice(7), undefined);
		} else if (anchor.parentKey.startsWith("prefix:")) {
			next = createEmptyDomainFn(this._domains, name, undefined, anchor.parentKey.slice(7));
		} else {
			next = createEmptyDomainFn(this._domains, name);
			const newId = Object.keys(next).find((k) => !before.has(k));
			if (newId) {
				const at = anchor.insertAfterTop + 1;
				this._topOrder = [...this._topOrder.slice(0, at), { kind: "domain", key: newId }, ...this._topOrder.slice(at)];
				saveTopLevelOrder(this._topOrder);
			}
		}
		this.setDomains(next);
	}

	/** Crea un prefijo vacío en el contenedor del nodo enfocado, justo debajo del foco. */
	addPrefixAtFocus(): void {
		const anchor = this.resolveCascadeAnchor();
		const name = this.uniquePrefixName(anchor.parentKey);
		if (anchor.parentKey === "") {
			const arr = this._emptyPrefixes.get("") ?? [];
			arr.push(name);
			this._emptyPrefixes.set("", arr);
			const at = anchor.insertAfterTop + 1;
			this._topOrder = [...this._topOrder.slice(0, at), { kind: "prefix", key: name }, ...this._topOrder.slice(at)];
			saveTopLevelOrder(this._topOrder);
		} else {
			const arr = this._emptyPrefixes.get(anchor.parentKey) ?? [];
			arr.push(name);
			this._emptyPrefixes.set(anchor.parentKey, arr);
		}
		this.persistChildPrefixes();
		this.rebuildRows();
	}

	/** Crea un dominio vacío como hijo de otro dominio. */
	createChildDomainOfDomain(parentDomainId: string, name: string = "Nuevo dominio"): void {
		this.setDomains(createEmptyDomainFn(this._domains, name, parentDomainId, undefined));
	}

	/** Crea un dominio vacío como hijo de un prefijo. */
	createChildDomainOfPrefix(parentPrefix: string, name: string = "Nuevo dominio"): void {
		this.setDomains(createEmptyDomainFn(this._domains, name, undefined, parentPrefix));
	}

	/**
	 * Crea un prefijo vacío bajo un padre. parentKey: "" para raíz, "prefix:<name>" o "domain:<id>".
	 * Si ya existe un prefijo con ese nombre detectado en tablas o declarado vacío, no lo duplica.
	 */
	addEmptyPrefix(parentKey: string, name?: string): void {
		const clean = name ? (name.trim().toUpperCase().replace(/_+$/, "") + "_") : this.uniquePrefixName(parentKey);
		if (!clean || clean === "_") return;
		const arr = this._emptyPrefixes.get(parentKey) ?? [];
		if (arr.includes(clean)) return;
		arr.push(clean);
		this._emptyPrefixes.set(parentKey, arr);
		this.persistChildPrefixes();
		this.rebuildRows();
	}

	/**
	 * Override: el rowName de un nodo `domain` se reconstruye desde `_domains[id].name`
	 * en `rebuildRows()`, así que la mutación local que hace `updateNode` por defecto
	 * se perdería al refrescar. Persistimos el rename en el mapa de dominios y luego
	 * delegamos en la mutación normal para mantener consistencia in-memory.
	 */
	override updateNode(data: any, mutate?: (target: TTableNodeUX, source: TTableNodeUX) => void): boolean {
		const item = data as TTableNodeUX | undefined;
		if (item && item.kind === "domain" && item.domainId) {
			const current = this._domains[item.domainId];
			const nextName = String(item.rowName ?? "").trim();
			if (current && nextName && current.name !== nextName) {
				this._domains = renameDomainFn(this._domains, item.domainId, nextName);
				saveDomains(this._domains);
				this.onDomainsChange(this._domains);
			}
		}
		return super.updateNode(data, mutate);
	}

	protected override canAddChild(): boolean { return false; }

	override get groupTypes(): readonly string[] { return ["domain", "prefix"]; }
	override get actionTypes(): readonly string[] { return ["domain"]; }

	override canDropAtRoot(src: TTableNodeUX): boolean {
		return src.kind === "domain" || src.kind === "prefix" || src.kind === "table";
	}

	private rebuildRows(): void {
		const upper = (s: string) => s.toUpperCase();
		const tableByUpper = new Map<string, { table: ParsedTable; index: number }>();
		this._tables.forEach((t, index) => tableByUpper.set(upper(effectiveTableName(t)), { table: t, index }));

		const claimedUpper = new Set<string>();
		const allDomains = Object.values(this._domains);
		allDomains.forEach((d) => d.members.forEach((m) => claimedUpper.add(upper(m))));

		// Tablas marcadas como root-level por _topOrder (kind:"table"): no se agrupan por prefijo.
		const rootTablesUpper = new Set<string>();
		for (const e of this._topOrder) {
			if (e.kind === "table") rootTablesUpper.add(upper(e.key));
		}

		// Tablas no-dominio (ni root) agrupadas por prefijo
		const grouped = new Map<string, { table: ParsedTable; index: number }[]>();
		this._tables.forEach((t, index) => {
			if (claimedUpper.has(upper(effectiveTableName(t)))) return;
			if (rootTablesUpper.has(upper(effectiveTableName(t)))) return;
			const p = effPrefixOf(t);
			let arr = grouped.get(p);
			if (!arr) { arr = []; grouped.set(p, arr); }
			arr.push({ table: t, index });
		});
		// Dominios agrupados por prefijo padre (cuelgan directamente del prefijo, sin parentId).
		const domainsByPrefix = new Map<string, DomainDef[]>();
		for (const d of allDomains) {
			if (!d.parentId && typeof d.parentPrefix === "string") {
				let arr = domainsByPrefix.get(d.parentPrefix);
				if (!arr) { arr = []; domainsByPrefix.set(d.parentPrefix, arr); }
				arr.push(d);
			}
		}
		const knownPrefixes = Array.from(new Set([...grouped.keys(), ...domainsByPrefix.keys(), ...(this._emptyPrefixes.get("") ?? [])]));
		const childrenOfDomain = new Map<string | undefined, DomainDef[]>();
		for (const d of allDomains) {
			if (!d.parentId && typeof d.parentPrefix === "string") continue;
			const k = d.parentId;
			let arr = childrenOfDomain.get(k);
			if (!arr) { arr = []; childrenOfDomain.set(k, arr); }
			arr.push(d);
		}

		// Orden a nivel raíz: usar topOrder persistido si menciona los items; si faltan, agregar al final.
		const rootDomains = childrenOfDomain.get(undefined) ?? [];
		const rootDomainIds = new Set(rootDomains.map((d) => d.id));
		const rootEmptyPrefixes = new Set(this._emptyPrefixes.get("") ?? []);
		const validTop = this._topOrder.filter((e) =>
			(e.kind === "domain" && rootDomainIds.has(e.key)) ||
			(e.kind === "prefix" && (grouped.has(e.key) || rootEmptyPrefixes.has(e.key))) ||
			(e.kind === "table" && tableByUpper.has(upper(e.key)) && !claimedUpper.has(upper(e.key))),
		);
		const seenTop = new Set(validTop.map((e) => `${e.kind}:${e.kind === "table" ? upper(e.key) : e.key}`));
		for (const d of rootDomains) {
			const k = `domain:${d.id}`;
			if (!seenTop.has(k)) { validTop.push({ kind: "domain", key: d.id }); seenTop.add(k); }
		}
		const sortedPrefixes = knownPrefixes.slice().sort((a, b) => {
			if (a === b) return 0;
			if (a === "") return 1;
			if (b === "") return -1;
			return a.localeCompare(b);
		});
		for (const p of sortedPrefixes) {
			const k = `prefix:${p}`;
			if (!seenTop.has(k)) { validTop.push({ kind: "prefix", key: p }); seenTop.add(k); }
		}

		const rows: TTableNodeUX[] = [];
		const counters: number[] = [0];

		const orderedChildrenOf = (d: DomainDef): DomainChildRef[] => {
			const masterUp = upper(d.masterTable || "");
			const withMasterFirst = (entries: DomainChildRef[]): DomainChildRef[] => {
				if (!masterUp) return entries;
				const idx = entries.findIndex((e) => e.kind === "table" && upper(e.key) === masterUp);
				if (idx <= 0) return entries;
				const copy = entries.slice();
				const [m] = copy.splice(idx, 1);
				copy.unshift(m);
				return copy;
			};
			if (d.childrenOrder && d.childrenOrder.length > 0) {
				const order = d.childrenOrder.slice();
				const seenT = new Set<string>();
				const seenD = new Set<string>();
				for (const e of order) {
					if (e.kind === "table") seenT.add(upper(e.key));
					else seenD.add(e.key);
				}
				const subs = childrenOfDomain.get(d.id) ?? [];
				for (const s of subs) if (!seenD.has(s.id)) order.push({ kind: "domain", key: s.id });
				for (const m of d.members) if (!seenT.has(upper(m))) order.push({ kind: "table", key: m });
				const filtered = order.filter((e) =>
					(e.kind === "domain" && (childrenOfDomain.get(d.id) ?? []).some((s) => s.id === e.key)) ||
					(e.kind === "table" && d.members.some((m) => upper(m) === upper(e.key))),
				);
				return withMasterFirst(filtered);
			}
			// Legacy: sub-dominios primero, luego tablas (master primero).
			const subs = (childrenOfDomain.get(d.id) ?? []).map((s) => ({ kind: "domain" as const, key: s.id }));
			const ms = upper(d.masterTable || "");
			const tables = [
				...(ms ? [{ kind: "table" as const, key: d.masterTable }] : []),
				...d.members.filter((m) => upper(m) !== ms).map((m) => ({ kind: "table" as const, key: m })),
			];
			return [...subs, ...tables];
		};

		const pushEmptyChildPrefixes = (parentKey: string, parentRowId: string, depth: number): void => {
			const names = this._emptyPrefixes.get(parentKey) ?? [];
			for (const name of names) {
				counters[depth] = (counters[depth] ?? 0) + 1;
				const rid = parentRowId ? `${parentRowId}.${counters[depth]}` : String(counters[depth]);
				rows.push(new TTableNodeUX({
					flatPath: rid,
					ireference: parentRowId,
					kind: "prefix",
					rowName: name,
					prefix: name,
				}, this.obj));
			}
		};

		const pushDomainTree = (d: DomainDef, parentRowId: string, depth: number): void => {
			counters[depth] = (counters[depth] ?? 0) + 1;
			const myRowId = parentRowId ? `${parentRowId}.${counters[depth]}` : String(counters[depth]);
			rows.push(new TTableNodeUX({
				flatPath: myRowId,
				ireference: parentRowId,
				kind: "domain",
				rowName: d.name,
				domainId: d.id,
			}, this.obj));
			counters[depth + 1] = 0;
			for (const child of orderedChildrenOf(d)) {
				if (child.kind === "domain") {
					const subDef = this._domains[child.key];
					if (subDef) pushDomainTree(subDef, myRowId, depth + 1);
				} else {
					const found = tableByUpper.get(upper(child.key));
					if (!found) continue;
					counters[depth + 1] += 1;
					const isM = upper(child.key) === upper(d.masterTable);
					rows.push(new TTableNodeUX({
						flatPath: `${myRowId}.${counters[depth + 1]}`,
						ireference: myRowId,
						kind: "table",
						rowName: found.table.name,
						tableKey: tableKey(found.table),
						tableIndex: found.index,
						colCount: found.table.columns.length,
						prefix: effPrefixOf(found.table),
						domainId: d.id,
						isMaster: isM,
					}, this.obj));
				}
			}
			pushEmptyChildPrefixes(`domain:${d.id}`, myRowId, depth + 1);
		};

		// Recorre el orden raíz mezclado.
		counters[0] = 0;

		/**
		 * Emite recursivamente un prefijo y sus subprefijos. `chainPrefix` es la
		 * concatenación de todos los prefijos ancestros (p.ej. "CAPAC_" antes de
		 * un prefijo "HISTORIAL_"). Las tablas que se posicionan dentro de este
		 * nodo de prefijo son las cuyo nombre empieza por `chainPrefix + prefix`
		 * y NO encajan en uno de los subprefijos registrados.
		 */
		const pushPrefixSubtree = (
			prefix: string,
			chainPrefix: string,
			parentRowId: string,
			depth: number,
			tablesScope: { table: ParsedTable; index: number }[],
			childDomainsScope: DomainDef[],
		): void => {
			counters[depth] = (counters[depth] ?? 0) + 1;
			const myRowId = parentRowId ? `${parentRowId}.${counters[depth]}` : String(counters[depth]);
			rows.push(new TTableNodeUX({
				flatPath: myRowId,
				ireference: parentRowId,
				kind: "prefix",
				rowName: prefix || "(sin prefijo)",
				prefix,
			}, this.obj));
			const fullChain = chainPrefix + prefix;
			// Tablas candidatas a este nivel: las que empiezan por la cadena completa
			// (computado sobre el nombre efectivo, que respeta `effectivePrefix`).
			const tablesHere = tablesScope.filter((it) => upper(effectiveTableName(it.table)).startsWith(upper(fullChain)));
			// Subprefijos registrados bajo este prefijo. Pueden estar vacíos o tener tablas/dominios.
			const childPrefixNames = (this._emptyPrefixes.get(`prefix:${prefix}`) ?? []).slice();
			// Particionado: para cada tabla, ver si encaja en algún subprefijo registrado.
			const childTables = new Map<string, { table: ParsedTable; index: number }[]>();
			const directTables: { table: ParsedTable; index: number }[] = [];
			const matchChildOf = (it: { table: ParsedTable; index: number }): string | null => {
				const bare = upper(effectiveTableName(it.table)).slice(upper(fullChain).length);
				let best: string | null = null;
				for (const cp of childPrefixNames) {
					if (bare.startsWith(upper(cp)) && (!best || upper(cp).length > upper(best).length)) best = cp;
				}
				return best;
			};
			for (const it of tablesHere) {
				const cp = matchChildOf(it);
				if (cp) {
					let arr = childTables.get(cp);
					if (!arr) { arr = []; childTables.set(cp, arr); }
					arr.push(it);
				} else {
					directTables.push(it);
				}
			}
			// Dominios y orden directo bajo este prefijo (sólo aplica al primer nivel
			// del prefijo, no a subprefijos; mantiene compatibilidad con el modelo previo).
			const childDomains = childDomainsScope;
			const stored = this._prefixOrders[prefix];
			const tableUpperToItem = new Map(directTables.map((it) => [upper(effectiveTableName(it.table)), it]));
			const domainIdToDef = new Map(childDomains.map((d) => [d.id, d]));
			const orderRefs: DomainChildRef[] = [];
			const seenT = new Set<string>();
			const seenD = new Set<string>();
			if (stored && stored.length) {
				for (const e of stored) {
					if (e.kind === "table" && tableUpperToItem.has(upper(e.key)) && !seenT.has(upper(e.key))) {
						orderRefs.push(e); seenT.add(upper(e.key));
					} else if (e.kind === "domain" && domainIdToDef.has(e.key) && !seenD.has(e.key)) {
						orderRefs.push(e); seenD.add(e.key);
					}
				}
			}
			for (const d of childDomains) if (!seenD.has(d.id)) { orderRefs.push({ kind: "domain", key: d.id }); seenD.add(d.id); }
			for (const it of directTables) if (!seenT.has(upper(effectiveTableName(it.table)))) { orderRefs.push({ kind: "table", key: effectiveTableName(it.table) }); seenT.add(upper(effectiveTableName(it.table))); }
			counters[depth + 1] = 0;
			for (const ref of orderRefs) {
				if (ref.kind === "domain") {
					const sub = domainIdToDef.get(ref.key);
					if (sub) pushDomainTree(sub, myRowId, depth + 1);
					continue;
				}
				const it = tableUpperToItem.get(upper(ref.key));
				if (!it) continue;
				counters[depth + 1] += 1;
				// `rowName` es el bare (nombre sin la cadena ancestra). El warden
				// del prefijo decora visualmente prependiendo su prefijo a este bare.
				const effFull = effectiveTableName(it.table);
				const bare = upper(effFull).startsWith(upper(fullChain)) ? effFull.slice(fullChain.length) : it.table.name;
				rows.push(new TTableNodeUX({
					flatPath: `${myRowId}.${counters[depth + 1]}`,
					ireference: myRowId,
					kind: "table",
					rowName: bare,
					tableKey: tableKey(it.table),
					tableIndex: it.index,
					colCount: it.table.columns.length,
					prefix: effPrefixOf(it.table),
				}, this.obj));
			}
			// Subprefijos: emítelos al final, recursivamente.
			for (const cp of childPrefixNames) {
				const childTbls = childTables.get(cp) ?? [];
				pushPrefixSubtree(cp, fullChain, myRowId, depth + 1, childTbls, []);
			}
		};

		for (const entry of validTop) {
			if (entry.kind === "domain") {
				const d = this._domains[entry.key];
				if (d) pushDomainTree(d, "", 0);
				continue;
			}
			if (entry.kind === "table") {
				const found = tableByUpper.get(upper(entry.key));
				if (!found) continue;
				counters[0] = (counters[0] ?? 0) + 1;
				const tid = String(counters[0]);
				rows.push(new TTableNodeUX({
					flatPath: tid,
					ireference: "",
					kind: "table",
					rowName: found.table.name,
					tableKey: tableKey(found.table),
					tableIndex: found.index,
					colCount: found.table.columns.length,
					prefix: effPrefixOf(found.table),
				}, this.obj));
				continue;
			}
			// prefix entry
			const prefix = entry.key;
			const items = grouped.get(prefix) ?? [];
			const childDomains = domainsByPrefix.get(prefix) ?? [];
			pushPrefixSubtree(prefix, "", "", 0, items, childDomains);
		}

		this.obj.rows = rows;
		this.onrefresh();
		this.syncAllRowAdapters();
	}

	protected commitFlatList(flat: TTableNodeUX[]): void {
		this.obj.rows = flat.map((n) => { n.stack = this.obj; n.refreshUX(); return n; });
		this.recomputeDomainsFromTree();
		this.emitChange();
	}

	/**
	 * A partir del estado actual del árbol, reconstruye `_domains` (parentId, members,
	 * childrenOrder) y `_topOrder` para reflejar cualquier drag de tablas o dominios.
	 * NO re-renderea las filas: `oncommittreeorder` ya dejó ids/iref consistentes.
	 */
	private recomputeDomainsFromTree(): void {
		const flat = this.obj.rows;
		const byRowId = new Map<string, TTableNodeUX>();
		for (const n of flat) byRowId.set(n.flatPath, n);

		// Sube por ireference hasta el primer nodo agrupador (domain o prefix).
		const enclosingContainerOf = (rowId: string): { kind: "domain" | "prefix"; key: string } | null => {
			const seen = new Set<string>();
			let cur = byRowId.get(rowId);
			while (cur) {
				if (seen.has(cur.flatPath)) return null;
				seen.add(cur.flatPath);
				const ref = String(cur.ireference || "").trim();
				if (!ref || ref === cur.flatPath) return null;
				const parent = byRowId.get(ref);
				if (!parent) return null;
				if (parent.kind === "domain") return { kind: "domain", key: parent.domainId ?? "" };
				if (parent.kind === "prefix") return { kind: "prefix", key: parent.prefix ?? "" };
				cur = parent;
			}
			return null;
		};

		// Reset members + parentId + parentPrefix + childrenOrder de todos los dominios existentes.
		const next: DomainsMap = {};
		for (const id of Object.keys(this._domains)) {
			next[id] = { ...this._domains[id], members: [], parentId: undefined, parentPrefix: undefined, childrenOrder: [] };
		}

		const topOrder: TopLevelEntry[] = [];
		const seenTop = new Set<string>();
		const seenPrefixForTop = new Set<string>();
		const prefixOrders: PrefixOrderMap = {};
		// Reconstruye el mapa de prefijos hijos a partir del árbol actual. Las claves
		// siguen el contrato: "" para la raíz, "prefix:<name>" para un prefijo padre,
		// "domain:<id>" para un dominio padre.
		const nextEmptyPrefixes: Map<string, string[]> = new Map();
		const ensureChildPrefixList = (parentKey: string): string[] => {
			let arr = nextEmptyPrefixes.get(parentKey);
			if (!arr) { arr = []; nextEmptyPrefixes.set(parentKey, arr); }
			return arr;
		};
		const ensurePrefix = (k: string): DomainChildRef[] => {
			let arr = prefixOrders[k]; if (!arr) { arr = []; prefixOrders[k] = arr; } return arr;
		};

		for (const n of flat) {
			const refStr = String(n.ireference || "").trim();
			if (n.kind === "domain") {
				const did = n.domainId;
				if (!did || !next[did]) continue;
				const enc = enclosingContainerOf(n.flatPath);
				if (enc?.kind === "domain" && enc.key && next[enc.key]) {
					next[did].parentId = enc.key;
					next[enc.key].childrenOrder!.push({ kind: "domain", key: did });
				} else if (enc?.kind === "prefix") {
					next[did].parentPrefix = enc.key;
					ensurePrefix(enc.key).push({ kind: "domain", key: did });
				} else if (!refStr) {
					const tk = `domain:${did}`;
					if (!seenTop.has(tk)) { topOrder.push({ kind: "domain", key: did }); seenTop.add(tk); }
				}
				continue;
			}
			if (n.kind === "table") {
				const enc = enclosingContainerOf(n.flatPath);
				// Para mantener unicidad y consistencia entre fragmentos, las claves
				// persistidas usan el nombre EFECTIVO (cadena ancestra + bare).
				const sourceTable = n.tableIndex >= 0 ? this._tables[n.tableIndex] : undefined;
				const effFull = sourceTable ? effectiveTableName(sourceTable) : n.rowName;
				if (enc?.kind === "domain" && enc.key && next[enc.key]) {
					if (!next[enc.key].members.some((m) => m.toUpperCase() === effFull.toUpperCase())) {
						next[enc.key].members.push(effFull);
						next[enc.key].childrenOrder!.push({ kind: "table", key: effFull });
					}
				} else if (enc?.kind === "prefix") {
					ensurePrefix(enc.key).push({ kind: "table", key: effFull });
				} else if (!refStr) {
					const tk = `table:${effFull.toUpperCase()}`;
					if (!seenTop.has(tk)) { topOrder.push({ kind: "table", key: effFull }); seenTop.add(tk); }
				}
				continue;
			}
			if (n.kind === "prefix") {
				const pk = n.prefix ?? "";
				const enc = enclosingContainerOf(n.flatPath);
				if (enc?.kind === "prefix") {
					const list = ensureChildPrefixList(`prefix:${enc.key}`);
					if (!list.includes(pk)) list.push(pk);
				} else if (enc?.kind === "domain") {
					const list = ensureChildPrefixList(`domain:${enc.key}`);
					if (!list.includes(pk)) list.push(pk);
				} else if (!refStr) {
					const list = ensureChildPrefixList("");
					if (!list.includes(pk)) list.push(pk);
					if (!seenPrefixForTop.has(pk)) {
						seenPrefixForTop.add(pk);
						const tk = `prefix:${pk}`;
						if (!seenTop.has(tk)) { topOrder.push({ kind: "prefix", key: pk }); seenTop.add(tk); }
					}
				}
			}
		}

		// Mantener master si sigue como miembro; si no, asignar el primer miembro como master.
		for (const d of Object.values(next)) {
			const masterUp = d.masterTable.toUpperCase();
			const stillThere = d.members.some((m) => m.toUpperCase() === masterUp);
			if (!stillThere) d.masterTable = d.members[0] ?? "";
		}

		this._domains = next;
		this._topOrder = topOrder;
		this._prefixOrders = prefixOrders;
		this._emptyPrefixes = nextEmptyPrefixes;
		const childPrefixObj: Record<string, string[]> = {};
		for (const [k, v] of nextEmptyPrefixes) childPrefixObj[k] = v.slice();
		saveChildPrefixes(childPrefixObj);
		saveDomains(next);
		saveTopLevelOrder(topOrder);
		savePrefixOrders(prefixOrders);
		this.onDomainsChange(next);
	}

	private emitChange(): void {
		// Reconstruir orden de tablas a partir del árbol. La cadena de prefijos
		// (calculada virtualmente vía `chainPrefixOf`) se persiste como
		// `effectivePrefix`; el nombre real (bare) queda en `name`.
		const flat = this.obj.rows;
		const original = this._tables.slice();
		const orderedTables: ParsedTable[] = [];
		const seen = new Set<number>();
		const renames: Array<{ from: string; to: string }> = [];
		for (const n of flat) {
			if (n.kind !== "table") continue;
			if (n.tableIndex < 0) continue;
			const t = original[n.tableIndex];
			if (!t) continue;
			seen.add(n.tableIndex);
			const chain = this.chainPrefixOf(n.flatPath);
			const sanitized = String(n.rowName ?? "").trim();
			const nextEffPrefix = chain || undefined;
			const prevFull = effectiveTableName(t);
			const nextFull = (nextEffPrefix ?? "") + sanitized;
			if (sanitized === t.name && nextEffPrefix === t.effectivePrefix) {
				orderedTables.push(t);
				continue;
			}
			if (nextFull !== prevFull) renames.push({ from: prevFull, to: nextFull });
			orderedTables.push({ ...t, name: sanitized, effectivePrefix: nextEffPrefix });
		}
		original.forEach((t, i) => { if (!seen.has(i)) orderedTables.push(t); });
		this.onChange({ tables: orderedTables, prefixRenames: renames });
	}
}
