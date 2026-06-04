import type { TicketCommit, TicketDbChange, TicketNormativa } from "./types.js";

/**
 * Metadatos del ticket persistidos en PG (`isa-doc` / `tickets` / `ticket`).
 * El HTML del cuerpo no va aquí: se genera con módulos TS en `records/…/TK-*.ts` vía `bodyModule`.
 */
export interface TicketStoredRecord {
	code: string;
	titulo: string;
	solicitante: string;
	fechaSolicitud: string;
	fechaEntrega?: string;
	enlace?: string;
	resumen?: string;
	estimacionMinutos?: number;
	diligenciaMinutos?: number;
	cambiosExtraMinutos?: number;
	extraMinutos?: number;
	extraDescripcion?: string;
	commits?: TicketCommit[];
	cambiosBd?: TicketDbChange[];
	normativa: TicketNormativa;
	festivos?: string[];
	noMaquillarFechas?: boolean;
	proyecto?: "ClientesIS" | "PatyIA";
	estado?: string;
	pagina?: string;
	meta?: Record<string, unknown>;
	/**
	 * Ruta relativa bajo `records/` sin extensión.
	 * Ej. `patyia/06/04/TK-1433943` → `records/patyia/06/04/TK-1433943.ts`
	 */
	bodyModule?: string;
	/** Opcional: `records/.../TK-*-sql.ts` para scripts SQL grandes. */
	sqlModule?: string;
}
