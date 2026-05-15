// TK-1424911 — Error botón "Agregar" en pestaña "Contenido" al crear curso.
// Resuelto.
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reportó que, al crear un nuevo curso e ir a la pestaña  
	<b>Contenido</b>, al pulsar <b>Agregar</b> se abría el formulario del  
	nuevo nodo, se diligenciaban los datos y al pulsar <b>Aceptar</b> el  
	sistema mostraba el mensaje <i>“Procedimiento finalizado”</i>, pero el  
	árbol de contenidos quedaba vacío y el nodo no se guardaba.</div>`;

export async function buildBodyTK1424911(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
	]);

	const causa = noteList(
		await note(
			"mdi:share-variant-outline",
			`Cuando se está creando un curso nuevo, el sistema considera que  
			todo lo que se haga dentro del formulario es parte de esa  
			creación, no una modificación. El árbol de contenidos no  
			contemplaba ese escenario.`,
		),
		await note(
			"mdi:source-branch",
			`La rutina interna que cierra el guardado de un nodo solo estaba  
			preparada para los casos de <b>Modificar</b> y <b>Eliminar</b>,  
			y no para la primera inserción dentro de un curso nuevo. Por  
			esto, el sistema dejaba una marca interna abierta como si la  
			operación nunca se hubiera completado.`,
		),
		await note(
			"mdi:undo-variant",
			`Al cerrar la ventana donde se diligenció el nodo, el árbol  
			detectaba esa marca abierta y deshacía la inserción que se  
			acababa de hacer, por lo que el nodo desaparecía y el árbol  
			quedaba vacío.`,
		),
	);

	const fix = noteList(
		await note(
			"mdi:plus-circle-outline",
			`Se ajustó el cierre del guardado para que la operación de  
			<b>crear un nodo</b> se confirme igual que la de modificar:  
			se cierra la marca interna, se refresca el árbol y los datos  
			quedan sincronizados antes de cerrar la ventana del nuevo  
			contenido.`,
		),
	);

	const verif = noteList(
		await note(
			"mdi:check-bold",
			`Se valida creando un curso nuevo con árbol de contenidos  
			inicialmente vacío: se agregan dos nodos consecutivos y ambos  
			quedan guardados correctamente, sin que se deshagan al cerrar  
			la ventana del nodo.`,
		),
	);

	return intro + h3Causa + causa + h3Fix + fix + h3Verif + verif;
}

export const bodyTK1424911: Promise<string> = buildBodyTK1424911();

