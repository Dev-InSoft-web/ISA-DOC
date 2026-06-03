# UI

Componentes visuales reutilizables sin lógica de árbol ni SQL.

- `primitives/` — building blocks (Separator).
- `containers/` — layout y agrupación (Accordion, FloatingCard, TouchGestures).
- `overlays/` — diálogos y flotantes (ConfirmDialog, TipInfo).
- `widgets/` — controles ISA específicos (ex-`especial/`: `_Switch`, `Button_`, BtnRef2).

Dependen de `@ingenieria_insoft/ispsveltecomponents` salvo widgets que componen otros módulos `ui/`.
