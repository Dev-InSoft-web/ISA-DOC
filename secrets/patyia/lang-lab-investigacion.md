# Lang Lab — investigación (Paty IA)

Inventario de **API keys**, **modelos** y **herramientas** usados por `lab-langgraph` (Azure Functions :5500) y scripts `npm run lab:*` en ISA-DOC.

Secretos reales: `secrets/patyia/lab-langgraph.env` (no versionar). Plantilla: `lab-langgraph.env.example`.

---

## Cerebras Inference

| Variable | Uso |
|----------|-----|
| `CEREBRAS_API_KEY`, `CEREBRAS_API_KEY_2` | Dos perfiles/consolas; rotación 1/2 en 429 (como Groq) |
| `CEREBRAS_API_BASE` | Default `https://api.cerebras.ai/v1` |
| SDK | `@cerebras/cerebras_cloud_sdk` — `chat.completions.create({ stream, reasoning_effort, … })` |
| `CEREBRAS_CHAT_MODEL` | RAG / Paty IA si `LAB_CHAT_PROVIDER=cerebras` |
| `CEREBRAS_PROOFREAD_MODEL` | Proofread YouTube (default `zai-glm-4.7`) |
| `PROOFREAD_USE_CEREBRAS` | `true` (default si hay key) — cascada tras Groq |
| `LAB_CHAT_PROVIDER` | `groq` (default) o `cerebras` |

### Modelos (consola vs API)

| Nombre en consola | Model ID | En GET `/v1/models` | Herramientas |
|-------------------|----------|---------------------|--------------|
| OpenAI GPT OSS 120B | `gpt-oss-120b` | Sí | Chat, proofread (alternativa) |
| Z.ai GLM 4.7 | `zai-glm-4.7` | Sí | Chat, proofread (JSON; `reasoning_effort=none`) |
| GPT-OSS 20B | `gpt-oss-20b` | Probar con script | Chat |
| Kimi K2.6 | `kimi-k2.6` | Probar con script | Chat |
| GLM 5.1 | `glm-5.1` | Probar con script | Chat |
| DeepSeek V3.2 | `deepseek-v3.2` | Probar con script | Chat |
| MiniMax M2 | `minimax-m2` | Probar con script | Chat |
| Mistral Large 3 | `mistral-large-3` | Probar con script | Chat |

**No disponible en Cerebras (usar otros proveedores):** Whisper/STT, embeddings, imágenes, batch.

---

## Google AI Studio (Gemini API)

| Variable | Uso |
|----------|-----|
| `GEMINI_API_KEY`, `GEMINI_API_KEY_2` | Dos cuentas AI Studio; rotación en 429 (futuro proofread/RAG) |
| `GEMINI_API_BASE` | Default `https://generativelanguage.googleapis.com/v1beta` |
| `GEMINI_CHAT_MODEL` | Default `gemini-2.5-flash` (si se integra `LAB_CHAT_PROVIDER=gemini`) |

**Free tier (doc):** Flash y Flash-Lite suelen tener cuota gratuita; Pro / previews pueden devolver 429. No usar para STT (Whisper sigue en Groq).

### Modelos objetivo (texto, hola mundo)

| Model ID | Notas |
|----------|--------|
| `gemini-2.5-flash` | Principal recomendado |
| `gemini-2.5-flash-lite` | Más barato / rápido |
| `gemini-2.0-flash`, `gemini-2.0-flash-lite` | **429** en ambas keys (cuota/agotado en free) |
| `gemini-3.1-flash-lite`, `gemini-3.5-flash` | OK hola mundo |
| `gemini-3-flash-preview` | OK (respuesta lenta ~20s) |
| `gemini-flash-latest`, `gemini-flash-lite-latest` | Alias OK |

**Prueba 2026-06-04** (`lab:gemini:test-all -- --free-only --force`): **14/18 OK** (7/9 por key). Mismos resultados en `GEMINI_API_KEY` y `GEMINI_API_KEY_2`. Recomendado para lab: **`gemini-2.5-flash`** o **`gemini-2.5-flash-lite`**.

