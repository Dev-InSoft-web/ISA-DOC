# Modelo de Datos

Tablas SQL Server del módulo **Capacitación**. Todas usan el prefijo
`CAPAC_*`. Las tablas de otros dominios (recursos, mensajería) **no** se
documentan aquí; solo aparecen como FK externas cuando una tabla de
Capacitación las referencia.

## DER (diagrama oficial)

![DER de Capacitación](/imgs/DER%20Capacitaci%C3%B3n.jpg)

> El esquema completo se encuentra en
> `public/imgs/DER Capacitación.jpg`. `RECURSO_EXTERNO` (cuando aparece)
> representa una FK lógica al dominio de Recursos; no es una tabla
> `CAPAC_*`.

## Propagación GET / UPDATE

Las tres APIs de Capacitación que ejecutan `GET` (`driver`, `curso`,
`plan/estudio`) propagan la lectura **a todo el dominio**: dentro de
Capacitación todo se conecta con todo y solo se corta al salir del
dominio (p. ej. `RECURSOS`). Los colores sobre las tablas en el
diagrama identifican qué API origina cada cadena de anidamiento.

![Propagación de GET en Capacitación](/imgs/DER%20GET.png)

En `UPDATE` (incluye `CREATE` y `DELETE`) sí hay disrupciones: cada
API **solo modifica su propio sub-dominio**. `Plan` no actualiza
tablas de `Curso` ni de `Driver`, y viceversa. Las equis rojas marcan
explícitamente las tablas que quedan **fuera** del mapa de
propagación de escritura de cada API.

![Propagación de UPDATE/CREATE/DELETE en Capacitación](/imgs/DER%20UPDATE.png)

> Regla derivada: una operación de escritura sobre una tabla que
> pertenezca a otro sub-dominio debe ejecutarse a través de su propia
> API. No se permite escribir en cascada cruzando fronteras de
> dominio aunque el GET sí lo lea anidado.

## Tablas

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
| auditoría | `IUSUARIOCRE`, `IAPPCRE`, `IPCRE`, `FHCRE` | Usuario / app / IP / fecha de creación. |

### `CAPAC_PLANES_ESTUDIO`

| Columna | Tipo | Notas |
| --- | --- | --- |
| `IPLANESTUDIO` (PK) | `varchar(255)` | |
| `NOMBRE` | `varchar(255)` | |
| `DESCRIPCIONPLAN` | `text` | |
| `TTDVISUALIZACION` | `varchar(50)` | `ARBOL`, `LINEAL`, … |
| `BGENERACERTIFICADOG` | `bit` | Si emite certificado. |
| `BACTIVO` | `int` | |
| auditoría | … | |

### `CAPAC_CURSOS_DE_PLANES_ESTUDIO`

| Columna | Tipo |
| --- | --- |
| `IPLANESTUDIO` (PK, FK) | `varchar(255)` |
| `ICURSO` (PK, FK) | `varchar(10)` |
| `BREQUERIDO` | `bit` |
| `QORDEN` | `int` |

### `CAPAC_CURSOS_PREREQUISITOS`

| Columna | Tipo |
| --- | --- |
| `IPLANESTUDIO` (PK) | `varchar(255)` |
| `ICURSO` (PK) | `varchar(10)` |
| `CURSOSICURSO` (PK) | `varchar(10)` — curso requerido |

### `CAPAC_DRIVERS`

| Columna | Tipo |
| --- | --- |
| `IDRIVER` (PK) | `smallint` |
| `NDRIVER` | `varchar(10)` |
| `DESCRIPCION` | `varchar(max)` |
| `QNIVELES` | `tinyint` |

### `CAPAC_ATRIBUTOS_X_DRIVERS`

| Columna | Tipo |
| --- | --- |
| `IDRIVER` (PK) | `smallint` |
| `IATRIBUTO` (PK) | `smallint` |
| `QNIVEL` | `tinyint` |
| `NATRIBUTO` | `varchar(50)` |
| `TDATRIBUTO` | `varchar(50)` |
| `BREQUERIDO` | `bit` |
| `JCONFIG` | `varchar(max)` (JSON) |

