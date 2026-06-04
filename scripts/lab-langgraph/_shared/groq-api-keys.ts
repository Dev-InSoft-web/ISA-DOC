import { loadLabEnv } from "./load-lab-env.ts";

/** Espera tras agotar todas las API keys Groq (429). */
export const GROQ_RATE_LIMIT_WAIT_MS = 60_000;

export type GroqKeyEntry = { label: string; key: string };

let poolSingleton: GroqKeyPool | null = null;

export function keySuffix(key: string): string {
	return key.length >= 4 ? `···${key.slice(-4)}` : "···";
}

export function isGroqRateLimitError(msg: string): boolean {
	return /429|rate_limit|rate limit|quota/i.test(msg);
}

export function loadGroqApiKeysFromEnv(): GroqKeyEntry[] {
	loadLabEnv();
	const entries: GroqKeyEntry[] = [];
	const add = (raw: string | undefined, label: string) => {
		const k = raw?.trim();
		if (k && !entries.some((e) => e.key === k)) entries.push({ label, key: k });
	};

	add(process.env.GROQ_API_KEY, "GROQ_API_KEY");
	add(process.env.GROQ_API_KEY_2, "GROQ_API_KEY_2");

	const multi = process.env.GROQ_API_KEYS?.trim();
	if (multi) {
		let i = 0;
		for (const part of multi.split(/[,;\n]+/)) {
			i += 1;
			const k = part.trim();
			if (k && !entries.some((e) => e.key === k)) {
				entries.push({ label: `GROQ_API_KEYS[${i}]`, key: k });
			}
		}
	}

	return entries;
}

export function getGroqKeyPool(): GroqKeyPool {
	if (!poolSingleton) {
		const entries = loadGroqApiKeysFromEnv();
		if (!entries.length) {
			throw new Error(
				"Falta GROQ_API_KEY (y opcional GROQ_API_KEY_2) en ISA-DOC/.env o secrets/patyia/lab-langgraph.env",
			);
		}
		poolSingleton = new GroqKeyPool(entries);
	}
	return poolSingleton;
}

export function resetGroqKeyPool(): void {
	poolSingleton = null;
}

export class GroqKeyPool {
	private index = 0;

	constructor(readonly entries: GroqKeyEntry[]) {
		if (!entries.length) throw new Error("GroqKeyPool requiere al menos una API key");
	}

	get size(): number {
		return this.entries.length;
	}

	get currentIndex(): number {
		return this.index;
	}

	get currentKey(): string {
		return this.entries[this.index]!.key;
	}

	get currentLabel(): string {
		return this.entries[this.index]!.label;
	}

	/** Para consola: `1/2 · GROQ_API_KEY_2 · ···CTse` (sin exponer la key completa). */
	currentKeyDisplay(): string {
		const e = this.entries[this.index]!;
		return `${this.index + 1}/${this.entries.length} · ${e.label} · ${keySuffix(e.key)}`;
	}

	/** Pasa a la siguiente key (round-robin). */
	rotate(): void {
		this.index = (this.index + 1) % this.entries.length;
	}

	/**
	 * Ante 429: pasa a la siguiente key (sin volver a la primera hasta `resetToFirst`).
	 * @returns true si quedaba otra key (reintentar sin esperar).
	 */
	rotateOn429(): boolean {
		if (this.index >= this.entries.length - 1) return false;
		this.index += 1;
		console.warn(`  Groq · cambio a API key ${this.currentKeyDisplay()}`);
		return true;
	}

	/** Tras espera de cuota: reintenta desde la primera key. */
	resetToFirst(): void {
		if (this.index === 0) return;
		this.index = 0;
		console.warn(`  Groq · reinicio de API keys → ${this.currentKeyDisplay()}`);
	}
}
