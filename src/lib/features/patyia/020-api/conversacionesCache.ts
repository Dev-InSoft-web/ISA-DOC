import type { ConvCacheItem } from "./conversacionesCache.types.ts";
import { readJsonStore, writeJsonStore, useLabPersistence } from "../../../core/persistence/backend.ts";

export type { ConvCacheItem } from "./conversacionesCache.types.ts";

interface ConvCacheEntry {
	items: ConvCacheItem[];
	updatedAt: string;
}

type ConvCacheFile = Record<string, ConvCacheEntry>;

const LOCAL = "data/patyia/conversaciones-cache.json";
const LAB_REL = "patyia/caches/conversaciones-cache.json";

let memo: ConvCacheFile | null = null;

function key(db: string, itercero: string, icontacto: string): string {
	return `${db}|${itercero}|${icontacto}`;
}

async function load(): Promise<ConvCacheFile> {
	if (memo && !useLabPersistence()) return memo;
	memo = (await readJsonStore<ConvCacheFile>(LOCAL, LAB_REL)) ?? {};
	return memo;
}

async function save(data: ConvCacheFile): Promise<void> {
	memo = data;
	await writeJsonStore(LOCAL, LAB_REL, data);
}

export async function leerConvsCache(db: string, itercero: string, icontacto: string): Promise<ConvCacheEntry | null> {
	const data = await load();
	return data[key(db, itercero, icontacto)] ?? null;
}

export async function guardarConvsCache(db: string, itercero: string, icontacto: string, items: ConvCacheItem[]): Promise<void> {
	const data = await load();
	data[key(db, itercero, icontacto)] = { items, updatedAt: new Date().toISOString() };
	await save(data);
}
