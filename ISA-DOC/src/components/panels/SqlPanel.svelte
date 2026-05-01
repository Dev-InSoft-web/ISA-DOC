<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import TablesBrowserPanel from "./TablesBrowserPanel.svelte";
</script>

<Toaster />

<section class="editor">
	<TablesBrowserPanel />
</section>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}
</style>
