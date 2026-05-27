# gen_diccionario.md  
> **Propósito:**  
> Define los equivalentes técnicos de los términos cotidianos usados por los clientes, para que **Paty IA** interprete correctamente las consultas y las dirija al módulo, proceso o ayuda correspondiente dentro del sistema **ContaPyme®**.
> **Tipo de documento:** Conocimiento base  
> **Función:** Diccionario semántico  
> **Versión:** 1.0  
> **Fecha:** 2025/11/05

---

## 🔹 TÉRMINOS Y EQUIVALENCIAS

---

### TERCEROS  
**Cómo puede expresarlo un usuario:**  
- Cliente  
- Proveedor  
- Empleado  
- Vendedor  
- Persona  
- Contacto  
- Usuario  

**Interpretación de Paty:**  
Relacionar la consulta con el catálogo de **Terceros**.

**Ejemplo:**  
> Usuario: “¿Cómo creo un cliente?”  
> Paty interpreta: Buscar la ayuda **“Cómo crear un tercero”**.

---

### OPERACIONES  
**Cómo puede expresarlo un usuario:**  
- Venta  
- Compra  
- Pago  
- Abono  
- Ajuste  
- Devolución  
- Nómina  
- Factura  
- Movimiento contable  
- Registro de transacción  

**Interpretación de Paty:**  
Toda venta, compra o pago se registra como una **operación**.  
Paty debe determinar si corresponde a una **operación comercial** (Inventarios, Facturación, Cartera) o una **operación contable** (Comprobante).

**Ejemplo:**  
> Usuario: “¿Cómo hago una venta?”  
> Paty interpreta: Buscar la ayuda **“Cómo crear una operación de venta”**.

---

### ELEMENTOS  
**Cómo puede expresarlo un usuario:**  
- Producto  
- Servicio  
- Artículo  
- Referencia  
- Insumo  

**Interpretación de Paty:**  
Relacionar con el **catálogo de elementos del inventario**.

**Ejemplo:**  
> Usuario: “¿Cómo crear un producto?”  
> Paty interpreta: Buscar la ayuda **“Cómo crear un elemento”**.

---

### MOVIMIENTOS  
**Cómo puede expresarlo un usuario:**  
- Asiento contable  
- Registro de pago  
- Movimiento de caja o banco  
- Movimiento de inventario  
- Transacción  

**Interpretación de Paty:**  
Determinar si se refiere a un **movimiento contable**, **cartera** o **inventarios**, y dirigirlo al módulo o tipo de operación correspondiente.

---

### CENTROS DE COSTOS  
**Cómo puede expresarlo un usuario:**  
- Área  
- Proyecto  
- Dependencia  
- Sede  
- Actividad  

**Interpretación de Paty:**  
Relacionar con el catálogo de **Centros de costos**.

---

### CONCEPTOS DE NÓMINA  
**Cómo puede expresarlo un usuario:**  
- Devengo  
- Deducción  
- Provisión  
- Aporte  
- Valor de nómina  

**Interpretación de Paty:**  
Relacionar con el **catálogo de conceptos de nómina** o **fórmulas de cálculo**.

**Ejemplo:**  
> Usuario: “¿Cómo creo un concepto para bonificación?”  
> Paty interpreta: Buscar la ayuda **“Cómo crear un concepto de nómina”**.

---

### LIQUIDACIÓN  
**Cómo puede expresarlo un usuario:**  
- Pago de nómina  
- Liquidación de pago
- Liquidar de pago  
- Liquidación de contrato  
- Liquidar de contrato 
- Liquidar prima  
- Liquidar cesantías  
- Liquidación final  
- Liquidación de empleados  
- Liquidación de impuestos en factura o ingreso  

**Interpretación de Paty:**  
Analizar el **contexto** para determinar a qué proceso se refiere:

| Contexto detectado | Interpretación | Módulo o proceso |
|--------------------|----------------|------------------|
| “Liquidación de pago”, “Pago de nómina” | Proceso de **pago de nómina** | Operación de **Pago de Nómina** |
| “Liquidación de contrato”, “Empleado retirado”, “Liquidación final” | **Liquidación de contrato laboral** | Operación de **Liquidación de Contrato** |
| “Liquidar prima”, “Liquidar cesantías”, “Liquidar vacaciones” | **Liquidación de prestaciones sociales** | Módulo de **Nómina** → Procesos de **Prima / Cesantías / Vacaciones** |
| “Liquidación de impuestos” | **Cálculo de impuestos en una operación comercial** | Módulo de **Facturación / Ingresos / Gastos** |

**Ejemplo:**  
> Usuario: “¿Cómo hago la liquidación de pago?”  
> Paty interpreta: Buscar la ayuda **“Cómo realizar el pago de nómina”**.

**Nota:**  
Si el contexto no es claro, Paty debe solicitar una aclaración:  
> “¿Podrías confirmar si te refieres a la liquidación de contrato o al pago de nómina?”

---

### PERFILES DE USUARIO Y PERMISOS  
**Cómo puede expresarlo un usuario:**  
- Permisos de usuario  
- Roles  
- Tipos de usuario  
- Niveles de acceso  
- Autorizaciones  
- Control de accesos  

**Interpretación de Paty:**  
Relacionar con el **módulo de Perfiles de usuario**, donde se configuran permisos, accesos y restricciones.

**Ejemplo:**  
> Usuario: “¿Cómo doy permisos a otro usuario?”  
> Paty interpreta: Buscar la ayuda **“Cómo crear o modificar un perfil de usuario”**.  

**Nota:**  
Paty debe aclarar:  
> “En ContaPyme, los permisos se configuran a través de los **perfiles de usuario**.”

---

### PAGO POR BANCOS  
**Cómo puede expresarlo un usuario:**  
- Transferencia bancaria  
- Pago electrónico  
- Archivo bancario  

**Interpretación de Paty:**  
Corresponde al proceso de **Pago por Bancos**, que permite generar el **archivo plano** para subir al banco y ejecutar automáticamente los pagos de **cuentas por pagar**, **proveedores** o **nómina**.

**Ejemplo:**  
> Usuario: “¿Cómo puedo pagar a mis proveedores directamente desde el banco?”  
> Paty interpreta: Buscar la ayuda **“Cómo realizar un pago por bancos”**.

---

## 🧠 REGLAS SEMÁNTICAS GENERALES

1. Si un usuario usa un término no técnico, Paty debe identificar su **equivalente documental**.  
2. Las respuestas siempre deben usar el término oficial, aclarando la equivalencia.  
   > Ejemplo: “En ContaPyme, los clientes se registran como **terceros**.”  
3. Ante palabras ambiguas, Paty debe **buscar palabras acompañantes** o pedir aclaración.  
4. Cuando haya más de un significado, priorizar el **contexto de la operación**.  
5. Si no existe equivalencia definida, solicitar más información al usuario.

---

## 📋 EQUIVALENCIAS RÁPIDAS

| Lenguaje del usuario | Lenguaje del sistema |
|-----------------------|----------------------|
| Crear cliente | Crear tercero |
| Crear proveedor | Crear tercero |
| Crear empleado | Crear tercero |
| Hacer una venta | Crear operación de venta |
| Registrar una compra | Crear operación de compra |
| Pagar nómina | Operación de nómina |
| Ajustar inventario | Operación de ajuste |
| Devolver producto | Operación de devolución |
| Crear producto | Crear elemento |
| Dar permisos | Crear/modificar perfil de usuario |
| Pago automático | Pago por Bancos |
| Transferencia bancaria | Pago por Bancos |