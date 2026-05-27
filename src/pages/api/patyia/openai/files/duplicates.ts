import type { APIRoute } from "astro";
import { join } from "node:path";
import { escribirJson, leerJson, STORAGE_ROOT } from "../../../../../lib/patyia/storage.ts";
import { scanDuplicates, type DuplicatesReport } from "../../../../../lib/patyia/duplicates.ts";

export const prerender = false;

const DUPLICATES_FILE = join(STORAGE_ROOT, "duplicates.json");

const EMPTY: DuplicatesReport = {
	updated: "",
	totalEscaneados: 0,
	totalConHash: 0,
	exactGroups: [],
	similarGroups: [],
};

export const GET: APIRoute = async () => {
	const data = await leerJson<DuplicatesReport>(DUPLICATES_FILE, EMPTY);
	return j({ ok: true, ...data });
};

export const POST: APIRoute = async () => {
	try {
		const report = await scanDuplicates();
		await escribirJson(DUPLICATES_FILE, report);
		return j({ ok: true, ...report });
	} catch (err) {
		return j({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
