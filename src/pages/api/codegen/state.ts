import type { APIRoute } from "astro";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { codegenDir } from "../../../lib/codeGen/paths.js";

const STATE_FILE = path.join(codegenDir, "_state.json");

interface StateDoc {
	domains?: unknown;
	topOrder?: unknown;
	prefixOrders?: unknown;
	childPrefixes?: unknown;
	nodeInfo?: unknown;
}

async function ensureDir(): Promise<void> {
	await mkdir(codegenDir, { recursive: true });
}

async function readState(): Promise<StateDoc> {
	try {
		let raw = await readFile(STATE_FILE, "utf8");
		// Defensa contra BOM UTF-8 (EF BB BF) que algunos editores / shells
		// (PowerShell 5 `Set-Content -Encoding UTF8`) anteponen y rompen
		// `JSON.parse`. Lo strippeamos antes de parsear.
		if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
		if (!raw.trim()) return {};
		const parsed = JSON.parse(raw) as unknown;
		if (parsed && typeof parsed === "object") return parsed as StateDoc;
		return {};
	} catch (e) {
		if ((e as NodeJS.ErrnoException).code === "ENOENT") return {};
		throw e;
	}
}

async function writeState(doc: StateDoc): Promise<void> {
	await writeFile(STATE_FILE, JSON.stringify(doc, null, 2), "utf8");
}

export const GET: APIRoute = async () => {
	try {
		await ensureDir();
		const doc = await readState();
		return json({ state: doc });
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

export const PUT: APIRoute = async ({ request }) => {
	try {
		await ensureDir();
		const body = (await request.json()) as { patch?: StateDoc };
		const patch = body.patch && typeof body.patch === "object" ? body.patch : {};
		const current = await readState();
		const next: StateDoc = { ...current, ...patch };
		await writeState(next);
		return json({ ok: true, state: next });
	} catch (err) {
		return json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

// `navigator.sendBeacon` solo emite POST; reusamos PUT para el flush de unload.
export const POST: APIRoute = async (ctx) => PUT(ctx);

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}
