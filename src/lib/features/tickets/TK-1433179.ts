// TK-1433179 — Análisis de imágenes en Paty IA V4.

import { h3Iconized, note, noteList } from "./tk-helpers";

const CRITERIOS: Array<{ item: string }> = [
	{ item: "Recibir correctamente la imagen enviada desde el chat." },
	{ item: "Validar formato, tamaño y seguridad del archivo recibido." },
	{ item: "Definir cómo enviar la imagen al modelo junto con el texto del usuario." },
	{ item: "Integrar el uso de imagen sin afectar el flujo actual de preguntas solo texto." },
	{ item: "Ejecutar pruebas técnicas y funcionales básicas con imagen." },
	{ item: "Documentar limitaciones o consideraciones halladas en la implementación." },
	{ item: "Presentar el resultado al equipo en reunión para validar el comportamiento de Paty con imágenes." },
];

const intro =
	`<div>Se solicitó <b>análisis e implementación de imágenes</b> en Paty IA V4: procesar la imagen del chat junto con la consulta ` +
	`del usuario y usarla como contexto en la respuesta del asistente.</div>`;

export async function buildBodyTK1433179(): Promise<string> {
	const [h3Requerimiento, h3Criterios, h3Contexto] = await Promise.all([
		h3Iconized("mdi:image-search-outline", "Requerimiento"),
		h3Iconized("mdi:check-decagram", "Criterios de aceptación"),
		h3Iconized("mdi:information-outline", "Contexto técnico"),
	]);

	const requerimiento = noteList(
		await note(
			"mdi:chat-processing-outline",
			"Analizar e implementar el manejo de imágenes recibidas desde el chat para que se procesen junto con la consulta del usuario y se usen como contexto al generar la respuesta de Paty.",
		),
	);

	const criterios = noteList(
		...(await Promise.all(
			CRITERIOS.map((c, i) => note("mdi:checkbox-marked-circle-outline", `${i + 1}. ${c.item}`)),
		)),
	);

	const contexto = noteList(
		await note(
			"mdi:flask-outline",
			"En ISA-DOC existe panel de pruebas OpenAI/imágenes (<code>PatyIA · Actions</code>) para experimentar motores y adjuntos; este ticket formaliza el requisito productivo en el flujo del chat V4.",
		),
	);

	return intro + h3Requerimiento + requerimiento + h3Criterios + criterios + h3Contexto + contexto;
}

export const bodyTK1433179: Promise<string> = buildBodyTK1433179();
