/**
 * Prueba rápida MiniMax: chat hola mundo + sondeo STT.
 * Uso: npm run lab:yt:test-minimax
 */
import { loadLabEnv } from "../../_shared/load-lab-env.ts";
import {
	loadMinimaxConfigFromEnv,
	minimaxKeyDisplay,
	type MinimaxConfig,
} from "../../_shared/minimax-config.ts";

loadLabEnv();

function withGroupId(url: string, cfg: MinimaxConfig): string {
	if (!cfg.groupId) return url;
	const sep = url.includes("?") ? "&" : "?";
	return `${url}${sep}GroupId=${encodeURIComponent(cfg.groupId)}`;
}

async function testChat(cfg: MinimaxConfig): Promise<void> {
	const url = withGroupId(`${cfg.apiBase}/v1/text/chatcompletion_v2`, cfg);
	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${cfg.apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: cfg.chatModel,
			messages: [{ role: "user", name: "user", content: "Di solo la palabra OK." }],
			temperature: 0,
		}),
	});
	const text = await res.text();
	let parsed: { base_resp?: { status_code?: number; status_msg?: string }; choices?: unknown[] } =
		{};
	try {
		parsed = JSON.parse(text) as typeof parsed;
	} catch {
		/* */
	}
	const code = parsed.base_resp?.status_code ?? (res.ok ? 0 : res.status);
	const reply =
		(parsed.choices as Array<{ message?: { content?: string } }> | undefined)?.[0]?.message
			?.content ?? "";
	console.log(`\n[chat] ${cfg.chatModel} @ ${cfg.apiBase}`);
	console.log(`  HTTP ${res.status} · base_resp ${code} · ${parsed.base_resp?.status_msg ?? ""}`);
	console.log(`  Key: ${minimaxKeyDisplay(cfg)}`);
	if (res.ok && code === 0) {
		console.log(`  Respuesta: ${String(reply).slice(0, 120)}`);
		console.log("  → OK chat (hola mundo)");
		process.exitCode = 0;
		return;
	}
	if (code === 1008) {
		console.log("  → Sin saldo/cuota usable (1008 insufficient balance)");
		if (cfg.keyKind === "paygo") {
			console.log("  Key pay-as-you-go: recarga Balance o cambia a Subscription Key sk-cp-* en /console/plan");
		} else if (cfg.keyKind === "subscription") {
			console.log("  Key Token Plan: revisa cuota en https://platform.minimax.io/console/plan o Plan Usage");
		} else {
			console.log("  Usa sk-cp-* (plan) o sk-api-* (balance) según https://platform.minimax.io/docs/guides/quickstart-preparation");
		}
		process.exitCode = 2;
		return;
	}
	if (code === 1002) {
		console.log("  → Rate limit (1002)");
		process.exitCode = 2;
		return;
	}
	if (res.status === 401 || res.status === 403) {
		console.log("  → Key inválida o región incorrecta (prueba MINIMAX_API_BASE=https://api.minimaxi.com)");
	}
	console.log(`  Body: ${text.slice(0, 500)}`);
	console.log("  → FALLO chat");
	process.exitCode = 1;
}

async function testSttProbe(cfg: MinimaxConfig): Promise<void> {
	const url = withGroupId(`${cfg.sttApiBase}/v1/stt/create`, cfg);
	const res = await fetch(url, {
		method: "POST",
		headers: { Authorization: `Bearer ${cfg.apiKey}` },
		body: new FormData(),
	});
	const text = await res.text();
	console.log(`\n[stt] ${cfg.sttModel} @ ${cfg.sttApiBase}/v1/stt/create`);
	console.log(`  HTTP ${res.status}`);
	if (res.status === 404) {
		console.log("  → STT no disponible en API oficial (esperado); Whisper debe usar Groq o gateway STT");
	} else if (res.status === 401 || res.status === 403) {
		console.log(`  Body: ${text.slice(0, 300)}`);
		console.log("  → Key rechazada en STT");
	} else {
		console.log(`  Body: ${text.slice(0, 300)}`);
	}
}

const cfg = loadMinimaxConfigFromEnv();
if (!cfg) {
	console.error("MINIMAX_API_KEY no cargada desde secrets/patyia/lab-langgraph.env");
	process.exit(1);
}

console.log("MiniMax API test");
console.log(`  ${minimaxKeyDisplay(cfg)}`);
console.log(`  MINIMAX_STT_MODE=${cfg.sttMode}`);
if (cfg.groupId) console.log(`  MINIMAX_GROUP_ID=${cfg.groupId}`);
if (cfg.keyKind === "paygo") {
	console.log(
		"  AVISO: tienes sk-api (pay-as-you-go). Con suscripción Monthly Plus usa sk-cp-* de /console/plan",
	);
}

await testChat(cfg);
await testSttProbe(cfg);

if (!process.exitCode) process.exitCode = 0;
