// Genera src/lib/features/patyia/070-sql/seed-prompts-tdconsulta.sql desde prompts/PROMPT_<TIPO>.md

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const promptsDir = resolve(__dirname, "..", "src", "lib", "features", "patyia", "050-prompts", "catalog");
const outFile = resolve(__dirname, "..", "src", "lib", "features", "patyia", "070-sql", "seed-prompts-tdconsulta.sql");

const fileToTipo = (name) => name.replace(/^PROMPT_/, "").replace(/\.md$/, "");

const files = readdirSync(promptsDir)
	.filter((f) => /^PROMPT_[A-Z0-9_]+\.md$/.test(f))
	.sort((a, b) => fileToTipo(a).localeCompare(fileToTipo(b)));

const rows = files.map((f) => {
	const tipo = fileToTipo(f);
	const iinst = tipo;
	const ninst = `PROMPT_${tipo}`;
	const raw = readFileSync(resolve(promptsDir, f), "utf8");
	const sqlLit = `N'${raw.replaceAll("'", "''")}'`;
	return { tipo, iinst, ninst, archivo: f, sqlLit };
});

const head = `-- =====================================================================
-- Carga de prompts especificos por tipo de consulta
-- BD: AYUDASCP_IA  (microservicio AYUDASCP-IA / PatyIA)
-- Fuente: src/lib/features/patyia/050-prompts/catalog/PROMPT_<TIPO>.md
--
-- Estrategia (idempotente):
--   1) MERGE en INSTRUCCION (clave iinstruccion = '<TIPO>') con el
--      contenido del .md como instruccion (NVARCHAR(MAX)).
--   2) MERGE en TDCONSULTAXINSTRUCCION enlazando (itdconsulta, iinstruccion)
--      con orden = 1.
-- =====================================================================
SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRAN;
`;

const stmts = rows.map((r) => `
-- ----- ${r.tipo} (${r.archivo}) -----
MERGE INSTRUCCION AS t
USING (VALUES (
	N'${r.iinst}',
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
	SELECT c.itdconsulta, N'${r.iinst}' AS iinstruccion, 1 AS orden
	FROM TDCONSULTA c
	WHERE c.itdconsulta = N'${r.tipo}'
) AS s
ON t.itdconsulta = s.itdconsulta AND t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET t.orden = s.orden
WHEN NOT MATCHED THEN INSERT (itdconsulta, iinstruccion, orden)
	VALUES (s.itdconsulta, s.iinstruccion, s.orden);
`).join("\n");

const tail = `
COMMIT;

SELECT i.iinstruccion, i.ninstruccion, i.version, LEN(i.instruccion) AS len_instruccion
FROM INSTRUCCION i
WHERE i.iinstruccion IN (${rows.map((r) => `N'${r.iinst}'`).join(", ")})
ORDER BY i.iinstruccion;
`;

writeFileSync(outFile, head + stmts + tail, "utf8");
console.log(`[build-paty-prompts-sql] ${rows.length} prompts → ${outFile}`);
