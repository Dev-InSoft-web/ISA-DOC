# `scripts/` — automatización CLI

Índice por dominio. Rutas antiguas → nuevas: `docs/MIGRATION-MAP.md`.

## Estructura

| Carpeta | npm / uso | Descripción |
| --- | --- | --- |
| `_shared/` | — | `ISA_DOC_ROOT` (resolución de rutas del repo) |
| `publish/` | `snapshot:gh-pages` | Snapshots `public/static-api/` para gh-pages |
| `patyia/` | `patyia:*` | Prompts, bitácora, charts TK |
| `docs-data/` | — | Migraciones árbol ClientesIS, seed, capacitación, auditoría |
| `assets/` | `assets:upload`, `code-images:build`, `huggingface:remove-bg` | ImgBB, carbon PNG, HF remove-bg |
| `api-dev/` | — | Postman, comparativa engines PatyIA |
| `tickets/` | `tickets:assets:*` | Assets Mermaid/Graphviz por ticket |
| `verify-api/` | `verify:api`, `postman:gen` | Contrato HTTP ClientesIS |
| `verify-api-patyia/` | `verify:api:patyia` | Contrato PatyIA (7071) |
| `lab-langgraph/` | `lab:*` | Corpus / orquestador (sin API keys en ISA-DOC) |
| `lib/` | — | Helpers compartidos (charts, HF, tickets) |
| `PS1/` | `pub:gh-pages` | Publicación Windows |
| `one-off/` | — | Utilidades puntuales |
| `isp-svelte-burn/` | manual | Quema `Card` → ISP-SvelteComponents |
| `docs/` | — | Notas para sesiones futuras |

## PatyIA

| npm | Script |
| --- | --- |
| `patyia:prompts:json` | `patyia/prompts/build-paty-prompts-json.mts` |
| `patyia:prompts:metrics` | `patyia/prompts/measure-paty-prompt-metrics.mjs` + `patyia/charts/sync-tk1431666-charts.mts` |
| `patyia:bitacora:share-html` | `patyia/bitacora/build-gpt5-adjuntos-share-html.mjs` |

## Publicación

```bash
npm run snapshot:gh-pages
npm run pub:gh-pages
```

## Lab LangGraph

Ver `lab-langgraph/README.md`. Cliente: `secrets/patyia/lab-client.env` (solo URL).

## Logs

`verify-api*/logs/` en `.gitignore`.
