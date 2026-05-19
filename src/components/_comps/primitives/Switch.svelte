<script context="module" lang="ts">
	import { Switch as ICompSwitch, type SwitchProps } from "@ingenieria_insoft/ispsveltecomponents";

	export type { SwitchProps };
</script>

<script lang="ts">
	interface $$Props extends SwitchProps {}

	export let checked: $$Props["checked"] = false;
	export let small: $$Props["small"] = true;
</script>

<ICompSwitch bind:checked {small} {...$$restProps}>
	<slot />
</ICompSwitch>
