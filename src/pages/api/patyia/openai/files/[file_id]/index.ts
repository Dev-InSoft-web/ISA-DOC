import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const FILE_ID_RE = /^file-[A-Za-z0-9]+$/;

export const DELETE: APIRoute = async ({ params }) => {
	const fileId = (params.file_id ?? "").trim();
	if (!FILE_ID_RE.test(fileId)) return j({ ok: false, error: "file_id inválido" }, 400);

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const r = await fetch(`https://api.openai.com/v1/files/${encodeURIComponent(fileId)}`, {
		method: "DELETE",
		headers: { Authorization: `Bearer ${apiKey}` },
	});
	const text = await r.text();
	let parsed: { deleted?: boolean; error?: { message?: string } };
	try { parsed = JSON.parse(text); }
	catch { return j({ ok: false, error: `HTTP ${r.status} no JSON: ${text.slice(0, 200)}` }, 502); }
	if (!r.ok) return j({ ok: false, error: parsed.error?.message ?? `HTTP ${r.status}` }, r.status);

	return j({ ok: true, deleted: parsed.deleted === true, file_id: fileId });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
