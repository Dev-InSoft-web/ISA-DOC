# pf_inventarios.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **inventarios**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/11/14

# Inventarios  

## Precios, Listas y Métodos de Cálculo

### ¿Cómo ajustar precios automáticamente con porcentaje?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo aumento los precios automáticamente en un porcentaje?
- ¿Cómo aplicar un porcentaje de aumento a los precios?
- ¿Cómo funcionan los precios automáticos por porcentaje?
- ¿Cómo recalcular precios usando un porcentaje?
- ¿Cómo incremento mis precios globalmente?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para ajustar los precios de tus productos **automáticamente por porcentaje**, el sistema utiliza los **métodos de cálculo**, los cuales permiten recalcular los precios de venta a partir de un valor base definido.

Este ajuste automático puede aplicarse sobre valores como el **último precio de compra**, el **costo promedio ponderado** o el **último costo de embodegamiento**, según la configuración seleccionada.

👉 Por ejemplo, puedes crear un método que aumente un **15 %** los precios basados en el **último precio de compra**, y luego aplicarlo a una lista de precios o a todos los productos del catálogo.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Pantalla de método de cálculo con porcentaje constante](https://www.contapyme.com/conocimientocontapyme/080_IN/metodo_calculo_porcentaje.png)

**Tipos de incremento disponibles**

| Tipo de incremento | Descripción breve | Ejemplo |
|--------------------|-------------------|----------|
| **Valor constante** | Aumenta un valor fijo. | $12.000 + $2.000 = $14.000 |
| **Porcentaje constante** | Incrementa el precio según un porcentaje. | $12.000 × 1.10 = $13.200 |
| **Margen constante** | Calcula el precio para obtener un margen de ganancia. | $12.000 ÷ (1 − 0.15) = $14.117 |
| **Margen o porcentaje por elemento** | Usa el margen configurado en cada producto. | $12.000 × 1.12 = $13.440 |

**Observaciones importantes**

- El ajuste por porcentaje es un **tipo de método de cálculo automático**.
- Este método **no asigna precios directamente**, sino que recalcula los valores según la base definida.
- Para utilizar este ajuste, es necesario crear primero el método y luego aplicarlo a los productos.

---

### ¿Cómo crear un método de cálculo por porcentaje?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo configuro un método para ajustar precios por porcentaje?
- ¿Cómo crear un método para subir precios masivamente?
- ¿Dónde se configuran los métodos de cálculo de precios?
- ¿Cómo puedo crear un método de cálculo para precios?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para crear un método de cálculo que ajuste los precios automáticamente por porcentaje, debes configurarlo desde la opción **Métodos de cálculo**, ubicada en el módulo de Inventarios.

Este método permitirá definir el valor base del cálculo y el porcentaje que se aplicará para actualizar los precios de venta.

**Pasos para configurar un método de cálculo con porcentaje**

1. Ingresa a **Inventarios > Menú: Elementos de inventarios > Métodos de cálculo**.  
2. Clic en **Crear**.  
3. En **Basado en**, selecciona el valor base (por ejemplo: *Último precio de compra*).  
4. En **Tipo de incremento**, elige **Porcentaje constante**.  
5. En **Porcentaje**, ingresa el valor deseado (por ejemplo: *15 %*).  
6. Define la **forma de redondeo** (decenas, cincuenta, etc.) y la **forma de actualización** (*en bloque* es la más utilizada).  
7. Guarda el método con un nombre descriptivo (por ejemplo: `Precios con incremento del 15% - Última compra`).

- La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![imagen: ruta creación métodos de cálculo](https://www.contapyme.com/conocimientocontapyme/080_IN/crear_metodo_porcentaje.png)

- La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![imagen: Formulario de método de cálculo con porcentaje constante](https://www.contapyme.com/conocimientocontapyme/080_IN/metodo_calculo_porcentaje.png)

**Recomendaciones**

- Utiliza nombres claros para identificar fácilmente el método.
- Verifica el valor base seleccionado antes de aplicar el método.
- Este método puede ser reutilizado en múltiples listas o productos.

---

### ¿Cómo aplicar un método de cálculo por porcentaje a los productos?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo aplicar el método de cálculo a una lista de precios?
- ¿Cómo asignar un método de cálculo a mis productos?
- ¿Dónde está la opción “Actualizar lista de precios”?
- ¿Cómo hacer una actualización masiva de precios?
- ¿Cómo ver una previsualización del nuevo precio antes de aplicarlo?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Una vez creado el método de cálculo por porcentaje, este debe aplicarse a los productos para que el sistema actualice automáticamente los precios de venta.

La aplicación del método puede realizarse de forma **individual** o **masiva**, según la necesidad.

**A. Aplicar el método de forma individual**

1. Ingresa a *Inventarios > Catálogo de elementos de inventario*.  
2. Clic derecho sobre el producto y selecciona **Modificar**.  
3. En la pestaña **Listas de precios**, selecciona la lista y el **método de cálculo** configurado.  
4. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ficha del producto mostrando el método de cálculo asignado](https://www.contapyme.com/conocimientocontapyme/080_IN/asignar_metodo_producto.png)

**B. Aplicar el método de forma masiva**

1. Ingresa a *Inventarios > Catálogo de elementos de inventarios > Listas de precios > Actualizar lista de precios*.  
2. Selecciona la lista que deseas recalcular.  
3. En **Método de cálculo**, elige el método configurado.  
4. Haz clic en **Previsualizar** para revisar los cambios.  
5. Finalmente, haz clic en **Actualizar** para aplicar los nuevos precios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Pantalla de actualización masiva de precios con método seleccionado](https://www.contapyme.com/conocimientocontapyme/080_IN/actualizar_lista_precios.png)

**Observaciones importantes**

- La previsualización permite validar los precios antes de aplicarlos.
- La actualización masiva modifica todos los productos asociados a la lista seleccionada.
- Este proceso es ideal para ajustes generales o cambios de temporada.

#### 📌 Recursos adicionales  
- **Guía de montaje:** Ruta: *Inventarios > Sesión de ayudas > Guías de montaje > Guía de montaje de listas de precios*  
**Video:**  
[Inventarios Básico I – Incluye listas de precios](https://www.youtube.com/watch?v=ActUvoat4tw&t=504s)

---

### ¿Cómo crear y usar un método de cálculo de precios?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué es un método de cálculo de precios?
- ¿Cómo funcionan los precios automáticos?
- ¿Cuál es la diferencia entre precios manuales y automáticos?
- ¿Cómo usar el último precio de compra como base de cálculo?
- ¿Cómo se calculan automáticamente los precios?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Un **método de cálculo de precios** define la forma en que el sistema determina automáticamente el valor de venta de un producto dentro de una lista de precios, sin necesidad de ingresar el precio manualmente.

Estos métodos se utilizan cuando se desea que los precios se actualicen automáticamente según criterios como el último precio de compra.

**Tipos de asignación de precios**

- **Manual:** el precio se ingresa directamente para cada producto.  
- **Automático:** el precio se calcula según un método configurado en el sistema.

**Ejemplo de método de cálculo**

- **Basado en último precio de compra:**  
  El sistema toma el último costo registrado del producto y lo utiliza como base para calcular el precio de venta.

Este método permite mantener los precios actualizados sin intervención manual constante.

**Consideraciones importantes**

- Los métodos de cálculo **no asignan precios por sí solos**; deben ser seleccionados al momento de definir los precios del producto.  
- Un mismo método puede aplicarse a múltiples productos.  
- El método de cálculo se asocia a una lista de precios, pero se activa desde el producto.

---

### ¿Cómo crear y configurar una lista de precios?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo crear una lista de precios?
- ¿Dónde se configuran las listas de precios?
- ¿Cómo incluir o excluir el IVA en una lista de precios?
- ¿Cómo configurar la moneda de una lista de precios?
- ¿Cuántas listas de precios puedo manejar en el sistema?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Las **listas de precios** permiten definir la estructura de los valores de venta de los productos, indicando si los precios incluyen IVA, si aplican otros impuestos, la moneda en la que se expresan y su identificación dentro del sistema.

Las listas de precios **no asignan valores directamente a los productos**, sino que establecen las condiciones bajo las cuales esos precios serán definidos posteriormente.

Para configurarlas, ingresa a:  
*Inventarios > Menú: Elementos de inventarios > Listas de precios.*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![imagen: Ruta para ingresar al catálogo de listas de precios](https://www.contapyme.com/conocimientocontapyme/080_IN/ruta_catalogo_listas_precios.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![imagen: Catálogo de listas de precios](https://www.contapyme.com/conocimientocontapyme/080_IN/catalogo_listas_precios.png)

**Pasos para crear o modificar una lista de precios**

1. Ingresa a **Inventarios > Menú: Elementos de inventarios > Listas de precios**.  
2. Clic en **Crear** para crear una lista o selecciona una existente y haz clic en **Modificar**.  
3. Diligencia los siguientes campos:
   - **Código:** número consecutivo entre 1 y 32.767.  
   - **Descripción:** nombre identificador de la lista.  
   - **Precios IVA incluido:** marca ✅ si los precios ya incluyen IVA.  
   - **Precios otros impuestos incluidos:** marca si los precios incluyen impuestos como consumo o saludables.  
   - **Moneda:** define la moneda si la lista se manejará en una diferente a la local.  
4. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ejemplo de configuración de una lista de precios](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_lista_precios.png)

**Ejemplo de listas de precios configuradas**

| Código | Descripción | IVA incluido |
|-------|-------------|--------------|
| **1** | Lista de precios IVA incluido | ✅ |
| **2** | Lista de precios promoción navidad | ✅ |
| **3** | Lista de precios al por mayor | ❌ |

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ejemplo Ventana con listas de precios configuradas](https://www.contapyme.com/conocimientocontapyme/080_IN/ejemplo_listas_precios.png)

**Observaciones importantes**

- ContaPyme ofrece **10 listas de precios predeterminadas** que pueden ser editadas.  
- Si activas **Precios IVA incluido**, el sistema descuenta el IVA vigente al facturar para mostrarlo discriminado.  
- Para activar **otros impuestos incluidos**, primero debe estar marcada la opción de IVA incluido.  
- Las listas con **moneda extranjera** requieren que la moneda esté configurada previamente en  
  *Contabilidad > Opciones plan de cuentas > Monedas.*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Lista de precios con impuestos y moneda configurada](https://www.contapyme.com/conocimientocontapyme/080_IN/lista_precios_impuestos_moneda.png)

---

## Impuestos (IVA y otros impuestos)

### ¿Cómo configurar para incluir IVA o quitarlo en precios de productos?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo activar o desactivar el IVA en una lista de precios?
- ¿Dónde se configura si los precios incluyen IVA o no?
- ¿Dónde activo los precios con IVA incluido por lista de precios?
- ¿Cómo configurar precios con impuestos incluidos o excluidos?
- ¿Cómo saber si mis precios incluyen IVA?
- ¿Qué pasa si marco la opción “Precios IVA incluido”?
- ¿Qué pasa si no marco la opción “Precios IVA incluido”?
- ¿Por qué el sistema me está sumando el IVA si ya lo tengo incluido en el precio?
- ¿Cómo evitar que el sistema duplique el IVA en los precios?
- ¿Cómo hago para que los precios que aparecen en la factura sean con IVA incluido?
- ¿Cómo hago para que el sistema muestre el valor base y el IVA discriminado en la factura?
- ¿Cómo se calcula el valor base cuando el precio incluye IVA?
- ¿Por qué el precio base cambia cuando marco “IVA incluido”?
- ¿Dónde se marca la opción para precios con otros impuestos incluidos?
- ¿Qué significa “Precios otros impuestos incluidos”?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para definir si los precios de los productos **incluyen o no el IVA**, debes hacerlo desde el **Catálogo de listas de precios**, en la opción *Inventarios > Menú: Elementos de inventarios > Listas de precios*.  

Esta configuración permite establecer si los precios registrados en una lista ya **incluyen el valor del IVA y otros impuestos**, o si estos deben **adicionarse automáticamente** durante la facturación.  

Cuando se marca la casilla **“Precios IVA incluido”**, el sistema interpreta que el precio registrado **ya tiene el IVA incorporado** y, al facturar, lo **descuenta internamente** para mostrar el valor base y el impuesto discriminado.  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Opcion precios IVA incluido en lista de precios](https://www.contapyme.com/conocimientocontapyme/080_IN/precios_iva_incluido.png)

**Ejemplo práctico**

La empresa *Computronic* vende una memoria USB por **$30.000 IVA incluido**, con un IVA del **19 %** vigente.  
El sistema calcula:

- **Precio base sin IVA:** $30.000 / (1 + 19%) = **$25.210**  
- **IVA discriminado en factura:** $4.790  

De esta manera, el valor mostrado al cliente ($30.000) ya incluye el impuesto, pero en la factura se separa automáticamente para cumplir con la normativa tributaria.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo calculo de precio con IVA incluido](https://www.contapyme.com/conocimientocontapyme/080_IN/ejemplo_precio_iva_incluido.png)

**Pasos para configurar una lista de precios con o sin IVA**

1. Ingresa a **Inventarios > Menú: Elementos de inventarios > Listas de precios.**  
2. Clic en **Nuevo** o selecciona una lista existente para **Modificar.**  
3. En el campo **Precios IVA incluido**, marca ✅ si los precios de esta lista deben incluir el IVA.  
   - Si no la marcas, el sistema **adicionará el IVA** al momento de facturar.  
4. (Opcional) Si deseas que también incluya otros impuestos (como consumo o saludable), marca la opción **Precios otros impuestos incluidos.**  
5. Guarda los cambios.  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ventana de configuracion lista de precios con IVA incluido y otros impuestos](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_lista_precios_iva.png)

**💡 Observaciones importantes**

- El **IVA** que se aplica durante la venta proviene de la configuración en la pestaña *Impuestos en ventas* o en la cuenta contable del grupo de inventarios.  
- Si se activan otros impuestos (como consumo o saludables), primero debe estar activa la opción **“Precios IVA incluido”**.  
- ContaPyme y AgroWin realiza el cálculo automático al momento de facturar, garantizando que el valor total mostrado al cliente coincida con el precio configurado.  

#### 📌 Recursos adicionales  
Ruta: *Inventarios > Sesión de ayudas > Guías de montaje > Guía de montaje de listas de precios*  

**Video:**  
[Inventarios Básico I – Incluye listas de precios](https://www.youtube.com/watch?v=ActUvoat4tw&t=504s)  

---

### ¿Qué debo revisar cuando el IVA sale mal al generar una factura?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- Error en el IVA al generar factura
- El IVA sale mal al facturar
- El IVA no me calcula bien en la factura
- La factura me está calculando mal el IVA
- ¿Por qué el IVA sale incorrecto al generar una factura?
- ¿Qué debo revisar si el IVA no sale bien en la factura?
- ¿Por qué no me liquida el IVA al facturar?
- La factura no toma correctamente el IVA
- El IVA no aparece bien en la factura
- ¿Qué revisar cuando el IVA está mal en una factura?
- Tengo error con el IVA al generar una factura
- ¿Por qué el IVA no se calcula correctamente en la factura?
- Error de IVA en factura de venta
- El IVA sale mal en una operación de ingreso
- El IVA no calcula en la operación del signo verde
- El IVA no liquida en el signo pesos verde
- ¿Qué revisar si el IVA falla en una operación de ingreso?
- ¿Por qué en el signo verde no toma el IVA?
- La operación en verde no me calcula el IVA
- El IVA sale mal en un egreso
- ¿Por qué en la operación del signo rojo no calcula el impuesto?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Cuando el **IVA sale mal al generar una factura** en **ContaPyme**, es importante identificar primero **desde qué tipo de operación se está generando el documento**, ya que la revisión cambia según el módulo o la forma de facturación utilizada.

📌 **En ContaPyme, este comportamiento puede presentarse principalmente en dos escenarios:**

1. **Facturas o documentos generados con manejo de inventarios**, donde el impuesto puede depender de la configuración del **producto**, **grupo de inventario** o **cuenta contable**.  
2. **Facturas o documentos generados desde operaciones de ingreso o egreso** (por ejemplo, operación del **signo pesos verde** o **signo rojo**), donde el impuesto depende principalmente de la **configuración tributaria**, los **conceptos de liquidación** y las **cuentas contables**.

Por eso, antes de corregir el IVA, primero debes identificar **cómo estás registrando la operación**.

---
**PASOS:**
<!-- PASOS_NO_RESUMIBLE -->  

##### 1. Validaciones generales que aplican en ambos casos

Hay revisiones que deben realizarse sin importar si la factura se genera por inventarios o por ingreso/egreso:

###### ✅ 1.1 Clasificación tributaria de la empresa
Verifica que la empresa tenga correctamente definida su información tributaria.

**🧭 Ruta:**  
`Básico → Explorador de empresa → Modificar empresa → Clasificación tributaria`

Revisa que estén correctamente definidos aspectos como:
- responsabilidad frente al IVA
- régimen o clasificación aplicable
- demás datos tributarios necesarios para la liquidación

---

###### ✅ 1.2 Clasificación tributaria del tercero
Valida que el cliente o proveedor involucrado en la operación tenga correctamente configurada su clasificación tributaria.

**🧭 Ruta:**  
`Básico → Catálogo de terceros → Modificar tercero → Clasificación tributaria`

📌 **Importante:**  
La clasificación tributaria del tercero afecta directamente la forma en que el sistema calcula impuestos, retenciones y demás valores automáticos.

---

###### ✅ 1.3 Revisión de la cuenta contable
Confirma que la cuenta contable utilizada en la operación esté correctamente parametrizada.

Debes revisar:
- que corresponda a la cuenta adecuada para el ingreso o gasto
- que tenga correctamente asociados los impuestos o conceptos requeridos
- que su configuración sea coherente con el tipo de operación registrada

📌 **Nota:**  
En operaciones de ingreso o egreso, esta validación es especialmente importante, ya que muchas veces el cálculo del IVA depende de la configuración de la cuenta y del concepto asociado.

---

##### 2. Si la factura se genera con manejo de inventarios

Si la factura se está realizando desde un proceso donde intervienen **productos o elementos de inventario**, además de las validaciones generales debes revisar la configuración del IVA en inventarios.

###### 🔍 Qué validar en este caso

1️⃣ **Configuración del producto o elemento de inventario**  
Verifica si el producto tiene una configuración personalizada de impuestos.

2️⃣ **Configuración del grupo de inventario**  
Si el producto no tiene personalización, el sistema puede tomar el IVA desde el grupo.

3️⃣ **Configuración de la cuenta contable**  
Si ni el producto ni el grupo tienen configuración específica, el sistema puede tomar el IVA desde la cuenta.

📌 **Orden de prioridad habitual:**  
- Producto  
- Grupo de inventario  
- Cuenta contable

**Rutas de revisión sugeridas**

- `Inventarios → Catálogo de elementos de inventario → Modificar → Manejo contable`
- `Inventarios → Grupos de inventario → Modificar → Manejo contable`
- `Contabilidad → Plan de cuentas → Modificar cuenta`

📌 **También revisa:**  
- si el producto tiene activada personalización de impuestos  
- si el grupo de inventario tiene configurado el concepto correcto de IVA  
- si la cuenta contable tiene asociado el concepto correspondiente  
- si la lista de precios o la operación está manejando valores con IVA incluido, cuando aplique

---

##### 3. Si la factura se genera desde una operación de ingreso o egreso

Si el documento se registra desde una operación contable como **ingreso** o **egreso**, la validación cambia.  
En estos casos, el IVA **no depende del producto o del grupo de inventario**, sino principalmente de la configuración tributaria y de los conceptos usados en la operación.

📌 **Ejemplo de identificación:**  
Si el usuario indica que el inconveniente ocurre en la operación del **signo pesos verde**, normalmente se trata de una operación de **ingreso**.  
Si ocurre en el **signo rojo**, normalmente corresponde a una operación de **egreso**.

###### 🔍 Qué validar en este caso

1️⃣ **Concepto de liquidación configurado en ingreso o egreso**  
Debes revisar que el concepto utilizado en la operación esté correctamente parametrizado para liquidar el impuesto correspondiente.

**🧭 Ruta sugerida:**  
`Contabilidad → Catálogo de conceptos de liquidación en ingreso / egreso`

Valida:
- que el concepto corresponda al tipo de impuesto que se desea calcular
- que la cuenta del impuesto configurada en el concepto si sea de tipo "impuesto"
- que el porcentaje o comportamiento configurado sea el correcto
- que no existan condiciones avanzadas que impidan la liquidación

---

2️⃣ **Cuenta contable asociada al concepto**  
Revisa que la cuenta usada en la operación tenga correctamente relacionada la configuración tributaria necesaria.

📌 **Importante:**  
La cuenta contable debe estar correctamente parametrizada para que el sistema interprete qué impuesto debe liquidar.

---

3️⃣ **Tipo de cuenta configurada correctamente**  
Verifica que las cuentas involucradas estén configuradas con el tipo que corresponde.

En especial, revisa:
- que la cuenta principal del ingreso o egreso esté correctamente definida
- que la cuenta del impuesto asociada en el concepto esté configurada como **tipo impuesto**, cuando corresponda

📌 **Este punto es clave**, porque una configuración incorrecta en el tipo de cuenta puede hacer que el sistema no liquide el IVA correctamente o no lo muestre como se espera.

---

##### 4. Cómo identificar cuál escenario aplicar

Para saber qué revisar primero, puedes guiarte así:

###### ✅ Revisa inventarios si:
- la factura se hace con **productos**
- se seleccionan **elementos de inventario**
- el IVA parece depender del producto, grupo o lista de precios
- el usuario habla de artículos, referencias, catálogo o grupo de inventario

###### ✅ Revisa ingreso / egreso si:
- la operación se realiza desde el **signo pesos verde** o **signo rojo**
- el usuario no está usando productos de inventario
- el cálculo depende de una cuenta contable y un concepto de liquidación
- el problema ocurre en una operación manual contable o administrativa

---

##### 5. Recomendaciones prácticas

- ✅ Primero identifica **desde qué módulo o tipo de operación** se está generando la factura.  
- ✅ Verifica la **clasificación tributaria de la empresa** y del **tercero**, ya que esto afecta el cálculo en cualquier escenario.  
- ✅ Si trabajas con inventarios, revisa la prioridad entre **producto, grupo y cuenta**.  
- ✅ Si trabajas con operaciones de ingreso o egreso, revisa especialmente el **concepto de liquidación**, la **cuenta contable** y la **cuenta de impuesto** asociada.  
- ✅ Si el problema ocurre en la operación del **signo verde**, no enfoques primero la revisión en productos de inventario, sino en la parametrización contable de ingresos.

---

##### Observación importante

No todos los errores de IVA en una factura se corrigen desde el mismo lugar.  
Aunque el síntoma sea similar, la causa puede estar en **inventarios** o en **la operación contable utilizada**. Por eso, identificar correctamente el origen de la factura permite orientar la revisión en la ruta adecuada y evitar respuestas parciales o incorrectas.

---
### ¿Cómo facturar muestras gratis de inventario y definir quién asume el IVA?

CANONICAL_ID: PF_FACTURACION_MUESTRAS_GRATIS_IVA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo facturo productos entregados como muestra gratis?
- ¿Cómo hago una factura de venta de muestras sin cobrarle al cliente?
- ¿Cómo facturar ítems de inventario que se entregaron como muestras?
- ¿Cómo facturar muestras comerciales con descuento del 100%?
- ¿Cómo facturar productos sin costo para el cliente pero con IVA?
- ¿Cómo manejo una muestra gratis cuando la empresa asume el IVA?
- ¿Cómo facturo productos de inventario con IVA asumido?
- ¿Cómo registrar una venta de muestras donde el cliente no paga el producto?
- ¿Cómo hago una factura con descuento del 100% pero conservando el IVA?
- ¿Cómo facturar muestras a clientes sin eliminar el impuesto?
- ¿Cómo cobrar solo el IVA de una muestra gratis?
- ¿Cómo entregar una muestra gratis pero cobrar el IVA al cliente?
- ¿Cómo configurar si el IVA de una muestra lo paga la empresa o el cliente?
- Necesito facturar unos ítems de inventario que se sacaron como muestras a clientes.
- ¿Cómo facturo productos entregados sin costo y con IVA asumido por la empresa?

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->

Cuando se entregan **productos de inventario como muestras gratuitas a un cliente**, el manejo recomendable es registrarlos en la operación de **Facturación y ventas** con su **precio de venta normal** y aplicar un **descuento del 100%**, ya que el cliente no pagará el valor del producto.

Sin embargo, el **IVA no debe eliminarse manualmente**. Si el producto está gravado, el impuesto debe calcularse según la configuración tributaria del artículo y según el manejo definido por la empresa: puede ser **asumido por la empresa** o **cobrado al cliente**, dependiendo de la política contable y tributaria que se requiera aplicar.

Este manejo permite conservar la trazabilidad de la salida del inventario, del costo del producto y del impuesto asociado. Aunque el producto se entregue como muestra, sigue siendo un artículo de inventario que tuvo un costo para la empresa. Por eso es importante conservar su precio de venta como referencia y aplicar el descuento del 100%, en lugar de registrarlo con precio cero.

##### Configuración previa requerida

Antes de registrar la factura de la muestra, valida la configuración de IVA cuando el valor base queda por debajo del costo.

**Ruta:**  
**Inventarios > Elementos de inventario > Configuración > Configuraciones generales > Manejo de IVA cuando valor base menor al costo**

En esta configuración debes revisar:

1. Activar la opción:

   **Calcular base de IVA analizando precio neto (después de descuentos) respecto al costo promedio**

2. Definir quién pagará el IVA por la diferencia entre el precio neto y el costo:

   - **La empresa (IVA asumido)**
   - **El cliente**

3. Seleccionar el concepto de liquidación correspondiente al IVA, según la parametrización definida por la empresa.

   Ejemplo:  
   **IVA pagado por la empresa por descuentos y muestras**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![imagen: manejo de IVA cuando valor base menor al costo](https://www.contapyme.com/conocimientocontapyme/080_IN/manejo_IVA_valorbase_menor_al_costo.png)

##### ¿Qué opción seleccionar?

La opción depende del manejo que defina la empresa:

###### Opción 1: La empresa asume el IVA

Selecciona esta opción cuando la empresa entregará la muestra sin cobrarle ningún valor al cliente, incluyendo el IVA.

En este caso:

- el producto se registra con su precio normal;
- se aplica descuento del 100%;
- el cliente no paga el valor del producto;
- el IVA se calcula según corresponda;
- el IVA queda asumido por la empresa mediante el concepto de liquidación configurado.

Este suele ser el manejo más común cuando se entregan muestras comerciales sin costo para el cliente.

###### Opción 2: El cliente paga el IVA

Selecciona esta opción cuando la empresa entregará el producto sin cobrar el valor del artículo, pero sí desea cobrarle al cliente el IVA correspondiente.

En este caso:

- el producto se registra con su precio normal;
- se aplica descuento del 100% sobre el valor del producto;
- el cliente no paga el valor del artículo;
- el sistema calcula el IVA según corresponda;
- el valor del IVA queda a cargo del cliente.

Este manejo puede aplicar cuando la empresa decide entregar la mercancía como muestra, pero no asumir el impuesto.

##### Pasos para registrar la factura

1. Ingresa a la operación de **Facturación y ventas**.

   Ruta sugerida:  
   **Menú básico > Manejador de operaciones > Más operaciones > Ventas > Facturación y ventas**

2. Selecciona el **cliente** al que se le entregaron las muestras.

3. En la sección de productos o elementos a vender, selecciona los **ítems de inventario** entregados como muestra.

4. Registra la **cantidad** correspondiente.

5. Conserva el **precio de venta normal** del producto.

6. En la columna de descuento, registra el **100% de descuento**.

   De esta forma, el cliente no pagará el valor del producto. El manejo del IVA dependerá de la configuración definida previamente: si lo asume la empresa o si se cobra al cliente.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
  ![imagen: Producto facturado como muestra con descuento del 100%](https://www.contapyme.com/conocimientocontapyme/080_IN/producto_muestra_descuento_100.png)

7. Verifica en la factura que el sistema calcule la **base de impuestos** y el **valor del IVA** correspondiente.

8. Continúa a la sección **Liquidación y forma de cobro**.

9. Revisa el concepto de IVA generado.

   Si se configuró que el IVA lo asume la empresa, debe aparecer el concepto correspondiente al IVA asumido por la empresa.

   Si se configuró que el IVA lo paga el cliente, el valor del IVA deberá reflejarse como valor a cargo del cliente, según la configuración de la operación.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
  ![imagen: Producto con descuento del 100%, base de impuestos y valor de IVA](https://www.contapyme.com/conocimientocontapyme/080_IN/producto_descuento_100_valor_IVA.png)

10. Revisa los totales de la factura antes de procesar o finalizar el documento.

11. Procesa la operación y valida la contabilización generada.

#### Validaciones importantes

Antes de generar la factura, revisa lo siguiente:

1. **Que el producto tenga configurado el IVA en ventas.**  
   El impuesto puede estar configurado desde el grupo de inventario, desde el elemento de inventario o desde la cuenta de ingresos asociada.

2. **Que esté activa la configuración de IVA cuando el valor base es menor al costo.**  
   Esta configuración permite que el sistema analice el precio neto después de descuentos frente al costo promedio del producto.

3. **Que se haya definido correctamente quién pagará el IVA.**  
   La empresa debe seleccionar si el IVA será asumido por la empresa o cobrado al cliente, según el manejo contable y tributario requerido.

4. **Que esté configurado el concepto de liquidación correspondiente.**  
   Si el IVA lo asume la empresa, debe existir un concepto de liquidación configurado para este manejo, por ejemplo:  
   **IVA pagado por la empresa por descuentos y muestras**.

5. **Que la operación de Facturación y ventas tenga activos los impuestos a calcular automáticamente.**  
   Si esta configuración no está activa, el sistema puede no calcular el IVA aunque el producto lo tenga parametrizado.

6. **Que el descuento sea del 100%.**  
   El descuento aplica sobre el valor del producto entregado como muestra, para que el cliente no pague el valor del artículo.

7. **Que el producto no se registre con precio cero.**  
   Registrar el producto con precio cero puede afectar la trazabilidad del valor del artículo, del costo y del impuesto asociado.

8. **Que el movimiento contable sea validado.**  
   Después de procesar la factura, revisa el Inspector de datos o el movimiento contable generado para confirmar que la salida del inventario, el descuento y el IVA quedaron registrados correctamente.

#### Ejemplo

La empresa entrega como muestra a un cliente un producto cuyo precio de venta es de **$10.000** y tiene IVA del **19%**.

| Concepto | Valor |
|---|---:|
| Valor del producto | $10.000 |
| Descuento aplicado | 100% |
| Valor cobrado al cliente por el producto | $0 |
| IVA | Se calcula según la configuración tributaria del producto |
| Responsable del IVA | Depende de la configuración: empresa o cliente |

##### Si el IVA lo asume la empresa

El cliente no paga el producto ni el IVA.  
El sistema registra el concepto de IVA asumido por la empresa, según la configuración definida.

##### Si el IVA lo paga el cliente

El cliente no paga el valor del producto, pero sí paga el valor del IVA correspondiente, según la configuración definida.

#### ¿Por qué no se recomienda registrar el producto con precio cero?

No se recomienda registrar el producto con precio cero porque la muestra no significa que el producto no tenga valor o costo para la empresa.

Aunque no se le cobre al cliente, el producto:

- salió del inventario;
- tuvo un costo de adquisición o producción;
- puede requerir reconocimiento contable;
- puede estar sujeto al cálculo de IVA;
- debe conservar trazabilidad dentro del sistema.

Por eso, el manejo recomendado es conservar el precio del producto y aplicar un **descuento del 100%**. Así se refleja que el producto sí tiene un valor, pero que comercialmente fue entregado sin cobro al cliente.

#### Importante

No se recomienda registrar el producto con precio cero ni quitar el IVA manualmente, porque esto puede impedir que el sistema conserve correctamente la trazabilidad del valor del producto, su costo y el impuesto asociado.

El descuento del 100% se utiliza para indicar que el cliente no pagará el producto, pero no significa que el producto no tenga costo para la empresa ni que deba omitirse la revisión del IVA.

Para este manejo, es fundamental validar la configuración de **Manejo de IVA cuando valor base menor al costo**, ya que allí se define si el IVA será asumido por la empresa o cobrado al cliente.

Si después de revisar la configuración el sistema no calcula el IVA como se requiere, se recomienda generar un tiquete de soporte para revisar el manejo específico.

---

### ¿Cómo cambiar el IVA de productos al 5% o 19%?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo cambiar el IVA de mis productos?
- ¿Cómo pasar el IVA de 19 % a 5 % en un producto o grupo de inventarios?
- ¿Dónde se configura el IVA que aplica a los productos?
- ¿Cómo configurar el IVA en una cuenta contable?
- ¿Cómo configurar el IVA en un grupo de inventarios?
- ¿Cómo configurar el IVA directamente en un producto?
- ¿Cómo cambiar el IVA de un grupo completo de productos?
- ¿Cómo aplicar IVA del 5 % a ciertos productos y 19 % a otros?
- ¿Dónde puedo ver desde dónde el sistema toma el IVA?
- ¿Cómo saber si el sistema toma el IVA desde la cuenta contable o el grupo?
- ¿Cómo verificar si un producto tiene su propio IVA configurado?
- ¿Por qué el sistema me está tomando un IVA diferente al que configuré?
- ¿Por qué el IVA no cambia aunque modifique la cuenta contable?
- ¿Dónde se cambia el concepto de IVA liquidado?
- ¿Cómo saber qué concepto de IVA está asociado a mi producto?
- ¿Cómo revisar el orden en el que el sistema toma el IVA (producto, grupo o cuenta)?
- ¿Cómo se define el concepto IVAV16VL o IVAV05VL?
- ¿Cómo saber qué cuenta contable está asociada al IVA 19 % o 5 %?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El porcentaje de IVA que aplica a los productos (por ejemplo, **5 %** o **19 %**) depende de **desde qué nivel esté configurado el impuesto en el sistema**.

En ContaPyme, el IVA puede configurarse en tres niveles, y el sistema aplicará el que tenga **mayor prioridad**:

1. **Configuración personalizada en el producto.**  
2. **Configuración en el grupo de inventarios.**  
3. **Configuración en la cuenta contable.**

Por esta razón, antes de realizar un cambio, es importante identificar **desde dónde el sistema está tomando actualmente el IVA**.

#### 1. Cómo CAMBIAR el IVA según el nivel de configuración

##### ⚙️ Opción 1: Cambiar el IVA desde la cuenta contable

Si el sistema está configurado para tomar el IVA desde las **cuentas contables**, el cambio debe realizarse directamente en la cuenta correspondiente:

1. Ingresa a **Contabilidad > Plan de cuentas.**  
2. Busca la cuenta de ingreso o gasto (por ejemplo, *413536 - Venta de electrodomésticos y muebles*).  
3. Clic derecho sobre la cuenta → **Modificar.**  
4. En **Impuestos, descuentos y cargos**, ubica la opción **IVA** y selecciona el porcentaje correspondiente (**IVA 5 %** o **IVA 19 %**).  
5. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuracion de concepto de IVA en cuenta contable](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_iva_cuenta.png)

💡 *Ejemplo:*  
Si utilizas el concepto **IVAV16VL – IVA liquidado**, la cuenta afectada será  
*24080119 – Ingresos con IVA 19%.*

##### ⚙️ Opción 2: Cambiar el IVA desde el grupo de inventarios

Si el sistema toma el IVA desde el **grupo de inventarios**, el ajuste debe realizarse allí:

1. Ingresa a **Inventarios > Grupos de inventarios.**  
2. Clic derecho sobre el grupo → **Modificar.**  
3. Abre la pestaña **Manejo contable > Impuestos en ventas o Impuestos en compras.**  
4. En la opción **IVA**, selecciona el **concepto de liquidación** correspondiente (**IVA 5 %** o **IVA 19 %**).  
5. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuracion de IVA en grupo de inventarios](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_iva_grupo.png)

💡 *Ejemplo:*  
Si el grupo *Café tostado* tiene tarifa del **5 %**, selecciona el concepto de liquidación  
**IVA 5 %.**

##### ⚙️ Opción 3: Cambiar el IVA directamente en el producto

Cuando los impuestos se manejan **por producto**, el cambio se realiza desde el catálogo de inventarios:

1. Ingresa a **Inventarios > Elementos de inventario.**  
2. Clic derecho sobre el producto → **Modificar.**  
3. Abre la pestaña **Manejo contable > Impuestos en ventas.**  
4. En la opción **IVA**, selecciona el concepto correspondiente (**IVA 5 %** o **IVA 19 %**).  
5. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuracion de IVA en producto individual](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_iva_producto.png)

💡 *Ejemplo:*  
Para el producto *Consola de videojuegos*, selecciona el concepto  
**IVAV16VL – IVA liquidado**, y el sistema calculará automáticamente el **19 %.**

#### 2. Información técnica relacionada (CONCEPTO)

El **catálogo de conceptos de liquidación** define las reglas de cálculo y las cuentas contables asociadas a cada impuesto o retención.

| Código | Nombre concepto | Cuenta a afectar |
|------|----------------|------------------|
| IVAV16VL | IVA liquidado 19% | 24080119 – Ingresos con IVA 19% |
| IVAV05VL | IVA liquidado 5% | 24080105 – Ingresos con IVA 5% |
| RETCOMPGL | Retención por compras no declarantes | 23654003 – Compras 3,5% |

Estos conceptos son los que se asignan en cuentas, grupos o productos para definir el porcentaje de IVA.

#### 3. Cómo VERIFICAR desde dónde el sistema toma el IVA

Antes de cambiar el IVA, es fundamental identificar **el nivel que tiene prioridad en tu sistema**.

##### 📌 Orden de prioridad aplicado por ContaPyme

1. **Producto (configuración personalizada).**  
2. **Grupo de inventarios.**  
3. **Cuenta contable.**

###### Paso 1: Verificar si el producto tiene IVA personalizado

- Ingresa a *Inventarios > Catálogo de elementos de inventario.*  
- Clic derecho sobre el producto → **Modificar.**  
- En **Manejo contable > Impuestos en ventas**, revisa si está activa la opción  
  **“Personalizar IVA y Retención en ventas para este elemento de inventario.”**

Si está activa ✅, el sistema tomará el IVA definido directamente en el producto.

###### Paso 2: Verificar el grupo de inventarios

- Ingresa a *Inventarios > Grupos de inventarios > Modificar.*  
- Abre la pestaña **Manejo contable > Impuestos.**  

Si el grupo tiene un concepto de IVA configurado, este se aplicará a todos los productos del grupo.

###### Paso 3: Verificar la cuenta contable

- Si ni el producto ni el grupo tienen IVA configurado, el sistema tomará el impuesto desde la  
  **cuenta contable** asociada a la venta.  
- Revisa en *Contabilidad > Plan de cuentas > Modificar cuenta.*

###### Confirmar la configuración general del catálogo de elementos

También puedes validar desde dónde el sistema toma el IVA de forma global en:

*Inventarios > Catálogo de elementos de inventario > Configuración > Manejo de IVA y Retención en ventas.*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuracion manejo de IVA y retencion en ventas](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_manejo_iva_retencion.png)

💡 *Interpretación:*  
- Opción activada ✅ → el IVA se toma desde la **cuenta contable**.  
- Opción desactivada ❌ → el IVA se toma desde **grupo o producto**, si aplica.

#### ✅ Recomendaciones finales

- Verifica siempre **desde qué nivel** el sistema está tomando el IVA antes de realizar cambios.  
- Si el IVA aplica a varios productos similares, es más práctico configurarlo **por grupo**.  
- Para productos con tarifas mixtas (5 % y 19 %), utiliza la configuración **por producto**.

#### 📌 Recursos adicionales  
[Video: Cálculo automático de impuestos](https://www.youtube.com/watch?v=4Ntl1p9jhrc)

---

## Asignación y Control de Precios

### ¿Cómo asignar precios a los productos según la lista de precios?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo asignar precios a los productos?
- ¿Dónde se configuran los precios de los productos?
- ¿Cómo definir precios diferentes por lista?
- ¿Cómo asignar precios manuales o automáticos a un producto?
- ¿Cómo configurar precios de promoción en productos?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Una vez creadas las listas de precios, los valores de venta deben asignarse a cada producto desde el **catálogo de elementos de inventario**.

La asignación puede realizarse de forma **manual** o **automática**, dependiendo del método seleccionado para cada lista.

**Pasos para asignar precios a un producto**

1. Ingresa a **Inventarios > Catálogo de elementos de inventario**.  
2. Clic derecho sobre el producto y selecciona **Modificar**.  
3. Abre la pestaña **Listas de precios**.  
4. Para cada lista configurada, define:
   - El **precio** (si la lista es manual).  
   - El **método de cálculo** (si la lista es automática).  
   - La **vigencia** del precio, si aplica.  
5. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Pestaña listas de precios en ficha de producto](https://www.contapyme.com/conocimientocontapyme/080_IN/ejemplo_precios_producto_listas.png)

**Ejemplo de asignación de precios**

Para el producto *Memoria USB 16 GB*:

| Lista | Método de cálculo | Precio | Vigencia |
|------|------------------|--------|----------|
| Lista 1 – IVA incluido | Manual | $30.000 | — |
| Lista 2 – Promoción navidad | Manual | $25.000 | 31/12/2025 |
| Lista 3 – Al por mayor | Automático (último precio de compra) | Cálculo automático | — |

**Observaciones**

- Un mismo producto puede tener **precios diferentes según la lista**.  
- Los precios automáticos se recalculan según el método configurado.  
- La vigencia permite manejar promociones o precios temporales.

---

### ¿Cómo bloquear la modificación de precio en productos?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Cómo bloquear la modificación de precios en los productos?
- ¿Cómo evitar que los usuarios cambien precios en las ventas?
- ¿Cómo dejar los precios bloqueados en el POS?
- ¿Cómo restringir la edición de precios en el catálogo de productos?
- ¿Cómo permitir solo lectura de precios en las listas de inventario?
- ¿Dónde se bloquea la opción de cambiar precios en la factura?
- ¿Cómo hacer que los precios no se puedan editar en una venta?
- ¿Cómo evitar que modifiquen los precios durante una operación de venta?
- ¿Cómo bloquear el campo de precios en el manejador de operaciones?
- ¿Dónde configuro para que los usuarios solo vean los precios pero no los cambien?
- ¿Cómo dejar los precios en modo solo lectura para ciertos perfiles?
- ¿Cómo dar permiso para ver precios pero no modificarlos?
- ¿Qué perfil puede cambiar los permisos para precios en el sistema?
- ¿Por qué algunos usuarios no pueden modificar los precios de los productos?
- ¿Por qué el sistema no me deja cambiar el precio en la venta?
- ¿Cómo bloquear los campos “Registrar precios” y “Registrar valores totales” en una operación?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El sistema permite **restringir la modificación de precios** tanto en el **catálogo de productos** como en las **operaciones de venta (Factura o POS)**.  
Dependiendo del punto en el que desees aplicar el control, puedes hacerlo de dos formas:

**Opción 1:** Bloquear la modificación de precios en el catálogo de productos

Si deseas que los usuarios **no puedan cambiar los precios directamente en los elementos de inventario**, debes ajustar los permisos en la configuración del catálogo.

**Pasos:**

1. Ingresa a *Inventarios > Catálogo de elementos de inventario > Configuración.*  
2. Ingresa a la opción de configuraciones del catálogo, selecciona el **perfil o usuario** al que aplicará la restricción.  
3. En el árbol de configuración, ubica la sección **Requerimiento de datos por pestaña > Pestaña listas de precios.**  
4. Actica para el campo **Registrar precio** a la opción **Solo lectura.**  
5. Guarda los cambios.  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuracion solo lectura en lista de precios del catalogo](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_solo_lectura_listas_precios.png)

💡 *Resultado:*  
Los usuarios del perfil configurado podrán **ver los precios** de los productos, pero **no podrán modificarlos.**

📌 *Importante:*  
Solo los usuarios con permisos de **administrador** pueden acceder a las configuraciones de los catálogos para realizar este tipo de cambios.

**Opción 2:** Bloquear la modificación de precios en la operación de venta o POS

Si lo que buscas es que **durante la venta no se puedan cambiar los precios** (porque los productos ya tienen definidos sus precios y se cargan automáticamente), debes realizar el bloqueo desde la configuración de la operación.

***Pasos:**
1. Ingresa al menú **Básico > Manejador de operaciones.**
2. Selecciona la operación **Venta o POS** y haz clic en **Operación > Configurar operación, ubicada en la barra superior.**
3. En la opción **Alcance de la configuración**, selecciona el **perfil y/o usuario** al que aplicará la configuración.
4. En la ventana de configuración, dirígete a la sección **Campos de la operación > Datos de encabezado > Datos maestros de la operación.**
5. Localiza los campos **Registrar precios y Registrar valores totales.**
6. Cambia su estado a **Solo lectura.**
7. Haz clic en **Guardar** para aplicar la configuración.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuracion solo lectura de campos registrar precios en operacion](https://www.contapyme.com/conocimientocontapyme/080_IN/configuracion_solo_lectura_operacion.png)

💡 *Resultado:*  
Durante la venta, el sistema cargará automáticamente los precios definidos en los productos o listas de precios, y los usuarios **no podrán modificarlos manualmente.**

**Importante:**
Solo los usuarios con permisos de **administrador** pueden acceder a las configuraciones de las operaciones para realizar este tipo de cambios.

---

### ¿Cómo activar una lista de precios predeterminada en POS?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Cómo hacer que el POS cargue automáticamente una lista de precios?  
- ¿Cómo dejar una lista de precios por defecto en el punto de venta?  
- ¿Por qué no me toma la lista de precios correcta en el POS?  
- ¿Cómo definir qué lista de precios se usa al facturar en POS?  
- ¿Qué lista de precios tiene prioridad en el POS?  
- ¿Cómo asignar una lista de precios fija a un cliente en POS?  
- ¿Cómo configurar una lista de precios por usuario para ventas POS?  
- ¿Dónde se configura la lista de precios que usa el POS?  
- ¿Cómo evitar que el usuario cambie la lista de precios en POS?  
- ¿Cómo configurar la lista de precios base del sistema?  
- ¿Por qué se muestra una lista diferente a la que configuré?  
- ¿Cómo controlar las listas de precios disponibles en el POS?  
- ¿Cómo definir una lista de precios predeterminada para ventas rápidas?  
- ¿Cómo funciona la prioridad de listas de precios en ContaPyme?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para que el **Punto de Venta (POS)** cargue automáticamente una lista de precios al realizar una factura, el sistema permite configurar la lista de precios en **tres niveles**.  
La lista que finalmente se aplique dependerá de la **prioridad definida por el sistema**.

#### Prioridad que usa el sistema

Cuando se realiza una operación de venta o POS, ContaPyme valida la lista de precios en el siguiente orden:

1. **Lista de precios del cliente**
2. **Lista de precios del usuario**
3. **Lista de precios por defecto del sistema (Inventarios)**
4. Si no hay restricciones, se mostrarán **todas las listas disponibles**

#### 1. Configurar la lista de precios predeterminada en el **cliente**

Esta opción se utiliza cuando un cliente requiere un **tratamiento especial de precios**.

📍 **Ruta:**  
*Básico > Catálogo de terceros > Seleccionar cliente > Modificar > Pestaña Datos cliente > Ventas*

- En el campo **Lista de precios por def.**, selecciona la lista que deseas aplicar a ese cliente.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración lista de precios en cliente](https://www.contapyme.com/conocimientocontapyme/080_IN/config_lista_precios_cliente.png)

##### Ejemplo  
Un cliente mayorista tiene asignada una lista especial.  
Cada vez que se use este cliente en una factura POS, **se cargará automáticamente su lista**, sin importar la del usuario o la del sistema.

#### 2. Configurar la lista de precios predeterminada en el **usuario**

Esta opción define la lista que se cargará por defecto cuando **el usuario** realice operaciones de venta o POS.

📍 **Ruta:**  
*Básico > Usuarios > Modificar usuario > Pestaña Listas de precios*

- Define la **Lista de precios por defecto**.
- Puedes agregar **listas de precios permitidas** para restringir la selección.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración lista de precios por defecto en usuario](https://www.contapyme.com/conocimientocontapyme/080_IN/config_lista_precios_usuario.png)

##### Observaciones
- Si el usuario no tiene lista por defecto pero sí listas permitidas, solo podrá elegir entre ellas.
- Si no tiene ninguna configuración, el sistema mostrará todas las listas existentes.
- Si el cliente tiene lista asignada, **prevalece la del cliente**.

#### 3. Configurar la **lista de precios por defecto del sistema (Inventarios)** ⭐

Esta configuración define la **lista base** que el sistema utilizará en las operaciones de inventarios cuando **no exista una lista definida ni en el cliente ni en el usuario**.

📍 **Ruta:**  
*Inventarios > Catálogo de elementos de inventario > Configuración avanzada >  
Listas de precios y stock > Lista de precios por defecto*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración lista de precios por defecto en inventarios](https://www.contapyme.com/conocimientocontapyme/080_IN/config_lista_precios_inventarios.png)

- Al indicar una lista de precios, el sistema la cargará automáticamente en las operaciones de venta.
- Si el tercero cargado en la operación tiene una lista de precios asignada, **esta tendrá prioridad**, sin importar la lista configurada aquí.

#### Configuración del campo *Lista de precios* en la operación

Puedes definir si el campo **Lista de precios** será visible o de solo lectura dentro de la operación de venta o POS.

📍 **Ruta:**  
*Facturación y ventas O Punto de venta (POS) > Configurar operación >  
Campos de la operación > Datos maestros de la operación > Lista de precios*
 
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración campo lista de precios en operación](https://www.contapyme.com/conocimientocontapyme/080_IN/config_campo_lista_precios_operacion.png)

#### Observación:
Esta prioridad aplica tanto para Facturación de ventas como para Punto de Venta (POS).

#### 📌 Recursos adicionales
- **Guía de montaje:**  
  *Inventarios > Sesión de ayudas > Guías de montajes > Guía de montaje de listas de precios*

- **Video:**  
  [Video: Inventarios básico I – Conceptos, catálogos, cargue inicial, listas de precios e integración con contabilidad](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD740)

---

### ¿Cómo sacar o imprimir una lista de precios específica?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo sacar una lista de precios específica?
- ¿Cómo imprimir una lista de precios al público o al por mayor?
- ¿Cómo consultar los precios de los productos según una lista?
- ¿Dónde puedo consultar las listas de precios configuradas?
- ¿Cómo generar un informe de precios con IVA o sin IVA?
- ¿Cómo ver el precio de venta de cada producto por lista?
- ¿Cómo comparar precios entre diferentes listas de precios?
- ¿Qué diferencia hay entre una lista de precios con IVA y sin IVA?
- ¿Qué es la lista de precios de comparación?
- ¿Cómo imprimir la lista de precios de un departamento o línea específica?
- ¿Cómo agrupar la lista de precios por grupo, marca o referencia?
- ¿Cómo incluir productos sin precio en el listado?
- ¿Cómo visualizar la lista de precios antes de imprimirla?
- ¿Cómo exportar una lista de precios a Excel, PDF o Word?
- ¿Qué opciones tengo para organizar o filtrar el listado de precios?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para consultar o imprimir una **lista de precios** en el sistema, puedes acceder a los diferentes **informes de precios** disponibles en el módulo de inventarios.  
Estos informes permiten visualizar los valores de venta de los productos según la lista configurada (por ejemplo, público, al por mayor o con IVA) y pueden imprimirse o exportarse fácilmente.

#### Opción 1: Generar una lista de precios  

📍 *Ruta:* *Inventarios > Ventas > Lista de precios*  

Al ingresar, el sistema te mostrará una ventana con diferentes tipos de listados.  
Debes seleccionar el formato que deseas imprimir y ajustar las opciones según tus necesidades.

##### Opciones principales:
- **Fecha de referencia:** Indica la fecha a la cual deseas consultar los precios.  
- **Lista de precios a imprimir:** Selecciona la lista configurada (por ejemplo, *L01 – Lista de precios al público*).  
- **Departamento/Línea:** Si deseas, puedes filtrar una categoría específica de productos.  
- **Agrupar por:** Permite organizar el listado por referencia, grupo o marca.  
- **Incluir elementos que no tienen precio:** Muestra también los productos sin valor asignado.  
- **Mostrar marca y referencia:** Agrega información complementaria de cada producto.  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ventana de opciones lista de precios](https://www.contapyme.com/conocimientocontapyme/080_IN/lista_precios_opciones.png)

#### Opción 2: Tipos de informes disponibles  

El sistema ofrece tres tipos de listados de precios que puedes consultar o imprimir según lo que necesites:

##### 🔹 **Lista de precios sin IVA**
Muestra los precios netos de los productos, sin incluir impuestos.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Lista de precios sin IVA](https://www.contapyme.com/conocimientocontapyme/080_IN/lista_precios_sin_iva.png)

##### 🔹 **Lista de precios con IVA**
Incluye el detalle del **precio base**, **porcentaje de IVA**, **valor del impuesto** y el **precio final con IVA**.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Lista de precios con IVA](https://www.contapyme.com/conocimientocontapyme/080_IN/lista_precios_con_iva.png)

##### 🔹 **Lista de precios de comparación**
Permite comparar hasta **tres listas de precios distintas** (por ejemplo, al público, al por mayor y con IVA) en un solo informe.  

#### Opción 3: Visualizar o imprimir el reporte  

Después de definir las opciones, haz clic en **Ver reporte**.  
El sistema generará una vista previa del listado donde podrás:
- Imprimir directamente desde el botón 🖨️ **Imprimir**.  
- Exportar a **PDF**, **Word** o **Excel**.  

#### 📌 Recursos adicionales
**Guía de montaje:**  
*Inventarios > Sesión de ayudas > Guías de montaje > Guía de listas de precios*  

---

## Inventarios: Consultas, Saldos y Ajustes

### ¿Cómo consultar productos por bodega y generar ajustes?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas. 

- ¿Cómo ver qué productos tengo en cada bodega?
- ¿Cómo consultar el inventario actual por bodega?
- ¿Cómo generar la consulta de saldos actuales de inventario?
- ¿Cómo ver el movimiento o historial de un producto en inventario?
- ¿Cómo ajustar el inventario según el conteo físico?
- ¿Cómo corregir diferencias entre el inventario físico y el del sistema?
- ¿Qué ruta debo seguir para generar un ajuste de inventario?
- ¿Cómo hacer un ajuste de inventario manualmente?
- ¿Qué significa ingresar una cantidad positiva o negativa en un ajuste?
- ¿Cómo usar el asistente de ajuste de inventario?
- ¿Cómo ajustar varias referencias de una bodega al mismo tiempo?
- ¿Qué información debo revisar antes de hacer un ajuste de inventario?
- ¿Cómo mantener coherente el inventario físico con el del sistema?
- ¿Cómo realizar el ajuste completo de una bodega en un solo paso?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para conocer las existencias de los productos por bodega, puedes generar la **consulta de saldos actuales de inventario**, que muestra las cantidades, costos y valores de los elementos registrados en cada almacén o bodega del sistema.  
Si al comparar esta información con el inventario físico detectas diferencias, podrás realizar un **ajuste de inventario** para actualizar las cantidades reales y mantener la coherencia entre el sistema y la realidad del stock.

#### Opcion 1: Consultar productos por bodega

📍 *Ruta:* *Inventarios > Informes de Inventarios > Inv. contable – Saldos > Consulta de saldos actuales de inventario*  

##### Pasos:
1. Ingresa a la opción **Consulta de saldos actuales de inventario.**  
2. Define la **fecha de referencia** del informe (por ejemplo, la fecha del conteo físico).  
3. Si deseas ver una bodega específica, selecciónala por la opción **filtro Avanzado**; de lo contrario, deja el campo vacío para incluir todas.  
4. Haz clic en **Aceptar.**  
5. Si lo necesitas, guarda la información con el botón **Guardar como Excel.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Consulta saldos actuales de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/consulta_saldos_actuales_inventario.png)

💡 *Resultado:*  
El sistema mostrará por bodega los **productos, unidades de medida, cantidades, costos promedio y valores totales.**  
Desde este mismo informe puedes hacer clic derecho sobre un producto y elegir **“Ver movimiento del elemento”** para visualizar su historial de entradas y salidas.

#### Opción 2: Generar un ajuste de inventario

📍 *Ruta:* *Básico > Operaciones > + operaciones > inventarios > Ajuste de inventario*  

Si las cantidades físicas no coinciden con las del sistema, puedes realizar un **ajuste de inventario** para actualizar los saldos reales de tus productos.  
Existen dos formas de hacerlo: **manualmente** o mediante el **asistente automático**, según el volumen de productos que necesites ajustar.

##### 🔹 Ajuste manual
Utiliza este método cuando solo requieras modificar algunos productos.

1. Ingresa a la operación **Ajuste de inventario**.  
2. Selecciona la **bodega** correspondiente.  
3. Agrega los productos que deseas ajustar.  
4. En cada línea, indica la cantidad a modificar:  
   - Para **aumentar** existencias, ingresa la cantidad en valor **positivo**.  
   - Para **disminuir** existencias, ingresa la cantidad en valor **negativo**.  
5. Guarda el documento para registrar el ajuste.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ajuste de inventario manual](https://www.contapyme.com/conocimientocontapyme/080_IN/ajuste_inventario_operacion.png)

💬 *Consejo:*  
Antes de realizar los cambios, guarda el informe de saldos de inventario como respaldo.

##### Ajuste con asistente automático  

Cuando necesitas ajustar **muchas referencias** de una misma bodega, el **asistente de ajuste de inventario** simplifica el proceso.  
El sistema se encargará automáticamente de calcular si el movimiento debe registrarse como **positivo o negativo** según la diferencia entre el conteo físico y el saldo actual.

**Pasos:**
1. Ingrese a la operación **Ajuste de inventario**
2. Haz clic en el botón **Asistente de ajuste de inventario.**  
3. El sistema cargará todos los productos con sus cantidades actuales.  
4. En la columna **Cantidad real**, digita las cantidades verificadas en el conteo físico.  
5. Haz clic en **Aceptar.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Asistente de ajuste de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/asistente_ajuste_inventario.png)

💬 *Ventaja:*  
Con este asistente puedes realizar el ajuste completo de una bodega en un solo paso, reduciendo errores y tiempo de registro.

#### 📌 Recursos adicionales 
[Inventarios Básico II – Ajustes de inventario](https://www.youtube.com/watch?v=dErWn5fapzM&t=3630s)  

---

### ¿Cómo verificar diferencias entre inventario real y sistema?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas. 

- ¿Cómo comparar mi inventario físico con el del sistema?
- ¿Cómo detectar diferencias de existencias?
- ¿Cómo verificar si hay faltantes o sobrantes en bodega?
- ¿Cómo hacer conciliación de inventarios?
- ¿Cómo saber si mi inventario está cuadrado?
- ¿Cómo revisar si el inventario del sistema coincide con el físico?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para identificar si existen diferencias entre las cantidades físicas de tu inventario y las registradas en el sistema, puedes comparar el **inventario real** (conteo físico) con los **saldos actuales de inventario** que muestra el sistema.  
De esta forma podrás detectar qué productos tienen faltantes, sobrantes o errores de registro antes de realizar un ajuste.

#### Opción 1: Consultar las existencias en el sistema  

📍 *Ruta:* *Inventarios > Inventarios > Inv. contable – Saldos > Consulta de saldos actuales de inventario*  

##### Pasos:
1. Ingresa a la opción **Consulta de saldos actuales de inventario.**  
2. Define la **fecha de referencia** (por ejemplo, la fecha del conteo físico).  
3. Si deseas ver una bodega específica, selecciónala por la opción **filtro Avanzado**; de lo contrario, deja el campo vacío para incluir todas.  
4. Haz clic en **Aceptar**  
5. Si lo necesitas, guarda la información con el botón **Guardar como Excel.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Consulta saldos actuales de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/consulta_saldos_actuales_inventario.png)

💡 *Resultado:*  
Obtendrás el listado de productos con su **cantidad registrada**, **unidad**, **costo promedio** y **valor total**.  
Este será tu punto de referencia para comparar contra las cantidades físicas.

#### Opción 2: Comparar con el inventario físico  

1. Exporta el informe de saldos del sistema a Excel.  
2. Coloca al lado las cantidades reales obtenidas en el conteo físico.  
3. Calcula la **diferencia** (física – sistema) para identificar los faltantes o sobrantes.  
4. Si detectas inconsistencias, puedes usar esta información como base para realizar el **ajuste de inventario**.  

📘 *Ejemplo:*  
| Producto | Cantidad sistema | Cantidad física | Diferencia | Tipo de ajuste |
|-----------|------------------|------------------|-------------|----------------|
| Leche entera pack x 6 | 120 | 118 | -2 | Negativo |
| Jabón líquido 1L | 40 | 45 | +5 | Positivo |

#### Opción 3: Realizar el ajuste (si aplica)  

Si existen diferencias, puedes actualizarlas mediante la operación **Ajuste de inventario**.  
Recuerda que puedes hacerlo de dos maneras:

- **Manual:** indicando la cantidad a aumentar o disminuir (positiva o negativa).  
- **Con asistente:** indicando directamente la cantidad real; el sistema calculará las diferencias de forma automática.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Asistente de ajuste de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/asistente_ajuste_inventario.png)

