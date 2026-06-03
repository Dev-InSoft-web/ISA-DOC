# 080 · Lab LangGraph (FitDocs RAG)

Experimento **separado** de PatyIA producción (`AYUDASCP-IA`).

| | PatyIA | Lab LangGraph |
| --- | --- | --- |
| Repo | ClientesIS / AYUDASCP-IA | `Contapyme/lab-langgraph` |
| BD | Azure SQL `AYUDASCP_IA` | PostgreSQL Render `langlab` |
| RAG | OpenAI Vector Storage | PGVector + LangChain.js |

- Documentación ISA-DOC: `public/content/docs/patyia/lab-*.md` (menú **Lab LangGraph**).
- Secretos: `secrets/patyia/lab-langgraph.env`.
- Código y `VOLATILIDAD-AZURE.md`: repo `lab-langgraph`.
- API local: **puerto 5500** (`Host.LocalHttpPort`); PatyIA/ISA-DOC siguen en **7071**.
- Corpus YouTube (transcripciones con timestamps): `data/lab-langgraph/vectorize/` · `npm run lab:yt:transcripts` (ver doc `lab-03-youtube-corpus`).
