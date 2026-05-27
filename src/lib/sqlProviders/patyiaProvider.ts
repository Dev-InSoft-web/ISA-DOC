import type { DomainDef, DomainsMap } from "../codeGen/domains.ts";
import type { ParsedTable } from "../tableSchema.ts";
import { loadPatyiaSchema } from "../patyia/loadPatyiaSchema.ts";
import type { SqlDataProvider } from "./types.ts";

/**
 * Mapa `db -> table ids` derivado del último `loadTables`. Se cachea aquí
 * porque `buildSyntheticDomains(tables)` solo recibe la lista plana y necesita
 * la pertenencia por base de datos para construir los agrupadores herméticos.
 * El cache se actualiza cada vez que se invoca `loadTables`.
 */
let lastTableIdsByDatabase: Record<string, string[]> = {};

function buildDomains(dbMap: Record<string, string[]>): DomainsMap {
   const out: DomainsMap = {};
   for (const [db, ids] of Object.entries(dbMap)) {
      if (!ids.length) continue;
      const id = `db:${db}`;
      const dom: DomainDef = {
         id,
         name: db,
         type: "domain",
         masterTable: ids[0],
         members: ids,
         description: `Base de datos ${db}`,
      };
      out[id] = dom;
   }
   return out;
}

export const patyiaProvider: SqlDataProvider = {
   config: {
      derDomain: "patyia",
      hideColumnsInDiagram: true,
      readOnly: true,
      skipStatePersistence: true,
      skipBackfillSave: true,
   },
   async loadTables(): Promise<ParsedTable[]> {
      const { tables, tableIdsByDatabase } = await loadPatyiaSchema();
      lastTableIdsByDatabase = tableIdsByDatabase;
      return tables;
   },
   async saveTables(): Promise<void> {
      // No-op: el panel es read-only sobre la BD viva de PatyIA.
   },
   buildSyntheticDomains(_tables: ParsedTable[]): DomainsMap | null {
      if (!Object.keys(lastTableIdsByDatabase).length) return null;
      return buildDomains(lastTableIdsByDatabase);
   },
};
