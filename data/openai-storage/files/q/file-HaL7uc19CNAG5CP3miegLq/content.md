# guia_funcional_modulos.md
---

## Módulo: Contabilidad (CN)

**Propósito:**
Gestionar de forma integral todos los registros, análisis y reportes contables de la empresa, automatizando los asientos, cálculos de impuestos, cierres, conciliaciones y reportes financieros, tanto en contabilidad local como en NIIF.
Permite cumplir con la normatividad tributaria, generar información confiable para la toma de decisiones y mantener la trazabilidad total de cada movimiento contable en sincronía con los demás módulos de ContaPyme.

---

### ✅ Permite
- Configurar el plan de cuentas inicial y modificarlo según las necesidades de la empresa.
- Registrar **movimientos contables manuales o automáticos**, con afectación simultánea en contabilidad local y NIIF.
- Importar y exportar movimientos contables hacia otros sistemas.
- Generar **informes legales y financieros**, como estados financieros, anexos, libros oficiales y reportes tributarios.
- Calcular y contabilizar automáticamente **impuestos** (IVA, retención en la fuente, reteICA, etc.).
- Ejecutar **cierres mensuales y anuales**, con traslado automático de cuentas de resultado y provisiones.
- Gestionar políticas contables, notas y revelaciones asociadas a los estados financieros.
- Realizar conciliaciones bancarias automáticas, detectando diferencias y generando ajustes.
- Elaborar y controlar presupuestos, comparando la ejecución real con lo planeado.
- Generar **información exógena / medios magnéticos** bajo los formatos exigidos por la DIAN.
- Registrar y analizar transacciones en **moneda extranjera**, con ajuste automático por diferencia en cambio.
- Crear y analizar estados de flujos de efectivo (método directo e indirecto).
- Generar informes interactivos y comparativos en tiempo real, exportables a Excel o integrados con ContaExcel.
- Automatizar **acciones de fin de mes**, como provisiones, depreciaciones, amortizaciones o intereses.
- Mantener control de documentos contables y numeraciones, garantizando trazabilidad y cumplimiento legal.

---

### 🚫 No permite
- Emitir **facturas, notas crédito o documentos soporte** (funcionalidad de los módulos Facturación y Gastos).
- **Gestionar cartera o pagos** directamente (funcionalidad del módulo Cartera y Proveedores).
- Registrar o liquidar nómina, prestaciones o PILA (funcionalidad del módulo Nómina).
- Crear órdenes de compra, remisiones o recepciones de materiales (funcionalidad de Inventarios Plus).
- Administrar inventario físico ni costos de productos (funcionalidad de Inventarios o Costos de Producción).
- Enviar documentos electrónicos a la DIAN (propio de los módulos electrónicos de Facturación, Nómina y Gastos).

---

### 🔍 Palabras clave
contabilidad, asientos contables, movimiento contable, plan de cuentas, estados financieros, medios magnéticos, exógena, conciliación bancaria, impuestos, cierre contable, NIIF, flujo de efectivo, política contable, notas a los estados financieros, presupuestos, anexos tributarios, certificados tributarios.

---

### 🔗 Relación con otros módulos
- **Básico:** utiliza su plan de cuentas, tipos de documentos, terceros y centros de costos.
- **Cartera y Proveedores:** recibe los movimientos de cuentas por cobrar y pagar, abonos, pagos e intereses.
- **Inventarios y Facturación:** contabiliza automáticamente ventas, compras, devoluciones y ajustes de inventario.
- **Nómina:** recibe las provisiones, pagos y prestaciones sociales registradas en la nómina.
- **Activos Fijos:** contabiliza adquisiciones, depreciaciones, valorizaciones, bajas y deterioros.
- **Costos de Producción:** integra movimientos para costeo y análisis por centro de costos o proceso.
- **Presupuesto y Ejecución Presupuestal:** compara presupuestos vs. ejecución real.
- **ContaExcel / Indicadores:** se conecta para análisis financiero, indicadores de gestión y reportes personalizados.

---

## SubMódulo: Conciliación Bancaria Automática (CB)

**Propósito**
El Submódulo de Conciliación Bancaria Automática (CB), perteneciente al módulo de Contabilidad, tiene como propósito **agilizar y automatizar el proceso de conciliación de cuentas bancarias**, comparando los registros contables del sistema con los movimientos reales reportados por las entidades financieras.
Permite identificar rápidamente diferencias entre ambos registros, generar los asientos contables de ajuste y mantener actualizados los saldos de las cuentas bancarias con total precisión.
Este módulo está orientado a optimizar el control financiero, reducir errores manuales y facilitar la trazabilidad de los movimientos de caja y bancos.

---

### ✅ Permite
- **Importar extractos bancarios** en formatos XLS, CSV o TXT, provenientes de diferentes bancos.
- **Conciliar automáticamente** los movimientos del extracto con los registros contables de las cuentas de bancos.
- **Identificar y clasificar las notas débito y crédito** del extracto bancario de forma automática.
- **Generar asientos contables automáticos** para registrar las diferencias o movimientos no encontrados en los registros contables.
- **Definir reglas y conceptos de conciliación** por tipo de movimiento bancario (depósitos, cheques, transferencias, comisiones, etc.).
- **Configurar características específicas por cuenta bancaria**, como número de cuenta, banco, tipo de movimiento y método de conciliación.
- **Llevar control detallado de los movimientos bancarios**, exigiendo opcionalmente número de referencia o cheque.
- **Manejar múltiples cuentas bancarias simultáneamente**, con independencia de conciliación.

---

### 🚫 No permite
- **Registrar movimientos contables manuales** (funcionalidad del módulo **Contabilidad**).
- **Procesar pagos o cobros de cartera** (funcionalidad del módulo **Cartera y Proveedores**).
- **Registrar gastos, compras o facturas** (funcionalidades de los módulos **Gastos** y **Facturación**).
- **Administrar cuentas bancarias o flujos de caja** (funcionalidad del módulo **Contabilidad**).
- **Transmitir archivos electrónicos a entidades bancarias** (proceso realizado externamente o mediante integración adicional).

---

