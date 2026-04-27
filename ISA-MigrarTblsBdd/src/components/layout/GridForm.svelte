<script context="module" lang="ts">
	import { GridLayout } from "@ingenieria_insoft/ispsveltecomponents";
	import type { BreakpointSize, GridLayoutProps, GridLayoutSlots } from "@ingenieria_insoft/ispsveltecomponents";

	export const cellsForm = (sizew: BreakpointSize = "md"): number =>
		({ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 })[sizew] ?? 1;
</script>

<script lang="ts">
	interface $$Props extends GridLayoutProps {}
	interface $$Slots {
		default: GridLayoutSlots["default"] & { small: boolean };
	}

	let sizew: BreakpointSize = "md";
	let cells = cellsForm(sizew);
	$: cells = cellsForm(sizew);

	const self = {
		get class() { return $$restProps.class; },
		get style() { return $$restProps.style; },
		get resume() { return { ...$$restProps, class: this.class, style: this.style }; },
	};
</script>

<GridLayout bind:sizew let:boolszw cells={String(cells)} {...self.resume}>
	<slot {sizew} {boolszw} small={boolszw.sm} />
</GridLayout>
