import {
	createEmptyDomain as createEmptyDomainFn,
	deriveDomainName,
	loadChildPrefixes,
	loadDomains,
	loadPrefixOrders,
	loadTopLevelOrder,
	markAsMaster as markMasterFn,
	migrateDomainsAndOrdersToIds,
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
import { toastError } from "@ingenieria_insoft/ispsveltecomponents";
import type { ParsedTable } from "../../../lib/tableSchema";
import { effectiveTableName } from "../../../lib/tableSchema";
import { TreeAdapterCatalogoStub } from "../../_comps/TreeView/_treeAdapter/CatalogoStub";
import type { TreeViewProps } from "../../_comps/TreeView/TreeRowView.svelte";
import { TreeRowViewAdapter } from "../../_comps/TreeView/TreeRowView.svelte";
import { TTableNodeUX } from "./TTableNodeUX";

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

/**
 * Clave estable de la tabla. Coincide con `ParsedTable.id` (id inmutable e
 * independiente del `name` y del `originalName`). Se usa como `tableKey` en
 * los nodos UX y como valor de `members`/`masterTable`/`childrenOrder` en
 * los dominios persistidos.
 */
function tableKey(t: ParsedTable): string {
	return t.id;
}

export class TreeSQLTablesAdapter extends TreeRowViewAdapter<TablesBrowserStack, TTableNodeUX> {
	public onChange: TablesBrowserChangeFn = () => undefined;
	public onTableSelect: (key: string) => void = () => undefined;
	public onDomainsChange: (domains: DomainsMap) => void = () => undefined;
	public onAddRoot: () => void = () => undefined;
	public onCascadeAddDomain: () => void = () => undefined;
	public onCascadeAddPivot: () => void = () => undefined;
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
			return;
		}
	}

	/**
	 * Doble click / Enter sobre una tabla NO debe abrir el drawer; solo selecciona la tabla
	 * para que el panel central y derecho actualicen sus formularios.
	 * Para agrupadores (domain/pivot/prefix) abre el drawer de edición.
	 */
	override onrowdblclick(node: TTableNodeUX): void {
		if (node?.kind === "table" && node.tableKey) {
			this.onTableSelect(node.tableKey);
			return;
		}
		if (node.kind === "domain" || node.kind === "pivot" || node.kind === "prefix") {
			this.openEdit(node);
			return;
		}
		super.onrowdblclick(node);
	}

	protected override getNodeIcon(node: TTableNodeUX) {
		if (node?.kind === "domain") {
			if (node.isMaster) return { icon: "mdi:crown", style: "color: hotpink !important;" };
			return { icon: "mdi:cube-outline", color: "warning" as const };
		}
		if (node?.kind === "pivot") {
			const pivotParent = this.findNodeById(String(node.ireference || "").trim()) as unknown as TTableNodeUX | null;
			const inDomain = pivotParent?.kind === "domain";
			if (node.isMaster) return { icon: "mdi:crown", style: inDomain ? "color: orange !important;" : "color: hotpink !important;" };
			return { icon: "mdi:link-variant", style: inDomain ? "color: orange !important;" : "color: hotpink !important;" };
		}
		if (node?.kind === "prefix") {
			return { icon: "mdi:tag-outline", color: "success" as const };
		}
		if (node?.kind === "table") {
			if (node.isMaster) {
				const parent = this.findNodeById(String(node.ireference || "").trim()) as unknown as TTableNodeUX | null;
				if (parent?.kind === "pivot") {
					const grand = parent ? (this.findNodeById(String(parent.ireference || "").trim()) as unknown as TTableNodeUX | null) : null;
					const inDomain = grand?.kind === "domain";
					return { icon: "mdi:crown", style: inDomain ? "color: orange !important;" : "color: hotpink !important;" };
				}
				return { icon: "mdi:crown", color: "warning" as const };
			}
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
			{ icon: "mdi:link-variant", label: "Agregar pivote", title: "Agregar pivote", onClick: () => this.onCascadeAddPivot() },
			{ icon: "mdi:tag-outline", label: "Agregar prefijo", title: "Agregar prefijo", onClick: () => this.onCascadeAddPrefix() },
		]];
	}

	protected override particularactionsrow(_node: any): any[] { return []; }

	/** Delega la liberación del agrupador (actor `prison`) en los métodos específicos. */
	protected override onrelease(node: TTableNodeUX): void {
		if (!node) return;
		if (node.kind === "domain" || node.kind === "pivot") this.releaseDomain(node.domainId);
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
		const parent = this.findNodeById(String(node.ireference || "").trim()) as unknown as TTableNodeUX | null;
		const inPivot = parent?.kind === "pivot";
		const pivotMasterBtn = {
			icon: "mdi:crown-outline",
			label: "Master de pivote",
			title: "Marcar como master del pivote",
			style: "color: hotpink !important;",
			onClick: () => this.markAsMasterOfPivot(node),
		};
		if (node.kind === "table") {
			const isM = !!node.isMaster;
			if (inPivot) {
				return isM ? [] : [pivotMasterBtn];
			}
			if (isM) return [];
			const inDom = !!node.domainId;
			return [
				{
					icon: "mdi:crown-outline",
					label: inDom ? "Master de dominio" : "Crear su dominio",
					title: inDom ? "Marcar como master del dominio" : "Crear su dominio",
					onClick: () => this.markTableAsMaster(node.rowName),
				},
			];
		}
		if (node.kind === "domain") {
			const isM = !!node.isMaster;
			if (inPivot) {
				const arr: any[] = [];
				if (!isM) arr.push(pivotMasterBtn);
				arr.push({
					icon: "mdi:tag-plus-outline",
					label: "Agregar prefijo como hijo",
					title: "Agregar prefijo como hijo",
					onClick: () => this.onCascadeAddChildPrefix(node),
				});
				return arr.length > 1 ? [arr] : arr;
			}
			return [
				{
					icon: "mdi:tag-plus-outline",
					label: "Agregar prefijo como hijo",
					title: "Agregar prefijo como hijo",
					onClick: () => this.onCascadeAddChildPrefix(node),
				},
			];
		}
		if (node.kind === "pivot") {
			const isM = !!node.isMaster;
			const arr: any[] = [];
			if (inPivot && !isM) arr.push(pivotMasterBtn);
			arr.push({
				icon: "mdi:tag-plus-outline",
				label: "Agregar prefijo como hijo",
				title: "Agregar prefijo como hijo",
				onClick: () => this.onCascadeAddChildPrefix(node),
			});
			return arr.length > 1 ? [arr] : arr;
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
				{
					icon: "mdi:link-variant",
					label: "Agregar pivote como hijo",
					title: "Agregar pivote como hijo",
					style: "color: hotpink !important;",
					onClick: () => this.createChildPivotOfPrefix(node.prefix ?? ""),
				},
			]];
		}
		return [];
	}

	setTables(tables: ParsedTable[]): void {
		this._tables = tables;
		this.migrateRefsToIds();
		this.rebuildRows();
	}

	/**
	 * Reescribe `members`, `masterTable`, `childrenOrder.key` (kind:"table"),
	 * `_topOrder.key` (kind:"table") y `_prefixOrders.key` (kind:"table") para
	 * que apunten a `ParsedTable.id` en lugar de a nombres efectivos. Los
	 * datos heredados (donde estos campos guardaban nombres) se reconcilian
	 * contra el snapshot actual de tablas. Persiste si hubo cambios.
	 */
	private migrateRefsToIds(): void {
		if (!this._tables.length) return;
		const result = migrateDomainsAndOrdersToIds({
			domains: this._domains,
			topOrder: this._topOrder,
			prefixOrders: this._prefixOrders,
			tables: this._tables,
		});
		if (!result.changed) return;
		this._domains = result.domains;
		this._topOrder = result.topOrder;
		this._prefixOrders = result.prefixOrders;
		saveDomains(this._domains);
		saveTopLevelOrder(this._topOrder);
		savePrefixOrders(this._prefixOrders);
	}

	/** Recarga el estado persistido (domains/orders/prefixes) desde la caché del stateClient. */
	reloadFromCache(): DomainsMap {
		this._domains = loadDomains();
		this._topOrder = loadTopLevelOrder();
		this._prefixOrders = loadPrefixOrders();
		this._emptyPrefixes.clear();
		const storedChildPrefixes = loadChildPrefixes();
		for (const [k, v] of Object.entries(storedChildPrefixes)) {
			if (Array.isArray(v)) this._emptyPrefixes.set(k, v.slice());
		}
		this.migrateRefsToIds();
		this.rebuildRows();
		return this._domains;
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
		if (obj.kind === "pivot") return obj.domainId ? `pivot:${obj.domainId}` : null;
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
		// Re-mapea `tableIndex` de las filas existentes para reflejar el nuevo
		// orden de `_tables`. Sin esto, futuros `emitChange` resuelven `t` con
		// índices obsoletos y se cruzan los `originalName` entre tablas vecinas
		// (corrupción de columnas y formularios mostrando datos de otra tabla).
		const byKey = new Map<string, number>();
		tables.forEach((t, i) => {
			if (t.id && !byKey.has(t.id)) byKey.set(t.id, i);
		});
		for (const n of this.obj.rows) {
			if (n.kind !== "table" || !n.tableKey) continue;
			const idx = byKey.get(n.tableKey);
			if (idx !== undefined) n.tableIndex = idx;
		}
	}

	get domains(): DomainsMap { return this._domains; }

	setDomains(d: DomainsMap, persist: boolean = true): void {
		this._domains = d;
		if (persist) saveDomains(d);
		this.rebuildRows();
		this.onDomainsChange(d);
	}

	/** Actualiza la cardinalidad y/o el subtipo (`pivot` ↔ `pivot-domain`) de un agrupador. */
	updateDomainMeta(domainId: string, patch: Partial<Pick<DomainDef, "cardinality" | "type" | "prefix">>): void {
		const cur = this._domains[domainId];
		if (!cur) return;
		const next: DomainsMap = { ...this._domains, [domainId]: { ...cur, ...patch } };
		this.setDomains(next);
	}

	/** Establece la cardinalidad de una tabla esclava dentro de su dominio. */
	setSlaveCardinality(domainId: string, tableId: string, value: "1:1" | "1:N" | "N:N"): void {
		const cur = this._domains[domainId];
		if (!cur) return;
		const map = { ...(cur.slaveCardinalities ?? {}) };
		map[tableId] = value;
		const next: DomainsMap = { ...this._domains, [domainId]: { ...cur, slaveCardinalities: map } };
		this.setDomains(next);
	}

	/**
	 * Marca como master la tabla identificada por `tableRef`. Acepta tanto el
	 * id estable de la tabla (`ParsedTable.id`) como el nombre efectivo, para
	 * tolerar callers heredados; resuelve internamente al id.
	 */
	markTableAsMaster(tableRef: string): void {
		const upper = (s: string) => s.toUpperCase();
		const targetUpper = upper(tableRef);
		const found =
			this._tables.find((t) => t.id === tableRef) ??
			this._tables.find((t) => upper(effectiveTableName(t)) === targetUpper) ??
			this._tables.find((t) => upper(t.name) === targetUpper);
		if (!found) return;
		const tableId = found.id;
		const effFull = effectiveTableName(found);
		const tablePrefix = found.effectivePrefix ?? "";
		const domainName = deriveDomainName(effFull, tablePrefix);

		// Localiza el contenedor actual de la tabla (root | prefix | domain) y su índice.
		let parentDomainId: string | undefined;
		let parentPrefix: string | undefined;
		let originalIndex = -1;
		const tableNode = this.obj.rows.find(
			(n) => n.kind === "table" && n.tableKey === tableId,
		);
		if (tableNode) {
			const refStr = String(tableNode.ireference || "").trim();
			const parent = refStr ? (this.findNodeById(refStr) as unknown as TTableNodeUX | null) : null;
			if (parent?.kind === "domain" || parent?.kind === "pivot") {
				parentDomainId = parent.domainId ?? undefined;
				const pd = parentDomainId ? this._domains[parentDomainId] : undefined;
				const order = pd?.childrenOrder ?? [];
				originalIndex = order.findIndex((e) => e.kind === "table" && e.key === tableId);
			} else if (parent?.kind === "prefix") {
				parentPrefix = parent.prefix ?? "";
				const order = this._prefixOrders[parentPrefix] ?? [];
				originalIndex = order.findIndex((e) => e.kind === "table" && e.key === tableId);
			} else {
				originalIndex = this._topOrder.findIndex((e) => e.kind === "table" && e.key === tableId);
			}
		} else if (tablePrefix) {
			parentPrefix = tablePrefix;
		}

		const prevIds = new Set(Object.keys(this._domains));
		let nextDomains = markMasterFn(this._domains, tableId, effFull, domainName, parentPrefix);
		let newId = "";
		for (const id of Object.keys(nextDomains)) {
			if (!prevIds.has(id) && nextDomains[id].masterTable === tableId) { newId = id; break; }
		}
		if (newId && parentDomainId) {
			nextDomains = {
				...nextDomains,
				[newId]: { ...nextDomains[newId], parentId: parentDomainId, parentPrefix: undefined },
			};
		}
		this._domains = nextDomains;

		// Inserta el dominio en el contenedor original, en la posición exacta donde estaba la tabla.
		if (newId) {
			if (parentDomainId) {
				const pd = this._domains[parentDomainId];
				if (pd) {
					const order = (pd.childrenOrder ?? []).slice();
					const tIdx = order.findIndex((e) => e.kind === "table" && e.key === tableId);
					if (tIdx >= 0) order.splice(tIdx, 1);
					const insertAt = originalIndex >= 0 ? Math.min(originalIndex, order.length) : order.length;
					order.splice(insertAt, 0, { kind: "domain", key: newId });
					const newMembers = pd.members.filter((m) => m !== tableId);
					this._domains = { ...this._domains, [parentDomainId]: { ...pd, members: newMembers, childrenOrder: order } };
				}
			} else if (typeof parentPrefix === "string") {
				const order = (this._prefixOrders[parentPrefix] ?? []).slice();
				const tIdx = order.findIndex((e) => e.kind === "table" && e.key === tableId);
				if (tIdx >= 0) order.splice(tIdx, 1);
				const insertAt = originalIndex >= 0 ? Math.min(originalIndex, order.length) : order.length;
				order.splice(insertAt, 0, { kind: "domain", key: newId });
				this._prefixOrders = { ...this._prefixOrders, [parentPrefix]: order };
				savePrefixOrders(this._prefixOrders);
			} else {
				const order = this._topOrder.slice();
				const tIdx = order.findIndex((e) => e.kind === "table" && e.key === tableId);
				if (tIdx >= 0) order.splice(tIdx, 1);
				const insertAt = originalIndex >= 0 ? Math.min(originalIndex, order.length) : order.length;
				order.splice(insertAt, 0, { kind: "domain", key: newId });
				this._topOrder = order;
				saveTopLevelOrder(this._topOrder);
			}
		}

		this.setDomains(this._domains);
		void upper;
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
		const childEmptyKey = `${d.type === "pivot" ? "pivot" : "domain"}:${domainId}`;
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
			const parentChildren = this.effectiveChildrenOf(parent).filter((c) => !((c.kind === "domain" || c.kind === "pivot") && c.key === domainId));
			const idx = this.effectiveChildrenOf(parent).findIndex((c) => (c.kind === "domain" || c.kind === "pivot") && c.key === domainId);
			const insertAt = idx < 0 ? parentChildren.length : idx;
			parentChildren.splice(insertAt, 0, ...children);
			parent.childrenOrder = parentChildren;
			// Actualizar parentId de sub-dominios y agregar tablas a members del parent.
			const masterId = parent.masterTable || "";
			for (const c of children) {
				if (c.kind === "domain" || c.kind === "pivot") {
					const sub = this._domains[c.key];
					if (sub) { sub.parentId = parent.id; sub.parentPrefix = undefined; }
				} else if (!parent.members.includes(c.key) && c.key !== masterId) {
					parent.members.push(c.key);
				}
			}
			migrateChildEmptyTo(`${parent.type === "pivot" ? "pivot" : "domain"}:${parent.id}`);
		} else if (typeof d.parentPrefix === "string") {
			const prefix = d.parentPrefix;
			const list = (this._prefixOrders[prefix] ?? []).slice();
			const idx = list.findIndex((c) => (c.kind === "domain" || c.kind === "pivot") && c.key === domainId);
			const filtered = list.filter((c) => !((c.kind === "domain" || c.kind === "pivot") && c.key === domainId));
			const translated = children.map((c) =>
				(c.kind === "domain" || c.kind === "pivot") ? { kind: c.kind, key: c.key } : { kind: "table" as const, key: c.key },
			);
			const insertAt = idx < 0 ? filtered.length : idx;
			filtered.splice(insertAt, 0, ...translated);
			this._prefixOrders[prefix] = filtered;
			for (const c of children) {
				if (c.kind === "domain" || c.kind === "pivot") {
					const sub = this._domains[c.key];
					if (sub) { sub.parentId = undefined; sub.parentPrefix = prefix; }
				}
			}
			migrateChildEmptyTo(`prefix:${prefix}`);
		} else {
			const idx = this._topOrder.findIndex((e) => (e.kind === "domain" || e.kind === "pivot") && e.key === domainId);
			const filtered = this._topOrder.filter((e) => !((e.kind === "domain" || e.kind === "pivot") && e.key === domainId));
			const translated: TopLevelEntry[] = children.map((c) =>
				(c.kind === "domain" || c.kind === "pivot") ? { kind: c.kind, key: c.key } : { kind: "table", key: c.key },
			);
			const insertAt = idx < 0 ? filtered.length : idx;
			filtered.splice(insertAt, 0, ...translated);
			this._topOrder = filtered;
			for (const c of children) {
				if (c.kind === "domain" || c.kind === "pivot") {
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
		const claimedIds = new Set<string>();
		for (const d of Object.values(this._domains)) d.members.forEach((m) => claimedIds.add(m));
		const seenT = new Set(stored.filter((c) => c.kind === "table").map((c) => c.key));
		for (const t of this._tables) {
			if (claimedIds.has(t.id)) continue;
			if ((t.effectivePrefix ?? "") !== prefix) continue;
			if (seenT.has(t.id)) continue;
			stored.push({ kind: "table", key: t.id });
			seenT.add(t.id);
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
				(c.kind === "domain" || c.kind === "pivot") ? { kind: c.kind, key: c.key } : { kind: "table", key: c.key },
			);
			const idx = this._topOrder.findIndex((e) => e.kind === "prefix" && e.key === prefix);
			const cleaned = this._topOrder.filter((e) => !(e.kind === "prefix" && e.key === prefix));
			const insertAt = idx < 0 ? cleaned.length : idx;
			cleaned.splice(insertAt, 0, ...translated);
			this._topOrder = cleaned;
			// Sub-dominios bajo el prefijo se vuelven dominios root.
			for (const c of stored) {
				if (c.kind === "domain" || c.kind === "pivot") {
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
				if (c.kind === "domain" || c.kind === "pivot") {
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
		} else if (parentKey.startsWith("domain:") || parentKey.startsWith("pivot:")) {
			const sliceIdx = parentKey.startsWith("pivot:") ? 6 : 7;
			const parentDomainId = parentKey.slice(sliceIdx);
			const parent = this._domains[parentDomainId];
			if (parent) {
				const masterId = parent.masterTable || "";
				parent.childrenOrder = parent.childrenOrder ?? [];
				parent.childrenOrder.push(...stored);
				for (const c of stored) {
					if (c.kind === "domain" || c.kind === "pivot") {
						const sub = this._domains[c.key];
						if (sub) { sub.parentId = parent.id; sub.parentPrefix = undefined; }
					} else if (!parent.members.includes(c.key) && c.key !== masterId) {
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
		if (d.childrenOrder && d.childrenOrder.length > 0) return d.childrenOrder.slice();
		const subs = Object.values(this._domains)
			.filter((x) => x.parentId === d.id)
			.map((x) => ({ kind: (x.type === "pivot" ? "pivot" : "domain") as "domain" | "pivot", key: x.id }));
		const masterId = d.masterTable || "";
		const tables: DomainChildRef[] = [
			...(masterId ? [{ kind: "table" as const, key: masterId }] : []),
			...d.members.filter((m) => m !== masterId).map((m) => ({ kind: "table" as const, key: m })),
		];
		return [...subs, ...tables];
	}

	createDomain(name: string): void {
		this.setDomains(createEmptyDomainFn(this._domains, name));
	}

	createPivot(name: string): void {
		this.setDomains(createEmptyDomainFn(this._domains, name, undefined, undefined, "pivot"));
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
		// Sube hasta encontrar el ancestro de nivel raiz (ireference vacío).
		let cur: any = f;
		while (cur && String(cur.ireference || "").trim()) {
			cur = this.findNodeById(String(cur.ireference || "").trim());
			if (!cur) break;
		}
		const rootObj = (cur ?? f) as TTableNodeUX;
		const rootIdx = this._topOrder.findIndex((e) =>
			!!e && (
				((e.kind === "domain" || e.kind === "pivot") && (rootObj.kind === "domain" || rootObj.kind === "pivot") && e.key === rootObj.domainId) ||
				(e.kind === "prefix" && rootObj.kind === "prefix" && e.key === (rootObj.prefix ?? "")) ||
				(e.kind === "table" && rootObj.kind === "table" && e.key === rootObj.tableKey)
			),
		);
		// Determina el contenedor inmediato del foco.
		const parentId = String(f.ireference || "").trim();
		let parentKey = "";
		if (parentId) {
			const parent = this.findNodeById(parentId) as unknown as TTableNodeUX | null;
			if (parent?.kind === "domain") parentKey = `domain:${parent.domainId ?? ""}`;
			else if (parent?.kind === "pivot") parentKey = `pivot:${parent.domainId ?? ""}`;
			else if (parent?.kind === "prefix") parentKey = `prefix:${parent.prefix ?? ""}`;
		}
		return { parentKey, insertAfterTop: rootIdx >= 0 ? rootIdx : this._topOrder.length - 1 };
	}

	/** Materializa el orden actual en `_topOrder` (incluye tablas raíz) para insertar relativamente. */
	private syncTopOrderFromVisible(): void {
		const visible: TopLevelEntry[] = [];
		for (const r of this.obj.rows) {
			if (String(r.ireference || "").trim()) continue;
			if (r.kind === "domain" && r.domainId) visible.push({ kind: "domain", key: r.domainId });
			else if (r.kind === "pivot" && r.domainId) visible.push({ kind: "pivot", key: r.domainId });
			else if (r.kind === "prefix") visible.push({ kind: "prefix", key: r.prefix ?? "" });
			else if (r.kind === "table" && r.tableKey) visible.push({ kind: "table", key: r.tableKey });
		}
		// Sólo persiste si hay entradas visibles (evita borrar el orden si rows está vacío en una transición).
		if (visible.length) {
			this._topOrder = visible;
			saveTopLevelOrder(this._topOrder);
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
		for (const t of this._tables) detected.add(upper(TreeSQLTablesAdapter.detectPrefix(t.name)));
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
		this.addGroupAtFocus("domain");
	}

	/** Crea un pivote vacío en el contenedor del nodo enfocado, justo debajo del foco. */
	addPivotAtFocus(): void {
		// Restricción: los pivotes sólo pueden existir dentro de un dominio (o de otro pivote
		// que esté dentro de un dominio). Bloquea creación a nivel raíz o bajo prefix.
		const anchor = this.resolveCascadeAnchor();
		const insideDomain = anchor.parentKey.startsWith("domain:")
			|| (anchor.parentKey.startsWith("pivot:") && this.isAncestorADomain(anchor.parentKey.slice(6)));
		if (!insideDomain) {
			toastError("Los pivotes sólo pueden crearse dentro de un dominio.");
			return;
		}
		this.addGroupAtFocus("pivot");
	}

	/** Sube por la cadena `parentId` a partir de un pivote y devuelve true si encuentra un dominio. */
	private isAncestorADomain(domainOrPivotId: string): boolean {
		let cur: DomainDef | undefined = this._domains[domainOrPivotId];
		while (cur) {
			if ((cur.type ?? "domain") === "domain") return true;
			cur = cur.parentId ? this._domains[cur.parentId] : undefined;
		}
		return false;
	}

	private addGroupAtFocus(type: "domain" | "pivot"): void {
		const anchor = this.resolveCascadeAnchor();
		const defaultName = type === "pivot" ? "Nuevo pivote" : "Nuevo dominio";
		const name = this.uniqueDomainName(defaultName);
		const before = new Set(Object.keys(this._domains));
		let next: DomainsMap;
		if (anchor.parentKey.startsWith("domain:")) {
			next = createEmptyDomainFn(this._domains, name, anchor.parentKey.slice(7), undefined, type);
		} else if (anchor.parentKey.startsWith("pivot:")) {
			next = createEmptyDomainFn(this._domains, name, anchor.parentKey.slice(6), undefined, type);
		} else if (anchor.parentKey.startsWith("prefix:")) {
			next = createEmptyDomainFn(this._domains, name, undefined, anchor.parentKey.slice(7), type);
		} else {
			next = createEmptyDomainFn(this._domains, name, undefined, undefined, type);
			const newId = Object.keys(next).find((k) => !before.has(k));
			if (newId) {
				const at = anchor.insertAfterTop + 1;
				this._topOrder = [...this._topOrder.slice(0, at), { kind: type, key: newId }, ...this._topOrder.slice(at)];
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

	/** Crea un pivote vacío como hijo de un dominio. */
	createChildPivotOfDomain(parentDomainId: string, name: string = "Nuevo pivote"): void {
		this.setDomains(createEmptyDomainFn(this._domains, name, parentDomainId, undefined, "pivot"));
	}

	/** Crea un pivote vacío como hijo de un prefijo. */
	createChildPivotOfPrefix(parentPrefix: string, name: string = "Nuevo pivote"): void {
		this.setDomains(createEmptyDomainFn(this._domains, name, undefined, parentPrefix, "pivot"));
	}

	/**
	 * Marca un nodo (tabla o dominio) como master del pivote padre.
	 * Si ya es master, lo desmarca (master vacío). El pivot es un agrupador de
	 * tablas y dominios que se comunican vía GET; el master no genera dominio
	 * nuevo (a diferencia de `markTableAsMaster` para dominios).
	 */
	markAsMasterOfPivot(node: TTableNodeUX): void {
		if (!node) return;
		const parent = this.findNodeById(String(node.ireference || "").trim()) as unknown as TTableNodeUX | null;
		if (!parent || parent.kind !== "pivot") return;
		const pivotId = parent.domainId;
		if (!pivotId) return;
		const piv = this._domains[pivotId];
		if (!piv) return;
		const targetId = node.kind === "table" ? (node.tableKey || "") : (node.domainId || "");
		if (!targetId) return;
		const nextMaster = piv.masterTable === targetId ? "" : targetId;
		this._domains = { ...this._domains, [pivotId]: { ...piv, masterTable: nextMaster } };
		saveDomains(this._domains);
		this.onDomainsChange(this._domains);
		this.rebuildRows();
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
		if (item && (item.kind === "domain" || item.kind === "pivot") && item.domainId) {
			const current = this._domains[item.domainId];
			const nextName = String(item.rowName ?? "").trim();
			if (current && nextName && current.name !== nextName) {
				this._domains = renameDomainFn(this._domains, item.domainId, nextName);
				saveDomains(this._domains);
				this.onDomainsChange(this._domains);
			}
		}
		if (item && item.kind === "prefix") {
			// El form solo edita `rowName`; `prefix` queda como ancla del valor
			// previo. Así podemos comparar viejo (item.prefix) vs nuevo (item.rowName).
			const oldPrefix = String(item.prefix ?? "").trim();
			const rawNext = String(item.rowName ?? "").trim();
			const normalized = rawNext ? (rawNext.toUpperCase().replace(/_+$/, "") + "_") : "";
			if (normalized && normalized !== "_" && normalized !== oldPrefix) {
				// 1) Renombrar la clave en `_prefixOrders` (tablas/dominios listados).
				if (this._prefixOrders[oldPrefix]) {
					const arr = this._prefixOrders[oldPrefix];
					delete this._prefixOrders[oldPrefix];
					this._prefixOrders[normalized] = arr;
					savePrefixOrders(this._prefixOrders);
				}
				// 2) Renombrar entradas en `_topOrder`.
				let topChanged = false;
				this._topOrder = this._topOrder.map((e) => {
					if (e.kind === "prefix" && e.key === oldPrefix) { topChanged = true; return { ...e, key: normalized }; }
					return e;
				});
				if (topChanged) saveTopLevelOrder(this._topOrder);
				// 3) Renombrar valores en `_emptyPrefixes` (puede aparecer como hijo de varios padres).
				let emptyChanged = false;
				for (const [k, v] of this._emptyPrefixes) {
					const next = v.map((p) => (p === oldPrefix ? normalized : p));
					if (next.some((p, i) => p !== v[i])) {
						this._emptyPrefixes.set(k, next);
						emptyChanged = true;
					}
				}
				// 3b) Renombrar la CLAVE `prefix:<oldPrefix>` cuando ese prefijo es padre.
				const oldKey = `prefix:${oldPrefix}`;
				const newKey = `prefix:${normalized}`;
				if (this._emptyPrefixes.has(oldKey)) {
					const arr = this._emptyPrefixes.get(oldKey)!;
					this._emptyPrefixes.delete(oldKey);
					this._emptyPrefixes.set(newKey, arr);
					emptyChanged = true;
				}
				if (emptyChanged) this.persistChildPrefixes();
				// 4) Renombrar `parentPrefix` en dominios.
				let domsChanged = false;
				for (const d of Object.values(this._domains)) {
					if (d.parentPrefix === oldPrefix) { d.parentPrefix = normalized; domsChanged = true; }
				}
				if (domsChanged) {
					saveDomains(this._domains);
					this.onDomainsChange(this._domains);
				}
				// 5) Reflejar el nuevo prefijo en el nodo: `prefix` y `rowName` quedan
				//    consistentes para que `chainPrefixOf` produzca el effectivePrefix correcto
				//    en `emitChange`, que a su vez disparará el rename en las tablas.
				item.prefix = normalized;
				item.rowName = normalized;
				const ok = super.updateNode(item, mutate);
				// 6) Forzar emit con renames de tablas; el consumidor reasigna effectivePrefix.
				this.emitChange();
				return ok;
			}
		}
		return super.updateNode(data, mutate);
	}

	/**
	 * Override: nodos `domain`/`prefix` son contenedores virtuales; no viven en
	 * `stackList`, así que `super.removeNode` no los puede eliminar. Para esos
	 * casos delegamos en `releaseDomain`/`releasePrefix`, que vacían el contenedor
	 * preservando hijos en su lugar y persisten el cambio.
	 */
	override removeNode(data: any): boolean {
		const item = data as TTableNodeUX | undefined;
		if (item && item.kind === "domain" && item.domainId) {
			this.releaseDomain(item.domainId);
			return true;
		}
		if (item && item.kind === "prefix" && item.prefix) {
			this.releasePrefix(item.prefix);
			return true;
		}
		return super.removeNode(data);
	}

	protected override canAddChild(): boolean { return false; }

	override get groupTypes(): readonly string[] { return ["domain", "pivot", "prefix"]; }
	override get actionTypes(): readonly string[] { return ["domain", "pivot"]; }

	override canDropAtRoot(src: TTableNodeUX): boolean {
		return src.kind === "domain" || src.kind === "pivot" || src.kind === "prefix" || src.kind === "table";
	}

	private rebuildRows(): void {
		// Dedupe in-place de `_topOrder` y `_prefixOrders` antes de regenerar.
		// Reorders sucesivos pueden dejar entradas repetidas; sin esto se emiten
		// rows con `flatPath` duplicado y se rompe el `{#each}` keyed.
		const dedupEntries = (list: { kind: string; key: string }[]) => {
			const seen = new Set<string>();
			const out: typeof list = [];
			for (const e of list) {
				const k = `${e.kind}:${e.key}`;
				if (seen.has(k)) continue;
				seen.add(k);
				out.push(e);
			}
			return out;
		};
		this._topOrder = dedupEntries(this._topOrder) as TopLevelEntry[];
		for (const pk of Object.keys(this._prefixOrders)) {
			this._prefixOrders[pk] = dedupEntries(this._prefixOrders[pk]) as DomainChildRef[];
		}
		// \u00cdndice de tablas por id estable (`ParsedTable.id`). Es la \u00fanica\n\t\t// identidad usada por dominios/\u00f3rdenes; los nombres son secundarios.
		const tableById = new Map<string, { table: ParsedTable; index: number }>();
		this._tables.forEach((t, index) => {
			if (t.id) tableById.set(t.id, { table: t, index });
		});

		const claimedIds = new Set<string>();
		const allDomains = Object.values(this._domains);
		allDomains.forEach((d) => d.members.forEach((m) => claimedIds.add(m)));

		// Tablas marcadas como root-level por _topOrder (kind:"table"): no se agrupan por prefijo.
		const rootTableIds = new Set<string>();
		for (const e of this._topOrder) {
			if (e.kind === "table") rootTableIds.add(e.key);
		}

		// Tablas no-dominio (ni root) agrupadas por su `effectivePrefix` EXACTO.
		// No se infiere por nombre: una tabla pertenece a un agrupador de prefijo
		// SOLO si su `effectivePrefix` coincide exactamente con el `prefix` del
		// agrupador. Tablas con `effectivePrefix === ""` van directamente al root
		// (jamás se crea un agrupador sintético "(sin prefijo)").
		const grouped = new Map<string, { table: ParsedTable; index: number }[]>();
		const bareTables: { table: ParsedTable; index: number }[] = [];
		this._tables.forEach((t, index) => {
			if (claimedIds.has(t.id)) return;
			if (rootTableIds.has(t.id)) return;
			const p = effPrefixOf(t);
			if (!p) { bareTables.push({ table: t, index }); return; }
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
		const knownPrefixes = Array.from(new Set([...grouped.keys(), ...domainsByPrefix.keys(), ...(this._emptyPrefixes.get("") ?? [])])).filter((p) => p !== "");
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
		const validTopRaw = this._topOrder.filter((e) =>
			((e.kind === "domain" || e.kind === "pivot") && rootDomainIds.has(e.key)) ||
			(e.kind === "prefix" && e.key !== "" && (grouped.has(e.key) || rootEmptyPrefixes.has(e.key))) ||
			(e.kind === "table" && tableById.has(e.key) && !claimedIds.has(e.key)),
		);
		// Dedupe defensivo: `_topOrder` puede acumular entradas repetidas tras
		// reorders/recompute; sin esto se emiten dos rows con el mismo `flatPath`
		// y revienta el `{#each}` keyed del TreeView (`each_key_duplicate`).
		const validTop: TopLevelEntry[] = [];
		const seenValid = new Set<string>();
		for (const e of validTopRaw) {
			const k = `${e.kind}:${e.key}`;
			if (seenValid.has(k)) continue;
			seenValid.add(k);
			validTop.push(e);
		}
		const seenTop = seenValid;
		for (const d of rootDomains) {
			const entryKind: "domain" | "pivot" = d.type === "pivot" ? "pivot" : "domain";
			const k = `${entryKind}:${d.id}`;
			if (!seenTop.has(k)) { validTop.push({ kind: entryKind, key: d.id }); seenTop.add(k); }
		}
		const sortedPrefixes = knownPrefixes.slice().sort((a, b) => a.localeCompare(b));
		for (const p of sortedPrefixes) {
			const k = `prefix:${p}`;
			if (!seenTop.has(k)) { validTop.push({ kind: "prefix", key: p }); seenTop.add(k); }
		}

		const rows: TTableNodeUX[] = [];
		const counters: number[] = [0];

		const orderedChildrenOf = (d: DomainDef): DomainChildRef[] => {
			const masterUp = d.masterTable || "";
			const withMasterFirst = (entries: DomainChildRef[]): DomainChildRef[] => {
				if (!masterUp) return entries;
				const idx = entries.findIndex((e) => e.key === masterUp);
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
					if (e.kind === "table") seenT.add(e.key);
					else seenD.add(e.key);
				}
				const subs = childrenOfDomain.get(d.id) ?? [];
				for (const s of subs) if (!seenD.has(s.id)) order.push({ kind: (s.type === "pivot" ? "pivot" : "domain"), key: s.id });
				for (const m of d.members) if (!seenT.has(m)) order.push({ kind: "table", key: m });
				const filtered = order.filter((e) =>
					((e.kind === "domain" || e.kind === "pivot") && (childrenOfDomain.get(d.id) ?? []).some((s) => s.id === e.key)) ||
					(e.kind === "table" && d.members.includes(e.key)),
				);
				return withMasterFirst(filtered);
			}
			// Legacy: sub-dominios primero, luego tablas (master primero).
			const subs = (childrenOfDomain.get(d.id) ?? []).map((s) => ({ kind: (s.type === "pivot" ? "pivot" : "domain") as "domain" | "pivot", key: s.id }));
			const masterId = d.masterTable || "";
			const tables = [
				...(masterId && d.members.includes(masterId) ? [{ kind: "table" as const, key: masterId }] : []),
				...d.members.filter((m) => m !== masterId).map((m) => ({ kind: "table" as const, key: m })),
			];
			return withMasterFirst([...subs, ...tables]);
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

		const pushDomainTree = (d: DomainDef, parentRowId: string, depth: number, isMasterOfParent: boolean = false): void => {
			counters[depth] = (counters[depth] ?? 0) + 1;
			const myRowId = parentRowId ? `${parentRowId}.${counters[depth]}` : String(counters[depth]);
			const dType: "domain" | "pivot" | "pivot-domain" = d.type === "pivot" ? "pivot" : d.type === "pivot-domain" ? "pivot-domain" : "domain";
			const nodeKind: "domain" | "pivot" = (dType === "pivot" || dType === "pivot-domain") ? "pivot" : "domain";
			// N:N (`pivot`) requiere exactamente master + 1 slave; menos que eso → marcado de error.
			let pivotMissingSlave = false;
			if (dType === "pivot") {
				const childCount = (d.childrenOrder ?? []).length || d.members.length;
				pivotMissingSlave = childCount < 2;
			}
			rows.push(new TTableNodeUX({
				flatPath: myRowId,
				ireference: parentRowId,
				kind: nodeKind,
				rowName: d.name,
				domainId: d.id,
				isMaster: isMasterOfParent,
				domainType: dType,
				cardinality: d.cardinality ?? "",
				pivotMissingSlave,
				prefix: dType === "domain" ? (d.prefix ?? "") : "",
			}, this.obj));
			counters[depth + 1] = 0;
			for (const child of orderedChildrenOf(d)) {
				if (child.kind === "domain" || child.kind === "pivot") {
					const subDef = this._domains[child.key];
					if (subDef) pushDomainTree(subDef, myRowId, depth + 1, child.key === d.masterTable);
				} else {
					const found = tableById.get(child.key);
					if (!found) continue;
					counters[depth + 1] += 1;
					const isM = child.key === d.masterTable;
					// La cardinalidad del esclavo se lee del mapa explícito `slaveCardinalities` del dominio
					// padre. Para `pivot`/`pivot-domain` se completa con la cardinalidad del pivote.
					let slaveCard: "1:1" | "1:N" | "N:N" | "" = "";
					if (!isM) {
						const explicit = d.slaveCardinalities?.[child.key];
						if (explicit) slaveCard = explicit;
						else if (dType === "pivot" || dType === "pivot-domain") slaveCard = (d.cardinality ?? "") as typeof slaveCard;
					}
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
						slaveCardinality: slaveCard,
					}, this.obj));
				}
			}
			pushEmptyChildPrefixes(`${nodeKind}:${d.id}`, myRowId, depth + 1);
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
			_tablesScope: { table: ParsedTable; index: number }[],
			childDomainsScope: DomainDef[],
		): void => {
			counters[depth] = (counters[depth] ?? 0) + 1;
			const myRowId = parentRowId ? `${parentRowId}.${counters[depth]}` : String(counters[depth]);
			rows.push(new TTableNodeUX({
				flatPath: myRowId,
				ireference: parentRowId,
				kind: "prefix",
				rowName: prefix,
				prefix,
			}, this.obj));
			const fullChain = chainPrefix + prefix;
			// Tablas que pertenecen EXACTAMENTE a este nivel: las que declaran
			// `effectivePrefix === fullChain` en el JSON. No se infiere por
			// nombre (`startsWith`) — eso robaba hijos a otros agrupadores.
			const directTables: { table: ParsedTable; index: number }[] = [];
			for (let i = 0; i < this._tables.length; i += 1) {
				const t = this._tables[i];
				if (claimedIds.has(t.id)) continue;
				if (rootTableIds.has(t.id)) continue;
				if ((t.effectivePrefix ?? "") !== fullChain) continue;
				directTables.push({ table: t, index: i });
			}
			// Subprefijos registrados bajo este prefijo. Pueden estar vacíos o tener tablas/dominios.
			const childPrefixNames = (this._emptyPrefixes.get(`prefix:${prefix}`) ?? []).slice();
			// Dominios y orden directo bajo este prefijo (sólo aplica al primer nivel
			// del prefijo, no a subprefijos; mantiene compatibilidad con el modelo previo).
			const childDomains = childDomainsScope;
			const stored = this._prefixOrders[prefix];
			const tableIdToItem = new Map(directTables.map((it) => [it.table.id, it]));
			const domainIdToDef = new Map(childDomains.map((d) => [d.id, d]));
			const orderRefs: DomainChildRef[] = [];
			const seenT = new Set<string>();
			const seenD = new Set<string>();
			if (stored && stored.length) {
				for (const e of stored) {
					if (e.kind === "table" && tableIdToItem.has(e.key) && !seenT.has(e.key)) {
						orderRefs.push(e); seenT.add(e.key);
					} else if ((e.kind === "domain" || e.kind === "pivot") && domainIdToDef.has(e.key) && !seenD.has(e.key)) {
						orderRefs.push(e); seenD.add(e.key);
					}
				}
			}
			for (const d of childDomains) if (!seenD.has(d.id)) { orderRefs.push({ kind: (d.type === "pivot" ? "pivot" : "domain"), key: d.id }); seenD.add(d.id); }
			for (const it of directTables) if (!seenT.has(it.table.id)) { orderRefs.push({ kind: "table", key: it.table.id }); seenT.add(it.table.id); }
			counters[depth + 1] = 0;
			for (const ref of orderRefs) {
				if (ref.kind === "domain" || ref.kind === "pivot") {
					const sub = domainIdToDef.get(ref.key);
					if (sub) pushDomainTree(sub, myRowId, depth + 1);
					continue;
				}
				const it = tableIdToItem.get(ref.key);
				if (!it) continue;
				counters[depth + 1] += 1;
				// `rowName` es el bare (nombre sin la cadena ancestra). El warden
				// del prefijo decora visualmente prependiendo su prefijo a este bare.
				const effFull = effectiveTableName(it.table);
				const bare = effFull.toUpperCase().startsWith(fullChain.toUpperCase()) ? effFull.slice(fullChain.length) : it.table.name;
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
				if (!cp) continue;
				pushPrefixSubtree(cp, fullChain, myRowId, depth + 1, [], []);
			}
		};

		for (const entry of validTop) {
			if (entry.kind === "domain" || entry.kind === "pivot") {
				const d = this._domains[entry.key];
				if (d) pushDomainTree(d, "", 0);
				continue;
			}
			if (entry.kind === "table") {
				const found = tableById.get(entry.key);
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
			if (!entry.key) continue;
			const prefix = entry.key;
			const items = grouped.get(prefix) ?? [];
			const childDomains = domainsByPrefix.get(prefix) ?? [];
			pushPrefixSubtree(prefix, "", "", 0, items, childDomains);
		}

		// Tablas bare (sin prefijo y no listadas en `_topOrder`) al final del root.
		// No se sintetiza un agrupador "(sin prefijo)": cuelgan directamente del root.
		const seenRootTables = new Set<string>();
		for (const e of this._topOrder) if (e.kind === "table") seenRootTables.add(e.key);
		for (const it of bareTables) {
			const key = it.table.id;
			if (seenRootTables.has(key)) continue;
			counters[0] = (counters[0] ?? 0) + 1;
			rows.push(new TTableNodeUX({
				flatPath: String(counters[0]),
				ireference: "",
				kind: "table",
				rowName: it.table.name,
				tableKey: tableKey(it.table),
				tableIndex: it.index,
				colCount: it.table.columns.length,
				prefix: effPrefixOf(it.table),
			}, this.obj));
		}

		// Defensa: dominios "huérfanos" (sin parentId/parentPrefix válidos y NO en
		// topOrder) deben renderizarse al final del root. Sin esto, un estado
		// divergente puede dejar un dominio invisible y arrastrar sus tablas miembro.
		const renderedDomainIds = new Set<string>();
		for (const r of rows) if ((r.kind === "domain" || r.kind === "pivot") && r.domainId) renderedDomainIds.add(r.domainId);
		for (const d of allDomains) {
			if (renderedDomainIds.has(d.id)) continue;
			counters[0] = (counters[0] ?? 0) + 1;
			pushDomainTree(d, "", 0);
		}

		this.obj.rows = rows;
		this.renumberRowsCanonically();
		this.onrefresh();
		this.syncAllRowAdapters();
	}

	protected commitFlatList(flat: TTableNodeUX[]): void {
		this.obj.rows = flat.map((n) => { n.stack = this.obj; n.refreshUX(); return n; });
		this.renumberRowsCanonically();
		this.recomputeDomainsFromTree();
		this.emitChange();
	}

	/**
	 * Renumeración canónica y ÚNICA de `flatPath`/`ireference` para TODOS los
	 * agrupadores. Reglas generales:
	 * - El orden actual de `this.obj.rows` se respeta como base; los huérfanos
	 *   (ireference inválida) se reubican en la raíz al final.
	 * - Cada padre puede declarar `sortChildren` para reordenar sus hijos
	 *   directos. Es la ÚNICA personalización admitida por agrupador.
	 * - `flatPath` se asigna posicionalmente: "1", "2", "1.1", "1.2.3", etc.
	 * - `ireference` se sincroniza al nuevo `flatPath` del padre.
	 * - Mapea ids antiguos→nuevos y refresca `_expandedNodes`/selección.
	 */
	private renumberRowsCanonically(): void {
		const rows = this.obj.rows;
		if (!rows.length) return;
		const oldById = new Map<string, TTableNodeUX>();
		for (const r of rows) {
			const id = String(r.flatPath || "").trim();
			if (id) oldById.set(id, r);
		}
		const childrenByParent = new Map<string, TTableNodeUX[]>();
		const ensure = (k: string): TTableNodeUX[] => {
			let arr = childrenByParent.get(k);
			if (!arr) { arr = []; childrenByParent.set(k, arr); }
			return arr;
		};
		for (const r of rows) {
			const ref = String(r.ireference || "").trim();
			const parentKey = ref && oldById.has(ref) ? ref : "";
			ensure(parentKey).push(r);
		}
		const idMap = new Map<string, string>();
		const result: TTableNodeUX[] = [];
		const visit = (parentOldId: string, parentNewId: string, parent: TTableNodeUX | undefined): void => {
			const kids = childrenByParent.get(parentOldId) ?? [];
			let ordered: TTableNodeUX[] = kids;
			if (parent) {
				const fn = (parent as unknown as { sortChildren?: (c: TTableNodeUX[]) => TTableNodeUX[] }).sortChildren;
				if (typeof fn === "function") {
					const next = fn.call(parent, kids.slice());
					if (Array.isArray(next) && next.length === kids.length) ordered = next;
				}
			}
			ordered.forEach((child, idx) => {
				const newId = parentNewId ? `${parentNewId}.${idx + 1}` : String(idx + 1);
				const oldId = String(child.flatPath || "");
				if (oldId && oldId !== newId) idMap.set(oldId, newId);
				child.flatPath = newId;
				child.ireference = parentNewId;
				result.push(child);
				visit(oldId, newId, child);
			});
		};
		visit("", "", undefined);
		this.obj.rows = result;
		this.remapExpandedByIdMap(idMap);
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
		const enclosingContainerOf = (rowId: string): { kind: "domain" | "pivot" | "prefix"; key: string } | null => {
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
				if (parent.kind === "pivot") return { kind: "pivot", key: parent.domainId ?? "" };
				if (parent.kind === "prefix") return { kind: "prefix", key: parent.prefix ?? "" };
				cur = parent;
			}
			return null;
		};

		// Conjunto de tablas VISIBLES en el árbol actual (por id estable).
		// Los `members`/orders existentes que NO están visibles se conservan tal cual:
		// recompute es conservador para que ningún agrupador pierda hijos que no
		// alcanzaron a renderizar (otro fragmento, lazy, etc.). Solo las tablas
		// visibles se reasignan según el árbol.
		const visibleIds = new Set<string>();
		for (const n of flat) {
			if (n.kind !== "table") continue;
			if (n.tableKey) visibleIds.add(n.tableKey);
		}

		// Conjunto de dominios VISIBLES en el árbol actual.
		const visibleDomainIds = new Set<string>();
		for (const n of flat) if ((n.kind === "domain" || n.kind === "pivot") && n.domainId) visibleDomainIds.add(n.domainId);

		// Reset parent links de todos los dominios; conserva members invisibles.
		// Los entries `kind:"domain"` cuyo target es VISIBLE se descartan también: el
		// walk los re-emitirá según la posición actual; mantenerlos generaba duplicados
		// que `buildTree` deduplicaba silenciosamente, simulando "desapariciones" tras
		// movimientos repetidos.
		const next: DomainsMap = {};
		for (const id of Object.keys(this._domains)) {
			const orig = this._domains[id];
			const keptMembers = orig.members.filter((m) => !visibleIds.has(m));
			const keptOrder = (orig.childrenOrder ?? []).filter(
				(e) => (e.kind === "domain" && !visibleDomainIds.has(e.key)) ||
				       (e.kind === "table" && !visibleIds.has(e.key)),
			);
			next[id] = { ...orig, members: keptMembers, parentId: undefined, parentPrefix: undefined, childrenOrder: keptOrder };
		}

		const topOrder: TopLevelEntry[] = [];
		const seenTop = new Set<string>();
		const seenPrefixForTop = new Set<string>();
		const prefixOrders: PrefixOrderMap = {};
		// Pre-siembra: conserva entries `kind:"table"` invisibles del estado anterior
		// (otro fragmento, lazy load, etc.). Los visibles serán re-añadidos por el
		// walk siguiente. Mantiene también prefijos/dominios previos en topOrder
		// para ser filtrados/renumerados al final.
		for (const e of this._topOrder) {
			if (e.kind === "table" && !visibleIds.has(e.key)) {
				const tk = `table:${e.key}`;
				if (!seenTop.has(tk)) { topOrder.push(e); seenTop.add(tk); }
			}
		}
		for (const [pk, arr] of Object.entries(this._prefixOrders)) {
			const kept = arr.filter((e) => e.kind === "table" && !visibleIds.has(e.key));
			if (kept.length) prefixOrders[pk] = kept;
		}
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
			if (n.kind === "domain" || n.kind === "pivot") {
				const did = n.domainId;
				if (!did || !next[did]) continue;
				const enc = enclosingContainerOf(n.flatPath);
				const entryKind: "domain" | "pivot" = n.kind;
				if ((enc?.kind === "domain" || enc?.kind === "pivot") && enc.key && next[enc.key]) {
					next[did].parentId = enc.key;
					next[enc.key].childrenOrder!.push({ kind: entryKind, key: did });
				} else if (enc?.kind === "prefix") {
					next[did].parentPrefix = enc.key;
					ensurePrefix(enc.key).push({ kind: entryKind, key: did });
				} else if (!refStr) {
					const tk = `${entryKind}:${did}`;
					if (!seenTop.has(tk)) { topOrder.push({ kind: entryKind, key: did }); seenTop.add(tk); }
				}
				continue;
			}
			if (n.kind === "table") {
				const enc = enclosingContainerOf(n.flatPath);
				// Las claves persistidas usan el id ESTABLE de la tabla.
				const sourceTable = n.tableIndex >= 0 ? this._tables[n.tableIndex] : undefined;
				const tid = sourceTable?.id ?? n.tableKey ?? "";
				if (!tid) continue;
				if ((enc?.kind === "domain" || enc?.kind === "pivot") && enc.key && next[enc.key]) {
					if (!next[enc.key].members.includes(tid)) {
						next[enc.key].members.push(tid);
						next[enc.key].childrenOrder!.push({ kind: "table", key: tid });
					}
				} else if (enc?.kind === "prefix") {
					ensurePrefix(enc.key).push({ kind: "table", key: tid });
				} else if (!refStr) {
					const tk = `table:${tid}`;
					if (!seenTop.has(tk)) { topOrder.push({ kind: "table", key: tid }); seenTop.add(tk); }
				}
				continue;
			}
			if (n.kind === "prefix") {
				const pk = n.prefix ?? "";
				const enc = enclosingContainerOf(n.flatPath);
				if (enc?.kind === "prefix") {
					const list = ensureChildPrefixList(`prefix:${enc.key}`);
					if (!list.includes(pk)) list.push(pk);
				} else if (enc?.kind === "domain" || enc?.kind === "pivot") {
					const list = ensureChildPrefixList(`${enc.kind}:${enc.key}`);
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
		// Esto cubre también el caso "dominio vacío recibe su primer hijo": como el master previo
		// (cadena vacía) no es miembro, el primer member pasa a ser master automáticamente.
		for (const d of Object.values(next)) {
			const stillThere = d.members.includes(d.masterTable);
			if (!stillThere) d.masterTable = d.members[0] ?? "";
		}

		// Defensa: para dominios que NO aparecieron en `flat` (no se renderizaron),
		// preservar su `parentId`/`parentPrefix` previo en lugar de dejarlos en undefined.
		// Sin esto, un dominio cuyo prefijo padre no se materializó queda flotante
		// (sin parent y sin entrada en topOrder) y desaparece de la UI permanentemente.
		for (const id of Object.keys(next)) {
			if (visibleDomainIds.has(id)) continue;
			const orig = this._domains[id];
			if (!orig) continue;
			if (orig.parentId && next[orig.parentId]) next[id].parentId = orig.parentId;
			else if (orig.parentPrefix) next[id].parentPrefix = orig.parentPrefix;
		}

		// Defensa: cualquier dominio sin parent y sin entrada en topOrder lo añadimos
		// al final del topOrder root para que NUNCA quede invisible.
		for (const id of Object.keys(next)) {
			const d = next[id];
			if (d.parentId || d.parentPrefix) continue;
			const tk = `domain:${id}`;
			if (seenTop.has(tk)) continue;
			topOrder.push({ kind: "domain", key: id });
			seenTop.add(tk);
		}

		this._domains = next;
		this._topOrder = topOrder;
		this._prefixOrders = prefixOrders;
		this._emptyPrefixes = nextEmptyPrefixes;

		// Refrescar flags visuales en las filas existentes (`isMaster`, `domainId`) sin
		// reconstruir el árbol: garantiza que la corona aparezca tras drag a un dominio
		// vacío y que la tabla recién promovida muestre el ícono correcto.
		const masterByTable = new Map<string, string>(); // tableId -> domainId
		const domainByMember = new Map<string, string>();
		for (const d of Object.values(next)) {
			if (d.masterTable) masterByTable.set(d.masterTable, d.id);
			for (const m of d.members) domainByMember.set(m, d.id);
		}
		for (const n of flat) {
			if (n.kind !== "table") continue;
			const tid = n.tableKey ?? "";
			const did = domainByMember.get(tid);
			n.domainId = did ?? "";
			n.isMaster = !!did && masterByTable.get(tid) === did;
			n.refreshUX();
		}
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
		// Identidad ESTABLE para resolver la `ParsedTable` desde un row: id de tabla.
		const byKey = new Map<string, { table: ParsedTable; index: number }>();
		original.forEach((t, index) => {
			if (t.id && !byKey.has(t.id)) byKey.set(t.id, { table: t, index });
		});
		const orderedTables: ParsedTable[] = [];
		const seen = new Set<number>();
		const renames: Array<{ from: string; to: string }> = [];
		for (const n of flat) {
			if (n.kind !== "table") continue;
			let resolved: { table: ParsedTable; index: number } | undefined;
			if (n.tableKey) resolved = byKey.get(n.tableKey);
			if (!resolved && n.tableIndex >= 0 && original[n.tableIndex]) {
				resolved = { table: original[n.tableIndex], index: n.tableIndex };
			}
			if (!resolved) continue;
			const t = resolved.table;
			seen.add(resolved.index);
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