Excluidos del probe: `*-image*`, `*-tts*`, embeddings, robotics, etc. GET `/v1beta/models` lista **37** modelos con `generateContent` por key.

### Scripts

```bash
npm run lab:gemini:test-all
npm run lab:gemini:test-all -- --modality=image    # gemini-*-image, nano-banana, etc.
npm run lab:gemini:test-all -- --modality=language,tts,audio,other
npm run lab:gemini:test-all -- --delay 3000 --max-429-retries 5
# → data/lab-langgraph/gemini-model-samples/{language,image,tts,...}/ + rate-state.json (RPD)
```

Variables: `GEMINI_PROBE_RPD_PER_KEY` (default 250), `GEMINI_PROBE_DELAY_MS` (2500), `GEMINI_PROBE_MAX_429_RETRIES` (4). Ante 429 espera según API y reintenta.

**Integración proofread/RAG:** pendiente en cascada (slots `proofread` ya en PG).

---

## Arquitectura ISA-DOC ↔ lab-langgraph

**ISA-DOC no guarda API keys** de Groq/Cerebras/Gemini/MiniMax. Solo `secrets/patyia/lab-client.env`:

```env
LAB_LANGGRAPH_URL=http://127.0.0.1:5500
```

**Secretos y orquestación** viven en **lab-langgraph** (`local.settings.json` o `lab-langgraph/secrets/patyia/lab-langgraph.env`).

| Herramienta | Endpoint ISA-DOC consume |
|-------------|---------------------------|
| Whisper STT | `POST /api/tools/whisper/transcribe` `{ audioPath, videoId }` absolutos |
| Proofread | `POST /api/tools/proofread` `{ videoId, corpusJsonPath? }` |
| Estado slots | `GET /api/orchestrator/status` |

```bash
npm run lab:health
npm run lab:yt:whisper-resume
npm run lab:yt:batch-proofread
```

---

## Orquestador lab (lang-langgraph + PostgreSQL)

El servidor **lab-langgraph** (`:5500`) es el orquestador: rotación de API keys, `cooldown_until` por slot en PG (`paty.lab_api_key_slot`), leases en `paty.lab_orchestrator_lease`. Los scripts ISA-DOC envían **rutas absolutas** y consumen la API.

