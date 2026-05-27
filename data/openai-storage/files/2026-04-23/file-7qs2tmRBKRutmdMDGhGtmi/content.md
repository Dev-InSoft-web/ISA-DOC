# pf_facturacion.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **Facturación**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/11/14

# Facturación
## Facturación Electrónica - Envío y Procesamiento

### Notas Crédito y Débito
---
### ¿Cómo generar una nota débito electrónica correctamente?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo generar una nota débito electrónica correctamente?  
- ¿Qué es una nota débito electrónica?  
- ¿Cuándo debo usar una nota débito?  
- ¿Cómo se emite una nota débito electrónica en el sistema?  
- ¿Cómo aumento el valor de una factura electrónica ya enviada a la DIAN?  
- ¿Dónde se genera la nota débito según la operación utilizada?  
- ¿Cuál es la ruta para crear una nota débito electrónica?  
- ¿Cómo corregir un valor faltante o un cobro adicional en una factura electrónica?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->

Recuerda que una **nota débito es un documento que aumenta el valor a una factura de venta electrónica** y al igual que una factura de venta también debe ser reportada electrónicamente a la DIAN, por lo tanto, es un documento que se debe configurar en el sistema para que sea transmitido en formato XML y validado por la DIAN.  
Dentro del sistema **dependiendo de cómo se haya generado la factura de venta electrónica (por operación de "Ingresos" o por operación de "Facturación y ventas")**, se tienen asistentes especializados para generar dicha nota débito o puedes dirigirte a: 📍 ***Básico > Operaciones > + Operaciones > Ingresos > Nota débito electrónica (o la correspondiente según el caso).***

#### 📌 Recursos adicionales
👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota débito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota débito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=gLCjwIUI5M0)

---

### ¿Cómo hacer una nota crédito y cruzar cuentas por cobrar y pagar?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo hacer una nota crédito y cruzar cuentas por cobrar y por pagar?  
- ¿Cómo cruzar el saldo de una nota crédito con una factura pendiente?  
- ¿Cómo compensar una nota crédito con cuentas por cobrar del cliente?  
- ¿Qué pasa si el cliente ya no tiene facturas activas?  
- ¿Cómo crear una cuenta por pagar al cliente desde una nota crédito?  
- ¿Dónde se genera la nota crédito para cruzar con cuentas por cobrar o pagar?  
- ¿Cuál es la ruta para crear una nota crédito electrónica?
- ¿Puedo aplicar una nota crédito a una factura parcialmente pagada?  
- ¿Cómo registrar la devolución de dinero de una nota crédito? 
- ¿Qué debo revisar antes de cruzar una nota crédito con otra cuenta?
- ¿Cómo compensar una nota crédito con facturas del mismo cliente?  
- ¿Puedo cruzar varias notas crédito con un mismo cliente?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->

Cuando generas una **nota crédito**, estás **descontando un valor de la factura de venta electrónica que ya fue enviada al cliente**.
Esto significa que el **valor pendiente por cobrar se reduce** y y según el caso, podrás **cruzarlo con una cuenta por cobrar existente o generar una cuenta por pagar.**

**Ruta general en el sistema para generar la nota crédito**
📍 Básico > Operaciones > + Operaciones > Ingresos > Nota crédito electrónica
📍 Básico > Operaciones > + Operaciones > Facturación y Ventas > Nota crédito electrónica
Elige la operación correspondiente según cómo fue generada la factura electrónica.

Existen dos formas de manejar este ajuste:

**Cruzar con un saldo pendiente del cliente:**
Si el cliente tiene facturas activas o saldos por cobrar, puedes aplicar la nota crédito directamente sobre ese saldo.
Así, el sistema compensará automáticamente la cuenta por cobrar y actualizará el saldo del cliente.

Ejemplo:
Una factura de $500.000 recibe una nota crédito por $100.000 → el saldo pendiente quedará en $400.000.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito disminuyendo el saldo de la cuenta por cobrar desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/nc_cruce_cxc.png)

**Crear una cuenta por pagar:**
Si el cliente no tiene facturas activas o saldos pendientes, puedes generar una cuenta por pagar con el valor de la nota crédito.
De esta manera, el sistema reflejará la obligación de reintegrar o compensar el valor al cliente.
Posteriormente, podrás cruzar esa cuenta desde un nuevo comprobante, registrando la devolución del dinero o el ajuste contable.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito creando una cuenta por pagar al cliente desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/nc_cruce_cxp.png)

**Recomendaciones:**
Verifica que la referencia de la factura esté correctamente seleccionada.
No ingreses notas crédito por valores mayores al saldo pendiente.
Si generas una cuenta por pagar, confirma el tercero y el documento asociado.
Finalmente, transmite la nota crédito electrónicamente y valida que haya sido aceptada por la DIAN.

