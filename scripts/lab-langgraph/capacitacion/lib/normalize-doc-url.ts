const INVALID_VALOR = /^[xz]{4,}$/i;

export type DocUrlSkipReason = "invalid_valor" | "unsupported_host" | "not_file_url";

export function normalizeDocValor(valor: string): { url: string } | { skip: DocUrlSkipReason } {
	let v = valor.trim().replace(/[\r\n]+/g, "").replace(/\\/g, "/");
	if (!v || INVALID_VALOR.test(v)) return { skip: "invalid_valor" };
	if (!/^https?:\/\//i.test(v)) return { skip: "not_file_url" };
	if (/sharepoint\.com/i.test(v)) return { skip: "unsupported_host" };
	if (/capacitacion-virtual\/#\//i.test(v)) return { skip: "not_file_url" };

	try {
		const u = new URL(v);
		if (!["http:", "https:"].includes(u.protocol)) return { skip: "not_file_url" };
		u.hash = "";
		return { url: u.toString() };
	} catch {
		return { skip: "not_file_url" };
	}
}

export function loadUniqueDocUrls(rows: Array<{ valor?: string }>): {
	urls: string[];
	skipped: Record<DocUrlSkipReason, number>;
} {
	const seen = new Set<string>();
	const urls: string[] = [];
	const skipped: Record<DocUrlSkipReason, number> = {
		invalid_valor: 0,
		unsupported_host: 0,
		not_file_url: 0,
	};

	for (const row of rows) {
		const raw = row.valor ?? "";
		const norm = normalizeDocValor(raw);
		if ("skip" in norm) {
			skipped[norm.skip] += 1;
			continue;
		}
		if (seen.has(norm.url)) continue;
		seen.add(norm.url);
		urls.push(norm.url);
	}
	return { urls, skipped };
}
