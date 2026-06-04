# Pipeline government (web)

## Datos

`lab-langgraph/data/vectorize/web/government/`

- `pages/{corpus}/{año}/{pageId}.json|.md`
- `pdfs/{corpus}/{año}/{pageId}.pdf`
- `manifest.json`

## Orden típico

1. `lab:gov:fetch` — crawl desde `government/seeds/government-seeds.json`
2. `lab:gov:reorganize` — migra layout plano → `{corpus}/{año}/`
3. `lab:gov:convert-pdfs` — PDF→MD + ImgBB
4. `lab:gov:index-rag` — PGVector (`sourceType: web`)

## Lib

- `government/lib/paths.ts` — resolución de rutas
- `government/lib/crawl.ts` — fetch + MD páginas HTML
- `government/lib/pdf-to-md.ts` — extracción PDF (lab build)
