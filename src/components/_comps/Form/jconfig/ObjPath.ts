function resolveDotPath(record: unknown, path: string): unknown {
	return record == null ? undefined : path.split(".").reduce<unknown>((acc, seg) => (acc == null ? acc : (acc as Record<string, unknown>)[seg]), record);
}

function setDotPath(record: unknown, path: string, value: unknown): void {
	if (record == null) return;
	const parts = path.split(".");
	const last = parts.pop();
	if (!last) return;
	const target = parts.reduce<Record<string, unknown> | null>((acc, seg) => (acc == null ? null : (acc[seg] as Record<string, unknown> | null)), record as Record<string, unknown>);
	if (target == null) return;
	target[last] = value;
}

export const ObjPath = { get: resolveDotPath, set: setDotPath };
