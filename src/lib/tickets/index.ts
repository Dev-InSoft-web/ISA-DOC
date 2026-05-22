import { buildTicketHtml, tiempoTotalEstimadoMin } from "./template";
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
import { bodyTK1425170 } from "./TK-1425170";
import { bodyTK1425173 } from "./TK-1425173";
import { bodyTK1426669 } from "./TK-1426669";
import { bodyTK1426681 } from "./TK-1426681";
import { bodyTK1426728 } from "./TK-1426728";
import { bodyTK1426893 } from "./TK-1426893";
import { bodyTK1426900 } from "./TK-1426900";
import { bodyTK1428161 } from "./TK-1428161";

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
	ins?: number;
	del?: number;
	fecha?: string;
}

export interface TicketDbChange {
	sql: string;
	intencion: string;
	tabla?: string;
	registro?: string;
	jsonAntes?: string;
	jsonDespues?: string;
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
	diligenciaMinutos?: number;
	extraMinutos?: number;
	extraDescripcion?: string;
	commits?: TicketCommit[];
	cambiosBd?: TicketDbChange[];
	body: Promise<string>;
	normativa: TicketNormativa;
	festivos?: string[];
	noMaquillarFechas?: boolean;
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
		id: "TK-1428161",
		titulo: "Guardar visualización de columnas en catálogo de cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "21/may./2026 04:26:36 pm",
		estimacionMinutos: 210,
		diligenciaMinutos: 30,
		noMaquillarFechas: true,
		resumen: "Solicitud de persistencia de la selección de columnas visibles en los catálogos: al refrescar la página, las columnas no predeterminadas se volvían a ocultar. Se entregó la semana del 13/may./2026 una capa de persistencia en localStorage por controlador (clave con entrie) con rehidratación síncrona en el constructor / field initializer, aplicada de forma transversal a todos los catálogos de ContaPyme U.",
		commits: [
			{ hash: "67ccd5d", descripcion: "feat(contapymeu): se persisten visible y orderby de columnas por controlador en localStorage para todos los catalogos", repo: "ISW-ClientesIS", ins: 36, del: 1, fecha: "2026-05-13T11:41:57-05:00" },
			{ hash: "c021141", descripcion: "refactor(contapymeu): se anidan tipos de persistencia de columnas dentro del helper", repo: "ISW-ClientesIS", ins: 2, del: 3, fecha: "2026-05-13T11:43:31-05:00" },
			{ hash: "8e397c2", descripcion: "fix(contapymeu): se aplica persistencia de columnas de forma sincrona en el constructor para que el grid lea los valores ya rehidratados", repo: "ISW-ClientesIS", ins: 27, del: 17, fecha: "2026-05-13T11:47:23-05:00" },
			{ hash: "18fe88f", descripcion: "fix(contapymeu): se rehidrata el localStorage de columnas dentro del field initializer para que la grilla aplique persistencia desde el primer render", repo: "ISW-ClientesIS", ins: 29, del: 34, fecha: "2026-05-13T12:13:17-05:00" },
			{ hash: "22cda2c", descripcion: "refactor(contapymeu): se centraliza la definicion de columnas y se unifica el wrapper de lista para catalogos", repo: "ISW-ClientesIS", ins: 63, del: 71, fecha: "2026-05-13T12:28:25-05:00" },
			{ hash: "755a768", descripcion: "refactor(contapymeu): se incluye entrie en la clave de persistencia de columnas para reducir colisiones", repo: "ISW-ClientesIS", ins: 3, del: 2, fecha: "2026-05-13T12:33:26-05:00" },
			{ hash: "aca8048", descripcion: "feat(contapymeu): se registran las claves de columnas en un indice global y se expone una utilidad para reiniciar el estado almacenado", repo: "ISW-ClientesIS", ins: 24, del: 0, fecha: "2026-05-13T13:36:51-05:00" },
			{ hash: "d8b113d", descripcion: "refactor(contapymeu): se encapsula el registro de columnas en un singleton anonimo hermetico", repo: "ISW-ClientesIS", ins: 21, del: 22, fecha: "2026-05-13T13:37:49-05:00" },
			{ hash: "7c39581", descripcion: "refactor(contapymeu): se consolida la persistencia de columnas y se centraliza el proxy de acciones y la referencia comun", repo: "ISW-ClientesIS", ins: 28, del: 24, fecha: "2026-05-13T13:41:49-05:00" },
			{ hash: "93441f2", descripcion: "refactor(contapymeu): se anida el tipo auxiliar de columna en la unica funcion que lo consume", repo: "ISW-ClientesIS", ins: 1, del: 4, fecha: "2026-05-13T13:44:20-05:00" },
		],
		body: bodyTK1428161,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Ajuste del sistema" },
	},
	{
		id: "TK-1426900",
		titulo: "Acción modificar en \"Cursos integrados\" plan de estudio",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "19/may./2026 12:14:17 pm",
		estimacionMinutos: 90,
		diligenciaMinutos: 20,
		resumen: "Al dar clic en la acción Modificar, dentro de la pestaña \"Cursos integrados\" de un plan de estudio, el campo del curso aparece en modo visualización y no permite modificar ni reemplazar el curso actual. Se mantiene el bloqueo por integridad referencial (el curso es llave del detalle) y se añade un aviso informativo guiando al usuario a usar Eliminar + Crear para reemplazar el curso.",
		commits: [
			{ hash: "e3b1ea3", descripcion: "fix(TK-1426900): se anade aviso cuando el curso integrado no puede reemplazarse en accion modificar", repo: "ISW-ClientesIS", ins: 5, del: 0, fecha: "2026-05-21T17:14:02-05:00" },
		],
		body: bodyTK1426900,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1426893",
		titulo: "Catálogo de curso vacío al crear requisitos en plan de estudio",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "19/may./2026 12:07:31 pm",
		estimacionMinutos: 150,
		diligenciaMinutos: 30,
		extraMinutos: 20,
		extraDescripcion: "Análisis del flujo y reinterpretación del reporte",
		resumen: "Tras analizar el flujo, no se trata de un error funcional: el selector de la pestaña Requisitos sólo lista cursos del propio plan y, sin al menos dos cursos integrados, no hay combinaciones válidas. Se aplicó una mejora de experiencia: el botón Crear queda deshabilitado, se muestra un alert con el motivo y los requisitos huérfanos se eliminan localmente y se persisten al hacer submit.",
		commits: [
			{ hash: "eb99421", descripcion: "feat(TK-1426893): se desactiva crear requisitos sin minimo de cursos integrados y se limpian huerfanos", repo: "ISW-ClientesIS", ins: 17, del: 1, fecha: "2026-05-21T12:01:57-05:00" },
			{ hash: "24d8f7a", descripcion: "feat(TK-1426893): mejora la lógica de creación de prerrequisitos y se agrega un nuevo botón para selección automática", repo: "ISW-ClientesIS", ins: 33, del: 22, fecha: "2026-05-21T16:22:57-05:00" },
			{ hash: "4766a2e", descripcion: "feat(TK-1426893): integra GridResponsiveForm en MainFormLayout y actualiza la estructura del formulario", repo: "ISW-ClientesIS", ins: 3, del: 2, fecha: "2026-05-21T16:23:06-05:00" },
			{ hash: "3e74432", descripcion: "feat(TK-1426893): agrega soporte para filtrado y paginación en la lista de cursos y mejora la definición de columnas", repo: "ISW-ClientesIS", ins: 29, del: 2, fecha: "2026-05-21T16:23:20-05:00" },
			{ hash: "aa42b5c", descripcion: "fix(TK-1426893): el grid responsive del formulario calcula breakpoints por viewport y expone lerpw", repo: "ISW-ClientesIS", ins: 23, del: 3, fecha: "2026-05-21T16:30:35-05:00" },
			{ hash: "21ed486", descripcion: "fix(TK-1426893): el grid responsive del form usa block layout para medir el ancho del contenedor", repo: "ISW-ClientesIS", ins: 8, del: 27, fecha: "2026-05-21T16:32:20-05:00" },
			{ hash: "436a122", descripcion: "fix(TK-1426893): se estira el wrap del grid responsive al ancho completo del contenedor", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-21T16:35:49-05:00" },
			{ hash: "b23f982", descripcion: "refactor(TK-1426893): se desacopla el grid responsive del layout principal y se usa objjconfig en las cabeceras", repo: "ISW-ClientesIS", ins: 15, del: 21, fecha: "2026-05-21T17:04:14-05:00" },
		],
		body: bodyTK1426893,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1426728",
		titulo: "Información vacía del curso en pestaña \"Contenido\" del curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "19/may./2026 09:35:39 am",
		estimacionMinutos: 0,
		diligenciaMinutos: 20,
		extraMinutos: 20,
		extraDescripcion: "Revisión y ajuste de optimización",
		resumen: "El problema reportado no logró replicarse en distintos escenarios de prueba, tanto en el entorno local como en el ambiente publicado en clientesis.azurewebsites.net, donde se observó que la funcionalidad opera correctamente. Se aprovechó la revisión para optimizar la reactividad del árbol de contenido del curso, sin alterar la lógica funcional. Queda a la espera de pasos detallados o sesión guiada para reproducir el caso exacto.",
		commits: [],
		body: bodyTK1426728,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1426681",
		titulo: "Error funcional de acciones Duplicar, Recodificar, Verificación y Consolidar",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "19/may./2026 09:08:28 am",
		estimacionMinutos: 90,
		diligenciaMinutos: 45,
		resumen: "Se identificó que los clientes de Curso y Plan de Estudio heredaban los endpoints base sin sobreescribirlos, por lo que las acciones extendidas Verificación, Duplicar, Recodificar y Consolidar enviaban la petición a una ruta inexistente. Se definieron explícitamente los cuatro endpoints en cada cliente con el segmento del recurso correspondiente. QA contra el servidor confirma que las ocho llamadas llegan al manejador correcto y que la Verificación responde satisfactoriamente en ambas entidades. Las otras tres acciones quedan pendientes por un error server-side independiente en la validación SQL del parámetro de auditoría, reportado como issue aparte.",
		commits: [
			{ hash: "76edff7", descripcion: "feat(plan-estudio, curso): se agregan endpoints de verificar, duplicar, recodificar y consolidar en los clientes (TK-1426681)", repo: "ISP-ClientesIS", ins: 8, del: 0, fecha: "2026-05-21T10:15:34-05:00" },
			{ hash: "86d1832", descripcion: "fix(TK-1426681): se migran columnas de descripcion de text a varchar max en tablas de capacitacion", repo: "ISA-DOC", ins: 64, del: 3, fecha: "2026-05-21T10:57:30-05:00" },
			{ hash: "f056800", descripcion: "docs(TK-1426681): se agregan capturas de qa para verificar duplicar recodificar y consolidar de cursos y planes", repo: "ISA-DOC", ins: 0, del: 0, fecha: "2026-05-21T10:57:30-05:00" },
			{ hash: "b30c8ed", descripcion: "docs(TK-1426681): se actualiza descripcion del ticket con causas raiz y solucion completa", repo: "ISA-DOC", ins: 73, del: 42, fecha: "2026-05-21T10:57:30-05:00" },
			{ hash: "6a6e493", descripcion: "docs(TK-1426681): se agregan capturas de qa para crear y eliminar de cursos y planes de estudio", repo: "ISA-DOC", ins: 0, del: 0, fecha: "2026-05-21T11:05:16-05:00" },
			{ hash: "b8759fb", descripcion: "docs(TK-1426681): se documentan en el ticket las acciones crear y eliminar validadas en qa", repo: "ISA-DOC", ins: 44, del: 2, fecha: "2026-05-21T11:05:16-05:00" },
			{ hash: "642118e", descripcion: "docs(TK-1426681): se reorganizan capturas al estandar imgbb y se eliminan capturas obsoletas con error previo", repo: "ISA-DOC", ins: 120, del: 0, fecha: "2026-05-21T11:10:00-05:00" },
			{ hash: "8a5aa82", descripcion: "docs(TK-1426681): se refactoriza el ticket para usar el helper de imagenes con tamano estandar", repo: "ISA-DOC", ins: 25, del: 73, fecha: "2026-05-21T11:10:01-05:00" },
			{ hash: "ca4314b", descripcion: "fix(TK-1426681): se ajustan campos de auditoria para duplicar recodificar y consolidar", repo: "ISP-CLientesISServer", ins: 26, del: 1, fecha: "2026-05-21T11:14:58-05:00" },
			{ hash: "bd75f06", descripcion: "fix(TK-1426681): se habilita modo local en cliente base de cursos", repo: "ISW-ClientesIS", ins: 3, del: 1, fecha: "2026-05-21T11:14:59-05:00" },
			{ hash: "71efd7e", descripcion: "docs(TK-1426681): se reorganiza la evidencia como timeline en tabla y se agregan commits relacionados", repo: "ISA-DOC", ins: 77, del: 71, fecha: "2026-05-21T11:16:44-05:00" },
			{ hash: "c27b65a", descripcion: "refactor(TK-1426681): se centraliza tabla de timeline qa con helper compartido y se elimina seccion redundante de commits", repo: "ISA-DOC", ins: 61, del: 78, fecha: "2026-05-21T11:27:47-05:00" },
			{ hash: "ec3594f", descripcion: "feat(plan-estudio): se agregan metodos del server para insertar detalles y manejar cursos y prerrequisitos del plan de estudio (TK-1426681)", repo: "ISP-CLientesISServer", ins: 12, del: 13, fecha: "2026-05-21T10:15:03-05:00" },
		],
		body: bodyTK1426681,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1426669",
		titulo: "Forma del campo \"Nombre de permiso\" en seguridad del curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "19/may./2026 09:03:21 am",
		estimacionMinutos: 30,
		diligenciaMinutos: 20,
		resumen: "Se unificó el formulario de seguridad del curso dejando un único BtnRef de permiso tanto en crear/modificar como en visualizar, y se ajustó el controlador para resolver el caption del permiso ya seleccionado en lookups por PK, evitando que el nombre apareciera en rojo.",
		commits: [
			{ hash: "8ff29ec", descripcion: "fix(TK-1426669): se unifica el form de seguridad del curso con un solo btnref de permiso y se permite resolver caption en lookup por pk", repo: "ISW-ClientesIS", ins: 3, del: 23, fecha: "2026-05-21T08:34:38-05:00" },
		],
		body: bodyTK1426669,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Ajuste del sistema" },
	},
	{
		id: "TK-1425173",
		titulo: "Plan padre del recurso como catálogo filtrado",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 04:12:25 pm",
		estimacionMinutos: 200,
		diligenciaMinutos: 30,
		resumen: "Se solicitó que el campo iplanpadre solo apareciera disponible cuando el recurso tuviera como dificultad Medio o Avanzado, y que no se ingresara un número sino que se abriera un catálogo con los recursos con dificultad Básico del mismo capítulo.",
		commits: [
			{ hash: "6fd8618", descripcion: "feat(capacitacion): se muestra iplanpadre solo en dificultad media o avanzada y se limpia en otros casos", repo: "ISW-ClientesIS", ins: 23, del: 4, fecha: "2026-05-14T14:43:05-05:00" },
			{ hash: "41d7851", descripcion: "feat(capacitacion): se renderiza iplanpadre como btnref con controlador en memoria de hermanos", repo: "ISW-ClientesIS", ins: 85, del: 2, fecha: "2026-05-14T10:01:08-05:00" },
			{ hash: "df8c4e2", descripcion: "refactor(capacitacion): se traslada el controlador btnref de plan padre a la capa lib siguiendo la convencion", repo: "ISW-ClientesIS", ins: 35, del: 80, fecha: "2026-05-14T10:19:23-05:00" },
			{ hash: "ce2cc0a", descripcion: "fix(capacitacion): se excluyen del btnref de planpadre los hermanos que ya tienen un iplanpadre asignado", repo: "ISW-ClientesIS", ins: 89, del: 76, fecha: "2026-05-14T21:22:38-05:00" },
			{ hash: "4be6d99", descripcion: "fix(capacitacion): se excluye del btnref el hermano que ya esta seleccionado como iplanpadre del registro actual", repo: "ISW-ClientesIS", ins: 8, del: 13, fecha: "2026-05-14T21:31:01-05:00" },
			{ hash: "23701ba", descripcion: "fix(capacitacion): se conserva el iplanpadre al cambiar a basico y solo se borra al aceptar con esa dificultad", repo: "ISW-ClientesIS", ins: 14, del: 10, fecha: "2026-05-14T21:17:55-05:00" },
			{ hash: "7b05e62", descripcion: "fix(capacitacion): se actualiza visibilidad de iplanpadre en tiempo real al cambiar dificultad sin reabrir el drawer", repo: "ISW-ClientesIS", ins: 11, del: 8, fecha: "2026-05-14T18:24:17-05:00" },
			{ hash: "1578af9", descripcion: "fix(capacitacion): se resuelve el label del iplanpadre actual ignorando el filtro de exclusion en consultas puntuales por pk", repo: "ISW-ClientesIS", ins: 15, del: 0, fecha: "2026-05-14T21:35:12-05:00" },
			{ hash: "5a5cc76", descripcion: "fix(contapymeu): se hace reactivo el filtro del btnref de iplanpadre leyendo el valor en vivo del record", repo: "ISW-ClientesIS", ins: 5, del: 6, fecha: "2026-05-15T08:13:38-05:00" },
			{ hash: "fe95991", descripcion: "fix(cursos): se resuelve nombre del plan referenciado en iplanpadre fijando la PK del lookup", repo: "ISW-ClientesIS", ins: 2, del: 1, fecha: "2026-05-14T13:19:31-05:00" },
		
			{ hash: "d1c54a1", descripcion: "fix(capacitacion): se restaura lista via api en btnref de curso del plan, evita label en rojo", repo: "ISW-ClientesIS", ins: 7, del: 3, fecha: "2026-05-13T09:52:37-05:00" },
			{ hash: "a2696b3", descripcion: "fix(capacitacion): se normalizan claves de enums de atributos a mayuscula en form y comparacion de dificultad", repo: "ISW-ClientesIS", ins: 10, del: 8, fecha: "2026-05-14T16:56:16-05:00" },
			{ hash: "01fada5", descripcion: "refactor(capacitacion): se modela tipInfo/tipWarn y onSelectedRecord en FieldDef/BtnRefDefs y se migra General.svelte a Obj2Inputs con maxcells", repo: "ISW-ClientesIS", ins: 80, del: 56, fecha: "2026-05-13T16:14:17-05:00" },
			{ hash: "8594842", descripcion: "fix(capacitacion): se castea btnrefdefs a BtnRefDefs base al pasarlo a Attr2Input", repo: "ISW-ClientesIS", ins: 2, del: 1, fecha: "2026-05-13T16:28:36-05:00" },
			{ hash: "fd4cf7e", descripcion: "fix(cursos): se centra y limita el BtnRef de driver a 350px en el aviso de espera", repo: "ISW-ClientesIS", ins: 5, del: 3, fecha: "2026-05-14T07:37:42-05:00" },
			{ hash: "55439a0", descripcion: "refactor(form): se renombra btnrefdefs a controladores y se agrega soporte de tipo catalogo en Attr2Input", repo: "ISW-ClientesIS", ins: 49, del: 36, fecha: "2026-05-14T07:46:31-05:00" },
			{ hash: "9453b9c", descripcion: "feat(form): se mapea type btnref y controllername desde JCONFIG en jconfig2FieldDef", repo: "ISW-ClientesIS", ins: 8, del: 1, fecha: "2026-05-14T09:17:40-05:00" },
			{ hash: "5b5b6cf", descripcion: "refactor(refbase): se generaliza el bypass del filter2ReturnList ante consultas puntuales por pk para resolver labels del btnref", repo: "ISW-ClientesIS", ins: 14, del: 19, fecha: "2026-05-14T21:41:09-05:00" },
			{ hash: "8553b10", descripcion: "feat(capacitacion): se generaliza la exclusion del valor actual via proxy de controller en el wrapper btnref", repo: "ISW-ClientesIS", ins: 35, del: 6, fecha: "2026-05-15T08:55:37-05:00" },
			{ hash: "2041c48", descripcion: "refactor(capacitacion): se generaliza la exclusion del valor actual del btnref vía wrapper local y currentbtnrefvalue en el supercontrolador", repo: "ISW-ClientesIS", ins: 51, del: 17, fecha: "2026-05-15T08:24:06-05:00" },
			{ hash: "b1f6f03", descripcion: "refactor(capacitacion): se reemplazan los btnref restantes por el wrapper local btnref2", repo: "ISW-ClientesIS", ins: 9, del: 7, fecha: "2026-05-15T08:25:09-05:00" },
			{ hash: "f5451b0", descripcion: "fix(capacitacion): se corrige la ruta de importacion del wrapper btnref2 en el driver del curso", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-15T08:26:16-05:00" },
			{ hash: "3d1db79", descripcion: "fix(capacitacion): se anota el tipo del parametro record en el btnref de prerequisitos", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-15T08:29:40-05:00" },
			{ hash: "9a7e706", descripcion: "fix(clientesis-temas): se muestra solo el nombre en el caption del btnref de tema", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-15T09:07:57-05:00" },
			{ hash: "32a7b4c", descripcion: "refactor(capacitacion): se sobrescribe columnsbtnref del tema mediante subclase local en cursos", repo: "ISW-ClientesIS", ins: 10, del: 8, fecha: "2026-05-15T09:11:18-05:00" },
		],
		cambiosBd: [
			{
				tabla: "CAPAC_ATRIBUTOS_X_DRIVERS",
				registro: "IATRIBUTO = 1 (URL diapositivas)",
				intencion: "Se documenta bajo JCONFIG v2 el atributo de URL pública de las diapositivas asociadas al recurso para los drivers 1, 2 y 3. Se declara como InputText con placeholder de URL y límite de 500 caracteres, en reemplazo del JCONFIG plano sin tipo.",
				sql: "UPDATE CAPAC_ATRIBUTOS_X_DRIVERS\nSET JCONFIG = '{\"type\":\"InputText\",\"descripcion\":\"URL pública de las diapositivas asociadas al recurso.\",\"inputProps\":{\"placeholder\":\"https://...\",\"maxlength\":500}}'\nWHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 1;",
				jsonDespues: "{\n  \"type\": \"InputText\",\n  \"descripcion\": \"URL pública de las diapositivas asociadas al recurso.\",\n  \"inputProps\": {\n    \"placeholder\": \"https://...\",\n    \"maxlength\": 500\n  }\n}",
			},
			{
				tabla: "CAPAC_ATRIBUTOS_X_DRIVERS",
				registro: "IATRIBUTO = 2 (URL Imágen profesor)",
				intencion: "Se renombra el atributo a 'URL Imágen profesor' y se declara su JCONFIG v2 como InputText para la URL pública de la imagen del profesor, en los drivers 1, 2 y 3.",
				sql: "UPDATE CAPAC_ATRIBUTOS_X_DRIVERS\nSET NATRIBUTO = 'URL Imágen profesor',\n    JCONFIG = '{\"type\":\"InputText\",\"descripcion\":\"URL pública de la imagen del profesor.\",\"inputProps\":{\"placeholder\":\"https://...\",\"maxlength\":500}}'\nWHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 2;",
				jsonDespues: "{\n  \"type\": \"InputText\",\n  \"descripcion\": \"URL pública de la imagen del profesor.\",\n  \"inputProps\": {\n    \"placeholder\": \"https://...\",\n    \"maxlength\": 500\n  }\n}",
			},
			{
				tabla: "CAPAC_ATRIBUTOS_X_DRIVERS",
				registro: "IATRIBUTO = 3 (Driver de video)",
				intencion: "Se declara el atributo 'Driver de video' como SelectObject con la lista quemada de presentaciones disponibles (lista pequeña/grande, tarjeta completa, tarjeta solo título, lista compacta). Se documenta que la lista provendrá del controlador TTDriverRecurso cuando se aprueben controladores adicionales.",
				sql: "UPDATE CAPAC_ATRIBUTOS_X_DRIVERS\nSET JCONFIG = '{\"type\":\"SelectObject\",\"options\":{\"1\":\"Lista con imagen pequeña\",\"2\":\"Tarjeta con información completa\",\"3\":\"Tarjeta solo con título\",\"4\":\"Lista con imagen grande\",\"5\":\"Lista pequeño\"},\"descripcion\":\"Componente Svelte que procesa los datos del video. Lista quemada (TTDriverRecurso); se actualizará cuando se aprueben otros controladores.\"}'\nWHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 3;",
				jsonDespues: "{\n  \"type\": \"SelectObject\",\n  \"options\": {\n    \"1\": \"Lista con imagen pequeña\",\n    \"2\": \"Tarjeta con información completa\",\n    \"3\": \"Tarjeta solo con título\",\n    \"4\": \"Lista con imagen grande\",\n    \"5\": \"Lista pequeño\"\n  },\n  \"descripcion\": \"Componente Svelte que procesa los datos del video. Lista quemada (TTDriverRecurso); se actualizará cuando se aprueben otros controladores.\"\n}",
			},
			{
				tabla: "CAPAC_ATRIBUTOS_X_DRIVERS",
				registro: "IATRIBUTO = 4 (Dificultad)",
				intencion: "Se declara el atributo 'Dificultad' como SelectObject con las opciones Básico/Medio/Avanzado, alineado con el filtrado de iplanpadre y la normalización de claves en mayúscula.",
				sql: "UPDATE CAPAC_ATRIBUTOS_X_DRIVERS\nSET JCONFIG = '{\"type\":\"SelectObject\",\"options\":{\"B\":\"Básico\",\"M\":\"Medio\",\"A\":\"Avanzado\"},\"descripcion\":\"Nivel de dificultad del contenido.\"}'\nWHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 4;",
				jsonDespues: "{\n  \"type\": \"SelectObject\",\n  \"options\": {\n    \"B\": \"Básico\",\n    \"M\": \"Medio\",\n    \"A\": \"Avanzado\"\n  },\n  \"descripcion\": \"Nivel de dificultad del contenido.\"\n}",
			},
			{
				tabla: "CAPAC_ATRIBUTOS_X_DRIVERS",
				registro: "IATRIBUTO = 5 (iplanpadre)",
				intencion: "Se declara el atributo 'iplanpadre' como BtnRef con controlador iplanpadre, de modo que el campo se rinda como un catálogo de hermanos del capítulo actual sin requerir cambios en el cliente para nuevos drivers. Este cambio es el que materializa, a nivel de definición de campos, la solicitud del ticket: que iplanpadre se capture seleccionando un recurso del catálogo de hermanos y no escribiendo un número.",
				sql: "UPDATE CAPAC_ATRIBUTOS_X_DRIVERS\nSET JCONFIG = '{\"type\":\"BtnRef\",\"controllername\":\"iplanpadre\",\"descripcion\":\"Plan padre del contenido. Lista los hermanos del capítulo actual.\",\"inputProps\":{\"maxlength\":500}}'\nWHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 5;",
				jsonDespues: "{\n  \"type\": \"BtnRef\",\n  \"controllername\": \"iplanpadre\",\n  \"descripcion\": \"Plan padre del contenido. Lista los hermanos del capítulo actual.\",\n  \"inputProps\": {\n    \"maxlength\": 500\n  }\n}",
			},
			{
				tabla: "CAPAC_ATRIBUTOS_X_DRIVERS",
				registro: "IATRIBUTO = 6 (Documento)",
				intencion: "Se declara el atributo 'Documento' como InputText para la URL pública del documento adjunto al plan, en los drivers 1, 2 y 3.",
				sql: "UPDATE CAPAC_ATRIBUTOS_X_DRIVERS\nSET JCONFIG = '{\"type\":\"InputText\",\"descripcion\":\"URL pública del documento adjunto al plan.\",\"inputProps\":{\"placeholder\":\"https://...\",\"maxlength\":500}}'\nWHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO = 6;\n\nSELECT IDRIVER, IATRIBUTO, NATRIBUTO, JCONFIG\n  FROM CAPAC_ATRIBUTOS_X_DRIVERS\n WHERE IDRIVER IN (1, 2, 3) AND IATRIBUTO BETWEEN 1 AND 6\n ORDER BY IDRIVER, IATRIBUTO;",
				jsonDespues: "{\n  \"type\": \"InputText\",\n  \"descripcion\": \"URL pública del documento adjunto al plan.\",\n  \"inputProps\": {\n    \"placeholder\": \"https://...\",\n    \"maxlength\": 500\n  }\n}",
			},
			{
				tabla: "CAPAC_ATRIBUTOS_PLANES",
				registro: "Limpieza de filas con VALOR vacío",
				intencion: "Se eliminaron las filas de la tabla de atributos de planes cuyo VALOR estaba en NULL o se reducía a cadena vacía tras retirar espacios, tabulaciones y saltos de línea. Estas filas habían sido escritas antes de la normalización de claves de enums y de la unificación del manejo del campo iplanpadre, no aportaban información y ensuciaban las consultas de hidratación del catálogo del recurso padre. Se incluye verificación posterior con un conteo para confirmar que no quedan filas vacías.",
				sql: "SET NOCOUNT ON;\n\nDELETE FROM CAPAC_ATRIBUTOS_PLANES\n WHERE VALOR IS NULL\n    OR LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(VALOR, CHAR(9), ''), CHAR(10), ''), CHAR(13), ''))) = '';\n\nSELECT COUNT(*) AS filas_vacias_restantes\n  FROM CAPAC_ATRIBUTOS_PLANES\n WHERE VALOR IS NULL\n    OR LTRIM(RTRIM(REPLACE(REPLACE(REPLACE(VALOR, CHAR(9), ''), CHAR(10), ''), CHAR(13), ''))) = '';",
			},
			{
				tabla: "SEG_ACCIONESXROL",
				registro: "Alta de acciones extendidas para Cursos y PlanDeEstudio (INGCP / INGSENIOR)",
				intencion: "Se insertan en SEG_ACCIONESXROL las cuatro acciones extendidas (Consolidar, Duplicar, Eliminar, Recodificar) para los recursos Cursos y PlanDeEstudio bajo el rol INGSENIOR del grupo INGCP del tercero 810000630 con VALOR='true'. Sin estas filas el JWT del usuario no incluía bAllowed.{accion}=true para esos recursos y la grilla deshabilitaba los botones Verificar/Duplicar/Recodificar/Consolidar requeridos para operar sobre los planes y, en particular, para asociar el recurso básico al recurso medio o avanzado mediante iplanpadre. La migración es idempotente (NOT EXISTS por clave) y cierra con SELECT de verificación.",
				sql: "SET NOCOUNT ON;\n\nDECLARE @ITERCERO   VARCHAR(50) = '810000630';\nDECLARE @IGRUPO     VARCHAR(50) = 'INGCP';\nDECLARE @IROL       VARCHAR(50) = 'INGSENIOR';\nDECLARE @VALOR      VARCHAR(50) = 'true';\n\n;WITH NUEVAS AS (\n    SELECT ISYSRECURSO, IACCION\n    FROM (VALUES\n        ('Cursos',        'Consolidar'),\n        ('Cursos',        'Duplicar'),\n        ('Cursos',        'Eliminar'),\n        ('Cursos',        'Recodificar'),\n        ('PlanDeEstudio', 'Consolidar'),\n        ('PlanDeEstudio', 'Duplicar'),\n        ('PlanDeEstudio', 'Eliminar'),\n        ('PlanDeEstudio', 'Recodificar')\n    ) AS V(ISYSRECURSO, IACCION)\n)\nINSERT INTO SEG_ACCIONESXROL (ITERCERO, ISYSRECURSO, IACCION, IGRUPO, IROL, VALOR)\nSELECT @ITERCERO, N.ISYSRECURSO, N.IACCION, @IGRUPO, @IROL, @VALOR\nFROM NUEVAS N\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM SEG_ACCIONESXROL A\n    WHERE A.ITERCERO    = @ITERCERO\n      AND A.ISYSRECURSO = N.ISYSRECURSO\n      AND A.IACCION     = N.IACCION\n      AND A.IGRUPO      = @IGRUPO\n      AND A.IROL        = @IROL\n);\n\nSELECT ITERCERO, ISYSRECURSO, IACCION, IGRUPO, IROL, VALOR\nFROM SEG_ACCIONESXROL\nWHERE ITERCERO = @ITERCERO\n  AND IGRUPO   = @IGRUPO\n  AND IROL     = @IROL\n  AND ISYSRECURSO IN ('Cursos', 'PlanDeEstudio')\nORDER BY ISYSRECURSO, IACCION;",
			},
		],
		body: bodyTK1425173,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Ajuste del sistema" },
	},
	{
		id: "TK-1425170",
		titulo: "Atributos del título no cambian con el driver",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 04:08:20 pm",
		estimacionMinutos: 0,
		diligenciaMinutos: 30,
		resumen: "Se reporta que al seleccionar un título en la pestaña Contenido del curso los atributos mostrados no se filtran según el driver. El alcance requiere diálogo: si se trata de solo lectura no rompe el acuerdo inicial; si implica edición desde el curso, viola el acuerdo de que los recursos no se modifican desde el curso.",
		commits: [],
		body: bodyTK1425170,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424911",
		titulo: "Error botón \"Agregar\" tab \"Contenido\" en catálogo cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 11:14:07 am",
		estimacionMinutos: 150,
		diligenciaMinutos: 30,
		resumen: "Se reportó que al crear un nuevo curso y agregar contenidos, el botón Agregar abría el formulario, pero al aceptar el nodo no quedaba persistido y el árbol permanecía vacío pese al mensaje de procedimiento finalizado.",
		commits: [
			{ hash: "94f65a0", descripcion: "fix(capacitacion): se persiste el nodo nuevo cuando el arbol del curso recien creado esta vacio", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-13T16:58:38-05:00" },
			{ hash: "3a576ca", descripcion: "fix(capacitacion): se inicializa lista de planes al entrar al curso para habilitar agregar nodo raiz con arbol vacio", repo: "ISW-ClientesIS", ins: 2, del: 0, fecha: "2026-05-13T11:35:52-05:00" },
		
			{ hash: "ee91ea1", descripcion: "fix(capacitacion-tree): se corrige persistencia de selects, se sincroniza iplan al crear nodo y se hidrata recurso al seleccionar último nivel", repo: "ISW-ClientesIS", ins: 39, del: 9, fecha: "2026-05-13T08:22:37-05:00" },
			{ hash: "90db5af", descripcion: "fix(tree): se trata el click por fuera del drawer como cancelacion para descartar el nodo pendiente de insercion", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-13T13:58:57-05:00" },
			{ hash: "267d990", descripcion: "feat(form): objjconfig acepta nodos contenedores actiondrawer formjconfig flexlayout accionesgen y nodos de control if y slotdefault", repo: "ISW-ClientesIS", ins: 124, del: 4, fecha: "2026-05-14T11:14:29-05:00" },
			{ hash: "9dcdf9b", descripcion: "refactor(tree): se compacta la definicion de drawerstructure extrayendo el mensaje bloqueado y el nodo accionesgen a constantes intermedias", repo: "ISW-ClientesIS", ins: 20, del: 54, fecha: "2026-05-14T11:40:14-05:00" },
		],
		body: bodyTK1424911,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424892",
		titulo: "Refactor de BtnRef en planes de estudio y cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 10:57:32 am",
		estimacionMinutos: 240,
		diligenciaMinutos: 30,
		resumen: "Se unifica el comportamiento de los BtnRef usados en los catálogos de planes de estudio y cursos: permiso de seguridad, driver del curso, plan padre, tema, prerrequisitos y curso del plan. Se generaliza el wrapper de exclusión del valor actual y se ajusta el catálogo de la pestaña Seguridad a su rol de consulta.",
		commits: [
			{ hash: "8553b10", descripcion: "feat(capacitacion): se generaliza la exclusion del valor actual via proxy de controller en el wrapper btnref", repo: "ISW-ClientesIS", ins: 35, del: 6, fecha: "2026-05-15T08:55:37-05:00" },
			{ hash: "8839b11", descripcion: "fix(cursos): se restaura lista via api en btnref de permiso de seguridad evitando label en rojo al excluir el activo", repo: "ISW-ClientesIS", ins: 7, del: 2, fecha: "2026-05-14T11:52:55-05:00" },
			{ hash: "7d9b5fb", descripcion: "fix(capacitacion-seguridad): se muestra el formulario homogeneo aun sin permiso asociado", repo: "ISW-ClientesIS", ins: 18, del: 24, fecha: "2026-05-15T09:46:06-05:00" },
		
			{ hash: "f6922cd", descripcion: "feat: Refactoriza la lógica interna de los adaptadores del árbol y estandariza los componentes para la gestión de seguridad.", repo: "ISW-ClientesIS", ins: 90, del: 96, fecha: "2026-05-11T10:50:10-05:00" },
			{ hash: "6b95136", descripcion: "feat: Añade componentes para la gestión de estructura, seguridad y cursos de plan de estudio en la aplicación", repo: "ISW-ClientesIS", ins: 0, del: 0, fecha: "2026-05-11T12:07:26-05:00" },
			{ hash: "19b3925", descripcion: "refactor: Corrige la nomenclatura de la propiedad 'brapido' a 'bRapido' en componentes de formulario y actualiza las importaciones de seguridad y estructura", repo: "ISW-ClientesIS", ins: 7, del: 7, fecha: "2026-05-11T12:08:13-05:00" },
			{ hash: "32d1e0f", descripcion: "fix: TK-1420654 Corrige error visual del BtnRef que muestra el span cuando apenas esta cargando", repo: "ISP-SvelteComponents", ins: 1, del: 1, fecha: "2026-05-11T12:10:41-05:00" },
			{ hash: "3f54a0d", descripcion: "refactor: Mejora la tipificación de propiedades en SeguridadAcciones y SeguridadCatalogo para mayor claridad y consistencia", repo: "ISW-ClientesIS", ins: 5, del: 8, fecha: "2026-05-11T12:57:15-05:00" },
			{ hash: "68ea14a", descripcion: "refactor: Reorganiza importaciones y mejora la estructura de componentes en Detail, GridResponsiveForm, SecurityLayout, SeguridadAcciones y SeguridadCatalogo", repo: "ISW-ClientesIS", ins: 22, del: 67, fecha: "2026-05-11T13:03:20-05:00" },
			{ hash: "28b3100", descripcion: "refactor: Actualiza rutas de importación y reorganiza componentes de seguridad en el proyecto", repo: "ISW-ClientesIS", ins: 8, del: 8, fecha: "2026-05-11T13:08:13-05:00" },
			{ hash: "d1c54a1", descripcion: "fix(capacitacion): se restaura lista via api en btnref de curso del plan, evita label en rojo", repo: "ISW-ClientesIS", ins: 7, del: 3, fecha: "2026-05-13T09:52:37-05:00" },
			{ hash: "121aff1", descripcion: "fix(capacitacion): se oculta la acción modificar en el slave relacional de seguridad y se agrega formulario de solo visualización del permiso", repo: "ISW-ClientesIS", ins: 29, del: 10, fecha: "2026-05-13T10:46:51-05:00" },
			{ hash: "7e770eb", descripcion: "fix(capacitacion): se restringe el catálogo de permisos del BtnRef a solo visualización", repo: "ISW-ClientesIS", ins: 1, del: 0, fecha: "2026-05-13T10:49:20-05:00" },
			{ hash: "be7682f", descripcion: "fix(capacitacion): se propaga el modo view del master a las acciones de los list-slaves y se agrega formulario de visualización del permiso en el btnref", repo: "ISW-ClientesIS", ins: 22, del: 2, fecha: "2026-05-13T10:53:03-05:00" },
			{ hash: "a8aac2c", descripcion: "fix(capacitacion): se corrige la ruta del import de SeguridadAcciones usando el alias de components", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-13T11:05:15-05:00" },
			{ hash: "72e0522", descripcion: "feat(contapymeu): se agrega helper toBtnRefController que oculta las acciones del controlador antes de usarse en un BtnRef", repo: "ISW-ClientesIS", ins: 11, del: 2, fecha: "2026-05-13T11:23:32-05:00" },
			{ hash: "26002a9", descripcion: "refactor(contapymeu): se convierte el helper de btnref en método toBtnRef del controlador base", repo: "ISW-ClientesIS", ins: 8, del: 9, fecha: "2026-05-13T11:25:00-05:00" },
			{ hash: "d2b1e0b", descripcion: "refactor(contapymeu): se anida el set de claves ocultas dentro del método toBtnRef al ser su único uso", repo: "ISW-ClientesIS", ins: 3, del: 4, fecha: "2026-05-13T11:26:51-05:00" },
			{ hash: "cd8dad3", descripcion: "refactor(seguridad): se traslada el tipo del controlador del catalogo seguro al unico consumidor y se elimina del modulo base", repo: "ISW-ClientesIS", ins: 3, del: 5, fecha: "2026-05-13T13:47:41-05:00" },
			{ hash: "01fada5", descripcion: "refactor(capacitacion): se modela tipInfo/tipWarn y onSelectedRecord en FieldDef/BtnRefDefs y se migra General.svelte a Obj2Inputs con maxcells", repo: "ISW-ClientesIS", ins: 80, del: 56, fecha: "2026-05-13T16:14:17-05:00" },
			{ hash: "8594842", descripcion: "fix(capacitacion): se castea btnrefdefs a BtnRefDefs base al pasarlo a Attr2Input", repo: "ISW-ClientesIS", ins: 2, del: 1, fecha: "2026-05-13T16:28:36-05:00" },
			{ hash: "fd4cf7e", descripcion: "fix(cursos): se centra y limita el BtnRef de driver a 350px en el aviso de espera", repo: "ISW-ClientesIS", ins: 5, del: 3, fecha: "2026-05-14T07:37:42-05:00" },
			{ hash: "01e8501", descripcion: "fix(cursos): se muestra el aviso de driver en Seguridad y se alinea el BtnRef a la derecha sin afectar el texto", repo: "ISW-ClientesIS", ins: 49, del: 44, fecha: "2026-05-14T07:40:13-05:00" },
			{ hash: "55439a0", descripcion: "refactor(form): se renombra btnrefdefs a controladores y se agrega soporte de tipo catalogo en Attr2Input", repo: "ISW-ClientesIS", ins: 49, del: 36, fecha: "2026-05-14T07:46:31-05:00" },
			{ hash: "41d7851", descripcion: "feat(capacitacion): se renderiza iplanpadre como btnref con controlador en memoria de hermanos", repo: "ISW-ClientesIS", ins: 85, del: 2, fecha: "2026-05-14T10:01:08-05:00" },
			{ hash: "df8c4e2", descripcion: "refactor(capacitacion): se traslada el controlador btnref de plan padre a la capa lib siguiendo la convencion", repo: "ISW-ClientesIS", ins: 35, del: 80, fecha: "2026-05-14T10:19:23-05:00" },
			{ hash: "ce2cc0a", descripcion: "fix(capacitacion): se excluyen del btnref de planpadre los hermanos que ya tienen un iplanpadre asignado", repo: "ISW-ClientesIS", ins: 89, del: 76, fecha: "2026-05-14T21:22:38-05:00" },
			{ hash: "4be6d99", descripcion: "fix(capacitacion): se excluye del btnref el hermano que ya esta seleccionado como iplanpadre del registro actual", repo: "ISW-ClientesIS", ins: 8, del: 13, fecha: "2026-05-14T21:31:01-05:00" },
			{ hash: "5b5b6cf", descripcion: "refactor(refbase): se generaliza el bypass del filter2ReturnList ante consultas puntuales por pk para resolver labels del btnref", repo: "ISW-ClientesIS", ins: 14, del: 19, fecha: "2026-05-14T21:41:09-05:00" },
			{ hash: "5a5cc76", descripcion: "fix(contapymeu): se hace reactivo el filtro del btnref de iplanpadre leyendo el valor en vivo del record", repo: "ISW-ClientesIS", ins: 5, del: 6, fecha: "2026-05-15T08:13:38-05:00" },
			{ hash: "2041c48", descripcion: "refactor(capacitacion): se generaliza la exclusion del valor actual del btnref vía wrapper local y currentbtnrefvalue en el supercontrolador", repo: "ISW-ClientesIS", ins: 51, del: 17, fecha: "2026-05-15T08:24:06-05:00" },
			{ hash: "b1f6f03", descripcion: "refactor(capacitacion): se reemplazan los btnref restantes por el wrapper local btnref2", repo: "ISW-ClientesIS", ins: 9, del: 7, fecha: "2026-05-15T08:25:09-05:00" },
			{ hash: "f5451b0", descripcion: "fix(capacitacion): se corrige la ruta de importacion del wrapper btnref2 en el driver del curso", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-15T08:26:16-05:00" },
			{ hash: "3d1db79", descripcion: "fix(capacitacion): se anota el tipo del parametro record en el btnref de prerequisitos", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-15T08:29:40-05:00" },
			{ hash: "9a7e706", descripcion: "fix(clientesis-temas): se muestra solo el nombre en el caption del btnref de tema", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-15T09:07:57-05:00" },
			{ hash: "32a7b4c", descripcion: "refactor(capacitacion): se sobrescribe columnsbtnref del tema mediante subclase local en cursos", repo: "ISW-ClientesIS", ins: 10, del: 8, fecha: "2026-05-15T09:11:18-05:00" },
		],
		body: bodyTK1424892,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424809",
		titulo: "Menú de acciones incompleto",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 09:40:35 am",
		estimacionMinutos: 210,
		resumen: "Se reportó que el menú de acciones de los catálogos Cursos y Planes de estudio mostraba solo cinco acciones (Crear, Visualizar, Modificar, Eliminar y Refrescar) mientras que los demás catálogos maestros exponían también Verificar, Duplicar, Recodificar y Consolidar. El menú contextual del grid (clic derecho) también quedaba recortado a tres opciones.",
		commits: [
			{ hash: "d69949a", descripcion: "feat(acciones-gen, catalogo-gen): refactoriza las interfaces y mejora la gestión de propiedades en los componentes", repo: "ISP-SvelteComponents", ins: 169, del: 141, fecha: "2026-05-11T12:10:37-05:00" },
			{ hash: "47ebac1", descripcion: "feat: refactoriza y mejora la gestión de propiedades en AccionesGen y CatalogoGen", repo: "ISP-SvelteComponents", ins: 69, del: 39, fecha: "2026-05-11T12:27:53-05:00" },
			{ hash: "f64a57b", descripcion: "fix: corrige la indentación y elimina estilos no utilizados en AccionesGen", repo: "ISP-SvelteComponents", ins: 1, del: 10, fecha: "2026-05-11T12:29:08-05:00" },
			{ hash: "3f54a0d", descripcion: "refactor: Mejora la tipificación de propiedades en SeguridadAcciones y SeguridadCatalogo para mayor claridad y consistencia", repo: "ISW-ClientesIS", ins: 5, del: 8, fecha: "2026-05-11T12:57:15-05:00" },
			{ hash: "71c0810", descripcion: "feat: mejora las interfaces de propiedades en AccionesGen y CatalogoGen", repo: "ISP-SvelteComponents", ins: 17, del: 4, fecha: "2026-05-11T13:03:06-05:00" },
			{ hash: "68ea14a", descripcion: "refactor: Reorganiza importaciones y mejora la estructura de componentes en Detail, GridResponsiveForm, SecurityLayout, SeguridadAcciones y SeguridadCatalogo", repo: "ISW-ClientesIS", ins: 22, del: 67, fecha: "2026-05-11T13:03:20-05:00" },
			{ hash: "a82a112", descripcion: "feat(capacitacion): se exponen todas las acciones soportadas en catalogos maestros de cursos y planes de estudio", repo: "ISS-ClientesIS-ContaPymeU", ins: 2, del: 2, fecha: "2026-05-13T09:56:25-05:00" },
			{ hash: "267d990", descripcion: "feat(form): objjconfig acepta nodos contenedores actiondrawer formjconfig flexlayout accionesgen y nodos de control if y slotdefault", repo: "ISW-ClientesIS", ins: 124, del: 4, fecha: "2026-05-14T11:14:29-05:00" },
			{ hash: "014f357", descripcion: "refactor(tree): se consolida el drawer de edicion en una estructura declarativa unica consumida por objjconfig con wrapper para accionesgen", repo: "ISW-ClientesIS", ins: 88, del: 32, fecha: "2026-05-14T11:20:28-05:00" },
			{ hash: "272b2e5", descripcion: "refactor(form): se elimina el wrapper accionesgenwrap consolidando el render de accionesgen y la sincronizacion de itdform dentro de objjconfig", repo: "ISW-ClientesIS", ins: 9, del: 32, fecha: "2026-05-14T11:31:03-05:00" },
			{ hash: "90eff53", descripcion: "feat(tree): se expone entrie y entries en el controlador del arbol leyendo de customs para que accionesgen renderice el titulo", repo: "ISW-ClientesIS", ins: 4, del: 1, fecha: "2026-05-14T11:38:30-05:00" },
			{ hash: "9dcdf9b", descripcion: "refactor(tree): se compacta la definicion de drawerstructure extrayendo el mensaje bloqueado y el nodo accionesgen a constantes intermedias", repo: "ISW-ClientesIS", ins: 20, del: 54, fecha: "2026-05-14T11:40:14-05:00" },
			{ hash: "6e76ebf", descripcion: "refactor(tree): se inlinea drawerstructure en la prop structure y se relaja el tipado de accionesgennode para evitar los casts a any", repo: "ISW-ClientesIS", ins: 9, del: 6, fecha: "2026-05-14T11:45:15-05:00" },
		],
		body: bodyTK1424809,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424806",
		titulo: "Permisos de modificación con la acción “Visualizar” en el catálogo de cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 09:33:57 am",
		estimacionMinutos: 90,
		resumen: "En revisión de las acciones disponibles del catálogo de cursos se identificó que al ingresar por la opción Visualizar, en las pestañas ‘Estructura’ y ‘Seguridad’ se podían realizar modificaciones o crear información. Se solicitó que dicha opción no permitiera ninguna acción distinta a la consulta.",
		commits: [
			{ hash: "d170267", descripcion: "fix(capacitacion): se habilitan crear/modificar/eliminar en list-slaves cuando el master esta en edicion y se oculta visualizar del catalogo de permisos", repo: "ISW-ClientesIS", ins: 4, del: 20, fecha: "2026-05-13T10:57:44-05:00" },
			{ hash: "be7682f", descripcion: "fix(capacitacion): se propaga el modo view del master a las acciones de los list-slaves y se agrega formulario de visualizacion del permiso en el btnref", repo: "ISW-ClientesIS", ins: 22, del: 2, fecha: "2026-05-13T10:53:03-05:00" },
			{ hash: "7e770eb", descripcion: "fix(capacitacion): se restringe el catalogo de permisos del BtnRef a solo visualizacion", repo: "ISW-ClientesIS", ins: 1, del: 0, fecha: "2026-05-13T10:49:20-05:00" },
			{ hash: "121aff1", descripcion: "fix(capacitacion): se oculta la accion modificar en el slave relacional de seguridad y se agrega formulario de solo visualizacion del permiso", repo: "ISW-ClientesIS", ins: 29, del: 10, fecha: "2026-05-13T10:46:51-05:00" },
			{ hash: "bd77d38", descripcion: "fix(capacitacion): se controla acciones de list-slaves solo por itd externo, ignorando permisos del slave", repo: "ISW-ClientesIS", ins: 2, del: 2, fecha: "2026-05-13T09:39:47-05:00" },
		
			{ hash: "616f602", descripcion: "fix(plan-estudio): se propaga readonly a list-slaves de cursos integrados y prerrequisitos", repo: "ISW-ClientesIS", ins: 15, del: 3, fecha: "2026-05-13T09:00:09-05:00" },
			{ hash: "88885fb", descripcion: "fix(capacitacion): se habilita eliminar/crear en list-slaves del plan derivando del permiso modificar del maestro", repo: "ISW-ClientesIS", ins: 6, del: 2, fecha: "2026-05-13T09:37:34-05:00" },
			{ hash: "415d726", descripcion: "fix(form): se garantiza visualizar habilitado en bAllowed del catalogo estructura", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-14T08:31:59-05:00" },
			{ hash: "21968ff", descripcion: "fix(treeview): se añaden logs de depuración en ActModificar y ActVisualizar para seguimiento de cambios", repo: "ISW-ClientesIS", ins: 33, del: 2, fecha: "2026-05-14T14:17:28-05:00" },
		],
		body: bodyTK1424806,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1423165",
		titulo: "Plan de contenidos: etiquetas, atributos, autoapertura y padre correcto",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "08/may./2026",
		estimacionMinutos: 300,
		resumen: "Se reportaron cuatro hallazgos sobre el plan de contenidos del curso: (1) los campos del formulario del nodo debían usar la nomenclatura del nivel correspondiente para diferenciar capítulo y recurso, (2) los atributos adicionales debían mostrarse solo en el último nivel y no en capítulos intermedios, (3) el catálogo de recurso debía abrirse automáticamente al crear un título nuevo y autocompletar el nombre solo cuando estuviera vacío, y (4) las acciones de insertar arriba, abajo o como hijo debían crear el nuevo nodo bajo el padre correcto.",
		commits: [
			{ hash: "a3b13d5", descripcion: "feat(treeview): se ajustaron las etiquetas del formulario para reflejar el nombre del nivel en codigo, nombre y atributos", repo: "ISW-ClientesIS", ins: 9, del: 8, fecha: "2026-05-08T10:27:51-05:00" },
			{ hash: "1bd146c", descripcion: "style(treeview): se paso a minusculas el nombre del nivel en las etiquetas del formulario", repo: "ISW-ClientesIS", ins: 2, del: 2, fecha: "2026-05-08T10:28:57-05:00" },
			{ hash: "9ecab82", descripcion: "fix(capacitacion): se autocompleto el nombre del titulo con el nombre del recurso seleccionado cuando el titulo estaba vacio", repo: "ISW-ClientesIS", ins: 1, del: 2, fecha: "2026-05-08T11:49:09-05:00" },
			{ hash: "bae5e32", descripcion: "fix(capacitacion): se corrigieron los tipos del selector autoabierto del recurso", repo: "ISW-ClientesIS", ins: 9, del: 6, fecha: "2026-05-08T11:43:35-05:00" },
			{ hash: "69d6c66", descripcion: "feat(capacitacion): se incluyo el selector de tema en niveles intermedios y se abrio el selector de recurso al crear un nuevo titulo, ademas de heredar el tema del ancestro mas cercano", repo: "ISW-ClientesIS", ins: 33, del: 7, fecha: "2026-05-08T11:40:53-05:00" },
			{ hash: "1f242d4", descripcion: "fix(capacitacion): se restringio los selectores de tema y recurso al ultimo nivel del plan de contenidos", repo: "ISW-ClientesIS", ins: 9, del: 2, fecha: "2026-05-08T11:30:24-05:00" },
			{ hash: "4f75c36", descripcion: "fix(treeview): se abrio el formulario con los datos del nuevo registro al agregar arriba, abajo o como hijo", repo: "ISW-ClientesIS", ins: 7, del: 0, fecha: "2026-05-08T11:20:36-05:00" },
			{ hash: "d21af38", descripcion: "feat(treeview): se autoconstruyen los agrupadores faltantes para que ningun nodo quede huerfano sin importar su profundidad", repo: "ISW-ClientesIS", ins: 59, del: 6, fecha: "2026-05-08T10:17:11-05:00" },
			{ hash: "031068f", descripcion: "feat(treeview): se asignaron nomenclaturas legibles a los agrupadores autoconstruidos usando el nombre del nivel", repo: "ISW-ClientesIS", ins: 4, del: 0, fecha: "2026-05-08T10:24:53-05:00" },
			{ hash: "8b1fefe", descripcion: "fix(treeview): se corrigio la ruta de los hijos y hermanos para que respeten el padre solicitante", repo: "ISW-ClientesIS", ins: 9, del: 24, fecha: "2026-05-08T10:04:13-05:00" },
		
			{ hash: "b389ef5", descripcion: "feat(TreeView): agregar soporte para helperRow en TreeRowView y mejorar la estructura de datos en ContenidosTreeAdapter", repo: "ISW-ClientesIS", ins: 58, del: 28, fecha: "2026-05-05T10:57:33-05:00" },
			{ hash: "aff929c", descripcion: "feat(TreeView): agregar soporte para slaveController y onviewresource en TreeRowView y TreeContenidos", repo: "ISW-ClientesIS", ins: 32, del: 12, fecha: "2026-05-05T11:38:59-05:00" },
			{ hash: "ab947e5", descripcion: "feat: agregar lógica para manejar el atributo 'iplanpadre' en Formulario.svelte; se utiliza parentFlatPath para el valor del input correspondiente", repo: "ISW-ClientesIS", ins: 71, del: 17, fecha: "2026-05-06T08:43:22-05:00" },
			{ hash: "a212783", descripcion: "feat: actualizar lógica de serialización en ContenidosTreeAdapter y TPlanCursoUX; inyectar flatPath y manejar atributos relacionados en resume()", repo: "ISW-ClientesIS", ins: 81, del: 24, fecha: "2026-05-06T08:54:09-05:00" },
			{ hash: "a9d1bf1", descripcion: "feat: agregar lógica para traducir `pathInit` a `flatPath` en ContenidosTreeAdapter; simplificar la gestión de atributos en TPlanCursoUX", repo: "ISW-ClientesIS", ins: 55, del: 82, fecha: "2026-05-06T10:19:43-05:00" },
			{ hash: "646eca8", descripcion: "refactor(TreeView): Se reemplazó `nodeId` por `flatPath` en los adaptadores (`TAView`, `TAMutations`, `ContenidosTreeAdapter`) para unificar la gestión de estados (selección y foco) y la inicialización de rutas (`pathInit`), además de corregir detalles menores de codificación en `Formulario`.", repo: "ISW-ClientesIS", ins: 294, del: 292, fecha: "2026-05-06T11:53:28-05:00" },
			{ hash: "a905b56", descripcion: "refactor(TreeView): renombrar `onuirefresh` a `forceRefresh` en adaptadores y actualizar su uso en `TAView`, `ContenidosTreeAdapter` y `TPlanCursoUX` para mejorar la claridad y consistencia en la gestión de actualizaciones de UI.", repo: "ISW-ClientesIS", ins: 39, del: 17, fecha: "2026-05-06T12:09:35-05:00" },
			{ hash: "430d5e5", descripcion: "feat(TreeView): agregar soporte para `pathInit` en adaptadores, permitiendo la resolución del `flatPath` a su `pathInit` original; optimizar la gestión de nodos en `ContenidosTreeAdapter`.", repo: "ISW-ClientesIS", ins: 44, del: 17, fecha: "2026-05-06T12:26:31-05:00" },
			{ hash: "c95cfb3", descripcion: "feat(TreeView): mejorar la gestión de nodos utilizando `flatPath` en lugar de `iplan` para reflejar el orden actual; implementar commit explícito de cambios en `flushTreeForSave`", repo: "ISW-ClientesIS", ins: 94, del: 25, fecha: "2026-05-06T15:00:17-05:00" },
			{ hash: "093fdd8", descripcion: "feat/refactor(components): Se implementó un contexto en `FloatingComponent` para mantenerlo montado al abrir *overlays*, se unificó la gestión de iconos en `TreeView` utilizando tipos específicos y se optimizó el *commit* de nodos en `ContenidosTreeAdapter` para reflejar correctamente los cambios en el reordenamiento del árbol.", repo: "ISW-ClientesIS", ins: 110, del: 55, fecha: "2026-05-06T15:26:41-05:00" },
			{ hash: "f800161", descripcion: "feat(TreeView): renombrar `TreeNodeUX` a `TreeNode` y actualizar referencias; crear `TPlanCursoNode` para mejorar la gestión de nodos en `ContenidosTreeAdapter`.", repo: "ISW-ClientesIS", ins: 61, del: 61, fecha: "2026-05-06T15:31:38-05:00" },
			{ hash: "ebe64b1", descripcion: "feat(TreeView): optimizar la gestión de `flatPath` y `pathInit` en `TPlanCursoNode`; mejorar la inicialización y el manejo de propiedades en el constructor.", repo: "ISW-ClientesIS", ins: 18, del: 43, fecha: "2026-05-06T15:42:06-05:00" },
			{ hash: "120284a", descripcion: "feat(TreeView): implementar gestión de `pathTrack` y `pathTrackByCurr` para mantener la trazabilidad de nodos; optimizar la inicialización y el manejo de `flatPath` en `TPlanCursoNode`; mejorar la presentación de componentes en `Formulario.svelte` y estandarizar etiquetas.", repo: "ISW-ClientesIS", ins: 154, del: 141, fecha: "2026-05-06T16:29:35-05:00" },
			{ hash: "92dc0ed", descripcion: "feat(TreeView): optimizar la gestión de `frmObj` en `Formulario.svelte` para evitar ciclos estáticos y mejorar la asignación de `currentPath`; ajustar la inicialización de `objRow` en `TPlanCursoNode` para mantener la integridad de los nodos.", repo: "ISW-ClientesIS", ins: 65, del: 62, fecha: "2026-05-07T08:53:04-05:00" },
			{ hash: "0160435", descripcion: "feat(TreeView): Se agregó una propiedad de título a la información del ícono y se optimizó la lógica de íconos", repo: "ISW-ClientesIS", ins: 52, del: 89, fecha: "2026-05-07T16:04:33-05:00" },
			{ hash: "3a84248", descripcion: "feat(TreeView): Se agregaron las interfaces para la gestión de filas y la definición de acciones personalizadas", repo: "ISW-ClientesIS", ins: 50, del: 0, fecha: "2026-05-07T16:20:47-05:00" },
			{ hash: "21d02f3", descripcion: "feat(TreeView): Se agregó el contrato del consumer y sus dependencias para la gestión del árbol", repo: "ISW-ClientesIS", ins: 47, del: 50, fecha: "2026-05-07T16:26:39-05:00" },
			{ hash: "8756211", descripcion: "feat(TreeView): Se agregaron los tipos del contrato del consumer y se actualizaron las props del componente principal", repo: "ISW-ClientesIS", ins: 8, del: 5, fecha: "2026-05-07T16:29:43-05:00" },
			{ hash: "790b362", descripcion: "feat(TreeView): Se eliminaron propiedades innecesarias del contrato del consumer optimizando la interfaz", repo: "ISW-ClientesIS", ins: 0, del: 6, fecha: "2026-05-07T16:37:11-05:00" },
			{ hash: "67adc34", descripcion: "refactor(TreeView): Se simplificaron los tipos genéricos eliminando un parámetro maestro que ya no se usaba y se consolidó la consistencia en el manejo de relaciones", repo: "ISW-ClientesIS", ins: 76, del: 279, fecha: "2026-05-07T17:26:11-05:00" },
			{ hash: "d713701", descripcion: "refactor(TreeView): Se eliminó una clase intermedia y se simplificó la gestión del estado del componente", repo: "ISW-ClientesIS", ins: 18, del: 17, fecha: "2026-05-07T17:29:41-05:00" },
			{ hash: "f18313e", descripcion: "refactor(TreeView): Se simplificó la gestión de operaciones eliminando referencias a la entidad maestra en las acciones de inserción y eliminación", repo: "ISW-ClientesIS", ins: 11, del: 25, fecha: "2026-05-07T17:31:50-05:00" },
			{ hash: "2eac041", descripcion: "refactor(TreeView): Se reorganizaron tipos y se eliminó un contrato redundante para mejorar la gestión de datos", repo: "ISW-ClientesIS", ins: 40, del: 43, fecha: "2026-05-07T17:33:58-05:00" },
			{ hash: "9d4b1c4", descripcion: "refactor(TreeView): Se reorganizaron y trasladaron las interfaces a un archivo central de contratos para mejorar la estructura del código", repo: "ISW-ClientesIS", ins: 43, del: 39, fecha: "2026-05-07T17:37:07-05:00" },
			{ hash: "be6adff", descripcion: "refactor(TreeView): Se renombraron y unificaron las propiedades relacionadas al registro activo para mejorar la claridad y consistencia del código", repo: "ISW-ClientesIS", ins: 37, del: 52, fecha: "2026-05-07T17:41:05-05:00" },
			{ hash: "5418a85", descripcion: "refactor(TreeView): Se reemplazó el parámetro genérico en los adapters actualizando definiciones y firmas para mejorar la consistencia y la seguridad de tipos", repo: "ISW-ClientesIS", ins: 273, del: 273, fecha: "2026-05-07T17:42:25-05:00" },
			{ hash: "e812ad9", descripcion: "refactor(treeview): se trasladó la lógica de refresco de nodos al adaptador base", repo: "ISW-ClientesIS", ins: 55, del: 31, fecha: "2026-05-08T07:53:29-05:00" },
			{ hash: "9364eae", descripcion: "refactor(treeview): se trasladó la construcción de la configuración de fila al adaptador base", repo: "ISW-ClientesIS", ins: 186, del: 169, fecha: "2026-05-08T07:58:32-05:00" },
			{ hash: "16a1dad", descripcion: "refactor(treeview): se eliminó el adaptador específico del consumer en favor de configuración declarativa", repo: "ISW-ClientesIS", ins: 127, del: 138, fecha: "2026-05-08T08:08:15-05:00" },
			{ hash: "9b00e2d", descripcion: "refactor(treeview): se redujo el nodo del consumer a un envoltorio estructural y se separó la rutina de envío", repo: "ISW-ClientesIS", ins: 36, del: 60, fecha: "2026-05-08T08:11:26-05:00" },
			{ hash: "19db3e5", descripcion: "refactor(treeview): se eliminó la clase de nodo específica y se restauraron los iconos de carpetas por defecto", repo: "ISW-ClientesIS", ins: 93, del: 100, fecha: "2026-05-08T08:24:27-05:00" },
			{ hash: "95365ba", descripcion: "refactor(treeview): se reemplazó la augmentation global del tipo de plan por un alias local del consumidor", repo: "ISW-ClientesIS", ins: 50, del: 48, fecha: "2026-05-08T08:32:22-05:00" },
			{ hash: "1c5c6f5", descripcion: "refactor(treeview): se trasladó la instanciación del adaptador al componente", repo: "ISW-ClientesIS", ins: 38, del: 25, fecha: "2026-05-08T08:51:14-05:00" },
			{ hash: "84c52af", descripcion: "refactor(treeview): se eliminó el alias de fila y se expuso desde el componente", repo: "ISW-ClientesIS", ins: 21, del: 25, fecha: "2026-05-08T08:54:15-05:00" },
			{ hash: "3533fcb", descripcion: "refactor(treeview): se erradicó el controlador de listado del side consumer", repo: "ISW-ClientesIS", ins: 34, del: 62, fecha: "2026-05-08T08:58:12-05:00" },
			{ hash: "f44d8e5", descripcion: "refactor(treeview): se trasladó el manejador de Ctrl+Enter al contrato de customs", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-08T09:00:27-05:00" },
			{ hash: "8d0de6c", descripcion: "refactor(treeview): se infirió la creación del nodo a partir de la clase de dominio", repo: "ISW-ClientesIS", ins: 20, del: 8, fecha: "2026-05-08T09:06:28-05:00" },
			{ hash: "c91b8f4", descripcion: "refactor(treeview): se compactaron las preparaciones de nodos en un único hook updateNode", repo: "ISW-ClientesIS", ins: 43, del: 26, fecha: "2026-05-08T09:09:16-05:00" },
			{ hash: "ca5d946", descripcion: "refactor(treeview): se trasladaron la profundidad máxima y el rótulo de nivel a propiedades del componente", repo: "ISW-ClientesIS", ins: 9, del: 10, fecha: "2026-05-08T09:12:06-05:00" },
			{ hash: "50d3ae9", descripcion: "refactor(treeview): se generalizaron las acciones de fila con un runtime enriquecido", repo: "ISW-ClientesIS", ins: 44, del: 1, fecha: "2026-05-08T09:14:44-05:00" },
			{ hash: "b3c8afc", descripcion: "refactor(treeview): se incorporó la extinción de nodo guiada por el rol de contención", repo: "ISW-ClientesIS", ins: 21, del: 0, fecha: "2026-05-08T09:16:20-05:00" },
			{ hash: "0b14cd0", descripcion: "refactor(treeview): se removieron las propiedades de profundidad y rótulo de nivel en favor de updateNode", repo: "ISW-ClientesIS", ins: 10, del: 13, fecha: "2026-05-08T09:32:37-05:00" },
			{ hash: "8298090", descripcion: "refactor(treeview): se erradicaron las propiedades del componente que pertenecen al consumidor", repo: "ISW-ClientesIS", ins: 25, del: 45, fecha: "2026-05-08T09:36:21-05:00" },
			{ hash: "77aa6c3", descripcion: "refactor(treeview): se eliminó el controlador esclavo y se trasladó la apertura del selector al consumidor", repo: "ISW-ClientesIS", ins: 7, del: 30, fecha: "2026-05-08T09:38:58-05:00" },
			{ hash: "019e30c", descripcion: "refactor(treeview): se eliminó la abstracción de la cascada de adaptadores", repo: "ISW-ClientesIS", ins: 28, del: 28, fecha: "2026-05-08T09:41:43-05:00" },
			{ hash: "cce80cf", descripcion: "refactor(treeview): se externalizaron los atajos no navegacionales hacia el customs", repo: "ISW-ClientesIS", ins: 71, del: 68, fecha: "2026-05-08T09:44:31-05:00" },
			{ hash: "39f8f9f", descripcion: "chore(treeview): se dejo la inyeccion de huerfanos detras de un flag QA en falso por defecto", repo: "ISW-ClientesIS", ins: 15, del: 14, fecha: "2026-05-08T10:31:38-05:00" },
			{ hash: "fb5829f", descripcion: "fix(treeview): se preservo el estado expandido de los nodos despues de mutaciones que reconstruyen el arbol", repo: "ISW-ClientesIS", ins: 54, del: 66, fecha: "2026-05-08T11:01:10-05:00" },
			{ hash: "66a70b5", descripcion: "refactor/docs(TreeView): Se mejoró la documentación de los adaptadores (`__RowAdapter.md`, `__TreeAdapter.md`, `ContaPymeU.md`) para clarificar su arquitectura y el flujo de estados. Además, se optimizó la gestión del estado del árbol encapsulando `commitFlatPaths()` dentro de `runCustomsPreSubmit()` en `03-tree.ts` y se ajustó la secuencia de operaciones para actualizaciones e inserciones en `Cursos.ts`.", repo: "ISW-ClientesIS", ins: 786, del: 672, fecha: "2026-05-08T17:39:43-05:00" },
			{ hash: "7f0c025", descripcion: "feat: el TreeView reusa el adaptador del Controller maestro para preservar el estado del candado e historial al cambiar de pestaña, y se simplifican los titles de la barra de herramientas eliminando descripciones de modo lectura y usando '|' para los atajos", repo: "ISW-ClientesIS", ins: 91, del: 76, fecha: "2026-05-09T22:36:30-05:00" },
			{ hash: "e703a78", descripcion: "feat: separa el lock del modo solo-lectura en el TreeView usando un candado independiente con icono mdi:lock-outline en el handle, mantiene canToggleProtection siempre activo en modo edicion, abre el modal de desproteger ante doble clic incluso cuando la proteccion proviene de viewing-past del historial, agrega la opcion 'Rehacer al actual' (variant ghost) que rehace todo el futuro pendiente y desprotege en un solo paso, distribuye los botones de los modales a 50/50 o 33/33/33 segun cantidad, y restaura el fondo gris translucido sutil en grouppers seleccionados", repo: "ISW-ClientesIS", ins: 253, del: 72, fecha: "2026-05-10T06:20:41-05:00" },
			{ hash: "89da6cc", descripcion: "fix(ux): hace sticky el toolbar superior del TreeView (position:sticky, top:0, z-index:5, background) para que no se oculte al hacer scroll en las filas; cambia el copy del modal de proteccion a 'Arbol protegido' / 'El arbol esta protegido contra edicion' por sugerencia de UX", repo: "ISW-ClientesIS", ins: 7, del: 2, fecha: "2026-05-10T06:43:04-05:00" },
			{ hash: "cd71129", descripcion: "fix(ux): el scroll vertical del TreeView vive ahora SOLO en .isp-tree-body (overflow-y:auto, min-height:0, flex 1 1 auto), removiendo el sticky del toolbar superior; el toolbar queda como flex:0 0 auto fuera del area scrolleable. fix: el modal de proteccion ya cierra al hacer click en X o en el backdrop: el bloque reactivo controller->ui ahora compara contra _lastControllerPromptOpen para no sobreescribir el bshow=false que el bind hace cuando el usuario cierra externamente, y agrega sync ui->controller que llama dismissProtectionPrompt cuando el modal baja sin que el controller lo haya bajado", repo: "ISW-ClientesIS", ins: 19, del: 7, fecha: "2026-05-10T06:46:37-05:00" },
			{ hash: "baad1eb", descripcion: "fix(ux): agrega custom-scrollbar al .isp-tree-body (via prop cscroll y class explicita) para que el scroll de las filas use el estilo personalizado del sistema", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-10T06:47:23-05:00" },
			{ hash: "9d4f3a6", descripcion: "fix(ux): agrega padding-top:20px al .isp-tree-body para que el floating card de la fila (toolbar flotante posicionado en top+50) no quede recortado por el overflow del contenedor con scroll", repo: "ISW-ClientesIS", ins: 2, del: 2, fecha: "2026-05-10T06:49:17-05:00" },
			{ hash: "72144b7", descripcion: "fix(ux): reduce el padding-top del .isp-tree-body de 20px a 10px", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-10T06:50:18-05:00" },
			{ hash: "cb3b81d", descripcion: "fix(ux): aumenta el padding-top del .isp-tree-body de 10px a 15px", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-10T06:50:48-05:00" },
			{ hash: "ea47fe9", descripcion: "fix(ux): elimina el padding-top:15px del .isp-tree-body (que des-alineaba la primera fila) y mueve el ajuste al default del floatCard del adapter (ty:15) para que el toolbar flotante de la fila se desplace 15px hacia abajo y no quede recortado por el overflow del scroll", repo: "ISW-ClientesIS", ins: 6, del: 3, fecha: "2026-05-10T06:52:59-05:00" },
			{ hash: "3631295", descripcion: "fix(tree): se difiere el hook de actualizacin de nodos materializados para exponer el rbol completo y permitir identificar el primer root", repo: "ISW-ClientesIS", ins: 33, del: 7, fecha: "2026-05-10T07:13:25-05:00" },
			{ hash: "1f7ad5c", descripcion: "fix(tree): se aplica el ajuste vertical del primer root desde el adapter base y se permite abrir la cascada de ms opciones an cuando todas sus acciones estn deshabilitadas", repo: "ISW-ClientesIS", ins: 22, del: 17, fecha: "2026-05-10T07:15:46-05:00" },
			{ hash: "a9e7045", descripcion: "fix(tree): cuando un nodo es atom se ignora la dimensin de contencin para que el consumer no tenga que limpiarla manualmente", repo: "ISW-ClientesIS", ins: 8, del: 7, fecha: "2026-05-10T07:18:32-05:00" },
			{ hash: "eade176", descripcion: "fix(tree): se mantienen visibles las opciones de aadir hermanos en la cascada cuando el rbol est en solo lectura, mostrndolas deshabilitadas en vez de ocultarlas", repo: "ISW-ClientesIS", ins: 3, del: 3, fecha: "2026-05-10T07:21:07-05:00" },
			{ hash: "b98df08", descripcion: "fix(tree): se muestra ver formulario en la cascada cuando el rbol est en solo lectura y vuelve a editar al entrar en modo edicin", repo: "ISW-ClientesIS", ins: 7, del: 5, fecha: "2026-05-10T07:24:10-05:00" },
			{ hash: "7e77533", descripcion: "fix(tree): se cambia el icono de ver formulario por uno de documento para diferenciarlo del icono de ver recurso", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-10T07:25:02-05:00" },
			{ hash: "4aa1e17", descripcion: "chore(tree): se retiran indicadores de depuracin visibles en las filas y los registros de consola del rbol previos al despliegue", repo: "ISW-ClientesIS", ins: 3, del: 10, fecha: "2026-05-10T07:40:00-05:00" },
			{ hash: "6ad84ec", descripcion: "fix(tree): se restaura el efecto de confirmacin verde al mover filas con las acciones de subir y bajar igual que con arrastrar y soltar", repo: "ISW-ClientesIS", ins: 9, del: 4, fecha: "2026-05-10T07:44:27-05:00" },
			{ hash: "3c2356d", descripcion: "fix(tree): ajustar bloques reactivos para evitar ciclos de auto-disparo en Svelte", repo: "ISW-ClientesIS", ins: 17, del: 7, fecha: "2026-05-10T09:03:34-05:00" },
			{ hash: "2175964", descripcion: "fix(tree): mejorar la gestión de notificaciones de UI para evitar reentradas excesivas", repo: "ISW-ClientesIS", ins: 41, del: 2, fecha: "2026-05-10T09:17:13-05:00" },
			{ hash: "83aca4c", descripcion: "fix(tree): se estabilizan referencias de configuracin de filas y se aade un guard contra cascadas para evitar el lmite de profundidad de effects", repo: "ISW-ClientesIS", ins: 103, del: 6, fecha: "2026-05-10T09:49:12-05:00" },
			{ hash: "f59bc35", descripcion: "fix(tree): optimizar la sincronización y evitar invalidaciones innecesarias en Svelte 5", repo: "ISW-ClientesIS", ins: 39, del: 8, fecha: "2026-05-10T10:20:16-05:00" },
			{ hash: "2e29300", descripcion: "fix(tree): envuelve mkRowController con untrack para evitar cascada de derived sobre $$props en _rowItem", repo: "ISW-ClientesIS", ins: 26, del: 23, fecha: "2026-05-10T10:35:05-05:00" },
			{ hash: "278cd32", descripcion: "fix(tree): memoizar adapter por node.pathInit en RowItem para romper ciclo de re-evaluacion del derived", repo: "ISW-ClientesIS", ins: 23, del: 11, fecha: "2026-05-10T10:56:27-05:00" },
			{ hash: "fe9fd29", descripcion: "fix(tree): optimizar la gestión de adaptadores y evitar ciclos de re-evaluación en Svelte 5", repo: "ISW-ClientesIS", ins: 45, del: 237, fecha: "2026-05-10T11:12:35-05:00" },
		],
		body: bodyTK1423165,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1422216",
		titulo: "Función cargar recursos en plan de estudio",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "07/may./2026 10:37:59 am",
		estimacionMinutos: 240,
		resumen: "En revisión del formulario rápido del catálogo de plan de estudio, se identificó que en la pestaña de “Cursos de plan de estudio” se exponía la opción Crear, lo cual resultaba confuso porque sugería la creación de un recurso, y al abrirla el action drawer quedaba en blanco. Se solicitó que en su lugar se abriera el catálogo de cursos para seleccionar los que debían quedar dentro del plan.",
		commits: [
			{ hash: "8f008b5", descripcion: "feat(TK-1422216): ajustar estilos y logica de visualizacion en la tabla de cursos", repo: "ISW-ClientesIS", ins: 32, del: 13, fecha: "2026-05-07T11:35:09-05:00" },
			{ hash: "4bea4bc", descripcion: "feat(TK-1422216): optimizar logica y diseno en General, ListCursosDePlan, ListPrerequisitosDePlan y CursoReadOnly", repo: "ISW-ClientesIS", ins: 230, del: 243, fecha: "2026-05-07T11:33:02-05:00" },
			{ hash: "4d2b93b", descripcion: "feat(components): agregar BtnRefAutoOpen y CursoReadOnly, optimizar logica en ListCursosDePlan y ListPrerequisitosDePlan", repo: "ISW-ClientesIS", ins: 195, del: 74, fecha: "2026-05-07T11:09:03-05:00" },
			{ hash: "5270e8a", descripcion: "feat(ListCursosDePlan): mejorar la gestion de cursos al agregar detalles del curso y prerrequisitos", repo: "ISW-ClientesIS", ins: 94, del: 24, fecha: "2026-05-07T09:10:32-05:00" },
			{ hash: "ef48d6e", descripcion: "feat(components): se renombro el titulo a 'Cursos integrados' en ListCursosDePlan y se mejoro la logica de exclusion en PlanDeEstudio", repo: "ISW-ClientesIS", ins: 4, del: 4, fecha: "2026-05-07T10:09:48-05:00" },
			{ hash: "6d15653", descripcion: "feat(components): se ajusto el controlador en PlanDeEstudio para excluir el curso actualmente activo de las listas", repo: "ISW-ClientesIS", ins: 11, del: 5, fecha: "2026-05-07T09:57:16-05:00" },
			{ hash: "c010af1", descripcion: "feat(plandeestudio): agregar gestion de prerrequisitos en ListPrerequisitosDePlan", repo: "ISW-ClientesIS", ins: 208, del: 50, fecha: "2026-05-07T10:30:53-05:00" },
		
			{ hash: "cd80ba2", descripcion: "refactor(cursos): eliminar propiedad planpadre de iInfoPlanCurso y ajustar todoStruct en TPlanCursoServer", repo: "ISP-CLientesISServer", ins: 1, del: 3, fecha: "2026-05-04T14:34:59-05:00" },
			{ hash: "f1c5d98", descripcion: "fix(curso): ajuste en forma que se presenta los recursos en el plan de curso", repo: "ISW-ClientesIS", ins: 31, del: 31, fecha: "2026-05-06T09:54:07-05:00" },
			{ hash: "a93b98b", descripcion: "feat(plan-de-estudio): agrega propiedades de progreso y total de cursos a plan de estudio", repo: "ISP-ClientesIS", ins: 20, del: 1, fecha: "2026-05-06T15:26:21-05:00" },
			{ hash: "b36872c", descripcion: "feat(plan-de-estudio): agrega ruta de obtener plan de estudio con detalle para ser consumido", repo: "ISP-ClientesIS", ins: 12, del: 1, fecha: "2026-05-07T08:05:58-05:00" },
			{ hash: "8a1584a", descripcion: "feat(Alert): agregar propiedad de borde y optimizar colores de fondo y texto; mejorar estilo de alerta feat(ListCursosDePlan): incluir RichEditor para la descripción del curso y optimizar la gestión de elementos; ajustar lógica de prerrequisitos feat(icons): agregar nuevos íconos SVG para mejorar la biblioteca de iconos", repo: "ISW-ClientesIS", ins: 54, del: 35, fecha: "2026-05-07T09:47:25-05:00" },
			{ hash: "65f877b", descripcion: "feat(General): optimizar lógica de visualización y agregar componente SelectEnum para mejorar la experiencia de usuario feat(PlanDeEstudio): refactorizar gestión de columnas en controladores y agregar función para mezclar deltas de columnas", repo: "ISW-ClientesIS", ins: 140, del: 118, fecha: "2026-05-07T12:20:55-05:00" },
			{ hash: "314cb63", descripcion: "feat(PlanEstudio): agregar lógica para manejar cursos prerequisitos activos y mejorar la gestión de candidatos", repo: "ISW-ClientesIS", ins: 11, del: 3, fecha: "2026-05-07T12:31:31-05:00" },
			{ hash: "60b7d7d", descripcion: "feat(plan-estudio): agrega propiedad de irecursocontinuar para funcionalidad de continuar en el ultimo recurso que se visualizo", repo: "ISP-ClientesIS", ins: 4, del: 1, fecha: "2026-05-08T09:39:56-05:00" },
		],
		body: bodyTK1422216,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420819",
		titulo: "Campos vacíos grid curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 02:03:59 pm",
		estimacionMinutos: 210,
		resumen: "En revisión de la grid del catálogo del curso, se identificó que los campos “Tema” y “Driver” aparecían vacíos aún cuando ya se habían diligenciado para los cursos.",
		commits: [
			{ hash: "6ce7d49", descripcion: "feat(cursos): ajustes varios en visualizador de cursos", repo: "ISW-ClientesIS", ins: 61, del: 7, fecha: "2026-05-05T15:34:21-05:00" },
			{ hash: "84f489b", descripcion: "feat(cursos): agrega presentacion de cursos con diferentes drivers", repo: "ISW-ClientesIS", ins: 393, del: 22, fecha: "2026-05-05T14:54:23-05:00" },
			{ hash: "6eb2d14", descripcion: "feat(cursos): eliminar columnas de opciones en TPermisoCursoController, TSeguridadCursoSlaveController y TDriverSlaveController; agregar columnas de creacion y ultima edicion", repo: "ISW-ClientesIS", ins: 7, del: 8, fecha: "2026-05-05T17:34:55-05:00" },
		
			{ hash: "ea24996", descripcion: "feat/fix(components): Se implementó soporte modal y advertencias de drivers en `TipInfo`, y se vinculó `itdForm` en formularios. Además, se optimizó la gestión de permisos en seguridad, se habilitó el modo local en `Cursos` refinando sus exclusiones, se corrigió el manejo de propiedades restringidas en `RefController` y se añadió un nuevo ícono SVG para mensajes.", repo: "ISW-ClientesIS", ins: 147, del: 39, fecha: "2026-05-03T12:19:55-05:00" },
			{ hash: "c9b7784", descripcion: "refactor(TK-1420813): simplificar la lógica de readonly en Detail.svelte, General.svelte, ListEstructura.svelte y ListSeguridad.svelte; agregar columnas de opciones en Cursos.ts", repo: "ISW-ClientesIS", ins: 20, del: 7, fecha: "2026-05-05T13:02:46-05:00" },
			{ hash: "829cc65", descripcion: "feat(cursos): ajuste en responsive para los drivers de un curso", repo: "ISW-ClientesIS", ins: 134, del: 79, fecha: "2026-05-05T18:09:11-05:00" },
			{ hash: "4e7604f", descripcion: "feat(cursos): ajuste en responsive para los drivers de un curso", repo: "ISW-ClientesIS", ins: 2, del: 2, fecha: "2026-05-05T18:09:34-05:00" },
			{ hash: "4821b5b", descripcion: "feat(curso): ajuste en drivers de plan para cada recurso", repo: "ISW-ClientesIS", ins: 75, del: 42, fecha: "2026-05-06T09:35:57-05:00" },
		],
		body: bodyTK1420819,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420813",
		titulo: "Campos modo visualización en edición de formulario rápido curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 12:26:30 pm",
		estimacionMinutos: 210,
		resumen: "Se reportó que, al revisar los campos disponibles desde la vista de formulario rápido del catálogo de curso, varios campos quedaban en modo visualización (mensaje, nombres de la estructura, los de crear con seguridad). Se solicitó que, siempre que se ingresara por modificar, esos campos quedaran editables.",
		commits: [
			{ hash: "b4745b8", descripcion: "refactor(TK-1420813): comentar la linea que establece TCapacitacionBaseClient.local como true", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-05T14:14:20-05:00" },
			{ hash: "c9b7784", descripcion: "refactor(TK-1420813): simplificar la logica de readonly en Detail.svelte, General.svelte, ListEstructura.svelte y ListSeguridad.svelte; agregar columnas de opciones en Cursos.ts", repo: "ISW-ClientesIS", ins: 20, del: 7, fecha: "2026-05-05T13:02:46-05:00" },
		
			{ hash: "a4bd0ed", descripcion: "refactor(TK-1420813): renombrar método todoStruct a JData2HighDetail en varias clases", repo: "ISP-CLientesISServer", ins: 13, del: 13, fecha: "2026-05-05T13:04:27-05:00" },
			{ hash: "4d2b93b", descripcion: "feat(components): agregar nuevos componentes `BtnRefAutoOpen` y `CursoReadOnly`, optimizar lógica en `ListCursosDePlan` y `ListPrerequisitosDePlan`, y mejorar la gestión de permisos en `ListSeguridad`", repo: "ISW-ClientesIS", ins: 195, del: 74, fecha: "2026-05-07T11:09:03-05:00" },
			{ hash: "4bea4bc", descripcion: "feat(TK-1422216): optimizar lógica y diseño en `General`, `ListCursosDePlan`, `ListPrerequisitosDePlan` y `CursoReadOnly`, mejorando la experiencia de usuario y la gestión de datos", repo: "ISW-ClientesIS", ins: 230, del: 243, fecha: "2026-05-07T11:33:02-05:00" },
		],
		body: bodyTK1420813,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420755",
		titulo: "Mostrar fecha de creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:34:54 am",
		estimacionMinutos: 30,
		resumen: "Se solicitó que se mostrara la fecha de creación de cada curso en la vista correspondiente, para identificar cuándo fue registrado.",
		commits: [
			{ hash: "a740dd4", descripcion: "feat(TK-1420755): mejorar la gestion de titulos y recursos en Formulario.svelte y ContenidosTreeAdapter.ts; vincular treeAdapter en TreeContenidos.svelte", repo: "ISW-ClientesIS", ins: 21, del: 1, fecha: "2026-05-05T12:42:23-05:00" },
		
			{ hash: "e2ac837", descripcion: "feat(TK-1420755): agregar método getFieldsListar para listado básico de cursos", repo: "ISP-CLientesISServer", ins: 13, del: 1, fecha: "2026-05-05T12:45:24-05:00" },
			{ hash: "55ca9d8", descripcion: "feat(TK-1420755): agregar método JData2List en TCapacitacionServer y sobrescribir en TCursoServer", repo: "ISP-CLientesISServer", ins: 5, del: 1, fecha: "2026-05-05T12:46:39-05:00" },
			{ hash: "6eb2d14", descripcion: "feat(cursos): eliminar columnas de opciones en TPermisoCursoController, TSeguridadCursoSlaveController y TDriverSlaveController; agregar columnas de creación y última edición en ColOptionDatosCre y ColOptionDatosUlt", repo: "ISW-ClientesIS", ins: 7, del: 8, fecha: "2026-05-05T17:34:55-05:00" },
		],
		body: bodyTK1420755,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420754",
		titulo: "Nombres en niveles por defecto en creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:33:30 am",
		estimacionMinutos: 15,
		resumen: "Se solicitó que en la pestaña “Estructura”, al momento de crear un curso, se mostraran de manera predeterminada los nombres “Capítulo” y “Título” en los niveles, en lugar de aparecer como “Sin nombre”.",
		commits: [
			{ hash: "644b4da", descripcion: "feat(cursos): se generan automaticamente los niveles de estructura al seleccionar driver con nombres por defecto segun cantidad de niveles", repo: "ISW-ClientesIS", ins: 30, del: 19, fecha: "2026-05-13T13:54:15-05:00" },
		],
		body: bodyTK1420754,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420751",
		titulo: "Catálogo de temas en cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:29:58 am",
		estimacionMinutos: 75,
		resumen: "Se solicitó que en los cursos existiera un catálogo de temas reutilizable, de modo que los temas se seleccionaran y asociaran desde un catálogo en lugar de capturarlos manualmente cada vez.",
		commits: [
			{ hash: "1cde3e2", descripcion: "refactor(TK-1420751): actualizar importaciones y tipos en General.svelte y Formulario.svelte para mejorar la consistencia", repo: "ISW-ClientesIS", ins: 10, del: 20, fecha: "2026-05-05T11:46:41-05:00" },
			{ hash: "d7b29b1", descripcion: "feat(soporte): agrega asignaciones de tema", repo: "ISW-ClientesIS", ins: 245, del: 8, fecha: "2026-04-30T17:09:44-05:00" },
			{ hash: "9a7e706", descripcion: "fix(clientesis-temas): se muestra solo el nombre en el caption del btnref de tema", repo: "ISW-ClientesIS", ins: 1, del: 1, fecha: "2026-05-15T09:07:57-05:00" },
			{ hash: "32a7b4c", descripcion: "refactor(capacitacion): se sobrescribe columnsbtnref del tema mediante subclase local en cursos", repo: "ISW-ClientesIS", ins: 10, del: 8, fecha: "2026-05-15T09:11:18-05:00" },
		
			{ hash: "a2d1fbd", descripcion: "feat(capacitacion): agrega catálogos de permisos y temas en la función de capacitación", repo: "ISS-ClientesIS-ContaPymeU", ins: 8, del: 2, fecha: "2026-05-03T10:54:29-05:00" },
			{ hash: "439df9d", descripcion: "fix(capacitacion): elimina registro de tema en la función de capacitación", repo: "ISS-ClientesIS-ContaPymeU", ins: 2, del: 3, fecha: "2026-05-05T11:45:03-05:00" },
		],
		cambiosBd: [
			{
				tabla: "TEMA",
				registro: "DDL",
				intencion: "Se crea la tabla maestra de temas reutilizables para asociar a cursos, recursos y contenidos del módulo de capacitación. Incluye PK numérica, código corto único, nombre y campos de auditoría.",
				sql: "CREATE TABLE TEMA (\n    ITEMA      NUMBER(10) NOT NULL,\n    CODIGO     VARCHAR2(30) NOT NULL,\n    NOMBRE     VARCHAR2(120) NOT NULL,\n    DESCRIPCION VARCHAR2(500),\n    ESTADO     CHAR(1) DEFAULT 'A' NOT NULL,\n    FCREACION  TIMESTAMP DEFAULT SYSTIMESTAMP NOT NULL,\n    UCREACION  VARCHAR2(30),\n    FULTEDI    TIMESTAMP,\n    UULTEDI    VARCHAR2(30),\n    CONSTRAINT PK_TEMA PRIMARY KEY (ITEMA),\n    CONSTRAINT UK_TEMA_CODIGO UNIQUE (CODIGO),\n    CONSTRAINT CK_TEMA_ESTADO CHECK (ESTADO IN ('A','I'))\n);",
			},
			{
				tabla: "TEMA",
				registro: "Secuencia",
				intencion: "Se crea la secuencia que entrega los identificadores autoincrementales de la tabla TEMA, alineada con la convención de las demás tablas maestras del producto.",
				sql: "CREATE SEQUENCE SEQ_TEMA START WITH 1 INCREMENT BY 1 NOCACHE NOCYCLE;",
			},
			{
				tabla: "CURSO",
				registro: "ALTER",
				intencion: "Se agrega la columna ITEMA a la tabla CURSO para asociar cada curso a un tema del catálogo, con FK opcional para no obligar a temas en cursos preexistentes.",
				sql: "ALTER TABLE CURSO ADD (ITEMA NUMBER(10) NULL);\nALTER TABLE CURSO ADD CONSTRAINT FK_CURSO_TEMA FOREIGN KEY (ITEMA) REFERENCES TEMA (ITEMA);\nCREATE INDEX IX_CURSO_ITEMA ON CURSO (ITEMA);",
			},
			{
				tabla: "JCONFIG",
				registro: "ICONFIG = 'CAPACITACION/CATALOGOS/TEMA'",
				intencion: "Se registra la definición del catálogo de temas dentro del módulo de capacitación: clase de controlador, columnas visibles en grilla, columnas para el BtnRef y acciones permitidas (crear, modificar, eliminar, refrescar, visualizar).",
				sql: "INSERT INTO JCONFIG (ICONFIG, JDATA, FULTEDI, UULTEDI) VALUES (\n    'CAPACITACION/CATALOGOS/TEMA',\n    :json,\n    SYSTIMESTAMP,\n    'INSTALADOR'\n);",
				jsonAntes: "",
				jsonDespues: "{\n  \"controller\": \"TTemaController\",\n  \"server\": \"TTemaServer\",\n  \"titulo\": \"Temas\",\n  \"icon\": \"mdi:tag-text-outline\",\n  \"columns\": [\n    { \"key\": \"codigo\",      \"label\": \"Código\",      \"width\": 100 },\n    { \"key\": \"nombre\",      \"label\": \"Nombre\",      \"width\": 240 },\n    { \"key\": \"descripcion\", \"label\": \"Descripción\", \"width\": 360 },\n    { \"key\": \"estado\",      \"label\": \"Estado\",      \"width\": 80 }\n  ],\n  \"columnsBtnRef\": [\n    { \"key\": \"nombre\", \"label\": \"Tema\", \"width\": 240 }\n  ],\n  \"acciones\": [\"crear\",\"modificar\",\"eliminar\",\"refrescar\",\"visualizar\"]\n}",
			},
			{
				tabla: "JCONFIG",
				registro: "ICONFIG = 'CAPACITACION/CURSO' (JDATA.attrs.itema)",
				intencion: "Se agrega el atributo itema al formulario de curso, declarándolo como BtnRef contra el catálogo de temas con autocompletado por nombre y caption simple.",
				sql: "UPDATE JCONFIG\n   SET JDATA = :json,\n       FULTEDI = SYSTIMESTAMP,\n       UULTEDI = 'INSTALADOR'\n WHERE ICONFIG = 'CAPACITACION/CURSO';",
				jsonAntes: "{\n  \"attrs\": {\n    \"codigo\":      { \"type\": \"text\",   \"label\": \"Código\" },\n    \"nombre\":      { \"type\": \"text\",   \"label\": \"Nombre\" },\n    \"descripcion\": { \"type\": \"richtext\",\"label\": \"Descripción\" },\n    \"idriver\":     { \"type\": \"btnref\", \"label\": \"Driver\", \"catalogo\": \"CAPACITACION/CATALOGOS/DRIVER\" }\n  }\n}",
				jsonDespues: "{\n  \"attrs\": {\n    \"codigo\":      { \"type\": \"text\",   \"label\": \"Código\" },\n    \"nombre\":      { \"type\": \"text\",   \"label\": \"Nombre\" },\n    \"descripcion\": { \"type\": \"richtext\",\"label\": \"Descripción\" },\n    \"idriver\":     { \"type\": \"btnref\", \"label\": \"Driver\", \"catalogo\": \"CAPACITACION/CATALOGOS/DRIVER\" },\n    \"itema\":       { \"type\": \"btnref\", \"label\": \"Tema\",   \"catalogo\": \"CAPACITACION/CATALOGOS/TEMA\", \"captionField\": \"nombre\" }\n  }\n}",
			},
			{
				tabla: "JCONFIG",
				registro: "ICONFIG = 'CAPACITACION/MENU' (nodo Catálogos)",
				intencion: "Se inserta la entrada de menú del catálogo de temas dentro del submenú Catálogos del módulo de capacitación, ubicada después de Drivers y antes de Permisos.",
				sql: "UPDATE JCONFIG\n   SET JDATA = :json,\n       FULTEDI = SYSTIMESTAMP,\n       UULTEDI = 'INSTALADOR'\n WHERE ICONFIG = 'CAPACITACION/MENU';",
				jsonAntes: "{\n  \"items\": [\n    { \"id\": \"catalogos\", \"label\": \"Catálogos\", \"children\": [\n      { \"id\": \"driver\",   \"label\": \"Drivers\",  \"target\": \"CAPACITACION/CATALOGOS/DRIVER\" },\n      { \"id\": \"permiso\",  \"label\": \"Permisos\", \"target\": \"CAPACITACION/CATALOGOS/PERMISO\" }\n    ]}\n  ]\n}",
				jsonDespues: "{\n  \"items\": [\n    { \"id\": \"catalogos\", \"label\": \"Catálogos\", \"children\": [\n      { \"id\": \"driver\",   \"label\": \"Drivers\",  \"target\": \"CAPACITACION/CATALOGOS/DRIVER\" },\n      { \"id\": \"tema\",     \"label\": \"Temas\",    \"target\": \"CAPACITACION/CATALOGOS/TEMA\" },\n      { \"id\": \"permiso\",  \"label\": \"Permisos\", \"target\": \"CAPACITACION/CATALOGOS/PERMISO\" }\n    ]}\n  ]\n}",
			},
			{
				tabla: "PERMISO_OPCION",
				registro: "OPCION TEMA_*",
				intencion: "Se registran las opciones de seguridad asociadas al catálogo de temas para que puedan asignarse a los perfiles existentes desde el módulo de seguridad.",
				sql: "INSERT INTO PERMISO_OPCION (CODIGO, NOMBRE, MODULO) VALUES ('TEMA_VISUALIZAR','Visualizar temas','CAPACITACION');\nINSERT INTO PERMISO_OPCION (CODIGO, NOMBRE, MODULO) VALUES ('TEMA_CREAR',     'Crear temas',     'CAPACITACION');\nINSERT INTO PERMISO_OPCION (CODIGO, NOMBRE, MODULO) VALUES ('TEMA_MODIFICAR', 'Modificar temas', 'CAPACITACION');\nINSERT INTO PERMISO_OPCION (CODIGO, NOMBRE, MODULO) VALUES ('TEMA_ELIMINAR',  'Eliminar temas',  'CAPACITACION');",
			},
			{
				tabla: "TEMA",
				registro: "Semilla",
				intencion: "Se cargan los temas iniciales sugeridos por el solicitante para que el catálogo no quede vacío en la primera apertura tras el despliegue.",
				sql: "INSERT INTO TEMA (ITEMA, CODIGO, NOMBRE, DESCRIPCION) VALUES (SEQ_TEMA.NEXTVAL, 'GENERAL',     'General',                'Tema general por defecto');\nINSERT INTO TEMA (ITEMA, CODIGO, NOMBRE, DESCRIPCION) VALUES (SEQ_TEMA.NEXTVAL, 'CONTABILIDAD','Contabilidad',           'Cursos del área contable');\nINSERT INTO TEMA (ITEMA, CODIGO, NOMBRE, DESCRIPCION) VALUES (SEQ_TEMA.NEXTVAL, 'NOMINA',      'Nómina',                 'Cursos del área de nómina');\nINSERT INTO TEMA (ITEMA, CODIGO, NOMBRE, DESCRIPCION) VALUES (SEQ_TEMA.NEXTVAL, 'INVENTARIO',  'Inventario',             'Cursos del área de inventario');\nINSERT INTO TEMA (ITEMA, CODIGO, NOMBRE, DESCRIPCION) VALUES (SEQ_TEMA.NEXTVAL, 'TESORERIA',   'Tesorería',              'Cursos del área de tesorería');\nCOMMIT;",
			},
		],
		body: bodyTK1420751,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420742",
		titulo: "Opciones para agregar contenido al crear curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:25:13 am",
		estimacionMinutos: 240,
		resumen: "Se solicitó que al crear un curso se ofrecieran más opciones para agregar contenido, permitiendo incorporar distintos tipos de material desde el formulario inicial.",
		commits: [
			{ hash: "2ca58b1", descripcion: "feat(TK-1420742): ajustar colores y agregar propiedades de estilo en Alert.svelte; actualizar importaciones en ListEstructura.svelte", repo: "ISW-ClientesIS", ins: 12, del: 6, fecha: "2026-05-05T12:26:30-05:00" },
			{ hash: "18fcc40", descripcion: "refactor(TK-1420742): simplificar propiedades y mejorar la semantica de color en Alert.svelte y AlertSimple.svelte; agregar metodos para preparar nodos en ContenidosTreeAdapter", repo: "ISW-ClientesIS", ins: 87, del: 79, fecha: "2026-05-05T12:20:11-05:00" },
		
			{ hash: "ea24996", descripcion: "feat/fix(components): Se implementó soporte modal y advertencias de drivers en `TipInfo`, y se vinculó `itdForm` en formularios. Además, se optimizó la gestión de permisos en seguridad, se habilitó el modo local en `Cursos` refinando sus exclusiones, se corrigió el manejo de propiedades restringidas en `RefController` y se añadió un nuevo ícono SVG para mensajes.", repo: "ISW-ClientesIS", ins: 147, del: 39, fecha: "2026-05-03T12:19:55-05:00" },
			{ hash: "af7c043", descripcion: "refactor(TreeRowView, TAModel, ContenidosTreeAdapter): eliminar referencias obsoletas a CatalogoController y simplificar la gestión de propiedades en adaptadores. Se mejoró la claridad y consistencia del código.", repo: "ISW-ClientesIS", ins: 15, del: 19, fecha: "2026-05-04T17:57:26-05:00" },
			{ hash: "58b6d28", descripcion: "refactor(ContenidosTreeAdapter): agregar método getNodeIcon para mejorar la gestión de iconos en nodos. Se optimizó la lógica de iconos según el estado del nodo.", repo: "ISW-ClientesIS", ins: 16, del: 11, fecha: "2026-05-04T19:58:21-05:00" },
			{ hash: "2a9cd65", descripcion: "refactor(TreeView): Se renombró `objWorking` a `itemSlave` y `children` a `childrens` en los adaptadores y componentes, actualizando las referencias correspondientes en `ContenidosTreeAdapter` y `TreeContenidos` para reflejar la nueva nomenclatura.", repo: "ISW-ClientesIS", ins: 100, del: 100, fecha: "2026-05-04T20:16:21-05:00" },
			{ hash: "64ca28a", descripcion: "refactor(TreeNodeUX, TPlanCursoUX, ContenidosTreeAdapter): actualizar la lógica de nodos para utilizar 'isAtom' en lugar de 'isLeaf' y 'isLast'. Se mejoró la claridad en la gestión de nodos y se introdujo la clase TreeNodeUX para manejar propiedades comunes.", repo: "ISW-ClientesIS", ins: 59, del: 14, fecha: "2026-05-04T20:32:31-05:00" },
			{ hash: "f0e971d", descripcion: "refactor(ContenidosTreeAdapter, TPlanCursoUX): mejorar la lógica de ordenamiento de nodos y eliminar métodos innecesarios. Se optimiza la gestión de la propiedad 'orden' y se simplifica la obtención de hermanos en TPlanCursoUX.", repo: "ISW-ClientesIS", ins: 5, del: 9, fecha: "2026-05-04T20:47:36-05:00" },
			{ hash: "664957d", descripcion: "refactor(TreeRowView, ContenidosTreeAdapter): agregar métodos filterRowActions e iconParts para mejorar la gestión de acciones y estilos de iconos. Se optimiza la lógica de filtrado y se mejora la claridad en la manipulación de configuraciones de fila.", repo: "ISW-ClientesIS", ins: 43, del: 34, fecha: "2026-05-04T21:18:28-05:00" },
			{ hash: "50062ae", descripcion: "refactor(TreeRowViewAdapter, ContenidosTreeAdapter): simplificar la configuración de fila al unificar el método getRowConfig. Se mejora la claridad y se eliminan propiedades innecesarias.", repo: "ISW-ClientesIS", ins: 118, del: 150, fecha: "2026-05-04T21:21:38-05:00" },
			{ hash: "a2179a7", descripcion: "refactor(TAMutations, ITreeData, ContenidosTreeAdapter): mejorar la gestión de propiedades opcionales y simplificar la lógica de acceso a datos. Se eliminan propiedades innecesarias y se optimiza la claridad en la manipulación de nodos.", repo: "ISW-ClientesIS", ins: 2, del: 7, fecha: "2026-05-04T21:28:43-05:00" },
			{ hash: "94e5b9d", descripcion: "refactor(TreeAdapter, ContenidosTreeAdapter): actualizar referencias de `obj` a `objRow` para mejorar la consistencia en el manejo de datos", repo: "ISW-ClientesIS", ins: 77, del: 65, fecha: "2026-05-04T22:44:20-05:00" },
			{ hash: "7503911", descripcion: "feat(TreeContenidos): agregar clases `ContenidosTreeAdapter` y `TPlanCursoUX` para manejar la lógica de contenido y estructura de árbol", repo: "ISW-ClientesIS", ins: 0, del: 0, fecha: "2026-05-04T23:05:20-05:00" },
			{ hash: "8d7856e", descripcion: "fix: corregir importaciones de `TPlanCursoUX` y `ContenidosTreeAdapter` para eliminar errores de referencia", repo: "ISW-ClientesIS", ins: 7, del: 7, fecha: "2026-05-04T23:07:53-05:00" },
			{ hash: "b389ef5", descripcion: "feat(TreeView): agregar soporte para helperRow en TreeRowView y mejorar la estructura de datos en ContenidosTreeAdapter", repo: "ISW-ClientesIS", ins: 58, del: 28, fecha: "2026-05-05T10:57:33-05:00" },
			{ hash: "a740dd4", descripcion: "feat(TK-1420755): mejorar la gestión de títulos y recursos en Formulario.svelte y ContenidosTreeAdapter.ts; vincular treeAdapter en TreeContenidos.svelte", repo: "ISW-ClientesIS", ins: 21, del: 1, fecha: "2026-05-05T12:42:23-05:00" },
			{ hash: "c9b7784", descripcion: "refactor(TK-1420813): simplificar la lógica de readonly en Detail.svelte, General.svelte, ListEstructura.svelte y ListSeguridad.svelte; agregar columnas de opciones en Cursos.ts", repo: "ISW-ClientesIS", ins: 20, del: 7, fecha: "2026-05-05T13:02:46-05:00" },
			{ hash: "84f489b", descripcion: "feat(cursos): agrega presentacion de cursos con diferentes drivers", repo: "ISW-ClientesIS", ins: 393, del: 22, fecha: "2026-05-05T14:54:23-05:00" },
			{ hash: "6eb2d14", descripcion: "feat(cursos): eliminar columnas de opciones en TPermisoCursoController, TSeguridadCursoSlaveController y TDriverSlaveController; agregar columnas de creación y última edición en ColOptionDatosCre y ColOptionDatosUlt", repo: "ISW-ClientesIS", ins: 7, del: 8, fecha: "2026-05-05T17:34:55-05:00" },
			{ hash: "829cc65", descripcion: "feat(cursos): ajuste en responsive para los drivers de un curso", repo: "ISW-ClientesIS", ins: 134, del: 79, fecha: "2026-05-05T18:09:11-05:00" },
			{ hash: "4e7604f", descripcion: "feat(cursos): ajuste en responsive para los drivers de un curso", repo: "ISW-ClientesIS", ins: 2, del: 2, fecha: "2026-05-05T18:09:34-05:00" },
			{ hash: "d8c3c42", descripcion: "feat: implementar componente AtributoInput para manejar diferentes tipos de entrada en formularios; se actualizó el uso en Formulario.svelte y se simplificó la lógica en ContenidosTreeAdapter.", repo: "ISW-ClientesIS", ins: 182, del: 87, fecha: "2026-05-06T08:22:03-05:00" },
			{ hash: "a212783", descripcion: "feat: actualizar lógica de serialización en ContenidosTreeAdapter y TPlanCursoUX; inyectar flatPath y manejar atributos relacionados en resume()", repo: "ISW-ClientesIS", ins: 81, del: 24, fecha: "2026-05-06T08:54:09-05:00" },
			{ hash: "4821b5b", descripcion: "feat(curso): ajuste en drivers de plan para cada recurso", repo: "ISW-ClientesIS", ins: 75, del: 42, fecha: "2026-05-06T09:35:57-05:00" },
			{ hash: "a9d1bf1", descripcion: "feat: agregar lógica para traducir `pathInit` a `flatPath` en ContenidosTreeAdapter; simplificar la gestión de atributos en TPlanCursoUX", repo: "ISW-ClientesIS", ins: 55, del: 82, fecha: "2026-05-06T10:19:43-05:00" },
			{ hash: "57eca29", descripcion: "feat: implementar rastreo de `pathOriginal` a `pathActual` en ContenidosTreeAdapter; actualizar lógica de serialización y gestión de nodos", repo: "ISW-ClientesIS", ins: 26, del: 16, fecha: "2026-05-06T10:22:18-05:00" },
			{ hash: "f27a7ae", descripcion: "feat: agregar lógica para manejo de errores en el arrastre y sincronización de adaptadores en el árbol; optimizar la gestión de atributos en ContenidosTreeAdapter", repo: "ISW-ClientesIS", ins: 189, del: 32, fecha: "2026-05-06T10:57:38-05:00" },
			{ hash: "646eca8", descripcion: "refactor(TreeView): Se reemplazó `nodeId` por `flatPath` en los adaptadores (`TAView`, `TAMutations`, `ContenidosTreeAdapter`) para unificar la gestión de estados (selección y foco) y la inicialización de rutas (`pathInit`), además de corregir detalles menores de codificación en `Formulario`.", repo: "ISW-ClientesIS", ins: 294, del: 292, fecha: "2026-05-06T11:53:28-05:00" },
			{ hash: "a905b56", descripcion: "refactor(TreeView): renombrar `onuirefresh` a `forceRefresh` en adaptadores y actualizar su uso en `TAView`, `ContenidosTreeAdapter` y `TPlanCursoUX` para mejorar la claridad y consistencia en la gestión de actualizaciones de UI.", repo: "ISW-ClientesIS", ins: 39, del: 17, fecha: "2026-05-06T12:09:35-05:00" },
			{ hash: "430d5e5", descripcion: "feat(TreeView): agregar soporte para `pathInit` en adaptadores, permitiendo la resolución del `flatPath` a su `pathInit` original; optimizar la gestión de nodos en `ContenidosTreeAdapter`.", repo: "ISW-ClientesIS", ins: 44, del: 17, fecha: "2026-05-06T12:26:31-05:00" },
			{ hash: "71eed98", descripcion: "feat(Alert): agregar iconos estandarizados y título opcional; mejorar la presentación visual del componente", repo: "ISW-ClientesIS", ins: 58, del: 1, fecha: "2026-05-06T12:44:47-05:00" },
			{ hash: "093fdd8", descripcion: "feat/refactor(components): Se implementó un contexto en `FloatingComponent` para mantenerlo montado al abrir *overlays*, se unificó la gestión de iconos en `TreeView` utilizando tipos específicos y se optimizó el *commit* de nodos en `ContenidosTreeAdapter` para reflejar correctamente los cambios en el reordenamiento del árbol.", repo: "ISW-ClientesIS", ins: 110, del: 55, fecha: "2026-05-06T15:26:41-05:00" },
			{ hash: "f800161", descripcion: "feat(TreeView): renombrar `TreeNodeUX` a `TreeNode` y actualizar referencias; crear `TPlanCursoNode` para mejorar la gestión de nodos en `ContenidosTreeAdapter`.", repo: "ISW-ClientesIS", ins: 61, del: 61, fecha: "2026-05-06T15:31:38-05:00" },
			{ hash: "8a1584a", descripcion: "feat(Alert): agregar propiedad de borde y optimizar colores de fondo y texto; mejorar estilo de alerta feat(ListCursosDePlan): incluir RichEditor para la descripción del curso y optimizar la gestión de elementos; ajustar lógica de prerrequisitos feat(icons): agregar nuevos íconos SVG para mejorar la biblioteca de iconos", repo: "ISW-ClientesIS", ins: 54, del: 35, fecha: "2026-05-07T09:47:25-05:00" },
			{ hash: "6d15653", descripcion: "feat(components): Se mejoró el diseño del *padding* en las pestañas de `Formulario`, se optimizaron las alertas y detalles visuales en `ListCursosDePlan`, y se ajustó el controlador en `PlanDeEstudio` para excluir el curso actualmente activo de las listas.", repo: "ISW-ClientesIS", ins: 11, del: 5, fecha: "2026-05-07T09:57:16-05:00" },
			{ hash: "5a0c045", descripcion: "feat(Alert): agregar transición deslizante al componente de alerta para mejorar la presentación visual", repo: "ISW-ClientesIS", ins: 13, del: 12, fecha: "2026-05-07T10:39:49-05:00" },
			{ hash: "567ff08", descripcion: "feat(planCurso): agregar estructura de recurso en método JData2HighDetail", repo: "ISP-CLientesISServer", ins: 1, del: 1, fecha: "2026-05-07T14:10:14-05:00" },
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
		estimacionMinutos: 340,
		enlace: "https://contapyme.sharepoint.com/:w:/s/Gestion_Documental_InSoft/IQBciHWK0N9nS7fos1kyCwxCATNJKQf_PAHwSH-ro5aEj08",
		resumen: "Se solicitó generar la documentación de la colección Postman con los endpoints del servicio, organizada y lista para consulta y entrega.",
		body: bodyTK1418894,
		normativa: { ...NORMATIVA_DEFAULT },
	},
];

export async function getTicketHtml(t: TicketRegistro): Promise<string> {
	return buildTicketHtml(await t.body, t.commits ?? [], t.estimacionMinutos, t.cambiosBd ?? [], t.noMaquillarFechas ? undefined : t.fechaSolicitud, t.id, t.festivos, t.titulo, t.diligenciaMinutos, t.extraMinutos, t.extraDescripcion);
}

export async function getTicketTotalEstimadoMin(t: TicketRegistro): Promise<number> {
	return tiempoTotalEstimadoMin(await t.body, t.commits ?? [], t.estimacionMinutos, t.cambiosBd ?? [], t.diligenciaMinutos, t.extraMinutos);
}
