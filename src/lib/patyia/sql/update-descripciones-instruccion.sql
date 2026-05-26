SET NOCOUNT ON;
SET XACT_ABORT ON;
BEGIN TRAN;

UPDATE i
SET i.descripcion = v.descripcion
FROM INSTRUCCION i
INNER JOIN (VALUES
	(N'ASESORIA_PERSONALIZADA',     N'Prompt orientado a la gestion de consultas donde el usuario solicita la revision de un caso especifico de su empresa, validacion de datos particulares o analisis detallado que requiere acceso a informacion interna o contexto que el asistente no posee.'),
	(N'COMERCIAL',                  N'Prompt orientado a la gestion de consultas comerciales relacionadas con precios, licencias, funcionalidades, modulos, adquisicion del sistema o contacto con el area comercial, en el cual el asistente debe responder de forma clara, atractiva y persuasiva, motivando al usuario a continuar el proceso comercial.'),
	(N'CONSULTA_NORMATIVA_NEGOCIO', N'Prompt orientado a la gestion de consultas relacionadas con normativa legal, tributaria, contable o laboral, en las cuales el asistente debe evitar emitir interpretaciones y redirigir al usuario hacia fuentes oficiales o asesores especializados, manteniendo el enfoque en el uso del sistema ContaPyme.'),
	(N'ERROR_ACCESO',               N'Prompt orientado a la gestion de situaciones relacionadas con el acceso al sistema, incluyendo problemas de inicio de sesion, usuarios bloqueados, contrasenas, licencias o validaciones de autenticacion, en los cuales el asistente debe orientar con base en causas comunes documentadas o redirigir a soporte si no se logra resolver.'),
	(N'ERROR_CONFIGURACION',        N'Prompt orientado a la gestion de situaciones donde el usuario percibe un error, pero este se origina generalmente por configuraciones incompletas, uso incorrecto del sistema, falta de permisos o interpretacion erronea del comportamiento esperado.'),
	(N'ERROR_DIAN',                 N'Prompt orientado a la gestion de rechazos o errores relacionados con validaciones de la DIAN, en el cual el asistente debe identificar si el mensaje reportado corresponde a una regla documentada y brindar orientacion basada en dicha informacion, o redirigir a soporte en caso de no existir coincidencia.'),
	(N'ERROR_TECNICO',              N'Prompt orientado a la gestion de situaciones donde el usuario reporta comportamientos anomalos del sistema que indican una posible falla tecnica, como cierres inesperados, bloqueos, errores internos, accesos denegados u otros comportamientos irregulares, en los cuales no es posible realizar diagnostico funcional desde el asistente.'),
	(N'FUERA_DE_ALCANCE_TECNICO',   N'Prompt orientado a la gestion de consultas relacionadas con desarrollo tecnico, programacion, integraciones, APIs, SQL u otros aspectos fuera del alcance funcional documentado de ContaPyme, en las cuales el asistente debe negar la solicitud de forma clara y respetuosa.'),
	(N'INTERPRETACION_RESULTADO',   N'Prompt orientado a la construccion de respuestas explicativas, en el cual el asistente debe analizar y explicar por que el sistema genero un resultado especifico, como valores, saldos, calculos, asientos o comportamientos, utilizando informacion documentada y relacionando el resultado con configuraciones, procesos o condiciones del sistema.'),
	(N'PASO_A_PASO',                N'Prompt orientado a la construccion de respuestas tipo guia operativa, en el cual el asistente debe explicar paso a paso como ejecutar un proceso dentro de ContaPyme, utilizando exclusivamente informacion documentada y respetando la estructura, orden y contenido original de las fuentes recuperadas.'),
	(N'REQUIERE_CONTEXTO',          N'Prompt orientado a solicitar informacion adicional cuando el clasificador ha determinado que la consulta no cuenta con suficiente precision para identificar con claridad el proceso, modulo, documento o accion requerida dentro de ContaPyme.'),
	(N'SALUDO_OTRO',                N'Prompt orientado a la gestion de saludos, agradecimientos, despedidas o mensajes sin intencion funcional, en los cuales el asistente debe responder de forma natural, cercana y amable, manteniendo una conversacion fluida.'),
	(N'SOLICITUD_NO_PERMITIDA',     N'Prompt orientado a la gestion de solicitudes que vulneran politicas de seguridad, privacidad, normativa o buenas practicas del sistema, en las cuales el asistente debe rechazar la solicitud de forma respetuosa, clara y firme, sin proporcionar alternativas indebidas.')
) AS v (iinstruccion, descripcion)
	ON v.iinstruccion = i.iinstruccion;

COMMIT;
