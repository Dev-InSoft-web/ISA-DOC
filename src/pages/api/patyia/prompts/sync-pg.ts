import type { APIRoute } from "astro";
import { PATYIA_PROMPTS_CATALOG } from "../../../../lib/core/isa-doc-root.ts";
import { syncPatyPromptsToPgFromIsaDoc } from "../../../../lib/patyia/pg-sync-prompts.ts";

/** PG Render: sync directo desde ISA-DOC (no pasa por lab-langgraph HTTP). */
export const POST: APIRoute = async () => {
	try {
		const result = await syncPatyPromptsToPgFromIsaDoc(PATYIA_PROMPTS_CATALOG);
		return new Response(
			JSON.stringify({
				ok: true,
				storage: "postgresql:paty.instruccion",
				copiedUltra: result.agents,
				agents: result.agents,
				syncedAt: result.syncedAt,
			}),
			{ status: 200, headers: { "content-type": "application/json" } },
		);
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ ok: false, error: msg }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
};
