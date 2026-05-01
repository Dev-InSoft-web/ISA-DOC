import type { TreeViewProps } from "../../_comps/TreeView/TreeRowView.svelte";
import { TreeAdapter } from "../../_comps/TreeView/TreeRowView.svelte";
import type { ParsedTable } from "../../../lib/tableSchema";
import { TTableNodeUX } from "./TTableNodeUX.svelte";
import {
	loadDomains,
	saveDomains,
	findDomainOf,
	markAsMaster as markMasterFn,
	removeDomain as removeDomainFn,
	createEmptyDomain as createEmptyDomainFn,
	loadTopLevelOrder,
	saveTopLevelOrder,
	loadPrefixOrders,
	savePrefixOrders,
	type DomainDef,
	type DomainsMap,
	type DomainChildRef,
	type TopLevelEntry,
	type PrefixOrderMap,
} from "../../../lib/codeGen/domains.ts";

export type TablesBrowserChangeFn = (next: TablesBrowserState) => void;

export interface TablesBrowserState {
	tables: ParsedTable[];
	prefixRenames: Array<{ from: string; to: string }>;
}

export class TablesBrowserStack {
	id: string = "tables";
	rows: TTableNodeUX[] = [];
}

class CatalogoStub {
	constructor(private readonly getAdapter: () => TablesBrowserAdapter | null) {}
	private get adapter() { return this.getAdapter(); }
	Insertar = async (_o: any, item: TTableNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return !!a.addNode(item);
	};
	Actualizar = async (_o: any, item: TTableNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.updateNode(item);
	};
	Eliminar = async (item: TTableNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.removeNode(item);
	};
	ActInsertar = (o: any, item: TTableNodeUX) => this.Insertar(o, item);
	ActActualizar = (o: any, item: TTableNodeUX) => this.Actualizar(o, item);
	ActEliminar = (item: TTableNodeUX) => this.Eliminar(item);
	ActVisualizar = async (_item: TTableNodeUX) => true;
	ActModificar = async (_item: TTableNodeUX) => true;
	ActRecodificar = async (_o: TTableNodeUX, _n: TTableNodeUX) => true;
}

function detectPrefix(name: string): string {
	const m = /^([A-Z][A-Z0-9]*_)/.exec(name);
	return m ? m[1] : "";
}

function tableKey(t: ParsedTable): string {
	return `${t.fragmentId}::${t.originalName}`;
}

export class TablesBrowserAdapter extends TreeAdapter<TablesBrowserStack, TTableNodeUX> {
	public onChange: TablesBrowserChangeFn = () => undefined;
	public onTableSelect: (key: string) => void = () => undefined;
	public onDomainsChange: (domains: DomainsMap) => void = () => undefined;
	public onAddRoot: () => void = () => undefined;
	public onGenerateSql: () => void = () => undefined;
	private _tables: ParsedTable[] = [];
	private _domains: DomainsMap = {};
	private _topOrder: TopLevelEntry[] = [];
	private _prefixOrders: PrefixOrderMap = {};

	constructor(tables: ParsedTable[], onChange?: TablesBrowserChangeFn) {
		const stacker = new TablesBrowserStack();
		const stub = new CatalogoStub(() => self);
		super({
			Obj: stacker,
			itdForm: "edit",
			small: false,
			brapido: true,
			disabled: false,
			showToolbar: false,
			bdrag: true,
			CatalogoController: stub as unknown as TreeViewProps<TablesBrowserStack, TTableNodeUX>["CatalogoController"],
			TreeController: undefined as unknown as TreeAdapter<TablesBrowserStack, TTableNodeUX>,
		} as TreeViewProps<TablesBrowserStack, TTableNodeUX>);
		this.context.TreeController = this;
		const self = this;
		if (onChange) this.onChange = onChange;
		this._domains = loadDomains();
		this._topOrder = loadTopLevelOrder();
		this._prefixOrders = loadPrefixOrders();
		this.setTables(tables);
	}

	get stack(): TablesBrowserStack { return this.obj; }
	get stackList(): any[] { return this.obj.rows as unknown as any[]; }
	set stackList(value: any[]) { this.obj.rows = value as unknown as TTableNodeUX[]; }

	get istack(): string { return this.obj.id; }
	get nistack(): string { return "id"; }
	get nodeCtor(): new (...args: any[]) => TTableNodeUX { return TTableNodeUX; }
	get nidNode(): string { return "rowId"; }
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

	override onrowclick(node: any): void {
		super.onrowclick(node);
		const obj = node.obj as TTableNodeUX;
		if (obj.kind === "table" && obj.tableKey) {
			this.onTableSelect(obj.tableKey);
		}
	}

	protected override getNodeIcon(node: any) {
		const obj = node?.obj as TTableNodeUX | undefined;
		if (obj?.kind === "domain") {
			return { icon: "mdi:cube-outline", color: "warning" as const };
		}
		if (obj?.kind === "table") {
			if (obj.isMaster) return { icon: "mdi:crown", color: "warning" as const };
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
			{
				icon: "mdi:plus-circle-outline",
				title: "Agregar dominio o prefijo de tablas",
				onClick: () => this.onAddRoot(),
			},
		];
	}

