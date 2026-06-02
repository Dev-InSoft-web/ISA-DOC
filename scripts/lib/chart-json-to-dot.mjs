/**
 * Convierte Chart.js bar (JSON) a DOT con estilo INSOFT para Graphviz.
 * Colores con alpha (#RRGGBBAA) para fondo claro/oscuro.
 */

import {
	ALPHA,
	BAR_GRAPH_ATTRS,
	BAR_NODE_ATTRS,
	COLORS,
	barFillColor,
	plaintextMuted,
	titleNodeAttrs,
	withAlpha,
} from "./graphviz-ticket-style.mjs";

const MAX_BAR_IN = 2.5;

function esc(s) {
	return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function barWidth(value, maxVal) {
	return Math.max(0.12, (value / maxVal) * MAX_BAR_IN).toFixed(3);
}

/**
 * @param {object} chart Chart.js config
 * @param {string} graphId nombre del digraph
 */
export function barChartJsonToDot(chart, graphId) {
	const labels = chart.data?.labels ?? [];
	const datasets = chart.data?.datasets ?? [];
	const title =
		chart.options?.plugins?.title?.text ??
		chart.options?.plugins?.subtitle?.text ??
		"";

	const allValues = datasets.flatMap((d) => d.data ?? []);
	const maxVal = Math.max(1, ...allValues);

	const lines = [
		`// Generado desde Chart.js · ${graphId}`,
		`digraph ${graphId} {`,
		BAR_GRAPH_ATTRS,
		BAR_NODE_ATTRS,
	];

	if (title) {
		lines.push(`\t${titleNodeAttrs(esc(title))}`);
	}

	const colors = [COLORS.grayBar, COLORS.blue];
	const isGrouped = datasets.length > 1 && labels.length > 2;

	if (!isGrouped && datasets.length === 1) {
		const ds = datasets[0];
		const color = ds.backgroundColor?.[0] ?? ds.backgroundColor ?? colors[0];
		lines.push(`\t{ rank=same; ${labels.map((_, i) => `b${i}`).join("; ")}; }`);
		labels.forEach((lab, i) => {
			const v = ds.data[i] ?? 0;
			const c = Array.isArray(ds.backgroundColor) ? ds.backgroundColor[i] : color;
			lines.push(
				`\tb${i} [label="${esc(lab)}\\n${v.toLocaleString("es-CO")}", width=${barWidth(v, maxVal)}, fillcolor="${barFillColor(c)}"]`,
			);
		});
	} else {
		labels.forEach((lab, i) => {
			const ids = datasets.map((_, di) => `t${i}_d${di}`);
			lines.push(`\t{ rank=same; ${ids.join("; ")}; }`);
			datasets.forEach((ds, di) => {
				const v = ds.data[i] ?? 0;
				const c = Array.isArray(ds.backgroundColor)
					? ds.backgroundColor[i]
					: ds.backgroundColor ?? colors[di % colors.length];
				const dsLabel = ds.label ? `${ds.label}\\n` : "";
				lines.push(
					`\tt${i}_d${di} [label="${esc(lab)}\\n${dsLabel}${v.toLocaleString("es-CO")}", width=${barWidth(v, maxVal)}, fillcolor="${barFillColor(c)}"]`,
				);
			});
		});
	}

	if (datasets.length > 1) {
		const leg = datasets
			.map((ds, i) => {
				const c = Array.isArray(ds.backgroundColor)
					? ds.backgroundColor[0]
					: ds.backgroundColor ?? colors[i % colors.length];
				return `${ds.label ?? `Serie ${i + 1}`} (${c})`;
			})
			.join("   ·   ");
		lines.push(
			`\tlegend ${plaintextMuted(esc(leg))}`,
		);
	}

	const yTitle = chart.options?.scales?.y?.title?.text;
	if (yTitle) {
		lines.push(`\taxis_y ${plaintextMuted(esc(yTitle))}`);
	}

	lines.push("}");
	return lines.join("\n");
}
