# pf_inventarios.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **inventarios**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/11/14

# Inventarios  

## Compras y Devoluciones

### ¿Por qué no se muestran órdenes de compra al ingresar factura?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo procesar una orden de compra que está pendiente?
- ¿Qué hago si la orden de compra aparece, pero no permite seleccionarla?
- ¿Cómo revisar si la factura quedó vinculada correctamente a la orden de compra?
- ¿Qué pasa si la fecha de la factura es anterior a la de la orden de compra?
- ¿Cómo corregir la fecha en una orden de compra o en una factura?
- ¿Cómo consultar todas las órdenes de compra disponibles de un proveedor?
- ¿Qué hacer si la orden está procesada pero aún no se muestra en la factura?
- ¿Cómo revisar el historial o trazabilidad de una orden de compra?
- ¿Cómo configurar que todas las facturas de compra usen órdenes por defecto?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Cuando registras una factura de compra puedes vincularla a una **orden de compra previamente generada**, lo que permite mantener trazabilidad entre lo solicitado al proveedor y lo que finalmente se factura. Si al ingresar la factura no aparecen órdenes de compra para seleccionar, revisa los siguientes puntos:

1. **La orden de compra y la factura deben tener el mismo proveedor:** En la operación de factura de compra ingresa a: ***Cinta de opciones > Opciones > Registrar compras según… > Selecciona la opción:Órdenes de compra*** Esto habilitará la búsqueda y vinculación de órdenes registradas.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración registrar compras según en la factura de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/registrar_compra_orc.png)

2. **Verifica que el proveedor sea el mismo de la orden de compra:** La factura solo podrá ver órdenes registradas con el mismo proveedor. Si el proveedor no coincide, la orden no aparecerá como disponible.

Puedes verificar esto abriendo cada documento y comparando el tercero seleccionado.

3. **La orden de compra debe estar procesada y con fecha válida:** Las órdenes solo aparecerán cuando:

✔ Con estado Procesada.

✔ Con fecha igual o anterior a la fecha de la factura de compra.

¿Cómo validarlo? Ruta: ***Menú básico > Manejador de operaciones > Ubuicar la orden de compra > Verificar fecha y estado “Procesada”***

Si la orden de compra no ha sido procesada o su fecha es posterior a la factura, no aparecerá para vinculación.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación proveedor, fecha y proceso de orden de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/orc_fc_verif_fecha.png)

---

### ¿Cómo consultar el stock restante en movimientos de órdenes de compras?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué puedo hacer si el saldo de la orden de compra no coincide con lo que ya facturé?
- ¿Cómo saber si una orden de compra ya se utilizó por completo?
- ¿Cómo ver en qué facturas se ha utilizado una orden de compra?
- ¿Puedo usar la misma orden de compra para varias facturas de compra?
- Si no facturé todo lo que pedí en la orden de compra, ¿puedo usar el saldo en otra factura después?
- ¿Qué significa cuando una orden de compra muestra cantidades pendientes por facturar?
- ¿Cómo consultar el detalle de productos que todavía no se han facturado dentro de una orden de compra?
- ¿Qué puedo hacer si al facturar un producto no se descuenta del saldo de la orden?
- ¿Dónde puedo verificar si una orden de compra está activa o ya terminada?
- ¿Puedo modificar una orden de compra después de comenzar a facturarla?
- ¿Cómo exportar el informe de estado de órdenes de compra para entregarlo o analizarlo?
- ¿Cómo filtrar el informe para ver sólo las órdenes que aún tienen saldos pendientes?
- ¿Qué reporte puedo usar si necesito ver todas las órdenes de compra generadas a un mismo proveedor?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Cuando generas una **orden de compra** y posteriormente la utilizas como referencia en una **factura de compra**, el sistema cruza automáticamente las cantidades solicitadas con las cantidades facturadas. Esto permite que, si una orden no se factura completamente, el saldo restante pueda: **consultarse, utilizarse en futuras facturas y mantener trazabilidad entre lo solicitado y lo recibido.**

Sigue esta ruta: ***Menú Inventarios > Movimientos > Estado de órdenes de compra (a proveedores).*** 

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo ruta para generar el informe de órdenes de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_estado_orc.png)

Al generar este informe encontrarás columnas como:

**Número de documento:** Consecutivo asignado a la orden de compra.

**Fecha documento:** Fecha en la que se creó la orden.

**Producto:** Artículo solicitado en la orden.

**Ordenado:** Cantidad total solicitada al proveedor.

**Facturado:** Cantidad que ya se ha usado en una o varias facturas de compra.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo informe estado de órdenes de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/saldo_orc_estadoorc.png)

*Con esta información podrás analizar el estado de cada orden y ver claramente cuánto falta por facturar.*

Adicional el sistema de manera automática cuando uses como referencia una orden de compra que ya fue facturada parcialmente, te cargará por defecto lo pendiente mostrando el siguiente mensaje informativo:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo mensaje verificación cargue de productos restantes en factura de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/informacion_cargueprod_orc.png)

---

### ¿Cómo ingresar una factura de compra con artículos de regalo?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Debo crear un tipo especial de producto para registrar obsequios o regalos?
- ¿Qué pasa si el proveedor factura el regalo con valor pero quiere que quede como bonificación?
- ¿Puedo incluir productos de obsequio en el mismo documento de compra sin afectar los impuestos?
- ¿Cómo consulto luego qué productos ingresaron como obsequio en una compra?
- ¿Se pueden registrar productos de regalo con centro de costos diferente al resto de la compra?
- ¿Es posible cambiar después el costo de un producto registrado como obsequio?
- ¿Cómo registro la bonificación si el proveedor la entrega por fuera de la factura?
- ¿Se puede configurar el sistema para que detecte automáticamente productos con costo cero o descuento 100%?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Cuando en una factura de compra se incluyen productos entregados por el proveedor como **obsequio o regalo**, puedes registrarlos sin afectar el valor final a pagar. Para hacerlo, el sistema ofrece dos alternativas:

1. **Registrar el producto con descuento del 100%:** 

- Ingresa a la operación de compra.
- Registra el producto con su valor normal.
- En la columna % descuento, asigna 100%.

