// TK-1424892 — Acciones en catálogo de pestaña "Seguridad" de cursos. Resuelto.
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
	const [h3Causa, h3Fix, h3Verif] = await Promise.all([
		h3Iconized("mdi:bug-outline", "Causa"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
		h3Iconized("mdi:eye-check-outline", "Verificación"),
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

	return intro + h3Causa + causa + h3Fix + fix + h3Verif + verif;
}

export const bodyTK1424892: Promise<string> = buildBodyTK1424892();