#### 📌 Recursos adicionales
▶️ **Video:**  
[Inventarios Básico II – Incluye operación devolución en ventas](https://www.youtube.com/watch?v=dErWn5fapzM&t=2090s) 

---

## Problemas con Correos Electrónicos

### ¿Por qué no llegan las facturas electrónicas al correo del cliente?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no llegan las facturas electrónicas al correo del cliente?  
- ¿Por qué el cliente no recibe el correo con el XML o PDF de la factura?  
- ¿Qué hago si el cliente dice que no le llegó la factura electrónica?  
- ¿Cómo verificar si la factura fue enviada correctamente por correo?  
- ¿Dónde puedo consultar el estado del envío de e-mails de una factura?  
- ¿Cómo saber si el correo se envió, se entregó o tuvo error?  
- ¿Cómo validar si la factura fue transmitida y aceptada por la DIAN?  
- ¿Cómo revisar si el CUFE está registrado en la DIAN?  
- ¿Por qué no se genera el envío del correo al cliente después de facturar?  
- ¿Cómo confirmar el correo electrónico que tiene registrado un cliente para F.E.?  
- ¿Cómo modificar el correo electrónico de un cliente para el envío de facturas?  
- ¿Cómo activar el envío automático de correos electrónicos en las facturas?  
- ¿Qué hacer si el correo de la factura electrónica llega al spam del cliente?  
- ¿Cómo verificar la configuración del documento soporte para envío de e-mails?  
- ¿Dónde puedo revisar el historial de e-mails enviados por factura?  
- ¿Cómo reenviar la factura electrónica si el cliente no la recibió?  
- ¿Por qué el correo del cliente aparece con error o rebotes?  
- ¿Qué debo revisar si el envío de factura por correo no fue exitoso?  
- ¿Cómo comprobar que la factura tiene las tres acciones ejecutadas (DIAN, e-mail y publicación)?  
- ¿Cómo revisar los correos enviados desde el inspector de datos de la factura?
- No me envían las facturas
- No me envía el email en facturación
- No le llegó la factura a mi cliente

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Cuando generas una **factura de venta electrónica**, el sistema crea un **archivo comprimido .zip** que incluye el **XML y el PDF de la representación gráfica**.
Este archivo se envía automáticamente al correo electrónico asociado al cliente para que pueda validar la factura recibida.

Si el cliente informa que **no ha recibido el correo electrónico con la factura**, puedes realizar las siguientes validaciones:

1. **Validar que se haya generado el envío a la DIAN exitosamente:** El envío del correo se hace una vez se recibe la respuesta de validación del documento ante la DIAN, el cuál contiene el XML y PDF con el **CUFE** asociado a la factura de venta, si este proceso no se ejecuta correctamente la emisión del correo no será satisfactoria, para hacer la verificación puedes seguir estos pasos:

- Confirma que se hayan ejecutado las tres acciones **(Envío a la DIAN-Envío de e-mail-Publicación en plataforma)** en el documento electrónico a través de: ***Menú básico > Manejador de operaciones > Seleccionar la factura de venta > Inspector de datos - Documento > Acciones.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación acciones de envío en la **Factura de venta**:](https://www.contapyme.com/conocimientocontapyme/080_IN/acciones_envio_fe.png)

- Valida que el CUFE registrado en la operación o el PDF se encuentre registrado en la DIAN: ***Menú básico > Manejador de operaciones > Seleccionas la factura > Inspector de datos - Documento > Acciones > CUFE registrado en la parte inferior.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación CUFE asignado en la **Factura de venta** desde inspector:](https://www.contapyme.com/conocimientocontapyme/080_IN/cufe_inspector_fe.png)

Haciendo uso de la anterior opción y presionando clic sobre ella te dirigirá a la plataforma de la DIAN donde podrás consultar el documento y confirmar su estado así:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación CUFE asignado en la **Factura de venta** desde la DIAN:](https://www.contapyme.com/conocimientocontapyme/080_IN/verificacion_dian_fe.png)

2. **Verifica el estado del envío del documento al correo asociado:** Desde **ContaPyme**, puedes consultar si el correo fue enviado correctamente y a qué dirección de e-mail. Para hacerlo, ingresa a: ***Menú básico > Manejador de operaciones > Seleccionar la factura de venta > Inspector de datos - Documento > Estados de e-mails enviados.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación estado de e-mails entregados por documento en la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/estado_email_inspector.png)

3. **Confirma el correo electrónico del cliente:** Asegúrate de que el correo registrado en la creación del cliente coincida con el que fue proporcionado. Puedes verificarlo o modificarlo directamente mientras digitas la factura seleccionando: ***Cliente > Tres puntos (⋮) - Modificar > Correo F.E.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo modificación correo F.E para cliente desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/correo_fe_tercero.png)

4. **Revisa la configuración del documento de soporte:** Confirma que en la configuración del **documento de soporte de factura electrónica** esté activo el **envío automático por correo electrónico al momento de generarse y enviar la factura al tercero** dirigiendote a: ***Menú básico > Documentos de soporte > Factura de venta electrónica > Acciones - Envío de e-mail.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración acciones desde el documento soporte de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/config_accion_email_ds.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración envío de e-mail desde el documento soporte de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/config_envio_email_ds.png)

#### 📌 Recursos adicionales
* [Video configuración de acciones para envío de e-mail desde el **documento soporte**](https://www.youtube.com/watch?v=lCdLv3aMSHA&t=282s)

5. **Verificación del cliente en su bandeja de correo electrónico:** Pide al cliente que **revise su carpeta de SPAM o correo no deseado**, ya que algunos servidores pueden filtrar automáticamente los mensajes con archivos adjuntos.

**IMPORTANTE**

Recuerda que desde el sistema puedes acceder al **explorador de envíos**, esta herramienta te permitirá observar a que correos se han enviado documentos, e-mail definido, fechas de envío y otros datos que te pueden interesar.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo ingreso al **explorador de envíos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/historial_envios_email.png)


---

### ¿Cómo corregir el correo del cliente para el envío de documentos?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo corregir el correo del cliente para el envío de documentos electrónicos?  
- ¿Dónde puedo cambiar el correo de facturación electrónica de un cliente?  
- ¿Cómo actualizar el correo F.E. del cliente desde la factura?  
- ¿Cómo modificar el correo del cliente directamente al facturar?  
- ¿Cómo cambiar el correo de un cliente en el catálogo de terceros?  
- ¿Qué ruta debo seguir para editar el correo electrónico del cliente?  
- ¿Puedo modificar el correo del cliente sin salir de la operación de venta?  
- ¿Cómo verificar que el correo de facturación electrónica esté correcto?  
- ¿Por qué mi cliente no recibe las facturas por correo? (posible error de correo mal digitado) 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Para modificar el **correo electrónico de facturación electrónica** asociado al cliente puedes hacerlo de diferentes formas:

1. Verificarlo o modificarlo directamente mientras digitas la factura seleccionando: ***Cliente > Tres puntos (⋮) - Modificar > Correo F.E.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo modificación correo F.E para cliente desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/correo_fe_tercero.png)

