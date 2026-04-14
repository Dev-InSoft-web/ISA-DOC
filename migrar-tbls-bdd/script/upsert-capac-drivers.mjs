import { openPool, resolveSettingsPath } from "../src/db.js";

const REQUIRED = [
  { ndriver: "TRES_COLUMNAS", qniveles: 2 },
  { ndriver: "SEC_VIDEOS", qniveles: 2 },
  { ndriver: "SEC_RELACIONADOS", qniveles: 2 },
];

async function main() {
  const pool = await openPool(resolveSettingsPath(process.argv));
  try {
    const rows = (
      await pool.request().query(`
        SELECT IDRIVER, NDRIVER
        FROM dbo.CAPAC_DRIVERS
        WHERE ISNULL(IDRIVER, '') <> ''
      `)
    ).recordset;

    const existingByName = new Map(rows.map((r) => [String(r.NDRIVER || "").trim().toUpperCase(), String(r.IDRIVER)]));
    let maxNumeric = rows
      .map((r) => Number(String(r.IDRIVER)))
      .filter((n) => Number.isFinite(n))
      .reduce((a, b) => Math.max(a, b), 0);

    let inserted = 0;
    let updated = 0;
    for (const req of REQUIRED) {
      const key = req.ndriver.toUpperCase();
      const found = existingByName.get(key);
      if (found) {
        await pool
          .request()
          .input("idriver", found)
          .input("qniveles", req.qniveles)
          .query(`
            UPDATE dbo.CAPAC_DRIVERS
            SET QNIVELES = @qniveles
            WHERE IDRIVER = @idriver
          `);
        updated += 1;
      } else {
        maxNumeric += 1;
        await pool
          .request()
          .input("idriver", String(maxNumeric))
          .input("ndriver", req.ndriver)
          .input("qniveles", req.qniveles)
          .query(`
            INSERT INTO dbo.CAPAC_DRIVERS (IDRIVER, NDRIVER, QNIVELES)
            VALUES (@idriver, @ndriver, @qniveles)
          `);
        inserted += 1;
      }
    }

    console.log(`Drivers actualizados: ${updated}`);
    console.log(`Drivers insertados: ${inserted}`);
  } finally {
    await pool.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
