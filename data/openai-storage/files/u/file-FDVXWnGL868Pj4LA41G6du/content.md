# Contabilidad

## Informes contables  

### ¿Cómo se genera un auxiliar de cuentas contables para saber cuánto ha facturado cada cliente en el año?  

**Respuesta:**  
En el módulo de **Contabilidad** puedes usar el informe de **consulta de movimiento de cuentas auxiliares** para conocer el detalle de los movimientos registrados en una o varias cuentas contables, filtrando por tercero y por rango de fechas. Así podrás ver cuánto ha facturado cada cliente en el año.  

1. Ingresa a la **Ruta**:  
   **[Cinta de opciones > Pestaña Contabilidad > Informes > Otros reportes contables > consulta de movimiento de cuentas auxiliares]**.  

2. En la ventana del informe, define:  
   - **Cuenta inicial y final:** selecciona la(s) cuenta(s) de ingresos por ventas que uses para facturación (por ejemplo, `4135 - Ventas`).  
   - **Tercero inicial y final:** selecciona el cliente específico o deja el rango vacío para todos los clientes.  
   - **Fecha inicial y final:** establece desde el 1 de enero hasta el 31 de diciembre del año que quieras consultar.  
   - **Centro de costos** *(opcional)*: filtra por área o proyecto si lo manejas.  

   ![Pantalla donde seleccionas el informe de consulta de movimiento auxiliar de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/ruta_auxiliar_cuentas.png)  

3. Haz clic en **Generar informe**.  
   El sistema mostrará el detalle de todos los movimientos de la cuenta, discriminados por tercero, con columnas de débito, crédito y saldo.  
   💡 Recuerda que puedes hacer drill down a cada uno de los movimientos que visualizas en el informe, bastará con dar doble clic sobre la operación o usar la opción: clic derecho > ver / modificar operación.

4. Para ver el total facturado por cliente:  
   - ContaPyme® **agrupará automáticamente por tercero** para que puedas visualizar fácilmente los valores correspondientes a las facturas de venta para cada uno de tus clientes.

👉 Este informe no solo sirve para facturación; también puedes aplicarlo a cuentas de cartera, bancos u otros conceptos que quieras analizar por tercero. 

💡 No olvides que todos los informes los puedes exportar a excel.

**También aplica si preguntas:**  
- ¿Cómo obtengo un informe de ventas por cliente desde contabilidad?  
- ¿Dónde veo el detalle de ingresos por tercero?  
- ¿Qué reporte me muestra cuánto le vendí a un cliente en el año?  
- ¿Cómo se genera un auxiliar de cuánto ha facturado cada tercero en el año?

