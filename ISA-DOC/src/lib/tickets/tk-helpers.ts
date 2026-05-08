// Helpers compartidos entre cuerpos de tickets para mantener un estilo
// homogéneo (h3 con ícono, notas con borde, lista de notas, etc.).
//
// Los íconos se renderizan como SVG inline (vía `iconSvg`). Se intentó la
// variante `<img>` hacia api.iconify.design, pero algunos clientes de
// correo (Outlook) bloquean / no descargan la imagen y dejan un hueco; el
// SVG embebido se renderiza nativo en el HTML del correo.
import { iconSvg } from "./snippets";

export const NOTE_COLOR = "#777";

// <h3> con ícono Iconify a la izquierda y color principal del visor.
export async function h3Iconized(iconName: string, label: string): Promise<string> {
	const ic = await iconSvg(iconName, { size: 18, color: "#1e90ff" });
	return (
		`<h3 style="color:#1e90ff;margin-top:1.25rem;">` +
		`${ic}&nbsp;&nbsp;<span style="vertical-align:middle;">${label}</span></h3>`
	);
}

// Item de nota: <li> con borde, ícono y texto en gris.
export async function note(iconName: string, html: string): Promise<string> {
	const ic = await iconSvg(iconName, { size: 16, color: NOTE_COLOR });
	return (
		`<li style="border:1px solid #80808030;border-radius:4px;padding:0.5rem;margin-bottom:0.5rem;list-style:none;color:${NOTE_COLOR};">` +
		`${ic}&nbsp;&nbsp;<span style="vertical-align:middle;">${html}</span>` +
		`</li>`
	);
}

// Envuelve N items previamente generados con `note(...)` en un <ul> sin estilo.
export function noteList(...items: string[]): string {
	return (
		`<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">` +
		items.join("") +
		`</ul>`
	);
}
