// TK-1431666 — Actualización de instrucciones comprimidas (Ultra) en BD.
// MERGE idempotente sobre los 13 tipos de consulta, version 2.0-ultra.

import { simpleTable } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const PROMPTS: Array<{ tipo: string; archivo: string }> = [
	{ tipo: "SALUDO_OTRO", archivo: "Ultra/01-saludo-otro.md" },
	{ tipo: "FUERA_DE_ALCANCE_TECNICO", archivo: "Ultra/02-fuera-de-alcance-tecnico.md" },
	{ tipo: "SOLICITUD_NO_PERMITIDA", archivo: "Ultra/03-solicitud-no-permitida.md" },
	{ tipo: "REQUIERE_CONTEXTO", archivo: "Ultra/04-requiere-contexto.md" },
	{ tipo: "PASO_A_PASO", archivo: "Ultra/05-paso-a-paso.md" },
	{ tipo: "INTERPRETACION_RESULTADO", archivo: "Ultra/06-interpretacion-resultado.md" },
	{ tipo: "CONSULTA_NORMATIVA_NEGOCIO", archivo: "Ultra/07-consulta-normativa-negocio.md" },
	{ tipo: "ASESORIA_PERSONALIZADA", archivo: "Ultra/08-asesoria-personalizada.md" },
	{ tipo: "ERROR_TECNICO", archivo: "Ultra/09-error-tecnico.md" },
	{ tipo: "ERROR_CONFIGURACION", archivo: "Ultra/10-error-configuracion.md" },
	{ tipo: "ERROR_ACCESO", archivo: "Ultra/11-error-acceso.md" },
	{ tipo: "ERROR_DIAN", archivo: "Ultra/12-error-dian.md" },
	{ tipo: "COMERCIAL", archivo: "Ultra/13-comercial.md" },
];

const intro =
	`<div>Se actualizaron en <b>AYUDASCP_IA</b> las instrucciones específicas por tipo de consulta con la versión compacta <b>Ultra</b>, reduciendo tokens de entrada sin perder las reglas funcionales por <code>tipo_consulta</code>. La versión legible completa permanece en el repositorio de análisis como referencia de diseño.</div>`;

export async function buildBodyTK1431666(): Promise<string> {
	const [h3Contexto, h3Solicitud, h3Solucion, h3Validacion] = await Promise.all([
		h3Iconized("mdi:file-document-outline", "Contexto de reunión"),
		h3Iconized("mdi:database-cog-outline", "Solicitud"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:check-decagram", "Validación"),
	]);

	const contexto = noteList(
		await note(
			"mdi:cash-multiple",
			"En la revisión del video <i>Propuesta de mejora PatyIA - 2026 05 29 08 42 16</i> se identifica que las conversaciones pueden disparar costos altos cuando se reinyectan instrucciones largas en cada turno.",
		),
		await note(
			"mdi:package-variant-closed",
			"La decisión técnica es conservar prompts legibles para mantenimiento, pero enviar al runtime versiones compactadas <b>Ultra</b> cuando el contenido es estable.",
		),
	);

	const solicitud = noteList(
		await note(
			"mdi:folder-text-outline",
			`<b>Fuente en repo:</b> <code>src/lib/patyia/prompts/Ultra/01-*.md</code> … <code>13-*.md</code> (13 archivos por tipo de consulta).`,
		),
		await note(
			"mdi:database-edit-outline",
			"Actualizar los registros activos de <code>INSTRUCCION</code> (<code>PROMPT_&lt;TIPO&gt;</code>) y conservar el enlace en <code>TDCONSULTAXINSTRUCCION</code> con <code>orden = 1</code>.",
		),
	);

	const tabla = simpleTable(
		["Código (IINSTRUCCION)", "Archivo fuente"],
		PROMPTS.map((p) => [`<code>${p.tipo}</code>`, `<code>${p.archivo}</code>`]),
		{ widths: ["42%", "58%"] },
	);

	const solucion = noteList(
		await note(
			"mdi:merge",
			`Se genera y ejecuta <code>seed-prompts-ultra-tdconsulta.sql</code> (script <code>build-paty-prompts-ultra-sql.mjs</code>): <b>MERGE</b> en <code>INSTRUCCION</code> con <code>version = 2.0-ultra</code> y texto literal de cada <code>.md</code>; <b>MERGE</b> en <code>TDCONSULTAXINSTRUCCION</code> sin duplicar relaciones.`,
		),
		await note(
			"mdi:shield-check-outline",
			`El lote es idempotente (<code>SET XACT_ABORT ON</code>, <code>BEGIN TRAN</code> / <code>COMMIT</code>): re-ejecutar actualiza <code>instruccion</code> y <code>version</code> sin insertar filas duplicadas.`,
		),
		await note(
			"mdi:file-document-outline",
			"Evidencia y pasos de verificación documentados en bitácora Paty IA (<code>03-prompts-ultra-tdconsulta.md</code>, 2026-06-01).",
		),
	);

	const validacion = noteList(
		await note(
			"mdi:check-bold",
			"Post-ejecución: <code>SELECT</code> de verificación con 13 filas, <code>version = 2.0-ultra</code> y <code>LEN(instruccion)</code> menor que la carga inicial de 2026-05-25.",
		),
		await note(
			"mdi:check-bold",
			"Tipos sin archivo Ultra no se sobrescriben; el runtime sigue recibiendo instrucciones vía <code>prompt.variables.instrucciones_tipo</code> (TK-1431163).",
		),
	);

	return intro + h3Contexto + contexto + h3Solicitud + solicitud + tabla + h3Solucion + solucion + h3Validacion + validacion;
}

export const bodyTK1431666: Promise<string> = buildBodyTK1431666();
