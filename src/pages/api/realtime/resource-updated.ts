import type { APIRoute } from "astro";
import { broadcastResourceUpdated } from "../../../lib/core/realtime/socket-server.ts";
import type { ResourceKind, ResourceProject } from "../../../lib/core/realtime/resourceTypes.ts";

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = (await request.json()) as {
			id?: string;
			kind?: ResourceKind;
			project?: ResourceProject;
			path?: string;
		};
		if (!body?.id?.trim()) {
			return new Response(JSON.stringify({ ok: false, error: "id requerido" }), { status: 400 });
		}
		broadcastResourceUpdated({
			id: body.id.trim(),
			kind: body.kind ?? "generic",
			project: body.project,
			at: Date.now(),
			path: body.path,
		});
		return new Response(JSON.stringify({ ok: true }), { status: 200 });
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		return new Response(JSON.stringify({ ok: false, error: msg }), { status: 500 });
	}
};
