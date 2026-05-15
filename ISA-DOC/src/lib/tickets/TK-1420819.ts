// TK-1420819 — Campos vacíos en grid curso (Tema / Driver). Resuelto.
import { code as codeI, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>En el grid del catálogo de cursos las columnas <b>Tema</b> y <b>Driver</b>  
	aparecían vacías, aunque el detalle del registro sí mostraba los valores.  
	El ajuste ya está aplicado y verificado.</div>`;

export async function buildBodyTK1420819(): Promise<string> {
	const [h3a, h3c] = await Promise.all([
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:information-outline", "Observación"),
	]);
	const fix = await note(
		"mdi:code-tags-check",
		`Se ajustó ${codeI("TCursoServer.JData2List")} para incluir los nodos anidados  
		${codeI("tema")} y ${codeI("driver")} que consume el grid; ahora las columnas  
		muestran el nombre correctamente.`,
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
