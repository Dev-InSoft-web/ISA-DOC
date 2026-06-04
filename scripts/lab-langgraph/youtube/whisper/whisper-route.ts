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

export type WhisperRouteState = {
	pool: GroqKeyPool;
	minimax: MinimaxConfig | null;
	provider: WhisperTranscribeProvider;
};

export function createWhisperRouteState(): WhisperRouteState {
	loadLabEnv();
	const pool = getGroqKeyPool();
	pool.resetToFirst();
	const minimax = loadMinimaxConfigFromEnv();
	if (!minimax) {
		console.warn(
			"  Whisper · MINIMAX_API_KEY no cargada (secrets/patyia/lab-langgraph.env) · solo 2 rutas Groq",
		);
	}
	return {
		pool,
		minimax,
		provider: "groq",
	};
}

export function whisperRouteCount(state: WhisperRouteState): number {
	return state.pool.size + (state.minimax ? 1 : 0);
}

/** Consola: `2/3 · GROQ_API_KEY_2 · ···CTse` o `3/3 · MINIMAX_API_KEY · ···1-pE` */
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

/** Pausa fija tras intentar MiniMax antes de volver a Groq (default 30 s). */
export function whisperAfterMinimaxDelayMs(): number {
	const n = Number(process.env.WHISPER_AFTER_MINIMAX_MS?.trim());
	return Number.isFinite(n) && n >= 0 ? n : 30_000;
}
