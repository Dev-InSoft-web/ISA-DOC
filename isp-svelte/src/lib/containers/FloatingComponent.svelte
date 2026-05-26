<script context="module" lang="ts">
   import { BlockLayout, LayoutHelpers, type BlockLayoutProps, type BlockLayoutSlots } from "@ingenieria_insoft/ispsveltecomponents";
   import { fade } from "svelte/transition";

   export interface FloatingComponentProps extends BlockLayoutProps {
      showfloat?: boolean;
      horizontal?: "left" | "center" | "right" | `left+${number}` | `right+${number}`;
      vertical?: "top" | "center" | "bottom" | `top+${number}` | `bottom+${number}`;
      /**
       * Transformación lineal extra aplicada al panel flotante. Se compone después
       * de la traslación de anclaje. `tx`/`ty` aceptan número (px) o string CSS
       * (`"1rem"`, `"-1em"`, `"50%"`); `scale` es un número (1 = sin escala).
       */
      linearTransform?: { tx?: number | string; ty?: number | string; scale?: number };
   }

   export interface FloatingComponentSlots extends BlockLayoutSlots {
      float: {};
   }
</script>

<script lang="ts">
   interface $$Props extends FloatingComponentProps {}
   interface $$Slots extends FloatingComponentSlots {}

   export let showfloat: $$Props["showfloat"] = true;
   export let horizontal: $$Props["horizontal"] = "right";
   export let vertical: $$Props["vertical"] = "center";
   export let linearTransform: $$Props["linearTransform"] = undefined;

   let sizew: $$Props["sizew"] = "md";

   const parseAxis = (value: string | undefined): { side: string; offset: number } => {
      const raw = String(value ?? "");
      const [side, off] = raw.split("+");
      const offset = off ? Number(off) : NaN;
      return { side: side || "", offset: Number.isFinite(offset) ? offset : 0 };
   };

   const toCssLen = (v: number | string | undefined): string => {
      if (v === undefined || v === null || v === "") return "0";
      if (typeof v === "number") return Number.isFinite(v) ? `${v}px` : "0";
      return String(v);
   };

   const linearTransformCss = (lt: { tx?: number | string; ty?: number | string; scale?: number } | undefined): string => {
      if (!lt) return "";
      const parts: string[] = [];
      const tx = toCssLen(lt.tx);
      const ty = toCssLen(lt.ty);
      if (tx !== "0" || ty !== "0") parts.push(`translate(${tx}, ${ty})`);
      const s = typeof lt.scale === "number" && Number.isFinite(lt.scale) && lt.scale !== 1 ? lt.scale : 0;
      if (s) parts.push(`scale(${s})`);
      return parts.join(" ");
   };

   const self = {
      panel: {
         getHorizontal() {
            const { side, offset } = parseAxis(horizontal);
            let [left, right, tx] = ["auto", "auto", "0"];
            if (side === "left" && offset > 0) [left, right, tx] = ["0", "auto", `-${offset}%`];
            else if (side === "right" && offset > 0) [left, right, tx] = ["auto", "0", `${offset}%`];
            else if (side === "left") [left, right] = ["0.25em", "auto"];
            else if (side === "right") [left, right] = ["auto", "0.25em"];
            else if (side === "center") [left, right, tx] = ["50%", "auto", "-50%"];
            return { styles: [`left: ${left}`, `right: ${right}`], tx };
         },
         getVertical() {
            const { side, offset } = parseAxis(vertical);
            let [top, bottom, ty] = ["auto", "auto", "0"];
            if (side === "top" && offset > 0) [top, bottom, ty] = ["0", "auto", `-${offset}%`];
            else if (side === "bottom" && offset > 0) [top, bottom, ty] = ["auto", "0", `${offset}%`];
            else if (side === "top") [top, bottom] = ["0", "auto"];
            else if (side === "bottom") [top, bottom] = ["auto", "-15px"];
            else if (side === "center") [top, bottom, ty] = ["50%", "auto", "-50%"];
            return { styles: [`top: ${top}`, `bottom: ${bottom}`], ty };
         },
         get style() {
            const h = self.panel.getHorizontal();
            const v = self.panel.getVertical();
            const baseTransform = (h.tx !== "0" || v.ty !== "0") ? `translate(${h.tx}, ${v.ty})` : "";
            const extra = linearTransformCss(linearTransform);
            const transform = [baseTransform, extra].filter(Boolean).join(" ");
            return [...h.styles, ...v.styles, transform && `transform: ${transform}`, extra && `transform-origin: top right`].filter(Boolean).join("; ");
         },
      },
      get wrapClass() {
         return ["fc-wrap", $$restProps.class].filter(Boolean).join(" ");
      },
      get slotresume() {
         return LayoutHelpers.getSlotResume(sizew);
      },
   };
</script>

<BlockLayout {...$$restProps} class={self.wrapClass} bind:sizew>
   <slot {...self.slotresume} />
   {#if showfloat}
      <div class="fc-panel" style={self.panel.style} in:fade={{ duration: 200 }} out:fade={{ duration: 200 }} on:click|stopPropagation role="presentation">
         <slot name="float" />
      </div>
   {/if}
</BlockLayout>

<style>
   :global {
      .fc-wrap {
         position: relative;
         overflow: visible;
         > .fc-panel {
            position: absolute;
            z-index: 1;
            pointer-events: none;
            overflow: visible;
            display: block;
            visibility: visible;
            > * {
               pointer-events: auto;
            }
         }
      }
   }
</style>
