<script lang="ts">
   import ButtonIconify, { type ButtonIconifyProps } from "$lib/primitives/iconized/ButtonIconify.svelte";

   interface $$Props extends Omit<ButtonIconifyProps, "style"> {
      style?: string;
   }

   export let style: string | undefined = "";

   $: mergedStyle = `width: fit-content;${style ? " " + style : ""}`;
</script>

<ButtonIconify {...$$restProps} style={mergedStyle} on:click />
