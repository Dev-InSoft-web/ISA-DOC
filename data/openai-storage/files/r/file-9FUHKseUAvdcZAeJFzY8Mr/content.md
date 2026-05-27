# pf_disenador_documentos.md
> **Propósito:** Reunir las preguntas frecuentes del **Diseñador de documentos y documentos de impresión**, permitiendo que Paty IA brinde respuestas rápidas, exactas, prudentes y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.1  
> **Fecha:** 2026/03/19

# Diseñador de documentos

---

## Guía general de orientación para consultas sobre Diseñador de documentos

> **Uso interno para Paty IA.**  
> Este bloque orienta la construcción de respuestas cuando la consulta del usuario sea abierta, ambigua, visual, personalizada o no coincida de forma exacta con una FAQ específica sobre Diseñador de documentos.  
> No debe devolverse como bloque fijo completo, sino utilizarse como criterio para construir la respuesta según la necesidad del usuario.  
> Cuando Paty responda con base en esta guía, **debe conservar siempre el bloque obligatorio de cierre con Recursos adicionales**.

### Objetivo

Orientar la forma en que Paty debe responder consultas relacionadas con:

- mostrar información en documentos de impresión,
- agregar campos al diseño,
- identificar qué variable o grupo de campos puede servir,
- personalizar facturas, compras, egresos, comprobantes u otros documentos,
- mover, reorganizar, ampliar o redistribuir campos,
- ajustar el contenido visual de un documento,
- cambiar tamaño, ubicación, alineación o color de elementos del diseño,
- modificar, ajustar o personalizar documentos de impresión.

---

### ¿Cuándo debe activar Paty esta guía?

Esta guía debe aplicarse cuando el usuario realice consultas abiertas o ambiguas sobre personalización de documentos de impresión, por ejemplo:

- Necesito que en la factura se vea un dato adicional
- ¿Cómo muestro otro campo en el documento de impresión?
- ¿Cómo agregar un dato al diseño de la compra?
- ¿Cómo mostrar información adicional en el documento?
- ¿Qué variable me sirve para mostrar un dato en la impresión?
- ¿Cómo personalizar un documento de impresión?
- ¿Cómo saber qué campo usar en el diseñador?
- ¿Dónde reviso los campos disponibles en el documento?
- Necesito adecuar el documento de impresión según mi necesidad
- ¿Cómo hacer que en el diseño se vea otro dato del tercero, producto o documento?
- Necesito que en el documento aparezca una información que hoy no veo
- ¿Cómo agregar otro campo en la factura?
- ¿Cómo mostrar un valor adicional en el documento de impresión?
- ¿Cómo saber si existe un campo para imprimir ese dato?
- ¿Cómo revisar qué variables tiene mi documento?
- Quiero personalizar el formato de impresión
- Necesito agregar información a un documento personalizado
- ¿Cómo cambiar un documento de impresión?
- ¿Cómo modificar el documento de impresión?
- Necesito ajustar el documento de impresión
- ¿Cómo cambiar lo que sale al imprimir?
- ¿Cómo acomodar el formato de impresión?
- ¿Cómo modificar la factura que se imprime?
- ¿Cómo cambiar el formato de la factura?
- Necesito corregir un documento de impresión
- ¿Cómo personalizar lo que sale en la impresión?
- ¿Cómo editar el formato del documento?
- ¿Cómo mover un campo dentro del diseño?
- ¿Cómo cambiar de lugar una variable en el documento?
- ¿Cómo cambiar el color de la letra en el diseño?
- ¿Cómo cambiar el tamaño de la fuente en la impresión?
- ¿Cómo alinear o centrar un texto en el documento?
- ¿Cómo ampliar una columna en la impresión?
- ¿Cómo organizar mejor los campos del documento?
- ¿Cómo cambiar la apariencia visual del formato?

---

### Respuesta base esperada cuando Paty use esta guía

#### Descripción
<!-- DESCRIPCION_NO_RESUMIBLE -->

En ContaPyme, los documentos de impresión pueden personalizarse desde el **Diseñador de documentos**; sin embargo, **los campos disponibles, las listas visibles y las posibilidades de ajuste no son iguales para todos los documentos**.

Lo que se puede mostrar, mover o modificar depende principalmente de:

1. **El manejador de impresión del documento**
2. **La operación en la que se usa ese documento**
3. **Los campos, listas y controles disponibles dentro del diseñador para ese manejador**
4. **Si el documento usa el formato base o un diseño personalizado**

Por esta razón, cuando deseas mostrar un dato adicional, mover un campo, reorganizar el detalle o ajustar la apariencia visual de una factura, compra, egreso, comprobante o cualquier otro documento, lo correcto es revisar primero qué campos están disponibles en el diseño y validar si el cambio se puede realizar directamente desde el diseñador o si depende del formato específico configurado por la empresa.

---

#### Ruta general para revisar o personalizar el diseño

**Básico → Documentos de impresión → Seleccionar documento → Modificar → Pestaña Diseño del documento → Diseñar documento principal**

Antes de ingresar al diseñador, validar si el documento tiene activa la opción:

**Crear un diseño personalizado a partir de la plantilla base**

Si esta opción está marcada, el documento ya tiene personalización y los cambios deberán hacerse directamente en el diseñador.

---

#### ¿Cómo funciona el Diseñador?

Dentro del Diseñador de documentos normalmente encontrarás:

- **Report Tree (panel izquierdo):** estructura visual del diseño
- **Data Tree (campos disponibles, panel derecho):** árbol de datos con los campos disponibles para ese documento
- **Subreportes o listas (panel inferior):** secciones que muestran datos repetitivos, como productos, formas de cobro, liquidaciones o movimientos contables
- **Controles visuales del diseño:** etiquetas, campos, líneas, imágenes, bloques de texto y otros elementos que pueden moverse o ajustarse según el formato

📌 **Importante:**  
No todos los manejadores de impresión contienen las mismas listas, los mismos campos ni el mismo nivel de personalización visual.  
Por eso, un dato o ajuste que exista en una factura puede no existir en una nota contable, en un comprobante de ingreso o en otro documento.

📌 **Criterio transversal:**  
Cuando la consulta esté relacionada con personalización visual, comportamiento del formato, ubicación de campos, color, fuente, alineación, distribución o necesidades particulares del documento, Paty debe orientar de forma general, sugerir rutas de revisión y **evitar afirmar una solución exacta si esta depende del diseño específico del cliente**.

---

### Regla general de orientación

Cuando el usuario necesite **mostrar, agregar, mover, reorganizar o ajustar visualmente** un dato dentro de un documento de impresión, Paty debe orientar bajo este flujo general:

1. Ingresar al documento de impresión.
2. Abrir el diseñador del documento principal.
3. Revisar el **Data Tree (campos disponibles, panel derecho)** para identificar si existe un campo relacionado con la necesidad.
   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
   **Ejemplo – Campos adicionales por producto en el diseñador**  
   ![Campos adicionales por producto en el diseñador](https://www.contapyme.com/conocimientocontapyme/010_BS/imagen_campos_adicionales_producto_disenador.png)
4. Si la necesidad es mostrar un dato nuevo, probar con los campos que más se relacionen con la información deseada.
5. Si la necesidad es visual, revisar el control ya existente dentro del diseño y validar si requiere moverse, alinearse, ampliarse o ajustarse.
6. Guardar el diseño y validar el resultado con una prueba de impresión.

---

### Importante sobre los nombres de los campos

En muchos casos, el nombre del dato que el usuario necesita **no coincide exactamente** con el nombre del campo disponible en el diseñador.

Por ejemplo, el usuario puede pedir:

- número de factura del proveedor,
- amortización,
- cruce,
- anticipo,
- peso del producto,
- referencia interna,
- observación específica,
- correo 2 del cliente,
- celular,
- nombre del vendedor,
- color de una etiqueta,
- mover una columna,
- cambiar el tamaño de una letra,

pero el campo disponible puede tener otro nombre, estar dentro de otra lista, depender de otro control o incluso no aplicar para ese manejador.

Por eso, las sugerencias deben entenderse como **orientación funcional** y no como confirmación absoluta de que ese campo o ajuste resolverá el caso.

---

### Regla interna para identificar la intención real del usuario

Cuando la consulta sea sobre mostrar, agregar, modificar, adecuar o personalizar información en un documento de impresión, Paty debe **identificar primero la intención real** antes de responder.

Debe clasificar la necesidad dentro de uno de estos grupos:

#### 1. Mostrar un dato existente del sistema
Ejemplos:
- mostrar el peso del producto,
- mostrar el celular del cliente,
- mostrar el correo,
- mostrar una observación,
- mostrar una referencia.

**Criterio:**  
Paty debe orientar a revisar el **Data Tree** y sugerir grupos de campos relacionados, sin asegurar una variable exacta si no está validada documentalmente.

#### 2. Agregar una columna o un valor en el detalle
Ejemplos:
- agregar una columna de peso,
- mostrar otra columna en la factura,
- incluir un dato adicional por producto.

**Criterio:**  
Paty debe orientar a revisar listas del detalle, por ejemplo el listado de elementos o la sección correspondiente al manejador.

#### 3. Modificar la apariencia visual de un elemento
Ejemplos:
- mover un campo,
- cambiar su posición,
- ampliar una columna,
- alinear un texto,
- cambiar tamaño de letra,
- cambiar color,
- reorganizar visualmente el documento.

**Criterio:**  
Paty debe indicar que este tipo de cambio normalmente se realiza directamente sobre el control dentro del Diseñador de documentos, pero debe evitar dar instrucciones demasiado específicas si no existe una acción exacta documentada para ese caso.  
Debe orientar de forma general, por ejemplo: revisar el control, su ubicación, su tamaño, la alineación o sus propiedades visuales.

#### 4. Corregir un problema de distribución o formato
Ejemplos:
- campos que se cruzan,
- texto corrido,
- columnas desalineadas,
- campos sobrepuestos,
- información que no cabe.

**Criterio:**  
Paty debe explicar que este comportamiento puede depender del diseño del documento y del formato personalizado, y recomendar tiquete cuando el ajuste dependa de una revisión puntual.

---

### Criterio de respuesta para Paty en consultas de Diseñador

> **Uso interno para construcción de respuestas.**  
> Este bloque orienta el comportamiento esperado de Paty frente a consultas abiertas o ambiguas sobre el Diseñador de documentos.

#### Prioridad de respuesta

Cuando Paty reciba una consulta sobre **Diseñador de documentos, documentos de impresión, modificación del formato o personalización de la impresión**, debe aplicar este orden:

1. Si la necesidad del usuario coincide claramente con una **pregunta frecuente específica** ya documentada en este archivo, debe responder con esa FAQ.
2. Si la consulta es **abierta, ambigua, visual, personalizada o no coincide de forma exacta** con una pregunta frecuente existente, debe construir la respuesta usando esta **Guía general de orientación**.
3. Si el caso depende del diseño específico del cliente, requiere validación puntual o no existe una acción exacta documentada, debe orientar de forma general y recomendar la creación de un **tiquete de soporte**.

---

### Regla crítica sobre recursos adicionales

En este documento, los **Recursos adicionales** hacen parte de la respuesta esperada al usuario y **no deben tratarse como contenido opcional, variable ni condicional**.

Por lo tanto:

- Si Paty responde con una **FAQ_CANONICA** de este archivo, debe incluir también el bloque de **Recursos adicionales** definido dentro de esa misma respuesta.
- Si Paty construye una respuesta usando la **Guía general de orientación** o una **regla interna**, debe cerrar obligatoriamente con el bloque de **Recursos adicionales**.
- Paty no debe omitir los recursos aunque ya haya entregado una explicación completa.
- En consultas sobre diseñador, documentos de impresión, formatos, ajustes visuales, encabezados, logos, observaciones, firmas, fuentes, colores, alineación o cambios de impresión, los recursos deben mostrarse siempre al final de la respuesta.
- Paty no debe reemplazar este bloque por mensajes genéricos como:
  - **“No se encontraron recursos adicionales disponibles”**
  - **“No hay recursos disponibles para este proceso”**
  - **“No se encontraron recursos”**
- Si la consulta corresponde a temas cubiertos por este documento, Paty debe usar siempre el **bloque fijo de Recursos adicionales definido aquí**, aunque la respuesta haya sido construida de forma general.
- Si la respuesta ya incluye el bloque de recursos dentro de una **FAQ_CANONICA**, no debe repetirlo por segunda vez.

---

### Regla de ensamblado de respuesta

Cuando Paty responda usando la **Guía general de orientación**, una **regla interna** o una respuesta construida a partir de este documento, debe estructurar la salida final en este orden:

1. **Orientación principal** sobre la necesidad del usuario.
2. **Aclaración o advertencia** cuando la solución dependa del manejador, del diseño, del control o del caso específico.
3. **Recomendación de crear un tiquete de soporte**, cuando aplique.
4. **Bloque obligatorio de Recursos adicionales**.
5. Evitar afirmaciones absolutas cuando la solución no esté documentada explícitamente.

Paty no debe dar por terminada una respuesta construida desde este documento sin incluir al final el bloque de **Recursos adicionales**.

---

### Regla crítica de respuesta: sugerir, no asegurar

Cuando la consulta del usuario sea sobre **mostrar, agregar, mover, adecuar, reorganizar o personalizar** información en un documento de impresión, Paty **no debe asumir**:

- que existe una variable exacta con el mismo nombre solicitado,
- que todos los documentos permiten el mismo tipo de ajuste,
- que el mismo cambio aplica igual en todos los manejadores,
- ni que una modificación visual puede resolverse con una única instrucción general.

Paty debe responder bajo este criterio:

1. **Aclarar que depende del manejador y del diseño**
   - El documento de impresión usa un manejador específico.
   - Cada manejador expone listas, campos y controles diferentes.
   - Los nombres visibles en el diseñador no siempre coinciden literalmente con la forma en que el usuario formula la necesidad.
   - Algunos cambios pueden depender del diseño personalizado configurado por la empresa.

2. **Sugerir, no asegurar**
   - Paty puede sugerir campos, listas o tipos de revisión que podrían servir.
   - Puede orientar a revisar posición, tamaño, ancho, alineación, color, fuente o distribución cuando la necesidad sea visual.
   - Nunca debe afirmar con certeza que un campo o una propiedad resolverá el caso si no existe validación exacta documentada.

3. **Escalar cuando aplique**
   - Si el dato no aparece
   - Si el diseño es personalizado y complejo
   - Si el usuario requiere acompañamiento puntual
   - Si el nombre del campo no es claro
   - Si el cambio depende de la lógica específica de la operación
   - Si el ajuste visual requiere revisar el formato real del cliente

En estos casos, Paty debe recomendar generar un **tiquete de soporte**.

---

### Regla interna para consultas de ajuste visual, distribución o personalización avanzada del diseño

> **Uso interno para construcción de respuestas.**  
> Este bloque debe aplicarse cuando el usuario consulte por problemas de visualización, distribución, espaciado, alineación, tamaño, color, posición o comportamiento gráfico dentro de un documento de impresión, y no exista una respuesta exacta documentada para ese caso puntual.

#### ¿Cuándo debe aplicar esta regla?

Paty debe usar esta orientación cuando el usuario reporte situaciones como:

- campos que se unen, se cruzan o se sobreponen,
- descripción y cantidad muy juntas,
- texto distorsionado en la impresión,
- columnas mal distribuidas,
- datos que no caben correctamente en el espacio visible,
- información que se ve corrida, pegada o desalineada,
- necesidad de mover, ampliar, reorganizar o adecuar elementos del diseño,
- necesidad de cambiar color de letra,
- necesidad de cambiar tamaño de fuente,
- necesidad de centrar, alinear o redistribuir información,
- solicitudes muy específicas que dependen del formato personalizado configurado por la empresa.

#### Criterio de respuesta

En estos casos, Paty debe responder bajo estas reglas:

1. **Explicar que el comportamiento puede depender del diseño del documento**
   - La visualización no siempre depende de una configuración general del sistema.
   - Puede depender de cómo estén ubicados, distribuidos o configurados los campos o controles dentro del diseño.

2. **Aclarar que el resultado depende del documento, el manejador y la operación**
   - No todos los documentos usan el mismo manejador.
   - No todos los manejadores muestran la información de la misma forma.
   - Un mismo ajuste puede requerir acciones diferentes según el documento, la operación y el diseño configurado por la empresa.

3. **Sugerir, no asegurar**
   - Paty puede indicar que en este tipo de casos normalmente se revisa:
     - la ubicación de los campos,
     - el espacio entre columnas,
     - el ancho del control,
     - la distribución del detalle,
     - la alineación,
     - el tamaño de fuente,
     - el color o presentación visual,
     - o configuraciones propias del diseño.
   - Pero no debe asegurar una modificación exacta si esta no está validada documentalmente.

4. **Escalar a soporte como recomendación principal**
   - Si el diseño es personalizado
   - Si el ajuste es visual o avanzado
   - Si el usuario necesita una validación puntual
   - Si la solución depende del formato específico configurado por la empresa
   - Si no existe una acción exacta documentada para ese caso

En estos casos, Paty debe recomendar generar un **tiquete de soporte** desde el botón del teléfono ubicado en la parte inferior del chat.

#### Formulación orientativa esperada

“Este tipo de cambio puede depender del diseño del documento, del manejador que usa la impresión y de la forma en que estén ubicados o configurados los campos dentro del formato. En algunos casos puede ser necesario ajustar la posición, el ancho, la alineación, el tamaño o la apariencia visual del control, pero la solución exacta depende del diseño específico que tenga configurado tu empresa. Como orientación general, puedes revisar el Diseñador de documentos desde: **Básico → Documentos de impresión → Modificar → Diseño del documento → Diseñar documento principal**. Si necesitas una validación puntual o el ajuste depende de un diseño personalizado, lo más recomendable es crear un **tiquete de soporte** desde el botón del teléfono ubicado en la parte inferior del chat.”

#### Frases recomendadas para Paty

- “Esto puede depender del diseño específico del documento y no de una configuración general.”
- “En este tipo de casos, el ajuste suele depender de cómo estén ubicados o configurados los campos dentro del diseño.”
- “Como orientación general, puedes revisar el Diseñador de documentos y validar el espacio, ancho, alineación o distribución de los campos.”
- “La solución exacta puede variar según el formato personalizado que tenga configurado tu empresa.”
- “Si necesitas validar el ajuste puntual, lo recomendable es crear un tiquete de soporte desde el botón del teléfono ubicado en la parte inferior del chat.”
- “Puedo orientarte de forma general sobre cómo funciona el diseño, pero el ajuste exacto depende del documento, la operación y el formato que estés usando.”

---

### Recomendación final

Si al hacer la prueba no logras visualizar el dato como lo necesitas, no encuentras un campo relacionado, el cambio visual no se refleja como esperas o deseas apoyo para identificar qué ajuste del manejador te puede servir mejor, lo recomendable es crear un **tiquete de soporte** desde el botón del teléfono ubicado en la parte inferior del chat.

De esta forma, un asesor podrá revisar el documento, el manejador, el diseño y tu necesidad puntual para orientarte con mayor precisión.

---

### Cierre obligatorio

Al finalizar cada respuesta construida con base en esta guía, Paty debe mostrar siempre el siguiente bloque de recursos, sin omitirlo.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)

---

### Campos generales disponibles en Datos encabezado

Los siguientes grupos de campos suelen estar disponibles en los manejadores mediante la sección **Datos encabezado**.  
Estos campos pueden servir como orientación cuando el usuario desea mostrar información general del documento, de la empresa, del tercero o de la operación.

📌 **Importante:**  
Aunque estos campos son generales, algunos pueden no aplicar en todas las operaciones o manejadores.  
Si un campo no funciona en el documento específico, se debe recomendar validarlo con soporte.

#### 1. Datos de la empresa
Incluye campos como:

- Empresa código
- Empresa nombre
- Empresa nombre corto
- Empresa responsable
- Empresa rep. legal
- Empresa contador
- Empresa teléfono
- Empresa fax
- Empresa dirección
- Empresa ciudad
- Empresa país
- Empresa cód. postal
- Empresa página web
- Empresa e-mail
- Logo empresa
- Empresa URL logo
- Empresa tipo contribuyente
- Empresa tipo organización
- Empresa obligaciones fiscales
- Empresa tributos responsabilidad

#### 2. Datos del documento y operación
Incluye campos como:

- No. Oper.
- Tipo operación
- Tipo doc. soporte
- Prefijo tipo doc. soporte
- No. resolución tipo doc. soporte
- No. doc. soporte
- Consec. doc. soporte
- Nombre del documento
- Nombre en selección
- Número de formato
- Referencia
- Detalle operación
- Observaciones
- Observaciones completas
- Información resolución
- Info. aplicación
- Info. vendedor
- Inventario

#### 3. Fechas y vencimientos
Incluye campos como:

- Fecha soporte
- Fecha/hora creación
- Fecha/hora últ. modif.
- Fecha vencim. (CxC o CxP)
- Plazo de pago (CxC o CxP)
- Año pago
- Mes pago
- Día pago
- Mes operación
- Día operación
- Semana operación
- Empresa ciudad con fecha

#### 4. Datos del tercero
Incluye campos como:

- Tercero código
- Tercero código sin DV
- Tercero nombre
- Tercero nombre factura
- Tercero apellidos factura
- Tercero teléfono
- Tercero dirección
- Tercero ciudad
- Tercero país
- Tercero nombre comercial
- Tercero celular/móvil
- Tercero e-mail
- Tercero e-mail fact. elect.
- Tercero tipo
- Tercero tipo de régimen
- Tercero tipo de persona
- Tercero vendedor
- Tercero categoría
- Tercero clase 1 a clase 4
- Tercero dato 1
- Tercero dato 2

#### 5. Datos de contacto y sucursal
Incluye campos como:

- Nombre completo contacto
- Apellido contacto
- Cargo contacto
- Teléfono contacto
- Celular/móvil contacto
- E-mail contacto
- Notas contacto
- Sucursal nombre
- Sucursal país
- Sucursal ciudad
- Sucursal dirección
- Sucursal barrio
- Sucursal contacto
- Sucursal teléfono
- Sucursal celular/móvil

#### 6. Valores generales del documento
Incluye campos como:

