import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";

export interface TableObj {
	/** Nombre bare de la tabla (sin prefijo). Idem `rowName`. */
	tableRef: string;
	rowName: string;
	/**
	 * Si `true`, la tabla es master de un dominio auto-stack: el motor inyecta
	 * tablas/datos derivados por algoritmo (no editables a mano). Hoy el auto-stack
	 * inyecta la tabla virtual `HISTORIAL<X>`.
	 */
	autoStack?: boolean;
	/**
	 * Cuando `autoStack` es `true`, controla si se inyecta la tabla de historial.
	 * `undefined` o `true` = inyectar; `false` = NO inyectar. Default: `true`.
	 */
	autoStackHistorial?: boolean;
	/** @deprecated Alias legado de `autoStack` (lectura tolerante). */
	stack?: boolean;
}

/**
 * Hoja del árbol que representa una tabla SQL. Su esquema vive en
 * `columns/{tableRef}.json` (separado).
 */
export class TableNode extends BaseTreeNode<TableObj> {
	public readonly kind = "table" as const;

	constructor(obj: Partial<TableObj> = {}) {
		const auto = obj.autoStack === true || obj.stack === true ? true : undefined;
		super({
			tableRef: obj.tableRef ?? obj.rowName ?? "",
			rowName: obj.rowName ?? obj.tableRef ?? "",
			autoStack: auto,
			autoStackHistorial: obj.autoStackHistorial,
		} as TableObj);
	}

	get tableRef(): string { return this.obj.tableRef; }
	get hasStack(): boolean { return this.obj.autoStack === true; }
	/** `true` si auto-stack activo y la inyección de historial NO está deshabilitada. */
	get historialEnabled(): boolean { return this.obj.autoStack === true && this.obj.autoStackHistorial !== false; }

	public override allowedChildKinds(): readonly NodeKind[] { return []; }

	public override validate(): NodeValidation {
		const errors: string[] = [];
		const warnings: string[] = [];
		if (!this.obj.tableRef) errors.push("`tableRef` es obligatorio en un TableNode.");
		if (this.obj.tableRef !== this.obj.rowName) {
			warnings.push("`rowName` debe coincidir con `tableRef` en un TableNode.");
		}
		if (/[a-z]/.test(this.obj.tableRef)) {
			warnings.push("Por convención el nombre de tabla debería estar en mayúsculas.");
		}
		return { errors, warnings };
	}

	protected override serializeObj(): Record<string, unknown> | undefined {
		const out: Record<string, unknown> = {
			tableRef: this.obj.tableRef,
			rowName: this.obj.rowName,
		};
		if (this.obj.autoStack === true) {
			out.autoStack = true;
			if (this.obj.autoStackHistorial === false) out.autoStackHistorial = false;
		}
		return out;
	}
}
