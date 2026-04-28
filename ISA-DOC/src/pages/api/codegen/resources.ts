import type { APIRoute } from "astro";
import { mkdir, readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { codegenDir } from "../../../lib/codeGen/paths.js";
import { isValidId } from "../../../lib/codeGen/keys.js";

async function ensureDir(): Promise<void> {
	await mkdir(codegenDir, { recursive: true });
}

export const GET: APIRoute = async ({ url }) => {
	try {
		await ensureDir();
		const id = url.searchParams.get("id");
		if (id !== null) {
			if (!isValidId(id)) return json({ error: "id inválido" }, 400);
			const file = path.join(codegenDir, `${id}.json`);
			try {
				const raw = await readFile(file, "utf8");
				return json({ id, override: JSON.parse(raw) });
			} catch (e) {
				if ((e as NodeJS.ErrnoException).code === "ENOENT") return json({ id, override: null });
				throw e;
			}
		}
		const entries = await readdir(codegenDir);
		const overrides: Record<string, unknown> = {};
		for (const e of entries) {
			if (!e.endsWith(".json")) continue;
			const k = e.slice(0, -5);
			if (!isValidId(k)) continue;
			try {
				const raw = await readFile(path.join(codegenDir, e), "utf8");
				overrides[k] = JSON.parse(raw);
			} catch { /* ignore */ }
		}
		return json({ overrides });
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

export const PUT: APIRoute = async ({ request }) => {
	try {
		await ensureDir();
		const data = (await request.json()) as { id?: unknown; override?: unknown };
		if (!isValidId(data.id)) return json({ error: "id inválido" }, 400);
		if (!data.override || typeof data.override !== "object") return json({ error: "override inválido" }, 400);
		const file = path.join(codegenDir, `${data.id}.json`);
		await writeFile(file, JSON.stringify(data.override, null, 2), "utf8");
		return json({ ok: true, id: data.id });
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

export const DELETE: APIRoute = async ({ url }) => {
	try {
		await ensureDir();
		const id = url.searchParams.get("id");
		if (!isValidId(id)) return json({ error: "id inválido" }, 400);
		const file = path.join(codegenDir, `${id}.json`);
		try { await unlink(file); } catch (e) {
			if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
		}
		return json({ ok: true, id });
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
