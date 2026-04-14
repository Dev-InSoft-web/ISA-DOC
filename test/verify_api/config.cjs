const path = require('path');

const agentRoot = path.join(__dirname, '..');

const baseUrl = process.env.VERIFY_API_BASE_URL || 'http://localhost:20040';
const tokenFile = path.join(agentRoot, 'token.json');

const requestMaxRetries = Math.max(0, Number.parseInt(process.env.VERIFY_API_REQUEST_RETRIES ?? '5', 10) || 0);
const requestRetryBaseDelayMs = Math.max(50, Number.parseInt(process.env.VERIFY_API_REQUEST_RETRY_DELAY_MS ?? '350', 10) || 350);
const listExtraRetries = Math.max(0, Number.parseInt(process.env.VERIFY_API_LIST_EXTRA_RETRIES ?? '3', 10) || 0);

module.exports = {
	agentRoot,
	baseUrl,
	tokenFile,
	requestMaxRetries,
	requestRetryBaseDelayMs,
	listExtraRetries,
};
