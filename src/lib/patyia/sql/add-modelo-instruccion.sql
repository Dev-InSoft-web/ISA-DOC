-- =============================================================
-- INSTRUCCION · columna MODELO (modelo OpenAI por instrucción)
-- TK-1431662 · Selección de modelo IA por tipo de consulta
--
-- Idempotente: agrega MODELO si no existe (default gpt-5-mini),
-- normaliza filas vacías y lista el catálogo.
-- Compatible con /api/patyia/db/exec (sin USE / sin GO).
-- =============================================================

SET NOCOUNT ON;
SET XACT_ABORT ON;

DECLARE @db SYSNAME;
DECLARE @sql NVARCHAR(MAX);
DECLARE @err NVARCHAR(500);

IF OBJECT_ID(N'dbo.INSTRUCCION', N'U') IS NOT NULL
	SET @db = DB_NAME();
ELSE IF OBJECT_ID(N'AYUDASCP_IA_STAGING.dbo.INSTRUCCION', N'U') IS NOT NULL
	SET @db = N'AYUDASCP_IA_STAGING';
ELSE IF OBJECT_ID(N'AYUDASCP_IA.dbo.INSTRUCCION', N'U') IS NOT NULL
	SET @db = N'AYUDASCP_IA';
ELSE
BEGIN
	SET @err = N'No se encontró dbo.INSTRUCCION. Conexión: ' + DB_NAME()
		+ N'. Configure paty_* en ISA-DOC/.env.';
	THROW 50001, @err, 1;
END;

SET @sql = N'
IF COL_LENGTH(N''dbo.INSTRUCCION'', N''MODELO'') IS NULL
BEGIN
	ALTER TABLE ' + QUOTENAME(@db) + N'.[dbo].[INSTRUCCION]
		ADD [MODELO] NVARCHAR(40) NOT NULL
			CONSTRAINT [DF_INSTRUCCION_MODELO] DEFAULT (N''gpt-5-mini'');
END;';

BEGIN TRY
	EXEC sp_executesql @sql;
END TRY
BEGIN CATCH
	SET @err = ERROR_MESSAGE();
	RAISERROR(
		N'No se pudo crear la columna MODELO en %s.dbo.INSTRUCCION: %s',
		16, 1, @db, @err);
	RETURN;
END CATCH;

SET @sql = N'
	UPDATE ' + QUOTENAME(@db) + N'.[dbo].[INSTRUCCION]
	SET [MODELO] = N''gpt-5-mini''
	WHERE [MODELO] IS NULL OR LTRIM(RTRIM([MODELO])) = N'''';

	SELECT
		[IINSTRUCCION],
		[NINSTRUCCION],
		[MODELO],
		[BACTIVO]
	FROM ' + QUOTENAME(@db) + N'.[dbo].[INSTRUCCION]
	ORDER BY [IINSTRUCCION] ASC;';

EXEC sp_executesql @sql;
