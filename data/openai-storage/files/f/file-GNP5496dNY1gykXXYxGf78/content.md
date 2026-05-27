# pf_cartera.md
> **Propósito:** Reunir las preguntan frecuentes del módulo **Cartera y proveedores**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntan frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.1  
> **Fecha creación:** 2026/03/17


## Casos frecuentes en operaciones de cartera

### ¿Por qué al momento de realizar un abono a cuenta por cobrar o cuenta por pagar no muestra información o el listado sale vacío y no permite seleccionar ningún saldo?

CANONICAL_ID: PF_CARTERA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- No sale información al hacer un abono a cxc o cxp
- La operación de abono no permite seleccionar ninguna información

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En ContaPyme, cuando al intentar realizar un abono a cuentas por cobrar (CxC) o cuentas por pagar (CxP) no se visualiza información o el listado aparece vacío, esto suele estar relacionado con la forma en que se está consultando la información o con el estado de las operaciones registradas en el sistema.

**A continuación te contamos algunos casos comunes y cómo resolverlos**
⚠️ El listado aparece vacío al abrir la operación de abono.
**Solución:** verifica si la operación está en modo filtro. Cambia a modo lista desde la parte superior para visualizar todas las cuentas pendientes.
⚠️ No aparecen cuentas para el tercero seleccionado.
**Solución**: asegúrate de que existan cuentas pendientes registradas y que la operación original (factura o documento de causación) esté procesada correctamente.
⚠️ No puedes seleccionar ninguna cuenta.
**Solución:** utiliza el seleccionador correctamente haciendo doble clic sobre la celda o presionando la tecla F3 para abrir el listado.
⚠️ Las cuentas existen pero no se muestran.
**Solución:** revisa que los filtros aplicados (fechas, terceros u otros criterios) no estén limitando la visualización de la información. En el módulo de cartera, las fechas de los documentos son clave para poder mostrar correctamente los saldos pendientes.
⚠️ La operación no muestra información después de varios intentos.
**Solución:** valida que los datos ingresados sean correctos y que no haya inconsistencias en la configuración del sistema.

Si después de todas las validaciones el problema continúa, contacta al equipo de soporte técnico de ContaPyme para una revisión más detallada.

Recomendaciones:
💡 Verifica siempre que las operaciones origen estén procesadas antes de realizar abonos.
💡 Usa el modo lista para evitar restricciones innecesarias en la consulta.
💡 Utiliza correctamente el seleccionador (doble clic o F3) para acceder a las cuentas.
💡 Revisa periódicamente filtros y configuraciones para evitar confusiones en la visualización.

#### 📌 Recursos adicionales   
-[Video: ¿Cómo realizar una operación de abono a cuenta por cobrar](https://www.youtube.com/watch?v=0e-H1m2F_2g)  
-[Video: ¿Cómo realizar una operación de abono a cuenta por pagar](https://www.youtube.com/watch?v=_-90UPbU-MY)  

---


## Saldos a favor y anticipos

### ¿Cómo realizar amortizaciones de saldos a favor en cuentas por cobrar o cuentas por pagar?

CANONICAL_ID: PF_CARTERA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- Necesito amortizar un saldo a favor o anticipo y no sé como hacerlo
- ¿Cómo amortizar saldos en contapyme?
- El sistema no me permite amortizar saldos a favor o anticipos

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Para amortizar **saldos a favor o anticipos** en **CxC (cuentas por cobrar)** o **CxP (cuentas por pagar)** en ContaPyme, el proceso se realiza directamente desde la sección de **forma de cobro/pago** dentro de cualquier operación del sistema.

Este procedimiento es **estándar para todas las operaciones** (facturas, comprobantes, recibos, etc.)

#### ¿Cómo hacerlo?

**1.** Ubícate en la operación donde deseas aplicar el saldo (ejemplo: comprobante de ingreso, gasto, factura, etc.).  

**2.** Dirígete a la sección **“Forma de cobro” o “Forma de pago”**.  

**3.** Haz clic en **opciones (⋯)** y selecciona:  
- **Adicionar forma de cobro/pago**  

![Amortizar anticipos o saldos a favor](https://www.contapyme.com/conocimientocontapyme/030_CX/Amoritzar_saldo.png)  

**4.** Elige la opción correspondiente según el caso:  
- **Amort. CxP** → para amortizar saldos o anticipos a proveedores  

**5.** Selecciona el **tercero** y el **saldo disponible** que deseas amortizar.  

**6.** Aplica el valor y guarda la operación.

#### Consideraciones clave

- ⚠️ El sistema solo mostrará **saldos disponibles** (anticipos o valores pendientes) para el tercero seleccionado.  
- ⚠️ El tipo de opción (CxC o CxP) dependerá de la naturaleza de la transacción.  
- ✅ Este proceso permite cruzar automáticamente anticipos o saldos a favor contra nuevas transacciones.  

---