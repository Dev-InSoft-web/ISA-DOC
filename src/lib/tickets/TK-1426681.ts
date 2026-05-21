// TK-1426681 — Error funcional de acciones Duplicar, Recodificar,
// Verificación y Consolidar en los catálogos de Cursos y Planes de Estudio.
import { h3Iconized, note, noteList } from "./tk-helpers";
import { img } from "./snippets";

type QaStep = { entidad: string; accion: string; resultado: string; img: string };
type CommitRow = { repo: string; sha: string; msg: string };

const tStyleTable = `width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:13px;margin:8px 0;`;
const tStyleTh = `background:#f0f0f0;border:1px solid #ccc;padding:6px 8px;text-align:left;font-weight:600;`;
const tStyleTd = `border:1px solid #ddd;padding:6px 8px;vertical-align:top;`;
const tStyleStep = `border:1px solid #ddd;padding:6px 8px;vertical-align:top;text-align:center;font-weight:600;background:#fafafa;width:48px;`;

const renderStepsTable = (steps: QaStep[]): string => {
	const head = `<tr>`
		+ `<th style="${tStyleTh}">#</th>`
		+ `<th style="${tStyleTh}">Entidad</th>`
		+ `<th style="${tStyleTh}">Acción</th>`
		+ `<th style="${tStyleTh}">Resultado</th>`
		+ `<th style="${tStyleTh}">Evidencia</th>`
		+ `</tr>`;
	const rows = steps.map((s, i) =>
		`<tr>`
		+ `<td style="${tStyleStep}">${i + 1}</td>`
		+ `<td style="${tStyleTd}"><b>${s.entidad}</b></td>`
		+ `<td style="${tStyleTd}">${s.accion}</td>`
		+ `<td style="${tStyleTd}">${s.resultado}</td>`
		+ `<td style="${tStyleTd}">${img(s.img, 240)}</td>`
		+ `</tr>`,
	).join("");

	return `<table style="${tStyleTable}">${head}${rows}</table>`;
};

const renderCommitsTable = (commits: CommitRow[]): string => {
	const head = `<tr>`
		+ `<th style="${tStyleTh}">Repositorio</th>`
		+ `<th style="${tStyleTh}">SHA</th>`
		+ `<th style="${tStyleTh}">Mensaje</th>`
		+ `</tr>`;
	const rows = commits.map((c) =>
		`<tr>`
		+ `<td style="${tStyleTd}"><b>${c.repo}</b></td>`
		+ `<td style="${tStyleTd}"><code>${c.sha}</code></td>`
		+ `<td style="${tStyleTd}">${c.msg}</td>`
		+ `</tr>`,
	).join("");

	return `<table style="${tStyleTable}">${head}${rows}</table>`;
};

const intro =
	`<div>Se reporta error en el funcionamiento de las acciones  
	<b>Duplicar</b>, <b>Recodificar</b>, <b>Verificación</b> y  
	<b>Consolidar</b> dentro de los catálogos de <b>Cursos</b> y  
	<b>Planes de Estudio</b>: las operaciones devuelven mensajes  
	como <i>"No se pudo duplicar"</i> y <i>"No se pudo  
	consolidar"</i>.</div>`;

