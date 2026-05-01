import type { TreeViewProps } from "../../_comps/TreeView/TreeRowView.svelte";
import { TreeAdapter } from "../../_comps/TreeView/TreeRowView.svelte";
import type { ParsedTable } from "../../../lib/tableSchema";
import { TSqlNodeUX } from "./TSqlNodeUX.svelte";
import { TSqlTableUX } from "./TSqlTableUX.svelte";

export type SqlTreeChangeFn = (next: ParsedTable) => void;

class SqlCatalogoStub {
	constructor(private readonly getAdapter: () => SqlTreeAdapter | null) {}

	private get adapter(): SqlTreeAdapter | null { return this.getAdapter(); }

	Insertar = async (_o: any, item: TSqlNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return !!a.addNode(item);
	};
	Actualizar = async (_o: any, item: TSqlNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.updateNode(item);
	};
	Eliminar = async (item: TSqlNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.removeNode(item);
	};
	ActInsertar = (o: any, item: TSqlNodeUX) => this.Insertar(o, item);
	ActActualizar = (o: any, item: TSqlNodeUX) => this.Actualizar(o, item);
	ActEliminar = (item: TSqlNodeUX) => this.Eliminar(item);
	ActVisualizar = async (_item: TSqlNodeUX) => true;
	ActModificar = async (_item: TSqlNodeUX) => true;
	ActRecodificar = async (_o: TSqlNodeUX, _n: TSqlNodeUX) => true;
}

export class SqlTreeAdapter extends TreeAdapter<TSqlTableUX, TSqlNodeUX> {
	public onChange: SqlTreeChangeFn = () => undefined;

	constructor(table: ParsedTable, onChange?: SqlTreeChangeFn) {
		const stacker = new TSqlTableUX(table);
		const stub = new SqlCatalogoStub(() => self);
		super({
			Obj: stacker,
			itdForm: "edit",
			small: false,
			brapido: true,
			disabled: false,
			showToolbar: true,
			bdrag: true,
			CatalogoController: stub as unknown as TreeViewProps<TSqlTableUX, TSqlNodeUX>["CatalogoController"],
			TreeController: undefined as unknown as TreeAdapter<TSqlTableUX, TSqlNodeUX>,
		} as TreeViewProps<TSqlTableUX, TSqlNodeUX>);
		this.context.TreeController = this;
		const self = this;
		if (onChange) this.onChange = onChange;
		this.onrefresh();
	}

	get stack(): TSqlTableUX { return this.obj; }
	get stackList(): any[] { return this.obj.rows as unknown as any[]; }
	set stackList(value: any[]) { this.obj.rows = value as unknown as TSqlNodeUX[]; }

	get istack(): string { return this.obj.tableId; }
	get nistack(): string { return "tableId"; }
	get nodeCtor(): new (...args: any[]) => TSqlNodeUX { return TSqlNodeUX; }
	get nidNode(): string { return "rowId"; }
	get ntitleNode(): string { return "rowName"; }

	createNode(data: any): TSqlNodeUX {
		if (data instanceof TSqlNodeUX) {
			data.stack = this.obj;
			data.refreshUX();
			return data;
		}
		const node = new TSqlNodeUX(data as unknown as Partial<TSqlNodeUX>, this.obj);
		return node;
	}

	getlevelname(nivel?: number, _record?: any): string {
		return nivel === 1 ? "Sección" : "Columna";
	}

	protected override getNodeIcon(node: any): { icon?: string; color?: any; style?: string } | null {
		const kind = node?.obj?.kind;
		if (kind === "column") return { icon: "mdi:table-column", color: "info" };
		if (kind === "section") return { icon: "mdi:format-list-group", style: "color: #C9A227" };
		return null;
	}

	getEditDriverAttrs(): any[] { return []; }
	getEditAttrsForLevel(_d: any[], _p: TSqlNodeUX): any[] { return []; }
	canEditSelectResource(_p: TSqlNodeUX, _d: TSqlNodeUX): boolean { return false; }

