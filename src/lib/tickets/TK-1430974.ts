// TK-1430974 — Novedad al agregar cursos en "cursos integrados" del plan
// de curso. Desde el formulario completo no se agrega el registro; desde
// el formulario rápido sí.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que al <b>crear un plan de estudio</b> y agregar un  
	registro en la pestaña <b>Cursos integrados</b> desde la  
	<b>vista grande</b> (formulario completo), al pulsar <b>Aceptar</b>  
	el registro <b>no se agrega</b> a la grilla. Desde el  
	<b>formulario rápido</b> el alta sí se realiza correctamente.</div>`;

export async function buildBodyTK1430974(): Promise<string> {
	const [h3Solicitud, h3Diag] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Reporte"),
		h3Iconized("mdi:magnify-scan", "Diagnóstico tentativo"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:form-select",
			`Plan de estudio &rarr; pestaña <code>Cursos integrados</code>  
			desde la <b>vista grande</b> (formulario completo): se selecciona  
			el curso, se pulsa <b>Aceptar</b> y el registro <b>no aparece</b>  
			en la grilla.`,
		),
		await note(
			"mdi:check-circle-outline",
			`Mismo flujo desde el <b>formulario rápido</b>: el alta sí se  
			realiza y el registro queda visible en la grilla.`,
		),
	);

	const diag = noteList(
		await note(
			"mdi:filter-variant",
			`Posible <b>condición</b> específica del flujo de la vista grande  
			que bloquea la inserción en <code>Cursos integrados</code>; el  
			flujo del formulario rápido no la atraviesa.`,
		),
	);

	return intro + h3Solicitud + solicitud + h3Diag + diag;
}

export const bodyTK1430974: Promise<string> = buildBodyTK1430974();
