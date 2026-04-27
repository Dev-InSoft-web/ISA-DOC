# ISW · Frontend (Astro + Svelte)

`ISW-ClientesIS` es la aplicación web del usuario final. Astro 5 SSR con
componentes Svelte y la librería de UI
`@ingenieria_insoft/ispsveltecomponents`.

## Estructura general

```
ISW-ClientesIS/
├── astro.config.mjs
├── web.config            (IIS deploy en App Service Windows)
├── public/
├── config/
└── src/
    ├── pages/            (rutas Astro)
    ├── components/       (.astro / .svelte)
    └── lib/              (clientes API, stores, helpers)
```

## Pantallas principales (módulo Capacitación)

### Cursos

- **CATALOGO** — listado tipo card grid.
- **ACCIONES** — crear, duplicar, recodificar, eliminar.
- **DETALLE** del curso con sub-pestañas:
  - **SEGURIDAD** — gestiona `CAPAC_SEGURIDADES_CURSOS`.
  - **ESTRUCTURA** — `CAPAC_ESTRUCTURAS_CURSOS` (niveles).
  - **PLANES / CONTENIDO** — vincula con `CAPAC_PLANES_CURSOS`.
  - **DRIVERS** — `CAPAC_ATRIBUTOS_X_DRIVERS`.
  - **TEMAS** — clasificación.
  - **ATRIBUTOS CONTENIDO** — `CAPAC_ATRIBUTOS_PLANES`.
  - **DETALLE CONTENIDO** — vista enriquecida del recurso ligado.

### Plan de curso

- **DIAGRAMA ORGANIGRAMA** — vista jerárquica del plan.
- **DETALLE Cursos de plan** — `CAPAC_CURSOS_DE_PLANES_ESTUDIO`.
- **CATALOGO** y **ACCIONES** equivalentes.

### Recursos

- Buscador (`/api/recursos/buscar/...`).
- Calificaciones (explorador).
- Mensajes y respuestas anidadas.

## Cliente API

Todas las llamadas pasan por un wrapper en `src/lib/api/...`:

```ts
import { httpGet, httpPost } from "$lib/api/http";

const cursos = await httpGet<TCursoClient[]>(
  `/api/cursos/${btoa(JSON.stringify({ activo: true }))}`,
);
```

El wrapper inyecta `Authorization: Bearer ${token}` y maneja errores
estándar con toasts (`ispsveltecomponents` Toaster).

## Componentes UI clave

- `Card`, `Button`, `Modal`, `Tabs`, `TabItem`, `FlexLayout`, `GridLayout`,
  `H4`, `Text`, `Iconify`, `Loading`.
- Variables CSS globales: `--is-bg-primary`, `--is-bg-secondary`,
  `--is-color`, `--is-primary`, `--is-b-color`, `--is-bg-readonly`.

## Deploy

`pub.ps1` empaqueta el sitio Astro y lo publica como App Service Windows
con `web.config` para SSR/Node.

## Integración con ISA

ISA puede correr `npm run dev`/`build`/`pub.ps1` desde la pestaña
**Proyectos → ContaPymeU → Acciones**.