	override getToolsBarActions(): any[] {
		const addDisabled = this.isViewMode || this.isReadOnly || undefined;
		const addLabel = this.getAddRootLabel();
		const addTitle = addDisabled ? `${addLabel} — No disponible en modo lectura` : addLabel;
		return [
			{
				icon: "mdi:plus-circle-outline",
				title: addTitle,
				label: addLabel,
				disabled: addDisabled,
				onClick: () => { if (!addDisabled) this.onaddroot(); },
			},
			{ icon: "mdi:unfold-less-horizontal", title: "Colapsar todo", onClick: () => this.collapseAll?.() },
			{ icon: "mdi:unfold-more-horizontal", title: "Expandir todo", onClick: () => this.expandAll?.() },
		];
	}
	getEditAtributoValor(_d: TSqlNodeUX, _i: number): string { return ""; }
	setEditAtributoValor(d: TSqlNodeUX, _i: number, _v: string): TSqlNodeUX { return d; }
	setEditRecursoSelected(d: TSqlNodeUX, _r: any): TSqlNodeUX { return d; }

	private _siblingKindHint: "section" | "column" | null = null;

	/**
	 * Override: en el árbol SQL no usamos el selector de último nivel.
	 * Cuando el padre es penúltimo (sección), añadimos directamente una columna hija.
	 */
	protected override onAddChildLastLevel(referenceId: string): void {
		const ref = this.normalizeNodeId(referenceId);
		const nodeId = this.getNextNodeId(ref);
		const newItem = {
			ireference: ref,
			...this.prepareNewNode(nodeId, ref),
			...this.getNewNodeDefaults(ref),
		};
		const uxItem = this.toNode(newItem as any);
		void this.CatalogoController?.ActInsertar?.(this.stack, uxItem);
		this.applySelection(uxItem);
		this.onrefresh();
		this.syncAllRowAdapters();
		this.emitChange();
		const item = this._item;
		item && this.showFrmModificar(item);
		!item && this.setShowFrm?.(true);
	}

	protected override async openSiblingDrawer(ref: TSqlNodeUX, pos: "above" | "below"): Promise<void> {
		this._siblingKindHint = ref.kind;
		try {
			await super.openSiblingDrawer(ref, pos);
		} finally {
			this._siblingKindHint = null;
		}
	}

	protected getNewNodeDefaults(referenceId: string): Partial<TSqlNodeUX> {
		const ref = this.normalizeNodeId(referenceId);
		const refNode = ref ? this.findNodeById(ref)?.obj : null;
		const hint = this._siblingKindHint;
		const wantColumn = hint === "column" || (hint === null && refNode?.kind === "section");
		const tableId = this.obj.tableId;
		if (wantColumn) {
			return {
				tableId,
				kind: "column",
				rowName: "NUEVA_COLUMNA",
				colType: "VARCHAR(255)",
				nullable: "",
				defaultValue: "",
				primaryKey: false,
				colExtra: "",
				ireference: ref,
			} as Partial<TSqlNodeUX>;
		}
		return {
			tableId,
			kind: "section",
			rowName: "NUEVA_SECCION",
			ireference: "",
		} as Partial<TSqlNodeUX>;
	}

	protected commitFlatList(flat: TSqlNodeUX[]): void {
		this.obj.rows = flat.map((n) => {
			n.stack = this.obj;
			n.refreshUX();
			return n;
		});
		this.emitChange();
	}

	emitChange(): void {
		const next = this.obj.exportToParsed();
		this.onChange(next);
	}

	get catalogoController(): TreeViewProps<TSqlTableUX, TSqlNodeUX>["CatalogoController"] {
		return this.context.CatalogoController;
	}

	commitInlineEdit(node: TSqlNodeUX, patch: Partial<TSqlNodeUX>): void {
		Object.assign(node, patch);
		node.refreshUX();
		this.emitChange();
		this.syncAllRowAdapters();
	}

	/** En SQL, el root admite secciones y columnas (columnas-raíz son válidas). */
	override canDropAtRoot(src: TSqlNodeUX): boolean {
		return src.type === "section" || src.type === "column";
	}

	override get groupTypes(): readonly string[] { return ["section"]; }
	override get actionTypes(): readonly string[] { return ["section"]; }
}
