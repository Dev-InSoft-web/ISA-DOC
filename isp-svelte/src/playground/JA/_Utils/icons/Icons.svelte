<script lang="ts">
   import SelectEnum from "$lib/form/SelectEnum.svelte";
   import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
   import { Input } from "$lib";
   import InputDecorated from "../preview/InputDecorated.svelte";
   import { iconEnum } from "../Utils";

   export let label = "Cabecera";
   export let headerIcon: IconifyProps["icon"] | undefined = "mdi:form-select";
   export let icon = "";
   export let text: string | undefined = undefined;
   export let labelText = "Texto";
   export let labelIcon = "Ícono";
   export let textFirst = false;
   export let bNoIcon = false;
   export let enumValue: any = undefined;
   export let columns: any = undefined;
   export let colspan: number | undefined = undefined;
   export let color: any = undefined;
   export let disabled = false;

   $: resColumns = columns ?? ((text !== null && text !== undefined ? 1 : 0) + +!bNoIcon || 1);

   $: readonly = disabled;
</script>

<InputDecorated {label} icon={headerIcon} columns={resColumns} {colspan}>
   {#if $$slots.prefix}
      <div style="grid-column: 1 / -1;">
         <slot name="prefix" />
      </div>
   {/if}
   {#if textFirst && text !== null && text !== undefined}
      <Input label={labelText} bind:value={text} {color} {readonly} style="width: 100%;" />
   {/if}
   {#if !bNoIcon}
      <InputDecorated>
         <div class="iconify-select-wrapper">
            <SelectEnum bind:value={icon} enumValue={enumValue ?? iconEnum} label={labelIcon} {readonly} />
         </div>
      </InputDecorated>
   {/if}
   {#if !textFirst && text !== null && text !== undefined}
      <Input label={labelText} bind:value={text} {color} {readonly} style="width: 100%;" />
   {/if}
</InputDecorated>
