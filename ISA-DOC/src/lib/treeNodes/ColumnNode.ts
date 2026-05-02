import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";
import type { FkAction } from "./TableNode.ts";

/**
 * FK simple (una columna) declarada a nivel de columna. El emisor SQL la
 * fusiona con `TableObj.relations` al generar el `CREATE TABLE`.
 */
export interface ColumnForeignKey {
	/** Nombre del constraint (FK_<X>_<Y>). Opcional. */
	name?: string;
	/** Tabla referenciada (sin prefijo, MAYÚSCULAS). */
	refTable: string;
	/** Columna referenciada en `refTable`. */
	refColumn: string;
	/** Acción al borrar la fila padre. */
	onDelete?: FkAction;
	/** Acción al actualizar la PK padre. */
	onUpdate?: FkAction;
}

export interface ColumnObj {
	name: string;
	type: string;
	nullable: "" | "NULL" | "NOT NULL";
	defaultValue: string;
	primaryKey: boolean;
	extra: string;
	/** Subtipo opcional usado por filas de seccion en el editor visual. */
	kind?: "col" | "section" | "section_end" | "optional";
	/** FK declarada a nivel de columna (FK simple, una sola columna). */
	foreignKey?: ColumnForeignKey;
}

/**
 * Nodo "columna". Es la fila del árbol de columnas (`columns-tree`).
 */
export class ColumnNode extends BaseTreeNode<ColumnObj> {
	public get kind(): NodeKind {
		return this.obj.kind === "optional" ? "optional" : "col";
	}

	constructor(obj: Partial<ColumnObj> = {}) {
		super({
			name: obj.name ?? "",
			type: obj.type ?? "",
			nullable: (obj.nullable as ColumnObj["nullable"]) ?? "",
			defaultValue: obj.defaultValue ?? "",
			primaryKey: !!obj.primaryKey,
			extra: obj.extra ?? "",
			kind: obj.kind,
			...(obj.foreignKey ? { foreignKey: { ...obj.foreignKey } } : {}),
		} as ColumnObj);
	}

	public override acceptsChildKind(_kind: NodeKind): boolean { return false; }

	protected override normalize(): void {
		// Tipo SQL en MAYÚSCULAS por algoritmo. El `name` queda libre porque
		// hay convenciones (`iX`, `nX`, …) que mezclan camelCase intencional.
		if (this.obj.type) this.obj.type = this.obj.type.toUpperCase();
	}

	public override validate(): NodeValidation {
		const errors: string[] = [];
		const warnings: string[] = [];
		if (!this.obj.name && this.obj.kind !== "section_end") errors.push("`name` es obligatorio en una columna.");
		const isSectionLike = this.obj.kind === "section" || this.obj.kind === "section_end" || this.obj.kind === "optional";
		if (!this.obj.type && !isSectionLike) {
			errors.push("`type` es obligatorio en una columna.");
		}
		return { errors, warnings };
	}
}