2. Desde el catálogo de terceros en la siguiente ruta: ***Menú básico > Catálogo de terceros > Modificar > Correo F.E.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo modificación correo F.E para cliente desde el **Catálogo de terceros**:](https://www.contapyme.com/conocimientocontapyme/080_IN/correo_fe_cat_terceros.png)

#### 📌 Recursos adicionales   
* [Video de ingreso al catálogo de terceros para modificación](https://www.youtube.com/watch?v=NaoVoWPJDW4)
* [Video de acciones a realizar sobre el tercero](https://www.youtube.com/watch?v=zU3PC6r95o4)

---

### ¿Qué hacer cuando el sistema indica que un correo tiene muchos rebotes?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué hacer cuando el sistema indica que un correo tiene muchos rebotes?  
- ¿Por qué el sistema muestra que el correo del cliente tiene rebotes?  
- ¿Qué significa que un correo tenga rebote en ContaPyme?  
- ¿Cómo quitar un rebote de correo en el sistema?  
- ¿Dónde puedo eliminar un correo de la lista de bloqueos por rebote?  
- ¿Cómo validar el envío después de quitar el rebote?  
- ¿Cómo reenviar una factura electrónica después de un rebote de correo?  
- ¿Por qué las facturas no se envían si el correo tiene rebote?  
- ¿Qué ruta debo seguir para quitar el rebote de un e-mail en ContaPyme?  
- ¿Cómo revisar el historial de envíos de correos electrónicos?  
- ¿Por qué se presenta un rebote de correo en el envío de facturas electrónicas?  
- ¿Cómo corregir el correo del cliente para el envío de documentos electrónicos?  
- ¿Cómo evitar que los correos de factura sean detectados como SPAM?  
- ¿Qué debo revisar si el correo del cliente no existe o fue mal digitado? 


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si presentas una novedad de rebote de correo al realizar el envío de un documento electrónico, puedes seguir las siguientes recomendaciones con el fin de prevenir que se presente:

1. **Verifica la dirección de correo electrónico del cliente:**
Valida que esté escrito correctamente (carácteres-números), puedes revisarlo desde la ruta: ***Operación de venta > Cliente > Tres puntos (⋮) - Modificar > Correo F.E.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo modificación correo F.E para cliente desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/correo_fe_tercero.png)

2. **Confirma el estado del envío desde ContaPyme:**
Si el sistema te muestra una novedad o mensaje que alerte sobre el rebote del correo que se está intentado enviar al destinatario, puedes quitarlo de la lista de ''bloqueos'' siguiendo estos pasos: ***Menú básico > Campañas > Historial de envíos > Opción quitar rebote - Digitar e-mail y validar envío.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo ingreso al **explorador de envíos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/historial_envios_email.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo como quitar rebote a correo desde **Explorador de envíos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/rebote_email.png)

Luego de esto puedes confirmar **reenviando la factura manualmente**. Recuerda que el **rebote** puede presentarse por varios motivos, por ejemplo:

- El servidor del cliente detecta el mensaje como SPAM y lo bloquea automáticamente.
- La dirección de correo no existe o está mal escrita.
- El buzón del cliente está lleno o temporalmente inactivo.
- El dominio del correo del cliente tiene filtros de seguridad que impiden recibir archivos adjuntos comprimidos (.zip).

---

### ¿Cómo se soluciona el error: “No se puede enviar por email su documento…”?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo reenviar el XML o PDF si no fue recibido?
- ¿Qué hacer cuando el sistema indica que un correo tiene muchos rebotes?
- ¿Cómo corregir el correo del cliente para el envío de documentos?
- ¿Cómo reenviar el XML o PDF de una factura electrónica?  
- ¿Cómo reenviar una factura electrónica al correo del cliente?  
- ¿Cómo volver a enviar el correo automático con los documentos electrónicos?  
- ¿Dónde encuentro la opción para reenviar el e-mail de la factura?  
- ¿Cómo cambiar el correo antes de reenviar una factura electrónica?  
- ¿Cómo enviar la factura a un correo diferente al registrado?  
- ¿Qué hacer si el cliente no recibió el XML o el PDF de la factura?  
- ¿Cómo enviar nuevamente el archivo .zip con el XML y PDF al cliente?  
- ¿Cómo verificar o editar el correo al reenviar la factura electrónica?  
- ¿Puedo reenviar el documento electrónico desde el manejador de operaciones?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si presentas una novedad que indique "no se puede enviar por email su documento" te recomendamos validar lo siguiente:

1. **Verifica que el correo electrónico del cliente sea válido:** Asegúrate de que el correo esté bien escrito, exista y corresponda al cliente en la ruta: ***Operación de venta > Cliente > Tres puntos (⋮) – Modificar > Correo F.E. ***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo modificación correo F.E para cliente desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/correo_fe_tercero.png)

2. **Ejecutar las acciones de envío en el documento, lo haces siguiendo estos pasos:** ***Menú básico > Manejador de operaciones > Seleccionas la factura de venta o documento > Clic derecho - Ejecutar acciones o la tecla CONTROL+J.*** Lo anterior hará que se programe de nuevo la emisión del correo al e-mail configurado.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo como ejecutar acciones al documento electrónico:](https://www.contapyme.com/conocimientocontapyme/080_IN/ejecutar_acciones_fv.png)

3. **Confirmar en el inspector de documentos el estado de los e-mails entregados con estos pasos:** ***Menú básico > Manejador de operaciones > Seleccionar la factura de venta > Inspector de datos - Documento > Estados de e-mails enviados.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación estado de e-mails entregados por documento en la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/estado_email_inspector.png)

4. **Correo en lista negra o con rebotes previos:** Ocurre si el correo del cliente ha tenido rebotes (errores de entrega) o fue marcado como spam por el servidor, el sistema bloquea el nuevo envío. Para validarlo, puedes consultar el registro de envíos en ***Menú básico > Campañas > Historial de envíos > Opción quitar rebote - Digitar e-mail y validar envío.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo como quitar rebote a correo desde **Explorador de envíos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/rebote_email.png)