### 🔍 Palabras clave
conciliación bancaria, extracto bancario, conciliación automática, notas débito, notas crédito, movimientos bancarios, cuentas de bancos, diferencias contables, ajustes bancarios, control financiero, extracto XLS, extracto CSV, conciliación mensual, control de cheques.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** registra los asientos automáticos generados durante la conciliación y mantiene actualizados los saldos de las cuentas bancarias.
- **Cartera y Proveedores (CX):** utiliza la información de pagos y cobros para relacionar movimientos conciliados.
- **Gastos (GA):** permite asociar los movimientos bancarios con los pagos o egresos registrados.
- **Básico (BS):** provee el catálogo de cuentas bancarias y terceros vinculados al proceso de conciliación.

---

## Módulo: Presupuesto y Ejecución Presupuestal

**Propósito**
El módulo **Presupuesto y Ejecución Presupuestal** permite planear, controlar y analizar los presupuestos financieros y contables de la empresa.
Su propósito es brindar una visión comparativa entre lo **presupuestado** y lo **ejecutado**, facilitando el control de los recursos, la evaluación del desempeño económico y la toma de decisiones estratégicas basadas en datos.

---

### ⚙️ Permite
- Elaborar presupuestos contables detallados por empresa, centro de costos, cuenta contable, año o mes.
- Presupuestar saldos contables y distribuir automáticamente los valores entre períodos.
- Importar presupuestos desde hojas de cálculo Excel mediante copia y pegado.
- Consultar la ejecución presupuestal en exploradores dinámicos con filtros, agrupaciones y ordenamiento.
- Comparar valores ejecutados frente a los presupuestados, identificando variaciones y porcentajes de cumplimiento.
- Generar tablas comparativas acumuladas o sin acumular por centro de costos, mes o año.
- Exportar los resultados e informes en formatos Excel, HTML, XML o TXT.
- Visualizar totales agrupados por empresa, centro de costos, mes o año.

---

### 🚫 No permite
- Registrar operaciones contables o transacciones financieras directas, funcionalidad del módulo **Contabilidad**.
- Administrar inventarios o costos de producción, funciones propias de los módulos **Inventarios** y **Costos de Producción**.
- Definir políticas contables o realizar cierres contables, tareas exclusivas del módulo **Contabilidad**.
- Presupuestar unidades físicas o volúmenes de producción, ya que este módulo se centra en valores contables. Sin embargo, esta necesidad puede darse manejo desde el **módulo Costos de Producción**, utilizando órdenes de producción con las unidades a fabricar y comparando luego los informes de producción real.

---

### 🔍 Palabras clave
presupuesto, ejecución presupuestal, control presupuestal, planeación financiera, presupuesto contable, valores presupuestados, valores ejecutados, comparación presupuestado vs ejecutado, seguimiento presupuestal, control de gastos, centros de costos, planificación contable.

---

### 🔗 Relación con otros módulos
- **Contabilidad:** recibe los valores ejecutados desde los asientos contables registrados.
- **Sistema Básico:** utiliza la estructura de empresas y centros de costos definidos en el módulo básico.
- **Costos de Producción:** se complementa con este módulo para analizar la ejecución presupuestal de los procesos productivos, comparando los valores reales de costos frente a los montos presupuestados.
- **Análisis e Indicadores:** facilita la creación de indicadores y reportes gráficos para evaluar la ejecución presupuestal.

---

## Módulo: Nómina (NE, NO, NP)

**Propósito:**
Gestionar integralmente la información laboral de la empresa, incluyendo empleados, contratos, pagos y liquidaciones, cumpliendo con la normativa laboral y tributaria colombiana.
El módulo automatiza el cálculo de devengos, deducciones, aportes, provisiones y prestaciones sociales, además de generar y transmitir la **nómina electrónica** a la DIAN.
Su objetivo es optimizar los procesos de recursos humanos, garantizar el cumplimiento legal y mantener una integración contable completa con el resto del sistema.

---

### ✅ Permite
- Registrar y administrar empleados con su información personal, bancaria y contractual.
- Crear, modificar y liquidar contratos individuales o en bloque, incluyendo terminaciones e indemnizaciones.
- Configurar perfiles de contrato y conceptos de nómina personalizables, fórmulas de cálculo y manejo contable asociado.
- Registrar **novedades de nómina** (horas extras, incapacidades, licencias, bonificaciones, descuentos, etc.).
- Calcular automáticamente **salarios, deducciones, aportes a seguridad social y parafiscales**, según la normatividad vigente.
- Generar y contabilizar automáticamente los asientos contables de nómina y provisiones laborales.
- Liquidar prestaciones sociales (prima, vacaciones, cesantías e intereses) y gestionar sus provisiones.
- Generar el **archivo plano PILA** con los aportes a salud, pensión, ARL y parafiscales.
- Administrar proveedores de seguridad social con sus respectivos códigos PILA.
- Enviar automáticamente los comprobantes de pago de nómina a los empleados, con trazabilidad de aceptación o rechazo.
- Generar y transmitir **nómina electrónica y notas de ajuste** a la DIAN, cumpliendo con todos los requisitos técnicos.
- Generar reportes e informes detallados como:
  - Explorador de pagos y conceptos de nómina.
  - Explorador de contratos.
  - Certificado de ingresos y retenciones.
  - Certificados laborales.
  - Reportes de novedades y acumulados.
- Controlar ajustes automáticos de provisiones y conciliaciones de seguridad social.
- Integrar automáticamente la información con los módulos **Contabilidad**, **Cartera** e **Inventarios** para efectos contables y de costos.

---

### 🚫 No permite
- Emitir **facturas, notas crédito o documentos soporte** (funcionalidad del módulo Facturación, Inventarios y facturación o Gastos).
- Gestionar **compras o pagos a proveedores** (funcionalidad del módulo Cartera y Proveedores).
- Crear órdenes de compra o controlar inventarios (funcionalidad de Inventarios o Inventarios Plus).
- Registrar **activos, depreciaciones o amortizaciones** (funcionalidad de Activos Fijos).
- Calcular **costos de producción** ni distribuir costos indirectos (funcionalidad del módulo de Costos de Producción).
- Generar estados financieros o cierres contables (funcionalidad del módulo Contabilidad).
- Administrar presupuestos o comparar ejecución vs planeación (funcionalidad del módulo Presupuesto).

