# gen_modulos.md  
> **Propósito:**  
> Explicar la estructura general del sistema **ContaPyme®**, definiendo cada módulo, su objetivo, alcance y principales funciones.  
> Este documento permite que **Paty IA** identifique correctamente a qué módulo pertenece cada proceso o consulta del usuario y dirija las respuestas al contenido técnico correspondiente.
> **Tipo de documento:** Conocimiento base  
> **Versión:** 1.0  
> **Fecha:** 2025/11/05

## ⚠️ Advertencia semántica — Paquetes vs Módulos

Este documento **NO debe usarse** para responder preguntas sobre:
- qué incluye un paquete
- operaciones de un licenciamiento
- alcance funcional de un plan
- diferencias entre paquetes

Aunque un paquete habilita uno o varios **módulos**,  
**las operaciones descritas en este documento pertenecen exclusivamente al módulo**,  
**no al paquete ni al licenciamiento**.

👉 Las preguntas sobre paquetes, licencias, precios o qué incluye un plan
**DEBEN responderse únicamente** con:
- `pf_comercial_*`
- `gen_comercial.md`


# ContaPyme

## Descripción general

ContaPyme® es un ERP colombiano para micro, pequeñas y medianas empresas (MIPYMES) desarrollado por InSoft – Ingeniería de Software. El sistema combina contabilidad local y NIIF, cartera, facturación electrónica, nómina electrónica, inventarios, costos, punto de venta (POS), con total integración. Es un software administrativo y contable integral que simplifica procesos, cumple con la normativa de la DIAN y permite escalar el licenciamiento a medida que crece la empresa.

ContaPyme tiene como objetivo facilitar la gestión empresarial de las Pymes con un software simple, rápido y fácil de usar.

---

### Perfiles de clientes
- **Empresario Pyme/Comercio**: venta con POS o facturación, control de inventarios, compras, cartera, conciliación bancaria, reportes y comparativos.
- **Contadores/Oficinas contables**: manejo de **múltiples contabilidades**, automatización de medios magnéticos/exógena, estados financieros y NIIF con un solo registro.
- **Empresas de servicios o distribución**: cotizaciones, pedidos, remisiones, órdenes de compra, seguimiento de cartera por edades, control de costos y centros de costos.
- **Negocios con nómina**: generación y **transmisión de nómina electrónica** cumpliendo DIAN, integración contable automática.

---

### Propuesta de valor (beneficios clave)
- **Cumplimiento DIAN**: facturación electrónica (validación previa), **nómina electrónica**, **documento soporte** a no obligados, anexos y certificados tributarios, así como Información exógena automática.
- **Automatización**: asistentes contables para gastos/pagos/abonos, **impuestos automáticos** (IVA, retefuente, etc.), **asientos automáticos** de ventas/compras/ajustes.
- **Información al día**: informes contables/legales/financieros y tributarios, comparativas por mes/año/empresa/centro de costos; **indicadores en Excel** con actualización en tiempo real.
- **Escalabilidad y modularidad**: paquetes por etapa de negocio y **módulos** opcionales (conciliación bancaria, costos de producción, activos fijos, presupuestos, ContaExcel, etc.).
- **Usabilidad**: interfaz **simple, rápida y fácil de usar**; sistema POS; app móvil para fuerza de ventas (pedidos, cotizaciones, abonos) cuando aplique.
- **Soporte y portal**: portal de clientes con gestión de licencias, instaladores, actualizaciones, cursos, soporte y póliza de mantenimiento.

---

## Paquetes del licenciamiento

ContaPyme ofrece paquetes de licenciamiento en modalidad de **renta anual** o **compra permanente**, agrupados en tres líneas generales según el tipo de empresa y su necesidad operativa:

- **Paquetes contables:** Básico, Estándar, Plus y Premium.  
  Orientados a contadores independientes y firmas contables que requieren gestionar la contabilidad de múltiples empresas.

- **Paquetes comerciales:** Estándar, Plus y Premium.  
  Diseñados para empresas que necesitan módulos de inventarios, ventas y compras, con funcionalidades de facturación, punto de venta, nómina y cartera.

- **Paquetes empresariales:** Empresarial Plus y Empresarial Premium.  
  Pensados para empresas con mayor nivel de operación y control, incorporando módulos avanzados como inventarios plus, activos fijos y costos de producción total.

📌 **Nota importante:**  
Este documento describe la **estructura general del sistema y sus módulos**, pero **no detalla el alcance específico, características, operaciones ni condiciones comerciales de cada paquete de licenciamiento**.

Para conocer la información oficial, actualizada y completa sobre **qué incluye cada paquete o licenciamiento**, versiones disponibles y modalidades de licenciamiento, consulta la página oficial:  
👉 https://www.contapyme.com/precios/paquetes/cop/

---

## Módulos
Además de paquetes, los módulos se pueden adquirir individualmente (contabilidad, nómina, facturación, gastos, cartera y proveedores, activos fijos, conciliación bancaria automática, presupuestos, inventarios, inventarios plus, costos de producción total, ContaExcel e indicadores de gestión). Esto permite armar licencias a la medida.Los módulos son:
- BÁSICO (BS)
- CONTABILIDAD (CN)
- CARTERA (CX)
- GASTOS (GA)
- FACTURACIÓN (FE)
- INVENTARIOS (IN)
- INVENTARIOS PLUS (IP)
- NÓMINA BÁSICA (NE, NO)
- NÓMINA PLUS (NP)
- ACTIVOS FIJOS (AF)
- COSTOS DE PRODUCCIÓN (CO)

## Descripción de módulos funcionales

A continuación se describen los módulos principales de ContaPyme®, con sus propósitos, funcionalidades permitidas, restricciones y relaciones con otros módulos.

---

### MÓDULO SISTEMA BÁSICO (BS)

**Tipo:** Administrativo y estructural  

#### Descripción
El módulo **Sistema Básico (BS)** es el núcleo central de ContaPyme®.  
Permite gestionar la información esencial de la empresa y contiene todos los **catálogos, configuraciones y parámetros base** del sistema, asegurando que los demás módulos funcionen correctamente.  

Incluye catálogos fundamentales como **terceros, plan de cuentas, tipos de documento, operaciones, centros de costos y estructura organizacional**, además de herramientas de administración de usuarios, copias de seguridad e indicadores.  
Desde este módulo también se accede a configuraciones clave como **permisos, perfiles de seguridad y plantillas de impresión**, así como al complemento **ContaExcel (ContaPyme para Excel)**.

**Propósito:**  
El propósito del módulo **Sistema Básico** es **definir y administrar la estructura principal de la empresa dentro del sistema**, estableciendo las bases de datos, catálogos, tipos de documentos, parámetros de seguridad, centros de costos y operaciones sobre las cuales se integran todos los demás módulos de ContaPyme®.  

Su función es garantizar la **integridad, coherencia y personalización del entorno empresarial**, permitiendo configurar cada aspecto esencial antes de comenzar el registro de operaciones contables, administrativas o comerciales.

#### ✅Permite

##### Gestión de operaciones
- Manejador de operaciones: Administra y gestiona de manera eficiente todos los hechos contables y administrativos de tu empresa. Con esta herramienta, podrás acceder a todas las operaciones registradas, aplicar filtros personalizados y realizar tareas clave para el correcto funcionamiento de tu negocio.
- Clasificación de tipos de operación: Organiza las operaciones contables y administrativas mediante categorías definidas, facilitando su identificación y optimizando el control dentro del sistema.
- Explorador de operaciones: Consulta y gestiona de manera estructurada todas las operaciones registradas. Su diseño intuitivo te permite visualizar la información organizada, aplicar filtros avanzados y acceder a los detalles de cada transacción de forma rápida y eficiente.

##### Administración de la empresa
- Explorador gráfico de empresa: Visualiza de manera estructurada la organización de tu empresa, incluyendo sucursales, centros de costos y divisiones internas. Esta herramienta facilita el análisis de la estructura operativa y mejora la gestión administrativa.
- Gestión de centros de costos: Administra de forma detallada los centros de costos de tu empresa, permitiendo un control preciso de gastos e ingresos. Obtén informes detallados para una mejor toma de decisiones financieras.
- Clases de centros de costos: Organiza los centros de costos en categorías específicas según su función dentro de la empresa. Esta estructura facilita la distribución de costos y asegura un control contable más eficiente.
- Configuración de estructura organizacional: Define la jerarquía y unidades operativas dentro de la empresa, permitiendo una segmentación clara y un análisis detallado de la información para mejorar la gestión interna.
- Explorador de movimientos de la empresa: Accede en un solo lugar a todos los movimientos registrados en los diferentes módulos del sistema. Consulta operaciones clave con datos organizados por fechas, centros de costo, activos y valores para facilitar el control empresarial.

##### Gestión de terceros
- Catálogo de terceros: Registra y administra toda la información de clientes, proveedores, empleados y otros terceros con los que interactúa tu empresa. Mantén un control detallado y centralizado para una gestión eficiente.
- Clasificación de terceros: Asigna categorías a los terceros para facilitar su búsqueda y segmentación dentro del sistema. Perfiles de clientes y vendedores: Permite segmentar y categorizar los terceros según su función en la empresa.
Tipos de terceros y tipos de entidad: Identificación de terceros según su naturaleza (persona natural, jurídica, proveedor, cliente, etc.).
- Condiciones comerciales: Configura términos de pago, cupos de crédito y otras condiciones específicas para cada tercero, asegurando relaciones comerciales claras y bien administradas.
- Información tributaria y bancaria: Clasificación tributaria: Determina el régimen fiscal de cada tercero, facilitando el cumplimiento de obligaciones fiscales.
Bancos y cuentas bancarias: Registro de información financiera asociada a cada tercero para gestionar pagos y cobros de manera eficiente.

##### Administración de documentos
- Documentos de soporte: Parametriza los documentos que respaldan las transacciones contables y administrativas, como facturas y recibos de caja, asegurando el cumplimiento normativo y un control adecuado.
- Tipos de documentos internos y externos: Clasifica los documentos según su uso dentro de la empresa, permitiendo una consulta ágil y asegurando un orden administrativo eficiente.
- Automatización de consecutivos: Configura numeraciones automáticas para documentos, evitando duplicidades y errores en el registro de información.
- Formatos de impresión personalizados: Diseña facturas, recibos y órdenes de compra alineadas con la identidad visual de tu empresa, asegurando una presentación profesional en cada transacción.
- Parámetros de impresión y exportación: Define opciones de impresión y exportación en diferentes formatos, como PDF o Excel, facilitando la gestión documental y el intercambio de información.
- Control de plantillas por tipo de documento: Asigna formatos específicos a cada tipo de documento, garantizando coherencia y eficiencia en la generación de documentos administrativos.

##### Gestión de usuarios y permisos
- Administración de usuarios: Registra y configura los usuarios con acceso al sistema, estableciendo controles sobre las credenciales de ingreso y la seguridad de la información.
- Asignación de permisos por rol: Define niveles de acceso y restricciones según el rol de cada usuario, garantizando un uso seguro y adecuado del sistema.
- Historial de accesos y auditoría: Monitorea la actividad de los usuarios dentro del sistema, registrando ingresos y acciones realizadas para mayor control y trazabilidad.

##### Indicadores
- Indicadores de gestión: Genera reportes detallados con métricas clave sobre el desempeño financiero y administrativo de tu empresa, facilitando el análisis y la toma de decisiones estratégicas.
- Consultas dinámicas de información: Accede a datos en tiempo real con filtros personalizados, permitiendo un análisis ágil y preciso para optimizar la gestión empresarial.
- ContaPyme para Excel: Crea indicadores, gráficos y tableros de control personalizados desde Excel usando tu información contable registrada en ContaPyme

##### Copias de seguridad
- Respaldo manual de la base de datos: Realiza copias de seguridad en cualquier momento para proteger la información de tu empresa y prevenir pérdidas de datos.
- Programación automática de backups: Configura copias de seguridad automáticas, asegurando la continuidad de la información sin necesidad de intervención manual.
- Restauración de copias de seguridad: Recupera información desde un respaldo previamente almacenado en caso de errores o pérdidas de datos, garantizando la seguridad operativa.
- Copias de seguridad en la nube: Almacena tus backups en la nube para mayor seguridad y disponibilidad, permitiendo acceso rápido y protección contra fallos locales.

#### 🚫 No permite
- **Registrar operaciones contables, ventas, compras o nómina**, ya que solo define la estructura y catálogos base requeridos por otros módulos.  
- **Emitir documentos electrónicos o reportes tributarios** (funcionalidad de los módulos **Facturación, Nómina y Gastos**).  
- **Registrar transacciones financieras ni cálculos automáticos**, funciones propias de los módulos **Contabilidad, Cartera o Presupuesto**.  
- **Calcular impuestos, provisiones o costos de producción**, tareas específicas de otros módulos operativos.  
- **Consolidar información de múltiples empresas o sedes**, función del módulo **Múltiples Contabilidades** o **Sincronización entre Sucursales**.

#### Relación con otros módulos
Está **integrado totalmente** con todos los módulos de ContaPyme®, ya que proporciona los catálogos y configuraciones esenciales sobre los cuales operan las demás funcionalidades del sistema.

#### Palabras clave
básico, catálogos, terceros, operaciones, plan de cuentas, tipos de documento, configuraciones, centros de costos, usuarios, permisos, copias de seguridad, ContaExcel, indicadores, estructura organizacional, perfiles de seguridad, parámetros generales, configuración del sistema.

---

### MÓDULO CONTABILIDAD (CN)

**Tipo:** Contable y Financiero  

#### Descripción
Obtén un control total de tu contabilidad, desde los registros hasta los informes, integra tus procesos y obtén una visión completa de tu negocio.  
Este módulo permite simplificar la gestión contable y financiera. Te ofrece herramientas potentes para automatizar procesos, analizar datos y generar informes personalizados.  

Tendrás una visión clara y actualizada de la situación financiera de tu empresa, lo que te permitirá tomar decisiones informadas y estratégicas.

