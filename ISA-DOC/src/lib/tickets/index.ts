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

export interface TicketNormativa {
	medioAtencion: string;
	tipoSolicitud: string;
	estadoSolicitud: string;
	tipoSolucion: string;
	coberturaEstimada: string;
	aplicacion: string;
	ambiente: string;
}

export interface TicketRegistro {
	id: string;
	titulo: string;
	solicitante: string;
	fechaSolicitud: string;
	fechaEntrega?: string;
	enlace?: string;
	resumen?: string;
	body: Promise<string>;
	normativa: TicketNormativa;
}

const NORMATIVA_DEFAULT: TicketNormativa = {
	medioAtencion: "Sistema de soporte",
	tipoSolicitud: "1 - PQR proyecto (para uso AT e ING únicamente)",
	estadoSolicitud: "1 - Atención sin novedades",
	tipoSolucion: "No aplica",
	coberturaEstimada: "No aplica",
	aplicacion: "ContaPyme U",
	ambiente: "Producción",
};

export const TICKETS: TicketRegistro[] = [
	{
		id: "TK-1424809",
		titulo: "Menú de acciones incompleto",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 09:40:35 am",
		resumen: "El ingeniero reportó que el menú de acciones de los catálogos Cursos y Planes de estudio mostraba solo cinco acciones (Crear, Visualizar, Modificar, Eliminar y Refrescar) mientras que los demás catálogos maestros exponen también Verificar, Duplicar, Recodificar y Consolidar. El menú contextual del grid (clic derecho) también quedaba recortado a tres opciones.",
		body: bodyTK1424809,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1424806",
		titulo: "Permisos de modificación con la acción “Visualizar” en el catálogo de cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "13/may./2026 09:33:57 am",
		resumen: "En revisión de las acciones disponibles del catálogo de cursos se identifica que ingresando por la opción Visualizar, en las pestañas ‘Estructura’ y ‘Seguridad’ se pueden hacer modificaciones o crear información. La idea es que este Visualizar no deje hacer ninguna acción diferente a ver, no más.",
		body: bodyTK1424806,
		normativa: { ...NORMATIVA_DEFAULT, tipoSolicitud: "1 - PQR Error del sistema" },
	},
	{
		id: "TK-1423165",
		titulo: "Plan de contenidos: etiquetas, atributos, autoapertura y padre correcto",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "08/may./2026",
		resumen: "El ingeniero reportó cuatro hallazgos sobre el plan de contenidos del curso: (1) los campos del formulario del nodo deben usar la nomenclatura del nivel correspondiente para diferenciar capítulo y recurso, (2) los atributos adicionales deben mostrarse solo en el último nivel y no en capítulos intermedios, (3) el catálogo de recurso debe abrirse automáticamente al crear un título nuevo y autocompletar el nombre solo cuando está vacío, y (4) las acciones de insertar arriba, abajo o como hijo deben crear el nuevo nodo bajo el padre correcto.",
		body: bodyTK1423165,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1422216",
		titulo: "Función cargar recursos en plan de estudio",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "07/may./2026 10:37:59 am",
		resumen: "En revisión del formulario rápido del catálogo de plan de estudio, se identificó que actualmente en la pestaña de “Cursos de plan de estudio”, tiene la opción crear, lo cual es confuso porque da la impresión de que fuera a crear un recurso. Al momento de abrirla se queda el action drawer en blanco. Se debe abrir el catálogo de cursos para seleccionar los cursos que deben quedar dentro del plan.",
		body: bodyTK1422216,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420819",
		titulo: "Campos vacíos grid curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 02:03:59 pm",
		resumen: "En revisión de la grid del catálogo del curso, se identifica que los campos “Tema” y “Driver” aparecen vacíos, aún cuando ya se diligenciaron para los cursos.",
		body: bodyTK1420819,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420813",
		titulo: "Campos modo visualización en edición de formulario rápido curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 12:26:30 pm",
		resumen: "El ingeniero manifiesta que, al revisar los campos disponibles desde la vista de formulario rápido en el catálogo de curso, varios campos están en modo visualización (mensaje, nombres de la estructura, los de crear con seguridad). Solicita que, siempre que se ingrese por modificar, esos campos sean editables.",
		body: bodyTK1420813,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420755",
		titulo: "Mostrar fecha de creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:34:54 am",
		resumen: "El ingeniero manifiesta que se debe mostrar la fecha de creación de cada curso en la vista correspondiente, para identificar cuándo fue registrado.",
		body: bodyTK1420755,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420754",
		titulo: "Nombres en niveles por defecto en creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:33:30 am",
		resumen: "El ingeniero manifiesta que en la pestaña “Estructura”, al momento de crear un curso, deberían mostrarse de manera predeterminada los nombres “Capítulo” y “Título” en los niveles, en lugar de aparecer como “Sin nombre”.",
		body: bodyTK1420754,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420751",
		titulo: "Catálogo de temas en cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:29:58 am",
		resumen: "El ingeniero manifiesta que en los cursos debe existir un catálogo de temas reutilizable, de modo que los temas se seleccionen y asocien desde un catálogo en lugar de capturarlos manualmente cada vez.",
		body: bodyTK1420751,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1420742",
		titulo: "Opciones para agregar contenido al crear curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:25:13 am",
		resumen: "El ingeniero manifiesta que al crear un curso se deben ofrecer más opciones para agregar contenido, permitiendo incorporar distintos tipos de material desde el formulario inicial.",
		body: bodyTK1420742,
		normativa: { ...NORMATIVA_DEFAULT },
	},
	{
		id: "TK-1418894",
		titulo: "Documentación Postman",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "29/abr./2026 05:24:11 pm",
		fechaEntrega: "jueves 30 abril",
		enlace: "https://contapyme.sharepoint.com/:w:/s/Gestion_Documental_InSoft/IQBciHWK0N9nS7fos1kyCwxCATNJKQf_PAHwSH-ro5aEj08",
		resumen: "El ingeniero manifiesta que se debe generar la documentación de la colección Postman con los endpoints del servicio, organizada y lista para consulta y entrega.",
		body: bodyTK1418894,
		normativa: { ...NORMATIVA_DEFAULT },
	},
];

export async function getTicketHtml(t: TicketRegistro): Promise<string> {
	return buildTicketHtml(await t.body);
}
