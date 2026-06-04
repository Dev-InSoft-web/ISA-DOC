import { buildTicketHtml, tiempoTotalEstimadoMin } from "./lib/template";
import { resolveTicketBody } from "./ticketStore.js";

export type { TicketNormativa, TicketCommit, TicketDbChange, TicketRegistro } from "./types";
export type { TicketStoredRecord } from "./stored-types";
export {
	loadTickets,
	loadStaticTickets,
	resolveTicketBody,
	invalidateTicketsCache,
	storedRecordToRegistro,
} from "./ticketStore.js";
export { buildBodyForTicket, listRegisteredBodyModules } from "./lib/bodyRegistry.js";
export {
	fetchTicketsFromStore,
	fetchTicketFromStore,
	upsertTicketToStore,
	deleteTicketFromStore,
	ticketsStoreEnabled,
} from "../../core/lab-api/tickets.js";

export async function getTicketHtml(t: import("./types").TicketRegistro): Promise<string> {
	await import("./lib/assetsRemote.js").then((m) => m.preloadImgbbFromStore());
	const bodyHtml = await resolveTicketBody(t);
	return buildTicketHtml(
		bodyHtml,
		t.commits ?? [],
		t.estimacionMinutos,
		t.cambiosBd ?? [],
		t.noMaquillarFechas ? undefined : t.fechaSolicitud,
		t.id,
		t.festivos,
		t.titulo,
		t.diligenciaMinutos,
		t.extraMinutos,
		t.extraDescripcion,
		t.cambiosExtraMinutos,
	);
}

export async function getTicketTotalEstimadoMin(t: import("./types").TicketRegistro): Promise<number> {
	const bodyHtml = await resolveTicketBody(t);
	return tiempoTotalEstimadoMin(
		bodyHtml,
		t.commits ?? [],
		t.estimacionMinutos,
		t.cambiosBd ?? [],
		t.diligenciaMinutos,
		t.extraMinutos,
		t.cambiosExtraMinutos,
	);
}
