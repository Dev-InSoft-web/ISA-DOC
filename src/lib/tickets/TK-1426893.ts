// TK-1426893 — Catálogo de curso vacío desde el plan de estudio
// al crear desde la pestaña "Cursos integrados".
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que en el catálogo de <b>Planes de estudio</b>,  
	pestaña <b>Cursos integrados</b>, al ejecutar la acción <b>Crear</b>  
	se abre el catálogo de cursos <b>vacío</b> (sin filas para  
	seleccionar) pese a existir cursos definidos en el sistema.</div>`;

export async function buildBodyTK1426893(): Promise<string> {
	const [h3Contexto, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:book-open-page-variant-outline",
			`Se ingresa a un plan de estudio y a la pestaña <b>Cursos  
			integrados</b>; al pulsar <b>Crear</b> se despliega un  
			selector de cursos.`,
		),
		await note(
			"mdi:database-off-outline",
			`El selector aparece con el mensaje <i>"No hay filas para  
			mostrar"</i>, aunque el catálogo de cursos del sistema sí  
			contiene registros.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:progress-wrench",
			`Ticket abierto. Por revisar la consulta/filtro del catálogo  
			de cursos en el contexto del plan de estudio.`,
		),
	);

	return intro + h3Contexto + contexto + h3Estado + estado;
}

export const bodyTK1426893: Promise<string> = buildBodyTK1426893();
