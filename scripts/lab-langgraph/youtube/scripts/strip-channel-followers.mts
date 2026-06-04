/**
 * Quita channel_follower_count de .md / .json ya generados (valor repetido en todo el canal).
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CORPUS_BASE, VIDEOS_ROOT, listAllVideoJsonRefs, listYearFolders } from "../lib/corpus-paths.ts";

const CORPUS_DIR = CORPUS_BASE;

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
	let mdN = 0;
	let jsonN = 0;
	const paths: string[] = [];
	for (const ref of await listAllVideoJsonRefs(VIDEOS_ROOT)) {
		paths.push(ref.jsonPath);
		paths.push(join(ref.jsonPath, "..", `${ref.videoId}.md`));
	}
	for (const year of await listYearFolders(VIDEOS_ROOT)) {
		for (const name of await readdir(join(VIDEOS_ROOT, year))) {
			if (name.endsWith(".md")) paths.push(join(VIDEOS_ROOT, year, name));
		}
	}
	for (const path of [...new Set(paths)]) {
		if (path.endsWith(".md") && (await stripMd(path))) mdN += 1;
		else if (path.endsWith(".json") && !path.endsWith(".info.json") && (await stripJson(path))) jsonN += 1;
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
