import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

interface Skill {
	id?: string;
	name?: string;
	description?: string;
	created_at?: number;
}
interface SkillsList {
	data?: Skill[];
	has_more?: boolean;
	error?: { message?: string };
}

// Skills API está en rollout. Devolvemos disponibilidad para que la UI lo refleje.
export const GET: APIRoute = async ({ url }) => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const limit = clampInt(url.searchParams.get("limit"), 100, 1, 100);
	const u = new URL("https://api.openai.com/v1/skills");
	u.searchParams.set("limit", String(limit));

	try {
		const r = await fetch(u.toString(), {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "skills=v1" },
		});
		const text = await r.text();
		let parsed: SkillsList;
		try { parsed = JSON.parse(text) as SkillsList; }
		catch { return j({ ok: false, available: false, error: `HTTP ${r.status} no JSON: ${text.slice(0, 200)}` }, 200); }
		if (!r.ok) {
			return j({ ok: false, available: false, error: parsed.error?.message ?? `HTTP ${r.status}`, status: r.status }, 200);
		}
		return j({ ok: true, available: true, data: parsed.data ?? [], has_more: parsed.has_more ?? false });
	} catch (err) {
		return j({ ok: false, available: false, error: err instanceof Error ? err.message : String(err) }, 200);
	}
};

function clampInt(raw: string | null, def: number, min: number, max: number): number {
	const n = Number(raw ?? "");
	if (!Number.isFinite(n)) return def;
	return Math.max(min, Math.min(max, Math.trunc(n)));
}
function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
