# Endpoints expuestos por server local (Azure Functions)

Base local: `http://localhost:7071`

El selector de la barra superior (Origin / Local) decide ruta por acción:

- Si la acción está en este catálogo y se elige **Local**, ISA-DOC apunta al server local de Azure Functions y el botón asociado se pinta en color `danger` con el nombre del endpoint en el `title`.
- Si la acción NO está en el catálogo local, ISA-DOC siempre cae al server de origin sin importar el switch.

## Checklist de pruebas desde ISA-DOC

Marca cada endpoint cuando se haya verificado end-to-end desde la UI de ISA-DOC apuntando al local.

| Endpoint | Método | Ruta local | Wired en ISA-DOC | ✅ Probado |
| --- | --- | --- | --- | --- |
| API_DELETE_ObtenerConversacion | DELETE | `/api/conversacion/{iconversacion}` | ❌ | ☐ |
| API_DELETE_Tiquete | DELETE | `/api/tiquete/{itiquete}` | ❌ | ☐ |
| API_GET_ConversacionesTercero | GET | `/api/conversaciones` | ✅ | ☐ |
| API_GET_ObtenerConversacion | GET | `/api/conversacion/{iconversacion}` | ✅ | ☐ |
| API_GET_ObtenerResumenConversacion | GET | `/api/resumen_conversacion/{iconversacion}` | ❌ | ☐ |
| API_GET_Tiquete | GET | `/api/tiquete/{itiquete}` | ❌ | ☐ |
| API_GET_TiquetePorConversacion | GET | `/api/tiquete/por-conversacion/{iconversacion}` | ❌ | ☐ |
| API_HTTP_Timer_CerrarConversaciones | GET | `/api/timer_cerrarConversaciones` | ❌ | ☐ |
| API_PATCH_Tiquete | PATCH | `/api/tiquete` | ❌ | ☐ |
| API_POST_Authorization | POST | `/api/jwt` | ❌ | ☐ |
| API_POST_InsertarConversacion | POST | `/api/conversacion` | ✅ | ☐ |
| API_POST_InsertarMensajeCalificado | POST | `/api/mensaje` | ✅ | ☐ |
| API_POST_Tiquete | POST | `/api/tiquete` | ❌ | ☐ |

## Mapeo interno → local

El catálogo vive en `src/lib/patyia/apiEndpoints.ts` (`LOCAL_ENDPOINT_ROUTES`).

| Ruta interna ISA-DOC | Método | Nombre local |
| --- | --- | --- |
| `/api/patyia/conversaciones` | GET | API_GET_ConversacionesTercero |
| `/api/patyia/conversacion/{id}` | GET | API_GET_ObtenerConversacion |
| `/api/patyia/staging/conversacion/new` | POST | API_POST_InsertarConversacion |
| `/api/patyia/staging/conversacion/{id}/send-stream` | POST | API_POST_InsertarMensajeCalificado |

## Convenciones visuales

- Botón con color `danger` → la acción se ejecutará contra el server local.
- `title` con sufijo `· LOCAL <nombre>` → indica el endpoint exacto del local que se invocará.
- Sin color y sin sufijo → la acción se ejecuta contra origin.

## Cómo agregar un endpoint al switch

1. Agregar entrada en `LOCAL_ENDPOINT_ROUTES` (regex sobre la ruta interna ISA-DOC + función que arma la URL local).
2. Verificar que el call site use `fetch(apiUrl(path, method))` con el `method` correcto.
3. En el botón que dispara la acción, agregar `title={tituloLocal(apiHost, path, method, "Texto")}` y `color={colorLocal(apiHost, path, method)}`.
4. Marcar la fila en la checklist de arriba cuando se haya probado.