### `CAPAC_ATRIBUTOS_PLANES`

| Columna | Tipo |
| --- | --- |
| `IATRIBUTO` (PK) | `smallint` |
| `ICURSO` (PK) | `varchar(10)` |
| `IPLAN` (PK) | `varchar(100)` |
| `VALOR` | `varchar(max)` |

### `CAPAC_ESTRUCTURAS_CURSOS`

| Columna | Tipo |
| --- | --- |
| `ICURSO` (PK) | `varchar(10)` |
| `QNIVEL` (PK) | `tinyint` |
| `NNIVEL` | `varchar(250)` |

> **Nota helper**: en URLs el helper traduce `qnivel` → `inivel` para
> mantener coherencia con el patrón de PKs `i*`. El body sigue usando
> `qnivel`.

### `CAPAC_PLANES_CURSOS`

| Columna | Tipo |
| --- | --- |
| `IPLAN` (PK) | `varchar(100)` |
| `ICURSO` (PK) | `varchar(10)` |
| `ITEMA` | `varchar(25)` |
| `IRECURSO` | `bigint` (FK lógica — dominio externo) |
| `IPLANPADRE` | `varchar(100)` |
| `TITULO` | `varchar(255)` |

### `CAPAC_SEGURIDADES_CURSOS`

| Columna | Tipo |
| --- | --- |
| `ICURSO` (PK) | `varchar(10)` |
| `IPERMISO` (PK) | `varchar(25)` |

### `CAPAC_PERMISOS`

| Columna | Tipo |
| --- | --- |
| `IPERMISO` (PK) | `varchar(25)` |
| `NPERMISO` | `varchar(255)` |

### `CAPAC_TEMAS`

| Columna | Tipo |
| --- | --- |
| `ITEMA` (PK) | `varchar(25)` |
| `NTEMA` | `varchar(255)` |
| auditoría | `IUSUARIOCRE`, `APPCRE`, `IPCRE`, `FHCRE` |

## Reglas de integridad relevantes

- `CAPAC_CURSOS_DE_PLANES_ESTUDIO.IPLANESTUDIO` → `CAPAC_PLANES_ESTUDIO`.
- `CAPAC_CURSOS_DE_PLANES_ESTUDIO.ICURSO` → `CAPAC_CURSOS`.
- `CAPAC_PLANES_CURSOS.ICURSO` → `CAPAC_CURSOS`.
- `CAPAC_ATRIBUTOS_PLANES.ICURSO` / `.IPLAN` → cursos / planes.
- Borrado de un **Curso** debe cascar (lógicamente) en sus
  estructuras, atributos, planes-cursos y seguridades.

## DDL de referencia

Los siguientes fragmentos se leen **en vivo** desde
`doc/init_capacitacion.sql`; cualquier cambio en el script se refleja
inmediatamente al recargar.

### `CAPAC_DRIVERS`

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE TABLE CAPAC_DRIVERS\b" to="^\);" -->

### `CAPAC_CURSOS`

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE TABLE CAPAC_CURSOS\b" to="^\);" -->

### `CAPAC_PLANES_ESTUDIO`

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE TABLE CAPAC_PLANES_ESTUDIO\b" to="^\);" -->

### Tablas pivote (PKs compuestas)

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE TABLE CAPAC_CURSOS_DE_PLANES_ESTUDIO\b" to="^\);" -->

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE TABLE CAPAC_CURSOS_PREREQUISITOS\b" to="^\);" -->

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE TABLE CAPAC_PLANES_CURSOS\b" to="^\);" -->

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE TABLE CAPAC_ESTRUCTURAS_CURSOS\b" to="^\);" -->

### Secuencias

<!-- src path="doc/init_capacitacion.sql" lang="sql" from="^CREATE SEQUENCE CAPAC_SEQ_IDRIVER\b" to="^CREATE SEQUENCE CAPAC_SEQ_IHISTORIALPLANESTUDIO\b" -->
