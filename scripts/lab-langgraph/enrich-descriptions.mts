/**
 * Rellena descripciones faltantes (watch page) y actualiza .json / .md existentes.
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveVideoDescription } from "./youtube-description.ts";
import { buildTranscriptPlainText } from "./youtube-rag.ts";
import { videoCorpusMarkdown } from "./youtube-transcript-md.ts";
import type { VideoCorpusRecord } from "./youtube-types.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const VIDEOS_DIR = join(ROOT, "data/lab-langgraph/vectorize/youtube/contapyme-software-contable/videos");

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

async function main(): Promise<void> {
	const files = (await readdir(VIDEOS_DIR)).filter((f) => f.endsWith(".json") && !f.endsWith(".info.json"));
	let updated = 0;
	let filled = 0;

	for (const name of files) {
		const path = join(VIDEOS_DIR, name);
		const record = JSON.parse(await readFile(path, "utf8")) as VideoCorpusRecord;
		const prev = (record.ytdlp.description ?? "").trim();
		const desc = await resolveVideoDescription(record.videoId, prev);
		if (!desc && !prev) continue;

		record.ytdlp.description = desc || prev;
		record.transcript.plainText = buildTranscriptPlainText(record.ytdlp.description, record.transcript.segments);
		record.transcript.transcriptChars = record.transcript.plainText.length;

		await writeFile(path, `${JSON.stringify(record, null, 2)}\n`, "utf8");
		await writeFile(join(VIDEOS_DIR, `${record.videoId}.md`), videoCorpusMarkdown(record), "utf8");
		updated += 1;
		if (!prev && desc) filled += 1;

		console.log(`${record.videoId} · desc ${desc.length} chars${!prev && desc ? " (nueva)" : ""}`);
		await sleep(400);
	}

	console.log(`\nActualizados: ${updated} · descripciones nuevas: ${filled}`);

	const { readFile: rf, writeFile: wf } = await import("node:fs/promises");
	const manifestPath = join(ROOT, "data/lab-langgraph/vectorize/youtube/contapyme-software-contable/manifest.json");
	try {
		const manifest = JSON.parse(await rf(manifestPath, "utf8"));
		const { rebuildCorpusFile } = await import("./fetch-contapyme-channel-transcripts.mts");
		await rebuildCorpusFile(manifest);
		console.log("corpus.md regenerado");
	} catch {
		console.log("Sin manifest.json; omite corpus.md");
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
