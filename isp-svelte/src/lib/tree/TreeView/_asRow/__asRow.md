# `_asRow/` — Cierre concreto del TreeAdapter en modo "fila"

La cascada de [`../_treeAdapter/`](../_treeAdapter/__TreeAdapter.md) termina en
`TARoles` (capa 07). Esta carpeta cierra esa cascada con la **vista en forma
de fila** (la única vista hoy soportada): añade plomería del modo fila,
expansión inicial automática, registro de row adapters, handlers DOM y el
contrato consumido por el `TreeRowAdapter`.

## Cascada

```
TARoles (../_treeAdapter/07-roles.ts)
   ▲
TARowBase (00-treeAdapterAsRow.ts)
   ▲
TreeRowViewAdapter (01-treeAdapterAsRowEvents.ts)   ← exportado como TreeAdapter
```

## Archivos

| Archivo | Rol |
|---|---|
| [`00-treeAdapterAsRow.ts`](00-treeAdapterAsRow.ts) | `TARowBase`. Plomería del modo fila: configuración del float card, expansión inicial automática, ops DOM (pointerdown fuera del árbol), registro de row adapters, handlers de fila (`onrowclick`/`onrowdblclick`/`onrowfocus`/`onrowdelete`/`onrowreorder`/`onrowtoggle`), filtrado de acciones, formateo de hotkeys y construcción del `TreeRowConfig`. |
| [`01-treeAdapterAsRowEvents.ts`](01-treeAdapterAsRowEvents.ts) | `TreeRowViewAdapter`. Cierre concreto vacío que la subclase consumidora extiende. |
| [`_rowItem.svelte`](_rowItem.svelte) | Render recursivo de fila (`<details>`/`<summary>` + `FloatingComponent`). Se auto-invoca para hijos. `{#each nodes as node (node.pathInit)}`. |
| [`_rowAdapter/`](_rowAdapter/__RowAdapter.md) | Cascada del adapter por fila (`TRABase` → `TRADrag` → `TreeRowAdapter`). Una instancia por fila visible. |

## `TARowBase` — `00-treeAdapterAsRow.ts`

### Tipos auxiliares

```ts
interface TreeRowViewAdapterFloatCardConfig { tx?: number|string; ty?: number|string; e?: number }
interface TreeRowViewAdapterConfig { floatCard?: TreeRowViewAdapterFloatCardConfig }
```

### Estado interno

| Campo | Rol |
|---|---|
| `_adapterConfig` | Configuración global del modo fila (transformación del float card al hover, etc.). |
| `_lastFocusedFlatPath` | Último foco para `lastFocusedNode` cuando ya no hay nada enfocado. |
| `currentDragFlatPath` | ID del nodo actualmente arrastrado (compartido con `TRADrag`). |
| `_autoExpandedSeen` | Set de IDs ya auto-expandidos (no se re-expanden si el usuario los colapsa luego). |

### Filtros y decoradores

- **`filterRowActions(cfg, frozen)`** — elimina `mdi:arrow-up` si `isFirst`, `mdi:arrow-down` si `isLast`, ambos si `frozen`. Soporta entradas agrupadas (subarrays).
- **`formatHotkeyDisplay(combo)`** — normaliza combos para mostrar (`ArrowUp → Up`, `Delete → Supr`, `KeyA → A`, `Digit1 → 1`).
- **`decorateHotkeyTitles(actions)`** — añade ` | <display>` al `title` de cada botón con `hotkey`.
- **`findHotkeyHandler(lists, combo)`** — recorre arrays (y subarrays) buscando el primer botón habilitado con ese `hotkey`. Lo usa la captura global de teclas.

### Expansión inicial

- **`shouldAutoExpand(node)`** — por defecto `isGroupActor(node)`.
- **`applyDefaultExpansion()`** — DFS expandiendo agrupadores no vistos aún. Actualiza `expandedFlatPaths` solo si hubo cambios.
- **`override onrefresh()`** — llama `super.onrefresh()` y luego `applyDefaultExpansion()`.

### Handlers de fila

| Handler | Comportamiento |
|---|---|
| `onrowclick(node)` | Selecciona + `onrefresh()`. |
| `onrowdblclick(node)` | Si `isViewMode` → `openViewNode`; si no → `openEdit`. |
| `onrowfocus(node)` | Mueve foco, guarda `_lastFocusedFlatPath`, sync, dispara `consumeronrowfocus?`. |
| `onrowdelete(node)` | `requestDelete` + `ondeleteconfirmed`. |
| `onrowreorder(srcId, tgtId, "before"\|"after"\|"into")` | Switch a `nestInto` o `reorder`, luego `commitAndFlash` y dispara `consumeronrowreorder?`. |
| `onrowtoggle(node, open)` | **Pre-filtra**: si el nodo no es `isGroupActor` o el adapter no puede mutar (`!canMutate`), retorna sin hacer nada. Si todo pasa, invoca `customs.onexpand(node, runtime)` cuando `open === true` o `customs.oncollapse(node, runtime)` cuando `open === false`. |
| `Ctrl+Enter` | Atajo registrado vía `customs.hotkeys["Ctrl+Enter"]`. Sin default. |

