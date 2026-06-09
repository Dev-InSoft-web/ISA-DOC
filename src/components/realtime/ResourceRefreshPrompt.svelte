<script lang="ts">
	import { onDestroy } from "svelte";
	import { Button, FlexLayout, Iconify, Text } from "@ingenieria_insoft/ispsveltecomponents";
	import {
		resourcePendingStore,
		applyResourceRefresh,
		applyAllPendingRefreshes,
		dismissPendingRefresh,
		type PendingResourceRefresh,
	} from "../../lib/core/realtime/resourceRefreshStore.ts";
	import { STATIC_MODE } from "../../lib/integrations/runtime/staticMode.ts";

	let pending: PendingResourceRefresh[] = [];
	const unsub = resourcePendingStore.subscribe((v) => { pending = v; });
	onDestroy(unsub);

	async function refreshOne(id: string): Promise<void> {
		await applyResourceRefresh(id);
	}

	async function refreshAll(): Promise<void> {
		await applyAllPendingRefreshes();
	}
</script>

{#if !STATIC_MODE && pending.length}
	<div class="resource-refresh-bar" role="status" aria-live="polite">
		<FlexLayout items="center" justify="between" gap="md">
			<FlexLayout items="center" gap="sm">
				<Iconify icon="mdi:sync-alert" />
				<div>
					<Text>
						<strong>Contenido actualizado</strong>
						{#if pending.length === 1}
							— estás viendo <code>{pending[0].label}</code>
						{:else}
							— {pending.length} recursos que estás viendo tienen cambios
						{/if}
					</Text>
				</div>
			</FlexLayout>
			<FlexLayout items="center" gap="sm">
				{#if pending.length === 1}
					<Button color="primary" onClick={() => refreshOne(pending[0].id)}>
						<Iconify icon="mdi:refresh" /> Actualizar ahora
					</Button>
					<Button variant="ghost" onClick={() => dismissPendingRefresh(pending[0].id)}>
						Después
					</Button>
				{:else}
					<Button color="primary" onClick={refreshAll}>
						<Iconify icon="mdi:refresh" /> Actualizar todo
					</Button>
					<Button variant="ghost" onClick={() => resourcePendingStore.set([])}>
						Después
					</Button>
				{/if}
			</FlexLayout>
		</FlexLayout>
	</div>
{/if}

<style>
	.resource-refresh-bar {
		position: fixed;
		left: 50%;
		bottom: 1.25rem;
		transform: translateX(-50%);
		z-index: 1200;
		width: min(720px, calc(100vw - 2rem));
		padding: 0.75rem 1rem;
		border-radius: 10px;
		border: 1px solid color-mix(in srgb, var(--color-primary, #3b82f6) 45%, transparent);
		background: color-mix(in srgb, var(--color-surface, #0f172a) 92%, #1e3a5f);
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
	}
	.resource-refresh-bar code {
		font-size: 0.9em;
	}
</style>
