<script lang="ts" generics="TState extends object = Record<string, unknown>">
   import { H2, Iconify, Text } from "$lib";
   import Card, { type CardProps, bg2font } from "$lib/containers/Card.svelte";
   import FlexLayout from "$lib/containers/layout/FlexLayout.svelte";
   import GridLayout from "$lib/containers/layout/GridLayout.svelte";
   import Button from "$lib/primitives/iconized/Button.svelte";
   import CheckboxIcon from "$lib/primitives/iconized/CheckboxIcon.svelte";
   import Modal from "$lib/overlays/Modal.svelte";
   import type { IconifyProps } from "$lib/primitives/Iconify.svelte";
   import type { ComponentColor } from "$lib/UlConst";
   import { resolveColor } from "$lib/UlConst";
   import { getContext, onDestroy, onMount } from "svelte";
   import type { HTMLAttributes } from "svelte/elements";
   import { slide } from "svelte/transition";
   import ButtonFit from "../controls/ButtonFit.svelte";
   import ButtonIconifyFit from "../controls/ButtonIconifyFit.svelte";
   import StyleClassFields from "../controls/StyleClassFields.svelte";
   import CardHollow from "../preview/CardHollow.svelte";
   import CodeBlock from "../preview/CodeBlock.svelte";
   import InputDecorated from "../preview/InputDecorated.svelte";
   import { columnsConfig } from "../Utils";
   import type { TDemoDetails } from "./DemoController";
   import DemoConfigRenderer from "./DemoConfigRenderer.svelte";

   type TAdapterLike = {
      componentName: string;
      componentPath?: string;
      previewScale?: number;
      previewStyle?: string;
      initialState(): TState;
      initialDetails?(): TDemoDetails;
      fields(): unknown[];
      detailFields?(): unknown[];
      buildCode(state: TState, details: TDemoDetails, demoStyle: string, demoClass: string): string;
      previewKey(state: TState, details: TDemoDetails, demoStyle?: string, demoClass?: string, extras?: unknown[]): string;
   };

   /** Incluye atributos de `Card` que se pasan con `{...$$restProps}`. */
   interface $$Props extends HTMLAttributes<HTMLDivElement> {
      title?: string;
      titleIcon?: IconifyProps["icon"];
      previewSectionIcon?: IconifyProps["icon"];
      codeSectionIcon?: IconifyProps["icon"];
      configSectionIcon?: IconifyProps["icon"];
      examplesSectionIcon?: IconifyProps["icon"];
      testsSectionIcon?: IconifyProps["icon"];
      qDemos?: number | null;
      qPreviewDemos?: number | null;
      color?: ComponentColor;
      statusText?: string;
      statusColor?: ComponentColor;
      statusDots?: ComponentColor[];
      open?: boolean;
      codeStr?: string;
      onReset?: () => void;
      previewStyle?: string;
      previewScale?: number;
      inner?: boolean;
      configBlockCount?: number;
      relieve?: number;
      variant?: CardProps["variant"];
      inline?: boolean;
      demoStyle?: string;
      demoClass?: string;
      adapter?: TAdapterLike;
      state?: TState;
      details?: TDemoDetails;
   }

   interface $$Slots {
      preview: { state: TState; details: TDemoDetails; previewKey: string; demoStyle: string | undefined; demoClass: string | undefined };
      intro: Record<string, never>;
      config: Record<string, never>;
      examples: Record<string, never>;
      tests: Record<string, never>;
      default: Record<string, never>;
   }

   export let adapter: TAdapterLike | undefined = undefined;
   export let state: TState = (adapter ? adapter.initialState() : ({} as TState));
   export let details: TDemoDetails = (adapter?.initialDetails ? adapter.initialDetails() : {});
   export let title: string | undefined = undefined;
   export let titleIcon: $$Props["titleIcon"] = undefined;
   export let previewSectionIcon: IconifyProps["icon"] = "mdi:eye-outline";
   export let codeSectionIcon: IconifyProps["icon"] = "mdi:code-tags";
   export let configSectionIcon: IconifyProps["icon"] = "mdi:tune-variant";
   export let examplesSectionIcon: IconifyProps["icon"] = "mdi:book-open-variant";
   export let testsSectionIcon: IconifyProps["icon"] = "mdi:flask-outline";
   export let qDemos: $$Props["qDemos"] = undefined;
   export let qPreviewDemos: $$Props["qPreviewDemos"] = undefined;
   export let color: ComponentColor = "primary";
   export let statusText: $$Props["statusText"] = undefined;
   export let statusColor: ComponentColor = "success";
   export let statusDots: ComponentColor[] = [];
   export let open = false;
   export let codeStr: $$Props["codeStr"] = undefined;
   export let onReset: $$Props["onReset"] = undefined;
   export let previewStyle: $$Props["previewStyle"] = undefined;
   export let previewScale: $$Props["previewScale"] = undefined;
   export let inner = false;
   export let configBlockCount = 3;
   export let demoStyle: $$Props["demoStyle"] = "";
   export let demoClass: $$Props["demoClass"] = "";

   $: finalTitle = title ?? adapter?.componentName ?? "Title";
   $: finalCodeStr = codeStr ?? (adapter ? adapter.buildCode(state, details, demoStyle ?? "", demoClass ?? "") : undefined);
   $: previewKey = adapter ? adapter.previewKey(state, details, demoStyle ?? "", demoClass ?? "") : "";
   $: finalPreviewScale = previewScale ?? adapter?.previewScale;
   $: finalPreviewStyle = previewStyle ?? adapter?.previewStyle;
   $: finalOnReset = onReset ?? (adapter ? () => {
      state = adapter.initialState();
      details = adapter.initialDetails ? adapter.initialDetails() : {};
      demoStyle = "";
      demoClass = "";
      previewBg = "";
      previewInvert = false;
   } : undefined);

   const forceOpenStore = getContext<{ subscribe: (fn: (v: boolean) => void) => () => void } | undefined>("demos:forceOpen");
   let solo = false;
   if (forceOpenStore)
      forceOpenStore.subscribe((v) => {
         if (v) {
            open = true;
            solo = true;
         } else {
            solo = false;
         }
      });

   type OpenAllSignal = { tick: number; value: boolean } | null;
   const openAllSignalStore = getContext<{ subscribe: (fn: (v: OpenAllSignal) => void) => () => void } | undefined>("demos:openAllSignal");
   let lastTick = -1;
   if (openAllSignalStore)
      openAllSignalStore.subscribe((sig) => {
         if (sig && sig.tick !== lastTick) {
            lastTick = sig.tick;
            open = sig.value;
         }
      });

   type OpenRegistry = { register: (id: symbol, open: boolean) => void; unregister: (id: symbol) => void };
   const openRegistry = getContext<OpenRegistry | undefined>("demos:openRegistry");
   const registryId = Symbol();
   onMount(() => { openRegistry?.register(registryId, open); });
   onDestroy(() => { openRegistry?.unregister(registryId); });
   $: openRegistry?.register(registryId, open);

   let showCode = false;
   let showCodeModal = false;
   let showExamplesModal = false;
   let copyState: "idle" | "ok" | "err" = "idle";
   let previewBg = "";
   let previewInvert = false;
   const PREVIEW_STICKY_KEY = "AccordeonDemo:previewSticky";
   const previewStickyStore = getContext<{ subscribe: (fn: (v: boolean) => void) => () => void; set: (v: boolean) => void } | undefined>("demos:previewSticky");
   let previewSticky = ((): boolean => {
      try {
         const v = typeof localStorage !== "undefined" ? localStorage.getItem(PREVIEW_STICKY_KEY) : null;
         return v !== "0";
      } catch { return true; }
   })();
   if (previewStickyStore) previewStickyStore.subscribe((v) => { previewSticky = v; });
   $: if (previewStickyStore) previewStickyStore.set(previewSticky);
   $: if (!previewStickyStore) try { if (typeof localStorage !== "undefined") localStorage.setItem(PREVIEW_STICKY_KEY, previewSticky ? "1" : "0"); } catch { /* ignore */ }

   /** Calcula el factor de escala dinámico del preview entre 1 (en `sm`) y `finalPreviewScale` (en `xl`). */
   const computeDynamicScale = (target: number | undefined, lerp01: number): number => {
      if (!target || target === 1) return 1;
      const t = Math.max(0, Math.min(1, lerp01));
      return 1 + t * (target - 1);
   };
   const BP_SM = 480;
   const BP_XL = 1200;
   function applyScale(wrapper: HTMLElement, scaleTarget: number | undefined): void {
      const stage = wrapper.querySelector<HTMLElement>(".preview-stage");
      if (!stage) return;
      const w = wrapper.clientWidth;
      const lerp = (w - BP_SM) / (BP_XL - BP_SM);
      const scale = computeDynamicScale(scaleTarget, lerp);
      if (scaleTarget && scaleTarget !== 1) stage.style.transform = `scale(${scale})`;
      else stage.style.transform = "";
   }
   function trackWidth(wrapper: HTMLElement, scaleTarget: number | undefined) {
      let current = scaleTarget;
      applyScale(wrapper, current);
      let obs: ResizeObserver | undefined;
      if (typeof ResizeObserver !== "undefined") {
         obs = new ResizeObserver(() => applyScale(wrapper, current));
         obs.observe(wrapper);
      }
      return {
         update(next: number | undefined) {
            current = next;
            applyScale(wrapper, current);
         },
         destroy() { obs?.disconnect(); },
      };
   }

   async function copyCode() {
      if (!finalCodeStr) return;
      try {
         await navigator.clipboard.writeText(finalCodeStr);
         copyState = "ok";
      } catch {
         copyState = "err";
      }
      setTimeout(() => (copyState = "idle"), 1500);
   }

   $: relieveAccordion = inner ? 75 : undefined;
   $: statusDotsUnique = statusDots?.length ? [...new Set(statusDots)] : [];
   $: bodyResolvedColor = resolveColor(color, "currentColor");
   $: bodyStyle = `--accordion-body-clr: ${bodyResolvedColor};`;

   let sentinel: HTMLDivElement | undefined;
   let stuck = false;
   let io: IntersectionObserver | undefined;

   function trackHeaderHeight(el: HTMLElement): { destroy: () => void } {
      const root = el.closest<HTMLElement>(".accordion");
      const apply = (h: number): void => { root?.style.setProperty("--demo-header-h", `${h}px`); };
      apply(el.getBoundingClientRect().height);
      const ro = new ResizeObserver((entries) => {
         for (const e of entries) apply(e.contentRect.height);
      });
      ro.observe(el);
      return { destroy: () => ro.disconnect() };
   }

   const componentSourcePathStore = getContext<{ set: (v: string | undefined) => void } | undefined>("demos:componentSourcePath");

   onMount(() => {
      if (componentSourcePathStore && adapter?.componentPath)
         componentSourcePathStore.set(adapter.componentPath);
      if (!inner || !sentinel) return;
      io = new IntersectionObserver(
         ([entry]) => {
            stuck = !entry.isIntersecting;
         },
         { threshold: [0, 1], rootMargin: "0px 0px 0px 0px" },
      );
      io.observe(sentinel);
   });
   onDestroy(() => {
      io?.disconnect();
      if (componentSourcePathStore && adapter?.componentPath) componentSourcePathStore.set(undefined);
   });
