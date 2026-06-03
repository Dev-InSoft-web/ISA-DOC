import { ColumnNode, type ColumnObj } from "./ColumnNode.ts";
import { TableNode } from "./TableNode.ts";

/**
 * Reglas para derivar la tabla virtual `HISTORIAL<X>` desde una tabla con
 * `obj.stack === true`. Las tablas derivadas NO se persisten: viven solo en
 * el modelo materializado que se entrega al cliente.
 *
 * Forma de la tabla derivada:
 *   - PK `IHISTORIAL<X>` BIGINT
 *   - FK lógica al master: misma columna PK del master (mismo nombre y tipo)
 *   - `CAMPO` VARCHAR(255)  — nombre físico de la columna auditada
 *   - `VALOR` TEXT          — valor nuevo
 *   - Auditoría CRE únicamente (insert-only): IUSUARIOCRE, IAPPCRE, IPCRE, FHCRE
 */

export interface MasterPkInfo {
	name: string;
	type: string;
}

const HISTORIAL_AUDIT_COLS: ColumnObj[] = [
	{ name: "IUSUARIOCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "", kind: "col" },
	{ name: "IAPPCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "", kind: "col" },
	{ name: "IPCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "", kind: "col" },
	{ name: "FHCRE", type: "DATETIME2", nullable: "", defaultValue: "", primaryKey: false, extra: "", kind: "col" },
];

/**
 * Reglas de nomenclatura de la tabla virtual HISTORIAL:
 *  - Las columnas de un POJO son alfanuméricas mayúsculas SIN separadores.
 *    Por eso al derivar nombres se eliminan TODOS los caracteres no
 *    alfanuméricos del `masterRef`.
 *  - Ejemplo: master `CURSOS`           -> `HISTORIALCURSOS` / PK `IHISTORIALCURSOS`.
 *             master `PLANES_ESTUDIO`   -> `HISTORIALPLANESESTUDIO` / PK `IHISTORIALPLANESESTUDIO`.
 */
function sanitizeRef(masterRef: string): string {
	return masterRef.replace(/[^A-Z0-9]/gi, "").toUpperCase();
}

export function historialTableNameOf(masterRef: string): string {
	return `HISTORIAL${sanitizeRef(masterRef)}`;
}

export function deriveHistorialColumns(masterRef: string, masterPk: MasterPkInfo): ColumnObj[] {
	const pkName = `IHISTORIAL${sanitizeRef(masterRef)}`;
	const cols: ColumnObj[] = [
		{ name: pkName, type: "BIGINT", nullable: "", defaultValue: "", primaryKey: true, extra: "", kind: "col" },
		{ name: masterPk.name, type: masterPk.type, nullable: "", defaultValue: "", primaryKey: false, extra: "", kind: "col" },
		{ name: "CAMPO", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "", kind: "col" },
		{ name: "VALOR", type: "TEXT", nullable: "", defaultValue: "", primaryKey: false, extra: "", kind: "col" },
		...HISTORIAL_AUDIT_COLS,
	];
	return cols;
}

/** Localiza la primera PK del master para anclar la tabla virtual. */
export function masterPkOf(cols: ColumnNode[]): MasterPkInfo | null {
	for (const c of cols) {
		if (c.obj.primaryKey) return { name: c.obj.name, type: c.obj.type };
	}
	return null;
}

export function isStackMaster(t: TableNode): boolean {
	return t.hasStack;
}

/** Alias canon: rol "auto-stack" (master con miembros derivados por algoritmo). */
export function isAutoStackMaster(t: TableNode): boolean {
	return t.hasStack;
}
