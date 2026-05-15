// TK-1420813 — Campos modo visualización en edición de formulario rápido curso.
import { code as codeI, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>El formulario rápido (${codeI("brapido = true")}) se abre desde el catálogo y debe limitarse a  
	<b>ocultar o mostrar</b> bloques, sin convertir el resto de campos en solo lectura. Se  
	refactorizó la lógica de ${codeI("readonly")} para que ${codeI("brapido")} no influya en la  
	editabilidad de los formularios internos. El estado editable depende ahora únicamente del  
	flujo principal (${codeI("itdForm")}) y del propio detalle.</div>`;

export async function buildBodyTK1420813(): Promise<string> {
	const [h3b, h3c] = await Promise.all([
		h3Iconized("mdi:file-document-edit-outline", "Detalles afectados"),
		h3Iconized("mdi:swap-horizontal", "Cambio de criterio en isDetailReadonly"),
	]);
	const compareSemantico = note(
		"mdi:swap-horizontal",
		`La función que decidía si un detalle del formulario debía ser de solo  
		lectura combinaba el modo del padre, el del propio detalle y la bandera  
		<code>brapido</code>. Se eliminó la dependencia de <code>brapido</code>  
		dejando que la editabilidad dependa exclusivamente de que <i>padre</i>  
		e <i>hijo</i> est\u00e9n ambos en modo visualización; cuando cualquiera de  
		los dos est\u00e1 en creación o edición, el detalle vuelve a ser editable.`,
	);
	const items = await Promise.all([
		compareSemantico,
		note(
			"mdi:message-text-outline",
			`<b>Mensaje (RichEditor) en General de Curso</b>: ${codeI("readonly={readonly || brapido}")}  
			pasó a ${codeI("readonly={readonly}")}; ahora el campo se puede editar al ingresar por “Modificar”  
			desde el formulario rápido.`,
		),
		note(
			"mdi:format-list-bulleted",
			`<b>Estructura del curso</b>: el ${codeI("frmReadonly")} interno ya no incluye  
			${codeI("brapido ||")}; el formulario interno respeta su propio ${codeI("itdForm")}  
			(create/edit/view) sin importar de dónde se invocó.`,
		),
		note(
			"mdi:shield-key-outline",
			`<b>Seguridad del curso</b>: ${codeI("isFrmReadonly")} eliminó el parámetro ${codeI("brapidoValue")};  
			ahora se puede agregar el permiso a una nueva seguridad cuando el usuario entra desde brapido en  
			modo create/edit.`,
		),
		note(
			"mdi:semantic-web",
			`Filosofía aplicada: <b>brapido ≠ onlyView</b>. La bandera solo controla qué bloques se renderizan  
			(detalles colapsados, tabs ocultas, fastdata, etc.); la editabilidad la decide el flujo de acción.`,
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

