/**
 * Catálogo de tablas para reconstrucción "vaciar y volver a llenar" desde
 * datos exportados de los `CAPAC_*_OLD` (CSV con encabezados = columnas
 * destino).
 *
 * Cada entrada lleva:
 *  - tableName: tabla destino.
 *  - oldTableName: tabla origen (informativa).
 *  - createSql: DDL idempotente (igual a init_capacitacion.sql).
 *  - columns: [name, type] en orden — sirve para el INSERT y el TRY_CAST.
 *  - csvDefault: CSV inicial (solo encabezados; el dev pega filas).
 */

export interface RebuildColumn {
	name: string;
	type: string; // SQL Server type used in TRY_CAST
}

export interface RebuildTableConfig {
	icon: string;
	tableName: string;
	oldTableName: string;
	createSql: string;
	columns: RebuildColumn[];
	csvDefault: string;
}

const csvHeader = (cols: RebuildColumn[]): string => cols.map((c) => c.name).join(",") + "\n";

const ifNotExistsCreate = (table: string, createBody: string): string => {
	const body = createBody.replace(/;$/, "").trim();
	const indented = body.split("\n").map((l) => "    " + l).join("\n");
	return `IF OBJECT_ID('${table}', 'U') IS NULL\nBEGIN\n${indented};\nEND;`;
};

const colsCAPAC_DRIVERS: RebuildColumn[] = [
	{ name: "IDRIVER",     type: "BIGINT" },
	{ name: "IAPPCRE",     type: "VARCHAR(255)" },
	{ name: "NDRIVER",     type: "VARCHAR(255)" },
	{ name: "DESCRIPCION", type: "VARCHAR(MAX)" },
	{ name: "QNIVELES",    type: "TINYINT" },
	{ name: "IUSUARIOCRE", type: "VARCHAR(255)" },
	{ name: "IPCRE",       type: "VARCHAR(255)" },
	{ name: "FHCRE",       type: "DATETIME2" },
	{ name: "IUSUARIOULT", type: "VARCHAR(255)" },
	{ name: "IAPPULT",     type: "VARCHAR(255)" },
	{ name: "IPULT",       type: "VARCHAR(255)" },
	{ name: "FHULT",       type: "DATETIME2" },
];

const colsCAPAC_PLANES_ESTUDIO: RebuildColumn[] = [
	{ name: "IPLANESTUDIO",        type: "VARCHAR(255)" },
	{ name: "NOMBRE",              type: "VARCHAR(255)" },
	{ name: "DESCRIPCIONPLAN",     type: "VARCHAR(MAX)" },
	{ name: "TTDVISUALIZACION",    type: "VARCHAR(50)" },
	{ name: "BACTIVO",             type: "BIT" },
	{ name: "BGENERACERTIFICADOS", type: "BIT" },
	{ name: "IUSUARIOCRE",         type: "VARCHAR(255)" },
	{ name: "IAPPCRE",             type: "VARCHAR(255)" },
	{ name: "IPCRE",               type: "VARCHAR(255)" },
	{ name: "FHCRE",               type: "DATETIME2" },
	{ name: "IUSUARIOULT",         type: "VARCHAR(255)" },
	{ name: "IAPPULT",             type: "VARCHAR(255)" },
	{ name: "IPULT",               type: "VARCHAR(255)" },
	{ name: "FHULT",               type: "DATETIME2" },
];

const colsCAPAC_CURSOS: RebuildColumn[] = [
	{ name: "ICURSO",             type: "VARCHAR(255)" },
	{ name: "NCURSO",             type: "VARCHAR(255)" },
	{ name: "ITEMA",              type: "VARCHAR(255)" },
	{ name: "DESCRIPCION",        type: "VARCHAR(MAX)" },
	{ name: "IDRIVER",            type: "BIGINT" },
	{ name: "BACTIVO",            type: "BIT" },
	{ name: "BGENERACERTIFICADO", type: "BIT" },
	{ name: "IUSUARIOCRE",        type: "VARCHAR(255)" },
	{ name: "IAPPCRE",            type: "VARCHAR(255)" },
	{ name: "IPCRE",              type: "VARCHAR(255)" },
	{ name: "FHCRE",              type: "DATETIME2" },
	{ name: "IUSUARIOULT",        type: "VARCHAR(255)" },
	{ name: "IAPPULT",            type: "VARCHAR(255)" },
	{ name: "IPULT",              type: "VARCHAR(255)" },
	{ name: "FHULT",              type: "DATETIME2" },
];

