# Cartera y Proveedores ContaPyme R8
[Ver el video](https://www.youtube.com/watch?v=sBoMyXTsd0g)

## Tema principal
Manejo del módulo de Cartera y Proveedores en ContaPyme R8.

## Resumen general
Este video explica cómo utilizar el módulo de Cartera y Proveedores en ContaPyme R8.  Se cubren los componentes principales del módulo, configuraciones iniciales, el proceso de carga inicial de saldos, la creación y abono de cuentas por cobrar y por pagar, el replanteamiento de créditos, y los diferentes informes disponibles. Se aprende a configurar las cuentas y terceros, a realizar el cargue inicial, y a utilizar las operaciones automáticas para gestionar la cartera de manera eficiente.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los objetivos principales del módulo de Cartera y Proveedores en ContaPyme?
#### Respuesta
Los objetivos principales son:
- Conocer los componentes principales del módulo y las rutas de acceso.
- Aprender a crear créditos y abonos a través de la operación de movimiento contable y otras operaciones automáticas.
- Conocer los informes disponibles en el módulo.
- Entender las utilidades adicionales del módulo.

### ¿Qué configuraciones debo realizar en las cuentas contables para usar el módulo de Cartera y Proveedores?
#### Respuesta
Debes verificar los siguientes atributos en las cuentas por cobrar y por pagar dentro del PUC (Plan Único de Cuentas):
- **Pestaña Datos Generales:**
    - **Visible en selección:** Asegúrate de que esté activado para que la cuenta aparezca en las operaciones relacionadas con cartera.
    - **Afectable directamente por el usuario:**  Debe estar activado para poder realizar imputaciones directamente a la cuenta.
    - **Controla cartera y/o proveedores para informes:** Este atributo debe estar encendido para que las imputaciones contables afecten los informes de cartera y proveedores.
- **Pestaña Datos Requeridos:**
    - **Maneja y exige tercero:** Debe estar encendido para que el sistema siempre guarde el nombre de la persona a quien se le va a hacer el cobro o el pago.
    - **Discrimina por tercero:** Permite que en ciertos informes el sistema muestre el saldo de la cuenta discriminado por cada uno de los terceros.
    - **Exige referencia:**  Para discriminar las cuentas por cobrar o por pagar por cada uno de los documentos.

### ¿Qué configuraciones debo realizar en los terceros (clientes y proveedores)?
#### Respuesta
- **Terceros Clientes:**
    - **Pestaña Datos Clientes -> Principal:**
        - **Bloquear créditos:** Activar si no se deben generar cuentas por cobrar a este tercero.
    - **Pestaña Datos Clientes -> Créditos:**
        - **Tipo de crédito:** Si se van a manejar intereses.
        - **Cupo de crédito:** Definir el valor máximo de endeudamiento para este tercero.
        - **Plazo de pago en días:** Para que el sistema calcule automáticamente la fecha de pago al generar una cuenta por cobrar.
- **Terceros Proveedores:**
    - **Pestaña Datos Proveedor -> Pagos:**
        - **Bloquear pagos:** Activar si no se deben hacer abonos a cuentas por pagar a este tercero.
        - **Plazo de pago en días:** Para que el sistema calcule automáticamente la fecha de pago al generar una cuenta por pagar.

### ¿Cómo se realiza el cargue inicial de cuentas de cartera y proveedores?
#### Respuesta
El cargue inicial se realiza a través de la operación de carga inicial de cuentas, siguiendo estos pasos:
1.  **Discriminar el valor de las cuentas por cobrar y por pagar** por cada una de las cuentas (clientes, socios, trabajadores, etc.).
2.  **Discriminar el saldo por terceros** para cada una de las cuentas.
3.  **Discriminar el saldo de cada tercero por referencia** (facturas, documentos) y la fecha estimada de pago.
4.  **Organizar la información en un cuadro** con las columnas: Cuenta, Saldo, Tercero, Referencia y Fecha de Pago.
5.  **Abrir la operación Carga Inicial de Cuentas** en ContaPyme (Menú: **Más Operaciones > Carga Inicial > Carga Inicial de Cuentas**).
6.  **Ingresar la información** respetando el orden de las columnas en la operación.
7.  **Indicar el tipo de contabilización:** Local o NIF.
8.  **Verificar que la suma de todos los cargues de cuentas** (incluyendo los de cartera y proveedores) cuadren el balance general.

### ¿Cómo se crea una cuenta por cobrar a través de la operación de movimiento contable?
#### Respuesta
1.  Abrir la operación de movimiento contable (Menú: **Más Operaciones > Contabilidad > Movimiento Contable**).
2.  Seleccionar el tipo de documento de soporte (ej. Factura de Venta).
3.  Ingresar la fecha de la transacción y el detalle (descripción de la venta).
4.  Registrar el ingreso (crédito) en la cuenta correspondiente (ej. 415540 Mantenimiento y Reparación).
5.  Registrar el IVA (crédito) si aplica.
6.  Registrar la cuenta por cobrar (débito) en la cuenta de clientes (ej. 130505 Clientes Nacionales).
7.  Indicar el tercero en transacción y el tercero en cartera (generalmente son el mismo).
8.  Ingresar la fecha de pago y la referencia (número de factura).
9.  Finalizar la operación.

### ¿Cómo se realiza un abono a una cuenta por cobrar a través de la operación de movimiento contable?
#### Respuesta
1.  Abrir la operación de movimiento contable (Menú: **Más Operaciones > Contabilidad > Movimiento Contable**).
2.  Seleccionar el tipo de documento de soporte (ej. Comprobante de Ingreso).
3.  Ingresar la fecha de la transacción y el detalle (descripción del abono).
4.  Llamar la cuenta por cobrar (ej. 130505 Clientes Nacionales).
5.  Seleccionar el tercero al que se le está haciendo el abono.
6.  Seleccionar la referencia (factura) a la que se va a aplicar el abono.
7.  Registrar el abono (crédito) por el valor del pago.
8.  Registrar el ingreso del dinero (débito) a la forma de pago correspondiente (ej. Caja General).
9.  Finalizar la operación.

### ¿Cómo se crea un préstamo o anticipo a un empleado usando la operación específica para ello?
#### Respuesta
1.  Abrir la operación Crear Préstamo o Anticipo en Cuenta por Cobrar (Menú: **Más Operaciones > Cartera > Crear Préstamo o Anticipo en Cuenta por Cobrar**).
2.  Ingresar la fecha del soporte y el documento de soporte (ej. Comprobante de Egreso).
3.  Ingresar el detalle (descripción del préstamo).
4.  Indicar el valor del préstamo o anticipo en el campo "Forma de Cobro".
5.  Seleccionar el empleado en el campo "Cobrar a".
6.  Seleccionar la cuenta por cobrar correspondiente (ej. 133015 Anticipos y Avances a Trabajadores).
7.  Definir la fecha de pago o crear cuotas usando el botón "Definir Cuotas".
8.  Seleccionar la forma en que salió el dinero (ej. Caja General).
9.  Finalizar la operación.

### ¿Cómo se realiza un abono a una cuenta por pagar usando la operación específica para ello?
#### Respuesta
1. Abrir la operación Abono a Cuentas por Pagar (Menú: **Más Operaciones > Proveedores > Abono a Cuentas por Pagar**).
2. Ingresar la fecha y el documento de soporte (ej. Comprobante de Egreso).
3. Ingresar el detalle (descripción del pago).
4. Seleccionar el proveedor.
5. Con doble clic, seleccionar la(s) cuenta(s) por pagar a abonar.
6. Ingresar el valor del abono.
7. Si hay detalles de costos financieros (ej. gastos bancarios), registrarlos.
8. Indicar la forma de pago (ej. Banco) y la cuenta bancaria.
9. Finalizar la operación.

### ¿Cómo se replantea un préstamo o anticipo en cuenta por cobrar?
#### Respuesta
1. Abrir la operación Replanteamiento de un Préstamo o Anticipo (Menú: **Más Operaciones > Cartera > Replanteamiento de un Préstamo o Anticipo**).
2. Ingresar la fecha del replanteamiento y el documento de soporte.
3. Seleccionar el tercero (empleado, cliente, etc.).
4. Cargar las cuentas que se van a replantear usando el botón "Cargar todas las cuentas".
5. Ir al paso siguiente e indicar el valor a replantear.
6. Definir las nuevas cuotas usando el botón "Definir Cuotas".
7. Finalizar la operación.

### ¿Qué tipo de informes puedo encontrar en el módulo de Cartera y Proveedores?
#### Respuesta
El módulo ofrece informes tipo pantalla (exploradores) y tipo impresión. Algunos de los informes disponibles son:
- **Cartera:**
    - Consulta de saldos de cuentas por cobrar.
    - Detalle de cuentas por cobrar.
    - Movimiento de cuentas por cobrar.
    - Diario de vencimiento de cartera.
    - Cartera por ciudad.
    - Cuentas por cobrar por edades.
- **Proveedores:**
    - Consulta de saldos de cuentas por pagar.
    - Cuentas por pagar por edades.
    - Detalle de cuentas por pagar.
    - Movimiento de cuentas por pagar.

### ¿Dónde puedo encontrar la guía de montaje del módulo de Cartera y Proveedores?
#### Respuesta
Dentro del sistema, en la pestaña Cartera, busca el ícono de las guías de montaje.  Allí encontrarás la guía de montaje del módulo de Cartera y Proveedores, así como guías para submódulos como Deterioro de Cartera, Programación de Pagos e Intereses. (Menú: **Cartera > Guías de Montaje > Guía de Montaje Cartera y Proveedores**)

---

# Configuraciones para el manejo de deterioro de cartera
[Ver el video](https://www.youtube.com/watch?v=TcFEpjifFVM)
TcFEpjifFVM

## Tema principal
Configuración de los métodos de deterioro de cartera en ContaPyme.

## Resumen general
Este video explica cómo configurar los diferentes métodos de deterioro de cartera en ContaPyme: por probabilidad de no pago, por flujos futuros y por costo amortizado. Se detalla cómo activar cada método dentro del sistema, qué parámetros se deben configurar en cada caso y cómo asociar las cuentas contables correspondientes para el registro del deterioro. Además, se aclara que los tres métodos pueden utilizarse simultáneamente.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los métodos de deterioro de cartera que se pueden configurar en ContaPyme?
#### Respuesta
ContaPyme permite configurar el cálculo del deterioro de cartera utilizando tres métodos:
*   Deterioro por probabilidad de no pago.
*   Deterioro por flujos futuros.
*   Deterioro por costo amortizado.

### ¿Se pueden usar los tres métodos de deterioro de cartera simultáneamente en ContaPyme?
#### Respuesta
Sí, se pueden manejar los tres métodos de deterioro de cartera simultáneamente.

### ¿Cómo se configura el deterioro por probabilidad de no pago en una cuenta de cartera?
#### Respuesta
Para configurar el deterioro por probabilidad de no pago, siga estos pasos:

1.  Diríjase a la pestaña **Contabilidad** y abra el **Plan de Cuentas**.
2.  Busque la cuenta de cartera que desea configurar (ej. 13050505 Clientes Nacionales) y haga doble clic para modificarla.
3.  En la ventana de edición de la cuenta, busque la zona de **atributos para el manejo de cartera y proveedores** y haga clic en el botón **Deterioro de Cartera**.
4.  En el panel izquierdo, active la opción **Deterioro por probabilidad de no pago**.
5.  Agregue los rangos de días de vencimiento y el porcentaje de probabilidad de no pago para cada rango, dando clic en **Adicionar Renglón**.
6.  En el panel derecho, indique las cuentas contables donde se contabilizará el deterioro:
    *   **Cuenta puente**: donde se acreditarán las pérdidas por deterioro.
    *   **Cuenta del gasto**: donde se debitará el valor de la pérdida por deterioro.
    *   **Cuenta de reversión**: donde se registrará la reversión por deterioro en un periodo posterior.
7.  Haga clic en el botón **Aceptar**.

### ¿Dónde se encuentra el botón "Deterioro de Cartera" dentro de la información de una cuenta?
#### Respuesta
El botón "Deterioro de Cartera" se encuentra en la zona de los **atributos para el manejo de cartera y proveedores** dentro de la ventana de edición de información de la cuenta, en el Plan de Cuentas. Esta opción solo se activa cuando la cuenta está marcada con el atributo de **control a endeudamiento** y cuando está marcada como una **cuenta de contabilización NIF**.

### ¿Qué cuentas se deben configurar al activar el método de deterioro por probabilidad de no pago?
#### Respuesta
Se deben configurar las siguientes cuentas:
*   **Cuenta puente:** Donde se acreditarán las pérdidas por deterioro (ej. 13990505 de Clientes).
*   **Cuenta del gasto:** Donde se debitará el valor de la pérdida por deterioro (ej. 51991005 de Deudores).
*   **Cuenta de reversión:** Donde se asentará la reversión por deterioro en un período posterior (ej. 42959005 de Ingresos por reversión de deterioro en período diferente).

### ¿Cómo se configura el deterioro por flujos futuros en una cuenta de cartera?
#### Respuesta
Para configurar el deterioro por flujos futuros, siga estos pasos:

1.  Diríjase a la pestaña **Contabilidad** y abra el **Plan de Cuentas**.
2.  Busque la cuenta de cartera que desea configurar y haga doble clic para modificarla.
3.  En la ventana de edición de la cuenta, busque la zona de **atributos para el manejo de cartera y proveedores** y haga clic en el botón **Deterioro de Cartera**.
4.  Active la opción **Cálculo del deterioro de la cartera por flujos futuros**.
5.  Haga clic en el botón **Aceptar**. No es necesario indicar ninguna otra configuración adicional en este paso. Los flujos futuros y la tasa de interés se indicarán en la operación de deterioro de cartera.

### ¿Qué datos se necesitan para calcular el deterioro por flujos futuros?
#### Respuesta
Al momento de registrar la operación de deterioro, se deben indicar los flujos de efectivo o pagos futuros estimados y la tasa de interés a aplicar.

### ¿Cómo se activa el manejo del costo amortizado en ContaPyme?
#### Respuesta
Para activar el manejo del costo amortizado, siga estos pasos:

1.  Diríjase a la pestaña **Contabilidad** y abra el **Plan de Cuentas**.
2.  Haga clic en el botón **Configuración** ubicado en la cinta de opciones.
3.  En la ventana de configuración del plan de cuentas, en el menú ubicado al lado izquierdo, en la pestaña **Configuraciones Generales**, haga clic en la opción **Deterioro de Cartera NIF**.
4.  Al lado derecho, active la opción para **calcular el costo amortizado en un periodo parcial** (opcional).
5.  Indique la **tasa de mercado por defecto**, que es la tasa efectiva anual, con la cual se realizará el cálculo del costo amortizado.
6.  Haga clic en el botón **Aceptar**.

### ¿Cómo se configura el deterioro por costo amortizado en una cuenta de cartera?
#### Respuesta
Para configurar el deterioro por costo amortizado, siga estos pasos:

1.  Primero, active la opción de manejo de costo amortizado, tal como se explicó en la pregunta anterior.
2.  Diríjase a la pestaña **Contabilidad** y abra el **Plan de Cuentas**.
3.  Busque la cuenta de cartera que desea configurar y haga doble clic para modificarla.
4.  En la ventana de edición de la cuenta, busque la zona de **atributos para el manejo de cartera y proveedores** y haga clic en el botón **Deterioro de Cartera**.
5.  Active la opción **Cálculo del deterioro por costo amortizado**.
6.  En el panel que aparece, se mostrará la tasa efectiva anual o la tasa nominal diaria. Esta tasa se cargará automáticamente desde la configuración del manejo de costo amortizado, pero puede ser cambiada si es necesario.
7.  Haga clic en el botón **Aceptar**.

---

# Ejemplo 1 Deterioro de Cartera
[Ver el video](https://www.youtube.com/watch?v=kddDS4wHqII)
kddDS4wHqII

## Tema principal
Aplicación del deterioro de cartera usando el método de probabilidad de no pago en ContaPyme.

## Resumen general
Este video explica, a través de un ejemplo práctico, cómo realizar la operación de deterioro de cartera en ContaPyme utilizando el método de probabilidad de no pago. El video muestra cómo registrar el deterioro de una cuenta vencida, seleccionar el tercero correspondiente, y configurar los porcentajes de deterioro basados en los días de vencimiento. Además, se explica cómo visualizar el movimiento contable NIF generado por el deterioro y cómo verificar la afectación en un informe de cartera, así como imprimir el documento de la operación.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo de la operación de deterioro de cartera?
#### Respuesta
El objetivo es ajustar el valor en libros de una cuenta por cobrar para reflejar la probabilidad de que no se recaude el monto total adeudado. Esto se realiza para cumplir con las normativas contables, como las NIIF (Normas Internacionales de Información Financiera), y presentar una imagen más precisa de la situación financiera de la empresa.

### ¿Cómo se accede al asistente de deterioro de cartera en ContaPyme?
#### Respuesta
1. Ubícate en el **Manejador de Operaciones**.
2. Haz clic en el botón **Más Operaciones**.
3. En la pestaña **Cartera**, encontrarás el **Asistente de la Operación de Deterioro de Cartera**.

### ¿Qué información debo ingresar al crear la operación de deterioro de cartera?
#### Respuesta
Debes ingresar la siguiente información:
1.  **Documento de soporte:** El número del documento que respalda la operación, por ejemplo, "270 Deterioro de Cartera".
2.  **Fecha de soporte:** La fecha en que se realiza la operación, por ejemplo, 31 de diciembre de 2015.
3.  **Detalle:** Una descripción breve de la operación, por ejemplo, "Deterioro de Cartera cuenta de Nancy García".
4.  **Centro de costos:** El centro de costos al cual se cargará la pérdida por deterioro, por ejemplo, "Gastos Generales".

### ¿Cómo se cargan las cuentas a deteriorar en el asistente de deterioro de cartera?
#### Respuesta
1.  Dentro del asistente de deterioro, haz clic en el botón para **cargar todas las cuentas a deteriorar**.
2.  En el asistente que aparece, puedes filtrar por tercero, rango de cuentas, vencimientos por fecha o vencimientos por días.
3.  En este ejemplo, se filtra por tercero. Abre el seleccionador y busca al tercero, por ejemplo, "Nancy García".
4.  Selecciona al tercero haciendo doble clic.
5.  Indica la fecha desde la cual se cargarán las cuentas vencidas. Por ejemplo, "Primero de Julio de 2015" para cargar cuentas vencidas entre el 1 de julio de 2015 y el 31 de diciembre de 2015.
6.  Finalmente, da clic en el botón **Aceptar**.

### ¿Cómo determina ContaPyme el porcentaje de deterioro a aplicar?
#### Respuesta
ContaPyme determina el porcentaje de deterioro a aplicar basándose en la configuración de la cuenta de cartera. En esta configuración, se especifica que para deudas con una antigüedad entre 91 y 180 días, se debe aplicar un deterioro del 30% sobre el valor actual de la deuda.

### ¿Dónde puedo verificar el movimiento contable generado por la operación de deterioro de cartera?
#### Respuesta
1. Ubícate sobre la operación de deterioro de cartera en el **Manejador de Operaciones**.
2. Haz clic en el botón **Ver Movimiento Contable** (Inspector de Datos).
3. Cambia a la pestaña de **Contabilización NIF** para ver el impacto en las cuentas contables correspondientes.

### ¿Cómo puedo visualizar un informe de cartera que refleje el deterioro aplicado?
#### Respuesta
1. Dirígete a la pestaña **Cartera**.
2. En el botón **Cartera**, despliega la flecha hacia abajo.
3. Selecciona la opción **Consulta de Saldos de Cuentas por Cobrar**.
4. En la ventana que aparece, indica la **fecha de referencia** para la consulta (por ejemplo, 31 de diciembre de 2015) y el **tercero** (por ejemplo, Nancy García).
5. Da clic en el botón **Aceptar**.
6. Cambia a la vista de **Contabilización NIF** para ver el detalle del deterioro aplicado a la deuda.

### ¿Cómo puedo imprimir el documento de soporte de la operación de deterioro de cartera?
#### Respuesta
1. Ubícate sobre la operación de deterioro de cartera en el **Manejador de Operaciones**.
2. Haz clic derecho sobre la operación.
3. Ve a la pestaña **Informes**.
4. Selecciona la opción **Imprimir Documento de Operaciones Seleccionadas**.
5. El sistema mostrará la vista previa del documento de impresión, que contiene todos los datos de la operación, incluyendo el valor deteriorado.

---

# Ejemplo 1 reversión de deterioro
[Ver el video](https://www.youtube.com/watch?v=TgYhU5bjEI0)
TgYhU5bjEI0

## Tema principal
Reversión de deterioro de cartera en ContaPyme.

## Resumen general
Este video explica, a través de un ejemplo práctico, cómo realizar la reversión de un deterioro de cartera en ContaPyme. Se detalla el proceso paso a paso, desde la ubicación de la operación en el manejador, la selección del documento de soporte, la carga de la cuenta afectada, el ingreso del valor a revertir, hasta la verificación del movimiento contable NIF y la generación del documento de impresión. Se aprende cómo el sistema imputa las cuentas correctamente, especialmente cuando la reversión se realiza en un período diferente al del deterioro original, y cómo verificar la afectación en los informes de cartera.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo de la operación de reversión de deterioro de cartera?
#### Respuesta
El objetivo de la operación de reversión de deterioro de cartera es deshacer o compensar el efecto de un deterioro previamente aplicado a una cuenta por cobrar, generalmente cuando el cliente paga la deuda o cuando la situación que causó el deterioro ha mejorado.

### ¿Dónde se encuentra la operación de reversión de deterioro de cartera en ContaPyme?
#### Respuesta
La operación de reversión de deterioro de cartera se encuentra en el manejador de operaciones, dentro de la pestaña Cartera, después de hacer clic en el botón "más operaciones".

### ¿Qué tipo de documento de soporte se utiliza para la reversión de deterioro de cartera en el ejemplo?
#### Respuesta
En el ejemplo, se utiliza el tipo de documento de soporte 275, denominado "reversión de deterioro de cartera".

### ¿Qué información se debe ingresar en el detalle de la operación de reversión de deterioro de cartera?
#### Respuesta
En el detalle de la operación, se debe ingresar una descripción clara de la reversión, como por ejemplo: "Reversión de deterioro cuenta de [Nombre del Cliente]". En el ejemplo se ingresa: "Reversión de deterioro cuenta de Jenny Espinosa".

### ¿Por qué es importante activar la opción "reversión de deterioro en distinto periodo"?
#### Respuesta
Es importante activar la opción "reversión de deterioro en distinto periodo" cuando el deterioro se contabilizó en un año y la reversión se realiza en otro año. Esto le indica al sistema que la cuenta sobre la cual se debe contabilizar la reversión ya no será una cuenta de gastos (ya que el año anterior está cerrado), sino una cuenta de ingresos.

### ¿Dónde se configuran las cuentas que el sistema imputará automáticamente al realizar el deterioro y la reversión del deterioro?
#### Respuesta
Las cuentas que el sistema imputará automáticamente al realizar el deterioro y la reversión del deterioro se configuran en la cuenta de cartera dentro del catálogo de cuentas.

### ¿Cómo se carga la cuenta a la que se le aplicará la reversión del deterioro?
#### Respuesta
Para cargar la cuenta, sigue estos pasos:
1.  Haz clic en el botón **cargar cuentas**.
2.  En la ventana que se abre, puedes seleccionar un tercero, un rango de cuentas y una referencia. En este caso, abre el seleccionador del tercero y busca el nombre del cliente.
3.  Haz clic en el botón **aceptar**.

### ¿Qué información se muestra al cargar la cuenta en la operación de reversión de deterioro?
#### Respuesta
Al cargar la cuenta, se muestra información como el saldo actual, la fecha de vencimiento, la fecha del último deterioro aplicado, el valor del último deterioro y el valor de los deterioros acumulados.

### ¿Qué valor se debe ingresar en el campo "valor reversión"?
#### Respuesta
En el campo "valor reversión" se debe digitar el valor a revertir. El sistema no permitirá aplicar una reversión de deterioro mayor al valor ya deteriorado.

### ¿Cómo se verifica el movimiento contable de la operación?
#### Respuesta
Para verificar el movimiento contable de la operación, da clic en el botón **ver movimiento contable** dentro del inspector de datos.

### ¿Dónde se encuentra el informe de cartera en ContaPyme?
#### Respuesta
El informe de cartera se encuentra en la pestaña **cartera**, botón **cartera** y selecciona la consulta de **saldos de cuentas por cobrar**.

### ¿Qué información se debe ingresar en la consulta de saldos de cuentas por cobrar?
#### Respuesta
En la consulta de saldos de cuentas por cobrar, se debe ingresar la fecha de referencia (la fecha hasta la cual se está haciendo la consulta) y el tercero (cliente) al que se le aplicó la reversión del deterioro.

### ¿Cómo se genera el documento de impresión de la operación de reversión de deterioro?
#### Respuesta
Para generar el documento de impresión, sigue estos pasos:
1. Regresa al manejador de operaciones.
2. Haz clic derecho sobre la operación.
3. Selecciona el botón **informes**.
4. Da clic a la opción **imprimir documento como**.
5. Selecciona el tipo de documento de impresión deseado. En el ejemplo se usa el documento 550 de comprobante de reversión de deterioro de cartera.
6. Da clic en la opción **vista previa**.

---

# Ejemplo 2 deterioro de cartera
[Ver el video](https://www.youtube.com/watch?v=jUpDi8BDRx0)
[jUpDi8BDRx0]

## Tema principal
Realización de la operación de deterioro de cartera utilizando el método de flujos futuros en ContaPyme.

## Resumen general
Este video explica cómo realizar una operación de deterioro de cartera en ContaPyme utilizando el método de flujos futuros. Se utiliza un ejemplo práctico con una cuenta vencida de un cliente para mostrar el proceso paso a paso. Se aprende cómo acceder al asistente de deterioro de cartera, cargar la cuenta a deteriorar, calcular el valor del deterioro mediante flujos futuros, y verificar el movimiento contable y el impacto en los informes de cartera. También se muestra cómo visualizar el documento de impresión de la operación.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo principal del video?
#### Respuesta
El objetivo principal del video es mostrar, a través de un ejemplo práctico, cómo se realiza la operación de deterioro de cartera en ContaPyme.

### ¿Qué método de deterioro de cartera se utiliza en el ejemplo?
#### Respuesta
En el ejemplo se utiliza el método de flujos futuros para aplicar el deterioro de cartera.

### ¿Cuál es el primer paso para realizar la operación de deterioro de cartera en ContaPyme?
#### Respuesta
El primer paso es ubicarte en el manejador de operaciones, dar clic en el botón **más operaciones**, y en la pestaña **cartera**, encontrarás el asistente de la operación de deterioro de cartera.

### ¿Qué tipo de documento de soporte se utiliza para sustentar la operación de deterioro de cartera en el ejemplo?
#### Respuesta
Se utiliza el tipo de documento de soporte **270 de deterioro de cartera**.

### ¿Qué fecha se utiliza como fecha de soporte de la transacción en el ejemplo?
#### Respuesta
Se utiliza el **31 de diciembre de 2015** como fecha de soporte de la transacción.

### ¿Cómo se carga la cuenta a deteriorar en el asistente de deterioro de cartera?
#### Respuesta
Para cargar la cuenta a deteriorar, sigue estos pasos:
1. Dentro del asistente de deterioro de cartera, da clic al botón para **cargar todas las cuentas a deteriorar**.
2. Selecciona la opción de **cargar al tercero**.
3. Abre el seleccionador y busca al tercero (en el ejemplo, la señora Jenny Espinosa).
4. Da doble clic para seleccionarlo.
5. Habilita la opción para cargar cuentas pendientes entre **1 y 180 días**.
6. En el rango **hasta**, escribe **180**.
7. Finalmente, da clic al botón **aceptar**.

### ¿Por qué en el ejemplo solo está habilitado el campo para calcular el deterioro por flujos futuros?
#### Respuesta
Porque la cuenta de cartera sobre la cual se está aplicando el deterioro solo tiene habilitado el manejo de deterioro por flujos futuros.

### ¿Cómo se calcula el valor del deterioro utilizando el método de flujos futuros?
#### Respuesta
El valor del deterioro se calcula utilizando el botón de **cálculo de flujos futuros**. Se deben indicar el valor de los pagos futuros, las fechas de esos pagos futuros y la tasa de interés. El sistema calculará automáticamente el valor presente de los flujos futuros y el valor del deterioro.

### ¿Qué datos se deben ingresar en la ventana de cálculo de flujos futuros?
#### Respuesta
Se deben ingresar los siguientes datos:
*   **Fecha de los pagos futuros**.
*   **Valor de los pagos futuros**.
*   **Tasa de interés**.

### ¿Qué tasa de interés se debe utilizar para el cálculo del deterioro por flujos futuros?
#### Respuesta
Si la deuda maneja intereses, se debe utilizar esa tasa de interés. Si los intereses son implícitos, se debe indicar la tasa de mercado para una deuda de características similares.

### ¿Cómo verifica el video el movimiento contable de la operación?
#### Respuesta
Se verifica el movimiento contable de la operación a través del **inspector de datos**, dando clic al botón **ver movimiento contable**.

### ¿Qué cuentas contables se ven afectadas en la contabilización NIF?
#### Respuesta
Se carga un valor crédito a la cuenta **13990505**, que es la cuenta puente deterioro, y se carga el débito por la pérdida de deterioro a la cuenta del gasto **51991005**, con cargo al centro de costo seleccionado.

### ¿Cómo se visualiza un informe de cartera para verificar la afectación del deterioro?
#### Respuesta
Para visualizar un informe de cartera, sigue estos pasos:
1.  Dirígete a la pestaña **cartera**.
2.  En el botón **cartera**, despliega la flecha hacia abajo.
3.  Selecciona el informe **consulta saldos de cuentas por cobrar**.
4.  Selecciona la fecha de referencia (en el ejemplo, **31 de diciembre de 2015**).
5.  Selecciona el tercero (en el ejemplo, la señora Jenny Espinosa).
6.  Da clic al botón **aceptar**.

### ¿Cómo se accede al documento de impresión de la operación?
#### Respuesta
Estando ubicado sobre la operación en el manejador de operaciones, utiliza el comando **Control + Y**. El sistema abrirá el seleccionador de documentos de impresión. Selecciona el documento **545 de comprobante de deterioro de cartera** y da clic al botón **vista previa**.

---

# Ejemplo 3 deterioro de cartera
[Ver el video](https://www.youtube.com/watch?v=l25GFzVNYbM)
[l25GFzVNYbM]

## Tema principal
Aplicación del deterioro de cartera utilizando el método de costo amortizado en ContaPyme.

## Resumen general
Este video explica cómo aplicar el deterioro de cartera a una cuenta específica en ContaPyme, utilizando el método de costo amortizado. Se muestra el proceso desde la ubicación de la operación en el manejador de operaciones, la selección del tipo de documento de soporte, la carga de la cuenta a deteriorar, hasta la verificación del movimiento contable, la visualización del informe de cartera y la generación del documento de impresión. El ejemplo se centra en una cuenta vencida de Damián Zapata y se aplica el deterioro al 31 de octubre de 2015.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo del video?
#### Respuesta
El objetivo del video es explicar, a través de un ejemplo práctico, cómo se realiza la operación de deterioro de cartera en ContaPyme.

### ¿Qué método de deterioro de cartera se utiliza en el ejemplo?
#### Respuesta
En el ejemplo se utiliza el método de costo amortizado para aplicar el deterioro de cartera.

### ¿Dónde se encuentra la operación de deterioro de cartera en ContaPyme?
#### Respuesta
Para encontrar la operación de deterioro de cartera, sigue estos pasos:
1. Ubícate en el **Manejador de Operaciones**.
2. Da clic en el botón **Más Operaciones**.
3. En la pestaña **Cartera**, encontrarás el acceso a la operación **Deterioro de Cartera**.

### ¿Qué tipo de documento de soporte se utiliza para la operación de deterioro de cartera en el ejemplo?
#### Respuesta
Se utiliza el tipo de documento de soporte 270 de deterioro de cartera.

### ¿Qué información se debe ingresar en el detalle de la operación?
#### Respuesta
En el detalle de la operación se debe escribir una descripción breve de la operación, por ejemplo, "Deterioro de cartera, cuenta de Damián Zapata".

### ¿Cómo se indica el centro de costos sobre el cual se cargará la pérdida por deterioro?
#### Respuesta
1.  Abre el **seleccionador** del campo **Centro de Costos**.
2.  Busca y selecciona el centro de costos deseado, por ejemplo, **Gastos Generales**.

### ¿Cómo se cargan las cuentas a deteriorar?
#### Respuesta
Sigue estos pasos:
1. Da clic en el botón **Cargar cuentas a deteriorar**.
2.  Selecciona el **tercero**, el **rango de cuentas** y los **vencimientos** por fecha o por días. En este caso, se carga al tercero Damián Zapata.
3.  Abre el **seleccionador de terceros**.
4.  Busca y da doble clic sobre **Damián Zapata** para seleccionarlo.
5.  Selecciona cargar los vencimientos **por días**, indicando hasta 90 días de vencimiento.
6.  Da clic en el botón **Aceptar**.

### ¿Por qué el sistema deshabilita las columnas de cálculo de deterioro por flujos futuros y por probabilidad de no pago?
#### Respuesta
El sistema deshabilita esas columnas porque la cuenta de cartera sobre la cual se está aplicando el deterioro tiene habilitado solamente el manejo de deterioro por costo amortizado.

### ¿Dónde se configura la tasa nominal diaria para el cálculo del costo amortizado?
#### Respuesta
La tasa nominal diaria se configura en la cuenta de cartera, indicando la tasa efectiva anual o la tasa nominal diaria. Independientemente de cuál se configure, el sistema siempre trabajará con la tasa nominal diaria.

### ¿Cómo se verifica el movimiento contable de la operación?
#### Respuesta
1. Da clic en el botón **Ver movimiento contable**.
2.  Verifica la **contabilización NIIF**, donde se mostrará un crédito sobre la cuenta puente de deterioro y un débito sobre la cuenta del gasto.

### ¿Cómo se genera un informe de cartera para verificar la afectación del deterioro?
#### Respuesta
Sigue estos pasos:
1.  Dirígete a la pestaña **Cartera**.
2.  En el botón **Cartera**, despliega la flecha hacia abajo.
3.  Selecciona **Consulta de saldos de cuentas por cobrar**.
4.  Indica la **fecha de referencia** (por ejemplo, 31 de octubre de 2015).
5.  Selecciona el **tercero** (por ejemplo, Damián Zapata).
6.  Da clic en el botón **Aceptar**.

### ¿Qué información adicional se muestra en la contabilización NIIF del informe de cartera?
#### Respuesta
Además de los datos de la deuda (fecha de creación, fecha estimada de pago, número de referencia, saldo de la deuda), se evidencia una pérdida por deterioro sobre la referencia.

### ¿Cómo se genera el documento de impresión de la operación?
#### Respuesta
Sigue estos pasos:
1. Regresa al **Manejador de Operaciones**.
2. Da clic derecho sobre la **operación**.
3. En el botón **Informes**, selecciona la pestaña para enviar el documento directamente a la impresora o para abrir el seleccionador de documentos de impresión.
4. Selecciona el tipo de documento de impresión (por ejemplo, el documento 545 de comprobante de deterioro de cartera).
5. Da clic en el botón **Vista previa**.

---

# Intereses ContaPyme R8
[Ver el video](https://www.youtube.com/watch?v=uhVk8Pvtmq0)

## Tema principal
Manejo del módulo de intereses en ContaPyme, incluyendo configuraciones, cálculos y casos especiales.

## Resumen general
Este video explica cómo utilizar el módulo de intereses en ContaPyme para el cálculo automático de intereses corrientes y de mora en cuentas por cobrar. Se aprende a activar el módulo, crear tipos de crédito, registrar créditos con intereses corrientes y por mora, realizar abonos, causar intereses automáticamente y manejar casos especiales como períodos de gracia, períodos muertos y beneficios por pago anticipado. Además, se muestra cómo realizar abonos a capital y cómo estos afectan el valor de las cuotas o el plazo de la deuda.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los intereses corrientes?
#### Respuesta
Los intereses corrientes son un porcentaje aplicado al valor del crédito, representando el beneficio o compensación por el riesgo y el tiempo que se presta el dinero. Este interés se acumula día a día y se paga en la fecha estimada de pago.

### ¿Qué son los intereses moratorios?
#### Respuesta
Los intereses moratorios son un porcentaje que se cobra cuando hay atrasos en el pago del préstamo.

### ¿Qué sistema de amortización utiliza ContaPyme?
#### Respuesta
ContaPyme utiliza el sistema de amortización francés, donde la cuota de pago es fija a lo largo de todo el período del crédito, con una tasa de interés fija. Los intereses se amortizan de forma decreciente y el capital de forma creciente.

### ¿Cómo se activa el módulo de intereses en ContaPyme?
#### Respuesta
Para activar el módulo de intereses, sigue estos pasos:
1. Ve a la pestaña **Básico** y abre el **Explorador Gráfico de Empresas**.
2. Selecciona la empresa, haz clic derecho y elige **Modificar**.
3. Dirígete a la pestaña **Cartera y Proveedores**.
4. Haz clic en el botón **Activar manejo de intereses en las cuentas por cobrar**.
5. Indica la **Fecha Inicial** a partir de la cual se empezará a controlar los intereses.
6. Haz clic en el botón **Aceptar**.

### ¿Qué son los tipos de crédito y cómo se crean en ContaPyme?
#### Respuesta
Los tipos de crédito son parámetros que permiten definir las condiciones de los créditos, como la tasa de interés, periodicidad, si aplica beneficio y las cuentas contables. Para crear un tipo de crédito, sigue estos pasos:
1. Ve a la pestaña **Cartera** y selecciona **Tipos de Crédito**.
2. Haz clic en **Crear**.
3. Define un **Código** para el tipo de crédito.
4. Ingresa un **Nombre** descriptivo para el tipo de crédito.
5. Define la **Periodicidad** (mensual, quincenal o semanal).
6. En las pestañas **Interés Corriente** o **Interés por Mora**, activa la opción correspondiente y define los parámetros como porcentaje de interés y cuentas contables.
7. Haz clic en el botón **Aceptar**.

### ¿Cómo se configura un tipo de crédito por defecto en un tercero?
#### Respuesta
Para configurar el tipo de crédito por defecto en un tercero, sigue estos pasos:
1. Ve a la pestaña **Básico** y abre el **Catálogo de Terceros**.
2. Selecciona el tercero y haz clic derecho para elegir **Modificar**.
3. Dirígete a la pestaña **Datos Cliente**.
4. Ve a la sub-pestaña **Créditos**.
5. En la sección **Tipo de Crédito por Defecto**, selecciona el tipo de crédito deseado.
6. Haz clic en el botón **Aceptar**.

### ¿Cómo se registra un crédito con interés corriente en ContaPyme?
#### Respuesta
Para registrar un crédito con interés corriente, sigue estos pasos:
1. Ve a la pestaña **Básico** y abre el **Manejador de Operaciones**.
2. Selecciona **Más Operaciones**, luego **Cartera** y elige la operación **Crear Préstamo o Anticipo**.
3. Define el **Tipo de Documento de Soporte** y la **Fecha**.
4. Ingresa el **Valor** del préstamo.
5. Selecciona el **Tercero** al que se le presta el dinero.
6. Define la **Cuenta por Cobrar**.
7. Abre la ventana de **Definición de Cuotas** e indica el **Tipo de Crédito**, **Plazo** (número de cuotas), **Periodicidad**, **Día de Pago** y la **Fecha del Primer Pago**.
8. Haz clic en **Calcular Cuotas** y verifica la información.
9. Haz clic en **Aceptar**.
10. Define la forma en que salió el dinero y haz clic en **Finalizar**.

### ¿Cómo se realiza el abono de una cuenta por cobrar con interés corriente?
#### Respuesta
Para realizar el abono de una cuenta por cobrar con interés corriente, sigue estos pasos:
1. Ve al **Manejador de Operaciones**.
2. Selecciona **Más Operaciones**, luego **Cartera** y elige la operación **Abono a Cuentas por Cobrar**.
3. Cambia la **Fecha** al día del abono.
4. Selecciona el **Tercero**.
5. Busca la cuenta por cobrar y haz doble clic sobre la cuota a cancelar.
6. Verifica que el sistema cargue automáticamente los **Intereses Corrientes**.
7. Indica la **Forma de Pago** y haz clic en **Finalizar**.

### ¿Cómo se realiza la causación automática de intereses en ContaPyme?
#### Respuesta
Para causar los intereses automáticamente al final del mes, sigue estos pasos:
1. Ve al **Manejador de Operaciones**.
2. Selecciona **Más Operaciones**, luego **Contabilidad** y elige la operación **Acciones Automáticas de Fin de Mes**.
3. Desactiva las demás acciones y deja activa únicamente la acción **Causación de Intereses**.
4. Haz clic en **Finalizar**.

### ¿Cómo se registra un crédito con interés por mora en ContaPyme?
#### Respuesta
Para registrar un crédito con interés por mora, sigue estos pasos:
1. Crea el tipo de crédito para interés por mora (ver pregunta anterior).
2. Ve al **Manejador de Operaciones**.
3. Selecciona **Más Operaciones**, luego **Ventas** y elige la operación **Facturación y Ventas**.
4. Define el **Tipo de Documento de Soporte** y la **Fecha**.
5. Selecciona el **Cliente**.
6. Carga los **Productos** a vender.
7. En la **Forma de Pago**, selecciona **Cuenta por Cobrar** y define las cuotas.
8. En la ventana de **Definición de Cuotas**, selecciona el tipo de crédito de interés por mora.
9. Define el **Plazo**, **Periodicidad**, **Día de Pago** y la **Fecha del Primer Pago**.
10. Haz clic en **Calcular Cuotas** y verifica la información.
11. Haz clic en **Aceptar**.
12. Finaliza la operación.

### ¿Cómo se registra el abono de un crédito con interés por mora y se factura el interés?
#### Respuesta
Para registrar el abono de un crédito con interés por mora, sigue estos pasos:
1. Ve al **Manejador de Operaciones**.
2. Selecciona **Más Operaciones**, luego **Cartera** y elige la operación **Abono a Cuentas por Cobrar**.
3. Cambia la **Fecha** al día del abono (si el abono se realiza fuera de la fecha de pago, se calculará el interés por mora).
4. Selecciona el **Tercero**.
5. Busca la cuenta por cobrar.
6. El sistema mostrará una ventana de **Facturación de Intereses por Mora**, indicando el valor a facturar.
7. Cierra la ventana y finaliza la operación de abono.
8. El sistema generará automáticamente una factura por los intereses por mora. Verifica la información en la factura y procésala.

### ¿Qué es un período de gracia y cómo se configura en un tipo de crédito?
#### Respuesta
Un período de gracia es un período durante el cual el cliente paga solo el valor del interés sobre el saldo de la deuda, sin abonar capital. Para configurar un tipo de crédito con período de gracia:
1. Ve a la pestaña **Cartera** y selecciona **Tipos de Crédito**.
2. Haz clic en **Crear**.
3. Define un **Código** para el tipo de crédito.
4. Ingresa un **Nombre** descriptivo (ej: "Interés Corriente X% con Período de Gracia").
5. Define la **Periodicidad** (mensual, quincenal o semanal).
6. En la pestaña **Interés Corriente**, activa la opción y define el **Porcentaje de Interés**.
7. Activa la opción **Permitir Período de Gracia**.
8. Define las **Cuentas Contables**.
9. Haz clic en el botón **Aceptar**.

### ¿Qué es un período muerto y cómo se configura en un tipo de crédito?
#### Respuesta
Un período muerto es un período durante el cual el cliente no paga ningún valor (ni capital ni intereses), pero los intereses se acumulan al capital de la deuda. Para configurar un tipo de crédito con período muerto:
1. Ve a la pestaña **Cartera** y selecciona **Tipos de Crédito**.
2. Haz clic en **Crear**.
3. Define un **Código** para el tipo de crédito.
4. Ingresa un **Nombre** descriptivo (ej: "Interés Corriente X% con Período Muerto").
5. Define la **Periodicidad** (mensual, quincenal o semanal).
6. En la pestaña **Interés Corriente**, activa la opción y define el **Porcentaje de Interés**.
7. Activa la opción **Permitir Período Muerto**.
8. Define las **Cuentas Contables**.
9. Haz clic en el botón **Aceptar**.

### ¿Qué es el beneficio por pago anticipado y cómo se configura en un tipo de crédito?
#### Respuesta
El beneficio por pago anticipado permite que, al realizar el pago antes de la fecha pactada, se vea un beneficio en el valor final del crédito. El sistema cobra la cuota total, pero calcula los intereses hasta el día que se hace el pago, y la diferencia se abona a la deuda. Para configurar un tipo de crédito con beneficio por pago anticipado:
1. Ve a la pestaña **Cartera** y selecciona **Tipos de Crédito**.
2. Haz clic en **Crear**.
3. Define un **Código** para el tipo de crédito.
4. Ingresa un **Nombre** descriptivo (ej: "Interés Corriente X% con Beneficio Pago Anticipado").
5. Define la **Periodicidad** (mensual, quincenal o semanal).
6. En la pestaña **Interés Corriente**, activa la opción y define el **Porcentaje de Interés**.
7. Activa la opción **Aplicar Beneficio por Pago Anticipado**.
8. Define las **Cuentas Contables**.
9. Haz clic en el botón **Aceptar**.

### ¿Cómo se realiza un abono a capital y qué opciones ofrece ContaPyme?
#### Respuesta
Para realizar un abono a capital, sigue estos pasos:
1. Ve al **Manejador de Operaciones**.
2. Selecciona **Más Operaciones**, luego **Cartera** y elige la operación **Abono a Cuentas por Cobrar**.
3. Verifica la **Fecha**.
4. Selecciona el **Tercero**.
5. Utiliza la opción **Abonar Monto a Capital**.
6. Ingresa el **Valor del Abono**.
7. Selecciona si el abono es a un **Crédito**.
8. Elige entre **Disminuir el Plazo de la Deuda** o **Disminuir el Valor de la Cuota**.
9. Haz clic en **Aceptar**.
10. Define la **Forma de Pago** y haz clic en **Finalizar**.

---

# Métodos de Deterioro de Cartera en ContaPyme
[Ver el video](https://www.youtube.com/watch?v=5FTNWpRcaz0)
[Métodos deterioro]

## Tema principal
Explicación de los tres métodos de deterioro de cartera disponibles en ContaPyme.

## Resumen general
Este video explica cómo funcionan los tres métodos de deterioro de cartera que ofrece ContaPyme: por probabilidad de no pago, por flujos futuros y por costo amortizado. Se describe cómo se calcula el deterioro en cada método y cómo se configuran las cuentas de cartera para aplicar cada uno de ellos. El video también menciona que los tres métodos se pueden utilizar simultáneamente o individualmente.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los métodos de deterioro de cartera que ofrece ContaPyme?
#### Respuesta
ContaPyme ofrece tres métodos de deterioro de cartera:
*   Método de deterioro por probabilidad de no pago.
*   Método de deterioro por flujos futuros.
*   Método del costo amortizado.

### ¿Puedo usar los tres métodos de deterioro de cartera al mismo tiempo?
#### Respuesta
Sí, es posible manejar de forma simultánea los tres métodos de deterioro de cartera en ContaPyme.

### ¿Cuál es el método de deterioro de cartera más sencillo de usar en ContaPyme?
#### Respuesta
El método de deterioro por probabilidad de no pago es el más sencillo de utilizar.

### ¿Cómo activo el método de deterioro por probabilidad de no pago?
#### Respuesta
Para activar este método debes seguir estos pasos:
1.  Ir a la configuración de cada cuenta de cartera sobre la cual se aplicará el deterioro.
2.  Indicar los días de vencimiento y porcentajes de probabilidad de no pago para cada rango de días.

### ¿Cómo se calcula el deterioro de cartera bajo el método de probabilidad de no pago?
#### Respuesta
El deterioro se calcula de la siguiente manera:
1.  Se toma el valor en libros de la deuda.
2.  Se verifica la cantidad de días de vencimiento que tiene la cuenta a la fecha de aplicación del deterioro.
3.  Según esta cantidad de días, el sistema verificará la tabla de días y el porcentaje configurado en la cuenta para los días de vencida.
4.  Se calcula el nuevo deterioro sobre ese saldo de la cuenta, aplicando el porcentaje correspondiente.

### ¿Cómo activo el método de deterioro por flujos futuros?
#### Respuesta
Para activar este método debes seguir estos pasos:
1.  Ir a la configuración de la cuenta de cartera sobre la cual se aplicará el deterioro.
2.  Activar la opción correspondiente.
3.  En la operación de deterioro, activar el botón a través del cual deberás indicar los datos de los flujos futuros.

### ¿Cómo se calcula el deterioro de cartera bajo el método de flujos futuros?
#### Respuesta
El deterioro se calcula de la siguiente manera:
1.  Se toma el valor en libros de la deuda.
2.  Se indica el valor de los flujos futuros y la fecha estimada en la que se recibirán dichos flujos.
3.  Se indica la tasa de interés con la cual se calculará el valor presente de dichos flujos futuros.
4.  El sistema calcula el valor presente de los flujos futuros.
5.  Este valor se resta al valor actual de la deuda y de allí se calcula el deterioro.

### ¿Quiénes deberían usar el método del costo amortizado?
#### Respuesta
Este método solo debe ser utilizado por aquellos usuarios que están llevando el costo amortizado de sus activos financieros, específicamente de sus cuentas por cobrar.

### ¿Cómo activo el método del costo amortizado?
#### Respuesta
Para activar este método debes seguir estos pasos:
1.  Ir a la configuración del plan de cuentas y allí activar el manejo de costo amortizado.
2.  En la cuenta contable de cartera a la cual vayas a activar el método de costo amortizado, debes indicar la tasa efectiva anual o nominal diaria, con la cual se calculará el costo amortizado de la cuenta.

### ¿Cómo se calcula el deterioro de cartera bajo el método del costo amortizado?
#### Respuesta
El deterioro se calcula de la siguiente manera:
1.  Se toma el valor en libros de la deuda.
2.  Se verifican los días en vencimiento y la tasa de interés configurada en cada cuenta.
3.  El sistema actualiza el valor en libros de la deuda.
4.  Resta este valor al saldo en libros.
5.  De allí se calcula el deterioro.

---

# Operación deterioro de cartera
[Ver el video](https://www.youtube.com/watch?v=w0IEXW6y8bw)
w0IEXW6y8bw

## Tema principal
Aplicar el deterioro de cartera de forma automática en ContaPyme.

## Resumen general
Este video explica cómo utilizar la operación de deterioro de cartera en ContaPyme para reflejar la pérdida de valor de las deudas debido al riesgo de no pago. El sistema permite aplicar diferentes métodos de deterioro (costo amortizado, flujos futuros, probabilidad de no pago) e impactar la contabilización local o NIIF. El video muestra un ejemplo práctico donde se aplica el deterioro por probabilidad de no pago a cuentas de clientes nacionales con vencimiento entre 1 y 90 días, afectando la contabilización NIIF.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el deterioro de cartera?
#### Respuesta
El deterioro de cartera es la pérdida de valor que puede llegar a sufrir una cartera de clientes debido al posible incumplimiento de pago de las deudas.

### ¿Dónde se encuentra la operación de deterioro de cartera en ContaPyme?
#### Respuesta
Para acceder a la operación de deterioro de cartera, debes ir al **manejador de operaciones**, hacer clic en el botón **más operaciones**, luego seleccionar la pestaña **cartera**. Allí encontrarás el asistente para la operación de deterioro de cartera.

### ¿Qué datos se deben ingresar en el encabezado de la operación de deterioro de cartera?
#### Respuesta
En el encabezado de la operación debes ingresar:
- Tipo de documento de soporte.
- Clase de operación.
- Fecha de soporte de la operación.
- Detalle de la transacción que se está realizando.
- Centro de costos al cual se cargará la pérdida por deterioro.

### ¿Qué opciones ofrece la barra de botones dentro de la operación de deterioro de cartera?
#### Respuesta
La barra de botones ofrece opciones como:
- Cargar todas las cuentas a deteriorar.
- Indicar los flujos futuros estimados, cuando se utiliza el método de flujos futuros.

### ¿Qué información se muestra en la zona de registro de la operación de deterioro de cartera?
#### Respuesta
En la zona de registro se muestra información como:
- Código del tercero.
- Código de la deuda.
- Centro de costos (si aplica).
- Saldo actual de la deuda.
- Fecha de vencimiento de la deuda.
- Días de vencida hasta la fecha de la transacción.
- Última fecha de deterioro.
- Días a deteriorar.
- Tasa nominal diaria (para el cálculo de deterioro por costo amortizado).
- Valor del deterioro por costo amortizado.
- Valor del deterioro por flujos futuros.
- Porcentaje de probabilidad de no pago.
- Valor del deterioro por probabilidad de no pago.
- Observaciones.

### ¿Qué opciones de tipo de contabilización ofrece la operación de deterioro de cartera?
#### Respuesta
La operación de deterioro de cartera ofrece tres opciones de tipo de contabilización:
- Contabilización según configuración.
- Contabilización local.
- Contabilización NIIF (por defecto).
Para cambiar la opción, debes dar clic al botón **Operación** y seleccionar el **Tipo de Contabilización** deseado.

### ¿Cómo se cargan las cuentas a deteriorar en la operación?
#### Respuesta
Para cargar las cuentas a deteriorar, da clic en el botón **cargar cuentas a deteriorar**. El sistema abrirá un asistente donde podrás seleccionar:
1.  Un tercero en particular.
2.  Un rango de cuentas de cartera.
3.  Vencimientos entre un rango de fechas.
4.  Vencimientos en cantidad de días.
Luego da clic al botón **Aceptar** para que el sistema cargue la información.

### ¿Cómo se puede cambiar el porcentaje de deterioro por probabilidad de no pago en la operación?
#### Respuesta
El porcentaje de deterioro por probabilidad de no pago se puede cambiar directamente en la columna correspondiente a cada cuenta, si es necesario. Sin embargo, el porcentaje inicial se basa en la configuración del deterioro por probabilidad de no pago según la edad de la cartera.

### ¿Cómo se verifica el movimiento contable generado por la operación de deterioro de cartera?
#### Respuesta
Para verificar el movimiento contable, selecciona la operación guardada y procesada. Luego, utiliza el **inspector de datos** y da clic al botón **ver movimiento contable**. Podrás ver los asientos contables generados para la contabilización local y/o NIIF.

### ¿Cómo se visualiza el documento de impresión de la operación de deterioro de cartera?
#### Respuesta
Para visualizar el documento de impresión, utiliza el atajo de teclado **Control+Y** para abrir el seleccionador de documentos de impresión. El sistema sugiere el documento **545 de comprobante deterioro de cartera** por defecto. Da clic al botón **vista previa** para visualizar el documento.

---

# ¿Qué es deterioro de cartera?
[Ver el video](https://www.youtube.com/watch?v=xs63rZ6DyBI)
[¿Qué es deterioro de cartera?]

## Tema principal
Explicación del concepto de deterioro de cartera y sus características en ContaPyme.

## Resumen general
Este video explica qué es el deterioro de cartera desde una perspectiva conceptual y cómo se aplica en ContaPyme. Se define el deterioro como la pérdida de valor económico de un activo, especialmente en el contexto del riesgo crediticio. El video aborda las evidencias objetivas de deterioro según la NIC 39, la aplicación individual o grupal del deterioro, y la reversión del deterioro. También detalla cómo ContaPyme maneja el deterioro, incluyendo la importancia de la cartera vencida, la configuración de plazos y porcentajes de no pago, el manejo del costo amortizado, el recálculo del deterioro al aplicar abonos y la opción de realizar deterioro y reversión de forma manual.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el deterioro de cartera?
#### Respuesta
El deterioro de cartera es la pérdida de valor económico que sufre un activo, en este caso, las cuentas por cobrar. Desde el punto de vista del riesgo crediticio, se entiende como la probabilidad de que un deudor no pague parte o la totalidad del crédito otorgado.

### ¿Qué indica la NIC 39 sobre el deterioro de cartera?
#### Respuesta
La NIC 39 indica que el deterioro de cartera se debe aplicar a aquellas cuentas por cobrar que muestren evidencias objetivas de deterioro.

### ¿Cuáles son ejemplos de evidencias objetivas de deterioro según la NIC 39?
#### Respuesta
Algunos ejemplos de evidencias objetivas de deterioro son:
- Dificultades financieras del deudor.
- Incumplimiento o moras en el pago del crédito.
- Otorgamiento de plazos adicionales al deudor.
- Probabilidad de quiebra o reorganización financiera por parte del deudor.
- Condiciones económicas adversas a nivel nacional o local.

### ¿El deterioro de cartera se aplica de forma individual o grupal?
#### Respuesta
El deterioro de cartera debe aplicarse individualmente, es decir, sobre cada cuenta o factura. Sin embargo, se puede realizar una evaluación grupal sobre un grupo de cuentas que cuente con características similares de riesgo crediticio.

### ¿Qué es la reversión del deterioro de cartera?
#### Respuesta
La reversión del deterioro es la aplicación que se realiza cuando existe una disminución en la pérdida por deterioro. Esta disminución se puede atribuir a un hecho ocurrido con posterioridad a la aplicación del deterioro, como por ejemplo, una mejora en la calificación crediticia del deudor.

### ¿Qué se debe tener en cuenta al contabilizar la reversión del deterioro?
#### Respuesta
Al presentar una reversión del deterioro se debe tener en cuenta si la reversión se realiza en el mismo periodo del deterioro o en un periodo posterior. Dependiendo del caso será necesario realizar las imputaciones en una cuenta del gasto (primer caso) o en una cuenta de ingresos (segundo caso).

### ¿Sobre qué tipo de cartera se puede aplicar el deterioro en ContaPyme?
#### Respuesta
En ContaPyme, solo se puede deteriorar la cartera vencida. Esto significa que solo se podrá aplicar deterioro de cartera sobre aquellas cuentas que tengan al menos un día de vencimiento. Para cuentas con plazo no se podrá aplicar deterioro.

### ¿Qué se debe configurar en ContaPyme para el deterioro de cartera?
#### Respuesta
Se deben configurar a cada cuenta de cartera los plazos y porcentajes de probabilidad de no pago. A cada cuenta de cartera se le deben configurar los rangos de días de vencimiento y los porcentajes de probabilidad de no pago.

### ¿Qué significa el manejo de deterioro por costo amortizado en ContaPyme?
#### Respuesta
El manejo de deterioro por costo amortizado se activa en el caso de que el cliente esté manejando o desee manejar el costo amortizado para los activos financieros, específicamente para las cuentas por cobrar.

### ¿Cómo se realiza el deterioro de cartera en ContaPyme?
#### Respuesta
El deterioro de cartera se realiza sobre cada cuenta o factura de forma individual. El sistema cargará de forma individual cada una de las referencias por tercero y por cuenta.

### ¿Qué ocurre si se aplica un abono a una cuenta ya deteriorada en ContaPyme?
#### Respuesta
Si a una cuenta ya deteriorada se le aplica un abono, al realizarse el abono sobre dicha cuenta, en la operación de abono cuentas por cobrar, se recalculará el nuevo valor del deterioro.

### ¿Se puede realizar el deterioro y la reversión del deterioro de forma manual en ContaPyme?
#### Respuesta
Sí, es posible realizar el deterioro y la reversión del deterioro de forma manual en ContaPyme. La reversión del deterioro solo se realizará sobre cuentas que ya han sido deterioradas.

### ¿En qué módulo de ContaPyme se encuentra la operación de deterioro y reversión de deterioro?
#### Respuesta
La operación de deterioro y reversión de deterioro se incluye en el módulo de cartera y proveedores. Cualquier usuario que cuente en su licenciamiento con el módulo de cartera y proveedores, tendrá derecho a realizar la operación de deterioro de cartera y reversión del deterioro de cartera.

### ¿El deterioro de cartera aplica para contabilización local y NIF en ContaPyme?
#### Respuesta
Sí, el deterioro de cartera puede aplicar tanto para la contabilización NIF como para la contabilización local, aunque por defecto los movimientos quedarán en la contabilización NIF.

### ¿Es recomendable utilizar una cuenta puente para el deterioro de cartera en ContaPyme?
#### Respuesta
Sí, es recomendable que se configure el deterioro de cartera sobre una cuenta puente y no sobre la misma cuenta de cartera, esto con el fin de poder llevar un mejor control de los movimientos de deterioro y de los saldos de cartera de cada cliente.

---

# Reversión deterioro
[Ver el video](https://www.youtube.com/watch?v=2RF_B0eBVlc)
Operación de reversión de deterioro de cartera

## Tema principal
Cómo realizar la reversión de deterioro de cartera en ContaPyme.

## Resumen general
Este video explica el proceso de reversión del deterioro de cartera en ContaPyme, el cual se realiza cuando disminuye la pérdida por deterioro debido a un hecho posterior, como una mejora en la calificación crediticia del deudor.  Se muestra cómo acceder a la operación, ingresar los datos necesarios (documento de soporte, fecha, detalle, centro de costos) y cargar las cuentas deterioradas.  Además, se explica cómo el sistema permite elegir si la reversión afecta la contabilización local o NIF y se presenta un ejemplo práctico para ilustrar el proceso.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la reversión del deterioro de cartera y cuándo se realiza?
#### Respuesta
La reversión del deterioro de cartera se realiza cuando existe una disminución en la pérdida por deterioro. Esta disminución debe ser atribuible a un evento que ocurrió después de la aplicación inicial del deterioro, como por ejemplo, una mejora en la calificación crediticia del deudor.

### ¿Cómo se accede a la operación de reversión de deterioro de cartera en ContaPyme?
#### Respuesta
Para acceder a la operación de reversión de deterioro de cartera, siga estos pasos:
1. Vaya al **Manejador de Operaciones**.
2. Haga clic en el botón **Más Operaciones**.
3. Seleccione la pestaña **Cartera**.
4. Allí encontrará el acceso a la operación de **Reversión de Deterioro de Cartera**.

### ¿Qué datos se deben ingresar en el encabezado de la operación de reversión de deterioro?
#### Respuesta
En el encabezado de la operación, debe ingresar la siguiente información:
-   **Documento de soporte:**  El número del documento que respalda la transacción.
-   **Clase de operación:** La clase de operación correspondiente.
-   **Fecha de soporte de la operación:** La fecha en que se realizó la reversión del deterioro.
-   **Detalle:** Una descripción breve de la transacción, indicando el tipo de reversión que se está realizando.
-   **Centro de costos:** El centro de costos al cual se cargará el valor por la reversión del deterioro.
-   Indicar si la reversión del deterioro se está realizando en un periodo posterior al periodo en el cual se dio el deterioro (opcional).

### ¿Qué opciones ofrece la barra de botones en la operación de reversión de deterioro?
#### Respuesta
La barra de botones ofrece varias opciones para la edición de la operación, incluyendo:
-   Botón para **cargar las cuentas ya deterioradas**.
-   Botones para **cortar, copiar y pegar**.

### ¿Qué información se muestra en la zona de registro de la operación?
#### Respuesta
En la zona de registro se muestra la siguiente información de la cuenta deteriorada:
-   Código del deudor.
-   Código de la deuda.
-   Centro de costos (si aplica).
-   Saldo actual de la deuda.
-   Fecha de vencimiento.
-   Número de días vencidos.
-   Fecha del último deterioro aplicado.
-   Valor del último deterioro aplicado.
-   Valor acumulado de todos los deterioros practicados.
-   Valor a reversar del deterioro.
-   Observaciones.

### ¿Cómo se selecciona el tipo de contabilización (local o NIF) que afectará la reversión del deterioro?
#### Respuesta
Para seleccionar el tipo de contabilización, siga estos pasos:
1.  En la parte superior de la operación, haga clic en el botón **Operación**.
2.  Se desplegará un menú con opciones, incluyendo **Tipo de Contabilización**.
3.  Seleccione la opción deseada:
    *   **Contabilización según configuración**
    *   **Contabilización Local**
    *   **Contabilización NIF**.
    *   Por defecto, viene activada la opción de **Contabilización NIF**.

### ¿Cómo se cargan las cuentas deterioradas a las que se aplicará la reversión?
#### Respuesta
Para cargar las cuentas deterioradas, siga estos pasos:
1.  Haga clic en el botón **Cargar Cuentas**.
2.  Se abrirá un asistente que le permitirá seleccionar las cuentas a las que desea aplicar la reversión del deterioro.
3.  Puede seleccionar las cuentas utilizando diferentes criterios:
    *   Seleccionar un tercero.
    *   Seleccionar un rango de cuentas.
    *   Seleccionar una referencia en particular.
4.  Después de especificar los criterios, haga clic en el botón **Aceptar**.

### ¿Qué ocurre si se intenta aplicar una reversión de deterioro mayor al valor ya deteriorado?
#### Respuesta
El sistema no permitirá aplicar una reversión de deterioro mayor al valor ya deteriorado. Si por error se ingresa un valor mayor, el sistema mostrará un error y no permitirá que la operación sea procesada.

### ¿Cómo se verifica el movimiento contable generado por la reversión del deterioro?
#### Respuesta
Para verificar el movimiento contable generado por la reversión del deterioro, siga estos pasos:
1.  Después de guardar y procesar la operación, haga clic en el botón **Ver Movimiento Contable** (Inspector de Datos).
2.  Podrá ver el movimiento contable tanto para la contabilización local como para la contabilización NIF.

### ¿Cómo se genera un informe de cartera para verificar la afectación de la reversión del deterioro?
#### Respuesta
Para generar un informe de cartera, siga estos pasos:
1.  Vaya a la pestaña **Cartera**.
2.  Haga clic en el botón **Cartera**.
3.  Despliegue la flecha hacia abajo y seleccione **Consulta de Saldos de Cuentas por Cobrar**.
4.  En la ventana que se abre, puede seleccionar la fecha de referencia, un rango de cuentas, un tercero, entre otros datos.
5.  Ingrese los criterios de búsqueda y haga clic en el botón **Aceptar**.

### ¿Cómo se genera el documento de impresión de la operación de reversión del deterioro?
#### Respuesta
Para generar el documento de impresión, siga estos pasos:
1.  Ubicado sobre la operación en el **Manejador de Operaciones**, utilice el comando **Control + Y**.
2.  En la ventana que se abre, seleccione el tipo de documento de impresión.  El sistema carga por defecto el documento **550 de Comprobante de Reversión de Deterioro de Cartera**.
3.  Haga clic en el botón **Vista Previa**.

---

# Reversión en abono
[Ver el video](https://www.youtube.com/watch?v=wncO2P9ps8g)
Reversión de deterioro en abono a cuentas por cobrar

## Tema principal
Reversión automática del deterioro de cartera al abonar a cuentas por cobrar deterioradas en ContaPyme.

## Resumen general
Este video explica cómo ContaPyme automatiza la reversión del deterioro de cartera cuando se realiza un abono a una cuenta por cobrar que ya ha sido deteriorada.  Se muestra un ejemplo práctico con la señora Nancy García, detallando el proceso paso a paso para realizar el abono, cómo el sistema recalcula el deterioro basado en el nuevo saldo y la edad de la deuda, y cómo se refleja este cambio en la consulta de saldos de cuentas por cobrar. Se aprende a registrar un abono, verificar el movimiento contable y confirmar el nuevo saldo y el valor del deterioro en el sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué permite la operación de abono a cuentas por cobrar en relación con el deterioro de cartera?
#### Respuesta
La operación de abono a cuentas por cobrar, ubicada en el módulo de automatización de documentos, permite que el sistema realice la reversión del deterioro de forma automática al realizar un abono a una cuenta que ya ha sufrido deterioro. El sistema recalcula el deterioro teniendo en cuenta el nuevo saldo de la cuenta y su edad en cartera.

### ¿Cómo se accede a la operación de abono a cuentas por cobrar en ContaPyme?
#### Respuesta
Para acceder a la operación de abono a cuentas por cobrar, sigue estos pasos:
1.  Ve al **manejador de operaciones**.
2.  Haz clic en el botón **más operaciones**.
3.  En la pestaña **cartera**, encontrarás el acceso a la operación de **abono a cuentas por cobrar**.

### ¿Qué información se necesita para realizar una operación de abono a cuentas por cobrar?
#### Respuesta
Necesitas la siguiente información:
1.  **Tipo de documento de soporte:**  Por ejemplo, recibo de caja.
2.  **Número del consecutivo:** El sistema lo calcula automáticamente.
3.  **Fecha de soporte:** La fecha en la que se realiza el abono.
4.  **Detalle:** Una descripción del abono.
5.  **Tercero:** La persona o empresa que realiza el abono.
6.  **Cuenta por cobrar:** La referencia de la cuenta pendiente.
7.  **Valor abonado:** El valor que se está abonando a la cuenta.
8.  **Forma de cobro:** Cómo se recibió el dinero (por ejemplo, efectivo).

### ¿Cómo se selecciona la cuenta por cobrar a la que se aplicará el abono?
#### Respuesta
Tienes dos opciones:
1.  **Cargar todas las cuentas:** Haz clic en el botón "cargar todas las cuentas" para traer todas las cuentas pendientes por cobrar con el tercero.
2.  **Seleccionar manualmente:** Haz doble clic sobre la celda "cuentas por cobrar" para abrir el seleccionador de cuentas por cobrar y elegir la referencia deseada.

### ¿Qué información se muestra al seleccionar una cuenta por cobrar en la operación de abono?
#### Respuesta
Al seleccionar una cuenta por cobrar, se muestra la referencia pendiente (el valor original adeudado) y el valor del deterioro que se aplicó previamente.

### ¿Cómo se registra el valor del abono en la operación?
#### Respuesta
En el campo "**valor abonado**", escribe el valor recibido del abono. El sistema calculará automáticamente el nuevo saldo.

### ¿Dónde se selecciona la forma en la que se recibió el pago del abono?
#### Respuesta
En el paso de "**liquidación y forma de cobro**", selecciona la forma en la que se recibió el dinero (por ejemplo, efectivo a través de la forma de pago de caja).

### ¿Cómo se verifica el movimiento contable generado por la operación de abono a cuentas por cobrar?
#### Respuesta
1.  Después de guardar la operación de abono, utiliza el **inspector de datos**.
2.  Haz clic en el botón "**ver movimiento contable**".
Esto te mostrará la contabilización local y NIF del abono, incluyendo la reversión del deterioro.

### ¿Qué muestra el movimiento contable NIF en la operación de abono con reversión de deterioro?
#### Respuesta
El movimiento contable NIF muestra el crédito a la cuenta de cartera por el valor del abono y el débito a la cuenta de caja por el mismo valor.  Adicionalmente, muestra el débito a la cuenta "recuperación de deterioro" y el crédito a la cuenta "deterioro acumulado", reflejando la reversión del deterioro de cartera.

### ¿Cómo se calcula la reversión del deterioro en el sistema?
#### Respuesta
La reversión del deterioro se calcula automáticamente teniendo en cuenta:
1.  **El nuevo saldo de la cuenta.**
2.  **La nueva edad en cartera.**
3.  **La configuración de probabilidad de no pago.**
El sistema aplica un porcentaje de deterioro (según la configuración) al nuevo saldo de la deuda, considerando la nueva edad de la cartera.

### ¿Cómo se genera una consulta de cartera para verificar el nuevo saldo y el deterioro después del abono?
#### Respuesta
1.  Ve a la pestaña **cartera**.
2.  Haz clic en el botón **cartera**.
3.  Selecciona "**consulta de saldos de cuentas por cobrar**".
4.  Indica la fecha de referencia (la fecha del abono).
5.  Selecciona el tercero (la señora Nancy García en el ejemplo).
6.  Haz clic en el botón **aceptar**.

---

# Software contable ContaPyme - Configuraciones iniciales para programación de pagos
[Ver el video](https://www.youtube.com/watch?v=3eXCEYqWeLI)
[Configuraciones iniciales para programación de pagos]

## Tema principal
Configuración inicial de ContaPyme para la programación de pagos a proveedores y empleados.

## Resumen general
Este video explica las configuraciones iniciales necesarias en ContaPyme para utilizar la herramienta de programación de pagos. Aprenderás a verificar los catálogos de bancos y tipos de cuentas bancarias, configurar las cuentas empresariales desde las cuales se realizarán los pagos, registrar la información bancaria de los proveedores y empleados, y establecer la cuenta empresarial por defecto para la programación de pagos. Estas configuraciones son esenciales para automatizar la generación de movimientos contables y archivos de pago.

## Preguntas Frecuentes (FAQ)

### ¿Qué permite la herramienta de programación de pagos?
#### Respuesta
La herramienta de programación de pagos permite programar el pago de cuentas por pagar a proveedores y empleados, generar automáticamente el movimiento contable de la programación, afectando así la contabilidad, y generar el archivo de pago para subirlo al banco.

### ¿Cuáles son las configuraciones iniciales necesarias para utilizar la programación de pagos?
#### Respuesta
Las configuraciones iniciales son:
1.  Verificar el catálogo de bancos.
2.  Verificar el catálogo de tipos de cuentas bancarias.
3.  Configurar las cuentas empresariales.
4.  Configurar los datos bancarios de los terceros (proveedores o empleados).
5.  Configurar la cuenta empresarial por defecto para realizar los pagos.

### ¿Dónde se encuentran los catálogos de bancos y tipos de cuentas bancarias en ContaPyme?
#### Respuesta
Los catálogos de bancos y tipos de cuentas bancarias se encuentran en la pestaña **Básico**, luego en la opción **Complementos**, después en **Títulos** y allí se seleccionan las opciones **Bancos** o **Tipos de cuentas bancarias**.

### ¿El catálogo de bancos en ContaPyme viene preconfigurado?
#### Respuesta
Sí, el listado de bancos ya viene completamente configurado en el sistema, pero se puede crear un nuevo banco si el requerido no se encuentra en la lista, utilizando el código asignado por el Banco de la República.

### ¿El catálogo de tipos de cuentas bancarias en ContaPyme viene preconfigurado?
#### Respuesta
Sí, el catálogo de tipos de cuentas bancarias ya viene creado por defecto en el sistema, pero se puede crear un nuevo tipo de cuenta bancaria que no se encuentre en el listado, utilizando la opción **Crear** en la cinta de opciones.

### ¿Cómo se configura una cuenta empresarial en ContaPyme?
#### Respuesta
Para configurar una cuenta empresarial:
1.  Dirígete a la pestaña **Cartera**.
2.  Selecciona la opción **Catálogos**.
3.  Haz clic en **Cuentas empresariales**.
4.  Haz clic en la opción **Crear** en la cinta de opciones.
5.  Selecciona la sede a la cual pertenece la cuenta empresarial.
6.  Selecciona el banco al cual pertenece la cuenta.
7.  Registra el número de la cuenta.
8.  Completa la información adicional de la cuenta, del titular y la cuenta contable.
9.  Haz clic en **Aceptar**.

### ¿Qué terceros deben configurarse para la programación de pagos?
#### Respuesta
Se deben configurar los terceros cuyo tipo de tercero sea **Proveedor** o **Empleado**.

### ¿Cómo se configura la información de la cuenta bancaria de un proveedor o empleado?
#### Respuesta
Para configurar la información de la cuenta bancaria de un proveedor o empleado:
1.  Dirígete a la pestaña **Básico**.
2.  Selecciona la opción **Catálogos**.
3.  Haz clic en **Catálogo de terceros**.
4.  Ubícate en el proveedor o empleado.
5.  Haz clic derecho y selecciona la opción **Modificar**.
6.  Ubícate en la pestaña **Cuenta bancaria**.
7.  Registra la información de la cuenta bancaria (nombre del titular, número de cuenta, banco, tipo de cuenta y forma de pago).
8.  Haz clic en **Aceptar**.

### ¿Cómo se configura la cuenta empresarial por defecto para la programación de pagos?
#### Respuesta
Para configurar la cuenta empresarial por defecto:
1.  Dirígete a la pestaña **Cartera**.
2.  Selecciona la opción **Catálogos**.
3.  Haz clic en **Programación de pagos**.
4.  En la cinta de opciones, selecciona la opción **Configuración**.
5.  En el menú de la parte izquierda, selecciona la opción **Configuración general**.
6.  Selecciona la cuenta empresarial por defecto.
7.  Indica el tipo de movimiento por defecto.
8.  Haz clic en **Aceptar**.

---

# Software contable ContaPyme - Ejemplo 1 Generación de programación de pagos
[Ver el video](https://www.youtube.com/watch?v=TmHdchlyeZA)

## Tema principal
Generación de programación de pagos a proveedores en ContaPyme.

## Resumen general
Este video explica, a través de un ejemplo práctico, cómo generar una programación de pagos en ContaPyme, específicamente para las obligaciones vencidas con proveedores. Se muestra cómo acceder al catálogo de programación de pagos, crear una nueva programación, seleccionar las cuentas por pagar a programar, generar el archivo de pago y, finalmente, cómo registrar el movimiento contable una vez realizado el pago. El video guía al usuario a través de cada paso, desde la selección de fechas hasta la generación del archivo que se sube a la plataforma del banco.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la función de programación de pagos en ContaPyme?
#### Respuesta
Para acceder a la función de programación de pagos en ContaPyme, sigue estos pasos:
1.  Selecciona la pestaña **cartera**.
2.  Ubica la opción **catálogos**.
3.  Selecciona **programación de pagos**.

### ¿Cómo creo una nueva programación de pagos en ContaPyme?
#### Respuesta
Para crear una nueva programación de pagos, una vez que estás en el catálogo de programación de pagos, sigue estos pasos:
1.  Ubícate en la cinta de opciones y selecciona la opción **crear**.
2.  En el asistente de registro, verifica la **fecha de la programación**.
3.  Indica la **fecha de pago por defecto**.
4.  En el campo **descripción**, indica el motivo del pago (por ejemplo, "pago a proveedores").
5.  Da clic en el botón **agregar cuentas por pagar**.

### ¿Cómo selecciono las cuentas por pagar a programar?
#### Respuesta
Después de dar clic en "agregar cuentas por pagar", sigue estos pasos:
1.  Indica el rango de fechas para la vigencia de las cuentas por pagar a programar (fecha inicial y fecha final).
2.  Activa la opción **ver solo cuentas vencidas**.
3.  Da clic en **aceptar**.
4.  Selecciona las cuentas a programar de la lista que se muestra.

### ¿Qué información se muestra al seleccionar las cuentas por pagar?
#### Respuesta
Al seleccionar las cuentas por pagar a programar, el sistema carga información como:
-   El **valor** a pagar.
-   La **fecha a pagar** (que coincide con la fecha de pago por defecto).
-   Los **datos de origen**: la cuenta empresarial configurada por defecto, el banco y el tipo de cuenta desde la cual se realizará el pago, y el tipo de movimiento del banco.
-   Los **datos de destino**: la cuenta del proveedor a la cual se realizará el pago, el banco y el tipo de cuenta bancaria.
-   Los **datos de información adicional**: el motivo del pago y el documento referencia de la cuenta por pagar.

### ¿Cómo genero el archivo de pago después de seleccionar las cuentas por pagar?
#### Respuesta
Después de verificar los datos de las cuentas por pagar seleccionadas, sigue estos pasos:
1.  Da clic en el botón **generar archivo de pago**.
2.  En la ventana de generación del archivo, visualiza los datos de la cuenta empresarial y el tipo de movimiento bancario.
3.  Selecciona el **Driver del banco** con el cual se realizará el pago.
4.  Da clic en **aceptar**.
5.  Selecciona la ruta en la cual se guardará el archivo y asigna un nombre.
6.  Da clic en **guardar**.

### ¿Cómo registro el movimiento contable una vez realizado el pago?
#### Respuesta
Una vez generado el archivo de pago y realizada la transferencia bancaria, debes registrar el movimiento contable en ContaPyme:
1.  Ingresa a la **programación de pagos** correspondiente.
2.  Da clic en el botón **generar movimiento contable**. Esto registrará los pagos en la contabilidad y afectará las cuentas por pagar.
3.  Para finalizar el registro de la programación de pagos, da clic en **aceptar**.

---

# Software contable ContaPyme - Generación de programación de pagos
[Ver el video](https://www.youtube.com/watch?v=4AvkiIw57Xk)
[Software contable ContaPyme - Generación de programación de pagos]

## Tema principal
Generación de archivos para pago a terceros mediante programación de pagos.

## Resumen general
Este video explica cómo generar una programación de pagos en ContaPyme, una herramienta del módulo Cartera y Proveedores que permite crear un archivo para subir a la plataforma del banco y realizar pagos a terceros. Se detalla el proceso para crear una nueva programación, agregar cuentas por pagar, configurar la información del pago y generar el archivo TXT, así como previsualizarlo y generar el movimiento contable correspondiente. El objetivo es facilitar el pago a múltiples proveedores o empleados de manera eficiente y automatizada.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la programación de pagos en ContaPyme?
#### Respuesta
La programación de pagos es una herramienta dentro del módulo de Cartera y Proveedores de ContaPyme que permite generar un archivo para subir a la plataforma del banco, con el fin de realizar pagos a múltiples terceros (proveedores, empleados, etc.) de manera simultánea en una fecha específica.

### ¿Dónde se encuentra la opción de Programación de pagos en ContaPyme?
#### Respuesta
Para acceder a la programación de pagos, debes ir a la pestaña **Cartera**, luego a la opción **Catálogos** y finalmente seleccionar **Programación de pagos**.

### ¿Cómo se crea una nueva programación de pagos?
#### Respuesta
Para crear una nueva programación de pagos, sigue estos pasos:

1.  Dirígete a la pestaña **Cartera > Catálogos > Programación de pagos**.
2.  Haz clic en la opción **Crear** en la cinta de opciones.
3.  Se abrirá el asistente para registro de la nueva programación de pagos.
4.  Indica la fecha de registro de la programación de pagos.
5.  Escribe una descripción de los pagos a programar (ej. "Pago de nómina diciembre 31 de 2015").
6.  Selecciona la fecha en la cual se realizará el pago.

### ¿Cómo se agregan las cuentas por pagar a la programación de pagos?
#### Respuesta
Después de ingresar los datos del encabezado de la programación de pagos, sigue estos pasos:

1.  Haz clic en el botón **Agregar cuentas por pagar**.
2.  Se abrirá un asistente donde puedes indicar:
    *   Un rango de fechas para filtrar las cuentas por pagar (fecha inicial y fecha final).
    *   Filtrar por un tercero específico.
    *   Filtrar por una categoría de terceros.
    *   Solicitar que se carguen solo las cuentas por pagar vencidas.
3.  Una vez indicados los datos, haz clic en **Aceptar**. El sistema cargará las cuentas por pagar que cumplan con las condiciones especificadas.

### ¿Qué información se muestra de cada cuenta por pagar al agregarla a la programación de pagos?
#### Respuesta
El sistema muestra la siguiente información de cada cuenta por pagar:

*   Documento referencia.
*   Cuenta de proveedores.
*   Código y nombre del tercero.
*   Fecha de creación de la cuenta por pagar.
*   Fecha de vencimiento.
*   Valor total a pagar.

### ¿Qué debo hacer si la cuenta bancaria de un tercero no está registrada al momento de crear la programación de pagos?
#### Respuesta
Si la cuenta bancaria de un tercero no está registrada, puedes configurarla directamente desde la ventana de programación de pagos dando clic en el icono de la linterna ubicado en la fila correspondiente a ese tercero.

### ¿Cómo se indica al sistema cuáles cuentas por pagar se van a incluir en la programación de pagos?
#### Respuesta
Ubícate en la columna **Pago** de la cuenta por pagar que deseas incluir y activa la opción **Pagar**.

### ¿Qué información se muestra al seleccionar una cuenta por pagar para incluirla en la programación de pagos?
#### Respuesta
Al activar la opción **Pagar** en una cuenta por pagar, se muestra la siguiente información:

*   **Pago:** El valor a pagar (que puede modificarse si no se cancela el valor total).
*   **Fecha de pago:** La fecha de pago indicada en el encabezado.
*   **Origen:** El número de la cuenta empresarial configurada por defecto, el banco y el tipo de cuenta. Esta cuenta puede ser modificada.
*   **Movimiento bancario:** El tipo de movimiento configurado por defecto (transferencia o retiro), que también puede ser modificado.
*   **Destino:** El número de la cuenta del tercero, el banco y el tipo de cuenta.
*   **Información adicional:** El código del tercero y el documento referencia que se está cancelando.

### ¿Cómo se genera el archivo de pago en formato TXT?
#### Respuesta
Una vez seleccionadas las cuentas por pagar y verificada la información, sigue estos pasos:

1.  Haz clic en el botón **Generar archivo de pago**.
2.  En la ventana que se abre, verifica la cuenta configurada por defecto para el pago. Si es necesario, modifícala dando clic en el seleccionador del número de la cuenta.
3.  Verifica el tipo de movimiento a generar.
4.  Selecciona el driver del banco desde el cual se realizará el pago en el menú desplegable.
5.  Haz clic en **Aceptar**.
6.  Cuando el sistema indique que se está generando el archivo de pago, haz clic en **Cerrar** una vez finalizado el proceso.
7.  Indica la ruta en la cual deseas guardar el archivo TXT generado y haz clic en **Guardar**.

### ¿Cómo se puede previsualizar el archivo de pago generado?
#### Respuesta
Para visualizar el archivo generado de una forma más clara, sigue estos pasos:

1.  Haz clic en la opción **Previsualizar archivo**.
2.  En la ventana que se abre, selecciona el archivo de pago que acabas de generar.
3.  Indica el mismo driver con el cual generaste el archivo TXT.
4.  Selecciona la opción **Previsualizar en formato HTML**.
5.  Haz clic en **Aceptar**.

### ¿Qué información se puede visualizar en la previsualización del archivo de pago?
#### Respuesta
En la previsualización del archivo de pago, puedes visualizar la siguiente información:

*   Cuenta empresarial desde la cual se realizará el pago.
*   NIT y nombre de la empresa.
*   Código de la transacción.
*   Fecha de la transmisión del archivo y fecha de pago.
*   Cantidad de transacciones.
*   Total débitos (siempre mostrará ceros) y créditos (saldo total a pagar).
*   Número y tipo de cuenta.
*   Registro detallado de cada una de las cuentas por pagar: NIT y nombre del tercero, código del banco, número de la cuenta del tercero, tipo de cuenta, valor a pagar, concepto y referencia a la cual se aplicará el pago.

### ¿Cómo se genera el movimiento contable después de generar el archivo de pago?
#### Respuesta
Después de generar el archivo de pago, regresa a la programación de pagos y haz clic en el botón correspondiente para generar el movimiento contable. El sistema indicará que el movimiento se ha generado satisfactoriamente y mostrará el número y tipo de documento para cada una de las cuentas por pagar en la columna Movimiento contable.

### ¿Dónde puedo verificar que el movimiento contable se haya generado correctamente?
#### Respuesta
Para verificar el movimiento contable, dirígete al **Manejador de operaciones**, busca la operación generada y haz clic en **Modificar** para verificar que todos los datos se encuentren bien cargados. El sistema debe mostrar la cancelación de cada una de las cuentas por pagar incluidas en la programación de pagos. Finalmente, haz clic en **Aceptar**.
