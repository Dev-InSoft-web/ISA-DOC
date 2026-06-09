import { readFile, writeFile } from "node:fs/promises";
import { WHISPER_PENDING_PATH } from "./corpus-paths.ts";

export const WHISPER_PENDING_SCHEMA_VERSION = 1;

export interface WhisperPendingEntry {
	youtubeId: string;
	url?: string;
	reason: "no-subs" | "subs-download-failed";
	source: string;
	queuedAt: string;
	title?: string;
}

export interface WhisperPendingFile {
	schemaVersion: typeof WHISPER_PENDING_SCHEMA_VERSION;
	updatedAt: string;
	videos: Record<string, WhisperPendingEntry>;
}

export async function loadWhisperPending(): Promise<WhisperPendingFile> {
	try {
		const raw = await readFile(WHISPER_PENDING_PATH, "utf8");
		const parsed = JSON.parse(raw) as WhisperPendingFile;
		if (parsed.videos) return parsed;
	} catch {
		/* */
	}
	return {
		schemaVersion: WHISPER_PENDING_SCHEMA_VERSION,
		updatedAt: new Date().toISOString(),
		videos: {},
	};
}

export async function recordWhisperPending(entry: {
	youtubeId: string;
	url?: string;
	reason?: WhisperPendingEntry["reason"];
	source: string;
	title?: string;
}): Promise<void> {
	const file = await loadWhisperPending();
	const now = new Date().toISOString();
	const prev = file.videos[entry.youtubeId];
	file.videos[entry.youtubeId] = {
		youtubeId: entry.youtubeId,
		url: entry.url ?? prev?.url,
		reason: entry.reason ?? "no-subs",
		source: entry.source,
		queuedAt: prev?.queuedAt ?? now,
		title: entry.title ?? prev?.title,
	};
	file.updatedAt = now;
	await writeFile(WHISPER_PENDING_PATH, `${JSON.stringify(file, null, 2)}\n`, "utf8");
}
