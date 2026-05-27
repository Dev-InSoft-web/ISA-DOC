# pf_cartera.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **Cartera y proveedores**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2026/03/12

# Cartera y proveedores

### ¿Por qué en el estado de cartera aparecen saldos negativos (en rojo) y cómo se pueden revisar?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

**Otras formas de preguntar:**
📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas. 
- ¿Por qué el estado de cartera aparece en negativo a la fecha?
- ¿Por qué en cuentas por pagar o cobrar aparecen valores en rojo?
- ¿Qué significa que una factura o proveedor tenga saldo negativo?
- ¿Cómo revisar un saldo negativo en cartera en ContaPyme?
- Requiero ayuda para revisar el estado de cartera por que aparece en negativo y en rojo a la fecha

**Respuesta:**  
En **ContaPyme**, los saldos negativos en el estado de cartera (cuentas por cobrar o cuentas por pagar) pueden aparecer por varias razones relacionadas con **abonos, ajustes o cruces de documentos**.  
La clave es revisar los movimientos registrados y validar que los documentos estén correctamente relacionados.

A continuación te explicamos cómo revisarlo paso a paso.

🔍 Paso 1: Revisar el Explorador de cartera

Primero revisa el detalle de los documentos registrados.

**Ruta para Cuentas por Cobrar:**  
`Cinta de opciones → Cartera y proveedores → Exploradores → Cartera CxC`

**Ruta para Cuentas por Pagar:**  
`Cinta de opciones → Cartera y proveedores → Exploradores → Cuentas por pagar`

1. Filtra por la **fecha de corte** que estás revisando.
2. Verifica las columnas:
   - Número de documento
   - Fecha
   - Valor del documento
   - Abonos aplicados
   - Saldo pendiente
3. Identifica si existe algún documento que tenga **saldo negativo**.

📊 Paso 2: Revisar el informe por edades de cartera

Este informe permite analizar el saldo total por cliente o proveedor y por rangos de antigüedad.

**Ruta:**  
`Cinta de opciones → Cartera y proveedores → Informes → Consulta de cuentas por cobrar por edades`

o

`Cinta de opciones → Cartera y proveedores → Informes → Consulta de cuentas por pagar por edades`

1. Selecciona el **tercero** o **cuenta** que deseas revisar.
2. Define la **fecha de corte**.
3. Genera el informe y revisa los valores por cliente o proveedor.

📄 Paso 3: Revisar el movimiento de los documentos

También puedes revisar el historial de movimientos de cada documento.

Este informe permite ver:

- Facturas registradas
- Abonos realizados
- Ajustes aplicados
- Saldo resultante

Esto ayuda a identificar si un pago o abono **supera el valor de la factura**.

🔎 Paso 4: Revisar la referencia de los documentos

En algunos casos los movimientos sí existen en el sistema, pero **no se cruzan correctamente**.

Esto ocurre cuando:

- El abono se registró con **una referencia diferente a la factura original**.
- El sistema no puede asociar correctamente el pago con el documento.

📌 **Recomendación:**  
Al revisar los informes, valida siempre la **referencia del documento**, para confirmar que los abonos estén aplicados a la factura correcta.

⚙️ Paso 5: Verificar configuraciones y permisos

En algunos casos el saldo negativo puede aparecer porque se permitió registrar **abonos mayores al valor de la deuda**.

Existe una opción llamada:

**“Permite hacer abonos mayores a los saldos”**

Esta opción puede estar habilitada como **configuración o permiso dentro del módulo de cartera**, y permite registrar pagos superiores al valor de la factura.

Cuando esto ocurre:

- El sistema registra el excedente.
- El saldo puede aparecer **negativo** hasta que se realice un cruce o ajuste posterior.

#### 📌 Naturaleza contable de las cuentas

También es importante considerar la **naturaleza contable de las cuentas**.

Algunas cuentas con **naturaleza crédito** pueden aparecer en valores negativos en ciertos informes.  
Esto no necesariamente significa un error, sino que responde a la forma en que la contabilidad presenta los movimientos.

#### 💡 Casos comunes de saldos negativos

Los saldos negativos suelen presentarse por situaciones como:

- 💰 **Abonos mayores al valor de la factura**
- 🔄 **Pagos registrados con referencia incorrecta**
- 📉 **Ajustes contables o devoluciones**
- 📄 **Documentos registrados pero no cruzados correctamente**

## ✔ Validación final

Después de realizar las revisiones anteriores:

1. Vuelve a generar el informe de cartera.
2. Verifica si el saldo negativo corresponde a un movimiento real.
3. Si detectas inconsistencias, corrige el documento o realiza el cruce correspondiente.

#### 💡 Recomendaciones finales

- ✅ Revisa periódicamente los informes de cartera.
- 📄 Verifica siempre la referencia de los documentos al registrar abonos.
- 🔎 Valida los movimientos en los exploradores antes de hacer ajustes.
- ⚠️ Si el saldo negativo persiste y no se identifica la causa, contacta al **soporte técnico de ContaPyme** para una revisión más detallada.

#### 📌 Recursos adicionales

- [Video: Generar informe de movimiento auxiliar de cuentas ](https://www.youtube.com/watch?v=DEUTzgbF1fo&t=80s)
---