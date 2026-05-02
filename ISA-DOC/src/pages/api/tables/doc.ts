import type { APIRoute } from "astro";
import { readPersistedTree, readColumnsTree } from "../../../lib/tablesStore.server.ts";

/**
 * Devuelve documentación contextual.
 *
 * Query string:
 * - sin parámetros: doc del árbol completo (`tree-level`) + `entities` y `root`.
 * - `?nodeId=1.2`:    doc del nodo del árbol de tablas con ese rowId.
 * - `?prefix=CAPAC_`: doc del nodo prefijo (vigilante).
 * - `?table=NAME`:    doc de la tabla y de su árbol de columnas.
 * - `?table=NAME&col=NAME`: doc de una columna.
 */
export const GET: APIRoute = async ({ url }) => {
	try {
		const params = url.searchParams;
		const tableRef = params.get("table");
		const colName = params.get("col");
		const prefix = params.get("prefix");
		const nodeId = params.get("nodeId");

		const tree = await readPersistedTree();

		if (tableRef) {
			const cols = await readColumnsTree(tableRef);
			if (!cols) return notFound(`columns-tree para '${tableRef}'`);
			if (colName) {
				const col = (cols.root.children ?? []).find(
					(c) => String(c.obj?.name ?? "") === colName,
				);
				if (!col) return notFound(`columna '${colName}' en '${tableRef}'`);
				return ok({ scope: "col", tableRef, colName, doc: col.doc ?? null, obj: col.obj ?? null });
			}
			// Calcula el prefijo efectivo en runtime desde el árbol (no se persiste).
			const effectivePrefix = tree ? computeEffectivePrefix(tree.root, tableRef) : "";
			return ok({
				scope: "table",
				tableRef,
				tableMeta: { ...cols.tableMeta, effectivePrefix },
				treeDoc: cols.doc ?? null,
				rootDoc: cols.root.doc ?? null,
			});
		}

		if (!tree) return notFound("tables-tree");

		if (prefix) {
			const found = findNodeBy(tree.root, (n) => n.kind === "prefix" && String(n.obj?.prefix ?? n.obj?.rowName ?? "") === prefix);
			if (!found) return notFound(`prefijo '${prefix}'`);
			return ok({ scope: "prefix", id: found.id, doc: found.doc ?? null, obj: found.obj ?? null });
		}

		if (nodeId) {
			const found = findNodeBy(tree.root, (n) => n.id === nodeId);
			if (!found) return notFound(`nodo '${nodeId}'`);
			return ok({ scope: "node", id: found.id, kind: found.kind, doc: found.doc ?? null, obj: found.obj ?? null });
		}

		return ok({
			scope: "tree",
			treeDoc: tree.doc ?? null,
			rootDoc: tree.root.doc ?? null,
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
			status: 500, headers: { "content-type": "application/json; charset=utf-8" },
		});
	}
};

function ok(data: unknown): Response {
	return new Response(JSON.stringify({ ok: true, ...(data as object) }), {
		status: 200, headers: { "content-type": "application/json; charset=utf-8" },
	});
}

function notFound(what: string): Response {
	return new Response(JSON.stringify({ ok: false, error: `Documento no encontrado: ${what}` }), {
		status: 404, headers: { "content-type": "application/json; charset=utf-8" },
	});
}

interface MinimalNode {
	id: string;
	kind: string;
	obj?: Record<string, unknown>;
	doc?: unknown;
	children?: MinimalNode[];
}

function findNodeBy(root: MinimalNode, pred: (n: MinimalNode) => boolean): MinimalNode | null {
	if (pred(root)) return root;
	for (const ch of root.children ?? []) {
		const r = findNodeBy(ch, pred);
		if (r) return r;
	}
	return null;
}

/**
 * Calcula la cadena de `PrefixNode` ancestros para una tabla por `tableRef`.
 * Devuelve "" si no se halla o si la tabla está en la raíz.
 */
function computeEffectivePrefix(root: MinimalNode, tableRef: string): string {
	const target = String(tableRef);
	const dfs = (n: MinimalNode, chain: string[]): string | null => {
		if (n.kind === "table") {
			const ref = String(n.obj?.tableRef ?? n.obj?.rowName ?? "");
			if (ref === target) return chain.join("");
			return null;
		}
		const next = n.kind === "prefix" ? [...chain, String(n.obj?.prefix ?? n.obj?.rowName ?? "")] : chain;
		for (const c of n.children ?? []) {
			const r = dfs(c, next);
			if (r !== null) return r;
		}
		return null;
	};
	return dfs(root, []) ?? "";
}
