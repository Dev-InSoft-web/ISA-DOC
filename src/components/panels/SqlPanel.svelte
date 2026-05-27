<script lang="ts">
	import { Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import TablesBrowserPanel from "./TreeSQLTables.svelte";
	import { clientesIsProvider } from "../../lib/sqlProviders/clientesIsProvider.ts";
	import { patyiaProvider } from "../../lib/sqlProviders/patyiaProvider.ts";
	import type { SqlDataProvider } from "../../lib/sqlProviders/types.ts";

	export let scope: "clientesis" | "patyia" = "clientesis";
	export let provider: SqlDataProvider | null = null;
	$: resolvedProvider = provider ?? (scope === "patyia" ? patyiaProvider : clientesIsProvider);
</script>

<Toaster />

<section class="editor">
	<TablesBrowserPanel provider={resolvedProvider} />
</section>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}
</style>
