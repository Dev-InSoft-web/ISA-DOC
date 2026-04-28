import type { TableManualMapping } from "./mapping.js";
import { sqlPaddedTripletPathToDotted } from "./hierarchy-indices-sql.js";

/**
 * Tabla origen (_OLD) -> tabla destino real cuando el nombre no coincide
 * al quitar el sufijo _OLD (p. ej. SEGURIDADPORCURSO vs SEGURIDADES_CURSOS).
 */
export const tableDestinationOverrides: Record<string, string> = {
	CAPAC_SEGURIDADPORCURSO_OLD: "CAPAC_SEGURIDADES_CURSOS",
};

/**
 * Reglas manuales por tabla destino.
 * - key: nombre tabla destino (sin schema)
 * - value: mapeo { destino: origen | expresion SQL con alias s }
 */
export const manualMappings: Record<string, TableManualMapping> = {
	CAPAC_CURSOS: {
		IRECURSO: "IVIDEO",
	},
	CAPAC_DRIVERS: {
		NDRIVER:
			"LTRIM(RTRIM(CASE WHEN CHARINDEX('|', s.[DRIVERSTRUCT] + '|') > 1 THEN LEFT(s.[DRIVERSTRUCT], CHARINDEX('|', s.[DRIVERSTRUCT] + '|') - 1) ELSE s.[DRIVERSTRUCT] END))",
	},
	CAPAC_PLANES_CURSOS: {
		IPLAN: sqlPaddedTripletPathToDotted("s.[IPLAN]"),
		IPLANPADRE: "CAST(NULL AS VARCHAR(255))",
		IRECURSO: "IVIDEO",
	},
	CAPAC_SEGURIDADES_CURSOS: {
		IPERMISO: "ID",
	},
	CAPAC_ATRIBUTOS_X_DRIVERS: {
		TDATRIBUTO: "0",
	},
};
