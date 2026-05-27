import type { DomainChildRef, DomainDef, DomainsMap } from "../codeGen/domains.ts";
import type { ParsedTable, TableColumn } from "../tableSchema.ts";
import { loadPatyiaSchema } from "../patyia/loadPatyiaSchema.ts";
import type { SqlDataProvider } from "./types.ts";

/**
 * Snapshot del último `loadTables` cacheado a nivel de módulo. `buildSynthetic
 * Domains(tables)` solo recibe la lista plana, así que necesitamos preservar la
 * pertenencia por BD y las instancias parseadas para reconstruir el grafo FK.
 */
let lastTablesByDatabase: Record<string, ParsedTable[]> = {};

function tableFks(t: ParsedTable, byName: Map<string, ParsedTable>, byNormName: Map<string, ParsedTable>): string[] {
   const refs: string[] = [];
   const push = (name: string): void => { if (!refs.includes(name)) refs.push(name); };
   for (const r of t.columns) {
      const col = r as TableColumn;
      if (col?.foreignKey?.refTable) push(col.foreignKey.refTable);
   }
   for (const rel of t.relations ?? []) if (rel.refTable) push(rel.refTable);
   if (refs.length > 0) return refs;
   const stripPlural = (s: string): string => s.endsWith("ES") ? s.slice(0, -2) : s.endsWith("S") ? s.slice(0, -1) : s;
   const stripStg = (s: string): string => s.replace(/^STG__?/, "");
   const normalize = (s: string): string => stripPlural(stripStg(s).replace(/_/g, ""));
   for (const r of t.columns) {
      const col = r as TableColumn;
      if (!col?.name) continue;
      if (!/^I[A-Z][A-Z0-9_]*$/.test(col.name)) continue;
      const root = col.name.slice(1);
      const direct = byName.get(root) ?? byName.get(`${root}S`) ?? byName.get(`${root}ES`);
      if (direct && direct.id !== t.id) { push(direct.name); continue; }
      const ref = byNormName.get(normalize(root));
      if (ref && ref.id !== t.id) push(ref.name);
   }
   return refs;
}

