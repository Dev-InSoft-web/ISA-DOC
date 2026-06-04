> **Lab LangGraph** · Corpus YouTube para RAG (no es PatyIA producción).

# Corpus YouTube · un archivo por video

Cada video del canal [ContaPyme Software Contable](https://www.youtube.com/@ContaPymeSoftwareContable/videos) se materializa en **ISA-DOC** con metadatos completos; el **join** (`corpus.md`) se usa después para embedding en `lab-langgraph`.

## Por video (obligatorio)

| Archivo | Contenido |
| --- | --- |
| `videos/{id}.md` | Documento legible: YAML frontmatter, identificación, métricas, descripción, tags, técnica, comentarios (muestra), transcripción con timestamps y texto plano |
| `videos/{id}.json` | Registro estructurado `schemaVersion: 2` (RAG, scripts, HF) |
| `videos/{id}.info.json` | Dump **crudo** de yt-dlp (todos los campos que expone el extractor) |

## Join (embedding)

| Archivo | Uso |
| --- | --- |
| `corpus.md` | Concatenación resumida de todos los videos OK (métricas + transcripción) |
| `manifest.json` | Índice: estado, vistas, likes, comentarios, rutas |

Ruta base: `data/lab-langgraph/vectorize/youtube/contapyme-software-contable/` (local; carpeta en `.gitignore` para no inflar el repo).

## Fuentes de datos

| Fuente | Qué aporta |
| --- | --- |
| **yt-dlp** | Lista del canal, `info.json` (título, descripción, duración, vistas, likes, tags, categorías, formatos/códecs, miniaturas, capítulos, comentarios hasta `--max-comments`) |
| **oEmbed** | Título/autor/thumbnail alternativos |
| **VTT** (yt-dlp) | Transcripción con marcas de tiempo |

No se descarga el MP4. Los comentarios dependen de YouTube (pueden ser 0 si el video no tiene o la API no devuelve).

### API opcional (futuro)

Con `YOUTUBE_API_KEY` (Google Cloud) se podrían añadir analíticas no públicas; hoy **no** es necesaria: yt-dlp + oEmbed cubren el caso de corpus documental.

## Comandos

```powershell
cd ISA-DOC
npm run lab:yt:transcripts -- --limit 3
npm run lab:yt:transcripts              # ~1021 videos, reanudable
npm run lab:yt:transcripts -- --no-comments --delay 800   # más rápido sin comentarios
```

Requisito: `pip install yt-dlp`.

## RAG (citas con enlace al momento del video)

Indexar **un chunk por segmento** del `.json` (no el bloque `plainText` del `.md`, que concatena texto y repite frases).

| Metadata | Valor |
| --- | --- |
| `source` | `youtube:{videoId}` |
| `page` | Marca de tiempo del segmento (ej. `0:03.560`) |
| `startMs` | Milisegundos para `&t=` |
| `videoUrl` | `https://www.youtube.com/watch?v={id}` |

Enlace de cita: `https://www.youtube.com/watch?v={id}&t={floor(startMs/1000)}s`

### Pipeline RAG (recomendado)

| Paso | Comando |
| --- | --- |
| 1. Corpus | `npm run lab:yt:transcripts` (dedupe v3 en cada `.json`) |
| 2. Re-dedupe masivo | `npm run lab:yt:rededupe` (opcional) |
| 3. Indexar PGVector | `npm run lab:yt:index-rag` desde ISA-DOC |

Cada **segmento** del JSON → un embedding con `startMs` → cita con `watch?v={id}&t=Ns`.

No indexar el bloque `plainText` del `.md` (concatena frases); usar `transcript.segments`.

```powershell
cd ISA-DOC
npm run lab:yt:index-rag
# API (lab en :5500): POST http://127.0.0.1:5500/api/index/youtube?replace=true
```

`YOUTUBE_CORPUS_VIDEOS_DIR` → ruta a `videos/` si no está en la ruta por defecto.

En `/api/ask`, cada fuente devuelve `url`; el chat muestra **Abrir en YouTube** al instante citado.
