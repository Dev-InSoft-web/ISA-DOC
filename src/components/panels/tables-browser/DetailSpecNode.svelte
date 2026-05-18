<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Self from "./DetailSpecNode.svelte";
	import type { DetailNode, RelationDef, ResourceConfig } from "../../../lib/codeGen/types.ts";

	export let node: DetailNode;
	export let targetCfg: ResourceConfig | undefined;
	export let resources: ResourceConfig[];
	export let depth: number = 0;

	const dispatch = createEventDispatcher<{ change: DetailNode }>();

	$: relations = (targetCfg?.relations ?? []) as RelationDef[];
	$: todoOn = !!node.todo;
	$: childrenMap = node.children ?? {};

	function emit(next: DetailNode): void {
		dispatch("change", next);
	}

	function toggleTodo(on: boolean): void {
		if (on) emit({ todo: true });
		else emit({});
	}

	function toggleChild(alias: string, on: boolean): void {
		const children: Record<string, DetailNode> = { ...childrenMap };
		if (on) children[alias] = children[alias] ?? { todo: true };
		else delete children[alias];
		const next: DetailNode = {};
		if (Object.keys(children).length) next.children = children;
		emit(next);
	}

	function onChildChange(alias: string, ev: CustomEvent<DetailNode>): void {
		const children: Record<string, DetailNode> = { ...childrenMap, [alias]: ev.detail };
		const next: DetailNode = {};
		if (Object.keys(children).length) next.children = children;
		emit(next);
	}

	function relTargetCfg(r: RelationDef): ResourceConfig | undefined {
		return resources.find((x) => x.id === r.target);
	}
</script>

<div class="dnode" style="margin-left: {depth * 0.75}rem;">
	<label class="row">
		<input
			type="checkbox"
			checked={todoOn}
			on:change={(e) => toggleTodo((e.target as HTMLInputElement).checked)}
		/>
		<span><code>todo</code></span>
	</label>
	{#if !todoOn && relations.length > 0}
		<div class="children">
			{#each relations as r (r.alias)}
				{@const childOn = !!childrenMap[r.alias]}
				<label class="row">
					<input
						type="checkbox"
						checked={childOn}
						on:change={(e) => toggleChild(r.alias, (e.target as HTMLInputElement).checked)}
					/>
					<span><code>{r.alias}</code> <small>→ {relTargetCfg(r)?.tableName ?? r.target}</small></span>
				</label>
				{#if childOn}
					<Self
						node={childrenMap[r.alias]}
						targetCfg={relTargetCfg(r)}
						{resources}
						depth={depth + 1}
						on:change={(ev) => onChildChange(r.alias, ev)}
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
