// V2: bloque por bloque
const fs = require("fs");

const props = JSON.parse(fs.readFileSync("__propuesta.json", "utf8"));
const path = "src/lib/tickets/index.ts";
let src = fs.readFileSync(path, "utf8");

function esc(s) {
	return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const parts = src.split(/(\{\r?\n\t\tid: "TK-\d+",)/);
for (let i = 1; i < parts.length; i += 2) {
	const marker = parts[i];
	const tk = marker.match(/"(TK-\d+)"/)[1];
	const cands = props[tk];
	if (!cands || !cands.length) continue;
	let body = parts[i + 1];
	const lines = cands.map(
		(c) =>
			`\t\t\t{ hash: "${c.hash}", descripcion: "${esc(c.subject)}", repo: "${c.repo}", ins: ${c.ins}, del: ${c.del} },`,
	);
	if (/commits:\s*\[/.test(body)) {
		const re = /commits:\s*\[([\s\S]*?)\],/;
		const mm = body.match(re);
		const existing = new Set();
		for (const cm of mm[1].matchAll(/hash:\s*"([0-9a-f]+)"/g)) existing.add(cm[1]);
		const filtered = lines.filter((l) => !existing.has(l.match(/hash:\s*"([0-9a-f]+)"/)[1]));
		if (!filtered.length) {
			console.log(`${tk}: 0 nuevos`);
			continue;
		}
		body = body.replace(re, (full, inner) => {
			const trimmed = inner.replace(/\n*$/, "");
			return `commits: [${trimmed}\n${filtered.join("\n")}\n\t\t],`;
		});
		console.log(`${tk}: +${filtered.length}`);
	} else {
		const block = `\t\tcommits: [\n${lines.join("\n")}\n\t\t],\n`;
		body = body.replace(/(\t\tbody:)/, `${block}$1`);
		console.log(`${tk}: +${cands.length} (nuevo)`);
	}
	parts[i + 1] = body;
}

fs.writeFileSync(path, parts.join(""));
console.log("OK");
