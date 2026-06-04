import {
	getGroqKeyPool,
	keySuffix,
	type GroqKeyPool,
} from "../../_shared/groq-api-keys.ts";
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import {
	loadMinimaxConfigFromEnv,
	minimaxKeyDisplay,
	type MinimaxConfig,
} from "../../_shared/minimax-config.ts";
export type WhisperTranscribeProvider = "groq" | "minimax";

/** STT YouTube: solo Groq; MiniMax no tiene API STT en api.minimax.io. */
export function canUseMinimaxWhisperFallback(): boolean {
	return false;
}

export type WhisperRouteState = {
	pool: GroqKeyPool;
	minimax: MinimaxConfig | null;
	provider: WhisperTranscribeProvider;
};

export function createWhisperRouteState(): WhisperRouteState {
	loadLabEnv();
	const pool = getGroqKeyPool();
	pool.resetToFirst();
	const minimax = canUseMinimaxWhisperFallback() ? loadMinimaxConfigFromEnv() : null;
	return {
		pool,
		minimax,
		provider: "groq",
	};
}

export function whisperRouteCount(state: WhisperRouteState): number {
	return state.pool.size + (state.minimax ? 1 : 0);
}

/** Consola: `1/2 · GROQ_API_KEY · ···CTse` (solo Groq; MiniMax STT desactivado). */
export function whisperRouteDisplay(state: WhisperRouteState): string {
	const total = whisperRouteCount(state);
	if (state.provider === "minimax" && state.minimax) {
		return `${total}/${total} · ${minimaxKeyDisplay(state.minimax)}`;
	}
	const e = state.pool.entries[state.pool.currentIndex]!;
	return `${state.pool.currentIndex + 1}/${total} · ${e.label} · ${keySuffix(e.key)}`;
}

/**
 * Ante 429: siguiente Groq key → si no hay, MiniMax → si no hay, null (esperar y reiniciar en Groq 1).
 */
export function rotateWhisperRouteOnQuota(
	state: WhisperRouteState,
): "groq-key" | "minimax" | "wait" {
	if (state.provider === "groq") {
		if (state.pool.rotateOn429()) return "groq-key";
		if (state.minimax) {
			state.provider = "minimax";
			console.warn(`  Whisper · cambio a ${whisperRouteDisplay(state)}`);
			return "minimax";
		}
		return "wait";
	}
	// MiniMax agotado o error → vuelta a Groq 1
	state.provider = "groq";
	state.pool.resetToFirst();
	console.warn(`  Whisper · vuelta a ${whisperRouteDisplay(state)}`);
	return "groq-key";
}

export function resetWhisperRouteAfterWait(state: WhisperRouteState): void {
	state.provider = "groq";
	state.pool.resetToFirst();
}

/**
 * Tras un fallo reintentable (yt-dlp, red, etc.): siguiente ruta 1/2→2/2→1/2.
 * Distinto de rotateWhisperRouteOnQuota (solo ante 429 dentro de transcribe).
 */
export function advanceWhisperRouteOnRetry(state: WhisperRouteState): void {
	if (state.provider === "groq") {
		if (state.pool.currentIndex < state.pool.size - 1) {
			state.pool.rotateOn429();
			console.warn(`  Whisper · siguiente ruta ${whisperRouteDisplay(state)}`);
			return;
		}
		if (state.minimax) {
			state.provider = "minimax";
			console.warn(`  Whisper · siguiente ruta ${whisperRouteDisplay(state)}`);
			return;
		}
		state.pool.resetToFirst();
		console.warn(`  Whisper · siguiente ruta ${whisperRouteDisplay(state)}`);
		return;
	}
	state.provider = "groq";
	state.pool.resetToFirst();
	console.warn(`  Whisper · siguiente ruta ${whisperRouteDisplay(state)}`);
}

/** Sin pausa tras MiniMax (STT desactivado; cascada solo Groq). */
export function whisperAfterMinimaxDelayMs(): number {
	return 0;
}
