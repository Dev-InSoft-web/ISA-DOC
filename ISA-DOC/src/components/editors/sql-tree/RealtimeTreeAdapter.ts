/**
 * Cascada realtime para el editor SQL.
 *
 * Extiende `TreeRowViewAdapter` (la cascada genérica de TreeView, que NO
 * conoce sockets) y añade EXCLUSIVAMENTE el comportamiento de tiempo
 * real:
 *  - Registro `kind → class` (`KindRegistry`).
 *  - NodeStore plano canónico + parser → roots.
 *  - Aplicación de patches diff-only (`update`) y emisión por canal
 *    (`emitUpdate`).
 *  - Suscripción al canal de sync (`setSync`) y filtrado de eco propio.
 *  - Debounce + detección de incoherencias para recalcular índices
 *    sólo cuando el store presenta violaciones reales (anti-bucle).
 *  - Stores reactivos `syncStatus` y `storeEpoch` para overlays/UX.
 *
 * `SqlTreeAdapter` hereda de esta cascada — sistemas sin sockets pueden
 * seguir usando `TreeRowViewAdapter` directamente.
 */

import { writable, type Writable } from "svelte/store";
import { TreeRowViewAdapter } from "../../_comps/TreeView/TreeRowView.svelte";
import {
	type ITreeData,
	type NodeStore,
} from "../../_comps/TreeView/_treeAdapter/_defgen/00-tree-data";
import { KindRegistry } from "./_sync/kind-registry";
import { parseStore } from "./_sync/parser";
import { applyPatches, hasStoreIncoherence } from "./_sync/mutations";
import {
	InMemoryTreeSync,
	type SyncMessage,
	type SyncStatus,
	type TreeSync,
} from "./_sync/sync-channel";

export abstract class RealtimeTreeAdapter<Stacker, TWorking extends ITreeData<TWorking>> extends TreeRowViewAdapter<Stacker, TWorking> {
	/** Registro `kind → ClassNode` específico de esta instancia. */
	readonly kindRegistry: KindRegistry<TWorking> = new KindRegistry<TWorking>();

	/** NodeStore plano canónico — fuente de verdad para parser/updater/sync. */
	protected _nodeStore: NodeStore = { nodes: [], entities: {} };

	/** Canal de sync. Por defecto in-memory; el consumidor lo puede sustituir. */
	protected _sync: TreeSync = new InMemoryTreeSync();

	/** Estado del canal expuesto reactivamente para overlays/UX. */
	readonly syncStatus: Writable<SyncStatus> = writable<SyncStatus>("online");

	/** Epoch reactivo para forzar re-render del árbol tras `update()`. */
	readonly storeEpoch: Writable<number> = writable(0);

	private _syncOffStatus: (() => void) | null = null;
	private _syncOffMessage: (() => void) | null = null;

	/**
	 * Holgura (ms) antes de re-indexar tras recibir un sync remoto. Cada
	 * mensaje entrante REINICIA el contador → el recalculo sólo se
	 * dispara cuando hay silencio sostenido. Evita re-indexar a medias
	 * mientras llegan emisiones singulares concatenadas de otros clientes.
	 */
	readonly reindexDebounceMs: number = 3000;
	private _reindexTimer: ReturnType<typeof setTimeout> | null = null;

	/* ─────────────── API: parser / update / emitUpdate ─────────────── */

	get nodeStore(): NodeStore { return this._nodeStore; }

	setNodeStore(store: NodeStore): void { this._nodeStore = store; }

	/**
	 * Reconstruye el árbol consumiendo el NodeStore plano y el `kindRegistry`.
	 */
	parse(store?: NodeStore): TWorking[] {
		if (store) this._nodeStore = store;
		const roots = parseStore<TWorking>(this._nodeStore, this.kindRegistry as KindRegistry<TWorking>);
		this._treeNodes = roots as unknown as typeof this._treeNodes;
		this.storeEpoch.update((e) => e + 1);
		return roots;
	}

	/**
	 * Aplica patches al NodeStore (mutación in-place anti-flicker) y
	 * notifica a Svelte SOLO si hubo cambios reales. NO emite por el
	 * socket: ese es el rol de `emitUpdate`.
	 */
	update(msg: Partial<SyncMessage>): boolean {
		const full: SyncMessage = { senderId: "local", ts: Date.now(), ...msg };
		const changed = applyPatches(this._nodeStore, full);
		if (changed) this.storeEpoch.update((e) => e + 1);
		return changed;
	}

	/**
	 * Aplica el cambio LOCAL y, SI hubo cambio efectivo, lo emite por el
	 * canal. Si los datos entrantes son idénticos a los almacenados, NO
	 * se escribe ni se emite — evita bucles eco entre clientes.
	 */
	emitUpdate(msg: Omit<SyncMessage, "senderId" | "ts">): boolean {
		const changed = this.update(msg);
		if (changed) this._sync.emit({ ...msg, senderId: this._sync.userId, ts: Date.now() });
		return changed;
	}

	get sync(): TreeSync { return this._sync; }

	/**
	 * Conecta un canal de sync. Suscribe el listener de mensajes
	 * (filtra los del propio `userId`) y de estado (refleja en
	 * `syncStatus`). Llamadas sucesivas reemplazan el canal previo.
	 */
	setSync(sync: TreeSync): void {
		this._syncOffStatus?.();
		this._syncOffMessage?.();
		this._sync = sync;
		this._syncOffStatus = sync.onStatus((s) => this.syncStatus.set(s));
		this._syncOffMessage = sync.onMessage((m) => {
			if (m.senderId === sync.userId) return; // ignora eco del propio cliente
			const changed = applyPatches(this._nodeStore, m);
			if (!changed) return;
			this.storeEpoch.update((e) => e + 1);
			this.scheduleReindex();
			this.onRemoteSync?.(m);
		});
		sync.connect?.();
	}

	/**
	 * Programa una EVALUACIÓN de coherencia con debounce. Cada llamada
	 * REINICIA el timer. Cuando expira:
	 *   - Si el store presenta INCOHERENCIAS detectadas por
	 *     `hasStoreIncoherence()` (o el override `checkIncoherence()`),
	 *     se invoca `recalculateIndices()`.
	 *   - Si el store es coherente, NO se hace nada → evita el bucle
	 *     infinito de recalculos eco entre clientes.
	 */
	scheduleReindex(): void {
		if (this._reindexTimer) clearTimeout(this._reindexTimer);
		this._reindexTimer = setTimeout(() => {
			this._reindexTimer = null;
			if (this.checkIncoherence()) this.recalculateIndices?.();
		}, this.reindexDebounceMs);
	}

	protected checkIncoherence(): boolean {
		return hasStoreIncoherence(this._nodeStore);
	}

	cancelReindex(): void {
		if (this._reindexTimer) {
			clearTimeout(this._reindexTimer);
			this._reindexTimer = null;
		}
	}

	/** Hook opcional: recalculo de índices/flatpaths del árbol completo. */
	protected recalculateIndices?(): void;

	/** Hook opcional: subclases pueden reaccionar a un sync remoto aplicado. */
	protected onRemoteSync?(msg: SyncMessage): void;

	disposeSync(): void {
		this.cancelReindex();
		this._syncOffStatus?.(); this._syncOffStatus = null;
		this._syncOffMessage?.(); this._syncOffMessage = null;
		this._sync.disconnect?.();
	}
}