5. **Antivirus o firewall bloquea la salida del correo:** Sucede cuando el antivirus o el firewall del equipo impiden la conexión del sistema con el servidor de correo, evitando que se complete el envío. Para validarlo, revisa los permisos del programa en el firewall de Windows o desactiva temporalmente el antivirus para confirmar si el envío se realiza correctamente.

6. **Configuración del documento de soporte:** Validar la configuración del documento soporte, una configuración erronea puede impedir que el sistema genere el envío del correo automáticamente. Para validarlo, ingresa a ***Menú básico > Documentos de soporte > Factura de venta > Modificar - Acciones - Envío de e-mail automático > Pestaña envío de e-mail - Enviar a tercero.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
- ![Ejemplo configuración acciones desde el documento soporte de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/config_accion_email_ds.png)

- ![Ejemplo configuración envío de e-mail desde el documento soporte de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/config_envio_email_ds.png)

7. **Empresas que tienen habilitada la opción “Remitente propio para envío de email”:** Si tu empresa tiene activa la opción **“Remitente propio para envío de email”**, puedes definir una cuenta de correo desde la cual se enviarán todas las notificaciones **(XML, PDF y correos automáticos)** a los clientes. Por defecto, los envíos se realizan a través del dominio de Contapyme, sin embargo, si decides personalizar el remitente con tu propio dominio, es importante validar:

- Que el dominio permita el envío a través de aplicaciones externas.
- Que las configuraciones de autenticación (como SPF, DKIM o puertos) no restrinjan el envío.
- Que el proveedor de correo no tenga bloqueos o límites para envíos automáticos.

**¿Dónde configurar el remitente propio?**

Puedes definir o modificar el remitente propio en la siguiente ruta: ***Menú básico > Empresa > Modificar - Servicios electrónicos  > Activar remitente propio para envío de e-mails > Pestaña envío de e-mails - Correo electrónico remitente.***

