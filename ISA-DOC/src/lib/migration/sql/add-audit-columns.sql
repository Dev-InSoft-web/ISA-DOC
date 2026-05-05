-- =====================================================================
-- Crea las columnas de auditoría faltantes en CAPAC_CURSOS y
-- CAPAC_PLANES_ESTUDIO. Idempotente: cada columna se agrega solo si
-- no existe. No toca columnas ya presentes ni sus datos.
--
-- Conjunto de auditoría (orden lógico CRE / ULT):
--   IUSUARIOCRE  VARCHAR(255)
--   IAPPCRE      VARCHAR(255)
--   IPCRE        VARCHAR(255)
--   FHCRE        DATETIME2     DEFAULT GETDATE()
--   IUSUARIOULT  VARCHAR(255)
--   IAPPULT      VARCHAR(255)
--   IPULT        VARCHAR(255)
--   FHULT        DATETIME2     DEFAULT GETDATE()
-- =====================================================================

SET NOCOUNT ON;
SET XACT_ABORT ON;

DECLARE @sql NVARCHAR(MAX);

-- Tablas objetivo
DECLARE @tables TABLE (TableName SYSNAME);
INSERT INTO @tables (TableName) VALUES ('CAPAC_CURSOS'), ('CAPAC_PLANES_ESTUDIO');

-- Columnas a garantizar (tipo + default opcional)
DECLARE @cols TABLE (
    ColName    SYSNAME,
    ColType    NVARCHAR(64),
    ColDefault NVARCHAR(64) NULL
);
INSERT INTO @cols (ColName, ColType, ColDefault) VALUES
    ('IUSUARIOCRE', 'VARCHAR(255)', NULL),
    ('IAPPCRE',     'VARCHAR(255)', NULL),
    ('IPCRE',       'VARCHAR(255)', NULL),
    ('FHCRE',       'DATETIME2',    'GETDATE()'),
    ('IUSUARIOULT', 'VARCHAR(255)', NULL),
    ('IAPPULT',     'VARCHAR(255)', NULL),
    ('IPULT',       'VARCHAR(255)', NULL),
    ('FHULT',       'DATETIME2',    'GETDATE()');

DECLARE @table SYSNAME, @col SYSNAME, @type NVARCHAR(64), @def NVARCHAR(64);

DECLARE table_cursor CURSOR LOCAL FAST_FORWARD FOR
    SELECT TableName FROM @tables;

OPEN table_cursor;
FETCH NEXT FROM table_cursor INTO @table;

WHILE @@FETCH_STATUS = 0
BEGIN
    IF OBJECT_ID(@table, 'U') IS NULL
    BEGIN
        PRINT '-- [skip] Tabla no existe: ' + @table;
    END
    ELSE
    BEGIN
        DECLARE col_cursor CURSOR LOCAL FAST_FORWARD FOR
            SELECT ColName, ColType, ColDefault FROM @cols;

        OPEN col_cursor;
        FETCH NEXT FROM col_cursor INTO @col, @type, @def;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            IF NOT EXISTS (
                SELECT 1
                FROM sys.columns
                WHERE object_id = OBJECT_ID(@table)
                  AND name = @col
            )
            BEGIN
                SET @sql = N'ALTER TABLE ' + QUOTENAME(@table) +
                           N' ADD ' + QUOTENAME(@col) + N' ' + @type + N' NULL' +
                           CASE WHEN @def IS NOT NULL
                                THEN N' CONSTRAINT ' +
                                     QUOTENAME('DF_' + @table + '_' + @col) +
                                     N' DEFAULT ' + @def
                                ELSE N''
                           END + N';';
                PRINT @sql;
                EXEC sp_executesql @sql;
            END
            ELSE
            BEGIN
                PRINT '-- [ok] ' + @table + '.' + @col + ' ya existe';
            END

            FETCH NEXT FROM col_cursor INTO @col, @type, @def;
        END

        CLOSE col_cursor;
        DEALLOCATE col_cursor;
    END

    FETCH NEXT FROM table_cursor INTO @table;
END

CLOSE table_cursor;
DEALLOCATE table_cursor;
