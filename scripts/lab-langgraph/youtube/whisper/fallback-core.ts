import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readdir, stat } from "node:fs/promises";
import { downloadYoutubeAudioMp3 } from "../lib/audio-download.ts";
import {
	GROQ_RATE_LIMIT_WAIT_MS,
	getGroqKeyPool,
	isGroqRateLimitError as isGroqQuotaError,
} from "../../_shared/groq-api-keys.ts";
import {
	applyTranscriptToRecord,
	transcribeAudioForCorpus,
	type WhisperTranscribeProvider,
} from "./transcribe.ts";
import {
	createWhisperRouteState,
	whisperRouteDisplay,
} from "./whisper-route.ts";
import { rebuildCorpusFile } from "../scripts/fetch-contapyme-channel-transcripts.mts";
import { segmentsToTimestampedLines, videoCorpusMarkdown } from "../lib/transcript-md.ts";
import {
	CONTENT_KINDS,
	CORPUS_BASE,
	contentRoot,
	absoluteVideoPaths,
} from "../lib/corpus-paths.ts";
import { CORPUS_SCHEMA_VERSION, type VideoCorpusRecord } from "../lib/types.ts";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import {
	loadWhisperStats,
	logRetryPlan,
	logTranscriptionSuccess,
	logWhisperAttemptStatus,
	saveWhisperStats,
	type WhisperOkEntry,
	type WhisperRetryStats,
} from "./retry-stats.ts";

export const OUT_DIR = CORPUS_BASE;
export const AUDIO_CACHE = join(OUT_DIR, "audio-cache");
export const LOG_PATH = join(OUT_DIR, "whisper-fallback.log");
export const STATS_PATH = join(OUT_DIR, "whisper-stats.json");
export const DEFAULT_MODEL = "whisper-large-v3-turbo";
export { GROQ_RATE_LIMIT_WAIT_MS } from "../../_shared/groq-api-keys.ts";
export {
	loadWhisperStats,
	saveWhisperStats,
	logTranscriptionSuccess,
	logRetryPlan,
	logWhisperAttemptStatus,
	type WhisperOkEntry,
	type WhisperRetryStats,
} from "./retry-stats.ts";

loadLabEnv();
export type WhisperJob = { record: VideoCorpusRecord; jsonPath: string };

export type WhisperFallbackOpts = {
	limit?: number;
	delayMs?: number;
	videoId?: string | null;
	forceAudio?: boolean;
	skipRebuild?: boolean;
	rateLimitWaitMs?: number;
	/** 0 = reintentar el mismo video hasta transcribir (default). */
	maxAttemptsPerVideo?: number;
	stats?: WhisperRetryStats | undefined;
};

export function parseWhisperArgs(argv: string[]): Required<WhisperFallbackOpts> {
	let limit = 0;
	let delayMs = 15_000;
	let videoId: string | null = null;
	let forceAudio = false;
	let skipRebuild = false;
	let maxAttemptsPerVideo = 0;
	let rateLimitWaitMs = GROQ_RATE_LIMIT_WAIT_MS;

	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i];
		if (a === "--limit" && argv[i + 1]) limit = Number(argv[++i]);
		else if (a.startsWith("--limit=")) limit = Number(a.slice(8));
		else if (a === "--delay" && argv[i + 1]) delayMs = Number(argv[++i]);
		else if (a === "--wait" && argv[i + 1]) rateLimitWaitMs = Number(argv[++i]) * 1000;
		else if (a === "--video-id" && argv[i + 1]) videoId = argv[++i]!;
		else if (a === "--force-audio") forceAudio = true;
		else if (a === "--no-rebuild-corpus") skipRebuild = true;
		else if (a === "--max-attempts" && argv[i + 1]) maxAttemptsPerVideo = Number(argv[++i]);
	}
	return {
		limit,
		delayMs,
		videoId,
		forceAudio,
		skipRebuild,
		maxAttemptsPerVideo,
		rateLimitWaitMs,
	};
}

