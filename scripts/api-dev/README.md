# api-dev — Postman y pruebas PatyIA local

| Subcarpeta | Uso |
| --- | --- |
| `postman/enrich-postman.ts` | Enriquecer `data/postman/clientesis/collection.json` |
| `postman/populate-real-examples.ts` | Respuestas reales en ejemplos Postman |
| `engines/compare-engines.mjs` | Comparativa `responses` vs `agents-poc` (7071) |
| `engines/test-single-engine.mjs` | Prueba un solo engine |

Variables típicas: `JWT`, `ITERCERO`, `ICONTACTO`. Logs: `../PatyIA/logs/conversaciones`.

Verificación formal: `../verify-api-patyia/` (`npm run verify:api:patyia`).
