# Mapa de rutas `public/` → código

## Código que lee/escribe disco

| Módulo | Ruta en disco |
|--------|----------------|
| `src/lib/sql/stores/tablesStore.server.ts` | `public/data/clientesis/` |
| `src/lib/sql/schema/fragments.ts` | `public/data/sql/init_capacitacion.sql` |
| `src/lib/sql/codegen/paths.ts` | `public/data/codegen/` |
| `src/pages/api/codegen/reset.ts` | `public/data/clientesis` (relativo) |
| `src/pages/api/patyia/openai/images/generate.ts` | `public/generated/patyia/openai/images/` |
| `config/downloadIconify.js` | `public/assets/icons/iconify/` |
| `scripts/publish/snapshot-data.mts` | lee `content/docs`, escribe `static-api/` |

## UI / fetch en navegador

| Componente | Dev | STATIC_MODE |
|------------|-----|-------------|
| `DocsViewer.svelte` | `/content/docs/…` | `/static-api/docs/…` |
| `TreeSQLTables.svelte` | `/data/codegen/der/` | (mismo prefijo vía static) |
| `MarkdownDoc` (capacitacion) | `/content/docs/capacitacion/*.md` | — |
| `PatyIAOpenAIImagesPanel` | `/generated/patyia/openai/images/` | — |

## Reescritura de URLs (gh-pages)

- `src/lib/integrations/runtime/staticMode.ts` — `ASSET_PREFIXES`
- `src/layouts/Layout.astro` — script inline equivalente

## Secretos

| Archivo | Uso |
|---------|-----|
| `secrets/api-keys.env` | OpenAI, HF (gitignored) |
| `.env` | MSSQL, reenvíos remotos |
| `PatyIA/local.settings.json` | fallback OpenAI si no hay env |

`loadApiKeysFromSecretsFile()` en `src/lib/core/secrets/loadApiKeys.ts`.

## Regenerar static-api

```bash
npm run snapshot:data
```

Incluye sanitización de `CONTROLKEY` / `token` en `*/envs.json`.
