Aquí tienes el documento completamente convertido a formato Markdown, respetando cada palabra y estructura de manera fiel:

# [cite_start]Guía de buenas prácticas para documentación de APIs en Postman [cite: 510]

| Depto. | Calidad de producto | Creación | 09/04/2026 | Código | [cite_start]DI-QA-001 | [cite: 509]
|---|---|---|---|---|---|
| **Tipo doc.** | Documento Informativo | **Dependencia** | Gestión documental | **Versión** | [cite_start]1.0 | [cite: 509]

| FECHA | Descripción | ELABORÓ | REVISÓ | [cite_start]APROBÓ | [cite: 511]
|---|---|---|---|---|
| 09/04/2026 | Se crea la versión inicial del documento | Álvaro Castaño | | [cite_start]| [cite: 511]
| CARGO | | Líder de Producción y Sistemas | | [cite_start]| [cite: 511]

---

## [cite_start]Contenido [cite: 512]
1. [cite_start]Propósito del documento [cite: 513]
1.1. [cite_start]Objetivo [cite: 514]
1.2. [cite_start]Alcance [cite: 515]
1.3. [cite_start]Principio fundamental [cite: 516]
1.4. [cite_start]Formato de documentación [cite: 517]
1.5. [cite_start]Patrones de documentación adoptados [cite: 518]
2. [cite_start]Principios fundamentales de documentación [cite: 519]
2.1. [cite_start]Claridad y simplicidad [cite: 520]
2.2. [cite_start]Documentar el propósito funcional [cite: 521]
2.3. [cite_start]Autosuficiencia [cite: 522]
2.4. [cite_start]Uso de ejemplos prácticos [cite: 523]
2.5. [cite_start]Consistencia [cite: 524]
2.6. [cite_start]Mantenimiento continuo [cite: 525]
2.7. [cite_start]Navegación clara [cite: 526]
3. [cite_start]Jerarquía de documentación en Postman [cite: 527]
3.1. [cite_start]Nivel proyecto (Workspace) [cite: 528]
3.2. [cite_start]Nivel colección [cite: 529]
3.3. [cite_start]Nivel carpeta [cite: 530]
3.4. [cite_start]Nivel endpoint [cite: 531]
3.5. [cite_start]Nivel ejemplos [cite: 532]
4. [cite_start]Estructura detallada de documentación por endpoint [cite: 533]
4.1. [cite_start]Nombre del endpoint [cite: 534]
4.2. [cite_start]Descripción funcional [cite: 535]
4.3. [cite_start]Método y ruta (URI) [cite: 536]
4.4. [cite_start]Esquema de autorización [cite: 537]
4.5. [cite_start]Headers requeridos [cite: 538]
4.6. [cite_start]Parámetros de entrada (Path y Query) [cite: 539]
4.7. [cite_start]Detalle del body (Propiedades de la petición) [cite: 540]
4.8. [cite_start]Respuestas [cite: 543]
4.9. [cite_start]Ejemplo de response exitoso [cite: 544]
4.10. [cite_start]Ejemplo de response de error [cite: 545]
4.11. [cite_start]Reglas de negocio y observaciones [cite: 546]
5. [cite_start]Documentación de Scripts (Pre-request y Post-response) [cite: 547]
5.1. [cite_start]Cómo documentar un Pre-request Script [cite: 548]
5.2. [cite_start]Cómo documentar un Post-response Script [cite: 549]
5.3. [cite_start]Cuando documentar Scripts [cite: 550]
6. [cite_start]Estándares técnicos y convenciones [cite: 551]
6.1. [cite_start]Uso de variables de entorno [cite: 552]
6.2. [cite_start]Convenciones de Naming [cite: 553]
6.3. [cite_start]Métodos HTTP [cite: 554]
7. [cite_start]Checklist de documentación completada [cite: 555]

---

## [cite_start]1. Propósito del documento [cite: 561]

### 1.1. [cite_start]Objetivo [cite: 562]
[cite_start]Esta guía establece un estándar común para documentar APIs REST en Postman. [cite: 563]
[cite_start]Su propósito es garantizar que cualquier desarrollador, QA, integrador o analista técnico pueda comprender y consumir una API sin necesidad de consultar al equipo que la desarrolló. [cite: 564]

