# ISA-DOC

Portal de documentación e ingeniería para **ClientesIS** y **PatyIA** (Astro + Svelte 5 + Node).

## Estructura del repo

| Ruta | Rol |
|------|-----|
| `src/` | App Astro, API routes, dominio (`src/lib` — ver `src/lib/ARCHITECTURE.md`) |
| `public/` | Assets estáticos, docs fuente, datos SQL/JSON, `static-api/` |
| `data/` | Estado local: Postman editable, caches PatyIA, `revisado.json`, OpenAI storage |
| `config/` | Astro, Svelte, Iconify (`config/astro.config.ts`) |
| `scripts/` | Snapshots, verify-api, tickets, utilidades |
| `secrets/` | `api-keys.env`, `tokens/*.json` (gitignored) |
| `docs/` | Informes y notas de workspace (QA, etc.) |
| `isp-svelte/` | Componentes ISP locales (`$comps`) |

## Comandos habituales

```bash
npm run dev          # http://localhost:4400
npm run build
npm run snapshot:gh-pages   # regenera public/static-api/
```

## Configuración local

1. `copy .env.example .env` — MSSQL y reenvíos.
2. `copy secrets\api-keys.env.example secrets\api-keys.env` — OpenAI, HF.
3. `copy secrets\tokens\token.patyia.json.example secrets\tokens\token.patyia.json` — JWT PatyIA.

## Más documentación

- [ARCHITECTURE.md](./ARCHITECTURE.md) — mapa de capas del monorepo
- [IMPORT-MAP.md](./IMPORT-MAP.md) — rutas y convenciones
- [public/README.md](./public/README.md) — árbol `public/`
- [data/README.md](./data/README.md) — datos editables
- [scripts/README.md](./scripts/README.md) — scripts npm
