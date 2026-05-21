// TK-1426900 — Acción "Modificar" en "Cursos integrados" del plan de estudio
// no permite editar: el campo aparece en modo visualización.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que al dar clic en la acción <b>Modificar</b> de  
	la pestaña <b>Cursos integrados</b> dentro de un plan de estudio, el  
	campo del curso aparece en <b>modo visualización</b> y no permite  
	modificar ni reemplazar el curso actual.</div>`;

export async function buildBodyTK1426900(): Promise<string> {
	const [h3Contexto, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:book-open-page-variant-outline",
			`En el catálogo de <b>Planes de estudio</b>, pestaña  
			<b>Cursos integrados</b>, se selecciona un registro y se  
			activa la acción <b>Modificar</b>.`,
		),
		await note(
			"mdi:lock-outline",
			`El formulario abierto muestra el campo <b>Curso</b> como  
			solo lectura, impidiendo seleccionar otro curso o reemplazar  
			el actual.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:progress-wrench",
			`Ticket abierto. Pendiente de análisis del controlador del  
			catálogo de cursos integrados para habilitar la edición del  
			curso seleccionado.`,
		),
	);

	return intro + h3Contexto + contexto + h3Estado + estado;
}

export const bodyTK1426900: Promise<string> = buildBodyTK1426900();