**Propósito:**  
Gestionar de forma integral todos los registros, análisis y reportes contables de la empresa, automatizando los asientos, cálculos de impuestos, cierres, conciliaciones y reportes financieros, tanto en contabilidad local como en NIIF.  
Permite cumplir con la normatividad tributaria, generar información confiable para la toma de decisiones y mantener la trazabilidad total de cada movimiento contable en sincronía con los demás módulos de ContaPyme.

#### ✅ Permite

##### Configuración inicial del plan de cuentas
- Catálogo de plan de cuentas según el sector (comercial, solidario, etc.): Proporciona plantillas de planes de cuentas adaptadas a diferentes sectores económicos, facilitando la implementación y configuración inicial del sistema.  
- Catálogo preconfigurado de plan de cuentas: Catálogo preconfigurado y listo para usar para facilitar el montaje y configuración inicial de la Contabilidad. Defina los usos de las cuentas, clases, datos requeridos y manejos específicos de las cuentas contables que utiliza su compañía.  
- Creación y modificación de cuentas para la generación de informes, estados financieros y certificados: Permite la creación y modificación de cuentas contables, adaptándolas a la estructura de la empresa. Adicionalmente, este catálogo permite la asignación de niveles y estructuras al plan de cuentas, facilitando la organización y el análisis de la información.

##### Creación de movimientos contables
- Operación de movimiento contable: Crea asientos contables adaptados a las necesidades específicas de la empresa, con la libertad de ingresar la información y realizar los ajustes que se requieran.  
Esta operación permite realizar asientos débitos y créditos sobre cualquier cuenta contenida en el catálogo de cuentas, con cargo a cualquier centro de costos y a cualquier tercero.  
- Registra cualquier tipo de transacción contable de forma rápida y sencilla, con la posibilidad de incluir información detallada y personalizada.  
- La operación de movimiento contable registra información para otros módulos diferentes al de contabilidad (presupuestal, activos fijos, cartera, conciliación bancaria, costos, inventarios, facturación, entre otros).  
- Realiza asientos contables afectando tanto la contabilización local como la NIIF, todo a través de un solo registro, pudiendo definir manualmente qué tipo de contabilización afecta.

##### Importación y exportación de movimientos contables
- Intercambia datos con otros sistemas y agiliza los procesos contables.  
- Simplifica la transferencia de información contable entre diferentes sistemas.  
- Importa movimientos contables externos y exporta datos para su análisis y presentación.

##### Generación de medios magnéticos / información exógena
- Genera reportes en formatos requeridos por la DIAN.  
- Incluye prevalidador DIAN para validar la información antes de generar los reportes.  
- Mantiene actualizados los formatos conforme a la normativa vigente.  
- Permite diligenciar los formatos en Excel e importarlos nuevamente a ContaPyme.

##### Conciliación automática de extractos bancarios
- Importa extractos bancarios en diversos formatos.  
- Compara automáticamente los registros bancarios con los contables.  
- Genera ajustes automáticos según las diferencias detectadas.

##### Elaboración y seguimiento de presupuestos
- Permite la elaboración de presupuestos detallados por empresa y centro de costos.  
- Facilita el seguimiento de la ejecución presupuestal.  
- Genera informes comparativos entre presupuesto y ejecución real.  
- Crea informes personalizables para análisis y toma de decisiones.

##### Generación de estados de flujos de efectivo
- Catálogo preconfigurado de flujos de efectivo.  
- Generación de flujos de efectivo por métodos directo e indirecto.  
- Análisis de la liquidez, fuentes y usos del efectivo.

##### Gestión de transacciones en múltiples divisas
- Registro de operaciones en diversas monedas.  
- Ajustes automáticos por diferencia en cambio.  
- Registro de tasas de cambio y generación de informes en diferentes divisas.  
- Conciliación bancaria tanto en moneda local como extranjera.

##### Informes y análisis contable
- Exportación total a Excel.  
- Exploradores contables e informes interactivos tipo consulta (drill down).  
- Estados financieros básicos: situación financiera, resultados, cambios en patrimonio, flujos de efectivo y notas a los estados financieros.  
- Libros legales: Mayor y Balances, Inventario y Balances, Caja Diario, Libro Oficial y Balance General Tributario.  
- Informes por cuenta, centro de costos o tercero.  
- Anexos tributarios, certificados y tablas comparativas entre períodos.  

##### Cálculo automático de impuestos
- Catálogo preconfigurado de impuestos (IVA, retenciones, etc.).  
- Cálculo automático de obligaciones tributarias.  
- Generación de anexos y certificados tributarios.  
- Actualización permanente de tarifas y bases.

##### Cierre contable mensual y anual
- Catálogo preconfigurado de acciones automáticas de fin de año.  
- Cierre automático de cuentas de resultados e ingresos/gastos.  
- Generación masiva de asientos de cierre y reapertura.  
- Generación de estados financieros con movimientos de cierre.

##### Políticas contables y revelaciones
- Configuración y documentación de políticas contables.  
- Generación de notas y revelaciones integradas a los estados financieros.  
- Catálogo de políticas contables y notas consultables para auditoría o informes NIIF.

#### 🚫 No permite
- Emitir **facturas, notas crédito o documentos soporte** (funcionalidad de los módulos *Facturación* y *Gastos*).  
- Gestionar **cartera o pagos** directamente (funcionalidad del módulo *Cartera y Proveedores*).  
- Registrar o liquidar **nómina, prestaciones o PILA** (módulo *Nómina*).  
- Crear **órdenes de compra, remisiones o recepciones** (módulo *Inventarios Plus*).  
- Administrar **inventario físico ni costos de productos** (módulos *Inventarios* o *Costos de Producción*).  
- Enviar **documentos electrónicos a la DIAN** (módulos *Facturación, Nómina y Gastos*).  

#### Relación con otros módulos

##### Cartera y Proveedores
Integra automáticamente los movimientos de cartera (facturas, pagos, notas crédito) con la contabilidad, asegurando la precisión de los saldos y conciliaciones.  
Causa intereses automáticamente mediante las acciones automáticas de fin de mes.

##### Inventarios
Actualiza en tiempo real los registros contables de los movimientos de inventario (entradas, salidas, ajustes, costos de venta, etc.), garantizando la valoración precisa y el control de existencias.

##### Nómina
Transfiere automáticamente los registros de nómina (salarios, prestaciones, deducciones, etc.) a la contabilidad, simplificando el registro de los gastos laborales.  
Incluye traslado automático de provisiones de prestaciones sociales al cierre de año y ajustes de provisiones con las acciones automáticas de fin de mes.

##### Activos Fijos
Registra automáticamente la adquisición, depreciación y venta de activos fijos en contabilidad.  
Calcula y registra la depreciación y amortización de diferidos según las normas contables vigentes.

##### Presupuesto
Compara la ejecución real de ingresos y gastos con el presupuesto, generando informes de variaciones para control y análisis financiero.

##### Costos de Producción
Activa automáticamente las cuentas de costos y las traslada al costo del producto en proceso.  
Realiza traslados automáticos entre centros de costos mediante las acciones de fin de mes.

##### ContaExcel
Permite generar informes contables en Excel, integrando datos y fórmulas directamente desde ContaPyme para análisis personalizados.

##### Seguridad y usuarios
Permite definir perfiles de seguridad específicos, limitando el acceso a información contable y garantizando la integridad de los datos financieros.

#### Palabras clave
contabilidad, plan de cuentas, asientos contables, medios magnéticos, exógena, conciliación bancaria, impuestos, cierre contable, NIIF, flujo de efectivo, políticas contables, presupuestos, anexos tributarios, certificados, libros legales, multimoneda.

---

### SUBMÓDULO CONCILIACIÓN BANCARIA AUTOMÁTICA (CB)

**Tipo:** Submódulo contable dependiente del módulo Contabilidad (CN)

#### Descripción
El Submódulo de **Conciliación Bancaria Automática (CB)**, perteneciente al módulo de Contabilidad, tiene como propósito **agilizar y automatizar el proceso de conciliación de cuentas bancarias**, comparando los registros contables del sistema con los movimientos reales reportados por las entidades financieras.  

Permite identificar rápidamente diferencias entre ambos registros, generar los asientos contables de ajuste y mantener actualizados los saldos de las cuentas bancarias con total precisión.  
Está orientado a optimizar el control financiero, reducir errores manuales y facilitar la trazabilidad de los movimientos de caja y bancos.

#### ✅ Permite
- **Importar extractos bancarios** en formatos XLS, CSV o TXT, provenientes de diferentes bancos.  
- **Conciliar automáticamente** los movimientos del extracto con los registros contables de las cuentas de bancos.  
- **Identificar y clasificar notas débito y crédito** del extracto bancario de forma automática.  
- **Generar asientos contables automáticos** para registrar las diferencias o movimientos no encontrados en los registros contables.  
- **Definir reglas y conceptos de conciliación** según el tipo de movimiento bancario (depósitos, cheques, transferencias, comisiones, etc.).  
- **Configurar características por cuenta bancaria**, como número de cuenta, banco, tipo de movimiento y método de conciliación.  
- **Llevar control detallado de los movimientos bancarios**, pudiendo exigir número de referencia o cheque.  
- **Conciliar múltiples cuentas bancarias simultáneamente**, de forma independiente.  

#### 🚫 No permite
- **Registrar movimientos contables manuales** (esta función pertenece al módulo **Contabilidad – CN**).  
- **Procesar pagos o cobros de cartera** (funcionalidad del módulo **Cartera y Proveedores – CX**).  
- **Registrar gastos, compras o facturas** (funcionalidades de los módulos **Gastos – GA** y **Facturación – FE**).  
- **Administrar cuentas bancarias o flujos de caja** (propio del módulo **Contabilidad – CN**).  
- **Transmitir archivos electrónicos a bancos** (proceso externo o mediante integración adicional).  

#### Relación con otros módulos
- **Contabilidad (CN):** registra los asientos automáticos generados durante la conciliación y mantiene actualizados los saldos contables de las cuentas bancarias.  
- **Cartera y Proveedores (CX):** utiliza los datos de pagos y cobros para relacionar movimientos conciliados.  
- **Gastos (GA):** permite vincular los movimientos bancarios con los pagos o egresos realizados.  
- **Básico (BS):** provee el catálogo de cuentas bancarias y terceros asociados al proceso de conciliación.  

#### Palabras clave
conciliación bancaria, extracto bancario, conciliación automática, notas débito, notas crédito, movimientos bancarios, cuentas de bancos, diferencias contables, ajustes bancarios, control financiero, extracto XLS, extracto CSV, conciliación mensual, control de cheques.

---

### MÓDULO PRESUPUESTO Y EJECUCIÓN PRESUPUESTAL (PR)

**Tipo:** Planeación y control financiero

#### Descripción
El módulo **Presupuesto y Ejecución Presupuestal** permite planear, controlar y analizar los presupuestos financieros y contables de la empresa.  
Su propósito es brindar una visión comparativa entre lo **presupuestado** y lo **ejecutado**, facilitando el control de los recursos, la evaluación del desempeño económico y la toma de decisiones estratégicas basadas en datos.  

Este módulo proporciona herramientas para estructurar presupuestos detallados, distribuir valores por períodos y realizar análisis de cumplimiento con base en la información contable registrada en el sistema.

#### ✅ Permite
- **Elaborar presupuestos contables** detallados por empresa, centro de costos, cuenta contable, año o mes.  
- **Presupuestar saldos contables** y distribuir automáticamente los valores entre períodos.  
- **Importar presupuestos desde Excel** mediante funciones de copia y pegado.  
- **Consultar la ejecución presupuestal** a través de exploradores dinámicos con filtros, agrupaciones y ordenamiento.  
- **Comparar valores ejecutados frente a los presupuestados**, identificando variaciones, diferencias y porcentajes de cumplimiento.  
- **Generar tablas comparativas acumuladas o no acumuladas**, por centro de costos, mes o año.  
- **Exportar resultados e informes** en formatos Excel, HTML, XML o TXT.  
- **Visualizar totales agrupados** por empresa, centro de costos, mes o año.  

#### 🚫 No permite
- **Registrar operaciones contables o transacciones financieras directas** (funcionalidad exclusiva del módulo **Contabilidad – CN**).  
- **Administrar inventarios o costos de producción**, funciones propias de los módulos **Inventarios – IN** y **Costos de Producción – CO**.  
- **Definir políticas contables ni realizar cierres contables**, tareas exclusivas del módulo **Contabilidad – CN**.  
- **Presupuestar unidades físicas o volúmenes de producción**, ya que este módulo se centra en valores contables.  
  > En caso de requerir control sobre cantidades o unidades productivas, puede complementarse con el **módulo Costos de Producción (CO)**, comparando los presupuestos con los valores reales de las órdenes de producción.  

#### Relación con otros módulos
- **Contabilidad (CN):** recibe automáticamente los valores ejecutados a partir de los asientos contables registrados, lo que permite comparar la ejecución real frente al presupuesto.  
- **Sistema Básico (BS):** utiliza la estructura de empresas, centros de costos y períodos definidos en el módulo básico.  
- **Costos de Producción (CO):** se complementa para analizar la ejecución presupuestal de procesos productivos, comparando los valores reales frente a los presupuestados.  
- **Análisis e Indicadores (AI):** permite crear indicadores financieros y reportes gráficos basados en la ejecución presupuestal.  

#### Palabras clave
presupuesto, ejecución presupuestal, control presupuestal, planeación financiera, presupuesto contable, valores presupuestados, valores ejecutados, comparación presupuestado vs ejecutado, seguimiento presupuestal, control de gastos, centros de costos, planificación contable.

---

### MÓDULO CARTERA Y PROVEEDORES (CX)

**Tipo:** Gestión de cuentas por cobrar y por pagar

#### Descripción
El módulo de **Cartera y Proveedores** permite gestionar de manera integral y automatizada todas las transacciones relacionadas con las cuentas por cobrar y las cuentas por pagar.  
Simplifica el seguimiento de los flujos de efectivo, optimiza procesos de cobro y pago, y proporciona la información esencial para una toma de decisiones financiera estratégica y oportuna.