const colsCAPAC_CURSOS_DE_PLANES_ESTUDIO: RebuildColumn[] = [
	{ name: "IPLANESTUDIO", type: "VARCHAR(255)" },
	{ name: "ICURSO",       type: "VARCHAR(255)" },
	{ name: "QORDEN",       type: "INT" },
	{ name: "BREQUERIDO",   type: "BIT" },
	{ name: "IUSUARIOCRE",  type: "VARCHAR(255)" },
	{ name: "IAPPCRE",      type: "VARCHAR(255)" },
	{ name: "IPCRE",        type: "VARCHAR(255)" },
	{ name: "FHCRE",        type: "DATETIME2" },
	{ name: "IUSUARIOULT",  type: "VARCHAR(255)" },
	{ name: "IAPPULT",      type: "VARCHAR(255)" },
	{ name: "IPULT",        type: "VARCHAR(255)" },
	{ name: "FHULT",        type: "DATETIME2" },
];

const colsCAPAC_CURSOS_PREREQUISITOS: RebuildColumn[] = [
	{ name: "ICURSO",          type: "VARCHAR(255)" },
	{ name: "ICURSOREQUERIDO", type: "VARCHAR(255)" },
	{ name: "IPLANESTUDIO",    type: "VARCHAR(255)" },
];

const colsCAPAC_ATRIBUTOS_X_DRIVERS: RebuildColumn[] = [
	{ name: "IDRIVER",    type: "BIGINT" },
	{ name: "IATRIBUTO",  type: "BIGINT" },
	{ name: "QNIVEL",     type: "TINYINT" },
	{ name: "NATRIBUTO",  type: "VARCHAR(255)" },
	{ name: "BREQUERIDO", type: "BIT" },
	{ name: "JCONFIG",    type: "VARCHAR(MAX)" },
	{ name: "TDATRIBUTO", type: "TINYINT" },
];

const colsCAPAC_SEGURIDADES_CURSOS: RebuildColumn[] = [
	{ name: "ICURSO",      type: "VARCHAR(255)" },
	{ name: "IPERMISO",    type: "VARCHAR(255)" },
	{ name: "BACTIVO",     type: "BIT" },
	{ name: "IUSUARIOCRE", type: "VARCHAR(255)" },
	{ name: "IAPPCRE",     type: "VARCHAR(255)" },
	{ name: "IPCRE",       type: "VARCHAR(255)" },
	{ name: "FHCRE",       type: "DATETIME2" },
	{ name: "IUSUARIOULT", type: "VARCHAR(255)" },
	{ name: "IAPPULT",     type: "VARCHAR(255)" },
	{ name: "IPULT",       type: "VARCHAR(255)" },
	{ name: "FHULT",       type: "DATETIME2" },
];

const colsCAPAC_PLANES_CURSOS: RebuildColumn[] = [
	{ name: "IPLAN",       type: "VARCHAR(255)" },
	{ name: "ICURSO",      type: "VARCHAR(255)" },
	{ name: "TITULO",      type: "VARCHAR(255)" },
	{ name: "ITEMA",       type: "VARCHAR(25)" },
	{ name: "IRECURSO",    type: "VARCHAR(255)" },
	{ name: "BACTIVO",     type: "BIT" },
	{ name: "IUSUARIOCRE", type: "VARCHAR(255)" },
	{ name: "IAPPCRE",     type: "VARCHAR(255)" },
	{ name: "IPCRE",       type: "VARCHAR(255)" },
	{ name: "FHCRE",       type: "DATETIME2" },
	{ name: "IUSUARIOULT", type: "VARCHAR(255)" },
	{ name: "IAPPULT",     type: "VARCHAR(255)" },
	{ name: "IPULT",       type: "VARCHAR(255)" },
	{ name: "FHULT",       type: "DATETIME2" },
];

