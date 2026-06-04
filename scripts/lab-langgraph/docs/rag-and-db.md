# RAG index y PostgreSQL

## Index

- `rag/index-youtube-corpus.mts` — chunks YouTube → PGVector
- `rag/index-web-corpus.mts` — chunks government → PGVector

Requieren `lab-langgraph` compilado (`_shared/ensure-lab-build.mts`) y API/local settings.

## DB

- `db/db-apply-schema.mts` — schema `langlab` en Render
- `patyia/sync-patyia-prompts-to-pg.mts` — prompts ISA-DOC → PG
- `patyia/migrate-patyia-mssql-to-pg.mts` — migración puntual (ver `patyia/README-migrate-patyia-pg.md`)

Secretos: `secrets/patyia/lab-langgraph.env` (`DATABASE_URL`, etc.).
