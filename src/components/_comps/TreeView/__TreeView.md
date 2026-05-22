# `TreeView/` — Árbol jerárquico reutilizable de Capacitación

Componente raíz [`TreeRowView.svelte`](TreeRowView.svelte) + tipos públicos en
[`contracts.ts`](contracts.ts) + cascada del controlador en
[`_treeAdapter/`](_treeAdapter/__TreeAdapter.md) + cierre concreto en
[`_asRow/`](_asRow/__asRow.md).

No hay barrel: el único punto de entrada del consumidor es `TreeRowView.svelte`,
que re-exporta todos los símbolos públicos.

## Capacidades

- Expansión/colapso individual + `expandAll` / `collapseAll`.
- Selección y foco independientes (`selectedNode`, `focusedNode`, `hoveredNode`).
- Flash de confirmación (verde) y de error (rojo) por `flatPath`.
- Toolbar superior con `FlexOptions` (vía `customs.toolsBarActions(tree)` y `customs.toolsBarCascadeOptions(tree)`).
- Acciones por fila (botones rápidos + menú "más opciones") con `FlexOptions`.
- Drag & drop (reorder entre hermanos + nest "into" + `canDrop` por nodo).
- Roles compuestos por nodo (`topology` + `containment` + `mobility` — tres dimensiones independientes).
- Drawer lateral (`ActionDrawer`) integrado con `AccionesGen` para CRUD por fila.
- Modal de eliminación con confirmación por código de seguridad.
- Atajos de teclado por defecto (flechas, Home, End, Enter, Supr, Insert) + `customs.hotkeys` para combos personalizados.
- **Undo/Redo + modo protegido** (capa `TAHistory`): snapshot por mutación, `historyUndo()`, `historyRedo()`, `protectionToggle()`.
- `customs.updateNode(node, "old", tree)` invocable desde el controlador del catálogo vía `runCustomsPreSubmit()` para sanear nodos antes del guardado.

**No** incluye lógica de dominio. El consumidor aporta:

1. Una clase `TObject` de dominio (`klass: new () => TObject`) o un fabricador (`newItem`). Ambos opcionales; si faltan, el árbol cae a un objeto plano con `childrens: []`.
2. Un objeto `customs: ITreeCustoms<TBase>` con mapeo `flatPath ↔ campo de dominio` (`getFlatPath` / `setFlatPath`) y hooks UI.
3. Opcionalmente una subclase de `TreeAdapter` si necesita pisar comportamiento. Caso simple: el componente crea uno por defecto.

## Archivos

| Archivo / carpeta | Rol |
|---|---|
| [`TreeRowView.svelte`](TreeRowView.svelte) | Componente raíz. Re-exporta `TreeAdapter` (alias de `TreeRowViewAdapter`), `TreeRowAdapter`, `TreeNode`, `groupedWithSeparators`, `objRootsToNodes`, `INode`, `ITreeData`, `ITreeCustoms`, `ITreeRuntime`, `ITreeRowCtx`, `ITreeAction`, `RowOf`. Define `TreeViewProps` y `TreeViewSlots`. |
| [`contracts.ts`](contracts.ts) | Tipos públicos: `ITreeRowCtx`, `RowOf<T>`, `ITreeRuntimeRow<R>` / `ITreeRuntime<TBase>`, `ITreeActionRow<R>` / `ITreeAction<TBase>`, `ITreeCustomsRow<R>` / `ITreeCustoms<TBase>`. |
| [`_treeAdapter/`](_treeAdapter/__TreeAdapter.md) | Cascada del controlador del árbol (9 capas: 00-context → 07-roles + `_defgen/`). |
| [`_asRow/`](_asRow/__asRow.md) | Cierre concreto del adapter en modo "fila": `TARowBase` → `TreeRowViewAdapter`. Adapter por fila en `_rowAdapter/`. |

## Cascada de clases

```
TTreeAdapterContext       _treeAdapter/00-context.ts
        ▲
TTreeAdapterContract      _treeAdapter/01-contract.ts
        ▲
TAModel                   _treeAdapter/02-model.ts
        ▲
TATreeShape               _treeAdapter/03-tree-shape.ts
        ▲
TATreeFlow                _treeAdapter/04-tree-flow.ts
        ▲
TAView                    _treeAdapter/05-view.ts
        ▲
TAMutations               _treeAdapter/06-mutations.ts
        ▲
TAHistory                 _treeAdapter/06b-history.ts
        ▲
TARoles                   _treeAdapter/07-roles.ts
        ▲
TARowBase                 _asRow/00-treeAdapterAsRow.ts
        ▲
TreeRowViewAdapter        _asRow/01-treeAdapterAsRowEvents.ts   (clase concreta, exportada como TreeAdapter)
        ▲
<Subclase consumidora>    (opcional)
```

