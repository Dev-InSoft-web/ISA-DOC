import type { APIRoute } from "astro";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { codegenDir } from "../../../lib/codeGen/paths.js";

const DER_DIR = path.join(codegenDir, "der");

interface DerMeta {
	hash: string;
	source: string;
	updatedAt: string;
}

function sanitizeDomain(d: unknown): string {
	const s = typeof d === "string" ? d.trim() : "";
	if (!s) return "clientesis";
	return s.replace(/[^a-z0-9_-]/gi, "_");
}

function metaPath(domain: string): string {
	return path.join(DER_DIR, `${domain}.json`);
}

function svgPath(domain: string): string {
	return path.join(DER_DIR, `${domain}.svg`);
}

async function ensureDir(): Promise<void> {
	await mkdir(DER_DIR, { recursive: true });
}

export const GET: APIRoute = async ({ url }) => {
	try {
		const domain = sanitizeDomain(url.searchParams.get("domain"));
		let raw: string;
		try {
			raw = await readFile(metaPath(domain), "utf8");
		} catch (e) {
			if ((e as NodeJS.ErrnoException).code === "ENOENT") return json({ cached: false });
			throw e;
		}
		if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
		const meta = JSON.parse(raw) as DerMeta;
		return json({ cached: true, meta });
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

export const POST: APIRoute = async ({ request }) => {
	try {
		await ensureDir();
		const body = (await request.json()) as Partial<{ domain: string; hash: string; source: string; svg: string }>;
		const domain = sanitizeDomain(body.domain);
		const hash = typeof body.hash === "string" ? body.hash : "";
		const source = typeof body.source === "string" ? body.source : "";
		const svg = typeof body.svg === "string" ? body.svg : "";
		if (!hash || !svg) return json({ error: "hash y svg son requeridos" }, 400);
		const meta: DerMeta = { hash, source, updatedAt: new Date().toISOString() };
		await writeFile(svgPath(domain), svg, "utf8");
		await writeFile(metaPath(domain), JSON.stringify(meta, null, 2), "utf8");
		return json({ ok: true, meta });
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}
