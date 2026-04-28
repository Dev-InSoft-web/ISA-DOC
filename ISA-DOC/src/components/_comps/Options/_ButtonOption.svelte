<script context="module" lang="ts">
   import type { ButtonProps, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";

   export type ButtonOptionProps = ButtonProps & {
      label?: string;
      icon?: IconifyProps["icon"];
      /** Si hay icono, oculta el label visible y úsalo solo como title (tooltip). */
      iconOnly?: boolean;
   };
</script>

<script lang="ts">
   import { Button, Iconify } from "@ingenieria_insoft/ispsveltecomponents";

   interface $$Props extends ButtonOptionProps {}

   export let icon: $$Props["icon"] = undefined;
   export let label: $$Props["label"] = undefined;
   export let iconOnly: $$Props["iconOnly"] = true;
   export let onClick: $$Props["onClick"] = undefined;

   $: showLabel = !icon || !iconOnly;
   $: titleAttr = label ?? $$restProps.title;
</script>

{#if label || icon}
   <Button {...$$restProps} title={titleAttr} {onClick} variant="text" shape="pill" class="button-option">
      {#if icon}
         <Iconify slot="icon" {icon} style="margin-top: 0.1em;" />
      {/if}
      {#if showLabel && label}
         {@html label}
      {/if}
   </Button>
{/if}

<style>
   :global(.button-option) {
      width: fit-content;
   }
</style>
