export interface ScriptParam {
	key: string;
	label: string;
	type: "text" | "boolean" | "select";
	options?: string[];
	default?: string;
}

export interface ScriptAction {
	id: string;
	name: string;
	description: string;
	category: string;
	severity: "info" | "warning" | "danger";
	command: string;
	args?: string[];
	params?: ScriptParam[];
}

export const SCRIPT_ACTIONS: ScriptAction[] = [
	// Análisis
	{
		id: "analyze",
		name: "Analizar tablas",
		description: "Descubre tablas CAPAC_*_OLD, busca destino y muestra plan de mapeo de columnas sin insertar datos.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/core/index.ts analyze",
		params: [
			{ key: "only", label: "Solo tabla", type: "text", default: "" },
		],
	},
	{
		id: "migrate-dry",
		name: "Migración (dry-run)",
		description: "Genera el SQL de migración sin ejecutarlo. Muestra INSERT y DELETE que se harían.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/core/index.ts migrate",
		args: ["--dry-run"],
		params: [
			{ key: "only", label: "Solo tabla", type: "text", default: "" },
		],
	},
	{
		id: "inspect-aplic",
		name: "Listar tablas APLIC",
		description: "Lista todas las tablas que contienen 'APLIC' en el esquema dbo.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/inspect/inspect-capac.ts --mode list-aplic-tables",
	},
	{
		id: "inspect-columns",
		name: "Inspeccionar columnas",
		description: "Muestra columnas y tipos de las tablas especificadas.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/inspect/inspect-capac.ts --mode columns",
		params: [
			{ key: "tables", label: "Tablas (separadas por coma)", type: "text", default: "CAPAC_PLANDECURSO_OLD,CAPAC_PLANES_CURSOS" },
		],
	},
	{
		id: "inspect-iplan",
		name: "Muestra IPLAN/IPLANPADRE",
		description: "Muestra registros de ejemplo de IPLAN en CAPAC_PLANES_CURSOS.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/inspect/inspect-capac.ts --mode sample-iplan",
		params: [
			{ key: "top", label: "Cantidad", type: "text", default: "10" },
		],
	},
	{
		id: "check-estructuras",
		name: "Verificar estructuras",
		description: "Comprueba existencia, conteo y muestra de CAPAC_ESTRUCTURAS_CURSOS.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/estructuras/manage-estructuras.ts --action check",
	},
	{
		id: "verify-iplan",
		name: "Verificar IPLAN punteado",
		description: "Valida que los valores IPLAN tengan formato jerárquico con puntos.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/inspect/inspect-capac.ts --mode sample-iplan",
	},
	{
		id: "verify-legacy-900",
		name: "Verificar limpieza legacy 900",
		description: "Confirma que los registros legacy con ID >= 900 fueron eliminados.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/verify/verify-legacy-900-cleanup.ts",
	},
	{
		id: "verify-comments",
		name: "Verificar comentarios de tablas",
		description: "Muestra extended properties (comentarios) de las tablas CAPAC.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/verify/verify-table-comments.ts",
	},
	{
		id: "debug-iplan",
		name: "Debug IPLAN",
		description: "Sondeo de conversiones y longitudes de IPLAN para diagnóstico.",
		category: "Análisis",
		severity: "info",
		command: "npx tsx src/lib/migration/inspect/debug-iplan.ts",
	},
	{
		id: "diagnose-timeout",
		name: "Diagnóstico cursos timeout",
		description: "Consulta BD y endpoint API para diagnosticar timeouts en cursos.",
		category: "Análisis",
		severity: "warning",
		command: "npx tsx src/lib/migration/inspect/diagnose-cursos-timeout.ts",
	},

	// Migración
	{
		id: "migrate",
		name: "Migrar datos",
		description: "Ejecuta la migración real INSERT de tablas _OLD a destino. Usa transacción con rollback en caso de error.",
		category: "Migración",
		severity: "warning",
		command: "npx tsx src/lib/migration/core/index.ts migrate",
		params: [
			{ key: "only", label: "Solo tabla", type: "text", default: "" },
			{ key: "truncate", label: "Truncar destino antes", type: "boolean", default: "false" },
		],
	},
	{
		id: "ddl-capac",
		name: "Aplicar DDL CAPAC",
		description: "Ejecuta alter-capac-ddl-2026.sql con cambios de esquema incrementales.",
		category: "Migración",
		severity: "warning",
		command: "npx tsx src/lib/migration/ddl/apply-capac-ddl.ts",
	},
	{
		id: "ddl-natributo",
		name: "Actualizar NATRIBUTO etiquetas",
		description: "Actualiza NATRIBUTO de kebab/mayúsculas a etiquetas legibles UI.",
		category: "Migración",
		severity: "warning",
		command: "npx tsx src/lib/migration/ddl/apply-natributo-etiquetas.ts",
	},

	// Drivers
	{
		id: "upsert-drivers",
		name: "Upsert drivers base",
		description: "Inserta o actualiza el catálogo base de drivers (TRES_COLUMNAS, SEC_VIDEOS, SEC_RELACIONADOS). Idempotente.",
		category: "Drivers",
		severity: "warning",
		command: "npx tsx src/lib/migration/drivers/upsert-capac-drivers.ts",
	},
	{
		id: "link-drivers",
		name: "Vincular drivers a cursos",
		description: "Vincula CAPAC_CURSOS.IDRIVER desde el campo DRIVERSTRUCT usando matching por nombre.",
		category: "Drivers",
		severity: "warning",
		command: "npx tsx src/lib/migration/drivers/link-drivers-cursos.ts",
	},
	{
		id: "reset-drivers",
		name: "Reset drivers",
		description: "DESTRUCTIVO: Elimina todos los drivers y los recrea desde cero.",
		category: "Drivers",
		severity: "danger",
		command: "npx tsx src/lib/migration/drivers/reset-capac-drivers.ts",
	},

	// Estructuras
	{
		id: "create-mirror",
		name: "Crear espejo estructuras",
		description: "Crea CAPAC_ESTRUCTURAS_CURSOS como copia de CAPAC_PLANES_CURSOS.",
		category: "Estructuras",
		severity: "warning",
		command: "npx tsx src/lib/migration/estructuras/manage-estructuras.ts --action create-mirror",
	},
	{
		id: "reseed-2levels",
		name: "Reseed 2 niveles",
		description: "Vacía CAPAC_ESTRUCTURAS_CURSOS y regenera con 2 niveles (Capítulo, Título) por curso.",
		category: "Estructuras",
		severity: "warning",
		command: "npx tsx src/lib/migration/estructuras/manage-estructuras.ts --action reseed-2levels",
	},
	{
		id: "repair-estructuras",
		name: "Reparar estructuras completo",
		description: "DROP + CREATE + INSERT reconstrucción completa usando QNIVELES del driver. Transaccional.",
		category: "Estructuras",
		severity: "danger",
		command: "npx tsx src/lib/migration/estructuras/repair-capac-estructuras-cursos.ts",
	},
	{
		id: "drop-estructuras",
		name: "Drop estructuras",
		description: "DESTRUCTIVO: Elimina la tabla CAPAC_ESTRUCTURAS_CURSOS.",
		category: "Estructuras",
		severity: "danger",
		command: "npx tsx src/lib/migration/estructuras/manage-estructuras.ts --action drop",
	},

	// Rendimiento
	{
		id: "optimize-indices",
		name: "Crear índices de rendimiento",
		description: "Crea índices optimizados en CAPAC_PLANES_CURSOS si no existen.",
		category: "Rendimiento",
		severity: "info",
		command: "npx tsx src/lib/migration/performance/optimize-capac-planes-cursos.ts",
	},
];

export function groupByCategory(): Record<string, ScriptAction[]> {
	const groups: Record<string, ScriptAction[]> = {};
	for (const action of SCRIPT_ACTIONS) {
		if (!groups[action.category]) groups[action.category] = [];
		groups[action.category].push(action);
	}
	return groups;
}
