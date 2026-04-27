# Arquitectura

## Diagrama de componentes

El microservicio **ContaPymeU** se divide en tres bloques funcionales:

- **Capacitación** — gestión de cursos, planes de estudio, drivers, atributos,
  estructuras, permisos, temas y plan-curso.
- **Recursos** — recursos, tipos de recurso, mensajes asociados a recursos,
  movimientos de contacto, calificaciones.
- **Mensajes** — mensajería transversal del sistema.

```
@Azure
+--------------------------------------------------------------------+
|  <<MicroServicio>> ContaPymeU                                      |
|                                                                    |
|  +---------------------------+   +-----------------------------+   |
|  | <<MicroServicio>> Curso   |   | <<MicroServicio>> Plan de   |   |
|  |  • <<end-point>> CRUD     |   |  Estudio                    |   |
|  |  • <<end-point>> [GET] L  |   |  • CRUD                     |   |
|  +---------------------------+   |  • [GET] Listar             |   |
|                                  |  • [GET] fulltree           |   |
|                                  +-----------------------------+   |
+--------------------------------------------------------------------+
                  |
                  | (BD MSSQL · GR-MSSQL Clientes)
                  v
+--------------------------------------------------------------------+
|  <<Aplicación web>> ISW-ClientesIS                                 |
|   • Cursos: CATALOGO, ACCIONES, DETALLE (Seguridad, Estructura,    |
|     Planes/Contenido, Drivers, Temas, Diagrama Árbol Tab)          |
|   • Plan de curso: Diagrama Organigrama, Detalle, Catálogo, …      |
+--------------------------------------------------------------------+
```

## Comunicación

| Origen | Destino | Protocolo | Notas |
| --- | --- | --- | --- |
| ISW-ClientesIS | ISS-ContaPymeU | HTTPS / JSON | Bearer token. CORS configurado por env. |
| ISS-ContaPymeU | MSSQL | TDS (mssql) | Connection string en `local.settings.json` (dev) o variables de entorno (prod). |
| ISA (orquestador) | ISS / ISW | sockets (puerto 4401) | Solo dev: ejecuta scripts/build/deploy. |

## Módulos del backend (`src/functions/`)

| Archivo | Registro principal | Responsabilidad |
| --- | --- | --- |
| `FN-Capacitacion.ts` | 11 entidades CAPAC_* | Cursos, Planes, Drivers, Permisos, Estructura, Atributos, Plan-Curso. |
| `FN-Recurso.ts` | 5 entidades | Recursos, Tipos de Recurso, Mensajes-Recurso, Movimientos-Contacto, Calificaciones. |
| `FN-Mensaje.ts` | 1 entidad | Mensajería transversal. |
| `FN-Swagger.ts` | — | Sirve `swagger-ui` en `/api/swagger`. |
| `XXX-Info.ts` | — | Endpoint `/api/info` con metadatos. |

## Helpers compartidos

- `@ingenieria_insoft/ispazureutils` →
  `registerCatalogoGenAzureFunction(ServerType, ClientType, opts)` genera 9
  endpoints CRUD a partir de un controlador y un cliente. Soporta `pk`,
  `nrecurso`, `nrecursos` y `omitir`.
- `registerInfoServerAzureFunction()` registra `/api/info`.

## Despliegue

El proyecto se despliega como **Function App** en Azure. Los hosts típicos son:

- **Dev local**: `http://localhost:20040` (puerto definido en `local.settings.json`).
- **Producción**: `https://<...>.azurewebsites.net`.

El orquestador ISA expone botones para:

- `npm run start` (Functions local).
- `npm run swagger:gen` (regenera Postman + OpenAPI).
- `pub.ps1` (deploy a Azure mediante zip-deploy o `func azure functionapp publish`).

## Diagramas de referencia

Ver pestaña **Documentación → Arquitectura / Modelo de Datos / Flujos** dentro
de la pantalla *Proyectos → ContaPymeU*. Las imágenes están en
`public/imgs/`:

- `030 Capacitación.png` — diagrama UML de componentes.
- `DER Capacitación.jpg` — DER de las tablas `CAPAC_*`.
- `Diagrama ORM (Mapeo Relacional de Objetos)1 (1).png` — ORM completo
  (incluye Recursos y Mensajes).
- `DER GET.png` / `DER UPDATE.png` — flujos de consulta y edición.
