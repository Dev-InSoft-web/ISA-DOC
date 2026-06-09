const YT_ID_RE = /(?:youtube\.com\/(?:embed\/|watch\?v=|v\/|shorts\/)|youtu\.be\/|img\.youtube\.com\/vi\/)([A-Za-z0-9_-]{11})/;

export function extractYoutubeId(input: string | null | undefined): string | null {
	if (!input?.trim()) return null;
	const m = input.match(YT_ID_RE);
	return m?.[1] ?? null;
}

/** Normaliza `valor` de RECURSOS_ATRIBUTOS (ID bare, URL o con query `?t=`). */
export function normalizeYoutubeValor(valor: string | null | undefined): string | null {
	if (!valor?.trim()) return null;
	const v = valor.trim();
	const fromUrl = extractYoutubeId(v);
	if (fromUrl) return fromUrl;
	const bare = v.match(/^([A-Za-z0-9_-]{11})(?:[?&].*)?$/);
	return bare?.[1] ?? null;
}

export function entryIdForVideo(youtubeId?: string | null, irecurso?: number | string | null): string {
	if (youtubeId) return youtubeId;
	if (irecurso != null && irecurso !== "") return `irecurso:${irecurso}`;
	return `unknown:${Date.now()}`;
}
