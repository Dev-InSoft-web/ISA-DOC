# TreeView — documentación del módulo

> **Mantenimiento:** si actualizas este archivo (`__TreeView.md`), revisa y alinea también la sección **TreeView** en [`../_COMPS.md`](../_COMPS.md).

---

## Rol

Árbol jerárquico reutilizable en **Capacitación**. Proporciona:

- Expansión/colapso de nodos (individual, expandir todo, colapsar todo).
- Fila resaltada (`selectedId` / `focusedRowId` internos en el adapter).
- Flash de confirmación tras reordenar o insertar.
- Barra de herramientas superior con `FlexOptions`.
- Acciones flotantes por fila (`FloatingComponent` + `FlexOptions`) y menú en cascada (`CascadeOptions`).
- Drag-and-drop para reordenar entre hermanos del mismo nivel.
- Gestos táctiles (swipe) vía `TouchGestures`.
- Drawer lateral (`ActionDrawer`) con formulario CRUD integrado vía `AccionesGen`.
- Modal de eliminación con confirmación por código de seguridad.

**No incluye lógica de negocio**. El consumidor aporta una subclase concreta de `TreeAdapter` y un `CatalogoController`.

---

## Archivos (sin barrel)

No hay `index.ts`. Importar siempre el archivo concreto:

| Archivo | Rol |
|---|---|
| `TreeView.svelte` | Componente raíz. Define `TreeViewProps`, `TreeViewSlots`. Contiene la toolbar, el `RowItem` recursivo, el drawer de edición y el modal de eliminación. |
| `_rowItem.svelte` | Fila recursiva. Renderiza `<details>/<summary>` con `FloatingComponent` flotante. Se auto-invoca vía `<svelte:self>` para hijos. Define `RowItemProps`, `RowItemAdapterBridge`. |
| `_treeAdapter/` | Cascada del controlador del árbol (`TreeAdapter`). Construye la clase final abstracta por capas (contexto → contrato → modelo → tree → view → mutaciones → rows). Detalle en [`_treeAdapter/__TreeAdapter.md`](_treeAdapter/__TreeAdapter.md). |
| `_treeAdapter/_rowAdapter/` | Cascada del controlador de fila (`TreeRowAdapter`). Clase final concreta (no abstracta). Detalle en [`_treeAdapter/_rowAdapter/__RowAdapter.md`](_treeAdapter/_rowAdapter/__RowAdapter.md). |

---

## Arquitectura de clases

```
ComplexControl<TCtx>                          (_treeAdapter/00-complex-control.ts)
├── TTreeAdapterContext<Stacker, TWorking>    (abstracta, estado interno)
│   └── TTreeAdapterContract<…>              (abstracta, props de contrato)
│       └── TreeAdapter<Stacker, TWorking>   (abstracta exportada, API pública)
│           └── ContenidosTreeAdapter        (subclase concreta por dominio)
└── TreeRowAdapter<TStacker, TWorking>       (adaptador por fila, instanciado por nodo)
```

---

## Tipos principales

### `INode<T>` (exportado desde `_treeAdapter/_rowAdapter/00-base.ts`, re-exportado por `TreeView.svelte`)

Nodo del árbol para la vista. Propiedades:

| Propiedad | Tipo | Descripción |
|---|---|---|
| `id` | `string` | ID normalizado (sin prefijos `_UP_`/`_M_`). Jerárquico con puntos: `"1"`, `"1.2"`, `"1.2.3"`. |
| `ireference` | `string` | Referencia legacy a un nodo del árbol (no necesariamente el padre directo; el padre real se infiere del `id` con notación de puntos). Vacío si no aplica. |
| `obj` | `T` | Objeto de trabajo concreto (p. ej. `TPlanCursoUX`). |
| `stack` | `TObject` | Objeto padre/stacker (p. ej. `TCurso`). |
| `label` | `string` | Etiqueta HTML a mostrar, generada por `objRootsToNodes`. |
| `children` | `INode<T>[]` | Hijos del nodo. |
| `isLeaf` | `boolean` | Es nodo hoja (último nivel de la estructura). |
| `isPenultimate` | `boolean` | Es penúltimo nivel (sus hijos son hojas/recursos). |
| `nextLevelTitle` | `string` | Título del nivel hijo (para tooltips de "agregar"). |
| `isLast` | `boolean` | `true` si es hoja o leaf. |
| `istack` | `string` | ID del stacker inyectado. |
| `nistack` | `string` | Nombre de la propiedad del ID stacker (p. ej. `"icurso"`). |

