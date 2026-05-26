// TK-1429373 — Inserción en BD de Paty V3 de las instrucciones por tipo de
// consulta. Se aplican los prompts específicos sobre AYUDASCP_IA mediante
// un script idempotente con MERGE.

import { h3Iconized, note, noteList } from "./tk-helpers";
import { simpleTable } from "./snippets";

const PROMPTS: Array<{ tipo: string; codigo: string; descripcion: string }> = [
	{ tipo: "ASESORIA_PERSONALIZADA", codigo: "INS_ASESORIA_PERSONALIZADA", descripcion: "Casos específicos de la empresa del usuario, validación de datos particulares o análisis que requiere acceso a información interna o contexto que el asistente no posee." },
	{ tipo: "COMERCIAL", codigo: "INS_COMERCIAL", descripcion: "Consultas comerciales sobre precios, licencias, funcionalidades, módulos, adquisición del sistema o contacto con el área comercial." },
	{ tipo: "CONSULTA_NORMATIVA_NEGOCIO", codigo: "INS_CONSULTA_NORMATIVA_NEGOCIO", descripcion: "Consultas de normativa legal, tributaria, contable o laboral. Evita interpretaciones y redirige a fuentes oficiales o asesores especializados." },
	{ tipo: "ERROR_ACCESO", codigo: "INS_ERROR_ACCESO", descripcion: "Problemas de acceso al sistema: inicio de sesión, usuarios bloqueados, contraseñas, licencias o autenticación." },
	{ tipo: "ERROR_CONFIGURACION", codigo: "INS_ERROR_CONFIGURACION", descripcion: "Falsos errores originados por configuraciones incompletas, uso incorrecto, falta de permisos o interpretación errónea del comportamiento esperado." },
	{ tipo: "ERROR_DIAN", codigo: "INS_ERROR_DIAN", descripcion: "Rechazos o errores en validaciones de la DIAN. Identifica si corresponde a una regla documentada o redirige a soporte." },
	{ tipo: "ERROR_TECNICO", codigo: "INS_ERROR_TECNICO", descripcion: "Fallas técnicas reportadas (cierres inesperados, bloqueos, errores internos, accesos denegados) que no admiten diagnóstico funcional desde el asistente." },
	{ tipo: "FUERA_DE_ALCANCE_TECNICO", codigo: "INS_FUERA_DE_ALCANCE_TECNICO", descripcion: "Solicitudes de desarrollo técnico, programación, integraciones, APIs o SQL fuera del alcance funcional documentado de ContaPyme." },
	{ tipo: "INTERPRETACION_RESULTADO", codigo: "INS_INTERPRETACION_RESULTADO", descripcion: "Explicación de por qué el sistema generó un resultado específico (valores, saldos, cálculos, asientos) relacionándolo con configuraciones y procesos documentados." },
	{ tipo: "PASO_A_PASO", codigo: "INS_PASO_A_PASO", descripcion: "Guía operativa paso a paso para ejecutar un proceso dentro de ContaPyme, respetando estructura, orden y contenido de las fuentes recuperadas." },
	{ tipo: "REQUIERE_CONTEXTO", codigo: "INS_REQUIERE_CONTEXTO", descripcion: "Solicitud de información adicional cuando el clasificador no logra identificar con precisión el proceso, módulo, documento o acción requerida." },
	{ tipo: "SALUDO_OTRO", codigo: "INS_SALUDO_OTRO", descripcion: "Saludos, agradecimientos, despedidas o mensajes sin intención funcional. Respuesta natural, cercana y amable." },
	{ tipo: "SOLICITUD_NO_PERMITIDA", codigo: "INS_SOLICITUD_NO_PERMITIDA", descripcion: "Solicitudes que vulneran políticas de seguridad, privacidad, normativa o buenas prácticas. Rechazo respetuoso, claro y firme." },
];

const intro =
	`<div>Se solicita insertar en la <b>base de datos AYUDASCP_IA</b> las  
	instrucciones específicas por tipo de consulta, alineando la BD con los  
	<b>prompts</b> definidos en la ruta de análisis y diseño y en el archivo  
	de control de instrucciones.</div>`;

export async function buildBodyTK1429373(): Promise<string> {
	const [h3Solicitud, h3Solucion] = await Promise.all([
		h3Iconized("mdi:database-plus-outline", "Solicitud"),
		h3Iconized("mdi:check-circle-outline", "Solución aplicada"),
	]);

	const solicitud = noteList(
		await note(
			"mdi:folder-text-outline",
			`<b>Ruta general de prompts:</b>  
			<code>P:\\ING-05 Sistema de servicio al cliente web\\ING-05-50 Ayudas ContaPyme IA\\Doc\\PATY V3\\Análisis y diseño\\prompt\\Prompts Especificos (Instrucciones)</code>.`,
		),
		await note(
			"mdi:file-document-outline",
			`<b>Archivo de control:</b> <i>Configuración de instrucciones</i>.`,
		),
		await note(
			"mdi:table",
			`Se entrega una <b>tabla de instrucciones por tipo de consulta</b>  
			(tipo, código de instrucción, archivo de prompt y descripción).  
			Cada archivo <code>.md</code> contiene la instrucción específica que  
			debe aplicarse según el tipo de consulta clasificado por Paty.`,
		),
	);

	const tablaPrompts = simpleTable(
		["Tipo de consulta", "Código de instrucción", "Archivo", "Descripción"],
		PROMPTS.map((p) => [
			`<code>${p.tipo}</code>`,
			`<code>${p.codigo}</code>`,
			`<code>PROMPT_${p.tipo}.md</code>`,
			p.descripcion,
		]),
	);

	const solucion = noteList(
		await note(
			"mdi:database-cog-outline",
			`Se ejecuta un script <b>idempotente</b> sobre  
			<code>AYUDASCP_IA</code> que carga los <b>13 prompts</b>  
			(<code>PROMPT_&lt;TIPO&gt;</code>) leídos desde los archivos  
			<code>.md</code> del repositorio de análisis y diseño.`,
		),
		await note(
			"mdi:merge",
			`Se aplica <b>MERGE</b> en <code>INSTRUCCION</code> con clave  
			<code>iinstruccion = &lt;TIPO&gt;</code>: si no existe inserta el  
			registro y si existe actualiza nombre, contenido, descripción,  
			versión y estado activo.`,
		),
		await note(
			"mdi:link-variant",
			`Se aplica <b>MERGE</b> en <code>TDCONSULTAXINSTRUCCION</code>  
			enlazando <code>itdconsulta</code> con <code>iinstruccion</code> y  
			<code>orden = 1</code>, evitando duplicados en re-ejecuciones.`,
		),
		await note(
			"mdi:shield-check-outline",
			`El script se envuelve en <code>BEGIN TRAN</code> /  
			<code>COMMIT</code> con <code>SET XACT_ABORT ON</code>, de modo  
			que cualquier fallo revierte el lote completo.`,
		),
	);

	return (
		intro +
		h3Solicitud + solicitud + tablaPrompts +
		h3Solucion + solucion
	);
}

export const bodyTK1429373: Promise<string> = buildBodyTK1429373();
