import { writable, type Writable } from "svelte/store";

const STORE_KEY = "bitacora.revisado";

type RevisadoMap = Record<string, boolean>;

function load(): RevisadoMap {
	if (typeof window === "undefined") return {};
	try {
		const raw = window.localStorage.getItem(STORE_KEY);
		return raw ? (JSON.parse(raw) as RevisadoMap) : {};
	} catch {
		return {};
	}
}

function persist(v: RevisadoMap): void {
	if (typeof window === "undefined") return;
	try { window.localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch { /* noop */ }
}

export const revisadoStore: Writable<RevisadoMap> = writable<RevisadoMap>(load());

revisadoStore.subscribe((v) => persist(v));

export function setRevisado(key: string, value: boolean): void {
	revisadoStore.update((cur) => ({ ...cur, [key]: value }));
}

export function setRevisadoMany(keys: string[], value: boolean): void {
	if (!keys.length) return;
	revisadoStore.update((cur) => {
		const next = { ...cur };
		for (const k of keys) next[k] = value;
		return next;
	});
}
