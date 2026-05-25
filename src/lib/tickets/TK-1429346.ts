// TK-1429346 — Ajuste en tipo de visualización (plan de estudio).
// Renombrar y depurar las opciones del campo "Tipo de visualización" en
// los planes de estudio.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se solicita ajustar los <b>nombres de las opciones</b> del campo  
	<b>Tipo de visualización</b> en el plan de estudio para alinearlos con la  
	terminología funcional usada por los asesores.</div>`;

export async function buildBodyTK1429346(): Promise<string> {
	const [h3Cambios, h3Estado] = await Promise.all([
		h3Iconized("mdi:format-list-bulleted-type", "Cambios solicitados"),
		h3Iconized("mdi:clock-outline", "Estado"),
	]);

	const cambios = noteList(
		await note(
			"mdi:rename-box",
			`Renombrar la opción <code>Pestañas</code> por <code>Lista</code>.`,
		),
		await note(
			"mdi:rename-box",
			`Renombrar la opción <code>Organigrama</code> por <code>Pénsum</code>.`,
		),
		await note(
			"mdi:delete-outline",
			`Eliminar la opción <code>Árbol</code>.`,
		),
	);

	const estado = await note(
		"mdi:clock-outline",
		`<b>Abierto.</b> Pendiente de análisis y estimación.`,
	);

	return intro + h3Cambios + cambios + h3Estado + estado;
}

export const bodyTK1429346: Promise<string> = buildBodyTK1429346();
