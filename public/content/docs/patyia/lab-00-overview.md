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
3. **Lab · Corpus YouTube** (`lab-03-youtube-corpus`) — Transcripciones del canal ContaPyme para vectorizar (`data/lab-langgraph/vectorize/`).

## Secretos (ISA-DOC)

Archivo local (no versionar): `secrets/patyia/lab-langgraph.env`  
Plantilla: `secrets/patyia/lab-langgraph.env.example` (`GROQ_API_KEY`, `GROQ_API_KEY_2`, `MINIMAX_API_KEY`, `HUGGINGFACE_API_KEY`)

La misma `MINIMAX_API_KEY` alimenta Whisper (STT, ruta 3/3) y proofread LangGraph en **ISA-DOC** y **lab-langgraph**.

En el repo del lab: `lab-langgraph/local.settings.json` (también gitignored; ver `local.settings.json.example`).
