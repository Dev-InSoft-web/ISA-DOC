<script lang="ts" generics="TState extends object = Record<string, unknown>">
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import CardHollow from "../preview/CardHollow.svelte";
   import InputDecorated from "../preview/InputDecorated.svelte";
   import PaletteGrid from "../controls/PaletteGrid.svelte";
   import SwitchDemo from "../controls/SwitchDemo.svelte";
   import Icons from "../icons/Icons.svelte";
   import { colorOptions, columnsGridPlayground, iconEnum, optionsToItems } from "../Utils";
   import type { TDemoField } from "./DemoController";

   type TAnyState = Record<string, unknown>;

   export let fields: TDemoField<TState>[] | unknown[];
   export let state: TState;

   $: typedFields = orderFields(fields as TDemoField<TAnyState>[]);

   function orderFields(arr: TDemoField<TAnyState>[]): TDemoField<TAnyState>[] {
      const states: TDemoField<TAnyState>[] = [];
      const rest: TDemoField<TAnyState>[] = [];
      for (const f of arr) {
         if (f.kind === "switch" || f.kind === "switch-group") states.push(f);
         else rest.push(f);
      }
      return [...states, ...rest];
   }

   const fieldId = (f: TDemoField<TAnyState>): string => {
      if (f.kind === "switch-group" || f.kind === "icon-text") return `${f.kind}-${f.key}`;
      return `${f.kind}-${String(f.key)}`;
   };

   function withNoneOption(options: unknown): { label: string; value: unknown }[] {
      const items = optionsToItems(options as any);
      const hasNone = items.some(([, v]) => v === "" || v === null || v === undefined);
      const mapped = items.map(([label, value]) => ({ label, value }));
      return hasNone ? mapped : [{ label: "", value: "" }, ...mapped];
   }
</script>

{#each typedFields as field (fieldId(field))}
   {#if field.kind === "palette"}
      <CardHollow>
         <PaletteGrid
            label={field.label}
            labelIcon={field.labelIcon}
            bind:value={(state as TAnyState)[field.key as string] as string | undefined}
            options={withNoneOption(field.options)}
            name={field.name ?? `pg-${String(field.key)}`}
            columns={field.columns ?? columnsGridPlayground}
            accent={field.accent ?? "primary"}
            layout={field.layout ?? "default"}
            getIcon={field.getIcon as ((val: unknown) => string) | undefined}
         />
      </CardHollow>
   {:else if field.kind === "color"}
      <CardHollow>
         <PaletteGrid
            label={field.label}
            labelIcon={field.labelIcon}
            bind:value={(state as TAnyState)[field.key as string] as string | undefined}
            options={colorOptions}
            name={`pg-${String(field.key)}`}
            columns={field.columns ?? columnsGridPlayground}
         />
      </CardHollow>
   {:else if field.kind === "switch"}
      <CardHollow>
         <InputDecorated icon={field.labelIcon ?? "mdi:tune"} label="Estado">
            <GridLayout cells="1" justify="start">
               <SwitchDemo small bind:checked={(state as TAnyState)[field.key as string] as boolean | null | undefined}>{field.label}</SwitchDemo>
            </GridLayout>
         </InputDecorated>
      </CardHollow>
   {:else if field.kind === "switch-group"}
      <CardHollow>
         <InputDecorated icon={field.labelIcon} label={field.label}>
            <GridLayout cells={String(field.switches.length)} justify="start">
               {#each field.switches as sw (String(sw.key))}
                  <SwitchDemo small bind:checked={(state as TAnyState)[sw.key as string] as boolean | null | undefined}>{sw.label}</SwitchDemo>
               {/each}
            </GridLayout>
         </InputDecorated>
      </CardHollow>
   {:else if field.kind === "select-enum"}
      <CardHollow>
         <InputDecorated
            type="select-enum"
            icon={field.labelIcon}
            label={field.label}
            options={field.enumValue}
            bind:value={(state as TAnyState)[field.key as string]}
         />
      </CardHollow>
   {:else if field.kind === "select-enum-row"}
      <CardHollow>
         <InputDecorated icon={field.labelIcon} label={field.label ?? ""}>
            <GridLayout cells={String(field.selects.length)} gap="0.5rem">
               {#each field.selects as sel (String(sel.key))}
                  <InputDecorated
                     type="select-enum"
                     icon={sel.labelIcon}
                     label={sel.label}
                     options={sel.enumValue}
                     bind:value={(state as TAnyState)[sel.key as string]}
                  />
               {/each}
            </GridLayout>
         </InputDecorated>
      </CardHollow>
   {:else if field.kind === "text"}
      <CardHollow>
         {#if field.normalize}
            {@const normalize = field.normalize}
            {@const fkey = field.key as string}
            <InputDecorated icon={field.labelIcon} label={field.label}>
               <input
                  type="text"
                  class="input-decorated-number"
                  placeholder={field.placeholder}
                  value={String((state as TAnyState)[fkey] ?? "")}
                  on:input={(e) => ((state as TAnyState)[fkey] = (e.currentTarget as HTMLInputElement).value)}
                  on:blur={(e) => {
                     const next = normalize((e.currentTarget as HTMLInputElement).value);
                     (e.currentTarget as HTMLInputElement).value = next;
                     (state as TAnyState)[fkey] = next === "" ? undefined : next;
                  }}
                  style:width="100%"
                  style:box-sizing="border-box"
                  style:min-width="0"
                  style:background-color="rgba(128, 128, 128, 0.1)"
                  style:border="1px solid rgba(128, 128, 128, 0.2)"
                  style:color="inherit"
                  style:padding="0.5rem"
               />
            </InputDecorated>
         {:else}
            <InputDecorated
               type="text"
               icon={field.labelIcon}
               label={field.label}
               placeholder={field.placeholder}
               bind:value={(state as TAnyState)[field.key as string]}
            />
         {/if}
      </CardHollow>
   {:else if field.kind === "number"}
      <CardHollow>
         <InputDecorated
            type="number"
            icon={field.labelIcon}
            label={field.label}
            min={field.min}
            max={field.max}
            step={field.step}
            bind:value={(state as TAnyState)[field.key as string]}
         />
      </CardHollow>
   {:else if field.kind === "range"}
      <CardHollow>
         <InputDecorated
            type="range"
            icon={field.labelIcon}
            label={field.label}
            min={field.min}
            max={field.max}
            step={field.step}
            bind:value={(state as TAnyState)[field.key as string]}
         />
      </CardHollow>
   {:else if field.kind === "icon-text"}
      <CardHollow>
         <Icons
            headerIcon={field.labelIcon}
            label={field.label}
            bind:icon={(state as TAnyState)[field.iconKey as string] as string}
            bind:text={(state as TAnyState)[field.textKey as string] as string | undefined}
            enumValue={iconEnum}
            color={field.color ?? "primary"}
         />
      </CardHollow>
   {/if}
{/each}
