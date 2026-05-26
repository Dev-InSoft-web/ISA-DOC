<script lang="ts">
	import { onMount } from "svelte";
	import { FlexLayout, Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";

	interface ImageItem {
		src: string;
		alt: string;
	}

	type AccionId = "imagenes";
	interface Accion {
		id: AccionId;
		label: string;
		icon: string;
	}
	const ACCIONES: Accion[] = [
		{ id: "imagenes", label: "Imágenes", icon: "mdi:image-multiple-outline" },
	];
	let accionActiva: AccionId = "imagenes";

	let prompt: string = "";
	let size: string = "1024x1024";
	let n: number = 1;
	let model: string = "gpt-image-1-mini";
	let loading: boolean = false;
	let error: string = "";
	let lastGenerated: ImageItem[] = [];
	let gallery: ImageItem[] = [];
	let galleryLoading: boolean = false;
	let galleryError: string = "";

	const SIZES = ["1024x1024", "1024x1536", "1536x1024", "auto"];
	const MODELS = ["gpt-image-1-mini", "gpt-image-1.5", "gpt-image-2", "gpt-image-1"];

	function errorToString(e: unknown): string {
		if (!e) return "";
		if (typeof e === "string") return e;
		if (e instanceof Error) return e.message;
		if (typeof e === "object") {
			const o = e as Record<string, unknown>;
			if (typeof o.message === "string") return o.message;
			try { return JSON.stringify(e); } catch { return String(e); }
		}
		return String(e);
	}

	async function cargarGaleria() {
		galleryError = "";
		galleryLoading = true;
		try {
			const r = await fetch("/api/patyia/openai/images/list");
			const data = (await r.json()) as { ok?: boolean; images?: Array<{ url: string; file: string }>; error?: string };
			if (!r.ok || data.ok === false) {
				galleryError = errorToString(data.error) || `Error HTTP ${r.status}`;
				return;
			}
			const arr = Array.isArray(data.images) ? data.images : [];
			gallery = arr.map((it) => ({ src: it.url, alt: it.file }));
		} catch (e) {
			galleryError = errorToString(e);
		} finally {
			galleryLoading = false;
		}
	}

	async function generar() {
		error = "";
		lastGenerated = [];
		const p = prompt.trim();
		if (!p) {
			error = "Escribe un prompt.";
			return;
		}
		loading = true;
		try {
			const r = await fetch("/api/patyia/openai/images/generate", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ prompt: p, size, n, model }),
			});
			let data: Record<string, unknown> = {};
			try { data = await r.json(); } catch { /* ignore */ }
			if (!r.ok || data.ok === false) {
				error = errorToString(data.error ?? data.message) || `Error HTTP ${r.status}`;
				return;
			}
			const arr = Array.isArray(data.images) ? (data.images as Array<{ url?: string; file?: string }>) : [];
			lastGenerated = arr
				.map((it, i) => ({ src: it.url || "", alt: it.file || `Imagen ${i + 1}` }))
				.filter((it) => it.src);
			if (!lastGenerated.length) error = "OpenAI no devolvió imágenes.";
			await cargarGaleria();
		} catch (e) {
			error = errorToString(e);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		cargarGaleria();
	});
</script>

<ProjectSectionLayout
	title="PatyIA · Actions"
	subtitle="Ejecuciones y herramientas"
	proyecto="PatyIA"
