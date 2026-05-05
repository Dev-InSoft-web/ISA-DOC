import { writable, type Writable } from "svelte/store";

type RevisadoMap = Record<string, boolean>;

const API_URL = "/api/revisado";

export const revisadoStore: Writable<RevisadoMap> = writable<RevisadoMap>({});
let loaded = false;

async function loadFromServer(): Promise<void> {
	if (typeof window === "undefined" || loaded) return;
	loaded = true;
	try {
		const res = await fetch(API_URL, { headers: { "accept": "application/json" } });
		if (!res.ok) return;
		const data = (await res.json()) as RevisadoMap;
		revisadoStore.set(data && typeof data === "object" ? data : {});
	} catch { /* noop */ }
}

if (typeof window !== "undefined") void loadFromServer();

let pending: Promise<void> = Promise.resolve();

async function pushToServer(updates: RevisadoMap): Promise<void> {
	if (typeof window === "undefined") return;
	try {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(updates),
		});
		if (!res.ok) return;
		const data = (await res.json()) as RevisadoMap;
		if (data && typeof data === "object") revisadoStore.set(data);
	} catch { /* noop */ }
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
