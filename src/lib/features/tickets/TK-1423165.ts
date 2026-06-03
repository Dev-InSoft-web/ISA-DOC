// TK-1423165 — Plan de contenidos del curso: nomenclatura por nivel,
// atributos por nivel, apertura del catálogo de recurso y creación bajo el
// padre correcto.
import { img } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reportaron cuatro hallazgos sobre el módulo  
	<b>Capacitación → Cursos → Plan de contenidos</b> (vista del árbol de  
	capítulos / títulos del curso): nomenclatura de los campos del  
	formulario según el nivel, restricción de atributos al último nivel,  
	apertura automática del catálogo de recurso al crear un título y  
	respeto del padre solicitante al insertar arriba, abajo o como hijo.  
	Los cuatro se atendieron en la misma jornada y se documentan a  
	continuación.</div>`;

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
			`<b>Etiquetas del formulario del nodo</b>: las etiquetas “Código”,  
			“Nombre” y “Atributos” se mostraban genéricas, sin diferenciar el  
			nivel del árbol. Ahora reflejan el nombre del nivel definido para  
			el curso: <i>Código del capítulo</i>, <i>Nombre del subcapítulo</i>,  
			<i>Atributos del título</i>, etc. Los nombres de niveles vienen  
			del propio curso (de su estructura definida en la pestaña  
			<i>Estructura</i>).`,
		),
		note(
			"mdi:format-letter-case-lower",
			`<b>Coherencia visual</b>: los nombres de nivel se muestran en  
			minúsculas dentro de las etiquetas (“Nombre del título”, no  
			“Nombre del Título”) para que se lean como una frase natural.`,
		),
		note(
			"mdi:folder-multiple-outline",
			`<b>Capítulos intermedios autogenerados</b>: cuando el árbol  
			recibe nodos del último nivel sin sus capítulos contenedores, el  
			sistema crea esos capítulos intermedios automáticamente y les  
			pone un nombre legible derivado del nivel, en lugar de quedar  
			como “Sin nombre”. Este comportamiento se activa solo cuando hace  
			falta, para no alterar los planes en los que el usuario ya  
			definió toda la estructura.`,
		),
	]);

	const atribsNotes = await Promise.all([
		note(
			"mdi:eye-off-outline",
			`<b>Solo en el último nivel</b>: los atributos adicionales del  
			nodo (URL de diapositivas, Imagen del profesor, Driver de video,  
			Dificultad, Documento, etc.) se mostraban en todos los niveles,  
			incluso en capítulos intermedios donde no aplican. Ahora se  
			muestran únicamente en el último nivel del plan, donde el nodo  
			ya representa un título asociado a un recurso.`,
		),
		note(
			"mdi:bookmark-outline",
			`<b>Tema en todos los niveles</b>: el selector de tema sí se  
			mantiene disponible en todos los niveles, porque cualquier  
			capítulo intermedio puede tener un tema asociado. En una versión  
			previa quedó temporalmente limitado al último nivel; se  
			confirmó posteriormente que también aplica a los niveles  
			intermedios.`,
		),
		note(
			"mdi:source-branch-sync",
			`<b>Herencia automática del tema</b>: al crear un nodo nuevo en  
			cualquier nivel, el sistema busca el primer capítulo padre que  
			ya tenga un tema definido y lo hereda en el nodo nuevo. Así se  
			evita tener que capturar el mismo tema repetidamente en cada  
			subcapítulo o título dentro de un mismo capítulo.`,
		),
	]);

	const aperturaNotes = await Promise.all([
		note(
			"mdi:auto-mode",
			`<b>Apertura automática del catálogo</b>: al crear un nuevo  
			título (último nivel), el catálogo de recursos se abre  
			automáticamente sobre la ventana del nuevo nodo. El usuario  
			llega directo a la lista de recursos, en lugar de tener que  
			ubicar y pulsar el selector.`,
		),
		note(
			"mdi:link-variant",
			`<b>Vínculo con el recurso seleccionado</b>: al elegir un  
			recurso, el nodo queda asociado tanto a la referencia interna  
			como a los datos visibles del recurso (nombre, etc.), de modo  
			que los campos derivados del formulario los muestran de  
			inmediato, sin necesidad de esperar al servidor.`,
		),
		note(
			"mdi:format-text-variant-outline",
			`<b>Autocompletado del nombre del título</b>: si el usuario aún  
			no ha escrito el “Nombre del título”, al elegir un recurso se  
			autocompleta con el nombre del recurso.  
			<u>Si el usuario ya escribió un nombre, no se sobreescribe</u>:  
			el trabajo manual del usuario se respeta siempre.`,
		),
		note(
			"mdi:bug-check-outline",
			`<b>Causa raíz</b>: la función que debía notificar la selección  
			al formulario estaba registrada con un nombre distinto al que  
			realmente esperaba el selector, por lo que la elección no  
			llegaba al nodo. Se ajustó el nombre y se eliminó la propiedad  
			obsoleta del envoltorio del selector.`,
		),
	]);

	const padreNotes = await Promise.all([
		note(
			"mdi:source-branch",
			`<b>Insertar arriba, abajo o como hijo del padre correcto</b>:  
			las acciones para insertar un nodo respetan ahora el padre real  
			del nodo solicitante. Antes, en escenarios con varios niveles  
			abiertos, el nuevo registro caía en una rama distinta porque la  
			ubicación se calculaba a partir del nodo seleccionado en  
			pantalla y no del padre del nodo en cuestión.`,
		),
		note(
			"mdi:form-select",
			`<b>Ventana del nuevo registro</b>: al insertar, el formulario  
			se abre con los datos del <i>nuevo</i> nodo (no con los del  
			nodo de partida). Antes la ventana mostraba una copia  
			desconectada del árbol y los campos aparecían cargados con el  
			contenido del registro original.`,
		),
		note(
			"mdi:tree-outline",
			`<b>Estado de expansión preservado</b>: tras insertar o eliminar  
			un nodo, el árbol se reconstruye internamente. Antes esa  
			reconstrucción colapsaba todos los nodos y el usuario perdía la  
			vista en la que estaba trabajando. Ahora se preserva el conjunto  
			de nodos abiertos y se restaura una vez aplicado el cambio.`,
		),
	]);

	const bonusNotes = await Promise.all([
		note(
			"mdi:source-pull",
			`<b>Limpieza del componente del árbol</b>: el componente de  
			árbol compartido del módulo de Capacitación se simplificó para  
			que no contenga reglas específicas de cursos. Las  
			particularidades (nombres de niveles, herencia de campos,  
			apertura del selector, etc.) quedaron del lado de la vista del  
			curso. Con esto el componente queda listo para reutilizarse en  
			otros módulos sin arrastrar lógica del plan de contenidos.`,
		),
		note(
			"mdi:rocket-launch-outline",
			`<b>Despliegue</b>: pendiente de definir ventana de despliegue a  
			<a href="https://clientesis.azurewebsites.net/capacitacion/cursos" target="_blank" rel="noopener" style="color:dodgerblue;text-decoration:underline;"><span style="color:dodgerblue;">clientesis.azurewebsites.net/capacitacion/cursos</span></a>.  
			No hubo cambios de servidor ni en la librería de componentes;  
			el ajuste es exclusivamente del sitio web de Clientes IS.`,
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

