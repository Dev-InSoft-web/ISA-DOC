#!/usr/bin/env node
/**
 * Toma `./Card.old.svelte` (con imports relativos al node_modules de ISA-DOC,
 * para que VSCode / svelte-check los resuelvan correctamente) y lo "quema" en
 * ISP-SvelteComponents/src/lib/containers/Card.svelte:
 *   - reescribe los imports a `$lib/...` (alias del paquete fuente)
 *   - exporta `CardHelpers`
 *
 * Para sincronizar el paquete instalado en consumidores locales, usar:
 *   doc/ISA-DOC/scripts/PS1/sync-local-isp-clientesis.ps1
 *
 * Uso desde ISA-DOC: node ./scripts/isp-svelte-burn/burn-card.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

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

function main() {
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

   const exposedPayload = payload.replace(/^   const CardHelpers = /m, "   export const CardHelpers = ");

   const out = prefix + "\n\n" + exposedPayload + "\n" + suffix;
   writeFileSync(ISP_CARD_PATH, out, "utf8");
   console.log("Card.svelte regenerated (plain, exported CardHelpers).");
   console.log("Para sincronizar consumidores locales, ejecutar: scripts/PS1/sync-local-isp-clientesis.ps1");
}

main();
