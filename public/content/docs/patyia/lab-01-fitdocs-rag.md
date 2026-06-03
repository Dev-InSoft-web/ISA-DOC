> **Lab LangGraph** · FitDocs RAG — no es documentación del microservicio PatyIA.

# FitDocs RAG — API y operación

Experimento TypeScript: subir PDFs, indexar con embeddings y chatear con RAG.

## Repositorio

`Contapyme/lab-langgraph`:

- **Backend:** `src/functions/` (`health`, `index`, `ask`, `documents`, `reset`)
- **Front de prueba:** `frontend/` (HTML/CSS/JS)
- **README del repo:** `lab-langgraph/README.md`

## Base de datos (Render · solo lab)

| Campo | Valor |
| --- | --- |
| Host interno | `dpg-d8g48b4p3tds738kr070-a` |
| Host externo | `dpg-d8g48b4p3tds738kr070-a.oregon-postgres.render.com` |
| Puerto | `5432` |
| Base | `langlab` |
| Usuario | `langlab_user` |

Credenciales: `secrets/patyia/lab-langgraph.env`.

- **Azure Functions / local fuera de Render:** URL **externa**.
- **Servicios en Render:** URL **interna**.

## Arranque local

```powershell
cd C:\Users\JAGUDELOE\Documents\Contapyme\lab-langgraph
copy local.settings.json.example local.settings.json
# GROQ_API_KEY + HUGGINGFACE_API_KEY + DATABASE_URL (o leer desde ISA-DOC/.env)
npm install
npm run build
func start --cors "*"
```

API: `http://localhost:5500/api` (puerto **5500** en `local.settings.json` → `Host.LocalHttpPort`; PatyIA/ISA-DOC usan 7071).

Front:

```powershell
npx --yes serve C:\Users\JAGUDELOE\Documents\Contapyme\lab-langgraph\frontend -p 5173
```

Ajustar `frontend/config.js` si cambia el host de la Function App.

## API HTTP

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/api/health` | Estado |
| POST | `/api/index` | PDFs `multipart/form-data` (`?replace=false` para añadir) |
| POST | `/api/ask` | `{ "question": "...", "k": 4 }` |
| GET | `/api/documents` | Fuentes indexadas |
| DELETE | `/api/reset` | Vacía embeddings |

## Application Settings (Azure)

- `DATABASE_URL` — External URL Render
- `GROQ_API_KEY` · `HUGGINGFACE_API_KEY`
- `PGVECTOR_COLLECTION` — opcional (`fitdocs_v2`)
- `DATABASE_SSL` — `true`
