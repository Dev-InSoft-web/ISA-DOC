# Mapa de imports (migración lib)

Rutas relativas desde `src/`. Sustituir en imports, globs `import.meta.glob`, scripts y comentarios de fuente.

## Core

| Antes | Ahora |
|-------|--------|
| `lib/db.ts` | `lib/core/database/clientesis-pool.ts` |
| `lib/dbPaty.ts` | `lib/core/database/paty-pool.ts` |
| `lib/urlState` | `lib/core/url/query-params` |
| `lib/socket-server` | `lib/core/realtime/socket-server` |
| `lib/realtimeFlag` | `lib/core/realtime/flag` |
| `lib/projects-registry` | `lib/core/registry/projects` |

## Shared

| Antes | Ahora |
|-------|--------|
| `lib/format-html` | `lib/shared/format-html` |
| `lib/stores.ts` | `lib/shared/stores.ts` |

## SQL + tree

| Antes | Ahora |
|-------|--------|
| `lib/tableSchema` | `lib/sql/schema/tableSchema` |
| `lib/sqlFragments` | `lib/sql/schema/fragments` |
| `lib/tablesStore.server` | `lib/sql/stores/tablesStore.server` |
| `lib/fragmentsStore` | `lib/sql/stores/fragmentsStore` |
| `lib/sqlProviders/` | `lib/sql/providers/` |
| `lib/codeGen/` | `lib/sql/codegen/` |
| `lib/migration/` | `lib/sql/migration/` |
| `lib/permisosCsv` | `lib/sql/permisos/csv` |
| `lib/treeStorage` | `lib/tree/storage` |
| `lib/treeNodes` | `lib/tree/nodes` |

## Integrations

| Antes | Ahora |
|-------|--------|
| `lib/mermaid/` | `lib/integrations/mermaid/` |
| `lib/huggingface/` | `lib/integrations/huggingface/` |
| `lib/postman/` | `lib/integrations/postman/` |
| `lib/runtime/` | `lib/integrations/runtime/` |

## Features

| Antes | Ahora |
|-------|--------|
| `lib/bitacora/` | `lib/features/bitacora/` |
| `lib/patyia/` | `lib/features/patyia/` |
| `lib/tickets/` | `lib/features/tickets/` |
| `lib/tickets` (barrel) | `lib/features/tickets` |

## Re-exports legacy (compatibilidad)

| Archivo | Redirige a |
|---------|------------|
| `lib/stores.ts` | `lib/shared/stores.ts` (alias `$lib/stores` en TreeView) |

Preferir la ruta nueva en código nuevo.

## Sin cambio (rutas HTTP)

- `/api/db/*`, `/api/patyia/*`, `/api/codegen/*` — solo cambian imports del código fuente.

## Scripts

| Script | Ajuste |
|--------|--------|
| `patyia/prompts/build-paty-prompts-*` | `src/lib/features/patyia/050-prompts/catalog` |
| `publish/snapshot-data.mts` | `sql/stores/tablesStore.server`, `sql/codegen/paths`, `integrations/postman/store` |
| `tickets/sync-ticket-*.mjs` | `features/tickets/index.ts` |
