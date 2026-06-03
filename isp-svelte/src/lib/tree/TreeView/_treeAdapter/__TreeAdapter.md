# `_treeAdapter/` — Cascada del controlador del árbol

`TreeAdapter` (alias de `TreeRowViewAdapter` en `../_asRow/01-treeAdapterAsRowEvents.ts`)
es la clase final concreta que el consumidor extiende. Se construye **por
cascada**: cada archivo numerado hereda del anterior y aporta una sola
responsabilidad. La cascada se cierra en `../_asRow/`.

```
TTreeAdapterContext        00-context.ts
        ▲
TTreeAdapterContract       01-contract.ts
        ▲
TAModel                    02-model.ts
        ▲
TATreeShape                03-tree-shape.ts        ← customs, createNode, materialize, find
        ▲
TATreeFlow                 04-tree-flow.ts         ← buildTree, flatten, commit, saneo
        ▲
TAView                     05-view.ts
        ▲
TAMutations                06-mutations.ts
        ▲
TAHistory                  06b-history.ts          ← undo/redo + protección
        ▲
TARoles                    07-roles.ts
        ▲
TARowBase                  ../_asRow/00-treeAdapterAsRow.ts
        ▲
TreeRowViewAdapter         ../_asRow/01-treeAdapterAsRowEvents.ts   (concreta, exportada como TreeAdapter)
```

`_defgen/` aporta los tipos puros (`INode`, `INodeShape`, `ITreeData`,
`TopologyRole`, `ContainmentRole`, `MobilityRole`, `TreeNode` mixin,
`objRootsToNodes`, `groupedWithSeparators`). Vive aparte para evitar imports
circulares.

## `_defgen/00-tree-data.ts` — tipos y helpers puros

| Símbolo | Rol |
|---|---|
| `INode<T>` | `T & INodeShape<T>` — el modelo enriquecido con los campos de fila. |
| `INodeShape<T>` | Campos crudos (`flatPath`, `childrens`, `pathInit`, `topology`, `containment`, `mobility`, `freeze`) + getters readonly (`isAtom`, `isGroupActor`, `isPrison`, `isHermetic`, `isCell`, `isUnanchored`, `isFreezer`, `isEmpty`). Los getters se decoran al construir el árbol. |
| `ITreeData<T>` | F-bounded poly: `INodeShape<T>` con `childrens: T[]`. |
| `TopologyRole` `"atom" \| "group"` | Dimensión 1 — qué es. |
| `ContainmentRole` `"prison" \| "hermetic" \| "cell"` | Dimensión 2 — cómo trata su contenido. |
| `MobilityRole` `"unanchored" \| "freezer"` | Dimensión 3 — quién puede moverse. |
| `objRootsToNodes(roots, pathInitFn?)` | Decora recursivamente los modelos con los getters de rol y normaliza `flatPath` (sin prefijos `_UP_`/`_M_`). Asigna `pathInit ??= flatPath`. |
| `groupedWithSeparators(groups)` | Aplana grupos intercalando `{separator: true}`. |
| `TreeNode(Base)` | **Mixin opcional.** Devuelve una clase abstracta con todos los campos de nodo persistidos en `this.f` (`TObject`). Incluye los getters readonly y `recomputeHasChildren(siblings, getPath)`. Útil cuando el dominio quiere implementar `ITreeData` directamente. |

`isEmpty` se define como: `topology === "atom" || childrens.length === 0`.

## `00-context.ts` — `TTreeAdapterContext`

Estado interno + acceso a props inyectadas por `TreeRowView.svelte`.

- **`treeRootId`** estable (`tree-${++seq}`) para scoping DOM (`data-tree-root`).
- **Estado por flatPath**: `_selectedFlatPath`, `_focusedFlatPath`,
  `_hoveredFlatPath`, `_pendingDeleteFlatPath`, `_expandedFlatPaths[]`,
  `_treeNodes[]`. Los getters `selectedNode`/`focusedNode`/`hoveredNode`
  resuelven al vuelo vía `findNodeByFlatPath` (las referencias DOM no se
  cachean: el árbol puede haberse reconstruido).
