import sql from "mssql";
import { openPool, resolveSettingsPath } from "../core/db.js";

async function checkDb() {
  const pool = await openPool(resolveSettingsPath(process.argv));
  try {
    const rs = await pool.request().query(`
      SELECT
        COUNT(*) AS total,
        COUNT(DISTINCT ICURSO) AS cursos,
        MIN(TRY_CONVERT(int, QNIVEL)) AS minNivel,
        MAX(TRY_CONVERT(int, QNIVEL)) AS maxNivel
      FROM dbo.CAPAC_ESTRUCTURAS_CURSOS;

      SELECT TOP 10 ICURSO, COUNT(*) AS niveles
      FROM dbo.CAPAC_ESTRUCTURAS_CURSOS
      GROUP BY ICURSO
      ORDER BY COUNT(*) DESC;
    `);
    const sets = rs.recordsets as sql.IRecordSet<Record<string, unknown>>[];
    console.log("DB resumen estructuras:", sets[0]?.[0]);
    console.log("DB top cursos por niveles:", sets[1] || []);
  } finally {
    await pool.close();
  }
}

async function checkApi() {
  const url =
    "https://clientesis-contapymeu.azurewebsites.net/api/cursos/eyJwYWdpbmEiOjEsInFjYW50aWRhZCI6MTAwLCJjYW1wb3MiOltdLCJmaWx0cm8iOnsiaWRuZmlsdHJvIjoiIn0sIm9yZGVuIjp7fX0=";
  const start = Date.now();
  try {
    const res = await fetch(url, { method: "GET" });
    const ms = Date.now() - start;
    const body = await res.text();
    console.log("API status:", res.status, "ms:", ms, "len:", body.length);
    console.log("API body snippet:", body.slice(0, 500));
  } catch (e) {
    const ms = Date.now() - start;
    const msg = e instanceof Error ? e.message : String(e);
    console.log("API error:", msg, "ms:", ms);
  }
}

await checkDb();
await checkApi();
