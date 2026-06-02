// TK-1431666 — Instrucciones compactas Ultra en BD (MERGE idempotente).

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import { PROMPT_LEN_METRICS, approxTokens, promptMetricsTotals } from "./patyia-prompt-metrics";
import { h3Iconized, note, noteList } from "./tk-helpers";

const SQL_MERGE_PATRON = `MERGE INSTRUCCION AS t
USING (VALUES (
	N'<TIPO>',
	N'PROMPT_<TIPO>',
	N'<texto Ultra del .md>',
	N'Prompt especifico para tipo de consulta <TIPO>',
	N'2.0-ultra',
	1
)) AS s (iinstruccion, ninstruccion, instruccion, descripcion, version, bactivo)
ON t.iinstruccion = s.iinstruccion
WHEN MATCHED THEN UPDATE SET
	t.instruccion = s.instruccion,
	t.version = s.version,
	t.bactivo = s.bactivo;`;

const intro =
	`<div>Se actualizaron en <b>AYUDASCP_IA</b> las instrucciones por tipo de consulta con la versión compacta ` +
	`<b>Ultra</b> (<code>version = 2.0-ultra</code>), reduciendo el volumen de texto reinyectado por turno. ` +
	`La versión extendida se conservó en el repositorio de análisis como referencia de mantenimiento.</div>`;

export async function buildBodyTK1431666(): Promise<string> {
	const totals = promptMetricsTotals();
	const [h3Solicitud, h3Metricas, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:database-cog-outline", "Solicitud"),
		h3Iconized("mdi:chart-bar", "Reducción de tokens"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:folder-text-outline",
			"Se reemplazó el contenido de <code>INSTRUCCION.instruccion</code> para los 13 tipos activos, tomando como fuente los archivos <code>prompts/Ultra/01-*.md</code> … <code>13-*.md</code>.",
		),
		await note(
			"mdi:database-edit-outline",
			"Se mantuvo el enlace en <code>TDCONSULTAXINSTRUCCION</code> con <code>orden = 1</code> sin duplicar relaciones.",
		),
	);

	const metricasFilas = PROMPT_LEN_METRICS.map((r) => {
		const pct = r.orig > 0 ? Math.round((1000 * (1 - r.ultra / r.orig)) / 10) : 0;
		return [
			`<code>${r.tipo}</code>`,
			String(approxTokens(r.orig)),
			String(approxTokens(r.ultra)),
			`${pct}%`,
		];
	});

	const tablaMetricas = simpleTable(
		["IINSTRUCCION", "Tokens aprox. v1.0", "Tokens aprox. Ultra", "Reducción"],
		metricasFilas,
		{ widths: ["34%", "18%", "18%", "12%"] },
	);

	const totalesRow = simpleTable(
		["Agregado (13 tipos)", "Caracteres", "Tokens aprox.", "Reducción"],
		[[
			"Total",
			`${totals.origChars.toLocaleString()} → ${totals.ultraChars.toLocaleString()}`,
			`${totals.origTok.toLocaleString()} → ${totals.ultraTok.toLocaleString()}`,
			`<b>${totals.pct}%</b>`,
		]],
	);

	const metricas = noteList(
		await note(
			"mdi:information-outline",
			`Se estimaron tokens de entrada como <code>LEN(instruccion)/4</code> por tipo. La reducción agregada fue del <b>${totals.pct}%</b> respecto a la carga v1.0.`,
		),
		await note(
			"mdi:chart-bar",
			"Comparativa total de tokens de instrucción (v1.0 vs Ultra):" + ticketImg("tk1431666-tokens-totales.png"),
		),
		await note(
			"mdi:chart-bar",
			"Comparativa por tipo de consulta:" + ticketImg("tk1431666-tokens-por-tipo.png"),
		),
		await note("mdi:table", "Detalle por tipo:" + tablaMetricas + totalesRow),
	);

	const solucion = noteList(
		await note(
			"mdi:merge",
			"Se generó <code>seed-prompts-ultra-tdconsulta.sql</code> con <code>build-paty-prompts-ultra-sql.mjs</code> y se ejecutó en staging. Patrón MERGE por tipo:" +
			(await codeBlock(SQL_MERGE_PATRON, "sql")),
		),
		await note(
			"mdi:shield-check-outline",
			"El lote quedó idempotente con <code>SET XACT_ABORT ON</code> y transacción explícita: re-ejecutar actualiza texto y <code>version</code> sin duplicar filas.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"Tras la ejecución, el <code>SELECT</code> de verificación devolvió 13 filas con <code>version = 2.0-ultra</code> y <code>LEN(instruccion)</code> inferior al de la carga inicial.",
		),
		await note(
			"mdi:check-bold",
			"En runtime, las instrucciones compactas se siguieron inyectando vía <code>prompt.variables.instrucciones_tipo</code> sin alterar el prompt general.",
		),
	);

	return intro + h3Solicitud + solicitud + h3Metricas + metricas + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431666: Promise<string> = buildBodyTK1431666();
