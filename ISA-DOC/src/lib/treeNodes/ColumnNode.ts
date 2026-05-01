import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";

export interface ColumnObj {
	name: string;
	type: string;
	nullable: "" | "NULL" | "NOT NULL";
	defaultValue: string;
	primaryKey: boolean;
	extra: string;
	/** Subtipo opcional usado por filas de seccion en el editor visual. */
	kind?: "col" | "section" | "section_end" | "optional";
	/**
	 * Solo aplica a filas con `kind === "optional"`. Indica si la sección
	 * opcional debe emitirse en el SQL. Cuando es `false`, se conserva en
	 * memoria y JSON pero el bloque se omite del CREATE TABLE.
	 */
	show?: boolean;
}

/**
 * Nodo "columna". Es la fila del \u00e1rbol de columnas (`columns-tree`).
 */
export class ColumnNode extends BaseTreeNode<ColumnObj> {
	public readonly kind = "col" as const;

	constructor(obj: Partial<ColumnObj> = {}) {
		super({
			name: obj.name ?? "",
			type: obj.type ?? "",
			nullable: (obj.nullable as ColumnObj["nullable"]) ?? "",
			defaultValue: obj.defaultValue ?? "",
			primaryKey: !!obj.primaryKey,
			extra: obj.extra ?? "",
			kind: obj.kind,
			...(obj.kind === "optional" ? { show: !!obj.show } : {}),
		} as ColumnObj);
	}

	public override allowedChildKinds(): readonly NodeKind[] { return []; }

	public override validate(): NodeValidation {
		const errors: string[] = [];
		const warnings: string[] = [];
		if (!this.obj.name && this.obj.kind !== "section_end") errors.push("`name` es obligatorio en una columna.");
		const isSectionLike = this.obj.kind === "section" || this.obj.kind === "section_end" || this.obj.kind === "optional";
		if (!this.obj.type && !isSectionLike) {
			errors.push("`type` es obligatorio en una columna.");
		}
		if (this.obj.type && this.obj.type !== this.obj.type.toUpperCase()) {
			warnings.push("Por convenci\u00f3n el tipo SQL deber\u00eda estar en may\u00fasculas.");
		}
		return { errors, warnings };
	}
}
