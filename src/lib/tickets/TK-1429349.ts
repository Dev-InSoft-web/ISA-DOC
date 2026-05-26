// TK-1429349 — Modificación de controladores de server.
// Solicitud del ingeniero Pedro para desacoplar helpers dinámicos de los
// controladores y unificar el patrón de diseño SQL explícito.

import { h3Iconized, note, noteList } from "./tk-helpers";
import { simpleTable } from "./snippets";

const intro =
	`<div>De acuerdo a la solicitud realizada por el ingeniero <b>Pedro</b>,  
	se intervienen los <b>controladores de server</b> de capacitación para  
	desacoplar helpers dinámicos y replicar el patrón de diseño explícito  
	que ya tienen los demás controladores. El código previo al ajuste quedó  
	conservado como referencia en  
	<code>ISP-CLientesISServer/OLD/2.Capacitacion-OLD/</code>.</div>`;

const ANTES: Array<[string, number]> = [
	["00_Base.ts", 108],
	["01_PlanDeEstudio.ts", 138],
	["02_Cursos.ts", 169],
];

const DESPUES: Array<[string, number]> = [
	["00_Base.ts", 34],
	["010_UlDriverServer.ts", 27],
	["011_UlAtributosXDriverServer.ts", 32],
	["020_UlPermisoServer.ts", 8],
	["030_UlEstructuraCursoServer.ts", 20],
	["040_UlSeguridadCursoServer.ts", 33],
	["050_UlAtributosPlanServer.ts", 34],
	["060_UlPlanCursoServer.ts", 51],
	["070_UlCursoServer.ts", 114],
	["080_UlCursoPrerequisitoServer.ts", 32],
	["081_UlCursoDePlanDeEstudioServer.ts", 33],
	["090_UlPlanEstudioServer.ts", 148],
];

const TOTAL_ANTES = ANTES.reduce((a, [, n]) => a + n, 0);
const TOTAL_DESPUES = DESPUES.reduce((a, [, n]) => a + n, 0);
const DELTA = TOTAL_DESPUES - TOTAL_ANTES;
const PCT = ((DELTA / TOTAL_ANTES) * 100).toFixed(1);

