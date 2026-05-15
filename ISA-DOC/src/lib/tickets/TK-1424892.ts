// TK-1424892 — Acciones en catálogo de pestaña "Seguridad" de cursos. Resuelto.
import { code as codeI, codeBlock, compareTable } from "./snippets";
import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se reportó que el catálogo embebido de la pestaña  
	<b>Seguridad</b> del curso no presentaba las acciones esperadas  
	(refrescar, modo filtro, búsqueda y selección) con el mismo layout que  
	los demás catálogos de referencia (BtnRef) del sistema. Se adjuntó captura  
	con el aspecto que <i>“debería quedar así”</i>: toolbar compacta con  
	refrescar/modo filtro/buscar y las pestañas laterales de columnas y  
	filtro.</div>`;

export async function buildBodyTK1424892(): Promise<string> {
	const [h3Causa, h3Fix, h3Verif, h3Jconfig, h3JconfigCompare, h3JconfigMap] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
		h3Iconized("mdi:database-cog-outline", "JCONFIG v2 — esquema declarativo de campos"),
		h3Iconized("mdi:swap-horizontal", "Antes / Después — definición del campo en JCONFIG"),
		h3Iconized("mdi:code-tags", "Mapeo jconfig2FieldDef ampliado"),
	]);

	const causa = noteList(
		await note(
			"mdi:layers-outline",
			`El catálogo de la pestaña <b>Seguridad</b> se renderizaba dentro de  
			envoltorios <code>display:flex</code> personalizados que rompían el  
			<i>layout</i> esperado de la toolbar y las pestañas laterales del  
			BtnRef. La toolbar interna del catálogo y sus acciones quedaban  
			desalineadas o cortadas según el tamaño del drawer.`,
		),
		await note(
			"mdi:source-branch",
			`Adicionalmente, el formulario contenedor envolvía cada componente  
			con un <code>FlexLayout</code> extra y redundante, lo que duplicaba  
			reglas de espaciado y producía diferencias visuales respecto a los  
			demás catálogos.`,
		),
	);

	const fix = noteList(
		await note(
			"mdi:view-grid-outline",
			`Se sustituyeron los envoltorios <code>display:flex</code> ad-hoc por  
			<code>FlexLayout</code> nativo del paquete de componentes y se  
			reemplazó el contenedor de un solo hijo por <code>BlockLayout</code>,  
			devolviendo a la toolbar del catálogo el aspecto homogéneo del resto  
			del sistema.`,
		),
		await note(
			"mdi:swap-horizontal",
			`Se consolidó la propagación de <code>$$restProps</code> en el  
			formulario genérico de cursos para que las opciones de configuración  
			(id, padding, dirección) lleguen al elemento raíz, eliminando el  
			<i>wrap</i> redundante que distorsionaba el layout.`,
		),
	);

	const verif = noteList(
		await note(
			"mdi:check-bold",
			`Validado abriendo el catálogo de la pestaña <b>Seguridad</b> sobre  
			un curso existente: la toolbar muestra <i>Refrescar</i>,  
			<i>Modo filtro</i> y <i>Buscar…</i> con el mismo aspecto que el  
			resto de los BtnRef, y las pestañas laterales de columnas y filtro  
			quedan correctamente alineadas.`,
		),
	);

	const jconfigIntro =
		`<div>Aprovechando este ticket se promovió el cambio de esquema  
		<b>JCONFIG v2</b> (tarea del 14 de mayo): los campos de los  
		formularios pasan a declararse con <code>type</code> explícito  
		(${codeI('"text"')}, ${codeI('"btnref"')}, ${codeI('"richtext"')}, etc.)  
		y, cuando aplica, con la referencia al <i>controller</i> que provee  
		la lista (${codeI("controllerName")}). El mapper  
		<code>jconfig2FieldDef</code> consume esta forma normalizada y emite  
		la <code>FieldDef</code> que entiende <code>Attr2Input</code>, sin  
		necesidad de tocar Svelte por cada nuevo BtnRef.</div>`;

	const jconfigCompare = await compareTable({
		kind: "code",
		lang: "json",
		beforeLabel: "JCONFIG v1",
		afterLabel: "JCONFIG v2",
		before: `{
  "attrs": {
    "ipermiso": {
      "label": "Permiso",
      "catalogo": "CAPACITACION/CATALOGOS/PERMISO"
    },
    "itema": {
      "label": "Tema",
      "catalogo": "CAPACITACION/CATALOGOS/TEMA"
    },
    "descripcion": { "label": "Descripción" }
  }
}`,
		after: `{
  "version": 2,
  "attrs": {
    "ipermiso": {
      "type": "btnref",
      "label": "Permiso",
      "controllername": "TPermisoCursoController"
    },
    "itema": {
      "type": "btnref",
      "label": "Tema",
      "controllername": "TTemaController"
    },
    "descripcion": { "type": "richeditor", "label": "Descripción" }
  }
}`,
	});

	const jconfigMapper = await codeBlock(
		`export type InputKind = "text" | "number" | "richeditor" | "selectEnum" | "btnref";

export interface JConfigAttrV2 {
    type?: InputKind;
    label: string;
    controllername?: string;
    options?: string[] | Record<string, string>;
    readonly?: boolean;
    required?: boolean;
    inputProps?: { maxlength?: number };
}

export function jconfig2FieldDef(jconfig: JConfigAttrV2, label: string): FieldDef {
    const j = jconfig ?? ({} as JConfigAttrV2);
    const t = String(j.type ?? "").toLowerCase();
    const type: InputKind =
        t === "number" ? "number"
        : t === "richeditor" ? "richeditor"
        : t === "selectenum" ? "selectEnum"
        : t === "btnref" ? "btnref"
        : "text";
    const maxlength = Number(j.inputProps?.maxlength ?? 0);
    return {
        type,
        label,
        options: j.options,
        controllername: j.controllername,
        readonly: !!j.readonly,
        required: !!j.required,
        maxlength: Number.isFinite(maxlength) && maxlength > 0 ? maxlength : 500,
    };
}`,
		"typescript",
	);

	const jconfigSection = jconfigIntro
		+ h3JconfigCompare + jconfigCompare
		+ h3JconfigMap + jconfigMapper;

	return intro + h3Causa + causa + h3Fix + fix + h3Verif + verif + h3Jconfig + jconfigSection;
}

export const bodyTK1424892: Promise<string> = buildBodyTK1424892();
