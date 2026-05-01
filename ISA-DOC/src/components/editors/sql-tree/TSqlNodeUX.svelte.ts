import { TreeNodeUX } from "../../_comps/TreeView/TreeRowView.svelte";
import type { TableColumn, TableSection, TableOptional } from "../../../lib/tableSchema";

export type SqlNodeKind = "section" | "column" | "optional";

export class TSqlNodeBase {
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

	/**
	 * Solo aplica a `kind === "optional"`. Indica si la sección opcional debe
	 * mostrar sus hijos y emitirse en el SQL. Cuando es `false`, el bloque se
	 * omite del CREATE TABLE pero los datos se conservan en memoria.
	 */
	show: boolean = true;
}

export class TSqlNodeUX extends TreeNodeUX(TSqlNodeBase)<TSqlNodeUX> {
	public declare stack: any;

	constructor(data?: Partial<TSqlNodeBase>, stack?: any) {
		super();
		if (data) Object.assign(this, data);
		this.obj = this as unknown as TSqlNodeUX;
		if (stack) this.stack = stack;
		this.refreshUX();
	}

	get id(): string { return String(this.rowId || "").replace(/^(_UP_|_M_)/, "").trim(); }
	set id(value: string) { this.rowId = value; }

	/** Discriminador estable para reglas de aceptación de los agrupadores. */
	get type(): SqlNodeKind { return this.kind; }

	/** Contrato `monarchy`: preserva el orden actual (sort estable). */
	sortChildren(children: TSqlNodeUX[]): TSqlNodeUX[] {
		return children.slice();
	}

	/**
	 * Contrato `monarchy`: las columnas de la sección AUDITORIA están
	 * congeladas (no se pueden mover). También se reporta `true` para la
	 * propia sección por consistencia (no se reordena dentro de su padre).
	 */
	freeze(): boolean {
		if (this.kind === "section" && this.rowName === "AUDITORIA") return true;
		if (this.kind === "optional") return true;
		if (this.kind === "column" && this.ireference) {
			const rows = (this.stack as { rows?: TSqlNodeUX[] } | undefined)?.rows;
			if (!rows) return false;
			const parent = rows.find((r) => r.id === this.ireference);
			if (!parent) return false;
			if (parent.kind === "optional") return true;
			return parent.kind === "section" && parent.rowName === "AUDITORIA";
		}
		return false;
	}

	get istack(): string { return String(this.tableId || ""); }
	get nistack(): string { return "tableId"; }

	public refreshUX(): void {
		const raw = String(this.rowId || "").trim();
		const dotCount = raw ? (raw.match(/\./g) || []).length : 0;
		this.depth = dotCount;
		this.isLeaf = this.kind === "column";
		this.isLast = this.kind === "column";
		this.isPenultimate = this.kind === "section" || this.kind === "optional";
		this.levelTitle = this.kind === "optional"
			? "Sección opcional"
			: this.kind === "section"
				? "Sección"
				: "Columna";
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

	toOptional(): TableOptional {
		return { kind: "optional", name: this.rowName, show: !!this.show };
	}

	clone(): TSqlNodeUX {
		const c = Object.create(TSqlNodeUX.prototype) as TSqlNodeUX;
		Object.assign(c, this);
		c.children = [];
		return c;
	}

	/**
	 * Reglas del agrupador SQL.
	 * - `section`/`optional`: aceptan solo columnas (no se permite anidar secciones).
	 * - `column`: hoja. Nunca acepta hijos.
	 */
	acceptsChild(child: TSqlNodeUX): boolean {
		if (this.type === "section" || this.type === "optional") return child.type === "column";
		return false;
	}

	static fromColumn(col: TableColumn, id: string, ireference: string, tableId: string, stack?: any): TSqlNodeUX {
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

	static fromSection(sec: TableSection, id: string, tableId: string, stack?: any): TSqlNodeUX {
		const node = new TSqlNodeUX({
			rowId: id,
			ireference: "",
			tableId,
			kind: "section",
			rowName: sec.name,
		}, stack);
		if (sec.name === "AUDITORIA") node.actor = "freezer";
		return node;
	}

	static fromOptional(opt: TableOptional, id: string, tableId: string, stack?: any): TSqlNodeUX {
		const node = new TSqlNodeUX({
			rowId: id,
			ireference: "",
			tableId,
			kind: "optional",
			rowName: opt.name,
			show: !!opt.show,
		}, stack);
		// La sección opcional siempre va congelada (no se reordena ni se elimina).
		node.actor = "freezer";
		return node;
	}
}
