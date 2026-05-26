-- =============================================================
-- UPDATE INSTRUCCION.NINSTRUCCION
-- Actualiza los nombres semánticos en español de las instrucciones
-- Base de datos: AYUDASCP_IA
-- Tabla: INSTRUCCION
-- =============================================================

USE AYUDASCP_IA;
GO

PRINT N'Iniciando actualización de NINSTRUCCION en tabla INSTRUCCION...';
PRINT N'';

SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRAN;

UPDATE i
SET i.ninstruccion = v.nombre
FROM INSTRUCCION i
INNER JOIN (VALUES
	(N'ASESORIA_PERSONALIZADA',     N'Asesoría Personalizada'),
	(N'COMERCIAL',                  N'Comercial'),
	(N'CONSULTA_NORMATIVA_NEGOCIO', N'Consulta Normativa Negocio'),
	(N'ERROR_ACCESO',               N'Error Acceso'),
	(N'ERROR_CONFIGURACION',        N'Error Configuración'),
	(N'ERROR_DIAN',                 N'Error DIAN'),
	(N'ERROR_TECNICO',              N'Error Técnico'),
	(N'FUERA_DE_ALCANCE_TECNICO',   N'Fuera de Alcance Técnico'),
	(N'INTERPRETACION_RESULTADO',   N'Interpretación Resultado'),
	(N'PASO_A_PASO',                N'Paso a Paso'),
	(N'REQUIERE_CONTEXTO',          N'Requiere Contexto'),
	(N'SALUDO_OTRO',                N'Saludo Otro'),
	(N'SOLICITUD_NO_PERMITIDA',     N'Solicitud No Permitida')
) AS v (iinstruccion, nombre)
	ON v.iinstruccion = i.iinstruccion;

DECLARE @rowsAffected INT = @@ROWCOUNT;

COMMIT;

PRINT N'Actualización completada.';
PRINT N'Registros actualizados: ' + CAST(@rowsAffected AS VARCHAR(10));
PRINT N'';
PRINT N'✓ NINSTRUCCION actualizado con nombres semánticos en español';
