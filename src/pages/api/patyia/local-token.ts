import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

export const prerender = false;

export const GET: APIRoute = async () => {
	const envToken = process.env.PATYIA_TOKEN?.trim();
	if (envToken) {
		return new Response(JSON.stringify({ ok: true, token: envToken, source: "env" }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	}
	const file = path.resolve(process.cwd(), "token.patyia.json");
	if (!existsSync(file)) {
		return new Response(JSON.stringify({ ok: false, error: "token.patyia.json no encontrado" }), {
			status: 404,
			headers: { "content-type": "application/json" },
		});
	}
	try {
		const raw = await readFile(file, "utf8");
		const j = JSON.parse(raw) as { token?: string };
		const token = (j.token ?? "").trim();
		if (!token) {
			return new Response(JSON.stringify({ ok: false, error: "token vacío" }), {
				status: 500,
				headers: { "content-type": "application/json" },
			});
		}
		return new Response(JSON.stringify({ ok: true, token, source: "file" }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
};
