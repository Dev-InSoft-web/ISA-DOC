<script context="module" lang="ts">
   import { ButtonIconify, Card, Dialog, FlexLayout, Iconify, Text, bordercolor, resolveColor, type ButtonProps, type DialogProps } from "@ingenieria_insoft/ispsveltecomponents";
   import type { ButtonOptionProps } from "./_ButtonOption.svelte";
   import { tick } from "svelte";
	import { cubicOut } from "svelte/easing";
	import { scale } from "svelte/transition";

   export type CascadeOptionsAction = ButtonOptionProps & { separator?: boolean };

   export interface CascadeOptionsProps extends DialogProps {
      items?: CascadeOptionsAction[];
      disabled?: boolean;
   }

   export interface CascadeOptionsSlots {
      default: {
         open: boolean;
      };
      childrens: {
         open: boolean;
      };
   }
</script>

<script lang="ts">
   type $$Props = CascadeOptionsProps;
   interface $$Slots extends CascadeOptionsSlots {}

   export let items: $$Props["items"] = [];
   export let open: $$Props["open"] = false;
   export let disabled: $$Props["disabled"] = false;

   let anchorEl: HTMLElement | undefined = undefined;
   let top = 0;
   let left = 0;

   $: cascadeZoomWrapStyle = ["position: absolute", "pointer-events: auto", `top: ${top}px`, `left: ${left}px`, "transform-origin: left top"].join("; ");

   async function schedulecascadeposition() {
      await tick();
      await tick();
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      self.positionandshow();
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      self.positionandshow();
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      self.positionandshow();
   }

   const self = {
      get isopen() {
         return !!open;
      },
      get itemscount() {
         return items?.length ?? 0;
      },
      get empty() {
         return !(items && items.length > 0);
      },
      get blocked() {
         return disabled || self.empty;
      },
      anchor: {
         get class() {
            return ["wrap", "anchor", self.blocked ? "anchor--disabled" : ""].filter(Boolean).join(" ");
         },
      },
      dialog: {
         get class() {
            return ["cascade-options-dialog", $$restProps.class].filter(Boolean).join(" ");
         },
         get resume() {
            const rest = { ...$$restProps } as Record<string, unknown>;
            delete rest.open;
            return rest;
         },
      },
      openmenu() {
         if (self.blocked) return;
         open = true;
      },
      getpanelrect() {
         if (!anchorEl) return undefined;
         const panel = anchorEl.ownerDocument?.querySelector("dialog.cascade-options-dialog[open] .cascade-options-zoom-wrap");
         if (!(panel instanceof HTMLElement)) return undefined;
         return panel.getBoundingClientRect();
      },
      positionandshow() {
         if (!anchorEl) return;
         const rect = anchorEl.getBoundingClientRect();
         const dh = window.innerHeight;
         const dw = window.innerWidth;
         const panelRect = self.getpanelrect();
         const panelWidth = panelRect?.width ?? 256;
         const panelHeight = panelRect?.height ?? 320;
         const gap = 2;
         const min = 2;
         const maxTop = Math.max(min, dh - panelHeight - min);
         const maxLeft = Math.max(min, dw - panelWidth - min);
         const shouldUseBottom = rect.bottom + gap + panelHeight > dh - min && rect.top - gap - panelHeight >= min;
         const shouldUseRight = rect.left + panelWidth > dw - min && rect.right - panelWidth >= min;

         const rawTop = shouldUseBottom ? rect.top - panelHeight - gap : rect.bottom + gap;
         const rawLeft = shouldUseRight ? rect.right - panelWidth : rect.left;
         top = Math.max(min, Math.min(rawTop, maxTop));
         left = Math.max(min, Math.min(rawLeft, maxLeft));
      },
      onanchorclick(e: MouseEvent) {
         e.stopPropagation();
         if (!self.blocked) self.openmenu();
      },
      onanchorkeydown(e: KeyboardEvent) {
         e.stopPropagation();
         if (e.currentTarget !== e.target) return;
         if (e.key !== "Enter" && e.key !== " ") return;
         e.preventDefault();
         if (!self.blocked) self.openmenu();
      },
      oncascademenuitemclick(e: unknown, itemonclick: ButtonProps["onClick"]) {
         if (!itemonclick) return;
         if (e && typeof e === "object" && "stopPropagation" in e) (e as Event).stopPropagation();
         const ev = e instanceof MouseEvent ? e : undefined;
         if (!ev) return;
         void Promise.resolve(itemonclick(ev as MouseEvent & { currentTarget: HTMLButtonElement }));
         open = false;
      },
   };

   let removeViewportReposition: (() => void) | undefined;
   let repositionRaf = 0;

   function schedulereposition() {
      if (!open || !anchorEl) return;
      cancelAnimationFrame(repositionRaf);
      repositionRaf = requestAnimationFrame(() => {
         repositionRaf = 0;
         self.positionandshow();
      });
   }

   function attachviewportreposition(anchor: HTMLElement) {
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

      for (const t of scrollTargets) {
         t.addEventListener("scroll", schedulereposition, true);
      }
      window.addEventListener("resize", schedulereposition);
      if (vv) {
         vv.addEventListener("resize", schedulereposition);
      }

      return () => {
         cancelAnimationFrame(repositionRaf);
         repositionRaf = 0;
         for (const t of scrollTargets) {
            t.removeEventListener("scroll", schedulereposition, true);
         }
         window.removeEventListener("resize", schedulereposition);
         if (vv) {
            vv.removeEventListener("resize", schedulereposition);
         }
      };
   }

   $: if (disabled && !!open) open = false;
   $: if (!!open && anchorEl) void schedulecascadeposition();

   $: {
      removeViewportReposition?.();
      removeViewportReposition = undefined;
      if (!!open && anchorEl) {
         removeViewportReposition = attachviewportreposition(anchorEl);
      }
   }