**Esto hará que el producto tenga costo individual, pero su valor total en la factura se reduzca a $0, sin afectar el valor final a pagar.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo factura de compra con producto 100% descuento:](https://www.contapyme.com/conocimientocontapyme/080_IN/descuento_fc.png)

2. **Registrar el producto con costo cero:** 

- Registra el artículo normalmente en la factura.
- Asigna la cantidad correspondiente, pero deja el costo en cero.

**De esta forma, no altera los totales de la factura y el sistema reconocerá que fue recibido sin valor.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo factura de compra con artículo costo cero:](https://www.contapyme.com/conocimientocontapyme/080_IN/prod_costocero_fc.png)

---

### ¿Cómo anular o modificar una compra ya registrada?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué diferencia hay entre anular y modificar una factura de compra?
- ¿Puedo recuperar una factura anulada para volver a activarla?
- ¿Cómo saber si una factura de compra ya fue anulada?
- ¿Por qué no aparece la opción de modificar o anular una compra?
- ¿Cómo corregir una factura si ya fue usada como referencia en otro documento?
- ¿Se puede modificar la fecha de una factura después de registrada?
- ¿Cómo afecta una anulación en los informes de compras del mes?
- ¿Cuál es el impacto contable de anular una factura procesada?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Una factura de compra ya registrada puede ser modificada o anulada, dependiendo de la necesidad. A continuación se explica cada proceso y sus consideraciones.

- **Modificar factura de compra:** La modificación permite editar datos previamente registrados como:

- Productos.
- Valores y totales.
- Formas de pago.
- Cantidades.
- Otros datos del documento.

⚠️ **Importante:**
Cualquier cambio puede afectar movimientos ya generados en inventarios o contabilidad.

Para modificar una factura de compra: ***Menú básico > Manejador de operaciones > Ubicar la factura de compra y presionar clic derecho - Modificar o CONTROL+M como botón rápido.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo modificar factura de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/modificar_fc.png)

- **Anular factura de compra:** La anulación deja el documento como inactivo, evitando que siga afectando contabilidad o inventarios, sin eliminarlo del historial. El documento quedará en color **gris**, indicando que ya no participa en informes ni cálculos del sistema.

Para anular una factura de compra: ***Menú básico > Manejador de operaciones > Ubicar la factura de compra y seleccionar en el menú de operación - Anular.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo anular factura de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/anular_fc.png)

**Recomendaciones:**

- Verificar que los cambios no afecten registros ya procesados.
- Confirmar que el usuario que ejecutará la modificación o anulación cuente con permisos habilitados.
- Revisar el impacto posterior en informes y balances antes de finalizar el cambio.

---

### ¿Qué hacer cuando una devolución de compras afecta valores distintos?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué el costo promedio cambia después de una devolución en compras?
- ¿Cómo saber qué costo usó el sistema para la devolución?
- ¿Puedo evitar que el costo promedio se ajuste automáticamente?
- ¿Cómo identificar en la contabilización cuál fue el ajuste aplicado?
- ¿Cómo verificar qué cuenta está configurada para devoluciones en compras?
- ¿Qué pasa si la cuenta de devolución en compras no está configurada?
- ¿Puedo personalizar la cuenta de devolución para un producto específico?
- ¿Por qué dos devoluciones del mismo producto afectan valores distintos?
- ¿Cómo actualizo el costo si veo que no coincide con mis cálculos?
- ¿Por qué el movimiento contable de una devolución no coincide con el valor visualizado en la operación?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Si a lo que te refieres es que al registrar una devolución en compras los valores contables son distintos a los registrados en la operación, esto puede deberse a un ajuste automático generado por el sistema debido al método de valoración de inventarios.

**¿Por qué ocurre esto?**
El software utiliza el método de **Costo Promedio Ponderado** para valorar inventarios. Esto significa que: 

- Cada entrada de inventario (compras,ajustes, etc.) y cada salida (ventas, consumos, devoluciones, etc.) puede modificar el costo promedio del producto.
- Cuando haces una devolución en compras, el sistema compara:

   - El costo con el que fue comprada la mercancía inicialmente.

   - El costo con el que se está registrando la devolución.

Si **estos valores no coinciden**, el sistema realiza un ajuste automático para corregir el costo promedio.

**¿Qué cuenta se afecta?** El ajuste contable se registrará en la cuenta configurada para **devoluciones en compras**, la cual puede estar definida según lo requieras:

