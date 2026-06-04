/**
 * Canal ContaPyme → un .md + .json + .info.json por video (metadatos, métricas,
 * comentarios, técnica, transcripción) + corpus.md (join para embedding).
 */
import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
	buildVideoCorpusRecord,
	fetchVideoBundle,
	loadCachedRecord,
	persistVideoArtifacts,
	refreshRecordTranscript,
} from "../lib/fetch-video.ts";
import { TRANSCRIPT_DEDUPE_VERSION } from "../lib/dedupe-segments.ts";
import { corpusHeader, corpusVideoSection, videoCorpusMarkdown } from "../lib/transcript-md.ts";
import {
	type ContentKind,
	CONTENT_KINDS,
	CORPUS_BASE,
	contentRoot,
	absoluteVideoPaths,
	publishYearFromRecord,
	resolveVideoArtifacts,
} from "../lib/corpus-paths.ts";
import { CORPUS_SCHEMA_VERSION, type VideoCorpusRecord } from "../lib/types.ts";

const CHANNEL_HANDLE = "ContaPymeSoftwareContable";
const CHANNEL_PLAYLISTS: Array<{ kind: ContentKind; url: string }> = [
	{ kind: "videos", url: `https://www.youtube.com/@${CHANNEL_HANDLE}/videos` },
	{ kind: "shorts", url: `https://www.youtube.com/@${CHANNEL_HANDLE}/shorts` },
	{ kind: "streams", url: `https://www.youtube.com/@${CHANNEL_HANDLE}/streams` },
];
const CHANNEL_TITLE = "ContaPyme Software Contable";
const CHANNEL_ID = "UCPeasMTjLab3kMBdRvG7vAg";
const PREFERRED_LANG = "es,es-419";

const OUT_DIR = CORPUS_BASE;

interface ManifestEntry {
	videoId: string;
	title: string;
	contentKind?: ContentKind;
	status: "ok" | "empty" | "error";
	segmentCount: number;
	transcriptChars: number;
	viewCount?: number;
	likeCount?: number;
	commentCount?: number;
	commentsFetched?: number;
	method?: string;
	error?: string;
	files?: { md: string; json: string; infoJson: string };
}

interface Manifest {
	schemaVersion: number;
	channelUrl: string;
	channelId: string;
	channelTitle: string;
	preferredLang: string;
	updatedAt: string;
	videos: ManifestEntry[];
}

interface CliOptions {
	limit: number;
	offset: number;
	delayMs: number;
	resume: boolean;
	listOnly: boolean;
	rebuildCorpus: boolean;
	fetchComments: boolean;
	maxComments: number;
	/** Si se define, solo procesa videos | shorts | streams (varios valores permitidos). */
	onlyKinds: ContentKind[] | null;
}

