<script lang="ts">
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import Button from "$lib/primitives/iconized/Button.svelte";
   import Iconify from "$lib/primitives/Iconify.svelte";
   import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
   import Text from "$lib/primitives/typography/Text.svelte";
   import type { SvelteComponent } from "svelte";
   import { onDestroy, onMount, setContext } from "svelte";
   import { writable } from "svelte/store";
   import MenuPanelLeftLayout from "./_Utils/layout/MenuPanelLeftLayout.svelte";
   import SidebarSection from "./_Utils/layout/SidebarSection.svelte";
   import DarkToggle from "./_Utils/controls/DarkToggle.svelte";
   import { statusDotFor, statusDotsFor } from "./_Utils/demoStatus";
   import JAHome from "./JAHome.svelte";

   type DemoComp = typeof SvelteComponent<any, any, any>;

   const forceOpenStore = writable<boolean>(false);
   setContext("demos:forceOpen", forceOpenStore);

   const componentSourcePathStore = writable<string | undefined>(undefined);
   setContext("demos:componentSourcePath", componentSourcePathStore);

   type OpenAllSignal = { tick: number; value: boolean } | null;
   const openAllSignalStore = writable<OpenAllSignal>(null);
   setContext("demos:openAllSignal", openAllSignalStore);
   let openAllTick = 0;
   function setAllOpen(value: boolean): void {
      openAllTick += 1;
      openAllSignalStore.set({ tick: openAllTick, value });
   }
   function setAllSidebarSections(value: boolean): void {
      const next: Record<string, boolean> = {};
      categorias.forEach((c) => { next[c] = value; });
      sectionOpen = next;
   }

   const PREVIEW_STICKY_LS = "AccordeonDemo:previewSticky";
   const previewStickyInit = ((): boolean => {
      try {
         const v = typeof localStorage !== "undefined" ? localStorage.getItem(PREVIEW_STICKY_LS) : null;
         return v !== "0";
      } catch { return true; }
   })();
   const previewStickyStore = writable<boolean>(previewStickyInit);
   setContext("demos:previewSticky", previewStickyStore);
   previewStickyStore.subscribe((v) => {
      try { if (typeof localStorage !== "undefined") localStorage.setItem(PREVIEW_STICKY_LS, v ? "1" : "0"); } catch { /* ignore */ }
   });

   const openRegistryMap = new Map<symbol, boolean>();
   const openRegistryStore = writable({ total: 0, opened: 0 });
   function recomputeRegistry(): void {
      let opened = 0;
      openRegistryMap.forEach((v) => { if (v) opened += 1; });
      openRegistryStore.set({ total: openRegistryMap.size, opened });
   }
   setContext("demos:openRegistry", {
      register: (id: symbol, open: boolean) => { openRegistryMap.set(id, open); recomputeRegistry(); },
      unregister: (id: symbol) => { openRegistryMap.delete(id); recomputeRegistry(); },
   });
   $: contentTotal = $openRegistryStore.total;
   $: contentOpened = $openRegistryStore.opened;
   $: contentExpandDisabled = contentTotal === 0 || contentOpened === contentTotal;
   $: contentCollapseDisabled = contentTotal === 0 || contentOpened === 0;
   $: sidebarOpenedCount = categorias.reduce((acc, c) => acc + (sectionOpen[c] ? 1 : 0), 0);
   $: sidebarExpandDisabled = categorias.length === 0 || sidebarOpenedCount === categorias.length;
   $: sidebarCollapseDisabled = categorias.length === 0 || sidebarOpenedCount === 0;

   const categoriaDescripciones: Record<string, string> = {
      Containers: "Superficies para agrupar contenido con relieve, borde y sombra (Card y similares).",
      Iconized: "Controles compactos con icono: botones, casillas e interruptores que combinan acción y feedback visual.",
      Layouts: "Organización de la interfaz: BlockLayout (responsive), FlexLayout y GridLayout.",
      Overlays: "Capas sobre el contenido: diálogos modales, cajones de acción e indicadores de carga sin perder el contexto.",
      Primitives: "Átomos visuales reutilizados por el resto de componentes: badges, iconografía e indicadores de carga.",
      Typography: "Jerarquía y contenido textual: párrafos con color y truncado, encabezados H1–H6.",
   };

   const modules = import.meta.glob<{ default: DemoComp }>("./**/Demo*.svelte", { eager: true });

   type DemoEntry = {
      categoria: string;
      slug: string;
      label: string;
      displayLabel: string;
      path: string;
      Component: DemoComp;
   };

   function stripCategoryPrefix(label: string, categoria: string): string {
      const prefix = categoria.endsWith("s") ? categoria.slice(0, -1) : categoria;
      if (prefix && label.length > prefix.length && label.toLowerCase().startsWith(prefix.toLowerCase())) {
         return label.slice(prefix.length);
      }
      return label;
   }

   const items: ReadonlyArray<DemoEntry> = Object.entries(modules)
      .filter(([path]) => !path.includes("/_Utils/"))
      .map(([path, mod]) => {
         const parts = path.split("/");
         const file = parts[parts.length - 1].replace(/\.svelte$/, "");
         const categoria = parts[parts.length - 2];
         const label = file.replace(/^Demo/, "");
         const displayLabel = stripCategoryPrefix(label, categoria);
         const slug = label.toLowerCase();
         return { categoria, slug, label, displayLabel, path, Component: mod.default };
      })
      .sort((a, b) => (a.categoria === b.categoria ? a.label.localeCompare(b.label) : a.categoria.localeCompare(b.categoria)));

   const categorias: ReadonlyArray<string> = Array.from(new Set(items.map((i) => i.categoria))).sort();

   const categoriaIconos: Record<string, IconifyProps["icon"]> = {
      Primitives: "mdi:atom",
      Typography: "mdi:format-text",
      Iconized: "mdi:gesture-tap-button",
      Containers: "mdi:package-variant-closed",
      Layouts: "mdi:view-grid-outline",
      Overlays: "mdi:layers-outline",
   };

   function categoriaIcono(cat: string): IconifyProps["icon"] {
      return categoriaIconos[cat] ?? "mdi:folder-outline";
   }

   const demoIconos: Record<string, IconifyProps["icon"]> = {
      Button: "mdi:gesture-tap-button",
      IconButton: "mdi:button-pointer",
      Switch: "mdi:toggle-switch-outline",
      CheckboxIcon: "mdi:check-bold",
      BlockLayout: "mdi:rectangle-outline",
      Card: "mdi:card-outline",
      FlexLayout: "mdi:view-week-outline",
      GridLayout: "mdi:grid",
      OverlayActionDrawer: "mdi:dock-right",
      OverlayLoading: "mdi:loading",
      OverlayModal: "mdi:application-outline",
      Headings: "mdi:format-header-pound",
      Iconify: "mdi:emoticon-outline",
      Text: "mdi:format-text",
      Badge: "mdi:label-outline",
   };

   function demoIcono(label: string): IconifyProps["icon"] {
      return demoIconos[label] ?? "mdi:circle-small";
   }

   let route: { categoria: string | null; slug: string | null } = {
      categoria: null,
      slug: null,
   };
   let sidebarOpen = true;
   let sectionOpen: Record<string, boolean> = {};
   let prefsLoaded = false;

   const LS_SIDEBAR = "ja:sidebarOpen";

   function loadPrefs(): void {
      try {
         const s = localStorage.getItem(LS_SIDEBAR);
         if (s !== null) sidebarOpen = s === "1";
         localStorage.removeItem("ja:sectionOpen");
      } catch {}
      prefsLoaded = true;
   }

   function parseHash(): void {
      const raw = typeof location === "undefined" ? "" : location.hash.replace(/^#\/?/, "").trim();
      if (!raw) {
         route = { categoria: null, slug: null };
         return;
      }
      const [cat, slug] = raw.split("/").map((p) => decodeURIComponent(p));
      route = { categoria: cat ?? null, slug: slug ?? null };
   }

   function go(href: string): void {
      location.hash = href;
   }

   onMount(() => {
      loadPrefs();
      parseHash();
      window.addEventListener("hashchange", parseHash);
   });
   onDestroy(() => {
      if (typeof window !== "undefined") window.removeEventListener("hashchange", parseHash);
   });

   $: enRuta = route.categoria !== null;
   $: esCatalogo = route.categoria === "root";
   $: esGrupo = enRuta && !esCatalogo && !route.slug && !!route.categoria;
   $: showOpenAllTools = esCatalogo || esGrupo;
   $: grupoDescripcion = esGrupo && route.categoria ? categoriaDescripciones[route.categoria] ?? "" : "";
   $: itemsFiltrados = (() => {
      if (!route.categoria || esCatalogo) return [];
      const porCat = items.filter((i) => i.categoria === route.categoria);
      if (!route.slug) return porCat;
      return porCat.filter((i) => i.slug === route.slug);
   })();
   $: currentEntry = route.slug ? items.find((i) => i.categoria === route.categoria && i.slug === route.slug) : undefined;
   $: tituloRuta = !route.categoria ? "" : esCatalogo ? "Catálogo" : !route.slug ? route.categoria : `${route.categoria} / ${currentEntry?.displayLabel ?? route.slug}`;
   $: pageTitle = tituloRuta ? `${tituloRuta} · ISP Svelte Components` : "ISP Svelte Components — Catálogo y playground";
   $: pageDescription = currentEntry
      ? `Demo del componente ${currentEntry.displayLabel} (${currentEntry.categoria}) en ISP Svelte Components.`
      : esCatalogo
        ? "Catálogo de componentes Svelte: primitivas, tipografía, iconized, contenedores, layouts y overlays."
        : route.categoria
          ? `Componentes de la categoría ${route.categoria} en ISP Svelte Components.`
          : "Catálogo y playground interactivo de @ingenieria_insoft/ispsveltecomponents.";
   $: vscodeUrl = $componentSourcePathStore ? `vscode://file/${__APP_ROOT__}/${$componentSourcePathStore}` : "";
   $: forceOpenStore.set(!!route.slug);
   $: {
      const next: Record<string, boolean> = {};
      categorias.forEach((c) => {
         next[c] = esCatalogo || c === route.categoria;
      });
      sectionOpen = next;
   }
   $: if (prefsLoaded && typeof localStorage !== "undefined") {
      try {
         localStorage.setItem(LS_SIDEBAR, sidebarOpen ? "1" : "0");
      } catch {}
   }
</script>

<svelte:head>
   <title>{pageTitle}</title>
   <meta name="description" content={pageDescription} />
   <link rel="icon" type="image/jpeg" href="https://i.ibb.co/fVSYtgsT/images.jpg" />
   <meta property="og:title" content={pageTitle} />
   <meta property="og:description" content={pageDescription} />
   <meta property="og:image" content="https://i.ibb.co/fVSYtgsT/images.jpg" />
   <meta name="twitter:title" content={pageTitle} />
   <meta name="twitter:description" content={pageDescription} />
   <meta name="twitter:image" content="https://i.ibb.co/fVSYtgsT/images.jpg" />
   <link rel="preconnect" href="https://esm.sh" crossorigin="anonymous" />
   <link rel="modulepreload" href="https://esm.sh/codemirror@6.0.1?deps=@codemirror/state@6.4.1,@codemirror/view@6.27.0,@codemirror/language@6.10.2,@codemirror/commands@6.6.0,@codemirror/search@6.5.6,@codemirror/autocomplete@6.16.0,@codemirror/lint@6.7.0" />
   <link rel="modulepreload" href="https://esm.sh/@codemirror/state@6.4.1" />
   <link rel="modulepreload" href="https://esm.sh/@codemirror/lang-html@6.4.9?deps=@codemirror/state@6.4.1,@codemirror/view@6.27.0,@codemirror/language@6.10.2,@codemirror/commands@6.6.0,@codemirror/search@6.5.6,@codemirror/autocomplete@6.16.0,@codemirror/lint@6.7.0" />
   <link rel="modulepreload" href="https://esm.sh/@uiw/codemirror-theme-vscode@4.23.5?deps=@codemirror/state@6.4.1,@codemirror/view@6.27.0,@codemirror/language@6.10.2,@codemirror/commands@6.6.0,@codemirror/search@6.5.6,@codemirror/autocomplete@6.16.0,@codemirror/lint@6.7.0" />
</svelte:head>

{#if enRuta}
   <MenuPanelLeftLayout bind:open={sidebarOpen} title={tituloRuta} sidebarTitle="Catálogo de componentes">
      <svelte:fragment slot="sidebar">
         <FlexLayout direction="column" gap="0.25rem" style="padding: 0.5rem 0.4rem 1rem;">
            <hr class="sidebar-separator" />

            <Button variant="text" shape="rect" color="primary" onClick={() => go("/")} style="justify-content: {sidebarOpen ? 'flex-start' : 'center'};" title="Todos los componentes">
               <Iconify slot="icon" icon="mdi:home" />
               {#if sidebarOpen}Todos los componentes{/if}
            </Button>

            <hr class="sidebar-separator" />

            <FlexLayout direction={sidebarOpen ? "row" : "column"} gap="0.25rem" justify={sidebarOpen ? "space-between" : "center"} items={sidebarOpen ? "center" : "stretch"} style="padding: 0 0.1rem;">
               <Button
                  variant={esCatalogo ? "soft" : "text"}
                  shape="rect"
                  color="primary"
                  onClick={() => go("/root")}
                  style="justify-content: {sidebarOpen ? 'flex-start' : 'center'}; flex: {sidebarOpen ? '1 1 auto' : '0 0 auto'};"
                  title="Inicio"
               >
                  <Iconify slot="icon" icon="mdi:view-dashboard-outline" />
                  {#if sidebarOpen}Inicio{/if}
               </Button>

               <FlexLayout direction={sidebarOpen ? "row" : "column"} gap="0.25rem" justify="center" items="center">
                  <Button variant="text" shape="pill" disabled={sidebarExpandDisabled} onClick={() => setAllSidebarSections(true)} title="Expandir todas las secciones del menú" style="width: fit-content;">
                     <Iconify slot="icon" icon="mdi:unfold-more-horizontal" />
                  </Button>
                  <Button variant="text" shape="pill" disabled={sidebarCollapseDisabled} onClick={() => setAllSidebarSections(false)} title="Contraer todas las secciones del menú" style="width: fit-content;">
                     <Iconify slot="icon" icon="mdi:unfold-less-horizontal" />
                  </Button>
               </FlexLayout>
            </FlexLayout>

            <hr class="sidebar-separator" />

            {#each categorias as cat (cat)}
               <SidebarSection
                  bind:open={sectionOpen[cat]}
                  icon={categoriaIcono(cat)}
                  label={cat}
                  active={route.categoria === cat && !route.slug}
                  forceOpen={route.categoria === cat && !!route.slug}
                  count={items.filter((i) => i.categoria === cat).length}
                  statusDots={statusDotsFor(items.filter((i) => i.categoria === cat).map((i) => i.label))}
                  on:headerClick={() => go(`/${encodeURIComponent(cat)}`)}
               >
                  {#each items.filter((i) => i.categoria === cat) as it (it.slug)}
                     <Button
                        variant={route.categoria === cat && route.slug === it.slug ? "soft" : "text"}
                        shape="rect"
                        color={route.categoria === cat && route.slug === it.slug ? "primary" : "neutral"}
                        onClick={() => go(`/${encodeURIComponent(cat)}/${encodeURIComponent(it.slug)}`)}
                        style="justify-content: flex-start; font-size: 0.85rem;"
                        title={it.displayLabel}
                     >
                        <Iconify slot="icon" icon={demoIcono(it.label)} />
                        <span class="sm-full sm-item-label">
                           <span class="sm-item-text">{it.displayLabel}</span>
                           {#if statusDotFor(it.label)}
                              <span class="sm-item-dot" style={`background: var(--is-${statusDotFor(it.label)});`}></span>
                           {/if}
                        </span>
                     </Button>
                  {/each}
               </SidebarSection>
            {/each}
         </FlexLayout>
      </svelte:fragment>

      <svelte:fragment slot="header-end">
         {#if showOpenAllTools}
            <Button variant="text" shape="pill" disabled={contentExpandDisabled} onClick={() => setAllOpen(true)} title="Expandir todos los acordeones" style="width: fit-content;">
               <Iconify slot="icon" icon="mdi:unfold-more-horizontal" />
            </Button>
            <Button variant="text" shape="pill" disabled={contentCollapseDisabled} onClick={() => setAllOpen(false)} title="Contraer todos los acordeones" style="width: fit-content;">
               <Iconify slot="icon" icon="mdi:unfold-less-horizontal" />
            </Button>
         {/if}
         {#if vscodeUrl}
            <Button variant="text" color="primary" onClick={() => location.assign(vscodeUrl)} title="Abrir archivo fuente en VS Code" style="width: fit-content;">
               <Iconify slot="icon" icon="vscode-icons:file-type-vscode" />
            </Button>
         {/if}
         <DarkToggle />
      </svelte:fragment>

      <FlexLayout direction="column" gap="1rem">
         {#if esCatalogo}
            <JAHome />
         {:else}
            {#if grupoDescripcion}
               <Text color="neutral">{grupoDescripcion}</Text>
            {/if}
            {#each itemsFiltrados as it (it.categoria + "/" + it.slug)}
               <svelte:component this={it.Component} />
            {/each}
            {#if itemsFiltrados.length === 0}
               <Text color="neutral">No hay demos para esta ruta.</Text>
            {/if}
         {/if}
      </FlexLayout>
   </MenuPanelLeftLayout>
{:else}
   <slot />
   <JAHome />
   <FlexLayout direction="row" justify="end" style="padding: 1.5rem 0 2rem;">
      <Button variant="text" onClick={() => go("/root")} title="Ir al catálogo con layout especial" style="width: fit-content;">
         <Iconify slot="icon" icon="mdi:view-dashboard-outline" />
         Ir al catálogo (/#/root)
      </Button>
   </FlexLayout>
{/if}

<style>
   :global(body:has(.menu-panel-left-layout) .app-darkmode) {
      display: none !important;
   }
   .sidebar-separator {
      width: 100%;
      border: 0;
      border-top: 1px solid color-mix(in srgb, currentColor, transparent 80%);
      margin: 0.25rem 0;
   }
   :global(.sm-item-label) {
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      min-width: 0;
   }
   :global(.sm-item-text) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }
   :global(.sm-item-dot) {
      display: inline-block;
      width: 0.5em;
      height: 0.5em;
      border-radius: 999px;
      flex-shrink: 0;
   }
</style>