### `ITreeData<T>` (exportado desde `_treeAdapter/_rowAdapter/00-base.ts`, re-exportado por `TreeView.svelte`)

Interfaz que el modelo de trabajo debe implementar (F-bounded polymorphism). Extiende `INode<T>`:

```ts
interface ITreeData<T extends ITreeData<T> & TObject> extends INode<T> {
   children: T[];
}
```

### `TreeRowConfig` (interno en `_treeAdapter/_rowAdapter/00-base.ts`)

Configuración visual y de comportamiento para cada fila:

```ts
type TreeRowConfig = {
   icono?: { icon: string; color?: ComponentColor; [k: string]: any };
   disabled?: boolean;
   draggable?: boolean;
   isFirst?: boolean;
   isLast?: boolean;
   actions?: ButtonIconifyProps[];
   cascadeOptions?: FlexOptionsAction[];
   events?: {
      onopen?: () => void;
      onclose?: () => void;
      onfocus?: () => void;
      onblur?: () => void;
      onclick?: () => void;
      onleadiconclick?: () => void;
   };
};
```

---

## `TreeView.svelte`

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
|---|---|---|---|
| `CatalogoController` | `TControllerCatalogoGen<TWorking> & ICtxGrid & ICtxAction` | **requerido** | Controlador CRUD de nodos. |
| `TreeController` | `TreeAdapter<Stacker, TWorking>` | **requerido** | Instancia concreta del adapter del árbol. |
| `Obj` | `Stacker` | **requerido** | Objeto padre (p. ej. `TCurso`). |
| `itdForm` | `TDForm` | **requerido** | Estado del formulario (`"view"`, `"edit"`, `"create"`). |
| `brapido` | `boolean` | `false` | Modo rápido (oculta toolbar de agregar raíz, cascadeOptions). |
| `small` | `boolean` | `false` | Tamaño compacto. |
| `readonly` | `boolean` | `false` | Solo lectura. Fuerza `itdForm = "view"` en el drawer. |
| `disabled` | `boolean` | `false` | Deshabilita interacción. |
| `showToolbar` | `boolean` | `true` | Muestra/oculta barra de herramientas superior. |
| `bAllowed` | `{ Crear?, Modificar?, Eliminar?, Visualizar? }` | `undefined` | Permisos de seguridad. |
| `bdrag` | `boolean` | `true` | Habilita drag-and-drop para reordenar. |
| `objWorking` | `INode<TWorking> \| null` | `null` | Nodo actualmente seleccionado (bindable). |
| `addReferenceId` | `string \| null` | `null` | (interno) ID del nodo de referencia para agregar último nivel. |
| `resourceSelectorOpen` | `boolean` | — | (interno) Indica si el selector de recursos está abierto. |

### `TreeViewSlots`

| Slot | Props expuestas | Uso |
|---|---|---|
| `default` | `treeToolbar`, `sizew`, `showEliminar` | Reemplaza la toolbar por defecto. |
| `pre` | `treeToolbar`, `sizew`, `showEliminar` | Contenido adicional antes del cuerpo del árbol. |
| `Frm` | `frmObj`, `small`, `itdForm`, `brapido` | Formulario de edición dentro del `ActionDrawer`. |

### Flujo reactivo interno

```
$: TreeController.onstateupdate({ Obj, itdForm, small, brapido, bdrag, ... })
    → syncTreeViewBindState()    // sincroniza objWorking adapter → vista
    → Object.assign(context)     // actualiza contexto
    → onchangecurso()            // detecta cambio de stacker
    → onbranchexpand()           // auto-expande raíces (una vez)
    → onprocessobj()             // procesa nodo seleccionado
    → onupdate()                 // refresh si rootNodes cambió
    → ontouchitem()              // hook subclases
    → onensurefirstselection()   // selecciona primer nodo si nada está seleccionado

$: TreeController.bindParentData(setShowFrm, showFrmModificar, showFrmVisualizar, showEliminar)

$: rootNodes = TreeController.rootNodes   // re-evaluado cuando $rowLayoutTickStore cambia
```

### UI

