# `_treeAdapter/` — Cascada genérica del controlador del árbol

## Idea base

`TreeAdapter` no es una clase única: se construye por **cascada estricta**, donde cada índice extiende del anterior y aporta una sola responsabilidad. Esta carpeta contiene únicamente las capas **agnósticas del modo de vista** (no saben nada de filas, mosaicos, grafos). El modo "vista en fila" vive en la carpeta hermana [`../_asRow/`](../_asRow/__asRow.md).

```text
ComplexControl<TCtx>     002-complex-control.ts   Estado reactivo genérico (stores ligeros).
        ▲
TTreeAdapterContext      00-context.ts           Estado interno + acceso a props (no extiende; define).
        ▲
TTreeAdapterContract     01-contract.ts          EL CONTRATO público abstracto.
        ▲
TAModel                  02-model.ts             Estado del modelo (obj, callbacks UI, controller catálogo).
        ▲
TATree                   03-tree.ts              Árbol: build, flatten, rebuild, find, remap, CRUD bajo nivel.
        ▲
TAView                   04-view.ts              Vista: selección, foco, expand/collapse, flash (sin DOM).
        ▲
TAMutations              05-mutations.ts         Operaciones del usuario: add/move/reorder/delete/edit.
        ▲
TARoles                  06-roles.ts             Sistema actoral + warden pipeline + freezer/monarchy.
```

> **Última capa pública aquí:** `TARoles` (`06-roles.ts`). El cierre concreto del adapter — donde se ata al modo de vista en forma de fila — vive en `_asRow/00-treeAdapterAsRow.ts` (`TARowBase`) y `_asRow/01-treeAdapterAsRowEvents.ts` (`TreeRowViewAdapter`).

`002-complex-control.ts` aporta `ComplexControl<TCtx>`, base genérica del estado reactivo. Vive aparte para evitar imports circulares con `TreeRowView.svelte`.

Los tipos `INode<T>` e `ITreeData<T>` se importan desde `../_asRow/_rowAdapter/00-base.ts` (la capa donde se definen, junto al row adapter). Esto es a propósito: el contrato del nodo es contrato del adapter de fila — donde se consume.

## Invariante de cascada

> **Un índice NUNCA importa de un índice mayor dentro de la misma cascada.**

Si una capa inferior necesita el "tipo" o el comportamiento de una superior, se declara `abstract` y la herencia cierra el contrato. Sin imports hacia arriba — sin ciclos — sin tipos fantasma.

Cada archivo es **una sola clase**. El número en el nombre marca el orden de extensión.

## El contrato (`01-contract.ts`)

Esto es lo único que importa cuando vas a implementar tu propio adapter concreto. Todos los miembros abstractos están aquí, **públicos** (no `protected`):

| Miembro | Qué provee |
| ------- | ---------- |
| `nodeCtor` | Constructor del UX que envuelve cada fila. |
| `nidNode` | Nombre del campo id del UX (ej. `"iplan"`). |
| `stack` | El objeto contenedor (raíz). |
| `istack` / `nistack` | Id y nombre de id del stack. |
| `stackList` (get/set) | La lista plana subyacente que el árbol presenta. |
| `createNode` | Cómo crear una instancia UX desde data cruda. |
| `toNode` | Normaliza data a UX (con clon si toca). |
| `onrefresh` | Reconstruye el árbol y notifica vistas. |
| `applySelection(obj \| null)` | Aplica selección desde tu modelo. |
| `resyncExpandedToCurrentTree` | Re-mapea expandidos tras un cambio estructural. |
| `syncAllRowAdapters` | Empuja sync a todos los `TreeRowAdapter` registrados. |
| `getlevelname(nivel?, record?)` | Etiqueta del nivel jerárquico. |
| `getEditDriverAttrs` / `getEditAttrsForLevel` | Atributos editables. |
| `canEditSelectResource` | ¿Esta fila puede asignar recurso? |
| `getEditAtributoValor` / `setEditAtributoValor` | Lectura/escritura de atributos del draft. |
| `setEditRecursoSelected` | Asigna recurso al draft. |

> Si no implementas alguno, TypeScript te detiene en compile-time.

`getVisibleNodeIds(nodes, expandedSet)` también vive aquí, pero como **concreto** (helper común).

## Capa `06-roles.ts` — sistema actoral

