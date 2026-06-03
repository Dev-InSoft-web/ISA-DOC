# PatyIA (`src/lib/features/patyia`)

Feature PatyIA dentro de la arquitectura Bulletproof de `src/lib`. Capas numeradas al estilo INSOFT:

| Carpeta | Contenido |
|---------|-----------|
| `010-config/` | Estado URL (`stateB64`, `urlState`), persistencia local, defaults de `system-prompts.json` |
| `020-api/` | Endpoints locales, token, caches, esquema SQL Paty |
| `030-conversacion/` | Modelos POST, logs de conversación, input visión |
| `040-openai/` | API key, pricing, backup/storage de archivos OpenAI |
| `050-prompts/` | Catálogo `.md` (`catalog/`), utilidades de prompts |
| `060-bitacora/` | Diario de avance (`daily/`) |
| `070-sql/` | Scripts DDL/DML para AYUDASCP_IA |
| `080-lab-langgraph/` | Enlace al experimento FitDocs RAG (`lab-langgraph`, no producción) |
