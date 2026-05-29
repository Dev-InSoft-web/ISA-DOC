// TK-1430975 — Novedad al registrar cursos en pestaña Contenido del
// curso nuevo. El ojo de editar recurso abre el formulario vacío y los
// atributos del recurso no aparecen al consultarlo.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que durante la <b>creación</b> de un curso, al  
	agregar un recurso desde la pestaña <b>Contenido</b>, dos acciones  
	sobre el recurso recién agregado se comportan de forma distinta a  
	como lo hacen sobre un <b>curso ya existente</b>: el <b>ojo</b>  
	abre el formulario <b>vacío</b> y el <b>doble clic</b> abre la  
	vista de relación <b>sin los atributos del driver</b>.</div>`;

export async function buildBodyTK1430975(): Promise<string> {
	const [h3Solicitud, h3Diag] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Reporte"),
		h3Iconized("mdi:magnify-scan", "Diagnóstico tentativo"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:eye-off-outline",
			`<b>Ojo de editar recurso:</b> sobre un recurso agregado a un  
			curso <b>en proceso de creación</b>, el formulario del recurso  
			abre <b>vacío</b>. Sobre un curso <b>ya creado</b>, en cambio,  
			abre el recurso existente con toda su información.`,
		),
		await note(
			"mdi:gesture-double-tap",
			`<b>Doble clic sobre el recurso:</b> en un curso existente abre  
			la vista de <b>relación</b> (básico / medio / avanzado, padre,  
			etc.). En un curso en creación abre la misma vista pero <b>sin  
			los atributos del driver</b>.`,
		),
		await note(
			"mdi:flask-outline",
			`Ambos comportamientos se reproducen <b>únicamente en el flujo  
			de creación</b> del curso (no creando desde cero un curso ya  
			existente).`,
		),
	);

	const diag = noteList(
		await note(
			"mdi:swap-horizontal-variant",
			`Posible diferencia entre las vistas <code>edit</code> (curso  
			existente) y <code>create</code> (curso en creación) del  
			formulario / relación del recurso: en el branch de creación no  
			se estarían hidratando ni el recurso seleccionado ni los  
			atributos del driver.`,
		),
	);

	return intro + h3Solicitud + solicitud + h3Diag + diag;
}

export const bodyTK1430975: Promise<string> = buildBodyTK1430975();
