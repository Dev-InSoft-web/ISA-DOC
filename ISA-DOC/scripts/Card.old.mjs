#!/usr/bin/env node
/**
 * Lee el payload entre // --- y // ---- en Card.old.svelte (junto a este script),
 * lo convierte a cuerpo JS para new Function, minifica con esbuild y ofusca con
 * selectores Unicode → escribe ISP-SvelteComponents/src/lib/containers/Card.svelte.
 *
 * Desde ISA-DOC: node ./scripts/Card.old.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ISP_CARD_PATH = resolve(__dirname, "../../../../ISP-SvelteComponents/src/lib/containers/Card.svelte");

const OPEN_MARKER = "// ---";
const CLOSE_MARKER = "// ----";

/** Misma lógica que el antiguo generador PS1: TS de referencia → JS válido para new Function. */
/** @param {string} source */
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
/** @param {string} source */
function toVariationSelectorString(source) {
   const bytes = new TextEncoder().encode(source);
   let out = "";
   for (const b of bytes) {
      if (b < 16) {
         out += String.fromCharCode(0xfe00 + b);
      } else {
         out += String.fromCodePoint(0xe0100 + (b - 16));
      }
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
   const cardPath = ISP_CARD_PATH;

   const cardOldContent = readFileSync(cardOldPath, "utf8");

   const openIdx = cardOldContent.indexOf(OPEN_MARKER);
   if (openIdx < 0) {
      throw new Error(`Opening marker '${OPEN_MARKER}' not found in Card.old.svelte`);
   }
   const openLineEnd = cardOldContent.indexOf("\n", openIdx);
   if (openLineEnd < 0) {
      throw new Error("Could not find end of opening marker line");
   }

   const closeIdx = cardOldContent.indexOf(CLOSE_MARKER, openLineEnd);
   if (closeIdx < 0) {
      throw new Error(`Closing marker '${CLOSE_MARKER}' not found in Card.old.svelte`);
   }

   let closeLineEnd = cardOldContent.indexOf("\n", closeIdx);
   if (closeLineEnd < 0) {
      closeLineEnd = cardOldContent.length;
   }

   const prefix = cardOldContent.slice(0, openIdx);
   const payload = cardOldContent.slice(openLineEnd + 1, closeIdx).trim();
   const suffix = cardOldContent.slice(closeLineEnd);

   const payloadJs = convertPayloadToNewFunctionBody(payload);

   const { code: minified } = await esbuild.transform(payloadJs, {
      loader: "js",
      minify: true,
      minifyIdentifiers: true,
      legalComments: "none",
      target: "es2020",
   });

   const encodedPayload = toVariationSelectorString(minified);

   const cardOutput =
      prefix.trimEnd() +
      "\r\n\r\n" +
      RUNTIME_BLOCK.replace("__ENCODED__", encodedPayload).trimEnd() +
      "\r\n" +
      suffix.trimStart();

   writeFileSync(cardPath, cardOutput, "utf8");
   console.log("Card.svelte generated with obfuscated relieve block (esbuild minify → VS encode).");
}

main().catch((err) => {
   console.error(err);
   process.exit(1);
});
