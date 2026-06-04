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
	createGroqRetryHintTracker,
	headersFromFetchResponse,
	logProgress,
	recordGroqRetryHints,
	type GroqRetryHintTracker,
} from "../../_shared/retry-wait.ts";
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
	/** Acumula el mayor `try again in …` entre chunks/keys del mismo intento. */
	retryHint?: GroqRetryHintTracker;
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
	if (params.status === 200 && params.parsed) {
		const segs = params.parsed.segments ?? [];
		const lastEnd = segs.length ? (segs[segs.length - 1]?.end ?? 0).toFixed(0) : "0";
		logProgress(
			`    Groq OK · ${params.keyDisplay} · ${params.chunkName} · ${segs.length} segmentos · hasta ${lastEnd}s`,
		);
		return;
	}
	console.log("");
	console.log(
		`    ┌─ Groq API · HTTP ${params.status} · ${params.keyDisplay} · ${params.chunkName}`,
	);
	const trimmed = params.rawBody.trim();
	console.log(trimmed.length ? trimmed : "(cuerpo vacío)");
	console.log("    └─");
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
			if (opts.retryHint) {
				recordGroqRetryHints(opts.retryHint, text, headersFromFetchResponse(res));
			}
			logGroqApiPayload({
				status: res.status,
				keyDisplay,
				chunkName,
				rawBody: text,
			});
			if (pool.size > 1 && keysTriedWithoutWait < pool.size - 1) {
				pool.rotateOn429();
				keysTriedWithoutWait += 1;
				logProgress(`    Groq 429 · reintento chunk con ${pool.currentKeyDisplay()}`);
				continue;
			}
			logProgress(
				`    Groq 429 · ${pool.size}/${pool.size} keys agotadas en chunk · espera y reinicio 1/${pool.size}`,
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
		routeTotal: opts?.routeTotal,
		retryHint: opts?.retryHint,
	};

	const chunkDir = join(cacheRoot, "whisper-chunks", videoId);
	await safeRmChunkDir(chunkDir);
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

	await safeRmChunkDir(chunkDir);
	return dedupeRollingCaptionSegments(merged);
}

/** Windows: evita EBUSY al borrar chunks si ffmpeg/Groq aún tienen el archivo. */
async function safeRmChunkDir(dir: string, maxTries = 6): Promise<void> {
	for (let t = 0; t < maxTries; t += 1) {
		try {
			await rm(dir, { recursive: true, force: true });
			return;
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			if (!/EBUSY|resource busy|locked|EPERM/i.test(msg) || t >= maxTries - 1) throw e;
			await new Promise((r) => setTimeout(r, 2000 * (t + 1)));
		}
	}
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
