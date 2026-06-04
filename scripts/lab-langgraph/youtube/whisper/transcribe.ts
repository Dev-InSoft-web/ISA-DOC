import { resolve } from "node:path";
import type { CaptionSegment } from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import { type LabApiError, whisperTranscribeViaLab } from "../../_shared/lab-api-client.ts";
import type { VideoCorpusRecord } from "../lib/types.ts";
import { applyWhisperTranscriptToRecord } from "./groq.ts";
import { applyMinimaxTranscriptToRecord } from "./minimax.ts";
import type { WhisperRetryStats } from "./retry-stats.ts";
import { logProgress } from "../../_shared/retry-wait.ts";
import type { WhisperTranscribeProvider } from "./whisper-route.ts";

export type { WhisperTranscribeProvider };

export type WhisperTranscribeOpts = {
	provider?: WhisperTranscribeProvider;
	model?: string;
	language?: string;
	stats?: WhisperRetryStats;
};

export function resolveWhisperProvider(
	explicit?: WhisperTranscribeProvider,
): WhisperTranscribeProvider {
	if (explicit) return explicit;
	if (process.env.WHISPER_PROVIDER?.trim() === "minimax") return "minimax";
	return "groq";
}

export function canUseMinimaxFallback(): boolean {
	return false;
}

export function minimaxFallbackAfterGroqWaits(): number {
	return 0;
}

export async function transcribeAudioForCorpus(
	audioPath: string,
	_cacheRoot: string,
	videoId: string,
	opts?: WhisperTranscribeOpts,
): Promise<{ segments: CaptionSegment[]; provider: WhisperTranscribeProvider; model: string }> {
	const forced = resolveWhisperProvider(opts?.provider);
	if (forced === "minimax") {
		throw new Error(
			"Whisper STT vía lab-langgraph (Groq). MINIMAX no se expone desde ISA-DOC.",
		);
	}

	const model = opts?.model ?? "whisper-large-v3-turbo";
	const abs = resolve(audioPath);
	logProgress(`  Whisper · lab-langgraph · ${abs}`);
	try {
		const r = await whisperTranscribeViaLab({
			audioPath: abs,
			videoId,
			model,
			language: opts?.language ?? "es",
		});
		if (!r.segments?.length) {
			throw new Error(r.lastError ?? r.reason ?? "Whisper devolvió 0 segmentos");
		}
		logProgress(
			`  Lab OK · ${r.keyLabel ?? "?"} · ${r.keySuffix ?? ""} · ${r.segmentCount} segmentos`,
		);
		return {
			segments: r.segments as CaptionSegment[],
			provider: "groq",
			model: r.model ?? model,
		};
	} catch (e) {
		const err = e as LabApiError;
		const wait = err.waitMs ?? (err.body as { retryAfterMs?: number })?.retryAfterMs;
		if (wait && wait > 0) {
			throw new Error(
				`Whisper 429 (lab) · esperar ${Math.round(wait / 1000)}s · ${err.message}`,
			);
		}
		throw e;
	}
}

export function applyTranscriptToRecord(
	record: VideoCorpusRecord,
	segments: CaptionSegment[],
	provider: WhisperTranscribeProvider,
	model: string,
): VideoCorpusRecord {
	if (provider === "minimax") return applyMinimaxTranscriptToRecord(record, segments, model);
	return applyWhisperTranscriptToRecord(record, segments, model);
}
