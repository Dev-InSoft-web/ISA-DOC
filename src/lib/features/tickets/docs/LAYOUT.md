# Layout de `features/tickets`

## Árbol

```
tickets/
  index.ts              # API pública (loadTickets, getTicketHtml)
  staticRegistry.ts     # TICKETS[] legacy (fallback sin PG)
  ticketStore.ts        # Carga desde entity store
  types.ts              # TicketRegistro, TicketCommit, …
  README.md
  docs/                 # Convenciones (LAYOUT, STORE, CODE-FRAGMENTS, …)
  lib/                  # Plantilla, snippets, imgbb, visor
  records/
    clientesis/{MM}/{DD}/TK-*.ts
    patyia/{MM}/{DD}/TK-*.ts
    patyia/_draft/      # Borradores no registrados en index
  assets/
    _meta/              # code-imgs.json (snippets de código → imgbb)
```

## Proyecto

| Carpeta `records/` / `assets/` | Cuándo |
| --- | --- |
| `clientesis` | Capacitación, ISW, ISP-ClientesIS (default si no hay `proyecto: "PatyIA"`) |
| `patyia` | `proyecto: "PatyIA"` en `index.ts` |

La fecha de carpeta sale de `fechaSolicitud` del ticket (`05/may./2026` → `05/05`).

## Nuevo ticket

1. Crear `records/{proyecto}/{MM}/{DD}/TK-XXXXX.ts` (y `-sql.ts` si aplica).
2. Importar helpers desde `../../../../lib/...` (cuatro niveles desde `DD`).
3. Persistir metadatos en PG (`PUT /api/entity/isa-doc/tickets/ticket/{code}`) o migración; opcional entrada en `staticRegistry.ts` solo si se necesita fallback offline.
4. En PG, campo `bodyModule` = ruta relativa bajo `records/` (ej. `patyia/06/04/TK-1433943`).
5. Evidencias en PG (`imgbb-asset`); referenciar con `ticketImg("nombre.png")` en el builder.
6. Diligenciar según `.cursor/skills/diligenciar-tickets/SKILL.md`.

## Scripts

| Comando | Uso |
| --- | --- |
| `node scripts/tickets/refolder-tickets.mjs` | Reorganización masiva (mantenimiento) |
| `npm run tickets:migrate-store` | Metadatos TICKETS → PG (lab-langgraph) |
| `node scripts/tickets/fix-ticket-imports.mjs` | Regenerar imports en `staticRegistry.ts` (legacy) |
| lab `imgbb:migrate-map` / API upload | Subir capturas → PG `imgbb-asset` |
| lab `tickets:migrate-mermaid` | Publicar `.mmd` → imgbb (fuente en PG, no en ISA-DOC) |
| `npm run code-images:build` | Snippets de código → `_meta/code-imgs.json` (imgbb) |
