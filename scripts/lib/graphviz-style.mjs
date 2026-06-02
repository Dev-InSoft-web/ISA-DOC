/**
 * Estilo INSOFT para diagramas DOT (Graphviz).
 * Fondo transparente, texto/bordes gris, acentos dodgerblue, aristas ortogonales.
 */

export const GV_GRAPH_ATTRS = {
	bgcolor: "transparent",
	splines: "ortho",
	pad: "0.45",
	nodesep: "0.4",
	ranksep: "0.55",
	fontname: "Segoe UI",
	fontsize: "10",
};

export const GV_NODE_ATTRS = {
	shape: "box",
	style: "rounded",
	color: "#808080",
	fontcolor: "#505050",
	fillcolor: "transparent",
	penwidth: "1.1",
	fontname: "Segoe UI",
	fontsize: "10",
};

export const GV_EDGE_ATTRS = {
	color: "#1E90FF",
	fontcolor: "#696969",
	fontsize: "9",
	arrowsize: "0.75",
	penwidth: "1.1",
	fontname: "Segoe UI",
};

export const GV_CLUSTER_ATTRS = {
	color: "#1E90FF",
	fontcolor: "#1E90FF",
	style: "rounded",
	fillcolor: "transparent",
	penwidth: "1.2",
	fontname: "Segoe UI",
	fontsize: "10",
	labeljust: "l",
};

/** Convierte objeto de atributos a línea DOT `a=b, c=d`. */
export function dotAttrLine(attrs) {
	return Object.entries(attrs)
		.map(([k, v]) => `${k}=${typeof v === "string" && !v.startsWith('"') ? `"${v}"` : v}`)
		.join(", ");
}
