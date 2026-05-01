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
	type DomainsMap,
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
				label: "Creación SQL",
				onClick: () => this.onGenerateSql(),
			},
			{ icon: "mdi:unfold-less-horizontal", title: "Colapsar todo", onClick: () => this.collapseAll?.() },
			{ icon: "mdi:unfold-more-horizontal", title: "Expandir todo", onClick: () => this.expandAll?.() },
			{
				icon: "mdi:plus-circle-outline",
				title: "Agregar dominio o prefijo de tablas",
				label: "Agregar",
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
							: "Crear dominio con esta tabla como master",
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

	private rebuildRows(): void {
		// Particiona tablas: las que pertenecen a un dominio vs. las que no.
		const upper = (s: string) => s.toUpperCase();
		const tableByUpper = new Map<string, { table: ParsedTable; index: number }>();
		this._tables.forEach((t, index) => tableByUpper.set(upper(t.name), { table: t, index }));

		const claimedUpper = new Set<string>();
		const domains = Object.values(this._domains);
		domains.forEach((d) => d.members.forEach((m) => claimedUpper.add(upper(m))));

		// Tablas no-dominio agrupadas por prefijo
		const grouped = new Map<string, { table: ParsedTable; index: number }[]>();
		this._tables.forEach((t, index) => {
			if (claimedUpper.has(upper(t.name))) return;
			const p = detectPrefix(t.name);
			let arr = grouped.get(p);
			if (!arr) { arr = []; grouped.set(p, arr); }
			arr.push({ table: t, index });
		});
		const prefixOrder = Array.from(grouped.keys()).sort((a, b) => {
			if (a === b) return 0;
			if (a === "") return 1;
			if (b === "") return -1;
			return a.localeCompare(b);
		});

		const rows: TTableNodeUX[] = [];
		let level1 = 0;

		// 1) Dominios primero
		domains.forEach((d) => {
			level1 += 1;
			const domId = String(level1);
			rows.push(new TTableNodeUX({
				rowId: domId,
				ireference: "",
				kind: "domain",
				rowName: d.name,
				domainId: d.id,
			}, this.obj));
			// Master primero, luego slaves
			const ordered = [
				d.masterTable,
				...d.members.filter((m) => upper(m) !== upper(d.masterTable)),
			];
			ordered.forEach((tname, ti) => {
				const found = tableByUpper.get(upper(tname));
				if (!found) return;
				const isM = upper(tname) === upper(d.masterTable);
				rows.push(new TTableNodeUX({
					rowId: `${domId}.${ti + 1}`,
					ireference: domId,
					kind: "table",
					rowName: found.table.name,
					tableKey: tableKey(found.table),
					tableIndex: found.index,
					colCount: found.table.columns.length,
					prefix: detectPrefix(found.table.name),
					domainId: d.id,
					isMaster: isM,
				}, this.obj));
			});
		});

		// 2) Prefijos (sin dominio)
		prefixOrder.forEach((prefix) => {
			level1 += 1;
			const prefId = String(level1);
			rows.push(new TTableNodeUX({
				rowId: prefId,
				ireference: "",
				kind: "prefix",
				rowName: prefix || "(sin prefijo)",
				prefix,
			}, this.obj));
			const items = grouped.get(prefix) ?? [];
			items.forEach((it, ti) => {
				rows.push(new TTableNodeUX({
					rowId: `${prefId}.${ti + 1}`,
					ireference: prefId,
					kind: "table",
					rowName: it.table.name,
					tableKey: tableKey(it.table),
					tableIndex: it.index,
					colCount: it.table.columns.length,
					prefix,
				}, this.obj));
			});
		});

		this.obj.rows = rows;
		this.onrefresh();
		this.syncAllRowAdapters();
	}

	protected commitFlatList(flat: TTableNodeUX[]): void {
		this.obj.rows = flat.map((n) => { n.stack = this.obj; n.refreshUX(); return n; });
		this.emitChange();
	}

	private emitChange(): void {
		// Reconstruir mapeo prefijo → tablas a partir del orden actual.
		// Las tablas dentro de un dominio NO se renombran por prefijo (el dominio prima).
		const flat = this.obj.rows;
		const tables = this._tables.slice();
		const renames: Array<{ from: string; to: string }> = [];
		let currentPrefix = "";
		let insideDomain = false;
		for (const n of flat) {
			if (n.kind === "domain") {
				insideDomain = true;
				continue;
			}
			if (n.kind === "prefix") {
				insideDomain = false;
				currentPrefix = n.prefix || "";
				continue;
			}
			if (n.kind !== "table") continue;
			if (n.tableIndex < 0) continue;
			const t = tables[n.tableIndex];
			if (!t) continue;
			if (insideDomain) continue;
			const oldPref = detectPrefix(t.name);
			if (oldPref === currentPrefix) continue;
			const baseName = t.name.slice(oldPref.length);
			const nextName = currentPrefix + baseName;
			renames.push({ from: t.name, to: nextName });
			tables[n.tableIndex] = { ...t, name: nextName };
		}
		this.onChange({ tables, prefixRenames: renames });
	}
}
