// Métricas prompts Base (PROMPT_<TIPO>.md) vs Ultra — conteo alineado al modelo de respuesta.
// Regenerar: npm run patyia:prompts:metrics

import { promptUltraRel } from "../patyia/050-prompts/prompt-files";

export const ULTRA_LOW_REDUCTION_PCT = 15;
export const ULTRA_WARN_ROW_BG = "#fde2e8";

export type PromptLenRow = { tipo: string; orig: number; ultra: number; origTok: number; ultraTok: number };

export function ultraMdPath(tipo: string): string {
	return promptUltraRel(tipo);
}

export function reductionPct(orig: number, ultra: number): number {
	if (orig <= 0) return 0;
	return Math.round((1000 * (1 - ultra / orig)) / 10);
}

export function isLowUltraReduction(row: PromptLenRow): boolean {
	return reductionPct(row.origTok, row.ultraTok) < ULTRA_LOW_REDUCTION_PCT;
}

export function lowUltraReductionRows(): PromptLenRow[] {
	return PROMPT_LEN_METRICS.filter(isLowUltraReduction);
}

export const PROMPT_LEN_METRICS: PromptLenRow[] = [
	{ tipo: "SALUDO_OTRO", orig: 4116, origTok: 873, ultra: 1999, ultraTok: 447 },
	{ tipo: "FUERA_DE_ALCANCE_TECNICO", orig: 6209, origTok: 1243, ultra: 3910, ultraTok: 822 },
	{ tipo: "SOLICITUD_NO_PERMITIDA", orig: 5732, origTok: 1215, ultra: 2685, ultraTok: 604 },
	{ tipo: "REQUIERE_CONTEXTO", orig: 7495, origTok: 1580, ultra: 4645, ultraTok: 1046 },
	{ tipo: "PASO_A_PASO", orig: 11999, origTok: 2564, ultra: 7219, ultraTok: 1713 },
	{ tipo: "INTERPRETACION_RESULTADO", orig: 10646, origTok: 2157, ultra: 6200, ultraTok: 1342 },
	{ tipo: "CONSULTA_NORMATIVA_NEGOCIO", orig: 7467, origTok: 1528, ultra: 4329, ultraTok: 935 },
	{ tipo: "ASESORIA_PERSONALIZADA", orig: 10640, origTok: 2133, ultra: 5730, ultraTok: 1223 },
	{ tipo: "ERROR_TECNICO", orig: 6713, origTok: 1420, ultra: 3514, ultraTok: 808 },
	{ tipo: "ERROR_CONFIGURACION", orig: 11393, origTok: 2286, ultra: 6193, ultraTok: 1303 },
	{ tipo: "ERROR_ACCESO", orig: 10201, origTok: 2222, ultra: 5220, ultraTok: 1219 },
	{ tipo: "ERROR_DIAN", orig: 9911, origTok: 2081, ultra: 5487, ultraTok: 1251 },
	{ tipo: "COMERCIAL", orig: 10690, origTok: 2218, ultra: 4900, ultraTok: 1112 },
];

/** @deprecated Usar origTok/ultraTok de PROMPT_LEN_METRICS. */
export function approxTokens(chars: number): number {
	return Math.round(chars / 4);
}

export function promptMetricsTotals(): {
	origChars: number;
	ultraChars: number;
	origTok: number;
	ultraTok: number;
	pctChars: number;
	pctTok: number;
} {
	const origChars = PROMPT_LEN_METRICS.reduce((s, r) => s + r.orig, 0);
	const ultraChars = PROMPT_LEN_METRICS.reduce((s, r) => s + r.ultra, 0);
	const origTok = PROMPT_LEN_METRICS.reduce((s, r) => s + r.origTok, 0);
	const ultraTok = PROMPT_LEN_METRICS.reduce((s, r) => s + r.ultraTok, 0);
	const pctChars = origChars > 0 ? Math.round((1000 * (1 - ultraChars / origChars)) / 10) : 0;
	const pctTok = origTok > 0 ? Math.round((1000 * (1 - ultraTok / origTok)) / 10) : 0;
	return { origChars, ultraChars, origTok, ultraTok, pctChars, pctTok };
}

/** Gráfico de barras: totales Base vs Ultra (QuickChart). */
export function ultraTotalsBarChartConfig(): Record<string, unknown> {
	const t = promptMetricsTotals();
	return {
		type: "bar",
		data: {
			labels: ["Instrucciones Base (13 tipos)", "Ultra"],
			datasets: [{
				label: "Tokens de instrucción",
				data: [t.origTok, t.ultraTok],
				backgroundColor: ["#4472C4", "#70AD47"],
			}],
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: `Reducción ${t.pctTok}% en tokens de instrucción reinyectada por turno`,
					font: { size: 14 },
				},
				subtitle: {
					display: true,
					text: `${t.origTok.toLocaleString()} → ${t.ultraTok.toLocaleString()} tokens · ${t.origChars.toLocaleString()} → ${t.ultraChars.toLocaleString()} caracteres`,
				},
				datalabels: { display: true, anchor: "end", align: "top" },
			},
			scales: { y: { beginAtZero: true, title: { display: true, text: "Tokens" } } },
		},
	};
}

/** Gráfico de barras agrupadas por tipo de consulta. */
export function ultraByTypeBarChartConfig(): Record<string, unknown> {
	const labels = PROMPT_LEN_METRICS.map((r) => r.tipo.replace(/_/g, " ").slice(0, 12));
	return {
		type: "bar",
		data: {
			labels,
			datasets: [
				{
					label: "Base (tokens)",
					data: PROMPT_LEN_METRICS.map((r) => r.origTok),
					backgroundColor: "#4472C4",
				},
				{
					label: "Ultra (tokens)",
					data: PROMPT_LEN_METRICS.map((r) => r.ultraTok),
					backgroundColor: "#70AD47",
				},
			],
		},
		options: {
			plugins: {
				title: { display: true, text: "Tokens de instrucción por tipo de consulta", font: { size: 14 } },
				legend: { position: "top" },
			},
			scales: {
				x: { ticks: { maxRotation: 45, minRotation: 45, font: { size: 9 } } },
				y: { beginAtZero: true, title: { display: true, text: "Tokens" } },
			},
		},
	};
}
