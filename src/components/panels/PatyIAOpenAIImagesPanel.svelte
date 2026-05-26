<script lang="ts">
	import { onMount } from "svelte";
	import { Button, ButtonIconify, FlexLayout, GridLayout, InputNumber, Modal, RichEditor, SelectEnum, Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import TsViewer from "../viewers/TsViewer.svelte";
	import ImageViewer from "../viewers/ImageViewer.svelte";
	import { calcularCostoTexto, calcularCostoImagen, formatearUsd, type UsageTexto } from "../../lib/patyia/openaiPricing";

	interface ImageItem {
		src: string;
		alt: string;
	}
	interface ChatMessage {
		role: "system" | "user" | "assistant";
		content: string;
	}
	interface TextoRun {
		ts: string;
		model: string;
		temperature: number;
		system: string;
		prompt: string;
		text: string;
		finish: string;
		usage: UsageTexto | null;
		costoUsd: number | null;
	}
	interface ChatRun {
		ts: string;
		model: string;
		temperature: number;
		mensajes: ChatMessage[];
		usage: UsageTexto | null;
		costoUsd: number | null;
	}

	type AccionId = "imagenes" | "texto" | "chat";
	const ACCIONES: Array<{ id: AccionId; label: string }> = [
		{ id: "imagenes", label: "Imágenes" },
		{ id: "texto", label: "Texto" },
		{ id: "chat", label: "Conversaciones" },
	];
	let accionActiva: AccionId = "imagenes";

	interface InfoCampo {
		campo: string;
		tipo: string;
		significado: string;
	}
	const INFO_DOCS: Record<AccionId, { titulo: string; campos: InfoCampo[] }> = {
		imagenes: {
			titulo: "Imágenes · significado de cada input",
			campos: [
				{ campo: "Prompt", tipo: "texto", significado: "Descripción en lenguaje natural de la imagen que quieres generar. Entre más específico (sujeto, estilo, composición, paleta, iluminación) mejor el resultado." },
				{ campo: "Modelo", tipo: "enum", significado: "Familia de modelo de OpenAI. 'gpt-image-1-mini' es rápido y económico, '1.5' y '2' mejoran calidad/coherencia a mayor costo. 'gpt-image-1' requiere verificación de organización." },
				{ campo: "Tamaño", tipo: "enum", significado: "Resolución de la imagen. '1024x1024' es cuadrado, '1024x1536' vertical, '1536x1024' horizontal, 'auto' lo decide el modelo según el prompt." },
				{ campo: "Cantidad", tipo: "número", significado: "Cuántas variantes generar en una sola llamada. Más imágenes = más costo y más tiempo. Típicamente 1–4." },
			],
		},
		texto: {
			titulo: "Texto · significado de cada input",
			campos: [
				{ campo: "Mensaje de sistema", tipo: "texto (opcional)", significado: "Instrucciones de alto nivel para el modelo: rol, tono, formato de salida, restricciones. No es la pregunta, es el 'cómo debe comportarse'." },
				{ campo: "Prompt", tipo: "texto", significado: "El mensaje del usuario: la pregunta, tarea o entrada concreta que el modelo debe procesar." },
				{ campo: "Modelo", tipo: "enum", significado: "Modelo de chat de OpenAI. 'gpt-4o-mini' es rápido y barato, 'gpt-4o' y 'gpt-4.1' ofrecen mayor calidad de razonamiento." },
				{ campo: "Temperatura", tipo: "número (0–2)", significado: "Aleatoriedad de la respuesta. 0 = determinista y conservador; 1 = creativo balanceado; 2 = muy creativo / errático. Típico 0.2–0.8." },
			],
		},
		chat: {
			titulo: "Conversaciones · significado de cada input",
			campos: [
				{ campo: "Mensaje de sistema", tipo: "texto (opcional)", significado: "Se aplica antes de cada llamada como rol del asistente. Define personalidad/restricciones para todo el hilo." },
				{ campo: "Modelo", tipo: "enum", significado: "Modelo que responde en cada turno. Puedes cambiarlo entre mensajes; el historial se sigue enviando." },
				{ campo: "Temperatura", tipo: "número (0–2)", significado: "Aleatoriedad del modelo. Igual que en Texto: bajo = preciso, alto = creativo." },
				{ campo: "Tu mensaje", tipo: "texto", significado: "El nuevo turno del usuario. Se añade al historial y se envía completo al modelo para mantener el contexto de la conversación." },
				{ campo: "Reiniciar", tipo: "acción", significado: "Borra el historial local. El siguiente mensaje arranca una conversación nueva." },
			],
		},
	};
	let infoOpen: boolean = false;
	$: infoActual = INFO_DOCS[accionActiva];

	const SNIPPETS: Record<AccionId, string> = {
		imagenes: `// POST /api/patyia/openai/images/generate
const r = await fetch("/api/patyia/openai/images/generate", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    prompt: "un gato astronauta, estilo acuarela",
    model: "gpt-image-1-mini",   // o gpt-image-1.5 / gpt-image-2
    size:  "1024x1024",          // 1024x1024 | 1024x1536 | 1536x1024 | auto
    n: 1                          // 1..4
  }),
});
const data = await r.json();
// data => { ok, model, size, n, images: [{ url, file? }], usage, created }`,
		texto: `// POST /api/patyia/openai/text/generate
const r = await fetch("/api/patyia/openai/text/generate", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    system: "Eres un asistente conciso.", // opcional
    prompt: "Resume en 3 vi\u00f1etas qu\u00e9 es Astro.",
    model:  "gpt-4o-mini",                 // gpt-4o-mini | gpt-4o | gpt-4.1 | gpt-4.1-mini
    temperature: 0.7                       // 0..2
  }),
});
const data = await r.json();
// data => { ok, model, text, finish_reason, usage: { prompt_tokens, completion_tokens, total_tokens } }`,
		chat: `// POST /api/patyia/openai/chat/send
const historial = [
  { role: "system",    content: "Eres un asistente t\u00e9cnico." },
  { role: "user",      content: "Hola, \u00bfqu\u00e9 sabes de Svelte?" },
  { role: "assistant", content: "Svelte es un compilador de componentes..." },
  { role: "user",      content: "\u00bfQu\u00e9 versi\u00f3n debo usar?" },
];
const r = await fetch("/api/patyia/openai/chat/send", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    messages: historial,
    model: "gpt-4o-mini",
    temperature: 0.7
  }),
});
const data = await r.json();
// data => { ok, model, message: { role, content }, usage }`,
	};

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
	let imgLastUsage: UsageTexto | null = null;
	let imgLastCostoUsd: number | null = null;
	let gallery: ImageItem[] = [];
	let galleryLoading: boolean = false;
	let galleryError: string = "";

	// --- Viewer de imágenes ---
	let viewerOpen: boolean = false;
	let viewerSrc: string = "";
	let viewerAlt: string = "";
	let viewerMeta: Record<string, string | number | null | undefined> = {};

	function abrirImagenGenerada(img: ImageItem) {
		viewerSrc = img.src;
		viewerAlt = img.alt;
		const costoUnitario = calcularCostoImagen(imgModel, 1);
		viewerMeta = {
			archivo: img.alt,
			modelo: imgModel,
			tamaño: imgSize,
			lote: `${imgN} imágen(es)`,
			costoUsd: costoUnitario,
			usage: imgLastUsage ? JSON.stringify(imgLastUsage) : null,
		};
		viewerOpen = true;
	}

	function abrirImagenGaleria(img: ImageItem) {
		viewerSrc = img.src;
		viewerAlt = img.alt;
		viewerMeta = { archivo: img.alt, origen: "galer\u00eda" };
		viewerOpen = true;
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

	async function generarImagen() {
		imgError = "";
		imgLastGenerated = [];
		imgLastUsage = null;
		imgLastCostoUsd = null;
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
			imgLastUsage = (data.usage as UsageTexto | null) ?? null;
			imgLastCostoUsd = calcularCostoImagen(imgModel, imgLastGenerated.length || imgN);
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
	let txtLastUsage: UsageTexto | null = null;
	let txtLastCostoUsd: number | null = null;
	let txtHistorial: TextoRun[] = [];

	function limpiarHistorialTexto() {
		txtHistorial = [];
	}

	async function generarTexto() {
		txtError = "";
		txtResult = "";
		txtFinish = "";
		txtLastUsage = null;
		txtLastCostoUsd = null;
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
			txtLastUsage = (data.usage as UsageTexto | null) ?? null;
			const modelUsado = typeof data.model === "string" ? data.model : txtModel;
			const costo = calcularCostoTexto(modelUsado, txtLastUsage);
			txtLastCostoUsd = costo ? costo.totalUsd : null;
			if (!txtResult) {
				txtError = "OpenAI no devolvió texto.";
			} else {
				txtHistorial = [
					{
						ts: new Date().toISOString(),
						model: modelUsado,
						temperature: txtTemperature,
						system: s,
						prompt: p,
						text: txtResult,
						finish: txtFinish,
						usage: txtLastUsage,
						costoUsd: txtLastCostoUsd,
					},
					...txtHistorial,
				];
			}
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
	let chatLastUsage: UsageTexto | null = null;
	let chatLastCostoUsd: number | null = null;
	let chatHistorial: ChatRun[] = [];

	function reiniciarChat() {
		if (chatMessages.length) {
			chatHistorial = [
				{
					ts: new Date().toISOString(),
					model: chatModel,
					temperature: chatTemperature,
					mensajes: chatMessages.slice(),
					usage: chatLastUsage,
					costoUsd: chatLastCostoUsd,
				},
				...chatHistorial,
			];
		}
		chatMessages = [];
		chatLastUsage = null;
		chatLastCostoUsd = null;
		chatError = "";
	}

	function limpiarHistorialChat() {
		chatHistorial = [];
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
			chatLastUsage = (data.usage as UsageTexto | null) ?? null;
			const modelUsado = typeof data.model === "string" ? data.model : chatModel;
			const costo = calcularCostoTexto(modelUsado, chatLastUsage);
			chatLastCostoUsd = costo ? costo.totalUsd : null;
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
					<header class="seccion-head">
						<div>
							<h2>Generación de imágenes (OpenAI)</h2>
							<p class="sub">Llama la API de OpenAI desde el servidor de ISA-DOC. La llave nunca sale al navegador.</p>
						</div>
						<ButtonIconify icon="mdi:information-outline" onClick={() => (infoOpen = true)} title="¿Qué hace cada input?" />
					</header>

					<RichEditor bind:value={imgPromptHtml} label="Prompt" />

					<GridLayout cells={3} items="end">
						<SelectEnum bind:value={imgModel} enumValue={TModeloImagen} label="Modelo" />
						<SelectEnum bind:value={imgSize} enumValue={TTamanoImagen} label="Tamaño" />
						<InputNumber bind:value={imgN} label="Cantidad" required={false} />
					</GridLayout>

					<FlexLayout direction="row" justify="end">
						<Button onClick={generarImagen} disabled={imgLoading} loading={imgLoading} style="width: fit-content;">Generar</Button>
					</FlexLayout>

					{#if imgError}
						<div class="error">{imgError}</div>
					{/if}

					{#if imgLastGenerated.length}
						<div>
							<h3>Últimas generadas</h3>
							<div class="metrics">
								<span><strong>Cantidad:</strong> {imgLastGenerated.length}</span>
								<span><strong>Modelo:</strong> <code>{imgModel}</code></span>
								<span><strong>Costo estimado:</strong> {formatearUsd(imgLastCostoUsd)}</span>
								{#if imgLastUsage}
									<span><strong>Tokens OpenAI:</strong> {JSON.stringify(imgLastUsage)}</span>
								{/if}
							</div>
							<div class="grid">
								{#each imgLastGenerated as img}
									<button type="button" class="img-btn" on:click={() => abrirImagenGenerada(img)} title="Ver detalle">
										<img src={img.src} alt={img.alt} />
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<section class="galeria">
						<div class="galeria-head">
							<h3>Galería</h3>
							<ButtonIconify icon="mdi:refresh" onClick={cargarGaleria} disabled={galleryLoading} loading={galleryLoading} title="Refrescar" />
						</div>
						{#if galleryError}
							<div class="error">{galleryError}</div>
						{:else if !gallery.length && !galleryLoading}
							<p class="sub">Aún no hay imágenes generadas.</p>
						{:else}
							<div class="grid">
								{#each gallery as img}
									<button type="button" class="img-btn" on:click={() => abrirImagenGaleria(img)} title={img.alt}>
										<img src={img.src} alt={img.alt} loading="lazy" />
									</button>
								{/each}
							</div>
						{/if}
					</section>
				</div>
			{:else if accionActiva === "texto"}
				<div class="seccion">
					<header class="seccion-head">
						<div>
							<h2>Pruebas de texto (Chat Completions)</h2>
							<p class="sub">Una sola interacción con OpenAI. Útil para probar prompts aislados.</p>
						</div>
						<ButtonIconify icon="mdi:information-outline" onClick={() => (infoOpen = true)} title="¿Qué hace cada input?" />
					</header>

					<GridLayout cells={2} items="start">
						<RichEditor bind:value={txtSystemHtml} label="Mensaje de sistema (opcional)" />
						<RichEditor bind:value={txtPromptHtml} label="Prompt" />
					</GridLayout>

					<GridLayout cells={2} items="end">
						<SelectEnum bind:value={txtModel} enumValue={TModeloTexto} label="Modelo" />
						<InputNumber bind:value={txtTemperature} label="Temperatura" required={false} />
					</GridLayout>

					<FlexLayout direction="row" justify="end">
						<Button onClick={generarTexto} disabled={txtLoading} loading={txtLoading} style="width: fit-content;">Generar</Button>
					</FlexLayout>

					{#if txtError}
						<div class="error">{txtError}</div>
					{/if}
					{#if txtResult}
						<div class="resultado">
							<h3>Respuesta {txtFinish ? `· ${txtFinish}` : ""}</h3>
							<div class="metrics">
								<span><strong>Modelo:</strong> <code>{txtModel}</code></span>
								<span><strong>Tokens entrada:</strong> {txtLastUsage?.prompt_tokens ?? "—"}</span>
								<span><strong>Tokens salida:</strong> {txtLastUsage?.completion_tokens ?? "—"}</span>
								<span><strong>Total:</strong> {txtLastUsage?.total_tokens ?? "—"}</span>
								<span><strong>Costo:</strong> {formatearUsd(txtLastCostoUsd)}</span>
							</div>
							<pre>{txtResult}</pre>
						</div>
					{/if}

					<section class="galeria">
						<div class="galeria-head">
							<h3>Historial de textos</h3>
							<ButtonIconify icon="mdi:delete-outline" onClick={limpiarHistorialTexto} disabled={!txtHistorial.length} title="Limpiar historial" />
						</div>
						{#if !txtHistorial.length}
							<p class="sub">Aún no hay generaciones en esta sesión.</p>
						{:else}
							<table class="hist-table">
								<thead>
									<tr>
										<th>Cuando</th>
										<th>Modelo</th>
										<th>Tº</th>
										<th>Prompt</th>
										<th>Respuesta</th>
										<th>In</th>
										<th>Out</th>
										<th>Tot</th>
										<th>USD</th>
									</tr>
								</thead>
								<tbody>
									{#each txtHistorial as h}
										<tr>
											<td><code>{h.ts.replace("T", " ").slice(0, 19)}</code></td>
											<td><code>{h.model}</code></td>
											<td>{h.temperature}</td>
											<td class="truncate" title={h.prompt}>{h.prompt}</td>
											<td class="truncate" title={h.text}>{h.text}</td>
											<td>{h.usage?.prompt_tokens ?? "—"}</td>
											<td>{h.usage?.completion_tokens ?? "—"}</td>
											<td>{h.usage?.total_tokens ?? "—"}</td>
											<td>{formatearUsd(h.costoUsd)}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{/if}
					</section>
				</div>
			{:else if accionActiva === "chat"}
				<div class="seccion">
					<header class="seccion-head">
						<div>
							<h2>Pruebas de conversaciones</h2>
							<p class="sub">Multi-turno con historial. Se mantiene el contexto entre mensajes.</p>
						</div>
						<ButtonIconify icon="mdi:information-outline" onClick={() => (infoOpen = true)} title="¿Qué hace cada input?" />
					</header>

					<RichEditor bind:value={chatSystemHtml} label="Mensaje de sistema (opcional)" />

					<GridLayout cells={2} items="end">
						<SelectEnum bind:value={chatModel} enumValue={TModeloTexto} label="Modelo" />
						<InputNumber bind:value={chatTemperature} label="Temperatura" required={false} />
					</GridLayout>

					<FlexLayout direction="row" justify="end">
						<ButtonIconify icon="mdi:restart" onClick={reiniciarChat} disabled={chatLoading} title="Reiniciar conversación" />
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

					<FlexLayout direction="row" justify="end">
						<Button onClick={enviarChat} disabled={chatLoading} loading={chatLoading} style="width: fit-content;">Enviar</Button>
					</FlexLayout>

					{#if chatError}
						<div class="error">{chatError}</div>
					{/if}

					{#if chatLastUsage}
						<div class="metrics">
							<span><strong>Último turno · Modelo:</strong> <code>{chatModel}</code></span>
							<span><strong>Tokens entrada:</strong> {chatLastUsage.prompt_tokens ?? "—"}</span>
							<span><strong>Tokens salida:</strong> {chatLastUsage.completion_tokens ?? "—"}</span>
							<span><strong>Total:</strong> {chatLastUsage.total_tokens ?? "—"}</span>
							<span><strong>Costo turno:</strong> {formatearUsd(chatLastCostoUsd)}</span>
						</div>
					{/if}

					<section class="galeria">
						<div class="galeria-head">
							<h3>Historial de conversaciones</h3>
							<ButtonIconify icon="mdi:delete-outline" onClick={limpiarHistorialChat} disabled={!chatHistorial.length} title="Limpiar historial" />
						</div>
						{#if !chatHistorial.length}
							<p class="sub">Las conversaciones reiniciadas aparecerán aquí.</p>
						{:else}
							<div class="hist-chats">
								{#each chatHistorial as h, idx}
									<details>
										<summary>
											<code>{h.ts.replace("T", " ").slice(0, 19)}</code>
											· <code>{h.model}</code>
											· {h.mensajes.length} msgs
											· ult. tokens {h.usage?.total_tokens ?? "—"}
											· {formatearUsd(h.costoUsd)}
											<span class="sub">(conversación #{txtHistorial.length + chatHistorial.length - idx})</span>
										</summary>
										<div class="chat-historial">
											{#each h.mensajes as m}
												<div class="msg msg-{m.role}">
													<strong>{m.role}</strong>
													<pre>{m.content}</pre>
												</div>
											{/each}
										</div>
									</details>
								{/each}
							</div>
						{/if}
					</section>
				</div>
			{/if}
		</div>
	</FlexLayout>
</ProjectSectionLayout>

{#if infoOpen}
	<Modal bind:bshow={infoOpen} onClose={() => (infoOpen = false)}>
		<h3 slot="title">{infoActual.titulo}</h3>
		<div class="info-modal-body custom-scrollbar">
			<table class="info-table">
				<thead>
					<tr>
						<th>Campo</th>
						<th>Tipo</th>
						<th>Significado</th>
					</tr>
				</thead>
				<tbody>
					{#each infoActual.campos as c}
						<tr>
							<td><strong>{c.campo}</strong></td>
							<td><code>{c.tipo}</code></td>
							<td>{c.significado}</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<h4 class="snippet-title">Ejemplo de petición</h4>
			<div class="snippet-host">
				<TsViewer value={SNIPPETS[accionActiva]} height="320px" />
			</div>
		</div>
	</Modal>
{/if}

<ImageViewer bind:bshow={viewerOpen} src={viewerSrc} alt={viewerAlt} metadata={viewerMeta} />

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
	.seccion-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
	}
	.info-modal-body {
		max-width: 720px;
		max-height: 70vh;
		overflow: auto;
		padding: 1rem 1.25rem 1.25rem;
	}
	.info-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.88rem;
	}
	.info-table th,
	.info-table td {
		text-align: left;
		vertical-align: top;
		padding: 0.5rem 0.6rem;
		border-bottom: 1px solid rgba(255,255,255,0.08);
	}
	.info-table thead th {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
		border-bottom: 1px solid rgba(255,255,255,0.18);
	}
	.info-table code {
		font-size: 0.78rem;
		padding: 0.1rem 0.35rem;
		background: rgba(255,255,255,0.06);
		border-radius: 3px;
	}
	.snippet-title {
		margin: 1rem 0 0.4rem;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.75;
	}
	.snippet-host {
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 6px;
		overflow: hidden;
	}
	.metrics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem 1rem;
		padding: 0.5rem 0.75rem;
		background: rgba(255,255,255,0.04);
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 4px;
		font-size: 0.82rem;
	}
	.metrics code {
		font-size: 0.78rem;
		padding: 0.05rem 0.3rem;
		background: rgba(255,255,255,0.06);
		border-radius: 3px;
	}
	.hist-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.78rem;
	}
	.hist-table th,
	.hist-table td {
		text-align: left;
		vertical-align: top;
		padding: 0.35rem 0.5rem;
		border-bottom: 1px solid rgba(255,255,255,0.08);
	}
	.hist-table thead th {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}
	.hist-table .truncate {
		max-width: 200px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.hist-table code {
		font-size: 0.72rem;
		padding: 0.05rem 0.3rem;
		background: rgba(255,255,255,0.06);
		border-radius: 3px;
	}
	.hist-chats {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.hist-chats details {
		border: 1px solid rgba(255,255,255,0.1);
		border-radius: 4px;
		padding: 0.4rem 0.6rem;
	}
	.hist-chats summary {
		cursor: pointer;
		font-size: 0.82rem;
	}
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
	.img-btn {
		padding: 0;
		border: 1px solid transparent;
		background: transparent;
		border-radius: 6px;
		cursor: pointer;
		overflow: hidden;
		transition: border-color 0.15s ease, transform 0.15s ease;
	}
	.img-btn:hover { border-color: color-mix(in srgb, var(--is-primary), transparent 50%); transform: translateY(-1px); }
	.img-btn:focus-visible { outline: 2px solid var(--is-primary); outline-offset: 2px; }
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
