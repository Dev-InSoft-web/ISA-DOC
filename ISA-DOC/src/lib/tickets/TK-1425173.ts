// TK-1425173 — Plan padre del recurso como catálogo filtrado. Resuelto.
import { img } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const figOcultoBasico = img("planPadreOcultoBasico.jpg");
const figBtnRef       = img("planPadreBtnRef.jpg");
const figCatalogo     = img("planPadreCatalogo.jpg");

const intro =
	`<div>Se solicitó que el campo <b>Plan padre</b> del recurso solo  
	apareciera disponible cuando la dificultad del recurso fuera <b>Medio</b>  
	o <b>Avanzado</b>, y que su captura no fuera un número libre, sino la  
	selección desde un catálogo de recursos de dificultad <b>Básico</b>  
	pertenecientes al mismo capítulo.</div>`;

export async function buildBodyTK1425173(): Promise<string> {
	const [h3Req, h3Plan] = await Promise.all([
		h3Iconized("mdi:format-list-checks", "Requerimientos"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
	]);

	const req = noteList(
		await note(
			"mdi:eye-off-outline",
			`Ocultar el campo <b>Plan padre</b> cuando la dificultad del  
			recurso es <b>Básico</b>.`,
		),
		await note(
			"mdi:eye-outline",
			`Mostrar el campo <b>Plan padre</b> únicamente cuando la  
			dificultad del recurso es <b>Medio</b> o <b>Avanzado</b>.`,
		),
		await note(
			"mdi:book-search-outline",
			`Reemplazar la captura libre por un selector que abra un catálogo  
			filtrado automáticamente por dificultad <b>Básico</b> y por el  
			mismo capítulo del recurso actual.`,
		),
		await note(
			"mdi:database-edit-outline",
			`Migrar <i>iplanpadre</i> de captura tipo número a tipo  
			<b>BtnRef</b>, lo que implica un <b>rediseño de los JConfig</b>  
			del atributo en la base de datos para declararlo como BtnRef  
			con su controlador y propiedades asociadas.`,
		),
	);

	const plan = noteList(
		await note(
			"mdi:eye-off-outline",
			`Se oculta el campo <b>Plan padre</b> cuando la dificultad es
			<b>Básico</b> y se muestra solo en <b>Medio</b> o <b>Avanzado</b>,
			con limpieza automática del valor al guardar en Básico.`,
		),
		await note(
			"mdi:book-search-outline",
			`El campo se renderiza como <b>BtnRef</b> contra un catálogo de
			hermanos del mismo capítulo con dificultad <b>Básico</b>,
			excluyendo al propio registro y a los hermanos que ya tienen
			un plan padre asignado.`,
		),
		await note(
			"mdi:label-outline",
			`El catálogo del BtnRef solo lista a los <b>hermanos del mismo
			capítulo</b> con dificultad <b>Básico</b>; no expone todos los
			recursos del árbol del contenido del curso.`,
		),
	);

	return intro + h3Req + req + h3Plan + figOcultoBasico + figBtnRef + plan + figCatalogo;
}

export const bodyTK1425173: Promise<string> = buildBodyTK1425173();
