"""Genera imágenes PNG de fragmentos de código usando carbon-api.

Lee un manifiesto JSON por stdin con la forma::

    [{ "key": "<sha1>", "lang": "typescript", "src": "..." }, ...]

Escribe cada PNG en ``src/lib/tickets/assets/code/<key>.png``. Las
opciones quedan fijas conforme la directriz: tema vscode, fondo negro,
sin paddings, sin window controls, fuente Hack 14px, exportSize 2x.

Uso (desde la raíz de ISA-DOC)::

    python scripts/render-code.py < manifest.json

Requiere ``pip install carbon-api`` (instala también pyppeteer; la
primera ejecución descargará Chromium).
"""

from __future__ import annotations

import asyncio
import json
import os
import sys
from typing import Any

try:
    from carbon import Carbon  # type: ignore[import]
except Exception as exc:  # pragma: no cover
    sys.stderr.write(
        f"[render-code] no se pudo importar 'carbon': {exc}\n"
        f"Instala con: pip install carbon-api\n"
    )
    raise

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_DIR = os.path.join(ROOT, "src", "lib", "tickets", "assets", "code")

LANG_MAP: dict[str, str] = {
    "typescript": "application/typescript",
    "ts": "application/typescript",
    "javascript": "javascript",
    "js": "javascript",
    "json": "application/json",
    "sql": "sql",
    "html": "htmlmixed",
}


def _detect_chromium() -> str | None:
    candidates = [
        r"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        r"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        r"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        r"C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None


async def _render_one(client: Carbon, item: dict[str, Any]) -> None:
    key: str = item["key"]
    src: str = item["src"]
    lang_in: str = item.get("lang", "auto")
    language = LANG_MAP.get(lang_in, "auto")
    out_path = os.path.join(OUT_DIR, f"{key}.png")
    if os.path.exists(out_path):
        sys.stderr.write(f"= {key}.png (existe)\n")
        return
    sys.stderr.write(f"+ {key}.png ({lang_in})\n")
    sys.stderr.flush()
    await client.create(code=src, language=language, file=f"{key}.png")


async def main() -> None:
    # En Windows el stdin por defecto puede ser cp1252; forzamos UTF-8
    # para que los snippets con tildes/ñ lleguen intactos al renderer.
    try:
        sys.stdin.reconfigure(encoding="utf-8")
    except Exception:
        pass
    raw = sys.stdin.read()
    if not raw.strip():
        sys.stderr.write("[render-code] stdin vacío, nada para hacer\n")
        return
    items: list[dict[str, Any]] = json.loads(raw)
    if not items:
        sys.stderr.write("[render-code] manifiesto vacío\n")
        return
    os.makedirs(OUT_DIR, exist_ok=True)
    chromium_path = os.environ.get("CHROMIUM_PATH") or _detect_chromium()
    if chromium_path:
        sys.stderr.write(f"[render-code] usando Chromium local: {chromium_path}\n")
    client = Carbon(
        downloads_dir=OUT_DIR,
        colour="rgba(0,0,0,1)",
        theme="vscode",
        window_controls=False,
        window_theme=None,
        horizontal_padding="0px",
        vertical_padding="0px",
        shadow=False,
        font_family="Hack",
        font_size="14px",
        line_numbers=False,
        width_adjustment=True,
        export_size="2x",
        watermark=False,
        chromium_path=chromium_path,
    )
    for item in items:
        await _render_one(client, item)


if __name__ == "__main__":
    asyncio.run(main())