- **Flags derivados de props**: `disabled`, `isViewMode`, `isReadOnly`,
  `puedeCrear`/`puedeModificar`/`puedeEliminar`, `draggable`.
- **`bcanMoveOutside`**: `boolean | (src,tgt,pos) => boolean`. Permite
  bloquear moves que cambian de padre (default `true`).
- **`onstateupdate(ctx)`**: refresca el contexto con `defineProperties`
  (preserva descriptores reactivos).
- Métodos `normalizeFlatPath` y `findNodeByFlatPath` declarados pero no
  implementados aquí (se sobrescriben en `03-tree-shape.ts`).

## `01-contract.ts` — `TTreeAdapterContract` (abstract)

Hooks intermedios + tick UI + flash. Provee implementaciones base no-op para
que las subclases las pisen.

- **UI tick**: `uiTick`, `addUiListener(fn) → unsubscribe`, `notifyUI()` (sync: incrementa `uiTick` + dispara listeners).
- **`rowAdapters: Map<flatPath, TreeRowAdapter>`** — registro de los
  adapters por fila visible.
- **Flash**: `flashFlatPaths`, `flashErrorFlatPaths`, timers de auto-clear.
- **`getReferenceFlatPath(node)`**: padre directo según notación punteada.
- **`getVisibleFlatPaths(nodes, expandedSet)`**: DFS solo expandidos.
- Hooks abstractos a override en capas superiores: `toNode`, `onrefresh`,
  `applySelection`, `resyncExpandedToCurrentTree`, `syncAllRowAdapters`,
  `syncRowAdaptersByFlatPaths`, `createNode`, `listSlave`, `getEditAttrsForLevel`.

## `02-model.ts` — `TAModel` (abstract)

Estado del modelo, drawer, acciones CRUD vía hooks UI.

- **Hooks UI** (los enchufa el `.svelte`): `onrequestopendrawer`,
  `onrequestclosedrawer`, `onrequesteditshow`, `onrequestdelete`, `onError`.
- **`listSlaveNodes`**: `listSlave.map(toNode)` — vista normalizada.
- **Acciones por defecto del catálogo** (`Act*`): `ActInsertar`, `ActEliminar`,
  `ActCrear` (no-op), `ActModificar`, `ActVisualizar` (`Object.assign(slaveNode, found)`),
  `Actualizar`. Cubren la API esperada por el `EntitySlaveController`.
- **`sortChildrens(a,b)`**: orden lexicográfico por último segmento numérico.
- **`getRecordSecurityCode(node)`**: deriva un código de 5 chars (padding `X`)
  desde `iplan`/`idrow` para confirmar eliminación.
- **Show/hide drawer**: `showFrmModificar`, `showFrmVisualizar`, `showEliminar`
  — todos resuelven el `INode` con `findNodeForAction` (busca por `flatPath`,
  luego por `idrow`/`iplan`, luego por identidad `objRow ===`).
- **`postSubmit(o, action)`**: dispatcher que llama
  `ondeleteconfirmed`/`onAfterCatalogModificar` y cierra el drawer.
- **`confirmarEliminar(codigo)`**: gate por código, llama `ActEliminar` +
  `postSubmit("Eliminar")`.

## `03-tree-shape.ts` — `TATreeShape` (abstract)

Forma del árbol: customs, fabricación de nodos, búsqueda y normalización.
**No** se ocupa de orden ni de commit (eso lo hace `TATreeFlow`).

### Customs y runtime

