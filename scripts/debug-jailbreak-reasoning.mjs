import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const token = JSON.parse(fs.readFileSync(path.join(ROOT, "secrets/tokens/token.patyia.json"), "utf8")).token;

async function probe(label, body) {
	const r = await fetch("http://127.0.0.1:7071/api/conversacion/jailbreak", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	const t = await r.text();
	const icon = Number((t.match(/"iconversacion":(\d+)/) || [])[1] || 0);
	let resp = "";
	if (icon) {
		const p = path.join(ROOT, "..", "PatyIA", "logs", "conversaciones", `conv-${icon}.json`);
		if (fs.existsSync(p)) {
			const log = JSON.parse(fs.readFileSync(p, "utf8"));
			const a = (log.mensajes ?? []).find((m) => m.role === "assistant");
			resp = String(a?.others?.response_text ?? "");
			if (!resp && a?.others?.stream_error) resp = `[stream_error: ${a.others.stream_error}]`;
		}
	}
	console.log(label, "HTTP", r.status, "conv", icon, "message events", (t.match(/event: message/g) || []).length, "resp len", resp.length, resp.slice(0, 100));
}

const base = {
	itercero: "810000630",
	icontacto: "702470",
	imodulo: "isa-doc",
	titulo: "probe",
	prompt: "Hola",
	imagenes: [],
	modelo: "gpt-5-mini",
};

await probe("sin extra", base);
await probe("reasoning low", { ...base, reasoning_effort: "low" });
await probe("vision auto", { ...base, vision_strategy: "auto" });
