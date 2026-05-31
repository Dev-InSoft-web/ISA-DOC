import { simpleTable } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const SOURCE_PATH = String.raw`P:\ING-05 Sistema de servicio al cliente web\ING-05-50 Ayudas Contapyme IA\Doc\PATY V3\Análisis y diseño\prompt\Prompts Específicos (Instrucciones)\Ultra`;
const PROMPT_ID = "pmpt_69f9f701508c81978d82393f74030eac0fc02a771228ab14";

const UPDATE_SCOPE: Array<{ foco: string; detalle: string }> = [
	{ foco: "Fuente", detalle: `Tomar las instrucciones compactadas desde <code>${SOURCE_PATH}</code>, manteniendo la versión humana original como referencia de diseño.` },
	{ foco: "Destino", detalle: "Actualizar en <code>AYUDASCP_IA</code> los registros de <code>INSTRUCCION</code> asociados a los tipos de consulta de Paty IA." },
	{ foco: "Prompt base", detalle: `Usar como referencia el prompt configurado en OpenAI <code>${PROMPT_ID}</code> para conservar alineación con la propuesta de mejora.` },
	{ foco: "Trazabilidad", detalle: "Registrar qué instrucción compactada queda activa por cada <code>tipo_consulta</code> y validar que el contenido no vuelva a crecer por copias intermedias." },
];

const intro =
	`<div>Se requiere actualizar en la base de datos de <b>Paty IA</b> las instrucciones específicas por tipo de consulta usando la versión compactada definida en la reunión de mejora del 29-may. La motivación principal es reducir tokens de entrada sin perder las reglas funcionales que gobiernan cada respuesta.</div>`;

export async function buildBodyTK1431666(): Promise<string> {
	const [h3Contexto, h3Solicitud, h3Criterios] = await Promise.all([
		h3Iconized("mdi:file-document-outline", "Contexto de reunión"),
		h3Iconized("mdi:database-cog-outline", "Solicitud"),
		h3Iconized("mdi:check-circle-outline", "Criterios de aceptación"),
	]);

	const contexto = noteList(
		await note(
			"mdi:cash-multiple",
			"En la revisión del video <i>Propuesta de mejora PatyIA - 2026 05 29 08 42 16</i> se identifica que las conversaciones pueden disparar costos altos cuando se reinyectan instrucciones largas en cada turno.",
		),
		await note(
			"mdi:package-variant-closed",
			"La decisión técnica es conservar prompts legibles para mantenimiento, pero enviar al runtime versiones compactadas tipo <b>caveman</b>, <b>ultra</b> o <b>wenyan-ultra</b> cuando el contenido sea estable.",
		),
		await note(
			"mdi:database-search-outline",
			"Las instrucciones por tipo de consulta ya viven como datos en <code>INSTRUCCION</code>; por eso la actualización debe resolverse como dato versionado, no como cambio rígido de código.",
		),
	);

	const solicitud = noteList(
		await note(
			"mdi:folder-text-outline",
			`<b>Ruta de entrada:</b> <code>${SOURCE_PATH}</code>.`,
		),
		await note(
			"mdi:key-variant",
			`<b>Prompt de referencia:</b> <code>${PROMPT_ID}</code>.`,
		),
		await note(
			"mdi:database-edit-outline",
			"Actualizar los registros activos de <code>INSTRUCCION</code> para que cada <code>PROMPT_&lt;TIPO&gt;</code> use la versión compactada correspondiente, manteniendo nombre, descripción, estado activo y relación con <code>TDCONSULTA</code>.",
		),
	);

	const tabla = simpleTable(
		["Foco", "Detalle"],
		UPDATE_SCOPE.map((row) => [row.foco, row.detalle]),
		{ widths: ["22%", "78%"] },
	);

	const criterios = noteList(
		await note(
			"mdi:shield-check-outline",
			"La actualización debe ser idempotente y verificable por consulta SQL antes/después; si un tipo de consulta no tiene archivo compactado, no debe sobrescribirse con contenido vacío.",
		),
		await note(
			"mdi:chart-bar",
			"La validación debe comparar reducción de longitud/tokens aproximados contra la instrucción anterior y conservar evidencia en la bitácora de Paty IA.",
		),
	);

	return intro + h3Contexto + contexto + h3Solicitud + solicitud + tabla + h3Criterios + criterios;
}

export const bodyTK1431666: Promise<string> = buildBodyTK1431666();