# SQL (plataforma)

Explorador de esquema ClientesIS + PatyIA, fragmentos SQL y codegen DER.

- `schema/` — parseo de tablas y archivo `init_capacitacion.sql`.
- `stores/` — persistencia `public/data/*` (árbol de tablas, fragmentos en vivo).
- `providers/` — `clientesIsProvider` / `patyiaProvider` para el panel SQL.
- `codegen/` — dominios, autogen, generators (antes `codeGen/` en raíz de lib).
- `migration/` — scripts y TSV de migración ContaPymeU.
- `permisos/` — CSV de permisos.
