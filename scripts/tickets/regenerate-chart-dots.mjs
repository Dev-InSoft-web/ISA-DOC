#!/usr/bin/env node
/**
 * Regenera *.dot de barras desde *.chart.json en assets de tickets.
 * Uso: node scripts/tickets/regenerate-chart-dots.mjs [TK-1431666]
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { barChartJsonToDot } from "../lib/chart-json-to-dot.mjs";
import { ASSETS_ROOT } from "../lib/ticket-assets-lib.mjs";

const ticketId = process.argv[2] ?? "TK-1431666";
const ticketDir = path.join(ASSETS_ROOT, ticketId);

const entries = await fs.readdir(ticketDir);
for (const name of entries) {
	if (!name.endsWith(".chart.json")) continue;
	const chartPath = path.join(ticketDir, name);
	const chart = JSON.parse(await fs.readFile(chartPath, "utf8"));
	const graphId = name.replace(".chart.json", "").replace(/-/g, "_");
	const dot = barChartJsonToDot(chart, graphId);
	const outPath = path.join(ticketDir, name.replace(".chart.json", ".dot"));
	await fs.writeFile(outPath, `${dot}\n`, "utf8");
	console.log(`✓ ${path.relative(ASSETS_ROOT, outPath)}`);
}