- Valor total
- Valor parcial
- Valor caja
- Valor banco
- Valor efectivo
- Valor por cobrar
- Valor cruce
- Valor total Fmt
- Valor parcial Fmt
- Valor en letras
- Vr. letras cheque
- Vr. por cobrar en letras
- Total descuento
- Total IVA
- Total otros impuestos
- Total retención
- Total descuentos generales
- Total cargos generales
- Valor tasa de cambio
- Valor tasa de cambio inversa

#### 7. Campos adicionales de libre definición
Algunas operaciones pueden manejar campos como:

- Valor 1 a Valor 12
- Nombre Valor 1 a Nombre Valor 12
- Fecha 1 a Fecha 3

📌 Estos campos pueden ser utilizados por la empresa según su necesidad, pero su disponibilidad depende de que la operación realmente los maneje y estén configurados.

#### 8. Campos especiales de facturación electrónica y códigos
Incluye campos como:

- CUFE FE referenciada
- CUDE Fact. Elect.
- Texto para QR Fact. Elect.
- Sello de firmado de Fact. Elect.
- Fecha/Hora de emisión de Fact. Elect.
- Fecha/Hora de validación de Fact. Elect.
- Número de FE referenciada
- Fecha/Hora de emisión de FE referenciada
- Código de barras
- Código de barras leíble

---

### Manejador de factura

Además de **Datos encabezado**, este manejador dispone de secciones adicionales que permiten mostrar información propia de facturación, productos, impuestos, formas de pago y datos comerciales.

#### Secciones disponibles

- Lista elementos factura
- Lista series y lotes
- Lista Datos adicionales FE prod
- Lista forma de cobro
- Lista liquidación
- Datos Factura

#### ¿Para qué puede servir cada sección?

##### Lista elementos factura
Útil para mostrar información del detalle de productos o servicios, por ejemplo:

- código del producto o servicio
- descripción
- cantidad
- unidad
- precio
- descuento
- observaciones del ítem
- datos del elemento
- columnas adicionales del detalle

También puede ser útil cuando el usuario desea agregar columnas adicionales en el detalle de la factura.

##### Lista series y lotes
Útil cuando se desea mostrar información asociada a:

- series
- lotes
- recursos
- fechas asociadas
- datos complementarios del producto

##### Lista Datos adicionales FE prod
Útil en casos específicos de facturación electrónica o procesos especiales, por ejemplo:

- datos adicionales por producto
- información complementaria para FE
- atributos específicos del ítem

##### Lista forma de cobro
Útil cuando el usuario desea mostrar:

- formas de pago
- medios de cobro
- valores asociados al pago
- terceros relacionados con el medio de pago
- distribución de cobro

##### Lista liquidación
Útil para mostrar:

- impuestos
- porcentajes
- bases
- valores liquidados
- conceptos de liquidación

##### Datos Factura
Útil para mostrar datos generales propios de la factura, por ejemplo:

- referencia
- fecha de referencia
- fechas auxiliares
- código del vendedor
- nombre del vendedor
- e-mail o teléfono del vendedor
- cuenta por facturar
- datos relacionados con referencia o documentos electrónicos

📌 **Orientación funcional:**  
Si el usuario necesita mostrar un dato en una factura y no sabe exactamente qué campo usar, se le puede sugerir revisar primero si ese dato podría estar en:

- **Datos encabezado**, si es información general
- **Lista elementos factura**, si pertenece al detalle del producto
- **Lista liquidación**, si se relaciona con impuestos o valores calculados
- **Lista forma de cobro**, si se relaciona con pagos, cruces o medios de cobro
- **Datos Factura**, si corresponde a información propia del documento

Si la prueba no funciona, se debe recomendar **crear un tiquete de soporte**.

---

### Manejador de comprobante de ingreso

Además de **Datos encabezado**, este manejador expone secciones orientadas a conceptos, formas de cobro, liquidación y datos de abono.

#### Secciones disponibles

- ListaConceptosComprobante
- FormasCobro
- ListaLiquidacion
- DatosAbonoCxC

#### Uso orientativo de estas secciones

##### ListaConceptosComprobante
Puede servir para mostrar:

- conceptos del comprobante
- descripciones
- observaciones
- valores
- referencias
- saldos
- abonos

##### FormasCobro
Puede servir para mostrar:

- forma de cobro
- dato de forma de cobro
- valor
- código adicional
- tercero del medio de pago

##### ListaLiquidacion
Puede servir para mostrar:

- impuestos
- porcentajes
- bases
- valores liquidados
- observaciones

##### DatosAbonoCxC
Puede servir para mostrar información relacionada con:

- abonos
- cartera
- saldos
- valores base
- porcentajes
- observaciones

📌 **Orientación funcional:**  
Si el usuario desea visualizar información relacionada con recaudos, abonos, pagos, cartera o formas de cobro, se le puede sugerir revisar especialmente **FormasCobro** y **DatosAbonoCxC**.  
Si el dato buscado no aparece o no se comporta como se espera, debe recomendarse **crear un tiquete de soporte**.

---

### Manejador: Nota de contabilidad simple

Este manejador está orientado a operaciones de movimiento contable y muestra principalmente información asociada a cuentas, terceros, centros de costos y valores contables.

#### Secciones disponibles

- ListaMovContable

#### Uso orientativo

##### ListaMovContable
Puede servir para mostrar:

- cuenta
- detalle
- valor base
- valor movimiento
- centro de costos
- tercero
- ciudad del tercero
- datos básicos del movimiento contable

#### Importante

Este manejador aplica para operaciones contables específicas, por lo tanto no expone el mismo nivel de detalle comercial o de productos que sí existe en el manejador de factura.

📌 **Orientación funcional:**  
Si la necesidad del usuario está relacionada con movimientos contables, cuentas, terceros contables, centros de costos o valores de asiento, se le puede sugerir revisar **ListaMovContable**.  
Si requiere un ajuste más específico o el documento no muestra el dato esperado, se debe recomendar **crear un tiquete de soporte**.

---

### Regla especial para respuestas sobre campos específicos

Cuando el usuario solicite que en el documento se muestre un dato puntual, por ejemplo:

- amortizaciones
- número de factura del proveedor
- cruces
- anticipos
- saldos
- peso del producto
- referencia interna
- observaciones particulares
- datos de cartera
- datos de proveedor
- datos adicionales por producto
- correo del cliente
- celular del tercero
- nombre del vendedor

Paty debe evitar responder con una variable exacta si esta no está validada documentalmente.

En su lugar debe:

1. Explicar que el resultado depende del manejador y del documento.
2. Sugerir revisar los grupos de campos relacionados con la necesidad.
3. Indicar que el nombre visible del campo puede no coincidir exactamente con la forma en que el usuario lo solicita.
4. Recomendar crear un tiquete de soporte si requiere validar qué campo le sirve realmente para su caso.

#### Ejemplo de formulación correcta
Para este tipo de necesidad, el resultado puede depender del manejador del documento y de los campos que tenga disponibles el diseño. Como orientación, puedes revisar en el árbol de datos campos relacionados con cruces, valores, referencias, cartera, formas de cobro o datos del documento, según el manejador que estés usando. Si al hacer la prueba no encuentras un campo que te funcione como esperas, lo recomendable es crear un tiquete de soporte para que un asesor valide tu caso puntual.

---

## Encabezados y rótulos

### ¿Cómo agregar un campo adicional en un documento de impresión?
CANONICAL_ID: PF_DISENADOR_DOCUMENTOS_AGREGAR_CAMPOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_TICKET_INVITATION: TRUE
REQUIRES_RESOURCES_BLOCK: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo agregar un campo en el documento de impresión?
- Necesito mostrar un dato adicional en la factura
- ¿Cómo incluir el usuario que elaboró el documento?
- ¿Cómo agregar el peso del producto en la impresión?
- ¿Cómo mostrar el correo del cliente?
- ¿Cómo incluir otro campo en el documento?
- ¿Cómo saber qué campos puedo usar en el diseño?
- Necesito personalizar un documento de impresión
- ¿Cómo agregar información adicional en la impresión?


#### Descripción
En ContaPyme, los documentos de impresión pueden personalizarse desde el Diseñador de documentos.  
Los campos disponibles dependen del **manejador de impresión**, del **tipo de operación** y de la información que ese documento expone.

Esto significa que no todos los documentos tienen los mismos campos disponibles, y un dato como:
- usuario que elaboró  
- peso del producto  
- correo del cliente  
- dirección  
- observaciones
- Teléfono  

puede estar disponible o no, dependiendo del documento que estés modificando.

---

#### Pasos / Opciones

1. Ingresar a:
   **Básico → Documentos de impresión → Seleccionar documento → Modificar → Diseño del documento → Diseñar documento principal**

2. Validar que esté activa la opción:
   **Crear un diseño personalizado a partir de la plantilla base**

3. Dentro del diseñador, revisar el **Data Tree (árbol de datos - panel derecho)**

4. Buscar campos relacionados con el dato que deseas incluir.  
   Por ejemplo:
   - usuario / elaboró / creó  
   - peso / cantidad / producto  
   - correo / email / cliente  
   - dirección / contacto  

5. Si encuentras un campo que corresponde, agrégalo al diseño y realiza una prueba de impresión

---

#### Advertencia
El nombre del campo no siempre coincide exactamente con lo que se desea mostrar.  
Además, algunos datos pueden no estar disponibles en ciertos documentos dependiendo del manejador o la operación.

---

#### Recomendación
Si no encuentras el campo o no estás seguro cuál usar, puedes crear un **tiquete de soporte** desde el botón del teléfono en la parte inferior del chat, para que un asesor revise tu documento y te indique la mejor opción según tu caso.

---

#### 📌 Recursos adicionales

**Plataforma de capacitación:**

- [Videos: Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)
- [Videos: Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)

---

### ¿Cómo cambiar el título, subtítulo y detalle (razón social, NIT y dirección) en los documentos de impresión?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Dónde cambio el nombre de la empresa en mis documentos?  
- ¿Cómo cambiar la dirección de la empresa que sale en el encabezado de la factura?
- ¿Dónde modifico el rótulo de empresa (razón social, NIT, dirección) que imprime arriba en la factura?
- Cambié la empresa y no se actualiza el encabezado del documento, ¿qué hago?
- ¿El encabezado se toma del rótulo o del diseñador?  
- ¿Cómo editar el título principal del documento?  
- ¿Qué diferencia hay entre rótulo y diseño personalizado?  
- ¿Por qué cambio el rótulo pero el documento sigue igual?  
- ¿Cómo actualizar razón social, NIT y dirección en documentos personalizados?
- Solicito realizar el cambio de razón social en la factura o cotización
- ¿Cómo cambiar el encabezado del documento de impresión?
- ¿Cómo modificar el encabezado de la factura?
- ¿Cómo cambiar la razón social que sale al imprimir?
- ¿Cómo cambiar el NIT que aparece en la factura?
- ¿Cómo cambiar la dirección que aparece en el encabezado del documento?
- ¿Por qué en el documento de impresión sigue saliendo la empresa anterior?
- ¿Cómo cambiar lo que aparece arriba en la factura o cotización?
- ¿como elimino el teléfono y dirección del encabezado del documento de impresión de FE?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Los documentos de impresión en ContaPyme pueden tomar el encabezado desde dos lugares:

