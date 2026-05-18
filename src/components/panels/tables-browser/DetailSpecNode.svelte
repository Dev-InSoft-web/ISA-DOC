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
	$: hasChildren = Object.keys(childrenMap).length > 0;
	$: nadaOn = !todoOn && !hasChildren;

	function emit(next: DetailNode): void {
		dispatch("change", next);
	}

	function toggleTodo(on: boolean): void {
		if (on) emit({ todo: true });
		else emit({});
	}

	function toggleNada(on: boolean): void {
		if (on) emit({});
		else emit({ todo: true });
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
		<label class="switch" title="Incluir todos los detalles">
			<input
				type="checkbox"
				checked={todoOn}
				on:change={(e) => toggleTodo((e.target as HTMLInputElement).checked)}
			/>
			<span class="slider"></span>
			<span class="lbl"><code>todo</code></span>
		</label>
		<label class="switch" title="No incluir ningún detalle">
			<input
				type="checkbox"
				checked={nadaOn}
				on:change={(e) => toggleNada((e.target as HTMLInputElement).checked)}
			/>
			<span class="slider"></span>
			<span class="lbl"><code>nada</code></span>
		</label>
	</div>
	{#if !todoOn && relations.length > 0}
		<div class="children">
			{#each relations as r (r.alias)}
				{@const childOn = !!childrenMap[r.alias]}
				<label class="switch">
					<input
						type="checkbox"
						checked={childOn}
						on:change={(e) => toggleChild(r.alias, (e.target as HTMLInputElement).checked)}
					/>
					<span class="slider"></span>
					<span class="lbl"><code>{r.alias}</code> <small>→ {relTargetCfg(r)?.tableName ?? r.target}</small></span>
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
	.mode-row {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
	}
	.switch {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.85rem;
		cursor: pointer;
		user-select: none;
	}
	.switch input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}
	.slider {
		position: relative;
		display: inline-block;
		width: 1.8rem;
		height: 0.9rem;
		background: color-mix(in srgb, var(--is-color, #888) 25%, transparent);
		border-radius: 999px;
		transition: background 0.15s ease;
		flex: 0 0 auto;
	}
	.slider::before {
		content: "";
		position: absolute;
		top: 0.1rem;
		left: 0.1rem;
		width: 0.7rem;
		height: 0.7rem;
		background: #fff;
		border-radius: 50%;
		transition: transform 0.15s ease;
	}
	.switch input:checked + .slider {
		background: var(--is-primary, #2a9df4);
	}
	.switch input:checked + .slider::before {
		transform: translateX(0.9rem);
	}
	.switch input:focus-visible + .slider {
		outline: 2px solid var(--is-primary, #2a9df4);
		outline-offset: 2px;
	}
	.children {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding-left: 0.75rem;
		border-left: 1px dashed var(--cl-neutral-20, #ccc);
	}
</style>
