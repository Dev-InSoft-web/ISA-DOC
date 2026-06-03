// TK-1424809 — Menú de acciones incompleto en el catálogo de Cursos.
// Resuelto.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se reportó que el menú de acciones de los listados de  
	<b>Cursos</b> y <b>Planes de estudio</b> mostraba solo cinco opciones  
	(Crear, Visualizar, Modificar, Eliminar y Refrescar), cuando los demás  
	catálogos maestros del sistema también ofrecen <i>Verificar</i>,  
	<i>Duplicar</i>, <i>Recodificar</i> y <i>Consolidar</i>. El menú que  
	aparece al hacer clic derecho también quedaba recortado a tres  
	opciones.</div>`;

export async function buildBodyTK1424809(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
	]);

	const causaNotes = await Promise.all([
		note(
			"mdi:filter-remove-outline",
			`En la configuración de los catálogos del servidor, <b>Curso</b> y  
			<b>Plan de estudio</b> tenían restringido el conjunto completo  
			de acciones: se estaban excluyendo <i>Verificar</i>,  
			<i>Duplicar</i>, <i>Recodificar</i> y <i>Consolidar</i>, por lo  
			que el sistema solo recibía las acciones básicas y no las  
			mostraba en la barra superior ni en el menú contextual.`,
		),
	]);

	const fixNotes = await Promise.all([
		note(
			"mdi:format-list-checks",
			`Se retiró esa restricción para los catálogos <b>Curso</b> y  
			<b>Plan de estudio</b>. Ahora ambos exponen las ocho acciones  
			estándar de los maestros: <i>Crear</i>, <i>Modificar</i>,  
			<i>Visualizar</i>, <i>Listar</i>, <i>Eliminar</i>,  
			<i>Verificar</i>, <i>Duplicar</i>, <i>Recodificar</i> y  
			<i>Consolidar</i>.`,
		),
		note(
			"mdi:menu-open",
			`La barra superior y el menú contextual de cada listado se arman  
			automáticamente a partir de las acciones que reporta el  
			servidor, por lo que con el ajuste anterior ambos quedan  
			completos sin necesidad de tocar la aplicación.`,
		),
		note(
			"mdi:server-network",
			`Para que el cambio quede activo en el ambiente productivo debe  
			publicarse la actualización de los servicios de ContaPyme U.  
			Mientras tanto el cambio ya está funcionando en los ambientes  
			de pruebas y preproducción.`,
		),
	]);

	const verifNotes = await Promise.all([
		note(
			"mdi:check-bold",
			`Se validó sobre el catálogo de <i>Recursos</i> (que ya tenía las  
			ocho acciones) y sobre <i>Cursos</i> y <i>Planes de estudio</i>.  
			En los tres listados aparecen las acciones extendidas tanto en  
			la barra superior como en el menú que se despliega al hacer  
			clic derecho sobre una fila.`,
		),
	]);

	const ulOpen = `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">`;
	const figToolbar = img("cursosAccionesCompletas.jpg");
	const figContexto = img("cursosMenuContextual.jpg");
	return (
		intro + figToolbar +
		h3Causa + ulOpen + causaNotes.join("") + `</ul>` +
		h3Fix + ulOpen + fixNotes.join("") + `</ul>` +
		h3Verif + ulOpen + verifNotes.join("") + `</ul>` + figContexto
	);
}

export const bodyTK1424809: Promise<string> = buildBodyTK1424809();
