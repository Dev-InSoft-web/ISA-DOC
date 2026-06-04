/**
 * Transcripción Groq Whisper para videos sin subtítulos (method: none).
 * No avanza al siguiente video hasta transcribir; aprende tiempos ok/error.
 *
 * Uso:
 *   npm run lab:yt:whisper-fallback
 *   npm run lab:yt:whisper-fallback -- --video-id 3eoQ0_2MYLM
 */
import { getGroqKeyPool } from "../../_shared/groq-api-keys.ts";
import {
	AUDIO_CACHE,
	loadWhisperStats,
	parseWhisperArgs,
	runWhisperFallback,
	listWhisperJobs,
	STATS_PATH,
} from "../whisper/fallback-core.ts";

const opts = parseWhisperArgs(process.argv.slice(2));
const jobs = await listWhisperJobs(opts.videoId);
const slice = opts.limit > 0 ? jobs.slice(0, opts.limit) : jobs;

console.log(`Videos sin transcripción: ${jobs.length} · a procesar: ${slice.length}`);
const pool = getGroqKeyPool();
console.log(`Groq API keys: ${pool.size} · activa: ${pool.currentKeyDisplay()}`);
console.log(`Audio cache: ${AUDIO_CACHE}`);
console.log(`Stats: ${STATS_PATH}`);

const stats = await loadWhisperStats(STATS_PATH);
const { ok, skipped, rateLimitWaits, stats: finalStats } = await runWhisperFallback({
	...opts,
	stats,
});
console.log(
	`\nListo · ok=${ok} omitidos=${skipped} esperas_429=${rateLimitWaits} · éxito sesión ${(finalStats.sessionSuccessRate() * 100).toFixed(0)}%`,
);
if (finalStats.avgOkSec()) {
	console.log(
		`Promedios · ok ${finalStats.avgOkSec()}s · espera 429 ${finalStats.avgWaitSec() ?? "—"}s`,
	);
}