---

### 🔍 Palabras clave
nómina, empleados, contratos, liquidación, vacaciones, prima, cesantías, intereses, seguridad social, PILA, ARL, retención en la fuente, nómina electrónica, deducciones, devengos, novedades, provisiones, prestaciones sociales, certificado laboral, planilla, pagos, comprobante, archivo plano, DIAN.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** genera automáticamente los asientos contables de nómina, provisiones, aportes y retenciones.
- **Cartera y Proveedores (CX):** administra pagos de nómina y préstamos a empleados como cuentas por pagar o cobrar.
- **Inventarios (IN):** permite calcular y registrar comisiones sobre ventas o cartera.
- **Costos de Producción (CO):** integra los costos de mano de obra y tiempo empleado en procesos productivos.
- **Básico (BS):** usa la información de terceros (empleados) y centros de costos.
- **ContaExcel / Indicadores:** exporta datos de nómina para análisis de costos laborales, indicadores y reportes.

---

## Módulo: Facturación (FE)

**Propósito:**
Gestionar las operaciones de **ventas de bienes y servicios**, incluyendo la generación, envío y control de **facturación electrónica**, notas crédito y débito, devoluciones y cotizaciones.
El módulo centraliza los procesos comerciales de venta, garantiza el cumplimiento de las normas de la **DIAN**, automatiza el cálculo de impuestos y facilita la integración contable con los módulos de **Inventarios**, **Cartera** y **Contabilidad**.
Su objetivo es permitir a las empresas registrar, controlar y auditar todas las operaciones de venta con precisión, trazabilidad y cumplimiento tributario.

---

### ✅ Permite
- Registrar **facturas de venta** de productos o servicios, con manejo de impuestos automáticos y retenciones.
- Emitir y transmitir **facturas electrónicas** validadas ante la DIAN.
- Generar y aplicar **notas crédito** (para anulación o disminución de valor) y **notas débito** (para aumento de valor) cumpliendo los estándares de la DIAN.
- Crear y administrar **cotizaciones y prefacturas**, con posibilidad de convertirlas directamente en facturas sin redigitar información.
- Gestionar **devoluciones en ventas**, ajustando el inventario y las cuentas por cobrar de forma automática.
- Registrar **ventas de servicios**, **ingresos anticipados** o **alquiler de artículos**.
- Controlar **puntos de venta (POS)** con periféricos (lectores, datáfonos, balanzas, impresoras, etc.).
- Configurar y aplicar **múltiples listas de precios** según tipo de cliente o condición comercial.
- Emitir **facturas en bloque** para varios clientes de manera simultánea (ventas periódicas o recurrentes).
- Realizar facturación en **moneda extranjera** con conversión automática de tasas de cambio.
- Calcular y aplicar **impuestos automáticos** (IVA, retefuente, reteICA, entre otros).
- Generar **informes de ventas** por producto, cliente, período, vendedor o lista de precios.
- Emitir reportes de **cuadre de caja diario**, ventas por turno y comprobantes de ventas.
- Integrar la información con el módulo de **Inventarios** para el control de existencias y actualización de costos promedio.
- Integrar la información con el módulo de **Cartera**, generando automáticamente las cuentas por cobrar.
- Integrar la información con el módulo de **Contabilidad** para el registro contable de las ventas, impuestos y retenciones.

---

### 🚫 No permite
- Crear **órdenes de compra, requisiciones o recepciones de materiales** (estas funciones pertenecen al módulo **Inventarios Plus**).
- Gestionar **compras a proveedores ni devoluciones en compras** (funcionalidad de los módulos **Inventarios** o **Gastos**).
- Administrar **inventario físico o control de stock** (pertenece al módulo **Inventarios**).
- Realizar **pagos o cobros de cartera** (funcionalidad del módulo **Cartera y Proveedores**).
- Registrar **nómina o documentos soporte de compras** (funcionalidad de los módulos **Nómina** y **Gastos**).
- Contabilizar **movimientos manuales** fuera de las ventas (propio del módulo **Contabilidad**).
- Generar **presupuestos o análisis de ejecución** (funcionalidad del módulo **Presupuesto y Ejecución Presupuestal**).

---

### 🔍 Palabras clave
facturación, facturador, factura electrónica, ventas, POS, notas crédito, notas débito, devoluciones, cotización, prefactura, comprobante de venta, punto de venta, cuadre de caja, impuestos, IVA, retefuente, cliente, venta de servicios, ingreso, venta al por mayor, lista de precios, DIAN, documento electrónico.

---

### 🔗 Relación con otros módulos
- **Inventarios (IN):** controla existencias, costos promedio y salidas automáticas de productos al facturar.
- **Inventarios Plus (IP):** usa cotizaciones, pedidos y remisiones como documentos previos a la factura de venta.
- **Cartera y Proveedores (CX):** genera las cuentas por cobrar derivadas de las facturas emitidas y gestiona sus cobros.
- **Contabilidad (CN):** registra los asientos automáticos de ingresos, impuestos y retenciones generados en las ventas.
- **Nómina (NO/NP):** puede cruzar información para el cálculo de comisiones sobre ventas.
- **Básico (BS):** utiliza sus catálogos de terceros, tipos de documento, numeraciones y configuraciones de impuestos.
- **ContaExcel / Indicadores:** permite exportar la información de ventas para análisis de desempeño comercial y financiero.

---

## Módulo: Gastos (GA, AD)

**Propósito:**
Registrar, controlar y auditar los **gastos operativos, administrativos y financieros** de la empresa, garantizando el cumplimiento tributario con la **DIAN** mediante la emisión del **Documento Soporte en compras a no obligados a facturar**.
El módulo permite automatizar procesos contables y tributarios, registrar operaciones recurrentes, controlar amortizaciones y generar reportes detallados para una auditoría precisa y una gestión eficiente del flujo de efectivo.

---

