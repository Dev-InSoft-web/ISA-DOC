import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

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

let cachedKey: string | null = null;

// Resuelve la API key probando, en orden:
//   1) `paty_openai_api_key` en el entorno
//   2) `OPENAI_API_KEY` en el entorno
//   3) `local.settings.json` de PatyIA (path configurable con
//      `paty_local_settings_path`, default `../PatyIA/local.settings.json`
//      relativo al CWD del proceso de Astro).
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

// Genera imágenes vía OpenAI Images API usando la llave guardada en el
// servidor (`paty_openai_api_key`). Nunca expone la llave al cliente.
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

	try {
		const r = await fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ model, prompt, size, n }),
		});
		const text = await r.text();
		if (!r.ok) {
			return new Response(text, {
				status: r.status,
				headers: {
					"content-type": r.headers.get("content-type") ?? "application/json",
					"cache-control": "no-store",
				},
			});
		}
		let parsed: unknown;
		try {
			parsed = JSON.parse(text);
		} catch {
			return json({ ok: false, error: "Respuesta no JSON de OpenAI", raw: text.slice(0, 500) }, 502);
		}
		return json({ ok: true, model, size, n, result: parsed });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return json({ ok: false, error: `Fallo al invocar OpenAI: ${msg}` }, 502);
	}
};

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
