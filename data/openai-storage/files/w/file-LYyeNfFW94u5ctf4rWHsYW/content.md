# gen_ambiguedades.md
> **Propósito:**  
> Ayudar a **Paty IA** a identificar consultas ambiguas, incompletas o demasiado generales dentro de **ContaPyme®**, para solicitar la aclaración mínima necesaria antes de continuar con el flujo correcto.
>
> **Tipo de documento:** Conocimiento base  
> **Función:** Desambiguación funcional  
> **Versión:** 1.0  
> **Fecha:** 2026/04/15

---

## Cómo debe usarlo Paty

Este archivo no debe usarse para responder procesos completos.

Su función es ayudar a Paty a:

- detectar términos ambiguos o demasiado generales
- identificar interpretaciones válidas dentro del sistema
- reconocer el dato faltante más importante
- formular una pregunta breve, clara y útil
- presentar opciones reales cuando existan varias interpretaciones posibles

### Reglas de uso

1. No asumir el proceso si todavía hay más de una interpretación válida.
2. Pedir solo el dato más determinante para continuar.
3. Si existen varias opciones reales y documentadas, presentarlas de forma breve y clara.
4. No mezclar demasiadas preguntas en una sola respuesta.
5. No incluir opciones que no correspondan a procesos reales del sistema.
6. Si no encuentra una desambiguación clara, pedir contexto de forma general pero útil, por ejemplo sobre:
   - módulo
   - proceso
   - tipo de documento
   - tipo de operación
   - tipo de informe
   - tipo de liquidación
   - ventana o funcionalidad específica

---

## Términos ambiguos frecuentes

### Término ambiguo: vender

**Cómo puede expresarlo el usuario:**
- vender
- hacer una venta
- registrar una venta
- facturar una venta
- pasar una venta

**Posibles interpretaciones válidas en ContaPyme:**
- factura de venta
- venta por POS
- ingreso por servicios

**Módulos o procesos relacionados:**
- Facturación
- Inventarios y Facturación

**Dato mínimo que falta para responder:**
- tipo de proceso comercial que desea realizar

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques a qué tipo de venta te refieres: ¿factura de venta, venta por POS, ingreso por servicios,

---

### Término ambiguo: compra

**Cómo puede expresarlo el usuario:**
- compra
- registrar una compra
- hacer una compra
- factura de compra
- comprar

**Posibles interpretaciones válidas en ContaPyme:**
- compra de inventario
- compra de servicios o gastos

**Módulos o procesos relacionados:**
- Inventarios
- Gastos

**Dato mínimo que falta para responder:**
- si la compra corresponde a inventario, gasto o documento previo

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques si la compra que deseas registrar corresponde a inventario, a un gasto o a un documento previo como orden de compra o recepción de materiales.

---

### Término ambiguo: liquidar

**Cómo puede expresarlo el usuario:**
- liquidar
- hacer una liquidación
- liquidación
- liquidar pago
- liquidar contrato
- liquidar prima
- liquidar cesantías
- Liquidar impuestos
- Liquidar comisiones

**Posibles interpretaciones válidas en ContaPyme:**
- pago de nómina
- liquidación de contrato
- liquidación de prestaciones sociales
- liquidación de impuestos en una operación comercial
- liquidacion de comisiones en una venta o abono a cuentas por cobrar

**Módulos o procesos relacionados:**
- Nómina
- Facturación
- Ingresos
- Gastos
- inventarios
- contabilidad

**Dato mínimo que falta para responder:**
- tipo de liquidación

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques a cuál tipo de liquidación te refieres: ¿pago de nómina, liquidación de contrato, liquidación de prestaciones o liquidación de impuestos en una operación?

---

### Término ambiguo: pagar

**Cómo puede expresarlo el usuario:**
- pagar
- registrar un pago
- hacer un pago
- pagar por banco
- pagar una cuenta

**Posibles interpretaciones válidas en ContaPyme:**
- pago a proveedores
- pago de cuentas por pagar
- pago de nómina
- pago por bancos
- pago asociado a gastos

**Módulos o procesos relacionados:**
- Cartera y Proveedores
- Nómina
- Gastos
- Contabilidad

**Dato mínimo que falta para responder:**
- tipo de pago que quiere registrar

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques qué tipo de pago deseas registrar: ¿pago a proveedor, cuenta por pagar, nómina, pago por bancos o un gasto?

---

### Término ambiguo: factura

**Cómo puede expresarlo el usuario:**
- factura
- hacer una factura
- registrar una factura
- ver una factura
- corregir una factura

**Posibles interpretaciones válidas en ContaPyme:**
- factura de venta
- factura de compra
- factura electrónica
- consulta de facturas
- ajuste mediante nota crédito o nota débito

**Módulos o procesos relacionados:**
- Facturación
- Inventarios y Facturación
- Gastos

**Dato mínimo que falta para responder:**
- si desea crear, consultar, corregir o interpretar una factura y de qué tipo

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques si te refieres a una factura de venta, una factura de compra o a un proceso de consulta o corrección sobre una factura ya registrada.

---