export async function buildBodyTK1429349(): Promise<string> {
	const [
		h3Solicitud,
		h3Cambios,
		h3Antes,
		h3Despues,
		h3Volumen,
		h3Postura,
	] = await Promise.all([
		h3Iconized("mdi:tools", "Solicitud"),
		h3Iconized("mdi:check-circle-outline", "Cambios realizados"),
		h3Iconized("mdi:file-document-outline", "Antes — estructura consolidada"),
		h3Iconized("mdi:file-tree-outline", "Después — controladores separados"),
		h3Iconized("mdi:chart-bar", "Comparativa de volumen de código"),
		h3Iconized("mdi:comment-quote-outline", "Postura del desarrollador"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:link-variant-off",
			`<b>Desacoplamiento de helpers:</b> eliminar el uso de utilidades  
			dinámicas como <code>sqlNesting</code>, <code>nestedConfig</code>,  
			<code>nestedDetailsCfg</code>, <code>syncDetails</code> y  
			<code>buildJData</code>.`,
		),
		await note(
			"mdi:database-edit-outline",
			`<b>SQL "quemado" y predecible:</b> replicar el patrón de diseño  
			explícito de los otros controladores, dejando las consultas y la  
			estructura del response declaradas directamente en cada controller  
			en vez de armarse dinámicamente.`,
		),
	);

	const cambios = noteList(
		await note(
			"mdi:file-tree-outline",
			`Se <b>separan</b> los controladores que estaban consolidados en  
			3 archivos monolíticos (<code>00_Base.ts</code>,  
			<code>01_PlanDeEstudio.ts</code>, <code>02_Cursos.ts</code>) en  
			<b>12 archivos</b> independientes, uno por controlador, siguiendo  
			la convención <code>NNN_UlXxxServer.ts</code>.`,
		),
		await note(
			"mdi:database-cog-outline",
			`Se reemplazan los helpers dinámicos por SQL <b>declarado en cada  
			controlador</b>, replicando el patrón de los controladores ya  
			existentes en el resto del sistema.`,
		),
		await note(
			"mdi:tune-variant",
			`Se ajusta <code>PromiseInsertQry</code> en los controladores  
			afectados para manejar listas vacías y tipos explícitos.`,
		),
		await note(
			"mdi:archive-outline",
			`El código previo se conserva intacto como referencia en  
			<code>OLD/2.Capacitacion-OLD/</code>  
			(<code>00_Base copy.ts</code>, <code>01_PlanDeEstudio copy.ts</code>,  
			<code>02_Cursos copy.ts</code>).`,
		),
	);

	const tablaAntes = simpleTable(
		["Archivo", "Líneas"],
		ANTES.map(([f, n]) => [`<code>${f}</code>`, String(n)])
			.concat([[`<b>Total</b>`, `<b>${TOTAL_ANTES}</b>`]]),
		{ aligns: ["left", "right"], widths: ["70%", "30%"] },
	);

	const tablaDespues = simpleTable(
		["Archivo", "Líneas"],
		DESPUES.map(([f, n]) => [`<code>${f}</code>`, String(n)])
			.concat([[`<b>Total</b>`, `<b>${TOTAL_DESPUES}</b>`]]),
		{ aligns: ["left", "right"], widths: ["70%", "30%"] },
	);

	const tablaVolumen = simpleTable(
		["Métrica", "Antes", "Después", "Δ"],
		[
			["Archivos", "3", "12", "+9"],
			["Líneas de código", String(TOTAL_ANTES), String(TOTAL_DESPUES), `${DELTA >= 0 ? "+" : ""}${DELTA}`],
			["Variación", "—", "—", `<b>${DELTA >= 0 ? "+" : ""}${PCT}%</b>`],
		],
		{ aligns: ["left", "right", "right", "right"], widths: ["40%", "20%", "20%", "20%"] },
	);

	const notaVolumen = await note(
		"mdi:information-outline",
		`El refactor incrementa el volumen total de código en  
		<b>${DELTA >= 0 ? "+" : ""}${PCT}%</b> (${TOTAL_ANTES} → ${TOTAL_DESPUES}  
		líneas). El aumento es esperado: el SQL que antes se generaba de forma  
		dinámica por helpers ahora queda <b>declarado explícitamente</b> en cada  
		controlador.`,
	);

	const postura = noteList(
		await note(
			"mdi:lightbulb-on-outline",
			`<b>Considero que trabajar con helpers es mejor que con cadenas  
			expandidas.</b> Los helpers reducen la verbosidad y permiten que un  
			humano lea la intención del controlador en pocas líneas, sin tener  
			que recorrer SQL repetido en cada archivo.`,
		),
		await note(
			"mdi:human-greeting-variant",
			`La solución previa estaba <b>enfocada en la lectura semántica  
			humana</b>: el helper nombra <i>qué</i> se hace  
			(<code>sqlNesting</code>, <code>nestedConfig</code>,  
			<code>syncDetails</code>) y oculta el <i>cómo</i>, que es ruido para  
			el lector. Esa abstracción es la que da legibilidad real al código.`,
		),
		await note(
			"mdi:robot-outline",
			`La solución expandida (SQL quemado y predecible) está más  
			<b>enfocada en el trabajo automático con IA</b> y en la trazabilidad  
			mecánica que en la comprensión humana: cada controlador se vuelve  
			autocontenido y fácil de procesar por herramientas, pero el lector  
			humano paga el costo en verbosidad y duplicación.`,
		),
		await note(
			"mdi:scale-balance",
			`Se acepta el cambio para alinear el patrón con el resto del  
			sistema, pero queda registrada la postura: el enfoque previo  
			optimizaba la <b>lectura semántica</b>, no la <b>uniformidad  
			mecánica</b>.`,
		),
	);

	return (
		intro +
		h3Solicitud + solicitud +
		h3Cambios + cambios +
		h3Antes + tablaAntes +
		h3Despues + tablaDespues +
		h3Volumen + tablaVolumen + notaVolumen +
		h3Postura + postura
	);
}

export const bodyTK1429349: Promise<string> = buildBodyTK1429349();
