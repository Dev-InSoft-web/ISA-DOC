// Métricas LEN(instrucción) prompts v1.0 (raíz) vs Ultra 2.0-ultra — junio 2026.
// Tokens aproximados = caracteres / 4 (referencia para costo de entrada por turno).

export type PromptLenRow = { tipo: string; orig: number; ultra: number };

export const PROMPT_LEN_METRICS: PromptLenRow[] = [
	{ tipo: "SALUDO_OTRO", orig: 4007, ultra: 2011 },
	{ tipo: "FUERA_DE_ALCANCE_TECNICO", orig: 4492, ultra: 4058 },
	{ tipo: "SOLICITUD_NO_PERMITIDA", orig: 4213, ultra: 2750 },
	{ tipo: "REQUIERE_CONTEXTO", orig: 5990, ultra: 4806 },
	{ tipo: "PASO_A_PASO", orig: 10330, ultra: 7390 },
	{ tipo: "INTERPRETACION_RESULTADO", orig: 7958, ultra: 6357 },
	{ tipo: "CONSULTA_NORMATIVA_NEGOCIO", orig: 5582, ultra: 4456 },
	{ tipo: "ASESORIA_PERSONALIZADA", orig: 9090, ultra: 5842 },
	{ tipo: "ERROR_TECNICO", orig: 3562, ultra: 3607 },
	{ tipo: "ERROR_CONFIGURACION", orig: 9526, ultra: 6361 },
	{ tipo: "ERROR_ACCESO", orig: 8328, ultra: 5359 },
	{ tipo: "ERROR_DIAN", orig: 8067, ultra: 5614 },
	{ tipo: "COMERCIAL", orig: 7217, ultra: 5020 },
];

export function approxTokens(chars: number): number {
	return Math.round(chars / 4);
}

export function promptMetricsTotals(): { origChars: number; ultraChars: number; origTok: number; ultraTok: number; pct: number } {
	const origChars = PROMPT_LEN_METRICS.reduce((s, r) => s + r.orig, 0);
	const ultraChars = PROMPT_LEN_METRICS.reduce((s, r) => s + r.ultra, 0);
	const origTok = approxTokens(origChars);
	const ultraTok = approxTokens(ultraChars);
	const pct = origChars > 0 ? Math.round((1000 * (1 - ultraChars / origChars)) / 10) : 0;
	return { origChars, ultraChars, origTok, ultraTok, pct };
}

/** Gráfico de barras: totales v1.0 vs Ultra (QuickChart). */
export function ultraTotalsBarChartConfig(): Record<string, unknown> {
	const t = promptMetricsTotals();
	return {
		type: "bar",
		data: {
			labels: ["Instrucciones v1.0 (13 tipos)", "Ultra 2.0-ultra"],
			datasets: [{
				label: "Tokens de entrada aprox.",
				data: [t.origTok, t.ultraTok],
				backgroundColor: ["#4472C4", "#70AD47"],
			}],
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: `Reducción ${t.pct}% en tokens de instrucción reinyectada por turno`,
					font: { size: 14 },
				},
				subtitle: {
					display: true,
					text: `Estimación tokens ≈ LEN(texto)/4 · ${t.origChars.toLocaleString()} → ${t.ultraChars.toLocaleString()} caracteres`,
				},
				datalabels: {
					display: true,
					anchor: "end",
					align: "top",
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					title: { display: true, text: "Tokens aprox." },
				},
			},
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
					label: "v1.0 (tokens aprox.)",
					data: PROMPT_LEN_METRICS.map((r) => approxTokens(r.orig)),
					backgroundColor: "#4472C4",
				},
				{
					label: "Ultra 2.0 (tokens aprox.)",
					data: PROMPT_LEN_METRICS.map((r) => approxTokens(r.ultra)),
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
				y: { beginAtZero: true, title: { display: true, text: "Tokens aprox." } },
			},
		},
	};
}
