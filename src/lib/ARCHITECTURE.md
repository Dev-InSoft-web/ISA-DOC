# Arquitectura Bulletproof de `src/lib`

Mapa del monorepo (raíz, `public/`, `data/`, `secrets/`): `../../ARCHITECTURE.md`, `../../IMPORT-MAP.md`.

## Principios

1. **Core sin negocio** — conexiones SQL, estado en URL, Socket.IO y catálogo de repos viven en `core/`.
2. **Plataforma SQL separada** — explorador de tablas, codegen y migraciones ClientesIS en `sql/` + `tree/`.
3. **Features autocontenidos** — cada producto bajo `features/<nombre>/` con sus MD, SQL y assets.
4. **Integraciones en el borde** — APIs de terceros y render (Mermaid, HF, Postman) en `integrations/`.

## Árbol actual

```
src/lib/
├── core/
│   ├── database/     clientesis-pool.ts, paty-pool.ts
│   ├── url/            query-params.ts (?tab, ?state b64)
│   ├── realtime/       socket-server.ts, flag.ts
│   └── registry/       projects.ts
├── shared/
│   ├── format-html.ts
│   └── stores.ts
├── sql/
│   ├── schema/         tableSchema.ts, fragments.ts
│   ├── stores/         tablesStore.server.ts, fragmentsStore.ts
│   ├── providers/      clientesIsProvider, patyiaProvider, types
│   ├── codegen/        domains, autogen, generators, stateClient, paths
│   ├── migration/      scripts + tsv ClientesIS
│   └── permisos/       csv.ts
├── tree/
│   ├── storage.ts
│   └── nodes/          BaseTreeNode, TableNode, …
├── integrations/
│   ├── mermaid/
│   ├── huggingface/
│   ├── postman/
│   └── runtime/
└── features/
    ├── bitacora/       daily/, topics/, revisadoStore
    ├── patyia/         010-config … 070-sql (ver README interno)
    └── tickets/        TK-*, assets/, index.ts
```

## Imports recomendados

Desde `src/components/...`:

```ts
import { getPool } from "../../lib/core/database/clientesis-pool.ts";
import { getUrlParam } from "../../lib/core/url/query-params.ts";
import { parseTableFragment } from "../../lib/sql/schema/tableSchema.ts";
import { patyiaProvider } from "../../lib/sql/providers/patyiaProvider.ts";
import { TICKETS } from "../../lib/features/tickets";
import { decodeJsonState } from "../../lib/features/patyia/010-config/stateB64";
```

Alias TypeScript existente: `$lib/*` → `./src/lib/*` (p. ej. `$lib/core/database/clientesis-pool.ts`).

## PatyIA interno

Dentro de `features/patyia/` se mantiene numeración INSOFT `010-` … `070-` (config, api, conversación, openai, prompts, bitácora, sql). No mezclar con capas de `src/lib` raíz: son subcapas del feature.

## Windows / nombres de carpeta

Evitar `codeGen` vs `codegen` en la misma ruta (NTFS case-insensitive). El codegen de tablas vive en **`sql/codegen/`**.

## Agentes (Cursor)

Al añadir módulos:

- ¿Es infra? → `core/`
- ¿Es SQL genérico o DER? → `sql/` o `tree/`
- ¿Es Paty / bitácora / ticket? → `features/<feature>/`
- ¿Es API externa? → `integrations/`

Actualizar [IMPORT-MAP.md](./IMPORT-MAP.md) si se renombra algo público.
