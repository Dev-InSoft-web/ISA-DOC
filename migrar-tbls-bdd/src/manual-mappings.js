import { sqlPaddedTripletPathToDotted } from "./hierarchy-indices-sql.js";

/**
 * Tabla origen (_OLD) -> tabla destino real cuando el nombre no coincide
 * al quitar el sufijo _OLD (p. ej. SEGURIDADPORCURSO vs SEGURIDADES_CURSOS).
 */
export const tableDestinationOverrides = {
  CAPAC_SEGURIDADPORCURSO_OLD: "CAPAC_SEGURIDADES_CURSOS"
};

/**
 * Reglas manuales por tabla destino.
 * - key: nombre tabla destino (sin schema)
 * - value: mapeo { destino: origen | expresion SQL con alias s }
 *
 * Ejemplo:
 * CAPAC_CURSOS: {
 *   ID_CURSO: "ID",
 *   FECHA_INICIO: "TRY_CONVERT(date, s.FEC_INI, 103)",
 *   OBS: "'Migrado'"
 * }
 */
export const manualMappings = {
  CAPAC_CURSOS: {
    /** Regla definida: en cursos, IRECURSO es el mismo valor de IVIDEO. */
    IRECURSO: "IVIDEO",
  },
  /**
   * Regla definida para drivers:
   * - El nombre del driver se extrae desde DRIVERSTRUCT.
   * - Actualmente solo se admiten 3 drivers para cursos:
   *   TRES_COLUMNAS, SEC_VIDEOS, SEC_RELACIONADOS.
   * - Estos drivers manejan únicamente 2 niveles.
   */
  CAPAC_DRIVERS: {
    NDRIVER:
      "LTRIM(RTRIM(CASE WHEN CHARINDEX('|', s.[DRIVERSTRUCT] + '|') > 1 THEN LEFT(s.[DRIVERSTRUCT], CHARINDEX('|', s.[DRIVERSTRUCT] + '|') - 1) ELSE s.[DRIVERSTRUCT] END))",
  },
  /** Índice por niveles de 3 chars (001005) → 1.5 */
  CAPAC_PLANES_CURSOS: {
    IPLAN: sqlPaddedTripletPathToDotted("s.[IPLAN]"),
    IPLANPADRE: sqlPaddedTripletPathToDotted("s.[DATO2]"),
    IRECURSO: "IVIDEO",
  },
  /** Origen: ID en Firebird/_OLD equivale a IPERMISO en destino. */
  CAPAC_SEGURIDADES_CURSOS: {
    IPERMISO: "ID"
  },
  /** Tipo de atributo (`TTDAtributo`). Origen sin columna: fijar 0 (none). Si existe en _OLD, cambiar a p. ej. `TRY_CAST(s.TDATRIBUTO AS TINYINT)`. */
  CAPAC_ATRIBUTOS_X_DRIVERS: {
    TDATRIBUTO: "0"
  }
};

