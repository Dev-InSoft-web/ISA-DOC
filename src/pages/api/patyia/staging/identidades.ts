import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../lib/dbPaty.ts";
import { resolverIdentidades } from "../../../../lib/patyia/identidadesCache.ts";
import { jsonResponse } from "../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const DB = "AYUDASCP_IA_STAGING";

interface FilaIdentidad {
	itercero: string;
	icontacto: string;
	qconv: number;
	ultFh: string | null;
	nombreTercero: string;
	nombreContacto: string;
}

// GET → top 100 pares (itercero, icontacto) por número de conversaciones
// en AYUDASCP_IA_STAGING. Forzado a staging para no exponer prod.
export const GET: APIRoute = async () => {
	try {
		const pool = await getPatyPool();
		const sql = `SELECT TOP 100 ITERCERO, ICONTACTO, COUNT(*) AS QCONV, MAX(FHCRE) AS ULT_FH
			FROM [${DB}].dbo.CONVERSACIONES
			WHERE ITERCERO IS NOT NULL
			GROUP BY ITERCERO, ICONTACTO
			ORDER BY QCONV DESC, ULT_FH DESC`;
		const result = await pool.request().query(sql);
		const rows = (result.recordset ?? []) as Array<{
			ITERCERO: string;
			ICONTACTO: string | null;
			QCONV: number;
			ULT_FH: Date | null;
		}>;
		const items: FilaIdentidad[] = rows.map((r) => ({
			itercero: String(r.ITERCERO ?? "").trim(),
			icontacto: String(r.ICONTACTO ?? "").trim(),
			qconv: Number(r.QCONV ?? 0),
			ultFh: r.ULT_FH ? new Date(r.ULT_FH).toISOString() : null,
			nombreTercero: "",
			nombreContacto: "",
		}));

		try {
			const { terceros, contactos } = await resolverIdentidades(items.map((it) => ({ itercero: it.itercero, icontacto: it.icontacto })));
			for (const it of items) {
				it.nombreTercero = terceros[it.itercero] ?? "";
				it.nombreContacto = contactos[it.icontacto] ?? "";
			}
		} catch { /* sin nombres, devolver items igual */ }

		return jsonResponse({ ok: true, db: DB, items });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);

		return jsonResponse({ ok: false, error: msg }, 500);
	}
};
