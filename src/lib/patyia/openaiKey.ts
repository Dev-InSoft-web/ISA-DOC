import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

interface PatyLocalSettings {
	Values?: Record<string, string>;
}

let cachedFileKey: string | null = null;

export async function resolveOpenAIKey(): Promise<string> {
	const fromEnv = (process.env.paty_openai_api_key ?? process.env.OPENAI_API_KEY ?? "").trim();
	if (fromEnv) return fromEnv;
	if (cachedFileKey) return cachedFileKey;
	const rel = (process.env.paty_local_settings_path ?? "../PatyIA/local.settings.json").trim();
	const path = resolve(process.cwd(), rel);
	try {
		const text = await readFile(path, "utf8");
		const json = JSON.parse(text) as PatyLocalSettings;
		const key = (json?.Values?.OPENAI_API_KEY ?? "").trim();
		if (key) cachedFileKey = key;
		return key;
	} catch {
		return "";
	}
}

export function jsonResponse(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
