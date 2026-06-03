const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124 Safari/537.36";

type PlayerResponse = { videoDetails?: { shortDescription?: string } };

function decodeXml(text: string): string {
	return text
		.replace(/&#(\d+);/g, (_, value: string) => String.fromCodePoint(Number(value)))
		.replace(/&#x([0-9a-f]+);/gi, (_, value: string) => String.fromCodePoint(parseInt(value, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&amp;/g, "&");
}

function extractJsonAt(html: string, start: number): string {
	let depth = 0;
	let inString = false;
	let escaped = false;
	for (let i = start; i < html.length; i += 1) {
		const char = html[i];
		if (inString) {
			if (escaped) escaped = false;
			else if (char === "\\") escaped = true;
			else if (char === '"') inString = false;
			continue;
		}
		if (char === '"') inString = true;
		else if (char === "{") depth += 1;
		else if (char === "}") {
			depth -= 1;
			if (depth === 0) return html.slice(start, i + 1);
		}
	}
	throw new Error("JSON incompleto");
}

function playerResponsesFromHtml(html: string): PlayerResponse[] {
	const out: PlayerResponse[] = [];
	let cursor = 0;
	const marker = "ytInitialPlayerResponse";
	while (cursor < html.length) {
		const idx = html.indexOf(marker, cursor);
		if (idx < 0) break;
		const start = html.indexOf("{", idx);
		try {
			out.push(JSON.parse(extractJsonAt(html, start)) as PlayerResponse);
		} catch {
			/* skip */
		}
		cursor = idx + marker.length;
	}
	return out;
}

/** Descripción desde watch page cuando yt-dlp devuelve vacío. */
export async function fetchDescriptionFromWatch(videoId: string): Promise<string> {
	const url = `https://www.youtube.com/watch?v=${videoId}&hl=es-419&persist_hl=1`;
	const r = await fetch(url, { headers: { "user-agent": USER_AGENT, "accept-language": "es-419,es;q=0.9" } });
	if (!r.ok) return "";
	const html = await r.text();

	for (const player of playerResponsesFromHtml(html)) {
		const desc = player.videoDetails?.shortDescription?.trim();
		if (desc) return decodeXml(desc);
	}

	const meta = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
	if (meta?.[1]) return decodeXml(meta[1].trim());

	return "";
}

export async function resolveVideoDescription(videoId: string, fromYtDlp?: string): Promise<string> {
	const trimmed = fromYtDlp?.trim() ?? "";
	if (trimmed) return trimmed;
	return fetchDescriptionFromWatch(videoId);
}

/** Texto plano para chunking / embedding: descripción + transcripción. */
export function buildPlainTextWithDescription(description: string, transcriptPlain: string): string {
	const desc = description.trim();
	const trans = transcriptPlain.trim();
	if (!desc) return trans;
	if (!trans) return desc;
	return `## Descripción del video\n\n${desc}\n\n## Transcripción\n\n${trans}`;
}
