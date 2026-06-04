/**
 * Mueve JSON/MD/info a {videos|shorts|streams}/{año}/ según metadatos.
 * Uso: npm run lab:yt:organize-by-year [--dry-run]
 */
import { readFile, readdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
	CORPUS_BASE,
	listAllVideoJsonRefs,
	moveVideoToYearFolder,
	publishYearFromRecord,
} from "../lib/corpus-paths.ts";
import type { VideoCorpusRecord } from "../lib/types.ts";

const dryRun = process.argv.includes("--dry-run");

type Manifest = {
	videos: Array<{
		videoId: string;
		contentKind?: string;
		files?: { md?: string; json?: string; infoJson?: string };
	}>;
};

const manifestPath = join(CORPUS_BASE, "manifest.json");
let manifest: Manifest | null = null;
try {
	manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Manifest;
} catch {
	manifest = null;
}

const refs = await listAllVideoJsonRefs();
let processed = 0;
const byKindYear: Record<string, number> = {};

console.log(`Videos: ${refs.length}${dryRun ? " (dry-run)" : ""}`);

for (const ref of refs) {
	const record = JSON.parse(await readFile(ref.jsonPath, "utf8")) as VideoCorpusRecord;
	const kind = record.contentKind ?? ref.kind ?? "videos";
	const year = publishYearFromRecord(record);
	const key = `${kind}/${year}`;
	byKindYear[key] = (byKindYear[key] ?? 0) + 1;

	if (!dryRun) {
		record.contentKind = kind;
		const next = await moveVideoToYearFolder(record);
		await writeFile(
			join(CORPUS_BASE, kind, year, `${record.videoId}.json`),
			`${JSON.stringify(next, null, 2)}\n`,
			"utf8",
		);
	}

	if (manifest) {
		const entry = manifest.videos.find((v) => v.videoId === record.videoId);
		if (entry) {
			entry.contentKind = kind;
			entry.files = {
				md: `${kind}/${year}/${record.videoId}.md`,
				json: `${kind}/${year}/${record.videoId}.json`,
				infoJson: `${kind}/${year}/${record.videoId}.info.json`,
			};
		}
	}
	processed += 1;
}

if (!dryRun) {
	for (const kind of ["videos", "shorts", "streams"] as const) {
		const root = join(CORPUS_BASE, kind);
		try {
			for (const name of await readdir(root)) {
				if (!name.endsWith(".json") && !name.endsWith(".md") && !name.endsWith(".info.json")) {
					continue;
				}
				if (/^\d{4}$/.test(name) || name === "unknown") continue;
				try {
					await unlink(join(root, name));
				} catch {
					/* */
				}
			}
		} catch {
			/* */
		}
	}
	if (manifest) {
		await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	}
}

console.log(`Procesados: ${processed}`);
console.log("Por tipo/año:", Object.fromEntries(Object.entries(byKindYear).sort()));
