/** Restaura transcript.segments desde subs-cache VTT para un videoId. */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCaptionPayload } from "../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import { dedupeRollingCaptionSegments } from "./youtube-dedupe-segments.ts";
import { buildTranscriptPlainText } from "./youtube-rag.ts";
import { videoCorpusMarkdown } from "./youtube-transcript-md.ts";
import type { VideoCorpusRecord } from "./youtube-types.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const BASE = join(ROOT, "data/lab-langgraph/vectorize/youtube/contapyme-software-contable");
const VIDEOS = join(BASE, "videos");

const videoId = process.argv[2]?.trim();
if (!videoId) {
	console.error("Uso: tsx restore-video-from-vtt.mts <videoId>");
	process.exit(1);
}

const vttPath = join(BASE, "subs-cache", videoId, `${videoId}.es.vtt`);
const vtt = await readFile(vttPath, "utf8");
const raw = parseCaptionPayload(vtt);
const deduped = dedupeRollingCaptionSegments(raw);

const jsonPath = join(VIDEOS, `${videoId}.json`);
const record = JSON.parse(await readFile(jsonPath, "utf8")) as VideoCorpusRecord;
record.transcript.segments = deduped;
record.transcript.segmentCount = deduped.length;
record.transcript.method = "youtube-auto-es-vtt-deduped";
delete (record.transcript as { proofreadVersion?: number }).proofreadVersion;
delete (record.transcript as { proofreadAt?: string }).proofreadAt;
delete (record.transcript as { proofreadApi?: string }).proofreadApi;
delete (record.transcript as { proofreadModel?: string }).proofreadModel;
record.transcript.plainText = buildTranscriptPlainText(record.ytdlp.description ?? "", deduped);
record.transcript.transcriptChars = record.transcript.plainText.length;
record.extractedAt = new Date().toISOString();

await writeFile(jsonPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
await writeFile(join(VIDEOS, `${videoId}.md`), videoCorpusMarkdown(record), "utf8");
console.log(`OK ${videoId}: ${deduped.length} segmentos`);
console.log("seg0:", deduped[0]?.text?.slice(0, 100));
