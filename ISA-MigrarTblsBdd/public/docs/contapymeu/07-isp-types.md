# ISP · Tipos compartidos

`ISP-ClientesIS` y `ISP-CLientesISServer` son los paquetes npm internos que
exportan los **contratos TypeScript** compartidos entre el backend
(ISS-ClientesIS-ContaPymeU) y el frontend (ISW-ClientesIS).

## Paquetes

| Paquete | Audiencia | Contenido típico |
| --- | --- | --- |
| `@ingenieria_insoft/isp-clientesis` | Cliente / Server | Tipos `T*Server`, `T*Client`, enums, contratos DTO. |
| `@ingenieria_insoft/isp-clientesis-server` | Solo backend | Lógica server-side reusable (fetch helpers, mappers, validaciones). |

## Convenciones de tipos

- Sufijo `Server` → forma persistida (snake/upper-case según BD).
- Sufijo `Client` → forma camelCase consumida por el frontend.
- Mappers `Server2Client(...)` y `Client2Server(...)` para conversión.

Ejemplo:

```ts
export type TCursoServer = {
  ICURSO: string;
  NCURSO: string;
  ITEMA: string;
  IDRIVER: number;
  DESCRIPCION: string;
  BACTIVO: 0 | 1;
};

export type TCursoClient = {
  icurso: string;
  ncurso: string;
  itema: string;
  idriver: number;
  descripcion: string;
  bactivo: boolean;
};
```

## Builders / mappers

Cada entidad expone helpers como:

```ts
export const Curso = {
  Server2Client(s: TCursoServer): TCursoClient { /* ... */ },
  Client2Server(c: TCursoClient): TCursoServer { /* ... */ },
};
```

## Versionado

Los paquetes se versionan con SemVer y se publican al registry interno con
`pub.ps1`. ISS y ISW deben actualizar a la misma versión MAYOR para
mantener compatibilidad.

## Sincronización con ISA

`scripts/fix-ispclientesis-index-dts.mjs` corrige paths absolutos en los
`*.d.ts` generados, y `sync-isp-clientesis.ps1` enlaza la build local a
ISS / ISW para iteración rápida.