`TreeRowAdapter` (en `_asRow/_rowAdapter/`) **no** hereda de la cascada anterior.
Es una clase aparte: una instancia por fila visible, registrada en
`TARowBase.rowAdapters: Map<flatPath, TreeRowAdapter>`. Ver
[`_asRow/_rowAdapter/__RowAdapter.md`](_asRow/_rowAdapter/__RowAdapter.md).

## Tipos públicos clave

### `ITreeRowCtx` (`contracts.ts`)

Contrato mínimo que toda fila renderizable debe satisfacer:

```ts
interface ITreeRowCtx extends TObject {
   flatPath: string;                  // ID jerárquico ("1", "1.2", "1.2.3")
   topology?: "atom" | "group";
   containment?: "prison" | "hermetic" | "cell";
   mobility?: "unanchored" | "freezer";
   hasChildren?: boolean;
   isCollapsed?: boolean;
   depth?: number;
}
```

### `INode<T>` y `ITreeData<T>` (`_treeAdapter/_defgen/00-tree-data.ts`)

```ts
type INode<T extends TObject> = T & INodeShape<T>;

interface INodeShape<T extends TObject> {
   flatPath: string;                  // ID actual (cambia al mover/reordenar)
   childrens: INode<T>[];
   pathInit?: string;                 // ID inicial (congelado por commit, ver __TreeAdapter.md)
   topology?: "atom" | "group";
   containment?: "prison" | "hermetic" | "cell";
   mobility?: "unanchored" | "freezer";
   freeze?: boolean;
   readonly isAtom: boolean;
   readonly isGroupActor: boolean;
   readonly isPrison: boolean;
   readonly isHermetic: boolean;
   readonly isCell: boolean;
   readonly isUnanchored: boolean;
   readonly isFreezer: boolean;
   readonly isEmpty: boolean;         // átomo o group sin childrens
   depth?: number;
   hasChildren?: boolean;
}

interface ITreeData<T extends ITreeData<T> & TObject> extends INodeShape<T> {
   childrens: T[];
}
```

Los getters `isAtom`/`isGroupActor`/`isEmpty`/etc. se decoran automáticamente en
`objRootsToNodes` mediante `Object.defineProperties` (con `WeakSet` para evitar
re-decorar).

### `RowOf<T>` (`contracts.ts`)

Tipo derivado que el componente usa como fila aumentada:

```ts
type RowOf<T extends TObject> = T & ITreeData<RowOf<T>> & ITreeRowCtx & {
   pathInit: string;
   isSelected: boolean;
};
```

El consumidor declara su modelo base (`TPlanCurso`) y el componente infiere
`RowOf<TPlanCurso>` internamente. **No es necesario** que el modelo extienda
`ITreeData` manualmente; el adapter mezcla las propiedades de fila al
materializar.

### `TreeNode(Base)` — mixin (opcional)

Si el modelo de dominio quiere implementar `ITreeData` directamente,
`TreeNode(Base)` devuelve una clase abstracta que inyecta los campos de nodo
(`depth`, `isSelected`, `hasChildren`, `isCollapsed`, `flatPath`, `pathInit`,
`topology`, `containment`, `mobility`, `freeze`, `childrens`) persistidos en
`this.f` (campo interno de `TObject`). Incluye los getters readonly de roles y
`recomputeHasChildren(siblings, getPath)`.

### `ITreeRuntime<TBase>` (`contracts.ts`)

Lo que `customs` recibe en `onexpand`/`oncollapse`/`updateNode`/`menu`/`hotkeys`/`rowActions`/
`toolsBarActions`. Incluye:

- `record`, `rootNodes`, `findByFlatPath(path)`, `findByPathInit(pathInit)`, `sanitizeFlatPath(id)`.
- Mutaciones: `move`, `addChild`, `addSibling`, `openEdit`, `openView`, `openViewNode`, `extinguir`, `remove`, `release`, `addRoot`, `collapseAll`, `expandAll`.
- Historial: `historyUndo`, `historyRedo`, `historyRecover`, `historyCanUndo`, `historyCanRedo`, `historyIsViewingPast`.
- Protección: `isProtected`, `canToggleProtection`, `isReadOnlyExternal`, `protectionToggle`, `setProtected`.
- Roles: `actorActions(node)`, `isFirstSibling(node)`, `isLastSibling(node)`, `isPrisonOnly(node)`.
- Flags: `isReadOnly`, `canMutate`, `puedeCrear`, `puedeModificar`, `puedeEliminar`, `draggable`.

