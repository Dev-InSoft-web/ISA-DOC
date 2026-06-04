import { existsSync } from "node:fs";
import { mkdir, readdir, rename } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { VideoCorpusRecord } from "./types.ts";

import { labDataPath } from "../../_shared/isa-doc-root.ts";
export const CORPUS_BASE = labDataPath("vectorize/youtube/contapyme-software-contable");

/** videos = largos, shorts = YouTube Shorts, streams = directos/replays */
export const CONTENT_KINDS = ["videos", "shorts", "streams"] as const;
export type ContentKind = (typeof CONTENT_KINDS)[number];

const YEAR_DIR_RE = /^\d{4}$/;
const VIDEO_JSON_RE = /^(.+)\.json$/;

export function contentRoot(kind: ContentKind): string {
	return join(CORPUS_BASE, kind);
}

/** Raíz del tipo `videos` (compat con scripts que usaban VIDEOS_ROOT). */
export const VIDEOS_ROOT = contentRoot("videos");
export const SHORTS_ROOT = contentRoot("shorts");
export const STREAMS_ROOT = contentRoot("streams");

export function publishYearFromRecord(record: {
	ytdlp?: { upload_date?: string; timestamp?: number };
}): string {
	const ud = record.ytdlp?.upload_date?.trim();
	if (ud && ud.length >= 4 && /^\d{4,8}$/.test(ud)) return ud.slice(0, 4);
	const ts = record.ytdlp?.timestamp;
	if (typeof ts === "number" && ts > 0) {
		return String(new Date(ts * 1000).getUTCFullYear());
	}
	return "unknown";
}

export function yearDir(root: string, year: string): string {
	return join(root, year);
}

export function relativeVideoFiles(videoId: string, year: string, kind: ContentKind = "videos") {
	return {
		year,
		kind,
		md: `${kind}/${year}/${videoId}.md`,
		json: `${kind}/${year}/${videoId}.json`,
		infoJson: `${kind}/${year}/${videoId}.info.json`,
	};
}

export function absoluteVideoPaths(
	root: string,
	videoId: string,
	year: string,
	kind: ContentKind,
) {
	const dir = yearDir(root, year);
	return {
		dir,
		year,
		kind,
		json: join(dir, `${videoId}.json`),
		md: join(dir, `${videoId}.md`),
		infoJson: join(dir, `${videoId}.info.json`),
		files: relativeVideoFiles(videoId, year, kind),
	};
}

export async function listYearFolders(root: string): Promise<string[]> {
	let entries: { name: string; isDirectory: () => boolean }[] = [];
	try {
		entries = await readdir(root, { withFileTypes: true });
	} catch {
		return [];
	}
	return entries
		.filter((e) => e.isDirectory() && (YEAR_DIR_RE.test(e.name) || e.name === "unknown"))
		.map((e) => e.name)
		.sort();
}

export type VideoJsonRef = {
	videoId: string;
	year: string;
	kind: ContentKind;
	jsonPath: string;
};

function parseVideoJsonName(name: string): string | null {
	if (!name.endsWith(".json") || name.endsWith(".info.json")) return null;
	const m = name.match(VIDEO_JSON_RE);
	return m ? m[1]! : null;
}

async function collectFromRoot(
	root: string,
	kind: ContentKind,
	byId: Map<string, VideoJsonRef>,
): Promise<void> {
	if (!existsSync(root)) return;

	for (const year of await listYearFolders(root)) {
		const dir = join(root, year);
		for (const name of await readdir(dir)) {
			const videoId = parseVideoJsonName(name);
			if (!videoId) continue;
			byId.set(`${kind}:${videoId}`, { videoId, year, kind, jsonPath: join(dir, name) });
		}
	}

	try {
		for (const name of await readdir(root)) {
			const videoId = parseVideoJsonName(name);
			if (!videoId || byId.has(`${kind}:${videoId}`)) continue;
			byId.set(`${kind}:${videoId}`, {
				videoId,
				year: "legacy",
				kind,
				jsonPath: join(root, name),
			});
		}
	} catch {
		/* */
	}
}

/** videos → streams → shorts (supervisión y lote proofread). */
const KIND_PROCESS_ORDER: Record<ContentKind, number> = {
	videos: 0,
	streams: 1,
	shorts: 2,
};

