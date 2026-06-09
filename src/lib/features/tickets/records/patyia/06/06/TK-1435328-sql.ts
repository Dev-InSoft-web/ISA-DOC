/** Bosquejo MERGE catálogo base (×13) — el lote ejecutable completo no se incrusta en el HTML del ticket. */
export const SQL_MERGE_CATALOG_TK1435328 = `SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRAN;

MERGE INSTRUCCION AS t
USING (VALUES (N'<TIPO>', N'PROMPT_<TIPO>', N'<texto catálogo>', N'Prompt · <TIPO>', N'1.0', 1)) AS s (...)
ON t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET t.instruccion = s.instruccion, t.version = s.version, t.bactivo = s.bactivo
WHEN NOT MATCHED THEN INSERT (...) VALUES (...);

MERGE TDCONSULTAXINSTRUCCION AS t
USING (SELECT c.itdconsulta, N'<TIPO>' AS iinstruccion, 1 AS orden FROM TDCONSULTA c WHERE c.itdconsulta = N'<TIPO>') AS s
ON t.itdconsulta = s.itdconsulta AND t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET t.orden = s.orden
WHEN NOT MATCHED THEN INSERT (itdconsulta, iinstruccion, orden) VALUES (...);

COMMIT;`;
