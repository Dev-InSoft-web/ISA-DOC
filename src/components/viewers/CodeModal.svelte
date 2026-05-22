<script lang="ts">
	import { Modal, FlexLayout, Iconify, Text, Button } from "@ingenieria_insoft/ispsveltecomponents";
	import CodeViewer from "./CodeViewer.svelte";

	export let bshow: boolean = false;
	export let title: string = "";
	export let value: string = "";
	export let language: "json" | "sql" | "ts" = "json";

	function copy(): void {
		navigator.clipboard?.writeText(value ?? "");
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
		<CodeViewer {value} lang={language} height="100%" />
	</div>

	<div class="cm-footer">
		<FlexLayout justify="end">
			<Button variant="outlined" onClick={copy}>
				<Iconify icon="mdi:content-copy" /> Copiar
			</Button>
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
	.cm-footer {
		flex: 0 0 auto;
		margin-top: 0.5rem;
	}
</style>
