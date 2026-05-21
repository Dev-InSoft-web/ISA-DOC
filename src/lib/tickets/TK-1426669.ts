// TK-1426669 — Forma del campo "Nombre de permiso" en seguridad del curso
// difiere del resto de campos del formulario.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que dentro de un curso, al crear un nuevo registro  
	de <b>Seguridad</b>, el campo <b>Nombre de permiso</b> tiene una  
	<b>forma</b> diferente a la que se usa en los demás campos del  
	formulario (estilo/altura/borde distintos).</div>`;

export async function buildBodyTK1426669(): Promise<string> {
	const [h3Contexto, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:shield-account-outline",
			`En el detalle del curso, pestaña <b>Seguridad</b>, al  
			crear un nuevo registro se abre un formulario con los  
			campos <b>Nombre de permiso</b> y <b>Permiso</b>.`,
		),
		await note(
			"mdi:format-paint",
			`El campo <b>Nombre de permiso</b> se renderiza con un  
			estilo visual distinto al de los demás campos del mismo  
			formulario, rompiendo la consistencia del diseño.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:progress-wrench",
			`Ticket abierto como ajuste del sistema. Pendiente unificar  
			el estilo del campo con el resto del formulario.`,
		),
	);

	return intro + h3Contexto + contexto + h3Estado + estado;
}

export const bodyTK1426669: Promise<string> = buildBodyTK1426669();
