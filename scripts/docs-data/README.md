# docs-data — modelo ClientesIS en `public/db/clientesis`

Scripts **one-shot** o de mantenimiento del árbol/columnas. Ejecutar desde la raíz de ISA-DOC (`process.cwd()`).

| Subcarpeta | Scripts |
| --- | --- |
| `migrations/` | `migrate-v3.mjs`, `migrate-tree-json-to-v4.mjs` |
| `seed/` | `seed-docs.mjs` |
| `capacitacion/` | `align-der-capacitacion*.mjs`, `build-capac-tree.ps1` |
| `audit/` | `add-audit-columns.mjs`, `restructure-prefix-and-audit.mjs`, `sync-column-types.mjs`, `_check-schema.ps1` |
| `tools/` | `fetch-csvs.ps1` |

No hay entradas `npm` — invocación directa con `node` / `powershell`.
