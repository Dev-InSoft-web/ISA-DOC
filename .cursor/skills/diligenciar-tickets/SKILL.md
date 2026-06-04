---
name: diligenciar-tickets
description: >-
  Redacta y actualiza tickets de soporte (buildBody, resumen, cambiosBd, bosquejo SQL)
  en pasado impersonal, sin citar repositorios internos, códigos TK ni nombres de asesores.
  Usar al diligenciar o cerrar tickets PatyIA/ClientesIS en src/lib/features/tickets/.
disable-model-invocation: false
---

# Diligenciar tickets (norma de redacción)

Aplica esta skill al editar `records/{clientesis|patyia}/{MM}/{DD}/TK-*.ts`, metadatos del ticket en PG (`isa-doc/tickets/ticket`) y bosquejos `TK-*-sql.ts`. Árbol: `docs/LAYOUT.md`; persistencia: `docs/STORE.md`. El HTML se genera en TS (`buildBodyTK*`); en PG solo JSON (título, normativa, commits, `bodyModule`). El HTML del ticket se entrega al proceso de soporte; debe leerse como informe técnico neutro, no como nota interna de ingeniería.

## Prohibido en el texto del ticket (cuerpo, resumen, intención BD, comentarios SQL)

| No usar | Alternativa |
|--------|-------------|
| Códigos de ticket (`TK-1433943`, «este TK», «ticket anterior») | Describir el trabajo: «actualización de prompts Ultra», «migración de instrucciones» |
| Nombres de repositorios o rutas de repo (`ISA-DOC`, `lab-langgraph`, rutas `src/...`) | «catálogo de prompts», «base de datos de ayudas`, «entorno de staging» |
| Nombres de asesores o solicitantes en el cuerpo | No mencionar; `solicitante` en `index.ts` es solo metadato CRM |
| «Bitácora», «SqlExecCard», «acordeón», herramientas internas | «despliegue controlado», «ejecución en base de datos de staging» |
| «AT», «ING», «pendiente AT», roles de área | «validación funcional», «pruebas en ambiente de staging», «área de pruebas» |
| Futuro o imperativo al usuario («debe ejecutar», «hay que») en hechos ya hechos | Pasado impersonal («se ejecutó», «se actualizó», «se verificó») |

## Tono obligatorio: pasado impersonal

- Forma preferida: **se** + verbo en pretérito («se aplicó», «se cargaron», «se verificó»).
- Evitar primera persona (no «diligenciamos», «actualicé»).
- Evitar segunda persona (no «debe validar», «ejecute el script»).
- Para trabajo pendiente real: voz pasiva o nominalización («queda por validar el comportamiento en chat»), sin asignar a un rol con siglas.

## Estructura del cuerpo (`buildBodyTK*.ts`)

1. **Intro** (1 párrafo): qué se solicitó y qué se hizo, en pasado.
2. **Secciones** con `h3Iconized` + `noteList` (2–4 notas cortas por sección).
3. Sin rutas de scripts ni comandos `npm`/`node` en el HTML del ticket.
4. Sin listas largas de tipos salvo que el área funcional lo exija; preferir «los 13 tipos de consulta».

## Fragmentos de código (obligatorio)

Ver `docs/CODE-FRAGMENTS.md`.

| Ámbito | Regla |
|--------|--------|
| `codeBlock`, `compareTable` (`kind: "code"`), `cambiosBd.sql` | **Sin comentarios** (`//`, `/* */`, `--`) |
| Explicación del fragmento | En la nota HTML o en `intencion`, no dentro del snippet |
| Cabecera `// TK-…` del archivo `.ts` | Solo contexto interno; no se muestra en el ticket |

Los comentarios en el snippet confunden al lector de soporte y duplican lo que ya debe decir el texto narrativo.

## Cambios en base de datos (`cambiosBd` en metadatos PG / registro del ticket)

| Campo | Criterio |
|-------|----------|
| `tabla` | Nombres de tablas/columnas, sin rutas |
| `registro` | Una línea: qué filas o catálogo (ej. «13 instrucciones PROMPT por tipo») |
| `intencion` | 1–2 frases en pasado: qué se modificó y por qué, sin herramientas internas |
| `sql` | **Bosquejo corto** (patrón MERGE/UPDATE/SELECT), no el script ejecutable completo. Máx. ~40 líneas. Sin incrustar textos de prompts. **Sin líneas `--`.** |

Referencia de bosquejo: `TK-1431666-sql.ts` (`SQL_MERGE_ULTRA_LOTE`). No importar `*.sql?raw` de miles de líneas al ticket.

## `resumen` y `fechaEntrega` en `index.ts`

- `resumen`: 1–2 oraciones, pasado impersonal, resultado verificable.
- `fechaEntrega`: solo fecha o «fecha — entrega en staging»; sin siglas de área ni referencias a tickets.

## Bitácora vs ticket

- La **bitácora** (`060-bitacora/`, panel interno) puede conservar IDs técnicos y rutas para el equipo.
- El **ticket** (`TK-*.ts` + HTML generado) **nunca** replica ese nivel de detalle operativo.

## Checklist antes de dar por diligenciado

- [ ] Cuerpo solo en pasado impersonal
- [ ] Sin `TK-`, sin nombres de repo, sin asesores en el texto visible
- [ ] `cambiosBd.intencion` breve; SQL = bosquejo
- [ ] `resumen` alineado con el cuerpo
- [ ] Sin comandos ni paths en notas del ticket
- [ ] Fragmentos de código (`codeBlock`, `cambiosBd.sql`) sin comentarios

## Ejemplo (correcto)

> Se reforzaron los textos de las trece instrucciones por tipo de consulta en versión Ultra y se aplicó un lote idempotente en la base de datos de staging. Se sincronizó el mismo catálogo en el esquema operativo de PostgreSQL. Queda por validar el comportamiento en conversaciones de Paty V3/V4 para los escenarios reportados en pruebas.

## Ejemplo (incorrecto)

> TK-1433943: Viviana pidió actualizar Ultra. Ejecutar en ISA-DOC bitácora el MERGE. Pendiente AT.
