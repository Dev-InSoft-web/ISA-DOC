#!/usr/bin/env node
/**
 * Toma `./Card.old.svelte` (con imports al paquete `@ingenieria_insoft/ispsveltecomponents`
 * para que VSCode / svelte-check los resuelvan correctamente) y lo "quema" en
 * ISP-SvelteComponents/src/lib/containers/Card.svelte:
 *   - reescribe los imports del paquete a `$lib/...` y rutas relativas internas
 *   - minifica el payload TS de relieve con esbuild
 *   - ofusca el resultado con variation selectors Unicode
 *   - lo embebe dentro de un RUNTIME_BLOCK que expone `CardHelpers`
 *
 * Para sincronizar el paquete instalado en consumidores locales, usar:
 *   doc/ISA-DOC/scripts/PS1/sync-local-isp-clientesis.ps1
 *
 * Uso desde ISA-DOC: node ./scripts/isp-svelte-burn/burn-card.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ISP_LIB = resolve(__dirname, "../../../../../ISP-SvelteComponents/src/lib");
const ISP_CARD_PATH = join(ISP_LIB, "containers/Card.svelte");

const PKG = "@ingenieria_insoft/ispsveltecomponents";
const NM_BL = "../../node_modules/@ingenieria_insoft/ispsveltecomponents/dist/containers/layout/BlockLayout.svelte";
const IMPORT_REWRITES = [
   {
      from: `import { colorMix, resolveColor, LayoutHelpers, type ComponentColor, type BlockLayoutProps, type BlockLayoutSlots } from "${PKG}";`,
      to: [
         `import { colorMix, resolveColor, type ComponentColor } from "$lib/UlConst";`,
         `   import type { BlockLayoutProps, BlockLayoutSlots } from "./layout/BlockLayout.svelte";`,
         `   import { LayoutHelpers } from "./layout/BlockLayout.svelte";`,
      ].join("\n"),
   },
   {
      from: `import BlockLayout from "${NM_BL}";`,
      to: `import BlockLayout from "./layout/BlockLayout.svelte";`,
   },
];

const OPEN_MARKER = "// ---";
const CLOSE_MARKER = "// ----";

/** TS de referencia → JS válido para new Function. */
function convertPayloadToNewFunctionBody(source) {
   let s = source;
   s = s.replace(/^\s*export const /gm, "   const ");
   s = s.replace(
      /\(variant: string, relieve: number, baseCssColor: string\): string/,
      "(variant, relieve, baseCssColor)",
   );
   s = s.replace(
      /\(variant: string, relieve: number\): string \| undefined/,
      "(variant, relieve)",
   );
   s = s.replace(
      /\(relieve: number\): \{ percent: number; angleIndex: number; elevation: number \}/,
      "(relieve)",
   );
   s = s.replace(/\(angleDeg: number\): \[number, number\]/, "(angleDeg)");
   s = s.replace(/return hit as \[number, number\]/, "return hit");
   s = s.replace(/const shadows: string\[\]/, "const shadows");
   s = s.replace(
      /\(inset: boolean, x: number, y: number, blur: number, spread: number, color: string\)/,
      "(inset, x, y, blur, spread, color)",
   );
   s = s.replace(
      /\(i: boolean, x: number, y: number, b: number, s: number, c: string\)/,
      "(i, x, y, b, s, c)",
   );
   s = s.replace(/\(r: number, g: number, b: number, alpha: number\)/, "(r, g, b, alpha)");
   s = s.replace(/\(r: number, g: number, b: number, a: number\)/, "(r, g, b, a)");
   s = s.replace(/\(n: number\)/g, "(n)");
   s = s.replace(/\(relieve: number\)/g, "(relieve)");
   s = s.trimEnd() + "\nreturn {cardShadow,cardBg};";
   return s;
}

