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
		const flat = this.rows;
		const childrenBySection = new Map<string, TSqlNodeUX[]>();
		for (const n of flat) {
			if (n.kind === "section") childrenBySection.set(n.id, []);
		}
		for (const n of flat) {
			if (n.kind !== "column") continue;
			const refId = String(n.ireference || "").trim();
			if (refId && childrenBySection.has(refId)) childrenBySection.get(refId)!.push(n);
		}
		// Para preservar la jerarquía explícita en el formato SQL secuencial:
		// 1) Las columnas raíz (sin sección padre) se emiten ANTES de cualquier sección.
		//    De lo contrario, al recargar quedarían anidadas bajo la sección que las precede.
		// 2) Luego cada sección emite sus columnas hijas en orden visual.
		const columns: TableRow[] = [];
		for (const n of flat) {
			if (n.kind !== "column") continue;
			const refId = String(n.ireference || "").trim();
			if (!refId || !childrenBySection.has(refId)) columns.push(n.toColumn());
		}
		for (const n of flat) {
			if (n.kind !== "section") continue;
			columns.push(n.toSection());
			for (const c of childrenBySection.get(n.id) ?? []) columns.push(c.toColumn());
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
