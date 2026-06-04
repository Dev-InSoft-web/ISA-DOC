/**

 * Rellena descripciones faltantes (watch page) y actualiza .json / .md existentes.

 */

import { readFile, writeFile } from "node:fs/promises";

import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";

import { resolveVideoDescription } from "../lib/description.ts";

import { buildTranscriptPlainText } from "../lib/rag.ts";

import { videoCorpusMarkdown } from "../lib/transcript-md.ts";

import { CORPUS_BASE, VIDEOS_ROOT, listAllVideoJsonRefs } from "../lib/corpus-paths.ts";

import type { VideoCorpusRecord } from "../lib/types.ts";






function sleep(ms: number): Promise<void> {

	return new Promise((r) => setTimeout(r, ms));

}



async function main(): Promise<void> {

	const refs = await listAllVideoJsonRefs(VIDEOS_ROOT);

	let updated = 0;

	let filled = 0;



	for (const ref of refs) {

		const path = ref.jsonPath;

		const record = JSON.parse(await readFile(path, "utf8")) as VideoCorpusRecord;

		const prev = (record.ytdlp.description ?? "").trim();

		const desc = await resolveVideoDescription(record.videoId, prev);

		if (!desc && !prev) continue;



		record.ytdlp.description = desc || prev;

		record.transcript.plainText = buildTranscriptPlainText(

			record.ytdlp.description,

			record.transcript.segments,

		);

		record.transcript.transcriptChars = record.transcript.plainText.length;



		await writeFile(path, `${JSON.stringify(record, null, 2)}\n`, "utf8");

		await writeFile(join(ref.jsonPath, "..", `${record.videoId}.md`), videoCorpusMarkdown(record), "utf8");

		updated += 1;

		if (!prev && desc) filled += 1;



		console.log(`${record.videoId} · desc ${desc.length} chars${!prev && desc ? " (nueva)" : ""}`);

		await sleep(400);

	}



	console.log(`\nActualizados: ${updated} · descripciones nuevas: ${filled}`);



	const manifestPath = join(CORPUS_BASE, "manifest.json");

	try {

		const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

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


