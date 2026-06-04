import { spawnSync } from "node:child_process";
import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
	parseCaptionPayload,
	type CaptionSegment,
} from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import {
	dedupeRollingCaptionSegments,
	TRANSCRIPT_DEDUPE_VERSION,
} from "./dedupe-segments.ts";
import { resolveVideoDescription } from "./description.ts";
import { buildTranscriptPlainText } from "./rag.ts";
import {
	type ContentKind,
	absoluteVideoPaths,
	contentRoot,
	ensureYearDir,
	publishYearFromRecord,
	relativeVideoFiles,
	resolveVideoArtifacts,
} from "./corpus-paths.ts";
import {
	CORPUS_SCHEMA_VERSION,
	type OEmbedInfo,
	type VideoCorpusRecord,
	type VideoTechnicalSummary,
	type YtDlpComment,
	type YtDlpVideoInfo,
} from "./types.ts";

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124 Safari/537.36";

export interface FetchVideoOptions {
	cacheRoot: string;
	lang: string;
	fetchComments: boolean;
	maxComments: number;
	channelTitle: string;
	channelId: string;
	channelListUrl: string;
}

const PICK_INFO_KEYS: (keyof YtDlpVideoInfo)[] = [
	"id",
	"title",
	"fulltitle",
	"description",
	"duration",
	"duration_string",
	"upload_date",
	"timestamp",
	"view_count",
	"like_count",
	"comment_count",
	"channel",
	"channel_id",
	"channel_url",
	"uploader",
	"uploader_id",
	"uploader_url",
	"categories",
	"tags",
	"language",
	"age_limit",
	"live_status",
	"availability",
	"playable_in_embed",
	"thumbnail",
	"thumbnails",
	"webpage_url",
	"original_url",
	"is_live",
	"was_live",
	"chapters",
	"heatmap",
];

/** yt-dlp ≥2025 exige runtime JS para el extractor de YouTube. */
const YT_DLP_BASE = ["--no-update", "--js-runtimes", "node"] as const;

function runYtDlp(args: string[], timeoutMs = 180_000): { ok: boolean; stderr: string } {
	const proc = spawnSync("python", ["-m", "yt_dlp", ...YT_DLP_BASE, ...args], {
		encoding: "utf8",
		timeout: timeoutMs,
		maxBuffer: 32 * 1024 * 1024,
	});
	const stderr = `${proc.stderr ?? ""}${proc.stdout ?? ""}`;
	return { ok: proc.status === 0, stderr };
}

function slimInfo(raw: Record<string, unknown>, comments: YtDlpComment[]): YtDlpVideoInfo {
	const out: YtDlpVideoInfo = { id: String(raw.id ?? "") };
	for (const key of PICK_INFO_KEYS) {
		if (raw[key] !== undefined) (out as Record<string, unknown>)[key] = raw[key];
	}
	if (Array.isArray(raw.formats)) {
		out.formats = raw.formats.map((f) => {
			const fmt = f as Record<string, unknown>;
			return {
				format_id: fmt.format_id,
				ext: fmt.ext,
				resolution: fmt.resolution,
				width: fmt.width,
				height: fmt.height,
				fps: fmt.fps,
				vcodec: fmt.vcodec,
				acodec: fmt.acodec,
				abr: fmt.abr,
				vbr: fmt.vbr,
				tbr: fmt.tbr,
				asr: fmt.asr,
				filesize: fmt.filesize,
				filesize_approx: fmt.filesize_approx,
				protocol: fmt.protocol,
			};
		});
	}
	out.comments = comments;
	return out;
}

function summarizeTechnical(info: YtDlpVideoInfo): VideoTechnicalSummary {
	const formats = (info.formats ?? []) as Array<Record<string, unknown>>;
	const scored = formats
		.filter((f) => f.vcodec && f.vcodec !== "none")
		.sort((a, b) => (Number(b.height) || 0) - (Number(a.height) || 0));
	const best = scored[0];
	return {
		bestFormatId: best?.format_id as string | undefined,
		container: best?.ext as string | undefined,
		resolution: best?.resolution as string | undefined,
		width: best?.width as number | undefined,
		height: best?.height as number | undefined,
		fps: best?.fps as number | undefined,
		vcodec: best?.vcodec as string | undefined,
		acodec: best?.acodec as string | undefined,
		abr: best?.abr as number | undefined,
		vbr: best?.vbr as number | undefined,
		tbr: best?.tbr as number | undefined,
		asr: best?.asr as number | undefined,
		filesizeApprox: (best?.filesize_approx ?? best?.filesize) as number | undefined,
		formatCount: formats.length,
	};
}