const colsCAPAC_ATRIBUTOS_PLANES: RebuildColumn[] = [
	{ name: "IPLAN",       type: "VARCHAR(255)" },
	{ name: "ICURSO",      type: "VARCHAR(255)" },
	{ name: "IATRIBUTO",   type: "BIGINT" },
	{ name: "BACTIVO",     type: "BIT" },
	{ name: "VALOR",       type: "VARCHAR(MAX)" },
	{ name: "IUSUARIOCRE", type: "VARCHAR(255)" },
	{ name: "IAPPCRE",     type: "VARCHAR(255)" },
	{ name: "IPCRE",       type: "VARCHAR(255)" },
	{ name: "FHCRE",       type: "DATETIME2" },
	{ name: "IUSUARIOULT", type: "VARCHAR(255)" },
	{ name: "IAPPULT",     type: "VARCHAR(255)" },
	{ name: "IPULT",       type: "VARCHAR(255)" },
	{ name: "FHULT",       type: "DATETIME2" },
];

const colsCAPAC_ESTRUCTURAS_CURSOS: RebuildColumn[] = [
	{ name: "ICURSO",      type: "VARCHAR(255)" },
	{ name: "QNIVEL",      type: "TINYINT" },
	{ name: "NNIVEL",      type: "VARCHAR(255)" },
	{ name: "BACTIVO",     type: "BIT" },
	{ name: "IUSUARIOCRE", type: "VARCHAR(255)" },
	{ name: "IAPPCRE",     type: "VARCHAR(255)" },
	{ name: "IPCRE",       type: "VARCHAR(255)" },
	{ name: "FHCRE",       type: "DATETIME2" },
	{ name: "IUSUARIOULT", type: "VARCHAR(255)" },
	{ name: "IAPPULT",     type: "VARCHAR(255)" },
	{ name: "IPULT",       type: "VARCHAR(255)" },
	{ name: "FHULT",       type: "DATETIME2" },
];

const create_CAPAC_DRIVERS = ifNotExistsCreate("CAPAC_DRIVERS", `CREATE TABLE CAPAC_DRIVERS (
    IDRIVER BIGINT PRIMARY KEY,
    IAPPCRE VARCHAR(255),
    NDRIVER VARCHAR(255),
    DESCRIPCION TEXT,
    QNIVELES TINYINT,
    IUSUARIOCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE()
);`);

const create_CAPAC_PLANES_ESTUDIO = ifNotExistsCreate("CAPAC_PLANES_ESTUDIO", `CREATE TABLE CAPAC_PLANES_ESTUDIO (
    IPLANESTUDIO VARCHAR(255) PRIMARY KEY,
    NOMBRE VARCHAR(255),
    DESCRIPCIONPLAN TEXT,
    TTDVISUALIZACION VARCHAR(50),
    BACTIVO BIT DEFAULT 1,
    BGENERACERTIFICADOS BIT DEFAULT 0,
    IUSUARIOCRE VARCHAR(255),
    IAPPCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE()
);`);

const create_CAPAC_CURSOS = ifNotExistsCreate("CAPAC_CURSOS", `CREATE TABLE CAPAC_CURSOS (
    ICURSO VARCHAR(255) PRIMARY KEY,
    NCURSO VARCHAR(255),
    ITEMA VARCHAR(255),
    DESCRIPCION TEXT,
    IDRIVER BIGINT,
    BACTIVO BIT DEFAULT 1,
    BGENERACERTIFICADO BIT DEFAULT 0,
    IUSUARIOCRE VARCHAR(255),
    IAPPCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE()
);`);

