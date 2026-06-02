/**
 * Remove background para assets de tickets.
 *
 * Motores (HUGGINGFACE_REMOVE_BG_ENGINE):
 *   rmbg  — ONNX briaai/RMBG-1.4 desde Hugging Face Hub (local, recomendado)
 *   fal   — Inference Providers fal-ai + briaai/RMBG-2.0 (requiere créditos)
 *   canvas — solo píxeles blancos puros (rápido, baja calidad)
 */
import { HfInference } from "@huggingface/inference";
import sharp from "sharp";
import { getHuggingfaceApiKey } from "./huggingface-env.mjs";

const HF_FAL_MODEL = (process.env.HUGGINGFACE_REMOVE_BG_MODEL ?? "briaai/RMBG-2.0").trim();
const HF_FAL_PROVIDER = (process.env.HUGGINGFACE_REMOVE_BG_PROVIDER ?? "fal-ai").trim();
const RMBG_VARIANT = (process.env.HUGGINGFACE_RMBG_VARIANT ?? "briaai").trim();

/** @returns {Promise<import('rmbg/models').RMBGModel>} */
async function rmbgModelFactory() {
	const { createBriaaiModel, createModnetModel, createU2netpModel } = await import("rmbg/models");
	if (RMBG_VARIANT === "modnet") return createModnetModel();
	if (RMBG_VARIANT === "u2netp") return createU2netpModel();
	return createBriaaiModel();
}

/**
 * BRIA RMBG-1.4 (pesos en HF Hub, inferencia ONNX local).
 * @param {Buffer} imageBuffer
 */
export async function removeBackgroundRmbg(imageBuffer) {
	const { rmbg } = await import("rmbg");
	const model = await rmbgModelFactory();
	const out = await rmbg(imageBuffer, { model });
	return Buffer.isBuffer(out) ? out : Buffer.from(out);
}

/**
 * @param {Buffer} imageBuffer
 */
async function removeBackgroundFal(imageBuffer) {
	const hf = new HfInference(getHuggingfaceApiKey());
	const blob = new Blob([imageBuffer], { type: "image/png" });
	const out = await hf.imageSegmentation({
		model: HF_FAL_MODEL,
		provider: HF_FAL_PROVIDER,
		data: blob,
	});
	if (out instanceof Blob) return Buffer.from(await out.arrayBuffer());
	if (Array.isArray(out) && out[0]?.mask) return applySegmentationMask(imageBuffer, out[0].mask);
	throw new Error("Respuesta fal/RMBG no reconocida");
}

/**
 * @param {Buffer} src
 * @param {string} maskB64
 */
async function applySegmentationMask(src, maskB64) {
	const maskRaw = maskB64.includes(",") ? maskB64.split(",")[1] : maskB64;
	const maskBuf = Buffer.from(maskRaw, "base64");
	const meta = await sharp(src).metadata();
	const w = meta.width ?? 1;
	const h = meta.height ?? 1;
	const mask = await sharp(maskBuf).resize(w, h).grayscale().raw().toBuffer();
	const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	for (let i = 0, j = 0; i < data.length; i += 4, j++) {
		data[i + 3] = mask[j] ?? 0;
	}
	return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

/**
 * Solo lienzo #FFF (último recurso).
 * @param {Buffer} imageBuffer
 * @param {number} minChannel
 */
export async function removeCanvasWhiteOnly(imageBuffer, minChannel = 254) {
	const { data, info } = await sharp(imageBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		if (Math.min(r, g, b) >= minChannel && Math.max(r, g, b) - Math.min(r, g, b) <= 2) {
			data[i + 3] = 0;
		}
	}
	return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

/**
 * @param {Buffer} imageBuffer
 * @param {{ engine?: string, allowFallback?: boolean }} [opts]
 */
export async function removeBackgroundFromBuffer(imageBuffer, opts = {}) {
	const allowFallback = opts.allowFallback !== false;
	const engine = (opts.engine ?? process.env.HUGGINGFACE_REMOVE_BG_ENGINE ?? "rmbg").trim().toLowerCase();

	const tryRmbg = async () => {
		console.log(`  motor rmbg (${RMBG_VARIANT}, ONNX briaai/RMBG-1.4 en HF Hub)…`);
		return removeBackgroundRmbg(imageBuffer);
	};
	const tryFal = async () => {
		console.log(`  motor fal (${HF_FAL_MODEL})…`);
		return removeBackgroundFal(imageBuffer);
	};
	const tryCanvas = async () => {
		console.log("  motor canvas (solo blanco puro)…");
		return removeCanvasWhiteOnly(imageBuffer);
	};

	const chain =
		engine === "fal"
			? [tryFal, tryRmbg, tryCanvas]
			: engine === "canvas"
				? [tryCanvas]
				: [tryRmbg, tryFal, tryCanvas];

	for (let i = 0; i < chain.length; i++) {
		try {
			return await chain[i]();
		} catch (err) {
			const msg = err instanceof Error ? err.message : String(err);
			if (!allowFallback || i === chain.length - 1) throw err;
			console.warn(`  ⚠ ${msg.slice(0, 180)}`);
		}
	}
	throw new Error("remove-bg: sin motor disponible");
}
