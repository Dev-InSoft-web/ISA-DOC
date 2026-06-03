/**

 * Re-aplica dedupeRollingCaptionSegments a todos los videos/*.json y regenera .md + corpus.

 * Si existe VTT en subs-cache/{videoId}/, parte del VTT crudo (recupera cues absorbidos).

 */

import { readFile, readdir, writeFile } from "node:fs/promises";

import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";

import type { CaptionSegment } from "../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";

import { parseCaptionPayload } from "../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import { buildTranscriptPlainText } from "./youtube-rag.ts";

import { dedupeRollingCaptionSegments, TRANSCRIPT_DEDUPE_VERSION } from "./youtube-dedupe-segments.ts";

import { rebuildCorpusFile } from "./fetch-contapyme-channel-transcripts.mts";

import { videoCorpusMarkdown } from "./youtube-transcript-md.ts";

import type { VideoCorpusRecord } from "./youtube-types.ts";



const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

const CORPUS_DIR = join(ROOT, "data/lab-langgraph/vectorize/youtube/contapyme-software-contable");

const VIDEOS_DIR = join(CORPUS_DIR, "videos");



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

	const files = (await readdir(VIDEOS_DIR)).filter((f) => f.endsWith(".json") && !f.endsWith(".info.json"));

	let updated = 0;

	let totalBefore = 0;

	let totalAfter = 0;



	for (const name of files) {

		const path = join(VIDEOS_DIR, name);

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

		await writeFile(join(VIDEOS_DIR, `${record.videoId}.md`), videoCorpusMarkdown(record), "utf8");



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


