<script context="module" lang="ts">
   import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
   import type { HTMLInputAttributes } from "svelte/elements";
   import type { MatrixLayoutProps } from "$lib/containers/layout/GridLayout.svelte";

   export type TInputDecoratedType = "text" | "number" | "select-enum" | "range" | "";

   export interface TInputDecoratedProps extends Omit<HTMLInputAttributes, "value" | "type" | "children" | "color"> {
      value?: unknown;
      type?: TInputDecoratedType;
      asTitle?: boolean;
      options?: unknown[] | Record<string, unknown>;
      columns?: number;
      colspan?: number;
      placeholder?: string;
      justify?: MatrixLayoutProps["justify"];
      label?: string;
      icon?: IconifyProps["icon"];
   }
</script>

<script lang="ts">
   import Input from "$lib/form/Input.svelte";
   import SelectEnum from "$lib/form/SelectEnum.svelte";
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import Text from "$lib/primitives/typography/Text.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";

   export let type: TInputDecoratedProps["type"] = "";
   export let value: unknown = undefined;
   export let label: TInputDecoratedProps["label"] = undefined;
   export let asTitle: TInputDecoratedProps["asTitle"] = undefined;
   export let placeholder: TInputDecoratedProps["placeholder"] = "";
   export let options: TInputDecoratedProps["options"] = undefined;
   export let columns: TInputDecoratedProps["columns"] = undefined;
   export let justify: TInputDecoratedProps["justify"] = undefined;
   export let colspan: TInputDecoratedProps["colspan"] = undefined;
   export let icon: TInputDecoratedProps["icon"] = undefined;

   interface $$Props extends TInputDecoratedProps {}
   interface $$Slots {
      default: Record<string, never>;
   }

   $: gridColumns = columns ?? 1;
</script>

<div class="input-decorated" style:grid-column={colspan ? `span ${colspan}` : undefined}>
   {#if label || icon}
      <div class="input-decorated-label" class:is-title={asTitle}>
         <Text color="neutral" style={asTitle ? "max-width: 100%;" : "max-width: 100%; width: fit-content;"}>
            <FlexLayout inline items="center" style={`gap: 0.5rem; max-width: 100%;${asTitle ? " width: 100%;" : ""}`}>
               {#if icon}
                  <Iconify class="input-decorated-label-icon" {icon} />
               {/if}
               {#if label}
                  <span class="input-decorated-label-text" style={asTitle ? "min-width:0;" : ""}>{@html label}</span>
               {/if}
            </FlexLayout>
         </Text>
      </div>
   {/if}

   <div class="input-decorated-body">
      <GridLayout justify={justify ?? "start"} cells={String(gridColumns)}>
         {#if type === "text"}
            <Input bind:value {...$$restProps as any} label={placeholder} />
         {:else if type === "number"}
            <input class="input-decorated-number" type="number" bind:value {...$$restProps as any} placeholder={placeholder || undefined} style:width="100%" style:box-sizing="border-box" style:min-width="0" style:background-color="rgba(128, 128, 128, 0.1)" style:border="1px solid rgba(128, 128, 128, 0.2)" style:color="inherit" style:padding="0.5rem" />
         {:else if type === "select-enum"}
            <SelectEnum {...$$restProps as any} bind:value enumValue={options as any} label={(placeholder != null && String(placeholder) !== "" ? placeholder : label) || " "} />
         {:else if type === "range"}
            <input type="range" bind:value {...$$restProps as any} style:width="100%" style={`cursor: pointer;${$$restProps.style ?? ""}`} />
         {/if}
         <slot />
      </GridLayout>
   </div>
</div>

<style>
   .input-decorated {
      box-sizing: border-box;
      max-width: 100%;
   }

   .input-decorated-label {
      width: 100%;
      max-width: 100%;
      margin-bottom: 0.85rem;
      box-sizing: border-box;
      padding: 0.2rem 0 0.55rem 0;
      border: none;
      border-bottom: 1px solid color-mix(in srgb, currentColor 12%, transparent);
   }

   .input-decorated-body {
      width: 100%;
      max-width: 100%;
   }

   :global(.input-decorated .input-decorated-label-text) {
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.85;
   }

   :global(.input-decorated .is-title .input-decorated-label-text) {
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      opacity: 1;
   }

   :global(.input-decorated .input-decorated-label-icon) {
      flex-shrink: 0;
      font-size: 1.05em;
      opacity: 0.85;
   }

   :global(.input-decorated .is-title .input-decorated-label-icon) {
      font-size: 1.2em;
      opacity: 0.95;
   }

   input.input-decorated-number:focus {
      outline: none;
      box-shadow: none;
      border: 1px solid transparent;
   }
</style>
