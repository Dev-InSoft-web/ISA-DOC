import { TreeNode } from "../../_comps/TreeView/_treeAdapter/_defgen/00-tree-data";
import type { TableColumn, TableSection, TableOptional } from "../../../lib/tableSchema";

export type SqlNodeKind = "section" | "column" | "optional";

/**
 * Base de datos del nodo SQL. Extiende `TreeNode` (la base genérica del
 * modelo de árbol) y añade EXCLUSIVAMENTE las props particulares del
 * dominio "sql": tipo de columna, nullability, default, primary key, etc.
 */
export abstract class TSqlNodeBase extends TreeNode<TSqlNodeUX> {
	public declare kind: SqlNodeKind;

	tableId: string = "";
	rowName: string = "";

	colType: string = "";
	nullable: "" | "NULL" | "NOT NULL" = "";
	defaultValue: string = "";
	primaryKey: boolean = false;
	colExtra: string = "";

	/**
	 * Solo aplica a `kind === "optional"`. Indica si la sección opcional está
	 * activa: cuando es `true` se procesa (se emite en el SQL, aparece en
	 * snippets y `resume()`); cuando es `false` el bloque se omite por
	 * completo (datos en memoria conservados, pero invisibles para todos los
	 * consumidores). Cada `optional` lleva su propio `active` independiente.
	 */
	active: boolean = true;

	/** Backref opcional al `stack`/contexto (table/store) — usado por `freeze()`. */
	public stack: unknown = null;

	/** Banderas UX adicionales no presentes en `TreeNode` base. */
	public isLeaf: boolean = false;
	public isLast: boolean = false;
	public isPenultimate: boolean = false;
	public nextLevelTitle: string = "";
	public label: string = "";
}

export class TSqlNodeUX extends TSqlNodeBase {
	constructor(data?: Partial<TSqlNodeBase> & { flatpath?: string; ireference?: string; kind?: SqlNodeKind }, stack?: any) {
		super();
		this.kind = "column";
		if (data) Object.assign(this, data);
		if (stack) this.stack = stack;
		this.refreshUX();
	}

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
			const parent = rows.find((r) => r.flatpath === this.ireference);
			if (!parent) return false;
			if (parent.kind === "optional") return true;
			return parent.kind === "section" && parent.rowName === "AUDITORIA";
		}
		return false;
	}

	get istack(): string { return String(this.tableId || ""); }
	get nistack(): string { return "tableId"; }

	public refreshUX(): void {
		this.depth = this.computeDepthFromPath();
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
		return { kind: "optional", name: this.rowName, active: !!this.active };
	}

	/**
	 * Reglas del agrupador SQL.
	 * - `section`/`optional`: aceptan solo columnas (no se permite anidar secciones).
	 * - `column`: hoja. Nunca acepta hijos.
	 */
	acceptsChild(child: TSqlNodeUX): boolean {
		if (this.kind === "section" || this.kind === "optional") return child.kind === "column";
		return false;
	}

	static fromColumn(col: TableColumn, id: string, ireference: string, tableId: string, stack?: any): TSqlNodeUX {
		return new TSqlNodeUX({
			flatpath: id,
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
			flatpath: id,
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
			flatpath: id,
			ireference: "",
			tableId,
			kind: "optional",
			rowName: opt.name,
			active: opt.active !== false,
		}, stack);
		// La sección opcional siempre va congelada (no se reordena ni se elimina).
		node.actor = "freezer";
		return node;
	}
}
