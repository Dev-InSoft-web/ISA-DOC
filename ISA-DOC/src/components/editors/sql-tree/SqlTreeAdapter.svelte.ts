import { TObject } from "@ingenieria_insoft/ispgen";
import type { TreeViewProps } from "../../_comps/TreeView/TreeRowView.svelte";
import { TreeAdapter } from "../../_comps/TreeView/TreeRowView.svelte";
import type { ParsedTable } from "../../../lib/tableSchema";
import { TSqlNodeUX } from "./TSqlNodeUX.svelte";
import { TSqlTableUX } from "./TSqlTableUX.svelte";

export type SqlTreeChangeFn = (next: ParsedTable) => void;

class SqlCatalogoStub {
	constructor(private readonly getAdapter: () => SqlTreeAdapter | null) {}

	private get adapter(): SqlTreeAdapter | null { return this.getAdapter(); }

	Insertar = async (_o: TObject, item: TSqlNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return !!a.addNode(item);
	};
	Actualizar = async (_o: TObject, item: TSqlNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.updateNode(item);
	};
	Eliminar = async (item: TSqlNodeUX): Promise<boolean> => {
		const a = this.adapter; if (!a) return false;
		return a.removeNode(item);
	};
	ActInsertar = (o: TObject, item: TSqlNodeUX) => this.Insertar(o, item);
	ActActualizar = (o: TObject, item: TSqlNodeUX) => this.Actualizar(o, item);
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
	get stackList(): TObject[] { return this.obj.rows as unknown as TObject[]; }
	set stackList(value: TObject[]) { this.obj.rows = value as unknown as TSqlNodeUX[]; }

	get istack(): string { return this.obj.tableId; }
	get nistack(): string { return "tableId"; }
	get nodeCtor(): new (...args: any[]) => TSqlNodeUX { return TSqlNodeUX; }
	get nidNode(): string { return "rowId"; }
	get ntitleNode(): string { return "rowName"; }

	createNode(data: TObject): TSqlNodeUX {
		if (data instanceof TSqlNodeUX) {
			data.stack = this.obj;
			data.refreshUX();
			return data;
		}
		const node = new TSqlNodeUX(data as unknown as Partial<TSqlNodeUX>, this.obj);
		return node;
	}

	getlevelname(nivel?: number, _record?: TObject): string {
		return nivel === 1 ? "Sección" : "Columna";
	}

	getEditDriverAttrs(): TObject[] { return []; }
	getEditAttrsForLevel(_d: TObject[], _p: TSqlNodeUX): TObject[] { return []; }
	canEditSelectResource(_p: TSqlNodeUX, _d: TSqlNodeUX): boolean { return false; }
	getEditAtributoValor(_d: TSqlNodeUX, _i: number): string { return ""; }
	setEditAtributoValor(d: TSqlNodeUX, _i: number, _v: string): TSqlNodeUX { return d; }
	setEditRecursoSelected(d: TSqlNodeUX, _r: TObject): TSqlNodeUX { return d; }

	protected getNewNodeDefaults(referenceId: string): Partial<TSqlNodeUX> {
		const ref = this.normalizeNodeId(referenceId);
		const refNode = ref ? this.findNodeById(ref)?.obj : null;
		const isUnderSection = refNode?.kind === "section";
		const tableId = this.obj.tableId;
		if (isUnderSection) {
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
}
