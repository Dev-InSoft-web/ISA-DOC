import type { ColumnInfo } from "./schema.js";
import { castExpression, emptyPlaceholderExpression } from "./sql-types.js";

export type ColumnPlanStrategy =
	| "exact"
	| "normalized"
	| "manual"
	| "unmapped"
	| "empty-not-null"
	| `fuzzy(${string})`;

export interface ColumnPlanEntry {
	dest: ColumnInfo;
	sourceColumn: ColumnInfo | null;
	selectExpr: string;
	strategy: ColumnPlanStrategy;
}

export type TableManualMapping = Record<string, string | undefined>;

function norm(name: string): string {
	return String(name || "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-zA-Z0-9]/g, "")
		.toUpperCase();
}

function lcsRatio(a: string, b: string): number {
	const x = norm(a);
	const y = norm(b);
	if (!x || !y) return 0;
	const m: number[][] = Array.from({ length: x.length + 1 }, () => new Array<number>(y.length + 1).fill(0));
	for (let i = 1; i <= x.length; i += 1) {
		for (let j = 1; j <= y.length; j += 1) {
			m[i][j] = x[i - 1] === y[j - 1] ? m[i - 1][j - 1] + 1 : Math.max(m[i - 1][j], m[i][j - 1]);
		}
	}
	const lcs = m[x.length][y.length];
	return lcs / Math.max(x.length, y.length);
}

function sourceExprFromRule(rule: string): string {
	if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(rule)) return `s.[${rule}]`;
	return rule;
}

export function buildColumnPlan(
	destColumns: ColumnInfo[],
	sourceColumns: ColumnInfo[],
	tableManualMapping: TableManualMapping = {},
): ColumnPlanEntry[] {
	const srcByName = new Map(sourceColumns.map((c) => [c.column_name.toUpperCase(), c]));
	const srcByNorm = new Map(sourceColumns.map((c) => [norm(c.column_name), c]));
	const usedSourceCols = new Set<string>();
	const plan: ColumnPlanEntry[] = [];

	for (const destCol of destColumns) {
		const destName = destCol.column_name;
		const destKey = destName.toUpperCase();
		const manualRule = tableManualMapping[destName] ?? tableManualMapping[destKey];

		if (manualRule) {
			const srcExpr = sourceExprFromRule(manualRule);
			plan.push({
				dest: destCol,
				sourceColumn: null,
				selectExpr: castExpression(srcExpr, destCol),
				strategy: "manual",
			});
			continue;
		}

		let selected: ColumnInfo | null = srcByName.get(destKey) ?? null;
		let strategy: ColumnPlanStrategy = "exact";

		if (!selected) {
			selected = srcByNorm.get(norm(destName)) ?? null;
			if (selected) strategy = "normalized";
		}

		if (!selected) {
			let best: ColumnInfo | null = null;
			let bestScore = 0;
			for (const srcCol of sourceColumns) {
				if (usedSourceCols.has(srcCol.column_name.toUpperCase())) continue;
				const score = lcsRatio(srcCol.column_name, destName);
				if (score > bestScore) {
					bestScore = score;
					best = srcCol;
				}
			}
			if (best && bestScore >= 0.82) {
				selected = best;
				strategy = `fuzzy(${bestScore.toFixed(2)})`;
			}
		}

		if (!selected) {
			const nullable = String(destCol.is_nullable).toUpperCase() === "YES";
			if (nullable) {
				plan.push({
					dest: destCol,
					sourceColumn: null,
					selectExpr: "NULL",
					strategy: "unmapped",
				});
			} else {
				plan.push({
					dest: destCol,
					sourceColumn: null,
					selectExpr: emptyPlaceholderExpression(destCol),
					strategy: "empty-not-null",
				});
			}
			continue;
		}

		usedSourceCols.add(selected.column_name.toUpperCase());
		plan.push({
			dest: destCol,
			sourceColumn: selected,
			selectExpr: castExpression(`s.[${selected.column_name}]`, destCol),
			strategy,
		});
	}

	return plan;
}
