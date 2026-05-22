/**
 * Sincronización entre usuarios del TreeAdapter — específica del editor SQL.
 *
 * NOTA: Este archivo y todo `_sync/` son ESPECÍFICOS del editor SQL. No
 * pertenecen al `_treeAdapter` genérico (que debe ser usable también por
 * sistemas sin sockets). Si otro editor necesita realtime, debe componer
 * su propia capa (o extraer una abstracción de proyecto, no de TreeView).
 *
 * Patches granulares por flatpath/PK con merge `Object.assign`. Multi-
 * usuario coherente: cada cliente envía SÓLO los campos que cambiaron,
 * el servidor reenvía a TODOS los clientes (incluido el remitente con
 * el `senderId` para que se descarte localmente).
 */

import type { NodeRow, ObjRow } from "../../../_comps/TreeViewLegacy/_treeAdapter/_defgen/00-tree-data";

/** Patch sobre una fila de `nodes`. Identificada por `oldFlatpath` (o `flatpath` si no cambió). */
export interface NodePatch {
	/** Identidad PREVIA del nodo. Si se omite, se asume == `flatpath`. */
	oldFlatpath?: string;
	/** Identidad NUEVA del nodo (post-patch). */
	flatpath: string;
	/** Resto de campos del NodeRow a fusionar (parcial). */
	[k: string]: unknown;
}

/** Patch sobre una fila de `entities[entity]`. */
export interface ObjPatch {
	entity: string;
	/** PK previa de la fila. Si se omite, se asume == `pk`. */
	oldPk?: string;
	/** PK nueva de la fila (post-patch). Por convención == `flatpath` para árboles SQL. */
	pk: string;
	/** Resto de campos del ObjRow a fusionar (parcial). */
	[k: string]: unknown;
}

export interface InsertPatch {
	nodes?: NodeRow[];
	objs?: Array<{ entity: string; row: ObjRow }>;
}

export interface DeletePatch {
	/** flatpaths de nodos a eliminar (también borra sus filas obj asociadas). */
	nodes?: string[];
	objs?: Array<{ entity: string; pk: string }>;
}

/**
 * Sobre única que viaja por el socket. Todas las propiedades son opcionales:
 * un mismo mensaje puede mezclar updates de nodos, updates de objs, inserts
 * y deletes. La aplicación es secuencial: deletes → inserts → updates.
 */
export interface SyncMessage {
	senderId: string;
	ts?: number;
	nodes?: NodePatch[];
	objs?: ObjPatch[];
	inserts?: InsertPatch;
	deletes?: DeletePatch;
}

/** Estado del canal de sincronización. */
export type SyncStatus = "online" | "offline" | "connecting";

/**
 * Puerto del canal de sincronización. El consumidor inyecta una
 * implementación concreta (Socket.IO, WS nativo, BroadcastChannel, mock).
 */
export interface TreeSync {
	readonly userId: string;
	getStatus(): SyncStatus;
	onStatus(fn: (s: SyncStatus) => void): () => void;
	onMessage(fn: (m: SyncMessage) => void): () => void;
	emit(msg: Omit<SyncMessage, "senderId" | "ts"> & { senderId?: string; ts?: number }): void;
	connect?(): void;
	disconnect?(): void;
}

/**
 * Implementación in-memory para pruebas/local-only. NO hace sync real:
 * se limita a re-emitir los mensajes a los listeners locales.
 */
export class InMemoryTreeSync implements TreeSync {
	readonly userId: string;
	private status: SyncStatus = "online";
	private statusListeners = new Set<(s: SyncStatus) => void>();
	private messageListeners = new Set<(m: SyncMessage) => void>();

	constructor(userId: string = "local") { this.userId = userId; }

	getStatus(): SyncStatus { return this.status; }

	onStatus(fn: (s: SyncStatus) => void): () => void {
		this.statusListeners.add(fn);
		fn(this.status);
		return () => this.statusListeners.delete(fn);
	}

	onMessage(fn: (m: SyncMessage) => void): () => void {
		this.messageListeners.add(fn);
		return () => this.messageListeners.delete(fn);
	}

	emit(msg: Omit<SyncMessage, "senderId" | "ts"> & { senderId?: string; ts?: number }): void {
		const full: SyncMessage = {
			senderId: msg.senderId ?? this.userId,
			ts: msg.ts ?? Date.now(),
			nodes: msg.nodes,
			objs: msg.objs,
			inserts: msg.inserts,
			deletes: msg.deletes,
		};
		for (const fn of this.messageListeners) fn(full);
	}

	setStatus(s: SyncStatus): void {
		if (this.status === s) return;
		this.status = s;
		for (const fn of this.statusListeners) fn(s);
	}
}