### ✅ Permite
- **Registrar compras y gastos** de bienes o servicios, incluso sin conocimientos contables.
- **Emitir Documentos Soporte a no obligados** y sus correspondientes notas de ajuste según la normatividad de la DIAN.
- **Recibir facturas electrónicas** directamente al buzón de ContaPyme y registrarlas automáticamente en contabilidad.
- **Registrar eventos electrónicos** exigidos por la DIAN (recepción, aceptación, rechazo, acuse).
- **Administrar devoluciones de compras**, asegurando trazabilidad contable y documental.
- **Realizar pagos a terceros** desde la misma transacción de gasto, conciliando automáticamente cuentas por pagar y por cobrar.
- **Registrar gastos diferidos y amortizarlos automáticamente** por periodos, garantizando la correcta imputación contable.
- **Calcular impuestos automáticos** (IVA, retefuente, reteICA, retención de IVA, etc.) según tarifas vigentes y condiciones del gasto.
- **Registrar operaciones en moneda extranjera**, con ajustes automáticos por diferencia en cambio.
- **Ejecutar operaciones en bloque**, programando gastos recurrentes o masivos con valores fijos o calculados por fórmula.
- **Generar reportes contables, de compras y de control documental**, exportables a Excel, PDF o Word.
- **Auditar movimientos contables e inventarios** mediante exploradores interactivos.
- **Cumplir con la información exógena DIAN**, generando formatos actualizados y validados automáticamente.

---

### 🚫 No permite
- **Emitir facturas de venta ni notas crédito/débito** (funcionalidad del módulo **Facturación**).
- **Administrar inventarios o registrar existencias** (funcionalidad del módulo **Inventarios**).
- **Registrar nómina o pagos a empleados** (funcionalidad del módulo **Nómina**).
- **Gestionar cuentas por cobrar/pagar** a nivel de cartera (funcionalidad del módulo **Cartera y Proveedores**).
- **Realizar cierres contables ni generar estados financieros** (funcionalidad del módulo **Contabilidad**).
- **Definir órdenes de compra o requisiciones internas** (funcionalidad del módulo **Inventarios Plus**).
- **Controlar activos o depreciaciones** (funcionalidad del módulo **Activos Fijos**).

---

### 🔍 Palabras clave
gastos, compras, documento soporte, no obligados, DSNO, devoluciones, proveedores, pagos, egresos, gastos diferidos, amortización, retenciones, IVA, DIAN, eventos electrónicos, buzón de recepción, información exógena, operaciones recurrentes, control de gastos, impuestos automáticos, contabilidad de gastos.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** genera y sincroniza automáticamente los asientos contables de los gastos, impuestos y amortizaciones.
- **Cartera y Proveedores (CX):** registra los pagos o anticipos a proveedores y refleja las cuentas por pagar.
- **Inventarios (IN):** relaciona compras de productos o servicios que afectan existencias.
- **Inventarios Plus (IP):** recibe las órdenes de compra y recepciones que luego se transforman en facturas o gastos.
- **Básico (BS):** utiliza sus catálogos de terceros, tipos de documento y parámetros de impuestos.
- **ContaExcel / Indicadores:** exporta la información contable de gastos y costos para análisis financiero.

---

## Módulo: Cartera y Proveedores (CX)

**Propósito:**
Gestionar de forma integral las **cuentas por cobrar (CxC)** y **cuentas por pagar (CxP)** de la empresa, centralizando los procesos de cobro y pago para mantener un control eficiente del flujo de efectivo.
Este módulo automatiza la gestión de facturas, notas crédito/débito, préstamos y anticipos, brindando informes y exploradores interactivos que facilitan la conciliación contable, la planificación de pagos y la toma de decisiones financieras oportunas.

---

### ✅ Permite
- **Registrar y administrar cuentas por cobrar y por pagar**, tanto de clientes como de proveedores.
- **Aplicar pagos y cobros**, totales o parciales, a las facturas correspondientes, manteniendo los saldos actualizados.
- **Registrar notas crédito y débito** para ajustar los valores de las facturas emitidas o recibidas.
- **Controlar préstamos y anticipos** otorgados (CxC) o recibidos (CxP), con sus respectivas tablas de amortización.
- **Generar informes detallados** de cartera por edades y cuentas por pagar por vencimiento, facilitando la gestión del flujo de caja.
- **Consultar estados de cuenta por tercero**, con el detalle de movimientos, abonos, intereses y saldos pendientes.
- **Analizar créditos y deterioro de cartera**, identificando deudas de difícil cobro y calculando provisiones.
- **Usar exploradores interactivos** con filtros avanzados y auditoría en tiempo real de movimientos, notas y abonos.
- **Generar indicadores financieros**, como rotación de cartera, plazos de pago y concentración de deudas.
- **Exportar información a ContaExcel o ContaPyme para Excel**, para realizar análisis y reportes personalizados.
- **Configurar roles y permisos** (recaudo, cobranza, tesorería) para garantizar seguridad y trazabilidad en los procesos.
- **Conciliar automáticamente con contabilidad**, reflejando en tiempo real los movimientos de cobros, pagos e intereses.

---

### 🚫 No permite
- **Emitir facturas de venta ni documentos soporte** (funcionalidad del módulo **Facturación o Gastos**).
- **Registrar compras o gastos** (funcionalidad del módulo **Gastos o Inventarios**).
- **Realizar contabilización manual de movimientos contables** (funcionalidad del módulo **Contabilidad**).
- **Liquidar nómina ni gestionar préstamos a empleados** sin integración con el módulo **Nómina**.
- **Generar estados financieros o cierres contables** (funcionalidad del módulo **Contabilidad**).
- **Administrar presupuestos o conciliaciones bancarias automáticas** (funcionalidad del módulo **Contabilidad**).

---

