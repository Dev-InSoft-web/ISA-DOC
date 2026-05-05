// TK-1420755 — Mostrar fecha de creación de curso.
import { code as codeI, codeBlock, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Se incorporaron las columnas de auditoría (creación / última modificación) en todos ` +
	`los grids del módulo de Cursos, de modo que el usuario pueda activar la columna ` +
	`<b>Fecha de creación</b> (y los demás datos del registro) desde el selector de columnas.</div>`;

export async function buildBodyTK1420755(): Promise<string> {
	const [h3a, h3b, snippet] = await Promise.all([
		h3Iconized("mdi:table-column-plus-after", "Audit columns al final de cada Columns"),
		h3Iconized("mdi:autorenew", "Bonus: autocompletado del título de un nodo"),
		codeBlock(
		`Columns: TGridColumn<TCurso> = {
  icurso:  { caption: this.labelPk },
  ncurso:  { caption: "Nombre" },
  itema:   { visible: false, caption: "Cód Tema" },
  tema:    { caption: "Tema",   GetDisplayText: (_v, o) => o.tema?.ntema },
  idriver: { visible: false, caption: "Cód Driver" },
  driver:  { caption: "Driver", GetDisplayText: (_v, o) => o.driver?.ndriver },
  bactivo:            { caption: "Activo",            type: "bool" },
  bgeneracertificado: { caption: "Genera certificado", type: "bool" },
  ...ColOptionDatosCre, // fhcre, ipcre, itercerocre, igrupocre, irolcre, …
  ...ColOptionDatosUlt, // fhult, ipult, iterceroult, igrupoult, irolult, …
};`,
		),
	]);
	const items = await Promise.all([
		note(
			"mdi:table-eye",
			`Se aplicó el patrón ${codeI("...ColOptionDatosCre, ...ColOptionDatosUlt")} (importados de ` +
			`${codeI("$lib/const")}) a todas las ${codeI("Columns")} de los controllers de Capacitación de ` +
			`Cursos: ${codeI("TCursoController")}, ${codeI("TDriverSlaveController")}, ` +
			`${codeI("TEstructuraCursoSlaveController")}, ${codeI("TPermisoCursoController")} y ` +
			`${codeI("TSeguridadCursoSlaveController")}.`,
		),
		note(
			"mdi:eye-off-outline",
			`Todas las columnas de auditoría llegan con ${codeI("visible: false")} ` +
			`(siguiendo el estándar del proyecto). El usuario las activa desde el selector de columnas ` +
			`del grid según necesidad.`,
		),
		note(
			"mdi:format-list-bulleted-type",
			`En ${codeI("TCursoController")} adicionalmente se ocultaron ${codeI("itema")} e ` +
			`${codeI("idriver")} (FK) dejando visibles solo los nombres ` +
			`(${codeI("tema.ntema")} / ${codeI("driver.ndriver")}).`,
		),
		note(
			"mdi:source-branch",
			`Comp. asociado en backend: ${codeI("TCursoServer.JData2List")} ya retorna ` +
			`${codeI("{ tema: {}, driver: {} }")} para alimentar el grid.`,
		),
		note(
			"mdi:rename-box",
			`En el formulario de árbol de contenidos, ${codeI("ContenidosTreeAdapter.prepareLastLevelNodeData")} ` +
			`y ${codeI("Formulario.svelte")} autocompletan ${codeI("frmObj.titulo")} con ` +
			`${codeI("recurso.nrecurso")} cuando el usuario asocia un recurso por primera vez ` +
			`(disparado una vez por ${codeI("flatPath")} para evitar sobrescribir ediciones manuales).`,
		),
	]);
	const figListado = img("cursosListado.jpg");
	const figPicker = img("columnPickerAudit.jpg");
	return (
		intro + figListado +
		h3a + snippet + figPicker +
		`<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[0]}${items[1]}${items[2]}${items[3]}</ul>` +
		h3b + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[4]}</ul>`
	);
}

export const bodyTK1420755: Promise<string> = buildBodyTK1420755();

