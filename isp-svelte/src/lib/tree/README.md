# Tree

Dos implementaciones del árbol editable (patrón adapter + asRow):

| Carpeta | Uso en ISA-DOC |
|---------|----------------|
| `TreeViewLegacy/` | `TreeSQLTables`, `TTableNodeUX`, nodos en `src/lib/tree/nodes` |
| `TreeView/` | `SqlTreeEditor` (árbol con jconfig / historial) |

Imports internos usan `../../options/`, `../../ui/containers/`, etc.

Documentación de diseño: `TreeView/__TreeView.md`, `TreeViewLegacy/__TreeView.md`.
