// TK-1431666 — Instrucciones compactas Ultra en BD (MERGE idempotente).

import { simpleTable, ticketImg } from "../../../../lib/snippets";
import { chartTokensPorTipo, chartTokensTotales } from "../../../../lib/ticketDiagramAssets";
import { PROMPT_LEN_METRICS, promptMetricsTotals, reductionPct } from "../../../../lib/patyia-prompt-metrics";
import { h3Iconized, note, noteList } from "../../../../lib/tk-helpers";

const intro =
	`<div>En el motor <b>Paty IA</b> se actualizaron en <b>AYUDASCP_IA</b> las instrucciones por tipo con la versión compacta ` +
	`<b>Ultra</b>, con ejemplos que usan <code>{{nombre_usuario}}</code> y placeholders similares ` +
	`(resueltos en runtime antes de <code>instrucion_tipo</code>). La versión Base ampliada se conservó como referencia de mantenimiento.</div>`;

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
			"Se reemplazó <code>INSTRUCCION.instruccion</code> para los 13 tipos con textos Ultra compactos; los ejemplos quedaron con <code>{{nombre_usuario}}</code> en lugar de nombres literales (par con Base por tipo).",
		),
		await note(
			"mdi:database-edit-outline",
			"Se mantuvo el enlace en <code>TDCONSULTAXINSTRUCCION</code> con <code>orden = 1</code> sin duplicar relaciones.",
		),
	);

	const metricasFilas = PROMPT_LEN_METRICS.map((r) => {
		const pct = reductionPct(r.origTok, r.ultraTok);
		const pctLabel = pct < 0 ? `<span style="color:#b71c1c;">${pct}%</span>` : `${pct}%`;
		return [`<code>${r.tipo}</code>`, String(r.origTok), String(r.ultraTok), pctLabel];
	});

	const tablaMetricas = simpleTable(
		["IINSTRUCCION", "Tokens Base", "Tokens Ultra", "Reducción"],
		metricasFilas,
		{ widths: ["34%", "18%", "18%", "12%"] },
	);

	const totalesRow = simpleTable(
		["Agregado (13 tipos)", "Caracteres", "Tokens", "Reducción"],
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
			`Se comparó el volumen de instrucción Base frente a Ultra (mismo criterio de conteo que el modelo de respuesta). ` +
				`La reducción agregada fue <b>${totals.pctTok}%</b> en tokens y <b>${totals.pctChars}%</b> en caracteres.`,
		),
		await note(
			"mdi:chart-bar",
			"Se registró la comparativa total de tokens de instrucción (Base vs Ultra):" + chartTokensTotales(),
		),
		await note(
			"mdi:chart-bar",
			"Se registró la comparativa por tipo de consulta:" + chartTokensPorTipo(),
		),
		await note("mdi:table", "Detalle por tipo:" + tablaMetricas + totalesRow),
	);

	const solucion = noteList(
		await note(
			"mdi:merge",
			"Se desplegó en la BD del motor Paty IA (staging) el lote MERGE por tipo — textos Ultra sin duplicar filas (SQL en <i>Cambios en base de datos</i>):" +
				ticketImg("tk1431666-carga-ultra.png"),
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"Tras el despliegue en staging quedaron las 13 instrucciones activas con texto Ultra, verificado en la BD del motor.",
		),
		await note(
			"mdi:check-bold",
			"En runtime, las instrucciones compactas se siguieron inyectando vía <code>prompt.variables.instrucion_tipo</code> sin alterar el prompt general.",
		),
	);

	return intro + h3Solicitud + solicitud + h3Metricas + metricas + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431666: Promise<string> = buildBodyTK1431666();
