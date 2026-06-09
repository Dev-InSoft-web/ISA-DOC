/**
 * MSSQL centralizado en lab-langgraph.
 * - query: sin auth (solo SELECT)
 * - exec: JWT lab (modal de auth en ISA-DOC)
 */

import { getLabApiBase, labApiEnabled, labFetch } from "./client.ts";

export { labApiEnabled };

export type MssqlTarget = "clientesis" | "paty";

export type MssqlExecResponse = {
	ok: boolean;
	output?: string;
	error?: string;
	rowsAffected?: number;
	recordsets?: number;
	rows?: unknown[];
};

export type MssqlQueryResponse = {
	ok: boolean;
	error?: string;
	recordset?: unknown[];
	recordsets?: unknown[][];
};

export async function labMssqlQuery(target: MssqlTarget, sql: string): Promise<MssqlQueryResponse> {
	const base = getLabApiBase();
	if (!base) return { ok: false, error: "PUBLIC_LAB_LANGGRAPH_URL no configurada" };
	const res = await fetch(`${base}/api/mssql/${target}/query`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ sql }),
	});
	const data = (await res.json()) as MssqlQueryResponse;
	if (!res.ok) return { ok: false, error: data.error ?? `HTTP ${res.status}` };
	return data;
}

export async function labMssqlExec(target: MssqlTarget, sql: string): Promise<MssqlExecResponse> {
	if (!labApiEnabled()) return { ok: false, error: "PUBLIC_LAB_LANGGRAPH_URL no configurada" };
	try {
		return await labFetch<MssqlExecResponse>(`/mssql/${target}/exec`, {
			method: "POST",
			body: JSON.stringify({ sql }),
		});
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : String(err) };
	}
}

export async function labMssqlPing(target: MssqlTarget): Promise<{ ok: boolean; error?: string }> {
	const base = getLabApiBase();
	if (!base) return { ok: false, error: "PUBLIC_LAB_LANGGRAPH_URL no configurada" };
	try {
		const res = await fetch(`${base}/api/mssql/${target}/ping`);
		const data = (await res.json()) as { ok?: boolean; error?: string };
		return { ok: Boolean(data.ok), error: data.error };
	} catch (err) {
		return { ok: false, error: err instanceof Error ? err.message : String(err) };
	}
}
