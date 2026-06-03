# Core

Infraestructura transversal sin reglas de negocio de producto.

- `database/` — pools MSSQL ClientesIS (`clientesis-pool`) y PatyIA (`paty-pool`, env `paty_*`).
- `url/` — `query-params.ts`: tabs en query string y `?state=` base64url.
- `realtime/` — Socket.IO (`socket-server`) y flag de sync codegen.
- `registry/` — `projects.ts` para Postman/verify scripts.
