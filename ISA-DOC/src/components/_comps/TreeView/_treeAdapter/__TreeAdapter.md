# `_treeAdapter/` — Cascada del controlador del árbol

## Idea base

`TreeAdapter<Stacker, TWorking>` es la clase abstracta que orquesta el `TreeView`. No vive en un único archivo: se construye por **cascada** — cada nivel hereda del anterior y aporta una responsabilidad. El consumidor extiende `TreeAdapter` y el contrato (`01-contract.ts`) exige implementaciones concretas.

```text
TTreeAdapterContext   00-context.ts     Estado interno + acceso a props.
        ▲
TTreeAdapterContract  01-contract.ts    EL CONTRATO. Todo lo abstracto vive aquí.
        ▲
TAModel               02-model.ts       Estado del modelo (obj, callbacks UI, controller catálogo).
        ▲
TATree                03-tree.ts        Árbol: build, flatten, rebuild, find, remap, CRUD bajo nivel.
        ▲
TAView                04-view.ts        Vista: selección, foco, expand/collapse, flash, scroll.
        ▲
TAMutations           05-mutations.ts   Operaciones del usuario: add/move/reorder/delete/edit.
        ▲
TreeAdapter           06-rows.ts        Eventos de fila, registro de row adapters, getRowConfig, toolbar. Clase final abstracta.
```

`00-complex-control.ts` aporta `ComplexControl<TCtx>`, base genérica del estado reactivo. Vive aparte para evitar imports circulares con `TreeView.svelte`.

`_rowAdapter/` (subcarpeta) contiene la cascada paralela del controlador de fila — ver [`_rowAdapter/__RowAdapter.md`](./_rowAdapter/__RowAdapter.md).

Cada archivo es **una sola clase**. Sin mezcla. El número en el nombre es el orden de extensión.

## El contrato (`01-contract.ts`)

Esto es lo único que importa cuando vas a implementar tu propio `TreeAdapter`. Todos los miembros abstractos están aquí, **públicos** (no `protected`), porque tu subclase está obligada a definirlos:

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

> Si no implementas alguno, TypeScript te detiene en compile-time. Nada de `protected abstract`: el consumidor está obligado a definir todo.

`getVisibleNodeIds(nodes, expandedSet)` también vive aquí, pero como **concreto** (helper común).

## Por qué cascada y no monolito

- **Diff limpio.** Cambias mutaciones, tocas `05-mutations.ts`. Cambias eventos de fila, tocas `06-rows.ts`. El blame queda preciso.
- **Contrato unificado.** Si te preguntas "¿qué tengo que implementar?", abres `01-contract.ts` y tienes la lista exacta.
- **Sin barrels intermedios.** El único punto de entrada para consumidores es `TreeView.svelte`, que re-exporta `TreeAdapter`, `TreeRowAdapter`, `TreeNodeUX`, `INode`, `ITreeData`, `objRootsToNodes`, `groupedWithSeparators`, `ComplexControl`. Internamente la cascada se importa por archivo.

## Cómo consumir

```ts
import {
	TreeAdapter,
	TreeNodeUX,
	type INode,
	type ITreeData,
} from ".../_comps/TreeView/TreeView.svelte";

class MiUX extends TreeNodeUX(TMiPlan) {}

class MiAdapter extends TreeAdapter<TMiCurso, MiUX> {
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
2. **No mezcles capas.** Un método de selección no entra en `03-tree.ts`. Un `flattenTree` no entra en `04-view.ts`.
3. **No reintroduzcas un barrel intermedio.** El único barrel es `TreeView.svelte`. La cascada se importa por archivo.
4. **No conviertas getters concretos en abstract a la ligera** — si hay un default razonable (ej. `ntitleNode = ""`), déjalo concreto en `02-model.ts` y permite override.
5. **Svelte 4.** Sin runas, sin snippets. Esta cascada es TS puro; la reactividad la pone el `.svelte` consumidor.
