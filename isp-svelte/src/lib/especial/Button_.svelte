<script context="module" lang="ts">
	import { Button, type ButtonProps } from "@ingenieria_insoft/ispsveltecomponents";

	export interface ButtonProps_ extends ButtonProps {}
</script>

<script lang="ts">
	interface $$Props extends ButtonProps_ {}
</script>

<Button {...$$restProps} style={["width: fit-content;", $$restProps.style].filter(Boolean).join("")}>
	<slot />
</Button>
