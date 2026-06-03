export function encodeJsonState(obj: Record<string, unknown>): string {
	const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
	return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeJsonState(raw: string | null | undefined): Record<string, unknown> {
	if (!raw) return {};
	try {
		let b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
		const pad = b64.length % 4;
		if (pad) b64 += "=".repeat(4 - pad);
		const json = decodeURIComponent(escape(atob(b64)));
		const parsed: unknown = JSON.parse(json);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
	} catch {
		return {};
	}
}
