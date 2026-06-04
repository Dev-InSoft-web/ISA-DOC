import { keySuffix } from "./groq-api-keys.ts";
import { loadLabEnv } from "./load-lab-env.ts";

export type MinimaxSttMode = "api" | "multimodal" | "auto";

/** `sk-cp-*` = Token Plan / suscripción; `sk-api-*` = pay-as-you-go (Balance). */
export type MinimaxKeyKind = "subscription" | "paygo" | "unknown";

export function detectMinimaxKeyKind(apiKey: string): MinimaxKeyKind {
	const k = apiKey.trim();
	if (k.startsWith("sk-cp")) return "subscription";
	if (k.startsWith("sk-api")) return "paygo";
	return "unknown";
}

export type MinimaxConfig = {
	apiKey: string;
	keyKind: MinimaxKeyKind;
	apiBase: string;
	sttApiBase: string;
	sttModel: string;
	sttMode: MinimaxSttMode;
	chatModel: string;
	groupId: string | null;
	fallbackAfterGroqWaits: number;
};

export function loadMinimaxConfigFromEnv(): MinimaxConfig | null {
	loadLabEnv();
	const apiKey = process.env.MINIMAX_API_KEY?.trim();
	if (!apiKey) return null;

	const apiBase = (process.env.MINIMAX_API_BASE ?? "https://api.minimax.io").replace(/\/$/, "");
	const sttApiBase = (process.env.MINIMAX_STT_API_BASE ?? apiBase).replace(/\/$/, "");
	const sttModel = process.env.MINIMAX_STT_MODEL?.trim() || "whisper-large";
	const rawMode = process.env.MINIMAX_STT_MODE?.trim().toLowerCase();
	const sttMode: MinimaxSttMode =
		rawMode === "multimodal" ? "multimodal" : rawMode === "api" ? "api" : "auto";
	const chatModel = process.env.MINIMAX_CHAT_MODEL?.trim() || "MiniMax-M2.5";
	const groupId = process.env.MINIMAX_GROUP_ID?.trim() || null;
	const fallbackAfterGroqWaits = Math.max(
		1,
		Number(process.env.MINIMAX_FALLBACK_AFTER_GROQ_WAITS ?? "2") || 2,
	);

	return {
		apiKey,
		keyKind: detectMinimaxKeyKind(apiKey),
		apiBase,
		sttApiBase,
		sttModel,
		sttMode,
		chatModel,
		groupId,
		fallbackAfterGroqWaits,
	};
}

export function minimaxKeyDisplay(cfg: MinimaxConfig): string {
	const kind =
		cfg.keyKind === "subscription"
			? "Token Plan"
			: cfg.keyKind === "paygo"
				? "pay-as-you-go"
				: "key";
	return `MINIMAX_API_KEY (${kind}) · ${keySuffix(cfg.apiKey)}`;
}

export function isMinimaxConfigured(): boolean {
	return loadMinimaxConfigFromEnv() != null;
}

/** @deprecated Usar `isMinimaxConfigured` */
export const isMinimaxSttConfigured = isMinimaxConfigured;