export async function buildBodyTK1426681(): Promise<string> {
	const [h3Contexto, h3Causa, h3Solucion, h3Evidencia, h3Commits, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:bug-outline", "Causa raíz"),
		h3Iconized("mdi:wrench-outline", "Solución aplicada"),
		h3Iconized("mdi:image-multiple-outline", "Timeline de QA"),
		h3Iconized("mdi:source-commit", "Commits relacionados"),
		h3Iconized("mdi:forum-outline", "Estado"),
	]);

	const contexto = noteList(
		await note(
			"mdi:book-multiple-outline",
			`En los catálogos de <b>Cursos</b> y <b>Planes de Estudio</b>  
			se selecciona un registro y se invocan las acciones  
			extendidas <b>Duplicar</b>, <b>Recodificar</b>,  
			<b>Verificación</b> o <b>Consolidar</b>.`,
		),
		await note(
			"mdi:alert-octagon-outline",
			`Antes del arreglo, cada acción retornaba error porque la  
			petición HTTP se enviaba a una ruta inexistente, sin el  
			segmento del recurso correspondiente.`,
		),
	);

	const causa = noteList(
		await note(
			"mdi:source-branch",
			`<b>Causa 1 — Clientes:</b> los clientes de <b>Curso</b> y  
			<b>Plan de Estudio</b> heredaban los <i>endpoints</i> base  
			sin sobreescribirlos. Por convención del framework el  
			cliente debe declarar el endpoint con el segmento del  
			recurso (por ejemplo <code>/api/curso/verificar</code>);  
			al heredar el valor base (<code>/api/verificar</code>) el  
			servidor no encontraba la ruta y la acción fallaba.`,
		),
		await note(
			"mdi:database-alert-outline",
			`<b>Causa 2 — Auditoría server-side:</b> el override base  
			de campos de auditoría enviaba <code>IUSUARIOULT</code>  
			como entero (i-contacto) cuando el esquema lo define  
			<code>VARCHAR</code>, y además intercambiaba los valores  
			de <code>IEQUIPOCRE</code> y <code>FHCRE</code>, lo que  
			provocaba errores de conversión SQL en las acciones  
			<b>Duplicar</b>, <b>Recodificar</b> y <b>Consolidar</b>.`,
		),
		await note(
			"mdi:table-column",
			`<b>Causa 3 — Esquema BD (Consolidar):</b> las columnas  
			<code>CAPAC_CURSOS.DESCRIPCION</code>,  
			<code>CAPAC_PLANES_ESTUDIO.DESCRIPCIONPLAN</code> y  
			<code>CAPAC_DRIVERS.DESCRIPCION</code> estaban definidas  
			como tipo <code>TEXT</code> (deprecado desde SQL Server  
			2005). El motor de <b>Consolidar</b> genera expresiones  
			<code>NULLIF(col, '')</code> que no son compatibles con  
			<code>TEXT</code>, lo que producía el error  
			<i>«The data types text and varchar are incompatible in  
			the equal to operator»</i>.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:code-tags",
			`<b>Fix clientes:</b> se declararon explícitamente en los  
			clientes de <b>Curso</b> y <b>Plan de Estudio</b> los  
			cuatro endpoints: <b>verificar</b>, <b>duplicar</b>,  
			<b>recodificar</b> y <b>consolidar</b>, anteponiendo el  
			segmento del recurso (<code>/api/curso/...</code> y  
			<code>/api/plan/estudio/...</code>).`,
		),
		await note(
			"mdi:server-network",
			`<b>Fix servidor (auditoría):</b> en <code>TCapacitacionServer</code>  
			se sobrescribieron <code>camposAuditoriaUpdate()</code> y  
			<code>camposAuditoriaInsert()</code> para enviar  
			<code>IUSUARIOULT</code> e <code>IUSUARIOCRE</code> como  
			cadena (vía <code>val2Str(this.icontacto)</code>) y para  
			corregir el cruce entre <code>IEQUIPOCRE</code> y  
			<code>FHCRE</code>.`,
		),
		await note(
			"mdi:database-cog-outline",
			`<b>Fix base de datos (Consolidar):</b> se ejecutó la  
			migración <code>migrate-descripcion-text-to-varchar-max.sql</code>  
			que convierte las tres columnas afectadas de  
			<code>TEXT</code> a <code>VARCHAR(MAX)</code> de forma  
			idempotente. Además se actualizó  
			<code>init_capacitacion.sql</code> para que las nuevas  
			instalaciones ya nazcan con <code>VARCHAR(MAX)</code>.`,
		),
		await note(
			"mdi:package-variant-closed",
			`Se publicaron las correcciones en los paquetes de cliente  
			y servidor y se validó end-to-end contra el ambiente  
			local que las cuatro acciones responden correctamente en  
			ambas entidades.`,
		),
	);

	const evidencia = renderStepsTable([
		{ entidad: "Curso", accion: "Verificar", resultado: "Petición correcta, respuesta satisfactoria sin observaciones.", img: "qa-curso-verificar-ok.png" },
		{ entidad: "Curso", accion: "Duplicar", resultado: "El diálogo opera y el servidor responde con el nuevo registro.", img: "qa-curso-duplicar-ok.png" },
		{ entidad: "Curso", accion: "Recodificar", resultado: "El formulario captura el nuevo código y la petición se ejecuta correctamente.", img: "qa-curso-recodificar-ok.png" },
		{ entidad: "Curso", accion: "Consolidar", resultado: "Tras la migración <code>TEXT→VARCHAR(MAX)</code> retorna <code>202</code> y consolida.", img: "qa-curso-consolidar-ok.png" },
		{ entidad: "Curso", accion: "Crear", resultado: "El <code>POST</code> persiste el nuevo registro.", img: "qa-curso-crear-ok.png" },
		{ entidad: "Curso", accion: "Eliminar", resultado: "El <code>DELETE</code> retorna <code>200</code> eliminando el registro.", img: "qa-curso-eliminar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Verificar", resultado: "Petición correcta, respuesta satisfactoria sin observaciones.", img: "qa-plan-verificar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Duplicar", resultado: "El diálogo opera y el servidor responde con el nuevo plan duplicado.", img: "qa-plan-duplicar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Recodificar", resultado: "Formulario activo y solicitud ejecutada satisfactoriamente.", img: "qa-plan-recodificar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Consolidar", resultado: "Tras la migración retorna <code>202</code> y consolida el plan.", img: "qa-plan-consolidar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Crear", resultado: "El <code>POST</code> persiste el nuevo plan.", img: "qa-plan-crear-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Eliminar", resultado: "El <code>DELETE</code> retorna <code>200</code> eliminando el plan.", img: "qa-plan-eliminar-ok.png" },
	]);

	const commits = renderCommitsTable([
		{ repo: "ISP-ClientesIS", sha: "30d501e", msg: "feat(plan-estudio, curso): agrega nuevos endpoints para verificar, duplicar, recodificar y consolidar" },
		{ repo: "ISP-CLientesISServer", sha: "f1fbcb4", msg: "fix(TK-1426681): se ajustan campos de auditoria para duplicar recodificar y consolidar" },
		{ repo: "ISW-ClientesIS", sha: "bd75f06", msg: "fix(TK-1426681): se habilita modo local en cliente base de cursos" },
		{ repo: "ISA-DOC", sha: "86d1832", msg: "fix(TK-1426681): se migran columnas de descripcion de text a varchar max en tablas de capacitacion" },
		{ repo: "ISA-DOC", sha: "f056800", msg: "docs(TK-1426681): se agregan capturas de qa para verificar duplicar recodificar y consolidar de cursos y planes" },
		{ repo: "ISA-DOC", sha: "b30c8ed", msg: "docs(TK-1426681): se actualiza descripcion del ticket con causas raiz y solucion completa" },
		{ repo: "ISA-DOC", sha: "6a6e493", msg: "docs(TK-1426681): se agregan capturas de qa para crear y eliminar de cursos y planes de estudio" },
		{ repo: "ISA-DOC", sha: "b8759fb", msg: "docs(TK-1426681): se documentan en el ticket las acciones crear y eliminar validadas en qa" },
		{ repo: "ISA-DOC", sha: "642118e", msg: "docs(TK-1426681): se reorganizan capturas al estandar imgbb y se eliminan capturas obsoletas con error previo" },
		{ repo: "ISA-DOC", sha: "8a5aa82", msg: "docs(TK-1426681): se refactoriza el ticket para usar el helper de imagenes con tamano estandar" },
	]);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`<b>Culminado.</b> Las seis acciones de  
			<b>Cursos</b> y <b>Planes de Estudio</b>  
			(<b>Crear</b>, <b>Eliminar</b>, <b>Verificar</b>,  
			<b>Duplicar</b>, <b>Recodificar</b> y  
			<b>Consolidar</b>) fueron validadas <i>end-to-end</i>  
			contra el servidor con respuesta satisfactoria  
			(<code>200/202</code>).`,
		),
	);

	return intro
		+ h3Contexto + contexto
		+ h3Causa + causa
		+ h3Solucion + solucion
		+ h3Evidencia + evidencia
		+ h3Commits + commits
		+ h3Estado + estado;
}

export const bodyTK1426681: Promise<string> = buildBodyTK1426681();
