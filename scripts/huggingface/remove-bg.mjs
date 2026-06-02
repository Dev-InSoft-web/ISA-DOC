/**
 * CLI: quita fondo con @huggingface/inference (ver scripts/lib/huggingface-remove-bg.mjs).
 *
 * Uso:
 *   npm run huggingface:remove-bg -- ruta/entrada.png [ruta/salida.png]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { removeBackgroundFromBuffer } from "../lib/huggingface-remove-bg.mjs";

function outPathFor(input, explicitOut) {
	if (explicitOut) return explicitOut;
	const { dir, name, ext } = path.parse(input);
	const base = name.replace(/-nobg$/, "");
	return path.join(dir, `${base}-nobg${ext || ".png"}`);
}

async function main() {
	const [inputArg, outputArg] = process.argv.slice(2);
	if (!inputArg) {
		console.error("Uso: npm run huggingface:remove-bg -- <entrada> [salida]");
		process.exit(1);
	}

	const input = path.resolve(inputArg);
	const output = path.resolve(outPathFor(input, outputArg));

	const image = await fs.readFile(input);
	console.log(`Entrada: ${input} (${image.length} bytes)`);

	const result = await removeBackgroundFromBuffer(image, { allowFallback: true });
	await fs.mkdir(path.dirname(output), { recursive: true });
	await fs.writeFile(output, result);
	console.log(`Salida: ${output} (${result.length} bytes)`);
}

main().catch((err) => {
	console.error(err instanceof Error ? err.message : err);
	process.exit(1);
});
