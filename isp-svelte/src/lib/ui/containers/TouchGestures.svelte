<script context="module" lang="ts">
   import type { BreakpointSize, LayoutProps } from "@ingenieria_insoft/ispsveltecomponents";
   import { BlockLayout, dataDebug } from "@ingenieria_insoft/ispsveltecomponents";

   type TouchGestureDetails = {
      event: TouchEvent;
      translatex: number;
      isswiping: boolean;
      immediate: boolean;
      threshold: number;
      touches: TTouchState[];
   };

   type TTouchAxisState = {
      start: number;
      end: number;
      prev: number;
      delta: number;
      event: TouchEvent;
      readonly magnitude: number;
   };

   type TTouchState = {
      id: number;
      x: TTouchAxisState;
      y: TTouchAxisState;
      timestart: number;
      timeend: number;
      readonly active: boolean;
      readonly timeactive: number;
      readonly magnitude: number;
      readonly radians: number;
   };

   type TOnSwipeGesture = (event: TouchEvent, details: TouchGestureDetails) => void;

   export interface TouchGesturesProps extends LayoutProps {
      onswipestart: TOnSwipeGesture;
      onswiping: TOnSwipeGesture;
      onswipeend: TOnSwipeGesture;
      onswiperight: TOnSwipeGesture;
      onswipeleft: TOnSwipeGesture;
      onswipeup: TOnSwipeGesture;
      onswipedown: TOnSwipeGesture;
   }

   export interface TouchGesturesSlots {
      default: {
         translatex: number;
         isswiping: boolean;
         immediate: boolean;
         threshold: number;
         sizew: BreakpointSize;
      };
   }
</script>

