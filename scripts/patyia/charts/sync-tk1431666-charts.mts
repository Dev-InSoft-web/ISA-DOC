#!/usr/bin/env tsx
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ultraByTypeBarChartConfig, ultraTotalsBarChartConfig } from "../../../src/lib/features/tickets/patyia-prompt-metrics.ts";
import { ISA_DOC_ROOT } from "../../_shared/isa-doc-root.ts";

const assets = resolve(ISA_DOC_ROOT, "src", "lib", "tickets", "assets", "TK-1431666");

writeFileSync(
	resolve(assets, "tk1431666-tokens-totales.chart.json"),
	`${JSON.stringify(ultraTotalsBarChartConfig(), null, "\t")}\n`,
);
writeFileSync(
	resolve(assets, "tk1431666-tokens-por-tipo.chart.json"),
	`${JSON.stringify(ultraByTypeBarChartConfig(), null, "\t")}\n`,
);
console.log("✓ chart JSON TK-1431666");
