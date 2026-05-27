# pf_gastos.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **Gastos**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/03/17

# Gastos
## Recepción y Eventos electrónicos

### Configuraciones generales
---
### ¿Cómo se configura el correo para la recepción de documentos en ContaPyme?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo configuro el correo para recibir facturas electrónicas?
- ¿Cómo activar la recepción de documentos electrónicos en ContaPyme?
- ¿Dónde configuro el correo para recepción de facturas?
- ¿Cómo registrar el correo para recibir documentos electrónicos?
- ¿Cómo habilitar la recepción de facturas electrónicas en el sistema?
- ¿Cómo configurar el buzón de recepción de facturas en ContaPyme?
- ¿Cómo hacer para que me lleguen las facturas electrónicas al sistema?
- ¿Qué debo hacer para recibir documentos electrónicos en ContaPyme?
- ¿Dónde ingreso el correo para recepción de facturas?
- ¿Cómo activar la opción de recepción de documentos electrónicos?
- ¿Cómo configurar el correo para reenviar facturas a ContaPyme?
- ¿Cómo vincular un correo para recibir documentos electrónicos?
- ¿Cómo configurar el email para que lleguen las facturas electrónicas?
- ¿Qué configuración necesito para recibir facturas electrónicas?
- No me están llegando las facturas electrónicas, ¿qué debo configurar?
- ¿Cómo revisar si tengo activo el correo de recepción de documentos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para configurar el correo de **recepción de documentos electrónicos** en ContaPyme, primero debes activar el manejo de recepción facturas y eventos electrónicos en la empresa y luego registrar el correo desde el cual se reenviarán las facturas.

### 🔧 **Pasos para la configuración:**

1. Ingresa a la pestaña **Básico** > **Empresa**.  
2. Haz clic derecho sobre la empresa y selecciona **Modificar**.  
3. Dirígete a la pestaña **Servicios Electrónicos**.  
4. Activa la opción **Recepción de facturas y eventos electrónicos**.  
5. Se habilitará la pestaña **Recepción**, donde debes:
   - Ingresar el correo desde el cual hará reenvío de facturas y eventos recibidos. 
6. Haz clic en **Aceptar** para guardar los cambios.

### ⚠️ **Importante:**
- El correo configurado debe estar correctamente verificado para **reenviar automáticamente** los documentos electrónicos.
- Asegúrate de que las facturas sean enviadas al buzón indicado para que el sistema pueda procesarlas correctamente.

---

### ¿Cómo recibir una factura electrónica si no tengo el archivo ZIP para reenviarlo al buzón?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo recibir una factura si no tengo el ZIP?
- No tengo el ZIP de la factura, ¿cómo la puedo cargar en el sistema?
- ¿Cómo importar una factura electrónica sin el archivo ZIP?
- ¿Qué hago si solo tengo el XML de la factura?
- ¿Cómo subir una factura electrónica sin el ZIP?
- ¿Se puede cargar una factura solo con el XML?
- ¿Cómo descargar el XML de la DIAN para cargar la factura?
- No me enviaron el ZIP de la factura, ¿cómo la ingreso a ContaPyme?
- ¿Cómo importar facturas electrónicas desde el XML?
- ¿Cómo recibir facturas electrónicas manualmente en el sistema?
- ¿Qué hacer si el proveedor no envió el ZIP de la factura?
- ¿Cómo cargar una factura electrónica descargada de la DIAN?
- ¿Cómo importar documentos electrónicos desde mi computador?
- ¿Cómo registrar una factura electrónica sin reenviar correo?
- Como importar facturas con el cufe o el xml

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si necesitas recibir una factura electrónica en ContaPyme y **no cuentas con el archivo ZIP**, puedes realizar el proceso utilizando la siguiente alternativa:

Ruta inicial en el sistema:

