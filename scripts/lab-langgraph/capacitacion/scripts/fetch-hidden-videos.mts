/**
 * Scraper de videos ocultos — capacitación virtual ContaPyme.
 *
 * - Lista cursos (API ContaPymeU o courses-snapshot.json)
 * - Extrae títulos, descripciones y profesores del plan/API o HTML
 * - Omite videos ya presentes en corpus YouTube del canal
 * - Descarga solo videos nuevos vía pipeline yt-dlp existente
 * - Manifest reanudable por curso y por video
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadAuthConfig } from "../lib/auth.ts";
import { fetchCoursePlan, fetchCoursesList } from "../lib/api.ts";
import { CORPUS_BASE, VIDEOS_DIR } from "../lib/corpus-paths.ts";
import {
	attachCapacitacionToRecord,
	buildVideoLinkRecord,
	type CapacitacionEnrichedVideo,
} from "../lib/enrich-record.ts";
import { parseCourseHtml } from "../lib/parse-course-html.ts";
import {
	ensureCorpusDirs,
	loadCourseRecord,
	loadCoursesSnapshot,
	loadManifest,
	loadVideoLink,
	saveCourseRecord,
	saveCoursesSnapshot,
	saveManifest,
	saveVideoLink,
} from "../lib/manifest.ts";
import type {
	CapacitacionCourseRecord,
	CapacitacionManifest,
	CapacitacionVideoEntry,
	CoursesListSnapshot,
} from "../lib/types.ts";
import { entryIdForVideo } from "../lib/extract-youtube-id.ts";
import { loadYoutubeCorpusIndex } from "../lib/youtube-dedupe.ts";
import { classifySkip, loadLocalSkipIndex, type LocalSkipIndex } from "../lib/skip-index.ts";
import {
	classifyYoutubeError,
	recordUnavailableVideo,
} from "../lib/unavailable-videos.ts";
import { recordWhisperPending } from "../lib/whisper-queue.ts";
import {
	buildVideoCorpusRecord,
	fetchVideoBundle,
	persistVideoArtifacts,
} from "../../youtube/lib/fetch-video.ts";
import { CORPUS_BASE as YT_CORPUS_BASE } from "../../youtube/lib/corpus-paths.ts";

const CHANNEL_TITLE = "ContaPyme Software Contable";
const CHANNEL_ID = "UCPeasMTjLab3kMBdRvG7vAg";

interface CliOptions {
	limit: number;
	offset: number;
	delayMs: number;
	resume: boolean;
	forcePlan: boolean;
	icursos: string[];
	fetchYoutube: boolean;
	htmlDir: string | null;
	importSnapshot: string | null;
}

function parseCli(argv: string[]): CliOptions {
	const opts: CliOptions = {
		limit: 0,
		offset: 0,
		delayMs: 1200,
		resume: true,
		forcePlan: false,
		icursos: [],
		fetchYoutube: true,
		htmlDir: null,
		importSnapshot: null,
	};

	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i]!;
		if (a === "--limit") opts.limit = Number(argv[++i] ?? 0);
		else if (a.startsWith("--limit=")) opts.limit = Number(a.slice("--limit=".length));
		else if (a === "--offset") opts.offset = Number(argv[++i] ?? 0);
		else if (a.startsWith("--offset=")) opts.offset = Number(a.slice("--offset=".length));
		else if (a === "--delay") opts.delayMs = Number(argv[++i] ?? opts.delayMs);
		else if (a.startsWith("--delay=")) opts.delayMs = Number(a.slice("--delay=".length));
		else if (a === "--no-resume") opts.resume = false;
		else if (a === "--force-plan") opts.forcePlan = true;
		else if (a === "--no-youtube") opts.fetchYoutube = false;
		else if (a === "--html-dir") opts.htmlDir = argv[++i] ?? null;
		else if (a.startsWith("--html-dir=")) opts.htmlDir = a.slice("--html-dir=".length);
		else if (a === "--import-snapshot") opts.importSnapshot = argv[++i] ?? null;
		else if (a.startsWith("--import-snapshot=")) opts.importSnapshot = a.slice("--import-snapshot=".length);
		else if (!a.startsWith("-")) opts.icursos.push(a);
	}
	return opts;
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

async function loadCourses(
	auth: ReturnType<typeof loadAuthConfig>,
	opts: CliOptions,
): Promise<CoursesListSnapshot> {
	if (opts.importSnapshot) {
		const raw = await readFile(opts.importSnapshot, "utf8");
		const parsed = JSON.parse(raw) as CoursesListSnapshot | { respuesta?: { datos?: unknown[] } };
		if ("respuesta" in parsed && parsed.respuesta?.datos) {
			return {
				schemaVersion: 1,
				savedAt: new Date().toISOString(),
				source: "import",
				totalregistros: parsed.respuesta.datos.length,
				datos: parsed.respuesta.datos as CoursesListSnapshot["datos"],
			};
		}
		return parsed as CoursesListSnapshot;
	}

	const cached = await loadCoursesSnapshot();
	if (cached?.datos?.length) return cached;

	if (!auth.token) {
		throw new Error(
			"Sin courses-snapshot.json ni token API. Use --import-snapshot=<json> o defina CAPACITACION_API_TOKEN.",
		);
	}

	const snap = await fetchCoursesList({ baseUrl: auth.apiBase, token: auth.token });
	await saveCoursesSnapshot(snap);
	return snap;
}

async function videosFromHtmlDir(htmlDir: string, icurso: string): Promise<CapacitacionVideoEntry[]> {
	for (const ext of [".html", ".json"] as const) {
		const path = join(htmlDir, `${icurso}${ext}`);
		try {
			const raw = await readFile(path, "utf8");
			if (ext === ".json") {
				const parsed = JSON.parse(raw) as { html?: string };
				if (parsed.html) return parseCourseHtml(parsed.html, icurso);
				continue;
			}
			return parseCourseHtml(raw, icurso);
		} catch {
			/* try next */
		}
	}
	return [];
}

