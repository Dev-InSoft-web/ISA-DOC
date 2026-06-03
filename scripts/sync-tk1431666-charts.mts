#!/usr/bin/env tsx
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ultraByTypeBarChartConfig, ultraTotalsBarChartConfig } from "../src/lib/features/tickets/patyia-prompt-metrics.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const assets = resolve(__dirname, "..", "src", "lib", "tickets", "assets", "TK-1431666");

writeFileSync(
	resolve(assets, "tk1431666-tokens-totales.chart.json"),
	`${JSON.stringify(ultraTotalsBarChartConfig(), null, "\t")}\n`,
);
writeFileSync(
	resolve(assets, "tk1431666-tokens-por-tipo.chart.json"),
	`${JSON.stringify(ultraByTypeBarChartConfig(), null, "\t")}\n`,
);
console.log("✓ chart JSON TK-1431666");