**Propósito:**  
Gestionar de forma integral las **cuentas por cobrar (CxC)** y **cuentas por pagar (CxP)** de la empresa, centralizando los procesos de cobro y pago para mantener un control eficiente del flujo de efectivo.  
Este módulo automatiza la gestión de facturas, notas crédito/débito, préstamos y anticipos, brindando informes y exploradores interactivos que facilitan la conciliación contable, la planificación de pagos y la toma de decisiones financieras oportunas.  

#### ✅ Permite

##### Gestión de cuentas por cobrar y por pagar
- **Registro de cuentas por cobrar y por pagar:** permite el ingreso detallado de las facturas emitidas a clientes y las recibidas de proveedores a crédito, asignando términos de pago y condiciones comerciales como plazos, cuotas o intereses.  
- **Aplicación de pagos y cobros:** facilita el registro de pagos recibidos de clientes y pagos realizados a proveedores, permitiendo la aplicación parcial o total a las facturas correspondientes.  
- **Gestión de notas crédito y débito:** permite registrar y aplicar notas crédito y débito, ajustando los saldos de clientes y proveedores de forma precisa y transparente.

##### Informes de cartera y proveedores
- **Reporte de cartera por edades:** genera informes detallados que clasifican las cuentas por cobrar según su antigüedad, facilitando la identificación de deudas morosas y la gestión de cobranza.  
- **Reporte de cuentas por pagar por edades:** organiza las obligaciones con proveedores según su vencimiento, optimizando la planificación de pagos y la gestión del flujo de caja.  
- **Estado de cuenta detallado por tercero:** ofrece un resumen completo de todas las transacciones y saldos pendientes con cada cliente o proveedor.  
- **Informe de estado del crédito:** muestra las tablas de amortización de los créditos otorgados o recibidos, detallando capital, intereses y saldos pendientes por cuota.

##### Informes tipo explorador
- **Exploradores de movimientos de cartera y proveedores:** informes de auditoría interactivos que permiten agrupar y modificar información como tablas dinámicas, realizar *drill down* y revisar movimientos de CxC y CxP.  
- **Auditoría de datos en tiempo real:** permite verificar y cruzar información directamente en el sistema, identificando discrepancias y asegurando la integridad de los datos.  
- **Filtros avanzados para consulta:** múltiples opciones de filtrado y agrupación para personalizar consultas o auditorías.  
- **Auditoría detallada de deudas con intereses:** al manejar intereses en CxC, genera informes que muestran amortización de capital, intereses pagados y estado de gestión de cada crédito.

##### Operaciones de cuentas por cobrar y por pagar
- **Registro de abonos a CxC:** permite registrar abonos parciales o totales de clientes, actualizando sus saldos pendientes.  
- **Registro de abonos a CxP:** permite imputar abonos parciales o totales a proveedores, reflejando el estado real de las obligaciones.  
- **Generación de préstamos (CxC o CxP):** registra operaciones de préstamo otorgadas o recibidas, con plan de pagos y condiciones específicas.  
- **Registro de anticipos (CxC o CxP):** contabiliza anticipos entregados a proveedores o recibidos de clientes, gestionando su aplicación posterior.

##### Gestión de usuarios y permisos
- **Administración de usuarios:** registra y configura usuarios con acceso al sistema, controlando credenciales y seguridad.  
- **Asignación de permisos por rol (recaudo, cobranza, tesorería):** define niveles de acceso y restricciones según el rol de cada usuario.  
- **Historial de accesos y auditoría:** monitorea la actividad de los usuarios, registrando ingresos y acciones para garantizar trazabilidad.

##### Indicadores de gestión y análisis
- **Indicadores de rotación de cartera:** muestra la eficiencia en la recuperación de las cuentas por cobrar.  
- **Cálculo de plazos de pago a proveedores:** ofrece métricas sobre la gestión de cuentas por pagar para optimizar el ciclo de pagos.  
- **Análisis de deterioro de cartera y cuentas de difícil cobro:** genera métricas de riesgo e indicadores tipo semáforo según días de vencimiento.  
- **Integración con ContaExcel y ContaPyme para Excel:** permite exportar y vincular datos del módulo directamente a estas herramientas para análisis avanzado, con fórmulas y hojas de cálculo personalizadas.

#### 🚫 No permite
- **Emitir facturas de venta ni documentos soporte** (funcionalidad del módulo **Facturación – FE** o **Gastos – GA**).  
- **Registrar compras o gastos** (funcionalidad de los módulos **Gastos – GA** o **Inventarios – IN**).  
- **Realizar contabilización manual de movimientos contables** (funcionalidad del módulo **Contabilidad – CN**).  
- **Liquidar nómina ni gestionar préstamos a empleados** sin integración con el módulo **Nómina – NP/NE**.  
- **Generar estados financieros o cierres contables** (funcionalidad del módulo **Contabilidad – CN**).  
- **Administrar presupuestos o conciliaciones bancarias automáticas** (funcionalidad del módulo **Contabilidad – CN**).  

#### Relación con otros módulos
- **Contabilidad (CN):** sincroniza automáticamente cobros, pagos, intereses y notas, asegurando coherencia contable y actualización de saldos financieros.  
- **Facturación (FE):** recibe las facturas emitidas a crédito que se convierten en cuentas por cobrar.  
- **Gastos (GA):** registra las facturas de proveedores que se reflejan como cuentas por pagar.  
- **Nómina (NE/NP):** permite registrar préstamos o anticipos a empleados y generar archivos planos para pagos masivos desde bancos.  
- **Inventarios (IN):** integra las facturas de venta, compras y devoluciones registradas a crédito con los movimientos de clientes y proveedores.  
- **Básico (BS):** utiliza el catálogo de terceros, condiciones comerciales y bancos configurados para cada cliente o proveedor.  
- **ContaExcel / Indicadores:** exporta información de cartera y pagos para construir reportes financieros o tableros de gestión.  

#### Palabras clave
cartera, proveedores, cuentas por cobrar, cuentas por pagar, CxC, CxP, cobros, pagos, abonos, facturas, notas crédito, notas débito, anticipos, préstamos, crédito, intereses, vencimientos, flujo de caja, recaudo, tesorería, conciliación, reporte por edades, estado de cuenta, ContaExcel, rotación de cartera.

#### Consideraciones
No aplica.

---

### MÓDULO INVENTARIOS (IN) Y FACTURACIÓN (FE)

**Tipo:** Comercial y operativo  

#### Descripción
Gestione sus ventas e inventario cumpliendo con todas las obligaciones frente a la DIAN.  
Este módulo está orientado a empresas que requieren **control total sobre sus operaciones comerciales**, integrando facturación, inventario y punto de venta en un mismo entorno de trabajo.

**Propósito:**  
El módulo **Inventarios y Facturación (IN–FE)** permite gestionar de manera integral los procesos de **compras, ventas y control de existencias** dentro del sistema **ContaPyme®**.  

Su propósito es garantizar el **registro, trazabilidad y control contable y físico de los bienes y servicios** comercializados por la empresa, cumpliendo con los **requisitos tributarios exigidos por la DIAN**, tales como:
- Facturación electrónica,  
- Documento soporte,  
- Notas crédito y notas débito.

Además, este módulo **unifica las operaciones de inventario, facturación y punto de venta (POS)**, asegurando que cada transacción afecte correctamente:
- El inventario,  
- La contabilidad,  
- Y la cartera de la empresa.

De esta forma, el sistema ofrece una gestión eficiente, centralizada y segura de todas las operaciones comerciales y de control de existencias.

#### ✅ Permite

##### Facturación y ventas
- Facturación y ventas: Con esta operación, nuestro sistema te permite registrar productos y servicios de forma intuitiva y eficiente. Podrás especificar detalles importantes como el cliente, la forma de pago, descuentos y otros datos relevantes que son cruciales para la gestión de tu negocio, asegurando al mismo tiempo el cumplimiento total con los requisitos de facturación electrónica vigentes. (FE IN)
- Solución Rápida para Facturación de Ventas y Servicios (POS): Acelera tu proceso de facturación con nuestro sistema POS. Optimiza cada transacción e integra tus periféricos para un registro eficiente de la información. Garantiza un cumplimiento normativo y mejora la experiencia de tus clientes, ideal para negocios que buscan eficiencia y rapidez sin sacrificar precisión. (FE IN)
- Cotiza y Factura: Realiza cotizaciones a tus clientes, detallando los precios y condiciones bajo los cuales se venderían los bienes o servicios. Estas se pueden transformar en una factura de venta en un solo paso, eliminando la necesidad de digitar nuevamente la información. (FE IN)
- Devolución en ventas : Facilita la gestión de los productos que los clientes devuelven, ayudando a mantener el control de inventario y la contabilidad ajustada. (FE IN)
- Nota crédito en ventas: Disminuye o anula el valor de una venta previamente facturada, cumpliendo con toda la normatividad de la DIAN. (FE IN)
- Nota débito en ventas: Aumenta el valor de una venta previamente facturada, cumpliendo con toda la normatividad de la DIAN. (FE IN)
- Factura el alquiler de tus artículos.: Gestiona el alquiler de productos que no están destinados a la venta, sino que se ofrecen en arrendamiento por períodos de tiempo predefinidos. ( IN)
- Facturación de productos con peso o precio variable : Puedes escanear códigos de barras externos, interpretando automáticamente el peso o precio de acuerdo con la configuración previamente establecida. (FE IN)
- Múltiples facturas por pagar: Agiliza el proceso de cobro con nuestro sistema integrado de manejo de memorias que permite almacenar individualmente cada prefactura y efectuar el cobro definitivo de manera inmediata y eficiente en el momento en que el cliente se disponga a pagar. (FE IN)
- Integración con perifericos: Mejora la eficiencia operativa con la capacidad de integrar diversos dispositivos periféricos directamente al sistema. ContaPyme es compatible con una amplia gama de herramientas externas que te ayudarán a la eficiencia en el punto de venta, como impresoras de recibos, lectores de códigos de barra, balanzas y datáfonos. Esta funcionalidad facilita el registro de datos en tiempo real, agilizando las transacciones y mejorando la experiencia de tus clientes y colaboradores. (FE IN)
- Facturación en bloque: Permite generar facturas predefinidas para múltiples clientes a la vez, según la peridicidad establecida. (FE IN)
- Facturación en moneda extranjera: Realiza facturas en diversas monedas, lo que es esencial para negocios que operan en mercados internacionales. (FE IN)
- Cálculo automatizado de impuestos: Calcula automáticamente los impuestos aplicables basados en las normativas establecidas, asegurando que las facturas sean siempre precisas y con el complimiento tributario. (FE IN)

###### Informes
- Ventas por factura: Visualización de las ventas detalladas por factura, mostrando información sobre los productos vendidos, cantidades y montos, utilizando filtros predefinidos. (FE IN)
- Venta de productos en el periodo: Informe que muestra las ventas de productos durante un periodo específico, basado en filtros previos para la visualización. ( IN)
- Informe de facturación mensual por cliente: Visualización de la facturación mensual clasificada por cliente, mostrando detalles de las ventas y montos facturados, basado en filtros predefinidos. ( IN)
- Comprobante informe diario de ventas (Tipo tirilla y hoja completa): Informe que presenta un comprobante diario de ventas en formato de tirilla y hoja completa, mostrando un resumen de las transacciones diarias. (FE IN)
- Cuadre de caja (Tipo tirilla y hoja completa): Informe que presenta el cuadre de caja diario en formato de tirilla y hoja completa, mostrando el resumen de ingresos y egresos, teniendo en cuenta la base establecida al iniciar el turno. (FE IN)
- Listas de precios: Visualización de los de precios de los productos, mostrando los precios actuales y utilizando filtros preestablecidos. (FE IN)
- Listas de precios con IVA: Informe que muestra los precios de los productos, incluyendo el IVA, basado en filtros previos. (FE IN)
- Comparación entre listas de precios: Visualización que permite comparar diferentes listas de precios, mostrando las variaciones y diferencias entre los precios para los productos, utilizando filtros predefinidos. ( IN)
- Reporte de facturas de venta: Informe que muestra detalles de las facturas de venta, incluyendo información sobre los productos vendidos, clientes y montos, basado en filtros previos. (FE IN)

##### Gestión de compras
- Órdenes de compra.: Solicita y ordena a tus proveedores, los productos o materia prima. Estas se pueden transformar en una factura de compra en un solo paso, eliminando la necesidad de digitar nuevamente la información. ( IN)
- Sistema integrado para compras: Con esta operación, nuestro sistema te permite registrar las compras de tus productos y materias primas de forma intuitiva y eficiente. Podrás especificar detalles importantes como el proveedor, la forma de pago, descuentos, impuestos y otros datos relevantes que son cruciales para la gestión de tu negocio. ( IN)
- Devolución en compras: Administra la devolución de productos a tus proveedores, ayudando a mantener la precisión del inventario. ( IN)
- Nota de ajuste DSNO (compras): Con este documento puedes realizar ajustes a las compras que realizaste a sujetos no obligados a facturar. ( IN)
- Reporte de factura de compra: Informe que muestra detalles de las facturas de compra, incluyendo información sobre proveedores, productos adquiridos y montos, basado en filtros previos. ( IN)

