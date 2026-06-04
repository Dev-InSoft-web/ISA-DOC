# Whisper fallback (solo Groq)

Videos sin subtítulos VTT: descarga MP3 (`youtube/lib/audio-download.ts`) y transcribe con `whisper-large-v3-turbo` en **Groq**.

MiniMax **no** se usa para STT (no hay API de transcripción en `api.minimax.io`). `MINIMAX_API_KEY` sigue activa para **proofread** (chat).

## Env

- `GROQ_API_KEY`, `GROQ_API_KEY_2` (o `GROQ_API_KEYS` separadas por coma)
- `YT_DLP_COOKIES_BROWSER=chrome` si YouTube bloquea audio

## Orden de proveedores (2 rutas)

Ante **429** en Groq: **sin espera** — rotación de key:

1. **`1/2`** — `GROQ_API_KEY`
2. **`2/2`** — `GROQ_API_KEY_2`

Si ambas keys están en 429: **espera adaptada** (mín. 60 s + promedio en `whisper-stats.json`) y reintento desde `1/2`.

## Reintentos

1. **No avanza** al siguiente video hasta guardar transcripción.
2. Cada reintento rota Groq `1/2 → 2/2` (y vuelta a `1/2` tras espera de cuota).
3. `lab:yt:whisper-resume` — bucle hasta vaciar pendientes.

Log: `whisper-fallback.log` · estadísticas: `whisper-stats.json`  
Tras cada OK imprime la transcripción completa con timestamps en consola.