</script>

<FlexLayout class="cascade-options" inline items="center" style="vertical-align: middle">
   <FlexLayout class={self.anchor.class} inline items="center" role="presentation">
      <button type="button" bind:this={anchorEl} style="min-width: 0; border: none; background: transparent; padding: 0;" on:click={self.onanchorclick} on:keydown={self.onanchorkeydown}>
         <slot open={self.isopen}>
            <ButtonIconify icon="mdi:dots-vertical" title="Más opciones" disabled={self.blocked} />
         </slot>
      </button>
   </FlexLayout>

   <Dialog {...self.dialog.resume} class={self.dialog.class} bind:open backeffect="none" lockViewportScroll={false}>
      <div class="cascade-options-zoom-wrap" style={cascadeZoomWrapStyle} transition:scale={{ start: 0.88, duration: 120, easing: cubicOut }}>
         <Card class="cascade-options-panel blockCloseClick" role="menu" style={["padding: 0", "min-width: 10em", "max-width: min(22em, 90dvw)", "max-height: min(80dvh, 600px)", "overflow-y: auto", `--cod-separator-border: ${resolveColor("border")}`].join("; ")}>
            <FlexLayout direction="column" gap="0">
               {#each items as item}
                  {#if item.separator}
                     <div class="cod-separator" style="border-top: 1px solid {bordercolor};"></div>
                  {:else}
                     {@const { separator: _sep, onClick: itemOnClick, ...rest } = item}
                     <ButtonIconify role="menuitem" {...rest} shape="rect" disabled={disabled ? true : rest.disabled} class={item.class || ""} style={["justify-content: start", item.style].filter(Boolean).join("; ")} on:click={(e) => self.oncascademenuitemclick(e, itemOnClick)}>
                        {#if item.label}
                           <Iconify icon={item.icon!} />
                           {item.label}
                        {/if}
                     </ButtonIconify>
                  {/if}
               {/each}
               {#if self.itemscount === 0}
                  <FlexLayout inline items="center" justify="center" gap="0.35em" style="text-align: center; width: 100%">
                     <Iconify icon="mdi:inbox-outline" style="font-size: 1.1em; flex-shrink: 0" />
                     <Text color="neutral">Sin acciones</Text>
                  </FlexLayout>
               {/if}
               <slot name="childrens" open={self.isopen} />
            </FlexLayout>
         </Card>
      </div>
   </Dialog>
</FlexLayout>

<style>
   .cod-separator {
      height: 0;
      margin: 0.25rem 0.5em;
      border: none;
      background: transparent;
   }

   :global {
      .cascade-options {
         vertical-align: middle;

         .cascade-options-panel {
            z-index: 9999;
         }

         .wrap.anchor {
            cursor: pointer;
            min-width: 0;

            &.anchor--disabled {
               opacity: 0.45;
               cursor: not-allowed;
               pointer-events: none;
            }
         }
      }

      html,
      body {
         &:has(dialog.cascade-options-dialog.lockViewportScroll[open]) {
            overflow: hidden;
         }
      }
   }
</style>
