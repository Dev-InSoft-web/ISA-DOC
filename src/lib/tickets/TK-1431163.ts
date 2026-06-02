// TK-1431163 — Integración OpenAI: conservar prompt general + instrucciones por tipo.

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const COMPOSITION_ROWS: Array<{ pieza: string; responsabilidad: string }> = [
	{ pieza: "Prompt general", responsabilidad: "Reglas globales de identidad, tono, seguridad y límites funcionales (<code>PR_GENERAL</code>)." },
	{ pieza: "Tipo de consulta", responsabilidad: "Intención clasificada del turno; trazabilidad en conversación y mensaje." },
	{ pieza: "Instrucciones específicas", responsabilidad: "Reglas del <code>tipo_consulta</code> sin sustituir el prompt general." },
	{ pieza: "Variables", responsabilidad: "Datos dinámicos: módulo, contexto, consulta normalizada, <code>nombre_usuario</code>." },
	{ pieza: "Vector stores", responsabilidad: "Fuentes documentales por tipo; <code>file_search</code> sólo cuando el flujo lo exige." },
];

const SNIPPET_VARIABLES = `prompt: {
  id: promptId,
  variables: {
    nombre_usuario: nombreResuelto,
    instrucciones_tipo: textoPorTipoResuelto
  }
}`;

const intro =
	`<div>Se ajustó la integración de <b>OpenAI Responses</b> en Paty IA para que el flujo ` +
	`conservara el <b>prompt general</b> y sumara instrucciones por tipo de consulta, variables y ` +
	`vector stores como capas, sin reemplazar el template <code>PR_GENERAL</code>.</div>`;

export async function buildBodyTK1431163(): Promise<string> {
	const [h3Problema, h3Diag, h3Arq, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:alert-circle-outline", "Problema identificado"),
		h3Iconized("mdi:magnify-scan", "Diagnóstico"),
		h3Iconized("mdi:sitemap", "Arquitectura de capas"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const problema = noteList(
		await note(
			"mdi:alert-circle-outline",
			"Tras cargar instrucciones por tipo de consulta en base de datos, dejó de aplicarse el saludo y el uso del nombre del usuario en el primer mensaje cuando existía instrucción resuelta para el <code>itdconsulta</code> clasificado.",
		),
		await note(
			"mdi:file-document-outline",
			"En Responses API, enviar <code>prompt.id</code> junto con <code>instructions</code> en el body hizo que <code>instructions</code> <b>reemplazara</b> el template <code>PR_GENERAL</code> en lugar de complementarlo.",
		),
	);

	const diag = noteList(
		await note(
			"mdi:layers-off-outline",
			"Previamente no se enviaba <code>instructions</code> en el body y el template aplicaba completo (saludo y <code>{{nombre_usuario}}</code>). Al resolver texto por tipo y enviarlo como <code>instructions</code>, se opacaron las reglas globales.",
		),
		await note(
			"mdi:tag-text-outline",
			"Se requirió trazabilidad por <code>tipo_consulta</code>, instrucciones, vector stores y modelo en logs y métricas del turno.",
		),
	);

	const composicion = simpleTable(
		["Pieza", "Responsabilidad"],
		COMPOSITION_ROWS.map((row) => [row.pieza, row.responsabilidad]),
		{ widths: ["24%", "76%"] },
	);

	const arq = noteList(
		await note(
			"mdi:chart-tree",
			"Flujo de composición de capas en el request a OpenAI:" +
				ticketImg("tk1431163-capas-openai.jpg"),
		),
	);

	const solucion = noteList(
		await note(
			"mdi:code-braces",
			"Se añadió <code>{{instrucciones_tipo}}</code> al template <code>PR_GENERAL</code> en OpenAI y se eliminó <code>instructions</code> del body en <code>executeRunWithStream</code>. Fragmento del contrato aplicado:" +
			(await codeBlock(SNIPPET_VARIABLES, "typescript")),
		),
		await note(
			"mdi:account-outline",
			"Se resolvió <code>{{nombre_usuario}}</code> en el texto de instrucciones antes de inyectarlo en <code>prompt.variables</code> (<code>buildQueryTypeInstructions</code> / <code>resolveUserNameInText</code>).",
		),
		await note(
			"mdi:database-search-outline",
			"<code>obtenerContextoConsulta</code> siguió resolviendo instrucciones y vector stores desde BD por <code>tipo_consulta</code>; <code>tools.file_search</code> sólo cuando el flujo lo requería.",
		),
		await note(
			"mdi:chart-line",
			"En <code>UlMetrics</code> se cargó <code>openai-pricing.json</code> en runtime con fallback a costo cero si el archivo no existía, para no bloquear build ni deploy.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"En conversación de prueba <code>1806</code> el body dejó de incluir <code>instructions</code>; la respuesta recuperó saludo y nombre conservando la guía del tipo <code>PASO_A_PASO</code>.",
		),
		await note(
			"mdi:check-bold",
			"En consultas documentales se mantuvieron reglas globales y vector stores asociados al tipo clasificado.",
		),
		await note(
			"mdi:check-bold",
			"Ante ausencia de tarifas en el entorno, el flujo de respuesta continuó operando con costos en cero hasta disponer del JSON local.",
		),
	);

	return intro + h3Problema + problema + h3Diag + diag + h3Arq + composicion + arq + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431163: Promise<string> = buildBodyTK1431163();
