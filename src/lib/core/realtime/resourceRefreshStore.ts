import { writable, get } from "svelte/store";
import { io as ioClient, type Socket } from "socket.io-client";
import { STATIC_MODE } from "../../integrations/runtime/staticMode.ts";
import type { ResourceUpdateEvent } from "./resourceTypes.ts";

export type PendingResourceRefresh = ResourceUpdateEvent & { label: string };

const activeResources = writable<Set<string>>(new Set());
const pendingRefreshes = writable<PendingResourceRefresh[]>([]);

const handlers = new Map<string, Set<() => void | Promise<void>>>();
let socket: Socket | null = null;
let socketStarted = false;

function resourceLabel(ev: ResourceUpdateEvent): string {
	if (ev.kind === "bitacora-md" || ev.kind === "bitacora-sql") return ev.id;
	if (ev.kind === "bitacora-bundle" && ev.project) return `Bitácora ${ev.project}`;
	if (ev.kind === "sql-fragments") return "Fragmentos SQL";
	return ev.id;
}

function isViewingResource(active: Set<string>, ev: ResourceUpdateEvent): boolean {
	if (active.has(ev.id)) return true;
	if (ev.kind === "bitacora-bundle" && ev.project) {
		if (active.has(`bitacora:${ev.project}`)) return true;
		for (const id of active) {
			if (id.startsWith("md.") || id.startsWith("sql.")) return true;
		}
	}
	if ((ev.kind === "bitacora-md" || ev.kind === "bitacora-sql") && active.has(ev.id)) return true;
	if (ev.kind === "sql-fragments" && active.has("sql:fragments")) return true;
	return false;
}

function upsertPending(ev: ResourceUpdateEvent): void {
	const active = get(activeResources);
	if (!isViewingResource(active, ev)) return;

	pendingRefreshes.update((list) => {
		const label = resourceLabel(ev);
		const idx = list.findIndex((x) => x.id === ev.id);
		const entry: PendingResourceRefresh = { ...ev, label };
		if (idx >= 0) {
			const next = [...list];
			next[idx] = entry;
			return next;
		}
		return [...list, entry];
	});
}

export function registerResourceRefreshHandler(
	id: string,
	handler: () => void | Promise<void>,
): () => void {
	let set = handlers.get(id);
	if (!set) {
		set = new Set();
		handlers.set(id, set);
	}
	set.add(handler);
	return () => {
		set?.delete(handler);
		if (set && set.size === 0) handlers.delete(id);
	};
}

export function setResourceActive(id: string, active: boolean): void {
	activeResources.update((cur) => {
		const next = new Set(cur);
		if (active) next.add(id);
		else next.delete(id);
		return next;
	});

	if (!active) {
		pendingRefreshes.update((list) => list.filter((x) => x.id !== id));
	}
}

export async function applyResourceRefresh(id: string): Promise<void> {
	const toRun = new Set<() => void | Promise<void>>();

	const direct = handlers.get(id);
	if (direct) for (const h of direct) toRun.add(h);

	const isBitacoraSegment = id.startsWith("md.") || id.startsWith("sql.");
	if (isBitacoraSegment || (id.startsWith("bitacora:") && id.endsWith(":bundle"))) {
		for (const [key, set] of handlers) {
			if (key.startsWith("bitacora:") && key.endsWith(":bundle")) {
				for (const h of set) toRun.add(h);
			}
		}
	}

	for (const h of toRun) await h();

	pendingRefreshes.update((list) => list.filter((x) => {
		if (x.id === id) return false;
		if (isBitacoraSegment && x.id.startsWith("bitacora:")) return false;
		return true;
	}));
}

export async function applyAllPendingRefreshes(): Promise<void> {
	const list = get(pendingRefreshes);
	for (const item of list) await applyResourceRefresh(item.id);
	pendingRefreshes.set([]);
}

export function dismissPendingRefresh(id: string): void {
	pendingRefreshes.update((list) => list.filter((x) => x.id !== id));
}

export function startResourceRefreshSocket(): void {
	if (STATIC_MODE || socketStarted || typeof window === "undefined") return;
	socketStarted = true;

	const url = `http://${location.hostname}:4401`;
	socket = ioClient(url, { transports: ["websocket"] });

	socket.on("resource:updated", (msg: ResourceUpdateEvent) => {
		if (!msg?.id) return;
		upsertPending({
			id: String(msg.id),
			kind: msg.kind ?? "generic",
			project: msg.project,
			at: Number(msg.at) || Date.now(),
			path: msg.path,
		});
	});

	// Compatibilidad con evento anterior de fragmentos SQL.
	socket.on("fragments:invalidated", () => {
		upsertPending({ id: "sql:fragments", kind: "sql-fragments", at: Date.now() });
	});
}

export const resourceActiveStore = activeResources;
export const resourcePendingStore = pendingRefreshes;

if (typeof window !== "undefined") {
	startResourceRefreshSocket();
}
