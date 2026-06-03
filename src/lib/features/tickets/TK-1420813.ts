// TK-1420813 — Campos modo visualización en edición de formulario rápido curso.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>El formulario rápido se abre desde el catálogo y debe limitarse a  
	<b>ocultar o mostrar</b> bloques, sin convertir el resto de campos en  
	solo lectura. Se reorganizó la regla que define qué campos quedan en  
	solo lectura para que el formulario rápido no afecte la edición de los  
	formularios internos. El estado editable depende ahora únicamente de la  
	acción seleccionada (crear, modificar o visualizar) y del propio detalle  
	que se esté abriendo.</div>`;

export async function buildBodyTK1420813(): Promise<string> {
	const [h3b, h3c] = await Promise.all([
		h3Iconized("mdi:file-document-edit-outline", "Detalles afectados"),
		h3Iconized("mdi:swap-horizontal", "Cambio de criterio para definir solo lectura"),
	]);
	const compareSemantico = note(
		"mdi:swap-horizontal",
		`La regla que decidía si un detalle del formulario debía ser de solo  
		lectura combinaba el modo del padre, el modo del propio detalle y el  
		hecho de venir desde el formulario rápido. Se retiró este último  
		ingrediente: ahora la editabilidad depende exclusivamente de que  
		padre e hijo estén ambos en modo visualización. Si cualquiera de los  
		dos está en creación o edición, el detalle vuelve a ser editable.`,
	);
	const items = await Promise.all([
		compareSemantico,
		note(
			"mdi:message-text-outline",
			`<b>Mensaje del curso (campo enriquecido) en General</b>: ya no  
			queda bloqueado por el hecho de venir del formulario rápido. Ahora  
			el campo se puede editar al ingresar por “Modificar” desde el  
			formulario rápido.`,
		),
		note(
			"mdi:format-list-bulleted",
			`<b>Estructura del curso</b>: el formulario interno deja de  
			heredar el bloqueo del formulario rápido y respeta su propia  
			acción (crear, modificar, visualizar) sin importar desde dónde se  
			invocó.`,
		),
		note(
			"mdi:shield-key-outline",
			`<b>Seguridad del curso</b>: se retiró el parámetro que mezclaba  
			el formulario rápido en la regla de solo lectura. Así se puede  
			agregar el permiso a una nueva seguridad cuando el usuario entra  
			desde el formulario rápido en modo crear o modificar.`,
		),
		note(
			"mdi:semantic-web",
			`<b>Criterio</b>: el formulario rápido <i>no</i> implica solo  
			lectura. Esta opción únicamente controla qué bloques se muestran  
			(detalles colapsados, pestañas ocultas, etc.); la posibilidad de  
			editar la decide la acción del usuario.`,
		),
	]);
	const figGeneral = img("cursoCrearGeneral.jpg");
	return (
		intro + figGeneral +
		h3c + (items[0] as string) +
		h3b + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items.slice(1).join("")}</ul>`
	);
}

export const bodyTK1420813: Promise<string> = buildBodyTK1420813();

