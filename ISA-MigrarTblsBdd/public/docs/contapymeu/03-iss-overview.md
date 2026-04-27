# ISS · Backend (Azure Functions)

`ISS-ClientesIS-ContaPymeU` es el microservicio que expone el dominio
ContaPymeU como **Azure Functions v4** sobre Node.js + TypeScript.

## Estructura del proyecto

```
ISS-ClientesIS-ContaPymeU/
├── host.json
├── local.settings.json          (no comiteado: secretos en dev)
├── package.json
├── tsconfig.json
├── scripts/
│   ├── gen-postman.ts           (genera doc/iss-postman.json desde FN-*.ts)
│   ├── gen-openapi.ts           (genera swagger/openapi.yaml + parchea path params)
│   └── postman-store.ts         (split/merge de la colección Postman)
├── src/
│   ├── functions/
│   │   ├── FN-Capacitacion.ts
│   │   ├── FN-Recurso.ts
│   │   ├── FN-Mensaje.ts
│   │   ├── FN-Swagger.ts
│   │   └── XXX-Info.ts
│   └── …
└── swagger/
    └── openapi.yaml             (generado)
```

## Scripts npm

| Script | Acción |
| --- | --- |
| `npm run start` | Levanta `func start` localmente. |
| `npm run swagger:gen` | Encadena `postman:gen` → genera `openapi.yaml`. |
| `npm run postman:gen` | Reescribe `doc/iss-postman.json` desde `FN-*.ts`. |
| `npm run test` | Lint con `oxlint`. |

## Generador de endpoints CRUD

Se utiliza el helper `registerCatalogoGenAzureFunction` de
`@ingenieria_insoft/ispazureutils`:

```ts
registerCatalogoGenAzureFunction(ServerType, ClientType, {
  pk:        ["icurso"],
  nrecurso:  "curso",      // singular (default: pk[0] sin la 'i')
  nrecursos: "cursos",     // plural   (default: nrecurso + 's')
  omitir:    ["Duplicar"], // opciones: Listar, Obtener, Verificar, Crear,
                           // Duplicar, Actualizar, Recodificar, Consolidar,
                           // Eliminar
});
```

Esto genera automáticamente:

| Operación | Método | Ruta |
| --- | --- | --- |
| Listar | `GET` | `/api/{nrecursos}/:filtro` |
| Obtener | `GET` | `/api/{nrecurso}/:pk1[/:pk2…]` |
| Verificar | `GET` | `/api/{nrecurso}/verificar/:pk1[/…]` |
| Crear | `POST` | `/api/{nrecurso}` |
| Duplicar | `POST` | `/api/{nrecurso}/duplicar/:pk1[/…]` |
| Actualizar | `PUT` | `/api/{nrecurso}/:pk1[/…]` |
| Recodificar | `PUT` | `/api/{nrecurso}/recodificar/:pk1[/…]` |
| Consolidar | `PUT` | `/api/{nrecurso}/consolidar/:pk1[/…]` |
| Eliminar | `DELETE` | `/api/{nrecurso}/:pk1[/…]` |

## Convenciones de filtros

`:filtro` siempre es base64 de un objeto JSON:

```ts
const filtro = btoa(JSON.stringify({ activo: true, texto: "java" }));
fetch(`/api/cursos/${filtro}`);
```

Default `{}` → `e30=`.

## Autenticación

Todos los endpoints requieren `Authorization: Bearer {{token}}`.
El token se genera por el flujo de seguridad del cliente; el dev local lo
inyecta vía `host_seguridad` (entorno Postman) y los tests pueden usar
`{{uuidtoken}}`.

## Rutas custom

Además de los CRUD generados, se declaran rutas explícitas con `app.get/...`:

```ts
app.get("API_GET_CursoRecursoPlan", {
  route: "curso/recursoplan/{icurso}",
  authLevel: "anonymous",
  handler: handlerImpl,
});
```

| Función | Método | Ruta |
| --- | --- | --- |
| `API_GET_CursoRecursoPlan` | GET | `/api/curso/recursoplan/{icurso}` |
| `API_GET_RecursoMensajes` | GET | `/api/recurso/{irecurso?}/mensajes` |
| `API_GET_RecursoMensajeRespuestas` | GET | `/api/recurso/mensaje/respuestas/{imensaje?}` |
| `API_GET_RecursoCalificacionesExplorador` | GET | `/api/recursos/calificaciones/explorador` |
| `API_GET_RecursoBuscador` | GET | `/api/recursos/buscar/{filtro?}` |

## Generación de documentación

`npm run swagger:gen` ejecuta:

1. **`scripts/gen-postman.ts`** — escanea cada `FN-*.ts` con regex y detecta:
   - Llamadas a `registerCatalogoGenAzureFunction` (lee `pk`, `nrecurso`,
     `nrecursos`, `omitir`).
   - Llamadas `app.{get,post,put,delete}(name, { route, … })` para endpoints
     custom.
2. Construye items Postman con auth Bearer, header `Content-Type`, URL
   `{{host_contapymeu}}/api/...` y `variable[]` con valores y descripciones por
   defecto.
3. Para cada entidad mergea cuerpo de ejemplo (`BODY_EXTRAS`) con los PK,
   genera 9 endpoints (menos `omitir`).
4. Mergea `response[]` y `description` previos preservando ejemplos guardados.
5. **`scripts/gen-openapi.ts`** — invoca `postman-to-openapi`, luego
   post-procesa el YAML:
   - Convierte `:var` → `{var}` (formato OpenAPI estándar).
   - Inyecta `parameters: in: path` con `example`, `description` y
     `required: true` por cada placeholder.

## Variables de entorno

Definir en `local.settings.json` para dev y en App Settings de Azure para prod:

| Clave | Descripción |
| --- | --- |
| `MSSQL_HOST` / `MSSQL_USER` / `MSSQL_PASSWORD` / `MSSQL_DB` | Conexión BD. |
| `JWT_SECRET` o equivalente | Validación de tokens. |
| `CORS_ORIGINS` | Lista de orígenes permitidos. |

> Ver `README_CONEXION_BD.md` para la guía completa de conexión.
