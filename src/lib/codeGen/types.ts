// Tipos para el generador de objetos / controladores ISA-DOC.
// La configuración se persiste en el servidor (api/codegen/state).

export type FieldType =
	| "string"
	| "number"
	| "bool"
	| "json"
	| "date"
	| "enum";

export interface FieldDef {
	name: string;             // nombre de la propiedad (ej: "icurso", "ncurso")
	column?: string;           // columna SQL si difiere (UPPER por defecto)
	type: FieldType;
	enumName?: string;         // nombre del enum cuando type=enum (ej: "TTDVisualizacion")
	pk?: boolean;
	fk?: string;               // recurso destino para FK (alias del recurso, no clase)
	caption?: string;          // caption para grid UI
	visible?: boolean;
	required?: boolean;
	defaultValue?: string;
}

export type RelationKind = "1-1" | "1-N";

export interface VersusPair {
	sub: string;               // columna del sub (recurso destino)
	parent: string;            // columna del parent; si es igual a `sub` se emite simplificado
}

export type EqualValueType = "bool" | "number" | "string";

export interface EqualPair {
	col: string;               // columna del SUB (limitación actual del runtime)
	value: string;             // valor literal
	type: EqualValueType;
}

export interface RelationDef {
	alias: string;
	kind: RelationKind;
	target: string;
	versus: VersusPair[];
	equals: EqualPair[];
	insertEffect?: "syncDetails" | "ignore";
	customWhere?: string;      // cuerpo de arrow fn (sub, parent) => <expr>
}

export interface CustomHookDef {
	name: string;              // ej: "Get_Recurso_PlanCurso"
	signature: string;          // ej: "(curso: TCurso): Promise<TCurso>"
	clientPath?: string;        // ej: "/api/curso/recursoplan/{icurso}"
	clientMethod?: "GET" | "POST" | "PUT" | "DELETE";
	clientFnName?: string;      // ej: "recursoPlan"
	notes?: string;
}

export type HelperKind = "get" | "fn" | "field";

export interface HelperDef {
	name: string;              // ej: "qnivel"
	kind: HelperKind;
	returnType?: string;       // ej: "number"
	body?: string;             // cuerpo (sin llaves); requerido para get/fn
	params?: string;           // solo si kind="fn", ej: "(x: number)"
	type?: FieldType;          // solo si kind="field"; define get/set tipados
}

export interface ResourceConfig {
	id: string;                // alias del recurso (ej: "Curso", "PlanDeEstudio")
	className: string;          // ej: "TCurso"
	tableName: string;          // ej: "CAPAC_CURSOS"
	tableConst?: string;        // ej: "tablas.ntblCapacCursos"
	module: string;             // ej: "ContaPymeU/Capacitacion"
	singularApi: string;         // ej: "curso"
	pluralApi: string;           // ej: "cursos"
	pluralCaption?: string;      // ej: "Cursos"
	singularCaption?: string;    // ej: "Curso"
	isysRecurso?: string;        // ej: "Cursos"
	parentBaseClass?: string;    // ej: "TCapacitacionCursosServer"
	clientBaseClass?: string;    // ej: "TCapacitacionBaseClient"
	uiBaseKind?: "CRUD" | "LIST"; // tipo de mixin UI
	fields: FieldDef[];
	relations: RelationDef[];
	customHooks: CustomHookDef[];
	helpers?: HelperDef[];
	omitOps?: string[];
	exposeInFn?: boolean;
	orderBy?: string;            // cuerpo de getOrderBy(Alias) => string
	targetFiles?: Partial<Record<SnippetKind, string>>;
}

export type SnippetKind = "modelo" | "datos" | "server" | "client" | "webctrl" | "azurefn";

export const STORAGE_PREFIX = "isa-doc:codegen:";
export const STORAGE_INDEX = "isa-doc:codegen:_index";
