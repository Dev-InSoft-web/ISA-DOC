// TK-1424892 — Acciones en catálogo de pestaña "Seguridad" de cursos. Resuelto.
import { code as codeI, compareTable } from "./snippets";
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
	const [h3Causa, h3Fix, h3Verif, h3Jconfig, h3JconfigCompare, h3JconfigImpl] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
		h3Iconized("mdi:database-cog-outline", "JCONFIG v2 — esquema declarativo de campos"),
		h3Iconized("mdi:swap-horizontal", "Antes / Después — definición del campo en JCONFIG"),
		h3Iconized("mdi:application-cog-outline", "Implicación en el cliente"),
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
		formularios pasan a declararse en la columna <code>JCONFIG</code> de  
		la tabla maestra <code>CAPAC_ATRIBUTOS_X_DRIVERS</code> con un  
		<code>type</code> explícito que nombra al componente de entrada real  
		(${codeI('"InputText"')}, ${codeI('"SelectObject"')}, ${codeI('"BtnRef"')},  
		entre otros) y, cuando aplica, con el identificador del controlador que  
		provee la lista (${codeI('"controllername"')}). Esto permite  
		incorporar nuevos atributos o catálogos sin modificar el cliente, ya  
		que la definición vive en la base de datos.</div>`;

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
      "type": "BtnRef",
      "label": "Permiso",
      "controllername": "TPermisoCursoController"
    },
    "itema": {
      "type": "BtnRef",
      "label": "Tema",
      "controllername": "TTemaController"
    },
    "descripcion": { "type": "RichEditor", "label": "Descripción" }
  }
}`,
	});

	const jconfigImpl =
		`<div>En el cliente esto se tradujo en que el mapeo de la columna  
		<code>JCONFIG</code> a la definición que entiende el formulario  
		pasara a leer el <code>type</code> declarado en la base de datos  
		y a propagar <code>controllername</code>, <code>options</code>,  
		<code>inputProps.maxlength</code>, <code>readonly</code> y  
		<code>required</code> tal como vienen del registro. Se incorporaron  
		los componentes ${codeI('"InputText"')}, ${codeI('"SelectObject"')},  
		${codeI('"BtnRef"')} y ${codeI('"RichEditor"')} dentro del kind de  
		entrada admitido por el formulario, de modo que basta con publicar  
		un nuevo registro en la tabla para que el campo aparezca con el  
		control adecuado, sin tocar el cliente. Los cambios concretos en  
		componentes Svelte/TypeScript del proyecto del cliente quedan  
		trazados en los commits relacionados.</div>`;

	const jconfigSection = jconfigIntro
		+ h3JconfigCompare + jconfigCompare
		+ h3JconfigImpl + jconfigImpl;

	return intro + h3Causa + causa + h3Fix + fix + h3Verif + verif + h3Jconfig + jconfigSection;
}

export const bodyTK1424892: Promise<string> = buildBodyTK1424892();
