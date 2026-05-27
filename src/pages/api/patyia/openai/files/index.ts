import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

interface OpenAIFile {
	id: string;
	object: string;
	bytes: number;
	created_at: number;
	filename: string;
	purpose: string;
	status?: string;
	status_details?: string | null;
	expires_at?: number | null;
}

interface FilesList {
	object?: string;
	data?: OpenAIFile[];
	has_more?: boolean;
	error?: { message?: string };
}

export const GET: APIRoute = async ({ url }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return jsonResp({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const purpose = (url.searchParams.get("purpose") ?? "").trim();
	const limit = clampInt(url.searchParams.get("limit"), 100, 1, 10000);
	const order = url.searchParams.get("order") === "asc" ? "asc" : "desc";
	const after = (url.searchParams.get("after") ?? "").trim();

	const u = new URL("https://api.openai.com/v1/files");
	u.searchParams.set("limit", String(limit));
	u.searchParams.set("order", order);
	if (purpose) u.searchParams.set("purpose", purpose);
	if (after) u.searchParams.set("after", after);

	try {
		const r = await fetch(u.toString(), {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}` },
		});
		const text = await r.text();
		let parsed: FilesList;
		try { parsed = JSON.parse(text) as FilesList; }
		catch { return jsonResp({ ok: false, error: `HTTP ${r.status} no JSON: ${text.slice(0, 200)}` }, 502); }
		if (!r.ok) return jsonResp({ ok: false, error: parsed.error?.message ?? `HTTP ${r.status}` }, r.status);

		return jsonResp({
			ok: true,
			data: parsed.data ?? [],
			has_more: parsed.has_more ?? false,
		});
	} catch (err) {
		return jsonResp({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

export const POST: APIRoute = async ({ request }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return jsonResp({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	let incoming: FormData;
	try { incoming = await request.formData(); }
	catch (err) { return jsonResp({ ok: false, error: `formData inválido: ${err instanceof Error ? err.message : String(err)}` }, 400); }

	const file = incoming.get("file");
	const purpose = String(incoming.get("purpose") ?? "").trim();
	if (!(file instanceof File)) return jsonResp({ ok: false, error: "Falta 'file' (binario)" }, 400);
	if (!purpose) return jsonResp({ ok: false, error: "Falta 'purpose'" }, 400);

	const fd = new FormData();
	fd.append("file", file, file.name);
	fd.append("purpose", purpose);

	try {
		const r = await fetch("https://api.openai.com/v1/files", {
			method: "POST",
			headers: { Authorization: `Bearer ${apiKey}` },
			body: fd,
		});
		const text = await r.text();
		let parsed: OpenAIFile & { error?: { message?: string } };
		try { parsed = JSON.parse(text) as OpenAIFile & { error?: { message?: string } }; }
		catch { return jsonResp({ ok: false, error: `HTTP ${r.status} no JSON: ${text.slice(0, 200)}` }, 502); }
		if (!r.ok) return jsonResp({ ok: false, error: parsed.error?.message ?? `HTTP ${r.status}` }, r.status);
		return jsonResp({ ok: true, file: parsed });
	} catch (err) {
		return jsonResp({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
	}
};

function clampInt(raw: string | null, def: number, min: number, max: number): number {
	const n = Number(raw ?? "");
	if (!Number.isFinite(n)) return def;
	return Math.max(min, Math.min(max, Math.trunc(n)));
}

function jsonResp(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
