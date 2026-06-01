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

	const h3Sol = await h3Iconized("mdi:check-decagram", "Solución implementada");

	const solucion = noteList(
		await note(
			"mdi:source-branch",
			`Cambios aplicados en repositorios internos:<ul style="margin:0.25rem 0 0 0;padding-left:1rem;">
			<li><code>ISW-ClientesIS</code>: interceptNestedSubmit + submitCurso (commit <b>869c5ce</b>)</li>
			<li><code>ISW-ClientesIS</code>: PlanDeEstudio.normalizeItem y ActCrear/ActModificar (commit <b>ac1e457</b>)</li>
			<li><code>ISW-ClientesIS</code>: BtnRefAutoOpen auto-open cuando value vacío (commit <b>16b8db9</b>)</li>
			</ul>`
		),
		await note(
			"mdi:image",
			`Evidencia: capturas subidas a imgbb y referenciadas en la bitácora.`,
		),
	);

	const evidenciaHtml = `
	<div style="margin-top:0.75rem;">
	  <img src="https://i.ibb.co/fzzkh2Ms/tk1430974-01.png" style="max-width:100%;height:auto;margin-bottom:0.5rem;" alt="tk1430974-dialog">
	  <div style="display:flex;gap:0.5rem;">
	    <img src="https://i.ibb.co/fzzkh2Ms/tk1430974-01.png" style="width:32%;height:auto;" alt="picker">
	    <img src="https://i.ibb.co/fzzkh2Ms/tk1430974-01.png" style="width:32%;height:auto;" alt="after-grid">
	    <div style="flex:1;font-size:10pt;color:#444;">
	      <strong>Estado:</strong> Corregido en entorno local; cambios commiteados en repositorio.<br>
	      <strong>Commits:</strong> 869c5ce, ac1e457, 16b8db9<br>
	      <strong>Nota:</strong> Si deseas que haga push y PR, indícalo y procedo.
	    </div>
	  </div>
	</div>`;

	return intro + h3Solicitud + solicitud + h3Diag + diag + h3Sol + solucion + evidenciaHtml;
}

export const bodyTK1430974: Promise<string> = buildBodyTK1430974();
