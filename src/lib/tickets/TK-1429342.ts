// TK-1429342 — Visualización de recurso desde "contenido" de un curso.
// Solicitud de UX: separar las acciones de previsualización y visualización
// dentro de la pestaña Contenido de un curso, alineando los íconos con los
// del catálogo de recursos.

import { h3Iconized, note, noteList } from "./tk-helpers";
import { img } from "./snippets";

const intro =
	`<div>Se solicita que, dentro de la pestaña <b>Contenido</b> de un curso,  
	las acciones asociadas a un recurso permitan <b>visualizar la configuración  
	del recurso</b> además de previsualizarlo. Hoy el ícono del ojo lleva a la  
	previsualización, y se requiere homologar los íconos con los del catálogo  
	de recursos.</div>`;

export async function buildBodyTK1429342(): Promise<string> {
	const [h3Contexto, h3Solicitud, h3Solucion] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:tools", "Solicitud"),
		h3Iconized("mdi:check-decagram-outline", "Solución aplicada"),
	]);

	const contexto = noteList(
		await note(
			"mdi:view-list-outline",
			`En la pestaña <b>Contenido</b> de un curso, cada recurso del árbol  
			expone un conjunto de acciones rápidas. Actualmente el ícono del  
			ojo dispara la <b>previsualización</b> del recurso.`,
		),
		await note(
			"mdi:swap-horizontal",
			`En el <b>catálogo de recursos</b> existe la separación clara entre  
			el ícono de <b>previsualizar</b> (catálogo) y el ícono del ojo para  
			<b>visualizar la configuración</b> del recurso. Se solicita  
			replicar esa convención en la pestaña Contenido.`,
		),
	);

	const solicitud = noteList(
		await note(
			"mdi:eye-outline",
			`Reservar el <b>ícono del ojo</b> para <b>visualizar la información  
			del recurso</b> (lectura del formulario con los campos del recurso,  
			tal como aparece en el catálogo de recursos).`,
		),
		await note(
			"mdi:image-search-outline",
			`Usar el <b>ícono de previsualizar</b> del catálogo de recursos  
			para la acción de previsualización del recurso dentro del árbol  
			de contenido del curso.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:eye-outline",
			`Se cambian las <b>acciones de cada recurso del árbol</b> para que  
			el ícono del ojo abra la <b>configuración del recurso</b> en un  
			drawer lateral (formulario homologado al del catálogo de recursos)  
			y se añade un ícono dedicado de <b>previsualización</b> que abre el  
			recurso en un modal de lectura, replicando las convenciones del  
			catálogo.` +
			img("tk1429342-acciones-recurso.png"),
		),
		await note(
			"mdi:dock-right",
			`El <b>drawer de configuración</b> hospeda el formulario completo  
			del recurso en modo rápido. Cancelar cierra el drawer sin navegar  
			fuera del curso, y aceptar guarda y cierra manteniendo al usuario  
			en la pestaña Contenido.` +
			img("tk1429342-drawer-recurso.png"),
		),
		await note(
			"mdi:image-search-outline",
			`La <b>previsualización</b> usa el modal de lectura del catálogo  
			de recursos, reaprovechando comentarios, relacionados y  
			descripción tal como aparecen en el catálogo.` +
			img("tk1429342-modal-preview.png"),
		),
		await note(
			"mdi:bug-check-outline",
			`Durante la integración se corrigieron además dos incidencias  
			detectadas: un ciclo de inicialización entre módulos al cargar el  
			wrapper del drawer y una <b>violación de llave primaria</b> al  
			guardar el recurso (provocada por datos residuales en  
			almacenamiento local del navegador). Ambas quedaron resueltas.`,
		),
	);

	return intro + h3Contexto + contexto + h3Solicitud + solicitud + h3Solucion + solucion;
}

export const bodyTK1429342: Promise<string> = buildBodyTK1429342();