### 🔍 Palabras clave
cartera, proveedores, cuentas por cobrar, cuentas por pagar, CxC, CxP, cobros, pagos, abonos, facturas, notas crédito, notas débito, anticipos, préstamos, crédito, intereses, vencimientos, flujo de caja, recaudo, tesorería, conciliación, reporte por edades, estado de cuenta, ContaExcel, rotación de cartera.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** sincroniza automáticamente los movimientos de cobros, pagos, intereses y notas, asegurando coherencia contable y actualización de los saldos financieros.
- **Facturación (FE):** recibe las facturas emitidas a crédito que se convierten en cuentas por cobrar.
- **Gastos (GA):** registra facturas de proveedores que se reflejan como cuentas por pagar.
- **Nómina (NE/NP):** permite registrar préstamos o anticipos a empleados y generar archivos planos para pagos masivos desde bancos.
- **Inventarios (IN):** integra las facturaas de venta, compras y devoluciones registradas a crédito con los movimientos de cliente y proveedores.
- **Básico (BS):** utiliza el catálogo de terceros, condiciones comerciales y bancos configurados para cada cliente o proveedor.
- **ContaExcel / Indicadores:** exporta información de cartera y pagos para construir reportes financieros o tableros de gestión.

---

## Módulo: Inventarios y Facturación (IN – FE)

**Propósito**
El módulo **Inventarios y Facturación (IN–FE)** permite gestionar de manera integral los procesos de **compras, ventas y control de existencias** dentro del sistema ContaPyme®.
Su propósito es garantizar el **registro, trazabilidad y control contable y físico de los bienes y servicios** comercializados por la empresa, cumpliendo con los **requisitos tributarios de la DIAN** (facturación electrónica, documento soporte, notas crédito/débito, etc.).
Este módulo unifica las operaciones de inventario, facturación y punto de venta (POS), asegurando que cada transacción afecte correctamente el inventario, la contabilidad y la cartera.

---

### ✅ Permite
- **Emitir facturas electrónicas de venta y servicios**, cumpliendo con la normatividad DIAN.
- **Registrar compras de productos o materias primas**, con impuestos y costos automáticos.
- **Gestionar cotizaciones, prefacturas**, convirtiéndolas en facturas o compras en un solo paso.
- **Registrar devoluciones en ventas y compras**, con su respectiva nota crédito o débito.
- **Controlar inventarios** mediante entradas, salidas, ajustes, traslados entre bodegas, deterioros y consumos.
- **Definir artículos, líneas, grupos y bodegas** con clasificación contable, impuestos y costos asociados.
- **Calcular automáticamente el costo promedio ponderado** y actualizar precios según parámetros configurados.
- **Manejar series, lotes y fechas de vencimiento o garantía**, asegurando trazabilidad de productos.
- **Integrar periféricos POS** (impresoras, datáfonos, balanzas y lectores de código de barras) para ventas rápidas.
- **Registrar facturación en bloque o en moneda extranjera**, con tasas de cambio automáticas.
- **Generar códigos de barras y listas de precios** personalizadas por cliente o canal de venta.
- **Generar informes** de ventas, compras, stock, rotación, costo promedio, márgenes, vencimientos, garantías, cuadre de caja y movimientos detallados de inventario.
- **Embodegar productos** o materiales adquiridos y controlar su costo de almacenamiento.

---

### 🚫 No permite
- **Registrar movimientos contables manuales** (funcionalidad del módulo **Contabilidad**).
- **Gestionar cuentas por cobrar o pagar, ni procesar pagos o cobros** (funcionalidad del módulo **Cartera y Proveedores**).
- **Registrar gastos operativos o documentos soporte DSNO sin inventario** (funcionalidad del módulo **Gastos**).
- **Controlar presupuestos, costos de producción o activos fijos** (funcionalidades de los módulos **Presupuesto**, **Costos de Producción** y **Activos Fijos**).
- **Registrar transacciones de nómina o prestaciones sociales** (funcionalidad del módulo **Nómina**).

---

### 🔍 Palabras clave
inventarios, facturación, ventas, compras, existencias, stock, productos, artículos, bodegas, POS, cotización, orden de compra, DSNO, devoluciones, notas crédito, notas débito, precio de venta, costo promedio, deterioro, traslados, series, lotes, vencimientos, IVA, retefuente, margen, cuadre de caja, documento soporte, facturación electrónica DIAN.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** genera los asientos automáticos de compras, ventas, impuestos, costos y ajustes de inventario.
- **Cartera y Proveedores (CX):** crea las cuentas por cobrar de facturas de venta y las cuentas por pagar de compras.
- **Gastos (GA):** permite registrar documentos soporte y pagos a no obligados cuando las compras no generan inventario.
- **Inventarios Plus (IP):** administra cotizaciones, pedidos, remisiones y órdenes de compra previas a su facturación.
- **Costos de Producción (CO):** utiliza los movimientos de inventario para calcular costos de materia prima y productos terminados.
- **Nómina (NO/NP):** calcula comisiones a vendedores ligados a ventas.
- **Básico (BS):** provee catálogos de terceros, tipos de documento, parámetros de impuestos y formatos de impresión.
- **ContaExcel / Indicadores:** permite exportar información de ventas, compras e inventario para análisis financiero y comercial.

---

## Módulo: Inventarios Plus (IP)

**Propósito**
El módulo **Inventarios Plus (IP)** amplía las funcionalidades del módulo de inventarios al incorporar la **gestión comercial y logística previa a las operaciones contables y de inventario**.
Su propósito es administrar documentos intermedios como **cotizaciones, pedidos, remisiones, órdenes de compra, recepciones y requisiciones internas**, garantizando la trazabilidad de las transacciones entre clientes, proveedores y bodegas.
Funciona como un módulo **de pre–facturación y pre–compra**, facilitando el control de compromisos comerciales, disponibilidad de stock y flujo de materiales antes de que los movimientos afecten inventarios o contabilidad.

---

