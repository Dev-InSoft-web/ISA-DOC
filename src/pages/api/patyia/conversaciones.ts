import type { APIRoute } from "astro";
import { getPatyPool } from "../../../lib/dbPaty.ts";
import { jsonResponse } from "../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const DB_ALIASES: Record<string, string> = {
	prod: "AYUDASCP_IA",
	produccion: "AYUDASCP_IA",
	staging: "AYUDASCP_IA_STAGING",
	stg: "AYUDASCP_IA_STAGING",
};
const DB_NAME_RE = /^[A-Za-z_][A-Za-z0-9_]{0,63}$/;
const ITERCERO_RE = /^[A-Za-z0-9_-]{1,32}$/;

function resolveDbName(raw: string | null): string | null | { error: string } {
	const v = (raw ?? "").trim();
	if (!v) return null;
	const alias = DB_ALIASES[v.toLowerCase()];
	const name = alias ?? v;
	if (!DB_NAME_RE.test(name)) return { error: `Nombre de BD inválido: ${v}` };
	return name;
}

interface FilaConv {
	iconversacion: number;
	hilo: string;
	fhcre: string | null;
}

// Lista las conversaciones de un (itercero, icontacto) ordenadas por
// FHCRE desc. `?db=` acepta alias `prod`/`staging` o nombre exacto.
export const GET: APIRoute = async ({ url }) => {
	const itercero = (url.searchParams.get("itercero") ?? "").trim();
	const icontacto = (url.searchParams.get("icontacto") ?? "").trim();
	if (!ITERCERO_RE.test(itercero)) return jsonResponse({ ok: false, error: "itercero inválido" }, 400);
	if (icontacto && !ITERCERO_RE.test(icontacto)) return jsonResponse({ ok: false, error: "icontacto inválido" }, 400);

	const dbResolved = resolveDbName(url.searchParams.get("db"));
	if (dbResolved && typeof dbResolved === "object" && "error" in dbResolved) {
		return jsonResponse({ ok: false, error: dbResolved.error }, 400);
	}
	const dbName = (dbResolved as string | null) ?? "AYUDASCP_IA_STAGING";
	const tabla = `[${dbName}].dbo.CONVERSACIONES`;

	try {
		const pool = await getPatyPool();
		const req = pool.request().input("itercero", itercero);
		let where = `ITERCERO = @itercero`;
		if (icontacto) {
			req.input("icontacto", icontacto);
			where += ` AND ICONTACTO = @icontacto`;
		}
		const sql = `SELECT TOP 200 ICONVERSACION, HILO, FHCRE FROM ${tabla} WHERE ${where} ORDER BY FHCRE DESC`;
		const result = await req.query(sql);
		const rows = (result.recordset ?? []) as Array<{
			ICONVERSACION: number;
			HILO: string | null;
			FHCRE: Date | null;
		}>;
		const items: FilaConv[] = rows.map((r) => ({
			iconversacion: Number(r.ICONVERSACION ?? 0),
			hilo: String(r.HILO ?? "").trim(),
			fhcre: r.FHCRE ? new Date(r.FHCRE).toISOString() : null,
		}));

		return jsonResponse({ ok: true, db: dbName, itercero, icontacto, items });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);

		return jsonResponse({ ok: false, error: msg }, 500);
	}
};