[cite_start]Al seguir estas prácticas se logra: [cite: 565]
* [cite_start]Reducir errores de integración al proporcionar información completa y sin ambigüedades. [cite: 566]
* [cite_start]Acelerar el onboarding de nuevos miembros del equipo. [cite: 567]
* [cite_start]Garantizar uniformidad en la documentación de todos los proyectos y colecciones. [cite: 568]
* [cite_start]Facilitar el mantenimiento a largo plazo de la documentación. [cite: 569]

### 1.2. [cite_start]Alcance [cite: 570]
[cite_start]Esta guía aplica a APIs REST, tanto de servicios internos como externos, en proyectos nuevos y existentes. [cite: 571]
[cite_start]Está orientada a un público técnico medio: desarrolladores, QA, integradores y analistas técnicos. [cite: 572]

### 1.3. [cite_start]Principio fundamental [cite: 573]

> ℹ️ Una API bien documentada debe poder usarse sin necesidad de consultar al equipo que la desarrolló. [cite_start]Si alguien necesita preguntar cómo funciona un endpoint, la documentación ha fallado. [cite: 574]

### 1.4. [cite_start]Formato de documentación [cite: 575]
[cite_start]Toda la documentación en Postman debe escribirse en formato Markdown. [cite: 576]
[cite_start]Postman soporta Markdown en las descripciones de todos los niveles (Workspace, colección, carpeta y petición), lo que permite crear tablas, bloques de código, enlaces y formato enriquecido. [cite: 577]

### 1.5. [cite_start]Patrones de documentación adoptados [cite: 578]
[cite_start]Esta guía adopta los siguientes patrones para documentar cada endpoint de forma completa y uniforme: [cite: 579]
* [cite_start]**Tablas de parámetros:** Cada parámetro, header y propiedad del body se documenta en una tabla con columnas: nombre, tipo, si es requerido y descripción. [cite: 580]
* [cite_start]**Ejemplos ejecutables:** Cada endpoint incluye al menos un ejemplo de request y response completos, con datos realistas que se pueden ejecutar directamente en Postman. [cite: 581]
* [cite_start]**Tabla de respuestas:** Se documentan todos los códigos de estado HTTP posibles (exitosos y de error) con su significado y acción recomendada. [cite: 582]
* [cite_start]**Definición de modelos de datos:** Los objetos complejos (especialmente en bodies anidados) se describen en tablas separadas por cada subobjeto, con sus propiedades y tipos. [cite: 583]

---

## [cite_start]2. Principios fundamentales de documentación [cite: 584]

### 2.1. [cite_start]Claridad y simplicidad [cite: 585]
Escribir en un estilo directo y preciso. [cite_start]Evitar jerga técnica innecesaria y abreviaciones que puedan confundir al lector. [cite: 586]

| ✅ Correcto | [cite_start]❌ Incorrecto | [cite: 587]
|---|---|
| Obtiene la lista de órdenes del usuario autenticado. | Retorna entidades persistidas del módulo transaccional. [cite_start]| [cite: 587]
| Crea un nuevo ticket con los datos del body. | Ejecuta POST sobre recurso transaccional con payload serializado. [cite_start]| [cite: 587]
| Requiere token Bearer en el header Authorization. | Auth: Bearer (ver docs de IAM para flujo OAuth2 con PKCE). [cite_start]| [cite: 587]

### 2.2. [cite_start]Documentar el propósito funcional [cite: 588]
[cite_start]Cada endpoint debe responder tres preguntas fundamentales: [cite: 589]
* [cite_start]**¿Qué hace?** Descripción clara de la acción que realiza. [cite: 590]
* [cite_start]**¿Cuándo se usa?** Contexto funcional en el que se debe invocar. [cite: 591]
* [cite_start]**¿Qué problema resuelve?** Valor que aporta al flujo de negocio. [cite: 592]

### 2.3. [cite_start]Autosuficiencia [cite: 593]
[cite_start]Cada endpoint debe poder entenderse de forma independiente, sin necesidad de leer otros endpoints primero. [cite: 594]
[cite_start]Debe incluir toda la información necesaria: descripción, parámetros, ejemplos, errores posibles y reglas de negocio. [cite: 595]