>
	<FlexLayout direction="row" items="stretch" style="width: 100%; flex: 1 1 auto; min-height: 0; overflow: hidden;">
		<!-- Panel izquierdo (20%): Navegación de acciones -->
		<nav class="custom-scrollbar nav-acciones" aria-label="Acciones">
			<h3>Acciones</h3>
			<ul>
				{#each ACCIONES as a}
					<li>
						<button
							type="button"
							class="nav-btn"
							class:active={accionActiva === a.id}
							on:click={() => (accionActiva = a.id)}
						>
							{a.label}
						</button>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- Panel derecho (80%): Ejecución de la acción seleccionada -->
		<div class="custom-scrollbar panel-ejecucion">
			{#if accionActiva === "imagenes"}
				<div class="acciones">
		<header>
			<h2>Generación de imágenes (OpenAI)</h2>
			<p class="sub">Llama la API de OpenAI desde el servidor de ISA-DOC. La llave nunca sale al navegador.</p>
		</header>

		<div class="form">
			<label>
				<span>Prompt</span>
				<textarea bind:value={prompt} rows="4" placeholder="Describe la imagen que quieres generar..."></textarea>
			</label>
			<div class="row">
				<label>
					<span>Modelo</span>
					<select bind:value={model}>
						{#each MODELS as m}
							<option value={m}>{m}</option>
						{/each}
					</select>
				</label>
				<label>
					<span>Tamaño</span>
					<select bind:value={size}>
						{#each SIZES as s}
							<option value={s}>{s}</option>
						{/each}
					</select>
				</label>
				<label>
					<span>Cantidad</span>
					<input type="number" min="1" max="4" bind:value={n} />
				</label>
				<button type="button" on:click={generar} disabled={loading}>
					{loading ? "Generando..." : "Generar"}
				</button>
			</div>
			{#if error}
				<div class="error">{error}</div>
			{/if}
		</div>

		{#if lastGenerated.length}
			<div class="ultimos">
				<h3>Últimas generadas</h3>
				<div class="grid">
					{#each lastGenerated as img}
						<a href={img.src} target="_blank" rel="noopener noreferrer">
							<img src={img.src} alt={img.alt} />
						</a>
					{/each}
				</div>
			</div>
		{/if}

		<section class="galeria">
			<div class="galeria-head">
				<h3>Galería</h3>
				<button type="button" class="ghost" on:click={cargarGaleria} disabled={galleryLoading}>
					{galleryLoading ? "Cargando..." : "Refrescar"}
				</button>
			</div>
			{#if galleryError}
				<div class="error">{galleryError}</div>
			{:else if !gallery.length && !galleryLoading}
				<p class="sub">Aún no hay imágenes generadas.</p>
			{:else}
				<div class="grid">
					{#each gallery as img}
						<a href={img.src} target="_blank" rel="noopener noreferrer" title={img.alt}>
							<img src={img.src} alt={img.alt} loading="lazy" />
						</a>
					{/each}
				</div>
			{/if}
		</section>
		</div>
			{/if}
		</div>
	</FlexLayout>
</ProjectSectionLayout>

<Toaster />

<style>
	.acciones {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		color: var(--is-color, #e5e7eb);
	}
	header h2 { margin: 0; font-size: 1.1rem; }
	h3 { margin: 0 0 0.5rem; font-size: 0.95rem; }
	.sub { margin: 0.25rem 0 0; opacity: 0.75; font-size: 0.85rem; }
	.form { display: flex; flex-direction: column; gap: 0.5rem; }
	.form label { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.85rem; }
	.form textarea,
	.form input,
	.form select {
		background: rgba(255,255,255,0.05);
		color: inherit;
		border: 1px solid rgba(255,255,255,0.15);
		border-radius: 4px;
		padding: 0.4rem 0.6rem;
		font: inherit;
	}
	.row { display: flex; gap: 0.75rem; align-items: end; flex-wrap: wrap; }
	.row label { flex: 0 0 auto; }
	button {
		padding: 0.5rem 1rem;
		background: var(--is-primary, #38bdf8);
		color: #001018;
		border: 0;
		border-radius: 4px;
		font-weight: 600;
		cursor: pointer;
	}
	button.ghost {
		background: transparent;
		color: inherit;
		border: 1px solid rgba(255,255,255,0.2);
	}
	button[disabled] { opacity: 0.6; cursor: progress; }
	.error {
		padding: 0.5rem 0.75rem;
		background: rgba(220,53,69,0.15);
		border: 1px solid rgba(220,53,69,0.4);
		border-radius: 4px;
		color: #ffb3b8;
		font-size: 0.85rem;
		white-space: pre-wrap;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.75rem;
	}
	.grid img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 6px;
		background: #000;
	}
	.galeria {
		margin-top: 0.5rem;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255,255,255,0.1);
	}
	.galeria-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
	}
	.galeria-head h3 { margin: 0; }
	.nav-acciones {
		flex: 0 0 20%;
		min-width: 0;
		min-height: 0;
		overflow: auto;
		padding: 0.75rem 0.5rem;
		border-right: 1px solid rgba(255,255,255,0.08);
	}
	.nav-acciones h3 {
		margin: 0 0 0.5rem;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
		color: color-mix(in srgb, var(--is-primary), var(--is-color) 45%);
	}
	.nav-acciones ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.25rem; }
	.nav-btn {
		width: 100%;
		text-align: left;
		background: transparent;
		color: inherit;
		border: 1px solid transparent;
		border-radius: 4px;
		padding: 0.45rem 0.6rem;
		font: inherit;
		font-weight: 500;
		cursor: pointer;
	}
	.nav-btn:hover { background: rgba(255,255,255,0.05); }
	.nav-btn.active {
		background: color-mix(in srgb, var(--is-primary), transparent 80%);
		border-color: color-mix(in srgb, var(--is-primary), transparent 50%);
		color: color-mix(in srgb, var(--is-primary), white 20%);
	}
	.panel-ejecucion {
		flex: 1 1 80%;
		min-width: 0;
		min-height: 0;
		overflow: auto;
	}
</style>
