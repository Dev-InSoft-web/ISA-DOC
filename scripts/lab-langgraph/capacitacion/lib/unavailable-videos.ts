import { readFile, writeFile } from "node:fs/promises";
import { UNAVAILABLE_VIDEOS_PATH } from "./corpus-paths.ts";

export const UNAVAILABLE_SCHEMA_VERSION = 1;

export type UnavailableReason =
	| "private"
	| "removed"
	| "removed_policy"
	| "unavailable"
	| "duplicate"
	| "other_permanent";

export interface UnavailableVideoRecord {
	youtubeId: string;
	reason: UnavailableReason;
	error: string;
	firstSeenAt: string;
	updatedAt: string;
	source?: string;
}

export interface UnavailableVideosFile {
	schemaVersion: typeof UNAVAILABLE_SCHEMA_VERSION;
	updatedAt: string;
	videos: Record<string, UnavailableVideoRecord>;
}

export function classifyYoutubeError(msg: string): {
	permanent: boolean;
	reason: UnavailableReason;
} {
	const m = msg.toLowerCase();
	if (m.includes("private video") || m.includes("sign in if you've been granted")) {
		return { permanent: true, reason: "private" };
	}
	if (m.includes("removed for violating") || m.includes("violating youtube")) {
		return { permanent: true, reason: "removed_policy" };
	}
	if (m.includes("video has been removed") || m.includes("this video is no longer available")) {
		return { permanent: true, reason: "removed" };
	}
	if (m.includes("video unavailable") || m.includes("unavailable")) {
		return { permanent: true, reason: "unavailable" };
	}
	if (m.includes("duplicate of another")) {
		return { permanent: true, reason: "duplicate" };
	}
	return { permanent: false, reason: "other_permanent" };
}

export async function loadUnavailableVideos(): Promise<UnavailableVideosFile> {
	try {
		const raw = await readFile(UNAVAILABLE_VIDEOS_PATH, "utf8");
		const parsed = JSON.parse(raw) as UnavailableVideosFile;
		if (parsed.videos && typeof parsed.videos === "object") return parsed;
	} catch {
		/* */
	}
	return {
		schemaVersion: UNAVAILABLE_SCHEMA_VERSION,
		updatedAt: new Date().toISOString(),
		videos: {},
	};
}

export async function recordUnavailableVideo(args: {
	youtubeId: string;
	error: string;
	source?: string;
}): Promise<UnavailableVideoRecord> {
	const { permanent, reason } = classifyYoutubeError(args.error);
	if (!permanent) {
		throw new Error("No es un error permanente de YouTube");
	}

	const file = await loadUnavailableVideos();
	const now = new Date().toISOString();
	const prev = file.videos[args.youtubeId];
	const rec: UnavailableVideoRecord = {
		youtubeId: args.youtubeId,
		reason,
		error: args.error.slice(0, 500),
		firstSeenAt: prev?.firstSeenAt ?? now,
		updatedAt: now,
		source: args.source ?? prev?.source,
	};
	file.videos[args.youtubeId] = rec;
	file.updatedAt = now;
	await writeFile(UNAVAILABLE_VIDEOS_PATH, `${JSON.stringify(file, null, 2)}\n`, "utf8");
	return rec;
}

export function unavailableIdSet(file: UnavailableVideosFile): Set<string> {
	return new Set(Object.keys(file.videos));
}

/** Migra links con error permanente (runs anteriores) al JSON persistente. */
export async function reconcilePermanentErrorsFromLinks(
	links: Iterable<{ youtubeId?: string; status?: string; error?: string; source?: string }>,
): Promise<number> {
	const file = await loadUnavailableVideos();
	const now = new Date().toISOString();
	let added = 0;

	for (const link of links) {
		if (!link.youtubeId || file.videos[link.youtubeId]) continue;
		if (!link.error) continue;
		if (link.status !== "error" && link.status !== "unavailable") continue;
		const { permanent, reason } = classifyYoutubeError(link.error);
		if (!permanent) continue;

		file.videos[link.youtubeId] = {
			youtubeId: link.youtubeId,
			reason,
			error: link.error.slice(0, 500),
			firstSeenAt: now,
			updatedAt: now,
			source: link.source ?? "reconcile",
		};
		added += 1;
	}

	if (added > 0) {
		file.updatedAt = now;
		await writeFile(UNAVAILABLE_VIDEOS_PATH, `${JSON.stringify(file, null, 2)}\n`, "utf8");
	}
	return added;
}
