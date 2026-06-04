export interface TicketNormativa {
	medioAtencion: string;
	tipoSolicitud: string;
	estadoSolicitud: string;
	tipoSolucion: string;
	coberturaEstimada: string;
	cierre: string;
}

export interface TicketCommit {
	hash: string;
	descripcion: string;
	repo?: string;
	ins?: number;
	del?: number;
	fecha?: string;
	/** Minutos invertidos en este commit; si todos lo traen, la tabla usa estos valores (deben sumar estimacionMinutos). */
	minutos?: number;
	/** Autor git; si se omite, se asume Jeff-Aporta salvo exclusión en commitAuthors.ts */
	autor?: string;
}

export interface TicketDbChange {
	sql: string;
	intencion: string;
	tabla?: string;
	registro?: string;
	jsonAntes?: string;
	jsonDespues?: string;
}

export interface TicketRegistro {
	id: string;
	titulo: string;
	solicitante: string;
	fechaSolicitud: string;
	fechaEntrega?: string;
	enlace?: string;
	resumen?: string;
	estimacionMinutos?: number;
	diligenciaMinutos?: number;
	/** Minutos fijos para la fila «Cambios extra» (si se omite: 10 min × cambios BD + extraMinutos). */
	cambiosExtraMinutos?: number;
	extraMinutos?: number;
	extraDescripcion?: string;
	commits?: TicketCommit[];
	cambiosBd?: TicketDbChange[];
	/** Legacy: cuerpo embebido en registro estático. En PG usar `bodyModule` + TS en `records/`. */
	body?: Promise<string>;
	/** Ruta bajo `records/` (sin .ts), p. ej. `patyia/06/04/TK-1433943`. */
	bodyModule?: string;
	normativa: TicketNormativa;
	festivos?: string[];
	noMaquillarFechas?: boolean;
	proyecto?: "ClientesIS" | "PatyIA";
}
