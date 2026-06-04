import { spawnSync } from "node:child_process";
import { mkdir, readdir, readFile, rm, stat } from "node:fs/promises";
import { basename, join } from "node:path";
import type { CaptionSegment } from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import {
	GROQ_RATE_LIMIT_WAIT_MS,
	getGroqKeyPool,
	keySuffix,
	type GroqKeyPool,
} from "../../_shared/groq-api-keys.ts";
import {
	dedupeRollingCaptionSegments,
	TRANSCRIPT_DEDUPE_VERSION,
} from "../lib/dedupe-segments.ts";
import { buildTranscriptPlainText } from "../lib/rag.ts";
import type { VideoCorpusRecord } from "../lib/types.ts";
import type { WhisperRetryStats } from "./retry-stats.ts";

export { GROQ_RATE_LIMIT_WAIT_MS, getGroqKeyPool, GroqKeyPool } from "../../_shared/groq-api-keys.ts";

const GROQ_TRANSCRIBE_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const DEFAULT_MODEL = "whisper-large-v3-turbo";
/** Límite upload directo Groq (free tier ~25 MB). */
const MAX_CHUNK_BYTES = 24 * 1024 * 1024;
const CHUNK_SECONDS = 600;
const CHUNK_OVERLAP_SEC = 10;

export type WhisperGroqOpts = {
	keyPool?: GroqKeyPool;
	stats?: WhisperRetryStats;
	model?: string;
	language?: string;
	chunkSeconds?: number;
	maxChunkBytes?: number;
	/** Total rutas (2 Groq + MiniMax) para logs `1/3`. */
	routeTotal?: number;
};

type GroqSegment = { start?: number; end?: number; text?: string };

type GroqVerboseJson = {
	text?: string;
	segments?: GroqSegment[];
};

function runFfmpeg(args: string[], timeoutMs = 600_000): void {
	const proc = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", ...args], {
		encoding: "utf8",
		timeout: timeoutMs,
	});
	if (proc.status !== 0) {
		throw new Error(`ffmpeg: ${(proc.stderr ?? proc.stdout ?? "").slice(0, 500)}`);
	}
}

export async function splitAudioIfNeeded(
	audioPath: string,
	workDir: string,
	maxBytes: number,
	chunkSec: number,
): Promise<string[]> {
	const st = await stat(audioPath);
	if (st.size <= maxBytes) return [audioPath];

	await mkdir(workDir, { recursive: true });
	const pattern = join(workDir, "chunk_%03d.mp3");
	runFfmpeg([
		"-i",
		audioPath,
		"-f",
		"segment",
		"-segment_time",
		String(chunkSec),
		"-reset_timestamps",
		"1",
		"-ar",
		"16000",
		"-ac",
		"1",
		"-b:a",
		"48k",
		pattern,
	]);

	const names = (await readdir(workDir))
		.filter((n) => n.startsWith("chunk_") && n.endsWith(".mp3"))
		.sort();
	const paths = names.map((n) => join(workDir, n));
	if (!paths.length) throw new Error(`No se generaron chunks en ${workDir}`);
	return paths;
}

function logGroqApiPayload(params: {
	status: number;
	keyDisplay: string;
	chunkName: string;
	rawBody: string;
	parsed?: GroqVerboseJson;
}): void {
	console.log("");
	console.log(
		`    ┌─ Groq API · HTTP ${params.status} · ${params.keyDisplay} · ${params.chunkName}`,
	);
	if (params.parsed) {
		console.log(JSON.stringify(params.parsed, null, 2));
	} else {
		const trimmed = params.rawBody.trim();
		console.log(trimmed.length ? trimmed : "(cuerpo vacío)");
	}
	console.log("    └─");
}

/** Tiempo sugerido por Groq en cuerpo 429 (`try again in XmYs`). */
export function parseGroqRetryHintMs(body: string): number | undefined {
	const m = body.match(/try again in (?:(\d+)m)?([\d.]+)s/i);
	if (!m) return undefined;
	const min = Number(m[1] || 0);
	const sec = Number(m[2] || 60);
	return Math.ceil((min * 60 + sec) * 1000) + 2000;
}

function groqRouteKeyDisplay(pool: GroqKeyPool, routeTotal?: number): string {
	if (!routeTotal || routeTotal <= pool.size) return pool.currentKeyDisplay();
	const e = pool.entries[pool.currentIndex]!;
	return `${pool.currentIndex + 1}/${routeTotal} · ${e.label} · ${keySuffix(e.key)}`;
}

