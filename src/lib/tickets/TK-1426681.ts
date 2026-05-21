// TK-1426681 — Error funcional de acciones Duplicar, Recodificar,
// Verificación y Consolidar en los catálogos de Cursos y Planes de Estudio.
import { h3Iconized, note, noteList } from "./tk-helpers";

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
		h3Iconized("mdi:image-multiple-outline", "Evidencia"),
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
			`Los clientes de <b>Curso</b> y <b>Plan de Estudio</b>  
			heredaban los <i>endpoints</i> base sin sobreescribirlos.  
			Por convención del framework, el cliente debe declarar el  
			endpoint con el segmento del recurso (por ejemplo  
			<code>/api/curso/verificar</code>); al heredar el valor  
			base (<code>/api/verificar</code>) el servidor no  
			encontraba la ruta y la acción fallaba.`,
		),
		await note(
			"mdi:link-off",
			`Esto afectaba simultáneamente las cuatro acciones  
			extendidas para ambas entidades del módulo de  
			capacitación.`,
		),
	);

	const solucion = noteList(
		await note(
			"mdi:code-tags",
			`Se declararon explícitamente en los clientes de  
			<b>Curso</b> y <b>Plan de Estudio</b> los cuatro  
			endpoints: <b>verificar</b>, <b>duplicar</b>,  
			<b>recodificar</b> y <b>consolidar</b>, anteponiendo el  
			segmento del recurso (<code>/api/curso/...</code> y  
			<code>/api/plan/estudio/...</code>).`,
		),
		await note(
			"mdi:package-variant-closed",
			`Se publicó la corrección en el paquete de clientes y se  
			validó contra el servidor que las URL ahora se forman  
			correctamente y llegan al manejador correspondiente.`,
		),
	);

	const evidencia = noteList(
		await note(
			"mdi:check-decagram-outline",
			`<b>Curso → Verificar</b>: petición correcta, respuesta  
			satisfactoria sin observaciones.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/curso-verificar.png"  
			alt="Verificación de curso exitosa"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:content-duplicate",
			`<b>Curso → Duplicar</b>: el diálogo se abre y la petición  
			llega al endpoint correcto del servidor.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/curso-duplicar-500.png"  
			alt="Diálogo Duplicar curso"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:rename-box-outline",
			`<b>Curso → Recodificar</b>: el formulario captura el  
			nuevo código y dispara la petición a la ruta esperada.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/curso-recodificar.png"  
			alt="Diálogo Recodificar curso"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:merge",
			`<b>Curso → Consolidar</b>: se selecciona el curso  
			destino y la solicitud llega al endpoint correcto.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/curso-consolidar.png"  
			alt="Diálogo Consolidar curso"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:check-decagram-outline",
			`<b>Plan de Estudio → Verificar</b>: petición correcta,  
			respuesta satisfactoria sin observaciones.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/plan-verificar.png"  
			alt="Verificación de plan de estudio exitosa"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:content-duplicate",
			`<b>Plan de Estudio → Duplicar</b>: el diálogo opera y la  
			petición se dirige a la ruta correcta.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/plan-duplicar.png"  
			alt="Diálogo Duplicar plan de estudio"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:rename-box-outline",
			`<b>Plan de Estudio → Recodificar</b>: formulario activo  
			y solicitud bien formada.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/plan-recodificar.png"  
			alt="Diálogo Recodificar plan de estudio"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
		await note(
			"mdi:merge",
			`<b>Plan de Estudio → Consolidar</b>: se elige el plan  
			destino y la petición llega al endpoint correcto.  
			<br/><br/>  
			<img src="/imgs/tickets/TK-1426681/plan-consolidar.png"  
			alt="Diálogo Consolidar plan de estudio"  
			style="max-width:100%;border:1px solid #80808055;border-radius:4px;margin-top:0.5rem;" />`,
		),
	);

	const estado = noteList(
		await note(
			"mdi:check-circle-outline",
			`<b>Culminado.</b> Las cuatro acciones extendidas de  
			<b>Cursos</b> y <b>Planes de Estudio</b> ahora envían la  
			petición al endpoint correcto del servidor.  
			<b>Verificación</b> responde satisfactoriamente en ambas  
			entidades.`,
		),
		await note(
			"mdi:alert-outline",
			`<b>Hallazgo adicional fuera de alcance:</b> Durante el  
			QA se detectó que las acciones <b>Duplicar</b>,  
			<b>Recodificar</b> y <b>Consolidar</b> reciben respuesta  
			de error desde el servidor por una validación SQL del  
			parámetro de auditoría <code>IUSUARIOULT_OLD</code>.  
			Se reporta como issue separado del manejo  
			<i>server-side</i> (no es problema de enrutamiento del  
			cliente).`,
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
