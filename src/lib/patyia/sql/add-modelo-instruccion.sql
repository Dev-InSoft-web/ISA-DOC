-- =============================================================
-- INSTRUCCION · columna MODELO (modelo OpenAI por instrucción)
-- TK-1431662 · Selección de modelo IA por tipo de consulta
--
-- BD: AYUDASCP_IA_STAGING (vía paty_namedb en ISA-DOC/.env).
-- Sin USE: el pool /api/patyia/db/exec ya abre esa BD (igual que
-- select-all-instrucciones.sql y cleanup-instrucciones-vacias.sql).
--
-- Idempotente:
--   1) Agrega MODELO si no existe (default gpt-5-mini).
--   2) Normaliza filas vacías y lista el catálogo.
--
-- Nota: la tabla tiene columna [INSTRUCCION] (texto del prompt);
-- siempre usar corchetes [INSTRUCCION] en DDL/DML.
-- =============================================================

SET NOCOUNT ON;
SET XACT_ABORT ON;

DECLARE @err NVARCHAR(500);

IF OBJECT_ID(N'dbo.INSTRUCCION', N'U') IS NULL
BEGIN
	SET @err = N'dbo.INSTRUCCION no existe en ' + DB_NAME()
		+ N'. Configure paty_namedb=AYUDASCP_IA_STAGING en ISA-DOC/.env.';
	THROW 50001, @err, 1;
END;

IF COL_LENGTH(N'dbo.INSTRUCCION', N'MODELO') IS NULL
BEGIN
	ALTER TABLE dbo.[INSTRUCCION]
		ADD [MODELO] NVARCHAR(40) NOT NULL
			CONSTRAINT [DF_INSTRUCCION_MODELO] DEFAULT (N'gpt-5-mini');
END;

UPDATE dbo.[INSTRUCCION]
SET [MODELO] = N'gpt-5-mini'
WHERE [MODELO] IS NULL OR LTRIM(RTRIM([MODELO])) = N'';

SELECT
	[IINSTRUCCION],
	[NINSTRUCCION],
	[MODELO],
	[BACTIVO]
FROM dbo.[INSTRUCCION]
ORDER BY [IINSTRUCCION] ASC;
