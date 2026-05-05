# ISA-DOC

## Bitácora · pestañas y navegación
- La home `/` ahora carga el panel **SQL** (la primera pestaña visible). El nav del header marca `SQL` como activa tanto para `/` como para `/sql`.
- `Actions` (antes en `/`) se movió a la ruta `/actions` y conserva el `ProjectsPanel`.

## Tickets · pipeline de bloques de código
- Migración del rendering de `codeBlock` y `compareTable({kind:"code"})` a **imágenes pre-generadas** vía API de [carbon.now.sh](https://carbon.now.sh) (envuelta por `carbon-api` de Python).
- Cliente `tickets/codeImage.ts` reescrito para ser **browser-safe**: solo hace lookup en `assets/code-imgs.json` con clave `sha1(${lang}\0${src})` (WebCrypto). Si no encuentra la imagen, los snippets caen al render Lezer/CodeMirror clásico (`<pre><code>`).
- Build interno (`npm run code-images:build`):
  - `scripts/build-code-images.mjs` analiza el AST de los `TK-*.ts` (TypeScript Compiler API) y descubre todos los `codeBlock(...)` y `compareTable({kind:"code", ...})` con literales.
  - `scripts/render-code.py` genera los PNG con `carbon-api` (theme `vscode`, fondo negro `rgba(0,0,0,1)`, sin window-controls, paddings `0px`, `Hack 14px`, export `2x`).
  - Se setea `chromium_path` con el Chrome local del equipo para evitar que Pyppeteer descargue Chromium (la revisión hardcodeada ya no existe en el bucket de googleapis).
  - `stdin` forzado a UTF-8 para que `Capítulo`, `ñ` y demás lleguen intactos al renderer.
  - Subida automática a **imgbb** (URL + width + height) y persistencia incremental de `assets/code-imgs.json`.
- Tickets migrados a `await codeBlock(...)` / `await compareTable(...)`: `TK-1420754`, `TK-1420755`, `TK-1420813`.

## Tickets registrados hoy
- `TK-1420819` — Campos vacíos en grid curso (Tema / Driver). Solución aplicada en `TCursoServer.JData2List` (incluye `tema` y `driver` anidados). Ajustada la observación a singular y eliminada la sección de Verificación.
- `TK-1420813` — Campos en modo visualización en formulario rápido del curso. `compareTable` con `isDetailReadonly` antes/después.
- `TK-1420755` — Mostrar fecha de creación de curso (definición de columna en `TGridColumn<TCurso>`).
- `TK-1420754` — Defaults `Capítulo` / `Título` en `TEstructuraCursoSlaveController.ensureLimit` para drivers de 2 niveles.
- `TK-1420751` — Catálogo de temas en cursos (registro).
- `TK-1420742` — Opciones para agregar contenido al crear curso (registro).

## SQL · auditoría en Capacitación
- Nuevo script idempotente `src/lib/migration/sql/add-audit-columns.sql` que recorre `CAPAC_CURSOS` y `CAPAC_PLANES_ESTUDIO` y agrega solo las columnas de auditoría faltantes:
  - `IUSUARIOCRE`, `IAPPCRE`, `IPCRE`, `FHCRE` (`DEFAULT GETDATE()`).
  - `IUSUARIOULT`, `IAPPULT`, `IPULT`, `FHULT` (`DEFAULT GETDATE()`).
- Verificación contra `sys.columns` antes de cada `ALTER TABLE … ADD`. Constraints de default nombradas `DF_<tabla>_<columna>`.
- Registrado como ticket interno `TK-AUDIT-COLS` en la sección de tickets.
