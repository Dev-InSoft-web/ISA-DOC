# QA en Producción — Verificación de PQRs

**Fecha**: $(Get-Date)
**Entorno**: https://clientesis.azurewebsites.net/
**Método**: análisis estático de bundles JS desplegados (no fue posible login automatizado: las opciones de auth son Facebook / Google+ / Microsoft / InSoft y no hay credenciales disponibles para el agente).

---

## Resumen ejecutivo

| PQR | Descripción | Evidencia en bundles prod | Estado |
|---|---|---|---|
| **1426681** | Acciones Duplicar/Recodificar/Verificar/Consolidar en Cursos y Planes de Estudio | Rutas `/consolidar`, `/verificar`, `/duplicar`, `/recodificar` (×16 c/u) en `stores.*.js` | ✅ Desplegado |
| **1426728** | Título vacío al agregar nodo de contenido | `_Recurso.*.js` hace `nrecurso: titulo` defensivo | ✅ Desplegado (no replicable; fix preventivo) |
| **1426893** | Requisitos: selector no asocia / falta validación mínimo 2 cursos | `Formulario.B7HO9Rip.js`: literal exacto "Se requieren al menos 2 cursos integrados…", ids `cp-prereq-*`, función `validatePrerequisites`, limpieza de huérfanos con `filter(...icurso !== ...)` | ✅ Desplegado |
| **1428161** | Columnas guardadas compartidas entre catálogos | `ClientesIS_Recursos.*.js`: claves por clase `${keyClass}_COLUMNASVISIBLES`, `${keyClass}_DATOSFILTRO`, `${keyClass}_ORDEN` (singleton por catálogo) | ✅ Desplegado |

**Conclusión**: las 4 correcciones están presentes en los assets de producción.

---

## Detalle por PQR

### TK-1426681 — Acciones Duplicar / Recodificar / Verificar / Consolidar

**Evidencia (`stores.CDvh72yi.js`)**:
- 16 ocurrencias de cada ruta: `/consolidar`, `/verificar`, `/duplicar`, `/recodificar`.
- Confirma que las declaraciones cliente para esas acciones (en los clients de Curso y PlanEstudio) se compilaron y están live.
- En `Formulario.B7HO9Rip.js` y `PlanDeEstudio.DsgQsXuY.js`: aparecen `val2Str`/`val2Int` (helpers de tipado del fix de auditoría) cubriendo tanto cursos como planes.

**QA manual recomendado (cuando esté logueado)**:
1. En `/capacitacion/cursos` → seleccionar fila → **Acciones**:
   - `Verificar` → no debe lanzar 4xx/5xx.
   - `Duplicar` → debe crear copia.
   - `Recodificar` → debe permitir cambiar código.
   - `Consolidar` → debe finalizar OK.
2. Repetir en `/capacitacion/planes/estudio`.

---

### TK-1426728 — Título vacío al agregar nodo contenido

**Evidencia (`_Recurso.DO96-nJf.js`)**:
```js
Te = Oe(()=> (i(X), A(()=> i(X).titulo
   ? Object.assign(i(X), { nrecurso: i(X).titulo })
   : i(X))));
```
- Reactividad defensiva: si el recurso tiene `titulo` pero no `nrecurso`, se rellena. Coincide con "Reactividad árbol contenido optimizada preventivamente" del ticket.

**Nota**: el ticket marca "NO REPLICADO". No hay forma directa de verificar el bug original; sólo se valida que el código defensivo está en prod.

**QA manual recomendado**:
1. Crear curso desde cero (no existente).
2. Pestaña **Contenido** → agregar capítulo → agregar nodo hijo.
3. Verificar que el campo **Título** se hidrata cuando hay recurso asociado.

---

### TK-1426893 — Catálogo cursos en Plan/Requisitos no asocia

**Evidencia (`Formulario.B7HO9Rip.js`)**:
- Literal exacto del alert:
  ```
  Se requieren al menos 2 cursos integrados y al menos uno con orden mayor a 0
  (los cursos con orden 0 son punto de entrada...
  ```
