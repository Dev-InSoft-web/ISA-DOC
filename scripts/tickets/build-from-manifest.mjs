#!/usr/bin/env node
/**
 * Lee assets/<TK-ID>/manifest.json y ejecuta el pipeline mmd/chart → PNG → imgbb.
 * Uso: node scripts/tickets/build-from-manifest.mjs TK-1431163
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ASSETS_ROOT, ROOT, buildTicketAssets } from "../lib/ticket-assets-lib.mjs";

const ticketId = process.argv[2];
if (!ticketId) {
	console.error("Uso: node scripts/tickets/build-from-manifest.mjs <TK-ID>");
	process.exit(1);
}

const manifestPath = path.join(ASSETS_ROOT, ticketId, "manifest.json");
const raw = await fs.readFile(manifestPath, "utf8");
const manifest = JSON.parse(raw);
if (manifest.ticketId !== ticketId) {
	console.warn(`Aviso: manifest.ticketId=${manifest.ticketId} ≠ argumento ${ticketId}`);
}

await buildTicketAssets(ticketId, manifest.assets);
