import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sql from 'mssql';

const root = path.dirname(fileURLToPath(import.meta.url));
const sqlText = fs.readFileSync(
  path.join(root, '../src/lib/patyia/sql/add-modelo-instruccion.sql'),
  'utf8',
);

const cfg = {
  server: process.env.paty_hostdb,
  port: Number(process.env.paty_portdb || 1433),
  user: process.env.paty_userdb,
  password: process.env.paty_passdb,
  database: process.env.paty_namedb,
  options: { encrypt: true, trustServerCertificate: true },
};

try {
  const p = await sql.connect(cfg);
  const result = await p.request().query(sqlText);
  console.log('OK', JSON.stringify(result.recordsets?.slice(-1), null, 2));
  await p.close();
} catch (err) {
  console.error('FAIL', err.message);
  process.exit(1);
}
