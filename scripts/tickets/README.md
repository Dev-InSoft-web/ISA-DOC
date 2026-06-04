# Scripts de assets por ticket (PatyIA / API)

Norma ISA-DOC para diagramas y gráficos en tickets:

| Tipo | Fuente editable | HTML en ticket |
|------|-----------------|----------------|
| **Mermaid** (flujos detallados, ER) | `.mmd` en `assets/<TK-ID>/` | PNG en **imgbb** vía `ticketImg()` |
| **Kroki** (p. ej. PlantUML secuencia) | `.puml` + `kind: kroki` | PNG en imgbb (`kroki.io`; lienzo ajustado) |
| **Graphviz** (flujos simples) | `.dot` | PNG en imgbb (WASM `dot` o binario local) |
| **chart-graphviz** (barras Chart.js + marco GV) | `.chart.json` + `kind: chart-graphviz` | QuickChart → nodo `image` en DOT → PNG |
| **QuickChart** (solo chart, sin marco) | `.chart.json` + `kind: quickchart` | PNG en imgbb |
| Mermaid / Graphviz (respaldo) | `mermaidFallback` / `graphvizFallback` | si falla el motor principal |
| Chart.js → DOT barras falsas | `chart-json-to-dot.mjs` | **no publicar** (sustituido por chart-graphviz) |
| Generado por código TS | `.md` con instrucciones de regeneración + `.chart.json` | PNG en imgbb |

**Graphviz:** instalar [Graphviz](https://graphviz.org/download/) y verificar `dot -V`. Estilo INSOFT: fondo transparente, texto/bordes `#808080`, aristas y títulos `#1E90FF`, `splines=ortho`. Ver `scripts/lib/graphviz-style.mjs`.

## Dimensiones en HTML

A partir de `width`/`height` que devuelve imgbb (`imgbb-map.json`):

- Si **ancho &lt; 400** o **alto &lt; 500**: escalar **hacia arriba** manteniendo proporción.
- Si no: mostrar al **80%** del tamaño nativo, **centrado** con margen lateral (~5%).

Lógica en `src/lib/features/tickets/imgDims.ts`.

## Por ticket con imágenes de API

```bash
node scripts/tickets/build-TK-1431163-assets.mjs
node scripts/tickets/build-TK-1431662-assets.mjs
node scripts/tickets/build-TK-1431666-assets.mjs
```

Cada script:

1. Lee `assets/<TK-ID>/manifest.json`
2. Genera PNG según `kind` del manifest (mermaid.ink, kroki.io, Graphviz, quickchart.io)
3. Sube a imgbb si el archivo cambió
4. Actualiza `assets/imgbb-map.json`

Capturas locales (sin API): tras colocar JPG/PNG en `assets/`, usar `npm run assets:upload`.

## Mantenimiento git

| Script | Uso |
| --- | --- |
| `sync-ticket-commit-descriptions.mjs` | Alinea `descripcion` en `index.ts` con `git show` |
| `check-commit-desc-duplicates.mjs` | Detecta descripciones duplicadas |

## npm

```bash
npm run tickets:assets:1431163
npm run tickets:assets:1431662
npm run tickets:assets:1431666
npm run tickets:assets:patyia   # los tres
```