async function fetchOEmbed(videoUrl: string): Promise<OEmbedInfo | undefined> {
	try {
		const u = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
		const r = await fetch(u, { headers: { "user-agent": USER_AGENT } });
		if (!r.ok) return undefined;
		return (await r.json()) as OEmbedInfo;
	} catch {
		return undefined;
	}
}

export async function fetchVideoBundle(
	videoId: string,
	opts: FetchVideoOptions,
): Promise<{
	workDir: string;
	infoPath: string;
	vttPath: string | null;
	info: YtDlpVideoInfo;
	segments: CaptionSegment[];
	oembed?: OEmbedInfo;
}> {
	const workDir = join(opts.cacheRoot, "fetch-cache", videoId);
	await mkdir(workDir, { recursive: true });
	const url = `https://www.youtube.com/watch?v=${videoId}`;
	const outTpl = join(workDir, "%(id)s");

	const infoPath = join(workDir, `${videoId}.info.json`);
	const metaArgs = ["--skip-download", "--write-info-json", "-o", outTpl, url];
	if (opts.fetchComments) {
		metaArgs.push(
			"--write-comments",
			"--extractor-args",
			`youtube:max_comments=${opts.maxComments},all,-30;comment_sort=top`,
		);
	}

	const meta = runYtDlp(metaArgs);
	let raw: Record<string, unknown>;
	try {
		raw = JSON.parse(await readFile(infoPath, "utf8")) as Record<string, unknown>;
	} catch {
		throw new Error(`yt-dlp falló para ${videoId}: ${meta.stderr.slice(0, 500)}`);
	}
	if (!meta.ok) {
		console.warn(`[${videoId}] yt-dlp metadata con avisos: ${meta.stderr.slice(0, 200)}`);
	}

	const subArgs = [
		"--skip-download",
		"--write-auto-subs",
		"--write-subs",
		"--sub-lang",
		opts.lang,
		"--convert-subs",
		"vtt",
		"-o",
		outTpl,
		url,
	];
	const subs = runYtDlp(subArgs);
	if (!subs.ok) {
		console.warn(`[${videoId}] subtítulos no descargados: ${subs.stderr.slice(0, 200)}`);
	}

	const comments = Array.isArray(raw.comments) ? (raw.comments as YtDlpComment[]) : [];
	const info = slimInfo(raw, comments);

	let vttPath: string | null = null;
	const files = await readdir(workDir);
	const vtt = files.find((f) => f.startsWith(videoId) && f.endsWith(".vtt"));
	if (vtt) vttPath = join(workDir, vtt);

	let segments: CaptionSegment[] = [];
	if (vttPath) {
		const vttText = await readFile(vttPath, "utf8");
		segments = dedupeRollingCaptionSegments(parseCaptionPayload(vttText));
	}

	const oembed = await fetchOEmbed(url);

	if (vttPath) await persistVttToSubsCache(opts.cacheRoot, videoId, vttPath);

	return { workDir, infoPath, vttPath, info, segments, oembed };
}

async function persistVttToSubsCache(
	cacheRoot: string,
	videoId: string,
	vttPath: string,
): Promise<void> {
	const destDir = join(cacheRoot, "subs-cache", videoId);
	await mkdir(destDir, { recursive: true });
	try {
		await copyFile(vttPath, join(destDir, `${videoId}.es.vtt`));
	} catch {
		/* */
	}
}

export async function findCachedVttPath(cacheRoot: string, videoId: string): Promise<string | null> {
	for (const sub of ["fetch-cache", "subs-cache"] as const) {
		const dir = join(cacheRoot, sub, videoId);
		try {
			const names = await readdir(dir);
			const vtt = names.find((f) => f.startsWith(videoId) && f.endsWith(".vtt"));
			if (vtt) return join(dir, vtt);
		} catch {
			/* */
		}
	}
	return null;
}

export async function segmentsFromCachedVtt(
	cacheRoot: string,
	videoId: string,
): Promise<CaptionSegment[] | null> {
	const vttPath = await findCachedVttPath(cacheRoot, videoId);
	if (!vttPath) return null;
	const vttText = await readFile(vttPath, "utf8");
	return dedupeRollingCaptionSegments(parseCaptionPayload(vttText));
}

