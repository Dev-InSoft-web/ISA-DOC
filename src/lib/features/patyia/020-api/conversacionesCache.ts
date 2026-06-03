import { promises as fs } from "node:fs";
import path from "node:path";

export interface ConvCacheItem {
	iconversacion: number;
	hilo: string;
	fhcre: string | null;
}

interface ConvCacheEntry {
	items: ConvCacheItem[];
	updatedAt: string;
}

type ConvCacheFile = Record<string, ConvCacheEntry>;

const CACHE_PATH = path.resolve(process.cwd(), "data", "patyia", "conversaciones-cache.json");
let memo: ConvCacheFile | null = null;
let writing: Promise<void> | null = null;

function key(db: string, itercero: string, icontacto: string): string {
	return `${db}|${itercero}|${icontacto}`;
}

async function load(): Promise<ConvCacheFile> {
	if (memo) return memo;
	try {
		const raw = await fs.readFile(CACHE_PATH, "utf8");
		memo = JSON.parse(raw) as ConvCacheFile;
	} catch {
		memo = {};
	}

	return memo;
}

async function save(data: ConvCacheFile): Promise<void> {
	memo = data;
	if (writing) await writing;
	writing = (async () => {
		await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
		await fs.writeFile(CACHE_PATH, JSON.stringify(data, null, "\t"), "utf8");
	})();
	try { await writing; } finally { writing = null; }
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
