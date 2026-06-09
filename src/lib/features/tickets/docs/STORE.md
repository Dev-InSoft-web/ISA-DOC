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

## Diagramas Mermaid (PG + lab API)

| Operación | HTTP |
| --- | --- |
| Leer (código + mermaid.ink + imgbb) | `GET /api/tickets/mermaid/{filename}` |
| Publicar (idempotente por `mermaidInkUrl`) | `POST /api/tickets/mermaid/publish` `{ filename, source, ticketId? }` |
| Subir URL remota a imgbb | `POST /api/imgbb/assets/upload` `{ filename, imageUrl, ticketId? }` |

Flujo: el código Mermaid vive en `imgbb-asset` (`kind: mermaid`, `mermaidSource`, `mermaidInkUrl`). Si la URL mermaid.ink ya existe en PG, no se vuelve a subir a imgbb. imgbb acepta **URL directa** en el campo `image` (sin descargar buffer intermedio).

Migrar `.mmd` locales → PG:

```bash
cd lab-langgraph && npm run tickets:migrate-mermaid
```

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

Imágenes en builders: `ticketImg("captura.png")` emite `$captura.png$`; `getTicketHtml` resuelve contra PG (`imgbb-asset`) vía lab API. Publicar con lab-langgraph (`imgbb:migrate-map`, `tickets:migrate-mermaid` o API upload). No mantener `manifest.json` ni `imgbb-map.json` en ISA-DOC.

## Migración desde registro estático

1. Metadatos en PG (`isa-doc/tickets/ticket`); `staticRegistry.ts` vacío. Snapshot: `lab-langgraph/data/tickets/ticket-registry.snapshot.json`.
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
