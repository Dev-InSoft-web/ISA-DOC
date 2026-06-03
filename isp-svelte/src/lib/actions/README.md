# Actions (bridge ISA-DOC)

Componentes que importan vistas o estado de **ISA-DOC** (`src/components`, `src/lib/features/bitacora`).

- `SqlExecCard` — ejecutar SQL vía `/api/patyia/db/exec`
- `RevisadoCheck` — `revisadoStore` de bitácora
- `CopyButtonIconify`, `RunButton` — utilidades de paneles

Al extraer este paquete a otro repo, esta carpeta es la frontera de acoplamiento a revisar primero.
