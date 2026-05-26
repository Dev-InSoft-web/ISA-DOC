import type { APIRoute } from "astro";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, join } from "node:path";

export const prerender = false;

interface Body {
	prompt?: string;
	size?: string;
	n?: number;
	model?: string;
}

interface PatyLocalSettings {
	Values?: Record<string, string>;
}

interface OpenAIImage {
	b64_json?: string;
	url?: string;
	revised_prompt?: string;
}

interface OpenAIImagesResponse {
	created?: number;
	data?: OpenAIImage[];
	error?: { message?: string; type?: string; code?: string };
}

let cachedKey: string | null = null;

async function resolveApiKey(): Promise<string> {
	if (cachedKey) return cachedKey;
	const fromEnv = (process.env.paty_openai_api_key ?? process.env.OPENAI_API_KEY ?? "").trim();
	if (fromEnv) {
		cachedKey = fromEnv;
		return fromEnv;
	}
	const rel = (process.env.paty_local_settings_path ?? "../PatyIA/local.settings.json").trim();
	const path = resolve(process.cwd(), rel);
	try {
		const text = await readFile(path, "utf8");
		const json = JSON.parse(text) as PatyLocalSettings;
		const key = (json?.Values?.OPENAI_API_KEY ?? "").trim();
		if (key) cachedKey = key;
		return key;
	} catch {
		return "";
	}
}

const ALLOWED_SIZES = new Set([
	"auto",
	"1024x1024",
	"1024x1536",
	"1536x1024",
	"1024x1792",
	"1792x1024",
]);

const DEFAULT_URL = "https://api.openai.com/v1/images/generations";
const DEFAULT_MODEL = "gpt-image-1";
const PUBLIC_DIR = "public/patyia/openai/images";
const PUBLIC_URL = "/patyia/openai/images";

export const POST: APIRoute = async ({ request }) => {
	const apiKey = await resolveApiKey();
	if (!apiKey) return json({ ok: false, error: "OPENAI_API_KEY no encontrada (env paty_openai_api_key / OPENAI_API_KEY ni en PatyIA/local.settings.json)" }, 500);

	let payload: Body;
	try {
		payload = (await request.json()) as Body;
	} catch {
		return json({ ok: false, error: "JSON inválido" }, 400);
	}

	const prompt = (typeof payload.prompt === "string" ? payload.prompt : "").trim();
	if (!prompt) return json({ ok: false, error: "prompt vacío" }, 400);
	if (prompt.length > 4000) return json({ ok: false, error: "prompt excede 4000 caracteres" }, 400);

	const size = (typeof payload.size === "string" ? payload.size : "1024x1024").trim();
	if (!ALLOWED_SIZES.has(size)) return json({ ok: false, error: `size inválido: ${size}` }, 400);

	let n = Number.isInteger(payload.n) ? (payload.n as number) : 1;
	if (n < 1) n = 1;
	if (n > 4) n = 4;

	const model = (typeof payload.model === "string" && payload.model.trim())
		? payload.model.trim()
		: (process.env.paty_openai_image_model ?? DEFAULT_MODEL).trim();

	const url = (process.env.paty_openai_images_url ?? DEFAULT_URL).trim() || DEFAULT_URL;

	let r: Response;
	try {
		r = await fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ model, prompt, size, n }),
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: `Fallo al invocar OpenAI: ${msg}` }, 502);
	}

	const text = await r.text();
	let parsed: OpenAIImagesResponse | null = null;
	try {
		parsed = JSON.parse(text) as OpenAIImagesResponse;
	} catch {
		return json({ ok: false, error: `OpenAI respondió HTTP ${r.status} no JSON`, raw: text.slice(0, 500) }, r.ok ? 502 : r.status);
	}

	if (!r.ok) {
		const msg = parsed?.error?.message ?? `OpenAI HTTP ${r.status}`;
		return json({ ok: false, error: msg, openai: parsed?.error ?? null }, r.status);
	}

	const data = Array.isArray(parsed?.data) ? parsed!.data! : [];
	const dirAbs = resolve(process.cwd(), PUBLIC_DIR);
	try {
		await mkdir(dirAbs, { recursive: true });
	} catch {
		// best-effort
	}
	const stamp = new Date().toISOString().replace(/[:.]/g, "-");
	const saved: Array<{ url: string; file?: string; revised_prompt?: string }> = [];
	for (let i = 0; i < data.length; i++) {
		const it = data[i];
		const baseName = `${stamp}-${i + 1}.png`;
		if (it.b64_json) {
			try {
				const buf = Buffer.from(it.b64_json, "base64");
				await writeFile(join(dirAbs, baseName), buf);
				saved.push({ url: `${PUBLIC_URL}/${baseName}`, file: baseName, revised_prompt: it.revised_prompt });
				continue;
			} catch {
				saved.push({ url: `data:image/png;base64,${it.b64_json}`, revised_prompt: it.revised_prompt });
				continue;
			}
		}
		if (it.url) {
			try {
				const ir = await fetch(it.url);
				if (ir.ok) {
					const ab = await ir.arrayBuffer();
					await writeFile(join(dirAbs, baseName), Buffer.from(ab));
					saved.push({ url: `${PUBLIC_URL}/${baseName}`, file: baseName, revised_prompt: it.revised_prompt });
					continue;
				}
			} catch {
				// cae al fallback
			}
			saved.push({ url: it.url, revised_prompt: it.revised_prompt });
		}
	}

	if (!saved.length) return json({ ok: false, error: "OpenAI no devolvió imágenes" }, 502);
	return json({ ok: true, model, size, n, images: saved });
};

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