**Recursos adicionales:**   
-[Video: Generar informe de consulta de movimiento auxiliar de cuentas](https://www.youtube.com/watch?v=DEUTzgbF1fo&t=80s)  

---

### ¿Cómo sacar un informe de compras de un proveedor?

**Respuesta:**  
En **ContaPyme**, las compras que realizas a un proveedor quedan registradas en las cuentas de gastos o cuentas por pagar, y puedes consultarlas desde el módulo de **Contabilidad** usando el informe de consulta de **movimiento cuentas auxiliares** o desde el módulo de **Cartera y proveedores** con el informe de **Consulta de saldos de cuentas por pagar**.  

**Opción 1: Desde Contabilidad – Consulta de movimiento de cuentas auxiliares**  

1. Ingresa a la **Ruta**:  
   **[Cinta de opciones > Pestaña Contabilidad > Informes > Otros reportes contables > consulta de movimiento de cuentas auxiliares]**.  

2. En la ventana del informe, define:  
   - **Cuenta inicial y final:** selecciona las cuentas de proveedores, inventario, costo o gasto donde se contabilizan las compras (por ejemplo, `1435 - Mercancías no fabricadas` o `2205 - proveedores nacionales`).  
   - **Tercero inicial y final:** selecciona el proveedor específico que te vende los productos o deja el rango vacío para todos los proveedores.  
   - **Fecha inicial y final:** establece el periodo que quieres analizar.

   💡 Recuerda que puedes usar filtros avanzados. Por ejemplo, en el campo Filtro, adiciona "Tipo de documento Cód." igual a 110 - Factura de compra. De esta forma, podras filtrar sólo por el tipo de documento de soporte seleccionado y ContaPyme te mostrará todos los movimientos asociados a las facturas de compra independientemente de la cuenta, el tercero, etc.

   ![Pantalla donde seleccionas el informe de consulta de movimiento auxiliar de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/ruta_auxiliar_cuentas.png)   

3. Haz clic en **Generar informe**.  
   El sistema mostrará el detalle de todos los movimientos de compras a ese tercero, con valores y fechas.  

4. Si quieres consolidar el total, usa la opción **Agrupar por tercero** o exporta a Excel y utiliza los valores necesarios para obtener el saldo por tercero o por cuenta.

**Opción 2: Desde Contabilidad – Reporte de facturas de compra**  

1. Ingresa a la **Ruta**:  
   **[Cinta de opciones > Pestaña Contabilidad > Informes > Control de documentos > Reporte de facturas de compra]**.

2. Da clic en "más opciones" y en la sección de filtros, selecciona:  
   - **Tipo de documento:** Facturas de compra. (Usualmente el documento de soporte 110) 
   - **Proveedor:** el tercero que te interesa consultar o deja el rango vacío para todos los proveedores.   
   - **Fecha inicial y final:** el periodo que quieras analizar. 
   - **Otros filtros avanzados:** Este reporte permite parametrizar cómo deseas visualizar la información. 

   Por ejemplo, si deseas que se anuncie información adicional como:

   + Las facturas de compra anuladas, no procesadas o faltantes por fechas.
   + Resumen contable, de impuestos y de medios de pago
   + También te permite agrupar, ordenar y filtar
   + Entre otros.

   ![Pantalla donde seleccionas el informe de consulta de movimiento auxiliar de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/ruta_reporte_facturas_compra.png)

3. Haz clic en **Ver informe** para obtener el listado de documentos con fecha, número de documento, valor bruto, impuestos y total.  

💡 Esta opción es útil cuando quieres ver el resumen de cada operación registrada, especialmente para auditar consecutivos de las facturas e identificar faltantes, no procesadas, anuladas, etc. 

**Opción 3: Desde el módulo de Cartera y proveedores – Explorador de cuentas por pagar**  

1. Ingresa a la **Ruta**:  
   **[Cinta de opciones > Pestaña Cartera y proveedores > Informes > Proveedores > Consulta de saldos de cuentas por pagar]**.  

2. Filtra por:  
   - **Cuenta:** Proveedores nacionales (o la cuenta específica que utilices para tus compras de mercancía a crédito).  
   - **Proveedor:** selecciona el proveedor que te interesa consultar o deja el rango vacío para ver todos los proveedores.     
   - **Fecha inicial y final:** Indica el periodo de consulta.  

   ![Pantalla donde seleccionas el informe de consulta de movimiento auxiliar de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/ruta_consulta_saldos_cxp.png)

3. Genera el informe para obtener todas las facturas de compra a crédito, el plazo de cada una y sus valores respectivo.  
- Plus: También podrás ver el plazo y vencimiento de las cuotas de cada una de las facturas por referencia (número de factura) y por proveedor. Esto es importante, ya que esta información no puedes visualizarla en las opciones anteriores.

👉 Con cualquiera de estas opciones podrás ver el **detalle de las compras**, ya sea desde la perspectiva contable o desde la gestión de cuentas por pagar a proveedores.  ContaPyme cuenta con gran cantidad de informes, consultas y exploradores, en los cuales podrás visualizar la información de diferentes formas. Es importante que revises todas las opciones y valides cuáles se acomodan mejor a tus necesidades específicas.

**También aplica si preguntas:**  
- ¿Cómo obtengo un listado de compras hechas a un proveedor?  
- ¿Dónde veo las compras que le hice a un tercero?  
- ¿Qué reporte me muestra cuánto le compré a un proveedor en el año?  
- ¿Cómo generar un reporte de compras?

**Recursos adicionales:**  
- [Video: Generar informe de consulta de movimiento auxiliar de cuentas](https://www.youtube.com/watch?v=DEUTzgbF1fo&t=80s)  
- [Video: Generar reporte de facturas de compra](https://www.youtube.com/watch?v=BqpJT1CeE1c&t=301s)  
- [Video: Generar informe de consulta de saldos de cuentas por pagar](https://www.youtube.com/watch?v=dtFxJw8qAVQ&t=207s)  

---

### ¿Cómo generar un reporte de cuentas por cobrar?

**Respuesta:**  
En **ContaPyme** puedes obtener el estado de las cuentas por cobrar (CxC) usando diversos informes, a continuación te sugerimos algunos de estos del módulo de **Cartera y proveedores** para tu revisión:  

**Opción 1: Explorador de Cuentas por cobrar**
Te permite ver todas las cuentas por cobrar en una sola vista, con filtros dinámicos por tercero, fecha, centro de costos, estado, etc y te permite añadir nuevas columnas según los datos que necesites visualizar.

1. Ruta: **[Cinta de opciones > Pestaña Cartera y proveedores > Exploradores > Cartera Cxc]**.  
2. Filtra por Fecha de corte para ver el saldo a una fecha determinada.  
3. El explorador muestra columnas como número de documento, fecha de emisión, valor, saldo pendiente y días de vencimiento.  
4. Desde aquí puedes exportar a Excel o abrir el documento original con un clic.  (incluso modificarlo de ser necesario)

**Opción 2: Informe de cuentas por cobrar por edades**  
Organiza las cuentas por cobrar en rangos de antigüedad (0-30 días, 31-60 días, etc.) para identificar la cartera vencida.  

1. Ruta: **[Cinta de opciones > Pestaña Cartera y proveedores > Informes > Consulta de Cuentas por cobrar por edades]**.  
2. Selecciona:  
   - **Cuenta** selecciona la cuenta que uses para los créditos realizados (por ejemplo, `130505 - Clientes nacionales`).También puedes dejar el campo vacío para visualizar todas las cuentas contables que utilices.
   - **Tercero** selecciona un cliente para validar la edad de la cartera vigente. También puedes dejar el campo vacío para visualizar todos los clientes a los cuales le realizaste créditos.
   - **Fecha de referencia**. Indica la fecha de corte para la información que verás en el informe. El saldo que verás será histórico. (Puedes escoger si deseas visualizar las cuentas con saldo cero o no) 
 
3. Genera el informe para obtener el total por rango y por cliente.  
   - **Rangos de edad** (el sistema trae un rango de edad de cartera por defecto, pero puedes ajustarlos). 

**Opción 3: Movimiento de Cuentas por cobrar**
Muestra cada documento de la cuenta por cobrar con su historial de pagos, abonos y saldos pendientes.  

1. Ruta: **[Cinta de opciones > Pestaña Cartera y proveedores > Informes > Movimiento de cuentas por cobrar]**.  
2. Filtra por:  
   - **Cuenta** selecciona la cuenta que uses para los créditos realizados (por ejemplo, `130505 - Clientes nacionales`).También puedes dejar el campo vacío para visualizar todas las cuentas contables que utilices.
   - **Tercero**. selecciona un cliente para validar los movimientos asociados a los créditos causados. También puedes dejar el campo vacío para visualizar todos los clientes a los cuales le realizaste créditos y sus movimientos.
   - **Fecha inicial y final** para el rango que quieras consultar.  

3. El informe detalla fecha del crédito, abonos realizados, número de documento, valor, edad de cartera, fecha de pago, plazo en días y saldo pendiente.  

👉 Usar las tres opciones combinadas te permitirá ver desde una visión global de la cartera, hasta el detalle por documento y su antigüedad. 
👉 Si bien te recomendamos algunos informes, recuerda explorar todas las alternativas disponibles para que puedas validar cuál se ajusta mejor a tus necesidades específicas.

**También aplica si preguntas:**  
- ¿Dónde veo qué clientes me deben y cuánto?  
- ¿Cómo puedo consultar la cartera vencida?  
- ¿Qué reporte muestra los saldos pendientes de los clientes?  
- ¿Cómo generar un reporte de cuentas por cobrar de clientes activos?

**Recursos adicionales:**  
- [Video: Generar explorador de cuentas por cobrar](https://www.youtube.com/watch?v=XndbK9Rruy0)  
- [Video: Generar consulta de cuentas por cobrar por edades (lección 1/2)](https://www.youtube.com/watch?v=JNq1gaJjN_w)  
- [Video: Generar consulta de cuentas por cobrar por edades (lección 2/2)](https://www.youtube.com/watch?v=v4Sqybw49dI&t=320s) 
- [Video: Generar reporte de movimiento de cuentas por cobrar](https://www.youtube.com/watch?v=G0mua47YCJM)  

---

### ¿Cómo generar informes comparativos?
**Respuesta:**  
En **ContaPyme**, las **tablas comparativas** son reportes que permiten analizar la información contable a profundidad, comparando los saldos de varias cuentas en diferentes periodos.  
No solo muestran los valores en formato de tabla, sino que ofrecen herramientas para:  
- Generar **gráficos** y visualizar tendencias.  
- **Filtrar** por año, mes, día o rangos personalizados.
- Generar acumulados entre años y meses.  
- Hacer **drill down** para ver el detalle de un saldo hasta llegar al documento origen.  
- Comparar resultados entre **centros de costos**, terceros o cuentas específicas.  

Este tipo de informes son muy útiles para:  
- Analizar la evolución de ingresos, gastos o utilidades.  
- Detectar variaciones significativas entre periodos.  
- Preparar reportes gerenciales y presentaciones.  

**Pasos para generar la tabla comparativa:**

1. Ingresa a la **Ruta**:  
   **[Cinta de opciones > Pestaña Contabilidad > Informes > Tablas comparativas]**.  

2. En la ventana de configuración, define:  
   - **Tipo de informe** Balance general, estado de resultados o mayor y balances.
   -**Tipo de tabla:** Por años y meses, por centro de costos, por tercero, empresa, clase de operación, tipo de documento de soporte o por cubos.
   - **Periodo referencia:** Fecha final o de corte para el reporte.  
   - **Cuentas:** *(opcional)* Este informe dinámico te permite filtrar por una o varias cuentas (por ejemplo, ventas, gastos, utilidad).  
   - **Centro de costos** *(opcional)*: ideal si manejas análisis por áreas o proyectos.  
   - **Años/meses** *(opcional)*: Filtra por un año o mes en específico para comparar tendencias.

3. Haz clic en **Generar informe** para ver la tabla con:  
   - Columna por periodo  
   - Fila por cuenta  
   - Totales   
   - Grafica e interpreta fácilmente: Revisa las opciones para cambiar la visualización de la información a gráficos de barras, líneas o pastel 

    💡 Tip: Para graficar, utiliza la tecla shift y las teclas de dirección para seleccionar una o varias cuentas. Luego utiliza la opción que necesites. Por ejemplo:  

      ![Pantalla donde exploras las gráficas que puedes generar con las tablas comparativas de ContaPyme (podrás generar gráficos comparando cuentas y años)](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/graficas_tablas_comparativas.png)   

4. **Opciones adicionales:**  
   - **Drill down:** haz doble clic sobre un valor para abrir el detalle y ver los documentos que componen el saldo de la cuenta.
   - **Exportar a Excel** para análisis más avanzados.  
   - Filtrar por tercero o documento para comparativos específicos.  

👉 Este informe es clave para tomar decisiones estratégicas, ya que combina datos resumidos, opciones gráficas y navegación al detalle de la información.  

**También aplica si preguntas:**  
- ¿Cómo hago un comparativo de cuentas entre dos periodos?  
- ¿Dónde veo una tabla comparativa de ingresos y gastos?  
- ¿Qué informe me muestra variaciones entre meses?  
- ¿Cómo comparo un estos de resultados con el mes pasado?
- ¿Cómo generar balances bimestrales comparativos?

---

### ¿Cómo visualizar el movimiento contable de una operación?

**Respuesta:**  
En **ContaPyme** puedes revisar el detalle de los débitos y créditos que generó una operación utilizando dos herramientas principales: el **Inspector** en el manejador de operaciones, en el **explorador de contabilidad** o en el informe de **Movimiento contable**.  

**Opción 1: Inspector de operaciones**  
Permite ver el movimiento contable de manera inmediata desde la misma operación, sin salir del manejador de operaciones.

1. Ubícate en el manejador de operaciones sobre el registro que deseas revisar (factura, recibo, nota, etc.) 
2. Haz clic en el botón **Inspector** (botón ubicado en la parte superior del manejador de operaciones) 

   ![Pantalla donde seleccionas el informe de consulta de movimiento auxiliar de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/boton_inspector.png)   

3. En la pestaña 🔎 **contable**, verás:  
   - Las cuentas afectadas.  
   - El valor debitado o acreditado en cada cuenta.  
   - El tercero asociado.  
   - Centro de costos y otra información relacionada.  
4. Desde aquí puedes también navegar al documento contable o exportar la información.  

**Opción 2: Informe de Movimiento contable**  
Sirve para consultar el asiento contable completo de cualquier operación registrada en el sistema.  

1. Ruta: **[Cinta de opciones > Pestaña Contabilidad > Informes > Otros reportes contables > Movimiento contable]**.  
2. Filtra por:  
   - **Número de documento** o **comprobante**.  
   - **Fecha** y/o **tercero** si lo requieres.  
3. El sistema mostrará el detalle del asiento con todas las cuentas, valores y referencias.  
4. Puedes exportar el informe a Excel o imprimirlo como soporte.  


**Opción 3: Explorador de contabilidad**  
Es una herramienta interactiva que funciona como tabla dinámica y que permite buscar, filtrar y analizar los movimientos contables de todas las operaciones que se han registrado previamente en el sistema, pudiendo localizar rápidamente una operación específica.  

1. Ruta: **[Cinta de opciones > Pestaña Contabilidad > Consultas > Explorador de contabilidad]**.  
2. Aplica filtros como:  
   - **Cuenta contable**.  
   - **Tercero**.  
   - **Fecha o rango de fechas**.  
   - **Número de documento** o **comprobante**.  
3. Haz doble clic sobre el registro para abrir el documento origen o inspeccionar el asiento.  
4. Ideal para investigaciones rápidas y seguimiento de movimientos específicos. 
5. Esta opción te permite visualizar o modificar la operación si lo requieres. 

💡 **Tip:**  
- Usa el **Inspector** para consultas rápidas dentro del manejador de operaciones para corroborar que el asiento del registro es el esperado. 
- Usa el informe de **Movimiento contable** para soportes formales.  
- Usa el **Explorador de contabilidad** cuando no sepas el documento exacto pero sí tengas datos como cuenta, tercero o fecha.  

**También aplica si preguntas:**  
- ¿Cómo ver el asiento contable de una factura?  
- ¿Dónde consulto las cuentas afectadas por un documento?  
- ¿Qué operación me permite ver débitos y créditos de un registro?  
- ¿Cómo visualizo el movimiento contable de una operación en ContaPyme?
- ¿Cómo consultar el movimiento contable de unos documentos?

**Recursos adicionales:**  
- [Video: Generar Explorador de contabilidad](https://www.youtube.com/watch?v=8mTDTTON7co)
- [Video: Generar informe de movimiento contable de las operaciones](https://www.youtube.com/watch?v=Zgmxz3jmFNU&t=109s)

---

### ¿Cómo visualizar los informes separados en miles de pesos?  

**Respuesta:**  
En **ContaPyme**, al generar informes financieros o contables, puedes activar la opción para que los valores se muestren en **miles de pesos**, lo cual facilita la lectura cuando se manejan cifras grandes.  

**Pasos para activarlo:**  
1. Ingresa al informe que deseas generar (por ejemplo, **Balance general**, **Estado de resultados**, **Movimiento auxiliar de cuentas**, etc.).  
2. Antes de generar el informe, ubica las **opciones de configuración** que aparecen en la ventana previa.  
3. Marca la casilla **"Mostrar valores en miles"**.  
4. Genera el informe y notarás que todos los valores estarán divididos entre 1.000, conservando la precisión de los totales.  

![Pantalla de opciones de un informe financiero con la casilla “Mostrar valores en miles” marcada](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/mostrar_valores_miles.png)

💡 **Tip:** Esta opción es solo de visualización. El sistema no modifica la información contable registrada, únicamente adapta el formato del reporte para facilitar el análisis.  

**También aplica si preguntas:**  
- ¿Cómo muestro un balance en miles de pesos?  
- ¿Dónde activo que los informes se vean en miles?  
- ¿Cómo ver un estado de resultados sin tantos ceros?  
- ¿Por qué los informes no están separados por miles de pesos?
- ¿Cómo configurar la separación de miles en los informes, anexos o reportes? 

---

## Cierres contables
### ¿Cómo realizar el cierre de fin de año?
**Respuesta:**  
En **ContaPyme**, el cierre de fin de año es el proceso contable mediante el cual se cancelan las cuentas de resultado (ingresos, costos y gastos) y se trasladan sus saldos a la cuenta de **utilidad o pérdida del ejercicio**.  
Este procedimiento permite que el nuevo año contable inicie con las cuentas de resultado en cero, manteniendo únicamente los saldos de las cuentas de balance.  

**¿Qué hace el cierre de año?**  
- Calcula la **utilidad o pérdida neta** del periodo.  
- Cancela automáticamente todas las cuentas de resultado.  
- Traslada el resultado al patrimonio (cuenta definida en la configuración).  
- Garantiza que los estados financieros del nuevo año inicien nuevamente para el registro de operaciones del nuevo periodo.  

**Impacto en los estados financieros:**  
- El **Estado de resultados** reflejará en cero las cuentas de ingresos, costos y gastos al iniciar el nuevo año.  
- El **Balance general** mostrará la utilidad o pérdida acumulada en el patrimonio, sin afectar las demás cuentas de balance. 

**Catálogo de acciones de cierre de fin de año**  
El sistema cuenta con un catálogo donde puedes **parametrizar lo que hará el cierre**.  
Desde este catálogo es posible definir:  
- **Qué cuentas cancelar** (puedes excluir o incluir cuentas específicas).  
- Si se deben **cancelar cuentas de impuestos** automáticamente.  
- Acciones de **traslado de provisiones de nómina** al nuevo año.  
- Otras operaciones adicionales que se quieran ejecutar junto con el cierre.  

💡 **Este catálogo lo encuentras en la ruta:** [Pestaña Contabilidad > Plan de cuentas > Desplegar opciones > Acciones de cierre de año]

Esta flexibilidad permite adaptar el cierre contable a la realidad operativa y fiscal de la empresa.  

**Pasos para realizar el cierre de fin de año:**  
1. Asegúrate de que todos los documentos y comprobantes del año estén contabilizados, revisados y procesados en el manejador de operaciones ya que el sistema no permitirá continuar con el registro del cierre si cada una de las operaciones se encuentran procesadas (incluidas las operaciones anuladas).

💡 **Tip:** Antes de ejecutar el cierre definitivo, puedes utilizar el filtro de "operaciones no procesadas" en el manejador de operaciones; de esta forma, sabrás si tienes ajustes pendientes o que necesites anular o eliminar respectivamente.

 ![Pantalla donde seleccionas el filtro de operaciones no procesadas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/filtro_noprocesadas.png) 

2. Realiza conciliaciones y verifica que no existan cuentas pendientes de ajuste.  
3. Ruta: **[Manejador de operaciones > Contabilidad > Cierre de fin de año]**.  
4. Indica el año que deseas cerrar.
5. Ejecuta el cierre y guarda la copia de seguridad generada por el sistema.   

👉 - **Después de cerrar el año**, no podrás registrar, modificar ni eliminar movimientos contables en ese periodo.  
👉 No se recomienda reprocesar cierres de fin de año ya que esto podría ocasionar variaciones en las cifras de los estados financieros. 
👉 - Si necesitas hacer ajustes después del cierre, deberás **reabrir el año** (esto solo lo debe hacer un usuario administrador y con precaución) En caso de que requieras realizar ajustes en tu contabilidad, ten presente cuáles fueron los resultados obtenidos antes y después de realizar las modificaciones.
👉 **Respalda tu base de datos** antes y después de ejecutar el cierre, por si necesitas restaurar información.  
👉 **Revisa el estado de resultados** después de ejecutar el cierre para verificar que efectivamente todas las cuentas de resultados fueron saldadas.

**También aplica si preguntas:**  
- ¿Cómo cerrar contablemente un año en ContaPyme?  
- ¿Qué pasa con las cuentas de ingresos y gastos al cerrar un año?  
- ¿Cómo se refleja la utilidad del ejercicio en los estados financieros?  
- ¿Cómo realizar el cierre de año si hay documentos que no lo permiten?

**Recursos adicionales:**  
- [+Info: Cierre de fin de año](https://www.contapyme.com/conocimientocontapyme/contabilidad/AD_Opr_cierre_fin_anio.HTML)
- [Video: Cierre de fin de año](hhttps://www.youtube.com/watch?v=Wy-FcKDpeEM) 
- [Video: Parametrización de las acciones de Cierre de fin de año](https://www.youtube.com/watch?v=GPdUlStEPiU) 

---

### ¿Cómo realizar el cierre de mes?
**Respuesta:**  
En **ContaPyme**, la expresión **“cierre de mes”** puede referirse a dos procesos diferentes, por lo que es importante aclarar cuál necesitas:  

**1️⃣ Cierre o bloqueo de mes (control de acceso a la información)**  
Este proceso sirve para impedir que los usuarios realicen modificaciones en meses ya revisados, conciliados o cerrados contablemente.  
- **Bloqueo de mes:** Todos los usuarios quedan bloqueados para hacer cambios, **excepto el administrador**.  
- **Cierre de mes:** Bloqueo total para todos, incluyendo el administrador.  
- No realiza asientos ni afecta los saldos, solo protege la información.  

**Pasos:**  
1. Ingresa al **Manejador de Operaciones**.  
2. Selecciona **Cierre de meses**. (Ubicado en la sección herramientas - lo encuentras representado con un botón de candado)  
3. Escoge el mes y año a bloquear/cerrar.  
4. Guarda los cambios

💡 **Tips:**  
- Úsalo después de verificar y conciliar la información del periodo.  
- Para realizar ajustes posteriores, deberás desbloquear el mes manualmente.  

**2️⃣ Acciones automáticas de fin de mes (procesos contables automatizados)**  
Esta es una **operación del módulo de contabilidad** que genera automáticamente los asientos contables necesarios al final del mes.  
- Su objetivo es **automatizar procesos recurrentes** para ahorrar tiempo y evitar errores manuales.  
- Las opciones disponibles dependen de los **módulos adicionales** adquiridos.  
- Entre las acciones más comunes están:  
  - Traslados entre centros de costos.
  - Auto activación de cuentas (utilizado en procesos de costos de producción)
  - Causación de intereses.  
  - Depreciaciones y amortizaciones. (activos fijos, diferidos) 
  - Reconocimiento de ajustes por diferencia en cambio. (Moneda extranjera)
  - Cruce de provisiones de nómina y ajuste a cero.  

**Pasos:**  
1. Ingresa al **Manejador de Operaciones**.  
2. Busca la operación **Acciones automáticas de fin de mes**.  
3. Selecciona el mes a procesar y las acciones a ejecutar.  
4. Confirma la operación y guarda los comprobantes generados.
5. Revisa el movimiento contable generado por la operación.

👉 Esta operación **no** es una herramienta para cerrar los meses. Si deseas bloquear o cerrar un mes, deberás utilizar la opción específica para ello.

💡 **Tips:**  
- Revisa que las acciones estén correctamente parametrizadas antes de ejecutar el proceso.  
- Verifica los movimientos contables resultantes para confirmar que reflejan los valores correctos.  
- Puedes combinar esta operación con el bloqueo/cierre de mes para asegurar la información.  

🔍 **En resumen:**  
- Si buscas **proteger la información y evitar modificaciones**, podrás utilizar el **bloqueo o cierre de mes**.  
- Si buscas **registrar automáticamente los asientos de fin de mes**, deberás utilizar la operación de **acciones automáticas de fin de mes**.  

**También aplica si preguntas:**  
- ¿Cómo bloqueo meses en ContaPyme?  
- ¿Cómo generar automáticamente los asientos de fin de mes?  
- ¿Qué es el cierre de mes y para qué sirve en ContaPyme?  
- ¿Cómo realizar un cierre de mes para que no se pueda modificar la información? 
- ¿En contapyme se pueden cerrar los meses? 

**Recursos adicionales:**  
- [+Info: Acciones automáticas de fin de mes]
- [Video: Operación de acciones automáticas de fin de mes](https://www.youtube.com/watch?v=e3ubskWCe94)  
- [Video: Cierre definitivo de mes en ContaPyme](https://www.youtube.com/watch?v=f9Tz8fSVGPg) 

---

### ¿Se pueden elaborar registros contables en el 2025 sin haber cerrado el año 2024? 
**Respuesta:**  
✅ **Sí, en ContaPyme puedes registrar operaciones del nuevo año sin necesidad de haber cerrado el año anterior.**  
El sistema no exige ejecutar el cierre de fin de año para continuar operando, por lo que puedes seguir ingresando comprobantes, facturas, recibos y cualquier otra transacción con normalidad.  

**¿Por qué es posible?**  
- En ContaPyme los periodos contables están abiertos por defecto, salvo que se apliquen **bloqueos o cierres de mes**.  
- El **cierre de fin de año** es un proceso independiente que se realiza por control contable y presentación de estados financieros, pero **no es un requisito para registrar el nuevo año**.  
- Esto permite continuar con las operaciones del negocio sin interrupciones, mientras el área contable termina conciliaciones, ajustes y verificaciones del año anterior.  

**Recomendaciones antes de cerrar el año anterior:**  
- Procura no dejar movimientos pendientes de contabilizar o ajustar, para que el cierre refleje datos correctos.  
- Si bien puedes seguir operando, es importante definir internamente una fecha para ejecutar el **cierre de fin de año** y garantizar que los estados financieros sean consistentes.  
- Utiliza bloqueos de mes en los periodos antiguos ya revisados para evitar modificaciones accidentales mientras trabajas en el nuevo año.  

💡 **Tip:**  
Es común que las empresas empiecen el nuevo año registrando operaciones mientras terminan de preparar el cierre del año anterior, sobre todo en enero y febrero, cuando se ajustan provisiones, impuestos y conciliaciones.  

**También aplica si preguntas:**  
- ¿Es obligatorio cerrar un año para iniciar el siguiente en ContaPyme?  
- ¿Qué pasa si no he hecho el cierre de 2024 pero necesito registrar en 2025?  
- ¿Puedo trabajar en dos años contables al mismo tiempo? 
- ¿Es posible iniciar 2025 sin terminar de alimentar 2024 colocando saldos manualmente? 

---

## Impuestos, anexos y certificados tributarios
### ¿Cómo corregir problemas con el valor base o información faltante en los anexos de retención, IVA y reteica?
**Respuesta:**  
En **ContaPyme**, los anexos de retención, IVA y reteica se alimentan directamente de la información registrada en los comprobantes contables y de la configuración de **cuentas**, **conceptos contables** y **tipos de impuestos/retenciones**.  
Si los anexos no muestran toda la información, presentan valores incorrectos, en cero o negativos, generalmente el problema está en la configuración o en el registro de las operaciones.  

**Problemas más comunes y cómo solucionarlos:**  

❌ **Los anexos no muestran toda la información:**   
   - **Solución:** 
   - Revisar que todas las cuentas involucradas en operaciones gravadas tengan correctamente parametrizado el tipo de impuesto o retención y que se hayan aplicado en todas las operaciones que se requerían.
   - También debes validar que todas las operaciones estén debidamente procesadas en el período que estás revisando.   

❌ **El anexo de retención no muestra las notas de devolución en ventas o no las resta adecuadamente:**  
   - **Solución:** Es posible que se haya registrado algún tipo de devolución a través de la operación de movimiento contable, cuando esto sucede, es importante recordar que el valor base que se diligencia en la operación, debe ir negativo, ya que por defecto dicha operación no está diseñada para este tipo de transacciones y requiere de procesos manuales adicionales para garantizar que se ejecute correctamente la información.

❌ **Valor base negativo en el anexo:**  
   - Suele ocurrir cuando hay más devoluciones o descuentos que el valor de las ventas o compras del periodo.  
   - **Solución:** Revisar las operaciones para confirmar que las devoluciones estén registradas con el concepto y cuentas correctas, y que no existan registros duplicados.  

❌ **Valor base en cero:**  
   - Puede ser que la cuenta del impuesto o retención no tenga correctamente parametrizado el atributo de "exige valor base", lo cual impide obtener dicha información. 
   - **Solución:** Validar que la cuenta contable en el PUC, tenga configurado el atributo de "exige valor base". 
   - ⚠️ Importante: Es posible que necesites reprocesar algunas operaciones para que el anexo o certificado tome correctamente el cambio después de la modificación en la configuración de la cuenta. 

❌ **El anexo de retención no muestra todas las operaciones:**  
   - El comprobante no está contabilizado, está en borrador, no procesado o se usó un concepto que no aplica retención.  
   - **Solución:** Verificar el estado del comprobante y que el concepto y la cuenta estén configurados para la retención.  

**Ejemplos prácticos:**  
1. **Factura de proveedor sin retención aplicada:** La cuenta de gasto no tenía asignado el tipo de retención en el catálogo de cuentas.  
   - **Solución:** Configurar el tipo de retención y corregir el documento.  

2. **IVA calculado sobre base incorrecta:** El concepto de venta tenía un porcentaje de IVA mal configurado (por ejemplo, 5% en vez de 19%).  
   - **Solución:** Corregir el porcentaje del concepto y corregir el comprobante.  

3. **Retención aplicada a un servicio exento:** La cuenta estaba marcada como sujeta a retención, aunque el servicio no aplicaba.  
   - **Solución:** Ajustar la cuenta o desmarcar la opción en ese comprobante específico.  

💡 **Tips y recomendaciones:**  
- Antes de registrar operaciones, asegúrate de que **cuentas y conceptos** estén correctamente parametrizados para los impuestos y retenciones aplicables.  
- Si ajustas configuraciones después de registrar documentos, deberás corregir esos documentos para que el cambio se refleje en los anexos.  
- Verifica siempre que los comprobantes estén **contabilizados** y **procesados**.  
- Haz pruebas generando los anexos después de registrar un par de operaciones para validar que los cálculos y la información aparezcan correctamente.  
- Guarda un respaldo de la base de datos antes de hacer modificaciones masivas.  

**También aplica si preguntas:**  
- ¿Por qué el valor base de retención en la fuente no es correcto?  
- ¿Qué hacer si el valor base en el anexo sale negativo o en cero?  
- ¿Cómo incluir las notas de devolución en los anexos?  
- ¿Por qué el anexo de reteica no muestra todas las operaciones?  
- ¿Cómo hacer que salgan todas las cuentas en el anexo de retención?  
- Los anexos no muestran la información completa
- Tengo problemas con las bases de retención y reteica 
- ¿Cómo solucionar que no salgan todas las cuentas en el anexo de retención? 
- ¿Qué hacer si el anexo de retención no muestra las notas de devolución en ventas?
- ¿Qué hacer si en el anexo de retención no salen todas las operaciones?

---

### ¿Cómo calcular impuestos automáticamente en ContaPyme?  

**Respuesta:**  
En **ContaPyme**, el cálculo automático de impuestos (IVA, retenciones, reteica, etc.) permite que el sistema determine de forma inmediata el valor del impuesto o retención aplicable al registrar una operación, evitando cálculos manuales y reduciendo errores.  
Para que esto funcione correctamente, es **imprescindible configurar previamente la información tributaria** de la empresa, de los terceros y de los conceptos contables que se usan en cada operación.  

**📌 Configuraciones básicas necesarias:**  
1. **Clasificación tributaria de la empresa:**  
   - Define si la empresa es régimen común, simplificado, gran contribuyente, autorretenedor, etc.  
   - Ruta: **Pestaña Básico > Explorador de empresa > Modificar empresa > Clasificación tributaria**.  

2. **Clasificación tributaria del tercero:**  
   - Establece el régimen y condiciones fiscales del cliente o proveedor (afecta el cálculo de impuestos y retenciones).  
   - Ruta: **Pestaña Básico > Catálogo de terceros > Modificar tercero > Clasificación tributaras**.  

3. **Configuración del concepto de liquidación:**  
   - En el concepto de ingreso o egreso, especifica el impuesto/retención aplicable, el porcentaje y la base mínima. ContaPyme por defecto incluye un listado completo de todos los tipos de conceptos que pueden existir, sin embargo, podrás verificar que la configuración sea la adecuada para tu empresa.
   Además puedes añadir condiciones avanzadas dentro de estos.
   - Ruta: **Pestaña Contabilidad > Desplegar botón del Catálogo de Plan de cuentas > Conceptos de liquidación en ingreso / egreso**.  

4. **Configuración de la cuenta contable:**  
   - La cuenta asociada del gasto o del ingreso debe tener asociado correctamente el concepto de liquidación para que el sistema interprete cuáles impuestos se deben imputar cuando se utilice esa cuenta específica.  
   - Ruta: **Catálogo de cuentas > Modificar cuenta > impuestos, descuentos y cargos**.  

**✅ Ejemplo 1:** *Cálculo automático de IVA en una venta*  
- Empresa: Régimen común. Responsable de IVA.  
- Concepto: Venta de mercancía con IVA 19%.  
- Cuenta contable: Configurada con IVA 19%.  
- **Resultado:** Al registrar la factura, el sistema calcula y registra automáticamente el IVA en la cuenta correspondiente.  

**✅ Ejemplo 2:** *Cálculo de retención en la fuente en un pago a proveedor*  
- Empresa: Agente de retención.  
- Proveedor: No autorretenedor.  
- Concepto: Servicio gravado al 10% de retención.  
- Cuenta contable: Marcada con el concepto de retención y base mínima $142.000.  
- **Resultado:** Si el valor supera la base mínima, el sistema descuenta automáticamente la retención al registrar el comprobante de egreso.  

**✅ Ejemplo 3:** *Reteica en una venta*  
- Empresa: Obligada a reteica.  
- Cliente: Régimen común.  
- Concepto: Venta de servicio con reteica 8 x 1000.  
- Cuenta contable: Configurada con reteica correspondiente a la ciudad.  
- **Resultado:** El sistema liquida automáticamente el reteica y lo registra en la cuenta configurada.  

❌ **Errores comunes que impiden el cálculo automático:**  
- Empresa o tercero sin clasificación tributaria asignada.  
- Concepto de liquidación mal configurado o con condiciones avanzadas que no aplican.  
- Cuenta contable sin conceptos de liquidación asignados.
- Base mínima mal configurada (más alta o baja de lo que corresponde).  
- Usar conceptos diferentes a los configurados para impuestos.  

**💡 Recomendaciones para un cálculo correcto:**  
- Configura primero los **catálogos principales** (empresa, terceros, conceptos, cuentas) antes de registrar operaciones.  
- Haz una **prueba con una factura de ejemplo** para validar que el cálculo se haga automáticamente.  
- ContaPyme actualiza constantemente las bases mínimas y las tarifas de impuestos, sin embargo, es importante que revises que tu sistema esté siempre actualizado para garantizar la consistencia de la información y estar al día con los cambios normativos.
- Si cambias una configuración, revisa los documentos ya registrados para ajustarlos si es necesario.  
- Utiliza **conceptos específicos** para operaciones gravadas y exentas, así evitas confusiones.  

**👉 Nota importante:**  
Si después de configurar todo el cálculo automático sigue sin funcionar, revisa que la cuenta contable esté correctamente parametrizada y que el tercero y la empresa tengan datos tributarios completos. Muchas veces el problema se debe a que falta marcar una casilla o seleccionar un régimen en el catálogo de terceros.  

**También aplica si preguntas:**  
- ¿Por qué no se calculan las retenciones automáticamente en ContaPyme?  
- ¿Cómo hacer que el IVA se calcule solo?  
- ¿Qué debo configurar para que el sistema liquide reteica?  
- ¿Cómo funciona el cálculo automático de impuestos?  

**Recursos adicionales:** 
- [Video: Cálculo automático de impuestos](https://www.youtube.com/watch?v=4Ntl1p9jhrc)  

---