##### Gestión de productos
- Transforma y combina productos de tu inventario. : Nuestro sistema te permite transformar y combinar productos de tu inventario de manera eficiente, creando nuevas referencias y optimizando la gesión del stock. ( IN)
- Deterioro de inventarios: Registra la pérdida de valor de los inventarios debido a daños, obsolescencia o factores similares. ( IN)
- Elementos y artículos.: Te permite la creación, categorización y definición de cada artículo dentro del sistema, facilitando la organización rápida de los productos en el inventario. (FE IN)
- Grupos de inventario: *Agrupa productos similares bajo una clasificación común según su tipo, condición, impuestos y manejo contable. ( IN)
- Bodegas: Gestiona distintas ubicaciones físicas o conceptuales de almacenamiento dentro de la empresa, permitiendo un control detallado sobre su manejo contable, costos y existencias. ( IN)
- Define los departamentos y/o líneas de tus productos: Administra y segmenta el inventario por departamentos o líneas de productos, lo que permite filtrar la información en consultas e informes.  (FE IN)
- Calcula el precio de tus productos automáticamente: Puedes definir cómo se calculan los precios de los productos basándose en parámetros como el costo promedio, costo de compra, incremento porcentual, entre otros. Permitiendo una estrategia de precios dinámica y automatizada. ( IN)
- Listas de precios: Permite crear varias listas de precios para diferentes tipos de clientes, facilitando la personalización en la estrategia de ventas. (FE IN)
- Maneja tus elementos compuestos, creando paquetes, conjuntos y combos.: Factura productos que son compuestos por varios  artículos del inventario, controlando tanto las existencias y el costo, de manera individual o en conjunto. ( IN)
- Define una unidad de compra diferente a la unidad de uso o de venta.: Permite registrar y gestionar compras de productos en una unidad de medida diferente a la que se usa para almacenar o vender el producto. Esto es útil en aquellos casos donde los proveedores utilizan diferentes unidades para sus productos. ( IN)
- Control inteligente del stock: Define niveles mínimos y máximos de stock. Recibe notificaciones cuando las existencias se acercan a los límites establecidos o cuando el tiempo de reposición está próximo a cumplirse. ( IN)
- Define una unidad de presentación diferente a la unidad general: Permite configurar una forma de presentación diferente al vender un producto.  ( IN)
- Elementos alias: Se puede definir un producto que al venderlo tenga el manejo de inventarios de otro elemento. ( IN)
- Manejo de series y lotes: Asigna series o lotes a tus productos, incorporando información clave como fechas de vencimiento, garantías, y otros detalles personalizables cruciales para la trazabilidad completa de tus artículos. ( IN)
- Control estricto de cantidades : El sistema garantiza la disponibilidad de productos para cada venta y actualiza de una manera precisa el costo promedio ponderado en cada transacción. De esta manera, podrás optimizar la rentabilidad y fortalecer el control operativo de tu negocio. ( IN)
- Generación de códigos de barrras: Esta funcionalidad te permite crear, administrar e imprimir códigos de barras únicos para cada producto, facilitando el seguimiento y la gestión del inventario. Además, los códigos que se generan  podrán ser leídos en todas las operaciones del sistema, incluyendo ventas y compras, lo que optimiza la eficiencia de tus procesos. (FE IN)

###### Informes
- Consulta: Movimientos de inventario: Informe interactivo que permite rastrear los movimientos de inventario, es decir, las compras, ventas y cualquier movimieto de los elementos de inventario. Los usuarios pueden agregar o quitar columnas para ver detalles como costo, precio, entre otros. ( IN)
- Consulta: Movimientos de series y lotes: Informe interactivo que facilita el seguimiento de movimientos específicos por series y lotes. Los usuarios pueden personalizar las columnas para ver información detallada sobre las transacciones. ( IN)
- Consulta saldos actuales de inventario: Informe interactivo que muestra los saldos actuales de inventario. Los usuarios pueden ajustar la vista añadiendo o eliminando columnas para analizar las cantidades disponibles en tiempo real. ( IN)
- Saldos de inventario: Visualización de los saldos de inventario basada en filtros predefinidos. Muestra la cantidad de productos disponibles en diferentes categorías. ( IN)
- Saldos de inventarios por centro de costos: Informe que presenta los saldos de inventarios clasificados por centros de costos, utilizando filtros previos para la visualización. ( IN)
- Códigos de barras: Visualización de los códigos de barras asignados a los productos. Incluye información básica como el código y el precio del producto. Es ideal para la impresión de los códigos y que puedan ser adheridos a los productos ( IN)
- Lista de lementos, existencias y stock: Informe que muestra una lista detallada de elementos, sus existencias y niveles de stock, basado en filtros preestablecidos. ( IN)
- Rotación de productos: Informe que analiza la rotación de productos, indicando la frecuencia con la que los productos se venden y se reponen en inventario. Utiliza filtros previos para la visualización. ( IN)
- Entrada y salida de productos en el periodo: Visualización de las entradas y salidas de productos durante un periodo específico, basado en filtros predefinidos. ( IN)
- Movimiento detallado de elementos : Informe que muestra el movimiento detallado de elementos en el inventario, incluyendo entradas, salidas y ajustes, utilizando filtros previos. ( IN)
- Consulta saldos actuales de inventario: Informe interactivo que permite rastrear y visualizar los saldos actuales de inventario con opciones para personalizar las columnas y la información mostrada. ( IN)
- Consulta saldos actuales de inventario por grupo de inventario: Informe interactivo que muestra los saldos actuales de inventario organizados por grupos de inventario. Los usuarios pueden ajustar las columnas y detalles visualizados. ( IN)
- Saldos de inventarios por centro de costos: Informe que presenta los saldos de inventarios clasificados por centros de costos, utilizando filtros previos para la visualización. ( IN)
- Vencimientos y garantías de productos: Visualización de las fechas de vencimiento de garantías de productos, basada en filtros predefinidos para mostrar los datos relevantes. ( IN)
- Análisis de margen de rentabilidad: Informe que analiza el margen de rentabilidad de los productos, mostrando datos sobre costos, precios de venta y márgenes de beneficio, utilizando filtros predefinidos. ( IN)
- Análisis de costo promedio ponderado: Visualización del análisis del costo promedio ponderado de los productos en inventario, basado en filtros preestablecidos. ( IN)

##### Gestión de inventarios
- Embodegamiento de productos: Permite gestionar de forma eficiente el almacenamiento, y controlar los costos de tus productos elaborados internamente. ( IN)
- Requisición interna: Permite a tus colaboradores realizar solicitudes internas de materiales necesarios para la gestión de sus actividades, facilitando la planificación y disponibilidad del inventario.  ( IN)
- Planilla de uso y/o consumo: Registra y controla  los materiales utilizados o consumidos en la operación de tu empresa. ( IN)
- Ajuste de inventario: Realiza los ajustes necesarios para eliminar las diferencias entre el inventario físico y  los registros en el sistema. ( IN)
- Traslada inventario entre bodegas: Gestiona el movimiento de inventario entre diferentes ubicaciones de almacenamiento. ( IN)

##### Gestión de empleados
- Gestión completa de comisiones en tu empresa.: Optimiza el cálculo y el pago de comisiones a los vendedores y recaudadores de tu empresa. Esta herramienta permite el cálculo automático de comisiones basado en las ventas o cobranzas realizadas, garantizando transparencia y estimulando la motivación del equipo de ventas. Asegura un proceso eficiente en la generación de la compensación de tus colaboradores. ( IN)

##### Otras operaciones
- Ingresos *: Operación que permite realizar ingresos o facturas de venta por servicios en el sistema.  (FE )
- Ingresos recibidos por anticipado *: Operación que permite programar el ingreso recibido por anticipado en el pago de un servicio (FE )
- Nota crédito de ingresos *: Operación que permite la realización de una disminución o anulación de una factura de venta realizada. (FE )
- Nota débito de ingresos *: Operación que permite la realización de un aumento al total de una factura de venta realizada. (FE )
- Gastos*: Operación que permite el registro de pagos por conceptos de servicio (FE )
- Gastos diferidos*: Operación que permite la programación de pagos por conceptos de servicio (FE IN)

##### Pagos*
- Nota de ajuste DSNO (gastos) *: Operación que permite el ajuste o anulación de un documento de soporte a no obligados a facturar (FE IN)

#### 🚫 No permite
- **Registrar movimientos contables manuales** (funcionalidad del módulo **Contabilidad**).  
- **Gestionar cuentas por cobrar o pagar, ni procesar pagos o cobros** (funcionalidad del módulo **Cartera y Proveedores**).  
- **Registrar gastos operativos o documentos soporte DSNO sin inventario** (funcionalidad del módulo **Gastos**).  
- **Controlar presupuestos, costos de producción o activos fijos** (funcionalidades de los módulos **Presupuesto**, **Costos de Producción** y **Activos Fijos**).  
- **Registrar transacciones de nómina o prestaciones sociales** (funcionalidad del módulo **Nómina**).  

#### Palabras clave
inventarios, facturación, ventas, compras, existencias, stock, productos, artículos, bodegas, POS, cotización, orden de compra, DSNO, devoluciones, notas crédito, notas débito, precio de venta, costo promedio, deterioro, traslados, series, lotes, vencimientos, IVA, retefuente, margen, cuadre de caja, documento soporte, facturación electrónica DIAN.

#### Relación con otros módulos
- **Contabilidad (CN):** genera los asientos automáticos de compras, ventas, impuestos, costos y ajustes de inventario.  
- **Cartera y Proveedores (CX):** crea las cuentas por cobrar de facturas de venta y las cuentas por pagar de compras.  
- **Gastos (GA):** permite registrar documentos soporte y pagos a no obligados cuando las compras no generan inventario.  
- **Inventarios Plus (IP):** administra cotizaciones, pedidos, remisiones y órdenes de compra previas a su facturación.  
- **Costos de Producción (CO):** utiliza los movimientos de inventario para calcular costos de materia prima y productos terminados.  
- **Nómina (NO/NP):** calcula comisiones a vendedores ligados a ventas.  
- **Básico (BS):** provee catálogos de terceros, tipos de documento, parámetros de impuestos y formatos de impresión.  
- **ContaExcel / Indicadores:** permite exportar información de ventas, compras e inventario para análisis financiero y comercial.  

#### Consideraciones
El módulo de Facturación no tiene ninguna funcionalidad relacionada con la gestión de inventarios o control de existencias.

---

### MÓDULO FACTURACIÓN (Módulo Facturador) (FE)

**Tipo:** Comercial y operativo  

#### Descripción
El módulo **Facturación (Facturador)** permite gestionar de forma integral la **facturación de bienes y servicios**, asegurando el cumplimiento de la **normativa de facturación electrónica de la DIAN**.  
Está orientado a empresas que requieren emitir facturas de venta, notas crédito, notas débito y cotizaciones, con automatización de impuestos, control documental y trazabilidad completa de las operaciones comerciales.

Este módulo se enfoca en el **proceso comercial y tributario de la venta**, independiente del control físico de inventarios, aunque puede integrarse con otros módulos para una gestión empresarial completa.

#### Propósito
Permitir a las empresas **emitir, transmitir y administrar documentos de facturación electrónica**, garantizando:
- Cumplimiento normativo ante la DIAN.
- Automatización de impuestos y retenciones.
- Integración contable y de cartera.
- Control, auditoría y trazabilidad de las ventas.

Su objetivo es simplificar el proceso de facturación, reducir errores operativos y asegurar que cada documento emitido tenga validez legal y contable.

#### ✅ Permite

##### Facturación electrónica y ventas
- **Emisión de facturas de venta electrónicas** por productos y/o servicios, cumpliendo con los requisitos técnicos y legales de la DIAN.  
- **Transmisión automática a la DIAN** en tiempo real y gestión de estados (aceptado, rechazado, validado).  
- **Facturación de servicios e ingresos** sin manejo de inventario físico.  
- **Facturación POS** para ventas rápidas con impresión de tirilla o factura estándar.  
- **Facturación en moneda extranjera**, con conversión automática a moneda local según la tasa configurada.  
- **Facturación en bloque**, permitiendo generar facturas periódicas o recurrentes para múltiples clientes.  

##### Documentos electrónicos asociados
- **Notas crédito electrónicas** para anulación total o parcial de facturas.  
- **Notas débito electrónicas** para incrementos de valor en facturas ya emitidas.  
- **Cotizaciones y prefacturas**, con posibilidad de convertirlas directamente en facturas sin redigitar información.  
- **Documentos de ajuste (DSNO)** cuando aplique según la normativa vigente.  

##### Impuestos y cumplimiento tributario
- **Cálculo automático de impuestos**: IVA, retefuente, reteICA y otros tributos configurables.  
- **Manejo de múltiples tarifas de IVA** por producto o servicio.  
- **Configuración de responsables DIAN**, tipos de operación y resoluciones de facturación.  
- **Control de consecutivos y numeración autorizada**, evitando duplicidades.  

##### Informes y control
- **Informe de facturas de venta** por cliente, período o estado.  
- **Informe diario de ventas** y **cuadre de caja**.  
- **Informe de facturación mensual por cliente**.  
- **Exploradores tipo consulta** para auditoría y validación de información.  
- **Exportación de informes** a formatos como Excel o PDF.  

##### Integraciones
- **Integración con Contabilidad (CN)** para la generación automática de asientos contables de ventas, impuestos y retenciones.  
- **Integración con Cartera (CX)** para la creación automática de cuentas por cobrar cuando las ventas son a crédito.  
- **Integración con Sistema Básico (BS)** para el uso de terceros, tipos de documento, resoluciones y formatos de impresión.  

#### 🚫 No permite
- **Gestionar inventario físico o existencias** (funcionalidad del módulo **Inventarios – IN**).  
- **Registrar compras o devoluciones en compras** (funcionalidad de los módulos **Inventarios** o **Gastos**).  
- **Registrar órdenes de compra, recepciones, remisiones y pedidos** (funcionalidad incluida en el módulo **Inventarios Plus**)
- **Realizar pagos, recaudos o gestión de cartera** (funcionalidad del módulo **Cartera y Proveedores – CX**).  
- **Registrar movimientos contables manuales** (funcionalidad del módulo **Contabilidad – CN**).  
- **Liquidar nómina o generar documentos laborales** (funcionalidad del módulo **Nómina – NE / NP**).  
- **Administrar costos de producción o activos fijos** (funcionalidad de los módulos **Costos de Producción** y **Activos Fijos**).  

#### Relación con otros módulos
- **Sistema Básico (BS):** utiliza catálogos de terceros, resoluciones DIAN, tipos de documento y formatos de impresión.  
- **Contabilidad (CN):** registra automáticamente los asientos contables derivados de la facturación.  
- **Cartera y Proveedores (CX):** genera cuentas por cobrar cuando las facturas se emiten a crédito.  
- **Inventarios (IN):** se integra únicamente cuando la facturación requiere afectar existencias físicas.  
- **ContaExcel / Indicadores:** permite analizar ventas, impuestos y facturación mediante reportes dinámicos en Excel.  

#### Palabras clave
facturación, facturador, facturación electrónica, FE, DIAN, facturas de venta, notas crédito, notas débito, cotizaciones, prefacturas, impuestos, IVA, POS, cuadre de caja, resoluciones DIAN, consecutivos, cuentas por cobrar, ventas, informes de ventas, cumplimiento tributario.

