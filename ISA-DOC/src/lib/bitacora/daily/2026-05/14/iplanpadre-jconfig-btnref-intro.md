# JCONFIG · `iplanpadre` pasa de `text` a `btnref`

Actualiza el campo `JCONFIG` del atributo **`iplanpadre`** (`IATRIBUTO = 5`) en `CAPAC_ATRIBUTOS_X_DRIVERS` para los 3 drivers existentes (`IDRIVER ∈ {1, 2, 3}`).

## Motivación

Hasta el 2026-05-06 `iplanpadre` se modelaba como `text` `readonly` (derivado automáticamente del árbol de contenidos). El nuevo flujo de edición en Contenido del curso requiere que el usuario pueda **reasignar** un capítulo a un padre distinto, escogiendo entre los **hermanos del capítulo actual**.

Para esto se ajusta a `btnref` y se delega el filtrado a un controlador definido en código (ISW) que se identifica por nombre desde el JSON.

## Soporte actual de `Attr2Input` (`jconfig2FieldDef`)

`JCONFIG` ya soporta `btnref`:

- `type`: `"text" | "number" | "richeditor" | "selectEnum" | "btnref"` (default `text`).
- `controllername`: nombre del controlador registrado en código que provee `BtnRef.Controller` y, opcionalmente, `onSelectedRecord`.
- `descripcion`, `readonly`, `required`.
- `inputProps`: `placeholder`, `min`, `max`, `step`, `pattern`, `maxlength`, `minlength`, `autocomplete`, `inputmode`.

## Tabla resumen del cambio

| IATRIBUTO | NATRIBUTO  | type antes | type ahora | Notas |
| :-------: | :--------- | :--------- | :--------- | :---- |
| 5         | iplanpadre | `text` (readonly) | `btnref` | `controllername: "iplanpadre"` — el controlador filtra hermanos del capítulo actual. |

## Script

Idempotente: solo `UPDATE` sobre filas existentes filtradas por `IDRIVER IN (1, 2, 3)` y `IATRIBUTO = 5`. Termina con un `SELECT` de verificación.

## Dependencias en código (no incluido en este modificador)

- Registrar en el formulario consumidor un `Controllers["iplanpadre"]` (ICtxBtnRef) que liste los hermanos del capítulo actual filtrado por `flatPath`/`pathInit`.
- Inyectar `controllers` al `<Attr2Input>` del `Formulario.svelte` de TreeContenidos.
