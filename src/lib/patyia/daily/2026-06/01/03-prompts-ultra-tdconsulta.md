# Prompts Ultra · MERGE en INSTRUCCION

Actualización de los **13 prompts por tipo de consulta** con la versión compacta **Ultra** (`src/lib/patyia/prompts/Ultra/PROMPT_<TIPO>.md`), alineada con Base en `src/lib/patyia/prompts/PROMPT_<TIPO>.md`.

## Qué hace el SQL

1. **MERGE** en `INSTRUCCION`: `iinstruccion = <TIPO>`, `ninstruccion = PROMPT_<TIPO>`, `instruccion` = texto del `.md` Ultra, `version = 2.0-ultra`.
2. **MERGE** en `TDCONSULTAXINSTRUCCION`: `itdconsulta = <TIPO>` → `iinstruccion`, `orden = 1`.

Idempotente: re-ejecutar **sobrescribe** `instruccion` sin duplicar filas.

## Archivos fuente (13)

| Archivo Ultra | TIPO (`IINSTRUCCION`) |
|---------------|------------------------|
| `Ultra/PROMPT_SALUDO_OTRO.md` | SALUDO_OTRO |
| `Ultra/PROMPT_FUERA_DE_ALCANCE_TECNICO.md` | FUERA_DE_ALCANCE_TECNICO |
| `Ultra/PROMPT_SOLICITUD_NO_PERMITIDA.md` | SOLICITUD_NO_PERMITIDA |
| `Ultra/PROMPT_REQUIERE_CONTEXTO.md` | REQUIERE_CONTEXTO |
| `Ultra/PROMPT_PASO_A_PASO.md` | PASO_A_PASO |
| `Ultra/PROMPT_INTERPRETACION_RESULTADO.md` | INTERPRETACION_RESULTADO |
| `Ultra/PROMPT_CONSULTA_NORMATIVA_NEGOCIO.md` | CONSULTA_NORMATIVA_NEGOCIO |
| `Ultra/PROMPT_ASESORIA_PERSONALIZADA.md` | ASESORIA_PERSONALIZADA |
| `Ultra/PROMPT_ERROR_TECNICO.md` | ERROR_TECNICO |
| `Ultra/PROMPT_ERROR_CONFIGURACION.md` | ERROR_CONFIGURACION |
| `Ultra/PROMPT_ERROR_ACCESO.md` | ERROR_ACCESO |
| `Ultra/PROMPT_ERROR_DIAN.md` | ERROR_DIAN |
| `Ultra/PROMPT_COMERCIAL.md` | COMERCIAL |

## Regenerar el SQL

Tras editar los `.md`:

```bash
node scripts/build-paty-prompts-ultra-sql.mjs
```

Salida: `src/lib/patyia/sql/seed-prompts-ultra-tdconsulta.sql`

## Verificación post-ejecución

El script cierra con `SELECT` de `iinstruccion`, `version`, `LEN(instruccion)` y enlace a `TDCONSULTA`. Esperado: **13 filas** con `version = 2.0-ultra`.

Métricas de tokens (Base vs Ultra): `npm run patyia:prompts:metrics` → ver `patyia-prompt-metrics.ts` y TK-1431666.

## MODELO por tipo (respuesta final)

Tras cargar Ultra, calibrar las 13 filas a **`gpt-5-nano`** con `update-instruccion-modelo-gpt5-nano.sql` (acordeón TK-1431662 en esta bitácora). Fallback en `system-prompts.json` (`modeloConversacion`) solo aplica si `MODELO` viene vacío.

## BD objetivo

**AYUDASCP_IA_STAGING** primero; validar conversación; luego producción si aplica.
