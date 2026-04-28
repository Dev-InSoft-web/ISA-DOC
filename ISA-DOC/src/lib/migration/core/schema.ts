import type sql from "mssql";

export interface ColumnInfo {
	table_schema: string;
	table_name: string;
	column_name: string;
	ordinal_position: number;
	data_type: string;
	character_maximum_length: number | null;
	numeric_precision: number | null;
	numeric_scale: number | null;
	is_nullable: string;
}

export interface TableRef {
	TABLE_SCHEMA: string;
	TABLE_NAME: string;
}

export async function fetchTables(
	pool: sql.ConnectionPool,
	schema = "dbo",
	likePattern = "CAPAC%_OLD",
): Promise<TableRef[]> {
	const rs = await pool
		.request()
		.input("schema", schema)
		.input("pattern", likePattern)
		.query<TableRef>(`
      SELECT TABLE_SCHEMA, TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
        AND TABLE_SCHEMA = @schema
        AND TABLE_NAME LIKE @pattern
      ORDER BY TABLE_NAME;
    `);
	return rs.recordset;
}

export async function tableExists(
	pool: sql.ConnectionPool,
	schema: string,
	table: string,
): Promise<boolean> {
	const rs = await pool
		.request()
		.input("schema", schema)
		.input("table", table)
		.query(`
      SELECT 1 AS ok
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
        AND TABLE_SCHEMA = @schema
        AND TABLE_NAME = @table;
    `);
	return rs.recordset.length > 0;
}

interface RawColumn {
	TABLE_SCHEMA: string;
	TABLE_NAME: string;
	COLUMN_NAME: string;
	ORDINAL_POSITION: number;
	DATA_TYPE: string;
	CHARACTER_MAXIMUM_LENGTH: number | null;
	NUMERIC_PRECISION: number | null;
	NUMERIC_SCALE: number | null;
	IS_NULLABLE: string;
}

export async function fetchColumns(
	pool: sql.ConnectionPool,
	schema: string,
	table: string,
): Promise<ColumnInfo[]> {
	const rs = await pool
		.request()
		.input("schema", schema)
		.input("table", table)
		.query<RawColumn>(`
      SELECT
        TABLE_SCHEMA,
        TABLE_NAME,
        COLUMN_NAME,
        ORDINAL_POSITION,
        DATA_TYPE,
        CHARACTER_MAXIMUM_LENGTH,
        NUMERIC_PRECISION,
        NUMERIC_SCALE,
        IS_NULLABLE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = @schema
        AND TABLE_NAME = @table
      ORDER BY ORDINAL_POSITION;
    `);
	return rs.recordset.map((r) => ({
		table_schema: r.TABLE_SCHEMA,
		table_name: r.TABLE_NAME,
		column_name: r.COLUMN_NAME,
		ordinal_position: r.ORDINAL_POSITION,
		data_type: r.DATA_TYPE,
		character_maximum_length: r.CHARACTER_MAXIMUM_LENGTH,
		numeric_precision: r.NUMERIC_PRECISION,
		numeric_scale: r.NUMERIC_SCALE,
		is_nullable: r.IS_NULLABLE,
	}));
}

export async function fetchIdentityColumns(
	pool: sql.ConnectionPool,
	schema: string,
	table: string,
): Promise<Set<string>> {
	const rs = await pool
		.request()
		.input("schema", schema)
		.input("table", table)
		.query<{ column_name: string }>(`
      SELECT c.name AS column_name
      FROM sys.columns c
      INNER JOIN sys.tables t ON t.object_id = c.object_id
      INNER JOIN sys.schemas s ON s.schema_id = t.schema_id
      WHERE s.name = @schema
        AND t.name = @table
        AND c.is_identity = 1;
    `);
	return new Set(rs.recordset.map((r) => r.column_name));
}

/** Orden de columnas en la clave primaria (clustered PK). */
export async function fetchPrimaryKeyColumns(
	pool: sql.ConnectionPool,
	schema: string,
	table: string,
): Promise<string[]> {
	const rs = await pool
		.request()
		.input("schema", schema)
		.input("table", table)
		.query<{ column_name: string }>(`
      SELECT c.name AS column_name
      FROM sys.indexes i
      INNER JOIN sys.tables t ON i.object_id = t.object_id
      INNER JOIN sys.schemas sch ON t.schema_id = sch.schema_id
      INNER JOIN sys.index_columns ic
        ON i.object_id = ic.object_id AND i.index_id = ic.index_id
      INNER JOIN sys.columns c
        ON ic.object_id = c.object_id AND ic.column_id = c.column_id
      WHERE sch.name = @schema
        AND t.name = @table
        AND i.is_primary_key = 1
      ORDER BY ic.key_ordinal;
    `);
	return rs.recordset.map((r) => r.column_name);
}
