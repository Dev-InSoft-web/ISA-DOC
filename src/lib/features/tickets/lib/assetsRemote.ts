// Mapa imgbb: PG (lab API) con fallback a `_meta/imgbb-map.json`.
import staticMap from "../assets/_meta/imgbb-map.json";

export type ImgbbEntry = {
	sha1?: string;
	url: string;
	display_url?: string;
	thumb?: string;
	width: number;
	height: number;
	size?: number;
};
type ImgbbMap = Record<string, ImgbbEntry>;

const fallback = staticMap as ImgbbMap;
let runtimeMap: ImgbbMap | null = null;
let preloadPromise: Promise<boolean> | null = null;

function rowToEntry(row: {
	filename: string;
	sha1?: string;
	url: string;
	display_url?: string;
	thumb?: string;
	width: number;
	height: number;
}): ImgbbEntry {
	return {
		sha1: row.sha1,
		url: row.url,
		display_url: row.display_url,
		thumb: row.thumb,
		width: row.width,
		height: row.height,
	};
}

/** Carga el mapa desde lab-langgraph (GET entity imgbb-asset). Idempotente. */
export async function preloadImgbbFromStore(): Promise<boolean> {
	if (runtimeMap) return true;
	if (!preloadPromise) {
		preloadPromise = (async () => {
			try {
				const { fetchImgbbAssets, imgbbStoreEnabled } = await import(
					"../../../core/lab-api/imgbb.js"
				);
				if (!imgbbStoreEnabled()) return false;
				const rows = await fetchImgbbAssets({ limit: 1000 });
				if (!rows?.length) return false;
				runtimeMap = Object.fromEntries(rows.map((r) => [r.filename, rowToEntry(r)]));
				return true;
			} catch {
				return false;
			}
		})();
	}
	return preloadPromise;
}

function currentMap(): ImgbbMap {
	return runtimeMap ?? fallback;
}

export function imgUrl(filename: string): string {
	const entry = currentMap()[filename];
	if (!entry) throw new Error(`imgbb sin entrada para ${filename} (PG o imgbb-map.json)`);
	return entry.url;
}

export function imgInfo(filename: string): { url: string; width: number; height: number } {
	const entry = currentMap()[filename];
	if (!entry) throw new Error(`imgbb sin entrada para ${filename} (PG o imgbb-map.json)`);
	const url = entry.sha1 ? `${entry.url}?v=${entry.sha1.slice(0, 12)}` : entry.url;
	return { url, width: entry.width, height: entry.height };
}