async function processVideoEntry(args: {
	entry: CapacitacionVideoEntry;
	curso: CapacitacionCourseRecord["curso"];
	youtubeIndex: Awaited<ReturnType<typeof loadYoutubeCorpusIndex>>;
	local: LocalSkipIndex;
	opts: CliOptions;
	stats: { skipped: number; fetched: number; errors: number; unavailable: number };
}): Promise<boolean> {
	const { entry, curso, youtubeIndex, local, opts, stats } = args;
	const youtubeId = entry.youtubeId;
	const entryId = entryIdForVideo(youtubeId, entry.irecurso);
	const prevLink = local.links.get(entryId) ?? local.links.get(youtubeId ?? "") ?? null;

	if (!youtubeId) {
		const link = buildVideoLinkRecord({
			entryId,
			status: "no_youtube_id",
			existing: prevLink,
			entry,
			curso,
		});
		await saveVideoLink(link);
		local.links.set(entryId, link);
		return false;
	}

	const skipReason = classifySkip({
		youtubeId,
		entryId,
		youtubeIndex,
		local,
		resume: opts.resume,
	});
	if (skipReason !== "pending") {
		stats.skipped += 1;
		return false;
	}

	if (!opts.fetchYoutube) {
		const link = buildVideoLinkRecord({
			entryId,
			youtubeId,
			status: "pending",
			existing: prevLink,
			entry,
			curso,
		});
		await saveVideoLink(link);
		local.links.set(entryId, link);
		return false;
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
			listTitle: entry.titulo,
			transcriptMethod: hasSubs ? "yt-dlp-vtt-deduped" : "none",
			contentKind: "videos",
		});

		if (!hasSubs) {
			await recordWhisperPending({
				youtubeId,
				url: `https://www.youtube.com/watch?v=${youtubeId}`,
				source: "html-page",
				reason: "no-subs",
				title: baseRecord.ytdlp?.title ?? entry.titulo,
			});
			console.warn(`   [video] ${youtubeId} sin subtítulos → cola Whisper (MP3 + transcripción)`);
		}

		const link = buildVideoLinkRecord({
			entryId,
			youtubeId,
			status: "fetched",
			existing: prevLink,
			entry,
			curso,
		});
		const enriched: CapacitacionEnrichedVideo = attachCapacitacionToRecord(baseRecord, link);

		await mkdir(VIDEOS_DIR, { recursive: true });
		const outPath = join(VIDEOS_DIR, `${youtubeId}.json`);
		await writeFile(outPath, `${JSON.stringify(enriched, null, 2)}\n`, "utf8");
		await persistVideoArtifacts(baseRecord, bundle.infoPath);

		await saveVideoLink(link);
		local.links.set(entryId, link);
		local.capacitacionVideoIds.add(youtubeId);
		stats.fetched += 1;
		console.log(`   [video] ${youtubeId} OK — ${entry.titulo.slice(0, 60)}`);
		return true;
	} catch (e) {
		const msg = e instanceof Error ? e.message : String(e);
		const { permanent, reason } = classifyYoutubeError(msg);

		if (permanent) {
			await recordUnavailableVideo({
				youtubeId,
				error: msg,
				source: "html-page",
			});
			const link = buildVideoLinkRecord({
				entryId,
				youtubeId,
				status: "unavailable",
				existing: prevLink,
				entry,
				curso,
				error: msg,
			});
			await saveVideoLink(link);
			local.links.set(entryId, link);
			local.unavailableIds.add(youtubeId);
			stats.unavailable += 1;
			console.warn(`   [video] ${youtubeId} UNAVAILABLE (${reason}) — ${msg.slice(0, 100)}`);
			return true;
		}

		stats.errors += 1;
		const link = buildVideoLinkRecord({
			entryId,
			youtubeId,
			status: "error",
			existing: prevLink,
			entry,
			curso,
			error: msg,
		});
		await saveVideoLink(link);
		local.links.set(entryId, link);
		console.error(`   [video] ${youtubeId} ERROR — ${msg.slice(0, 120)}`);
		return true;
	}
}

