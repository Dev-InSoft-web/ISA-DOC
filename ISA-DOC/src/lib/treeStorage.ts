/**
 * Formato persistido del \u00e1rbol de tablas y de las columnas por tabla.
 *
 * Se almacena un solo `tables-tree.json` para el \u00e1rbol completo (incluyendo
 * los nodos agrupadores tipo vigilante) y un archivo por tabla en
 * `columns/{TABLENAME}.json` con su \u00e1rbol de columnas.
 *
 * V3 \u2014 cambios respecto a V2:
 *  - **Sin `ireference`**: el padre vive en la estructura del \u00e1rbol.
 *  - **Sin `comment` en `tableMeta`**: el comentario "Tabla CAPAC_X" se
 *    genera en runtime a partir del prefijo efectivo + nombre.
 *  - **Sin `fragmentId`/`fragmentName`** en `tableMeta`: eran metadatos del
 *    parser SQL legacy.
 *  - Las tablas `HISTORIAL<X>` ya no se persisten: se derivan en runtime de
 *    `obj.stack === true` en la tabla maestra.
 *
 * El cargador acepta JSON V2 (lo migra en memoria) y persiste V3.
 */

import type {
	NodeKind,
	PersistedNodeJSON,
	PersistedTreeDocJSON,
} from "./treeNodes/types.ts";

export const TREE_STORAGE_VERSION = 3 as const;

/** Re-exports para mantener compat de imports existentes. */
export type PersistedKind = NodeKind;
export type PersistedNode = PersistedNodeJSON;
export type {
	PersistedNodeDocJSON as PersistedNodeDoc,
	PersistedEntityDocJSON as PersistedEntityDoc,
	PersistedTreeDocJSON as PersistedTreeDoc,
	PersistedWardenRefJSON as PersistedWardenRef,
} from "./treeNodes/types.ts";

export interface PersistedTablesTree {
	version: number;
	kind: "tables-tree";
	doc?: PersistedTreeDocJSON;
	root: PersistedNodeJSON;
}

export interface PersistedColumnsTreeMeta {
	originalName: string;
	hasIfNotExists: boolean;
}

export interface PersistedColumnsTree {
	version: number;
	kind: "columns-tree";
	/** Nombre bare de la tabla (sin prefijo). Coincide con el filename. */
	tableRef: string;
	tableMeta: PersistedColumnsTreeMeta;
	doc?: PersistedTreeDocJSON;
	root: PersistedNodeJSON;
}