---

### MÓDULO NÓMINA (NE, NO, NP)

**Tipo:** Administrativo, contable y laboral

#### Descripción
Gestione sus empleados, contratos y el pago de nómina cumpliendo con todas las obligaciones frente a la DIAN.  
Este módulo está orientado a empresas que requieren controlar de manera integral la información laboral y garantizar el cumplimiento normativo.

**Propósito:**  
Gestionar integralmente la información laboral de la empresa, incluyendo empleados, contratos, pagos y liquidaciones, cumpliendo con la normativa laboral y tributaria colombiana.  

El módulo automatiza el cálculo de devengos, deducciones, aportes, provisiones y prestaciones sociales, además de generar y transmitir la **nómina electrónica** a la DIAN.  

Su objetivo es optimizar los procesos de recursos humanos, garantizar el cumplimiento legal y mantener una integración contable completa con el resto del sistema.

#### ✅ Permite

##### Gestión de empleados
- Catálogo de empleados.: La funcionalidad brinda una base de datos centralizada para la administración integral de todos los empleados de la empresa. Permite la creación empleados con información detallada, como documentos, nombres, fechas de nacimiento, tratamientos, direcciones y cuentas bancarias y más información complementaria. Además, facilita la revisión de contratos registrados y la consulta rápida de fichas técnicas del empleado en cualquier momento. (NE NP)
- Certificado laboral por empleado: Esta herramienta agiliza la entrega de los certificados laborales a los empleados. Genera el certificado laboral de los empleados, incluyendo información relevante como salarios, promedio salarial, fecha de inicial de la relación laboral, entre otros. (NE NP)

##### Gestión de contratos
- Catálogo preconfigurado de perfiles de contratos : Catálogo preconfigurado y listo para usar para facilitar el montaje y configuración inicial de la nómina. Defina las configuraciones iniciales, manejos y conceptos de sus contratos y úselo en los contratos de sus empleados para agilizar el funcionamiento adecuado del módulo. (NE NP)
- Creación y modificación de contratos: Completa gestión de los contratos de trabajo. El propósito de esta funcionalidad es garantizar la adecuada trazabilidad de la creación y modificación de los contratos a través de operaciones e informes que facilitan la auditoría de la información de cada uno de los empleados. (NE NP)
- Modificación de contratos en bloque: Esta poderosa herramienta permite realizar de manera rápida la modificación de datos del contrato de múltiples empleados en un sólo documento. Adicionalmente, esta operación permite agilizar los cambios que se pueden realizar en los contratos, ya sea en los atributos y/o conceptos de nómina.  (Ejemplo: Actualización masiva de salarios, cambio de cargos, centros de costos, etc) (NE NP)
- Liquidación de contrato por empleado: Liquidación automatizada de contratos de trabajo. Cálculo de devengos, prestaciones sociales pendientes de pago,  e indemnización por retiro según el tipo de contrato, en caso de finalización de contrato sin justa causa. (NE NP)
- Consulta de contratos de nómina: Este explorador permite al usuario revisar la información detallada de los contratos de cada uno de los empleados. Permite acceder a los datos básicos del empleado (como dirección, cuenta bancaria, datos de contacto) datos del contrato (centro de costos, perfil de contrato, cargo, lugar de trabajo) conceptos de nómina asociados al contrato (devengos, deducciones, costos de empresa), datos del beneficiario adicional, entidades de nómina a las cuales está afiliado cada empleado y adicionalmente permite revisar todas las operaciones en las cuales se ha referenciado el contrato del empleado. (NE NP)

##### Gestión de los elementos de nómina
- Catálogo de conceptos de nómina preconfigurado: Este catálogo agiliza el montaje del módulo, donde se sugieren los conceptos de nómina más utilizados en la gestión de la nómina, con su respectiva forma de cálculo y manejo contable sugerido. Es un catálogo completamente personalizable por el usuario según los requerimientos de cada empresa, en el cual se pueden crear y modificar según la necesidad. (NE NP)
- Personalización de conceptos de nómina y fórmulas de cálculo: Al usar esta opción en el catálogo de conceptos de nómina, el usuario podrá realizar sus propias fórmulas para el cálculo de la cantidad o valor del concepto. (NE NP)
- Cumplimiento normativo: Optimización de los procesos de nómina y cumplimiento con todas las regulaciones laborales y fiscales.  automatización en el cálculo de salarios, prestaciones, seguridad social, aportes parafiscales y retenciones, brindando tranquilidad a la hora de presentar la información ante diferentes terceros interesados como la DIAN, Operadores PILA y empleados, gracias a la actualización constante de la normatividad vigente. (NE NP)

##### Control total de la nómina
- Captura de acumulados iniciales de nómina: La operación facilita a los usuarios que están implementando la nómina en el sistema cargar la información de los conceptos correspondientes a periodos anteriores. El propósito principal es establecer un histórico detallado de cada nómina, permitiendo que los cálculos asociados al pago de prestaciones, vacaciones y liquidaciones de contratos se realicen de manera precisa y correcta.
Esta operación es esencial para asegurar que la información histórica de los conceptos de nómina sea debidamente registrada en el sistema, lo que contribuye a la exactitud de los cálculos y proporciona una base sólida para la gestión adecuada de prestaciones y liquidaciones.  (NE NP)"
- Registro de novedades para uno o múltiples empleados: Esta operación permite el registro de todas las novedades de nómina que sucedan en un período de tiempo para todos los empleados. Adicionalmente, esta operación permite programar novedades que se desean pagar en períodos posteriores. (NE NP)
"- Pago de nómina : Individual: La operación de pago de nómina individual automatiza el cálculo y la generación de la nómina para cada empleado, basándose en la información de su contrato y las novedades del mes. Este proceso incluye la determinación de los días laborados, salario, novedades y descuentos de seguridad social para el empleado, así como el registro de aportes de seguridad social, parafiscales y provisión de prestaciones por parte de la empresa. Todos los cálculos automáticos siguen la normativa colombiana, asegurando precisión y cumplimiento. Al finalizar el pago, la operación realiza automáticamente los asientos contables correspondientes.

Planilla: La operación de pago de nómina en planilla automatiza el proceso de cálculo y generación de la nómina para todos los empleados en un solo documento, utilizando la información de sus contratos y las novedades del mes. Realiza los cálculos correspondientes para determinar días laborados, salarios, novedades y descuentos de seguridad social para cada empleado, así como el registro de aportes de seguridad social, parafiscales y provisión de prestaciones por parte de la empresa. Todos los conceptos están formulados según la normativa colombiana, garantizando precisión y cumplimiento normativo.
A diferencia de la nómina individual, esta planilla consolida todos los pagos de nómina en un único documento, facilitando el seguimiento detallado de todos los pagos en un solo lugar. Aunque quedan registrados pagos individuales, se presenta en una única planilla, eliminando la necesidad de gestionar pago por pago de manera separada. Esta consolidación optimiza significativamente tiempo y recursos. Al finalizar el proceso de pago, la operación también realiza automáticamente los correspondientes asientos contables. (Individual Planilla)"
- Envío automático de comprobante de pago de nómina: A través de algunas configuraciones básicas rápidas y sencillas, el usuario podrá configurar el envío automático del respectivo comprobante de pago de nómina al empleado, el cual podrá visualizarlo en la plataforma de documentos. En dicha plataforma tendrá la posibilidad de interactuar con la información recibida (aprobar o rechazar el documento, dejar un comentario, solicitar una llamada, descargar el PDF entre otras opciones) (NE NP)
- Control y trazabilidad de entrega, aceptación y rechazo: A través de la plataforma de documentos permita que su colaborador acepte, rechace, realice comentarios u otras acciones personalizadas sobre el comprobante de pago de nómina enviado y publicado. (NE NP)

##### Cálculos precisos y automatizados
- Contabilización automática: Integración total con el módulo de contabilidad. Toda la información contable de los empleados se registra de forma instantánea, incluyendo devengos, deducciones, aportes a cargo de la empresa y provisiones de prestaciones sociales. (NE NP)
- Cálculo automático de conceptos de nómina (devengos y deducciones): Facilita la administración de los pagos al calcular de manera precisa y eficiente todos los devengos y deducciones correspondientes a cada período de pago. Al realizar el pago, el sistema calcula automáticamente conceptos como salarios, comisiones y horas extras, así como deducciones por salud, pensión y deudas, basándose en la configuración del contrato y las novedades registradas. Este proceso incluye el cálculo de valores, días, bases y porcentajes para cada concepto, proporcionando un desglose claro y preciso del monto total a pagar. De esta forma, garantizas una nómina justa y transparente, optimizando la gestión salarial y reduciendo el riesgo de errores. (NE NP)
- Liquidación automática de aportes del empleador y provisiones: Gestione de manera eficiente los aportes y provisiones que la empresa debe pagar y provisionar en cada período de nómina. Dependiendo de los devengos de cada empleado, el sistema calcula y realiza automáticamente las liquidaciones correspondientes, garantizando que todos los aportes se ajusten a las normativas vigentes. Además, si cuenta con el módulo contable y de cartera, se generan automáticamente los asientos contables y las cuentas por pagar a las entidades correspondientes, simplificando el proceso administrativo y asegurando una contabilidad precisa y oportuna. (NE NP)
- Ajustes de provisiones automáticamente: La operación de "Acciones Automáticas de Fin de Mes" incluye una funcionalidad esencial llamada "Cruce de Provisiones de Nómina y Ajuste a Cero".  El propósito de este proceso es corregir diferencias entre las prestaciones sociales provisionadas y los pagos reales. Estas diferencias pueden deberse a situaciones como el inicio tardío de registros de pago de nómina, anticipos en prestaciones o el manejo de decimales en fórmulas. El proceso asegura la conciliación ajustando automáticamente los registros contables, garantizando la coherencia entre lo provisionado y lo pagado en el ámbito de las prestaciones sociales. (NE NP)
- Liquidación automática de prestaciones sociales y vacaciones:  La operación de pago de nómina y liquidación de contratos automatiza el proceso de cálculo y generación de la nómina para todos los empleados en un solo documento, utilizando la información de sus contratos y las novedades generadas en el período de tiempo a evaluar. (NE NP)
- Cálculo de retención en la fuente sobre salarios: Cálculo automático del concepto de retención en la fuente sobre salario para empleados, permitiendo el recaudo adecuado de impuestos y garantizar que el empleado esté cumpliendo con sus obligaciones tributarias de manera gradual y automática, evitando posibles sanciones por no declarar, no pagar los impuestos correspondientes o tener que pagar un valor elevado por no contar con las retenciones mensuales en su salario.​ (NE NP)

##### Nómina electrónica
"- Habilitación automática: Cumpla fácilmente el proceso de envío de pruebas de documentos electrónicos de nómina y notas de ajuste para quedar habilitado ante la DIAN. 
Proceso automatizado donde el sistema enviará los documentos mínimos requeridos para cumplir la etapa de habilitación y posteriormente poder enviar los documentos electrónicos de nómina y ajuste en ambiente productivo. (NE NP)"
"- Reporte de nómina electrónica: Individual: La operación ofrece la posibilidad de generar el reporte de nómina electrónica de cada empleado, diseñado para cumplir con los requisitos establecidos por la DIAN. Este reporte incluye toda la información necesaria y requerida por la entidad fiscal, asegurando la conformidad con las normativas vigentes.
La operación simplifica el proceso de presentación de la información de nómina ante la DIAN, proporcionando un documento individualizado para cada empleado. Esto no solo facilita el cumplimiento de obligaciones legales, sino que también contribuye a una gestión más eficiente y precisa de los registros fiscales asociados a la nómina. 

Planilla: La operación simplifica el proceso de generación de reportes de nómina electrónica para cada empleado, cumpliendo con los requisitos de la DIAN. A diferencia de los reportes individuales, esta planilla consolida todos los reportes de nómina electrónica en un único documento en el sistema. Aunque se generan y se envían reportes individuales para cada empleado, todo queda registrado y accesible en una sola planilla, eliminando la necesidad de gestionar reporte por reporte. Esto no solo cumple con los requisitos de presentación ante la DIAN, sino que también facilita el seguimiento detallado de todos los reportes en un solo lugar, optimizando así tiempo y recursos en la gestión de la nómina electrónica. (Individual Planilla)"
- Reporte de ajuste de nómina electrónica: La operación de ajuste de nómina electrónica permite corregir ante la DIAN, aquellos reportes que han sido enviados por un mayor o menor valor enviado a través de un reporte de nómina electrónica. (NE NP)
- Reporte de anulación de nómina electrónica: La operación de anulación de nómina electrónica permite eliminar ante los registros de la DIAN, aquellos reportes de nómina electrónica, que no era necesario enviar. (NE NP)

##### Informes
- Explorador de pagos a empleados: Este informe proporciona una visión rápida de los pagos de nómina en un período específico a cada empleado. Cada registro incluye el número de comprobante, fecha de pago, número de contrato, devengos, deducciones y el total pagado, con un apartado para el costo total para la empresa. Además, cuenta con un filtro para acceder fácilmente a los reportes de nómina electrónica realizados en el periodo. (NE NP)
- Explorador de novedades de nómina: Es una consulta detallada que presenta las novedades registradas para cada empleado en un periodo específico de manera clara y completa. Este informe incluye información importante como el concepto de la novedad, su valor, la cantidad o porcentaje correspondiente, y otros detalles relevantes. La funcionalidad del informe permite filtrar las novedades de dos maneras distintas: se puede optar por visualizar todas las novedades registradas o, visualizar únicamente aquellas que están pendientes de pago. Esta capacidad de filtrado facilita a los usuarios enfocarse en la información que necesitan en un momento dado, ya sea para revisión general o para abordar específicamente las novedades pendientes. (NE NP)
- Explorador de movimientos de conceptos de nómina: Es un informe detallado que ofrece una completa visión de los conceptos de nómina pagados en un periodo determinado. Proporciona información importante como el empleado, contrato y número de comprobante de pago por cada concepto. Con detalles precisos sobre valores, cantidades y porcentajes, este explorador permite la aplicación de filtros y agrupaciones para facilitar la revisión y comparación de los pagos realizados a cada empleado, ofreciendo una herramienta versátil para la gestión eficiente y la trazabilidad de la información de la nómina. (NE NP)
"- Consulta de detalle de pagos de nómina: Es un informe que proporciona una visión detallada de los pagos de nómina de cada empleado. Utilizando colores para categorizar la información: verde para devengos, rojo para deducciones y azul para costos para la empresa. En esta consulta detallada, se desglosan los salarios, comisiones, bonificaciones, entre otros, así como deducciones relacionadas con la salud, pensiones y otros descuentos. Además, se incluyen los costos para la empresa, como los asociados con la salud, pensiones, ARL y provisiones de prestaciones sociales.

