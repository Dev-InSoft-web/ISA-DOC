# pf_nomina.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **Nómina**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2026/02/10

# Nómina

## PILA – Entidades de nómina

### ¿Cómo crear o asignar el código para Planilla PILA de una entidad de nómina (EPS, ARL, AFP, CCF, etc.)?

CANONICAL_ID: PF_NOMINA_PILA_ENTIDADES
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- No me aparece el código PILA de una EPS/ARL/AFP/CCF, ¿qué hago?
- ¿Cómo configurar el código para reportar en planilla PILA?
- Al generar PILA me dice que el código no existe, ¿cómo lo soluciono?
- ¿Dónde se asigna el código PILA en un tercero (entidad de nómina)?
- ¿Cómo crear un código PILA si no está en la lista?
- ¿Cómo validar si la entidad tiene código PILA configurado correctamente?
- Como puedo crear entidades para nómina (código planilla pila)
- quiero es crear el código para planilla, ya que no aparece existente

#### Respuesta:
**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, los **códigos para Planilla PILA** se asignan **en cada tercero** que actúa como **entidad de nómina** (por ejemplo: EPS, ARL, AFP, CCF, etc.).  
Si al generar la planilla PILA el sistema indica que **“el código no existe”**, normalmente se debe a que:

- El tercero **no tiene activado** el tipo de servicio (EPS/ARL/AFP/…),
- El servicio está activo pero **no tiene seleccionado el código PILA**, o
- El código requerido **no está creado en el catálogo** de “Entidades para nómina (código planilla PILA)”.

A continuación te dejamos el paso a paso para **verificar, asignar** y, si aplica, **crear** el código.

##### 1) Verificar y asignar el código PILA en el tercero (recomendado primero)

📍 **Ruta:**  
**Básico → Terceros → (Buscar el tercero) → Clic derecho “Modificar”**

1. Busca el tercero (ejemplo: **NUEVA EPS - Nueva Empresa Promotora de Salud S.A**).
2. Ingresa a **Datos proveedor**.
3. En el panel izquierdo, selecciona **Entidades nómina**.
4. En la tabla, ubica el **tipo de servicio** (EPS / ARL / PENSIÓN / CCF / etc.).
5. Marca ✅ en **Presta este servicio** (si aplica).
6. En la columna **Código para planilla PILA**, selecciona el código correcto.
7. Guarda con **Aceptar**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Asignación de código PILA en el tercero - Datos proveedor - Entidades nómina](https://www.contapyme.com/conocimientocontapyme/080_IN/tercero_entidades_nomina_codigo_pila.png)

✅ **Resultado esperado:**  
Cuando generes la planilla PILA, el sistema tomará el **código asignado** para reportar correctamente la entidad.

##### 2) Crear el código PILA si NO existe en la lista (catálogo de Entidades para nómina)

📍 **Ruta para crear el código:**  
**Nómina → Menu Conceptos de nómina → Entidades para nómina (código planilla PILA)**

1. Ingresa a la opción **Entidades para nómina (código planilla PILA)**.
2. Haz clic en **Crear**.
3. Diligencia:
   - **Entidad:** (EPS / ARL / AFP / CCF / etc.)
   - **Descripción:** nombre identificador (ej: “EPS LA NUEVA EPS”)
   - **Código para reportar en planilla PILA:** (ej: `EPS037`)
4. Guarda con **Aceptar**.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Ruta del menú para Entidades para nómina (código planilla PILA)](https://www.contapyme.com/conocimientocontapyme/080_IN/ruta_entidades_codigo_planilla_pila.png)

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Formulario de creación/modificación de Entidad para nómina con código PILA](https://www.contapyme.com/conocimientocontapyme/080_IN/formulario_entidad_codigo_pila.png)

📌 **Importante:**  
Antes de crear o registrar un código, valida que el **código PILA sea real y vigente según normativa**, ya que es la base para que la seguridad social quede reportada **a la entidad correcta**.

#### 3) Recomendaciones rápidas si sigue saliendo “código no existe”

- Verifica que el tercero correcto esté seleccionado en el proceso de nómina/PILA (no un tercero similar).
- Confirma que el servicio (EPS/ARL/AFP/…) esté marcado como **Presta este servicio** ✅.
- Asegura que el código esté seleccionado exactamente en la columna **Código para planilla PILA**.
- Si el catálogo no muestra el código, créalo y vuelve a asignarlo en el tercero.

---

#### 📌 Recursos adicionales
[Video: Configuración de proveedores de nómina](https://www.youtube.com/watch?v=snLC7eIEkKg)