<script lang="ts">
   interface $$Props extends TouchGesturesProps {}
   interface $$Slots extends TouchGesturesSlots {}

   export let onswipestart: $$Props["onswipestart"] = () => 0;
   export let onswiping: $$Props["onswiping"] = () => 0;
   export let onswipeend: $$Props["onswipeend"] = () => 0;
   export let onswiperight: $$Props["onswiperight"] = () => 0;
   export let onswipeleft: $$Props["onswipeleft"] = () => 0;
   export let onswipeup: $$Props["onswipeup"] = () => 0;
   export let onswipedown: $$Props["onswipedown"] = () => 0;

   const defaultSizew: BreakpointSize = "md";
   const self = {
      sizew: defaultSizew,
      immediate: false,
      threshold: 100,
      translatex: 0,
      isswiping: false,
      touches: [] as TTouchState[],
      createaxis(value: number, event: TouchEvent): TTouchAxisState {
         return {
            start: value,
            end: value,
            prev: value,
            delta: 0,
            event,
            get magnitude() {
               return Math.abs(this.delta);
            },
         };
      },
      upserttouch(touch: Touch, event: TouchEvent, isstart = false) {
         const idx = self.touches.findIndex((t) => t.id === touch.identifier);
         if (idx === -1 || isstart) {
            const next: TTouchState = {
               id: touch.identifier,
               x: self.createaxis(touch.clientX, event),
               y: self.createaxis(touch.clientY, event),
               timestart: Date.now(),
               timeend: 0,
               get active() {
                  return this.timeend < this.timestart;
               },
               get timeactive() {
                  const tend = this.active ? Date.now() : this.timeend;
                  return tend - this.timestart;
               },
               get magnitude() {
                  return Math.hypot(this.x.delta, this.y.delta);
               },
               get radians() {
                  return Math.atan2(this.y.delta, this.x.delta);
               },
            };
            self.touches = idx === -1 ? [...self.touches, next] : self.touches.map((t, i) => (i === idx ? next : t));
            return;
         }
         const current = self.touches[idx];
         current.x.prev = current.x.end;
         current.y.prev = current.y.end;
         current.x.end = touch.clientX;
         current.y.end = touch.clientY;
         current.x.delta = current.x.end - current.x.start;
         current.y.delta = current.y.end - current.y.start;
         current.x.event = event;
         current.y.event = event;
      },
      updatetouches(event: TouchEvent, touchlist: TouchList, isstart = false) {
         for (let i = 0; i < touchlist.length; i += 1) {
            const touch = touchlist.item(i);
            if (!touch) continue;
            self.upserttouch(touch, event, isstart);
         }
      },
      details(event: TouchEvent): TouchGestureDetails {
         return {
            event,
            translatex: self.translatex,
            isswiping: self.isswiping,
            immediate: self.immediate,
            threshold: self.threshold,
            touches: self.touches,
         };
      },
      ontouchstart(event: TouchEvent) {
         const touch = event.touches[0];
         if (!touch) return;
         self.updatetouches(event, event.changedTouches, true);
         self.isswiping = true;
         onswipestart(event, self.details(event));
      },
      ontouchmove(event: TouchEvent) {
         if (!self.isswiping) return;
         const touch = event.touches[0];
         if (!touch) return;
         self.updatetouches(event, event.changedTouches, false);

         const touch0 = self.touches[0];
         const startx = touch0?.x.start ?? touch.clientX;
         const starty = touch0?.y.start ?? touch.clientY;
         const deltax = touch.clientX - startx;
         const deltay = Math.abs(touch.clientY - starty);
         const ishorizontal = Math.abs(deltax) > deltay;
         if (!ishorizontal) return;

         self.translatex = deltax;
         onswiping(event, self.details(event));
      },
      ontouchend(event: TouchEvent) {
         self.finishgesture(event);
      },
      finishgesture(event: TouchEvent) {
         if (!self.isswiping) return;
         self.updatetouches(event, event.changedTouches, false);
         const endtime = Date.now();
         self.touches.forEach((t) => {
            t.timeend = endtime;
         });
         self.isswiping = false;
         const maxdistance = 400;
         const iswithinmaxdistance = Math.abs(self.translatex) <= maxdistance;
         const maxydeviation = 150;
         const touch0 = self.touches[0];
         const xdeviation = Math.abs((touch0?.x.end ?? 0) - (touch0?.x.start ?? 0));
         const ydeviation = Math.abs((touch0?.y.end ?? 0) - (touch0?.y.start ?? 0));
         const iswithinydeviation = ydeviation <= maxydeviation;
         const iswithinxdeviation = xdeviation <= maxydeviation;
         const maxdurationms = 1500;
         const timedurationms = touch0?.timeactive ?? 0;
         const iswithinduration = timedurationms <= maxdurationms;
         const mindeltax = 30;
         const hasmindeltax = Math.abs(self.translatex) >= mindeltax;
         const deltay = touch0?.y.delta ?? 0;
         const issingletouch = self.touches.length <= 1;
         if (issingletouch && iswithinmaxdistance && iswithinduration) {
            if (iswithinydeviation && hasmindeltax && self.translatex > self.threshold) onswiperight(event, self.details(event));
            if (iswithinydeviation && hasmindeltax && self.translatex < -self.threshold) onswipeleft(event, self.details(event));
            if (iswithinxdeviation && deltay > self.threshold) onswipedown(event, self.details(event));
            if (iswithinxdeviation && deltay < -self.threshold) onswipeup(event, self.details(event));
         }
         onswipeend(event, self.details(event));
         self.translatex = 0;
         self.touches = [];
      },
      get resumeslot() {
         return {
            translatex: self.translatex,
            isswiping: self.isswiping,
            immediate: self.immediate,
            threshold: self.threshold,
            sizew: self.sizew,
         };
      },
      get rootclass() {
         return ["touch-gestures-root", $$restProps.class].filter(Boolean).join(" ");
      },
      get debugattrs() {
         return dataDebug($$restProps, "touch-gestures");
      },
   };
</script>

<BlockLayout {...$$restProps} {...self.debugattrs} class={self.rootclass} bind:sizew={self.sizew}>
   <div role="presentation" class="touch-gestures-body" on:touchstart={self.ontouchstart} on:touchmove={self.ontouchmove} on:touchend={self.ontouchend} on:touchcancel={self.ontouchend}>
      <slot {...self.resumeslot} />
   </div>
</BlockLayout>

<style>
   .touch-gestures-body {
      display: flex;
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      min-height: 0;
      flex: 1 1 auto;
   }

   :global {
      .touch-gestures-root {
         position: relative;
         width: 100%;
         height: 100%;
         min-height: 0;
      }
   }
</style>
