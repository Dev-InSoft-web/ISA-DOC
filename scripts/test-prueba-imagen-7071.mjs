/**
 * Replica la secuencia "Prueba imagen 7071" del panel Interacción
 * contra PatyIA local POST /api/conversacion/jailbreak (SSE).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ISA_ROOT = path.resolve(__dirname, "..");
const PATYIA_BASE = "http://127.0.0.1:7071";
const TOKEN_FILE = path.join(ISA_ROOT, "secrets", "tokens", "token.patyia.json");
const IMG_FILE = path.join(ISA_ROOT, "public", "assets", "imgs", "patyia", "notebooklm", "unnamed.png");

const ITERCERO = "810000630";
const ICONTACTO = "702470";
const MODELO = "gpt-5-mini";

const PASOS = [
	{ texto: "Hola", imagenes: [] },
	{ texto: "Adjunto una imagen. ¿Qué ves en ella?", imagenes: ["__IMG__"] },
	{ texto: "Con base en esa imagen, ¿qué elementos o texto identificas con más claridad?", imagenes: [] },
	{ texto: "Gracias, hasta luego.", imagenes: [] },
];

function loadToken() {
	const raw = fs.readFileSync(TOKEN_FILE, "utf8");
	const { token } = JSON.parse(raw);
	if (!token?.trim()) throw new Error(`Sin token en ${TOKEN_FILE}`);
	return token.trim();
}

function loadImageDataUrl() {
	const buf = fs.readFileSync(IMG_FILE);
	const b64 = buf.toString("base64");
	return `data:image/png;base64,${b64}`;
}

/** Parsea bloques SSE y devuelve eventos acumulados. */
async function consumirSSE(res, onEvent) {
	const reader = res.body.getReader();
	const dec = new TextDecoder();
	let buffer = "";
	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		buffer += dec.decode(value, { stream: true });
		const blocks = buffer.split("\n\n");
		buffer = blocks.pop() ?? "";
		for (const block of blocks) {
			let evento = "";
			let datos = "";
			for (const ln of block.split("\n")) {
				if (ln.startsWith("event:")) evento = ln.slice(6).trim();
				else if (ln.startsWith("data:")) datos += ln.slice(5).trim();
			}
			if (!datos) continue;
			let parsed;
			try {
				parsed = JSON.parse(datos);
			} catch {
				continue;
			}
			onEvent(evento, parsed);
		}
	}
}

async function enviarPaso(token, iconversacion, texto, imagenes) {
	const mensajeHtml = `<p>${texto.replace(/</g, "&lt;")}</p>`;
	const body = {
		...(iconversacion ? { iconversacion } : {}),
		itercero: ITERCERO,
		icontacto: ICONTACTO,
		imodulo: "isa-doc",
		...(iconversacion ? {} : { titulo: texto.slice(0, 80) }),
		prompt: texto,
		imagenes,
		prompt_html: mensajeHtml,
		modelo: MODELO,
	};

	const label = iconversacion ? `turno conv=${iconversacion}` : "nueva conversación";
	console.log(`\n── Paso: "${texto.slice(0, 50)}${texto.length > 50 ? "…" : ""}" (${label})`);
	if (imagenes.length) console.log(`   imagen adjunta: ${(imagenes[0] ?? "").slice(0, 40)}… (${imagenes[0]?.length ?? 0} chars)`);

	const res = await fetch(`${PATYIA_BASE}/api/conversacion/jailbreak`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	if (!res.ok || !res.body) {
		const txt = await res.text();
		throw new Error(`HTTP ${res.status}: ${txt.slice(0, 300)}`);
	}

	let convId = iconversacion ?? 0;
	let respuesta = "";
	const meta = {};

	await consumirSSE(res, (evento, parsed) => {
		if (evento === "begin") {
			const icon = Number(parsed.iconversacion ?? 0);
			if (icon > 0) convId = icon;
			console.log(`   [begin] iconversacion=${convId} hilo=${parsed.hilo ?? ""}`);
		} else if (evento === "message" || evento === "end") {
			const resp = String(parsed.respuesta ?? "");
			if (resp) respuesta = resp;
			const icon = Number(parsed.iconversacion ?? 0);
			if (icon > 0) convId = icon;
			if (evento === "end") Object.assign(meta, parsed.meta ?? {});
		} else if (evento === "error") {
			throw new Error(String(parsed.error ?? parsed.mensaje ?? "error SSE"));
		}
	});

	const preview = respuesta.replace(/\s+/g, " ").trim().slice(0, 220);
	console.log(`   [respuesta] ${preview}${respuesta.length > 220 ? "…" : ""}`);
	if (meta.modelo_configurado) console.log(`   [meta] modelo=${meta.modelo_configurado}`);
	return convId;
}

async function main() {
	console.log("=== Prueba imagen 7071 (CLI) ===");
	console.log(`PatyIA: ${PATYIA_BASE}`);
	console.log(`Tercero: ${ITERCERO} · Contacto: ${ICONTACTO} · Modelo: ${MODELO}`);

	const token = loadToken();
	console.log(`Token: ${TOKEN_FILE} (${token.length} chars)`);

	const img = loadImageDataUrl();
	console.log(`Imagen: ${IMG_FILE}`);

	let iconversacion = 0;
	for (let i = 0; i < PASOS.length; i++) {
		const paso = PASOS[i];
		const imagenes = paso.imagenes.map((x) => (x === "__IMG__" ? img : x));
		iconversacion = await enviarPaso(token, iconversacion || undefined, paso.texto, imagenes);
	}

	console.log("\n=== FIN ===");
	console.log(`iconversacion: ${iconversacion}`);
	console.log(`Log esperado: PatyIA/logs/conversaciones/conv-${iconversacion}.json`);
}

main().catch((err) => {
	const cause = err?.cause?.message ?? err?.cause ?? "";
	console.error("\n⛔", err.message ?? err, cause ? `(${cause})` : "");
	process.exit(1);
});
