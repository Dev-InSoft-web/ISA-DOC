# Scripts SQL PatyIA (ISA-DOC)

Ejecutables desde la bitácora (`SqlExecCard` → `/api/patyia/db/exec`) o SSMS (`*-ssms.sql`).

## Convención para agentes

**No usar constraints** al crear tablas nuevas: sin `FOREIGN KEY`, `CHECK`, `UNIQUE` ni defaults en el `CREATE TABLE`. Solo columnas y tipos; relaciones débiles vía código.

**Sin `SELECT` de verificación al final** de scripts `UPDATE` / `DELETE` / `MERGE` en tickets y SqlExec: el lote termina en `COMMIT` (o en el DML pedido). La evidencia va en capturas SSMS o en `select-all-instrucciones.sql` si hace falta consultar el catálogo.

Detalle: `.cursor/rules/patyia-sql-ddl.mdc`.

## Staging

La conexión debe apuntar a **AYUDASCP_IA_STAGING** (`PATY_MSSQL_*` en `lab-langgraph/local.settings.json`). Los scripts no fuerzan `USE` ni `DB_NAME()`.

## Protocolo TK-1433943 (Ultra reforzado)

1. Editar `050-prompts/catalog/Ultra/PROMPT_<TIPO>.md`
2. `node scripts/patyia/prompts/build-paty-prompts-ultra-sql.mjs`
3. **Bitácora PatyIA (2026-06-04):**
   - **PG:** sync automático al abrir TK-1433943 (`POST /api/patyia/prompts/sync-pg`)
   - **MSSQL:** SqlExecCard con candado + modal (sin ejecución automática)
4. CLI `patyia:prompts:ultra:exec` solo para debug local, no operación AT.

Sin FK en MERGE: relaciones débiles; el API anida detalle y omite bloques sin fila enlazada.

## Archivos

| Script | Uso |
|--------|-----|
| `create-conversacion-log.sql` | DDL `CONVERSACION_LOG` (TK-1432903; motor PatyIA escribe CONTENT vía `appendConvTurno`) |
| `add-modelo-instruccion.sql` | Columna `MODELO` en `INSTRUCCION` |
| `update-instruccion-modelo-gpt5-nano.sql` | Calibración masiva `MODELO` |
| `seed-prompts-ultra-tdconsulta.sql` | MERGE prompts Ultra (TK-1433943) |
