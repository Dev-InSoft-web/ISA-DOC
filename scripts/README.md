# `scripts/` — automatización CLI

## Por dominio

| Carpeta / archivo | npm script | Descripción |
|-------------------|------------|-------------|
| `snapshot-data.mts` | `snapshot:gh-pages` | Vuelca `public/static-api/` |
| `verify-api/` | `verify:api` | Contrato HTTP ClientesIS |
| `verify-api-patyia/` | `verify:api:patyia` | Contrato PatyIA (7071) |
| `tickets/` | `tickets:assets:*` | PNG/Mermaid para tickets |
| `huggingface/` | `huggingface:remove-bg` | Remove background |
| `PS1/` | `pub:gh-pages`, etc. | Publicación Windows |
| `one-off/` | — | Utilidades puntuales (no npm) |

## One-off

- `one-off/apply-ticket-commits.cjs` — fusiona `__propuesta.json` → `src/lib/features/tickets/index.ts`

## Logs

`verify-api*/logs/` están en `.gitignore`.
