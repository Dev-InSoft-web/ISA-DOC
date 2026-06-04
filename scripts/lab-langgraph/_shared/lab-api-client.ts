/**
 * Cliente único hacia lab-langgraph. ISA-DOC no usa API keys de proveedores IA.
 */
import { resolve } from "node:path";
import { loadLabEnv } from "./load-lab-env.ts";

loadLabEnv();

export function labLanggraphBaseUrl(): string {
	const url = process.env.LAB_LANGGRAPH_URL?.trim();
	if (!url) {
		throw new Error(
			"LAB_LANGGRAPH_URL no configurada. Defínela en secrets/patyia/lab-client.env (sin API keys).",
		);
	}
	return url.replace(/\/$/, "");
}

/** ISA-DOC siempre consume lang-lab; no hay modo local con keys. */
export function useLabOrchestrator(): boolean {
	return true;
}

export function assertNoProviderKeysInEnv(): void {
	const forbidden = [
		"GROQ_API_KEY",
		"GROQ_API_KEY_2",
		"CEREBRAS_API_KEY",
		"CEREBRAS_API_KEY_2",
		"GEMINI_API_KEY",
		"GEMINI_API_KEY_2",
		"MINIMAX_API_KEY",
		"HUGGINGFACE_API_KEY",
	];
	const found = forbidden.filter((k) => process.env[k]?.trim());
	if (found.length) {
		throw new Error(
			`ISA-DOC no debe tener API keys (${found.join(", ")}). Muévelas a lab-langgraph (local.settings.json o secrets del servidor).`,
		);
	}
}

export type LabApiError = Error & { status?: number; waitMs?: number; body?: unknown };

async function labFetch<T>(path: string, init?: RequestInit): Promise<T> {
	// Keys solo en lang-lab; no validar en cada fetch si ya se limpiaron en loadLabEnv.
	const url = `${labLanggraphBaseUrl()}/api${path.startsWith("/") ? path : `/${path}`}`;
	const res = await fetch(url, {
		...init,
		headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
	});
	const text = await res.text();
	let body: unknown = {};
	try {
		body = text.trim() ? JSON.parse(text) : {};
	} catch {
		body = { raw: text };
	}
	if (!res.ok) {
		const b = body as { error?: string; waitMs?: number; retryAfterMs?: number };
		const err = new Error(b.error ?? `Lab API ${res.status}: ${text.slice(0, 300)}`) as LabApiError;
		err.status = res.status;
		err.waitMs = b.waitMs ?? b.retryAfterMs;
		err.body = body;
		throw err;
	}
	return body as T;
}

export async function labHealthCheck(): Promise<{ ok: boolean; orchestrator?: { slots: number; ready: number } }> {
	return labFetch("/tools/health");
}

export async function orchestratorSyncKeys(capability?: string): Promise<{ synced: number }> {
	const r = await labFetch<{ ok: boolean; synced: number }>("/orchestrator/sync-keys", {
		method: "POST",
		body: JSON.stringify(capability ? { capability } : {}),
	});
	return { synced: r.synced };
}

export async function orchestratorStatus(capability?: string, provider?: string): Promise<unknown> {
	const q = new URLSearchParams();
	if (capability) q.set("capability", capability);
	if (provider) q.set("provider", provider);
	const qs = q.toString();
	return labFetch(`/orchestrator/status${qs ? `?${qs}` : ""}`);
}

export type WhisperTranscribeApiResult = {
	ok: boolean;
	segments?: Array<{ startMs: number | null; durationMs: number | null; text: string }>;
	segmentCount?: number;
	model?: string;
	keyLabel?: string;
	keySuffix?: string;
	waitMs?: number;
	retryAfterMs?: number;
	lastError?: string;
	reason?: string;
};

export async function whisperTranscribeViaLab(opts: {
	audioPath: string;
	videoId: string;
	model?: string;
	language?: string;
}): Promise<WhisperTranscribeApiResult> {
	const abs = resolve(opts.audioPath);
	return labFetch<WhisperTranscribeApiResult>("/tools/whisper/transcribe", {
		method: "POST",
		body: JSON.stringify({
			audioPath: abs,
			videoId: opts.videoId,
			model: opts.model,
			language: opts.language,
		}),
	});
}

export type ProofreadApiResult =
	| { ok: true; skipped?: boolean; videoId: string; segmentsChanged?: number; provider?: string; model?: string }
	| { ok: false; error: string; videoId?: string; retryAfterMinutes?: number };

export async function proofreadVideoViaLab(opts: {
	videoId: string;
	corpusJsonPath?: string;
	force?: boolean;
	allowOpenAi?: boolean;
	promote?: boolean;
}): Promise<ProofreadApiResult> {
	if (opts.promote) {
		const q = new URLSearchParams({ videoId: opts.videoId, promote: "true" });
		return labFetch<ProofreadApiResult>(`/tools/proofread?${q}`, { method: "POST" });
	}
	const corpusJsonPath = opts.corpusJsonPath ? resolve(opts.corpusJsonPath) : undefined;
	return labFetch<ProofreadApiResult>("/tools/proofread", {
		method: "POST",
		body: JSON.stringify({
			videoId: opts.videoId,
			corpusJsonPath,
			force: opts.force,
			allowOpenAi: opts.allowOpenAi,
		}),
	});
}
