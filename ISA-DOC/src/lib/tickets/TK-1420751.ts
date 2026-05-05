// TK-1420751 — Catálogo de temas en cursos.
import { code as codeI, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";
import { imgUrl } from "./assetsRemote";
const temaModalImg = imgUrl("temaCatalogoModal.jpg");

const intro =
	`<div>Se reemplazó el controller de temas embebido en el módulo de Capacitación por el ` +
	`<b>catálogo reutilizable de Soporte</b>, de modo que los temas se gestionan en un único ` +
	`lugar y se referencian desde Cursos vía ${codeI("BtnRef")}.</div>`;

export async function buildBodyTK1420751(): Promise<string> {
	const h3 = await h3Iconized("mdi:tag-multiple-outline", "Catálogo unificado de Temas");
	const items = await Promise.all([
		note(
			"mdi:swap-horizontal",
			`Se eliminó ${codeI("TTemaSlaveController")} de ` +
			`${codeI("$lib/ContaPymeU/2.Capacitacion/Cursos")} y se sustituyó por ` +
			`${codeI("TTemaClientesISBtnRef")} ubicado en ` +
			`${codeI("$lib/3.catalogos/9.Soporte/ClientesIS_Temas")}.`,
		),
		note(
			"mdi:type-hierarchy-sub",
			`El tipo de registro pasó de ${codeI("TTema")} a ${codeI("TTemaSoporte")} ` +
			`(provisto por ${codeI("@ingenieria_insoft/ispclientesis")}).`,
		),
		note(
			"mdi:file-document-edit-outline",
			`Archivos actualizados: ` +
			`${codeI("cursos/_Details/General.svelte")} y ` +
			`${codeI("cursos/_Details/TreeContenidos/Formulario.svelte")} ` +
			`para usar el nuevo controller y el callback ${codeI("onselectedtema")}/` +
			`${codeI("ontemaselected")} con ${codeI("TTemaSoporte")}.`,
		),
		note(
			"mdi:database-check-outline",
			`Beneficio: cualquier alta o modificación de tema desde el catálogo de Soporte ` +
			`se refleja inmediatamente en los formularios de Curso, sin duplicar mantenimiento.`,
		),
	]);
	const fig = img(temaModalImg, 460);
	return intro + h3 + fig + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items.join("")}</ul>`;
}

export const bodyTK1420751: Promise<string> = buildBodyTK1420751();

