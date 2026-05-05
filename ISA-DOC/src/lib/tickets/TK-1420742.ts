// TK-1420742 — Opciones para agregar contenido al crear curso.
import { code as codeI, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";
import { imgUrl } from "./assetsRemote";
const alertDriverImg = imgUrl("estructuraAlertDriver.jpg");
const modalDriverImg = imgUrl("driverBtnRefModal.jpg");

const intro =
	`<div>Se ampliaron las opciones de captura de contenido al crear o editar un curso, ` +
	`permitiendo que el usuario configure la estructura y el árbol de contenidos sin tener que ` +
	`abandonar el formulario actual.</div>`;

export async function buildBodyTK1420742(): Promise<string> {
	const [h3a, h3b, h3c] = await Promise.all([
		h3Iconized("mdi:format-list-bulleted-type", "Selección de Driver desde la pestaña Estructura"),
		h3Iconized("mdi:file-tree-outline", "Mejoras al árbol de contenidos"),
		h3Iconized("mdi:palette-outline", "Refinamiento visual de alertas"),
	]);
	const items = await Promise.all([
		note(
			"mdi:cursor-default-click-outline",
			`En la pestaña <b>Estructura</b>, cuando el curso aún no tiene driver, se agregó un ` +
			`${codeI("BtnRef")} de <b>Driver</b> dentro del aviso “Esperando selección de Driver”. ` +
			`Ya no es necesario regresar a la pestaña <b>General</b> para seleccionarlo.`,
		),
		note(
			"mdi:source-branch",
			`El controller usado en el aviso es ${codeI("TDriverSlaveController")}; ` +
			`al seleccionar registro se asigna ${codeI("Obj.driver")} y se reasigna ${codeI("Obj")} ` +
			`para disparar la reactividad de Svelte.`,
		),
		note(
			"mdi:tree-outline",
			`En ${codeI("ContenidosTreeAdapter")} se agregaron métodos de preparación de nodos ` +
			`(${codeI("prepareLastLevelNodeData")}, etc.) y se optimizó la estructura de ` +
			`${codeI("TreeContenidos.svelte")} para reflejar correctamente los recursos al insertarlos.`,
		),
		note(
			"mdi:numeric",
			`En ${codeI("TEstructuraCursoSlaveController")} se establecieron valores predeterminados para ` +
			`las estructuras.`,
		),
		note(
			"mdi:format-color-fill",
			`En ${codeI("Alert.svelte")} se ajustó la mezcla de color (transparencia 60→90) y se forzó ` +
			`${codeI("border-radius:0")} para una mejor integración visual con los formularios.`,
		),
		note(
			"mdi:semantic-web",
			`En ${codeI("AlertSimple.svelte")} se simplificaron propiedades y se mejoró la semántica ` +
			`de color para mantener consistencia con ${codeI("Alert.svelte")}.`,
		),
	]);
	const figAlert = img(alertDriverImg, 720);
	const figModal = img(modalDriverImg, 460);
	return (
		intro +
		h3a + figAlert + figModal +
		`<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[0]}${items[1]}</ul>` +
		h3b + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[2]}${items[3]}</ul>` +
		h3c + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items[4]}${items[5]}</ul>`
	);
}

export const bodyTK1420742: Promise<string> = buildBodyTK1420742();

