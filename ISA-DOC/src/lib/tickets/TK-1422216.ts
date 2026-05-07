// TK-1422216 — Función cargar recursos en plan de estudio. Resuelto.
import { code as codeI, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>El formulario rápido del catálogo de <b>Plan de Estudio</b> traía la pestaña ` +
	`<i>Cursos de plan de estudio</i> con un botón <b>Crear</b> que abría un action drawer ` +
	`vacío y daba la impresión de estar creando un recurso. Se rediseñó el flujo para que ` +
	`se abra el catálogo de cursos como ${codeI("BtnRef")}, se vinculen los datos seleccionados ` +
	`y, además, se modernizó por completo el resto del catálogo (Plan, Cursos del plan, ` +
	`Prerrequisitos, Visualización general) — todos los ajustes del día están relacionados.</div>`;

const ulOpen = `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">`;

export async function buildBodyTK1422216(): Promise<string> {
	const [h3Drawer, h3Cursos, h3Prereq, h3General, h3Layout] = await Promise.all([
		h3Iconized("mdi:cursor-default-click-outline", "Drawer Curso de Plan de Estudio"),
		h3Iconized("mdi:table-eye", "Columnas del grid Cursos integrados"),
		h3Iconized("mdi:source-branch", "Columnas del grid Prerrequisitos"),
		h3Iconized("mdi:tune-variant", "Pestaña General — Tipo de visualización"),
		h3Iconized("mdi:view-dashboard-outline", "Refactor de layout y simplificaciones"),
	]);

	// --- Drawer de creación / edición de curso del plan ---
	const drawerNotes = await Promise.all([
		note(
			"mdi:bug-check-outline",
			`<b>Causa raíz</b>: en el slot del drawer, ${codeI("<BtnRef bind:value={Item.icurso}>")} ` +
			`y ${codeI("<InputNumber bind:value={Item.qorden}>")} accedían a ${codeI("Item")} cuando aún ` +
			`era ${codeI("undefined")} (la action ${codeI("syncItem")} corre tras el primer render → crash silencioso). ` +
			`Los bindings ahora usan directamente el ${codeI("Obj")} del slot vía ` +
			`${codeI("{@const co = frmObj as TCursoDePlanDeEstudio}")} para conservar el tipo concreto.`,
		),
		note(
			"mdi:auto-mode",
			`<b>Auto-open en create</b>: nueva action ${codeI("self.autoOpenBtnRef")} sobre el wrapper del ` +
			`${codeI("BtnRef")}. Si ${codeI("itdForm === \"create\"")} y ${codeI("co.icurso")} está vacío, ` +
			`dispara ${codeI("click()")} en ${codeI(":scope button[aria-label=\"Open BtnRef\"]")} con ` +
			`${codeI("queueMicrotask")}. Bandera ${codeI("_autoOpenedFor")} por referencia para no re-disparar.`,
		),
		note(
			"mdi:eye-outline",
			`<b>Detalles readonly del curso seleccionado</b>: nombre, descripción, tema (${codeI("curso.tema.ntema")}), ` +
			`driver (${codeI("curso.driver.ndriver")}), recursos, duración, ${codeI("Switch")} de “Curso activo” / ` +
			`“Genera certificado” deshabilitados. El componente reutilizable se movió a ` +
			`${codeI("plandeestudio/_Details/utils/CursoReadOnly.svelte")}.`,
		),
		note(
			"mdi:link-variant",
			`<b>“Carga el nombre pero no setea el id”</b> (mismo patrón histórico que en ${codeI("ListSeguridad.svelte")} ` +
			`con permisos): ${codeI("bind:value")} a expresión casteada no actúa como setter bidireccional. ` +
			`Solución replicada: asignación explícita de la PK en el callback (${codeI("co.icurso = record.icurso")}), ` +
			`reasignación de la entidad anidada (${codeI("co.curso = record")}), trigger con contador ` +
			`${codeI("refresh++")} + ${codeI("{#key refresh}")} para forzar remontaje del subárbol.`,
		),
		note(
			"mdi:filter-variant",
			`Controlador slave: ${codeI("TCursosDePlanDeEstudioControllerSlave")} ` +
			`(${codeI("APIPivotController(TCursoController)")} con ${codeI("isysrecurso=\"PlanDeEstudio\"")}) — ` +
			`filtra en su ${codeI("Lista()")} los cursos ya asignados al plan.`,
		),
	]);

	// --- Columnas del grid cursos integrados ---
	const cursosNotes = await Promise.all([
		note(
			"mdi:table-column-plus-after",
			`Visibles por defecto: ${codeI("icurso")}, ${codeI("ncurso")}, ${codeI("qorden")}, ` +
			`${codeI("requisitos")} (conteo de prerrequisitos donde ${codeI("p.icurso === obj.icurso")}), ` +
			`${codeI("brequerido")}, ${codeI("bactivo")}.`,
		),
		note(
			"mdi:eye-off-outline",
			`Ocultas (${codeI("visible: false")}) — disponibles desde el column picker: ${codeI("itema")}, ` +
			`${codeI("ntema")}, ${codeI("idriver")}, ${codeI("ndriver")}, ${codeI("descripcion")} ` +
			`(con ${codeI("stripHtml")}), ${codeI("qduracion")}, ${codeI("qtotalrecursos")}, ` +
			`${codeI("bgeneracertificado")}.`,
		),
		note(
			"mdi:account-clock-outline",
			`Auditoría completa vía ${codeI("...ColOptionDatosCre, ...ColOptionDatosUlt")} ` +
			`(${codeI("TCursoDePlanDeEstudio extends TObjectBase")}).`,
		),
	]);

	// --- Columnas grid prereq ---
	const prereqNotes = await Promise.all([
		note(
			"mdi:eye-check-outline",
			`Visibles: ${codeI("cursoOwner")} (Curso) y ${codeI("cursoRequerido")} (Requisito). ` +
			`Ambos resuelven el ${codeI("ncurso")} buscando dentro de ` +
			`${codeI("entityMaster.cursosdeplanestudio")} — la lista del API trae solo PKs ` +
			`(${codeI("icurso")}, ${codeI("icursorequerido")}, ${codeI("iplanestudio")}).`,
		),
		note(
			"mdi:function-variant",
			`Helpers como arrow fn: ${codeI("findCursoDePlan(icurso)")} → ${codeI("TCursoDePlanDeEstudio")} ` +
			`(para acceder a ${codeI("qorden")}); ${codeI("findCursoEnPlan(icurso)")} → ${codeI("TCurso")} ` +
			`(tema, driver, descripción, duración, recursos, ${codeI("bactivo")}, ${codeI("bgeneracertificado")}).`,
		),
		note(
			"mdi:eye-off-outline",
			`Ocultas: ${codeI("icurso")}, ${codeI("icursorequerido")}, ${codeI("iplanestudio")} y para ambos ` +
			`extremos (Owner / Requerido) ${codeI("qorden*")}, ${codeI("itema*")}, ${codeI("ntema*")}, ` +
			`${codeI("idriver*")}, ${codeI("ndriver*")}, ${codeI("descripcion*")}, ${codeI("qduracion*")}, ` +
			`${codeI("qtotalrecursos*")}, ${codeI("bactivo*")}, ${codeI("bgeneracertificado*")}.`,
		),
		note(
			"mdi:database-off-outline",
			`Sin auditoría: ${codeI("TCursoPrerequisito extends TObject")} (no ${codeI("TObjectBase")}), ` +
			`por lo que no se aplican ${codeI("ColOptionDatosCre")} / ${codeI("ColOptionDatosUlt")}.`,
		),
	]);

	// --- General tab ---
	const generalNotes = await Promise.all([
		note(
			"mdi:form-dropdown",
			`Se reemplazó el ${codeI("SelectEnum")} (que duplicaba opciones cuando ${codeI("fnEnumCaption")} ` +
			`era función) por un ${codeI("<select>")} nativo con tres opciones: ` +
			`${codeI("Pestañas")} / ${codeI("Árbol")} / ${codeI("Organigrama")}.`,
		),
		note(
			"mdi:toggle-switch-off-outline",
			`Eliminado el ${codeI("Switch")} “Genera certificados” del bloque editable: pasó al fastdata ` +
			`para alinear con el comportamiento de los demás campos del plan.`,
		),
		note(
			"mdi:view-split-vertical",
			`Layout responsivo: en ${codeI("md+")} el selector de Tipo de visualización aparece a la ` +
			`izquierda y la <b>Previsualización</b> a la derecha; en ${codeI("sm")} se apilan. ` +
			`Previsualización con Iconify dentro de un recuadro punteado, siempre visible.`,
		),
		note(
			"mdi:link-off",
			`Se eliminó el import circular ${codeI("import { VISUALIZATION_CAPTIONS } from \"…/General.svelte\"")} ` +
			`hacia ${codeI("PlanDeEstudio.ts")} declarando el mapa local en el controller.`,
		),
	]);

	// --- Refactor layout ---
	const layoutNotes = await Promise.all([
		note(
			"mdi:flexbox",
			`Se eliminó el uso manual de ${codeI("display: flex; flex-direction: column;")} y de ` +
			`${codeI("gap")} en CSS. Toda la maquetación pasó a ${codeI("FlexLayout")} con sus props ` +
			`(${codeI("direction")}, ${codeI("gap")}, ${codeI("items")}, ${codeI("justify")}, ` +
			`${codeI("inline")}). No se usa ${codeI("gap")} en ${codeI("FlexLayout")} ni ${codeI("GridLayout")} ` +
			`anidados redundantes.`,
		),
		note(
			"mdi:code-tags",
			`Cuando un ${codeI("FlexLayout")} envolvía a otro, se colapsó al externo. ` +
			`CSS reducido al mínimo, con anidación nativa y un único bloque ${codeI(":global { … }")} ` +
			`por archivo. Eliminadas clases utilitarias muertas (${codeI("cro-flags")}, ${codeI("cro-stats")}, ` +
			`${codeI("cro-desc")}, etc.).`,
		),
		note(
			"mdi:resize",
			`<b>Dimensiones del grid de prerrequisitos</b>: cadena ${codeI("flex: 1 1 auto")} + ` +
			`${codeI("min-height: 0")} desde ${codeI(".cp-form-body")} hasta ${codeI(".cp-prereq-grid")}, ` +
			`con ${codeI("height: 100%")} en ${codeI(".cp-prereq-tab")} para que el ${codeI("TabItem")} ` +
			`propague la altura completa al ${codeI("Grid.svelte")}. ` +
			`Las filas ya se renderizan al insertar prerrequisitos.`,
		),
		note(
			"mdi:format-list-numbered",
			`Archivos tocados en este sweep: ${codeI("ListCursosDePlan.svelte")}, ` +
			`${codeI("ListPrerequisitosDePlan.svelte")}, ${codeI("CursoReadOnly.svelte")}, ` +
			`${codeI("General.svelte")}, ${codeI("Acciones.svelte")}, ${codeI("Catalogo.svelte")}, ` +
			`${codeI("Formulario.svelte")}.`,
		),
		note(
			"mdi:package-up",
			`Backend: nueva ruta para obtener plan de estudio con detalle (consumida por la UI para ` +
			`alimentar los detalles readonly del curso). Bump del paquete ` +
			`${codeI("@ingenieria_insoft/ispclientesis")} a ${codeI("1.0.162")}.`,
		),
	]);

	const figDescripcion = img("planEstudioCrearConfuso.jpg");
	const figPymeLegacy = img("planEstudioPymeLegacy.jpg");

	return (
		intro + figDescripcion + figPymeLegacy +
		h3Drawer + ulOpen + drawerNotes.join("") + `</ul>` +
		h3Cursos + ulOpen + cursosNotes.join("") + `</ul>` +
		h3Prereq + ulOpen + prereqNotes.join("") + `</ul>` +
		h3General + ulOpen + generalNotes.join("") + `</ul>` +
		h3Layout + ulOpen + layoutNotes.join("") + `</ul>`
	);
}

export const bodyTK1422216: Promise<string> = buildBodyTK1422216();
