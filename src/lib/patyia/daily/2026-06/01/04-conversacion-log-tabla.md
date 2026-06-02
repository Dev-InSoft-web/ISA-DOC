# CONVERSACION_LOG (DDL · staging)



Tabla en **AYUDASCP_IA_STAGING** para persistir, en un futuro TK, el JSON de métricas por conversación (mismo esquema que `conv-*.json` en PatyIA). **Solo creación de tabla**; sin carga ni relleno de filas.



- **SqlExec:** `create-conversacion-log.sql` — conexión a `AYUDASCP_IA_STAGING`, idempotente, sin constraints.
- **Agentes:** regla fija en `.cursor/rules/patyia-sql-ddl.mdc` y `src/lib/patyia/sql/README.md`.

- **SSMS:** `create-conversacion-log-ssms.sql`.

- **PatyIA:** integración pendiente de ticket.


