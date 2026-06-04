/** Normaliza markdown del corpus gubernamental (MD012, tarjetas Liferay, espacios). */

export function resolveGovAbsoluteUrl(href: string, pageUrl: string): string {
	const h = href.trim();
	if (!h || /^https?:\/\//i.test(h) || /^mailto:/i.test(h) || /^#/.test(h)) return href;
	if (h.startsWith("//")) return `https:${h}`;
	if (!h.startsWith("/")) return href;
	if (h === "/") {
		try {
			return new URL("/", pageUrl).href.replace(/\/$/, "") || new URL(pageUrl).origin;
		} catch {
			return href;
		}
	}
	try {
		return new URL(h, pageUrl).href;
	} catch {
		return href;
	}
}

const MD_REL_PATH = String.raw`(\/?[^)\s]*)(?:\s+"[^"]*")?`;

/** Rutas raíz `(/…)` en enlaces e imágenes → URL absoluta del sitio origen. */
export function resolveRelativeUrlsInMarkdown(md: string, pageUrl: string): string {
	return md.replace(
		new RegExp(String.raw`(!\[[^\]]*\]|\[[^\]]*\])\(${MD_REL_PATH}\)`, "g"),
		(_match, prefix: string, path: string) => {
			const abs = resolveGovAbsoluteUrl(path || "/", pageUrl);
			return `${prefix}(${abs})`;
		},
	);
}

function cardLinkReplacer(
	alt: string,
	imgUrl: string,
	text: string,
	linkUrl: string,
	pageUrl: string,
): string {
	const label =
		text
			.trim()
			.replace(/\n{2,}/g, " ")
			.replace(/\s+/g, " ")
			.trim() || alt.trim() || "Enlace";
	const absLink = resolveGovAbsoluteUrl(linkUrl, pageUrl);
	const cleanImg = imgUrl.replace(/\s+"[^"]*"\s*$/, "").trim();
	const img =
		cleanImg && cleanImg.startsWith("/")
			? `\n\n![${alt || label}](${resolveGovAbsoluteUrl(cleanImg, pageUrl)})`
			: cleanImg
				? `\n\n![${alt || label}](${cleanImg})`
				: "";
	return `\n\n- [${label}](${absLink})${img}\n`;
}

/** Enlaces Liferay `[![…](img) texto](url)` o multilínea → lista `- [texto](url)`. */
export function repairCardLinks(md: string, pageUrl?: string): string {
	const base = pageUrl ?? "";
	let s = md;
	const cardTail = String.raw`\]\(${MD_REL_PATH}\)`;
	s = s.replace(
		new RegExp(String.raw`\[\s*\n+!\[([^\]]*)\]${cardTail}\s*\n+([\s\S]*?)\n+${cardTail}`, "g"),
		(_m, alt: string, imgUrl: string, text: string, linkUrl: string) =>
			cardLinkReplacer(alt, imgUrl, text, linkUrl, base),
	);
	s = s.replace(
		new RegExp(String.raw`\[\s*!\[([^\]]*)\]${cardTail}\s*\n+([\s\S]*?)${cardTail}`, "g"),
		(_m, alt: string, imgUrl: string, text: string, linkUrl: string) =>
			cardLinkReplacer(alt, imgUrl, text, linkUrl, base),
	);
	return s;
}

export function collapseBlankLines(md: string): string {
	return md.replace(/\n{3,}/g, "\n\n");
}

/** Quita títulos markdown mal codificados dentro de la URL (`…%20%22Título%22`). */
export function repairEncodedTitlesInUrls(md: string): string {
	return md.replace(
		/(!\[[^\]]*\]\()(https?:\/\/[^)]+?)(?:%20)?%22[^)]*%22\)/gi,
		"$1$2)",
	);
}

export function normalizeGovMarkdown(md: string, pageUrl?: string): string {
	let s = md.replace(/\r\n/g, "\n");
	s = repairEncodedTitlesInUrls(s);
	s = repairCardLinks(s, pageUrl);
	if (pageUrl) {
		s = resolveRelativeUrlsInMarkdown(s, pageUrl);
		s = s.replace(new RegExp(String.raw`\]\(${MD_REL_PATH}\)`, "g"), (_m, path: string) => {
			return `](${resolveGovAbsoluteUrl(path || "/", pageUrl)})`;
		});
	}
	s = repairEncodedTitlesInUrls(s);
	s = s.replace(/[ \t]+\n/g, "\n");
	s = collapseBlankLines(s);
	return `${s.trim()}\n`;
}

export function splitMdSections(markdown: string): Array<{ heading: string; text: string }> {
	const lines = markdown.split("\n");
	const out: Array<{ heading: string; text: string }> = [];
	let heading = "Introducción";
	let buf: string[] = [];
	const flush = () => {
		const t = buf.join("\n").trim();
		if (t) out.push({ heading, text: t });
		buf = [];
	};
	for (const line of lines) {
		const m = line.match(/^#{1,3}\s+(.+)$/);
		if (m && !line.startsWith("# ")) {
			flush();
			heading = m[1]!.trim();
			continue;
		}
		buf.push(line);
	}
	flush();
	return out.length ? out : [{ heading: "Contenido", text: markdown.trim() }];
}

/** Aplica URLs absolutas y re-secciona desde el markdown corregido. */
export function absolutizeGovRecordContent<T extends {
	url: string;
	title: string;
	content: { markdown: string; plainText: string };
	sections?: Array<{ heading: string; text: string }>;
}>(record: T): T {
	const markdown = normalizeGovMarkdown(record.content.markdown, record.url).trimEnd() + "\n";
	const sections = splitMdSections(markdown);
	const plainText = sections
		.map((s) => s.text)
		.join("\n\n")
		.replace(/[#*_`>\[\]()|-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
	return {
		...record,
		content: { markdown, plainText },
		sections,
	};
}

export function yamlScalar(value: string): string {
	if (/[:#\n"'&*]/.test(value) || value.startsWith(" ")) {
		return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
	}
	return value;
}

/** Evita repetir `# título` + URL si el cuerpo ya los trae del crawl legacy. */
export function stripLegacyContentHeader(body: string, title: string): string {
	let s = body.trim();
	const t = title.trim();
	if (s.startsWith(`# ${t}`)) {
		s = s.slice(`# ${t}`.length).trimStart();
		if (s.startsWith(`**URL:**`)) {
			const nl = s.indexOf("\n\n");
			s = nl >= 0 ? s.slice(nl + 2).trimStart() : "";
		}
	}
	return s;
}
