import { simpleTable } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const MODEL_RULES: Array<{ flujo: string; uso: string; modelo: string }> = [
	{ flujo: "Operativo", uso: "Clasificación de tipo de consulta, clasificación de módulo, títulos, resúmenes, respuestas sí/no y extracción estructurada corta.", modelo: "gpt-4.1-nano" },
	{ flujo: "Conocimiento", uso: "Respuesta final con contexto documental, instrucciones por tipo de consulta y vector stores asociados.", modelo: "Modelo configurado en BD por tipo; valor inicial sugerido: gpt-5-nano" },
	{ flujo: "Fallback", uso: "Ausencia de configuración activa, error de lectura de BD o tipo de consulta no reconocido.", modelo: "Modelo global seguro definido por configuración" },
];

const intro =
	`<div>Se requiere implementar en Paty IA la <b>selección de modelo IA por tipo de consulta</b>, de forma que las tareas operativas usen modelos económicos y las respuestas de conocimiento usen el modelo configurado para el tipo clasificado.</div>`;

export async function buildBodyTK1431662(): Promise<string> {
	const [h3Objetivo, h3Reglas, h3Datos, h3Aceptacion] = await Promise.all([
		h3Iconized("mdi:brain", "Objetivo"),
		h3Iconized("mdi:map-marker-path", "Reglas de selección"),
		h3Iconized("mdi:database-cog-outline", "Modelo de datos y trazabilidad"),
		h3Iconized("mdi:check-circle-outline", "Criterios de aceptación"),
	]);

	const objetivo = noteList(
		await note(
			"mdi:speedometer",
			"La reunión de mejora concluye que no todo paso del flujo necesita el mismo modelo. Las tareas operativas deben ser rápidas y baratas; la respuesta final puede usar un modelo más capaz cuando la consulta lo justifique.",
		),
		await note(
			"mdi:database-search-outline",
			"La decisión de modelo debe venir de configuración persistida por tipo de consulta/instrucción, no sólo de <code>OPENAI_MODEL</code> en variables de entorno.",
		),
		await note(
			"mdi:chart-bar",
			"La selección debe habilitar medición posterior de costo, latencia y calidad por etapa, modelo y <code>tipo_consulta</code>.",
		),
	);

	const reglas = simpleTable(
		["Flujo", "Uso", "Modelo"],
		MODEL_RULES.map((row) => [row.flujo, row.uso, `<code>${row.modelo}</code>`]),
		{ widths: ["18%", "54%", "28%"] },
	);

	const datos = noteList(
		await note(
			"mdi:table-column-plus-after",
			"Agregar un campo de modelo IA al catálogo de instrucciones o a la relación de tipo de consulta, de modo que el backend pueda resolver <code>tipo_consulta → instrucción → modelo</code> antes de llamar a OpenAI.",
		),
		await note(
			"mdi:source-branch-sync",
			"El backend debe enviar el modelo elegido en cada request de OpenAI Responses y conservar fallback explícito para tipos sin configuración.",
		),
		await note(
			"mdi:chart-bar",
			"El log de conversación debe permitir reconstruir qué modelo se usó en clasificación, extracción y respuesta final, junto con tokens y latencia cuando estén disponibles.",
		),
	);

	const aceptacion = noteList(
		await note(
			"mdi:check-bold",
			"Una consulta operativa corta debe ejecutarse con <code>gpt-4.1-nano</code> sin depender del modelo de respuesta final.",
		),
		await note(
			"mdi:check-bold",
			"Una consulta de conocimiento debe resolver el modelo desde BD/configuración del tipo clasificado, inicialmente <code>gpt-5-nano</code> salvo que el registro indique otro valor.",
		),
		await note(
			"mdi:check-bold",
			"Si no hay modelo configurado, el sistema debe aplicar fallback seguro y dejar evidencia en métricas/logs.",
		),
	);

	return intro + h3Objetivo + objetivo + h3Reglas + reglas + h3Datos + datos + h3Aceptacion + aceptacion;
}

export const bodyTK1431662: Promise<string> = buildBodyTK1431662();