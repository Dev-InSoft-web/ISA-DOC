import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sql from "mssql";
import { openPool, resolveSettingsPath } from "../core/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadToken(): string | null {
  const env = process.env.VERIFY_API_TOKEN?.trim();
  if (env) return env;
  const tokenFile =
    process.env.VERIFY_API_TOKEN_FILE ||
    path.resolve(__dirname, "..", "..", "..", "..", "..", "test", "token.json");
  if (!fs.existsSync(tokenFile)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(tokenFile, "utf8")) as { token?: string };
    return data.token?.trim() ?? null;
  } catch {
    return null;
  }
}

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
  const token = loadToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  else console.log("[AUTH] Sin token: solicitud anónima (probablemente 401).");
  try {
    const res = await fetch(url, { method: "GET", headers });
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
