/**
 * Quita channel_follower_count de .md / .json ya generados (valor repetido en todo el canal).
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const CORPUS_DIR = join(ROOT, "data/lab-langgraph/vectorize/youtube/contapyme-software-contable");
const VIDEOS_DIR = join(CORPUS_DIR, "videos");

const MD_LINE = /^\| Suscriptores canal \(al extraer\) \|[^\n]*\|\s*$/gm;

async function stripMd(path: string): Promise<boolean> {
	const raw = await readFile(path, "utf8");
	const next = raw.replace(MD_LINE, "").replace(/\n{3,}/g, "\n\n");
	if (next === raw) return false;
	await writeFile(path, next, "utf8");
	return true;
}

function stripFollowerField(obj: Record<string, unknown>): boolean {
	let changed = false;
	if ("channel_follower_count" in obj) {
		delete obj.channel_follower_count;
		changed = true;
	}
	if (obj.ytdlp && typeof obj.ytdlp === "object") {
		if (stripFollowerField(obj.ytdlp as Record<string, unknown>)) changed = true;
	}
	return changed;
}

async function stripJson(path: string): Promise<boolean> {
	const raw = await readFile(path, "utf8");
	let data: unknown;
	try {
		data = JSON.parse(raw);
	} catch {
		return false;
	}
	if (!data || typeof data !== "object") return false;
	if (!stripFollowerField(data as Record<string, unknown>)) return false;
	await writeFile(path, `${JSON.stringify(data, null, 2)}\n`, "utf8");
	return true;
}

async function main(): Promise<void> {
	const files = await readdir(VIDEOS_DIR);
	let mdN = 0;
	let jsonN = 0;
	for (const name of files) {
		const path = join(VIDEOS_DIR, name);
		if (name.endsWith(".md") && (await stripMd(path))) mdN += 1;
		else if (name.endsWith(".json") && (await stripJson(path))) jsonN += 1;
	}
	const corpusPath = join(CORPUS_DIR, "corpus.md");
	try {
		if (await stripMd(corpusPath)) mdN += 1;
	} catch {
		/* no corpus */
	}
	console.log(`Listo: ${mdN} .md, ${jsonN} .json actualizados`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
