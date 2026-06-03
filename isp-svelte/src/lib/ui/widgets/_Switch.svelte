<script context="module" lang="ts">
   import { Switch, Text, type SwitchProps } from "@ingenieria_insoft/ispsveltecomponents";

   export interface _SwitchProps extends SwitchProps {
      label?: string;
   }
</script>

<script lang="ts">
   interface $$Props extends _SwitchProps {}

   export let checked: $$Props["checked"] = false;
   export let readonly: $$Props["readonly"] = false;
   export let label: $$Props["label"] = "";

   const self = {
      get class() {
         return $$restProps.class;
      },
      get style() {
         return $$restProps.style;
      },
      get resume() {
         return { ...$$restProps, class: this.class, style: this.style };
      },
      get label() {
         return label || "";
      },
   };
</script>

<Switch {...self.resume} bind:checked disabled={readonly} color="primary" colorFalse="neutral" on:change>
   <Text lines={1}>{self.label}</Text>
</Switch>
