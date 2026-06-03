# `public/` — assets estáticos y datos versionables

Estructura por dominio (no mezclar secretos con snapshots).

## Carpetas

| Ruta | Contenido |
|------|-----------|
| `assets/icons/` | SVG Iconify (`npm run iconify` → `assets/icons/iconify/`) |
| `assets/imgs/` | Diagramas, DER, capturas de documentación |
| `content/docs/` | Markdown fuente de proyectos (`patyia`, `contapymeu`, `capacitacion`) + `_index.json` |
| `data/clientesis/` | Árbol JSON de tablas/columnas (codegen ClientesIS) |
| `data/sql/` | Scripts SQL servidos por HTTP (`init_capacitacion.sql`, migraciones) |
| `data/codegen/` | Estado DER, regiones, `_state*.json` del generador |
| `generated/patyia/openai/images/` | Salida runtime de imágenes OpenAI (binarios en `.gitignore`) |
| `static-api/` | Snapshots para gh-pages / `STATIC_MODE` (Postman, docs, tablas, codegen) |

## Rutas HTTP (dev)

- `/assets/icons/…`, `/assets/imgs/…`
- `/content/docs/<proyecto>/…`
- `/data/clientesis/…`, `/data/sql/…`, `/data/codegen/…`
- `/generated/patyia/openai/images/…`
- `/static-api/…` (modo estático / deploy)

En gh-pages, `DocsViewer` lee markdown desde `/static-api/docs/…` (copia generada con `npm run snapshot:data`).

## Secretos

**No** van bajo `public/`. Usar `secrets/api-keys.env` en la raíz del repo (ver `secrets/README.md`).

`static-api/` **sí** se versiona; los snapshots Postman no deben incluir `CONTROLKEY` ni tokens (sanitizado en `scripts/snapshot-data.mts`).

## Docs de arquitectura

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [IMPORT-MAP.md](./IMPORT-MAP.md)
