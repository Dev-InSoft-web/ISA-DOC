// TK-1423165 — Plan de contenidos del curso: nomenclatura por nivel,
// atributos por nivel, apertura del catálogo de recurso y creación bajo el
// padre correcto.
import { code, img } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>El ingeniero reportó cuatro hallazgos sobre el módulo ` +
	`<b>Capacitación → Cursos → Plan de contenidos</b> (vista del árbol de ` +
	`capítulos / títulos del curso): nomenclatura de los campos del ` +
	`formulario según el nivel, restricción de atributos al último nivel, ` +
	`apertura automática del catálogo de recurso al crear un título y ` +
	`respeto del padre solicitante al insertar arriba, abajo o como hijo. ` +
	`Los cuatro se atendieron en la misma jornada y se documentan a ` +
	`continuación.</div>`;

export async function buildBodyTK1423165(): Promise<string> {
	const [h3Nomen, h3Atribs, h3Apertura, h3Padre, h3Bonus] = await Promise.all([
		h3Iconized("mdi:label-multiple-outline", "Nomenclatura de campos por nivel"),
		h3Iconized("mdi:tune-vertical", "Atributos de los capítulos según el nivel"),
		h3Iconized("mdi:cursor-default-click-outline", "Apertura del catálogo del recurso"),
		h3Iconized("mdi:family-tree", "Creación del recurso bajo el padre correcto"),
		h3Iconized("mdi:check-decagram-outline", "Mejoras adicionales del día"),
	]);

	const nomenNotes = await Promise.all([
		note(
			"mdi:form-textbox",
			`<b>Etiquetas del formulario del nodo</b>: las etiquetas “Código”, ` +
			`“Nombre”, “Atributos” se renderizaban genéricas, sin diferenciar el ` +
			`nivel. Ahora reflejan el nombre del nivel del curso: <i>Código del ` +
			`capítulo</i>, <i>Nombre del subcapítulo</i>, <i>Atributos del ` +
			`título</i>, etc. Los nombres de niveles vienen del propio curso ` +
			`(estructura definida en la pestaña “Estructura”).`,
		),
		note(
			"mdi:format-letter-case-lower",
			`<b>Coherencia visual</b>: los nombres de nivel se renderizan en ` +
			`minúsculas dentro de las etiquetas (“Nombre del título”, no “Nombre ` +
			`del Título”) para que se lean como prosa natural.`,
		),
		note(
			"mdi:folder-multiple-outline",
			`<b>Agrupadores autoconstruidos</b>: cuando el árbol recibe nodos ` +
			`hoja sin sus agrupadores intermedios, el componente los crea ` +
			`automáticamente y les asigna un nombre legible derivado del nivel ` +
			`(en lugar de “Sin nombre” o el código). Esta inyección queda ` +
			`detrás de un flag QA en falso por defecto: solo se activa cuando el ` +
			`dataset trae nodos sin sus padres y el ingeniero lo habilita.`,
		),
	]);

	const atribsNotes = await Promise.all([
		note(
			"mdi:eye-off-outline",
			`<b>Solo en el último nivel</b>: los atributos adicionales del nodo ` +
			`(URL diapositivas, Imagen del profesor, Driver de video, ` +
			`Dificultad, Documento, etc.) se mostraban en TODOS los niveles, ` +
			`incluso en capítulos intermedios donde no aplican. Ahora se ` +
			`muestran únicamente en el último nivel del plan, donde el nodo ya ` +
			`representa un título asociado a un recurso.`,
		),
		note(
			"mdi:bookmark-outline",
			`<b>Tema en todos los niveles</b>: el selector de tema sí se mantuvo ` +
			`disponible en todos los niveles, porque cualquier capítulo ` +
			`intermedio puede tener un tema asociado. Antes el selector quedó ` +
			`temporalmente restringido al último nivel; el ingeniero confirmó ` +
			`que aplica también a los niveles intermedios.`,
		),
		note(
			"mdi:source-branch-sync",
			`<b>Herencia automática</b>: al crear un nodo nuevo (en cualquier ` +
			`nivel), el sistema busca el primer ancestro con tema definido y ` +
			`hereda ese tema en el nodo nuevo. Así se evita capturar el mismo ` +
			`tema repetidamente en cada subcapítulo / título de un capítulo.`,
		),
	]);

	const aperturaNotes = await Promise.all([
		note(
			"mdi:auto-mode",
			`<b>Auto-apertura del catálogo</b>: al crear un nuevo título (último ` +
			`nivel), el catálogo de recursos se abre automáticamente sobre el ` +
			`drawer del nodo. El usuario llega directo a la lista de recursos en ` +
			`lugar de tener que ubicar y pulsar el selector.`,
		),
		note(
			"mdi:link-variant",
			`<b>Vínculo con el recurso seleccionado</b>: al elegir un recurso, ` +
			`tanto la llave (${code("irecurso")}) como la entidad anidada ` +
			`(${code("recurso")}) quedan asignadas en el nodo. El detalle del ` +
			`recurso (nombre, etc.) está disponible inmediatamente para los ` +
			`campos derivados del formulario, sin esperar al servidor.`,
		),
		note(
			"mdi:format-text-variant-outline",
			`<b>Autocompletado del nombre del título</b>: si el usuario aún no ` +
			`ha escrito el “Nombre del título”, al elegir un recurso se ` +
			`autocompleta con el nombre del recurso (${code("nrecurso")}). ` +
			`<u>Si el usuario ya escribió un nombre, no se sobreescribe</u>: el ` +
			`trabajo manual del usuario se respeta siempre.`,
		),
		note(
			"mdi:bug-check-outline",
			`<b>Causa raíz</b>: el callback que se enviaba al wrapper del ` +
			`selector se llamaba ${code("onRecursoSelected")}, pero la API real ` +
			`del componente expone únicamente ${code("onSelectedRecord")}. El ` +
			`callback se ignoraba silenciosamente porque caía en el spread de ` +
			`propiedades sin nombre. Se corrigió el nombre y se eliminó la prop ` +
			`sobrante del wrapper.`,
		),
	]);

	const padreNotes = await Promise.all([
		note(
			"mdi:source-branch",
			`<b>Insert Above / Below / Child con padre correcto</b>: las acciones ` +
			`para insertar un nodo arriba, abajo o como hijo respetan ahora el ` +
			`padre real del nodo solicitante. Antes, en escenarios con varios ` +
			`niveles abiertos, el nuevo registro caía en una rama distinta ` +
			`porque la ruta se calculaba contra el cursor del árbol y no contra ` +
			`el padre del nodo en cuestión.`,
		),
		note(
			"mdi:form-select",
			`<b>Drawer del nuevo registro</b>: al insertar, el formulario abre ` +
			`con los datos del <i>nuevo</i> nodo (no con los del nodo de ` +
			`partida). Antes el record que llegaba al drawer apuntaba a una ` +
			`copia desconectada del árbol, y los campos quedaban hidratados con ` +
			`el contenido del registro original.`,
		),
		note(
			"mdi:tree-outline",
			`<b>Estado de expansión preservado</b>: tras insertar (o eliminar) ` +
			`un nodo, el árbol se reconstruye internamente. Antes esa ` +
			`reconstrucción colapsaba todos los nodos y el usuario perdía la ` +
			`vista en la que estaba trabajando. Ahora el conjunto de nodos ` +
			`expandidos se preserva y se reaplica tras la mutación.`,
		),
	]);

	const bonusNotes = await Promise.all([
		note(
			"mdi:source-pull",
			`<b>Refactor del componente TreeView</b>: el componente compartido ` +
			`del módulo Capacitación dejó de tener conocimiento del dominio. ` +
			`Toda la especialización (nombres de niveles, herencia de campos, ` +
			`apertura del selector, atajos no navegacionales) se trasladó al ` +
			`side consumer (la vista del curso). Esto deja el componente listo ` +
			`para reutilizarse en otros módulos sin arrastrar lógica del plan ` +
			`de contenidos.`,
		),
		note(
			"mdi:rocket-launch-outline",
			`<b>Despliegue</b>: pendiente de definir ventana de despliegue a ` +
			`<a href="https://clientesis.azurewebsites.net/capacitacion/cursos" target="_blank" rel="noopener" style="color:dodgerblue;text-decoration:underline;"><span style="color:dodgerblue;">clientesis.azurewebsites.net/capacitacion/cursos</span></a>. ` +
			`No hubo cambios de paquetes ISP ni de servidor; solo ` +
			`${code("ISW-ClientesIS")}.`,
		),
	]);

	return (
		intro +
		img("treeContenidos.jpg", 480) +
		h3Nomen + noteList(...nomenNotes) +
		img("formularioEtiquetasCapitulo.jpg", 420) +
		h3Atribs + noteList(...atribsNotes) +
		img("formularioEtiquetasTitulo.jpg", 420) +
		h3Apertura + noteList(...aperturaNotes) +
		img("selectorRecursoAutoOpen.jpg", 480) +
		h3Padre + noteList(...padreNotes) +
		h3Bonus + noteList(...bonusNotes)
	);
}

export const bodyTK1423165: Promise<string> = buildBodyTK1423165();
