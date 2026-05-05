// TK-AUDIT-COLS — Script idempotente para garantizar columnas de auditoría
// (CRE/ULT) en CAPAC_CURSOS y CAPAC_PLANES_ESTUDIO.
import { code as codeI, codeBlock } from "./snippets";
import { h3Iconized, note } from "./tk-helpers";
import addAuditColumnsSql from "../migration/sql/add-audit-columns.sql?raw";

const intro =
	`<div>Se incorpora un script T-SQL idempotente que verifica y crea las columnas ` +
	`de auditoría faltantes en las tablas ${codeI("CAPAC_CURSOS")} y ` +
	`${codeI("CAPAC_PLANES_ESTUDIO")}. Si una columna ya existe, no se modifica; ` +
	`si falta, se agrega como ${codeI("NULL")} y, en el caso de ${codeI("FHCRE")} / ` +
	`${codeI("FHULT")}, con ${codeI("DEFAULT GETDATE()")}.</div>`;

export async function buildBodyTKAuditCols(): Promise<string> {
	const [h3a, h3b, snippet] = await Promise.all([
		h3Iconized("mdi:database-plus-outline", "Columnas garantizadas"),
		h3Iconized("mdi:script-text-outline", "Script aplicado"),
		codeBlock(addAuditColumnsSql, "sql"),
	]);
	const items = await Promise.all([
		note(
			"mdi:format-list-bulleted",
			`Conjunto verificado en ambas tablas: ${codeI("IUSUARIOCRE")}, ${codeI("IAPPCRE")}, ` +
			`${codeI("IPCRE")}, ${codeI("FHCRE")}, ${codeI("IUSUARIOULT")}, ${codeI("IAPPULT")}, ` +
			`${codeI("IPULT")}, ${codeI("FHULT")}.`,
		),
		note(
			"mdi:shield-check-outline",
			`Idempotente: cada ${codeI("ALTER TABLE … ADD")} se envuelve en un ` +
			`${codeI("IF NOT EXISTS")} sobre ${codeI("sys.columns")}, por lo que se puede ` +
			`ejecutar varias veces sin efectos colaterales.`,
		),
	]);
	const ulOpen = `<ul style="list-style:none;padding-left:0;margin:0.5rem 0 0;">`;
	return (
		intro +
		h3a + ulOpen + items.join("") + `</ul>` +
		h3b + snippet
	);
}

export const bodyTKAuditCols: Promise<string> = buildBodyTKAuditCols();