async function transcribeOneFile(
	filePath: string,
	opts: WhisperGroqOpts,
): Promise<GroqSegment[]> {
	const buf = await readFile(filePath);
	const pool = opts.keyPool ?? getGroqKeyPool();
	const stats = opts.stats;
	const maxAttempts = 999;
	let keysTriedWithoutWait = 0;

	for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
		const form = new FormData();
		form.append("file", new Blob([buf], { type: "audio/mpeg" }), basename(filePath));
		form.append("model", opts.model ?? DEFAULT_MODEL);
		form.append("language", opts.language ?? "es");
		form.append("response_format", "verbose_json");
		form.append("timestamp_granularities[]", "segment");
		form.append("temperature", "0");

		const res = await fetch(GROQ_TRANSCRIBE_URL, {
			method: "POST",
			headers: { Authorization: `Bearer ${pool.currentKey}` },
			body: form,
		});
		const text = await res.text();
		const chunkName = basename(filePath);
		const keyDisplay = groqRouteKeyDisplay(pool, opts.routeTotal);

		if (res.ok) {
			const json = JSON.parse(text) as GroqVerboseJson;
			logGroqApiPayload({
				status: res.status,
				keyDisplay,
				chunkName,
				rawBody: text,
				parsed: json,
			});
			return json.segments ?? [];
		}
		if (res.status === 429) {
			logGroqApiPayload({
				status: res.status,
				keyDisplay,
				chunkName,
				rawBody: text,
			});
			if (pool.size > 1 && keysTriedWithoutWait < pool.size - 1) {
				pool.rotateOn429();
				keysTriedWithoutWait += 1;
				continue;
			}
			// Ambas keys Groq agotadas → router en transcribe.ts (MiniMax 3/3 o espera).
			console.warn(
				`    Groq 429 · keys ${pool.size}/${pool.size} agotadas en chunk · ${opts.routeTotal && opts.routeTotal > pool.size ? "siguiente: MiniMax" : "sin MINIMAX_API_KEY"}`,
			);
			throw new Error(`Groq Whisper 429: ${text.slice(0, 400)}`);
		}
		logGroqApiPayload({
			status: res.status,
			keyDisplay,
			chunkName,
			rawBody: text,
		});
		throw new Error(`Groq Whisper ${res.status}: ${text.slice(0, 400)}`);
	}
	return [];
}

function groqSegmentsToCaption(
	segments: GroqSegment[],
	offsetMs: number,
): CaptionSegment[] {
	const out: CaptionSegment[] = [];
	for (const seg of segments) {
		const t = (seg.text ?? "").replace(/\s+/g, " ").trim();
		if (!t) continue;
		const startSec = seg.start ?? 0;
		const endSec = seg.end ?? startSec + 1;
		out.push({
			startMs: Math.round(offsetMs + startSec * 1000),
			durationMs: Math.max(100, Math.round((endSec - startSec) * 1000)),
			text: t,
		});
	}
	return out;
}

export async function transcribeAudioWithGroq(
	audioPath: string,
	cacheRoot: string,
	videoId: string,
	opts?: Partial<WhisperGroqOpts>,
): Promise<CaptionSegment[]> {
	const keyPool = opts?.keyPool ?? getGroqKeyPool();
	const chunkSec = opts?.chunkSeconds ?? CHUNK_SECONDS;
	const maxBytes = opts?.maxChunkBytes ?? MAX_CHUNK_BYTES;
	const whisperOpts: WhisperGroqOpts = {
		keyPool,
		stats: opts?.stats,
		model: opts?.model ?? DEFAULT_MODEL,
		language: opts?.language ?? "es",
		chunkSeconds: chunkSec,
		maxChunkBytes: maxBytes,
	};

	const chunkDir = join(cacheRoot, "whisper-chunks", videoId);
	await rm(chunkDir, { recursive: true, force: true });
	const parts = await splitAudioIfNeeded(audioPath, chunkDir, maxBytes, chunkSec);

	const merged: CaptionSegment[] = [];
	console.log(
		`  Groq · ${groqRouteKeyDisplay(keyPool, opts?.routeTotal)} · ${parts.length} parte(s) de audio`,
	);
	for (let i = 0; i < parts.length; i += 1) {
		const offsetMs = Math.max(0, i * (chunkSec - CHUNK_OVERLAP_SEC) * 1000);
		console.log(`  → parte ${i + 1}/${parts.length}: ${basename(parts[i]!)}`);
		const raw = await transcribeOneFile(parts[i]!, whisperOpts);
		merged.push(...groqSegmentsToCaption(raw, offsetMs));
		if (i < parts.length - 1) {
			await new Promise((r) => setTimeout(r, 500));
		}
	}

	await rm(chunkDir, { recursive: true, force: true });
	return dedupeRollingCaptionSegments(merged);
}

export function applyWhisperTranscriptToRecord(
	record: VideoCorpusRecord,
	segments: CaptionSegment[],
	model: string,
): VideoCorpusRecord {
	const description = record.ytdlp.description ?? "";
	const plainText = buildTranscriptPlainText(description, segments);
	return {
		...record,
		extractedAt: new Date().toISOString(),
		transcript: {
			...record.transcript,
			method: `groq-${model}`,
			languageCode: "es",
			dedupeVersion: TRANSCRIPT_DEDUPE_VERSION,
			segmentCount: segments.length,
			transcriptChars: plainText.length,
			segments,
			plainText,
			whisperModel: model,
			whisperAt: new Date().toISOString(),
		},
	};
}