-La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
- ![Ejemplo activación remitente propio de e-mail desde la empresa:](https://www.contapyme.com/conocimientocontapyme/080_IN/activar_rem_propio.png)

- ![Ejemplo asignación de correo electrónico remitente desde la empresa:](https://www.contapyme.com/conocimientocontapyme/080_IN/rem_propio_correo.png)

**Tercero sin permiso para envío de información:**
Ocurre si el cliente no tiene habilitado el permiso para recibir correos automáticos desde el sistema. Para validarlo, ingresa a: ***Operación de venta > Cliente > Tres puntos (⋮) - Modificar > Datos tercero > Principal > Permite envío de información y asegúrate de que la opción esté activa.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Activación envío de correo transaccional en el tercero:](https://www.contapyme.com/conocimientocontapyme/080_IN/activar_envio_infotransaccional.png)

---

## Procesamiento, Anulación y Reenvío

### ¿Cómo reenviar el XML o PDF si no fue recibido?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo corregir el correo del cliente para el envío de documentos?
- ¿Qué hacer cuando el sistema indica que un correo tiene muchos rebotes?
- ¿Cómo reenviar el XML o PDF de una factura electrónica?  
- ¿Cómo reenviar una factura electrónica al correo del cliente?  
- ¿Cómo volver a enviar el correo automático con los documentos electrónicos?  
- ¿Dónde encuentro la opción para reenviar el e-mail de la factura?  
- ¿Cómo cambiar el correo antes de reenviar una factura electrónica?  
- ¿Cómo enviar la factura a un correo diferente al registrado?  
- ¿Qué hacer si el cliente no recibió el XML o el PDF de la factura?  
- ¿Cómo enviar nuevamente el archivo .zip con el XML y PDF al cliente?  
- ¿Cómo verificar o editar el correo al reenviar la factura electrónica?  
- ¿Puedo reenviar el documento electrónico desde el manejador de operaciones?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

Si necesitas reenviar el correo automático que contiene el PDF y XML de la factura electrónica comprimido en un archivo .zip al mismo e-mail asociado al cliente u otro diferente, puedes seguir los siguientes pasos: ***Manejador de operaciones > Seleccionar factura de venta > Clic derecho - Reenviar e-mail automático/Doc. electrónico > Elegir SI para enviar al correo registrado en el cliente o Vista previa para digitar otro correo > Enviar.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
- ![Ejemplo utilidad de **Reenviar e-mail automático/Doc. electrónico**:](https://www.contapyme.com/conocimientocontapyme/080_IN/opr_reenviar_email.png)

- ![Ejemplo selección envío al mismo correo o vista previa para cambiarlo:](https://www.contapyme.com/conocimientocontapyme/080_IN/opr_reenviar_email_verificacion.png)

- ![Ejemplo ventana asistente para digitar o verificar e-mail al cuál se enviarán el archivo .zip:](https://www.contapyme.com/conocimientocontapyme/080_IN/asistente_reenviar_email.png)

---

### ¿Cómo procesar nuevamente una factura desprocesada por error?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Como procesar una factura?
- ¿Tengo desprocesada una factura?
- ¿Tengo una factura que no me aparece procesada?
- ¿Tengo una factura que no me mueve contabilidad?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

Si una factura fue desprocesada por error, puedes volver a procesarla fácilmente siguiendo alguno de los siguientes métodos:

1. **Procesar desde el ícono de estado:** Haz doble clic sobre el ícono que indica si la operación está procesada o no, esto ejecutará nuevamente el procesamiento del documento.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo procesar operación desde el ícono:](https://www.contapyme.com/conocimientocontapyme/080_IN/procesar_opr_icono.png)

2. Puedes seleccionar la factura y presionar ***Clic derecho > Procesar*** o de manera rápida presionando las teclas ***CONTROL+P***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo procesar operación con clic derecho sobre el documento:](https://www.contapyme.com/conocimientocontapyme/080_IN/procesar_opr_clicder.png)

De esta manera se procesará la operación y hará los respectivos movimientos que aplique (contabilidad-inventarios)


---

 ### ¿Qué hacer si el sistema no permite anular o eliminar una factura?

 CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo anular una factura con nota crédito? 
- ¿Cómo generar una nota crédito electrónica correctamente?
-  Quiero eliminar un documento

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

Cuando se trata de **documentos electrónicos**, **no se recomienda anular o eliminar manualmente una factura.**
Estas acciones pueden generar inconsistencias entre la información reportada a la DIAN y los registros internos del sistema.
Para ello puedes generar una nota crédito asociada a la factura que deseas anular, así este documento servirá como soporte de anulación ante la DIAN, garantizando la trazabilidad y el cumplimiento normativo.

**Ruta general en el sistema para generar la nota crédito**
📍 Básico > Operaciones > + Operaciones > Ingresos > Nota crédito electrónica
📍 Básico > Operaciones > + Operaciones > Facturación y Ventas > Nota crédito electrónica
Elige la operación correspondiente según cómo fue generada la factura electrónica.

#### 📌 Recursos adicionales   
👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

**Si estás tratando de eliminar o anular un documento diferente a factura electrónica, como una factura de compra, ajuste de inventario u otra operación NO electrónica, verifica que el usuario que va a realizar la acción de eliminar tenga permisos activos para realizar estas acciones"**


---

### ¿Cómo recuperar una factura con consecutivo específico?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo puedo recuperar una factura que eliminé?
- Se borró una factura, ¿cómo la vuelvo a generar?
- Eliminé una factura por error, ¿hay forma de restaurarla?
- ¿Cómo rehacer una factura que ya fue enviada a la DIAN?
- La factura no aparece en el sistema, pero sí está en la DIAN, ¿qué hago?
- ¿Puedo volver a crear una factura que se borró?
- ¿Cómo asigno un consecutivo manual a una factura?
- ¿Dónde se cambia la numeración de la factura de venta?
- ¿Cómo recuperar el consecutivo correcto de una factura eliminada?
- La numeración automática se saltó un número, ¿cómo lo corrijo?
- ¿Qué pasa si el consecutivo de la factura no coincide con la DIAN?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si generaste una factura y esta no se encuentra porque fue eliminada pero sabes que se encuentra emitida a la DIAN, puedes recuperarla ingresando nuevamente el consecutivo de forma **manual.**

Para hacerlo, sigue estos pasos: 

1. ***Menú básico > Documentos de soporte > Factura de venta.*** 
2. En la opción de **numeración**, activa la asignación manual del consecutivo.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo para modificar la numeración en el documento soporte:](https://www.contapyme.com/conocimientocontapyme/080_IN/docsop_num_manual.png)

3. Luego creas la factura de venta y digitas el número de factura que deseas recuperar, asegurándote de que **coincida exactamente con el documento registrado ante la DIAN.**
4. Ingresa nuevamente la información de la factura (cliente, productos, valores, etc.) tal como aparece en el documento oficial.
5. Una vez recuperada la factura, vuelve a dejar la numeración en **modo automático** en el **documento soporte** para evitar duplicidad de consecutivos en futuras facturas.

**Recuerda es importante que la información registrada en el sistema coincida con lo reportado ante la DIAN.**


---

## Errores Técnicos y Fallos del Sistema

### ¿Por qué no se visualiza correctamente el PDF, XML o QR de la factura?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Dónde puedo consultar el estado del documento en la plataforma de la DIAN?
- ¿Por qué el CUFE no aparece en mi factura?
- ¿Qué debo hacer si el PDF se genera sin el código QR o con información incompleta?
- ¿Por qué el XML no se descarga o muestra error al abrirlo?
- ¿Cómo validar que la factura está publicada correctamente en la plataforma?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

La visualización del **PDF, XML o QR** de una factura de venta electrónica depende de que la emisión del documento haya sido **validada exitosamente por la DIAN.** Para confirmar esto, sigue los pasos a continuación:

**Verifica que el envío a la DIAN se haya realizado correctamente:** El **XML, PDF y QR** se generan una vez el documento ha sido validado ante la DIAN y contiene el **CUFE (Código Único de Factura Electrónica).**
Si este proceso no se completa correctamente, es posible que los archivos no se visualicen de forma adecuada.

Para verificarlo:

### PASOS:

- Confirma que se hayan ejecutado las tres acciones **(Envío a la DIAN-Envío de e-mail-Publicación en plataforma)** en el documento electrónico a través de: ***Menú básico > Manejador de operaciones > Seleccionar la factura de venta > Inspector de datos - Documento > Acciones.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación acciones de envío en la **Factura de venta**:](https://www.contapyme.com/conocimientocontapyme/080_IN/acciones_envio_fe.png)

- Valida que el CUFE registrado en la operación o el PDF se encuentre registrado en la DIAN: ***Menú básico > Manejador de operaciones > Seleccionas la factura > Inspector de datos - Documento > Acciones > CUFE registrado en la parte inferior.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación CUFE asignado en la **Factura de venta** desde inspector:](https://www.contapyme.com/conocimientocontapyme/080_IN/cufe_inspector_fe.png)

Haciendo uso de la anterior opción y presionando clic sobre ella te dirigirá a la plataforma de la DIAN donde podrás consultar el documento y confirmar su estado así:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación CUFE asignado en la **Factura de venta** desde la DIAN:](https://www.contapyme.com/conocimientocontapyme/080_IN/verificacion_dian_fe.png)

---

## Notas crédito y débito

### ¿Cómo realizar una nota crédito ya que al buscar la referencia no sale la factura?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Requiero hacer nota crédito de fe y no me sale la opción de seleccionarla
- No me aparece la factura para hacerle nota crédito
- La referencia de factura no me aparece
- ¿Cómo realizar una nota crédito cuando al buscar la referencia no aparece la factura?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Si al generar una nota crédito no se visualiza la factura como referencia, valida lo siguiente:

1. **Cliente correcto:** Asegúrate de que el cliente seleccionado en la nota crédito sea el mismo que figura en la factura de referencia.

2. **Rango de fechas:** Verifica que la factura esté dentro del rango de fechas establecido en la búsqueda. Para confirmar o ajustar estas fechas debes ingresar a: ***Selección de referencia > Clic en los tres puntos > Ajustar rangos de fecha "Desde – Hasta".***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo ajuste fecha desde - hasta para referencia en nota crédito de ventas:](https://www.contapyme.com/conocimientocontapyme/080_IN/fecha_ref_nc.png)

Una vez realices este proceso, podrás visualizar los documentos generados dentro del rango de tiempo definido.

#### 📌 Recursos adicionales   
▶️ **Video:**  
[Inventarios Básico II – Incluye operación devolución en ventas](https://www.youtube.com/watch?v=dErWn5fapzM&t=2090s) 


---

## Parámetros y Personalización

### ¿Cómo revisar la cuenta de los impuestos? ¿Donde se valida que quede como clase de impuesto y con el tipo de impuesto correcto?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Tengo una factura que no me envía por configuración de cuenta del iva
- ¿Cómo puedo verificar si la cuenta asociada a un impuesto está correctamente configurada?
- ¿Dónde reviso si una cuenta está marcada como clase de impuesto?
- ¿Cómo validar que el código del impuesto asignado a la cuenta sea el correcto?
- ¿Qué pasos debo seguir para consultar la cuenta del impuesto desde la operación?
- ¿Dónde encuentro la opción para modificar una cuenta desde el plan de cuentas (PUC)?
- ¿Qué debo revisar en el PUC para asegurar que una cuenta funcione para IVA, retenciones u otros impuestos?
- ¿Por qué es importante que la cuenta tenga configurada la clase de impuesto correcta?
- Como configurar la cuenta del iva
- como puedo verificar si la cuenta de iva esta correctamente configurada
- como configuro la cuenta de iva como de impuesto
- no envía factura por el iva
- la cuenta del iva no esta como de impuestos
- problema al configurar cuenta de iva
- tengo la cuenta del iva configurada clase normal y debe ser de impuestos
- me da error en la cuenta del iva
- no me deja enviar la factura electrónica por el iva
- error en configuración de impuestos
- la cuenta del iva no está configurada correctamente
- me rechaza la factura por el iva
- donde se configura la cuenta de impuestos
- donde reviso la configuración del iva
- error en cuenta de impuesto
- la factura no envía por configuración de impuestos
- como validar la cuenta contable del iva

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Para garantizar el correcto envío de **documentos electrónicos** y el adecuado registro contable, es fundamental que las cuentas asignadas a los **impuestos (IVA, retenciones, ICA, etc.)** estén correctamente configuradas. Esta validación la puedes realizar de dos maneras:

1. **Verificación desde la liquidación del impuesto en la operación:** En la ventana de liquidación de impuestos del documento:

- Presiona la lupa para visualizar el movimiento contable generado.
- Identifica la cuenta que está siendo afectada por el impuesto.
- Para verificar su configuración, selecciona: ***Clic sobre la cuenta > Modificar > Verificar que la clase de la cuenta sea de impuesto y que el código corresponda al impuesto requerido.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración cuenta impuestos desde la factura de venta:](https://www.contapyme.com/conocimientocontapyme/080_IN/modificar_cuentaimp_fv.png)

2. **Verificación desde el Plan Único de Cuentas (PUC):** También puedes revisar directamente en el plan de cuentas:

- Ingresa a Menú contabilidad > Plan de cuentas.
- Ubica la cuenta contable asociada al impuesto.
- Para verificar su configuración, selecciona: ***Clic sobre la cuenta > Modificar > Verificar que la clase de la cuenta sea de impuesto y que el código corresponda al impuesto requerido.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración cuenta impuestos desde el PUC:](https://www.contapyme.com/conocimientocontapyme/080_IN/modificar_cuentaimp_puc.png)

Después de esto podrás continuar tu proceso de facturación de manera normal, si necesitas ayuda respecto a ello puedes solicitar el tiquete de soporte técnico.

---

## Procesamiento, Anulación y Reenvío
### ¿Cómo descargar el XML de una factura electrónica?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Cómo descargar el XML
- Cómo puedo descargar el archivo XML de una factura electrónica?
- ¿Dónde encuentro la opción para visualizar el XML de una factura en el sistema?
- ¿El XML se puede guardar directamente desde la opción “Visualizar XML”?
- ¿Se puede abrir el XML antes de descargarlo?
- ¿Puedo descargar el XML de cualquier factura ya procesada?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Para descargar el archivo **XML de una factura electrónica que ya fue generada y enviada a la DIAN**, puedes hacerlo directamente desde el sistema siguiendo estos pasos:

Ingresa a ***Menú básico > Manejador de operaciones > Ubicar la factura de venta > Documento - Visualizar > Visualizar XML***, el sistema abrirá el archivo XML y podrás guardarlo en tu equipo.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo visualizar XML:](https://www.contapyme.com/conocimientocontapyme/080_IN/visualizar_xml.png)

---

## Gestión de Documento de soporte

### ¿Que configuraciones son necesarias para iniciar con el servicio de documento de soporte a no obligados a facturar? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo iniciar documento soporte?
- Activación de documento soporte
- ¿Qué hago para iniciar con documento soporte?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para iniciar con **documento de soporte a no obligados a facturar** debes cumplir algunos pasos previos tanto en la **DIAN** como en el sistema **ContaPyme**, ya que así se confirma que tienes todo **listo y aprobado** para iniciar con el proceso de **generación y transmisión de documentos electrónicos en formato XML ante la DIAN**.  
A continuación te indicamos esos pasos:

**Pasos en la DIAN:**
1. **Regístrate como facturador electrónico** y cumple el proceso de **Habilitación**. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior accede por la opción: **Temas de interes > Factura electrónica > Habilitación.** 

    1.1 Selecciona en los modos de operación el proveedor tecnológico que usarás para el envío de documentos electrónicos tanto en ambiente de habilitación (pruebas) como en el ambiente de producción.

    1.2 Envía los documentos mínimos de prueba de habilitación requeridos por la DIAN para que quedes habilitado como facturador electrónico. *Desde el área de soporte técnico de InSoft te ayudamos con este proceso, solo tienes que generar un tiquete de soporte desde tu ContaPyme y un asesor te contactará para ayudarte en este proceso de manera ágil y automatizada.* 

2. **Genera una resolución de documento soporte a no obligados** en el sistema MUISCA de la DIAN. Para esto ingresa a: https://www.dian.gov.co/ y en la parte superior izquierda ingresa al sistema MUISCA por alguna de las opciones: **Transaccional > Usuario registrado** o **Transaccional > Usuario nuevo.**

    2.1 Genera la resolución de documento soporte a no obligados, para esto ingresa por: *Solicitar numeración de facturación.*
    
    2.2 Ingresa por la opción “Autorizar rangos” y registra el prefijo y rango de numeración para documento soporte a no obligados. 

    2.3 Genera el formato borrador "1302" que la DIAN te presenta y luego fírmalo, allí se generará el formato "1876" que corresponde a la resolución de documento soporte a no obligados a facturar.

3. **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

**Pasos en ContaPyme:**
1. Confirma que ya hiciste el proceso de adquisición del plan de documentos electrónicos ante InSoft.
2. Registra la información que indica el paso a paso de configuración del portal de clientes del sistema ContaPyme.  
Ingresa a: https://www.contapyme.com/portal-clientes/,  verifica que tienes la empresa registrada por la opción *Servicios electrónicos* y sigue los pasos que allí indica el portal.

    👉 Para orientarte mejor revisa el siguiente [Video: Pasos en portal de clientes de ContaPyme para vinculación de empresa con facturación electrónica](https://www.youtube.com/watch?v=OjYLK73UfMg)

3. Activa en el **Explorador gráfico de empresas** el servicio de *facturación electrónica.*
   
   👉 Para orientarte mejor revisa el siguiente [Video: Activación de facturación electrónica en explorador gráfico de empresas en ContaPyme](https://www.youtube.com/watch?v=guZZb1YI7wo)

4. Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución de documento soporte a no obligados a facturar que generaste en la DIAN.  
    **Nota:** En este paso debes garantizar que tienes plenamente configurados los documentos de soporte en tu sistema:
    - *Documento soporte a no obligados:* Con la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.
    - *Nota de ajuste a documento de soporte:* Estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.

    👉 Para orientarte mejor revisa el siguiente [Video: Configuración de documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc) 

5. Confirma que desde tu licenciamiento y usuario, puedes acceder en el *manejador de operaciones* a las operaciones que permiten emitir documento soporte a no obligados a facturar:

- **Gastos:** Operación que permite facturar conceptos y/o servicios, es decir, que no tiene un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Ingresos?](https://www.youtube.com/watch?v=u40HpeDFoz8&t=2445s) 

- **Compras:** Operación que permite facturar tanto servicios como productos, es decir, permite un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Facturación y ventas?](https://www.youtube.com/watch?v=u40HpeDFoz8&t=2445s) 

6. Verifica que tienes asociado en la operación con la que emites documento soporte a no obligados *(Gastos, Compras, entre otros)* el documento de soporte que ya tienes configurado con la información de la resolución que tramitaste ante la DIAN.

---

## Casos Especiales y Otras Preguntas

### ¿Cómo evitar que se puedan modificar las facturas electrónicas luego de enviarlas a la DIAN?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Por qué no puedo cambiar una factura después de enviarla a la DIAN?
- ¿Por qué a otros usuarios sí les deja hacer cambios y a mí no?
- ¿Cómo puedo evitar que se cambien las facturas después de enviarlas?
- ¿Puedo dejar a un usuario solo para consultar facturas sin que pueda cambiarlas?
- ¿Por qué no me deja anular una factura?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para evitar que las facturas de venta sean **modificadas** después de ser **enviadas a la DIAN**, es fundamental configurar los permisos de los usuarios en el sistema.

Puedes hacerlo siguiendo estos pasos:

1. **Crear o identificar el perfil de seguridad:**

- Accede a Básico > Usuarios > Perfiles de seguridad.
- Crea un nuevo perfil o selecciona uno existente (por ejemplo: VENDEDOR, CONSULTA, CAJERO).

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo acceso a perfiles de seguridad:](https://www.contapyme.com/conocimientocontapyme/080_IN/perfiles_seguridad.png)

2. **Configurar los permisos del perfil:**

- Dentro del perfil, ubica el módulo de **Facturación electrónica y POS.**
- En la sección Operaciones, **activa únicamente crear y visualizar.**
- Desactiva las opciones de Modificar, Anular y Eliminar para las facturas de venta.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo asignación permisos del módulo de facturación:](https://www.contapyme.com/conocimientocontapyme/080_IN/[12060]permisos_modulo_facturacion.png)

3. **Asignar el perfil al usuario:**

- Ve a Básico > Usuarios > Usuarios del sistema.
- Selecciona el usuario y asigna el perfil de seguridad configurado.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo asignar perfil al usuario:](https://www.contapyme.com/conocimientocontapyme/080_IN/[11530]registro_perfil_usuario.png)

*Con esta configuración, los usuarios solo podrán crear y visualizar las facturas de venta, impidiendo cualquier modificación posterior.*

---

### ¿Cómo actualizar resolución de documento soporte a no obligados a facturar?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- Actualizar resolución de no obligados
- Sincronizar resolución de documento soporte.
- Necesito actualizar la resolución de documento soporte.

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para actualizar la resolución en ContaPyme de documento soporte a no obligados a facturar, es necesario seguir un proceso específico que incluye la configuración en el sistema y la gestión de la resolución ante la DIAN. Este proceso asegura que los documentos electrónicos emitidos cumplan con la normativa vigente.

Solo debes contar con el **formato 1876 – Autorización de numeración de documento soporte a no obligados a facturar**, donde encontrarás:

- Número de la resolución.
- Prefijo.
- Rango inicial y final.
- Fechas de vigencia del documento electrónico.

#### ¿Cómo realizar la actualización de la resolución en ContaPyme?

Sigue estos pasos:

1. Ingresa al menú **Básico**.
2. Selecciona **Doc. Soporte**.
3. Ubica el documento electrónico que deseas actualizar.
4. En el menú superior, haz clic en **Modificar**.
5. Ve a la pestaña **Definición del documento**.
6. Selecciona la opción **Resoluciones**.
7. Actualiza la información con los datos de la nueva resolución.

El sistema mostrará la resolución actual, donde podrás reemplazarla por la información vigente.

#### Validación de la información

Una vez realizada la actualización, verifica que:
- La nueva resolución quede correctamente registrada.
- Los documentos electrónicos generados reflejen los datos actualizados.

#### Notas importantes

- Asegúrate de ingresar la información exactamente como aparece en el formato 1876.
- Datos incorrectos pueden generar rechazos o inconvenientes con la DIAN.

---

## Casos Especiales y Otras Preguntas

### No permite envío de nota de ajuste a documento soporte por rechazo NSAJ73.

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- No me deja enviar la nota de ajuste a documento soporte, aparece rechazo NSAJ73.
- ¿Por qué me sale el error NSAJ73 al enviar la nota de ajuste?
- Tengo un rechazo NSAJ73 al enviar una nota de ajuste a documento soporte.
- ¿Qué significa el rechazo NSAJ73 en la nota de ajuste?
- La DIAN me rechaza la nota de ajuste con código NSAJ73.
- ¿Cómo soluciono el rechazo NSAJ73 al enviar documento soporte?
- No puedo enviar la nota de ajuste del documento soporte por error NSAJ73.
- El sistema no me deja enviar la nota de ajuste y aparece NSAJ73.
- ¿Por qué la DIAN rechaza la nota de ajuste del documento soporte?
- ¿Qué debo revisar cuando aparece el rechazo NSAJ73?
- Al enviar la nota de ajuste me genera error NSAJ73, ¿qué debo hacer?
- ¿Dónde reviso el código postal cuando aparece el error NSAJ73?


#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si al enviar una **nota de ajuste a documento soporte** el sistema genera el rechazo **NSAJ73**, generalmente se debe a que el tercero asociado al documento **no tiene configurado el código postal** en su información de dirección.

Este dato es requerido para el envío correcto del documento electrónico a la DIAN.

### ¿Cómo solucionarlo?

1. Ingresa al **tercero** al cual se le está generando la nota de ajuste.
2. Dirígete a la pestaña de **Dirección**.
3. Ubica el campo **Código postal**.
4. El sistema sugerirá automáticamente el código correspondiente según el **País, Departamento y Ciudad** registrados.
5. Guarda los cambios realizados.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Asignar código postal en el tercero:](https://www.contapyme.com/conocimientocontapyme/080_IN/cod_postal_tercero.png)

Una vez guardada la información del tercero, vuelve a **procesar la nota de ajuste** para que el sistema realice nuevamente el envío del documento a la DIAN.

Si después de realizar esta validación el documento continúa presentando rechazo, te recomendamos **generar un tiquete de soporte** para revisar el caso de forma más detallada.

---

## Facturación y documento soporte.

### ¿Como generar nota de ajuste a documento soporte a no obligados a facturar?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo generar una nota de ajuste a documento soporte?
- ¿Cómo hacer una nota de ajuste a documento soporte en ContaPyme?
- ¿Cómo corregir un documento soporte a no obligados a facturar?
- ¿Cómo anular un documento soporte en el sistema?
- ¿Cómo registrar una nota de ajuste para documento soporte?
- ¿Cómo modificar un documento soporte que ya fue generado?
- ¿Cómo hacer una nota crédito a un documento soporte?
- ¿Dónde se crea la nota de ajuste a documento soporte?
- ¿Cómo ajustar un documento soporte en compras?
- ¿Cómo generar una nota de ajuste a documento soporte de gastos?
- ¿Cómo referenciar un documento soporte para hacer una nota de ajuste?
- ¿Cómo corregir un documento soporte enviado a la DIAN?
- ¿Cómo hacer una nota de ajuste cuando un documento soporte tiene error?
- ¿Cómo reversar un documento soporte en ContaPyme?
- ¿Cómo registrar una corrección a un documento soporte?
- ¿Cómo ajustar un documento soporte a proveedor no obligado a facturar?



#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La **nota de ajuste a documento soporte** permite corregir o anular un documento soporte previamente registrado a un proveedor **no obligado a facturar**.

Para generarla en ContaPyme, sigue estos pasos:

1. Ingresa a **Básico** > **Operaciones**.

2. Haz clic en **Más** y selecciona la operación correspondiente según aplique:

   - **Operación de Compras** > **Nota de Ajuste a Documento de Soporte (Compras)**  

   - **Operación de Gastos** > **Nota de Ajuste a Documento de Soporte (Gastos)**

3. Verifica que el **tipo de documento** sea el correcto.

4. Indica la **referencia del documento soporte original** que deseas ajustar.

   ⚠️ Ten presente que la **fecha de la nota de ajuste debe ser igual o posterior a la del documento soporte**.

5. Selecciona el **motivo de la nota de ajuste**.

6. Haz clic en **Siguiente**.

7. Indica **dónde se reintegra el dinero**, si aplica.

8. Haz clic en **Finalizar** para completar el proceso.

Después de esto, el sistema generará la **nota de ajuste al documento soporte**, la cual podrá ser enviada electrónicamente a la DIAN si corresponde.

---


