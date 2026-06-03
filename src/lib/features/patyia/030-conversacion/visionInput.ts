/** Utilidades compartidas (staging ISA-DOC) para input multimodal en /v1/responses. */

export type ResponsesInputPart =
	| { type: "input_text"; text: string }
	| { type: "input_image"; image_url: string };

const MAX_IMAGES = 10;
const MAX_IMAGE_BYTES = 5_000_000;
const DATA_URL_RE = /^data:image\/(png|jpe?g|webp|gif);base64,/i;
const HTTP_URL_RE = /^https?:\/\//i;

function isValidImageRef(url: string): boolean {
	const u = url.trim();
	return DATA_URL_RE.test(u) || HTTP_URL_RE.test(u);
}

function approxBase64Bytes(dataUrl: string): number {
	const i = dataUrl.indexOf("base64,");
	if (i < 0) return 0;
	const b64 = dataUrl.slice(i + 7).replace(/\s/g, "");
	return Math.floor((b64.length * 3) / 4);
}

export function parseImagenesField(raw: unknown): string[] {
	if (!Array.isArray(raw)) return [];
	const out: string[] = [];
	for (const item of raw) {
		if (typeof item === "string" && isValidImageRef(item)) out.push(item.trim());
		else if (item && typeof item === "object" && typeof (item as { dataUrl?: string }).dataUrl === "string") {
			const u = (item as { dataUrl: string }).dataUrl.trim();
			if (isValidImageRef(u)) out.push(u);
		}
	}
	return out.slice(0, MAX_IMAGES);
}

export function extractVisionFromMessage(
	text: string,
	promptHtml?: string,
	extraImages?: string[],
): { text: string; imageUrls: string[] } {
	const seen = new Set<string>();
	const imageUrls: string[] = [];
	const add = (u: string) => {
		const n = u.trim();
		if (!n || seen.has(n) || !isValidImageRef(n)) return;
		if (DATA_URL_RE.test(n) && approxBase64Bytes(n) > MAX_IMAGE_BYTES) return;
		seen.add(n);
		imageUrls.push(n);
	};

	const html = (promptHtml ?? "").trim();
	if (html) {
		for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) add(m[1]);
	}
	for (const u of extraImages ?? []) add(u);

	return { text: (text ?? "").trim(), imageUrls: imageUrls.slice(0, MAX_IMAGES) };
}

export function buildOpenAIResponsesInput(
	text: string,
	imagenes?: unknown,
	mensajeHtml?: string,
): string | { role: "user"; content: ResponsesInputPart[] }[] {
	const extra = parseImagenesField(imagenes);
	const { text: plain, imageUrls } = extractVisionFromMessage(text, mensajeHtml, extra);
	if (!imageUrls.length) return plain;
	const msg = plain || "Analiza la(s) imagen(es) adjunta(s).";
	return [{
		role: "user",
		content: [
			{ type: "input_text", text: msg },
			...imageUrls.map((image_url) => ({ type: "input_image" as const, image_url })),
		],
	}];
}
