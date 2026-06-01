-- =============================================================
-- INSTRUCCION · columna MODELO (modelo OpenAI por instrucción)
-- TK-1431662
--
-- Ejecutar en SQL Server Management Studio 21 (F5).
-- BD: AYUDASCP_IA_STAGING  (cambie USE si aplica prod)
--
-- Idempotente:
--   1) GRANT ALTER a SERVER-AYUDASCP-IA (SqlExec bitácora)
--   2) ALTER TABLE ADD MODELO (default gpt-5-mini)
--   3) Normaliza filas vacías y lista catálogo
-- =============================================================

USE [AYUDASCP_IA_STAGING];
GO

SET NOCOUNT ON;
SET XACT_ABORT ON;
GO

IF OBJECT_ID(N'dbo.INSTRUCCION', N'U') IS NULL
BEGIN
	RAISERROR(N'dbo.INSTRUCCION no existe en %s.', 16, 1, DB_NAME());
	RETURN;
END;
GO

-- Permiso para migraciones vía /api/patyia/db/exec (usuario de la app)
IF NOT EXISTS (
	SELECT 1
	FROM sys.database_permissions p
	INNER JOIN sys.objects o ON o.object_id = p.major_id
	INNER JOIN sys.database_principals u ON u.principal_id = p.grantee_principal_id
	WHERE u.name = N'SERVER-AYUDASCP-IA'
	  AND o.name = N'INSTRUCCION'
	  AND p.permission_name = N'ALTER'
)
BEGIN
	GRANT ALTER ON dbo.[INSTRUCCION] TO [SERVER-AYUDASCP-IA];
	PRINT N'GRANT ALTER concedido a SERVER-AYUDASCP-IA.';
END
ELSE
	PRINT N'SERVER-AYUDASCP-IA ya tiene ALTER en INSTRUCCION.';
GO

IF COL_LENGTH(N'dbo.INSTRUCCION', N'MODELO') IS NULL
BEGIN
	ALTER TABLE dbo.[INSTRUCCION]
		ADD [MODELO] NVARCHAR(40) NOT NULL
			CONSTRAINT [DF_INSTRUCCION_MODELO] DEFAULT (N'gpt-5-mini');
	PRINT N'Columna MODELO creada (default gpt-5-mini).';
END
ELSE
	PRINT N'Columna MODELO ya existe.';
GO

UPDATE dbo.[INSTRUCCION]
SET [MODELO] = N'gpt-5-mini'
WHERE [MODELO] IS NULL OR LTRIM(RTRIM([MODELO])) = N'';
GO

PRINT CONCAT(N'Filas normalizadas: ', @@ROWCOUNT);
GO

SELECT
	[IINSTRUCCION],
	[NINSTRUCCION],
	[MODELO],
	[BACTIVO]
FROM dbo.[INSTRUCCION]
ORDER BY [IINSTRUCCION] ASC;
GO
