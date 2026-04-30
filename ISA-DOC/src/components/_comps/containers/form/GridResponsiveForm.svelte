<script context="module" lang="ts">
   import { GridLayout } from "@ingenieria_insoft/ispsveltecomponents";
   import type { BreakpointSize, GridLayoutProps, GridLayoutSlots } from "@ingenieria_insoft/ispsveltecomponents";

   const cellsForm = (sizew: BreakpointSize = "md"): number => ({ xs: 1, sm: 1, md: 4, lg: 5, xl: 6 })[sizew] ?? 1;
</script>

<script lang="ts">
   interface $$Props extends GridLayoutProps {}
   interface $$Slots {
      default: GridLayoutSlots["default"] & { small: boolean };
   }
   let sizew: BreakpointSize = "md";
   let cells: number = 4;
   $: cells = cellsForm(sizew);
</script>

<GridLayout bind:sizew let:boolszw cells={String(cells)} {...$$restProps}>
   <slot {sizew} {boolszw} small={boolszw.sm} />
</GridLayout>
