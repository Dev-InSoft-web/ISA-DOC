// Generado a partir de assets/imgbb-map.json. No editar a mano:
// regenerar con `node scripts/upload-assets-imgbb.mjs`.
import map from "./assets/imgbb-map.json";

type ImgbbMap = Record<string, { sha1: string; url: string; display_url?: string; thumb?: string }>;

const m = map as ImgbbMap;

export function imgUrl(filename: string): string {
	const entry = m[filename];
	if (!entry) throw new Error(`imgbb-map.json sin entrada para ${filename}`);
	return entry.url;
}
