<script lang="ts">
   import { type ComponentColor } from "$lib/UlConst";
   import CheckboxIcon from "$lib/primitives/iconized/CheckboxIcon.svelte";
   import Card from "$lib/containers/Card.svelte";
   import { LayoutHelpers, type BreakpointSize } from "$lib/containers/layout/BlockLayout.svelte";
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import Text from "$lib/primitives/typography/Text.svelte";
   import { colorIcons, colorOptions, columnsConfig, optionsToItems, playgroundPaletteTrueColor } from "../Utils";

   export let value: string | undefined = undefined;
   export let label: string = "";
   export let labelIcon: IconifyProps["icon"] | undefined = undefined;
   export let options: any[] | Record<string, any> = colorOptions;
   export let name: string = "";
   export let columns: number | ((size: BreakpointSize) => number) | undefined = undefined;
   export let accent: "semantic" | "primary" = "semantic";
   export let colorFalse: ComponentColor = "neutral";
   export let getIcon: (val: unknown) => IconifyProps["icon"] = (val) => colorIcons[String(val ?? "")] ?? ("mdi:block-helper" as IconifyProps["icon"]);
   export let showItemIcons: boolean = true;
   export let layout: "default" | "sideCross" = "default";
   export let emptyValueAlias: unknown = undefined;

   const fallbackName = `pg-palette-${Math.random().toString(36).slice(2, 11)}`;
   const SIDE_CROSS_SLOT_VALUES: (string | null)[] = [null, "top", null, "left", "", "right", null, "bottom", null];

   let gridHostWidth = 0;

   $: groupName = name?.trim() ? name.trim() : fallbackName;
   $: items = optionsToItems(options);
   $: gridSize = LayoutHelpers.getBreakPoint(gridHostWidth || 0);
   $: gridCells = String(typeof columns === "function" ? columns(gridSize) : typeof columns === "number" ? columns : columnsConfig(items.length || 1, gridSize));

   function pairForSideCrossSlot(slotVal: string | null): [string, any] | undefined {
      if (slotVal === null || slotVal === undefined) return undefined;
      return items.find(([, v]) => String(v ?? "") === slotVal);
   }

   function sideCrossCheckboxStyle(slotVal: string): string {
      const base = "display: flex; justify-content: center; align-items: center; flex-wrap: nowrap; gap: 0.5rem; width: 100%;";
      let dir: string;
      switch (slotVal) {
         case "bottom":
            dir = "column-reverse";
            break;
         case "right":
            dir = "row-reverse";
            break;
         case "top":
            dir = "column";
            break;
         case "left":
         case "":
         default:
            dir = "row";
            break;
      }
      return `${base} flex-direction: ${dir}; white-space: nowrap;`;
   }

   function trueColorFor(val: unknown): ComponentColor {
      const effective = (val === "" || val === null || val === undefined) && emptyValueAlias !== undefined ? emptyValueAlias : val;
      if (effective === "" || effective === null || effective === undefined) return "primary";
      if (accent === "primary") return "primary";
      return playgroundPaletteTrueColor(effective) as ComponentColor;
   }

   function rowLabel(labelKey: string, val: unknown): string {
      if (labelKey?.trim()) return labelKey;
      if (val !== null && val !== undefined && String(val) !== "") return String(val);
      return "Ninguno";
   }

   function isSelected(val: unknown): boolean {
      return String(value ?? "") === String(val ?? "");
   }

   function iconFor(val: unknown): IconifyProps["icon"] {
      const s = String(val ?? "");
      if (s === "") return "mdi:block-helper" as IconifyProps["icon"];
      return getIcon(val);
   }

   function pick(val: unknown) {
      const s = String(val ?? "");
      value = s === "" ? undefined : s;
   }

   function consumePaletteCheckboxPointer(e: Event) {
      e.preventDefault();
      e.stopPropagation();
   }

   function consumePaletteCheckboxKey(e: Event) {
      const ke = e as KeyboardEvent;
      if (ke.key === " " || ke.key === "Enter") {
         ke.preventDefault();
         ke.stopPropagation();
      }
   }
</script>