export function sortVideoJsonRefs(refs: VideoJsonRef[]): VideoJsonRef[] {
	return [...refs].sort(
		(a, b) =>
			(KIND_PROCESS_ORDER[a.kind] ?? 9) - (KIND_PROCESS_ORDER[b.kind] ?? 9) ||
			a.year.localeCompare(b.year) ||
			a.videoId.localeCompare(b.videoId),
	);
}

/** Todos los JSON en videos/, shorts/ y streams/ (por año). */
export async function listAllVideoJsonRefs(_legacyRoot?: string): Promise<VideoJsonRef[]> {
	const byId = new Map<string, VideoJsonRef>();
	for (const kind of CONTENT_KINDS) {
		await collectFromRoot(contentRoot(kind), kind, byId);
	}
	return sortVideoJsonRefs([...byId.values()]);
}

export async function resolveVideoArtifacts(
	videoId: string,
	opts?: { year?: string; kind?: ContentKind },
): Promise<ReturnType<typeof absoluteVideoPaths> & { root: string }> {
	const kinds = opts?.kind ? [opts.kind] : CONTENT_KINDS;
	for (const kind of kinds) {
		const root = contentRoot(kind);
		if (opts?.year) {
			const p = absoluteVideoPaths(root, videoId, opts.year, kind);
			if (existsSync(p.json)) return { ...p, root };
		}
		for (const year of await listYearFolders(root)) {
			const p = absoluteVideoPaths(root, videoId, year, kind);
			if (existsSync(p.json)) return { ...p, root };
		}
		const legacyJson = join(root, `${videoId}.json`);
		if (existsSync(legacyJson)) {
			return {
				root,
				dir: root,
				year: "legacy",
				kind,
				json: legacyJson,
				md: join(root, `${videoId}.md`),
				infoJson: join(root, `${videoId}.info.json`),
				files: {
					year: "legacy",
					kind,
					md: `${kind}/${videoId}.md`,
					json: `${kind}/${videoId}.json`,
					infoJson: `${kind}/${videoId}.info.json`,
				},
			};
		}
	}
	throw new Error(`No existe */*/${videoId}.json en videos|shorts|streams`);
}

export async function ensureYearDir(root: string, year: string): Promise<string> {
	const dir = yearDir(root, year);
	await mkdir(dir, { recursive: true });
	return dir;
}

export async function moveVideoToYearFolder(
	record: VideoCorpusRecord,
): Promise<VideoCorpusRecord> {
	const kind = record.contentKind ?? "videos";
	const root = contentRoot(kind);
	const year = publishYearFromRecord(record);
	const target = absoluteVideoPaths(root, record.videoId, year, kind);
	await ensureYearDir(root, year);

	const moves: Array<{ from: string; to: string }> = [
		{ from: join(root, `${record.videoId}.json`), to: target.json },
		{ from: join(root, `${record.videoId}.md`), to: target.md },
		{ from: join(root, `${record.videoId}.info.json`), to: target.infoJson },
	];

	for (const yearFolder of await listYearFolders(root)) {
		if (yearFolder === year) continue;
		moves.push(
			{ from: join(root, yearFolder, `${record.videoId}.json`), to: target.json },
			{ from: join(root, yearFolder, `${record.videoId}.md`), to: target.md },
			{ from: join(root, yearFolder, `${record.videoId}.info.json`), to: target.infoJson },
		);
	}

	for (const otherKind of CONTENT_KINDS) {
		if (otherKind === kind) continue;
		const otherRoot = contentRoot(otherKind);
		for (const yearFolder of await listYearFolders(otherRoot)) {
			moves.push(
				{ from: join(otherRoot, yearFolder, `${record.videoId}.json`), to: target.json },
				{ from: join(otherRoot, yearFolder, `${record.videoId}.md`), to: target.md },
				{ from: join(otherRoot, yearFolder, `${record.videoId}.info.json`), to: target.infoJson },
			);
		}
	}

	for (const { from, to } of moves) {
		if (from === to || !existsSync(from)) continue;
		if (existsSync(to)) continue;
		await rename(from, to);
	}

	return {
		...record,
		contentKind: kind,
		publishYear: year,
		files: target.files,
	};
}
