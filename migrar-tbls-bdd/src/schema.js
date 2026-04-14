export async function fetchTables(pool, schema = "dbo", likePattern = "CAPAC%_OLD") {
  const rs = await pool
    .request()
    .input("schema", schema)
    .input("pattern", likePattern)
    .query(`
      SELECT TABLE_SCHEMA, TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
        AND TABLE_SCHEMA = @schema
        AND TABLE_NAME LIKE @pattern
      ORDER BY TABLE_NAME;
    `);
  return rs.recordset;
}

export async function tableExists(pool, schema, table) {
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

export async function fetchColumns(pool, schema, table) {
  const rs = await pool
    .request()
    .input("schema", schema)
    .input("table", table)
    .query(`
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
    is_nullable: r.IS_NULLABLE
  }));
}

export async function fetchIdentityColumns(pool, schema, table) {
  const rs = await pool
    .request()
    .input("schema", schema)
    .input("table", table)
    .query(`
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
export async function fetchPrimaryKeyColumns(pool, schema, table) {
  const rs = await pool
    .request()
    .input("schema", schema)
    .input("table", table)
    .query(`
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

