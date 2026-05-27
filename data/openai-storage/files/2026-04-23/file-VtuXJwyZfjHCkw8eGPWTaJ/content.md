# pf_facturacion.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **Facturación**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/11/14

# Facturación

## Facturación Electrónica - Envío y Procesamiento

### ¿Por qué no puedo emitir una factura electrónica?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cuáles son los pasos para generar facturación electrónica en ContaPyme?  
- ¿Cómo configuro ContaPyme para generar facturas electrónicas?
- ¿Qué se debe hacer para empezar con facturación electrónica?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Normalmente para emitir facturación electrónica debes cumplir con algunos pasos previos tanto en la DIAN como en el sistema ContaPyme, ya que así se confirma que tienes todo listo y aprobado para iniciar con el proceso de generación y transmisión de documentos electrónicos en formato XML ante la DIAN. 
A continuación te indicamos esos pasos:

**Pasos en la DIAN:**
1. **Regístrate como facturador electrónico** y cumple el proceso de **Habilitación**. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior accede por la opción: **Temas de interes > Factura electrónica > Habilitación.** 

    1.1 Selecciona en los modos de operación el proveedor tecnológico que usarás para el envío de documentos electrónicos tanto en ambiente de habilitación (pruebas) como en el ambiente de producción.

    1.2 Envía los documentos mínimos de prueba de habilitación requeridos por la DIAN para que quedes habilitado como facturador electrónico. *Desde el área de soporte técnico de InSoft te ayudamos con este proceso, solo tienes que generar un tiquete de soporte desde tu ContaPyme y un asesor te contactará para ayudarte en este proceso de manera ágil y automatizada.* 

2. **Genera una resolución de facturación electrónica** en el sistema MUISCA de la DIAN. Para esto ingresa a: https://www.dian.gov.co/ y en la parte superior izquierda ingresa al sistema MUISCA por alguna de las opciones: **Transaccional > Usuario registrado** o **Transaccional > Usuario nuevo.**

    2.1 Genera la resolución de facturación electrónica, para esto ingresa por: *Solicitar numeración de facturación.*
    
    2.2 Ingresa por la opción “Autorizar rangos” y registra el prefijo y rango de numeración para facturación electrónica. 

    2.3 Genera el formato borrador "1302" que la DIAN te presenta y luego fírmalo, allí se generará el formato "1876" que corresponde a la resolución de facturación electrónica.

3. **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

