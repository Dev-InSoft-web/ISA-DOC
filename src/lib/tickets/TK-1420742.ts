// TK-1420742 — Opciones para agregar contenido al crear curso.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se ampliaron las opciones para agregar y organizar el contenido al  
	crear o editar un curso, permitiendo configurar la estructura y el árbol  
	de contenidos sin tener que salir del formulario en el que se está  
	trabajando.</div>`;

export async function buildBodyTK1420742(): Promise<string> {
	const [h3a, h3b, h3c] = await Promise.all([
		h3Iconized("mdi:format-list-bulleted-type", "Selección de Driver desde la pestaña Estructura"),
		h3Iconized("mdi:file-tree-outline", "Mejoras al árbol de contenidos"),
		h3Iconized("mdi:palette-outline", "Refinamiento visual de avisos"),
	]);
	const items = await Promise.all([
		note(
			"mdi:cursor-default-click-outline",
			`En la pestaña <b>Estructura</b>, cuando el curso aún no tiene  
			driver asignado, ahora se ofrece un selector de <b>Driver</b>  
			directamente dentro del aviso “Esperando selección de Driver”.  
			Ya no es necesario volver a la pestaña <b>General</b> para  
			elegirlo.`,
		),
		note(
			"mdi:source-branch",
			`Al elegir un driver desde ese aviso, el curso lo toma de forma  
			inmediata y la pestaña de estructura se actualiza sola para  
			mostrar las opciones disponibles según el driver seleccionado.`,
		),
		note(
			"mdi:tree-outline",
			`Se mejoró la forma en que el árbol de contenidos prepara y  
			muestra los nodos, de manera que al agregar un recurso aparece  
			al instante en el lugar correcto, sin necesidad de refrescar el  
			formulario.`,
		),
		note(
			"mdi:numeric",
			`Se establecieron valores por defecto razonables para las  
			estructuras de un curso nuevo, evitando que el usuario tenga  
			que llenar campos repetitivos al comenzar.`,
		),
		note(
			"mdi:format-color-fill",
			`Los avisos del sistema se ajustaron visualmente para integrarse  
			mejor con los formularios: se afinó la transparencia del color  
			de fondo y se uniformaron las esquinas para que se vean  
			consistentes con los demás campos.`,
		),
		note(
			"mdi:semantic-web",
			`Se simplificó la versión compacta del aviso y se unificaron  
			los colores con los del aviso principal, de modo que toda la  
			familia de avisos tenga la misma apariencia.`,
		),
	]);
	const figAlert = img("estructuraAlertDriver.jpg");
	const figModal = img("driverBtnRefModal.jpg");
	return (
		intro +
		h3a + figAlert + figModal +
		`<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[0]}${items[1]}</ul>` +
		h3b + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[2]}${items[3]}</ul>` +
		h3c + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[4]}${items[5]}</ul>`
	);
}

export const bodyTK1420742: Promise<string> = buildBodyTK1420742();