| Variable | Uso |
|----------|-----|
| `LAB_LANGGRAPH_URL` | Default `http://127.0.0.1:5500` |
| `LAB_USE_ORCHESTRATOR` | `true` → Whisper vía API (no pool local) |

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/orchestrator/status` | Slots y cooldowns (`?capability=whisper`) |
| POST | `/api/orchestrator/sync-keys` | Registra keys del `.env` en PG |
| POST | `/api/orchestrator/lease` | Reserva slot (`{ capability, provider? }`) |
| POST | `/api/orchestrator/release` | Libera slot + aplica espera si 429 |
| POST | `/api/youtube/whisper/transcribe` | STT Groq: `{ audioPath, videoId }` absolutos |

### Scripts ISA-DOC

```bash
npm run lab:db:apply-schema          # incluye 003_lab_orchestrator.sql
cd ../lab-langgraph && npm run start # :5500
npm run lab:orchestrator:sync
npm run lab:orchestrator:status -- --capability=whisper
# Whisper resume con orquestador:
# LAB_USE_ORCHESTRATOR=true npm run lab:yt:whisper-resume
```

Capacidades en PG: `whisper` (Groq), `chat` / `proofread` (Groq → Cerebras → Gemini → MiniMax), `embeddings` (HF).

### Scripts Cerebras

```bash
npm run lab:cerebras:test-all
npm run lab:cerebras:test-all -- --force    # todas las keys × todos los modelos
npm run lab:cerebras:test-all -- --stream   # hola mundo con stream SDK
# → data/lab-langgraph/cerebras-model-samples/report.json (por key+modelo)
```

### Cascada proofread (con Cerebras)

`Groq 1/N → 2/N → Cerebras → MiniMax chat → (OpenAI opcional)`

**Reintentos / espera (RPD·RPM·TPM·ASPH):** el módulo `retry-wait` parsea por proveedor:

| Fuente | Pistas usadas |
|--------|----------------|
| Groq | `Please try again in 4m0.5s`, cupo ASPH `Limit/Used/Requested` |
| Cerebras | `x-ratelimit-reset-tokens-minute`, `x-ratelimit-reset-requests-day`, `Retry-After`, tráfico alto |
| MiniMax | mensajes 1002/1008 / rate limit |

Entre proveedores y entre ciclos se espera el **mayor** tiempo inferido (+ margen), no un fijo de 60s si la API indica más.

**Whisper (`whisper-resume`):** no reinicia el tracker de 429 en cada intento; `waitMsForWhisperRetry` combina pista API + escalonado (+30s por intento, tope 5 min) + 90% del promedio histórico de esperas 429. EBUSY: 25s mínimo, sin rotar key. Variables: `WHISPER_RETRY_STEP_MS`, `WHISPER_EBUSY_WAIT_MS`, `WHISPER_MIN_ATTEMPT_GAP_MS`.

---

## Groq

| Variable | Uso |
|----------|-----|
| `GROQ_API_KEY`, `GROQ_API_KEY_2` | Rotación 1/2 y 2/2 |
| `GROQ_CHAT_MODEL` | RAG, Paty, proofread (default) |
| `GROQ_RATE_LIMIT_WAIT_MS` | Fallback si no hay pista `try again in …` |

| Herramienta | Modelo típico |
|-------------|----------------|
| Whisper STT | `whisper-large-v3-turbo` |
| Chat / proofread | `llama-3.3-70b-versatile` |

Scripts: `lab:yt:whisper-resume`, `lab:yt:proofread-resume`, `lab:vectorize:status`.

---

## MiniMax

| Variable | Uso |
|----------|-----|
| `MINIMAX_API_KEY` | `sk-cp-*` (plan) o `sk-api-*` (paygo) |
| `MINIMAX_CHAT_MODEL` | Proofread 3/3 |
| `MINIMAX_API_BASE` | `https://api.minimax.io` |

**STT MiniMax desactivado** en batch; solo Groq Whisper.

Scripts: `lab:yt:test-minimax-all`.

---

## Hugging Face

| Variable | Uso |
|----------|-----|
| `HUGGINGFACE_API_KEY` | Embeddings RAG únicamente |

Modelo: `sentence-transformers/all-MiniLM-L6-v2` (384 dims).

---

## OpenAI (opcional)

| Variable | Uso |
|----------|-----|
| `paty_openai_api_key` / `OPENAI_API_KEY` | Proofread si `allowOpenAi` |
| `OPENAI_PROOFREAD_MODEL` | Default `gpt-4o-mini` |

---

## PostgreSQL / RAG

| Variable | Uso |
|----------|-----|
| `DATABASE_URL` | Render `langlab` |
| `PGVECTOR_COLLECTION` | Colección PGVector |

---

## Matriz rápida por tarea

| Tarea | Proveedor primario | Fallback |
|-------|-------------------|----------|
| Transcripción YouTube | Groq Whisper | Reintentos + espera API |
| Proofread / acentuación | Groq | Cerebras → MiniMax → OpenAI |
| Preguntas RAG FitDocs | Groq o Cerebras (`LAB_CHAT_PROVIDER`) | — |
| Embeddings índice | Hugging Face | — |
| Paty IA conversación | Mismo que RAG | — |
| PDFs gobierno | Scripts locales + ImgBB | — |

---

## Actualizar este documento

1. Tras añadir un proveedor: variables en `lab-langgraph.env.example` + fila aquí.
2. Tras probar modelos: `npm run lab:cerebras:test-all` o `lab:yt:test-minimax-all` y revisar `data/lab-langgraph/*/report.json`.
3. `GET /v1/models` de cada API para marcar `verifiedApi` en catálogos TS (`cerebras-config.ts`, `minimax-models-catalog.ts`).