/** Codifica UTF-8 como secuencia de variation selectors. */
function toVariationSelectorString(source) {
   const bytes = new TextEncoder().encode(source);
   let out = "";
   for (const b of bytes) {
      if (b < 16) out += String.fromCharCode(0xfe00 + b);
      else out += String.fromCodePoint(0xe0100 + (b - 16));
   }
   return out;
}

const RUNTIME_BLOCK = `   export const CardHelpers = {
      effect: {
         get bmp() {
            return [0xfe00, 0xfe0f] as const;
         },
         get ext() {
            return [0xe0100, 0xe01ef] as const;
         },
         inRng: (v: number, min: number, max: number): boolean => v >= min && v <= max,
         resume(ch: string): number[] {
            const cp = ch.codePointAt(0) || 0;
            return this.inRng(cp, ...this.bmp) ? [cp - this.bmp[0]] : this.inRng(cp, ...this.ext) ? [cp - this.ext[0] + 16] : [];
         },
      },
      get simpleStyle() {
         return [
            "box-shadow: inset -2.07px -2.07px 3.63px 0 rgba(255,255,255,0.05), inset 2.07px 2.07px 2.73px 0 rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02), 0 12px 28px -8px rgba(0,0,0,0.08), __ENCODED__" +
               colorMix(mkAlpha("black", 6), "transparent", 14) +
               ", 1.84px 1.54px 3.5px 0.3px " +
               mkAlpha("black", 6),
            "background-color: " + colorMix(resolveColor("card"), "white", 50),
            colorMix("black", "transparent", 6) + " " + bg2font(resolveColor("card")),
         ].join(";");
      },
      get genstyle() {
         // @ts-ignore
         return new Function("resolveColor", "colorMix", "mkAlpha", new TextDecoder().decode(new Uint8Array(Array.from(this.simpleStyle).flatMap((ch) => this.effect.resume(ch)))))(resolveColor, colorMix, mkAlpha);
      },
      crdShdw(vrnt: string, rlv: number): string | undefined {
         return this.genstyle.cardShadow(vrnt, rlv);
      },
      crdBg(vrnt: string, rlv: number, clr: string): string {
         return this.genstyle.cardBg(vrnt, rlv, clr);
      },
   };
`;

async function main() {
   const cardOldPath = join(__dirname, "Card.old.svelte");
   let src = readFileSync(cardOldPath, "utf8");

   for (const { from, to } of IMPORT_REWRITES) {
      src = src.split(from).join(to);
   }

   const openIdx = src.indexOf(OPEN_MARKER);
   if (openIdx < 0) throw new Error(`Opening marker '${OPEN_MARKER}' not found`);
   const openLineEnd = src.indexOf("\n", openIdx);

   const closeIdx = src.indexOf(CLOSE_MARKER, openLineEnd);
   if (closeIdx < 0) throw new Error(`Closing marker '${CLOSE_MARKER}' not found`);
   let closeLineEnd = src.indexOf("\n", closeIdx);
   if (closeLineEnd < 0) closeLineEnd = src.length;

   const prefix = src.slice(0, openIdx).trimEnd();
   const payload = src.slice(openLineEnd + 1, closeIdx).trim();
   const suffix = src.slice(closeLineEnd).trimStart();

   const payloadJs = convertPayloadToNewFunctionBody(payload);

   const { code: minified } = await esbuild.transform(payloadJs, {
      loader: "js",
      minify: true,
      minifyIdentifiers: true,
      legalComments: "none",
      target: "es2020",
   });

   const encodedPayload = toVariationSelectorString(minified);

   const out =
      prefix +
      "\r\n\r\n" +
      RUNTIME_BLOCK.replace("__ENCODED__", encodedPayload).trimEnd() +
      "\r\n" +
      suffix;

   writeFileSync(ISP_CARD_PATH, out, "utf8");
   console.log("Card.svelte regenerated (obfuscated relieve block: esbuild minify → VS encode).");
   console.log("Para sincronizar consumidores locales, ejecutar: scripts/PS1/sync-local-isp-clientesis.ps1");
}

main().catch((err) => {
   console.error(err);
   process.exit(1);
});
