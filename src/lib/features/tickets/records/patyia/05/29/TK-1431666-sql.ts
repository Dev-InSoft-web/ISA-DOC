/** Patrón MERGE Ultra (un bloque por TIPO; el despliegue repite 13 veces). */
export const SQL_MERGE_ULTRA_LOTE = `SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRAN;

MERGE INSTRUCCION AS t
USING (VALUES (
	N'<TIPO>',
	N'PROMPT_<TIPO>',
	N'<texto Ultra/PROMPT_<TIPO>.md>',
	N'Prompt especifico para tipo de consulta <TIPO>',
	N'2.0-ultra',
	1
)) AS s (iinstruccion, ninstruccion, instruccion, descripcion, version, bactivo)
ON t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET
	t.instruccion = s.instruccion,
	t.version = s.version,
	t.bactivo = s.bactivo
WHEN NOT MATCHED THEN INSERT (iinstruccion, ninstruccion, instruccion, descripcion, version, bactivo, fhini)
	VALUES (s.iinstruccion, s.ninstruccion, s.instruccion, s.descripcion, s.version, s.bactivo, SYSUTCDATETIME());

MERGE TDCONSULTAXINSTRUCCION AS t
USING (SELECT c.itdconsulta, N'<TIPO>' AS iinstruccion, 1 AS orden FROM TDCONSULTA c WHERE c.itdconsulta = N'<TIPO>') AS s
ON t.itdconsulta = s.itdconsulta AND t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET t.orden = s.orden
WHEN NOT MATCHED THEN INSERT (itdconsulta, iinstruccion, orden) VALUES (s.itdconsulta, s.iinstruccion, s.orden);

COMMIT;`;
