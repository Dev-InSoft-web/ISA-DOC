// TK-1430974 — Novedad al agregar cursos en "Cursos integrados" del plan
// de estudio. Desde la vista grande (formulario completo) el registro no
// se agrega al pulsar Aceptar; desde el formulario rápido el alta sí se
// realiza.

import { h3Iconized, note, noteList } from "../../../../lib/tk-helpers";
import { img } from "../../../../lib/snippets";

const intro =
	`<div>Se reporta que al <b>crear un plan de estudio</b> y agregar un  
	registro en la pestaña <b>Cursos integrados</b> desde la  
	<b>vista grande</b> (formulario completo), al pulsar <b>Aceptar</b>  
	el registro <b>no se agrega</b> al grid. Desde el  
	<b>formulario rápido</b> el alta sí se realiza correctamente.</div>`;

export async function buildBodyTK1430974(): Promise<string> {
	const [h3Solicitud, h3Diag, h3Solucion] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Reporte"),
		h3Iconized("mdi:magnify-scan", "Diagnóstico"),
		h3Iconized("mdi:check-circle-outline", "Solución"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:form-select",
			`<b>Vista grande (formulario completo):</b> en la pestaña  
			<code>Cursos integrados</code> se selecciona el curso, se pulsa  
			<b>Aceptar</b> y el registro <b>no aparece</b> en el grid.`,
		),
		await note(
			"mdi:check-circle-outline",
			`<b>Formulario rápido:</b> el mismo flujo sí realiza el alta y el  
			registro queda visible en el grid.`,
		),
		await note(
			"mdi:flask-outline",
			`La diferencia se reproduce <b>según el formulario</b> usado para  
			el alta (vista grande vs. rápido) sobre el mismo plan de estudio  
			en creación.`,
		),
	);

	const diag = noteList(
		await note(
			"mdi:filter-variant",
			`El problema ocurre porque el <code>submit</code> del formulario hijo  
			(drawer) es capturado por el form padre. Además, la lógica que decidía  
			crear o modificar dependía del parámetro global <code>itdForm</code>  
			en la URL, causando que en la vista grande (cuando el plan está en  
			<code>edit</code>) el drawer considere erróneamente que no debe crear.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:check-bold",
			`Se implementa la acción Svelte <code>interceptNestedSubmit</code> que  
			evita que el submit del hijo sea absorbido por el padre y delega la  
			acción explícitamente en <code>submitCurso()</code>.`,
		),
		await note(
			"mdi:database-edit-outline",
			`Se añade <code>normalizeItem(item)</code> en el controlador  
			<code>PlanDeEstudio</code> para asegurar campos obligatorios antes de  
			persistir (<code>iplanestudio</code> y <code>qorden</code>).`,
		),
		await note(
			"mdi:eye-outline",
			`Se ajusta <code>BtnRefAutoOpen</code> para que abra automáticamente  
			el selector cuando el valor está vacío (excepto en modo view), y se  
			refresca el grid tras la creación con <code>refreshGrid()</code>.` +
			img("planEstudioCursosIntegrados.jpg") +
			img("selectorRecursoAutoOpen.jpg") +
			img("contenidoPersistido.jpg"),
		),
	);

	return intro + h3Solicitud + solicitud + h3Diag + diag + h3Solucion + solucion;
}

export const bodyTK1430974: Promise<string> = buildBodyTK1430974();
