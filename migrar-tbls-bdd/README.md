# migrar-tbls-bdd

Migracion por codigo de tablas `CAPAC_*_OLD` (origen Firebird importado) hacia tablas `CAPAC_*` (destino final) en SQL Server.

## Caracteristicas

- Descubre automaticamente tablas origen por patron `CAPAC%_OLD`.
- Busca tabla destino removiendo sufijo `_OLD`.
- Analiza columnas origen/destino.
- Mapea por:
  - nombre exacto,
  - nombre normalizado (sin `_`, tildes, etc.),
  - fuzzy matching controlado.
- Aplica `TRY_CAST` al tipo de la columna destino.
- Permite reglas manuales por tabla en `src/manual-mappings.js`.
- Evita insertar columnas `IDENTITY`.
- En el `INSERT ... SELECT` añade `WHERE` para columnas destino **NOT NULL**: se omiten filas donde el valor sería `NULL` (dato nulo en origen o `TRY_CAST` inválido). Se registra cuántas filas se omitieron.
- Columnas destino **sin** equivalente en origen: si son **NULLABLE**, se omiten del `INSERT` (quedan en NULL). Si son **NOT NULL**, se rellenan con un valor “vacío” tipado (`''`, `0`, fecha mínima, etc.) vía `emptyPlaceholderExpression` en `sql-types.js`.
- Si el nombre destino no sale de quitar `_OLD` (p. ej. `CAPAC_SEGURIDADPORCURSO_OLD` → `CAPAC_SEGURIDADES_CURSOS`), define el par en `tableDestinationOverrides` dentro de `manual-mappings.js`.
- Si la tabla destino tiene **PK** y el `_OLD` trae filas duplicadas para esa clave, se aplica `ROW_NUMBER()` sobre las columnas PK para insertar solo una fila por clave.

### `CAPAC_PLANES_CURSOS` (desde `CAPAC_PLANDECURSO_OLD`)

- `IPLAN`: se convierte de códigos por tríos (p. ej. `001005` → `1.5`). Si un trío no es numérico (p. ej. `JJJ`), se conserva como texto en ese nivel.
- Tras el `INSERT`, se ejecuta un `UPDATE` que rellena `IPLANPADRE` a partir de la ruta con puntos (padre = quitar el último segmento).
- Para **vaciar y volver a cargar**: `npm run migrate -- --only CAPAC_PLANDECURSO_OLD --truncate`

### DDL incremental (SQL Server)

Si la base ya existía antes de alinear `doc/init_capacitacion.sql` (auditoría en `CAPAC_CURSOS_DE_PLANES_ESTUDIO` y `TDATRIBUTO` en `CAPAC_ATRIBUTOS_X_DRIVERS`), ejecuta en SSMS o `sqlcmd`:

`script/alter-capac-ddl-2026.sql`

Luego vuelve a correr `npm run analyze` / `npm run migrate` si aplica.

### Reglas cerradas (actualización)

- En cursos, `IRECURSO` se migra con el mismo valor de `IVIDEO`.
- En drivers, el nombre del driver se extrae desde `[DRIVERSTRUCT]`.
- Para cursos, los únicos drivers definidos son:
  - `TRES_COLUMNAS`
  - `SEC_VIDEOS`
  - `SEC_RELACIONADOS`
- Estos drivers manejan únicamente **2 niveles**.
- La fuente exacta para “cantidad de niveles” aún está por definir; por ahora se aplica la regla fija de 2 niveles para los 3 drivers listados.

## Instalacion

```bash
npm install
```

## Uso

Analisis (sin insertar):

```bash
npm run analyze
```

Analisis de una sola tabla:

```bash
npm run analyze -- --only CAPAC_CURSOS_OLD
```

Migracion real:

```bash
npm run migrate
```

Migracion en seco (muestra SQL):

```bash
npm run migrate -- --dry-run
```

Migracion truncando destino antes de insertar:

```bash
npm run migrate -- --truncate
```

## Credenciales / settings

Por defecto usa:

`c:/Users/JAGUDELOE/Documents/Contapyme/ClientesIS/ISS-ClientesIS-ContaPymeU/local.settings.json`

Tambien puedes pasar otro archivo:

```bash
npm run analyze -- --settings "C:/ruta/local.settings.json"
```

## Reglas manuales

Edita `src/manual-mappings.js` cuando:

- una columna destino cambia mucho de nombre,
- necesitas una expresion SQL especifica,
- deseas un valor fijo.

Ejemplo:

```js
export const manualMappings = {
  CAPAC_CURSOS: {
    ID_CURSO: "ID",
    FECHA_INICIO: "TRY_CONVERT(date, s.FEC_INI, 103)",
    OBSERVACION: "'Migrado desde OLD'"
  }
};
```

