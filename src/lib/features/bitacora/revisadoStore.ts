import { writable, type Writable } from "svelte/store";

import { io as ioClient, type Socket } from "socket.io-client";

import { STATIC_MODE, BASE_URL, withBase } from "../../integrations/runtime/staticMode";

import { labGetRevisado, labPostRevisado, useLabPersistence } from "../../core/lab-api/persistence.ts";



type RevisadoMap = Record<string, boolean>;



const LS_KEY = "isa-doc-revisado-v1";



function localRevisadoSources(): string[] {

	return ["/api/revisado", withBase("/static-api/revisado.json")];

}



export const revisadoStore: Writable<RevisadoMap> = writable<RevisadoMap>({});

let loaded = false;

let socket: Socket | null = null;



function readLocalStorage(): RevisadoMap {

	if (typeof window === "undefined") return {};

	try {

		const raw = localStorage.getItem(LS_KEY);

		if (!raw) return {};

		const parsed = JSON.parse(raw) as RevisadoMap;

		return parsed && typeof parsed === "object" ? parsed : {};

	} catch {

		return {};

	}

}



function writeLocalStorage(map: RevisadoMap): void {

	if (typeof window === "undefined") return;

	try {

		localStorage.setItem(LS_KEY, JSON.stringify(map));

	} catch { /* quota */ }

}



function mergeMaps(...parts: RevisadoMap[]): RevisadoMap {

	const out: RevisadoMap = {};

	for (const m of parts) {

		for (const [k, v] of Object.entries(m)) {

			if (!k) continue;

			if (v === true) out[k] = true;

			else if (out[k] === undefined) out[k] = !!v;

		}

	}

	return out;

}



async function fetchRevisadoMap(url: string): Promise<RevisadoMap | null> {

	try {

		const res = await fetch(url, { headers: { accept: "application/json" } });

		if (!res.ok) return null;

		const data = (await res.json()) as RevisadoMap;

		return data && typeof data === "object" ? data : null;

	} catch {

		return null;

	}

}



async function loadFromServer(): Promise<void> {

	if (typeof window === "undefined") return;

	const parts: RevisadoMap[] = [readLocalStorage()];

	if (useLabPersistence()) {

		try {

			parts.push(await labGetRevisado());

		} catch { /* lab apagado o login cancelado */ }

	}

	for (const url of localRevisadoSources()) {

		const m = await fetchRevisadoMap(url);

		if (m) parts.push(m);

	}

	revisadoStore.set(mergeMaps(...parts));

}



function startSocket(): void {

	if (STATIC_MODE) return;

	if (typeof window === "undefined" || socket) return;

	const url = `http://${location.hostname}:4401`;

	socket = ioClient(url, { transports: ["websocket"] });

	socket.on("connect", () => { void loadFromServer(); });

	socket.on("revisado:changed", (msg: { updates?: RevisadoMap }) => {

		const updates = msg?.updates;

		if (!updates || typeof updates !== "object") return;

		revisadoStore.update((cur) => {

			const next = { ...cur, ...updates };

			writeLocalStorage(next);

			return next;

		});

	});

}



if (typeof window !== "undefined" && !loaded) {

	loaded = true;

	void loadFromServer();

	startSocket();

	window.addEventListener("isa-doc:lab-auth-ready", () => {

		void loadFromServer();

	});

}



let pending: Promise<void> = Promise.resolve();



async function pushToServer(updates: RevisadoMap): Promise<void> {

	if (typeof window === "undefined") return;

	revisadoStore.update((cur) => {

		const next = { ...cur, ...updates };

		writeLocalStorage(next);

		return next;

	});



	let last: RevisadoMap | null = null;

	if (useLabPersistence()) {

		try {

			last = await labPostRevisado(updates);

		} catch { /* fallback a fuentes locales */ }

	}

	if (last) {

		revisadoStore.update((cur) => {

			const merged = mergeMaps(cur, last);

			writeLocalStorage(merged);

			return merged;

		});

		return;

	}

	for (const url of localRevisadoSources()) {

		try {

			const res = await fetch(url, {

				method: "POST",

				headers: { "content-type": "application/json" },

				body: JSON.stringify(updates),

			});

			if (!res.ok) continue;

			const data = (await res.json()) as RevisadoMap;

			if (data && typeof data === "object") {

				last = data;

				break;

			}

		} catch { /* siguiente fuente */ }

	}

	if (last) {

		revisadoStore.update((cur) => {

			const merged = mergeMaps(cur, last);

			writeLocalStorage(merged);

			return merged;

		});

	}

}



function commit(updates: RevisadoMap): void {

	revisadoStore.update((cur) => ({ ...cur, ...updates }));

	pending = pending.then(() => pushToServer(updates));

}



export function setRevisado(key: string, value: boolean): void {

	if (!key) return;

	commit({ [key]: value });

}



export function setRevisadoMany(keys: string[], value: boolean): void {

	if (!keys.length) return;

	const updates: RevisadoMap = {};

	for (const k of keys) if (k) updates[k] = value;

	commit(updates);

}



/** Expuesto para modo estático (gh-pages). */

export function getRevisadoLocalSnapshot(): RevisadoMap {

	return readLocalStorage();

}


