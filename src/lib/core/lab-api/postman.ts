import { labFetch, labApiEnabled } from "./client.ts";

export type LabPostmanUi = {
	ok: boolean;
	project: string;
	meta: {
		info: { name: string; description?: string; schema: string };
		variable: { key: string; value: string; type?: string }[];
		entities: { slug: string; name: string; count: number }[];
	};
	envs: {
		active: string;
		environments: { id: string; name: string; values: { key: string; value: string; type?: string; enabled?: boolean }[] }[];
	};
	full: unknown;
	entities: Record<string, { name: string; description?: string; item: unknown[] }>;
};

export { labApiEnabled };

export async function fetchLabPostmanUi(project: "patyia" | "clientesis"): Promise<LabPostmanUi> {
	return labFetch<LabPostmanUi>(`/agent/postman-ui?project=${project}`);
}

export async function fetchLabAgentTask(body: {
	task: string;
	project?: string;
	mode?: "guide" | "execute";
}): Promise<unknown> {
	return labFetch("/agent/task", {
		method: "POST",
		body: JSON.stringify(body),
	});
}
