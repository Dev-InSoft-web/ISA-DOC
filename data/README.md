# `data/` — estado editable fuera de `public/`

No confundir con `public/data/` (árbol SQL ClientesIS servido por HTTP).

## Subcarpetas

| Ruta | Uso |
|------|-----|
| `postman/clientesis/` | Colección + envs ClientesIS (monolítico) |
| `postman/patyia/` | Entidades fragmentadas + `collection.json` join |
| `patyia/` | Caches locales (`conversaciones-cache.json`, etc.) |
| `openai-storage/` | Mirror de archivos vector store (grande — gitignored) |
| `lab-langgraph/vectorize/` | Corpus para FitDocs RAG (transcripciones YouTube ContaPyme, etc.) |
| `revisado.json` | Estado bitácora “revisado” → copiado a `static-api/revisado.json` |

## Postman

Edición vía UI (`PostmanPanel`). Regenerar snapshot:

```bash
npm run snapshot:gh-pages
```

Los `CONTROLKEY` en `environments.json` deben quedar vacíos en git; rellenar solo en local.

## Legado eliminado

- `iss-postman/` — sustituido por `postman/clientesis/collection.json`
- `patyia-postman-environments.json` en raíz — sustituido por `postman/patyia/environments.json`
