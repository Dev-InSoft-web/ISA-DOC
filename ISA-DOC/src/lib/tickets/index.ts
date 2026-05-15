import { buildTicketHtml } from "./template";
import { bodyTK1418894 } from "./TK-1418894";
import { bodyTK1420742 } from "./TK-1420742";
import { bodyTK1420751 } from "./TK-1420751";
import { bodyTK1420754 } from "./TK-1420754";
import { bodyTK1420755 } from "./TK-1420755";
import { bodyTK1420813 } from "./TK-1420813";
import { bodyTK1420819 } from "./TK-1420819";
import { bodyTK1422216 } from "./TK-1422216";
import { bodyTK1423165 } from "./TK-1423165";
import { bodyTK1424806 } from "./TK-1424806";
import { bodyTK1424809 } from "./TK-1424809";
import { bodyTK1424892 } from "./TK-1424892";
import { bodyTK1424911 } from "./TK-1424911";
import { bodyTK1425173 } from "./TK-1425173";

export interface TicketNormativa {
	medioAtencion: string;
	tipoSolicitud: string;
	estadoSolicitud: string;
	tipoSolucion: string;
	coberturaEstimada: string;
	cierre: string;
}

export interface TicketCommit {
	hash: string;
	descripcion: string;
	repo?: string;
}

export interface TicketRegistro {
	id: string;
	titulo: string;
	solicitante: string;
	fechaSolicitud: string;
	fechaEntrega?: string;
	enlace?: string;
	resumen?: string;
	estimacionMinutos?: number;
	commits?: TicketCommit[];
	body: Promise<string>;
	normativa: TicketNormativa;
}

const NORMATIVA_DEFAULT: TicketNormativa = {
	medioAtencion: "Sistema de soporte",
	tipoSolicitud: "1 - PQR proyecto (para uso AT e ING únicamente)",
	estadoSolicitud: "1 - Atención sin novedades",
	tipoSolucion: "No aplica",
	coberturaEstimada: "No aplica",
	cierre: "Sin cerrar",
};

