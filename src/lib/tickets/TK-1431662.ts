// TK-1431662 — Selección de modelo IA por tipo de consulta en Paty IA.
// Modelo operativo fijo para clasificación/extracción; modelo de respuesta
// final desde INSTRUCCION.MODELO por tipo clasificado.

import { simpleTable } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const MODEL_RULES: Array<{ flujo: string; uso: string; modelo: string }> = [
	{ flujo: "Operativo", uso: "Clasificación de tipo de consulta, clasificación de módulo, títulos, resúmenes, respuestas sí/no y extracción estructurada corta.", modelo: "gpt-4.1-nano (system-prompts.json → modeloOperativo)" },
	{ flujo: "Conocimiento", uso: "Respuesta final con contexto documental, instrucciones por tipo y vector stores asociados.", modelo: "INSTRUCCION.MODELO por tipo clasificado (default gpt-5-mini)" },
	{ flujo: "Fallback", uso: "Sin instrucción activa, error de lectura de BD o tipo no reconocido.", modelo: "modeloConversacion en system-prompts.json (gpt-5-mini)" },
];

const intro =
	`<div>Se implementó en Paty IA la <b>selección de modelo IA por tipo de consulta</b>: tareas operativas con modelo económico fijo y respuesta final con el modelo configurado en <code>INSTRUCCION.MODELO</code>, trazable en logs y métricas del turno.</div>`;

export async function buildBodyTK1431662(): Promise<string> {
	const [h3Objetivo, h3Reglas, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:brain", "Objetivo"),
		h3Iconized("mdi:map-marker-path", "Reglas de selección"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const objetivo = noteList(
		await note(
			"mdi:speedometer",
			"La reunión de mejora concluye que no todo paso del flujo necesita el mismo modelo. Las tareas operativas deben ser rápidas y baratas; la respuesta final puede usar un modelo más capaz cuando la consulta lo justifique.",
		),
		await note(
			"mdi:database-search-outline",
			"La decisión de modelo de respuesta debe venir de configuración persistida por instrucción/tipo de consulta, no sólo de variables de entorno.",
		),
	);

	const reglas = simpleTable(
		["Flujo", "Uso", "Modelo"],
		MODEL_RULES.map((row) => [row.flujo, row.uso, `<code>${row.modelo}</code>`]),
		{ widths: ["18%", "54%", "28%"] },
	);

	const solucion = noteList(
		await note(
			"mdi:table-column-plus-after",
			`Se agrega la columna <code>MODELO NVARCHAR(40)</code> en <code>INSTRUCCION</code> (script idempotente <code>add-modelo-instruccion.sql</code>, default <code>gpt-5-mini</code>). Las 13 filas existentes quedan calibrables sin redeploy.`,
		),
		await note(
			"mdi:database-cog-outline",
			`En backend: <code>TInstruccion.modelo</code>, <code>TInstruccionController.GetModelo</code> y <code>GetModeloPorTdConsulta</code> resuelven <code>tipo_consulta → TDCONSULTAXINSTRUCCION → INSTRUCCION.MODELO</code> antes de <code>responses.create</code>.`,
		),
		await note(
			"mdi:code-braces",
			`En <code>OpenIAServer.obtenerContextoConsulta</code> el modelo de respuesta final sale de la instrucción clasificada; los flujos operativos usan <code>getOperativeModel()</code> (<code>gpt-4.1-nano</code>). Se eliminó la dependencia de <code>OPENAI_MODEL</code> en configuración local.`,
		),
		await note(
			"mdi:thermometer",
			`Sólo se envía <code>temperature</code> cuando el modelo lo permite (<code>modelAllowsTemperature</code> + lista <code>modelosSinTemperatura</code> en <code>openai-infomap.json</code>), evitando errores con familias <code>gpt-5-*</code>.`,
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"Clasificación y extracción operativa ejecutan con <code>gpt-4.1-nano</code> independiente del modelo de respuesta.",
		),
		await note(
			"mdi:check-bold",
			"Una consulta de conocimiento usa el <code>MODELO</code> de la fila <code>INSTRUCCION</code> ligada al <code>tipo_consulta</code> clasificado; el log del turno registra modelo, tokens y latencia cuando están disponibles.",
		),
		await note(
			"mdi:check-bold",
			"Sin configuración o ante error de lectura, aplica fallback <code>gpt-5-mini</code> desde <code>system-prompts.json</code>.",
		),
	);

	return intro + h3Objetivo + objetivo + h3Reglas + reglas + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431662: Promise<string> = buildBodyTK1431662();