### 2.4. [cite_start]Uso de ejemplos prácticos [cite: 596]
Todo endpoint debe tener al menos un ejemplo completo de request y response. [cite_start]Los ejemplos deben ser realistas y ejecutables. [cite: 597]
[cite_start]Usar datos de prueba que se parezcan a los datos reales del negocio (nombres de empresa creíbles, identificaciones con formato válido, valores monetarios razonables) en lugar de datos genéricos como "test123" o "abc". [cite: 598]

### 2.5. [cite_start]Consistencia [cite: 599]
[cite_start]Todos los endpoints deben seguir exactamente el mismo formato, orden de secciones y nivel de detalle. [cite: 600]
[cite_start]La consistencia reduce la carga cognitiva del lector. [cite: 601]

### 2.6. [cite_start]Mantenimiento continuo [cite: 602]
La documentación debe tratarse como parte del código fuente. [cite_start]Debe actualizarse en cada cambio de la API, antes de publicar nuevas versiones, y durante las revisiones de código. [cite: 603]

> ⚠️ **IMPORTANTE:** La revisión de documentación debe ser un paso obligatorio en el proceso de entrega. [cite_start]Un endpoint sin documentación actualizada no se considera terminado y no debe ser entregado. [cite: 604]

### 2.7. [cite_start]Navegación clara [cite: 605]
La estructura debe permitir encontrar cualquier endpoint rápidamente. [cite_start]Usar la jerarquía acordada (Proyecto › Colecciones › Carpetas › Endpoints › Ejemplos) para que la información fluya de lo general a lo específico. [cite: 606]
[cite_start]Dentro de cada descripción, aproveche el Markdown para crear índices con encabezados que faciliten la lectura. [cite: 607]

---

## [cite_start]3. Jerarquía de documentación en Postman [cite: 608]
Se adoptó una estructura jerárquica organizada en cinco niveles. [cite_start]Cada nivel tiene un propósito específico y un tipo de contenido diferente. [cite: 609]
[cite_start]Es crucial documentar cada nivel correctamente para que la información fluya de lo general a lo específico. [cite: 610]

| Nivel | Elemento en Postman | Propósito | [cite_start]Contenido Clave | [cite: 611]
|---|---|---|---|
| 1. Proyecto | Workspace | Contexto global del proyecto | [cite_start]Propósito, información común a todas las colecciones | [cite: 611]
| 2. Colección | Collection | Agrupa una API o servicio | [cite_start]Qué hace, URL base, autenticación, variables | [cite: 611]
| 3. Carpeta | Folder | Agrupa endpoints por recurso o escenario | [cite_start]Alcance, operaciones, modelo de datos, escenarios de prueba | [cite: 611]
| 4. Endpoint | Request | Documenta una petición | [cite_start]Parámetros, body, respuestas, scripts, errores | [cite: 611]
| 5. Ejemplos | Examples (Saved) | Casos de uso concretos | [cite_start]Request/response guardados por escenario | [cite: 611]

### 3.1. [cite_start]Nivel proyecto (Workspace) [cite: 612]
[cite_start]El Proyecto es el contenedor de nivel más alto y corresponde al Workspace de Postman. [cite: 613]
[cite_start]Contiene la documentación general del proyecto: su propósito, contexto de uso y cualquier información relevante para quien lo consulte por primera vez. [cite: 614]

> ℹ️ **PRINCIPIO:** La información que sea la misma para todas las colecciones debe ir en el Proyecto, no repetirse en cada colección. [cite_start]Esto incluye autenticación global, ambientes, convenciones de formato y estructura de errores. [cite: 615]

[cite_start]**Contenido del Proyecto:** [cite: 616]
* [cite_start]**Nombre del Proyecto:** Nombre claro y descriptivo del sistema. [cite: 617]
* [cite_start]**Descripción General:** Qué hace el sistema, cuál es su propósito y a quién está dirigido. [cite: 618]
* [cite_start]**Contexto de Uso:** En qué escenarios se consume esta API y quiénes son los consumidores típicos. [cite: 619]
* [cite_start]**Módulos / Colecciones:** Listado de las colecciones disponibles y su relación con los dominios funcionales. [cite: 620]
* [cite_start]**Autenticación Global:** Tipo de autenticación (Bearer, API Key, OAuth2), cómo obtener credenciales y dónde configurarlas. [cite: 621] [cite_start]Solo si aplica a todas las colecciones. [cite: 622]
* [cite_start]**Ambientes:** Listado de ambientes (Desarrollo, QA, Producción) con sus URLs base. [cite: 623]
* [cite_start]**Convenciones Globales:** Formato de fechas (ISO 8601), estructura estándar de respuestas, estructura de errores, paginación, versionado. [cite: 624]

