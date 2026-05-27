# OpenAI Storage local

Backup y metadatos enriquecidos para Files / Vector Stores / Skills usados por PatyIA.

## Estructura

```
data/openai-storage/
   files/<file_id>/
      meta.json     # snapshot de /v1/files/{id}
      local.json    # categorías, tags, descripción, notas (NO va a OpenAI)
      content.<ext> # backup binario/textual (ignorado por git)
   vector-stores/<vs_id>/
   skills/<skill_id>/
```

`local.json` es el cerebro local — añade información que la API no almacena (categorías, equipo responsable, notas de actualización, etc.).
