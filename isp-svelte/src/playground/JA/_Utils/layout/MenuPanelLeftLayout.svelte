<script lang="ts" context="module">
   import { writable } from "svelte/store";
   export type SidebarCollapsedStore = ReturnType<typeof writable<boolean>>;
</script>

<script lang="ts">
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import Button from "$lib/primitives/iconized/Button.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import { setContext } from "svelte";

   export let open = true;
   export let sidebarWidth = "260px";
   export let sidebarRailWidth = "3.25rem";
   export let title: string = "";
   export let sidebarTitle: string = "";

   const collapsedStore: SidebarCollapsedStore = writable(!open);
   setContext("sidebar:collapsed", collapsedStore);

   $: collapsedStore.set(!open);

   function toggle(): void {
      open = !open;
   }

   $: cssVars = `--mpl-sidebar-width: ${open ? sidebarWidth : sidebarRailWidth};`;
</script>

<svelte:head>
   <style>
      html,
      body {
         overflow: hidden !important;
         height: 100vh;
         margin: 0;
      }
   </style>
</svelte:head>

<div class="menu-panel-left-layout" class:is-collapsed={!open} style={cssVars}>
   <aside class="sidebar custom-scrollbar">
      <div class="sidebar-header">
         <Button variant="text" shape="rect" color="neutral" onClick={toggle} style="flex-shrink: 0; width: 100%; justify-content: {open ? 'flex-start' : 'center'};" title={sidebarTitle || title || (open ? "Compactar menú" : "Expandir menú")}>
            <Iconify slot="icon" icon={open ? "mdi:menu-open" : "mdi:menu"} />
            {#if open && (sidebarTitle || title)}
               <span class="sidebar-title">{sidebarTitle || title}</span>
            {/if}
         </Button>
      </div>
      <slot name="sidebar" />
   </aside>

   <section class="content-area">
      {#if title || $$slots["header-end"]}
         <header class="content-header">
            <FlexLayout items="center" style="padding: 0.25rem 0;">
               {#if title}
                  <span class="title">{title}</span>
               {/if}
               <span style="flex: 1;"></span>
               <slot name="header-end" />
            </FlexLayout>
         </header>
      {/if}

      <main class="content custom-scrollbar">
         <slot />
      </main>
   </section>
</div>

<style>
   .menu-panel-left-layout {
      position: fixed;
      inset: 0;
      display: grid;
      grid-template-columns: var(--mpl-sidebar-width) 1fr;
      width: 100vw;
      height: 100vh;
      font-family: Arial, Helvetica, "Segoe UI", Tahoma;
      transition: grid-template-columns 220ms ease;
   }

   .sidebar {
      border-right: 1px solid var(--is-b-color, #d4d4d4);
      overflow-x: hidden;
      overflow-y: auto;
      background: var(--is-bg-secondary, #fafafa);
      min-height: 0;
      display: flex;
      flex-direction: column;
   }

   .sidebar-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.5rem 0.25rem 0.5rem;
      box-sizing: border-box;
      width: 100%;
      position: sticky;
      top: 0;
      background: var(--is-bg-secondary, #fafafa);
      z-index: 2;
   }

   .menu-panel-left-layout.is-collapsed .sidebar-header {
      justify-content: flex-start;
   }

   .sidebar-title {
      flex: 1;
      min-width: 0;
      font-weight: 600;
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      opacity: 0.85;
   }

   .content-area {
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
      overflow: hidden;
   }

   .content-header {
      flex-shrink: 0;
      padding: 0 1.25rem;
      background: var(--is-bg-primary);
      border-bottom: 1px solid color-mix(in srgb, var(--is-b-color, #d4d4d4), transparent 40%);
   }

   .content {
      padding: 0.75rem 1.25rem 1.25rem;
      overflow: auto;
      min-height: 0;
      min-width: 0;
      flex: 1 1 auto;
   }

   .title {
      font-weight: 600;
      font-size: 1rem;
      white-space: nowrap;
   }
</style>