[cite_start]**Ejemplo de plantilla Markdown para Proyecto (Workspace):** [cite: 625]
```markdown
# [cite_start]Sistema de Gestión de Pedidos - API [cite: 626]

## [cite_start]Descripción [cite: 627]
[cite_start]API REST para la gestión integral de pedidos, clientes y productos del sistema XYZ. [cite: 628]

## [cite_start]Contexto de Uso [cite: 629]
[cite_start]Esta API es consumida por el frontend web, la app móvil y sistemas de integración de terceros. [cite: 630]

## [cite_start]Colecciones [cite: 631]
| Colección     | [cite_start]Descripción                              | [cite: 632]
[cite_start]|--------------|------------------------------------------| [cite: 633]
| Usuarios     | [cite_start]Login, registro, tokens                  | [cite: 634]
| Pedidos      | [cite_start]CRUD de pedidos y seguimiento            | [cite: 635]
| Productos    | [cite_start]Consulta y gestión de productos          | [cite: 636]

## [cite_start]Autenticación (Global) [cite: 637]
Todas las peticiones requieren un token Bearer en el header Authorization. [cite_start]Para obtener el token, use POST /auth/login. [cite: 638]

## [cite_start]Ambientes [cite: 639]
| Ambiente    | [cite_start]URL Base                          | [cite: 640]
[cite_start]|-------------|-----------------------------------| [cite: 641]
| [cite_start]Desarrollo  | https://dev-api.ejemplo.com/v1    | [cite: 642]
| [cite_start]QA          | https://qa-api.ejemplo.com/v1     | [cite: 643]
| [cite_start]Producción  | https://api.ejemplo.com/v1        | [cite: 644]

## [cite_start]Convenciones Globales [cite: 645]
- [cite_start]Fechas: ISO 8601 (2026-04-09T14:30:00Z) [cite: 646]
- [cite_start]Respuestas: JSON { data, meta, errors } [cite: 647]
- [cite_start]Paginación: page y per_page como query params [cite: 648]
- [cite_start]Errores: Detalle de posibles problemas [cite: 649]
```

### 3.2. [cite_start]Nivel colección [cite: 650]
Cada colección representa una API o un servicio completo. [cite_start]La descripción de la colección es lo primero que verá un consumidor, así que debe establecer el contexto y guiar al usuario. [cite: 651]

> ⚠️ **IMPORTANTE:** Solo documente en la colección lo que sea específico de esta API. [cite_start]La información que sea común para todas las colecciones (autenticación global, ambientes, convenciones de formato) debe ir únicamente en el nivel Proyecto. [cite: 652]

[cite_start]**Contenido de la Colección:** [cite: 653]
* [cite_start]**Qué hace esta API:** Descripción funcional de la API y los servicios que expone. [cite: 654]
* [cite_start]**URL Base:** Variable `{{base_url}}` y la estructura de sus rutas. [cite: 655]
* [cite_start]**Patrón de Consumo:** Secuencia recomendada para consumir los endpoints (flujo típico de uso). [cite: 656]
* [cite_start]**Autenticación y Manejo de Sesión:** Mecanismo específico de esta API (si difiere del global). [cite: 657] [cite_start]Cómo se obtiene y renueva la sesión. [cite: 658]
* [cite_start]**Variables de Entorno Requeridas:** Listado de variables con descripción y ejemplo de valor. [cite: 659]
* [cite_start]**Convenciones Específicas:** Convenciones que aplican solo a esta colección (si las hay). [cite: 660]
* [cite_start]**Recomendaciones de Uso:** Buenas prácticas y advertencias para el consumo correcto de esta API. [cite: 661]

