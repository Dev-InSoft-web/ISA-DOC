// Generado a partir de assets/imgbb-map.json. No editar a mano:
// regenerar con `node scripts/upload-assets-imgbb.mjs`.
import map from "./assets/imgbb-map.json";

type ImgbbEntry = {
	sha1: string;
	url: string;
	display_url?: string;
	thumb?: string;
	width: number;
	height: number;
};
type ImgbbMap = Record<string, ImgbbEntry>;

const m = map as ImgbbMap;

export function imgUrl(filename: string): string {
	const entry = m[filename];
	if (!entry) throw new Error(`imgbb-map.json sin entrada para ${filename}`);
	return entry.url;
}

export function imgInfo(filename: string): { url: string; width: number; height: number } {
	const entry = m[filename];
	if (!entry) throw new Error(`imgbb-map.json sin entrada para ${filename}`);
	return { url: entry.url, width: entry.width, height: entry.height };
}
