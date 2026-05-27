import type { ParsedTable } from "../tableSchema.ts";
import type { SqlDataProvider } from "./types.ts";

export const clientesIsProvider: SqlDataProvider = {
   config: {
      derDomain: "clientesis",
      hideColumnsInDiagram: false,
      readOnly: false,
      skipStatePersistence: false,
      skipBackfillSave: false,
   },
   async loadTables(): Promise<ParsedTable[]> {
      const r = await fetch("/api/tables");
      const data = (await r.json()) as { ok?: boolean; tables?: ParsedTable[]; error?: string };
      if (!r.ok || !data.ok || !data.tables) throw new Error(data.error ?? `HTTP ${r.status}`);
      return data.tables;
   },
   async saveTables(tables: ParsedTable[]): Promise<void> {
      const r = await fetch("/api/tables", {
         method: "PUT",
         headers: { "content-type": "application/json" },
         body: JSON.stringify({ tables }),
         keepalive: true,
      });
      const data = (await r.json()) as { ok?: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
   },
};
