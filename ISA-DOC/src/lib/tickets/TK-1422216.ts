// TK-1422216 — Función cargar recursos en plan de estudio. Resuelto.
import { code, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>El formulario rápido del catálogo de <b>Plan de Estudio</b> traía la pestaña  
	<i>Cursos de plan de estudio</i> con un botón <b>Crear</b> que abría un panel lateral  
	vacío y daba la impresión de estar creando un recurso. Se rediseñó el flujo para que  
	directamente se abra el catálogo de cursos como selector y los datos del curso elegido  
	queden vinculados al plan. El resto del catálogo (Plan, Cursos del plan, Prerrequisitos  
	y Visualización general) se ajustó en el mismo trabajo: todos los cambios del día están  
	relacionados.</div>`;

const ulOpen = `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">`;

export async function buildBodyTK1422216(): Promise<string> {
	const [h3Drawer, h3Cursos, h3Prereq, h3General, h3Layout, h3Deploy] = await Promise.all([
		h3Iconized("mdi:cursor-default-click-outline", "Drawer Curso de Plan de Estudio"),
		h3Iconized("mdi:table-eye", "Columnas del grid Cursos integrados"),
		h3Iconized("mdi:source-branch", "Columnas del grid Prerrequisitos"),
		h3Iconized("mdi:tune-variant", "Pestaña General — Tipo de visualización"),
		h3Iconized("mdi:view-dashboard-outline", "Refactor de layout y simplificaciones"),
		h3Iconized("mdi:rocket-launch-outline", "Despliegue y pruebas"),
	]);

	const drawerNotes = await Promise.all([
		note(
			"mdi:bug-check-outline",
			`<b>Causa del drawer en blanco</b>: los campos del formulario intentaban leer el registro  
			del curso antes de que la inicialización lo creara, y al no encontrarlo el panel se  
			renderizaba vacío. Ahora los campos toman directamente el objeto que entrega el slot del  
			formulario, conservando su tipo, lo que evita la condición de carrera.`,
		),
		note(
			"mdi:auto-mode",
			`<b>Apertura automática del catálogo</b>: cuando se entra a “Crear” y todavía no se ha  
			elegido curso, el selector de curso se abre solo. Así el usuario llega directamente al  
			catálogo en lugar de ver un formulario sin contexto.`,
		),
		note(
			"mdi:eye-outline",
			`<b>Detalle del curso seleccionado en modo solo lectura</b>: una vez elegido el curso se  
			muestran nombre, descripción, tema, driver, total de recursos, duración y los indicadores  
			de “Curso activo” y “Genera certificado”, todos no editables. El bloque reutilizable  
			quedó como componente independiente para usarlo también en otras vistas.`,
		),
		note(
			"mdi:link-variant",
			`<b>“Carga el nombre pero no setea el id”</b>: era el mismo síntoma observado antes en el  
			módulo de seguridad. Al elegir un curso se mostraba el texto pero la llave no se  
			guardaba. Se aplicó la misma estrategia ya validada: asignar explícitamente la llave del  
			registro y refrescar la sección del formulario para que los campos dependientes vean el  
			nuevo valor.`,
		),
		note(
			"mdi:filter-variant",
			`<b>Filtrado de cursos disponibles</b>: el catálogo que se abre desde el plan ya excluye  
			los cursos que pertenecen al plan actual, evitando que se agreguen duplicados.`,
		),
	]);

	const cursosNotes = await Promise.all([
		note(
			"mdi:table-column-plus-after",
			`<b>Columnas visibles por defecto</b>: código del curso, nombre, orden dentro del plan,  
			cantidad de prerrequisitos asociados, indicador “Requerido” y estado “Activo”.`,
		),
		note(
			"mdi:eye-off-outline",
			`<b>Columnas adicionales bajo demanda</b>: tema, driver, descripción (sin etiquetas HTML),  
			duración, total de recursos y “Genera certificado”. Quedan ocultas por defecto pero  
			disponibles desde el selector de columnas, sin saturar la vista inicial.`,
		),
		note(
			"mdi:account-clock-outline",
			`<b>Auditoría completa</b>: se incluyeron las columnas estándar de creación y última  
			modificación (usuario y fecha) para alinearse con el resto de catálogos.`,
		),
	]);

	const prereqNotes = await Promise.all([
		note(
			"mdi:eye-check-outline",
			`<b>Columnas visibles</b>: <i>Curso</i> y <i>Requisito</i>, mostrando el nombre real de  
			cada uno. Como la lista del API trae sólo las llaves, el nombre se resuelve cruzando  
			contra los cursos del plan que ya están cargados en memoria.`,
		),
		note(
			"mdi:function-variant",
			`<b>Centralización de la consulta</b>: una sola utilidad localiza el curso del plan a  
			partir de su llave; tanto la columna del curso como la del requisito la reutilizan,  
			evitando lógica duplicada.`,
		),
		note(
			"mdi:eye-off-outline",
			`<b>Columnas adicionales</b>: para cada extremo (curso y requisito) se exponen, en modo  
			opcional, sus datos completos — tema, driver, descripción, duración, recursos, orden,  
			“Activo” y “Genera certificado” — disponibles desde el selector de columnas.`,
		),
		note(
			"mdi:function-variant-off",
			`<b>Generación parametrizada</b>: el bloque de columnas adicionales se construye con un  
			pequeño helper reutilizado dos veces (curso y requisito), reduciendo veinte definiciones  
			casi idénticas a una sola fuente de verdad.`,
		),
		note(
			"mdi:database-off-outline",
			`<b>Sin auditoría</b>: el prerrequisito es una relación pura entre dos cursos, por lo que  
			no aplica la auditoría de creación/modificación.`,
		),
	]);

	const generalNotes = await Promise.all([
		note(
			"mdi:form-dropdown",
			`<b>Tipo de visualización</b>: se conservó el componente estándar de selector usado en  
			el resto del sistema, con las opciones <i>Pestañas</i>, <i>Árbol</i> y <i>Organigrama</i>.  
			Antes había problemas de duplicación y de etiquetas en inglés; ahora se ve igual que los  
			demás selectores y muestra los nombres en español.`,
		),
		note(
			"mdi:eye-arrow-right-outline",
			`<b>Previsualización</b>: junto al selector se muestra un recuadro con el ícono y el  
			nombre del modo elegido, para que el usuario entienda visualmente el efecto sin tener  
			que cambiar de vista.`,
		),
		note(
			"mdi:toggle-switch-off-outline",
			`<b>Limpieza del bloque general</b>: se retiró el switch “Genera certificados” del  
			formulario editable porque pertenece a la información rápida del plan, alineándose con el  
			comportamiento de los demás campos.`,
		),
		note(
			"mdi:view-split-vertical",
			`<b>Layout adaptable</b>: en pantallas medianas o grandes el selector queda a la izquierda  
			y la previsualización a la derecha; en pantallas pequeñas se apilan para mantener todo  
			legible.`,
		),
	]);

	const layoutNotes = await Promise.all([
		note(
			"mdi:flexbox",
			`<b>Maquetación con componentes oficiales</b>: se reemplazaron los CSS manuales por los  
			componentes de layout del sistema, lo que da un comportamiento responsivo consistente y  
			evita estilos sueltos que se desincronizan con el resto de la aplicación.`,
		),
		note(
			"mdi:code-tags",
			`<b>CSS reducido al mínimo</b>: se eliminaron envoltorios y clases muertas, dejando  
			bloques pequeños y autocontenidos por archivo. El mantenimiento posterior es más simple  
			y los cambios visuales no afectan vistas vecinas.`,
		),
		note(
			"mdi:resize",
			`<b>Dimensiones del grid de prerrequisitos</b>: el grid no aparecía o se quedaba muy  
			pequeño cuando se insertaban filas. Se ajustó el flujo de alturas desde el contenedor  
			del formulario hasta el grid para que ocupe el espacio disponible y muestre las filas  
			tan pronto se agregan.`,
		),
		note(
			"mdi:format-list-numbered",
			`<b>Alcance del refactor</b>: la limpieza tocó la lista de cursos del plan, la lista de  
			prerrequisitos, el detalle de curso en solo lectura, las acciones, el catálogo, la  
			pestaña general y el formulario principal. Todos quedaron alineados al mismo estándar.`,
		),
		note(
			"mdi:package-up",
			`<b>Soporte de backend</b>: se publicó una ruta que devuelve el plan con el detalle  
			completo de sus cursos, lo que permite mostrar la información de solo lectura sin  
			consultas adicionales desde la UI.`,
		),
	]);

	const deployNotes = await Promise.all([
		note(
			"mdi:server",
			`<b>Servidor (ISS)</b>: se actualizó para soportar la asignación de íconos por fila  
			en los grids del módulo, de modo que el front pueda decorar cada registro según su tipo  
			o estado sin lógica adicional en el cliente.`,
		),
		note(
			"mdi:package-variant-closed",
			`<b>Paquetes compartidos (ISP)</b>: se ajustó el ${code("JData2HighDetail")}  
			de Plan de Estudio y de Curso para que viajen los datos completos necesarios y los  
			íconos se apliquen correctamente en las vistas que los consumen. Versiones publicadas:  
			${code("ispclientesis@1.0.162")} y ${code("ispclientesisserver@1.0.158")}.`,
		),
		note(
			"mdi:web",
			`<b>Cliente web (ISW)</b>: publicado para que las pruebas funcionales puedan hacerse en  
			<a href="https://clientesis.azurewebsites.net/capacitacion/planes/estudio" target="_blank" rel="noopener" style="color:dodgerblue;text-decoration:underline;"><span style="color:dodgerblue;">Planes de Estudio</span></a>  
			y en <a href="https://clientesis.azurewebsites.net/capacitacion/cursos" target="_blank" rel="noopener" style="color:dodgerblue;text-decoration:underline;"><span style="color:dodgerblue;">Cursos</span></a>.`,
		),
		note(
			"mdi:clock-outline",
			`<b>Cierre del día</b>: la jornada de trabajo sobre este ticket finalizó a las  
			<b>12:50</b>, tomando <b>20 minutos extra del horario de almuerzo</b> para dejar listo  
			el despliegue y las pruebas. Se deja constancia como muestra del compromiso con el  
			proyecto.`,
		),
	]);

	const figCatalogo = img("planEstudioCatalogo.jpg");
	const figGeneral = img("planEstudioGeneralTab.jpg");
	const figCursos = img("planEstudioCursosIntegrados.jpg");
	const figPrereq = img("planEstudioPrerequisitos.jpg");

	return (
		intro + figCatalogo +
		h3Drawer + ulOpen + drawerNotes.join("") + `</ul>` +
		h3Cursos + ulOpen + cursosNotes.join("") + `</ul>` + figCursos +
		h3Prereq + ulOpen + prereqNotes.join("") + `</ul>` + figPrereq +
		h3General + ulOpen + generalNotes.join("") + `</ul>` + figGeneral +
		h3Layout + ulOpen + layoutNotes.join("") + `</ul>` +
		h3Deploy + ulOpen + deployNotes.join("") + `</ul>`
	);
}

export const bodyTK1422216: Promise<string> = buildBodyTK1422216();