const create_CAPAC_CURSOS_DE_PLANES_ESTUDIO = ifNotExistsCreate("CAPAC_CURSOS_DE_PLANES_ESTUDIO", `CREATE TABLE CAPAC_CURSOS_DE_PLANES_ESTUDIO (
    IPLANESTUDIO VARCHAR(255),
    ICURSO VARCHAR(255),
    QORDEN INT,
    BREQUERIDO BIT DEFAULT 1,
    IUSUARIOCRE VARCHAR(255),
    IAPPCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (IPLANESTUDIO, ICURSO)
);`);

const create_CAPAC_CURSOS_PREREQUISITOS = ifNotExistsCreate("CAPAC_CURSOS_PREREQUISITOS", `CREATE TABLE CAPAC_CURSOS_PREREQUISITOS (
    ICURSO VARCHAR(255),
    ICURSOREQUERIDO VARCHAR(255),
    IPLANESTUDIO VARCHAR(255),
    PRIMARY KEY (ICURSO, ICURSOREQUERIDO, IPLANESTUDIO)
);`);

const create_CAPAC_ATRIBUTOS_X_DRIVERS = ifNotExistsCreate("CAPAC_ATRIBUTOS_X_DRIVERS", `CREATE TABLE CAPAC_ATRIBUTOS_X_DRIVERS (
    IDRIVER BIGINT,
    IATRIBUTO BIGINT,
    QNIVEL TINYINT,
    NATRIBUTO VARCHAR(255),
    BREQUERIDO BIT DEFAULT 0,
    JCONFIG VARCHAR(MAX),
    TDATRIBUTO TINYINT DEFAULT 0,
    PRIMARY KEY (IDRIVER, IATRIBUTO)
);`);

const create_CAPAC_SEGURIDADES_CURSOS = ifNotExistsCreate("CAPAC_SEGURIDADES_CURSOS", `CREATE TABLE CAPAC_SEGURIDADES_CURSOS (
    ICURSO VARCHAR(255),
    IPERMISO VARCHAR(255),
    BACTIVO BIT DEFAULT 1,
    IUSUARIOCRE VARCHAR(255),
    IAPPCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (ICURSO, IPERMISO)
);`);

const create_CAPAC_PLANES_CURSOS = ifNotExistsCreate("CAPAC_PLANES_CURSOS", `CREATE TABLE CAPAC_PLANES_CURSOS (
    IPLAN VARCHAR(255),
    ICURSO VARCHAR(255),
    TITULO VARCHAR(255),
    ITEMA VARCHAR(25),
    IRECURSO VARCHAR(255),
    BACTIVO BIT DEFAULT 1,
    IUSUARIOCRE VARCHAR(255),
    IAPPCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (IPLAN, ICURSO)
);`);

const create_CAPAC_ATRIBUTOS_PLANES = ifNotExistsCreate("CAPAC_ATRIBUTOS_PLANES", `CREATE TABLE CAPAC_ATRIBUTOS_PLANES (
    IPLAN VARCHAR(255),
    ICURSO VARCHAR(255),
    IATRIBUTO BIGINT,
    BACTIVO BIT DEFAULT 1,
    VALOR VARCHAR(MAX),
    IUSUARIOCRE VARCHAR(255),
    IAPPCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (IPLAN, ICURSO, IATRIBUTO)
);`);

const create_CAPAC_ESTRUCTURAS_CURSOS = ifNotExistsCreate("CAPAC_ESTRUCTURAS_CURSOS", `CREATE TABLE CAPAC_ESTRUCTURAS_CURSOS (
    ICURSO VARCHAR(255),
    QNIVEL TINYINT,
    NNIVEL VARCHAR(255),
    BACTIVO BIT DEFAULT 1,
    IUSUARIOCRE VARCHAR(255),
    IAPPCRE VARCHAR(255),
    IPCRE VARCHAR(255),
    FHCRE DATETIME2 DEFAULT GETDATE(),
    IUSUARIOULT VARCHAR(255),
    IAPPULT VARCHAR(255),
    IPULT VARCHAR(255),
    FHULT DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (ICURSO, QNIVEL)
);`);