Cada columna agrupa el total de cada concepto para el conjunto de empleados, abarcando desde el salario total hasta bonificaciones y descuentos de salud, entre otros elementos. A nivel individual, se proporciona un desglose detallado de devengos, deducciones y costos para la empresa por cada empleado en líneas separadas. La presentación es dinámica, adaptándose al periodo consultado. Cada bloque, ya sea devengos, deducciones o costos para la empresa, muestra de forma dinámica los conceptos específicos calculados en cada pago. Esto convierte al informe en una herramienta integral y transparente para la verificación, consulta y auditoría de la nómina. (NE NP)"
- Certificado de ingresos y retenciones: El certificado de ingresos y retenciones es un documento oficial que entrega el empleador a sus colaboradores. En él se detallan todos los pagos recibidos por el trabajador durante un año, incluyendo salarios, bonificaciones, prestaciones sociales y otros conceptos. Asimismo, se especifican las deducciones realizadas, como las retenciones en la fuente por concepto de impuesto sobre la renta. Este certificado es indispensable para cumplir con las obligaciones tributarias y presentar la declaración de renta anual. (NE NP)
- Libro de vacaciones: Próximamente ( NP)

##### Pagos automáticos de seguridad social 
- Catálogo preconfigurado de proveedores de nómina: Se incluye un catálogo preconfigurado con la mayoría de proveedores de seguridad social y parafiscales, facilitando la gestión de aportes. Este catálogo viene con los códigos PILA correspondientes ya configurados, lo que garantiza que los usuarios puedan asignar rápidamente los proveedores adecuados a cada empleado según la entidad a la que esté afiliado o a la que deban realizarse los aportes de seguridad social. Esta funcionalidad reduce el tiempo de configuración y minimiza errores, asegurando que el proceso de afiliación y pago a los proveedores de nómina se realice de manera ágil y precisa. (NE NP)
"- Planilla para liquidación de aportes - PILA: La operación permite a los usuarios generar un archivo plano PILA para realizar el pago de seguridad social de los empleados. Antes de la generación del archivo, la operación carga detalladamente la información de cada empleado, incluyendo aspectos como los sistemas de salud, pensión, ARL, parafiscales. 

Para cada sistema, se presenta el valor del Ingreso Base de Cotización (IBC), el monto a pagar conforme a las normativas, días laborados, novedades mensuales, así como el desglose del valor a pagar tanto por empleado como por empresa, los totales por sistema y el total general. Esto se basa en los pagos registrados en el mes, asegurando la integridad y trazabilidad de los datos. 
Adicionalmente, se proporciona información detallada acerca de las administradoras a las cuales los empleados están registrados. 

Este nivel de detalle posibilita a los usuarios verificar con precisión la información antes de proceder con la generación del archivo plano. En caso de conformidad, se solicita indicar la forma de pago para concluir el proceso. La operación automatiza la generación del registro contable y realiza ajustes necesarios, culminando con la creación del archivo plano PILA, el cual queda listo para ser cargado en la plataforma de cada proveedor de PILA. ( NP)"
- Cruce de saldos y referencias de cartera: La funcionalidad de cruce de saldos y referencias de cartera optimiza la gestión contable al automatizar el proceso de conciliación de cuentas. Tras el pago de nómina a los empleados, se generan automáticamente los asientos contables correspondientes en las cuentas de cartera para las cuentas de seguridad social. Al registrar el pago de PILA para la seguridad social, el sistema realiza de manera automática el cruce de estas cuentas por pagar y referencias, garantizando que la contabilidad y el manejo de cartera queden completamente saldados y actualizados. Esta funcionalidad asegura una contabilidad precisa y facilita la gestión de las cuentas por pagar. ( NP)
"- Ajustes contables por redondeo por exigencia de PILA: La funcionalidad de ajustes contables por redondeo asegura que en la contabilidad se refleje correctamente los movimientos de los pagos y cumpla con los requisitos de PILA. Dado que los valores de nómina pueden incluir decimales, el sistema aplica automáticamente un redondeo normativo en el registro de la planilla PILA: el IBC (Ingreso Base de Cotización) se ajusta al peso superior más cercano, y el valor de la cotización al múltiplo de cien superior más cercano.

Al finalizar el registro de PILA, el sistema realiza los ajustes contables necesarios para equilibrar las diferencias entre los movimientos de nómina y los redondeos aplicados, registrando estos ajustes en una cuenta de gasto configurable por el usuario. Esto garantiza una gestión contable precisa, manteniendo la cartera y la contabilidad en perfecto equilibrio. ( NP)"

#### 🚫No permite
- Emitir **facturas, notas crédito o documentos soporte** (funcionalidad del módulo Facturación, Inventarios y facturación o Gastos).  
- Gestionar **compras o pagos a proveedores** (funcionalidad del módulo Cartera y Proveedores).  
- Crear órdenes de compra o controlar inventarios (funcionalidad de Inventarios o Inventarios Plus).  
- Registrar **activos, depreciaciones o amortizaciones** (funcionalidad de Activos Fijos).  
- Calcular **costos de producción** ni distribuir costos indirectos (funcionalidad del módulo de Costos de Producción).  
- Generar estados financieros o cierres contables (funcionalidad del módulo Contabilidad).  
- Administrar presupuestos o comparar ejecución vs planeación (funcionalidad del módulo Presupuesto).

#### Palabras clave
nómina, empleados, contratos, liquidación, vacaciones, prima, cesantías, intereses, seguridad social, PILA, ARL, retención en la fuente, nómina electrónica, deducciones, devengos, novedades, provisiones, prestaciones sociales, certificado laboral, planilla, pagos, comprobante, archivo plano, DIAN.

#### Relación con otros módulos
- Control de préstamos a empleados (requiere Cartera): Integración total con el módulo de cartera. A través de los pagos de nómina (individual y en planilla) el empleado puede realizar abonos a las cuentas por cobrar que se tengan registradas a la fecha del pago de nómina y realizar la deducción de manera automática sin necesidad de realizar un comprobante o contabilización independiente. (NE CX NP CX)
- Archivo plano para pago de nómina con el banco (requiere Cartera): Esta herramienta tiene como finalidad planear los pagos de las cuentas por pagar que presenta la empresa con sus empleados. Esta herramienta permite generar un archivo plano con todas las transacciones de las cuentas por pagar para subir al banco de manera masiva.  (NE CX NP CX)
- Gestión completa de comisiones en tu empresa. (requiere inventarios): Optimiza el cálculo y el pago de comisiones a los vendedores y recaudadores de tu empresa. Esta herramienta permite el cálculo automático de comisiones basado en las ventas o cobranzas realizadas, garantizando transparencia y estimulando la motivación del equipo de ventas. Asegura un proceso eficiente en la generación de la compensación de tus colaboradores. (NE IN NP IN)
- Cierre de fin de año de las cuentas de prestaciones sociales (requiere contabilidad): Con el módulo de contabilidad integrado, el cierre de fin de año incluye el traslado contable automático de las provisiones de prestaciones sociales, como prima, vacaciones, cesantías e intereses, desde la cuenta 26 a la cuenta 25. Este proceso asegura que los estados financieros reflejen con precisión las obligaciones laborales de la empresa, permitiendo una gestión clara y transparente de los pasivos . De esta forma, se garantiza el cumplimiento de las normativas contables y la correcta presentación de la situación financiera al cierre del ejercicio. (NE CN NP CN)
- Control de usuarios y perfiles de seguridad: Protege la información contable mediante la asignación de permisos personalizados a cada usuario del sistema. Permite definir perfiles de seguridad específicos que limiten el acceso a la información, garantizando la seguridad y el control de los datos financieros. (NE NP)
- **Cartera y Proveedores (CX):** administra pagos de nómina y préstamos a empleados como cuentas por pagar o cobrar.  
- **Inventarios (IN):** permite calcular y registrar comisiones sobre ventas o cartera.  
- **Costos de Producción (CO):** integra los costos de mano de obra y tiempo empleado en procesos productivos.  
- **Básico (BS):** usa la información de terceros (empleados) y centros de costos.  
- **ContaExcel / Indicadores:** exporta datos de nómina para análisis de costos laborales, indicadores y reportes.  

#### Consideraciones
No aplica.

---

### MÓDULO GASTOS (GA, AD)

**Tipo:** Contable y operativo  

#### Descripción
El módulo de **Gastos** le permite registrar, controlar y auditar sus gastos de manera ágil y eficiente.  
Además, cumple con el envío electrónico a la **DIAN** del **Documento Soporte en compras a sujetos no obligados a facturar**.  

Ahorre tiempo programando operaciones recurrentes y acceda a informes detallados para una auditoría más sencilla y precisa.  

**Propósito:**  
Registrar, controlar y auditar los **gastos operativos, administrativos y financieros** de la empresa, garantizando el cumplimiento tributario con la **DIAN** mediante la emisión del **Documento Soporte en compras a no obligados a facturar**.  

El módulo permite automatizar procesos contables y tributarios, registrar operaciones recurrentes, controlar amortizaciones y generar reportes detallados para una auditoría precisa y una gestión eficiente del flujo de efectivo.

#### ✅ Permite

##### Recepción de documentos
- Recibe las facturas electrónicas de tus compras y gastos al correo y envíalas al buzón de ContaPyme. Podrás descargarlas desde ContaPyme para que se registren automáticamente en tu contabilidad. 
- Si son facturas a crédito, registra los eventos electrónicos exigidos por la DIAN con un solo clic desde el Manejador de Operaciones.

##### Gestion de Compras
- Operación de compras: Registra compras de bienes o servicios de forma intuitiva y ordenada.
- Devolución en compras: Administra devoluciones a proveedores, manteniendo la trazabilidad de los registros
- Nota de ajuste DSNO (compras): Realiza correcciones sobre compras a proveedores no obligados a facturar electrónicamente.

##### Gestión de gastos
- Gastos: Permite registrar fácilmente los gastos, incluso sin conocimientos contables.
- Emite los Documentos de Soporte a No Obligados para tus gastos y compras.
- Pagos: Registra un gasto y realice pagos a terceros en la misma transacción, conciliando cuentas por cobrar/pagar automáticamente.
- Nota de ajuste crédito a DSNO (gastos): Realiza ajuste gastos realizados a proveedores no obligados a emitir factura electrónica.
- Gastos diferidos: Registra de manera sencilla los gastos pagados por anticipado que deben amortizarse en el tiempo. El sistema automatiza el cálculo y la contabilización de la amortización, garantizando un control preciso según el periodo en que se reciben los servicios o se incurre en los costos.
- Traslado de fondos: Registra movimientos de dinero entre cuentas (caja/banco), con impresión del movimiento contable registrado.
- Acciones automaticas al final de mes : Realiza el cálculo y contabilización automática de la amortización de los activos diferidos que la empresa tiene registrados en la contabilidad.

##### Operaciones en bloque
- Generación automática de gastos en bloque: Permite definir de forma anticipada los conceptos de gasto asociados a cada tercero, utilizando cuentas contables específicas. El valor de cada gasto puede ser fijo o calculado mediante fórmulas. Una vez configurado, el sistema genera automáticamente las operaciones de gasto recurrentes, agilizando y automatizando todo el proceso operativo y contable.
- Registro de novedades : Las novedades de operaciones en bloque permiten registrar conceptos extraordinarios que serán incluidos en la generación de operaciones recurrente.

##### Informes
- Reporte de factura de compra: Informe que muestra detalles de las facturas de compra, incluyendo información sobre proveedores.
- Exporador de contabilidad: Permite revisar la información contable de forma interactiva y detallada. Puedes hacer auditorías, ver operaciones específicas, modificar datos y analizar la información gráficamente  para tomar mejores decisiones.
- Estado de resultados: Consulta de estado de resultados con posibilidad de interactuar con cifras y auditar todo los registros en profundidad.
- Explorador de inventarios: Visualiza movimientos de compras con filtros personalizados por periodo y tipo de operación.
- Reporte de control de documentos: Genera reportes en PDF, Word o Excel; compártalos por correo o imprímalos fácilmente.
- Generación de formatos para información exógena: Facilita la creación de los formatos DIAN con la información contable registrada, incluyendo una prevalidación que permite verificar los datos antes del envío, reduciendo errores y evitando posibles sanciones. Los formatos se mantienen actualizados conforme a los cambios en la normativa vigente.

##### Operaciones en moneda extranjera
- Registro de operaciones en moneda extranjera: Permite registrar transacciones en diferentes monedas, facilitando el control de operaciones internacionales. Además, realiza ajustes automáticos por variaciones en la tasa de cambio.
- Registro de tasas de cambio: Mantén actualizadas las tasas de cambio y consúltalas fácilmente para aplicarlas con precisión en tus transacciones en moneda extranjera.

##### Cálculo automático de impuestos
- Cálculo automático de impuestos: Incluye un catálogo de impuestos listo para usar. Solo debes definir las condiciones específicas para cada tipo de egreso, y el sistema se encargará de calcular automáticamente todas las obligaciones tributarias (IVA, retenciones, entre otros) según las normas y porcentajes vigentes, garantizando precisión y cumplimiento.

