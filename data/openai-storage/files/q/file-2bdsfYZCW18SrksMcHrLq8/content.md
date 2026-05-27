# Recepción de documentos - Descarga facturas electrónicas desde la DIAN en ContaPyme (Beta)
[Ver el video](https://www.youtube.com/watch?v=4yw9DmvdrqE)

## Tema principal
Descarga directa de facturas de proveedores desde la DIAN y su posterior contabilización y gestión de eventos electrónicos.

## Resumen general
Este video explica el funcionamiento de la herramienta experimental (Beta) de ContaPyme para descargar facturas electrónicas recibidas directamente desde el portal de la DIAN utilizando un token de acceso. Se detalla cómo convertir estos documentos descargados (preoperaciones) en registros contables de compras o gastos, cómo asociar productos y cuentas para automatizar futuras descargas, y el procedimiento paso a paso para emitir los eventos electrónicos (acuse, recibo y aceptación/reclamo) necesarios para cumplir con los requisitos tributarios y comerciales de la DIAN.

## Preguntas Frecuentes (FAQ)

### ¿En qué consiste la funcionalidad de recepción de documentos electrónicos en ContaPyme?
#### Respuesta
Es una herramienta que permite a las empresas descargar las facturas electrónicas emitidas por sus proveedores directamente desde la DIAN. Su objetivo principal es generar la contabilización automática de dichos documentos dentro del sistema, agilizando los procesos administrativos y contables de la empresa.

### ¿Qué requisitos debe cumplir mi empresa para usar la descarga de facturas desde la DIAN?
#### Respuesta
Para utilizar esta funcionalidad, debe asegurarse de cumplir con lo siguiente:
1. Tener activo el módulo de **Recepción de documentos y generación de eventos electrónicos** en el explorador gráfico de empresa.
2. Contar con un **Plan de documentos integral** que incluya la funcionalidad de descarga de documentos y eventos electrónicos.
3. Estar habilitado como **facturador electrónico** ante la DIAN (requisito indispensable para emitir eventos electrónicos).

### ¿Por qué la opción de descarga desde la DIAN aparece con la etiqueta "(Beta)"?
#### Respuesta
La etiqueta "(Beta)" indica que es una funcionalidad experimental. Esto se debe a que:
- No forma parte de una integración oficial, sino que descarga los datos directamente del portal de la DIAN.
- Su funcionamiento depende totalmente del portal externo de la entidad; si la DIAN realiza cambios en su seguridad o estructura, la opción podría dejar de funcionar sin previo aviso.
- Insoft no garantiza la disponibilidad continua de esta conexión por depender de terceros.
- Las credenciales usadas para el acceso no son almacenadas por ContaPyme, son de uso temporal.

### ¿Cuál es la ruta para acceder a la descarga de facturas desde la DIAN?
#### Respuesta
Para llegar a esta opción, siga esta ruta:
1. Abra el **Manejador de operaciones**.
2. Haga clic en el botón **Descargar facturas electrónicas recibidas**.
3. Seleccione la opción **Desde la DIAN (Beta)**.

### ¿Cómo se obtiene y utiliza el token de acceso de la DIAN en ContaPyme?
#### Respuesta
Para realizar la conexión con la DIAN y descargar los documentos, siga estos pasos:
1. En la ventana de descarga, ingrese los datos para loguearse como empresa o persona natural según corresponda.
2. Haga clic en **Entrar** para que la DIAN envíe un correo electrónico con el token de acceso (este token tiene una vigencia de una hora).
3. Abra su correo electrónico y busque el mensaje enviado por la DIAN.
4. **Importante:** Haga clic derecho sobre el enlace de acceso dentro del correo y seleccione la opción **"Copiar dirección de enlace"**.
5. Regrese a ContaPyme y, en el campo **"Acceso de la DIAN"**, pegue el enlace copiado.

### ¿Qué filtros de búsqueda se pueden aplicar para descargar las facturas?
#### Respuesta
En el paso 3 del asistente de descarga, puede definir qué documentos desea bajar:
- **Por periodo:** Los últimos 15 días, el último mes o una opción personalizada (con un rango máximo de un mes de consulta).
- **Por proveedor:** Filtrar para descargar únicamente los documentos emitidos por un NIT específico.

### ¿Qué es una "preoperación" y qué información contiene?
#### Respuesta
Una preoperación es el documento descargado que aún no afecta la contabilidad. Al visualizarla, usted encontrará:
- **Datos de encabezado:** Número de factura, fecha, emisor, valor, forma de pago y fecha de pago.
- **Representación gráfica:** Un PDF genérico asociado.
- **Archivo XML:** Contiene la información detallada del emisor, productos o servicios facturados y tributos (es la base para la interpretación del sistema).

### ¿Cómo se convierte una factura descargada en una operación contable?
#### Respuesta
Una vez descargada la preoperación, debe seguir estos pasos para contabilizarla:
1. Abra la preoperación desde el **Manejador de operaciones**.
2. Seleccione el tipo de operación a generar según su necesidad y licenciamiento (Compra, Gasto, Gasto Diferido, Compra de Activo o Asociar a operación existente).
3. Si es una **Compra**, verifique la bodega de entrada de mercancía.
4. Si es un **Gasto**, el sistema utilizará las cuentas contables previamente asociadas al proveedor.
5. Verifique que los tributos e impuestos coincidan con el XML.
6. Haga clic en **Finalizar**.

### ¿Cómo se asocian los productos del proveedor con el catálogo interno de ContaPyme?
#### Respuesta
Si el sistema no reconoce automáticamente un producto, puede realizar la asociación de la siguiente manera:
1. En la operación, vaya al catálogo de **Terceros**.
2. Seleccione el proveedor y haga clic en **Modificar**.
3. Diríjase a la pestaña **Datos proveedor**.
4. En la sección de productos, relacione los códigos que el proveedor envía en su factura con los códigos de su propio catálogo de inventario.

### ¿Cómo automatizar la contabilización de facturas de gastos recurrentes?
#### Respuesta
Para que el sistema sepa a qué cuenta contable cargar un gasto la próxima vez que descargue una factura de un proveedor:
1. En la ficha del tercero (proveedor), vaya a la pestaña **Datos proveedor**.
2. En la opción **Cuentas**, asocie los códigos de servicios/productos del proveedor con sus cuentas contables (ejemplo: cuentas del código 5 o 7).
En adelante, al descargar documentos de ese emisor, el sistema sugerirá automáticamente la cuenta contable definida.

### ¿Cuál es el procedimiento para generar eventos electrónicos en una factura?
#### Respuesta
Para reportar eventos a la DIAN sobre una factura recibida, siga estos pasos:
1. Ubíquese sobre la transacción (operación o preoperación) en el **Manejador de operaciones**.
2. Haga clic derecho y seleccione **Eventos electrónicos**.
3. Seleccione **Notificar para envío de eventos**. Esto envía la información al proveedor tecnológico.
4. Una vez notificado, haga clic en **Actualizar estado** hasta que el documento figure como "Reportado al proveedor tecnológico".
5. Seleccione el evento a realizar: **Acuse de recibo**, **Recibo del bien o servicio**, **Aceptación expresa** o **Reclamo**.
6. Diligencie la información del tercero que notifica (nombre, cargo, etc.) y haga clic en **Enviar**.

### ¿Qué sucede si no se emite una aceptación expresa después del recibo de bienes?
#### Respuesta
Una vez que se genera el evento de **Recibo del bien o prestación del servicio**, el usuario cuenta con **tres días hábiles** para enviar un evento de **Reclamo** o de **Aceptación expresa**. Si no se realiza ninguno, el proveedor podrá emitir un evento de **Aceptación tácita**, lo cual convierte la factura electrónica en un **título valor**, permitiendo su negociación en la plataforma Radian o su cobro por vía jurídica.

### ¿Cómo puedo rechazar una factura que descargué pero que tiene errores?
#### Respuesta
Si descargó una factura como preoperación y detecta errores, puede enviar un **Reclamo** sin necesidad de contabilizarla:
1. En el Manejador de operaciones, ubique la preoperación.
2. Haga clic derecho y seleccione **Eventos electrónicos** -> **Notificar para envío de eventos**.
3. Una vez reportada, seleccione la opción **Enviar reclamo**.
4. Elija el motivo del reclamo según el listado autorizado por la DIAN (ejemplo: "Mercancía no entregada totalmente").
5. El sistema enviará automáticamente los eventos previos necesarios (acuse y recibo) y luego el reclamo.
6. Finalmente, puede **Anular** la preoperación en ContaPyme para que no afecte la vista de documentos pendientes.

### ¿Cómo verificar los eventos electrónicos de una factura en el portal de la DIAN?
#### Respuesta
1. Dentro de la transacción en ContaPyme, vaya a la pestaña **Inspector de datos**.
2. Seleccione la pestaña **Documento eventos electrónicos**.
3. Haga clic sobre el enlace del **CUFE**.
4. El sistema abrirá la página oficial de la DIAN donde podrá visualizar el emisor, receptor y el historial de todos los eventos electrónicos emitidos para ese documento específico.

### ¿Es posible generar eventos electrónicos para múltiples facturas a la vez?
#### Respuesta
Sí. Usted puede seleccionar varias operaciones simultáneamente en el **Manejador de operaciones**. Siempre que todas se encuentren en el mismo estado (por ejemplo, todas con acuse de recibo ya realizado), puede ejecutar el siguiente evento de forma masiva para agilizar el proceso.

---

# Recepción de documentos - Descarga las Facturas electrónicas desde el correo
[Ver el video](https://www.youtube.com/watch?v=zVwQ3j1Q5H0)

## Tema principal
Proceso de descarga, configuración y contabilización automática de facturas electrónicas recibidas a través del buzón de recepción de ContaPyme.

## Resumen general
Este video explica detalladamente cómo utilizar la funcionalidad de recepción de documentos electrónicos para agilizar la contabilidad. Se describe cómo configurar un correo electrónico autorizado, el proceso de reenvío de facturas en formato .zip al buzón de Insoft y los pasos necesarios dentro de ContaPyme para descargar estas facturas, crear terceros automáticamente, relacionar productos o servicios y convertir los documentos en operaciones reales de compra o gasto.

## Preguntas Frecuentes (FAQ)

### ¿Qué requisitos previos se necesitan para usar la recepción de documentos electrónicos?
#### Respuesta
Para utilizar esta funcionalidad, la empresa debe cumplir con los siguientes puntos:
1.  **Habilitación ante la DIAN:** La empresa debe estar habilitada como facturador electrónico ante la DIAN.
2.  **Plan de documentos:** Se debe contar con un plan de documentos integral que incluya la funcionalidad de descarga de documentos y eventos electrónicos.
3.  **Configuración en el sistema:** El servicio debe estar activo en los parámetros de la empresa dentro de ContaPyme.

### ¿Cómo se configura el correo electrónico autorizado para enviar facturas al buzón?
#### Respuesta
Es obligatorio definir qué cuenta de correo será la única autorizada para reenviar documentos al sistema. Para configurarlo, siga estos pasos:
1.  Vaya al **Explorador gráfico de empresa**.
2.  Seleccione su empresa y haga clic en **Modificar**.
3.  En la pestaña **Servicios electrónicos**, asegúrese de que esté activa la opción **Manejo de recepción de facturas y eventos electrónicos**.
4.  Diríjase a la pestaña **Recepción** que aparecerá en la parte superior.
5.  Ingrese el correo electrónico en el campo correspondiente.
6.  **Confirmación obligatoria:** Revise la bandeja de entrada de ese correo y haga clic en el enlace de confirmación enviado por los servidores de Insoft para validar la asociación.

### ¿A qué dirección de correo se deben enviar las facturas para que el sistema las detecte?
#### Respuesta
Las facturas que reciba de sus proveedores deben ser reenviadas exclusivamente a la dirección: `recepcion@contapyme.com.co`. El sistema solo procesará correos que provengan de la cuenta que usted configuró y autorizó previamente en el Explorador gráfico de empresa.

### ¿Qué archivos debe contener el correo que se envía al buzón de recepción?
#### Respuesta
Debe enviarse el archivo **.zip** que el proveedor entrega habitualmente. Este archivo comprimido debe contener obligatoriamente:
-   El archivo **XML** de la factura.
-   La representación gráfica en formato **PDF**.

### ¿Cuál es el procedimiento para descargar las facturas en ContaPyme?
#### Respuesta
Una vez haya reenviado los correos al buzón de recepción, realice los siguientes pasos dentro del software:
1.  Abra el **Manejador de operaciones**.
2.  Haga clic en el botón **Descargar facturas recibidas**.
3.  Seleccione la opción **Del buzón de ContaPyme enviadas al correo de recepción**.
4.  Elija la opción **Enviadas desde un email** (esto filtrará los documentos enviados desde su cuenta configurada).
5.  Haga clic en **Siguiente**. El sistema mostrará las facturas detectadas.
6.  Seleccione las facturas deseadas y haga clic en **Descargar**.

### ¿Qué sucede si el proveedor que emite la factura no existe en mi catálogo de terceros?
#### Respuesta
Si el sistema detecta que el tercero no está creado, lo hará de forma automática al momento de procesar la pre-operación. ContaPyme extraerá la información (NIT, nombre, dirección, etc.) directamente desde el archivo XML de la factura electrónica para crear la ficha del tercero sin que usted deba digitar los datos.

### ¿Cómo se relacionan los productos del proveedor con mis propios códigos de inventario?
#### Respuesta
Dado que los proveedores usan códigos diferentes a los de su empresa, debe crear una relación por única vez siguiendo esta ruta:
1.  Vaya al **Catálogo de terceros** y busque al proveedor.
2.  Haga clic en **Modificar** y abra el **Formulario completo**.
3.  Diríjase a la pestaña **Datos del proveedor**.
4.  Use la sub-pestaña **Productos** para asociar el código del proveedor con un elemento de su inventario.
5.  Use la sub-pestaña **Cuentas** si prefiere asociar el código del proveedor directamente a una cuenta contable (útil para servicios o gastos).

### ¿Qué es una "pre-operación" en este proceso?
#### Respuesta
Al descargar una factura, el sistema genera inicialmente una **pre-operación**. Este es un documento informativo que **no afecta la contabilidad ni los inventarios** todavía. Sirve como un paso intermedio para que el usuario verifique la información, asocie productos y decida en qué tipo de transacción real (compra, gasto, etc.) la va a convertir.

### ¿Cómo convierto una factura descargada en una operación contable de compra o gasto?
#### Respuesta
1.  En el **Manejador de operaciones**, ubique la pre-operación descargada.
2.  En la parte inferior del formulario, verá botones como **Compra**, **Gasto**, **Gasto Diferido** o **Compra de Activos** (la disponibilidad depende de su licenciamiento).
3.  Haga clic en la opción deseada (por ejemplo, **Compra**).
4.  Indique la **bodega** de destino si es una compra de inventario.
5.  Verifique que las cantidades, precios y, sobre todo, los **tributos (IVA, retenciones)** coincidan con el documento original.
6.  Verifique la forma de pago y haga clic en **Guardar** o **Finalizar**. En este momento, la información afectará estados financieros y existencias.

### ¿Para qué sirve la opción "Descargar todas las facturas recibidas para el NIT"?
#### Respuesta
Esta opción es útil para empresas que tienen **múltiples unidades de negocio** (por ejemplo, una ferretería y un supermercado) que comparten el mismo NIT pero manejan correos de recepción diferentes. Al usar esta opción, el sistema descarga todas las facturas asociadas al NIT de la empresa actual, sin importar desde cuál de los correos autorizados de las distintas unidades fueron enviadas al buzón de recepción.

### ¿Qué debo hacer si necesito volver a descargar una factura que ya había sido procesada o eliminada?
#### Respuesta
Si por error se eliminó una operación o se necesita descargar de nuevo, use estos pasos:
1.  En el **Manejador de operaciones**, entre a **Descargar facturas recibidas**.
2.  Seleccione **Del buzón de ContaPyme...** y elija la tercera opción: **Descargar número de la factura recibida**.
3.  Ingrese los datos exactos del prefijo y número de la factura (FE).
4.  Haga clic en **Siguiente** para que el sistema busque el documento en su base de datos y lo descargue nuevamente (siempre que haya sido enviado al buzón previamente).

### ¿Por qué no me aparecen todas las opciones para convertir la pre-operación (como el botón "Compra")?
#### Respuesta
La visualización de los botones para convertir una pre-operación en transacciones reales depende estrictamente del **licenciamiento contratado**. Si su plan no incluye el módulo de compras, el botón "Compra" no estará disponible y solo verá opciones como "Gasto" o aquellas que su licencia permita.

---

# Recepción de documentos - Importar facturas electrónicas recibidas por XML o CUFE en ContaPyme
[Ver el video](https://www.youtube.com/watch?v=9Gyx5weTJSc)

## Tema principal
Descarga masiva e importación de facturas electrónicas de proveedores mediante archivos XML, códigos CUFE o listados de la DIAN para su posterior contabilización automática y gestión de eventos electrónicos.

## Resumen general
En este video se explica detalladamente cómo utilizar la funcionalidad de recepción de documentos en ContaPyme para descargar facturas emitidas por proveedores. Aprenderás a importar estos documentos utilizando tres métodos: ingresando el código CUFE, cargando archivos XML directamente o subiendo un listado de Excel descargado del portal de la DIAN. Además, se muestra el proceso para convertir estas "pre-operaciones" en transacciones contables reales (compras o gastos), el mapeo de productos y servicios, y la gestión completa de los eventos electrónicos obligatorios para facturas a crédito (acuse de recibo, recibo de bienes y aceptación o reclamo).

## Preguntas Frecuentes (FAQ)

### ¿Qué es la recepción de documentos y para qué sirve en ContaPyme?
#### Respuesta
Es una funcionalidad que permite a las empresas descargar las facturas electrónicas que sus proveedores les han emitido. Su objetivo principal es generar la contabilización automática de dichos documentos, agilizando el proceso administrativo y permitiendo la gestión de eventos electrónicos ante la DIAN.

### ¿Cuáles son los requisitos previos para utilizar la descarga de facturas y eventos electrónicos?
#### Respuesta
Para utilizar esta herramienta, la empresa debe cumplir con lo siguiente:
1. Tener activada la funcionalidad del servicio electrónico de manejo de recepción de facturas en el explorador gráfico de la empresa.
2. Estar habilitada como facturador electrónico ante la DIAN (para poder emitir eventos).
3. Contar con un **Plan de documentos integral** que incluya la funcionalidad de descarga de documentos y eventos electrónicos.

### ¿Cómo puedo importar una factura si solo tengo la representación gráfica (impresa) y no el XML?
#### Respuesta
Si solo tienes el documento impreso, puedes realizar la importación utilizando el código **CUFE** que aparece en la representación gráfica siguiendo estos pasos:

1. Dirígete a la ruta: **Manejador de operaciones > Descargar facturas electrónicas recibidas > Importar con archivos XML o con CUFEs**.
2. Selecciona la opción de importar mediante **CUFEs**.
3. En el campo **Listado de CUFEs**, pega el código único de la factura. Puedes ingresar varios códigos separándolos con Enter, coma (,) o punto y coma (;).
4. Haz clic en **Siguiente**.
5. Selecciona las facturas detectadas que deseas descargar y presiona **Siguiente**.
6. El sistema creará una "pre-operación" con la información del documento.

### ¿Cuál es el procedimiento para importar facturas masivamente desde archivos XML?
#### Respuesta
Si tienes los archivos XML (ya sea el "invoice" o el "attached document") guardados en tu equipo, sigue estos pasos:

1. Ingresa a: **Manejador de operaciones > Descargar facturas electrónicas recibidas > Importar con archivos XML o con CUFEs**.
2. Selecciona la opción **Archivos XML**.
3. Haz clic en **Seleccionar archivos** y busca en tu computador los archivos .xml o carpetas .zip que contienen las facturas.
4. Presiona **Abrir** para cargarlos en el listado y luego haz clic en **Siguiente**.
5. Marca las facturas que deseas procesar y finaliza el asistente para generar las pre-operaciones.

### ¿Cómo se descargan facturas utilizando el listado de Excel de la DIAN?
#### Respuesta
Este método es útil para descargar múltiples documentos de un periodo específico:

1. **En el portal de la DIAN:** Ingresa con tus credenciales, ve a la opción **Descarga de listados**, selecciona el rango de fechas y descarga el archivo de Excel.
2. **En ContaPyme:** Ve a **Manejador de operaciones > Descargar facturas electrónicas recibidas > Importar con archivos XML o con CUFEs**.
3. Selecciona la opción **Desde archivos de Excel**.
4. Haz clic en **Seleccionar**, busca el archivo descargado de la DIAN y presiona **Siguiente**.
5. El sistema analizará los CUFEs y mostrará solo las facturas que **no** están registradas en tu contabilidad.
6. Selecciona las facturas nuevas y haz clic en **Descargar**.

### ¿Puedo ver en el asistente de Excel facturas que ya fueron descargadas anteriormente?
#### Respuesta
Sí. Aunque el sistema por defecto solo muestra las facturas nuevas, puedes ver las ya existentes activando el botón de **"Ver documentos descargados previamente"**. Estos aparecerán en color gris. Esta opción es útil si eliminaste accidentalmente una transacción y necesitas volver a descargarla.

### ¿Qué sucede si el proveedor de la factura no existe en mi catálogo de terceros?
#### Respuesta
ContaPyme detecta automáticamente si el emisor de la factura electrónica ya está creado. Si no existe, el sistema **creará el tercero automáticamente** en tu catálogo utilizando la información contenida en el archivo XML al momento de convertir la pre-operación en una operación contable.

### ¿Cómo convierto una factura descargada (pre-operación) en una transacción de compra?
#### Respuesta
Una vez que la factura aparece como pre-operación en el manejador de operaciones, debes:

1. Abrir la pre-operación y seleccionar la opción **Convertir en una transacción de compra** (u otra según corresponda).
2. El sistema mapeará los productos. Si es un producto nuevo, deberás asociarlo a un código de tu inventario.
3. Indica la **bodega** donde ingresará la mercancía.
4. Verifica cantidades, precios e información tributaria que se cargan automáticamente desde el XML.
5. Asocia los impuestos del proveedor (IVA, retenciones) con tus conceptos de impuestos internos.
6. Haz clic en **Finalizar**.

### ¿Qué debo hacer si el XML contiene un servicio o gasto que no tengo en mi inventario?
#### Respuesta
Al convertir la pre-operación en una operación de gasto, el sistema te pedirá relacionar el código enviado por el proveedor con una cuenta de tu **Plan Único de Cuentas (PUC)**. Deberás:
1. Seleccionar la cuenta de gasto correspondiente (ej. servicios temporales).
2. Indicar el **centro de costos** al que se cargará el gasto.
3. El sistema recordará esta asociación para futuras facturas de ese mismo proveedor.

### ¿Cuál es el flujo para emitir eventos electrónicos a una factura a crédito?
#### Respuesta
Para las facturas con forma de pago a crédito, el proceso de eventos es el siguiente:

1. **Notificación:** Al finalizar la operación, acepta el mensaje de "notificar para envío" o haz clic derecho sobre la operación y selecciona **Notificar para envío**.
2. **Actualizar estado:** En el inspector de datos, pestaña "Documentos > Eventos electrónicos", haz clic en **Actualizar estado** hasta que aparezca como "Reportado al proveedor tecnológico".
3. **Evento 1: Acuse de recibo de la factura:** Selecciona el evento, indica el responsable y haz clic en **Enviar**. Actualiza el estado nuevamente.
4. **Evento 2: Recibo del bien o prestación del servicio:** Emite este evento para confirmar que recibiste la mercancía o el servicio. Actualiza el estado.
5. **Evento 3: Aceptación expresa o Reclamo:** Elige uno de los dos (son excluyentes).

### ¿Qué sucede si realizo un evento de "Reclamo" sobre una factura?
#### Respuesta
Si decides rechazar la factura mediante un evento de reclamo:
1. Debes seleccionar el motivo del reclamo (ej. mercancía no entregada totalmente).
2. Al enviar el evento, el sistema te preguntará si deseas **anular la transacción** en tu contabilidad.
3. Si aceptas, el documento quedará anulado y no afectará tus estados financieros, pero permanecerá en el historial con sus respectivos eventos ante la DIAN.

### ¿Es posible rechazar una factura antes de contabilizarla?
#### Respuesta
Sí, puedes enviar un **evento de reclamo directamente desde la pre-operación** sin necesidad de convertirla en compra o gasto. Para hacerlo:
1. Selecciona la pre-operación y haz clic en **Enviar reclamo**.
2. El sistema te pedirá realizar primero la **Notificación** del documento.
3. Automáticamente, ContaPyme generará de forma secuencial los eventos previos necesarios (Acuse de recibo y Recibo de bienes/servicios) antes de procesar el Reclamo.

### ¿Qué es la "Aceptación Tácita" y cuándo ocurre?
#### Respuesta
Según la normativa de la DIAN, una vez que emites el evento de "Recibo del bien o prestación del servicio", tienes **3 días hábiles** para manifestar un reclamo o una aceptación expresa. Si no realizas ninguna acción en ese plazo, el emisor de la factura podrá generar la **Aceptación Tácita**, convirtiendo el documento en un título valor que puede ser comercializado en el Radian.