#### 📌 Recursos adicionales 
[Inventarios Básico II – Ajustes de inventario](https://www.youtube.com/watch?v=dErWn5fapzM&t=3630s)  

---

## Reportes de Ventas e Inventarios
### ¿Cómo generar un informe de ventas por cliente, producto o año?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Cómo consultar las ventas por cliente o producto?
- ¿Cómo generar un informe de ventas por año o por mes?
- ¿Cómo ver las ventas totales de un cliente en el año?
- ¿Cómo analizar los productos más vendidos?
- ¿Cómo obtener ventas por vendedor o centro de costos?
- ¿Cómo consultar las ventas por factura?
- ¿Cómo ver el detalle de las facturas con cliente, producto y valor?
- ¿Cómo revisar la utilidad de cada producto vendido?
- ¿Cómo comparar las ventas de varios meses por cliente?
- ¿Cómo generar el informe diario de ventas?
- ¿Cómo consultar las ventas de un día específico?
- ¿Cómo generar el reporte de facturas de venta?
- ¿Cómo verificar facturas anuladas o desprocesadas?
- ¿Cómo usar el explorador de inventarios para ver ventas?
- ¿Cómo agrupar los movimientos de inventario por cliente o producto?
- ¿Cómo usar las tablas comparativas para ver ventas por año o mes?
- ¿Dónde veo el Top 100 de productos más vendidos?
- ¿Cómo generar reportes comparativos de ventas por vendedor o cliente?
- ¿Cómo obtener un resumen de ventas por centro de costos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El sistema ofrece **varias opciones de informes** para consultar las ventas desde diferentes perspectivas: por **cliente**, **producto**, **vendedor** o **año**.  
Dependiendo de la información que necesites analizar, puedes usar informes tipo **Informe**, **Consulta** o **Explorador**.  

**Tipos de reporte:**  
- **Informe:** Visualización impresa, con filtros previos y opción de exportar a Excel.  
- **Consulta:** Vista dinámica en pantalla, con columnas personalizables, filtros y agrupaciones.  
- **Explorador:** Detalle completo de los movimientos de ventas, con totales y análisis gráfico.

**Principales informes para ventas**

**Opción 1. Ventas por factura**
📍 *Ruta:* *Inventarios > Ventas > Ventas por factura*  
Este informe muestra las **ventas por vendedor, cliente o producto** dentro de un periodo.  
Incluye: número de factura, cliente, producto, cantidad, precio sin IVA, ingreso y utilidad.

**Pasos:**
1. Ingresa a *Inventarios > Ventas > Ventas por factura.*  
2. Indica el **rango de fechas**, y si lo deseas, filtra por cliente, vendedor o grupo de inventario.  
3. Haz clic en **Ver reporte.**  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Informe ventas por factura](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_ventas_por_factura.png)

