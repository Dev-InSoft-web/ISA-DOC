# Interacción experimental — BD staging (`AYUDASCP_IA_STAGING`)

Camino B del laboratorio interno: una pestaña anidada dentro de la pestaña **Conversación** del panel de pruebas de PatyIA permite **crear conversaciones nuevas y enviar/recibir mensajes** simulando ser cualquier `(itercero, icontacto)` que ya tenga historial en staging.

Sirve como entorno seguro para investigar el comportamiento de PatyIA sin tocar la base de producción.

## Alcance

- BD de trabajo: **únicamente** `AYUDASCP_IA_STAGING`. El pool sigue conectándose a `AYUDASCP_IA`, pero todas las consultas califican el esquema con `[AYUDASCP_IA_STAGING].dbo.<tabla>`.
- Modelo: el que esté en `paty_openai_model` (actualmente `gpt-5.4`, modelo de razonamiento).
- Prompt: `paty_pr_general` (PR_GENERAL), forzado para todas las llamadas de este tab.
- Conversación OpenAI: API `/v1/conversations` (`conv_xxx`), no Assistants v2 (`thread_xxx`).

## Descubrimiento de identidades

Staging no expone tablas `TERCEROS` ni `CONTACTOS`. Las identidades válidas se infieren del propio historial de conversaciones:

```sql
SELECT TOP 100
  ITERCERO,
  ICONTACTO,
  COUNT(*)     AS QCONV,
  MAX(FHCRE)   AS ULT_FH
FROM [AYUDASCP_IA_STAGING].dbo.CONVERSACIONES
WHERE ITERCERO IS NOT NULL
GROUP BY ITERCERO, ICONTACTO
ORDER BY QCONV DESC, ULT_FH DESC;
```

El endpoint expone esto como lista plana; la UI lo renderiza en un `SelectEnum` con etiqueta `Tercero X · Contacto Y · N conv`.

## Endpoints

Todos viven bajo `src/pages/api/patyia/staging/`.

### `GET /api/patyia/staging/identidades`

Lista las 100 identidades con más conversaciones en staging.

Respuesta:

```json
{
  "ok": true,
  "items": [
    { "itercero": 123, "icontacto": 7, "qconv": 42, "ultFh": "2025-10-22T12:34:56.000Z" }
  ]
}
```

### `POST /api/patyia/staging/conversacion/new`

Crea conversación OpenAI (`conv_xxx`), invoca la primera respuesta y persiste fila en `CONVERSACIONES` (staging).

Body:

```json
{
  "itercero": 123,
  "icontacto": 7,
  "primerMensaje": "Hola Paty",
  "nombre": "Juan Prueba",
  "variables": { "nombre_usuario": "Juan Prueba" },
  "imodulo": "isa-doc",
  "titulo": "Prueba laboratorio"
}
```

Particularidades:

- `ICONVERSACION` **no es identity** en staging → se calcula `MAX(ICONVERSACION) + 1` antes del `INSERT`.
- `VERSION_AYUDA` se fija en `'isa-doc-stg'` para diferenciar tráfico de laboratorio.
- `BAUTORIZA_VISUALIZACION = 0`, `ITDESTADO = 1`, `QMENSAJES = 2`.
- Defaults: `IMODULO = 'isa-doc'`.
- El prompt `PR_GENERAL` requiere variable de plantilla `nombre_usuario`; si no se provee se inyecta `"Tercero <itercero>"` como fallback.

### `POST /api/patyia/staging/conversacion/{id}/send`

Envío sincrónico (sin stream). Devuelve `{ ok, respuesta: { id, texto, usage }, conversacion: { id, hilo, qmensajes, qtokens } }`.

Actualiza:

```sql
UPDATE [AYUDASCP_IA_STAGING].dbo.CONVERSACIONES
SET QMENSAJES = QMENSAJES + 2,
    QTOKENS   = QTOKENS + @totalTokens,
    FHULTACT  = GETDATE()
WHERE ICONVERSACION = @id;
```

### `POST /api/patyia/staging/conversacion/{id}/send-stream`

Variante SSE (`text/event-stream`). Eventos emitidos:

| event   | data                                              |
| ------- | ------------------------------------------------- |
| `delta` | `{ "text": "<fragmento>" }`                       |
| `done`  | `{ "id", "usage", "texto" }`                      |
| `error` | `{ "error": "<mensaje>" }`                        |

La actualización en BD ocurre antes del evento `done` para que el cliente vea ya el total acumulado.

## Configuración de modelo

PatyIA usa por defecto `gpt-5.4` (razonamiento). Sin tope explícito, el modelo agota el presupuesto en *reasoning tokens* y devuelve `output_text` vacío. En todas las llamadas de este tab se fuerza:

```ts
{
  prompt: { id: PR_GENERAL, variables: { nombre_usuario, ...extra } },
  conversation: hilo,
  store: true,
  max_output_tokens: 4000,
  reasoning: { effort: "low" }
}
```

Adicionalmente el extractor de texto recorre `output[]` y concatena los `content[].text` de los items `type === "message"` cuando `output_text` viene vacío.

## Flujo de la UI

1. Al entrar a **Conversación → Interacción** se llama `GET /staging/identidades` (una sola vez por sesión).
2. El usuario elige una identidad en el `SelectEnum`.
3. Si no hay conversación activa, escribe el primer mensaje y pulsa **Iniciar conversación** → `POST /staging/conversacion/new` (no streaming todavía).
4. Mensajes posteriores → `POST /staging/conversacion/{id}/send-stream` con render incremental en `ChatMensajesView`.
5. Se persiste `interConvId` en la URL (`pestStateB64`); al recargar la página se rehidrata el hilo llamando a `/api/patyia/conversacion/{id}?db=staging` y reconstruyendo `MsgVista[]`.

## Por qué solo staging

- Aislar tráfico experimental y costos de tokens.
- Evitar contaminar `CONVERSACIONES` y `MENSAJES` productivos con pruebas internas.
- Permite limpiar la base con un `DELETE WHERE VERSION_AYUDA = 'isa-doc-stg'` si se requiere reset.
