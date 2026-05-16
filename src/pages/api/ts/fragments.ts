import type { APIRoute } from "astro";
import { loadProdTsFragments } from "../../../lib/tsFragments";

export const GET: APIRoute = async () => {
	try {
		const map = await loadProdTsFragments();
		return new Response(JSON.stringify({ ok: true, map }), {
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
