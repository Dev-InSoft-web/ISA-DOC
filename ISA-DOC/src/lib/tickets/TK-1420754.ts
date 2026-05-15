// TK-1420754 — Nombres en niveles por defecto en creación de curso.
import { code as codeI, codeBlock, img } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";

const intro =
	`<div>Al crear un curso, la pestaña <b>Estructura</b> generaba niveles con la etiqueta  
	“Sin nombre”. Se introdujo un mapa de nombres por defecto según la cantidad de niveles  
	del driver, dejando “Capítulo” y “Título” cuando son dos niveles.</div>`;

export async function buildBodyTK1420754(): Promise<string> {
	const [h3, snippet] = await Promise.all([
		h3Iconized("mdi:format-list-numbered", "Defaults en TEstructuraCursoSlaveController.ensureLimit"),
		codeBlock(
			`const defaultsByLimit: Record<number, string[]> = { 2: ["Capítulo", "Título"] };
const defaults = defaultsByLimit[limit];
for (let i = Obj.estructuras.length; i < limit; i++) {
  const newItem = new TEstructuraCurso();
  [newItem.nnivel, newItem.qnivel] = [defaults?.[i] ?? "---", (i + 1).toString()];
  Obj.estructuras.push(newItem);
}`,
		),
	]);
	const items = await Promise.all([
		note(
			"mdi:map-marker-path",
			`El mapa ${codeI("defaultsByLimit")} se indexa por la cantidad total de niveles.  
			Para drivers de 2 niveles se aplica ${codeI('["Capítulo", "Título"]')};  
			para otras cantidades se mantiene el placeholder ${codeI('"---"')} por nivel.`,
		),
		note(
			"mdi:plus-box-multiple-outline",
			`Cuando el usuario seleccione drivers de más niveles, basta con extender el mapa  
			(p. ej. ${codeI('3: ["Tomo", "Capítulo", "Título"]')}).`,
		),
	]);
	const fig = img("estructuraDefaults.jpg");
	return intro + h3 + snippet + fig + `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">${items.join("")}</ul>`;
}

export const bodyTK1420754: Promise<string> = buildBodyTK1420754();

