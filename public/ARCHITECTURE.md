# Arquitectura de `public/`

## Principio

Separar **assets de UI**, **contenido editorial**, **datos de ingeniería** y **artefactos generados en runtime**, dejando un único árbol **`static-api/`** como contrato de solo lectura para GitHub Pages.

```
public/
├── assets/          # estáticos de diseño (icons, imgs)
├── content/         # fuente editable (docs markdown)
├── data/            # JSON/SQL de modelo ClientesIS + codegen
├── generated/       # salidas locales (imágenes OpenAI)
├── static-api/      # snapshot versionado para STATIC_MODE
└── (sin secretos)
```

## Flujo docs

1. Autores editan `content/docs/<proyecto>/*.md`.
2. `npm run snapshot:data` copia a `static-api/docs/` (mismas rutas relativas).
3. En dev, la app usa `/content/docs/…`; en gh-pages, `/static-api/docs/…`.

## Flujo datos ClientesIS

- Persistencia viva: `data/clientesis/**` (lo escribe `tablesStore.server.ts`).
- SQL público: `data/sql/*.sql`.
- Codegen DER: `data/codegen/der/`, estado en `data/codegen/_state*.json`.
- Snapshot: `static-api/tables.json`, `static-api/codegen/state.json`, etc.

## Flujo PatyIA imágenes

- API escribe en `generated/patyia/openai/images/`.
- URL pública: `/generated/patyia/openai/images/<archivo>`.
- Solo `README.txt` y metadatos pequeños en git; PNG/WebP ignorados en `.gitignore`.

## Migración desde rutas antiguas

| Antes | Ahora |
|-------|--------|
| `/icons/` | `/assets/icons/` |
| `/imgs/` | `/assets/imgs/` |
| `/docs/` | `/content/docs/` (dev) |
| `/db/clientesis` | `/data/clientesis` |
| `/db/*.sql` | `/data/sql/*.sql` |
| `/bd/codegen/` | `/data/codegen/` |
| `public/patyia/openai/images` | `public/generated/patyia/openai/images` |

`Layout.astro` y `staticMode.ts` reescriben prefijos en modo estático para que los HTML antiguos sigan resolviendo bajo `static-api/` cuando aplique.

### Compat Iconify (ISP)

`@ingenieria_insoft/ispsveltecomponents` aún hace `fetch('/icons/iconify/…')`. Tras `npm run iconify`, `config/downloadIconify.js` crea un **junction** `public/icons/iconify` → `public/assets/icons/iconify` (versionar el enlace en git es opcional; regenerar con iconify en CI).
