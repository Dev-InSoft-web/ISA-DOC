<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import TablesBrowserPanel from "./TreeSQLTables.svelte";

	export let scope: "clientesis" | "patyia" = "clientesis";
</script>

<Toaster />

<section class="editor">
	<TablesBrowserPanel {scope} />
</section>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}
</style>
