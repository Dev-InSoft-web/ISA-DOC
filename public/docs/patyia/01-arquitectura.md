# PatyIA — Arquitectura

## 1. Componentes (vista lógica)

![Diagrama de componentes](/imgs/patyia/diagramas/componentes.jpg)

| Paquete | Componente | Tipo | Rol |
|---|---|---|---|
| `CLIENTE_WEB` | **Portal clientes** | Aplicación web | Cliente del Backend; renderiza chat y administra sesión. |
| `Azure / MICROSERVICIOS` | **AYUDASCP-IA** | Microservicio (Azure Functions HTTP) | Orquesta autenticación, persistencia y llamadas al asistente. |
| `Azure / PERSISTENCIA` | **AYUDASCP_IA** | BD MSSQL | Persiste conversaciones, mensajes calificados y tiquetes. |
| `PROVEEDOR_AI` | **Asistente = Paty** | Recurso IA (OpenAI) | Modelo conversacional. |
| `PROVEEDOR_AI` | **vector-storage, file-search** | Vector Storage | Base de conocimiento (RAG). |
| `DSCLIENTES` | **Autenticación** | Microservicio externo | Valida credenciales del contacto. |

## 2. Componentes del servidor (detalle de funciones)

![Componentes de los servidores](/imgs/patyia/diagramas/componentes-servidores.jpg)

El microservicio `AYUDASCP-IA` expone las siguientes **Funciones HTTP**, todas consumidas por el Portal de Clientes:

- `POST-JWT` — emisión de token tras validar contra `LoginContacto` de `DSCLIENTES`.
- `POST-Conversacion` — crea o continúa una conversación, dispara la respuesta del asistente (stream).
- `GET-Conversacion` — obtiene una conversación con su historial de mensajes.
- `GET-Conversaciones` — lista las conversaciones visibles del usuario en sesión.
- `GET-ResumenConversacion` — genera un resumen de la conversación a partir del hilo.
- `POST-Mensaje` — registra un mensaje calificado por el usuario.
- `POST-Tiquete` — escala la conversación a un tiquete (uno por conversación).
- `DELETE-Conversacion` — marca la conversación como **no visible** (borrado lógico).

Dependencias externas del backend:

- **OpenAI**: el asistente `Paty-Asistente` con su **Vector Storage Paty** (RAG vía file-search).
- **DSCLIENTES**: `LoginContacto` para validar credenciales.
- **DB MSSQL**: `AYUDASCP_IA` como única persistencia del dominio.

## 3. Diagrama de despliegue resumido

```
[Portal de clientes] ──HTTPS──▶ [Azure Functions: AYUDASCP-IA] ──▶ [Azure SQL: AYUDASCP_IA]
                                          │
                                          ├──▶ [OpenAI: Paty + Vector Storage]
                                          └──▶ [DSCLIENTES: LoginContacto]
```
