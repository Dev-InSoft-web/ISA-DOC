<script context="module" lang="ts">
   import { colorMix, resolveColor, type ComponentColor } from "$lib/UlConst";
   import type { BlockLayoutProps, BlockLayoutSlots } from "./layout/BlockLayout.svelte";
   import BlockLayout, { LayoutHelpers } from "./layout/BlockLayout.svelte";

   export const mkDarken = (c: string, p: number = 0): string => colorMix(c, "black", p);
   export const mkLighten = (c: string, p: number = 0): string => colorMix(c, "white", p);
   export const mkAlpha = (c: string, p: number = 0): string => colorMix(c, "transparent", p);
   export const mkInvertL = (c: string): string => `hsl(from ${resolveColor(c)} h s calc(100 - l))`;
   export const mkBow = (color: ComponentColor, percent: number = 0): string => colorMix(color, "color", percent);
   export const mkUnbow = (color: ComponentColor, percent: number = 0): string => colorMix(color, mkInvertL("color"), percent);
   export const bg2font = (c: string) => `oklch(from ${c} calc((sign(0.75 - l) + 1) / 2 * 100%) 0 h / 1)`;

   export interface CardProps extends BlockLayoutProps {
      variant?: "solid" | "flat" | string;
      relieve?: number;
      children?: any;
   }
   export interface CardSlots extends BlockLayoutSlots {}

   // ---

   const px = (n: number) => `${n.toFixed(2)}px`;
   const boxShadowLayer = (inset: boolean, x: number, y: number, blur: number, spread: number, color: string) => `${inset ? "inset " : ""}${px(x)} ${px(y)} ${px(blur)} ${px(spread)} ${color}`;
   const rgba = (r: number, g: number, b: number, alpha: number) => `rgba(${r},${g},${b},${alpha.toFixed(4)})`;
   const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

   function insetSigns(angleDeg: number): [number, number] {
      const hit = { 0: [-1, 0], 90: [0, 1], 180: [1, 0], 270: [0, -1] }[angleDeg];
      if (hit) return hit as [number, number];
      const irad = (angleDeg * Math.PI) / 180;
      const ix = Math.cos(irad);
      const iy = -Math.sin(irad);
      if (Math.abs(ix) < 1e-15 && Math.abs(iy) < 1e-15) return [-1, -1];
      let sx = -Math.sign(ix);
      let sy = -Math.sign(iy);
      if (sx === 0) sx = -Math.sign(iy) || -1;
      if (sy === 0) sy = -Math.sign(ix) || -1;
      return [sx, sy];
   }

   /** relieve: bits 0–6 = relieve, 7–10 = índice ángulo, 11–17 = elevation */
   function decodeRelieve(relieve: number): { percent: number; angleIndex: number; elevation: number } {
      const n = Math.floor(Number(relieve)) || 0;
      const percent = Math.min(100, Math.max(0, n & 0x7f));
      let angleIndex = (n >> 7) & 0xf;
      if (angleIndex > 8) angleIndex = 0;
      return { percent, angleIndex, elevation: n >> 11 !== 0 ? Math.min(100, Math.max(0, (n >> 11) & 0x7f)) : 10 };
   }

   const cardShadow = (variant: string, relieve: number): string | undefined => {
      if (variant === "flat") return undefined;
      const { percent: r, angleIndex: relieveAngleIndex, elevation: e } = decodeRelieve(Number(relieve) || 0);
      const relieveAngleDeg = relieveAngleIndex <= 0 || relieveAngleIndex > 8 ? 320 : (relieveAngleIndex - 1) * 45;
      const shadows: string[] = [];
      if (e > 0) {
         const ff = Math.min(1, Math.max(0, e / 100));
         const rad = ((relieveAngleIndex > 1 ? (relieveAngleDeg + 180) % 360 : relieveAngleDeg) * Math.PI) / 180;
         const mag = ff * 24;
         const dx = mag * Math.cos(rad);
         const dy = -mag * Math.sin(rad);
         shadows.push(boxShadowLayer(false, dx, dy, 2 + ff * 15, ff * 3, colorMix(rgba(0, 0, 0, 1), "transparent", 95 - 10 * ff)));
      }
      const dr = r - 50;
      if (dr !== 0) {
         const t = Math.min(1, Math.abs(dr) / 50);
         const rff = Math.pow(t, 0.7);
         const g = 6 * 0.8;
         const off = rff * g;
         const blurPx = Math.max(0.5, (1 - rff) * g);
         const isLow = dr < 0;
         const aInset = isLow ? Math.min(2 * t * 0.7, 0.1) * 0.6 : Math.min(t * 0.7, 0.05);
         const light = rgba(255, 255, 255, clamp01(aInset * (isLow ? 0.3 : 1)));
         const dark = rgba(0, 0, 0, (isLow ? Math.min(aInset * 2.5 * 1.7, 1) : aInset) * 0.5);
         const lightBlurPx = (isLow ? Math.max(blurPx * 2, 2) : blurPx) + 3 * clamp01((r - 50) / 50);
         const [sx1, sy1] = insetSigns(relieveAngleDeg);
         shadows.push(boxShadowLayer(true, sx1 * off, sy1 * off, dr > 0 ? lightBlurPx : blurPx, 0, dr > 0 ? light : dark));
         shadows.push(boxShadowLayer(true, -sx1 * off, -sy1 * off, dr > 0 ? blurPx : lightBlurPx, 0, dr > 0 ? dark : light));
      }
      return shadows.length > 0 ? shadows.join(", ") : undefined;
   };

   const cardBg = (variant: string, relieve: number, baseCssColor: string): string => {
      if (!["solid", "onion", "flat"].includes(String(variant))) return "";
      const { percent: r } = decodeRelieve(Number(relieve) || 0);
      const isOnion = variant === "onion";
      if (r <= 50) {
         const u = (50 - r) / 50;
         const blendPct = 50 * u;
         const blackPct = 3 * u;
         const base = colorMix(isOnion ? "transparent" : baseCssColor, resolveColor("bg"), blendPct);
         return colorMix(base, "black", blackPct);
      }
      const v = (r - 50) / 50;
      const whitePct = 5 * v;
      return colorMix(isOnion ? "transparent" : baseCssColor, "white", whitePct);
   };

   const CardHelpers = { crdShdw: cardShadow, crdBg: cardBg };
   // ----
