// TK-1420819 — Campos vacíos en grid curso (Tema / Driver). Resuelto.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>En el listado del catálogo de cursos las columnas <b>Tema</b> y  
	<b>Driver</b> aparecían vacías, aunque al abrir el detalle del registro sí  
	se mostraban los valores. El ajuste ya está aplicado y verificado.</div>`;

export async function buildBodyTK1420819(): Promise<string> {
	const [h3a, h3c] = await Promise.all([
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:information-outline", "Observación"),
	]);
	const fix = await note(
		"mdi:code-tags-check",
		`Se ajustó el resumen del curso que entrega el servidor para que incluya  
		también los datos de <b>Tema</b> y <b>Driver</b> que necesita el  
		listado; ahora las columnas muestran el nombre correctamente.`,
	);
	const obs = await note(
		"mdi:account-clock-outline",
		`Por favor esperar la notificación de solución de los tickets anteriores antes de  
		abrir uno nuevo sobre el mismo módulo, así se evita repetir las actividades de  
		revisión y reporte.`,
	);
	const ulOpen = `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">`;
	const figGrid = img("cursosGridFix.jpg");
	return (
		intro + figGrid +
		h3a + ulOpen + fix + `</ul>` +
		h3c + ulOpen + obs + `</ul>`
	);
}

export const bodyTK1420819: Promise<string> = buildBodyTK1420819();
