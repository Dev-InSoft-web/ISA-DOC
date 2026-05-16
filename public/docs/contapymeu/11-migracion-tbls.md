---
title: Migración de tablas CAPAC_*_OLD → CAPAC_*
icon: mdi:database-import-outline
---

# Migración de tablas (`CAPAC_*_OLD` → `CAPAC_*`)

Migración por código de tablas `CAPAC_*_OLD` (origen Firebird importado) hacia tablas `CAPAC_*` (destino final) en SQL Server.

> El código vive en `doc/ISA-DOC/src/lib/migration/` (núcleo, DDL, drivers, estructuras, inspección, performance, SQL y verificación). Esta página documenta la operación.

## Características

- Descubre automáticamente tablas origen por patrón `CAPAC%_OLD`.
- Busca tabla destino removiendo sufijo `_OLD`.
- Analiza columnas origen/destino.
- Mapea por:
  - nombre exacto,
  - nombre normalizado (sin `_`, tildes, etc.),
  - fuzzy matching controlado.
- Aplica `TRY_CAST` al tipo de la columna destino.
- Permite reglas manuales por tabla en `manual-mappings.js`.
- Evita insertar columnas `IDENTITY`.
- En el `INSERT ... SELECT` añade `WHERE` para columnas destino **NOT NULL**: se omiten filas donde el valor sería `NULL` (dato nulo en origen o `TRY_CAST` inválido). Se registra cuántas filas se omitieron.
- Columnas destino **sin** equivalente en origen: si son **NULLABLE**, se omiten del `INSERT` (quedan en NULL). Si son **NOT NULL**, se rellenan con un valor "vacío" tipado (`''`, `0`, fecha mínima, etc.) vía `emptyPlaceholderExpression` en `sql-types.js`.
- Si el nombre destino no sale de quitar `_OLD` (p. ej. `CAPAC_SEGURIDADPORCURSO_OLD` → `CAPAC_SEGURIDADES_CURSOS`), define el par en `tableDestinationOverrides` dentro de `manual-mappings.js`.
- Si la tabla destino tiene **PK** y el `_OLD` trae filas duplicadas para esa clave, se aplica `ROW_NUMBER()` sobre las columnas PK para insertar solo una fila por clave.

### `CAPAC_PLANES_CURSOS` (desde `CAPAC_PLANDECURSO_OLD`)

- `IPLAN`: se convierte de códigos por tríos (p. ej. `001005` → `1.5`). Si un trío no es numérico (p. ej. `JJJ`), se conserva como texto en ese nivel.
- Tras el `INSERT`, se ejecuta un `UPDATE` que rellena `IPLANPADRE` a partir de la ruta con puntos (padre = quitar el último segmento).
- Para **vaciar y volver a cargar**: `npm run migrate -- --only CAPAC_PLANDECURSO_OLD --truncate`.

### DDL incremental (SQL Server)

Si la base ya existía antes de alinear `doc/init_capacitacion.sql` (auditoría en `CAPAC_CURSOS_DE_PLANES_ESTUDIO` y `TDATRIBUTO` en `CAPAC_ATRIBUTOS_X_DRIVERS`), ejecuta en SSMS o `sqlcmd`:

`alter-capac-ddl-2026.sql` (incluye `BGENERACERTIFICADO` en `CAPAC_CURSOS`, `TDATRIBUTO` en `CAPAC_ATRIBUTOS_X_DRIVERS`, actualización de `NATRIBUTO` a etiquetas legibles si aún hay mayúsculas/kebab, recálculo de `IPLANPADRE` en `CAPAC_PLANES_CURSOS`).

Luego: `npm run ddl:capac` (aplica el SQL) y, si aplica, `npm run analyze` / `npm run migrate`.

**Solo actualizar `NATRIBUTO`** (p. ej. kebab → texto UI) sin correr toda la DDL: `npm run ddl:capac-natributo` (usa `update-capac-atributos-x-drivers-natributo.sql` y `local.settings.json`).

### Reglas cerradas

- En cursos, `IRECURSO` se migra con el mismo valor de `IVIDEO`.
- En drivers, el nombre del driver se extrae desde `[DRIVERSTRUCT]`.
- Para cursos, los únicos drivers definidos son: `TRES_COLUMNAS`, `SEC_VIDEOS`, `SEC_RELACIONADOS`.
- Estos drivers manejan únicamente **2 niveles**.

