# pf_inventarios_plus.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **inventarios Plus**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2026/03/24

### ¿Cómo activar la digitación de precios desde la remisión?

CANONICAL_ID: PF_INVENTARIOS
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK
REQUIRES_IMAGES: TRUE

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo activar precios en la remisión?
- ¿Cómo ingresar precios manuales en la remisión?
- ¿Por qué no puedo digitar precios en la remisión?
- ¿Cómo habilitar el campo precio en la remisión?
- ¿Cómo permitir editar precios en una remisión?
- ¿Por qué la remisión no me deja poner precios?
- ¿Cómo activar precios en el documento de remisión?
- ¿Dónde se configura para ingresar precios en remisiones?

---

#### Respuesta:  
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->

Para poder **digitar precios directamente desde la operación de remisión**, es necesario validar primero la **configuración de la operación**, ya que por defecto esta puede estar definida solo para manejar cantidades.

En ContaPyme, la remisión puede trabajar de dos formas:

- Solo cantidad de productos  
- Cantidad + precio + descuentos  

Si la operación no está configurada correctamente, **el campo de precio no estará disponible para digitación**, incluso si existen listas de precios configuradas.

---

##### ✅ Paso 1: Configurar la operación para permitir precios

📍 **Ruta:**  
**Operación → Configurar operación**

1. Ingrese a la operación de **Remisión al cliente**  
2. En la barra superior seleccione:  
   **Operación → Configurar operación**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Configuración de operación](https://www.contapyme.com/conocimientocontapyme/090_IP/configurar_operacion_remision.png)

---

##### ✅ Paso 2: Activar el manejo de precios en la lista de elementos

Dentro de la configuración:

📍 **Ruta interna:**  
**Campos de la operación → Lista de elementos → Manejo del listado de elementos**

Seleccione la opción:

👉 **“Registrar la cantidad, precio y descuento de cada producto remisionado”**

Esto habilita que la operación permita manejar precios.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Manejo listado de elementos](https://www.contapyme.com/conocimientocontapyme/090_IP/manejo_listado_elementos_remi.png)

---

#### ✅ Paso 3: Habilitar los campos en el menú de opciones

Adicionalmente, el sistema permite controlar si los campos se pueden digitar desde la operación.

Verifique que estén habilitadas las opciones:

- **Registrar precios**  
- **Registrar valores totales**

📍 **Ruta en la operación:**  
**Menú → Opciones**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:  
![Opciones registrar precios](https://www.contapyme.com/conocimientocontapyme/090_IP/opciones_registrar_precios_remi.png)

---

#### 💡 Comportamiento importante

- Si **no se configura la operación**, no podrás digitar precios manualmente.  
- Si la operación está configurada pero los campos están deshabilitados en **Opciones**, tampoco podrás editarlos.  
- Esta configuración puede depender del **perfil o usuario**, por lo que es posible que algunos usuarios sí puedan y otros no.  

---

#### 🚀 Resumen

Para activar precios en remisión debes:

1️⃣ Configurar la operación → permitir precio en listado  
2️⃣ Activar opciones → registrar precios  
3️⃣ Validar permisos de usuario  

---