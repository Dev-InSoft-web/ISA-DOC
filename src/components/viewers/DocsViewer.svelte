<script lang="ts">
   import { onMount, tick } from "svelte";
   import { ButtonIconify } from "@ingenieria_insoft/ispsveltecomponents";
   import { STATIC_MODE, withBase } from "../../lib/runtime/staticMode";
   import { renderMermaidBlocks } from "../../lib/mermaid/render";
   import PatyIAPrompts from "../panels/PatyIAPrompts.svelte";

   export let project: string = "contapymeu";

   type Section = { slug: string; title: string; icon?: string; kind?: "md" | "embeds" | "prompts" };
   type Embed = { type: "image" | "pdf"; src: string; title?: string };
   type Manifest = {
      project: string;
      title: string;
      description?: string;
      sections: Section[];
      embeds?: Embed[];
   };

   let manifest: Manifest | null = null;
   let activeSlug = "";
   let html = "";
   let loading = true;
   let error = "";
   let contentEl: HTMLElement;
   let markedReady = false;
   let codeMirrorReady = false;
   const cmModesLoaded = new Set<string>();

   function loadScript(src: string): Promise<void> {
      return new Promise((resolve, reject) => {
         const s = document.createElement("script");
         s.src = src;
         s.onload = () => resolve();
         s.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
         document.head.appendChild(s);
      });
   }

   function loadStyle(href: string): void {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = href;
      document.head.appendChild(l);
   }

   async function loadMarked(): Promise<void> {
      if ((window as any).marked) {
         markedReady = true;
         return;
      }
      await loadScript("https://cdn.jsdelivr.net/npm/marked/marked.min.js");
      markedReady = true;
   }

   const CM_BASE = "https://cdn.jsdelivr.net/npm/codemirror@5.65.16";

   /** Mapea el `language-X` que produce marked al mode/mime de CodeMirror 5. */
   const LANG_TO_CM: Record<string, { mode: string; mime: string; label: string }> = {
      ts:         { mode: "javascript", mime: "application/typescript", label: "TypeScript" },
      tsx:        { mode: "javascript", mime: "application/typescript", label: "TypeScript" },
      typescript: { mode: "javascript", mime: "application/typescript", label: "TypeScript" },
      js:         { mode: "javascript", mime: "text/javascript",        label: "JavaScript" },
      jsx:        { mode: "javascript", mime: "text/javascript",        label: "JavaScript" },
      javascript: { mode: "javascript", mime: "text/javascript",        label: "JavaScript" },
      json:       { mode: "javascript", mime: "application/json",       label: "JSON" },
      sql:        { mode: "sql",        mime: "text/x-sql",             label: "SQL" },
      yaml:       { mode: "yaml",       mime: "text/x-yaml",            label: "YAML" },
      yml:        { mode: "yaml",       mime: "text/x-yaml",            label: "YAML" },
      bash:       { mode: "shell",      mime: "text/x-sh",              label: "Shell" },
      sh:         { mode: "shell",      mime: "text/x-sh",              label: "Shell" },
      shell:      { mode: "shell",      mime: "text/x-sh",              label: "Shell" },
      powershell: { mode: "powershell", mime: "application/x-powershell", label: "PowerShell" },
      html:       { mode: "xml",        mime: "text/html",              label: "HTML" },
      xml:        { mode: "xml",        mime: "application/xml",        label: "XML" },
   };

   async function loadCodeMirror(): Promise<void> {
      if ((window as any).CodeMirror) {
         codeMirrorReady = true;
         return;
      }
      try {
         loadStyle(`${CM_BASE}/lib/codemirror.min.css`);
         await loadScript(`${CM_BASE}/lib/codemirror.min.js`);
         codeMirrorReady = true;
      } catch (e) {
         codeMirrorReady = false;
      }
   }

   async function loadCmMode(mode: string): Promise<void> {
      if (!mode || cmModesLoaded.has(mode)) return;
      try {
         await loadScript(`${CM_BASE}/mode/${mode}/${mode}.min.js`);
         cmModesLoaded.add(mode);
      } catch {
         // si el modo no existe, CodeMirror se degrada a texto plano
      }
   }

   /**
    * Reemplaza cada <pre><code class="language-X"> (excepto mermaid) por una
    * instancia read-only de CodeMirror con tema oscuro propio (cm-s-isadocs).
    * Añade una etiqueta superior con el lenguaje.
    */
   async function renderCodeBlocks(container: HTMLElement) {
      if (!codeMirrorReady || !(window as any).CodeMirror) return;
      const blocks = Array.from(container.querySelectorAll("pre > code")).filter((c) => {
         const cls = (c as HTMLElement).className || "";
         return !cls.includes("language-mermaid");
      }) as HTMLElement[];
      if (!blocks.length) return;

      const CM = (window as any).CodeMirror;
      // pre-cargar modes únicos
      const uniqueModes = new Set<string>();
      const items: Array<{ codeEl: HTMLElement; lang: string; cfg?: { mode: string; mime: string; label: string } }> = [];
      for (const codeEl of blocks) {
         const cls = codeEl.className || "";
         const m = cls.match(/language-([\w-]+)/);
         const lang = (m?.[1] ?? "").toLowerCase();
         const cfg = LANG_TO_CM[lang];
         if (cfg) uniqueModes.add(cfg.mode);
         items.push({ codeEl, lang, cfg });
      }
      await Promise.all([...uniqueModes].map((mo) => loadCmMode(mo)));

      for (const { codeEl, lang, cfg } of items) {
         const pre = codeEl.parentElement!;
         const text = codeEl.textContent ?? "";
         const wrapper = document.createElement("div");
         wrapper.className = "is-codeblock";
         if (lang) {
            const tag = document.createElement("div");
            tag.className = "is-codeblock-tag";
            tag.textContent = cfg?.label ?? lang.toUpperCase();
            wrapper.appendChild(tag);
         }
         const host = document.createElement("div");
         host.className = "is-codeblock-host";
         wrapper.appendChild(host);
         pre.replaceWith(wrapper);

         CM(host, {
            value: text.replace(/\n$/, ""),
            mode: cfg?.mime ?? "text/plain",
            theme: "isadocs",
            lineNumbers: true,
            readOnly: "nocursor",
            viewportMargin: Infinity,
            lineWrapping: false,
            tabSize: 2,
            indentUnit: 2,
         });
      }
   }

   /**
    * Pre-procesa el markdown reemplazando cada
    *   <!-- img path="..." [crop="x,y,w,h"] [alt="..."] [width="N"] -->
    * por un <img> normal o, si trae crop, un <canvas data-img-crop>
    * que tras renderizar el HTML dibuja sólo el rectángulo solicitado.
    */
   function expandImageCrops(md: string): string {
      const re = /<!--\s*img\s+([^>]+?)\s*-->/g;
      const attrRe = /(\w+)\s*=\s*"([^"]*)"/g;
      return md.replace(re, (_full, body: string) => {
         const attrs: Record<string, string> = {};
         for (const a of body.matchAll(attrRe)) attrs[a[1]] = a[2];
         const path = attrs.path;
         if (!path) return `> ⚠ \`<!-- img -->\` sin \`path\``;
         const src = path.startsWith("/") ? path : `/${path}`;
         const alt = (attrs.alt ?? "").replace(/"/g, "&quot;");
         if (attrs.crop) {
            const w = attrs.width ? `data-w="${attrs.width}"` : "";
            return `<canvas class="is-imgcrop" data-src="${src}" data-crop="${attrs.crop}" ${w} aria-label="${alt}"></canvas>`;
         }
         return `<img src="${src}" alt="${alt}" />`;
      });
   }

   /** Para cada <canvas data-src + data-crop>, carga la imagen y dibuja sólo el rect. */
   async function renderImageCrops(container: HTMLElement) {
      const list = Array.from(container.querySelectorAll<HTMLCanvasElement>("canvas.is-imgcrop"));
      for (const cv of list) {
         const src = cv.dataset.src ?? "";
         const crop = (cv.dataset.crop ?? "").split(",").map((n) => parseFloat(n.trim()));
         if (!src || crop.length !== 4 || crop.some((n) => Number.isNaN(n))) continue;
         const [sx, sy, sw, sh] = crop;
         await new Promise<void>((res) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
               const targetW = parseFloat(cv.dataset.w ?? "") || sw;
               const scale = targetW / sw;
               cv.width = Math.round(sw * scale);
               cv.height = Math.round(sh * scale);
               const ctx = cv.getContext("2d");
               if (ctx) ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cv.width, cv.height);
               res();
            };
            img.onerror = () => res();
            img.src = src;
         });
      }
   }

   /**
    * Pre-procesa el markdown reemplazando cada
    *   <!-- src path="..." [lang="..."] [from="..."] [to="..."] [symbol="..."] [start="N"] [end="N"] -->
    * por un bloque ```lang … ``` con el contenido leído en tiempo real
    * desde `/api/source`. Si el endpoint falla, deja un aviso visible.
    *
    * Nota: el regex no permite `-->` dentro de los atributos.
    */
   async function expandSourceIncludes(md: string): Promise<string> {
      const re = /<!--\s*src\s+([^>]+?)\s*-->/g;
      const matches = [...md.matchAll(re)];
      if (!matches.length) return md;

      const attrRe = /(\w+)\s*=\s*"([^"]*)"/g;
      const replacements = await Promise.all(matches.map(async (m) => {
         const attrs: Record<string, string> = {};
         for (const a of m[1].matchAll(attrRe)) attrs[a[1]] = a[2];
         const path = attrs.path;
         if (!path) return { match: m[0], replacement: `> ⚠ include sin \`path\`: \`${m[0]}\`` };
         const params = new URLSearchParams({ path });
         for (const k of ["from", "to", "symbol", "start", "end"]) {
            if (attrs[k]) params.set(k, attrs[k]);
         }
         const lang = attrs.lang || guessLangFromPath(path);
         try {
            const res = await fetch(`/api/source?${params.toString()}`, { cache: "no-cache" });
            const txt = await res.text();
            if (!res.ok) {
               return { match: m[0], replacement: `> ⚠ \`${path}\`: ${txt}` };
            }
            const fence = "```";
            const body = `${fence}${lang}\n${txt.replace(/```/g, "ʼʼʼ")}\n${fence}`;
            return { match: m[0], replacement: body };
         } catch (e: any) {
            return { match: m[0], replacement: `> ⚠ \`${path}\`: ${e?.message ?? e}` };
         }
      }));

      let out = md;
      for (const { match, replacement } of replacements) {
         out = out.replace(match, () => replacement);
      }
      return out;
   }

   function guessLangFromPath(p: string): string {
      const ext = p.split(".").pop()?.toLowerCase() ?? "";
      switch (ext) {
         case "ts": case "tsx": return "typescript";
         case "js": case "jsx": return "javascript";
         case "sql": return "sql";
         case "json": return "json";
         case "yaml": case "yml": return "yaml";
         case "ps1": return "powershell";
         case "sh": return "bash";
         default: return "";
      }
   }

   async function loadSection(slug: string) {
      activeSlug = slug;
      html = "";
      const section = manifest?.sections.find((s) => s.slug === slug);
      if (section?.kind === "prompts") {
         // Renderizado por componente Svelte (ver bloque del template). No hay HTML que generar.
         return;
      }
      if (section?.kind === "embeds") {
         html = renderEmbeds(manifest?.embeds ?? []);
         await tick();
         if (contentEl) await renderPdfEmbeds(contentEl);
         return;
      }
      try {
         const docsPath = STATIC_MODE ? `/static-api/docs/${project}/${slug}.md` : `/docs/${project}/${slug}.md`;
         const res = await fetch(docsPath, { cache: "no-cache" });
         if (!res.ok) throw new Error(`HTTP ${res.status}`);
         let md = await res.text();
         md = expandImageCrops(md);
         if (!STATIC_MODE) md = await expandSourceIncludes(md);
         const marked = (window as any).marked;
         html = marked.parse(md, { mangle: false, headerIds: true });
         await tick();
         const container = contentEl ?? document.querySelector(".docs-content");
         if (container) {
            // Mermaid PRIMERO (consume bloques `language-mermaid`), luego CodeMirror para el resto.
            await renderMermaidBlocks(container as HTMLElement);
            await renderCodeBlocks(container as HTMLElement);
            await renderImageCrops(container as HTMLElement);
         }
      } catch (e: any) {
         html = `<p class="docs-error">Error cargando <code>${slug}.md</code>: ${e?.message ?? e}</p>`;
      }
   }

   const PDFJS_VER = "3.11.174";
   let pdfJsReady = false;

   async function loadPdfJs(): Promise<void> {
      if (pdfJsReady && (window as any).pdfjsLib) return;
      const base = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VER}`;
      if (!(window as any).pdfjsLib) {
         await loadScript(`${base}/pdf.min.js`);
      }
      const lib = (window as any).pdfjsLib;
      if (lib?.GlobalWorkerOptions) {
         lib.GlobalWorkerOptions.workerSrc = `${base}/pdf.worker.min.js`;
      }
      pdfJsReady = !!lib;
   }

   async function renderPdfEmbeds(container: HTMLElement) {
      const hosts = Array.from(container.querySelectorAll<HTMLDivElement>(".embed-pdf[data-pdf-src]"));
      if (!hosts.length) return;
      try {
         await loadPdfJs();
      } catch {
         hosts.forEach((h) => { h.innerHTML = `<div class="embed-pdf-error">No se pudo cargar el visor de PDF.</div>`; });
         return;
      }
      const lib = (window as any).pdfjsLib;
      if (!lib) return;
      await Promise.all(hosts.map(async (host) => {
         const src = host.dataset.pdfSrc;
         if (!src) return;
         try {
            const task = lib.getDocument({ url: src });
            const pdf = await task.promise;
            host.innerHTML = "";
            const scaleBase = Math.max(1, Math.min(2, (host.clientWidth || 800) / 700));
            for (let n = 1; n <= pdf.numPages; n++) {
               const page = await pdf.getPage(n);
               const viewport = page.getViewport({ scale: scaleBase });
               const canvas = document.createElement("canvas");
               canvas.className = "embed-pdf-page";
               canvas.width = Math.round(viewport.width);
               canvas.height = Math.round(viewport.height);
               host.appendChild(canvas);
               const ctx = canvas.getContext("2d");
               if (!ctx) continue;
               await page.render({ canvasContext: ctx, viewport }).promise;
            }
         } catch (e: any) {
            host.innerHTML = `<div class="embed-pdf-error">Error al renderizar el PDF: ${e?.message ?? e}</div>`;
         }
      }));
   }

   function renderEmbeds(items: Embed[]): string {
      if (!items.length) {
         return `<p class="docs-error">No hay recursos configurados.</p>`;
      }
      const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      const openIcon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M14 3v2h3.59L7.76 14.83l1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"/></svg>`;
      const openBtn = (href: string, label: string) =>
         `<a class="embed-open" href="${escapeAttr(href)}" target="_blank" rel="noopener" title="${escapeAttr(label)}" aria-label="${escapeAttr(label)}">${openIcon}</a>`;
      const parts: string[] = [`<h1>Recursos insertados</h1>`];
      for (const it of items) {
         const title = it.title ?? it.src.split("/").pop() ?? it.src;
         const resolvedSrc = STATIC_MODE ? withBase(it.src) : it.src;
         const src = escapeAttr(resolvedSrc);
         if (it.type === "image") {
            parts.push(
               `<figure class="embed-figure">` +
               `<div class="embed-head">${openBtn(resolvedSrc, `Abrir ${title} en otra pestaña`)}</div>` +
               `<img class="embed-image" src="${src}" alt="${escapeAttr(title)}" />` +
               `</figure>`
            );
         } else if (it.type === "pdf") {
            const inlineSrc = STATIC_MODE
               ? src
               : `/api/embed?path=${encodeURIComponent(it.src.replace(/^\//, ""))}`;
            parts.push(
               `<figure class="embed-figure">` +
               `<div class="embed-head">${openBtn(resolvedSrc, `Abrir ${title} en otra pestaña`)}</div>` +
               `<div class="embed-pdf" data-pdf-src="${inlineSrc}" aria-label="${escapeAttr(title)}">` +
                  `<div class="embed-pdf-loading">Cargando PDF…</div>` +
               `</div>` +
               `</figure>`
            );
         }
      }
      return parts.join("\n");
   }

   let buildingAll = false;
   let modalOpen = false;
   let fullMd = "";
   let cmHostEl: HTMLDivElement | null = null;
   let cmFullInstance: { setValue(v: string): void; refresh(): void } | null = null;
   let copyFlash = false;

   async function buildJoinedMd(): Promise<string> {
      if (!manifest) return "";
      const baseDir = STATIC_MODE ? `/static-api/docs/${project}` : `/docs/${project}`;
      const parts: string[] = [];
      const header = `# ${manifest.title}\n\n${manifest.description ?? ""}`.trim();
      parts.push(header);
      for (const s of manifest.sections) {
         if (s.kind === "embeds") continue;
         const res = await fetch(`${baseDir}/${s.slug}.md`, { cache: "no-cache" });
         if (!res.ok) continue;
         let md = await res.text();
         md = expandImageCrops(md);
         if (!STATIC_MODE) md = await expandSourceIncludes(md);
         parts.push(`\n\n<!-- ===== ${s.slug} — ${s.title} ===== -->\n\n${md.trim()}`);
      }
      return parts.join("\n\n");
   }

   async function openFullMdModal() {
      if (buildingAll) return;
      buildingAll = true;
      try {
         fullMd = await buildJoinedMd();
         modalOpen = true;
         await tick();
         await mountFullMdEditor();
      } finally {
         buildingAll = false;
      }
   }

   async function mountFullMdEditor() {
      if (!cmHostEl || !(window as any).CodeMirror) return;
      await loadCmMode("markdown");
      const CM = (window as any).CodeMirror;
      cmHostEl.innerHTML = "";
      cmFullInstance = CM(cmHostEl, {
         value: fullMd,
         mode: "text/x-markdown",
         theme: "isadocs",
         lineNumbers: true,
         readOnly: "nocursor",
         viewportMargin: Infinity,
         lineWrapping: true,
         tabSize: 2,
         indentUnit: 2,
      });
      await tick();
      cmFullInstance?.refresh();
   }

   function closeFullMdModal() {
      modalOpen = false;
      cmFullInstance = null;
   }

   async function copyFullMd() {
      try {
         await navigator.clipboard.writeText(fullMd);
         copyFlash = true;
         setTimeout(() => { copyFlash = false; }, 1500);
      } catch {
         /* clipboard puede fallar en contextos inseguros */
      }
   }

   function downloadFullMd() {
      const blob = new Blob([fullMd], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project}-doc.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   }

   onMount(async () => {
      try {
         const res = await fetch(`/docs/${project}/_index.json`, { cache: "no-cache" });
         if (!res.ok) throw new Error(`No se encontró _index.json (HTTP ${res.status})`);
         manifest = await res.json();
         await Promise.all([loadMarked(), loadCodeMirror()]);
         // Render el shell ANTES de cargar la primera sección para que `.docs-content`
         // exista en el DOM y los post-procesadores (mermaid / CodeMirror / image-crop)
         // puedan correr en la carga inicial. Sin esto, la primera pestaña entra al
         // contenedor inexistente y los diagramas mermaid quedan como `<pre><code>`
         // hasta que el usuario hace clic en otra pestaña.
         loading = false;
         await tick();
         if (manifest && manifest.sections.length > 0) {
            await loadSection(manifest.sections[0].slug);
         }
      } catch (e: any) {
         error = e?.message ?? String(e);
         loading = false;
      }
   });
