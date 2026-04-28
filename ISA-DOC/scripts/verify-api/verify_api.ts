import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runTests } from './run.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const now = new Date();
const date = now.toISOString().split('T')[0]!.replace(/-/g, '');
const time = now.toTimeString().split(' ')[0]!.replace(/:/g, '');
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
const logFile = path.join(logsDir, `out${date}_${time}.txt`);

const originalLog = console.log;
const originalError = console.error;

function write(msg: string, isError = false): void {
	const formatted = msg + '\n';
	fs.appendFileSync(logFile, formatted);
	if (isError) process.stderr.write(formatted);
	else process.stdout.write(formatted);
}

console.log = (msg: unknown): void => write(typeof msg === 'string' ? msg : String(msg));
console.error = (msg: unknown): void => write(typeof msg === 'string' ? msg : String(msg), true);

process.on('unhandledRejection', (reason, p) => {
	console.error(`⛔ Unhandled Rejection at: ${String(p)} reason: ${String(reason)}`);
	process.exit(1);
});
process.on('uncaughtException', (err) => {
	console.error(`⛔ Uncaught Exception: ${err instanceof Error ? err.stack ?? err.message : String(err)}`);
	process.exit(1);
});

runTests(logFile).catch((e: unknown) => {
	console.error(e instanceof Error ? e.stack ?? e.message : String(e));
	process.exit(1);
});

void originalLog;
void originalError;
