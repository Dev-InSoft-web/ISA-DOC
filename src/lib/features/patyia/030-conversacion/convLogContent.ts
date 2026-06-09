/** Partes de turno usuario (Responses API) guardadas en CONVERSACION_LOG.send.input */

export interface UserVisionParts {
	text: string;
	images: string[];
}

function pushImage(images: string[], ref: string): void {
	const n = ref.trim();
	if (!n) return;
	images.push(n);
}

function collectContentPart(part: unknown, texts: string[], images: string[]): void {
	if (!part || typeof part !== "object") return;
	const p = part as Record<string, unknown>;
	const type = String(p.type ?? "");
	if (type === "input_text") {
		const t = String(p.text ?? "").trim();
		if (t) texts.push(t);
		return;
	}
	if (type === "input_image") {
		if (typeof p.image_url === "string") pushImage(images, p.image_url);
		else if (typeof p.url === "string") pushImage(images, p.url);
		else if (typeof p.file_id === "string") {
			pushImage(images, `/api/patyia/openai/file/${encodeURIComponent(p.file_id)}?content=1`);
		}
	}
}

function collectUserTurn(turn: unknown, texts: string[], images: string[]): void {
	if (!turn || typeof turn !== "object") return;
	const t = turn as Record<string, unknown>;
	if (Array.isArray(t.content)) {
		for (const part of t.content) collectContentPart(part, texts, images);
	}
}

/**
 * Extrae texto e imágenes desde send.input del log (string plano o turno Responses con input_image).
 */
export function extractUserVisionFromSendInput(input: unknown, fallbackText = ""): UserVisionParts {
	if (typeof input === "string") {
		const t = input.trim() || fallbackText.trim();
		return { text: t, images: [] };
	}

	const texts: string[] = [];
	const images: string[] = [];

	if (Array.isArray(input)) {
		for (const item of input) {
			if (typeof item === "string") {
				const t = item.trim();
				if (t) texts.push(t);
			} else {
				collectUserTurn(item, texts, images);
			}
		}
	} else {
		collectUserTurn(input, texts, images);
	}

	const text = texts.join("\n\n").trim() || fallbackText.trim();
	return { text, images };
}

/** Mismo formato que Interacción en vivo: texto + markdown con imágenes embebidas. */
export function formatContenidoConImagenes(texto: string, imagenes: string[]): string {
	if (!imagenes.length) return texto;
	const imgs = imagenes.map((src, i) => `![Adjunto ${i + 1}](${src})`).join("\n\n");
	return texto ? `${texto}\n\n${imgs}` : imgs;
}

export function userContenidoFromConvLogSend(send: Record<string, unknown> | undefined, fallbackText = ""): string {
	if (!send) return fallbackText;
	const rawInput = send.input ?? send.text;
	const fb = typeof send.text === "string" ? send.text : fallbackText;
	const { text, images } = extractUserVisionFromSendInput(rawInput, fb);
	return formatContenidoConImagenes(text, images);
}
