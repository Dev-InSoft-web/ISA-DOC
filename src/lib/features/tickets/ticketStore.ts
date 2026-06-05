import { fetchTicketsFromStore, ticketsStoreEnabled } from "../../core/lab-api/tickets.js";
import { buildBodyForTicket } from "./lib/bodyRegistry.js";
import type { TicketStoredRecord } from "./stored-types.js";
import type { TicketRegistro } from "./types.js";

let cache: { tickets: TicketRegistro[]; source: "pg" | "static" } | null = null;

const MESES_ES: Record<string, number> = {
	ene: 0,
	feb: 1,
	mar: 2,
	abr: 3,
	may: 4,
	jun: 5,
	jul: 6,
	ago: 7,
	sep: 8,
	oct: 9,
	nov: 10,
	dic: 11,
};

function ticketNumberFromId(id: string): number {
	const m = id.match(/TK-(\d+)/i);
	return m ? Number(m[1]) : 0;
}

function parseTicketFecha(raw: string | undefined): number | null {
	if (!raw?.trim()) return null;
	const iso = Date.parse(raw);
	if (!Number.isNaN(iso)) return iso;
	const m = raw.match(/(\d{1,2})\/(\w+)\.?\/(\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?)?/i);
	if (!m) return null;
	const mon = MESES_ES[m[2].slice(0, 3).toLowerCase()];
	if (mon === undefined) return null;
	let h = 0;
	let min = 0;
	let sec = 0;
	if (m[4]) {
		h = Number(m[4]);
		min = Number(m[5]);
		sec = Number(m[6] ?? 0);
		const ap = m[7]?.toLowerCase();
		if (ap === "pm" && h < 12) h += 12;
		if (ap === "am" && h === 12) h = 0;
	}
	return new Date(Number(m[3]), mon, Number(m[1]), h, min, sec).getTime();
}

function ticketRecencyKey(t: TicketRegistro): number {
	return parseTicketFecha(t.fechaSolicitud) ?? parseTicketFecha(t.fechaEntrega) ?? ticketNumberFromId(t.id);
}

/** Más reciente primero: `fechaSolicitud` (o `fechaEntrega`), desempate por número TK. */
export function sortTicketsNewestFirst(list: TicketRegistro[]): TicketRegistro[] {
	return [...list].sort((a, b) => {
		const diff = ticketRecencyKey(b) - ticketRecencyKey(a);
		return diff !== 0 ? diff : ticketNumberFromId(b.id) - ticketNumberFromId(a.id);
	});
}

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

/** Lista tickets: PG vía lab-langgraph si hay URL; si no, registro estático (offline). */
export async function loadTickets(
	refresh = false,
): Promise<{ tickets: TicketRegistro[]; source: "pg" | "static" }> {
	if (!refresh && cache) return cache;
	if (ticketsStoreEnabled()) {
		const fromPg = await fetchTicketsFromStore();
		cache = {
			tickets: sortTicketsNewestFirst((fromPg ?? []).map(storedRecordToRegistro)),
			source: "pg",
		};
		return cache;
	}
	const { TICKETS } = await import("./staticRegistry.js");
	cache = { tickets: sortTicketsNewestFirst(TICKETS), source: "static" };
	return cache;
}

/** Registro estático completo (solo metadatos en bundle inicial; cuerpos vía `resolveTicketBody`). */
export async function loadStaticTickets(): Promise<TicketRegistro[]> {
	const { TICKETS } = await import("./staticRegistry.js");
	return sortTicketsNewestFirst(TICKETS);
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
