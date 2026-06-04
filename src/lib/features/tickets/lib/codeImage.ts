// codeImage(src, lang) — versión browser-safe.
//
// Solo hace LOOKUP en `assets/_meta/code-imgs.json` (mapa sha1(lang+src) → {url, w, h}).
// La generación real de las imágenes corre en build vía
// `scripts/build-code-images.mjs` + `scripts/render-code.py` (carbon-api,
// que internamente usa carbon.now.sh). Aquí no se importa nada de Node.
//
// Si la entrada no existe en el JSON, devuelve `null`. Cuando se ejecuta
// dentro del script de build (env `CODE_IMG_BUILD=1`), las llamadas con
// miss se registran en `__codeImgQueue` para que el script las procese.

import codeMapRaw from "../assets/_meta/code-imgs.json" with { type: "json" };
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

/** SHA-1 en hex; usa Web Crypto o fallback JS (HTTP sin contexto seguro). */
async function sha1Hex(input: string): Promise<string> {
	const data = new TextEncoder().encode(input);
	const subtle = globalThis.crypto?.subtle;
	if (subtle) {
		const buf = await subtle.digest("SHA-1", data);
		return Array.from(new Uint8Array(buf))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");
	}
	return sha1HexFallback(data);
}

function sha1HexFallback(bytes: Uint8Array): string {
	let h0 = 0x67452301;
	let h1 = 0xefcdab89;
	let h2 = 0x98badcfe;
	let h3 = 0x10325476;
	let h4 = 0xc3d2e1f0;
	const bitLen = bytes.length * 8;
	const withOne = new Uint8Array(((bytes.length + 9 + 63) >> 6) << 6);
	withOne.set(bytes);
	withOne[bytes.length] = 0x80;
	const view = new DataView(withOne.buffer);
	view.setUint32(withOne.length - 4, bitLen >>> 0, false);
	view.setUint32(withOne.length - 8, Math.floor(bitLen / 0x100000000), false);
	for (let off = 0; off < withOne.length; off += 64) {
		const w = new Uint32Array(80);
		for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + i * 4, false);
		for (let i = 16; i < 80; i++) {
			w[i] = rotl(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
		}
		let a = h0;
		let b = h1;
		let c = h2;
		let d = h3;
		let e = h4;
		for (let i = 0; i < 80; i++) {
			let f: number;
			let k: number;
			if (i < 20) {
				f = (b & c) | (~b & d);
				k = 0x5a827999;
			} else if (i < 40) {
				f = b ^ c ^ d;
				k = 0x6ed9eba1;
			} else if (i < 60) {
				f = (b & c) | (b & d) | (c & d);
				k = 0x8f1bbcdc;
			} else {
				f = b ^ c ^ d;
				k = 0xca62c1d6;
			}
			const temp = (rotl(a, 5) + f + e + k + w[i]) >>> 0;
			e = d;
			d = c;
			c = rotl(b, 30);
			b = a;
			a = temp;
		}
		h0 = (h0 + a) >>> 0;
		h1 = (h1 + b) >>> 0;
		h2 = (h2 + c) >>> 0;
		h3 = (h3 + d) >>> 0;
		h4 = (h4 + e) >>> 0;
	}
	return [h0, h1, h2, h3, h4].map((n) => n.toString(16).padStart(8, "0")).join("");
}

function rotl(n: number, s: number): number {
	return ((n << s) | (n >>> (32 - s))) >>> 0;
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