</script>

<Card {...$$restProps} relieve={relieveAccordion} class={["accordion", inner && "accordion--inner", $$restProps.class].filter(Boolean).join(" ")} style={["padding: 0", $$restProps.style].filter(Boolean).join(";")}>
   {#if inner}
      <div bind:this={sentinel} class="accordion-sentinel" aria-hidden="true"></div>
   {/if}
   <div class="accordion-header-wrap" class:is-stuck={stuck} class:is-locked={solo} use:trackHeaderHeight>
      <Button variant="text" {color} class="accordion-header" onClick={() => { if (!solo) open = !open; }} style={["width: 100%; padding: 1rem; justify-content: space-between;", open && "border-bottom-left-radius: 0;border-bottom-right-radius: 0;"].filter(Boolean).join(";")}>
         <H2>
            <FlexLayout justify="between" items="center" style="width: 100%;">
               <FlexLayout items="center" class="head" style="min-width: 0; flex: 1;">
                  {#if titleIcon}
                     <Iconify icon={titleIcon} class="title-icon" />
                  {/if}
                  <Text class="title" lines={1}>
                     {finalTitle}
                     {#if qDemos != null && qDemos > 1}
                        <span style="opacity: 0.7;">({qDemos})</span>
                     {/if}
                     {#if statusDotsUnique.length}
                        <span class="status-dots">
                           {#each statusDotsUnique as dotColor}
                              <span class="status-dot" style={`background: var(--is-${dotColor});`}></span>
                           {/each}
                        </span>
                     {/if}
                     {#if statusText}
                        <span style={`color: var(--is-${statusColor}); font-weight: 600;`}>({statusText})</span>
                     {/if}
                  </Text>
               </FlexLayout>
               <Iconify class="chevron" icon="mdi:chevron-down" flipv={open} style={`font-size: 1.5em; flex-shrink: 0; ${solo ? "visibility: hidden;" : ""}`} />
            </FlexLayout>
         </H2>
      </Button>
   </div>
   {#if open}
      <div class="accordion-body" transition:slide style={bodyStyle}>
         <FlexLayout direction="column" gap="1rem" style="padding: 1rem;">
            {#if $$slots.intro}
               <div class="intro">
                  <slot name="intro" />
               </div>
            {/if}
            {#if $$slots.preview || $$slots.config || $$slots.examples || $$slots.tests || finalCodeStr || finalOnReset || adapter}
               {#if $$slots.preview}
                  <div class="preview-frame" class:has-bg={!!previewBg} class:is-sticky={previewSticky} class:is-solo={solo} style={previewBg ? `background: ${previewBg}; --preview-fg: ${bg2font(previewBg)};` : ""}>
                     <InputDecorated asTitle label={`Vista Previa${qPreviewDemos && qPreviewDemos > 0 ? ` (${qPreviewDemos})` : ""}`} icon={previewSectionIcon || undefined}>
                        <div style="width: 100%;" use:trackWidth={finalPreviewScale}>
                           <div class="preview-stage" style={`min-height: 120px; width: 100%; margin-inline: auto; transform-origin: center; ${previewInvert ? "filter: invert(1) hue-rotate(180deg);" : ""} ${finalPreviewStyle || ""}`}>
                              <slot name="preview" {state} {details} {previewKey} {demoStyle} {demoClass} />
                           </div>
                        </div>
                     </InputDecorated>
                     <div class="preview-controls" aria-hidden="false" style={previewBg ? `color: ${bg2font(previewBg)};` : ""}>
                        {#if finalCodeStr}
                           <ButtonIconifyFit shape="pill" variant="text" icon={codeSectionIcon || "mdi:code-tags"} title="Ver código en modal" on:click={() => (showCodeModal = true)} />
                        {/if}
                        <CheckboxIcon bind:checked={previewSticky} title={previewSticky ? "Desfijar vista previa" : "Fijar vista previa"}>
                           <Iconify slot="iconTrue" icon="mdi:pin" />
                           <Iconify slot="iconFalse" icon="mdi:pin-off-outline" />
                        </CheckboxIcon>
                        <CheckboxIcon bind:checked={previewInvert} title="Invertir colores del preview">
                           <Iconify slot="iconTrue" icon="mdi:invert-colors" />
                           <Iconify slot="iconFalse" icon="mdi:invert-colors-off" />
                        </CheckboxIcon>
                        <input class="preview-color" type="color" on:input={(e) => (previewBg = e.currentTarget.value)} title="Forzar color de fondo" />
                        {#if previewBg}
                           <ButtonIconifyFit shape="pill" variant="text" icon="mdi:close" title="Restablecer fondo" on:click={() => (previewBg = "")} />
                        {/if}
                     </div>
                  </div>
               {/if}
               {#if finalCodeStr || $$slots.examples}
                  <FlexLayout justify="end" items="center" style="width: 100%; flex-wrap: wrap;">
                     {#if finalCodeStr}
                        <CheckboxIcon bind:checked={showCode} color="primary" title={showCode ? "Ocultar código" : "Ver código"}>
                           <Iconify slot="iconTrue" icon="mdi:code-tags" />
                           <Iconify slot="iconFalse" icon="mdi:xml" />
                           {showCode ? "Ocultar código" : "Ver código"}
                        </CheckboxIcon>
                     {/if}
                     {#if $$slots.examples}
                        <ButtonFit variant="text" onClick={() => (showExamplesModal = true)}>
                           <Iconify slot="icon" icon={examplesSectionIcon || "mdi:book-open-variant"} />
                           Ver ejemplos
                        </ButtonFit>
                     {/if}
                  </FlexLayout>
                  {#if finalCodeStr && showCode}
                     <div class="code-inline" transition:slide style="border: 1px solid {resolveColor('border/primary')};">
                        <FlexLayout direction="column" gap="0.5rem" style="width: 100%;">
                           <FlexLayout justify="end">
                              <ButtonIconifyFit shape="pill" variant="text" color={copyState === "ok" ? "success" : copyState === "err" ? "error" : undefined} icon={copyState === "ok" ? "mdi:check" : copyState === "err" ? "mdi:alert" : "mdi:content-copy"} title={copyState === "ok" ? "Copiado" : copyState === "err" ? "Error" : "Copiar"} on:click={copyCode} />
                           </FlexLayout>
                           <CodeBlock code={finalCodeStr} minHeight="0" />
                        </FlexLayout>
                     </div>
                  {/if}
               {/if}
               {#if $$slots.tests || (adapter?.detailFields && adapter.detailFields().length)}
                  <CardHollow let:sizew>
                     <InputDecorated asTitle label="Casos de prueba" icon={testsSectionIcon || undefined}>
                        <GridLayout cells={String(Math.min(2, columnsConfig(2, sizew) || 1))} gap="0.75rem" style="width: 100%;">
                           {#if adapter?.detailFields}
                              <DemoConfigRenderer fields={adapter.detailFields() as unknown[]} bind:state={details} />
                           {/if}
                           <slot name="tests" />
                        </GridLayout>
                     </InputDecorated>
                  </CardHollow>
               {/if}
               {#if $$slots.config || adapter}
                  <CardHollow let:sizew>
                     <InputDecorated asTitle label="Configuración" icon={configSectionIcon || undefined}>
                        <GridLayout cells={String(columnsConfig(configBlockCount, sizew))} style="width:100%;min-width:0;">
                           <StyleClassFields bind:style={demoStyle} bind:klass={demoClass} />
                           {#if adapter}
                              <DemoConfigRenderer fields={adapter.fields() as unknown[]} bind:state />
                           {/if}
                           <slot name="config" />
                        </GridLayout>

                        {#if finalOnReset}
                           <FlexLayout justify="end" style="width: 100%;">
                              <ButtonFit onClick={finalOnReset}>
                                 <Iconify slot="icon" icon="mdi:refresh" />
                                 Reiniciar valores
                              </ButtonFit>
                           </FlexLayout>
                        {/if}
                     </InputDecorated>
                  </CardHollow>
               {:else if finalOnReset}
                  <FlexLayout justify="end" style="width: 100%;">
                     <ButtonFit onClick={finalOnReset}>
                        <Iconify slot="icon" icon="mdi:refresh" />
                        Reiniciar valores
                     </ButtonFit>
                  </FlexLayout>
               {/if}
               {#if $$slots.examples}
                  <!-- Ejemplos se muestran en modal a través del botón superior -->
               {/if}
            {/if}
            {#if $$slots.default}
               <slot />
            {/if}
         </FlexLayout>
      </div>
   {/if}
</Card>

{#if $$slots.examples}
   <Modal bind:bshow={showExamplesModal} style="width: 50vw; max-width: min(960px, 92vw);">
      <svelte:fragment slot="title">
         <FlexLayout items="center">
            <Iconify icon={examplesSectionIcon || "mdi:book-open-variant"} />
            <span>Ejemplos</span>
         </FlexLayout>
      </svelte:fragment>
      <FlexLayout direction="column" gap="1rem" style="width: 100%; padding: 1rem;">
         <slot name="examples" />
      </FlexLayout>
   </Modal>
{/if}

{#if finalCodeStr}
   <Modal bind:bshow={showCodeModal} style="width: 70vw; max-width: min(1200px, 96vw);">
      <svelte:fragment slot="title">
         <FlexLayout items="center">
            <Iconify icon={codeSectionIcon || "mdi:code-tags"} />
            <span>Código</span>
         </FlexLayout>
      </svelte:fragment>
      <FlexLayout direction="column" gap="0.5rem" style="width: 100%; padding: 1rem;">
         <FlexLayout justify="end">
            <ButtonIconifyFit shape="pill" variant="text" color={copyState === "ok" ? "success" : copyState === "err" ? "error" : undefined} icon={copyState === "ok" ? "mdi:check" : copyState === "err" ? "mdi:alert" : "mdi:content-copy"} title={copyState === "ok" ? "Copiado" : copyState === "err" ? "Error" : "Copiar"} on:click={copyCode} />
         </FlexLayout>
         <CodeBlock code={finalCodeStr} minHeight="0" />
      </FlexLayout>
   </Modal>
{/if}

<style>
   .code-inline {
      box-sizing: border-box;
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
   }

   :global {
      .accordion {
         box-sizing: border-box;
         display: block;
         margin: 0;
         padding: 0;
         width: 100%;

         & .accordion-sentinel {
            height: 1px;
            margin-bottom: -1px;
            pointer-events: none;
         }

         & .accordion-body {
            position: relative;
            background: #80808005;
            border: 1px solid color-mix(in srgb, var(--accordion-body-clr, gray), transparent 80%);
            border-top: none;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
         }

         &.accordion--inner .accordion-header-wrap {
            position: sticky;
            top: -0.75rem;
            z-index: 6;
            background: transparent;
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
            transition: background-color 0.15s ease;
         }

         &.accordion--inner .accordion-header-wrap.is-stuck {
            background: var(--is-bg-secondary, #fff);
         }

         &.accordion--inner .accordion-header-wrap.is-locked,
         &.accordion--inner .accordion-header-wrap.is-locked.is-stuck {
            position: static;
            background: transparent;
         }

         & h2 {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            width: 100%;
         }

         & .head {
            & .title-icon {
               flex-shrink: 0;
               font-size: 1.35em;
               opacity: 0.95;
            }

            & .title {
               flex: 1;
               overflow: hidden;
               text-align: start;
            }

            & .status-dots {
               display: inline-flex;
               gap: 0.35rem;
               margin-left: 0.45rem;
               vertical-align: middle;
            }

            & .status-dot {
               border-radius: 999px;
               display: inline-block;
               height: 0.52rem;
               width: 0.52rem;
            }
         }

         & .chevron {
            flex-shrink: 0;
            transition: transform 0.2s ease;
         }

         & .intro {
            box-sizing: border-box;
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0;
            max-width: 100%;
            padding-inline: 0.15rem;
            width: 100%;

            & code {
               background: color-mix(in srgb, currentColor 8%, transparent);
               border-radius: 0.2em;
               font-size: 0.9em;
               padding: 0.12em 0.35em;
            }
         }

         & .accordion-header-wrap.is-locked {
            pointer-events: none;
            user-select: none;
            cursor: default;
         }

         & .preview-frame {
            position: relative;
            border: 1px solid color-mix(in srgb, var(--is-primary), transparent 55%);
            border-radius: 0.75rem;
            padding: 1.25rem 1rem 1.1rem;
            background:
               color-mix(in srgb, var(--is-bg-secondary), var(--is-primary) 10%);
            overflow: hidden;
         }

         & .preview-frame.is-sticky {
            position: sticky;
            top: calc(var(--demo-header-h, 4rem) - 0.75rem);
            z-index: 5;
         }

         & .preview-frame.is-sticky.is-solo {
            top: 0;
         }

         & .intro {
            margin-bottom: 1rem;
         }

         & .preview-stage {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 0.5rem;
            transition: background-color 0.15s ease;
            padding: 0.5rem 0.25rem;
         }

         & .preview-frame.has-bg :global(.input-decorated-label-text),
         & .preview-frame.has-bg :global(.input-decorated-label-icon) {
            color: var(--preview-fg) !important;
         }

         & :global(.preview-controls .checkbox-icon) {
            --c-fls: currentColor;
            --c-tr: currentColor;
         }

         & .preview-controls {
            position: absolute;
            top: 1.4rem;
            right: 1rem;
            display: inline-flex;
            gap: 1rem;
            align-items: center;
            padding: 0;
            background: transparent;
            border: none;
            transition: transform 0.15s ease;
            z-index: 2;
         }

         & .preview-color {
            flex: none;
            width: 28px;
            height: 28px;
            min-width: 28px;
            min-height: 28px;
            color: inherit;
            border: 1px solid currentColor;
            border-radius: 0.25rem;
            padding: 0;
            background: transparent;
            cursor: pointer;
            box-sizing: border-box;
            transition: transform 0.15s ease;
         }
         & .preview-color:hover { transform: scale(1.06); }
      }
   }
</style>
