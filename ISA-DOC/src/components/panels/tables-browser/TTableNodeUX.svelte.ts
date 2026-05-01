import { TreeNodeUX } from "../../_comps/TreeView/TreeRowView.svelte";

export type TableTreeKind = "domain" | "prefix" | "table";

export class TTableNodeBase {
	rowId: string = "";
	ireference: string = "";
	stackId: string = "tables";
	kind: TableTreeKind = "table";
	rowName: string = "";
	tableKey: string = "";
	tableIndex: number = -1;
	prefix: string = "";
	colCount: number = 0;
	/** Id del dominio al que pertenece este nodo (si aplica). */
	domainId: string = "";
	/** Si la tabla es master de su dominio. */
	isMaster: boolean = false;
}

export class TTableNodeUX extends TreeNodeUX(TTableNodeBase)<TTableNodeUX> {
	public declare stack: any;

	constructor(data?: Partial<TTableNodeBase>, stack?: any) {
		super();
		if (data) Object.assign(this, data);
		this.obj = this as unknown as TTableNodeUX;
		if (stack) this.stack = stack;
		this.refreshUX();
	}

	get id(): string { return String(this.rowId || "").replace(/^(_UP_|_M_)/, "").trim(); }
	set id(value: string) { this.rowId = value; }

	get istack(): string { return this.stackId; }
	get nistack(): string { return "stackId"; }

	public refreshUX(): void {
		const raw = String(this.rowId || "").trim();
		const dotCount = raw ? (raw.match(/\./g) || []).length : 0;
		this.depth = dotCount;
		this.isLeaf = this.kind === "table";
		this.isLast = this.kind === "table";
		this.isPenultimate = this.kind === "prefix" || this.kind === "domain";
		this.levelTitle = this.kind === "domain" ? "Dominio" : this.kind === "prefix" ? "Prefijo" : "Tabla";
		this.nextLevelTitle = "Tabla";
		this.label = this.rowName || "";
	}

	clone(): TTableNodeUX {
		const c = Object.create(TTableNodeUX.prototype) as TTableNodeUX;
		Object.assign(c, this);
		c.children = [];
		return c;
	}
}