1. **Desde el rótulo de empresa (encabezado estándar del sistema).**  
2. **Desde el diseño personalizado del documento (si fue modificado).**

La forma correcta depende de si tu documento usa diseño estándar o personalizado.

##### Paso 1: Cambiar Título, Subtítulo y Detalle desde la Empresa  
*(Diseños estándar)*

Si el documento NO tiene personalización en el diseñador, el encabezado se toma directamente desde el **rótulo de empresa**.

**Ruta:**  
**Básico → Empresa → clic derecho “Modificar empresa” → Pestaña General → Rótulo**

En esta ventana puedes actualizar:

- **Título principal:** Razón social  
- **Subtítulo:** NIT de la empresa  
- **Detalle:** Dirección y teléfono  
- **Pie de página:** Texto adicional opcional  

**Ejemplo – Campos del rótulo de empresa**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Rótulo empresa](https://www.contapyme.com/conocimientocontapyme/010_BS/rotulo_empresa.png)

💡 *Los documentos estándar toman estos valores automáticamente para el encabezado.*

##### Paso 2: Cambiar Título, Subtítulo y Detalle en un Documento Personalizado  
*(Diseños creados o modificados en el diseñador)*

Si el documento fue editado previamente en el diseñador, los campos del encabezado ya no toman los valores del rótulo: **el diseño manda**.

En ese caso, debes modificar manualmente los textos dentro del Diseñador de documentos.

**Ruta:**  
**Básico → Documentos de impresión → clic derecho “Modificar documento” → Diseño del documento → Diseñar documento principal**

**Ejemplo – Encabezado editable en el diseñador**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Diseñador documento encabezado](https://www.contapyme.com/conocimientocontapyme/010_BS/rotulo_disenador.png)

Dentro del diseñador:

- Ubica las cajas de texto superiores (razón social, NIT, dirección).  
- Haz clic sobre cada una para editar su contenido.  
- Guarda los cambios para actualizar el documento.

##### ¿Cómo sé si mi documento está personalizado?

El documento **está personalizado** cuando:

- Si la opción **“Crear un diseño personalizado a partir de la plantilla base”** está activada (☑️), significa que el documento **ya tiene un diseño personalizado** .

**Ejemplo – Documento con diseño personalizado activado**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Diseño personalizado activado](https://www.contapyme.com/conocimientocontapyme/010_BS/diseno_personalizado_activo.png)

- Al abrir el diseñador, ves textos escritos directamente (no campos vinculados).  
- Los campos del rótulo NO se reflejan en la impresión.  
- El usuario o implementador ha editado el diseño alguna vez.

##### ¿Necesitas ayuda con un diseño personalizado?

Si no estás seguro o necesitas asistencia, puedes **crear un tiquete** desde el botón del teléfono que aparece en la parte inferior del chat.  
Un asesor revisará tu diseño y te ayudará a realizar el ajuste correctamente.

#### Bloque obligatorio de cierre para respuestas construidas

Si Paty construye la respuesta usando esta guía o cualquiera de las reglas internas de este documento, debe cerrar siempre con el siguiente bloque, sin omitirlo:

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)


---

### ¿Cómo modificar una observación que ya está registrada en un documento de impresión?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Dónde cambio la observación que me aparece en la factura?
- ¿Cómo edito el texto que sale al final del documento?
- ¿Por qué la observación no cambia aunque la modifique?
- ¿Dónde está guardada esa observación?
- ¿Cómo cambio el texto fijo del documento de impresión?
- ¿Por qué aparece un texto que no veo en la operación?
- ¿Cómo agrego otra observación a la factura?
- ¿Cómo cambiar la observación del documento soporte?
- ¿Cómo edito el texto que aparece en el diseñador del documento?
- ¿Cómo ingreso al diseñador para cambiar el texto?
- ¿Cómo saber si la observación está en el diseño o en el documento?
- ¿Cómo dejar una observación fija para que salga en todas las facturas?
- ¿Cómo cambiar el texto fijo que se imprime al final del documento?
- ¿Cómo cambiar la observación que sale al imprimir?
- ¿Cómo modificar el comentario que aparece en la factura?
- ¿Cómo cambiar el texto que aparece al final de la factura?
- ¿Por qué sigue saliendo una observación vieja en la impresión?
- ¿Cómo quitar o modificar una observación que sale en todas las facturas?
- ¿Dónde se cambia el texto que aparece al final del documento?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Las observaciones que aparecen en los documentos de impresión pueden provenir de **tres lugares distintos**.  
Para modificarlas correctamente, primero debes identificar de dónde se están tomando.  

A continuación se explican las tres opciones y cómo editarlas.

##### Paso 1: Modificar la observación desde el Documento de Impresión  
*(Pestaña Observaciones y parámetros)*

**Ruta:**  
Básico → Documentos de impresión → Seleccionar el documento → Pestaña *Observaciones y parámetros*

**Ejemplo – Observaciones del documento de impresión**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Observaciones en documento de impresión](https://www.contapyme.com/conocimientocontapyme/010_BS/observaciones_docImpresion.png)

###### ¿Qué son estas observaciones?

Son **comentarios fijos** definidos por la empresa que:

- Se imprimen **al final del documento**,  
- No pueden modificarse desde la operación,  
- Se aplican a todas las impresiones que utilicen ese documento.

###### Cuándo usar esta opción:
Cuando la empresa quiere un texto permanente, por ejemplo:
***** No Somos Grandes Contribuyentes – No Somos Auto Retenedores *****

##### Paso 2: Modificar la observación directamente en el Diseño del documento  
*(Texto fijo dentro del diseño, editable únicamente desde el diseñador)*

Si la observación aparece como parte del **diseño del documento**, no depende de la pestaña Observaciones.  
Debes editarla manualmente dentro del **Diseñador de documentos**.

**Ruta:**  
Básico → Documentos de impresión → Modificar → *Diseñar documento principal*

**Ejemplo – Observación dentro del diseño del informe**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Observación en el diseñador](https://www.contapyme.com/conocimientocontapyme/010_BS/observaciones_diseno.png)

###### ¿Cómo editarla?

1. Ubica el bloque donde aparece la observación.  
2. Haz **doble clic** sobre el texto.  
3. Se habilitará el editor.
4. Modifica el contenido y guarda.

###### Indicadores de que la observación está en el diseño:
- No cambia al modificar la pestaña Observaciones.  
- Tiene un control tipo *Label* o *Memo* en el diseñador.  
- Se repite exactamente igual en todas las impresiones, sin importar parámetros.

##### Paso 3: Modificar la observación desde el Documento de Soporte  
*(Observación para impresión – se aplica a todas las operaciones que usen este soporte)*

**Ruta:**  
Básico → Documento soporte → Seleccionar soporte → Pestaña *Impresión del documento*

**Ejemplo – Observación para impresión en documento soporte**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Observación en documento soporte](https://www.contapyme.com/conocimientocontapyme/010_BS/observaciones_docSoporte.png)

##### ¿Qué hace esta observación?

Cualquier texto que escribas aquí:

- Se imprimirá en **todas las operaciones** que utilicen este documento soporte.  
- Se verá en documentos impresos, enviados al correo o exportados a PDF.

###### Ejemplo:

> La empresa MP Computadores necesita que todas las facturas impresas incluyan **Términos y condiciones**.  
> Para esto, se escribe ese número en “Observación para impresión”.  
> De esta manera siempre que se imprima una operación soportada con este documento, el sistema mostrará los Términos y condiciones automáticamente.

#### Cierre obligatorio
Al finalizar esta respuesta, Paty debe mostrar siempre el siguiente bloque de recursos, sin omitirlo.

#### 📌 Recursos adicionales 
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y de documentos impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)  

---

### ¿Cómo modificar o reemplazar el logo configurado en las facturas?
CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Dónde cambio el logo de la factura?  
- ¿Cómo reemplazar el logo que aparece en los documentos?  
- ¿Por qué no cambia el logo aunque modifique la empresa?  
- ¿Cómo quitar un logo que aparece en el diseño?  
- ¿Cómo poner un logo diferente para las facturas?  
- ¿Cómo actualizar el logo para todos los documentos?  
- ¿Cómo ajustar el tamaño del logo en el diseño de impresión?  
- ¿El logo debe tener algún tamaño o formato especial?  
- ¿Cómo cargar un logo desde una URL HTTPS?  
- ¿Puedo tener un logo diferente según el documento?  
- ¿Cómo cambiar el logo del certificado o informe?  
- Deseo actualizar o corregir el logo que aparece en las facturas
- ¿Cómo cambiar el logo que sale al imprimir?
- ¿Dónde modifico el logo del documento de impresión?
- ¿Por qué sigue saliendo el logo anterior en la factura?
- ¿Cómo quitar el logo del documento de impresión?
- ¿Cómo cambiar la imagen del encabezado de la factura?
- ¿Por qué no se actualiza el logo aunque lo cambie en la empresa?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El logo que aparece en las facturas, informes o certificados puede provenir de dos lugares:  
1) La configuración de la empresa (logo oficial).  
2) El Diseñador del documento (logo incrustado en el diseño).

Para modificarlo correctamente, debes identificar primero desde dónde se está tomando.

##### Paso 1: Cambiar el logo desde la Empresa  
*(Logo oficial utilizado por el sistema y documentos HTML)*

**Ruta:**  
Básico → Empresa → Modificar empresa → Pestaña *General* → Opción *Rótulo*

**Ejemplo – Configuración del logo de empresa**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Logo empresa](https://www.contapyme.com/conocimientocontapyme/010_BS/logo_empresa.png)

###### URL logo de la empresa

Es la **dirección HTTPS** donde está alojada la imagen del logo.  
Debe cumplir:

- El host debe tener **certificado SSL** → la URL **debe iniciar por https://**  
- No hay restricción de dominio ni ubicación, siempre que sea accesible.  
- Si la imagen no cumple SSL, el sistema mostrará **solo el nombre de la empresa**.

**Ejemplo de URL correcta:**  
https://contapyme.com/lib/img/logo/doccloudtest.png

###### Recomendaciones para el logo

Para garantizar calidad y compatibilidad:

- Formato recomendado: **PNG con fondo transparente**  
- Peso máximo sugerido: **≤ 100 KB**, para carga rápida  
- Ancho recomendado: **250 px a 300 px**  
- La plataforma redimensiona automáticamente manteniendo proporciones  
- Puedes previsualizar el logo en:  
  **Empresa → Plataforma de documentos** (lado derecho)

💡 *Este logo también puede usarse en plantillas HTML de impresión.*

###### Tipo de encabezado para reportes
En esta misma pantalla puedes elegir qué se mostrará en el encabezado de los documentos:

- **Mostrar rótulo**: título, subtítulo, detalle, pie de página  
- **Mostrar logotipo**: usa la imagen definida en URL logo  
- **No mostrar ninguno**: ideal para papelería preimpresa

**Observación:**  
Si la empresa usa papelería membreteada, se recomienda **No mostrar ninguno**.

##### Paso 2: Reemplazar o modificar el logo directamente desde el Diseño del documento  
*(Logo incrustado manualmente en el diseño)*

Si el documento fue personalizado, es posible que el logo esté **dentro del diseño**, no desde la empresa.

**Ruta:**  
Básico → Documentos de impresión → Modificar documento → Pestaña *Diseño del documento* → Diseñar documento principal

**Ejemplo – Logo incrustado en el diseño**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Logo en diseño](https://www.contapyme.com/conocimientocontapyme/010_BS/logo_diseno.png)

###### ¿Cómo reemplazarlo?
1. Selecciona el logo en el diseñador.  
2. Clic derecho sobre la imagen.  
3. Selecciona **Picture…**  
4. Carga el nuevo logo desde tu PC.  
5. Ajusta tamaño con la opción **Stretch**, si es necesario.

###### Recomendación final
Si al cambiar el logo desde la empresa **no se actualiza**, es muy probable que el documento tenga un diseño personalizado con un logo.  
En ese caso, debes modificarlo desde el diseñador.

Si necesitas ayuda, puedes crear un tiquete desde el botón del teléfono en la parte inferior del chat.

#### Cierre obligatorio
Al finalizar esta respuesta, Paty debe mostrar siempre el siguiente bloque de recursos, sin omitirlo.

#### 📌 Recursos adicionales 
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y de documentos impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)  

