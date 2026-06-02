/**
 * Chart.js (QuickChart) + Graphviz: renderiza el gráfico con Chart.js y lo incrusta
 * en un marco DOT transparente (padding, subtítulo opcional).
 */

/** Ruta para atributo image= (Graphviz en Windows acepta barras normales). */
export function dotImagePath(absPath) {
	return absPath.replace(/\\/g, "/");
}

/**
 * Marco DOT mínimo: solo incrusta el PNG de Chart.js (título/leyenda ya van en el chart).
 * @param {string} graphId
 * @param {string} imagePath absoluto al PNG del chart
 */
export function chartFrameDot(graphId, imagePath) {
	const imgIn = dotImagePath(imagePath);
	return [
		`// Chart.js (QuickChart) + Graphviz image node · ${graphId}`,
		`digraph ${graphId} {`,
		`	graph [bgcolor=transparent, pad=0.35, margin=0.15]`,
		`	chart [shape=none, label="", image="${imgIn}", imagescale=true]`,
		`}`,
	].join("\n");
}
