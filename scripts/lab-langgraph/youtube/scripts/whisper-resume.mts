/**
 * Reanuda el lote whisper hasta vaciar pendientes.
 * Mismo video: reintenta hasta transcribir; esperas adaptadas por promedios.
 *
 * Uso:
 *   npm run lab:yt:whisper-resume
 *   npm run lab:yt:whisper-resume -- --delay 30000
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { rebuildCorpusFile } from "./fetch-contapyme-channel-transcripts.mts";
import { labLanggraphBaseUrl, labHealthCheck } from "../../_shared/lab-api-client.ts";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import {
	AUDIO_CACHE,
	loadWhisperStats,
	OUT_DIR,
	parseWhisperArgs,
	runWhisperFallback,
	listWhisperJobs,
	STATS_PATH,
} from "../whisper/fallback-core.ts";

loadLabEnv();

const opts = parseWhisperArgs(process.argv.slice(2));
const stats = await loadWhisperStats(STATS_PATH);
let pass = 0;
let totalOk = 0;

const health = await labHealthCheck().catch(() => ({ ok: false }));
console.log(`Lab: ${labLanggraphBaseUrl()} · health=${health.ok ? "ok" : "FAIL"}`);
console.log(`Audio cache: ${AUDIO_CACHE}`);
console.log(`Stats: ${STATS_PATH}`);
console.log(`Modo: Whisper vía lab-langgraph (orquestador PG · rotación keys en servidor)`);
console.log(
	`Reintentos: rotación inmediata entre keys · 429: espera según API (mayor "try again in …")`,
);
if (stats.videosOk > 0) {
	console.log(
		`Histórico cargado: ${stats.videosOk} ok · promedio ok ${stats.avgOkSec() ?? "?"}s · espera ${stats.avgWaitSec() ?? "?"}s`,
	);
}

while (true) {
	const pending = await listWhisperJobs(opts.videoId);
	if (!pending.length) {
		console.log("\n✓ Todos los videos tienen transcripción.");
		break;
	}

	pass += 1;
	const okHist = stats.videosOk;
	console.log(`\n═══ Pasada ${pass} · ${pending.length} pendientes (histórico ${okHist} ok en stats) ═══`);
	console.log(
		`  Cola corpus (${pending.length}): ${pending
			.map((j) => j.record.videoId)
			.slice(0, 10)
			.join(", ")}${pending.length > 10 ? ` (+${pending.length - 10})` : ""}`,
	);

	const { ok, stats: sessionStats } = await runWhisperFallback({
		...opts,
		stats,
		skipRebuild: true,
		limit: opts.limit > 0 ? opts.limit : 0,
	});

	totalOk += ok;
	void sessionStats;

	const still = await listWhisperJobs(opts.videoId);
	if (!still.length) break;

	if (ok === 0) {
		const wait = 60_000;
		console.log(
			`\nSin éxitos en pasada ${pass} (${still.length} pendientes). Pausa ${wait / 1000}s…`,
		);
		await new Promise((r) => setTimeout(r, wait));
	} else if (opts.delayMs > 0) {
		await new Promise((r) => setTimeout(r, opts.delayMs));
	}
}

if (totalOk > 0 && !opts.skipRebuild) {
	try {
		const manifest = JSON.parse(await readFile(join(OUT_DIR, "manifest.json"), "utf8"));
		await rebuildCorpusFile(manifest);
		console.log("corpus.md actualizado");
	} catch {
		/* */
	}
}

console.log(`\n═══ Resumen final ═══`);
console.log(`Pasadas: ${pass} · videos transcritos: ${totalOk}`);
console.log(
	`Éxito por intento: ${(stats.sessionSuccessRate() * 100).toFixed(0)}% · promedio ok ${stats.avgOkSec() ?? "—"}s · espera 429 ${stats.avgWaitSec() ?? "—"}s`,
);
