// Cliente para el estado de codegen persistido server-side (un único JSON).
// Reemplaza el uso anterior de localStorage. Mantiene una caché síncrona en
// memoria para no romper la API de los `load*`/`save*` originales.

const ENDPOINT = "/api/codegen/state";

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