### ✅ Permite
- **Crear y administrar cotizaciones, pedidos y remisiones** a clientes, con trazabilidad completa desde la solicitud hasta la facturación.
- **Generar órdenes de compra y recepciones de materiales** para proveedores, controlando fechas de entrega, vencimientos y cantidades.
- **Realizar devoluciones de remisiones y recepciones**, manteniendo la trazabilidad total del proceso.
- **Controlar la disponibilidad del inventario** considerando las entradas y salidas proyectadas.
- **Integrar documentos comerciales** con las operaciones de facturación y compras, evitando redigitación.
- **Realizar anticipos** a proveedores o recibir anticipos de clientes asociados a pedidos u órdenes de compra.
- **Definir plazos de vencimiento** y estados de documentos (vigente, próximo a vencer, vencido).
- **Personalizar estructuras de cotización**, incluyendo saludos, despedidas, anexos, tablas e imágenes.
- **Imprimir y exportar documentos** en formatos PDF, RTF o HTML.
- **Monitorear estados mediante un explorador tipo semáforo**, que muestra cotizaciones, pedidos y remisiones según su estado o avance.
- **Cerrar documentos automáticamente** al ser facturados o descartados (por ejemplo, cotización → factura o pedido → orden de compra).
- **Mantener trazabilidad completa** entre documentos comerciales y sus operaciones derivadas (compra, venta o devolución).

---

### 🚫 No permite
- **Registrar movimientos contables o de inventario reales** (funcionalidad de los módulos **Contabilidad** e **Inventarios**).
- **Emitir facturas, notas crédito o débito** (funcionalidad del módulo **Facturación**).
- **Registrar pagos, cobros o cuentas por pagar/cobrar** (funcionalidad del módulo **Cartera y Proveedores**).
- **Registrar gastos o documentos soporte DSNO** (funcionalidad del módulo **Gastos**).
- **Gestionar presupuestos o costos de producción** (funcionalidad de los módulos **Presupuesto** y **Costos de Producción**).
- **Transmitir documentos electrónicos a la DIAN**, ya que los documentos de este módulo no son de carácter fiscal.

---

### 🔍 Palabras clave
inventarios plus, cotizaciones, pedidos, remisiones, órdenes de compra, recepción de materiales, requisiciones internas, anticipos, disponibilidad de stock, documentos comerciales, trazabilidad, pre–factura, pre–compra, explorador tipo semáforo, control de vencimientos.

---

### 🔗 Relación con otros módulos
- **Inventarios (IN):** actualiza existencias y costos cuando los documentos de IP se convierten en operaciones reales de compra o venta.
- **Facturación (FE):** permite convertir cotizaciones, pedidos o remisiones en facturas sin redigitar información.
- **Cartera y Proveedores (CX):** genera las cuentas por pagar o cobrar derivadas de las operaciones confirmadas.
- **Contabilidad (CN):** registra los asientos automáticos al procesar los documentos provenientes de IP.
- **Nómina (NO/NP):** calcula comisiones cuando los pedidos o remisiones se transforman en ventas.
- **Básico (BS):** utiliza sus catálogos de terceros, tipos de documento y parámetros de impresión.

---

## Módulo: Activos Fijos (AF)

**Propósito:**
Administrar el ciclo de vida completo de los activos de la empresa —desde su adquisición hasta su baja— con control contable, fiscal y NIIF.
El módulo permite registrar, depreciar, valorizar, reclasificar o dar de baja activos de manera automatizada, garantizando la trazabilidad contable, el cumplimiento normativo y la integración con la contabilidad general.
Su objetivo es mantener actualizados los valores en libros y facilitar la toma de decisiones sobre inversión, reemplazo y control patrimonial.

---

### ✅ Permite
- **Registrar activos fijos** de forma individual o masiva, con ficha técnica detallada (grupo, ubicación, responsable, centro de costo, vida útil, valor, método de depreciación, etc.).
- **Automatizar la contabilización local y NIIF**, generando simultáneamente los asientos contables correspondientes en ambas bases.
- **Usar asistentes especializados** para registrar operaciones como:
  - **Compra o incorporación** del activo.
  - **Venta o baja** del activo (por retiro, donación, pérdida, etc.).
  - **Revaluación y mayor valor** (ajustes o valorizaciones según método NIIF).
  - **Deterioro y reversión del deterioro** (según valor en uso o valor razonable).
  - **Reclasificación de activos** entre grupos contables o centros de costo.
- **Calcular automáticamente la depreciación**, según los métodos:
  - Línea recta.
  - Unidades de uso o producción.
  - Mensual acelerada.
- **Visualizar la ficha técnica y el estado contable** del activo (costo histórico, depreciaciones acumuladas, valorizaciones, deterioros, valor residual y valor en libros actual).
- **Registrar impuestos en compras de activos**, llevando el IVA como un mayor valor del activo.
- **Controlar activos bajo NIIF**, incluyendo propiedades de inversión y activos mantenidos para la venta.
- **Consultar el historial del activo**, con trazabilidad completa de sus responsables, movimientos, centros de costos y operaciones asociadas.
- **Explorar gráficamente los activos**, mediante un explorador visual y otro contable que permite auditar depreciaciones, valorizaciones y deterioros.

---

### 🚫 No permite
- **Gestionar inventarios o existencias físicas** (funcionalidad del módulo **Inventarios**).
- **Emitir facturas de venta o notas crédito/débito** (funcionalidad del módulo **Facturación**).
- **Realizar contabilizaciones manuales** fuera del flujo de depreciación o movimientos automáticos (funcionalidad del módulo **Contabilidad**).
- **Registrar nómina ni pagos asociados a empleados** (funcionalidad del módulo **Nómina**).
- **Controlar presupuestos o ejecución financiera** (funcionalidad del módulo **Presupuesto y Ejecución Presupuestal**).

---

### 🔍 Palabras clave
activos fijos, depreciación, revaluación, deterioro, reclasificación, baja de activos, valor en libros, NIIF, costo histórico, valor residual, propiedades de inversión, activos mantenidos para la venta, ficha técnica, contabilidad de activos, valorización, amortización, control patrimonial.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** integra los registros automáticos de adquisición, depreciación, valorización y baja de activos, actualizando en tiempo real los saldos contables y los estados financieros.
- **Gastos (GA):** registra la compra de activos y los documentos soporte que originan su incorporación al catálogo de activos fijos.
- **Cartera y Proveedores (CX):** gestiona las cuentas por pagar asociadas a la adquisición de activos.
- **Presupuesto y Ejecución Presupuestal (PR):** compara la ejecución real de las compras de activos con el presupuesto aprobado.
- **Análisis e Indicadores / ContaExcel:** permite generar informes de depreciación, valorizaciones y estado patrimonial mediante tableros y hojas dinámicas.

