<script lang="ts">
   import Button, { type ButtonProps } from "$lib/primitives/iconized/Button.svelte";

   interface $$Props extends Omit<ButtonProps, "style"> {
      style?: string;
   }

   export let variant: ButtonProps["variant"] = undefined;
   export let color: ButtonProps["color"] = undefined;
   export let style: string | undefined = "";

   $: mergedStyle = `width: fit-content;${style ? " " + style : ""}`;
</script>

<Button {...$$restProps} {variant} {color} style={mergedStyle} on:click>
   <slot slot="icon" name="icon" />
   <slot />
</Button>
