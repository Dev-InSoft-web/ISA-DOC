# PatyIA — Visión General

**PatyIA** (también referenciado como *Ayudas ContaPyme IA* / `AYUDASCP-IA`) es el asistente conversacional con IA que se integra al **Portal de Clientes** de ContaPyme. Su propósito es responder preguntas funcionales del usuario apoyándose en una base de conocimiento propia (RAG) y, cuando aplique, escalar la conversación al sistema de tiquetes.

## Actores principales

- **Usuario**: cliente que interactúa desde el navegador.
- **Portal de Clientes (Frontend)**: aplicación web que consume la API y renderiza el chat.
- **Backend PatyIA (`AYUDASCP-IA`)**: microservicio Azure Functions (HTTP) que orquesta autenticación, persistencia y el asistente.
- **Proveedor IA (OpenAI)**: asistente `Paty` con *Vector Storage / file-search* como base de conocimiento (RAG).
- **DSCLIENTES**: servicio externo de autenticación de contactos / terceros.
- **Persistencia (`AYUDASCP_IA`, MSSQL)**: conversaciones, mensajes calificados y tiquetes.

## Vista conceptual

![Diagrama conceptual de PatyIA](/imgs/patyia/diagramas/conceptual.png)

```
Usuario → Portal de clientes (Frontend) → Backend PatyIA
                                            ├─ Persistencia (conversaciones, calificaciones, tiquetes)
                                            ├─ Proveedor IA (modelo + base de conocimiento)
                                            └─ Servicios externos (DSClientes, Sistema de Tiquetes)
```

## Alcance de esta documentación

Esta primera versión cubre, a nivel de ingeniería:

1. **Arquitectura** — empaquetado de componentes y despliegue (Azure / OpenAI / DSClientes).
2. **Modelo de datos** — entidades persistentes en `AYUDASCP_IA`.
3. **Flujo del asistente** — diagrama de actividad del ciclo "se recibe la conversación → respuesta vía stream".
4. **Endpoints HTTP** — contrato funcional de cada Azure Function expuesta.

> Esta documentación se irá ampliando con detalles de implementación (DTOs, contratos REST, contratos del asistente y de la base de conocimiento) a medida que se estabilicen.
