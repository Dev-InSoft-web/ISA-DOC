import type { APIRoute } from "astro";
import { readdir, stat } from "node:fs/promises";
import { resolve, join } from "node:path";

export const prerender = false;

const PUBLIC_DIR = "public/patyia/openai/images";
const PUBLIC_URL = "/patyia/openai/images";

export const GET: APIRoute = async () => {
	const dirAbs = resolve(process.cwd(), PUBLIC_DIR);
	let entries: string[] = [];
	try {
		entries = await readdir(dirAbs);
	} catch {
		return json({ ok: true, images: [] });
	}
	const pngs = entries.filter((f) => f.toLowerCase().endsWith(".png"));
	const withMtime: Array<{ url: string; file: string; mtime: number }> = [];
	for (const f of pngs) {
		try {
			const st = await stat(join(dirAbs, f));
			withMtime.push({ url: `${PUBLIC_URL}/${f}`, file: f, mtime: st.mtimeMs });
		} catch {
			// ignore
		}
	}
	withMtime.sort((a, b) => b.mtime - a.mtime);
	return json({ ok: true, images: withMtime });
};

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
