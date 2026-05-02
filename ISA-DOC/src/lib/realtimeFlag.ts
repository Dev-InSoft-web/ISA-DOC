// Bandera global para suspender TODA la sincronización en tiempo real entre
// pestañas (BroadcastChannel) durante refactors o ajustes estructurales.
//
// Cuando `false`:
//   - No se emiten mensajes (`broadcastStateUpdated` / `tables-updated`).
//   - Los listeners ignoran cualquier mensaje recibido.
//
// El default es `false` (suspendido) hasta que se reactive explícitamente. Esto
// garantiza que mientras se trabaja en el rediseño de nodos (mover, agrupar,
// índices) ninguna pestaña pise el estado de otra.
//
// Para reactivar en runtime (consola): `window.__ISA_REALTIME = true`.

let enabled = false;

if (typeof globalThis !== "undefined") {
	const g = globalThis as unknown as { __ISA_REALTIME?: boolean };
	if (typeof g.__ISA_REALTIME === "boolean") enabled = g.__ISA_REALTIME;
	Object.defineProperty(g, "__ISA_REALTIME", {
		configurable: true,
		get: () => enabled,
		set: (v: unknown) => {
			enabled = v === true;
		},
	});
}

/** ¿Está habilitada la sincronización realtime entre pestañas? */
export function isRealtimeEnabled(): boolean {
	return enabled;
}

/** Habilita o suspende toda la sincronización realtime entre pestañas. */
export function setRealtimeEnabled(value: boolean): void {
	enabled = value === true;
}