### Término ambiguo: documento

**Cómo puede expresarlo el usuario:**
- documento
- generar documento
- corregir documento
- enviar documento
- revisar documento

**Posibles interpretaciones válidas en ContaPyme:**
- factura electrónica
- nómina electrónica
- documento soporte
- nota crédito
- nota débito
- documento interno o administrativo

**Módulos o procesos relacionados:**
- Facturación
- Nómina
- Gastos
- Básico

**Dato mínimo que falta para responder:**
- tipo de documento al que se refiere

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques a qué tipo de documento te refieres: ¿factura electrónica, nómina electrónica, documento soporte, nota crédito, nota débito o un documento interno?

---

### Término ambiguo: gasto

**Cómo puede expresarlo el usuario:**
- gasto
- registrar un gasto
- hacer un gasto
- pagar un gasto
- documento soporte

**Posibles interpretaciones válidas en ContaPyme:**
- operación de gasto
- pago asociado a un gasto
- gasto diferido
- documento soporte a no obligados

**Módulos o procesos relacionados:**
- Gastos

**Dato mínimo que falta para responder:**
- tipo de gasto o documento que desea registrar

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques si deseas registrar un gasto normal, un gasto diferido, un pago asociado o un documento soporte.

---

### Término ambiguo: cartera

**Cómo puede expresarlo el usuario:**
- cartera
- revisar cartera
- ver cartera
- estado de cartera
- cartera de clientes

**Posibles interpretaciones válidas en ContaPyme:**
- informe de cartera por edades
- estado de cuenta por tercero
- cuentas por cobrar
- cuentas por pagar

**Módulos o procesos relacionados:**
- Cartera y Proveedores

**Dato mínimo que falta para responder:**
- si desea consultar cuentas por cobrar, por pagar o un informe específico

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques si deseas consultar cuentas por cobrar, cuentas por pagar o un informe específico de cartera, como cartera por edades o estado de cuenta.

---

### Término ambiguo: informe

**Cómo puede expresarlo el usuario:**
- sacar informe
- ver informe
- generar informe
- consultar reporte
- mirar reporte

**Posibles interpretaciones válidas en ContaPyme:**
- informe contable
- informe de ventas
- informe de cartera
- informe de inventarios
- informe de nómina
- informe tributario

**Módulos o procesos relacionados:**
- Contabilidad
- Inventarios y Facturación
- Cartera y Proveedores
- Nómina
- Gastos

**Dato mínimo que falta para responder:**
- área o tipo de informe que necesita

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques qué tipo de informe deseas consultar: ¿contable, ventas, cartera, inventarios, nómina o tributario?

---

### Término ambiguo: ingreso

**Cómo puede expresarlo el usuario:**
- ingreso
- registrar ingreso
- hacer un ingreso

**Posibles interpretaciones válidas en ContaPyme:**
- ingreso por servicios
- ingreso recibido por anticipado
- operación comercial asociada a facturación

**Módulos o procesos relacionados:**
- Facturación
- Inventarios y Facturación

**Dato mínimo que falta para responder:**
- tipo de ingreso que desea registrar

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques si te refieres a un ingreso por servicios o a un ingreso recibido por anticipado.

---

### Término ambiguo: ajuste

**Cómo puede expresarlo el usuario:**
- ajuste
- hacer un ajuste
- ajustar documento
- ajustar inventario
- ajustar valor

**Posibles interpretaciones válidas en ContaPyme:**
- ajuste de inventario
- nota crédito
- nota débito
- nota de ajuste DSNO
- ajuste contable

**Módulos o procesos relacionados:**
- Inventarios
- Facturación
- Gastos
- Contabilidad

**Dato mínimo que falta para responder:**
- sobre qué documento o proceso desea hacer el ajuste

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques sobre qué deseas hacer el ajuste: ¿inventario, factura, documento soporte o un movimiento contable?

---

### Término ambiguo: devolución

**Cómo puede expresarlo el usuario:**
- devolución
- devolver producto
- registrar devolución
- hacer una devolución

**Posibles interpretaciones válidas en ContaPyme:**
- devolución en ventas
- devolución en compras
- devolución de remisión
- devolución de recepción de materiales

**Módulos o procesos relacionados:**
- Inventarios y Facturación
- Inventarios Plus
- Gastos

**Dato mínimo que falta para responder:**
- si la devolución corresponde a ventas, compras o documento previo

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques si la devolución que deseas registrar corresponde a una venta, una compra o a un documento previo como remisión o recepción de materiales.

---

### Término ambiguo: usuario

**Cómo puede expresarlo el usuario:**
- usuario
- crear usuario
- permisos
- dar acceso
- rol

**Posibles interpretaciones válidas en ContaPyme:**
- creación o administración de usuarios
- configuración de perfiles de usuario
- permisos o restricciones de acceso

**Módulos o procesos relacionados:**
- Básico

**Dato mínimo que falta para responder:**
- si necesita crear un usuario o modificar permisos o perfiles

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques si deseas crear un usuario, modificar un perfil o ajustar permisos de acceso.

---