export const REBUILD_TABLES: RebuildTableConfig[] = [
	{
		icon: "mdi:account-supervisor",
		tableName: "CAPAC_DRIVERS",
		oldTableName: "",
		createSql: create_CAPAC_DRIVERS,
		columns: colsCAPAC_DRIVERS,
		csvDefault: csvHeader(colsCAPAC_DRIVERS),
	},
	{
		icon: "mdi:notebook-multiple",
		tableName: "CAPAC_PLANES_ESTUDIO",
		oldTableName: "",
		createSql: create_CAPAC_PLANES_ESTUDIO,
		columns: colsCAPAC_PLANES_ESTUDIO,
		csvDefault: csvHeader(colsCAPAC_PLANES_ESTUDIO),
	},
	{
		icon: "mdi:school",
		tableName: "CAPAC_CURSOS",
		oldTableName: "CAPAC_CURSOS_OLD",
		createSql: create_CAPAC_CURSOS,
		columns: colsCAPAC_CURSOS,
		csvDefault: csvHeader(colsCAPAC_CURSOS),
	},
	{
		icon: "mdi:link-variant",
		tableName: "CAPAC_CURSOS_DE_PLANES_ESTUDIO",
		oldTableName: "",
		createSql: create_CAPAC_CURSOS_DE_PLANES_ESTUDIO,
		columns: colsCAPAC_CURSOS_DE_PLANES_ESTUDIO,
		csvDefault: csvHeader(colsCAPAC_CURSOS_DE_PLANES_ESTUDIO),
	},
	{
		icon: "mdi:source-branch",
		tableName: "CAPAC_CURSOS_PREREQUISITOS",
		oldTableName: "",
		createSql: create_CAPAC_CURSOS_PREREQUISITOS,
		columns: colsCAPAC_CURSOS_PREREQUISITOS,
		csvDefault: csvHeader(colsCAPAC_CURSOS_PREREQUISITOS),
	},
	{
		icon: "mdi:tune-variant",
		tableName: "CAPAC_ATRIBUTOS_X_DRIVERS",
		oldTableName: "",
		createSql: create_CAPAC_ATRIBUTOS_X_DRIVERS,
		columns: colsCAPAC_ATRIBUTOS_X_DRIVERS,
		csvDefault: csvHeader(colsCAPAC_ATRIBUTOS_X_DRIVERS),
	},
	{
		icon: "mdi:shield-lock",
		tableName: "CAPAC_SEGURIDADES_CURSOS",
		oldTableName: "CAPAC_SEGURIDADPORCURSO_OLD",
		createSql: create_CAPAC_SEGURIDADES_CURSOS,
		columns: colsCAPAC_SEGURIDADES_CURSOS,
		csvDefault: csvHeader(colsCAPAC_SEGURIDADES_CURSOS),
	},
	{
		icon: "mdi:file-tree",
		tableName: "CAPAC_PLANES_CURSOS",
		oldTableName: "CAPAC_PLANDECURSO_OLD",
		createSql: create_CAPAC_PLANES_CURSOS,
		columns: colsCAPAC_PLANES_CURSOS,
		csvDefault: csvHeader(colsCAPAC_PLANES_CURSOS),
	},
	{
		icon: "mdi:format-list-bulleted-square",
		tableName: "CAPAC_ATRIBUTOS_PLANES",
		oldTableName: "",
		createSql: create_CAPAC_ATRIBUTOS_PLANES,
		columns: colsCAPAC_ATRIBUTOS_PLANES,
		csvDefault: csvHeader(colsCAPAC_ATRIBUTOS_PLANES),
	},
	{
		icon: "mdi:graph-outline",
		tableName: "CAPAC_ESTRUCTURAS_CURSOS",
		oldTableName: "",
		createSql: create_CAPAC_ESTRUCTURAS_CURSOS,
		columns: colsCAPAC_ESTRUCTURAS_CURSOS,
		csvDefault: csvHeader(colsCAPAC_ESTRUCTURAS_CURSOS),
	},
];
