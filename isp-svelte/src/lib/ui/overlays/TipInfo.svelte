<script context="module" lang="ts">
   import { Card, FlexLayout, Iconify, info, Modal, resolveColor, Text, warning } from "@ingenieria_insoft/ispsveltecomponents";
   import type { HTMLAttributes } from "svelte/elements";
   import InvokedFloater from "./InvokedFloater.svelte";
   import Separator from "../primitives/Separator.svelte";

   export type TipInfoKind = "info" | "warn";
   export type TipInfoTrigger = "click" | "hover";

   export interface TipInfoProps extends HTMLAttributes<HTMLDivElement> {
      descripcion?: string;
      kind?: TipInfoKind;
      trigger?: TipInfoTrigger;
      useModal?: boolean;
   }

   export interface TipInfoSlots {
      default: Record<string, never>;
      content: Record<string, never>;
      "modal-title": Record<string, never>;
   }

   const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
   void stripHtml;
</script>

<script lang="ts">
   interface $$Props extends TipInfoProps {}
   interface $$Slots extends TipInfoSlots {}

   export let descripcion: $$Props["descripcion"] = "";
   export let kind: $$Props["kind"] = "info";
   export let trigger: $$Props["trigger"] = "click";
   export let useModal: $$Props["useModal"] = false;

   let modalOpen = false;
   let tooltipOpen = false;
   let anchorEl: HTMLElement | undefined = undefined;

   $: hasContentSlot = !!$$slots.content;
   $: hasDescriptionText = !!(descripcion && descripcion.length > 0);
   $: hasContent = hasContentSlot || hasDescriptionText;

   const self = {
      get class() {
         return [$$restProps.class, hasContent ? "switchClassCanShowTooltip" : ""].filter(Boolean).join(" ");
      },
      get style() {
         return $$restProps.style;
      },
      get resume() {
         return { ...$$restProps, class: self.class, style: self.style };
      },
      get description(): string {
         return descripcion || "";
      },
      get icon(): string {
         return kind === "warn" ? "mdi:alert-outline" : "line-md:alert-circle-loop";
      },
      iconcolor(hasC: boolean) {
         if (!hasC) return resolveColor("neutral");
         return kind === "warn" ? warning : info;
      },
      iconstyle(hasC: boolean) {
         return "color: " + self.iconcolor(hasC) + ";";
      },
      icontitle(hasC: boolean) {
         if (!hasC) return "No hay información disponible";
         return kind === "warn" ? "Advertencia" : "Información";
      },
      oniconclick(hasC: boolean) {
         if (useModal) modalOpen = true;
         void hasC;
      },
   };
</script>

{#if !hasContent}
   <slot />
{:else}
   <FlexLayout items="center" wrap={false} {...self.resume}>
      {#if $$slots.default}
         <div id="tipinfo-content">
            <slot />
         </div>
      {/if}
      <FlexLayout inline items="center" justify="center">
         {#if !useModal}
            <span
               bind:this={anchorEl}
               class="tipinfo-icon-wrap"
               on:click={() => self.oniconclick(hasContent)}
               on:keydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") self.oniconclick(hasContent);
               }}
               role="button"
               tabindex={-1}
            >
               <Iconify id="tipinfo-icon" icon={self.icon} style={self.iconstyle(hasContent)} title={self.icontitle(hasContent)} />
            </span>
            <InvokedFloater bind:open={tooltipOpen} target={anchorEl ?? null} placement="right" trigger={trigger} on:close on:cancel>
               <Card class={["blockCloseClick", "tipinfo-tooltip-card", hasContentSlot ? "" : "tipinfo-tooltip-card-text"].filter(Boolean).join(" ")}>
                  <FlexLayout direction="column" class="tipinfo-tooltip-layout">
                     <FlexLayout items="center" wrap={false} class="tipinfo-tooltip-header">
                        <Iconify icon={self.icon} style={self.iconstyle(hasContent)} />
                        <slot name="modal-title">
                           <Text color={kind === "warn" ? "warning" : "info"}>{kind === "warn" ? "Advertencia" : "Información"}</Text>
                        </slot>
                     </FlexLayout>
                     <Separator startMargin="0.25rem" endMargin="0.25rem" />
                     <small class="tipinfo-tooltip-body">
                        <slot name="content">
                           {@html self.description}
                        </slot>
                     </small>
                  </FlexLayout>
               </Card>
            </InvokedFloater>
         {:else}
            <span
               class="tipinfo-icon-wrap"
               on:click={() => self.oniconclick(hasContent)}
               on:keydown={(e) => {
                  if (e.key === "Enter" || e.key === " ") self.oniconclick(hasContent);
               }}
               role="button"
               tabindex={0}
            >
               <Iconify id="tipinfo-icon" icon={self.icon} style={self.iconstyle(hasContent)} title={self.icontitle(hasContent)} />
            </span>
         {/if}
      </FlexLayout>
   </FlexLayout>

   {#if useModal}
      <Modal bind:bshow={modalOpen} variant="flat" on:close on:cancel>
         <Text slot="title" style="display: flex; align-items: center; gap: 0.5rem;">
            <Iconify icon={self.icon} style={self.iconstyle(hasContent)} />
            <slot name="modal-title">
               <Text color={kind === "warn" ? "warning" : "info"}>{kind === "warn" ? "Advertencia" : "Información"}</Text>
            </slot>
         </Text>
         <div id="tipinfo-modal-body">
            <slot name="content">
               {@html self.description}
            </slot>
         </div>
      </Modal>
   {/if}
{/if}

<style>
   :global {
      #tipinfo-content {
         flex: 1;
         min-width: 0;
      }

      #tipinfo-icon {
         font-size: 1.125em;
      }

      #tipinfo-modal-body {
         max-width: 60ch;
         line-height: 1.5;
         padding: 0.5rem;
      }

      .tipinfo-icon-wrap {
         display: inline-flex;
         align-items: center;
         justify-content: center;
         line-height: 0;
         cursor: pointer;
      }

      .switchClassCanShowTooltip {
         cursor: pointer;
      }

      .tipinfo-tooltip-card-text {
         max-width: 32ch;
         padding: 0.5rem 0.75rem;
         line-height: 1.4;
         font-size: 0.875rem;
         white-space: normal;
         word-wrap: break-word;
      }

      .tipinfo-tooltip-header {
         gap: 0.5rem;
      }

      .tipinfo-tooltip-body {
         display: block;
         white-space: normal;
         word-wrap: break-word;
         line-height: 1.4;
      }
   }
</style>
