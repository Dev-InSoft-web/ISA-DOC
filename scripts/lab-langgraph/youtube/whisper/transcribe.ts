import type { CaptionSegment } from "../../../../.github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts";
import { isGroqRateLimitError } from "../../_shared/groq-api-keys.ts";
import { loadMinimaxConfigFromEnv } from "../../_shared/minimax-config.ts";
import type { VideoCorpusRecord } from "../lib/types.ts";
import {
	applyWhisperTranscriptToRecord,
	transcribeAudioWithGroq,
	type WhisperGroqOpts,
} from "./groq.ts";
import {
	applyMinimaxTranscriptToRecord,
	transcribeAudioWithMinimax,
} from "./minimax.ts";
import type { WhisperRetryStats } from "./retry-stats.ts";
import {
	createWhisperRouteState,
	rotateWhisperRouteOnQuota,
	whisperAfterMinimaxDelayMs,
	whisperRouteDisplay,
	type WhisperRouteState,
	type WhisperTranscribeProvider,
} from "./whisper-route.ts";

export type { WhisperTranscribeProvider };

export type WhisperTranscribeOpts = {
	provider?: WhisperTranscribeProvider;
	model?: string;
	language?: string;
	stats?: WhisperRetryStats;
	/** Router interno (Groq 1/3→2/3→MiniMax); desactivar solo para tests. */
	useRoute?: boolean;
};

export function resolveWhisperProvider(
	explicit?: WhisperTranscribeProvider,
): WhisperTranscribeProvider {
	if (explicit) return explicit;
	if (process.env.WHISPER_PROVIDER?.trim() === "minimax") return "minimax";
	return "groq";
}

export function canUseMinimaxFallback(): boolean {
	return loadMinimaxConfigFromEnv() != null;
}

export function minimaxFallbackAfterGroqWaits(): number {
	return loadMinimaxConfigFromEnv()?.fallbackAfterGroqWaits ?? 2;
}

async function transcribeWithRoute(
	audioPath: string,
	cacheRoot: string,
	videoId: string,
	opts: WhisperTranscribeOpts | undefined,
	route: WhisperRouteState,
): Promise<{ segments: CaptionSegment[]; provider: WhisperTranscribeProvider; model: string }> {
	const model = opts?.model ?? "whisper-large-v3-turbo";
	const language = opts?.language ?? "es";
	const stats = opts?.stats;

	while (true) {
		console.warn(`  Transcribe · ${whisperRouteDisplay(route)}`);
		try {
			if (route.provider === "minimax") {
				const cfg = route.minimax;
				if (!cfg) throw new Error("MINIMAX_API_KEY no configurada");
				const segments = await transcribeAudioWithMinimax(audioPath, cacheRoot, videoId, {
					cfg,
				});
				return { segments, provider: "minimax", model: cfg.sttModel };
			}

			const groqOpts: Partial<WhisperGroqOpts> = {
				model,
				language,
				stats,
				keyPool: route.pool,
				routeTotal: route.pool.size + (route.minimax ? 1 : 0),
			};
			const segments = await transcribeAudioWithGroq(audioPath, cacheRoot, videoId, groqOpts);
			return { segments, provider: "groq", model };
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			if (!isGroqRateLimitError(msg)) throw e;

			const action = rotateWhisperRouteOnQuota(route);
			if (action === "minimax") {
				console.warn(`  Groq 429 · 2/2 agotadas → intento ${whisperRouteDisplay(route)}`);
				continue;
			}
			if (action === "groq-key") {
				continue;
			}

			// wait: sin MiniMax o ciclo completo agotado
			if (!route.minimax) {
				throw new Error(
					`Groq 429 sin MiniMax (falta MINIMAX_API_KEY en lab-langgraph.env): ${msg.slice(0, 200)}`,
				);
			}
			throw new Error(`Groq y MiniMax en cuota: ${msg.slice(0, 200)}`);
		}
	}
}

export async function transcribeAudioForCorpus(
	audioPath: string,
	cacheRoot: string,
	videoId: string,
	opts?: WhisperTranscribeOpts,
): Promise<{ segments: CaptionSegment[]; provider: WhisperTranscribeProvider; model: string }> {
	const forced = resolveWhisperProvider(opts?.provider);
	const useRoute = opts?.useRoute !== false && forced === "groq";

	if (!useRoute && forced === "minimax") {
		const cfg = loadMinimaxConfigFromEnv();
		if (!cfg) throw new Error("MINIMAX_API_KEY no configurada");
		const segments = await transcribeAudioWithMinimax(audioPath, cacheRoot, videoId, { cfg });
		return { segments, provider: "minimax", model: cfg.sttModel };
	}

	if (!useRoute) {
		const model = opts?.model ?? "whisper-large-v3-turbo";
		const segments = await transcribeAudioWithGroq(audioPath, cacheRoot, videoId, {
			model,
			language: opts?.language ?? "es",
			stats: opts?.stats,
		});
		return { segments, provider: "groq", model };
	}

	const route = createWhisperRouteState();
	return transcribeWithRoute(audioPath, cacheRoot, videoId, opts, route);
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