Modelo de roles tipo "clases CSS" en kebab-case sobre `node.obj.actor`. Múltiples roles en el mismo nodo se separan por espacios:

| Rol | Semántica |
| --- | --------- |
| `atom` | Nodo hoja conceptual. Nunca pinta caret aunque tenga hijos. |
| `group` | Agrupador genérico. **Inferido** automáticamente si el nodo declara cualquiera de los roles agrupadores (`warden`, `prison`, `hermetic`, `cell`, `freezer`, `monarchy`). |
| `warden` | Ancestro que **transforma** el `WardenDraft` que un descendiente solicita (pipeline closest→farthest). |
| `prison` | Agrupador con **osmosis** (sus hijos pueden salir vía drag). Aporta acción "Liberar". |
| `cell` | Agrupador con osmosis que **se extingue** con todos sus integrantes. |
| `hermetic` | Agrupador **sellado** (los hijos no salen) con acción eliminar. |
| `freezer` | Agrupador **tautológico**: congela a TODOS sus descendientes (no se mueven). Requiere `obj.sortChildren(children)`. |
| `monarchy` | Agrupador **contingente**: cada descendiente decide vía `obj.freeze(): boolean`. Requiere `obj.sortChildren(children)`. |

Predicados expuestos: `isAtom`, `isWarden`, `isPrison`, `isHermetic`, `isCell`, `isFreezer`, `isMonarchy`, `isGroupActor`, `isGrouper` (compuesto), `isActionGrouper`, `allowsChildEscape`.

### Pipeline de vigilancia (`wardenDraft`)

```text
                         hijo
                          │
            wardenDraft(child)
                          │
                          ▼
         ┌──── ancestor #1 (closest)  ─── if isWarden ─► wardenTransform
         │                ▼
         │      ancestor #2            ─── if isWarden ─► wardenTransform
         │                ▼
         │      …                       ─── … ────────►  …
         │                ▼
         └──── root (farthest)          ─── if isWarden ─► wardenTransform
                          │
                          ▼
                WardenDraft<TWorking>
                  { node, actions, cascadeOptions, extra }
```

El **hijo solicita**; los wardens enriquecen su descriptor; el row final lo consume vía `getRowConfig`. El warden nunca empuja acciones al hijo: el hijo es quien lee.

`WardenDraft<TWorking>`:

```ts
export interface WardenDraft<TWorking> {
   readonly node: INode<TWorking>;
   actions: ButtonIconifyProps[];
   cascadeOptions: FlexOptionsInput[];
   extra: Record<string, unknown>;
}
```

### Congelamiento (`isFrozen`)

Recorre ancestros closest→farthest:
1. Si encuentra `freezer` → `assertOrderingContract` y devuelve `true`.
2. Si encuentra `monarchy` → `assertOrderingContract`, exige `node.obj.freeze(): boolean` y respeta su valor.

`assertOrderingContract` es **fail-fast**: si el agrupador con rol ordenador no implementa `sortChildren(children)`, lanza error inmediatamente al evaluar el rol.

`isFrozen` solo afecta acciones de **movimiento** (drag handle, ↑/↓, atajos `Ctrl+↑/↓`). Editar, eliminar, agregar, expandir/colapsar siguen funcionando — la capa de fila filtra `mdi:arrow-up`/`mdi:arrow-down` y desactiva el drag.

### Osmosis (`allowsChildEscape`)

| Rol del padre | ¿Hijos pueden salir? |
| ------------- | -------------------- |
| `prison`, `cell` | sí (por contrato) |
| `hermetic`, `freezer`, `monarchy` | no |
| sin rol específico | sí (legacy) |

### Hooks abstractos heredados a las capas concretas

`TARoles` declara como `abstract` (puro contrato, agnóstico de modo de vista):

| Hook | Disparador semántico |
| ---- | -------------------- |
| `onrowtoggle(node)` | El nodo expande/colapsa. |
| `onCtrlEnter(node)` | `Ctrl+Enter` sobre el nodo enfocado. |
| `onswipenoop()` | Gesto de swipe que se debe consumir sin acción. |

Hook **virtual** (default concreto):

| Hook | Default |
| ---- | ------- |
| `canAddChild(node)` | `true` |

> El sufijo "row" en `onrowtoggle` es histórico; el contrato es genérico. La capa de fila (`_asRow`) los implementa con su semántica de fila; otra capa de mosaico/grafo podría implementarlos distinto.

