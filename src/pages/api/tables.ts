import type { APIRoute } from "astro";
import { readTablesDoc, writeTablesDoc, type TablesDoc } from "../../lib/tablesStore.server.ts";
import type { ParsedTable } from "../../lib/tableSchema.ts";

function isParsedTable(x: unknown): x is ParsedTable {
	if (!x || typeof x !== "object") return false;
	const o = x as Record<string, unknown>;
	return typeof o.fragmentId === "string"
		&& typeof o.fragmentName === "string"
		&& typeof o.name === "string"
		&& typeof o.originalName === "string"
		&& Array.isArray(o.columns);
}

export const GET: APIRoute = async () => {
	try {
		const doc = await readTablesDoc();
		return new Response(JSON.stringify({ ok: true, ...doc }), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
			status: 500, headers: { "content-type": "application/json; charset=utf-8" },
		});
	}
};

export const PUT: APIRoute = async ({ request }) => {
	try {
		const data = (await request.json()) as { tables?: unknown };
		const list = Array.isArray(data.tables) ? data.tables : [];
		if (!list.every(isParsedTable)) {
			return new Response(JSON.stringify({ error: "Payload inválido: 'tables' debe ser ParsedTable[]." }), {
				status: 400, headers: { "content-type": "application/json; charset=utf-8" },
			});
		}
		const doc: TablesDoc = { version: 1, tables: list as ParsedTable[] };
		await writeTablesDoc(doc);
		return new Response(JSON.stringify({ ok: true, count: list.length }), {
			status: 200, headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
			status: 500, headers: { "content-type": "application/json; charset=utf-8" },
		});
	}
};

// `navigator.sendBeacon` solo emite POST; reusamos el handler de PUT como
// fallback de persistencia ante refresh/cierre.
export const POST: APIRoute = async (ctx) => PUT(ctx);
