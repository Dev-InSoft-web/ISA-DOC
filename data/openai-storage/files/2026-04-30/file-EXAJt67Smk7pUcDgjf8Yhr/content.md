# pf_contabilidad.md
> **Propósito:** Reunir las preguntan frecuentes del módulo **Contabilidad**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntan frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.1  
> **Fecha creación:** 2025/11/14


## Informes contables, estados financieros, libros legales y movimientos auxiliares de cuentas

### ¿Cómo se genera un auxiliar de cuentas contables para saber cuánto ha facturado cada cliente en el año?  

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo obtengo un informe de ventas por cliente desde contabilidad?  
- ¿Dónde veo el detalle de ingresos por tercero?  
- ¿Qué reporte me muestra cuánto le vendí a un cliente en el año?  
- ¿Cómo se genera un auxiliar de cuánto ha facturado cada tercero en el año?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En el módulo de **Contabilidad** puedes usar el informe de **consulta de movimiento de cuentas auxiliares** para conocer el detalle de los movimientos registrados en una o varias cuentas contables, filtrando por tercero y por rango de fechas. Así podrás ver cuánto ha facturado cada cliente en el año.  

1. Ingresa a la **Ruta**:  
   **[Cinta de opciones > Pestaña Contabilidad > Informes > Otros reportes contables > consulta de movimiento de cuentas auxiliares]**.  

2. En la ventana del informe, define:  
   - **Cuenta inicial y final:** selecciona la(s) cuenta(s) de ingresos por ventas que uses para facturación (por ejemplo, `4135 - Ventas`).  
   - **Tercero inicial y final:** selecciona el cliente específico o deja el rango vacío para todos los clientes.  
   - **Fecha inicial y final:** establece desde el 1 de enero hasta el 31 de diciembre del año que quieras consultar.  
   - **Centro de costos** *(opcional)*: filtra por área o proyecto si lo manejas.  

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Pantalla donde seleccionas el informe de consulta de movimiento auxiliar de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/ruta_auxiliar_cuentas.png)  

3. Haz clic en **Generar informe**.  
   El sistema mostrará el detalle de todos los movimientos de la cuenta, discriminados por tercero, con columnas de débito, crédito y saldo.  
   💡 Recuerda que puedes hacer drill down a cada uno de los movimientos que visualizas en el informe, bastará con dar doble clic sobre la operación o usar la opción: clic derecho > ver / modificar operación.

4. Para ver el total facturado por cliente:  
   - ContaPyme® **agrupará automáticamente por tercero** para que puedas visualizar fácilmente los valores correspondientes a las facturas de venta para cada uno de tus clientes.

👉 Este informe no solo sirve para facturación; también puedes aplicarlo a cuentas de cartera, bancos u otros conceptos que quieras analizar por tercero. 

💡 No olvides que todos los informes los puedes exportar a excel.

#### 📌 Recursos adicionales   
-[Video: Generar informe de consulta de movimiento auxiliar de cuentas](https://www.youtube.com/watch?v=DEUTzgbF1fo&t=80s)  

---

### ¿Cómo sacar un informe de compras de un proveedor?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo obtengo un listado de compras hechas a un proveedor?  
- ¿Dónde veo las compras que le hice a un tercero?  
- ¿Qué reporte me muestra cuánto le compré a un proveedor en el año?  
- ¿Cómo generar un reporte de compras?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En **ContaPyme**, las compras que realizas a un proveedor quedan registradas en las cuentas de gastos o cuentas por pagar, y puedes consultarlas desde el módulo de **Contabilidad** usando el informe de consulta de **movimiento cuentas auxiliares** o desde el módulo de **Cartera y proveedores** con el informe de **Consulta de saldos de cuentas por pagar**.  

**Opción 1: Desde Contabilidad – Consulta de movimiento de cuentas auxiliares**  

1. Ingresa a la **Ruta**:  
   **[Cinta de opciones > Pestaña Contabilidad > Informes > Otros reportes contables > consulta de movimiento de cuentas auxiliares]**.  

2. En la ventana del informe, define:  
   - **Cuenta inicial y final:** selecciona las cuentas de proveedores, inventario, costo o gasto donde se contabilizan las compras (por ejemplo, `1435 - Mercancías no fabricadas` o `2205 - proveedores nacionales`).  
   - **Tercero inicial y final:** selecciona el proveedor específico que te vende los productos o deja el rango vacío para todos los proveedores.  
   - **Fecha inicial y final:** establece el periodo que quieres analizar.

   💡 Recuerda que puedes usar filtros avanzados. Por ejemplo, en el campo Filtro, adiciona "Tipo de documento Cód." igual a 110 - Factura de compra. De esta forma, podras filtrar sólo por el tipo de documento de soporte seleccionado y ContaPyme te mostrará todos los movimientos asociados a las facturas de compra independientemente de la cuenta, el tercero, etc.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
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

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
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

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Pantalla donde seleccionas el informe de consulta de movimiento auxiliar de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/ruta_consulta_saldos_cxp.png)

3. Genera el informe para obtener todas las facturas de compra a crédito, el plazo de cada una y sus valores respectivo.  
- Plus: También podrás ver el plazo y vencimiento de las cuotas de cada una de las facturas por referencia (número de factura) y por proveedor. Esto es importante, ya que esta información no puedes visualizarla en las opciones anteriores.

👉 Con cualquiera de estas opciones podrás ver el **detalle de las compras**, ya sea desde la perspectiva contable o desde la gestión de cuentas por pagar a proveedores.  ContaPyme cuenta con gran cantidad de informes, consultas y exploradores, en los cuales podrás visualizar la información de diferentes formas. Es importante que revises todas las opciones y valides cuáles se acomodan mejor a tus necesidades específicas.

