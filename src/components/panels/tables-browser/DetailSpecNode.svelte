<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Switch } from "@ingenieria_insoft/ispsveltecomponents";
	import Self from "./DetailSpecNode.svelte";
	import type { DetailNode, RelationDef, ResourceConfig } from "../../../lib/codeGen/types.ts";

	export let node: DetailNode;
	export let targetCfg: ResourceConfig | undefined;
	export let resources: ResourceConfig[];
	export let depth: number = 0;

	const dispatch = createEventDispatcher<{ change: DetailNode }>();

	$: relations = (targetCfg?.relations ?? []) as RelationDef[];
	$: todoOn = !!node.todo;
	$: nadaOn = !!node.nada;
	$: childrenMap = node.children ?? {};

	function emit(next: DetailNode): void {
		dispatch("change", next);
	}

	function toggleTodo(on: boolean): void {
		if (on) emit({ todo: true });
		else emit({});
	}

	function toggleNada(on: boolean): void {
		if (on) emit({ nada: true });
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
	<div class="row mode-row">
		<span class="sw-wrap" on:change={(e) => toggleTodo((e.target as HTMLInputElement).checked)}>
			<Switch checked={todoOn} color="primary" colorFalse="neutral" title="Incluir todos los detalles"><code>todo</code></Switch>
		</span>
		<span class="sw-wrap" on:change={(e) => toggleNada((e.target as HTMLInputElement).checked)}>
			<Switch checked={nadaOn} color="primary" colorFalse="neutral" title="No incluir ningún detalle"><code>nada</code></Switch>
		</span>
	</div>
	{#if !todoOn && !nadaOn && relations.length > 0}
		<div class="children">
			{#each relations as r (r.alias)}
				{@const childOn = !!childrenMap[r.alias]}
				<span class="sw-wrap" on:change={(e) => toggleChild(r.alias, (e.target as HTMLInputElement).checked)}>
					<Switch checked={childOn} color="primary" colorFalse="neutral">
						<code>{r.alias}</code> <small>→ {relTargetCfg(r)?.tableName ?? r.target}</small>
					</Switch>
				</span>
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
	.mode-row {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
	}
	.sw-wrap {
		display: inline-flex;
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
