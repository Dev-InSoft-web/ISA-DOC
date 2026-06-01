import 'dotenv/config';
import sql from 'mssql';

const cfg = {
  server: process.env.paty_hostdb,
  port: Number(process.env.paty_portdb || 1433),
  user: process.env.paty_userdb,
  password: process.env.paty_passdb,
  database: process.env.paty_namedb,
  options: { encrypt: true, trustServerCertificate: true },
};

const p = await sql.connect(cfg);
const r = await p.request().query(`
SELECT DB_NAME() AS db,
  OBJECT_ID(N'dbo.INSTRUCCION') AS tbl_id,
  COL_LENGTH(N'dbo.INSTRUCCION', N'MODELO') AS len_modelo,
  COL_LENGTH(N'dbo.INSTRUCCION', N'NMODELOIA') AS len_nmodeloia;
SELECT c.name FROM sys.columns c WHERE c.object_id = OBJECT_ID(N'dbo.INSTRUCCION') ORDER BY c.column_id;
`);
console.log(JSON.stringify(r.recordsets, null, 2));
await p.close();
