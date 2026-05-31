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
	const [h3Problema, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:alert-circle-outline", "Problema identificado"),
		h3Iconized("mdi:merge", "Solución esperada"),
		h3Iconized("mdi:check-circle-outline", "Validación"),
	]);

	const problema = noteList(
		await note(
			"mdi:alert-circle-outline",
			"En el diagnóstico del 28-may y la reunión del 29-may se evidencia que, al introducir instrucciones específicas por tipo de consulta, algunas reglas generales pueden quedar opacadas. Un síntoma visible fue el deterioro del comportamiento esperado en saludos o respuestas básicas.",
		),
		await note(
			"mdi:file-document-outline",
			"El riesgo técnico es tratar las instrucciones específicas como reemplazo del prompt base. La integración debe componer capas de contexto, no alternar entre prompt general o prompt específico.",
		),
		await note(
			"mdi:tag-text-outline",
			"La trazabilidad por <code>tipo_consulta</code> debe mantenerse para saber qué instrucción, modelo y fuentes documentales participaron en cada respuesta.",
		),
	);

	const composicion = simpleTable(
		["Pieza", "Responsabilidad"],
		COMPOSITION_ROWS.map((row) => [row.pieza, row.responsabilidad]),
		{ widths: ["24%", "76%"] },
	);

	const solucion = noteList(
		await note(
			"mdi:layers-triple-outline",
			"Construir explícitamente la entrada final con esta secuencia lógica: <code>prompt general + instrucciones específicas + variables + vector stores asociados</code>.",
		),
		await note(
			"mdi:database-search-outline",
			"Resolver desde base de datos las instrucciones y fuentes asociadas al <code>tipo_consulta</code>, aplicando fallback cuando no existan registros activos.",
		),
		await note(
			"mdi:clock-outline",
			"Guardar evidencia mínima del armado: <code>tipo_consulta</code>, instrucción usada, vector stores enviados, modelo usado y si se aplicó fallback.",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-decagram-outline",
			"Un saludo o mensaje social debe seguir respondiendo con las reglas del prompt general aunque exista instrucción específica para <code>SALUDO_OTRO</code>.",
		),
		await note(
			"mdi:database-search-outline",
			"Una consulta documental debe conservar las reglas globales y además usar sólo los vector stores asociados al tipo clasificado.",
		),
		await note(
			"mdi:bug-check-outline",
			"Si la composición falla o una instrucción llega vacía, el flujo debe degradar al prompt general y dejar registro del fallback para revisión.",
		),
	);

	return intro + h3Problema + problema + h3Solucion + composicion + solucion + h3Validacion + validacion;
}

export const bodyTK1431163: Promise<string> = buildBodyTK1431163();