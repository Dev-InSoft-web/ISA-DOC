# Añadir un ticket

1. **Fecha y proyecto** — Tomar `fechaSolicitud` y `proyecto` (`PatyIA` o ClientesIS por defecto) del sistema de soporte.
2. **Ruta** — `records/patyia/06/04/TK-1433999.ts` (ejemplo junio día 4).
3. **Exports** — Patrón habitual:
   ```ts
   export async function buildBodyTK1433999(): Promise<string> { … }
   export const bodyTK1433999: Promise<string> = buildBodyTK1433999();
   ```
4. **PG** — `bodyModule` + metadatos vía API lab o `npm run tickets:migrate-store` (ver `docs/STORE.md`). El TS en `records/` genera el HTML; no duplicar el cuerpo en JSON.
5. **Código en el ticket** — `codeBlock` / `cambiosBd.sql` sin comentarios; ver `docs/CODE-FRAGMENTS.md`.
6. **Assets** — Publicar capturas/diagramas en PG (lab-langgraph → `imgbb-asset`). En el builder: `ticketImg("archivo.png")` (placeholder `$archivo.png$` resuelto al renderizar). Sin carpetas locales ni `manifest.json` en ISA-DOC.
7. **Check bitácora** — Clave `tickets.TK-1433999` en revisado (PG vía lab o `data/revisado.json`).

Tickets en borrador sin registro en `index.ts` pueden ir en `records/patyia/_draft/`.
