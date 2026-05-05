import type { APIRoute } from "astro";
import { readAll, writeMany } from "../../lib/bitacora/revisadoServer";

export const prerender = false;

export const GET: APIRoute = async () => {
	const map = await readAll();
	return new Response(JSON.stringify(map), { status: 200, headers: { "content-type": "application/json" } });
};

export const POST: APIRoute = async ({ request }) => {
	let body: unknown;
	try { body = await request.json(); } catch { return new Response("Invalid JSON", { status: 400 }); }
	if (!body || typeof body !== "object") return new Response("Invalid payload", { status: 400 });
	const updates: Record<string, boolean> = {};
	for (const [k, v] of Object.entries(body as Record<string, unknown>)) {
		if (typeof k === "string" && k.length > 0) updates[k] = !!v;
	}
	const next = await writeMany(updates);
	return new Response(JSON.stringify(next), { status: 200, headers: { "content-type": "application/json" } });
};
