import { TICKET_BORDER_CARD } from "./ticketColors";

/**
 * Dimensiones email-safe para imágenes de tickets (imgbb u otras).
 * - Panorámicas (p. ej. flowchart LR ancho): encajar por ancho máximo, sin inflar altura.
 * - Si ancho < 400 o alto < 500 (y no panorámica): escalar hacia arriba con tope de ancho.
 * - Si no: 80% del nativo, siempre capped a TICKET_IMG_MAX_W.
 */

export const TICKET_IMG_MIN_W = 400;
export const TICKET_IMG_MIN_H = 500;
/** Ancho máximo de visualización (cuerpo del ticket / correo). */
export const TICKET_IMG_MAX_W = 900;
/** Escala cuando la imagen ya supera los mínimos. */
export const TICKET_IMG_SCALE_LARGE = 0.8;

/** Flowcharts horizontales: ancho grande y poca altura. */
function esPanoramica(natW: number, natH: number): boolean {
	return natW >= 700 && natH < 400 && natW / natH > 2.2;
}

function capAncho(w: number, h: number, natW: number, natH: number): { w: number; h: number } {
	if (w <= TICKET_IMG_MAX_W) return { w, h };
	const nw = TICKET_IMG_MAX_W;
	return { w: nw, h: Math.max(1, Math.round((h * nw) / w)) };
}

export function computeTicketImgDims(natW: number, natH: number): { w: number; h: number } {
	if (!natW || !natH) return { w: TICKET_IMG_MIN_W, h: TICKET_IMG_MIN_H };

	if (esPanoramica(natW, natH)) {
		let w = Math.round(Math.min(natW * TICKET_IMG_SCALE_LARGE, TICKET_IMG_MAX_W));
		let h = Math.round((w * natH) / natW);
		if (w < TICKET_IMG_MIN_W) {
			w = TICKET_IMG_MIN_W;
			h = Math.round((w * natH) / natW);
		}
		return capAncho(w, h, natW, natH);
	}

	let w = natW;
	let h = natH;
	if (w < TICKET_IMG_MIN_W || h < TICKET_IMG_MIN_H) {
		const scale = Math.max(
			w < TICKET_IMG_MIN_W ? TICKET_IMG_MIN_W / w : 1,
			h < TICKET_IMG_MIN_H ? TICKET_IMG_MIN_H / h : 1,
		);
		w = Math.round(w * scale);
		h = Math.round(h * scale);
	} else {
		w = Math.round(w * TICKET_IMG_SCALE_LARGE);
		h = Math.round(h * TICKET_IMG_SCALE_LARGE);
	}
	return capAncho(w, h, natW, natH);
}

export type TicketImgHtmlOpts = {
	/** Sin fondo blanco en el `<img>` (diagramas con canal alpha). */
	transparentBg?: boolean;
};

/** Envoltorio centrado; la imagen nunca desborda (max-width:100%, sin min-width fijo). */
export function ticketImgHtml(url: string, natW: number, natH: number, opts?: TicketImgHtmlOpts): string {
	const { w, h } = computeTicketImgDims(natW, natH);
	const imgBg = opts?.transparentBg ? "transparent" : "#fff";
	const alphaAttr = opts?.transparentBg ? ' data-ticket-alpha="1"' : "";
	const border = opts?.transparentBg ? `1px solid ${TICKET_BORDER_CARD}` : "1px solid #ddd";
	return (
		`<div style="text-align:center;margin:0.75rem auto;padding:0 5%;max-width:100%;box-sizing:border-box;overflow:hidden;">` +
		`<a href="${url}" target="_blank" rel="noopener noreferrer" ` +
		`style="display:inline-block;max-width:100%;text-decoration:none;border-radius:4px;">` +
		`<img src="${url}" alt="" width="${w}" height="${h}"${alphaAttr} ` +
		`style="display:block;width:100%;max-width:${w}px;height:auto;margin:0 auto;` +
		`border:${border};border-radius:4px;background:${imgBg};cursor:zoom-in;">` +
		`</a></div>`
	);
}
