import { TreeAdapterCatalogoStub } from "$comps/TreeViewLegacy/_treeAdapter/CatalogoStub";
import type { TreeViewProps } from "$comps/TreeViewLegacy/TreeRowView.svelte";
import { TreeRowViewAdapterLegacy } from "$comps/TreeViewLegacy/TreeRowView.svelte";
import { TPatyiaNodeUX } from "./TPatyiaNodeUX";

export interface PatyiaColumnRow {
	TABLE_NAME: string;
	COLUMN_NAME: string;
	DATA_TYPE: string;
	CHARACTER_MAXIMUM_LENGTH: number | null;
	IS_NULLABLE: "YES" | "NO";
	ORDINAL_POSITION: number;
}

export interface PatyiaConstraintRow {
	TABLE_NAME: string;
	CONSTRAINT_TYPE: "PRIMARY KEY" | "UNIQUE" | "FOREIGN KEY";
	COLUMN_NAME: string;
}

export interface PatyiaRowCountRow {
	TABLE_NAME: string;
	ROWS: number;
}

export interface PatyiaDatabaseInput {
	name: string;
	tables: string[];
	columns: PatyiaColumnRow[];
	constraints: PatyiaConstraintRow[];
	rowCounts: PatyiaRowCountRow[];
}

export class PatyiaSqlStack {
	id: string = "patyia-sql";
	rows: TPatyiaNodeUX[] = [];
}

export type PatyiaTableSelect = { databaseName: string; tableName: string } | null;

export class PatyiaSqlAdapter extends TreeRowViewAdapterLegacy<PatyiaSqlStack, TPatyiaNodeUX> {
	public onTableSelect: (sel: PatyiaTableSelect) => void = () => undefined;

	constructor() {
		const stacker = new PatyiaSqlStack();
		const stub = new TreeAdapterCatalogoStub<TPatyiaNodeUX>(() => self);
		super({
			Obj: stacker,
			itdForm: "view",
			small: true,
			brapido: true,
			disabled: false,
			readonly: true,
			showToolbar: false,
			bdrag: false,
			CatalogoController: stub as unknown as TreeViewProps<PatyiaSqlStack, TPatyiaNodeUX>["CatalogoController"],
			TreeController: undefined as unknown as TreeRowViewAdapterLegacy<PatyiaSqlStack, TPatyiaNodeUX>,
		} as TreeViewProps<PatyiaSqlStack, TPatyiaNodeUX>);
		this.context.TreeController = this;
		const self = this;
		void self;
		this.applyAdapterConfig({
			floatCard: { tx: "1rem", ty: "-1em", scale: 0.8 },
		});
	}

	get stack(): PatyiaSqlStack { return this.obj; }
	get stackList(): any[] { return this.obj.rows as unknown as any[]; }
	set stackList(value: any[]) { this.obj.rows = value as unknown as TPatyiaNodeUX[]; }

	get istack(): string { return this.obj.id; }
	get nistack(): string { return "id"; }
	get nodeCtor(): new (...args: any[]) => TPatyiaNodeUX { return TPatyiaNodeUX; }
	get nidNode(): string { return "flatPath"; }
	get ntitleNode(): string { return "rowName"; }

	createNode(data: any): TPatyiaNodeUX {
		if (data instanceof TPatyiaNodeUX) {
			data.refreshUX();
			return data;
		}
		return new TPatyiaNodeUX(data as Partial<TPatyiaNodeUX>);
	}

	getlevelname(nivel?: number): string {
		if (nivel === 1) return "base de datos";
		if (nivel === 2) return "tabla";
		return "columna";
	}

	getEditDriverAttrs(): any[] { return []; }
	getEditAttrsForLevel(_d: any[], _p: TPatyiaNodeUX): any[] { return []; }
	canEditSelectResource(_p: TPatyiaNodeUX, _d: TPatyiaNodeUX): boolean { return false; }
	getEditAtributoValor(_d: TPatyiaNodeUX, _i: number): string { return ""; }
	setEditAtributoValor(d: TPatyiaNodeUX, _i: number, _v: string): TPatyiaNodeUX { return d; }
	setEditRecursoSelected(d: TPatyiaNodeUX, _r: any): TPatyiaNodeUX { return d; }

