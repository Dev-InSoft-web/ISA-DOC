# pf_contabilidad.md
> **Propósito:** Reunir las preguntan frecuentes del módulo **Contabilidad**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntan frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2026/02/05

## Reportes contables y terceros

### ¿Por qué el reporte Mayor y Balance por terceros muestra **DIAN** para todos los movimientos?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Por qué el mayor por terceros muestra DIAN en todos los movimientos?  
- ¿Por qué en el balance por terceros todos aparecen como DIAN?  
- ¿Por qué el informe contable no discrimina los terceros?  
- ¿Por qué el reporte contable agrupa todo en un solo tercero?  
- ¿Por qué el mayor auxiliar muestra siempre el mismo tercero?  
- ¿Por qué veo DIAN como tercero en un reporte contable?  

#### Respuesta: 
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->

Cuando en el **reporte Mayor y Balance por terceros** todos los movimientos aparecen asociados al tercero **DIAN**, **no necesariamente se trata de un error del informe**.

Este comportamiento depende principalmente de la **configuración contable de la cuenta contable consultada**, ya que el reporte refleja **el tercero con el que se generan los asientos contables**, según la parametrización existente en el sistema.

#### Posible causa

#### La cuenta contable corresponde a impuestos o retenciones

Si la cuenta consultada corresponde a **impuestos, retenciones u obligaciones con entidades**, es posible que el tercero **DIAN** aparezca de forma generalizada en el reporte.

En estos casos, el tercero suele definirse desde el **concepto de liquidación**, mediante el campo **Tipo de entidad o alias de tercero**, el cual indica **sobre qué tercero se genera el asiento contable** (cuenta por pagar, cuenta por cobrar, gasto o ingreso).

Por ejemplo:
- Un **concepto de IVA** configurado con el tipo de entidad **[ADMINIMP]**
- Asigna automáticamente **DIAN** como tercero
- Por lo tanto, todos los movimientos asociados a esa cuenta se reflejan a nombre de **DIAN** en el informe

En este escenario, el resultado del reporte es **esperado y correcto**.

##### ¿Qué son las entidades y alias de terceros?

Las **entidades de terceros** o **alias de tercero** permiten centralizar la asignación del tercero contable.

- Representan terceros genéricos del sistema (DIAN, EPS, fondos, entre otros).
- Están asociados a terceros reales previamente creados.
- Facilitan el mantenimiento, ya que un cambio en el alias no requiere modificar todos los conceptos de liquidación.

**Ejemplos comunes:**

| Concepto de liquidación | Alias de tercero |
|------------------------|------------------|
| Concepto de IVA | `[ADMINIMP]` |
| Retención de ICA | `[ADMMPAL]` |
| Cesantías | `[CESANTIAS]` |
| Vacaciones | `[TERCEROOPR]` |
| Aportes de salud trabajador | `[EPS]` |

#### ⚠️ Nota importante: cuando el comportamiento **no es el esperado**

Si la cuenta contable consultada **no corresponde a impuestos ni obligaciones con entidades**, este resultado **no es el esperado** y requiere validación adicional.

En ese caso es necesario revisar:
- Qué **cuenta contable** se está consultando  
- La **configuración de la cuenta**  
- Cómo se generan los movimientos sobre esa cuenta  
- Qué tercero se está asignando contablemente  
- El **origen del movimiento** (ventas, compras, nómina, cartera, etc.)

👉 **Debido a que esta información depende de configuraciones específicas por empresa y no puede determinarse solo con el reporte**, se recomienda **crear un tiquete de soporte**, indicando:

- Cuenta contable afectada  
- Informe consultado  
- Período del reporte  
- Captura del resultado donde se evidencie el tercero  

Esto permitirá validar la configuración exacta y orientar la corrección adecuada según el caso.

---

### ¿Cómo puedo configurar un centro de costos por defecto en una cuenta contable?

CANONICAL_ID: PF_CONTABILIDAD_CC_POR_DEFECTO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.

