<script context="module" lang="ts">
   import { Button, ButtonIconify, Card, FlexLayout, Iconify, Text, type ButtonProps, type DialogProps } from "@ingenieria_insoft/ispsveltecomponents";
   import InvokedFloater from "../overlays/InvokedFloater.svelte";
   import Separator from "../primitives/Separator.svelte";
   import type { ButtonOptionProps } from "./_ButtonOption.svelte";
   import type { FlexOptionsAction as CascadeOptionsAction, FlexOptionsInput as CascadeOptionsInput } from "./FlexOptions.svelte";
   import { cubicOut } from "svelte/easing";
   import { scale } from "svelte/transition";

   export interface CascadeOptionsProps extends DialogProps {
      actions?: CascadeOptionsInput[];
      disabled?: boolean;
      panelClass?: string;
   }

   export interface CascadeOptionsSlots {
      default: { open: boolean };
      childrens: { open: boolean };
   }
</script>

<script lang="ts">
   type $$Props = CascadeOptionsProps;
   interface $$Slots extends CascadeOptionsSlots {}

   export let actions: $$Props["actions"] = [];
   export let open: $$Props["open"] = false;
   export let disabled: $$Props["disabled"] = false;
   export let panelClass: $$Props["panelClass"] = "";

   let anchorEl: HTMLElement | undefined = undefined;

   const self = {
      infercascadeseparators(input: CascadeOptionsInput[]) {
         const out: CascadeOptionsAction[] = [];
         for (const group of input) {
            if (!group) continue;
            const itemslist = Array.isArray(group) ? group : [group];
            const validItems: CascadeOptionsAction[] = [];
            for (const item of itemslist) {
               if (item) validItems.push(item);
            }
            if (validItems.length === 0) continue;
            if (out.length > 0) out.push({ separator: true } as CascadeOptionsAction);
            out.push(...validItems);
         }
         return out;
      },
      get isopen() {
         return !!open;
      },
      get itemscount() {
         return normalizedItems?.length ?? 0;
      },
      get empty() {
         return !(normalizedItems && normalizedItems.length > 0);
      },
      get blocked() {
         return disabled || self.empty;
      },
      anchor: {
         get class() {
            return ["wrap", "anchor", self.blocked ? "anchor--disabled" : ""].filter(Boolean).join(" ");
         },
      },
      floater: {
         get class() {
            return ["cascade-options-dialog", $$restProps.class].filter(Boolean).join(" ");
         },
         get resume() {
            const rest = { ...$$restProps } as Record<string, unknown>;
            delete rest.open;
            return rest;
         },
      },
      panel: {
         get style() {
            return ["padding: 0", "min-width: 10em", "max-width: min(22em, 90dvw)", "max-height: min(80dvh, 600px)", "overflow-y: auto"].join("; ");
         },
      },
      openmenu() {
         if (self.blocked) return;
         open = true;
      },
      onanchorclick(e: MouseEvent) {
         e.preventDefault();
         e.stopPropagation();
         if (!self.blocked) self.openmenu();
      },
      onanchorkeydown(e: KeyboardEvent) {
         e.stopPropagation();
         if (!(e.target instanceof HTMLElement)) return;
         if (!e.target.closest("button")) return;
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
      getmenuitemonclick(itemonclick: ButtonProps["onClick"]) {
         return (event: MouseEvent) => self.oncascademenuitemclick(event, itemonclick);
      },
   };

   $: normalizedItems = self.infercascadeseparators(actions ?? []);
   $: if (disabled && !!open) open = false;
</script>

<FlexLayout class="cascade-options" inline items="center" style="vertical-align: middle">
   <FlexLayout class={self.anchor.class} inline items="center" role="presentation">
      <span bind:this={anchorEl}>
         <Button variant="text" shape="rect" style="padding: 0;" onkeydown={self.onanchorkeydown} on:click={self.onanchorclick}>
            <slot open={self.isopen}>
               <ButtonIconify icon="mdi:dots-vertical" title="Más opciones" disabled={self.blocked} />
            </slot>
         </Button>
      </span>
   </FlexLayout>

   <InvokedFloater {...self.floater.resume} class={self.floater.class} bind:open target={anchorEl ?? null} placement="bottom-start" offset={2} avoidAnchor={false} on:close on:cancel>
      <div class="cascade-options-zoom-wrap" style="transform-origin: left top" transition:scale={{ start: 0.88, duration: 120, easing: cubicOut }}>
         <Card class={["cascade-options-panel", "blockCloseClick", panelClass].filter(Boolean).join(" ")} role="menu" style={self.panel.style}>
            <FlexLayout direction="column" gap="0">
               {#each normalizedItems as item}
                  {#if "separator" in item && item.separator}
                     <Separator startMargin="0.25rem" endMargin="0.25rem" />
                  {:else}
                     {@const action = item as ButtonOptionProps}
                     {@const { onClick: itemOnClick, ...rest } = action}
                     <ButtonIconify role="menuitem" {...rest} shape="rect" disabled={disabled ? true : action.disabled} class={action.class || ""} style={["justify-content: start", "width: 100%", action.style].filter(Boolean).join("; ")} on:click={self.getmenuitemonclick(itemOnClick)}>
                        {#if action.label}
                           {#if action.icon}
                              <Iconify icon={action.icon} />
                           {/if}
                           {action.label}
                        {/if}
                     </ButtonIconify>
                  {/if}
               {/each}
               {#if self.itemscount === 0}
                  <FlexLayout inline items="center" justify="center" style="text-align: center; width: 100%">
                     <Iconify icon="mdi:inbox-outline" style="font-size: 1.1em; flex-shrink: 0" />
                     <Text color="neutral">Sin acciones</Text>
                  </FlexLayout>
               {/if}
               <slot name="childrens" open={self.isopen} />
            </FlexLayout>
         </Card>
      </div>
   </InvokedFloater>
</FlexLayout>

<style>
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
   }
</style>