---


## Personalización de informes y certificados en el Diseñador de documentos.

### ¿Cómo incorporar la firma en la plantilla del certificado laboral?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo agregar firma al certificado laboral?  
- ¿Cómo agregar firma en informes?  
- ¿Cómo agregar firma en certificados?  
- ¿El sistema permite firmas electrónicas?  
- ¿Puedo poner mi firma escaneada en los certificados?  
- ¿Mi firma en PNG sirve como firma electrónica?  
- ¿Cómo firmar digitalmente un PDF desde ContaPyme?  
- ¿Cómo agregar la firma del gerente al certificado laboral o de retención?  
- Requiero implementar la firma electrónica en el certificado laboral
- ¿Cómo poner una firma en el certificado laboral?
- ¿Cómo insertar una firma escaneada en un certificado?
- ¿Cómo poner la firma del gerente en el certificado?
- ¿Cómo hacer para que el certificado salga firmado?
- ¿Cómo agregar una imagen de firma al certificado?

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Antes de agregar una firma a un certificado laboral o informe, es fundamental **identificar el tipo de firma que necesitas**, ya que **el proceso y la validez legal son completamente diferentes**.

##### Paso 1. Diferencia entre los tipos de firma

En ContaPyme pueden intervenir **dos tipos de firma**, con alcances distintos:

| Tipo de firma | Descripción | Validez jurídica |
|--------------|------------|------------------|
| **Firma como imagen** | Imagen escaneada de una firma manuscrita (PNG, JPG) | ❌ No |
| **Firma electrónica certificada** | Firma digital con certificado, encriptación, sello de tiempo y trazabilidad | ✔️ Sí |

📌 *Esta diferencia define qué se puede hacer dentro del sistema y qué debe realizarse por fuera.*

##### Paso 2. ¿Qué tipo de firma necesitas?

A continuación, elige el escenario que aplica a tu caso:

###### Opción A. Insertar una firma como imagen (firma visual)

**¿Qué permite el sistema?**
✔️ Insertar una **imagen de firma** dentro del diseño del certificado laboral o de cualquier informe.  
❌ Esta firma **no tiene validez jurídica**, es únicamente visual.

**¿Cuándo usar esta opción?**
Cuando solo necesitas que el certificado **se vea firmado**, sin requerir firma electrónica legal.

**¿Cómo insertar la imagen de la firma?**

1. Ingresa al **Diseñador de documentos**.  
2. Haz clic derecho sobre el **control de imagen**.  
3. Selecciona la opción **Picture…**.  
4. Carga la imagen de la firma (se recomienda formato **PNG**).  
5. Ajusta tamaño y posición; puedes usar la opción **Stretch** para adaptar la imagen al espacio.

**Ejemplo – Certificado laboral con firma como imagen**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Certificado con firma](https://www.contapyme.com/conocimientocontapyme/010_BS/diseno_certificado.png)

**Ejemplo – Insertar imagen de firma en el diseñador**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Insertar imagen en diseño](https://www.contapyme.com/conocimientocontapyme/010_BS/agregar_firma_diseno.png)

📌 *Esta opción corresponde únicamente a una firma visual.*

###### Opción B. Aplicar una firma electrónica con validez jurídica

**Importante**
❌ ContaPyme **no permite generar firmas electrónicas certificadas dentro del diseño del documento**.

**¿Cómo aplicar una firma electrónica válida?**

Para que el certificado cuente con **firma electrónica con validez legal**, debes realizar el proceso fuera del sistema:

1. Genera o exporta el **certificado laboral en formato PDF** desde ContaPyme.  
2. Firma el PDF utilizando una **plataforma de firma electrónica certificada**.

Estas plataformas aplican:

- Certificado digital del firmante  
- Encriptación del archivo  
- Sello de tiempo  
- Validación de identidad  
- Trazabilidad del proceso  

✔️ *Este procedimiento sí constituye una firma electrónica válida ante la ley.*

#### Conclusión

- Si necesitas **mostrar una firma dentro del documento** → inserta una **imagen de firma** en el diseñador.  
- Si necesitas **validez jurídica** → genera el PDF y **fírmalo externamente** con una plataforma certificada.

#### Cierre obligatorio
Al finalizar esta respuesta, Paty debe mostrar siempre el siguiente bloque de recursos, sin omitirlo.

#### 📌 Recursos adicionales 

- [Videos: Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
- [Videos: Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)


---

## Cambios en documentos de impresión

### ¿Cómo modificar o personalizar el diseño de un documento de impresión?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS_MODIFICAR_DISENO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_TICKET_INVITATION: TRUE
REQUIRES_RESOURCES_BLOCK: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo modificar el diseño de un documento de impresión?
- ¿Cómo personalizar el formato de un documento de impresión?
- ¿Cómo cambiar el diseño del documento?
- ¿Cómo editar el formato del documento de impresión?
- Solicito modificar el diseño de las órdenes de compra
- ¿Cómo modificar el diseño de una orden de compra?
- ¿Cómo personalizar el formato de la orden de compra?
- ¿Cómo cambiar el documento de impresión de compras?
- ¿Cómo ajustar el formato de una orden de compra?
- Necesito cambiar el diseño del documento de compras
- ¿Cómo editar la impresión de la orden de compra?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, los documentos de impresión pueden personalizarse desde el **Diseñador de documentos**.  
Esto permite modificar la apariencia visual del formato, ajustar textos, reorganizar campos, agregar información visible y adaptar el documento según la necesidad de la empresa.

En el caso de documentos como **órdenes de compra**, facturas, comprobantes u otros formatos, el resultado depende del **manejador de impresión**, de la **operación** y del diseño específico que esté configurado en el documento.

##### Paso 1: Ingresar al catálogo de documentos de impresión

**Ruta:**  
**Básico → Documentos de impresión**

1. Ubica el documento que deseas modificar.
2. Si el cambio es importante, se recomienda trabajar sobre una copia o validar primero el diseño actual.

##### Paso 2: Modificar el documento

1. Haz clic derecho sobre el documento.
2. Selecciona **Modificar**.

##### Paso 3: Validar si el documento usa diseño personalizado

En la configuración del documento, verifica si está activa la opción:

**Crear un diseño personalizado a partir de la plantilla base**

📌 Si esta opción está activa, significa que el documento ya tiene una personalización y los cambios deben hacerse directamente sobre ese diseño.

##### Paso 4: Ingresar al Diseñador de documentos

**Ruta:**  
**Pestaña Diseño del documento → Diseñar documento principal**

Dentro del diseñador normalmente encontrarás:

- **Report Tree:** estructura visual del formato
- **Data Tree:** campos disponibles para ese documento
- **Subreportes o listas:** secciones repetitivas como detalle de productos, formas de cobro, liquidaciones u otros datos según el manejador

##### Paso 5: Realizar los ajustes requeridos

Dentro del diseño puedes, según el documento y el manejador:

- modificar textos fijos,
- reorganizar campos,
- mover controles,
- ajustar títulos o etiquetas,
- revisar qué variables están disponibles,
- adaptar la distribución visual del formato.

📌 No todos los documentos tienen las mismas listas ni los mismos campos disponibles.  
Por eso, el tipo de cambio que se puede hacer depende del diseño específico del documento.

##### Paso 6: Guardar y hacer una prueba

1. Guarda los cambios realizados.
2. Genera una impresión de prueba.
3. Verifica que el documento refleje correctamente el ajuste realizado.

#### Advertencia

Modificar el diseño de un documento puede afectar el formato que actualmente utiliza la empresa.  
Además, no todos los cambios se resuelven igual, ya que dependen del documento, del manejador y del diseño personalizado que tenga configurado el cliente.

#### Recomendación

Si no estás seguro de qué campos usar, qué parte del diseño debes modificar o deseas evitar afectar el formato actual, lo recomendable es crear un **tiquete de soporte** desde el botón del teléfono ubicado en la parte inferior del chat.

De esta forma, un asesor podrá revisar el documento puntual —por ejemplo la **orden de compra**— y orientarte con mayor precisión.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)

---

### ¿Es posible que un documento de impresión se vea en inglés?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS_INGLES
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_TICKET_INVITATION: TRUE
REQUIRES_RESOURCES_BLOCK: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Hay alguna manera de que el documento de impresión se vea reflejado en inglés?
- ¿Se puede poner el documento de impresión en inglés?
- ¿Cómo dejar la factura en inglés?
- ¿Cómo hacer que el formato de impresión salga en inglés?
- ¿Se puede traducir el documento de impresión?
- ¿Cómo cambiar los textos del documento a inglés?
- ¿Cómo hacer una versión en inglés del formato?
- ¿Cómo cambiar las etiquetas del documento de impresión a inglés?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, el documento de impresión **no se traduce automáticamente de forma completa a inglés**.  

Lo que normalmente se realiza es crear una **versión personalizada del formato** y cambiar manualmente las **etiquetas o textos fijos** que deban mostrarse en ese idioma.

Antes de hacer los cambios, se recomienda **duplicar el documento de impresión que actualmente está en español**, para conservar el formato original y trabajar sobre una copia.

Además, es importante tener en cuenta que:

- las **etiquetas o textos fijos** del diseño sí pueden cambiarse manualmente,
- los **campos o variables** del diseño muestran la información registrada en el sistema,
- y el **valor en letras** puede manejarse en inglés si se utiliza la variable correspondiente.

##### Paso 1: Duplicar el documento de impresión original

**Ruta:**  
**Básico → Documentos de impresión**

1. Ubica el documento que actualmente usas en español.
2. Se recomienda **duplicarlo** para conservar la versión original.
3. Trabaja los cambios sobre la copia.

📌 Esto permite mantener un formato en español y otro en inglés, sin afectar el diseño base que ya usa la empresa.

##### Paso 2: Ingresar al diseño del documento

**Ruta:**  
**Básico → Documentos de impresión → Seleccionar documento → Modificar → Diseño del documento → Diseñar documento principal**

1. Verifica si está activa la opción **Crear un diseño personalizado a partir de la plantilla base**.
2. Ingresa al diseñador del documento principal.

##### Paso 3: Cambiar etiquetas y textos fijos al idioma inglés

Dentro del diseñador, puedes modificar manualmente:

- títulos,
- subtítulos,
- nombres de columnas,
- etiquetas visibles,
- textos fijos del encabezado o del detalle.

Por ejemplo:

- **Dirección** → **Address**
- **Teléfono** → **Phone**
- **Cliente** → **Customer**

📌 Estos cambios aplican únicamente a los textos fijos del diseño.

##### Paso 4: Validar los campos o variables del documento

Es importante tener en cuenta que los **campos del sistema no se traducen automáticamente desde el diseño**.

Por ejemplo:

- si el documento usa el campo **Tercero dirección**, ese campo mostrará la dirección registrada en la ficha del tercero,
- si usa el campo **Tercero nombre**, mostrará el nombre que tenga registrado ese tercero.

Es decir, el diseño puede cambiar la etiqueta **Dirección** por **Address**, pero el contenido del campo seguirá mostrando la información que exista en el sistema.

##### Paso 5: Revisar el valor en letras

Si necesitas que el valor en letras se muestre en inglés, debes validar que el documento esté usando la **variable correspondiente en inglés**, si aplica para ese formato.

##### Paso 6: Guardar y realizar una prueba de impresión

Después de hacer los cambios:

1. Guarda el diseño.
2. Realiza una prueba de impresión.
3. Verifica qué textos quedaron en inglés y qué valores siguen dependiendo de la información registrada en el sistema.

#### Advertencia

Cambiar el idioma visual del documento **no significa que toda la información se traduzca automáticamente**.

Por esta razón, el resultado final depende de:

- qué parte del documento corresponde a **texto fijo**,
- qué parte corresponde a **variables del sistema**,
- y cómo esté construido el diseño específico del documento.

#### Recomendación

Si no estás seguro de qué elementos del formato son textos fijos y cuáles corresponden a variables del sistema, o si deseas evitar afectar el diseño original, lo recomendable es crear un **tiquete de soporte** desde el botón del teléfono ubicado en la parte inferior del chat.

De esta forma, un asesor podrá orientarte sobre cómo conservar el formato en español y construir correctamente la versión en inglés.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)

