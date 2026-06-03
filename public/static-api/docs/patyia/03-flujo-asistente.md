# PatyIA — Flujo del Asistente

Diagrama de actividad del procesamiento de una conversación cuando el backend recibe un prompt del usuario y debe producir la respuesta del asistente vía **stream**.

![Diagrama de actividad](/imgs/patyia/diagramas/actividad.jpg)

## Pasos

1. **Se recibe la conversación** (request del frontend con prompt + datos de sesión).
2. ¿La conversación está asociada a un **hilo** (`thread` del asistente)?
   - **NO** → crear hilo y asociarlo a la conversación.
     - Si **no se pudo obtener el nuevo hilo** → retornar error.
   - **SÍ** → continuar.
3. **Agregar el mensaje del usuario (prompt) al hilo**.
4. **Solicitar respuesta al asistente vía stream** y retornar al frontend un **indicador de inicio de stream**.
5. ¿Se recibieron los datos del stream correctamente?
   - **NO** → retornar error.
   - **SÍ** → continuar.
6. **Actualizar datos de la ejecución** sobre la conversación:
   - Resultado de la ejecución.
   - Cantidad de **tokens** consumidos.
   - Cantidad de **mensajes** en la conversación.
   - **Modelo** que se usó desde el asistente.
7. Retornar al frontend el **indicador de finalización del stream** junto con los datos actualizados de la conversación.

## Notas de diseño

- El stream se inicia tan pronto el asistente responde; el frontend muestra los chunks en vivo.
- La persistencia de metadatos (tokens, modelo, conteo de mensajes, `FHULTACT`) se hace **al finalizar** el stream, no por cada chunk.
- Errores en cualquier punto del flujo retornan al usuario sin persistir cambios parciales del lado del asistente (la creación del hilo y el agregado del prompt, sin embargo, sí ocurren antes del stream).