- IDs Svelte: `cp-prereq-tab`, `cp-alert-prereq`, `cp-prereq-grid`, `cp-prereq-form`, `cp-btn-prereq`.
- Función `validatePrerequisites(a, t)` (presente).
- Limpieza local de huérfanos:
  ```js
  t.prerrequisitos.filter(M => M.icurso !== a.icurso)
  ```
- Detección de huérfanos en submit:
  ```js
  if (c().prerrequisitos?.length && c().cursosdeplanestudio) {
     const l = new Set(c().cursosdeplanestudio)...
  }
  ```

**QA manual recomendado**:
1. Plan con `< 2` cursos integrados con orden > 0 → pestaña **Requisitos** → botón **Crear** deshabilitado + alert "No aplica" + texto explicativo del mínimo.
2. Plan con `≥ 2` cursos válidos → selector se puebla; asociar requisito → submit → verificar persistencia.
3. Eliminar curso integrado que tenía prerrequisitos → los huérfanos deben limpiarse al recargar el form.

---

### TK-1428161 — Columnas compartidas entre catálogos

**Evidencia (`ClientesIS_Recursos.CESPbkwq.js`)**:
```js
localStorage.setItem(`${this.keyClass}_COLUMNASVISIBLES`, s.val2Str(e))
localStorage.getItem(`${this.keyClass}_COLUMNASVISIBLES`)
localStorage.setItem(`${this.keyClass}_DATOSFILTRO`, ...)
localStorage.setItem(`${this.keyClass}_ORDEN`, ...)
```
- Claves segmentadas por `keyClass`: cada catálogo (Cursos vs PlanEstudio vs Recursos…) tiene su propio espacio en `localStorage`, por lo que las columnas, filtro y orden no se cruzan.
- Patrón singleton helper consistente con la descripción del ticket.

**QA manual recomendado**:
1. Abrir catálogo **Cursos** → ocultar/mostrar columnas → recargar página → verificar persistencia.
2. Abrir catálogo **Planes de Estudio** → verificar que tiene su propia configuración (NO refleja la de Cursos).
3. (DevTools → Application → Local Storage) inspeccionar claves: deben existir entradas tipo `<NombreCatalogo>_COLUMNASVISIBLES` independientes por catálogo.

---

## Bug #4 (Cursos integrados — Crear lanza `null.refesh`)

⚠️ **No verificable en prod**: el fix (`setTimeout(() => Obj = Obj, 0)` en `CtlgoCursosDePlan.svelte`) se aplicó localmente en esta sesión pero **NO se ha pusheado / desplegado**. En los bundles prod aún aparecen 3 referencias a `refesh` y 4 a `refreshGrid` (provienen de `ISP-SvelteComponents`).

Acción pendiente del usuario:
1. Revisar el cambio en `ISW-ClientesIS` (commit sugerido: `fix(plandeestudio-cursos): se difiere reasignación reactiva para evitar grid nulo tras crear curso integrado`).
2. Publicar y desplegar.
3. Repetir QA: en plan de estudio → pestaña **Cursos integrados** → **Crear** un nuevo curso desde el catálogo → no debe lanzar `Cannot read properties of null (reading 'refesh')`.

---

## Limitaciones del QA automatizado

- Las 4 opciones de login del portal prod (Facebook / Google+ / Microsoft / cuenta InSoft) requieren credenciales reales.
- No hay sesión persistida ni token JWT almacenado accesible al agente.
- La validación se basó en análisis estático de bundles compilados (assets `_astro/*.js`).
- Para validación funcional end-to-end en prod, el usuario debe ejecutar los pasos manuales listados arriba.

## Verificación local como referencia cruzada (opcional)

El servidor de desarrollo `http://localhost:4321` está corriendo con la misma rama (más el fix de Bug #4 ya aplicado). El usuario puede repetir los QA manuales ahí y obtendrá los mismos comportamientos esperados que en prod.
