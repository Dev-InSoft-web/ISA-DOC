import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile, mkdir } from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, "..", "..", "..", "data");
const filePath = path.join(dataDir, "revisado.json");

export type RevisadoMap = Record<string, boolean>;

let cache: RevisadoMap | null = null;
let writing: Promise<void> = Promise.resolve();

async function ensureLoaded(): Promise<RevisadoMap> {
	if (cache) return cache;
	try {
		const raw = await readFile(filePath, "utf8");
		const parsed = JSON.parse(raw) as RevisadoMap;
		cache = parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		cache = {};
	}
	return cache;
}

async function flush(): Promise<void> {
	if (!cache) return;
	await mkdir(dataDir, { recursive: true });
	await writeFile(filePath, JSON.stringify(cache, null, 2), "utf8");
}

export async function readAll(): Promise<RevisadoMap> {
	return { ...(await ensureLoaded()) };
}

export async function writeMany(updates: RevisadoMap): Promise<RevisadoMap> {
	const cur = await ensureLoaded();
	for (const [k, v] of Object.entries(updates)) cur[k] = !!v;
	writing = writing.then(() => flush()).catch(() => { /* noop */ });
	await writing;
	return { ...cur };
}
