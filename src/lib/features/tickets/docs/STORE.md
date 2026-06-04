# Tickets en base de datos (entity store)

## Modelo

| Capa | Ubicación | Contenido |
| --- | --- | --- |
| **PG** | `isa-doc` / `tickets` / `ticket` (`bd_lab.lab_entity_row`) | Metadatos JSON: título, fechas, normativa, commits, `cambiosBd`, `bodyModule`, `sqlModule` |
| **TS algoritmo** | `records/{proyecto}/{MM}/{DD}/TK-*.ts` | `buildBodyTK*` — HTML con lógica (imágenes, tablas, bucles) |
| **SQL grande** | `records/.../TK-*-sql.ts` | Scripts referenciados desde `cambiosBd` o tooling |
| **Assets** | `assets/{proyecto}/{MM}/{DD}/TK-*/manifest.json` | URLs en PG (`imgbb-asset`); mapa JSON legacy |

El cuerpo **no** se guarda en PG: se genera al vuelo con el módulo TS indicado por `bodyModule`.

## CRUD (lab-langgraph)

Con `PUBLIC_LAB_LANGGRAPH_URL` configurada:

| Operación | HTTP |
| --- | --- |
| Listar | `GET /api/entity/isa-doc/tickets/ticket?limit=500` |
| Leer | `GET /api/entity/isa-doc/tickets/ticket/{code}` |
| Crear/actualizar | `PUT /api/entity/isa-doc/tickets/ticket/{code}` |
| Borrar | `DELETE /api/entity/isa-doc/tickets/ticket/{code}` |

En ISA-DOC: `src/lib/core/lab-api/tickets.ts`, `lab-api/imgbb.ts` y `loadTickets()` en `ticketStore.ts`.

## Imágenes imgbb (PG)

| Operación | HTTP (lab-langgraph) |
| --- | --- |
| Listar / filtrar por ticket | `GET /api/imgbb/assets?ticketId=TK-1426900` o `GET /api/entity/isa-doc/tickets/imgbb-asset?parentPk=TK-1426900` |
| Leer una | `GET /api/imgbb/assets/{filename}` |
| Subir | `POST /api/imgbb/assets/upload` — JSON `{ filename, base64, ticketId? }`, `{ filename, path }` o `multipart/form-data` (file + filename + ticketId) |

Migrar mapa local → PG (lab-langgraph, con lab API y BD):

```bash
npm run imgbb:migrate-map
# o: npx tsx scripts/migrate-imgbb-map-to-store.mts --map=../ISA-DOC/.../imgbb-map.json
```

Folderización de metadatos (manifest por TK, `asset-index.json`):

```bash
npm run tickets:assets:folderize
```

El visor usa PG si `PUBLIC_LAB_LANGGRAPH_URL` está activa (`preloadImgbbFromStore` en `getTicketHtml`); si no, `_meta/imgbb-map.json`.

## Migración desde registro estático

1. Metadatos siguen en `staticRegistry.ts` (`TICKETS[]`) durante la transición.
2. Ejecutar en **lab-langgraph**:

```bash
npm run tickets:migrate-store
```

3. Con lab API activa, la UI usa PG (`TicketsSection` → `loadTickets()`).
4. Nuevo ticket:
   - Crear `records/.../TK-XXXXX.ts` con `buildBodyTKXXXXX`.
   - Insertar fila en PG (API o migración incremental) con `bodyModule` apuntando al archivo.
   - **No** añadir imports masivos a `staticRegistry.ts` (solo fallback offline).

## Reglas

- **JSON en PG**: datos de negocio, normativa, estimaciones, referencias.
- **TS en repo**: cualquier generación condicional, composición HTML, algoritmos.
- **Sin TK en el HTML** del cuerpo (skill `diligenciar-tickets`).
