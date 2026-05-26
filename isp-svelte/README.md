# @jeff-aporta/isp-svelte

Subproyecto **dentro** del repo `ISA-DOC`. No tiene repo propio: vive en `ISA-DOC/isp-svelte/`.

## Para qué sirve

- Hospedar componentes Svelte de soporte que se comparten entre proyectos (ISA-DOC, PatyIA, Remington) y que **no** pertenecen a la librería oficial `@ingenieria_insoft/ispsveltecomponents`.
- Servir como server local de demos / playground (recibe lo que antes vivía en `ISP-SvelteComponents/src/playground/`).
- Punto de publicación de:
  - **npm**: `@jeff-aporta/isp-svelte`.
  - **gh-pages**: rama `gh-pages` del repo `Dev-InSoft-web/ISP-SvelteComponents` (solo el demo estático).

## Estructura

```
isp-svelte/
├─ package.json
├─ vite.config.ts            # modo dev / build demo
├─ vite.gh-pages.config.ts   # build estático para gh-pages
├─ tsconfig.json
├─ svelte.config.js
├─ index.html                # entry del playground
├─ src/
│  ├─ main.ts                # boot del playground
│  ├─ App.svelte
│  ├─ lib/                   # ← lo que se publica a npm
│  │  └─ index.ts
│  └─ playground/            # demos (movido desde ISP-SvelteComponents/src/playground)
└─ static/
```

## Scripts

- `npm run dev` — playground en local (puerto 5180).
- `npm run build` — compila el demo a `dist-demo/`.
- `npm run build:gh-pages` — compila el demo con `base="/ISP-SvelteComponents/"` a `dist-gh-pages/`.
- `npm run publish:gh-pages` — empuja `dist-gh-pages/` a `gh-pages` del repo `Dev-InSoft-web/ISP-SvelteComponents`.
- `npm run build:lib` — empaqueta `src/lib/` con `@sveltejs/package` a `dist/lib/`.
- `npm run publish:dry` — `npm publish --dry-run --access public` para validar.

## Alias

- `$lib` → `../../ISP-SvelteComponents/src/lib` (source local del paquete `@ingenieria_insoft/ispsveltecomponents`).
- `$mylib` → `./src/lib` (componentes propios de este subproyecto, los que se publicarán a npm).

> El playground heredado usa `$lib/...` esperando el source de ISP; mantenemos esa convención.
> Para los componentes que se moverán aquí (ImageViewer, CodeViewer, etc.) se usará `$mylib`.

## Consumo desde ISA-DOC

ISA-DOC consume este subproyecto **por ruta local** (no por npm) mientras está en desarrollo:

```ts
// ISA-DOC/src/...
import { ImageViewer } from "../../isp-svelte/src/lib";
```

(El alias / publicación se ajustarán cuando se hagan los primeros componentes compartidos.)

## Pendientes

- `npm install` en `isp-svelte/` (no se ejecuta automáticamente).
- Eliminar `ISP-SvelteComponents/src/playground/` en su propio commit dentro de ese repo (queda copia aquí).
- Mover `ImageViewer.svelte` y demás viewers compartidos a `src/lib/`.

## Futuro

- Una vez publicado en npm, Remington podrá hacer `npm i @jeff-aporta/isp-svelte`.
- ISA-DOC seguirá consumiendo por ruta local hasta nuevo aviso.
