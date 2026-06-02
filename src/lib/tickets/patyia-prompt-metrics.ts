// Métricas prompts Base (PROMPT_<TIPO>.md) vs Ultra — tokenizer gpt-5 (o200k_base).
// Regenerar: npm run patyia:prompts:metrics

import { promptUltraRel } from "../patyia/prompt-files";

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
	{ tipo: "SALUDO_OTRO", orig: 4116, origTok: 873, ultra: 1939, ultraTok: 435 },
	{ tipo: "FUERA_DE_ALCANCE_TECNICO", orig: 6209, origTok: 1243, ultra: 3890, ultraTok: 817 },
	{ tipo: "SOLICITUD_NO_PERMITIDA", orig: 5732, origTok: 1215, ultra: 2665, ultraTok: 599 },
	{ tipo: "REQUIERE_CONTEXTO", orig: 7495, origTok: 1580, ultra: 4625, ultraTok: 1041 },
	{ tipo: "PASO_A_PASO", orig: 11999, origTok: 2564, ultra: 7159, ultraTok: 1701 },
	{ tipo: "INTERPRETACION_RESULTADO", orig: 10646, origTok: 2157, ultra: 6140, ultraTok: 1330 },
	{ tipo: "CONSULTA_NORMATIVA_NEGOCIO", orig: 7467, origTok: 1528, ultra: 4309, ultraTok: 933 },
	{ tipo: "ASESORIA_PERSONALIZADA", orig: 10640, origTok: 2133, ultra: 5669, ultraTok: 1208 },
	{ tipo: "ERROR_TECNICO", orig: 6713, origTok: 1420, ultra: 3494, ultraTok: 803 },
	{ tipo: "ERROR_CONFIGURACION", orig: 11393, origTok: 2286, ultra: 6133, ultraTok: 1288 },
	{ tipo: "ERROR_ACCESO", orig: 10201, origTok: 2222, ultra: 5160, ultraTok: 1204 },
	{ tipo: "ERROR_DIAN", orig: 9911, origTok: 2081, ultra: 5427, ultraTok: 1236 },
	{ tipo: "COMERCIAL", orig: 10690, origTok: 2218, ultra: 4839, ultraTok: 1098 },
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
				label: "Tokens (gpt-5 tokenizer)",
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
					text: `gpt-tokenizer/gpt-5 · ${t.origTok.toLocaleString()} → ${t.ultraTok.toLocaleString()} tokens · ${t.origChars.toLocaleString()} → ${t.ultraChars.toLocaleString()} caracteres`,
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
				title: { display: true, text: "Tokens de instrucción por tipo (PROMPT_<TIPO>.md)", font: { size: 14 } },
				legend: { position: "top" },
			},
			scales: {
				x: { ticks: { maxRotation: 45, minRotation: 45, font: { size: 9 } } },
				y: { beginAtZero: true, title: { display: true, text: "Tokens" } },
			},
		},
	};
}
