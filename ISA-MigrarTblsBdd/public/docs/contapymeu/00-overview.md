# ContaPymeU — Visión General

Este documento describe el módulo **ContaPymeU** dentro del ecosistema ClientesIS.
ContaPymeU es el dominio de **Capacitación / Recursos / Mensajes**, expuesto como un
microservicio de Azure Functions y consumido por la aplicación web ISW-ClientesIS.

## Stack

| Capa | Proyecto | Tecnología |
| --- | --- | --- |
| Backend | `ISS-ClientesIS-ContaPymeU` | Azure Functions v4 (Node.js, TypeScript) |
| Tipos / Server util | `ISP-ClientesIS`, `ISP-CLientesISServer` | TypeScript (paquetes npm internos) |
| Frontend | `ISW-ClientesIS` | Astro 5 + Svelte + `@ingenieria_insoft/ispsveltecomponents` |
| Datos | `GR-MSSQL · Clientes` | SQL Server (tablas `CAPAC_*`) |

## Topología

```
+-----------------+        +-------------------------+        +-------------------+
|  ISW-ClientesIS | <----> |  ISS-ClientesIS-ContaP. | <----> |  GR-MSSQL Clientes|
|  (Astro/Svelte) |  HTTP  |  (Azure Functions)      |  TDS   |  (CAPAC_*)        |
+-----------------+        +-------------------------+        +-------------------+
        ^                            ^
        |                            |
        +-----------+ ISP-ClientesIS / ISP-CLientesISServer (tipos & utilidades)
```

## Convenciones

- **Naming SQL**: tablas con prefijo `CAPAC_*` (Capacitación), claves primarias con
  prefijo `i*` (ej. `ICURSO`, `IPLANESTUDIO`, `IDRIVER`).
- **Endpoints CRUD genéricos**: cada entidad expone 9 acciones generadas por
  `registerCatalogoGenAzureFunction`:
  `Listar`, `Obtener`, `Verificar`, `Crear`, `Duplicar`, `Actualizar`,
  `Recodificar`, `Consolidar`, `Eliminar`.
- **Filtros**: el parámetro `:filtro` es un objeto JSON codificado en base64
  (`btoa(JSON.stringify({...}))`). El default `{}` es `e30=`.
- **Autenticación**: Bearer token (`{{token}}`) en todas las requests.
- **Generación automática**: la colección Postman y el OpenAPI YAML se regeneran
  desde el código de las funciones con `npm run swagger:gen`.

## Índice rápido

1. [Arquitectura](#01-arquitectura)
2. [Modelo de Datos](#02-modelo-datos)
3. [ISS · Backend (Azure Functions)](#03-iss-overview)
4. [ISS · Capacitación](#04-iss-capacitacion)
5. [ISS · Recursos](#05-iss-recurso)
6. [ISS · Mensajes](#06-iss-mensaje)
7. [ISP · Tipos compartidos](#07-isp-types)
8. [ISW · Frontend](#08-isw-frontend)
9. [Flujos](#09-flujos)
10. [Postman / OpenAPI](#10-postman-openapi)
