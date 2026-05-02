import { writable, type Readable } from "svelte/store";
import { io as ioClient, type Socket } from "socket.io-client";

export type SqlFragmentKind = "table" | "index" | "fk" | "seed" | "raw";
export interface SqlFragment {
	id: string;
	name: string;
	description: string;
	kind: SqlFragmentKind;
	body: string;
}

export interface FragmentsState {
	fragments: SqlFragment[];
	loaded: boolean;
	revalidating: boolean;
	error: string;
	fromCache: boolean;
	updatedAt: number;
}

const LS_KEY = "isa-sql:fragments-cache:v1";

/** Limpieza one-shot del cache anterior almacenado en navegador. */
function purgeLegacyCache(): void {
	if (typeof localStorage === "undefined") return;
	try { localStorage.removeItem(LS_KEY); } catch { /* noop */ }
}

const initial: FragmentsState = (() => {
	purgeLegacyCache();
	return { fragments: [], loaded: false, revalidating: false, error: "", fromCache: false, updatedAt: 0 };
})();

const store = writable<FragmentsState>(initial);

let inflight: Promise<void> | null = null;
let socket: Socket | null = null;
let socketStarted = false;

async function fetchAndApply(): Promise<void> {
	store.update((s) => ({ ...s, revalidating: true, error: "" }));
	try {
		const r = await fetch("/api/sql/fragments");
		if (!r.ok) throw new Error(`HTTP ${r.status}`);
		const data = (await r.json()) as { fragments: SqlFragment[] };
		const fragments = data.fragments ?? [];
		store.set({
			fragments,
			loaded: true,
			revalidating: false,
			error: "",
			fromCache: false,
			updatedAt: Date.now(),
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		store.update((s) => ({ ...s, revalidating: false, error: msg }));
	}
}

export function refreshFragments(): Promise<void> {
	if (inflight) return inflight;
	inflight = fetchAndApply().finally(() => { inflight = null; });
	return inflight;
}

export function ensureFragmentsLoaded(): void {
	// Si hay cache: revalida en segundo plano. Si no: carga sincrónicamente vía promesa.
	void refreshFragments();
}

export function setFragmentsAfterSave(fragments: SqlFragment[]): void {
	store.set({
		fragments,
		loaded: true,
		revalidating: false,
		error: "",
		fromCache: false,
		updatedAt: Date.now(),
	});
}

export function startFragmentsSocket(): void {
	if (socketStarted) return;
	if (typeof window === "undefined") return;
	socketStarted = true;
	const url = `http://${location.hostname}:4401`;
	socket = ioClient(url, { transports: ["websocket"] });
	socket.on("connect", () => { void refreshFragments(); });
	socket.on("fragments:invalidated", () => { void refreshFragments(); });
}

export const fragmentsStore: Readable<FragmentsState> = store;
