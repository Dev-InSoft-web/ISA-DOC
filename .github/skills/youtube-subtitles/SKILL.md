---
name: youtube-subtitles
description: "Obtener subtítulos/transcripción de videos de YouTube. Use when: YouTube transcript, subtítulos YouTube, transcripción video, captionTracks, timedtext, ytInitialPlayerResponse, oEmbed, contexto de video para tickets."
argument-hint: "URL o ID del video, idioma opcional (por defecto es)"
---

# YouTube Subtitles

Obtiene contexto textual de videos de YouTube sin descargar audio/video pesado. Prioriza metadatos públicos, subtítulos expuestos por YouTube y, si el endpoint de captions falla, la transcripción visible en la UI.

## Cuándo Usar

- El usuario pide obtener subtítulos, transcripción, resumen o contexto de un video de YouTube.
- YouTube redirige a login desde `fetch_webpage` o desde la página normal.
- Se necesita documentar contexto para tickets, bitácoras, QA o análisis funcional.
- El video tiene transcripción automática visible, pero `video.google.com/timedtext` directo no devuelve contenido.

## Regla De Salida

- Usa la transcripción como fuente para analizar y resumir.
- No pegues una transcripción completa de contenido de terceros en la respuesta final salvo que el usuario haya aportado ese texto o pida guardarlo localmente para su propio flujo de trabajo.
- En la respuesta final, entrega contexto accionable, timestamps relevantes y citas breves si ayudan.
- Advierte si el texto viene de ASR: puede tener errores de nombres, siglas y puntuación.

## Procedimiento

1. Normaliza el ID del video desde URL completa, `youtu.be`, `shorts`, `embed` o ID de 11 caracteres.
2. Obtén metadatos con `oEmbed`:
   `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json`.
3. Prueba subtítulos directos:
   - `https://video.google.com/timedtext?type=list&v=<ID>`
   - `https://video.google.com/timedtext?lang=es&v=<ID>&fmt=json3`
   - Repite con `fmt=srv3`, `fmt=vtt` y el idioma solicitado.
4. Si lo directo no basta, lee el HTML inicial con user-agent de navegador:
   `https://www.youtube.com/watch?v=<ID>&hl=es-419&persist_hl=1`.
5. Extrae `ytInitialPlayerResponse` del HTML y busca:
   `captions.playerCaptionsTracklistRenderer.captionTracks`.
6. Selecciona el track por idioma:
   exacto solicitado -> empieza por solicitado -> español -> primer track disponible.
7. Descarga `track.baseUrl` agregando `fmt=json3`; si viene vacío, intenta sin `fmt`, `fmt=srv3` y `fmt=vtt`.
8. Si `captionTracks` existe pero `baseUrl` devuelve vacío, usa fallback de navegador:
   - Abre el video en browser.
   - Expande la descripción (`...más`) si hace falta.
   - Click en `Mostrar transcripción` / `Show transcript`.
   - Recorre el panel `ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]` y recolecta `ytd-transcript-segment-renderer`.
9. Resume por temas y conserva timestamps clave. Para tickets, transforma el contenido en hipótesis, decisiones, riesgos, tareas y criterios de validación.

## Script Local

Ejecuta el helper desde la raíz de `ISA-DOC`:

```powershell
npx tsx .github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts "https://www.youtube.com/watch?v=yXYP5yl88no" es --out data/youtube-transcripts/yXYP5yl88no.json
```

Uso rápido sin archivo:

```powershell
npx tsx .github/skills/youtube-subtitles/scripts/extract-youtube-subtitles.ts yXYP5yl88no es --max-chars 16000
```

Opciones:

- `--out <archivo>`: guarda metadatos, tracks, segmentos y transcript en JSON.
- `--json`: imprime JSON completo por stdout.
- `--raw`: imprime transcript completo en texto plano.
- `--max-chars <n>`: limita el preview de stdout cuando no se usa `--raw`.

El script intenta `oEmbed`, `ytInitialPlayerResponse`, `captionTracks`, `timedtext type=list`, `json3`, `srv3`, `vtt` y XML. No descarga el video ni requiere `yt-dlp`.

## Fallback Playwright

Si el script informa que hay tracks pero no logra contenido, abre el video y usa este patrón con `run_playwright_code`:

```ts
await page.waitForTimeout(3000);

for (const selector of ['button:has-text("...más")', 'tp-yt-paper-button:has-text("...más")', 'text=...más']) {
  const locator = page.locator(selector).first();
  if (await locator.count()) {
    await locator.click({ timeout: 5000 }).catch(() => undefined);
    break;
  }
}

await page.getByText(/Mostrar transcripción|Show transcript/i).first().click({ timeout: 5000 });
await page.waitForTimeout(1500);

const panel = page.locator('ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-searchable-transcript"]').first();
const collected = new Map<string, string>();

async function collectVisible() {
  const rows = await page.locator('ytd-transcript-segment-renderer').evaluateAll((nodes) =>
    nodes.map((node) => (node.textContent ?? '').replace(/\s+/g, ' ').trim()).filter(Boolean),
  );

  for (const row of rows) {
    const match = row.match(/^(\d+:\d{2}(?::\d{2})?)\s+(.*)$/);
    if (match?.[2]) collected.set(match[1], match[2]);
  }
}

await collectVisible();
for (let index = 0; index < 80; index += 1) {
  await panel.evaluate((node) => {
    const scroller = node.querySelector('#segments-container') ?? node.querySelector('#content') ?? node;
    scroller.scrollBy(0, 900);
  });
  await page.waitForTimeout(350);
  await collectVisible();
}

return Array.from(collected.entries()).map(([time, text]) => ({ time, text }));
```

## Diagnóstico Rápido

- `fetch_webpage` redirige a Google login: usa `oEmbed` y luego HTML con user-agent.
- `timedtext?lang=es` devuelve vacío: busca `captionTracks` en `ytInitialPlayerResponse`.
- `captionTracks` existe pero `baseUrl` devuelve vacío: usa fallback Playwright con `Mostrar transcripción`.
- Botón del reproductor dice `Subtítulos no disponibles`: puede seguir existiendo panel de transcripción; revisa descripción y menú de transcript.
- Transcript ASR con palabras raras: conserva timestamps y valida nombres/siglas contra el contexto del proyecto.