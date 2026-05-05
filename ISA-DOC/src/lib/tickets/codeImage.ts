// codeImage(src, lang) — versión browser-safe.
//
// Solo hace LOOKUP en `assets/code-imgs.json` (mapa sha1(lang+src) → {url, w, h}).
// La generación real de las imágenes corre en build vía
// `scripts/build-code-images.mjs` + `scripts/render-code.py` (carbon-api,
// que internamente usa carbon.now.sh). Aquí no se importa nada de Node.
//
// Si la entrada no existe en el JSON, devuelve `null`. Cuando se ejecuta
// dentro del script de build (env `CODE_IMG_BUILD=1`), las llamadas con
// miss se registran en `__codeImgQueue` para que el script las procese.

import codeMapRaw from "./assets/code-imgs.json" with { type: "json" };
import type { CodeLang } from "./snippets";

export interface CodeImageInfo {
	url: string;
	width: number;
	height: number;
}

const codeMap = codeMapRaw as Record<string, CodeImageInfo>;

// `CODE_IMG_BUILD=1` lo activa el script `scripts/build-code-images.mjs`
// para descubrir todas las llamadas a `codeBlock`/`compareTable(code:…)`
// que aún no tienen imagen generada.
const isBuild =
	typeof process !== "undefined" && (process as { env?: Record<string, string | undefined> }).env?.CODE_IMG_BUILD === "1";

interface QueueEntry {
	key: string;
	lang: CodeLang;
	src: string;
}
export const __codeImgQueue: QueueEntry[] = [];
const queuedKeys = new Set<string>();

async function sha1Hex(input: string): Promise<string> {
	const data = new TextEncoder().encode(input);
	const buf = await globalThis.crypto.subtle.digest("SHA-1", data);
	return Array.from(new Uint8Array(buf))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

export async function codeImageKey(src: string, lang: CodeLang): Promise<string> {
	return sha1Hex(`${lang}\0${src}`);
}

// Devuelve la info de imagen si está pre-generada en `code-imgs.json`,
// `null` si todavía no existe (caller debe usar fallback Lezer/CodeMirror).
export async function lookupCodeImage(src: string, lang: CodeLang): Promise<CodeImageInfo | null> {
	const key = await codeImageKey(src, lang);
	const hit = codeMap[key];
	if (hit) return hit;
	if (isBuild && !queuedKeys.has(key)) {
		queuedKeys.add(key);
		__codeImgQueue.push({ key, lang, src });
	}
	return null;
}

