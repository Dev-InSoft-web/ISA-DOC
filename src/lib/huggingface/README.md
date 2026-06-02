# Hugging Face en ISA-DOC

Token y scripts locales para usar modelos de [Hugging Face](https://huggingface.co) (por ahora: quitar fondo de imágenes).

## Crear el token (fine-grained)

1. Inicia sesión en Hugging Face.
2. Abre [Nuevo token fine-grained](https://huggingface.co/settings/tokens/new?tokenType=fineGrained).
3. Nombre sugerido: `isa-doc-inference`.
4. Permisos mínimos:
   - **Inference** → permitir llamadas a la Inference API (serverless).
   - **Repositories** → lectura del modelo que uses (p. ej. `briaai/RMBG-1.4`), o “read” en los repos que necesites.
5. Genera el token y cópialo **una sola vez** (empieza por `hf_`).

## Guardar la llave en ISA-DOC

En la raíz del proyecto (junto a `.env.example`):

```bash
cp .env.example .env   # si aún no tienes .env
```

Añade en `.env` (este archivo está en `.gitignore`; **no** lo subas a git):

```env
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxx
```

Alias aceptado: `HF_TOKEN`.

## SDK en el proyecto

- Dependencia: `@huggingface/inference`
- Build de tickets: `scripts/lib/huggingface-remove-bg.mjs` (usa `imageSegmentation` + fallback sharp si falla el proveedor)
- UI / cliente: `src/lib/huggingface/removeBackground.ts` (`VITE_HF_API_KEY`)

## Quitar fondo (CLI)

```bash
npm run huggingface:remove-bg -- ruta/imagen.png
```

Genera `imagen-nobg.png` junto al original.

## Assets TK-1431163

En `manifest.json`, `tk1431163-capas-openai` tiene `"removeBg": true`. Al ejecutar:

```bash
npm run tickets:assets:1431163
```

1. **mermaid.ink/img** (texto completo; no usar `/svg`+sharp).
2. **remove-bg** con **briaai/RMBG-1.4** vía paquete `rmbg` (ONNX, pesos desde Hugging Face Hub, ~8 s la primera vez baja el modelo).
3. Subida a imgbb.

Motores (`HUGGINGFACE_REMOVE_BG_ENGINE`):

| Motor | Descripción |
|-------|-------------|
| `rmbg` (default) | BRIA RMBG-1.4 local, mejor calidad que recorte de blanco |
| `fal` | `briaai/RMBG-2.0` en Inference Providers (requiere créditos) |
| `canvas` | Solo píxeles #FFF; rápido pero bordes duros |

Variables opcionales:

```env
HUGGINGFACE_REMOVE_BG_MODEL=briaai/RMBG-2.0
HUGGINGFACE_REMOVE_BG_PROVIDER=fal-ai
VITE_HF_API_KEY=hf_...
```

Si los créditos de Inference Providers están agotados, el build usa fallback local (blanco → transparente) para no bloquear la publicación.
