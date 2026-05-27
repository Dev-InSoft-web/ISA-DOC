import type { APIRoute } from "astro";
import { resolveOpenAIKey } from "../../../../../lib/patyia/openaiKey.ts";
import { ensureDir, escribirJson, leerJson, SKILLS_CACHE, STORAGE_ROOT } from "../../../../../lib/patyia/storage.ts";

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
interface Cache { updated: string; count: number; items: Skill[]; available: boolean; }
const EMPTY: Cache = { updated: "", count: 0, items: [], available: false };

export const GET: APIRoute = async () => {
	const data = await leerJson<Cache>(SKILLS_CACHE, EMPTY);
	return j({ ok: true, ...data });
};

export const POST: APIRoute = async () => {
	const apiKey = await resolveOpenAIKey();
	if (!apiKey) return j({ ok: false, error: "OPENAI_API_KEY no encontrada" }, 500);

	const todos: Skill[] = [];
	let available = false;
	try {
		const u = new URL("https://api.openai.com/v1/skills");
		u.searchParams.set("limit", "100");
		const r = await fetch(u.toString(), {
			method: "GET",
			headers: { Authorization: `Bearer ${apiKey}`, "OpenAI-Beta": "skills=v1" },
		});
		const text = await r.text();
		let parsed: SkillsList;
		try { parsed = JSON.parse(text) as SkillsList; }
		catch {
			const data: Cache = { updated: new Date().toISOString(), count: 0, items: [], available: false };
			await ensureDir(STORAGE_ROOT);
			await escribirJson(SKILLS_CACHE, data);
			return j({ ok: false, ...data, error: `HTTP ${r.status} no JSON: ${text.slice(0, 200)}` });
		}
		if (!r.ok) {
			const data: Cache = { updated: new Date().toISOString(), count: 0, items: [], available: false };
			await ensureDir(STORAGE_ROOT);
			await escribirJson(SKILLS_CACHE, data);
			return j({ ok: false, ...data, error: parsed.error?.message ?? `HTTP ${r.status}` });
		}
		available = true;
		todos.push(...(parsed.data ?? []));
	} catch (err) {
		return j({ ok: false, error: err instanceof Error ? err.message : String(err) }, 500);
	}

	const data: Cache = { updated: new Date().toISOString(), count: todos.length, items: todos, available };
	await ensureDir(STORAGE_ROOT);
	await escribirJson(SKILLS_CACHE, data);
	return j({ ok: true, ...data });
};

function j(body: unknown, status: number = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
	});
}
