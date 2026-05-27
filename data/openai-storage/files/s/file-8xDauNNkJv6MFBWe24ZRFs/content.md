# pf_basico.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **Sistema Básico**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2026/02/02

# Sistema básico

## Terceros

### ¿Por qué al crear un tercero y colocar el NIT, salen datos de forma automática?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué al ingresar el NIT de un tercero se llenan los datos automáticamente?  
- ¿Por qué ContaPyme trae información automática al crear un tercero?  
- ¿Por qué al registrar un tercero el sistema completa el nombre solo?  
- ¿Cómo funciona la consulta automática de terceros con la DIAN?  
- ¿Por qué al digitar el NIT se cargan datos del tercero?  
- ¿De dónde salen los datos automáticos al crear un tercero?  
- ¿ContaPyme consulta la DIAN al crear terceros?  
- ¿Por qué el sistema llena nombre y correo al ingresar el NIT?  
- ¿Por qué al crear un tercero y colocar la cédula, salen datos de forma automática?

#### Respuesta: 
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
ContaPyme cuenta con una funcionalidad de **consulta automática de información ante la DIAN**, la cual permite completar algunos datos del tercero de forma automática al momento de su creación.

Cuando el usuario ingresa el **número de identificación** de un tercero, el sistema realiza una consulta en línea a la **DIAN**, entidad que retorna la información registrada para ese contribuyente.  
Con base en esa respuesta, ContaPyme carga automáticamente los siguientes campos (según disponibilidad de la DIAN):

- Nombre o razón social  
- Apellidos (si aplica)  
- Correo electrónico  

Esta funcionalidad busca **agilizar el registro de terceros**, reducir errores de digitación y garantizar que la información coincida con los datos oficiales registrados ante la entidad tributaria.

**⚙️ Requisitos para que la consulta funcione correctamente**
Para que la carga automática de datos se realice sin inconvenientes, el equipo debe contar con **conexión activa a internet**.
-

📌 **Importante:**  
Si la DIAN no retorna información (por ejemplo, porque el NIT no existe o no tiene datos públicos asociados), el sistema permitirá continuar con el registro, pero los campos deberán diligenciarse de forma manual.
También, el cliente podrá modificar la información de dichos campos aunque el sistema la haya cargado desde la DIAN.

#### 💡 Tips importantes

✔️ Siempre verifica que los datos cargados automáticamente coincidan con la información real del tercero.  
✔️ En caso de inconsistencias, los campos pueden ser ajustados manualmente antes de guardar el registro.  
✔️ Si no se cargan datos automáticamente, valida primero la conexión a internet.  
✔️ La información devuelta depende exclusivamente de la DIAN; ContaPyme solo actúa como intermediario de la consulta.

---

## Terceros por defecto en operaciones

### ¿Cómo dejar un tercero predeterminado (fijo) en una operación?

CANONICAL_ID: PF_TECNICO  
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.  

- ¿Cómo dejar un tercero por defecto en una operación?  
- ¿Cómo fijar un cliente en una operación de ContaPyme?  
- ¿Cómo establecer un tercero predeterminado?  
- ¿Cómo hacer que un cliente salga automático en una operación?  
- Fijar tercero en facturación
- Dejar consumidor final como predeterminado en la Factura
- Cliente por defecto en ventas  
- ¿Cómo dejar un tercero fijo en una operación?  

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En ContaPyme es posible configurar un **tercero predeterminado (cliente, proveedor, empleado, etc.)** dentro de una operación, con el fin de agilizar la digitación y evitar registrar repetidamente la misma información.  

Esto es especialmente útil cuando se trabaja frecuentemente con un mismo tercero, como por ejemplo un **cliente tipo “consumidor final” en las facturas de venta**.

**⚠️ Consideraciones importantes**

  - 📌 El tercero por defecto **se cargará automáticamente cada vez que se abra esa operación**.  
  - ✏️ Este valor **puede ser modificado manualmente** en cualquier momento durante la digitación.  
  - 🔄 Aplica únicamente a operaciones que tengan el campo de tercero en el encabezado.  
  - 🧾 El nombre del campo del tercero puede variar según la operación, por ejemplo:  
  - Cliente, como ejemplo las operaciones de Factura de venta .
  - Proveedor, como ejemplo las operaciones de compra.
  - Empleado, como ejemplo las operaciones de pago de nómina.

**⚙️ ¿Cómo configurar un tercero por defecto?**

teniendo presente las consideraciones anteriores, y si la operación contiene un campo de tercero en la sección de encabezado, sigue la siguiente ruta:

1. Al abrir la operación, ve a:  
   `Configurar operación`

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Confugurar Operacion](https://www.contapyme.com/conocimientocontapyme/010_BS/configurar_operacion.png)
   
    Selecciona el alcance de la configuración, recuerda que puedes hacerlo por usuario.

2. Ingresa a:  
   `Campos de la operación → Datos encabezado → Datos maestros de la operación `  

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Datos Maestros de la operacion](https://www.contapyme.com/conocimientocontapyme/010_BS/configurar_datos_maestros.png)


3. Selecciona el campo correspondiente al tercero (por ejemplo: **Cliente**) y en la columna **“Valor por defecto”**, ingresa el código del tercero que deseas fijar, (como ejemplo el "222222222222" correspondiente al consumidor final).  

4. Guarda la configuración.  

📌 A partir de este momento, cada vez que abras esa operación, el sistema cargará automáticamente el tercero configurado por defecto.


**💡 Recomendación**

Se recomienda utilizar esta configuración cuando se trabaja con terceros recurrentes, ya que permite **optimizar tiempos y reducir errores de digitación**.


**🖱️ Alternativa rápida (desde la operación)**

También puedes fijar el tercero directamente desde la operación:

- Haz clic en el menú de los **tres puntos (⋮)** al lado del campo de tercero.  
- Selecciona la opción **“Fijar”**.  

    La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Fijar tercero en operacion](https://www.contapyme.com/conocimientocontapyme/010_BS/fijar_tercero_operación.png)

Esto fijará ese tercero para futuras operaciones.

**📞 ¿Y si no funciona o no te es útil la información anterior para fijar el tercero en la operación que necesitas?**

Si después de realizar esta configuración el tercero no se establece correctamente o requieres verificar puntualmente una operación para fijar el tercero:

👉 Te recomiendo **generar un tiquete (TK) al área de soporte técnico**, donde un asesor podrá validar el caso específico y ayudarte con la configuración.

---

## tipo de documento soporte en operaciones

### ¿Por qué no puedo cambiar el tipo de documento soporte en una operación?

CANONICAL_ID: PF_TECNICO  
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.  

- No me deja cambiar el documento soporte en una factura  
- ¿Por qué no puedo cambiar el tipo de documento en una operación?  
- No puedo seleccionar otro documento soporte  
- ¿Cómo cambiar el tipo de documento soporte en ContaPyme?  
- El documento soporte está bloqueado  
- No me permite modificar el documento en la factura  
- Cambiar tipo de documento en operación  

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En ContaPyme, el tipo de documento soporte que se utiliza en una operación (como una factura) puede no ser modificable debido a **configuraciones específicas del sistema o controles internos de numeración**.  

Esto no corresponde a un error, sino a un comportamiento controlado para garantizar la integridad de la información y el manejo correcto de consecutivos.

**🔍 Principales causas por las que no se puede cambiar**

**1. ⚙️ Configuración de la operación**

Cada operación puede tener definido un documento soporte por defecto y una restricción para su modificación.

📌 Ruta para validar:

- Dentro de la operación, ingresa a:  
  `Configuración de la operación`

  La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Confugurar Operacion](https://www.contapyme.com/conocimientocontapyme/010_BS/configurar_operacion.png)

    Selecciona el alcance de la configuración, recuerda que puedes hacerlo por usuario.

- Dirígete a:  
  `Datos encabezado → Tipo de doc. soporte por defecto`

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Permite modificar doc soporte en operacion](https://www.contapyme.com/conocimientocontapyme/010_BS/permite_modificar_docsoporte.png)

Allí debes verificar si está activa la opción:

✔️ **“El tipo de documento soporte no podrá ser modificado”**

Si esta opción está marcada:

- ❌ No podrás cambiar el documento en la operación.  
- ✅ El sistema usará siempre el documento configurado por defecto.  

👉 **Solución:**  
Si necesitas permitir el cambio, debes desmarcar esta opción desde la configuración (según permisos del usuario).


**2. 🔢 Control de numeración (tipo factura de venta)**

Cuando el documento soporte está configurado con manejo de numeración tipo:

👉 **“Tipo Factura de venta”**

el sistema aplica un control estricto.

📌 ¿Qué ocurre en este caso?

- Al **grabar la operación**, se asigna un consecutivo oficial.  
- Después de esto, ❌ **no se permite cambiar el tipo de documento soporte** dentro de la operación.  

Esto se hace para:

- Evitar inconsistencias en la numeración.  
- Mantener el control fiscal y contable.  
- Garantizar la trazabilidad de los documentos.

📌 Ruta para validar el tipo de numeración configurada en el documento soporte:

- Ingresa al catálogo de tipo de documentos de soporte y selecciona el requerido:  
  `Pestaña básico → Doc. Soporte`

- Verifica el tipo de numeración configurado en la pestaña definición:  

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![tipo numeracion del documento soporte](https://www.contapyme.com/conocimientocontapyme/010_BS/tipo_numeracion_docsoporte.png)


👉 **Importante:**  
Esta restricción aplica especialmente después de guardar la operación. Antes de grabar, puede depender de la configuración.


**⚠️ Recomendaciones**

- 🔎 Verifica siempre la configuración de la operación antes de iniciar la digitación.  
- 🧾 Asegúrate de seleccionar el documento correcto antes de guardar la operación.  

**📞 ¿Y si el problema continúa?**

Si después de validar estas configuraciones aún no puedes cambiar el documento soporte:

👉 Se recomienda **generar un tiquete (TK) al área de soporte técnico**, donde un asesor podrá revisar el caso puntual y validar la configuración específica del sistema.  
