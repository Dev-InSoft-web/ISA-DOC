# `_rowAdapter/` — Adaptador por fila

Una **instancia por fila visible** del árbol. La crea/recupera
`TARowBase.getOrCreateRowAdapter(bridge)` desde `_rowItem.svelte` (el
componente recursivo de fila). Se registra en
`TARowBase.rowAdapters: Map<flatPath, TreeRowAdapter>`.

A diferencia de la cascada de `../_treeAdapter/`, este adapter **no es
abstracto**: la clase final es concreta y usable directamente.

## Cascada

```
TRABase (00-base.ts)            Estado mutable + getters derivados + sync
   ▲
TRADrag (01-drag.ts)            Pipeline drag-and-drop por fila
   ▲
TreeRowAdapter (02-events.ts)   Handlers DOM (click/dblclick/keydown/focus/toggle/pointer)
```

## Bridge desde `_rowItem.svelte`

El componente Svelte le pasa un objeto `RowItemProps<TListObj>` con,
entre otros: `node` (el `INode`), `treeController` (el `TreeAdapter`
padre), `forceRefresh` (callback que dispara un re-render local de la
fila). El adapter copia los descriptores con
`Object.defineProperty` (preserva descriptores reactivos del
`<svelte:self>`).

## `TRABase` — `00-base.ts`

### Estado público

| Campo | Rol |
|---|---|
| `dragOver: "before" \| "after" \| "into" \| null` | Indicador de hover de drag para CSS de placeholder. |
| `dragForbidden: boolean` | `true` si `canDrop()` rechazó el target en hover. |
| `dragEnterCount: number` | Contador para gestionar `dragenter`/`dragleave` anidados. |
| `dragPlaceholderHeight: number` | Altura del placeholder durante el drag (transferida vía `application/x-trvwr-row-height`). |
| `filteredActions: FlexOptionsInput[]` | Acciones tras pasar por `treeAdapter.filterRowActions(cfg, isFrozen)`. |
| `cascadeOptions: FlexOptionsInput[]` | Opciones del menú "más opciones". |
| `hasRowTools: boolean` | `true` si hay acciones o cascade options para mostrar. |
| `showOptions: boolean` | `hasRowTools && esta fila está enfocada`. |

### `sync()`

Recalcula `filteredActions`, `cascadeOptions`, `hasRowTools`,
`showOptions` desde `effectiveRowConfig` (que delega en
`treeAdapter.getRowConfig(node)`). Lo invoca `treeAdapter.syncAllRowAdapters()`
o `syncRowAdaptersByFlatPaths([...])`.

### Getters derivados (lectura del adapter padre + nodo)

| Getter | Cálculo |
|---|---|
| `mergedDisabled` | `nodeDisabled \|\| treeAdapter.disabled \|\| effectiveRowConfig?.disabled`. |
| `isFrozen` | `treeAdapter.isFrozen(node)`. |
| `showCaret` | `!isAtom(node) && hasChildren`. |
| `isDraggable` | `!isViewMode && !mergedDisabled && !isFrozen`. |
| `rowIcono` | `treeAdapter.iconParts(effectiveRowConfig?.icono)`. |
| `isHighlighted` | Resaltada si focused; si nada focused, si selected. |
| `isSelected` | `selectedFlatPath === this.flatPath`. |
| `isReallyFocused` | Foco exacto sobre esta fila. |
| `hasDescendantFocus` | Foco en algún descendiente (para ring del padre). |
| `isReallyHovered` / `hasDescendantHover` | Análogos de hover. |
| `floatVisible` | Política de visibilidad del float card (hover + no editing). |
| `flatPath` | `treeAdapter.normalizeFlatPath(rowNode.flatPath)`. |
| `hasChildren` | `rowNode.childrens.length > 0`. |

### Operaciones DOM

- **`getRootTree(treeItem)`** — sube por `parentElement` hasta `.isp-tree`
  o `[data-tree-root]`.
- **`getVisibleSummaries(treeItem)`** — `details.trvwr-itm > summary`
  filtrando por `details[open]` ancestros (sólo summaries en árbol abierto).
- **`getFlatPathFromSummary(summary)`** — lee `[data-flatpath]`.
- **`focusSummary(summary?)`** — `treeAdapter.blurTreeSummariesExcept` +
  `summary.focus()` con fallback a `tabindex=-1` + dispara
  `onrowfocus`.

### Add sibling/child desde la fila

- `addSiblingAbove() / addSiblingBelow()` → `treeAdapter.onaddsibling(...)`.
- `addChild()` → `treeAdapter.onaddchild(...)`.
- Gates: `canAddSibling` (no disabled, no viewMode), `canAddChild`
  (además no atom).

### Helper

- **`requestRowUiSync()`** — invoca `context.forceRefresh()` (el callback
  Svelte que rerenderiza solo esta fila).

