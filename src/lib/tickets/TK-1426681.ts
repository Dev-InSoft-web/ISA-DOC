// TK-1426681 — Error funcional de acciones Duplicar, Recodificar,
// Verificación y Consolidar en el catálogo de Cursos.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta error en el funcionamiento de las acciones  
	<b>Duplicar</b>, <b>Recodificar</b>, <b>Verificación</b> y  
	<b>Consolidar</b> dentro del catálogo de <b>Cursos</b>: las  
	operaciones devuelven mensajes de error como <i>"No se pudo  
	consolidar"</i> y <i>"No se pudo duplicar"</i>.</div>`;

export async function buildBodyTK1426681(): Promise<string> {
	const [h3Contexto, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:book-multiple-outline",
			`En el catálogo de <b>Cursos</b> se selecciona un registro y  
			se invocan las acciones extendidas <b>Duplicar</b>,  
			<b>Recodificar</b>, <b>Verificación</b> o <b>Consolidar</b>.`,
		),
		await note(
			"mdi:alert-octagon-outline",
			`Cada acción muestra un mensaje de error en pantalla  
			(<i>"No se pudo consolidar"</i>, <i>"No se pudo  
			duplicar"</i>, etc.) sin completar la operación.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:progress-wrench",
			`Ticket abierto. Pendiente revisar el endpoint que respalda  
			cada acción extendida del catálogo de cursos.`,
		),
	);

	return intro + h3Contexto + contexto + h3Estado + estado;
}

export const bodyTK1426681: Promise<string> = buildBodyTK1426681();
