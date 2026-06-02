# TK-1431666 — fuentes de gráficos (QuickChart)

Los PNG del ticket se generan desde los JSON de esta carpeta (no desde Mermaid).

| Archivo | Salida PNG | Origen de datos |
|---------|------------|-----------------|
| `tk1431666-tokens-totales.chart.json` | `tk1431666-tokens-totales.png` | Totales `PROMPT_LEN_METRICS` en `patyia-prompt-metrics.ts` |
| `tk1431666-tokens-por-tipo.chart.json` | `tk1431666-tokens-por-tipo.png` | Misma tabla; tokens ≈ `LEN/4` |

Si cambian las métricas en TypeScript, actualizar los JSON (o regenerarlos) y ejecutar:

```bash
node scripts/tickets/build-TK-1431666-assets.mjs
```

El script sube a imgbb y actualiza `assets/imgbb-map.json` con URL y dimensiones nativas.
