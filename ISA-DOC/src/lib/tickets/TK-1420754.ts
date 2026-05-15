// TK-1420754 — Nombres en niveles por defecto en creación de curso.
import { code as codeI, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Al crear un curso, la pestaña <b>Estructura</b> generaba niveles con la etiqueta  
	“Sin nombre”. Se introdujo un mapa de nombres por defecto según la cantidad de niveles  
	del driver, dejando “Capítulo” y “Título” cuando son dos niveles.</div>`;

export async function buildBodyTK1420754(): Promise<string> {
	const h3 = await h3Iconized("mdi:format-list-numbered", "Defaults al completar niveles");
	const items = await Promise.all([
		note(
			"mdi:map-marker-path",
			`Al completar los niveles faltantes de un curso reci\u00e9n creado, ahora se  
			consulta un mapa indexado por la cantidad total de niveles del driver.  
			Para drivers de 2 niveles se aplican los nombres ${codeI('"Cap\u00edtulo"')} y  
			${codeI('"T\u00edtulo"')}; para otras cantidades se mantiene el placeholder  
			${codeI('"---"')} por nivel hasta que se defina la nomenclatura del driver  
			correspondiente.`,
		),
		note(
			"mdi:plus-box-multiple-outline",
			`Cuando se incorporen drivers con m\u00e1s niveles, basta con extender ese mapa  
			con la nomenclatura propia (por ejemplo, t\u00edtulos como Tomo, Cap\u00edtulo y  
			T\u00edtulo para tres niveles) sin necesidad de tocar el flujo de creaci\u00f3n.`,
		),
	]);
	const fig = img("estructuraDefaults.jpg");
	return intro + h3 + fig + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items.join("")}</ul>`;
}

export const bodyTK1420754: Promise<string> = buildBodyTK1420754();

