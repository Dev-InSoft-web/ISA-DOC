import { buildTicketHtml } from "./template";
import bodyTK1418894 from "./TK-1418894.html?raw";

export interface TicketRegistro {
	id: string;
	titulo: string;
	solicitante: string;
	fechaSolicitud: string;
	fechaEntrega?: string;
	enlace?: string;
	body: string;
}

export const TICKETS: TicketRegistro[] = [
	{
		id: "TK-1418894",
		titulo: "Documentación Postman",
		solicitante: "Ingeniero Camilo Rámirez",
		fechaSolicitud: "29/abr./2026 05:24:11 pm",
		fechaEntrega: "jueves 30 abril",
		enlace: "https://contapyme.sharepoint.com/:w:/s/Gestion_Documental_InSoft/IQBciHWK0N9nS7fos1kyCwxCATNJKQf_PAHwSH-ro5aEj08",
		body: bodyTK1418894,
	},
];

export function getTicketHtml(t: TicketRegistro): string {
	return buildTicketHtml(t.body);
}
