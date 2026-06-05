import { labApiEnabled, labFetch } from "./client.ts";
import type { TicketStoredRecord } from "../../features/tickets/stored-types.js";

type IspgenList<T> = {
	encabezado: { resultado: boolean; mensaje: string; codigo?: number };
	respuesta: { lista?: T[]; total?: number; datos?: T };
};

const SEGMENT = "/entity/isa-doc/tickets/ticket";

function ticketEntityId(code: string): string {
	return encodeURIComponent(code);
}

/** Cuerpo PG con claves I (ITICKET); mantiene `code` para la UI. */
function ticketStoreBody(record: TicketStoredRecord): Record<string, unknown> {
	return { ...record, ITICKET: record.code };
}

function normalizeTicketFromStore(raw: Record<string, unknown>): TicketStoredRecord {
	const code = String(raw.ITICKET ?? raw.code ?? "");
	return { ...(raw as TicketStoredRecord), code };
}

export function ticketsStoreEnabled(): boolean {
	return labApiEnabled();
}

export async function fetchTicketsFromStore(limit = 500): Promise<TicketStoredRecord[] | null> {
	if (!ticketsStoreEnabled()) return null;
	const res = await labFetch<IspgenList<TicketStoredRecord>>(`${SEGMENT}?limit=${limit}`);
	if (!res.encabezado.resultado) {
		throw new Error(res.encabezado.mensaje || "Error al listar tickets en lab-langgraph");
	}
	return (res.respuesta.lista ?? []).map((r) => normalizeTicketFromStore(r as Record<string, unknown>));
}

export async function fetchTicketFromStore(code: string): Promise<TicketStoredRecord | null> {
	if (!ticketsStoreEnabled()) return null;
	try {
		const res = await labFetch<IspgenList<TicketStoredRecord>>(`${SEGMENT}/${ticketEntityId(code)}`);
		if (!res.encabezado.resultado) return null;
		const datos = res.respuesta.datos;
		return datos ? normalizeTicketFromStore(datos as Record<string, unknown>) : null;
	} catch {
		return null;
	}
}

export async function upsertTicketToStore(record: TicketStoredRecord): Promise<TicketStoredRecord | null> {
	if (!ticketsStoreEnabled()) return null;
	const res = await labFetch<IspgenList<TicketStoredRecord>>(`${SEGMENT}/${ticketEntityId(record.code)}`, {
		method: "PUT",
		body: JSON.stringify(ticketStoreBody(record)),
	});
	if (!res.encabezado.resultado) {
		throw new Error(res.encabezado.mensaje || "Error al guardar ticket en PG");
	}
	return res.respuesta.datos ?? record;
}

export async function deleteTicketFromStore(code: string): Promise<boolean> {
	if (!ticketsStoreEnabled()) return false;
	try {
		const res = await labFetch<IspgenList<unknown>>(`${SEGMENT}/${ticketEntityId(code)}`, {
			method: "DELETE",
		});
		return res.encabezado.resultado;
	} catch {
		return false;
	}
}
