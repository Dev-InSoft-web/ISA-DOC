import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const FILE_ID_RE = /^file-[A-Za-z0-9]+$/;
const TEXT_EXT_RE = /\.(md|markdown|txt|json|csv|tsv|log|xml|yaml|yml|sql|js|ts|tsx|jsx|html|css|py|rb|java|cs|go|rs|sh|ps1)$/i;

interface OpenAIFileMeta {
	id?: string;
	filename?: string;
	bytes?: number;
	created_at?: number;
	purpose?: string;
	status?: string;
	status_details?: string;
	error?: { message?: string };
}

export const GET: APIRoute = async ({ params, url }) => {
	const fileId = (params.file_id ?? "").trim();
	if (!FILE_ID_RE.test(fileId)) {
		return json({ ok: false, error: "file_id inválido" }, 400);
	}

	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return json({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const wantContent = url.searchParams.get("content") === "1";

	if (!wantContent) {
		try {
			const meta = await fetchMeta(fileId, apiKey);
			return json({ ok: true, file_id: fileId, meta });
		} catch (err) {
			return json({ ok: false, error: errMsg(err) }, 500);
		}
	}

	let meta: OpenAIFileMeta;
	try {
		meta = await fetchMeta(fileId, apiKey);
	} catch (err) {
		return json({ ok: false, error: errMsg(err) }, 500);
	}

	const r = await fetch(`https://api.openai.com/v1/files/${encodeURIComponent(fileId)}/content`, {
		method: "GET",
		headers: { Authorization: `Bearer ${apiKey}` },
	});

	if (!r.ok) {
		const text = await r.text();
		return json({ ok: false, error: `HTTP ${r.status}: ${text.slice(0, 300)}` }, r.status);
	}

	const filename = meta.filename ?? fileId;
	const isText = TEXT_EXT_RE.test(filename);
	const buf = await r.arrayBuffer();
	const contentType = isText
		? `${detectarMime(filename)}; charset=utf-8`
		: r.headers.get("content-type") ?? "application/octet-stream";

	return new Response(buf, {
		status: 200,
		headers: {
			"content-type": contentType,
			"content-disposition": `inline; filename="${encodeURIComponent(filename)}"`,
			"cache-control": "private, max-age=300",
			"x-openai-filename": filename,
			"x-openai-purpose": meta.purpose ?? "",
		},
	});
};

async function fetchMeta(fileId: string, apiKey: string): Promise<OpenAIFileMeta> {
	const r = await fetch(`https://api.openai.com/v1/files/${encodeURIComponent(fileId)}`, {
		method: "GET",
		headers: { Authorization: `Bearer ${apiKey}` },
	});
	const text = await r.text();
	let parsed: OpenAIFileMeta;
	try {
		parsed = JSON.parse(text) as OpenAIFileMeta;
	} catch {
		throw new Error(`HTTP ${r.status} no JSON: ${text.slice(0, 200)}`);
	}
	if (!r.ok) throw new Error(parsed.error?.message ?? `HTTP ${r.status}`);
	return parsed;
}

function detectarMime(filename: string): string {
	const ext = filename.toLowerCase().split(".").pop() ?? "";
	const tabla: Record<string, string> = {
		md: "text/markdown",
		markdown: "text/markdown",
		txt: "text/plain",
		json: "application/json",
		csv: "text/csv",
		tsv: "text/tab-separated-values",
		log: "text/plain",
		xml: "application/xml",
		yaml: "text/yaml",
		yml: "text/yaml",
		sql: "text/plain",
		js: "text/javascript",
		ts: "text/plain",
		tsx: "text/plain",
		jsx: "text/plain",
		html: "text/html",
		css: "text/css",
		py: "text/x-python",
		rb: "text/x-ruby",
		java: "text/x-java",
		cs: "text/plain",
		go: "text/plain",
		rs: "text/plain",
		sh: "text/x-shellscript",
		ps1: "text/plain",
	};
	return tabla[ext] ?? "text/plain";
}

function errMsg(err: unknown): string {
	if (err instanceof Error) return err.message;
	if (typeof err === "string") return err;
	try { return JSON.stringify(err); } catch { return String(err); }
}

function json(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8" },
	});
}
