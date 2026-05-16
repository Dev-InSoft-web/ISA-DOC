// TK-1420754 — Nombres en niveles por defecto en creación de curso.
import { img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Al crear un curso, la pestaña <b>Estructura</b> generaba niveles con  
	la etiqueta “Sin nombre”. Se introdujo un listado de nombres por defecto  
	según la cantidad de niveles del driver, dejando “Capítulo” y “Título”  
	cuando son dos niveles.</div>`;

export async function buildBodyTK1420754(): Promise<string> {
	const h3 = await h3Iconized("mdi:format-list-numbered", "Defaults al completar niveles");
	const items = await Promise.all([
		note(
			"mdi:map-marker-path",
			`Al completar los niveles faltantes de un curso recién creado, ahora  
			se consulta un listado indexado por la cantidad total de niveles del  
			driver. Para drivers de 2 niveles se aplican los nombres  
			<b>“Capítulo”</b> y <b>“Título”</b>; para otras cantidades se  
			mantiene el texto <b>“---”</b> por nivel hasta que se defina la  
			nomenclatura del driver correspondiente.`,
		),
		note(
			"mdi:plus-box-multiple-outline",
			`Cuando se incorporen drivers con más niveles, basta con extender ese  
			listado con la nomenclatura propia (por ejemplo, títulos como Tomo,  
			Capítulo y Título para tres niveles) sin necesidad de tocar el  
			flujo de creación.`,
		),
	]);
	const fig = img("estructuraDefaults.jpg");
	return intro + h3 + fig + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items.join("")}</ul>`;
}

export const bodyTK1420754: Promise<string> = buildBodyTK1420754();

