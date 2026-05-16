# PatyIA — Modelo de Datos

Base de datos: **`AYUDASCP_IA`** (MSSQL).

![Diagrama Entidad-Relación](/imgs/patyia/diagramas/er.jpg)

## Entidades

### `CONVERSACIONES`

Núcleo del dominio. Una conversación agrupa los mensajes intercambiados entre un usuario y el asistente.

| Campo | Tipo | Descripción |
|---|---|---|
| **ICONVERSACION** (PK) | `int` | Identificador de la conversación. |
| `ITERCERO` | `text` | Tercero (cliente/empresa) propietario del contexto. |
| `ICONTACTO` | `text` | Contacto autenticado que originó la conversación. |
| `IMODULO` | `int` | Módulo de ContaPyme desde el que se abrió la conversación. |
| `FHCRE` | `datetime` | Fecha y hora de creación. |
| `TITULO` | `text` | Título generado para la conversación. |
| `HILO` | `text` | Identificador del hilo (`thread`) del asistente OpenAI. |
| `MODELO_IA` | `text` | Modelo de IA utilizado. |
| `VERSION_AYUDA` | `text` | Versión de la base de conocimiento usada. |
| `QMENSAJES` | `int` | Cantidad de mensajes en la conversación. |
| `QTOKENS` | `int` | Cantidad acumulada de tokens consumidos. |
| `PROMPT` | `varchar(max)` | Último/inicial prompt enviado al asistente. |
| `ITDESTADO` | `smallint` | Estado de la conversación (p. ej. abierta / **CERRADO** / no visible). |
| `FHULTACT` | `datetime` | Fecha y hora de la última actualización. |
| `BAUTORIZA_VISUALIZACION` | `bit` | Indica si el usuario autoriza visualizar la conversación. |

> **Regla de cierre:** si el último mensaje de la conversación tiene más de **4 horas**, al consultarla se cambia su estado a `CERRADO` (ver `GET-Conversacion`).
>
> **Borrado lógico:** `DELETE-Conversacion` no elimina el registro: actualiza la conversación a estado **NO VISIBLE**, que la excluye del listado.

### `MENSAJESCALIFICADOS`

Mensajes que el usuario marca / califica explícitamente sobre una conversación.

| Campo | Tipo | Descripción |
|---|---|---|
| **IMENSAJE** (PK) | `int` | Identificador del mensaje calificado. |
| `ICONVERSACION` (FK → `CONVERSACIONES`) | `int` | Conversación asociada. |
| `REFERENCIA` | `int` | Referencia al mensaje del hilo del asistente. |
| `BUTIL` | `bit` | Calificación útil / no útil. |
| `CONTENIDO` | `text` | Texto del mensaje calificado. |

### `TIQUETESCONVERSACION`

Tiquete escalado a partir de una conversación. **Una conversación admite, como máximo, un tiquete** (validado en `POST-Tiquete`).

| Campo | Tipo | Descripción |
|---|---|---|
| **ITIQUETE** (PK) | `text` | Identificador del tiquete en el sistema externo. |
| `ICONVERSACION` (FK → `CONVERSACIONES`) | `int` | Conversación origen. |
| `TEMA` | `text` | Tema del tiquete. |
| `CLASIFICADOR` | `text` | Clasificador del tiquete. |

### `PROPIETARIOXTERCERO`

Relación de propiedad entre un identificador interno y un tercero.

| Campo | Tipo | Descripción |
|---|---|---|
| `IPROPIETARIO` | `text` | Identificador del propietario. |
| `ITERCERO` | `text` | Tercero asociado. |

## Relaciones

- `CONVERSACIONES (1) ──▶ (N) MENSAJESCALIFICADOS` por `ICONVERSACION`.
- `CONVERSACIONES (1) ──▶ (0..1) TIQUETESCONVERSACION` por `ICONVERSACION`.
- `PROPIETARIOXTERCERO` se usa para resolver propietario ↔ tercero en lógica de visibilidad.
