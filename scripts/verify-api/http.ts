import fs from "node:fs";
import * as state from "./state.ts";
import {
	baseUrl,
	tokenFile,
	requestMaxRetries,
	requestRetryBaseDelayMs,
	listExtraRetries,
} from "./config.ts";

export interface HttpResult {
	status: number;
	data: any;
	_fetchError?: string;
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

let fetchDispatcher: unknown;
try {
	if (process.env.VERIFY_API_FETCH_KEEPALIVE !== "0") {
		// @ts-ignore -- `undici` viene incluido en Node ≥ 18 sin tipos públicos.
		const { Agent } = await import("undici");
		fetchDispatcher = new Agent({
			keepAliveTimeout: 60_000,
			keepAliveMaxTimeout: 600_000,
		});
	}
} catch {
	fetchDispatcher = undefined;
}

export function loadToken(): boolean {
	if (process.env.VERIFY_API_TOKEN) {
		state.setToken(process.env.VERIFY_API_TOKEN.trim());
		if (state.getToken()) {
			console.log("[AUTH] Token cargado desde VERIFY_API_TOKEN. ✅");
			return true;
		}
	}
	if (fs.existsSync(tokenFile)) {
		try {
			const data = JSON.parse(fs.readFileSync(tokenFile, "utf8"));
			if (data.token) {
				state.setToken(data.token);
				console.log("[AUTH] Token cargado desde token.json. ✅");
				return true;
			}
		} catch (e) {
			console.error("⛔ Error reading token file: " + (e as Error).message);
		}
	}
	console.error('⛔ No hay token: defina VERIFY_API_TOKEN o cree .agent/token.json con { "token": "..." }');
	return false;
}

export function saveToken(t: string): void {
	fs.writeFileSync(tokenFile, JSON.stringify({ token: t }, null, 2));
	console.log("✅ Token saved to token.json.");
}

async function requestOnce(method: string, path: string, body: unknown = null): Promise<HttpResult> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};
	const tok = state.getToken();
	if (tok) headers.Authorization = `Bearer ${tok}`;

	const options: any = { method, headers };
	if (fetchDispatcher) options.dispatcher = fetchDispatcher;
	if (body) options.body = JSON.stringify(body);

	const separator = path.includes("?") ? "&" : "?";
	const url = `${baseUrl}${path}${separator}___ignoreAuth___=true`;

	try {
		const response = await fetch(url, options);
		const text = await response.text();
		let data: any = {};
		try {
			data = JSON.parse(text);
		} catch {
			data = { raw: text };
		}
		return { status: response.status, data };
	} catch (error) {
		return { status: 0, data: {}, _fetchError: (error as Error).message };
	}
}

function shouldRetryHttpStatus(status: number): boolean {
	return status === 0 || status === 502 || status === 503 || status === 504;
}

export async function request(method: string, path: string, body: unknown = null): Promise<HttpResult> {
	let last: HttpResult = { status: 0, data: {} };
	for (let attempt = 0; attempt <= requestMaxRetries; attempt++) {
		if (attempt > 0) {
			const delay = requestRetryBaseDelayMs * attempt;
			await sleep(delay);
			console.log(`   [request] reintento ${attempt}/${requestMaxRetries} (${delay}ms) — ${method} ${path}`);
		}
		last = await requestOnce(method, path, body);
		if (!shouldRetryHttpStatus(last.status)) {
			if (last._fetchError) delete last._fetchError;
			return last;
		}
	}
	if (last._fetchError) {
		console.error(`⛔ [${method}] ${path} - Network/Fetch Error: ` + last._fetchError);
		delete last._fetchError;
	}
	return last;
}

export async function requestListGet(path: string): Promise<HttpResult> {
	let res = await request("GET", path);
	for (let t = 1; t <= listExtraRetries && res.status !== 200; t++) {
		const delay = 250 * t;
		await sleep(delay);
		console.log(`   [list] reintento extra ${t}/${listExtraRetries} (${delay}ms) — GET ${path}`);
		res = await request("GET", path);
	}
	return res;
}

export { baseUrl };
