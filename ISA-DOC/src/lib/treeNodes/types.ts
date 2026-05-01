/**
 * Tipos compartidos por las clases nodales.
 *
 * Forman el "contrato JSON" del \u00e1rbol persistido. Cada clase nodal sabe
 * serializarse a {@link PersistedNodeJSON} y reconstruirse desde \u00e9l.
 *
 * Diferencias con el formato anterior:
 *  - Sin `ireference`: el padre se conoce por la posici\u00f3n estructural en el
 *    \u00e1rbol cargado en memoria; persistirlo era redundante y fr\u00e1gil.
 *  - El `comment` "Tabla CAPAC_X" sale del runtime, no del JSON.
 *  - Las tablas de auditor\u00eda (`HISTORIAL<X>`) no se persisten: se derivan de
 *    `obj.stack === true` en la tabla maestra.
 */

export type NodeKind = "root" | "prefix" | "domain" | "table" | "col";

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
