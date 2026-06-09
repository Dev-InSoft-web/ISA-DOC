import { watch, type FSWatcher } from "node:fs";
import { join, normalize } from "node:path";
import type { ResourceProject, ResourceUpdateEvent } from "./resourceTypes.ts";
import { loadBitacoraPathMaps, resolveBitacoraResourceId } from "./bitacoraResourceIndex.ts";

type BroadcastFn = (event: ResourceUpdateEvent) => void;

const DEBOUNCE_MS = 400;
let started = false;
const timers = new Map<string, NodeJS.Timeout>();

function debouncedEmit(key: string, emit: () => void): void {
	const prev = timers.get(key);
	if (prev) clearTimeout(prev);
	timers.set(key, setTimeout(() => {
		timers.delete(key);
		emit();
	}, DEBOUNCE_MS));
}

function watchDir(
	dir: string,
	onFile: (path: string) => void,
): FSWatcher | null {
	try {
		return watch(dir, { recursive: true }, (_event, filename) => {
			if (!filename || typeof filename !== "string") return;
			const p = normalize(join(dir, filename));
			if (/\.(md|sql|json)$/i.test(p)) onFile(p);
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		console.warn(`[ResourceWatch] No se pudo vigilar ${dir}: ${msg}`);
		return null;
	}
}

export function startResourceWatch(isaRoot: string, broadcast: BroadcastFn): void {
	if (started) return;
	started = true;

	const labRoot = join(isaRoot, "..", "lab-langgraph");
	const maps = loadBitacoraPathMaps(isaRoot, labRoot);

	const emitBitacora = (project: ResourceProject, filePath: string): void => {
		const resolved = resolveBitacoraResourceId(project, filePath, isaRoot, labRoot, maps);
		const key = `${project}:${filePath}`;
		debouncedEmit(key, () => {
			if (resolved) {
				broadcast({
					id: resolved.id,
					kind: resolved.kind,
					project,
					at: Date.now(),
					path: filePath,
				});
			}
			broadcast({
				id: `bitacora:${project}:bundle`,
				kind: "bitacora-bundle",
				project,
				at: Date.now(),
				path: filePath,
			});
		});
	};

	const watchers: FSWatcher[] = [];

	for (const project of ["patyia", "clientesis"] as ResourceProject[]) {
		const isaDir = join(isaRoot, "src/lib/features", project, "060-bitacora");
		const labDir = join(labRoot, "data/bitacora", project);
		const w1 = watchDir(isaDir, (p) => emitBitacora(project, p));
		const w2 = watchDir(labDir, (p) => emitBitacora(project, p));
		if (w1) watchers.push(w1);
		if (w2) watchers.push(w2);
	}

	const fragmentsDir = join(isaRoot, "src/lib/sql/fragments");
	const wf = watchDir(fragmentsDir, (p) => {
		debouncedEmit(`fragments:${p}`, () => {
			broadcast({ id: "sql:fragments", kind: "sql-fragments", at: Date.now(), path: p });
		});
	});
	if (wf) watchers.push(wf);

	console.log(`[ResourceWatch] Vigilando ${watchers.length} rutas (bitácora + SQL fragments)`);
}
