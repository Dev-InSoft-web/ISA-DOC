/**
 * Ejecuta solo verify_api/planOrder.cjs (orden jerárquico de iplan en planescurso).
 *
 * Uso:
 *   node run_plan_order.cjs CP40MOD610
 *   node run_plan_order.cjs CURSOTEST
 *
 * O: VERIFY_API_PLAN_ORDER_ICURSO=CP40MOD610 node run_plan_order.cjs
 *
 * Misma auth/base que verify_api.cjs: VERIFY_API_TOKEN, VERIFY_API_BASE_URL, .agent/token.json
 *
 * Salida también en .agent/out_plan_order_YYYYMMDD_HHMMSS.txt (VERIFY_API_PLAN_ORDER_LOG=0 para desactivar).
 */

const fs = require('fs');
const path = require('path');

const agentRoot = path.join(__dirname, '..');
const now = new Date();
const date = now.toISOString().split('T')[0].replace(/-/g, '');
const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
const logFile = path.join(agentRoot, `out_plan_order_${date}_${time}.txt`);

if (process.env.VERIFY_API_PLAN_ORDER_LOG !== '0') {
	function log(msg, isError = false) {
		const formattedMsg = msg + '\n';
		fs.appendFileSync(logFile, formattedMsg);
		if (isError) process.stderr.write(formattedMsg);
		else process.stdout.write(formattedMsg);
	}
	console.log = (msg) => log(msg);
	console.error = (msg) => log(msg, true);
}

const { loadToken, baseUrl } = require('../verify_api/http.cjs');
const { testPlanescursoOrderForCurso } = require('../verify_api/planOrder.cjs');

async function main() {
	const fromEnv = process.env.VERIFY_API_PLAN_ORDER_ICURSO?.trim();
	const fromArgv = process.argv.slice(2).filter(Boolean);
	const icursos = fromArgv.length ? fromArgv : fromEnv ? [fromEnv] : [];

	if (icursos.length === 0) {
		console.error('Uso: node run_plan_order.cjs <ICURSO> [ICURSO2 ...]');
		console.error('O defina VERIFY_API_PLAN_ORDER_ICURSO=...');
		process.exit(1);
	}

	console.log('--- Solo prueba: orden planescurso (planOrder.cjs) ---');
	if (process.env.VERIFY_API_PLAN_ORDER_LOG !== '0') {
		console.log('--- Log file: ' + logFile + ' ---');
	}
	console.log('--- Base URL: ' + baseUrl + ' ---');

	if (!loadToken()) {
		console.error('Abort: configure VERIFY_API_TOKEN o .agent/token.json');
		process.exit(1);
	}

	let okAll = true;
	for (const icurso of icursos) {
		const r = await testPlanescursoOrderForCurso(icurso, { label: icurso });
		if (!r) okAll = false;
	}
	process.exit(okAll ? 0 : 1);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
