/**
 * Estilo INSOFT para diagramas de tickets (Graphviz).
 * Colores con canal alpha (#RRGGBBAA) para verse bien en fondo claro u oscuro.
 * @see https://graphviz.org/Gallery/neato/transparency.html
 */

/** #RRGGBB + sufijo AA (00–FF). */
export function withAlpha(hex6, alphaHex) {
	const h = hex6.replace(/^#/, "");
	if (h.length !== 6) throw new Error(`color inválido: ${hex6}`);
	return `#${h}${alphaHex}`;
}

export const COLORS = {
	blue: "#1E90FF",
	gray: "#808080",
	grayBar: "#9E9E9E",
	text: "#3A3A3A",
	textMuted: "#5C5C5C",
};

export const ALPHA = {
	fillNeutral: "1A",
	fillAccent: "28",
	fillBarGray: "55",
	fillBarBlue: "60",
	border: "B3",
	borderAccent: "AA",
	edge: "C8",
	edgeMuted: "99",
	text: "E6",
	textMuted: "BF",
	title: "D9",
};

/** Bloques DOT para diagramas de flujo / secuencia (pegados en .dot). */
export const FLOW_GRAPH_ATTRS = `graph [
		bgcolor=transparent
		splines=polyline
		pad=0.55
		sep="+22,18"
		nodesep=0.5
		ranksep=0.7
		fontname="Segoe UI"
		fontsize=10
	]`;

export const FLOW_NODE_ATTRS = `node [
		shape=box
		style="rounded,filled"
		margin="0.32,0.16"
		fillcolor="${withAlpha(COLORS.gray, ALPHA.fillNeutral)}"
		color="${withAlpha(COLORS.gray, ALPHA.border)}"
		fontcolor="${withAlpha(COLORS.text, ALPHA.text)}"
		penwidth=1.15
	]`;

export const FLOW_EDGE_ATTRS = `edge [
		color="${withAlpha(COLORS.blue, ALPHA.edge)}"
		fontcolor="${withAlpha(COLORS.textMuted, ALPHA.textMuted)}"
		fontsize=9
		arrowsize=0.65
		penwidth=1.15
		tailclip=true
		headclip=true
	]`;

export const RECORD_NODE_ATTRS = `node [
		shape=record
		style="rounded,filled"
		margin="0.28,0.14"
		fillcolor="${withAlpha(COLORS.gray, ALPHA.fillNeutral)}"
		color="${withAlpha(COLORS.gray, ALPHA.border)}"
		fontcolor="${withAlpha(COLORS.text, ALPHA.text)}"
		penwidth=1.2
	]`;

export const RECORD_EDGE_ATTRS = `edge [
		color="${withAlpha(COLORS.blue, ALPHA.edge)}"
		arrowsize=0.65
		penwidth=1.15
		tailclip=true
		headclip=true
	]`;

export const BAR_GRAPH_ATTRS = `graph [
		bgcolor=transparent
		splines=none
		pad=0.55
		sep="+12,10"
		nodesep=0.18
		ranksep=0.4
		fontname="Segoe UI"
		fontsize=10
		rankdir=LR
	]`;

export const BAR_NODE_ATTRS = `node [
		shape=box
		style="filled,rounded"
		fixedsize=true
		height=0.44
		margin="0.22,0.11"
		color="${withAlpha(COLORS.gray, ALPHA.border)}"
		fontcolor="${withAlpha(COLORS.text, ALPHA.text)}"
		fontsize=8
	]`;

export function barFillColor(hex6) {
	if (hex6 === COLORS.blue || hex6 === "#1E90FF") {
		return withAlpha(COLORS.blue, ALPHA.fillBarBlue);
	}
	if (hex6 === COLORS.grayBar || hex6 === "#9E9E9E") {
		return withAlpha(COLORS.grayBar, ALPHA.fillBarGray);
	}
	return withAlpha(hex6.replace(/^#/, "").length === 6 ? hex6 : COLORS.gray, ALPHA.fillBarGray);
}

export function titleNodeAttrs(label) {
	return `title [shape=plaintext, label="${label}", fontcolor="${withAlpha(COLORS.blue, ALPHA.title)}", fontsize=11]`;
}

export function plaintextMuted(label, fontsize = 9) {
	return `[shape=plaintext, label="${label}", fontcolor="${withAlpha(COLORS.gray, ALPHA.textMuted)}", fontsize=${fontsize}]`;
}
