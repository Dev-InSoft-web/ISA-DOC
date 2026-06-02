/**
 * Convención ISA-DOC: flowcharts con aristas ortogonales (ángulos rectos), sin curvas.
 * Aplica a mermaid.ink (tickets/email) y a `ensureMermaid()` en el visor.
 */

/** Curva Mermaid: escalones con esquinas a 90° (`basis` / `linear` quedan fuera). */
export const MERMAID_FLOWCHART_CURVE = "stepAfter" as const;

const FLOWCHART_INIT_DIRECTIVE =
	`%%{init: {"flowchart": {"curve": "${MERMAID_FLOWCHART_CURVE}", "htmlLabels": true}}}%%`;

/** Opciones para `mermaid.initialize({ flowchart: … })`. */
export const MERMAID_INITIALIZE_FLOWCHART = {
	curve: MERMAID_FLOWCHART_CURVE,
	htmlLabels: true,
	useMaxWidth: true,
} as const;

/**
 * Antepone `%%{init:…}%%` a flowcharts que aún no lo traen (p. ej. mermaid.ink).
 * No altera `erDiagram`, secuencias ni diagramas con init explícito.
 */
export function prepareMermaidDiagram(diagram: string): string {
	const trimmed = diagram.trim();
	if (/^%%\{init:/i.test(trimmed)) return trimmed;
	if (!/^(flowchart|graph)\s/im.test(trimmed)) return trimmed;
	return `${FLOWCHART_INIT_DIRECTIVE}\n${trimmed}`;
}
