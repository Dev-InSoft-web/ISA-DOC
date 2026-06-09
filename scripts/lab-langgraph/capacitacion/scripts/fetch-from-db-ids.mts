/**
 * Descarga videos ocultos a partir de IDs en RECURSOS_ATRIBUTOS (clientesis).
 * Omite los ya presentes en corpus YouTube del canal; reanudable por link.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
	attachCapacitacionToRecord,
	buildVideoLinkRecord,
	type CapacitacionEnrichedVideo,
} from "../lib/enrich-record.ts";
import { CORPUS_BASE, LINKS_DIR, RECURSOS_ATRIBUTOS_SNAPSHOT_PATH, VIDEOS_DIR } from "../lib/corpus-paths.ts";
import { entryIdForVideo, normalizeYoutubeValor } from "../lib/extract-youtube-id.ts";
import { ensureCorpusDirs, saveVideoLink } from "../lib/manifest.ts";
import {
	loadLocalSkipIndex,
	partitionBySkip,
	type LocalSkipIndex,
	type SkipReason,
} from "../lib/skip-index.ts";
import type { CapacitacionCourseSummary, CapacitacionVideoEntry } from "../lib/types.ts";
import {
	classifyYoutubeError,
	loadUnavailableVideos,
	reconcilePermanentErrorsFromLinks,
	recordUnavailableVideo,
	unavailableIdSet,
} from "../lib/unavailable-videos.ts";
import { recordWhisperPending } from "../lib/whisper-queue.ts";
import { loadYoutubeCorpusIndex } from "../lib/youtube-dedupe.ts";
import {
	buildVideoCorpusRecord,
	fetchVideoBundle,
	persistVideoArtifacts,
} from "../../youtube/lib/fetch-video.ts";
import { CORPUS_BASE as YT_CORPUS_BASE } from "../../youtube/lib/corpus-paths.ts";

const CHANNEL_TITLE = "ContaPyme Software Contable";
const CHANNEL_ID = "UCPeasMTjLab3kMBdRvG7vAg";

const DB_CURSO: CapacitacionCourseSummary = {
	icurso: "DB:RECURSOS_ATRIBUTOS",
	ncurso: "Videos ocultos — RECURSOS_ATRIBUTOS",
	descripcion: "Importación directa desde clientesis.RECURSOS_ATRIBUTOS",
};

interface DbSnapshot {
	table?: string;
	rows?: Array<{ valor?: string }>;
}

interface CliOptions {
	importPath: string;
	limit: number;
	offset: number;
	delayMs: number;
	resume: boolean;
	fetchYoutube: boolean;
	dryRun: boolean;
}

function parseCli(argv: string[]): CliOptions {
	const opts: CliOptions = {
		importPath: RECURSOS_ATRIBUTOS_SNAPSHOT_PATH,
		limit: 0,
		offset: 0,
		delayMs: 1500,
		resume: true,
		fetchYoutube: true,
		dryRun: false,
	};

	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i]!;
		if (a === "--import") opts.importPath = argv[++i] ?? opts.importPath;
		else if (a.startsWith("--import=")) opts.importPath = a.slice("--import=".length);
		else if (a === "--limit") opts.limit = Number(argv[++i] ?? 0);
		else if (a.startsWith("--limit=")) opts.limit = Number(a.slice("--limit=".length));
		else if (a === "--offset") opts.offset = Number(argv[++i] ?? 0);
		else if (a.startsWith("--offset=")) opts.offset = Number(a.slice("--offset=".length));
		else if (a === "--delay") opts.delayMs = Number(argv[++i] ?? opts.delayMs);
		else if (a.startsWith("--delay=")) opts.delayMs = Number(a.slice("--delay=".length));
		else if (a === "--no-resume") opts.resume = false;
		else if (a === "--no-youtube") opts.fetchYoutube = false;
		else if (a === "--dry-run") opts.dryRun = true;
	}
	return opts;
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

function loadUniqueIds(snapshot: DbSnapshot): string[] {
	const seen = new Set<string>();
	const ids: string[] = [];
	for (const row of snapshot.rows ?? []) {
		const id = normalizeYoutubeValor(row.valor);
		if (!id || seen.has(id)) continue;
		seen.add(id);
		ids.push(id);
	}
	return ids;
}

function entryForId(youtubeId: string): CapacitacionVideoEntry {
	return {
		entryId: entryIdForVideo(youtubeId),
		youtubeId,
		titulo: youtubeId,
		source: "db-recursos-atributos",
	};
}

async function processId(
	youtubeId: string,
	youtubeIndex: Awaited<ReturnType<typeof loadYoutubeCorpusIndex>>,
	local: LocalSkipIndex,
	opts: CliOptions,
	stats: {
		enriched: number;
		fetched: number;
		pending: number;
		skipped: number;
		skippedByReason: Record<SkipReason, number>;
		errors: number;
		unavailable: number;
	},
): Promise<"fetched" | "error" | "unavailable" | "skip"> {
	const entry = entryForId(youtubeId);
	const prevLink = local.links.get(youtubeId) ?? null;

	if (!opts.fetchYoutube || opts.dryRun) {
		stats.pending += 1;
		if (!opts.dryRun) {
			const link = buildVideoLinkRecord({
				entryId: youtubeId,
				youtubeId,
				status: "pending",
				existing: prevLink,
				entry,
				curso: DB_CURSO,
			});
			await saveVideoLink(link);
			local.links.set(youtubeId, link);
		}
		return "skip";
	}

	try {
		const bundle = await fetchVideoBundle(youtubeId, {
			cacheRoot: YT_CORPUS_BASE,
			lang: "es,es-419",
			fetchComments: false,
			maxComments: 0,
			channelTitle: CHANNEL_TITLE,
			channelId: CHANNEL_ID,
			channelListUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
		});

		const hasSubs = bundle.segments.length > 0;
		const baseRecord = await buildVideoCorpusRecord(youtubeId, bundle, {
			cacheRoot: YT_CORPUS_BASE,
			lang: "es,es-419",
			fetchComments: false,
			maxComments: 0,
			channelTitle: CHANNEL_TITLE,
			channelId: CHANNEL_ID,
			channelListUrl: `https://www.youtube.com/channel/${CHANNEL_ID}`,
			transcriptMethod: hasSubs ? "yt-dlp-vtt-deduped" : "none",
			contentKind: "videos",
		});

		if (!hasSubs) {
			await recordWhisperPending({
				youtubeId,
				url: `https://www.youtube.com/watch?v=${youtubeId}`,
				source: "db-recursos-atributos",
				reason: "no-subs",
				title: baseRecord.ytdlp?.title,
			});
			console.warn(`[db] ${youtubeId} sin subtítulos → cola Whisper (MP3 + transcripción)`);
		}

		const link = buildVideoLinkRecord({
			entryId: youtubeId,
			youtubeId,
			status: "fetched",
			existing: prevLink,
			entry: { ...entry, titulo: baseRecord.ytdlp?.title ?? youtubeId },
			curso: DB_CURSO,
		});
		const enriched: CapacitacionEnrichedVideo = attachCapacitacionToRecord(baseRecord, link);

		await mkdir(VIDEOS_DIR, { recursive: true });
		await writeFile(join(VIDEOS_DIR, `${youtubeId}.json`), `${JSON.stringify(enriched, null, 2)}\n`, "utf8");
		await persistVideoArtifacts(baseRecord, bundle.infoPath);
		await saveVideoLink(link);
		local.links.set(youtubeId, link);
		local.capacitacionVideoIds.add(youtubeId);

		stats.fetched += 1;
		console.log(`[db] ${youtubeId} OK — ${(baseRecord.ytdlp?.title ?? youtubeId).slice(0, 70)}`);
		return "fetched";
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		const { permanent, reason } = classifyYoutubeError(msg);

		if (permanent) {
			await recordUnavailableVideo({
				youtubeId,
				error: msg,
				source: "db-recursos-atributos",
			});
			const link = buildVideoLinkRecord({
				entryId: youtubeId,
				youtubeId,
				status: "unavailable",
				existing: prevLink,
				entry,
				curso: DB_CURSO,
				error: msg,
			});
			await saveVideoLink(link);
			local.links.set(youtubeId, link);
			local.unavailableIds.add(youtubeId);
			stats.unavailable += 1;
			console.warn(`[db] ${youtubeId} UNAVAILABLE (${reason}) — ${msg.slice(0, 100)}`);
			return "unavailable";
		}

		stats.errors += 1;
		const link = buildVideoLinkRecord({
			entryId: youtubeId,
			youtubeId,
			status: "error",
			existing: prevLink,
			entry,
			curso: DB_CURSO,
			error: msg,
		});
		await saveVideoLink(link);
		local.links.set(youtubeId, link);
		console.error(`[db] ${youtubeId} ERROR — ${msg.slice(0, 120)}`);
		return "error";
	}
}

async function main(): Promise<void> {
	const opts = parseCli(process.argv.slice(2));
	const raw = await readFile(opts.importPath, "utf8");
	const snapshot = JSON.parse(raw) as DbSnapshot;
	let ids = loadUniqueIds(snapshot);

	console.log("=== Capacitación — RECURSOS_ATRIBUTOS ===");
	console.log(`Snapshot: ${opts.importPath}`);
	console.log(`Corpus: ${CORPUS_BASE}`);
	console.log(`IDs únicos: ${ids.length} (filas: ${snapshot.rows?.length ?? 0})`);

	const [youtubeIndex, local] = await Promise.all([loadYoutubeCorpusIndex(), loadLocalSkipIndex()]);
	const reconciled = await reconcilePermanentErrorsFromLinks(
		[...local.links.values()].map((l) => ({
			youtubeId: l.youtubeId,
			status: l.status,
			error: l.error,
			source: "db-recursos-atributos",
		})),
	);
	if (reconciled > 0) {
		const refreshed = await loadUnavailableVideos();
		local.unavailableFile = refreshed;
		local.unavailableIds = unavailableIdSet(refreshed);
	}
	console.log(`Índice corpus YouTube: ${youtubeIndex.byVideoId.size} videos`);
	console.log(
		`Links locales: ${local.links.size} | videos capacitación: ${local.capacitacionVideoIds.size} | no disponibles: ${local.unavailableIds.size}${reconciled > 0 ? ` (+${reconciled} reconciliados)` : ""}`,
	);

	if (opts.offset > 0) ids = ids.slice(opts.offset);
	if (opts.limit > 0) ids = ids.slice(0, opts.limit);

	const { pending, counts: preSkip } = partitionBySkip(ids, youtubeIndex, local, opts.resume);
	console.log(
		`Prechequeo: ${ids.length - pending.length} omitidos al instante, ${pending.length} pendientes`,
	);
	console.log(
		`  link_done=${preSkip.link_done} corpus_YT=${preSkip.youtube_corpus_local} cap_local=${preSkip.capacitacion_local} unavailable=${preSkip.unavailable_permanent}`,
	);

	await ensureCorpusDirs();
	await mkdir(LINKS_DIR, { recursive: true });

	const stats = {
		enriched: 0,
		fetched: 0,
		pending: 0,
		skipped: ids.length - pending.length,
		skippedByReason: { ...preSkip },
		errors: 0,
		unavailable: 0,
	};

	if (!pending.length) {
		console.log("Nada pendiente — finalizado al instante.");
	} else {
		console.log(`Descargando ${pending.length} videos pendientes…`);
		for (let i = 0; i < pending.length; i += 1) {
			const id = pending[i]!;
			if ((i + 1) % 5 === 0 || i === 0) {
				console.log(`--- progreso ${i + 1}/${pending.length} ---`);
			}
			const outcome = await processId(id, youtubeIndex, local, opts, stats);
			if (outcome === "fetched" && opts.fetchYoutube && opts.delayMs > 0) {
				await sleep(opts.delayMs);
			}
		}
	}

	console.log("\n=== Resumen ===");
	console.log(JSON.stringify({ ...stats, processed: ids.length, dryRun: opts.dryRun }, null, 2));
}

main().catch((e: unknown) => {
	console.error(e instanceof Error ? e.stack ?? e.message : String(e));
	process.exit(1);
});
