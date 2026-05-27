# gm_recepcion_documentos.md
> **Propósito:** Documentar procedimientos paso a paso del módulo **Recepción de documentos**, garantizando que Paty IA pueda explicar procesos con claridad y precisión.
> **Tipo de documento:** Guía de montaje (GM)
> **Función:** Procedimientos detallados 
> **Fecha:** 12/05/2026
> **Versión:** 1

---

# Guía de montaje

## Recepción de documentos y Eventos electrónicos

Esta guía presenta las diferentes opciones que una empresa tiene para descargar facturas electrónicas que le han emitido y posteriormente generar la contabilización automática de dichos documentos descargados.

La descarga de facturas aplica tanto para facturas electrónicas con forma de pago contado como crédito. A las facturas a crédito, adicionalmente, se les pueden emitir los eventos electrónicos indicados por la DIAN.

> **Requisito:** Para poder utilizar esta funcionalidad se debe contar con un plan de documentos integral que permita la funcionalidad de: **"Descarga de documentos y eventos electrónicos"**.

---

# Contenido de esta guía

- [Sección 1 - Recepción de documentos (Descargar FE recibidas)](#sección-1---recepción-de-documentos-descargar-fe-recibidas)
- [Sección 2 – Conversión de pre-operaciones y contabilización automática](#sección-2--conversión-de-pre-operaciones-y-contabilización-automática)
- [Sección 3 – Eventos electrónicos](#sección-3--eventos-electrónicos)

---

# Sección 1 - Recepción de documentos (Descargar FE recibidas)

Para la descarga de facturas electrónicas se debe ingresar al "Manejador de operaciones", opción: **"Descargar FE recibidas"**.

![Opciones de descarga de facturas electrónicas en el manejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/01_descarga_fe_manejador.png)

Al dar clic en el botón, se desplegarán diferentes opciones para realizar la descarga de facturas por diferentes métodos:

![Opciones de descarga de facturas electrónicas recibidas](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/02_opciones_descarga_fe_recibidas.png)

> **Consideración sobre proveedor tecnológico:** Algunas de las funcionalidades de descarga o recepción de documentos que se mencionan en esta guía solo aplican cuando la empresa tenga configurado como proveedor tecnológico a: **InSoft**. Cada opción presentada indicará para cuál proveedor tecnológico aplica.

> **Aviso importante – Opción "Desde la DIAN (Beta)":** La funcionalidad "Desde la DIAN (Beta)" permite la descarga de facturas electrónicas directamente desde el portal de la DIAN usando el token generado en el Portal de la DIAN – Facturando electrónicamente. No forma parte de una integración oficial y su funcionamiento depende del comportamiento del portal externo de la entidad.

---

## Opción 1 - Descargar FE recibidas: Del buzón de ContaPyme (enviadas a correo de recepción)

![Opción de descarga de facturas electrónicas recibidas desde el buzón de ContaPyme - Enviadas al correo de recepción](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/03_descarga_desde_buzón.png)

Al ingresar a esta opción se muestran 3 posibles formas de descarga de documentos:

- Enviadas desde email…
- Todas las recibidas para el NIT…
- Número de la factura recibida

### A. Enviadas desde el email…

Esta opción permite la descarga de facturas electrónicas que fueron enviadas desde el correo de la empresa al buzón de **recepcion@contapyme.com.co**.

![Opciones de descarga de facturas electrónicas desde el buzón de Contapyme](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/04_opciones_desde_buzón.png)

Se debe tener presente que las facturas que se analizan y descargan con esta opción corresponden únicamente a aquellas que han sido enviadas desde el correo electrónico configurado en la empresa para el envío de facturas y eventos electrónicos al buzón de recepcion@contapyme.com.co.

El correo electrónico se configura en la creación o edición de la empresa, en la pestaña Recepción. Este corresponde al correo desde el cual se reenviarán las facturas (archivo en formato .zip que contiene el XML y PDF) y eventos electrónicos, hacia el buzón de recepción.

**Ruta de configuración:** `[Explorador gráfico de la empresa > Empresa > Clic derecho Modificar > Pestaña Recepción (Correo electrónico)]`

![Activar el manejo de recepción de documentos desde la empresa](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/05_activar_rd_empresa.png)

### B. Todas las recibidas para el NIT…

Las facturas analizadas y descargadas con esta opción serán aquellas que hayan sido enviadas desde los correos electrónicos configurados en empresas que compartan el mismo NIT, ya sea dentro de la misma área de trabajo o en diferentes áreas.

![Opción de descargar todas las facturas electrónicas recibidas para el NIT](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/06_todas_para_nit.png)

- Esta opción tiene en cuenta los correos electrónicos configurados en las empresas o unidades de negocio siempre y cuando compartan el mismo NIT.
- Permite procesar documentos enviados desde cualquiera de los correos asociados a dichas empresas, siempre que correspondan al mismo NIT.
- A diferencia del filtro "Enviadas desde el email", no se limita a un único correo, sino que considera todos los correos configurados en empresas con el mismo NIT.
- Para su funcionamiento, se deben tener configurados los correos electrónicos en cada empresa que comparta el mismo NIT, ya sea dentro de la misma área de trabajo o en diferentes áreas.

#### Ejemplo

La empresa Grupo Novoa con NIT 100200300 tiene varias unidades de negocio: Ferretería Novoa con correo ferreteria@novoa.com, Supermercado Novoa con correo supermercado@novoa.com en la misma área de trabajo y adicionalmente cuenta con Distribuidora Novoa con correo distribuidora@novoa.com en otra área. El sistema analizará y descargará las facturas que hayan sido reenviadas desde cualquiera de estos correos al buzón de recepcion@contapyme.com.co.

### C. Número de la factura recibida

Esta alternativa permite especificar de forma opcional el número de una factura electrónica recibida que se desea analizar y descargar desde el buzón de recepción.

![Descarga de factura electrónica recibida según el número de la factura](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/07_descarga_por_numero_factura.png)

- Este campo puede utilizarse junto con el filtro "Enviadas desde el email" o "Todas las recibidas para el NIT", permitiendo precisar la búsqueda de una factura específica.
- Si no se diligencia este campo, el sistema analizará y descargará las facturas según el filtro seleccionado.

### Consideraciones generales de la Opción 1

- Esta opción aplica para la integración con cualquier proveedor tecnológico: **InSoft, Cadena o Cenet**.
- Es muy importante que cada empresa tenga su propio correo electrónico configurado. Si se utiliza el mismo correo en varias empresas con diferente NIT, solo quedará asociada la última empresa que haya confirmado el correo.
- El correo configurado en el explorador gráfico de empresa debe ser confirmado previamente mediante respuesta al mensaje enviado con el asunto **"Confirme su cuenta de recepción de facturas electrónicas"**. En caso de no recibirlo, se recomienda validar también en la bandeja de spam o correo no deseado.
- Si se reenvían facturas o eventos electrónicos desde un correo diferente al registrado y confirmado para la empresa, estos documentos no serán procesados por el sistema.
- **Reenvío manual:** desde su buzón reenvíe manualmente las facturas al buzón de recepcion@contapyme.com.co.
- **Reenvío automático:** en su buzón de correo electrónico, puede configurar un reenvío automático de todos los correos entrantes que contengan facturas para su posterior envío al buzón de recepcion@contapyme.com.co. Como esta configuración es propia de cada servidor de correo, es recomendable realizar el proceso con su departamento de sistemas.

---

## Opción 2 - Descargar FE recibidas: Importar con archivos XML o con CUFEs

![Opción de importar facturas electrónicas recibidas con archivos XML o con CUFEs](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/08_importar_con_archivo.png)

Al ingresar a esta opción se muestran 3 posibles formas de descarga de documentos:

- Por CUFE
- Desde archivos XML
- Desde archivo de Excel (Listado de CUFEs)

### A. Por CUFE

Permite registrar manualmente uno o varios CUFEs de las facturas recibidas que proveedores han emitido a la empresa. El CUFE es un código único que identifica cada factura electrónica, por lo tanto, dicho código nunca se va a repetir en el territorio nacional. El sistema permite ingresar varios CUFEs en el campo listado de CUFEs, separándolos por coma (,), punto y coma (;), espacio o utilizando la tecla ENTER.

![Importar facturas electrónicas recibidas por CUFE](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/09_por_cufe.png)

> **Proveedor tecnológico:** Esta funcionalidad aplica solo cuando el proveedor tecnológico es **InSoft**.

### B. Desde archivos XML

Permite cargar directamente los archivos XML de las facturas electrónicas recibidas. Los XML pueden ser tanto del AttachedDocument como solamente del Invoice. Al seleccionar esta opción, permite buscar en el equipo los archivos XML y cargarlos al sistema para crear automáticamente las pre-operaciones.

![Importar facturas electrónicas recibidas desde archivos XML](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/10_desde_archivo_xml.png)

- Cada archivo XML procesado generará una pre-operación independiente en el sistema.
- Los archivos XML deben estar completos y corresponder a facturas electrónicas válidas.
- Esta funcionalidad aplica para cualquier proveedor tecnológico: **InSoft, Cadena o Cenet**.

### C. Desde archivo de Excel (Listado de CUFEs)

Permite cargar un archivo de Excel con el listado de CUFEs y la información de las facturas electrónicas que la empresa ha recibido. Este archivo puede ser descargado desde el portal de la DIAN en la consulta de documentos recibidos.

![Importar facturas electrónicas recibidas desde una archivo de Excel con un listado de CUFEs](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/11_desde_archivo_excel.png)

Ejemplo de formato del archivo de Excel:

![Ejemplo del formato de Excel para importar facturas electrónicas recibidas desde una archivo con un listado de CUFEs](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/12_ej_formato_excel.png)

- Se debe tener presente que el archivo descargado desde la DIAN generalmente se obtiene en formato comprimido (.ZIP), por lo tanto, antes de realizar la importación, debe extraerse el archivo de Excel contenido en el archivo ZIP y luego seleccionarlo en el sistema.
- Solo se considerarán las facturas electrónicas incluidas en el archivo y que el NIT del emisor corresponda al de la empresa actual que está haciendo la descarga.
- Cada CUFE o archivo XML procesado generará una pre-operación independiente en el sistema.
- Esta funcionalidad aplica solo cuando el proveedor tecnológico es **InSoft**.

---

## Opción 3 - Descargar FE recibidas: Desde la DIAN (Beta)

![Importar Importar facturas electrónicas recibidas desde la DIAN (Beta)](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/13_importar_desde_DIAN.png)

Esta funcionalidad "Desde la DIAN (Beta)" permite la descarga de facturas electrónicas directamente desde el portal de la DIAN usando el token generado en el Portal de la DIAN – Facturando electrónicamente. Para su uso es necesario tener acceso al correo que se tiene registrado en el RUT, puesto que allí llegará el email con el token de acceso al portal de producción de la DIAN.

> **Advertencia importante:** Esta opción no forma parte de una integración oficial con algún servicio web ofrecido por la DIAN (puesto que dicha entidad no cuenta con un servicio explícito para este fin), por lo tanto, su funcionamiento depende del comportamiento del portal externo de la entidad.
>
> - Puede dejar de funcionar si la DIAN realiza cambios en su portal, agrega mecanismos adicionales de seguridad o restringe el acceso automatizado.
> - InSoft no garantiza la disponibilidad continua de esta funcionalidad ni asume responsabilidad por interrupciones derivadas de cambios unilaterales de la DIAN.
> - Las credenciales de acceso al portal de la DIAN no son gestionadas ni almacenadas por ContaPyme. El token de acceso es de uso temporal y exclusivo para esta operación.
> - En cualquier caso, InSoft siempre tiene a disposición otras alternativas de descarga de facturas desde el buzón de recepción y desde un archivo XML o listado de CUFEs.

> **Proveedor tecnológico:** Esta opción aplica solo cuando el proveedor tecnológico es **InSoft**.

### Pasos para el uso adecuado de la descarga de documentos usando token de la DIAN

#### 1. Solicitud de token para descargar desde la DIAN.

En este paso se debe iniciar sesión en el portal de la DIAN – Facturando electrónicamente según el tipo de usuario: Empresa o Persona.

Al iniciar sesión se hace envío de un email al correo electrónico que el contribuyente tiene configurado en el RUT, en dicho correo se tiene acceso al token de ingreso al portal de la DIAN (token que normalmente tiene una vigencia de 1 hora).

![Solicitud de token para ingresar al portal de la DIAN](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/14_solicitud_token.png)

#### 2. Registro de token para acceso a la DIAN.

Ubicado dentro del correo y para copiar el enlace, ubíquese sobre el botón "Ingrese aquí", dé clic derecho (o contrario) y seleccione la opción "Copiar dirección de enlace".

![Copiar la dirección de enlace del token para la descarga de facturas recibidas desde la DIAN (Beta)](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/15_copiar_token.png)

Luego dentro del sistema, en la opción "Acceso DIAN", pegue el enlace del token:

![Pegar la dirección de enlace del token para la descarga de facturas recibidas desde la DIAN (Beta)](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/16_pegar_token.png)

#### 3. Registro de filtros.

Indique los filtros de periodo o fechas en los cuales desea consultar las facturas o el proveedor que emitió la factura electrónica.

- Tenga presente que las opciones: "última semana", "últimos 15 días", "último mes" y "mes actual" siempre van a tomar como fecha final de referencia el día actual.
- Si cambia la fecha final, es decir, es diferente a la fecha del día actual, el sistema en el campo periodo se ubicará en la opción "Personalizado".
- Si selecciona la opción "Personalizado" debe tener presente que el periodo máximo permitido es el correspondiente a un (1) mes.

![Seleccionar filtros por fecha o por proveedor/emisor para la descarga de facturas electrónicas recibidas desde la DIAN (Beta)](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/17_filtros_fecha.png)

---

## Selección de facturas para descargar

Independiente de la opción que haya escogido para hacer la descarga de las facturas recibidas: Del buzón de ContaPyme – Importar con archivos XML o CUFEs – Desde la DIAN (Beta), el último paso en cada asistente será la visualización de facturas disponibles para descargar:

![Seleccionar las facturas electrónicas recibidas  para descargar desde la DIAN (Beta)](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/18_selección_facturas_para_descarga.png)

En esta ventana debe tener presente que:

- Las facturas que **no están en color gris** corresponden a nuevas facturas que aún no están descargadas o contabilizadas. Al activar el check en la columna "Descargar", se podrán descargar como pre-operaciones para su posterior contabilización automática.
- Las facturas que **están en color gris** corresponden a facturas que ya están almacenadas o descargadas en la contabilidad de la empresa (se pueden mostrar u ocultar con el ícono superior derecho de visualización). Mostrar facturas descargadas previamente puede ser útil para realizar procesos de control y auditoría, respecto a la contabilización de facturas que han emitido a la empresa.
- Al indicar "Descargar" se crearán pre-operaciones, las cuales corresponden a datos preliminares de cada factura recibida, para que posteriormente al interior de la empresa se defina en qué operación se va a convertir para su contabilización automática. Las opciones de conversión a operaciones dependen del licenciamiento que el usuario posea del sistema.

---

# Sección 2 – Conversión de pre-operaciones y contabilización automática

Una vez descargadas las diferentes facturas, se creará por cada una un registro de pre-operación en el manejador de operaciones, para que el usuario ingrese a ella e indique bajo qué operación desea generar la conversión para su contabilización automática.

> **Importante:** Las operaciones preliminares descargadas aún no afectan la contabilidad en la empresa.

![Ejemplo del manejador de operaciones con preo-peraciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/20_manejad_operac_preoperaciones.png)

Al entrar a la pre-operación se podrán ver algunos detalles de la factura recibida como: información del emisor, valor total, forma de pago, representación gráfica genérica, archivo PDF y el archivo XML.

![Ejemplo de encabezado de las pre-operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/21_encabezado_preoperacion.png)

Dependiendo del licenciamiento, podrá convertir la pre-operación a una operación de **Compra, Gasto, Gasto Diferido, Compra de Activos** o **asociar a una operación que exista en la contabilidad** (operaciones permitidas para la asociación: compras, gastos, gastos diferidos, compra de activos, abonos a CxP).

![tipo de preo-peraciones a las que se puede convertir una factura electrónica recibida](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/22_tipos_opr_preoper.png)

## Creación de tercero desde pre-operación

Al momento de la conversión de la pre-operación a una de las operaciones, el sistema analizará si el tercero "Proveedor" ya se encuentra registrado en el catálogo de terceros. En caso de no estar registrado, procederá a crear el registro con la información que se indica en el XML.

![Creación de un tercero que aún no está en el sistema](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/23_creación_tercero.png)

Al momento de crear el tercero (proveedor), el sistema permitirá el registro o asociación de los productos o servicios entregados por el proveedor con los productos o servicios que al interior de la empresa se manejan.

## Asociación de productos o servicios (operación de Compra)

Si la pre-operación se va a convertir en una operación de **compra**, al momento de crear el tercero (proveedor) o detectar que el producto/servicio que envía el tercero (proveedor) no está relacionado con los productos o servicios que la empresa tiene, se habilitará en la pestaña "Datos proveedor" la opción **"Productos"** para que se realice la asociación del elemento de inventario que se usa en la empresa con el producto/servicio enviado por el proveedor:

![ejemplo de asociación de un producto con un tercero](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/24_relacion_prod_tercer.png)

## Asociación de cuentas (operación de Gasto o Gasto Diferido)

Si la pre-operación se va a convertir en una operación de **gasto o gasto diferido**, al momento de crear el tercero (proveedor) o detectar que el producto/servicio que envía el tercero (proveedor) no está relacionado en la empresa, se habilitará en la pestaña "Datos proveedor" la opción **"Cuentas"** para que se realice la asociación de la cuenta del PUC (plan único de cuentas) que se usa en la empresa con el producto/servicio enviado por el proveedor:

![Ejemplo de asociación de cuentas (operación de Gasto o Gasto diferido)](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/25_relacion_prod_cta.png)

A medida que se van descargando las facturas recibidas, el sistema analiza si el tercero ya existe y si los productos/servicios que él está facturando ya están relacionados con los productos/servicios de la empresa. Si está todo creado y relacionado, no se muestra la ventana de creación o edición de tercero y se ingresa directamente a la operación seleccionada para la conversión. Si por el contrario el tercero ya existe pero un producto/servicio no está relacionado, se abre la edición del tercero en la pestaña "Datos proveedor" para que se relacione el producto/servicio facturado por el proveedor con el producto/servicio que se usa en la empresa.

## Nota 1 - Cargar PDF a pre-operación (Opcional)

Desde la pre-operación es posible que se cambie el archivo PDF o representación gráfica de la factura descargada, para asociar por ejemplo el PDF que la DIAN permite descargar cuando se consulta el CUFE del documento electrónico.

Para hacerlo, basta con ingresar en la pre-operación a la pestaña **"Archivo PDF"** y dar clic en el ícono de carpeta, buscar el archivo PDF que se desea cargar e indicar reemplazar el archivo existente. Así quedará la pre-operación y posteriormente la operación con la representación gráfica que se cargó manualmente.

![Cargar PDF a la pre-operación](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/26_cargar_pdf_preopr.png)

## Nota 2 - Aviso de responsabilidad

> **Aviso de responsabilidad:** Es responsabilidad de cada usuario revisar que los datos del XML estén plenamente relacionados con los productos/servicios que al interior de la empresa se usan, también indicar los impuestos y retenciones asociadas a la factura descargada, para que su contabilización quede acorde a los lineamientos contables y tributarios de la empresa.

---

# Sección 3 – Eventos electrónicos

Después de tener registrada la operación en el manejador de operaciones, podrá empezar a aplicar los diferentes eventos electrónicos **solo si la factura emitida por el proveedor fue generada con forma de pago: Crédito**.

> **Condición de factura a crédito:** Se puede confirmar en el XML si la factura está a crédito cuando la etiqueta `<PaymentMeans>` tiene el ID: 2. Cuando tiene el ID: 1 significa que la factura es de contado. Recuerde que la funcionalidad de recepción de documentos dentro del sistema aplica tanto para facturas a crédito como contado; por lo tanto, si la factura descargada tiene forma de pago "contado", a este documento no se le pueden emitir eventos electrónicos.

## Ruta para emitir eventos

Para emitir eventos debe estar ubicado en el manejador de operaciones en la operación y dar clic derecho opción **"Eventos electrónicos"** o dar clic en el menú superior del manejador de operaciones opción **"Eventos"**.

![Ruta para emitir eventos a una factura electrónica desde las operaciones el manejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/30_eventos_opr.png)

![Ruta para emitir eventos a una factura electrónica desde las cinta de opciones del manejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/31_eventos_opr.png)

## Notificación para envío de eventos

> **Importante:** Antes de iniciar con la emisión de eventos, se debe generar una **"Notificación para envío de eventos"**. Esta acción notifica al proveedor que sobre dicha factura se van a realizar eventos electrónicos indicados por la DIAN.

La acción de notificación se puede hacer al momento de convertir una pre-operación en una operación para generar su contabilización, allí el sistema generará un mensaje como el siguiente:

![Ejemplo de acción de notificacción de envío de facturas electrónicas](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/32_notificación_doc.png)

Si no genera la notificación desde la pre-operación, lo puede hacer de manera manual desde la operación ya contabilizada:

![ruta de notificación de envío de eventos de facturas electrónicas](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/33_notificación_opr.png)

## Actualización de estado de la notificación

Para validar que se aplicó la acción de notificación correctamente, se puede ubicar sobre la operación, abrir el **Inspector de datos > Documentos > Eventos Electrónicos**.

La acción "Notificado" podrá aparecer como "Pendiente", lo que implica que aún no está actualizado dicho estado ante el proveedor tecnológico:

![Vista del evento de notificación desde el inspector en el manejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/34_notificación_pendiente.png)

Para que aparezca como reportado al proveedor tecnológico, basta con estar ubicado en la operación y dar clic en la opción: **"Actualizar estado"**.

![Estado de notificado correctamente en el inspector en el manejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/35_notificación_ok.png)

A partir de la notificación exitosa al proveedor tecnológico, ya puede aplicar los eventos que corresponden a título valor:

![Lista de eventos de las facturas electrónicas](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/36_lista_eventos.png)

## Evento: Acuse de recibo de factura electrónica

Se abre una ventana adicional, en la que se deben indicar los datos de la persona que está haciendo el evento. El sistema toma por defecto los datos indicados en la información del usuario que está aplicando dichos eventos, siempre y cuando ese usuario esté asociado a un tercero.

Después de indicar los datos necesarios, debe dar clic en enviar, para que el evento quede notificado a través del proveedor tecnológico a la DIAN.

![Ejemplo de evento de acuse de recibido de facturas electrónicas](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/37_acuse_recibo_factura.png)

> **Antes de continuar:** Antes de continuar con el siguiente evento, se debe actualizar el estado del evento y validar si ya fue reportado a la DIAN. Ubíquese sobre la operación, haga clic en la opción **"Actualizar estado"** y luego verifique desde el **Inspector > Documentos > Eventos Electrónicos**, que el evento aparezca como reportado a la DIAN.

![Ejemplo de acuse de recibido cuando está reportado a la DIAN](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/38_acuse_reportado.png)

## Evento: Recibo del bien o prestación del servicio

Después de aplicar el evento de acuse de recibo, ubíquese de nuevo en la operación y seleccione el segundo evento: **"Recibo del bien o servicio"**.

Se abre una ventana adicional, en la que se deben indicar los datos de la persona que está haciendo el evento. El sistema toma por defecto los datos indicados en la información del usuario que está aplicando dichos eventos, siempre y cuando ese usuario esté asociado a un tercero.

![Ejemplo de evento de recibo del bien o prestación del servicio](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/39_recibo_bien.png)

> **Aviso de plazo:** Al aplicar este segundo evento, el sistema muestra un mensaje notificando que cuenta con **tres días hábiles** para enviar el evento de aceptación expresa o reclamo, porque si supera ese tiempo, el proveedor podrá aplicar un evento de aceptación tácita.

![Mensaje de njotificación del plazo en días para enviar el reclamo o aceptación expresa en los eventos electrónicos](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/40_plazo_dias.png)

Al igual que con el evento anterior, debe actualizar el estado y verificar por el inspector que se haya actualizado el evento y se haya reportado a la DIAN.

![ejemplo de recibo del bien o prestación del servicio en el inspector de mejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/41_recibo_bien.png)

## Evento: Aceptación expresa o Reclamo

Después de aplicar el evento de recibo del bien o prestación del servicio, ubíquese de nuevo en la operación y seleccione según sea el caso el evento: **"Aceptación expresa"** o **"Reclamo"**.

Para el registro del evento seleccionado se abre una ventana adicional, en la que se deben indicar los datos de la persona que está haciendo el evento.

> **Importante:** Estos eventos son excluyentes, es decir, si aplica el evento de aceptación expresa no podrá aplicar el evento de reclamo y viceversa.

### Aceptación expresa

![Evento de aceptación expresa o tácita a una factura electrónica](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/42_aceptación_expresa.png)

### Reclamo

Para la generación del evento reclamo, se debe indicar el tipo de reclamo según la lista de opciones que la normatividad de la DIAN permite.

Al generar el evento de reclamo, el sistema preguntará si desea anular la operación para que no afecte la contabilidad:

- Si se indica **"Sí"**, el sistema anulará la operación, es decir, la operación no afectará nada en la contabilidad.
- Si se indica **"No"**, la operación quedará registrada y afectará la contabilidad.

![Evento de reclamo a una factura electrónica](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/43_reclamo.png)

![Ejemplo de anulación de la operación por reclamo](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/44_reclamo_anulación_opr.png)

Al igual que con los eventos anteriores, recuerde actualizar el estado y verificar por el inspector que se haya actualizado el evento y se haya reportado a la DIAN.

![Ejemplo de evento de reclamo de una factura electrónica en el inspector de manejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/45_reclamo_inspector_datos.png)

## Nota sobre evento reclamo desde pre-operación

Al momento de descargar una factura, es decir, tener la pre-operación, se puede emitir el evento de **"Reclamo"**, por si la empresa no desea crear la conversión y ha detectado que los datos de la factura no están correctos y no se van a contabilizar.

![Evento de reclamos desde la pre-operación](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/46_reclamo_desde_preop.png)

Al emitir el evento de reclamo desde la pre-operación, el sistema indicará que se requiere hacer la acción de "Notificación" del documento para que posteriormente se puedan transmitir en secuencia los eventos previos al reclamo:

![Notificación de un evento desde la pre-operación por un reclamo](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/47_notificar_desde_reclamo.png)

Una vez emitida la acción de "Notificación", actualizado el estado del documento y confirmado (en el inspector de datos) que ya está reportado al proveedor tecnológico, se podrá ingresar de nuevo a la pre-operación e indicar **"Enviar reclamo"**.

## Envío de eventos masivos

Desde el sistema se pueden emitir a múltiples pre-operaciones u operaciones eventos de manera simultánea. Basta con seleccionar las operaciones a las cuales les desea aplicar el evento y proceder con la emisión de este.

> **Importante:** La emisión masiva aplica para un mismo evento que se desee enviar a varias operaciones.

#### Ejemplo

En el manejador de operaciones, se seleccionan las operaciones o pre-operaciones y sobre ellas se aplica el mismo evento (acuse de recibo de factura, o recibo del bien o servicio, o aceptación expresa, o reclamo). No funciona si se seleccionan diferentes operaciones que están con eventos diferentes ya emitidos.

## Visualización de eventos en portal DIAN

Los eventos aplicados a una factura también se pueden ver directamente en el portal de la DIAN, con el CUFE de la operación.

Para esto puede ubicarse en la operación y dar clic en la opción **Inspector** que se encuentra en la cinta de opciones. Dentro del inspector podrá ubicarse en la pestaña **Documento** y en la parte inferior dar clic sobre el **CUFE**; se abrirá la página de la DIAN donde se visualizará la información básica de la factura incluyendo los eventos aplicados a dicho documento.

![Consultar el CUFE de una factura electrónica desde el inspector del manejador de operaciones](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/48_cufe_doc.png)

![Ejemplo de eventos de una factura electrónica desde el portal de la DIAN](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/120%20RD/49_factura_dian.png)

---

## ¡Y listo!

Podrá empezar a descargar facturas electrónicas recibidas, contabilizarlas automáticamente y emitir eventos electrónicos en [ContaPyme].

