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

function readCache(): { fragments: SqlFragment[]; updatedAt: number } | null {
	if (typeof localStorage === "undefined") return null;
	try {
		const raw = localStorage.getItem(LS_KEY);
		if (!raw) return null;
		const data = JSON.parse(raw) as { fragments: SqlFragment[]; updatedAt: number };
		if (!Array.isArray(data.fragments)) return null;
		return data;
	} catch {
		return null;
	}
}

function writeCache(fragments: SqlFragment[]): void {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(LS_KEY, JSON.stringify({ fragments, updatedAt: Date.now() }));
	} catch {
		/* quota / privacidad: ignorar */
	}
}

const initial: FragmentsState = (() => {
	const cached = readCache();
	if (cached) {
		return {
			fragments: cached.fragments,
			loaded: true,
			revalidating: false,
			error: "",
			fromCache: true,
			updatedAt: cached.updatedAt,
		};
	}
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
		writeCache(fragments);
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
	writeCache(fragments);
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

export function executeSqlViaSocket(sql: string): Promise<{ ok: boolean; output?: string; error?: string }> {
	return new Promise((resolve) => {
		startFragmentsSocket();
		if (!socket) { resolve({ ok: false, error: "Sin conexión al servidor" }); return; }
		socket.emit("sql:exec", { sql }, (data: { ok: boolean; output?: string; error?: string }) => {
			resolve(data ?? { ok: false, error: "Sin respuesta" });
		});
	});
}

export const fragmentsStore: Readable<FragmentsState> = store;
