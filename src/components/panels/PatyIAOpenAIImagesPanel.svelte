<script lang="ts">
	import { onMount } from "svelte";
	import { Button, FlexLayout, InputNumber, RichEditor, SelectEnum, Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";

	interface ImageItem {
		src: string;
		alt: string;
	}
	interface ChatMessage {
		role: "system" | "user" | "assistant";
		content: string;
	}

	type AccionId = "imagenes" | "texto" | "chat";
	const ACCIONES: Array<{ id: AccionId; label: string }> = [
		{ id: "imagenes", label: "Imágenes" },
		{ id: "texto", label: "Texto" },
		{ id: "chat", label: "Conversaciones" },
	];
	let accionActiva: AccionId = "imagenes";

	const TModeloImagen = {
		"gpt-image-1-mini": "gpt-image-1-mini",
		"gpt-image-1.5": "gpt-image-1.5",
		"gpt-image-2": "gpt-image-2",
		"gpt-image-1": "gpt-image-1",
	};
	const TTamanoImagen = {
		"1024x1024": "1024x1024",
		"1024x1536": "1024x1536",
		"1536x1024": "1536x1024",
		"auto": "auto",
	};
	const TModeloTexto = {
		"gpt-4o-mini": "gpt-4o-mini",
		"gpt-4o": "gpt-4o",
		"gpt-4.1-mini": "gpt-4.1-mini",
		"gpt-4.1": "gpt-4.1",
	};

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

	function htmlAPlano(html: string): string {
		if (!html) return "";
		const tmp = document.createElement("div");
		tmp.innerHTML = html;
		return (tmp.textContent ?? "").trim();
	}

	// --- Imágenes ---
	let imgPromptHtml: string = "";
	let imgSize: string = "1024x1024";
	let imgN: number = 1;
	let imgModel: string = "gpt-image-1-mini";
	let imgLoading: boolean = false;
	let imgError: string = "";
	let imgLastGenerated: ImageItem[] = [];
	let gallery: ImageItem[] = [];
	let galleryLoading: boolean = false;
	let galleryError: string = "";

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

	async function generarImagen() {
		imgError = "";
		imgLastGenerated = [];
		const p = htmlAPlano(imgPromptHtml);
		if (!p) {
			imgError = "Escribe un prompt.";
			return;
		}
		imgLoading = true;
		try {
			const r = await fetch("/api/patyia/openai/images/generate", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ prompt: p, size: imgSize, n: imgN, model: imgModel }),
			});
			let data: Record<string, unknown> = {};
			try { data = await r.json(); } catch { /* ignore */ }
			if (!r.ok || data.ok === false) {
				imgError = errorToString(data.error ?? data.message) || `Error HTTP ${r.status}`;
				return;
			}
			const arr = Array.isArray(data.images) ? (data.images as Array<{ url?: string; file?: string }>) : [];
			imgLastGenerated = arr
				.map((it, i) => ({ src: it.url || "", alt: it.file || `Imagen ${i + 1}` }))
				.filter((it) => it.src);
			if (!imgLastGenerated.length) imgError = "OpenAI no devolvió imágenes.";
			await cargarGaleria();
		} catch (e) {
			imgError = errorToString(e);
		} finally {
			imgLoading = false;
		}
	}

	// --- Texto ---
	let txtSystemHtml: string = "";
	let txtPromptHtml: string = "";
	let txtModel: string = "gpt-4o-mini";
	let txtTemperature: number = 0.7;
	let txtLoading: boolean = false;
	let txtError: string = "";
	let txtResult: string = "";
	let txtFinish: string = "";

	async function generarTexto() {
		txtError = "";
		txtResult = "";
		txtFinish = "";
		const p = htmlAPlano(txtPromptHtml);
		if (!p) {
			txtError = "Escribe un prompt.";
			return;
		}
		const s = htmlAPlano(txtSystemHtml);
		txtLoading = true;
		try {
			const r = await fetch("/api/patyia/openai/text/generate", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ prompt: p, system: s, model: txtModel, temperature: txtTemperature }),
			});
			let data: Record<string, unknown> = {};
			try { data = await r.json(); } catch { /* ignore */ }
			if (!r.ok || data.ok === false) {
				txtError = errorToString(data.error ?? data.message) || `Error HTTP ${r.status}`;
				return;
			}
			txtResult = typeof data.text === "string" ? data.text : "";
			txtFinish = typeof data.finish_reason === "string" ? data.finish_reason : "";
			if (!txtResult) txtError = "OpenAI no devolvió texto.";
		} catch (e) {
			txtError = errorToString(e);
		} finally {
			txtLoading = false;
		}
	}

	// --- Chat ---
	let chatSystemHtml: string = "";
	let chatInputHtml: string = "";
	let chatModel: string = "gpt-4o-mini";
	let chatTemperature: number = 0.7;
	let chatLoading: boolean = false;
	let chatError: string = "";
	let chatMessages: ChatMessage[] = [];

	function reiniciarChat() {
		chatMessages = [];
		chatError = "";
	}

	async function enviarChat() {
		chatError = "";
		const userText = htmlAPlano(chatInputHtml);
		if (!userText) {
			chatError = "Escribe un mensaje.";
			return;
		}
		const sys = htmlAPlano(chatSystemHtml);
		const payload: ChatMessage[] = [];
		if (sys) payload.push({ role: "system", content: sys });
		for (const m of chatMessages) payload.push({ role: m.role, content: m.content });
		payload.push({ role: "user", content: userText });

		chatLoading = true;
		try {
			const r = await fetch("/api/patyia/openai/chat/send", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ messages: payload, model: chatModel, temperature: chatTemperature }),
			});
			let data: Record<string, unknown> = {};
			try { data = await r.json(); } catch { /* ignore */ }
			if (!r.ok || data.ok === false) {
				chatError = errorToString(data.error ?? data.message) || `Error HTTP ${r.status}`;
				return;
			}
			const reply = data.message as ChatMessage | undefined;
			chatMessages = [
				...chatMessages,
				{ role: "user", content: userText },
				{ role: "assistant", content: reply?.content ?? "" },
			];
			chatInputHtml = "";
		} catch (e) {
			chatError = errorToString(e);
		} finally {
			chatLoading = false;
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

		<div class="custom-scrollbar panel-ejecucion">
			{#if accionActiva === "imagenes"}
				<div class="seccion">
					<header>
						<h2>Generación de imágenes (OpenAI)</h2>
						<p class="sub">Llama la API de OpenAI desde el servidor de ISA-DOC. La llave nunca sale al navegador.</p>
					</header>

					<RichEditor bind:value={imgPromptHtml} label="Prompt" />

					<FlexLayout direction="row" items="end" style="flex-wrap: wrap;">
						<SelectEnum bind:value={imgModel} enumValue={TModeloImagen} label="Modelo" />
						<SelectEnum bind:value={imgSize} enumValue={TTamanoImagen} label="Tamaño" />
						<InputNumber bind:value={imgN} label="Cantidad" required={false} />
						<Button onClick={generarImagen} disabled={imgLoading} loading={imgLoading}>Generar</Button>
					</FlexLayout>

					{#if imgError}
						<div class="error">{imgError}</div>
					{/if}

					{#if imgLastGenerated.length}
						<div>
							<h3>Últimas generadas</h3>
							<div class="grid">
								{#each imgLastGenerated as img}
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
							<Button variant="outlined" onClick={cargarGaleria} disabled={galleryLoading} loading={galleryLoading}>Refrescar</Button>
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
			{:else if accionActiva === "texto"}
				<div class="seccion">
					<header>
						<h2>Pruebas de texto (Chat Completions)</h2>
						<p class="sub">Una sola interacción con OpenAI. Útil para probar prompts aislados.</p>
					</header>

					<RichEditor bind:value={txtSystemHtml} label="Mensaje de sistema (opcional)" />
					<RichEditor bind:value={txtPromptHtml} label="Prompt" />

					<FlexLayout direction="row" items="end" style="flex-wrap: wrap;">
						<SelectEnum bind:value={txtModel} enumValue={TModeloTexto} label="Modelo" />
						<InputNumber bind:value={txtTemperature} label="Temperatura" required={false} />
						<Button onClick={generarTexto} disabled={txtLoading} loading={txtLoading}>Generar</Button>
					</FlexLayout>

					{#if txtError}
						<div class="error">{txtError}</div>
					{/if}
					{#if txtResult}
						<div class="resultado">
							<h3>Respuesta {txtFinish ? `· ${txtFinish}` : ""}</h3>
							<pre>{txtResult}</pre>
						</div>
					{/if}
				</div>
			{:else if accionActiva === "chat"}
				<div class="seccion">
					<header>
						<h2>Pruebas de conversaciones</h2>
						<p class="sub">Multi-turno con historial. Se mantiene el contexto entre mensajes.</p>
					</header>

					<RichEditor bind:value={chatSystemHtml} label="Mensaje de sistema (opcional)" />

					<FlexLayout direction="row" items="end" style="flex-wrap: wrap;">
						<SelectEnum bind:value={chatModel} enumValue={TModeloTexto} label="Modelo" />
						<InputNumber bind:value={chatTemperature} label="Temperatura" required={false} />
						<Button variant="outlined" color="neutral" onClick={reiniciarChat} disabled={chatLoading}>Reiniciar</Button>
					</FlexLayout>

					<div class="chat-historial">
						{#if !chatMessages.length}
							<p class="sub">Aún no hay mensajes en la conversación.</p>
						{:else}
							{#each chatMessages as m}
								<div class="msg msg-{m.role}">
									<strong>{m.role}</strong>
									<pre>{m.content}</pre>
								</div>
							{/each}
						{/if}
					</div>

					<RichEditor bind:value={chatInputHtml} label="Tu mensaje" />

					<FlexLayout direction="row" items="end" style="justify-content: flex-end;">
						<Button onClick={enviarChat} disabled={chatLoading} loading={chatLoading}>Enviar</Button>
					</FlexLayout>

					{#if chatError}
						<div class="error">{chatError}</div>
					{/if}
				</div>
			{/if}
		</div>
	</FlexLayout>
</ProjectSectionLayout>

<Toaster />

<style>
	.seccion {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		color: var(--is-color, #e5e7eb);
	}
	header h2 { margin: 0; font-size: 1.1rem; }
	h3 { margin: 0 0 0.5rem; font-size: 0.95rem; }
	.sub { margin: 0.25rem 0 0; opacity: 0.75; font-size: 0.85rem; }
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
	.resultado pre,
	.msg pre {
		background: rgba(255,255,255,0.04);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 4px;
		padding: 0.6rem 0.75rem;
		margin: 0.25rem 0 0;
		white-space: pre-wrap;
		word-break: break-word;
		font-family: inherit;
		font-size: 0.9rem;
	}
	.chat-historial {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-height: 360px;
		overflow: auto;
		padding: 0.5rem;
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 6px;
	}
	.msg strong {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}
	.msg-user pre {
		background: color-mix(in srgb, var(--is-primary), transparent 88%);
		border-color: color-mix(in srgb, var(--is-primary), transparent 70%);
	}
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
