import type { APIRoute } from "astro";
import { join } from "node:path";
import { EMPTY_LOCAL_META, ensureDir, escribirJson, fileDir, leerJson, type LocalFileMeta } from "../../../../../../lib/patyia/storage.ts";

export const prerender = false;

const FILE_ID_RE = /^file-[A-Za-z0-9]+$/;

export const GET: APIRoute = async ({ params }) => {
	const fileId = (params.file_id ?? "").trim();
	if (!FILE_ID_RE.test(fileId)) return j({ ok: false, error: "file_id inválido" }, 400);
	const path = join(fileDir(fileId), "local.json");
	const data = await leerJson<LocalFileMeta>(path, EMPTY_LOCAL_META);
	return j({ ok: true, data });
};

export const PUT: APIRoute = async ({ params, request }) => {
	const fileId = (params.file_id ?? "").trim();
	if (!FILE_ID_RE.test(fileId)) return j({ ok: false, error: "file_id inválido" }, 400);

	let body: Partial<LocalFileMeta>;
	try { body = (await request.json()) as Partial<LocalFileMeta>; }
	catch { return j({ ok: false, error: "JSON inválido" }, 400); }

	const data: LocalFileMeta = {
		categorias: arrStr(body.categorias),
		tags: arrStr(body.tags),
		descripcion: str(body.descripcion),
		notas: str(body.notas),
		actualizado: new Date().toISOString(),
	};

	const dir = fileDir(fileId);
	await ensureDir(dir);
	await escribirJson(join(dir, "local.json"), data);
	return j({ ok: true, data });
};

function arrStr(v: unknown): string[] {
	if (!Array.isArray(v)) return [];
	return v.map((x) => String(x ?? "").trim()).filter((s) => s !== "");
}
function str(v: unknown): string {
	return typeof v === "string" ? v : "";
}
function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
