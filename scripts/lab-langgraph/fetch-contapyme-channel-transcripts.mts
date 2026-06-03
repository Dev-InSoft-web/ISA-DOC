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
} from "./youtube-fetch-video.ts";
import { TRANSCRIPT_DEDUPE_VERSION } from "./youtube-dedupe-segments.ts";
import { corpusHeader, corpusVideoSection, videoCorpusMarkdown } from "./youtube-transcript-md.ts";
import { CORPUS_SCHEMA_VERSION, type VideoCorpusRecord } from "./youtube-types.ts";

const CHANNEL_URL = "https://www.youtube.com/@ContaPymeSoftwareContable/videos";
const CHANNEL_TITLE = "ContaPyme Software Contable";
const CHANNEL_ID = "UCPeasMTjLab3kMBdRvG7vAg";
const PREFERRED_LANG = "es,es-419";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT_DIR = join(ROOT, "data/lab-langgraph/vectorize/youtube/contapyme-software-contable");
const VIDEOS_DIR = join(OUT_DIR, "videos");

interface ManifestEntry {
	videoId: string;
	title: string;
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
		else if (a === "--help") {
			console.log(`Uso: npm run lab:yt:transcripts -- [opciones]

  --limit N          Máximo de videos (0 = todos)
  --offset N         Saltar los primeros N de la lista
  --delay MS         Pausa entre videos (default 1500)
  --max-comments N   Comentarios por video vía yt-dlp (default 100)
  --no-comments      No descargar comentarios (más rápido)
  --no-resume        Re-extraer aunque exista JSON (dedupe v${TRANSCRIPT_DEDUPE_VERSION}, sin [Música]/SFX)
  --list-only        Solo listar id + título
  --no-corpus        No regenerar corpus.md

Salida por video en ISA-DOC:
  videos/{id}.md       Documento completo (métricas, desc, comentarios, transcripción)
  videos/{id}.json     Registro estructurado (RAG / tooling)
  videos/{id}.info.json  Dump crudo yt-dlp

Join: corpus.md
`);
			process.exit(0);
		} else if (a.startsWith("--")) {
			throw new Error(`Opción no soportada: ${a}`);
		}
	}

	return { limit, offset, delayMs, resume, listOnly, rebuildCorpus, fetchComments, maxComments };
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

function listChannelVideos(): { id: string; title: string }[] {
	const proc = spawnSync(
		"python",
		["-m", "yt_dlp", "--flat-playlist", "--no-update", "--print", "%(id)s\t%(title)s", CHANNEL_URL],
		{ encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
	);
	if (proc.error) throw proc.error;
	if (proc.status !== 0) {
		throw new Error(`yt-dlp list falló: ${proc.stderr || proc.stdout}`);
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

function manifestEntry(video: { id: string; title: string }, record: VideoCorpusRecord | null, status: ManifestEntry["status"], error?: string): ManifestEntry {
	const y = record?.ytdlp;
	return {
		videoId: video.id,
		title: y?.title ?? video.title,
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
	await mkdir(VIDEOS_DIR, { recursive: true });
	await writeFile(join(VIDEOS_DIR, `${record.videoId}.md`), videoCorpusMarkdown(record), "utf8");
}

export async function rebuildCorpusFile(manifest: Manifest): Promise<void> {
	const ok = manifest.videos.filter((v) => v.status === "ok" && v.files?.json);
	const sections: string[] = [
		corpusHeader({
			channelTitle: CHANNEL_TITLE,
			channelUrl: CHANNEL_URL,
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

	console.log("Listando canal…", CHANNEL_URL);
	const all = listChannelVideos();
	console.log(`Videos: ${all.length}`);

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
		channelListUrl: CHANNEL_URL,
	};

	await mkdir(VIDEOS_DIR, { recursive: true });
	const prev = await loadManifest();
	const manifest: Manifest = {
		schemaVersion: CORPUS_SCHEMA_VERSION,
		channelUrl: CHANNEL_URL,
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
		process.stdout.write(`[${i + 1}/${slice.length}] ${video.id} … `);

		const cached = await loadCachedRecord(VIDEOS_DIR, video.id, opts.resume);
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
				const raw = await readFile(join(VIDEOS_DIR, `${video.id}.json`), "utf8");
				const existing = JSON.parse(raw) as VideoCorpusRecord;
				if (existing.schemaVersion === CORPUS_SCHEMA_VERSION && existing.transcript?.segmentCount > 0) {
					const refreshed = await refreshRecordTranscript(OUT_DIR, existing);
					if (refreshed) {
						const infoPath = join(OUT_DIR, "fetch-cache", video.id, `${video.id}.info.json`);
						await persistVideoArtifacts(VIDEOS_DIR, refreshed, infoPath);
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
			});

			await persistVideoArtifacts(VIDEOS_DIR, record, bundle.infoPath);
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
		"\nRAG: cuando el corpus esté listo → cd ../lab-langgraph && npm run index:youtube",
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
