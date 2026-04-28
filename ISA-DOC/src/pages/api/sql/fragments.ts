import type { APIRoute } from "astro";
import { readFile, writeFile } from "node:fs/promises";
import { sqlFilePath, parseSql, joinFragments, type SqlFragment, type SqlFragmentKind } from "../../../lib/sqlFragments.ts";

const VALID_KINDS: readonly SqlFragmentKind[] = ["table", "index", "fk", "seed", "raw"] as const;

function isFragment(x: unknown): x is SqlFragment {
	if (!x || typeof x !== "object") return false;
	const o = x as Record<string, unknown>;
	return (
		typeof o.id === "string" &&
		typeof o.name === "string" &&
		typeof o.description === "string" &&
		typeof o.body === "string" &&
		typeof o.kind === "string" &&
		(VALID_KINDS as readonly string[]).includes(o.kind)
	);
}

export const GET: APIRoute = async () => {
	try {
		const raw = await readFile(sqlFilePath, "utf8");
		const fragments = parseSql(raw);
		return new Response(JSON.stringify({ fragments, full: raw }), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	}
};

export const PUT: APIRoute = async ({ request }) => {
	try {
		const data = (await request.json()) as { fragments?: unknown };
		const list = Array.isArray(data.fragments) ? data.fragments : [];
		if (!list.every(isFragment)) {
			return new Response(JSON.stringify({ error: "Payload inválido: 'fragments' debe ser SqlFragment[]." }), {
				status: 400,
				headers: { "content-type": "application/json; charset=utf-8" },
			});
		}
		const full = joinFragments(list as SqlFragment[]);
		await writeFile(sqlFilePath, full, "utf8");
		return new Response(JSON.stringify({ ok: true, full, count: list.length }), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "content-type": "application/json; charset=utf-8" },
		});
	}
};
