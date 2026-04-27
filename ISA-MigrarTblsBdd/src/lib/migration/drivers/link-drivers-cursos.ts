import { openPool, resolveSettingsPath } from "../core/db.js";

function norm(v: unknown): string {
  return String(v || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toUpperCase();
}

function compact(v: unknown): string {
  return norm(v).replace(/\s+/g, "");
}

function extractDriverName(driverStruct: unknown): string {
  const raw = String(driverStruct || "").trim();
  if (!raw) return "";
  const first = raw.split("|")[0]?.trim() || raw;
  return first;
}

function canonical(v: unknown): string {
  const c = compact(v);
  const aliases: Record<string, string> = {
    TRESCOLUMNAS: "TRES_COLUMNAS",
    SECVIDEOS: "SEC_VIDEOS",
    SECRELACIONADOS: "SEC_RELACIONADOS",
    SECRELACIONADO: "SEC_RELACIONADOS",
  };
  return aliases[c] || String(v ?? "");
}

function lcsRatio(a: unknown, b: unknown): number {
  const x = compact(a);
  const y = compact(b);
  if (!x || !y) return 0;
  const m: number[][] = Array.from({ length: x.length + 1 }, () => new Array(y.length + 1).fill(0));
  for (let i = 1; i <= x.length; i += 1) {
    for (let j = 1; j <= y.length; j += 1) {
      m[i][j] = x[i - 1] === y[j - 1] ? m[i - 1][j - 1] + 1 : Math.max(m[i - 1][j], m[i][j - 1]);
    }
  }
  return m[x.length][y.length] / Math.max(x.length, y.length);
}

function tokenJaccard(a: unknown, b: unknown): number {
  const ta = new Set(norm(a).split(/\s+/).filter(Boolean));
  const tb = new Set(norm(b).split(/\s+/).filter(Boolean));
  if (!ta.size || !tb.size) return 0;
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter += 1;
  const uni = new Set([...ta, ...tb]).size;
  return uni ? inter / uni : 0;
}

function score(a: unknown, b: unknown): number {
  const ca = compact(a);
  const cb = compact(b);
  if (!ca || !cb) return 0;
  if (ca === cb) return 1;
  return lcsRatio(a, b) * 0.7 + tokenJaccard(a, b) * 0.3;
}

async function main() {
  const pool = await openPool(resolveSettingsPath(process.argv));
  try {
    const driversRs = await pool.request().query(`
      SELECT IDRIVER, NDRIVER
      FROM dbo.CAPAC_DRIVERS
      WHERE ISNULL(IDRIVER, '') <> ''
    `);
    const drivers = driversRs.recordset.map((r) => ({
      idriver: String(r.IDRIVER),
      ndriver: canonical(String(r.NDRIVER || "")),
    }));

    const cursosRs = await pool.request().query(`
      SELECT c.ICURSO, o.DRIVERSTRUCT
      FROM dbo.CAPAC_CURSOS c
      INNER JOIN dbo.CAPAC_CURSOS_OLD o ON o.ICURSO = c.ICURSO
    `);

    const matched = [];
    const unmatched = [];
    for (const row of cursosRs.recordset) {
      const icurso = String(row.ICURSO || "");
      const srcName = canonical(extractDriverName(row.DRIVERSTRUCT));
      if (!srcName) {
        unmatched.push({ icurso, srcName: "" });
        continue;
      }

      let best = null;
      let bestScore = 0;
      for (const d of drivers) {
        const s = score(srcName, d.ndriver);
        if (s > bestScore) {
          bestScore = s;
          best = d;
        }
      }

      if (!best || bestScore < 0.45) {
        unmatched.push({ icurso, srcName });
        continue;
      }

      matched.push({ icurso, idriver: best.idriver, srcName, ndriver: best.ndriver, score: bestScore });
    }

    const tx = pool.transaction();
    await tx.begin();
    try {
      for (const m of matched) {
        await tx
          .request()
          .input("idriver", m.idriver)
          .input("icurso", m.icurso)
          .query("UPDATE dbo.CAPAC_CURSOS SET IDRIVER = @idriver WHERE ICURSO = @icurso");
      }
      await tx.commit();
    } catch (e) {
      await tx.rollback();
      throw e;
    }

    console.log(`Drivers disponibles: ${drivers.length}`);
    console.log(`Cursos procesados: ${cursosRs.recordset.length}`);
    console.log(`Cursos vinculados: ${matched.length}`);
    console.log(`Cursos sin match: ${unmatched.length}`);

    const sample = matched.slice(0, 10);
    if (sample.length) {
      console.log("\nMuestra de vinculaciones:");
      for (const m of sample) {
        console.log(` - ${m.icurso}: "${m.srcName}" -> ${m.idriver} ("${m.ndriver}") [${m.score.toFixed(2)}]`);
      }
    }

    const noSample = unmatched.slice(0, 10);
    if (noSample.length) {
      console.log("\nMuestra sin match:");
      for (const m of noSample) console.log(` - ${m.icurso}: "${m.srcName}"`);
    }
  } finally {
    await pool.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
