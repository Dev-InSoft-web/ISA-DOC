import { fetchTicketsFromStore } from "../../core/lab-api/tickets.js";
import { buildBodyForTicket } from "./lib/bodyRegistry.js";
import type { TicketStoredRecord } from "./stored-types.js";
import type { TicketRegistro } from "./types.js";

let cache: { tickets: TicketRegistro[]; source: "pg" | "static" } | null = null;

export function storedRecordToRegistro(row: TicketStoredRecord): TicketRegistro {
	return {
		id: row.code,
		titulo: row.titulo,
		solicitante: row.solicitante,
		fechaSolicitud: row.fechaSolicitud,
		fechaEntrega: row.fechaEntrega,
		enlace: row.enlace,
		resumen: row.resumen,
		estimacionMinutos: row.estimacionMinutos,
		diligenciaMinutos: row.diligenciaMinutos,
		cambiosExtraMinutos: row.cambiosExtraMinutos,
		extraMinutos: row.extraMinutos,
		extraDescripcion: row.extraDescripcion,
		commits: row.commits,
		cambiosBd: row.cambiosBd,
		normativa: row.normativa,
		festivos: row.festivos,
		noMaquillarFechas: row.noMaquillarFechas,
		proyecto: row.proyecto,
		bodyModule: row.bodyModule,
	};
}

/** Lista tickets: PG si hay lab API y hay filas; si no, registro estático (transición). */
export async function loadTickets(
	refresh = false,
): Promise<{ tickets: TicketRegistro[]; source: "pg" | "static" }> {
	if (!refresh && cache) return cache;
	const fromPg = await fetchTicketsFromStore();
	if (fromPg?.length) {
		cache = { tickets: fromPg.map(storedRecordToRegistro), source: "pg" };
		return cache;
	}
	const { TICKETS } = await import("./staticRegistry.js");
	cache = { tickets: TICKETS, source: "static" };
	return cache;
}

/** Registro estático completo (solo metadatos en bundle inicial; cuerpos vía `resolveTicketBody`). */
export async function loadStaticTickets(): Promise<TicketRegistro[]> {
	const { TICKETS } = await import("./staticRegistry.js");
	return TICKETS;
}

export async function resolveTicketBody(t: TicketRegistro): Promise<string> {
	if (t.body) {
		const b = t.body;
		if (typeof (b as Promise<string>).then === "function") return b;
		return String(b);
	}
	return buildBodyForTicket(t.id, t.bodyModule);
}

export function invalidateTicketsCache(): void {
	cache = null;
}
