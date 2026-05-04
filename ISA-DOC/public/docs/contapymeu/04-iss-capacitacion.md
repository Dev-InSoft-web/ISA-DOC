# ISS · Capacitación

Endpoints generados por `FN-Capacitacion.ts`. Cada entidad expone los 9
endpoints CRUD descritos en el [overview](#03-iss-overview), salvo los
`omitir` indicados.

## Mapa de entidades

El mapa oficial de relaciones está en el DER actualizado a mano
(`public/imgs/DER Capacitación.jpg`). Para los flujos de propagación
ver [Modelo de Datos → Propagación GET / UPDATE](./02-modelo-datos.md#propagaci%C3%B3n-get--update).

![DER de Capacitación](/imgs/DER%20Capacitaci%C3%B3n.jpg)

## Curso (`curso` / `cursos`)

- **Tabla**: `CAPAC_CURSOS`
- **PK**: `ICURSO`
- **Endpoints**: 9 estándar + 1 custom.

| Acción | Método | Ruta |
| --- | --- | --- |
| Listar | GET | `/api/cursos/{filtro}` |
| Obtener | GET | `/api/curso/{icurso}` |
| Verificar | GET | `/api/curso/verificar/{icurso}` |
| Crear | POST | `/api/curso` |
| Duplicar | POST | `/api/curso/duplicar/{icurso}` |
| Actualizar | PUT | `/api/curso/{icurso}` |
| Recodificar | PUT | `/api/curso/recodificar/{icurso}` |
| Consolidar | PUT | `/api/curso/consolidar/{icurso}` |
| Eliminar | DELETE | `/api/curso/{icurso}` |
| **Custom** | GET | `/api/curso/recursoplan/{icurso}` — lee el recurso (dominio externo) asociado al plan del curso. |

**Body de ejemplo** (Crear / Actualizar):

```json
{
  "icurso": "CURSO001",
  "ncurso": "Curso de ejemplo",
  "itema": "TEMA001",
  "idriver": "DRIVER001",
  "descripcion": "Descripción del curso",
  "bactivo": 1
}
```

## Plan de Estudio (`plan/estudio` / `planes/estudio`)

- **Tabla**: `CAPAC_PLANES_ESTUDIO`
- **PK**: `IPLANESTUDIO`

| Acción | Método | Ruta |
| --- | --- | --- |
| Listar | GET | `/api/planes/estudio/{filtro}` |
| Obtener | GET | `/api/plan/estudio/{iplanestudio}` |
| Verificar | GET | `/api/plan/estudio/verificar/{iplanestudio}` |
| Crear | POST | `/api/plan/estudio` |
| Duplicar | POST | `/api/plan/estudio/duplicar/{iplanestudio}` |
| Actualizar | PUT | `/api/plan/estudio/{iplanestudio}` |
| Recodificar | PUT | `/api/plan/estudio/recodificar/{iplanestudio}` |
| Consolidar | PUT | `/api/plan/estudio/consolidar/{iplanestudio}` |
| Eliminar | DELETE | `/api/plan/estudio/{iplanestudio}` |

**Body de ejemplo**:

```json
{
  "iplanestudio": "PLANESTUDIO001",
  "nombre": "Plan de Estudio Ejemplo",
  "descripcionplan": "Descripción del plan",
  "ttdvisualizacion": "ARBOL",
  "bgeneracertificadog": false,
  "bactivo": 1
}
```

## Driver (`driver` / `drivers`)

- **Tabla**: `CAPAC_DRIVERS`
- **PK**: `IDRIVER` (`smallint`)

CRUD estándar bajo `/api/driver`, listado en `/api/drivers/{filtro}`.

```json
{
  "idriver": "DRIVER001",
  "ndriver": "Driver Ejemplo",
  "descripcion": "Descripción",
  "qniveles": 3
}
```

## Permiso (`permiso` / `permisos`)

- **Tabla**: `CAPAC_PERMISOS`
- **PK**: `IPERMISO`
- **Omitir**: `Duplicar`

```json
{ "ipermiso": "PERMISO001", "npermiso": "Permiso Ejemplo" }
```

## Plan-Curso (`plan/curso` / `plan/cursos`)

- **Tabla**: `CAPAC_PLANES_CURSOS`
- **PK**: `IPLAN`, `ICURSO` (compuesta)

| Acción | Método | Ruta |
| --- | --- | --- |
| Listar | GET | `/api/plan/cursos/{filtro}` |
| Obtener | GET | `/api/plan/curso/{iplan}/{icurso}` |
| Crear | POST | `/api/plan/curso` |
| Actualizar | PUT | `/api/plan/curso/{iplan}/{icurso}` |
| … | … | … |

```json
{
  "iplan": "PLAN001",
  "icurso": "CURSO001",
  "itema": "TEMA001",
  "iplanpadre": "PLANPADRE001",
  "titulo": "Título de ejemplo"
}
```

## Curso de Plan de Estudio (`plan/estudio/curso` / `plan/estudio/cursos`)

- **Tabla**: `CAPAC_CURSOS_DE_PLANES_ESTUDIO`
- **PK**: `IPLANESTUDIO`, `ICURSO`

```json
{
  "iplanestudio": "PLANESTUDIO001",
  "icurso": "CURSO001",
  "brequerido": true,
  "qorden": 1
}
```

## Curso Prerrequisito (`curso/prerequisito` / `curso/prerequisitos`)

- **Tabla**: `CAPAC_CURSOS_PREREQUISITOS`
- **PK**: `ICURSO`, `ICURSOREQUERIDO`, `IPLANESTUDIO`

```json
{
  "icurso": "CURSO001",
  "icursorequerido": "CURSOREQ001",
  "iplanestudio": "PLANESTUDIO001"
}
```

## Atributos Plan (`plan/estudio/atributo` / `plan/estudio/atributos`)

- **Tabla**: `CAPAC_ATRIBUTOS_PLANES`
- **PK declarada**: `IPLAN`, `IATRIBUTO`, `ICURSO` (3) — el helper traduce a
  rutas con 2 PKs visibles, pero el body sigue requiriendo los 3.

## Seguridad de Curso (`curso/seguridad`)

- **Tabla**: `CAPAC_SEGURIDADES_CURSOS`
- **PK**: `ICURSO`, `IPERMISO`

## Atributos por Driver (`driver/atributo`)

- **Tabla**: `CAPAC_ATRIBUTOS_X_DRIVERS`
- **PK**: `IDRIVER`, `IATRIBUTO`

## Estructura del Curso (`curso/estructura` / `curso/estructuras`)

- **Tabla**: `CAPAC_ESTRUCTURAS_CURSOS`
- **PK**: `ICURSO`, `QNIVEL` — el helper traduce `qnivel` a `inivel` en la URL
  para mantener el formato `i*`. El body sigue usando `qnivel`.

```json
{ "icurso": "CURSO001", "qnivel": 1, "nnivel": "Nivel 1" }
```

## Acciones especiales

- **Duplicar**: clona la entidad creando un nuevo PK.
- **Recodificar**: cambia el PK existente. Se acompaña de campos `nuevo_*`.
- **Consolidar**: confirma cambios pendientes (lógica del controlador).

## Errores frecuentes

- `400` — falta de campos requeridos en el body.
- `401` — token ausente / inválido.
- `404` — registro no encontrado.
- `409` — violación de unicidad (PK duplicada).
- `500` — error de BD (revisar logs en App Insights).