export function isGroqRateLimitError(msg: string): boolean {
	return isGroqQuotaError(msg);
}

export function isMinimaxUnavailableError(msg: string): boolean {
	return (
		msg.includes("MiniMax STT no expuesto") ||
		msg.includes("saldo de tokens insuficiente") ||
		msg.includes("MiniMax STT create 404")
	);
}

export function isRetryableWhisperError(msg: string): boolean {
	if (isGroqRateLimitError(msg)) return true;
	if (msg.includes("Whisper devolvió 0 segmentos")) return true;
	if (msg.includes("ECONNRESET") || msg.includes("fetch failed")) return true;
	if (msg.includes("Groq Whisper 5")) return true;
	return false;
}

export async function listWhisperJobs(videoIdFilter: string | null = null): Promise<WhisperJob[]> {
	const jobs: WhisperJob[] = [];
	for (const kind of CONTENT_KINDS) {
		const root = contentRoot(kind);
		let years: string[];
		try {
			years = await readdir(root);
		} catch {
			continue;
		}
		for (const year of years) {
			const yearDir = join(root, year);
			try {
				if (!(await stat(yearDir)).isDirectory()) continue;
			} catch {
				continue;
			}
			for (const name of await readdir(yearDir)) {
				if (!name.endsWith(".json") || name.includes(".info.")) continue;
				const jsonPath = join(yearDir, name);
				const record = JSON.parse(await readFile(jsonPath, "utf8")) as VideoCorpusRecord;
				if (record.schemaVersion !== CORPUS_SCHEMA_VERSION) continue;
				if (videoIdFilter && record.videoId !== videoIdFilter) continue;
				if (record.transcript.segmentCount > 0) continue;
				const m = record.transcript.method ?? "";
				if (m.startsWith("groq-") || m.startsWith("minimax-")) continue;
				jobs.push({ record, jsonPath });
			}
		}
	}
	return jobs.sort((a, b) => (a.record.ytdlp.duration ?? 0) - (b.record.ytdlp.duration ?? 0));
}

async function persistRecord(record: VideoCorpusRecord): Promise<void> {
	const kind = record.contentKind ?? "videos";
	const year = record.publishYear ?? "unknown";
	const paths = absoluteVideoPaths(contentRoot(kind), record.videoId, year, kind);
	await mkdir(paths.dir, { recursive: true });
	await writeFile(paths.json, `${JSON.stringify(record, null, 2)}\n`, "utf8");
	await writeFile(paths.md, videoCorpusMarkdown(record), "utf8");
}

