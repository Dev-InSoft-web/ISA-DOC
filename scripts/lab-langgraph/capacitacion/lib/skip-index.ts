import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { LINKS_DIR, VIDEOS_DIR } from "./corpus-paths.ts";
import type { CapacitacionVideoLinkRecord } from "./types.ts";
import {
	classifyYoutubeError,
	loadUnavailableVideos,
	unavailableIdSet,
	type UnavailableVideosFile,
} from "./unavailable-videos.ts";
import { isInYoutubeCorpus, type YoutubeCorpusIndex } from "./youtube-dedupe.ts";

export type SkipReason =
	| "link_done"
	| "youtube_corpus_local"
	| "capacitacion_local"
	| "unavailable_permanent"
	| "pending";

const DONE_STATUSES = new Set<CapacitacionVideoLinkRecord["status"]>([
	"fetched",
	"enriched_only",
	"skipped_in_youtube_corpus",
	"unavailable",
]);

export interface LocalSkipIndex {
	links: Map<string, CapacitacionVideoLinkRecord>;
	capacitacionVideoIds: Set<string>;
	unavailableIds: Set<string>;
	unavailableFile: UnavailableVideosFile;
}

export async function loadLocalSkipIndex(): Promise<LocalSkipIndex> {
	const links = new Map<string, CapacitacionVideoLinkRecord>();
	try {
		const files = await readdir(LINKS_DIR);
		await Promise.all(
			files.map(async (f) => {
				if (!f.endsWith(".json")) return;
				try {
					const raw = await readFile(join(LINKS_DIR, f), "utf8");
					const rec = JSON.parse(raw) as CapacitacionVideoLinkRecord;
					links.set(rec.entryId, rec);
					if (rec.youtubeId) links.set(rec.youtubeId, rec);
				} catch {
					/* */
				}
			}),
		);
	} catch {
		/* */
	}

	const capacitacionVideoIds = new Set<string>();
	try {
		for (const f of await readdir(VIDEOS_DIR)) {
			if (f.endsWith(".json")) capacitacionVideoIds.add(f.slice(0, -".json".length));
		}
	} catch {
		/* */
	}

	const unavailableFile = await loadUnavailableVideos();
	const unavailableIds = unavailableIdSet(unavailableFile);

	// Promover links con error permanente ya guardados (reanudación tras versión anterior)
	for (const link of links.values()) {
		if (!link.youtubeId || unavailableIds.has(link.youtubeId)) continue;
		if (link.status !== "error" || !link.error) continue;
		if (classifyYoutubeError(link.error).permanent) {
			unavailableIds.add(link.youtubeId);
		}
	}

	return { links, capacitacionVideoIds, unavailableIds, unavailableFile };
}

export function classifySkip(args: {
	youtubeId: string;
	entryId?: string;
	youtubeIndex: YoutubeCorpusIndex;
	local: LocalSkipIndex;
	resume: boolean;
}): SkipReason {
	const key = args.entryId ?? args.youtubeId;
	const link = args.local.links.get(key) ?? args.local.links.get(args.youtubeId);

	if (args.resume && args.local.unavailableIds.has(args.youtubeId)) {
		return "unavailable_permanent";
	}

	if (args.resume && link && DONE_STATUSES.has(link.status)) {
		return "link_done";
	}

	if (args.resume && link?.status === "error" && link.error && classifyYoutubeError(link.error).permanent) {
		return "unavailable_permanent";
	}

	// Corpus del canal ya indexado localmente — nunca re-descargar ni re-enriquecer
	if (isInYoutubeCorpus(args.youtubeIndex, args.youtubeId)) {
		return "youtube_corpus_local";
	}

	if (args.resume && args.local.capacitacionVideoIds.has(args.youtubeId)) {
		return "capacitacion_local";
	}

	return "pending";
}

export function partitionBySkip(
	ids: string[],
	youtubeIndex: YoutubeCorpusIndex,
	local: LocalSkipIndex,
	resume: boolean,
): { pending: string[]; counts: Record<SkipReason, number> } {
	const counts: Record<SkipReason, number> = {
		link_done: 0,
		youtube_corpus_local: 0,
		capacitacion_local: 0,
		unavailable_permanent: 0,
		pending: 0,
	};
	const pending: string[] = [];
	for (const id of ids) {
		const reason = classifySkip({ youtubeId: id, youtubeIndex, local, resume });
		counts[reason] += 1;
		if (reason === "pending") pending.push(id);
	}
	return { pending, counts };
}
