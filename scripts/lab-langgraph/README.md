# Scripts lab-langgraph (ISA-DOC)

Orquestación de corpus y operaciones sobre **`../lab-langgraph/data/vectorize/`**. La lógica de runtime vive en lang-lab (`npm run build`); estos scripts batch leen/escriben corpus en el repo del lab (sin API keys en ISA-DOC).

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `_shared/` | Cliente HTTP a lang-lab (`LAB_LANGGRAPH_URL`), rutas corpus — **sin API keys** |
| `youtube/lib/` | Corpus paths, fetch, dedupe, RAG, MD |
| `youtube/whisper/` | Groq Whisper fallback |
| `youtube/scripts/` | Entradas `npm run lab:yt:*` |
| `government/lib/` | Crawl, paths, PDF→MD, ImgBB |
| `government/seeds/` | `government-seeds.json` |
| `government/scripts/` | Entradas `npm run lab:gov:*` |
| `rag/` | Indexación PGVector (YouTube + web) |
| `db/` | Schema PostgreSQL lab |
| `patyia/` | Sync prompts / migración MSSQL→PG |
| `docs/` | Notas para sesiones futuras |

## Corpus YouTube

| npm | Script |
| --- | --- |
| `lab:yt:transcripts` | `youtube/scripts/fetch-contapyme-channel-transcripts.mts` |
| `lab:yt:organize-by-year` | `youtube/scripts/reorganize-youtube-by-year.mts` |
| `lab:yt:batch-punctuation` | `youtube/scripts/batch-youtube-accentuation-punctuation.mts` (API :5500) |
| `lab:yt:whisper-fallback` | `youtube/scripts/whisper-fallback.mts` |
| `lab:yt:whisper-resume` | `youtube/scripts/whisper-resume.mts` |
| `lab:yt:backfill-accentuation` | `youtube/scripts/backfill-accentuation-flag.mts` |
| `lab:yt:proofread` | `youtube/scripts/proofread-youtube-corpus.mts` |
| `lab:yt:repunctuate` | `youtube/scripts/repunctuate-youtube-corpus.mts` |
| `lab:yt:index-rag` | `rag/index-youtube-corpus.mts` |

Whisper / proofread: consumen **solo** la API en `:5500` (orquestador PG en lang-lab). ISA-DOC: `secrets/patyia/lab-client.env` con `LAB_LANGGRAPH_URL`. Keys en `lab-langgraph/secrets/patyia/lab-langgraph.env`. Requiere `ffmpeg` y `python -m yt_dlp` para audio.

Inventario de modelos (Gemini / Cerebras / MiniMax): `lab-langgraph/testing/` — `npm run test:gemini:all`, etc.

## Corpus web / gov

| npm | Script |
| --- | --- |
| `lab:gov:fetch` | `government/scripts/fetch-government-corpus.mts` |
| `lab:gov:reorganize` | `government/scripts/reorganize-government-corpus.mts` |
| `lab:gov:convert-pdfs` | `government/scripts/convert-government-pdfs.mts` |
| `lab:gov:index-rag` | `rag/index-web-corpus.mts` |

## PostgreSQL (PatyIA lab)

| npm | Script |
| --- | --- |
| `lab:db:apply-schema` | `db/db-apply-schema.mts` |
| `lab:patyia:sync-prompts` | `patyia/sync-patyia-prompts-to-pg.mts` |
| `lab:patyia:migrate-mssql-to-pg` | `patyia/migrate-patyia-mssql-to-pg.mts` |

## Servidor

```powershell
cd ../lab-langgraph
npm run build
npm run start
```

Puerto **5500**. Secretos del servidor: `lab-langgraph/secrets/patyia/lab-langgraph.env` (o `local.settings.json`).
