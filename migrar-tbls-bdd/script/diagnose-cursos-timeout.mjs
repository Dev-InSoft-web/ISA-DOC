import { openPool, resolveSettingsPath } from "../src/db.js";

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
    console.log("DB resumen estructuras:", rs.recordsets[0]?.[0]);
    console.log("DB top cursos por niveles:", rs.recordsets[1] || []);
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
    console.log("API error:", e?.message || e, "ms:", ms);
  }
}

await checkDb();
await checkApi();
