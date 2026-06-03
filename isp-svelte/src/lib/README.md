# `@jeff-aporta/isp-svelte` — `src/lib`

Componentes propios del paquete (wrappers ISA-DOC + árboles SQL). Arquitectura alineada con **Bulletproof / Feature-Layered** de `ISA-DOC/src/lib`.

| Capa | Carpeta | Contenido |
|------|---------|-----------|
| **shared** | `shared/` | Piezas sueltas (`Chip`) |
| **ui** | `ui/` | primitives, containers, overlays, widgets (antes `especial/`) |
| **options** | `options/` | Menús de fila (`FlexOptions`, `CascadeOptions`) |
| **form** | `Form/` | Formularios y `jconfig` (carpeta `Form` en disco por historial Windows) |
| **tree** | `tree/` | `TreeView` (moderno) y `TreeViewLegacy` |
| **bridge** | `actions/`, `status/` | Acoplamiento a ISA-DOC (SQL, revisado, banner BD) |

## Consumo desde ISA-DOC

Alias Vite/Astro: `$comps/*` → `isp-svelte/src/lib/*` (ver `astro.config.ts`).

```svelte
import Accordion from "$comps/ui/containers/Accordion.svelte";
import TreeView from "$comps/tree/TreeViewLegacy/TreeRowView.svelte";
```

## Más documentación

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [IMPORT-MAP.md](./IMPORT-MAP.md)
