// codeImage(src, lang) — genera una imagen PNG del fragmento de código
// usando la API pública de carbonara (https://github.com/petersolopov/carbonara),
// la sube a imgbb y devuelve `{ url, width, height }`. Se cachea en disco
// para que cada snippet sólo se genere/suba una vez.
//
// Configuración fija (alineada con la directriz):
// - sin paddings vertical/horizontal
// - sin window controls
// - fondo negro puro (#000)
// - tema vscode
// - exportSize 2x (mejor calidad para clientes de email con DPR alto)
//
// La cache se guarda en `src/lib/tickets/assets/code-imgs.json`. La PNG
// también se persiste en `src/lib/tickets/assets/code/<sha>.png` por si
// se requiere reutilizar fuera de imgbb.

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import type { CodeLang } from "./snippets";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(HERE, "assets");
const CACHE_FILE = path.join(ASSETS_DIR, "code-imgs.json");
const PNG_DIR = path.join(ASSETS_DIR, "code");
const IMGBB_KEY = process.env.IMGBB_API_KEY ?? "bd446e4f6fb2260ac3111574c4e7412e";
const CARBONARA_URL = process.env.CARBONARA_URL ?? "https://carbonara.solopov.dev/api/cook";

export interface CodeImageInfo {
	url: string;
	width: number;
	height: number;
}

type CarbonLanguage =
	| "auto"
	| "application/typescript"
	| "javascript"
	| "application/json"
	| "sql"
	| "htmlmixed";

const CARBON_LANG: Record<CodeLang, CarbonLanguage> = {
	ts: "application/typescript",
	typescript: "application/typescript",
	js: "javascript",
	javascript: "javascript",
	json: "application/json",
	sql: "sql",
	html: "htmlmixed",
};

let cache: Record<string, CodeImageInfo> | null = null;
const inflight = new Map<string, Promise<CodeImageInfo>>();

// `CARBONARA_INSECURE_TLS=1` permite saltar la validación de certificado en
// entornos con interceptor TLS corporativo (zscaler, netskope, …). Solo
// debería activarse en máquinas de desarrollo. El bypass se aplica de forma
// puntual sobre cada request (snapshot/restore de la flag global).
const INSECURE_TLS = process.env.CARBONARA_INSECURE_TLS === "1";

async function fetchInsecure(url: string, init: RequestInit): Promise<Response> {
	if (!INSECURE_TLS) return fetch(url, init);
	const prev = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	try {
		return await fetch(url, init);
	} finally {
		if (prev === undefined) delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
		else process.env.NODE_TLS_REJECT_UNAUTHORIZED = prev;
	}
}

async function loadCache(): Promise<Record<string, CodeImageInfo>> {
	if (cache) return cache;
	try {
		const raw = await fs.readFile(CACHE_FILE, "utf8");
		cache = JSON.parse(raw) as Record<string, CodeImageInfo>;
	} catch {
		cache = {};
	}
	return cache;
}

async function persistCache(): Promise<void> {
	if (!cache) return;
	await fs.mkdir(ASSETS_DIR, { recursive: true });
	await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, "\t") + "\n", "utf8");
}

async function fetchCarbonPng(src: string, lang: CodeLang): Promise<Buffer> {
	const body = {
		code: src,
		language: CARBON_LANG[lang] ?? "auto",
		backgroundColor: "rgba(0,0,0,1)",
		theme: "vscode",
		windowControls: false,
		windowTheme: "none",
		paddingVertical: "0px",
		paddingHorizontal: "0px",
		dropShadow: false,
		dropShadowOffsetY: "0px",
		dropShadowBlurRadius: "0px",
		fontFamily: "Hack",
		fontSize: "14px",
		lineHeight: "133%",
		lineNumbers: false,
		widthAdjustment: true,
		exportSize: "2x",
	};
	const res = await fetchInsecure(CARBONARA_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		throw new Error(`carbonara failed (${res.status}): ${await res.text().catch(() => "")}`);
	}
	const buf = Buffer.from(await res.arrayBuffer());
	if (buf.length === 0) throw new Error("carbonara returned empty buffer");
	return buf;
}

async function uploadToImgbb(buf: Buffer, name: string): Promise<CodeImageInfo> {
	const form = new FormData();
	form.append("key", IMGBB_KEY);
	form.append("image", buf.toString("base64"));
	form.append("name", name);
	const res = await fetchInsecure("https://api.imgbb.com/1/upload", { method: "POST", body: form });
	const json = (await res.json()) as {
		success?: boolean;
		data?: { url: string; width: string | number; height: string | number };
	};
	if (!json.success || !json.data) {
		throw new Error(`imgbb upload failed: ${JSON.stringify(json)}`);
	}
	return {
		url: json.data.url,
		width: Number(json.data.width),
		height: Number(json.data.height),
	};
}

export async function codeImage(src: string, lang: CodeLang = "typescript"): Promise<CodeImageInfo> {
	const c = await loadCache();
	const key = crypto.createHash("sha1").update(`${lang}\0${src}`).digest("hex");
	if (c[key]) return c[key];
	const existing = inflight.get(key);
	if (existing) return existing;
	const promise = (async (): Promise<CodeImageInfo> => {
		const png = await fetchCarbonPng(src, lang);
		await fs.mkdir(PNG_DIR, { recursive: true });
		await fs.writeFile(path.join(PNG_DIR, `${key}.png`), png);
		const info = await uploadToImgbb(png, `code-${key.slice(0, 12)}`);
		c[key] = info;
		await persistCache();
		return info;
	})();
	inflight.set(key, promise);
	try {
		return await promise;
	} finally {
		inflight.delete(key);
	}
}
