/**
 * Tipos compartidos por las clases nodales.
 *
 * Forman el "contrato JSON" del árbol persistido. Cada clase nodal sabe
 * serializarse a {@link PersistedNodeJSON} y reconstruirse desde él.
 *
 * Diferencias con el formato anterior:
 *  - Sin `ireference`: el padre se conoce por la posición estructural en el
 *    árbol cargado en memoria; persistirlo era redundante y frágil.
 *  - El `comment` "Tabla CAPAC_X" sale del runtime, no del JSON.
 *  - Las tablas de auditoría (`HISTORIAL<X>`) no se persisten: se derivan de
 *    `obj.stack === true` en la tabla maestra.
 */

export type NodeKind = "root" | "prefix" | "domain" | "pivot" | "table" | "col" | "optional";

export interface PersistedWardenRefJSON {
	idaction: string;
}

export interface PersistedNodeDocJSON {
	description?: string;
	rules?: string[];
	notes?: string[];
}

export interface PersistedEntityDocJSON {
	label?: string;
	description?: string;
	rules?: string[];
	objShape?: Record<string, string>;
}

export interface PersistedTreeDocJSON {
	description?: string;
	rules?: string[];
	entities?: Record<string, PersistedEntityDocJSON>;
}

export interface PersistedNodeJSON {
	id: string;
	kind: NodeKind;
	/** Bandera de visibilidad/procesamiento. `false` ⇒ el nodo se ignora en
	 * todos los procesamientos (snippets, SQL, validaciones derivadas).
	 * Por defecto `true`; sólo se persiste cuando es `false`. No es una
	 * eliminación: el nodo y sus hijos se conservan en el árbol. */
	active?: boolean;
	obj?: Record<string, unknown>;
	wardenAction?: PersistedWardenRefJSON;
	doc?: PersistedNodeDocJSON;
	children?: PersistedNodeJSON[];
}

/**
 * Resultado de validar un nodo. `errors` agrupa violaciones DURAS (rompen el
 * contrato y deben rechazarse), `warnings` son hints recomendados.
 */
export interface NodeValidation {
	errors: string[];
	warnings: string[];
}

export const NODE_VALID_OK: NodeValidation = Object.freeze({ errors: [], warnings: [] });
