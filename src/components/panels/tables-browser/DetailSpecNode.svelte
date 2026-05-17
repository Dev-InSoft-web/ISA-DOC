<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Self from "./DetailSpecNode.svelte";
	import type { DetailNode, RelationDef, ResourceConfig } from "../../../lib/codeGen/types.ts";

	export let node: DetailNode;
	export let targetCfg: ResourceConfig | undefined;
	export let resources: ResourceConfig[];
	export let depth: number = 0;

	const dispatch = createEventDispatcher<{ change: void }>();

	$: relations = (targetCfg?.relations ?? []) as RelationDef[];

	function toggleTodo(on: boolean): void {
		node.todo = on || undefined;
		if (on) node.children = undefined;
		dispatch("change");
	}

	function toggleChild(alias: string, on: boolean): void {
		const children = { ...(node.children ?? {}) };
		if (on) children[alias] = children[alias] ?? { todo: true };
		else delete children[alias];
		node.children = Object.keys(children).length ? children : undefined;
		dispatch("change");
	}

	function isChildOn(alias: string): boolean {
		return !!node.children?.[alias];
	}

	function relTargetCfg(r: RelationDef): ResourceConfig | undefined {
		return resources.find((x) => x.id === r.target);
	}

	function onChildChange(): void {
		dispatch("change");
	}
</script>

<div class="dnode" style="margin-left: {depth * 0.75}rem;">
	<label class="row">
		<input
			type="checkbox"
			checked={!!node.todo}
			on:change={(e) => toggleTodo((e.target as HTMLInputElement).checked)}
		/>
		<span><code>todo</code></span>
	</label>
	{#if !node.todo && relations.length > 0}
		<div class="children">
			{#each relations as r (r.alias)}
				<label class="row">
					<input
						type="checkbox"
						checked={isChildOn(r.alias)}
						on:change={(e) => toggleChild(r.alias, (e.target as HTMLInputElement).checked)}
					/>
					<span><code>{r.alias}</code> <small>→ {relTargetCfg(r)?.tableName ?? r.target}</small></span>
				</label>
				{#if isChildOn(r.alias) && node.children?.[r.alias]}
					<Self
						bind:node={node.children[r.alias]}
						targetCfg={relTargetCfg(r)}
						{resources}
						depth={depth + 1}
						on:change={onChildChange}
					/>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.dnode {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.row {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
	}
	.children {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding-left: 0.75rem;
		border-left: 1px dashed var(--cl-neutral-20, #ccc);
	}
</style>