export const TICKETS: TicketRegistro[] = [
	{
		id: "TK-1425173",
		titulo: "Asociación del recurso básico a los recursos medio y avanzado",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 04:12:25 pm",
		estimacionMinutos: 240,
		resumen: "Se solicitó que el campo iplanpadre solo apareciera disponible cuando el recurso tuviera como dificultad Medio o Avanzado, y que no se ingresara un número sino que se abriera un catálogo con los recursos con dificultad Básico del mismo capítulo.",
		commits: [
			{ hash: "6fd8618", descripcion: "feat(capacitacion): se muestra iplanpadre solo en dificultad media o avanzada y se limpia en otros casos" },
			{ hash: "41d7851", descripcion: "feat(capacitacion): se renderiza iplanpadre como btnref con controlador en memoria de hermanos" },
			{ hash: "df8c4e2", descripcion: "refactor(capacitacion): se traslada el controlador btnref de plan padre a la capa lib siguiendo la convencion" },
			{ hash: "ce2cc0a", descripcion: "fix(capacitacion): se excluyen del btnref de planpadre los hermanos que ya tienen un iplanpadre asignado" },
			{ hash: "4be6d99", descripcion: "fix(capacitacion): se excluye del btnref el hermano que ya esta seleccionado como iplanpadre del registro actual" },
			{ hash: "23701ba", descripcion: "fix(capacitacion): se conserva el iplanpadre al cambiar a basico y solo se borra al aceptar con esa dificultad" },
			{ hash: "7b05e62", descripcion: "fix(capacitacion): se actualiza visibilidad de iplanpadre en tiempo real al cambiar dificultad sin reabrir el drawer" },
			{ hash: "1578af9", descripcion: "fix(capacitacion): se resuelve el label del iplanpadre actual ignorando el filtro de exclusion en consultas puntuales por pk" },
			{ hash: "5a5cc76", descripcion: "fix(contapymeu): se hace reactivo el filtro del btnref de iplanpadre leyendo el valor en vivo del record" },
			{ hash: "fe95991", descripcion: "fix(cursos): se resuelve nombre del plan referenciado en iplanpadre fijando la PK del lookup" },
		],
		body: bodyTK1425173,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Ajuste del sistema" },
	},
	{
		id: "TK-1424911",
		titulo: "Error botón \"Agregar\" tab \"Contenido\" en catálogo cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 11:14:07 am",
		estimacionMinutos: 180,
		resumen: "Se reportó que al crear un nuevo curso y agregar contenidos, el botón Agregar abría el formulario, pero al aceptar el nodo no quedaba persistido y el árbol permanecía vacío pese al mensaje de procedimiento finalizado.",
		commits: [
			{ hash: "94f65a0", descripcion: "fix(capacitacion): se persiste el nodo nuevo cuando el arbol del curso recien creado esta vacio" },
			{ hash: "3a576ca", descripcion: "fix(capacitacion): se inicializa lista de planes al entrar al curso para habilitar agregar nodo raiz con arbol vacio" },
		],
		body: bodyTK1424911,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424892",
		titulo: "Acciones en catálogo de pestaña \"Seguridad\" de cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 10:57:32 am",
		estimacionMinutos: 90,
		resumen: "Se adjuntó captura indicando cómo debía verse el catálogo BtnRef de la pestaña Seguridad del curso: toolbar con refrescar, modo filtro y búsqueda, junto a las pestañas laterales de columnas y filtro, alineado con el resto de los catálogos del sistema.",
		commits: [
			{ hash: "8553b10", descripcion: "feat(capacitacion): se generaliza la exclusion del valor actual via proxy de controller en el wrapper btnref" },
			{ hash: "8839b11", descripcion: "fix(cursos): se restaura lista via api en btnref de permiso de seguridad evitando label en rojo al excluir el activo" },
			{ hash: "7d9b5fb", descripcion: "fix(capacitacion-seguridad): se muestra el formulario homogeneo aun sin permiso asociado" },
		],
		body: bodyTK1424892,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424809",
		titulo: "Menú de acciones incompleto",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 09:40:35 am",
		estimacionMinutos: 75,
		resumen: "Se reportó que el menú de acciones de los catálogos Cursos y Planes de estudio mostraba solo cinco acciones (Crear, Visualizar, Modificar, Eliminar y Refrescar) mientras que los demás catálogos maestros exponían también Verificar, Duplicar, Recodificar y Consolidar. El menú contextual del grid (clic derecho) también quedaba recortado a tres opciones.",
		body: bodyTK1424809,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424806",
		titulo: "Permisos de modificación con la acción “Visualizar” en el catálogo de cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 09:33:57 am",
		estimacionMinutos: 120,
		resumen: "En revisión de las acciones disponibles del catálogo de cursos se identificó que al ingresar por la opción Visualizar, en las pestañas ‘Estructura’ y ‘Seguridad’ se podían realizar modificaciones o crear información. Se solicitó que dicha opción no permitiera ninguna acción distinta a la consulta.",
		commits: [
			{ hash: "d170267", descripcion: "fix(capacitacion): se habilitan crear/modificar/eliminar en list-slaves cuando el master esta en edicion y se oculta visualizar del catalogo de permisos" },
			{ hash: "be7682f", descripcion: "fix(capacitacion): se propaga el modo view del master a las acciones de los list-slaves y se agrega formulario de visualizacion del permiso en el btnref" },
			{ hash: "7e770eb", descripcion: "fix(capacitacion): se restringe el catalogo de permisos del BtnRef a solo visualizacion" },
			{ hash: "121aff1", descripcion: "fix(capacitacion): se oculta la accion modificar en el slave relacional de seguridad y se agrega formulario de solo visualizacion del permiso" },
			{ hash: "bd77d38", descripcion: "fix(capacitacion): se controla acciones de list-slaves solo por itd externo, ignorando permisos del slave" },
		],
		body: bodyTK1424806,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1423165",
		titulo: "Plan de contenidos: etiquetas, atributos, autoapertura y padre correcto",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "08/may./2026",
		estimacionMinutos: 360,
		resumen: "Se reportaron cuatro hallazgos sobre el plan de contenidos del curso: (1) los campos del formulario del nodo debían usar la nomenclatura del nivel correspondiente para diferenciar capítulo y recurso, (2) los atributos adicionales debían mostrarse solo en el último nivel y no en capítulos intermedios, (3) el catálogo de recurso debía abrirse automáticamente al crear un título nuevo y autocompletar el nombre solo cuando estuviera vacío, y (4) las acciones de insertar arriba, abajo o como hijo debían crear el nuevo nodo bajo el padre correcto.",
		commits: [
			{ hash: "a3b13d5", descripcion: "feat(treeview): se ajustaron las etiquetas del formulario para reflejar el nombre del nivel en codigo, nombre y atributos" },
			{ hash: "1bd146c", descripcion: "style(treeview): se paso a minusculas el nombre del nivel en las etiquetas del formulario" },
			{ hash: "9ecab82", descripcion: "fix(capacitacion): se autocompleto el nombre del titulo con el nombre del recurso seleccionado cuando el titulo estaba vacio" },
			{ hash: "bae5e32", descripcion: "fix(capacitacion): se corrigieron los tipos del selector autoabierto del recurso" },
			{ hash: "69d6c66", descripcion: "feat(capacitacion): se incluyo el selector de tema en niveles intermedios y se abrio el selector de recurso al crear un nuevo titulo, ademas de heredar el tema del ancestro mas cercano" },
			{ hash: "1f242d4", descripcion: "fix(capacitacion): se restringio los selectores de tema y recurso al ultimo nivel del plan de contenidos" },
			{ hash: "4f75c36", descripcion: "fix(treeview): se abrio el formulario con los datos del nuevo registro al agregar arriba, abajo o como hijo" },
			{ hash: "d21af38", descripcion: "feat(treeview): se autoconstruyen los agrupadores faltantes para que ningun nodo quede huerfano sin importar su profundidad" },
			{ hash: "031068f", descripcion: "feat(treeview): se asignaron nomenclaturas legibles a los agrupadores autoconstruidos usando el nombre del nivel" },
			{ hash: "8b1fefe", descripcion: "fix(treeview): se corrigio la ruta de los hijos y hermanos para que respeten el padre solicitante" },
		],
		body: bodyTK1423165,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1422216",
		titulo: "Función cargar recursos en plan de estudio",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "07/may./2026 10:37:59 am",
		estimacionMinutos: 150,
		resumen: "En revisión del formulario rápido del catálogo de plan de estudio, se identificó que en la pestaña de “Cursos de plan de estudio” se exponía la opción Crear, lo cual resultaba confuso porque sugería la creación de un recurso, y al abrirla el action drawer quedaba en blanco. Se solicitó que en su lugar se abriera el catálogo de cursos para seleccionar los que debían quedar dentro del plan.",
		commits: [
			{ hash: "8f008b5", descripcion: "feat(TK-1422216): ajustar estilos y logica de visualizacion en la tabla de cursos" },
			{ hash: "4bea4bc", descripcion: "feat(TK-1422216): optimizar logica y diseno en General, ListCursosDePlan, ListPrerequisitosDePlan y CursoReadOnly" },
			{ hash: "4d2b93b", descripcion: "feat(components): agregar BtnRefAutoOpen y CursoReadOnly, optimizar logica en ListCursosDePlan y ListPrerequisitosDePlan" },
			{ hash: "5270e8a", descripcion: "feat(ListCursosDePlan): mejorar la gestion de cursos al agregar detalles del curso y prerrequisitos" },
			{ hash: "ef48d6e", descripcion: "feat(components): se renombro el titulo a 'Cursos integrados' en ListCursosDePlan y se mejoro la logica de exclusion en PlanDeEstudio" },
			{ hash: "6d15653", descripcion: "feat(components): se ajusto el controlador en PlanDeEstudio para excluir el curso actualmente activo de las listas" },
			{ hash: "c010af1", descripcion: "feat(plandeestudio): agregar gestion de prerrequisitos en ListPrerequisitosDePlan" },
		],
		body: bodyTK1422216,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420819",
		titulo: "Campos vacíos grid curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 02:03:59 pm",
		estimacionMinutos: 60,
		resumen: "En revisión de la grid del catálogo del curso, se identificó que los campos “Tema” y “Driver” aparecían vacíos aún cuando ya se habían diligenciado para los cursos.",
		commits: [
			{ hash: "6ce7d49", descripcion: "feat(cursos): ajustes varios en visualizador de cursos" },
			{ hash: "84f489b", descripcion: "feat(cursos): agrega presentacion de cursos con diferentes drivers" },
			{ hash: "6eb2d14", descripcion: "feat(cursos): eliminar columnas de opciones en TPermisoCursoController, TSeguridadCursoSlaveController y TDriverSlaveController; agregar columnas de creacion y ultima edicion" },
		],
		body: bodyTK1420819,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420813",
		titulo: "Campos modo visualización en edición de formulario rápido curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 12:26:30 pm",
		estimacionMinutos: 90,
		resumen: "Se reportó que, al revisar los campos disponibles desde la vista de formulario rápido del catálogo de curso, varios campos quedaban en modo visualización (mensaje, nombres de la estructura, los de crear con seguridad). Se solicitó que, siempre que se ingresara por modificar, esos campos quedaran editables.",
		commits: [
			{ hash: "b4745b8", descripcion: "refactor(TK-1420813): comentar la linea que establece TCapacitacionBaseClient.local como true" },
			{ hash: "c9b7784", descripcion: "refactor(TK-1420813): simplificar la logica de readonly en Detail.svelte, General.svelte, ListEstructura.svelte y ListSeguridad.svelte; agregar columnas de opciones en Cursos.ts" },
		],
		body: bodyTK1420813,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420755",
		titulo: "Mostrar fecha de creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:34:54 am",
		estimacionMinutos: 45,
		resumen: "Se solicitó que se mostrara la fecha de creación de cada curso en la vista correspondiente, para identificar cuándo fue registrado.",
		commits: [
			{ hash: "a740dd4", descripcion: "feat(TK-1420755): mejorar la gestion de titulos y recursos en Formulario.svelte y ContenidosTreeAdapter.ts; vincular treeAdapter en TreeContenidos.svelte" },
		],
		body: bodyTK1420755,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420754",
		titulo: "Nombres en niveles por defecto en creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:33:30 am",
		estimacionMinutos: 45,
		resumen: "Se solicitó que en la pestaña “Estructura”, al momento de crear un curso, se mostraran de manera predeterminada los nombres “Capítulo” y “Título” en los niveles, en lugar de aparecer como “Sin nombre”.",
		commits: [
			{ hash: "644b4da", descripcion: "feat(cursos): se generan automaticamente los niveles de estructura al seleccionar driver con nombres por defecto segun cantidad de niveles" },
		],
		body: bodyTK1420754,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420751",
		titulo: "Catálogo de temas en cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:29:58 am",
		estimacionMinutos: 180,
		resumen: "Se solicitó que en los cursos existiera un catálogo de temas reutilizable, de modo que los temas se seleccionaran y asociaran desde un catálogo en lugar de capturarlos manualmente cada vez.",
		commits: [
			{ hash: "1cde3e2", descripcion: "refactor(TK-1420751): actualizar importaciones y tipos en General.svelte y Formulario.svelte para mejorar la consistencia" },
			{ hash: "d7b29b1", descripcion: "feat(soporte): agrega asignaciones de tema" },
			{ hash: "9a7e706", descripcion: "fix(clientesis-temas): se muestra solo el nombre en el caption del btnref de tema" },
			{ hash: "32a7b4c", descripcion: "refactor(capacitacion): se sobrescribe columnsbtnref del tema mediante subclase local en cursos" },
		],
		body: bodyTK1420751,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420742",
		titulo: "Opciones para agregar contenido al crear curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:25:13 am",
		estimacionMinutos: 120,
		resumen: "Se solicitó que al crear un curso se ofrecieran más opciones para agregar contenido, permitiendo incorporar distintos tipos de material desde el formulario inicial.",
		commits: [
			{ hash: "2ca58b1", descripcion: "feat(TK-1420742): ajustar colores y agregar propiedades de estilo en Alert.svelte; actualizar importaciones en ListEstructura.svelte" },
			{ hash: "18fcc40", descripcion: "refactor(TK-1420742): simplificar propiedades y mejorar la semantica de color en Alert.svelte y AlertSimple.svelte; agregar metodos para preparar nodos en ContenidosTreeAdapter" },
		],
		body: bodyTK1420742,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1418894",
		titulo: "Documentación Postman",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "29/abr./2026 05:24:11 pm",
		fechaEntrega: "jueves 30 abril",
		estimacionMinutos: 400,
		enlace: "https://contapyme.sharepoint.com/:w:/s/Gestion_Documental_InSoft/IQBciHWK0N9nS7fos1kyCwxCATNJKQf_PAHwSH-ro5aEj08",
		resumen: "Se solicitó generar la documentación de la colección Postman con los endpoints del servicio, organizada y lista para consulta y entrega.",
		body: bodyTK1418894,
		normativa: { ...NORMATIVA_DEFAULT },
	},
];

export async function getTicketHtml(t: TicketRegistro): Promise<string> {
	return buildTicketHtml(await t.body, t.commits ?? []);
}
