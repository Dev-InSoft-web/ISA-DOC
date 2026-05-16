type AnyObj = Record<string, unknown>;

export function checkCoherence(
	actual: AnyObj | null | undefined,
	expected: AnyObj,
	context: string,
	errorIcon = "⛔",
): boolean {
	let coherent = true;
	const details: string[] = [];

	if (!actual) {
		console.error(`   -> [${context}] Coherent: FALSE ${errorIcon}. Actual data is null/undefined.`);
		return false;
	}

	const checkDeep = (act: AnyObj, exp: AnyObj, prefix = ""): void => {
		for (const key of Object.keys(exp)) {
			const valExp = exp[key];
			const valAct = act?.[key];

			if (Array.isArray(valExp)) {
				if (!Array.isArray(valAct)) {
					coherent = false;
					details.push(`${prefix}${key}: expected Array, got ${typeof valAct}`);
					continue;
				}
				for (let i = 0; i < valExp.length; i++) {
					if (valAct[i]) checkDeep(valAct[i] as AnyObj, valExp[i] as AnyObj, `${prefix}${key}[${i}].`);
				}
			} else if (typeof valExp === "object" && valExp !== null) {
				if (typeof valAct !== "object" || valAct === null) {
					coherent = false;
					details.push(`${prefix}${key}: expected Object, got ${valAct}`);
				} else {
					checkDeep(valAct as AnyObj, valExp as AnyObj, `${prefix}${key}.`);
				}
			} else {
				// eslint-disable-next-line eqeqeq
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
		console.log("      Actual Data: " + JSON.stringify(actual));
	} else {
		console.error(`   -> [${context}] Coherent: FALSE ${errorIcon}. Discrepancies: ${details.join(", ")}`);
		console.log("      Actual Keys: " + Object.keys(actual).join(", "));
		console.log("      Actual Data: " + JSON.stringify(actual));
	}
	return coherent;
}

export function unwrap(resData: unknown): any {
	let current: any = resData;
	if (current && typeof current === "object" && "respuesta" in current) current = current.respuesta;
	if (current && typeof current === "object" && "body" in current) current = current.body;
	if (current && typeof current === "object" && "datos" in current) current = current.datos;
	return current;
}

export function filtroB64(obj: unknown): string {
	return Buffer.from(JSON.stringify(obj), "utf8").toString("base64");
}

export function pkEqual(row: AnyObj, pk: AnyObj, keys: string[]): boolean {
	// eslint-disable-next-line eqeqeq
	return keys.every((k) => row[k] == pk[k]);
}

export function listContainsAllPks(
	listData: unknown,
	pks: AnyObj[],
	pkKeys: string[],
): { ok: boolean; missing: AnyObj[] } {
	if (!Array.isArray(listData)) return { ok: false, missing: pks };
	const missing = pks.filter((pk) => !listData.some((row) => pkEqual(row as AnyObj, pk, pkKeys)));
	return { ok: missing.length === 0, missing };
}
