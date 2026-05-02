// Cliente para el estado de codegen persistido server-side (un único JSON).
// Reemplaza el uso anterior de localStorage. Mantiene una caché síncrona en
// memoria para no romper la API de los `load*`/`save*` originales.

import { isRealtimeEnabled } from "../realtimeFlag.ts";

const ENDPOINT = "/api/codegen/state";
const STATE_BROADCAST_CHANNEL = "isa-doc:state";

interface StateDoc {
	domains?: unknown;
	topOrder?: unknown;
	prefixOrders?: unknown;
	childPrefixes?: unknown;
	targetFilePaths?: unknown;
}

const cache: StateDoc = {};
let loaded = false;
let inflightLoad: Promise<void> | null = null;
let pendingPatch: StateDoc = {};
let pendingScheduled = false;
let inflightSave: Promise<void> | null = null;
let beforeUnloadBound = false;

let stateChannel: BroadcastChannel | null = null;
let stateTabId = "";
const stateListeners = new Set<() => void>();

function ensureStateChannel(): void {
	if (typeof window === "undefined") return;
	if (typeof BroadcastChannel === "undefined") return;
	if (stateChannel) return;
	stateTabId = `tab_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
	stateChannel = new BroadcastChannel(STATE_BROADCAST_CHANNEL);
	stateChannel.onmessage = (ev) => {
		// Si realtime está suspendido, ignoramos cualquier mensaje entrante.
		if (!isRealtimeEnabled()) return;
		const msg = ev.data as { kind?: string; senderId?: string } | null;
		if (!msg || msg.kind !== "state-updated") return;
		if (msg.senderId === stateTabId) return;
		// Invalidar caché local: la fuente de verdad cambió en otra pestaña.
		loaded = false;
		for (const k of Object.keys(cache) as (keyof StateDoc)[]) delete cache[k];
		for (const l of stateListeners) {
			try { l(); } catch { /* noop */ }
		}
	};
}

function broadcastStateUpdated(): void {
	if (!stateChannel) return;
	if (!isRealtimeEnabled()) return;
	try {
		stateChannel.postMessage({ kind: "state-updated", senderId: stateTabId, ts: Date.now() });
	} catch { /* noop */ }
}

/**
 * Suscribirse a cambios de estado provenientes de otras pestañas. El callback
 * se invoca DESPUÉS de invalidar la caché local; el consumidor debe hacer
 * `await reloadStateFromServer()` y rehidratar lo que dependa del estado.
 */
export function onStateChanged(cb: () => void): () => void {
	ensureStateChannel();
	stateListeners.add(cb);
	return () => { stateListeners.delete(cb); };
}

/** Borra del navegador cualquier rastro de almacenamiento previo. */
export function purgeBrowserStorage(): void {
	if (typeof localStorage === "undefined") return;
	const known = [
		"isa-doc:codegen:domains",
		"isa-doc:codegen:topOrder",
		"isa-doc:codegen:prefixOrder",
		"isa-doc:codegen:childPrefixes",
		"isa-doc:codegen:targetFilePaths",
		"isa-sql:fragments-cache:v1",
	];
	for (const k of known) {
		try { localStorage.removeItem(k); } catch { /* noop */ }
	}
}

function bindUnload(): void {
	if (beforeUnloadBound || typeof window === "undefined") return;
	beforeUnloadBound = true;
	ensureStateChannel();
	const handler = (): void => {
		if (Object.keys(pendingPatch).length === 0) return;
		try {
			const body = JSON.stringify({ patch: pendingPatch });
			if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
				const blob = new Blob([body], { type: "application/json" });
				navigator.sendBeacon(ENDPOINT, blob);
			} else {
				void fetch(ENDPOINT, {
					method: "PUT",
					headers: { "content-type": "application/json" },
					body,
					keepalive: true,
				});
			}
			pendingPatch = {};
		} catch { /* noop */ }
	};
	window.addEventListener("pagehide", handler);
	window.addEventListener("beforeunload", handler);
}

export async function loadStateFromServer(): Promise<void> {
	if (typeof window === "undefined") return;
	if (loaded) return;
	if (inflightLoad) return inflightLoad;
	bindUnload();
	inflightLoad = (async () => {
		try {
			purgeBrowserStorage();
			const r = await fetch(ENDPOINT);
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			const data = (await r.json()) as { state?: StateDoc };
			Object.assign(cache, data.state ?? {});
			loaded = true;
		} finally {
			inflightLoad = null;
		}
	})();
	return inflightLoad;
}

/**
 * Forzar recarga del estado server-side, descartando la caché en memoria.
 * Útil cuando otra pestaña modificó `_state.json` y se debe refrescar la
 * vista local (ver listener de BroadcastChannel `tables-updated`).
 */
export async function reloadStateFromServer(): Promise<void> {
	if (typeof window === "undefined") return;
	if (inflightLoad) await inflightLoad;
	loaded = false;
	for (const k of Object.keys(cache) as (keyof StateDoc)[]) delete cache[k];
	await loadStateFromServer();
}

export function getCached<K extends keyof StateDoc>(key: K): StateDoc[K] | undefined {
	return cache[key];
}

export function setCached<K extends keyof StateDoc>(key: K, value: StateDoc[K]): void {
	cache[key] = value;
	pendingPatch[key] = value;
	scheduleFlush();
}

function scheduleFlush(): void {
	if (typeof window === "undefined") return;
	if (pendingScheduled) return;
	pendingScheduled = true;
	const run = (): void => {
		pendingScheduled = false;
		void flushPending();
	};
	if (typeof queueMicrotask === "function") queueMicrotask(run);
	else Promise.resolve().then(run);
}

async function flushPending(): Promise<void> {
	if (Object.keys(pendingPatch).length === 0) return;
	if (inflightSave) {
		await inflightSave;
		if (Object.keys(pendingPatch).length === 0) return;
	}
	const patch = pendingPatch;
	pendingPatch = {};
	inflightSave = (async () => {
		try {
			await fetch(ENDPOINT, {
				method: "PUT",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ patch }),
				keepalive: true,
			});
			broadcastStateUpdated();
		} catch {
			pendingPatch = { ...patch, ...pendingPatch };
			scheduleFlush();
		} finally {
			inflightSave = null;
		}
	})();
	await inflightSave;
	if (Object.keys(pendingPatch).length > 0) scheduleFlush();
}

/** Fuerza el flush inmediato de cualquier patch pendiente. */
export async function flushStateNow(): Promise<void> {
	await flushPending();
}
