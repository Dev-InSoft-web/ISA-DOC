<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { Button, ButtonIconify, FlexLayout, GridLayout, InputNumber, Modal, RichEditor, SelectEnum, TabItem, Tabs, Toaster } from "@ingenieria_insoft/ispsveltecomponents";
	import ChatMensajesView, { type MsgVista, type ArchivoCita, type OpenFileDetail } from "./ChatMensajesView.svelte";
	import { marked } from "marked";
	import ProjectSectionLayout from "./ProjectSectionLayout.svelte";
	import TsViewer from "../viewers/TsViewer.svelte";
	import ImageViewer from "../viewers/ImageViewer.svelte";
	import StorageActionsPanel from "./StorageActionsPanel.svelte";
	import { PROMPT_MOCKUPS, type PromptMockup } from "../../lib/patyia/promptMockups";
	import { calcularCostoTexto, calcularCostoImagen, formatearUsd, filasPricingTexto, filasPricingImagen, type UsageTexto, type FilaPricingTexto, type FilaPricingImagen } from "../../lib/patyia/openaiPricing";
	import { loadJson, saveJson, STORAGE_KEYS } from "../../lib/patyia/patyiaPersist";
	import { leerState, escribirState, migrarLegacy } from "../../lib/patyia/urlState";
	type AppStatePartial = { nivel?: unknown; subPruebas?: unknown; subStorage?: unknown };

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
	interface ImagenRun {
		ts: string;
		model: string;
		size: string;
		n: number;
		prompt: string;
		images: ImageItem[];
		usage: UsageTexto | null;
		costoUsd: number | null;
	}

	type AccionId = "imagenes" | "texto" | "chat" | "conversacion" | "storage" | "prompts";
	type NivelId = "pruebas" | "conversacion" | "storage";
	type SubPruebaId = "imagenes" | "texto" | "chat" | "prompts";
	const ACCIONES: Array<{ id: NivelId; label: string }> = [
		{ id: "pruebas", label: "Pruebas" },
		{ id: "conversacion", label: "Conversación BD" },
		{ id: "storage", label: "Storage" },
	];
	const ACCIONES_VALIDAS: ReadonlySet<NivelId> = new Set(ACCIONES.map((a) => a.id));
	const SUB_PRUEBAS: Array<{ id: SubPruebaId; label: string }> = [
		{ id: "imagenes", label: "Imágenes" },
		{ id: "texto", label: "Texto" },
		{ id: "chat", label: "Conversaciones" },
		{ id: "prompts", label: "Prompts" },
	];
	const SUB_PRUEBAS_VALIDAS: ReadonlySet<SubPruebaId> = new Set(SUB_PRUEBAS.map((a) => a.id));

	function leerTabDeUrl(): { nivel: NivelId; sub: SubPruebaId } {
		const fallback: { nivel: NivelId; sub: SubPruebaId } = { nivel: "pruebas", sub: "imagenes" };
		const st = leerState();
		const legacy = migrarLegacy({ tab: "nivel", tab2: "subPruebas" });
		const merged: AppStatePartial = { ...legacy, ...st };
		const rawNivel = String(merged.nivel ?? "");
		const rawSub = String(merged.subPruebas ?? "");
		// Compat: ?tab=imagenes|texto|chat → nivel=pruebas, sub=<tab>
		if (SUB_PRUEBAS_VALIDAS.has(rawNivel as SubPruebaId)) {
			return { nivel: "pruebas", sub: rawNivel as SubPruebaId };
		}
		const nivel: NivelId = ACCIONES_VALIDAS.has(rawNivel as NivelId) ? (rawNivel as NivelId) : fallback.nivel;
		const sub: SubPruebaId = SUB_PRUEBAS_VALIDAS.has(rawSub as SubPruebaId) ? (rawSub as SubPruebaId) : fallback.sub;
		return { nivel, sub };
	}

	function escribirTabEnUrl(nivel: NivelId, sub: SubPruebaId): void {
		escribirState({ nivel, subPruebas: nivel === "pruebas" ? sub : undefined });
	}

	const _initTab = typeof window !== "undefined" ? leerTabDeUrl() : { nivel: "pruebas" as NivelId, sub: "imagenes" as SubPruebaId };
	let accionActiva: NivelId = _initTab.nivel;
	let subPrueba: SubPruebaId = _initTab.sub;
	$: if (typeof window !== "undefined") escribirTabEnUrl(accionActiva, subPrueba);

	const TITULO_A_SUB: Record<string, SubPruebaId> = {
		Imágenes: "imagenes",
		Texto: "texto",
		Conversaciones: "chat",
		Prompts: "prompts",
	};

	function onSubTabClick(e: MouseEvent): void {
		const btn = (e.target as HTMLElement | null)?.closest('button[role="tab"]') as HTMLButtonElement | null;
		if (!btn) return;
		const sub = TITULO_A_SUB[(btn.textContent ?? "").trim()];
		if (sub) subPrueba = sub;
	}

	function infoAccionId(): AccionId {
		return accionActiva === "pruebas" ? subPrueba : (accionActiva as AccionId);
	}

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
		conversacion: {
			titulo: "Conversación BD · significado de cada input",
			campos: [
				{ campo: "iconversacion", tipo: "número", significado: "Identificador de la conversación en la BD de PatyIA (AYUDASCP_IA). En prod corresponde al id de p.ej. /soporte/?seccion=conversacion&id=2864." },
				{ campo: "SQL conversación", tipo: "texto", significado: "Consulta para recuperar la fila de la conversación. Usa el placeholder {id} que se reemplaza por el iconversacion ingresado." },
				{ campo: "SQL mensajes", tipo: "texto", significado: "Consulta para listar los mensajes de la conversación. También soporta {id}. Se rendea como hilo: intenta detectar columnas tipo rol/contenido y, si no, muestra cada fila como JSON." },
				{ campo: "Cargar", tipo: "acción", significado: "Ejecuta ambas consultas contra /api/patyia/db/exec y reconstruye la conversación. Útil para hacer experimentos sobre conversaciones reales." },
			],
		},
		storage: {
			titulo: "Storage · gestión de Files / Vector Stores / Skills",
			campos: [
				{ campo: "Files", tipo: "tab", significado: "Lista, filtra, sube, descarga (backup local) y elimina archivos en /v1/files. Soporta editar metadatos locales (categorías, tags, descripción) que se guardan solo en disco, no en OpenAI." },
				{ campo: "Vector Stores", tipo: "tab", significado: "Lista los vector stores con su status, número de archivos y tamaño. Próxima fase: ver archivos adjuntos y ejecutar update-complex (edit local → reupload → relink → unlink → delete)." },
				{ campo: "Skills", tipo: "tab", significado: "Lista las skills configuradas (API en rollout). Próxima fase: CRUD con backup local en data/openai-storage/skills/." },
				{ campo: "Backup local", tipo: "carpeta", significado: "Cada recurso descargado queda en data/openai-storage/{files,vector-stores,skills}/<id>/ con meta.json, local.json y content.<ext>. Los binarios están ignorados por git; los metadatos sí se versionan." },
			],
		},
		prompts: {
			titulo: "Pruebas de prompts",
			campos: [
				{ campo: "Prompt ID", tipo: "texto", significado: "Id pmpt_… emitido por OpenAI Prompts. Se envía como prompt.id a /v1/responses." },
				{ campo: "Versión", tipo: "texto", significado: "Versión opcional del prompt. Si está vacía OpenAI usa la última publicada." },
				{ campo: "Mensaje del usuario", tipo: "texto", significado: "Input que se inyecta al prompt como mensaje del usuario." },
				{ campo: "Elegir mock", tipo: "botón", significado: "Abre un modal con un catálogo de mensajes típicos de soporte para rellenar rápidamente el input." },
			],
		},
	};
	let infoOpen: boolean = false;
	$: infoActual = INFO_DOCS[accionActiva === "pruebas" ? subPrueba : (accionActiva as AccionId)];

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
		conversacion: `// POST /api/patyia/db/exec  (BD AYUDASCP_IA)
const id = 2864;
const r = await fetch("/api/patyia/db/exec", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    sql: \`SELECT * FROM MENSAJESCALIFICADOS WHERE iconversacion = \${id} ORDER BY imensaje\`
  }),
});
const data = await r.json();
// data => { ok, rows: [ { IMENSAJE, ICONVERSACION, CONTENIDO, BUTIL, IREFERENCIA } ] }`,
		storage: `// GET /api/patyia/openai/files?purpose=assistants&limit=100
const r = await fetch("/api/patyia/openai/files?purpose=assistants&limit=100");
const { ok, data } = await r.json();
// data => Array<{ id, filename, purpose, bytes, created_at, status }>

// POST /api/patyia/openai/files (multipart)
const fd = new FormData();
fd.append("file", archivo, archivo.name);
fd.append("purpose", "assistants");
await fetch("/api/patyia/openai/files", { method: "POST", body: fd });

// POST /api/patyia/openai/files/{id}/backup?vs=vs_xxx
// Descarga el contenido al servidor en data/openai-storage/files/{id}/

// PUT /api/patyia/openai/files/{id}/local-meta
// Guarda categorías/tags/descripción/notas en local.json (NO va a OpenAI)`,
		prompts: `// POST /api/patyia/openai/prompt-run
const r = await fetch("/api/patyia/openai/prompt-run", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    promptId: "pmpt_xxxxxxxxxxxxxxxxxxxxxxxx",
    promptVersion: "2",            // opcional
    input: "texto del usuario"
  }),
});
const data = await r.json();
// data => { ok, id, model, output_text, usage }`,
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
	const TBaseDatos = {
		"AYUDASCP_IA (prod)": "prod",
		"AYUDASCP_IA_STAGING": "staging",
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
	let imgHistorial: ImagenRun[] = [];

	// --- Persistencia local (hidratación diferida) ---
	let persistReady: boolean = false;
	const filasTexto: FilaPricingTexto[] = filasPricingTexto();
	const filasImagen: FilaPricingImagen[] = filasPricingImagen();

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
			if (!imgLastGenerated.length) imgError = "OpenAI no devolvió imágenes.";			if (imgLastGenerated.length) {
				imgHistorial = [
					{
						ts: new Date().toISOString(),
						model: imgModel,
						size: imgSize,
						n: imgN,
						prompt: p,
						images: imgLastGenerated.slice(),
						usage: imgLastUsage,
						costoUsd: imgLastCostoUsd,
					},
					...imgHistorial,
				];
			}			await cargarGaleria();
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

	// --- Conversación BD (reconstrucción por iconversacion) ---
	// Usa el endpoint `/api/patyia/conversacion/:id` (réplica del flujo de
	// PatyIA `GET /api/conversacion/:id`): lee CONVERSACIONES en BD, llama a
	// OpenAI con el HILO y mezcla MENSAJESCALIFICADOS + TIQUETESCONVERSACION.
	type SqlRow = Record<string, unknown>;

	let convId: number = 2864;
	let convDb: "prod" | "staging" = "prod";
	let convLoading: boolean = false;
	let convModalOpen: boolean = false;
	let tutorialOpen: boolean = false;

	let fileModalOpen: boolean = false;
	let fileLoading: boolean = false;
	let fileError: string = "";
	let fileMeta: { file_id: string; filename: string; bytes?: number; purpose?: string } | null = null;
	let fileTexto: string = "";
	let fileEsTexto: boolean = false;
	let fileEsMarkdown: boolean = false;
	let fileBlobUrl: string = "";

	async function abrirArchivoOpenAI(detail: OpenFileDetail): Promise<void> {
		cerrarArchivoOpenAI();
		fileMeta = { file_id: detail.fileId, filename: detail.filename };
		fileModalOpen = true;
		fileLoading = true;
		try {
			const qs = new URLSearchParams({ content: "1" });
			if (convVectorStoreIds.length) qs.set("vs", convVectorStoreIds.join(","));
			const r = await fetch(`/api/patyia/openai/file/${encodeURIComponent(detail.fileId)}?${qs.toString()}`);
			if (!r.ok) {
				const txt = await r.text();
				throw new Error(`HTTP ${r.status}: ${txt.slice(0, 200)}`);
			}
			const ct = r.headers.get("content-type") ?? "";
			const filenameSrv = r.headers.get("x-openai-filename") ?? detail.filename;
			const purpose = r.headers.get("x-openai-purpose") ?? "";
			fileEsTexto = ct.startsWith("text/") || ct.includes("json") || ct.includes("xml") || ct.includes("yaml");
			fileEsMarkdown = ct.includes("markdown") || /\.(md|markdown)$/i.test(filenameSrv);
			if (fileEsTexto) {
				fileTexto = await r.text();
			} else {
				const blob = await r.blob();
				fileBlobUrl = URL.createObjectURL(blob);
			}
			fileMeta = { file_id: detail.fileId, filename: filenameSrv, purpose };
		} catch (err) {
			fileError = err instanceof Error ? err.message : String(err);
		} finally {
			fileLoading = false;
		}
	}

	function cerrarArchivoOpenAI(): void {
		if (fileBlobUrl) {
			try { URL.revokeObjectURL(fileBlobUrl); } catch {}
		}
		fileBlobUrl = "";
		fileTexto = "";
		fileError = "";
		fileEsTexto = false;
		fileEsMarkdown = false;
		fileMeta = null;
		fileModalOpen = false;
	}

	onDestroy(() => {
		if (fileBlobUrl) {
			try { URL.revokeObjectURL(fileBlobUrl); } catch {}
		}
	});
	let convError: string = "";
	let convWarnings: string[] = [];
	let convRow: SqlRow | null = null;
	let convMensajes: SqlRow[] = [];
	let convFuenteMensajes: "openai" | "calificados" | "vacio" = "vacio";
	let convVectorStoreIds: string[] = [];

	const CONTENT_KEYS = ["contenido", "content", "mensaje", "texto", "respuesta", "prompt"] as const;
	const ROLE_KEYS = ["autor", "rol", "role", "tdmensaje", "itdmensaje", "tipo", "origen", "remitente"] as const;
	const ID_KEYS = ["iMensaje", "imensaje", "id"] as const;
	const FECHA_KEYS = ["fecha_hora", "fhcreacion", "fecha", "fhmensaje", "fhinsercion"] as const;

	function lowerKey(o: SqlRow, keys: readonly string[]): string | null {
		for (const k of keys) {
			if (k in o) return k;
		}
		const lower: Record<string, string> = {};
		for (const k of Object.keys(o)) lower[k.toLowerCase()] = k;
		for (const k of keys) {
			const real = lower[k.toLowerCase()];
			if (real) return real;
		}
		return null;
	}

	function pickStr(o: SqlRow, keys: readonly string[]): string {
		const k = lowerKey(o, keys);
		if (!k) return "";
		const v = o[k];
		return v == null ? "" : String(v);
	}

	interface ConversacionResp {
		ok: boolean;
		error?: string;
		conversacion?: SqlRow;
		mensajesOpenAI?: SqlRow[];
		mensajesCalificados?: SqlRow[];
		tiquete?: SqlRow[];
		vectorStoreIds?: string[];
		warnings?: string[];
	}

	async function cargarConversacionBD() {
		convError = "";
		convWarnings = [];
		convRow = null;
		convMensajes = [];
		convFuenteMensajes = "vacio";
		convVectorStoreIds = [];
		if (!Number.isFinite(convId) || convId <= 0) {
			convError = "Ingresa un iconversacion válido.";
			return;
		}
		convLoading = true;
		try {
			const r = await fetch(`/api/patyia/conversacion/${convId}?db=${encodeURIComponent(convDb)}`);
			const data = (await r.json()) as ConversacionResp;
			if (!r.ok || data.ok === false) {
				convError = errorToString(data.error) || `HTTP ${r.status}`;
				return;
			}
			convRow = data.conversacion ?? null;
			convVectorStoreIds = Array.isArray(data.vectorStoreIds) ? data.vectorStoreIds : [];
			const openai = Array.isArray(data.mensajesOpenAI) ? data.mensajesOpenAI : [];
			const calif = Array.isArray(data.mensajesCalificados) ? data.mensajesCalificados : [];
			if (openai.length) {
				convMensajes = openai;
				convFuenteMensajes = "openai";
			} else if (calif.length) {
				convMensajes = calif;
				convFuenteMensajes = "calificados";
			}
			convWarnings = Array.isArray(data.warnings) ? data.warnings : [];
		} catch (e) {
			convError = errorToString(e);
		} finally {
			convLoading = false;
		}
	}

	function reiniciarConvBD() {
		convRow = null;
		convMensajes = [];
		convWarnings = [];
		convFuenteMensajes = "vacio";
		convError = "";
		convVectorStoreIds = [];
	}

	function formatearFechaMsg(raw: string): string {
		if (!raw) return "";
		const n = Number(raw);
		if (Number.isFinite(n) && n > 1_000_000_000) {
			const ms = n < 1e12 ? n * 1000 : n;
			try { return new Date(ms).toLocaleString(); } catch { return raw; }
		}
		return raw;
	}

	function aMsgVista(m: SqlRow, i: number): MsgVista {
		const rol = pickStr(m, ROLE_KEYS) || "?";
		const contenido = pickStr(m, CONTENT_KEYS) || JSON.stringify(m, null, 2);
		const idMsg = pickStr(m, ID_KEYS) || String(i + 1);
		const fecha = formatearFechaMsg(pickStr(m, FECHA_KEYS));
		const lower = rol.toLowerCase();
		const esUsuario = lower.startsWith("usu") || lower === "user";
		const rawArchivos = (m as { archivos?: unknown }).archivos;
		const archivos: ArchivoCita[] = Array.isArray(rawArchivos)
			? (rawArchivos as ArchivoCita[]).filter((a) => a && typeof a.file_id === "string" && typeof a.marcador === "string")
			: [];

		return { idMsg, rol, contenido, fecha, esUsuario, archivos };
	}

	$: vistaMensajes = convMensajes.map(aMsgVista);

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
		txtHistorial = loadJson<TextoRun[]>(STORAGE_KEYS.txtHistorial, []);
		chatHistorial = loadJson<ChatRun[]>(STORAGE_KEYS.chatHistorial, []);
		imgHistorial = loadJson<ImagenRun[]>(STORAGE_KEYS.imgHistorial, []);
		persistReady = true;
		cargarGaleria();
		const tabUrl = leerTabDeUrl();
		accionActiva = tabUrl.nivel;
		subPrueba = tabUrl.sub;
		escribirTabEnUrl(accionActiva, subPrueba);
	});

	$: if (persistReady) saveJson(STORAGE_KEYS.txtHistorial, txtHistorial);
	$: if (persistReady) saveJson(STORAGE_KEYS.chatHistorial, chatHistorial);
	$: if (persistReady) saveJson(STORAGE_KEYS.imgHistorial, imgHistorial);

	let mockupInput: string = "";
	let pmtPromptId: string = "";
	let pmtPromptVersion: string = "";
	let mockupLoading: boolean = false;
	let mockupError: string = "";
	let mockupResult: string = "";
	let mockupSelId: string = "";
	let pmtMockOpen: boolean = false;

	function elegirMockup(m: PromptMockup): void {
		mockupSelId = m.id;
		mockupInput = m.text;
		pmtMockOpen = false;
	}

	async function enviarMockup(): Promise<void> {
		const input = mockupInput.trim();
		if (!input) { mockupError = "Escribe o selecciona un mock."; return; }
		if (!/^pmpt_[A-Za-z0-9]+$/.test(pmtPromptId.trim())) {
			mockupError = "Prompt ID inválido (esperado pmpt_…).";
			return;
		}
		mockupLoading = true;
		mockupError = "";
		mockupResult = "";
		try {
			const r = await fetch("/api/patyia/openai/prompt-run", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					promptId: pmtPromptId.trim(),
					promptVersion: pmtPromptVersion.trim() || undefined,
					input,
				}),
			});
			const j = await r.json();
			if (!j.ok) throw new Error(j.error ?? `HTTP ${r.status}`);
			mockupResult = String(j.output_text ?? "");
		} catch (e) {
			mockupError = e instanceof Error ? e.message : String(e);
		} finally {
			mockupLoading = false;
		}
	}
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
			{#if accionActiva === "pruebas"}
				<div on:click={onSubTabClick} role="presentation">
					<Tabs>
						<TabItem title="Imágenes" open={subPrueba === "imagenes"} />
						<TabItem title="Texto" open={subPrueba === "texto"} />
						<TabItem title="Conversaciones" open={subPrueba === "chat"} />
						<TabItem title="Prompts" open={subPrueba === "prompts"} />
					</Tabs>
				</div>
			{/if}
			{#if accionActiva === "pruebas" && subPrueba === "imagenes"}
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
			{:else if accionActiva === "pruebas" && subPrueba === "texto"}
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
			{:else if accionActiva === "pruebas" && subPrueba === "chat"}
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
			{:else if accionActiva === "pruebas" && subPrueba === "prompts"}
				<div class="seccion">
					<header class="seccion-head">
						<div>
							<h2>Pruebas de prompts</h2>
							<p class="sub">Ejecuta un prompt registrado en OpenAI (<code>pmpt_…</code>) contra <code>/v1/responses</code>. Usa los mocks como input rápido.</p>
						</div>
					</header>

					<GridLayout cells={2} items="start">
						<div>
							<label class="lbl" for="pmt-id">Prompt ID (pmpt_…)</label>
							<input id="pmt-id" type="text" bind:value={pmtPromptId} class="ta" placeholder="pmpt_xxxxxxxxxxxxxxxxxxxxxxxx" />
						</div>
						<div>
							<label class="lbl" for="pmt-ver">Versión (opcional)</label>
							<input id="pmt-ver" type="text" bind:value={pmtPromptVersion} class="ta" placeholder="latest" />
						</div>
					</GridLayout>

					<div>
						<FlexLayout direction="row" justify="space-between" items="center">
							<label class="lbl" for="mock-in">Mensaje del usuario</label>
							<Button onClick={() => (pmtMockOpen = true)} style="width: fit-content;">Elegir mock</Button>
						</FlexLayout>
						<textarea id="mock-in" bind:value={mockupInput} rows={6} class="ta"></textarea>
					</div>

					<FlexLayout direction="row" justify="end">
						<Button onClick={enviarMockup} disabled={mockupLoading} loading={mockupLoading} style="width: fit-content;">Probar</Button>
					</FlexLayout>

					{#if mockupError}
						<div class="error">{mockupError}</div>
					{/if}
					{#if mockupResult}
						<div class="resultado">
							<h3>Respuesta</h3>
							<pre>{mockupResult}</pre>
						</div>
					{/if}
				</div>
			{:else if accionActiva === "conversacion"}
				<div class="seccion">
					<header class="seccion-head">
						<div>
							<h2>Conversación BD (reconstrucción)</h2>
							<p class="sub">Carga una conversación real de PatyIA desde <code>AYUDASCP_IA</code> por su <code>iconversacion</code> (ej.: <code>2864</code>, equivalente a <code>?seccion=conversacion&amp;id=2864</code> en prod) para experimentar sobre ella.</p>
						</div>
						<ButtonIconify icon="mdi:information-outline" onClick={() => (infoOpen = true)} title="¿Qué hace cada input?" />
					</header>

					<GridLayout cells={4} items="end">
						<InputNumber bind:value={convId} label="iconversacion" required={true} />
						<SelectEnum bind:value={convDb} enumValue={TBaseDatos} label="Base de datos" />
						<Button onClick={cargarConversacionBD} disabled={convLoading} loading={convLoading} style="width: fit-content;">Cargar</Button>
						<ButtonIconify icon="mdi:close-circle-outline" onClick={reiniciarConvBD} disabled={convLoading} title="Limpiar" />
					</GridLayout>

					{#if convError}
						<div class="error">{convError}</div>
					{/if}

					{#if convWarnings.length}
						<div class="warnings">
							{#each convWarnings as w}<div>⚠ {w}</div>{/each}
						</div>
					{/if}

					{#if convRow}
						<section>
							<h3>Conversación #{convId}</h3>
							<div class="metrics">
								{#each Object.entries(convRow) as [k, v]}
									<span><strong>{k}:</strong> <code>{v == null ? "—" : String(v).slice(0, 120)}</code></span>
								{/each}
							</div>
						</section>
					{/if}

					{#if vistaMensajes.length}
						<section>
							<FlexLayout justify="between" items="center">
								<h3 style="margin: 0;">Mensajes ({vistaMensajes.length}) <span class="sub">· fuente: {convFuenteMensajes === "openai" ? "OpenAI threads" : "MENSAJESCALIFICADOS (fallback)"}</span></h3>
								<FlexLayout items="center">
									<ButtonIconify icon="mdi:help-circle-outline" onClick={() => (tutorialOpen = true)} title="¿Cómo se genera este hilo?" />
									<ButtonIconify icon="mdi:arrow-expand" onClick={() => (convModalOpen = true)} title="Abrir conversación ampliada" />
								</FlexLayout>
							</FlexLayout>
							<div class="chat-inline">
								<ChatMensajesView mensajes={vistaMensajes} on:openFile={(e) => abrirArchivoOpenAI(e.detail)} />
							</div>
						</section>
					{/if}
				</div>
			{:else if accionActiva === "storage"}
				<div class="seccion">
					<header class="seccion-head">
						<div>
							<h2>Storage · Files / Vector Stores / Skills</h2>
							<p class="seccion-sub">Gestión completa de recursos en OpenAI con backup local enriquecido.</p>
						</div>
						<FlexLayout items="center">
							<ButtonIconify icon="mdi:information-outline" onClick={() => (infoOpen = true)} title="¿Qué hace cada tab?" />
						</FlexLayout>
					</header>
					<StorageActionsPanel />
				</div>
			{/if}
		</div>
	</FlexLayout>
</ProjectSectionLayout>

{#if convModalOpen}
	<Modal
		bind:bshow={convModalOpen}
		onClose={() => (convModalOpen = false)}
		style="width: 95vw; max-width: 95vw; height: 95vh; max-height: 95vh;"
	>
		<h3 slot="title">Conversación #{convId} ({vistaMensajes.length} mensajes)</h3>
		<div class="conv-modal-body custom-scrollbar">
			<ChatMensajesView mensajes={vistaMensajes} on:openFile={(e) => abrirArchivoOpenAI(e.detail)} />
		</div>
	</Modal>
{/if}

{#if tutorialOpen}
	<Modal
		bind:bshow={tutorialOpen}
		onClose={() => (tutorialOpen = false)}
		style="width: min(820px, 95vw); max-width: 95vw; max-height: 90vh;"
	>
		<h3 slot="title">¿Cómo se genera el hilo de conversación?</h3>
		<div class="tutorial-body custom-scrollbar">
			<p class="lead">
				Los <strong>inputs (mensajes)</strong> NO se almacenan completos en la BD propia. La fuente primaria
				es la <strong>API de OpenAI</strong> (threads / conversations). La BD solo se usa como
				<em>fallback</em> y para metadatos.
			</p>

			<ol class="steps">
				<li>
					<strong>UI → endpoint.</strong> El panel hace
					<code>GET /api/patyia/conversacion/&lt;iconversacion&gt;?db=prod|staging</code>.
				</li>
				<li>
					<strong>BD: metadatos.</strong> Con un pool único (usuario cross-DB) se consulta
					<code>[AYUDASCP_IA].dbo.CONVERSACIONES</code> (o <code>_STAGING</code>) para obtener
					<code>ithreadexterno</code>, <code>itiquete</code> y demás campos. <em>(fuente: BD)</em>
				</li>
				<li>
					<strong>Decisión por prefijo de <code>ithreadexterno</code>:</strong>
					<ul>
						<li>
							<code>thread_*</code> → OpenAI Assistants v2:
							<code>GET /v1/threads/&lt;id&gt;/messages</code> con header
							<code>OpenAI-Beta: assistants=v2</code>. <em>(fuente: API)</em>
						</li>
						<li>
							<code>conv_*</code> → OpenAI Conversations:
							<code>GET /v1/conversations/&lt;id&gt;/items</code>. <em>(fuente: API)</em>
						</li>
						<li>
							Sin externo o llamada fallida → fallback BD:
							<code>SELECT * FROM [AYUDASCP_IA].dbo.MENSAJESCALIFICADOS WHERE iconversacion = &lt;id&gt;</code>.
							<em>(fuente: BD)</em>
						</li>
					</ul>
				</li>
				<li>
					<strong>Normalización.</strong> El endpoint devuelve cada mensaje como
					<code>&#123; fecha_hora, autor: "Usuario"|"Asistente", mensaje, archivos &#125;</code>.
				</li>
				<li>
					<strong>Mapeo en el panel.</strong> <code>aMsgVista()</code> convierte cada fila
					<code>SqlRow</code> a <code>MsgVista</code> usando llaves flexibles
					(<code>ROLE_KEYS</code>, <code>CONTENT_KEYS</code>, <code>ID_KEYS</code>,
					<code>FECHA_KEYS</code>) para soportar ambas fuentes.
				</li>
				<li>
					<strong>Render.</strong> <code>ChatMensajesView</code> recibe el arreglo y dibuja
					<code>FlexLayout</code> + <code>Card</code> (primary para usuario a la derecha, default a la
					izquierda) y aplica <code>marked</code> para convertir el markdown del mensaje a HTML.
				</li>
				<li>
					<strong>Vista ampliada.</strong> El botón <code>mdi:arrow-expand</code> abre un
					<code>Modal</code> 95 vw / 95 vh con el mismo render para lectura cómoda.
				</li>
			</ol>

			<h4 class="fuente-titulo">Resumen de fuentes</h4>
			<table class="fuente-tabla">
				<thead>
					<tr><th>Dato</th><th>Fuente</th><th>Detalle</th></tr>
				</thead>
				<tbody>
					<tr><td>Metadatos conversación</td><td><strong>BD</strong></td><td><code>CONVERSACIONES</code></td></tr>
					<tr><td>Mensajes (caso normal)</td><td><strong>API OpenAI</strong></td><td>threads o conversations</td></tr>
					<tr><td>Mensajes (fallback)</td><td><strong>BD</strong></td><td><code>MENSAJESCALIFICADOS</code></td></tr>
					<tr><td>Tiquete asociado</td><td><strong>BD</strong></td><td><code>TIQUETES</code> vía <code>itiquete</code></td></tr>
				</tbody>
			</table>

			<p class="nota">
				En este hilo la fuente activa es:
				<strong>{convFuenteMensajes === "openai" ? "API OpenAI" : convFuenteMensajes === "calificados" ? "BD (MENSAJESCALIFICADOS)" : "vacío"}</strong>.
			</p>
		</div>
	</Modal>
{/if}

{#if fileModalOpen}
	<Modal
		bind:bshow={fileModalOpen}
		onClose={cerrarArchivoOpenAI}
		style="width: 95vw; max-width: 95vw; height: 95vh; max-height: 95vh;"
	>
		<h3 slot="title">
			{fileMeta?.filename ?? "Archivo"} <span class="sub">· {fileMeta?.file_id ?? ""}</span>
		</h3>
		<div class="file-modal-body custom-scrollbar">
			{#if fileLoading}
				<p>Cargando archivo desde OpenAI…</p>
			{:else if fileError}
				<div class="error">{fileError}</div>
			{:else if fileEsMarkdown}
				<div class="prose">{@html marked.parse(fileTexto, { async: false })}</div>
			{:else if fileEsTexto}
				<pre class="file-pre">{fileTexto}</pre>
			{:else if fileBlobUrl}
				<p>
					Archivo binario.
					<a href={fileBlobUrl} download={fileMeta?.filename ?? "archivo"} class="btn-descargar">
						Descargar {fileMeta?.filename ?? "archivo"}
					</a>
				</p>
				{#if /\.(png|jpe?g|gif|webp|svg)$/i.test(fileMeta?.filename ?? "")}
					<img src={fileBlobUrl} alt={fileMeta?.filename ?? ""} class="file-img" />
				{:else if /\.pdf$/i.test(fileMeta?.filename ?? "")}
					<iframe src={fileBlobUrl} title={fileMeta?.filename ?? "PDF"} class="file-iframe"></iframe>
				{/if}
			{/if}
		</div>
	</Modal>
{/if}

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
				<TsViewer value={SNIPPETS[accionActiva === "pruebas" ? subPrueba : (accionActiva as AccionId)]} height="320px" />
			</div>
		</div>
	</Modal>
{/if}

<ImageViewer bind:bshow={viewerOpen} src={viewerSrc} alt={viewerAlt} metadata={viewerMeta} />

{#if pmtMockOpen}
	<Modal
		bind:bshow={pmtMockOpen}
		onClose={() => (pmtMockOpen = false)}
		style="width: min(900px, 95vw); max-width: 95vw; max-height: 85vh;"
	>
		<h3 slot="title">Elegir mock</h3>
		<div class="mocks-modal-body custom-scrollbar">
			<section class="mocks-grid">
				{#each PROMPT_MOCKUPS as m}
					<button
						type="button"
						class="mock-card"
						class:active={mockupSelId === m.id}
						on:click={() => elegirMockup(m)}
					>
						<strong>{m.label}</strong>
						<span class="sub">{m.text}</span>
					</button>
				{/each}
			</section>
		</div>
	</Modal>
{/if}

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
	.resultado pre {
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
	.chat-inline {
		max-height: 520px;
		overflow: auto;
		margin-top: 0.5rem;
	}
	.conv-modal-body {
		height: 100%;
		overflow: hidden;
		padding: 0.5rem;
	}
	.tutorial-body {
		padding: 1rem 1.25rem;
		overflow: auto;
		max-height: calc(90vh - 4rem);
		line-height: 1.55;
		font-size: 0.92rem;
	}
	.tutorial-body .lead { margin-top: 0; opacity: 0.9; }
	.tutorial-body .steps { padding-left: 1.2rem; display: flex; flex-direction: column; gap: 0.6rem; }
	.tutorial-body .steps ul { margin: 0.3rem 0 0 1rem; padding: 0; }
	.tutorial-body code {
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
		font-size: 0.85em;
		background: rgba(255, 255, 255, 0.08);
		padding: 0.05rem 0.35rem;
		border-radius: 3px;
	}
	.fuente-titulo { margin: 1.25rem 0 0.5rem; }
	.fuente-tabla { border-collapse: collapse; width: 100%; font-size: 0.88rem; }
	.fuente-tabla th,
	.fuente-tabla td {
		border: 1px solid rgba(255, 255, 255, 0.15);
		padding: 0.35rem 0.6rem;
		text-align: left;
	}
	.fuente-tabla th { background: rgba(255, 255, 255, 0.05); }
	.tutorial-body .nota {
		margin-top: 1rem;
		padding: 0.5rem 0.75rem;
		border-left: 3px solid var(--is-primary);
		background: color-mix(in srgb, var(--is-primary), transparent 90%);
		border-radius: 0 4px 4px 0;
	}
	.file-modal-body {
		height: 100%;
		overflow: auto;
		padding: 1rem 1.25rem;
		font-size: 0.92rem;
		line-height: 1.55;
	}
	.file-modal-body .prose :global(h1) { font-size: 1.4rem; margin: 0.6rem 0 0.4rem; }
	.file-modal-body .prose :global(h2) { font-size: 1.2rem; margin: 0.6rem 0 0.4rem; }
	.file-modal-body .prose :global(h3) { font-size: 1.05rem; margin: 0.5rem 0 0.3rem; }
	.file-modal-body .prose :global(pre) {
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		padding: 0.7rem;
		overflow: auto;
		font-size: 0.85rem;
	}
	.file-modal-body .prose :global(code) {
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
		background: rgba(255, 255, 255, 0.08);
		padding: 0.05rem 0.3rem;
		border-radius: 3px;
		font-size: 0.85em;
	}
	.file-modal-body .prose :global(table) { border-collapse: collapse; margin: 0.5rem 0; }
	.file-modal-body .prose :global(th),
	.file-modal-body .prose :global(td) {
		border: 1px solid rgba(255, 255, 255, 0.15);
		padding: 0.3rem 0.55rem;
	}
	.file-pre {
		white-space: pre-wrap;
		word-break: break-word;
		font-family: ui-monospace, "Cascadia Code", "Consolas", monospace;
		font-size: 0.85rem;
		background: rgba(0, 0, 0, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 4px;
		padding: 0.75rem;
		margin: 0;
	}
	.btn-descargar {
		display: inline-block;
		margin-left: 0.5rem;
		padding: 0.3rem 0.65rem;
		background: var(--is-primary);
		color: #fff;
		border-radius: 4px;
		text-decoration: none;
	}
	.file-img { max-width: 100%; height: auto; display: block; margin-top: 0.75rem; }
	.file-iframe { width: 100%; height: calc(95vh - 8rem); border: 0; margin-top: 0.75rem; }
	.warnings {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.82rem;
		color: #fbbf24;
		background: rgba(251, 191, 36, 0.08);
		border: 1px solid rgba(251, 191, 36, 0.25);
		border-radius: 4px;
		padding: 0.4rem 0.6rem;
	}
	.sub {
		font-size: 0.75rem;
		opacity: 0.6;
		font-weight: normal;
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

	.mocks-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 0.5rem;
		margin: 0.5rem 0;
	}
	.mocks-modal-body { padding: 0.25rem 0.5rem; max-height: 70vh; overflow: auto; }
	.mock-card {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.6rem;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		text-align: left;
		cursor: pointer;
		color: inherit;
	}
	.mock-card:hover { background: rgba(255, 255, 255, 0.08); }
	.mock-card.active { border-color: var(--color-primary, #4ea1ff); background: rgba(78, 161, 255, 0.12); }
	.mock-card .sub { font-size: 0.8rem; opacity: 0.75; }
	.lbl { display: block; font-size: 0.85rem; margin-bottom: 0.25rem; opacity: 0.85; }
	.ta {
		width: 100%;
		background: rgba(0, 0, 0, 0.25);
		color: inherit;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 4px;
		padding: 0.5rem;
		font-family: inherit;
		font-size: 0.9rem;
		resize: vertical;
	}
</style>
