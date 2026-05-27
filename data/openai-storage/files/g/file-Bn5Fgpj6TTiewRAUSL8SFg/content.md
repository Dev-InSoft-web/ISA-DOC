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

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si necesitas recibir una factura electrónica en ContaPyme y no cuentas con el archivo ZIP, puedes hacerlo de la siguiente manera:

1. Descarga el archivo **XML** directamente desde la DIAN.  
2. Ingresa a:  
   **Manejador de operaciones > Sección herramientas > Descargar FE recibidas > Importar XMLs de facturas electrónicas**  
3. Selecciona el archivo XML desde tu equipo.

📌 De esta forma podrás cargar la factura electrónica en el sistema sin necesidad del archivo ZIP.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Importar XMLs de facturas electrónicas:](https://www.contapyme.com/conocimientocontapyme/120_GA/importar_xml_fe.png)

---
## Documento de soporte
### Medio de pago inválido en documento de soporte
CANONICAL_ID: PF_GASTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- DSAN03a
- DSAN03b
- Tipo de medio de pago inválido
- PaymentMeansCode
- Tipo medio pago

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La regla DSAN03a en el documento soporte en adquisiciones a no obligados (según la Resolución 00167 de la DIAN y su anexo técnico) corresponde a una validación sobre el medio de pago.

🔎 **¿Qué valida exactamente la regla DSAN03a?**  
Aplica sobre el campo: PaymentMeansCode (código del medio de pago).  
La regla indica que:  
👉 El valor informado debe existir y ser válido según la tabla oficial de la DIAN (catálogo de medios de pago). Si el código del medio de pago no corresponde a un valor permitido o no se notifica, el documento será rechazado.  
El sistema ya cuenta con la tabla de tipos de medios de pago indicada por la DIAN, por lo tanto, solo debes seleccionar la opción de medio de pago que esté en el listado y se acomode al proceso comercial que estás registrando.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Registro de tipo de medio de pago](https://www.contapyme.com/conocimientocontapyme/080_IN/tipo_medio_pago.png)

Ten presente que dentro de cada operación puedes fijar un dato para que siempre se asuma este registro en el envío de un documento electrónico, esto ayuda si en la mayoría de los casos usas el mismo tipo de medio de pago.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Fijar el registro de tipo de medio de pago](https://www.contapyme.com/conocimientocontapyme/080_IN/fijar_tipo_medio_pago.png)