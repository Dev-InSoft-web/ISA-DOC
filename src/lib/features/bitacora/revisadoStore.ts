import { writable, type Writable } from "svelte/store";

import { io as ioClient, type Socket } from "socket.io-client";

import { STATIC_MODE, BASE_URL, withBase } from "../../integrations/runtime/staticMode";

import { useLabPersistence } from "../../core/lab-api/persistence.ts";

import { getLabApiBase } from "../../core/lab-api/client.ts";



type RevisadoMap = Record<string, boolean>;



const LS_KEY = "isa-doc-revisado-v1";



function revisadoApiUrl(): string {

	if (useLabPersistence()) return `${getLabApiBase()}/api/revisado`;

	return "/api/revisado";

}



function revisadoSources(): string[] {

	const out: string[] = [];

	if (useLabPersistence()) out.push(revisadoApiUrl());

	out.push("/api/revisado");

	out.push(withBase("/static-api/revisado.json"));

	return out;

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

	for (const url of revisadoSources()) {

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

}



let pending: Promise<void> = Promise.resolve();



async function pushToServer(updates: RevisadoMap): Promise<void> {

	if (typeof window === "undefined") return;

	revisadoStore.update((cur) => {

		const next = { ...cur, ...updates };

		writeLocalStorage(next);

		return next;

	});



	const urls = revisadoSources();

	let last: RevisadoMap | null = null;

	for (const url of urls) {

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

		revisadoStore.set(last);

		writeLocalStorage(last);

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


