import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { GROQ_RATE_LIMIT_WAIT_MS } from "../../_shared/groq-api-keys.ts";

export type WhisperStatsSnapshot = {
	okMs: number[];
	waitMs: number[];
	errorMs: number[];
	videosOk: number;
	errorAttempts: number;
	updatedAt: string;
};

export class WhisperRetryStats {
	okMs: number[] = [];
	waitMs: number[] = [];
	errorMs: number[] = [];
	videosOk = 0;
	errorAttempts = 0;

	private readonly maxSamples = 80;

	constructor(snapshot?: WhisperStatsSnapshot) {
		if (!snapshot) return;
		this.okMs = snapshot.okMs.slice(-this.maxSamples);
		this.waitMs = snapshot.waitMs.slice(-this.maxSamples);
		this.errorMs = snapshot.errorMs.slice(-this.maxSamples);
		this.videosOk = snapshot.videosOk;
		this.errorAttempts = snapshot.errorAttempts;
	}

	private pushBounded(arr: number[], value: number): void {
		arr.push(value);
		if (arr.length > this.maxSamples) arr.shift();
	}

	recordOk(elapsedMs: number): void {
		this.pushBounded(this.okMs, elapsedMs);
		this.videosOk += 1;
	}

	recordWait(waitMs: number): void {
		this.pushBounded(this.waitMs, waitMs);
	}

	recordError(elapsedMs: number): void {
		this.pushBounded(this.errorMs, elapsedMs);
		this.errorAttempts += 1;
	}

	avgMs(samples: number[]): number | null {
		if (!samples.length) return null;
		return samples.reduce((a, b) => a + b, 0) / samples.length;
	}

	avgOkSec(): string | null {
		const a = this.avgMs(this.okMs);
		return a == null ? null : (a / 1000).toFixed(1);
	}

	avgWaitSec(): string | null {
		const a = this.avgMs(this.waitMs);
		return a == null ? null : (a / 1000).toFixed(1);
	}

	avgErrorSec(): string | null {
		const a = this.avgMs(this.errorMs);
		return a == null ? null : (a / 1000).toFixed(1);
	}

	/** Fracción de intentos que terminaron en transcripción guardada. */
	sessionSuccessRate(): number {
		const total = this.videosOk + this.errorAttempts;
		if (!total) return 1;
		return this.videosOk / total;
	}

	/**
	 * Espera antes de reintentar tras 429 (media histórica + pista de la API).
	 */
	suggestedWaitMs(apiHintMs?: number): number {
		const avg = this.avgMs(this.waitMs);
		let wait = GROQ_RATE_LIMIT_WAIT_MS;
		if (apiHintMs) wait = Math.max(wait, apiHintMs);
		if (avg) wait = Math.max(wait, Math.round(avg * 1.08));
		return wait;
	}

	/** Espera tras otros errores (descarga, red, 0 segmentos). */
	suggestedRetryMs(): number {
		const avgErr = this.avgMs(this.errorMs);
		const avgOk = this.avgMs(this.okMs);
		if (avgErr) return Math.max(8_000, Math.min(120_000, Math.round(avgErr * 0.6)));
		if (avgOk) return Math.max(8_000, Math.min(60_000, Math.round(avgOk * 0.25)));
		return 15_000;
	}

	toSnapshot(): WhisperStatsSnapshot {
		return {
			okMs: [...this.okMs],
			waitMs: [...this.waitMs],
			errorMs: [...this.errorMs],
			videosOk: this.videosOk,
			errorAttempts: this.errorAttempts,
			updatedAt: new Date().toISOString(),
		};
	}
}

export async function loadWhisperStats(statsPath: string): Promise<WhisperRetryStats> {
	try {
		if (!existsSync(statsPath)) return new WhisperRetryStats();
		const raw = JSON.parse(await readFile(statsPath, "utf8")) as WhisperStatsSnapshot;
		return new WhisperRetryStats(raw);
	} catch {
		return new WhisperRetryStats();
	}
}

export async function saveWhisperStats(statsPath: string, stats: WhisperRetryStats): Promise<void> {
	await writeFile(statsPath, `${JSON.stringify(stats.toSnapshot(), null, 2)}\n`, "utf8");
}