#### 📌 Recursos adicionales  
- [Video: Generar informe de consulta de movimiento auxiliar de cuentas](https://www.youtube.com/watch?v=DEUTzgbF1fo&t=80s)  
- [Video: Generar reporte de facturas de compra](https://www.youtube.com/watch?v=BqpJT1CeE1c&t=301s)  
- [Video: Generar informe de consulta de saldos de cuentas por pagar](https://www.youtube.com/watch?v=dtFxJw8qAVQ&t=207s)  


---

### ¿Cómo generar un reporte de cuentas por cobrar?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Dónde veo qué clientes me deben y cuánto?  
- ¿Cómo puedo consultar la cartera vencida?  
- ¿Qué reporte muestra los saldos pendientes de los clientes?  
- ¿Cómo generar un reporte de cuentas por cobrar de clientes activos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
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

#### 📌 Recursos adicionales  
- [Video: Generar explorador de cuentas por cobrar](https://www.youtube.com/watch?v=XndbK9Rruy0)  
- [Video: Generar consulta de cuentas por cobrar por edades (lección 1/2)](https://www.youtube.com/watch?v=JNq1gaJjN_w)  
- [Video: Generar consulta de cuentas por cobrar por edades (lección 2/2)](https://www.youtube.com/watch?v=v4Sqybw49dI&t=320s) 
- [Video: Generar reporte de movimiento de cuentas por cobrar](https://www.youtube.com/watch?v=G0mua47YCJM)  


---

### ¿Cómo generar informes comparativos?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo hago un comparativo de cuentas entre dos periodos?  
- ¿Dónde veo una tabla comparativa de ingresos y gastos?  
- ¿Qué informe me muestra variaciones entre meses?  
- ¿Cómo comparo un estos de resultados con el mes pasado?
- ¿Cómo generar balances bimestrales comparativos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
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

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Pantalla donde exploras las gráficas que puedes generar con las tablas comparativas de ContaPyme (podrás generar gráficos comparando cuentas y años)](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/graficas_tablas_comparativas.png)   

4. **Opciones adicionales:**  
   - **Drill down:** haz doble clic sobre un valor para abrir el detalle y ver los documentos que componen el saldo de la cuenta.
   - **Exportar a Excel** para análisis más avanzados.  
   - Filtrar por tercero o documento para comparativos específicos.  

👉 Este informe es clave para tomar decisiones estratégicas, ya que combina datos resumidos, opciones gráficas y navegación al detalle de la información.  


---

### ¿Cómo visualizar el movimiento contable de una operación?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo ver el asiento contable de una factura?  
- ¿Dónde consulto las cuentas afectadas por un documento?  
- ¿Qué operación me permite ver débitos y créditos de un registro?  
- ¿Cómo visualizo el movimiento contable de una operación en ContaPyme?
- ¿Cómo consultar el movimiento contable de unos documentos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En **ContaPyme** puedes revisar el detalle de los débitos y créditos que generó una operación utilizando dos herramientas principales: el **Inspector** en el manejador de operaciones, en el **explorador de contabilidad** o en el informe de **Movimiento contable**.  

**Opción 1: Inspector de operaciones**  
Permite ver el movimiento contable de manera inmediata desde la misma operación, sin salir del manejador de operaciones.

1. Ubícate en el manejador de operaciones sobre el registro que deseas revisar (factura, recibo, nota, etc.) 
2. Haz clic en el botón **Inspector** (botón ubicado en la parte superior del manejador de operaciones) 

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
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

#### 📌 Recursos adicionales  
- [Video: Generar Explorador de contabilidad](https://www.youtube.com/watch?v=8mTDTTON7co)
- [Video: Generar informe de movimiento contable de las operaciones](https://www.youtube.com/watch?v=Zgmxz3jmFNU&t=109s)



---

### ¿Cómo visualizar los informes separados en miles de pesos?  

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo muestro un balance en miles de pesos?  
- ¿Dónde activo que los informes se vean en miles?  
- ¿Cómo ver un estado de resultados sin tantos ceros?  
- ¿Por qué los informes no están separados por miles de pesos?
- ¿Cómo configurar la separación de miles en los informes, anexos o reportes? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En **ContaPyme**, al generar informes financieros o contables, puedes activar la opción para que los valores se muestren en **miles de pesos**, lo cual facilita la lectura cuando se manejan cifras grandes.  

**Pasos para activarlo:**  
1. Ingresa al informe que deseas generar (por ejemplo, **Balance general**, **Estado de resultados**, **Movimiento auxiliar de cuentas**, etc.).  
2. Antes de generar el informe, ubica las **opciones de configuración** que aparecen en la ventana previa.  
3. Marca la casilla **"Mostrar valores en miles"**.  
4. Genera el informe y notarás que todos los valores estarán divididos entre 1.000, conservando la precisión de los totales.  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Pantalla de opciones de un informe financiero con la casilla “Mostrar valores en miles” marcada](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/mostrar_valores_miles.png)

💡 **Tip:** Esta opción es solo de visualización. El sistema no modifica la información contable registrada, únicamente adapta el formato del reporte para facilitar el análisis.  



---


### ¿Cómo generar un balance de prueba o mayor y balances con terceros?

En ContaPyme, el balance de prueba se denomina Mayor y Balances. Este informe permite analizar los saldos contables de las cuentas, ya sea de manera general o desglosado por terceros y centros de costos. 

Es una herramienta clave para la revisión contable y financiera de la empresa y se puede generar con diferentes niveles de detalle y formatos según las necesidades del usuario. Permite un análisis detallado de cada cuenta contable y facilita la revisión de movimientos por terceros y centros de costos.

-Consulta rápida dentro del sistema
-Formato tipo impresión para documentos oficiales
-Desglose por centros de costos
-Inclusión o exclusión de terceros

**1. ¿Cómo generar Mayor y Balances?**
Pasos para generarlo: 
accede a la ruta: Contabilidad → Informes → Libros legales → Mayor y Balances

-Selecciona el rango de fechas para el informe.
-Elige el nivel de detalle: general, por cuenta, por centro de costos, con o sin terceros.
-Decide el formato: consulta (permite auditar la información) o impresión (listo para presentar)
-Genera el informe y revisa los saldos y movimientos contables.

**2. Generar balances comparativos**
En ContaPyme también se pueden generar balances comparativos, útiles para analizar tendencias contables y financieras entre períodos.

Pasos para generarlo: 
accede a la ruta: Contabilidad → Tablas comparativas → Mayor y Balances

-Selecciona el rango de fechas para incluir los años a comparar.
-Escoge si deseas incluir terceros o centros de costos.
-Genera la tabla comparativa para visualizar variaciones y tendencias.

**Recomendaciones:**
-💡 Utiliza balances comparativos para analizar tendencias y evaluar desempeño financiero.
-💡 Antes de imprimir, revisa la configuración de fechas y filtros para asegurar que los datos sean completos.
-💡 Genera reportes por centros de costos para un análisis más detallado.
-💡 Revisa la información de terceros si necesitas conciliaciones o reportes detallados por cliente o proveedor.

#### 📌 Recursos adicionales
- [Video: ¿Cómo generar un mayor y balances de consulta?](https://www.youtube.com/watch?v=4S7WKyLpjLA)  

#### Variantes de la pregunta (aplicación canónica):
“¿Dónde puedo generar el balance de prueba en ContaPyme?”
“¿Cómo ver saldos por terceros en mayor y balances?”
“¿Cómo hacer comparativos de balances entre períodos?”
“¿Puedo imprimir el balance de mayor por centro de costos?”

---

### ¿Por qué tengo diferencias entre saldos de contabilidad y cartera?
Los módulos de Contabilidad y Cartera están diseñados para trabajar de manera sincronizada, por lo que no deberían existir diferencias entre los saldos.

Si se presentan discrepancias, lo más probable es que se deba a inconsistencias en la generación de informes, diferencias en los filtros aplicados o el tipo de transacción seleccionada al comparar los datos entre ambos módulos.

**Posibles causas de las diferencias**
-Filtros distintos en los informes
-Al generar los reportes de contabilidad y cartera, pueden aplicarse rangos de fechas o tipos de transacción diferentes, lo que genera diferencias aparentes.
-Transacciones pendientes o incompletas
-Errores en la parametrización de cuentas

⚠️ revisa los filtros aplicados al generar ambos informes y asegurarse de que sean equivalentes.

**Recomendaciones:**
💡 Antes de generar informes comparativos, verifica que los filtros de fecha y tipo de transacción sean los mismos.
💡 Ante cualquier inconsistencia, contacta al equipo de soporte para apoyarte en la revisión.
💡 Revisa la información contable a través del informe de mayor y balances o movimiento de cuentas auxiliares, lo cual te ayudará a validar la información relacionada a tus cxc y cxp.

#### 📌 Recursos adicionales
- [Video: ¿Cómo generar la consulta de mayor y balances?](https://www.youtube.com/watch?v=4S7WKyLpjLA)  
- [Video: ¿Cómo generar la consulta de movimiento de cuentas auxiliares?](https://www.youtube.com/watch?v=DEUTzgbF1fo) 

#### Variantes de la pregunta (aplicación canónica):
-“¿Por qué los saldos de cartera no coinciden con contabilidad?”
-“¿Cómo conciliar diferencias entre contabilidad y cartera?”



---

## Cierres contables

### ¿Cómo realizar el cierre de fin de año?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo cerrar contablemente un año en ContaPyme?  
- ¿Qué pasa con las cuentas de ingresos y gastos al cerrar un año?  
- ¿Cómo se refleja la utilidad del ejercicio en los estados financieros?  
- ¿Cómo realizar el cierre de año si hay documentos que no lo permiten?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
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
1. Asegúrate de que todos los documentos y comprobantes del año estén contabilizados, revisados y procesados en el manejador de operaciones ya que el sistema no permitirá continuar con el cierre si todas las operaciones no se encuentran procesadas (incluidas las operaciones anuladas).

💡 **Tip:** Antes de ejecutar el cierre definitivo, puedes utilizar el filtro de "operaciones no procesadas" en el manejador de operaciones; de esta forma, sabrás si tienes ajustes pendientes o que necesites anular o eliminar respectivamente.

 La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Pantalla donde seleccionas el filtro de operaciones no procesadas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/filtro_noprocesadas.png) 

2. Realiza conciliaciones y verifica que no existan cuentas pendientes de ajuste.  Recuerda que este será el último procedimiento que realizarás en el año, por lo tanto, te sugerimos que concilies todas las cuentas a las que haya lugar y realiza los ajustes pertinentes cuando aplique.

3. Ruta: **[Manejador de operaciones > Contabilidad > Cierre de fin de año]**.  
4. Indica el año que deseas cerrar.
5. Ejecuta el cierre y guarda la copia de seguridad generada por el sistema.   

👉 - **Después de cerrar el año**, no podrás registrar, modificar, ni eliminar movimientos contables en ese periodo.  
👉 No se recomienda reprocesar cierres de fin de año ya que esto podría ocasionar variaciones en las cifras de los estados financieros. 
👉 - Si necesitas hacer ajustes después del cierre, deberás **reabrir el año** (esto solo lo debe hacer un usuario administrador y con precaución) En caso de que requieras realizar ajustes en tu contabilidad, ten presente cuáles fueron los resultados obtenidos antes y después de realizar las modificaciones.
👉 **Respalda tu base de datos** antes y después de ejecutar el cierre, por si necesitas restaurar información.  
👉 **Revisa el estado de resultados** después de ejecutar el cierre para verificar que efectivamente todas las cuentas de resultados fueron saldadas.

#### Recursos adicionales  
- [+Info: Cierre de fin de año](https://www.contapyme.com/conocimientocontapyme/contabilidad/AD_Opr_cierre_fin_anio.HTML)
- [Video: Cierre de fin de año](https://www.youtube.com/watch?v=Wy-FcKDpeEM) 
- [Video: Parametrización de las acciones de Cierre de fin de año](https://www.youtube.com/watch?v=GPdUlStEPiU) 


---

### ¿Cómo realizar el cierre de mes?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo bloqueo meses en ContaPyme?  
- ¿Cómo generar automáticamente los asientos de fin de mes?  
- ¿Qué es el cierre de mes y para qué sirve en ContaPyme?  
- ¿Cómo realizar un cierre de mes para que no se pueda modificar la información? 
- ¿En contapyme se pueden cerrar los meses? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
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

#### 📌 Recursos adicionales  
- [+Info: Acciones automáticas de fin de mes]
- [Video: Operación de acciones automáticas de fin de mes](https://www.youtube.com/watch?v=e3ubskWCe94)  
- [Video: Cierre definitivo de mes en ContaPyme](https://www.youtube.com/watch?v=f9Tz8fSVGPg) 


---

### ¿Se pueden elaborar registros contables en el 2025 sin haber cerrado el año 2024? 

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Es obligatorio cerrar un año para iniciar el siguiente en ContaPyme?  
- ¿Qué pasa si no he hecho el cierre de 2024 pero necesito registrar en 2025?  
- ¿Puedo trabajar en dos años contables al mismo tiempo? 
- ¿Es posible iniciar 2025 sin terminar de alimentar 2024 colocando saldos manualmente? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
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



---

## Impuestos, anexos y certificados tributarios

### ¿Cómo corregir problemas con el valor base o información faltante en los anexos de retención, IVA y reteica?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

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
- ¿Cómo validar las bases de los anexos y certificados?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
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
   - Posiblemente la cuenta del impuesto o retención no tenga correctamente parametrizado el atributo de "exige valor base", lo cual impide obtener dicha información. 
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


---

### ¿Cómo generar un anexo de iva o de retención?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Dónde saco el anexo de IVA?  
- ¿Cómo generar el anexo de retenciones?  
- ¿Qué informe sirve como soporte de impuestos?  
- ¿Por qué el IVA o las retenciones no me cuadran?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En **ContaPyme**, tanto el **anexo de IVA** como el **anexo de retenciones** se generan a partir de la información contable registrada en el sistema, por lo que es clave que los documentos del periodo estén correctamente contabilizados.

Para generar un **anexo de IVA o de retención** en ContaPyme, ten en cuenta el siguiente proceso:

1. **Validar la información del periodo**
   Antes de generar el anexo, verifica que:
   - Todas las **facturas de venta y compra** estén registradas
   - Los documentos estén **contabilizados**
   - Las cuentas de **IVA** y/o **retenciones** (fuente, ICA, IVA, etc.) estén correctamente configuradas.

2. **Ingresar al módulo de Contabilidad**
   Dirígete al módulo **Contabilidad** y accede a sección de informes > certificados > anexos.

3. **Generar el informe correspondiente**
   Desde los informes podrás obtener:
   - **Anexo de IVA**: Detalle de bases gravables, valores de IVA generado y descontable, terceros y documentos origen.
   - **Anexo de retenciones**: Detalle de retenciones practicadas o asumidas, por tipo de retención, tercero y documento.

   Estos informes funcionan como el **anexo o soporte** para la revisión y presentación de impuestos.

4. **Filtrar por periodo y cuentas**
   Aplica filtros por:
   - Fecha o periodo contable
   - Tipo de impuesto
   - Cuenta contable o tercero  
   
   Esto te permitirá obtener un anexo claro y preciso.

5. **Exportar el anexo**
   Los informes se pueden:
   - Visualizar en pantalla
   - Exportar a **Excel o PDF**, según lo necesites

💡 **Importante:**  
ContaPyme construye estos anexos con base en la **contabilidad**, por lo que cualquier diferencia en documentos, fechas o cuentas se reflejará directamente en el resultado del informe.


⚠️ **Alcance del informe:**  
Los anexos de IVA y retenciones permiten consultar información por periodo, cuenta contable, tercero y tipo de impuesto; sin embargo, **no se generan discriminados por centro de costos**.  
Si se requiere revisar información contable asociada a centros de costos, debe validarse mediante los informes contables correspondientes, pero no desde el anexo tributario de IVA o retención.


#### 📌 Recursos adicionales   
-[Video: ¿Cómo generar Anexos tributarios en ContaPyme?](https://www.youtube.com/watch?v=teKB2D7ny0k)  


---



### ¿Cómo calcular impuestos automáticamente en ContaPyme?  

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no se calculan las retenciones automáticamente en ContaPyme?  
- ¿Cómo hacer que el IVA se calcule solo?  
- ¿Qué debo configurar para que el sistema liquide reteica?  
- ¿Cómo funciona el cálculo automático de impuestos?  
- ¿Cómo revisar el cálculo de IVA e impuestos en operaciones de ingreso o egreso?
- ¿Cómo configurar las retenciones para que se calculen automáticamente??
- ¿Cómo configurar las autorretenciones y retenciones para que se calculen automáticamente?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
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

#### 📌 Recursos adicionales 
- [Video: Cálculo automático de impuestos](https://www.youtube.com/watch?v=4Ntl1p9jhrc)  


---


## Configuración del módulo

### ¿Cómo configurar la contabilización de las facturas de venta?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo realizar facturas de venta por la operación de movimiento contable?   
- ¿Cómo facturar servicios sin módulo de inventarios?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
La contabilización de las facturas de venta en ContaPyme depende del **módulo desde el cual se genera la factura**. Aunque esta pregunta se está consultando desde el módulo de **Contabilidad**, normalmente las facturas se crean en el **módulo Facturador** o de **Inventarios**, donde existen configuraciones específicas para realizar este tipo de transacciones en el sistema.

**Escenarios posibles:**

1. **Desde el módulo de automatización de documentos (operación de ingresos):**  
   - Utilizada comunmente para facturar **servicios**.  
   - Solo solicita la **cuenta de ingresos** y el **valor de la venta**.  
   - No requiere configuraciones adicionales, basta con usar una cuenta del PUC previamente creada con los impuestos asociados.   

   ✅ Ejemplo: Usar la cuenta `4135xx` para ingresos por servicios y aplicar IVA según la configuración de la cuenta.

2. **Desde la operación de movimiento contable:**  
   - Permite registrar la factura manualmente indicando **débitos y créditos**.  
   - Requiere conocimiento contable, ya que debes definir las cuentas afectadas (clientes, ingresos, impuestos).  
   - **Limitación:** No sirve para facturación electrónica ni para control de inventarios.  
   - Se utiliza cuando la empresa solo lleva contabilidad y no necesita emitir factura electrónica.  

   ✅ Ejemplo:  
   - Débito: `1305xx` (Clientes)  
   - Crédito: `4135xx` (Ingresos)  
   - Crédito: `2408xx` (IVA por pagar)

3. **Desde la operación de facturación y ventas (módulo Facturador o Inventarios):**  
   - Es la opción más usada para empresas que manejan productos o facturación electrónica.  
   - **Requiere configuraciones esenciales:**  
     - Crear el **elemento de inventario**.  
     - Configurar el **grupo de inventario** con sus cuentas contables (ingresos, costos, IVA).  
     - Parametrizar la **operación de facturación y ventas**.  

   👉 Para más detalles, consulta las **preguntan frecuentes del módulo de Inventarios**, ya que las configuraciones adicionales dependen directamente de ese módulo.


---


### ¿Cómo crear, modificar o desactivar cuentas en el PUC?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo crear nuevas cuentas en ContaPyme?
- ¿Cómo modificar cuentas del PUC?
- ¿Cómo adicionar cuentas al PUC?
- ¿Qué debo hacer si ya no quiero usar una cuenta del PUC?
- ¿Cómo se crean las subcuentas o cuentas auxiliares?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE --> 
Para gestionar cuentas en el **PUC (Plan Único de Cuentas)** en ContaPyme, dirígete a la siguiente ruta:

**Contabilidad > Plan de cuentas > Utiliza la opción requerida (Crear / modificar / eliminar)**
Desde este catálogo podrás administrar las cuentas contables según la necesidad.

#### Acciones disponibles

**1. Crear una cuenta**  
- Ingresa al catálogo de plan de cuentas.  
- Selecciona la opción para **crear una nueva cuenta**. (ubicada en la parte superior izquierda o da clic derecho > crear)
- Define la estructura: código, nombre, naturaleza, nivel y demás configuraciones requeridas.  

**2. Modificar una cuenta**  
- Ubica la cuenta que deseas editar.  
- Realiza los ajustes necesarios (nombre, configuración, datos requeridos, etc.).  
- Guarda los cambios.  

**3. Desactivar una cuenta**  
- Selecciona la cuenta correspondiente.  
- Si el sistema lo permite, procede a **eliminarla**. 
- Ten en cuenta que las cuentas que han sido utilizadas en catálogos o transacciones **no pueden eliminarse**, por lo que se recomienda desactivarlas en lugar de eliminarlas. 
- Para desactivarlas puedes desmarcar la opción "visible en selección", de esa forma ya no estará visible en el catálogo ni al crear nuevas operaciones pero no será eliminada completamente para garantizar su trazabilidad.

#### Recomendaciones
 
- ✅ Mantén una estructura organizada del PUC para facilitar reportes y validaciones.  
- ✅ Revisa las configuraciones que aplicarás a la cuenta, pues de ello depende su funcionamiento.

#### 📌 Recursos adicionales
- [Video: Cómo crear una cuenta contable](https://www.youtube.com/watch?v=ShQdU3ZR_1w&t=119s)
- [Video: Cómo eliminar una cuenta contable](https://www.youtube.com/watch?v=ZDCrKx-OYug)
- [Video: Acciones básicas sobre una cuenta contable](https://www.youtube.com/watch?v=pZzncGWkq08&t=114s)


---


### ¿Cómo asociar las cuentas contables por defecto en las operaciones del sistema?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

-¿Dónde se configuran las cuentas contables por defecto?
-¿Cómo definir cuentas contables automáticas en el sistema?
-¿Cómo asignar cuentas contables predeterminadas?
-¿Cómo parametrizar las cuentas contables por defecto?
-¿Dónde asigno las cuentas contables en cada proceso?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE --> 
La asociación de **cuentas contables por defecto** en ContaPyme **depende del módulo** en el que se esté trabajando, ya que cada proceso del sistema maneja su propia configuración a través de catálogos específicos.

No existe una única ruta general, sino que la configuración se realiza según el origen de la operación.

#### Ejemplos según el módulo

- 📦 **Inventarios**:  
  Las cuentas se configuran en las **bodegas** y en los **grupos de inventario**.

- 👥 **Nómina**:  
  Se definen en el **catálogo de conceptos de nómina**, donde cada concepto tiene asociadas sus cuentas contables.

- 🏢 **Activos fijos**:  
  Se configuran en los **grupos de activos**, donde se establecen las cuentas para depreciación, ajustes, entre otros.

- 📊 **Contabilidad**:  
  Se manejan en el **catálogo de conceptos de liquidación**, según el tipo de operación contable. 

#### Recomendación

- ⚠️ Para darte una guía precisa, es necesario identificar **qué operación o módulo deseas configurar**.  
- ✅ Indica si se trata de inventarios, nómina, activos fijos u otro proceso, para proporcionarte la **ruta exacta y pasos específicos** según tu caso.

#### Recursos adicionales
- [Video: Cómo crear una cuenta contable](https://www.youtube.com/watch?v=ShQdU3ZR_1w&t=119s)
- [Video: Cómo eliminar una cuenta contable](https://www.youtube.com/watch?v=ZDCrKx-OYug)
- [Video: Acciones básicas sobre una cuenta contable](https://www.youtube.com/watch?v=pZzncGWkq08&t=114s)


---

## Cargue inicial de saldos 
### "¿Cómo realizar cargues iniciales de cuentas?"

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En **ContaPyme**, el cargue inicial de saldos es la operación que permite registrar en el sistema los saldos provenientes de una contabilidad previa. Su objetivo es dejar establecidos los valores existentes en cada cuenta **a una fecha determinada**, tanto para cuentas de balance como para cuentas de resultado, según el momento del cargue.

Si el cargue inicial se realiza a **31 de diciembre o 1 de enero**, se deben registrar únicamente las **cuentas de balance**, pues la utilidad del ejercicio ya está determinada.  Sin embargo, si el cargue se realiza en **una fecha diferente**, será necesario incluir también las **cuentas de resultados**.

Esta operación se realiza utilizando el **tipo de documento 990 – Cargue inicial**, el cual permite guardar el documento descuadrado inicialmente, ya que la contrapartida se completará cuando se realicen los cargues iniciales de inventarios, activos fijos, cuentas por cobrar y cuentas por pagar.

Además, esta es la **única operación que no afecta simultáneamente la contabilidad Local y NIIF**, por lo que se debe **duplicar la transacción**, dejando una versión en Local y otra en NIIF para garantizar que los informes de ambas normas queden alineados.

**Pasos para realizar un cargue inicial:**

1. Definir la fecha del cargue.
2. Preparar los saldos:
   - Solo balance (31/12 o 01/01).
   - Balance + resultados (otras fechas).
3. Registrar el documento **990 – Cargue inicial** en la operación de cargue inicial de cuentas.
4. Ingresar los saldos aun si el documento queda descuadrado.
5. Completar la contrapartida cargando:
   - Inventarios.
   - Activos fijos.
   - Cuentas por cobrar.
   - Cuentas por pagar.
   - Patrimonio.
6. Duplicar el documento y modificar el tipo de contabilización para Local/NIIF. Esto ya que la operación de cargue inicial sólo mueve uno de los dos tipos de contabilizaciones y para que el registro quede en ambas opciones será necesario duplicar la operación.
7. Verificar informes: balance general y NIIF vs Local.

Nota relevante: Es importante tener en cuenta que después de cargar todos los saldos, la contabilidad debe quedar correctamente cuadrada, es decir, que se cumpla la ecuación patrimonial Activo = pasivo + patrimonio.


#### 📌 Recursos adicionales
- [Video: Cómo realizar un cargue inicial en ContaPyme](https://www.youtube.com/watch?v=mGbY3En5wW4)
- [Video: Ejemplo de un cargue inicial](https://www.youtube.com/watch?v=wRvp0ykYF80)

#### Variantes de la pregunta (aplicación canónica):
- Inicié una empresa y necesito cargar la información de las cuentas
- ¿Cómo subir los saldos iniciales en ContaPyme? 
- ¿Cómo cargar saldos en Local y NIIF?

---

### "¿Qué hacer si tengo diferencias entre la contabilización local y la contabilización NIIF?"

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  

Si identificas diferencias entre la contabilización local y la NIIF, generalmente se debe a **inconsistencias en el registro inicial o en la configuración de cuentas**.

Esto puede ocurrir por:

- **Cargue inicial no duplicado**: el cargue inicial es la única operación que **no afecta simultáneamente ambas contabilizaciones**. Por lo tanto, debe registrarse dos veces: una para **local** y otra para **NIIF**.  
- **Configuración incorrecta de cuentas**: algunas cuentas pueden no estar correctamente asociadas o no tener definida su **equivalencia NIIF**, lo que genera diferencias en los movimientos.  

**¿Cómo validarlo y solucionarlo?**
**1.** Verifica si el **cargue inicial fue duplicado correctamente**:  
Asegúrate de que exista un registro para local y otro para NIIF.

**2.** Revisa la **configuración de cuentas**:  
Confirma que todas las cuentas estén correctamente configuradas tanto en contabilidad local como en su equivalente NIIF.

**3.** Utiliza el **Explorador de contabilidad**:  
Activa las columnas **“Cnt. Local”** y **"Cnt.NIIF”** para identificar fácilmente qué movimientos están registrados en cada tipo de contabilización.
También puedes usar el tipo de vista del informe en la parte superior para visualizar fácilmente los movimientos en local o en NIIF.

Esto te permitirá detectar:
- Movimientos registrados solo en local o solo en NIIF.  
- Inconsistencias entre ambos registros.  

**4.** Corrige los movimientos faltantes o configuraciones incorrectas para asegurar que **todas las transacciones tengan su correspondiente registro en ambas contabilizaciones**.


#### 📌 Recursos adicionales
- [Video: Cómo realizar un cargue inicial en ContaPyme](https://www.youtube.com/watch?v=mGbY3En5wW4)
- [Video: Ejemplo de un cargue inicial](https://www.youtube.com/watch?v=wRvp0ykYF80)

#### Variantes de la pregunta (aplicación canónica):
- ¿Cómo corregir diferencias entre local y en NIIF?
- ¿Qué debo revisar si tengo descuadrada la contabilidad entre local y NIIF?
- ¿Por qué no se ve reflejada la misma información en la contabilización local y en la contabilización NIIF?

---


## Operaciones contables
### ¿Cómo realizar un recibo de caja?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En **ContaPyme**, un recibo de caja se puede registrar de dos formas, dependiendo del licenciamiento y del nivel de conocimiento contable del usuario:  
1. **A través del Movimiento Contable.**  
2. **A través de la operación de Abono a Cuenta por Cobrar (CxC).**

Ambas operaciones permiten registrar ingresos de dinero y realizar abonos a múltiples terceros dentro de una misma transacción, pero funcionan de manera distinta según el objetivo y el tipo de usuario que las utilizará.

**1. Recibo de caja por Movimiento Contable**  
Esta opción está disponible en el módulo de contabilidad y es ideal para usuarios con manejo contable. (auxiliares contables y contadores)

**Pasos:**
1. Ir al **Manejador de operaciones**.  
2. Seleccionar **Operaciones de contabilidad > Movimiento contable**.  
3. En la operación, se puede cambiar el tipo de documento por **“Recibo de caja”** (debe estar previamente creado en el catálogo de tipos de documento soporte).  
4. Registrar:
   - Cuenta contable.
   - Tercero.
   - Referencia específica (si aplica).
   - Valores en débito o crédito según corresponda.
5. Guardar la operación.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Recibo de caja a través de movimiento contable](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/recibo_caja_movimientocontable.png)  

**Características:**
- Ideal si necesitas control total sobre cuentas y movimientos.  
- Para abonar a múltiples terceros: solo debes registrar cada tercero en su asiento correspondiente.

**2. Recibo de caja por Abono a Cuentas por Cobrar (CxC)**  
Disponible únicamente si tu licencia incluye el módulo de **Cartera**.  Es la opción recomendada para usuarios con **poco conocimiento contable** y para quienes deseen ahorrar tiempo en sus operaciones diarias ya que el sistema no solicita asientos débito/crédito y permite cargar rápidamente las referencias pendientes por el cliente.

**Pasos:**
1. Ingresar a la operación de **Abono a cuenta por cobrar**.  
2. El sistema sugerirá un tipo de documento soporte por defecto, pero puedes cambiarlo por **“Recibo de caja”**.  
3. Registrar:
   - Código del tercero.
   - Referencias a abonar (facturas o documentos pendientes).  
4. Guardar la operación.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Recibo de caja a través de abono a cxc](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/recibo_caja_abonocxc.png)  

**Características:**
- No solicita asientos contables manuales.  
- El sistema genera automáticamente los movimientos correspondientes.  
- Para abonos a múltiples terceros: debes habilitar la opción **“Abono a múltiples terceros”**.

**Recomendaciones:**

- 💡 Usa **Movimiento contable** si necesitas control total sobre cuentas y registros.  
- 💡 Usa **Abono a CxC** si el usuario no maneja conceptos contables complejos y para ahorrar tiempo.
- 💡 Establece tipos de documento claros para diferenciar entre ventas, recaudos y otros ingresos.  


#### 📌 Recursos adicionales
- [Video: Registro de recibos de caja a través de movimiento contable](https://www.youtube.com/watch?v=N1LU4sC5lpk&t=182s)  
- [Video: Registro de recibos de caja a través de abonos a cuentas por cobrar](https://www.youtube.com/watch?v=f2V9Ito6Kh0)  

#### Variantes de la pregunta (aplicación canónica):**
- “¿Cómo registrar dinero recibido en ContaPyme?”  
- “¿Dónde hago un recibo de caja?”  
- “¿Qué diferencia hay entre movimiento contable y abono a CxC?”  
- “¿Cómo registrar un abono a un cliente?”  

---



### ¿Cómo hago un comprobante egreso?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
El comprobante de egreso es un documento que respalda la salida de dinero de la empresa, ya sea por pagos a proveedores, gastos operativos, entre otros. Puedes utilizar un documento predefinido o crear uno nuevo según tus necesidades.

**Pasos para crear un comprobante de egreso**
**1. Recibo de caja por Movimiento Contable**  
Esta opción está disponible en el módulo de contabilidad y es ideal para usuarios con manejo contable. (auxiliares contables y contadores)

**Pasos:**
1. Ir al **Manejador de operaciones**.  
2. Seleccionar **Operaciones de contabilidad > Movimiento contable**.  
3. En la operación, se puede cambiar el tipo de documento por **“comprobante de egreso”** 
4. Registrar:
   - Cuenta contable.
   - Tercero.
   - Referencia específica (si aplica).
   - Valores en débito o crédito según corresponda.
5. Guardar la operación.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Comprobante de egreso a través de movimiento contable](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/egreso_movimientocontable.png)  

**Características:**
- Ideal si necesitas control total sobre cuentas y movimientos.  
- Para abonar a múltiples terceros: solo debes registrar cada tercero en su asiento correspondiente.

**2. Recibo de caja por Abono a Cuentas por Cobrar (CxP)**  
Disponible únicamente si tu licencia incluye el módulo de **Cartera**.  Es la opción recomendada para usuarios con **poco conocimiento contable** y para quienes deseen ahorrar tiempo en sus operaciones diarias ya que el sistema no solicita asientos débito/crédito y permite cargar rápidamente las referencias pendientes por el proveedor.

**Pasos:**
1. Ingresar a la operación de **Abono a cuenta por pagar**.  
2. El sistema sugerirá un tipo de documento soporte por defecto, pero puedes cambiarlo por **“Comprobante de egreso”**.  
3. Registrar:
   - Código del tercero.
   - Referencias a abonar (facturas o documentos pendientes).  
4. Guardar la operación.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Comprobante de egreso a través de abono a cxp](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/egreso_cxp.png)  

**Características:**
- No solicita asientos contables manuales.  
- El sistema genera automáticamente los movimientos correspondientes.  
- Para abonos a múltiples terceros: debes habilitar la opción **“Abono a múltiples terceros”**.

**Recomendaciones:**

- 💡 Usa **Movimiento contable** si necesitas control total sobre cuentas y registros.  
- 💡 Usa **Abono a CxP** si el usuario no maneja conceptos contables complejos y para ahorrar tiempo.
- 💡 Establece tipos de documento claros para diferenciar entre ventas, recaudos y otros ingresos.  

**Notas / advertencias**
-Asegúrate de que todas las cuentas y terceros estén correctamente configurados en el sistema antes de realizar el registro.
-Verifica que el comprobante esté cuadrado antes de finalizar la operación.

Ejemplo
Si realizas un pago a un proveedor por servicios técnicos, podrías registrar lo siguiente:

-Fecha: 15/02/2023
-Referencia: Pago por asesoría técnica
-Cuenta: 511035 (Servicios técnicos)
-Valor: $325.000
-Tercero: ASESORES LTDA

#### 📌 Recursos adicionales
- [Video: Registro de comprobante de egreso a través de operación de gasto](https://www.youtube.com/watch?v=QUqEB3K4HLE)  
- [Video: Registro de comprobante de egreso a través de operación de abono a cxp](https://www.youtube.com/watch?v=YFcv-2miaUI&t=73s)  
- [Video: Registro de comprobante de egreso a través de operación de movimiento contable](https://www.youtube.com/watch?v=ifsyhE_ucwQ)  


---

## Importación de movimiento externo
### ¿Cómo cargar información a ContaPyme mediante la plantilla de movimiento contable?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En ContaPyme, es posible cargar movimientos contables de manera masiva utilizando una plantilla en Excel diseñada específicamente para este propósito. Este proceso es útil para migraciones desde otros sistemas, para registrar grandes cantidades de información o para actualizar movimientos sin digitación manual.

El proceso consiste en:
1. Solicitar la plantilla al equipo de soporte. Ellos se encargarán de explicarte paso a paso cómo diligenciarla y subirla al sistema.
2. Diligenciar correctamente los campos siguiendo correctamente las instrucciones sugeridas por el equipo de soporte. Esta plantilla incluye columnas como cuenta, tercero, centro de costos, valores, naturaleza del movimiento, entre otros.
3. Importar la plantilla al sistema. Para esto, sigue la siguiente Ruta para realizar el proceso:

Botón Aplicación (logo ContaPyme) → Utilidades → Importar movimiento externo

Pasos:
-Selecciona la plantilla diligenciada y cárgala.
-Espera a que el sistema procese los registros y genere los movimientos.
-El sistema validará los datos y, si encuentra inconsistencias, mostrará advertencias sobre los registros que no pueden importarse.

4. La importación depende de que las cuentas, centros de costos y terceros estén correctamente configurados en la base de datos.

5. Verificar la importación: Una vez procesado el archivo, revisa el Manejador de operaciones para confirmar que los movimientos se hayan creado. Verifica valores, terceros, cuentas y descripciones y asegúrate de que no existan movimientos incompletos o rechazados.

**Importante:**

-La importación solo funcionará si la plantilla conserva su estructura original (nombres de columnas, orden y formato).
-Las cuentas contables deben existir y estar activas.
-Los terceros deben estar creados en el sistema.
-No dejes columnas obligatorias vacías.
-Respeta el formato de las fechas y valores.

**Casos comunes y cómo resolverlos**
⚠️ El sistema rechaza algunos registros.
Solución: revisar si la cuenta, tercero o centro de costos existe.

⚠️ La plantilla carga pero no crea operaciones.
Solución: revisar el formato de fechas o columnas modificadas.

⚠️ Importé el archivo incorrecto.
Solución: restaurar copia de seguridad (si se hizo previamente).

**Recomendaciones:**
💡 Realiza siempre una copia de seguridad antes de una carga masiva.
💡 Evita modificar nombres de columnas de la plantilla.
💡 Verifica que las cuentas usadas permitan movimientos.
💡 Si trabajas con terceros, asegúrate de que estén creados previamente.

#### Variantes de la pregunta (aplicación canónica):
- Cómo ingresar de forma masiva información contable a ContaPyme 
- Puedo subir al sistema las facturas en bloque
- “¿Cómo hacer una carga masiva contable en ContaPyme?”
- “¿Dónde importo plantillas de movimiento?”
- “¿Qué plantilla se usa para cargar movimientos externos?”
- “¿Cómo migrar información contable a ContaPyme?”
- requiero importar la información por medio de la plantilla de movmiento contable


---


## Conciliación bancaria

### ¿Cómo configurar la conciliación bancaria?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué es la conciliación bancaria y cómo activarla en contapyme?   
- ¿Cuál es la diferencia entre la conciliación manual y automática?
- ¿Cómo configurar la conciliación bancaria automática?
- ¿Qué debo tener en cuenta para configurar la conciliación bancaria?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
- **¿Cómo configurar la conciliación bancaria?**
**Respuesta:**
La conciliación bancaria es un proceso esencial para comparar los movimientos de la cuenta bancaria reflejados en el extracto bancario con los registros contables internos de la empresa, con el fin de identificar y corregir discrepancias. Permite detectar errores de digitación, faltantes o entradas de dinero no registradas, asegurando la integridad y exactitud de la información financiera de la empresa.

Para configurar la conciliación bancaria en ContaPyme, sigue estos pasos:

1. **Activa el módulo de conciliación bancaria:**
    * Entra a Contabilidad → Plan de Cuentas → Configuración.
    * Selecciona si la configuración es para ti, un perfil o todos los usuarios.
    * Marca la casilla “Realizar control de movimiento para conciliación bancaria”.
    * Define la fecha desde la que quieres empezar a conciliar, para que no se mezclen los saldos antiguos.
    * Marca la casilla “Realizar control estricto de los tipos de movimiento bancario”, para que el sistema te pida el tipo de movimiento y su número.

2. **Crea las cuentas de conciliación bancaria:**
    * Ve a Contabilidad → Cuentas de Conciliación.
    * Crea una nueva cuenta de conciliación con el nombre de la cuenta del banco que ya tienes en el plan de cuentas.
    * Asigna un tercero, que debe ser el banco.
    * Para conciliación automática, activa la opción “Definir formato de importación de archivo del extracto bancario” e indica:

        - Carpeta donde guardarás los extractos.
        - Tipo de archivo (XLS, CSV, TXT, etc.) que te da el banco.
        - Número de filas de títulos y fila de inicio de datos.
        - Reglas de signos y asignación de columnas (fecha, tipo de movimiento, número, valor, etc.).

3. **Configura los tipos de movimiento bancario:**
      * El sistema tiene dos catálogos:

        -**General:** Aplica a todas las cuentas bancarias, siempre y cuando no tengan un catálogo específico creado. Incluye movimientos de ingreso y retiro. Se encuentra en **Contabilidad > Plan de Cuentas > Definición de tipos de movimiento bancario generales.**

        -**Específico:** Aplica a una cuenta bancaria en particular. Permite definir movimientos de ingreso, retiro, movimientos a ignorar, y notas crédito/débito. Se accede dando clic derecho sobre la cuenta en **Contabilidad > Cuentas Conciliación > Definición de tipos de movimiento bancario.**

4. **Crea tipos de movimientos en el catálogo de Tipos de Movimiento Bancario :**
         -   Movimiento de ingreso a la cuenta del banco.
         -   Movimiento de retiro a la cuenta del banco.
         -   Definición de movimiento a ignorar del extracto bancario.
         -   Definición de notas crédito o débito en el extracto bancario.

   ⚠️ **Nota:** Si utilizarás la conciliación bancaria automática agrega en el tipo de movimiento, el texto específico  a buscar en el extracto para clasificar los movimientos. Este paso es indispensable para garantizar el correcto funcionamiento de la operación, pues de esta forma el sistema sabrá cómo interactuar específicamente según los movimientos que encuentre en el extracto y según el detalle del mismo.

5. **Registra la operación de conciliación:**
      * Entra a Básico → Manejador de Operaciones → Más Operaciones → Contabilidad → Conciliación Bancaria y selecciona cómo deseas realizar la operación (es decir con el método manual o automática):

      - ⏳ Manual: Compara y marca los movimientos uno a uno y, si hace falta, haz ajustes contables manuales en el último paso para que los saldos coincidan.
      - ✅ Automática: Carga el extracto en el formato que configuraste, sincroniza y deja que el sistema concilie y genere ajustes automáticamente.

      * Indica la fecha de la conciliación, la cuenta del banco para conciliar y saldo del extracto para validar y comparar los saldos de la contabilidad vs el valor esperado.

   
Una vez que hagas todo esto, la conciliación bancaria estará configurada para funcionar de forma manual o automática según la opción que escojas, asegurándote de que los saldos del sistema coincidan con los del banco.

Recuerda que podrás hacer uso de la operación de conciliación bancaria (manual o automática) siempre y cuando cuentes con el licenciamiento de contabilidad.

#### Recursos adicionales  
- [Video: Capacitación conciliación bancaria](https://www.youtube.com/watch?v=4vzGTj6wQQ8) 



---


### ¿Cómo configurar el extracto bancario?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué formato puedo usar para los extractos bancarios en contapyme?   
- ¿En la conciliación manual puedo cargar el extracto del banco?
- ¿Qué pasos debo seguir para configurar el extracto bancario?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
- **¿Cómo configurar el extracto bancario?**
**Respuesta:**
Para configurar el extracto bancario en ContaPyme, sigue estos pasos:
(aplica para conciliación automática)

1. **Descarga el extracto desde tu banco en un formato compatible**
    * Asegúrate de descargarlo de la plataforma de tu banco en formatos como CSV, TXT (delimitado por comas o tabulaciones) o XLS.  
2. **Define la ruta de tus extractos**  
    * En la creación o edición de la cuenta de conciliación, activa la opción “Definir formato de importación de archivo del extracto bancario para esta cuenta”.  
    * Indica la carpeta donde guardarás tus extractos (por ejemplo, en el Escritorio o Documentos).
3. **Configura el tipo de archivo y las filas**  
    * Selecciona el tipo de archivo (CSV, TXT o XLS).  
    * Configura número de filas de títulos (0 si tu extracto no tiene encabezados).  
    * Configura número de la primera fila de datos (normalmente 1 si no hay encabezados).
4. **Verifica el signo de los movimientos**  
    * Activa “Cambiar el signo de los movimientos” solo si notas que el extracto tiene signos invertidos.  
    * Si débitos y créditos están en la misma columna sin signo, activa “Análisis de signo” e indica la letra o símbolo que identifica débitos (por ejemplo, C o D).
5. **Mapea las columnas del extracto al sistema**  
    * El sistema te pedirá asociar cada columna del archivo al campo correspondiente en ContaPyme:  
        * Fecha del movimiento  
        * Tipo de movimiento bancario  
        * Número del movimiento  
        * Valor del movimiento  
        * Descripción / referencia
    * Si tu extracto tiene columnas que no usarás, márcalas como No aplica.
6. **Guarda la configuración**  
    * Pulsa Aceptar y tu cuenta de conciliación quedará lista para importar extractos automáticamente.  
    * Una vez configurado, solo necesitarás cargar el archivo en la operación de conciliación automática y usar el botón "sincronizar" y él revisará los movimientos de la contabilidad vs los movimientos del extracto y los conciliará respectivamente.

Recuerda: si haces conciliación manual, no es necesario configurar el extracto; basta con comparar los movimientos y chulearlos uno a uno.

#### Recursos adicionales  
- [Video: Capacitación del extracto bancario](https://www.youtube.com/watch?v=IpF8rFYcVEQ&t=173s) 
---

### ¿Qué se necesita para poder cerrar los meses en ContaPyme?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué debo validar antes de cerrar un mes?  
- ¿Por qué no me deja cerrar un mes en ContaPyme?  
- ¿Cómo hacer el cierre de mes correctamente?  
- ¿Qué requisitos se necesitan para cerrar o bloquear un mes?  
- ¿Cuál es la diferencia entre cerrar y bloquear un mes?  


**Respuesta:**  
En **ContaPyme**, el proceso de cierre de mes tiene como objetivo **proteger la información contable** de periodos ya revisados, evitando modificaciones posteriores.  

Existen dos acciones importantes:

- 🔒 **Cierre de mes:**  
  Impide que **todos los usuarios**, incluso con permisos, puedan modificar, eliminar o agregar información en ese mes.

- 🔐 **Bloqueo de mes:**  
  Permite que **solo usuarios con permisos especiales** puedan realizar cambios.

Paso 1: Acceder al cierre de meses

**Ruta:**  
`Básico → Manejador de operaciones → Cierre de meses (icono de candado)`

Paso 2: Seleccionar el mes a cerrar o bloquear

1. Escoge el **mes y año** que deseas gestionar.
2. Marca una de las opciones:
   - ✔ Cerrar mes  
   - ✔ Bloquear mes
3. Haz clic en **Aceptar** para guardar.

Paso 3: Validar que todas las operaciones estén procesadas

Antes de cerrar el mes, es obligatorio que:

- ✅ Todas las operaciones estén **procesadas**
- ❌ No existan documentos en estado **desprocesado**

📌 **Importante:**  
Si hay operaciones sin procesar, el sistema **no permitirá el cierre** y mostrará un mensaje de error.

✔ Validación del cierre

Puedes verificar el estado del mes así:

**Ruta:**  
`Básico → Manejador de operaciones → Cierre de meses`

- Los meses aparecerán con un ✔ según su estado:
  - Cerrado
  - Bloqueado

#### 📌 Notas importantes

- Si no has cerrado meses anteriores y seleccionas el mes actual, el sistema lo detectará y cerrará automáticamente los meses previos.
- Al cerrar un mes, automáticamente queda **bloqueado**.
- Solo usuarios con permisos pueden realizar estos procesos.

#### 🧾 Ejemplo práctico

Si deseas cerrar el mes de **octubre**:

1. Verifica que todas las operaciones estén procesadas de ese mes y de los anteriores.
2. Ingresa al cierre de meses.
3. Selecciona octubre.
4. Marca **Cerrar mes**.
5. Haz clic en **Aceptar**.

#### 💡 Recomendaciones finales

- ✅ Verifica y concilia toda la información antes de cerrar el mes.
- 📊 Asegúrate de que no existan diferencias en contabilidad.
- 🔎 Revisa cartera, inventarios y movimientos contables.

📌 **Importante (Inventarios):**  
Si manejas inventarios, antes de cerrar el mes debes ejecutar el proceso de **recosteo**.  
Este proceso es fundamental para:

- Corregir inconsistencias en costos  
- Actualizar valores reales de inventario  
- Evitar descuadres contables posteriores  

#### ⚠️ Casos comunes

- ❌ Intentar cerrar un mes con operaciones desprocesadas  
- 🔄 Diferencias contables no revisadas  
- 📦 No ejecutar recosteo en empresas con inventarios  

📌 **Nota:**  
Si intentas cerrar un mes sin haber cerrado los anteriores, el sistema puede mostrar una advertencia y darte la opción de cerrarlos automáticamente.

#### Recursos adicionales  
- [Video: Cierre de fin de mes](https://www.youtube.com/watch?v=oS2fwI5BdmM&t=450s) 

---