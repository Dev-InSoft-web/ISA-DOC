# Mapa de imports `$comps` (isp-svelte)

Tras la reorganización de carpetas. Alias: `$comps` → `isp-svelte/src/lib`.

## UI

| Antes | Ahora |
|-------|--------|
| `$comps/containers/` | `$comps/ui/containers/` |
| `$comps/overlays/` | `$comps/ui/overlays/` |
| `$comps/primitives/` | `$comps/ui/primitives/` |
| `$comps/especial/` | `$comps/ui/widgets/` |

## Árbol y formularios

| Antes | Ahora |
|-------|--------|
| `$comps/Options/` | `$comps/options/` |
| `$comps/TreeView/` | `$comps/tree/TreeView/` |
| `$comps/TreeViewLegacy/` | `$comps/tree/TreeViewLegacy/` |
| `$comps/Form/` | `$comps/Form/` (sin cambio de segmento; carpeta bajo `lib/Form/`) |

## Bridge (sin cambio de ruta)

| Ruta | Uso |
|------|-----|
| `$comps/actions/` | SqlExecCard, RevisadoCheck, CopyButtonIconify, RunButton |
| `$comps/status/` | DbStatusBanner |
| `$comps/shared/` | Chip.svelte |

## Ejemplos

```svelte
import Accordion from "$comps/ui/containers/Accordion.svelte";
import Switch_ from "$comps/ui/widgets/_Switch.svelte";
import { TreeNode } from "$comps/tree/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";
import type { FlexOptionsInput } from "$comps/options/FlexOptions.svelte";
```

## Paquete npm

`index.ts` exporta desde `./actions/CopyButtonIconify.svelte`. Tras mover más exports, actualizar rutas en `index.ts`.
