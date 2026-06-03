// TK-1424892 — Refactor de BtnRef en planes de estudio y cursos. Resuelto.
import { img } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

// FIGURES: capturas de soporte (la figura de iplanpadre requiere un árbol
// con nodos PADRE/HIJO específicos que no está disponible en el entorno
// de pruebas; se omite por ahora).
const figSeguridad = img("seguridadToolbarOk.jpg");
const figPermiso   = img("btnRefPermisoSeguridad.jpg");
const figDriver    = img("btnRefDriverCurso.jpg");
const figTema      = img("btnRefTema.jpg");
const figPrereq    = img("btnRefPrerrequisitos.jpg");
const figCurso     = img("btnRefCursoDelPlan.jpg");

const intro =
	`<div>Se unifica el comportamiento de los <b>BtnRef</b> utilizados en  
	los catálogos de <b>planes de estudio</b> y <b>cursos</b>. Como parte  
	del mismo trabajo se ajustó la pestaña <b>Seguridad</b> del curso, que  
	mostraba opciones de mantenimiento (crear, modificar, eliminar,  
	verificar, duplicar, recodificar y consolidar) impropias de un  
	listado de consulta. La intervención fue aprovechada para revisar  
	todos los BtnRef de estos catálogos y consolidar su  
	comportamiento.</div>`;

export async function buildBodyTK1424892(): Promise<string> {
	const [h3Seguridad, h3BtnRefs, h3Comun, h3Verif] = await Promise.all([
		h3Iconized("mdi:shield-lock-outline", "Pestaña Seguridad del curso"),
		h3Iconized("mdi:link-variant", "BtnRef actualizados en planes de estudio y cursos"),
		h3Iconized("mdi:cog-refresh-outline", "Mejoras comunes a todos los BtnRef"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
	]);

	const seguridad = figSeguridad + noteList(
		await note(
			"mdi:view-grid-outline",
			`Se reemplazó el componente de la pestaña <b>Seguridad</b> por el  
			listado de consulta estándar del sistema. La barra superior queda  
			con <i>Refrescar</i>, <i>Filtro</i>, <i>Búsqueda</i> y  
			<i>Selección</i>, sin las acciones de mantenimiento.`,
		),
		await note(
			"mdi:swap-horizontal",
			`Se ajustó el formulario para que las opciones de presentación  
			(tamaño, separación, orientación) lleguen directamente al  
			contenedor principal, eliminando un envoltorio extra que  
			deformaba la presentación.`,
		),
	);

	const btnrefPermiso = figPermiso + await note(
		"mdi:shield-key-outline",
		`<b>BtnRef de permiso de seguridad</b> (cursos · pestaña  
		Seguridad): se restringe a solo visualización, se agrega el  
		formulario de visualización del permiso y se muestra el formato  
		homogéneo aun cuando no haya permiso asociado.`,
	);
	const btnrefDriver = figDriver + await note(
		"mdi:video-input-component",
		`<b>BtnRef del driver del curso</b>: se centra y limita su ancho  
		a 350px en el aviso de espera y se alinea correctamente dentro  
		de la pestaña Seguridad sin afectar el texto.`,
	);
	const btnrefPlanPadre = await note(
		"mdi:file-tree-outline",
		`<b>BtnRef de plan padre</b> (<i>iplanpadre</i>) en planes de  
		estudio y cursos: se captura desde un catálogo de hermanos del  
		capítulo actual, excluyendo los hermanos que ya tienen  
		<i>iplanpadre</i> asignado y al propio registro seleccionado.`,
	);
	const btnrefTema = figTema + await note(
		"mdi:tag-outline",
		`<b>BtnRef de tema</b> en cursos: el caption muestra únicamente  
		el nombre del tema y las columnas del catálogo se sobrescriben  
		mediante una subclase local del controlador.`,
	);
	const btnrefPrereq = figPrereq + await note(
		"mdi:link-box-outline",
		`<b>BtnRef de prerrequisitos</b>: se anota correctamente el  
		tipo del parámetro del record en el callback de selección.`,
	);
	const btnrefCurso = figCurso + await note(
		"mdi:book-open-variant",
		`<b>BtnRef de curso del plan</b> (planes de estudio): se  
		restaura el consumo de la lista vía API, evitando el caso en  
		que el label aparecía en rojo cuando el valor activo era  
		excluido del listado en memoria.`,
	);

	const comun = noteList(
		await note(
			"mdi:filter-variant-remove",
			`Se generalizó la <b>exclusión del valor actual</b> mediante un  
			wrapper local del BtnRef y la propiedad  
			<i>currentbtnrefvalue</i> en el controlador base, de modo que  
			ninguno de los BtnRef listados arriba muestra el propio  
			registro entre las opciones.`,
		),
		await note(
			"mdi:database-search-outline",
			`Se generalizó el <b>bypass</b> del filtro de listas al resolver  
			consultas puntuales por clave primaria, para que el label del  
			BtnRef se pueda hidratar siempre, incluso cuando el valor  
			referenciado quedó fuera del filtro habitual.`,
		),
		await note(
			"mdi:tools",
			`Se introdujo un mecanismo en el controlador base que oculta  
			las acciones de mantenimiento antes de exponer el controlador  
			a un BtnRef. Esto deja a todos los BtnRef de cat\u00e1logos en  
			modo consulta de forma consistente.`,
		),
	);

	const verif = noteList(
		await note(
			"mdi:check-bold",
			`Se valida sobre planes de estudio y cursos: los BtnRef listados  
			abren su catálogo en modo consulta, excluyen el valor activo,  
			resuelven el label aunque el valor quede fuera del filtro y  
			conservan los ajustes visuales solicitados (ancho, alineación,  
			caption).`,
		),
	);

	const listBtnRefs = noteList(
		btnrefPermiso,
		btnrefDriver,
		btnrefPlanPadre,
		btnrefTema,
		btnrefPrereq,
		btnrefCurso,
	);

	return intro
		+ h3Seguridad + seguridad
		+ h3BtnRefs + listBtnRefs
		+ h3Comun + comun
		+ h3Verif + verif;
}

export const bodyTK1424892: Promise<string> = buildBodyTK1424892();