[cite_start]**Ejemplo de plantilla Markdown para Colección:** [cite: 662]
```markdown
# [cite_start]Colección: Gestión de Pedidos [cite: 663]

## [cite_start]Qué hace esta API [cite: 664]
[cite_start]Expone los servicios para crear, consultar, actualizar y [cite: 665]
cancelar pedidos. [cite_start]Permite también consultar el historial [cite: 666]
[cite_start]y estado de envío. [cite: 667]

## [cite_start]URL Base y Estructura de Rutas [cite: 668]
[cite_start]{{base_url}}/orders [cite: 669]
- [cite_start]/orders          → Operaciones sobre pedidos [cite: 670]
- [cite_start]/orders/{id}     → Operaciones sobre un pedido específico [cite: 671]
- [cite_start]/orders/{id}/items → Ítems de un pedido [cite: 672]

## [cite_start]Patrón de Consumo [cite: 673]
1. [cite_start]Autenticarse (POST /auth/login) [cite: 674]
2. [cite_start]Consultar productos disponibles (GET /products) [cite: 675]
3. [cite_start]Crear pedido (POST /orders) [cite: 676]
4. [cite_start]Consultar estado (GET /orders/{id}) [cite: 677]

## [cite_start]Autenticación y Sesión [cite: 678]
[cite_start]Usa la autenticación global (Bearer token). [cite: 679]
[cite_start]El token tiene una duración de 24 horas. [cite: 680]
[cite_start]Para renovar, ejecutar POST /auth/refresh. [cite: 681]

## [cite_start]Variables Requeridas [cite: 682]
| Variable   | Descripción             | [cite_start]Ejemplo            | [cite: 683, 684]
[cite_start]|------------|-------------------------|--------------------| [cite: 685]
| base_url   | [cite_start]URL base de la API      | https://api.ej.com | [cite: 686]
| token      | [cite_start]Token de acceso         | eyJhbGci...        | [cite: 687, 688]
| order_id   | [cite_start]ID del pedido activo    | ord_3645         | [cite: 689, 690]

## [cite_start]Recomendaciones [cite: 691]
- [cite_start]Siempre valide el stock antes de crear un pedido [cite: 692]
- [cite_start]Use paginación para listados grandes (max 100/página) [cite: 693]
- [cite_start]Los pedidos cancelados no pueden reactivarse [cite: 694]
```

### 3.3. [cite_start]Nivel carpeta [cite: 695]
[cite_start]Las carpetas (Folders en Postman) organizan los endpoints dentro de una colección. [cite: 696]
[cite_start]Pueden cumplir múltiples funciones: agrupar endpoints por recurso, separar dominios funcionales, y organizar escenarios de prueba. [cite: 697]
[cite_start]Las carpetas pueden contener subcarpetas para crear niveles adicionales de organización cuando sea necesario. [cite: 698]

[cite_start]**Contenido de la Carpeta:** [cite: 699]
* [cite_start]**Nombre:** Nombre descriptivo del recurso, dominio funcional o escenario. [cite: 700]
* [cite_start]**Alcance:** Qué tipo de operaciones o funcionalidades cubre esta carpeta. [cite: 701]
* [cite_start]**Operaciones Disponibles:** Listado resumido de los endpoints que contiene. [cite: 702]
* [cite_start]**Modelo de Datos (opcional):** Estructura del objeto principal que manejan los endpoints de esta carpeta. [cite: 703]

