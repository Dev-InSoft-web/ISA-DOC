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
	["00_Base.ts", 128],
	["01_PlanDeEstudio.ts", 161],
	["02_Cursos.ts", 192],
];

const DESPUES: Array<[string, number]> = [
	["00_Base.ts", 42],
	["010_UlDriverServer.ts", 30],
	["011_UlAtributosXDriverServer.ts", 36],
	["020_UlPermisoServer.ts", 9],
	["030_UlEstructuraCursoServer.ts", 23],
	["040_UlSeguridadCursoServer.ts", 37],
	["050_UlAtributosPlanServer.ts", 38],
	["060_UlPlanCursoServer.ts", 57],
	["070_UlCursoServer.ts", 129],
	["080_UlCursoPrerequisitoServer.ts", 36],
	["081_UlCursoDePlanDeEstudioServer.ts", 37],
	["090_UlPlanEstudioServer.ts", 173],
];

const TOTAL_ANTES = ANTES.reduce((a, [, n]) => a + n, 0);
const TOTAL_DESPUES = DESPUES.reduce((a, [, n]) => a + n, 0);
const DELTA = TOTAL_DESPUES - TOTAL_ANTES;
const PCT = ((DELTA / TOTAL_ANTES) * 100).toFixed(1);

export async function buildBodyTK1429349(): Promise<string> {
	const [
		h3Solicitud,
		h3Cambios,
		h3Comparativa,
	] = await Promise.all([
		h3Iconized("mdi:tools", "Solicitud"),
		h3Iconized("mdi:check-circle-outline", "Cambios realizados"),
		h3Iconized("mdi:chart-bar", "Comparativa de volumen de código"),
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

	const badge = (n: number, kind: "magenta" | "warn"): string => {
		const palette = kind === "magenta"
			? "background:rgba(214,51,132,0.18);color:#d63384;"
			: "background:rgba(217,119,6,0.18);color:#d97706;";
		return `<span style="${palette}padding:1px 8px;border-radius:10px;font-weight:600;font-family:Consolas,Menlo,monospace;font-size:9.5pt;">${n}</span>`;
	};

	const maxRows = Math.max(ANTES.length, DESPUES.length);
	const filas: string[][] = [];
	for (let i = 0; i < maxRows; i++) {
		const a = ANTES[i];
		const d = DESPUES[i];
		filas.push([
			a ? `<code>${a[0]}</code>` : "",
			a ? badge(a[1], "magenta") : "",
			d ? `<code>${d[0]}</code>` : "",
			d ? badge(d[1], "warn") : "",
		]);
	}
	filas.push([
		`<b>${ANTES.length} archivos</b>`,
		badge(TOTAL_ANTES, "magenta"),
		`<b>${DESPUES.length} archivos</b>`,
		`<span style="white-space:nowrap;display:inline-flex;align-items:center;gap:0.4rem;">${badge(TOTAL_DESPUES, "warn")}<span style="color:${DELTA >= 0 ? "#a33" : "#2a7"};font-weight:600;">(${DELTA >= 0 ? "+" : ""}${PCT}%)</span></span>`,
	]);

	const tablaComparativa = simpleTable(
		["Antes", "Líneas", "Después", "Líneas"],
		filas,
		{ aligns: ["left", "right", "left", "right"], widths: ["28%", "12%", "48%", "12%"] },
	);

	const notaVolumen = await note(
		"mdi:information-outline",
		`El refactor incrementa el volumen total de código en  
		<b>${DELTA >= 0 ? "+" : ""}${PCT}%</b> (${TOTAL_ANTES} → ${TOTAL_DESPUES}  
		líneas). El aumento es esperado: el SQL que antes se generaba de forma  
		dinámica por helpers ahora queda <b>declarado explícitamente</b> en cada  
		controlador.<br><br>  
		<b>Considero que trabajar con helpers es mejor que con cadenas  
		expandidas:</b> los helpers reducen la verbosidad y permiten que un  
		humano lea la intención del controlador en pocas líneas, sin recorrer  
		SQL repetido en cada archivo. La solución previa estaba enfocada en la  
		<b>lectura semántica humana</b> — el helper nombra el <i>qué</i>  
		(<code>sqlNesting</code>, <code>nestedConfig</code>,  
		<code>syncDetails</code>) y oculta el <i>cómo</i>, que es ruido para el  
		lector. La solución expandida con SQL quemado está más enfocada en el  
		<b>trabajo automático con IA</b> y en la trazabilidad mecánica que en la  
		comprensión humana: cada controlador se vuelve autocontenido y fácil de  
		procesar por herramientas, pero el lector paga el costo en verbosidad y  
		duplicación. Se acepta el cambio para alinear el patrón con el resto del  
		sistema, dejando registrada la postura: el enfoque previo optimizaba la  
		<b>lectura semántica</b>, no la <b>uniformidad mecánica</b>.`,
	);

	return (
		intro +
		h3Solicitud + solicitud +
		h3Cambios + cambios +
		h3Comparativa + tablaComparativa + notaVolumen
	);
}

export const bodyTK1429349: Promise<string> = buildBodyTK1429349();
