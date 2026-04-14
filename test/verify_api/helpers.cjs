function checkCoherence(actual, expected, context, errorIcon = '⛔') {
	let coherent = true;
	const details = [];

	if (!actual) {
		console.error(`   -> [${context}] Coherent: FALSE ${errorIcon}. Actual data is null/undefined.`);
		return false;
	}

	const checkDeep = (act, exp, prefix = '') => {
		for (const key of Object.keys(exp)) {
			const valExp = exp[key];
			const valAct = act[key];

			if (Array.isArray(valExp)) {
				if (!Array.isArray(valAct)) {
					coherent = false;
					details.push(`${prefix}${key}: expected Array, got ${typeof valAct}`);
					continue;
				}
				for (let i = 0; i < valExp.length; i++) {
					if (valAct[i]) checkDeep(valAct[i], valExp[i], `${prefix}${key}[${i}].`);
				}
			} else if (typeof valExp === 'object' && valExp !== null) {
				if (typeof valAct !== 'object' || valAct === null) {
					coherent = false;
					details.push(`${prefix}${key}: expected Object, got ${valAct}`);
				} else {
					checkDeep(valAct, valExp, `${prefix}${key}.`);
				}
			} else {
				if (valAct != valExp) {
					coherent = false;
					details.push(`${prefix}${key}: expected '${valExp}', got '${valAct}'`);
				}
			}
		}
	};

	checkDeep(actual, expected);

	if (coherent) {
		console.log(`   -> [${context}] Coherent: true ✅`);
		console.log('      Actual Data: ' + JSON.stringify(actual));
	} else {
		console.error(`   -> [${context}] Coherent: FALSE ${errorIcon}. Discrepancies: ${details.join(', ')}`);
		console.log('      Actual Keys: ' + Object.keys(actual).join(', '));
		console.log('      Actual Data: ' + JSON.stringify(actual));
	}
	return coherent;
}

function unwrap(resData) {
	let current = resData;
	if (current && typeof current === 'object' && 'respuesta' in current) current = current.respuesta;
	if (current && typeof current === 'object' && 'body' in current) current = current.body;
	if (current && typeof current === 'object' && 'datos' in current) current = current.datos;
	return current;
}

function filtroB64(obj) {
	return Buffer.from(JSON.stringify(obj), 'utf8').toString('base64');
}

function pkEqual(row, pk, keys) {
	return keys.every((k) => row[k] == pk[k]);
}

function listContainsAllPks(listData, pks, pkKeys) {
	if (!Array.isArray(listData)) return { ok: false, missing: pks };
	const missing = pks.filter((pk) => !listData.some((row) => pkEqual(row, pk, pkKeys)));
	return { ok: missing.length === 0, missing };
}

module.exports = {
	checkCoherence,
	unwrap,
	filtroB64,
	pkEqual,
	listContainsAllPks,
};