- En la bodega. ***Menú inventarios > Bodegas > Modificar > Manejo contable > Devolución en compras***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo cuenta devolución en compras en bodega:](https://www.contapyme.com/conocimientocontapyme/080_IN/cuenta_devcompras_bod.png)

- En el grupo de inventarios. ***Menú inventarios > Grupos de inventario > Modificar > Personalizar cuentas configuradas en la bodega > Personalizar cuentas bodega > Devolución en compras***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo cuenta devolución en compras en grupo de inventarios:](https://www.contapyme.com/conocimientocontapyme/080_IN/cuenta_devcomp_grupo.png)

- En el elemento (producto). ***Menú inventarios > Elementos de inventario > Modificar > Personalizar cuentas e impuestos > Manejo contable > Devolución en compras***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo cuenta devolución en compras en producto:](https://www.contapyme.com/conocimientocontapyme/080_IN/cuenta_devcomp_prod.png)

Generalmente, la cuenta utilizada es: 6225001 – (Devolución en compras) pero también puede ser: 5395 – Gastos diversos, u otra dependiendo de la configuración o la cuenta requerida por la empresa.

Estas cuentas se afectan automáticamente cuando registras la devolución.

**Ejemplo**

La empresa ABC realiza una compra de 200 estuches para CD por valor de $500 c/u.

| Cuenta | Nombre | Débito | Crédito |
|---|---|---|---|
| 1435 | Mercancías no fabricadas por la empresa | $100.000 |  |
| 2205 | Proveedores nacionales |  | $100.000 |


Posteriormente se devuelven 50 estuches que estaban en mal estado. Estos estuches son reconocidos por el proveedor a $ 450 c/u ya que el proveedor alega mal almacenamiento por parte de la empresa. 

En este caso al presentarse diferencia entre el costo de la compra y el costo de la devolución, se debita la cuenta por el valor correspondiente a las cantidades devueltas (50 Unid) por la diferencia en el costo ($ 50). 

| Cuenta | Nombre | Débito | Crédito |
|---|---|---|---|
| 1435 | Mercancías no fabricadas por la empresa |  | $25.000 |
| 6225 | Devolución en compras | $2.500 |  |
| 2205 | Proveedores nacionales | $22.500 |  |

- Si la devolución de elementos se realiza por el mismo costo indicado en la compra, la cuenta no se afecta. 

- Si la devolución se realiza por un costo menor al indicado en la compra, la cuenta se debita y si el costo de la devolución es mayor al de la compra, la cuenta se acredita. 

* Si necesitas más información solicita un tiquete de soporte en la parte inferior de la caja de preguntas presionando sobre el **ícono del teléfono color verde.**
 
---

### ¿Cómo registrar una factura de compra con IVA correctamente?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo sé si el IVA está configurado correctamente en el sistema?
- ¿Dónde se configura el IVA en el artículo, grupo de inventario o bodega?
- ¿Cómo verifico si el proveedor está marcado como responsable del IVA?
- ¿Por qué no se está calculando el IVA en la factura si ya configuré el artículo?
- ¿Puedo registrar el IVA manualmente si no se genera automáticamente?
- ¿Qué pasa si un producto no causa IVA?
- ¿Qué sucede si el proveedor no tiene configurada la responsabilidad RC?
- ¿Cómo calcular el IVA automáticamente al generar la factura de compra?
- El sistema no me permite ingresar el IVA en las compras
- No calcula el iva en compras

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 En ContaPyme es posible hacer que los impuestos aplicables en las compras, como el IVA, se calculen de manera automática. Para asegurar que el registro de la factura se realice correctamente, debes tener en cuenta las siguientes configuraciones:

1. **Configurar el IVA en compras:** Verifica que el impuesto esté definido para el artículo a través de cualquiera de estas opciones:

- En el grupo de inventario. ***Menú inventarios > Grupos de inventario > Modificar > Manejo contable > Impuestos compras***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo impuestos en compras en grupo de inventario:](https://www.contapyme.com/conocimientocontapyme/080_IN/imp_com_grupo.png)

- En el elemento (producto). ***Menú inventarios > Elementos de inventario > Modificar > Personalizar cuentas e impuestos > Manejo contable > Impuestos compras***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo impuestos en compras en personalizado en elemento:](https://www.contapyme.com/conocimientocontapyme/080_IN/imp_com_prod.png)

2. **Verificar la clasificación tributaria:** El proveedor debe tener registrada la responsabilidad *RC – Responsable de impuesto a las ventas.* ***Menú básico > Terceros > Buscar proveedor - Modificar > Abrir formulario completo > Clasificación tributaria > Clasificación***

Si esta condición no está configurada, el IVA no se aplicará en el documento.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración clasificación tributaria del proveedor con IVA:](https://www.contapyme.com/conocimientocontapyme/080_IN/clasificacion_tribu_proveedor.png)

***Si no eres responsable de IVA y necesitas manejar este impuesto como un mayor valor al costo del producto debes configurar a nivel de grupo de inventario o elemento para que se calcule y se asigne como IVA MAYOR VALOR, así:***

- En el grupo de inventario. ***Menú inventarios > Grupos de inventario > Modificar > Manejo contable > Impuestos compras > Activar opción IVA como mayor valor***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo impuestos en compras en grupo de inventario:](https://www.contapyme.com/conocimientocontapyme/080_IN/iva_mayorvalor_grupo.png)

- En el elemento (producto). ***Menú inventarios > Elementos de inventario > Modificar > Personalizar cuentas e impuestos > Manejo contable > Impuestos compras > Activar opción IVA como mayor valor***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo impuestos en compras en personalizado en elemento:](https://www.contapyme.com/conocimientocontapyme/080_IN/iva_mayorvalor_elemento.png)

Una vez realizadas estas validaciones, al cargar el proveedor y seleccionar el producto en la factura de compra, el sistema calculará automáticamente el IVA correspondiente, facilitando y agilizando el proceso de registro.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo factura de compra con IVA descontable:](https://www.contapyme.com/conocimientocontapyme/080_IN/fc_coniva.png)


---

### ¿Por qué al ingresar factura no llama la recepción de materiales?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué es una recepción de materiales y para qué sirve en ContaPyme?
- ¿Por qué es necesario vincular la factura con la recepción de materiales?
- ¿Dónde se activa la opción “Registrar compras según recepciones de materiales”?
- ¿Qué pasa si la factura no tiene activada esa opción?
- ¿Cómo verifico si el proveedor es el mismo en ambos documentos?
- ¿Qué sucede si la recepción de materiales está asociada a otro proveedor?
- ¿Qué pasa si la recepción no se ha procesado aún?
- ¿Por qué la factura no muestra recepción si la fecha es anterior?
- ¿Puedo cambiar la fecha de la factura o de la recepción si no coinciden?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Cuando registras una factura de compra puedes relacionarla con una **recepción de materiales** previamente creada. Esta vinculación permite controlar qué mercancía fue recibida y cuál ya fue facturada.
Si al crear la factura no aparecen recepciones para seleccionar, revisa lo siguiente:

1. **La factura debe estar configurada para usar recepciones de materiales:** Es necesario que la operación de factura esté habilitada para registrar compras basadas en recepciones.
¿Dónde activarlo? En la factura de compra ingresa a: ***Cinta de opciones > Opciones > Registrar compras según… > Recepción de materiales***

Si esta opción no está activa, el sistema no buscará recepciones disponibles.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración registrar compras según recepción de materiales:](https://www.contapyme.com/conocimientocontapyme/080_IN/registrar_compra_rmp.png)

2. **El proveedor debe ser el mismo en ambos documentos:** La recepción de materiales y la factura deben estar registradas con el mismo proveedor. Si el proveedor no coincide, el sistema no permitirá vincular la recepción. Puedes verificar esto abriendo cada documento y comprobando el tercero seleccionado.

3. **La recepción debe estar procesada y la fecha debe ser válida:** El sistema solo mostrará recepciones:

✔ Con estado Procesada.

✔ Con fecha igual o anterior a la fecha de la factura de compra.

Si la recepción no ha sido procesada o su fecha es posterior a la factura, no aparecerá para vinculación.

¿Cómo validar esto?
Ruta: ***Menú básico > Manejador de operaciones > Ubicar la de recepción de materiales > Verificar fecha y estado “Procesada”***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación proveedor, fecha y proceso de orden de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/rmp_fc_verif_fecha.png)


---

### ¿Cómo registrar una devolución en compra?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿La devolución en compras afecta el inventario automáticamente?
- ¿Qué pasa si la devolución es solo parcial y no incluye todos los productos de la factura?
- ¿Puedo hacer una devolución en compras sin asociarla a una factura previa?
- ¿La devolución en compras disminuye automáticamente el saldo pendiente del proveedor?
- ¿Qué pasa si el usuario selecciona una factura que ya está totalmente devuelta?
- ¿Cómo controlar que solo se devuelvan cantidades disponibles en inventario?
- ¿La devolución genera algún documento soporte imprimible para entregar al proveedor?
- como hacer una nota crédito en compras
- tengo que hacer una nota crédito a una compra
- ¿Cómo hacer una devolución en compras?
- ¿Cómo registrar una devolución a un proveedor?
- ¿Cómo hacer una nota crédito de compras?
- Necesito hacer una devolución de compra, ¿cómo lo hago?
- ¿Cómo devolver productos a un proveedor en el sistema?
- ¿Cómo registrar una nota crédito en compras?
- ¿Cómo hacer una devolución parcial de una compra?
- ¿Cómo devolver productos de una factura de compra?
- ¿Cómo anular o devolver una compra en ContaPyme?
- ¿Cómo registrar productos devueltos al proveedor?
- ¿Cómo hacer una devolución de mercancía a proveedor?
- ¿Cómo aplicar una devolución a una factura de compra?
- ¿Cómo registrar una devolución sin factura de compra?
- Tengo que hacer una nota crédito a una compra, ¿cómo lo hago?


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 La devolución en compras permite registrar la entrega al proveedor de productos que presentaron alguna novedad o no fueron recibidos a satisfacción. Al realizar este documento, el sistema genera los movimientos de:

- Inventario (salida del producto).

- Contabilidad.

- Cartera/proveedores.

Esto asegura trazabilidad entre lo facturado, lo recibido y lo devuelto.

🔹 **Ruta para crear una devolución en compras:**

**Menú básico > Manejador de operaciones > + Operaciones > Compras > Devolución en compras.*

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación proveedor, fecha y proceso de orden de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/operacion_dev_compras.png)

🔹 **Registro de la devolución:**

1. Selecciona el proveedor al que aplicarás la nota de devolución.
2. Ubica el cursor en la casilla Referencia y elige la factura de compra asociada a la devolución o vacío si no aplica (Deberás digitar la información manualmente).
Al seleccionarla, el sistema cargará automáticamente los productos registrados en dicha factura.
3. Ajusta las cantidades o valores si la devolución es parcial.
4. (Opcional) Digita un motivo de devolución para dejar trazabilidad clara.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo verificación proveedor, fecha y proceso de orden de compra:](https://www.contapyme.com/conocimientocontapyme/080_IN/reg_dev_compras.png)

✔ Resultado

Una vez guardado el documento:

- El sistema ajusta existencias retirando los artículos devueltos.
- Se genera el movimiento contable correspondiente.
- Si la factura tenía saldo pendiente, se amortiza automáticamente.

#### 📌 Recursos adicionales  
▶️ **Video:**  
[Inventarios Básico II – Incluye operación devolución en compras](https://www.youtube.com/watch?v=dErWn5fapzM&t=1012s) 

---

## Inventario

### ¿Por qué el sistema no permite procesar ventas debido a costo promedio negativo?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- No procesa por costo negativo.
- Al hacer la factura me dice que el costo es negativo y no procesa.
- No deja procesar la operación porque indica que hay costo negativo.
- ¿Por qué el sistema no permite procesar ventas debido a costo promedio negativo?
- ¿Qué significa que un producto tenga costo promedio negativo?
- ¿Qué operaciones pueden generar un costo promedio negativo?
- ¿Qué debo revisar antes de ejecutar un recosteo de inventarios?
- ¿Por qué al modificar una factura de compra cambia el costo promedio del inventario?
- ¿Cómo evitar que el costo promedio vuelva a quedar negativo en el futuro?
- ¿Un ajuste de inventario puede causar costo negativo? ¿Cómo identificarlo?
- ¿Qué pasa con las ventas que intenté procesar cuando el costo era negativo?
- ¿Por qué al anular una compra cambia el costo promedio de un producto?
- Tengo un producto que no permite realizar el recosteo
- El costo aparece en cero
- tengo un problema de costo promedio ponderado de un producto

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 El sistema utiliza el método de **Costo Promedio Ponderado** para valorar los inventarios. Esto implica que el costo promedio del producto puede variar constantemente según los movimientos registrados.

- **Entradas:** compras, ajustes positivos, devoluciones en ventas, etc.

- **Salidas:** ventas, consumos, devoluciones en compras, etc.

Cuando registras una salida (por ejemplo, una venta), el sistema utiliza el **costo promedio** vigente en ese momento para calcular el costo del producto.

⚠️ **¿Cuándo se genera un costo promedio negativo?** El costo promedio puede volverse negativo cuando ocurre alguna de las siguientes situaciones:

- Se modifica el costo de una compra o entrada después de haber procesado ventas o salidas relacionadas.

- Se registran ajustes de inventario incorrectos, ya sea en cantidades o valores.

- Se elimina o anula una operación que influía en el costo promedio sin reprocesar operaciones posteriormente.

🛠️ **¿Cómo solucionarlo?** La solución recomendada es ejecutar el **Recosteo de Inventarios**, un proceso que permite:

- Recalcular los costos promedios reales.

- Ordenar nuevamente las entradas y salidas según su secuencia cronológica.

- Corregir inconsistencias generadas por modificaciones o eliminaciones de documentos.

Puedes ejecutar el recosteo por: Día - Semana - Mes o un período específico, según lo necesites.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo recosteo de inventarios:](https://www.contapyme.com/conocimientocontapyme/080_IN/recosteo_inv.png)

*Después de realizar el recosteo en los periodos necesarios, verifica que los costos se hayan estabilizado. Si el costo negativo persiste, te sugerimos generar un tiquete para que nuestro equipo de soporte pueda revisar el caso.*

---

## Reportes y Consultas

### ¿Cómo activar la funcionalidad de cuadre de caja para todos los usuarios?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Solicito apoyo para revisar la facturación POS y la configuración del cierre de caja
- ¿Cómo activar la funcionalidad de cuadre de caja para todos los usuarios?
- ¿Para qué sirve el cuadre de caja dentro del sistema?
- ¿Por qué es necesario configurar a cada usuario como cajero para usar esta función?
- ¿Qué sucede si un usuario no tiene activada la opción "Este usuario requiere control de caja"?
- ¿El sistema permite iniciar un turno sin registrar el valor base?
¿Qué tipo de movimientos captura el cuadre de caja durante el turno?
¿Se puede generar el cuadre de caja por usuario o también por punto de venta?
¿El sistema permite abrir varios turnos de caja en un mismo día para un mismo usuario?
¿Qué permisos adicionales necesita un usuario para generar el informe de cuadre de caja?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 El **cuadre de caja** es un informe que **permite visualizar los ingresos y salidas de dinero realizados durante un turno de caja**. Para que esta información se registre correctamente, los usuarios **deben** estar configurados como cajeros, ya que esto habilita el control de:

- Inicio de turno (registro del valor base)

- Cierre de turno (resumen de movimientos realizados)

A continuación, te explicamos cómo activar esta funcionalidad:

1. **Activar la configuración de cajero en cada usuario:** Dirígete a: ***Menú básico > Usuarios > Modificar usuario > Definición - General > Activar la opción "Este usuario requiere control de caja".***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo activar usuario modo cajero:](https://www.contapyme.com/conocimientocontapyme/080_IN/activar_usuario_cajero.png)

2. **Registro del inicio de turno:**  Una vez configurado el usuario, al iniciar sesión el sistema solicitará registrar el valor base para iniciar su turno:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo inicio turno usuario modo cajero:](https://www.contapyme.com/conocimientocontapyme/080_IN/inicio_turno.png)

3. **Generar el informe de cuadre de caja:** Con la información registrada en cada turno (inicio y cierre), podrás generar el informe siguiendo la ruta: ***Menú inventarios > Ventas > Cuadre de caja > Informe de cuadre de caja (Formato tirilla o general).***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo ruta para generar informe de cuadre de caja diario:](https://www.contapyme.com/conocimientocontapyme/080_IN/informe_cuadrecaja.png)

---

## Configuración y Parametrización

### ¿Por qué el sistema no permite modificar los componentes de los elementos compuestos?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- No me permite modificar los elementos compuestos
- ¿Qué tipo de datos del elemento compuesto quedan bloqueados cuando hay operaciones procesadas?
- ¿Qué riesgos existen al modificar los componentes de un elemento compuesto?
- ¿Puedo editar los componentes si ya hice ventas o bodegas con ese producto?
- ¿Qué sucede si modifico un elemento compuesto y luego ejecuto un recosteo?
- ¿Es recomendable desactivar la verificación de elementos compuestos?
- ¿La modificación de los componentes afecta únicamente el inventario o también la contabilidad?
- ¿Qué diferencia hay entre un elemento compuesto y un kit armado en inventario?
- ¿Puedo cambiar la composición del producto sin afectar el inventario histórico?
- ¿El sistema alerta antes de reprocesar operaciones si hay cambios en un elemento compuesto?
- ¿Es posible reportar o listar todos los elementos compuestos configurados en el sistema?
- ¿Qué buenas prácticas se recomiendan antes de editar elementos compuestos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 El sistema bloquea automáticamente la edición de ciertos datos de un elemento compuesto cuando detecta que existen operaciones procesadas (ventas, compras, bodegas, ajustes, etc.) que incluyen dicho elemento. Esto se hace para evitar inconsistencias, ya que modificar los componentes y luego reprocesar operaciones o ejecutar un recosteo puede alterar los saldos de inventario y el costeo de los productos.

Si necesitas habilitar la edición, puedes hacerlo desde la siguiente ruta: ***Menú inventarios > Elementos de inventario > Configuración avanzada > Verificación de elementos de inventario compuestos.***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración para edición de elementos compuestos:](https://www.contapyme.com/conocimientocontapyme/080_IN/bloqueo_edicion_comp.png)

**Importante**
Si desactivas esta verificación, el sistema permitirá modificar los componentes de los elementos compuestos.
Sin embargo, ten en cuenta que esta acción puede afectar los saldos y el costeo si posteriormente se modifican datos, se reprocesan operaciones o se realiza un recosteo de inventarios.

---

## Reportes y consultas

### ¿Por qué el reporte de ventas no muestra el documento de factura electrónica?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Al generar el reporte de ventas por factura electrónica, la opción no aparece activa
- ¿Qué pasa si el documento soporte no tiene definida ninguna operación en “Aplica a”?
- ¿Las facturas electrónicas antiguas aparecerán en el reporte después de configurar “Aplica a”?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Para que las **facturas electrónicas** generadas aparezcan correctamente en los reportes de ventas, es indispensable que el documento soporte asociado esté configurado para **aplicar a las operaciones de factura de venta.** Si esta configuración no está definida, el sistema no relacionará las facturas electrónicas con los reportes correspondientes.

**¿Cómo verificar la configuración?** Dirígete a: *** Menú básico > Doc. soporte > Modificar documento soporte > Aplica a *(Definir a que operación aplica - Factura de venta ó Ingresos)* ***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración aplica a en documento de soporte:](https://www.contapyme.com/conocimientocontapyme/080_IN/aplica_a_docsop.png)

Una vez realizada esta configuración, las **facturas electrónicas** generadas se mostrarán correctamente en los **reportes de facturas de venta.**

---

## Inventario

### ¿Cómo verificar la novedad que se presenta en la factura POS relacionada con la cantidad registrada?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Realicé una factura de venta y salió con error
- ¿Cómo verificar la novedad que se presenta en la factura POS relacionada con la cantidad registrada?
- ¿Cómo validar las cantidades disponibles desde el seleccionador de elementos basado en saldos de inventario?
- ¿Cómo consultar los saldos actuales del inventario desde los informes del sistema?
- ¿Qué hacer cuando no hay existencias disponibles para facturar en el POS?
- No envía la factura porque no hay cantidades.
- La factura no me procesa

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Si al finalizar una factura POS aparece el mensaje indicando que no es posible continuar porque no hay cantidades suficientes, realiza las siguientes validaciones para confirmar si realmente tienes disponibilidad del producto en inventario:

1. **Validar desde la operación usando el seleccionador basado en saldos de inventario:** Asegúrate de tener configurado el seleccionador de elementos por medio del explorador de saldos de inventario. Ruta: ***Factura POS > Operación > Configurar operación > Seleccionador de elementos de inventario > Activar "Por medio del explorador de saldos de invenrtario"***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo configuración seleccionador elementos basado en consulta de saldos:](https://www.contapyme.com/conocimientocontapyme/080_IN/config_seleccionador_elementos.png)

Con esta configuración, al ingresar para seleccionar un elemento podrás visualizar inmediatamente las cantidades disponibles:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo seleccionador de inventarios con cantidades:](https://www.contapyme.com/conocimientocontapyme/080_IN/seleccionador_elementos_saldos.png)

2. **Revisar los saldos desde el informe de inventario:** También puedes validar las cantidades disponibles desde el informe de saldos. Ruta: ***Menú inventarios > Inventarios > Inv. contable - Saldos > Consulta saldos actuales de inventario***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo seleccionador de inventarios con cantidades:](https://www.contapyme.com/conocimientocontapyme/080_IN/consulta_saldos_inv.png)

3. Si después de las validaciones confirmas que no tienes existencias disponibles, debes realizar el ingreso del producto mediante **factura de compra o ajuste de inventario.**

---

## Inventarios
### ¿Cuál es el procedimiento para corregir inventarios negativos por lotes?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Requiero explicación sobre cómo eliminar los lotes negativos
- Tengo lotes negativos
- Tengo diferencias entre las cantidades y los lotes.

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
 Los inventarios negativos por lotes suelen presentarse cuando existen inconsistencias en la digitación de documentos, especialmente cuando:

- No está activo el control de trazabilidad para el manejo de lotes.
- Se deja en blanco la información del lote.

Para validar que el sistema esté exigiendo correctamente la información de trazabilidad, sigue estos pasos: ***Menú inventarios > Grupos de inventario > Modificar > Manejo de lotes > Verifica que en Entradas y Salidas esté activa la opción: "Exigir datos de trazabilidad".***

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración para exigir trazabilidad en manejo de lotes:](https://www.contapyme.com/conocimientocontapyme/080_IN/exigir_trazabilidad_lotes.png)

Si ya tienes activo el manejo de trazabilidad y aún así se presentan diferencias o inventarios negativos, es recomendable solicitar un tiquete de soporte.

---

### ¿Cómo facturar productos de otra bodega sin realizar traslados?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Puedo facturar productos de diferentes bodegas en una misma factura?
- ¿Es obligatorio realizar traslados entre bodegas antes de facturar?
- ¿Puedo definir una bodega diferente por cada producto en la factura?
- Se pueden facturar productos de otra bodega sin necesidad de realizar traslados

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El sistema te permite facturar productos desde una bodega diferente **sin necesidad de realizar un traslado de bodega**, usando una opción dentro de la factura de venta para seleccionar la bodega desde donde egresarás la cantidad indicada.

### ¿Cómo se configura?

Para habilitar esta funcionalidad, sigue estos pasos:

1. Ingresa a la **operación de Factura de Venta**.
2. Haz clic en **Configurar operación**.
3. Ve a la opción **Columnas del listado**.
4. Marca como visible la columna **Código de bodega**.

De esta forma, el sistema te permitirá elegir desde qué bodega se descontará el producto.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración columna bodega en factura de venta:](https://www.contapyme.com/conocimientocontapyme/080_IN/[13670]config_columna_bodega_fv.png)

### ¿Cómo funciona al facturar?

Una vez activada la columna:

- Al crear la factura de venta, verás el campo **Código de bodega**.
- Allí puedes indicar la bodega desde la cual deseas dar salida a la cantidad del producto.
- El sistema tomará automáticamente el inventario desde la bodega seleccionada.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Factura de venta con columna bodega habilitada:](https://www.contapyme.com/conocimientocontapyme/080_IN/fv_columna_bodega.png)

Si tienes dudas sobre la configuración o el manejo de bodegas, puedes contactar al equipo de soporte para recibir acompañamiento.


---

### ¿Cómo generar un listado de elementos de inventario?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Puedo ver solo los elementos de inventario activos?
- ¿Cómo buscar un elemento específico dentro del catálogo?
- ¿Es posible filtrar el listado por tipo de producto o categoría?
- ¿Puedo exportar el listado de inventario a Excel?
- Requiero obtener una lista de inventario
- Listado de elementos de inventario

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Esta opción te permite consultar todos los elementos de inventario que tienes creados y disponibles a la fecha de trabajo, así como gestionar su información.

Para acceder al listado de elementos de inventario, sigue estos pasos:

1. Ingresa al **Menú Inventarios**.
2. Selecciona la opción **Catálogo de elementos de inventario**.

Desde allí podrás:
- Visualizar los elementos creados.
- Consultar la información de cada elemento.
- Modificar los datos cuando lo necesites.
- Exportar el listado a Excel.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Catálogo de elementos de inventario:](https://www.contapyme.com/conocimientocontapyme/080_IN/catalogo_elementos_inventario.png)

---

### ¿Cómo ordenar el listado de elementos de inventario por código?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Puedo ordenar el catálogo de inventario por otro campo diferente al código?
- ¿Cómo cambiar entre orden ascendente y descendente?
- ¿Puedo ordenar los elementos desde la vista simplificada del catálogo?
- ¿Qué hago si la columna código no se visualiza?
- ¿Como ordeno los elementos de inventario por codigo?

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Esta opción te permite organizar el catálogo de elementos de inventario para visualizar los productos de forma ordenada según su código, facilitando la búsqueda y revisión de la información.

Para ordenar los elementos por código, sigue estos pasos:

1. Ingresa al **Menú Inventarios**.
2. Selecciona **Elementos de inventario**.
3. Accede a la opción **Catálogo completo**.
4. Haz clic sobre la columna **Código**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Catálogo de elementos de inventario:](https://www.contapyme.com/conocimientocontapyme/080_IN/catalogo_elementos_completo.png)

Al hacer clic, el sistema ordenará automáticamente el listado según el código de los elementos.

---

## Inventarios Plus
### ¿Cómo generar una orden de compra?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué es una orden de compra al proveedor?
- ¿Para qué sirve una orden de compra?
- ¿Cómo funciona la orden de compra al proveedor?
- ¿Cómo registrar una orden de compra en el sistema?
- ¿Dónde se crea una orden de compra al proveedor?
- ¿Puedo generar una orden de compra desde un pedido de cliente?
- ¿Qué información se necesita para crear una orden de compra?
- ¿Se puede imprimir o enviar por correo una orden de compra?
- ¿La orden de compra reemplaza la factura de compra?
- Puedo registrar una orden de compra sin elementos de inventario

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Una **orden de compra** es un documento que permite a la empresa solicitar productos a sus proveedores y llevar un control previo de las compras que se van a realizar.

Esta operación permite:

- Registrar solicitudes de productos de manera formal.
- Imprimir la orden para entrega física.
- Generar el documento en PDF para enviarlo por correo electrónico.
- Tener control previo sobre las compras que se planean realizar.

Para crear una orden de compra al proveedor, sigue esta ruta:

*Menú Básico > Manejador de operaciones > Compras > Orden de compra al proveedor*

La orden de compra se puede registrar:
- De forma manual.
- Basada en un pedido de un cliente.
- A partir de una requisición interna.
- Tomando como referencia otra orden de compra.

En estos casos, el sistema permite importar la información del documento base y realizar los ajustes necesarios.

Al crear una orden de compra es necesario:

- Seleccionar el **proveedor**.
- Indicar los **productos** a solicitar (deben existir como elementos de inventario).
- Definir la **cantidad** de cada producto.
- Asignar el **precio** correspondiente.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Creación orden de compra al proveedor:](https://www.contapyme.com/conocimientocontapyme/080_IN/creacion_oc.png)

**Sin elementos de inventario creados, no es posible generar la orden de compra.**

Durante el registro de la orden de compra también puedes indicar:

- Descuentos otorgados por el proveedor.
- Condiciones comerciales (forma de pago, envío, plazo de entrega).
- Anticipos, si aplican.
- Observaciones relacionadas con la compra.
- La **bodega** a la cual ingresarán los productos cuando sean entregados.

Si tienes dudas sobre el registro o manejo de órdenes de compra, puedes contactar al equipo de soporte para recibir acompañamiento.

---

### ¿Cómo procesar una devolución en ventas si el sistema muestra error?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no puedo procesar una devolución en ventas?
- ¿Qué hago si la devolución en ventas me genera un error?
- ¿Cuáles son las causas de error al registrar una devolución?
- ¿Por qué el sistema no me deja procesar una devolución de venta?
- ¿Qué debo validar si una devolución en ventas no se procesa?
- ¿Por qué aparece un error al referenciar una factura en la devolución?
- ¿La devolución en ventas requiere bodega asignada?
- ¿Qué datos debo revisar cuando falla una devolución de venta?
- ¿Por qué el sistema rechaza la devolución de una factura?
- ¿Cómo solucionar errores comunes en devoluciones en ventas?

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si al procesar una devolución en ventas se genera un error, puede deberse a varias razones. A continuación, te compartimos las más comunes:

- **La factura de venta no tiene bodega asignada**  
  En las devoluciones se debe indicar la bodega, ya que desde allí el sistema define la cuenta contable que se va a afectar.

  La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Asignación bodega en devolución en ventas:](https://www.contapyme.com/conocimientocontapyme/080_IN/cod_bodega_dv.png)

- **La factura que intentas devolver no existe o no está procesada**  
  Para validarlo, puedes ingresar al **seleccionador de referencias** en la operación de devolución en ventas y eliges la factura directamente desde allí.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
- ![Seleccionador de referencias en devolución en ventas:](https://www.contapyme.com/conocimientocontapyme/080_IN/ref_dv.png) 

- ![Seleccionador de referencias en devolución en ventas:](https://www.contapyme.com/conocimientocontapyme/080_IN/seleccionador_ref_dv.png)

- **Información incompleta del cliente o de la forma de pago**  
  Es necesario que los datos del tercero, la forma de pago y demás información estén correctamente asignados.

### Ten en cuenta

Estos son algunos de los motivos más frecuentes, aunque pueden presentarse otros casos dependiendo de la configuración del documento.

Si tienes dudas sobre el registro o manejo de devoluciones en ventas, puedes contactar al equipo de soporte para recibir acompañamiento.

---

### ¿Cómo mostrar elementos marcados como no visibles en selección?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no me aparecen algunos productos al registrar una operación?
- ¿Qué significa que un elemento no esté visible en selección?
- ¿Por qué un producto no sale en las listas del sistema?
- ¿Cómo ver elementos de inventario que están ocultos?
- ¿Por qué no puedo seleccionar un producto en una factura o documento?
- ¿Cómo hacer visible un elemento de inventario?
- ¿Qué pasa si un elemento no está marcado como visible en selección?
- ¿Dónde se activan o desactivan los elementos visibles en inventario?
- ¿Los productos ocultos se eliminan del sistema?
- ¿Por qué un producto no aparece en reportes o informes?
- como ver no visibles en selección

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, los elementos de inventario que **no están marcados como “visibles en selección”** no se muestran en:
- Operaciones
- Informes
- Reportes

Esta opción es útil para ocultar productos que ya no se comercializan y mantener el catálogo más ordenado, sin eliminarlos del sistema.

**¿Cómo ver los elementos que están ocultos?**

Sigue estos pasos:

1. Ingresa al **Menú Inventarios**.
2. Selecciona **Elementos del inventario**.
3. En la parte superior de la pantalla, haz clic en el botón **Mostrar** (ícono mini-ojo) ubicado en la barra de vista.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Icono para mostrar elementos ocultos:](https://www.contapyme.com/conocimientocontapyme/080_IN/icono_mostrar_ocultos.png)

Esto permitirá visualizar todos los elementos, incluidos los que no están visibles en selección.

**¿Cómo identificar los elementos no visibles?**

- Revisa la columna **Visible en selección**.
- Los elementos que tengan esta opción desmarcada son los que no aparecen en las listas de selección.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Columna no visible en catálogo de elementos:](https://www.contapyme.com/conocimientocontapyme/080_IN/columna_visible_elementos.png)


**¿Cómo cambiar la visibilidad de un elemento?**

Si deseas que un elemento vuelva a aparecer en las operaciones:

1. Selecciona el elemento del catálogo.
2. Marca la opción **Visible en selección**.
3. Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Opción visible en selección al modificar elemento:](https://www.contapyme.com/conocimientocontapyme/080_IN/marcar_visible_elemento.png)

El elemento quedará disponible nuevamente para futuras operaciones.

### Notas importantes

- Los elementos ocultos **no se eliminan** del sistema.
- Solo se ocultan de las selecciones y listados operativos.


---

### ¿Cómo crear una cotización al cliente?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

### Variantes de la pregunta

- ¿Cómo hago una cotización para un cliente?
- ¿Cómo registrar una cotización en el sistema?
- ¿Dónde se crea la cotización al cliente?
- ¿Cómo generar una propuesta comercial en ContaPyme?
- ¿Cómo elaborar una cotización paso a paso?
- ¿Cómo enviar una cotización a un cliente?
- ¿La cotización afecta el inventario o la contabilidad?
- ¿Qué información necesito para hacer una cotización?
- Configurar cotización

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La cotización permite presentar a un cliente o interesado los productos o servicios que ofrece la empresa, indicando:

- Precios
- Descuentos
- Formas de pago
- Condiciones comerciales
- Vigencia de la propuesta

Es importante tener en cuenta que la cotización **no genera movimiento contable ni afecta el inventario**, ya que solo es una propuesta comercial y no garantiza que posteriormente se facture.

Para acceder a esta operación, sigue la ruta:

***Menú Básico > Manejador de operaciones > Más operaciones > Ventas > Cotización al cliente***

Al crear una cotización es necesario:

- Seleccionar el **tercero** (cliente o interesado).
- Elegir del **catálogo de inventario** los productos o servicios a cotizar.
- Indicar el **precio** correspondiente.
- Asignar descuentos si aplican.

También puedes registrar:

- Condiciones comerciales (forma de pago, forma de entrega, vigencia).
- Observaciones en el encabezado o pie del documento.
- Documentos adjuntos para complementar la propuesta.
- Otros contactos asociados al tercero principal de la cotización.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Paso 1 operación de cotización al cliente:](https://www.contapyme.com/conocimientocontapyme/080_IN/cotizacion_cliente_paso1.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Paso 2 operación de cotización al cliente:](https://www.contapyme.com/conocimientocontapyme/080_IN/cotizacion_cliente_paso2.png)

### ¿Cómo enviarla al cliente?

La cotización puede imprimirse o generarse en:

- Formato **PDF**
- Formato **HTML**

Estos formatos permiten enviarla fácilmente por correo electrónico o entregarla de forma física.

---

### ¿Cómo configurar el datáfono en ContaPyme?

CANONICAL_ID: PF_DATOFONO_REDEBAN
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

### Variantes de la pregunta

- ¿Cómo configurar el datáfono Redeban en ContaPyme?
- ¿Cómo integrar el datáfono con el sistema?
- ¿Cómo activar el pago con tarjeta en ContaPyme?
- ¿Dónde configuro el datáfono en Facturación?
- ¿Cómo configurar el datáfono en Punto de Venta?
- ¿Cómo conectar el datáfono por servicio web?
- ¿Cómo configurar el ejecutable cajas.exe?
- No me aparece la opción pago con datáfono
- Configuración datáfono Redeban
- Agradezco por favor nos colaboren con el tema de enlazar el datafono con la caja registradora.

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para configurar el datáfono Redeban en ContaPyme, es necesario realizar una serie de pasos que permiten integrar el dispositivo para recibir pagos con tarjetas débito o crédito.

Esta integración funciona tanto en la operación de:

- Facturación y Ventas
- Punto de Venta

### Pasos / Opciones

#### Acceder al Manejador de Operaciones

Para iniciar la configuración:

***Menú Básico > Manejador de Operaciones > Facturación y Ventas***  
o  
***Menú Básico > Manejador de Operaciones > Punto de Venta***

Luego:

- Ir al apartado **Operación** (parte superior izquierda).
- Seleccionar **Configurar Operación**.
- Elegir **Configuración para todos los usuarios**.

#### Configurar la interfaz con el datáfono

En el menú lateral izquierdo:

- Ubicar la opción **Interface con datáfonos de Redeban** (dentro de Configuración de Periféricos).
- Activar la interface con el datáfono de Redeban.

Seleccionar el tipo de conexión:

**Aplicativo cajas conexión al PC**

- Se utiliza cuando el datáfono está conectado físicamente al computador.
- Se debe indicar la ruta donde se encuentra el ejecutable **cajas.exe**.
- Este ejecutable es suministrado por Redeban.

**Servicio web (Recomendado)**

- Se utiliza cuando el datáfono opera por internet.
- Se debe ingresar la **ID de terminal de pago** proporcionada por Redeban.
- No requiere conexión física al computador.

#### Finalizar configuración

- Hacer clic en **Aceptar** para guardar los cambios.

### Notas / Advertencias

- Si se elige Servicio Web, el datáfono debe tener conexión estable a internet.
- Se recomienda utilizar Servicio Web, ya que no depende de conexión física al computador.
- El archivo **cajas.exe** debe solicitarse al asesor de Redeban.

### Validación

Para verificar que la integración está funcionando correctamente:

1. Registrar una operación de venta.
2. Ir al apartado **Banco**.
3. Confirmar que esté habilitada la opción **Pago con datáfono Redeban**.

Si la opción aparece activa, la configuración es correcta.

### Ejemplo

Al registrar una operación de venta:

- Seleccionar el producto.
- Ir al apartado **Banco**.
- Hacer clic en **Pago con datáfono Redeban**.
- Seguir las instrucciones que indique el datáfono para completar la transacción.

### Casos comunes

**No aparece la opción de pago con datáfono**

Verificar:

- Que la interface esté activada.
- Que la configuración haya sido guardada correctamente.
- Que el datáfono esté conectado (internet o PC según el tipo de conexión).
- Que la ID de terminal esté correctamente ingresada.

📌 **Recursos adicionales**

▶️ **Video:**  
[Integración Datáfono Redeban en ContaPyme ](https://www.youtube.com/watch?v=agdP5ktSsTU) 
Descripción: Este video explica cómo configurar un datáfono Redeban para que funcione correctamente con ContaPyme.

---

### ¿Qué movimiento contable genera una devolución de compra cuando el costo promedio es diferente al costo de compra?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

### Variantes de la pregunta

- tengo una factura de compra la cual la nota credito la esta dejando al debito y debe de quedar al credito
- ¿Por qué la devolución de compra me genera un movimiento al débito?
- ¿Por qué la nota crédito de compra me afecta una cuenta contable diferente?
- ¿Por qué el valor de la devolución no coincide con el valor de la compra?
- ¿Por qué el sistema genera un ajuste al devolver una compra?
- ¿La devolución de compra siempre se hace con el mismo costo de la factura?
- ¿Por qué la devolución de compra me genera diferencia en el inventario?
- ¿Qué cuenta contable afecta una devolución en compras?
- ¿Por qué el sistema calcula otro costo cuando hago una devolución?
- ¿Por qué al devolver un producto el sistema usa el costo promedio?
- ¿Dónde se configura la cuenta de devolución en compras?


#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando realizas una **devolución en compras** y el **costo promedio del inventario** es diferente al **costo con el que se registró la compra**, el sistema puede generar un **movimiento contable al débito o al crédito** en la cuenta definida como **devolución en compras** en la bodega.

Este movimiento corresponde a un **ajuste de costo**.

### ¿Por qué se genera este ajuste?

El inventario se valora utilizando el **costo promedio vigente al momento del egreso o devolución**, y no necesariamente con el mismo costo con el que se registró la compra original.

Por esta razón, cuando existe una diferencia entre:

- el **costo de compra**, y  
- el **costo promedio del inventario**,  

el sistema realiza automáticamente un **ajuste contable** para mantener cuadrado el valor del inventario.

Este ajuste puede reflejarse como:

- **Movimiento al débito**, o  
- **Movimiento al crédito**

dependiendo de la diferencia entre los valores.

### ¿Dónde se define la cuenta que recibe este movimiento?

La cuenta contable que recibe este ajuste corresponde a la **cuenta de devolución en compras configurada en la bodega**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto: ![Cuenta devolución en compras en bodega:](https://www.contapyme.com/conocimientocontapyme/080_IN/cuenta_dev_compras.png)

### Ejemplo

Supongamos el siguiente caso:

- **Factura de compra FC-00001 – 01/03/2026**  
  10 unidades del producto *Jean Dama*  
  Costo por unidad: **10.000**

- **Segunda compra – 05/03/2026**  
  5 unidades del mismo producto  
  Costo por unidad: **15.000**

Con estas compras, el **costo promedio del inventario** queda en:

**11.666,66 por unidad**

Este será el valor con el que el sistema valora los egresos del inventario.

Si realizas una **devolución en compras** usando el **costo de compra de 10.000**, existirá una diferencia frente al costo promedio:

**11.666,66 – 10.000 = 1.666,66 por unidad**

Ese valor será el que el sistema registre como **ajuste en la cuenta de devolución en compras**, generando un **movimiento al débito o al crédito según corresponda**.

Si la información anterior no resuelve tu consulta o deseas que revisemos tu caso en particular, puedes generar un **tiquete de soporte** y con gusto te ayudaremos a validarlo.
