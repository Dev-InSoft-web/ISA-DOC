import type { APIRoute } from "astro";
import { syncRegionsToTables } from "../../../lib/tsFragments";

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json().catch(() => null) as { tables?: string[] } | null;
		const tables = Array.isArray(body?.tables) ? body!.tables.filter((t) => typeof t === "string" && t.length > 0) : [];
		if (tables.length === 0) {
			return new Response(JSON.stringify({ ok: false, error: "Lista de tablas vacía." }), {
				status: 400,
				headers: { "content-type": "application/json; charset=utf-8" },
			});
		}
		const result = await syncRegionsToTables(tables);
		return new Response(JSON.stringify({ ok: true, ...result }), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ ok: false, error: message }), {
			status: 500,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	}
};
