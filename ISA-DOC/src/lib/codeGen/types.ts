// Tipos para el generador de objetos / controladores ISA-DOC.
// Toda la config se persiste en localStorage por recurso.

export type FieldType =
	| "string"
	| "int"
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

export interface RelationDef {
	alias: string;             // ej: "tema", "planescurso"
	kind: RelationKind;
	target: string;            // recurso destino (alias del recurso, no clase)
	compareOn: string[];        // columnas de comparación (ej: ["ICURSO"])
	insertEffect?: "syncDetails" | "ignore";  // efecto al insertar el padre
	propagatePk?: string[];     // PKs a propagar al detalle (ej: ["icurso"])
	customWhere?: string;       // SQL WHERE custom opcional
}

export interface CustomHookDef {
	name: string;              // ej: "Get_Recurso_PlanCurso"
	signature: string;          // ej: "(curso: TCurso): Promise<TCurso>"
	clientPath?: string;        // ej: "/api/curso/recursoplan/{icurso}"
	clientMethod?: "GET" | "POST" | "PUT" | "DELETE";
	clientFnName?: string;      // ej: "recursoPlan"
	notes?: string;
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
	omitOps?: string[];          // operaciones omitidas (ej: ["Verificar", "Duplicar"])
}

export const STORAGE_PREFIX = "isa-doc:codegen:";
export const STORAGE_INDEX = "isa-doc:codegen:_index";