</script>

{#if loading}
   <div class="docs-loading">Cargando documentación…</div>
{:else if error}
   <div class="docs-error">⚠ {error}</div>
{:else if manifest}
   <div class="docs-shell">
      <aside class="docs-side">
         <div class="docs-side-head">
            <h2 class="docs-title">{manifest.title}</h2>
            {#if manifest.description}
               <p class="docs-desc">{manifest.description}</p>
            {/if}
            <button
               type="button"
               class="docs-dl-all"
               on:click={openFullMdModal}
               disabled={buildingAll}
               title="Ver el .md completo (todas las secciones unidas) en un visor"
            >
               {buildingAll ? "Generando…" : "📄 Ver MD completo"}
            </button>
         </div>
         <nav class="docs-nav">
            {#each manifest.sections as s}
               <button
                  type="button"
                  class="docs-nav-item"
                  class:active={activeSlug === s.slug}
                  on:click={() => loadSection(s.slug)}
               >
                  <span class="docs-nav-num">{(s.slug.split("/").pop() ?? s.slug).split("-")[0]}</span>
                  <span class="docs-nav-text">{s.title}</span>
               </button>
            {/each}
         </nav>
      </aside>
      {#if manifest.sections.find((s) => s.slug === activeSlug)?.kind === "prompts"}
         <article class="docs-panel" bind:this={contentEl}>
            <PatyIAPrompts />
         </article>
      {:else}
         <article class="docs-content" bind:this={contentEl}>
            {@html html}
         </article>
      {/if}
   </div>
{/if}

{#if modalOpen}
   <div class="md-modal-backdrop" on:click={closeFullMdModal} on:keydown={(e) => { if (e.key === "Escape") closeFullMdModal(); }} role="presentation">
      <div class="md-modal" on:click|stopPropagation role="dialog" aria-modal="true" tabindex="-1">
         <header class="md-modal-head">
            <h3>📄 Documentación completa — {project}</h3>
            <div class="md-modal-actions">
               <ButtonIconify
                  icon={copyFlash ? "mdi:check" : "mdi:content-copy"}
                  color={copyFlash ? "success" : "primary"}
                  title={copyFlash ? "Copiado" : "Copiar al portapapeles"}
                  on:click={copyFullMd}
               />
               <ButtonIconify
                  icon="mdi:download"
                  color="primary"
                  title="Descargar como .md"
                  on:click={downloadFullMd}
               />
               <ButtonIconify
                  icon="mdi:close"
                  title="Cerrar"
                  on:click={closeFullMdModal}
               />
            </div>
         </header>
         <div class="md-modal-body">
            <div class="md-cm-host" bind:this={cmHostEl}></div>
         </div>
      </div>
   </div>
{/if}

<style>
   .docs-loading,
   .docs-error {
      padding: 1.5rem;
      color: var(--is-color);
      opacity: 0.75;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.85rem;
   }
   .docs-error {
      color: var(--is-error);
      opacity: 1;
   }

   .docs-shell {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 1.25rem;
      align-items: stretch;
      flex: 1 1 auto;
      height: 100%;
      min-height: 0;
      overflow: hidden;
   }

   /* ----------------------- Sidebar ----------------------- */
   .docs-side {
      height: 100%;
      min-height: 0;
      overflow-y: auto;
      background: var(--is-bg-secondary);
      border: 1px solid var(--is-b-color);
      border-radius: 8px;
      padding: 1rem;
   }

   .docs-side-head {
      padding-bottom: 0.75rem;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid var(--is-b-color);
   }

   .docs-title {
      margin: 0 0 0.35rem 0;
      font-size: 0.95rem;
      color: var(--is-primary);
      font-weight: 600;
   }

   .docs-desc {
      margin: 0;
      font-size: 0.75rem;
      line-height: 1.4;
      color: var(--is-color);
      opacity: 0.7;
   }

   .docs-dl-all {
      margin-top: 0.6rem;
      width: 100%;
      padding: 0.4rem 0.6rem;
      font-size: 0.72rem;
      font-weight: 500;
      color: var(--is-primary);
      background: color-mix(in srgb, var(--is-primary) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--is-primary) 45%, transparent);
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.15s, color 0.15s;
   }
   .docs-dl-all:hover:not(:disabled) {
      background: var(--is-primary);
      color: var(--is-bg-primary);
   }
   .docs-dl-all:disabled {
      opacity: 0.6;
      cursor: progress;
   }

   /* ----------------------- Modal MD completo ----------------------- */
   .md-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 2rem;
   }
   .md-modal {
      background: var(--is-bg-primary);
      border: 1px solid var(--is-b-color);
      border-radius: 10px;
      width: min(1100px, 100%);
      height: min(85vh, 900px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55);
   }
   .md-modal-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem 1rem;
      background: var(--is-bg-secondary);
      border-bottom: 1px solid var(--is-b-color);
   }
   .md-modal-head h3 {
      margin: 0;
      font-size: 0.95rem;
      color: var(--is-primary);
      font-weight: 600;
   }
   .md-modal-actions {
      display: flex;
      gap: 0.4rem;
   }
   .md-modal-body {
      flex: 1 1 auto;
      min-height: 0;
      background: var(--is-bg-readonly);
   }
   .md-cm-host {
      width: 100%;
      height: 100%;
   }
   .md-cm-host :global(.CodeMirror) {
      height: 100% !important;
      font-size: 0.82rem;
   }

   .docs-nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
   }

   .docs-nav-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.45rem 0.6rem;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      color: var(--is-color);
      opacity: 0.85;
      font-size: 0.8rem;
      text-align: left;
      cursor: pointer;
      transition: background 0.12s, color 0.12s, border-color 0.12s, opacity 0.12s;
      font-family: inherit;
   }

   .docs-nav-item:hover {
      background: var(--is-bg-readonly);
      opacity: 1;
   }

   .docs-nav-item.active {
      background: var(--is-primary);
      color: white;
      opacity: 1;
      border-color: transparent;
   }

   .docs-nav-num {
      display: inline-block;
      min-width: 1.5em;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.7rem;
      opacity: 0.55;
   }

   .docs-nav-item.active .docs-nav-num {
      opacity: 0.85;
   }

   /* ----------------------- Content ----------------------- */
   .docs-content {
      background: var(--is-bg-secondary);
      border: 1px solid var(--is-b-color);
      border-radius: 8px;
      padding: 2rem 2.25rem;
      color: var(--is-color);
      font-size: 0.92rem;
      line-height: 1.65;
      height: 100%;
      min-height: 0;
      min-width: 0;
      overflow: auto;
   }

   .docs-panel {
      background: var(--is-bg-secondary);
      border: 1px solid var(--is-b-color);
      border-radius: 8px;
      padding: 1rem;
      color: var(--is-color);
      height: 100%;
      min-height: 0;
      min-width: 0;
      overflow: auto;
   }

   /* Markdown — alineado con la paleta global (--is-*) */
   :global(.docs-content h1) {
      font-size: 1.7rem;
      color: var(--is-primary);
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--is-b-color);
      font-weight: 600;
   }
   :global(.docs-content h2) {
      font-size: 1.25rem;
      color: var(--is-color);
      margin: 2rem 0 0.75rem 0;
      padding-bottom: 0.35rem;
      border-bottom: 1px solid var(--is-b-color);
      font-weight: 600;
   }
   :global(.docs-content h3) {
      font-size: 1.05rem;
      color: var(--is-color);
      margin: 1.5rem 0 0.5rem 0;
      font-weight: 600;
   }
   :global(.docs-content h4) {
      font-size: 0.95rem;
      color: var(--is-color);
      opacity: 0.9;
      margin: 1.25rem 0 0.35rem 0;
      font-weight: 600;
   }
   :global(.docs-content p) {
      margin: 0.6rem 0;
   }
   :global(.docs-content a) {
      color: var(--is-primary);
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 2px;
   }
   :global(.docs-content a:hover) {
      filter: brightness(1.15);
   }
   :global(.docs-content ul),
   :global(.docs-content ol) {
      padding-left: 1.4rem;
      margin: 0.5rem 0;
   }
   :global(.docs-content li) {
      margin: 0.2rem 0;
   }
   :global(.docs-content code) {
      background: var(--is-bg-readonly);
      border: 1px solid var(--is-b-color);
      border-radius: 3px;
      padding: 0.05rem 0.35rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.85em;
      color: var(--is-color);
   }
   :global(.docs-content pre) {
      background: var(--is-bg-readonly);
      border: 1px solid var(--is-b-color);
      border-radius: 6px;
      padding: 0.85rem 1rem;
      overflow-x: auto;
      font-size: 0.82rem;
      line-height: 1.55;
      margin: 0.75rem 0;
   }
   :global(.docs-content pre code) {
      background: transparent;
      border: 0;
      padding: 0;
      color: var(--is-color);
   }
   :global(.docs-content blockquote) {
      margin: 0.75rem 0;
      padding: 0.5rem 0.9rem;
      border-left: 3px solid var(--is-primary);
      background: var(--is-bg-readonly);
      color: var(--is-color);
      opacity: 0.9;
      font-style: italic;
      border-radius: 0 4px 4px 0;
   }
   :global(.docs-content table) {
      border-collapse: collapse;
      width: 100%;
      margin: 0.75rem 0;
      font-size: 0.85rem;
   }
   :global(.docs-content th),
   :global(.docs-content td) {
      border: 1px solid var(--is-b-color);
      padding: 0.4rem 0.65rem;
      text-align: left;
      vertical-align: top;
   }
   :global(.docs-content th) {
      background: var(--is-bg-readonly);
      color: var(--is-primary);
      font-weight: 600;
   }
   :global(.docs-content tr:nth-child(even) td) {
      background: color-mix(in srgb, var(--is-bg-readonly) 50%, transparent);
   }
   :global(.docs-content hr) {
      border: 0;
      border-top: 1px solid var(--is-b-color);
      margin: 1.5rem 0;
   }
   :global(.docs-content img) {
      max-width: 100%;
      border-radius: 6px;
      border: 1px solid var(--is-b-color);
   }
   /* Imagen recortada server-side: el filtro ya viene aplicado por el endpoint. */
   :global(.docs-content img.is-imgcrop) { filter: none; }
   :global(.docs-content canvas.is-imgcrop) {
      display: block;
      max-width: 100%;
      margin: 0.6rem auto;
      border: 1px solid var(--is-b-color);
      border-radius: 6px;
   }

   /* ----------------------- Recursos insertados ----------------------- */
   :global(.docs-content .embed-figure) {
      margin: 1.25rem 0 1.75rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
   }
   :global(.docs-content .embed-head) {
      display: flex;
      justify-content: flex-end;
   }
   :global(.docs-content .embed-open) {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: var(--is-primary);
      background: color-mix(in srgb, var(--is-primary) 12%, transparent);
      border: 1px solid color-mix(in srgb, var(--is-primary) 45%, transparent);
      text-decoration: none;
      transition: background 0.15s, color 0.15s;
   }
   :global(.docs-content .embed-open:hover) {
      background: var(--is-primary);
      color: var(--is-bg-primary);
   }
   :global(.docs-content .embed-image) {
      max-width: 100%;
      border-radius: 6px;
      border: 1px solid var(--is-b-color);
      background: #fff;
   }
   :global(.docs-content .embed-pdf) {
      width: 100%;
      max-height: 78vh;
      overflow: auto;
      border: 1px solid var(--is-b-color);
      border-radius: 6px;
      background: #2b2b2b;
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
   }
   :global(.docs-content .embed-pdf-page) {
      max-width: 100%;
      height: auto;
      background: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
      border-radius: 2px;
   }
   :global(.docs-content .embed-pdf-loading),
   :global(.docs-content .embed-pdf-error) {
      color: var(--is-color);
      opacity: 0.75;
      font-size: 0.85rem;
      padding: 1rem;
      text-align: center;
   }
   :global(.docs-content .embed-pdf-error) {
      color: var(--is-error);
      opacity: 1;
   }
   :global(.docs-content .is-mermaid) {
      background: var(--is-bg-readonly);
      border: 1px solid var(--is-b-color);
      border-radius: 6px;
      padding: 1rem;
      margin: 0.9rem 0;
      text-align: center;
      overflow-x: auto;
   }
   :global(.docs-content .is-mermaid svg) {
      max-width: 100%;
      height: auto;
   }

   /* ------------------------------------------------------------- */
   /* CodeMirror — syntax highlight (VS Code-like) sobre paleta     */
   /* ------------------------------------------------------------- */
   :global(.docs-content .is-codeblock) {
      margin: 0.85rem 0;
      border: 1px solid var(--is-b-color);
      border-radius: 6px;
      background: var(--is-bg-readonly);
      overflow: hidden;
   }
   :global(.docs-content .is-codeblock-tag) {
      display: inline-block;
      padding: 0.15rem 0.55rem;
      background: var(--is-bg-secondary);
      border-bottom: 1px solid var(--is-b-color);
      border-right: 1px solid var(--is-b-color);
      border-bottom-right-radius: 4px;
      color: var(--is-primary);
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 0.7rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
   }
   :global(.docs-content .is-codeblock-host) {
      font-size: 0.82rem;
      line-height: 1.55;
   }
   :global(.CodeMirror.cm-s-isadocs) {
      height: auto;
      background: var(--is-bg-readonly);
      color: var(--is-color);
      font-family: ui-monospace, "Cascadia Code", SFMono-Regular, Menlo, monospace;
   }
   :global(.cm-s-isadocs .CodeMirror-gutters) {
      background: var(--is-bg-readonly);
      border-right: 1px solid var(--is-b-color);
   }
   :global(.cm-s-isadocs .CodeMirror-linenumber) {
      color: var(--is-color);
      opacity: 0.4;
      padding: 0 0.5rem 0 0.35rem;
      font-size: 0.72rem;
   }
   :global(.cm-s-isadocs .CodeMirror-cursor) { display: none; }
   :global(.cm-s-isadocs .CodeMirror-selected) { background: color-mix(in srgb, var(--is-primary) 35%, transparent) !important; }
   :global(.cm-s-isadocs .CodeMirror-line) { color: var(--is-color); }
   /* VS Code Dark-like syntax colors */
   :global(.cm-s-isadocs .cm-comment)   { color: #6a9955; font-style: italic; }
   :global(.cm-s-isadocs .cm-keyword)   { color: #569cd6; }
   :global(.cm-s-isadocs .cm-atom)      { color: #569cd6; }
   :global(.cm-s-isadocs .cm-number)    { color: #b5cea8; }
   :global(.cm-s-isadocs .cm-def)       { color: #dcdcaa; }
   :global(.cm-s-isadocs .cm-variable)  { color: #9cdcfe; }
   :global(.cm-s-isadocs .cm-variable-2){ color: #9cdcfe; }
   :global(.cm-s-isadocs .cm-variable-3){ color: #4ec9b0; }
   :global(.cm-s-isadocs .cm-property)  { color: #9cdcfe; }
   :global(.cm-s-isadocs .cm-operator)  { color: inherit; }
   :global(.cm-s-isadocs .cm-string)    { color: #ce9178; }
   :global(.cm-s-isadocs .cm-string-2)  { color: #ce9178; }
   :global(.cm-s-isadocs .cm-meta)      { color: inherit; }
   :global(.cm-s-isadocs .cm-builtin)   { color: #4ec9b0; }
   :global(.cm-s-isadocs .cm-tag)       { color: #569cd6; }
   :global(.cm-s-isadocs .cm-attribute) { color: #9cdcfe; }
   :global(.cm-s-isadocs .cm-type)      { color: #4ec9b0; }
   :global(.cm-s-isadocs .cm-qualifier) { color: #4ec9b0; }
   :global(.cm-s-isadocs .cm-bracket)   { color: inherit; }
   :global(.cm-s-isadocs .cm-error)     { color: var(--is-error); }
   :global(.cm-s-isadocs .CodeMirror-matchingbracket) {
      color: var(--is-primary) !important;
      outline: 1px solid var(--is-b-color);
   }

   @media (max-width: 900px) {
      .docs-shell {
         grid-template-columns: 1fr;
      }
      .docs-side {
         position: static;
         max-height: none;
      }
   }
</style>
