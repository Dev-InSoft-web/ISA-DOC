export type ResourceKind =
	| "bitacora-md"
	| "bitacora-sql"
	| "bitacora-bundle"
	| "sql-fragments"
	| "postman"
	| "generic";

export type ResourceProject = "patyia" | "clientesis";

export interface ResourceUpdateEvent {
	/** Identificador estable del recurso (p. ej. `md.2026-06-09.vision-reasoning`). */
	id: string;
	kind: ResourceKind;
	project?: ResourceProject;
	at: number;
	/** Ruta relativa o absoluta del archivo que disparó el cambio. */
	path?: string;
}