</script>

<script lang="ts">
   interface $$Props extends CardProps {}
   interface $$Slots extends CardSlots {}

   export let inline: $$Props["inline"] = false;
   export let variant: $$Props["variant"] = "";
   export let relieve: $$Props["relieve"] = -1;

   let sizew: $$Props["sizew"] = "md";

   const self = {
      paddingMap: { xs: "0.35rem", sm: "0.4rem", md: "0.5rem", lg: "0.5rem", xl: "0.5rem" },
      get class() {
         return ["card-root", $$restProps.class].filter(Boolean).join(" ");
      },
      get variant() {
         return variant || "solid";
      },
      get relieve() {
         return (relieve ?? -1) < 0 ? 55 : relieve!;
      },
      get borderSubtleColor() {
         return mkAlpha(mkUnbow("neutral", 50), 85);
      },
      get isAutoBoxShadow() {
         return ["solid", "onion"].includes(this.variant);
      },
      get isAutoBackground() {
         return ["solid", "onion", "flat"].includes(this.variant);
      },
      get baseBackgroundColor() {
         return CardHelpers.crdBg(this.variant, this.relieve, resolveColor("card"));
      },
      get backgroundColor() {
         return this.variant === "onion" ? colorMix(this.baseBackgroundColor, "transparent", 60) : this.baseBackgroundColor;
      },
      get style() {
         return ["color: " + resolveColor("color"), "padding: " + this.paddingMap[sizew || "md"], "border: 1px solid " + this.borderSubtleColor, this.isAutoBoxShadow && "box-shadow: " + CardHelpers.crdShdw(this.variant, this.relieve), this.isAutoBackground && "background-color: " + this.backgroundColor, $$restProps.style].filter(Boolean).join("; ");
      },
      get resume() {
         return { ...$$restProps, class: this.class, style: this.style, ...LayoutHelpers.dataDebug($$restProps, "card-old") };
      },
      get slotresume() {
         return { sizew, boolszw: LayoutHelpers.getSizeFlags(sizew) };
      },
   };
</script>

<BlockLayout {...self.resume} {inline} bind:sizew>
   <slot {...self.slotresume} />
</BlockLayout>

<style>
   :global {
      .card-root {
         box-sizing: border-box;
         border-radius: 0.5rem;
      }
   }
</style>
