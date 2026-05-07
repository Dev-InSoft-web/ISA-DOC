# ISW / ISP ClientesIS

## ISW-ClientesIS · TreeContenidos · Formulario.svelte
- Resuelto error en runtime **`Cyclical dependency detected: currentPath → frmObj → currentPath`** (https://svelte.dev/e/reactive_declaration_cycle).
  - Causa: `$: currentPath = ...` dependía de `frmObj`, mientras tres `$:` adicionales reasignaban `frmObj = frmObj` dentro de autofill / herencia de `itema` / autofill de `titulo` → ciclo en el grafo reactivo de Svelte.
  - Fix: `currentPath` pasó de `$:` a `let`. Toda la lógica derivada (recalcular `attrEntries`, herencia de `itema` desde el padre, autofill de `titulo` desde `recurso.nrecurso`) se consolidó en una única función `applyFrmObj(obj)` invocada por `$: applyFrmObj(frmObj)`.
  - Guarda por referencia (`_lastFrmObjRef` + path) para corto-circuitar re-ejecuciones disparadas por reasignaciones desde handlers (`ontemaselected`, `onrecurseselected`).
- Ajuste de inicialización de `objRow` en `TPlanCursoNode` para mantener integridad de los nodos cuando se reciben datos parciales.

## ISW-ClientesIS · Plan de Estudio · ListCursosDePlan.svelte
- Drawer de creación de relación Plan ↔ Curso reescrito:
  - **Bug raíz**: el formulario quedaba vacío porque `<BtnRef bind:value={Item.icurso}>` y `<InputNumber bind:value={Item.qorden}>` accedían a `Item` aún `undefined` (la `use:syncItem` corre tras el primer render → crash silencioso).
  - Fix: bindings del slot ahora usan directamente el `Obj` del slot (renombrado a `co` vía `{@const co = frmObj as TCursoDePlanDeEstudio}` para conservar el tipo concreto y permitir `bind:value={co.icurso}`).
- **Auto-open en `create`**: nueva action `self.autoOpenBtnRef` sobre el wrapper del BtnRef. Si `itdForm === "create"` y `co.icurso` está vacío, dispara `click()` en `:scope button[aria-label="Open BtnRef"]` mediante `queueMicrotask`. Bandera `_autoOpenedFor` por referencia para no re-disparar.
- **Detalles readonly del curso seleccionado**:
  - Inputs readonly: Nombre, Descripción, Tema (`curso.tema.ntema`), Driver (`curso.driver.ndriver`), Recursos, Duración.
  - `Switch` disabled: Curso activo, Genera certificado.
  - `InputNumber` Orden en el plan + sub-sección de Prerrequisitos solo cuando ya hay curso seleccionado.
- **Bug "carga el nombre pero no setea el id"** (mismo patrón histórico en `ListSeguridad.svelte` con permisos): `bind:value` a expresión casteada `(frmObj as ...).icurso` no actúa como setter bidireccional. Solución replicada del patrón existente:
  - Asignación explícita de la PK en el callback (`co.icurso = record.icurso`).
  - Reasignación de la entidad anidada (`co.curso = record`).
  - Trigger de refresco con contador `refresh++` y `{#key refresh}` para forzar remontaje del subárbol.
  - Adicionalmente se eliminó el cast inline al introducir `{@const co}`, evitando reproducir el problema.
- Controlador slave: se reutiliza `TCursosDePlanDeEstudioControllerSlave` (`APIPivotController(TCursoController)` con `isysrecurso="PlanDeEstudio"`) que además filtra cursos ya asignados al plan en su `Lista()`.

## ISP-ClientesIS
- `b36872c` — Nueva ruta para obtener plan de estudio con detalle, lista para ser consumida por la UI (alimenta los detalles readonly del curso en el drawer Plan ↔ Curso).
- `1884bee` — Bump de paquete a **1.0.162**.
