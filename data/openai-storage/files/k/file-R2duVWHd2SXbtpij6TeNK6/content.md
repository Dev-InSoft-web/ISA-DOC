# Registro ante DIAN y SET habilitación
[Ver el video](https://www.youtube.com/watch?v=AnDYdBw2np8)
AnDYdBw2np8

## Tema principal
Registro y pruebas de habilitación para facturación electrónica con validación previa ante la DIAN.

## Resumen general
Este video explica el proceso de registro como facturador electrónico con validación previa ante la DIAN, incluyendo la importancia de la Resolución 0064 de 2019 y los calendarios que esta establece. Se detallan las etapas de pruebas internas, pruebas de habilitación (con datos ficticios) y la salida a producción. Además, se describe paso a paso cómo registrarse en el portal de la DIAN, configurar los modos de operación, obtener el detalle de las pruebas y configurar ContaPyme para enviar los documentos de habilitación.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es necesario registrarse nuevamente como facturador electrónico si ya se utilizaba el modelo de validación posterior?
#### Respuesta
Es necesario realizar de nuevo el registro y los pasos descritos para quedar habilitado dentro del nuevo modelo de validación previa, independientemente de si ya se utilizaba la facturación electrónica con el modelo anterior.

### ¿Dónde puedo consultar mi código CIUU para saber a qué grupo pertenezco según la Resolución 64?
#### Respuesta
Debes revisar el RUT y buscar el código de la actividad principal. Los dos o tres primeros dígitos de ese código se buscan en el calendario número uno de la Resolución 64 para determinar a qué grupo pertenece tu empresa.

### ¿Cuáles son las etapas para registrarse como facturador electrónico con validación previa ante la DIAN?
#### Respuesta
Las etapas son:
1.  **Pruebas internas:** Análisis interno de la empresa para adecuar el proceso comercial.
2.  **Pruebas de habilitación:** Envío de pruebas a la DIAN para su aprobación.
3.  **Salida a producción:** Envío real de documentos electrónicos (facturas, notas débito y crédito).

### ¿Qué diferencia hay entre las pruebas de habilitación y el ambiente de producción?
#### Respuesta
Las pruebas de habilitación se realizan con información ficticia y son para que la DIAN verifique que la empresa está lista para facturar electrónicamente. El ambiente de producción, por otro lado, implica el envío de documentos electrónicos reales con validez legal y fiscal.

### ¿Cuántos documentos se deben enviar a la DIAN durante las pruebas de habilitación?
#### Respuesta
Se deben enviar 50 documentos en total, distribuidos así:
*   30 facturas electrónicas (8 aprobadas).
*   10 notas débito (1 aprobada).
*   10 notas crédito (1 aprobada).

### ¿Cómo me registro para iniciar el proceso de facturación electrónica ante la DIAN?
#### Respuesta
**Pasos:**
1.  Ingresa al portal de la DIAN: [www.dian.gov.co](www.dian.gov.co)
2.  Haz clic en la opción **Habilitación**.
3.  Selecciona si ingresas como empresa o persona y registra los datos.
4.  Verifica el correo electrónico registrado en el RUT, ya que allí recibirás un token de acceso.
5.  Una vez recibido el token, da clic en la opción **Acceder** dentro del correo electrónico.

### ¿Qué debo hacer si no tengo acceso al correo electrónico registrado en mi RUT?
#### Respuesta
Debes actualizar el RUT ante la DIAN con un correo electrónico válido antes de iniciar el proceso de registro como facturador electrónico. Si no tienes acceso al correo registrado, no podrás recibir el token de acceso necesario.

### ¿Qué debo hacer una vez que ingreso al portal de la DIAN con el token de acceso?
#### Respuesta
**Pasos:**
1.  Entra por la opción **Participantes**, luego **Facturador**.
2.  Verifica que la información de la empresa sea correcta (es de solo lectura).
3.  Haz clic en la opción **Registrar**.
4.  Acepta la advertencia de registro como facturador electrónico.
5.  Vuelve a ingresar al portal con el token de acceso.
6.  Configura los **Modos de operación**.

### ¿Cómo configuro los modos de operación si mi proveedor tecnológico es De Factory HKA?
#### Respuesta
**Pasos:**
1.  En **Configurar modos de operación**, selecciona **Software de un proveedor tecnológico**.
2.  En **Nombre de la empresa proveedora**, escoge **De Factory HKA Colombia**.
3.  En **Nombre del software**, selecciona **De Factory HKA - CO** (el NIT es 900 390 126).
4.  Haz clic en **Adicionar**.
5.  Verifica que la asociación del proveedor tecnológico De Factory aparezca en el registro de los modos de operación.

### ¿Dónde encuentro la información necesaria para configurar ContaPyme para las pruebas de habilitación?
#### Respuesta
Dentro del portal de la DIAN, después de configurar los modos de operación, entra por la opción **Rangos de pruebas** y luego en **Acciones**. Allí podrás ver el **detalle completo de las pruebas de habilitación**, que incluye información como:
*   El **test set ID** (identificador del set de pruebas).
*   El **prefijo de las pruebas**.
*   La **resolución ficticia asignada**.
*   El **rango de numeración** (desde y hasta).
*   Las **fechas de vigencia** de la habilitación.

### ¿Qué es el "test set ID" y para qué sirve?
#### Respuesta
El "test set ID" es un código alfanumérico que identifica el set de pruebas que estás realizando ante la DIAN. Debes notificar este identificador a la DIAN para que sepan que los documentos enviados son solo pruebas y no datos reales.

### ¿Qué debo hacer después de finalizar el envío de documentos en modo de habilitación y recibir la notificación de la DIAN de que las pruebas se han superado satisfactoriamente?
#### Respuesta
El siguiente paso es definir la fecha de salida a producción en el portal de la DIAN. Recuerda que esta fecha no puede exceder la fecha máxima indicada en la Resolución 64.

### ¿Qué significa la responsabilidad 52 en el RUT?
#### Respuesta
La responsabilidad 52 en el RUT significa que estás registrado como **facturador electrónico** bajo el nuevo modelo de validación previa. Esta responsabilidad reemplaza las anteriores responsabilidades 37 y 38.

### ¿Qué pasos debo seguir para configurar la facturación electrónica en ContaPyme?
#### Respuesta
1.  Adquirir el paquete de documentos electrónicos y el certificado digital (si es necesario).
2.  Activar la configuración del manejo de facturación electrónica dentro de la empresa en ContaPyme.
3.  Personalizar la plantilla de la representación gráfica (opcional).
4.  Configurar los documentos de soporte (factura de venta electrónica, nota débito electrónica y nota crédito electrónica) con la información del detalle del set de pruebas de la DIAN (resolución, prefijo, rango de numeración, fechas de vigencia).
5.  Verificar que los clientes tengan un correo electrónico válido (se sugiere usar un correo de prueba para las pruebas de habilitación).

### ¿Es recomendable usar la misma área de trabajo en ContaPyme para las pruebas de habilitación y la operación normal de la empresa?
#### Respuesta
Se recomienda crear otra área de trabajo dentro del sistema ContaPyme para hacer el proceso de habilitación, o tener presente que si se hace dentro de la misma área de trabajo o contabilidad de la empresa, la información que se está enviando es de forma temporal y dicha información después se va a borrar, porque no debe afectar ni la contabilidad, ni los inventarios, ni la cartera.

---

# Asociar prefijo para resolución de facturación electrónica DIAN
[Ver el video](https://www.youtube.com/watch?v=mj7dU9QAxHQ)
Asociar prefijo para resolución de facturación electrónica DIAN

## Tema principal
Asociación de prefijos de resolución de facturación electrónica en el portal de la DIAN.

## Resumen general
Este video explica cómo asociar los prefijos de la resolución de facturación electrónica de tu empresa en el portal de la DIAN. El proceso implica acceder al portal de la DIAN, ingresar los datos de la empresa, validar el acceso mediante un token enviado al correo electrónico, y luego configurar el rango de numeración seleccionando el proveedor y el prefijo correspondiente a la resolución. El objetivo es habilitar la facturación electrónica cumpliendo con los requisitos de la DIAN.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo al portal de la DIAN para asociar los prefijos de mi resolución de facturación electrónica?
#### Respuesta
Debes ingresar a la página web dian.gov.co y buscar la opción de factura electrónica. Dentro de esta sección, selecciona la opción "Facturando electrónicamente".

### ¿Qué datos necesito para ingresar al portal de la DIAN?
#### Respuesta
Necesitarás ingresar los datos correspondientes a tu empresa.

### ¿Cómo valido mi acceso al portal de la DIAN?
#### Respuesta
Después de ingresar los datos de tu empresa, la DIAN enviará un Token de acceso a tu correo electrónico. Debes usar este token para validar tu acceso al portal.

### ¿Dónde configuro los rangos de numeración en el portal de la DIAN?
#### Respuesta
Una vez que hayas accedido al portal de la DIAN, debes ir a la opción de "Configuración" y luego seleccionar "Rangos de numeración".

### ¿Cómo configuro el proveedor y el prefijo de mi resolución en el portal de la DIAN?
#### Respuesta
Dentro de la sección "Rangos de numeración", sigue estos pasos:
1.  En "Proveedor", selecciona la opción "Cadena".
2.  En "Prefijo", selecciona tu resolución correspondiente.
3.  Haz clic en "Agregar" y luego en "Aceptar".

---

# Bienvenida FE Cenet
[Ver el video](https://www.youtube.com/watch?v=OjYLK73UfMg)
OjYLK73UfMg

## Tema principal
Guía para iniciar la facturación electrónica con ContaPyme a través del portal de clientes.

## Resumen general
Este video explica el proceso para iniciar la facturación electrónica con ContaPyme. El usuario aprende cómo acceder al portal de clientes, registrar su empresa (si es necesario), completar los pasos requeridos por la DIAN, cargar los documentos necesarios y finalmente, configurar ContaPyme para la emisión de facturas electrónicas. Se enfatiza la importancia de tener la factura de compra del plan de facturación electrónica y se ofrece soporte técnico ilimitado para cualquier duda durante el proceso.

## Preguntas Frecuentes (FAQ)

### ¿Cómo ingreso al portal de clientes de ContaPyme para iniciar el proceso de facturación electrónica?
#### Respuesta
1.  Ingrese a contapyme.com.
2.  Dé clic en **Portal Clientes**.
3.  Elija una de las opciones disponibles para ingresar: Facebook, cuenta de Google, cuenta de Microsoft, o su cuenta registrada en Insoft.
4.  Si es la primera vez que ingresa, escriba el correo registrado en ContaPyme y dé clic en **Solicitar Contraseña**. Recibirá un correo con una contraseña para ingresar.

### ¿Qué hago si mi empresa no está creada en el portal de clientes al ingresar para iniciar la facturación electrónica?
#### Respuesta
1.  Dentro del portal de clientes, en la sección **Facturación Electrónica**, dé clic en **Agregar**.
2.  Escriba los datos solicitados de su empresa.
3.  Dé clic en **Continuar**.

### ¿Cuáles son los pasos a seguir para el proceso de facturación electrónica en el portal de clientes?
#### Respuesta
En la parte superior del portal de clientes, se visualizan los siguientes pasos:
1.  **Registro Dian:** Aquí encontrará las instrucciones para registrarse como facturador electrónico ante la Dian.
2.  **Solicitar Resolución Dian:** Aquí solicitará la resolución de facturación electrónica ante la Dian.
3.  **Cargar Documentos:** Aquí cargará los documentos solicitados por el portal.
4.  **Finalizar Habilitación:** Aquí registrará la fecha en que comenzará a emitir facturas electrónicas y asociará la resolución con su proveedor tecnológico en el portal de la Dian.
5.  **Configurar en ContaPyme:** Aquí activará el uso de facturación electrónica en ContaPyme y configurará los documentos de soporte en modo producción.

### ¿Dónde encuentro las instrucciones para registrarme como facturador electrónico en la Dian?
#### Respuesta
Las instrucciones para el registro ante la Dian se encuentran disponibles en el **Registro Dian** dentro del portal de clientes, y también se ofrecen en un video tutorial y en una guía completa de registro.

### ¿Qué debo hacer después de completar el registro ante la Dian?
#### Respuesta
Después de completar el registro ante la Dian, debe:
1.  Dar clic en **Subir Test Set ID** y registrar el código del identificador del set de pruebas.
2.  Dar clic en **Subir Requisito**.
3.  Dar clic en **Siguiente** para avanzar al siguiente paso.

### ¿Cómo solicito la resolución de facturación electrónica ante la Dian?
#### Respuesta
Dentro del paso **Solicitar Resolución Dian**, siga las instrucciones proporcionadas en el portal de clientes. Una vez que tenga el formato de resolución de facturación electrónica, descárguelo y marque la casilla **"Ya completé este paso"**.

### ¿Qué es la resolución de facturación de contingencia y cómo la solicito?
#### Respuesta
La resolución de facturación de contingencia se utiliza en caso de problemas con la facturación electrónica normal. Puede solicitarla siguiendo las instrucciones del paso **Solicitar Resolución Dian**, seleccionando "De contingencia" en el tipo de facturación.

### ¿Cómo cargo los documentos solicitados en el portal de clientes?
#### Respuesta
1.  En el paso **Cargar Documentos**, descargue los documentos donde aparece el botón **Generar**.
2.  Imprima, diligencie y escanee el documento (o fírmelo digitalmente).
3.  Suba el documento al portal.

### ¿Qué sucede si un documento es rechazado en el portal de clientes?
#### Respuesta
Se le indicará el motivo del rechazo para que pueda corregir el documento y cargarlo nuevamente al portal lo antes posible.

### ¿Qué debo hacer en el paso "Finalizar Habilitación" en el portal de clientes?
#### Respuesta
1.  Registre la fecha en que comenzará la emisión de facturas electrónicas en su empresa.
2.  Marque **"Ya completé este paso"** cuando la haya registrado en el portal de la Dian.
3.  Asocie la resolución con su proveedor tecnológico en el portal de la Dian.
4.  Marque **"Ya completé este paso"** después de asociar la resolución.

### ¿Cómo activo la facturación electrónica en ContaPyme y configuro los documentos de soporte en modo producción?
#### Respuesta
En el paso **Configurar en ContaPyme**, active el uso de facturación electrónica y configure los documentos de soporte en modo producción. Un asesor de ContaPyme validará la asociación exitosa en ContaPyme, lo cual tomará aproximadamente un día hábil.

### ¿Cómo sabré si estoy listo para emitir facturación electrónica?
#### Respuesta
Una vez que se complete la validación de la asociación, recibirá un mensaje en su correo electrónico confirmando que está listo para emitir facturación electrónica.

### ¿Cómo puedo obtener soporte técnico si tengo dudas durante el proceso de facturación electrónica?
#### Respuesta
Solicite un tiquete de soporte con el tema **Consulta de Estado FE**. Puede generar su tiquete desde el sistema ContaPyme en el teléfono verde, o desde el portal de clientes en la opción **Soporte Técnico**.

---

# Comprobante Informe Diario de Ventas
[Ver el video](https://www.youtube.com/watch?v=PDAtYTjIcqw)
PDAtYTjIcqw

## Tema principal
Generación e interpretación del Comprobante Informe Diario de Ventas en ContaPyme.

## Resumen general
Este video explica qué es el Comprobante Informe Diario de Ventas y cómo generarlo en ContaPyme.  Muestra cómo acceder al informe, configurar las opciones de filtrado y agrupación, y personalizar la información que se muestra, como el resumen de impuestos y el extracto del movimiento contable.  Además, detalla la interpretación del informe generado, incluyendo la información sobre ventas, devoluciones, medios de pago y numeración de documentos.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el Comprobante Informe Diario de Ventas?
#### Respuesta
Es un informe que muestra todas las ventas realizadas en una fecha específica, incluyendo el valor bruto, el valor de descuento, el valor del IVA y el valor neto de cada venta registrada.

### ¿Dónde encuentro la opción para generar el Comprobante Informe Diario de Ventas en ContaPyme?
#### Respuesta
Para encontrar la opción en ContaPyme, sigue estos pasos:
1.  Haz clic en la pestaña **Inventarios**.
2.  En la cinta de opciones, dentro de la sección de **Informes**, haz clic en la flecha desplegable de **Ventas**.
3.  Selecciona la opción **Informe Diario**.

### ¿Qué formatos de presentación tiene el Comprobante Informe Diario de Ventas?
#### Respuesta
El Comprobante Informe Diario de Ventas tiene dos formatos de presentación:
*   **Formato Tirilla**
*   **Formato Hoja Completa**

### ¿Cuál es la diferencia entre los dos tipos de "Comprobante Informe Diario de Ventas" que aparecen en el menú?
#### Respuesta
*   El primer "Comprobante Informe Diario de Ventas" aplica para las **operaciones de ventas**.
*   El segundo "Comprobante Informe Diario de Ventas" aplica para las **operaciones de ingresos**.

### ¿Cómo configuro la fecha para generar el Comprobante Informe Diario de Ventas?
#### Respuesta
En la ventana de configuración del comprobante, encontrarás los campos **Fecha Inicial** y **Fecha Final**.  Para generar el informe diario, la Fecha Inicial y la Fecha Final deben ser la misma fecha.  Sin embargo, también puedes generar el informe para un rango de fechas si lo necesitas.

### ¿Cómo puedo filtrar la información en el Comprobante Informe Diario de Ventas?
#### Respuesta
El comprobante ofrece una opción de **filtro avanzado** o **filtro personalizado**.  Puedes determinar la condición que desees aplicar para filtrar los datos según tus necesidades.

### ¿Cómo puedo agrupar la información en el Comprobante Informe Diario de Ventas?
#### Respuesta
Puedes agrupar la información por:
*   **Departamento/Líneas:** Si tus productos están asociados a un departamento o línea.
*   **Productos:**  Lista todos los productos de todas las facturas del día.
*   **Factura:** Lista todos los números de factura con su respectiva información.

### ¿Cómo imprimo el resumen de los impuestos liquidados en el Comprobante Informe Diario de Ventas?
#### Respuesta
En la ventana de configuración del comprobante, habilita la opción para **imprimir el resumen de los impuestos liquidados**.

### ¿Cómo puedo ver el movimiento contable en el Comprobante Informe Diario de Ventas?
#### Respuesta
En la ventana de configuración del comprobante, activa la opción para **imprimir el extracto de movimiento contable**.  Esto mostrará las cuentas que se movieron en las operaciones, indicando si se movieron por el débito o por el crédito, así como el total del movimiento.

### ¿Qué opciones adicionales puedo configurar en el Comprobante Informe Diario de Ventas?
#### Respuesta
Puedes configurar las siguientes opciones:
*   **Imprimir el extracto de movimiento contable:** Muestra las cuentas que se movieron y por dónde (débito o crédito).
*   **Mostrar al final el resumen de numeración de documentos para todas las máquinas:**  Muestra un resumen de los documentos utilizados en cada equipo, con el documento inicial, el documento final y el total de transacciones.
*   **Calidad borrador:** Activar solo si se va a imprimir en una impresora matriz de punto.
*   **Visualizar fecha y hora en el pie de página:**  Muestra la fecha y la hora en que se generó el informe.

### ¿Qué información muestra el resumen de numeración de documentos al final del informe?
#### Respuesta
El resumen de numeración de documentos muestra, por cada equipo:
*   El nombre del equipo.
*   El rango de documentos utilizados (Documento Inicial y Documento Final).
*   El total de transacciones realizadas en ese equipo.

### ¿Qué información se muestra en el cuerpo principal del Comprobante Informe Diario de Ventas?
#### Respuesta
El cuerpo del informe muestra:
*   La máquina o computador desde donde se generó el documento.
*   El rango de numeración de documentos (facturas y devoluciones).
*   La lista de los documentos con su información: IVA, cantidad, valor bruto, valor descuento, valor IVA y valor neto.
*   El número total de transacciones y el total general de las ventas.
*   El resumen de los medios de pago utilizados.

---

# Configuración de letra para impresora
[Ver el video](https://www.youtube.com/watch?v=Mgv-m762hlI)
[Configuración de letra para impresora]

## Tema principal
Modificar la fuente de impresión en facturas POS dentro de ContaPyme.

## Resumen general
Este video explica cómo personalizar la fuente utilizada al imprimir facturas POS en ContaPyme. El usuario aprende a acceder a la configuración de la operación, desactivar la configuración por defecto del documento de impresión, y seleccionar una fuente, estilo, tamaño y color específicos para la impresión de facturas. La configuración se puede aplicar a un solo usuario, a un perfil o a todos los usuarios del sistema.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la configuración de letra predeterminada en ContaPyme al imprimir una factura?
#### Respuesta
Por defecto, las operaciones en ContaPyme se imprimen utilizando el documento de impresión asociado, el cual ya tiene configurado el diseño, incluyendo el encabezado, logo, fuente, estilo de letra y color.

### ¿Cómo accedo a la configuración de una operación en ContaPyme para modificar la letra de impresión?
#### Respuesta
Para acceder a la configuración de una operación:
1. Abre el **Manejador de Operaciones**.
2. Haz clic derecho sobre la operación (por ejemplo, una factura POS) y selecciona **Modificar**.
3. Dentro de la operación, haz clic en la opción **Operación**.
4. Selecciona la opción **Configurar operación**.

### ¿Qué alcance puede tener la configuración de la letra de impresión?
#### Respuesta
La configuración de la letra de impresión puede tener tres alcances diferentes:
*   **Para este usuario:** La configuración se aplica solo al usuario actual.
*   **Para un perfil específico:** La configuración se aplica a todos los usuarios que pertenezcan a un perfil específico.
*   **Para todos los usuarios:** La configuración se aplica a todos los usuarios del sistema.

### ¿Dónde se encuentra la opción para configurar la letra de la impresora dentro de ContaPyme?
#### Respuesta
La opción para configurar la letra de la impresora se encuentra dentro de la ventana de configuración de la operación, en la sección de **Configuración de periféricos**.

### ¿Cómo personalizo la fuente para imprimir una factura de tirilla en ContaPyme?
#### Respuesta
Para personalizar la fuente de impresión de la factura:
1. Sigue los pasos para acceder a la **Configuración de periféricos** dentro de la configuración de la operación (ver "¿Cómo accedo a la configuración de una operación en ContaPyme para modificar la letra de impresión?").
2. En la sección **Configuración de periféricos**, selecciona la opción **Letra para impresora**.
3. Desactiva la opción que indica que la factura tirilla tomará las configuraciones del documento de impresión. Esto habilitará el botón **Configurar fuente**.
4. Haz clic en el botón **Configurar fuente**.
5. Selecciona la fuente, el estilo (normal, negrita, oblicua), el tamaño y los efectos (tachado, subrayado) deseados.
6. Opcionalmente, selecciona el color de la impresión.
7. Haz clic en **Aceptar** en la ventana de fuente.
8. Haz clic en **Aceptar** en la ventana de configuración para guardar los cambios.

### ¿Qué opciones de personalización de fuente están disponibles en ContaPyme?
#### Respuesta
Al personalizar la fuente en ContaPyme, puedes modificar:
*   **Fuente:** Selecciona entre una variedad de fuentes disponibles en el sistema.
*   **Estilo de fuente:** Elige entre normal, negrita u oblicua.
*   **Tamaño:** Selecciona un tamaño predefinido o ingresa un tamaño personalizado.
*   **Efectos:** Activa o desactiva los efectos de tachado o subrayado.
*   **Color:** Selecciona el color de la impresión.

### ¿Qué ocurre si no desactivo la opción predeterminada en la configuración de letra para impresora?
#### Respuesta
Si la opción predeterminada está activada, la factura de tirilla utilizará la fuente y el estilo configurados en el documento de impresión asociado a la operación, ignorando cualquier configuración de fuente personalizada que intentes aplicar.

---

# Configuración del cajón monedero
[Ver el video](https://www.youtube.com/watch?v=0jm3iZNfwSc)
[Configuración del cajón monedero]

## Tema principal
Configuración del cajón monedero en ContaPyme para control de dinero en puntos de venta.

## Resumen general
Este video explica cómo configurar un cajón monedero en ContaPyme, permitiendo que se abra automáticamente al imprimir una factura de venta. Se describen dos métodos de configuración: cajón conectado directamente a la impresora y cajón conectado directamente al computador. El video proporciona instrucciones sobre cómo activar la función, seleccionar el comando de apertura correcto para la impresora (o el puerto en el caso de conexión directa al PC) y asociar la apertura del cajón a la impresión de la factura.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un cajón monedero y por qué es útil en ContaPyme?
#### Respuesta
Un cajón monedero es un periférico utilizado en puntos de venta para guardar el dinero recibido de los clientes. Integrado con ContaPyme, permite controlar el acceso al dinero, abriéndose automáticamente al imprimir una factura y evitando aperturas no autorizadas, lo cual es vital para el control de las ventas.

### ¿Para qué operaciones de ContaPyme está disponible la configuración de apertura de cajón monedero?
#### Respuesta
La apertura de cajón monedero está disponible para las operaciones de **factura de venta**, **punto de venta** y **abono a cuentas por cobrar**.

### ¿Cómo accedo a la configuración de apertura de cajón monedero en ContaPyme?
#### Respuesta
Para acceder a la configuración, sigue estos pasos:
1.  Dirígete al **Manejador de Operaciones** (parte superior izquierda).
2.  Selecciona la operación deseada (ej. **Punto de Venta**). Puedes encontrarla en la cinta de accesos rápidos o a través de **Más > Ventas > Punto de Venta**.
3.  En la operación, haz clic en **Operación > Configurar Operación** (parte superior izquierda).
4.  Indica si la configuración es para todos los usuarios.
5.  En el menú de la parte izquierda, busca y selecciona el apartado **Apertura de Cajón Monedero**.

### ¿Cuáles son las dos formas de configurar la apertura del cajón monedero en ContaPyme?
#### Respuesta
Existen dos formas de configurar la apertura del cajón monedero:
1.  Cajón monedero conectado directamente a la **impresora**.
2.  Cajón monedero conectado directamente al **computador**.

### ¿Cómo configuro la apertura del cajón monedero si está conectado a la impresora?
#### Respuesta
Si el cajón monedero está conectado a la impresora mediante un cable RJ11, sigue estos pasos:
1.  Dentro de la configuración de **Apertura de Cajón Monedero**, habilita la opción correspondiente.
2.  Selecciona el **comando de apertura** adecuado para tu impresora. El comando genérico recomendado es **P,0,8,8**.
3.  Selecciona la opción para que el cajón se abra al **imprimir la factura de venta en tirilla**.
4.  Haz clic en **Aceptar** para guardar la configuración.

### ¿Qué debo hacer si no conozco el comando de apertura para mi impresora?
#### Respuesta
Si no conoces el comando de apertura para tu impresora, puedes buscar ayuda en el manual de la impresora o contactar a un técnico especializado.

### ¿Cómo configuro la apertura del cajón monedero si está conectado directamente al computador?
#### Respuesta
Si el cajón monedero está conectado directamente al computador, sigue estos pasos:
1. Dentro de la configuración de **Apertura de Cajón Monedero**, habilita la opción correspondiente.
2.  Selecciona el **puerto** al que está conectado el cajón monedero. Puedes encontrar esta información en el administrador de dispositivos del computador o solicitando ayuda a un técnico.
3.  Ingresa la **cadena para enviar al puerto**. Esta información también debe ser proporcionada por un técnico o el proveedor del cajón monedero.
4. Haz clic en **Aceptar** para guardar la configuración.

### ¿Dónde puedo encontrar el puerto al que está conectado el cajón monedero si está conectado directamente al computador?
#### Respuesta
Puedes encontrar el puerto en el **administrador de dispositivos** de tu computador o solicitando ayuda a un técnico especializado.

---

# Configuración del lector de código barras en ContaPyme
[Ver el video](https://www.youtube.com/watch?v=VD9Qg-SAJZc)
VD9Qg-SAJZc

## Tema principal
Configuración del lector de código de barras en ContaPyme.

## Resumen general
Este video explica cómo configurar un lector de código de barras en ContaPyme para facilitar la captura de información de productos durante la operación de ventas. Aprenderás cómo asignar códigos de barras a los productos al crearlos en el sistema y cómo recodificar productos existentes para que utilicen códigos de barras. Además, se describe una configuración adicional para lectores de código de barras que presentan inconsistencias en la lectura.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un lector de código de barras y para qué se utiliza en ContaPyme?
#### Respuesta
Un lector de código de barras es un dispositivo que escanea y lee la información contenida en un código de barras. Estos códigos almacenan datos representativos en números y letras, que luego son interpretados por el sistema ContaPyme para identificar productos y agilizar el proceso de ventas.

### ¿Cómo configuro un lector de código de barras en ContaPyme?
#### Respuesta
La configuración es sencilla:
1.  Conecta el lector de código de barras a tu computador. Windows instalará automáticamente los drivers necesarios.
2.  Asigna el código de barras escaneado al código del producto dentro de ContaPyme.

### ¿Cómo asigno un código de barras a un producto al crearlo en ContaPyme?
#### Respuesta
Sigue estos pasos:
1.  Ve a **Inventarios > Elementos de Inventario**.
2.  Haz clic en el botón **Crear** (en la parte superior izquierda) o haz clic derecho y selecciona **Crear**.
3.  En el campo **Código del Producto**, escanea el código de barras con el lector. El sistema tomará automáticamente el código.
4.  Completa la información restante del producto y guarda.

### ¿Cómo asigno un código de barras a un producto que ya existe en ContaPyme?
#### Respuesta
Sigue estos pasos:
1.  Ve a **Inventarios > Elementos de Inventario**.
2.  Haz clic derecho sobre el producto al que deseas asignar el código de barras y selecciona **Recodificar**.
3.  En el campo **Código**, borra el código existente (si lo hay).
4.  Escanea el código de barras con el lector. El sistema tomará automáticamente el nuevo código.
5.  Guarda los cambios.

### ¿Qué debo hacer si el lector de código de barras presenta inconsistencias al leer en ContaPyme?
#### Respuesta
ContaPyme ofrece una configuración especial para lectores de código de barras que no son genéricos y presentan problemas de lectura. Activa el "modo lector de código de barras" siguiendo estos pasos:
1.  Ve a **Operación > Configurar Operación > Configuración para todos los usuarios**.
2.  Busca el apartado **Lector de Código de Barras**.
3.  Activa la opción **Modo lector de código de barras**.
4.  Haz clic en **Aceptar** para guardar los cambios.

### ¿Dónde debo activar el modo lector de código de barras, en factura de venta o punto de venta?
#### Respuesta
Puedes activar el modo lector de código de barras en ambas operaciones, ya sea en la factura de venta o en el punto de venta. La ruta para activarlo es la misma en ambas: **Operación > Configurar Operación > Configuración para todos los usuarios**.

---

# Configuración en ContaPyme®: Activación de facturación electrónica
[Ver el video](https://www.youtube.com/watch?v=guZZb1YI7wo)
guZZb1YI7wo

## Tema principal
Activación del manejo de facturación electrónica y el uso de la plataforma de documentos en ContaPyme.

## Resumen general
Este video explica cómo activar las opciones de facturación electrónica y el uso de la plataforma de documentos dentro de ContaPyme.  Es un paso fundamental para configurar el sistema y poder emitir facturas electrónicas. El proceso es simple y se realiza desde el explorador gráfico de la empresa.

## Preguntas Frecuentes (FAQ)

### ¿Dónde se activa la facturación electrónica en ContaPyme?
#### Respuesta
La facturación electrónica se activa desde el explorador gráfico de la empresa en servicios electrónicos.

### ¿Qué dos opciones se deben activar en el explorador gráfico de la empresa para usar la facturación electrónica?
#### Respuesta
Se deben activar las opciones:
1.  Manejo de facturación electrónica.
2.  Uso de la plataforma de documentos.

### ¿Cuál es el primer paso para activar la facturación electrónica en ContaPyme?
#### Respuesta
El primer paso es validar desde el explorador gráfico de la empresa en servicios electrónicos que tengamos activo el manejo de facturación electrónica y el uso de la plataforma de documentos.

### ¿Qué botón se debe presionar después de activar las opciones de facturación electrónica?
#### Respuesta
Se debe presionar el botón "Aceptar" para guardar los cambios y confirmar la autorización.

---

# Configuración en ContaPyme®: Tipos de documentos de soporte
[Ver el video](https://www.youtube.com/watch?v=E1j8_5oDJvc)
E1j8_5oDJvc

## Tema principal
Configuración de los tipos de documentos de soporte en ContaPyme.

## Resumen general
Este video explica cómo configurar los tipos de documentos de soporte en ContaPyme, específicamente el documento 1010. Se detalla cómo modificar la información básica del documento, validar la máscara, activar la opción para facturación electrónica, configurar la numeración y las resoluciones, así como establecer opciones de publicación, envío de email y facturación electrónica. También se muestra cómo configurar la publicación del documento y las notificaciones.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la configuración de los tipos de documentos de soporte en ContaPyme?
#### Respuesta
Debes dirigirte a la pestaña de **Básico** y luego a la sección de **Documento Soporte**.

### ¿Cómo modifico un tipo de documento de soporte existente, por ejemplo, el 1010?
#### Respuesta
1.  Dentro de la sección **Documento Soporte**, busca el documento **1010**.
2.  Haz clic derecho sobre él.
3.  Selecciona la opción **Modificar**.

### ¿Qué opciones puedo cambiar en la configuración de un tipo de documento de soporte?
#### Respuesta
Puedes cambiar el **nombre** del documento, seleccionar la **empresa**, validar la **máscara** desde la resolución y activar la opción **Hace parte de la facturación electrónica**.

### ¿Qué tipos de numeración puedo seleccionar para un documento de soporte?
#### Respuesta
Puedes seleccionar entre numeración **manual**, **automática** o **tipo de factura de venta**.

### ¿Dónde configuro la información de la resolución asociada al documento de soporte?
#### Respuesta
Dentro de la configuración del documento, debes ir a la opción de **Resoluciones**. Allí podrás ingresar el **número de resolución**, el **consecutivo inicial**, el **consecutivo final**, la **fecha inicial** y la **vigencia** de la resolución.

### ¿Dónde puedo encontrar la vigencia de la resolución?
#### Respuesta
La vigencia de la resolución se encuentra en la misma resolución. En el ejemplo del video la vigencia es de 18 meses.

### ¿Qué acciones puedo configurar para el documento de soporte?
#### Respuesta
En la opción **Acciones**, puedes activar o desactivar:
- **Publicación en plataforma de documentos**
- **Envío de email automático**
- **Solicitar aprobación al finalizar**

### ¿Cómo configuro la impresión del documento?
#### Respuesta
En la opción **Impresión del documento**, puedes seleccionar la impresión por defecto y un documento de impresión alterno, como el **130**.

### ¿Cómo configuro el envío de email del documento?
#### Respuesta
En la opción **Envío de email**, puedes seleccionar:
-   **Nombre usuario**
-   **Nombre empresa**
-   **Enviar a tercero**
En **Tipo de contenido email**, selecciona **Plantilla de contenido** y busca la plantilla **Notificación de documento electrónico**. También puedes seleccionar el formato del XML, como **XML comprimidos en archivo zip**.

### ¿Cómo configuro la facturación electrónica para el documento de soporte?
#### Respuesta
En la opción **Facturación electrónica**, selecciona el **proveedor** (en el ejemplo, **cadena**) y administra la conexión con el proveedor realizando un **test de conexión**.

### ¿Qué debo tener en cuenta al configurar la publicación del documento?
#### Respuesta
En la opción **Publicación del documento**, debes seleccionar una fecha anterior a la fecha inicial de la resolución. En el campo de acciones se recomienda quitar el check a seleccionar llamada.

### ¿Dónde puedo desactivar las notificaciones?
#### Respuesta
En la opción **Notificaciones**, puedes desactivar la notificación de **Publicación del documento**.

---

# Impresión de Documento Alterno en Facturación Electrónica
[Ver el video](https://www.youtube.com/watch?v=LQWTihp4ipI)
[LQWTihp4ipI]

## Tema principal
Configuración y uso del documento alterno (tiquete) para agilizar la facturación electrónica en ContaPyme.

## Resumen general
Este video explica qué es y cómo configurar el documento alterno, también conocido como tiquete de venta, en ContaPyme. Esta funcionalidad permite imprimir un comprobante con la información esencial de la venta (NIT, productos, costos, cambio, forma de pago) para entregar al cliente inmediatamente, mientras que el sistema realiza las acciones de facturación electrónica en segundo plano, incluyendo el envío a la DIAN. Se explica cómo configurarlo y cómo imprimir tanto el tiquete como la representación gráfica de la factura electrónica.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un documento alterno en ContaPyme?
#### Respuesta
Un documento alterno en ContaPyme es un tiquete de venta que se puede imprimir para entregar al cliente de forma inmediata, agilizando los procesos de venta, mientras que la factura electrónica se procesa y se envía a la DIAN en segundo plano. Este tiquete contiene información relevante como el NIT, los productos vendidos, el costo, el cambio y la forma de pago.

### ¿Cuál es la diferencia entre el documento alterno y la representación gráfica de la factura electrónica?
#### Respuesta
El documento alterno es un tiquete simplificado para agilizar la venta, mientras que la representación gráfica es la factura electrónica completa, que se puede imprimir una vez que la DIAN la ha validado y se han completado las acciones necesarias.

### ¿El tiquete de venta reemplaza a la factura electrónica?
#### Respuesta
No, el tiquete de venta no reemplaza la factura electrónica. Es simplemente un comprobante temporal que se entrega al cliente mientras se procesa la factura electrónica. El cliente recibirá la factura electrónica formal por los canales definidos.

### ¿Cómo configuro el documento alterno en ContaPyme?
#### Respuesta
Para configurar el documento alterno, sigue estos pasos:

1.  Dirígete a la pestaña **Básico**.
2.  Ve al apartado de **Documentos de Soporte**.
3.  Selecciona el documento de soporte que utilizas para la facturación electrónica (por ejemplo, el 1010).
4.  Ve al apartado de **Impresión de Documento**.
5.  Escoge la opción **Imprimir documento alterno antes de ejecutar acciones**.
6.  En la opción de documento de impresión alterno, busca y selecciona el documento llamado **Tiquete**.
7.  Haz clic en **Aceptar**.

### ¿Cómo imprimo el tiquete de venta al realizar una factura electrónica?
#### Respuesta
Una vez configurado el documento alterno, al realizar una factura de venta y seleccionar la opción de enviar a la DIAN, el sistema imprimirá automáticamente el tiquete de venta para que lo puedas entregar al cliente.

### ¿Puedo imprimir la factura electrónica después de haber impreso el tiquete de venta?
#### Respuesta
Sí, puedes imprimir la factura electrónica (representación gráfica) después de que se hayan completado las acciones de facturación electrónica, incluyendo el envío a la DIAN. Puedes hacerlo de la siguiente manera:

1.  Dentro de la operación de la factura, presiona **Control + G** o haz clic derecho y selecciona **Imprimir como**.
2.  Selecciona el documento que tengas configurado para la facturación electrónica.
3.  Haz clic en **Vista Previa** o **Imprimir**.

---

# Facturación Electrónica 2020 Comunidad ContaPyme®
[Ver el video](https://www.youtube.com/watch?v=IPDFQxRal6I)

## Tema principal
Explicación completa sobre facturación electrónica con validación previa, incluyendo conceptos, requisitos, calendarios de implementación y cómo usar ContaPyme para este proceso.

## Resumen general
Este video explica detalladamente la facturación electrónica con validación previa en Colombia, cubriendo desde los conceptos básicos y requisitos legales hasta los calendarios de implementación definidos por la DIAN. Se aclaran las diferencias entre validación posterior y validación previa, se detalla el rol del proveedor tecnológico y se explica cómo ContaPyme facilita la integración de la facturación electrónica con otros procesos empresariales como contabilidad, inventarios y cartera. Además, se desmienten algunos mitos comunes sobre la facturación electrónica y se muestra cómo realizar el proceso de habilitación y emisión de facturas electrónicas utilizando el software ContaPyme. También se explica el proceso para facturar al exterior y el manejo de los días sin IVA en ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la factura electrónica?
#### Respuesta
La factura electrónica es un documento con validez legal similar a la factura de papel o factura por computador que cumple con los requisitos del artículo 617 del Estatuto Tributario. Es un documento electrónico que sirve para soportar transacciones de venta de bienes y servicios y tiene un archivo en formato XML, incluyendo firma digital y un código CUFE, que debe ser reportado a la DIAN.

### ¿Cuál es la diferencia entre validación posterior y validación previa en la facturación electrónica?
#### Respuesta
En **validación posterior** (modelo vigente hasta marzo de 2019):
1. Se generaba el documento electrónico.
2. Se enviaba al cliente y a la DIAN.
3. La DIAN validaba el documento días después y podía notificar sobre él.

En **validación previa** (modelo vigente actualmente):
1. Se genera el documento electrónico.
2. Se valida ante la DIAN.
3. Una vez validado por la DIAN, se envía al cliente.

Además, en validación previa se realizan 264 validaciones inmediatas por parte de la DIAN (en validación posterior eran solo 8) y requiere una etapa de habilitación previa al envío de documentos en ambiente productivo.

### ¿Cuál es el proceso para que mi empresa facture electrónicamente?
#### Respuesta
El proceso general es el siguiente:
1.  Su empresa envía la factura de venta desde su ERP (como ContaPyme) al proveedor tecnológico.
2.  El proveedor tecnológico construye la información en un archivo XML, incorporando el CUFE y el código QR a la representación gráfica.
3.  El proveedor envía la factura XML a la DIAN.
4.  La DIAN revisa, valida y da una respuesta al proveedor tecnológico.
5.  El proveedor tecnológico envía la factura XML y la representación gráfica con la aprobación de la DIAN al cliente.

### ¿Cuál es la diferencia entre un proveedor tecnológico y el software gratuito de la DIAN?
#### Respuesta
Un **proveedor tecnológico** integrado a un ERP como ContaPyme facilita la integración de la facturación electrónica con contabilidad, inventarios y cartera. Permite analizar la información de ventas, controlar inventarios, generar informes de cuentas por cobrar y manejar movimientos contables e información tributaria.

El **software gratuito de la DIAN** permite registrar facturas y clientes, pero no se integra con otros sistemas contables o administrativos, lo que implica un doble registro de información y no optimiza el tiempo ni los recursos de la empresa.

### ¿Qué es el XML en la facturación electrónica?
#### Respuesta
El XML es una especificación técnica que permite describir y organizar datos mediante etiquetas estandarizadas. Estas etiquetas permiten marcar e indicar la información. El XML cumple con los parámetros de la DIAN, contiene todos los datos de la factura, incluye la firma electrónica y el código CUFE.

### ¿Qué es la firma electrónica y para qué sirve?
#### Respuesta
La firma electrónica permite identificar al firmante de manera inequívoca y asegurar la integridad del documento. Para firmar un documento electrónico se requiere un certificado digital, que es un archivo que identifica a una entidad de certificación digital autorizada por la ONAC.

### ¿Qué es el CUFE (Código Único de Factura Electrónica)?
#### Respuesta
El CUFE es un texto encriptado que sirve para validar la integridad y autenticidad de la factura y permite identificarla inequívocamente dentro del territorio nacional. El CUFE contiene el número de la factura, la fecha de la factura con horas minutos y segundos, el valor de la factura sin IVA, el valor del IVA, los otros impuestos, el NIT del facturador, el identificador de la persona que compra y la clave técnica.

### ¿Qué es la representación gráfica de la factura electrónica y qué contiene?
#### Respuesta
La representación gráfica es la parte visual de la factura electrónica, entendible para usuarios que no conocen el lenguaje XML. Contiene todos los datos completos de la factura, quién expidió la factura, a quién se le expidió la factura, los requerimientos de la DIAN (impuestos, discriminación tributaria, formas de pago, valores antes de IVA), el CUFE y el código QR.

### ¿Qué es el código QR en la factura electrónica?
#### Respuesta
El código QR es un código de barras bidimensional que almacena datos codificados. Al leerlo con un dispositivo, se puede visualizar el número de la factura, la fecha de expedición, el NIT de la empresa que facturó, el identificador del cliente, el valor de la factura antes de impuestos, el valor de la factura con el impuesto, el valor de otros impuestos y el CUFE.

### ¿Cuáles son los requisitos que debe incluir una factura electrónica?
#### Respuesta
La factura electrónica debe incluir:
*   Denominación expresa como Factura Electrónica de Venta.
*   Apellidos y nombres o razón social y NIT de quien presta el servicio o vende los bienes (facturador).
*   Apellidos, nombre o NIT de quien adquiere (cliente).
*   Numeración consecutiva, incluyendo el número de autorización generado ante la DIAN, el rango y la vigencia autorizada por la DIAN.
*   Fecha y hora de generación del documento electrónico.
*   Fecha y hora de expedición.
*   Cantidad y descripción de los bienes y servicios prestados.
*   Valor total.
*   Forma de pago (contado o crédito).
*   Medio de pago (efectivo, tarjeta de crédito, débito, transferencia u otro).
*   Calidad de retenedor de IVA, si aplica, y la discriminación del IVA y la tarifa correspondiente.
*   Discriminación del impuesto al consumo y la tarifa correspondiente.
*   Firma digital o electrónica del facturador electrónico.
*   CUFE.

El código QR va en la representación gráfica, no en el XML.

### ¿Cómo es el calendario de inicio de facturación electrónica para el año 2020?
#### Respuesta
El calendario de inicio de facturación electrónica está definido en la Resolución 0042 de mayo de 2020. Considera dos calendarios:
*   Uno para sujetos obligados según la actividad económica principal registrada en el RUT (código CIIU).
*   Otro para otros sujetos obligados que no atienden a la actividad económica CIIU.
Es importante registrarse para el modelo de validación previa, incluso si ya estaba registrado en el modelo de validación posterior.

### ¿Dónde consulto mi código CIIU?
#### Respuesta
El código CIIU se consulta en el RUT, en la sección de actividad principal.

### ¿Cuáles son las etapas para implementar la facturación electrónica?
#### Respuesta
Las etapas son:
1.  **Pruebas de Habilitación:** Enviar pruebas a la DIAN para cumplir con el requerimiento de estar habilitado como facturador electrónico.
2.  **Producción:** Envío de los documentos reales del día a día de la empresa.

### ¿Cómo se realiza el proceso de habilitación ante la DIAN?
#### Respuesta
Para registrar el paso de habilitación y poder enviar las pruebas, siga estos pasos:

1.  Ingresar al portal de la DIAN.
2.  En la sección de temas de interés, entrar por la opción **Habilitación Factura Electrónica**.
3.  Ingresar a la plataforma como empresa o persona.
4.  Recibirá un correo electrónico con las credenciales de acceso.
5.  Acceder al portal de la DIAN mediante el link del correo electrónico.
6.  En la parte izquierda, entrar por la opción **Participantes Facturador**.
7.  Chequear los datos como facturador y registrar.
8.  Entrar a **Configurar Modos de Operación**.
9.  Seleccionar el modo de operación: **Software de un Proveedor Tecnológico**.
10. Indicar los datos internos:
    * **Nombre de la empresa proveedora:** Factory HK Colombia
    * **Nombre del Software:** tfhk_co
    * **NIT de la empresa proveedora:** 900390126
11. Adicionar la información.

Una vez registrados los modos de operación, se puede consultar los rangos del set de pruebas en la opción **Acciones**. La DIAN asigna automáticamente estos datos (Test Set ID, prefijo, número de resolución ficticia, rango de numeración y fechas de registro).

### ¿Cuántos documentos de prueba debo enviar a la DIAN para la habilitación?
#### Respuesta
Para hacer el proceso de habilitación, la DIAN indica que se deben enviar mínimo 10 documentos de prueba: 8 facturas de venta, 1 nota débito y 1 nota crédito. Máximo, se pueden enviar 50 documentos: hasta 30 facturas de venta, 10 notas débito y 10 notas crédito.

### ¿Cómo solicitar la numeración de facturación electrónica para el ambiente de producción?
#### Respuesta
Siga estos pasos:
1.  Entrar al portal de la DIAN.
2.  Ingresar por la opción **Transaccional Usuario Registrado**.
3.  Entrar al **MUISCA**.
4.  En la parte izquierda, entrar a **Numeración de Facturación** y luego a **Solicitar Numeración de Facturación**.
5.  Dar clic en **Autorizar Rangos**.
6.  Registrar manualmente el prefijo que se va a utilizar y el rango de numeración para la facturación electrónica con validación previa.
7.  Indicar que el tipo de facturación es **Electrónica**.
8.  Agregar la información.
9.  Revisar el documento borrador (formato 1302).
10. Firmar el documento para obtener el formato 1876 (resolución de facturación electrónica).

### ¿Qué datos se deben tener presentes del formato 1876?
#### Respuesta
Se debe tener presente: el número de la resolución, el prefijo, el rango inicial y rango final, la fecha inicial y fecha final.

### ¿Cómo asociar el prefijo con el proveedor tecnológico?
#### Respuesta
1.  Entrar nuevamente al portal de la DIAN, pero ingresar por la opción **Facturando Electrónicamente**.
2.  Registrarse como persona o empresa.
3.  En la parte izquierda, entrar por la opción **Asociar Prefijos**.
4.  Seleccionar el proveedor software (Factory HK Colombia con las iniciales y el NIT).
5.  En donde dice prefijo, deberá aparecer el prefijo de la resolución generada ante la DIAN (formato 1876).
6.  Seleccionar agregar y listo.

### ¿Cuáles son los pasos para implementar la facturación electrónica dentro de ContaPyme?
#### Respuesta
1.  Adquirir el paquete de documentos electrónicos de ContaPyme.
2.  Activar dentro de la empresa el manejo de facturación electrónica.
3.  Personalizar la plantilla para la representación gráfica (opcional).
4.  Configurar los documentos de soporte con la información de la resolución (fecha de inicio, resolución, rangos iniciales) tanto en el ambiente de habilitación como en el ambiente de producción.
5.  Actualizar la base de datos de terceros con la información del correo electrónico de los clientes.

### ¿Qué hacer si un cliente no tiene correo electrónico?
#### Respuesta
Si un cliente no tiene correo electrónico, se puede imprimir la representación gráfica de la factura, que incluye el código CUFE y el código QR. Adicionalmente, se puede crear un correo electrónico genérico de la empresa y registrarlo para estos clientes, asegurando así el envío de la factura electrónica.

### ¿Cómo emitir una factura electrónica en ContaPyme?
#### Respuesta
1.  Ingresar al **Manejador de Operaciones**.
2.  Entrar a la parte de generar facturas de venta (por **Operación de Ingresos** o por la **Operación de Facturación y Ventas**, dependiendo de los módulos).
3.  Escoger un cliente (preferiblemente con correo electrónico).
4.  Seleccionar el vendedor, la lista de precios y la bodega.
5.  Añadir los productos o servicios a facturar, ingresándolos manualmente o mediante un lector de código de barras.
6.  Indicar las observaciones para la factura (garantía, etc.).
7.  Seleccionar la forma de pago (contado, transferencia, tarjeta, cuenta por cobrar, etc.). Si es a crédito, se puede definir el número de cuotas y la periodicidad.
8.  Finalizar la factura. ContaPyme automáticamente envía la información al proveedor tecnológico, quien a su vez la envía a la DIAN. Una vez validada por la DIAN, el cliente recibe un correo con la representación gráfica y el archivo XML.

### ¿Cómo se manejan las notas crédito y débito en ContaPyme?
#### Respuesta
ContaPyme tiene asistentes especializados para generar notas crédito y débito. Al generar una nota crédito, se puede indicar el motivo (devolución parcial o total, rebaja, etc.) y el sistema registra el cliente, el vendedor y la información de la factura. En la forma de pago, se calcula automáticamente el impuesto y se hace el cruce con las cuentas por cobrar. Al finalizar, se envía el documento electrónico al proveedor tecnológico y a la DIAN.

### ¿Qué es un documento de soporte en ContaPyme?
#### Respuesta
Un documento de soporte es el que permite organizar la transacción ante la DIAN, sustentando contablemente el hecho operativo registrado. En la configuración del documento de soporte se indica el prefijo (del set de pruebas o de la resolución), la información de la resolución (número, rango inicial y final, fechas) y el tipo de ambiente (habilitación o producción).

* **Ruta:** *[Dentro de ContaPyme, la ruta para configurar el documento de soporte no se especifica en la transcripción]*

### ¿Cuándo se factura al exterior se realiza la misma factura normal que en territorio nacional?
#### Respuesta
Sí, se realiza la misma factura, pero con una etiqueta que la identifica como factura de exportación. En ContaPyme, si se factura a clientes que están fuera del territorio nacional y en otra moneda, se puede activar la opción de factura de exportación en el documento de configuración de soporte. Se debe indicar un concepto de los términos internacionales de comercio (incoterms).

### ¿Cuáles son las sanciones por no facturar electrónicamente estando obligado a ello?
#### Respuesta
Según el Decreto 358 del 5 de marzo de 2020, si estando obligado a facturar no se hace y se expiden documentos distintos a la factura de venta (prefacturas, cuentas de cobro, etc.), se puede sancionar con el cierre del establecimiento de comercio, oficina o consultorio, conforme al artículo 652 del Estatuto Tributario.

### ¿Cuándo deben iniciar a facturar electrónicamente los inscritos en el régimen simple de tributación (SIMPLE)?
#### Respuesta
Según el Decreto 358 del 5 de marzo de 2020, la implementación de la factura electrónica para los sujetos inscritos en el régimen SIMPLE debió iniciar a más tardar el primero de mayo de 2020. Si se optó por inscribirse al régimen SIMPLE después de esta fecha, se tiene un plazo de dos meses contados a partir de la fecha de inscripción para adoptar el sistema de facturación electrónica.

### ¿Cómo tiene el manejo ContaPyme respecto a los días sin IVA? ¿Se tiene pensado algún proceso de automatización?
#### Respuesta
ContaPyme tiene una implementación especial para los días sin IVA, donde al facturar en esos días (19 de junio, 3 de julio y 19 de julio), se mostrará un color especial y se indicará que es facturación del día sin IVA. Para esto, se deben clasificar los productos con los géneros y categorías de la DIAN. El sistema valida que el cliente final sea una persona natural, que se cumplan las reglas de las cantidades máximas por género y los topes de precio establecidos por la DIAN.

---

# Facturación electrónica con ContaPyme
[Ver el video](https://www.youtube.com/watch?v=xUpuZ86Z3tQ)

## Tema principal
Explicación del proceso de facturación electrónica en Colombia y cómo implementarlo en ContaPyme.

## Resumen general
Este video explica qué es la factura electrónica en Colombia, los requisitos legales y técnicos, y los pasos para habilitarse como facturador electrónico ante la DIAN. Detalla la estructura de una factura electrónica (archivo XML, firma digital, CUFE, código QR), los documentos que la componen (factura de venta, nota crédito y nota débito), y quiénes están obligados a emitirla. Además, muestra cómo ContaPyme automatiza el proceso y los pasos para configurarlo en el sistema, incluyendo la habilitación en el portal de la DIAN, la solicitud de rangos de numeración, la asociación del proveedor tecnológico y la configuración de documentos de soporte.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la factura electrónica?
#### Respuesta
Es un documento electrónico que soporta la venta de bienes y servicios. Se genera en formato XML, incluye la firma digital y el CUFE (Código Único de Factura Electrónica). Debe reportarse a la DIAN y tiene validez legal, cumpliendo con los requisitos del artículo 617 del Estatuto Tributario.

### ¿Cuál es la normatividad vigente sobre facturación electrónica en Colombia?
#### Respuesta
La resolución 42 de mayo de 2020 establece los conceptos generales de facturación electrónica. El anexo técnico inicial fue la versión 1.7. La resolución 0012 de febrero de 2021 introdujo el anexo técnico versión 1.8, reemplazando el anterior. Existe un proyecto de resolución para modificar el anexo técnico a la versión 1.9.

### ¿Qué es el anexo técnico en la facturación electrónica?
#### Respuesta
El anexo técnico contiene las reglas de validación y rechazo que la DIAN exige para el envío de facturas electrónicas. Estas reglas son de carácter informático y deben ser cumplidas para que el documento sea aceptado.

### ¿En qué formato se genera una factura electrónica?
#### Respuesta
La factura electrónica se genera en formato XML, que es un archivo basado en etiquetas. Cada etiqueta contiene información específica de la factura, como datos del emisor, del cliente, de los productos o servicios, los valores de los impuestos, las retenciones y los descuentos.

### ¿Qué información contiene el CUFE (Código Único de Factura Electrónica)?
#### Respuesta
El CUFE contiene información como el número de la factura, la fecha de emisión (con hora, minutos y segundos), el NIT del emisor y del receptor, el valor de la factura antes de impuestos, el valor de la factura con impuestos y la clave técnica asignada por la DIAN al generar la resolución de facturación electrónica.

### ¿Qué información se puede encontrar al escanear el código QR de una factura electrónica?
#### Respuesta
Al escanear el código QR se puede encontrar información como el número de la factura, la fecha (con hora, minutos y segundos), los NIT del facturador y del adquirente, el valor total de la factura con impuestos, el valor antes de impuestos, el valor de los impuestos y el CUFE.

### ¿Cuáles son los documentos de facturación electrónica?
#### Respuesta
Los documentos de facturación electrónica son:
1.  **Factura de venta electrónica:** Respalda tributariamente las actividades comerciales de venta de productos o servicios.
2.  **Nota crédito electrónica:** Se utiliza para anular total o parcialmente una factura de venta, disminuyendo su valor.
3.  **Nota débito electrónica:** Se utiliza para aumentar el valor de una factura, por ejemplo, por cambios de valor o intereses.

### ¿Quiénes están obligados a emitir factura electrónica de venta?
#### Respuesta
Están obligados a emitir factura electrónica de venta:
*   Responsables de IVA.
*   Responsables del impuesto nacional al consumo.
*   Empresas o entidades inscritas en el régimen simple de tributación (SIMPLE).
*   Personas naturales que vendan bienes o servicios con ingresos mayores a 3500 UVT.
*   Personas naturales o contratistas del Estado con ingresos superiores a 4000 UVT.
*   Personas jurídicas que vendan bienes o servicios.
*   Venta de productos de actividad agrícola o ganadera.

### ¿Cómo se envía una factura electrónica a la DIAN?
#### Respuesta
El proceso involucra al emisor, al cliente (adquirente), a la DIAN y a un proveedor tecnológico. La empresa emite la factura y envía los datos al proveedor tecnológico. El proveedor genera el archivo XML y lo envía a la DIAN para su validación. Una vez validado, se envía el XML y la representación gráfica al adquirente.

### ¿Cuáles son las etapas para iniciar con facturación electrónica?
#### Respuesta
Las etapas son:
1.  **Habilitación:** Realizar pruebas ante la DIAN para ser aprobado como facturador electrónico.
2.  **Producción:** Enviar los documentos electrónicos a la DIAN con los datos reales de la empresa.

### ¿Cómo se realiza el proceso de registro en el portal de la DIAN para la habilitación?
#### Respuesta
1.  Ingresar a www.dian.gov.co.
2.  En la parte inferior, buscar la sección de factura electrónica y seleccionar la opción de "Habilitación".
3.  Ingresar con el número de identificación del contribuyente (empresa o persona) y hacer clic en "Ingresar".
4.  Revisar el correo electrónico registrado en el RUT, donde llegará un correo con un token válido por 60 minutos.
5.  Ingresar al portal de la DIAN a través del enlace proporcionado en el correo.
6.  En el menú de la parte izquierda, seleccionar "Facturador".
7.  Seleccionar la opción de facturación electrónica y registrar la información solicitada.
8.  Verificar que los datos de la empresa sean correctos.
9.  Seleccionar "Configurar modos de operación".
10. Seleccionar la información del proveedor tecnológico con el cual se hará la asociación para el envío de documentos electrónicos en ambiente de pruebas.

### ¿Qué es el test set ID y para qué sirve?
#### Respuesta
El test set ID es un código único que la DIAN entrega a cada empresa para que cumpla su proceso de habilitación. Este código es necesario para que el software de facturación electrónica pueda enviar las pruebas automáticamente a la DIAN.

### ¿Qué documentos se deben enviar durante el proceso de habilitación y cuántos deben ser aceptados?
#### Respuesta
Se pueden enviar hasta 50 documentos electrónicos: 30 facturas de venta, 10 notas débito y 10 notas crédito. Como mínimo, deben ser aceptadas ocho facturas de venta, una nota crédito y una nota débito.

### ¿Cómo se solicita el rango de numeración para la resolución de facturación electrónica en el sistema MUISCA de la DIAN?
#### Respuesta
1.  Ingresar al portal de la DIAN en www.dian.gov.co.
2.  Seleccionar la opción "Usuario Registrado".
3.  Ingresar al sistema MUISCA de la DIAN con los datos de la empresa (a nombre propio o de un tercero).
4.  En la parte izquierda, seleccionar "Numeración de facturación" y luego "Solicitar numeración de facturación".
5.  Verificar que los datos de la empresa sean correctos y seleccionar "Autorizar rangos".
6.  Registrar el prefijo que se utilizará para la numeración de facturación electrónica y el rango deseado.
7.  Seleccionar que el tipo de facturación es electrónica y hacer clic en "Agregar".
8.  Verificar la información registrada y seleccionar la opción "Borrador" para generar el formato 1302 (borrador de la resolución).
9.  Verificar que los datos estén correctos y generar el formato definitivo (formato 1876), que es la resolución empresarial para la facturación electrónica.

### ¿Qué información contiene el formato 1876 (resolución de facturación electrónica)?
#### Respuesta
El formato 1876 contiene:
*   El número de la resolución.
*   El prefijo asignado.
*   El rango inicial y final de la numeración autorizada.
*   La fecha de inicio de vigencia.
*   La fecha final de vigencia.

### ¿Cómo se asocia la resolución generada en el sistema MUISCA con el proveedor tecnológico en el portal de la DIAN?
#### Respuesta
1.  Ingresar al portal de la DIAN en www.dian.gov.co y seleccionar "Facturando electrónicamente".
2.  Ingresar como empresa o persona con los datos del contribuyente.
3.  En el portal, seleccionar "Rangos de numeración" en la parte izquierda.
4.  Asociar el prefijo de la resolución generada en el sistema MUISCA con el proveedor tecnológico con el cual se realizó la habilitación.
5.  Seleccionar el proveedor y el software.
6.  Desplegar la lista de prefijos y seleccionar la resolución generada.
7.  Confirmar la asociación.

### ¿Cuáles son los pasos para implementar la facturación electrónica en ContaPyme?
#### Respuesta
1.  Adquirir el paquete de documentos electrónicos con el departamento comercial o distribuidor autorizado.
2.  Ingresar al portal de clientes de ContaPyme (www.contapyme.com) con el usuario y contraseña, y seguir el paso a paso.
3.  Activar el manejo de facturación electrónica en el explorador gráfico de la empresa dentro de ContaPyme.
4.  En el catálogo de documentos de soporte, configurar el documento de soporte "Factura electrónica de venta" con la resolución generada en la DIAN, los rangos, las vigencias y el proveedor tecnológico.
   * Ir a: **[Ruta del menú no especificada en el video]** -> Catálogo de documentos de soporte -> Factura electrónica de venta
5.  Configurar en el catálogo de terceros (clientes) el correo electrónico para facturación electrónica.
   * Ir a: **[Ruta del menú no especificada en el video]** -> Catálogo de terceros -> Clientes
6.  Iniciar a facturar a través de la transacción de ingresos o la operación de facturación y venta, dependiendo del módulo o licenciamiento.

### ¿Qué operaciones dentro de ContaPyme permiten generar facturas electrónicas?
#### Respuesta
*   **Transacción de ingresos:** Para facturar servicios, conceptos (no productos tangibles o inventariables).
*   **Operación de facturación y venta (módulo de inventarios, compras y facturación):** Para facturar productos (que descargan del inventario) y servicios.

---

# Facturación electrónica para POS
[Ver el video](https://www.youtube.com/watch?v=kGVp_czB8-I)
Facturación electrónica para puntos de venta (POS)

## Tema principal
Adaptación de la facturación POS a facturación electrónica según la resolución 165 de 2023 de la DIAN.

## Resumen general
Este video explica cómo adaptar la facturación en puntos de venta (POS) a la facturación electrónica, según la resolución 165 de 2023 de la DIAN. Presenta dos escenarios: el primero para usuarios que ya tienen habilitada la facturación electrónica y el segundo para aquellos que solo tienen resolución POS local. El video guía al usuario a través de la configuración en ContaPyme para emitir facturas electrónicas desde el POS, mostrando cómo cambiar el documento de soporte y cómo solicitar la habilitación de la facturación electrónica si aún no se tiene.

## Preguntas Frecuentes (FAQ)

### ¿Qué indica la resolución 165 de 2023 de la DIAN con respecto a la facturación POS?
#### Respuesta
La resolución 165 de 2023 de la DIAN indica que todas las personas obligadas a facturar a través de documento equivalente POS deben migrar a un documento electrónico a partir del primero de mayo de 2024, según el calendario establecido.

### ¿Qué solución propone ContaPyme para cumplir con la nueva normativa de la DIAN sobre la facturación POS?
#### Respuesta
ContaPyme propone utilizar la facturación electrónica como el documento que solventará la nueva normativa de la DIAN.

### ¿Cuáles son los dos escenarios que se presentan en el video para la facturación electrónica en POS con ContaPyme?
#### Respuesta
Los dos escenarios son:
1.  El usuario ya tiene una resolución de facturación electrónica y una resolución POS local.
2.  El usuario solo tiene una resolución POS local y nunca ha facturado electrónicamente.

### Si ya tengo facturación electrónica en ContaPyme, ¿qué debo hacer para empezar a facturar electrónicamente desde el POS?
#### Respuesta
Debes cambiar el documento de soporte en la operación de punto de venta en ContaPyme. Sigue estos pasos:
1.  Ve a **Básico > Documento de Soporte** y busca el documento de soporte configurado para facturación electrónica.
2.  Verifica que la resolución esté correctamente asociada y que la numeración esté configurada con el manejo de resoluciones. Asegúrate de que el tipo sea "Factura de Venta".
3.  En la impresión del documento, escoge el documento 37 para que la factura se imprima en tirilla con el Qfe y el código QR.
4.  Ve a **Básico > Operaciones**.
5.  Abre la operación de **Punto de Venta**.
6.  Ve a **Operación > Configurar Operación**.
7.  En el menú de la izquierda, busca **Tipo de Documento de Soporte por Defecto** e indica el tipo de documento de facturación electrónica.
8.  Haz clic en **Aceptar**.

### ¿Por qué es importante escoger el documento 37 en la impresión del documento de soporte para facturación electrónica en POS?
#### Respuesta
Es importante porque el documento 37 permite que la factura se imprima en tirilla, con el Qfe, el código QR, la fecha de emisión y toda la información que exige la DIAN para que sea una representación gráfica válida.

### ¿Qué debo hacer si no tengo facturación electrónica habilitada en ContaPyme?
#### Respuesta
Debes solicitar un tiquete:
*   Si no tienes el módulo de facturación o el módulo de inventarios, debes solicitar un tiquete para compra adicional de licencia.
*   Si ya tienes uno de estos módulos, pero no facturas electrónicamente, debes solicitar un tiquete de recompra de documentos y/o eventos electrónicos.

### ¿Qué pasa después de solicitar el tiquete para habilitar la facturación electrónica?
#### Respuesta
El equipo comercial y de soporte de ContaPyme te colaborará con todo el proceso para que la adopción de la facturación electrónica sea fácil y rápida.

---

# Facturación electrónica, Contingencia y POS
[Ver el video](https://www.youtube.com/watch?v=K2CQA9momsU)
Facturación electrónica, Contingencia y POS

## Tema principal
Configuración y uso de facturación electrónica, de contingencia y POS en ContaPyme.

## Resumen general
Este video explica cómo implementar la facturación electrónica, de contingencia y POS en ContaPyme. Cubre desde el proceso de habilitación ante la DIAN hasta la configuración de los documentos de soporte en ContaPyme. Se aprende cómo solicitar rangos de numeración en el sistema Muisca, cómo configurar los documentos de soporte en ContaPyme para cada tipo de facturación, y cómo emitir facturas electrónicas, de contingencia y POS. También se explican las diferencias entre estos tipos de facturación y cómo gestionarlos dentro del sistema.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las dos etapas para implementar la facturación electrónica?
#### Respuesta
Las dos etapas son:
1.  **Etapa de Habilitación:** Realizar pruebas ante la DIAN enviando documentos ficticios (8 facturas de venta, 1 nota débito y 1 nota crédito).
2.  **Etapa de Producción:** Enviar documentos electrónicos reales (notas débito, notas crédito y facturas de venta) según la operación normal de la empresa.

### ¿Cómo me registro ante la DIAN para la facturación electrónica?
#### Respuesta
1.  Entra al portal de la DIAN: **www.dian.gov.co**.
2.  Selecciona la opción de habilitación (como empresa o persona).
3.  Encuentra la opción "facturador" y configura los modos de operación, seleccionando el proveedor tecnológico con el que va a enviar documentos electrónicos.

### ¿Qué es el Test Set ID y para qué se utiliza?
#### Respuesta
El Test Set ID es un código que la DIAN entrega al registrarse como facturador electrónico. Este código se utiliza dentro del sistema ContaPyme para realizar la etapa de habilitación.

### ¿Qué información entrega la DIAN durante la etapa de habilitación además del Test Set ID?
#### Respuesta
Además del Test Set ID, la DIAN entrega información como el prefijo, la resolución, un rango de numeración y la vigencia, todos estos datos de forma ficticia para cumplir con la etapa de habilitación.

### ¿Cuántos documentos debo enviar en la etapa de habilitación para que la DIAN me apruebe?
#### Respuesta
Debes enviar y obtener la aprobación de:
-   8 facturas de venta
-   1 nota crédito
-   1 nota débito

### ¿Cómo solicito los rangos de numeración para la facturación en producción?
#### Respuesta
1.  Entra al portal de la DIAN por la opción de "Usuario Registrado". Esto te lleva al sistema Muisca.
2.  Inicia sesión con los datos de la empresa.
3.  En el menú de la izquierda, selecciona "Numeración de Facturación".
4.  Solicita los rangos de numeración.

### ¿Cómo solicito rangos de numeración para factura electrónica, de contingencia y POS en el sistema Muisca?
#### Respuesta
El proceso es el mismo para los tres tipos de facturación:

1.  Entra al sistema Muisca.
2.  Ve a "Numeración de Facturación".
3.  Selecciona el tipo de facturación:
    *   Electrónica: Indica el prefijo y selecciona "Electrónica" en tipo de facturación.
    *   Contingencia: Indica el prefijo y selecciona "Factura de Talonario o de Papel" en tipo de facturación.
    *   POS: Indica el prefijo y selecciona "Documentos Equivalentes/POS" en tipo de facturación.
4.  Indica el rango "Desde" y "Hasta".

### ¿Qué formatos debo generar en el sistema Muisca después de solicitar la numeración y para qué sirven?
#### Respuesta
1.  **Formato Borrador (1302):** Permite ver preliminarmente la información de la solicitud.
2.  **Formato Definitivo (1876):** Se genera si estás de acuerdo con la información del borrador. Debe ser firmado por el representante legal y contiene la resolución de facturación.

### ¿Qué información importante encuentro en el formato 1876?
#### Respuesta
En el formato 1876 se encuentra:
*   La resolución que la DIAN entregó para la facturación.
*   El prefijo generado.
*   El rango de numeración (desde y hasta).
*   La fecha de inicio de vigencia de la resolución.
*   La cantidad de meses de vigencia autorizados.

### ¿Cómo asocio los prefijos de facturación electrónica y de contingencia al proveedor tecnológico en la DIAN?
#### Respuesta
1.  Entra al portal de la DIAN por la opción "Facturando Electrónicamente".
2.  Selecciona "Empresa" o "Persona".
3.  Selecciona la opción "Asociar Prefijos".
4.  Asocia los prefijos al proveedor tecnológico con el que tienes acuerdo.

### ¿Debo asociar los prefijos de la facturación POS al proveedor tecnológico?
#### Respuesta
No, los prefijos de la facturación POS no se asocian al proveedor tecnológico.

### ¿Cómo activo el manejo de facturación electrónica en ContaPyme?
#### Respuesta
Dentro de la configuración de la empresa, activa la opción para manejar facturación electrónica.

### ¿Qué son los "documentos de soporte" en ContaPyme?
#### Respuesta
Son documentos que permiten definir la resolución, el prefijo, la vigencia y el rango de numeración autorizado por la DIAN para cada tipo de facturación.

### ¿Cómo configuro los documentos de soporte en ContaPyme para factura electrónica, de contingencia y POS?
#### Respuesta
1.  Dentro de ContaPyme, ve a la configuración de los documentos de soporte.
2.  Selecciona el tipo de documento (Factura de Venta Electrónica, Factura de Venta Contingencia, Factura POS).
3.  Indica la empresa a la que pertenece el documento.
4.  Si es factura electrónica o de contingencia, activa la opción "Hace parte de facturación electrónica".
5.  En la pestaña "Resoluciones", indica la resolución, el consecutivo inicial y final, y las fechas de inicio y fin de vigencia.
6.  En la parte de impresión del documento, selecciona la plantilla correspondiente.
7.  Para facturas electrónicas o de contingencia, en la pestaña "Facturación Electrónica", selecciona el proveedor tecnológico, el ambiente (habilitación o producción) y el tipo de documento.

### ¿Qué es la representación gráfica de una factura y por qué es importante?
#### Respuesta
La representación gráfica es un archivo (como un PDF) que muestra la información de la factura de forma estructurada y fácil de interpretar para el cliente, incluyendo datos de la empresa, del cliente, productos, impuestos y datos de la resolución. Es importante porque complementa el archivo XML, que es más técnico.

### ¿Qué debo configurar en la pestaña "Facturación Electrónica" en ContaPyme?
#### Respuesta
Debes seleccionar:
*   El proveedor tecnológico.
*   El ambiente de trabajo (habilitación o producción).
*   El tipo de documento (factura electrónica, nota crédito, nota débito).

### ¿Cuándo debo indicar que una factura es de exportación en ContaPyme?
#### Respuesta
Debes indicar que una factura es de exportación si facturas a una empresa que no está dentro del territorio nacional, para que la DIAN pueda analizar la información en el XML.

### ¿Cómo se configura la aprobación de la factura de venta electrónica en ContaPyme y qué significa?
#### Respuesta
En la configuración del documento de soporte para la factura de venta electrónica, en la sección "Acciones", se configura la aprobación como "Automática al finalizar". Esto significa que cada vez que se crea una factura de venta electrónica, el sistema envía automáticamente los datos al proveedor tecnológico y a la DIAN.

### ¿Cómo se configura la aprobación de la factura de contingencia en ContaPyme y por qué es diferente a la factura electrónica?
#### Respuesta
En la configuración del documento de soporte para la factura de venta de contingencia, en la sección "Acciones", se configura la aprobación como "Aprobar manualmente". Esto se hace porque, al estar en contingencia, no se puede enviar el documento de forma inmediata al proveedor tecnológico. Se debe aprobar manualmente una vez superada la contingencia.

### ¿Qué debo hacer después de superar la contingencia para enviar la factura a la DIAN?
#### Respuesta
Una vez superada la contingencia, debes aprobar manualmente el documento de la factura de contingencia y luego ejecutar las acciones de envío para que se envíe al proveedor tecnológico y a la DIAN.

### ¿Cuál es la principal diferencia entre la configuración de la factura electrónica y la factura POS en ContaPyme?
#### Respuesta
La factura electrónica tiene activada la opción "Hace parte de facturación electrónica", mientras que la factura POS no la tiene activada, ya que no se envía electrónicamente a la DIAN.

### ¿Cómo configuro la factura POS en ContaPyme?
#### Respuesta
1.  Crea un documento de soporte para la factura POS.
2.  Indica la empresa a la que pertenece.
3.  **NO** actives la opción "Hace parte de facturación electrónica".
4.  Indica la máscara o prefijo.
5.  En la pestaña "Resoluciones", agrega la resolución, el consecutivo inicial y final, y las fechas de inicio y fin de vigencia.
6.  Selecciona el documento de impresión.

### ¿Qué tipo de documento de impresión se usa normalmente para la factura POS?
#### Respuesta
Normalmente se utiliza un documento de impresión en tirilla, como las que se entregan en supermercados o cines.

### ¿Qué significa el código CUFE y dónde se encuentra en la factura electrónica?
#### Respuesta
El código CUFE es el Código Único de Factura Electrónica. Se encuentra en la parte inferior de la representación gráfica de la factura electrónica, junto con el código QR y la fecha de validación de la DIAN.

### ¿Qué información contiene el código QR en la factura electrónica?
#### Respuesta
El código QR contiene información como:
*   El número de la factura.
*   Los datos de la empresa emisora.
*   Los datos de los productos.
*   Los valores totales con impuestos y sin impuestos.

### ¿Cómo envío una factura de contingencia a la DIAN después de haberla emitido?
#### Respuesta
Una vez superada la contingencia, en el manejador de operaciones, busca la factura de contingencia y selecciona la opción "Aprobar documento electrónico" para enviarla al proveedor tecnológico y a la DIAN.

---

# FE Ingresos AD
[Ver el video](https://www.youtube.com/watch?v=0gL6B41DqYo)
Factura de venta electrónica por operación de ingresos del módulo de automatización de documentos

## Tema principal
Emisión de facturas de venta electrónicas a través del módulo de automatización de documentos en ContaPyme.

## Resumen general
Este video explica cómo emitir facturas de venta electrónicas utilizando la operación de ingresos en el módulo de automatización de documentos de ContaPyme. Se enfoca en empresas y personas naturales que necesitan facturar electrónicamente sin controlar inventarios, ideal para servicios y conceptos.  El video cubre los pasos previos de configuración, la creación y envío de facturas, el manejo de archivos adjuntos, y la interacción del cliente con la plataforma para aprobar o rechazar la factura. Se muestra cómo el estado de la factura se actualiza en ContaPyme, reflejando la acción del cliente.

## Preguntas Frecuentes (FAQ)

### ¿Para quién es útil la operación de ingresos en ContaPyme?
#### Respuesta
La operación de ingresos es útil para empresas y personas naturales que necesitan emitir facturas electrónicas de venta rápidamente, especialmente para servicios y conceptos, y que no requieren control de inventarios.

### ¿Cuáles son los pasos previos necesarios para emitir una factura electrónica de venta en ContaPyme?
#### Respuesta
Los pasos previos son:
1.  Adquirir un paquete de documentos electrónicos en ContaPyme.
2.  Activar el manejo de facturación electrónica en la empresa. Esto se hace dando click derecho sobre el nombre de la empresa.
3.  Configurar los documentos de soporte (factura de venta electrónica, nota crédito, nota débito) con la información de la resolución de factura electrónica.
4.  Configurar el correo electrónico del cliente en la información del tercero para que reciba los documentos.
5.  Opcionalmente, personalizar la plantilla de la representación gráfica.

### ¿Cómo se activa el manejo de facturación electrónica en la empresa dentro de ContaPyme?
#### Respuesta
Para activar el manejo de facturación electrónica en la empresa:
1.  Dar clic derecho sobre el nombre de la empresa.
2.  Seleccionar la opción "Activo de manejo de facturación electrónica".
3.  Activar el uso de la plataforma de documentos para publicar los documentos en la web.

### ¿Dónde se configuran los documentos de soporte para la facturación electrónica en ContaPyme?
#### Respuesta
Los documentos de soporte (factura de venta electrónica, nota crédito electrónica y nota débito electrónica) se configuran dentro de la opción **Documentos de Soporte**. Aquí se registra la resolución autorizada por la DIAN, incluyendo número de resolución, consecutivo inicial, consecutivo final, fecha de inicio y fecha final.

### ¿Qué son las "acciones" en la configuración de los documentos de soporte y cómo se configuran?
#### Respuesta
Las "acciones" definen cómo se aprueba el documento cuando se realiza la transacción. Se configuran en los documentos de soporte y determinan si ContaPyme envía inmediatamente el documento al proveedor tecnológico, pregunta antes de enviar, o deja pendiente el envío para después.

### ¿Dónde se configura el proveedor tecnológico para la facturación electrónica en ContaPyme?
#### Respuesta
Una vez activada la facturación electrónica, aparece una pestaña llamada "Factura Electrónica" dentro de los documentos de soporte. Allí se configura el proveedor tecnológico con el que se realizó el proceso comercial.

### ¿Cómo se emite una factura electrónica de venta utilizando la operación de ingresos en ContaPyme?
#### Respuesta
Para emitir una factura electrónica de venta:
1.  Ingresar al **Manejador de Operaciones**.
2.  Desplegar la opción **Más Operaciones**.
3.  Dentro de la sección **Ingresos y Gastos**, seleccionar la operación **Ingresos**.
4.  En el encabezado de la operación, seleccionar el tipo de documento de soporte configurado para facturación electrónica.
5.  Indicar la fecha, el detalle del servicio o concepto facturado, y seleccionar el cliente (que debe tener un correo electrónico configurado).
6.  En el área de registro, seleccionar el concepto o servicio a facturar desde el plan de cuentas filtrado a nivel de ingresos.
7.  Indicar el valor a facturar.
8.  (Opcional) Agregar observaciones, tipo de operación, número de orden de compra y archivos adjuntos (máximo 2MB).
9.  Calcular los impuestos.
10. Indicar la forma de pago.
11. Finalizar la operación.

### ¿Qué tipos de archivos se pueden adjuntar a una factura electrónica y cuál es el límite de tamaño?
#### Respuesta
Se pueden adjuntar archivos PDF, imágenes, y otros formatos relevantes. La DIAN indica que el tamaño total de los archivos adjuntos no debe superar los 2 MB.

### ¿Qué opciones de "Tipo de Operación" existen en la factura y cuál es la más común?
#### Respuesta
Las opciones son:
* Estándar: Es la más común.
* Administración de Impuestos a Utilidades
* Facturas de Mandato

### ¿Qué sucede después de finalizar la factura en la operación de ingresos?
#### Respuesta
Después de finalizar la factura, el sistema pregunta si se desea aprobar el documento para ejecutar las acciones automáticas. Si se responde que sí, el sistema envía la información al proveedor tecnológico para que este la envíe a la DIAN y valide el documento. Si se responde que no, se puede enviar el documento manualmente después.

### ¿Qué información recibe el cliente al recibir una factura electrónica emitida desde ContaPyme?
#### Respuesta
El cliente recibe un correo electrónico con:
*   Un archivo .zip que contiene la representación gráfica en PDF de la factura.
*   El archivo XML.
*   (Si se adjuntaron archivos) Una carpeta comprimida con los archivos adjuntos.
*   Un enlace para ver el documento en la plataforma de ContaPyme.

### ¿Qué puede hacer el cliente al acceder a la factura a través de la plataforma de ContaPyme?
#### Respuesta
El cliente puede:
*   Ver la representación gráfica de la factura en formato HTML.
*   Aprobar o rechazar el documento.
*   Ver y descargar los archivos adjuntos.
*   Descargar el archivo XML.

### ¿Cómo se refleja en ContaPyme si un cliente aprobó o rechazó una factura electrónica?
#### Respuesta
Dentro del Manejador de Operaciones, al actualizar el estado del documento, aparecerá una manito indicando:
*   OK (manito verde con el dedo hacia arriba): El cliente aprobó la factura.
*   Manito roja con el dedo hacia abajo: El cliente rechazó la factura.

Esta información también se puede ver en el inspector de datos, en la bitácora del documento, junto con los comentarios del cliente.

### ¿Qué implicaciones tiene para la factura ser rechazada por el cliente?
#### Respuesta
Si el cliente rechaza la factura, será necesario emitir una nota crédito para anular o reemplazar el documento.

### ¿Cómo se aprueba manualmente un documento para su envío, después de haberlo creado en ContaPyme?
#### Respuesta
Si al finalizar la factura se eligió no enviar el documento automáticamente, se puede aprobar y enviar manualmente seleccionando la transacción y haciendo clic en la opción "Aprobar Documento" en la parte superior de la pantalla.

### ¿Dónde puedo encontrar más información sobre el manejo del módulo de automatización de documentos?
#### Respuesta
Puede encontrar información complementaria en la plataforma de capacitación virtual de ContaPyme.

---

# FE Inventarios IN
[Ver el video](https://www.youtube.com/watch?v=AzYw6F-vLeM)
[AzYw6F-vLeM]

## Tema principal
Emisión de facturas de venta electrónica desde el módulo de inventarios y facturación en ContaPyme.

## Resumen general
Este video explica cómo emitir facturas de venta electrónicas utilizando el módulo de inventarios y facturación en ContaPyme.  Se cubren los pasos previos necesarios, como la adquisición de documentos electrónicos, la activación de la facturación electrónica y la configuración de los documentos de soporte.  También se muestra cómo crear una factura, adjuntar archivos, manejar formas de pago y observar el estado del documento después de ser enviado al cliente y a la DIAN, incluyendo la aprobación o rechazo por parte del cliente.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipo de empresas pueden usar esta operación de facturación electrónica?
#### Respuesta
Esta operación de facturación electrónica es útil para empresas y personas naturales que necesitan emitir facturas electrónicas y controlar sus inventarios. También permite la facturación de servicios.

### ¿Qué pasos previos son necesarios antes de emitir una factura de venta electrónica en ContaPyme?
#### Respuesta
Antes de emitir una factura de venta electrónica, debe asegurarse de:
1.  Haber adquirido un paquete de documentos electrónicos ante Insoft.
2.  Activar el manejo de facturación electrónica dentro de la empresa en ContaPyme.
3.  Configurar los documentos de soporte, incluyendo la factura de venta electrónica, con la resolución proporcionada por la DIAN para el ambiente productivo.
4.  Asegurarse de que los terceros (clientes) tengan un correo electrónico registrado en su información de contacto en ContaPyme.
5.  (Opcional) Personalizar la plantilla para la representación gráfica de la factura.

### ¿Cómo se activa el manejo de facturación electrónica en la empresa dentro de ContaPyme?
#### Respuesta
1. Dentro del explorador gráfico de la empresa, dar **clic derecho** en la empresa.
2. Seleccionar **Modificar**.
3. En la ventana que se abre, ir a la pestaña **General**.
4. Activar la opción de **Manejo de facturación electrónica** para el NIT correspondiente.

### ¿Qué documentos de soporte deben ser configurados para la facturación electrónica?
#### Respuesta
Deben configurarse la factura de venta electrónica, la nota crédito electrónica y la nota débito electrónica.

### ¿Qué información se debe registrar al configurar la factura de venta electrónica como documento de soporte?
#### Respuesta
Debe registrar la información de la resolución proporcionada por la DIAN, incluyendo:
1.  La resolución.
2.  El consecutivo inicial.
3.  El consecutivo final.
4.  La fecha de inicio.
5.  La fecha final.
También debe activar la opción de factura electrónica de venta para el documento de soporte.

### ¿Qué opciones de aprobación del documento existen en la configuración de la factura electrónica y cómo funcionan?
#### Respuesta
Existen tres opciones de aprobación del documento:
1.  **Automático al finalizar:** ContaPyme enviará automáticamente el documento electrónico al proveedor tecnológico al finalizar la factura.
2.  **Solicitar aprobación al finalizar:** Pregunta si se desea enviar de forma inmediata o posterior.
3.  **Aprobación manual:** El usuario indica cuándo enviar el documento al proveedor tecnológico después de crear la factura.

### ¿Dónde se configura el proveedor tecnológico para la facturación electrónica en ContaPyme?
#### Respuesta
Una vez activada la facturación electrónica, aparece una nueva pestaña denominada "Facturación electrónica". En esta pestaña, debe seleccionar el proveedor tecnológico con el cual se realizó el acuerdo comercial a través de Insoft. También debe indicar el tipo de documento (factura electrónica, nota crédito o nota débito) que se está configurando.

### ¿Cómo se accede a la operación de facturación y ventas en ContaPyme?
#### Respuesta
1. Dentro del sistema ContaPyme, ingresar por la opción de **Manejador de operaciones**.
2. Seleccionar **Más operaciones**.
3. Seleccionar **Ventas**.
4. Seleccionar **Facturación y Ventas**.

### ¿Qué configuraciones previas son necesarias en ContaPyme antes de emitir una factura electrónica de venta?
#### Respuesta
Además de las configuraciones mencionadas anteriormente, es necesario tener configurado:
1.  El listado de productos y/o servicios que se van a facturar con sus respectivas líneas o departamentos.
2.  Los grupos de inventario.
3.  La configuración de bodegas.
4.  Los precios de los productos y/o servicios.

### ¿Dónde puedo aprender a configurar bodegas, grupos de inventario, listas de productos y servicios y precios en ContaPyme?
#### Respuesta
Puede encontrar tutoriales sobre la administración y configuración de bodegas, grupos de inventario, listas de productos y servicios y precios en la plataforma de capacitación virtual de ContaPyme. Busque los videos del módulo de inventarios y facturación.

### ¿Qué significa el "Tipo de documento de soporte" al emitir una factura electrónica y por qué es importante?
#### Respuesta
El "Tipo de documento de soporte" es el documento configurado como documento electrónico, el cual contiene la resolución de facturación electrónica autorizada por la DIAN y la configuración ante el proveedor tecnológico. Este campo asocia un número consecutivo a la factura.

### ¿Dónde se registra el correo electrónico del cliente para que reciba la factura electrónica?
#### Respuesta
El correo electrónico del cliente debe estar registrado en el campo de correo de "Facturación electrónica" dentro de la información del tercero (cliente) en el sistema. A esta dirección de correo electrónico se enviará el archivo XML y el PDF de la factura de venta.

### ¿Cómo se adjuntan archivos a una factura electrónica en ContaPyme y qué restricciones existen?
#### Respuesta
1. Dentro de la operación de facturación, en la ventana "Información adicional", busque la sección **Archivos Adjuntos**.
2. Utilice la opción **Más** para cargar los archivos desde su equipo.
3. Seleccione los archivos que desea adjuntar.
Los archivos adjuntos no pueden pesar más de 2 megas cada uno, según las indicaciones del anexo técnico de la DIAN.

### ¿Qué información contiene el archivo .zip que recibe el cliente con la factura electrónica?
#### Respuesta
El archivo .zip contiene:
1.  El archivo XML, que es la factura de venta electrónica validada por la DIAN.
2.  El archivo PDF, que es la representación gráfica de la factura.
3.  (Si se adjuntaron archivos a la factura) Un archivo comprimido con los documentos adjuntos.

### ¿Qué información se puede encontrar en la representación gráfica de la factura (archivo PDF)?
#### Respuesta
En la representación gráfica de la factura se puede encontrar:
1.  Los datos de la empresa emisora.
2.  Los datos del receptor (cliente).
3.  La información de la factura con su prefijo y consecutivo.
4.  La resolución de la DIAN, el prefijo y la vigencia.
5.  La información de los productos y servicios facturados con sus respectivos precios e impuestos.
6.  La forma de pago.
7.  El CUFE (Código Único de Factura Electrónica).
8.  La fecha de emisión y validación de la DIAN.
9.  Los datos del proveedor tecnológico.
10. La información del software utilizado para emitir el documento.
11. El código QR.

### ¿Qué es el CUFE y dónde se encuentra?
#### Respuesta
El CUFE (Código Único de Factura Electrónica) es un código único asociado a cada factura electrónica. Se encuentra en la parte inferior de la representación gráfica de la factura (PDF).

### ¿Qué información se encuentra en el archivo XML de la factura electrónica?
#### Respuesta
El archivo XML contiene información técnica y una serie de etiquetas que la DIAN utiliza, en especial un archivo que es el "attach document". Este documento es la validación por parte de la DIAN del archivo que se envió con todos los datos de la empresa emisora y del receptor, productos, servicios, impuestos y la información técnica.

### ¿Cómo puede el cliente consultar la factura electrónica en la plataforma de documentos de ContaPyme?
#### Respuesta
Dentro del correo electrónico que recibe el cliente, hay una opción que dice "Ver documento". Al dar clic en esta opción, se abre la plataforma de documentos de ContaPyme, donde se muestra la información de la factura electrónica en formato HTML.

### ¿Qué acciones puede realizar el cliente en la plataforma de documentos electrónicos de ContaPyme?
#### Respuesta
En la plataforma de documentos, el cliente puede aprobar o rechazar el documento electrónico. Si lo rechaza, puede indicar un motivo.

### ¿Cómo se actualiza el estado de la factura en ContaPyme después de que el cliente la aprueba o rechaza?
#### Respuesta
1. En el **Manejador de Operaciones**, ubique la factura de venta.
2. Seleccione la factura.
3. Haga clic en la opción **Actualizar Estado para ese documento seleccionado**.
ContaPyme obtendrá la información actualizada con la aprobación o el rechazo del cliente.

### ¿Dónde se puede ver la bitácora de la factura y el mensaje del cliente en ContaPyme?
#### Respuesta
1. En el **Manejador de Operaciones**, ubique la factura de venta.
2. Seleccione la factura.
3. Abra el **Inspector de datos**.
4. Vaya a la opción **Documento**.
5. Seleccione la pestaña **Bitácora** para ver la trazabilidad del documento y el mensaje del cliente.

### ¿Qué informes se pueden generar desde el módulo de inventarios y facturación después de emitir una factura electrónica?
#### Respuesta
Se pueden generar informes a nivel de inventarios, donde se pueden chequear los saldos de inventario por bodega.  También se pueden ver informes de cuentas por cobrar si la factura fue emitida a crédito.

---

# Formulario rápido de terceros
[Ver el video](https://www.youtube.com/watch?v=AjITwvSkeSs)
Formulario rápido para terceros en ContaPyme

## Tema principal
Creación y configuración del formulario rápido de terceros en ContaPyme.

## Resumen general
Este video explica cómo agilizar la creación de terceros en ContaPyme, especialmente durante el proceso de facturación. Muestra cómo crear un tercero rápidamente desde el punto de venta con información básica, y cómo personalizar el formulario rápido para incluir los campos más relevantes según las necesidades del usuario, tanto en el punto de venta como en el catálogo de terceros.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es importante tener un formulario rápido para crear terceros en ContaPyme?
#### Respuesta
El formulario rápido agiliza la facturación en el punto de venta, permitiendo crear un tercero con la información básica necesaria para la facturación electrónica, como lo exigen las nuevas implementaciones de la DIAN.

### ¿Cómo se crea un tercero rápidamente desde el punto de venta?
#### Respuesta
1.  Dirígete a la operación de **Punto de Venta** o **Facturación y Ventas**.
2.  En el campo **Cliente**, digita el código del cliente.
3.  Haz clic en el botón **Más (+)**.
4.  Confirma que es un cliente dando clic en **Aceptar**.
5.  Ingresa la información solicitada (nombre, apellido, correo electrónico, celular).  El nombre es obligatorio.
6.  Haz clic en **Aceptar** para crear el tercero.

### ¿Qué información es obligatoria al crear un tercero en el formulario rápido?
#### Respuesta
El nombre es obligatorio. Si no se ingresa, el sistema usará los datos de la empresa para el celular.

### ¿Cómo puedo ver la información completa del tercero después de crearlo rápidamente?
#### Respuesta
Después de crear el tercero en el formulario rápido, haz clic en los **tres puntos** al lado del nombre del tercero y selecciona **Visualizar**.

### ¿Cómo se personaliza el formulario rápido de terceros?
#### Respuesta
1.  Ve a **Básico > Terceros**.
2.  Selecciona un tercero existente o intenta crear uno nuevo para acceder al formulario rápido.
3.  Cierra la operación y dirígete a **Configuración > Configuración Avanzada**.
4.  Asegúrate de que la configuración sea para **Todos los usuarios**.
5.  En el menú de la izquierda, dentro del catálogo de terceros, busca la opción **Datos Tercero**.
6.  Selecciona la pestaña (Principal, Datos de Contacto, Proveedor, Cliente, etc.) que contiene los campos que deseas agregar o quitar.
7.  Haz clic en el icono de **Formulario Rápido** a la derecha del campo para incluirlo o excluirlo del formulario rápido.
8.  Haz clic en **Aceptar** para guardar los cambios.

### ¿La configuración del formulario rápido afecta tanto al catálogo de terceros como al punto de venta?
#### Respuesta
Sí, la configuración que realices en **Configuración > Configuración Avanzada** se aplicará tanto al formulario rápido que aparece al crear un tercero en el catálogo de terceros, como al formulario rápido que aparece al crear un tercero desde la operación de punto de venta.

### ¿Cómo puedo agregar el tratamiento y el cargo al formulario rápido de terceros?
#### Respuesta
1.  Ve a **Básico > Terceros**.
2.  Selecciona un tercero existente o intenta crear uno nuevo para acceder al formulario rápido.
3.  Cierra la operación y dirígete a **Configuración > Configuración Avanzada**.
4.  Asegúrate de que la configuración sea para **Todos los usuarios**.
5.  En el menú de la izquierda, dentro del catálogo de terceros, busca la opción **Datos Tercero**.
6.  Selecciona la pestaña **Principal**.
7.  Haz clic en el icono de **Formulario Rápido** a la derecha de los campos **Tratamiento** y **Cargo** para incluirlos en el formulario rápido.
8.  Haz clic en **Aceptar** para guardar los cambios.

---

# Generación del set de pruebas ante la DIAN
[Ver el video](https://www.youtube.com/watch?v=-ScEeRbEjfs)
-ScEeRbEjfs

## Tema principal
Generación y carga del set de pruebas en el portal de la DIAN para la habilitación de factura electrónica.

## Resumen general
Este video explica el proceso para generar el set de pruebas necesario para la habilitación de factura electrónica ante la DIAN. Se muestra cómo acceder al portal de la DIAN, seleccionar el modo de operación con un proveedor tecnológico (Cadena S.A.S), y copiar el set de pruebas generado. Finalmente, se indica cómo pegar y subir este set de pruebas en la plataforma de ContaPyme para completar el proceso de habilitación.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo al portal de la DIAN para la habilitación de factura electrónica?
#### Respuesta
Debes ingresar al sitio web oficial de la DIAN (dian.gov.com) y buscar la opción de factura electrónica. Luego, ingresa a la opción de habilitación dentro de factura electrónica.

### ¿Qué información necesito para ingresar al portal de habilitación de la DIAN?
#### Respuesta
Necesitas los datos correspondientes a tu empresa y el token de acceso que se envía a tu correo electrónico.

### ¿Dónde se configura el modo de operación para factura electrónica en el portal de la DIAN?
#### Respuesta
El modo de operación se configura en la opción de registro y habilitación, luego en documentos electrónicos, y finalmente en factura electrónica. Dentro de factura electrónica, selecciona "Configurar modos de operación".

### ¿Qué modo de operación debo seleccionar si uso un proveedor tecnológico como Cadena S.A.S?
#### Respuesta
Debes seleccionar la opción "Software de un proveedor tecnológico" y luego buscar y seleccionar "Cadena" como el nombre de la empresa proveedora.

### ¿Qué nombre de software debo seleccionar en el portal de la DIAN?
#### Respuesta
Debes seleccionar "Factura Cadena" como el nombre del software.

### ¿Dónde encuentro el set de pruebas en el portal de la DIAN?
#### Respuesta
Después de seleccionar el modo de operación y el software, debes dirigirte a la opción "Detalles del set de pruebas".

### ¿Cómo copio el set de pruebas desde el portal de la DIAN?
#### Respuesta
Dentro de la sección "Detalles del set de pruebas", encontrarás una opción para copiar el set de pruebas. Selecciona esa opción para copiar el texto al portapapeles.

### ¿Dónde subo el set de pruebas en ContaPyme?
#### Respuesta
Desde el portal de clientes, debes ir a la opción de facturación electrónica y luego continuar hasta la parte inferior donde dice "Subir set de pruebas".

### ¿Cómo subo el set de pruebas en ContaPyme?
#### Respuesta
Debes pegar el set de pruebas que copiaste del portal de la DIAN en el campo correspondiente y luego hacer clic en "Subir requisito".

---

# Impresión de la factura de tirilla
[Ver el video](https://www.youtube.com/watch?v=Df6zhC_-PfY)
Impresión de la factura de tirilla

## Tema principal
Imprimir facturas de venta en tirilla utilizando los documentos de impresión adecuados en ContaPyme, dependiendo del driver de la impresora.

## Resumen general
Este video explica cómo imprimir facturas de venta en tirilla en ContaPyme.  Muestra la diferencia entre usar el documento de impresión para impresoras con driver original y el documento para impresoras con driver genérico. Además, enseña cómo instalar un driver genérico para la impresora en caso de no tener el driver original.  Finalmente, explica cómo imprimir la factura de tirilla desde el manejador de operaciones.

## Preguntas Frecuentes (FAQ)

### ¿Qué opciones de documentos de impresión ofrece ContaPyme para la impresión de facturas de tirilla?
#### Respuesta
ContaPyme ofrece dos documentos de impresión que se pueden usar para imprimir facturas de tirilla:
*   **Factura de venta en tirilla (código 20):** Se utiliza cuando la impresora tiene instalado su driver original.
*   **Factura de venta tirilla de texto (código 22):** Se utiliza cuando no se tiene el driver original de la impresora y se ha instalado un driver genérico.

### ¿Dónde puedo encontrar los documentos de impresión en ContaPyme?
#### Respuesta
Los documentos de impresión se encuentran en:
**Básico > Catálogos > Documentos de Impresión**

### ¿Cuál es la diferencia entre usar el documento 20 y el documento 22 para imprimir facturas de tirilla?
#### Respuesta
La principal diferencia radica en el driver de la impresora que se esté utilizando:

*   **Documento 20 (Factura de venta en tirilla):**  Está diseñado para funcionar correctamente con el driver original de la impresora, mostrando márgenes correctos.
*   **Documento 22 (Factura de venta tirilla de texto):** Está diseñado para funcionar con un driver genérico. Al imprimir con este documento, las márgenes pueden aparecer muy ceñidas a la parte izquierda del tirilla.

### ¿Qué debo hacer si no tengo el driver original de mi impresora de tirilla?
#### Respuesta
Si no tiene el driver original de su impresora, puede instalar un driver genérico en Windows. El video explica cómo hacerlo.

### ¿Cómo se instala un driver genérico para la impresora?
#### Respuesta
Para instalar un driver genérico para la impresora, siga estos pasos:

1.  Haga clic en el botón de **Inicio** de Windows.
2.  Busque y abra el **Panel de Control**.
3.  Haga clic en **Hardware y Sonido**.
4.  Haga clic en **Ver dispositivos e impresoras**.
5.  Haga clic en **Agregar una impresora**.
6.  Haga clic en **La impresora que quiero no está en la lista**.
7.  Seleccione la opción **Agregar una impresora local o de red con configuración manual** y haga clic en **Siguiente**.
8.  Seleccione el puerto de impresora adecuado. Si es una impresora USB, seleccione el puerto USB correspondiente y haga clic en **Siguiente**.
9.  En la parte izquierda, seleccione **Genérico**. En la parte derecha, seleccione **Genérica solo texto**.
10. Haga clic en **Siguiente**.
11. Asigne un nombre a la impresora, por ejemplo, "Impresora Post", y haga clic en **Siguiente**.
12. El sistema instalará el driver. Puede imprimir una página de prueba para verificar que funciona correctamente.
13. Haga clic en **Finalizar**.

### ¿Es recomendable usar un driver genérico en lugar del driver original de la impresora?
#### Respuesta
No, lo más recomendado es siempre utilizar el driver original de la impresora. Sin embargo, si no se tiene acceso al driver original, se puede utilizar un driver genérico como alternativa.

### ¿Cómo se imprime una factura de tirilla desde el manejador de operaciones en ContaPyme?
#### Respuesta
Hay varias formas de imprimir una factura de tirilla desde el manejador de operaciones:

*   **Opción 1 (Teclado):**
    1.  Ubíquese sobre la operación deseada.
    2.  Presione **Control + Y** en el teclado.
    3.  Seleccione el documento de impresión correcto (20 si tiene el driver original, 22 si tiene el driver genérico).
    4.  Haga clic en **Vista previa** para ver la factura o haga clic directamente en el botón de imprimir.

*   **Opción 2 (Clic derecho):**
    1.  Ubíquese sobre la operación deseada.
    2.  Haga clic derecho sobre la operación.
    3.  Seleccione la opción **Imprimir**.
    4.  Seleccione el documento de impresión correcto y proceda a imprimir.

*   **Opción 3 (Teclas directas):**
    1. Ubíquese sobre la operación deseada.
    2. Presione las teclas **Control + I** para imprimir directamente. Se usará el documento de impresión predeterminado.

### ¿Cómo puedo ver una vista previa de la factura de tirilla antes de imprimirla?
#### Respuesta
Al usar el método de **Control + Y** desde el manejador de operaciones, después de seleccionar el documento de impresión (20 o 22), haga clic en el botón **Vista previa**. Esto mostrará una vista previa de la factura antes de imprimirla.

### ¿Qué debo hacer después de instalar el driver genérico para asegurar que funcione correctamente?
#### Respuesta
Después de instalar el driver genérico, asegúrese de:

1.  Verificar en **Dispositivos e impresoras** que la impresora esté instalada.
2.  Verificar que el puerto de la impresora sea el correcto, especialmente si es una impresora USB. Debe asegurarse de que esté conectada al puerto USB correcto.

---

# Informe de Cuadre de Caja
[Ver el video](https://www.youtube.com/watch?v=vSwgm89bl14)
[vSwgm89bl14]

## Tema principal
Generación y análisis del informe de cuadre de caja en ContaPyme.

## Resumen general
Este video explica qué es un cuadre de caja y cómo realizarlo en ContaPyme. Se aprende a generar el informe, entender sus componentes (relación de documentos, resumen de impuestos, resumen de formas de pago, total por tipo de documento y cuadre de efectivo), y configurar las opciones para personalizar la información mostrada. El video utiliza un ejemplo práctico de un usuario cajero para ilustrar el proceso.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un cuadre de caja y cuál es su objetivo?
#### Respuesta
Un cuadre de caja consiste en analizar las transacciones de efectivo durante un turno o período de tiempo. El objetivo es comprobar si todo el efectivo recibido se ha contabilizado correctamente y verificar si coincide con el efectivo físico en la caja. También sirve para evaluar si los controles internos se están llevando a cabo adecuadamente.

### ¿Quiénes deben realizar el informe de cuadre de caja?
#### Respuesta
El informe de cuadre de caja debe ser realizado diariamente por el usuario cajero. Además, un auditor puede realizar arqueos de caja en fechas no previstas para verificar la información.

### ¿Cómo se genera el informe de cuadre de caja en ContaPyme?
#### Respuesta
Para generar el informe de cuadre de caja, siga estos pasos:

1.  Ingrese al sistema ContaPyme con el usuario cajero.
2.  Vaya a la pestaña **Inventarios**.
3.  En la sección **Informes**, haga clic en la flecha de **Ventas**.
4.  Seleccione la opción **Cuadre de Caja**.
5.  Elija el formato del informe: **Normal** (hoja grande) o **Tipo Tirilla** (impresora POS).
6.  Se abrirá la ventana de parametrización del informe.

### ¿Qué opciones de configuración se encuentran en la ventana de parametrización del informe de cuadre de caja?
#### Respuesta
En la ventana de parametrización del informe de cuadre de caja, se encuentran las siguientes opciones:

*   **Cuadre de caja por turnos:** Si está activada, permite generar el informe por turno, equipo y usuario. Si se desactiva, genera un informe general por todo el día y para todos los usuarios en el equipo.
*   **Equipo:** Selecciona el equipo en el que se realizó el turno.
*   **Usuario:** Selecciona el usuario cajero que realizó el turno.
*   **Turno:** Selecciona el turno específico que se desea consultar. Muestra el historial de turnos del usuario.
*   **Valor base de la caja:** Muestra el valor base con el que inició el turno.
*   **Tipos de documento soporte a incluir:** Permite seleccionar los tipos de documentos (ventas, devoluciones, ingresos, gastos) que se tendrán en cuenta en el informe.
*   **Con base a:** Permite seleccionar la fecha a considerar para generar el cuadre de caja:
    *   **Fecha de creación de la operación:** El día en que se realizó la factura.
    *   **Fecha de soporte:** La fecha indicada en la operación (puede ser diferente al día de creación).
    *   **Fecha de proceso:** El día en que se procesó la operación.
*   **Ver detalle de documentos registrados con sus valores:** Muestra el listado de documentos (facturas, devoluciones) con sus valores respectivos.
*   **Ver detalle de pagos de transacciones bancarias, créditos y bonos:** Muestra detalles de pagos realizados con banco, créditos o bonos, y los resta del cuadre de efectivo.
*   **Calidad de borrador:** Opción para impresoras matriz de punto.
*   **Visualizar la fecha y hora en el pie de página:** Muestra la fecha y hora de impresión en el pie de página del informe.
*   **Ocultar explicación de cada componente del informe:** Oculta la descripción de cada sección del informe (relación de documentos, resumen de impuestos, etc.).

### ¿Qué información se muestra en el informe de cuadre de caja?
#### Respuesta
El informe de cuadre de caja muestra la siguiente información:

*   **Encabezado:** Nombre de la empresa, NIT y nombre del informe.
*   **Datos del cajero:** Nombre del cajero, nombre del computador y período del turno (fecha y hora de inicio y fin).
*   **Relación de documentos registrados:** Listado de documentos (facturas de venta, devoluciones) con su número, valor bruto, descuentos, valor del IVA, impuestos, retenciones y valor neto.
*   **Resumen de impuestos en ventas y compras:** Cuenta de IVA, nombre de la cuenta, valor base y valor total del IVA calculado.
*   **Resumen de formas de pago:** Ingresos, devoluciones, gastos y total por cada forma de pago (contado, crédito, banco).
*   **Total del ejercicio por tipo de documento:** Total de ingresos y egresos por cada tipo de documento (factura de venta, devolución en ventas).
*   **Cuadre de efectivo:** Total del ejercicio (ingresos menos egresos) + valor base de la caja = total de efectivo.

### ¿Cómo afecta la fecha seleccionada en "Con base a" al informe de cuadre de caja?
#### Respuesta
La opción "Con base a" determina qué fecha se utiliza para incluir las transacciones en el informe:

*   **Fecha de creación de la operación:** Se incluyen las transacciones realizadas en el día en que se creó la factura.
*   **Fecha de soporte:** Se incluyen las transacciones según la fecha que se le asignó a la operación, independientemente del día en que se creó.
*   **Fecha de proceso:** Se incluyen las transacciones según el día en que se procesó la operación.

### ¿Qué ocurre si se realizan pagos a crédito o con banco?
#### Respuesta
Si se realizan pagos a crédito o con banco, estos se mostrarán en el "Resumen de formas de pago". Además, si la opción "Ver detalle de pagos de transacciones bancarias, créditos y bonos" está activada, estos pagos se detallarán y se restarán del cuadre de efectivo final.

---

# Informe de códigos de barras
[Ver el video](https://www.youtube.com/watch?v=igTUiOGTZ8Q)
Informe de códigos de barras en ContaPyme

## Tema principal
Generación e impresión de informes de códigos de barras de productos en ContaPyme.

## Resumen general
Este video explica cómo generar e imprimir informes de códigos de barras en ContaPyme. Aprenderás a configurar el informe, filtrar productos por diferentes criterios (código, departamento, línea), seleccionar la lista de precios que se mostrará en el código, elegir qué productos incluir en el informe y la cantidad de etiquetas de código de barras que se imprimirán por producto. El video muestra cómo el sistema interpreta los códigos de barras, ya sean predeterminados por el proveedor o creados por el usuario, y cómo se reflejan en el informe impreso.

## Preguntas Frecuentes (FAQ)

### ¿Qué ventajas ofrece el uso de códigos de barras en un sistema como ContaPyme?
#### Respuesta
Los códigos de barras permiten la automatización y agilización de procesos, facilitando la lectura de la información de los productos mediante lectores de código de barras en un sistema contable y administrativo como ContaPyme.

### ¿ContaPyme permite usar códigos de barras proporcionados por los proveedores?
#### Respuesta
Sí, ContaPyme permite el uso de códigos de barras predeterminados que vienen con los productos de los proveedores.

### ¿Puedo crear mis propios códigos de barras en ContaPyme?
#### Respuesta
Sí, ContaPyme te permite crear tus propios códigos de barras para los elementos de tu inventario.

### ¿Qué información se puede incluir en los códigos de barras generados en ContaPyme?
#### Respuesta
Los códigos de barras pueden incluir el peso, el precio y otros datos, según la configuración que se establezca en ContaPyme.

### ¿Cómo accedo a la función de informe de códigos de barras en ContaPyme?
#### Respuesta
Para acceder a la función de informe de códigos de barras, sigue estos pasos:
1. Ve a **Inventarios**.
2. Selecciona **Elementos de inventario**.
3. Haz clic derecho sobre cualquier elemento del inventario.
4. Selecciona **Informes**.
5. Haz clic en **Códigos de barras**.

### ¿Qué opciones de filtro tengo disponibles al generar el informe de códigos de barras?
#### Respuesta
Puedes filtrar los productos por:
-   **Código del producto**
-   **Referencia del fabricante**
-   **Producto inicial y producto final** (rango de productos)
-   **Departamento**
-   **Línea**

### ¿Por qué es importante seleccionar la lista de precios al generar el informe de códigos de barras?
#### Respuesta
La lista de precios se selecciona porque por defecto, los códigos de barras se imprimen con el precio del producto, lo cual es útil para el usuario.

### ¿Qué opciones de configuración adicionales puedo encontrar al generar el informe de códigos de barras?
#### Respuesta
Puedes configurar si deseas mostrar solo los productos que tienen cantidad, los que están visibles en selección, y mostrar la ventana de cantidades.

### ¿Cómo selecciono qué productos incluir en el informe de códigos de barras y cuántos códigos de barras imprimir por producto?
#### Respuesta
Después de configurar el informe y hacer clic en "Ver reporte", aparecerá una ventana donde puedes:
1.  Hacer doble clic en el campo "Código del elemento" para seleccionar los productos que deseas incluir.
2.  Indicar la cantidad de códigos de barras que deseas imprimir para cada producto en la columna correspondiente.
3.  Hacer clic en "Aceptar cambios" para guardar la selección.

### ¿Qué información se muestra en el informe de códigos de barras generado en ContaPyme?
#### Respuesta
El informe muestra:
-   El nombre del producto.
-   La unidad del producto.
-   El código del elemento.
-   El precio del producto.
-   El código de barras.
-   La cantidad de códigos de barras solicitados por producto.

### ¿Puedo imprimir códigos de barras con los códigos que me trajo el proveedor?
#### Respuesta
Sí, el sistema va a hacer la interpretación en barras y eso es lo que va a imprimir ya sean los códigos que te trajo el proveedor y que leíste.

### ¿Puedo imprimir códigos de barras con los códigos que yo mismo generé?
#### Respuesta
Sí, puedes imprimir códigos de barras con los códigos que tu mismo generaste en tu inventario. El sistema va a hacer la interpretación en barras y eso es lo que va a imprimir.

---

# Integración Datafono Redeban en ContaPyme
[Ver el video](https://www.youtube.com/watch?v=agdP5ktSsTU)
[Integración Datafono Redeban en ContaPyme]

## Tema principal
Configuración del datáfono Redeban para su uso con ContaPyme.

## Resumen general
Este video explica cómo configurar un datáfono Redeban para que funcione correctamente con ContaPyme. Describe los pasos para acceder a la configuración dentro del programa, las dos opciones de conexión del datáfono (directa al computador o mediante servicio web) y la información necesaria en cada caso. El video muestra cómo se habilita el pago con datáfono en la operación de punto de venta y cómo se completa la transacción.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un datáfono?
#### Respuesta
Un datáfono es un dispositivo que permite recibir pagos a través de tarjetas de débito o crédito.

### ¿Con qué compañía tiene alianza ContaPyme para la integración de datáfonos?
#### Respuesta
ContaPyme tiene una alianza con la compañía Redeban, lo que permite la integración con el 95% de sus datáfonos.

### ¿En qué operaciones de ContaPyme puedo integrar el datáfono Redeban?
#### Respuesta
La integración del datáfono Redeban es funcional tanto en la operación de Facturación y Ventas como en la operación de Punto de Venta.

### ¿Cómo accedo a la configuración del datáfono Redeban en ContaPyme?
#### Respuesta
Para acceder a la configuración del datáfono Redeban, sigue estos pasos:

1.  Dirígete al **Manejador de Operaciones**.
2.  Busca la operación de **Facturación y Ventas** o **Punto de Venta**.
3.  En la operación, ve al apartado **Operación** (parte superior izquierda).
4.  Selecciona **Configurar Operación**.
5.  Selecciona **Configuración para todos los usuarios**.
6.  En el menú de la izquierda, busca la opción **Interfase con datáfonos de Redeban** (dentro de Configuración de Periféricos).

### ¿Qué debo hacer después de acceder a la configuración de la interfase con datáfonos de Redeban?
#### Respuesta
Después de acceder a la configuración de la interfase, debes:

1.  **Activar** la interfase con el datáfono Redeban.
2.  Seleccionar el tipo de conexión del datáfono:
    *   **Aplicativo cajas conexión al PC:** Si el datáfono está conectado directamente al computador.
    *   **Servicio web:** Si el datáfono utiliza internet o un servicio web.

### ¿Qué información necesito si selecciono "Aplicativo cajas conexión al PC"?
#### Respuesta
Si seleccionas "Aplicativo cajas conexión al PC", debes indicar la ruta donde se encuentra el ejecutable `cajas.exe`. Este ejecutable lo proporciona Redeban y debes solicitarlo a tu asesor. Luego debes indicar la ruta en la casilla correspondiente dentro de ContaPyme y dar clic en "Aceptar".

### ¿Qué información necesito si selecciono "Servicio web"?
#### Respuesta
Si seleccionas "Servicio web", Redeban te proporcionará una ID de terminal de pago. Debes ingresar esta ID en la casilla correspondiente dentro de ContaPyme y dar clic en "Aceptar".

### ¿Cómo veo reflejada la integración del datáfono en ContaPyme al momento de registrar una venta?
#### Respuesta
Al registrar una operación de venta, sigue estos pasos:

1.  Selecciona el producto.
2.  Ve al apartado **Banco**.
3.  Verás que se ha habilitado la opción **Pago con datáfono Redeban**. También puedes acceder directamente con la combinación de teclas **Control + F11**.
4.  Da clic en esta opción y sigue las instrucciones que te indica el datáfono.
5.  Una vez finalizada la transacción en el datáfono, da clic en "Aceptar y finalizar" en ContaPyme.

---

# Introducción a documentos electrónicos con ContaPyme
[Ver el video](https://www.youtube.com/watch?v=i7_0u8Go10E)
i7_0u8Go10E

## Tema principal
Entendimiento general de los documentos electrónicos en Colombia.

## Resumen general
Este video explica el concepto general de los documentos electrónicos en Colombia, impulsados por la DIAN, y su importancia para el control tributario. Se detalla qué son los documentos electrónicos, sus características (XML, representación gráfica, firma electrónica, códigos únicos), los tipos más comunes (factura electrónica, nómina electrónica, documento de soporte), y el proceso de envío a la DIAN a través de proveedores tecnológicos. También aborda los eventos asociados a las facturas de crédito y la plataforma RADIAN. El video busca dar una visión general de este tema, incluyendo la evolución de los documentos electrónicos en el tiempo.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los documentos electrónicos y cuál es su objetivo?
#### Respuesta
Los documentos electrónicos son un conjunto de información que se envía a la DIAN para tener un control previo de los tributos generados en las transacciones de las empresas. Incluyen la facturación electrónica, la nómina electrónica, el documento de soporte y los eventos a facturas a crédito.

### ¿Qué tipos de documentos comprende la facturación electrónica?
#### Respuesta
La facturación electrónica comprende tres documentos:
*   Factura de venta electrónica.
*   Nota crédito electrónica.
*   Nota débito electrónica.

### ¿Para qué se utiliza la factura de venta electrónica?
#### Respuesta
La factura de venta electrónica es un documento que respalda tributariamente las actividades comerciales, expresando la venta de productos o servicios de un vendedor a su cliente.

### ¿Qué es una nota crédito electrónica y cuándo se utiliza?
#### Respuesta
Una nota crédito electrónica es un documento que se utiliza para anular total o parcialmente una factura, o para disminuir el valor de una factura por descuentos.

### ¿Qué es una nota débito electrónica y cuándo se utiliza?
#### Respuesta
Una nota débito electrónica es un documento que se utiliza para aumentar el valor de una factura, por ejemplo, por cambios de valor o por intereses.

### ¿Cómo se envían las facturas electrónicas a la DIAN?
#### Respuesta
1.  La empresa (emisor) genera la factura de venta en su ERP.
2.  La información se envía al proveedor tecnológico.
3.  El proveedor tecnológico convierte la información a un archivo XML y lo envía a la DIAN.
4.  La DIAN valida el documento e incorpora el CUFE.
5.  El proveedor tecnológico envía al cliente (adquiriente) el documento XML y la representación gráfica.

### ¿Qué es la nómina electrónica y qué documentos la componen?
#### Respuesta
La nómina electrónica es el documento que contiene la información de los pagos realizados a los empleados y que se reporta a la DIAN. Se compone de dos documentos:
*   Nómina individual.
*   Nómina individual de ajuste.

### ¿Qué es la nómina individual y para qué se utiliza?
#### Respuesta
La nómina individual es un documento electrónico que se debe reportar a la DIAN por cada empleado, con el total de valores devengados y deducidos. Corresponde al comprobante de pago de nómina del empleado.

### ¿Qué es la nómina individual de ajuste y para qué se utiliza?
#### Respuesta
La nómina individual de ajuste es un documento electrónico que sirve para reemplazar, ajustar o corregir errores en un documento de nómina individual. El último documento de soporte validado reemplaza totalmente al elaborado inicialmente.

### ¿Cómo se envía la nómina electrónica a la DIAN?
#### Respuesta
1.  La empresa realiza los pagos a los empleados.
2.  A fin de mes, reporta la nómina acumulada a la DIAN.
3.  Notifica al proveedor tecnológico el total de devengos y deducciones por empleado.
4.  El proveedor tecnológico genera el archivo XML y lo envía a la DIAN.
5.  La DIAN valida el archivo e incorpora el CUNE.
6.  Se entrega la representación gráfica y el XML a los empleados.

### ¿Qué es el documento de soporte en adquisiciones y quién lo genera?
#### Respuesta
El documento de soporte en adquisiciones es un documento electrónico que generan las personas y empresas obligadas a expedir factura de venta cuando realizan una compra o pago a una persona que no está obligada a facturar.

### ¿Para qué se genera el documento de soporte en adquisiciones?
#### Respuesta
El documento de soporte sirve como soporte de costos, deducciones, y permite descontar los impuestos en las declaraciones tributarias.

### ¿Cómo se envía el documento de soporte a la DIAN?
#### Respuesta
1.  La empresa realiza una compra a un proveedor no obligado a facturar.
2.  La empresa se auto expide el documento de soporte.
3.  Se notifica al proveedor tecnológico para que envíe el archivo XML a la DIAN.
4.  La DIAN valida el archivo e incorpora el CUDE.
5.  El proveedor tecnológico retorna a la empresa el documento de soporte validado por la DIAN.

### ¿Qué son los eventos electrónicos a facturas de crédito?
#### Respuesta
Son una serie de notificaciones que un comprador debe realizar a la DIAN cuando recibe una factura de venta a crédito.

### ¿Cuáles son los eventos que se deben realizar a una factura de venta a crédito?
#### Respuesta
Los eventos son:
1.  Acuse de recibo de la factura electrónica de venta.
2.  Recibo del bien o prestación del servicio.
3.  Aceptación expresa o aceptación tácita de la factura electrónica.
4.  (Opcional) Reclamo.

### ¿Para qué sirven los eventos de acuse de recibo de la factura y recibo del bien o servicio?
#### Respuesta
Estos dos primeros eventos sirven para que el comprador pueda utilizar esa factura como soporte de costos, deducciones e impuestos descontables.

### ¿Para qué sirven los eventos de aceptación expresa o tácita?
#### Respuesta
Estos eventos sirven para que el proveedor pueda notificar la factura de venta electrónica como un título de valor y comercializarla en la plataforma RADIAN de la DIAN.

### ¿Qué es la aceptación tácita y cuándo se genera?
#### Respuesta
La aceptación tácita se da cuando, después de tres días hábiles del recibo del bien o servicio, el comprador no ha realizado una aceptación expresa ni un reclamo. En este caso, el proveedor puede notificar a la DIAN la aceptación tácita.

### ¿Qué es RADIAN y para qué sirve?
#### Respuesta
RADIAN es una plataforma de la DIAN donde las empresas pueden subir sus facturas de venta electrónicas a crédito para que otras entidades las compren, facilitando el factoring electrónico.

### ¿En qué consiste la recepción de factura electrónica que ofrece ContaPyme?
#### Respuesta
ContaPyme ofrece un plus que permite a las empresas agilizar el registro de facturas electrónicas a crédito que reciben de sus proveedores. El usuario reenvía los correos de las facturas a un buzón de ContaPyme, y el sistema convierte automáticamente los archivos XML en transacciones de compra o gasto.

### ¿Qué beneficios ofrece la recepción de factura electrónica de ContaPyme?
#### Respuesta
*   Agiliza la contabilización de transacciones de compras y gastos.
*   Crea automáticamente la operación de compra o de gastos.
*   Crea de forma automatizada el tercero proveedor.
*   Relaciona de forma automatizada los productos o servicios del proveedor con los de la base de datos de la empresa.

### ¿Cómo se generan los eventos electrónicos en ContaPyme una vez registrada la factura?
#### Respuesta
Una vez registrada la factura, el usuario debe generar los eventos correspondientes (acuse de recibo, recibo del bien o servicio, aceptación expresa o reclamo) para notificar a la DIAN. Cada evento genera un archivo XML validado.

### ¿Cuál ha sido la evolución de los documentos electrónicos en Colombia?
#### Respuesta
*   **2020:** Entrada en firme de la facturación electrónica con validación previa.
*   **2021:** Implementación de la nómina electrónica y del documento de soporte electrónico.
*   **2022:** Implementación de los eventos electrónicos a facturas de crédito.

---

# Manejo de memorias POS
[Ver el video](https://www.youtube.com/watch?v=soQCPEBevBM)
Manejo de memorias o cuentas pendientes por facturar en Contapyme

## Tema principal
Configuración y uso de memorias (cuentas pendientes) en el punto de venta (POS) de ContaPyme.

## Resumen general
Este video explica cómo utilizar la funcionalidad de "memorias" en ContaPyme para manejar múltiples facturas o cuentas pendientes al mismo tiempo, ideal para negocios como restaurantes donde se atienden varias mesas simultáneamente. Se muestra cómo configurar la cantidad de memorias disponibles, personalizar su nombre (por ejemplo, "mesas"), y cómo alternar entre ellas para registrar productos y completar las facturas a medida que los clientes pagan. El video detalla los pasos para configurar esta funcionalidad y cómo usarla de manera eficiente en el día a día del negocio.

## Preguntas Frecuentes (FAQ)

### ¿Qué son las memorias o cuentas pendientes por facturar en ContaPyme?
#### Respuesta
Las memorias o cuentas pendientes por facturar son facturas que se están registrando simultáneamente en el mismo sistema ContaPyme. Permiten trabajar en varias facturas al mismo tiempo y guardarlas para completarlas posteriormente.

### ¿En qué tipo de negocio es útil la función de memorias en ContaPyme?
#### Respuesta
Esta funcionalidad es especialmente útil en negocios como restaurantes donde se atienden varias mesas simultáneamente y se necesita registrar consumos en cada mesa hasta que el cliente solicite la cuenta.

### ¿Cómo accedo a la operación de punto de venta (POS) en ContaPyme para usar las memorias?
#### Respuesta
Puedes acceder a la operación de punto de venta (POS) de dos maneras:
1.  Desde el **Manejador de Operaciones**, ubicado en la sección de **Catálogos** en la parte superior izquierda.
2.  Desde el menú **Más**, luego **Ventas**, y finalmente **Punto de Venta**.

### ¿Cómo cambio entre las diferentes memorias o cuentas pendientes en ContaPyme?
#### Respuesta
Para cambiar entre las diferentes memorias, haz doble clic en la parte superior izquierda de la pantalla donde dice "Memoria" o "Mesa" (si ya lo configuraste con ese nombre). Aparecerá una ventana donde puedes seleccionar la memoria que deseas utilizar.

### ¿Cómo configuro la cantidad de memorias o mesas disponibles en ContaPyme?
#### Respuesta
Para configurar la cantidad de memorias disponibles, sigue estos pasos:

1.  Ve a la parte superior izquierda y haz clic en **Operación**.
2.  Selecciona **Configurar Operación**.
3.  Elige **Configuración para Todos los Usuarios**.
4.  En el menú de la izquierda, busca y haz clic en **Múltiples Cuentas Pendientes por Facturar**.
5.  Aquí puedes habilitar el manejo estandarizado (con un número fijo de memorias) o el manejo personalizado, donde puedes definir el nombre de las memorias (ej. Mesas), el número de filas y columnas para determinar la cantidad total de memorias disponibles.
6. Da clic en **Aceptar** para guardar los cambios.

### ¿Qué diferencia hay entre el manejo estandarizado y el manejo personalizado de memorias en ContaPyme?
#### Respuesta
El manejo estandarizado tiene un número fijo de memorias predefinido. El manejo personalizado permite definir el nombre de las memorias (ej. Mesas) y la cantidad de memorias disponibles configurando filas y columnas.

### ¿Puedo configurar memorias diferentes para cada equipo de facturación en ContaPyme?
#### Respuesta
Sí, puedes configurar que las memorias sean específicas para cada equipo de facturación. Dentro de la configuración de **Múltiples Cuentas Pendientes por Facturar**, puedes habilitar la opción que indica que las memorias son para cada equipo de facturación. Si esta opción está deshabilitada, las memorias serán las mismas sin importar el equipo donde se esté facturando.

---

# Manejo y creación de usuario Cajero
[Ver el video](https://www.youtube.com/watch?v=nIpDnkl6Pao)
[nIpDnkl6Pao]

## Tema principal
Creación y configuración de un usuario cajero en ContaPyme.

## Resumen general
Este video explica el proceso para crear y configurar un usuario cajero en ContaPyme, detallando los pasos necesarios para asignarle un código, nombre, perfil de seguridad (con restricciones específicas para facturación), contraseña, licencia y configuración de control de caja. El objetivo es que el usuario cajero pueda operar el punto de venta, registrando productos, procesando pagos y generando recibos, con acceso limitado a sus propias operaciones dentro del sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un usuario cajero en ContaPyme?
#### Respuesta
Un usuario cajero es la persona encargada de operar el punto de venta de un establecimiento comercial. Sus responsabilidades incluyen registrar productos, procesar pagos, generar recibos, manejar devoluciones y realizar el cuadre de caja.

### ¿Cuáles son los pasos para crear y configurar un usuario cajero en ContaPyme?
#### Respuesta
Para crear y configurar un usuario cajero en ContaPyme, sigue estos pasos:
1.  **Crear el usuario:** Asignarle un código, nombre, apellido y contraseña.
2.  **Asignar un perfil de seguridad:** Definir las restricciones que tendrá el usuario en el sistema.
3.  **Activar el control de caja:** Indicar que el usuario requiere control de caja.
4.  **Asignar la licencia:** Asignarle la licencia correspondiente al usuario.

### ¿Cómo se crea un nuevo usuario en ContaPyme?
#### Respuesta
Para crear un nuevo usuario en ContaPyme, sigue estos pasos:
1.  Dirígete a la pestaña **Básico** en el menú principal.
2.  Abre el catálogo de **Usuarios**.
3.  Haz clic derecho en la ventana y selecciona **Crear**, o selecciona el botón **Crear** en la cinta de opciones.
4.  Ingresa la **identificación del usuario** (código). Se sugiere usar un código descriptivo como "cajero-1".
5.  Haz clic en **Aceptar**.
6.  Completa los campos obligatorios en la ventana de registro de usuario.

### ¿Cuáles son los campos obligatorios al crear un usuario en ContaPyme?
#### Respuesta
Los campos obligatorios al crear un usuario son:
*   **Código del usuario** (se asigna al inicio del proceso).
*   **Nombre**.
*   **Perfil principal**.

### ¿Qué es un perfil de seguridad y cómo se asigna a un usuario?
#### Respuesta
Un perfil de seguridad define las restricciones que un usuario tendrá en el sistema, determinando qué funciones puede realizar. Para asignar un perfil:

1.  En la ventana de registro de usuario, ubica el campo **Perfil principal**.
2.  Haz clic en el campo para ver los perfiles disponibles.
3.  Selecciona el perfil deseado (por ejemplo, "Facturación" para un usuario cajero).
4.  Haz doble clic en el perfil para asociarlo al usuario.

### ¿Qué tipos de perfiles de seguridad predeterminados existen en ContaPyme?
#### Respuesta
Algunos perfiles de seguridad predeterminados en ContaPyme son:
*   **Administrador:** Permite realizar todas las operaciones sin restricciones (dependiendo del licenciamiento).
*   **Auditor:** Permite visualizar y auditar asientos contables, pero no modificarlos.
*   **Auxiliar contable:** Permite digitar asientos contables, pero no acceder a otros módulos.
*   **Facturación:** Permite generar facturas de venta, abrir y cerrar turno (ideal para usuarios cajeros).
*   **Compras:** Permite realizar compras.

### ¿Cómo se asigna una contraseña a un usuario y qué significa la opción "Modificar contraseña en el próximo inicio"?
#### Respuesta
Para asignar una contraseña a un usuario:
1.  En la ventana de registro de usuario, ve a la pestaña **Definición**.
2.  En la sección **General**, ingresa la contraseña en el campo **Contraseña** y confírmala.

La opción **Modificar contraseña en el próximo inicio**:
*   Si está activa, el usuario deberá crear una nueva contraseña al iniciar sesión por primera vez.
*   Si está inactiva, el usuario utilizará la contraseña que se le asignó al crear el usuario.

### ¿Cómo se activa el control de caja para un usuario cajero?
#### Respuesta
Para activar el control de caja:
1.  En la ventana de registro de usuario, ve a la pestaña **Definición**.
2.  En la sección **General**, busca la opción **Este usuario requiere un control de caja**.
3.  Activa la casilla correspondiente.

Al activar el control de caja, también se activa automáticamente la opción **Filtrar operaciones**, lo cual es recomendado para que el usuario solo pueda ver sus propias operaciones.

### ¿Cómo se asigna una licencia a un usuario en ContaPyme?
#### Respuesta
Para asignar una licencia:
1.  En la ventana de registro de usuario, ve a la pestaña **Licencias**.
2.  Busca la licencia que deseas asignar al usuario.
3.  Haz clic en el botón **Asignar** que se encuentra al frente de la licencia correspondiente.
4.  Define la fecha de inicio y fin de la vigencia de la licencia para el usuario.

### ¿Cómo puedo saber qué módulos incluye una licencia específica en ContaPyme?
#### Respuesta
Para ver los módulos incluidos en una licencia:
1.  En la ventana de registro de usuario, ve a la pestaña **Licencias**.
2.  Ubícate en la licencia que deseas consultar.
3.  Haz clic en el icono de la **"i"** (información) que se encuentra en la parte superior derecha.
4.  Se mostrará una ventana con la lista de módulos incluidos en esa licencia.

### ¿Para qué sirve el correo transaccional al crear un usuario?
#### Respuesta
El correo transaccional es importante porque se utilizará para:
*   Ingresar al portal de clientes de IngeSoft.
*   Acceder a la plataforma para ver los vídeos de capacitación.

Por lo tanto, es fundamental ingresar un correo electrónico correcto y válido.

---

# NC Ingresos AD
[Ver el video](https://www.youtube.com/watch?v=dm9XuPKMa5I)
[NC Ingresos AD]

## Tema principal
Creación y envío de notas crédito electrónicas a partir de facturas de venta generadas en el módulo de automatización de documentos de ContaPyme.

## Resumen general
Este video explica cómo generar y enviar notas crédito electrónicas en ContaPyme para anular total o parcialmente facturas electrónicas de venta emitidas a través del módulo de automatización de documentos, específicamente la operación de ingresos. Se detalla el proceso paso a paso, desde la selección de la factura a anular hasta la configuración del documento de soporte y el envío de la nota crédito a la DIAN y al cliente. También se aborda la gestión de impuestos, retenciones y cruce de cuentas por cobrar, así como la personalización de la operación para casos donde la referencia de la factura no sea clara.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una nota crédito y cuándo se utiliza?
#### Respuesta
Una nota crédito es un documento electrónico que se utiliza para realizar anulaciones totales o parciales, rebajas o descuentos a una factura electrónica de venta. En otras palabras, sirve para disminuir el valor de una factura electrónica.

### ¿Cómo puedo crear una nota crédito para una factura electrónica de venta en ContaPyme?
#### Respuesta
Para crear una nota crédito, sigue estos pasos:

1.  Abre el **Manejador de Operaciones**.
2.  Da clic en **Más Operaciones, Ingresos y Gastos**.
3.  Selecciona la operación **Nota Crédito de Ingresos**.
4.  Configura el documento de soporte (debe estar parametrizado como nota crédito electrónica y asociado a tu proveedor tecnológico).
5.  Indica la fecha de la nota crédito y un detalle.
6.  En el campo **Referencia**, busca y selecciona la factura electrónica de venta a la que se le va a realizar la nota crédito. Esto cargará automáticamente la información del cliente y los conceptos facturados.
7.  En el campo **Motivo**, selecciona el motivo de la nota crédito de la lista estandarizada por la DIAN.
8.  Da clic en **Siguiente** para revisar los impuestos y las cuentas por cobrar asociadas a la factura.
9.  Da clic en **Finalizar** para generar la nota crédito.

### ¿Qué debo hacer si la factura electrónica a la que quiero aplicar la nota crédito se generó a cuotas?
#### Respuesta
Si la factura electrónica de venta se generó a cuotas y aún hay cuotas pendientes de pago, el sistema detectará automáticamente las deudas vigentes y realizará un cruce o amortización con la cuenta por cobrar. Si la factura ya fue pagada en su totalidad, deberás registrar manualmente la devolución del dinero al cliente.

### ¿Qué ocurre después de hacer clic en "Finalizar" al crear la nota crédito?
#### Respuesta
Después de hacer clic en "Finalizar", el sistema te preguntará si deseas aprobar el documento para que se envíe. Si respondes que sí, la nota crédito se enviará al proveedor tecnológico y luego a la DIAN. También se enviará una notificación por correo electrónico al cliente. Si respondes que no, puedes revisar el documento y enviarlo posteriormente.

### ¿Qué información contiene el correo electrónico que recibe el cliente con la nota crédito?
#### Respuesta
El correo electrónico que recibe el cliente contiene un archivo .zip con la siguiente información:

*   **Archivo XML:** Contiene la información de la nota crédito autorizada y validada por la DIAN.
*   **Presentación gráfica (PDF):** Es un documento PDF que muestra la nota crédito de la factura electrónica de venta con la información de la anulación. Este documento incluye el número de la factura anulada (CT 110), la fecha de emisión, el CUFE de la factura referenciada y el CUDE (código único de documento electrónico) de la nota crédito, así como un código QR para verificar la información.

### ¿Qué significa el CUDE en la nota crédito electrónica?
#### Respuesta
El CUDE es el Código Único de Documento Electrónico, un código que identifica de manera única la nota crédito electrónica.

### ¿Qué debo hacer si el cliente rechaza la factura y no me indica el número de la factura específica?
#### Respuesta
Si no tienes claridad sobre cuál es la factura que se va a anular, puedes configurar la operación de nota crédito para que el campo "Referencia" sea opcional. Para ello, sigue estos pasos:

1.  Ve a **Operación > Configuración de la Operación > Para todos los usuarios.**
2.  Selecciona la opción **Campos de la Operación.**
3.  Dentro de **Datos Maestros de la Operación**, busca el campo **Referencia** y desactiva la opción "Requerido".

Al hacer esto, el campo "Referencia" se mostrará en color verde claro, indicando que es opcional. Puedes dejarlo vacío si no conoces el número de factura exacto.

### ¿Es recomendable dejar vacío el campo "Referencia" al crear una nota crédito?
#### Respuesta
Si bien la DIAN permite dejar el campo "Referencia" vacío, se recomienda siempre indicar el número de factura a la que se le va a realizar la anulación para que quede relacionado ante la DIAN. Dejarlo vacío debe ser una alternativa en casos donde no se tenga claridad sobre la factura específica, pero no debe ser el método habitual.

### ¿Qué sucede contablemente cuando se emite una nota crédito?
#### Respuesta
La nota crédito reversa contablemente los registros que se habían generado con la factura de venta. Esto significa que se anulan los asientos contables originales.

---

# NC Inventarios IN
[Ver el video](https://www.youtube.com/watch?v=MLkTxVZ9f8I)
[MLkTxVZ9f8I]

## Tema principal
Emisión de notas crédito a facturas de venta en ContaPyme.

## Resumen general
Este video explica cómo generar notas crédito en ContaPyme para facturas de venta, abarcando dos escenarios: devoluciones de mercancía (que impactan el inventario) y descuentos/rebajas (que no implican reintegro de productos). Se detalla el proceso paso a paso para cada caso, incluyendo la selección del documento de soporte adecuado, la referencia a la factura original, el manejo de impuestos y formas de pago, el envío del documento al proveedor tecnológico y a la DIAN, y la visualización del documento por parte del cliente. También se aborda la posibilidad de emitir notas crédito sin referencia a una factura específica en casos excepcionales y cómo configurar esta opción.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una nota crédito y cuál es su función?
#### Respuesta
Una nota crédito es un documento electrónico que se utiliza para anular total o parcialmente una factura, o para aplicar rebajas o descuentos a una factura ya emitida.

### ¿Qué tipos de notas crédito se pueden realizar en ContaPyme?
#### Respuesta
En ContaPyme se pueden realizar dos tipos de notas crédito:
- **Devolución en Ventas:** Se utiliza cuando la factura de venta requiere el reintegro de mercancía al inventario.
- **Nota Crédito Ventas:** Se utiliza cuando se aplica un descuento o rebaja a una factura, pero el cliente no devuelve la mercancía.

### ¿Cómo se realiza una nota crédito por devolución de mercancía en ContaPyme?
#### Respuesta
Para realizar una nota crédito por devolución en ventas, siga estos pasos:
1.  Diríjase a **Básico > Operaciones**.
2.  En la sección **Más Operaciones**, seleccione **Ventas > Devolución en Ventas**.
3.  Asegúrese de que el documento de soporte configurado sea una **Nota Crédito Electrónica**. Este documento debe estar previamente configurado como documento electrónico y asociado con el proveedor tecnológico.
4.  Ingrese la fecha de la nota crédito.
5.  En el campo **Referencia**, indique la factura a la cual se le va a hacer la devolución.
6.  Seleccione el motivo de la nota crédito (ej. Anulación de factura electrónica).
7.  Verifique que el área de registro de productos se torne de color gris.
8.  Registre las observaciones sobre el motivo de la anulación.
9.  Verifique los impuestos y la forma de pago. Si la factura referenciada tiene saldos pendientes, el sistema los cargará automáticamente. Si se debe reintegrar dinero al cliente, indique la forma de pago.
10. Finalice la operación y elija si desea enviar el documento de forma automática o más tarde.

### ¿Cómo se realiza una nota crédito por descuento o rebaja en ContaPyme?
#### Respuesta
Para realizar una nota crédito por descuento o rebaja, siga estos pasos:
1.  Diríjase a **Básico > Operaciones**.
2.  En la sección **Más Operaciones**, seleccione **Ventas > Nota Crédito Ventas**.
3.  Asegúrese de que el documento de soporte configurado sea una **Nota Crédito Electrónica**.
4.  Ingrese la fecha de la nota crédito.
5.  En el campo **Referencia**, indique la factura a la cual se le va a hacer la nota crédito.
6.  Seleccione el motivo de la nota crédito (ej. Rebaja o descuento).
7.  Indique el valor del descuento.
8.  Registre las observaciones sobre el motivo del descuento.
9.  Ajuste los impuestos si es necesario.
10. Indique la forma de pago en la que se reintegrará el dinero al cliente.
11. Finalice la operación y elija si desea enviar el documento de forma automática o más tarde.

### ¿Cómo se aprueba una nota crédito desde el punto de vista del cliente?
#### Respuesta
El cliente recibe un correo electrónico con la información de la nota crédito y un enlace a la plataforma de documentos web. Desde allí, puede visualizar la nota crédito en formato HTML y aprobar o rechazar el documento.

### ¿Cómo se refleja la aprobación de una nota crédito en ContaPyme?
#### Respuesta
Dentro de ContaPyme, ubíquese en la operación de la nota crédito y seleccione **Actualizar Estado**. Si el documento ha sido aprobado por el cliente, aparecerá un icono de una mano con el pulgar hacia arriba en color verde.

### ¿Cómo se verifica si una nota crédito afectó el inventario en ContaPyme?
#### Respuesta
1. Diríjase al módulo de **Inventarios**.
2. Seleccione **Informes > Saldos de Inventario**.
3. Consulte los saldos del producto en cuestión.
4. Para verificar si la nota crédito afectó el inventario, **desprocese** la operación de la nota crédito y actualice el informe. Si el saldo no cambia, significa que la nota crédito no afectó el inventario. Luego, vuelva a procesar la nota crédito.

### ¿Cómo se configura ContaPyme para permitir la emisión de notas crédito sin referencia a una factura específica?
#### Respuesta
En casos excepcionales donde no se pueda identificar la factura a la que corresponde la nota crédito, se puede configurar ContaPyme para que el campo "Referencia" sea opcional:

1.  Diríjase a **Operación > Configuración de Operación**.
2.  Seleccione **Configuración para Todos los Usuarios**.
3.  En la sección **Campos de la Operación, Datos Maestros de la Operación**, ubique la etiqueta **Referencia**.
4.  Desactive la casilla **Requerido**.
5.  Haga clic en **Aceptar**.

Después de esto, el campo "Referencia" aparecerá en color verde, lo que indica que es opcional.
**Importante:** Se recomienda siempre indicar la referencia de la factura, siempre que sea posible.

---

# ND Ingresos AD
[Ver el video](https://www.youtube.com/watch?v=gLCjwIUI5M0)
Nota débito a una factura de venta electrónica realizada por la operación de ingresos del módulo de automatización de documentos.

## Tema principal
Creación y envío de una nota débito electrónica a una factura de venta existente en ContaPyme.

## Resumen general
Este video explica cómo crear y enviar una nota débito electrónica en ContaPyme para aumentar el valor de una factura de venta ya emitida. Se detalla el proceso paso a paso, desde la selección de la factura de referencia hasta la aprobación y envío del documento electrónico al proveedor tecnológico y a la DIAN. También se muestra cómo el cliente recibe y aprueba la nota débito, y cómo esta información se refleja en ContaPyme, incluyendo el movimiento contable generado.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una nota débito y para qué se utiliza?
#### Respuesta
Una nota débito es un documento electrónico que se utiliza para registrar un mayor valor a una factura electrónica de venta. Esto puede ser por motivos como intereses, gastos por cobrar o un cambio en el valor del producto o servicio facturado.

### ¿Cómo se crea una nota débito en ContaPyme?
#### Respuesta
Para crear una nota débito en ContaPyme, siga estos pasos:

1.  Diríjase al **Manejador de Operaciones**.
2.  Seleccione **Más Operaciones**.
3.  En el módulo de **Automatización de Documentos**, haga clic en **Ingresos y Gastos**.
4.  Seleccione la operación **Nota Débito de Ingresos**.
5.  Complete el encabezado del documento, incluyendo el **Tipo de Documento de Soporte**, la **Fecha**, el **Detalle Informativo**, el **Cliente** y el **Motivo**.
6.  En el campo **Referencia**, seleccione la factura a la que se le va a aplicar la nota débito.
7.  Seleccione el **Motivo** del aumento de valor (ej: intereses, cambios de valor, etc.).
8.  Indique el valor adicional que se va a facturar.
9.  Haga clic en **Siguiente** para revisar los impuestos asociados y la forma de pago.
10. Seleccione la forma de pago y la cuenta de caja.
11. Haga clic en **Finalizar**.

### ¿Qué tipo de documento de soporte debo usar al crear la nota débito?
#### Respuesta
El tipo de documento de soporte que se utiliza en el encabezado de la nota débito es clave, ya que es el que está configurado como un documento electrónico y contiene los datos necesarios para la notificación al proveedor tecnológico con el que se realiza la facturación electrónica.

### ¿Qué es el campo "Referencia" en la nota débito?
#### Respuesta
El campo "Referencia" en la nota débito se utiliza para identificar la factura a la cual se le está aplicando el aumento de valor. Al seleccionar la factura en este campo, se cargará automáticamente la información del cliente y los detalles de la factura original.

### ¿Qué opciones de "Motivo" puedo seleccionar al crear una nota débito?
#### Respuesta
Las opciones de "Motivo" disponibles al crear una nota débito están estandarizadas por la DIAN según el anexo técnico. Algunas opciones comunes son "Intereses", "Gastos por Cobrar", "Cambios de Valor" y "Otros". Este listado no se puede modificar y depende directamente de las actualizaciones que la DIAN realice en los anexos técnicos.

### ¿Qué significa "Aprobar el documento para ejecución de acciones automáticas"?
#### Respuesta
Al finalizar la creación de la nota débito, el sistema pregunta si desea aprobar el documento para la ejecución de acciones automáticas. Si se selecciona "Sí", el documento se enviará de forma inmediata al proveedor tecnológico para que lo envíe a la DIAN. Si se selecciona "No", el documento quedará pendiente para un envío posterior manual, permitiendo revisar la operación antes de autorizar el envío.

### ¿Cómo se realiza el envío manual de la nota débito si se seleccionó "No" al aprobar el documento?
#### Respuesta
Si se seleccionó "No" al aprobar el documento inicialmente, el documento quedará en el Manejador de Operaciones. Para enviarlo manualmente, siga estos pasos:

1.  Ubique la nota débito en el **Manejador de Operaciones**.
2.  Visualice la operación para asegurarse de que es la correcta.
3.  Haga clic en **Aprobar Documento**.
    El sistema enviará automáticamente el documento electrónico al proveedor tecnológico y, posteriormente, a la DIAN.

### ¿Qué información recibe el cliente cuando se envía la nota débito?
#### Respuesta
Cuando se envía la nota débito, el cliente recibe un correo electrónico con la siguiente información:

*   Un archivo .zip adjunto que contiene el archivo XML de la nota débito y la representación gráfica en formato PDF.
*   Un enlace para ver el documento publicado en la plataforma de documentos del sistema ContaPyme.

### ¿Qué información se encuentra en el archivo PDF de la nota débito?
#### Respuesta
El archivo PDF de la nota débito contiene la siguiente información:

*   Número de la nota débito.
*   Número de referencia de la factura a la que se le está aplicando el mayor valor.
*   Información del cliente.
*   Valores adicionales registrados.
*   Información de la factura referenciada (número, fecha y CUFE).
*   Código Único del Documento Electrónico (CUDE) de la nota débito.
*   Código QR con la fecha de emisión y validación ante la DIAN.
*   Datos del proveedor tecnológico.
*   Información del software con el cual se emitió el documento.

### ¿Se necesita una resolución de facturación electrónica para emitir notas débito?
#### Respuesta
No, ni para las notas débito ni para las notas crédito se necesita una resolución de facturación electrónica, como sí se requiere para las facturas de venta. El consecutivo y la configuración del prefijo, de los rangos y de la vigencia corresponden a información que cada empresa internamente puede generar.

### ¿Cómo se actualiza el estado de la nota débito en ContaPyme si el cliente la aprueba en la plataforma de documentos?
#### Respuesta
Si el cliente aprueba la nota débito en la plataforma de documentos, para actualizar el estado en ContaPyme, haga lo siguiente:

1.  Ubique la nota débito en el **Manejador de Operaciones**.
2.  Dé clic en la opción **Actualizar Estado**.

    Aparecerá una mano con un dedo hacia arriba indicando que el cliente aceptó la nota débito.

### ¿Dónde puedo ver el movimiento contable generado por la nota débito?
#### Respuesta
Si tiene el sistema ContaPyme con el módulo de automatización de documentos y la parte contable, puede ver el movimiento contable generado por la nota débito a través del inspector de datos:

1.  Ubique la nota débito en el **Manejador de Operaciones**.
2.  Dé clic en la operación.
3.  En el **Inspector de Datos**, seleccione la opción **Operación**.
    Allí podrá ver los débitos y créditos generados por la transacción.

---

# Nómina electrónica en ContaPyme
[Ver el video](https://www.youtube.com/watch?v=DTcuZlrxnTg)
[DTcuZlrxnTg]

## Tema principal
Implementación de la nómina electrónica en ContaPyme y sus requisitos.

## Resumen general
Este video explica qué es la nómina electrónica, su normatividad y quiénes están obligados a generarla. Describe el proceso de envío de la nómina electrónica a la DIAN desde ContaPyme, las etapas de habilitación y producción, y los pasos para el registro en el portal de la DIAN.  También detalla cómo implementar la nómina electrónica en ContaPyme, incluyendo la adquisición del paquete de documentos electrónicos, la activación de la nómina electrónica en el sistema, la configuración de los documentos de soporte, la configuración del correo electrónico de los empleados y la generación de las operaciones de pago de nómina y el reporte de nómina electrónica.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la nómina electrónica?
#### Respuesta
La nómina electrónica es un documento electrónico que sirve como soporte de costos, deducciones o impuestos descontables sobre la renta, derivados de los pagos o abonos relacionados con la nómina. Este documento incluye los valores devengados, deducidos y el valor total de la diferencia entre ellos.

### ¿Cuál es la normatividad de la nómina electrónica?
#### Respuesta
La normatividad se basa en:
*   El párrafo sexto del artículo 616 del Estatuto Tributario.
*   El artículo 80 de la Resolución 42 de mayo de 2020, donde la DIAN acepta el costo o gasto de nómina como deducible, siempre y cuando se transmita la información en el sistema de facturación electrónica de la DIAN.
*   La Resolución 13 de febrero de 2021, que publica el Anexo técnico del documento de pago de nómina electrónica, versión 1.0, que reglamenta los requerimientos técnicos e informáticos para transmitir el XML del documento de pago de nómina electrónica a la DIAN.

### ¿Cuáles son los documentos de nómina electrónica y para qué sirven?
#### Respuesta
Los documentos son:
*   **Nómina individual:** Documento que indica los valores devengados y deducidos por cada empleado, funcionando como comprobante de nómina.
*   **Nómina individual de ajuste:** Documento que sirve para reemplazar, ajustar o corregir errores aritméticos, contables o de contenido de un documento de nómina individual. El último documento de ajuste reemplaza totalmente al elaborado inicialmente.

### ¿Quiénes están obligados a generar la nómina electrónica?
#### Respuesta
Están obligados los contribuyentes que realicen pagos por relación laboral y necesiten soportar (deducir) los costos y pagos de la nómina en el impuesto sobre la renta e impuestos descontables en el IVA.

### ¿Cómo funciona el proceso de la nómina electrónica en general?
#### Respuesta
1.  Se realizan los pagos de nómina a los empleados durante el mes (quincenal, semanal, etc.).
2.  Se registran las novedades, horas extras, bonos, descuentos, etc.
3.  Se contabilizan los pagos de la nómina con sus respectivos parafiscales y deducciones.
4.  Durante los 10 primeros días hábiles del mes siguiente, se reporta a la DIAN el pago realizado a los empleados.
5.  Se acumula la información de cada empleado de la nómina del mes anterior.
6.  Se genera un archivo XML con la información acumulada.
7.  Se envía el archivo XML a la DIAN para su validación y almacenamiento.

### ¿Cómo se envía la nómina electrónica a la DIAN desde ContaPyme?
#### Respuesta
1.  La empresa emite los pagos a los empleados (quincenal, semanal, mensual).
2.  Al principio de cada mes, se genera una nómina acumulada por empleado.
3.  Esta información se envía al proveedor tecnológico (Insoft o el que corresponda).
4.  El proveedor tecnológico convierte la información en formato XML y la envía a la DIAN.
5.  La DIAN valida la información, incorpora el CUNE (Código Único de Nómina Electrónica), y la almacena.
6.  Si se desea, se puede enviar el reporte de nómina electrónica (archivo XML validado por la DIAN) al empleado.

    Este proceso se genera automáticamente dentro de ContaPyme.

### ¿Cuáles son las etapas para implementar la nómina electrónica?
#### Respuesta
Las etapas son:
*   **Habilitación:** Se registran pruebas ante la DIAN para obtener la aprobación como emisor de nómina electrónica.
*   **Producción:** Se envían los reportes de nómina electrónica con los datos reales de los pagos a los empleados mes a mes.

### ¿Cómo me registro en el portal de la DIAN para el proceso de habilitación?
#### Respuesta
1.  Ingresa al portal: **www.dian.gov.co**.
2.  En la parte inferior, en la sección **Temas de interés**, haz clic en **Factura electrónica**, y luego en **Habilitación**.
3.  Ingresa como empresa o persona, indicando el número de identificación del contribuyente.
4.  Ingresa el token de acceso que recibirás en tu correo electrónico (válido por una hora).
5.  En el menú de la parte izquierda, haz clic en **Otros documentos electrónicos**.
6.  Selecciona la opción **Nómina electrónica y nómina de ajuste**.
7.  Acepta el mensaje de confirmación: "¿desea iniciar el proceso de habilitación?".
8.  Ingresa por la opción de **Participantes como emisores**.
9.  Configura los modos de operación indicando cómo se enviarán los documentos electrónicos en modo pruebas. Selecciona **Software de un proveedor tecnológico** y asocia la información del proveedor tecnológico correspondiente (Cadena con el nombre del software de nómina, Zenet u otro).
10. Ingresa a la opción **Set de pruebas**. Encontrarás el **test set ID**, que es el identificador único para el detalle de pruebas.

### ¿Cuántos documentos de prueba permite enviar la DIAN durante la habilitación?
#### Respuesta
La DIAN permite enviar hasta 100 documentos de prueba: 50 documentos de nómina y 50 documentos de ajuste de nómina. Sin embargo, el mínimo requerido para quedar habilitado es de 8 documentos (4 de nómina y 4 de ajuste).

### ¿Cómo sé si los documentos de prueba fueron aceptados en el portal de la DIAN?
#### Respuesta
Una vez que empieces a enviar los documentos de prueba, puedes verificar el indicador gráfico en el portal de la DIAN. Inicialmente, mostrará que estás "en proceso". Si los documentos son aceptados, el indicador gráfico cambiará a "aceptado" y el estado en la parte superior también se actualizará a "aceptado".

### ¿Necesito generar una resolución de nómina en el portal Muisca de la DIAN como en la facturación electrónica?
#### Respuesta
No, a diferencia de la facturación electrónica, para la nómina electrónica no es necesario generar una resolución de nómina en el portal Muisca de la DIAN. Basta con completar el proceso de habilitación y luego empezar a enviar los documentos electrónicos en modo productivo.

### ¿Cuáles son los pasos para implementar la nómina electrónica en ContaPyme?
#### Respuesta
1.  **Adquirir el paquete de documentos electrónicos:** Adquiere el paquete de documentos electrónicos con el área comercial de Insoft o un distribuidor autorizado, según la cantidad de documentos que vayas a enviar en el año. Sigue el paso a paso en el portal de clientes en **www.contapyme.com**, ingresando con tu usuario y contraseña de ContaPyme.
2.  **Activar la nómina electrónica en ContaPyme:** Activa la nómina electrónica en el explorador gráfico de la empresa dentro del sistema ContaPyme.
3.  **Configurar los documentos de soporte:** Configura en el catálogo de documentos de soporte los documentos "reporte de nómina electrónica" y "reporte de ajuste de nómina electrónica". Activa la opción de que es un documento electrónico e indica con qué proveedor tecnológico se va a enviar.
4.  **Configurar el correo electrónico de los empleados:** En el catálogo de terceros, dentro de la información de cada empleado, configura el correo electrónico al cual deseas enviar el documento de la nómina.
5.  **Generar las operaciones de pago de nómina:** Genera la operación de pago de nómina para que la información se acumule y, durante los primeros días del mes siguiente, puedas realizar el reporte de nómina electrónica.

### ¿Cuál es la operación en ContaPyme que permite generar la nómina electrónica?
#### Respuesta
Si tienes el módulo de nómina, puedes encontrar las operaciones en el manejador de operaciones bajo el menú **Nómina**. Allí encontrarás operaciones como:
*   **Registro de novedades de nómina.**
*   **Pago de nómina:** Genera la contabilización de los diferentes conceptos (devengos y deducciones), los parafiscales y los cálculos correspondientes de cada empleado, almacenando la información en tu contabilidad.

    Después de realizar los pagos de nómina, puedes generar el reporte de nómina electrónica durante los primeros días del mes siguiente.

    El reporte de nómina electrónica convierte la información de la operación de pago de nómina en datos en formato XML, el cual es utilizado por la plataforma de la DIAN.

    Adicionalmente, encontrarás operaciones para:
*   **Reporte de ajuste de nómina:** Para reemplazar información incorrecta (errores aritméticos, contables o datos incorrectos) de un reporte de nómina electrónica.
*   **Reporte de anulación:** Para anular un reporte de nómina electrónica, por ejemplo, si se envió información de un empleado que ya no está en la empresa.

---

# Operación de Punto de venta POS
[Ver el video](https://www.youtube.com/watch?v=DRWS0HMZhto)
[DRWS0HMZhto]

## Tema principal
Explicación del uso del punto de venta (POS) en ContaPyme para realizar facturación rápida.

## Resumen general
Este video explica cómo utilizar la operación de punto de venta (POS) en ContaPyme para agilizar la facturación en negocios como minimercados o ferreterías. Muestra cómo acceder a la función POS, seleccionar productos, registrar el método de pago (efectivo, banco, crédito) y finalizar la venta. También explica cómo generar facturas de forma continua sin tener que salir y entrar a la operación de facturación, mejorando la eficiencia y el servicio al cliente.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un punto de venta (POS) en ContaPyme?
#### Respuesta
Un punto de venta (POS) es el lugar físico o la herramienta dentro de ContaPyme donde se realiza la facturación a los clientes. Es el equivalente a la caja registradora en un negocio físico como un minimercado o una ferretería.

### ¿Cómo accedo a la operación de punto de venta en ContaPyme?
#### Respuesta
Para acceder a la operación de punto de venta en ContaPyme, sigue estos pasos:
1.  Dirígete a la pestaña **Básico**.
2.  Selecciona la pestaña **Operaciones**.
3.  Dentro del manejador de operaciones, puedes acceder al punto de venta de dos maneras:
    *   **Acceso rápido:** Busca el logo de POS y selecciónalo.
    *   **Menú:** Haz clic en **Más > Ventas > Punto de Venta**.

### ¿Qué información se muestra en el formulario de punto de venta?
#### Respuesta
El formulario de punto de venta muestra la siguiente información:
*   Nombre de la empresa.
*   Fecha.
*   Tipo de documento.
*   Número de documento (generado automáticamente).
*   Cliente que realiza la compra.
*   Lista de precios.

### ¿Cómo selecciono un producto en la operación de punto de venta?
#### Respuesta
Puedes seleccionar un producto de las siguientes maneras:
*   **Código de barras:** Pasar el lector de código de barras por el producto.
*   **Escritura directa:** Escribir el nombre o código del producto directamente en el campo correspondiente.

### ¿Cómo registro el método de pago en la operación de punto de venta?
#### Respuesta
Para registrar el método de pago, puedes elegir entre las opciones disponibles:
*   **Efectivo**
*   **Banco**
*   **Crédito**
Puedes seleccionar la opción deseada haciendo clic sobre ella o utilizando la tecla de acceso rápido (F9).

### ¿Cómo ingreso la cantidad de dinero recibida por el cliente y calculo el cambio?
#### Respuesta
Después de seleccionar el método de pago, se abrirá un cuadro donde podrás ingresar la cantidad de dinero que recibiste del cliente. El sistema calculará automáticamente el cambio que debes entregar. Luego puedes dar "Aceptar y finalizar"

### ¿Qué significa la opción "Aceptar y Nueva" en el punto de venta?
#### Respuesta
La opción "Aceptar y Nueva" te permite finalizar la factura actual y automáticamente iniciar una nueva factura sin salir de la operación de punto de venta. Esto agiliza el proceso de facturación si tienes varios clientes consecutivos.

### ¿Cómo puedo verificar que la operación de punto de venta se registró correctamente?
#### Respuesta
Para verificar que la operación de punto de venta se registró correctamente, puedes revisar el inspector en la parte superior derecha de la pantalla. Recarga el movimiento para ver las imputaciones contables generadas.

---

# Facturación electrónica, validación previa.
[Ver el video](https://www.youtube.com/watch?v=ZGWuYLMUbSo)
Registro DIAN

## Tema principal
Registro como facturador electrónico en el portal de la DIAN para las pruebas de habilitación de facturación electrónica.

## Resumen general
Este video explica el proceso de registro como facturador electrónico en el portal de la DIAN, necesario para iniciar las pruebas de habilitación para la facturación electrónica. Se detalla cómo acceder al portal, verificar y registrar la información de la empresa, asociar el proveedor tecnológico (Comercio Electrónico en Internet SA Senet SA con el software Mis Facturas), y obtener el Test Set ID, que es crucial para continuar con el proceso en el portal de clientes de ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Cómo me registro para iniciar el proceso de facturación electrónica en el portal de la DIAN?
#### Respuesta
Para registrarte como facturador electrónico en el portal de la DIAN, sigue estos pasos:
1.  Ingresa al portal de la DIAN: [www.dian.gov.co](www.dian.gov.co).
2.  Haz clic en la opción "Habilitación".
3.  Selecciona si vas a entrar como empresa o persona.
4.  Registra los datos solicitados y haz clic en "Entrar".

### ¿Qué debo hacer si no tengo acceso al correo electrónico registrado en el RUT?
#### Respuesta
Es fundamental que tengas acceso al correo electrónico registrado en el RUT. Si no tienes acceso, debes actualizarlo ante la DIAN antes de continuar con el proceso de registro como facturador electrónico. La DIAN enviará un token de acceso a este correo.

### ¿Qué hago con el token de acceso que recibo en mi correo electrónico?
#### Respuesta
Una vez que recibas el token de acceso en tu correo electrónico, haz clic en la opción "Acceder" que aparece en el correo. Ten en cuenta que el token tiene una vigencia de 1 hora. Si transcurre ese tiempo, deberás solicitar otro token.

### ¿Cómo configuro los modos de operación en el portal de la DIAN?
#### Respuesta
Después de ingresar al portal de la DIAN con el token de acceso, sigue estos pasos:
1.  Da clic en la opción "Participantes, facturador".
2.  Verifica que la información de la empresa sea correcta (solo lectura).
3.  Da clic en "Registrar" y luego en "Aceptar" en la advertencia.
4.  Revisa tu correo electrónico para obtener un nuevo token de acceso.
5.  Ingresa nuevamente al portal con el nuevo token y da clic en "Configurar Modos de Operación".

### ¿Cómo asocio el proveedor tecnológico en el portal de la DIAN?
#### Respuesta
Para asociar el proveedor tecnológico, sigue estos pasos:
1.  En "Seleccione el modo de operación", elige "Software de un proveedor tecnológico".
2.  En "Datos de empresa y software", selecciona:
    *   Nombre de la empresa proveedora: "Comercio Electrónico en Internet SA Senet SA".
    *   Nombre del software: "Mis Facturas".
3.  Da clic en "Adicionar".

### ¿Dónde encuentro el Test Set ID y para qué lo necesito?
#### Respuesta
Después de asociar el proveedor tecnológico, puedes verificar la información detallada, incluyendo los rangos de prueba y la resolución de prueba. Para encontrar el Test Set ID:
1. Selecciona "Rangos de prueba"
2. Encuentra la sección "Acciones" y da clic allí.

El Test Set ID es el identificador de tu set de pruebas de habilitación. Debes registrarlo en el portal de clientes de ContaPyme para poder continuar con el siguiente paso: la solicitud de la resolución.

### ¿Qué hago si tengo dudas sobre el proceso de registro en la DIAN?
#### Respuesta
Si tienes alguna duda acerca del proceso de registro como facturador electrónico en la DIAN, puedes solicitar un tiquete de soporte con el tema "Consulta de Estado FE". Puedes generar el tiquete desde el sistema ContaPyme (en el teléfono verde) o desde el portal de clientes (en la opción "Soporte técnico").

---

# Paso 2 Solicitar resolución DIAN
[Ver el video](https://www.youtube.com/watch?v=nqAPq9uPYyw)
[Paso 2 Solicitar resolución DIAN]

## Tema principal
Solicitar la resolución de facturación electrónica ante la DIAN.

## Resumen general
Este video explica paso a paso cómo solicitar la resolución de facturación electrónica ante la DIAN. Muestra el proceso completo desde el ingreso al portal de la DIAN, la configuración de los rangos de numeración, la generación del borrador de la resolución, la firma electrónica y la obtención del documento final. También menciona la solicitud de una resolución de facturación de contingencia.

## Preguntas Frecuentes (FAQ)

### ¿Cómo ingreso al portal de la DIAN para solicitar la resolución de facturación electrónica?
#### Respuesta
Debes ingresar al sitio web www.dian.gov.co y hacer clic en la opción "Usuario Registrado". Luego, completa la información solicitada para iniciar sesión y haz clic en "Ingresar".

### ¿Dónde encuentro la opción para solicitar la numeración de facturación en el portal de la DIAN?
#### Respuesta
Una vez que hayas iniciado sesión en el portal de la DIAN, en la parte izquierda, elige la opción "Numeración de facturación" y luego haz clic en "Solicitar numeración de facturación".

### ¿Qué información debo proporcionar al generar los rangos de facturación electrónica?
#### Respuesta
Debes definir:
- El prefijo (asegúrate de que sea uno nuevo que no hayas utilizado antes).
- El tipo de facturación electrónica.
- El rango inicial.
- El rango final.
Una vez ingresada esta información, haz clic en "Agregar".

### ¿Cómo obtengo el borrador de la resolución de facturación electrónica?
#### Respuesta
Después de agregar la información del prefijo, tipo de facturación y rangos, haz clic en el botón "Borrador". Se generará un aviso con el documento 1302, que es el borrador de la resolución. Haz clic en "Ver documento" para visualizarlo.

### ¿Qué debo hacer después de revisar el borrador de la resolución?
#### Respuesta
Si estás de acuerdo con la información mostrada en el borrador (rangos, prefijo, etc.), haz clic en el botón "Definitivo" para generar la resolución final de facturación electrónica.

### ¿Cómo firmo el documento electrónico para obtener la resolución final?
#### Respuesta
Al hacer clic en "Definitivo", aparecerá un aviso donde debes firmar el documento electrónico con la información del representante legal de la empresa. Ingresa el correo electrónico y la contraseña con la que ingresaste al portal de la DIAN y luego haz clic en "Firmar".

### ¿Cuál es el documento que contiene la resolución final de facturación electrónica?
#### Respuesta
El documento 1876 es tu resolución de facturación electrónica. Contiene información importante como el número de la resolución, el prefijo, los rangos, la fecha y la vigencia. Debes descargarlo y guardarlo en formato PDF, ya que lo necesitarás en el siguiente paso.

### ¿Qué es una resolución de facturación de contingencia y cuándo debo solicitarla?
#### Respuesta
Una resolución de facturación de contingencia se utiliza en situaciones donde no puedes acceder al envío de facturas electrónicas. Puedes solicitarla siguiendo los mismos pasos que la resolución normal, pero seleccionando "Contingencia" en el tipo de facturación.

### ¿Para qué tipo de documentos aplica la configuración de documento de contingencia?
#### Respuesta
La configuración de documento de contingencia solo aparecerá para el documento factura de venta, no para las notas crédito o débito.

### ¿Dónde puedo obtener ayuda si tengo dudas sobre este proceso?
#### Respuesta
Puedes solicitar un tiquete de soporte con el tema "Consulta de estado FE". Puedes generar tu tiquete desde el sistema ContaPyme en el teléfono verde o desde el portal de clientes en la opción "Soporte técnico".

---

# Paso 3 Cargar documentos
[Ver el video](https://www.youtube.com/watch?v=Ly5D8o0olfI)
Ly5D8o0olfI

## Tema principal
Carga de documentos para la activación de la facturación electrónica.

## Resumen general
Este video explica el tercer paso para la activación y habilitación de la facturación electrónica, que consiste en la carga de los documentos solicitados. Se detalla cómo descargar, diligenciar, firmar y subir los documentos requeridos, así como el proceso de revisión y aprobación. También se indica cómo proceder en caso de que un documento sea rechazado y dónde buscar soporte técnico en caso de dudas.

## Preguntas Frecuentes (FAQ)

### ¿Qué debo hacer en el paso de carga de documentos?
#### Respuesta
En este paso debes cargar todos los documentos solicitados que serán utilizados para el proceso de activación y habilitación de facturación electrónica.

### ¿Qué debo hacer con el documento que tiene el botón "Generar"?
#### Respuesta
Debes dar clic en el botón "Generar" para descargar el documento, luego tienes dos opciones:
1.  Imprimir el documento, firmarlo manualmente, escanearlo y subirlo al portal.
2.  Firmarlo digitalmente y subirlo al portal.

### ¿Dónde encuentro las instrucciones para diligenciar correctamente los documentos?
#### Respuesta
Para cada documento encontrarás instrucciones que te guiarán en el correcto diligenciamiento de la información. Presta atención especial a cada una de las recomendaciones.

### ¿Qué pasa si un documento es rechazado?
#### Respuesta
Si un documento es rechazado, puedes dar clic en el botón "Más" para conocer el motivo del rechazo, corregirlo y cargarlo nuevamente al portal en el menor tiempo posible.

### ¿Debo cargar nuevamente el Test Set ID?
#### Respuesta
No, no debes cargarlo nuevamente, ya que lo registraste en el paso anterior. Si requieres modificarlo, puedes hacerlo dando clic en el botón "Subir".

### ¿Qué necesito para que se revisen mis documentos?
#### Respuesta
Para la revisión de los documentos es necesario contar con la factura emitida y aprobada por parte de Insoft.

### ¿Qué debo hacer una vez que mis documentos sean aprobados?
#### Respuesta
Una vez que los documentos sean aprobados, puedes dar clic en "Siguiente" para finalizar el proceso de habilitación.

### ¿Dónde puedo solicitar ayuda si tengo dudas sobre este proceso?
#### Respuesta
Puedes solicitar un tiquete de soporte con el tema "consulta de estado FE" desde:
*   El sistema ContaPyme en el teléfono verde.
*   El portal de clientes en la opción "Soporte técnico".
Recuerda que cuentas con soporte técnico ilimitado de Contapyme.

---

# Paso 4 Finalizar habilitación
[Ver el video](https://www.youtube.com/watch?v=xkw89j5cdeA)
[xkw89j5cdeA]

## Tema principal
Finalización del proceso de habilitación de facturación electrónica con validación previa en la DIAN y asociación con el proveedor tecnológico Zenit.

## Resumen general
Este video explica el último paso para habilitar la facturación electrónica con validación previa. Primero, se define la fecha de inicio de producción en el portal de la DIAN, lo que implica la actualización del RUT con la responsabilidad 52. Luego, se muestra cómo asociar la resolución de facturación al proveedor tecnológico Zenit dentro del portal de la DIAN, ingresando por la opción de facturación electrónica y seleccionando la opción de participantes para asociar los prefijos.

## Preguntas Frecuentes (FAQ)

### ¿Qué debo revisar antes de realizar el paso 4 de habilitación?
#### Respuesta
Debes revisar tu correo electrónico para confirmar que recibiste un mensaje notificando que el paso 3 se completó exitosamente.

### ¿Cómo ingreso al portal de la DIAN para finalizar la habilitación?
#### Respuesta
1.  Ingresa a [www.dian.gov.co](www.dian.gov.co).
2.  Selecciona la opción **Habilitación**.
3.  Elige si vas a ingresar como **empresa** o **persona natural**.
4.  Registra la información solicitada.
5.  Haz clic en **Entrar**.

### ¿Cómo obtengo el token de acceso al portal de la DIAN?
#### Respuesta
La DIAN enviará un mensaje al correo electrónico registrado en el RUT con un token de acceso al portal. Ten en cuenta que este token tiene una validez de una hora.

### ¿Qué es la fecha de salida a producción y dónde la defino?
#### Respuesta
La fecha de salida a producción es la fecha en la cual empezarás a enviar documentos reales a la DIAN. Debes definirla en el portal de la DIAN, después de ingresar con el token.

### ¿Qué cambio ocurre en mi RUT al definir la fecha de salida a producción?
#### Respuesta
Tu RUT se actualizará con la responsabilidad 52, que corresponde a la de facturador electrónico bajo el nuevo modelo de validación previa.

### ¿Cómo asocio la resolución con mi proveedor tecnológico Zenit?
#### Respuesta
1. Ingresa al portal de la DIAN: [www.dian.gov.co](www.dian.gov.co)
2. Selecciona la opción **Facturando electrónicamente**.
3. Elige si vas a ingresar como **empresa** o **persona natural**, registra la información y haz clic en **Entrar**.
4. Ingresa por la opción **Participantes**.
5. Elige **Asociar prefijos**.
6. Diligencia la información del proveedor:
    *   Proveedor: **Comercio electrónico en internet Zenit SA Mis facturas**
    *   Prefijo: **El prefijo indicado en el formato 1876 (saldrá precargado)**.
7.  Haz clic en **Agregar**.

### ¿Cuánto tiempo debo esperar después de generar la resolución para asociarla en el portal de la DIAN?
#### Respuesta
Debes esperar entre dos y tres horas después de generar la resolución para que aparezca disponible para asociar en el portal de la DIAN.

### ¿Qué debo hacer después de asociar la resolución con el proveedor tecnológico en el portal de la DIAN?
#### Respuesta
Después de asociar la resolución, debes ir al portal de clientes, marcar la opción "ya completé este paso" y dar clic en siguiente para finalizar realizando la configuración en ContaPyme.

### ¿Cómo puedo obtener ayuda si tengo dudas sobre este proceso?
#### Respuesta
Puedes solicitar un tiquete de soporte con el tema "consulta de estado FE" desde el sistema ContaPyme (teléfono verde) o desde el portal de clientes en la opción de soporte técnico.

---

# Paso 5 Configurar en ContaPyme
[Ver el video](https://www.youtube.com/watch?v=bS7kTu1M5zU)
Facturación electrónica, validación previa, configuración en Contapyme.

## Tema principal
Configuración de facturación electrónica, notas débito y crédito electrónicas en ContaPyme.

## Resumen general
Este video explica cómo activar y configurar la facturación electrónica en ContaPyme. Aprenderás a configurar la información de tu empresa, asociar los documentos de soporte electrónico (factura de venta, nota débito y nota crédito) y a definir los parámetros necesarios para la emisión de facturas electrónicas, incluyendo la resolución de la DIAN, el prefijo y las opciones de aprobación automática. También se explica cómo configurar las notas débito y crédito electrónicas, y la importancia de validar la información con tu proveedor tecnológico.

## Preguntas Frecuentes (FAQ)

### ¿Cómo activo el uso de facturación electrónica en mi empresa en ContaPyme?
#### Respuesta
Para activar la facturación electrónica, sigue estos pasos:
1.  Ingresa al **Menú Básico**.
2.  Haz clic en el **Explorador Gráfico de la Empresa**.
3.  Selecciona tu empresa y haz clic derecho, luego elige **Modificar**.
4.  Verifica que el **número de documento de identificación del responsable** de facturación electrónica sea correcto.
5.  En la parte inferior, en **Opciones de la empresa**, activa el **Manejo de facturación electrónica**.
6.  Si aparece una ventana para editar datos para el proveedor tecnológico, revisa y edita la información si es necesario, y haz clic en **Aceptar**.
7.  Ingresa a la pestaña **Facturación electrónica** y verifica la información para enviar al proveedor tecnológico.
8.  Confirma que tienes los documentos cargados a tu cuenta y haz clic en **Aceptar**.

### ¿Dónde encuentro los documentos de soporte electrónico en ContaPyme?
#### Respuesta
Una vez activado el manejo de facturación electrónica en la empresa, los documentos de soporte electrónico se encuentran en:
**Menú Básico > Documentos de Soporte**. Allí encontrarás la factura de venta electrónica, la nota débito electrónica y la nota crédito electrónica.

### ¿Cómo configuro la factura de venta electrónica en ContaPyme?
#### Respuesta
Para configurar la factura de venta electrónica, sigue estos pasos:

1.  En **Menú Básico > Documentos de Soporte**, haz clic derecho sobre **Factura de Venta Electrónica Habilitación** y selecciona **Modificar**.
2.  En la parte superior, selecciona la **Empresa** con la que estás configurando el documento.
3.  Marca la casilla **Este documento hace parte de facturación electrónica**.
4.  Cambia el **Nombre del documento** (ej. Factura de Venta Electrónica) y define un **Nombre corto**.
5.  Escribe el **Prefijo** que colocaste en el formato 1876 (resolución de facturación electrónica).
6.  Ve a la pestaña **Resoluciones** y escribe la información de la resolución, los consecutivos y las fechas otorgadas por la DIAN (esta información se encuentra en el formato 1876).
7.  En la pestaña **Acciones**, elige la opción en que va a ser aprobado el documento electrónico: **Automática al finalizar**, **Solicitar aprobación al finalizar**, o **Aprobar manualmente**.
8.  En la pestaña **Impresión de documento**, verifica que esté seleccionado el tipo de documento **Factura electrónica de venta**.
9.  En la pestaña **Facturación Electrónica**, verifica que el **Proveedor seleccionado** sea Zenet y que en **Configurar documento electrónico** esté marcado **Enviar a Zenet**.
10. Verifica que esté seleccionado el **Tipo de documento Factura Electrónica**
11. Haz clic en **Aceptar**.

### ¿Qué opciones tengo para la aprobación de documentos electrónicos en ContaPyme?
#### Respuesta
Al configurar la factura de venta electrónica, nota débito electrónica y nota crédito electrónica, tienes tres opciones para la aprobación de los documentos:

1.  **Automática al finalizar:** La aprobación del documento se realiza automáticamente cuando finalizas el registro de la operación.
2.  **Solicitar aprobación al finalizar:** El sistema te mostrará un anuncio solicitando que apruebes el documento al finalizar el registro de la operación.
3.  **Aprobar manualmente:** Debes aprobar manualmente la operación para que sea enviada.

La ruta para configurar esto es dentro de cada documento de soporte (Factura de venta, nota débito, nota crédito) en la pestaña **Acciones**.

### ¿Cómo configuro la nota débito electrónica en ContaPyme?
#### Respuesta
Para configurar la nota débito electrónica, sigue estos pasos:
1. En **Menú Básico > Documentos de Soporte**, haz clic derecho sobre **Nota Débito Electrónica Habilitación** y selecciona **Modificar**.
2. Selecciona la **Empresa**.
3. Marca la casilla **Este documento hace parte de facturación electrónica**.
4. Cambia el **Nombre del documento** y define un **Nombre corto**.
5. En el **Prefijo**, coloca el que desees. No es necesario una resolución de la DIAN para notas débito y crédito.
6. En la pestaña **Resoluciones**, puedes usar la información por defecto o la de la resolución de la factura de venta electrónica.
7. En la pestaña **Acciones**, elige la forma de aprobación del documento.
8. En la pestaña **Impresión del documento**, verifica que esté seleccionada la **Nota débito de la factura electrónica**.
9. En la pestaña **Facturación electrónica**, verifica que el **Proveedor seleccionado** sea Zenet y que en **Configurar documento electrónico** esté marcado **Enviar a Zenet**.
10. Verifica que el **Tipo de documento** sea **Nota Débito Electrónica**.
11. Haz clic en **Aceptar**.

### ¿Cómo configuro la nota crédito electrónica en ContaPyme?
#### Respuesta
Para configurar la nota crédito electrónica, sigue estos pasos:
1. En **Menú Básico > Documentos de Soporte**, haz clic derecho sobre **Nota Crédito Electrónica Habilitación** y selecciona **Modificar**.
2. Selecciona la **Empresa**.
3. Marca la casilla **Este documento hace parte de facturación electrónica**.
4. Cambia el **Nombre del documento** y define un **Nombre corto**.
5. En el **Prefijo**, coloca el que desees. No es necesario una resolución de la DIAN para notas débito y crédito.
6. En la pestaña **Resoluciones**, puedes usar la información por defecto.
7. En la pestaña **Acciones**, elige la forma de aprobación del documento.
8. En la pestaña **Impresión del documento**, verifica que esté seleccionada la **Nota crédito de la factura electrónica**.
9. En la pestaña **Facturación electrónica**, verifica que el **Proveedor seleccionado** sea Zenet y que en **Configurar documento electrónico** esté marcado **Enviar a Zenet**.
10. Verifica que el **Tipo de documento** sea **Nota Crédito Electrónica**.
11. Haz clic en **Aceptar**.

### ¿Qué hago si necesito soporte adicional para la configuración de la facturación electrónica en ContaPyme?
#### Respuesta
Si tienes dudas sobre el proceso de configuración, puedes solicitar un ticket de soporte con el tema **Consulta de estado FE**. Puedes generar el ticket desde el sistema ContaPyme en el teléfono verde o desde el portal de clientes en la opción soporte técnico.

---

# Reunión Distribuidores 27/03/2021
[Ver el video](https://www.youtube.com/watch?v=z8kawkHTWHA)
z8kawkHTWHA

## Tema principal
Explicación del proceso de facturación electrónica con el nuevo proveedor tecnológico Cadena y comparativa con otros proveedores.

## Resumen general
Este video es una capacitación para distribuidores sobre la integración de Cadena como nuevo proveedor de facturación electrónica en ContaPyme. Se detalla el proceso general desde la cotización hasta la salida a producción, haciendo énfasis en el rol del distribuidor, los pasos que debe seguir el cliente y el soporte proporcionado por Info. Además, se realiza una comparación con otros proveedores tecnológicos (Factura 1, DeFactory, y Senet) en términos de habilitación y producción, resaltando las ventajas de Cadena en cuanto a la optimización de tiempos y recursos. El video busca aclarar dudas y dar a los distribuidores las herramientas para guiar a sus clientes en el proceso de facturación electrónica con Cadena.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los pasos generales para la compra de facturación electrónica con Cadena?
#### Respuesta
El proceso general incluye:
1.  **Envío de cotización:** Se realiza el proceso comercial.
2.  **Redirección al portal de clientes:** El distribuidor indica al cliente que debe ingresar al portal de clientes de ContaPyme.
3.  **Actividad en el sistema de clientes:** El distribuidor activa una actividad en el sistema de clientes de ContaPyme para enviar un correo electrónico al cliente con los pasos a seguir para iniciar el proceso en el portal.
4.  **Proceso de pedido y facturación:** El área comercial de Info realiza el proceso de pedido y facturación.

### ¿Qué debe hacer el cliente en el portal de clientes después de la facturación?
#### Respuesta
El cliente debe:
1.  **Realizar los pasos de la DIAN:** Solicitar el ID y la resolución.
2.  **Cargar documentos:** Subir el acuerdo entre Info y el cliente, el ID y la resolución de la Cámara de Comercio.

### ¿Qué sucede después de que el cliente carga los documentos en el portal?
#### Respuesta
Se genera un tiquete interno, se revisan los documentos cargados, y el equipo de Backoffice de Info contacta al cliente para iniciar el proceso de habilitación.

### ¿Quién acompaña al cliente en el proceso de habilitación?
#### Respuesta
Inicialmente, Inf (casa matriz) acompaña al cliente en el proceso de habilitación.

### ¿Cuáles son los pasos que verá el cliente en el portal de clientes?
#### Respuesta
Los pasos son:
1.  Registro en la DIAN.
2.  Solicitar la resolución en la DIAN.
3.  Cargar documentos.
4.  Proceso de habilitación con el equipo de Backoffice de Info.
5.  Configuración final.

### ¿Cuánto tiempo tarda Info en realizar el proceso de habilitación con Cadena?
#### Respuesta
El proceso de habilitación por parte de Info no tarda más de un día hábil.

### ¿Qué es lo que se espera de los distribuidores en este proceso?
#### Respuesta
Se espera que los distribuidores apoyen y guíen a los clientes en los tres primeros pasos (registro y solicitud en la DIAN), dirigiéndolos al portal de clientes y recordándoles la importancia de completar esos pasos.

### ¿Qué significa que Cadena es un proveedor "marca blanca"?
#### Respuesta
Significa que la presencia de Cadena no es visible para el cliente final, y todo el proceso está integrado a través de ContaPyme.

### ¿Dónde se realiza el proceso de habilitación con Cadena?
#### Respuesta
Todo el proceso de habilitación se realiza a través de ContaPyme. No hay ningún portal adicional o interfaz diferente.

### ¿Cuándo se espera que los distribuidores puedan empezar a comercializar Cadena?
#### Respuesta
Se espera que los distribuidores puedan comenzar a comercializar Cadena a partir del 8 de abril, aproximadamente.

### ¿Las condiciones de comercialización de Cadena son las mismas que las de CN?
#### Respuesta
Sí, las condiciones de comercialización (planes de documentos, valor) son las mismas que las de CN. El certificado digital es proporcionado por el proveedor tecnológico y no tiene costo adicional.

### ¿Cuándo estará disponible en el portal toda la información y el paso a paso para que el cliente pueda realizar solo el proceso de habilitación?
#### Respuesta
Se espera que el portal esté completo con toda la información disponible el 14 de abril.

### ¿Qué dos opciones se deben activar en el explorador gráfico de la empresa en ContaPyme para el correcto funcionamiento de Cadena?
#### Respuesta
Se deben activar:
1.  Activar el manejo de facturación electrónica.
2.  Activar el uso de plataforma de documentos.

### ¿Por qué es importante activar el uso de la plataforma de documentos?
#### Respuesta
Porque Cadena no envía correos electrónicos directamente. La notificación al cliente con el archivo .zip (XML y PDF) se gestiona desde ContaPyme, y esta opción es necesaria para que se envíe el correo.

### ¿Qué se configura en los documentos de soporte para Cadena?
#### Respuesta
Se debe configurar la parte de la plataforma para asegurar que le llegue al cliente la información completa requerida por la DIAN.

### ¿Qué acciones se deben activar en los documentos de soporte en la sección de "Acciones"?
#### Respuesta
Se deben activar:
1.  Publicación en plataforma de documentos.
2.  Envío de email automático.

### ¿Qué se debe tener en cuenta en la impresión del documento?
#### Respuesta
Es recomendable configurar tanto el documento de impresión por defecto (PDF) como el documento de impresión alterno (HTML), especialmente este último, ya que ofrece una presentación más atractiva en la plataforma.

### ¿Cómo se debe configurar el envío de email en los documentos de soporte?
#### Respuesta
1.  Activar las opciones **XML** y **PDF**.
2.  Seleccionar **"Dentro de un archivo comprimido .zip"** en el método para adjuntar.
3.  En "Alias del remitente", ingresar el **nombre de la empresa**.
4.  En "Enviar a", seleccionar **"Tercero"** (cliente al que se factura). Opcionalmente, se puede agregar con copia al "Vendedor".
5.  En "Tipo de contenido para el email", seleccionar la plantilla **FE010, Notificación de documento electrónico**.

### ¿Qué se configura en la pestaña "Publicación de documento"?
#### Respuesta
1.  Indicar la fecha a partir de la cual se habilita la publicación en la plataforma.
2.  Seleccionar el documento de impresión a publicar. Se recomienda usar el formato **HTML**.
3.  En "Archivos adicionales a adjuntar a la plataforma", seleccionar **"XML de facturación electrónica DIAN"**.
4.  Configurar las acciones (aprobar, rechazar, etc.) y las notificaciones de mensajes al cliente.

### ¿Cómo se realiza el proceso de habilitación automática con Cadena?
#### Respuesta
1.  En la empresa, activar el manejo de facturación electrónica.
2.  Ir a los documentos de soporte (factura de venta).
3.  Seleccionar el proveedor tecnológico "Cadena".
4.  Dar clic en "Administrar conexión con proveedor tecnológico".
5.  Dar clic en el botón "Habilitación automática".
6.  Ingresar el "Test Set ID" proporcionado por la DIAN.
7.  Confirmar que se han realizado los pasos previos en la DIAN y en Insoft.
8.  Dar clic en "Aceptar".

### ¿Qué hace la habilitación automática?
#### Respuesta
Simula el envío de documentos electrónicos de prueba a la DIAN, sin crear operaciones en el manejador de operaciones de ContaPyme. Envía aleatoriamente facturas, notas débito y notas crédito hasta completar las pruebas requeridas.

### ¿Qué debe hacer el cliente después de la habilitación automática?
#### Respuesta
1.  Verificar en el portal de la DIAN, en la opción de habilitación, que el detalle del set de pruebas haya sido superado con éxito.
2.  Finalizar el proceso de habilitación en el portal de la DIAN indicando la fecha de salida a producción.
3.  Asociar, en el portal de la DIAN (en la opción de facturando electrónicamente), la nueva resolución de facturación electrónica generada desde el sistema Muisca.

### ¿Qué pasa si la habilitación automática no tiene éxito?
#### Respuesta
Se recomienda ejecutar nuevamente la opción de habilitación automática.

### ¿Los documentos de nota crédito y nota débito requieren también la habilitación automática?
#### Respuesta
No. El proceso de habilitación automática se realiza únicamente desde la factura de venta. El sistema detecta y hace el envío automático de notas débito y crédito.

### ¿Se pueden enviar facturas y notas a varios correos del cliente con Cadena, separados por punto y coma?
#### Respuesta
Sí, esta funcionalidad está disponible.

### ¿Se puede modificar un documento de soporte existente de otro proveedor tecnológico para usarlo con Cadena?
#### Respuesta
No. Se recomienda generar un nuevo documento de soporte para cada proveedor tecnológico. Esto implica sacar una nueva resolución ante la DIAN con un prefijo distinto.

### ¿Se puede editar el asunto del correo electrónico para una entidad pública con requisitos específicos?
#### Respuesta
No. La estructura del asunto está estandarizada por la DIAN (NIT del emisor, nombre de la empresa, número de factura, etc.) y no se puede modificar.

---

# Tipo de encabezado para la operación de punto de venta.
[Ver el video](https://www.youtube.com/watch?v=XJ-9m2wqy5Y)
[Selección del tipo de encabezado de datos de la operación POS]

## Tema principal
Configuración del tipo de encabezado en la operación de punto de venta para visualizar la información de forma resumida o detallada.

## Resumen general
Este video explica cómo configurar el tipo de encabezado en la operación de punto de venta de ContaPyme, permitiendo elegir entre una vista resumida (tipo POS) para una facturación más rápida, y una vista detallada (tipo normal) que permite editar información adicional. El video muestra cómo acceder a la configuración y las diferencias entre ambos tipos de encabezado, destacando que la elección no afecta el proceso de facturación ni el movimiento contable.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los dos tipos de encabezado disponibles para la operación de punto de venta en ContaPyme?
#### Respuesta
Existen dos tipos de encabezado:
*   **Tipo POS:** Muestra un encabezado resumido con el nombre de la empresa, la fecha, el documento y el total a pagar. Los datos están predeterminados y no se pueden editar directamente en el encabezado.
*   **Tipo Normal:** Muestra un encabezado detallado que permite ver y editar información como el tipo de documento, detalle, moneda y clase de operación.

### ¿Cómo puedo cambiar el tipo de encabezado para la operación de punto de venta?
#### Respuesta
Para cambiar el tipo de encabezado, sigue estos pasos:
1.  Dirígete a la pestaña **Operación**.
2.  Selecciona **Configurar Operación**.
3.  Elige **Configuración para todos los usuarios** o **Configuración de usuario**, según tus preferencias.
4.  En el menú de la izquierda, busca y selecciona **Tipo de encabezado para la operación**.
5.  Selecciona el tipo de encabezado deseado (POS o Normal).
6.  Haz clic en **Aceptar**.

### ¿Dónde puedo encontrar la operación de punto de venta dentro de ContaPyme?
#### Respuesta
Puedes acceder a la operación de punto de venta de dos maneras:
*   A través del **acceso rápido** en la pantalla principal.
*   Haciendo clic en el botón **Más**, luego **Ventas** y finalmente **Punto de Venta**.

### ¿Qué diferencia hay entre la configuración de usuario y la configuración para todos los usuarios al cambiar el tipo de encabezado?
#### Respuesta
*   **Configuración para todos los usuarios:** El cambio afectará a todos los usuarios de ContaPyme.
*   **Configuración de usuario:** El cambio solo afectará a tu usuario actual.

### ¿El tipo de encabezado que selecciono afecta la forma en que facturo o el movimiento contable?
#### Respuesta
No, el tipo de encabezado que selecciones (POS o Normal) solo afecta la visualización y la posibilidad de editar ciertos datos en el encabezado de la operación de punto de venta. La forma de facturar los productos, las formas de cobro y el proceso interno (movimiento contable) siguen siendo los mismos.

### ¿Qué tipo de información puedo editar en el encabezado tipo "Normal" que no puedo editar en el tipo "POS"?
#### Respuesta
En el encabezado tipo "Normal" puedes editar información como:
*   Tipo de documento de soporte
*   Detalle
*   Moneda
*   Clase de operación

---

# Solicitar resolución de facturación electrónica ante la DIAN
[Ver el video](https://www.youtube.com/watch?v=cokfUixajsI)
cokfUixajsI

## Tema principal
Solicitar la resolución de facturación electrónica ante la DIAN.

## Resumen general
Este video explica el proceso para solicitar la resolución de facturación electrónica directamente en el portal de la DIAN. Muestra cómo acceder a la opción de numeración de facturación, ingresar los datos de la empresa, autorizar rangos de numeración, generar el borrador de la resolución, firmarlo electrónicamente y finalmente visualizar la resolución de facturación electrónica aprobada. El video es una guía práctica para las empresas que necesitan obtener su resolución de facturación electrónica.

## Preguntas Frecuentes (FAQ)

### ¿Cómo inicio el proceso para solicitar la resolución de facturación electrónica?
#### Respuesta
Debes ingresar al portal web de la DIAN (DIAN.GO.CO) y seleccionar la opción de usuario registrado.

### ¿Qué información necesito para ingresar al portal de la DIAN?
#### Respuesta
Necesitarás ingresar los datos correspondientes a tu empresa.

### ¿Dónde encuentro la opción para solicitar la numeración de facturación en el portal de la DIAN?
#### Respuesta
Después de ingresar al portal, busca la opción de "Numeración de Facturación" en el menú y selecciona "Solicitar Numeración de Facturación". Luego, debes dar clic en "Aceptar".

### ¿Cómo autorizo los rangos de numeración en la solicitud?
#### Respuesta
Después de visualizar los datos de tu empresa, sigue estos pasos:
1. Ve a la opción "Ingresar".
2. Selecciona "Autorizar Rangos".
3. Elige un prefijo.
4. En "Tipo de Numeración" selecciona "Factura Electrónica de Venta".
5. Ingresa el rango inicial y el rango final deseado.
6. Haz clic en "Agregar".

### ¿Cómo puedo ver el borrador de la resolución antes de firmarla?
#### Respuesta
Después de agregar el rango de numeración:
1. Selecciona la opción "Borrador".
2. Luego da clic en "Ver Documento". El borrador se descargará automáticamente.

### ¿Cómo firmo electrónicamente la solicitud de resolución?
#### Respuesta
Después de revisar el borrador:
1. Da clic en "Aceptar".
2. Selecciona la opción "Firmar".
3. Escribe tu firma electrónica.
4. Solicita tu clave dinámica.
5. Ve a la opción "Ver mi Bandeja de Comunicados".
6. Copia y pega la clave dinámica.
7. Selecciona "Firmar Documentos".

### ¿Dónde puedo visualizar la resolución de facturación electrónica después de firmarla?
#### Respuesta
Después de firmar el documento, selecciona "Ver Documento" para visualizar tu resolución de facturación electrónica.

---

# Valor base para iniciar turno del usuario cajero
[Ver el video](https://www.youtube.com/watch?v=NtdDKN-RM3I)
Valor base para iniciar turno del usuario cajero

## Tema principal
Establecer el valor base al iniciar el turno de un usuario cajero en ContaPyme.

## Resumen general
Este video explica la importancia del valor base al iniciar el turno de un usuario cajero en ContaPyme. Detalla cómo el sistema registra automáticamente la fecha, hora, usuario y equipo al iniciar el turno, y cómo se solicita al cajero ingresar un valor base. Este valor base permite al cajero facilitar las transacciones iniciales y dar cambio a los clientes. El video muestra el proceso para ingresar al sistema con un usuario cajero y establecer este valor base.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la diferencia entre un usuario cajero y otros usuarios en ContaPyme?
#### Respuesta
Un usuario cajero, a diferencia de otros usuarios, debe iniciar y cerrar turno en el sistema.

### ¿Qué datos se almacenan automáticamente al iniciar el turno de un usuario cajero?
#### Respuesta
Al iniciar el turno de un usuario cajero, el sistema registra automáticamente la fecha y hora de inicio del turno, el usuario que está iniciando el turno y el nombre del equipo desde donde se inició el turno.

### ¿Qué es el valor base al iniciar el turno de un usuario cajero?
#### Respuesta
El valor base es el monto que el usuario cajero ingresa al iniciar su turno, y que se utilizará para facilitar las transacciones iniciales y proporcionar cambio a los clientes.

### ¿Por qué es importante el cierre de turno de un usuario cajero?
#### Respuesta
El cierre de turno asegura la precisión en el manejo del dinero y mantiene un registro adecuado de las transacciones realizadas durante el turno.

### ¿Cómo ingreso al sistema ContaPyme como usuario cajero?
#### Respuesta
Para ingresar al sistema ContaPyme como usuario cajero, sigue estos pasos:
1. Haz doble clic en el icono de ContaPyme en tu computador.
2. En la ventana de conexión, ingresa el usuario (por ejemplo, cajero_1).
3. Ingresa la contraseña correspondiente.
4. Revisa el área de trabajo y la licencia.
5. Haz clic en "Conectar".

### ¿Dónde se indica el valor base al iniciar el turno en ContaPyme?
#### Respuesta
Después de ingresar al sistema con un usuario cajero, se abrirá una ventana adicional para iniciar el turno donde deberás ingresar el valor base.

### ¿Qué información muestra la ventana de inicio de turno?
#### Respuesta
La ventana de inicio de turno muestra automáticamente:
*   El nombre del computador desde donde estás trabajando.
*   La fecha y hora del inicio de turno.
*   El usuario con el que te estás conectando.

### ¿Cuáles son los pasos para indicar el valor base al iniciar el turno en ContaPyme?
#### Respuesta
Para indicar el valor base, sigue estos pasos:
1.  Después de ingresar con tu usuario cajero, espera a que se abra la ventana de inicio de turno.
2.  En el campo correspondiente, indica el valor base con el que iniciarás el turno (por ejemplo, 100.000 pesos).
3.  Haz clic en "Aceptar".
