import type { ParsedTable, TableColumn, TableRow, TableSection } from "../../../lib/tableSchema";
import { isSectionRow } from "../../../lib/tableSchema";
import { TSqlNodeUX } from "./TSqlNodeUX.svelte";

export class TSqlTableUX {
	tableId: string = "";
	rows: TSqlNodeUX[] = [];
	parsed!: ParsedTable;

	constructor(parsed?: ParsedTable) {
		if (parsed) {
			this.parsed = parsed;
			this.tableId = `${parsed.fragmentId}::${parsed.originalName || parsed.name}`;
			this.rows = TSqlTableUX.buildRowsFromParsed(parsed, this);
		}
	}

	static buildRowsFromParsed(parsed: ParsedTable, stack: any): TSqlNodeUX[] {
		const tableId = `${parsed.fragmentId}::${parsed.originalName || parsed.name}`;
		const out: TSqlNodeUX[] = [];
		let sectionIdx = 0;
		let lastSectionId = "";
		let columnIdx = 0;
		let rootColumnIdx = 0;
		for (const row of parsed.columns) {
			if (isSectionRow(row)) {
				sectionIdx += 1;
				const sid = String(sectionIdx);
				lastSectionId = sid;
				columnIdx = 0;
				out.push(TSqlNodeUX.fromSection(row as TableSection, sid, tableId, stack));
			} else {
				const col = row as TableColumn;
				if (lastSectionId) {
					columnIdx += 1;
					const cid = `${lastSectionId}.${columnIdx}`;
					const node = TSqlNodeUX.fromColumn(col, cid, lastSectionId, tableId, stack);
					out.push(node);
				} else {
					rootColumnIdx += 1;
					sectionIdx = rootColumnIdx;
					const cid = String(rootColumnIdx);
					const node = TSqlNodeUX.fromColumn(col, cid, "", tableId, stack);
					out.push(node);
				}
			}
		}
		return out;
	}

	exportToParsed(): ParsedTable {
		const flat = this.rows.slice().sort((a, b) => compareDotIds(a.id, b.id));
		const columns: TableRow[] = [];
		const childrenBySection = new Map<string, TSqlNodeUX[]>();
		const sections: TSqlNodeUX[] = [];
		const orphans: TSqlNodeUX[] = [];
		for (const n of flat) {
			if (n.kind === "section") {
				sections.push(n);
				childrenBySection.set(n.id, []);
			}
		}
		for (const n of flat) {
			if (n.kind !== "column") continue;
			const refId = String(n.ireference || "").trim();
			if (refId && childrenBySection.has(refId)) {
				childrenBySection.get(refId)!.push(n);
			} else {
				orphans.push(n);
			}
		}
		const inSectionOrder = (list: TSqlNodeUX[]) =>
			list.slice().sort((a, b) => compareDotIds(a.id, b.id));
		for (const o of inSectionOrder(orphans)) columns.push(o.toColumn());
		for (const s of inSectionOrder(sections)) {
			columns.push(s.toSection());
			for (const c of inSectionOrder(childrenBySection.get(s.id) ?? [])) {
				columns.push(c.toColumn());
			}
		}
		const next: ParsedTable = {
			...this.parsed,
			columns,
			compositePrimaryKey: this.parsed.compositePrimaryKey.filter((c) =>
				columns.some((cc) => !isSectionRow(cc) && (cc as TableColumn).name === c),
			),
		};
		this.parsed = next;
		return next;
	}

	clone(): TSqlTableUX {
		const c = Object.create(TSqlTableUX.prototype) as TSqlTableUX;
		Object.assign(c, this);
		c.rows = this.rows.map((r) => r.clone());
		return c;
	}
}

function compareDotIds(a: string, b: string): number {
	const pa = a.split(".").map((p) => parseInt(p, 10) || 0);
	const pb = b.split(".").map((p) => parseInt(p, 10) || 0);
	const len = Math.max(pa.length, pb.length);
	for (let i = 0; i < len; i++) {
		const va = pa[i] ?? 0;
		const vb = pb[i] ?? 0;
		if (va !== vb) return va - vb;
	}
	return 0;
}