### Término ambiguo: banco

**Cómo puede expresarlo el usuario:**
- banco
- pagar por banco
- archivo bancario
- transferencia
- conciliación bancaria

**Posibles interpretaciones válidas en ContaPyme:**
- pago por bancos
- conciliación bancaria
- cuentas bancarias de terceros
- movimiento entre caja y banco

**Módulos o procesos relacionados:**
- Cartera y Proveedores
- Contabilidad
- Gastos
- Básico

**Dato mínimo que falta para responder:**
- si desea pagar, conciliar o configurar información bancaria

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques si te refieres a pago por bancos, conciliación bancaria, configuración de cuentas bancarias o movimientos entre caja y banco.

---

### Término ambiguo: producto

**Cómo puede expresarlo el usuario:**
- producto
- crear producto
- artículo
- referencia
- elemento

**Posibles interpretaciones válidas en ContaPyme:**
- creación de elemento
- Creación de un produto tipo servicio
- configuración de inventario
- producto compuesto
- listas de precios

**Módulos o procesos relacionados:**
- Facturación
- Inventarios y Facturación

**Dato mínimo que falta para responder:**
- si desea crear, configurar o consultar el producto

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques si deseas crear un producto, configurarlo o consultar información relacionada, como precios o existencias.

---

### Término ambiguo: nómina

**Cómo puede expresarlo el usuario:**
- nómina
- hacer nómina
- pagar nómina
- reportar nómina
- ajustar nómina

**Posibles interpretaciones válidas en ContaPyme:**
- pago de nómina
- novedades de nómina
- reporte de nómina electrónica
- ajuste de nómina electrónica
- consulta de pagos o conceptos

**Módulos o procesos relacionados:**
- Nómina

**Dato mínimo que falta para responder:**
- tipo de proceso de nómina que desea realizar

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques a qué proceso de nómina te refieres: ¿pago de nómina, novedades, reporte de nómina electrónica, ajuste o consulta?

---

### Término ambiguo: ventas

**Cómo puede expresarlo el usuario:**
- ventas
- revisar ventas
- hacer ventas
- controlar ventas

**Posibles interpretaciones válidas en ContaPyme:**
- registrar una venta
- facturación POS
- informe de ventas
- facturación mensual por cliente
- cuadre diario de ventas

**Módulos o procesos relacionados:**
- Facturación
- Inventarios y Facturación
- Análisis e Indicadores

**Dato mínimo que falta para responder:**
- si desea registrar, consultar o analizar ventas

**Pregunta sugerida de aclaración:**
> Para orientarte mejor, necesito que me indiques si deseas registrar una venta, facturar en POS o consultar un informe o análisis de ventas.

---

### Término ambiguo: servicios electrónicos

**Cómo puede expresarlo el usuario:**
- servicios electrónicos
- documentos electrónicos
- envío electrónico
- plan de documentos

**Posibles interpretaciones válidas en ContaPyme:**
- facturación electrónica
- nómina electrónica
- documento soporte
- eventos electrónicos
- planes o servicios asociados

**Módulos o procesos relacionados:**
- Facturación
- Nómina
- Gastos
- Comercial

**Dato mínimo que falta para responder:**
- si se refiere a un proceso funcional del sistema o a información comercial del servicio

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques si te refieres a un proceso funcional como facturación, nómina o documento soporte, o a información comercial de los servicios electrónicos.

---

### Término ambiguo: comisiones

**Cómo puede expresarlo el usuario:**
- comisiones
- manejar comisiones
- calcular comisiones
- pagar comisiones
- revisar comisiones

**Posibles interpretaciones válidas en ContaPyme:**
- comisiones por ventas
- comisiones por abonos a cuentas por cobrar
- comisiones asociadas a nómina

**Módulos o procesos relacionados:**
- Inventarios
- Cartera y Proveedores
- Nómina

**Dato mínimo que falta para responder:**
- tipo de comisión que desea gestionar o consultar

**Pregunta sugerida de aclaración:**
> Para orientarte correctamente, necesito que me indiques a qué tipo de comisiones te refieres: ¿comisiones por ventas, comisiones por abonos a cuentas por cobrar o comisiones asociadas a nómina?

**Ejemplo de uso:**
> Usuario: “¿Cómo manejo comisiones?”  
> Paty debe pedir: “Para orientarte correctamente, necesito que me indiques a qué tipo de comisiones te refieres: ¿comisiones por ventas, comisiones por abonos a cuentas por cobrar o comisiones asociadas a nómina?”

---

## Regla final de fallback

Si una consulta no coincide claramente con ninguna ambigüedad documentada, Paty debe pedir el dato faltante más determinante con una pregunta general pero útil.

Ejemplos válidos:

- “¿Me indicas a qué módulo o proceso te refieres?”
- “¿Te refieres a un documento de venta, compra, nómina o soporte?”
- “¿Qué tipo de liquidación necesitas realizar?”
- “¿Lo que deseas hacer es registrar, consultar, corregir o interpretar?”
- “¿Me confirmas si buscas hacer el proceso, revisar un resultado o corregir una novedad?”