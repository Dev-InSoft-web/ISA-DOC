<script lang="ts">
	import { Button, Iconify } from "@ingenieria_insoft/ispsveltecomponents";

	export let label: string = "Ejecutar";
	export let icon: string = "mdi:play";
	export let color: "primary" | "danger" | "neutral" = "primary";
	export let disabled: boolean = false;
	export let busy: boolean = false;
	export let onExecute: () => void | Promise<void> = () => {};
	export let title: string = "Bloquear / desbloquear ejecución";

	let unlocked: boolean = false;

	function toggleLock(): void {
		if (disabled || busy) return;
		unlocked = !unlocked;
	}

	async function handleClick(): Promise<void> {
		if (!unlocked || disabled || busy) return;
		try {
			await onExecute();
		} finally {
			unlocked = false;
		}
	}
</script>

<span class="confirm-exec">
	<button
		type="button"
		class="lock-btn"
		class:unlocked
		on:click={toggleLock}
		disabled={disabled || busy}
		title={title}
		aria-pressed={unlocked}
	>
		<Iconify icon={unlocked ? "mdi:lock-open-variant" : "mdi:lock"} />
	</button>
	<Button
		{color}
		variant="outlined"
		style="width: fit-content;"
		disabled={!unlocked || disabled || busy}
		onClick={handleClick}
	>
		<Iconify icon={busy ? "mdi:loading" : icon} /> {label}
	</Button>
</span>

<style>
	.confirm-exec {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}
	.lock-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.9rem;
		height: 1.9rem;
		border: 1px solid var(--is-b-color);
		background: var(--is-bg-secondary);
		border-radius: 4px;
		cursor: pointer;
		color: var(--is-color);
		font-size: 1.05rem;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
	}
	.lock-btn:hover:not([disabled]) { background: var(--is-bg-readonly); }
	.lock-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
	.lock-btn.unlocked {
		color: var(--is-success, #4caf50);
		border-color: var(--is-success, #4caf50);
		background: rgba(76, 175, 80, 0.12);
	}
</style>