---

## Módulo: Costos de Producción (CO)

**Propósito**
El módulo **Costos de Producción (CO)** convierte a ContaPyme® en un sistema completo de **contabilidad de costos**, permitiendo calcular y analizar los costos de producción de manera automatizada y precisa.
Su propósito es ofrecer herramientas para **asignar, distribuir y controlar los costos directos e indirectos** (mano de obra, insumos, materia prima, CIF, etc.) aplicando diferentes **métodos de costeo**.
Facilita el análisis de rentabilidad por centros de costos y órdenes de producción, garantizando información confiable para la toma de decisiones sobre eficiencia, precios y márgenes de utilidad.

---

### ✅ Permite
- Implementar diferentes **métodos de costeo** (por órdenes, por procesos, etc.).
- Calcular automáticamente los **costos unitarios y totales** de los productos elaborados.
- Registrar y distribuir **costos directos e indirectos** por centros de costos o procesos productivos.
- Automatizar la **contabilización de los costos de producción**, integrando los movimientos contables e inventarios.
- Definir **modelos de costeo** mediante lineas de producción,  órdenes de producción u órdenes de trabajo.
- Registrar **planillas de labores de mano de obra** y calcular su rendimiento o eficiencia.
- Controlar los **procesos de transformación** y traslado entre etapas de producción.
- Configurar **distribuidores y criterios de asignación** de costos según variables como horas, consumo, valor o unidades producidas.
- Generar **informes detallados y comparativos** de costos por proceso, centro de costos o período.
- Analizar **variaciones y desviaciones** entre los costos reales y los costos estándar planificados.
- Visualizar **cronogramas de labores y consumo de recursos** en los procesos productivos.

---

### 🚫 No permite
- **Registrar compras o ventas** de productos terminados (funcionalidad de los módulos **Inventarios** y **Facturación**).
- **Registrar gastos generales o administrativos** (funcionalidad del módulo **Gastos**).
- **Gestionar nómina o liquidación de empleados** (funcionalidad del módulo **Nómina**).
- **Registrar asientos contables independientes** (funcionalidad del módulo **Contabilidad**).
- **Emitir documentos electrónicos** (funcionalidad de los módulos **Facturación** y **Gastos**).
- **Realizar control físico de existencias** o ajustes de inventario (funcionalidad del módulo **Inventarios**).

---

### 🧠 Palabras clave
costos de producción, costeo, órdenes de producción, costos directos, costos indirectos, CIF, mano de obra, materia prima, transformación, centros de costos, variaciones, absorción, planilla de labores, contabilidad de costos.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** registra automáticamente los asientos de costos y su traslado a cuentas contables, permitiendo la integración total del costeo con los estados financieros.
- **Inventarios (IN):** alimenta los costos de materia prima, productos en proceso y terminados, actualizando el valor de las existencias.
- **Nómina (NP/NE):** utiliza la información registrada en los pagos de nómina para calcular los costos por mano de obra.
- **Básico (BS):** provee los catálogos de centros de costos, tipos de documento y estructura organizacional necesarios para el análisis y distribución de costos.

---

### 💡 Recomendación
Se recomienda para empresas manufactureras o de servicios con procesos productivos definidos y necesidad de **control detallado de costos**.
Para negocios con requerimientos más simples (solo materia prima o stock), se sugiere utilizar únicamente el módulo **Inventarios (IN)**.

---

## Módulo: Análisis e Indicadores (AI)

**Propósito**
El módulo **Análisis e Indicadores (AI)** está diseñado para ofrecer herramientas de **inteligencia analítica y control de gestión** dentro del ecosistema ContaPyme®.
Su propósito es permitir que gerentes, contadores y analistas construyan, personalicen y consulten **indicadores financieros, contables y administrativos** en tiempo real, utilizando los datos registrados en los diferentes módulos del sistema.
Mediante su integración con el complemento **ContaPyme para Excel**, el módulo facilita la creación de tableros, reportes y gráficos interactivos con actualización automática, transformando la información contable en conocimiento estratégico para la toma de decisiones.

---

### ✅ Permite
- **Conectar ContaPyme con Microsoft Excel®** mediante el complemento **ContaPyme para Excel**, accediendo a más de 150 fórmulas nativas (`=saldocuenta()`, `=ingresosventas()`, etc.).
- **Actualizar en tiempo real los indicadores** financieros, contables y de gestión, sin necesidad de exportar ni importar archivos manualmente.
- **Construir cuadros de mando e informes comparativos** por empresa, centro de costos, período, o cuenta contable.
- **Crear y personalizar gráficos de control** (barras, columnas, líneas o pastel) para visualizar la evolución de ingresos, gastos, márgenes, rentabilidad y flujo de caja.
- **Combinar datos de diferentes módulos** (contabilidad, inventarios, cartera, facturación, nómina, etc.) para obtener reportes integrales de desempeño.
- **Definir y guardar indicadores propios**, ya sea con fórmulas contables, ratios financieros o métricas personalizadas.
- **Comparar información histórica** y analizar variaciones por año, mes o centro de costos.
- **Exportar resultados e informes** directamente a Excel o PDF, con formatos listos para presentación gerencial.
- **Actualizar automáticamente gráficos e indicadores** al cambiar los datos de la contabilidad o cualquier otro módulo vinculado.

---

### 🚫 No permite
- **Registrar operaciones contables o administrativas**, como ventas, compras o pagos (funcionalidad de los módulos **Contabilidad, Facturación, Cartera y Gastos**).
- **Modificar datos o saldos de los módulos fuente**, ya que su función es únicamente analítica.
- **Emitir documentos electrónicos ni comprobantes contables.**
- **Gestionar presupuestos, provisiones o cálculos de nómina**, los cuales pertenecen a sus respectivos módulos (**Presupuesto, Costos, Nómina**).
- **Registrar o alterar inventarios físicos o costos de producción**, procesos que dependen de los módulos **Inventarios** y **Costos de Producción**.