function parseCli(argv: string[]): CliOptions {
	let limit = 0;
	let offset = 0;
	let delayMs = 1500;
	let resume = true;
	let listOnly = false;
	let rebuildCorpus = true;
	let fetchComments = true;
	let maxComments = 100;
	const onlyKinds: ContentKind[] = [];

	for (let i = 0; i < argv.length; i += 1) {
		const a = argv[i];
		if (a === "--limit") limit = Number(argv[++i] ?? 0);
		else if (a.startsWith("--limit=")) limit = Number(a.slice("--limit=".length));
		else if (a === "--offset") offset = Number(argv[++i] ?? 0);
		else if (a.startsWith("--offset=")) offset = Number(a.slice("--offset=".length));
		else if (a === "--delay") delayMs = Number(argv[++i] ?? delayMs);
		else if (a.startsWith("--delay=")) delayMs = Number(a.slice("--delay=".length));
		else if (a === "--max-comments") maxComments = Number(argv[++i] ?? maxComments);
		else if (a.startsWith("--max-comments=")) maxComments = Number(a.slice("--max-comments=".length));
		else if (a === "--no-resume") resume = false;
		else if (a === "--no-comments") fetchComments = false;
		else if (a === "--list-only") listOnly = true;
		else if (a === "--no-corpus") rebuildCorpus = false;
		else if (a === "--only-kind") {
			const k = argv[++i] as ContentKind;
			if (!CONTENT_KINDS.includes(k)) throw new Error(`--only-kind: use ${CONTENT_KINDS.join(" | ")}`);
			onlyKinds.push(k);
		} else if (a.startsWith("--only-kind=")) {
			const k = a.slice("--only-kind=".length) as ContentKind;
			if (!CONTENT_KINDS.includes(k)) throw new Error(`--only-kind: use ${CONTENT_KINDS.join(" | ")}`);
			onlyKinds.push(k);
		} else if (a === "--help") {
			console.log(`Uso: npm run lab:yt:transcripts -- [opciones]

  --limit N          Máximo de videos (0 = todos)
  --offset N         Saltar los primeros N de la lista
  --only-kind K      Solo videos | shorts | streams (repetible)
  --delay MS         Pausa entre videos (default 1500)
  --max-comments N   Comentarios por video vía yt-dlp (default 100)
  --no-comments      No descargar comentarios (más rápido)
  --no-resume        Re-extraer aunque exista JSON (dedupe v${TRANSCRIPT_DEDUPE_VERSION}, sin [Música]/SFX)
  --list-only        Solo listar id + título
  --no-corpus        No regenerar corpus.md

Salida por video (tipo + año de publicación):
  videos/{año}/, shorts/{año}/, streams/{año}/
  cada uno con {id}.md, {id}.json, {id}.info.json

Join: corpus.md
`);
			process.exit(0);
		} else if (a.startsWith("--")) {
			throw new Error(`Opción no soportada: ${a}`);
		}
	}

	return {
		limit,
		offset,
		delayMs,
		resume,
		listOnly,
		rebuildCorpus,
		fetchComments,
		maxComments,
		onlyKinds: onlyKinds.length ? onlyKinds : null,
	};
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Solo salida en terminal (no se persiste en .md / .json). */
function formatElapsedMs(ms: number): string {
	if (ms < 1000) return `${Math.round(ms)}ms`;
	const s = ms / 1000;
	if (s < 60) return `${s.toFixed(1)}s`;
	const m = Math.floor(s / 60);
	const rest = Math.round(s % 60);
	return `${m}m ${rest}s`;
}

function listPlaylist(playlistUrl: string): { id: string; title: string }[] {
	const proc = spawnSync(
		"python",
		["-m", "yt_dlp", "--no-update", "--js-runtimes", "node", "--flat-playlist", "--print", "%(id)s\t%(title)s", playlistUrl],
		{ encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
	);
	if (proc.error) throw proc.error;
	if (proc.status !== 0) {
		throw new Error(`yt-dlp list falló (${playlistUrl}): ${proc.stderr || proc.stdout}`);
	}

	const items: { id: string; title: string }[] = [];
	for (const line of proc.stdout.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("WARNING:")) continue;
		const tab = trimmed.indexOf("\t");
		if (tab < 0) continue;
		const id = trimmed.slice(0, tab).trim();
		const title = trimmed.slice(tab + 1).trim();
		if (/^[a-zA-Z0-9_-]{11}$/.test(id)) items.push({ id, title });
	}
	return items;
}

function listAllChannelVideos(): Array<{ id: string; title: string; contentKind: ContentKind }> {
	const byId = new Map<string, { id: string; title: string; contentKind: ContentKind }>();
	const priority: ContentKind[] = ["videos", "shorts", "streams"];
	for (const pl of CHANNEL_PLAYLISTS) {
		const items = listPlaylist(pl.url);
		for (const v of items) {
			const prev = byId.get(v.id);
			if (!prev) {
				byId.set(v.id, { ...v, contentKind: pl.kind });
				continue;
			}
			const prevPri = priority.indexOf(prev.contentKind);
			const newPri = priority.indexOf(pl.kind);
			if (newPri < prevPri) byId.set(v.id, { ...v, contentKind: pl.kind });
		}
	}
	return [...byId.values()];
}

async function loadManifest(): Promise<Manifest | null> {
	try {
		const raw = await readFile(join(OUT_DIR, "manifest.json"), "utf8");
		return JSON.parse(raw) as Manifest;
	} catch {
		return null;
	}
}

async function saveManifest(manifest: Manifest): Promise<void> {
	await mkdir(OUT_DIR, { recursive: true });
	await writeFile(join(OUT_DIR, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function manifestEntry(
	video: { id: string; title: string; contentKind: ContentKind },
	record: VideoCorpusRecord | null,
	status: ManifestEntry["status"],
	error?: string,
): ManifestEntry {
	const y = record?.ytdlp;
	return {
		videoId: video.id,
		title: y?.title ?? video.title,
		contentKind: record?.contentKind ?? video.contentKind,
		status,
		segmentCount: record?.transcript.segmentCount ?? 0,
		transcriptChars: record?.transcript.transcriptChars ?? 0,
		viewCount: y?.view_count,
		likeCount: y?.like_count,
		commentCount: y?.comment_count,
		commentsFetched: record?.comments.fetched,
		method: record?.transcript.method,
		error,
		files:
			status === "ok" && record
				? {
						md: record.files.md,
						json: record.files.json,
						infoJson: record.files.infoJson,
					}
				: undefined,
	};
}

async function writeMd(record: VideoCorpusRecord): Promise<void> {
	const kind = record.contentKind ?? "videos";
	const year = record.publishYear ?? publishYearFromRecord(record);
	const paths = absoluteVideoPaths(contentRoot(kind), record.videoId, year, kind);
	await mkdir(paths.dir, { recursive: true });
	await writeFile(paths.md, videoCorpusMarkdown(record), "utf8");
}

export async function rebuildCorpusFile(manifest: Manifest): Promise<void> {
	const ok = manifest.videos.filter((v) => v.status === "ok" && v.files?.json);
	const sections: string[] = [
		corpusHeader({
			channelTitle: CHANNEL_TITLE,
			channelUrl: CHANNEL_PLAYLISTS[0].url,
			videoCount: manifest.videos.length,
			okCount: ok.length,
			extractedAt: manifest.updatedAt,
		}),
	];

	for (const entry of ok) {
		try {
			const raw = await readFile(join(OUT_DIR, entry.files!.json), "utf8");
			const record = JSON.parse(raw) as VideoCorpusRecord;
			if (record.schemaVersion !== CORPUS_SCHEMA_VERSION || !record.ytdlp) continue;
			sections.push(corpusVideoSection(record));
		} catch {
			/* JSON antiguo o incompleto */
		}
	}

	await writeFile(join(OUT_DIR, "corpus.md"), sections.join("\n"), "utf8");
	console.log(`corpus.md → ${ok.length} videos`);
}

async function main(): Promise<void> {
	const opts = parseCli(process.argv.slice(2));

	console.log("Listando canal (videos + shorts + streams)…");
	let all = listAllChannelVideos();
	if (opts.onlyKinds?.length) {
		const allowed = new Set(opts.onlyKinds);
		all = all.filter((v) => allowed.has(v.contentKind));
		console.log(`Filtro --only-kind: ${opts.onlyKinds.join(", ")} → ${all.length} ítems`);
	}
	const byKind = Object.fromEntries(
		CONTENT_KINDS.map((k) => [k, all.filter((v) => v.contentKind === k).length]),
	);
	console.log(`Total: ${all.length} · videos=${byKind.videos} shorts=${byKind.shorts} streams=${byKind.streams}`);

	const slice = all.slice(opts.offset, opts.limit > 0 ? opts.offset + opts.limit : undefined);
	if (opts.listOnly) {
		for (const v of slice) console.log(`${v.id}\t${v.title}`);
		return;
	}

	const fetchOpts = {
		cacheRoot: OUT_DIR,
		lang: PREFERRED_LANG,
		fetchComments: opts.fetchComments,
		maxComments: opts.maxComments,
		channelTitle: CHANNEL_TITLE,
		channelId: CHANNEL_ID,
		channelListUrl: CHANNEL_PLAYLISTS[0].url,
	};

	for (const kind of CONTENT_KINDS) {
		await mkdir(contentRoot(kind), { recursive: true });
	}
	const prev = await loadManifest();
	const manifest: Manifest = {
		schemaVersion: CORPUS_SCHEMA_VERSION,
		channelUrl: CHANNEL_PLAYLISTS[0].url,
		channelId: CHANNEL_ID,
		channelTitle: CHANNEL_TITLE,
		preferredLang: PREFERRED_LANG,
		updatedAt: new Date().toISOString(),
		videos: prev?.videos ?? [],
	};

	const byId = new Map(manifest.videos.map((v) => [v.videoId, v]));

	for (let i = 0; i < slice.length; i += 1) {
		const video = slice[i];
		const t0 = performance.now();
		process.stdout.write(`[${i + 1}/${slice.length}] ${video.contentKind}/${video.id} … `);

		const cached = await loadCachedRecord(video.id, opts.resume, video.contentKind);
		if (cached) {
			await writeMd(cached);
			console.log(
				`skip (dedupe v${TRANSCRIPT_DEDUPE_VERSION}, ${cached.transcript.segmentCount} segs) · ${formatElapsedMs(performance.now() - t0)}`,
			);
			byId.set(video.id, manifestEntry(video, cached, "ok"));
			continue;
		}

		if (opts.resume) {
			try {
				const existingPath = await resolveVideoArtifacts(video.id, {
					kind: video.contentKind,
				}).then((p) => p.json);
				const raw = await readFile(existingPath, "utf8");
				const existing = JSON.parse(raw) as VideoCorpusRecord;
				if (existing.schemaVersion === CORPUS_SCHEMA_VERSION && existing.transcript?.segmentCount > 0) {
					const refreshed = await refreshRecordTranscript(OUT_DIR, existing);
					if (refreshed) {
						const infoPath = join(OUT_DIR, "fetch-cache", video.id, `${video.id}.info.json`);
						await persistVideoArtifacts(refreshed, infoPath);
						await writeMd(refreshed);
						console.log(
							`refresh dedupe v${TRANSCRIPT_DEDUPE_VERSION} (${existing.transcript.segmentCount}→${refreshed.transcript.segmentCount} segs) · ${formatElapsedMs(performance.now() - t0)}`,
						);
						byId.set(video.id, manifestEntry(video, refreshed, "ok"));
						if (i < slice.length - 1 && opts.delayMs > 0) await sleep(opts.delayMs);
						continue;
					}
				}
			} catch {
				/* sin JSON previo */
			}
		}

		try {
			const bundle = await fetchVideoBundle(video.id, fetchOpts);
			const method = bundle.segments.length ? "yt-dlp-vtt-deduped" : "none";
			const record = await buildVideoCorpusRecord(video.id, bundle, {
				...fetchOpts,
				listTitle: video.title,
				transcriptMethod: method,
				contentKind: video.contentKind,
			});

			await persistVideoArtifacts(record, bundle.infoPath);
			await writeMd(record);

			const elapsed = formatElapsedMs(performance.now() - t0);
			if (!record.transcript.segmentCount) {
				console.log(`empty (views=${record.ytdlp.view_count ?? "?"}) · ${elapsed}`);
				byId.set(video.id, manifestEntry(video, record, "empty"));
			} else {
				console.log(
					`ok (${record.transcript.segmentCount} segs, views=${record.ytdlp.view_count ?? "?"}, comments=${record.comments.fetched}) · ${elapsed}`,
				);
				byId.set(video.id, manifestEntry(video, record, "ok"));
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			console.log(`error: ${message.slice(0, 120)} · ${formatElapsedMs(performance.now() - t0)}`);
			byId.set(video.id, manifestEntry(video, null, "error", message));
		}

		if (i < slice.length - 1 && opts.delayMs > 0) await sleep(opts.delayMs);
	}

	manifest.videos = [...byId.values()].sort((a, b) => a.title.localeCompare(b.title, "es"));
	manifest.updatedAt = new Date().toISOString();
	await saveManifest(manifest);

	const ok = manifest.videos.filter((v) => v.status === "ok").length;
	console.log(`\nResumen: ok=${ok} · manifest actualizado`);

	if (opts.rebuildCorpus) await rebuildCorpusFile(manifest);

	console.log(
		"\nRAG: cuando el corpus esté listo → npm run lab:yt:index-rag (desde ISA-DOC)",
	);
	console.log("     (segmentos con startMs → citas con https://www.youtube.com/watch?v=…&t=Ns)");
}

const isDirectRun = process.argv[1]?.replace(/\\/g, "/").includes("fetch-contapyme-channel-transcripts");

if (isDirectRun) {
	main().catch((e: unknown) => {
		console.error(e instanceof Error ? e.message : String(e));
		process.exit(1);
	});
}