---

### ¿Cómo habilitar la impresión de documentos de egreso por medio de una nota contable?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo imprimir un comprobante de egreso desde contabilidad?  
- ¿Cómo habilitar un documento de impresión para una operación contable?  
- ¿Por qué no me aparece el documento de egreso al imprimir?  
- ¿Cómo cambio el nombre del documento de impresión?  
- ¿Cómo crear mi propio comprobante de egreso para contabilidad?  
- ¿Cómo asignar un documento a una operación?  
- ¿Qué es el manejador del documento y cómo funciona?  
- ¿Cómo duplicar un documento de impresión y adaptarlo?  
- ¿Por qué el documento no aparece en la lista de impresión?  
- Necesitamos habilitar la impresión de documentos de egreso por medio de una nota contable
- ¿Cómo crear o cambiar un documento de impresión para egresos?
- ¿Cómo hacer para imprimir un egreso desde una nota contable?
- ¿Cómo cambiar el formato del comprobante de egreso?
- ¿Cómo asignar un formato de impresión a un egreso?
- ¿Cómo hacer que aparezca un documento de impresión en una nota contable?

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Para imprimir un **comprobante de egreso** desde una operación contable, el sistema ya incluye documentos de impresión predefinidos que pueden ser usados directamente.  
Uno de ellos es:

➡️ **Comprobante de egreso – Nota débito**  
Este documento ya viene preparado para imprimirse desde operaciones de **movimiento contable**, por lo que suele ser la opción recomendada.

A continuación, se explican todas las alternativas para habilitar, modificar o adaptar este tipo de documento.

##### Opción 1: Usar un documento de impresión ya existente

📍 **Ruta:**  
**Básico > Doc. Impresión > Modificar documento**

En la lista encontrarás el documento:

- **Comprobante de egreso – Nota débito**

Este documento:

- Usa el manejador **Nota contable simple**.  
- Puede imprimirse desde operaciones contables.  
- Ya se encuentra configurado para egresos vía nota contable.

**Ejemplo visual:**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Comprobante Egreso Nota Débito](https://www.contapyme.com/conocimientocontapyme/010_BS/comprobante_egreso_nota.png)

##### Opción 2: Activar el documento para la operación deseada

Cada documento de impresión incluye una pestaña **“Aplica a”**, donde se definen las operaciones en las que es posible usarlo.

📍 **Ruta:**  
**Básico > Doc. Impresión > Modificar > Aplica a**

En esta sección encontrarás una lista de operaciones. Simplemente debes:

1. Buscar la operación correspondiente.  
2. Activar el ✔.  
3. Guardar los cambios.

**Ejemplo:**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Aplica a](https://www.contapyme.com/conocimientocontapyme/010_BS/aplica_docImpresion.png)

> Si la operación aparece en la lista, basta con activar el check y ya podrás imprimir el documento desde esa operación.

##### Opción 3: Cuando la operación NO aparece en “Aplica a”: duplicar un documento compatible

Si el documento que deseas usar **no admite** la operación que necesitas, debes duplicar uno que sí sea compatible.

Por ejemplo:

- *Nota de contabilidad simple* **sí** aplica para operaciones de movimiento contable.
- Si necesitas que el documento se llame “Comprobante de egreso”, puedes **duplicarlo** y renombrarlo.

###### Pasos:

1. En **Básico > Doc. Impresión**, ubica un documento compatible (como *Nota de contabilidad simple*).  
2. Clic derecho → **Duplicar**.  
3. Cambia:  
   - **Nombre del documento**  
   - **Título para impresión** (lo que verá el usuario al imprimir)  
4. En la pestaña **Aplica a**, activa la operación deseada.  
5. (Opcional) Marca **Crear diseño personalizado** si deseas editar el formato.

**Ejemplo del cambio de título:**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Cambiar título](https://www.contapyme.com/conocimientocontapyme/010_BS/cambiar_titulo.png)

**Ejemplo del manejador:**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Manejador documento](https://www.contapyme.com/conocimientocontapyme/010_BS/manejador_docImpresion.png)

> El manejador define con qué operaciones es compatible el documento.  
> Si una operación no aparece en la lista, significa que este manejador no la soporta, y por eso es necesario duplicar un formato compatible.

##### Opción 4 ¿Por qué a veces no aparece la operación en la lista?

Porque cada documento está asociado a un **manejador de impresión**, que define:

- El diseño base del documento.  
- Qué información puede usarse.  
- En qué operaciones es posible imprimirlo.

Por eso, un manejador de **factura**, por ejemplo, nunca aparecerá disponible para operaciones de **movimiento contable**, y viceversa.

##### Opción 5: Si necesitas apoyo adicional

Si deseas que un asesor te apoye habilitando un documento o ajustando un diseño, puedes crear un tiquete desde el botón del teléfono ubicado en la parte inferior del chat.

#### Cierre obligatorio
Al finalizar esta respuesta, Paty debe mostrar siempre el siguiente bloque de recursos, sin omitirlo.

#### 📌 Recursos adicionales 
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y de documentos impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)  


---

### ¿Por qué no aparece el número de celular en la factura y cómo corregirlo?
CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- “¿Dónde se cambia el celular del encabezado de la factura?”  
- “¿Cómo hago para que aparezca el celular del cliente en la factura?”  
- “El cliente tiene celular, pero no imprime en el documento.”  
- “¿Cuál es la variable para el celular del cliente en el diseñador?”  
- “¿Por qué el celular de mi empresa no se ve en la factura?”  
- No está apareciendo el número de celular en la factura y requiero que se muestre
- ¿Por qué no aparece el celular al imprimir la factura?
- ¿Cómo mostrar el celular en la impresión de la factura?
- ¿Cómo agregar el celular del cliente en el documento de impresión?
- ¿Cómo cambiar el teléfono por el celular en la impresión?
- ¿Cómo poner teléfono y celular en el documento de impresión?

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Es importante distinguir **qué número de celular desea mostrar**, porque existen dos ubicaciones totalmente diferentes dentro del sistema:

1️⃣ **El celular de la EMPRESA en el rótulo (encabezado del documento)**  
2️⃣ **El celular del CLIENTE (tercero) dentro del cuerpo de la factura**

Cada uno se configura y se imprime de manera distinta. A continuación se explica cómo corregir cada caso.

##### Paso 1. Cuando el celular que se desea mostrar es el de la EMPRESA (rótulo)

El encabezado del documento toma su información desde el rótulo configurado en la empresa.

📍 **Ruta:**  
**Básico → Empresa → Modificar empresa → Rótulo**

Allí debe verificar:

- Que el número de celular esté diligenciado en el campo "Detalle" del rótulo.  
- Que el documento esté configurado con **Tipo de encabezado: Rótulo** (si se usa Logotipo, no se mostrarán datos como teléfonos, dirección, etc.).  
- Si el documento tiene diseño personalizado, validar que el rótulo esté incluido o que el diseñador tenga un objeto que muestre esa información.

##### Paso 2. Cuando el celular que se desea mostrar es el del CLIENTE (tercero)

Si el celular que se requiere mostrar es el del cliente de la factura, debe revisarse lo siguiente:

###### ✔ A. Validar que el tercero sí tenga un celular registrado

📍 **Ruta:**  
**Básico → Terceros → Modificar → Datos de contacto**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Celular tercero](https://www.contapyme.com/conocimientocontapyme/010_BS/celular_tercero.png)

Si el celular está vacío, el sistema no tendrá información para imprimir.

###### ✔ B. Revisar la variable usada en el diseñador del documento

En el documento de impresión que usa para las facturas, el campo “TELÉFONO” puede estar usando únicamente la variable:

- `Tercero_teléfono`

Si se requiere mostrar el celular del cliente, se debe usar:

- `Tercero celular/móvil`  
  **DataField:** `Tercero_TCelular`

📍 **Ruta:**  
**Básico → Doc. Impresión → Modificar → Diseño del documento**

Ejemplo de cambio de variable:

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Cambio variable](https://www.contapyme.com/conocimientocontapyme/010_BS/cambio_variable_diseno.png)

###### ✔ C. Agregar el celular como un campo adicional (si desea mostrar teléfono y celular)

Si el usuario desea visualizar ambos teléfonos:

1. Copiar un campo existente (por ejemplo el de teléfono).  
2. Pegar en la ubicación deseada.  
3. Cambiar su variable a **Tercero celular/móvil**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Agregar variable nueva](https://www.contapyme.com/conocimientocontapyme/010_BS/agregar_variableNueva_diseno.png)


##### Paso 3. ¿Necesita ayuda adicional?

Si deseas que un asesor revise tu diseño, puedes crear un tiquete desde el botón del teléfono que aparece abajo en el chat. Estaremos encantados de ayudarte.

#### Cierre obligatorio
Al finalizar esta respuesta, Paty debe mostrar siempre el siguiente bloque de recursos, sin omitirlo.

#### 📌 Recursos adicionales 
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y de documentos impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)  

---

