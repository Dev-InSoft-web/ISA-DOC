// Genera src/lib/patyia/sql/seed-prompts-tdconsulta.sql a partir de los 13 .md
// en src/lib/patyia/prompts/. MERGE idempotente sobre INSTRUCCION y
// TDCONSULTAXINSTRUCCION. iinstruccion = ninstruccion = 'PROMPT_<TIPO>'.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const promptsDir = resolve(__dirname, "..", "src", "lib", "patyia", "prompts");
const outFile = resolve(__dirname, "..", "src", "lib", "patyia", "sql", "seed-prompts-tdconsulta.sql");

const fileToTipo = (name) =>
	name
		.replace(/^\d+-/, "")
		.replace(/\.md$/, "")
		.toUpperCase()
		.replaceAll("-", "_");

const files = readdirSync(promptsDir).filter((f) => f.endsWith(".md")).sort();

const rows = files.map((f) => {
	const tipo = fileToTipo(f);
	const ninst = `PROMPT_${tipo}`;
	const raw = readFileSync(resolve(promptsDir, f), "utf8");
	const sqlLit = `N'${raw.replaceAll("'", "''")}'`;
	return { tipo, ninst, archivo: f, sqlLit };
});

const head = `-- =====================================================================
-- Carga de prompts especificos por tipo de consulta
-- BD: AYUDASCP_IA  (microservicio AYUDASCP-IA / PatyIA)
-- Fecha: 2026-05-25  (Viviana Restrepo)
--
-- Estrategia (idempotente):
--   1) MERGE en INSTRUCCION (clave iinstruccion = 'PROMPT_<TIPO>') con el
--      contenido del .md como instruccion (NVARCHAR(MAX)).
--   2) MERGE en TDCONSULTAXINSTRUCCION enlazando (itdconsulta, iinstruccion)
--      con orden = 1.  El itdconsulta se resuelve por nconsulta = '<TIPO>'.
--
-- Si se vuelven a ejecutar las MERGE actualizan el texto y conservan la
-- relacion sin duplicar filas.
-- =====================================================================
SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRAN;
`;

const stmts = rows.map((r) => `
-- ----- ${r.tipo} (${r.archivo}) -----
MERGE INSTRUCCION AS t
USING (VALUES (
	N'${r.ninst}',
	N'${r.ninst}',
	${r.sqlLit},
	N'Prompt especifico para tipo de consulta ${r.tipo}',
	N'1.0',
	1
)) AS s (iinstruccion, ninstruccion, instruccion, descripcion, version, bactivo)
ON t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET
	t.ninstruccion = s.ninstruccion,
	t.instruccion  = s.instruccion,
	t.descripcion  = s.descripcion,
	t.version      = s.version,
	t.bactivo      = s.bactivo
WHEN NOT MATCHED THEN INSERT (iinstruccion, ninstruccion, instruccion, descripcion, version, bactivo, fhini)
	VALUES (s.iinstruccion, s.ninstruccion, s.instruccion, s.descripcion, s.version, s.bactivo, SYSUTCDATETIME());

MERGE TDCONSULTAXINSTRUCCION AS t
USING (
	SELECT c.itdconsulta, N'${r.ninst}' AS iinstruccion, 1 AS orden
	FROM TDCONSULTA c
	WHERE c.nconsulta = N'${r.tipo}'
) AS s
ON t.itdconsulta = s.itdconsulta AND t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET t.orden = s.orden
WHEN NOT MATCHED THEN INSERT (itdconsulta, iinstruccion, orden)
	VALUES (s.itdconsulta, s.iinstruccion, s.orden);
`).join("");

const tail = `
COMMIT;

-- Verificacion final
SELECT i.iinstruccion, i.ninstruccion, LEN(i.instruccion) AS chars, x.itdconsulta, c.nconsulta, x.orden
FROM INSTRUCCION i
LEFT JOIN TDCONSULTAXINSTRUCCION x ON x.iinstruccion = i.iinstruccion
LEFT JOIN TDCONSULTA c             ON c.itdconsulta  = x.itdconsulta
WHERE i.iinstruccion LIKE 'PROMPT\\_%' ESCAPE '\\'
ORDER BY i.iinstruccion;
`;

writeFileSync(outFile, head + stmts + tail, "utf8");
console.log(`OK: ${outFile} (${rows.length} prompts)`);
