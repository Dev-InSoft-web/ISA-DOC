import { labApiEnabled, labFetch } from "./client.js";

export type ImgbbAssetRecord = {
	filename: string;
	ticketId?: string | null;
	sha1?: string;
	url: string;
	display_url?: string;
	thumb?: string;
	width: number;
	height: number;
	size?: number;
};

type IspgenList<T> = {
	encabezado: { resultado: boolean; mensaje: string; codigo?: number };
	respuesta: { lista?: T[]; total?: number; datos?: T };
};

const ENTITY = "/entity/isa-doc/tickets/imgbb-asset";
const UPLOAD = "/imgbb/assets/upload";

export function imgbbStoreEnabled(): boolean {
	return labApiEnabled();
}

/** Lista assets imgbb desde PG (lab-langgraph). */
export async function fetchImgbbAssets(opts?: {
	ticketId?: string;
	limit?: number;
	q?: string;
}): Promise<ImgbbAssetRecord[] | null> {
	if (!imgbbStoreEnabled()) return null;
	const params = new URLSearchParams();
	params.set("limit", String(opts?.limit ?? 500));
	if (opts?.ticketId) params.set("parentEntityId", opts.ticketId);
	if (opts?.q) params.set("q", opts.q);
	try {
		const res = await labFetch<IspgenList<ImgbbAssetRecord>>(`${ENTITY}?${params}`);
		if (!res.encabezado.resultado) return null;
		return res.respuesta.lista ?? [];
	} catch {
		return null;
	}
}

export async function fetchImgbbAsset(filename: string): Promise<ImgbbAssetRecord | null> {
	if (!imgbbStoreEnabled()) return null;
	try {
		const pk = encodeURIComponent(filename);
		const res = await labFetch<IspgenList<ImgbbAssetRecord>>(`${ENTITY}/${pk}`);
		if (!res.encabezado.resultado) return null;
		return res.respuesta.datos ?? null;
	} catch {
		return null;
	}
}

/** GET dedicado (misma fuente que entity). */
export async function fetchImgbbAssetViaApi(filename: string): Promise<ImgbbAssetRecord | null> {
	if (!imgbbStoreEnabled()) return null;
	try {
		const pk = encodeURIComponent(filename);
		const res = await labFetch<{ encabezado: { resultado: boolean }; respuesta: { datos?: ImgbbAssetRecord } }>(
			`/imgbb/assets/${pk}`,
		);
		if (!res.encabezado?.resultado) return null;
		return res.respuesta?.datos ?? null;
	} catch {
		return fetchImgbbAsset(filename);
	}
}

export async function uploadImgbbAsset(input: {
	filename: string;
	base64?: string;
	path?: string;
	ticketId?: string;
}): Promise<ImgbbAssetRecord | null> {
	if (!imgbbStoreEnabled()) return null;
	const res = await labFetch<{ ok: boolean; asset?: ImgbbAssetRecord; error?: string }>(UPLOAD, {
		method: "POST",
		body: JSON.stringify(input),
	});
	if (!res.ok || !res.asset) {
		throw new Error(res.error ?? "Error al subir asset imgbb");
	}
	return res.asset;
}