**Manejador de operaciones > Sección herramientas > Descargar FE recibidas**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Herramienta descargar FE recibidas:](https://www.contapyme.com/conocimientocontapyme/120_GA/descargarferecibidas.png)


### **1️⃣ Importar con archivos XML o con CUFEs**

Esta opción permite cargar facturas cuando dispones del **XML** o del **CUFE** del documento, a continuación te explicamos cada una de las disponibles:

**Por CUFE:**

Permite registrar manualmente uno o varios CUFEs de las facturas recibidas. El CUFE es el código único que identifica cada factura electrónica. Puedes ingresar varios CUFEs en el campo disponible, separándolos por coma (,), punto y coma (;), espacio o utilizando la tecla ENTER.

![Herramienta descargar FE recibidas por CUFE:](https://www.contapyme.com/conocimientocontapyme/120_GA/porcufe.png)

**Desde archivos XML:**

Permite cargar directamente los archivos XML de las facturas electrónicas que hayas recibido de tus proveedores. Al seleccionar esta opción, podrás buscar en tu equipo los archivos XML y cargarlos al sistema para crear automáticamente las pre operaciones.

![Herramienta descargar FE recibidas por XML:](https://www.contapyme.com/conocimientocontapyme/120_GA/desdearchivosxml.png)

**Desde archivo de Excel (Listado de CUFEs):**

Permite cargar un archivo de Excel descargado desde el portal de la DIAN en la consulta de documentos recibidos. Este archivo contiene el listado de CUFEs y la información de las facturas electrónicas.

![Herramienta descargar FE recibidas por archivo excel:](https://www.contapyme.com/conocimientocontapyme/120_GA/listadoexcel.png)

Ten en cuenta que el archivo descargado desde la DIAN generalmente se obtiene en formato comprimido (.ZIP). Antes de realizar la importación, debes extraer el archivo de Excel contenido en el archivo ZIP y luego seleccionarlo en el sistema.

**Solo se considerarán las facturas electrónicas incluidas en el archivo y el NIT del emisor debe corresponder al de la empresa actual.*

**Importante:** 

*Esta herramienta solo está disponible con Proveedor tecnológico Insoft*

Utilizando cualquiera de estas alternativas podrás **recibir y cargar la factura electrónica en el sistema sin necesidad del archivo ZIP**.

Si después de realizar estos procesos no logras cargar la factura electrónica, te recomendamos **generar un tiquete de soporte técnico** para revisar el caso de manera detallada.

Al crear el tiquete, es importante adjuntar:

- Una **captura del mensaje presentado**.

Esto permitirá analizar el caso con mayor precisión y brindarte una solución más rápida.

---
### ¿Por qué se rechazan las facturas de compra al enviarlas al buzón de eventos de ContaPyme?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué se rechazan las facturas que envío al buzón de ContaPyme?
- Envío la factura al buzón y la rechaza, ¿qué puede ser?
- ¿Por qué no me recibe las facturas el buzón de eventos?
- El buzón rechaza la factura electrónica, ¿qué debo revisar?
- ¿Por qué no puedo reenviar facturas al buzón de ContaPyme?
- Me rechaza las facturas al enviarlas al correo de recepción.
- ¿Qué causa el rechazo de facturas enviadas al buzón?
- ¿Por qué no se cargan las facturas que envío al buzón?
- Envío el correo con la factura y no la acepta.
- ¿Qué debo validar si el buzón rechaza una factura electrónica?
- ¿Por qué el sistema no acepta el archivo que envío al buzón?
- ¿Qué errores pueden causar rechazo en la recepción de facturas?
- El sistema rechaza una factura específica de un proveedor sin motivo claro enviada al buzón
- Las facturas electrónicas no aparecen en ContaPyme aunque fueron enviadas al correo de recepción 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si al reenviar una factura de compra al buzón de eventos de ContaPyme se genera un rechazo, puede deberse a alguno de los siguientes motivos:

### 🔎 Motivos más comunes de rechazo

**1️⃣ El archivo enviado no es un ZIP válido**

- Debes reenviar un archivo comprimido en formato **.ZIP**.
- El archivo ZIP debe contener:
  - El archivo **PDF**
  - El archivo **XML tipo AttachedDocument**
- Verifica que el archivo no esté vacío o incompleto.


**2️⃣ El XML adjunto no corresponde al tipo AttachedDocument**

- El archivo XML debe ser el **AttachedDocument**, que contiene la validación electrónica.
- Si se envía otro tipo de XML, el sistema generará rechazo.

Puedes verificarlo abriendo el XML enviado y el enzabezado debe estar definido así:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Visualizar XML AttachedDocument:](https://www.contapyme.com/conocimientocontapyme/120_GA/xml_attached.png)

**3️⃣ El CUFE no coincide con la información registrada en la DIAN**

- Verifica el **CUFE** registrado en la factura o en el XML.
- Consulta el CUFE en el portal de la DIAN y si el sistema indica que el documento no existe, la factura será rechazada.

**4️⃣ El correo remitente no está autorizado**

- Verifica que el correo desde el cual se envía la factura sea el registrado y autorizado en la empresa.

**5️⃣ El correo destino no es el buzón correcto**

Verifica que el correo al que estás enviando el archivo sea: **recepcion@contapyme.com.co**

**6️⃣ El correo contiene caracteres o contenido inválido**

Algunos correos incluyen elementos que pueden generar rechazo, como:

- Imágenes
- Firmas automáticas
- Código adicional en el cuerpo del mensaje

Estos elementos pueden generar bloqueos o restricciones en el procesamiento del correo, eliminalos del cuerpo del correo y prueba reenviando nuevamente.

### 🔧 Alternativa si el archivo es rechazado

Si el archivo es rechazado al enviarlo al buzón, puedes utilizar la opciones para **importar con archivos XML o con CUFEs**.

Ruta en el sistema:

**Manejador de operaciones > Sección herramientas > Flecha ubicada en Descargar FE recibidas**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Herramienta descargar FE recibidas:](https://www.contapyme.com/conocimientocontapyme/120_GA/descargarferecibidas.png)


Si después de realizar todas las validaciones anteriores el rechazo continúa, te recomendamos **generar un tiquete de soporte técnico** para revisar el caso de manera detallada.

Al crear el tiquete, es importante adjuntar:

- El archivo **ZIP** que estás intentando reenviar.
- Una **captura del mensaje de rechazo** recibido.

Esto permitirá analizar el caso con mayor precisión y brindarte una solución más rápida.

---

### ¿Por qué no me permite marcar eventos de acuse de recibo, recibo del bien o servicio o aceptación expresa/reclamo y quedan en estado pendiente?

CANONICAL_ID: PF_GASTOS  
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- No me permite marcar eventos en facturas recibidas.
- Los eventos quedan en estado pendiente, ¿qué debo hacer?
- ¿Por qué el acuse de recibo queda pendiente?
- No puedo enviar el evento de recibo del bien o servicio.
- ¿Por qué no puedo marcar aceptación expresa?
- Intento enviar eventos y quedan en estado pendiente.
- ¿Cómo actualizar el estado de eventos pendientes?
- ¿Por qué los eventos no se reportan a la DIAN?
- El sistema no me permite continuar con los eventos.
- ¿Qué validar si un evento queda en estado pendiente?
- No puedo marcar eventos en una factura descargada.
- ¿Por qué no se habilitan los eventos en la factura?
- No cambia el estado de evento
- Aparece el XML como no disponible

---

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->

Si descargaste una factura de compra y al intentar aplicar eventos como **acuse de recibo**, **recibo del bien o servicio** o **aceptación expresa/reclamo**, estos quedan en estado **pendiente**, puedes realizar las siguientes validaciones:


**1️⃣ Verifica que la factura sea a crédito**

- Los eventos electrónicos solo aplican para **facturas con forma de pago crédito**.
- Si la factura es **de contado**, puede ser recibida y descargada, pero **no se notifican eventos a la DIAN**.

**2️⃣ Actualiza el estado del documento**

Antes de intentar generar nuevamente un evento, es necesario actualizar el estado del documento.

Ruta en el sistema:

**Manejador de operaciones > Sección Documento > Actualizar Estado**

Este proceso consulta en el servidor el estado actual del documento o evento previamente generado.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Actualizar estado documento:](https://www.contapyme.com/conocimientocontapyme/120_GA/actualizar_estado.png)


**3️⃣ Verifica el estado desde el Inspector de datos**

Confirma que el estado del documento haya sido actualizado correctamente desde el **Inspector de datos**, ubicado en la sección de **opciones** del manejador de operaciones.

Verifica los siguientes estados:

- Si vas a iniciar el reporte de eventos, debe aparecer:  
  **Reportado al PT**  
  Esto significa que el documento ya puede iniciar la transmisión de eventos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Verificar estado reportado al PT:](https://www.contapyme.com/conocimientocontapyme/120_GA/notificado_pt_inspector.png)

- Si es un evento que generaste y continua en estado **pendiente** después de actualizar el estado, te recomendamos **generar un tiquete de soporte técnico** para realizar una revisión más detallada.

Al crear el tiquete, es importante adjuntar:

- El archivo **ZIP** de la factura.
- Una **captura del estado del evento** en el sistema.

Esto permitirá analizar el caso con mayor precisión y brindarte una solución más rápida.

---

### ¿Cómo funciona la recepción de documentos y eventos electrónicos en ContaPyme?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo se realiza el proceso de recepción de documentos electrónicos en ContaPyme?
- ¿Cómo se emiten los eventos electrónicos en ContaPyme después de la recepción de un documento electrónico?
- ¿Cómo se realiza el proceso de recepción de documentos electrónicos en ContaPyme?
- ¿Cómo se emiten los eventos electrónicos en ContaPyme después de la recepción de un documento electrónico?
- ¿Cuál es el proceso completo para recibir facturas electrónicas?
- ¿Cómo funciona la recepción y registro de facturas electrónicas?
- ¿Cuál es el flujo para recibir documentos electrónicos y generar eventos?
- ¿Cómo registrar facturas electrónicas y reportar eventos a la DIAN?
- ¿Cómo se descargan y registran facturas electrónicas en el sistema?
- ¿Qué pasos se deben seguir después de recibir una factura electrónica?
- ¿Cómo convertir una preoperación en compra o gasto?
- ¿Cómo generar eventos electrónicos después de registrar una factura?
- ¿Cuál es el orden correcto de los eventos electrónicos?
- ¿Cómo verificar que los eventos fueron reportados a la DIAN?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El proceso de recepción de documentos electrónicos en ContaPyme se compone de **dos etapas principales**:

1️⃣ Recepción y registro del documento electrónico  
2️⃣ Generación de eventos electrónicos ante la DIAN  

A continuación se describe cada proceso.

# 📥 Proceso 1: Recepción de documentos electrónicos

Para recibir documentos electrónicos en el sistema, puedes hacerlo de diferentes maneras:

**1️⃣ Reenviar la factura electrónica**

- Reenvía la factura electrónica desde el correo configurado en la empresa al correo: **recepcion@contapyme.com.co**, también puedes realizar la descarga por medio del CUFE o importando los XML descargados.

**2️⃣ Descargar las facturas recibidas**

En ContaPyme seleccionar las facturas a descargar desde:

**Manejador de operaciones > Descargar FE recibidas** 


**3️⃣ Verificar el detalle del documento**

- Revisa la información descargada.

**4️⃣ Abrir el manejador de preoperaciones**

Desde esta sección podrás visualizar las preoperaciones generadas.

**5️⃣ Convertir la preoperación**

Convierte la preoperación en:

- **Compra**, o  
- **Gasto**

según corresponda.


**6️⃣ Asociar códigos del proveedor (si aplica)**

Si es la primera vez que se recibe el producto:

- Asocia los códigos del proveedor con los códigos internos del inventario.


**7️⃣ Modificar el tipo de documento (si es necesario)**

Realiza ajustes adicionales antes de finalizar.

---

**8️⃣ Finalizar la operación**

Una vez finalizada:

- La factura queda registrada en el sistema.
- El documento estará disponible para generar eventos electrónicos.


# 📤 Proceso 2: Generación de eventos electrónicos

Después de registrar la factura, se deben emitir los eventos electrónicos correspondientes.


### 🔎 Pasos para generar eventos

**1️⃣ Seleccionar la factura de compra**

Ubica la factura creada a partir de la recepción del documento.

**2️⃣ Generar el primer evento**

Selecciona la opción:

**Eventos > Acuse de Recibo de Factura Electrónica**

Envía el evento.

**3️⃣ Actualizar el estado del documento**

Espera unos minutos y ejecuta:

**Actualizar estado del documento**

Esto permitirá consultar la respuesta del evento enviado.

**4️⃣ Generar los siguientes eventos**

Realiza los eventos en el siguiente orden o enviando la Aceptación expresa se enviarán los dos anteriores automáticamente.

1. **Acuse de Recibo de Factura Electrónica**
2. **Recibo del Bien o Servicio**
3. **Aceptación Expresa**

Cada evento debe enviarse y actualizarse antes de continuar con el siguiente.

**5️⃣ Verificar reporte a la DIAN**

Confirma que los eventos aparezcan en estado:

**Reportado a la DIAN**

Esto indica que el proceso fue completado correctamente.

📌 **Resultado**

Al completar estos procesos:

- La factura electrónica queda registrada en el sistema.
- Los eventos electrónicos quedan reportados ante la DIAN.

Si durante el proceso presentas inconsistencias en la recepción o en el envío de eventos electrónicos, te recomendamos **generar un tiquete de soporte técnico** para revisar el caso.

Al crear el tiquete, es importante adjuntar:

- El archivo **ZIP** o **XML** de la factura.
- Una **captura del mensaje presentado**.

👉 Para orientarte mejor revisa el siguiente [Video: Pasos en portal de clientes de ContaPyme para vinculación de empresa con facturación electrónica](https://www.youtube.com/watch?v=u40HpeDFoz8)

---

### ¿Cómo activar el módulo de recepción de documentos y eventos electrónicos en ContaPyme?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo activar la recepción de facturas electrónicas en ContaPyme?
- ¿Cómo habilitar el módulo de eventos electrónicos?
- ¿Cómo configurar la recepción de documentos electrónicos?
- ¿Cómo activar la recepción de facturas y eventos electrónicos?
- ¿Dónde se habilita la recepción electrónica en el sistema?
- ¿Cómo configurar el correo para recepción de facturas electrónicas?
- ¿Cómo habilitar el buzón de recepción de documentos electrónicos?
- ¿Cómo activar la funcionalidad de recepción electrónica?
- ¿Qué se necesita para activar la recepción de documentos electrónicos?
- ¿Cómo configurar la recepción electrónica en la empresa?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para activar el módulo de **recepción de documentos y eventos electrónicos** en ContaPyme, primero debes contar con un **paquete de documentos electrónicos adquirido**, el cual permitirá realizar la recepción de facturas y el envío de eventos electrónicos.

### 📌 Requisitos previos

Antes de realizar la configuración, verifica:

- Contar con un **paquete de documentos electrónicos activo**.
- Tener la **empresa creada y configurada** en el sistema.
- Disponer del **correo electrónico** que se utilizará para reenviar las facturas al buzón de ContaPyme.

### 🔧 Pasos para la configuración

1️⃣ Ingresa a la pestaña:

**Básico > Empresa**

2️⃣ Haz clic derecho sobre la empresa y selecciona:

**Modificar**

3️⃣ Dirígete a la pestaña:

**Servicios Electrónicos**

4️⃣ Activa la opción:

**Recepción de facturas y eventos electrónicos**

Desde esta opción el sistema verificará el **saldo disponible del paquete adquirido**.

5️⃣ Se habilitará la pestaña:

**Recepción**

En esta pestaña debes:

- Ingresar el **correo electrónico autorizado** desde el cual se realizará el reenvío de facturas y eventos electrónicos.

6️⃣ Haz clic en:

**Aceptar**

para guardar los cambios realizados y dirigirte al correo electrónico para verificar la cuenta.

### ⚠️ Importante

- El correo configurado debe ser el mismo desde el cual se reenviarán las facturas electrónicas.
- Si el correo no está registrado en la empresa, el sistema **no permitirá recibir documentos electrónicos**.
- Verifica que las facturas sean enviadas al buzón oficial del sistema:

**recepcion@contapyme.com.co**


---

### ¿Por qué no permite asociar una pre operación a una factura de compra o gasto ya creada?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no puedo asociar una pre operación a una factura de compra que ya creé?  
- El sistema no me deja asociar la pre operación a la factura, ¿qué puede estar pasando?  
- ¿Por qué no puedo relacionar una pre operación con un gasto ya registrado?  
- Intento asociar una pre operación a una factura y no me lo permite  
- ¿Qué significa que no se pueda asociar la pre operación a la factura?  
- ¿Por qué aparece error al asociar una pre operación a una factura de compra?  
- No puedo vincular la pre operación a la factura de compra  
- ¿Por qué no puedo unir la pre operación con la factura que ya existe?  
- Ya tengo la factura creada pero no me deja asociar la pre operación  
- ¿Por qué no se puede relacionar la pre operación con un gasto existente?  
- Me aparece que no se puede asociar la pre operación, ¿a qué se debe?  
- ¿Por qué el sistema bloquea la asociación de la pre operación?  
- No me permite asociar la pre operación a un documento ya creado  
- ¿Por qué no puedo asociar la pre operación a un documento soporte?  
- ¿Qué debo revisar cuando no me deja asociar una pre operación?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si el sistema no permite asociar una pre operación descargada a una factura de compra o gasto ya creada, normalmente se debe a alguna de las siguientes razones:

- Valide que la fecha a la que se realiza el filtro sea **igual o superior a la fecha registrada en la factura de compra.**

- Verifique que la factura haya sido creada mediante una **operación válida**, como: **factura de compra**, **gasto** o **compra de activos**.

- La operación creada corresponde a una **nota contable**, la cual no es compatible para realizar este tipo de asociación.

- La factura de compra o gasto **ya tiene asociada una pre operación anterior**.

- La factura de compra fue creada como **documento soporte para no obligados a facturar electrónicamente**, lo que implica que ya tuvo un movimiento y envío electrónico; por lo tanto, **no es posible asociar una pre operación posteriormente**.

Si después de realizar estas validaciones el proceso aún no es posible, te recomendamos **crear un tiquete de soporte**, adjuntando una breve descripción de lo ocurrido.

---

### ¿Cómo fijar la información del usuario que genera los eventos?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo puedo fijar la información del usuario para los eventos?  
- ¿Cómo configurar los datos del usuario que genera los eventos?  
- ¿Cómo hacer para que el usuario tenga su información predeterminada en los eventos?  
- ¿Cómo asignar la información del usuario para que salga automáticamente en los eventos?  
- ¿Dónde configuro los datos del usuario que genera los eventos?  
- ¿Cómo asociar un tercero a un usuario para generar eventos?  
- ¿Cómo configurar la identificación del usuario para los eventos?  
- ¿Cómo hacer que los datos del usuario se carguen automáticamente en los eventos?  
- ¿Cómo definir el correo y cargo del usuario en los eventos?  
- ¿Cómo enlazar el tercero con el usuario para generar eventos?  
- ¿Por qué no aparece la información del usuario en los eventos?  
- ¿Cómo predeterminar la información del usuario en el sistema?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para predeterminar la información del usuario que genera los eventos, es necesario que primero tenga creado el **tercero en el sistema con su identificación**, ya que este se enlaza con el usuario para que la información se cargue automáticamente.

A continuación, te explicamos cómo asociarlo:

**Ruta:**  
*Menú básico > Usuarios*

1. Selecciona el usuario que va a registrar los eventos con su información predeterminada.  
2. Presiona la opción **Modificar**.  
3. En el campo **Identificación**, registra el **código del tercero** correspondiente.  

Si deseas asignar también información como **correo electrónico** o **cargo**, puedes hacerlo desde la pestaña **Datos de usuario**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Edición de usuario:](https://www.contapyme.com/conocimientocontapyme/120_GA/registro_usuario.png)

Si después de realizar esta configuración la información del usuario no se refleja correctamente, te recomendamos **crear un tiquete de soporte**.

---

### ¿Qué hacer si al intentar descargar la factura recibida o generar un evento me indica que no cuento con saldo?

CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué me aparece que no tengo saldo al enviar un correo al buzón?  
- ¿Qué significa el mensaje que indica que no cuento con saldo disponible?  
- ¿Por qué no puedo generar un evento porque no tengo saldo?  
- ¿Cómo puedo verificar si tengo saldo disponible para eventos?  
- ¿Dónde reviso el saldo de documentos disponibles?  
- ¿Por qué no puedo descargar facturas porque no tengo saldo?  
- ¿Cómo saber si mi paquete de documentos ya se consumió?  
- ¿Qué debo hacer cuando el sistema indica que no hay saldo disponible?  
- Me aparece que no tengo saldo para enviar al buzón, ¿qué debo hacer?  
- ¿Cómo consultar el saldo de mi paquete electrónico?  
- ¿Por qué no me deja enviar eventos por falta de saldo?  
- ¿Cómo revisar si mi paquete de documentos está vencido?  
- ¿Dónde puedo validar el consumo de documentos electrónicos?  
- ¿Cómo saber si ya consumí todos mis documentos disponibles?  
- ¿Qué hago si el sistema indica que no tengo saldo disponible?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si estás generando un evento o intentando descargar una factura y el sistema muestra un mensaje indicando que **no cuentas con saldo disponible**, te recomendamos realizar las siguientes validaciones:

- Verificar el saldo de documentos desde ContaPyme

En ContaPyme, a través del **Explorador de consumos**, puedes revisar el saldo disponible y el paquete adquirido.

**Ruta:**  
*Menú básico > Sección Complementos > Consumos*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ruta explorador de consumos:](https://www.contapyme.com/conocimientocontapyme/120_GA/explorador_consumos.png)

- Verificar el saldo desde el portal de clientes

También puedes consultar el saldo desde el **portal de clientes**, ingresando a la sección de servicios electrónicos.

**Ruta:**  
*Portal clientes ContaPyme > Iniciar sesión > Pestaña Servicios electrónicos*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Verificar saldo desde portal clientes:](https://www.contapyme.com/conocimientocontapyme/120_GA/saldo_portal_cli.png)

Si al validar el saldo observas que **tu paquete se venció o ya fue consumido**, te recomendamos **comunicarte con el área comercial** o realizar la compra directamente a través de la **tienda ContaPyme**, para adquirir un nuevo paquete de documentos.

---


