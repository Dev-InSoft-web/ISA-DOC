import { openPool, resolveSettingsPath } from "../core/db.js";

const DRIVERS = [
  { idriver: "1", ndriver: "TRES_COLUMNAS", qniveles: 2 },
  { idriver: "2", ndriver: "SEC_VIDEOS", qniveles: 2 },
  { idriver: "3", ndriver: "SEC_RELACIONADOS", qniveles: 2 },
];

async function main() {
  const pool = await openPool(resolveSettingsPath(process.argv));
  const tx = pool.transaction();
  try {
    await tx.begin();
    const req = tx.request();
    await req.query("DELETE FROM dbo.CAPAC_DRIVERS;");

    for (const d of DRIVERS) {
      await tx
        .request()
        .input("idriver", d.idriver)
        .input("ndriver", d.ndriver)
        .input("qniveles", d.qniveles)
        .query(`
          INSERT INTO dbo.CAPAC_DRIVERS (IDRIVER, NDRIVER, QNIVELES)
          VALUES (@idriver, @ndriver, @qniveles)
        `);
    }

    await tx.commit();
    console.log(`CAPAC_DRIVERS reiniciada. Insertados: ${DRIVERS.length}`);
  } catch (e) {
    try {
      await tx.rollback();
    } catch {
      // ignore rollback error
    }
    throw e;
  } finally {
    await pool.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