Lo construye `TATreeShape.buildCustomsRuntime()`.

### `ITreeCustoms<TBase>` — el contrato del consumidor

Todos los campos son **opcionales**. Si falta un campo, el adapter aplica un
fallback razonable. Las categorías recomendadas (orden de declaración):

#### Identidad del modelo

| Campo | Rol |
|---|---|
| `klass?: new () => TObject` | Constructor del registro. Si falta, el adapter usa un objeto plano. |
| `newItem?: (data?) => R` | Fabricador alternativo (gana sobre `klass`). |
| `entrie?` / `entries?` | Etiquetas i18n para modal/aria (singular/plural). |

#### Mapeo dominio ↔ flatPath

| Campo | Rol |
|---|---|
| `getFlatPath?(record)` | Lee el ID jerárquico del campo de dominio (p.ej. `iplan`). |
| `setFlatPath?(record, fp)` | Escribe el ID jerárquico al campo de dominio. **Sólo se invoca durante `commitFlatPaths`** (al guardar). |
| `remapReferences?(record, idMap)` | Remap de referencias internas (p.ej. `iplanpadre`) tras commit. |
| `list?: () => R[]` | Lectura de la lista plana subyacente (si el consumer la maneja). |

#### Ciclo de vida del nodo

| Campo | Rol |
|---|---|
| `updateNode?(node, kind, tree)` | Hook único de ciclo de vida. `kind: "new" \| "old"`. `"new"` se invoca al crear (root/sibling/child/lastLevel — éste último se infiere por `node.topology === "atom"`). `"old"` se invoca al materializar desde lista plana y antes de guardar (saneo en cascada). Asigna `topology`, `containment`, hereda campos de ancestros, normaliza referencias, etc. |
| `refreshNode?(record, tree)` | Recálculo on-demand de un nodo. |

#### Jerarquía / niveles

| Campo | Rol |
|---|---|
| `levelName?({depth})` | Nombre del nivel (p.ej. `"Capítulo"`, `"Subcapítulo"`). |
| `shouldOpenLastLevelSelector?(node)` | `true` si el agregar-hijo debe delegar a un selector externo (último nivel). |
| `openLastLevelSelector?()` | Solicita al consumidor abrir su selector. |

#### Interacción

| Campo | Rol |
|---|---|
| `onexpand?(node, tree)` | Hook cuando el usuario abre un agrupador. **El componente pre-filtra** por `isGroupActor && canMutate`; el consumidor sólo añade lógica de negocio (p.ej. `if (!node.isEmpty) return;`). |
| `oncollapse?(node, tree)` | Hook cuando el usuario cierra un agrupador. Mismos filtros genéricos que `onexpand`. Útil para que el caso de "agregar hijo en grupo vacío" funcione también al colapsar. |
| `hotkeys?: {[combo]: handler}` | Combos personalizados (`"Ctrl+Enter"`, `"Ctrl+Shift+ArrowDown"`, etc.). |
| `menu?` / `moreMenu?` | Acciones del drawer/contextual (sync o async). |

#### UI: fila

| Campo | Rol |
|---|---|
| `getNodeIcon?(node, ctx)` | Resuelve icono por nodo (recibe `{isLastNode, isFolder, hasChildren, isExpanded, isEmptyFolder}`). |
| `getRowConfig?(node, defaultCfg)` | Override completo de la config de fila. |
| `rowActions?(node, tree)` | Botones rápidos por fila (`FlexOptionsInput[]`). |
| `rowCascadeOptions?(node, tree)` | Menú "⋮" por fila. |

#### UI: toolbar

| Campo | Rol |
|---|---|
| `toolsBarActions?(tree)` | Botones rápidos de la barra superior. |
| `toolsBarCascadeOptions?(tree)` | Menú "⋮" de la barra superior. |

## Props del componente