- ¿Cómo poner un centro de costos automático en una cuenta?
- ¿Se puede dejar un centro de costos fijo por defecto?
- La cuenta no trae centro de costos automáticamente, ¿qué debo configurar?
- ¿Dónde se define el centro de costos por defecto?
- ¿Cómo hacer que siempre tome el mismo centro de costos?

---

#### Respuesta:

**Descripción:**

En ContaPyme, el centro de costos no se define directamente en la cuenta contable.  
El sistema toma el centro de costos dependiendo del origen del movimiento (inventarios, productos, operaciones configuradas, activos, grupos contables, etc.).

Por eso, primero es importante identificar desde qué módulo se está generando el movimiento.

A continuación, se explican los escenarios más comunes:

##### 1️⃣ Si la operación es de Inventarios (Centro de costos en Bodega)

El centro de costos puede configurarse en la bodega.

📍 Ruta:
Inventarios → Bodegas → Modificar bodega

Si la bodega tiene un centro de costos asignado, al crear una operación de inventario y seleccionar esa bodega, el sistema traerá automáticamente ese centro de costos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Centro de costos configurado en bodega](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/img_contabilidad_cc_bodega.png)

##### 2️⃣ Si el movimiento proviene de un Producto

Se puede definir un centro de costos por defecto en la ficha del producto.

📍 Ruta:
Inventarios → Elementos de inventarios → Modificar producto

En la ficha técnica del producto se puede indicar el centro de costos por bodega que el sistema tomará automáticamente en las operaciones donde participe ese producto.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Centro de costos configurado en ficha del producto](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/img_contabilidad_cc_producto.png)

**Nota:** Por configuraciones del catálogo de elementos de inventario se debe activar el permiso "Personalizar centro de costos por bodega"

##### 3️⃣ Si es una Operación personalizada

Algunas operaciones permiten definir un centro de costos por defecto desde su configuración interna.

📍 Ruta:
Ingresar a la Operación → Menu superior: Operación → Configurar Operación

En la parametrización de la operación se puede establecer un centro de costos predeterminado que será tomado automáticamente por las cuentas contables involucradas.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Centro de costos configurado en operación](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/img_contabilidad_cc_operacion.png)

##### 4️⃣ Si corresponde a Activos Fijos

En el caso de activos, el centro de costos depende del definido en la ficha técnica del activo.

📍 Ruta:
Adicionales → Activos → Modificar activo

El sistema tomará el centro de costos configurado en el activo al momento de generar depreciaciones o movimientos contables asociados.
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Centro de costos configurado en ficha del activo](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/img_contabilidad_cc_activo.png.png)

##### 5️⃣ Si se desea configurar por Grupo Contable

En algunos casos, el centro de costos puede definirse a nivel de grupo contable, lo que permite que las cuentas asociadas a ese grupo tomen automáticamente el centro de costos configurado.

📍 Ruta:
Inventarios → Grupos de inventarios → Modificar grupo

Dentro de la configuración del grupo de inventarios, se puede definir el centro de costos por bodega que aplicará por defecto a las cuentas vinculadas a dicho grupo.
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Centro de costos configurado en grupo contable](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/img_contabilidad_cc_grupo_inventarios.png)

**Nota:** Por configuraciones del catálogo de grupos de inventario se debe activar el permiso "Personalizar centro de costos por bodega"

#### 🔎 Recomendación importante

No existe una única configuración general para todas las cuentas contables.  
El centro de costos depende del módulo desde donde se origina el movimiento.

Si el caso es específico y no corresponde a los escenarios anteriores, se recomienda crear un tiquete de soporte.

Esto permitirá validar el comportamiento exacto y orientar la parametrización correcta.

---

### ¿Cómo configurar base mínima y tarifa de retención en ContaPyme?

CANONICAL_ID: PF_RETENCION_BASE_TARIFA_CONFIGURACION
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.

- Necesito poner base de retención manual.
- ¿Dónde configuro la base mínima de retención?
- ¿Cómo cambiar la tarifa de retención?
- ¿Cómo definir el porcentaje de retención?
- Quiero modificar la base y el porcentaje de retención.

#### Respuesta:

La configuración de la base mínima y la tarifa de retención depende del tipo de retención que necesites configurar.

Existen dos escenarios diferentes en el sistema:

##### 1️⃣ Retención en operaciones (Ingresos o Egresos)

Si la retención corresponde a una operación contable, de ingresos, factura de venta, POS, gastos, compras (por ejemplo: retención por servicios, compras, honorarios, etc.), debes configurarla en el concepto de liquidación.

📍 Ruta:
Contabilidad → Concepto de liquidación en ingreso  
o  
Contabilidad → Concepto de liquidación en egreso
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto: 
![Ruta concepto de liquidación ingreso o egreso](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/img_contabilidad_ruta_concepto_liquidacion.png)

###### ⚙️ Configuración dentro del concepto

1. Selecciona el concepto correspondiente (ej: Retención por servicios).
2. Haz clic en **Modificar**.
3. En la pestaña **Forma de cálculo**:
   - Activa **Cálculo automático del impuesto, descuento o cargo**.
   - Define el **Tipo de cálculo: Porcentaje**.
   - Ingresa la **Tarifa (%)**.
   - Define el **Valor base mínimo** (en valor o UVT).

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuración base mínima y porcentaje en concepto de liquidación](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/img_contabilidad_configuracion_base_tarifa_retencion.png)

📌 Importante:
El sistema tomará automáticamente la base del cálculo según el valor de la operación (ingreso o egreso) que se esté realizando.  
No es necesario ingresar la base manualmente en cada comprobante.

##### 2️⃣ Retención en la fuente a empleados (Nómina)

Si la retención corresponde a retención en la fuente sobre salarios, la configuración se realiza desde la ficha del empleado y concepto de nómina.

En este caso el cálculo no se configura por porcentaje fijo manual, sino que el sistema evalúa automáticamente:

- Ingresos gravados
- Deducciones
- Rentas exentas
- Límites legales (UVT)

La base y el valor retenido se determinan según la normativa vigente.

#### 🔎 ¿Cómo saber cuál aplicar?

- Si estás hablando de facturas, compras, cuentas por pagar o ingresos → Es retención en operaciones.
- Si estás hablando de nómina o salarios → Es retención a empleados.

#### 📌 Recomendación

Si no estás seguro del tipo de retención, indica:

- Módulo donde estás trabajando
- Tipo de operación
- Si corresponde a empleados o a facturación/compras

Esto permitirá orientar correctamente la configuración.

---

### ¿Cómo ver una cuenta no visible en el plan de cuentas en ContaPyme?

CANONICAL_ID: PC_CUENTA_NO_VISIBLE_VER
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.

- ¿Cómo ver una cuenta oculta en el plan de cuentas?
- No encuentro una cuenta en el plan de cuentas.
- ¿Por qué no aparece una cuenta en ContaPyme?
- ¿Cómo mostrar cuentas no visibles?
- No veo una cuenta contable en la lista.
- ¿Cómo acceder a una cuenta que no aparece en el plan de cuentas?
- COMO PUEDO VER LA CUENTA DE IVA DESCONTABLE EN SERVICIOS 19% EN EL PLAN DE CUENTAS PORQUE ESTA OCULTA

#### Respuesta:

En ContaPyme, una cuenta puede no aparecer en el plan de cuentas porque no está marcada como **visible en selección**. Sin embargo, el sistema permite visualizarla y utilizarla de diferentes formas.

Existen tres formas de acceder a una cuenta no visible:

##### 1️⃣ Mostrar todas las cuentas desde el plan de cuentas

Esta es la forma más directa para visualizar cuentas ocultas en el sistema.

📍 Ruta:  
Contabilidad → Plan de cuentas  

###### ⚙️ Pasos:

1. Ingresa al **Plan de cuentas**.
2. En la cinta de opciones, haz clic en el botón **Mostrar**.
3. El sistema desplegará **todas las cuentas**, incluyendo las que no están visibles en selección.
4. Busca la cuenta que necesitas (por ejemplo: IVA descontable servicios 19%).

📌 Importante:  
Esta opción no requiere conocer el código de la cuenta.

##### 2️⃣ Acceder a la cuenta digitando el código

Si conoces el código de la cuenta, puedes utilizarla directamente aunque no sea visible.

