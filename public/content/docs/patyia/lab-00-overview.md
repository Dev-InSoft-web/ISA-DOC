> **Bloque Lab LangGraph** — Experimento independiente de **PatyIA producción** (`AYUDASCP-IA`).
> No comparte código, base MSSQL ni Vector Storage de OpenAI con el asistente Paty.
> Repo: `Contapyme/lab-langgraph` · BD: PostgreSQL Render (`langlab`).

# Lab LangGraph · Visión del experimento

**FitDocs RAG** replica el flujo del tutorial [FitDocs IA (YouTube)](https://www.youtube.com/watch?v=0G2kLZeFHbc) (Streamlit + LangChain + Chroma), portado a:

| Capa | Tecnología |
| --- | --- |
| API | Azure Functions v4 (TypeScript) |
| RAG | LangChain.js + embeddings OpenAI |
| Vector store | **PGVector** en PostgreSQL (Render), no Chroma ni file-search de Paty |
| UI de prueba | `lab-langgraph/frontend/` (HTML/CSS/JS) |
| API local | `http://localhost:5500/api` (no usa 7071 de PatyIA) |

## Diferencia con PatyIA (producción)

| | **PatyIA** | **Lab LangGraph** |
| --- | --- | --- |
| Proyecto | `AYUDASCP-IA` | `lab-langgraph` |
| Persistencia | Azure SQL `AYUDASCP_IA` | PostgreSQL Render |
| RAG | OpenAI Vector Storage + asistente | PGVector + retriever local |
| Auth | DSCLIENTES / JWT | Sin auth (lab) |
| Cliente | Portal de Clientes | Front estático de experimento |

## Secciones de este bloque (solo lab)

Usa el menú lateral bajo **Lab LangGraph**:

1. **Lab · API y operación** (`lab-01-fitdocs-rag`) — API, arranque local, credenciales.
2. **Lab · Volatilidad Azure Fn** (`lab-02-volatilidad-azure`) — Límites y comportamiento delicado en Azure Functions.
3. **Lab · Corpus YouTube** (`lab-03-youtube-corpus`) — Transcripciones del canal ContaPyme (`lab-langgraph/data/vectorize/`).

## Secretos

| Repo | Archivo | Contenido |
| --- | --- | --- |
| **ISA-DOC** | `secrets/patyia/lab-client.env` | Solo `LAB_LANGGRAPH_URL` (scripts batch llaman al servidor) |
| **lab-langgraph** | `secrets/patyia/lab-langgraph.env` o `local.settings.json` | API keys (Groq, MiniMax, Cerebras, Gemini, …) |

Pruebas de inventario por proveedor: `lab-langgraph/testing/data/*-model-samples` — ver `testing/README.md` en el repo del lab.

En el repo del lab: plantilla `local.settings.json.example`.
