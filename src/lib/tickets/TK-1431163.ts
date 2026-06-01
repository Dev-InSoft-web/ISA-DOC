// TK-1431163 — Ajuste en integración OpenAI para conservar prompt general
// e instrucciones por tipo de consulta. El body no debe reemplazar PR_GENERAL
// con instructions; las capas se componen vía prompt.variables.

import { simpleTable } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const COMPOSITION_ROWS: Array<{ pieza: string; responsabilidad: string }> = [
	{ pieza: "Prompt general", responsabilidad: "Mantener las reglas globales de identidad, tono, seguridad, límites funcionales y forma de respuesta de Paty IA." },
	{ pieza: "Tipo de consulta", responsabilidad: "Determinar la intención operativa clasificada para el turno y dejar trazabilidad en conversación/mensaje." },
	{ pieza: "Instrucciones específicas", responsabilidad: "Agregar las reglas particulares del <code>tipo_consulta</code> sin reemplazar ni omitir el prompt general." },
	{ pieza: "Variables", responsabilidad: "Inyectar datos dinámicos necesarios para la respuesta: módulo, contexto de conversación, consulta normalizada y parámetros recuperados." },
	{ pieza: "Vector stores", responsabilidad: "Asociar las fuentes documentales por tipo de consulta y pasarlas a OpenAI sólo cuando el flujo requiera búsqueda documental." },
];

const intro =
	`<div>Se solicita ajustar la integración de <b>OpenAI Responses</b> en Paty IA para que el flujo conserve siempre el <b>prompt general</b> y, adicionalmente, incorpore las instrucciones específicas por tipo de consulta, variables y vector stores asociados.</div>`;

export async function buildBodyTK1431163(): Promise<string> {
	const [h3Problema, h3Diag, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:alert-circle-outline", "Problema identificado"),
		h3Iconized("mdi:magnify-scan", "Diagnóstico"),
		h3Iconized("mdi:check-circle-outline", "Solución"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const problema = noteList(
		await note(
			"mdi:alert-circle-outline",
			"Tras cargar instrucciones por tipo de consulta (25-may), Paty dejó de saludar y usar el nombre del usuario en el primer mensaje. El síntoma se reproduce cuando existe al menos una instrucción resuelta para el <code>itdconsulta</code> clasificado.",
		),
		await note(
			"mdi:file-document-outline",
			"En la Responses API, enviar <code>prompt.id</code> junto con <code>instructions</code> en el body hace que el campo <code>instructions</code> <b>reemplace</b> el template <code>PR_GENERAL</code>, no lo complemente.",
		),
	);

	const diag = noteList(
		await note(
			"mdi:layers-off-outline",
			`Antes del 25-may no se enviaba <code>instructions</code> → el template aplicaba completo (saludo + <code>{{nombre_usuario}}</code>). Después, <code>obtenerContextoConsulta</code> resolvía texto por tipo y el body lo mandaba como <code>instructions</code>, opacando las reglas globales.`,
		),
		await note(
			"mdi:tag-text-outline",
			"La trazabilidad por <code>tipo_consulta</code>, instrucciones, vector stores y modelo debe quedar en logs/métricas del turno para auditar cada respuesta.",
		),
	);

	const composicion = simpleTable(
		["Pieza", "Responsabilidad"],
		COMPOSITION_ROWS.map((row) => [row.pieza, row.responsabilidad]),
		{ widths: ["24%", "76%"] },
	);

	const solucion = noteList(
		await note(
			"mdi:code-braces",
			`Se añade <code>{{instrucciones_tipo}}</code> al template <code>PR_GENERAL</code> en OpenAI y se elimina <code>instructions</code> del body en <code>executeRunWithStream</code>. Las instrucciones por tipo se inyectan como <code>prompt.variables.instrucciones_tipo</code>; <code>nombre_usuario</code> comparte el mismo objeto <code>prompt.variables</code>.`,
		),
		await note(
			"mdi:database-search-outline",
			`<code>obtenerContextoConsulta</code> sigue resolviendo instrucciones y vector stores desde BD por <code>tipo_consulta</code>. Los vector stores se envían por <code>tools.file_search</code> sólo cuando el flujo lo requiere.`,
		),
		await note(
			"mdi:chart-line",
			`En <code>UlMetrics</code> la tarifa <code>openai-pricing.json</code> (archivo local/gitignored) se carga en runtime con fallback a costos en cero si no existe, para que el build y el deploy no dependan de archivos internos de métricas.`,
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"QA conv <code>1806</code> (28-may): el body ya no lleva <code>instructions</code>; la respuesta recupera saludo y nombre (<i>Claro, Integraciones…</i>) conservando la guía del tipo <code>PASO_A_PASO</code>.",
		),
		await note(
			"mdi:check-bold",
			"Consultas documentales conservan reglas globales y usan sólo los vector stores asociados al tipo clasificado.",
		),
		await note(
			"mdi:check-bold",
			"Si la tarifa de precios no está disponible en el entorno, el flujo de respuesta sigue operando; los costos quedan en cero hasta cargar el JSON local.",
		),
	);

	return intro + h3Problema + problema + h3Diag + diag + composicion + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431163: Promise<string> = buildBodyTK1431163();
