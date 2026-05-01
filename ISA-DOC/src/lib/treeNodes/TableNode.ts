import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";

export interface TableObj {
	/** Nombre bare de la tabla (sin prefijo). Idem `rowName`. */
	tableRef: string;
	rowName: string;
	/**
	 * Si `true`, esta tabla tiene auditor\u00eda y al materializar se generar\u00e1
	 * autom\u00e1ticamente una tabla virtual `HISTORIAL<X>` (no persistida).
	 */
	stack?: boolean;
}

/**
 * Hoja del \u00e1rbol que representa una tabla SQL. Su esquema vive en
 * `columns/{tableRef}.json` (separado).
 */
export class TableNode extends BaseTreeNode<TableObj> {
	public readonly kind = "table" as const;

	constructor(obj: Partial<TableObj> = {}) {
		super({
			tableRef: obj.tableRef ?? obj.rowName ?? "",
			rowName: obj.rowName ?? obj.tableRef ?? "",
			stack: obj.stack === true ? true : undefined,
		} as TableObj);
	}

	get tableRef(): string { return this.obj.tableRef; }
	get hasStack(): boolean { return this.obj.stack === true; }

	public override allowedChildKinds(): readonly NodeKind[] { return []; }

	public override validate(): NodeValidation {
		const errors: string[] = [];
		const warnings: string[] = [];
		if (!this.obj.tableRef) errors.push("`tableRef` es obligatorio en un TableNode.");
		if (this.obj.tableRef !== this.obj.rowName) {
			warnings.push("`rowName` debe coincidir con `tableRef` en un TableNode.");
		}
		if (/[a-z]/.test(this.obj.tableRef)) {
			warnings.push("Por convenci\u00f3n el nombre de tabla deber\u00eda estar en may\u00fasculas.");
		}
		return { errors, warnings };
	}

	protected override serializeObj(): Record<string, unknown> | undefined {
		const out: Record<string, unknown> = {
			tableRef: this.obj.tableRef,
			rowName: this.obj.rowName,
		};
		if (this.obj.stack === true) out.stack = true;
		return out;
	}
}
