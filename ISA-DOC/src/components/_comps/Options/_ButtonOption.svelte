<script context="module" lang="ts">
   import { Button, Iconify } from "@ingenieria_insoft/ispsveltecomponents";
   import type { ButtonProps, IconifyProps } from "@ingenieria_insoft/ispsveltecomponents";

   export type ButtonOptionProps = ButtonProps & { label?: string; icon?: IconifyProps["icon"] };
</script>

<script lang="ts">
   interface $$Props extends ButtonOptionProps {}

   export let icon: $$Props["icon"] = undefined;
   export let label: $$Props["label"] = undefined;
   export let onClick: $$Props["onClick"] = undefined;

   const self = {
      get hascontent() {
         return !!(self.label || self.icon);
      },
      get label() {
         return label;
      },
      get icon() {
         return icon;
      },
      get class() {
         return ["button-option", $$restProps.class].filter(Boolean).join(" ");
      },
      get style() {
         return [$$restProps.style].filter(Boolean).join("; ");
      },
      get resume() {
         const { class: _class, style: _style, ...rest } = $$restProps as Record<string, unknown>;
         return { ...rest, class: self.class, style: self.style };
      },
   };
</script>

{#if self.hascontent}
   <Button {...self.resume} {onClick} variant="text" shape="pill">
      {#if self.icon}
         <Iconify slot="icon" icon={self.icon} style="margin-top: 0.1em;" />
      {/if}
      {#if self.label}
         {@html self.label}
      {/if}
   </Button>
{/if}

<style>
   :global(.button-option) {
      width: fit-content;
   }
</style>