### Hooks consumibles (asignables desde el `.svelte` consumidor)

- `consumeronrowfocus?: (node) => void`
- `consumeronrowreorder?: (sourceId, targetId, position) => void`

### Registro de row adapters

- **`registerRowAdapter(rowAdapter)`** / **`unregisterRowAdapter(rowAdapter)`** — gestionan el `Map<flatPath, TreeRowAdapter>`.
- **`getOrCreateRowAdapter(bridge)`** — factory idempotente: si ya existe por `flatPath`, le aplica `bridge` y `sync`; si no, crea uno nuevo.
- **`disposeRowAdapterByFlatPath(id)`** — limpia.
- **`syncAllRowAdapters()`** — itera todos + `notifyUI`.
- **`syncRowAdaptersByFlatPaths(ids)`** — variante puntual (evita el O(n) cuadrático para hover/focus).

### Pointerdown fuera del árbol

- **`ontreeoutsidepointerdown(e)`** — si el click cae fuera del `data-tree-root`, limpia hover y focus + sync. Lo enchufa el `.svelte` con `<svelte:window on:pointerdown={...}>`.

### `getRowConfig(node)` — el contrato consumido por `TreeRowAdapter`

Genera un `TreeRowConfig` por nodo combinando estado del árbol + roles + hooks de `customs`:

| Sección | Origen |
|---|---|
| `icono` | `customs.getNodeIcon(node, ctx)` o defaults derivados de roles. |
| `disabled` | `disabledNodes.includes(flatPath)`. |
| `draggable` | `draggable && !isFrozen && canMutate`. |
| `isFirst`/`isLast` | `getSiblingPosition(flatPath)`. |
| `actions` | `customs.rowActions(node, runtime)` con hotkeys decorados + filtrado por `filterRowActions`. |
| `cascadeOptions` | `customs.rowCascadeOptions(node, runtime)` con hotkeys decorados. |

Si el consumidor no provee `rowActions`/`rowCascadeOptions`, no hay defaults — la fila aparece sin botones. Eso permite al consumidor componer libremente desde el runtime (`tree.move?`, `tree.addChild?`, `tree.openEdit?`, etc.).

### Toolbar superior

- **`customs.toolsBarActions(tree)`** — el consumidor declara los botones rápidos.
- **`customs.toolsBarCascadeOptions(tree)`** — el consumidor declara el menú "⋮".

Patrón típico: grupo "Agregar raíz" + grupo "Expandir/Colapsar todo" + grupo "Undo/Redo" + grupo "Modo protegido".

## `TreeRowViewAdapter` — `01-treeAdapterAsRowEvents.ts`

```ts
export class TreeRowViewAdapter<TListObj extends ITreeData<TListObj> & TObject>
   extends TARowBase<TListObj> {}
```

Cierre concreto vacío. Existe para:

1. Dar un nombre estable exportable como `TreeAdapter` desde `../TreeRowView.svelte`.
2. Ser el punto canónico al que el consumidor apunta para extender (`class ContenidosTreeAdapter extends TreeAdapter<TPlanCurso>`).
3. Permitir, a futuro, separar "modo fila" de "modo grid"/"modo timeline" sin tocar `TARowBase`.

## `_rowItem.svelte`

Componente recursivo que renderiza una fila + sus hijos. Detalles relevantes:

- Loop principal: `{#each nodes as node (node.pathInit)}`.
- Para cada nodo: `<details>` (si es agrupador) o `<div>` (si es átomo) con `<summary>` + slot `row` + `FloatingComponent` (panel de acciones al hover).
- `bind:open={isOpen}` en `<details>`, sincronizado con `expandedFlatPaths` y disparando `onrowtoggle(node, open)`.
- `draggable={cfg.draggable}` + handlers `on:dragstart`/`on:dragover`/`on:drop` delegados a `TreeRowAdapter`.

## Reglas de oro

1. **Si la lógica es independiente del modo de vista, va en `../_treeAdapter/`.** Si depende de "es una fila", va aquí.
2. **El registro de row adapters es la única fuente de verdad** para sync por fila. No mantengas Maps paralelos en consumidores.
3. **`getRowConfig` debe ser puro** (no muta estado del adapter). Solo lee del nodo + estado del adapter + customs.
4. **Los handlers de fila pre-filtran condiciones genéricas** (`open`, `isGroupActor`, `canMutate`, `isViewMode`). El consumer recibe sólo invocaciones válidas y añade lógica de negocio.
5. **`consumeronrowfocus`/`consumeronrowreorder`** son hooks pasivos. No interfieren con el flujo interno.
6. **Svelte 4.** Esta cascada es TS puro; sólo `_rowItem.svelte` tiene reactividad.
