-- =====================================================================
-- SALUDO_OTRO: instruir uso de {{nombre_usuario}} en saludos
-- BD: AYUDASCP_IA / AYUDASCP_IA_STAGING
-- Fuente canónica: src/lib/patyia/prompts/PROMPT_SALUDO_OTRO.md
-- =====================================================================
SET NOCOUNT ON;

DECLARE @db SYSNAME = DB_NAME();
IF @db NOT IN (N'AYUDASCP_IA', N'AYUDASCP_IA_STAGING')
BEGIN
	RAISERROR(N'Ejecutar en AYUDASCP_IA o AYUDASCP_IA_STAGING (actual: %s).', 16, 1, @db);
	RETURN;
END;

IF COL_LENGTH('dbo.INSTRUCCION', 'instruccion') IS NULL
BEGIN
	RAISERROR(N'Tabla INSTRUCCION no encontrada en %s.', 16, 1, @db);
	RETURN;
END;

UPDATE dbo.INSTRUCCION
SET instruccion = REPLACE(
	instruccion,
	N'En esos casos, responde de forma amable y natural, respetando el cierre del usuario.

## Qué debes evitar',
	N'En esos casos, responde de forma amable y natural, respetando el cierre del usuario.

## Uso del nombre del usuario

La variable {{nombre_usuario}} llega desde el template PR_GENERAL. Cuando tenga un valor válido (no vacío), **úsalo de forma natural en la apertura**, sobre todo en saludos y agradecimientos.

Reglas:

- incluir el nombre en el saludo cuando el usuario saluda o agradece
- no repetir el nombre en cada frase ni dejarlo aislado en una línea aparte
- si {{nombre_usuario}} está vacía o no disponible, responde sin nombre
- no inventar nombres ni usar genéricos como "cliente" si el nombre no está disponible

## Qué debes evitar'
)
WHERE iinstruccion = N'SALUDO_OTRO'
  AND instruccion NOT LIKE N'%## Uso del nombre del usuario%';

UPDATE dbo.INSTRUCCION
SET instruccion = REPLACE(
	instruccion,
	N'Hola, qué gusto saludarte. Estoy aquí para ayudarte con lo que necesites en ContaPyme.',
	N'Hola, {{nombre_usuario}}, qué gusto saludarte. Estoy aquí para ayudarte con lo que necesites en ContaPyme.'
)
WHERE iinstruccion = N'SALUDO_OTRO';

UPDATE dbo.INSTRUCCION
SET instruccion = REPLACE(
	instruccion,
	N'Con gusto, me alegra haberte ayudado.',
	N'Con gusto, {{nombre_usuario}}, me alegra haberte ayudado.'
)
WHERE iinstruccion = N'SALUDO_OTRO';

UPDATE dbo.INSTRUCCION
SET instruccion = REPLACE(
	instruccion,
	N'Hasta luego, que tengas un excelente día.',
	N'Hasta luego, {{nombre_usuario}}, que tengas un excelente día.'
)
WHERE iinstruccion = N'SALUDO_OTRO';