#### 🚫 No permite
- **Emitir facturas de venta ni notas crédito/débito** (funcionalidad del módulo **Facturación**).  
- **Administrar inventarios o registrar existencias** (funcionalidad del módulo **Inventarios**).  
- **Registrar nómina o pagos a empleados** (funcionalidad del módulo **Nómina**).  
- **Gestionar cuentas por cobrar/pagar** a nivel de cartera (funcionalidad del módulo **Cartera y Proveedores**).  
- **Realizar cierres contables ni generar estados financieros** (funcionalidad del módulo **Contabilidad**).  
- **Definir órdenes de compra o requisiciones internas** (funcionalidad del módulo **Inventarios Plus**).  
- **Controlar activos o depreciaciones** (funcionalidad del módulo **Activos Fijos**).  

#### Palabras clave
gastos, compras, documento soporte, no obligados, DSNO, devoluciones, proveedores, pagos, egresos, gastos diferidos, amortización, retenciones, IVA, DIAN, eventos electrónicos, buzón de recepción, información exógena, operaciones recurrentes, control de gastos, impuestos automáticos, contabilidad de gastos.

#### Relación con otros módulos
- **Contabilidad (CN):** genera y sincroniza automáticamente los asientos contables de los gastos, impuestos y amortizaciones.  
- **Cartera y Proveedores (CX):** registra los pagos o anticipos a proveedores y refleja las cuentas por pagar.  
- **Inventarios (IN):** relaciona compras de productos o servicios que afectan existencias.  
- **Inventarios Plus (IP):** recibe las órdenes de compra y recepciones que luego se transforman en facturas o gastos.  
- **Básico (BS):** utiliza sus catálogos de terceros, tipos de documento y parámetros de impuestos.  
- **ContaExcel / Indicadores:** exporta la información contable de gastos y costos para análisis financiero.  

##### Consideraciones
- Para la recepción de documentos y envío de eventos a la DIAN se requiere un plan de servicios electrónicos que incluya Recepción de documentos activo.
- La emisión del Documento de Soporte a No Obligados requiere un plan de servicios electrónicos.

---

### MÓDULO INVENTARIOS PLUS (IP)

**Tipo:** Comercial y administrativo  

#### Descripción
El módulo **Inventarios Plus (IP)** permite la administración de documentos comerciales con clientes —como **cotizaciones, pedidos y remisiones**— y con proveedores —como **órdenes de compra, requisiciones internas y recepción de materiales**—.  

Estos documentos pueden integrarse posteriormente con los procesos de **compras, ventas y salidas del inventario**, garantizando control y trazabilidad en cada etapa del ciclo comercial.

**Propósito:**  
El módulo **Inventarios Plus (IP)** amplía las funcionalidades del módulo de **Inventarios**, incorporando la **gestión comercial y administrativa previa a las operaciones contables y de inventario**.  

Su propósito es administrar documentos intermedios como **cotizaciones, pedidos, remisiones, órdenes de compra, recepciones y requisiciones internas**, asegurando la trazabilidad de las transacciones entre clientes, proveedores y bodegas.  

Funciona como un módulo de **pre–facturación y pre–compra**, facilitando el control de compromisos comerciales, la disponibilidad de stock y el flujo de materiales antes de que los movimientos afecten inventarios o contabilidad.

#### ✅ Permite
- Asistentes especializados para la generación de **cotizaciones, pedidos, remisiones** y **devoluciones de remisiones**.  
- Asistentes especializados para la generación de **órdenes de compra**, **recepción de materiales** y sus devoluciones.  
- Control del **inventario de disponibilidad**, según la proyección de posibles entradas y salidas de mercancía.  
- **Integración inmediata** con los procesos de facturación y compras, permitiendo referenciar documentos previos.  
- Manejo **independiente y automatizado** del inventario contable y físico.  
- **Impresión de cotizaciones** en diversos formatos (PDF, RTF, HTML, entre otros).  
- Explorador dinámico tipo **semáforo** para monitorear el estado de cotizaciones, pedidos y remisiones.  
- Permite **realizar anticipos** en pedidos y órdenes de compra a proveedores.  
- Permite el **cierre de documentos** mediante facturación o descarte (cotización, pedido, remisión, orden de compra o recepción de materiales).  
- **Trazabilidad completa** de los documentos generados.  
- Configuración de **plazos de vencimiento** para controlar el estado de los documentos (vigentes, próximos a vencer o vencidos).  
- Definición personalizada de la **estructura de la cotización**, incluyendo saludo, despedida, anexos (tablas, cuadros, imágenes) y observaciones seleccionables.  

#### 🚫 No permite
- **Registrar movimientos contables o de inventario reales** (funcionalidad de los módulos **Contabilidad** e **Inventarios**).  
- **Emitir facturas, notas crédito o débito** (funcionalidad del módulo **Facturación**).  
- **Registrar pagos, cobros o cuentas por pagar/cobrar** (funcionalidad del módulo **Cartera y Proveedores**).  
- **Registrar gastos o documentos soporte DSNO** (funcionalidad del módulo **Gastos**).  
- **Gestionar presupuestos o costos de producción** (funcionalidad de los módulos **Presupuesto** y **Costos de Producción**).  
- **Transmitir documentos electrónicos a la DIAN**, ya que los documentos de este módulo no son de carácter fiscal.  

#### Palabras clave
inventarios plus, cotizaciones, pedidos, remisiones, órdenes de compra, recepción de materiales, requisiciones internas, anticipos, disponibilidad de stock, documentos comerciales, trazabilidad, pre–factura, pre–compra, explorador tipo semáforo, control de vencimientos.  

#### Relación con otros módulos
> Este módulo requiere tener activo el módulo de **Inventarios (IN)**.
- **Inventarios (IN):** actualiza existencias y costos cuando los documentos de IP se convierten en operaciones reales de compra o venta.  
- **Facturación (FE):** permite convertir cotizaciones, pedidos o remisiones en facturas sin redigitar información.  
- **Cartera y Proveedores (CX):** genera las cuentas por pagar o cobrar derivadas de las operaciones confirmadas.  
- **Contabilidad (CN):** registra los asientos automáticos al procesar los documentos provenientes de IP.  
- **Nómina (NO/NP):** calcula comisiones cuando los pedidos o remisiones se transforman en ventas.  
- **Básico (BS):** utiliza sus catálogos de terceros, tipos de documento y parámetros de impresión.  

#### Consideraciones
No aplica.

---

### MÓDULO ACTIVOS FIJOS (AF)

**Tipo:** Contable y patrimonial  

#### Descripción
El módulo **Activos Fijos (AF)** permite el manejo contable —local y NIIF— de los activos de la empresa.  
Incluye asistentes para registrar **compras, ventas, revaluaciones, deterioros, reclasificaciones y bajas de activos**, automatizando la gestión contable y asegurando la trazabilidad de cada movimiento.

**Propósito:**  
Administrar el **ciclo de vida completo de los activos de la empresa**, desde su adquisición hasta su baja, con control contable, fiscal y NIIF.  

El módulo permite registrar, depreciar, valorizar, reclasificar o dar de baja activos de manera automatizada, garantizando:
- La trazabilidad contable,  
- El cumplimiento normativo,  
- Y la integración con la contabilidad general.  

Su objetivo es mantener actualizados los **valores en libros** y facilitar la toma de decisiones sobre inversión, reemplazo y control patrimonial.

#### ✅ Permite
- Registrar y automatizar la contabilización (local y NIIF) de los activos de la empresa.  
- Usar un **catálogo preconfigurado de grupos de activos** para automatizar operaciones contables como compra, venta, baja, valorización, ajustes, depreciación, deterioros o reclasificaciones.  
- Definir diferentes **tipos de depreciación**: línea recta, por unidades de uso o producción, mensual acelerada y doble línea recta.  
- Crear y mantener el **catálogo de fichas técnicas** de los activos.  
- Calcular automáticamente las **depreciaciones** de cada activo.  
- Utilizar **asistentes especializados** para registrar compra, venta, mayores valores, revalorización, baja y uso de activos con total automatización contable.  
- Usar un asistente para la **conversión de activos** de contabilización local a contabilización NIIF (método del costo o método de revaluación).  
- Registrar **deterioros y reversiones de deterioro** considerando conceptos como valor en uso y valor razonable.  
- Visualizar la **ficha técnica del activo** con su estado en libros: costo histórico, depreciaciones, valorizaciones, valor residual, deterioros y valor en libros actual.  
- Administrar nuevos grupos de activos NIIF: **propiedades de inversión** y **activos mantenidos para la venta**.  
- Consultar el **historial completo del activo**, incluyendo responsables y centros de costos por los que ha pasado.  
- Acceder a un **explorador de movimientos contables** que muestra todos los registros relacionados con cada activo (depreciaciones, deterioros, valorizaciones, etc.).  
- Calcular automáticamente los **impuestos en compra de activos**, llevando el IVA como un mayor valor del activo.  
- Explorar gráficamente los activos de la empresa mediante un sistema visual e interactivo que facilita su consulta.  

#### 🚫 No permite
- **Gestionar inventarios o existencias físicas** (funcionalidad del módulo **Inventarios**).  
- **Emitir facturas de venta o notas crédito/débito** (funcionalidad del módulo **Facturación**).  
- **Realizar contabilizaciones manuales** fuera del flujo de depreciación o movimientos automáticos (funcionalidad del módulo **Contabilidad**).  
- **Registrar nómina ni pagos asociados a empleados** (funcionalidad del módulo **Nómina**).  
- **Controlar presupuestos o ejecución financiera** (funcionalidad del módulo **Presupuesto y Ejecución Presupuestal**).  

#### Palabras clave
activos fijos, depreciación, revaluación, deterioro, reclasificación, baja de activos, valor en libros, NIIF, costo histórico, valor residual, propiedades de inversión, activos mantenidos para la venta, ficha técnica, contabilidad de activos, valorización, amortización, control patrimonial.

#### Relación con otros módulos
> Requiere tener activo el módulo de **Contabilidad (CN)**.
- **Contabilidad (CN):** integra los registros automáticos de adquisición, depreciación, valorización y baja de activos, actualizando en tiempo real los saldos contables y los estados financieros.  
- **Gastos (GA):** registra la compra de activos y los documentos soporte que originan su incorporación al catálogo de activos fijos.  
- **Cartera y Proveedores (CX):** gestiona las cuentas por pagar asociadas a la adquisición de activos.  
- **Presupuesto y Ejecución Presupuestal (PR):** compara la ejecución real de las compras de activos con el presupuesto aprobado.  
- **Análisis e Indicadores / ContaExcel:** permite generar informes de depreciación, valorizaciones y estado patrimonial mediante tableros y hojas dinámicas.  

#### Consideraciones
No aplica.

---

### MÓDULO COSTOS DE PRODUCCIÓN (CO)

**Tipo:** Contable y operativo  

#### Descripción
El módulo **Costos de Producción (CO)** habilita a ContaPyme® como un completo sistema de **contabilidad de costos**.  
Permite implementar diferentes métodos de costeo para calcular los costos de los procesos productivos y analizar la rentabilidad por centros de costos u órdenes de producción.  
(Requiere de otros módulos para su funcionamiento).

**Propósito:**  
El módulo **Costos de Producción (CO)** convierte a ContaPyme® en un sistema completo de **contabilidad de costos**, permitiendo calcular y analizar los costos de producción de manera automatizada y precisa.  

Su propósito es ofrecer herramientas para **asignar, distribuir y controlar los costos directos e indirectos** (mano de obra, insumos, materia prima, CIF, etc.), aplicando diferentes **métodos de costeo**.  

Facilita el análisis de rentabilidad por centros de costos y órdenes de producción, garantizando información confiable para la toma de decisiones sobre **eficiencia, precios y márgenes de utilidad**.

#### ✅ Permite
- Disponer de un **completo sistema de contabilidad de costos** integrado al resto de módulos de ContaPyme®.  
- Implementar **diferentes métodos de costeo** según las necesidades del proceso productivo.  
- Calcular automáticamente los **costos por unidad de producto**.  
- Ejecutar procesos automáticos de **cálculo de variaciones** entre costos reales y estándar.  
- Automatizar todo el **proceso contable de costos**, generando asientos y traslados contables automáticos.  
- Gestionar **procesos de producción compuestos**, ya sea en serie o en paralelo.  
- Generar **informes completos de costos de producción** por centros de costos.  
- Utilizar asistentes especializados para la **transformación y traslado de productos** entre procesos.  
- Consultar **informes del estado de producción** y **tablas comparativas** por período o centro de costos.  
- Calcular **costos por secciones homogéneas** o por **absorción total**.  
- Configurar **distribuidores de costos** y definir múltiples criterios para la reasignación de gastos.  
- Crear **centros de costos indirectos (CIF)** para distribuir cargas indirectas de manera proporcional.  
- Definir modelos de costeo basados en **órdenes de producción u órdenes de trabajo**.  
- Controlar y asignar automáticamente los **costos directos e indirectos** a cada orden de producción.  
- Registrar y analizar las **planillas de labores de mano de obra**, con su impacto en el costo del proceso.  
- Generar estadísticas y métricas de **rendimiento laboral** dentro del proceso productivo.  
- Definir **modelos de contratación** y control de tiempos de trabajo por empleado o proceso.  
- Visualizar **cronogramas de labores** por centros de costos productivos.  
- Imprimir **planillas semanales** o consolidados de periodos específicos.  
- Generar informes que discriminan la cantidad de mano de obra y labores realizadas por proceso productivo.  

#### 🚫 No permite
- **Registrar compras o ventas** de productos terminados (funcionalidad de los módulos **Inventarios** y **Facturación**).  
- **Registrar gastos generales o administrativos** (funcionalidad del módulo **Gastos**).  
- **Gestionar nómina o liquidación de empleados** (funcionalidad del módulo **Nómina**).  
- **Registrar asientos contables independientes** (funcionalidad del módulo **Contabilidad**).  
- **Emitir documentos electrónicos** (funcionalidad de los módulos **Facturación** y **Gastos**).  
- **Realizar control físico de existencias** o ajustes de inventario (funcionalidad del módulo **Inventarios**).  

#### Palabras clave
costos de producción, costeo, órdenes de producción, costos directos, costos indirectos, CIF, mano de obra, materia prima, transformación, centros de costos, variaciones, absorción, planilla de labores, contabilidad de costos.

#### Relación con otros módulos
> Requiere tener activo el módulo de **Contabilidad (CN)** y se integra completamente con **Inventarios (IN)** y **Nómina (NE/NP)**.