- **`customs?: ITreeCustoms<TListObj>`** — el contrato del consumidor. Totalmente opcional.
- **`buildCustomsRuntime(): ITreeRuntime<TListObj>`** — runtime que el consumer
  recibe en `onexpand`/`oncollapse`/`updateNode`/`menu`/`rowActions`/`toolsBarActions`/`hotkeys`.
  Expone: `record`, `rootNodes`, `findByFlatPath`, `findByPathInit`, `sanitizeFlatPath`,
  mutaciones (`move`, `addChild`, `addSibling`, `openEdit`, `openView`, `remove`,
  `release`, `addRoot`, `collapseAll`, `expandAll`), historial (`historyUndo`,
  `historyRedo`, `historyCanUndo`, `historyCanRedo`, `historyIsViewingPast`),
  protección (`isProtected`, `protectionToggle`, `setProtected`, `canToggleProtection`,
  `isReadOnlyExternal`), roles (`actorActions`, `isFirstSibling`, `isLastSibling`,
  `isPrisonOnly`) y flags (`isReadOnly`, `canMutate`, `puedeCrear`, `puedeModificar`,
  `puedeEliminar`, `draggable`).

### Helpers de path / búsqueda

- **`normalizeFlatPath(id)`** — elimina prefijos `_UP_`/`_M_`, trim.
- **`findByPathInit(pathInit)`** — busca por `pathInit` (ID congelado de la sesión).
- **`findNodeByFlatPath(id, branches?)`** — DFS en el árbol presentación.
- **`findNode(data)`** — encuentra por identidad de objeto.
- **`findReferenceBranchInTree(branches, childId)`** — devuelve el padre.
- **`getNodeByFlatPath(id)`** — atajo `findNodeByFlatPath(id)?.objRow`.
- **`getSiblingPosition(id)`** → `{ isFirst, isLast }`.
- **`walkAncestors(node)`** → array de ancestros (más cercano primero).
- **`siblingsOf(node)`** → hermanos del nodo.

### Construcción / materialización de nodos

- **`createNode(data: TObject): TListObj`** — usa `customs.newItem` si está
  definido; si no, usa `new customs.klass()` y copia atributos; si tampoco hay
  `klass`, **cae a un objeto plano** con `childrens: []`. Si `data.flatPath` o
  `customs.getFlatPath(data)` tiene valor, lo copia.
- **`materializeNode(data)`** — `createNode` + `applyDomainDefaults` +
  `invokeUpdateNode("old")`.
- **`applyDomainDefaults(node)`** — calcula `depth` (puntos en path), inicializa
  `topology ??= "group"`, computa `hasChildren`.
- **`computeNodeHasChildren(flatPath)`** — escanea `listSlave` por parent-prefix.
- **`toNode(data, clone=false)`** — entry para construir un `INode` decorado.

### Drag & drop primitives

- **`canDrop(srcId, tgtId, "before"|"after"|"into")`** — combina roles de
  contención + mobility + `isDescendant` (no permite meter ancestro en
  descendiente) + default `canDropAtRoot`.

## `04-tree-flow.ts` — `TATreeFlow` (abstract)

Flujo del árbol: construir desde lista plana, aplanar, commit y saneo previo a guardado.

### Construcción / aplanado / rebuild

- **`buildTree(planes)`** — hash por path + DFS, **completa ancestros faltantes**
  vía `ensureAncestors` (stub virtual), ordena por `sortChildrens`.
- **`flattenTree(roots)`** — recorrido DFS reasignando IDs incrementales y
  remapeando expandidos vía `idMap`.
- **`rebuildFlatTree(sort?)`** — agrupa por padre, ordena recursivamente,
  vuelca a `listSlave`.

### Commit del árbol al guardar

- **`oncommittreeorder(roots)`** — DFS reasignando IDs. Para cada nodo invoca
  `customs.setFlatPath(node, fp)` (escribe al dominio, p.ej. `iplan`).
- **`prepareTreeForSave(flat, idMap?)`** — vuelca a `listSlave`. Si es `TArray`,
  hace `length=0 + push` (mantiene la misma referencia para reactividad). Si
  no, asigna directo.
- **`commitFlatPaths()`** — `oncommittreeorder` + DFS + `commitTreeForSave`.
  **No llamar desde la UI** — `runCustomsPreSubmit` ya lo invoca.
- **`runCustomsPreSubmit()`** — punto de entrada blindado del guardado:
  ```ts
  async runCustomsPreSubmit() {
     for (const node of this.allNodes) await this.customs?.updateNode?.(node, "old", runtime);
     this.commitFlatPaths();
  }
  ```
  El orden no se puede invertir desde fuera.

