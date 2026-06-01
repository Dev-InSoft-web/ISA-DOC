-- =============================================================
-- CONVERSACIONES · resincronizar SEQ_IDCONVERSACIONES
-- TK-1431662 / Interacción staging
--
-- Síntoma: POST /api/conversacion → 400999
--   "El recurso a insertar ya existe en la base de datos"
-- Causa: la secuencia quedó por debajo de MAX(ICONVERSACION)
--   (p. ej. inserts con MAX+1 desde ISA-DOC staging).
--
-- Idempotente. Ejecutar en la BD PatyIA (staging o prod).
-- Compatible con /api/patyia/db/exec (sin USE / sin GO).
-- =============================================================

SET NOCOUNT ON;

DECLARE @db SYSNAME;
DECLARE @fqn NVARCHAR(517);
DECLARE @next BIGINT;
DECLARE @sql NVARCHAR(MAX);
DECLARE @err NVARCHAR(500);

IF OBJECT_ID(N'dbo.CONVERSACIONES', N'U') IS NOT NULL
	SET @db = DB_NAME();
ELSE IF OBJECT_ID(N'AYUDASCP_IA_STAGING.dbo.CONVERSACIONES', N'U') IS NOT NULL
	SET @db = N'AYUDASCP_IA_STAGING';
ELSE IF OBJECT_ID(N'AYUDASCP_IA.dbo.CONVERSACIONES', N'U') IS NOT NULL
	SET @db = N'AYUDASCP_IA';
ELSE
BEGIN
	SET @err = N'No se encontró dbo.CONVERSACIONES. Conexión: ' + DB_NAME()
		+ N'. Configure paty_* en ISA-DOC/.env.';
	THROW 50001, @err, 1;
END;

SET @fqn = @db + N'.dbo.CONVERSACIONES';

SET @sql = N'SELECT @next = ISNULL(MAX(ICONVERSACION), 0) + 1 FROM ' + QUOTENAME(@db) + N'.[dbo].[CONVERSACIONES];';
EXEC sp_executesql @sql, N'@next BIGINT OUTPUT', @next = @next OUTPUT;

IF NOT EXISTS (
	SELECT 1 FROM sys.sequences s
	INNER JOIN sys.schemas sch ON sch.schema_id = s.schema_id
	WHERE sch.name = N'dbo' AND s.name = N'SEQ_IDCONVERSACIONES'
)
BEGIN
	SET @err = N'Secuencia dbo.SEQ_IDCONVERSACIONES no encontrada en ' + @db + N'.';
	THROW 50002, @err, 1;
END;

SET @sql = N'ALTER SEQUENCE ' + QUOTENAME(@db) + N'.[dbo].[SEQ_IDCONVERSACIONES] RESTART WITH ' + CAST(@next AS NVARCHAR(20)) + N';';
EXEC sp_executesql @sql;

SET @sql = N'
	SELECT
		s.current_value AS valor_secuencia,
		(SELECT ISNULL(MAX(ICONVERSACION), 0) FROM ' + QUOTENAME(@db) + N'.[dbo].[CONVERSACIONES]) AS max_iconversacion,
		''' + @db + N''' AS bd_tabla,
		DB_NAME() AS bd_conexion
	FROM ' + QUOTENAME(@db) + N'.sys.sequences s
	INNER JOIN ' + QUOTENAME(@db) + N'.sys.schemas sch ON sch.schema_id = s.schema_id
	WHERE sch.name = N''dbo'' AND s.name = N''SEQ_IDCONVERSACIONES'';';
EXEC sp_executesql @sql;
