# `data/` en ISA-DOC (legado / migración)

**La persistencia operativa vive en lab-langgraph.** Esta carpeta queda para:

- Copias locales temporales durante desarrollo sin lab levantado
- Sincronización hacia el backend: `cd ../lab-langgraph && npm run data:migrate-from-isa`

## Qué se movió al backend

| Aquí (legado) | lab-langgraph |
|---------------|---------------|
| `postman/` | `data/postman/` |
| `patyia/*-cache.json` | `data/patyia/caches/` |
| `revisado.json` (eliminado) | PG `BD_ISADOC.BITACORA_REVISADO` vía lab `/api/revisado` |
| `openai-storage/` | `data/openai-storage/` |
| — | `data/api-catalog.json`, `data/clientesis-schema/`, `data/codegen/`, `data/sql/` |

## Front estático

Con `PUBLIC_LAB_LANGGRAPH_URL` el navegador lee/escribe vía lab (`/api/revisado`, `/api/persistence/...`, `/api/agent/postman-ui`).

Ver `../lab-langgraph/docs/PERSISTENCE-INVENTORY.md`.
