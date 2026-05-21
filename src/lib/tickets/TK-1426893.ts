// TK-1426893 — Catálogo de curso vacío desde el plan de estudio
// al crear desde la pestaña "Requisitos".
import { h3Iconized, note, noteList } from "./tk-helpers";

const IMG_BASE = "/imgs/tickets/TK-1426893";
const imgStyle =
	`max-width:100%;max-height:380px;display:block;margin:0.5rem 0;border:1px solid #80808030;border-radius:4px;`;

const evidenciaContexto =
	`<img src="${IMG_BASE}/01-cursos-integrados-vacio.png" alt="Pestaña Cursos integrados sin filas para el plan PLAN002" style="${imgStyle}">`;

const evidenciaSolucion =
	`<img src="${IMG_BASE}/02-alert-deshabilitado.png" alt="Alert informativo y botón Crear deshabilitado en la pestaña Requisitos para cursos" style="${imgStyle}">`;

const intro =
	`<div>Se reporta que en el catálogo de <b>Planes de estudio</b>,  
	en la pestaña de <b>Requisitos</b> entre cursos, al pulsar  
	<b>Crear</b> el selector de cursos aparece <b>vacío</b>. Tras  
	analizar el flujo, <b>no se trata de un error funcional</b>: el  
	selector solo lista cursos del plan y, sin al menos dos cursos  
	integrados, no existen candidatos válidos para establecer una  
	relación curso → curso requerido.</div>`;

export async function buildBodyTK1426893(): Promise<string> {
	const [h3Aclaracion, h3Solucion, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Aclaración"),
		h3Iconized("mdi:tools", "Solución aplicada"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const aclaracion = noteList(
		await note(
			"mdi:link-variant",
			`Un requisito relaciona dos cursos del mismo plan  
			(<b>curso</b> y <b>curso requerido</b>). Si el plan tiene  
			menos de dos cursos integrados, no hay combinaciones  
			posibles y el selector queda sin filas. El comportamiento  
			es el esperado, pero la <b>experiencia</b> resulta confusa  
			porque no se comunica el motivo.`,
		),
		await note(
			"mdi:database-check-outline",
			`El catálogo general de cursos del sistema sí contiene  
			registros; lo que se filtra es la lista restringida al  
			plan de estudio actual.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:button-cursor",
			`La acción <b>Crear</b> de requisitos queda <b>deshabilitada</b>  
			mientras el plan no tenga al menos <b>2 cursos integrados</b>.`,
		),
		await note(
			"mdi:alert-circle-outline",
			`Se muestra un <b>alert</b> informativo en la cabecera de  
			la pestaña indicando el requisito mínimo y el número  
			actual de cursos integrados.`,
		),
		await note(
			"mdi:broom",
			`Si el plan tiene requisitos cuyos cursos ya no están  
			integrados (huérfanos), se <b>eliminan localmente</b> de  
			forma reactiva al cargar/editar el formulario y la  
			eliminación se persiste al hacer <b>submit</b>.`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`Ajuste entregado en el frontend del plan de estudio,  
			pestaña <b>Requisitos</b>.`,
		),
	);

	return intro + h3Aclaracion + aclaracion + evidenciaContexto + h3Solucion + solucion + evidenciaSolucion + h3Estado + estado;
}

export const bodyTK1426893: Promise<string> = buildBodyTK1426893();
