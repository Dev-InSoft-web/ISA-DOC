# Arquitectura

## Componentes del módulo Capacitación

![Diagrama UML de componentes](/imgs/030%20Capacitaci%C3%B3n.png)

> El diagrama oficial está en `public/imgs/030 Capacitación.png`.
> Capacitación gestiona las entidades **Curso**, **Plan de Estudio**,
> **Driver**, **Permiso** y sus pivotes (`PlanCurso`, `CursoPlanEstudio`,
> `Prerrequisito`, `Atributos`, `Seguridad`, `Estructura`). El dominio de
> **Recursos** es externo: Capacitación lo consulta pero no lo gestiona.

## Comunicación

| Origen | Destino | Protocolo | Notas |
| --- | --- | --- | --- |
| ISW-ClientesIS | ISS-ContaPymeU | HTTPS / JSON | Bearer token. CORS configurado por env. |
| ISS-ContaPymeU | MSSQL | TDS (mssql) | Connection string en `local.settings.json` (dev) o variables de entorno (prod). |
| ISA (orquestador) | ISS / ISW | sockets (puerto 4401) | Solo dev: ejecuta scripts/build/deploy. |

## Módulo de Capacitación en el backend

`src/functions/FN-Capacitacion.ts` registra todas las entidades del
módulo. Cada llamada a `registerCatalogoGenAzureFunction` genera el CRUD
estándar para una entidad. Adicionalmente declara una ruta custom
(`API_GET_CursoRecursoPlan`).

## Helpers compartidos

- `@ingenieria_insoft/ispazureutils` →
  `registerCatalogoGenAzureFunction(ServerType, ClientType, opts)` genera 9
  endpoints CRUD a partir de un controlador y un cliente. Soporta `pk`,
  `nrecurso`, `nrecursos` y `omitir`.
- `registerInfoServerAzureFunction()` registra `/api/info`.

## Despliegue

Function App en Azure. Hosts típicos:

- **Dev local**: `http://localhost:20040`.
- **Producción**: `https://<…>.azurewebsites.net`.

ISA expone botones para `npm run start`, `npm run swagger:gen` y `pub.ps1`.

## Diagramas de referencia

Imágenes alojadas en `public/imgs/` (visibles también en la sub-pestaña
*Documentación* de la pantalla *Proyectos → ContaPymeU*):

- `030 Capacitación.png` — diagrama UML de componentes.
- `DER Capacitación.jpg` — DER de las tablas `CAPAC_*`.
- `DER GET.png` / `DER UPDATE.png` — flujos.