	protected override getNodeIcon(node: TPatyiaNodeUX, _ctx: { isLastNode: boolean; isFolder: boolean; hasChildren: boolean; isExpanded: boolean; isEmptyFolder: boolean }) {
		if (node?.kind === "database") return { icon: "mdi:database", style: "color: var(--is-info) !important;" };
		if (node?.kind === "table") return { icon: "mdi:table", style: "color: var(--is-primary) !important;" };
		if (node?.kind === "column") {
			if (node.colIsPk) return { icon: "mdi:key", style: "color: var(--is-warning) !important;" };
			if (!node.colNullable) return { icon: "mdi:circle-medium", style: "color: var(--is-info) !important;" };
			return { icon: "mdi:circle-outline", style: "color: var(--is-text-muted, #888) !important;" };
		}
		return null;
	}

	protected override stableExpandKey(obj: TPatyiaNodeUX | null | undefined): string | null {
		if (!obj) return null;
		if (obj.kind === "database") return `database:${obj.databaseName}`;
		if (obj.kind === "table") return `table:${obj.databaseName}.${obj.tableName}`;
		if (obj.kind === "column") return `column:${obj.databaseName}.${obj.tableName}.${obj.rowName}`;
		return null;
	}

	override onrowclick(node: TPatyiaNodeUX): void {
		super.onrowclick(node);
		if (node.kind === "table") {
			this.onTableSelect({ databaseName: node.databaseName, tableName: node.tableName });
			return;
		}
		if (node.kind === "column" && node.databaseName && node.tableName) {
			this.onTableSelect({ databaseName: node.databaseName, tableName: node.tableName });
			return;
		}
	}

	override onrowdblclick(node: TPatyiaNodeUX): void {
		this.onrowclick(node);
	}

	setSchema(databases: PatyiaDatabaseInput[]): void {
		const rows: TPatyiaNodeUX[] = [];
		databases.forEach((db, dbIdx) => {
			const dbPath = String(dbIdx + 1);
			const pkSet: Set<string> = new Set();
			for (const c of db.constraints) {
				if (c.CONSTRAINT_TYPE === "PRIMARY KEY") pkSet.add(`${c.TABLE_NAME}.${c.COLUMN_NAME}`);
			}
			const rowCount: Map<string, number> = new Map();
			for (const r of db.rowCounts) rowCount.set(r.TABLE_NAME, Number(r.ROWS));
			const byTable: Map<string, PatyiaColumnRow[]> = new Map();
			for (const t of db.tables) byTable.set(t, []);
			for (const c of db.columns) {
				const arr = byTable.get(c.TABLE_NAME);
				if (arr) arr.push(c);
			}
			for (const t of db.tables) {
				const arr = byTable.get(t);
				if (arr) arr.sort((a, b) => a.ORDINAL_POSITION - b.ORDINAL_POSITION);
			}

			rows.push(new TPatyiaNodeUX({
				kind: "database",
				flatPath: dbPath,
				rowName: db.name,
				databaseName: db.name,
				columnCount: db.tables.length,
			}));

			db.tables.forEach((tName, tIdx) => {
				const tPath = `${dbPath}.${tIdx + 1}`;
				const cols = byTable.get(tName) ?? [];
				rows.push(new TPatyiaNodeUX({
					kind: "table",
					flatPath: tPath,
					ireference: dbPath,
					rowName: tName,
					databaseName: db.name,
					tableName: tName,
					columnCount: cols.length,
					tableRows: rowCount.has(tName) ? rowCount.get(tName)! : null,
				}));
				cols.forEach((c, cIdx) => {
					rows.push(new TPatyiaNodeUX({
						kind: "column",
						flatPath: `${tPath}.${cIdx + 1}`,
						ireference: tPath,
						rowName: c.COLUMN_NAME,
						databaseName: db.name,
						tableName: tName,
						colDataType: c.DATA_TYPE,
						colMaxLen: c.CHARACTER_MAXIMUM_LENGTH,
						colNullable: c.IS_NULLABLE === "YES",
						colIsPk: pkSet.has(`${tName}.${c.COLUMN_NAME}`),
					}));
				});
			});
		});
		this.obj.rows = rows;
		this.onrefresh();
		this.syncAllRowAdapters();
	}
}