- **Contabilidad (CN):** registra automáticamente los asientos de costos y su traslado a cuentas contables, permitiendo la integración total del costeo con los estados financieros.  
- **Inventarios (IN):** alimenta los costos de materia prima, productos en proceso y terminados, actualizando el valor de las existencias.  
- **Nómina (NP/NE):** utiliza la información registrada en los pagos de nómina para calcular los costos por mano de obra.  
- **Básico (BS):** provee los catálogos de centros de costos, tipos de documento y estructura organizacional necesarios para el análisis y distribución de costos.  

#### Consideraciones
Se recomienda para empresas que realmente requieren un control detallado de costos de mano de obra, insumos, materia prima, etc. y que tengan la infraestructura administrativa para el registro de datos y análisis posterior.
Para empresas con necesidades de control de costos más estándar, tipo materia prima, se recomienda usar el módulo de Inventarios.

---

### MÓDULO ANÁLISIS E INDICADORES

**Tipo:** Analítico y gerencial  

#### Descripción
El módulo **Análisis e Indicadores (AI)** es una herramienta analítica diseñada para **gerentes, contadores y analistas** que desean desarrollar sus propios reportes e indicadores de gestión, manteniéndolos actualizados en tiempo real con la información registrada en la contabilidad de la empresa.  

Incluye indicadores predefinidos, manejo de datos comparativos y un **complemento de Excel (ContaPyme para Excel)**, que permite explotar la información contable utilizando todo el poder y flexibilidad de las hojas de cálculo.

**Propósito:**  
El módulo **Análisis e Indicadores (AI)** está diseñado para ofrecer herramientas de **inteligencia analítica y control de gestión** dentro del ecosistema ContaPyme®.  

Su propósito es permitir que gerentes, contadores y analistas construyan, personalicen y consulten **indicadores financieros, contables y administrativos** en tiempo real, utilizando los datos registrados en los diferentes módulos del sistema.  

Mediante su integración con el complemento **ContaPyme para Excel**, el módulo facilita la creación de **tableros, reportes y gráficos interactivos** con actualización automática, transformando la información contable en conocimiento estratégico para la toma de decisiones.

#### ✅ Permite

##### ContaPyme para Excel: 
- Complemento para Excel que permite conectarse en tiempo real a la contabilidad en ContaPyme, por medio de más de 150 fórmulas como =saldocuenta(), =ingresosventas(), etc.
- Trabaja completamente desde MS - Excel® 2007 y MS - Excel® 2010.
- Aprovecha las capacidades y funcionalidades de MS - Excel® y permite utilizar y actualizar toda la información almacenada en ContaPyme® (terceros, planes de cuentas, inventarios, etc).
- Completa integración de la información para definir y calcular indicadores predefinidos o parametrizables según necesidad.
- ompleta gama de formatos de indicadores y gráficos, además de la opción de guardarlos para su consulta posterior.
- Actualización automática de la información del gráfico o indicador para su fácil impresión y análisis.

##### Indicadores:
- Permite la creación de indicadores históricos, gráficos de barras, de columnas, de pastel, etc. De las diferentes cuentas y centros de costos de la contabilidad. 
- Construcción del cuadro de control principal de la empresa, para ver su estado y principales indicadores.

##### Análisis de información
- Analice su información rápidamente con tablas y gráficos comparativos en diferentes informes que le permitirán entender compartamientos de su empresa, por año, por meses o por centro de costos.
- Agrupe, ordene, grafique casi cualquier explorador que genera ContaPyme para entender mejor su contabilidad, inventarios, cartera.
- Exporte a Excel sus informes con un solo clic y realice todos los informes personalizados para su gestión.

#### 🚫 No permite
- **Registrar operaciones contables o administrativas**, como ventas, compras o pagos (funcionalidad de los módulos **Contabilidad, Facturación, Cartera y Gastos**).  
- **Modificar datos o saldos de los módulos fuente**, ya que su función es únicamente analítica.  
- **Emitir documentos electrónicos ni comprobantes contables.**  
- **Gestionar presupuestos, provisiones o cálculos de nómina**, los cuales pertenecen a sus respectivos módulos (**Presupuesto, Costos, Nómina**).  
- **Registrar o alterar inventarios físicos o costos de producción**, procesos que dependen de los módulos **Inventarios** y **Costos de Producción**.  

#### Palabras clave
análisis, indicadores, reportes gerenciales, gráficos, métricas financieras, ContaPyme para Excel, ContaExcel, Excel conectado, KPIs, cuadros de mando, análisis comparativo, rentabilidad, desempeño empresarial, control de gestión.

#### 🔗 Relación con otros módulos
- **Contabilidad (CN):** fuente principal de los datos financieros para generar indicadores y estados comparativos.  
- **Inventarios (IN):** aporta información de costos, rotación, ventas y margen de productos.  
- **Facturación (FE):** provee datos de ventas, ingresos y comportamiento comercial.  
- **Cartera y Proveedores (CX):** permite analizar flujo de caja, rotación de cartera y plazos de pago.  
- **Nómina (NP/NE):** suministra información de costos laborales, provisiones y prestaciones.  
- **Costos de Producción (CO):** ofrece datos de costos directos e indirectos para análisis de rentabilidad.  
- **Básico (BS):** administra los catálogos de centros de costos y terceros utilizados en los indicadores.  

#### Consideraciones
- El uso del complemento **ContaPyme para Excel** requiere **póliza vigente**.  
- Para un desempeño óptimo, se recomienda **Excel versión 2007 o superior**.  
- No requiere configuración contable adicional; utiliza directamente la información registrada en los módulos activos. 

---

### MÓDULO MÚLTIPLES CONTABILIDADES

**Tipo:** Administrativo y contable  

#### Descripción
El módulo **Múltiples Contabilidades (MC)** permite a contadores, asesores o empresas administrar **varias contabilidades independientes** desde un mismo computador o instalación de ContaPyme®.  

Está diseñado especialmente para oficinas contables y usuarios que gestionan diferentes empresas, facilitando la **creación, apertura, organización y control de cada contabilidad** sin interferir con las demás.  

Garantiza **independencia total de información, usuarios, catálogos y documentos**, manteniendo un entorno ordenado, seguro y eficiente.

**Propósito:**  
El módulo **Múltiples Contabilidades** tiene como propósito ofrecer una **solución práctica y segura** para la administración de varias empresas o entornos contables dentro del mismo sistema.  

Facilita la creación y organización de diferentes contabilidades, permitiendo mantener la independencia de los datos, la personalización de catálogos y el control total sobre la información contable y los accesos de usuarios.

---

#### ✅ Permite
- **Crear y administrar múltiples contabilidades o empresas** totalmente independientes dentro de un mismo sistema.  
- **Definir diferentes áreas de trabajo**, organizando las bases de datos por carpetas separadas para cada empresa.  
- **Asignar planes de cuentas únicos o personalizados** por contabilidad, según el tipo de empresa (comercial, solidaria, de servicios, etc.).  
- **Utilizar catálogos de terceros, documentos y configuraciones específicas** para cada empresa creada.  
- **Abrir, cerrar, respaldar o restaurar contabilidades** desde una interfaz centralizada.  
- **Controlar el acceso y la seguridad** de cada empresa mediante usuarios y permisos independientes.  
- **Migrar información o duplicar estructuras base** (como plan de cuentas o catálogos) entre diferentes empresas.  
- **Gestionar fácilmente entornos contables locales o en red**, sin interferencias entre licencias o áreas de trabajo.  

#### 🚫 No permite
- **Registrar operaciones contables, ventas, compras o nómina directamente**, ya que estas funciones pertenecen a los módulos **Contabilidad**, **Facturación**, **Gastos**, **Cartera** o **Nómina**.  
- **Consolidar automáticamente balances entre empresas diferentes**, pues la consolidación se realiza de forma manual o mediante herramientas analíticas como **ContaPyme para Excel**.  
- **Compartir bases de datos o catálogos comunes** entre contabilidades independientes; cada empresa conserva su propia estructura.  
- **Generar reportes unificados de varias contabilidades** dentro del sistema; esto se logra con el módulo **Análisis e Indicadores**.  

#### Palabras clave
múltiples empresas, varias contabilidades, contabilidad independiente, oficinas contables, áreas de trabajo, bases de datos, plan de cuentas independiente, licencias múltiples, manejo de empresas, usuarios contables, separación de información.

#### Relación con otros módulos
- **Sistema Básico:** utiliza los catálogos y configuraciones base (terceros, documentos, centros de costos) dentro de cada contabilidad.  
- **Contabilidad:** se integra al crear, registrar y consultar los movimientos contables de cada empresa.  
- **ContaPyme para Excel:** permite consolidar o analizar los resultados de múltiples empresas en hojas de cálculo externas.  
- **Análisis e Indicadores:** facilita la creación de indicadores comparativos entre distintas contabilidades o períodos.  

**Resumen funcional:**  
> El módulo **Múltiples Contabilidades** está diseñado para facilitar la gestión de varias empresas dentro de un mismo entorno de trabajo, garantizando **independencia total** entre contabilidades, **flexibilidad en la configuración** y **eficiencia en el manejo de la información contable y administrativa**.

---

### MÓDULO SINCRONIZACIÓN ENTRE SUCURSALES

**Tipo:** Administrativo y técnico  

#### Descripción
El módulo **Sincronización entre Sucursales (SS)** permite mantener actualizados y consolidados los datos de la empresa entre diferentes equipos o sedes, incluso cuando **no existe conexión directa por red o Internet**.  

Su función principal es **transferir información contable, administrativa y de inventarios** entre sucursales, garantizando la continuidad operativa, la coherencia de los datos y la seguridad de la información mediante procesos de compresión y validación.


**Propósito**  
El propósito del módulo **Sincronización entre Sucursales** es facilitar la **transferencia segura y eficiente de información** entre sedes o equipos desconectados, manteniendo la integridad y homogeneidad de los datos de la empresa.  

Permite consolidar los movimientos registrados en cada sede, asegurando que los procesos contables, administrativos y de inventarios permanezcan actualizados en todas las locaciones.

#### ✅Permite  
- **Exportar e importar información** entre sucursales o equipos sin conexión directa.  
- **Consolidar los datos** registrados en distintas sedes de la empresa.  
- **Generar archivos comprimidos (.ZIP)** con la información necesaria para la sincronización.  
- **Enviar o recibir los archivos** de sincronización por medios externos (correo, USB, disco compartido, etc.).  
- **Actualizar las bases de datos locales** con los movimientos o registros más recientes de cada sede.  


#### 🚫No permite  
- **Registrar transacciones o documentos comerciales** directamente.  
- **Realizar operaciones contables, de facturación, nómina o inventarios.**  
- **Sustituir la conexión en línea o el uso de servidores en red local.**  
- **Ejecutar sincronización automática en tiempo real.**  

#### Palabras clave  
Sincronización, consolidación de datos, sedes, sucursales, importar datos, exportar empresa, actualizar información, enviar información, consolidar bases, zip de sincronización, respaldo entre sedes.

#### Relación con otros módulos  
-- **Básico (BS):** depende de sus configuraciones generales, catálogos y usuarios para garantizar compatibilidad en las sincronizaciones.  
- **Contabilidad (CN) / Inventarios (IN) / Cartera (CX) / Nómina (NE/NP):** consolida la información proveniente de estos módulos para mantener uniformidad entre las diferentes sedes.  
- **Copia de seguridad:** módulo complementario, ya que ambos mecanismos protegen la integridad de la información, pero con finalidades distintas (sincronización vs respaldo).  

#### Consideraciones
> El módulo **Sincronización entre Sucursales** está diseñado para empresas con operaciones descentralizadas o sin conectividad continua.  
> Garantiza la integridad de los datos entre sedes, pero **no reemplaza un sistema en red o sincronización en tiempo real**.

---

## Definiciones clave del sistema
**Operación:** En ContaPyme, las operaciones son asistentes para registrar las transacciones contables o administrativas que puede realizar una empresa en su día a día. Por ejemplo: ventas, compras, gastos, movimiento contable, movimiento universal de inventario, traslados entre bodegas, abonos a cuentas por pagar, abonos a cuentas por cobrar, etc. Estos asistentes solicitan información al usuario y, al procesarse, registran los asientos contables, de inventarios y demás movimientos que aplican automáticamente.

**Terceros:** son las personas, naturales o jurídicas, con las que tiene relación una empresa. Pueden ser: empleados, clientes, proveedores, socios, etc.

**Licencia:** la licencia es el número que autoriza el uso de ContaPyme. Cuando un cliente compra, se le otorga un número de licencia que debe ingresar al instalar ContaPyme en su computador. Ese número de licencia tiene toda la información de módulos y usuarios que el cliente adquirió.

**Póliza:** Servicio que se cobra de manera anual (siemrpe incluido en el primer año) para obetener derecho a las actualizaciones del sistema, soporte técnico personalizado, acceso a la plataforma de capacitación virtual, acceso a memorias de cursos con expertos, etc.

**Servicios electrónicos:** ContaPyme se integra al sistema de Facturación Electrónica de la DIAN de la mejor manera y ofrece planes prepago de documentos que incluyen envíos de facturación electrónica, nómina electrónica, documentos de soporte a no obligados y eventos electrónicos. 

**Área de trabajo:** espacio físico donde se almacenará la base de datos de la empresa, puede entenderse también como la "carpeta" donde quedará grabada toda la información.


## Enlaces útiles
- **Inicio**: https://www.contapyme.com/
- **Precios – Paquetes (COP/USD)**: https://www.contapyme.com/precios/paquetes/cop/
- **Precios – Módulos**: https://www.contapyme.com/precios/modulos/cop/
- **Requerimientos**: https://www.contapyme.com/programa-contable/requerimientos/
- **POS**: https://www.contapyme.com/POS/
- **Servicios electrónicos** (Factura, Nómina, Documento soporte): https://www.contapyme.com/servicios-electronicos/
- **API / Integraciones**: https://www.contapyme.com/info-api/
- **Portal de clientes**: https://www.contapyme.com/portal-clientes
- **Demo**: https://www.contapyme.com/demo/
- **Contacto**: https://www.contapyme.com/contactenos/

