/**
 * Diagramas de tickets en el visor (modal): imgbb para Mermaid publicado; quickchart en vivo.
 */

import fasesModeloMmd from "./assets/TK-1431662/tk1431662-fases-modelo.mmd?raw";
import tokensTotalesChart from "./assets/TK-1431666/tk1431666-tokens-totales.chart.json";
import tokensPorTipoChart from "./assets/TK-1431666/tk1431666-tokens-por-tipo.chart.json";
import { chartImg, mermaidImg, ticketImg } from "./snippets";

type ChartConfig = Record<string, unknown>;

export function diagramCapasOpenai(): string {
	return ticketImg("tk1431163-capas-openai.png");
}

export function diagramFasesModelo(): string {
	return mermaidImg(fasesModeloMmd, { width: 1080, height: 640, fullWidth: true });
}

export function chartTokensTotales(): string {
	return chartImg(tokensTotalesChart as ChartConfig, 920, 520, "datalabels");
}

export function chartTokensPorTipo(): string {
	return chartImg(tokensPorTipoChart as ChartConfig, 1000, 720, "datalabels");
}
