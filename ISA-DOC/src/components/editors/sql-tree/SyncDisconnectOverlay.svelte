<!--
	Overlay de desconexión del canal de sincronización (editor SQL).

	Se suscribe al `Writable<SyncStatus>` que expone el adapter realtime
	(prop `syncStatus`). Mientras el estado sea `"offline"`/`"connecting"`,
	cubre el árbol con una capa que:
	  - Bloquea TODA interacción (`pointer-events:none` sobre los hijos
	    + capa propia que captura clicks).
	  - Inhabilita selección de texto (`user-select:none`).
	  - Muestra el mensaje de estado.

	Cuando el canal vuelve a `"online"`, el overlay se oculta y se
	restauran las interacciones automáticamente.
-->
<script lang="ts">
	import { onDestroy } from "svelte";
	import type { Writable } from "svelte/store";
	import type { SyncStatus } from "./_sync/sync-channel";

	export let status: Writable<SyncStatus>;
	export let offlineMessage: string = "Reconectando…";
	export let connectingMessage: string = "Conectando…";

	let current: SyncStatus = "online";
	const unsub = status.subscribe((s) => { current = s; });
	onDestroy(unsub);

	$: blocked = current !== "online";
	$: message = current === "connecting" ? connectingMessage : offlineMessage;
</script>

<div class="sync-overlay-host" class:blocked>
	<div class="sync-overlay-content">
		<slot />
	</div>
	{#if blocked}
		<div
			class="sync-overlay-veil"
			role="alert"
			aria-live="polite"
			aria-busy="true"
		>
			<div class="sync-overlay-card">
				<span class="sync-overlay-spinner" aria-hidden="true"></span>
				<span class="sync-overlay-msg">{message}</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.sync-overlay-host { position: relative; }
	.sync-overlay-content { transition: filter 120ms ease; }
	.sync-overlay-host.blocked .sync-overlay-content {
		pointer-events: none;
		user-select: none;
		filter: grayscale(0.4) brightness(0.92);
	}
	.sync-overlay-veil {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.55);
		backdrop-filter: blur(1px);
		z-index: 50;
		pointer-events: auto;
		cursor: not-allowed;
	}
	.sync-overlay-card {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.6rem 1rem;
		border-radius: 0.5rem;
		background: #1f2937;
		color: #f9fafb;
		font-size: 0.9rem;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
	}
	.sync-overlay-spinner {
		width: 0.9rem;
		height: 0.9rem;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: #f9fafb;
		border-radius: 50%;
		animation: sync-spin 0.8s linear infinite;
	}
	.sync-overlay-msg { white-space: nowrap; }
	@keyframes sync-spin {
		to { transform: rotate(360deg); }
	}
</style>
