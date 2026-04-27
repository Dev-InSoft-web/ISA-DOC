# Modelo de Datos

Este documento resume las tablas SQL Server que sustentan el dominio
ContaPymeU. Todas las tablas usan el prefijo `CAPAC_*`.

## Tablas principales (Capacitación)

### `CAPAC_CURSOS`

Catálogo de cursos.

| Columna | Tipo | Descripción |
| --- | --- | --- |
| `ICURSO` (PK) | `varchar(10)` | Identificador del curso. |
| `NCURSO` | `varchar(10)` | Nombre corto. |
| `ITEMA` | `varchar(25)` | FK → `CAPAC_TEMAS`. |
| `IDRIVER` | `smallint` | FK → `CAPAC_DRIVERS`. |
| `DESCRIPCION` | `varchar(max)` | Descripción larga. |
| `BACTIVO` | `bit` | Activo / inactivo. |
| `IUSUARIOCRE`, `IAPPCRE`, `IPCRE`, `FHCRE` | auditoría | Usuario / app / IP / fecha de creación. |

### `CAPAC_PLANES_ESTUDIO`

Planes de estudio (agrupan cursos y certificaciones).

| Columna | Tipo | Notas |
| --- | --- | --- |
| `IPLANESTUDIO` (PK) | `varchar(255)` | |
| `NOMBRE` | `varchar(255)` | |
| `DESCRIPCIONPLAN` | `text` | |
| `TTDVISUALIZACION` | `varchar(50)` | Modo de visualización (ARBOL, LINEAL, …). |
| `BGENERACERTIFICADOG` | `bit` | Si el plan emite certificado. |
| `BACTIVO` | `int` | |
| auditoría | … | `IUSUARIOCRE`, `IAPPCRE`, `IPCRE`, `FHCRE`, `IUSUARIOCULT`. |

### `CAPAC_CURSOS_DE_PLANES_ESTUDIO`

Relación N:M entre planes y cursos.

| Columna | Tipo |
| --- | --- |
| `IPLANESTUDIO` (PK, FK) | `varchar(255)` |
| `ICURSO` (PK, FK) | `varchar(10)` |
| `BREQUERIDO` | `bit` |
| `QORDEN` | `int` |

### `CAPAC_CURSOS_PREREQUISITOS`

Pre-requisitos entre cursos dentro de un plan de estudio.

| Columna | Tipo |
| --- | --- |
| `IPLANESTUDIO` (PK) | `varchar(255)` |
| `ICURSO` (PK) | `varchar(10)` |
| `CURSOSICURSO` (PK) | `varchar(10)` — curso requerido |

### `CAPAC_DRIVERS`

Drivers o fuentes que entregan los cursos.

| Columna | Tipo |
| --- | --- |
| `IDRIVER` (PK) | `smallint` |
| `NDRIVER` | `varchar(10)` |
| `DESCRIPCION` | `varchar(max)` |
| `QNIVELES` | `tinyint` — niveles jerárquicos |

### `CAPAC_ATRIBUTOS_X_DRIVERS`

Atributos definibles por cada driver.

| Columna | Tipo |
| --- | --- |
| `IDRIVER` (PK) | `smallint` |
| `IATRIBUTO` (PK) | `smallint` |
| `QNIVEL` | `tinyint` |
| `NATRIBUTO` | `varchar(50)` |
| `TDATRIBUTO` | `varchar(50)` — tipo de dato |
| `BREQUERIDO` | `bit` |
| `JCONFIG` | `varchar(max)` — configuración JSON |

### `CAPAC_ATRIBUTOS_PLANES`

Atributos por (plan, curso).

| Columna | Tipo |
| --- | --- |
| `IATRIBUTO` (PK) | `smallint` |
| `ICURSO` (PK) | `varchar(10)` |
| `IPLAN` (PK) | `varchar(100)` |
| `VALOR` | `varchar(max)` |

### `CAPAC_ESTRUCTURAS_CURSOS`

Estructura jerárquica del curso (niveles).

| Columna | Tipo |
| --- | --- |
| `ICURSO` (PK) | `varchar(10)` |
| `QNIVEL` (PK) | `tinyint` |
| `NNIVEL` | `varchar(250)` |

> **Nota helper**: en URLs el helper traduce `qnivel` → `inivel` para mantener
> coherencia con el patrón de PKs `i*`.

### `CAPAC_PLANES_CURSOS`

Vincula `IPLAN` con curso, tema, recurso y plan padre.

| Columna | Tipo |
| --- | --- |
| `IPLAN` (PK) | `varchar(100)` |
| `ICURSO` (PK) | `varchar(10)` |
| `ITEMA` | `varchar(25)` |
| `IRECURSO` | `bigint` |
| `IPLANPADRE` | `varchar(100)` |
| `TITULO` | `varchar(255)` |

### `CAPAC_SEGURIDADES_CURSOS`

Permisos por curso.

| Columna | Tipo |
| --- | --- |
| `ICURSO` (PK) | `varchar(10)` |
| `IPERMISO` (PK) | `varchar(25)` |

### `CAPAC_PERMISOS`

Catálogo de permisos.

| Columna | Tipo |
| --- | --- |
| `IPERMISO` (PK) | `varchar(25)` |
| `NPERMISO` | `varchar(255)` |

### `CAPAC_TEMAS`

Temas (clasificación transversal).

| Columna | Tipo |
| --- | --- |
| `ITEMA` (PK) | `varchar(25)` |
| `NTEMA` | `varchar(255)` |
| auditoría | `IUSUARIOCRE`, `APPCRE`, `IPCRE`, `FHCRE` |

## Tablas de Recursos

`CAPAC_TDRECURSOS`, `CAPAC_RECURSOS`, `CAPAC_HISTORIAL_RECURSOS`,
`CAPAC_MENSAJES_RECURSOS`, `CAPAC_MOVIMIENTOS_CONTACTO`,
`CAPAC_CALIFICACIONES_RECURSOS`, `CAPAC_HISTORIAL_CALIFICACIONES`,
`CAPAC_PERMISOS_CONTACTO`, etc. Ver el **DER ORM** en
`public/imgs/Diagrama ORM (Mapeo Relacional de Objetos)1 (1).png` para el
detalle visual completo.

## Reglas de integridad relevantes

- `CAPAC_CURSOS_DE_PLANES_ESTUDIO.IPLANESTUDIO` → `CAPAC_PLANES_ESTUDIO`.
- `CAPAC_CURSOS_DE_PLANES_ESTUDIO.ICURSO` → `CAPAC_CURSOS`.
- `CAPAC_PLANES_CURSOS.ICURSO` → `CAPAC_CURSOS`.
- `CAPAC_ATRIBUTOS_PLANES.ICURSO` / `.IPLAN` → cursos / planes.
- Borrado de un **Curso** debe cascar (lógicamente) en sus
  estructuras, atributos, planes-cursos y seguridades.

Ver detalles de auditoría y reglas de migración en
[`init_capacitacion.sql`](https://github.com/Dev-InSoft/ISS-ClientesIS-ContaPymeU)
y los scripts de `doc/migrar-tbls-bdd/`.
