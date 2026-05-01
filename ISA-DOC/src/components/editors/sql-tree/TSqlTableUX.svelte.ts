import type { ParsedTable, TableColumn, TableRow, TableSection, TableOptional } from "../../../lib/tableSchema";
import { isSectionRow, isSectionEndRow, isOptionalRow, isAnySectionRow } from "../../../lib/tableSchema";
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
		// Un único contador top-level garantiza ids únicos al intercalar secciones y
		// columnas raíz en cualquier orden.
		let topIdx = 0;
		let lastSectionId = "";
		let columnIdx = 0;
		for (const row of parsed.columns) {
			if (isSectionEndRow(row)) {
				lastSectionId = "";
				continue;
			}
			if (isOptionalRow(row)) {
				topIdx += 1;
				const sid = String(topIdx);
				lastSectionId = sid;
				columnIdx = 0;
				out.push(TSqlNodeUX.fromOptional(row as TableOptional, sid, tableId, stack));
			} else if (isSectionRow(row)) {
				topIdx += 1;
				const sid = String(topIdx);
				lastSectionId = sid;
				columnIdx = 0;
				// Migración tácita: la sección AUDITORIA siempre se promueve a `optional`
				// para que herede el comportamiento de show/hide. El SQL parseado puede
				// venir como `section` (legacy) o `optional`; ambos casos quedan
				// homogeneizados en memoria.
				if ((row as TableSection).name === "AUDITORIA") {
					out.push(TSqlNodeUX.fromOptional(
						{ kind: "optional", name: "AUDITORIA", show: true },
						sid,
						tableId,
						stack,
					));
				} else {
					out.push(TSqlNodeUX.fromSection(row as TableSection, sid, tableId, stack));
				}
			} else {
				const col = row as TableColumn;
				if (lastSectionId) {
					columnIdx += 1;
					const cid = `${lastSectionId}.${columnIdx}`;
					const node = TSqlNodeUX.fromColumn(col, cid, lastSectionId, tableId, stack);
					out.push(node);
				} else {
					topIdx += 1;
					const cid = String(topIdx);
					const node = TSqlNodeUX.fromColumn(col, cid, "", tableId, stack);
					out.push(node);
				}
			}
		}
		// Reubica la sección AUDITORIA (ahora siempre `optional`) al final, junto con
		// sus columnas hijas, sin alterar el orden relativo del resto.
		const auditSection = out.find((n) => (n.kind === "optional" || n.kind === "section") && n.rowName === "AUDITORIA");
		if (auditSection) {
			const auditId = auditSection.flatPath;
			const auditChildren = out.filter((n) => n.kind === "column" && n.ireference === auditId);
			const auditSet = new Set<TSqlNodeUX>([auditSection, ...auditChildren]);
			const rest = out.filter((n) => !auditSet.has(n));
			return [...rest, auditSection, ...auditChildren];
		}
		return out;
	}

	/** ¿Existe la sección AUDITORIA (clásica u optional) en el estado actual? */
	hasAudit(): boolean {
		return this.rows.some((r) => (r.kind === "section" || r.kind === "optional") && r.rowName === "AUDITORIA");
	}

	/** Nodo `optional` de AUDITORIA si existe. */
	auditOptionalNode(): TSqlNodeUX | undefined {
		return this.rows.find((r) => r.kind === "optional" && r.rowName === "AUDITORIA");
	}

	/** Conjunto de columnas de auditoría por defecto (cuando se activa el switch). */
	static defaultAuditColumns(): TableColumn[] {
		return [
			{ kind: "col", name: "IAPPULT", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
			{ kind: "col", name: "IPULT", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
			{ kind: "col", name: "IUSUARIOULT", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
			{ kind: "col", name: "FHULT", type: "DATETIME2", nullable: "", defaultValue: "GETDATE()", primaryKey: false, extra: "" },
			{ kind: "col", name: "IAPPCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
			{ kind: "col", name: "IPCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
			{ kind: "col", name: "IUSUARIOCRE", type: "VARCHAR(255)", nullable: "", defaultValue: "", primaryKey: false, extra: "" },
			{ kind: "col", name: "FHCRE", type: "DATETIME2", nullable: "", defaultValue: "GETDATE()", primaryKey: false, extra: "" },
		];
	}

	exportToParsed(): ParsedTable {
		const flat = this.rows;
		const childrenBySection = new Map<string, TSqlNodeUX[]>();
		for (const n of flat) {
			if (n.kind === "section" || n.kind === "optional") childrenBySection.set(n.flatPath, []);
		}
		for (const n of flat) {
			if (n.kind !== "column") continue;
			const refId = String(n.ireference || "").trim();
			if (refId && childrenBySection.has(refId)) childrenBySection.get(refId)!.push(n);
		}
		// Emite los nodos raíz en su orden visual real (mezclando secciones y columnas
		// raíz). Usa `section_end` como sentinela explícito para cerrar una sección
		// abierta antes de una columna raíz, preservando la jerarquía al re-parsear.
		const columns: TableRow[] = [];
		let openSection = false;
		for (const n of flat) {
			const refId = String(n.ireference || "").trim();
			if (refId) continue; // hijos: se emiten dentro de su sección
			if (n.kind === "optional") {
				// Una sección opcional inactiva NO se procesa: se omite del SQL,
				// de los snippets y de cualquier resume() consumidor. Sus columnas
				// hijas tampoco se emiten (se conservan en memoria, invisibles).
				if (!n.active) continue;
				if (openSection) columns.push({ kind: "section_end" });
				columns.push(n.toOptional());
				openSection = true;
				for (const c of childrenBySection.get(n.flatPath) ?? []) columns.push(c.toColumn());
			} else if (n.kind === "section") {
				if (openSection) columns.push({ kind: "section_end" });
				columns.push(n.toSection());
				openSection = true;
				for (const c of childrenBySection.get(n.flatPath) ?? []) columns.push(c.toColumn());
			} else {
				if (openSection) {
					columns.push({ kind: "section_end" });
					openSection = false;
				}
				columns.push(n.toColumn());
			}
		}
		const next: ParsedTable = {
			...this.parsed,
			columns,
			compositePrimaryKey: this.parsed.compositePrimaryKey.filter((c) =>
				columns.some((cc) => !isAnySectionRow(cc) && !isSectionEndRow(cc) && (cc as TableColumn).name === c),
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
