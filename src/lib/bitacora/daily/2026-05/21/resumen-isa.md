# Proyecto ISA-DOC

Bitácora del **2026-05-21**. Jornada centrada en cierre del TK-1426681,
migración de capturas al estándar imgbb y estandarización de helpers
de tickets y del componente `Accordion` para mejorar UX/consistencia.

## 1. Cierre del TK-1426681 (Cursos / Planes de Estudio)

- **Causa 1 — Clientes:** se publicaron los cuatro endpoints
  (`verificar`, `duplicar`, `recodificar`, `consolidar`) en los clientes
  de Curso y Plan de Estudio, anteponiendo el segmento de recurso.
- **Causa 2 — Auditoría server-side:** se sobreescribió
  `camposAuditoriaUpdate/Insert` en `TCapacitacionServer` para enviar
  `IUSUARIOULT/IUSUARIOCRE` como `VARCHAR` (vía `val2Str(this.icontacto)`)
  y se corrigió el cruce entre `IEQUIPOCRE` y `FHCRE`.
- **Causa 3 — Esquema BD:** se ejecutó la migración
  `migrate-descripcion-text-to-varchar-max.sql` (`TEXT → VARCHAR(MAX)`
  idempotente) en las columnas `DESCRIPCION`/`DESCRIPCIONPLAN` de
  `CAPAC_CURSOS`, `CAPAC_PLANES_ESTUDIO` y `CAPAC_DRIVERS`. También se
  actualizó `init_capacitacion.sql` para que nuevas instalaciones nazcan
  con `VARCHAR(MAX)`.
- **QA end-to-end:** las seis acciones de **Cursos** y **Planes de
  Estudio** (Crear, Eliminar, Verificar, Duplicar, Recodificar y
  Consolidar) fueron validadas con respuesta satisfactoria (`200/202`).

## 2. Estándar de imágenes para tickets (helper `img()` + imgbb)

- Las capturas de los tickets dejan de servirse desde `public/imgs/...`
  y se publican en **imgbb** vía `scripts/upload-assets-imgbb.mjs`. El
  resultado se persiste en `src/lib/tickets/assets/imgbb-map.json`
  (`sha1 → { url, width, height }`).
- El helper `img(filename, targetW)` produce un `<a>` envolvente que
  permite abrir la imagen en tamaño real y un `<img>` con `width`,
  `height`, `min/max` clamp a `[300, 600]px` de alto, borde y
  `cursor: zoom-in`.
- Migrados al estándar: **TK-1426681**, **TK-1426669** y **TK-1426728**.
  Se eliminaron las carpetas `public/imgs/tickets/TK-*` obsoletas.

## 3. Helper `simpleTable(headers, rows, opts?)`

Se centralizó la generación de tablas email-safe en `snippets.ts` con el
mismo estilo de la tabla de **"Commits relacionados"** que renderiza
`template.ts` (header fondo negro, Tahoma, celdas con
`border-bottom:1px solid #f0f0f0`). Aplicado al Timeline de QA del
TK-1426681; se eliminó la sección custom de commits del TK por ser
redundante con la tabla automática del sistema bitácora.

## 4. Iconos `<img>` con `?color=` + min/max width

- Los íconos de `h3Iconized` y `note` ahora se renderizan como
  `<img src="https://api.iconify.design/<set>/<name>.svg?color=%23hex">`
  en vez del SVG embebido.
- El helper `icon()` fija `width`/`height` + `min-width`/`max-width` +
  `min-height`/`max-height` para evitar que clientes de correo
  reescalen el ícono por viewport.

## 5. Estándar de `Accordion` con `checkKey` / `checkKeys`

`Accordion.svelte` acepta nuevas props `checkKey?: string` y
`checkKeys?: string[]`. Cuando se proveen y **no** existe slot
`title-extra` custom, el accordion **auto-renderiza** un
`RevisadoCheck` agregado en su header (con estado mixto cuando aplica).

Aplicado al accordion **Seguridad · Insertar acciones faltantes en
SEG_ACCIONESXROL (Cursos, PlanDeEstudio)** que estaba sin check.

## 6. Población de commits y resumen de tiempos del TK

Se completó `commits: [...]` para TK-1426681 con los 12 commits del día
(distribuidos entre `ISP-ClientesIS`, `ISP-CLientesISServer`,
`ISW-ClientesIS` e `ISA-DOC`) y se añadió `ISA-DOC` a `REPOS_VALIDOS`
en `template.ts` para que aparezca correctamente etiquetado en la tabla
automática del sistema. A partir de ahora **cualquier TK culminado
debe llevar siempre commits + resumen de tiempos** (regla obligatoria).
