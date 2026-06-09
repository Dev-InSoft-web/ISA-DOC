import { getLabApiBase, labApiEnabled, labFetch } from "./client.js";

export type MermaidAssetView = {
	filename: string;
	ticketId?: string | null;
	mermaidSource: string;
	mermaidInkUrl: string;
	sourceSha1?: string;
	url: string;
	display_url?: string;
	thumb?: string;
	width: number;
	height: number;
	sha1?: string;
	publishedAt?: string;
};

/** GET asset mermaid publicado (código + mermaid.ink + imgbb). */
export async function fetchMermaidAsset(filename: string): Promise<MermaidAssetView | null> {
	if (!labApiEnabled()) return null;
	const base = getLabApiBase();
	if (!base) return null;
	try {
		const res = await fetch(`${base}/api/tickets/mermaid/${encodeURIComponent(filename)}`, {
			headers: { accept: "application/json" },
		});
		const data = (await res.json()) as { ok?: boolean; asset?: MermaidAssetView };
		if (!res.ok || !data.ok || !data.asset) return null;
		return data.asset;
	} catch {
		return null;
	}
}

/** Publica o reutiliza por mermaidInkUrl (requiere JWT lab). */
export async function publishMermaidAsset(opts: {
	filename: string;
	source: string;
	ticketId?: string;
	force?: boolean;
}): Promise<{ asset: MermaidAssetView; reused: boolean } | null> {
	if (!labApiEnabled()) return null;
	try {
		const data = await labFetch<{ ok: boolean; asset: MermaidAssetView; reused: boolean }>(
			"/tickets/mermaid/publish",
			{
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(opts),
			},
		);
		if (!data.ok || !data.asset) return null;
		return { asset: data.asset, reused: data.reused };
	} catch {
		return null;
	}
}
