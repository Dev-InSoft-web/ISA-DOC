# `_asRow/` — Modo de vista en forma de fila

## Idea base

El **TreeAdapter genérico** de `../_treeAdapter/` es agnóstico del modo de vista. Esta carpeta cierra la cascada con la **vista en forma de fila** (un `<summary>`/`<details>` por nodo, drag handle, caret, label, acciones flotantes). Es el modo "row".

Si en el futuro hay un modo "mosaico" o "grafo", vivirá en una carpeta hermana (`_asMosaic/`, `_asGraph/`) sin ensuciar a `_treeAdapter/`.

## Cascada

```text
TARoles  (../_treeAdapter/06-roles.ts)
    ▲
TARowBase                 00-treeAdapterAsRow.ts        Plomería del modo fila.
    ▲
TreeRowViewAdapter        01-treeAdapterAsRowEvents.ts  UI/configuración por fila.
```

Paralela, la cascada del controlador de **una sola fila** vive en [`_rowAdapter/`](./_rowAdapter/__RowAdapter.md):

```text
TRABase   (00-base.ts)  +  node-mixin (00-node-mixin.ts)
    ▲
TRADrag   (01-drag.ts)
    ▲
TreeRowAdapter (02-events.ts)
```

> **Invariante de cascada:** un índice **NUNCA** importa de un índice mayor en la misma carpeta. Si `00-treeAdapterAsRow.ts` necesita la API que cierra `01-...Events.ts`, la declara `abstract` y la herencia la fija. Esto vale tanto para `_asRow/` como para `_asRow/_rowAdapter/`.

## Archivos

| Archivo | Rol |
| ------- | --- |
| `00-treeAdapterAsRow.ts` | `TARowBase`. Plomería del modo fila: configuración del adapter, expansión inicial, operaciones DOM de `<summary>`, handlers `onrow*`/`onswipe*`, registro y ciclo de vida de los `TreeRowAdapter`. Declara como `abstract` el contrato consumido por la vista (`getRowConfig`, `getToolsBarActions`, `getNodeIcon`, `particularactionsrow`, `particularcascadeoptionsrow`). |
| `01-treeAdapterAsRowEvents.ts` | `TreeRowViewAdapter`. Implementación concreta de la UI por fila: `getRowConfig`, `getToolsBarActions`, `getAddRootLabel`, hooks `particular*`, `getNodeIcon`. Esta es la clase que el consumidor extiende. |
| `_rowItem.svelte` | Componente Svelte 4 que renderiza UNA fila + recursivamente sus hijos vía `<svelte:self>`. Define `RowItemProps`. |
| `_rowAdapter/` | Cascada del controlador por fila — ver [`__RowAdapter.md`](./_rowAdapter/__RowAdapter.md). |

## `00-treeAdapterAsRow.ts` — `TARowBase`

Concentra **todo lo que hace que el árbol funcione como filas** sin opinar sobre cómo se ven.

### Configuración (`TreeRowViewAdapterConfig`)

```ts
export interface TreeRowViewAdapterFloatCardConfig {
   tx?: number | string;   // traslación X de la float card de acciones
   ty?: number | string;   // traslación Y
   scale?: number;         // escala
}

export interface TreeRowViewAdapterConfig {
   floatCard?: TreeRowViewAdapterFloatCardConfig;
}
```

Métodos:
- `applyAdapterConfig(cfg)` — merge superficial. La subclase concreta lo invoca desde su constructor.
- `get floatCard` — accesor de la transformación lineal aplicada a la card flotante de acciones.

### Expansión inicial

| Método | Rol |
| ------ | --- |
| `shouldAutoExpand(node)` (protected) | Default: `isGrouper(node)`. Override en la subclase para política específica (p.ej. solo nivel 0). |
| `applyDefaultExpansion()` | Recorre `rootNodes`, marca expandidos los que cumplan `shouldAutoExpand`, sincroniza row adapters. Idempotente: solo se ejecuta una vez por instancia (flag `_autoExpansionApplied`). |
| `override onrefresh()` | Tras refrescar, dispara `applyDefaultExpansion` la primera vez que hay `rootNodes`. |

### Operaciones DOM de fila

Tocan selectores `[data-tree-root]`, `[data-tree-row-id]`, `[data-idrow]`, `details.trvwr-itm > summary`. Por eso viven aquí — no en `_treeAdapter/04-view.ts`.