## Guía operativa de scripts (`script/`)

Esta sección consolida la guía de mantenimiento que antes estaba en `script/README.md`.

### Scripts consolidados (núcleo)

#### `script/inspect-capac.mjs`
Inspector reutilizable para consultas de diagnóstico.

- Modos:
  - `--mode list-aplic-tables`: lista tablas `%APLIC%`.
  - `--mode columns --tables T1,T2`: imprime columnas y tipos.
  - `--mode sample-iplan --top N`: muestra `IPLAN/IPLANPADRE`.
- Wrappers legacy que delegan aquí:
  - `script/list-aplic-tables.mjs`
  - `script/list-cols-planes-cursos.mjs`
  - `script/list-cols-seguridad.mjs`
  - `script/verify-dotted-iplan.mjs`

#### `script/manage-estructuras.mjs`
Consolida operaciones sobre `CAPAC_ESTRUCTURAS_CURSOS`.

- Acciones:
  - `--action check`
  - `--action drop`
  - `--action create-mirror`
  - `--action reseed-2levels`
- Wrappers legacy que delegan aquí:
  - `script/check-estructuras.mjs`
  - `script/drop-estructuras-cursos.mjs`
  - `script/create-espejo-estructuras-cursos.mjs`
  - `script/reseed-estructuras-2niveles.mjs`

### Scripts especializados (no consolidados)

- `script/repair-capac-estructuras-cursos.mjs`: reconstrucción estructurada (`QNIVELES`).
- `script/diagnose-cursos-timeout.mjs`: diagnóstico DB + endpoint API.
- `script/optimize-capac-planes-cursos.mjs`: índices de rendimiento.
- `script/upsert-capac-drivers.mjs`: asegura catálogo base de drivers.
- `script/reset-capac-drivers.mjs`: reinicio destructivo de drivers.
- `script/link-drivers-cursos.mjs`: vincula `CAPAC_CURSOS.IDRIVER` desde `DRIVERSTRUCT`.
- `script/debug-iplan.mjs`: sondeo de cast/longitud de `IPLAN`.
- `script/alter-capac-ddl-2026.sql`: DDL incremental idempotente.

### Dónde modificar según caso

1) Cambios de mapeo `_OLD -> destino`
- Editar: `src/manual-mappings.js`
- Uso: renombre de columnas, expresiones SQL por columna (`CASE`, `TRY_CAST`), valores fijos.

2) Reglas de jerarquía y sync post-migración
- Editar:
  - `src/hierarchy-indices-sql.js`
  - `src/index.js` (bloque `CAPAC_PLANDECURSO_OLD -> CAPAC_PLANES_CURSOS`)
- Uso: recalcular `IPLANPADRE`, upsert en `CAPAC_ATRIBUTOS_X_DRIVERS`, sync a `CAPAC_ATRIBUTOS_PLANES`.

3) Ajustes de esquema (DDL)
- Editar:
  - `script/alter-capac-ddl-2026.sql`
  - `src/apply-capac-ddl.js`
- Uso: `ADD/DROP COLUMN`, constraints, índices, defaults.

4) Drivers base y enlace a cursos
- Editar:
  - `script/upsert-capac-drivers.mjs` (idempotente)
  - `script/reset-capac-drivers.mjs` (destructivo)
  - `script/link-drivers-cursos.mjs` (matching por nombre)

5) Estructuras de cursos
- Editar:
  - `script/manage-estructuras.mjs` (acciones comunes)
  - `script/repair-capac-estructuras-cursos.mjs` (reconstrucción completa)

### Flujos recomendados

A) Ajuste de mapeo + prueba segura
1. `npm run analyze -- --only <TABLA_OLD>`
2. Ajustar `src/manual-mappings.js`
3. `npm run migrate -- --only <TABLA_OLD> --dry-run`
4. `npm run migrate -- --only <TABLA_OLD>`

B) Cambio de DDL + remigración
1. Editar `script/alter-capac-ddl-2026.sql`
2. `npm run ddl:capac`
3. `npm run migrate -- --only CAPAC_PLANDECURSO_OLD`

C) Problemas de estructura
1. `node script/manage-estructuras.mjs --action check`
2. Si hace falta: `--action reseed-2levels` o `script/repair-capac-estructuras-cursos.mjs`

### Nota de compatibilidad

Los scripts legacy se conservaron como wrappers para no romper comandos viejos; la lógica principal vive en:
- `script/inspect-capac.mjs`
- `script/manage-estructuras.mjs`

