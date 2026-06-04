import { getLabApiBase, labFetch } from "./client.ts";

export function useLabPersistence(): boolean {
	return Boolean(getLabApiBase());
}

export async function labGetJson<T>(path: string): Promise<T> {
	const res = await labFetch<{ ok: boolean; data: T }>(`/persistence/${path}`);
	return res.data ?? ({} as T);
}

export async function labPutJson(path: string, data: unknown): Promise<void> {
	await labFetch(`/persistence/${path}`, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

export async function labGetRevisado(): Promise<Record<string, boolean>> {
	return labFetch<Record<string, boolean>>("/revisado");
}

export async function labPostRevisado(updates: Record<string, boolean>): Promise<Record<string, boolean>> {
	return labFetch<Record<string, boolean>>("/revisado", {
		method: "POST",
		body: JSON.stringify(updates),
	});
}
