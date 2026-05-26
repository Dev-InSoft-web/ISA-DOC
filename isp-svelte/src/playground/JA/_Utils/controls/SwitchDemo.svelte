<script lang="ts">
   import Switch from "$lib/primitives/iconized/Switch.svelte";
   import type { SwitchProps } from "$lib/primitives/iconized/Switch.svelte";

   interface $$Props extends SwitchProps {}

   export let checked: $$Props["checked"] = null;
   export let small: $$Props["small"] = false;
   export let title: string | null | undefined = undefined;
</script>

<div style="width: 100%; box-sizing: border-box;" title={title || undefined}>
   <Switch bind:checked color="primary" colorFalse="neutral" {small} {...$$restProps}>
      <slot />
   </Switch>
</div>