**Pasos en ContaPyme:**
1. Confirma que ya hiciste el proceso de adquisición del plan de documentos electrónicos ante InSoft.
2. Registra la información que indica el paso a paso de configuración del portal de clientes del sistema ContaPyme. Ingresa a: https://www.contapyme.com/portal-clientes/,  verifica que tienes la empresa registrada por la opción *Servicios electrónicos* y sigue los pasos que allí indica el portal.

    👉 Para orientarte mejor revisa el siguiente [Video: Pasos en portal de clientes de ContaPyme para vinculación de empresa con facturación electrónica](https://www.youtube.com/watch?v=OjYLK73UfMg)

3. Activa en el **Explorador gráfico de empresas** el servicio de *facturación electrónica.*
   
   👉 Para orientarte mejor revisa el siguiente [Video: Activación de facturación electrónica en explorador gráfico de empresas en ContaPyme](https://www.youtube.com/watch?v=guZZb1YI7wo)
4. Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución de facturación electrónica que generaste en la DIAN.  
   **Importante:** ContaPyme cuenta con un asistente especializado que permite descargar la resolución de la DIAN de manera automática, siempre y cuando los pasos en la DIAN (plataforma MUISCA y asociación prefijo por Facturando electrónicamente) estén realizado correctamente. Con este asistente podrás descargar las resoluciones que tengas asociadas al proveedor tecnológico con el que estás haciendo envío del documento electrónico.
     Recuerda que solo para facturación electrónica y documento de soporte en compras a no obligados, es que se registra ante la DIAN una resolución, por lo tanto, esta funcionalidad de usar el asistente para descarga de resoluciones solo aplica para dicho documentos electrónicos.

    La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
    ![Descarga automatizada de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/descargar_resolucion_automat.png)

    **Nota:** Verifica que tienes plenamente configurados los documentos de soporte en tu sistema:  
    - *Factura de venta electrónica:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  
    - *Nota débito electronica y nota crédito electronica:* Recuerda que estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.  
    - *Documento de soporte en compras a no obligados:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.


5. Confirma que desde tu licenciamiento y usuario, puedes acceder en el *manejador de operaciones* a las operaciones que permiten emitir facturación electrónica:

- **Ingresos:** Operación que permite facturar conceptos y/o servicios, es decir, que no tiene un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Ingresos?](https://www.youtube.com/watch?v=0gL6B41DqYo) 

- **Facturación y ventas:** Operación que permite facturar tanto servicios como productos, es decir, permite un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Facturación y ventas?](https://www.youtube.com/watch?v=AzYw6F-vLeM) 

6. Verifica que tienes asociado en la operación con la que emites facturación *(Ingresos o Facturación y Ventas)* el documento de soporte que ya tienes configurado con la información de la resolución que tramitaste ante la DIAN.

---


### ¿Por qué no me sale el proveedor tecnológico cuando voy a asociar los rangos en el portal de producción de la DIAN?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Por qué no puedo asociar al PT en el portal de la DIAN?  
- No me deja asociar rangos al proveedor
- No sale el proveedor tecnológico en el portal de producción
- No sale el proveedor tecnológico en portal facturando electronicamente

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para asociar el proveedor tecnológico en el portal DIAN - Facturando electrónicamente, debes garantizar que hiciste el registro en el portal DIAN - Habilitación con dicho proveedor tecnológico y cumpliste el proceso de habilitación con dicho proveedor tecnológico el cual pretendes asociar la resolución. 
A continuación te indicamos esos pasos:

**Pasos en la DIAN:**
1. **Realiza el registro como facturador electrónico** y cumple el proceso de **Habilitación** con el proveedor tecnológico que pretendes enviar documentos electrónicos en ambiente de producción. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior accede por la opción: **Temas de interes > Factura electrónica > Habilitación.** 

    1.1 Selecciona en los modos de operación el **proveedor tecnológico que usarás para el envío de documentos electrónicos tanto en ambiente de habilitación (pruebas) como en el ambiente de producción**.

    1.2 Envía los documentos mínimos de prueba de habilitación requeridos por la DIAN para que quedes habilitado como facturador electrónico. *Desde el área de soporte técnico de InSoft te ayudamos con este proceso, solo tienes que generar un tiquete de soporte desde tu ContaPyme y un asesor te contactará para ayudarte en este proceso de manera ágil y automatizada.* 

    👉 Para orientarte mejor con el proceso de Habilitación en el portal de la DIAN, puedes consultar el siguiente [Video: ¿Cómo realizar el proceso de registro y habilitación de facturación electrónica?](https://www.youtube.com/watch?v=T--3OUo_2PY)

2. **Genera una resolución de facturación electrónica** en el sistema MUISCA de la DIAN. Para esto ingresa a: https://www.dian.gov.co/ y en la parte superior izquierda ingresa al sistema MUISCA por alguna de las opciones: **Transaccional > Usuario registrado** o **Transaccional > Usuario nuevo.**

    2.1 Genera la resolución de facturación electrónica, para esto ingresa por: *Solicitar numeración de facturación.*
    
    2.2 Ingresa por la opción “Autorizar rangos” y registra el prefijo y rango de numeración para facturación electrónica. 

    2.3 Genera el formato borrador "1302" que la DIAN te presenta y luego fírmalo, allí se generará el formato "1876" que corresponde a la resolución de facturación electrónica.

3. **Asocia la nueva resolución al proveedor tecnológicocon el que hiciste el proceso de habilitación**. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

   👉 Para orientarte mejor con el proceso de asociación de prefijo en el portal de la DIAN, puedes consultar el siguiente [Video: ¿Cómo asociar prefijos en el portal DIAN de facturación electrónica?](https://www.youtube.com/watch?v=gTuONc98c2s)


---

### ¿Por qué no se puede enviar el documento electrónico a la DIAN aunque todo esté configurado?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué hago si la factura no se envía a la DIAN?  
- ¿Cómo soluciono problemas de envío de un documento electrónico?
- ¿La operación me genera un error y no permite enviarse a la DIAN?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Asegúrate de tener todo plenamente configurado tanto en la DIAN como en ContaPyme:

*DIAN:*

* Etapa de habilitación superada con éxito.
* Generación de resolución de facturación electrónica (formato 1876).
* Asociación de resolución al proveedor tecnológico.

*ContaPyme:*

* Plan de documentos electrónicos vigente y con saldo.
* Activación de facturación electrónica en el explorador gráfico de empresa.
* Configuración de resolución y acciones de envío en documentos electrónicos.
* Terceros con correo electrónico. 

Si ya verificaste la información anterior, revisa que tu computador tenga acceso a Internet y no tenga restricciones de conectividad generadas por algún software como antivirus o firewall.

Adicionalmente verifica que la DIAN, no haya publicado o notificado en sus redes sociales algún tipo de intermitencia o ventana de mantenimiento con los servicios electrónicos, que estén afectando el ambiente de producción para envíos y validaciones de los diferentes documentos electrónicos que se tienen que reportar a dicha entidad.

Por último, analiza si desde ContaPyme en el "Inspector de datos" se está notificando algún mensaje de error o rechazo que el proveedor tecnológico o la DIAN hayan indicado sobre las reglas de validación que la resolución de facturación electrónica y el anexo técnico indican.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de verificación de mensajes de error](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

Dependiendo del mensaje de rechazo, puedes revisar en la operación de venta la información de:

* *Tercero:* por si hace falta alguna información que se esté indicando como requerida.
* *Producto o servicio facturado:* por si hace falta configuración de algún dato como impuestos o tributos que se requieran calcular automáticamente dentro de la factura.
* *Impuestos:* por si se incluyó manualmente algún impuesto en la operación de venta y este no estaba configurado correctamente en el bien o servicio facturado.

#### 📌 Recursos adicionales 
- [Video: Generación del Set de pruebas](https://www.youtube.com/watch?v=-ScEeRbEjfs)  
- [Video: Generación de resolución de facturación electrónica](https://www.youtube.com/watch?v=cokfUixajsI)  
- [Video: Activación de facturación electrónica en la empresa](https://www.youtube.com/watch?v=guZZb1YI7wo) 
- [Video: Configuración documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc)
- [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

---

### ¿Qué hacer si la operación del documento electrónico queda en estado “0/3”, “1/3” o “2/3”?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué hacer si la operación del documento electrónico queda en estado “0/3”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “1/3”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “2/3”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “0/2”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “1/2”?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cada acción configurada en el "documento de soporte" que usas en la operación de venta, se ve reflejada como un conteo al momento de ejecutarse **0/3, 1/3 o 2/3**, si alguna de esas acciones no se ejecuta, el sistema lo notifica en el "Inspector de datos".

Ejemplo:

Supongamos que el documento usado para facturación electrónica tiene las siguientes configuraciones:

- Hace parte de facturación electrónica.
- Publicación en plataforma de documentos.
- Envío de email automático

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Imagen con acciones configuradas en el documento de soporte](https://www.contapyme.com/conocimientocontapyme/080_IN/Cfg_Acciones_Doc_Sop.png)

Si la operación está en 0/3, quiere decir, que ninguna de las acciones se ha ejecutado:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Operación sin acciones ejecutadas](https://www.contapyme.com/conocimientocontapyme/080_IN/Opr_sin_acciones_ejecutadas.png)

Ahora bien, si la operación está en estado 1/3 o 2/3 puedes mirar por el "Inspector de datos" cuál acción sí se ejecutó y cuál quedó pendiente. Allí mismo el sistema indicará si se presentó un error asociado a la validación del XML del documento electrónico y notificará el código o regla de rechazo que la DIAN informó.

Algunas veces puede pasar que se presente una intermitencia en la conexión de internet del equipo que está ejecutando las acciones y solo basta con volver a "Ejecutar acciones" de la operación para que se completen:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejecutar de nuevo acciones](https://www.contapyme.com/conocimientocontapyme/080_IN/Ejecutar_acciones.png)

---

### ¿Qué significa que la factura no ha sido aprobada por la DIAN? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo verifico si la factura presenta errores en el XML?
- ¿Dónde veo los errores de una factura electrónica?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Significa que la DIAN recibió el XML del documento y al ejecutar las validaciones que se reportan en el anexo técnico (actualmente versión 1.9 de la resolución 00165) encontró que no se cumple algún requerimiento técnico que se tiene marcado como obligatorio o de validación que genera **rechazo** si no se cumple con su estructura.

Ante esta situación, en el sistema se mostrará en el "Inspector de datos" el mensaje de error o rechazo que la DIAN está indicando.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de verificación de mensajes de error](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

Para solucionar esta situación, es muy importante tener en cuenta qué indica la regla de validación que genera el rechazo y según su información hacer el ajuste o corrección que implique.

---

### ¿Por qué la DIAN rechaza la factura electrónica? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Al momento de enviar un documento electrónico a la DIAN, dicha entidad genera una serie de validaciones (las cuales están registradas en el anexo técnico de facturación electrónica, actualmente versión 1.9 de la resolución 00165). En dicha resolución se encuentran más de 264 reglas que se tienen marcadas como de validación que genera **rechazo** si no se cumple con su estructura o contenido.

Esas validaciones pueden estar orientadas a información de:

* Datos de validación de información del emisor del documento electrónico.
* Datos de validación de información del receptor del documento electrónico.
* Datos de validación de la resolución notificada ante la DIAN en la emisión de la factura electrónica.
* Datos de validación de los valores calculados y reportados en el documento electrónico.
* Datos de validación de impuestos, tributos, cargos y descuentos notificados en el documento electrónico.
* Datos de validación relacionados con el producto o servicio facturado.

Por lo tanto, para solucionar esta situación, es muy importante tener en cuenta qué indica la regla de validación que genera el rechazo y según su información hacer el ajuste o corrección que implique bien sea:

* Del emisor, se revisa información en el explorador gráfico de empresas. Ruta de acceso en el sistema: **Menú Básico > Empresa.**
* Del receptor, se revisa información en el catálogo de terceros, puntualmente del tercero utilizado en la operación. Ruta de acceso en el sistema: **Menú Básico > Terceros.**
* De la resolución, se revisa información en el catálogo de documentos de soporte, puntualmente en la configuración del documentos de soporte usado en la factura electrónica. Ruta de acceso en el sistema: **Menú Básico > Doc. Soporte.**
* De los impuestos, tributos, productos o servicios se revisa información de los conceptos de liquidación o impuestos configurados en los productos, servicios o cuentas usadas en la factura de venta. 
  - Ruta de acceso en el sistema si es para cuentas: **Menú Contabilidad > Plan de cuentas.** 
  - Ruta de acceso en el sistema si es para productos y/o grupos de inventario: **Menú Inventarios > Grupos de inventario o elementos de inventario.** 
  - Y para ambos casos debes revisar la configuración de impuestos asociados, lo cual puedes hacer desde el **Menú Contabilidad > Plan de cuentas > Conceptos de liquidación en ingreso.**

Recuerda que el sistema mostrará en el "Inspector de datos" el mensaje de error o rechazo que la DIAN está indicando.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de verificación de mensajes de error](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)


---
### ¿Qué significa "Regla: 90, Rechazo: Documento procesado anteriormente" al enviar una factura electrónica?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué es documento procesado anteriormente?
- ¿La factura ya está en la DIAN pero no en el sistema?
- ¿Qué hacer si se indica Documento sin AttachedDocument?
- AttachedDocument del documento no fue encontrado.

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Este rechazo significa que la DIAN ya tiene información del documento electrónico que estás reportando y no acepta que se envíe nuevamente. 
Esta situación se puede presentar cuando la plataforma informática de la DIAN está con intermitencias o en una ventana de mantenimiento y envías una factura eletrónica, en algunos casos dicha entidad no responde de manera exitosa al primer envío del documento electrónico y se genera como respuesta un "Time Out" o tiempo de espera agotado, al cabo de unos minutos u horas, vuelves a intentar el envío del documento y se genera el mensaje "Regla: 90, Rechazo: Documento procesado anteriormente".  
Normalmente si la plataforma de la DIAN ya está estable y logró almacenar el documento en el primer envío, al hacer el reintento de envío del documento se obtiene una consulta del estado de dicha factura y queda almacenada correctamente en el sistema; pero si la plataforma de la DIAN no está estable o no logró almacenar en sus bases de datos toda la información completa del documento electrónico se hace necesario escalar un PQR o requerimiento técnico a dicha entidad para que internamente actualice el estado o información del documento, y cuando responda el caso escalado, se pueda en el próximo reenvío obtener una respuesta correcta con toda la información del XML validado.

Ten presente que el documento que estás enviando y generó este mensaje, lo puedes consultar directamente en la página de la DIAN, ingresando por https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** te logueas con tus datos y en la opción de facturas electrónicas emitidas o generadas, buscas el consecutivo o número de factura que pretendes enviar. 
Si confirmas que dicho documento ya está en los registros de la DIAN y aún así, cuando dices en el sistema ejecutar acciones no se completa el envío exitoso, puedes reportar mediante un tiquete al área de soporte de InSoft el caso con el CUFE o UUID de dicho documento para que te ayuden con posible actualización de este dato en la factura pendiente de emitir en el sistema o si es el caso, reportar la situación ante el proveedor tecnológico para que este a su vez, la escale ante la DIAN.

👉 Para orientarte mejor en la generación de un tiquete de soporte revisa el siguiente [Video: ¿Cómo generar un tiquete de soporte?](https://www.youtube.com/watch?v=E1j8_5oDJvc)

---

### ¿Qué hago si la factura electrónica aparece con errores? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué se hace con una factura con errores?
- Tengo error en una factura ¿qué hago?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si son errores relacionados con el envío del documento electrónico ante la DIAN, recuerda que el sistema mostrará en el "Inspector de datos" el mensaje de error o rechazo que la entidad está indicando.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de verificación de mensajes de error](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

Ten presente que al momento de enviar un documento electrónico a la DIAN, dicha entidad genera una serie de validaciones (las cuales están registradas en el anexo técnico de facturación electrónica, actualmente versión 1.9 de la resolución 00165). En esta resolución se encuentran más de 264 reglas que se tienen marcadas como de validación que genera **rechazo** si no se cumple con su estructura o contenido.

Esas validaciones pueden estar orientadas a información de:

* Datos de validación de información del emisor del documento electrónico.
* Datos de validación de información del receptor del documento electrónico.
* Datos de validación de la resolución notificada ante la DIAN en la emisión de la factura electrónica.
* Datos de validación de los valores calculados y reportados en el documento electrónico.
* Datos de validación de impuestos, tributos, cargos y descuentos notificados en el documento electrónico.
* Datos de validación relacionados con el producto o servicio facturado.

Por lo tanto, para solucionar esta situación, es muy importante tener en cuenta qué indica la regla de validación que genera el rechazo y según su información hacer el ajuste o corrección que implique bien sea:

* Del emisor, se revisa información en el explorador gráfico de empresas. Ruta de acceso en el sistema: **Menú Básico > Empresa**
* Del receptor, se revisa información en el catálogo de terceros, puntualmente del tercero utilizado en la operación. Ruta de acceso en el sistema: **Menú Básico > Terceros**
* De la resolución, se revisa información en el catálogo de documentos de soporte, puntualmente en la configuración del documentos de soporte usado en la factura electrónica. Ruta de acceso en el sistema: **Menú Básico > Doc. Soporte**
* De los impuestos, tributos, productos o servicios se revisa información de los conceptos de liquidación o impuestos configurados en los productos, servicios o cuentas usadas en la factura de venta. 
  - Ruta de acceso en el sistema si es para cuentas: **Menú Contabilidad > Plan de cuentas.** 
  - Ruta de acceso en el sistema si es para productos y/o grupos de inventario: **Menú Inventarios > Grupos de inventario o elementos de inventario.** 
  - Y para ambos casos debes revisar la configuración de impuestos asociados, lo cual puedes hacer desde el **Menú Contabilidad > Plan de cuentas > Conceptos de liquidación en ingreso.**


---

### ¿Qué hacer cuando el sistema indica “No se puede obtener la clave técnica”? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué es la clave técnica?
- ¿Quién genera la clave técnica?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La clave técnica es un código que emite la DIAN cuando el obligado a facturar genera la numeración o resolución de facturación en el sistema MUISCA.
La clave técnica corresponde a un conjunto de datos que la DIAN autoriza y entrega al obligado a facturar, asociados a: el número de autorización, el rango autorizado y la vigencia, que permiten obtener el contenido técnico y de control de la factura electrónica, esta clave técnica es usada para la validación de la factura electrónica ante los sistemas informáticos de la DIAN.

Por lo tanto, cuando se indica que "no se puede obtener la clave técnica", puede ser que tengas mal configurada la información de la resolución de facturación electrónica en el documento de soporte que estás usando para emitir facturas. Verifica que la misma información que tienes en el formato 1876 o resolución de facturación electrónica esté plenamente registrada en el documento de soporte de factura de venta electrónica.

Mira las siguiente imágenes de ejemplo:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Información de la resolución generada en la DIAN](https://www.contapyme.com/conocimientocontapyme/080_IN/Resolucion_Dian.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Registro de datos de la resolución en el documento de soporte en el sistema](https://www.contapyme.com/conocimientocontapyme/080_IN/Resolucion_CP.png)

Verifica también que en el portal DIAN tengas asociada la resolución al proveedor tecnológico, para esto **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación, ingresa a: https://www.dian.gov.co/ y en la parte inferior loguéate por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente**, una vez dentro del portal ingresa por la opción *Asociar prefijos* y asocia la información de la resolución al proveedor tecnológico que usas para emitir facturas electrónicas.  
Mira la siguiente imagen de ejemplo:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Asociación de prefijos o resolución al proveedor tecnológico](https://www.contapyme.com/conocimientocontapyme/080_IN/Asociar_Res_a_PT.png)

👉 Para orientarte mejor en la asociación de prefijos en el portal de la DIAN, puedes consultar el siguiente [Video: ¿Cómo asociar al proveedor tecnológico el prefijo o resolución de facturación electrónica?](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

---


### No estoy autorizado con Cadena para enviar documentos electrónicos 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- Envío documentos electrónicos con Cadena
- No autorizado con proveedor tecnológico Cadena

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Este mensaje generalmente indica que la autorización de numeración (la resolución) que estás utilizando no está correctamente vinculada al proveedor tecnológico o al sistema con el cual estás emitiendo el documento electrónico ante la DIAN.

**Causas comunes del mensaje**

1. **No estás habilitado con el proveedor tecnológico**: Debes garantizar que en el portal DIAN - Habilitación, pasaste las pruebas de habilitación con el proveedor tecnológico que estás tratando de enviar el documento electrónico.

2. **La resolución de facturación no se ha solicitado o autorizado**: Debes contar con una resolución de la DIAN para “Numeración de facturación electrónica” (formato 1876) que autoriza rangos de numeración, prefijos y vigencia, esto se hace directamente en el portal MUISCA de la DIAN. Si no tienes una resolución activa o la que usas está vencida, el sistema puede rechazar con ese mensaje.

3. **El prefijo/rango de numeración de la resolución no está asociado al proveedor tecnológico**: Una vez autorizada la numeración, debes asociar el prefijo/rango al proveedor tecnológico con el cual pretendes enviar los documentos electrónicos desde ContaPyme. Esto se hace directamente en el portal DIAN - Facturando electrónicamente.

4. **La resolución está vencida o los rangos se agotaron**: Si la resolución ya expiró o los rangos autorizados fueron todos usados, la DIAN ya no considera “válida” la autorización.

5. **La resolución existe pero no sincronizó correctamente en el sistema de facturación electrónica**: Puede que ya hayas hecho todos los pasos, pero por demoras de sincronización o errores de configuración, el sistema de la DIAN "Facturando electrónicamente" aún no “reconoce” la resolución que generaste en el portal MUISCA, en algunas ocasiones debes volver a asociarla.

📌 Recomendaciones

- Verifica que tienes registrada una resolución válida en el catálogo de documentos de soporte.
- Asegúrate de que el prefijo generado en la resolución esté asociado en la DIAN al proveedor tecnológico que vas a usar para emitir documentos electrónicos.
- Confirma que no estés usando un número fuera del rango autorizado ni una resolución vencida.
- Valida que la fecha y hora del computador que estás usando para transmitir el documento electrónico, esté correctamente configurada en zona horaria UTC-5 y la región sea Colombia.  
    La siguiente imagen corresponde a una imagen de la configuración regional y del idioma de un computador relacionada con este punto:  
    ![Configuración regional y del idioma en computador](https://www.contapyme.com/conocimientocontapyme/080_IN/config_regional_idioma.png)

---
## Notas Crédito y Débito

### ¿Cómo generar una nota crédito electrónica correctamente? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué es una nota crédito?
- ¿Cómo se emite una nota crédito?
- ¿Una devolución en venta es una nota crédito?
- ¿Cómo emitir una NC desde ContaPyme?
- ¿Cómo crear una nota crédito en el sistema?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Recuerda que una **nota crédito es un documento que anula parcial o totalmente una factura de venta electrónica**, la nota crédito al igual que una factura de venta también debe ser reportada electrónicamente a la DIAN, por lo tanto, es un documento que se debe configurar en el sistema para que sea transmitido en formato XML y validado por la DIAN.  
Dentro del sistema **dependiendo de cómo se haya generado la factura de venta electrónica (por operación de "Ingresos" o por operación de "Facturación y ventas" o por "Punto de venta - POS")**, se tienen asistentes especializados para generar dicha nota crédito.

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas o Punto de venta**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

---

### ¿Cómo anular una factura con nota crédito? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo se anula una factura de venta electrónica?
- ¿Se puede dar clic derecho anular a una factura electrónica?
- ¿Se puede anular una factura electrónica?
- ¿Se puede anular una operación de factura de venta?
- Me pueden ayudar por favor a anular una factura, no se como se hace.

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para anular una factura de venta electrónica, debes realizar una **nota crédito electrónica**, la nota crédito al igual que una factura de venta también debe ser reportada electrónicamente a la DIAN, por lo tanto, es un documento que se debe configurar en el sistema para que sea transmitido en formato XML y validado por la DIAN.  
Cuando realices la nota crédito, y relaciones en la operación, en el campo "Referencia" la factura que deseas anular, es muy importante que selecciones el motivo **Anulación de factura electrónica** ya que el reportar este motivo a la DIAN, dicha entidad entiende que se está anulando el CUFE (Código Único de Factura Electrónica) de la factura que se está notificando como referencia.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito con motivo **Anulación** a factura de venta generada desde la operación de **Ingresos**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ingresos.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito con motivo **Anulación** a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ventas.png)

Ten presente que dentro del sistema **dependiendo de cómo se haya generado la factura de venta electrónica (por operación de "Ingresos" o por operación de "Facturación y ventas")**, se tienen asistentes especializados para generar dicha nota crédito.

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

---

### ¿Qué hacer si la factura ya fue aceptada y necesito hacer nota crédito? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- Necesito hacer una nota crédito a una factura ¿cómo lo hago?
- ¿Puedo generar una nota crédito y no enviarla a la DIAN?
- ¿Cómo anulo una factura que ya tiene aceptación expresa?
- ¿Cómo genero una nota crédito a una factura con aceptación en la DIAN?
- Quisiera hacer nota crédito a una factura electrónica, sin embargo, el sistema me indica que no se puede ya que la factura fue aceptada.

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Ten presente que toda factura de venta se debe transmitir electrónicamente a la DIAN para su validación, por lo tanto, como dicha factura se encuentra en los sistemas de la DIAN, se hace necesario notificar electrónicamente a la DIAN dicha **nota crédito**.  La nota crédito al igual que una factura de venta también debe ser reportada electrónicamente a la DIAN, por lo tanto, es un documento que se debe configurar en el sistema para que sea transmitido en formato XML y validado por la DIAN.  
Cuando realices la nota crédito debes relacionar en la operación, en el campo **"Referencia"** la factura que deseas afectar y luego seleccionas el motivo de la nota crédito para que en los sistemas informáticos de la DIAN quede trazabilidad de dicho proceso.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ingresos.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ventas.png)

Ten presente que dentro del sistema **dependiendo de cómo se haya generado la factura de venta electrónica (por operación de "Ingresos" o por operación de "Facturación y ventas")**, se tienen asistentes especializados para generar dicha nota crédito.

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

**Ahora bien, si la factura ya tiene el evento de aceptación expresa, ¿cómo la anulo si la DIAN no lo permite?**  

Como la factura ya tiene el evento electrónico de **aceptación expresa o aceptación tácita**, la plataforma de la DIAN no permite que se le emita una nota crédito (sin importar el motivo de la nota crédito) a dicha factura, ya que al haberle realizado ese evento de aceptación, la factura electrónica se ha convertido en una **factura electrónica título de valor.**  
Por lo tanto, la única opción es que generes una **nota crédito electrónica SIN referencia a una factura**, para lo cual, será necesario que indiques el período (mes y año) que pretendes afectar con la nota crédito.  

Ten presente las siguientes consideraciones:
* Si en una nota crédito **indicas el motivo anulación de factura electrónica**, **se hace obligatorio que registres la "Referencia"** de la factura electrónica y **no necesitas indicar el período (mes y año)** de afectación de la nota crédito.  
Esta opción no la podrías usar para generar una nota crédito a una factura que ya fue aceptada.
* Si en una nota crédito **indicas un motivo "diferente" a anulación de factura electrónica**, **no se hace obligatorio que registres la "Referencia"** de la factura electrónica y **sí se hace obligatorio que indiques el período (mes y año)** de afectación de la nota crédito.  
Esta opción si la podrías usar para generar una nota crédito a una factura que ya fue aceptada.

Se debe configurar la operación para que no exija el campo referencia, lo haces siguiendo esta ruta: *Nota crédito de ventas o ingresos > Configurar operación > Datos maestros de la operación > Desmarcar campo **requerido*** 

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ejemplo de configuración de nota crédito para no exigir referencia:](https://www.contapyme.com/conocimientocontapyme/080_IN/[19050]no_exigir_ref_nc.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Ingresos**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Ing.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Venta.png)

---

### ¿Por qué no puedo generar o enviar una nota crédito a la DIAN? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Por qué no puedo generar o enviar una nota débito a la DIAN?
- Tengo inconvenientes con la transmisión de notas crédito y débito
- Devoluciones en ventas que no se quieren ir a la DIAN
- No se envían las notas crédito a la DIAN
- Notas no se envían a la DIAN.
- No puedo generar notas crédito
- No puedo generar notas débito

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Existen diferentes motivos por los cuales no puedes enviar una nota crédito a la DIAN, a continuación te los comento:

* En la operación que usas para la generación de la nota crédito (Nota crédito de ingresos, Nota crédito ventas, Devolución en ventas), no estás usando un documento de soporte configurado como electrónico. Al no tener el documento configurado como electrónico (implica activarle el manejo de facturación electrónica, relacionarlo con el proveedor tecnológico y activarlo como Tipo: Nota crédito electrónica), no se podrán ejecutar las acciones de envío del documento a la DIAN, generando una operación que afecta contabilidad o invetarios, pero sin transmisión electrónica.  
Ruta de acceso en el sistema para verificación de la configuración en los documentos de soporte: **Menú Básico > Doc. Soporte > Nota crédito electrónica.**

* No estás referenciando una factura válida (ya transmitida ante la DIAN) y puede ser, que primero tengas que reportar electrónicamente la factura para luego poder generarle la nota crédito.

* No cuentas con saldo vigente de documentos electrónicos (plan de documentos) contratado con InSoft (casa desarrolladora de ContaPyme / AgroWin).

* La DIAN al momento de validar el XML de la nota electrónica, detectó alguna inconsistencia la cual debes solucionar. Si son errores relacionados con el envío del documento electrónico ante la DIAN, recuerda que el sistema mostrará en el "Inspector de datos" el mensaje de error o rechazo que la entidad está indicando.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:   
![Ejemplo de verificación de mensajes de error](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

Ten presente que al momento de enviar un documento electrónico a la DIAN, dicha entidad genera una serie de validaciones (las cuales están registradas en el anexo técnico de facturación electrónica, actualmente versión 1.9 de la resolución 00165). En esta resolución se encuentran más de 264 reglas que se tienen marcadas como de validación que genera **rechazo** si no se cumple con su estructura o contenido.

Esas validaciones pueden estar orientadas a información de:

* Datos de validación de información del emisor del documento electrónico.
* Datos de validación de información del receptor del documento electrónico.
* Datos de validación de la resolución notificada ante la DIAN en la emisión de la factura electrónica.
* Datos de validación de los valores calculados y reportados en el documento electrónico.
* Datos de validación de impuestos, tributos, cargos y descuentos notificados en el documento electrónico.
* Datos de validación relacionados con el producto o servicio facturado.

Por lo tanto, para solucionar esta situación, es muy importante tener en cuenta qué indica la regla de validación que genera el rechazo y según su información hacer el ajuste o corrección que implique, bien sea:

* Del emisor, se revisa información en el explorador gráfico de empresas. Ruta de acceso en el sistema: **Menú Básico > Empresa**
* Del receptor, se revisa información en el catálogo de terceros, puntualmente del tercero utilizado en la operación. Ruta de acceso en el sistema: **Menú Básico > Terceros**
* De los impuestos, tributos, productos o servicios se revisa información de los conceptos de liquidación o impuestos configurados en los productos, servicios o cuentas usadas en la factura de venta. 
  - Ruta de acceso en el sistema si es para cuentas: **Menú Contabilidad > Plan de cuentas.** 
  - Ruta de acceso en el sistema si es para productos y/o grupos de inventario: **Menú Inventarios > Grupos de inventario o elementos de inventario.** 
  - Y para ambos casos debes revisar la configuración de impuestos asociados, lo cual puedes hacer desde el **Menú Contabilidad > Plan de cuentas > Conceptos de liquidación en ingreso.**

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

---


### No puedo enviar la primera nota a la DIAN

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- No puedo enviar la primera nota crédito a la DIAN
- No puedo enviar la primera nota débito a la DIAN
- Tengo inconvenientes con la transmisión de la primer nota
- No puedo generar la primer nota crédito
- No puedo generar la primer nota débito

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Existen diferentes motivos por los cuales no puedes enviar una nota a la DIAN, a continuación te los comento:

* En la operación que usas para la generación de la nota no estás usando un documento de soporte configurado como electrónico. Al no tener el documento configurado como electrónico (implica activarle el manejo de facturación electrónica, relacionarlo con el proveedor tecnológico y activarlo como Tipo: Nota crédito electrónica o Nota débito electrónica), no se podrán ejecutar las acciones de envío del documento a la DIAN, generando una operación que afecta contabilidad o inventarios, pero sin transmisión electrónica.  
Ruta de acceso en el sistema para verificación de la configuración en los documentos de soporte: **Menú Básico > Doc. Soporte > Nota crédito electrónica o Nota débito electrónica.**

* No estás referenciando una factura válida (ya transmitida ante la DIAN) y puede ser, que primero tengas que reportar electrónicamente la factura para luego poder generarle la nota.

* No cuentas con saldo vigente de documentos electrónicos (plan de documentos) contratado con InSoft (casa desarrolladora de ContaPyme / AgroWin).

* La DIAN al momento de validar el XML de la nota electrónica, detectó alguna inconsistencia la cual debes solucionar. Si son errores relacionados con el envío del documento electrónico ante la DIAN, recuerda que el sistema mostrará en el "Inspector de datos" el mensaje de error o rechazo que la entidad está indicando.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:   
![Ejemplo de verificación de mensajes de error](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

* Revisa que el consecutivo inicial de la nota sea diferente de cero (0), ya que así el sistema podrá detectar que es el primer envío con un consecutivo válido. Ten presente que para las notas crédito o débito, no es necesario generar ante la DIAN una resolución (que indique prefijos, vigencias y rangos), pero para la configuración en el sistema, si es necesario indicar que el consecutivo inicial sea mayor a cero.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:   
![Consecutivo inicial en NC](https://www.contapyme.com/conocimientocontapyme/080_IN/consec_notas.png)

Ten presente que al momento de enviar un documento electrónico a la DIAN, dicha entidad genera una serie de validaciones algunas de las cuales tiene marcadas como de validación que generan **rechazo** si no se cumple con su estructura o contenido.

Esas validaciones pueden estar orientadas a información de:

* Datos de validación de información del emisor del documento electrónico.
* Datos de validación de información del receptor del documento electrónico.
* Datos de validación de la resolución notificada ante la DIAN en la emisión de la factura electrónica.
* Datos de validación de los valores calculados y reportados en el documento electrónico.
* Datos de validación de impuestos, tributos, cargos y descuentos notificados en el documento electrónico.
* Datos de validación relacionados con el producto o servicio facturado.

Por lo tanto, para solucionar esta situación, es muy importante tener en cuenta qué indica la regla de validación que genera el rechazo y según su información hacer el ajuste o corrección que implique, bien sea:

* Del emisor, se revisa información en el explorador gráfico de empresas. Ruta de acceso en el sistema: **Menú Básico > Empresa**
* Del receptor, se revisa información en el catálogo de terceros, puntualmente del tercero utilizado en la operación. Ruta de acceso en el sistema: **Menú Básico > Terceros**
* De los impuestos, tributos, productos o servicios se revisa información de los conceptos de liquidación o impuestos configurados en los productos, servicios o cuentas usadas en la factura de venta. 
  - Ruta de acceso en el sistema si es para cuentas: **Menú Contabilidad > Plan de cuentas.** 
  - Ruta de acceso en el sistema si es para productos y/o grupos de inventario: **Menú Inventarios > Grupos de inventario o elementos de inventario.** 
  - Y para ambos casos debes revisar la configuración de impuestos asociados, lo cual puedes hacer desde el **Menú Contabilidad > Plan de cuentas > Conceptos de liquidación en ingreso.**

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

---

### ¿Qué significan las reglas LGC15 o LGC16? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- Regla LGC15
- Regla LGC16
- Nota crédito ya aceptada
- Nota débito ya aceptada

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Estas reglas son validaciones que realiza la DIAN respecto a envíos de notas crédito electrónicas o notas débito electrónicas, y se presentan cuando la factura que están referenciando ya se encuentra aceptada bien sea expresa o tácitamente.

Ten presente que dentro del sistema **dependiendo de cómo se haya generado la factura de venta electrónica (por operación de "Ingresos" o por operación de "Facturación y ventas")**, se tienen asistentes especializados para generar dichas notas.

**Si la factura ya tiene el evento de aceptación y sale la regla LGC15 (si es nota crédito) o LGC16 (si es nota débito), ¿qué debes hacer?**  

Como la factura ya tiene el evento electrónico de **aceptación expresa o aceptación tácita**, la plataforma de la DIAN no permite que se le emita una nota crédito o nota débito (sin importar el motivo de la nota) a dicha factura, ya que al haberle realizado ese evento de aceptación, la factura electrónica se ha convertido en una **factura electrónica título de valor.**  
Por lo tanto, la única opción es que generes una **nota crédito o débito electrónica SIN referencia a una factura**, para lo cual, será necesario que indiques el período (mes y año) que pretendes afectar con la nota.  

Ten presente las siguientes consideraciones:
* Si en una nota crédito que genera regla LGC15 **indicas el motivo anulación de factura electrónica**, **se hace obligatorio que registres la "Referencia"** de la factura electrónica y **no necesitas indicar el período (mes y año)** de afectación de la nota crédito. Esta opción no la podrías usar para generar una nota crédito a una factura que ya fue aceptada.


* Si en una nota crédito que genera regla LGC15 **indicas un motivo "diferente" a anulación de factura electrónica**, **no se hace obligatorio que registres la "Referencia"** de la factura electrónica y **sí se hace obligatorio que indiques el período (mes y año)** de afectación de la nota crédito. Esta opción si la podrías usar para generar una nota crédito a una factura que ya fue aceptada.   
Esta misma consideración aplica cuando pretendes realizar una nota débito a una factura que ya fue aceptada y te genera regla LGC16.

Las siguientes imágenes corresponden a la pantalla del sistema relacionada con este punto:  
![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Ingresos**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Ing.png)

![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Venta.png)

Tanto para hacer la nota crédito como la nota débito, sin referencia a una factura, debes entrar a la configuración de la operación y desmarcar la opción para que no exija el campo referencia, lo haces siguiendo esta ruta:   
*Nota crédito de ventas o ingresos > Configurar operación > Datos maestros de la operación > Desmarcar campo **requerido***    
*Nota débito de ventas o ingresos > Configurar operación > Datos maestros de la operación > Desmarcar campo **requerido***   

La siguiente imagen corresponde a la pantalla del sistema relacionada con la configuración este punto en una nota crédito. El mismo paso o proceso aplica para una nota débito:    
![Ejemplo de configuración de nota crédito para no exigir referencia:](https://www.contapyme.com/conocimientocontapyme/080_IN/[19050]no_exigir_ref_nc.png)

---

### ¿Cómo realizar una nota crédito sin factura asociada?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- Necesito hacer una nota crédito sin registrar una factura ¿cómo lo hago?
- ¿Cómo genero una nota crédito sin referenciar una factura?
- ¿Cómo genero una nota débito sin referenciar una factura?
- ¿Cómo realizar una nota débito sin factura asociada?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para realizar una nota crédito sin referencia a una factura, verifica en la configuración de la operación que el campo **Referencia no esté marcado como Requerido,** para que así el sistema no te genere un mensaje de error indicando que el campo referencia es obligatorio.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de ruta y verificación de configuración](https://www.contapyme.com/conocimientocontapyme/080_IN/Cfg_Ref_NC.png)

Ten presente las siguientes consideraciones al momento de generar una nota crédito sin referencia a una factura:  

* Si en una nota crédito **indicas el motivo anulación de factura electrónica**, **se hace obligatorio que registres la "Referencia"** de la factura electrónica y **no necesitas indicar el período (mes y año)** de afectación de la nota crédito.  
Esta opción no la podrías usar para generar una nota crédito sin referencia a una factura.  

* Si en una nota crédito **indicas un motivo "diferente" a anulación de factura electrónica**, **no se hace obligatorio que registres la "Referencia"** de la factura electrónica y **sí se hace obligatorio que indiques el período (mes y año)** de afectación de la nota crédito.  
Esta opción si la podrías usar para generar una nota crédito sin referencia a una factura.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Ingresos**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Ing.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Venta.png)

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

---

### ¿Qué significa el error “campo extensible no definido” al emitir una nota crédito?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué significa el error “campo extensible no definido” al emitir una nota débito?
- ¿Qué significa el error “campo extensible no definido”?
- Error “campo extensible no definido”

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Normalmente este mensaje corresponde al envío de una nota crédito que hace referencia a una factura electrónica que generaste con campos adicionales o extensibles.  
Por ejemplo:  
Cuando emites una factura electrónica tipo **"Transporte de carga"**, debes indicar información adicional que el ministerio de transporte requiere, como son: tipo de servicio, radicado RNDC, remesa, valor flete, cantidad, etc.   
Estos mismos datos los debes reportar en una nota crédito que generes a dicha factura, por lo tanto, si generas la nota crédito pero no indicas los campos extensibles, se podrá generar el mensaje de validación.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo campos extensibles en factura](https://www.contapyme.com/conocimientocontapyme/080_IN/ejemplo_campos_extensibles_FV.png)  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo campos extensibles en nota crédito](https://www.contapyme.com/conocimientocontapyme/080_IN/ejemplo_campos_extensibles_NC.png)


Ten presente las siguientes consideraciones:  

* Valida que el documento de soporte que estás usando para la emisión de la nota crédito, esté correctamente configurado en el catálogo de "documentos de soporte" ingresando por **Menú Básico > Doc. Soporte > Nota crédito electrónica.**

* Verifica que la factura electrónica no se haya reportado con campos adicionales o extensibles, y si es así, también repórtalos en la nota crédito en la cual estás llamando esa factura como referencia.

---

### ¿Cómo se corrige una nota crédito con base de IVA incorrecta?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- Nota con base de IVA incorrecto.
- ¿Qué hago si la nota tiene base de IVA mal?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para corregir una nota crédito con base de IVA incorrecto, lo primero que debes analizar es si estás en la última actualización del sistema, la cual puedes consultar y descargar desde el "Portal de clientes": (https://www.contapyme.com/portal-clientes/)

Luego analiza si la nota crédito fue o no enviada electrónicamente a la DIAN.

* Si la nota crédito **aún no la has enviado electrónicamente a la DIAN**, puedes ubicarte en la operación e indicar clic derecho > modificar, y allí dentro de la operación, en en el campo **"Referencia"** borra el código de la factura y vuélvela a cargar para que se recalculen todos los valores de nuevo, y confirma que los valores de impuestos estén correctos.   
También analiza que la información de la factura no haya tenido ninguna modificación manual de los datos luego de haberla enviado a la DIAN.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de nota crédito sin enviar a la DIAN y se puede modificar](https://www.contapyme.com/conocimientocontapyme/080_IN/nc_sin_enviar.png)


* Si la nota crédito **ya la enviaste electrónicamente a la DIAN**, puedes hacer alguna de estas opciones:


    **Opción 1.**   
      Crea una segunda nota crédito haciendo referencia a la factura, verificando que los valores base e impuesto estén correctamente calculados.  
      Envía electrónicamente a la DIAN este documento.  
      Anula en el manejador de operaciones del sistema ContaPyme la primera nota crédito que tiene los valores erróneos, para que no se afecte contablemente dos veces los estados financieros de la empresa.  
      Al tener la segunda nota crédito registrada y procesada en el sistema, tienes un registro ordenado en los inventarios y en la contabilidad, permitiendo consultar datos de impuestos para la próxima declaración de IVA. 

    **Opción 2.**   
      Crea y envía a la DIAN una nota débito electrónica usando como referencia la factura inicial, para que reverses el registro de la nota crédito notificada con valores erróneos.  
      Genera una segunda nota crédito electrónica con valores correctamente calculados.  
      Como tienes todas las notas procesadas en el sistema, se tiene un registro en los inventarios y en la contabilidad, permitiendo consultar datos de impuestos para la próxima declaración de IVA. 

    **Opción 3.**   
      Modifica la nota crédito inicial para recalcular valores base de impuesto.  
      Este documento modificado no se notifica nuevamente a DIAN. Al tener la nota crédito actualizada y procesada en el sistema, tienes un registro ordenado en los inventarios y en la contabilidad. Respecto a la declaración del IVA se debe analizar si los valores de la nota crédito con el inconveniente fueron incluidos en el formulario de declaración de IVA o no y proceder con hacer el ajuste respectivo para el próximo periodo a declarar. Esta opción se sugiere analizar en conjunto con el contador o revisor fiscal de la empresa y que otorgue o no su visto bueno. 


👉 Respecto a la declaración del IVA se debe analizar si los valores de la nota crédito con el inconveniente fueron incluidos en el formulario de declaración de IVA o no y proceder con hacer el ajuste respectivo para el próximo periodo a declarar.  

---

### ¿Se puede generar una nota crédito con fecha retroactiva?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Se puede emitir una nota débito con fecha retroactiva?
- ¿Cómo generar una nota crédito con fecha anterior a la actual?
- ¿Cómo generar una nota débito con fecha anterior a la actual?
- ¿Cómo se envía una nota crédito con fecha anterior?
- ¿Cómo se envía una nota débito con fecha anterior?
- ¿Qué pasa si hoy envío una nota crédito con fecha anterior?
- ¿Qué pasa si hoy envío una nota créddébito con fecha anterior?
- ¿Puedo generar una nota crédito con fecha del mes anterior?
- ¿Puedo generar una nota débito con fecha del mes anterior?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Según la normativa vigente en Colombia para facturación electrónica con DIAN, no existe una disposición clara que permita de forma general emitir una nota de crédito con fecha retroactiva respecto a la factura o al envío del documento a la DIAN, sin condiciones. 

**Lo que sí está regulado:**

- Las notas crédito (y débito) para facturación electrónica deben ser generadas, transmitidas y validadas según los procesos que establece la normativa (por ejemplo, Decreto 1625 de 2016, resolución DIAN 000042 de 2020, resolución DIAN 000165 de 2023, entre otras). 

- En el caso de notas crédito que anulan una factura electrónica, la nota debe referenciar claramente el número y la fecha de la factura que anula. 

- Según la Resolución DIAN 000165 de 2023 (y sus anexos técnicos vigentes) se indica que la fecha de emisión del documento electrónico debe coincidir con la fecha de firma electrónica del mismo.   
  Por ejemplo: “la fecha de emisión de la factura electrónica de venta debe ser igual a la fecha de la firma electrónica del documento”.

**Lo que NO está permitido o lo que genera restricción:**

- La restricción de que la fecha de generación/firma del documento electrónico coincida con fecha actual (o al menos no modifica libremente la fecha hacia atrás) genera que una fecha retroactiva quede en entredicho para notas crédito que deben tramitarse en el sistema antes de ciertos hitos de aceptación.

- En un concepto reciente se señala que una vez que existe “evento de aceptación (expresa o tácita)” de la factura, ya no se pueden generar notas crédito o débito a dicha factura. 


**Dado lo anterior, con la pregunta “¿Se puede generar una nota crédito con fecha retroactiva?”, la respuesta operativa sería:**

- Si “retroactiva” significa asignar una fecha anterior a la fecha de emisión/firma del documento electrónico, no sería conforme con la normativa actual que exige coherencia entre la fecha y el envío/firma, salvo que se trate de un ajuste contable interno y esté debidamente soportado en los registros del emisor, sin evadir obligaciones normativas.

- Si la nota crédito es para anular o ajustar una factura, sí debe referenciar la fecha de la factura pero la propia nota debe generarse y remitirse en términos normales conforme al proceso electrónico, sin que esta fecha quede arbitrariamente anterior al momento de generación/firma.

- Es importante revisar el momento de aceptación de la factura por el adquirente, porque una vez aceptada, la emisión de la nota podría estar limitada.

Ten presente que en el sistema la fecha de la operación o contabilización puede ser diferente a la fecha de envío y validación del documento electrónico, por ejemplo:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de envío de nota crédito con fecha diferente a la actual](https://www.contapyme.com/conocimientocontapyme/080_IN/ejemplo_fecha_envio_retroactivo.png)  

En la imagen se puede ver que la fecha del día es: 15/10/2025 y ese día se está creando la nota crédito, pero dentro de la operación están indicando que esa nota la desean registrar en la contabilidad el día 30/09/2025, es decir, el mes anterior a la fecha actual. Aunque la operación (nota crédito) quede registrada en la contabilidad el 30/09/2025, la fecha de notificación a la DIAN corresponde al día que están ejecutando la acción de envío del documento electrónico, que para este caso es la fecha actual: 15/10/2025, por lo tanto, esa es la misma fecha en la que la DIAN al recibir el documento lo validará.  
Según lo anterior, se puede concluir que la fecha de contabilización del documento quedó en el mes de septiembre (cumpliendo con los procesos reales de la contabilidad en la empresa), pero la fecha de emisión y validación DIAN en el mes de octubre (cumpliendo con el requerimiento normativo de fechas iguales en la emisión y firma del documento electrónico). 

---

## Configuración y Resolución DIAN
### ¿Por qué sale el mensaje “Resolución no asociada en la DIAN”?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- Error por resolución no asociada
- Asociar resolución en la DIAN
- Problemas con la resolución

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Este mensaje normalmente indica que la autorización de numeración (la resolución) que estás utilizando no está correctamente vinculada al proveedor tecnológico o al sistema con el cual estás emitiendo el documento electrónico ante la DIAN.

**Causas comunes del mensaje**

**1. La resolución de facturación no se ha solicitado o autorizado**
Antes de emitir facturas electrónicas, debes contar con una resolución de la DIAN para “Numeración de facturación electrónica” (formato 1876) que autoriza rangos de numeración, prefijos y vigencia. Si no tienes una resolución activa o la que usas está vencida, el sistema puede rechazar con ese mensaje. La generación de la resolución se realiza en el sistema MUISCA de la DIAN.

**2. El prefijo / rango de numeración de la resolución no está asociado al proveedor tecnológico**
Una vez autorizada la numeración, debes asociar el prefijo/rango al proveedor tecnológico con el cual pretendes enviar los documentos electrónicos desde ContaPyme, esto se hace directamente en el portal DIAN (Facturando electrónicamente) bajo la opción: “Asociar rangos de numeración”.  
Si ese paso no se realizó, cuando emitas una factura con ese prefijo el sistema ve que la resolución no está “asociada” y puede mostrar el mensaje.

**3. La resolución está vencida o los rangos se agotaron**
Si la resolución ya expiró (la vigencia indicada se venció) o los rangos autorizados fueron todos usados, la DIAN ya no considera “válida” la autorización y puede manifestar que la resolución no está asociada. También puede generarse cuando intentas usar un número fuera del rango autorizado “Desde/Hasta”. 

**4. La resolución existe pero no sincronizó correctamente en el sistema de facturación electrónica**
Puede que ya hayas hecho todos los pasos, pero por demoras de sincronización o errores de configuración (en ambiente de producción vs habilitación) el sistema de la DIAN aún no “reconoce” la resolución como asociada, generando el error, por lo tanto, en algunas ocasiones debes eliminar el formato 1876 (en el sistema MUISCA) y volverlo a generar, para luego volver a realizar el proceso de asociación de la resolución en la plataforma de la DIAN.

✅ Adicionalmente **¿qué puedes revisar en el sistema?**

- Verifica en el catálogo de documentos de soporte [Menú Básico > Doc. Soporte], que en el documento de soporte que estás usando para la emisión del documento electrónico, tengas registrada una resolución válida (número de formulario 1876, fecha de vigencia, prefijo, rango “Desde/Hasta”) emitida por la DIAN.

- Verifica en el catálogo de documentos de soporte [Menú Básico > Doc. Soporte], que en el documento de soporte que estás usando para la emisión del documento electrónico,  tengas registrado el mismo prefijo generado en la resolución (formato 1876) y que esté asociado en la DIAN al proveedor tecnológico que vas a usar para emitir documentos electrónicos.

- Verifica que no estés usando un número fuera del rango autorizado (“Desde” / “Hasta”) ni una resolución vencida.

- En caso de migración o cambio de proveedor tecnológico, verifica que la resolución haya sido actualizada o que la configuración esté asociada al nuevo proveedor tecnológico antes de emitir facturas.  
  Nota:  
  Ten presente que con el proveedor tecnológico Cenet, debes realizar un proceso adicional de **"Sincronizar resolución"** en el portal: https://www.misfacturas.com.co/

 👉 Para orientarte mejor puedes revisar los siguientes 
 #### 📌 Recursos adicionales 
- [Video: Generación de resolución de facturación electrónica](https://www.youtube.com/watch?v=cokfUixajsI)  
- [Video: Activación de facturación electrónica en la empresa](https://www.youtube.com/watch?v=guZZb1YI7wo) 
- [Video: Configuración documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc)
- [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

---

### ¿Cómo actualizar la resolución y asociarla en la DIAN?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo cambio la resolución en la DIAN?
- ¿Qué debo hcer para actualizar la resolución?
- ¿Cuáles son los pasos para cambiar una resolución?
- ¿Cuáles son los pasos para renovar una resolución?
- ¿Cómo actualizo la resolución de facturación electrónica?
- Actualizar resolución
- Resolución vencida

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para actualizar la resolución de facturación electrónica y asociarla al proveedor tecnológico sigue los siguientes pasos: 

**Pasos en la DIAN:**
1. **Genera o actualiza la resolución de facturación electrónica** en el sistema MUISCA de la DIAN. Para esto ingresa a: https://www.dian.gov.co/ y en la parte superior izquierda ingresa al sistema MUISCA por alguna de las opciones: **Transaccional > Usuario registrado** o **Transaccional > Usuario nuevo.**

    1.1 Genera la resolución de facturación electrónica, para esto ingresa por: *Solicitar numeración de facturación.*
    
    1.2 Ingresa por la opción “Autorizar rangos” y registra el prefijo y rango de numeración para facturación electrónica. 

    1.3 Genera el formato borrador "1302" que la DIAN te presenta y luego fírmalo, allí se generará el formato "1876" que corresponde a la resolución de facturación electrónica.

2. **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

**Pasos en ContaPyme:**
1. Confirma que ya hiciste el proceso de adquisición del plan de documentos electrónicos ante InSoft.
2. Confirma que ya registraste la información que indica el paso a paso de configuración del portal de clientes del sistema ContaPyme. Ingresa a: https://www.contapyme.com/portal-clientes/, verifica que tienes la empresa registrada por la opción *Servicios electrónicos* y sigue los pasos que allí indica el portal.

    👉 Para orientarte mejor revisa el siguiente [Video: Pasos en portal de clientes de ContaPyme para vinculación de empresa con facturación electrónica](https://www.youtube.com/watch?v=OjYLK73UfMg)

3. Verifica que tienes activo en el **Explorador gráfico de empresas** el servicio de *facturación electrónica.*
   
   👉 Para orientarte mejor revisa el siguiente [Video: Activación de facturación electrónica en explorador gráfico de empresas en ContaPyme](https://www.youtube.com/watch?v=guZZb1YI7wo)

4. Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución de facturación electrónica que generaste en los pasos de la DIAN.

 **Importante:** ContaPyme cuenta con un asistente especializado que permite descargar la resolución de la DIAN de manera automática, siempre y cuando los pasos en la DIAN (plataforma MUISCA y asociación prefijo por Facturando electrónicamente) estén realizado correctamente. Con este asistente podrás descargar las resoluciones que tengas asociadas al proveedor tecnológico con el que estás haciendo envío del documento electrónico.
 Recuerda que solo para facturación electrónica y documento de soporte en compras a no obligados, es que se registra ante la DIAN una resolución, por lo tanto, esta funcionalidad de usar el asistente para descarga de resoluciones solo aplica para dicho documentos electrónicos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Descarga automatizada de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/descargar_resolucion_automat.png)

**Nota:** Verifica que tienes plenamente configurados los documentos de soporte en tu sistema:  
    - *Factura de venta electrónica:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  
    - *Nota débito electronica y nota crédito electronica:* Recuerda que estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.  
    - *Documento de soporte en compras a no obligados:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.   

5. Confirma que desde tu licenciamiento y usuario, puedes acceder en el *manejador de operaciones* a las operaciones que permiten emitir facturación electrónica:

- **Ingresos:** Operación que permite facturar conceptos y/o servicios, es decir, que no tiene un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Ingresos?](https://www.youtube.com/watch?v=0gL6B41DqYo) 

- **Facturación y ventas:** Operación que permite facturar tanto servicios como productos, es decir, permite un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Facturación y ventas?](https://www.youtube.com/watch?v=AzYw6F-vLeM) 

6. Verifica que tienes asociado en la operación con la que emites facturación *(Ingresos o Facturación y Ventas)* el documento de soporte que ya tienes configurado con la información de la resolución que tramitaste ante la DIAN.


 👉 Para orientarte mejor puedes revisar los siguientes #### 📌 Recursos adicionales 
- [Video: Generación de resolución de facturación electrónica](https://www.youtube.com/watch?v=cokfUixajsI)  
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)
- [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)

 👉 Ten presente que directamente en el sistema puedes consultar la guía de montaje que explica paso a paso, cómo actualizar o renovar la resolución de facturación electrónica:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Guía de montaje para cambio o actualización de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/guia_cambio_resoluciones.png) 

---

### ¿Qué hacer si se vence la resolución y no puedo facturar?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo actualizo una resolución vencida?
- ¿Puedo facturar sin resolución vigente?
- No puedo facturar pues la resolución se venció
- Solicitar resolución nueva

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Se debe tener presente que el vencimiento de la resolución y el no haberla actualizado o renovado a tiempo, no se considera como una contingencia, por lo tanto, para esta situación emitir facturas bajo la resolución de contingencia (talonario o papel) no es un práctica aceptada por la DIAN.

Teniendo presente el comentario anterior, es importante actualizar o renovar la resolución de facturación para evitar contratiempos en el proceso de facturación.
A continuación te indico los pasos para actualizar la resolución de facturación electrónica:

**Pasos en la DIAN:**
1. **Genera o actualiza la resolución de facturación electrónica** en el sistema MUISCA de la DIAN. Para esto ingresa a: https://www.dian.gov.co/ y en la parte superior izquierda ingresa al sistema MUISCA por alguna de las opciones: **Transaccional > Usuario registrado** o **Transaccional > Usuario nuevo.**

    1.1 Genera la resolución de facturación electrónica, para esto ingresa por: *Solicitar numeración de facturación.*
    
    1.2 Ingresa por la opción “Autorizar rangos” y registra el prefijo y rango de numeración para facturación electrónica. 

    1.3 Genera el formato borrador "1302" que la DIAN te presenta y luego fírmalo, allí se generará el formato "1876" que corresponde a la resolución de facturación electrónica.

2. **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

**Pasos en ContaPyme:**
1. Confirma que ya hiciste el proceso de adquisición del plan de documentos electrónicos ante InSoft.
2. Confirma que ya registraste la información que indica el paso a paso de configuración del portal de clientes del sistema ContaPyme. Ingresa a: https://www.contapyme.com/portal-clientes/, verifica que tienes la empresa registrada por la opción *Servicios electrónicos* y sigue los pasos que allí indica el portal.

    👉 Para orientarte mejor revisa el siguiente [Video: Pasos en portal de clientes de ContaPyme para vinculación de empresa con facturación electrónica](https://www.youtube.com/watch?v=OjYLK73UfMg)

3. Verifica que tienes activo en el **Explorador gráfico de empresas** el servicio de *facturación electrónica.*
   
   👉 Para orientarte mejor revisa el siguiente [Video: Activación de facturación electrónica en explorador gráfico de empresas en ContaPyme](https://www.youtube.com/watch?v=guZZb1YI7wo)

4. Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución de facturación electrónica que generaste en los pasos de la DIAN.

**Importante:** ContaPyme cuenta con un asistente especializado que permite descargar la resolución de la DIAN de manera automática, siempre y cuando los pasos en la DIAN (plataforma MUISCA y asociación prefijo por Facturando electrónicamente) estén realizado correctamente. Con este asistente podrás descargar las resoluciones que tengas asociadas al proveedor tecnológico con el que estás haciendo envío del documento electrónico.
 Recuerda que solo para facturación electrónica y documento de soporte en compras a no obligados, es que se registra ante la DIAN una resolución, por lo tanto, esta funcionalidad de usar el asistente para descarga de resoluciones solo aplica para dicho documentos electrónicos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Descarga automatizada de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/descargar_resolucion_automat.png)

**Nota:** Verifica que tienes plenamente configurados los documentos de soporte en tu sistema:  
    - *Factura de venta electrónica:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  
    - *Nota débito electronica y nota crédito electronica:* Recuerda que estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.  
    - *Documento de soporte en compras a no obligados:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  

 👉 Para orientarte mejor revisa el siguiente [Video: Configuración de documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc) 

5. Verifica que tienes asociado en la operación con la que emites facturación *(Ingresos o Facturación y Ventas)* el documento de soporte que ya tienes configurado con la información de la resolución que tramitaste ante la DIAN.

 👉 Para orientarte mejor puedes revisar los siguientes #### 📌 Recursos adicionales 
- [Video: Generación de resolución de facturación electrónica](https://www.youtube.com/watch?v=cokfUixajsI)  
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)
- [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)

 👉 Ten presente que directamente en el sistema puedes consultar la guía de montaje que explica paso a paso, cómo actualizar o renovar la resolución de facturación electrónica:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Guía de montaje para cambio o actualización de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/guia_cambio_resoluciones.png) 

---

### ¿Cómo registrar la resolución de facturación electrónica en el sistema? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- Pasos para registrar la resolución de facturación electrónica
- Guía para registrar la resolución en el sistema
- Registrar resolución de documento de soporte
- Sincronizar resolución de la DIAN
- Configurar resolución en ContaPyme
- ¿Cómo registrar resolución por primera vez?
- ¿Cómo ingresar nueva resolución?


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para registrar por primera vez la resolución de facturación electrónica o de documento de soporte en compras a no obligados, sigue los siguientes pasos: 

**Pasos en la DIAN:**
1. **Genera o actualiza la resolución de facturación electrónica** en el sistema MUISCA de la DIAN. Para esto ingresa a: https://www.dian.gov.co/ y en la parte superior izquierda ingresa al sistema MUISCA por alguna de las opciones: **Transaccional > Usuario registrado** o **Transaccional > Usuario nuevo.**

    1.1 Genera la resolución de facturación electrónica, para esto ingresa por: *Solicitar numeración de facturación.*
    
    1.2 Ingresa por la opción “Autorizar rangos” y registra el prefijo y rango de numeración para facturación electrónica. 

    1.3 Genera el formato borrador "1302" que la DIAN te presenta y luego fírmalo, allí se generará el formato "1876" que corresponde a la resolución de facturación electrónica.

2. **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

**Pasos en ContaPyme:**
1. Confirma que ya hiciste el proceso de adquisición del plan de documentos electrónicos ante InSoft.
2. Confirma que ya registraste la información que indica el paso a paso de configuración del portal de clientes del sistema ContaPyme. Ingresa a: https://www.contapyme.com/portal-clientes/, verifica que tienes la empresa registrada por la opción *Servicios electrónicos* y sigue los pasos que allí indica el portal.

    👉 Para orientarte mejor revisa el siguiente [Video: Pasos en portal de clientes de ContaPyme para vinculación de empresa con facturación electrónica](https://www.youtube.com/watch?v=OjYLK73UfMg)

3. Verifica que tienes activo en el **Explorador gráfico de empresas** el servicio de *facturación electrónica.*
   
   👉 Para orientarte mejor revisa el siguiente [Video: Activación de facturación electrónica en explorador gráfico de empresas en ContaPyme](https://www.youtube.com/watch?v=guZZb1YI7wo)

4. Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución de facturación electrónica que generaste en los pasos de la DIAN.

**Importante:** ContaPyme cuenta con un asistente especializado que permite descargar la resolución de la DIAN de manera automática, siempre y cuando los pasos en la DIAN (plataforma MUISCA y asociación prefijo por Facturando electrónicamente) estén realizado correctamente. Con este asistente podrás descargar las resoluciones que tengas asociadas al proveedor tecnológico con el que estás haciendo envío del documento electrónico.
 Recuerda que solo para facturación electrónica y documento de soporte en compras a no obligados, es que se registra ante la DIAN una resolución, por lo tanto, esta funcionalidad de usar el asistente para descarga de resoluciones solo aplica para dicho documentos electrónicos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Descarga automatizada de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/descargar_resolucion_automat.png)

**Nota:** Verifica que tienes plenamente configurados los documentos de soporte en tu sistema:  
    - *Factura de venta electrónica:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  
    - *Nota débito electronica y nota crédito electronica:* Recuerda que estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.  
    - *Documento de soporte en compras a no obligados:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  


    👉 Para orientarte mejor revisa el siguiente [Video: Configuración de documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc) 

5. Confirma que desde tu licenciamiento y usuario, puedes acceder en el *manejador de operaciones* a las operaciones que permiten emitir facturación electrónica:

- **Ingresos:** Operación que permite facturar conceptos y/o servicios, es decir, que no tiene un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Ingresos?](https://www.youtube.com/watch?v=0gL6B41DqYo) 

- **Facturación y ventas:** Operación que permite facturar tanto servicios como productos, es decir, permite un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Facturación y ventas?](https://www.youtube.com/watch?v=AzYw6F-vLeM) 

6. Verifica que tienes asociado en la operación con la que emites facturación *(Ingresos o Facturación y Ventas)* el documento de soporte que ya tienes configurado con la información de la resolución que tramitaste ante la DIAN.


 👉 Para orientarte mejor puedes revisar los siguientes #### 📌 Recursos adicionales 
- [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)

 👉 Ten presente que directamente en el sistema puedes consultar la guía de montaje que explica paso a paso, cómo actualizar o renovar la resolución de facturación electrónica:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Guía de montaje para cambio o actualización de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/guia_cambio_resoluciones.png) 

---
### ¿Cómo actualizar la resolución de facturación electrónica en el sistema? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo actualizo la resolución en ContaPyme?
- ¿Cómo actualizo la resolución en AgroWin?
- Pasos para actualizar la resolución de facturación electrónica
- Guía para actualizar la resolución en el sistema
- Actualizar resolución de documento de soporte
- Sincronizar resolución de la DIAN
- ¿Cómo actualizar resolución?
- Renovar la resolución en el sistema

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para actualizar en el sistema la resolución de facturación electrónica o de un documento de soporte en adquisiciones a no obligados y asumiendo que ya hiciste todos los pasos previos en la DIAN (por sistema MUISCA generar la resolución y por sistema Facturando electrónicamente asociarla al proveedor tecnológico), sigue los siguientes pasos: 

Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución del documento electrónico que generaste en los pasos de la DIAN.

**Importante:** ContaPyme cuenta con un asistente especializado que permite descargar la resolución de la DIAN de manera automática, siempre y cuando los pasos en la DIAN (plataforma MUISCA y asociación prefijo por Facturando electrónicamente) estén realizado correctamente. Con este asistente podrás descargar las resoluciones que tengas asociadas al proveedor tecnológico con el que estás haciendo envío del documento electrónico.
 Recuerda que solo para facturación electrónica y documento de soporte en compras a no obligados, es que se registra ante la DIAN una resolución, por lo tanto, esta funcionalidad de usar el asistente para descarga de resoluciones solo aplica para dicho documentos electrónicos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Descarga automatizada de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/descargar_resolucion_automat.png)

**Nota:** Verifica que tienes plenamente configurados los documentos de soporte en tu sistema:  
    - *Factura de venta electrónica:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  
    - *Nota débito electronica y nota crédito electronica:* Recuerda que estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.  
    - *Documento de soporte en compras a no obligados:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.


 👉 Para orientarte mejor puedes revisar los siguientes #### 📌 Recursos adicionales 
- [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)

 👉 Ten presente que directamente en el sistema puedes consultar la guía de montaje que explica paso a paso, cómo actualizar o renovar la resolución de facturación electrónica:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Guía de montaje para cambio o actualización de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/guia_cambio_resoluciones.png) 


---

### ¿Cómo asociar correctamente la resolución con el prefijo autorizado? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo asociar resolución y prefijo en la DIAN?
- ¿Cómo asociar el prefijo de factura en la DIAN?
- ¿Cómo registro la resolución al proveedor tecnológico?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Una vez generada la resolución en el portal MUISCA de la DIAN, el paso a seguir es asociar dicha resolución con el proveedor tecnológico que estás usando para enviar los documentos electrónicos.  

**Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación.  
Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

👉 Para orientarte mejor puedes revisar el siguiente   
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

#### 📌 Recursos adicionales
- [Video: Generación de resolución de facturación electrónica](https://www.youtube.com/watch?v=cokfUixajsI)  


**También recuerda estos pasos en ContaPyme:**

Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución de facturación electrónica que generaste en los pasos de la DIAN.

**Importante:** ContaPyme cuenta con un asistente especializado que permite descargar la resolución de la DIAN de manera automática, siempre y cuando los pasos en la DIAN (plataforma MUISCA y asociación prefijo por Facturando electrónicamente) estén realizado correctamente. Con este asistente podrás descargar las resoluciones que tengas asociadas al proveedor tecnológico con el que estás haciendo envío del documento electrónico.
 Recuerda que solo para facturación electrónica y documento de soporte en compras a no obligados, es que se registra ante la DIAN una resolución, por lo tanto, esta funcionalidad de usar el asistente para descarga de resoluciones solo aplica para dicho documentos electrónicos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Descarga automatizada de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/descargar_resolucion_automat.png)

**Nota:** Verifica que tienes plenamente configurados los documentos de soporte en tu sistema:  
    - *Factura de venta electrónica:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  
    - *Nota débito electronica y nota crédito electronica:* Recuerda que estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.  
    - *Documento de soporte en compras a no obligados:* Contenga la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.  

 👉 Para orientarte mejor revisa los siguientes vídeos:
 
  - [Video: Configuración de documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc) 

  - [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)

 👉 Ten presente que directamente en el sistema puedes consultar la guía de montaje que explica paso a paso, cómo actualizar o renovar la resolución de facturación electrónica:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Guía de montaje para cambio o actualización de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/guia_cambio_resoluciones.png) 

---

### ¿Qué documentos debo adjuntar para habilitar una nueva resolución?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cuáles son los documentos para generar una nueva resolución?
- Documentación para habilitar resolución

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para habilitar una nueva resolución de facturación electrónica ante la DIAN, no necesitas adjuntar documentos físicos ni digitalizados como en los antiguos trámites presenciales, todo el proceso se hace en línea a través del portal MUISCA o del servicio informático electrónico de facturación, dependiendo del caso.

Sin embargo, la primera vez se recomienda confirmar que tengas el RUT actualizado con la responsabilidad “52 – Facturador electrónico” activa, si no aparece, debes actualizar el RUT con dicha responsabilidad directamente en el portal MUISCA.

**Proceso resumido para habilitar una nueva resolución**

- Ingresa al portal MUISCA → Facturación → Numeración de facturación.

- Solicita la nueva resolución: diligencia tipo de facturación, prefijo, rango, vigencia, etc.

- Espera aprobación DIAN (generalmente inmediata si todo está correcto).

- Asocia la resolución al proveedor tecnológico en el servicio de facturación electrónica.

- Comienza a emitir facturas dentro del nuevo rango aprobado.

#### 📌 Recursos adicionales 
 
- [Video: Generación de resolución de facturación electrónica](https://www.youtube.com/watch?v=cokfUixajsI)  
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

 👉 Ten presente que directamente en el sistema puedes consultar la guía de montaje que explica paso a paso, cómo actualizar o renovar la resolución de facturación electrónica:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Guía de montaje para cambio o actualización de resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/guia_cambio_resoluciones.png) 

---

### ¿Qué hacer si, después de asociar la nueva resolución, no se puede facturar?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Qué hago si ya asocié una nueva resolución y no puedo facturar?
- Ya asocié la nueva resolución pero no puedo facturar ¿qué hago?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Esto eventualmente puede ocurrir, cuando la DIAN aprueba la resolución (en el portal MUISCA) y se asocia en el servicio informático (portal FACTURANDO ELECTRÓNICAMENTE), pero no se reconoce como vigente o válida para emitir facturas.

**1. Verifica que la resolución esté en estado “Activa”** 

- En el portal de Facturación Electrónica DIAN (menú Numeración de facturación → Consultar numeraciones).
- Confirma que aparezca el estado: “Activa” y no “Pendiente de asociación” o “Inactiva”.
- Si aparece “Pendiente de asociación”, significa que:

    - No se terminó correctamente la asociación con el Software ID del proveedor tecnológico, o

    - El registro se guardó con error.  
✅ Solución: Reasocia el rango en el módulo “Asociar numeraciones a software” y guarda nuevamente.


**2. Verifica la asociación con el Software ID correcto**

Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente,** ingresa por la opción *Gestionar asociación de prefijos.* 

Verifica:

 - Que el Software ID sea el mismo que usa tu proveedor tecnológico. 
 - Que el prefijo y los rangos coincidan con los aprobados.
 - Que el modo de operación sea “Proveedor tecnológico”.  

    ✅ Solución: Si hay inconsistencias, elimina la asociación y vuelve a crearla.

👉 Para que tengas toda la información clara, visualiza el siguiente vídeo:  
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

**3. Confirma que la resolución esté dentro de su vigencia**

En el portal MUISCA, revisa las fechas “Desde” y “Hasta” de la resolución.

 - Si la fecha “Desde” aún no ha llegado, el sistema no permite facturar.

    ✅ Solución: Ajusta la fecha de inicio de numeración (si se creó con error) o solicita una nueva resolución con fecha vigente.


**4. Verifica que el proveedor tecnológico tenga actualizada tu configuración**

Este paso aplica si usas el proveedor tecnológico CENET o TFHKA, con el proveedor CADENA no es necesario realizar este paso ya que dicho proveedor no posee un portal empresarial adicional.  
Pasos:

 - Ingresa al portal del proveedor tecnológico con tu usuario y contraseña, si no sabes cuál es, puede generar un tiquete al área de soporte de InSoft para que te ayuden con dicha información.
 - Verifica que en dicho portal tengas registrados los nuevos datos de la resolución, si no los tienes, crea los secuenciales o sincroniza la resolución para que todo quede alienado a los nuevos datos que registraste en la DIAN.

    ✅ Solución:

    - Entra al portal del proveedor.
    - Busca “Configuración de numeración”, “Resoluciones DIAN” o "Secuenciales".
    - Crea o activa la nueva numeración, ingresando:
       - Prefijo
       - Número inicial y final
       - Fecha de inicio y fin
       - Número de resolución DIAN
    - Guarda y activa la serie antes de emitir.

**5. Si nada de lo anterior funciona**

Se recomienda generar un tiquete de atención al área de soporte de InSoft, anexando la siguiente información:

  - NIT del facturador.
  - Copia de la resolución generada en la DIAN.
  - Pantallazo o imagen de asociación de la resolución al proveedor tecnológico.
  - Fecha y hora del intento de facturación.
  - Pantallazo del mensaje de notificación o error al momento de emitir la factura.

Con esta información, un asesor experto del área de soporte te contactará para revisar por asistencia remota el proceso y los demás mensajes de validación que se generen.

---

### ¿Por qué aparece un mensaje de vencimiento si ya hay una nueva resolución?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Normalmente el mensaje corresponde a un comentario del sistema para advertirte o recordarte que la resolución que actualmente estás usando está próxima a vencerse.

**¿Por qué puede vencerse una resolución?**
Una resolución puede vencerse por 2 motivos:

1. Los consecutivos (Inicial/Final), están próximos a llegar a un número máximo autorizado.
2. Las fechas de vigencia (Inicial/Final), están próximas a llegar al límite final permitido.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de mensaje de vigencia de resoluciones](https://www.contapyme.com/conocimientocontapyme/080_IN/doc_soporte_varias_resoluciones.png)  

En la imagen anterior, puedes ver que el sistema genera notificación respecto al consecutivo final de la primera resolución (que es la que se está usando, ya que el número de la factura es: FV496 la cual corresponde al rango del primer registro), y también está generando notificación respecto a la fecha final de vigencia, pues según el ejemplo, la factura se está enviando el día 4/11/2025 y la resolución está vigente hasta el 5/11/2025, lo que implica que esa primera resolución está a un día de vencerse.

- El sistema al día (5/11/2025), actuará así:

    De la primera resolución, permitirá enviar las facturas con consecutivos: 497, 498, 499 y 500  
    De la segunda resolución, permitirá enviar las facturas con consecutivos: 501 a la 1000  
    Ya que en este día ambas están vigentes.

- El sistema al día (6/11/2025), actuará así:

    De la primera resolución, no permitirá enviar ninguna factura. Pues la vigencia por fecha final fue superada.  
    De la segunda resolución, permitirá enviar cualquier factura con consecutivos: 501 a la 1000

Se debe tener presente que este tipo de comentarios o mensajes de validación en una operación, no generan ningún inconveniente con el envío de un documento electrónico ni con el procesamiento de la operación.


---
## Gestión de Facturación Electrónica
### ¿Cómo configurar el inicio de facturación electrónica? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo iniciar facturación electrónica?
- ¿Cuál es el procedimiento para iniciar con facturación electrónica?
- ¿Qué hago para iniciar con facturación electrónica?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para iniciar con facturación electrónica debes cumplir algunos pasos previos tanto en la DIAN como en el sistema ContaPyme, ya que así se confirma que tienes todo listo y aprobado para iniciar con el proceso de generación y transmisión de documentos electrónicos en formato XML ante la DIAN.  
A continuación te indicamos esos pasos:

**Pasos en la DIAN:**
1. **Regístrate como facturador electrónico** y cumple el proceso de **Habilitación**. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior accede por la opción: **Temas de interes > Factura electrónica > Habilitación.** 

    1.1 Selecciona en los modos de operación el proveedor tecnológico que usarás para el envío de documentos electrónicos tanto en ambiente de habilitación (pruebas) como en el ambiente de producción.

    1.2 Envía los documentos mínimos de prueba de habilitación requeridos por la DIAN para que quedes habilitado como facturador electrónico. *Desde el área de soporte técnico de InSoft te ayudamos con este proceso, solo tienes que generar un tiquete de soporte desde tu ContaPyme y un asesor te contactará para ayudarte en este proceso de manera ágil y automatizada.* 

2. **Genera una resolución de facturación electrónica** en el sistema MUISCA de la DIAN. Para esto ingresa a: https://www.dian.gov.co/ y en la parte superior izquierda ingresa al sistema MUISCA por alguna de las opciones: **Transaccional > Usuario registrado** o **Transaccional > Usuario nuevo.**

    2.1 Genera la resolución de facturación electrónica, para esto ingresa por: *Solicitar numeración de facturación.*
    
    2.2 Ingresa por la opción “Autorizar rangos” y registra el prefijo y rango de numeración para facturación electrónica. 

    2.3 Genera el formato borrador "1302" que la DIAN te presenta y luego fírmalo, allí se generará el formato "1876" que corresponde a la resolución de facturación electrónica.

3. **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación. Para este proceso ingresa a: https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** y allí ingresa por la opción *Gestionar asociación de prefijos.* 

**Pasos en ContaPyme:**
1. Confirma que ya hiciste el proceso de adquisición del plan de documentos electrónicos ante InSoft.
2. Registra la información que indica el paso a paso de configuración del portal de clientes del sistema ContaPyme.  
Ingresa a: https://www.contapyme.com/portal-clientes/,  verifica que tienes la empresa registrada por la opción *Servicios electrónicos* y sigue los pasos que allí indica el portal.

    👉 Para orientarte mejor revisa el siguiente [Video: Pasos en portal de clientes de ContaPyme para vinculación de empresa con facturación electrónica](https://www.youtube.com/watch?v=OjYLK73UfMg)

3. Activa en el **Explorador gráfico de empresas** el servicio de *facturación electrónica.*
   
   👉 Para orientarte mejor revisa el siguiente [Video: Activación de facturación electrónica en explorador gráfico de empresas en ContaPyme](https://www.youtube.com/watch?v=guZZb1YI7wo)
4. Configura en el **Catálogo de documentos de soporte** *[Ruta: Menú Básico > Doc. Soporte]*, la información de la resolución de facturación electrónica que generaste en la DIAN.  
    **Nota:** En este paso debes garantizar que tienes plenamente configurados los documentos de soporte en tu sistema:
    - *Factura de venta electrónica:* Con la misma información que generaste desde el portal MUISCA de la DIAN, es decir: Prefijo o máscara, número de resolución, fecha inicial y fecha final de la autorización, número inicial y número final de la autorización.
    - *Nota débito electronica y nota crédito electronica:* Estos documentos de soporte aunque también son electrónicos y se deben reportar en formato XML a la DIAN, se deben crear con información interna de la empresa, es decir, no se tiene que generar un registro previo o tener una resolución ante la DIAN para la emisión de dichas notas.

    👉 Para orientarte mejor revisa el siguiente [Video: Configuración de documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc) 

5. Confirma que desde tu licenciamiento y usuario, puedes acceder en el *manejador de operaciones* a las operaciones que permiten emitir facturación electrónica:

- **Ingresos:** Operación que permite facturar conceptos y/o servicios, es decir, que no tiene un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Ingresos?](https://www.youtube.com/watch?v=0gL6B41DqYo) 

- **Facturación y ventas:** Operación que permite facturar tanto servicios como productos, es decir, permite un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Facturación y ventas?](https://www.youtube.com/watch?v=AzYw6F-vLeM) 

6. Verifica que tienes asociado en la operación con la que emites facturación *(Ingresos o Facturación y Ventas)* el documento de soporte que ya tienes configurado con la información de la resolución que tramitaste ante la DIAN.

---

### ¿Cómo validar el consecutivo de la resolución de facturación en la DIAN? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Validar el consecutivo de la resolución de facturación en la DIAN es fundamental para asegurarte de que el número que estás usando en tus facturas electrónicas esté dentro del rango autorizado y no genere rechazos al momento de transmitir el documento electrónico.

**1. Comprende qué es el consecutivo de la resolución**
 Cada resolución de facturación emitida por la DIAN tiene:
  1. Un número de resolución (por ejemplo: 18764000012345).
  2. Un prefijo (por ejemplo: FE, FAC, FEV, etc.).
  3. Un rango de numeración (por ejemplo: del FE1 al FE5000).
  4. Un período de vigencia (por ejemplo: desde XX fecha y hasta XX fecha).

✅ El consecutivo corresponde al número progresivo de factura dentro de ese rango aprobado.  
    Por ejemplo, si tu resolución va del FE1 al FE5000, y ya has emitido hasta FE350, el siguiente consecutivo válido es FE351.

**2. Valida el consecutivo en el portal MUISCA (numeración DIAN)**  
Paso a paso:  
  1. Entra al portal https://muisca.dian.gov.co  
  2. Inicia sesión con tu usuario (empresa o persona natural).  
  3. En el menú superior, selecciona: “Facturación → Numeración de facturación → Consultar numeración”  
  4. Verás un listado de todas tus resoluciones aprobadas.  
  5. Da clic en la resolución que usas para facturar y verifica:
     - Número de resolución
     - Prefijo
     - Rango autorizado (Desde – Hasta)
     - Fechas de vigencia
     - Estado → debe ser “Activa”

✅ **Ten presente:**  
Si el consecutivo que estás usando no excede el número máximo y está dentro de las fechas vigentes, es válido.

**3. Valida manualmente una factura emitida**  
Si quieres confirmar que el consecutivo emitido existe y fue aceptado por la DIAN:

  1. Entra a 👉 https://catalogo-vpfe.dian.gov.co/User/SearchDocument
  2. En la opción "Buscar documento", ingresa el CUFE o UUID del documento electrónico que deseas validar.
  3. Espera que en la parte inferior derecha, se valide el ingreso como persona y no como robot, y luego da clic en: "Buscar".   
  3. El sistema mostrará información del documento electrónico como:  
    - Estado del documento.  
    - Fecha de emisión del documento.  
    - CUFE y datos básicos del emisor y receptor.  
    - Validación que se indicaron en el ApplicationResponse.  

✅ Si el documento aparece, el consecutivo está correctamente dentro del rango y registrado en la DIAN.

---
### ¿Cómo agregar la resolución en la representación gráfica de la  factura de venta? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo personalizar el diseño de una factura electrónica?
- ¿Cómo modificar el diseño de impresión?
- Solicito que al imprimir el documento se visualice la resolución correspondiente
- ¿Cómo habilitar la visualización de la resolución al momento de imprimir el documento?
-¿Cómo visualizar la resolución configurada en el documento de soporte en la representación gráfica de la factura de venta?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Antes de modificar o personalizar el diseño de impresión, es importante tener en cuenta que la información de la resolución de facturación (número de resolución, prefijo, rangos y vigencia) se configura previamente en el documento de soporte.
El diseño de la representación gráfica únicamente se encarga de visualizar esta información al momento de imprimir el documento.

Normalmente, el sistema ya cuenta por defecto con un diseño de la representación gráfica de la factura de venta, en el cual la información relacionada con la resolución ya se encuentra configurada.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de representación gráfica genérica del sistema](https://www.contapyme.com/conocimientocontapyme/080_IN/factura_venta_diseño_resolucion.png)  

En la imagen anterior, puedes observar que el diseño de la representación gráfica que el sistema ofrece, cumple con todos los requisitos indicados por la DIAN en las diferentes resoluciones y en el estatuto tributario. En el recuadro verde, puedes ver la información relacionada con los datos de la resolución.

Sin embargo, si has modificado o personalizado tu propio diseño de impresión (el cual usas como representación gráfica de la factura electrónica) y en dicho diseño no tienes incluida la información de la resolución, puedes adicionar dicho campo, para que el sistema muestre la información de la resolución con la que generaste la factura electrónica.  
Para modificar el diseño, debes ingresar directamente al documento de impresión: **[Menú básico > Doc. Impresión]** ubicas el documento que usas para emitir la representación gráfica de la factura electrónica y le indicas **"Modificar"**, luego en la pestaña **"Diseño de documento"** das clic en la opción: **"Diseñar documento principal"** y personalizas el diseño, donde incluyas el campo: "Información resolución", así como muestra la siguiente imagen:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo de diseño documento de impresión con dato de la resolución](https://www.contapyme.com/conocimientocontapyme/080_IN/diseño_doc_impresion_campo_resolucion.png)  

**Nota:**  
Sin embargo, ten presente que para modificar el diseño de impresión de un documento, se requiere un conocimiento básico de la funcionalidad "Diseñador de documentos" que el sistema trae, por lo tanto, antes de generar alguna modificación, te recomendamos ver el siguiente vídeo:
 [Video: Diseñador de documentos "como personalizar un documento de impresión"](https://www.youtube.com/watch?v=yluO841m7gw)  
 Con este vídeo podrás entender mejor cómo se personaliza un documento de impresión y con la información de la imagen previa, podrás ubicar el campo asociado a la resolución y agregarlo a tu diseño.

---

## Parámetros y personalización

### ¿Cómo configurar descuentos, impuestos o retenciones en las facturas?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo configurar IVA en una factura electrónica?
- ¿Cómo configurar retención en una factura electrónica?
- ¿Cómo configurar impuesto al consumo en una factura electrónica?
- ¿Cómo configurar reteica en una factura electrónica?
- ¿Cómo configurar IBUA en una factura electrónica?
- ¿Cómo configurar ICUI en una factura electrónica?
- ¿Cómo configurar un descuento en una factura electrónica?
- ¿Cómo configurar impuestos en una factura electrónica?
- ¿Cómo configurar IVA en facturación?
- ¿Cómo configurar retención en facturación?
- ¿Cómo configurar impuesto al consumo en facturación?
- ¿Cómo configurar IBUA en facturación?
- ¿Cómo configurar ICUI en facturación?
- ¿Cómo configurar IVA en ventas?
- ¿Cómo configurar retención en ventas?
- ¿Cómo configurar impuesto al consumo en ventas?
- ¿Cómo configurar reteica en ventas?
- ¿Cómo configurar IBUA en ventas?
- ¿Cómo configurar ICUI en ventas?
- ¿Cómo configurar un descuento en ventas?
- No me calcula el IVA en la venta
- No salen impuestos en la venta
- Configurar impuestos en facturación
- Configurar impuestos en ingresos
- Facturar con impuestos

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Para configurar descuentos, impuestos o retenciones en las facturas debes tener en cuenta varias consideraciones las cuales están asociadas al manejo de **conceptos de liquidación en ingreso**, a continuación te las indicamos:

**Configuración para cálculo automático de impuestos.**  
Para este proceso debes analizar varios aspectos como: configuración de clasificación legal de la empresa, configuración legal del tercero, configuración de impuestos en plan de cuentas y los conceptos de liquidación, por lo tanto, para orientarte mejor revisa el siguiente [Video: Configuraciones para cálculo automático de impuestos](https://www.youtube.com/watch?v=4Ntl1p9jhrc)  

✅ Si el proceso de facturación lo estás haciendo desde operaciones como "Facturación y ventas" o "Punto de venta" ten presente la siguiente información:

**1. Configuración de impuestos en grupos de inventarios o elementos de inventario.**  
A nivel de inventarios, el sistema permite la configuración y personalización de impuestos y descuentos, y es clave asignar en el grupo de inventario o en el elemento de inventario el concepto de liquidación que está asociado al impuesto, retención o descuento.  
Estas son las opciones de configuración o personalización de conceptos:  

   **1.1 Configuración de conceptos de liquidación en cuenta de ingresos en el grupo de inventario:**  Ingresa al catálogo de grupos de inventario y configura en la cuenta de "Ingresos", los diferentes conceptos asociados a los impuestos, retenciones y descuentos que deseas calcular en la operación de ventas.   

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de impuestos en cuenta de ingresos en el grupo de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_impuestos_grupo_inv_cuenta.png)  

   **1.2 Configuración personalizada de conceptos de liquidación en grupo de inventario:**  Ingresa al catálogo de grupos de inventario y configura en la opción "Impuesto ventas", los diferentes conceptos asociados a los impuestos, retenciones y descuentos que deseas calcular en la operación de ventas.   

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración personalizada de impuestos en grupo de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_impuestos_grupo_inv.png)  

   **1.3 Configuración personalizada de conceptos de liquidación en elementos de inventario:**  Ingresa al catálogo de elementos de inventario, activa "Personalizar cuentas e impuestos" y en la opción "Manejo contable" configura en "Impuesto ventas" la personalización de los diferentes conceptos asociados a los impuestos, retenciones y descuentos que deseas calcular en la operación de ventas.   

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración personalizada de impuestos en elemento de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_impuestos_elementos_inv.png)  

**2. Activa configuración para cálculo de impuestos en operación de ventas.**  
Una vez configurados los impuestos, cargos o descuentos (según los puntos anteriores), solo en la operación de **"Facturación y ventas"** debes activar la indicación de cuáles son los impuestos que el sistema va a calcular automáticamente.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración impuestos a calcular en operación de ventas](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_impuestos_opr_ventas.png) 


✅ Si el proceso de facturación lo estás haciendo desde la operación de "Ingresos" ten presente la siguiente información:  

**1. Configuración de impuestos en el plan de cuentas (cuenta de ingresos).**  
Al facturar desde la operación de "Ingresos" siempre se utiliza una cuenta del plan de cuentas (normalmente una cuenta que inicia con código 4 (ingresos)), en dicha cuenta debes configurar los conceptos de liquidación (impuestos) que apliquen al proceso comercial que realizas en tu empresa. Al tener los conceptos de liquidación configurados en las cuentas que usas para emitir las facturas, el sistema analizará las configuraciones como clasificación legal de la empresa, configuración legal del tercero y los conceptos de liquidación para proceder con el cálculo automático de impuestos en la operación.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuración de impuestos en cuenta de ingresos](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_imp_cta_ing.png)


📌 **Consideraciones especiales en configuración de las cuentas asociadas a los conceptos de liquidación.**  
Cada vez que se configura un concepto de liquidación se le debe asociar una cuenta del plan único de cuentas, en la cual se registrará la contabilización de impuesto, cargo o descuento:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuestos en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_tipo_imp_cuenta.png)  

Debes analizar que dicha cuenta esté correctamente configurada con el tipo de impuesto que la DIAN solicita, por defecto el sistema entrega la configuración correcta, pero si al interior de la empresa se crearon nuevas cuentas auxiliares o hicieron alguna modificación sobre las configuraciones del PUC (Plan Único de Cuentas), se hace necesario verificar que todo esté correcto para que en la factura electrónica (XML) los tributos, impuestos, cargos y descuentos se notifiquen con las etiquetas y códigos correctos.  


👉 Algunos ejemplos de configuración son:

- Configuración de cuenta para tipo de impuesto con concepto de IVA:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuesto IVA en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/puc_cuenta_tipo_iva.png)  

 - Configuración de cuenta para tipo de impuesto con concepto de Retención:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuesto Retención en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/puc_cuenta_tipo_retencion.png)  

  - Configuración de cuenta para tipo de impuesto con concepto de impuesto nacional al consumo:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuesto Retención en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/puc_cuenta_tipo_impuesto_consumo.png)  

  - Configuración de cuenta para tipo de impuesto con concepto de ReteICA:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuesto Retención en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/puc_cuenta_tipo_reteica.png) 
 
  - Configuración de cuenta para tipo de concepto de descuento:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuesto Retención en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/puc_cuenta_tipo_descuento.png) 
  
  - Configuración de cuenta para tipo de impuesto con concepto de IBUA:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuesto Retención en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/puc_cuenta_tipo_ibua.png) 

   - Configuración de cuenta para tipo de impuesto con concepto de ICUI:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de impuesto Retención en cuenta PUC](https://www.contapyme.com/conocimientocontapyme/080_IN/puc_cuenta_tipo_icui.png) 

---

### ¿Cómo configurar ingresos recibidos para terceros?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo habilitar el esquema de ingresos recibidos para terceros en la DIAN?
- ¿Qué se debe parametrizar para emitir facturas electrónicas por cuenta de terceros?
- ¿Cómo funciona la facturación electrónica cuando se reciben ingresos para terceros?
- ¿Cómo se estructuran los documentos electrónicos en operaciones por orden de terceros?
- ¿Qué diferencias existen entre la factura estándar y la factura por ingresos recibidos para terceros?


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

Ten presente que los ingresos recibidos para terceros (IRT) son ingresos que recauda un facturador en nombre de un tercero, sin que hagan parte de su base gravable propia.  
No se trata de una venta del facturador, sino de una recaudación, por lo que no genera IVA, no ingresa a su contabilidad como ingreso propio y requiere nota de identificación del tercero.
Para configurar ingresos recibidos para terceros se debe tener presente que normalmente la cuenta que se usa para la contabilización es una cuenta del pasivo: **"281505 - Ingresos recibidos para tercero."**

Ahora bien, para emitir facturación relacionada a ingresos para terceros se deben realizar algunas configuraciones previas para su funcionamiento en la operación de **Facturación y ventas.**

**1. Análisis a nivel contable**

- Verifica que los productos o servicios que vas a facturar estén configurados a una cuenta de ingresos para terceros. Normalmente esta configuración se realiza en la configuración de la cuenta de ingreso que está en el grupo de inventario o en la personalización del elemento de inventario.

   - Configuración de cuenta ingresos para terceros en grupo de inventario:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración cuenta ingresos para terceros en grupo](https://www.contapyme.com/conocimientocontapyme/080_IN/grupo_ing_terceros.png)

   - Configuración de cuenta ingresos para terceros en elemento de inventario:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración cuenta ingresos para terceros en elemento](https://www.contapyme.com/conocimientocontapyme/080_IN/elemento_ing_terceros.png)

- Verifica con tu contador o revisor fiscal la configuración de impuestos que esta cuenta de ingresos para terceros debe tener, generalmente no se le configura IVA.

   - Configuración de impuestos en grupos o elementos marcados como ingresos para terceros:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de impuestos en cuentas ingresos para terceros](https://www.contapyme.com/conocimientocontapyme/080_IN/impuestos_ing_terceros.png)


**2. Análisis a nivel de facturación electrónica**

- Verifica si la factura electrónica de venta, la cual tiene un ingreso recibido para tercero, la debes notificar electrónicamente a la DIAN como factura de **Mandato**.

    Una factura electrónica de mandato es un tipo de facturación que se usa cuando una empresa (mandatario) emite facturas en nombre y por cuenta de otra empresa o persona (mandante), siguiendo un contrato de mandato comercial, es decir, el mandatario factura a nombre del mandante, indicando que los bienes o servicios facturados no son propios, sino del mandante.  
    Este esquema está regulado por la DIAN dentro del modelo estándar de facturación electrónica, no es un tipo de documento diferente, sino una forma especial de emitir la factura con datos particulares.

    **¿Cuándo se usa una factura electrónica de mandato?**  
    ✔ Una empresa administra, comercializa o presta servicios en nombre de otra.  
    ✔ El mandatario recauda ingresos, pero estos pertenecen al mandante.  
    ✔ El mandatario debe emitir la factura al cliente final, pero no como vendedor propio, sino como representante.  

**3. ¿Cómo se registra en el sistema?**  
    3.1 Si la factura es: Factura electrónica de mandato y se usa la operación **Facturación y Ventas**, debes registrarla como lo muestra la siguiente imagen, teniendo presente que en los campos adicionales debes indicar por cada producto o servicio facturado el tipo de ingreso (propio o mandato) y también el Nit del mandante, ya que esta información se verá reflejada en el XML de la factura electrónica:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo factura electrónica de mandato](https://www.contapyme.com/conocimientocontapyme/080_IN/factura_mandato.png)


    3.2 Si la factura es: Factura electrónica de mandato y se usa la operación **Ingresos**, debes seguir los pasos que se indican en la guía de montaje que se encuentra en el sistema, en la ruta: **Menú Inventarios > Guías de montaje > Guia montaje facturación electrónica mandato Opr ingresos**

 - Si se define que la factura es: Factura electrónica estándar, la debes registrar como lo muestra la siguiente imagen y en este caso no se reportan campos o datos adicionales:  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo factura electrónica de mandato](https://www.contapyme.com/conocimientocontapyme/080_IN/factura_estandar.png)

---

### ¿Cómo generar factura de mandato?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
  
- ¿Cómo configurar la facturación con mandato?
- ¿Qué pasos se requieren para facturar operaciones de mandato en Colombia?
- ¿Cómo asociar un tercero mandante en el sistema de facturación electrónica?
- Factura mandato
- Mandante
- Mandatario

#### Respuesta: 
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

La factura de mandato en Colombia es un tipo de facturación electrónica que se utiliza cuando una empresa factura en nombre de otra, bajo un contrato de mandato. En un contrato de mandato, hay dos partes:  

- Mandante: quien realmente vende el bien o presta el servicio (el dueño del ingreso).  
- Mandatario: quien actúa en nombre del mandante y emite la factura.

👉 Es decir, el mandatario factura, pero el ingreso no es suyo, sino del mandante.

La factura se emite como factura electrónica de venta, pero marcando que es por **mandato** y se deben identificar:  

- El mandante
- El mandatario
- El ingreso del mandante puede manejarse contablemente como ingresos para terceros (ej: cuenta 2815).
- El mandatario solo reconoce su comisión como ingreso propio


**¿Cómo se registra en el sistema?**  
Dependiendo de la operación que uses en el sistema para emitir la facturación electrónica, así:

- **Facturación y ventas o Punto de venta**.   
Si usas la operación **Facturación y Ventas**, debes registrarla como lo muestra la imagen, teniendo presente que en los campos adicionales debes indicar por cada producto o servicio facturado el tipo de ingreso (propio o mandato) y también el Nit del mandante, ya que esta información se verá reflejada en el XML de la factura electrónica:  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ejemplo factura electrónica de mandato](https://www.contapyme.com/conocimientocontapyme/080_IN/factura_mandato.png)


 - **Ingresos**.
 Si usas la operación **Ingresos**, debes seguir los pasos que se indican en la guía de montaje que se encuentra en el sistema, en la ruta: **Menú Inventarios > Guías de montaje > Guia montaje facturación electrónica mandato Opr ingresos**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Guía montaje facturación de mandato por operación de Ingreso](https://www.contapyme.com/conocimientocontapyme/080_IN/guia_mon_mandato_ing.png)


---

### ¿Cómo configurar una factura con moneda extranjera?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo habilitar la facturación electrónica en divisas?
- ¿Qué se debe parametrizar para emitir una factura en moneda extranjera?
- ¿Cómo registrar la tasa de cambio en una factura electrónica?
- ¿Qué campos del XML se deben mirar en una factura en moneda extranjera?
- ¿Cómo configurar el sistema para soportar múltiples monedas en la facturación?
- ¿Qué requisitos exige la DIAN para facturar en moneda extranjera?
- ¿Cómo indicar la moneda y tasa de cambio en el documento electrónico?
- ¿Qué debo tener en cuenta para calcular impuestos cuando la factura se genera en moneda extranjera?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Ten presente que las facturas en moneda extranjera son completamente válidas en Colombia siempre que cumplan con la estructura XML exigida por la DIAN, incluyendo la conversión a pesos colombianos (COP).

A continuación te indicamos los pasos para configurar y generar una factura con moneda extranjera:

**1. Activa en el documento de soporte el manejo de facturas de exportación**
- Dentro del sistema ingresa al documento de soporte que usas para emitir facturación electrónica [Menú: Básico > Doc. Soporte] e indica Modificar, luego confirma que tenga activa la opción: **Habilitar el uso de facturas de exportación** 

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración en documento de soporte para factura de exportación](https://www.contapyme.com/conocimientocontapyme/080_IN/doc_soporte_fe_exportacion.png)

 **2. Registra la tasa de cambio - TRM**
- Como el envío del documento electrónico se realizará en una moneda adicional a la local, debes registrar en el sistema por cada día la tasa de cambio (TRM), para este proceso puedes usar la operación de **Registro de tasas de cambio**, en la cual puedes indicar múltiples monedas con su respectivo valor de tasa de cambio.  
**Nota:** Ten presente que si no registras la operación de tasa de cambio, el sistema consultará de manera automática y en línea la TRM del día para poder proceder con el envío del documento electrónico.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Registro de operación tasa de cambio](https://www.contapyme.com/conocimientocontapyme/080_IN/registro_opr_trm.png)

**3. Verifica información del tercero cliente**
- Si la factura electrónica la vas a realizar a un cliente internacional o extranjero, asegúrate de configurarle correctamente la información como: datos de dirección (país, ciudad, dirección, etc), clasificación tributaria ya que normalmente a un cliente extranjero no se le aplican impuestos y también verifica el tipo de documento con el que está registrado ya que normalmente no se usa tipo de documento como 13-Cédula o 31-Nit sino 42-Tipo de documento extranjero.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de tercero extranjero](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_tercero_extranjero.png)

**4. Registra la factura en moneda extranjera**
- Ingresa a la operación que habitualmente usas para emitir facturación electrónica (Ingresos o Facturación y Ventas), y selecciona el cliente (tercero) al que le vas a emitir la factura y en el campo **Moneda** selecciona la moneda extranjera con la cual vas a generar la factura. Luego relaciona los productos o servicios que vas a facturar y registra el precio en dicha moneda extranjera.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Factura en moneda extranjera](https://www.contapyme.com/conocimientocontapyme/080_IN/fact_mon_extranjera.png)

- Si adicional al envío de la factura en moneda extranjera, también **debes reportar los términos internacionales de comercio electrónico (INCOTERMS)**, entonces no olvides activar en el segundo paso de la operación de venta que es factura de exportación y selecciona el INCOTERMS que definiste con tu cliente.
Recuerda que los INCOTERMS son reglas internacionales que definen las responsabilidades entre comprador y vendedor en una transacción comercial, especifican quién asume costos, riesgos y trámites durante el transporte de la mercancía y facilitan el comercio exterior al establecer un lenguaje común y estándares claros en las operaciones internacionales.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Activación de Incoterms en factura electrónica](https://www.contapyme.com/conocimientocontapyme/080_IN/incoterms_fact_mon_extranjera.png)

**4. Validación de la factura electrónica en moneda extranjera**
- Al enviar la factura electrónica en moneda extranjera se podrán ver en el XML varios datos que confirman el envío correcto según las reglas del anexo técnico de la DIAN, por ejemplo:

    - En la parte de **UBLExtensions** verás los datos del grupo **TotalesCop** que informan los valores del documento electrónico en la moneda extranjera.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![XML Totales Cop](https://www.contapyme.com/conocimientocontapyme/080_IN/xml_totalescop.png)

    - La etiqueta **DocumentCurrencyCode** se notifica con el valor COP.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![XML DocumentCurrencyCode](https://www.contapyme.com/conocimientocontapyme/080_IN/xml_cop.png)

    - La etiqueta **PaymentExchangeRate** reporta la información de la moneda extranjera y la TRM que usaste en el documento electrónico.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![XML PaymentExchangeRate](https://www.contapyme.com/conocimientocontapyme/080_IN/xml_paymentexchangerate.png)

    - Si en la factura notificaste los **INCOTERMS**, se visualizará la etiqueta **DeliveryTerms** con la información del término comercial que indicaste en la operación.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![XML DeliveryTerms](https://www.contapyme.com/conocimientocontapyme/080_IN/xml_incoterms.png)


Algunos vídeos adicionales que puedes visualizar para emitir facturación electrónica serían:

- **Operación Ingresos:** Operación que permite facturar conceptos y/o servicios, es decir, que no tiene un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Ingresos?](https://www.youtube.com/watch?v=0gL6B41DqYo) 

- **Operación Facturación y ventas:** Operación que permite facturar tanto servicios como productos, es decir, permite un control de existencias o inventarios.

    👉 Para orientarte mejor revisa el siguiente [Video: ¿Cómo generar facturación electrónica a través de la operación de Facturación y ventas?](https://www.youtube.com/watch?v=AzYw6F-vLeM)

---

### ¿Cómo hacer una factura en dólares pero que cuando la imprima me salga en dólares y no en pesos?

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo imprimir una factura en otra moneda?
- ¿Cómo imprimir una factura en moneda extranjera?
- ¿Cómo imprimir una factura en dólares?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Ten presente que las facturas en moneda extranjera son completamente válidas en Colombia siempre que cumplan con la estructura XML exigida por la DIAN, incluyendo la conversión a pesos colombianos (COP). Normativamente se indica que la moneda en la que se presenta el XML debe corresponder a COP (pesos colombianos) y que la representación gráfica debe ser una copia fiel de dicha información del XML (por lo tanto, la representación gráfica también debería generarse en COP (pesos colombianos)), sin embargo, existen factores comerciales en los cuales se hace necesario imprimir la representación gráfica de una factura que está en moneda extranjera no en pesos sino en la misma unidad de moneda extranjera, y a continuación te indicamos los pasos de cómo podrías generarlo en el sistema:

**1. Activa en el documento de soporte el manejo de facturas de exportación** (Opcional)
- Dentro del sistema ingresa al documento de soporte que usas para emitir facturación electrónica [Menú: Básico > Doc. Soporte] e indica Modificar, luego confirma que tenga activa la opción: **Habilitar el uso de facturas de exportación** 

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuración en documento de soporte para factura de exportación](https://www.contapyme.com/conocimientocontapyme/080_IN/doc_soporte_fe_exportacion.png)

 **2. Registra la tasa de cambio - TRM**
- Como el envío del documento electrónico se realizará en una moneda adicional a la local, debes registrar en el sistema por cada día la tasa de cambio (TRM), para este proceso puedes usar la operación de **Registro de tasas de cambio**, en la cual puedes indicar múltiples monedas con su respectivo valor de tasa de cambio.  
**Nota:** Ten presente que si no registras la operación de tasa de cambio, el sistema consultará de manera automática y en línea la TRM del día para poder proceder con el envío del documento electrónico.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Registro de operación tasa de cambio](https://www.contapyme.com/conocimientocontapyme/080_IN/registro_opr_trm.png)

**3. Verifica información del tercero cliente**
- Si la factura electrónica la vas a realizar a un cliente internacional o extranjero, asegúrate de configurarle correctamente la información como: datos de dirección (país, ciudad, dirección, etc), clasificación tributaria ya que normalmente a un cliente extranjero no se le aplican impuestos y también verifica el tipo de documento con el que está registrado ya que normalmente no se usa tipo de documento como 13-Cédula o 31-Nit sino 42-Tipo de documento extranjero.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de tercero extranjero](https://www.contapyme.com/conocimientocontapyme/080_IN/cfg_tercero_extranjero.png)

**4. Registra la factura en moneda extranjera**
- Ingresa a la operación que habitualmente usas para emitir facturación electrónica (Ingresos, Facturación y Ventas o Punto de venta), selecciona el cliente (tercero) al que le vas a emitir la factura y en el campo **Moneda** selecciona la moneda extranjera con la cual vas a generar la factura. Luego relaciona los productos o servicios que vas a facturar y registra el precio en dicha moneda extranjera.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Factura en moneda extranjera](https://www.contapyme.com/conocimientocontapyme/080_IN/fact_mon_extranjera.png)

- Si adicional al envío de la factura en moneda extranjera, también **debes reportar los términos internacionales de comercio electrónico (INCOTERMS)**, entonces no olvides activar en el segundo paso de la operación de venta que es factura de exportación y selecciona el INCOTERMS que definiste con tu cliente.
Recuerda que los INCOTERMS son reglas internacionales que definen las responsabilidades entre comprador y vendedor en una transacción comercial, especifican quién asume costos, riesgos y trámites durante el transporte de la mercancía y facilitan el comercio exterior al establecer un lenguaje común y estándares claros en las operaciones internacionales.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Activación de Incoterms en factura electrónica](https://www.contapyme.com/conocimientocontapyme/080_IN/incoterms_fact_mon_extranjera.png)

**5. Impresión de la factura electrónica en moneda extranjera**  
Para este punto puedes analizar alguna de las siguientes opciones:

5.1 El sistema tiene prediseñado un documento de impresión llamado: **"Factura electrónica de venta - Moneda extranjera"**, el cual puedes usar para imprimir la factura con los valores en moneda local y también con los valores totales y de impuestos en la moneda extranjera.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Documento de impresión Factura electrónica de venta - Recuadro Moneda extranjera](https://www.contapyme.com/conocimientocontapyme/080_IN/doc_imp_recuadro_mon_ext.png)

5.2 Puedes incluir en el documento de impresión que normalmente usas para la impresión de facturas electrónicas, una etiqueta o parámetro que indicará al sistema que dicha impresión se generará con los valores de la moneda extranjera que indicaste en la operación de venta.  
Para esto debes ingresar al catálogo de documentos de impresión **Menú Básico > Doc. Impresión** ubicar y modificar el documento de impresión que usas para la impresión de la factura, y en la pestaña de "Observaciones y parámetros" adicionar en parámetros el siguiente texto: [MONEDAEXTRANJERA]=S  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Etiqueta moneda extranjera en documento de impresión Factura electrónica](https://www.contapyme.com/conocimientocontapyme/080_IN/etiqueta_doc_imp_mon_ext.png)

Al imprimir el documento se verá así:  
![Documento de impresión Factura electrónica de venta - Moneda extranjera](https://www.contapyme.com/conocimientocontapyme/080_IN/doc_imp_mon_ext.png)

---

###  ¿Qué son campos extensibles y cómo configurarlos en el sistema? 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Qué son los campos extensibles dentro de la facturación electrónica?
- ¿Para qué sirven los campos extensibles en la facturación electrónica?
- ¿Cómo funcionan los campos extensibles en la factura electrónica?
- ¿Qué significa utilizar campos extensibles en el XML de la facturación electrónica?
- ¿Qué información se puede incluir en los campos extensibles de una factura electrónica?
- ¿Cuál es la finalidad de los campos extensibles en el modelo de facturación electrónica?
- En la facturación electrónica, ¿qué papel cumplen los campos extensibles?
- ¿Dónde se definen o se utilizan los campos extensibles dentro del estándar de factura electrónica?
- ¿Qué diferencia hay entre los campos obligatorios y los campos extensibles en la facturación electrónica?
- ¿Cómo se implementan los campos extensibles en el XML de una factura electrónica?


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En la facturación electrónica los campos extensibles son espacios adicionales dentro del XML de la factura que permiten incluir información extra que no está definida como obligatoria en el estándar usado por la DIAN. La facturación electrónica usa el estándar UBL 2.1 y allí existe una sección especial llamada **UBLExtensions** que permite agregar datos adicionales sin romper la estructura oficial del documento.

**¿Qué son exactamente?**
Los campos extensibles son campos opcionales que el emisor puede usar para incluir información adicional relevante para su negocio o sector, aunque no sea requerida por la DIAN para validar la factura.
Sirven para ampliar la información del documento sin modificar el estándar oficial.

**¿Para qué se usan?**
Se utilizan para agregar datos que muchas empresas necesitan para sus procesos internos o para integraciones con sistemas administrativos y contables, logística o sectores específicos.

Ejemplos comunes:
- Número de orden de compra del cliente.
- Código interno del producto.
- Información de lote o fecha de vencimiento.
- Detalles de transporte o entrega.
- Información de contratos.
- Datos sectoriales (salud, transporte, energía, etc.)
- Totales adicionales o cálculos internos.
- Observaciones comerciales.

**Diferencia con los campos obligatorios**
| Tipo de campo                | Característica                                                                |
|------------------------------|-------------------------------------------------------------------------------|
| Campos obligatorios          | La DIAN los valida y exige (CUFE, NIT, impuestos, etc)                        |
| Campos opcionales estándar   | Están en UBL pero no siempre son obligatorios                                 |
| Campos extensibles           | No están definidos en el modelo base; se agregan para necesidades del negocio |
|                              |                                                                               |

**¿Cómo se configuran en el sistema?**

Como la configuración de campos adicionales o extensibles puede estar sujeta a múltiples variables, según sea el tipo de sector, si es para operación de ingresos u operación de facturación y ventas, te recomendamos revisar  el siguiente [Video: Configuraciones de campos extensibles o adicionales](https://www.youtube.com/watch?v=5nr1BV5VvKI) 

---
## Errores Técnicos y Fallos del Sistema
###  Al enviar un documento electrónico sale esta regla VLR01 

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Qué es la regla VLR01?
- ¿Se puede enviar campos con valores negativos?
- ¿Se puede enviar un porcentaje con valor negativo?


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

La regla de validación VLR01 es una de las reglas que aplica la DIAN cuando valida el XML de un documento electrónico antes de aceptarlo. Estas reglas están definidas en el anexo técnico de facturación electrónica.

Puntualmente la regla VLR01 está relacionada con los valores monetarios de impuestos o tarifas. En términos simples, indica que: Las tarifas o valores tributarios reportados en la factura no pueden ser negativos. 
Es decir:

 - Los campos de tarifa o valor de impuesto deben ser ≥ 0.00.
 - Si el XML envía un valor negativo, la factura es rechazada por la DIAN.

**Ejemplo típico que genera el error VLR01**

Supongamos que en el XML se envía algo así:
- IVA: -19%
- Valor impuesto: -19.000

La DIAN lo rechaza porque las tarifas o valores de impuestos no pueden ser negativos.

**Casos donde suele aparecer este error**

Este rechazo aparece normalmente cuando:

- Calculas mal un descuento o devolución y lo envías como impuesto negativo.
- Inviertes el signo al calcular el valor del impuesto.

Por lo tanto, revisa dentro de la operación que genera el documento electrónico que los valores que estás registrando o reportando sean positivos.


---
## Errores Técnicos y Fallos del Sistema
###  Al enviar un documento electrónico sale esta regla FAJ40  

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Qué es la regla FAJ40?
- Identificador del tributo del emisor
- Identificador del tributo del vendedor
- CAJ40 
- DAJ40 
- DSAJ40 
- NSAJ40 


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

La regla de validación FAJ40 es una de las reglas que aplica la DIAN cuando valida el XML de un documento electrónico antes de aceptarlo. Estas reglas están definidas en el anexo técnico de facturación electrónica.

Esta validación de regla tiene diferentes códigos dependiendo si aplica para un tipo de documento electrónico en especial, así:

- FAJ40 aplica para facturación electrónica.
- CAJ40 aplica para nota crédito electrónica.
- DAJ40 aplica para nota débito electrónica.
- DSAJ40 aplica para documento de soporte en adquisiciones a no obligados.
- NSAJ40 aplica para nota de ajuste a documento de soporte en adquisiciones a no obligados.

Todas validan la misma información, y es que la identificación tributaria del emisor del documento electrónico esté relacionada con un código válido autorizado por la DIAN según el anexo técnico.

La siguiente imagen corresponde a las opciones que la DIAN permite para indicar una identificación tributaria del emisor del documento electrónico:  
![Códigos válidos para identificación tributaria](https://www.contapyme.com/conocimientocontapyme/080_IN/id_tributario.png)

Por lo tanto, te recomendamos revisar la información de "Responsabilidades" en la información de la empresa y del tercero, para que indiques solo una responsabilidad del listado de opciones disponibles.

La siguiente imagen corresponde a la configuración de "Responsabilidades" en el explorador gráfico de empresa:  
![Responsabilidad tributaria en la empresa](https://www.contapyme.com/conocimientocontapyme/080_IN/resp_tribut_empresa.png)

La siguiente imagen corresponde a la configuración de "Responsabilidades" en el tercero indicado en el documento de soporte:  
![Responsabilidad tributaria en el tercero](https://www.contapyme.com/conocimientocontapyme/080_IN/resp_tribut_tercero.png)


---
## Casos Especiales y Otras Preguntas
###  ¿Cuántos documentos me quedan?  

CANONICAL_ID: PF_FACTURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo consulto el saldo de documentos?
- ¿Dónde veo los consumos?
- ¿Qué cantidad de documentos pendientes tengo?
- ¿Cómo veo el detalle de documentos enviados?
- Consulta de documentos desde el portal de clientes


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

Para conocer el saldo de documentos pendiente que tienes por consumir puedes hacerlo con estas opciones:

**Opción 1. Explorador de consumos:**  
    - Ingresa al Menú: Básico > Complementos > Explorador de consumos.  
    - Selecciona el plan de documentos el cual está asociado a la factura que deseas consultar los consumos.  
    - Este explorador muestra todos los documentos electrónicos enviados y los consumos asociados al plan de documentos.  
    - Puedes aplicar filtros por tipo de documento y fecha de emisión para localizar rápidamente el documento que necesitas.  
    - El explorador mostrará el número del documento, la fecha de emisión y el consumo del plan, que incluye cuántos documentos se han usado y cuántos quedan disponibles.  

Te recomendamos revisar  el siguiente [Video: qué es el explorador de consumos](https://www.youtube.com/watch?v=LVLY_0nuEKE) 

**Opción 2. Desde el Explorador de consumos:**  
    - Ingresa al Menú: **Básico > Doc. soporte**, ubica cualquier documento configurado como electrónico (ej. Factura de venta electrónica), en la pestaña "Facturación electrónica" da clic en la opción "Administrar conexión con proveedor" y usa la opción "Test de conexión".  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Consulta de saldo desde documentos de soporte](https://www.contapyme.com/conocimientocontapyme/080_IN/saldo_doc_soporte.png)


**Opción 3. Desde el Portal de clientes:**  
    - Ingresa al portal de clientes de InSoft (https://www.contapyme.com/portal-clientes), y en la opción de "Servicios electrónicos", consulta para la empresa que requieras el detalle del plan de documentos .  

La siguiente imagen corresponde a la pantalla del portal relacionada con este punto:  
![Consulta de saldo desde portal clientes](https://www.contapyme.com/conocimientocontapyme/080_IN/saldo_portal_cli.png)