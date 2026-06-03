<script context="module" lang="ts">
   import { Dialog, type DialogProps } from "@ingenieria_insoft/ispsveltecomponents";

   export type FloaterSide = "top" | "right" | "bottom" | "left";
   export type FloaterAlign = "start" | "center" | "end";
   export type FloaterPlacement = FloaterSide | `${FloaterSide}-${"start" | "end"}`;
   export type FloaterTrigger = "manual" | "click" | "hover";

   export interface InvokedFloaterProps extends DialogProps {
      target?: HTMLElement | null;
      placement?: FloaterPlacement;
      offset?: number;
      flip?: boolean;
      flipAlign?: boolean;
      avoidAnchor?: boolean;
      closeOnOutside?: boolean;
      trigger?: FloaterTrigger;
      openDelay?: number;
      closeDelay?: number;
      wrapClass?: string;
      wrapStyle?: string;
   }

   export interface InvokedFloaterSlots {
      default: { side: FloaterSide; align: FloaterAlign };
   }

   export const FLOATER_WRAP_CLASS = "is-invoked-floater-wrap";
   export const FLOATER_DIALOG_CLASS = "is-invoked-floater-dialog";
</script>

<script lang="ts">
   import { onDestroy, tick } from "svelte";

   interface $$Props extends InvokedFloaterProps {}
   interface $$Slots extends InvokedFloaterSlots {}

   export let open: $$Props["open"] = false;
   export let target: $$Props["target"] = null;
   export let placement: $$Props["placement"] = "bottom";
   export let offset: $$Props["offset"] = 4;
   export let flip: $$Props["flip"] = true;
   export let flipAlign: $$Props["flipAlign"] = true;
   export let avoidAnchor: $$Props["avoidAnchor"] = true;
   export let closeOnOutside: $$Props["closeOnOutside"] = true;
   export let trigger: $$Props["trigger"] = "manual";
   export let openDelay: $$Props["openDelay"] = 0;
   export let closeDelay: $$Props["closeDelay"] = 100;
   export let wrapClass: $$Props["wrapClass"] = "";
   export let wrapStyle: $$Props["wrapStyle"] = "";

   let top = 0;
   let left = 0;
   let chosenSide: FloaterSide = "bottom";
   let chosenAlign: FloaterAlign = "center";
   let repositionRaf = 0;
   let removeViewportReposition: (() => void) | undefined;
   let removeOutsideClose: (() => void) | undefined;
   let removeTriggerListeners: (() => void) | undefined;
   let openTimer = 0;
   let closeTimer = 0;

   $: posStyle = ["position: absolute", "pointer-events: auto", `top: ${top}px`, `left: ${left}px`].join("; ");
   $: combinedWrapStyle = [posStyle, wrapStyle].filter(Boolean).join("; ");
   $: combinedWrapClass = [FLOATER_WRAP_CLASS, wrapClass].filter(Boolean).join(" ");

   const opposite: Record<FloaterSide, FloaterSide> = { top: "bottom", bottom: "top", left: "right", right: "left" };
   const perpendicular: Record<FloaterSide, FloaterSide[]> = {
      top: ["right", "left"],
      bottom: ["right", "left"],
      left: ["bottom", "top"],
      right: ["bottom", "top"],
   };
   const oppositeAlign: Record<FloaterAlign, FloaterAlign> = { start: "end", end: "start", center: "center" };

   const self = {
      get dialog() {
         const rest = { ...$$restProps } as Record<string, unknown>;
         delete rest.open;
         return { ...rest, class: [FLOATER_DIALOG_CLASS, $$restProps.class].filter(Boolean).join(" ") };
      },
      parseplacement(p: FloaterPlacement): { side: FloaterSide; align: FloaterAlign } {
         const [s, a] = p.split("-") as [FloaterSide, FloaterAlign | undefined];
         return { side: s, align: (a as FloaterAlign) ?? "center" };
      },
      getfloaterrect() {
         if (!target) return undefined;
         const panel = target.ownerDocument?.querySelector(`dialog.${FLOATER_DIALOG_CLASS}[open] .${FLOATER_WRAP_CLASS}`);
         if (!(panel instanceof HTMLElement)) return undefined;
         return panel.getBoundingClientRect();
      },
      sidefits(s: FloaterSide, r: DOMRect, fw: number, fh: number, off: number, dw: number, dh: number, min: number) {
         if (s === "top") return r.top - off - fh >= min;
         if (s === "bottom") return r.bottom + off + fh <= dh - min;
         if (s === "left") return r.left - off - fw >= min;
         return r.right + off + fw <= dw - min;
      },
      pickside(pref: FloaterSide, r: DOMRect, fw: number, fh: number, off: number, dw: number, dh: number, min: number): FloaterSide {
         if (!flip) return pref;
         const order: FloaterSide[] = [pref, opposite[pref], ...perpendicular[pref]];
         for (const s of order) if (self.sidefits(s, r, fw, fh, off, dw, dh, min)) return s;
         const space: Record<FloaterSide, number> = {
            top: r.top - min,
            bottom: dh - r.bottom - min,
            left: r.left - min,
            right: dw - r.right - min,
         };
         return (Object.keys(space) as FloaterSide[]).reduce((a, b) => (space[a] >= space[b] ? a : b), pref);
      },
      computecoords(s: FloaterSide, a: FloaterAlign, r: DOMRect, fw: number, fh: number, off: number) {
         let nt = 0;
         let nl = 0;
         if (s === "top" || s === "bottom") {
            nt = s === "top" ? r.top - fh - off : r.bottom + off;
            if (a === "start") nl = r.left;
            else if (a === "end") nl = r.right - fw;
            else nl = r.left + r.width / 2 - fw / 2;
         } else {
            nl = s === "left" ? r.left - fw - off : r.right + off;
            if (a === "start") nt = r.top;
            else if (a === "end") nt = r.bottom - fh;
            else nt = r.top + r.height / 2 - fh / 2;
         }
         return { nt, nl };
      },
      pickalign(s: FloaterSide, prefAlign: FloaterAlign, r: DOMRect, fw: number, fh: number, off: number, dw: number, dh: number, min: number): FloaterAlign {
         if (!flipAlign) return prefAlign;
         const tryalign = (a: FloaterAlign) => {
            const { nt, nl } = self.computecoords(s, a, r, fw, fh, off);
            return nt >= min && nl >= min && nt + fh <= dh - min && nl + fw <= dw - min;
         };
         if (tryalign(prefAlign)) return prefAlign;
         const opp = oppositeAlign[prefAlign];
         if (opp !== prefAlign && tryalign(opp)) return opp;
         return prefAlign;
      },
      reposition() {
         if (!target) return;
         const r = target.getBoundingClientRect();
         const ft = self.getfloaterrect();
         const fw = ft?.width ?? 200;
         const fh = ft?.height ?? 80;
         const off = offset ?? 4;
         const dw = window.innerWidth;
         const dh = window.innerHeight;
         const min = 4;
         const pref = self.parseplacement((placement ?? "bottom") as FloaterPlacement);
         const side = self.pickside(pref.side, r, fw, fh, off, dw, dh, min);
         const align = self.pickalign(side, pref.align, r, fw, fh, off, dw, dh, min);
         let { nt, nl } = self.computecoords(side, align, r, fw, fh, off);
         const maxTop = Math.max(min, dh - fh - min);
         const maxLeft = Math.max(min, dw - fw - min);
         if (avoidAnchor) {
            if (side === "top") nt = Math.min(nt, r.top - fh - off);
            else if (side === "bottom") nt = Math.max(nt, r.bottom + off);
            else if (side === "left") nl = Math.min(nl, r.left - fw - off);
            else nl = Math.max(nl, r.right + off);
         }
         nt = Math.max(min, Math.min(nt, maxTop));
         nl = Math.max(min, Math.min(nl, maxLeft));
         if (avoidAnchor) {
            const overlaps = nl + fw > r.left && nl < r.right && nt + fh > r.top && nt < r.bottom;
            if (overlaps) {
               const pushes = { top: r.top - fh - off, bottom: r.bottom + off, left: r.left - fw - off, right: r.right + off };
               const fits = {
                  top: pushes.top >= min,
                  bottom: pushes.bottom + fh <= dh - min,
                  left: pushes.left >= min,
                  right: pushes.right + fw <= dw - min,
               };
               const candidate = (["top", "bottom", "left", "right"] as FloaterSide[]).find((s) => fits[s]);
               if (candidate === "top") {
                  nt = pushes.top;
                  nl = Math.max(min, Math.min(r.left + r.width / 2 - fw / 2, maxLeft));
               } else if (candidate === "bottom") {
                  nt = pushes.bottom;
                  nl = Math.max(min, Math.min(r.left + r.width / 2 - fw / 2, maxLeft));
               } else if (candidate === "left") {
                  nl = pushes.left;
                  nt = Math.max(min, Math.min(r.top + r.height / 2 - fh / 2, maxTop));
               } else if (candidate === "right") {
                  nl = pushes.right;
                  nt = Math.max(min, Math.min(r.top + r.height / 2 - fh / 2, maxTop));
               }
            }
         }
         top = nt;
         left = nl;
         chosenSide = side;
         chosenAlign = align;
      },
      async schedulereposition() {
         await tick();
         await tick();
         for (let i = 0; i < 3; i++) {
            await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
            self.reposition();
         }
      },
      throttledreposition() {
         if (!open || !target) return;
         cancelAnimationFrame(repositionRaf);
         repositionRaf = requestAnimationFrame(() => {
            repositionRaf = 0;
            self.reposition();
         });
      },
      attachviewportreposition(anchor: HTMLElement) {
         const scrollTargets = new Set<EventTarget>();
         scrollTargets.add(window);
         const vv = window.visualViewport;
         if (vv) scrollTargets.add(vv);
         let el: HTMLElement | null = anchor;
         while (el) {
            const st = getComputedStyle(el);
            if (/(auto|scroll|overlay)/.test(st.overflowY + st.overflowX + st.overflow)) {
               scrollTargets.add(el);
            }
            el = el.parentElement;
         }
         for (const t of scrollTargets) t.addEventListener("scroll", self.throttledreposition, true);
         window.addEventListener("resize", self.throttledreposition);
         if (vv) vv.addEventListener("resize", self.throttledreposition);
         return () => {
            cancelAnimationFrame(repositionRaf);
            repositionRaf = 0;
            for (const t of scrollTargets) t.removeEventListener("scroll", self.throttledreposition, true);
            window.removeEventListener("resize", self.throttledreposition);
            if (vv) vv.removeEventListener("resize", self.throttledreposition);
         };
      },
      onoutsidepointerdown(e: PointerEvent) {
         if (!open) return;
         const t = e.target;
         if (!(t instanceof Node)) return;
         if (target && target.contains(t)) return;
         const doc = target?.ownerDocument ?? document;
         const wrap = doc.querySelector(`dialog.${FLOATER_DIALOG_CLASS}[open] .${FLOATER_WRAP_CLASS}`);
         if (wrap instanceof HTMLElement && wrap.contains(t)) return;
         open = false;
      },
      attachoutsideclose() {
         const doc = target?.ownerDocument ?? document;
         doc.addEventListener("pointerdown", self.onoutsidepointerdown, true);
         return () => {
            doc.removeEventListener("pointerdown", self.onoutsidepointerdown, true);
         };
      },
      cancelopentimer() {
         if (openTimer) {
            clearTimeout(openTimer);
            openTimer = 0;
         }
      },
      cancelclosetimer() {
         if (closeTimer) {
            clearTimeout(closeTimer);
            closeTimer = 0;
         }
      },
      requestopen() {
         self.cancelclosetimer();
         if (open) return;
         const d = openDelay ?? 0;
         if (d <= 0) {
            open = true;
            return;
         }
         self.cancelopentimer();
         openTimer = window.setTimeout(() => {
            openTimer = 0;
            open = true;
         }, d);
      },
      requestclose() {
         self.cancelopentimer();
         if (!open) return;
         const d = closeDelay ?? 0;
         if (d <= 0) {
            open = false;
            return;
         }
         self.cancelclosetimer();
         closeTimer = window.setTimeout(() => {
            closeTimer = 0;
            open = false;
         }, d);
      },
      ontargetclick(e: MouseEvent) {
         e.preventDefault();
         e.stopPropagation();
         if (open) self.requestclose();
         else self.requestopen();
      },
      ontargetkeydown(e: KeyboardEvent) {
         if (e.key !== "Enter" && e.key !== " ") return;
         e.preventDefault();
         if (open) self.requestclose();
         else self.requestopen();
      },
      ontargetpointerenter() {
         self.requestopen();
      },
      ontargetpointerleave() {
         self.requestclose();
      },
      ontargetfocusin() {
         self.requestopen();
      },
      ontargetfocusout() {
         self.requestclose();
      },
      onwrappointerenter() {
         self.cancelclosetimer();
      },
      onwrappointerleave() {
         self.requestclose();
      },
      attachtrigger(anchor: HTMLElement, mode: FloaterTrigger) {
         if (mode === "manual") return () => {};
         const doc = anchor.ownerDocument ?? document;
         const cleanups: Array<() => void> = [];
         if (mode === "click") {
            anchor.addEventListener("click", self.ontargetclick);
            anchor.addEventListener("keydown", self.ontargetkeydown);
            cleanups.push(() => anchor.removeEventListener("click", self.ontargetclick));
            cleanups.push(() => anchor.removeEventListener("keydown", self.ontargetkeydown));
         } else if (mode === "hover") {
            anchor.addEventListener("pointerenter", self.ontargetpointerenter);
            anchor.addEventListener("pointerleave", self.ontargetpointerleave);
            anchor.addEventListener("focusin", self.ontargetfocusin);
            anchor.addEventListener("focusout", self.ontargetfocusout);
            cleanups.push(() => anchor.removeEventListener("pointerenter", self.ontargetpointerenter));
            cleanups.push(() => anchor.removeEventListener("pointerleave", self.ontargetpointerleave));
            cleanups.push(() => anchor.removeEventListener("focusin", self.ontargetfocusin));
            cleanups.push(() => anchor.removeEventListener("focusout", self.ontargetfocusout));
            const onWrapDown = (e: Event) => {
               const t = e.target;
               if (!(t instanceof Node)) return;
               const w = doc.querySelector(`dialog.${FLOATER_DIALOG_CLASS}[open] .${FLOATER_WRAP_CLASS}`);
               if (w instanceof HTMLElement && w.contains(t)) return;
               if (anchor.contains(t)) return;
               self.requestclose();
            };
            doc.addEventListener("pointerdown", onWrapDown, true);
            cleanups.push(() => doc.removeEventListener("pointerdown", onWrapDown, true));
         }
         return () => {
            for (const c of cleanups) c();
            self.cancelopentimer();
            self.cancelclosetimer();
         };
      },
   };

   $: if (!!open && target) void self.schedulereposition();

   $: {
      removeViewportReposition?.();
      removeViewportReposition = undefined;
      if (!!open && target) {
         removeViewportReposition = self.attachviewportreposition(target);
      }
   }

   $: {
      removeOutsideClose?.();
      removeOutsideClose = undefined;
      if (!!open && closeOnOutside && trigger !== "hover") {
         removeOutsideClose = self.attachoutsideclose();
      }
   }

   $: {
      removeTriggerListeners?.();
      removeTriggerListeners = undefined;
      if (target && trigger && trigger !== "manual") {
         removeTriggerListeners = self.attachtrigger(target, trigger);
      }
   }

   onDestroy(() => {
      removeViewportReposition?.();
      removeViewportReposition = undefined;
      removeOutsideClose?.();
      removeOutsideClose = undefined;
      removeTriggerListeners?.();
      removeTriggerListeners = undefined;
      self.cancelopentimer();
      self.cancelclosetimer();
      cancelAnimationFrame(repositionRaf);
      repositionRaf = 0;
   });
</script>

<Dialog {...self.dialog} bind:open backeffect="none" lockViewportScroll={false} on:close on:cancel>
   <!-- svelte-ignore a11y_no_static_element_interactions -->
   <div class={combinedWrapClass} style={combinedWrapStyle} data-side={chosenSide} data-align={chosenAlign} on:pointerenter={trigger === "hover" ? self.onwrappointerenter : undefined} on:pointerleave={trigger === "hover" ? self.onwrappointerleave : undefined}>
      <slot side={chosenSide} align={chosenAlign} />
   </div>
</Dialog>

<style>
   :global {
      dialog.is-invoked-floater-dialog {
         background: transparent;
         border: none;
         padding: 0;
         max-width: none;
         max-height: none;
         overflow: visible;
      }
      dialog.is-invoked-floater-dialog::backdrop {
         background: transparent;
      }
      .is-invoked-floater-wrap {
         z-index: 9999;
      }
   }
</style>
