# Flujos · Obtener / Editar

Esta sección describe los dos flujos transversales más comunes del módulo
**Capacitación** y qué tablas tocan.

## Flujo · AL OBTENER (GET Curso)

![Diagrama del flujo GET](/imgs/DER%20GET.png)

| Tabla | Acción | Por qué |
| --- | --- | --- |
| `CAPAC_CURSOS` | `SELECT` | Encabezado del curso. |
| `CAPAC_TEMAS` | `SELECT` | Resolver `ITEMA`. |
| `CAPAC_DRIVERS` | `SELECT` | Resolver `IDRIVER`. |
| `CAPAC_ESTRUCTURAS_CURSOS` | `SELECT` | Niveles. |
| `CAPAC_SEGURIDADES_CURSOS` | `SELECT` | Permisos. |
| `CAPAC_PLANES_CURSOS` | `SELECT` | Cursos vinculados al plan. |
| `CAPAC_ATRIBUTOS_PLANES` | `SELECT` | Atributos del plan-curso. |

> El GET de curso **no consulta** dominios externos como recursos o
> mensajería. Si el cliente necesita el recurso vinculado al plan, debe
> llamar específicamente a `GET /api/curso/recursoplan/{icurso}`.

## Flujo · AL EDITAR (PUT Curso)

![Diagrama del flujo UPDATE](/imgs/DER%20UPDATE.png)

1. Inicia transacción.
2. `UPDATE CAPAC_CURSOS` (encabezado).
3. **Diff & sync** las colecciones hijas si vienen en el body:
   - `CAPAC_ESTRUCTURAS_CURSOS` — borra los niveles eliminados, inserta los
     nuevos, actualiza los modificados.
   - `CAPAC_SEGURIDADES_CURSOS` — sincroniza permisos.
   - `CAPAC_ATRIBUTOS_PLANES` — sincroniza atributos.
4. **No toca**:
   - `CAPAC_TEMAS`, `CAPAC_DRIVERS` (catálogos maestros, se editan por su
     propio endpoint).
   - Tablas de dominios externos (recursos, mensajería).
5. Commit / rollback.

## Recodificar vs Actualizar

- `Actualizar` (`PUT /:pk`) — modifica datos sin cambiar el PK.
- `Recodificar` (`PUT /recodificar/:pk` con `nuevo_*`) — cambia el PK y
  cascada los FKs en todas las tablas que referencian al curso/plan/etc.

## Eliminar

`DELETE /api/curso/{icurso}`:

1. Verifica que no existan dependencias bloqueantes.
2. Borra primero hijos
   (`SEGURIDADES`, `ESTRUCTURAS`, `ATRIBUTOS`, `PLANES_CURSOS` con ese
   curso) y finalmente la fila en `CAPAC_CURSOS`.
3. Devuelve `204 No Content`.

## Verificar

`GET /api/curso/verificar/{icurso}` devuelve si la PK existe, útil para
validaciones del formulario antes de submit.

## Implementación · `Get_Recurso_PlanCurso`

El endpoint custom resuelve el curso con sus planes, y dentro de cada
plan **fusiona** atributos del recurso con atributos del plan,
removiendo los nodos vacíos para no enviar payload basura.

<!-- src path="ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/02_Cursos.ts" lang="typescript" symbol="Get_Recurso_PlanCurso" -->

## Implementación · sincronización de hijas (PUT)

`TCapacitacionServer` define dos primitivas: `deepPromiseInsertQry`
borra-y-reinsertan en bloque las hijas, y `syncDetails` orquesta varias
controladoras hijas en paralelo dentro de la misma transacción.

<!-- src path="ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/00_Base.ts" lang="typescript" symbol="deepPromiseInsertQry" -->

<!-- src path="ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/01_PlanDeEstudio.ts" lang="typescript" from="^export class TPlanEstudioServer\b" to="^}" -->

## Implementación · anidamiento SQL (consulta del Curso)

`nestedConfig` declara qué hijos se anidan en cada SELECT. El helper
`sqlNesting` genera subconsultas con `FOR JSON` para devolver el árbol
completo en un solo round-trip.

<!-- src path="ISP-CLientesISServer/src/sources/6.ContaPymeU/2.Capacitacion/02_Cursos.ts" lang="typescript" from="nestedConfig\(JData: iInfoCurso\)" to="^\t}" -->
