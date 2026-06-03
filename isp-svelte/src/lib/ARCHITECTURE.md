# Arquitectura `isp-svelte/src/lib`

## Capas

```
lib/
├── shared/              # Sin dependencias de dominio
├── ui/
│   ├── primitives/      # Separator, …
│   ├── containers/      # Accordion, Floating*, TouchGestures
│   ├── overlays/        # ConfirmDialog, TipInfo, InvokedFloater
│   └── widgets/         # Botones/switches ISA (ex-especial)
├── options/             # Acciones de fila en árboles
├── Form/                # MainFormLayout, Detail, jconfig
├── tree/
│   ├── TreeView/        # Árbol con historial y jconfig embebido
│   └── TreeViewLegacy/  # Variante usada en TreeSQLTables
├── actions/             # Bridge ISA-DOC (SqlExec, Revisado, Copy, Run)
├── status/              # DbStatusBanner
└── index.ts             # Export npm del paquete
```

## Reglas de dependencia

```
tree/*     →  options/, ui/*, Form/
Form/*     →  ui/widgets, ui/overlays, @ingenieria_insoft/*
ui/*       →  @ingenieria_insoft/*, bridge/actions (solo Accordion → RevisadoCheck)
options/*  →  ui/overlays, ui/primitives
actions/*  →  ui/overlays, componentes ISA-DOC (../../../../src/…)
bridge     →  NO importar tree/ ni Form/ desde actions salvo necesidad
```

`actions/` y `status/` están en la raíz de `lib` (no bajo `bridge/`) para rutas `$comps` cortas; conceptualmente son la capa **bridge**.

## Playground vs paquete

- **Playground** (`isp-svelte/src/playground`): usa `$lib/*` → `ISP-SvelteComponents` (Ingeniería INSOFT).
- **Paquete** (`isp-svelte/src/lib`): lo que exporta `@jeff-aporta/isp-svelte` y resuelve `$comps` en ISA-DOC.

No mezclar imports `$lib` del playground con rutas de `$comps`.

## Árboles (`tree/`)

Cada `TreeView*` mantiene su subestructura interna:

- `_treeAdapter/` — contrato, modelo, mutaciones, roles
- `_asRow/` — fila, drag, eventos
- `_defgen/` — datos y controles complejos (Legacy)

La documentación técnica sigue en `__TreeView.md` y `__TreeAdapter.md` dentro de cada carpeta.