💡 *Ejemplo:*  
Consulta las ventas de abril y observa la utilidad generada por cada producto y cliente.

**Opción 2. Informe de facturación mensual por cliente**
📍 *Ruta:* *Inventarios > Ventas > Facturación mensual por cliente*  
Muestra las ventas de los **últimos seis meses** por cliente, el promedio mensual y la tasa de incremento.  
Ideal para comparar comportamiento de ventas por cliente o evaluar tendencias.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Informe facturacion mensual por cliente](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_facturacion_mensual_cliente.png)

**Opción 3: Informe diario o comprobante de ventas**
📍 *Ruta:* *Inventarios > Ventas > Informe diario > Comprobante informe diario de ventas*  
Permite ver las **ventas de un día o periodo**, agrupadas por producto, factura o departamento/línea.  
Incluye totales por IVA, descuentos, medios de pago e incluso el resumen contable.  

**Pasos:**
1. Ingresa al menú *Inventarios > Ventas > Informe diario.*  
2. Selecciona el rango de fechas.  
3. Escoge el tipo de agrupación: *por producto, factura o departamento.*  
4. Activa las opciones adicionales (impuestos, medios de pago, resumen contable).  
5. Haz clic en **Ver reporte.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Comprobante informe diario de ventas](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_diario_ventas.png)

