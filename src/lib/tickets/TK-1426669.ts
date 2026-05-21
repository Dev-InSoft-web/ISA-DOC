// TK-1426669 — Forma del campo "Nombre de permiso" en seguridad del curso
// difiere del resto de campos del formulario.
//
// Diligencia: se unificó el formulario de Seguridad dejando un único BtnRef
// de Permiso tanto en Crear/Modificar como en Visualizar, y se ajustó el
// controlador para que el caption del registro ya seleccionado se resuelva
// correctamente vía lookup por PK (antes aparecía en rojo por la regla de
// exclusión).
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reporta que dentro de un curso, al crear o visualizar un  
	registro de <b>Seguridad</b>, el campo <b>Nombre de permiso</b> se  
	renderizaba con una <b>forma</b> distinta a la de los demás campos  
	del formulario, y en visualización el nombre aparecía en rojo.</div>`;

export async function buildBodyTK1426669(): Promise<string> {
	const [h3Contexto, h3Causa, h3Solucion, h3Evidencia, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:wrench-outline", "Solución"),
		h3Iconized("mdi:image-outline", "Evidencia"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:shield-account-outline",
			`En el detalle del curso, pestaña <b>Seguridad</b>, al  
			crear o visualizar un registro se abría un formulario con  
			dos representaciones distintas del campo de permiso,  
			rompiendo la consistencia visual.`,
		),
		await note(
			"mdi:alert-octagon-outline",
			`Adicionalmente, en visualización el nombre del permiso ya  
			seleccionado aparecía en rojo, porque la lista de  
			referencias excluía el registro actualmente seleccionado.`,
		),
	);

	const causa = noteList(
		await note(
			"mdi:filter-remove-outline",
			`El controlador de permisos del curso aplicaba la regla de  
			<b>exclusión</b> de registros ya asignados también para los  
			lookups puntuales por PK, dejando sin caption al valor ya  
			seleccionado.`,
		),
		await note(
			"mdi:vector-difference",
			`El formulario combinaba dos componentes diferentes para  
			modo edición y modo visualización, produciendo una forma  
			visual distinta entre ambas vistas.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:format-list-bulleted-square",
			`Se unificó la plantilla del formulario de <b>Seguridad</b>  
			dejando un único <b>BtnRef de Permiso</b> tanto en  
			Crear/Modificar como en Visualizar, controlando sólo el  
			estado <i>readonly</i> según la acción.`,
		),
		await note(
			"mdi:check-decagram-outline",
			`Se ajustó el controlador del catálogo para que, cuando el  
			filtro provenga de un lookup por PK, se omita la regla de  
			exclusión y el caption del permiso seleccionado se resuelva  
			correctamente.`,
		),
	);

	const evidencia = noteList(
		await note(
			"mdi:table-eye",
			`Listado de seguridad del curso con el registro existente.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426669/seguridad-lista.png"  
			alt="Listado de seguridad del curso"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:eye-outline",
			`Formulario en modo <b>Visualizar</b>: el nombre del  
			permiso ahora se resuelve correctamente (sin texto en  
			rojo) y se ve con la misma forma que en modo edición.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426669/seguridad-form-view.png"  
			alt="Formulario de seguridad en modo Visualizar"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:plus-box-outline",
			`Formulario en modo <b>Crear</b>: un único BtnRef de  
			Permiso, consistente con la vista de visualización.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426669/seguridad-form-crear.png"  
			alt="Formulario de seguridad en modo Crear"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`<b>Culminado.</b> Forma del campo unificada en ambas  
			vistas y caption del permiso resuelto correctamente al  
			visualizar un registro ya creado.`,
		),
	);

	return intro
		+ h3Contexto + contexto
		+ h3Causa + causa
		+ h3Solucion + solucion
		+ h3Evidencia + evidencia
		+ h3Estado + estado;
}

export const bodyTK1426669: Promise<string> = buildBodyTK1426669();
