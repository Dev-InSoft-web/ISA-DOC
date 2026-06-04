// TK-1432903 — Registro de log de peticiones de Paty IA.

import { h3Iconized, note, noteList } from "../../../../lib/tk-helpers";

const CRITERIOS: Array<{ item: string }> = [
	{ item: "Registrar cada petición del usuario al asistente con trazabilidad del ciclo completo." },
	{ item: "Incluir tiempos de ejecución, consumo, clasificación, configuración aplicada y errores." },
	{ item: "Conservar el flujo actual de respuesta por texto sin degradar latencia ni estabilidad." },
	{ item: "Permitir consulta posterior para análisis operativo y soporte." },
];

const intro =
	`<div>Se solicitó un <b>registro de log de peticiones</b> en Paty IA V4: cada consulta del chat debe dejar ` +
	`métricas y contexto técnico del ciclo (clasificación, modelo, tokens, tiempos y fallos) para seguimiento operativo.</div>`;

export async function buildBodyTK1432903(): Promise<string> {
	const [h3Objetivo, h3Alcance, h3Criterios] = await Promise.all([
		h3Iconized("mdi:target", "Objetivo"),
		h3Iconized("mdi:clipboard-text-outline", "Alcance"),
		h3Iconized("mdi:check-decagram", "Criterios de aceptación"),
	]);

	const objetivo = noteList(
		await note(
			"mdi:chart-timeline-variant",
			"Trazabilidad técnica y operativa de cada petición: tiempos, consumo de recursos, clasificación del tipo, configuración usada, errores y comportamiento general del flujo.",
		),
	);

	const alcance = noteList(
		await note(
			"mdi:file-document-outline",
			"Cada turno con <code>iconversacion</code> persiste el mismo JSON en archivo <code>conv-*.json</code> y en <code>CONVERSACION_LOG</code> (MERGE por <code>ICONVERSACION</code>). Variable <code>CONV_LOG_PERSIST_DB=false</code> desactiva solo la BD.",
		),
		await note(
			"mdi:link-variant",
			"Complementa TK-1431163/TK-1431662 (métricas por mensaje). Consulta: ISA-DOC <code>GET /api/patyia/conversacion/{id}/log</code>. Turnos fallidos incluyen <code>stream_ok: false</code> y mensaje de error.",
		),
	);

	const criterios = noteList(
		...(await Promise.all(
			CRITERIOS.map((c, i) => note("mdi:checkbox-marked-circle-outline", `${i + 1}. ${c.item}`)),
		)),
	);

	return intro + h3Objetivo + objetivo + h3Alcance + alcance + h3Criterios + criterios;
}

export const bodyTK1432903: Promise<string> = buildBodyTK1432903();
