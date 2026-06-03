# `_rowAdapter/` — Cascada del controlador de fila

## Idea base

`TreeRowAdapter<Stacker, TWorking>` es la clase **concreta** que controla **una sola fila** del árbol. Una instancia por nodo visible. La construye y registra `TreeAdapter.getOrCreateRowAdapter(bridge)` en el `<RowItem>`.

Como el `TreeAdapter`, está fragmentada en cascada — un archivo, una capa:

```text
TRABase         00-base.ts     Estado base + tipos compartidos (INode, ITreeData) + helpers de DOM/foco/icono.
        ▲
TRADrag         01-drag.ts     Drag & drop sobre la fila (start, over, drop, cleanup).
        ▲
TreeRowAdapter  02-events.ts   Eventos de fila: click, dblclick, focus, keydown, toggle.
```

`TreeRowAdapter` **NO es abstracto**. Es la clase final que el `TreeAdapter` instancia directamente. No la extiendas tú; el árbol la maneja por dentro.

## Qué vive en cada capa

### `00-base.ts` — `TRABase`

- Tipos exportados: `INode<T>`, `ITreeData<T>`, helpers `groupedWithSeparators`, `objRootsToNodes`.
- Estado de fila: `dragOver`, `dragForbidden`, `filteredActions`, `hasRowTools`, `showActions`, `longPressTimer`.
- `applyBridge(bridge)`: refresca el puente reactivo (`node`, `nodes`, props del row) sin recrear el adapter.
- `dispose()`: avisa al `TreeAdapter` que la fila se va.
- Getters de identidad/estado: `id`, `hasChildren`, `isHighlighted`, `isSelected`, `isReallyFocused`, `isReallyHovered`, `floatVisible`, `siblingPos`, `isNodeOpen`, `nodeDisabled`.
- `effectiveRowConfig`: combina default (`defaultRowConfig`) + lo que devuelve `treeAdapter.getRowConfig(node)`.
- `filterRowActions`: aplica `isFirst/isLast` para esconder up/down.
- `iconParts`: normaliza props del icono.
- Helpers DOM: `getRootTree`, `getVisibleSummaries`, `getRowIdFromSummary`, `focusSummary`, `containsDescendantId`.
- Forwarders al árbol: `onrowclick`, `onrowdblclick`, `onrowdelete`, `onrowtoggle`, `onrowreorder`, `onrowfocus`.
- `addSiblingAbove/Below`, `addChild`, `canAddSibling/canAddChild`, `addChildLabel`.

### `01-drag.ts` — `TRADrag`

- `ondragstart`, `ondragover`, `ondragleave`, `ondragend`, `ondrop`.
- Cálculo de `dragOver: "before" | "after" | null`, prevención de drops inválidos (mismo nodo, descendiente, distinta rama).
- Sincroniza con `TreeAdapter.onrowreorder` al soltar.

### `02-events.ts` — `TreeRowAdapter`

- `onsummaryclick`: clic en el `<summary>` (toggle, foco, blur de hermanos, click logico).
- `onsummarydblclick`: edita o ve el nodo.
- `ondetailstoggle`: sincroniza estado expandido cuando el `<details>` cambia.
- `onkeydown`: navegación por teclado (flechas, Home/End, Insert, Delete, Enter, Ctrl+Enter, Ctrl+↑/↓, Ctrl+Shift+↑/↓).
- `onfocus`/`onblur`/`onmouseenter`/`onmouseleave`: estado de foco/hover.
- Acciones de gestos rápidos.

## Relación con `TreeAdapter`

```text
TreeAdapter                                      TreeRowAdapter
─────────                                        ──────────────
 rowAdapters: Map<id, TreeRowAdapter>            constructor(bridge, treeAdapter)
 getOrCreateRowAdapter(bridge)  ──────crea────►   register / sync / dispose
 syncAllRowAdapters()           ──────itera──►    sync()
 onrowclick / onrowdblclick / onrowfocus
 onrowtoggle / onrowreorder / onrowdelete   ◄────forward (event handlers)
 getRowConfig(node)             ──────lee────►   effectiveRowConfig
```

El `<RowItem.svelte>` recibe el `node` y monta su `TreeRowAdapter` vía el `TreeAdapter`. El adapter NO posee el DOM: solo lee/escribe estado y delega.

## `00-node-mixin.ts` — `TreeNodeUX`

Función mixin que extiende cualquier modelo `TObject` con los campos requeridos por `ITreeData<T>` (`id`, `ireference`, `stack`, `children`, `istack`, `nistack`, `isLeaf`, `isPenultimate`, `isLast`, `nextLevelTitle`).

```ts
class TPlanCursoUX extends TreeNodeUX(TPlanCurso) { /* solo lo específico */ }
```

El mixin agrega los getters; tu modelo de dominio queda intacto.

## Cómo se consume

Desde el componente `TreeView.svelte` (el único barrel real):

```ts
import {
	TreeAdapter,        // base abstract para tu adapter
	TreeRowAdapter,     // concreto, normalmente no lo extiendes
	TreeNodeUX,         // mixin para tus UX
	type INode,
	type ITreeData,
	objRootsToNodes,
	groupedWithSeparators,
} from ".../TreeView/TreeView.svelte";
```

## Reglas de oro

1. **No extiendas `TreeRowAdapter`.** El consumidor toca `TreeAdapter`, no el row adapter.
2. **No mezcles capas.** Drag en `01-drag.ts`, eventos en `02-events.ts`. Estado base/getters en `00-base.ts`.
3. **No duplicar registro.** El `TreeAdapter` mantiene un `Map<id, TreeRowAdapter>`; usa `getOrCreateRowAdapter`, no `new`.
4. **Sin runas.** Svelte 4. La reactividad la pone el componente que monta `<RowItem>`.
5. **Cualquier cambio que toque la API pública del row** (eventos, getters consumidos por el template) debe reflejarse en `__TreeAdapter.md` también — son contratos hermanos.