```ts
interface TreeViewProps<TListObj extends ITreeData<TListObj> & TObject> {
   readonly?: boolean;
   TreeController?: TreeAdapterRow<TListObj>;      // Si no se pasa, se crea uno
   bAllowed?: TBAllowed;                           // Permisos Crear/Modificar/Eliminar/Visualizar
   draggable?: boolean;                            // default true
   disabled?: boolean;
   onError?: (msg: string) => void;
   Controller?: { treeAdapter?: TreeAdapterRow<TListObj> };  // Para que el catálogo enchufe el adapter
   List2Rows?: unknown;                            // Trigger reactivo para re-render
   record?: INode<TListObj> | null;
   customs?: ITreeCustomsRow<TListObj>;
}

type TreeAdapter<TBase extends TObject> = TreeRowViewAdapter<RowOf<TBase>>;
type TreeAdapterRow<R extends ITreeData<R> & TObject> = TreeRowViewAdapter<R>;
```

## Slots

| Slot | Props | Uso |
|---|---|---|
| (default) | `{ treeAdapter, sizew, showEliminar }` | Override total del toolbar (poco común). |
| `header` | `{ treeAdapter, sizew, showEliminar }` | Contenido extra debajo del toolbar. |
| `row` | `{ node }` | **Render del contenido principal de la fila.** Obligatorio. |
| `helperRow` | `{ node }` | Texto secundario alineado a la derecha. |
| `grouperCaret` | `{ open, node }` | Override del chevron del agrupador. |
| `dragHandle` | `{ frozen, disabled }` | Override del handle de drag. |
| `Frm` | `{ record, itdForm, ancestors, isNew }` | Formulario del drawer (CRUD por fila). |

## Punto de entrada `runCustomsPreSubmit()`

El controlador del catálogo (Master/Slave) invoca este método antes de
`Update`/`Insert`. Internamente:

1. Ejecuta `await customs.updateNode?.(node, "old", runtime)` por cada nodo —
   el consumidor cascadea campos derivados (p.ej. `iplanpadre.valor`) mutando
   los registros originales.
2. **Inmediatamente** llama a `commitFlatPaths()` — recorre `rootNodes`,
   reasigna `flatPath` por DFS, invoca `customs.setFlatPath(node, fp)` y
   `customs.remapReferences(node, idMap)`.

El orden está blindado dentro de `runCustomsPreSubmit`: la UI no puede
invertirlo. Si el commit corriera antes del saneo, los clones en la
lista del master quedarían con paths viejos.

## Ejemplo mínimo de consumo

```svelte
<script lang="ts">
   import TreeRowView, { type ITreeCustoms } from ".../_comps/TreeView/TreeRowView.svelte";
   import { TPlanCurso } from ".../TPlanCurso";

   const planCustoms: ITreeCustoms<TPlanCurso> = {
      klass: TPlanCurso,
      entrie: "contenido del plan",
      entries: "Plan de contenidos",
      getFlatPath: (r) => String(r?.iplan ?? "").trim(),
      setFlatPath: (r, fp) => { r.iplan = String(fp ?? "").trim(); },
      updateNode: (node, kind, tree) => {
         if (kind === "new") node.topology = node.topology ?? "group";
      },
      onexpand: (node, tree) => {
         if (!node.isEmpty) return;
         void tree.addChild?.(node);
      },
   };
</script>

<TreeRowView {Controller} bind:record customs={planCustoms} bAllowed={Controller.bAllowed}>
   <svelte:fragment slot="row" let:node>{node.titulo}</svelte:fragment>
   <svelte:fragment slot="Frm" let:record let:itdForm>
      <PlanCursoFrm {record} {itdForm} />
   </svelte:fragment>
</TreeRowView>
```

## Reglas de oro

1. **Svelte 4.** Sin runas, sin snippets. Reactividad la pone el `.svelte` consumidor con `$:` y eventos. La cascada es TS puro.
2. **`flatPath` muta libre durante moves/reorder.** El dominio (`iplan`, etc.) sólo se actualiza durante `commitFlatPaths` (al guardar) vía `customs.setFlatPath`.
3. **`pathInit` representa el ID "inicial"** del nodo dentro de la sesión actual del árbol (post-`onrefresh`). Sirve para resolver identidad estable entre re-renders.
4. **`runCustomsPreSubmit()` es el único punto correcto** para llamar antes de persistir. No invoques `commitFlatPaths()` desde fuera.
5. **`onexpand`/`oncollapse` y otros hooks ya filtran condiciones genéricas** (`isGroupActor`, `canMutate`). El consumidor sólo añade reglas de negocio.
6. **No mezcles capas.** Selección DOM va en `05-view.ts`. Mutaciones en `06-mutations.ts`. Roles en `07-roles.ts`. Modo fila en `_asRow/00-treeAdapterAsRow.ts`.
