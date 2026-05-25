// TK-1429349 — Modificación de controladores de server.
// Solicitud del ingeniero Pedro para desacoplar helpers dinámicos de los
// controladores y unificar el patrón de diseño SQL explícito.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>De acuerdo a la solicitud realizada por el ingeniero <b>Pedro</b>,  
	se requiere intervenir los <b>controladores de server</b> para  
	desacoplar helpers dinámicos y replicar el patrón de diseño explícito  
	que ya tienen los demás controladores.</div>`;

export async function buildBodyTK1429349(): Promise<string> {
	const [h3Solicitud, h3Estado] = await Promise.all([
		h3Iconized("mdi:tools", "Solicitud"),
		h3Iconized("mdi:clock-outline", "Estado"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:link-variant-off",
			`<b>Desacoplamiento de helpers:</b> eliminar el uso de utilidades  
			dinámicas como <code>sqlNesting</code>, <code>nestedConfig</code>,  
			<code>nestedDetailsCfg</code>, <code>syncDetails</code> y  
			<code>buildJData</code>.`,
		),
		await note(
			"mdi:database-edit-outline",
			`<b>SQL "quemado" y predecible:</b> replicar el patrón de diseño  
			explícito de los otros controladores, dejando las consultas y la  
			estructura del response declaradas directamente en cada controller  
			en vez de armarse dinámicamente.`,
		),
	);

	const estado = await note(
		"mdi:clock-outline",
		`<b>Abierto.</b> Pendiente de análisis y estimación.`,
	);

	return intro + h3Solicitud + solicitud + h3Estado + estado;
}

export const bodyTK1429349: Promise<string> = buildBodyTK1429349();