| Método | Rol |
| ------ | --- |
| `focusRowById(nodeId)` | Foca el `<summary>` de una fila (microtask + rAF para resistir relayouts). |
| `refocusFocusedRowSummary()` | Re-foca el `<summary>` correspondiente al `_focusedNodeId`. Reintenta hasta 6 frames si el DOM aún no existe. |
| `blurTreeSummariesExcept(active)` | Quita el foco a los demás `<summary>` del mismo árbol. |
| `commitAndFlash(id)` | `setSelectedId` + `flashRowIds` + `syncAllRowAdapters`. |
| `flashRowIds(ids, durationMs?)` | Marca filas para animación de "flash" durante `durationMs` (default 650ms). |

### Handlers de fila / swipe

Implementan los hooks abstractos heredados de `TARoles` y declaran nuevos para fila:

| Handler | Rol |
| ------- | --- |
| `onrowclick(node)` | Selección + sync model. |
| `onrowdblclick(node)` | Abre drawer (edición o vista según `isViewMode`). |
| `onrowfocus(node)` | Marca `focusedNode` y sync. |
| `onrowtoggle(_node)` (override) | Empty por defecto; override en subclase. |
| `onrowdelete(node)` | `requestDelete` + `ondeleteconfirmed`. |
| `onrowreorder(srcId, tgtId, pos)` | `nestInto` o `reorder` + flash. |
| `onCtrlEnter(_node)` (override) | Empty por defecto. |
| `onswipeopendrawer()` | Abre drawer del nodo seleccionado. |
| `onswipeclosedrawer()` | Cierra el drawer. |
| `onswipenoop()` (override) | Empty por defecto. |

### Registro y ciclo de vida de `TreeRowAdapter`

| Método | Rol |
| ------ | --- |
| `getOrCreateRowAdapter(bridge)` | Idempotente. Si ya existe el adapter para el `id`, refresca su bridge y `sync()`. Si no, lo crea, registra y sincroniza. **El consumidor NO llama esto** — lo invoca `_rowItem.svelte`. |
| `registerRowAdapter(rowAdapter)` | Inserta en `rowAdapters: Map<string, TreeRowAdapter>`. |
| `unregisterRowAdapter(rowAdapter)` | Lo retira (al hacer `dispose` de la fila). |
| `disposeRowAdapterById(id)` | Atajo para destruir desde el árbol. |
| `syncAllRowAdapters()` | Recorre el `Map` invocando `sync()` + incrementa `rowLayoutEpoch` para forzar relayout en Svelte. |

### Contrato abstracto (consumido por la capa inferior `_rowAdapter/`)

`TARowBase` declara como `abstract`:
- `getRowConfig(node)` → `TreeRowConfig | null`.
- `getToolsBarActions()` → `FlexOptionsAction[]`.
- `protected getNodeIcon(node, ctx)` → override del icono.
- `protected particularactionsrow(node)` → acciones específicas del consumidor.
- `protected particularcascadeoptionsrow(node)` → cascade options específicas.

Esto permite que `TreeRowAdapter._rowAdapter/00-base.ts` consuma el contrato sin importar la capa final (`01-...Events.ts`) — respetando la cascada.

## `01-treeAdapterAsRowEvents.ts` — `TreeRowViewAdapter`

La clase final que el consumidor extiende. Cierra los abstracts declarados en `TARowBase` con la implementación estándar.

### `getToolsBarActions()`

Retorna `FlexOptionsAction[]` con:
- Botón "Agregar (nivel 1)" (oculto en `isBrapido`, deshabilitado en `viewMode`/`readOnly`).
- "Colapsar todo".
- "Expandir todo".

### `getRowConfig(node)`

La pieza central que el `<RowItem>` consume. Devuelve un objeto con:

| Campo | Contenido |
| ----- | --------- |
| `icono` | `{ icon, color, style }`. Default: `mdi:file-document-outline` (last), `mdi:folder-{open,outline,plus-outline}` (folder con/sin hijos), `mdi:file-outline` (resto). Override por `getNodeIcon`. Color dorado para folders, gris para vacíos. |
| `actions` | Compuesto en orden: `actorActions(node)` (rol `prison` aporta "Liberar") · `wardenDraft(node).actions` · `particularactionsrow(node)` · acciones por modo (ver formulario / eliminar). En `readOnly` queda vacío. |
| `cascadeOptions` | Editar (en mode no-vista), añadir hermano arriba/abajo (si `bdrag`), `wardenDraft.cascadeOptions`, `particularcascadeoptionsrow`. |
| `draggable` | `bdrag && !isReadOnly`. |
| `isFirst` / `isLast` | Posición entre hermanos (consultada al row controller). |
| `events.onleadiconclick` | Para folders vacíos: `handleaddchild(id)`. |

> Las acciones de **mover** (↑/↓ y drag) las filtra `_rowAdapter/00-base.ts` cuando `isFrozen`. `getRowConfig` no se entera del congelamiento.

### Hooks de extensión (override en subclases)

```ts
protected override particularactionsrow(node): ButtonIconifyProps[]   // default []
protected override particularcascadeoptionsrow(node): FlexOptionsInput[]  // default []
protected override getNodeIcon(node, ctx): { icon?, color?, style? } | null  // default null
```

`ctx` lleva `{ isLastNode, isFolder, hasChildren, isExpanded, isEmptyFolder }` para que el override decida con contexto.

## `_rowItem.svelte`

Componente Svelte 4 que renderiza UNA fila y delega los hijos en `<svelte:self>`. Imports relativos:

```ts
import FlexOptions from "../../Options/FlexOptions.svelte";
import FloatingComponent from "../../containers/FloatingComponent.svelte";
import { TreeRowViewAdapter } from "../TreeRowView.svelte";   // re-export
```

### Render

```svelte
{#if rowController.isDraggable}
   <span class="trvwr-drag-handle" draggable="true" ... />
{/if}
{#if rowController.showCaret}
   <span class="trvwr-itm-symb">…caret + folder icon…</span>
{:else if rowController.rowIcono}
   <span class="trvwr-itm-lead">…icono lead…</span>
{/if}
<span class="trvwr-itm-content">{@html node.label}</span>
```

`showCaret`:
- `false` si `isAtom(node)`.
- `true` si tiene hijos.

`isDraggable`:
- `!isViewMode && !mergedDisabled && !isFrozen`.

## Estructura por capas (visual)

```text
TreeRowView.svelte (la única "barrel" expuesta al consumidor)
   │
   ├── usa _rowItem.svelte ─── recursivo
   │
   └── recibe TreeRowViewAdapter (subclase del consumidor)
            │
            └── extiende TARowBase
                       │
                       └── extiende TARoles (../_treeAdapter/06)
                                  └── …cascada genérica…
```

## Cómo se consume

Desde el componente `TreeRowView.svelte` (el único barrel real):

```ts
import {
   TreeRowViewAdapter,
   TreeRowAdapter,
   TreeNodeUX,
   type INode,
   type ITreeData,
   objRootsToNodes,
   groupedWithSeparators,
} from ".../TreeView/TreeRowView.svelte";
```

```ts
class MiAdapter extends TreeRowViewAdapter<TStacker, MiUX> {
   constructor() {
      super(/* ... */);
      this.applyAdapterConfig({ floatCard: { tx: "1rem", ty: "-1em", scale: 0.8 } });
   }

   protected override particularactionsrow(node) { return [...] }
   protected override getNodeIcon(node, { isLastNode, isFolder }) { return { icon: "mdi:database-outline" } }
}
```

## Reglas de oro

1. **Cascada estricta.** `00-treeAdapterAsRow.ts` no importa de `01-...Events.ts`. Si necesita una API de la capa final, va declarada `abstract`.
2. **Plomería en `00`, UI en `01`.** Configuración, DOM, registry, handlers crudos → `00`. `getRowConfig`, `getNodeIcon`, `getToolsBarActions`, hooks `particular*` → `01`.
3. **No mezcles roles con vista.** Los roles (`atom`, `freezer`, `monarchy`, `warden`, etc.) viven en `../_treeAdapter/06-roles.ts`. Aquí solo se consumen.
4. **No extiendas `TARowBase`.** El consumidor extiende `TreeRowViewAdapter`, que es la API pública de la cascada.
5. **Svelte 4.** Sin runas, sin snippets, `<slot />`, `on:click`, `dispatch`. La reactividad del template lee variables o llama métodos con argumentos — nunca getters de helpers que dependan de variables reactivas.
