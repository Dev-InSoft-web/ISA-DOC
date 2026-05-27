# pf_inventarios.md
> **Propósito:** Reunir las preguntan frecuentes del módulo **inventarios**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntan frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/11/14

## Informes y consultas

### ¿Cómo consultar diferencias entre inventario y contabilidad?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Por qué mi inventario no coincide con la contabilidad?  
- ¿Cómo auditar movimientos de inventario y contabilidad?  
- ¿Cómo activar la columna tipo de operación en los exploradores?  
- Saldo de contabilidad no coincide con el saldo de inventarios.
- El balance y el informe de inventarios tienen diferencias
- Al comparar el inventario con el balance contable los valores no coinciden, ¿qué puede estar pasando?
- Tengo diferencias entre inventarios y contabilidad, ¿cómo puedo revisarlo?
- El saldo del inventario no coincide con el saldo de la cuenta 14 en contabilidad.
- Mis inventarios muestran un valor diferente al que aparece en el balance, ¿por qué?
- Hice algunos ajustes de inventario y ahora los valores no coinciden con contabilidad.
- ¿Por qué mi inventario físico no coincide con la contabilidad?
- Tengo cuentas de inventario en negativo después de algunos movimientos, ¿qué debo revisar?
- El inventario del sistema no coincide con los reportes contables.
- ¿Cómo puedo revisar si hay movimientos que afectaron inventario desde contabilidad?
- Creo que alguien registró movimientos manuales en inventarios y ahora hay diferencias.
- Al revisar el explorador de inventarios y el de contabilidad veo valores diferentes.
- ¿Por qué se descuadran los inventarios con la contabilidad en ContaPyme?
- Tengo diferencias en inventario después de usar movimiento universal.
- ¿Qué puede causar que el inventario no coincida con la contabilidad?
- ¿Cómo puedo auditar las diferencias entre inventarios y contabilidad?
- Tengo un valor en inventarios pero en el mayor y balance me sale otro
- El valor del movimiento de la cuenta de materia prima en balance es diferente al movimiento que aparece en informe de inventario
- presento descuadre al comparar informe contable con informe de inventarios. por qué?


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Las diferencias entre inventario y contabilidad en ContaPyme suelen presentarse cuando se realizan movimientos manuales que no siguen las operaciones propias del módulo de inventarios. Esto ocurre principalmente por dos motivos:

**Motivos comunes de las diferencias:**
1. **Uso inadecuado de la operación de movimiento universal sin generar el movimiento contable correspondiente:**  
   - El sistema no crea automáticamente el asiento contable si el usuario no lo registra manualmente. Por este motivo, es de suma relevancia que sólo se utilice esta operación si se tiene pleno conocimiento del procedimiento que se está realizando.

2. **Movimientos contables imputando cuentas de inventario de forma manual:**  
   - Cuando se afectan cuentas del grupo 14 (Inventarios) desde operaciones de movimientos contables, sin usar las operaciones del módulo de inventarios, se rompe la relación entre inventario físico y contabilidad.

**Cómo comparar las diferencias:**
1. **Utiliza los exploradores de contabilidad e inventarios:**
   - Ingresa a **Explorador de contabilidad** y filtra por la cuenta del grupo 14 (Inventarios).
   - Ingresa a **Explorador de inventarios** para ver los movimientos para comparar los saldos por un rango de fecha determinado.

2. **Activa la columna “Tipo de operación”:**
   - Si no está visible, configúrala así:
     - **Explorador > Configuración > Información disponible > Tipo: Tipo de operación**.
   - Luego, marca la columna como visible en el explorador.
   - Repite el proceso en cada explorador donde quieras ver esta información.

3. **Audita la información:**
   - Compara los movimientos contables y físicos por tipo de operación.
   - Identifica errores de digitación o movimientos manuales indebidos.

**Recomendaciones para evitar diferencias:**
- **Usa siempre las operaciones del módulo de inventarios:**  
  - Ajustes, entradas, salidas y facturación deben hacerse desde inventarios, no desde contabilidad.
- **Evita imputar cuentas del grupo 14 manualmente:**  
  - Si necesitas ajustes contables, hazlos con cuentas de control, no directamente sobre inventarios. 
  - Si utilizas cuentas del inventario, se espera que tengas pleno conocimiento del proceso que se está realizando y la afectación que se tendrá en la base de datos y en la contabilidad.
- **Verifica la configuración de cuentas:**
  - Si tienes personalización de cuentas por elemento o grupo de inventario recuerda validar la información teniendo presente estos filtros. 
- **Revisa periódicamente los exploradores y compara los saldos:**  
  - Verifica que siempre haya una consistencia entre contabilidad e inventarios. Esto permite detectar inconsistencias antes del cierre contable.

**Importante:** 
👉 Una vez identificadas las diferencias, realiza las correcciones necesarias para mantener la integridad entre inventario físico y contabilidad.
👉 Si requieres apoyo con esta revisión o no sabes cómo corregir estas diferencias, te recomendamos generar un tiquete con nuestro equipo de soporte.

