/**
 * Dimensiones email-safe para imágenes de tickets (imgbb u otras).
 * - Si ancho < 400 o alto < 500: escalar hacia arriba conservando proporción.
 * - Si no: mostrar al 80% del tamaño nativo (sin expansión exagerada).
 */

export const TICKET_IMG_MIN_W = 400;
export const TICKET_IMG_MIN_H = 500;
/** Escala cuando la imagen ya supera los mínimos. */
export const TICKET_IMG_SCALE_LARGE = 0.8;

export function computeTicketImgDims(natW: number, natH: number): { w: number; h: number } {
	if (!natW || !natH) return { w: TICKET_IMG_MIN_W, h: TICKET_IMG_MIN_H };
	let w = natW;
	let h = natH;
	if (w < TICKET_IMG_MIN_W || h < TICKET_IMG_MIN_H) {
		const scale = Math.max(
			w < TICKET_IMG_MIN_W ? TICKET_IMG_MIN_W / w : 1,
			h < TICKET_IMG_MIN_H ? TICKET_IMG_MIN_H / h : 1,
		);
		w = Math.round(w * scale);
		h = Math.round(h * scale);
		return { w, h };
	}
	return {
		w: Math.round(w * TICKET_IMG_SCALE_LARGE),
		h: Math.round(h * TICKET_IMG_SCALE_LARGE),
	};
}

/** Envoltorio centrado con margen lateral (~5% cada lado). */
export function ticketImgHtml(url: string, natW: number, natH: number): string {
	const { w, h } = computeTicketImgDims(natW, natH);
	return (
		`<div style="text-align:center;margin:0.75rem auto;padding:0 5%;max-width:100%;box-sizing:border-box;">` +
		`<a href="${url}" target="_blank" rel="noopener noreferrer" ` +
		`style="display:inline-block;text-decoration:none;">` +
		`<img src="${url}" alt="" width="${w}" height="${h}" ` +
		`style="display:block;width:${w}px;height:${h}px;` +
		`min-width:${w}px;max-width:100%;min-height:${h}px;max-height:${h}px;` +
		`border:1px solid #ddd;border-radius:4px;background:#fff;cursor:zoom-in;">` +
		`</a></div>`
	);
}
