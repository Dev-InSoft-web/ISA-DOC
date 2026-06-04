# Whisper fallback (Groq + MiniMax)

Videos sin subtítulos VTT: descarga MP3 (`youtube/lib/audio-download.ts`) y transcribe con `whisper-large-v3-turbo` (Groq) o fallback MiniMax.

## Env

- `GROQ_API_KEY`, `GROQ_API_KEY_2` (o `GROQ_API_KEYS` separadas por coma)
- `MINIMAX_API_KEY` — tercera ruta ante 429 en ambas keys Groq  
  - **Token Plan / suscripción:** Subscription Key `sk-cp-*` en [Plan details](https://platform.minimax.io/console/plan)  
  - **Pay-as-you-go:** API Key `sk-api-*` en [Access](https://platform.minimax.io/console/access) + saldo en Balance  
  - No son intercambiables ([Token Plan](https://platform.minimax.io/docs/token-plan/intro))
- `MINIMAX_API_BASE` — default `https://api.minimax.io`
- `MINIMAX_STT_API_BASE` — base STT si difiere (p. ej. gateway compatible AIML)
- `MINIMAX_STT_MODEL` — default `whisper-large`
- `MINIMAX_STT_MODE` — `auto` (default: API STT → multimodal si falla), `api`, o `multimodal`
- `WHISPER_AFTER_MINIMAX_MS` — pausa tras MiniMax antes de reintentar Groq (default `30000`)
- `YT_DLP_COOKIES_BROWSER=chrome` si YouTube bloquea audio

## Orden de proveedores (3 rutas)

Ante **429** en Groq: **sin espera** — solo cambio de ruta:

1. **`1/3`** — `GROQ_API_KEY`
2. **`2/3`** — `GROQ_API_KEY_2`
3. **`3/3`** — `MINIMAX_API_KEY` (si está configurada)

Tras intentar MiniMax (éxito parcial o fallo): **espera 30 s** (`WHISPER_AFTER_MINIMAX_MS`) y **reinicio en `1/3` Groq**.

Si no hay `MINIMAX_API_KEY` y ambas keys Groq están en 429: espera adaptada (mín. 60 s + promedio en `whisper-stats.json`).

Los chunks Groq no esperan entre keys: tras agotar Groq suben al router (MiniMax o espera solo sin MiniMax).

**Nota:** La API pública de MiniMax (`api.minimax.io`) no expone `/v1/stt/create` ni `/v1/audio/transcriptions`. Los créditos de suscripción audio suelen ser para **TTS**. Para STT hace falta `MINIMAX_STT_API_BASE` compatible o saldo de tokens para `MINIMAX_STT_MODE=multimodal`.

## 429 y reintentos

1. **No avanza** al siguiente video hasta guardar transcripción.
2. Groq: rotación inmediata `1/3 → 2/3 → 3/3` sin pausa.
3. Tras MiniMax: 30 s y vuelta a Groq `1/3`.
4. `lab:yt:whisper-resume` — bucle hasta vaciar pendientes.

Log: `whisper-fallback.log` · estadísticas: `whisper-stats.json`  
Tras cada OK imprime la transcripción completa con timestamps en consola.  
Cada llamada a Groq imprime el JSON `verbose_json` recibido (por chunk de audio).
