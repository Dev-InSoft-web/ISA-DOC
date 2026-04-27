import type { ColumnInfo } from "./schema.js";

const hasLen = new Set(["varchar", "nvarchar", "char", "nchar", "binary", "varbinary"]);
const hasPrecision = new Set(["decimal", "numeric"]);
const dateLike = new Set(["date", "datetime", "datetime2", "smalldatetime", "time", "datetimeoffset"]);

export function sqlTypeLiteral(col: ColumnInfo): string {
	const dt = String(col.data_type || "").toLowerCase();
	const len = Number(col.character_maximum_length);
	const precision = Number(col.numeric_precision);
	const scale = Number(col.numeric_scale);

	if (hasLen.has(dt)) {
		if (len === -1) return `${dt}(max)`;
		if (Number.isFinite(len) && len > 0) return `${dt}(${len})`;
	}

	if (hasPrecision.has(dt)) {
		if (Number.isFinite(precision) && Number.isFinite(scale)) return `${dt}(${precision}, ${scale})`;
	}

	if (dateLike.has(dt)) return dt;
	return dt || "nvarchar(max)";
}

export function castExpression(sourceExpr: string, destCol: ColumnInfo): string {
	const dt = String(destCol.data_type || "").toLowerCase();
	const typeLit = sqlTypeLiteral(destCol);

	if (!dt) return sourceExpr;
	if (dt === "bit") return `TRY_CAST(${sourceExpr} AS bit)`;
	if (dt === "uniqueidentifier") return `TRY_CAST(${sourceExpr} AS uniqueidentifier)`;
	if (dt === "xml") return `TRY_CAST(${sourceExpr} AS xml)`;
	return `TRY_CAST(${sourceExpr} AS ${typeLit})`;
}

/**
 * Valor "vacío" para columnas destino NOT NULL sin dato en origen (migración).
 * Las columnas NULLABLE sin mapeo se omiten del INSERT (quedan NULL).
 */
export function emptyPlaceholderExpression(destCol: ColumnInfo): string {
	const dt = String(destCol.data_type || "").toLowerCase();
	const typeLit = sqlTypeLiteral(destCol);
	const nPrefix = dt === "nvarchar" || dt === "nchar" ? "N" : "";

	if (dt === "bit") return "CAST(0 AS bit)";
	if (["tinyint", "smallint", "int", "bigint"].includes(dt)) return `CAST(0 AS ${typeLit})`;
	if (["decimal", "numeric", "float", "real"].includes(dt)) return `CAST(0 AS ${typeLit})`;
	if (["money", "smallmoney"].includes(dt)) return `CAST(0 AS ${dt})`;
	if (["varchar", "nvarchar", "char", "nchar"].includes(dt)) {
		return `CAST(${nPrefix}'' AS ${typeLit})`;
	}
	if (["binary", "varbinary"].includes(dt)) {
		return `CAST(0x AS ${typeLit})`;
	}
	if (dt === "date") return "CAST('1900-01-01' AS date)";
	if (["datetime", "datetime2", "smalldatetime"].includes(dt)) {
		return `CAST('1900-01-01' AS ${dt})`;
	}
	if (dt === "datetimeoffset") {
		return "CAST('1900-01-01 00:00:00 +00:00' AS datetimeoffset)";
	}
	if (dt === "time") return "CAST('00:00:00' AS time(0))";
	if (dt === "uniqueidentifier") {
		return "CAST('00000000-0000-0000-0000-000000000000' AS uniqueidentifier)";
	}
	if (dt === "xml") return "CONVERT(xml, N'<r/>')";
	return "CAST(N'' AS nvarchar(4000))";
}
