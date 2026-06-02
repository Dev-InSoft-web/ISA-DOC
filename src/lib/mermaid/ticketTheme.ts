/**
 * Tema Mermaid para tickets INSOFT: lienzo transparente; nodos y subgrafos con relleno
 * semitransparente (#RRGGBBAA). Alineado con graphviz-ticket-style.mjs.
 */
import { MERMAID_FLOWCHART_CURVE } from "./config";

export const MERMAID_TICKET_THEME_VARIABLES = {
	background: "transparent",
	clusterBkg: "#8080801A",
	clusterBorder: "#808080B3",
	primaryColor: "#8080801A",
	primaryBorderColor: "#808080B3",
	secondaryColor: "#1E90FF28",
	secondaryBorderColor: "#1E90FFAA",
	tertiaryColor: "#8080801A",
	tertiaryBorderColor: "#808080B3",
	lineColor: "#1E90FFC8",
	primaryTextColor: "#3A3A3AE6",
	secondaryTextColor: "#5C5C5CBF",
	noteBkgColor: "#8080801A",
	noteBorderColor: "#808080B3",
} as const;

/** Bloque `%%{init:…}%%` para diagramas de tickets (flowchart). */
export function mermaidTicketInitDirective(): string {
	const init = {
		theme: "base",
		themeVariables: MERMAID_TICKET_THEME_VARIABLES,
		flowchart: {
			curve: MERMAID_FLOWCHART_CURVE,
			htmlLabels: true,
			nodeSpacing: 44,
			rankSpacing: 52,
			padding: 18,
		},
	};
	return `%%{init: ${JSON.stringify(init)}}%%`;
}
