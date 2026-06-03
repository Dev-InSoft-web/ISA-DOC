> **Lab LangGraph** · Volatilidad de Azure Functions — no aplica al runtime PatyIA (`AYUDASCP-IA`) salvo conceptos genéricos de serverless.

# Volatilidad y límites (FitDocs RAG)

El servicio **no guarda estado en memoria** entre peticiones (a diferencia del Streamlit del tutorial). Lo persistente va a **PostgreSQL + pgvector** en Render.

## Qué es delicado

| Área | Riesgo | Mitigación en lab |
| --- | --- | --- |
| Estado en RAM | Workers distintos; no hay `session_state`. | Vector store solo en PG; chat UI en `sessionStorage`. |
| Pool `pg` | Singleton vive solo mientras el worker. | `max: 2`, timeouts; worker puede reciclarse. |
| `/tmp` | No compartido ni durable. | PDFs en memoria (`loadPdfFromBuffer`). |
| Timeout | Consumption ~5 min (host.json hasta 10 min en planes altos). | Trocear PDFs o subir plan. |
| Body HTTP | Límite por plan. | Evitar muchos PDFs grandes en un POST. |
| Cold start | Primera petición lenta. | `GET /api/health` para calentar. |
| Concurrencia | Dos `index` pueden intercalar DELETE + add. | Serializar en producción o usar cola. |
| CORS | Front en otro origen. | Cabeceras en funciones; `func start --cors "*"`. |
| Secretos | `local.settings.json` no se despliega. | Application Settings en Azure. |

## Endpoints y efectos

- `POST /api/index` — Pesado (embeddings + PG). Por defecto reemplaza índice.
- `POST /api/ask` — Lee PG + LLM.
- `DELETE /api/reset` — Borra filas vectoriales.
- `GET /api/documents` — Solo lectura.

## Front estático

`frontend/` no sincroniza historial con el servidor; solo `sessionStorage` en el navegador.

Copia canónica en repo: `lab-langgraph/VOLATILIDAD-AZURE.md`.
