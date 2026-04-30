<script context="module" lang="ts">
   import { Card, CardHelpers, bg2font, colorMix, dataDebug, resolveColor, type CardProps, type ComponentColor } from "@ingenieria_insoft/ispsveltecomponents";

   export type AlertVariant = CardProps["variant"] | "outlined" | "onion";

   export interface AlertProps extends Omit<CardProps, "variant"> {
      variant?: AlertVariant;
      color?: ComponentColor;
   }
</script>

<script lang="ts">
   interface $$Props extends AlertProps {}

   export let inline: $$Props["inline"] = false;
   export let variant: $$Props["variant"] = "solid";
   export let color: $$Props["color"] = "card";
   export let relieve: $$Props["relieve"] = 55;
   export let sizew: $$Props["sizew"] = "md";

   const self = {
      get isOutlined() {
         return variant === "outlined";
      },
      get alertColor() {
         const fallback = variant === "outlined" ? "neutral" : "card";
         return resolveColor(color ?? fallback);
      },
      get backgoundColor() {
         const bgVariant = variant === "onion" ? "onion" : variant === "flat" ? "flat" : "solid";
         const c = CardHelpers.crdBg(bgVariant, relieve ?? 55, this.alertColor);
         switch (variant) {
            case "outlined":
               return "transparent";
            case "onion":
               return colorMix(c, "transparent", 60);
            default:
               return c;
         }
      },
      get style() {
         return ["background-color: " + this.backgoundColor, "color: " + (this.isOutlined ? colorMix(this.alertColor, "color", 50) : bg2font(this.backgoundColor)), this.isOutlined && "border: 1px solid " + this.alertColor, $$restProps.style].filter(Boolean).join("; ");
      },
      get resume() {
         return { ...$$restProps, style: this.style, ...dataDebug($$restProps, "alert") };
      },
   };
</script>

<Card {variant} {inline} {relieve} bind:sizew {...self.resume}>
   <slot {sizew} />
</Card>