```
TouchGestures (swipe handlers)
└── span.isp-tree-host (display: contents)
    └── FlexLayout (column)
        ├── [slot default] o FlexOptions toolbar
        ├── [slot pre]
        └── FlexLayout.isp-tree-body (role="tree")
            └── RowItem (nodes={rootNodes}, treeController, rowLayoutEpoch)
        └── ActionDrawer (editRowShow)
            └── AccionesGen → slot Frm
    └── Modal (bshowEliminar) — confirmación de eliminación con código
```

### Clases CSS (`:global` desde `span.isp-tree-host`)

| Clase | Elemento |
|---|---|
| `.isp-tree` | Contenedor raíz del árbol. |
| `.isp-tree-body` | Cuerpo scrollable del árbol. |
| `.isp-tree-focus-scope` | Scope de foco para navegación por teclado. |
| `.isp-tree-toolbar` | Barra de herramientas superior. |
| `.isp-tree-frm-body` | Cuerpo del drawer de edición. |

---

## `_rowItem.svelte`

### Genéricos

```ts
generics="TWorking extends ITreeData<TWorking> & TObject"
```

### `RowItemProps<TWorking>`

| Prop | Tipo | Descripción |
|---|---|---|
| `treeController` | `TreeAdapter<any, TWorking>` | Referencia al adapter del árbol. |
| `nodes` | `INode<TWorking>[]` | Lista de nodos a renderizar en este nivel. |
| `rowLayoutEpoch` | `number` | Epoch de layout; fuerza re-render cuando se incrementa. |

### `RowItemAdapterBridge<TWorking>`

Extiende `RowItemProps` con getters/setters reactivos:

- `node` (getter) — nodo actual del `{#each}`.
- `nodes` (getter/setter) — lista de nodos del nivel actual.
- `onUiTouch` (getter) — callback para forzar re-asignación y re-render (`nodes = nodes`).
- `rowLayoutEpoch` (getter/setter).

### Flujo por nodo

