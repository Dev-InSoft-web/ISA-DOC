import type { APIRoute } from "astro";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const prerender = false;

interface RunEngineBody {
	engine: "responses" | "agents-poc";
}

export const POST: APIRoute = async ({ request }): Promise<Response> => {
	let body: RunEngineBody;
	try {
		body = (await request.json()) as RunEngineBody;
	} catch {
		return new Response(
			JSON.stringify({ ok: false, error: "JSON inválido" }),
			{ status: 400, headers: { "content-type": "application/json" } }
		);
	}

	const { engine } = body;
	if (!engine || !["responses", "agents-poc"].includes(engine)) {
		return new Response(
			JSON.stringify({ ok: false, error: "Engine inválido" }),
			{ status: 400, headers: { "content-type": "application/json" } }
		);
	}

	try {
		const isaDocRoot = path.resolve(__dirname, "../../..");
		const scriptPath = path.join(isaDocRoot, "scripts", "test-single-engine.mjs");

		const env = {
			...process.env,
			ENGINE: engine,
			JWT: process.env.JWT || "",
			ITERCERO: process.env.ITERCERO || "810000630",
			ICONTACTO: process.env.ICONTACTO || "702470",
			BASE_URL: process.env.BASE_URL || "http://localhost:7071/api",
		};

		const { stdout } = await execAsync(`node "${scriptPath}"`, {
			env,
			cwd: isaDocRoot,
			timeout: 5 * 60 * 1000,
		});

		const iconMatch = /iconversacion=(\d+)/.exec(stdout);
		const iconversacion = iconMatch ? Number.parseInt(iconMatch[1], 10) : undefined;

		return new Response(
			JSON.stringify({ ok: true, message: `Test ${engine} completado`, iconversacion }),
			{ status: 200, headers: { "content-type": "application/json" } }
		);
	} catch (error) {
		const msg = error instanceof Error ? error.message : String(error);
		console.error(`[test/run-engine] Error ejecutando test ${engine}:`, msg);

		return new Response(
			JSON.stringify({ ok: false, error: `Falló la ejecución: ${msg}` }),
			{ status: 500, headers: { "content-type": "application/json" } }
		);
	}
};
