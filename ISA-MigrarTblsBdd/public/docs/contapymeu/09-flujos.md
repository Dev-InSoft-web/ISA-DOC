# Flujos · Obtener / Editar

Esta sección describe los dos flujos transversales más comunes y qué
tablas tocan.

## Flujo · AL OBTENER (GET)

Cuando el frontend solicita un **Curso** completo (`/api/curso/{icurso}`),
el servicio compone la respuesta tocando:

| Tabla | Acción | Por qué |
| --- | --- | --- |
| `CAPAC_CURSOS` | `SELECT` | Encabezado del curso. |
| `CAPAC_TEMAS` | `SELECT` | Resolver `ITEMA`. |
| `CAPAC_DRIVERS` | `SELECT` | Resolver `IDRIVER`. |
| `CAPAC_ESTRUCTURAS_CURSOS` | `SELECT` | Niveles. |
| `CAPAC_SEGURIDADES_CURSOS` | `SELECT` | Permisos. |
| `CAPAC_PLANES_CURSOS` | `SELECT` | Recursos vinculados. |
| `CAPAC_ATRIBUTOS_PLANES` | `SELECT` | Atributos del plan-curso. |

> Las tablas de **mensajes**, **calificaciones** y **movimientos de
> contacto** **NO** se consultan en GET de curso (solo en sus endpoints
> dedicados).

Diagrama de referencia: `public/imgs/DER GET.png`.

## Flujo · AL EDITAR (PUT)

Al editar un **Curso** (`PUT /api/curso/{icurso}` con body completo), el
servicio:

1. Inicia transacción.
2. **Actualiza** `CAPAC_CURSOS` (encabezado).
3. **Diff & sync** las colecciones hijas si vienen en el body:
   - `CAPAC_ESTRUCTURAS_CURSOS` — borra los niveles eliminados, inserta los
     nuevos, actualiza los modificados.
   - `CAPAC_SEGURIDADES_CURSOS` — sincroniza permisos.
   - `CAPAC_ATRIBUTOS_PLANES` — sincroniza atributos.
4. **No toca**:
   - `CAPAC_TEMAS`, `CAPAC_DRIVERS` (catálogos maestros, se editan por su
     propio endpoint).
   - `CAPAC_RECURSOS` y derivados (mensajes / calificaciones).
5. Commit / rollback.

Diagrama de referencia: `public/imgs/DER UPDATE.png`.

## Recodificar vs Actualizar

- `Actualizar` (`PUT /:pk`) — modifica datos sin cambiar el PK.
- `Recodificar` (`PUT /recodificar/:pk` con `nuevo_*`) — cambia el PK y
  cascada los FKs en todas las tablas que referencian al curso/plan/etc.

## Eliminar

`DELETE /api/curso/{icurso}`:

1. Verifica que no existan dependencias bloqueantes (planes activos,
   recursos vinculados).
2. Si pasa la verificación: borra primero hijos
   (`SEGURIDADES`, `ESTRUCTURAS`, `ATRIBUTOS`, `PLANES_CURSOS` con ese
   curso) y finalmente la fila en `CAPAC_CURSOS`.
3. Devuelve `204 No Content`.

## Verificar

`GET /api/curso/verificar/{icurso}` devuelve si la PK existe, útil para
validaciones del formulario antes de submit.
