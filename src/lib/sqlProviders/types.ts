import type { ParsedTable } from "../tableSchema.ts";
import type { DomainsMap } from "../codeGen/domains.ts";

/**
 * Configuración declarativa del panel SQL. Cualquier flag específico de
 * proyecto debe vivir aquí, NO como una rama hardcoded dentro del .svelte.
 * Cada proyecto que reuse `SqlBrowserPanel` declara su propio provider con
 * su `SqlBrowserConfig`.
 */
export interface SqlBrowserConfig {
   /**
    * Identificador del dominio para el cache del diagrama DER en
    * `/bd/codegen/der/<derDomain>.{json,svg}`. Sirve para que cada proyecto
    * mantenga su propio cache sin pisar al vecino.
    */
   derDomain: string;
   /**
    * Si `true`, el diagrama DER muestra solo cajas vacías (sin columnas).
    * Útil para esquemas externos donde solo interesan las relaciones.
    */
   hideColumnsInDiagram: boolean;
   /**
    * Si `true`, el panel está en modo solo lectura: no permite editar tablas
    * ni guardar cambios. Las acciones de edición/persistencia se inhiben.
    */
   readOnly: boolean;
   /**
    * Si `true`, NO se carga ni se persiste el state global de codegen
    * (`/api/codegen/state`, `nodeInfo`, dominios persistidos, snippets).
    * Útil para proyectos donde las tablas vienen de una BD viva y no se
    * deben mezclar con los metadatos de otro proyecto.
    */
   skipStatePersistence: boolean;
   /**
    * Si `true`, omite el `save` automático tras `backfill` de ids estables.
    * Útil cuando la fuente es de solo lectura (no hay endpoint donde
    * persistir los ids generados).
    */
   skipBackfillSave: boolean;
}

/**
 * Contrato de datos del panel SQL. Cada proyecto que aloje el panel implementa
 * uno y lo pasa como prop. El componente no debe hacer asunciones sobre el
 * origen de los datos: todo pasa por aquí.
 */
export interface SqlDataProvider {
   readonly config: SqlBrowserConfig;
   /** Carga la lista de tablas. */
   loadTables(): Promise<ParsedTable[]>;
   /**
    * Persiste la lista de tablas. En providers `readOnly` puede ser un
    * no-op; el panel ya inhibe la llamada según `config.readOnly` pero la
    * implementación debe ser segura aunque se invoque.
    */
   saveTables(tables: ParsedTable[]): Promise<void>;
   /**
    * Hook opcional: tras cargar las tablas, retorna un `DomainsMap` que se
    * inyecta vía `adapter.setDomains(map, false)` (sin persistir). Permite
    * agrupar tablas en dominios herméticos sintéticos derivados de la BD
    * (por ejemplo: un dominio por base de datos).
    */
   buildSyntheticDomains?(tables: ParsedTable[]): DomainsMap | null;
}
