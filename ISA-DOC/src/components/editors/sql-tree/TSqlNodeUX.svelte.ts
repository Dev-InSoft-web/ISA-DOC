import { TObject } from "@ingenieria_insoft/ispgen";
import { TreeNodeUX } from "../../_comps/TreeView/TreeRowView.svelte";
import type { TableColumn, TableSection } from "../../../lib/tableSchema";

export type SqlNodeKind = "section" | "column";

export class TSqlNodeBase extends TObject {
	rowId: string = "";
	ireference: string = "";
	tableId: string = "";
	kind: SqlNodeKind = "column";
	rowName: string = "";

	colType: string = "";
	nullable: "" | "NULL" | "NOT NULL" = "";
	defaultValue: string = "";
	primaryKey: boolean = false;
	colExtra: string = "";

	constructor() {
		super();
	}
}

export class TSqlNodeUX extends TreeNodeUX(TSqlNodeBase)<TSqlNodeUX> {
	public declare stack: TObject;

	constructor(data?: Partial<TSqlNodeBase>, stack?: TObject) {
		super();
		if (data) Object.assign(this, data);
		this.obj = this as unknown as TSqlNodeUX;
		if (stack) this.stack = stack;
		this.refreshUX();
	}

	get id(): string { return String(this.rowId || "").replace(/^(_UP_|_M_)/, "").trim(); }
	set id(value: string) { this.rowId = value; }

	get istack(): string { return String(this.tableId || ""); }
	get nistack(): string { return "tableId"; }

	public refreshUX(): void {
		const raw = String(this.rowId || "").trim();
		const dotCount = raw ? (raw.match(/\./g) || []).length : 0;
		this.depth = dotCount;
		this.isLeaf = this.kind === "column";
		this.isLast = this.kind === "column";
		this.isPenultimate = this.kind === "section";
		this.levelTitle = this.kind === "section" ? "Sección" : "Columna";
		this.nextLevelTitle = "Columna";
		this.label = this.rowName || "";
	}

	toColumn(): TableColumn {
		return {
			kind: "col",
			name: this.rowName,
			type: this.colType,
			nullable: this.nullable,
			defaultValue: this.defaultValue,
			primaryKey: !!this.primaryKey,
			extra: this.colExtra,
		};
	}

	toSection(): TableSection {
		return { kind: "section", name: this.rowName };
	}

	static fromColumn(col: TableColumn, id: string, ireference: string, tableId: string, stack?: TObject): TSqlNodeUX {
		return new TSqlNodeUX({
			rowId: id,
			ireference,
			tableId,
			kind: "column",
			rowName: col.name,
			colType: col.type,
			nullable: col.nullable,
			defaultValue: col.defaultValue,
			primaryKey: !!col.primaryKey,
			colExtra: col.extra,
		}, stack);
	}

	static fromSection(sec: TableSection, id: string, tableId: string, stack?: TObject): TSqlNodeUX {
		return new TSqlNodeUX({
			rowId: id,
			ireference: "",
			tableId,
			kind: "section",
			rowName: sec.name,
		}, stack);
	}
}
