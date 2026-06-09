/**
 * Reenvío server-side (Astro API) hacia lab-langgraph MSSQL.
 * Usado cuando ISA-DOC no tiene pool local y el front llama /api/db/exec.
 */

function labBase(): string {
	return (process.env.LAB_LANGGRAPH_URL ?? process.env.PUBLIC_LAB_LANGGRAPH_URL ?? "")
		.trim()
		.replace(/\/$/, "");
}

export function resolveMssqlRemoteUrl(
	explicitEnv: string | undefined,
	target: "clientesis" | "paty",
	kind: "exec" | "query",
): string {
	const explicit = (explicitEnv ?? "").trim();
	if (explicit) return explicit;
	const base = labBase();
	if (!base) return "";
	return `${base}/api/mssql/${target}/${kind}`;
}

export function mssqlRemoteToken(requestAuth?: string | null): string {
	const fromEnv = (process.env.ISA_DB_REMOTE_TOKEN ?? process.env.ISA_PATY_DB_REMOTE_TOKEN ?? "").trim();
	if (fromEnv) return fromEnv;
	const hdr = (requestAuth ?? "").trim();
	const m = hdr.match(/^Bearer\s+(.+)$/i);
	return m?.[1]?.trim() ?? "";
}

export async function forwardMssqlRemote(
	url: string,
	sql: string,
	token: string,
): Promise<Response> {
	const headers: Record<string, string> = { "content-type": "application/json" };
	if (token) headers["authorization"] = `Bearer ${token}`;
	try {
		const r = await fetch(url, { method: "POST", headers, body: JSON.stringify({ sql }) });
		const text = await r.text();
		return new Response(text, {
			status: r.status,
			headers: {
				"content-type": r.headers.get("content-type") ?? "application/json",
				"cache-control": "no-store",
			},
		});
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return jsonRemote({ ok: false, error: `Reenvío a ${url} falló: ${msg}` }, 502);
	}
}

function jsonRemote(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});
}
