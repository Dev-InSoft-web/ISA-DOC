import { BaseTreeNode } from "./BaseTreeNode.ts";
import type { NodeKind, NodeValidation } from "./types.ts";

/**
 * Acción declarativa de un constraint de FK en SQL Server.
 */
export type FkAction = "NO ACTION" | "CASCADE" | "SET NULL" | "SET DEFAULT";

/**
 * Relación FK declarada A NIVEL DE TABLA. Soporta FK compuesta
 * (varias columnas locales → varias columnas de la tabla referenciada).
 * Para FKs simples de una sola columna se suele usar `ColumnObj.foreignKey`,
 * que el emisor SQL fusiona en este array al persistir.
 */
export interface TableRelation {
	/** Nombre del constraint (FK_<X>_<Y>...). Opcional. */
	name?: string;
	/** Columnas locales (en orden). */
	columns: string[];
	/** Tabla referenciada (sin prefijo, MAYÚSCULAS). */
	refTable: string;
	/** Columnas referenciadas en `refTable` (en orden). */
	refColumns: string[];
	/** Acción al borrar la fila padre. */
	onDelete?: FkAction;
	/** Acción al actualizar la PK padre. */
	onUpdate?: FkAction;
}

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
	/**
	 * Relaciones FK declaradas a nivel de tabla. Incluye FK compuestas y
	 * cualquier FK con nombre de constraint explícito. Las FKs simples de
	 * UNA columna pueden vivir alternativamente en `ColumnObj.foreignKey`
	 * — el emisor SQL las fusiona al generar.
	 */
	relations?: TableRelation[];
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
			relations: Array.isArray(obj.relations) && obj.relations.length ? obj.relations.map((r) => ({ ...r })) : undefined,
		} as TableObj);
	}

	get tableRef(): string { return this.obj.tableRef; }
	get hasStack(): boolean { return this.obj.autoStack === true; }
	/** `true` si auto-stack activo y la inyección de historial NO está deshabilitada. */
	get historialEnabled(): boolean { return this.obj.autoStack === true && this.obj.autoStackHistorial !== false; }

	public override acceptsChildKind(_kind: NodeKind): boolean { return false; }

	protected override normalize(): void {
		// Toda nomenclatura de tabla SQL en MAYÚSCULAS por algoritmo.
		const ref = (this.obj.tableRef ?? "").toUpperCase();
		this.obj.tableRef = ref;
		this.obj.rowName = ref;
	}

	public override validate(): NodeValidation {
		const errors: string[] = [];
		const warnings: string[] = [];
		if (!this.obj.tableRef) errors.push("`tableRef` es obligatorio en un TableNode.");
		if (this.obj.tableRef !== this.obj.rowName) {
			warnings.push("`rowName` debe coincidir con `tableRef` en un TableNode.");
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
		if (Array.isArray(this.obj.relations) && this.obj.relations.length) {
			out.relations = this.obj.relations.map((r) => ({
				...(r.name ? { name: r.name } : {}),
				columns: [...r.columns],
				refTable: r.refTable,
				refColumns: [...r.refColumns],
				...(r.onDelete ? { onDelete: r.onDelete } : {}),
				...(r.onUpdate ? { onUpdate: r.onUpdate } : {}),
			}));
		}
		return out;
	}
}