**Opción 4: Reporte de facturas de venta**
📍 *Ruta:* *Inventarios > Ventas > Control de facturas > Reporte de facturas de venta*  
Muestra las **facturas registradas en un periodo**, con columnas de cliente, valor bruto, IVA, total y estado del documento.  
Permite detectar facturas **anuladas, desprocesadas o faltantes**, e incluir resumen contable o de medios de pago.  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Reporte de facturas de venta](https://www.contapyme.com/conocimientocontapyme/080_IN/reporte_facturas_venta.png)

**Opción 5: Explorador de inventarios**
📍 *Ruta:* *Inventarios > Movimientos > Movimientos de inventario*  
Vista tipo **consulta interactiva** donde puedes filtrar los movimientos de inventario (compras, ventas, consumos, etc.).  
Permite agrupar por **cliente, producto, factura o año**, aplicar filtros avanzados, generar totales y exportar a Excel o gráficos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Explorador de inventarios](https://www.contapyme.com/conocimientocontapyme/080_IN/explorador_inventarios.png)

**Ejemplo:**  
Filtra los movimientos del año 2024, agrupa por cliente y obtén el total vendido por cada uno.

**Opción 6: Tablas comparativas**
📍 *Ruta:* *Inventarios > Tablas comparativas*  
Consulta reportes comparativos como:  
- **Top 100 ventas**  
- **Ventas por cliente**  
- **Ventas por vendedor**  
- **Ventas por centro de costos**  

Estas tablas permiten analizar el comportamiento de ventas por **año o mes**, comparar periodos y generar gráficos.  

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Tabla comparativa de ventas](https://www.contapyme.com/conocimientocontapyme/080_IN/tablas_comparativas_ventas.png)

**Opción 7: ContaPyme para Excel**
Si tienes el complemento instalado, puedes crear tus propios informes de ventas combinando datos de inventario, clientes y productos.  
Permite generar **gráficos, tableros e indicadores personalizados.**

#### 📌 Recursos adicionales
- [Informe diario de ventas](https://www.youtube.com/watch?v=WoTWT_tdMDQ)  
- [Funciones inventario en Contapyme para Excel](https://www.youtube.com/watch?v=xlaAO6nBHLo)

---

### ¿Cómo generar un informe de inventario con cantidades, costos y valores?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Cómo generar un informe de inventario con cantidades, costos y valores?
- ¿Cómo consultar las existencias y el valor total del inventario?
- ¿Cómo obtener el valor total de mi inventario actual?
- ¿Cómo saber cuánto tengo en inventario por bodega?
- ¿Cómo consultar los saldos de inventario a una fecha determinada?
- ¿Dónde puedo ver el costo unitario y el costo total de cada producto?
- ¿Dónde puedo ver el costo promedio o el costo NIIF de mis productos?
- ¿Cómo generar un informe de entradas y salidas de inventario?
- ¿Cómo consultar el kardex o movimientos de un producto en un periodo?
- ¿Cómo ver las entradas, salidas y saldos del mes?
- ¿Cómo revisar los movimientos detallados de un producto?
- ¿Cómo obtener un reporte de todos los movimientos de inventario?
- ¿Cómo filtrar los movimientos por producto, fecha o bodega?
- ¿Cómo comparar los inventarios de dos meses o dos años?
- ¿Cómo consultar los movimientos y saldos mensuales del inventario?
- ¿Cómo ver las entradas y salidas por centro de costos?
- ¿Cómo revisar el costo promedio ponderado mensual?
- ¿Dónde encuentro las tablas comparativas de inventario?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El sistema ofrece diversos informes que te permiten **consultar las existencias, costos unitarios y valores totales** de los productos o materiales en tus bodegas.  
Dependiendo del nivel de detalle o tipo de análisis que necesites, puedes usar **informes tipo impresión**, **consultas en pantalla** o **exploradores dinámicos**.

**Tipos de reporte:**  
- **Informe:** listo para impresión, ideal para control y archivo.  
- **Consulta:** vista interactiva en pantalla, permite agrupar, filtrar y exportar a Excel.  
- **Explorador:** muestra todos los movimientos y valores, con totales y análisis gráficos.

**Opción 1. Consulta de saldos de inventario**
📍 *Ruta:* *Inventarios > Inventarios > Inv. contable – Saldos*  

Muestra las **cantidades y costos actuales por producto y bodega**, con opción de explorar el historial de movimientos de cada elemento.

**Pasos:**
1. Ingresa a *Inventarios > Inventarios > Inv. contable – Saldos.*  
2. Define la **fecha de referencia** y, si lo deseas, filtra por bodega, producto o grupo de inventario.  
3. Activa la opción **“Con saldo contable”** si deseas mostrar solo los productos con existencia.  
4. Haz clic en **Ver reporte.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Consulta de saldos de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/consulta_saldos_inventario.png)

💡 *Resultado:*  
Visualiza por bodega las columnas de **cantidad, costo unitario y costo total**, con totales generales al final del reporte.

**Opción 2: Informe de saldos de inventario (tipo impresión)**
📍 *Ruta:* *Inventarios > Inventarios > Inv. contable – Saldos*  

Informe listo para impresión que muestra **cantidades, costos unitarios y totales** de cada producto por bodega.  
También puedes generar la versión **por centro de costos** si necesitas discriminar las existencias según líneas productivas.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Informe saldos de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_saldos_inventario.png)

💡 *Opciones adicionales:*  
- Agrupar por **bodega, grupo o centro de costos**.  
- Mostrar **costo local o NIIF**.  
- Excluir productos sin saldo o incluir series/lotes si aplica.  

**Opción 3: Informe de entradas y salidas del período (Kárdex)**
📍 *Ruta:* *Inventarios > Inventarios > Inv. contable – Movimientos*  

Presenta las **entradas, salidas y saldos** de cada producto en un periodo, con cantidades, costos unitarios y totales.  
Permite agrupar por bodega o producto, e incluir filtros por departamento o clase.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Informe entradas y salidas del periodo](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_entradas_salidas_periodo.png)

