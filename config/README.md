# `config/` — toolchain del proyecto

| Archivo | Rol |
|---------|-----|
| `astro.config.ts` | Dev SSR + Node adapter + aliases `$lib` / `$comps` |
| `astro.config.gh-pages.ts` | Build estático GitHub Pages |
| `svelte.config.ts` | Preprocessor Svelte |
| `downloadIconify.js` | `npm run iconify` → `public/assets/icons/iconify` |

La raíz expone re-exports `astro.config.ts` y `astro.config.gh-pages.ts` para herramientas que buscan el config en el directorio del proyecto.