[cite_start]**Ejemplo de plantilla Markdown para Carpeta:** [cite: 704]
```markdown
# [cite_start]Tickets [cite: 705]

## [cite_start]Alcance [cite: 706]
[cite_start]Gestión completa del ciclo de vida de tickets de soporte: [cite: 707]
[cite_start]creación, consulta, actualización, asignación y cierre. [cite: 708]

## [cite_start]Operaciones [cite: 709]
| Método | Endpoint              | [cite_start]Descripción           | [cite: 710, 711]
[cite_start]|--------|-----------------------|-----------------------| [cite: 712]
| GET    | /tickets              | [cite_start]Listar tickets        | [cite: 713, 714]
| GET    | /tickets/{id}         | [cite_start]Obtener un ticket     | [cite: 715, 716]
| POST   | /tickets              | [cite_start]Crear ticket          | [cite: 717, 718]
| PUT    | /tickets/{id}         | [cite_start]Actualizar ticket     | [cite: 719, 720]
| DELETE | /tickets/{id}         | [cite_start]Eliminar ticket       | [cite: 721, 722]

## [cite_start]Modelo de Datos (JSON Format) [cite: 723]
[cite_start]
http://googleusercontent.com/immersive_entry_chip/0
http://googleusercontent.com/immersive_entry_chip/1

### 5.3. [cite_start]Cuando documentar Scripts [cite: 953]
No todos los endpoints tienen scripts. [cite_start]Solo documente scripts cuando existan. [cite: 954]
[cite_start]Incluya esta sección únicamente en los endpoints que tengan Pre-request o Post-response scripts configurados. [cite: 955]

| Tipo de Script | Casos Comunes | [cite_start]Qué Documentar | [cite: 956]
|---|---|---|
| Pre-request | Generar tokens, timestamps, firmas, validar variables, preparar datos dinámicos | [cite_start]Propósito, qué variables genera/modifica, por qué es necesario | [cite: 956]
| Post-response | Guardar tokens, extraer IDs, ejecutar tests, limpiar datos, encadenar llamadas | [cite_start]Propósito, qué variables guarda, qué validaciones ejecuta, por qué | [cite: 956]

---

## [cite_start]6. Estándares técnicos y convenciones [cite: 957]

### 6.1. [cite_start]Uso de variables de entorno [cite: 958]
Nunca use valores hardcodeados. [cite_start]Siempre use variables de Postman: [cite: 959]

| Variable | Uso | [cite_start]Ejemplo | [cite: 960]
|---|---|---|
| {{base_url}} | [cite_start]URL base de la API | [https://api.ejemplo.com/v1](https://api.ejemplo.com/v1) | [cite: 960]
| {{token}} | [cite_start]Token de autenticación | eyJhbGciOiJIUzI1NiIs... | [cite: 960]
| {{api_key}} | [cite_start]Llave de API (si aplica) | ak_live_abc123def456 | [cite: 960]

> ⚠️ **IMPORTANTE:** Nunca incluya datos sensibles reales en la documentación ni en los ejemplos guardados. [cite_start]Use siempre valores ficticios o placeholders. [cite: 961]

### 6.2. [cite_start]Convenciones de Naming [cite: 962]
[cite_start]Establezca convenciones claras para nombrar los elementos en Postman: [cite: 963]

| Elemento | Convención | [cite_start]Ejemplo | [cite: 964]
|---|---|---|
| Colecciones | Nombre de la API o servicio | [cite_start]Gestión de Pedidos, Soporte | [cite: 964]
| Carpetas | Nombre del recurso, dominio o escenario | [cite_start]Tickets, Seguridad, Escenarios de envío | [cite: 964]
| Endpoints | Verbo + Recurso | [cite_start]List Tickets, Create Order, Get User | [cite: 964]
| [cite_start]Variables | snake_case descriptivo | base_url, auth_token, user_id | [cite: 964]
| Ambientes | Ambiente + proyecto | [cite_start]Desarrollo - MiApp, QA - MiApp | [cite: 964]

[cite_start]**Convención de Prefijos Numéricos para Ordenamiento** [cite: 965]
Postman ordena las peticiones alfabéticamente por defecto. [cite_start]Para forzar un orden lógico de ejecución (especialmente útil en flujos que requieren secuencia), se puede usar un prefijo numérico en el nombre del endpoint: [cite: 966]
* [cite_start]000 Info → Información general del servicio [cite: 967]
* [cite_start]010 Creación JWT → Obtener token de autenticación [cite: 968]
* [cite_start]020 Info Token → Consultar información del token [cite: 969]
* [cite_start]030 Eliminar Token → Revocar token [cite: 970]
* [cite_start]100 Insertar y enviar doc → Operación principal [cite: 971]
* [cite_start]200 Info NIT → Consultar información de NIT [cite: 972]
* [cite_start]300 Resoluciones → Consultar resoluciones [cite: 973]

[cite_start]Los rangos numéricos permiten agrupar lógicamente: 0xx para autenticación, 1xx para operaciones principales, 2xx-3xx para consultas complementarias. [cite: 974]
[cite_start]Si se usa esta convención, debe aplicarse de forma consistente en toda la colección. [cite: 975]

### 6.3. [cite_start]Métodos HTTP [cite: 976]

| Método | Acción | Idempotente | [cite_start]Body | [cite: 977]
|---|---|---|---|
| GET | Consultar recursos | Sí | [cite_start]No | [cite: 977]
| POST | Crear recursos nuevos | No | [cite_start]Sí | [cite: 977]
| PUT | Reemplazar recurso completo | Sí | [cite_start]Sí | [cite: 977]
| PATCH | Actualizar campos específicos | No | [cite_start]Sí | [cite: 977]
| DELETE | Eliminar un recurso | Sí | [cite_start]No | [cite: 977]

---

## [cite_start]7. Checklist de documentación completada [cite: 978]
[cite_start]Para validar que la documentación esta completa, verifique que se cumplan todos los criterios: [cite: 979]

[cite_start]**Nivel Proyecto:** [cite: 980]
* [cite_start]Tiene descripción general del proyecto y contexto de uso [cite: 981]
* [cite_start]Documenta información común a todas las colecciones (autenticación global, ambientes, convenciones) [cite: 982]
* [cite_start]Lista las colecciones disponibles con su descripción [cite: 983]

[cite_start]**Nivel Colección:** [cite: 984]
* [cite_start]Describe qué hace la API y qué servicios expone [cite: 985]
* [cite_start]Documenta URL base y estructura de rutas [cite: 986]
* [cite_start]Incluye patrón de consumo (flujo de uso recomendado) [cite: 987]
* [cite_start]Documenta autenticación y manejo de sesión [cite: 988]
* [cite_start]Lista variables de entorno requeridas con ejemplo [cite: 989]
* [cite_start]Incluye convenciones específicas y recomendaciones de uso [cite: 990]
* [cite_start]No repite información que ya está en el Proyecto [cite: 991]

[cite_start]**Nivel Carpeta:** [cite: 992]
* [cite_start]Tiene descripción del alcance y funcionalidades que cubre [cite: 993]
* [cite_start]Incluye tabla de operaciones disponibles (cuando aplique) [cite: 994]
* [cite_start]Documenta el modelo de datos principal si maneja un recurso central [cite: 995]
* [cite_start]Si es carpeta de prueba: incluye Objetivo y Resultado esperado [cite: 996]

[cite_start]**Nivel Endpoint:** [cite: 997]
* [cite_start]Tiene nombre descriptivo (verbo + recurso, o con prefijo numérico si se usa esa convención) [cite: 998]
* [cite_start]Incluye descripción funcional (qué hace, cuándo usarlo) [cite: 999]
* [cite_start]Documenta parámetros de entrada (path, query, body) con tabla [cite: 1000]
* [cite_start]Documenta esquema de autorización y headers requeridos [cite: 1001]
* [cite_start]Todos los headers personalizados tienen descripción (no solo los estándar) [cite: 1002]
* [cite_start]Detalla todas las propiedades posibles del body [cite: 1003]
* [cite_start]Si el body es anidado: documenta cada subobjeto en tabla separada [cite: 1004]
* [cite_start]Incluye tabla de respuestas con códigos de estado [cite: 1005]
* [cite_start]Los scripts Pre-request y Post-response están EXPLICADOS en palabras (no copiado el código) [cite: 1006]
* [cite_start]Incluye reglas de negocio y dependencias [cite: 1007]
* [cite_start]No contiene datos sensibles reales [cite: 1008]
* [cite_start]Usa variables de entorno (no valores hardcodeados) [cite: 1009]

[cite_start]**Nivel Ejemplos:** [cite: 1010]
* [cite_start]Tiene al menos un ejemplo de respuesta exitosa (Happy Path) [cite: 1011]
* [cite_start]Incluye ejemplo de error de validación (para POST/PUT/PATCH) [cite: 1012]
* [cite_start]Incluye ejemplos de rechazo por reglas de negocio o servicios externos (cuando aplique) [cite: 1013]
* [cite_start]Los ejemplos tienen nombres descriptivos con código de estado y escenario [cite: 1014]
* [cite_start]Los datos de ejemplo son realistas y representativos [cite: 1015]

> ✅ **Nota Final:** Documentar no es opcional; es parte fundamental del desarrollo de una API. [cite_start]Trate la documentación como código: revísela, manténgala y mejórela continuamente. [cite: 1016]