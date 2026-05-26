export interface SqlColumnNode {
	name: string;
	dataType: string;
	maxLen: number | null;
	nullable: boolean;
	isPk: boolean;
}

export interface SqlTableNode {
	name: string;
	columns: SqlColumnNode[];
	rows: number | null;
	expanded: boolean;
}

export interface SqlDatabaseNode {
	name: string;
	tables: SqlTableNode[];
	expanded: boolean;
}

export interface SqlSchemaController {
	readonly title: string;
	readonly subtitle: string;
	readonly footnote: string;
	loadSchema(): Promise<SqlDatabaseNode[]>;
}
