import type { APIRoute } from "astro";
import { readFile, writeFile } from "node:fs/promises";
import { sqlFilePath, parseSql, joinFragments } from "../../../lib/sqlFragments.ts";
import { readTablesDoc } from "../../../lib/tablesStore.server.ts";
import { emitTablesAsBody } from "../../../lib/tableSchema.ts";
import { broadcastFragmentsInvalidated } from "../../../lib/socket-server.ts";

/**
 * Regenera los fragmentos kind="table" del init_capacitacion.sql a partir de
 * tables.json y reescribe el archivo SQL completo.
 */
export const POST: APIRoute = async () => {
	try {
		const doc = await readTablesDoc();
		const raw = await readFile(sqlFilePath, "utf8");
		const fragments = parseSql(raw);

		const grouped: Record<string, typeof doc.tables> = {};
		for (const t of doc.tables) {
			if (!grouped[t.fragmentId]) grouped[t.fragmentId] = [];
			grouped[t.fragmentId].push(t);
		}

		const next = fragments.map((f) => {
			if (f.kind !== "table") return f;
			const ts = grouped[f.id];
			if (!ts || ts.length === 0) return f;
			return { ...f, body: emitTablesAsBody(ts).trimEnd() };
		});

		const full = joinFragments(next);
		await writeFile(sqlFilePath, full, "utf8");
		broadcastFragmentsInvalidated();

		return new Response(JSON.stringify({ ok: true, full, count: doc.tables.length }), {
			status: 200, headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
			status: 500, headers: { "content-type": "application/json; charset=utf-8" },
		});
	}
};
