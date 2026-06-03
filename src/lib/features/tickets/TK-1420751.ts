// TK-1420751 — Catálogo de temas en cursos.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>El módulo de Capacitación tenía su propio listado de <b>temas</b>  
	independiente del que ya existía en el área de Soporte. Se unificó esta  
	gestión de modo que ahora ambos módulos consultan y mantienen el mismo  
	catálogo de temas.</div>`;

export async function buildBodyTK1420751(): Promise<string> {
	const h3 = await h3Iconized("mdi:tag-multiple-outline", "Catálogo unificado de Temas");
	const items = await Promise.all([
		note(
			"mdi:swap-horizontal",
			`Se retiró el listado de temas que vivía dentro del módulo de  
			Capacitación y se reemplazó por el <b>catálogo de temas de  
			Soporte</b>, que pasa a ser el único punto de gestión.`,
		),
		note(
			"codicon:type-hierarchy-sub",
			`Los formularios de Curso ahora consultan ese catálogo central a  
			través del selector de referencia estándar, en lugar de mantener  
			su propia copia local.`,
		),
		note(
			"mdi:file-document-edit-outline",
			`Se actualizaron los formularios de la pestaña <b>General</b> del  
			curso y el formulario de contenidos para que muestren y reciban  
			el tema desde el nuevo catálogo unificado.`,
		),
		note(
			"mdi:database-check-outline",
			`Beneficio: cualquier alta, edición o eliminación de tema desde  
			el catálogo de Soporte se refleja de inmediato en los  
			formularios de Curso, evitando duplicar el mantenimiento.`,
		),
	]);
	const fig = img("temaCatalogoModal.jpg");
	return intro + h3 + fig + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items.join("")}</ul>`;
}

export const bodyTK1420751: Promise<string> = buildBodyTK1420751();


