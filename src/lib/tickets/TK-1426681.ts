// TK-1426681 — Error funcional de acciones Duplicar, Recodificar,
// Verificación y Consolidar en los catálogos de Cursos y Planes de Estudio.
import { h3Iconized, note, noteList } from "./tk-helpers";
import { img, simpleTable } from "./snippets";

const intro =
	`<div>Se reporta error en el funcionamiento de las acciones  
	<b>Duplicar</b>, <b>Recodificar</b>, <b>Verificación</b> y  
	<b>Consolidar</b> dentro de los catálogos de <b>Cursos</b> y  
	<b>Planes de Estudio</b>: las operaciones devuelven mensajes  
	como <i>"No se pudo duplicar"</i> y <i>"No se pudo  
	consolidar"</i>.</div>`;

export async function buildBodyTK1426681(): Promise<string> {
	const [h3Contexto, h3Causa, h3Solucion, h3Evidencia, h3Estado] = await Promise.all([
		h3Iconized("mdi:information-outline", "Contexto"),
		h3Iconized("mdi:bug-outline", "Causa raíz"),
		h3Iconized("mdi:wrench-outline", "Solución aplicada"),
		h3Iconized("mdi:image-multiple-outline", "Timeline de QA"),
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

	const evidencia = simpleTable(
		["#", "Entidad", "Acción", "Resultado", "Evidencia"],
		[
			["1", "<b>Curso</b>", "Verificar", "Petición correcta, respuesta satisfactoria sin observaciones.", img("qa-curso-verificar-ok.png", 240)],
			["2", "<b>Curso</b>", "Duplicar", "El diálogo opera y el servidor responde con el nuevo registro.", img("qa-curso-duplicar-ok.png", 240)],
			["3", "<b>Curso</b>", "Recodificar", "El formulario captura el nuevo código y la petición se ejecuta correctamente.", img("qa-curso-recodificar-ok.png", 240)],
			["4", "<b>Curso</b>", "Consolidar", "Tras la migración <code>TEXT→VARCHAR(MAX)</code> retorna <code>202</code> y consolida.", img("qa-curso-consolidar-ok.png", 240)],
			["5", "<b>Curso</b>", "Crear", "El <code>POST</code> persiste el nuevo registro.", img("qa-curso-crear-ok.png", 240)],
			["6", "<b>Curso</b>", "Eliminar", "El <code>DELETE</code> retorna <code>200</code> eliminando el registro.", img("qa-curso-eliminar-ok.png", 240)],
			["7", "<b>Plan de Estudio</b>", "Verificar", "Petición correcta, respuesta satisfactoria sin observaciones.", img("qa-plan-verificar-ok.png", 240)],
			["8", "<b>Plan de Estudio</b>", "Duplicar", "El diálogo opera y el servidor responde con el nuevo plan duplicado.", img("qa-plan-duplicar-ok.png", 240)],
			["9", "<b>Plan de Estudio</b>", "Recodificar", "Formulario activo y solicitud ejecutada satisfactoriamente.", img("qa-plan-recodificar-ok.png", 240)],
			["10", "<b>Plan de Estudio</b>", "Consolidar", "Tras la migración retorna <code>202</code> y consolida el plan.", img("qa-plan-consolidar-ok.png", 240)],
			["11", "<b>Plan de Estudio</b>", "Crear", "El <code>POST</code> persiste el nuevo plan.", img("qa-plan-crear-ok.png", 240)],
			["12", "<b>Plan de Estudio</b>", "Eliminar", "El <code>DELETE</code> retorna <code>200</code> eliminando el plan.", img("qa-plan-eliminar-ok.png", 240)],
		],
		{ firstColIsStep: true },
	);

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
		+ h3Estado + estado;
}

export const bodyTK1426681: Promise<string> = buildBodyTK1426681();