```
{#each nodes as node (node.id)}
   {@const rowController = treeController.getOrCreateRowAdapter(bridge)}
   <div data-tree-row-id={id} data-idrow={id}>
      <FloatingComponent showfloat={hasRowTools && (showActions || isHighlighted)}>
         <details.trvwr-itm open={isNodeOpen}>
            <summary.trvwr-itm-sum ...eventos>
               [drag handle] [chevron + icono carpeta | icono hoja] [label]
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

### Interacción

- **Drag handle**: siempre visible (`{#if true}`). El `<span class="trvwr-drag-handle">` tiene `draggable={true}` y delega `ondragstart`/`ondragend` al `rowController`.
- **Click en chevron** (`.trvwr-itm-symb`): toggle expand/collapse, no navega.
- **Click en fila**: selecciona nodo, aplica foco.
- **Doble click / Enter**: abre drawer de edición (o visualización en `view` mode).
- **Long press (touch)**: equivale a doble click.

### Clases CSS clave

| Clase | Descripción |
|---|---|
| `.trvwr-row-host` | `display: contents`. |
| `.trvwr-itm` | `<details>` de cada fila. |
| `.trvwr-itm-sum` | `<summary>` clickable. |
| `.trvwr-itm-sum--focused` | Outline cuando es `isHighlighted`. |
| `.trvwr-itm-sum--disabled` | Opacidad reducida. |
| `.trvwr-itm-sum--drg-bf` / `--drg-aftr` | Indicador de drop antes/después. |
| `.trvwr-itm-sum--drg-forbidden-bf` / `--drg-forbidden-aftr` | Indicador de drop prohibido (distinto padre). |
| `.trvwr-itm--dragging` | Opacidad 0.4 al arrastrar. |
| `.highlight` | Fondo resaltado (`--trvwr-hghlght-bg`). |
| `.should-flash` | Clase para animación flash. |
| `.trvwr-drag-handle` | Handle de arrastre. |
| `.trvwr-itm-symb` | Icono de expansión (chevron + carpeta). |
| `.trvwr-itm-lead` | Icono lead para nodos sin hijos. |
| `.trvwr-itm-content` | Contenido textual (label). |
| `.trvwr-itm-children-wrap` | Wrapper con `transition:slide`. |

### Variables CSS por fila (inline en `<details style>`)

| Variable | Valor |
|---|---|
| `--trvwr-hvr-dflt` | `mkAlpha("color", 92)` — hover. |
| `--trvwr-ctv-dflt` | `mkAlpha("color", 86)` — active. |
| `--trvwr-hghlght-bg` | `mkAlpha("primary", 88)` — fondo de fila seleccionada. |
| `--trvwr-hghlght-hvr-bg` | `mkAlpha("primary", 80)` — hover sobre fila seleccionada. |
| `--trvwr-swp-bg` | `mkAlpha("success", 70)` — swipe. |
| `--trvwr-fcs-rng` | `mkAlpha("primary", 45)` — focus ring. |
| `--trvwr-drp-ndctr-bg` | `mkAlpha("primary", 80)` — indicador de drop. |
| `--trvwr-drp-ndctr-hght` | Altura del placeholder de drop (mín. 24px). |

---

## `_treeAdapter/_rowAdapter/` — `TreeRowAdapter`

Clase instanciada por cada nodo visible. Extiende `ComplexControl`. **No** es un componente Svelte.

### Estado público mutable

| Propiedad | Tipo | Descripción |
|---|---|---|
| `dragOver` | `"before" \| "after" \| null` | Posición del indicador de drop. |
| `dragForbidden` | `boolean` | Drop prohibido (distinto padre). |
| `dragEnterCount` | `number` | Contador de `dragenter`/`dragleave`. |
| `dragPlaceholderHeight` | `number` | Altura del placeholder de drop. |
| `filteredActions` | `ButtonIconifyProps[]` | Acciones visibles (sin flechas en extremos). |
| `hasRowTools` | `boolean` | Tiene acciones o cascadeOptions. |
| `showActions` | `boolean` | `true` si `hasRowTools && focusedRowId === this.id`. |
| `longPressTimer` | timeout | Timer de long press. |

### Getters derivados

| Getter | Descripción |
|---|---|
| `id` | ID normalizado del nodo. |
| `hasChildren` | Tiene hijos. |
| `isNodeOpen` | Está expandido (presente en `expandedNodes`). |
| `nodeDisabled` | Está en `disabledNodes`. |
| `mergedDisabled` | `nodeDisabled \|\| adapter.disabled \|\| config.disabled`. |
| `isDraggable` | No está en viewMode y no está disabled. |
| `rowIcono` | Icono parseado (`{ icon, rest, mergedStyle }`). |
| `isHighlighted` | Es focusedRow o (sin foco) es selectedRow. |
| `isSelected` | Es selectedRow. |
| `shouldFlash` | Está en `flashIds`. |
| `siblingPos` | `{ isFirst, isLast }` — posición entre hermanos. |
| `effectiveRowConfig` | Merge de `defaultRowConfig` + `getRowConfig` del adapter. |
| `onLeadIconClick` | Callback de click en icono lead (carpeta vacía → agregar hijo). |

### `sync()`

Recalcula `filteredActions`, `hasRowTools` y `showActions`. Invocado por `syncAllRowAdapters()`.

### `effectiveRowConfig` — lógica de merge

```ts
get effectiveRowConfig(): TreeRowConfig {
   const fallback = this.defaultRowConfig(node);     // acciones genéricas
   const cfg = this.treeAdapter.getRowConfig(node);   // override del adapter
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
|---|---|
| `ArrowDown` | Foco al siguiente. Con `Ctrl`: mover nodo abajo. |
| `ArrowUp` | Foco al anterior. Con `Ctrl`: mover nodo arriba. |
| `ArrowRight` | Expandir nodo. |
| `ArrowLeft` | Colapsar nodo. |
| `Home` | Foco al primer visible. |
| `End` | Foco al último visible. |
| `Enter` | Abrir drawer de edición. Con `Ctrl`: `onCtrlEnter` (p. ej. ver recurso). |
| `Insert` | Agregar hermano debajo. |
| `Delete` | Eliminar nodo. |

### `objRootsToNodes()` (función exportada)

Convierte un array de objetos `ITreeData` jerárquicos en `INode[]` para la vista:

```ts
function objRootsToNodes<T>(roots: readonly T[], labelFn?: (obj: T) => string): INode<T>[]
```

- Normaliza IDs (strip `_UP_`/`_M_`).
- Aplica `labelFn` para generar el `label` HTML.
- Copia `isLeaf`, `isPenultimate`, `nextLevelTitle`, `isLast`.
- Recurre sobre `children`.

---

## `_treeAdapter/` — `TreeAdapter`

Clase abstracta que centraliza toda la lógica del árbol. Las subclases concretas (p. ej. `ContenidosTreeAdapter`) implementan los métodos abstractos.

### Jerarquía interna

```
TTreeAdapterContext    — estado interno (_selectedId, _focusedRowId, _item, _treeNodes, _expandedNodes, etc.)
└── TTreeAdapterContract  — flashIds, disabledNodes, rowAdapters, rowLayoutEpoch
    └── TreeAdapter       — API pública completa
```

### Estado interno clave (`TTreeAdapterContext`)

| Propiedad | Tipo | Descripción |
|---|---|---|
| `_selectedId` | `string` | ID del nodo seleccionado. |
| `_focusedRowId` | `string` | ID del nodo con foco visual. |
| `_item` | `TWorking \| null` | Objeto de trabajo seleccionado. |
| `_originalItem` | `TWorking \| null` | Clon del item al momento de selección (dirty check). |
| `_treeNodes` | `INode<TWorking>[]` | Nodos raíz construidos. |
| `_expandedNodes` | `INode<TWorking>[]` | Nodos expandidos. |

### Getters públicos importantes

| Getter | Descripción |
|---|---|
| `obj` / `set obj` | Stacker. El setter invoca `onrefresh()`. |
| `rootNodes` / `treeNodes` | `_treeNodes`. |
| `expandedNodes` | `_expandedNodes`. |
| `selectedId` | `INode` del nodo seleccionado (busca en `rootNodes`). |
| `focusedRowId` | `INode` del nodo con foco. |
| `objWorking` | `INode` del item seleccionado (busca en `rootNodes`). |
| `isViewMode` | `itdForm === "view"`. |
| `isReadOnly` | `readonly === true`. |
| `puedeCrear/Modificar/Eliminar/Visualizar` | Desde `bAllowed` (default `true`). |
| `bdrag` | Drag habilitado. |
| `isBrapido` | Modo rápido. |
| `lastLevelSelectorOpen` | Mapea a `context.resourceSelectorOpen`. |
| `addReferenceId` | Mapea a `context.addReferenceId`. |

### Métodos abstractos (subclase debe implementar)

| Método | Firma | Descripción |
|---|---|---|
| `createNode` | `(data: TObject) => TWorking` | Fábrica de nodos concretos. |
| `get stack` | `Stacker` | Acceso al stacker (alias de `obj`). |
| `get istack` | `string` | ID del stacker (p. ej. `icurso`). |
| `get nistack` | `string` | Nombre de la prop ID del stacker. |
| `get stackListNodes` | `TObject[]` | Lista plana de nodos desde el stacker. |
| `getNodeTitle` | `(obj: TWorking) => string` | Lee título del nodo. |
| `setNodeTitle` | `(obj, title) => void` | Escribe título del nodo. |
| `getTitle` | `(node: INode) => string` | Título para display. |
| `prepareInsertSiblingNode` | `() => Partial<TWorking>` | Datos mínimos para hermano temporal. |
| `prepareOpenDrawer` | `(newId, referenceId) => Partial<TWorking>` | Datos para nuevo hermano en drawer. |
| `prepareOnAddChild` | `(nodeId, referenceId) => Partial<TWorking>` | Datos para nuevo hijo. |
| `sortFnBuildTree` | `(a, b) => number` | Comparador de orden (default: `0`). |

### Métodos públicos principales

#### Construcción del árbol

| Método | Descripción |
|---|---|
| `buildTree(planes)` | Construye árbol jerárquico desde lista plana. Mapea por `id` con `.` como separador de niveles. |
| `flattenTree(roots)` | Aplana árbol en lista DFS, reasignando IDs. |
| `onrefresh()` | Reconstruye `_treeNodes` desde `stackListNodes` via `buildTree` + `objRootsToNodes`. |

#### Normalización y búsqueda

| Método | Descripción |
|---|---|
| `normalizeNodeId(id)` | Strip `_UP_`/`_M_` + trim. Acepta `null`/`undefined`. |
| `findNodeById(id)` | Búsqueda pública por ID normalizado. |
| `findBranchById(branches, id)` | Búsqueda recursiva en sub-árbol. |
| `findBranchByObject(branches, obj)` | Búsqueda por igualdad de referencia. |
| `getSiblingPosition(nodeId)` | `{ isFirst, isLast }` entre hermanos. |
| `getNextNodeId(padreId)` | Siguiente ID disponible bajo `padreId`. |

#### Selección y foco

| Método | Descripción |
|---|---|
| `setSelectedId(id)` | Selecciona nodo, aplica foco, sincroniza. |
| `applySelection(edit)` | Muta `_selectedId`, `_item`, `_originalItem`. |
| `onensurefirstselection()` | Auto-selecciona primer nodo si nada está seleccionado. |

#### Expansión

| Método | Descripción |
|---|---|
| `expandAll()` | Expande todos los nodos con hijos. |
| `collapseAll()` | Colapsa todo. |
| `expandedNodesAfterToggle(nodes, id, open)` | Retorna nuevo array de expandidos tras toggle. |

#### CRUD de nodos

| Método | Descripción |
|---|---|
| `onaddroot()` | Crea nodo raíz, refresh, abre drawer. |
| `onaddchild(referenceId)` | Crea hijo. Si el nodo de referencia es penúltimo, invoca `onAddChildLastLevel()`. |
| `onaddsibling(nodeId, pos)` | Crea hermano arriba/abajo. |
| `handleaddchild(referenceId)` | Wrapper de `onaddchild` + `setSelectedId` + `flashRowIds`. |
| `handleaddsibling(nodeId, pos)` | Wrapper de `onaddsibling` + flash. |
| `onselectlastlevel(records)` | Procesa registros del selector de último nivel (recursos). |
| `openEdit(node)` | Abre drawer de edición. |
| `openViewNode(node)` | Abre drawer en modo visualización. |
| `oneditaccept(node)` | `CatalogoController.Actualizar()` + refresh. |
| `requestDelete(node)` | Guarda ID pendiente, muestra modal de eliminación. |
| `ondeleteconfirmed()` | Ejecuta eliminación, refresh, selecciona nodo adyacente. |

#### Reorden

| Método | Descripción |
|---|---|
| `move(nodeId, dir)` | Mueve nodo arriba/abajo entre hermanos. |
| `reorder(sourceId, targetId, pos)` | Reordena por drag-and-drop. |
| `commitAndFlash(id)` | Selecciona + flash + sync. |

#### Toolbar

| Método | Descripción |
|---|---|
| `getToolsBarActions()` | Retorna `FlexOptionsAction[]`: agregar raíz, separador, colapsar, expandir. |
| `getAddRootLabel()` | Etiqueta del botón agregar raíz (usa `getlevelname(1)`). |

#### Row adapters

| Método | Descripción |
|---|---|
| `syncAllRowAdapters()` | Llama `sync()` en cada adapter + incrementa `rowLayoutEpoch`. |
| `getOrCreateRowAdapter(bridge)` | Obtiene o crea `TreeRowAdapter` para un nodo. |
| `registerRowAdapter(adapter)` | Registra adapter en el `Map`. |
| `unregisterRowAdapter(adapter)` | Elimina adapter del `Map`. |
| `blurTreeSummariesExcept(el)` | Quita foco DOM de otros `<summary>`. |

#### Drawer de edición

| Método | Descripción |
|---|---|
| `bindParentData(setShowFrm, showFrmModificar, showFrmVisualizar, showEliminar)` | Conecta callbacks de la vista al adapter. |
| `closePlanDrawer()` | Hook para cerrar drawer (no-op por defecto). |
| `createEditDraft(plan)` | Clon del nodo para edición. |
| `syncEditTitleToTree(plan, title)` | Sincroniza título del draft al árbol. |
| `onEditDrawerAccept(draft)` | Acepta edición + cierra drawer. |
| `onEditDrawerClose(plan, draft)` | Cierra drawer + sincroniza título. |

#### Hooks para edición (overridables)

| Método | Default | Descripción |
|---|---|---|
| `getEditDriverAttrs()` | `[]` | Atributos del driver para el formulario de edición. |
| `getEditAttrsForLevel(attrs, plan)` | passthrough | Filtra atributos por nivel. |
| `canEditSelectResource(plan, draft)` | `!!draft` | ¿Puede seleccionar recurso? |
| `getEditAtributoValor(draft, iatributo)` | `""` | Lee valor de atributo. |
| `setEditAtributoValor(draft, iatributo, valor)` | passthrough | Escribe valor de atributo. |
| `setEditRecursoSelected(draft, record)` | passthrough | Asigna recurso seleccionado. |

#### `getRowConfig(node)` — configuración de fila

Retorna `TreeRowConfig` con:

- **Icono**: carpeta (abierta/cerrada/vacía/plus), archivo, documento. Color dorado para carpetas, gris para vacías, `info` para hojas.
- **Acciones** (array `ButtonIconifyProps`):
  - Mover arriba/abajo (si `puedeModificar && bdrag`, no en viewMode).
  - Editar / Ver formulario (si `puedeModificar || isViewMode`).
  - Agregar hijo (si carpeta, `puedeCrear`, no `brapido`).
  - Acciones particulares del consumidor (`particularactionsrow()`).
  - Eliminar (si `puedeEliminar`).
- **Cascade options**: añadir hermano arriba/abajo.
- **Draggable**: `bdrag && !isReadOnly`.
- **Events**: `onleadiconclick` en carpetas vacías (agregar hijo).

#### `onstateupdate(ctx)` — ciclo de sincronización

Llamado reactivamente por `TreeView.svelte`:

```
syncTreeViewBindState(ctx)   → sincroniza objWorking adapter→vista, auto-selecciona si vacío
Object.assign(context, ctx)  → actualiza contexto
onchangecurso()              → detecta cambio de stacker, resetea expansión
onbranchexpand()             → auto-expande raíces (primera vez)
onprocessobj()               → procesa selección del nodo actual
onupdate()                   → refresh si rootNodes cambió
ontouchitem()                → hook para subclases
onensurefirstselection()     → selecciona primer nodo si nada seleccionado
if (itdForm || readonly changed) → syncAllRowAdapters()
```

---

## Integración con otros `_comps`

| Componente | Uso en TreeView |
|---|---|
| `FlexOptions` (`Options/`) | Toolbar global + acciones flotantes por fila. |
| `FloatingComponent` (`containers/`) | Contenedor flotante para acciones por fila (visible al hacer foco). |
| `CascadeOptions` (`Options/`) | Menú "más opciones" por fila. |
| `TouchGestures` (`containers/`) | Wrapper de gestos swipe en el árbol. |
| `ActionDrawer` (ISP) | Drawer lateral para formulario de edición. |
| `AccionesGen` (ISP) | Controlador CRUD dentro del drawer. |
| `ComplexControl` (`_treeAdapter/00-complex-control.ts`) | Clase base para adapter y row adapter. |

### Diagrama de componentes

```
TreeView.svelte
├── TouchGestures
│   └── FlexOptions (toolbar)
│   └── _rowItem.svelte (recursivo)
│       ├── FloatingComponent
│       │   ├── <details>/<summary> (fila)
│       │   └── FlexOptions + CascadeOptions (slot="float")
│       └── <svelte:self> (hijos)
│   └── ActionDrawer
│       └── AccionesGen → slot Frm
└── Modal (eliminar)
```

---

## Referencia de consumo

### Imports típicos

```ts
import TreeView from ".../_comps/TreeView/TreeView.svelte";
import type { TreeViewProps } from ".../_comps/TreeView/TreeView.svelte";
import type { INode, ITreeData } from ".../_comps/TreeView/_rowAdapter.svelte";
import { TreeAdapter } from ".../_comps/TreeView/_treeAdapter.svelte";
```

### Patrón de uso (componente consumidor)

```svelte
<script lang="ts">
   let treeControl = new MiTreeAdapter();
   let catalogoController = wrapCatalogo(new MiController(() => treeControl.obj));

   $: treeControl.obj = Obj;  // CRÍTICO: sincroniza el stacker con el adapter
</script>

<TreeView
   bind:objWorking={treeControl.objWorking}
   {Obj} {itdForm} {brapido} {small} {readonly} {bAllowed}
   CatalogoController={catalogoController}
   TreeController={treeControl}
>
   <MiFormulario slot="Frm" let:frmObj let:small let:itdForm ... />
</TreeView>
```

> **Nota importante sobre reactividad:** `treeControl.obj = Obj` invoca `onrefresh()` sincrónicamente, pero **no** incrementa `rowLayoutEpoch`. Si la vista depende de `treeNodes.length` (p. ej. para `{#if hasNodes}`), se debe leer el estado directamente después de la asignación o suscribirse a `$rowLayoutEpoch` como dependencia del `$:`.

---

## Dependencias ISP

`FlexLayout`, `Text`, `Iconify`, `mkAlpha`, `resolveColor`, `Button`, `H3`, `Input`, `Modal`, `ActionDrawer`, `AccionesGen`, `Card` — desde `@ingenieria_insoft/ispsveltecomponents`.

`TObject`, `TControllerCatalogoGen` — desde `@ingenieria_insoft/ispgen`.