### ¿Es posible que en el documento de cotización aparezcan las retenciones (retención y reteica)?
CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- Hay opcion en el documento de cotización que aparezca los descuentos de impuestos como la retención y reteica.
- ¿se pueden calcular retenciones en la cotización?  
- ¿Cómo mostrar retenciones en el documento de cotización?
- ¿Por qué no salen las retenciones en la cotización?
- ¿Se puede ver retefuente o reteica en la cotización?
- ¿Cómo hacer para que la cotización muestre retención?
- ¿Las retenciones pueden salir en el documento de impresión de cotización?
- ¿Por qué la cotización no muestra reteica?
- ¿Se puede imprimir la retención en una cotización?
- ¿Cómo agregar retención al formato de cotización?

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, **las cotizaciones no muestran retenciones como retención en la fuente o reteica**, ya que estos impuestos se manejan bajo el principio de **contabilidad de causación** y **normalmente se generan al momento del pago o abono de una factura**, no en la cotización.

##### ¿Por qué las retenciones no aparecen en la cotización?

La **cotización** es un documento **informativo y comercial**, no contable.  
Por esta razón:

- 💰 Las **retenciones y la reteica** solo se calculan y contabilizan:
  - Cuando se **registra la factura**
  - Y especialmente cuando se realiza un **abono o pago**
- 📄 En una cotización **no existe todavía una obligación contable**, por lo tanto:
  - ❌ No aplica retención en la fuente  
  - ❌ No aplica reteica  

En la cotización **solo es posible visualizar**:
- ✅ El **IVA**
- ✅ Los **descuentos comerciales** aplicados al precio


---

### ¿Qué impuestos pueden mostrarse en una cotización?
CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué impuestos se pueden ver en la cotización?
- ¿Cómo mostrar impuestos en el documento de cotización?
- ¿Qué impuestos puede imprimir una cotización?
- ¿Cómo agregar impuestos a la impresión de la cotización?
- ¿Se puede mostrar INC en la cotización?
- ¿Se pueden mostrar impuestos saludables en la cotización?
- ¿Qué columnas de impuestos se pueden activar en la cotización?
- ¿Cómo hacer para que la cotización muestre otros impuestos además del IVA?

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Además del IVA, ContaPyme permite **habilitar otros impuestos que sí aplican en la cotización**, como por ejemplo:

- **Impuesto Nacional al Consumo (INC)**
- **Impuestos saludables (ICUI - IBUA)**

##### ¿Cómo habilitar estos impuestos en la cotización?

Estos impuestos se pueden mostrar configurando las columnas del documento:

1.  Ingresa a la **configuración de la operación** de cotización.  
2.  Ve a la opción:  
   `Lista de elementos → Columnas del listado`.  

3. ✔ Activa las columnas correspondientes a:
   - Impuesto Nacional al Consumo  
   - Impuestos saludables  
4. 💾 Guarda los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Configuración columnas de cotización](https://www.contapyme.com/conocimientocontapyme/010_BS/columnas_cotizacion.png)

A partir de ese momento, estos impuestos se verán reflejados en el documento de cotización.

#### 💡 Recomendaciones

- 📌 Recuerda: **las retenciones no aplican en cotizaciones**, solo en facturas y pagos.  
- ✅ Usa la cotización como herramienta comercial y la factura como documento contable.  
- ⚠️ Si necesitas ver el efecto de las retenciones, debes revisar la factura y su respectivo abono.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)


---

### Al imprimir la factura no aparece la dirección del cliente, ¿cómo se puede solucionar?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- No se muestra la dirección del tercero en la POS   
- En el momento de imprimir la factura no sale la dirección
- ¿Por qué no sale la dirección del cliente al imprimir?
- ¿Cómo mostrar la dirección del cliente en la factura?
- ¿Cómo hacer para que la factura imprima la dirección del tercero?
- ¿Por qué no aparece la dirección en el documento de impresión?
- ¿Cómo agregar la dirección del cliente en la factura?
- ¿Cómo poner la dirección del tercero en la impresión?
- ¿Cómo hacer que salga la dirección en el formato de factura?

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si al imprimir la factura **no aparece ninguna dirección**, en la mayoría de los casos el problema es que el cliente (tercero) **no tiene registrada la dirección** en el sistema. La solución es sencilla y solo requiere verificar y actualizar la información del tercero.

##### Paso 1: Verificar la dirección del cliente

**Ruta:**  
`Básico → Catálogo de terceros → Selecciona el cliente → Clic derecho → Modificar`

1. En el **formulario rápido**, ubica el campo **Dirección**.
2. Verifica si el campo está vacío o incompleto.
3. Ingresa la dirección correcta del cliente.
4. Guarda los cambios.

📌 **Importante:**  
Si el cliente no tiene dirección registrada, ContaPyme **no puede imprimirla** en la factura, aunque el documento de impresión esté correctamente configurado.

✅ **Resultado:**  
Al volver a imprimir la factura, la dirección aparecerá correctamente.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)


---

### El cliente tiene asociada una dirección, pero en la factura aparece otra, ¿qué hacer?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- La factura muestra una dirección incorrecta del cliente   
- El correo del cliente está bien registrado en el sistema, pero al imprimir la factura sale mal. 
- ¿Por qué sale otra dirección en la factura?
- ¿Cómo corregir la dirección que aparece mal en el documento de impresión?
- ¿Por qué la factura muestra una dirección fija y no la del cliente?
- ¿Cómo cambiar la dirección que sale en la factura?
- ¿Cómo corregir una dirección escrita manualmente en el diseño?
- ¿Por qué imprime una dirección diferente a la del tercero?
- ¿Cómo hacer para que tome la dirección real del cliente al imprimir?

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando el cliente tiene la dirección bien registrada, pero en la factura **aparece una dirección diferente o incorrecta**, el problema normalmente está en el **diseño del documento de impresión**. Esto sucede cuando la dirección fue escrita manualmente dentro del diseño.

##### Paso 1: Verificar el documento de impresión

**Ruta:**  
`Básico → Documentos de impresión → Selecciona el documento → Modificar`

Revisa si el documento tiene una dirección escrita manualmente. Si es así, todas las facturas mostrarán esa misma dirección, sin importar el cliente.

##### Paso 2: Revisar o corregir el diseño del documento

**Ruta:**  
`Básico → Documentos de impresión → Modificar  
→ Pestaña Diseño del documento → Diseñar documento principal`

###### Opción A: Restablecer el diseño original (recomendado)
- Haz clic en **Restablecer diseño original**.
- El sistema devolverá el formato estándar de ContaPyme.
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Restablecer diseño original](https://www.contapyme.com/conocimientocontapyme/010_BS/restablecer_diseño.png)


⚠️ Ten en cuenta que esta opción elimina cualquier personalización previa del diseño.

###### Opción B: Corregir la dirección usando la variable correcta

Si deseas conservar el diseño personalizado:

1. Elimina la dirección que esté escrita manualmente.
2. En el panel derecho del diseñador, busca:
   - **Datos encabezado → Tercero Dirección**
3. Arrastra esta variable al lugar donde debe ir la dirección.
4. Cierra el diseñador con la **X**.
5. Clic en **Aceptar** para guardar los cambios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Variable tercero Dirección](https://www.contapyme.com/conocimientocontapyme/010_BS/tercero_direccion.png)


✅ **Resultado:**  
La factura mostrará automáticamente la **dirección correcta de cada cliente**.

#### 💡 Recomendaciones finales

- ✅ Siempre registra correctamente la dirección del cliente antes de facturar.
- 🧾 Evita escribir direcciones manualmente en los diseños de impresión.
- 🎨 Usa siempre las variables del sistema para que la información cambie según el cliente.
- ⚠️ Si el problema persiste, crea un **tiquete de soporte** 

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)

---

### ¿Es posible crear dos columnas de detalle (Detalle 1 y Detalle 2) en el diseño de la factura electrónica?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo agregar más columnas de detalle en la factura electrónica?  
- ¿Puedo mostrar Detalle 1 y Detalle 2 en la factura?  
- ¿Cómo agregar campos adicionales por producto en el diseño de la factura?  
- ¿Cómo mostrar los campos Dato 1 y Dato 2 en la factura?  
- Necesito agregar otra columna de detalle en la factura electrónica
- ¿Cómo agregar más campos en el detalle de la factura?
- ¿Cómo poner dos detalles en el documento de impresión?
- ¿Cómo agregar columnas adicionales en el formato de factura?
- ¿Cómo mostrar más información por producto en la factura?
- ¿Cómo agregar dos columnas personalizadas en la factura?
- ¿Cómo poner más datos en el detalle del documento de impresión?
- ¿Cómo ampliar las columnas del detalle en la factura?

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Sí, es posible agregar **columnas adicionales de detalle** en el **diseño de la factura electrónica**.  
Sin embargo, **lo que se puede mostrar en el diseño depende de cómo esté configurada la factura**, ya sea a nivel general o por producto.

A continuación se explica cómo funciona desde el **Diseñador de documentos**.

##### ¿De qué depende lo que puedo agregar en el diseño?

El diseñador **no crea información nueva**; únicamente **muestra campos que ya estén disponibles en la factura**.  
Por eso, antes de agregar una columna, es importante que el campo exista y esté habilitado en la operación.

En términos generales, los detalles pueden estar configurados:

- A **nivel general de la factura** (un solo valor para todo el documento), o  
- A **nivel de producto** (un valor diferente por cada ítem).

##### Ejemplo: agregar Detalle 1 y Detalle 2 por producto en el diseño

Cuando los detalles están definidos **por producto**, el sistema dispone de campos como:

- **Ventas: Dato 1**
- **Ventas: Dato 2**
- **Ventas: Valor 1**
- **Ventas: Valor 2**

Estos campos pueden agregarse como columnas en el detalle de la factura desde el diseñador.

**Pasos generales en el Diseñador de documentos:**

1. Ingresar a **Básico → Documentos de impresión → Modificar documento**.  
2. Abrir la pestaña **Diseño del documento** y seleccionar **Diseñar documento principal**.  
3. Ubicar la sección **ListaElementosFactura**.  
4. Desde el **Data Tree (Campos disponibles panel derecho)**, arrastrar los campos requeridos (por ejemplo *Ventas: Dato 1* y *Ventas: Dato 2*).  
5. Ajustar su posición y ancho para que funcionen como columnas de **Detalle 1** y **Detalle 2**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
**Ejemplo – Campos adicionales por producto en el diseñador**  
![Campos adicionales por producto en el diseñador](https://www.contapyme.com/conocimientocontapyme/010_BS/imagen_campos_adicionales_producto_disenador.png)

📌 *La cantidad de caracteres visibles dependerá del campo utilizado y del ancho asignado en el diseño.*

#### Recomendación importante

Aunque **sí es posible agregar estas columnas en el diseño**, el resultado final depende de:

- Cómo estén configurados los campos en la factura.  
- Qué tipo de campo se esté usando (Dato o Valor).  
- El espacio disponible en el diseño sin afectar la estructura del documento electrónico.

Por este motivo, se recomienda crear un **tiquete de soporte**, para que un asesor valide tu configuración y te apoye ajustando el diseño según tu necesidad específica.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)


---

