// TK-1431163 — Integración OpenAI: conservar prompt general + instrucciones por tipo.

import { codeBlock, simpleTable, ticketImg } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const SNIPPET_VARIABLES = `prompt: {
  id: promptId,
  variables: {
    nombre_usuario: nombreResuelto,
    instrucciones_tipo: textoPorTipoResuelto
  }
}`;

const COMPOSITION_ROWS: Array<{ pieza: string; responsabilidad: string }> = [
	{ pieza: "Prompt general", responsabilidad: "Reglas globales de identidad, tono, seguridad y límites funcionales (plantilla PR_GENERAL)." },
	{ pieza: "Tipo de consulta", responsabilidad: "Intención clasificada del turno; trazabilidad en conversación y mensaje." },
	{ pieza: "Instrucciones específicas", responsabilidad: "Reglas del tipo de consulta sin sustituir el prompt general." },
	{ pieza: "Variables", responsabilidad: "Datos dinámicos: módulo, contexto, consulta normalizada y nombre del usuario." },
	{ pieza: "Vector stores", responsabilidad: "Fuentes documentales por tipo; búsqueda en archivos sólo cuando el flujo lo exige." },
];

const intro =
	`<div>Se ajustó la integración de <b>OpenAI Responses</b> en Paty IA para que el flujo ` +
	`conservara el <b>prompt general</b> y sumara instrucciones por tipo de consulta, variables y ` +
	`vector stores como capas, sin reemplazar la plantilla PR_GENERAL.</div>`;

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
			"En Responses API, enviar el id del prompt junto con instructions en el body hizo que instructions <b>reemplazara</b> la plantilla PR_GENERAL en lugar de complementarla.",
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
			"Se añadió el marcador de instrucciones por tipo en la plantilla general y se eliminó instructions del body: " +
				"el texto por tipo y el nombre del usuario pasan solo en variables del prompt. Contrato aplicado:" +
				(await codeBlock(SNIPPET_VARIABLES, "typescript")),
		),
		await note(
			"mdi:account-outline",
			"El placeholder de nombre de usuario se sustituye en el texto de instrucciones antes de enviarlo como variable del prompt.",
		),
		await note(
			"mdi:database-search-outline",
			"El contexto por tipo siguió resolviendo instrucciones y vector stores desde BD; la búsqueda en archivos se activa solo cuando el flujo lo requiere.",
		),
		await note(
			"mdi:chart-line",
			"Las métricas cargan tarifas OpenAI en runtime con fallback a costo cero si el archivo no está en el entorno, para no bloquear build ni deploy.",
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
