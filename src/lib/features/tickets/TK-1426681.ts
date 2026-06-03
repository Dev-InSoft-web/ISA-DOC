// TK-1426681 — Error funcional de acciones Duplicar, Recodificar,
// Verificación y Consolidar en los catálogos de Cursos y Planes de Estudio.
import { h3Iconized, note, noteList } from "./tk-helpers";
import { img, simpleTable } from "./snippets";

type QaStep = { entidad: string; accion: string; resultado: string; img: string };

const renderStepsTable = (steps: QaStep[]): string =>
	simpleTable(
		["#", "Entidad", "Acción", "Resultado", "Evidencia"],
		steps.map((s, i) => [
			String(i + 1),
			`<b>${s.entidad}</b>`,
			s.accion,
			s.resultado,
			img(s.img, 240),
		]),
		{ aligns: ["center", "left", "left", "left", "left"], firstColIsStep: true, widths: ["36px", "12%", "12%", "20%", "auto"] },
	);

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
			<b>Plan de Estudio</b> heredaban las rutas base de las  
			acciones sin sobreescribirlas. Por convención del framework  
			cada cliente debe declarar la ruta con el segmento del  
			recurso correspondiente; al heredar la ruta genérica el  
			servidor no encontraba el manejador y la acción fallaba.`,
		),
		await note(
			"mdi:database-alert-outline",
			`<b>Causa 2 — Auditoría server-side:</b> el manejo base de los  
			campos de auditoría enviaba el identificador del usuario como  
			valor numérico cuando el esquema en base de datos lo espera  
			como cadena, y además intercambiaba los campos de equipo y  
			fecha de creación. Esto provocaba errores de conversión en  
			base de datos al ejecutar las acciones <b>Duplicar</b>,  
			<b>Recodificar</b> y <b>Consolidar</b>.`,
		),
		await note(
			"mdi:table-column",
			`<b>Causa 3 — Esquema BD (Consolidar):</b> las columnas de  
			descripción de cursos, planes de estudio y drivers de  
			capacitación estaban definidas con un tipo de dato heredado  
			(en desuso desde hace varios años) que no admite las  
			comparaciones que ejecuta internamente el proceso de  
			<b>Consolidar</b>. Como consecuencia el motor de base de  
			datos respondía con un error de incompatibilidad de tipos al  
			intentar consolidar.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:code-tags",
			`<b>Ajuste en clientes:</b> se declararon explícitamente en los  
			clientes de <b>Curso</b> y <b>Plan de Estudio</b> las cuatro  
			acciones (<b>verificar</b>, <b>duplicar</b>, <b>recodificar</b>  
			y <b>consolidar</b>), apuntando a la ruta del recurso que les  
			corresponde para que las peticiones lleguen al servidor.`,
		),
		await note(
			"mdi:server-network",
			`<b>Ajuste en servidor (auditoría):</b> en el servicio de  
			capacitación se sobrescribió el manejo de los campos de  
			auditoría para que el identificador de usuario viaje como  
			cadena de texto (acorde al esquema) y para corregir el  
			cruce entre los campos de equipo y fecha de creación.`,
		),
		await note(
			"mdi:database-cog-outline",
			`<b>Ajuste en base de datos (Consolidar):</b> se ejecutó una  
			migración idempotente que actualiza el tipo de las columnas  
			de descripción afectadas a un tipo compatible con las  
			comparaciones del proceso de <b>Consolidar</b>. Además se  
			actualizó el script de inicialización del módulo de  
			capacitación para que las nuevas instalaciones nazcan con  
			el tipo correcto.`,
		),
		await note(
			"mdi:package-variant-closed",
			`Se publicaron las correcciones en los paquetes de cliente  
			y servidor y se validó <i>end-to-end</i> contra el ambiente  
			local que las cuatro acciones responden correctamente en  
			ambas entidades.`,
		),
	);

	const evidencia = renderStepsTable([
		{ entidad: "Curso", accion: "Verificar", resultado: "Petición correcta, respuesta satisfactoria sin observaciones.", img: "qa-curso-verificar-ok.png" },
		{ entidad: "Curso", accion: "Duplicar", resultado: "El diálogo opera y el servidor responde con el nuevo registro.", img: "qa-curso-duplicar-ok.png" },
		{ entidad: "Curso", accion: "Recodificar", resultado: "El formulario captura el nuevo código y la petición se ejecuta correctamente.", img: "qa-curso-recodificar-ok.png" },
		{ entidad: "Curso", accion: "Consolidar", resultado: "Tras el ajuste de tipos en base de datos, la acción finaliza correctamente y consolida.", img: "qa-curso-consolidar-ok.png" },
		{ entidad: "Curso", accion: "Crear", resultado: "La acción persiste el nuevo registro sin observaciones.", img: "qa-curso-crear-ok.png" },
		{ entidad: "Curso", accion: "Eliminar", resultado: "La acción elimina el registro sin observaciones.", img: "qa-curso-eliminar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Verificar", resultado: "Petición correcta, respuesta satisfactoria sin observaciones.", img: "qa-plan-verificar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Duplicar", resultado: "El diálogo opera y el servidor responde con el nuevo plan duplicado.", img: "qa-plan-duplicar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Recodificar", resultado: "Formulario activo y solicitud ejecutada satisfactoriamente.", img: "qa-plan-recodificar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Consolidar", resultado: "Tras el ajuste de tipos en base de datos, la acción finaliza correctamente y consolida el plan.", img: "qa-plan-consolidar-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Crear", resultado: "La acción persiste el nuevo plan sin observaciones.", img: "qa-plan-crear-ok.png" },
		{ entidad: "Plan de Estudio", accion: "Eliminar", resultado: "La acción elimina el plan sin observaciones.", img: "qa-plan-eliminar-ok.png" },
	]);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`<b>Culminado.</b> Las seis acciones de  
			<b>Cursos</b> y <b>Planes de Estudio</b>  
			(<b>Crear</b>, <b>Eliminar</b>, <b>Verificar</b>,  
			<b>Duplicar</b>, <b>Recodificar</b> y  
			<b>Consolidar</b>) fueron validadas <i>end-to-end</i>  
			contra el servidor con respuesta satisfactoria.`,
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
