import { TreeNode } from "$comps/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";

export type PatyiaTreeKind = "database" | "table" | "column";

export abstract class TPatyiaNodeBase extends TreeNode<TPatyiaNodeUX> {
	public declare kind: PatyiaTreeKind;

	stackId: string = "patyia-sql";
	rowName: string = "";
	databaseName: string = "";
	tableName: string = "";
	tableRows: number | null = null;
	columnCount: number = 0;
	colDataType: string = "";
	colMaxLen: number | null = null;
	colNullable: boolean = false;
	colIsPk: boolean = false;
}

const formatColType = (n: TPatyiaNodeUX): string => {
	const lengthTypes = new Set(["varchar", "nvarchar", "char", "nchar"]);
	if (lengthTypes.has(n.colDataType) && n.colMaxLen != null) {
		return n.colMaxLen === -1 ? `${n.colDataType}(max)` : `${n.colDataType}(${n.colMaxLen})`;
	}
	return n.colDataType;
};

export class TPatyiaNodeUX extends TPatyiaNodeBase {
	constructor(data?: Partial<TPatyiaNodeBase> & { flatPath?: string; ireference?: string; kind?: PatyiaTreeKind }) {
		super();
		this.kind = "table";
		if (data) Object.assign(this, data);
		this.refreshUX();
	}

	get istack(): string { return this.stackId; }
	get nistack(): string { return "stackId"; }

	public refreshUX(): void {
		this.depth = this.computeDepthFromPath();
		this.levelTitle = this.kind === "database" ? "Base de datos" : this.kind === "table" ? "Tabla" : "Columna";
		if (this.kind === "database") this.actor = "group hermetic";
		else if (this.kind === "table") this.actor = "group hermetic";
		else this.actor = "atom";
	}

	freeze(): boolean {
		return true;
	}

	acceptsChild(child: TPatyiaNodeUX): boolean {
		if (this.kind === "database") return child.kind === "table";
		if (this.kind === "table") return child.kind === "column";
		return false;
	}

	get formattedColType(): string {
		return formatColType(this as unknown as TPatyiaNodeUX);
	}
}
