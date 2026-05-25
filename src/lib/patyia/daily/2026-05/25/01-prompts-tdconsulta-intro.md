# Carga inicial de prompts específicos por tipo de consulta (`AYUDASCP_IA`)

Viviana compartió la configuración de los 13 prompts específicos que arman la instrucción del asistente según el tipo de consulta clasificado. Cada uno vive como `.md` en la carpeta de proyecto (`P:\ING-05…\PROMPT_<TIPO>.md`), pero esa ruta es **solo documental**: el runtime de PatyIA no lee del filesystem.

## Dónde queda en la BD

El modelo ya tiene las tablas exactas para esto:

| Tabla | Rol |
|---|---|
| `INSTRUCCION` | Contenido del prompt en la columna `instruccion` (NVARCHAR(MAX)). |
| `TDCONSULTA` | Catálogo de tipos (`SALUDO_OTRO`, `COMERCIAL`, …). |
| `TDCONSULTAXINSTRUCCION` | Relación M:N con `orden` (qué instrucciones aplican a cada tipo y en qué secuencia). |

El controller `TInstruccionController.GetInstruccionTexto` lee `INSTRUCCION.instruccion` directo del registro, así que el contenido del `.md` se **persiste en la columna**, no se referencia por ruta. Esto desacopla el runtime del recurso compartido `P:\` y permite versionado / consulta SQL.

## Convención de claves usada en el seed

- `INSTRUCCION.iinstruccion` = `INSTRUCCION.ninstruccion` = `'PROMPT_<TIPO>'` (p. ej. `PROMPT_SALUDO_OTRO`). Es código estable y legible.
- `INSTRUCCION.version` = `'1.0'`, `bactivo = 1`, `fhini = SYSUTCDATETIME()` al insertar.
- `TDCONSULTAXINSTRUCCION.orden = 1` (única instrucción específica por tipo en esta versión; si más adelante se acumulan, se incrementa el orden).
- El `itdconsulta` se resuelve por subquery sobre `TDCONSULTA.nconsulta = '<TIPO>'`.

## Contenido cargado

Se toma el contenido literal de los `.md` ya consolidados en el repo (`src/lib/patyia/prompts/`), que son la misma copia presentada en la sección **Prompts de Paty** de la documentación PatyIA:

`SALUDO_OTRO`, `FUERA_DE_ALCANCE_TECNICO`, `SOLICITUD_NO_PERMITIDA`, `REQUIERE_CONTEXTO`, `PASO_A_PASO`, `INTERPRETACION_RESULTADO`, `CONSULTA_NORMATIVA_NEGOCIO`, `ASESORIA_PERSONALIZADA`, `ERROR_TECNICO`, `ERROR_CONFIGURACION`, `ERROR_ACCESO`, `ERROR_DIAN`, `COMERCIAL`.

## Idempotencia

El script usa `MERGE` en ambas tablas:

- Si la instrucción ya existe (mismo `iinstruccion`): actualiza `instruccion`, `descripcion`, `version`, `bactivo`.
- Si la relación ya existe: refresca `orden`.
- Si no existe: inserta.

Volver a ejecutarlo no duplica filas y sirve como mecanismo de **actualización** del prompt cuando se reescriba un `.md`.

## Verificación

El script cierra con un `SELECT` que devuelve `iinstruccion`, `ninstruccion`, longitud del prompt, `itdconsulta` y `nconsulta` para confirmar las 13 filas y su enlace.

> Importante: el endpoint genérico `/api/db/exec` de la bitácora apunta a la BD de ClientesIS. Para **AYUDASCP_IA** este script debe ejecutarse por ahora directamente contra esa BD (SSMS / pipeline). Cuando exista el endpoint dedicado para PatyIA se conecta el botón.