export function logTranscriptionSuccess(params: {
	vid: string;
	title: string;
	dur: string;
	kind: string;
	segs: number;
	chars: number;
	elapsedSec: number;
	attempt: number;
	stats: WhisperRetryStats;
	index: number;
	total: number;
	pendingGlobal: number;
	sessionOkCount: number;
	/** Texto completo con marcas de tiempo (misma forma que el .md del corpus). */
	transcriptText: string;
	apiKeyDisplay: string;
}): void {
	const rate = params.stats.sessionSuccessRate();
	const line = "─".repeat(58);
	console.log("");
	console.log(line);
	console.log(`✓ TRANSCRIPCIÓN OK  [${params.index}/${params.total}]  ${params.vid}`);
	console.log(`  ${params.title}`);
	console.log(
		`  ${params.kind} · ${params.dur} · ${params.segs} segmentos · ${params.chars.toLocaleString("es-CO")} caracteres`,
	);
	console.log(`  tiempo total ${params.elapsedSec}s · intentos en este video: ${params.attempt}`);
	console.log(`  API key: ${params.apiKeyDisplay}`);
	const okAvg = params.stats.avgOkSec();
	const waitAvg = params.stats.avgWaitSec();
	const parts = [
		`sesión acumulada: ${params.stats.videosOk} videos`,
		`${(rate * 100).toFixed(0)}% éxito por intento`,
		`faltan global ${params.pendingGlobal}`,
		`ok en esta pasada ${params.sessionOkCount}`,
	];
	if (okAvg) parts.push(`promedio ok ${okAvg}s`);
	if (waitAvg) parts.push(`promedio espera 429 ${waitAvg}s`);
	console.log(`  ${parts.join(" · ")}`);
	console.log(line);
	if (params.transcriptText.trim()) {
		console.log("");
		console.log("  ══ Transcripción completa ══");
		console.log(params.transcriptText);
		console.log("  ══ Fin transcripción ══");
	} else {
		console.log("  (transcripción vacía)");
	}
}

export type WhisperOkEntry = { vid: string; title: string };

export function formatRetryAt(waitMs: number): { waitSec: number; retryAt: string } {
	const waitSec = Math.max(0, Math.round(waitMs / 1000));
	const at = new Date(Date.now() + waitMs);
	const retryAt = at.toLocaleTimeString("es-CO", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	return { waitSec, retryAt };
}

function formatOkList(ok: WhisperOkEntry[], maxShow = 8): string {
	if (!ok.length) return "(ninguno aún)";
	const shown = ok.slice(-maxShow).map((o) => o.vid);
	const extra = ok.length > maxShow ? ` (+${ok.length - maxShow} más)` : "";
	return shown.join(", ") + extra;
}

function formatPendingList(ids: string[], maxShow = 6): string {
	if (!ids.length) return "—";
	const shown = ids.slice(0, maxShow);
	const extra = ids.length > maxShow ? ` (+${ids.length - maxShow} más)` : "";
	return shown.join(", ") + extra;
}

/** Resumen visible al inicio de cada intento o antes de esperar un reintento. */
export function logWhisperAttemptStatus(params: {
	phase: "intento" | "reintento";
	vid: string;
	attempt: number;
	sessionOk: WhisperOkEntry[];
	pendingGlobal: number;
	pendingInBatch: number;
	batchDone: number;
	batchTotal: number;
	waitMs?: number;
	reason?: string;
	stats: WhisperRetryStats;
	pendingIds?: string[];
	apiKeyDisplay: string;
}): void {
	const okLine = formatOkList(params.sessionOk);
	const waitAvg = params.stats.avgWaitSec();
	const errAvg = params.stats.avgErrorSec();

	console.log("");
	console.log(
		`  ┌─ ${params.phase === "intento" ? "Intento" : "Reintento"} #${params.attempt} · ${params.vid} · API key ${params.apiKeyDisplay}`,
	);
	console.log(
		`  │ OK sesión: ${params.sessionOk.length} · faltan global: ${params.pendingGlobal} · lote ${params.batchDone}/${params.batchTotal} hechos · pendientes en lote: ${params.pendingInBatch}`,
	);
	console.log(`  │ Videos OK: ${okLine}`);
	if (params.pendingIds?.length) {
		console.log(`  │ Faltan (ids): ${formatPendingList(params.pendingIds)}`);
	}

	if (params.waitMs != null && params.waitMs > 0) {
		const { waitSec, retryAt } = formatRetryAt(params.waitMs);
		console.log(
			`  │ Espera programada: ${waitSec}s → reintento ~${retryAt}` +
				(params.reason ? ` · ${params.reason}` : ""),
		);
		if (waitAvg) console.log(`  │ (promedio espera 429: ${waitAvg}s${errAvg ? ` · media fallo ${errAvg}s` : ""})`);
	} else if (params.reason) {
		console.log(`  │ ${params.reason} · sin espera (cambio de key)`);
	}
	console.log("  └─");
}

export function logRetryPlan(params: {
	vid: string;
	attempt: number;
	reason: string;
	waitMs: number;
	stats: WhisperRetryStats;
	sessionOk: WhisperOkEntry[];
	pendingGlobal: number;
	pendingInBatch: number;
	batchDone: number;
	batchTotal: number;
	pendingIds?: string[];
	apiKeyDisplay: string;
}): void {
	logWhisperAttemptStatus({
		phase: "reintento",
		vid: params.vid,
		attempt: params.attempt + 1,
		sessionOk: params.sessionOk,
		pendingGlobal: params.pendingGlobal,
		pendingInBatch: params.pendingInBatch,
		batchDone: params.batchDone,
		batchTotal: params.batchTotal,
		waitMs: params.waitMs,
		reason: params.reason,
		stats: params.stats,
		pendingIds: params.pendingIds,
		apiKeyDisplay: params.apiKeyDisplay,
	});
}