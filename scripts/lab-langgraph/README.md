# Scripts lab-langgraph (ISA-DOC)

Orquestación de corpus y operaciones sobre `data/lab-langgraph/`. La lógica de runtime vive en **`../lab-langgraph`** (`npm run build`); estos scripts coordinan datos y tareas batch.

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `_shared/` | Raíz ISA-DOC, env, build lab, Groq + MiniMax API keys |
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

Whisper / proofread: secretos en `secrets/patyia/lab-langgraph.env` — `GROQ_API_KEY`, `GROQ_API_KEY_2`, `MINIMAX_API_KEY` (rotación 1/3→2/3→3/3). Ver `docs/whisper-groq.md`. Requiere `ffmpeg` y `python -m yt_dlp` para audio.

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

Puerto **5500**. Secretos: `ISA-DOC/.env` y `secrets/patyia/lab-langgraph.env`.