async function processCourse(
	icurso: string,
	courseSummary: CapacitacionCourseRecord["curso"],
	auth: ReturnType<typeof loadAuthConfig>,
	opts: CliOptions,
	youtubeIndex: Awaited<ReturnType<typeof loadYoutubeCorpusIndex>>,
	local: LocalSkipIndex,
): Promise<CapacitacionCourseRecord> {
	const cached = opts.resume ? await loadCourseRecord(icurso) : null;
	let videos: CapacitacionVideoEntry[] = [];
	let curso = courseSummary;
	let error: string | undefined;

	const useCachedPlan =
		opts.resume && !opts.forcePlan && cached?.planFetched && cached.videos.length > 0;

	if (useCachedPlan) {
		videos = cached!.videos;
		curso = cached!.curso;
		console.log(`[curso] ${icurso} — plan desde caché (${videos.length} videos)`);
	} else {
		try {
			if (opts.htmlDir) {
				videos = await videosFromHtmlDir(opts.htmlDir, icurso);
			} else if (auth.token) {
				const plan = await fetchCoursePlan({ baseUrl: auth.apiBase, token: auth.token }, icurso);
				curso = { ...courseSummary, ...plan.curso, icurso: courseSummary.icurso };
				videos = plan.videos;
			} else {
				throw new Error("Sin token API ni --html-dir para obtener el plan del curso");
			}
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
			console.error(`[curso] ${icurso} ERROR plan — ${error}`);
		}
	}

	const record: CapacitacionCourseRecord = {
		schemaVersion: 1,
		icurso,
		cursoFetched: true,
		planFetched: videos.length > 0 && !error,
		fetchedAt: new Date().toISOString(),
		error,
		curso,
		videoIds: videos.map((v) => v.entryId),
		videos,
	};
	await saveCourseRecord(record);

	if (!videos.length) return record;

	console.log(`[curso] ${icurso} — ${videos.length} videos (${curso.ncurso})`);
	const stats = { skipped: 0, fetched: 0, errors: 0, unavailable: 0 };
	const pending = videos.filter(
		(v) =>
			v.youtubeId &&
			classifySkip({
				youtubeId: v.youtubeId,
				entryId: v.entryId,
				youtubeIndex,
				local,
				resume: opts.resume,
			}) === "pending",
	);
	if (pending.length < videos.length) {
		console.log(`   ${videos.length - pending.length} omitidos al instante, ${pending.length} pendientes`);
	}

	for (const entry of pending) {
		const didFetch = await processVideoEntry({ entry, curso, youtubeIndex, local, opts, stats });
		if (didFetch && opts.delayMs > 0) await sleep(opts.delayMs);
	}

	console.log(
		`   resumen: ${stats.fetched} nuevos, ${stats.skipped} omitidos, ${stats.unavailable} no disponibles, ${stats.errors} errores`,
	);
	return record;
}