	protected override particularactionsrow(node: any): any[] {
		const obj = node?.obj as TTableNodeUX | undefined;
		if (!obj) return [];
		if (obj.kind === "domain") {
			return [
				{
					icon: "mdi:folder-remove-outline",
					title: "Eliminar dominio (los nodos pasan al nivel raíz)",
					color: "danger" as const,
					onClick: () => this.removeDomain(obj.domainId),
				},
			];
		}
		return [];
	}

	particularcascadeoptionsrow(node: any): any[] {
		const obj = node?.obj as TTableNodeUX | undefined;
		if (!obj) return [];
		if (obj.kind === "table") {
			const isM = !!obj.isMaster;
			const inDom = !!obj.domainId;
			return [
				{
					icon: isM ? "mdi:crown" : "mdi:crown-outline",
					label: isM
						? "Master del dominio"
						: inDom
							? "Marcar como master de este dominio"
							: "Crear dominio",
					title: isM ? "Master del dominio" : "Marcar como master",
					color: isM ? ("warning" as const) : undefined,
					onClick: () => this.markTableAsMaster(obj.rowName),
				},
			];
		}
		return [];
	}

	setTables(tables: ParsedTable[]): void {
		this._tables = tables;
		this.rebuildRows();
	}

	get domains(): DomainsMap { return this._domains; }

	setDomains(d: DomainsMap, persist: boolean = true): void {
		this._domains = d;
		if (persist) saveDomains(d);
		this.rebuildRows();
		this.onDomainsChange(d);
	}

	markTableAsMaster(tableName: string): void {
		this.setDomains(markMasterFn(this._domains, tableName));
	}

	removeDomain(domainId: string): void {
		this.setDomains(removeDomainFn(this._domains, domainId));
	}

	createDomain(name: string): void {
		this.setDomains(createEmptyDomainFn(this._domains, name));
	}

	protected override canAddChild(): boolean { return false; }

	override get groupTypes(): readonly string[] { return ["domain", "prefix"]; }
	override get actionTypes(): readonly string[] { return ["domain"]; }

	/** En el browser de tablas, el root admite dominios y prefijos. */
	override canDropAtRoot(src: TTableNodeUX): boolean {
		return src.type === "domain" || src.type === "prefix";
	}

