// Persistencia server-side de personalizaciones por recurso.
// Cada recurso tiene su JSON con SOLO las personalizaciones (no los valores inferidos).
import type { ResourceConfig } from "./types.js";
import { RESOURCE_KEYS, diffShallow, pickDefined } from "./keys.js";

const ENDPOINT = "/api/codegen/resources";

/** Snapshot de overrides indexado por id. */
export type OverrideMap = Record<string, Partial<ResourceConfig>>;

export async function fetchAllOverrides(): Promise<OverrideMap> {
	const r = await fetch(ENDPOINT);
	if (!r.ok) throw new Error(`HTTP ${r.status}`);
	const data = (await r.json()) as { overrides?: OverrideMap; error?: string };
	if (data.error) throw new Error(data.error);
	return data.overrides ?? {};
}

export async function saveOverride(id: string, override: Partial<ResourceConfig>): Promise<void> {
	const r = await fetch(ENDPOINT, {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ id, override }),
	});
	if (!r.ok) {
		const data = (await r.json().catch(() => ({}))) as { error?: string };
		throw new Error(data.error ?? `HTTP ${r.status}`);
	}
}

export async function deleteOverride(id: string): Promise<void> {
	const r = await fetch(`${ENDPOINT}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
	if (!r.ok) {
		const data = (await r.json().catch(() => ({}))) as { error?: string };
		throw new Error(data.error ?? `HTTP ${r.status}`);
	}
}

/** Combina inferred + override; los campos del override priman sobre los inferidos. */
export function mergeWithOverride(inferred: ResourceConfig, override: Partial<ResourceConfig>): ResourceConfig {
	return { ...inferred, ...pickDefined(override, RESOURCE_KEYS as readonly (keyof ResourceConfig)[]) } as ResourceConfig;
}

/** Diff entre `edited` y `inferred`; sólo los campos que difieren se guardan como override. */
export function computeOverride(edited: ResourceConfig, inferred: ResourceConfig): Partial<ResourceConfig> {
	return diffShallow(inferred, edited, RESOURCE_KEYS as readonly (keyof ResourceConfig)[]);
}
