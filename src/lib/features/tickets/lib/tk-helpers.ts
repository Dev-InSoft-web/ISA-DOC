// Helpers compartidos entre cuerpos de tickets para mantener un estilo
// homogéneo (h3 con ícono, notas con borde, lista de notas, etc.).
//
// Redacción narrativa del body: español semántico (sin bloques de código sueltos
// en el texto). Sí usar codeBlock para JSON, SQL o TS cuando aporten evidencia;
// esos fragmentos visibles no llevan comentarios (ver docs/CODE-FRAGMENTS.md).
// El SQL completo de ejecución también va en cambiosBd (misma regla).
//
// Commits (mensaje y tabla del ticket): usar el subject exacto de git
// (`git show -s --format=%s <hash>`); el mismo texto en index.ts y bitácora.
//
// Los íconos se renderizan como <img> hacia api.iconify.design con el color
// como query string (`?color=%23hex`). El tamaño se fija con `width`/`height`
// + min/max en el style inline para que ningún cliente de correo distorsione
// la imagen al reescalar por viewport.
import { icon } from "./snippets";

export const NOTE_COLOR = "#777";

// <h3> con ícono Iconify a la izquierda y color principal del visor.
export async function h3Iconized(iconName: string, label: string): Promise<string> {
	const ic = icon(iconName, { size: 18, color: "#1e90ff" });
	return (
		`<h3 style="color:#1e90ff;margin-top:1.25rem;font-weight:bold;">` +
		`${ic}&nbsp;&nbsp;<strong style="vertical-align:middle;font-weight:bold;">${label}</strong></h3>`
	);
}

// Item de nota: <li> con borde, ícono y texto en gris.
export async function note(iconName: string, html: string): Promise<string> {
	const ic = icon(iconName, { size: 16, color: NOTE_COLOR });
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
