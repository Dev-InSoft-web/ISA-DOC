<script context="module" lang="ts">
   import type { BreakpointSize, GridLayoutProps, GridLayoutSlots } from "@ingenieria_insoft/ispsveltecomponents";
   import { BlockLayout, GridLayout } from "@ingenieria_insoft/ispsveltecomponents";

   const cellsForm = (sizew: BreakpointSize = "md"): number => ({ xs: 1, sm: 1, md: 3, lg: 4, xl: 5 })[sizew] ?? 1;
</script>

<script lang="ts">
   interface $$Props extends GridLayoutProps {
      maxcells?: number;
      mincells?: number;
   }
   interface $$Slots {
      default: GridLayoutSlots["default"] & { small: boolean };
   }
   export let maxcells: number | undefined = undefined;
   export let mincells: number | undefined = undefined;

   const computeCells = (sizew: BreakpointSize | undefined): number => {
      const base = cellsForm(sizew);
      const capped = typeof maxcells === "number" && maxcells > 0 ? Math.min(base, maxcells) : base;
      return typeof mincells === "number" && mincells > 0 ? Math.max(capped, mincells) : capped;
   };
</script>

<BlockLayout style="width: 100%;" let:sizew let:boolszw let:lerpw>
   <GridLayout {sizew} cells={String(computeCells(sizew))} gap="1rem" {...$$restProps}>
      <slot {sizew} {boolszw} {lerpw} small={boolszw.sm} />
   </GridLayout>
</BlockLayout>
