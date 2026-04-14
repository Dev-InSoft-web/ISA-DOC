const fs = require('fs');
const path = require('path');

const now = new Date();
const date = now.toISOString().split('T')[0].replace(/-/g, '');
const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
const logFile = path.join(__dirname, `out${date}_${time}.txt`);

function log(msg, isError = false) {
	const formattedMsg = msg + '\n';
	fs.appendFileSync(logFile, formattedMsg);
	if (isError) process.stderr.write(formattedMsg);
	else process.stdout.write(formattedMsg);
}

console.log = (msg) => log(msg);
console.error = (msg) => log(msg, true);

process.on('unhandledRejection', (reason, p) => {
	console.error(`⛔ Unhandled Rejection at: ${p} reason: ${reason}`);
	process.exit(1);
});
process.on('uncaughtException', (err) => {
	console.error(`⛔ Uncaught Exception: ${err}`);
	process.exit(1);
});

const { runTests } = require('./verify_api/run.cjs');
runTests(logFile);
