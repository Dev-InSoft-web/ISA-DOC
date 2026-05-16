<script lang="ts">
	import { Modal, FlexLayout, Iconify, Text, Button } from "@ingenieria_insoft/ispsveltecomponents";
	import CodeViewer from "./CodeViewer.svelte";

	export let bshow: boolean = false;
	export let title: string = "";
	export let value: string = "";
	export let language: "json" | "sql" | "ts" = "json";
	export let compareValue: string | null = null;
	export let compareLabel: string = "Prod";
	export let valueLabel: string = "Local";

	function copy(): void {
		navigator.clipboard?.writeText(value ?? "");
	}
	function copyCompare(): void {
		navigator.clipboard?.writeText(compareValue ?? "");
	}
	function close(): void {
		bshow = false;
	}
</script>

<Modal bind:bshow onClose={close} style="width: 96dvw; height: 96dvh;">
	<svelte:fragment slot="title">
		<FlexLayout items="center">
			<Iconify icon={language === "sql" ? "mdi:database-outline" : language === "ts" ? "mdi:language-typescript" : "mdi:code-json"} />
			<Text><strong>{title || (language === "sql" ? "SQL" : language === "ts" ? "TypeScript" : "JSON")}</strong></Text>
		</FlexLayout>
	</svelte:fragment>

	<div class="cm-wrap">
		{#if compareValue !== null}
			<div class="cm-cmp">
				<div class="cm-col cm-local">
					<FlexLayout items="center" justify="between">
						<Text color="neutral"><small>{valueLabel}</small></Text>
						<Button variant="outlined" style="width:fit-content;" onClick={copy}>
							<Iconify icon="mdi:content-copy" />
						</Button>
					</FlexLayout>
					<div class="cm-viewer">
						<CodeViewer {value} lang={language} height="100%" />
					</div>
				</div>
				<div class="cm-col cm-prod">
					<FlexLayout items="center" justify="between">
						<Text color="neutral"><small>{compareLabel}</small></Text>
						<Button variant="outlined" style="width:fit-content;" onClick={copyCompare}>
							<Iconify icon="mdi:content-copy" />
						</Button>
					</FlexLayout>
					<div class="cm-viewer">
						<CodeViewer value={compareValue} lang={language} height="100%" />
					</div>
				</div>
			</div>
		{:else}
			<CodeViewer {value} lang={language} height="100%" />
		{/if}
	</div>

	<div class="cm-footer">
		<FlexLayout justify="end">
			{#if compareValue === null}
				<Button variant="outlined" onClick={copy}>
					<Iconify icon="mdi:content-copy" /> Copiar
				</Button>
			{/if}
			<Button onClick={close}>
				<Iconify icon="mdi:close" /> Cerrar
			</Button>
		</FlexLayout>
	</div>
</Modal>

<style>
	.cm-wrap {
		flex: 1 1 auto;
		min-height: 0;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.cm-cmp {
		flex: 1 1 auto;
		min-height: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}
	.cm-col {
		min-width: 0;
		min-height: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding: 0.5rem;
		border: 2px solid;
		border-radius: 6px;
	}
	.cm-local { border-color: var(--is-success, #2e7d32); }
	.cm-prod { border-color: var(--is-neutral, #9e9e9e); }
	.cm-viewer {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.cm-footer {
		flex: 0 0 auto;
		margin-top: 0.5rem;
	}
</style>
