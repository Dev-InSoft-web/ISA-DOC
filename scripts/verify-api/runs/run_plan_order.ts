import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadToken, baseUrl } from '../http.ts';
import { testPlanescursoOrderForCurso } from '../planOrder.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const agentRoot = path.resolve(__dirname, '..');
const now = new Date();
const date = now.toISOString().split('T')[0]!.replace(/-/g, '');
const time = now.toTimeString().split(' ')[0]!.replace(/:/g, '');
const logsDir = path.join(agentRoot, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
const logFile = path.join(logsDir, `out_plan_order_${date}_${time}.txt`);

if (process.env.VERIFY_API_PLAN_ORDER_LOG !== '0') {
	const write = (msg: string, isError = false): void => {
		const formatted = msg + '\n';
		fs.appendFileSync(logFile, formatted);
		if (isError) process.stderr.write(formatted);
		else process.stdout.write(formatted);
	};
	console.log = (msg: unknown): void => write(typeof msg === 'string' ? msg : String(msg));
	console.error = (msg: unknown): void => write(typeof msg === 'string' ? msg : String(msg), true);
}

async function main(): Promise<void> {
	const fromEnv = process.env.VERIFY_API_PLAN_ORDER_ICURSO?.trim();
	const fromArgv = process.argv.slice(2).filter(Boolean);
	const icursos = fromArgv.length ? fromArgv : fromEnv ? [fromEnv] : [];

	if (icursos.length === 0) {
		console.error('Uso: tsx runs/run_plan_order.ts <ICURSO> [ICURSO2 ...]');
		console.error('O defina VERIFY_API_PLAN_ORDER_ICURSO=...');
		process.exit(1);
	}

	console.log('--- Solo prueba: orden planescurso ---');
	if (process.env.VERIFY_API_PLAN_ORDER_LOG !== '0') {
		console.log('--- Log file: ' + logFile + ' ---');
	}
	console.log('--- Base URL: ' + baseUrl + ' ---');

	if (!loadToken()) {
		console.error('Abort: configure VERIFY_API_TOKEN o token.json');
		process.exit(1);
	}

	let okAll = true;
	for (const icurso of icursos) {
		const r = await testPlanescursoOrderForCurso(icurso, { label: icurso });
		if (!r) okAll = false;
	}
	process.exit(okAll ? 0 : 1);
}

main().catch((e: unknown) => {
	console.error(e instanceof Error ? e.stack ?? e.message : String(e));
	process.exit(1);
});
