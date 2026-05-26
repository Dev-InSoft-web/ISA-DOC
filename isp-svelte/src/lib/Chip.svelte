<script context="module" lang="ts">
	import { Button, type ButtonProps } from "@ingenieria_insoft/ispsveltecomponents";

	export type ChipProps = Omit<ButtonProps, "onClick" | "loading" | "type" | "disabled">;
</script>

<script lang="ts">
	interface $$Props extends ChipProps {}

	export let variant: $$Props["variant"] = "outlined";
	export let color: $$Props["color"] = "border";
	export let shape: $$Props["shape"] = "round";

	const self = {
		get class() {
			return ["isp-chip", $$restProps.class].filter(Boolean).join(" ");
		},
	};
</script>

<span style="font-size: 0.9em">
	<Button {...$$restProps} class={self.class} {variant} {color} {shape} tabindex={-1} aria-disabled="true">
		<slot />
	</Button>
</span>

<style>
	span {
		max-height: 1em;
		pointer-events: none;
		user-select: none;
		cursor: default;
		:global {
			.isp-chip {
				width: fit-content;
				height: 1em !important;
				transform: scale(0.8) translateY(-1em);
				vertical-align: top;
			}
		}
	}
</style>
