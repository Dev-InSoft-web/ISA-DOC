# Facturación
## Facturación Electrónica - Envío y Procesamiento
### ¿Por qué no puedo emitir una factura electrónica?

**Respuesta:**
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

**También aplica si preguntas:**  
- ¿Cuáles son los pasos para generar facturación electrónica en ContaPyme?  
- ¿Cómo configuro ContaPyme para generar facturas electrónicas?
- ¿Qué se debe hacer para empezar con facturación electrónica?

---
### ¿Por qué no se puede enviar el documento electrónico a la DIAN aunque todo esté configurado?

**Respuesta:**
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

![Ejemplo de verificación de mensajes de error:](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

Dependiendo del mensaje de rechazo, puedes revisar en la operación de venta la información de:

* *Tercero:* por si hace falta alguna información que se esté indicando como requerida.
* *Producto o servicio facturado:* por si hace falta configuración de algún dato como impuestos o tributos que se requieran calcular automáticamente dentro de la factura.
* *Impuestos:* por si se incluyó manualmente algún impuesto en la operación de venta y este no estaba configurado correctamente en el bien o servicio facturado.

**También aplica si preguntas:**  
- ¿Qué hago si la factura no se envía a la DIAN?  
- ¿Cómo soluciono problemas de envío de un documento electrónico?
- ¿La operación me genera un error y no permite enviarse a la DIAN?


**Recursos adicionales:**  
- [Video: Generación del Set de pruebas](https://www.youtube.com/watch?v=-ScEeRbEjfs)  
- [Video: Generación de resolución de facturación electrónica](https://www.youtube.com/watch?v=cokfUixajsI)  
- [Video: Activación de facturación electrónica en la empresa](https://www.youtube.com/watch?v=guZZb1YI7wo) 
- [Video: Configuración documentos de soporte en ContaPyme](https://www.youtube.com/watch?v=E1j8_5oDJvc)
- [Video: Configuración resolución de facturación electrónica en ContaPyme](https://www.youtube.com/watch?v=PfmA-GUnA1Q)
- [Video: Asociación en la DIAN de prefijos ante el proveedor tecnológico](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

---

### ¿Qué hacer si la operación del documento electrónico queda en estado “0/3”, “1/3” o “2/3”?

**Respuesta:**
Cada acción configurada en el "documento de soporte" que usas en la operación de venta, se ve reflejada como un conteo al momento de ejecutarse **0/3, 1/3 o 2/3**, si alguna de esas acciones no se ejecuta, el sistema lo notifica en el "Inspector de datos".

Ejemplo:

Supongamos que el documento usado para facturación electrónica tiene las siguientes configuraciones:

- Hace parte de facturación electrónica.
- Publicación en plataforma de documentos.
- Envío de email automático

![Imagen con acciones configuradas en el documento de soporte:](https://www.contapyme.com/conocimientocontapyme/080_IN/Cfg_Acciones_Doc_Sop.png)

Si la operación está en 0/3, quiere decir, que ninguna de las acciones se ha ejecutado:

![Operación sin acciones ejecutadas:](https://www.contapyme.com/conocimientocontapyme/080_IN/Opr_sin_acciones_ejecutadas.png)

Ahora bien, si la operación está en estado 1/3 o 2/3 puedes mirar por el "Inspector de datos" cuál acción sí se ejecutó y cuál quedó pendiente. Allí mismo el sistema indicará si se presentó un error asociado a la validación del XML del documento electrónico y notificará el código o regla de rechazo que la DIAN informó.

Algunas veces puede pasar que se presente una intermitencia en la conexión de internet del equipo que está ejecutando las acciones y solo basta con volver a "Ejecutar acciones" de la operación para que se completen:

![Ejecutar de nuevo acciones:](https://www.contapyme.com/conocimientocontapyme/080_IN/Ejecutar_acciones.png)

**También aplica si preguntas:**  
- ¿Qué hacer si la operación del documento electrónico queda en estado “0/3”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “1/3”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “2/3”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “0/2”?
- ¿Qué hacer si la operación del documento electrónico queda en estado “1/2”?


---
### ¿Qué significa que la factura no ha sido aprobada por la DIAN? 

**Respuesta:**
Significa que la DIAN recibió el XML del documento y al ejecutar las validaciones que se reportan en el anexo técnico (actualmente versión 1.9 de la resolución 00165) encontró que no se cumple algún requerimiento técnico que se tiene marcado como obligatorio o de validación que genera **rechazo** si no se cumple con su estructura.

Ante esta situación, en el sistema se mostrará en el "Inspector de datos" el mensaje de error o rechazo que la DIAN está indicando.

![Ejemplo de verificación de mensajes de error:](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

Para solucionar esta situación, es muy importante tener en cuenta qué indica la regla de validación que genera el rechazo y según su información hacer el ajuste o corrección que implique.

**También aplica si preguntas:**  
- ¿Cómo verifico si la factura presenta errores en el XML?
- ¿Dónde veo los errores de una factura electrónica?


---
### ¿Por qué la DIAN rechaza la factura electrónica? 

**Respuesta:**
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

![Ejemplo de verificación de mensajes de error:](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)


---
### ¿Qué significa "Regla: 90, Rechazo: Documento procesado anteriormente" al enviar una factura electrónica?

**Respuesta:**
Este rechazo significa que la DIAN ya tiene información del documento electrónico que estás reportando y no acepta que se envíe nuevamente. 
Esta situación se puede presentar cuando la plataforma informática de la DIAN está con intermitencias o en una ventana de mantenimiento y envías una factura eletrónica, en algunos casos dicha entidad no responde de manera exitosa al primer envío del documento electrónico y se genera como respuesta un "Time Out" o tiempo de espera agotado, al cabo de unos minutos u horas, vuelves a intentar el envío del documento y se genera el mensaje "Regla: 90, Rechazo: Documento procesado anteriormente".  
Normalmente si la plataforma de la DIAN ya está estable y logró almacenar el documento en el primer envío, al hacer el reintento de envío del documento se obtiene una consulta del estado de dicha factura y queda almacenada correctamente en el sistema; pero si la plataforma de la DIAN no está estable o no logró almacenar en sus bases de datos toda la información completa del documento electrónico se hace necesario escalar un PQR o requerimiento técnico a dicha entidad para que internamente actualice el estado o información del documento, y cuando responda el caso escalado, se pueda en el próximo reenvío obtener una respuesta correcta con toda la información del XML validado.

Ten presente que el documento que estás enviando y generó este mensaje, lo puedes consultar directamente en la página de la DIAN, ingresando por https://www.dian.gov.co/ y en la parte inferior por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente** te logueas con tus datos y en la opción de facturas electrónicas emitidas o generadas, buscas el consecutivo o número de factura que pretendes enviar. 
Si confirmas que dicho documento ya está en los registros de la DIAN y aún así, cuando dices en el sistema ejecutar acciones no se completa el envío exitoso, puedes reportar mediante un tiquete al área de soporte de InSoft el caso con el CUFE o UUID de dicho documento para que te ayuden con posible actualización de este dato en la factura pendiente de emitir en el sistema o si es el caso, reportar la situación ante el proveedor tecnológico para que este a su vez, la escale ante la DIAN.

👉 Para orientarte mejor en la generación de un tiquete de soporte revisa el siguiente [Video: ¿Cómo generar un tiquete de soporte?](https://www.youtube.com/watch?v=E1j8_5oDJvc)

**También aplica si preguntas:**  
- ¿Qué es documento procesado anteriormente?
- ¿La factura ya está en la DIAN pero no en el sistema?
- ¿Qué hacer si se indica Documento sin AttachedDocument?
- AttachedDocument del documento no fue encontrado.


---
### ¿Qué hago si la factura electrónica aparece con errores? 

**Respuesta:**
Si son errores relacionados con el envío del documento electrónico ante la DIAN, recuerda que el sistema mostrará en el "Inspector de datos" el mensaje de error o rechazo que la entidad está indicando.

![Ejemplo de verificación de mensajes de error:](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

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


**También aplica si preguntas:**  
- ¿Qué se hace con una factura con errores?
- Tengo error en una factura ¿qué hago?

---
### ¿Qué hacer cuando el sistema indica “No se puede obtener la clave técnica”? 

**Respuesta:**
La clave técnica es un código que emite la DIAN cuando el obligado a facturar genera la numeración o resolución de facturación en el sistema MUISCA.
La clave técnica corresponde a un conjunto de datos que la DIAN autoriza y entrega al obligado a facturar, asociados a: el número de autorización, el rango autorizado y la vigencia, que permiten obtener el contenido técnico y de control de la factura electrónica, esta clave técnica es usada para la validación de la factura electrónica ante los sistemas informáticos de la DIAN.

Por lo tanto, cuando se indica que "no se puede obtener la clave técnica", puede ser que tengas mal configurada la información de la resolución de facturación electrónica en el documento de soporte que estás usando para emitir facturas. Verifica que la misma información que tienes en el formato 1876 o resolución de facturación electrónica esté plenamente registrada en el documento de soporte de factura de venta electrónica.

Mira las siguiente imágenes de ejemplo:

![Información de la resolución generada en la DIAN:](https://www.contapyme.com/conocimientocontapyme/080_IN/Resolucion_Dian.png)

![Registro de datos de la resolución en el documento de soporte en el sistema:](https://www.contapyme.com/conocimientocontapyme/080_IN/Resolucion_CP.png)

Verifica también que en el portal DIAN tengas asociada la resolución al proveedor tecnológico, para esto **Asocia la nueva resolución al proveedor tecnológico** con el que hiciste el proceso de habilitación, ingresa a: https://www.dian.gov.co/ y en la parte inferior loguéate por la opción: **Temas de interes > Factura electrónica > Facturando electrónicamente**, una vez dentro del portal ingresa por la opción *Asociar prefijos* y asocia la información de la resolución al proveedor tecnológico que usas para emitir facturas electrónicas.  
Mira la siguiente imagen de ejemplo:

![Asociación de prefijos o resolución al proveedor tecnológico:](https://www.contapyme.com/conocimientocontapyme/080_IN/Asociar_Res_a_PT.png)

👉 Para orientarte mejor en la asociación de prefijos en el portal de la DIAN, puedes consultar el siguiente [Video: ¿Cómo asociar al proveedor tecnológico el prefijo o resolución de facturación electrónica?](https://www.youtube.com/watch?v=mj7dU9QAxHQ)

**También aplica si preguntas:**  
- ¿Qué es la clave técnica?
- ¿Quién genera la clave técnica?

---
## Notas Crédito y Débito
### ¿Cómo generar una nota crédito electrónica correctamente? 

**Respuesta:**
Recuerda que una **nota crédito es un documento que anula parcial o totalmente una factura de venta electrónica**, la nota crédito al igual que una factura de venta también debe ser reportada electrónicamente a la DIAN, por lo tanto, es un documento que se debe configurar en el sistema para que sea transmitido en formato XML y validado por la DIAN.  
Dentro del sistema **dependiendo de cómo se haya generado la factura de venta electrónica (por operación de "Ingresos" o por operación de "Facturación y ventas")**, se tienen asistentes especializados para generar dicha nota crédito.

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

**También aplica si preguntas:**  
- ¿Qué es una nota crédito?
- ¿Cómo se emite una nota crédito?
- ¿Una devolución en venta es una nota crédito?

---
### ¿Cómo anular una factura con nota crédito? 

**Respuesta:**
Para anular una factura de venta electrónica, debes realizar una **nota crédito electrónica**, la nota crédito al igual que una factura de venta también debe ser reportada electrónicamente a la DIAN, por lo tanto, es un documento que se debe configurar en el sistema para que sea transmitido en formato XML y validado por la DIAN.  
Cuando realices la nota crédito, y relaciones en la operación, en el campo "Referencia" la factura que deseas anular, es muy importante que selecciones el motivo **Anulación de factura electrónica** ya que el reportar este motivo a la DIAN, dicha entidad entiende que se está anulando el CUFE (Código Único de Factura Electrónica) de la factura que se está notificando como referencia.

![Ejemplo de nota crédito con motivo **Anulación** a factura de venta generada desde la operación de **Ingresos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ingresos.png)

![Ejemplo de nota crédito con motivo **Anulación** a factura de venta generada desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ventas.png)

Ten presente que dentro del sistema **dependiendo de cómo se haya generado la factura de venta electrónica (por operación de "Ingresos" o por operación de "Facturación y ventas")**, se tienen asistentes especializados para generar dicha nota crédito.

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

**También aplica si preguntas:**  
- ¿Cómo se anula una factura de venta electrónica?
- ¿Se puede dar clic derecho anular a una factura electrónica?
- ¿Se puede anular una factura electrónica?
- ¿Se puede anular una operación de factura de venta?

---
### ¿Qué hacer si la factura ya fue aceptada y necesito hacer nota crédito? 

**Respuesta:**
Ten presente que toda factura de venta se debe transmitir electrónicamente a la DIAN para su validación, por lo tanto, como dicha factura se encuentra en los sistemas de la DIAN, se hace necesario notificar electrónicamente a la DIAN dicha **nota crédito**.  La nota crédito al igual que una factura de venta también debe ser reportada electrónicamente a la DIAN, por lo tanto, es un documento que se debe configurar en el sistema para que sea transmitido en formato XML y validado por la DIAN.  
Cuando realices la nota crédito debes relacionar en la operación, en el campo **"Referencia"** la factura que deseas afectar y luego seleccionas el motivo de la nota crédito para que en los sistemas informáticos de la DIAN quede trazabilidad de dicho proceso.

![Ejemplo de nota crédito a factura de venta generada desde la operación de **Ingresos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ingresos.png)

![Ejemplo de nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Anulacion_Opr_Ventas.png)

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

![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Ingresos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Ing.png)

![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Venta.png)

**También aplica si preguntas:**  
- Necesito hacer una nota crédito a una factura ¿cómo lo hago?
- ¿Puedo generar una nota crédito y no enviarla a la DIAN?
- ¿Cómo anulo una factura que ya tiene aceptación expresa?
- ¿Cóo genero una nota crédito a una factura con aceptación en la DIAN?


---
### ¿Por qué no puedo generar o enviar una nota crédito a la DIAN? 

**Respuesta:**
Existen diferentes motivos por los cuales no puedes enviar una nota crédito a la DIAN, a continuación te los comento:

* En la operación que usas para la generación de la nota crédito, no estás usando un documento de soporte configurado como electrónico. Al no tener el documento configurado como electrónico (implica activarle el manejo de facturación electrónica, relacionarlo con el proveedor tecnológico y activarlo como Tipo: Nota crédito electrónica), no se podrán ejecutar las acciones de envío del documento a la DIAN, generando una operación que afecta contabilidad o invetarios, pero sin transmisión electrónica.  
Ruta de acceso en el sistema para verificación de la configuración en los documentos de soporte: **Menú Básico > Doc. Soporte > Nota crédito electrónica.**

* No estás referenciando una factura válida (ya transmitida ante la DIAN) y puede ser, que primero tengas que reportar electrónicamente la factura para luego poder generarle la nota crédito.

* No cuentas con saldo vigente de documentos electrónicos (plan de documentos) contratado con InSoft (casa desarrolladora de ContaPyme / AgroWin).

* La DIAN al momento de validar el XML de la nota crédito electrónica, detectó alguna inconsistencia la cual debes solucionar. Si son errores relacionados con el envío del documento electrónico ante la DIAN, recuerda que el sistema mostrará en el "Inspector de datos" el mensaje de error o rechazo que la entidad está indicando.

![Ejemplo de verificación de mensajes de error:](https://www.contapyme.com/conocimientocontapyme/080_IN/Error_FE_01.png)

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

**También aplica si preguntas:**  
- ¿Por qué no puedo generar o enviar una nota débito a la DIAN?

---
### ¿Cómo realizar una nota crédito sin factura asociada?

**Respuesta:**
Para realizar una nota crédito sin referencia a una factura, verifica en la configuración de la operación que el campo **Referencia no esté marcado como Requerido,** para que así el sistema no te genere un mensaje de error indicando que el campo referencia es obligatorio.

![Ejemplo de ruta y verificación de configuración:](https://www.contapyme.com/conocimientocontapyme/080_IN/Cfg_Ref_NC.png)

Ten presente las siguientes consideraciones al momento de generar una nota crédito sin referencia a una factura:  

* Si en una nota crédito **indicas el motivo anulación de factura electrónica**, **se hace obligatorio que registres la "Referencia"** de la factura electrónica y **no necesitas indicar el período (mes y año)** de afectación de la nota crédito.  
Esta opción no la podrías usar para generar una nota crédito sin referencia a una factura.  

* Si en una nota crédito **indicas un motivo "diferente" a anulación de factura electrónica**, **no se hace obligatorio que registres la "Referencia"** de la factura electrónica y **sí se hace obligatorio que indiques el período (mes y año)** de afectación de la nota crédito.  
Esta opción si la podrías usar para generar una nota crédito sin referencia a una factura.

![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Ingresos**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Ing.png)

![Ejemplo de nota crédito sin referencia a factura de venta generada desde la operación de **Facturación y Ventas**:](https://www.contapyme.com/conocimientocontapyme/080_IN/NC_Sin_Ref_Venta.png)

👉 Para que tengas toda la información clara, puedes consultar los siguientes enlaces donde te explicamos cómo generar una nota crédito paso a paso según como hayas emitido la factura electrónica de venta:  
* [Video nota crédito a factura de venta generada desde la operación de **Ingresos**](https://www.youtube.com/watch?v=dm9XuPKMa5I)
* [Video nota crédito a factura de venta generada desde la operación de **Facturación y Ventas**](https://www.youtube.com/watch?v=MLkTxVZ9f8I)

**También aplica si preguntas:**  
- Necesito hacer una nota crédito sin registrar una factura ¿cómo lo hago?
- ¿Cómo genero una nota crédito sin referenciar una factura?
- ¿Cómo genero una nota débito sin referenciar una factura?
- ¿Cómo realizar una nota débito sin factura asociada?

