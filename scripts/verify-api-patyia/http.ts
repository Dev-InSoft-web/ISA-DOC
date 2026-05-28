import fs from "node:fs";
import {
	baseUrl,
	requestMaxRetries,
	requestRetryBaseDelayMs,
	tokenFileCandidates,
	useIgnoreAuth,
} from "./config.ts";
import { setToken, state } from "./state.ts";

export interface HttpResult {
	status: number;
	data: unknown;
	error?: string;
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Token loader específico para PatyIA (no acepta VERIFY_API_TOKEN: cada app firma con su propio secreto). */
export function loadToken(): boolean {
	const envToken = (process.env.PATYIA_TOKEN || "").trim();
	if (envToken) {
		setToken(envToken);
		console.log(`[AUTH] Token cargado desde env PATYIA_TOKEN (${envToken.length} chars). ✅`);
		return true;
	}
	for (const file of tokenFileCandidates) {
		if (!file || !fs.existsSync(file)) continue;
		try {
			const raw = fs.readFileSync(file, "utf8");
			const parsed = JSON.parse(raw) as { token?: string };
			if (parsed.token) {
				setToken(parsed.token.trim());
				console.log(`[AUTH] Token cargado desde ${file} (${parsed.token.length} chars). ✅`);
				return true;
			}
		} catch (e) {
			console.error(`⛔ Error leyendo ${file}: ${(e as Error).message}`);
		}
	}
	console.error("⛔ Sin token PatyIA. Defina PATYIA_TOKEN o cree token.patyia.json con { \"token\": \"…\" } en la raíz del repo.");

	return false;
}

async function requestOnce(method: string, pathSegment: string, body: unknown = null): Promise<HttpResult> {
	const headers: Record<string, string> = { "Content-Type": "application/json" };
	if (state.token) headers.Authorization = `Bearer ${state.token}`;
	const sep = pathSegment.includes("?") ? "&" : "?";
	const suffix = useIgnoreAuth ? `${sep}___ignoreAuth___=true` : "";
	const url = `${baseUrl}${pathSegment}${suffix}`;
	const opts: RequestInit = { method, headers };
	if (body !== null && body !== undefined) opts.body = JSON.stringify(body);
	try {
		const res = await fetch(url, opts);
		const text = await res.text();
		let data: unknown = {};
		try { data = JSON.parse(text); } catch { data = { raw: text }; }
		return { status: res.status, data };
	} catch (err) {
		return { status: 0, data: {}, error: (err as Error).message };
	}
}

function shouldRetry(status: number): boolean {
	return status === 0 || status === 502 || status === 503 || status === 504;
}

export async function request(method: string, pathSegment: string, body: unknown = null): Promise<HttpResult> {
	let last: HttpResult = { status: 0, data: {} };
	for (let attempt = 0; attempt <= requestMaxRetries; attempt++) {
		if (attempt > 0) {
			const delay = requestRetryBaseDelayMs * attempt;
			await sleep(delay);
			console.log(`   [request] reintento ${attempt}/${requestMaxRetries} (${delay}ms) — ${method} ${pathSegment}`);
		}
		last = await requestOnce(method, pathSegment, body);
		if (!shouldRetry(last.status)) return last;
	}

	return last;
}

export function extractRespuesta<T = Record<string, unknown>>(data: unknown): T | null {
	if (!data || typeof data !== "object") return null;
	const d = data as Record<string, unknown>;
	if (d.respuesta && typeof d.respuesta === "object") return d.respuesta as T;

	return d as T;
}
