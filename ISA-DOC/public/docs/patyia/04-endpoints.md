# PatyIA — Endpoints HTTP

Esta sección documenta, a nivel de **flujo funcional**, cada Azure Function expuesta por `AYUDASCP-IA`. Los contratos detallados (DTOs y payloads exactos) se irán agregando en versiones posteriores.

> **Convención común para endpoints protegidos:** el frontend envía la consulta + **JWT**; el backend valida el JWT (paso 2). Si no es auténtico, deniega la request (paso 3). Luego establece variables de sesión del usuario antes de operar.

---

## POST `/JWT` — Emisión de token

![Post JWT](/imgs/patyia/diagramas/post-jwt.jpg)

1. Usuario inicia sesión desde el frontend.
2. El frontend envía datos de autenticación al backend.
3. El backend valida las credenciales contra **DSCLIENTES**.
4. Si la `controlkey` **no es auténtica**, retorna la validación al frontend.
5. Si es válida, el backend **genera un JWT** firmado por el servicio con los datos de sesión.
6. Retorna el JWT al frontend, que responde al usuario.

---

## POST `/Conversacion` — Crear o continuar conversación

![Post Conversación](/imgs/patyia/diagramas/post-conversacion.jpg)

1–4. Validar JWT y establecer variables de sesión.
5. Identificar si la operación es **crear** una conversación nueva o **actualizar** una existente.
6. Validar datos requeridos. Retornar errores de validación si existen.
7. **Actualizar:** consultar el registro en la BD. Si no existe → error. Si no pertenece al usuario en sesión → error.
8. **Crear:** persistir los datos iniciales de la conversación y **solicitar un título** al asistente.
9. Consultar al asistente con el prompt:
   - Si la conversación ya tiene **hilo**, se ejecuta el procedimiento para actualizarlo.
   - Si no, se **crea un hilo nuevo**.
10. Se inicia recepción y transmisión del **stream** de la respuesta al frontend (`Inicio` / `Fin` de stream).
11. Al finalizar, se persisten los cambios de la conversación: resultados de ejecución, tokens, modelo, conteo de mensajes y `FHULTACT`.

> Ver el detalle de pasos del asistente en [Flujo del Asistente](#).

---

## GET `/Conversaciones` — Listar conversaciones del usuario

![Get Conversaciones](/imgs/patyia/diagramas/get-conversaciones.jpg)

1–4. Validar JWT y establecer variables de sesión.
5. Consultar las conversaciones relacionadas con el usuario en sesión.
6. Retornar la respuesta **excluyendo conversaciones no visibles** (borrado lógico).

---

## GET `/Conversacion/{id}` — Obtener una conversación

![Get Conversación](/imgs/patyia/diagramas/get-conversacion.jpg)

1–4. Validar JWT y establecer variables de sesión.
5. Consultar la conversación en la persistencia.
6. Si no existe → error.
7. Si no está relacionada con el usuario en sesión → error.
8. Consultar al asistente el **historial de mensajes** de la conversación a través del **hilo**.
9. Verificar `FHULTACT` (fecha/hora del último mensaje).
10. Obtener los **mensajes calificados** y los **tiquetes** asociados a la conversación.
11. Si el último mensaje se creó hace **más de 4 horas**, cambiar el estado de la conversación a **CERRADO**.
12. Retornar la respuesta con la conversación procesada incluyendo el historial del asistente.

---

## GET `/Conversacion/{id}/Resumen` — Resumen de una conversación

![Get Resumen Conversación](/imgs/patyia/diagramas/get-resumen-conversacion.jpg)

1–4. Validar JWT y establecer variables de sesión.
5. Consultar la conversación. Si no existe → error.
6. Si la conversación **no tiene hilo** asociado → error.
7. Consultar al asistente el historial de mensajes vía hilo.
8. Solicitar al asistente la **generación del resumen** usando los mensajes obtenidos.
9. Retornar el resumen al frontend.

---

## POST `/Mensaje` — Registrar mensaje calificado

![Post Mensaje](/imgs/patyia/diagramas/post-mensaje.jpg)

1–4. Validar JWT y establecer variables de sesión.
5. Validar los datos a insertar.
6. Si hay errores de validación → retornarlos.
7. Crear el nuevo registro en `MENSAJESCALIFICADOS`.
8. Retornar los datos del mensaje creado.

---

## POST `/Tiquete` — Escalar conversación a tiquete

![Post Tiquete](/imgs/patyia/diagramas/post-tiquete.jpg)

1–4. Validar JWT y establecer variables de sesión.
5. Validar datos a insertar.
6. Si hay errores → retornarlos.
7. Consultar la conversación relacionada al tiquete que se creará.
8. Validar si la conversación **ya cuenta con un tiquete registrado**.
9. Si ya existe un tiquete para esa conversación → retornar error (regla: **un tiquete por conversación**).
10. Crear el nuevo registro de tiquete.
11. Retornar los datos del tiquete creado.

---

## DELETE `/Conversacion/{id}` — Borrado lógico

![Delete Conversación](/imgs/patyia/diagramas/delete-conversacion.jpg)

1–4. Validar JWT y establecer variables de sesión.
5. Si hay errores de validación → retornarlos.
6. Si la conversación **no corresponde** a las credenciales del usuario en sesión → retornar error.
7. Actualizar la conversación a estado **NO VISIBLE** (no se borra físicamente).
8. Retornar los datos de la conversación eliminada lógicamente.
