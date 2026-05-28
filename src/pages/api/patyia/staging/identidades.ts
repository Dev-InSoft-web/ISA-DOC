import type { APIRoute } from "astro";
import { getPatyPool } from "../../../../lib/dbPaty.ts";
import { getPool } from "../../../../lib/db.ts";
import { jsonResponse } from "../../../../lib/patyia/openaiKey.ts";

export const prerender = false;

const DB = "AYUDASCP_IA_STAGING";

interface FilaIdentidad {
	itercero: string;
	icontacto: string;
	qconv: number;
	ultFh: string | null;
	nombreTercero: string;
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
		}));

		try {
			const issPool = await getPool();
			const ids = Array.from(new Set(items.map((it) => it.itercero).filter(Boolean)));
			if (ids.length) {
				const inList = ids.map((s) => `'${s.replace(/'/g, "''")}'`).join(",");
				const tRes = await issPool.request().query(`SELECT ITERCERO, NTERCERO, NOMBRECOMERCIAL FROM TERCEROS WHERE ITERCERO IN (${inList})`);
				const tMap = new Map<string, string>();
				for (const r of tRes.recordset as Array<{ ITERCERO: string; NTERCERO: string | null; NOMBRECOMERCIAL: string | null }>) {
					const name = (r.NTERCERO ?? "").toString().trim() || (r.NOMBRECOMERCIAL ?? "").toString().trim();
					if (name) tMap.set(String(r.ITERCERO).trim(), name);
				}
				for (const it of items) {
					const n = tMap.get(it.itercero);
					if (n) it.nombreTercero = n;
				}
			}
		} catch { /* sin nombres, devolver items igual */ }

		return jsonResponse({ ok: true, db: DB, items });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);

		return jsonResponse({ ok: false, error: msg }, 500);
	}
};