<div class="is-input-decorated palette-grid">
   {#if label}
      <div class="palette-grid__label is-input-decorated-label">
         <Text color="neutral" style="max-width: 100%; width: fit-content;">
            <FlexLayout inline items="center" style="max-width: 100%;">
               {#if labelIcon}
                  <Iconify icon={labelIcon} class="palette-grid__label-icon" />
               {/if}
               {label}
            </FlexLayout>
         </Text>
      </div>
   {/if}
   <div class="is-input-decorated-body">
      {#if layout === "sideCross"}
         <div class="palette-grid__spatial">
            {#each SIDE_CROSS_SLOT_VALUES as slotVal}
               <FlexLayout justify="center" items="center" class={`palette-grid__spatial-cell${slotVal === null ? " palette-grid__spatial-cell--empty" : ""}`} style="min-width: 0;">
                  {#if slotVal !== null}
                     {@const pair = pairForSideCrossSlot(slotVal)}
                     {#if pair}
                        {@const [labelKey, val] = pair}
                        {@const selected = isSelected(val)}
                        {@const lbl = rowLabel(labelKey, val)}
                        <div
                           class="palette-grid__item"
                           role="button"
                           tabindex="0"
                           on:mousedown={(e) => {
                              e.preventDefault();
                              pick(val);
                           }}
                           on:click={(e) => {
                              e.preventDefault();
                              pick(val);
                           }}
                           on:keydown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                 e.preventDefault();
                                 pick(val);
                              }
                           }}
                        >
                           {#key `${groupName}-${String(val ?? "")}`}
                              <Card variant="flat" class="palette-grid__sidecross-card" style="padding: 0.4rem 0.55rem; width: 100%; box-sizing: border-box;">
                                 {#key `${value}::${String(val ?? "")}`}
                                    {#if showItemIcons}
                                       <CheckboxIcon title={selected ? `✓ ${lbl}` : lbl} style={sideCrossCheckboxStyle(slotVal)} name={groupName} checked={selected} color={trueColorFor(val)} {colorFalse} on:click={consumePaletteCheckboxPointer} on:keydown={consumePaletteCheckboxKey}>
                                          <Iconify slot="iconTrue" icon={iconFor(val)} />
                                          <Iconify slot="iconFalse" icon={iconFor(val)} />
                                          {lbl}
                                       </CheckboxIcon>
                                    {:else}
                                       <CheckboxIcon title={selected ? `✓ ${lbl}` : lbl} style={sideCrossCheckboxStyle(slotVal)} name={groupName} checked={selected} color={trueColorFor(val)} {colorFalse} on:click={consumePaletteCheckboxPointer} on:keydown={consumePaletteCheckboxKey}>
                                          {lbl}
                                       </CheckboxIcon>
                                    {/if}
                                 {/key}
                              </Card>
                           {/key}
                        </div>
                     {/if}
                  {/if}
               </FlexLayout>
            {/each}
         </div>
      {:else}
         <div bind:clientWidth={gridHostWidth} style="width: 100%;">
            <GridLayout cells={gridCells} justify="start" style="width: 100%;">
            {#each items as [labelKey, val]}
               {@const selected = String(value ?? "") === String(val ?? "")}
               {@const lbl = rowLabel(labelKey, val)}
               <div
                  class="palette-grid__item"
                  role="button"
                  tabindex="0"
                  on:mousedown={(e) => {
                     e.preventDefault();
                     pick(val);
                  }}
                  on:click={(e) => {
                     e.preventDefault();
                     pick(val);
                  }}
                  on:keydown={(e) => {
                     if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        pick(val);
                     }
                  }}
               >
                  {#key `${groupName}-${String(value ?? "")}-${String(val ?? "")}`}
                     {#if showItemIcons}
                        <CheckboxIcon title={selected ? `✓ ${lbl}` : lbl} style="white-space: nowrap;" name={groupName} checked={selected} color={trueColorFor(val)} {colorFalse} on:click={consumePaletteCheckboxPointer} on:keydown={consumePaletteCheckboxKey}>
                           <Iconify slot="iconTrue" icon={iconFor(val)} />
                           <Iconify slot="iconFalse" icon={iconFor(val)} />
                           {lbl}
                        </CheckboxIcon>
                     {:else}
                        <CheckboxIcon title={selected ? `✓ ${lbl}` : lbl} style="white-space: nowrap;" name={groupName} checked={selected} color={trueColorFor(val)} {colorFalse} on:click={consumePaletteCheckboxPointer} on:keydown={consumePaletteCheckboxKey}>
                           {lbl}
                        </CheckboxIcon>
                     {/if}
                  {/key}
               </div>
            {/each}
            </GridLayout>
         </div>
      {/if}
   </div>
</div>

<style>
   .palette-grid__label {
      margin-bottom: 1rem;
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;

      padding: 0.35rem 0 0.5rem 0;
      border: none;
      border-bottom: 1px solid rgba(128, 128, 128, 0.1);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.85;
   }

   .palette-grid__label :global(.palette-grid__label-icon) {
      flex-shrink: 0;
      font-size: 1.2em;
      opacity: 0.92;
   }

   .palette-grid__item {
      cursor: pointer;
      width: 100%;
   }

   .palette-grid__spatial {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-template-rows: repeat(3, minmax(2.25rem, auto));
      gap: 0.75rem;
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      justify-items: stretch;
      align-items: center;
   }

   :global(.palette-grid__spatial-cell) {
      min-width: 0;
   }

   :global(.palette-grid__spatial-cell--empty) {
      pointer-events: none;
   }

   :global(.palette-grid__sidecross-card) {
      min-width: 0;
   }
</style>