async function main(): Promise<void> {
	const opts = parseCli(process.argv.slice(2));
	const auth = loadAuthConfig();

	console.log("=== Capacitación virtual — videos ocultos ===");
	console.log(`Corpus: ${CORPUS_BASE}`);
	console.log(`API: ${auth.apiBase} (token: ${auth.token ? "sí" : "no"})`);

	await ensureCorpusDirs();
	const coursesSnap = await loadCourses(auth, opts);
	let courses = coursesSnap.datos.filter((c) => c.bactivo !== false);

	if (opts.icursos.length) {
		const set = new Set(opts.icursos.map((x) => x.toUpperCase()));
		courses = courses.filter((c) => set.has(c.icurso.toUpperCase()));
	}

	if (opts.offset > 0) courses = courses.slice(opts.offset);
	if (opts.limit > 0) courses = courses.slice(0, opts.limit);

	console.log(`Cursos a procesar: ${courses.length} / ${coursesSnap.totalregistros}`);

	const [youtubeIndex, local] = await Promise.all([loadYoutubeCorpusIndex(), loadLocalSkipIndex()]);
	console.log(`Índice corpus YouTube: ${youtubeIndex.byVideoId.size} videos`);
	console.log(`Links locales: ${local.links.size} | videos capacitación: ${local.capacitacionVideoIds.size}`);

	const courseResults: CapacitacionCourseRecord[] = [];
	for (const c of courses) {
		const rec = await processCourse(c.icurso, c, auth, opts, youtubeIndex, local);
		courseResults.push(rec);
	}

	const manifest: CapacitacionManifest = {
		schemaVersion: 1,
		updatedAt: new Date().toISOString(),
		apiBase: auth.apiBase,
		coursesTotal: courses.length,
		coursesPlanFetched: courseResults.filter((r) => r.planFetched).length,
		videosDiscovered: courseResults.reduce((n, r) => n + r.videos.length, 0),
		videosSkippedInYoutubeCorpus: 0,
		videosEnrichedFromCorpus: 0,
		videosFetched: 0,
		videosErrors: 0,
		courses: courseResults.map((r) => ({
			icurso: r.icurso,
			ncurso: r.curso.ncurso,
			planFetched: r.planFetched,
			videoCount: r.videos.length,
			error: r.error,
		})),
	};

	for (const r of courseResults) {
		for (const v of r.videos) {
			const link = await loadVideoLink(v.entryId);
			if (!link) continue;
			if (link.status === "skipped_in_youtube_corpus") manifest.videosSkippedInYoutubeCorpus += 1;
			if (link.status === "enriched_only") manifest.videosEnrichedFromCorpus += 1;
			if (link.status === "fetched") manifest.videosFetched += 1;
			if (link.status === "error") manifest.videosErrors += 1;
		}
	}

	await saveManifest(manifest);
	console.log("\n=== Manifest actualizado ===");
	console.log(JSON.stringify(manifest, null, 2));
}

main().catch((e: unknown) => {
	console.error(e instanceof Error ? e.stack ?? e.message : String(e));
	process.exit(1);
});
