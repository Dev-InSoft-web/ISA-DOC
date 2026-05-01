# TreeView — documentación del módulo

> **Mantenimiento:** si actualizas este archivo (`__TreeView.md`), revisa y alinea también la sección **TreeView** en [`../_COMPS.md`](../_COMPS.md).

---

## Rol

Árbol jerárquico reutilizable. Proporciona:

- Expansión/colapso de nodos (individual, expandir todo, colapsar todo, expansión inicial automática).
- Fila resaltada (`selectedId` / `focusedNodeId` internos en el adapter).
- Flash de confirmación tras reordenar o insertar.
- Barra de herramientas superior con `FlexOptions`.
- Acciones flotantes por fila (`FloatingComponent` + `FlexOptions`) y menú en cascada.
- Drag-and-drop para reordenar entre hermanos del mismo nivel (con osmosis controlada por roles).
- Gestos táctiles (swipe) vía `TouchGestures`.
- Drawer lateral (`ActionDrawer`) con formulario CRUD integrado vía `AccionesGen`.
- Modal de eliminación con confirmación por código de seguridad.
- **Sistema actoral** (`atom` · `group` · `warden` · `prison` · `cell` · `hermetic` · `freezer` · `monarchy`) con pipeline de vigilancia closest→farthest.
- **Congelamiento** por roles `freezer` (tautológico) / `monarchy` (contingente).

**No incluye lógica de negocio**. El consumidor aporta una subclase concreta de `TreeRowViewAdapter` y un `CatalogoController`.

---

## Arquitectura — dos cascadas paralelas

```text
                ┌──────────────────────────────────┐
                │   TreeRowView.svelte             │  ◄── único punto de entrada
                │   (componente + barrel)          │      del consumidor
                └──────────────────────────────────┘
                              │
                              │ usa
                              ▼
   ┌──────────────────────┐         ┌──────────────────────────┐
   │  Cascada genérica    │ ──┐     │  Modo vista en fila      │
   │  (_treeAdapter/)     │   │     │  (_asRow/)               │
   │                      │   │     │                          │
   │  00 ComplexControl   │   │     │  00 TARowBase            │
   │  00 Context          │   │     │  01 TreeRowViewAdapter   │
   │  01 Contract         │   │     │     (clase final)        │
   │  02 Model            │   │     │                          │
   │  03 Tree             │   │     │  _rowItem.svelte         │
   │  04 View             │   │     │                          │
   │  05 Mutations        │   │     │  _rowAdapter/            │
   │  06 Roles  ───┐      │ <─┘     │   00 TRABase             │
   └──────────────│───────┘  extiende│   01 TRADrag             │
                  │                  │   02 TreeRowAdapter      │
                  │                  └──────────────────────────┘
                  │                                ▲
                  └────────── usa INode/ITreeData ─┘
                              (definidos en _rowAdapter/00-base.ts)
```

**Detalles por carpeta:**
- `_treeAdapter/` — capas agnósticas del modo de vista. Detalle en [`_treeAdapter/__TreeAdapter.md`](_treeAdapter/__TreeAdapter.md).
- `_asRow/` — modo de vista en forma de fila. Detalle en [`_asRow/__asRow.md`](_asRow/__asRow.md).
- `_asRow/_rowAdapter/` — controlador por fila (drag, eventos). Detalle en [`_asRow/_rowAdapter/__RowAdapter.md`](_asRow/_rowAdapter/__RowAdapter.md).

### Invariante estructural

> **Cascada estricta:** un índice **NUNCA** importa de un índice mayor en la misma carpeta. Si la capa inferior necesita la API de una superior, declara `abstract` y deja que la herencia cierre el contrato. Vale para `_treeAdapter/`, `_asRow/` y `_asRow/_rowAdapter/`.

---

## Archivos

No hay `index.ts`. Importar siempre desde `TreeRowView.svelte`:

| Archivo | Rol |
| ------- | --- |
| `TreeRowView.svelte` | Componente raíz + barrel. Define `TreeViewProps`, `TreeViewSlots`. Re-exporta: `TreeRowViewAdapter`, `TreeRowAdapter`, `TreeNodeUX`, `ComplexControl`, `INode`, `ITreeData`, `objRootsToNodes`, `groupedWithSeparators`. |
| `_asRow/_rowItem.svelte` | Fila recursiva (`<details>`/`<summary>` + `FloatingComponent`). Se invoca a sí misma vía `<svelte:self>`. |
| `_asRow/00-treeAdapterAsRow.ts` | `TARowBase`: plomería del modo fila. |
| `_asRow/01-treeAdapterAsRowEvents.ts` | `TreeRowViewAdapter`: clase final que el consumidor extiende. |
| `_asRow/_rowAdapter/00-base.ts` | `TRABase` + tipos `INode<T>`/`ITreeData<T>` + helpers `objRootsToNodes`/`groupedWithSeparators`. |
| `_asRow/_rowAdapter/00-node-mixin.ts` | `TreeNodeUX(BaseClass)` — mixin que añade los campos del nodo. |
| `_asRow/_rowAdapter/01-drag.ts` | `TRADrag` — drag & drop por fila. |
| `_asRow/_rowAdapter/02-events.ts` | `TreeRowAdapter` — eventos (click/dblclick/focus/keydown/toggle). |
| `_asRow/_rowAdapter/index.ts` | Barrel interno del row adapter (consumido SOLO por `TreeRowView.svelte`). |
| `_treeAdapter/002-complex-control.ts` | `ComplexControl<TCtx>` — base reactiva genérica. |
| `_treeAdapter/00-context.ts` | Estado interno y acceso a props. |
| `_treeAdapter/01-contract.ts` | Contrato público abstracto. |
| `_treeAdapter/02-model.ts` | Estado del modelo. |
| `_treeAdapter/03-tree.ts` | Árbol: build/flatten/find/CRUD bajo nivel. |
| `_treeAdapter/04-view.ts` | Selección, foco, expand/collapse, flash (sin DOM). |
| `_treeAdapter/05-mutations.ts` | Add/move/reorder/delete/edit. |
| `_treeAdapter/06-roles.ts` | Sistema actoral + warden + freezer/monarchy. |

---

## Tipos principales

### `INode<T>` (definido en `_asRow/_rowAdapter/00-base.ts`)

Nodo del árbol para la vista. Propiedades:

| Propiedad | Tipo | Descripción |
| --------- | ---- | ----------- |
| `id` | `string` | ID normalizado (sin prefijos `_UP_`/`_M_`). Jerárquico con puntos: `"1"`, `"1.2"`, `"1.2.3"`. |
| `ireference` | `string` | Referencia al nodo padre/ancestro lógico. Vacío si no aplica. |
| `obj` | `T` | Objeto de trabajo concreto. |
| `stack` | `TObject` | Objeto stacker (raíz). |
| `label` | `string` | Etiqueta HTML a mostrar. |
| `children` | `INode<T>[]` | Hijos del nodo. |
| `isLeaf` | `boolean` | Es nodo hoja. |
| `isPenultimate` | `boolean` | Es penúltimo nivel. |
| `nextLevelTitle` | `string` | Título del nivel hijo. |
| `isLast` | `boolean` | `true` si es hoja. |
| `istack` | `string` | ID del stacker. |
| `nistack` | `string` | Nombre de la propiedad ID del stacker. |
| `type?` | `string` | Tipo del nodo (consultado por `isGrouper`/`isActionGrouper`). |
| `acceptsChild?` | `(child) => boolean` | Veto fino en drop. |
| `sortChildren?` | `(children) => children` | **Obligatorio** en agrupadores `freezer`/`monarchy`. |
| `canPlaceChildAt?` | `(child, idx) => boolean` | Veto de posición. |
| `freeze?` | `() => boolean` | **Obligatorio** en hijos bajo `monarchy`. |

### `ITreeData<T>`

```ts
interface ITreeData<T extends ITreeData<T> & TObject> extends INode<T> {
   children: T[];
   [k: string]: any;
}
```

F-bounded polymorphism. La index signature permite que clases concretas sumen propiedades de dominio.

### Sistema actoral (`node.obj.actor`)

Cadena en kebab-case con roles separados por espacios. Múltiples roles permitidos:

| Rol | Semántica resumida |
| --- | ------------------ |
| `atom` | Hoja conceptual; nunca caret. |
| `group` | Inferido si declara cualquier rol agrupador. |
| `warden` | Transforma el `WardenDraft` del descendiente. |
| `prison` | Agrupador con osmosis + acción "Liberar". |
| `cell` | Agrupador con osmosis; se extingue con sus hijos. |
| `hermetic` | Agrupador sellado (sin osmosis). |
| `freezer` | Tautológico: congela TODOS los descendientes. Requiere `sortChildren`. |
| `monarchy` | Contingente: cada descendiente decide vía `freeze()`. Requiere `sortChildren`. |

Detalle completo en [`_treeAdapter/__TreeAdapter.md`](_treeAdapter/__TreeAdapter.md#capa-06-rolests--sistema-actoral).

---

## `TreeRowView.svelte`

### Directiva

```svelte
<svelte:options accessors={true} />
```

### Genéricos

```ts
generics="Stacker extends TObject, TWorking extends ITreeData<TWorking> & TObject"
```

### `TreeViewProps<Stacker, TWorking>`

Extiende `FormularioProps<Stacker>`:

| Prop | Tipo | Default | Descripción |
| ---- | ---- | ------- | ----------- |
| `CatalogoController` | `TControllerCatalogoGen<TWorking> & ICtxGrid & ICtxAction` | requerido | Controlador CRUD de nodos. |
| `TreeController` | `TreeRowViewAdapter<Stacker, TWorking>` | requerido | Instancia concreta del adapter. |
| `Obj` | `Stacker` | requerido | Stacker (objeto padre). |
| `itdForm` | `TDForm` | requerido | Estado del formulario (`"view"`/`"edit"`/`"create"`). |
| `brapido` | `boolean` | `false` | Modo rápido (oculta toolbar de agregar raíz). |
| `small` | `boolean` | `false` | Tamaño compacto. |
| `readonly` | `boolean` | `false` | Solo lectura. Fuerza `itdForm = "view"`. |
| `disabled` | `boolean` | `false` | Deshabilita interacción. |
| `showToolbar` | `boolean` | `true` | Muestra/oculta barra de herramientas. |
| `bAllowed` | `{ Crear?, Modificar?, Eliminar?, Visualizar? }` | `undefined` | Permisos. |
| `bdrag` | `boolean` | `true` | Habilita drag-and-drop. |
| `objWorking` | `INode<TWorking> \| null` | `null` | Nodo seleccionado (bindable). |
| `addReferenceId` | `string \| null` | `null` | Interno. |
| `resourceSelectorOpen` | `boolean` | — | Interno. |

### `TreeViewSlots`

| Slot | Props | Uso |
| ---- | ----- | --- |
| `default` | `treeToolbar`, `sizew`, `showEliminar` | Reemplaza la toolbar por defecto. |
| `pre` | `treeToolbar`, `sizew`, `showEliminar` | Contenido antes del cuerpo. |
| `Frm` | `frmObj`, `small`, `itdForm`, `brapido` | Formulario del drawer. |

### Re-exports (barrel)

```ts
export {
   ComplexControl,         // _treeAdapter/002-complex-control
   TreeRowViewAdapter,     // _asRow/01-treeAdapterAsRowEvents
   TreeRowAdapter,         // _asRow/_rowAdapter/02-events
   TreeNodeUX,             // _asRow/_rowAdapter/00-node-mixin
   groupedWithSeparators,  // _asRow/_rowAdapter/00-base
   objRootsToNodes,        // _asRow/_rowAdapter/00-base
};
export type { INode, ITreeData };
```

### UI (esquema)

```text
TouchGestures
└── span.isp-tree-host
    └── FlexLayout (column)
        ├── [slot default] | FlexOptions toolbar
        ├── [slot pre]
        └── FlexLayout.isp-tree-body (role="tree")
            └── RowItem (recursivo)
        └── ActionDrawer (editRowShow)
            └── AccionesGen → slot Frm
    └── Modal (bshowEliminar)
```

### Clases CSS (`:global` desde `span.isp-tree-host`)

| Clase | Elemento |
| ----- | -------- |
| `.isp-tree` | Contenedor raíz. |
| `.isp-tree-body` | Cuerpo scrollable. |
| `.isp-tree-focus-scope` | Scope de foco. |
| `.isp-tree-toolbar` | Toolbar superior. |
| `.isp-tree-frm-body` | Cuerpo del drawer. |

---

## `_rowItem.svelte`

### Genéricos

```ts
generics="TWorking extends ITreeData<TWorking> & TObject"
```

### `RowItemProps<TWorking>`

| Prop | Tipo | Descripción |
| ---- | ---- | ----------- |
| `treeController` | `TreeRowViewAdapter<any, TWorking>` | Adapter del árbol. |
| `nodes` | `INode<TWorking>[]` | Nodos a renderizar en este nivel. |
| `rowLayoutEpoch` | `number` | Epoch para forzar re-render. |

### `RowItemAdapterBridge<TWorking>`

Extiende `RowItemProps` con:
- `node` (getter) — nodo actual del `{#each}`.
- `nodes` (getter/setter) — lista del nivel.
- `onUiTouch` (getter) — callback de re-render.
- `rowLayoutEpoch` (getter/setter).

### Render por nodo

```svelte
{#each nodes as node (node.id)}
   {@const rowController = treeController.getOrCreateRowAdapter(bridge)}
   <div data-tree-row-id={id} data-idrow={id}>
      <FloatingComponent showfloat={hasRowTools && (showActions || isHighlighted)}>
         <details.trvwr-itm open={isNodeOpen}>
            <summary.trvwr-itm-sum>
               {#if rowController.isDraggable}
                  <span class="trvwr-drag-handle" draggable />
               {/if}
               {#if rowController.showCaret}
                  <span class="trvwr-itm-symb">…caret + folder…</span>
               {:else if rowController.rowIcono}
                  <span class="trvwr-itm-lead">…icono lead…</span>
               {/if}
               <span class="trvwr-itm-content">{@html node.label}</span>
            </summary>
            {#if hasChildren && isNodeOpen}
               <svelte:self {treeController} {rowLayoutEpoch} nodes={node.children} />
            {/if}
         </details>
         <FlexOptions slot="float" actions={filteredActions} more={cascadeOptions} />
      </FloatingComponent>
   </div>
{/each}
```

### Reglas de visibilidad

- **Drag handle:** `rowController.isDraggable` ⇔ `!isViewMode && !mergedDisabled && !isFrozen`.
- **Caret:** `rowController.showCaret` ⇔ `!isAtom(node) && hasChildren`.
- **Lead icon:** se pinta si NO hay caret y hay icono.
- **Acciones flotantes:** `showActions || isHighlighted` (gobernado por `sync()` del row adapter).

### Interacción

- **Drag handle**: `<span class="trvwr-drag-handle" draggable>` delega `ondragstart`/`ondragend` al `rowController`.
- **Click en chevron** (`.trvwr-itm-symb`): toggle expand/collapse, no navega.
- **Click en fila**: selecciona nodo, aplica foco.
- **Doble click / Enter**: abre drawer (vista o edición).
- **Long press (touch)**: equivale a doble click.

### Clases CSS clave

| Clase | Descripción |
| ----- | ----------- |
| `.trvwr-row-host` | `display: contents`. |
| `.trvwr-itm` | `<details>`. |
| `.trvwr-itm-sum` | `<summary>`. |
| `.trvwr-itm-sum--focused` | Outline cuando `isHighlighted`. |
| `.trvwr-itm-sum--disabled` | Opacidad reducida. |
| `.trvwr-itm-sum--drg-bf` / `--drg-aftr` | Drop antes/después. |
| `.trvwr-itm-sum--drg-forbidden-bf` / `--drg-forbidden-aftr` | Drop prohibido. |
| `.trvwr-itm--dragging` | Mientras se arrastra. |
| `.highlight` | Fila seleccionada. |
| `.should-flash` | Animación flash. |
| `.trvwr-drag-handle` | Handle de arrastre. |
| `.trvwr-itm-symb` | Caret + folder icon. |
| `.trvwr-itm-lead` | Icono lead. |
| `.trvwr-itm-content` | Label. |
| `.trvwr-itm-children-wrap` | Wrapper con `transition:slide`. |

### Variables CSS por fila (inline en `<details style>`)

| Variable | Valor |
| -------- | ----- |
| `--trvwr-hvr-dflt` | `mkAlpha("color", 92)` — hover. |
| `--trvwr-ctv-dflt` | `mkAlpha("color", 86)` — active. |
| `--trvwr-hghlght-bg` | `mkAlpha("primary", 88)` — fila seleccionada. |
| `--trvwr-hghlght-hvr-bg` | `mkAlpha("primary", 80)` — hover sobre seleccionada. |
| `--trvwr-swp-bg` | `mkAlpha("success", 70)` — swipe. |
| `--trvwr-fcs-rng` | `mkAlpha("primary", 45)` — focus ring. |
| `--trvwr-drp-ndctr-bg` | `mkAlpha("primary", 80)` — indicador drop. |
| `--trvwr-drp-ndctr-hght` | Altura del placeholder de drop. |

---

## `_asRow/_rowAdapter/` — `TreeRowAdapter`

Clase concreta instanciada por cada nodo visible. Detalle en [`_asRow/_rowAdapter/__RowAdapter.md`](_asRow/_rowAdapter/__RowAdapter.md). Resumen:

### Cascada

```text
TRABase (00-base.ts)  + TreeNodeUX mixin (00-node-mixin.ts)
   ▲
TRADrag (01-drag.ts)
   ▲
TreeRowAdapter (02-events.ts)
```

### Estado público mutable

| Propiedad | Tipo | Descripción |
| --------- | ---- | ----------- |
| `dragOver` | `"before" \| "after" \| "into" \| null` | Indicador de drop. |
| `dragForbidden` | `boolean` | Drop inválido (mismo nodo / descendiente / sin permiso). |
| `dragEnterCount` | `number` | Contador de `dragenter`/`dragleave`. |
| `dragPlaceholderHeight` | `number` | Altura del placeholder. |
| `filteredActions` | `FlexOptionsInput[]` | Acciones visibles (filtradas por `isFirst/isLast/isFrozen`). |
| `cascadeOptions` | `FlexOptionsInput[]` | Cascade options. |
| `hasRowTools` | `boolean` | Tiene acciones o cascade. |
| `showActions` | `boolean` | `hasRowTools && focusedRowId === id`. |
| `longPressTimer` | timeout | Timer de long press. |

### Getters derivados (selección)

| Getter | Descripción |
| ------ | ----------- |
| `id` | ID normalizado. |
| `hasChildren` | `node.children?.length > 0`. |
| `isNodeOpen` | Está expandido. |
| `nodeDisabled` | Está en `disabledNodes`. |
| `mergedDisabled` | `nodeDisabled \|\| adapter.disabled \|\| config.disabled`. |
| `isFrozen` | `treeAdapter.isFrozen(node)` — bloquea movimiento. |
| `showCaret` | `!isAtom && hasChildren`. |
| `isDraggable` | `!isViewMode && !mergedDisabled && !isFrozen`. |
| `rowIcono` | `{ icon, rest, mergedStyle }` parseado. |
| `isHighlighted` | Es focusedRow o (sin foco) selectedRow. |
| `siblingPos` | `{ isFirst, isLast }`. |
| `effectiveRowConfig` | Merge de `defaultRowConfig` + `getRowConfig`. |

### `filterRowActions`

Quita `mdi:arrow-up` si `isFirst` y `mdi:arrow-down` si `isLast`. Con `isFrozen`, quita ambos.

### `effectiveRowConfig` — lógica de merge

```ts
get effectiveRowConfig(): TreeRowConfig {
   const fallback = this.defaultRowConfig(node);
   const cfg = this.treeAdapter.getRowConfig(node) ?? {};
   return {
      ...fallback,
      ...cfg,
      actions: cfg.actions?.length ? cfg.actions : fallback.actions,
      cascadeOptions: cfg.cascadeOptions?.length ? cfg.cascadeOptions : fallback.cascadeOptions,
      events: { ...fallback.events, ...cfg.events },
   };
}
```

### Eventos de teclado (`onkeydown`)

| Tecla | Acción |
| ----- | ------ |
| `ArrowDown` | Foco al siguiente. Con `Ctrl`: mover abajo. |
| `ArrowUp` | Foco al anterior. Con `Ctrl`: mover arriba. |
| `ArrowRight` | Expandir nodo. |
| `ArrowLeft` | Colapsar nodo. |
| `Home` | Foco al primer visible. |
| `End` | Foco al último visible. |
| `Enter` | Abrir drawer. Con `Ctrl`: `onCtrlEnter`. |
| `Insert` | Agregar hermano debajo. |
| `Delete` | Eliminar nodo. |

### `objRootsToNodes()`

```ts
function objRootsToNodes<T>(roots: readonly T[], labelFn?: (obj: T) => string): INode<T>[]
```

Convierte objetos `ITreeData` jerárquicos en `INode[]` para la vista (normaliza IDs, aplica `labelFn`, copia flags, recurre).

---

## `TreeRowViewAdapter` — capa final del adapter

Resumen (detalle en [`_asRow/__asRow.md`](_asRow/__asRow.md)). El consumidor extiende esta clase.

### Estado heredado clave

| Propiedad | Descripción |
| --------- | ----------- |
| `_selectedId` | ID del nodo seleccionado. |
| `_focusedNodeId` | ID con foco. |
| `_item` / `_originalItem` | Item seleccionado + clon original (dirty check). |
| `_treeNodes` | Roots construidos. |
| `_expandedNodes` | Nodos expandidos. |
| `flashIds` | IDs en flash temporal. |
| `rowAdapters` | `Map<id, TreeRowAdapter>`. |
| `rowLayoutEpoch` | Store de epoch para forzar relayout. |

### Configuración inyectable

```ts
interface TreeRowViewAdapterConfig {
   floatCard?: { tx?, ty?, scale? };
}
adapter.applyAdapterConfig({ floatCard: { tx: "1rem", ty: "-1em", scale: 0.8 } });
```

### Métodos abstractos (subclase debe implementar)

Heredados del contrato genérico (`_treeAdapter/01-contract.ts`):

| Método | Firma |
| ------ | ----- |
| `createNode` | `(data) => TWorking` |
| `get stack` | `Stacker` |
| `get stackList` / `set` | `TWorking[]` |
| `get istack` / `nistack` | `string` |
| `nodeCtor` / `nidNode` | constructor / nombre |
| `getlevelname` | `(nivel?, record?) => string` |
| `getEditDriverAttrs` / `getEditAttrsForLevel` | atributos editables |
| `canEditSelectResource` | `(plan, draft) => boolean` |
| `getEditAtributoValor` / `setEditAtributoValor` | accesos al draft |
| `setEditRecursoSelected` | asigna recurso |
| `applySelection`, `resyncExpandedToCurrentTree`, `syncAllRowAdapters`, `onrefresh` | ciclo de vida |

### Métodos públicos principales (cierre concreto)

#### Construcción del árbol (`_treeAdapter/03-tree.ts`)

| Método | Descripción |
| ------ | ----------- |
| `buildTree(planes)` | Árbol jerárquico desde lista plana. |
| `flattenTree(roots)` | Aplana DFS y reasigna IDs. |
| `onrefresh()` | Reconstruye `_treeNodes` desde `stackListNodes` + dispara `applyDefaultExpansion` la primera vez. |

#### Selección y foco

| Método | Descripción |
| ------ | ----------- |
| `setSelectedId(id)` | Selecciona, foca, sincroniza. |
| `applySelection(edit)` | Muta `_selectedId`/`_item`. |
| `onensurefirstselection()` | Auto-selecciona si nada seleccionado. |
| `focusRowById(id)` | Foco DOM (microtask + rAF). |
| `refocusFocusedRowSummary()` | Re-foca con reintentos (hasta 6 frames). |
| `blurTreeSummariesExcept(el)` | Quita foco a otros `<summary>`. |

#### Expansión

| Método | Descripción |
| ------ | ----------- |
| `expandAll()` | Expande todo. |
| `collapseAll()` | Colapsa todo. |
| `applyDefaultExpansion()` | Expande según `shouldAutoExpand` (idempotente). |
| `shouldAutoExpand(node)` (protected) | Default: `isGrouper`; override en subclase. |

#### CRUD

| Método | Descripción |
| ------ | ----------- |
| `onaddroot()` | Crea raíz, refresh, abre drawer. |
| `onaddchild(refId)` | Crea hijo. |
| `onaddsibling(id, pos)` | Crea hermano arriba/abajo. |
| `handleaddchild(refId)` | Wrapper + flash. |
| `handleaddsibling(id, pos)` | Wrapper + flash. |
| `requestDelete(node)` | Modal de confirmación. |
| `ondeleteconfirmed()` | Ejecuta + refresh. |
| `openEdit(node)` / `openViewNode(node)` | Drawer. |
| `oneditaccept(node)` | Confirma edición. |

#### Reorden

| Método | Descripción |
| ------ | ----------- |
| `move(id, dir)` | ↑/↓ entre hermanos. |
| `reorder(srcId, tgtId, pos)` | Drag-and-drop. |
| `nestInto(srcId, tgtId)` | Anida. |
| `commitAndFlash(id)` | Selecciona + flash + sync. |

#### Toolbar

| Método | Descripción |
| ------ | ----------- |
| `getToolsBarActions()` | `FlexOptionsAction[]`: agregar raíz, colapsar, expandir. |
| `getAddRootLabel()` | Etiqueta del botón (usa `getlevelname(1)`). |

#### Row adapters

| Método | Descripción |
| ------ | ----------- |
| `getOrCreateRowAdapter(bridge)` | Idempotente. |
| `registerRowAdapter` / `unregisterRowAdapter` | Map. |
| `disposeRowAdapterById(id)` | Destruye uno. |
| `syncAllRowAdapters()` | `sync()` masivo + `rowLayoutEpoch++`. |

#### Drawer

| Método | Descripción |
| ------ | ----------- |
| `bindParentData(setShowFrm, showFrmModificar, showFrmVisualizar, showEliminar)` | Conecta callbacks. |
| `closePlanDrawer()` | Hook. |
| `createEditDraft(plan)` | Clon para edición. |
| `syncEditTitleToTree(plan, title)` | Sync de título. |
| `onEditDrawerAccept(draft)` / `onEditDrawerClose(plan, draft)` | Cierre. |

#### `getRowConfig(node)` — corazón de la fila

Retorna `TreeRowConfig | null` con:

- **Icono**: por default según `isLastNode`/`hasChildren`/`isFolder`. Override por `getNodeIcon(node, ctx)`.
- **Acciones** (compuestas en orden):
  1. `actorActions(node)` — del rol propio (`prison` aporta "Liberar").
  2. `wardenDraft(node).actions` — pipeline closest→farthest.
  3. `particularactionsrow(node)` — del consumidor.
  4. Por modo: ver formulario (en `viewMode`), eliminar (si no `isPrison`-only).
- **Cascade**: editar, añadir hermano arriba/abajo, `wardenDraft.cascadeOptions`, `particularcascadeoptionsrow`.
- **Draggable**: `bdrag && !isReadOnly` (filtrado adicional por `isFrozen` en el row adapter).
- **Events.onleadiconclick**: en folder vacío → `handleaddchild`.

#### `onstateupdate(ctx)` — ciclo de sincronización

Llamado reactivamente por `TreeRowView.svelte`:

```text
syncTreeViewBindState(ctx)   sincroniza objWorking adapter→vista, auto-selecciona si vacío
Object.assign(context, ctx)  actualiza contexto
onchangecurso()              detecta cambio de stacker, resetea expansión
onbranchexpand()             auto-expande raíces (primera vez)
onprocessobj()               procesa selección
onupdate()                   refresh si rootNodes cambió
ontouchitem()                hook subclases
onensurefirstselection()     selecciona primero si nada
if (itdForm/readonly) → syncAllRowAdapters()
```

---

## Flujo reactivo en `TreeRowView.svelte`

```text
$: TreeController.onstateupdate({ Obj, itdForm, small, brapido, bdrag, ... })
$: TreeController.bindParentData(setShowFrm, showFrmModificar, showFrmVisualizar, showEliminar)
$: rootNodes = TreeController.rootNodes   // re-evaluado con $rowLayoutTickStore
```

---

## Integración con otros `_comps`

| Componente | Uso |
| ---------- | --- |
| `FlexOptions` (`Options/`) | Toolbar global + acciones flotantes. |
| `FloatingComponent` (`containers/`) | Card flotante de acciones por fila. |
| `TouchGestures` (`containers/`) | Wrapper de gestos swipe. |
| `ActionDrawer` (ISP) | Drawer lateral del formulario. |
| `AccionesGen` (ISP) | Controlador CRUD del drawer. |
| `ComplexControl` (`_treeAdapter/002-complex-control.ts`) | Base reactiva para adapter y row adapter. |

### Diagrama de componentes

```text
TreeRowView.svelte
├── TouchGestures
│   └── FlexOptions (toolbar)
│   └── _rowItem.svelte (recursivo)
│       ├── FloatingComponent
│       │   ├── <details>/<summary>
│       │   └── FlexOptions (slot="float", + cascade)
│       └── <svelte:self> (hijos)
│   └── ActionDrawer
│       └── AccionesGen → slot Frm
└── Modal (eliminar)
```

---

## Referencia de consumo

```svelte
<script lang="ts">
   import TreeView, {
      TreeRowViewAdapter,
      TreeNodeUX,
      type INode,
      type ITreeData,
   } from ".../_comps/TreeView/TreeRowView.svelte";

   class MiUX extends TreeNodeUX(TMiPlan) {}

   class MiAdapter extends TreeRowViewAdapter<TMiCurso, MiUX> {
      constructor() {
         super(/* … */);
         this.applyAdapterConfig({ floatCard: { tx: "1rem", ty: "-1em", scale: 0.8 } });
      }
      // … contrato (createNode, stack, getlevelname, etc.)
      protected override getNodeIcon(node, { isLastNode }) {
         return isLastNode ? null : { icon: "mdi:database-outline" };
      }
   }

   let treeControl = new MiAdapter();
   let catalogoController = wrapCatalogo(new MiController(() => treeControl.obj));

   $: treeControl.obj = Obj;
</script>

<TreeView
   bind:objWorking={treeControl.objWorking}
   {Obj} {itdForm} {brapido} {small} {readonly} {bAllowed}
   CatalogoController={catalogoController}
   TreeController={treeControl}
>
   <MiFormulario slot="Frm" let:frmObj let:small let:itdForm />
</TreeView>
```

> **Reactividad:** `treeControl.obj = Obj` invoca `onrefresh()` sincrónicamente, pero **no** incrementa `rowLayoutEpoch`. Si la vista depende de `treeNodes.length`, léelo después de la asignación o usa `$rowLayoutEpoch` como dependencia del `$:`.

---

## Dependencias ISP

`FlexLayout`, `Text`, `Iconify`, `mkAlpha`, `resolveColor`, `Button`, `H3`, `Input`, `Modal`, `ActionDrawer`, `AccionesGen`, `Card` — desde `@ingenieria_insoft/ispsveltecomponents`.

`TObject`, `TControllerCatalogoGen` — desde `@ingenieria_insoft/ispgen`.

---

## Reglas de oro (resumen)

1. **Cascada estricta** en `_treeAdapter/`, `_asRow/` y `_asRow/_rowAdapter/`: nunca importar de un índice mayor.
2. **Una sola clase por archivo.** Sin mezcla de capas.
3. **El barrel es `TreeRowView.svelte`**. No reintroduzcas un `index.ts` raíz.
4. **Roles fuera del modo de vista.** Toda lógica actoral vive en `_treeAdapter/06-roles.ts`.
5. **Plomería del modo fila en `_asRow/00`, UI en `_asRow/01`.** El consumidor extiende solo `TreeRowViewAdapter` (la clase final de `01`).
6. **Svelte 4.** Sin runas, sin snippets. La reactividad la pone el `.svelte` consumidor.
