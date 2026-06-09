/**
 * Sincroniza whisper-pending.json con videos del corpus sin transcripción.
 * Corrige method → "none" en JSON del canal para que whisper-resume los detecte.
 */
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { CONTENT_KINDS, contentRoot } from "../../youtube/lib/corpus-paths.ts";
import { CORPUS_SCHEMA_VERSION, type VideoCorpusRecord } from "../../youtube/lib/types.ts";
import { recordWhisperPending } from "../lib/whisper-queue.ts";

let queued = 0;
let fixed = 0;

for (const kind of CONTENT_KINDS) {
	const root = contentRoot(kind);
	let years: string[];
	try {
		years = await readdir(root);
	} catch {
		continue;
	}
	for (const year of years) {
		const yearDir = join(root, year);
		try {
			if (!(await stat(yearDir)).isDirectory()) continue;
		} catch {
			continue;
		}
		for (const name of await readdir(yearDir)) {
			if (!name.endsWith(".json") || name.includes(".info.")) continue;
			const jsonPath = join(yearDir, name);
			const record = JSON.parse(await readFile(jsonPath, "utf8")) as VideoCorpusRecord;
			if (record.schemaVersion !== CORPUS_SCHEMA_VERSION) continue;
			if (record.transcript.segmentCount > 0) continue;
			const m = record.transcript.method ?? "";
			if (m.startsWith("groq-") || m.startsWith("minimax-")) continue;

			if (m !== "none") {
				record.transcript.method = "none";
				await writeFile(jsonPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
				fixed += 1;
			}

			await recordWhisperPending({
				youtubeId: record.videoId,
				url: record.videoUrl,
				source: "sync-whisper-queue",
				reason: "no-subs",
				title: record.ytdlp?.title,
			});
			queued += 1;
		}
	}
}

console.log(`Whisper queue sincronizada: ${queued} videos sin transcripción (${fixed} method corregidos a "none")`);
