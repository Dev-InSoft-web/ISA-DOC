# `src/lib` — arquitectura

ISA-DOC organiza el código compartido en capas **Bulletproof / Feature-Layered**:

| Capa | Carpeta | Rol |
|------|---------|-----|
| **Core** | `core/` | Infraestructura sin dominio: BD, URL, realtime, registro de proyectos |
| **Shared** | `shared/` | Utilidades puras reutilizables (HTML, stores UI genéricos) |
| **SQL** | `sql/` | Esquema, fragmentos, stores de tablas, providers, migraciones ClientesIS, codegen DER |
| **Tree** | `tree/` | Modelo de nodos y persistencia del árbol SQL |
| **Integrations** | `integrations/` | Adaptadores externos: Mermaid, Hugging Face, Postman, modo estático |
| **Features** | `features/` | Dominios de producto: bitácora ISA, PatyIA, tickets |

## Reglas de dependencia

```
features/*  →  sql/, tree/, integrations/, core/, shared/
sql/*       →  core/, shared/
tree/*      →  shared/ (mínimo)
integrations/*  →  core/, shared/
core/*      →  (no importa features/)
```

Un feature **no** debe importar otro feature salvo acoplamiento documentado (p. ej. tickets → utilidades PatyIA).

## Documentación

- [ARCHITECTURE.md](./ARCHITECTURE.md) — capas, convenciones y ejemplos de import.
- [IMPORT-MAP.md](./IMPORT-MAP.md) — tabla rápida «ruta antigua → ruta nueva».
- [features/patyia/README.md](./features/patyia/README.md) — capas internas 010–070 de PatyIA.
