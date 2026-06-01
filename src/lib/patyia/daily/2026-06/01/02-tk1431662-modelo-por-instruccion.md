## TK-1431662 — Modelo IA por instrucción (MODELO)

- **Objetivo:** dejar de depender de `OPENAI_MODEL` en variables de entorno. Cada fila del catálogo real (`SALUDO_OTRO`, `PASO_A_PASO`, etc.) define el modelo de **respuesta final** vía `MODELO`.

- **Migración SQL (`add-modelo-instruccion.sql`):**
  - Agrega columna `MODELO NVARCHAR(40) NOT NULL DEFAULT 'gpt-5-mini'`.
  - Renombra `NMODELOIA` → `MODELO` si ya se ejecutó una versión anterior del script.
  - Normaliza filas con valor vacío a `gpt-5-mini`.
  - **No inserta filas nuevas** — solo las 13 que ya existen en `INSTRUCCION`.
  - Cierra con `SELECT` de verificación.

- **Backend (ISS-AyudasCPIA / PatyIA):**
  - `TInstruccion.modelo` + `TInstruccionController.GetModelo`.
  - **Respuesta final:** modelo de la instrucción ligada al `tipo_consulta` clasificado (`TDCONSULTAXINSTRUCCION` → `INSTRUCCION.MODELO`).
  - **Flujos operativos** (clasificador, extractor, módulo, título, resumen): `modeloOperativo` en `system-prompts.json` (`gpt-4.1-nano`).
  - **Premisas:** modelo en `system-prompts.json` → `generarPremisasInput.modelo`.
  - Fallback respuesta: `DEFAULT_MODELO_IA = 'gpt-5-mini'`.
  - Se elimina `OPENAI_MODEL` de `local.settings.json`.

- **Calibración manual:** ajustar `MODELO` en las 13 filas de tipo de consulta sin redeploy.

---
