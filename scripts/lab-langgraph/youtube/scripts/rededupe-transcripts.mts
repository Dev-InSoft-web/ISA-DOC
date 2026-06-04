/**

 * Re-aplica dedupeRollingCaptionSegments a todos los videos/*.json y regenera .md + corpus.

 * Si existe VTT en subs-cache/{videoId}/, parte del VTT crudo (recupera cues absorbidos).

 */

import { readFile, readdir, writeFile } from "node:fs/promises";

import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";

import type { CaptionSegment } from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";

import { parseCaptionPayload } from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import { buildTranscriptPlainText } from "../lib/rag.ts";

import { dedupeRollingCaptionSegments, TRANSCRIPT_DEDUPE_VERSION } from "../lib/dedupe-segments.ts";

import { rebuildCorpusFile } from "./fetch-contapyme-channel-transcripts.mts";

import { videoCorpusMarkdown } from "../lib/transcript-md.ts";

import type { VideoCorpusRecord } from "../lib/types.ts";



import { CORPUS_BASE, VIDEOS_ROOT, listAllVideoJsonRefs } from "../lib/corpus-paths.ts";

const CORPUS_DIR = CORPUS_BASE;



function segmentsSignature(segments: CaptionSegment[]): string {

	return JSON.stringify(segments);

}



async function sourceSegmentsFromVttCache(videoId: string): Promise<CaptionSegment[] | null> {

	const cacheDir = join(CORPUS_DIR, "subs-cache", videoId);

	try {

		const names = await readdir(cacheDir);

		const vttName = names.find((f) => f.endsWith(".vtt"));

		if (!vttName) return null;

		const text = await readFile(join(cacheDir, vttName), "utf8");

		return parseCaptionPayload(text);

	} catch {

		return null;

	}

}



async function main(): Promise<void> {

	const refs = await listAllVideoJsonRefs(VIDEOS_ROOT);

	let updated = 0;

	let totalBefore = 0;

	let totalAfter = 0;



	for (const ref of refs) {

		const path = ref.jsonPath;

		const record = JSON.parse(await readFile(path, "utf8")) as VideoCorpusRecord;

		const before = record.transcript.segments.length;

		const fromVtt = await sourceSegmentsFromVttCache(record.videoId);

		const source = fromVtt ?? record.transcript.segments;

		const deduped = dedupeRollingCaptionSegments(source);

		const after = deduped.length;



		const plainText = buildTranscriptPlainText(record.ytdlp.description ?? "", deduped);
		const unchanged =
			record.transcript.dedupeVersion === TRANSCRIPT_DEDUPE_VERSION &&
			segmentsSignature(deduped) === segmentsSignature(record.transcript.segments) &&
			record.transcript.plainText === plainText;
		if (unchanged) continue;

		record.transcript.segments = deduped;
		record.transcript.segmentCount = after;
		record.transcript.dedupeVersion = TRANSCRIPT_DEDUPE_VERSION;
		record.transcript.plainText = plainText;
		record.transcript.transcriptChars = plainText.length;



		await writeFile(path, `${JSON.stringify(record, null, 2)}\n`, "utf8");

		await writeFile(join(ref.jsonPath, "..", `${record.videoId}.md`), videoCorpusMarkdown(record), "utf8");



		totalBefore += before;

		totalAfter += after;

		updated += 1;

		const src = fromVtt ? "vtt" : "json";

		console.log(`${record.videoId} (${src}): ${before} → ${after} segmentos`);

	}



	console.log(`\nVideos actualizados: ${updated}`);

	console.log(`Segmentos: ${totalBefore} → ${totalAfter} (−${totalBefore - totalAfter})`);



	try {

		const manifest = JSON.parse(await readFile(join(CORPUS_DIR, "manifest.json"), "utf8"));

		await rebuildCorpusFile(manifest);

		console.log("corpus.md regenerado");

	} catch {

		/* */

	}

}



main().catch((e) => {

	console.error(e);

	process.exit(1);

});