---

### 🔍 Palabras clave
análisis, indicadores, reportes gerenciales, gráficos, métricas financieras, ContaPyme para Excel, ContaExcel, Excel conectado, KPIs, cuadros de mando, análisis comparativo, rentabilidad, desempeño empresarial, control de gestión.

---

### 🔗 Relación con otros módulos
- **Contabilidad (CN):** fuente principal de los datos financieros para generar indicadores y estados comparativos.
- **Inventarios (IN):** aporta información de costos, rotación, ventas y margen de productos.
- **Facturación (FE):** provee datos de ventas, ingresos y comportamiento comercial.
- **Cartera y Proveedores (CX):** permite analizar flujo de caja, rotación de cartera y plazos de pago.
- **Nómina (NP/NE):** suministra información de costos laborales, provisiones y prestaciones.
- **Costos de Producción (CO):** ofrece datos de costos directos e indirectos para análisis de rentabilidad.
- **Básico (BS):** administra los catálogos de centros de costos y terceros utilizados en los indicadores.

---

### ⚙️ Consideraciones
- El uso del complemento **ContaPyme para Excel** requiere **póliza vigente**.
- Para un desempeño óptimo, se recomienda **Excel versión 2007 o superior**.
- No requiere configuración contable adicional; utiliza directamente la información registrada en los módulos activos.

---

## Módulo: Múltiples Contabilidades

**Propósito**
El módulo **Múltiples Contabilidades** permite a contadores, asesores o empresas administrar varias contabilidades independientes desde un mismo computador o instalación de ContaPyme.
Su propósito es ofrecer una solución práctica para oficinas contables o usuarios que gestionan diferentes empresas, facilitando la creación, apertura, organización y control de cada contabilidad sin interferir con las demás.
Asegura independencia total de información, usuarios, catálogos y documentos, manteniendo un entorno ordenado, seguro y eficiente.

---

### ✅ Permite
- **Crear y administrar múltiples contabilidades o empresas** totalmente independientes dentro de un mismo sistema.
- **Definir diferentes áreas de trabajo**, organizando las bases de datos por carpetas separadas para cada empresa.
- **Asignar planes de cuentas únicos o personalizados** por contabilidad según el tipo de empresa (comercial, solidaria, de servicios, etc.).
- **Utilizar catálogos de terceros, documentos y configuraciones específicas** para cada empresa creada.
- **Abrir, cerrar, respaldar o restaurar contabilidades** desde una interfaz centralizada.
- **Controlar el acceso y la seguridad** de cada empresa mediante usuarios y permisos independientes.
- **Migrar información o duplicar estructuras base** (como plan de cuentas o catálogos) entre diferentes empresas.
- **Gestionar fácilmente entornos contables locales o en red**, sin interferencias entre licencias o áreas de trabajo.

---

### 🚫 No permite
- Registrar operaciones contables, ventas, compras o nómina directamente (estas funciones pertenecen a los módulos **Contabilidad**, **Facturación**, **Gastos**, **Cartera** o **Nómina**).
- Consolidar automáticamente balances entre empresas diferentes (la consolidación se realiza de forma manual o con herramientas analíticas como **Contapyme para excel**).
- Compartir bases de datos o catálogos comunes entre contabilidades independientes (cada empresa conserva su propia estructura).
- Realizar reportes unificados de varias contabilidades dentro del sistema (esto se logra con el módulo **Análisis e Indicadores**).

---

### 🔍 Palabras clave
múltiples empresas, varias contabilidades, contabilidad independiente, oficinas contables, áreas de trabajo, bases de datos, plan de cuentas independiente, licencias múltiples, manejo de empresas, usuarios contables, separación de información.

---

### 🔗 Relación con otros módulos
- **Sistema Básico:** utiliza los catálogos y configuraciones base (terceros, documentos, centros de costos) dentro de cada contabilidad.
- **Contabilidad:** se integra al crear, registrar y consultar los movimientos contables de cada empresa.
- **ContaPyme para Excel:** permite consolidar o analizar los resultados de múltiples empresas en hojas de cálculo externas.
- **Análisis e Indicadores:** facilita la creación de indicadores comparativos entre distintas contabilidades o períodos.

---

📄 **Resumen funcional:**
> El módulo **Múltiples Contabilidades** está diseñado para facilitar la gestión de varias empresas dentro de un mismo entorno de trabajo, garantizando independencia total entre contabilidades, flexibilidad en la configuración y eficiencia en el manejo de información contable y administrativa.

---

## Módulo: Sincronización entre Sucursales

**Propósito**
Permite mantener actualizados y consolidados los datos de la empresa entre diferentes equipos o sucursales cuando no es posible la conexión directa por red o Internet. Facilita la transferencia segura y comprimida de la información contable, administrativa y de inventarios entre sedes, garantizando la continuidad operativa y la coherencia de la información.

### ✅Permite
- Exportar e importar información entre sucursales o equipos sin conexión directa.
- Consolidar los datos registrados en distintas sedes de la empresa.
- Generar archivos comprimidos (ZIP) con la información necesaria para sincronizar.
- Enviar o recibir los archivos de sincronización por medios externos (correo, USB, etc.).
- Actualizar las bases de datos locales con los movimientos o registros más recientes.

### 🚫No permite
- Registrar transacciones o documentos comerciales directamente.
- Realizar operaciones contables, de facturación, nómina o inventarios.
- Sustituir la conexión en línea o el uso de servidores en red local.
- Ejecutar sincronización automática en tiempo real.

### 🔍Palabras clave
Sincronización, consolidación de datos, sedes, sucursales, importar datos, exportar empresa, actualizar información, enviar información, consolidar bases, zip de sincronización, respaldo entre sedes.

### 🔗Relación con otros módulos
- **Básico:** depende de las configuraciones generales de la empresa, usuarios y catálogos.
- **Contabilidad / Inventarios / Cartera / Nómina:** consolida información proveniente de estos módulos para mantener uniformidad entre las diferentes sedes.
- **Copia de seguridad:** complementario, ya que ambos mecanismos protegen la integridad de la información.
