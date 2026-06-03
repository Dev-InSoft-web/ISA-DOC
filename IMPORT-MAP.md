# Mapa de importaciones y rutas (raíz)

## Alias TypeScript / Vite

| Alias | Ruta |
|-------|------|
| `$lib/*` | `src/lib/*` |
| `$components/*` | `src/components/*` |
| `$comps/*` | `isp-svelte/src/lib/*` |

Definidos en `config/astro.config.ts` (re-export `astro.config.ts` en raíz para compatibilidad CLI).

## Secretos → código

| Consumidor | Token / clave |
|------------|----------------|
| `patyiaLocalToken.ts`, `/api/patyia/local-token` | `findTokenFile("patyia")` |
| `openaiKey.ts` | `secrets/api-keys.env` |
| Lab LangGraph (FitDocs RAG) | `GROQ_API_KEY` + `HUGGINGFACE_API_KEY` en `secrets/api-keys.env` / `.env` → `lab-langgraph/local.settings.json` |
| `scripts/verify-api-patyia/*` | `tokenFileCandidates("patyia")` |

## Datos → UI

| Dato | Lectura |
|------|---------|
| `data/postman/**` | `PostmanPanel`, `postman/store.ts` |
| `data/revisado.json` | `revisadoServer.ts` → snapshot `static-api/revisado.json` |
| `data/patyia/*-cache.json` | paneles PatyIA staging |
| `public/data/clientesis/**` | SQL tree / codegen |
| `public/content/docs/**` | `DocsViewer` (dev) |

## Scripts npm → archivo

| Script | Script file |
|--------|-------------|
| `snapshot:gh-pages` | `scripts/snapshot-data.mts` |
| `iconify` | `config/downloadIconify.js` |
| `verify:api:patyia` | `scripts/verify-api-patyia/verify_api.ts` |
| `postman:gen` | `scripts/verify-api/postman/generate_postman_items.ts` |

## Eliminado / legado

| Antes | Ahora |
|-------|--------|
| `iss-postman/` | Obsoleto → `data/postman/clientesis/collection.json` |
| `patyia-postman-environments.json` (raíz) | `data/postman/patyia/environments.json` |
| `token.patyia.json` (raíz) | `secrets/tokens/token.patyia.json` |
| `__apply.cjs` (raíz) | `scripts/one-off/apply-ticket-commits.cjs` |
| `-w`, `tmp-rmbg-*.png` | Basura — ignorados / eliminados |
