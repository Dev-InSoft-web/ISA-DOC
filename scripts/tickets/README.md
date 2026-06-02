# Scripts de assets por ticket (PatyIA / API)

Norma ISA-DOC para diagramas y gráficos en tickets:

| Tipo | Fuente editable | HTML en ticket |
|------|-----------------|----------------|
| Mermaid | `.mmd` en `src/lib/tickets/assets/<TK-ID>/` | PNG en **imgbb** vía `ticketImg()` |
| QuickChart / API con datos | `.chart.json` | PNG en imgbb |
| Generado por código TS | `.md` con instrucciones de regeneración + `.chart.json` | PNG en imgbb |

## Dimensiones en HTML

A partir de `width`/`height` que devuelve imgbb (`imgbb-map.json`):

- Si **ancho &lt; 400** o **alto &lt; 500**: escalar **hacia arriba** manteniendo proporción.
- Si no: mostrar al **80%** del tamaño nativo, **centrado** con margen lateral (~5%).

Lógica en `src/lib/tickets/imgDims.ts`.

## Por ticket con imágenes de API

```bash
node scripts/tickets/build-TK-1431163-assets.mjs
node scripts/tickets/build-TK-1431662-assets.mjs
node scripts/tickets/build-TK-1431666-assets.mjs
```

Cada script:

1. Lee `assets/<TK-ID>/manifest.json`
2. Genera PNG (mermaid.ink o quickchart.io)
3. Sube a imgbb si el archivo cambió
4. Actualiza `assets/imgbb-map.json`

Capturas locales (sin API): tras colocar JPG/PNG en `assets/`, usar `npm run assets:upload`.

## npm

```bash
npm run tickets:assets:1431163
npm run tickets:assets:1431662
npm run tickets:assets:1431666
npm run tickets:assets:patyia   # los tres
```
