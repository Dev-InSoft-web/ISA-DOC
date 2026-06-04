import { loadJson, saveJson } from "../../patyia/010-config/patyiaPersist";
import defaults from "./ticket-viewer-defaults.json";

/** Valores por defecto desde `ticket-viewer-defaults.json`. */
export const TICKET_VIEWER_DEFAULTS = defaults as TicketViewerPrefs;

export type TicketViewerPrefs = {
	whiteBg: boolean;
	showCode: boolean;
};

const STORAGE_KEY = "isa-doc:ticketViewer";

export function loadTicketViewerPrefs(): TicketViewerPrefs {
	const raw = loadJson<Partial<TicketViewerPrefs>>(STORAGE_KEY, {});
	return {
		whiteBg: typeof raw.whiteBg === "boolean" ? raw.whiteBg : TICKET_VIEWER_DEFAULTS.whiteBg,
		showCode: typeof raw.showCode === "boolean" ? raw.showCode : TICKET_VIEWER_DEFAULTS.showCode,
	};
}

export function saveTicketViewerPrefs(prefs: TicketViewerPrefs): void {
	saveJson(STORAGE_KEY, prefs);
}