#### 📌 Recursos adicionales   
- [Video: Explorador de Contabilidad](https://www.youtube.com/watch?v=8mTDTTON7co) 
- [Video: Explorador de Inventarios](https://www.youtube.com/watch?v=o1HIeLTQXtk) 

---


### ¿Cómo generar reportes para comisiones por vendedor?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo obtener un resumen de comisiones liquidadas?
- ¿Cómo ver las comisiones en venta o en recaudo?
- Necesito ver las comisiones de los vendedores  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El módulo de **Inventarios** en ContaPyme ofrece informes especializados para gestionar comisiones por ventas o recaudo. Estos reportes permiten analizar el desempeño de los vendedores y calcular las comisiones liquidadas. Existen tres informes principales: explorador de comisiones, informe de Detalle de comisiones liquidadas y Resumen de comisiones liquidadas, cada uno con un propósito específico.

**Rutas para generar los reportes:**
- Pestaña Inventarios > Movimientos (Exploradores) > Comisiones
- Pestaña Inventarios > Comisiones y otros conceptos > Detalle de comisiones liquidadas
- Pestaña Inventarios > Comisiones y otros conceptos > Resumen de comisiones liquidadas
- Pestaña Inventarios > Comisiones y otros conceptos > Conceptos de vendedores

**Diferencias entre los informes:**

1. **Detalle de comisiones liquidadas**  
   - Muestra información **por factura**, incluyendo:
     - Número de factura.
     - Fecha de factura y edad.
     - Valor de la factura.
     - Saldo pendiente.
     - Base comisionable.
     - Abono prioritario.
     - Porcentaje de comisión.
     - Valor de la comisión.
     - Tipo de vendedor.
   - Incluye totales por:
     - Comisiones en ventas.
     - Comisiones por recaudo.
   - **Uso recomendado:** Auditoría detallada por documento y cálculo exacto de cada comisión.

2. **Resumen de comisiones liquidadas**  
   - Presenta un **consolidado por vendedor**, con columnas como:
     - Factura #.
     - Fecha de factura.
     - Cliente.
     - Edad.
     - Tipo de vendedor.
     - Base de comisión.
     - Saldo.
     - Comisión por venta.
     - Comisión por recaudo.
     - Comisión total.
   - **Uso recomendado:** Análisis global por vendedor o período, ideal para reportes gerenciales.

3. ** Explorador de comisiones**
   - Te permite generar auditoría de los datos, adicionar columnas, agrupar la información y visualizar rápidamente las comisiones generadas a los vendedores.

**Recomendaciones:**
- **Configura los conceptos de comisión:** Antes de generar reportes, asegúrate de que los conceptos estén definidos correctamente.
- **Aplica filtros adecuados:** Fecha, vendedor, centro de costos y tipo de operación para obtener información precisa.
- **Exporta los reportes:** Usa la opción de exportación a Excel para análisis detallado o presentación.

👉 **Importante:** Si los reportes no muestran datos, revisa que las operaciones tengan asignado el vendedor y que las comisiones estén liquidadas.

#### 📌 Recursos adicionales   
- [Video: Sistema de liquidación de comisiones en ContaPyme](https://www.youtube.com/watch?v=4cowQBMLgwU)

---



### ¿Cómo consultar cantidades por lotes o seriales?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo saber cuántas unidades hay por lote o por serial?  
- ¿Dónde consulto los seriales de productos en inventario?  
- ¿Cómo generar un reporte de lotes por bodega? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
ContaPyme ofrece varias opciones para consultar cantidades por **lotes** o **seriales** en el módulo de **Inventarios**, permitiendo un control detallado del stock y trazabilidad de productos.

**Ruta principal para la consulta:**
- Ingresa a **Inventarios > Informes > Inventarios > Series y lotes**.

En esta sección encontrarás diferentes informes especializados:

**Opciones disponibles:**

1. **Consulta de saldos:**
   - Muestra las cantidades disponibles por lote o serial.
   - Permite filtrar por:
     - **Bodega**.
     - **Fecha de corte**.
     - **Producto específico**.
   - Ideal para verificar el stock actual por lote.

2. **Consulta de saldos por grupo de inventario:**
   - Presenta la información agrupada por el **grupo de inventario** al que pertenece el producto.
   - Útil para análisis global por categoría (por ejemplo, medicamentos, repuestos, etc.).

3. **Saldos de inventarios (tipo impresión):**
   - Genera un reporte imprimible con el detalle de cantidades por lote o serial.
   - Incluye filtros por bodega y fecha.
   - Recomendado para auditorías físicas o reportes externos.

**Recomendaciones:**
- **Aplica filtros adecuados:** Fecha de corte, bodega y producto para obtener información precisa.
- **Exporta los reportes:** Usa la opción de exportación a Excel para análisis detallado.
- **Verifica la configuración de lotes y seriales:** Antes de consultar, asegúrate de que los productos estén correctamente parametrizados para manejar lotes o seriales.

👉 **Importante:** Si no ves información en los reportes, revisa que las operaciones de entrada y salida incluyan el lote o serial correspondiente.

#### 📌 Recursos adicionales   
- [Manejo de series y lotes en inventarios](https://www.youtube.com/watch?v=dz5oZQVmKPc)  
- [Guía de montaje de series en inventarios](Dirígete a la pestaña Inventarios > Guías de montaje > Guía de montaje de series)  
- [Guía de montaje de lotes en inventarios](Dirígete a la pestaña Inventarios > Guías de montaje > Guía de montaje de lotes)  

---



### ¿Cómo generar informe diario o mensual del inventario?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo ver el inventario por día o mes?  
- ¿Dónde consulto los saldos contables del inventario?  
- ¿Cómo generar un reporte de existencias físicas?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
ContaPyme ofrece múltiples informes para visualizar el inventario en períodos específicos (diarios, mensuales o personalizados). Estos informes permiten analizar movimientos, saldos contables y existencias físicas, con opciones para exportar la información a Excel.

**Opciones para generar informes:**

1. **Explorador de movimientos de inventario:**
   - Ruta: **Inventarios > Movimientos (Explorador)**.
   - Permite ver todos los movimientos generados con los elementos del inventario.
   - Aplica filtros por:
     - **Rango de fechas** (día, mes, período).
     - **Bodega**, **producto**, **tipo de operación**.
   - Ideal para auditorías y control de entradas/salidas y visualizar todos los usos que se le han dado a los elementos del inventario. (consumos, compras, ventas, etc)

2. **Inventario contable – saldos:**
   - Ruta: **Inventarios > Inventario contable - saldos**.
   - Muestra el saldo contable del inventario.
   - Útil para conciliación con contabilidad.

3. **Inventario contable – movimientos:**
   - Ruta: **Inventarios > Inventario contable - movimientos**.
   - Presenta el detalle de movimientos contables asociados al inventario.
   - Recomendado para análisis financiero y control de costos.

4. **Inventario físico – existencias:**
   - Ruta: **Inventarios > Inventario físico - existencias**.
   - Reporta las cantidades físicas disponibles por producto y bodega.
   - Ideal para control operativo y toma de decisiones sobre stock.

5. **Inventario disponible:**
   - Ruta: **Inventarios > Inventario disponible**.
   - Muestra el inventario disponible considerando reservas y pedidos.
   - Útil para planeación de ventas y abastecimiento.

**Recomendaciones:**
- **Explora las diferentes opciones:** Cada informe tiene un enfoque distinto (contable, físico, disponible).
- **Aplica filtros adecuados:** Fecha, bodega, producto y centro de costos para obtener información precisa.
- **Exporta los reportes:** Todos los informes permiten exportación a Excel para análisis detallado.

👉 **Importante:** Si los datos no coinciden entre informes, revisa los filtros aplicados en los informes ya que de esto dependerá cómo se presenta la información.

#### 📌 Recursos adicionales   
- [Curso: Inventarios gestión básica > Sección informes y consultas de inventario](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD130)  

---


### ¿Cómo consultar productos vendidos a un cliente o comprados a un proveedor?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo saber qué productos le vendí a un cliente?  
- ¿Dónde consulto las compras realizadas a un proveedor?  
- ¿Cómo generar un reporte de ventas por producto y cliente?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
ContaPyme permite consultar fácilmente los productos vendidos a clientes y las compras realizadas a proveedores, utilizando informes y exploradores del módulo de **Inventarios**.

**Para productos vendidos a un cliente:**
- Ruta: **Inventarios > Informes > Ventas > Ventas por factura**.
- Este informe muestra:
  - Número de factura.
  - Fecha.
  - Cliente.
  - Detalle de productos vendidos.
  - Cantidades y valores.
- **Filtros disponibles:** Cliente, rango de fechas, bodega, grupo de inventario.
- **Uso recomendado:** Auditoría de ventas y análisis por cliente.

**Para productos comprados a un proveedor:**
- No existe un informe específico para compras por proveedor, pero se puede consultar en:
  - **Explorador de movimientos (Inventarios)**.
- Aplica filtros para obtener la información deseada:
  - **Tercero (proveedor)**.
  - **Fechas**.
  - **Productos**.
  - **Tipo de movimiento** (entradas por compra).
- **Uso recomendado:** Control de compras y conciliación con cuentas por pagar.

**Recomendaciones:**
- **Exporta los reportes:** Todos los informes y exploradores permiten exportación a Excel para análisis detallado.
- **Aplica filtros precisos:** Fecha, tercero y producto para obtener resultados exactos.
- **Verifica la operación:** Asegúrate de que las facturas y movimientos estén contabilizados correctamente.

👉 **Importante:** Si no encuentras la información esperada, revisa que las operaciones estén registradas con el tercero correcto y que los productos tengan asignado el grupo de inventario.

#### 📌 Recursos adicionales   
- [Informe de ventas por factura](https://www.youtube.com/watch?v=asqUP8Zf4hA&t=141s)
-[Explorador de inventarios](https://www.youtube.com/watch?v=o1HIeLTQXtk)

---

### ¿Por qué hay diferencia entre el saldo del inventario y el balance contable?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo conciliar inventario con contabilidad?
- ¿Cómo verificar operaciones sin contabilizar?
- ¿Cómo evitar inconsistencias entre módulo de inventarios y contabilidad?

En **ContaPyme**, el saldo del inventario refleja las existencias físicas y su costo según los movimientos registrados en el módulo de inventarios, mientras que el balance contable muestra los valores contabilizados en las cuentas asociadas. Una diferencia entre ambos puede ocurrir por falta de sincronización entre las operaciones de inventario y su contabilización.

**Motivos comunes de las diferencias:**
1. **Uso inadecuado de la operación de movimiento universal sin generar el movimiento contable correspondiente:**  
   - El sistema no crea automáticamente el asiento contable si el usuario no lo registra manualmente. Por este motivo, es de suma relevancia que sólo se utilice esta operación si se tiene pleno conocimiento del procedimiento que se está realizando.

2. **Movimientos contables imputando cuentas de inventario de forma manual:**  
   - Cuando se afectan cuentas del grupo 14 (Inventarios) desde operaciones de movimientos contables, sin usar las operaciones del módulo de inventarios, se rompe la relación entre inventario físico y contabilidad.

**Cómo comparar las diferencias:**
1. **Utiliza los exploradores de contabilidad e inventarios:**
   - Ingresa a **Explorador de contabilidad** y filtra por la cuenta del grupo 14 (Inventarios).
   - Ingresa a **Explorador de inventarios** para ver los movimientos para comparar los saldos por un rango de fecha determinado.

2. **Activa la columna “Tipo de operación”:**
   - Si no está visible, configúrala así:
     - **Explorador > Configuración > Información disponible > Tipo: Tipo de operación**.
   - Luego, marca la columna como visible en el explorador.
   - Repite el proceso en cada explorador donde quieras ver esta información.

3. **Audita la información:**
   - Compara los movimientos contables y físicos por tipo de operación.
   - Identifica errores de digitación o movimientos manuales indebidos.

**Cómo evitarlo**
💡 **Siempre contabiliza las operaciones** desde el módulo de inventarios.  
⚠️ **No realices ajustes manuales en contabilidad** sin reflejarlos en inventarios.  
✅ **Ejecuta recosteos periódicos** para mantener la coherencia entre módulos.  
💡 **Conciliar inventario vs contabilidad** antes de cerrar cada periodo.

**Si la diferencia persiste**
👉 Contacta al **equipo de soporte técnico** creando un tiquete con el tema **“Inventarios** para recibir asistencia especializada.

#### 📌 Recursos adicionales 
- [Video: Explorador de Contabilidad](https://www.youtube.com/watch?v=8mTDTTON7co) 
- [Video: Explorador de Inventarios](https://www.youtube.com/watch?v=o1HIeLTQXtk) 

---

### ¿Cómo consultar el último precio de compra?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo consultar el historial de compras de un producto?
- ¿Cómo obtener el costo promedio al cierre del año?
- ¿Cómo generar informes de compras por proveedor?
- ¿Cómo filtrar movimientos por tipo de documento?

En **ContaPyme**, el último precio de compra corresponde al valor más reciente pagado por un producto en una operación de compra registrada en el sistema. Esta información es clave para análisis de costos y toma de decisiones, especialmente al cierre del año contable.

**Pasos para consultar la información requerida en ContaPyme:**
✅ **1. Accede al explorador de inventarios**  
👉 Ingresa al menú **Inventarios → Informes → Explorador de inventarios**.

✅ **2. Aplica los filtros necesarios**  
👉 Filtra por:  
- **Fecha**: establece el rango de fechas que requieras.
- **Tipo de documento**: selecciona el documento con el cual se soportó la compra. Por ejemplo **factura de compra** 
- **Proveedor**: si deseas consultar por proveedor específico.  
- **Producto**: para obtener el precio de un artículo en particular.  
- **Bodega**: si necesitas segmentar por ubicación.

✅ **3. Consulta el resultado**  
👉 El sistema mostrará el historial de movimientos.  
👉 Ordena por fecha descendente para identificar el último precio de compra.

**Recomendaciones**
💡 **Usa el filtro de rango de fechas** para evitar incluir movimientos que no requieras validar.
✅ **Exporta el informe a Excel** si necesitas conservar la información para auditoría.  
💡 **Combina filtros** (producto + proveedor) para obtener datos más precisos.

#### 📌 Recursos adicionales 
- [Video: Explorador de Inventarios](https://www.youtube.com/watch?v=o1HIeLTQXtk) 

---

## Cálculo automático de impuestos
### ¿Cómo automatizar retenciones (IVA, ICA)?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo configurar IVA e ICA en ContaPyme?  
- ¿Por qué mi factura no calcula impuestos automáticamente?  
- ¿Dónde se activan los impuestos en la operación de facturación?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para automatizar el cálculo de impuestos como IVA, ICA, retención en la fuente, ReteIVA, etc, en el módulo de **Inventarios** de ContaPyme, es necesario realizar configuraciones básicas que aseguren que el sistema aplique los impuestos de forma automática en las operaciones de facturación.

**Configuraciones esenciales para automatizar impuestos:**

1. **Configurar la responsabilidad tributaria de la empresa:**
   - Ingresa al **Catálogo de empresa** y valida la **clasificación tributaria**.
   - Activa las responsabilidades correspondientes (por ejemplo, responsable de IVA e ICA).
   - Esto define qué impuestos aplican a las operaciones de la empresa.

2. **Configurar la clasificación tributaria de los terceros:**
   - En el **Catálogo de terceros** (clientes y proveedores), asigna la clasificación tributaria correcta.
   - Esto permite que el sistema determine si el tercero está sujeto a retenciones o impuestos.

3. **Configurar los grupos de inventario:**
   - Ve a **Inventarios > Catálogo de grupos de inventario**.
   - Asigna la **cuenta contable de ingresos por ventas**.
   - Asegúrate de que esta cuenta tenga asociados los impuestos a calcular (IVA, ICA, Retenciones, ReteIVA, etc.).
   - ✅ Ejemplo: La cuenta `4135xx` debe tener configurado el IVA del 19% y la retención de ICA según la tarifa aplicable.

4. **Configurar la operación de facturación y ventas:**
   - Ingresa a **Operación de facturación y ventas > Pestaña Operación > Configuración**.
   - Activa la opción **Impuestos a calcular automáticamente**.
   - Marca los impuestos que deseas aplicar (IVA, Retenciones,ICA, etc.).

**Recomendaciones:**
- **Verifica tarifas y cuentas:** Antes de facturar, revisa que las tarifas de IVA e ICA estén correctas en el catálogo de impuestos.
- **Prueba la operación:** Genera una factura de prueba y valida que el sistema calcule los impuestos automáticamente según el tipo de tercero al cual se esté realizando la factura.
- **Evita configuraciones manuales:** Si los impuestos no se calculan, revisa la configuración del grupo de inventario y la operación.

👉 **Importante:** Si la empresa no tiene configurada la responsabilidad tributaria o los terceros no están clasificados correctamente, el sistema no aplicará los impuestos automáticamente.

#### 📌 Recursos adicionales   
- [Video: Cálculo automático de impuestos](https://www.youtube.com/watch?v=4Ntl1p9jhrc&t=2069s) 

---


## Listas de precio y métodos de cálculo
### ¿Por qué el sistema no refleja cambios de costo tras modificar compra?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo actualizar el costo del inventario automáticamente?  
- ¿Por qué el costo no cambia después de registrar una compra?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, el costo de los productos no se actualiza automáticamente solo por modificar una compra, ya que el sistema utiliza **métodos de cálculo de listas de precios**. Estos métodos determinan cómo se actualizan los costos y precios en el inventario.

**Motivo principal:**
- El valor del inventario depende del **método de cálculo configurado** en las listas de precios.
- Si el método no está definido para tomar el **último precio de compra** o el costo promedio, el cambio en la compra no afectará el costo del producto.

**Cómo asegurarse de que el costo se actualice:**

1. **Configura el método de cálculo correcto:**
   - Ingresa a **Inventarios > Elementos del inventario > Métodos de cálculo**.
   - Selecciona el método adecuado:
     - **Último precio de compra** (UPCOM).
     - **Costo promedio ponderado**.
     - **Costo promedio ponderado ingresos inventario**.
     - **Último costo de embodegamiento**.
   - ✅ Ejemplo: Si deseas que el costo se actualice con el último precio de compra, elige dicha opción.

2. **Verifica la lista de precios asociada al producto:**
   - Cada producto debe tener asignada una lista de precios que utilice el método configurado.
   - Si las listas de precios no tienen correctamente asociados los métodos de cálculo, no se obtendrá el resultado esperado.

3. **Define cómo se actualizarán los precios de los elementos:**
   - En la configuración del método, activa cómo deseas que se calculen los precios:
     - **Actualizar precio en línea** (cálculo automático en tiempo real)
     - **Actualizar precio en bloque** (cuando el usuario corre proceso de actualización de precios)

**Recomendaciones:**
- **Evita cambios manuales en el costo:** Si modificas el costo directamente en el producto, puede perder consistencia con el método de cálculo.
- **Prueba con una compra de ejemplo:** Después de configurar el método, registra una compra y verifica el costo actualizado.
- **Audita los métodos activos:** Asegúrate de que no haya métodos obsoletos o duplicados que generen confusión.

**Importante:** 
👉Si el método está mal configurado, el sistema seguirá mostrando el costo anterior, incluso si modificas la compra.
👉Valida que todas las operaciones estén debidamente procesadas y en el orden cronológico que corresponde.

#### 📌 Recursos adicionales   
- Te recomendamos visualizar los recursos asociados a las listas de precio y métodos de cálculo en [Curso de inventarios gestión comercial](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD140) 

---

### ¿Cómo hacer ajustes masivos de precios de venta?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo actualizar precios de venta automáticamente?  
- ¿Cómo cambiar precios manualmente en bloque?  
- ¿Cómo configurar métodos de cálculo para listas de precios?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
ContaPyme permite realizar ajustes masivos de precios de venta de dos formas principales:  
1. **Actualizar precios con base en método de cálculo** (automático).  
2. **Actualizar precios de forma manual**.  

Ambas opciones se encuentran en la ruta:  
**Inventarios > Lista de precios > Actualizar precios**.

**Opción 1: Actualizar precios con base en método de cálculo**
- Esta opción es la más sencilla, ya que el sistema utiliza el **método de cálculo configurado** para cada lista de precios.
- El método puede estar basado en:
  - Último precio de compra.
  - Costo promedio ponderado.
  - Costo de embodegamiento.
  - Otros criterios definidos en la configuración.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde seleccionas la opción de actualización de precios con base en método de cálculo](https://www.contapyme.com/conocimientocontapyme/080_IN/ruta_actualizar_segun_metodo.png)  

- **Proceso:**
  1. Selecciona **Actualizar precios con base en método de cálculo**.
  2. Se abrirá el **Asistente de actualización automática**:
     - Elige la lista de precios a actualizar.
     - Define si deseas incluir elementos con actualización manual, automática en bloque o automática en línea.
     - Aplica filtros si es necesario.
  3. Antes de confirmar, el sistema muestra una **vista previa** con el precio actual y el nuevo precio calculado.
  4. Haz clic en **Actualizar** para aplicar los cambios.

✅ **Ventaja:** Ahorra tiempo y asegura consistencia con la política de precios definida por la empresa.

**Opción 2: Actualizar precios de forma manual**
- Esta opción permite asignar precios específicos a cada producto.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde seleccionas la opción de actualización de precios de forma manual](https://www.contapyme.com/conocimientocontapyme/080_IN/ruta_actualizar_precio_manual.png)  

- **Proceso:**
  1. Selecciona **Actualizar precios (cálculo manual)**.
  2. Se abrirá el **Asistente de actualización manual**:
     - Elige la lista de precios.
     - Filtra por tipo de elemento
     - Aplica filtros adicionales (fecha de compra, código, etc.).
  3. En la **vista previa**, ingresa el nuevo precio para cada producto.
  4. Confirma la actualización.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde asignas precios de forma manual](https://www.contapyme.com/conocimientocontapyme/080_IN/asignar_precio_manual.png)  


✅ **Ventaja:** Control total sobre cada precio, ideal para ajustes específicos.

**Opción 3: Utilizar la herramienta de calcular precios** (botón dentro del catálogo de elementos del inventario):

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde actualizas los precios de los elementos seleccionados](https://www.contapyme.com/conocimientocontapyme/080_IN/herramienta_calcularprecio.png) 

**Calcular precios de la columna:**
Calcular precios para la lista de precios (columna) seleccionada:
Calcula los precios de venta para la lista de precios seleccionada; para todos los elementos o para los seleccionados. Para actualizar un solo precio, presiona doble clic sobre la celda "Calcular...".

- "Calcular...": Se calculan todos los precios de la lista de precios de los productos que tiene la activada la opción "Actualizar precio en línea (en tiempo real)".

- "Refrescar...": indica que la columna de lista de precios no se ha consultado aún en la base de datos central, presiona el botón "Refrescar" o presiona simultáneamente las teclas <Ctrl> + <R>.

**Recomendaciones importantes:**
- **Revisa el método de cálculo:** Si usas la opción automática, asegúrate de que el método esté correctamente configurado.
- **Valida la vista previa:** Antes de aplicar cambios, verifica que los nuevos precios sean correctos.
- **Exporta la información:** Guarda un respaldo en Excel antes y después del ajuste.

👉 **Importante:** Los ajustes masivos afectan todas las operaciones futuras que usen la lista de precios actualizada. No se recomienda hacer cambios sin validar el impacto en costos y márgenes.

#### 📌 Recursos adicionales   
- Te recomendamos visualizar los recursos asociados a las listas de precio y métodos de cálculo en [Curso de inventarios gestión comercial](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD140) 


---


### ¿Cómo actualizar automáticamente precios para nuevo año?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo actualizar precios de venta automáticamente?  
- ¿Cómo cambiar precios manualmente en bloque?  
- ¿Cómo configurar métodos de cálculo para listas de precios?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme puedes ajustar los precios de venta de forma masiva y sencilla. Antes de hacerlo, es importante revisar el método de cálculo que usarás, ya que muchas empresas aprovechan el inicio de año para cambiar su estrategia de precios.

**¿Qué debes definir primero?**
Decide si mantendrás el mismo método del año anterior o si lo modificarás.

Por ejemplo:
El año pasado aplicaste un aumento fijo sobre el costo promedio ponderado. Este año quieres aplicar un incremento porcentual para mejorar el margen.

Una vez tengas claro el método, puedes elegir entre estas opciones:

1. Actualizar precios según el método de cálculo definido.
2. Modificar precios manualmente.

**Recomendaciones importantes:**
- **Revisa el método de cálculo:** Si usas la opción automática, asegúrate de que el método esté correctamente configurado.
- **Valida la vista previa:** Antes de aplicar cambios, verifica que los nuevos precios sean correctos.
- **Exporta la información:** Guarda un respaldo en Excel antes y después del ajuste.

👉 **Importante:** Los ajustes masivos afectan todas las operaciones futuras que usen la lista de precios actualizada. No se recomienda hacer cambios sin validar el impacto en costos y márgenes.

#### 📌 Recursos adicionales   
- Te recomendamos visualizar los recursos asociados a las listas de precio y métodos de cálculo en [Curso de inventarios gestión comercial](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD140) 

---

### ¿Cómo modificar el costo para que se actualice el precio de venta?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Por qué cambió el costo de un producto?  
- ¿Cómo corregir el promedio ponderado del inventario?  
- ¿Cómo hacer para que el precio de venta se recalcule con el costo?  
- ¿Dónde reviso el historial de costos de un producto?

#### Respuesta:
**Descripción:** 
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el **costo de un producto** se determina a partir del **promedio ponderado** del elemento, calculado con base en todas las transacciones que lo han afectado (compras, consumos, ventas, traslados, ajustes, etc.).

Para lograr que el **costo se actualice correctamente** y, a su vez, se refleje en el **precio de venta** (cuando este depende del costo), se recomienda seguir este proceso:

1. **Identificar el cambio en el comportamiento del costo**  
   Lo ideal es ubicar la fecha exacta en la que el costo del producto presentó un valor inesperado.

   Esto lo puedes revisar desde el:
   - **Explorador de inventarios**
   - Filtrando por el **elemento**
   - Filtrando por la **bodega** correspondiente  

   Allí podrás ver el costo actual e ir revisando **hacia atrás por fechas** hasta encontrar el momento en el que se generó la diferencia.

2. **Analizar la causa de la diferencia**  
   Al revisar las transacciones, valida:
   - Compras con costos atípicos
   - Ajustes de inventario
   - Operaciones procesadas fuera de orden
   - Movimientos con un costo subestimado o sobreestimado 

3. **Reprocesar las transacciones en orden cronológico**  
   Una vez identificada la transacción que originó el cambio, se debe:
   - Corregir la operación (si aplica)
   - **Reprocesar las transacciones en el orden correcto**

   Esto permite que el **promedio ponderado** del costo continúe su cálculo de forma adecuada.

4. **Validar el impacto en el precio de venta**  
   Cuando el **método de cálculo del precio de venta** está configurado con base en el costo del elemento:
   - Al actualizarse el costo, el **precio de venta también se actualizará**
   - El resultado dependerá específicamente del **método de cálculo utilizado** (margen, porcentaje, lista basada en costo, etc.)

💡 **Importante:**  
El precio de venta **no siempre se actualiza automáticamente**, ya que esto depende del método de cálculo configurado para el producto. Por eso es clave validar esta configuración antes de realizar cambios.

Es decir, si el método de cálculo no depende específicamente del costo promedio ponderado del elemento te sugerimos revisar si es necesario hacer otra corrección para obtener el precio esperado.

Si no tienes claridad sobre qué transacciones reprocesar o cómo hacerlo sin afectar periodos cerrados, te recomendamos generar un **tiquete de soporte** para que un asesor especializado te acompañe en el proceso:  
👉 https://www.contapyme.com/portal-clientes/

#### 📌 Recursos adicionales   
- Te recomendamos visualizar los recursos asociados a las listas de precio y métodos de cálculo en [Curso de inventarios gestión comercial](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD140) 


---


### ¿Por qué no se pueden modificar precios de productos?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Por qué el sistema no me deja cambiar el precio de un producto?  
- ¿Cómo funciona el precio manual en inventarios?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, la posibilidad de **modificar los precios de los productos** depende principalmente del **método de cálculo del precio** y de los **permisos del usuario** que realiza el cambio.

Si no puedes modificar el precio de un producto, revisa los siguientes puntos:

1. **Método de cálculo del precio**  
   Los precios de los productos se actualizan según el **método de cálculo configurado** en el elemento. Por ejemplo:
   - Precios basados en **costo**
   - Precios por **margen o porcentaje**
   - **Cálculo manual**

   Cuando el método **no es manual**, el sistema realiza automáticamente la actualización de los precios.

2. **Precio con cálculo manual**  
   Si el producto tiene configurado el **método de cálculo manual**, el sistema **sí permite** modificar el precio directamente.  
   En este caso, si no te deja cambiarlo, es importante validar:

3. **Permisos del usuario**  
   Puede suceder que el usuario con el que estás ingresando:
   - No tenga los **permisos necesarios**
   - Tenga un perfil que **restringe la modificación de precios**

   Esto impide realizar cambios aunque el producto tenga cálculo manual.

💡 **Importante:**  
Fuera de estas dos condiciones (método de cálculo y permisos), **ContaPyme no bloquea la modificación de precios** de los productos.

Si después de validar el método de cálculo y los permisos el problema persiste, te recomendamos generar un **tiquete de soporte** para que un asesor especializado revise tu caso:  
👉 https://www.contapyme.com/portal-clientes/

#### 📌 Recursos adicionales 
- Te recomendamos visualizar los recursos asociados a las listas de precio y métodos de cálculo en [Curso de inventarios gestión comercial](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD140) 

---

## Elementos del inventario
### ¿Cómo crear elementos de inventario nuevos?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo crear un producto o servicio en ContaPyme?
- Necesito crear un servicio.

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, los elementos de inventario representan los productos o artículos que la empresa maneja para su comercialización, producción o consumo interno. Crear un nuevo elemento permite registrar sus características, costos y unidades de medida para una correcta gestión contable y operativa.

La correcta configuración básica del elemenento es indispensable pues de esto dependerá el comportamiento y manejo contable que tendrá al realizar operaciones como compras, ventas, transformaciones, consumos, entre otras.

**Pasos para crear un nuevo elemento**
1. Accede al módulo de Inventarios 
👉 Ingresa al menú **Inventarios → Elementos → Crear**.

2. Digita el *código* y *nombre* del elemento**.  

3. Selecciona el **grupo del inventario**, línea y departamento (si aplica) y la unidad de medida.

4. Configura parámetros adicionales 
👉 Define el **tipo de control de inventario** (control de existencias, consumo interno, servicio, etc.). 
👉 Verifica datos clave como las listas de precio y métodos de cálculo 
👉 Establece el stock mínimo y máximo del elemento.
👉 Adiciona una imagen (opcional)

5. Guarda el registro
👉 Haz clic en **Guardar** para finalizar la creación del elemento.

**Recomendaciones**
💡 **Verifica la estructura de códigos** antes de crear el elemento para mantener la consistencia.  
⚠️ **Evita duplicados**: busca previamente si el elemento ya existe.  
💡 **Configura correctamente el grupo del inventario** para evitar inconsistencias contables.  

#### 📌 Recursos adicionales 
- [Video: Configuración de elementos de inventario en ContaPyme](https://www.youtube.com/watch?v=8Ba07Ak4868&t=616s)

---

### ¿Cómo ocultar elementos sin rotación ni saldo?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo eliminar elementos obsoletos?
- ¿Cómo consultar elementos ocultos?
- ¿Cómo reactivar elementos ocultos?
- ¿Cómo depurar el catálogo de inventarios?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, ocultar elementos sin rotación ni saldo permite mantener el catálogo de inventarios limpio y organizado, evitando que aparezcan productos obsoletos o inactivos en las selecciones de documentos. 

**Pasos para hacerlo**
✅ **1. Ocultar un elemento de forma individual**  
👉 Ingresa al menú **Inventarios → Elementos del inventario**.  
👉 Busca el elemento que deseas ocultar.  
👉 Desmarca la opción **“visible en selección”**
👉 Haz clic en **Guardar**.

Esto no elimina el elemento, sólo los oculta para que no se puedan visualizar dentro del catálogo.

✅ **2. Ocultar elementos de forma masiva con plantilla Excel**  
👉 Descarga la plantilla desde el catálogo de elementos. (para generarla basta con dar clic derecho > utilidades > exportar elementos seleccionados/todo el catálogo a excel) 
👉 En la columna correspondiente, eleminia el valor para **“ visible en selección”** o márcalo como "F" (falso) 
👉 Importa la plantilla actualizada al sistema.

✅ **3. Usar la opción “Copiar valor en amarillo”**  
👉 Desde el catálogo de elementos, selecciona la columna **“Visible en selección”**.  
👉 Utiliza un elemento del inventario que ya tenga la opción de "visible en selección" apagada y cambia el valor de varios elementos a **No visible** usando la función **Copiar valor en amarillo** para múltiples registros.

**Recomendaciones**
💡 **Antes de ocultar**, verifica que el elemento no tenga movimientos pendientes o saldos.  
⚠️ **No elimines elementos activos**, solo márcalos como no visibles para evitar errores contables.  
✅ **Utiliza la opción masiva** si tienes muchos elementos inactivos para ahorrar tiempo.  
💡 **Mantén un control interno** de los elementos ocultos para futuras auditorías.

---

### ¿Por qué no permite subir elementos de inventario?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo cargar inventarios iniciales desde Excel?
- ¿Cómo importar elementos al catálogo sin errores?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, la carga de elementos o movimientos de inventario desde Excel depende del tipo de acción que se esté realizando:  
- **Cargue inicial de inventarios**  
- **Ajuste de inventario**  
- **Importación de elementos al catálogo**  

Cada proceso tiene requisitos específicos en cuanto a estructura de columnas y validación de datos. Si el sistema no permite subir la información, normalmente se debe a errores en la configuración o en la plantilla utilizada.

Posibles procesos en el módulo de inventarios:
- ¿Está realizando un **cargue inicial**?  
- ¿Está haciendo un **ajuste de inventario**?  
- ¿Está subiendo la **planilla para crear elementos** en el catálogo?  

Esto es clave porque la solución depende del tipo de operación.

**Casos frecuentes y cómo solucionarlos**

✅ **1. Para operaciones (cargue inicial o ajuste de inventario):**  
👉 El sistema no permite subir datos cuando:  
- Los **elementos no están creados previamente** en ContaPyme. Esto impedirá que la operación se pueda procesar con éxito
- Las **columnas de la planilla no coinciden** con las requeridas por la operación.  
- Se usan **códigos de bodegas inexistentes**.  

💡 **Solución:**  
- Verifica que todos los elementos y bodegas estén creados.  
- Usa la estructura exacta que muestra ContaPyme en la operación (copia las columnas tal cual).  

✅ **2. Para la planilla de importación de elementos (catálogo):**  
👉 Los errores más comunes son:  
- **Campos obligatorios eliminados** (como código, nombre, grupo de inventario).  
- Uso de **caracteres no permitidos** (símbolos especiales, espacios indebidos).  
- Columnas desordenadas o modificadas.  

💡 **Solución:**  
- Descarga la plantilla oficial desde ContaPyme.  
- No elimines ni modifiques columnas obligatorias.  
- Revisa que los datos cumplan con las validaciones (sin caracteres especiales).

**Recomendaciones**
💡 **Siempre usa las plantillas oficiales** que genera ContaPyme.  
⚠️ **No agregues ni elimines columnas** en la estructura original.  
✅ **Verifica la existencia de elementos y bodegas** antes de copiar y pegar datos.  
💡 **Si persiste el error**, crea un tiquete al equipo de soporte con el tema **“Inventarios”** adjuntando la planilla para que un asesor pueda revisar tu caso con detalle.

---

### "¿Cómo ingresar inventarios si hay poco conocimiento del sistema?"

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- “¿Dónde encuentro instrucciones para cargar inventario?”  
- “¿Qué hago si no sé manejar el módulo de inventarios?”  
- “¿Cómo aprendo a registrar mis existencias en ContaPyme?”  
- “¿Hay ayuda o soporte para ingresar inventarios?”

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Ingresar inventarios por primera vez puede parecer complejo si no se tiene mucha experiencia, sin embargo, el sistema está diseñado para realizar el paso a paso de una forma sencilla y ágil. Existen diversas rutas y recursos que te ayudan a entender cómo cargar correctamente tus existencias, incluso si apenas estás empezando.

**Recursos disponibles para comprender cómo adicionar inventario a ContaPyme:**  
1. ✔️ **Revisa la plataforma de capacitación virtual:**  
   Allí encontrarás cursos, tutoriales y guías paso a paso sobre cómo realizar el cargue inicial, registrar productos y manejar las bodegas. Es ideal para usuarios nuevos o en proceso de aprendizaje.  
2. ✔️ **Consulta las guías internas del sistema:**  
   Dentro del sistema, ingresa a **Pestaña Inventarios > Guía de montaje**.  
   Esta sección te muestra instrucciones detalladas y visuales para entender cómo funciona el módulo de inventarios.  
3. ✔️ **Define qué tipo de cargue necesitas:**  
   - **Cargue inicial:** si estás creando por primera vez tu inventario.  
   - **Ajustes de inventario:** si ya tienes productos registrados y deseas corregir o actualizar cantidades.  
   - **Factura de compra:** si deseas ingresar mercancía proveniente de un proveedor.  
4. ✔️ **Registra las cantidades con cuidado:**  
   Verifica la bodega, unidades, código del producto y el tipo de movimiento. Esto evitará inconsistencias en el saldo de los productos.  
5. ✔️ **Valida el resultado en los informes:**  
   Luego de guardar el movimiento, revisa el saldo del producto por bodega para asegurarte de que las unidades quedaron bien registradas.

**Casos comunes y cómo resolverlos:**  
- ⚠️ **No sé qué documento usar para ingresar inventario:**  
  Si estás empezando, lo más fácil es usar el **cargue inicial** o la **factura de compra** dependiendo del caso. Las guías de montaje explican cuándo usar cada uno.  
- ⚠️ **Tengo dudas durante el proceso:**  
  Puedes contactar al **equipo de soporte técnico**, quienes te guiarán paso a paso según tu situación específica.  
- ⚠️ **El inventario no aparece reflejado:**  
  Verifica si seleccionaste la bodega correcta o si el documento que usaste afecta inventario.

**Recomendaciones:**  
- 💡 Apóyate en la plataforma de capacitación: te permite aprender a tu ritmo.  
- 💡 Revisa siempre la guía de montaje antes de hacer un cargue inicial.  
- 💡 Si tienes muchas dudas, el soporte técnico puede ayudarte directamente y evitar errores que afecten tus reportes.

#### 📌 Recursos adicionales   
- [Curso: Módulo de inventarios en ContaPyme](https://www.youtube.com/watch?v=ActUvoat4tw) 
- [Video: Cargue inicial de inventarios](https://www.youtube.com/watch?v=KQproMVXsZY&t=100s)  
- [Video: Factura de compra](https://www.youtube.com/watch?v=X2Cw-DsJUkY&t=58s)  
- [Video: Ajustes de inventario](https://www.youtube.com/watch?v=Jx_-dgWQ2ng)  

---



### ¿Cómo subir el listado de máximos y mínimos del inventario?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo configurar stock mínimo y máximo en ContaPyme?  
- ¿Cómo cargar mínimos y máximos en Excel?  
- ¿Dónde se definen los niveles mínimos de inventario?
- ¿Dónde se definen los niveles mínimos de inventario?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El **listado de máximos y mínimos del inventario** en **ContaPyme** se puede configurar de forma individual por cada producto, pero también existe una forma **más rápida y ágil** para hacerlo de manera masiva.

En **ContaPyme** tienes dos opciones para subir o actualizar los **stocks mínimos y máximos** de los productos:

1. **Modificar cada elemento de forma individual**  
   Puedes ingresar al **catálogo de elementos de inventario**, abrir cada producto, dirigirte a la pestaña "Manejo inventario" y diligenciar los campos de datos stock:
   - **Stock mínimo**
   - **Stock máximo**

   Esta opción es funcional, pero puede ser dispendiosa cuando manejas muchos ítems.

2. **Cargar la información de forma masiva desde Excel (recomendado)**  
   La forma más práctica es **exportar el catálogo de elementos a Excel**, diligenciar allí la información y volver a cargar el archivo al sistema.

   El proceso general es:
   - Exportar el **catálogo de inventario** a Excel (usando clic derecho, utilidades, exportar a excel)
   - Diligenciar las columnas correspondientes a stock **mínimo y máximo**
   - Guardar el archivo
   - Importar nuevamente el Excel en **ContaPyme**

   Al realizar este proceso, el sistema:
   - Actualiza la información de forma **masiva**
   - Reduce errores manuales
   - Ahorra tiempo en la configuración

💡 **Importante:**  
Asegúrate de **no cambiar códigos ni estructura del archivo**, solo diligenciar las columnas correspondientes a mínimos y máximos, para evitar errores al momento de la carga.

Si necesitas ayuda con el formato del Excel o el proceso de carga, te recomendamos generar un **tiquete de soporte** para que un asesor especializado te acompañe paso a paso:  
👉 https://www.contapyme.com/portal-clientes/

---

### ¿Cómo registrar productos vencidos o deteriorados?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Cómo dar de baja inventario vencido?  
- ¿Cómo registrar productos dañados en inventarios?  
- ¿Cuál es la diferencia entre ajuste y deterioro de inventarios?  
- ¿Cómo reconocer el gasto por deterioro del inventario?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, los **productos vencidos o deteriorados** se pueden registrar de distintas formas, dependiendo de qué impacto deseas reflejar en el sistema: si necesitas **sacar físicamente el inventario** o solo **reconocer el deterioro contable**.

Para dar de baja o reconocer el deterioro de productos vencidos o dañados, tienes **dos opciones**:

1. **Operación de Ajuste de inventario**  
   Esta opción es ideal cuando:
   - El producto está **dañado, vencido o inutilizable**
   - Debe **salir definitivamente del inventario**
   - Se requiere ajustar las **cantidades físicas y contables**

   Al usar la operación de **Ajuste**, el sistema:
   - Disminuye las existencias del inventario
   - Refleja la salida real del producto
   - Registra el impacto contable correspondiente

2. **Operación de Deterioro de inventario**  
   Esta opción se utiliza cuando:
   - El producto sigue existiendo físicamente
   - Se requiere **reconocer el gasto por deterioro**
   - Solo se desea afectar la **contabilización NIIF**

   En este caso:
   - Las cantidades del inventario **no cambian**
   - Solo se reconoce el **deterioro contable** del valor del inventario


💡 **Importante:**  
La operación a utilizar dependerá de **qué necesitas reflejar exactamente**:
- **Salida real del inventario** → Ajuste de inventario  
- **Reconocimiento del deterioro contable** → Deterioro de inventario

#### 📌 Recursos adicionales   
- [Video: Ajustes de inventario](https://www.youtube.com/watch?v=Jx_-dgWQ2ng)  

---


## Inventarios plus
### ¿Cómo cerrar documentos pendientes?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo anular documentos pendientes?
- ¿Cómo consultar documentos cerrados?
- ¿Cómo reabrir un documento cerrado?
- ¿Cómo gestionar referencias entre operaciones?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, los documentos pendientes como **remisiones, recepciones, cotizaciones, órdenes de compra**, entre otros, representan operaciones que aún no han sido finalizadas. Cerrar estos documentos permite dar por concluida la transacción y evitar que queden abiertos en el sistema, lo que mejora la trazabilidad y el control de inventarios.

**Pasos para hacerlo**
✅ **1. Utiliza la operación de cierre de documentos**  
👉 Ingresa al manejador de operaciones y selecciona la operación "cierre de documentos"  
👉 Al abrir la operación podrás seleccionar el documento pendiente. (por tipo de operación y por referencia)
👉 Haz clic en la opción **Finalizar documento** para cerrar las referencias pendientes.

No olvides que en una sóla operación podrás cerrar varias referencias.

✅ **2. Cierre de operaciones pendientes al referenciar en la operación sucesora (recomendado)**  
👉 Cuando registres la operación sucesora (por ejemplo, una factura que referencia una cotización),  
👉 Marca la opción **Cerrar referencia**.  
👉 Esto dará por finalizada la transacción automáticamente.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Pantalla donde seleccionas la opción de cierre de documentos al referenciarla en la operación sucesora](https://www.contapyme.com/conocimientocontapyme/080_IN/referenciar_operacion_plus.png)

✅ **3. Verifica el estado del documento**  
👉 Consulta el documento en el catálogo para confirmar que aparece como **cerrado** en los exploradores de inventarios plus (ubicados en la pestaña Inventarios > exploradores)

**Recomendaciones**
💡 **Usa el cierre al referenciar en las compras, ventas, etc** para mantener la trazabilidad completa de las operaciones.  
⚠️ **Evita cerrar documentos con movimientos pendientes** para no generar inconsistencias.  
✅ **Revisa los permisos de usuario**: solo perfiles autorizados pueden cerrar documentos.  
💡 **Haz cierres masivos** únicamente cuando estés seguro de que no habrá operaciones posteriores.

#### 📌 Recursos adicionales 
- [Video: Operación de Cierre de documentos](https://www.youtube.com/watch?v=z17gRBlel04)

---

### ¿Cómo ajustar el inventario cuando las cantidades físicas y contables no coinciden?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Por qué no me cuadran las existencias físicas y contables?  
- ¿Cómo cerrar referencias en inventarios?  
- ¿Cómo ajustar inventario sin modificar meses anteriores?  
- ¿Qué hago si Inventarios Plus muestra diferencias?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Las diferencias entre el **inventario físico** y el **inventario contable** suelen presentarse cuando existen **referencias abiertas** en operaciones del **módulo de Inventarios Plus**, es decir, documentos que no han sido cerrados correctamente dentro de su trazabilidad.

En **ContaPyme**, lo ideal es ajustar estas diferencias siguiendo el orden lógico de las operaciones que afectan el inventario.

1. **Validar y cerrar correctamente las referencias**  
   Normalmente estas diferencias ocurren porque:
   - No se han cerrado todas las referencias de documentos de operaciones como remisiones, recepciones, ordenes de compra etc.
   - Existen operaciones parcialmente aplicadas.

   El proceso recomendado es:
   - Revisar la **trazabilidad del producto**
   - Identificar las operaciones donde se genera la diferencia
   - Usar la opción de **cierre** correspondiente dentro de cada operación de inventarios  

   Esto garantiza que las cantidades físicas y contables se ajusten de forma correcta y controlada.

2. **Cierre de documentos cuando no se pueden modificar meses anteriores**  
   Cuando las operaciones pertenecen a **periodos ya cerrados** y no es posible modificarlas, puedes proceder con un **cierre de referencias** utilizando la operación de **Cerrar documentos**.

   👉 Ruta en el sistema:  
   **Manejador de Operaciones**  
   → **Ventas** o **Compras** (según el tipo de documento)  
   → **Cerrar documentos**

   Esta operación permite:
   - Cerrar las referencias pendientes
   - Igualar las existencias entre los informes físicos y contables
   - Normalizar la información sin modificar registros históricos

💡 **Importante:**  
El cierre de documentos no modifica valores históricos de meses cerrados, sino que **ajusta las referencias pendientes**, permitiendo que los informes de inventario reflejen correctamente las cantidades.

Si después de estos pasos la diferencia persiste o no tienes claridad sobre qué documentos cerrar, te recomendamos generar un **tiquete de soporte** para que un asesor especializado revise tu caso:  
👉 https://www.contapyme.com/portal-clientes/

#### 📌 Recursos adicionales 
- [Video: Operación de cierre de documentos](https://www.youtube.com/watch?v=z17gRBlel04)


---

## Recosteo de inventarios
### ¿Cómo realizar recosteos sin afectar años anteriores?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo recostear un solo mes?
- ¿Cómo recostear un rango específico de fechas?
- ¿Cómo evitar recosteo en periodos cerrados?
- ¿Cómo verificar los resultados del recosteo?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el recosteo es el proceso mediante el cual se recalculan los costos de los elementos de inventario según los movimientos registrados. Esto es útil para corregir inconsistencias o actualizar costos, pero debe hacerse con cuidado para no modificar periodos contables cerrados o años anteriores.

**Pasos para hacerlo**
✅ **1. Ingresa al manejador de operaciones y dirígete a la opción de recosteo**  

✅ **2. Despliega las opciones del botón "recosteo" y selecciona el rango de fechas adecuado**  

👉 Despliega las opciones y elige el rango deseado:  
   - **Día específico**  
   - **Mes completo**  
   - **Año actual**  
   - **Rango personalizado (periodo)**  

⚠️ Es importante recordar que el sistema sugerirá recostear desde la fecha que considere necesaria si identifica inconsistencias en el costo de elementos del inventarios en fechas anteriores y que requieran ser corregidas.    

✅ **3. Ejecuta el recosteo**  
👉 Confirma la selección y haz clic en **Aceptar** para iniciar el proceso.  
👉 Verifica que el recosteo se aplique solo al periodo seleccionado.

✅ **4. Si el sistema solicita recosteo de años anteriores**  
👉 **No continúes** si no deseas modificar esos periodos.  
👉 Contacta al **departamento de soporte** para recibir asistencia y evitar afectaciones contables.

**Recomendaciones**
💡 **Siempre valida el rango de fechas** antes de ejecutar el recosteo.  
⚠️ **Evita recostear años cerrados** para no alterar información histórica.  
✅ **Haz una copia de seguridad** antes de realizar recosteos masivos.  


---


### ¿Cómo corregir errores al realizar recosteo de inventario?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- Tengo problemas al recostear el inventario
- ¿Cómo corregir inconsistencias al recostear el inventario?
- ¿Cuáles son los errores más frecuentes al hacer recosteo en ContaPyme?  
- ¿Por qué falla el recosteo en ContaPyme y cómo solucionarlo?   
- ¿Cómo identificar errores al ejecutar el recosteo en ContaPyme?  
- ¿Qué debo revisar cuando el recosteo no funciona correctamente en ContaPyme?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El recosteo en ContaPyme es un proceso que permite recalcular los costos de inventario con base en los movimientos registrados (compras, ventas, ajustes, etc.), garantizando que el costo de los productos refleje correctamente la realidad contable.

**¿Cuáles son los 5 errores más comunes al realizar recosteo y cómo solucionarlos?**

1. **Ejecutar el recosteo sin haber registrado todas las operaciones de inventario:** Verifica que todas las compras, ventas, traslados y ajustes estén correctamente contabilizados antes de ejecutar el recosteo.

2. **Fechas inconsistentes en los documentos o movimientos con fechas desordenadas que afectan la secuencia del costo** Asegúrate de que los documentos estén registrados en orden cronológico correcto.

3. **Documentos sin terminar o sin procesar:** Confirma que todos los documentos estén en estado **contabilizado y procesado** antes de realizar el recosteo.

4. **Configuración incorrecta de productos:** Revisa la configuración de los productos y valida que las cuentas contables estén correctamente definidas en el sistema, ya que si el sistema debe realizar algún ajuste en el costo en alguna transacción, lo hará en la cuenta configurada para dicho fin.

5. **Ejecutar el recosteo desde una fecha incorrecta o desde una fecha reciente ignorando movimientos anteriores:** Ejecuta el recosteo desde una fecha inicial adecuada (por ejemplo, inicio del periodo o desde el primer movimiento relevante).

Es posible que el sistema indique que debes corregir algunas operaciones antes de finalizar el proceso de recosteo. Esto ocurre generalmente cuando existen cantidades o costos negativos en los elementos. Por ello, es importante garantizar que las existencias y los costos estén correctamente gestionados dentro del sistema.

Recomendaciones:
👉  Si el sistema solicita recosteo de años anteriores, **No continúes** si no deseas modificar esos periodos.  
👉 Si tienes nuevos inconvenientes, contacta al **departamento de soporte** para recibir asistencia y evitar afectaciones contables.
👉 **Siempre valida el rango de fechas** antes de ejecutar el recosteo.  
⚠️ **Evita recostear años cerrados** para no alterar información histórica.  
✅ **Haz una copia de seguridad** antes de realizar recosteos masivos.  


---



## Cargue inicial de inventarios
### ¿Cómo pasar los saldos de inventario a una nueva área de trabajo?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo cargar inventarios iniciales desde Excel?
- ¿Cómo verificar los saldos después del cargue?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, pasar los saldos de inventario a una nueva área de trabajo consiste en trasladar las existencias y costos actuales para iniciar operaciones en un nuevo entorno, sin perder la información conciliada del inventario anterior. Este proceso se puede realizar fácilmente mediante un informe de inventarios y una operación de cargue inicial. (en la nueva área de trabajo de ContaPyme)

**Pasos para hacerlo**
**1. Genera el informe de saldos de inventarios** (puedes generarlo por centro de costos para mayor nivel de detalle)
👉 Ingresa al menú **Inventarios → Informes → Saldos de inventario**.  
👉 Verifica que el inventario tenga los saldos reales (incluidas las extistencias por elemento, costos unitarios y costos totales).

**2. Accede a la nueva área de trabajo**  
👉 Crea e ingresa a la nueva área de trabajo donde deseas cargar los saldos.  
👉 Confirma que la configuración inicial esté lista (bodegas, grupos de inventario, código de elementos, unidades a utilizar). Este paso es clave, pues de ello dependerá que puedas procesar la operación de cargue inicial una vez la finalices.

**3. Realiza la operación de cargue inicial**  
👉 Ingresa al manejador de operaciones > **Cargue inicial → Cargue inicial de inventarios**.  
👉 Registra las existencias y costos reales según el informe exportado.  
👉 Guarda la operación para establecer los saldos en la nueva área.

**Recomendaciones**
💡 **Realiza el cargue inicial en excel** para facilitar la importación de la información a ContaPyme: Para ello, podrás usar las mismas columnas que tiene la operación de cargue inicial para realizar el proceso de forma rápida y ágil.
💡 **Concilia el inventario antes de exportar** para evitar inconsistencias: Tener los saldos y costos correctos te evitará inconvenientes posteriores en la nueva área de trabajo y garantizará que tus transacciones estarán correctas. 
⚠️ **Verifica que los elementos existan en la nueva área** antes de cargar saldos.  
✅ **Usa el informe** para garantizar que los costos sean correctos.  
💡 **Haz una copia de seguridad** antes de realizar el cargue inicial.

 #### 📌 Recursos adicionales 
- [Video: Operación de cargue inicial de inventarios](https://www.youtube.com/watch?v=vzm87MR8ryQ)
- [Video: Ejemplo práctico de cargue inicial de inventarios](https://www.youtube.com/watch?v=KQproMVXsZY)

---


### ¿Cómo importar o cargar el inventario desde Excel sin errores?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo cargar inventarios iniciales desde Excel?
- ¿Cómo ajustar inventarios masivamente?
- ¿Cómo evitar errores al copiar y pegar datos en ContaPyme?
- ¿Cómo consultar los movimientos cargados?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
**Definición**
En **ContaPyme**, es posible cargar inventarios desde Excel para agilizar el registro masivo de información. Este proceso se realiza mediante operaciones específicas que permiten copiar y pegar datos desde una plantilla, evitando errores y garantizando la correcta actualización de existencias y costos.

**Pasos para realizarlo en ContaPyme**

✅ **1. Usa la operación de cargue inicial de inventarios**  
👉 Ingresa al menú **Manejador de operaciones → Más Operaciones → Cargue inicial > Cargue inicial de inventario**.  
👉 No existe una planilla específica, simplementa bastará con revisar las columnas requeridas en el sistema. Es decir, podrás armar tu propia plantilla en excel. Lo único que debes tener en cuenta es que las columnas en excel deben coincidir con la información que solicita la operación en el sistema.
👉 Completa las columnas tal cual aparecen en ContaPyme (código, bodega, cantidad, costo).  
👉 Copia y pega la información desde Excel al formulario del sistema.  
👉 Guarda la operación para establecer los saldos iniciales y no olvides indicar la cuenta de contrapartida a través de una operación de cargue inicial de cuentas para evitar descuadres contables en tu balance.

✅ **2. Alternativa: Operación de Ajuste de inventario**  
👉 Ingresa al menú **Manejador de operaciones → Operaciones de inventarios→ Ajuste de inventario**.  
👉 Completa las columnas específicas (elemento, bodega, cantidad, costo).  
👉 Copia y pega los datos desde Excel al formulario.  
👉 Guarda la operación para aplicar los ajustes.

(Esta operación genera su propio movimiento contable y su contrapartida, por lo tanto, no necesitarás una operación adicional de cargue inicial de cuentas)

**Recomendaciones**
💡 **Respeta el formato exacto de las columnas** para evitar errores al copiar y pegar.  
⚠️ **Verifica que los códigos de elementos y bodegas existan** antes de cargar datos.  
✅ **Conciliar el inventario antes de ajustes masivos** para evitar inconsistencias.  
💡 **Haz una copia de seguridad** antes de realizar cargues iniciales o ajustes.

#### 📌 Recursos adicionales 
- [Video: Operación de cargue inicial de inventarios](https://www.youtube.com/watch?v=vzm87MR8ryQ)
- [Video: Ejemplo práctico de cargue inicial de inventarios](https://www.youtube.com/watch?v=KQproMVXsZY)
- [Video: Operación de ajuste de inventarios](https://www.youtube.com/watch?v=Jx_-dgWQ2ng)

---

### ¿Cómo hacer que el inventario inicial aparezca como disponible?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo verificar la disponibilidad de existencias?
- ¿Cómo corregir errores en el cargue inicial?
- ¿Cómo conciliar inventarios después del cargue?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el inventario inicial se registra mediante la operación de **cargue inicial**, y su disponibilidad depende de la fecha, la bodega asignada y la correcta contabilización de la operación. Si el inventario no aparece como disponible, normalmente se debe a errores en la configuración o en el procesamiento de la operación.

**Casos frecuentes y cómo solucionarlos**

**1. Fecha de la operación**  
👉 El inventario solo estará disponible a partir de la fecha en que se registró el cargue inicial.  
💡 **Solución:** Verifica que la fecha del cargue sea igual o superior a la fecha en la que deseas usar el inventario.

**2. Bodega asignada**  
👉 Si el cargue inicial se realizó en la **bodega 1**, las existencias no estarán disponibles en la **bodega 2**.  

💡 **Solución:** Revisa en qué bodega se cargó la información y utiliza esa misma bodega en las operaciones posteriores. 

**3. Operación no procesada correctamente**  
👉 Si la operación de cargue inicial no está procesada, el inventario no se reflejará como disponible.  
💡 **Solución:** Confirma que la operación esté **procesada y contabilizada** en el sistema.

**4. Falta de contrapartida contable**  
👉 El cargue inicial requiere la operación complementaria de **cargue inicial de cuentas** para que el sistema reconozca el saldo y no genere un descuadre contable en el estado de situación financiera.

💡 **Solución:** Verifica que se haya realizado la contrapartida contable correspondiente.

**Recomendaciones**

💡 **Siempre revisa la fecha y la bodega** antes de usar el inventario inicial.  
⚠️ **No omitas la operación contable complementaria**, ya que afecta la disponibilidad.  
✅ **Conciliar el inventario** después del cargue inicial para confirmar que todo esté correcto.  
💡 **Si persiste el problema**, crea un tiquete al equipo de soporte con el tema **“Inventarios”**.

#### 📌 Recursos adicionales 
- [Video: Operación de cargue inicial de inventarios](https://www.youtube.com/watch?v=vzm87MR8ryQ)
- [Video: Ejemplo práctico de cargue inicial de inventarios](https://www.youtube.com/watch?v=KQproMVXsZY)

---


### "¿Cómo actualizar correctamente el inventario en el sistema?"

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- “¿Cómo ingreso nuevas unidades al inventario?”  
- “¿Dónde actualizo las existencias de mis productos?”  
- “¿Cómo hacer un ajuste de inventario en ContaPyme?” 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, actualizar el inventario significa registrar de forma correcta las entradas, salidas o ajustes de tus productos para que el sistema refleje cantidades reales. Esto es fundamental para evitar errores al facturar, mantener el control de existencias y asegurar que los reportes contables y operativos sean precisos.  
Dependiendo de lo que necesites hacer, podrás actualizar el inventario mediante **facturas de compra**, **ajustes de inventario** o **cargues iniciales**.

**Pasos para actualizar el inventario correctamente:**  
1. ✔️ **Identifica qué tipo de movimiento necesitas registrar:**  
   - **Entradas de mercancía:** cuando compras productos o agregas stock nuevo.  
   - **Salidas:** cuando corriges sobrantes o haces ajustes negativos.  
   - **Cargue inicial:** cuando estás registrando el inventario por primera vez.  

2. ✔️ **Elige el procedimiento adecuado según tu necesidad:**  
   - **Factura de compra:**  
     Registra aquí todas las entradas reales de inventario provenientes de proveedores. Esto garantiza trazabilidad y evita inconsistencias.  
   - **Ajuste de inventario:**  
     Útil cuando el inventario físico no coincide con el registrado. Puedes aumentar o disminuir unidades manualmente, según lo evidencie tu conteo.  
   - **Cargue inicial:**  
     Se usa únicamente al comenzar con ContaPyme o cuando se debe reemplazar la base inicial de existencias.  
   
3. ✔️ **Selecciona correctamente la bodega:**  
   Muchas inconsistencias se deben a registrar movimientos en una bodega distinta a la que se utiliza para facturar. Verifícalo antes de guardar.  

4. ✔️ **Guarda y revisa el kardex:**  
   Después del registro, consulta el **saldo** del producto por bodega para asegurarte de que el sistema reflejó correctamente el movimiento.

**Casos comunes y cómo resolverlos:**  
- ⚠️ **Actualicé el inventario, pero la factura sigue mostrando error:**  
  Puede que se haya registrado el movimiento en otra bodega. Revisa la bodega seleccionada en la factura y en el movimiento de inventario.  
- ⚠️ **Las cantidades suben o bajan sin razón aparente:**  
  Revisa si existen facturas anuladas, notas crédito o movimientos duplicados en el saldo del inventario. 
- ⚠️ **Tengo existencias físicas, pero el sistema dice que no:**  
  Revisa movimientos anteriores: pudo haberse registrado una venta o salida por error.

**Recomendaciones:**  
- 💡 Realiza conteos físicos periódicos para mantener la información alineada.  
- 💡 Verifica siempre la bodega antes de registrar un movimiento.  
- 💡 Controla quién tiene permisos para hacer ajustes: una mala edición puede alterar los reportes generales.

#### 📌 Recursos adicionales   
- [Video: Operación de cargue inicial de inventarios](https://www.youtube.com/watch?v=vzm87MR8ryQ)
- [Video: Operación de compra de un elemento de inventario](https://www.youtube.com/watch?v=cdEb7IgvfD0)
- [Video: Operación de ajuste de inventarios](https://www.youtube.com/watch?v=h8_NF5haLGo)

---

## Bodegas
### ¿Cómo eliminar o desactivar bodegas que ya no se usan?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo consultar bodegas ocultas?
- ¿Cómo reactivar una bodega desactivada?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el catálogo de bodegas permite identificar un espacio físico real donde se encuentran las existencias del inventario; además estas bodegas tendrán la configuración contable del inventario y de su control de existencias.
Aunque no se recomienda eliminar bodegas por temas de trazabilidad, es posible **desactivarlas** para que no se utilicen en nuevas operaciones, manteniendo la información histórica intacta.

**Pasos para hacerlo**
✅ **1. Accede al catálogo de bodegas**  
👉 Ingresa al menú **Inventarios → Bodegas**.  
👉 Busca la bodega que deseas desactivar.

✅ **2. Desactiva la opción "visible en selección"**   
👉 Guarda los cambios para que la bodega no aparezca en nuevas operaciones.

✅ **3. Verifica la trazabilidad**  
👉 Confirma que la bodega no sigue disponible para nuevas operaciones.

Recuerda que para reactivar una bodega, bastará con activar nuevamente la opción "visible en selección". Para ver todos las bodegas ocultas podrás dar clic en el botón "ver" (ícono de ojo) en el catálogo de bodegas.

**Recomendaciones**
💡 **No elimines bodegas con movimientos históricos**, ya que son datos clave para auditorías.  
⚠️ **Evita desactivar bodegas activas** con saldos o transacciones pendientes.  
✅ **Usa la opción “No visible en selección”** para mantener la integridad de la información.  
💡 **Documenta internamente** las bodegas desactivadas para control interno.

---

### ¿Cómo mover productos entre bodegas sin descuadrar contabilidad?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- ¿Cómo pasar inventario de una tienda a otra?
- ¿Cómo mover productos entre sedes sin afectar contabilidad?  
- ¿Cómo trasladar inventario cuando tengo dos puntos de venta?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando necesitas trasladar inventario entre bodegas, tiendas o sucursales en ContaPyme, la forma correcta de hacerlo es mediante la operación **Traslado entre bodegas**. Este movimiento ajusta las existencias sin generar inconsistencias en los costos. Es la vía segura para mantener inventarios coherentes y trazables entre puntos de almacenamiento.  

**👉 Pasos para realizar un traslado entre bodegas**

1. **Ingresa al manejador de operaciones**  
   Ve al menú principal y selecciona **Inventarios → Traslado entre bodegas**.

2. **Elige la bodega origen y destino**  
   - Selecciona la bodega desde la cual saldrá el producto.  
   - Selecciona la bodega a la cual llegará el inventario.  
   ⚠️ *Verifica que ambas bodegas estén activas y correctamente configuradas.*

3. **Agrega los productos a trasladar**  
   - Ingresa el código o selecciónalos desde el buscador.  
   - Define las cantidades a mover.  

4. **Guarda y confirma el traslado**  
   - Revisa el detalle antes de finalizar.  
   - Da clic en **Guardar** para completar la operación.  
   ✅ El inventario disminuirá en la bodega origen y aumentará en la destino.

**Recomendaciones**
- 👉 Revisa periódicamente las existencias para evitar diferencias entre bodegas.    
- 👉 Ten presente que esta operación generará un movimiento contable y un movimiento de inventarios.

#### 📌 Recursos adicionales 
- [Video: ¿Cómo trasladar productos entre bodegas?](https://www.youtube.com/watch?v=9hvIbk8IJ_I)

---

## Facturación y ventas
### "¿Por qué aparece un error de unidades al facturar?"

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- “¿Qué significa que no tengo unidades disponibles al facturar?”  
- “¿Por qué ContaPyme no me deja hacer una factura si tengo inventario?”  
- “¿Cómo soluciono el error de existencias insuficientes?”  
- “¿Por qué mis unidades no coinciden con lo que estoy facturando?”

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, este mensaje aparece cuando el sistema identifica que no hay suficientes unidades disponibles en inventario para facturar un producto. Esto ocurre porque el sistema tiene activo el **control estricto de existencias**, una configuración que evita que se registren ventas por encima del stock real.  
Si el sistema detecta que las unidades requeridas superan las que tienes registradas, bloqueará la factura para proteger la integridad del inventario y evitar inconsistencias contables.

**Pasos para solucionar el error:**  
1. ✔️ **Consultar las existencias actuales:**  
   Ve al módulo de inventarios, genera un informe que te permita validar los saldos del inventario y revisa cuántas unidades tiene el producto. Esto te permitirá confirmar si el faltante es real o si se debe a un registro incompleto.  
2. ✔️ **Corregir la cantidad de inventario según el caso:**  
   - **Factura de compra:** Úsala si realmente ingresaron productos nuevos y aún no los has registrado.  
   - **Ajuste de inventario:** Ideal cuando el conteo físico no coincide con el registro del sistema. Puedes aumentar o disminuir existencias.  
   - **Cargue inicial:** Se utiliza cuando apenas estás configurando el inventario por primera vez o cuando estás corrigiendo la base inicial.  Ideal si estás intentando realizar una venta y aún no has cargado tu inventario.
3. ✔️ Después de actualizar las existencias, vuelve a la factura e intenta procesarla nuevamente. Si el inventario ya es suficiente, el sistema permitirá continuar sin mostrar el error.

**Casos comunes y cómo resolverlos:**  
- ⚠️ **Hay existencias, pero sigue apareciendo el error:**  
  Puede deberse a que el producto está registrado en una bodega distinta a la que estás utilizando para facturar. Revisa la bodega seleccionada en el documento.  
- ⚠️ **El inventario aparece en negativo:**  
  Esto significa que en algún momento se vendieron unidades sin haberlas registrado primero. Revisa movimientos recientes o ajustes mal realizados.  (Esto sólo podrá suceder si se desactiva el control de existencias en el elemento del inventario)
- ⚠️ **El producto seleccionado no es el correcto:**  
  En ocasiones se elige un código o referencia similar pero diferente. Confirma que el ítem facturado coincide exactamente con el que tiene inventario disponible.  

**Recomendaciones:**  
- 💡 Revisa periódicamente los reportes de saldos de inventario para detectar inconsistencias a tiempo.  
- 💡 Configura niveles mínimos de inventario para recibir alertas y evitar quedarte sin existencias.  
- 💡 Mantén un proceso claro de registro de compras para evitar faltantes inesperados.
- 💡 No olvides realizar conteos físicos constantemente para garantizar que el inventario se encuentra actualizado.

#### 📌 Recursos adicionales   
- [Curso: Inventarios gestión básica > Sección informes y consultas de inventario](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD130)


---

### "¿Por qué el sistema permite facturar con inventarios negativos?"

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- “¿Por qué me deja facturar sin existencias?”  
- “¿Por qué mi bodega no controla inventario?”   
- “¿Qué configuración controla las existencias en ContaPyme?”

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, es posible facturar aún cuando un producto presenta inventarios negativos debido a que el sistema depende de **dos configuraciones clave** que determinan cómo se controla la existencia:  

1. **El control de existencias del elemento (producto).**  
2. **El control de existencias de la bodega.**

La interacción entre estas dos configuraciones define si el sistema permitirá (o no) facturar sin suficiente inventario. Cuando una de ellas no está alineada, el sistema puede autorizar ventas aunque no haya existencias disponibles, lo que a su vez puede generar **inventarios negativos y posteriores ajustes automáticos de costos**.

**¿Cómo funcionan estas dos configuraciones?**

**1. Control de existencias en el elemento (producto)**  
Es la configuración principal e indica si el sistema debe validar que un producto tenga unidades disponibles antes de permitir la salida (venta, remisión, ajuste negativo, etc.).

**2. Control de existencias en la bodega**  
Complementa la configuración del elemento. Permite decidir si cada bodega controla o no las existencias de los productos que almacena.

Cuando ambas configuraciones están activas, el sistema **bloquea** la facturación si no hay existencias suficientes.

**¿Qué sucede según cada combinación de configuraciones?**

**1. Control en el elemento activado** pero el Control en la bodega desactivado  
➡️ **El sistema permite facturar con inventario negativo.**

¿Por qué?  
Porque, aunque el producto tenga control, la bodega NO lo está controlando. En este escenario, ContaPyme procesará la venta, pero luego realizará **correcciones en el costo** cuando se ingrese la venta o se ajusten existencias, para normalizar el valor del inventario.

Este es uno de los escenarios más frecuentes que generan inventarios negativos.

**2. Control en el elemento desactivado** pero el control en la bodega activado  
➡️ **El sistema permite facturar con inventario negativo.**

¿Por qué?  
Porque ContaPyme prioriza **la configuración del elemento**, no la de la bodega. Si el producto no tiene control de existencias, el sistema simplemente no verificará disponibilidad, sin importar que la bodega sí lo tenga activo.

En otras palabras:  
> **Si el elemento no controla existencias, nunca habrá control real.**

**3. Ambos controles ACTIVOS**  
➡️ **El sistema NO permite facturar si no hay existencias.**  
Esta es la configuración recomendada si la empresa quiere manejar inventario estricto.

**4. Ambos controles DESACTIVADOS**  
➡️ **El sistema permite facturar sin restricciones.**  
Esto suele causar diferencias entre inventario físico y contable y genera saldos negativos fácilmente.

**Casos comunes y cómo resolverlos**

- ⚠️ **Se facturó sin existencias porque la bodega no tenía control activado.**  
  Solución: activar el control en la bodega y revisar el saldo del inventario para ajustar los negativos.

- ⚠️ **El producto tenía control apagado por error.**  
  Solución: activar el control en el elemento y hacer el respectivo ajuste para normalizar existencias.

- ⚠️ **El sistema está corrigiendo costos en los movimientos de la operación de ventas.**  
  Esto ocurre cuando el inventario negativo se regulariza al registrar compras.  
  Solución: revisar movimientos pendientes y validar que las facturas estén registradas.

- ⚠️ **Inconsistencias por configuraciones mixtas.**  
  Es común que los usuarios activen sólo un control y olviden el otro.  
  Solución: alinear ambos controles según la política de inventario de la empresa.

**Recomendaciones:**
- 💡 Activa SIEMPRE el control de existencias en **producto y bodega** para evitar negativos.  
- 💡 Revisa periódicamente las configuraciones si manejas varias bodegas.  
- 💡 Si ves costeo extraño o movimientos en rojo, revisa si hubo facturación con inventario negativo.  

#### 📌 Recursos adicionales   
- [Video: Configuración del elemento del inventario](https://www.youtube.com/watch?v=8Ba07Ak4868&t=381s)  
- [Video: Configuración de las bodegas](https://www.youtube.com/watch?v=D87CVKltra8&t=440s)


---


### "¿Cómo activar el cuadre de caja?"

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
- “¿Cómo controlar turnos de caja en ContaPyme?”  
- “¿Cómo funciona el cuadre de caja por usuario?”  
- “¿Por qué no aparece el reporte de caja?”  
- “¿Cómo activar el manejo de caja registradora?”  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el manejo del cuadre de caja se activa a través de una configuración sencilla que permite controlar los turnos de trabajo del cajero, registrar el valor base de la caja y generar informes detallados por usuario, equipo y turno. Esta función es ideal para empresas que requieren un seguimiento preciso del dinero recibido y del comportamiento de cada cajero.

Para que el cuadre de caja funcione, el primer paso consiste en activar la configuración directamente en el usuario que tendrá control sobre la caja registradora.  

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde especificas si el usuario requiere control de caja](https://www.contapyme.com/conocimientocontapyme/080_IN/control_de_caja_cajero.png)  

Una vez activado, cada vez que este usuario inicie sesión en ContaPyme, el sistema abrirá automáticamente un **turno de trabajo**, solicitando el registro del **valor base** con el cual inicia la caja. Además, se puede habilitar una restricción para que el cajero únicamente pueda visualizar **sus propias operaciones**, evitando que consulte movimientos registrados por otros usuarios.

La activación del manejo de turnos no solo controla las operaciones del cajero, sino que también habilita informes especializados que permiten realizar un seguimiento constante del dinero recaudado, del desempeño del usuario y de los cierres de caja realizados en cada turno.

**Pasos para activar el cuadre de caja:**

1. Ingresar a la configuración del usuario que operará la caja.
2. Activar la opción **Requiere control de caja**.
3. (Opcional) Marcar la opción que restringe al cajero para visualizar solo sus propias operaciones.
4. Guardar los cambios.
5. Cerrar sesión e ingresar nuevamente con el usuario configurado.
6. Registrar el **valor base** de la caja cuando el sistema lo solicite.
7. Continuar con el registro habitual de las operaciones de venta y recaudo.

**Casos comunes y cómo resolverlos**

- ⚠️ **El sistema no solicita el valor base al iniciar sesión.**  
  *Solución:* verificar si el usuario realmente tiene activado el manejo de turnos y el cuadre de caja y si el turno anterior quedó abierto o no.

- ⚠️ **El cajero puede ver operaciones de otros usuarios.**  
  *Solución:* revisar que la opción de restricción esté activada en su configuración.

- ⚠️ **Los informes no muestran turnos o valores.**  
  Esto ocurre cuando el usuario no ha cerrado correctamente su turno anterior.  
  *Solución:* validar el cierre del turno y generar nuevamente el informe.

- ⚠️ **El cuadre final no coincide con el efectivo real.**  
  Puede deberse a operaciones sin registrar o errores del cajero.  
  *Solución:* revisar el historial del turno y validar con los documentos emitidos.

**Recomendaciones:**

- 💡 Activa siempre la restricción para que el cajero solo vea sus operaciones si deseas mayor control.  
- 💡 Realiza cierres de turno diarios para evitar acumulación de operaciones.  
- 💡 Supervisa periódicamente los informes de caja por usuario y equipo.  
- 💡 Capacita al cajero sobre la importancia de registrar correctamente el valor base.  

#### 📌 Recursos adicionales 
- [Video: Activación y manejo del usuario cajero](https://www.youtube.com/watch?v=nIpDnkl6Pao&t=179s)  
- [Video: Valor base para iniciar turno del usuario cajero](https://www.youtube.com/watch?v=NtdDKN-RM3I&t=41s)  
- [Video: Informe de cuadre de caja](https://www.youtube.com/watch?v=vSwgm89bl14) 

---


# ¿Cómo visualizar descuentos, cantidades y unidad en la factura?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Dónde veo los descuentos en una factura?  
- Como ver la información completa de la factura

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Los **descuentos, cantidades y unidades** de los productos registrados en una factura en **ContaPyme** se pueden visualizar directamente desde la operación o en el formato de impresión.

En **ContaPyme** tienes dos formas de consultar esta información:

1. **Al imprimir la factura**  
   Cuando realizas la **impresión de la factura**, el sistema incluye en el formato:
   - **Cantidad**
   - **Unidad**
   - **Descuentos**, si el documento los maneja  

   Esto te permite validar claramente el detalle de cada producto en el documento impreso o en PDF.
   
💡 **Importante:**  
Si en la impresión no se muestran estos datos, es recomendable validar el **formato de impresión** configurado para la factura.

2. **Visualizando la operación**  
   También puedes consultar esta información directamente desde el sistema:
   - Ubica la factura en el **explorador**
   - Haz **clic derecho** sobre la operación
   - Selecciona **Visualizar operación**

   Allí podrás ver el **detalle completo** de la factura, incluyendo cantidades, unidades y descuentos aplicados.

3. **Revisar informe detallado por factura**  
   También puedes consultar esta información directamente desde un informe especializado que permita revisar estos datos. 
   
   Por ejemplo, puedes generar el informe de ventas por factura ubicado en la ruta: Inventarios > Informes > Ventas > Ventas por factura, así como también el informe de Reporte de facturas de venta, ubicado en inventarios > Informes > Ventas > Control de facturas > Reporte de factura de ventas

---


## Inventarios Plus
### "¿Por qué el sistema muestra saldos negativos en inventario físico?"

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- “¿Por qué mi inventario físico aparece en negativo pero sé que sí tengo mercancía?”  
- “¿Por qué Inventarios Plus muestra existencia negativa?”  
- “¿Qué pasa si remisiono sin haber recibido la mercancía del proveedor?”  
- “¿Por qué el inventario físico y contable no coinciden?”

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el inventario físico puede mostrar saldos negativos cuando el sistema detecta que, según los movimientos registrados, han salido más unidades de las que han ingresado. Sin embargo, es importante entender **qué es exactamente el inventario físico en ContaPyme**, porque funciona de forma distinta al inventario contable.

El inventario físico **se mueve con las operaciones del módulo de Inventarios Plus**, es decir, con documentos como **remisiones, recepciones de mercancía, ordenes de compra, etc.**  Esto significa que un producto puede disminuir o aumentar físicamente **sin necesidad de que exista aún una factura contable** de compra o venta.

Por este motivo, es posible ver inventario físico negativo incluso si *técnicamente* no hay un error contable, sino simplemente una operación pendiente por completar.

Además, los saldos negativos también pueden aparecer si el **control estricto de existencias estaba desactivado** y luego se volvió a activar. Mientras está apagado, el sistema permite registrar salidas sin stock; al volverlo a activar, esas inconsistencias quedan expuestas.

**Ejemplo clave para entenderlo:**  
- Si registras en Inventarios Plus una **recepción de mercancía** (operación física), el inventario sube.  
- Pero si esa mercancía aún **no ha sido facturada por el proveedor**, el inventario contable *todavía* no ha aumentado.  
- Del mismo modo, si remisionas mercancía a un cliente y el proveedor aún no ha entregado oficialmente lo comprado, puede verse un saldo físico negativo en un producto, aunque en la realidad estés “a la espera” de recibirlo.

Esto no siempre significa que “tienes inventario negativo”, sino que el **flujo físico y contable aún no está alineado**.

**Pasos para identificar y corregir saldos negativos en inventario físico:**  
1. ✔️ **Revisa un informe de saldos de disponibilidad de inventario:**  
   Allí verás exactamente qué operaciones de Inventarios Plus han movido el inventario físico.  

2. ✔️ **Valida si hay operaciones pendientes por completar:**  
   - ¿Se registró una recepción de mercancía pero aún no se ha creado la factura de compra?  
   - ¿Se remisionó mercancía al cliente sin haber recibido previamente la mercancía del proveedor?  
   Esto puede causar saldos físicos negativos aunque el inventario contable esté bien.  

3. ✔️ **Verifica el estado del control de existencias:**  
   Si estuvo desactivado, el sistema permitió salidas sin disponibilidad. 

4. ✔️ **Corrige según el caso:**  
   - Registra la **factura de compra** asociada a la recepción.  
   - Realiza un **ajuste positivo** si físicamente sí tienes las unidades.  
   - Revisa y corrige operaciones duplicadas o cargadas en la bodega incorrecta.

5. ✔️ **Consulta nuevamente el saldo del inventarios y las existencias:**  
   Después de ajustar, confirma que el saldo físico ya no aparezca negativo.

**Casos comunes y cómo resolverlos:**  
- ⚠️ **El proveedor aún no ha entregado la factura:**  
  El inventario físico ya subió por la recepción, pero si remisionas productos antes de registrar la compra, puede verse negativo. Solución: registrar la factura.  

- ⚠️ **Se remisionó mercancía sin existencias físicas previas:**  
  Muy frecuente cuando el control de existencias estaba apagado.  

- ⚠️ **Entradas en una bodega y salidas en otra:**  
  Revisar la bodega utilizada en cada operación.

- ⚠️ **Ajustes negativos mal aplicados en Inventarios Plus:**  
  Revisar documentos recientes.


**Recomendaciones:**  
- 💡 Mantén alineado el flujo físico y contable: registra las facturas de compra lo antes posible.  
- 💡 Revisa el saldo del inventario periódicamente para detectar movimientos inconsistentes.  
- 💡 Activa el control estricto de existencias desde el inicio para evitar diferencias.  
- 💡 Verifica siempre la bodega correspondiente en cada movimiento.

#### 📌 Recursos adicionales   
- [Curso: Inventarios gestión básica > Sección informes y consultas de inventario](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD130) 

---


