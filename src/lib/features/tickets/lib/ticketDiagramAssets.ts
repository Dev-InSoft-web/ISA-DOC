/**
 * Diagramas de tickets publicados en imgbb (PG). Los builders emiten `$filename$`;
 * `getTicketHtml` los resuelve vía `resolveAssetPlaceholders`.
 */

import { assetRef } from "./resolveAssetPlaceholders";

export function diagramCapasOpenai(): string {
	return assetRef("tk1431163-capas-openai.png");
}

/** Secuencia TK-1431662 (Mermaid → imgbb). */
export function diagramFasesModelo(): string {
	return assetRef("tk1431662-fases-modelo.png");
}

export function chartTokensTotales(): string {
	return assetRef("tk1431666-tokens-totales.png");
}

export function chartTokensPorTipo(): string {
	return assetRef("tk1431666-tokens-por-tipo.png");
}
