# assets — imágenes y subidas

| Ruta | npm |
| --- | --- |
| `upload-assets-imgbb.mjs` | `assets:upload` |
| `prune-uploaded-assets.mjs` | `assets:prune` — elimina binarios locales ya en `imgbb-map.json` / `code-imgs.json` |
| `code-images/build-code-images.mjs` | `code-images:build` (requiere `render-code.py`, `pip install carbon-api`) |

Tras subir capturas o snippets, ejecutar `npm run assets:prune`. En tickets el HTML solo referencia imgbb (`ticketImg` / `img` → `imgbb-map.json`).
| `huggingface/remove-bg.mjs` | `huggingface:remove-bg` |

Lógica HF compartida: `scripts/lib/huggingface-remove-bg.mjs`.