💡 *Ejemplo:*  
Consulta las entradas y salidas de diciembre para conocer el saldo anterior, los movimientos y el saldo actual con su valor total.

**Opción 4: Informe de movimiento detallado de elementos**
📍 *Ruta:* *Inventarios > Inventarios > Inv. contable – Movimientos > Movimiento detallado de elementos*  

Permite visualizar el **detalle de cada movimiento de inventario** (compras, ventas, ajustes, traslados) en un rango de fechas.  
Incluye columnas de documento, cantidad, costo unitario, costo total y saldo acumulado.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Informe movimiento detallado de elementos](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_movimiento_detallado.png)

💡 *Uso común:*  
Ideal para auditorías o seguimiento de movimientos específicos por producto, centro de costos o bodega.

**Opción 5: Explorador de inventarios**
📍 *Ruta:* *Inventarios > Movimientos > Movimientos de inventario*  

Vista dinámica que muestra **todos los movimientos registrados**, incluyendo cantidad, costo total, precio unitario y valor de venta.  
Permite agrupar, aplicar filtros avanzados, exportar a Excel y generar gráficos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Explorador de inventarios](https://www.contapyme.com/conocimientocontapyme/080_IN/explorador_inventarios.png)

💡 *Ejemplo:*  
Filtra por producto o fecha, agrupa por bodega o cliente, y exporta a Excel para calcular totales y promedios.

**Opción 6: Tablas comparativas***
📍 *Ruta:* *Inventarios > Tablas comparativas*  

Reportes predefinidos para comparar cantidades y valores por **mes o año**, entre ellos:  
- **Movimientos y saldos mensuales.**  
- **Entradas y salidas por centro de costos.**  
- **Costo promedio ponderado mensual.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Tablas comparativas de inventarios](https://www.contapyme.com/conocimientocontapyme/080_IN/tablas_comparativas_inventario.png)

💡 *Ejemplo:*  
Compara el costo total del inventario entre 2024 y 2025 o analiza el consumo mensual de materias primas.

**Opción 7: ContaPyme para Excel**
Complemento que permite generar **tableros personalizados** en Excel con datos de inventario, saldos, costos y movimientos.  
Ideal para análisis de indicadores, proyecciones y gráficos interactivos.

---

## Exportación y Análisis de Información

### ¿Cómo exportar información a Excel para revisión?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo exportar información a Excel para revisión?
- ¿Cómo guardar un informe o consulta en Excel?
- ¿Cómo descargar los datos de un explorador o catálogo?
- ¿Dónde encuentro la opción para exportar información desde ContaPyme?
- ¿Cómo exportar un listado desde el explorador de inventarios o contabilidad?
- ¿Cómo guardar un informe tipo impresión en formato Excel o PDF?
- ¿Cómo pasar mis movimientos contables o balances a Excel?
- ¿Cómo exportar el catálogo de terceros o productos a Excel?
- ¿Cómo generar un archivo Excel con los saldos o movimientos del mes?
- ¿Cómo exportar una tabla comparativa de saldos o balances?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El sistema permite exportar la información a Excel de diferentes formas, según el tipo de **informe, explorador o consulta** desde donde trabajes.  
Esto te facilita revisar datos, consolidar resultados o compartirlos con otros usuarios fuera del sistema.

#### Opción 1: Informes tipo de impresión o PDF

📍 *Ruta:* En cualquier informe tipo impresión (por ejemplo, Mayor y Balances, Auxiliares, Listas de precios, etc.)  

Cuando el informe se muestra en pantalla, puedes exportarlo mediante la opción **Guardar como** ubicada en la cinta superior.  
Allí podrás elegir entre distintos formatos: **PDF**, **Word** o **Excel**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Exportar informe tipo PDF a Excel](https://www.contapyme.com/conocimientocontapyme/080_IN/exportar_informe_excel.png)

💡 *Ejemplo:*  
- Balance general  
- Mayor y balances  
- Informe de ventas o compras  

#### Opcion 2: Exploradores, catálogos, consultas o tablas comparativas  

📍 *Ruta:* *Exploradores, catálogos o Consultas > Opción Guardar (en la cinta superior)*  

En los listados tipo explorador, consultas, catálogos o tabla comparativa puedes exportar directamente los registros con la opción **Guardar** → **Excel (XLS/XLSX)**.  
Podrás elegir si exportar **solo los registros seleccionados** o **todos los de la lista**.

- Ejemplo Tipo Exploradores  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Exportar desde explorador, catálogos o consulta](https://www.contapyme.com/conocimientocontapyme/080_IN/exportar_explorador_excel.png)

- Ejemplo Tipo Consultas  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Exportar desde explorador, catálogos o consulta](https://www.contapyme.com/conocimientocontapyme/080_IN/exportar_consulta_excel.png)

- Ejemplo Catálogos  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Exportar desde explorador, catálogos o consulta](https://www.contapyme.com/conocimientocontapyme/080_IN/exportar_catalogo_excel.png)

- Ejemplo tablas comparativas  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Exportar balance general o tabla comparativa](https://www.contapyme.com/conocimientocontapyme/080_IN/exportar_balance_excel.png)

💡 *Ejemplo:*  
- Explorador de contabilidad  
- Consulta de balance general  
- Tabla comparativa de saldos  
- Catálogo de terceros


#### Opción 3: Usar el componente **ContaPyme para Excel**  

Si necesitas crear **informes personalizados y dinámicos**, puedes usar el complemento **ContaPyme para Excel**, que permite conectar directamente con tu base de datos y traer información actualizada mediante **funciones integradas**.

---

## Configuración Inicial de Inventarios

### ¿Cómo crear productos, grupos y bodegas desde cero?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo configurar el inventario desde cero en ContaPyme?
- ¿Por dónde empiezo para crear inventarios en el sistema?
- ¿Cómo inicializo el módulo de inventarios?
- ¿Qué configuración básica necesito antes de usar inventarios?
- ¿Cuál es el orden correcto para crear bodegas, grupos y productos?
- ¿Qué debo crear primero para poder manejar inventarios?
- ¿Qué pasos debo seguir antes de crear productos?
- ¿Por qué el sistema me pide bodegas o grupos al crear un producto?
- ¿Cómo dejar listo el inventario para compras y ventas?
- ¿Cómo evitar errores al crear productos por primera vez?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La creación de **bodegas**, **grupos de inventario** y **productos** hace parte de la configuración inicial del módulo de inventarios.  
Aunque el procedimiento general es similar (ingresar al catálogo y crear un registro), **cada uno tiene una ruta y condiciones específicas**, por lo que se recomienda seguir un **orden lógico** para evitar errores en inventarios, costos o impuestos.

#### Opción 1: Crear las bodegas

Las bodegas definen **dónde se almacenan los productos** dentro del sistema y son la base para el control de existencias.

📍 **Ruta:**  
*Inventarios > Catálogos > Bodegas*

> Aquí se crean las bodegas físicas o lógicas que luego se usarán en compras, ventas y ajustes de inventario.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Catálogo de bodegas](https://www.contapyme.com/conocimientocontapyme/080_IN/catalogo_bodegas.png)

#### Opción 2: Crear los grupos de inventario

Los grupos de inventario determinan el **comportamiento contable y operativo** de los productos, como manejo de costos, impuestos y control de cantidades.

📍 **Ruta:**  
*Inventarios > Catálogos > Grupos de inventario*

> Los productos heredan la configuración del grupo al que pertenecen, por lo que este paso es obligatorio antes de crear productos.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Catálogo de grupos de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/catalogo_grupos_inventario.png)

#### Opción 3: Crear los productos (elementos de inventario)

Los productos se crean **asociándolos a un grupo de inventario previamente configurado** y luego se les asignan precios, listas y demás características.

📍 **Ruta:**  
*Inventarios > Catálogos > Elementos de inventario*

> En este catálogo se definen los productos que serán utilizados en compras, ventas y movimientos de inventario.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Catálogo de elementos de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/catalogo_elementos_inventario.png)

💡 **Recomendación importante:**  
No se recomienda crear productos sin haber definido previamente las **bodegas** y los **grupos de inventario**, ya que esto puede generar inconsistencias en el manejo del inventario y la contabilidad.

#### 📌 Recursos adicionales

