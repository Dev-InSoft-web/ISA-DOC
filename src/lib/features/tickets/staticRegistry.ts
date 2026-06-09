/**
 * Registro estático vacío: metadatos en PG (lab-langgraph / isa-doc/tickets/ticket).
 * Snapshot de respaldo: lab-langgraph/data/tickets/ticket-registry.snapshot.json
 */
import type { TicketRegistro } from "./types.js";

/** @deprecated Usar `loadTickets()` (PG). Solo fallback offline sin lab API. */
export const TICKETS: TicketRegistro[] = [];