### En la impresora de tirilla no sale la factura completa cuando es muy larga, ¿cómo se puede solucionar?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Por qué la factura se corta y no imprime completa en la impresora de tirilla?  
- ¿Por qué la impresora POS no imprime toda la factura cuando tiene muchos productos?  
- ¿La factura es muy larga y la impresora solo imprime una parte, qué debo revisar?  
- ¿Por qué la factura sale cortada al imprimir?
- ¿Cómo hacer para que la tirilla imprima completa?
- ¿Por qué el documento de impresión no sale completo en POS?
- ¿Cómo corregir una factura larga que se corta al imprimir?
- ¿Cómo ajustar el formato de impresión para tirilla?
- ¿Por qué no sale toda la impresión en la impresora térmica?
- ¿Cómo configurar el documento de impresión para tirilla?
- ¿Cómo hacer que la factura no se corte en la impresora POS? 

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando una factura **no se imprime completa en una impresora de tirilla (POS)**, normalmente el problema está en la **configuración del diseño de impresión**, el **tamaño del papel** o el **driver de la impresora**. A continuación te explico, paso a paso, cómo revisarlo y corregirlo.


##### Paso 1: Verificar el tamaño del papel en Windows

Primero asegúrate de que la impresora esté configurada correctamente en el sistema operativo.

**Ruta en Windows:**  
`Panel de control → Dispositivos e impresoras → Clic derecho sobre la impresora → Preferencias de impresión`

1. Verifica que el **tamaño de papel** esté configurado como:
   - Rollo / Continuo  
   - 58 mm o 80 mm (según la impresora)
2. Desactiva opciones como:
   - Tamaño fijo de hoja
   - Cortes automáticos por página
3. Guarda los cambios.

📌 **Importante:**  
Las impresoras de tirilla deben trabajar en **papel continuo**, no en tamaño carta u oficio.


##### Paso 2: Verificar el documento de impresión en ContaPyme

Ahora revisa que el documento de impresión no tenga márgenes personalizadas

**Ruta:**  
`Básico → Documentos de impresión → Selecciona el documento → Modificar`

- Confirma que en la pestaña "opciones de impresión" no tenga márgenes indicadas.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Márgenes](https://www.contapyme.com/conocimientocontapyme/010_BS/margen_doc.png)

##### Paso 3: Revisar el diseño del documento de impresión

Si el documento está personalizado, revisa el diseño.

**Ruta:**  
`Básico → Documentos de impresión → Modificar 
→ Pestaña Diseño del documento → Diseñar documento principal`

###### Qué debes revisar en el diseño:

- ❌ No usar un alto de página fijo.
- ❌ No usar saltos de página manuales.
- ✅ El detalle de productos debe crecer automáticamente.
- ✅ El pie de factura debe quedar después del detalle, sin posiciones fijas.

Por defecto así viene configurado el documento de impresión, por lo que se recomienda restablecerlo:

**Ruta:**  
`Básico → Documentos de impresión → Modificar 
→ Pestaña Diseño del documento → Restablecer diseño original.
- Haz clic en **Restablecer diseño original**.
- El sistema devolverá el formato estándar de ContaPyme.
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Restablecer diseño original](https://www.contapyme.com/conocimientocontapyme/010_BS/restablecer_diseño.png)


##### Paso 4: Probar con una factura larga

1. Imprime una factura con varios productos.
2. Verifica que:
   - No se corte la impresión.
   - El total y los datos finales sí aparezcan.
3. Ajusta el diseño si es necesario.

##### 💡 Recomendaciones finales

- ✅ Usa siempre documentos de impresión diseñados específicamente para tirilla.
- 🖨️ Mantén actualizado el driver de la impresora.
- 📏 Verifica siempre el ancho correcto (58 mm o 80 mm).
- ⚠️ Si el diseño fue personalizado y no logras ajustarlo, crea un **tiquete de soporte** indicando:
  - Modelo de la impresora
  - Tipo de papel
  - Documento de impresión usado
  - Ejemplo de factura que se corta

##### Opción 5: Si necesitas apoyo adicional

Si deseas que un asesor te apoye ajustando un diseño, puedes crear un tiquete desde el botón del teléfono ubicado en la parte inferior del chat.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)


---

## Comprobantes de nómina (colilla de pago)

### ¿Cómo agregar un espacio de firma (línea y texto “Firma”) en la colilla de pago de nómina?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Cómo poner espacio de firma en la colilla de nómina?  
- ¿Cómo agregar la línea de firma al comprobante de pago?  
- ¿Cómo dejar un espacio para que el empleado firme la colilla?  
- ¿Cómo poner “Firma” al final del comprobante de nómina?  
- Necesito que la colilla de pago tenga espacio para la firma del empleado

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme es posible agregar un **espacio de firma** en la colilla de pago de nómina para que el empleado firme el comprobante una vez impreso.  
Este espacio se configura directamente desde el **Diseñador de documentos**, agregando una **línea** y el texto **“Firma”** en la parte inferior del comprobante.

##### Paso 1: Ingresar al documento de impresión de nómina

**Ruta:**  
**Básico → Documentos de impresión → Seleccionar comprobante de nómina → Modificar**

1. Ubica el documento utilizado para imprimir la **colilla de pago de nómina**.  
2. Verifica que corresponda al **comprobante de pago de nómina**.

**Ejemplo – Documento de impresión de nómina**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Documento impresión nómina](https://www.contapyme.com/conocimientocontapyme/010_BS/imagen_doc_impresion_nomina.png)

##### Paso 2: Abrir el Diseñador de documentos

1. Ingresa a la pestaña **Diseño del documento**.  
2. Activa la opción **Crear un diseño personalizado a partir de la plantilla base**, si aún no está marcada.  
3. Haz clic en **Diseñar documento principal**.

📌 *Se recomienda ubicar el espacio de firma en la parte inferior del documento.*

**Ejemplo – Diseño personalizado activo**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Diseño personalizado nómina](https://www.contapyme.com/conocimientocontapyme/010_BS/imagen_diseno_personalizado_nomina.png)

##### Paso 3: Agregar la línea de firma

Dentro del diseñador:

1. Ubícate en la parte inferior del comprobante.  
2. Inserta una **línea horizontal** que represente el espacio donde el empleado firmará.  
3. Ajusta su ancho, alineación y posición según el diseño del documento.

**Ejemplo – Línea de firma en el diseñador**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Linea firma diseñador](https://www.contapyme.com/conocimientocontapyme/010_BS/imagen_linea_firma_disenador.png)

##### Paso 4: Agregar los textos de firma e identificación del empleado

Dentro del Diseñador de documentos:

1. Haz clic en el botón **A (Etiqueta de texto)** ubicado en la barra superior del diseñador.
2. Haz clic en la parte inferior del comprobante.
3. Agrega las siguientes etiquetas de texto:
   - **FIRMA DE RECIBIDO**
   - **C.C. o NIT**
4. Ubica cada texto en la posición deseada:
   - El texto **FIRMA DE RECIBIDO** encima de la línea de firma.
   - El texto **C.C. o NIT** debajo de la línea de firma.
5. Ajusta tamaño de letra y alineación según el diseño del documento.
6. Cierra el diseñador con la X y luego clic en Aceptar para guardar.

📌 *Ambos textos son etiquetas fijas y se agregan utilizando el mismo control de texto.*

**Ejemplo – Textos de firma e identificación en el diseñador**  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Textos firma y CC](https://www.contapyme.com/conocimientocontapyme/010_BS/imagen_textos_firma_cc.png)

##### Resultado esperado

- La colilla de pago mostrará un **espacio de firma** al final del documento.  
- El empleado podrá firmar manualmente el comprobante impreso.

##### ¿Necesitas ayuda con el diseño?

Si deseas que un asesor revise la ubicación o presentación del espacio de firma en tu colilla de nómina, puedes crear un **tiquete de soporte** desde el botón del teléfono ubicado en la parte inferior del chat.

---

### ¿Qué hacer cuando en la impresión de una cotización o factura la descripción y la cantidad se unen o se mezclan?

CANONICAL_ID: PF_DISENADOR_DOCUMENTOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- En la impresión de la cotización la descripción y la cantidad se mezclan
- En la impresión de la cotización las letras de descripción y cantidad se unen
- En la cotización la descripción y la cantidad salen pegadas
- El texto de descripción y cantidad se ve distorsionado en la impresión
- En la factura las columnas de descripción y cantidad se cruzan
- Las cantidades no se ven bien porque se montan con la descripción
- En el documento impreso los campos están muy juntos
- La impresión sale descuadrada en la parte de descripción y cantidad
- ¿Por qué en la impresión se unen la descripción y la cantidad?
- ¿Cómo corregir un diseño donde los campos se montan entre sí?
- La descripción invade el campo de cantidad en la impresión
- El diseño del documento se ve corrido en el detalle
- En la cotización se mezclan los datos del detalle al imprimir
- ¿Cómo ajustar el espacio entre descripción y cantidad en el diseño?
- ¿Qué hacer si los campos del detalle se superponen en la impresión?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando en la impresión de una **cotización, factura u otro documento** la **descripción y la cantidad se unen, se cruzan o se ven distorsionadas**, normalmente el inconveniente está relacionado con el **diseño del documento de impresión**.

Este tipo de comportamiento suele estar asociado a la distribución de los campos dentro del diseño, por ejemplo cuando el espacio entre columnas es insuficiente, el ancho de un campo invade otro o la ubicación de los controles requiere ajuste.

📌 **Importante:**  
Este tipo de revisión no suele corresponder a una configuración general del sistema, sino a un **ajuste del diseño personalizado del documento**, por lo que la solución puede variar según el formato específico que tenga cada empresa.

---

##### ¿Qué puedes revisar de forma general?

**Ruta:**  
`Básico → Documentos de impresión → Seleccionar documento → Modificar → Diseño del documento → Diseñar documento principal`

Dentro del diseñador, de forma general puedes validar:

1️⃣ Si los campos de **descripción** y **cantidad** están muy cerca entre sí.  
2️⃣ Si el campo de descripción tiene un ancho que invade el espacio de la cantidad.  
3️⃣ Si el detalle del documento quedó ajustado con poco espacio disponible.  
4️⃣ Si el diseño tiene configuraciones personalizadas que hacen que el texto se monte o se vea distorsionado.

📌 En algunos casos, la corrección puede requerir:
- mover la posición de los campos,
- ampliar el espacio entre columnas,
- ajustar el ancho del campo,
- o aplicar configuraciones adicionales en el diseño.

---

#### Recomendación importante

Como este tipo de cambio depende del **modelo de diseño** que tenga configurado el cliente, y puede requerir una revisión más precisa del documento, lo más recomendable es **crear un tiquete de soporte** para que un asesor revise el diseño puntual y realice la orientación correspondiente.

Puedes hacerlo desde el **botón verde del teléfono** que aparece en la parte inferior del chat.

---

#### Observación final

Paty puede orientar de forma general sobre el origen del problema, pero en este tipo de casos no debe asumir una corrección exacta, ya que el ajuste depende del diseño específico del documento y de cómo estén ubicados los campos dentro del formato personalizado.

#### 📌 Recursos adicionales
**Plataforma de capacitación:**  
[Videos: Plataforma con vídeos de capacitación sobre Empresa, documentos de soporte y documentos de impresión](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD610)  
[Videos: Plataforma con vídeos de capacitación sobre Personalización de documentos de impresión](https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD360)


---

