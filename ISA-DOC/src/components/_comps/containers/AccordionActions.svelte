<script context="module" lang="ts">
	import FloatingCard from "./FloatingCard.svelte";
	import Accordion, { type AccordionProps } from "./Accordion.svelte";
	import FlexOptions, { type FlexOptionsAction } from "../Options/FlexOptions.svelte";

	export interface AccordionActionsProps extends AccordionProps {
		actions?: FlexOptionsAction[];
		more?: FlexOptionsAction[];
		showfloat?: boolean;
		horizontal?: "left" | "center" | "right";
		vertical?: "top" | "center" | "bottom";
		/** Alias visual: si se pasa `icon`, se usa como titleIcon. */
		icon?: string;
	}
</script>

<script lang="ts">
	interface $$Props extends AccordionActionsProps {}

	export let title: $$Props["title"] = "";
	export let titleIcon: $$Props["titleIcon"] = undefined;
	export let icon: $$Props["icon"] = undefined;
	export let count: $$Props["count"] = undefined;
	export let open: $$Props["open"] = true;
	export let inner: $$Props["inner"] = false;
	export let color: $$Props["color"] = "primary";
	export let actions: $$Props["actions"] = [];
	export let more: $$Props["more"] = [];
	export let showfloat: $$Props["showfloat"] = undefined;
	export let horizontal: $$Props["horizontal"] = "right";
	export let vertical: $$Props["vertical"] = "top";

	$: effIcon = titleIcon ?? icon;
	$: hasFloat = (actions && actions.length > 0) || (more && more.length > 0);
	$: effShowFloat = showfloat ?? hasFloat;
</script>

<FloatingCard showfloat={effShowFloat} {horizontal} {vertical}>
	<Accordion {...$$restProps} {title} titleIcon={effIcon} {count} {open} {inner} {color}>
		<svelte:fragment slot="title-extra"><slot name="title-extra" /></svelte:fragment>
		<slot />
	</Accordion>
	<FlexOptions slot="float" actions={actions ?? []} more={more ?? []} />
</FloatingCard>
