# JCONFIG · Atributos de los drivers de Capacitación

Completa el campo `JCONFIG` en `CAPAC_ATRIBUTOS_X_DRIVERS` para los 3 drivers existentes (`IDRIVER` ∈ {1, 2, 3}), que comparten los mismos 6 atributos.

`JCONFIG` lo interpreta `AtributoInput.svelte` (ISW) y soporta:

- `type`: `"text" | "number" | "richeditor" | "selectEnum"` (default `text`).
- `options`: `string[] | Record<string, string>` (solo para `selectEnum`).
- `descripcion`, `readonly`, `required`.
- `inputProps`: `placeholder`, `min`, `max`, `step`, `pattern`, `maxlength`, `minlength`, `autocomplete`, `inputmode`.

| IATRIBUTO | NATRIBUTO           | type         | Notas                                                  |
| :-------: | :------------------ | :----------- | :----------------------------------------------------- |
| 1         | URL diapositivas    | `text`       | URL pública, `maxlength=500`                           |
| 2         | Imagen del profesor | `text`       | URL pública, `maxlength=500`                           |
| 3         | Driver de video     | `text`       | Identificador del componente Svelte que procesa los datos (no es servicio externo), `maxlength=50` |
| 4         | Dificultad          | `selectEnum` | `{B:"Básico", M:"Medio", A:"Avanzado"}`                |
| 5         | iplanpadre          | `text`       | `readonly:true` — derivado del árbol                   |
| 6         | Documento           | `text`       | URL pública, `maxlength=500`                           |

Script idempotente: solo `UPDATE` sobre filas existentes filtradas por `IDRIVER IN (1, 2, 3)` y `IATRIBUTO`. Termina con un `SELECT` de verificación.
