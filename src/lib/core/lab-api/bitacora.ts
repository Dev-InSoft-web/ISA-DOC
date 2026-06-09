import { getLabApiBase, labApiEnabled } from "./client.ts";

export type BitacoraLayoutNode =
	| {
			type: "day" | "group" | "section";
			title: string;
			titleIcon?: string;
			open?: boolean;
			checkKey?: string;
			checkKeys?: string[];
			children: BitacoraLayoutNode[];
	  }
	| { type: "md"; segmentId: string }
	| { type: "sql"; segmentId: string; checkKey?: string }
	| { type: "widget"; widget: string; props?: Record<string, unknown> };

export type BitacoraBundle = {
	ok: true;
	project: string;
	layout: { version: number; project: string; nodes: BitacoraLayoutNode[] };
	md: Record<string, { markdown: string; sourcePath?: string; dayId?: string }>;
	sql: Record<
		string,
		{
			title: string;
			sql: string;
			desc?: string;
			checkKey: string;
			confirmKind?: "warning" | "danger" | "info";
			confirmMessage?: string;
			height?: string;
			dbTarget?: "paty" | "clientesis";
		}
	>;
};

export async function fetchBitacoraBundle(project: string): Promise<BitacoraBundle> {
	const base = getLabApiBase();
	if (!base) throw new Error("PUBLIC_LAB_LANGGRAPH_URL no configurada");
	const res = await fetch(`${base}/api/bitacora/${encodeURIComponent(project)}`, {
		headers: { accept: "application/json" },
	});
	const data = (await res.json()) as BitacoraBundle & { ok?: boolean; error?: string };
	if (!res.ok || !data.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
	return data;
}

export function bitacoraStoreEnabled(): boolean {
	return labApiEnabled();
}
