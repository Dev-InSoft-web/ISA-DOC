import { buildTicketHtml } from "./template";
import { bodyTK1418894 } from "./TK-1418894";
import { bodyTK1420742 } from "./TK-1420742";
import { bodyTK1420751 } from "./TK-1420751";
import { bodyTK1420754 } from "./TK-1420754";
import { bodyTK1420755 } from "./TK-1420755";
import { bodyTK1420813 } from "./TK-1420813";

export interface TicketRegistro {
	id: string;
	titulo: string;
	solicitante: string;
	fechaSolicitud: string;
	fechaEntrega?: string;
	enlace?: string;
	resumen?: string;
	body: Promise<string>;
}

export const TICKETS: TicketRegistro[] = [
	{
		id: "TK-1420813",
		titulo: "Campos modo visualización en edición de formulario rápido curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 12:26:30 pm",
		resumen: "El ingeniero manifiesta que, al revisar los campos disponibles desde la vista de formulario rápido en el catálogo de curso, varios campos están en modo visualización (mensaje, nombres de la estructura, los de crear con seguridad). Solicita que, siempre que se ingrese por modificar, esos campos sean editables.",
		body: bodyTK1420813,
	},
	{
		id: "TK-1420755",
		titulo: "Mostrar fecha de creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:34:54 am",
		resumen: "El ingeniero manifiesta que se debe mostrar la fecha de creación de cada curso en la vista correspondiente, para identificar cuándo fue registrado.",
		body: bodyTK1420755,
	},
	{
		id: "TK-1420754",
		titulo: "Nombres en niveles por defecto en creación de curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:33:30 am",
		resumen: "El ingeniero manifiesta que en la pestaña “Estructura”, al momento de crear un curso, deberían mostrarse de manera predeterminada los nombres “Capítulo” y “Título” en los niveles, en lugar de aparecer como “Sin nombre”.",
		body: bodyTK1420754,
	},
	{
		id: "TK-1420751",
		titulo: "Catálogo de temas en cursos",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:29:58 am",
		resumen: "El ingeniero manifiesta que en los cursos debe existir un catálogo de temas reutilizable, de modo que los temas se seleccionen y asocien desde un catálogo en lugar de capturarlos manualmente cada vez.",
		body: bodyTK1420751,
	},
	{
		id: "TK-1420742",
		titulo: "Opciones para agregar contenido al crear curso",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "05/may./2026 11:25:13 am",
		resumen: "El ingeniero manifiesta que al crear un curso se deben ofrecer más opciones para agregar contenido, permitiendo incorporar distintos tipos de material desde el formulario inicial.",
		body: bodyTK1420742,
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
	},
];

export async function getTicketHtml(t: TicketRegistro): Promise<string> {
	return buildTicketHtml(await t.body);
}
