import { imgInfo, preloadImgbbFromStore } from "./assetsRemote";
import { ticketImgHtml, type TicketImgHtmlOpts } from "./imgDims";

/** `$archivo.png$` o `$archivo.png#transparent$` — resueltos en `getTicketHtml` vía PG. */
const ASSET_PLACEHOLDER_RE =
	/\$([a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:png|jpe?g|webp|gif))(?:#([a-zA-Z]+))?\$/g;

export function assetRef(
	filename: string,
	opts?: Pick<TicketImgHtmlOpts, "transparentBg">,
): string {
	const flag = opts?.transparentBg ? "#transparent" : "";
	return `$${filename}${flag}$`;
}

export async function resolveAssetPlaceholders(html: string): Promise<string> {
	if (!ASSET_PLACEHOLDER_RE.test(html)) return html;
	ASSET_PLACEHOLDER_RE.lastIndex = 0;

	await preloadImgbbFromStore();

	return html.replace(ASSET_PLACEHOLDER_RE, (_full, filename: string, flag?: string) => {
		const imgOpts: TicketImgHtmlOpts | undefined =
			flag === "transparent" ? { transparentBg: true } : undefined;
		try {
			const info = imgInfo(filename);
			return ticketImgHtml(info.url, info.width, info.height, imgOpts);
		} catch {
			return (
				`<span style="color:#c00;font:12px Tahoma,sans-serif">` +
				`[imagen no disponible: ${filename}]</span>`
			);
		}
	});
}