### CRUD básico

- **`addNode(data, onDuplicate?)`** — añade si no duplica + rebuild.
- **`updateNode(data, mutate?)`** — encuentra + `Object.assign` + rebuild.
- **`removeNode(data)`** — filtra el subárbol completo + rebuild.

### Refresh / lifecycle

- **`onrefresh()`** — congela `pathInit` desde `customs.getFlatPath` (o
  `flatPath`), reconstruye `_treeNodes` con `objRootsToNodes`, `notifyUI`.
- **`onstateupdate(ctx)`** — sincroniza props, dispara
  `onchangecurso`/`onbranchexpand`/`onprocessobj`/`onupdate`/`ontouchitem`/
  `onensurefirstselection`. Si cambió `itdForm`/`readonly`, sincroniza todos
  los row adapters.
- **`onbranchexpand()`** — expande raíces solo la primera vez.
- **`onprocessobj()`** — selecciona la primera raíz si no hay selección (microtask).
- **`onAfterCatalogModificar()`** — limpia pendings, `onrefresh`, sync.

## `05-view.ts` — `TAView` (abstract)

Selección/foco DOM, expand/collapse, flash.

- **`applySelection(edit)`** — `_selectedFlatPath` + `record`.
- **`setSelectedFlatPath(id, ctx?)`** — selecciona y enfoca.
- **`focusRowByFlatPath(id)`** — busca DOM scope (`data-tree-root`), busca
  `[data-flatpath]`, hace `summary.focus()` con doble intento (microtask + RAF).
- **`refocusFocusedRowSummary()`** — restaura foco con hasta 6 RAFs.
- **`blurTreeSummariesExcept(active)`** — blurr todos los summaries hermanos.
- **`commitAndFlash(id)`** — selecciona + flash + sync.
- **`flashRowFlatPaths(ids, durationMs=650)`** — flash verde.
- **`flashRowErrorFlatPaths(ids, durationMs=650)`** — flash rojo + fuerza
  refresh DOM antes/después.
- **`expandAll()`** — recolecta IDs branch + une al set actual.
- **`collapseAll()`** — `expandedNodes = []`.
- **`expandedNodesAfterToggle(nodes, id, open)`** — pure helper.
- **`restoreExpandedFromSnapshot(ids)`** — restaura desde snapshot pre-eliminación.

## `06-mutations.ts` — `TAMutations` (abstract)

Operaciones del usuario. Cada mutación termina con
`onrefresh + resyncExpandedToCurrentTree + setSelected + syncAllRowAdapters + focusRow`.

- **`onaddroot()`** — añade nodo raíz, abre drawer en modo crear.
- **`openSiblingDrawer(ref, "above"|"below")`** — calcula nuevo `flatPath` como
  hermano, materializa con `kind:"sibling"`, persiste con `ActInsertar`, selecciona.
- **`onaddsibling/handleaddsibling(id, pos)`** — wrapper.
- **`onAddChildLastLevel(refId)`** — guarda `_pendingLastLevelParentFlatPath` y
  delega a `customs.openLastLevelSelector` (selector externo).
- **`onaddchild/handleaddchild(refId)`** — si `customs.shouldOpenLastLevelSelector(parent)`
  retorna `true`, va por el last-level path; si no, materializa hijo normal con
  `kind:"child"`.
- **`onselectlastlevel(records)`** — recibe del selector externo, asigna paths
  secuenciales bajo el padre pendiente, materializa con `kind:"lastLevel"`,
  expande padre.
- **`getNextFlatPath(refId)`** — calcula `parent.X+1` viendo hijos actuales.
- **`move(id, "up"|"down")`** — swap con vecino, `oncommittreeorder`, re-foco.
- **`reorder(srcId, tgtId, "before"|"after")`** — splice cross-padre con guard
  `bcanMoveOutside`.
- **`nestInto(srcId, tgtId)`** — anida `src` como hijo final de `tgt`.
- **`requestDelete(node)`** — toma snapshot de visibles + índice del pending
  para restaurar selección al vecino tras eliminar; abre modal.