**Video – Configuración básica de inventarios**  
[Inventarios Básico I – En este video se refuerza el proceso completo para crear **bodegas, grupos de inventario y productos**, mostrando el orden correcto y ejemplos prácticos dentro del sistema.](https://www.youtube.com/watch?v=ActUvoat4tw&t=504s)  

**Guía de montaje:**  
*Inventarios > Sesión de ayudas > Guías de montaje > Guía de montaje módulo de inventarios* 

---

## Operaciones, Numeración y Trazabilidad

### ¿Cómo evitar que se duplique el consecutivo de una operación?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué se está repitiendo el consecutivo de una factura?
- ¿Cómo evitar que se repita el número de una factura o documento?
- ¿Qué debo revisar cuando se duplican los números de las facturas?
- ¿Cómo evitar que dos documentos tengan el mismo número?
- ¿Dónde se configura la numeración para que no se duplique?
- ¿Dónde se configura el control de duplicidad del consecutivo?
- ¿De qué depende que el consecutivo se repita en una operación?
- ¿Cómo configurar correctamente el consecutivo de un documento?
- ¿Cómo controlar la numeración de las facturas para que no se crucen?
- ¿Cuál es la mejor configuración para evitar consecutivos duplicados?
- ¿Cómo funciona la numeración automática de los documentos?
- ¿Por qué es mejor usar numeración automática o tipo factura?
- ¿Cómo definir prefijos distintos para evitar cruces de numeración?
- ¿Cómo validar rangos de numeración para que no se repitan los documentos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La duplicidad del consecutivo en una operación **no depende directamente de la operación** (factura, nota crédito, comprobante, etc.), sino de la **configuración del documento de soporte** que se esté utilizando.

Cada documento de soporte define:
- El **tipo de numeración**.
- La **máscara** o estructura del consecutivo.
- El **control de duplicidad** cuando un número ya existe.

Por esta razón, para evitar consecutivos duplicados es necesario **configurar correctamente el documento de soporte asociado a la operación**.

#### Paso 1: Identificar el documento de soporte
1. Ingresa a **Menú básico > Documentos de soporte**.  
2. Ubica el documento que utiliza la operación (por ejemplo, *Factura de venta*).  
3. Clic derecho → **Modificar**.

#### Paso 2: Configurar la numeración del documento

##### Tipo de numeración
En la pestaña **Numeración**, selecciona el tipo adecuado:
- **Manual:**  
  El usuario digita el número del documento.  
  ⚠️ Tiene **mayor riesgo de duplicidad**, ya que depende del control manual.

- **Automática:**  
  El sistema asigna el consecutivo automáticamente y el usuario **no puede modificarlo**.  
  ✅ Reduce el riesgo de duplicados.

- **Tipo factura de venta:**  
  Numeración **estricta e indeleble**, controlada completamente por el sistema.  
  ✅ **Recomendada y obligatoria** para documentos electrónicos (factura electrónica, nota crédito, nota débito, nómina electrónica, documento soporte electrónico).

Este tipo garantiza que:
- El consecutivo avance **uno a uno**, sin saltos.
- No se repita ni se reutilice un número.
- El documento **no se pueda eliminar**, solo **anular**, manteniendo la trazabilidad exigida por la DIAN.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de numeración](https://www.contapyme.com/conocimientocontapyme/080_IN/config_datos_adicionales_factura.png)

##### 🔹 Máscara del documento
La máscara define el prefijo y la estructura del consecutivo.

Ejemplos:
- `FV-#####` → Factura de venta  
- `NC-@@&&###` → Nota crédito con año, mes y consecutivo  

**Recomendación:**  
Cada documento de soporte debe tener un **prefijo único**, para evitar cruces entre documentos diferentes.

###### 🔹 Control de duplicidad de documentos
Configura la acción cuando el número ya existe:
- **No mostrar mensaje**
- **Mostrar advertencia**
- **Mostrar error** ✅ *(recomendado)*

Al seleccionar **Mostrar error**, el sistema **bloquea la grabación** si el consecutivo ya fue utilizado.

#### Paso 3: Validar rangos y autoincremento
Si usas numeración automática, revisa:
- **Consecutivo inicial y final**.
- **Tipo de incremento** (permanente, anual, etc.).
- Que el documento **no comparta numeración** con otro documento distinto.

#### Recomendaciones finales
- Usa numeración **automática o tipo factura** siempre que sea posible.
- Activa **Mostrar error** para evitar duplicados.
- Define **prefijos distintos** por cada documento de soporte.

Si necesitas manejar numeraciones independientes (por ejemplo, contado y crédito), se recomienda **crear documentos de soporte separados**.

---

### ¿Por qué hay un salto en el consecutivo?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué hay un salto en el consecutivo?
- ¿Por qué se presentan saltos en la numeración de los documentos?
- ¿Es normal que haya saltos en el consecutivo?
- ¿Qué situaciones pueden generar saltos en el consecutivo?
- ¿Por qué el consecutivo no quedó seguido?
- ¿Por qué falta un número en la numeración de una factura?
- ¿Por qué se saltó un número en el consecutivo?
- ¿Un documento anulado genera salto en el consecutivo?
- ¿Por qué no coinciden los números de las facturas?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Un **salto en el consecutivo** de un documento (por ejemplo, una factura) generalmente se presenta por la **forma en que está configurado el documento de soporte**, específicamente en el **tipo de numeración** definido para ese documento.

#### Tipos de numeración del documento de soporte

En ContaPyme, cada documento de soporte cuenta con un **tipo de numeración**, el cual define cómo se asigna el consecutivo cuando se crean las operaciones:

##### 1. Numeración **Manual**
- El número del documento puede ser digitado libremente por el usuario.
- El sistema sugiere inicialmente “AUTO”, pero el consecutivo puede modificarse.
- Es común en documentos como la **factura de compra**, donde el número debe coincidir con el entregado por el proveedor.
- 📌 Al ser manual, esta numeración **puede generar saltos** si se ingresan números no consecutivos.

##### 2. Numeración **Automática**
- El consecutivo es asignado y controlado por el sistema.
- El usuario no puede modificar el número generado.
- Es adecuada para documentos internos que no requieren control estricto ante entidades externas.
- Puede presentarse un salto cuando una operación se crea y posteriormente se **anula**, ya que el consecutivo se conserva.

##### 3. Numeración **Tipo factura de venta** (✔️ Recomendada)
- Aplica para documentos que requieren **control estricto del consecutivo**, como:
  - Factura de venta
  - Factura electrónica
  - Nota crédito / débito electrónica
  - Nómina electrónica
  - Documento soporte electrónico

Este tipo de numeración es:

**Estrícta**
- El consecutivo avanza **de uno en uno**.
- No puede ser modificado por el usuario.
- Es permanente a través de los años.

**Indeleble**
- Las operaciones no se eliminan, solo se **anulan**.
- El consecutivo siempre se conserva para efectos de trazabilidad.

📌 Por esta razón, es la numeración recomendada para documentos electrónicos y fiscales.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de numeración del documento soporte](https://www.contapyme.com/conocimientocontapyme/080_IN/config_numeracion_documento.png)

#### Situaciones comunes que pueden generar saltos

Un salto en el consecutivo puede presentarse cuando:

- Se cambia temporalmente la numeración de **Tipo factura de venta** a **Manual**.
- Se ajustó manualmente el consecutivo y luego se volvió a configurar como **Tipo factura de venta**.
- El documento se maneja con numeración manual desde el inicio.
-Se creó una operación y luego fue **eliminada** (aplica en documentos que permiten eliminación).

#### Recomendaciones de configuración

- Para **facturas y documentos electrónicos**, mantener siempre la numeración como **Tipo factura de venta**.
- Para otros documentos internos, utilizar **numeración automática**.
- Evitar modificar manualmente el consecutivo una vez el documento esté en uso.
- Cuando una operación no aplica, **anularla**, en lugar de eliminarla, para conservar la trazabilidad.

#### ¿Qué hacer si la configuración siempre ha sido correcta?

Si el documento:
- Siempre ha estado configurado correctamente,
- No ha tenido cambios en el tipo de numeración,
- Y aun así se identifica un salto que genera dudas,

👉 Se recomienda **crear un tiquete de soporte**, para que un asesor valide el caso y brinde acompañamiento específico según la configuración de la empresa.

---

### ¿Cómo reconfigurar o corregir las operaciones y la numeración en el sistema POS?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo reconfigurar o corregir las operaciones y la numeración en el sistema POS?
- ¿Cómo corregir la numeración del POS?
- ¿Cómo ajustar los consecutivos en las operaciones del punto de venta?
- ¿Se puede corregir la numeración de documentos en POS?
- ¿Cómo reconfigurar la numeración de facturas POS?
- ¿Qué debo tener en cuenta para cambiar la numeración en POS?
- ¿Cómo corregir errores en la numeración de operaciones POS?
- ¿Es posible ajustar consecutivos ya usados en el POS?
- ¿Qué riesgos tiene modificar la numeración del POS?
- ¿Cuándo es recomendable solicitar soporte para corregir consecutivos en POS?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, la **numeración de las operaciones del POS puede ajustarse**, pero este proceso requiere **especial cuidado**, ya que impacta directamente la trazabilidad de los documentos y la correcta continuidad de los consecutivos.

Por esta razón, antes de realizar cualquier cambio, es importante conocer **qué es posible hacer**, **en qué casos aplica** y **cuándo es mejor contar con acompañamiento**.

#### 1. Ajustes posibles en la numeración

##### Numeración manual (casos puntuales)

Cuando un documento está configurado con **numeración manual**, es posible:

- Definir el consecutivo de forma directa.
- Corregir numeraciones que se hayan definido previamente de forma incorrecta.

📌 Esta opción existe, pero **debe utilizarse solo en escenarios controlados**, ya que una asignación incorrecta puede generar:
- Saltos innecesarios.
- Duplicidad de numeración.
- Confusión en la secuencia documental.

#### 2. Cuidado con el manejo de consecutivos

La numeración de los documentos cumple una función clave en el sistema, por lo que se recomienda:

- Evitar cambiar el tipo de numeración una vez el documento ya está en uso.
- No alternar entre **manual** y **automática** sin validar el impacto.
- No ajustar consecutivos si ya existen operaciones procesadas con ese documento.
- Recordar que las operaciones anuladas **conservan el consecutivo**, como parte de la trazabilidad del sistema.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de numeración del documento soporte](https://www.contapyme.com/conocimientocontapyme/080_IN/config_numeracion_documento.png)

#### 3. Recomendación importante

Si necesitas:
- Reorganizar la numeración.
- Ajustar consecutivos ya utilizados.
- Validar por qué se presentan saltos.
- Asegurar que la numeración continúe correctamente hacia adelante.

👉 Lo más recomendable es **crear un tiquete de soporte** para que un asesor revise el caso y te acompañe en el ajuste, garantizando que la numeración quede correcta **sin afectar las operaciones existentes**.

#### 💡 Tip
La numeración manual es una herramienta válida, pero su uso responsable evita inconsistencias futuras.  
Cuando se trata de consecutivos, **más que corregir rápido, lo importante es corregir bien**.

---

### ¿Cómo rastrear una factura que ya no aparece en el Manejador de operaciones?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no aparece una factura en el Manejador de operaciones?
- ¿Cómo rastrear una factura que ya no se ve en el Manejador de operaciones?
- ¿Cómo buscar una factura que no aparece en el Manejador?
- ¿Dónde puedo encontrar una factura que ya no veo?
- ¿Qué hacer si una factura no aparece después de guardarla?
- ¿Por qué no veo una factura que ya había registrado?
- ¿Cómo buscar facturas creadas anteriormente en el Manejador?
- ¿Cómo saber si una factura fue anulada o eliminada?
- ¿Cómo revisar qué pasó con una factura en el sistema?
- ¿Cómo buscar facturas creadas por otro usuario?
- ¿Cómo usar la Bitácora para rastrear una factura?
- ¿Por qué una operación no se muestra en el Manejador de operaciones?

Cuando una factura **no se visualiza en el Manejador de operaciones**, esto **no significa necesariamente que se haya perdido**, sino que normalmente está relacionado con **filtros activos**, **fechas de trabajo**, **usuario seleccionado** o **acciones realizadas sobre la operación**.  

A continuación, te mostramos cómo realizar la verificación paso a paso.

#### 1. Revisar filtros del Manejador de operaciones

El Manejador de operaciones cuenta con varios filtros que determinan **qué documentos se muestran**.

Verifica lo siguiente:

- 📅 **Fecha de trabajo**  
  Confirma que la fecha de trabajo corresponda al día en que se creó la factura.

- 🗓️ **Filtros de tiempo (Año / Mes / Día / Semana)**  
  Puedes:
  - Ver solo las operaciones del día.
  - Ampliar la vista al mes.
  - Consultar todo el año.
  - O quitar filtros para ver **todas las operaciones disponibles**.

- 👤 **Filtro por usuario**  
  Asegúrate de que esté seleccionado el usuario correcto o cambia a **[TODOS]** si deseas ver operaciones de otros usuarios (si tienes permisos).

- 📄 **Tipo de documento / Tipo de operación**  
  Quita estos filtros si están activos para ampliar la búsqueda.

La siguiente imagen muestra los filtros del Manejador de operaciones, incluyendo usuario, fecha y tipo de documento, que deben revisarse cuando una factura no aparece en pantalla:
![imagen: Filtros del Manejador de operaciones](https://www.contapyme.com/conocimientocontapyme/080_IN/manejador_operaciones_filtro_usuario.png)

💡 *Recomendación:*  
Como primer paso, limpia todos los filtros y realiza nuevamente la búsqueda.

#### 2. Validar permisos del usuario

Ten en cuenta que:

- Solo los usuarios con **permisos adecuados** pueden:
  - Ver operaciones creadas por otros usuarios.
  - Procesar, modificar, anular o eliminar documentos de terceros.
- Si el usuario no tiene estos permisos, la factura **no se mostrará**, aunque exista.

📌 Los permisos se controlan desde los **perfiles de seguridad**.

##### Nota importante
Una factura **eliminada o anulada**:
- No desaparece sin dejar rastro.
- Siempre queda registrada en la **bitácora**, conservando la trazabilidad del sistema.

#### Recomendación final

Si después de:
- Revisar filtros,
- Validar usuario y permisos,
- Consultar la Bitácora,

la factura sigue sin aparecer o no queda claro su estado,

👉 **Lo más recomendable es crear un tiquete de soporte**, para que un asesor valide el caso directamente en el sistema y te acompañe en la búsqueda y análisis de la operación.

Esto garantiza una revisión completa y segura de la información.

#### 💡 Tip
Antes de asumir que una factura no existe, revisa siempre:
- Filtros activos  
- Fecha de trabajo  
- Usuario seleccionado  
Son la causa más común de este tipo de consultas.

---

### ¿Cómo procesar operaciones generadas por el perfil administrador?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo procesar operaciones creadas por un usuario administrador?
- ¿Cómo procesar documentos creados por otro usuario?
- ¿Dónde se procesan las operaciones generadas por un usuario específico?
- ¿Cómo filtrar operaciones por usuario en el manejador de operaciones?
- ¿Cómo procesar operaciones de un usuario distinto al mío?
- ¿Cómo encontrar y procesar operaciones hechas por otro usuario?
- ¿Cómo procesar varias operaciones creadas por el mismo usuario?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, **las operaciones no se procesan por perfil**, sino **por usuario**.  
Esto significa que, aunque un usuario tenga asignado el **perfil Administrador**, las operaciones quedan asociadas **al usuario que las creó**.

Por esta razón, el procesamiento de operaciones generadas por usuarios con perfil administrador se realiza desde el **Manejador de operaciones**, filtrando por el usuario correspondiente.

#### 1. Ingresar al Manejador de operaciones

📍 **Ruta:**  
**Básico > Manejador de operaciones**

Desde esta opción podrás visualizar todas las operaciones registradas en el sistema (ventas, compras, nómina, inventarios, POS, entre otras).

#### 2. Filtrar las operaciones por usuario administrador

En la parte inferior del Manejador de operaciones, utiliza el filtro **Usuario** y selecciona el **usuario que tiene perfil Administrador**.

De esta forma, el sistema mostrará únicamente las operaciones generadas por ese usuario.

Adicionalmente, el listado de operaciones también depende de los **filtros de tiempo**, los cuales permiten controlar qué información se visualiza:

- **Fecha de trabajo**
- **Filtro por Año**
- **Filtro por Mes**
- **Filtro por Día**

Con estos filtros puedes:
- Ver **solo las operaciones del día actual**.
- Consultar **las operaciones de un mes específico**.
- Revisar **operaciones de todo un año**.
- Visualizar **todas las operaciones**, ajustando o limpiando los filtros de fecha.

Estos filtros funcionan como un **complemento del filtro por usuario**, permitiendo una búsqueda más precisa según el período que necesites analizar o procesar.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Filtro por usuario en manejador de operaciones](https://www.contapyme.com/conocimientocontapyme/080_IN/manejador_operaciones_filtro_usuario.png)

#### 3. Procesar las operaciones

Una vez filtradas las operaciones, puedes:

- Procesar **todas las operaciones** del listado.
- Seleccionar **una o varias operaciones específicas**.
- Procesar las operaciones **una por una**.

📍 **Opciones disponibles:**
- **Procesar > Procesar todas**
- **Procesar > Desde aquí**
- Seleccionar la operación y hacer clic en **Procesar**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Procesar operaciones desde el manejador](https://www.contapyme.com/conocimientocontapyme/080_IN/manejador_operaciones_procesar.png)

#### Consideraciones importantes

- El procesamiento **no depende del perfil**, sino del **usuario que generó la operación**.
- Un usuario con perfil Administrador puede tener operaciones pendientes igual que cualquier otro usuario.
- El Manejador de operaciones permite **procesar documentos de forma masiva o individual**.
- Se recomienda verificar el estado y validaciones de las operaciones antes de procesarlas.

#### Nota
- **Solo los usuarios con permisos adecuados** pueden:
  - Ver operaciones creadas por otros usuarios.
  - Procesar operaciones de otros usuarios.
  - Modificar, anular o eliminar operaciones de otro usuarios.
- Si un usuario **no tiene estos permisos**, únicamente podrá:
  - Visualizar y procesar **sus propias operaciones**, aunque otros documentos existan en el sistema.

Por esta razón, si un usuario no logra ver o procesar operaciones de otros usuarios (incluidos administradores), es necesario **verificar el perfil de seguridad asignado** y los permisos habilitados.


#### 📌 Recursos adicionales

- [Video: Procesamiento de una operación](https://www.youtube.com/watch?v=GFqEvA0EC0o&t)
- [Videos: Plataforma de capacitación con tutoriales sobre Catálogos básicos, manejador de operaciones, inicio del sistema, plataforma.](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)

---

## Punto de Venta (POS)

### ¿Cómo configurar facturación como punto de venta (POS)?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo configurar el sistema para vender como punto de venta (POS)?
- ¿Cómo activar la facturación tipo POS en ContaPyme?
- ¿Qué necesito configurar para usar facturación como POS?
- ¿Qué se debe configurar antes de usar el módulo POS?
- ¿Qué requisitos se deben cumplir para trabajar con Inventarios POS?
- ¿Qué debo tener creado antes de empezar a usar el POS?
- ¿Qué módulos deben estar configurados para usar POS?
- ¿Cómo preparar el sistema para ventas rápidas por caja?
- ¿Cómo dejar listo el sistema para trabajar con cajeros?
- ¿Cómo funciona la facturación como punto de venta?
- ¿Dónde encuentro la guía o capacitación para configurar el POS?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La configuración de la **facturación como punto de venta (POS)** implica varios pasos y ajustes previos, ya que este tipo de operación está diseñada para **ventas rápidas**, uso de **cajeros**, **dispositivos físicos** (impresoras, lectores, básculas) y **controles automáticos** de inventario y pagos.

Por esta razón, no se trata de una sola opción, sino de un **conjunto de configuraciones** que deben quedar correctamente preparadas antes de usar el POS.

De forma general, para trabajar con **Inventarios Punto de Venta (POS)** se debe tener configurado:

- **Inventarios**
  - Grupos de inventario con cuentas contables.
  - Productos creados con precios y unidades de venta.
  - Bodegas definidas para la salida de mercancía.

- **Facturación**
  - Documento de soporte de factura de venta (preferiblemente con numeración tipo factura).
  - Documento de impresión (factura tirilla o media hoja).
  - Resolución de facturación, si aplica.

- **Formas de pago**
  - Cuentas de caja, bancos y crédito.
  - Etiquetas de formas de cobro (efectivo, tarjeta, banco, etc.).

- **Usuarios**
  - Usuarios cajeros con control de turno y base de caja.
  - Permisos por usuario, perfil o para todos los usuarios.

- **Dispositivos (opcional)**
  - Impresora POS (tirilla).
  - Lector de código de barras.
  - Cajón monedero.
  - Báscula.
  - Datáfono (Redeban).

Debido a la cantidad de opciones disponibles, **la forma recomendada de aprender y configurar correctamente el POS** es apoyarse en los recursos oficiales del sistema.

#### 📌 Recursos adicionales

##### Video de capacitación
Capacitación completa sobre **Inventarios Punto de Venta (POS)**, donde se explica:
- El funcionamiento del POS.
- Las configuraciones iniciales.
- El uso de cajeros, memorias, dispositivos y formas de pago.
[Video: Configuración y uso del módulo Inventarios POS en ContaPyme](https://www.youtube.com/watch?v=nzkDsTruYEQ)  

##### Guía de montaje
Puedes consultar el paso a paso detallado en la guía oficial:
📍 **Ruta:**  
**Pestaña Inventarios → Sesión Ayudas → Guías de montaje →  
Guía de montaje Inventarios Punto de Venta (POS)**

#### ¿Necesitas ayuda específica?
Si tienes una necesidad puntual se recomienda **crear un tiquete de soporte**, indicando:
- Qué tipo de negocio manejas.
- Qué módulos tienes activos.
- Qué deseas configurar exactamente.

De esta forma el equipo de soporte puede orientarte de manera precisa y segura.

---

### ¿Cómo configurar el cajón monedero para que se abra al imprimir?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo hacer que el cajón monedero se abra al imprimir la factura?
- ¿Cómo configurar la apertura automática del cajón en el POS?
- ¿Cómo abrir el cajón monedero automáticamente al facturar?
- ¿Cómo habilitar la apertura del cajón monedero al imprimir factura POS?
- ¿Dónde se configura el cajón monedero en punto de venta?
- ¿Dónde se configuran los periféricos del POS?
- ¿Cómo configurar la apertura del cajón monedero en facturación POS?
- ¿Por qué no se abre el cajón monedero al imprimir?
- ¿Cómo validar la conexión del cajón monedero en el sistema?
- ¿Cómo configurar el cajón monedero conectado a la impresora POS?
- ¿Cómo configurar el comando para abrir el cajón monedero?
- ¿Qué comando se usa para abrir el cajón desde la impresora?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para que el **cajón monedero se abra automáticamente al imprimir una factura** en el punto de venta (POS), es necesario validar **la conexión física** y realizar la **configuración correcta dentro de la operación** en el sistema.

#### paso 1. Verificar la conexión del cajón monedero

Antes de configurar el sistema, identifica **cómo está conectado el cajón**:

##### 🔌 Cajón conectado a la impresora POS (más común)
- El cajón se conecta a la impresora mediante un **puerto RJ11**.
- La **impresora envía el comando de apertura** al cajón cuando se imprime el documento.
- Esta es la configuración estándar en la mayoría de puntos de venta.

##### 🔌 Cajón conectado directamente al computador
- El cajón puede conectarse por **puerto serial o paralelo**.
- En este caso, el sistema envía el comando de apertura directamente al puerto configurado.

#### paso 2. Configurar la apertura del cajón en la operación POS

Una vez validada la conexión física, debes indicarle al sistema **cuándo y cómo abrir el cajón**.

📍 **Ruta:**  
*Básico > Operaciones > + > Ventas > Punto de venta (POS) > Menú superior: Operación > Configurar operación > Configuración de periféricos > Apertura del cajón monedero*
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración apertura de cajón monedero en POS](https://www.contapyme.com/conocimientocontapyme/080_IN/config_apertura_cajon_monedero_pos.png)

##### Parámetros a configurar

En la sección **Apertura de cajón monedero**, debes validar lo siguiente:

###### 1. Conexión del cajón monedero
Indica dónde está conectado físicamente el cajón:

- **Cajón monedero conectado a impresora**  
  (Opción más común en puntos de venta).

- **Cajón monedero conectado directamente al computador**  
  (Solo si el cajón no está conectado a la impresora).

> El sistema enviará el comando de apertura al dispositivo seleccionado.

###### 2 Comando de apertura desde impresora
Si el cajón está conectado a la impresora, debes indicar el **comando ESC/POS** correspondiente.
-Ejemplo común: p,0,8,8

📌 **Importante:**
- Los parámetros deben separarse por coma (,).
- No es necesario incluir el código ESC (27).
- El comando se enviará directamente a la impresora donde se imprime la tirilla.
- El comando puede variar según el modelo de impresora POS.

###### 3 Abrir cajón monedero al imprimir (Importante)
Activa la opción:

- ✅ **Abrir cajón monedero al imprimir la factura en tirilla**

Con esta opción habilitada, el sistema:
- Abrirá automáticamente el cajón al **imprimir la factura POS**.
- Permitirá la apertura manual con **Ctrl + F3**, siempre que el usuario tenga permisos.

##### Consideraciones importantes
- Esta configuración aplica por **empresa y equipo (PC)**.
- Si el cajón no se abre:
  - Verifica el comando ESC/POS.
  - Verifica que la impresora sea la correcta.
  - Verifica que la factura esté configurada para imprimir en **formato tirilla**.

#### 📌 Recursos adicionales

- **Guía:** Inventarios > Sesión Ayudas > Guías de montaje POS
- **Video:** [Video: Configuración y uso del módulo Inventarios POS en ContaPyme](https://www.youtube.com/watch?v=nzkDsTruYEQ)  

---

## Accesos, Perfiles y Seguridad

### ¿Cómo configurar para que los usuarios solo puedan ver facturas, cotizaciones u otras operaciones?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo hacer que un usuario solo pueda ver facturas?
- ¿Cómo limitar a un usuario para que solo visualice cotizaciones?
- ¿Cómo configurar usuarios solo con permiso de consulta?
- ¿Cómo dar acceso solo de lectura a ciertas operaciones?
- ¿Cómo evitar que un usuario edite o elimine facturas?
- ¿Cómo restringir permisos para que no puedan modificar ni anular documentos?
- ¿Cómo crear un perfil para que el usuario solo visualice documentos?
- ¿Cómo configurar permisos por rol (vendedor, cajero, consulta)?
- ¿Cómo bloquear acciones como anular o eliminar operaciones a un usuario?
- ¿Cómo configurar perfiles de seguridad en ContaPyme?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, para **limitar lo que un usuario puede hacer dentro del sistema**, se utilizan los **perfiles de seguridad**.  
Estos perfiles permiten definir con precisión **qué operaciones puede crear, modificar, visualizar, anular o eliminar cada usuario**, según su rol dentro de la empresa (vendedor, cajero, auxiliar, consulta, etc.).

Gracias a esta configuración, es posible permitir que un usuario **solo visualice determinadas operaciones** (como facturas o cotizaciones) y restringir cualquier otra acción.

#### Paso a paso: configurar usuarios solo con permiso de visualización

##### 1. Crear o identificar el perfil de seguridad

📍 *Ruta:* **Básico > Usuarios > Perfiles de seguridad para clientes desktop**

1. Ingresa al catálogo de **Perfiles de seguridad**.
2. Crea un nuevo perfil o selecciona uno existente (por ejemplo: `VENDEDOR`, `CONSULTA`, `CAJERO`).
3. Define una descripción clara del perfil según su función.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Acceso a perfiles de seguridad](https://www.contapyme.com/conocimientocontapyme/080_IN/perfiles_seguridad_acceso.png)

##### 2. Configurar los permisos del perfil

1. Dentro del perfil, ubica el módulo donde se encuentran las operaciones que deseas restringir, por ejemplo:
   - **Facturación electrónica y POS**
   - **Inventarios Plus (cotizaciones, pedidos)**
2. Ingresa a la sección **Operaciones**.
3. Para cada operación (Factura de venta, Cotización, POS u otra):
   - ✅ Activa únicamente **crear y Visualizar**.
   - ❌ Desactiva **Modificar**, **Anular** y **Eliminar**, según la política de la empresa.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de permisos por operación](https://www.contapyme.com/conocimientocontapyme/080_IN/permisos_operaciones_visualizar.png)

##### 3. Asignar el perfil al usuario

📍 *Ruta:* **Básico > Usuarios > Usuarios del sistema**

1. Selecciona el usuario.
2. Haz clic en **Modificar**.
3. Asigna el **perfil de seguridad** configurado.
4. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Asignación de perfil al usuario](https://www.contapyme.com/conocimientocontapyme/080_IN/asignacion_perfil_usuario.png)

##### 4. Validar el acceso del usuario

- Ingresa con el usuario configurado.
- Accede a las operaciones permitidas.
- Verifica que:
  - Puede **crear y visualizar** los documentos.
  - No puede **modificar, anular ni eliminar**.

##### 💡 Ejemplo práctico

Un usuario con perfil **Vendedor** puede:
- 👀 Visualizar facturas y cotizaciones.
- 🚫 No modificar precios ni documentos.
- 🚫 No anular ni eliminar operaciones.

Mientras que un perfil **Administrador** conserva todos los permisos activos.

#### Observaciones importantes

- Los perfiles se pueden crear por **cargo o rol** dentro de la empresa.
- Un mismo perfil puede aplicarse a varios usuarios.
- Esta configuración aplica para **cualquier operación del sistema**, no solo ventas.
- Los permisos pueden ajustarse en cualquier momento según las necesidades del negocio.

#### Nota:
- Si deseas que el usuario solo consulte documentos existentes, deja activo únicamente el permiso Visualizar y desactiva Crear.
- Los cambios de perfil aplican desde el próximo ingreso del usuario al sistema.

#### 📌 Recursos adicionales

- [Video: Configuración y uso del módulo Inventarios POS en ContaPyme](https://www.youtube.com/watch?v=nzkDsTruYEQ)
- [Video: Inventarios básico I – conceptos, catálogos y listas de precios](https://www.youtube.com/watch?v=ActUvoat4tw)
- [Video: Creación de usuarios y asignación de licencias en ContaPyme](https://www.youtube.com/watch?v=o49Sh93o3H0)

---

### ¿Cómo gestionar el acceso para un usuario específico a bodegas o al POS?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo limitar a un usuario para que solo use ciertas bodegas?
- ¿Cómo dar acceso a una sola bodega a un usuario?
- ¿Cómo restringir bodegas por usuario en ContaPyme?
- ¿Cómo controlar qué bodegas puede ver o usar un usuario?
- ¿Cómo evitar que un usuario opere en todas las bodegas?
- ¿Cómo configurar seguridad de bodegas por usuario o perfil?
- ¿Cómo hacer que un usuario solo pueda vender desde una bodega específica?
- ¿Cómo dar acceso al POS solo a algunos usuarios?
- ¿Cómo habilitar o bloquear el POS para un usuario específico?
- ¿Cómo controlar qué usuarios pueden facturar en POS?
- ¿Cómo configurar permisos de POS por perfil de usuario?
- ¿Cómo controlar qué bodegas puede usar un usuario en el POS?
- ¿Cómo restringir el POS para que facture solo desde una bodega?
- ¿Por qué un usuario puede facturar pero no en todas las bodegas?
- ¿Cómo definir a qué bodega puede facturar un usuario?
- ¿Cómo combinar permisos de POS con restricción de bodegas?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, el acceso de un usuario a **bodegas** y al **Punto de Venta (POS)** se gestiona mediante **perfiles de seguridad** y **configuraciones de seguridad de datos**.  
Dependiendo de la necesidad, puedes **restringir qué bodegas puede usar** un usuario o **qué acciones puede realizar en el POS** (crear, modificar, anular, solo visualizar, etc.).

#### 1. Controlar el acceso al POS (por perfil de usuario)

El acceso al **POS** y a las operaciones de facturación se define desde los **perfiles de seguridad**, los cuales determinan **qué puede hacer cada usuario** dentro del sistema.

##### Paso a paso:

📍 **Ruta:**  
**Básico > Usuarios > Perfiles de seguridad para clientes desktop**

1. Ingresa al catálogo de **Perfiles de seguridad**.  
2. Selecciona o crea el perfil que usarán los usuarios (por ejemplo: `CAJERO`, `VENDEDOR`, `FACTURACIÓN`).  
3. Dirígete al módulo **Facturación electrónica y POS**.  
4. En las secciones **Facturación y ventas** y **Punto de venta**, define los permisos:
   - Crear  
   - Visualizar  
   - Modificar  
   - Anular  
   - Eliminar  
5. Marca únicamente las acciones que deseas permitir al usuario.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de permisos POS por perfil de usuario](https://www.contapyme.com/conocimientocontapyme/080_IN/perfil_seguridad_pos.png)

💡 **Nota:**  
Si un usuario **no tiene permiso para crear operaciones en POS**, no podrá facturar, aunque tenga acceso al módulo.

#### 2. Restringir el acceso a bodegas específicas (seguridad de datos)

Si necesitas que un usuario **solo pueda trabajar con una o varias bodegas**, debes aplicar **seguridad de datos a nivel de bodegas**.

##### Paso a paso:

📍 **Ruta:**  
**Inventarios > Bodegas > Configuración**

1. Ingresa al catálogo de **Bodegas**.  
2. Haz clic en **Configuración**.  
3. Define el **alcance de la configuración**:
   - Por **Perfil**  
   - Por **Usuario**  
4. Ve a la opción **Seguridad a nivel de bodegas**.  
5. Activa **Indicar las bodegas permitidas**.  
6. Marca las bodegas a las que el usuario podrá acceder y define si puede:
   - **Ver**
   - **Modificar**
   - **Operar**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de seguridad a nivel de bodegas](https://www.contapyme.com/conocimientocontapyme/080_IN/seguridad_bodegas.png)

📌 **Resultado:**  
El usuario solo podrá **consultar, operar y generar movimientos** en las bodegas autorizadas.  
Los informes y consultas también se filtrarán automáticamente por estas bodegas.

#### 3. ¿Qué configuración usar según la necesidad?

| Necesidad | Configuración recomendada |
|--------|---------------------------|
| Permitir o bloquear acceso al POS | Perfil de seguridad |
| Limitar acciones en facturas o POS | Perfil de seguridad |
| Permitir acceso solo a ciertas bodegas | Seguridad a nivel de bodegas |
| Aplicar reglas por usuario específico | Seguridad por usuario |
| Aplicar reglas por rol | Seguridad por perfil |


#### Nota:
Los cambios de seguridad aplican después de cerrar y volver a ingresar al sistema.

#### 📌 Recursos adicionales
- [Video: Creación de usuarios y asignación de licencias en ContaPyme](https://www.youtube.com/watch?v=o49Sh93o3H0)

💙 *Tip:*  
Para un control óptimo, se recomienda **combinar perfiles de seguridad (qué puede hacer)** con **seguridad de bodegas (dónde puede hacerlo)**.  

---

### ¿Cómo asignar bodegas, cajas y listas a usuarios?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo asignar bodegas a los usuarios del sistema?
- ¿Cómo asignar listas de precios a los usuarios?
- ¿Cómo definir una bodega por defecto para facturación o ventas?
- ¿Cómo definir una bodega por defecto para una operación?
- ¿Dónde se configuran las listas de precios que usa cada usuario?
- ¿Cómo configurar qué bodega puede usar cada usuario?
- ¿Cómo hacer que al ingresar a facturación se cargue una bodega o lista automáticamente?
- ¿Cómo configurar valores por defecto en facturación y ventas?
- ¿Cómo controlar qué usuarios pueden usar ciertas bodegas, listas o cajas?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La asignación de **bodegas, listas de precios y cajas** se realiza principalmente desde la **configuración de cada operación** (por ejemplo, facturación, ventas o POS).  
Desde allí puedes definir **valores por defecto**, controlar la **visualización de campos** y establecer **permisos según el alcance deseado**.

#### Configuración desde una operación (ejemplo: Facturación y Ventas)

Una de las formas más comunes de asignar estos valores es configurarlos **por defecto en la operación**, para que al ingresar el usuario el sistema cargue automáticamente la información requerida.

##### 📍 Ruta:
*Básico > Manejador de operaciones > Facturación y Ventas > Operación > Configurar*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ingreso a configuración de la operación de facturación y ventas](https://www.contapyme.com/conocimientocontapyme/080_IN/configurar_operacion_facturacion.png)

##### Alcance de la configuración (muy importante)

Cada configuración que realices en la operación puede aplicarse a diferentes niveles:

- **Todos los usuarios**  
- **Por perfil de usuario**  
- **Por usuario específico**

Esto se define en la parte superior de la ventana de configuración, permitiendo controlar con precisión **quién ve, quién modifica y quién utiliza** bodegas, listas de precios o cajas.

#### Datos maestros de la operación

En la sección **Datos maestros de la operación** puedes definir:

- **Bodega por defecto**
- **Lista de precios por defecto**
- **Campos obligatorios**
- **Campos en solo lectura**
- **Valores automáticos al ingresar a la operación**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de datos maestros de la operación](https://www.contapyme.com/conocimientocontapyme/080_IN/datos_maestros_operacion_facturacion.png)

#### Recomendación

👉 Puedes **solicitar un tiquete de soporte**, indicando el escenario que deseas manejar para recibir acompañamiento en la configuración.

#### 📌 Recursos adicionales

[Video: Inventarios Básico I](https://www.youtube.com/watch?v=ActUvoat4tw&t=504s)  
[Inventarios Básico II](https://www.youtube.com/watch?v=dErWn5fapzM&t=3630s)  

---

### ¿Cómo establecer campos obligatorios o restricciones en las facturas?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo hacer obligatorios campos en la factura de venta?
- ¿Cómo obligar a diligenciar ciertos datos antes de guardar una factura?
- ¿Dónde se configuran los campos obligatorios de la factura?
- ¿Cómo evitar que guarden una factura sin cliente, bodega o vendedor?
- ¿Cómo controlar qué campos deben llenarse en facturación?
- ¿Cómo bloquear campos para que no se puedan modificar en la factura?
- ¿Cómo dejar un campo de la factura solo en modo lectura?
- ¿Cómo restringir la edición de precios o bodegas en la factura?
- ¿Cómo exigir datos adicionales al facturar?
- ¿Cómo hacer obligatorios los datos adicionales en la factura?
- ¿Dónde se configuran los datos adicionales de la factura de venta?
- ¿Cómo aplicar validaciones en la factura por usuario o perfil?
- ¿Cómo definir restricciones diferentes según el usuario que factura?
- ¿Cómo controlar la información que los usuarios pueden editar en facturación?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme puedes definir **campos obligatorios**, **campos de solo lectura** y **restricciones de edición** en las facturas de venta, con el fin de controlar la información que los usuarios deben diligenciar antes de guardar el documento.  
Estas validaciones se configuran **directamente desde la operación de facturación**, y pueden aplicarse **a todos los usuarios**, **por perfil** o **por usuario específico**.

#### Ruta general en el sistema

📍 *Menú básico > Manejador de operaciones > Facturación y ventas > Operación > Configurar operación*

Desde esta opción accedes al **asistente de configuración**, donde se controlan los campos visibles, obligatorios y restringidos.

#### Establecer campos obligatorios en la factura

1. Ingresa a la operación de **Factura de venta**.  
2. Haz clic en **Operación > Configurar operación**.  
3. En el panel izquierdo, dirígete por ejemplo a:  
   **Campos de la operación > Datos de encabezado**  
   (por ejemplo: cliente, bodega, lista de precios, vendedor, referencia, etc.).  
4. Marca la columna **Requerido** en los campos que deban diligenciarse obligatoriamente.  
5. Guarda la configuración.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración de campos obligatorios en encabezado de factura](https://www.contapyme.com/conocimientocontapyme/080_IN/config_campos_obligatorios_factura.png)

💡 *Resultado:*  
Si el usuario intenta guardar la factura sin diligenciar un campo obligatorio, el sistema **no permitirá continuar** hasta completar la información.

#### Aplicar restricciones de edición (solo lectura)

Si necesitas evitar que ciertos datos sean modificados por el usuario:

1. Dentro de **Configurar operación**, ubica el campo deseado.  
2. Marca la opción **Solo lectura**.  
3. Guarda los cambios.

📌 *Ejemplo de uso:*  
- Bloquear la modificación de precios  
- Evitar cambios en la bodega  
- Restringir edición de valores totales

#### Configurar datos adicionales obligatorios

También puedes exigir información adicional personalizada en la factura.

📍 Ruta:  
**Campos de la operación > Datos de encabezado > Datos adicionales para la operación**

1. Selecciona el campo adicional (Valor 1, Valor 2, etc.).  
2. Activa las opciones **Visible** y **Requerido**.  
3. Si aplica, define una **lista de selección (autolista)** o un **valor por defecto**.  
4. Guarda la configuración.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración datos adicionales obligatorios en factura](https://www.contapyme.com/conocimientocontapyme/080_IN/config_datos_adicionales_factura.png)

💡 *Resultado:*  
El sistema solicitará estos datos antes de permitir guardar o finalizar la factura.

#### Alcance de la configuración

Las restricciones y campos obligatorios pueden configurarse para:

- **Todos los usuarios**
- **Un perfil específico**
- **Un usuario en particular**

Esto se define en la parte superior del asistente, en los campos:
**Empresa / Perfil / Usuario / Tipo de operación**.

📌 *Recomendación:*  
Usa configuraciones por **perfil o usuario** cuando existan roles con responsabilidades distintas.

#### Recomendaciones finales

✅ Define solo los campos realmente necesarios como obligatorios.  
✅ Usa datos adicionales para controles internos (zonas, proyectos, responsables, etc.).  
✅ Si necesitas validaciones más avanzadas, puedes solicitar un **tiquete de soporte** para acompañamiento especializado.

---

### ¿Cómo configurar medios de pago en una factura?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo configurar los medios de pago en una factura de venta?
- ¿Dónde se configuran las formas de pago de la factura?
- ¿Cómo configurar las formas de cobro en facturación y ventas?
- ¿Cómo definir efectivo, banco o cuenta por cobrar en la factura?
- ¿Dónde se asignan las cajas o bancos al facturar?
- ¿Cómo hacer que solo aparezcan ciertos medios de pago al facturar?
- ¿Cómo configurar la forma de pago por defecto en una factura?
- ¿Cómo dejar un medio de pago automático al crear la factura?
- ¿Dónde se define si una factura es de contado o a crédito?
- ¿Cómo configurar medios de pago por usuario o perfil en facturación?
- ¿Cómo limitar las formas de pago según el usuario que factura?
- ¿Cómo asociar las formas de pago a la operación de factura de venta?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme puedes configurar los **medios de pago** que se usarán en una **factura de venta**, definiendo **formas de cobro**, **cajas**, **bancos** y el **tipo de forma de pago por defecto**.  
Esta configuración se realiza **desde la operación**, y puede aplicarse **a todos los usuarios**, **por perfil** o **por usuario específico**, según la necesidad de control.

#### Ruta general en el sistema

📍 *Menú básico > Manejador de operaciones > Facturación y ventas > Operación > Configurar operación*

Desde allí se abre el **asistente de configuración de la operación**, donde se definen los medios de pago.

#### Configurar formas de cobro (cajas, bancos o CxC)

1. Ingresa a la operación de **Factura de venta**.  
2. Haz clic en **Operación > Configurar operación**.  
3. En el panel izquierdo, ve a:  
   **Liquidación y forma de cobro > Forma de cobro**.  
4. Define las **formas de cobro disponibles**, por ejemplo:  
   - Efectivo (Caja)  
   - Contado (Banco)  
   - Cuenta por cobrar  
5. Asocia cada forma de pago con su **cuenta contable** y **flujo de efectivo**, si aplica.  
6. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración forma de cobro en factura de venta](https://www.contapyme.com/conocimientocontapyme/080_IN/config_forma_cobro_factura.png)

💡 *Resultado:*  
Al facturar, el sistema mostrará solo los **medios de pago configurados**, evitando errores en el registro del recaudo.

#### Configurar la forma de pago por defecto

Si la mayoría de tus ventas se realizan con el mismo medio de pago (por ejemplo, **contado en caja**), puedes dejarlo configurado por defecto.

**Pasos:**

1. Dentro de **Configurar operación**, ingresa a:  
   **Liquidación y forma de cobro > Tipo de forma de pago (por defecto)**.  
2. Selecciona el tipo de pago (contado, crédito, tarjeta, bono, etc.).  
3. Guarda la configuración.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración tipo de forma de pago por defecto](https://www.contapyme.com/conocimientocontapyme/080_IN/config_tipo_forma_pago_defecto.png)

💡 *Resultado:*  
Al crear una nueva factura, el sistema asignará automáticamente el **valor total** al medio de pago definido.

#### Alcance de la configuración (muy importante)

La configuración de medios de pago puede aplicarse a:

- **Todos los usuarios**  
- **Un perfil específico**  
- **Un usuario en particular**

Esto se define en la parte superior del asistente de configuración, en los campos:
**Empresa / Perfil / Usuario / Tipo de operación**.

📌 **Recomendación:** 
Si necesitas reglas diferentes por usuario (ej. cajas distintas por vendedor), usa la configuración **por usuario**.

#### Recomendaciones finales

✅ Define primero las **cajas y bancos** en contabilidad antes de configurar la operación.  
✅ Usa forma de pago por defecto si el proceso de venta es repetitivo.  
✅ Si necesitas configuraciones avanzadas por rol o múltiples escenarios, puedes solicitar un **tiquete de soporte** para acompañamiento especializado.

#### 📌 Recursos adicionales

[Video: Inventarios Básico I](https://www.youtube.com/watch?v=ActUvoat4tw&t)  
[Video: Inventarios Básico II](https://www.youtube.com/watch?v=dErWn5fapzM&t)  

---

## Punto de Venta (POS)

### ¿Qué hacer si inicié el turno del día con una base de caja incorrecta?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Inicié el turno con una base de caja mal digitada, ¿cómo la corrijo?
- Abrí el turno del día con base equivocada, ¿qué puedo hacer?
- Me equivoqué al registrar la base de caja al iniciar turno.
- ¿Se puede cambiar la base del turno después de abrirlo?
- La base de caja quedó incorrecta y ya abrí el turno.
- Inicié el turno sin operaciones pero la base está mal, ¿cómo lo arreglo?
- Ya registré operaciones y la base del turno está mal, ¿qué hago?
- Mi base de caja esta mal ingresada

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si al **iniciar el turno del día** registraste una **base de caja incorrecta**, debes tener en cuenta que **la base no puede modificarse manualmente una vez el turno ha sido abierto**, ya que hace parte del control y la trazabilidad del turno.

La acción recomendada depende de si el turno **ya tiene operaciones registradas** o no:

#### 1) Si NO has registrado operaciones en el turno (recomendado)
1. **Cierra el turno** que quedó con la base incorrecta.
2. **Abre nuevamente el turno** y registra la **base correcta**.
3. Continúa con la operación normal.

✅ Este es el escenario más simple y seguro, porque no hay movimientos que conciliar.

#### 2) Si YA registraste operaciones en el turno
Cuando el turno ya tiene movimientos (ventas, recaudos, pagos, etc.), el ajuste requiere validar el caso para no afectar:
- Cuadres de caja
- Informes del POS
- Trazabilidad del turno

👉 En este escenario, se recomienda **crear un tiquete de soporte** para que un asesor te acompañe con el proceso según tu configuración y el estado del turno.

#### Recomendaciones antes de solicitar soporte
- Realiza el proceso con un **usuario Administrador** (o con permisos de POS/turnos).
- Ten a la mano: **fecha del turno**, **usuario/cajero**, **caja** y un resumen de si ya hubo operaciones.
- Evita repetir cierres/aperturas adicionales “probando”, para no generar más inconsistencias.

#### Recomendación final
Si aún no hay operaciones: **cierra y abre de nuevo con la base correcta**.  
Si ya hay operaciones: **crea un tiquete** para acompañamiento y corrección controlada del caso.

---

### ¿Por qué una factura no me aparece en el informe cuadre de caja?

CANONICAL_ID: PF_VENTAS_FACTURA_NO_APARECE_CUADRE_CAJA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.

- Tengo una factura pero no sale en el cuadre de caja.
- Registré una venta y no aparece en el informe.
- La factura del día no se refleja en el cuadre.
- No veo la factura en el reporte de caja.
- ¿Por qué el cuadre de caja no muestra una venta?

#### Respuesta:

**Descripción:**

Si una factura no aparece en el informe cuadre de caja, puede deberse a diferentes causas relacionadas con el procesamiento de la operación, la fecha registrada o la configuración del informe.

A continuación, te indicamos los puntos que debes verificar:

##### 1️⃣ Verificar que la operación esté PROCESADA

Si la factura no está procesada, la operación queda guardada, pero no afecta:

- Contabilidad  
- Inventarios  
- Informes  
- Cuadre de caja  

Por lo tanto, no se reflejará en el reporte.

📍 Validación:
Abrir el manejador de operaciones, buscar la factura y confirmar que esté en estado **Procesado**.

Si aparece como “Sin procesar”, debes procesarla.

##### 2️⃣ Verificar la fecha registrada en la factura

Puede ocurrir que:

- La factura fue creada con una fecha diferente.
- Se registró en otro día distinto al que se está consultando.
- Se modificó la fecha antes de procesarla.

📍 Validación:
Revisar el campo **Fecha** en la operación y confirmar que coincida con el rango del informe que estás generando.

##### 3️⃣ Revisar si el informe está filtrado por Fecha de Creación o Fecha de Soporte

Al generar el cuadre de caja, el sistema permite elegir cómo visualizar la información:

- Por **Fecha de creación**
- Por **Fecha de soporte**

Si la factura fue creada en una fecha diferente a la fecha del soporte y el informe está filtrado por fecha de creación, la operación no aparecerá en el día esperado.

En ese caso, se debe seleccionar la opción **Fecha de soporte** para que el informe refleje correctamente la factura.

La siguiente imagen corresponde a la opción mencionada en el informe:  
![Opción de visualización por fecha de creación o fecha de soporte en cuadre de caja](https://www.contapyme.com/conocimientocontapyme/080_IN/img_cuadre_caja_opcion_fecha_creacion_soporte.png)

#### Notas
Si después de validar los puntos anteriores la factura sigue sin aparecer en el cuadre de caja, se recomienda:

- Crear un tiquete de soporte adjuntando:
  - Número de factura
  - Fecha
  - Captura del informe generado
  - Captura de la operación

  ---
  
## Configuración de elementos de inventario

### ¿Cómo personalizar el manejo contable por elemento de inventario?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo puedo personalizar el manejo contable por elemento?
- ¿Cómo personalizar cuentas por elemento de inventario?
- ¿Cómo configurar cuentas contables diferentes para un producto?
- ¿Cómo hacer que un elemento de inventario tenga cuentas contables propias?
- ¿Dónde se activa la personalización contable por producto?
- ¿Cómo habilitar la opción personalizar cuentas e impuestos en un elemento?
- ¿Cómo cambiar la cuenta de inventario, ingresos o costo de ventas de un solo elemento?
- ¿Cómo asignar cuentas contables específicas a un producto?
- ¿Cómo configurar el manejo contable directamente en el elemento de inventario?
- ¿Cómo hacer para que un producto no tome las cuentas del grupo sino las propias?
- ¿Dónde se configuran las cuentas personalizadas de un elemento de inventario?
- ¿Cómo activar la pestaña para personalizar cuentas en un elemento?
- ¿Cómo personalizar inventario, ingresos, egresos y costo de ventas por elemento?
- ¿Cómo configurar impuestos y cuentas contables directamente en un producto?
- ¿Cómo dejar un elemento con manejo contable independiente?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, es posible personalizar el manejo contable de un **elemento de inventario** para que utilice cuentas específicas, diferentes a las configuradas en el **grupo de inventario** o en la **bodega**.

Esta opción es útil cuando un producto o servicio requiere un tratamiento contable particular y no conviene crear un grupo de inventario exclusivo solo para ese caso.

📌 **Importante:**  
Antes de configurar las cuentas directamente en el elemento, primero debe estar habilitada en el catálogo la opción que permite **personalizar cuentas por cada elemento de inventario**.

---

##### 1. Habilitar la personalización desde la configuración del catálogo de elementos

**Ruta para configurar:**  
`Inventarios → Catálogo de elementos de inventario → Configuración → Configuraciones generales → Personalización de cuentas`

**Pasos:**

1️⃣ Ingresa a **Inventarios**.  
2️⃣ Abre el **Catálogo de elementos de inventario**.  
3️⃣ Haz clic en **Configuración**.  
4️⃣ En el árbol de configuración, ubica la opción:  
   `Configuraciones generales → Personalización de cuentas`  
5️⃣ Activa la opción:  
   **“Permitir personalizar cuentas por cada elemento de inventario”**  
6️⃣ Haz clic en **Aceptar** para guardar los cambios.

📌 **Resultado:**  
Al activar esta opción, el sistema habilitará en cada elemento de inventario la casilla **“Personalizar cuentas e impuestos”**, permitiendo definir cuentas propias para ese producto.

La siguiente imagen corresponde a la opción mencionada en el informe:  
![Configuración para permitir personalizar cuentas por cada elemento de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/img_inventarios_personalizacion_cuentas_configuracion_catalogo.png)

---

##### 2. Activar la personalización en el elemento de inventario

**🧭 Ruta:**  
`Inventarios → Catálogo de elementos de inventario → Modificar elemento`

**Pasos:**

1️⃣ Ubica el elemento de inventario que deseas configurar.  
2️⃣ Haz clic en **Modificar**.  
3️⃣ En la ficha del elemento, marca la opción:  
   **“Personalizar cuentas e impuestos”**  
4️⃣ Ingresa a la pestaña **Manejo contable**.

📌 **Resultado:**  
Al activar esta casilla, el sistema permitirá configurar cuentas e impuestos directamente en ese elemento.

La siguiente imagen corresponde a la opción mencionada en el informe:  
![Opción para activar personalizar cuentas e impuestos en el elemento de inventario](https://www.contapyme.com/conocimientocontapyme/080_IN/img_inventarios_personalizar_cuentas_impuestos_elemento.png)

---

##### 3. Configurar las cuentas contables del elemento

Dentro de la pestaña **Manejo contable**, podrás definir de forma independiente las cuentas del producto, según aplique.

**Opciones que se pueden personalizar:**

- **Inventario**
- **Ingresos**
- **Egresos**
- **Costo de ventas**
- **Devolución ventas**
- **Devolución compras**
- **Impuesto ventas**
- **Impuesto compras**

📌 **Comportamiento del sistema:**  
Cuando el elemento tenga cuentas personalizadas activas, el sistema utilizará esas cuentas al procesar transacciones como **ventas, consumos, devoluciones y movimientos de inventario**.  
Si no se personalizan, el sistema tomará las cuentas definidas en el **grupo de inventario** o en la **bodega**, según la configuración general.

#### Recomendaciones

- ✅ Utiliza esta opción solo cuando el producto requiera un manejo contable especial.  
- ✅ Si varios productos comparten el mismo tratamiento contable, es mejor configurarlo desde el **grupo de inventario**.  
- ✅ Verifica después de guardar que el elemento tenga correctamente asignadas las cuentas en cada sección requerida.  
- ✅ Revisa también la configuración de impuestos si el producto necesita un comportamiento distinto al de su grupo.

#### Observación importante

La personalización por elemento no reemplaza la configuración general del inventario; simplemente le da prioridad a la configuración específica del producto cuando esta se encuentra activa.

---

### ¿Cómo funciona la consulta de trazabilidad de producto en ContaPyme?

CANONICAL_ID: INV_TRAZABILIDAD_PRODUCTO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.

- ¿Cómo rastrear un producto por lotes en ContaPyme?
- ¿Cómo ver la trazabilidad de un producto?
- ¿Cómo saber de qué lote proviene un producto vendido?
- ¿Cómo identificar materias primas usadas en producción?
- ¿Cómo consultar la trazabilidad para cumplir con INVIMA?
- ¿Cómo ver a qué clientes se vendió un lote específico?
- ¿Cómo saber qué proveedor suministró un lote?

#### Respuesta:

En ContaPyme, la **consulta de trazabilidad de producto** es un informe que permite rastrear un producto a través de toda su cadena: **compra, producción y venta**, garantizando control, calidad y cumplimiento de normativas como las del INVIMA.

Esta funcionalidad permite identificar el origen y destino de los productos por **lotes**, lo cual es clave para control sanitario y toma de decisiones.

#### 🎯 ¿Para qué sirve la trazabilidad?

Con esta consulta puedes:

- ✔ Rastrear un producto terminado hasta sus insumos originales  
- ✔ Identificar los lotes de materias primas utilizados en producción  
- ✔ Saber qué clientes recibieron un producto de un lote específico  
- ✔ Conocer a qué proveedores se compró un lote  
- ✔ Cumplir con requisitos de trazabilidad (ej. INVIMA)  
- ✔ Actuar rápidamente ante alertas sanitarias  

#### 🏥 Importancia (INVIMA)

La trazabilidad permite:

- Proteger la **salud pública**  
- Inmovilizar o retirar productos del mercado si es necesario  
- Tener control documental de toda la cadena productiva  

Esto se logra mediante:

- Registro de materias primas  
- Seguimiento en producción  
- Control en distribución  

#### 📂 ¿Dónde se encuentra esta consulta?

📍 Ruta:  
`Inventarios → Informes → Inventarios → Series y lotes → Consulta de trazabilidad de producto`

#### ⚙️ ¿Cómo usar la consulta de trazabilidad?  

Al ingresar, el sistema te mostrará un asistente donde debes indicar:  

1. Tipo de documento:  
   - Compra (para ver hacia adelante)  
   - Venta (para analizar desde el resultado final)  

2. Número del documento (factura)  

3. Producto a consultar  

4. Lote específico  

5. Clic en **Aceptar**  

#### 📊 ¿Cómo se muestra la información?  

📌 **Regla clave:**  
El informe **siempre se organiza desde la compra (origen) hasta la venta (destino)**, sin importar desde dónde hagas la consulta.  

✔ Si consultas desde una **venta**, el sistema internamente parte desde ese punto, pero el resultado final mostrará todo el historial comenzando por la compra.  

El reporte incluye:  

1. 🧾 **Compra de materias primas** (proveedor, lote, cantidad)  
2. 🏭 **Consumos en producción** (qué insumos se usaron, de qué lote y cuánto)  
3. 📦 **Ingreso del producto terminado al inventario**  
4. 🧾 **Venta del producto final** (cliente, lote y cantidad)  

#### 🧪 Ejemplo práctico sencillo  

Supongamos:  

- Compras:  
  - Insumo A (Lote 12A – 50 und)  
  - Insumo B (Lote 34B – 70 und)  
  - Insumo C (Lote 56C – 60 und)  

- Producción:  
  - Orden #1 produce 100 unidades del Producto X  
  - Consumos:  
    - A: 20 und  
    - B: 30 und  
    - C: 40 und  

- Resultado:  
  - Se embodegan 100 unidades del Producto X  
  - Se venden las 100 unidades  

📌 Al generar la consulta, verás toda la trazabilidad:  
Compra → Consumos → Producción → Inventario → Venta  

#### ⚠️ Importante  

- La trazabilidad depende del **manejo correcto de lotes**  
- Si no se registran lotes, el informe no será completo  
- La información proviene directamente de los documentos registrados en el sistema  

#### 💡 Recomendaciones  

- ✅ Registrar siempre **lotes en compras y producción**  
- ✅ Usar correctamente las órdenes de producción  
- ✅ Verificar que los consumos estén bien relacionados  
- 📌 Ideal para empresas de alimentos, manufactura o control sanitario  

#### 🧾 ¿Por qué es importante la trazabilidad?  

Permite:  

- Proteger la salud pública  
- Retirar productos del mercado si es necesario  
- Tener control total del producto  
- Cumplir con normativas sanitarias  

#### 📌 Conclusión  

Este informe te permite tener una **visión completa del recorrido de un producto**, desde su origen hasta su venta final, facilitando el control, la toma de decisiones y el cumplimiento normativo.  

---
