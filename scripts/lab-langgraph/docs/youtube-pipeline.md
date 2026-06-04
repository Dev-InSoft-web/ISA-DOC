# Pipeline YouTube (ContaPyme)

## Datos

`data/lab-langgraph/vectorize/youtube/contapyme-software-contable/`

- `videos|shorts|streams/{año}/{videoId}.json|.md`
- `manifest.json`, `corpus.md`, `fetch-cache/`, `subs-cache/`, `audio-cache/`

## Orden típico

1. `lab:yt:transcripts` — yt-dlp + VTT
2. `lab:yt:organize-by-year` — si hay JSON planos legacy
3. `lab:yt:rededupe` / `lab:yt:enrich-descriptions` — mantenimiento
4. `lab:yt:whisper-resume` — videos sin subs (`segmentCount === 0`)
5. `lab:yt:batch-proofread` / `lab:yt:proofread-resume` — LangGraph (Groq → MiniMax), tildes/marcas
6. `lab:yt:batch-punctuation` — requiere API :5500 (sin LLM)
7. `lab:yt:index-rag` — PGVector

## Utilidades

- `restore-video-from-vtt.mts` — un `videoId` desde subs-cache
- `strip-channel-followers.mts` — limpia ruido en MD