async function updateManifestEntry(record: VideoCorpusRecord): Promise<void> {
	const manifestPath = join(OUT_DIR, "manifest.json");
	try {
		const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as {
			videos: Array<Record<string, unknown>>;
			updatedAt: string;
		};
		const idx = manifest.videos.findIndex((v) => v.videoId === record.videoId);
		const entry = {
			videoId: record.videoId,
			title: record.ytdlp.title ?? record.videoId,
			contentKind: record.contentKind,
			status: "ok" as const,
			segmentCount: record.transcript.segmentCount,
			transcriptChars: record.transcript.transcriptChars,
			viewCount: record.ytdlp.view_count,
			method: record.transcript.method,
			files: record.files,
		};
		if (idx >= 0) manifest.videos[idx] = { ...manifest.videos[idx], ...entry };
		else manifest.videos.push(entry);
		manifest.updatedAt = new Date().toISOString();
		await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
	} catch {
		/* */
	}
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

export async function processWhisperJob(
	record: VideoCorpusRecord,
	opts: WhisperFallbackOpts,
): Promise<{
	segmentCount: number;
	transcriptChars: number;
	transcriptText: string;
	provider: WhisperTranscribeProvider;
}> {
	const vid = record.videoId;
	const { audioPath, bytes } = await downloadYoutubeAudioMp3(vid, AUDIO_CACHE, {
		force: opts.forceAudio,
	});
	console.log(`  audio ${(bytes / 1024 / 1024).toFixed(1)} MB`);

	const { segments, provider, model } = await transcribeAudioForCorpus(audioPath, OUT_DIR, vid, {
		model: DEFAULT_MODEL,
		language: "es",
		stats: opts.stats,
	});
	if (!segments.length) throw new Error("Whisper devolvió 0 segmentos");

	const updated = applyTranscriptToRecord(record, segments, provider, model);
	await persistRecord(updated);
	await updateManifestEntry(updated);
	const transcriptText =
		segmentsToTimestampedLines(segments) || updated.transcript.plainText?.trim() || "";
	return {
		segmentCount: segments.length,
		transcriptChars: updated.transcript.transcriptChars,
		transcriptText,
		provider,
	};
}

export type WhisperRunResult = {
	ok: number;
	skipped: number;
	rateLimitWaits: number;
	stats: WhisperRetryStats;
};

export async function runWhisperFallback(opts: WhisperFallbackOpts): Promise<WhisperRunResult> {
	const stats = opts.stats ?? (await loadWhisperStats(STATS_PATH));
	const cfg = {
		limit: opts.limit ?? 0,
		delayMs: opts.delayMs ?? 15_000,
		videoId: opts.videoId ?? null,
		forceAudio: opts.forceAudio ?? false,
		skipRebuild: opts.skipRebuild ?? false,
		maxAttemptsPerVideo: opts.maxAttemptsPerVideo ?? 0,
		rateLimitWaitMs: opts.rateLimitWaitMs ?? GROQ_RATE_LIMIT_WAIT_MS,
		stats,
	};

	const jobs = await listWhisperJobs(cfg.videoId);
	const slice = cfg.limit > 0 ? jobs.slice(0, cfg.limit) : jobs;

	await mkdir(OUT_DIR, { recursive: true });
	await appendFile(
		LOG_PATH,
		`\n--- whisper ${new Date().toISOString()} n=${slice.length} untilSuccess ---\n`,
	);

	let ok = 0;
	let skipped = 0;
	let rateLimitWaits = 0;
	const sessionOk: WhisperOkEntry[] = [];

	async function pendingSnapshot(): Promise<{ count: number; ids: string[] }> {
		const jobs = await listWhisperJobs(cfg.videoId);
		return { count: jobs.length, ids: jobs.map((j) => j.record.videoId) };
	}

	for (let i = 0; i < slice.length; i += 1) {
		const { record } = slice[i]!;
		const vid = record.videoId;
		const dur = record.ytdlp.duration_string ?? String(record.ytdlp.duration ?? "?");
		const kind = record.contentKind ?? "videos";
		const title = record.ytdlp.title?.slice(0, 55) ?? vid;
		let attempt = 0;

		console.log(`\n[${i + 1}/${slice.length}] ${vid} · ${title} · ${dur} (${kind})`);
		console.log(`  modo: no avanzar hasta transcribir`);

		const routePreview = createWhisperRouteState();

		while (true) {
			attempt += 1;
			const pending = await pendingSnapshot();
			const pendingInBatch = slice.length - i;
			const apiKeyDisplay = whisperRouteDisplay(routePreview);
			logWhisperAttemptStatus({
				phase: "intento",
				vid,
				attempt,
				sessionOk,
				pendingGlobal: pending.count,
				pendingInBatch,
				batchDone: ok,
				batchTotal: slice.length,
				stats,
				pendingIds: pending.ids,
				apiKeyDisplay,
			});

			if (cfg.maxAttemptsPerVideo > 0 && attempt > cfg.maxAttemptsPerVideo) {
				console.error(`  ABORT: máximo ${cfg.maxAttemptsPerVideo} intentos (--max-attempts)`);
				await appendFile(LOG_PATH, `ABORT ${vid} max_attempts\n`);
				skipped += 1;
				break;
			}

			const t0 = performance.now();
			try {
				const result = await processWhisperJob(record, cfg);
				const elapsedSec = Number(((performance.now() - t0) / 1000).toFixed(1));
				stats.recordOk(elapsedSec * 1000);
				await saveWhisperStats(STATS_PATH, stats);

				const pendingAfterOk = await pendingSnapshot();
				logTranscriptionSuccess({
					vid,
					title,
					dur,
					kind,
					segs: result.segmentCount,
					chars: result.transcriptChars,
					elapsedSec,
					attempt,
					stats,
					index: i + 1,
					total: slice.length,
					pendingGlobal: pendingAfterOk.count,
					sessionOkCount: sessionOk.length + 1,
					transcriptText: result.transcriptText,
					apiKeyDisplay: `${result.provider} OK`,
				});
				await appendFile(
					LOG_PATH,
					`OK ${vid} provider=${result.provider} segs=${result.segmentCount} chars=${result.transcriptChars} ${elapsedSec}s attempts=${attempt}\n`,
				);
				ok += 1;
				sessionOk.push({ vid, title });
				break;
			} catch (e) {
				const msg = e instanceof Error ? e.message : String(e);
				const elapsedMs = performance.now() - t0;
				stats.recordError(elapsedMs);
				await saveWhisperStats(STATS_PATH, stats);

				const pendingAfter = await pendingSnapshot();
				const pendingInBatch = slice.length - i;

				if (
					isGroqRateLimitError(msg) ||
					msg.includes("MiniMax") ||
					msg.includes("cuota") ||
					isMinimaxUnavailableError(msg)
				) {
					rateLimitWaits += 1;
					const noMinimax = msg.includes("sin MiniMax");
					const wait = noMinimax
						? stats.suggestedWaitMs(cfg.rateLimitWaitMs)
						: stats.suggestedWaitMs(cfg.rateLimitWaitMs);
					stats.recordWait(wait);
					await saveWhisperStats(STATS_PATH, stats);
					getGroqKeyPool().resetToFirst();
					logRetryPlan({
						vid,
						attempt,
						reason: noMinimax
							? `429 · MINIMAX_API_KEY ausente · espera ${Math.round(wait / 1000)}s`
							: `429 · rutas agotadas (Groq+MiniMax) · espera ${Math.round(wait / 1000)}s`,
						waitMs: wait,
						stats,
						sessionOk,
						pendingGlobal: pendingAfter.count,
						pendingInBatch,
						batchDone: ok,
						batchTotal: slice.length,
						pendingIds: pendingAfter.ids,
						apiKeyDisplay,
					});
					await appendFile(
						LOG_PATH,
						`WAIT ${vid} ${Math.round(wait / 1000)}s ${noMinimax ? "no_minimax" : "all_routes"} attempt=${attempt}\n`,
					);
					await sleep(wait);
					continue;
				}

				{
					const wait = stats.suggestedRetryMs();
					logRetryPlan({
						vid,
						attempt,
						reason: `${msg.slice(0, 60)} · ${apiKeyDisplay}`,
						waitMs: wait,
						stats,
						sessionOk,
						pendingGlobal: pendingAfter.count,
						pendingInBatch,
						batchDone: ok,
						batchTotal: slice.length,
						pendingIds: pendingAfter.ids,
						apiKeyDisplay,
					});
					await appendFile(LOG_PATH, `RETRY ${vid} ${msg.slice(0, 120)} wait=${Math.round(wait / 1000)}s\n`);
					await sleep(wait);
					continue;
				}
			}
		}

		if (i < slice.length - 1 && cfg.delayMs > 0) await sleep(cfg.delayMs);
	}

	if (ok > 0 && !cfg.skipRebuild) {
		try {
			const manifest = JSON.parse(await readFile(join(OUT_DIR, "manifest.json"), "utf8"));
			await rebuildCorpusFile(manifest);
			console.log("\ncorpus.md actualizado");
		} catch {
			/* */
		}
	}

	return { ok, skipped, rateLimitWaits, stats };
}
