/**
 * Diagramas de tickets en el visor (modal): imgbb para diagramas publicados; quickchart en vivo.
 */

import fasesModeloMmd from "../assets/patyia/05/29/TK-1431662/tk1431662-fases-modelo.mmd?raw";
import tokensTotalesChart from "../assets/patyia/05/29/TK-1431666/tk1431666-tokens-totales.chart.json";
import tokensPorTipoChart from "../assets/patyia/05/29/TK-1431666/tk1431666-tokens-por-tipo.chart.json";
import { chartImg, mermaidImg, ticketImg } from "./snippets";

type ChartConfig = Record<string, unknown>;

export function diagramCapasOpenai(): string {
	return ticketImg("tk1431163-capas-openai.png");
}

/** Secuencia TK-1431662 (Mermaid sequenceDiagram). */
export function diagramFasesModelo(): string {
	return mermaidImg(fasesModeloMmd, { width: 720, height: 520, fullWidth: false });
}

export function chartTokensTotales(): string {
	return chartImg(tokensTotalesChart as ChartConfig, 920, 520, "datalabels");
}

export function chartTokensPorTipo(): string {
	return chartImg(tokensPorTipoChart as ChartConfig, 1000, 720, "datalabels");
}
