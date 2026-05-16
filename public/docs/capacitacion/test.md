# Verificación de la API de Capacitación

Suite TypeScript que ejerce los endpoints CRUD/L del módulo de capacitación expuestos por **ISS-ClientesIS-ContaPymeU** y valida respuestas anidadas (driver + atributos), orden jerárquico de planes, etc.

## Estructura

```
scripts/verify-api/
├── verify_api.ts              # Entry point: redirige stdout/err a logs/out<fecha>_<hora>.txt
├── run.ts                     # Orquesta toda la corrida
├── config.ts                  # baseUrl, reintentos, ruta de token
├── http.ts                    # Cliente HTTP con auth + reintentos (undici keep-alive)
├── helpers.ts                 # filtroB64, unwrap, comparadores
├── state.ts                   # Estado compartido entre fases
├── entities.ts                # CRUL genérico (Driver, Curso, PlanEstudio…)
├── curso.ts                   # POST curso con anidación rica
├── planOrder.ts               # Verifica orden jerárquico de iplan
├── capacitacion.ts            # Verificar / consolidar / recodificar
├── runs/
│   └── run_plan_order.ts      # Corrida focalizada de planOrder
├── postman/
│   ├── generate_postman_items.ts
│   └── items.json
└── logs/                      # Salidas de corridas (out*.txt)
```

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `VERIFY_API_BASE_URL` | `http://localhost:20040` | URL base de la API |
| `VERIFY_API_TOKEN` | — | JWT (alternativa a `token.json`) |
| `VERIFY_API_REQUEST_RETRIES` | `5` | Reintentos por request |
| `VERIFY_API_REQUEST_RETRY_DELAY_MS` | `350` | Delay base entre reintentos |
| `VERIFY_API_LIST_EXTRA_RETRIES` | `3` | Reintentos extra en listados |
| `VERIFY_API_FETCH_KEEPALIVE` | `1` | `0` desactiva undici keep-alive |
| `VERIFY_API_PLAN_ORDER_ICURSO` | — | ICURSO extra para validar orden |
| `VERIFY_API_PLAN_ORDER_LOG` | `1` | `0` desactiva log a archivo |
| `VERIFY_API_RELAX_DUPLICAR` | `1` | Tolera fallo `IUSUARIOCRE_OLD` |
| `VERIFY_API_RELAX_CATALOG_MUTATIONS` | `1` | Tolera errores en consolidar/recodificar |
| `VERIFY_API_RELAX_DRIVER_ATTR_SYNC` | `1` | Acepta verificación parcial de atributos |
| `VERIFY_API_RELAX_PLANESTUDIO_POST` | `1` | Continúa flujo si POST plan/estudio no aplica |

## Token

`http.ts` carga el JWT desde:
1. `VERIFY_API_TOKEN` (env), o
2. `scripts/verify-api/token.json` con la forma `{ "token": "<JWT>" }`.

> ⚠️ **No commitear `token.json`**: agregar al `.gitignore`.

## Ejecución (npm scripts)

```powershell
# Corrida completa
npm run verify:api

# Solo orden de planes para uno o varios cursos
npm run verify:plan-order -- CURSOTEST CP40MOD610

# Regenerar items.json de Postman
npm run postman:gen
```

Logs en `scripts/verify-api/logs/out<YYYYMMDD>_<HHMMSS>.txt`.

## Cobertura

- **CRUL básico:** Driver, Curso, PlanEstudio.
- **Anidación POST:** Driver con `atributos` (901–904) en una sola llamada.
- **Orden de planes:** `testPlanescursoOrderForCurso` — orden jerárquico numérico de `iplan` (`20 < 20.50 < 20.100`).
- **Cleanup:** `cleanupAll` deja la BD limpia al terminar.

> Nota: los catálogos `tema`, `permiso`, `curso/prerequisito`, `curso/estructura`, `curso/seguridad`, `plan/estudio/curso`, `plan/estudio/atributo`, `plan/curso` y `driver/atributo` (alta directa) ya no están expuestos por la API. Su lógica permanece en `capacitacion.ts` por compatibilidad histórica pero `run.ts` no la invoca.
