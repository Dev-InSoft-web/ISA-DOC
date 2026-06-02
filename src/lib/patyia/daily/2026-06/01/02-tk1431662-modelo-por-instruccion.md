## TK-1431662 — Modelo IA por instrucción (MODELO)

- **Objetivo:** cada tipo de consulta (`SALUDO_OTRO`, `PASO_A_PASO`, …) define el modelo de **respuesta final** vía columna `MODELO` en `INSTRUCCION`.

- **Migración SQL (`add-modelo-instruccion.sql` / SSMS):**
  - Agrega columna `MODELO NVARCHAR(40)` si no existe (default `gpt-5-nano`).
  - Normaliza filas con valor vacío a `gpt-5-nano`.
  - Cierra con `SELECT` de verificación.

- **Calibración actual (13 tipos):** `update-instruccion-modelo-gpt5-nano.sql` pone **`gpt-5-nano`** en todas las filas del catálogo (sustituye calibración previa con `gpt-5-mini`).

- **Backend (PatyIA):**
  - `TInstruccion.GetModelo` lee `INSTRUCCION.MODELO` vía `TDCONSULTAXINSTRUCCION`.
  - Operativos (clasificador, premisas, título): `gpt-4.1-nano` en `system-prompts.json`.
  - Fallback respuesta si no hay modelo: `modeloConversacion` en `system-prompts.json` (`gpt-5-nano`).

---
