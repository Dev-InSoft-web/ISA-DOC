# Migración puntual SSMS → PG (solo ISA-DOC, no lab-langgraph)

El repo **lab-langgraph** no toca SQL Server. Este script de operaciones vive aquí si necesitas volcar histórico de `AYUDASCP_IA` a PostgreSQL (`schema paty`).

Prerrequisitos:

1. `npm run lab:db:apply-schema && npm run lab:patyia:sync-prompts` (desde ISA-DOC)
2. `DATABASE_URL` en `ISA-DOC/.env` o `lab-langgraph/local.settings.json`
3. Credenciales Paty en `.env`: `paty_server`, `paty_user`, `paty_password`, `paty_namedb`

```powershell
cd ISA-DOC
npm run lab:patyia:migrate-mssql-to-pg -- --dry-run
npm run lab:patyia:migrate-mssql-to-pg
```
