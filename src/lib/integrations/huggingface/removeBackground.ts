import { HfInference } from "@huggingface/inference";

const DEFAULT_MODEL = "briaai/RMBG-2.0";

function resolveApiKey(explicit?: string): string {
	const key = (explicit ?? import.meta.env.VITE_HF_API_KEY ?? import.meta.env.HUGGINGFACE_API_KEY ?? "").trim();
	if (!key) {
		throw new Error(
			"Falta VITE_HF_API_KEY (o HUGGINGFACE_API_KEY) en .env para removeBackground.",
		);
	}
	return key;
}

/**
 * Envía una imagen a Hugging Face (imageSegmentation / RMBG) y devuelve object URL PNG con α.
 */
export async function removeBackground(imageFile: File, apiKey?: string): Promise<string> {
	const hf = new HfInference(resolveApiKey(apiKey));
	try {
		const out = await hf.imageSegmentation({
			model: DEFAULT_MODEL,
			provider: "fal-ai",
			data: imageFile,
		});

		if (out instanceof Blob) {
			return URL.createObjectURL(out);
		}
		if (Array.isArray(out) && out[0]?.mask) {
			const blob = await maskDataUrlToPngBlob(imageFile, out[0].mask);
			return URL.createObjectURL(blob);
		}
		throw new Error("Formato de respuesta HF no soportado");
	} catch (error) {
		console.error("Error en la segmentación de la imagen:", error);
		throw error;
	}
}

async function maskDataUrlToPngBlob(file: File, mask: string): Promise<Blob> {
	const src = await createImageBitmap(file);
	const maskRaw = mask.includes(",") ? mask.split(",")[1] : mask;
	const maskBytes = Uint8Array.from(atob(maskRaw), (c) => c.charCodeAt(0));
	const maskBmp = await createImageBitmap(new Blob([maskBytes], { type: "image/png" }));

	const canvas = document.createElement("canvas");
	canvas.width = src.width;
	canvas.height = src.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas 2D no disponible");

	ctx.drawImage(src, 0, 0);
	const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	const mCanvas = document.createElement("canvas");
	mCanvas.width = src.width;
	mCanvas.height = src.height;
	const mCtx = mCanvas.getContext("2d");
	if (!mCtx) throw new Error("Canvas máscara no disponible");
	mCtx.drawImage(maskBmp, 0, 0, src.width, src.height);
	const maskData = mCtx.getImageData(0, 0, src.width, src.height);

	for (let i = 0; i < imgData.data.length; i += 4) {
		imgData.data[i + 3] = maskData.data[i];
	}
	ctx.putImageData(imgData, 0, 0);
	return new Promise((resolve, reject) => {
		canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob falló"))), "image/png");
	});
}