function buildBdDomain(db: string, parsed: ParsedTable[]): DomainDef[] {
   if (!parsed.length) return [];
   const bdId = `db:${db}`;
   const byName = new Map<string, ParsedTable>();
   const byNormName = new Map<string, ParsedTable>();
   const byId = new Map<string, ParsedTable>();
   const stripStg = (s: string): string => s.replace(/^STG__?/, "");
   const norm = (s: string): string => {
      const n = stripStg(s).replace(/_/g, "");
      return n.endsWith("ES") ? n.slice(0, -2) : n.endsWith("S") ? n.slice(0, -1) : n;
   };
   const collapseName = (s: string): string => stripStg(s).replace(/_/g, "").toUpperCase();
   for (const t of parsed) {
      byName.set(t.name, t);
      byNormName.set(norm(t.name), t);
      byId.set(t.id, t);
   }

   const outgoing = new Map<string, string[]>();
   const inDeg = new Map<string, number>();
   for (const t of parsed) { outgoing.set(t.id, []); inDeg.set(t.id, 0); }
   for (const t of parsed) {
      const fks = tableFks(t, byName, byNormName);
      const ids: string[] = [];
      for (const refName of fks) {
         const ref = byName.get(refName);
         if (!ref || ref.id === t.id) continue;
         if (!ids.includes(ref.id)) ids.push(ref.id);
      }
      outgoing.set(t.id, ids);
      for (const o of ids) inDeg.set(o, (inDeg.get(o) ?? 0) + 1);
   }

   const pivotsMap = new Map<string, [string, string]>();
   for (const t of parsed) {
      const outs = outgoing.get(t.id) ?? [];
      if (outs.length !== 2) continue;
      const [aId, bId] = outs;
      const a = byId.get(aId);
      const b = byId.get(bId);
      if (!a || !b) continue;
      const tN = collapseName(t.name);
      if (tN.includes(collapseName(a.name)) && tN.includes(collapseName(b.name))) {
         pivotsMap.set(t.id, [aId, bId]);
      }
   }

   const masters = new Set<string>();
   for (const t of parsed) {
      const outs = outgoing.get(t.id) ?? [];
      if (outs.length !== 0) continue;
      const refByNonPivot = parsed.some((p) => !pivotsMap.has(p.id) && (outgoing.get(p.id) ?? []).includes(t.id));
      if (refByNonPivot) masters.add(t.id);
   }

   const slaveExclusiveCount = new Map<string, number>();
   for (const m of masters) slaveExclusiveCount.set(m, 0);
   for (const t of parsed) {
      if (masters.has(t.id) || pivotsMap.has(t.id)) continue;
      const mastersOuted = (outgoing.get(t.id) ?? []).filter((o) => masters.has(o));
      if (mastersOuted.length === 1) slaveExclusiveCount.set(mastersOuted[0], (slaveExclusiveCount.get(mastersOuted[0]) ?? 0) + 1);
   }

   const assigned = new Map<string, string>();
   const pointersFromTable = new Map<string, string[]>();
   for (const t of parsed) {
      if (masters.has(t.id) || pivotsMap.has(t.id)) continue;
      const outs = outgoing.get(t.id) ?? [];
      const mastersOuted = outs.filter((o) => masters.has(o));
      if (mastersOuted.length === 0) continue;
      let chosen = mastersOuted[0];
      if (mastersOuted.length > 1) {
         const sorted = [...mastersOuted].sort((a, b) => (slaveExclusiveCount.get(a) ?? 0) - (slaveExclusiveCount.get(b) ?? 0));
         chosen = sorted[0];
      }
      assigned.set(t.id, chosen);
      const others = mastersOuted.filter((m) => m !== chosen);
      if (others.length) pointersFromTable.set(t.id, others);
   }

   const ensureMasterDomain = (m: string, byMaster: Map<string, DomainDef>): DomainDef => {
      const ex = byMaster.get(m);
      if (ex) return ex;
      const mTbl = byId.get(m)!;
      const d: DomainDef = {
         id: `${bdId}:${mTbl.name}`,
         name: mTbl.name,
         type: "domain",
         masterTable: m,
         members: [m],
         parentId: bdId,
         childrenOrder: [],
         description: `Dominio derivado de ${mTbl.name}`,
      };
      byMaster.set(m, d);
      return d;
   };

   const masterDomainsByMaster = new Map<string, DomainDef>();
   for (const t of parsed) {
      const tid = assigned.get(t.id);
      if (!tid) continue;
      const dom = ensureMasterDomain(tid, masterDomainsByMaster);
      dom.members.push(t.id);
      const order = dom.childrenOrder ?? [];
      order.push({ kind: "table", key: t.id });
      const ptrs = pointersFromTable.get(t.id) ?? [];
      for (const p of ptrs) order.push({ kind: "pointer", key: p });
      dom.childrenOrder = order;
   }

   const pivotDomains: DomainDef[] = [];
   for (const [pId, [aId, bId]] of pivotsMap) {
      const aIsMaster = masters.has(aId);
      const bIsMaster = masters.has(bId);
      let masterEnd = aId;
      let otherEnd = bId;
      if (bIsMaster && !aIsMaster) { masterEnd = bId; otherEnd = aId; }
      else if (aIsMaster && bIsMaster) {
         if ((inDeg.get(bId) ?? 0) > (inDeg.get(aId) ?? 0)) { masterEnd = bId; otherEnd = aId; }
      } else if (!aIsMaster && !bIsMaster) {
         masters.add(aId);
         masterEnd = aId;
         otherEnd = bId;
      }
      const parent = ensureMasterDomain(masterEnd, masterDomainsByMaster);
      const pTbl = byId.get(pId)!;
      const pivId = `${bdId}:${byId.get(masterEnd)!.name}:pivot:${pTbl.name}`;
      const pivot: DomainDef = {
         id: pivId,
         name: pTbl.name,
         type: "pivot",
         cardinality: "N:N",
         masterTable: pId,
         members: [pId, otherEnd],
         parentId: parent.id,
         childrenOrder: [{ kind: "table", key: otherEnd }],
         description: `Pivote N:N ${byId.get(masterEnd)!.name} ↔ ${byId.get(otherEnd)!.name}`,
      };
      pivotDomains.push(pivot);
      parent.childrenOrder = [...(parent.childrenOrder ?? []), { kind: "pivot", key: pivId }];
   }

   const inDomain = new Set<string>();
   for (const d of masterDomainsByMaster.values()) for (const m of d.members) inDomain.add(m);
   for (const p of pivotDomains) for (const m of p.members) inDomain.add(m);

   const looseTables: string[] = [];
   for (const t of parsed) if (!inDomain.has(t.id)) looseTables.push(t.id);

   const subDomains = [...masterDomainsByMaster.values(), ...pivotDomains];

   const bdChildren: DomainChildRef[] = [
      ...[...masterDomainsByMaster.values()].map((s) => ({ kind: "domain" as const, key: s.id })),
      ...looseTables.map((id) => ({ kind: "table" as const, key: id })),
   ];

   const bd: DomainDef = {
      id: bdId,
      name: db,
      type: "bd",
      masterTable: "",
      members: looseTables,
      description: `Base de datos ${db}`,
      childrenOrder: bdChildren,
   };
   return [bd, ...subDomains];
}

function buildDomains(tablesByDb: Record<string, ParsedTable[]>): DomainsMap {
   const out: DomainsMap = {};
   for (const [db, parsed] of Object.entries(tablesByDb)) {
      for (const d of buildBdDomain(db, parsed)) out[d.id] = d;
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
      const { tables, tablesByDatabase } = await loadPatyiaSchema();
      lastTablesByDatabase = tablesByDatabase;
      return tables;
   },
   async saveTables(): Promise<void> {
      // No-op: el panel es read-only sobre la BD viva de PatyIA.
   },
   buildSyntheticDomains(_tables: ParsedTable[]): DomainsMap | null {
      if (!Object.keys(lastTablesByDatabase).length) return null;
      return buildDomains(lastTablesByDatabase);
   },
};
