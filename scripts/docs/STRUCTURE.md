# Estructura de `scripts/`

Convención alineada con `lab-langgraph/`:

- **Entradas npm** en subcarpetas por dominio (`patyia/prompts/`, `publish/`, `assets/…`).
- **`_shared/isa-doc-root`** — raíz ISA-DOC; los scripts no asumen `process.cwd()` salvo migraciones legacy (`docs-data/*`).
- **`lib/`** — código reutilizable, no ejecutar directo.
- **`docs/`** — mapas y notas para agentes en sesiones futuras.

## Añadir un script nuevo

1. Elegir carpeta (`patyia/`, `docs-data/`, `assets/`, `api-dev/`, `one-off/`).
2. Importar `ISA_DOC_ROOT` desde `../_shared/isa-doc-root.ts` (ajustar `../` según profundidad).
3. Registrar en `package.json` si es uso recurrente.
4. Documentar una línea en el `README.md` de la subcarpeta.

## Scripts legacy (`docs-data/`)

Migraciones V3/V4, seed y alineación DER: ejecutar **desde la raíz de ISA-DOC**:

```bash
node scripts/docs-data/migrations/migrate-v3.mjs
node scripts/docs-data/seed/seed-docs.mjs
```
