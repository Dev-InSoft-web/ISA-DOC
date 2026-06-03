# Arquitectura ISA-DOC (raíz)

```
ISA-DOC/
├── config/           # build toolchain (Astro re-exporta desde raíz)
├── src/              # aplicación (feature-layered en lib/)
├── public/           # estáticos + static-api snapshot
├── data/             # JSON/SQL editables fuera de public/
├── scripts/          # automatización CLI
├── secrets/          # credenciales locales (no git)
├── docs/             # informes humanos
└── isp-svelte/       # paquete UI embebido
```

## Flujos principales

1. **Dev SSR** — `config/astro.config.ts`, Socket.IO, APIs `/api/*` con MSSQL/OpenAI vía `.env` + `secrets/`.
2. **GitHub Pages** — `config/astro.config.gh-pages.ts`, `npm run snapshot:gh-pages` → `public/static-api/`, build estático.
3. **Postman UI** — fuente en `data/postman/{clientesis,patyia}/`; snapshot en `public/static-api/*-postman/`.
4. **Codegen ClientesIS** — persistencia en `public/data/clientesis` + `public/data/codegen`.

## Secretos (dos capas)

| Capa | Ubicación | Contenido |
|------|-----------|-----------|
| Infra / BD | `.env` | `hostdb`, `paty_hostdb`, reenvíos remotos |
| APIs y JWT | `secrets/` | `api-keys.env`, `tokens/*.json` |

Nunca commitear valores reales. `static-api/` sí se versiona sin secretos (Postman sanitizado en snapshot).

## Puntos de entrada de código

- Resolución tokens: `src/lib/core/secrets/tokenPaths.ts`
- API keys OpenAI: `src/lib/core/secrets/loadApiKeys.ts`
- Postman stores: `src/lib/integrations/postman/store.ts`
