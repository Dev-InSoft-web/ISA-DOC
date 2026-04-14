const fs = require('fs');
const state = require('./state.cjs');
const {
	baseUrl,
	tokenFile,
	requestMaxRetries,
	requestRetryBaseDelayMs,
	listExtraRetries,
} = require('./config.cjs');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

let fetchDispatcher;
try {
	if (process.env.VERIFY_API_FETCH_KEEPALIVE !== '0') {
		const { Agent } = require('undici');
		fetchDispatcher = new Agent({
			keepAliveTimeout: 60_000,
			keepAliveMaxTimeout: 600_000,
		});
	}
} catch {
	fetchDispatcher = undefined;
}

function loadToken() {
	if (process.env.VERIFY_API_TOKEN) {
		state.token = process.env.VERIFY_API_TOKEN.trim();
		if (state.token) {
			console.log('[AUTH] Token cargado desde VERIFY_API_TOKEN. ✅');
			return true;
		}
	}
	if (fs.existsSync(tokenFile)) {
		try {
			const data = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
			if (data.token) {
				state.token = data.token;
				console.log('[AUTH] Token cargado desde token.json. ✅');
				return true;
			}
		} catch (e) {
			console.error('⛔ Error reading token file: ' + e.message);
		}
	}
	console.error('⛔ No hay token: defina VERIFY_API_TOKEN o cree .agent/token.json con { "token": "..." }');
	return false;
}

function saveToken(t) {
	fs.writeFileSync(tokenFile, JSON.stringify({ token: t }, null, 2));
	console.log('✅ Token saved to token.json.');
}

async function requestOnce(method, path, body = null) {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
		},
	};
	if (fetchDispatcher) options.dispatcher = fetchDispatcher;
	if (body) options.body = JSON.stringify(body);

	const separator = path.includes('?') ? '&' : '?';
	const url = `${baseUrl}${path}${separator}___ignoreAuth___=true`;

	try {
		const response = await fetch(url, options);
		const text = await response.text();
		let data = {};
		try {
			data = JSON.parse(text);
		} catch {
			data = { raw: text };
		}
		return { status: response.status, data };
	} catch (error) {
		return { status: 0, data: {}, _fetchError: error.message };
	}
}

function shouldRetryHttpStatus(status) {
	return status === 0 || status === 502 || status === 503 || status === 504;
}

async function request(method, path, body = null) {
	let last = { status: 0, data: {} };
	for (let attempt = 0; attempt <= requestMaxRetries; attempt++) {
		if (attempt > 0) {
			const delay = requestRetryBaseDelayMs * attempt;
			await sleep(delay);
			console.log(`   [request] reintento ${attempt}/${requestMaxRetries} (${delay}ms) — ${method} ${path}`);
		}
		last = await requestOnce(method, path, body);
		if (!shouldRetryHttpStatus(last.status)) {
			if (last._fetchError) delete last._fetchError;
			return last;
		}
	}
	if (last._fetchError) {
		console.error(`⛔ [${method}] ${path} - Network/Fetch Error: ` + last._fetchError);
		delete last._fetchError;
	}
	return last;
}

async function requestListGet(path) {
	let res = await request('GET', path);
	for (let t = 1; t <= listExtraRetries && res.status !== 200; t++) {
		const delay = 250 * t;
		await sleep(delay);
		console.log(`   [list] reintento extra ${t}/${listExtraRetries} (${delay}ms) — GET ${path}`);
		res = await request('GET', path);
	}
	return res;
}

module.exports = {
	sleep,
	request,
	requestListGet,
	loadToken,
	saveToken,
	baseUrl,
};
