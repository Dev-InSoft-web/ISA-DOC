import { readFile } from "node:fs/promises";
import {
	listAllVideoJsonRefs,
	type VideoJsonRef,
} from "../../youtube/lib/corpus-paths.ts";

export interface YoutubeCorpusIndex {
	byVideoId: Map<string, VideoJsonRef>;
	loadedAt: string;
}

export async function loadYoutubeCorpusIndex(): Promise<YoutubeCorpusIndex> {
	const refs = await listAllVideoJsonRefs();
	const byVideoId = new Map<string, VideoJsonRef>();
	for (const ref of refs) {
		if (!byVideoId.has(ref.videoId)) byVideoId.set(ref.videoId, ref);
	}
	return { byVideoId, loadedAt: new Date().toISOString() };
}

export function isInYoutubeCorpus(index: YoutubeCorpusIndex, youtubeId: string): boolean {
	return index.byVideoId.has(youtubeId);
}

export function youtubeCorpusRelativePath(index: YoutubeCorpusIndex, youtubeId: string): string | undefined {
	const ref = index.byVideoId.get(youtubeId);
	if (!ref) return undefined;
	return ref.jsonPath.replace(/\\/g, "/");
}

/** Títulos ya indexados (para detectar duplicados sin ID explícito). */
export async function loadYoutubeTitleIndex(): Promise<Map<string, string>> {
	const index = await loadYoutubeCorpusIndex();
	const titles = new Map<string, string>();
	for (const [videoId, ref] of index.byVideoId) {
		try {
			const raw = await readFile(ref.jsonPath, "utf8");
			const rec = JSON.parse(raw) as { ytdlp?: { title?: string; fulltitle?: string } };
			const t = (rec.ytdlp?.title ?? rec.ytdlp?.fulltitle ?? "").trim().toLowerCase();
			if (t) titles.set(t, videoId);
		} catch {
			/* */
		}
	}
	return titles;
}
