# Prompts Ultra · MERGE en INSTRUCCION

Actualización de los **13 prompts específicos por tipo de consulta** con la versión compacta **Ultra** (`src/lib/patyia/prompts/Ultra/01-*.md` … `13-*.md`).

## Qué hace el SQL

1. **MERGE** en `INSTRUCCION`: `iinstruccion = <TIPO>`, `ninstruccion = PROMPT_<TIPO>`, texto = contenido literal del `.md`, `version = 2.0-ultra`.
2. **MERGE** en `TDCONSULTAXINSTRUCCION`: enlace `itdconsulta = <TIPO>` → `iinstruccion`, `orden = 1`.

Idempotente: re-ejecutar **sobrescribe** `instruccion` sin duplicar filas ni romper relaciones.

## Archivos fuente (13)

| Archivo | TIPO |
|---------|------|
| `Ultra/01-saludo-otro.md` | SALUDO_OTRO |
| `Ultra/02-fuera-de-alcance-tecnico.md` | FUERA_DE_ALCANCE_TECNICO |
| `Ultra/03-solicitud-no-permitida.md` | SOLICITUD_NO_PERMITIDA |
| `Ultra/04-requiere-contexto.md` | REQUIERE_CONTEXTO |
| `Ultra/05-paso-a-paso.md` | PASO_A_PASO |
| `Ultra/06-interpretacion-resultado.md` | INTERPRETACION_RESULTADO |
| `Ultra/07-consulta-normativa-negocio.md` | CONSULTA_NORMATIVA_NEGOCIO |
| `Ultra/08-asesoria-personalizada.md` | ASESORIA_PERSONALIZADA |
| `Ultra/09-error-tecnico.md` | ERROR_TECNICO |
| `Ultra/10-error-configuracion.md` | ERROR_CONFIGURACION |
| `Ultra/11-error-acceso.md` | ERROR_ACCESO |
| `Ultra/12-error-dian.md` | ERROR_DIAN |
| `Ultra/13-comercial.md` | COMERCIAL |

## Regenerar el SQL

Si se editan los `.md` en `prompts/Ultra/`:

```bash
node scripts/build-paty-prompts-ultra-sql.mjs
```

Salida: `src/lib/patyia/sql/seed-prompts-ultra-tdconsulta.sql`

## Verificación post-ejecución

El script cierra con un `SELECT` de `iinstruccion`, `version`, `LEN(instruccion)` y enlace a `TDCONSULTA`. Esperado: **13 filas** con `version = 2.0-ultra` y longitudes menores que la carga inicial de 2026-05-25.

## BD objetivo

Ejecutar primero en **AYUDASCP_IA_STAGING**; validar en conversación real; luego producción si aplica.