	private rebuildRows(): void {
		const upper = (s: string) => s.toUpperCase();
		const tableByUpper = new Map<string, { table: ParsedTable; index: number }>();
		this._tables.forEach((t, index) => tableByUpper.set(upper(t.name), { table: t, index }));

		const claimedUpper = new Set<string>();
		const allDomains = Object.values(this._domains);
		allDomains.forEach((d) => d.members.forEach((m) => claimedUpper.add(upper(m))));

		// Tablas no-dominio agrupadas por prefijo
		const grouped = new Map<string, { table: ParsedTable; index: number }[]>();
		this._tables.forEach((t, index) => {
			if (claimedUpper.has(upper(t.name))) return;
			const p = detectPrefix(t.name);
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
		const knownPrefixes = Array.from(new Set([...grouped.keys(), ...domainsByPrefix.keys()]));
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
		const validTop = this._topOrder.filter((e) =>
			(e.kind === "domain" && rootDomainIds.has(e.key)) ||
			(e.kind === "prefix" && grouped.has(e.key)),
		);
		const seenTop = new Set(validTop.map((e) => `${e.kind}:${e.key}`));
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
				// Filtrar entradas obsoletas
				return order.filter((e) =>
					(e.kind === "domain" && (childrenOfDomain.get(d.id) ?? []).some((s) => s.id === e.key)) ||
					(e.kind === "table" && d.members.some((m) => upper(m) === upper(e.key))),
				);
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

		const pushDomainTree = (d: DomainDef, parentRowId: string, depth: number): void => {
			counters[depth] = (counters[depth] ?? 0) + 1;
			const myRowId = parentRowId ? `${parentRowId}.${counters[depth]}` : String(counters[depth]);
			rows.push(new TTableNodeUX({
				rowId: myRowId,
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
						rowId: `${myRowId}.${counters[depth + 1]}`,
						ireference: myRowId,
						kind: "table",
						rowName: found.table.name,
						tableKey: tableKey(found.table),
						tableIndex: found.index,
						colCount: found.table.columns.length,
						prefix: detectPrefix(found.table.name),
						domainId: d.id,
						isMaster: isM,
					}, this.obj));
				}
			}
		};

		// Recorre el orden raíz mezclado.
		counters[0] = 0;
		for (const entry of validTop) {
			if (entry.kind === "domain") {
				const d = this._domains[entry.key];
				if (d) pushDomainTree(d, "", 0);
				continue;
			}
			counters[0] = (counters[0] ?? 0) + 1;
			const prefId = String(counters[0]);
			const prefix = entry.key;
			rows.push(new TTableNodeUX({
				rowId: prefId,
				ireference: "",
				kind: "prefix",
				rowName: prefix || "(sin prefijo)",
				prefix,
			}, this.obj));
			const items = grouped.get(prefix) ?? [];
			const childDomains = domainsByPrefix.get(prefix) ?? [];
			// Construir orden de hijos del prefijo: usa _prefixOrders si está; si no, primero dominios, luego tablas.
			const stored = this._prefixOrders[prefix];
			const tableUpperToItem = new Map(items.map((it) => [upper(it.table.name), it]));
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
			for (const it of items) if (!seenT.has(upper(it.table.name))) { orderRefs.push({ kind: "table", key: it.table.name }); seenT.add(upper(it.table.name)); }
			counters[1] = 0;
			for (const ref of orderRefs) {
				if (ref.kind === "domain") {
					const sub = domainIdToDef.get(ref.key);
					if (sub) pushDomainTree(sub, prefId, 1);
					continue;
				}
				const it = tableUpperToItem.get(upper(ref.key));
				if (!it) continue;
				counters[1] += 1;
				rows.push(new TTableNodeUX({
					rowId: `${prefId}.${counters[1]}`,
					ireference: prefId,
					kind: "table",
					rowName: it.table.name,
					tableKey: tableKey(it.table),
					tableIndex: it.index,
					colCount: it.table.columns.length,
					prefix,
				}, this.obj));
			}
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
		for (const n of flat) byRowId.set(n.rowId, n);

		// Sube por ireference hasta el primer nodo agrupador (domain o prefix).
		const enclosingContainerOf = (rowId: string): { kind: "domain" | "prefix"; key: string } | null => {
			let cur = byRowId.get(rowId);
			while (cur) {
				const ref = String(cur.ireference || "").trim();
				if (!ref) return null;
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
		const ensurePrefix = (k: string): DomainChildRef[] => {
			let arr = prefixOrders[k]; if (!arr) { arr = []; prefixOrders[k] = arr; } return arr;
		};

		for (const n of flat) {
			const refStr = String(n.ireference || "").trim();
			if (n.kind === "domain") {
				const did = n.domainId;
				if (!did || !next[did]) continue;
				const enc = enclosingContainerOf(n.rowId);
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
				const enc = enclosingContainerOf(n.rowId);
				if (enc?.kind === "domain" && enc.key && next[enc.key]) {
					if (!next[enc.key].members.some((m) => m.toUpperCase() === n.rowName.toUpperCase())) {
						next[enc.key].members.push(n.rowName);
						next[enc.key].childrenOrder!.push({ kind: "table", key: n.rowName });
					}
				} else if (enc?.kind === "prefix") {
					ensurePrefix(enc.key).push({ kind: "table", key: n.rowName });
				}
				continue;
			}
			if (n.kind === "prefix" && !refStr) {
				const pk = n.prefix ?? "";
				if (!seenPrefixForTop.has(pk)) {
					seenPrefixForTop.add(pk);
					const tk = `prefix:${pk}`;
					if (!seenTop.has(tk)) { topOrder.push({ kind: "prefix", key: pk }); seenTop.add(tk); }
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
		saveDomains(next);
		saveTopLevelOrder(topOrder);
		savePrefixOrders(prefixOrders);
		this.onDomainsChange(next);
	}

	private emitChange(): void {
		// Reconstruir orden de tablas a partir del árbol; tablas dentro de dominios
		// se mantienen sin renombrar por prefijo. Las que están bajo un nodo "prefix"
		// adoptan el nuevo prefijo (rename).
		const flat = this.obj.rows;
		const original = this._tables.slice();
		const byRowId = new Map<string, TTableNodeUX>();
		for (const n of flat) byRowId.set(n.rowId, n);
		const findEnclosingPrefix = (rowId: string): string | null => {
			let cur = byRowId.get(rowId);
			while (cur) {
				const ref = String(cur.ireference || "").trim();
				if (!ref) return null;
				const parent = byRowId.get(ref);
				if (!parent) return null;
				if (parent.kind === "domain") return null;
				if (parent.kind === "prefix") return parent.prefix || "";
				cur = parent;
			}
			return null;
		};
		const orderedTables: ParsedTable[] = [];
		const seen = new Set<number>();
		const renames: Array<{ from: string; to: string }> = [];
		for (const n of flat) {
			if (n.kind !== "table") continue;
			if (n.tableIndex < 0) continue;
			const t = original[n.tableIndex];
			if (!t) continue;
			seen.add(n.tableIndex);
			const enclosingPrefix = findEnclosingPrefix(n.rowId);
			if (enclosingPrefix === null) {
				orderedTables.push(t);
				continue;
			}
			const oldPref = detectPrefix(t.name);
			if (oldPref === enclosingPrefix) {
				orderedTables.push(t);
				continue;
			}
			const baseName = t.name.slice(oldPref.length);
			const nextName = enclosingPrefix + baseName;
			renames.push({ from: t.name, to: nextName });
			orderedTables.push({ ...t, name: nextName });
		}
		original.forEach((t, i) => { if (!seen.has(i)) orderedTables.push(t); });
		this.onChange({ tables: orderedTables, prefixRenames: renames });
	}
}
