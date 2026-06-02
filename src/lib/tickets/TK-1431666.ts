// TK-1431666 — Instrucciones compactas Ultra en BD (MERGE idempotente).

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import {
	PROMPT_LEN_METRICS,
	ULTRA_WARN_ROW_BG,
	isLowUltraReduction,
	lowUltraReductionRows,
	promptMetricsTotals,
	reductionPct,
	ultraMdPath,
} from "./patyia-prompt-metrics";
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
			"Se reemplazó el contenido de <code>INSTRUCCION.instruccion</code> para los 13 tipos activos, tomando como fuente <code>prompts/Ultra/PROMPT_&lt;TIPO&gt;.md</code> (par con <code>prompts/PROMPT_&lt;TIPO&gt;.md</code> Base).",
		),
		await note(
			"mdi:database-edit-outline",
			"Se mantuvo el enlace en <code>TDCONSULTAXINSTRUCCION</code> con <code>orden = 1</code> sin duplicar relaciones.",
		),
	);

	const metricasFilas = PROMPT_LEN_METRICS.map((r) => {
		const pct = reductionPct(r.origTok, r.ultraTok);
		const pctLabel = pct < 0 ? `<span style="color:#b71c1c;">${pct}%</span>` : `${pct}%`;
		return [
			`<code>${r.tipo}</code>`,
			String(r.origTok),
			String(r.ultraTok),
			pctLabel,
		];
	});

	const metricasRowBg = PROMPT_LEN_METRICS.map((r) => (isLowUltraReduction(r) ? ULTRA_WARN_ROW_BG : ""));

	const tablaMetricas = simpleTable(
		["IINSTRUCCION", "Tokens Base", "Tokens Ultra", "Reducción"],
		metricasFilas,
		{ widths: ["34%", "18%", "18%", "12%"], rowBackgrounds: metricasRowBg },
	);

	const bajas = lowUltraReductionRows();
	const listaMdBajas = bajas
		.map((r) => `<code>${ultraMdPath(r.tipo)}</code> (${reductionPct(r.origTok, r.ultraTok)}%)`)
		.join(", ");

	const totalesRow = simpleTable(
		["Agregado (13 tipos)", "Caracteres", "Tokens (gpt-5)", "Reducción tok."],
		[[
			"Total",
			`${totals.origChars.toLocaleString()} → ${totals.ultraChars.toLocaleString()}`,
			`${totals.origTok.toLocaleString()} → ${totals.ultraTok.toLocaleString()}`,
			`<b>${totals.pctTok}%</b>`,
		]],
	);

	const metricas = noteList(
		await note(
			"mdi:information-outline",
			`Se midieron tokens con <code>gpt-tokenizer</code> (modelo <code>gpt-5</code>, encoding <code>o200k_base</code>) sobre <code>PROMPT_&lt;TIPO&gt;.md</code>. La reducción agregada en tokens fue <b>${totals.pctTok}%</b> (${totals.pctChars}% en caracteres).`,
		),
		await note(
			"mdi:chart-bar",
			"Se registró la comparativa total de tokens de instrucción (Base vs Ultra):" + ticketImg("tk1431666-tokens-totales.png"),
		),
		await note(
			"mdi:chart-bar",
			"Se registró la comparativa por tipo de consulta:" + ticketImg("tk1431666-tokens-por-tipo.png"),
		),
		await note("mdi:table", "Detalle por tipo (filas en rosado: reducción inferior al 15%):" + tablaMetricas + totalesRow),
		...(bajas.length
			? [
					await note(
						"mdi:alert-outline",
						`Los tipos con reducción menor al 15% quedaron resaltados en la tabla. En esos casos el texto Ultra no se compactó de forma suficiente ` +
							`y se recomendó revisar la aplicación del enfoque <b>caveman</b> o la instalación de la skill de compresión, porque dejó textos casi iguales a Base. ` +
							`Archivos señalados: ${listaMdBajas}.`,
					),
				]
			: []),
	);

	const solucion = noteList(
		await note(
			"mdi:merge",
			"Se generó el lote desde prompts/Ultra y se ejecutó en staging; patrón MERGE por tipo (actualizaba texto y versión sin duplicar filas):" +
				(await codeBlock(SQL_MERGE_PATRON, "sql")),
		),
		await note(
			"mdi:shield-check-outline",
			"El lote quedó idempotente con <code>SET XACT_ABORT ON</code> y transacción explícita: al re-ejecutarlo se actualizaban texto y <code>version</code> sin duplicar filas.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"Tras la ejecución, el <code>SELECT</code> de verificación devolvió 13 filas con <code>version = 2.0-ultra</code> y <code>LEN(instruccion)</code> inferior al de la carga inicial.",
		),
		await note(
			"mdi:check-bold",
			"En runtime, las instrucciones compactas se siguieron inyectando vía <code>prompt.variables.instrucion_tipo</code> sin alterar el prompt general.",
		),
	);

	return intro + h3Solicitud + solicitud + h3Metricas + metricas + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431666: Promise<string> = buildBodyTK1431666();