###### ⚙️ Cómo hacerlo:

- En cualquier comprobante o documento, digita el **código de la cuenta**.
- El sistema reconocerá la cuenta y permitirá su uso normalmente.

📌 Importante:  
La cuenta puede usarse en operaciones aunque no aparezca en las listas desplegables.

##### 3️⃣ Activar la visibilidad de la cuenta (opcional)

Si necesitas que la cuenta aparezca siempre en el plan de cuentas y en las selecciones:

###### ⚙️ Pasos:

1. Ubica la cuenta (usando cualquiera de los métodos anteriores).
2. Haz clic en **Modificar**.
3. Activa la opción **Visible en selección**.
![Activar Cuenta visible en selección](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cuenta_visible_seleccion.png)
4. Guarda los cambios.

📌 Importante:  
Al activar esta opción, la cuenta quedará disponible en los listados para futuras operaciones.

#### 🔎 ¿Por qué es importante ocultar una cuenta?

Algunas cuentas se pueden configurar como no visibles para:

- Evitar errores en la selección
- Controlar el uso de cuentas específicas
- Mantener organizado el plan de cuentas


#### 📌 Recomendación

Si no encuentras una cuenta:

- Usa primero el botón **Mostrar**
- O intenta buscarla por código
- Verifica si está marcada como **visible en selección**

Si la cuenta sigue sin aparecer, valida:

- El código exacto
- El tipo de cuenta
- O si fue creada correctamente en el sistema

---

### ¿Cómo exportar informes a Excel de forma limpia (sin celdas agrupadas) en ContaPyme?

CANONICAL_ID: INF_EXPORTAR_EXCEL_LIMPIO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.

- ¿Cómo exportar un informe a Excel sin que se desordene?
- ¿Cómo descargar un reporte de ContaPyme en Excel limpio?
- ¿Por qué algunos informes se exportan bien a Excel y otros no?
- ¿Cómo llevar un informe a Excel para trabajar con fórmulas?
- ¿Cómo exportar datos sin celdas combinadas?
- ¿Qué informes permiten exportar a Excel en ContaPyme?

#### Respuesta:

En ContaPyme, algunos informes de contabilidad e inventarios cuentan con una opción de **Exportar a Excel de forma nativa**, lo que permite descargar la información **organizada y sin celdas combinadas**, ideal para trabajar directamente en Excel.


#### 📊 ¿Qué significa exportar a Excel de forma limpia?

Cuando un informe tiene esta opción:

- ✅ Los datos se exportan en columnas organizadas  
- ✅ No hay celdas combinadas  
- ✅ Permite usar filtros, fórmulas y tablas dinámicas  
- ✅ El archivo queda listo para análisis en Excel  

#### ⚙️ ¿Cómo exportar un informe a Excel?

###### Pasos:

1. 📂 Genera el informe de impresión que necesitas (contabilidad, inventarios, etc.).  
2. 🔎 Una vez el informe esté en pantalla:  
3. 📊 Ubica en la cinta de opciones el botón **Exportar a Excel**.  
![Exportar a Excel](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/exportar_excel.png)
4. 💾 Haz clic y selecciona la ruta donde deseas guardar el archivo.  
5. ✔ Abre el archivo en Excel y trabaja normalmente con la información.

#### 📌 Importante

- ⚠️ No todos los informes tienen esta opción actualmente.  
- ✔ Solo los informes que muestran el botón **Exportar a Excel** cuentan con esta funcionalidad.  
- 📈 Esta opción se está habilitando progresivamente en más reportes del sistema.

#### ✔ ¿Cómo saber si un informe tiene esta opción?

👉 Si al generar el informe ves el botón **Exportar a Excel**, ese reporte permite exportación limpia.  
👉 Si no aparece, ese informe aún no tiene esta funcionalidad.

#### 💡 Recomendaciones

- ✅ Usa esta opción cuando necesites analizar la información en Excel.  
- 📊 Ideal para crear tablas dinámicas, filtros o reportes personalizados.  
- ⚠️ Si necesitas esta funcionalidad en un informe que no la tiene, puedes consultar con soporte técnico.

---