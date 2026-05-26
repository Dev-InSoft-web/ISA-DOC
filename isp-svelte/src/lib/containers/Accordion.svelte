<script lang="ts" context="module">
	import type { HTMLAttributes } from "svelte/elements";
	import type { ComponentColor } from "@ingenieria_insoft/ispsveltecomponents";

	export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
		title?: string;
		titleIcon?: string;
		color?: ComponentColor;
		statusText?: string;
		statusColor?: ComponentColor;
		statusDots?: ComponentColor[];
		open?: boolean;
		inner?: boolean;
		count?: number | null;
		// Estándar: cuando un accordion agrupa contenido revisable (uno o más
		// `checkKey` de los hijos), se muestra el `RevisadoCheck` agregado en el
		// header automáticamente. Solo aplica cuando NO se entrega el slot
		// `title-extra` (el slot custom tiene prioridad).
		checkKey?: string;
		checkKeys?: string[];
	}
</script>

<script lang="ts">
	import { slide } from "svelte/transition";
	import {
		Card,
		Button,
		H2,
		H4,
		Iconify,
		Text,
		FlexLayout,
	} from "@ingenieria_insoft/ispsveltecomponents";
	import RevisadoCheck from "../actions/RevisadoCheck.svelte";

	type $$Props = AccordionProps;

	export let title: string = "Title";
	export let titleIcon: string | undefined = undefined;
	export let color: AccordionProps["color"] = "primary";
	export let statusText: string | undefined = undefined;
	export let statusColor: AccordionProps["statusColor"] = "success";
	export let statusDots: AccordionProps["statusDots"] = [];
	export let open = false;
	export let inner = false;
	export let count: number | null | undefined = undefined;
	export let checkKey: string | undefined = undefined;
	export let checkKeys: string[] | undefined = undefined;

	$: relieveAccordion = inner ? 75 : undefined;
	$: statusDotsUnique = statusDots?.length ? [...new Set(statusDots)] : [];
	$: hasCheck = !!(checkKey || (checkKeys && checkKeys.length > 0));
</script>

<Card
	{...$$restProps}
	relieve={relieveAccordion}
	class={["accordion", inner && "accordion--inner", $$restProps.class].filter(Boolean).join(" ")}
	style={["padding: 0", $$restProps.style].filter(Boolean).join(";")}
>
	<Button
		variant="text"
		{color}
		class="accordion-header"
		onClick={() => (open = !open)}
		style={[
			"width: 100%; padding: 1rem; justify-content: space-between;",
			open && "border-bottom-left-radius: 0;border-bottom-right-radius: 0;",
		]
			.filter(Boolean)
			.join(";")}
	>
	<svelte:component this={inner ? H4 : H2}>
			<FlexLayout justify="between" items="center" style="width: 100%;">
				<FlexLayout items="center" class="head" style="min-width: 0; flex: 1;">
					{#if titleIcon}
						<Iconify icon={titleIcon} class="title-icon" />
					{/if}
					<Text class="title" lines={1}>
						{title}
						{#if count != null && count > 1}
							<span style="opacity: 0.7;">({count})</span>
						{/if}
						{#if statusDotsUnique.length}
							<span class="status-dots">
								{#each statusDotsUnique as dotColor}
									<span class="status-dot" style={`background: var(--is-${dotColor});`}></span>
								{/each}
							</span>
						{/if}
						{#if statusText}
							<span style={`color: var(--is-${statusColor}); font-weight: 600;`}>({statusText})</span>
						{/if}
					</Text>
				</FlexLayout>
				{#if $$slots["title-extra"]}
					<slot name="title-extra" />
				{:else if hasCheck}
					<RevisadoCheck key={checkKey ?? ""} keys={checkKeys ?? []} />
				{/if}
				<Iconify class="chevron" icon="mdi:chevron-down" flipv={open} style="font-size: 1.5em; flex-shrink: 0;" />
			</FlexLayout>
		</svelte:component>
	</Button>
	{#if open}
		<div transition:slide style="position: relative;">
			<FlexLayout direction="column" style="padding: 1rem;">
				<slot />
			</FlexLayout>
		</div>
	{/if}
</Card>

<style>
	:global(.accordion) {
		box-sizing: border-box;
		display: block;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	:global(.accordion .accordion-header) {
		position: sticky;
		top: 0;
		z-index: 6;
		background-color: var(--is-bg-secondary, #1e1e1e) !important;
		box-shadow: 0 1px 0 var(--is-b-color, #8885);
	}

	/* Stacking sticky: cada nivel anidado se sienta debajo del padre */
	:global(.accordion .accordion .accordion-header) {
		top: 3.5rem;
		z-index: 5;
	}
	:global(.accordion .accordion .accordion .accordion-header) {
		top: 7rem;
		z-index: 4;
	}
	:global(.accordion .accordion .accordion .accordion .accordion-header) {
		top: 10.5rem;
		z-index: 3;
	}

	:global(.accordion.accordion--inner .accordion-header) {
		background-color: color-mix(in srgb, var(--is-bg-secondary, #1e1e1e), var(--is-color) 4%) !important;
	}

	:global(.accordion h2),
	:global(.accordion h4) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	:global(.accordion .head .title-icon) {
		flex-shrink: 0;
		font-size: 1.35em;
		opacity: 0.95;
	}

	:global(.accordion .head .title) {
		flex: 1;
		overflow: hidden;
		text-align: start;
	}

	:global(.accordion .head .status-dots) {
		display: inline-flex;
		gap: 0.35rem;
		margin-left: 0.45rem;
		vertical-align: middle;
	}

	:global(.accordion .head .status-dot) {
		border-radius: 999px;
		display: inline-block;
		height: 0.52rem;
		width: 0.52rem;
	}

	:global(.accordion .chevron) {
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}
</style>
