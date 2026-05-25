// TK-1429262 — Evaluación de uso de modelos OpenAI por etapa y tipo de
// consulta en Paty IA. Solicitud de investigación técnica para evaluar la
// viabilidad de seleccionar dinámicamente el modelo OpenAI según la etapa
// del flujo o el tipo de consulta atendida.

import { h3Iconized, note, noteList } from "./tk-helpers";

const intro =
	`<div>Se solicita una <b>investigación técnica de viabilidad</b> para  
	determinar si Paty IA puede implementar una estrategia de  
	<b>selección dinámica de modelo OpenAI</b> en función de la etapa del  
	flujo o el tipo de consulta clasificado. El propósito no es iniciar  
	desarrollo, sino contar primero con una explicación técnica clara para  
	presentar al equipo y tomar una decisión antes de aprobar cualquier  
	cambio.</div>`;

export async function buildBodyTK1429262(): Promise<string> {
	const [h3Antecedente, h3Revision, h3Objetivo, h3PuntosVal, h3Propuesta, h3Resultado, h3Estado] = await Promise.all([
		h3Iconized("mdi:history", "Antecedente"),
		h3Iconized("mdi:magnify-scan", "Revisión inicial desde especialista"),
		h3Iconized("mdi:target", "Objetivo de la solicitud"),
		h3Iconized("mdi:clipboard-check-outline", "Puntos que debe validar ingeniería"),
		h3Iconized("mdi:lightbulb-on-outline", "Propuesta inicial a validar"),
		h3Iconized("mdi:flag-checkered", "Resultado esperado de la investigación técnica"),
		h3Iconized("mdi:clock-outline", "Estado"),
	]);

	const antecedente = noteList(
		await note(
			"mdi:cog-sync-outline",
			`Como parte de la evolución del proyecto <b>Paty IA</b>, se ha venido  
			ajustando el flujo de atención para trabajar con una arquitectura más  
			controlada, basada en la clasificación inicial de la consulta, la  
			identificación del módulo relacionado, la resolución de instrucciones  
			según el tipo de consulta, la selección de fuentes documentales o  
			vector stores y la generación de la respuesta final al usuario.`,
		),
		await note(
			"mdi:format-list-bulleted-type",
			`Actualmente, el diseño funcional contempla que Paty pueda diferenciar  
			tipos de consulta como <code>PASO_A_PASO</code>,  
			<code>ERROR_CONFIGURACION</code>, <code>ERROR_DIAN</code>,  
			<code>SALUDO_OTRO</code>, <code>SOLICITUD_NO_PERMITIDA</code>, entre  
			otros.`,
		),
		await note(
			"mdi:speedometer",
			`A partir de la revisión funcional inicial realizada, se identifica una  
			posible oportunidad de optimización: <b>evaluar si el backend puede  
			seleccionar diferentes modelos de OpenAI según la etapa del flujo o  
			según el tipo de consulta atendida</b>.`,
		),
	);

	const revision = noteList(
		await note(
			"mdi:api",
			`En la revisión inicial se encontró que, aparentemente, la API de  
			OpenAI mediante <b>Responses</b> permite definir el modelo en cada  
			solicitud. Esto abriría la posibilidad de que Paty no utilice un  
			único modelo para todos los procesos, sino que pueda aplicar modelos  
			diferentes según la complejidad de la tarea.`,
		),
		await note(
			"mdi:alert-circle-outline",
			`Esta revisión <b>no representa una decisión final de implementación</b>.  
			Se solicita validación técnica por parte de ingeniería para confirmar  
			si esta estrategia es viable con la estructura actual del código y con  
			la forma en que hoy se están construyendo las solicitudes hacia  
			OpenAI.`,
		),
		await note(
			"mdi:table",
			`Estrategia funcional propuesta por etapa o tipo de consulta:` +
			`<table style="border-collapse:collapse;width:100%;margin-top:0.5rem;font-size:0.85rem;">` +
			`<thead><tr style="background:#80808015;">` +
			`<th style="border:1px solid #80808040;padding:0.35rem;text-align:left;">Etapa o tipo de consulta</th>` +
			`<th style="border:1px solid #80808040;padding:0.35rem;text-align:left;">Posible estrategia</th>` +
			`</tr></thead><tbody>` +
			[
				["Clasificación de tipo de consulta", "Usar un modelo más liviano y económico."],
				["Clasificación de módulo", "Usar un modelo más liviano y económico."],
				["Extracción de consultas útiles", "Usar un modelo liviano o intermedio."],
				["SALUDO_OTRO", "Usar modelo económico o incluso respuesta controlada por backend."],
				["SOLICITUD_NO_PERMITIDA", "Usar plantilla controlada o modelo económico."],
				["FUERA_DE_ALCANCE_TECNICO", "Usar plantilla controlada o modelo económico."],
				["REQUIERE_CONTEXTO", "Usar modelo económico o intermedio."],
				["PASO_A_PASO", "Usar un modelo con mayor capacidad."],
				["ERROR_CONFIGURACION", "Usar un modelo con mayor capacidad."],
				["ERROR_DIAN", "Usar un modelo con mayor capacidad por el riesgo de interpretación."],
				["INTERPRETACION_RESULTADO", "Usar un modelo con mayor capacidad."],
				["ASESORIA_PERSONALIZADA", "Usar modelo intermedio o respuesta controlada, según el flujo."],
			]
				.map(([etapa, estrat]) =>
					`<tr>` +
					`<td style="border:1px solid #80808040;padding:0.35rem;"><code>${etapa}</code></td>` +
					`<td style="border:1px solid #80808040;padding:0.35rem;">${estrat}</td>` +
					`</tr>`,
				)
				.join("") +
			`</tbody></table>`,
		),
	);

	const objetivo = noteList(
		await note(
			"mdi:bullseye-arrow",
			`Solicitar al ingeniero de desarrollo realizar una <b>investigación  
			técnica de viabilidad</b> para determinar si Paty IA puede implementar  
			una estrategia de selección dinámica de modelo por:` +
			`<ol style="margin:0.35rem 0 0 1.25rem;padding:0;">` +
			`<li>Etapa del flujo.</li>` +
			`<li>Tipo de consulta.</li>` +
			`<li>Nivel de complejidad de la respuesta.</li>` +
			`<li>Necesidad o no de recuperación documental.</li>` +
			`<li>Costo, latencia y calidad esperada.</li>` +
			`</ol>`,
		),
	);

	const puntos = noteList(
		await note(
			"mdi:api",
			`<b>4.1 Viabilidad técnica en OpenAI Responses.</b>  
			Validar si, con la implementación actual de Responses, es posible  
			enviar un modelo diferente por cada request, por ejemplo:` +
			`<ul style="margin:0.35rem 0 0 1.25rem;padding:0;">` +
			`<li>Un modelo para clasificar <code>tipo_consulta</code>.</li>` +
			`<li>Otro modelo para clasificar módulo.</li>` +
			`<li>Otro modelo para generar respuestas finales.</li>` +
			`<li>Otro modelo para extracción de consultas al cierre de conversación.</li>` +
			`</ul>`,
		),
		await note(
			"mdi:code-tags-check",
			`<b>4.2 Viabilidad dentro del código actual de Paty.</b>  
			Revisar cómo está construido actualmente el llamado a OpenAI en el  
			backend y validar si el modelo está quemado en código, si viene desde  
			configuración, si se puede parametrizar sin afectar el flujo, si hay  
			una única función centralizada para invocar OpenAI, si cada etapa del  
			flujo permite definir su propio modelo y si la selección dinámica  
			afecta streaming, conversación, historial o uso de vector stores.`,
		),
		await note(
			"mdi:sitemap-outline",
			`<b>4.3 Impacto en la arquitectura actual.</b>  
			Validar si el cambio requiere modificar tablas de configuración,  
			agregar campos nuevos para modelo por tipo de consulta, agregar  
			configuración por etapa, ajustar el orquestador, ajustar logs o  
			trazabilidad, actualizar documentación técnica y crear fallback si  
			el modelo configurado falla o no está disponible.`,
		),
		await note(
			"mdi:cash-multiple",
			`<b>4.4 Impacto en costos y rendimiento.</b>  
			Analizar si la estrategia puede ayudar a optimizar costos usando  
			modelos económicos en tareas simples y modelos más fuertes solo en  
			respuestas complejas. Se requiere que ingeniería indique posibles  
			beneficios en consumo, posibles riesgos en latencia, impacto estimado  
			en tiempos de respuesta e impacto sobre calidad de respuesta.`,
		),
		await note(
			"mdi:file-document-outline",
			`<b>4.5 Trazabilidad y auditoría.</b>  
			Validar si conviene registrar en logs o base de datos: modelo usado,  
			etapa del flujo, tipo de consulta clasificado, tokens consumidos,  
			tiempo de respuesta, vector store utilizado, instrucciones aplicadas  
			y resultado de la ejecución. Esto permitiría evaluar posteriormente  
			calidad, costo y comportamiento por tipo de consulta.`,
		),
	);

	const propuesta = await note(
		"mdi:table-cog",
		`Se propone analizar una estrategia inicial de modelo por flujo  
		(<i>solo como propuesta funcional, debe ser validada técnicamente  
		antes de aprobarse</i>):` +
		`<table style="border-collapse:collapse;width:100%;margin-top:0.5rem;font-size:0.85rem;">` +
		`<thead><tr style="background:#80808015;">` +
		`<th style="border:1px solid #80808040;padding:0.35rem;text-align:left;">Flujo</th>` +
		`<th style="border:1px solid #80808040;padding:0.35rem;text-align:left;">Modelo sugerido inicialmente</th>` +
		`<th style="border:1px solid #80808040;padding:0.35rem;text-align:left;">Motivo</th>` +
		`</tr></thead><tbody>` +
		[
			["Clasificador de tipo de consulta", "Modelo liviano", "Salida cerrada en JSON, baja complejidad."],
			["Clasificador de módulo", "Modelo liviano", "Clasificación controlada."],
			["Extractor de consultas útiles", "Modelo liviano o intermedio", "Consolidación de preguntas, salida estructurada."],
			["Saludos, agradecimientos y cierres", "Modelo liviano", "No requiere razonamiento ni recuperación documental."],
			["Solicitudes no permitidas", "Modelo liviano", "Respuesta controlada y segura."],
			["Fuera de alcance técnico", "Modelo liviano", "Redirección controlada."],
			["Requiere contexto", "Modelo liviano", "Solo debe pedir aclaración mínima."],
			["Paso a paso", "Modelo más fuerte", "Requiere fidelidad documental, estructura y precisión."],
			["Error de configuración", "Modelo más fuerte", "Requiere diagnóstico funcional documentado."],
			["Error DIAN", "Modelo más fuerte", "Riesgo alto por interpretación incorrecta."],
			["Interpretación de resultado", "Modelo más fuerte", "Requiere análisis causa - efecto."],
			["Comercial", "Modelo liviano o intermedio", "Respuesta controlada con fuente comercial."],
		]
			.map(([flujo, modelo, motivo]) =>
				`<tr>` +
				`<td style="border:1px solid #80808040;padding:0.35rem;">${flujo}</td>` +
				`<td style="border:1px solid #80808040;padding:0.35rem;">${modelo}</td>` +
				`<td style="border:1px solid #80808040;padding:0.35rem;">${motivo}</td>` +
				`</tr>`,
			)
			.join("") +
		`</tbody></table>`,
	);

	const resultado = noteList(
		await note(
			"mdi:check-decagram-outline",
			`<b>Conclusión de viabilidad:</b> indicar si se puede o no  
			implementar selección dinámica de modelo.`,
		),
		await note(
			"mdi:source-branch",
			`<b>Explicación del estado actual:</b> describir brevemente cómo se  
			define hoy el modelo en el código.`,
		),
		await note(
			"mdi:lightbulb-on-outline",
			`<b>Propuesta técnica de implementación:</b> explicar cómo podría  
			parametrizarse (por código, por tabla, por archivo de configuración o  
			por variable de entorno).`,
		),
		await note(
			"mdi:wrench-outline",
			`<b>Cambios requeridos:</b> listar ajustes necesarios en backend,  
			base de datos, configuración, logs o documentación.`,
		),
		await note(
			"mdi:alert-octagon-outline",
			`<b>Riesgos identificados:</b> mencionar riesgos técnicos, de costo,  
			calidad, latencia, trazabilidad o mantenimiento.`,
		),
		await note(
			"mdi:thumb-up-outline",
			`<b>Recomendación técnica:</b> indicar si conviene implementarlo, si  
			debe hacerse por fases o si no se recomienda.`,
		),
		await note(
			"mdi:account-group-outline",
			`<b>Propuesta para aprobación:</b> presentar una alternativa clara  
			para revisar con el equipo técnico antes de iniciar desarrollo.`,
		),
	);

	const estado = await note(
		"mdi:magnify",
		`<b>En análisis.</b> Investigación técnica de viabilidad en curso.  
		Se entregará la respuesta consolidada con los siete puntos del  
		resultado esperado, sin iniciar implementación hasta su revisión y  
		aprobación con el equipo técnico.`,
	);

	return intro
		+ h3Antecedente + antecedente
		+ h3Revision + revision
		+ h3Objetivo + objetivo
		+ h3PuntosVal + puntos
		+ h3Propuesta + propuesta
		+ h3Resultado + resultado
		+ h3Estado + estado;
}

export const bodyTK1429262: Promise<string> = buildBodyTK1429262();