## Capa `05-mutations.ts` — operaciones del usuario

`add/move/reorder/delete/edit`. Encapsula:
- `onaddroot`, `onaddchild`, `onaddsibling`, `handleaddchild`, `handleaddsibling`.
- `move` (↑/↓), `reorder` (drag), `nestInto` (anidar).
- `requestDelete`, `ondeleteconfirmed`.
- `openEdit`, `openViewNode`, `oneditaccept`.

Las mutaciones **no** filtran por rol; quien decide qué se permite por rol son las capas `06-roles` (predicados + warden) y la capa de fila (`_asRow/01-...Events.ts` → `getRowConfig`).

## Capa `04-view.ts` — selección/foco/expand/flash (sin DOM)

`setSelectedId`, `applySelection`, `expandAll`, `collapseAll`, `expandedNodesAfterToggle`, `setFlashIds`, foco de fila genérico (estado lógico, no DOM).

> Las operaciones DOM específicas de `<summary>`/`[data-tree-row-id]`/`[data-idrow]` están en `_asRow/00-treeAdapterAsRow.ts` (`focusRowById`, `refocusFocusedRowSummary`, `blurTreeSummariesExcept`). No viven aquí porque acoplan al modo de vista en fila.

## Capa `03-tree.ts` — modelo del árbol

`buildTree`, `flattenTree`, `findNodeById`, `findBranchById`, `findBranchByObject`, `getSiblingPosition`, `getNextNodeId`, `normalizeNodeId`. La función helper `objRootsToNodes` se exporta desde `_asRow/_rowAdapter/00-base.ts` (junto a los tipos del nodo).

## Capa `02-model.ts` — estado del modelo

`obj` (get/set con `onrefresh`), `_item`, `_originalItem`, `CatalogoController`, `setShowFrm`, `bindParentData`, `onstateupdate`, dirty-check, `_treeNodes`/`_expandedNodes`/`_focusedNodeId` privados.

## Por qué cascada y no monolito

- **Diff limpio.** Cambias el sistema actoral, tocas `06-roles.ts`. Cambias mutaciones, tocas `05-mutations.ts`. El blame queda preciso.
- **Contrato unificado.** Si te preguntas "¿qué tengo que implementar?", abres `01-contract.ts`.
- **Cascada estricta.** Sin imports hacia índices superiores. Si la capa inferior necesita la API de una superior, la declara `abstract` y la herencia la cierra.
- **Sin barrels intermedios.** El único punto de entrada para consumidores es `TreeRowView.svelte`. Internamente la cascada se importa por archivo.

## Cómo consumir

```ts
import {
   TreeRowViewAdapter,
   TreeNodeUX,
   type INode,
   type ITreeData,
} from ".../_comps/TreeView/TreeRowView.svelte";

class MiUX extends TreeNodeUX(TMiPlan) {}

class MiAdapter extends TreeRowViewAdapter<TMiCurso, MiUX> {
   get stack() { return this.obj }
   get stackList() { return this.stack.items }
   set stackList(v) { this.stack.items = v }
   get istack()  { return String(this.stack.id) }
   get nistack() { return "id" }
   get nodeCtor(){ return MiUX }
   get nidNode() { return "id" }
   createNode(data) { return new MiUX(data, this.stack) }
   toNode(data, clone = false) { /* ... */ }
   getlevelname(nivel, rec?) { /* ... */ }
   // ... resto del contrato
}
```

## Reglas de oro

1. **Si es abstract, va en `01-contract.ts` y es público.** Punto.
2. **No mezcles capas.** Un método de selección no entra en `03-tree.ts`. Un `flattenTree` no entra en `04-view.ts`. Operaciones DOM de fila NO entran aquí — viven en `_asRow/`.
3. **Cascada estricta: nunca importes de un índice mayor.** Si la capa inferior necesita la API de una superior, declara el método como `abstract`.
4. **No reintroduzcas un barrel intermedio.** El único barrel es `TreeRowView.svelte`. La cascada se importa por archivo.
5. **No conviertas getters concretos en abstract a la ligera.** Si hay un default razonable, déjalo concreto y permite override.
6. **Svelte 4.** Sin runas, sin snippets. Esta cascada es TS puro; la reactividad la pone el `.svelte` consumidor.
