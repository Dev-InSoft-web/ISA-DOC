import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { GOV_BASE } from "./paths.ts";

export type ImgbbCacheEntry = {
	sha256: string;
	url: string;
	display_url: string;
	width?: number;
	height?: number;
	uploadedAt: string;
};

export type ImgbbCache = Record<string, ImgbbCacheEntry>;

const CACHE_PATH = join(GOV_BASE, "imgbb-cache.json");
const UPLOAD_DELAY_MS = 400;

function apiKey(): string {
	const key = process.env.IMGBB_API_KEY?.trim();
	if (!key) {
		throw new Error("Falta IMGBB_API_KEY (ISA-DOC/.env o variable de entorno).");
	}
	return key;
}

export async function loadImgbbCache(): Promise<ImgbbCache> {
	try {
		return JSON.parse(await readFile(CACHE_PATH, "utf8")) as ImgbbCache;
	} catch {
		return {};
	}
}

export async function saveImgbbCache(cache: ImgbbCache): Promise<void> {
	await writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, "utf8");
}

function sha256(buf: Buffer): string {
	return createHash("sha256").update(buf).digest("hex");
}

export async function uploadPngToImgbb(
	buf: Buffer,
	name: string,
	opts?: { cache?: ImgbbCache; dryRun?: boolean },
): Promise<{ url: string; display_url: string; fromCache: boolean }> {
	const hash = sha256(buf);
	const cache = opts?.cache ?? (await loadImgbbCache());
	const hit = cache[hash];
	if (hit?.url) {
		return { url: hit.url, display_url: hit.display_url, fromCache: true };
	}
	if (opts?.dryRun) {
		return { url: `dry-run://${name}`, display_url: `dry-run://${name}`, fromCache: false };
	}

	const body = new FormData();
	body.append("key", apiKey());
	body.append("image", buf.toString("base64"));
	body.append("name", name.slice(0, 80));

	const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body });
	const json = (await res.json()) as {
		success?: boolean;
		data?: { url: string; display_url: string; width?: number; height?: number };
		error?: { message?: string };
	};
	if (!json.success || !json.data?.url) {
		throw new Error(`imgbb: ${json.error?.message ?? JSON.stringify(json)}`);
	}

	cache[hash] = {
		sha256: hash,
		url: json.data.url,
		display_url: json.data.display_url,
		width: json.data.width,
		height: json.data.height,
		uploadedAt: new Date().toISOString(),
	};
	await saveImgbbCache(cache);
	await sleep(UPLOAD_DELAY_MS);
	return { url: json.data.url, display_url: json.data.display_url, fromCache: false };
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}