## `TRADrag` — `01-drag.ts`

Pipeline drag-and-drop, todo a nivel `<summary>`.

| Handler | Comportamiento |
|---|---|
| `ondragstart(e)` | Si `!isDraggable`, previene + flash error. Si OK, setea `dataTransfer`, copia `flatPath` a `treeAdapter.currentDragFlatPath`, transfiere `application/x-trvwr-row-height` (altura del summary), añade clase `trvwr-itm--dragging` al `<details>`. |
| `ondragend(e)` | Limpia clase, resetea `dragOver`/`dragForbidden`/`dragEnterCount`/`dragPlaceholderHeight`, limpia `currentDragFlatPath`. |
| `onsummarydragenter()` | Incrementa `dragEnterCount`. |
| `onsummarydragover(e)` | Calcula posición (`before`/`after`/`into`) según rectángulo: si el target es `isGrouper`, divide en 25%/50%/25% (top→`before`, middle→`into`, bottom→`after`); si no, sólo midpoint. Consulta `treeAdapter.canDrop(srcId, tgtId, pos)` para `dragForbidden`. Toma altura placeholder de `dataTransfer`. |
| `onsummarydragleave()` | Decrementa `dragEnterCount`; al llegar a 0, resetea estado de hover. |
| `ondrop(e)` | Si todo válido (no forbidden, no self, no disabled, hay `pos`), llama `treeAdapter.onrowreorder(srcId, this.flatPath, pos)`. Si forbidden, dispara flash error sobre source + target. |

Todos los handlers terminan en `finally { requestRowUiSync(); }` para
forzar re-render local.

### Flashes

- `shouldFlash` — `flatPath ∈ treeAdapter.flashFlatPaths`.
- `shouldFlashError` — `flatPath ∈ treeAdapter.flashErrorFlatPaths`.

## `TreeRowAdapter` — `02-events.ts`

Handlers DOM de eventos no-drag.

### Click / dblclick

| Handler | Comportamiento |
|---|---|
| `onsummaryclick(e)` | Si `mergedDisabled`, preventDefault. Si click en `.trvwr-drag-handle`, preventDefault + stopPropagation. Si click en `.trvwr-itm-symb` (caret) y `hasChildren`, toggle expand. Foco + onrowclick. Dispara `events.onclick`. Termina con `summary.focus({preventScroll:true})`. |
| `onsummarydblclick(e)` | Si click en caret, ignora. Si no, `treeAdapter.onrowdblclick(node)`. |
| `ondetailstoggle(e)` | Sincroniza `el.open ↔ isNodeOpen`. Dispara `events.onopen`/`onclose`. |

### Teclado

`onkeydown(e)` — solo procesa si el activeElement es el `<summary>` actual:

| Tecla (sin mods) | Acción |
|---|---|
| `ArrowDown` | Mueve foco al siguiente summary visible. |
| `ArrowUp` | Mueve foco al anterior. |
| `ArrowRight` | Si tiene hijos y está cerrado, expande. |
| `ArrowLeft` | Si tiene hijos y está abierto, colapsa. |
| `Home` | Foco al primero. |
| `End` | Foco al último. |

Si la tecla no fue manejada por defecto, busca en `customs.hotkeys[combo]`
(formato `"Ctrl+Shift+ArrowDown"`, `"Insert"`, etc.) y lo invoca con
`(record, runtime, e)`.

### Focus / hover

| Handler | Comportamiento |
|---|---|
| `onsummaryfocus(e)` | Blur otros summaries + `treeAdapter.onrowfocus(node)` + dispara `events.onfocus`. |
| `onsummaryblur()` | Dispara `events.onblur`. |
| `onsummarypointerenter()` | Si cambia el hover, actualiza `hoveredNode` y sincroniza solo los dos adapters afectados (anterior + actual) — evita el O(n). |
| `onsummarypointerleave()` | Si era el hovered, limpia + sincroniza solo este. |

## Reglas de oro

1. **Una instancia por fila visible.** Si una fila se colapsa o se
   destruye, su adapter se desregistra (`dispose`).
2. **El adapter de fila NO debe leer estado de otras filas directamente.**
   Pasa siempre por `this.treeAdapter.*`.
3. **Cualquier mutación de estado UI debe terminar en
   `requestRowUiSync()`** para que la fila se re-renderice. La
   reactividad global del árbol va por `treeAdapter.notifyUI()`.
4. **Drag-and-drop usa el `dataTransfer`** como fuente de verdad. No
   inventes canales paralelos.
5. **Atajos de teclado por defecto son inviolables.** Si necesitas un
   combo, declara `customs.hotkeys`.
6. **Svelte 4.** Esta cascada es TS puro; el `_rowItem.svelte` es quien
   pone la reactividad y los listeners DOM.
