// Genera lab-langgraph/data/bitacora/patyia/sql/seed-prompts-ultra-tdconsulta.sql desde Ultra/PROMPT_<TIPO>.md

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { ISA_DOC_ROOT } from "../../_shared/isa-doc-root.mjs";

const promptsDir = resolve(ISA_DOC_ROOT, "src", "lib", "features", "patyia", "050-prompts", "catalog", "Ultra");
const outFile = resolve(
	ISA_DOC_ROOT,
	"..",
	"lab-langgraph",
	"data",
	"bitacora",
	"patyia",
	"sql",
	"seed-prompts-ultra-tdconsulta.sql",
);

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
-- Carga de prompts Ultra por tipo de consulta (reemplazo compacto)
-- BD: AYUDASCP_IA / AYUDASCP_IA_STAGING  (PatyIA)
-- Fuente: src/lib/features/patyia/050-prompts/catalog/Ultra/PROMPT_<TIPO>.md
--
-- Estrategia (idempotente):
--   1) MERGE en INSTRUCCION (iinstruccion = '<TIPO>', ninstruccion = 'PROMPT_<TIPO>')
--   2) MERGE en TDCONSULTAXINSTRUCCION (itdconsulta = '<TIPO>', orden = 1).
-- Generado por: node scripts/patyia/prompts/build-paty-prompts-ultra-sql.mjs
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
	N'Prompt Ultra · tipo de consulta ${r.tipo}',
	N'2.0-ultra',
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

SELECT i.iinstruccion, i.ninstruccion, i.version, LEN(i.instruccion) AS chars, x.itdconsulta, c.nconsulta, x.orden
FROM INSTRUCCION i
LEFT JOIN TDCONSULTAXINSTRUCCION x ON x.iinstruccion = i.iinstruccion
LEFT JOIN TDCONSULTA c             ON c.itdconsulta  = x.itdconsulta
WHERE i.ninstruccion LIKE 'PROMPT[_]%'
ORDER BY i.iinstruccion;
`;

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, head + stmts + tail, "utf8");
console.log(`[build-paty-prompts-ultra-sql] ${rows.length} prompts → ${outFile}`);
