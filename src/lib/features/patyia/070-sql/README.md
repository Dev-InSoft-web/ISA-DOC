# Scripts SQL PatyIA (ISA-DOC)

Ejecutables desde la bitácora (`SqlExecCard` → `/api/patyia/db/exec`) o SSMS (`*-ssms.sql`).

## Convención para agentes

**No usar constraints** al crear tablas nuevas: sin `FOREIGN KEY`, `CHECK`, `UNIQUE` ni defaults en el `CREATE TABLE`. Solo columnas y tipos; relaciones débiles vía código.

**Sin `SELECT` de verificación al final** de scripts `UPDATE` / `DELETE` / `MERGE` en tickets y SqlExec: el lote termina en `COMMIT` (o en el DML pedido). La evidencia va en capturas SSMS o en `select-all-instrucciones.sql` si hace falta consultar el catálogo.

Detalle: `.cursor/rules/patyia-sql-ddl.mdc`.

## Staging

La conexión debe apuntar a **AYUDASCP_IA_STAGING** (`paty_namedb` en `.env`). Los scripts no fuerzan `USE` ni `DB_NAME()`.

## Archivos

| Script | Uso |
|--------|-----|
| `create-conversacion-log.sql` | DDL `CONVERSACION_LOG` (TK-1432903; motor PatyIA escribe CONTENT vía `appendConvTurno`) |
| `add-modelo-instruccion.sql` | Columna `MODELO` en `INSTRUCCION` |
| `update-instruccion-modelo-gpt5-nano.sql` | Calibración masiva `MODELO` |
| `seed-prompts-ultra-tdconsulta.sql` | MERGE prompts Ultra |