- **`ondeleteconfirmed()`** — limpia selection si era el eliminado, refresca,
  fallback al vecino visible.

## `06b-history.ts` — `TAHistory` (abstract)

Undo/Redo + modo protegido. Las mutaciones de `06-mutations.ts` capturan
snapshot antes de aplicar.

### Historial

- **`historyPast` / `historyFuture`** — arrays serializados (límite 50).
- **`historyCanUndo`** / **`historyCanRedo`** / **`historyIsViewingPast`** — getters reactivos.
- **`historyUndo()`** — apila el estado actual en `future`, desapila el último de `past`, restaura.
- **`historyRedo()`** — inverso.
- **`historyRecover()`** — sale del modo "viewing past" volviendo al presente sin perder el future.
- **`captureHistorySnapshot()`** / **`suspendHistory()`** / **`resumeHistory()`** — usados internamente por las mutaciones para registrar puntos atómicos.

### Modo protegido

- **`isProtected`** — `true` si `_protectionMode || historyIsViewingPast`.
- **`canToggleProtection`** — `true` si no es readonly externo.
- **`canMutate`** (override) — `!isReadOnly && !_protectionMode`. Apaga botones de mutación cuando se está revisando historial o el usuario activó "modo lectura".
- **`protectionToggle()`** — encender/apagar. Si ya está protegido, abre un prompt de confirmación antes de liberar.
- **`setProtected(v)`** — set directo.
- **`requestProtectionRelease()`** / **`confirmProtectionRelease()`** / **`cancelProtectionRelease()`** — flujo del prompt.

### Interacción con la cascada superior

- `isReadOnly` se redefine como `super.isReadOnly || historyIsViewingPast`.
  Así, mientras se navega el historial, todas las capas superiores se
  comportan como readonly.

## `07-roles.ts` — `TARoles` (abstract)

Roles compuestos del nodo + acciones de rol + "extinguir".

- **Lectores por dimensión** (delegados a los getters de `INodeShape`): `isAtom`, `isGroupActor`, `isPrison`, `isHermetic`, `isCell`, `isUnanchored`, `isFreezer`.
- **`allowsChildEscape(node)`** — `false` si `hermetic`/`freezer`.
- **`actorActions(node)`** — botones específicos por rol (p.ej. "liberar" para `prison`).
- **`extinguirNodo(record)`** — switch por rol:
  - `prison` (no hermetic) → `onrelease`.
  - `cell` → `promoteChildrenAndDelete`.
  - resto → `onrowdelete` (eliminación normal).
- **`isFrozen(node)`** — `freezer` ancestro o flag `freeze` por nodo.
- **`getRootActor()`** — `"" | "freezer"` para nodos raíz.
- Hooks de override: `onrowtoggle`, `canAddChild`, `onrelease`, `promoteChildrenAndDelete`.

`onrowtoggle` está implementado en `TARowBase` (capa fila): pre-filtra
`isGroupActor && canMutate` y elige `customs.onexpand` (si `open`) u
`customs.oncollapse` (si no) antes de invocar `handler(node, runtime)`.

## Reglas de oro

1. **Si es estructural, va en una capa baja.** No mezcles selección DOM en `03-tree-shape.ts` ni mutaciones en `05-view.ts`.
2. **`runCustomsPreSubmit` es el único punto de entrada para guardar.** La UI no debe llamar `commitFlatPaths` directamente.
3. **`flatPath` muta libre durante moves.** El dominio (`iplan`, etc.) se sincroniza únicamente en `oncommittreeorder` vía `customs.setFlatPath`.
4. **`pathInit` se congela en cada `onrefresh`** desde `customs.getFlatPath`. No mutarlo manualmente.
5. **Roles son 3D ortogonales.** Un nodo `["atom","hermetic","freezer"]` es válido (átomo herméticamente contenido, congelado).
6. **`canMutate` ya combina** `isReadOnly + protectionMode + historyIsViewingPast`. Usar este flag en vez de combinar manualmente.
7. **Svelte 4.** Esta cascada es TS puro; la reactividad va en el `.svelte`.