/** Re-deduplica desde VTT en caché sin volver a llamar yt-dlp. */
export async function refreshRecordTranscript(
	cacheRoot: string,
	record: VideoCorpusRecord,
): Promise<VideoCorpusRecord | null> {
	const segments = await segmentsFromCachedVtt(cacheRoot, record.videoId);
	if (!segments?.length) return null;
	const description = record.ytdlp.description ?? "";
	const plainText = buildTranscriptPlainText(description, segments);
	return {
		...record,
		extractedAt: new Date().toISOString(),
		transcript: {
			...record.transcript,
			method: "yt-dlp-vtt-deduped",
			dedupeVersion: TRANSCRIPT_DEDUPE_VERSION,
			segmentCount: segments.length,
			transcriptChars: plainText.length,
			segments,
			plainText,
		},
	};
}

export async function buildVideoCorpusRecord(
	videoId: string,
	bundle: Awaited<ReturnType<typeof fetchVideoBundle>>,
	opts: FetchVideoOptions & {
		listTitle?: string;
		transcriptMethod: string;
		contentKind?: ContentKind;
	},
): Promise<VideoCorpusRecord> {
	const kind = opts.contentKind ?? "videos";
	const year = publishYearFromRecord({ ytdlp: bundle.info });
	const extractedAt = new Date().toISOString();
	const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
	const title = bundle.info.title ?? bundle.info.fulltitle ?? opts.listTitle ?? videoId;
	const description = await resolveVideoDescription(videoId, bundle.info.description);
	const plainText = buildTranscriptPlainText(description, bundle.segments);

	return {
		schemaVersion: CORPUS_SCHEMA_VERSION,
		extractedAt,
		videoId,
		videoUrl,
		channel: {
			title: opts.channelTitle,
			id: opts.channelId,
			url: bundle.info.channel_url ?? `https://www.youtube.com/channel/${opts.channelId}`,
			listUrl: opts.channelListUrl,
		},
		ytdlp: { ...bundle.info, title, description },
		oembed: bundle.oembed,
		transcript: {
			method: opts.transcriptMethod,
			languageCode: "es",
			dedupeVersion: TRANSCRIPT_DEDUPE_VERSION,
			segmentCount: bundle.segments.length,
			transcriptChars: plainText.length,
			segments: bundle.segments,
			plainText,
		},
		comments: {
			fetched: bundle.info.comments?.length ?? 0,
			reportedCount: bundle.info.comment_count,
			items: bundle.info.comments ?? [],
		},
		technical: summarizeTechnical(bundle.info),
		contentKind: kind,
		publishYear: year,
		files: relativeVideoFiles(videoId, year, kind),
	};
}

/** Guarda JSON estructurado + dump crudo yt-dlp en videos/{año}/. */
export async function persistVideoArtifacts(
	record: VideoCorpusRecord,
	rawInfoPath: string,
): Promise<void> {
	const kind = record.contentKind ?? "videos";
	const root = contentRoot(kind);
	const year = record.publishYear ?? publishYearFromRecord(record);
	await ensureYearDir(root, year);
	const paths = absoluteVideoPaths(root, record.videoId, year, kind);
	record.contentKind = kind;
	record.publishYear = year;
	record.files = paths.files;

	await writeFile(paths.json, `${JSON.stringify(record, null, 2)}\n`, "utf8");
	try {
		const raw = await readFile(rawInfoPath, "utf8");
		await writeFile(paths.infoJson, raw, "utf8");
	} catch {
		/* opcional */
	}
}

export async function loadCachedRecord(
	videoId: string,
	resume: boolean,
	contentKind?: ContentKind,
): Promise<VideoCorpusRecord | null> {
	if (!resume) return null;
	try {
		const jsonPath = await resolveVideoArtifacts(videoId, { kind: contentKind }).then(
			(p) => p.json,
		);
		const raw = await readFile(jsonPath, "utf8");
		const parsed = JSON.parse(raw) as VideoCorpusRecord;
		if (parsed.schemaVersion !== CORPUS_SCHEMA_VERSION) return null;
		if (
			parsed.transcript?.dedupeVersion === TRANSCRIPT_DEDUPE_VERSION &&
			parsed.transcript.segmentCount > 0 &&
			parsed.transcript.plainText?.length > 0
		) {
			return parsed;
		}
	} catch {
		/* */
	}
	return null;
}
