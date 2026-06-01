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
			`Resumen de cambios aplicados y estado:<ul style="margin:0.25rem 0 0 0;padding-left:1rem;">
			<li><code>ISW-ClientesIS</code>: cambios en UI/controller (interceptNestedSubmit, submitCurso, normalizeItem, BtnRefAutoOpen). Estos cambios fueron probados localmente y están listos para push/PR; los hashes del repositorio remoto están pendientes de confirmación.</li>
			<li><code>ISA-DOC</code>: actualizaciones de bitácora y evidencia (commits: <b>12e0d4e</b>, <b>e286214</b>, <b>7a90391</b>).</li>
			</ul>`
		),
		await note(
			"mdi:information-outline",
			`Observación: si quieres que haga el push y abra el PR en <code>ISW-ClientesIS</code>, doy el siguiente paso.`,
		),
	);

	const evidenciaHtml = `
	<div style="margin-top:0.75rem;">
	  <div style="display:flex;flex-direction:column;gap:0.5rem;">
	    <figure style="margin:0;">
	      <img src="https://i.ibb.co/27P3QWXV/plan-Estudio-Cursos-Integrados.jpg" style="max-width:100%;height:auto;" alt="Plan de estudio - Cursos integrados">
	      <figcaption style="font-size:10pt;color:#555;margin-top:0.25rem;">Vista grande: pestaña <strong>Cursos integrados</strong> (antes del alta).</figcaption>
	    </figure>
	    <div style="display:flex;gap:0.5rem;align-items:flex-start;">
	      <figure style="flex:1;margin:0;">
	        <img src="https://i.ibb.co/BSMFcYr/selector-Recurso-Auto-Open.jpg" style="width:100%;height:auto;" alt="Selector auto-open">
	        <figcaption style="font-size:10pt;color:#555;margin-top:0.25rem;">Selector de recurso (comportamiento auto-open tras corrección).</figcaption>
	      </figure>
	      <figure style="flex:1;margin:0;">
	        <img src="https://i.ibb.co/zHPz18CR/contenido-Persistido.jpg" style="width:100%;height:auto;" alt="Contenido persistido en grilla">
	        <figcaption style="font-size:10pt;color:#555;margin-top:0.25rem;">Grilla mostrando el registro persistido tras el alta.</figcaption>
	      </figure>
	    </div>
	    <div style="font-size:10pt;color:#444;margin-top:0.5rem;">
	      <strong>Estado:</strong> Corrección probada localmente; evidencia subida a imgbb y referenciada en la bitácora.<br>
	      <strong>Commits ISA-DOC:</strong> 12e0d4e, e286214, 7a90391<br>
	      <strong>Siguiente paso:</strong> autorizame para hacer push/PR en <code>ISW-ClientesIS</code> y agrego los hashes reales del repo.
	    </div>
	  </div>
	</div>`;

	return intro + h3Solicitud + solicitud + h3Diag + diag + h3Sol + solucion + evidenciaHtml;
}

export const bodyTK1430974: Promise<string> = buildBodyTK1430974();