## Uso

```bash
# Análisis (sin insertar)
npm run analyze

# Análisis de una sola tabla
npm run analyze -- --only CAPAC_CURSOS_OLD

# Migración real
npm run migrate

# Migración en seco (muestra SQL)
npm run migrate -- --dry-run

# Migración truncando destino antes de insertar
npm run migrate -- --truncate
```

## Credenciales / settings

Por defecto usa:

`ISS-ClientesIS-ContaPymeU/local.settings.json`

También puedes pasar otro archivo:

```bash
npm run analyze -- --settings "C:/ruta/local.settings.json"
```

## Reglas manuales

Edita `manual-mappings.js` cuando:

- una columna destino cambia mucho de nombre,
- necesitas una expresión SQL específica,
- deseas un valor fijo.

```js
export const manualMappings = {
  CAPAC_CURSOS: {
    ID_CURSO: "ID",
    FECHA_INICIO: "TRY_CONVERT(date, s.FEC_INI, 103)",
    OBSERVACION: "'Migrado desde OLD'"
  }
};
```

## Guía operativa de scripts

### Núcleo consolidado

#### `inspect-capac.mjs`
Inspector reutilizable para consultas de diagnóstico.

- Modos:
  - `--mode list-aplic-tables`: lista tablas `%APLIC%`.
  - `--mode columns --tables T1,T2`: imprime columnas y tipos.
  - `--mode sample-iplan --top N`: muestra `IPLAN/IPLANPADRE`.

#### `manage-estructuras.mjs`
Consolida operaciones sobre `CAPAC_ESTRUCTURAS_CURSOS`.

- Acciones: `--action check | drop | create-mirror | reseed-2levels`.

### Especializados

- `repair-capac-estructuras-cursos.mjs`: reconstrucción estructurada (`QNIVELES`).
- `diagnose-cursos-timeout.mjs`: diagnóstico DB + endpoint API.
- `optimize-capac-planes-cursos.mjs`: índices de rendimiento.
- `upsert-capac-drivers.mjs`: asegura catálogo base de drivers.
- `reset-capac-drivers.mjs`: reinicio destructivo de drivers.
- `link-drivers-cursos.mjs`: vincula `CAPAC_CURSOS.IDRIVER` desde `DRIVERSTRUCT`.
- `debug-iplan.mjs`: sondeo de cast/longitud de `IPLAN`.
- `alter-capac-ddl-2026.sql`: DDL incremental idempotente.

### Dónde modificar según caso

1. **Mapeo `_OLD → destino`** → `manual-mappings.js` (renombre, expresiones SQL por columna `CASE`/`TRY_CAST`, valores fijos).
2. **Jerarquía y sync post-migración** → `hierarchy-indices-sql.js` y bloque `CAPAC_PLANDECURSO_OLD → CAPAC_PLANES_CURSOS` en `index.js` (recalcular `IPLANPADRE`, upsert en `CAPAC_ATRIBUTOS_X_DRIVERS`, sync a `CAPAC_ATRIBUTOS_PLANES`).
3. **DDL** → `alter-capac-ddl-2026.sql` y `apply-capac-ddl.js` (`ADD/DROP COLUMN`, constraints, índices, defaults).
4. **Drivers base y enlace a cursos** → `upsert-capac-drivers.mjs` (idempotente), `reset-capac-drivers.mjs` (destructivo), `link-drivers-cursos.mjs` (matching por nombre).
5. **Estructuras de cursos** → `manage-estructuras.mjs` (acciones comunes), `repair-capac-estructuras-cursos.mjs` (reconstrucción completa).

### Flujos recomendados

**A) Ajuste de mapeo + prueba segura**

1. `npm run analyze -- --only <TABLA_OLD>`
2. Ajustar `manual-mappings.js`
3. `npm run migrate -- --only <TABLA_OLD> --dry-run`
4. `npm run migrate -- --only <TABLA_OLD>`

**B) Cambio de DDL + remigración**

1. Editar `alter-capac-ddl-2026.sql`
2. `npm run ddl:capac`
3. `npm run migrate -- --only CAPAC_PLANDECURSO_OLD`

**C) Problemas de estructura**

1. `node manage-estructuras.mjs --action check`
2. Si hace falta: `--action reseed-2levels` o `repair-capac-estructuras-cursos.mjs`.
