# pf_basico.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **Sistema Básico**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/11/14

# Sistema básico

## Explorador gráfico de empresas

### ¿Cuál es el procedimiento paso a paso para crear una nueva empresa en ContaPyme para el nuevo año?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo creo la empresa para el nuevo año?  
- ¿Cómo preparo una empresa nueva con los saldos de apertura del año anterior?
- ¿Cómo independizar la contabilidad de una empresa por año?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Crear una empresa nueva para el año siguiente te permite llevar la contabilidad por ejercicio sin mezclar transacciones. Tienes dos enfoques habituales: **crear una empresa nueva en blanco en nueva área de trabajo** o **crear/duplicar la empresa a partir de una copia en una nueva área de trabajo**. A continuación te explico ambos métodos y cuándo usarlos.

Antes de crear la empresa debes asegurarte de que exista el **área de trabajo** donde quieres ubicarla.

0. 🔧 **(Precondición) — Crear o verificar el área de trabajo**  
   - **¿Por qué?** Las empresas se registran dentro de un área de trabajo; si la empresa irá en una nueva área (por ejemplo: `Area_2026`), créala antes de crear la empresa.  
   - **Ruta:** `Botón de ContaPyme (Parte superior izquierda) → Servidor → Áreas de trabajo → Crear`  
      
      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Botón de ContaPyme](https://www.contapyme.com/conocimientocontapyme/010_BS/boton_contapyme.png)

**Opción A — Crear empresa nueva (recomendado si prefieres partir desde cero):**
1. 🔑 **Permisos:** entra con un usuario que tenga un perfil administrador.  
2. 📂 **Ruta:** `Básico → Empresa → Crear empresa`.  
3. 📝 **Datos básicos:** Indica el código de la nueva empresa. Recuerda que los campos en blanco son obligatorios y los verdes son opcionales, por tanto, completa los datos principales: Tipo de documento (ej. `Cédula`, `Nit`), número del documento, nombre de la empresa (ej. `MiEmpresa 2026`), y así, navega entre cada pestaña e indica los datos más relevantes, entre más completa la información, mejor, porque los informes y reportes saldrán con todos los datos de la empresa.    
4. 🔐 **Configuraciones:** Durante el proceso de creación de la empresa, revisa muy bien en la pestaña **Clasificación tributaria** los atributos que tu empresa debe aplicar, porque esto es indispensable para el cálculo automático de impuestos que se realiza en las operaciones.

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
   ![Pestaña de clasificación tributaria](https://www.contapyme.com/conocimientocontapyme/010_BS/clasificacion_tributaria.png)

Después de completar todo el registro, ya puedes empezar a trabajar en tu nueva empresa.

**Opción B — Duplicar empresa partiendo de una copia de seguridad (útil si quieres conservar catálogos y configuraciónes tal cual):**
1. 💾 Realiza una copia de seguridad de tu empresa origen: Ingresa por el `Botón de ContaPyme (Parte superior izquierda) → Servidor → Explorador de copias → Nueva`. Selecciona la ruta dónde deseas guardar la copia. 

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
   ![Botón de ContaPyme](https://www.contapyme.com/conocimientocontapyme/010_BS/boton_contapyme.png) 

2. 📥 **Recupera la copia en la nueva área de trabajo:** Ingresa nuevamente por el`Botón de ContaPyme → Servidor → Explorador de copias → Recuperar`. Selecciona la copia que acabas de crear y guardar (con doble clic).  
3. 🧾 **Limpia la empresa:** Para dejar la empresa en blanco, sin operaciones, pero con la misma estructura, puedes ingrsar por `Botón de ContaPyme → Utilidades → Otras utilidades → Limpiar empresa`. 

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
   ![Botón de ContaPyme](https://www.contapyme.com/conocimientocontapyme/010_BS/boton_contapyme.png)

   - Este proceso borra todas las operaciones (facturas, comprobantes, etc.) y deja únicamente:  
     - ✔ Catálogos (clientes, proveedores, productos, cuentas).  
     - ✔ Configuraciones y parámetros.  
     - ✔ Datos generales de la empresa.  
4. ✔ Verifica parámetros, PUC y cargues iniciales.

**Implicaciones y recomendaciones:**  
- ✅ Haz copia de seguridad antes de cualquier cambio mayor.  
- ⚠️ Consulta con tu contador si necesitas ajustes de cierre (asientos de cierre y apertura).  
- 📌 Usa un nombre claro que incluya el año para facilitar búsquedas (ej. `MiEmpresa_2026`).

#### 📌 Recursos adicionales
- [Video: Creación de la empresa](https://www.youtube.com/watch?v=AOtaKsVHv8o&t=2s)

---

### ¿Cómo se crean áreas de trabajo en ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo crear una nueva área de trabajo en ContaPyme?  
- ¿Qué datos debo llenar al crear un área de trabajo?
- ¿Cómo crear varias empresas en áreas de trabajo independientes?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Las **áreas de trabajo** son espacios donde se organizan las empresas, los usuarios y sus permisos. Cada empresa que crees en ContaPyme debe estar dentro de un área de trabajo.  

Crear un área de trabajo es un proceso sencillo, pero requiere hacerlo con usuario de perfil administrador desde el equipo principal.

1. 🔑 **Permisos:** ingresa al sistema con un usuario que tenga perfil administrador en el equipo principal (servidor).  

2. 📂 **Ruta en el sistema:**  
  Ingresa por el `Botón de ContaPyme → Servidor → Catálogo de áreas de trabajo`.  

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Catálogo de áreas de trabajo](https://www.contapyme.com/conocimientocontapyme/010_BS/area_trabajo.png)

3. ➕ **Crear nueva área:** haz clic en **Crear** y completa la información:  
   - **Identificación:** código único que identifique el área. Recomendación: usa el mismo nombre de la empresa o el año (ejemplo: `Empresa2026`).  
   - **Configuración:** selecciona el **Plan Único de Cuentas (PUC)** que utilizará la empresa. El más común es **PUC para comerciantes**.  
   - **Grupo NIIF:** indica el grupo NIIF al que pertenece la empresa para que el sistema maneje la contabilidad según norma (ejemplo: Grupo 1, 2 o 3).  
   - **Descripción:** un texto breve que explique el uso del área (ejemplo: “Área contable año 2026”).  

4. 👤 **Primer acceso con usuario ADMIN:**  
   - Al crear el área de trabajo, el sistema genera automáticamente un usuario por defecto llamado **ADMIN**.  
   - Cuando ingreses por primera vez con este usuario en el área de trabajo, el sistema pedirá definir una nueva contraseña (Debe tener por lo menos 8 caracteres). 
   - Accede y confirma que funciona correctamente.

**Ejemplo práctico:**  
Si necesitas preparar la contabilidad para el año 2026, puedes crear un área llamada `Empresa2026`, asignar el PUC de comerciantes, marcar el grupo NIIF correspondiente y luego crear dentro de esa área la empresa para ese año.  

**Recomendaciones:**  
- ✅ Usa nombres claros y fáciles de identificar (ejemplo: `Empresa2026`).  
- ⚠️ Cada empresa debe estar en un área; si no creas el área, no podrás crear la empresa.  
- 🔒 Guarda bien la contraseña del usuario ADMIN, ya que es la clave de acceso inicial para esa área de trabajo.  

#### 📌 Recursos adicionales 
- [Video: Creación de áreas de trabajo](https://www.youtube.com/watch?v=Kblyqf7B4_4&t=1s)

---

### ¿Cómo crear un nuevo usuario en ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo doy acceso a un compañero en ContaPyme?  
- ¿Dónde creo usuarios y asigno permisos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Crear usuarios correctamente garantiza control de accesos y trazabilidad.

1. 🔑 **Entra con usuario que tenga un perfil administrador.**  
2. 📂 **Ruta:** `Básico → Usuarios → Crear`.  
3. 🧾 **Completa datos del usuario:**  
   - **Código/Usuario:** un identificador corto, fácil de recordar (ejemplo: `Facturacion` o `Contador`).  
   - **Nombre completo:** nombre real de la persona que usará la cuenta.  
   - **Perfil principal:** selecciona el rol (Administrador, Contador, Vendedor, etc.).

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Catálogo de áreas de trabajo](https://www.contapyme.com/conocimientocontapyme/010_BS/perfil_principal.png)

     - Los perfiles definen los permisos que tendrá el usuario.  
     - Se pueden ajustar para dar más acceso o restringir funciones según sea necesario.  
   - **Contraseña:** define una clave segura para el usuario o se puede activar la opción de: **Solicitar al usuario modificar la contraseña en el próximo ingreso al sistema**

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Contraseña](https://www.contapyme.com/conocimientocontapyme/010_BS/contrasena.png)

5. 🔗 **Asignar licencia:** en la pestaña **Licencias** marca la licencia que usará ese usuario, propiamente en la columna "Asignar". 

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
   ![Asignar licencia](https://www.contapyme.com/conocimientocontapyme/010_BS/asignar_licencia.png)

6. ✔ **Guardar** y pedir al usuario iniciar sesión para probar.  
7. 🔄 **Opcional:** activar la expiración de contraseña.

**Consejos:**  
- ✅ Usa códigos consistentes (alias corto y claro).  
- 🔑 No compartas cuentas genéricas entre varias personas.  
- 📌 Documenta usuario/rol y responsable en un control interno.

#### 📌 Recursos adicionales 
- [Video: Creación de usuarios y asignación de licencias](https://www.youtube.com/watch?v=o49Sh93o3H0)

---

### ¿Es posible modificar configuraciones de una área de trabajo existente?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Qué configuraciones se pueden cambiar en un área ya creada?  
- ¿Cómo actualizar la descripción de un área de trabajo?  
- ¿Qué hago si necesito cambiar el PUC o grupo NIIF de un área existente? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Las configuraciones de un área de trabajo son en su mayoría fijas. Una vez creada, **no se pueden cambiar** el nombre, el PUC, el grupo NIIF ni la ubicación por defecto.  

Lo único que se puede modificar directamente en el área es:  
- La **descripción**.  

1. 🔑 **Permisos:** ingresa con un usuario que tenga perfil administrador en el equipo principal o servidor.  

2. 📂 **Ruta en el sistema:**  
   `Botón de ContaPyme (Parte superior izquierda) → Servidor → Áreas de trabajo`  

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Catálogo de áreas de trabajo](https://www.contapyme.com/conocimientocontapyme/010_BS/area_trabajo.png)

3. ✏️ **Selecciona el área y modifica:**  
   - Ingresa al área de trabajo con doble clic, actualiza la **descripción** para darle más detalle o contexto. 

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Descripción del área de trabajo](https://www.contapyme.com/conocimientocontapyme/010_BS/descripcion_area.png)

4. ⚠️ **Ten en cuenta:**  
   - El **nombre del área** no se puede modificar.  
   - El **PUC** y el **grupo NIIF** ya quedan definidos al momento de crearla.  
   - Tampoco es posible cambiar la **ubicación por defecto** donde se guarda el área.  
   - Si necesitas alguno de estos cambios, lo recomendable es **crear un área de trabajo nueva** con la configuración correcta y mover allí la empresa.  

**Ejemplo práctico:**  
Si al crear un área la llamaste `Empresa2025`, ese nombre no se podrá cambiar después. Lo único que podrás ajustar será la descripción (ejemplo: de “Empresa contable” a “Empresa contable año 2025”).  

**Implicaciones y recomendaciones:**  
- ⚠️ Si necesitas modificar el PUC o grupo NIIF, crea una nueva área y traslada la empresa allí.  

---

### ¿Cómo crear varias empresas en un área de trabajo?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Puedo crear varias empresas con el mismo NIT en ContaPyme?  
- ¿Cómo separo unidades de negocio en el sistema?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En ContaPyme es posible crear varias empresas dentro de la misma área de trabajo. Generalmente se configuran de esta manera cuando comparten el mismo NIT, lo que se conoce como unidades de negocio. Si tu licenciamiento incluye múltiples empresas, podrás realizarlo.

1. 🔑 **Verifica permisos y licencias**  
   - Debes ingresar con un usuario que tenga perfil administrador.  
   - Confirma que tu licencia permite manejar múltiples empresas (esto se consulta en el Portal de Clientes → Mis licencias) 

2. 📂 **Crear el área de trabajo (si la empresa estará en un área nueva)**  
   - Ruta: `Botón de ContaPyme (Parte superior izquierda) → Servidor → Catálogo de áreas de trabajo → Crear`.  

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Catálogo de áreas de trabajo](https://www.contapyme.com/conocimientocontapyme/010_BS/area_trabajo.png)

   - Completa:  
     - **Identificación:** código único (ejemplo: `CMBMuebles_2026`).  
     - **PUC:** selecciona el plan de cuentas (ej. PUC para comerciantes).  
     - **Grupo NIIF:** el grupo contable al que pertenece la empresa.  
     - **Descripción:**  un texto breve para identificar el área.  
     - Guarda y valida el acceso con el usuario ADMIN (Este usuario es el que se crea por defecto).  

3. 🏢 **Crear la empresa dentro del área de trabajo**  
   - Ruta: `Básico → Empresa → Crear empresa`.   
   - Indica el código de la nueva empresa. Recuerda que los campos en blanco son obligatorios y los verdes son opcionales, por tanto, completa los datos principales: Tipo de documento (ej. `Cédula`, `Nit`), número del documento, nombre de la empresa (ej. `MiEmpresa 2026`), y así, navega entre cada pestaña e indica los datos más relevantes, entre más completa la información, mejor, porque los informes y reportes saldrán con todos los datos de la empresa.    
   - **Configuraciones:** Durante el proceso de creación de la empresa, revisa muy bien en la pestaña **Clasificación tributaria** los atributos que tu empresa debe aplicar, porque esto es indispensable para el cálculo automático de impuestos que se realiza en las operaciones.

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Pestaña de clasificación tributaria](https://www.contapyme.com/conocimientocontapyme/010_BS/clasificacion_tributaria.png)

4. 🏢 **Crear nueva empresa dentro de la misma área de trabajo**  
    - Ruta: `Básico → Empresa → Crear empresa`.   
  Realizar el mismo proceso del paso anterior y así podras crear varias empresas en la misma área de trabajo.  

**Recomendaciones:**  
- ⚠️ Recuerda que para crear varias empresas dentro de la misma área de trabajo, tu licencia debe tener múltiples empresas. 
 
#### 📌 Recursos adicionales 
- [Video: Creación de la empresa](https://www.youtube.com/watch?v=AOtaKsVHv8o&t=2s)

---

### ¿Cómo independizar varias empresas que están en la misma área de trabajo?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo separar varias empresas que están en una misma área?  
- ¿Cómo independizar empresas paso a paso en ContaPyme?  
- ¿Cómo garantizar que cada empresa quede en un área única?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Cuando tienes varias empresas en la misma área de trabajo y quieres que cada una quede independiente, el procedimiento consiste en **recuperar la copia completa del área en nuevas áreas** y, en cada recuperación, dejar solo una empresa.  

Un detalle importante:  
👉 En ContaPyme, **la empresa que tengas seleccionada (abajo a la izquierda en la ventana principal) es la que se va a limpiar**.  
Por eso, si quieres conservar la empresa 1, debes seleccionar primero la 2 y luego la 3 para limpiarlas, y después eliminarlas.  

1. 🔑 **Permisos y respaldo**  
   - Ingresa con usuario que tenga perfil administrador.  
   - Realiza una copia de seguridad del área completa:  
     `Botón de ContaPyme (Parte superior izquierda) → Servidor → Explorador de copias → Nueva`.  
   ⚠️ Esta copia incluye **todas las empresas** del área de trabajo.  

2. 📂 **Trabajar en el área original (ejemplo: conservar Empresa1)**  
   - Selecciona la **empresa 2** en la parte inferior izquierda.

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Cambiar de empresa](https://www.contapyme.com/conocimientocontapyme/010_BS/empresa_2.png)

   - Limpia esa empresa: `Utilidades → Otras utilidades → Limpiar empresa`. 

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Limpiar empresa](https://www.contapyme.com/conocimientocontapyme/010_BS/limpiar_empresa.png)

   - Luego selecciona la **empresa 3** y haz lo mismo.  
   - Después de limpiar, elimina empresa 2 y empresa 3.  
   - Resultado: en esta área queda solo la **Empresa1** independiente.  

3. 📥 **Crear nueva área y recuperar copia (ejemplo: conservar Empresa2)**  
   - Crea un área nueva: `Botón de ContaPyme (parte superior izquierda) → Servidor → Catálogo de áreas de trabajo → Crear`. 

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Catálogo de áreas de trabajo](https://www.contapyme.com/conocimientocontapyme/010_BS/area_trabajo.png)

   - Recupera la copia realizada en el paso 1 (`Botón de ContaPyme → Servidor → Explorador de copias → Recuperar`).  
   - Selecciona la **empresa 1**, límpiala.  
   - Selecciona la **empresa 3**, límpiala.  
   - Elimina la 1 y la 3.  
   - Resultado: en esta nueva área queda solo la **Empresa2** independiente.  

4. 🔄 **Repetir el proceso para Empresa3**  
   - Crea otra área nueva.  
   - Recupera la misma copia.  
   - Selecciona empresa 1 → limpiar.  
   - Selecciona empresa 2 → limpiar.  
   - Elimina 1 y 2.  
   - Resultado: en esta área queda solo la **Empresa3** independiente.  

5. ✔ **Validar cada empresa**  
   - Ingresa a cada área de trabajo y confirma que solo exista la empresa correspondiente.   

**Recomendaciones importantes:**  
- ✅ Haz siempre copia de seguridad antes de limpiar o eliminar.  
- ⚠️ Verifica bien la empresa seleccionada antes de limpiar (es la que se borra).  
- 📌 Usa nombres claros con año (ej. `Empresa1_2026`) para identificar cada ejercicio.  
- 💡 Este método evita que varias empresas queden mezcladas dentro de una misma área de trabajo.  

---

### ¿Cómo cambiar la fecha de trabajo en el sistema?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Dónde cambio la fecha en ContaPyme?  
- ¿Cómo registro comprobantes con fecha diferente a la actual?  
- ¿Por qué mis operaciones aparecen con otra fecha?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
La **fecha de trabajo** es la que usa ContaPyme para registrar automáticamente todas las operaciones durante tu sesión (facturas, comprobantes, reportes, etc.).  
Por defecto, se toma la fecha actual del computador, pero puedes modificarla en cualquier momento según lo que necesites.  

1. 🔎 **Ubicar la barra inferior del sistema**  
   - Al ingresar a ContaPyme, en la parte inferior (banda azul) siempre verás una franja con varias opciones que se mantienen visibles en todo momento.  
   - Allí encontrarás:  
     - **Empresa:** la empresa en la que estás trabajando.  
     - **Sede:** (si tienes varias sedes) puedes elegir en cuál trabajar.  
     - **Fecha de trabajo:** el campo que define la fecha activa.  
     - **Usuario:** el usuario con el que ingresaste al sistema. 

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Fecha de trabajo](https://www.contapyme.com/conocimientocontapyme/010_BS/fecha_trabajo.png)

2. 📅 **Cambiar la fecha de trabajo**  
   - Haz clic sobre la fecha en la barra azul.  
   - Selecciona la nueva fecha desde el calendario que aparece.  
   - Una vez elegida, el sistema actualizará la fecha de inmediato.  

3. 🧾 **Efecto del cambio de fecha**  
   - Todas las operaciones que registres a partir de ese momento usarán la **nueva fecha de trabajo**.  
   - Los listados, informes y consultas también mostrarán los movimientos con base en esa fecha.  

**Ejemplo práctico:**  
Si tu computador está en 01/01/2026 pero necesitas registrar movimientos de diciembre de 2025, basta con cambiar la **fecha de trabajo** a `31/12/2025`. Así, todas las operaciones quedarán registradas con esa fecha.  

**Recomendaciones:**  
- ✅ Cambia la fecha únicamente cuando sea necesario (por ejemplo, para registrar operaciones atrasadas).  
- ⚠️ Verifica la fecha antes de grabar comprobantes, ya que una fecha incorrecta puede afectar balances y reportes.  
- 💡 Recuerda que la fecha de trabajo es individual por usuario y se puede modificar en cualquier momento.  

---

### ¿Cómo generar una copia de seguridad en ContaPyme en una ruta específica?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo hago un respaldo de la información en ContaPyme?  
- ¿Dónde creo copias de seguridad del sistema?  
- ¿Cómo guardar la información para no perderla?  
- No me permite realizar la copia de seguridad
- ¿Qué revisar dado que no permite realizar una copia de seguridad?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
La **copia de seguridad** garantiza que tu información esté protegida y disponible en caso de fallos, cambios de equipo o errores humanos. Generar una copia en ContaPyme es un proceso sencillo y rápido, pero debe hacerse con regularidad y siguiendo buenas prácticas.  

1. 🔑 **Permisos necesarios**  
   - Ingresa con un usuario administrador en el equipo principal.  

2. 📂 **Ruta para generar la copia**  
   - Menú: `Botón de ContaPyme (Parte superior izquierda) → Servidor → Explorador de copias → Nueva`.  

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Copia nueva](https://www.contapyme.com/conocimientocontapyme/010_BS/copia_nueva.png)

   - Seguidamente, selecciona la **ruta dónde deseas guardar la copia** (ejemplo: disco local, red o unidad externa).  
   - El sistema creará automáticamente un archivo de respaldo con toda la información del área de trabajo en la ruta seleccionada.  

3. ✔ **Confirmar finalización**  
   - El sistema mostrará un mensaje indicando que la copia se generó exitosamente.  
   - Verifica que el archivo esté guardado en la carpeta seleccionada.  

**Recomendaciones importantes:**  
- ✅ Genera copias de seguridad periódicas (ejemplo: a diario o al final de cada jornada).  
- 💡 Guarda las copias en un medio externo (USB, disco duro externo, nube).  
- ⚠️ No confíes solo en el disco del servidor, ya que si se daña, perderías el respaldo.  

**Ejemplo práctico:**  
El contador termina la jornada del 30 de septiembre de 2025.  
Genera la copia desde `Explorador de copias → Crear copia` y la guarda en un disco externo con el nombre `Respaldo_Sep30_2025`.  
Así garantiza que toda la información del día quede asegurada.  

**Si no te permite realizar la copia de seguridad en ContaPyme, aquí tienes algunos pasos que puedes seguir para solucionar el problema**
- Verifica la ubicación de la copia. Asegúrate de que la ruta donde intentas guardar la copia de seguridad sea accesible y tenga suficiente espacio disponible.
- Si usas un disco externo, asegúrate de conectarlo antes de generar la copia.
- Mantén al menos una copia local y otra en la nube para mayor seguridad.

#### 📌 Recursos adicionales
- [Video: Generación de copias de seguridad manuales y automáticas](https://www.youtube.com/watch?v=mSEf2R-MmFg)
- [Video: Recuperación de copias de seguridad](https://www.youtube.com/watch?v=Xu6SlMfo_qA)

---

### ¿Para qué sirve una copia espejo y cómo generarla?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Qué es la copia espejo y por qué la necesito?  
- ¿Cómo activo una copia secundaria de respaldo?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
La **copia espejo** es una segunda copia del respaldo (una “copia de la copia”) que se guarda en otra ubicación distinta a la carpeta de copias principal. Sirve para tener redundancia: si la copia principal falla (disco dañado, problema en el servidor, ransomware), tendrás otra copia en un lugar seguro.

**¿Cómo generarla (pasos sencillos)?**
1. 🔑 Entra con un usuario que tenga un perfil administrador.  
2. ⚙️ Abre la configuración general del sistema:  
   `Botón de ContaPyme → Configuración → Configuración todos los usuarios`.  
3. 📂 Ve a: `CONFIGURACIÓN GENERAL DE COPIAS DE SEGURIDAD → Copias de seguridad espejo`.  

   La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
   ![Copia espejo](https://www.contapyme.com/conocimientocontapyme/010_BS/copia_espejo.png)

4. ✅ Marca **“Habilitar el manejo de copias de seguridad espejo”**.  
5. 📁 Define la **ubicación** donde quieres que se guarde la copia espejo (recomendado: unidad externa o carpeta de red distinta al servidor).  
6. ✔ Guarda la configuración y acepta. Desde ese momento, cada vez que se genere una copia automática también se creará la copia espejo según la configuración.

**Notas importantes:**  
- 💾 Se recomienda que la ubicación espejo sea **física distinta** (otro disco, otro servidor o nube) para protegerte frente a fallas locales.  
- ⚠️ Algunas acciones manuales (por ejemplo: crear copias desde el Explorador de copias) **pueden no generar** copia espejo según la configuración; revisa la nota en tu sistema.

#### 📌 Recursos adicionales
- [Video: Copia de seguridad espejo](https://www.youtube.com/watch?v=Axpg1rRdSW8)

---

### ¿Cómo verificar que las copias se están generando correctamente?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo sé si las copias se están creando cada día?  
- ¿Dónde veo las copias que hizo el sistema?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Verificar las copias es simple: revisas la lista de copias en el sistema y confirmas que existen los archivos en la carpeta configurada, con fecha y tamaño coherentes.

**Pasos para comprobarlo (rápido):**
1. 🔑 Accede con usuario administrador.  
2. 📋 Revisa el **Explorador de copias** en ContaPyme:  
   `Botón de ContaPyme (parte superior izquierda) → Servidor → Explorador de copias`.  
   - Allí verás la lista de copias disponibles (fecha, hora, área de trabajo).  
3. 🗂 Abre la carpeta física configurada para las copias (por defecto):  
C:\ProgramData\InSoft\Datos V4\ContaPyme\SERVIDOR\AREAS\DOMINIO1\AREATRABAJO1\Copias
- Verifica que existan archivos recientes (.zip, .fbk o el formato configurado) y que su fecha/hora coincida con la última copia.  
4. 🔍 Abre (o extrae) uno de los archivos para confirmar que contiene datos y que descomprime correctamente.  
5. 📥 Si tienes copia espejo, revisa también la carpeta espejo (la ruta que configuraste) y confirma que allí también exista el respaldo.  
6. 🧪 Prueba práctica: genera manualmente una copia ahora (`Explorador de copias → Nueva`), espera a que finalice y verifica que ese archivo aparezca en las carpetas (principal y espejo).

**Qué más revisar (configuración):**
- 🕒 Comprueba la **periodicidad de generación** en: `Configuración general → Periodicidad de generación de las copias`.  
- 🏷 Verifica el **nombre de las copias** (para identificar la fecha/área): `Configuración general → Nombre para copias automáticas`.  
- 📣 Observa mensajes en pantalla: cuando el sistema crea la copia automática suele mostrar confirmación.

**Recomendaciones:**  
- ✅ Haz comprobaciones semanales y una restauración de prueba periódica en ambiente de prueba.  
- ⚠️ Si no encuentras copias, revisa permisos de carpeta, espacio en disco y que el servicio/máquina tenga acceso de escritura.

---

### ¿Cómo personalizar la ubicación de las copias de seguridad?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Dónde puedo cambiar la carpeta donde se guardan los respaldos?  
- ¿Cómo hago para que las copias se guarden en un disco externo o NAS?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Puedes cambiar la carpeta donde ContaPyme guarda las copias automáticas y también la carpeta donde se crean las copias espejo. Esto es útil para que las copias queden en un disco externo.

**Pasos para personalizar la ubicación (servidor):**
1. 🔑 Entra con usuario administrador en el equipo principal (Servidor).  
2. ⚙️ Abre: `Botón de ContaPyme (Parte superior izquierda) → Configuración → Configuración todos los usuarios`.  
3. 📁 Selecciona **Personalizar ubicación de archivos** (sección dentro de la configuración general).  
4. 🖱 Busca el campo **“Ubicación de copias de seguridad automáticas (en el servidor de datos)”** y cambia la ruta por la carpeta que prefieras (por ejemplo: `D:\Respaldos\Copias`).  
5. ✔ Guarda y aplica la configuración (puedes “Aplicar a todos los usuarios” si lo deseas).  
6. 🔁 Si usas copia espejo, ve a `CONFIGURACIÓN GENERAL DE COPIAS DE SEGURIDAD → Copias de seguridad espejo` y allí define la **ubicación espejo** (recomendado: distinto disco o ruta de red).  
7. 🧪 Genera una copia manual (`Explorador de copias → Nueva`) y verifica que el archivo se cree en la nueva ruta.

**Notas útiles:**  
- 🔧 Durante la instalación también puedes definir la ubicación de la base de datos; cambiarla luego se hace desde esta configuración.  
- ⚠️ Si la ruta está dentro de la carpeta “Documentos” del área, el sistema aplicará reglas especiales (p. ej. formato ZIP para integrarlo en las copias).  
- 🌐 Para ubicaciones en red asegúrate de que la cuenta del servidor tenga permisos de lectura/escritura en la carpeta destino.

**Recomendaciones:**  
- ✅ Usa una ruta externa o de red para mayor seguridad (no dejes copias solo en el disco local del servidor).  
- 📌 Anota y documenta la nueva ruta para que el equipo de TI y soporte la conozcan.

---

### ¿Cómo personalizar el nombre de las copias de seguridad?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Puedo hacer que las copias tengan el nombre con la fecha y el área?  
- ¿Qué variables puedo usar para nombrar los respaldos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Puedes definir una plantilla para el **nombre** de los archivos de copia automática usando variables (fecha, área, día, mes, año, hora, etc.). Esto ayuda a identificar rápidamente cada respaldo.

**Pasos para personalizar el nombre (fácil):**
1. 🔑 Accede con usuario administrador.  
2. ⚙️ Ve a: `Botón de ContaPyme → Configuración → Configuración general del sistema`.  
3. 📂 Navega a: `CONFIGURACIÓN GENERAL DE COPIAS DE SEGURIDAD → Nombre para copias automáticas`.  
4. 📝 En el campo **Nombre de la copia**, escribe la plantilla que quieras, o usa el botón **“Clic aquí para agregar una variable al nombre de la copia”** para insertar las variables sugeridas (verás opciones como: `[NAREA]`, `[FECHA]`, `[#MES]`, `[#DIA]`, `[HORA]`, `[FAÑO]`, etc.).  
- Ejemplos de plantillas útiles:  
  - `BCK_[NAREA]_[FECHA]` → `BCK_AREA1_2025-09-29.zip`  
  - `BCK_[NAREA]_[FAÑO]-[#MES]-[#DIA]_[HORA]` → `BCK_AREA1_2025-09-29_14-02`  
5. ✔ Guarda la configuración. Las próximas copias automáticas se crearán con ese nombre.

**Consejos de nombrado:**  
- ✅ Incluye el **nombre del área** y la **fecha completa** para evitar duplicados.  
- 💡 Usa variables para automatizar el formato y evitar errores manuales.  
- ⚠️ Evita caracteres especiales en nombres de archivo (espacios exagerados, símbolos raros) para compatibilidad.

---

### ¿Por qué ContaPyme bloquea una licencia?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
ContaPyme puede **bloquear una licencia** cuando detecta un uso incorrecto o una inconsistencia en la activación.  
El bloqueo evita que la misma licencia se utilice en más equipos de los autorizados o en condiciones no válidas.

**Causas más comunes del bloqueo:**
1. 🔁 **Cambio de hardware:** si se reinstala Windows, cambia el disco o tarjeta de red, el sistema interpreta que es otro equipo.  
2. 🌐 **Problemas de conexión:** si la validación con el servidor de licencias no se completa correctamente.  
3. 🧩 **Uso simultáneo indebido:** una misma licencia usada en dos computadores distintos.  
4. ⚙️ **Reinstalaciones repetidas** sin desactivar la licencia anterior.  

**Solución:**
1. 🧾 Verifica que la licencia esté activa solo en el equipo que la está utilizando, en caso de querer trasladar la licencia para un nuevo equipo, debes descativar la licencia en el actual:  
   `Botón de ContaPyme (Parte superior izquierda) → Servidor → Catálogo de licencias → Desactivar licencia automáticamente`.  

---

### ¿Qué se puede hacer si al tratar de recuperar una copia de seguridad se genera error y no termina el proceso?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si al **recuperar una copia** el proceso muestra error o no concluye, puede deberse a un archivo dañado, una copia incompleta o a que el antivirus o el firewall estén interfiriendo.  

**Pasos recomendados:**
1. 🧾 Verifica que el archivo de copia (.zip o .fbk) esté completo (no interrumpido ni renombrado).  
2. 📋 Si tienes la copia en formato .zip, descomprímela (`Clic derecho sobre el archivo → Extraer aquí`). Si el proceso finaliza correctamente, significa que la copia está completa; de lo contrario, está incompleta o presenta errores. 
2. 📁 Copia el archivo a una ruta local corta (por ejemplo `C:\Descargas`) y sin caracteres especiales.  
3. 🔒 Desactiva temporalmente antivirus o firewalls mientras haces la recuperación.  
4. 🧩 Intenta recuperar nuevamente desde:  
   `Botón de ContaPyme (Parte superior izquierda) → Servidor → Explorador de copias → Recuperar`.  
5. 💡 Si el error persiste, prueba con otra copia más reciente o contacta a soporte para validación técnica.  

**Recomendaciones:**  
- ⚠️ Evita recuperar copias directamente desde USB o red; siempre copia el archivo al disco local primero.  
- ✅ Mantén varias copias de respaldo de diferentes fechas.  

#### 📌 Recursos adicionales
- [Video: Recuperación de copias de seguridad](https://www.youtube.com/watch?v=Xu6SlMfo_qA)

---

### ¿Por qué se bloquea el sistema ContaPyme al generar o cerrar un informe?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Por qué el informe no abre o se queda cargando?  
- ¿Qué hacer si ContaPyme se congela al consultar reportes?  
- ¿Por qué el sistema se cierra al generar un informe?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si el sistema **se congela, se cierra o no responde al generar o cerrar un informe**, normalmente se debe a temas de rendimiento del equipo, archivos temporales dañados o interferencias del sistema operativo.  
A continuación, te explicamos las causas más comunes y cómo solucionarlo paso a paso.  

**Causas frecuentes:**
1. ⚙️ **Falta de recursos del equipo:** poca memoria RAM o procesador sobrecargado.  
2. 📊 **Informes muy extensos:** rangos de fechas muy amplios o demasiados datos consultados.  
3. 📂 **Archivos de caché o temporales dañados.**  
4. 🧱 **Conflictos con antivirus o permisos restringidos de Windows.**  

**Solución paso a paso:**
1. 🧹 **Limpia la caché del sistema:**  
   - Cierra ContaPyme completamente.  
   - Abre nuevamente el sistema con doble clic.  
   - Escribe tu usuario y contraseña.  
   - Antes de ingresar, haz clic en las **flechas de opciones adicionales** (debajo del recuadro de acceso).  
   - Activa la casilla ✅ **"Refrescar caché del sistema"** y luego ingresa normalmente.  
   Esto fuerza al sistema a reconstruir los archivos temporales, eliminando datos corruptos que pueden causar bloqueos.  

2. 🚀 **Cierra otros programas abiertos** antes de generar informes grandes (Excel, navegadores, etc.) para liberar memoria.  

3. 💾 **Verifica los recursos del equipo:**  
   - RAM mínima recomendada: **4 GB + 2 GB adicionales para Firebird**.  
   - CPU: revisa que no esté al 100% de uso.  
   - Espacio libre en disco: al menos **20 GB**.  

4. 💻 **Prueba desde otro computador** que tenga acceso a la misma base de datos.  
   - Si el informe se genera correctamente desde otro equipo, el problema está en el computador original (rendimiento o permisos locales).  

5. 👥 **Verifica con otro usuario del sistema.**  
   - Si el informe se abre correctamente con otro usuario, puede haber una configuración o permiso afectado en el usuario anterior.  

**Si el problema continúa:**  
- 📞 Contacta al área de soporte técnico de ContaPyme e informa el mensaje exacto del error o adjunta una captura de pantalla.  

**Recomendaciones adicionales:**  
- ⚠️ procura no generar informes con rangos excesivos (por ejemplo, todo un año). Hazlo por periodos más cortos.  
- 💻 Asegúrate de que el sistema operativo esté actualizado y el antivirus no bloquee archivos del programa.  

---

### ¿Cómo modificar permisos de usuario en ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo cambio los permisos de acceso de un usuario?  
- ¿Dónde modifico los privilegios o funciones que puede usar cada usuario?  
- ¿Cómo restringir opciones del sistema para algunos usuarios? 
- Me ayudan para quitar los permisos a un usuario
- ¿Dónde configurar los permisos para un usuario?
- No puedo modificar operaciones por falta de permisos
- No tengo permisos para modificar operaciones

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En ContaPyme, los **permisos** definen qué funciones, módulos u operaciones puede usar cada usuario.  
Modificarlos correctamente te permite controlar el acceso y proteger la información del sistema.  

**Pasos para modificar los permisos de un usuario:**

1. 🔑 **Ingresa con un usuario administrador.**  
   Solo los usuarios con rol de servidor o administrador pueden modificar perfiles de seguridad.

2. 📂 **Ruta para acceder:**  
   `Pestaña Básico → Usuarios → Perfiles de seguridad para clientes Desktop`.  

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Perfiles de seguridad](https://www.contapyme.com/conocimientocontapyme/010_BS/basico_permisos.png)

3. ✏️ **Selecciona el perfil que deseas ajustar** y haz clic en **Modificar**.  
   - En la **columna izquierda** verás todos los módulos disponibles (por ejemplo: Básico, Contabilidad, Inventarios, Gastos, etc.).  
   - En la **columna derecha**, se muestran las opciones de cada módulo: **Catálogos, Operaciones, Informes, Opciones**.  
   - Marca ✅ las opciones que el usuario podrá usar y desmarca ❌ las que no debe tener acceso.

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Registro de perfil](https://www.contapyme.com/conocimientocontapyme/010_BS/registro_perfil.png)

4. 💾 **Guarda los cambios** haciendo clic en **Aceptar**.  
   Esto actualiza el perfil de seguridad con la nueva configuración.  

5. 👥 **Verifica qué perfil tiene asignado el usuario:**  
   - Ruta: `Pestaña Básico → Usuarios → clic derecho sobre el usuario → Modificar`.  
   - En la parte superior, revisa el campo **Perfil principal** y confirma que corresponde al perfil que acabas de modificar.

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Perfil principal](https://www.contapyme.com/conocimientocontapyme/010_BS/perfil_principal.png)

6. 🔁 **Pide al usuario cerrar sesión y volver a ingresar.**  
   Los nuevos permisos se aplican solo al iniciar sesión nuevamente.

**Consejos importantes:**  
- ✅ Puedes usar los **perfiles predefinidos** como base (Administrador, Contador, Vendedor) y ajustarlos según tus necesidades.  
- ⚠️ No otorgues permisos de servidor ni de configuración a usuarios que no los necesiten.  
- 🧩 Si necesitas crear un perfil nuevo desde cero, puedes hacerlo desde el mismo módulo, con la opción **Crear perfil**.  

---

### ¿Cómo configurar una impresora para que se pueda imprimir desde ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Por qué no me aparece mi impresora en ContaPyme?  
- ¿Cómo hago para que ContaPyme reconozca una impresora nueva?  
- ¿Cómo imprimir desde otro equipo en red?   
- ¿Cómo volver a configurar una impresora que se desconfiguró?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Para imprimir desde ContaPyme, es necesario que la impresora esté correctamente instalada en el sistema operativo **Windows**, ya que el programa toma las impresoras directamente desde allí.  
Una vez instalada, ContaPyme la reconocerá automáticamente sin necesidad de configuraciones adicionales dentro del sistema.

**Pasos para configurar la impresora:**

1. 🖨️ **Instala la impresora en tu equipo:**  
   - Ve al **Panel de control → Dispositivos e impresoras → Agregar impresora**.  
   - Sigue el asistente de instalación o usa el disco/controlador del fabricante.  
   - Si es una impresora de red, asegúrate de que esté compartida y visible en la red local.

2. ⚙️ **Verifica que esté configurada como predeterminada:**  
   - En la misma ventana de **Dispositivos e impresoras**, haz clic derecho sobre la impresora y selecciona **“Establecer como predeterminada”**.  
   - Esta será la que usará ContaPyme al momento de imprimir.

3. 🔄 **Abre ContaPyme y prueba una impresión:**  
   - Desde cualquier módulo (por ejemplo, Informes o Catálogos), selecciona **Imprimir**.  
   - El sistema usará la impresora predeterminada de Windows.  
   - Si deseas cambiarla, puedes hacerlo directamente desde la ventana de impresión.

**Recomendaciones importantes:**  
- ✅ Si la impresora se usa en varios equipos, asegúrate de que tenga el **mismo nombre en todos los computadores** para evitar errores.  
- 🌐 Si es una **impresora de red**, confirma que el equipo servidor esté encendido y que la conexión esté activa.  
- 🧩 Si tienes problemas al imprimir, prueba reinstalando el controlador (driver) o seleccionando nuevamente la impresora desde Windows.  
- 🧾 Para impresoras especiales (como de etiquetas o tickets), se deben configurar tamaños de papel específicos desde Windows antes de usarlas en ContaPyme.

---

### ¿Cómo imprimir cualquier operación desde ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo imprimo una factura o comprobante en ContaPyme?  
- ¿Cómo reimprimo documentos ya registrados?  
- ¿Cómo ver vista previa antes de imprimir en el sistema?  
- ¿Por qué no puedo imprimir documentos desde ContaPyme? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En ContaPyme puedes imprimir fácilmente cualquier documento del sistema, como **facturas, recibos, comprobantes, notas contables o informes**.  
El proceso es muy sencillo y puedes hacerlo directamente desde la operación o desde el manejador de operaciones.

**Pasos para imprimir una operación:**

1. 📋 **Abre el documento que deseas imprimir:**  
   - Haz doble clic sobre la operación (por ejemplo, una factura o comprobante) para abrirla.  

2. 🖨️ **Imprime desde la ventana de la operación:**  
   - Haz clic en el botón **Operación → Imprimir**, o utiliza el atajo de teclado `Ctrl + Y`.  

3. ⚙️ **Imprime sin abrir la operación (opcional):**  
   - Desde el **Manejador de operaciones**, selecciona el registro y presiona `Ctrl + Y`.  
   - Esto abrirá directamente la ventana de impresión.  

4. 🧾 **Configura la impresión:**  
   - En la ventana de impresión, selecciona el **documento de impresión** que deseas usar (por ejemplo: formato de factura o recibo).  
   - Puedes dejar la **impresora predeterminada** o elegir otra instalada en tu equipo.  
   - Si lo deseas, haz clic en **Vista previa** para revisar el formato antes de imprimir.  

5. ✔ **Confirma y envía a impresión:**  
   - Haz clic en **Imprimir** para enviar el documento a la impresora seleccionada.  

**Para imprimir informes o reportes:**
1. 📊 Genera el informe que necesites.  
2. 🖨️ En la parte superior de la pantalla, haz clic en el ícono **Imprimir** de la cinta de opciones.  
3. 🖱️ Verifica la impresora por defecto y selecciona **Aceptar**.  

**También puedes:**  
- 🔁 **Reimprimir documentos** desde el módulo de informes de documentos (por ejemplo: consultar factura → imprimir nuevamente).  

**Recomendaciones:**  
- ✅ Asegúrate de tener configurada correctamente la impresora en Windows antes de imprimir.  
- 💡 Si no se imprime nada, verifica que la impresora esté activa y no haya documentos en cola.  
- ⚠️ Si deseas imprimir en formatos especiales (como papel POS o etiquetas), ajusta previamente el tamaño del papel en la impresora predeterminada.  

---

### ¿Cómo detener una impresora que está imprimiendo de forma continua o fuera de control?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si una impresora comienza a imprimir sin parar o imprime hojas vacías, puedes detenerla manualmente de forma segura.

**Pasos:**
1. ⏸️ En el equipo, abre **Panel de control → Dispositivos e impresoras**.  
2. 🖨️ Haz clic derecho sobre la impresora → **Ver lo que se está imprimiendo**.  
3. ❌ Selecciona **Cancelar todos los documentos**.  
4. 🔄 Si no responde, apaga la impresora y vuelve a encenderla.  
5. ⚙️ Si persiste, reinicia el servicio de cola de impresión:  
   - En Windows → busca “Servicios” → reinicia **Spooler de impresión**.  

**Prevención:**  
- ✅ No imprimas múltiples reportes grandes al mismo tiempo.  
- ⚠️ Si ocurre seguido, reinstala el controlador o cambia el cable de conexión.  

---

### ¿Cómo configurar los consecutivos para los diferentes documentos soporte u operaciones del sistema ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo cambio el número inicial de las facturas o comprobantes?  
- ¿Cómo agregar prefijos a los consecutivos de mis documentos?  
- ¿Cómo controlar la numeración automática en ContaPyme?  
- ¿Cómo asigno una máscara a un documento soporte?
- ¿Para qué sirve la máscara en un documento soporte?
-¿Cómo se define la máscara de numeración en un documento soporte? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Los **consecutivos** son los números que identifican cada documento que registras en el sistema, como **facturas de compra y venta, ingresos, egresos, notas contables**, entre otros.  
Cada tipo de documento tiene su propio rango de numeración, el cual puedes configurar fácilmente desde ContaPyme.

**Pasos para configurar la numeración de un documento:**

1. 🔑 **Ingresa con un usuario administrador** o con permisos suficientes para modificar documentos.  

2. 📂 **Ruta:** `Pestaña Básico → Doc. Soporte`.  

3. ✏️ **Selecciona el documento a configurar:**  
   - Por ejemplo, “Factura de venta” o “factura de compra”.  
   - Haz clic derecho sobre el documento y selecciona **Modificar**.  

4. 🔢 **Define el tipo de numeración:**  
   En la pestaña **Definición del documento**, ubica la opción **Numeración**.  
   Allí podrás elegir entre tres tipos de numeración según el comportamiento que necesites:

   - 📝 **Manual:**  
     El usuario digita libremente el número de documento.  
     Es ideal para casos como **facturas de compra**, donde se debe respetar el número que envía el proveedor.

   - ⚙️ **Automática:**  
     El sistema genera el número de forma consecutiva, sin permitir cambios.  
     Se recomienda para documentos internos (como comprobantes contables o de egreso).

   - 🔒 **Tipo factura de venta:**  
     Esta numeración es **estricta e indeleble**, utilizada en documentos que requieren control legal (por ejemplo, **facturas de venta**).  
     - **Estricto:** el consecutivo aumenta de uno en uno, no puede modificarse.  
     - **Indeleble:** los documentos no pueden eliminarse, solo **anularse**.  

   💡 *Ejemplo:*  
   - Manual → Factura de compra (editable).  
   - Automática → Recibo de caja (consecutivo controlado).  
   - Tipo factura de venta → Factura de venta (numeración regulada por la DIAN).

**5. 🧩 Define la máscara de numeración (formato del número):**  
La **máscara** determina cómo se verá el número del documento (con prefijos, año, mes, etc.).  
Se configura en el campo **Máscara** dentro de la misma ventana.

Puedes combinar letras, números o símbolos según tu necesidad.  
A continuación te mostramos los caracteres más usados:

| Caracter | Significado |
|-----------|--------------|
| `#` | Consecutivo del documento |
| `&&` | Dos dígitos del mes |
| `$$` | Dos dígitos de la semana |
| `@` | Último dígito del año |
| `@@` | Últimos dos dígitos del año |
| `@@@@` | Cuatro dígitos del año |
| `?` | Cualquier carácter por cada “?” |

**Ejemplos de máscaras:**

| Máscara | Resultado generado |
|----------|--------------------|
| `FV-#` | FV-1 |
| `RC@@####` | RC240001 |
| `OPR-@@&&##` | OPR-240901 |
| `FC-??#####` | FC-AB00001 |

💡 *Nota:*  
No necesitas colocar varios signos “#”; basta con uno solo y el sistema incrementará el consecutivo automáticamente.

**6. 🔢 Establece los rangos del consecutivo:**  
En la parte derecha de la ventana, indica el **consecutivo inicial y final**.  
Esto define desde qué número comienza el documento y hasta cuál puede numerarse.  
Si es un documento de tipo factura, se debe activar la opción de **Habilitar manejo de resoluciones / autorizaciones** y se activa una nueva pestaña de **Resoluciones** en la cual deebes definir el númeo de resolución emitida, el consecutivo inicial y final y las fechas de vigencia de la resolución. 

**Recomendaciones importantes:**  
- ✅ Cada tipo de documento debe tener su propia máscara, no es posible tener dos iguales.  
- ⚠️ Si es una **factura de venta electrónica**, asegúrate de **Habilitar manejo de resoluciones / autorizaciones**  y configurar correctamente resolución DIAN y consecutivos.  
- 📌 Si necesitas cambiar el formato de los números (por ejemplo, agregar año o prefijo), puedes ajustar la **máscara** en cualquier momento antes de generar nuevos documentos.  

#### 📌 Recursos adicionales
- [Video: Catálogo de documento de soporte](https://www.youtube.com/watch?v=79Tj9PHsIeM&t=1s)
- [Video: Explicación de la máscara de soporte](https://www.youtube.com/watch?v=1VufNqroxSo)

---

### ¿Cómo configurar la báscula para impresión de facturas electrónicas?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo conectar una báscula a ContaPyme?  
- ¿Por qué la báscula no muestra peso en la factura?  
- ¿Qué hacer si el sistema no detecta la báscula?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
La configuración de la **báscula** permite que ContaPyme lea automáticamente el peso de los productos en el momento de facturar, evitando digitarlo manualmente.  
Este proceso requiere verificar la conexión física, la instalación del driver, la comunicación por puerto y la configuración dentro del sistema.

**Pasos para configurar correctamente la báscula:**

1. 🔌 **Verifica la conexión física:**  
   - Asegúrate de que el cable de la báscula esté correctamente conectado entre el computador y el equipo.  
   - Si la conexión es **USB a RS232 (puerto serial)**, revisa que el adaptador esté firme en ambos extremos.

2. 💻 **Confirma la instalación del driver del cable conversor:**  
   - Abre el **Administrador de dispositivos de Windows** (`Inicio → Buscar → Administrador de dispositivos`).  
   - En la sección **Puertos (COM y LPT)**, verifica que aparezca el puerto asignado (ejemplo: `COM3`, `COM4`, etc.).  
   - Si aparece con advertencia o no se detecta, instala el **driver del conversor USB/RS232**.  
     Puedes buscarlo en internet o solicitarlo al distribuidor o al soporte de **InSoft**.

3. 🧪 **Haz una prueba de lectura fuera de ContaPyme:**  
   - Usa un software gratuito de prueba de puertos, como **Hercules**.  
   - En el programa, selecciona el mismo puerto COM donde está conectada la báscula.  
   - Verifica que, al colocar un peso, el programa muestre una lectura estable y legible (formato de salida del peso).  
   - Si no se muestra correctamente, revisa el formato de salida desde el manual de la báscula.

4. ⚙️ **Configura la báscula en ContaPyme:**  
   - Entra al sistema con usuario administrador.  
   - Ruta: `Inventarios → Elementos de inventarios → Configuración → Configuración de báscula para operaciones de inventarios`.  
   - Activa la opción **“Habilitar el uso de una báscula para el registro de cantidad en las operaciones de inventarios”**.  
   - Selecciona el **puerto COM** donde está conectada la báscula.  
   - Escoge el **protocolo de comunicación** según el formato de salida verificado con Hercules.  
     👉 Si el formato no aparece, cámbialo directamente desde el panel de la báscula a uno compatible con ContaPyme.  
   - Recomendación: configura la báscula en modo de **lectura continua**.

5. ⚖️ **Prueba desde ContaPyme:**  
   - Haz clic en **“Obtener peso de la báscula”**.  
   - Verifica que el valor mostrado en pantalla coincida con el peso que aparece en el display del equipo físico.  
   - Si los valores coinciden, la báscula está correctamente configurada y lista para usarse durante la facturación electrónica.

**Verificaciones finales:**  
- ✅ Asegúrate de que el puerto COM no esté siendo usado por otro programa.  
- ✅ Si el sistema no muestra lectura, cambia el puerto o verifica el protocolo nuevamente.  
- ⚠️ Si después de seguir todos los pasos no se obtiene lectura, contacta al **distribuidor de la báscula** o al **soporte de InSoft** para revisión técnica.  

---

### ¿Cómo configurar una impresora de código de barras para que se pueda imprimir desde ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo imprimir etiquetas de productos en ContaPyme?  
- ¿Por qué no me imprime el código de barras?  
- ¿Cómo personalizar el formato de mis etiquetas?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
ContaPyme permite **imprimir etiquetas con códigos de barras** de los productos registrados en el inventario.  
Para que funcione correctamente, la impresora debe estar bien instalada en Windows, con su respectivo controlador (driver), y configurada dentro del sistema.

**Pasos para configurar y usar la impresora:**

1. 🖨️ **Instala la impresora en Windows:**  
   - Conecta la impresora por puerto **USB o red**.  
   - Asegúrate de instalar el **driver oficial del fabricante** (Zebra, TSC, Bixolon, Epson POS, etc.).  
   - Comprueba su funcionamiento desde **Panel de control → Dispositivos e impresoras → Imprimir página de prueba**.  

2. ⚙️ **Verifica que esté configurada como predeterminada:**  
   - En Windows, haz clic derecho sobre la impresora y selecciona **“Establecer como predeterminada”**.  
   - Si trabajas desde un equipo adicional, asegúrate de que también tenga acceso a la misma impresora o esté compartida en red.  

3. 📂 **Configura e imprime desde ContaPyme:**  
   - Ruta: `Inventarios → Inventarios (Informes) → Elementos de inventario`.  
   - Selecciona los productos a los cuales deseas imprimir el código de barras.  
   - Aplica los filtros necesarios (por ejemplo: lista de precios o grupo de productos).  
   - Haz clic en **“Ver reporte”**.  
   - En el listado que aparece, el sistema te permite indicar cuántas etiquetas deseas imprimir por cada producto.  
   - Finalmente, haz clic en **Aceptar cambios**, se mostrará la vista previa del formato, y desde ahí selecciona **Imprimir**.  

4. 🎨 **Diseño del formato de impresión:**  
   - Puedes personalizar las etiquetas desde `Diseños de impresión`.  
   - Ajusta el **tamaño**, el **logo de la empresa**, la **fuente**, o el **tipo de código de barras (EAN13, CODE128, etc.)**.  
   - Si utilizas etiquetas pequeñas (por ejemplo 38x25 mm o 50x25 mm), asegúrate de configurar el tamaño correcto desde las propiedades de la impresora en Windows.  

**Recomendaciones importantes:**  
- ✅ Usa **papel térmico o adhesivo** compatible con tu modelo de impresora.  
- 🧾 Si imprimes desde varios equipos, utiliza el **mismo nombre de impresora** en cada uno para evitar errores.  
- ⚠️ No desconectes la impresora durante una impresión o el sistema puede quedarse en cola.  
- 💡 Si la impresión no sale centrada o incompleta, revisa el tamaño del papel y márgenes desde el panel de control.  

---

### ¿Cómo exportar e importar operaciones?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo pasar operaciones de una empresa a otra en ContaPyme?  
- ¿Cómo enviar facturas o movimientos a otro computador?  
- ¿Cómo importar facturas desde otro equipo o sucursal?
- ¿Cómo importar o exportar culaquier operación desde el sistema? 
- Necesito pasar las operaciones de un área de trabajo a otra
- ¿Cómo pasar las operaciones de un área de trabajo a otra?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
La opción de **exportar e importar operaciones** en ContaPyme permite trasladar operaciones (facturas, compras, notas, egresos, órdenes, etc.) de una empresa o área de trabajo a otra.  
Esto es muy útil cuando trabajas en varios equipos o necesitas enviar información contable o de inventario sin mover toda la base de datos.

#### 🧾 Exportar operaciones

**Pasos para exportar operaciones:**

1. 📂 **Ubicación:**  
   Entra al manejador de operaciones `Pestaña Básico` `Manejador de operaciones`.  
   Haz clic derecho sobre la operación u operaciones que deseas exportar:  
   `Utilidades → Exportar operaciones`.

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Opción exportar operaciones](https://www.contapyme.com/conocimientocontapyme/010_BS/exportar_opr.png)

2. ⚙️ **Selecciona el formato de exportación:**  
   Se abrirá la ventana “Exportación de operaciones” con dos opciones:

      La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
      ![Opción exportar operaciones](https://www.contapyme.com/conocimientocontapyme/010_BS/formato_exp.png)

   - **Nativa:** crea un archivo comprimido `.ZIP` con la base de datos `.FDB`, que solo puede importarse en otro ContaPyme.  
   - **JSON:** genera un archivo en formato `.JSON` que puede usarse en otros sistemas compatibles o también reimportarse en ContaPyme.  
   👉 Se recomienda usar el **formato Nativo**, ya que conserva estructura, relaciones y seguridad.

3. 📅 **Define el rango de operaciones a exportar:**  
   El sistema permite elegir entre tres opciones:
   - 🔹 **Operaciones creadas o modificadas entre un rango de fechas.**  
   - 🔹 **Operaciones seleccionadas manualmente.**  
   - 🔹 **Todas las operaciones (con permisos de visualización).**

4. 💾 **Selecciona ubicación y nombre del archivo:**  
   - Haz clic en **Siguiente**.  
   - Elige la carpeta donde se guardará el archivo exportado.  
   - Asigna un nombre fácil de identificar (por ejemplo: `Export_OPR_27-10-2025.zip`).  
   - Clic en **Exportar**.  
   El sistema mostrará una barra de progreso hasta finalizar la exportación.

#### 📥 Importar operaciones

**Pasos para importar operaciones en otra empresa o equipo:**

1. 📂 **Ubicación:**  
   En el manejador de operaciones, haz clic derecho y selecciona:  
   `Utilidades → Importar operaciones`.

2. 🔍 **Selecciona el archivo de exportación:**  
   - Selecciona el formato con el cual deseas realizar la importación de las operaciones.
   - Haz clic en **Siguiente**.
   - Selecciona el archivo .Zip o el archivo Json en carpeta o uno por uno   
   - Si seleccionaste formato **Nativo** solo debes dar clic en **Importar**
   - Si seleccionas el formato **JSon** Se dbee realizar una parametrización adicional
   - Haz clic en **Siguiente**.
   - Selecciona si vas a importar archivo Json desde carpeta o uno por uno. 
   - Luego, debes configurar qué debe hacer el sistema después de importar
   - Finalmente debes dar clic en **Importar**

#### 💡 Recomendaciones importantes

- ✅ Antes de exportar o importar, realiza una **copia de seguridad** del área de trabajo.  
- 📁 Guarda los archivos exportados en una carpeta con nombre claro y fecha.  
- 🧩 Si la importación falla, revisa los permisos del usuario y que el archivo no esté bloqueado o corrupto.



---

### ¿Cómo exportar información desde un equipo e importarla en otro?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo pasar catálogos de un computador a otro en ContaPyme?  
- ¿Cómo exportar el plan de cuentas o los terceros?  
- ¿Cómo importar productos o cuentas desde otro sistema?  
- ¿Cómo exportar catálogos en ContaPyme?
- ¿Cómo pasar un tercero de un ContaPyme a otro? 
- ¿Cómo descargar terceros a excel?
- ¿Cómo descargar listado de terceros? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si trabajas con varios equipos o áreas de trabajo y necesitas mover información (por ejemplo, catálogos de **terceros, plan de cuentas o elementos de inventario**), ContaPyme te permite hacerlo fácilmente mediante la opción de **exportar e importar registros**.  
Esto evita tener que digitar nuevamente la información y asegura que ambos equipos mantengan la misma base de datos estructurada.

#### 💾 Exportar información desde el equipo origen

1. 📂 **Ubica el catálogo que deseas exportar:**  
   - Ingresa al módulo correspondiente (por ejemplo: `Pestaña Básico → Terceros`, `Contabilidad → Plan de cuentas`, o `Inventarios → Elementos de inventario`).  
   - Selecciona una o varias filas según lo que desees exportar.

2. 🖱️ **Haz clic derecho sobre los registros seleccionados:**  
   - Selecciona la opción `Utilidades → Exportar registros`.

3. 📤 **Elige el formato de exportación:**  
   - **Selección a XLSX:** exporta solo los registros seleccionados en formato Excel (editable).  
   - **Toda la lista a XLSX:** exporta todo el catálogo en Excel.  
   - **Selección a BIN:** exporta solo los registros seleccionados en formato nativo de ContaPyme.  
   - **Toda la lista a BIN:** exporta todo el catálogo en formato nativo (recomendado si la información será importada en otro ContaPyme).  

4. 💾 **Guarda el archivo exportado:**  
   - Define una ruta o carpeta de destino (puede ser una memoria USB, disco externo o carpeta compartida en red).  
   - Asigna un nombre identificativo, por ejemplo:  
     `Terceros_2025.BIN` o `Inventarios_2025.xlsx`.

     #### 💡 Nota:

   Cuando se dispone de un archivo en formato XLSX, este puede abrirse fácilmente en Excel y utilizarse como una plantilla de trabajo. A partir de allí, es posible editar la información existente, agregar nuevos registros o realizar ajustes según sea necesario. Una vez realizadas las modificaciones, el archivo puede importarse nuevamente al sistema, permitiendo actualizar la información de forma ágil y manteniendo la consistencia de los datos. Este proceso facilita la gestión masiva de información y optimiza tiempos al evitar la digitación manual registro por registro.


#### 📥 Importar información en el equipo destino

1. 📂 **Ubica el catálogo donde deseas importar la información:**  
   - Ingresa al módulo correspondiente (por ejemplo: `Pestaña Básico → Terceros`).  

2. 🖱️ **Clic derecho dentro del catálogo:**  
   - Selecciona `Utilidades → Importar registros`.

3. 🔍 **Selecciona el archivo exportado:**  
   - Busca el archivo `.BIN` (nativo) o `.XLSX` que guardaste previamente.  
   - Haz clic en **Abrir** y confirma la importación.

4. ✔ **Verifica el resultado:**  
   - Los registros aparecerán automáticamente dentro del catálogo.  
   - Revisa que no existan duplicados o datos incompletos.

#### 💡 Recomendaciones importantes

- ✅ Usa el formato **.BIN** para mantener compatibilidad total entre versiones de ContaPyme.  
- ⚠️ Antes de importar, realiza una **copia de seguridad** del área de trabajo.  
- 🧾 Si exportas a Excel (.XLSX), no modifiques los encabezados ni el orden de columnas antes de volver a importar.  
- 📁 Mantén un control de versiones o fechas para evitar sobreescribir información antigua.  


---

### ¿Cómo restaurar una copia de seguridad en ContaPyme?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo recuperar la información después de un daño o formateo?  
- ¿Cómo restaurar una copia vieja en un nuevo servidor?  
- ¿Cómo traer de vuelta la base de datos anterior en ContaPyme?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Restaurar una copia de seguridad te permite **recuperar toda la información de un área de trabajo o empresa** a partir de un respaldo creado previamente.  
Este proceso es muy útil cuando necesitas devolver el sistema a un estado anterior o mover la información a otro servidor o computador.

#### 🔄 Pasos para restaurar una copia de seguridad

1. 💾 **Ubica el archivo de respaldo:**  
   - Normalmente tiene extensión **`.FBK`** o **`.ZIP`**, según el tipo de copia que hayas generado.  
   - Asegúrate de conocer la carpeta o dispositivo donde guardaste la copia (por ejemplo, disco local, USB o carpeta compartida).

2. 📂 **Abre el Explorador de copias:**  
   - Ruta: `Botón de ContaPyme (Parte superior izquierda)→ Servidor → Explorador de copias → Recuperar`.

3. 🔍 **Selecciona el archivo de copia:**  
   - Busca el archivo de respaldo que deseas restaurar.  
   - Una vez seleccionado, haz clic en **Abrir**.

4. ⚙️ **Confirma la recuperación:**  
   - El sistema te pedirá confirmar si deseas reemplazar la información del área de trabajo.  
   - Haz clic en **Sí** para continuar.  
   - Espera a que finalice el proceso sin interrumpir la conexión ni cerrar ContaPyme.

#### ⚠️ Importante

- ⚠️ **El proceso reemplazará toda la información actual** si restauras sobre un área con el mismo nombre.  
- ✅ **Haz una copia adicional** antes de realizar la restauración, por seguridad.  
- 🖥️ **Solo se puede restaurar desde el servidor o equipo principal**, no desde los terminales auxiliares.  
- 📁 Si necesitas conservar ambas áreas (la original y la restaurada), crea una nueva área de trabajo antes de restaurar la copia.  

#### 💡 Recomendaciones adicionales

- 📌 Verifica que tengas suficiente espacio en disco antes de iniciar la restauración.  
- 🔒 Evita usar el sistema mientras se ejecuta la recuperación.  
- 📤 Una vez restaurada, puedes validar la información abriendo el área y revisando los catálogos o movimientos recientes.  

---

### ¿Puedo eliminar copias antiguas?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo liberar espacio del servidor eliminando copias viejas?  
- ¿Dónde se guardan las copias y cómo borrarlas?  
- ¿Qué hacer si tengo muchas copias acumuladas en ContaPyme?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Sí. Puedes eliminar las copias de seguridad antiguas para liberar espacio en tu equipo o servidor, **siempre y cuando conserves las más recientes o importantes**.  
Esto es recomendable cuando el sistema genera copias automáticas y se van acumulando con el tiempo.

#### 🧭 Pasos para eliminar copias desde ContaPyme

1. 📂 **Abre el Explorador de copias:**  
   - Ruta: `Botón de ContaPyme (Parte superior izquierda) → Servidor → Explorador de copias`.  
2. 🗑️ **Selecciona la copia de seguridad** que ya no necesitas.  
3. ❌ **Haz clic en Eliminar** en la parte superior o usa clic derecho → **Borrar la copia de seguridad seleccionada**.  
4. ✔ **Confirma la eliminación** cuando el sistema te lo solicite.  

#### 💻 Eliminar copias directamente desde la carpeta del sistema

También puedes eliminar las copias manualmente desde la carpeta donde se guardan.  
Por defecto, las copias se almacenan en la siguiente ruta: C:\ProgramData\InSoft\Datos V4\ContaPyme\SERVIDOR\AREAS\DOMINIO1\AREATRABAJO1\Copias

📁 En cada área de trabajo encontrarás una carpeta llamada **Copias**, donde podrás:
- Ordenar los archivos por **fecha**.  
- Eliminar las copias más antiguas.   

#### ⚙️ Recomendaciones

- ⚠️ **Antes de eliminar**, verifica que la copia más reciente esté funcionando correctamente (puedes probar recuperándola temporalmente).  
- 💾 Conserva **al menos las últimas tres copias** más importantes.  
- ☁️ Si usas almacenamiento en red o en la nube, puedes **mover las copias antiguas** a otra ubicación en lugar de borrarlas.  
- 🚫 No elimines copias que no reconozcas o cuya fecha no puedas confirmar, ya que podrían ser respaldos críticos.  

---

### ¿Cómo hacer copia de seguridad en la nube u otra ubicación?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Cómo guardar las copias de ContaPyme en Google Drive o OneDrive?  
- ¿Cómo crear una copia espejo del sistema?  
- ¿Cómo hacer respaldo automático fuera del servidor principal?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
ContaPyme guarda las copias de seguridad localmente en el servidor o equipo principal.  
Sin embargo, puedes crear una **copia espejo** que se guarde automáticamente en otra ubicación, como una carpeta de red, disco externo o servicio en la nube (OneDrive, Google Drive, Dropbox, etc.).

**Pasos para configurar una copia de seguridad en otra ubicación**

1. 🌐 **Instala o configura el servicio en la nube** que usarás:  
   - Ejemplos: **OneDrive, Google Drive, Dropbox, iCloud o NAS local.**  
   - Asegúrate de tener una **carpeta sincronizada** en tu equipo (por ejemplo: `C:\Users\TuUsuario\OneDrive\CopiasContaPyme`).  

2. 📂 **Abre ContaPyme y accede a la configuración de copias espejo:**  
   - Ruta: `Botón de ContaPyme (Parte superior izquierda) → Configuración → Configuración para todos los usuarios → Configuración general de copias de seguridad → Copias de seguridad espejo`.  

3. ⚙️ **Activa la opción** ✅ *“Manejo de copias de seguridad espejo”*.  

4. 📁 **Selecciona la ruta** donde deseas que se guarden las copias adicionales.  
   - Puede ser una carpeta local sincronizada con la nube o una ruta de red.  

5. 💾 **Haz clic en Aceptar** para guardar los cambios.  
   A partir de ese momento, cada vez que se realice una copia en ContaPyme, el sistema creará una **copia duplicada** en la ruta que configuraste.  

**Recomendaciones**

- ✅ **Verifica la sincronización** del servicio en la nube antes de cerrar el día laboral.  
- 💡 Usa nombres de carpetas claros y organizados, por ejemplo:  
  `CopiasContaPyme\2025\Febrero`.  
- ⚠️ **No apagues el equipo ni interrumpas la conexión a internet** mientras se realiza la copia.  
- 🔒 Si usas disco externo, asegúrate de **conectarlo antes** de generar la copia.  
- 📌 Mantén al menos **una copia local y otra en la nube** para mayor seguridad.  

---

### ¿Qué hacer si el programa no abre en los equipos auxiliares?

CANONICAL_ID: PF_BASICO
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.  
- ¿Por qué ContaPyme no abre en los otros computadores?  
- ¿Cómo conectar de nuevo los equipos auxiliares al servidor?  
- ¿Qué hacer si me sale error de conexión con la base de datos?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
Si ContaPyme **no abre en los equipos adicionales (clientes)**, lo más común es que haya un problema de **conexión con el computador principal (servidor)**, que es donde se guarda la base de datos.  
Esto puede deberse a una desconexión de red, a que el servidor está apagado o a que un servicio del sistema no está activo.

**Pasos para revisar y solucionar**

1. 🌐 **Verifica la conexión con el servidor:**  
   - Desde el equipo auxiliar, asegúrate de estar **conectado a la misma red** del servidor.  
   - Puedes probar la conexión haciendo clic en **Inicio → Buscar → CMD**, luego escribir:  
     ```
     ping [IP_del_servidor]
     ```  
     Si ves respuestas con tiempos (ms), la red está funcionando. Si aparece “Tiempo de espera agotado”, no hay conexión y debes revisar el cable, Wi-Fi o permisos de red.

2. 🖥️ **Asegúrate de que el servidor esté encendido y ContaPyme instalado correctamente:**  
   - El programa solo abrirá en los equipos auxiliares si el servidor está encendido y con conexión activa.  
   - No cierres el ContaPyme ni el motor Firebird en el servidor mientras los clientes están trabajando.

3. 🔑 **Confirma la IP del servidor y la ruta de la base de datos:**  
   - En el equipo servidor, entra a la ruta:  
     ```
     C:\ProgramData\InSoft\Datos V4\ContaPyme\SERVIDOR\AREAS\
     ```  
   - Verifica que el archivo de configuración apunte a la dirección IP correcta del servidor.  
   - Si cambió la IP, actualízala con la nueva.

4. ⚙️ **Revisa que el servicio de Firebird esté activo:**  
   - En el servidor, abre el **Administrador de tareas → Servicios** o escribe en el buscador “Servicios”.  
   - Busca los servicios llamados **Firebird Guardian** o **Firebird Server**.  
   - Si aparecen detenidos, haz clic derecho → **Iniciar**.

5. 🧱 **Verifica antivirus o firewall:**  
   - Asegúrate de que **no bloqueen el puerto 3050**, que es el que usa ContaPyme para comunicarse con el servidor.  
   - Si lo bloquean, agrégalo como excepción o pide ayuda al área técnica.

6. 🔄 **Reinicia el equipo auxiliar** y vuelve a abrir ContaPyme.  
   - Si la conexión ya está restablecida, el sistema abrirá normalmente.

**Recomendaciones** 

- ✅ El **servidor siempre debe estar encendido** para que los demás equipos puedan conectarse.  
- ⚠️ Si cambias la IP o reinstalas el servidor, **debes actualizar la conexión** en todos los equipos adicionales.  
- 📁 No modifiques las carpetas de instalación del sistema sin asesoría técnica.  
- 🧩 Si el problema persiste, anota el mensaje de error que aparece en pantalla y comunícalo al **soporte técnico de InSoft**.  

---

### ¿Qué hacer si al recuperar una copia me dice que está en una actualización superior a la del sistema?

#### Respuesta:  
Este mensaje aparece cuando intentas **recuperar una copia de seguridad creada con una versión de ContaPyme más reciente** que la que tienes instalada actualmente.  
Por seguridad e integridad de la información, **ContaPyme no permite restaurar copias hechas en versiones superiores** sobre versiones más antiguas del sistema.

La solución es sencilla: **actualizar el sistema** antes de recuperar la copia.

#### 🧭 Pasos para solucionar el problema

1. 🔎 **Identifica la versión de la copia de seguridad:**  
   - En el mismo mensaje que arroja el sistema al tratar de recuperar la copia, se puede visualizar la actualización en la que fue generada dicha copia. Debes descargar esa misma actualización o la última que se encuentre en el portal de clientes.

2. 🌐 **Descarga la misma versión (o una superior) del sistema:**  
   - Ingresa al **Portal de Clientes ContaPyme** con tu usuario y contraseña.  
   - Ve a la sección **Actualizaciones**.  
   - Descarga la actualización que corresponda a la copia de seguridad.

3. 🖥️ **Actualiza primero el computador principal (servidor):**  
   - Cierra ContaPyme en todos los equipos.  
   - Ejecuta el actualizador.  
   - Finaliza la actualización completamente.

4. 🔄 **Actualiza los equipos adicionales (si aplica):**  
   - Instala la misma actualización del sistema en cada computador adicional.  
   - Verifica que todos queden con la **misma actualización**.

5. 💾 **Recupera nuevamente la copia de seguridad:**  
   - Ruta: `Botón de aplicación → Servidor → Explorador de copias → Recuperar`.  
   - Selecciona la copia y confirma la recuperación.  
   - Esta vez el proceso se completará sin error.

#### ⚠️ Importante

- ❌ No intentes forzar la recuperación sobre una versión más antigua.  
- ✅ Siempre el sistema debe estar **igual o más actualizado** que la copia.  
- 🖥️ La actualización se realiza **primero en el servidor y luego en los equipos adicionales**.  
- 📁 Realiza una copia de seguridad adicional antes de actualizar, por precaución.

#### 💡 Recomendaciones

- 📌 Mantén todos los equipos con la misma actualización para evitar errores de conexión y recuperación.  
- 📞 Si no encuentras la actualización correcta en el portal, contacta a soporte técnico para que te indiquen el instalador adecuado.

**También aplica si preguntas:**  
- ¿Por qué no puedo restaurar una copia antigua?  
- ¿Cómo saber qué versión necesita una copia de seguridad?  
- ¿Qué pasa si intento recuperar una copia con otra versión del sistema?  

---

### ¿Qué puedo hacer cuando ContaPyme dice que ya está conectado el usuario y no es así?

#### Respuesta:  
Este mensaje aparece cuando ContaPyme detecta que **hay un usuario conectado afectando la base de datos**, aunque aparentemente no se vea ninguno activo.  
Esto puede ocurrir por cierres inesperados del programa, apagones, fallas de red o cuando el sistema no se cerró correctamente.

La buena noticia es que **puedes verificar estos usuarios desde el mismo sistema**.

#### 🧭 Pasos para verificar usuarios conectados

1. 🖥️ **Ubícate en el computador principal (servidor):**  
   - Solo desde el equipo principal se pueden ver y administrar los usuarios conectados.

2. 🔘 **Abre el menú principal de ContaPyme:**  
   - Haz clic en el **Botón de ContaPyme** (parte superior izquierda).  
   - Selecciona la opción **Usuarios conectados**.

3. 👥 **Revisa el listado de usuarios:**  
   En esta ventana podrás ver:
   - Nombre del usuario  
   - Fecha y hora de conexión  
   - Equipo o máquina desde donde ingresó  

4. 🔍 **Verifica el estado real:**  
   - ✅ Si aparece un usuario conectado, solicita que cierre sesión correctamente desde su equipo.  
   - ⚠️ Si **NO aparece ningún usuario conectado** y el mensaje continúa, significa que hay un **bloqueo interno o registro residual** del sistema.

#### 🔄 ¿Qué hacer si el mensaje sigue apareciendo?

1. ❌ Cierra ContaPyme completamente en todos los equipos.  
2. 🔁 **Reinicia el servicio Firebird en el servidor:**  
   - Abre el **Administrador de tareas** → pestaña **Servicios**.  
   - Busca **Firebird Server** o **Firebird Guardian**.  
   - Clic derecho → **Reiniciar**.  
3. ▶️ Abre nuevamente ContaPyme e intenta ingresar.

Si después de esto el mensaje persiste, **comunícate con el soporte técnico de ContaPyme**, ellos pueden liberar el usuario bloqueado o revisar directamente la conexión del servidor.

#### 💡 Recomendaciones

- ✅ Siempre cierra ContaPyme usando el botón de salir del sistema.  
- ⚠️ Evita apagar el computador o forzar cierres mientras el programa está abierto.  
- 🌐 Procura no interrumpir la red durante el uso del sistema.  

**También aplica si ves mensajes como:**  
- “El usuario ya se encuentra conectado”  
- “Existen usuarios activos en la base de datos”  
- “No se puede continuar porque hay usuarios conectados”

---

### Al ingresar al sistema aparece la licencia bloqueada, ¿qué se debe revisar?

#### Respuesta:  
Cuando al ingresar a ContaPyme aparece un mensaje indicando que **la licencia está bloqueada**, significa que el sistema no pudo validar correctamente la licencia.  
En la mayoría de los casos, **se puede solucionar fácilmente desde el mismo programa**, sin necesidad de reinstalar.

#### 📌 Descripción del mensaje

Si al dar clic en **Conectar** aparece el mensaje:

**“La licencia se encuentra bloqueada por el sistema, contacte al administrador del programa”**

Esto indica que la licencia no pudo validarse en ese momento.  
Las causas pueden ser vencimiento, uso simultáneo en varios equipos o una validación interna pendiente.

#### 🔑 Pasos para revisar y activar nuevamente la licencia

1. ❌ **Haz clic en “Cerrar” cuando aparezca el mensaje:**  
   - Esto **no cierra ContaPyme por completo**.  
   - Se abrirá automáticamente la ventana de **Validación de licenciamiento**.

2. 📂 **Ingresa al Catálogo de licencias:**  
   - En la ventana de validación, selecciona la opción **Catálogo de licencias**.  
   - El sistema abrirá inmediatamente el listado de licencias registradas.

3. 🔓 **Activa nuevamente la licencia:**  
   - Selecciona la licencia.  
   - Haz clic en **Activar licencia**.  
   - Elige la opción **Activación automática**.  
   - Da clic en **Aceptar**.

4. 🔄 **Cierra y abre nuevamente ContaPyme:**  
   - Al ingresar de nuevo, el mensaje ya no debería aparecer.  
   - Podrás trabajar normalmente.

#### ¿Por qué puede ocurrir este bloqueo?

- ⏳ **Licencia vencida:**  
  Si no se renovó a tiempo, el sistema bloqueará el acceso.

- 💻 **Licencia activa en más de un computador:**  
  Las licencias monousuario solo pueden usarse en un equipo a la vez.

- 🔧 **Cambios recientes en el equipo:**  
  - Actualización de Windows  
  - Cambio de hardware  
  - Restauración o reinstalación del sistema  
  Estos cambios pueden requerir reactivar la licencia.

- ⚙️ **Error temporal de validación interna:**  
  A veces, aunque todo esté correcto, la licencia solo necesita reactivarse desde el catálogo.

#### 💡 Recomendaciones

- ✅ Renueva siempre la licencia antes de su fecha de vencimiento.  
- ⚠️ No abras ContaPyme al mismo tiempo en dos equipos con la misma licencia.  
- 📁 Evita copiar o mover carpetas del sistema entre computadores.  
- ☎️ Si el mensaje persiste después de activar la licencia, comunícate con soporte técnico de ContaPyme e indica el mensaje exacto.

---

### ¿Cómo crear una empresa o una unidad de negocio en ContaPyme y cuál es la diferencia?  

CANONICAL_ID: BAS_EMPRESA_UNIDAD_NEGOCIO  
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):  

📌 Todas las siguientes variantes activan EXACTAMENTE la misma respuesta completa definida en esta pregunta principal.  

- ¿Cuál es la diferencia entre empresa y unidad de negocio en ContaPyme?  
- ¿Cómo crear una empresa en ContaPyme?  
- ¿Cómo crear una unidad de negocio en ContaPyme?  
- ¿Cuándo debo crear una empresa o una unidad de negocio?  
- ¿Puedo tener varias unidades de negocio con el mismo NIT?  
- ¿Cómo manejar varias líneas de negocio en ContaPyme?  
- ¿Cómo registrar varias actividades con el mismo NIT?  

#### Respuesta:  

En ContaPyme puedes organizar tu negocio creando:  

- 🏢 **Empresas independientes**  
- 🧩 **Unidades de negocio (con el mismo NIT)**  

Ambas se crean desde la misma opción, pero cumplen funciones diferentes.  


#### ⚙️ ¿Cómo crear una empresa o una unidad de negocio?  

📍 Ruta:  
`Básico → Empresa → Crear empresa`  

###### Pasos:  

1. Haz clic en **Crear empresa**  
2. El sistema mostrará una ventana inicial donde debes elegir:  
   - 🏢 **Empresa**  
   - 🧩 **Unidad de negocio**  

3. Según la opción elegida:  

   **Si seleccionas EMPRESA:**  
   - En la parte inferior debes ingresar un **nuevo número de documento (NIT o cédula)**  

   **Si seleccionas UNIDAD DE NEGOCIO:**  
   - El campo de número de documento se convierte en un **selector**  
   - Debes elegir un **NIT ya existente** (empresa principal)  
![Opción crear empresa o unidad de negocio ](https://www.contapyme.com/conocimientocontapyme/010_BS/empresa_unidad_negocio.png)   

4. Haz clic en **Aceptar**  
5. Se abrirá el formulario completo para registrar la información  
6. Completa los datos y guarda  

#### 🏢 ¿Qué es una empresa?  

Una **empresa** es una entidad independiente con su propio número de documento.  

Permite manejar:  
- Contabilidad  
- Facturación  
- Inventarios  
- Impuestos  
- Informes  

📌 Cada empresa tiene su propia estructura dentro del sistema.  


#### 🧩 ¿Qué es una unidad de negocio?  

Una **unidad de negocio** es una estructura adicional que:  

- Comparte el **mismo NIT** de una empresa existente  
- Tiene su propio manejo operativo independiente  
- Permite separar procesos dentro de una misma organización  

📌 No crea un nuevo NIT, sino que se vincula a uno existente.  

#### 🔄 Independencia operativa (MUY IMPORTANTE)  

✔ Tanto la empresa como la unidad de negocio:  

- Tienen su propio **manejador de operaciones**  
- Manejan sus propias transacciones  
- Funcionan de forma **independiente en la operación diaria**  

📌 La diferencia principal es únicamente el **NIT**  

#### 🏗️ Estructura interna  

Tanto empresas como unidades de negocio pueden manejar:  

- 🏢 Varias **sedes**  
- 📊 **Centros de costos**  

📌 Esto aplica para ambas, no hay limitación en este aspecto.  

#### ⚠️ Relación entre empresa y unidad de negocio  

- ❗ La unidad de negocio **NO queda como hija** de la empresa  
- ✔ Ambas quedan **al mismo nivel dentro del sistema**  
- ✔ La única relación es que **comparten el mismo NIT**  

#### 🧪 Ejemplo práctico  

Empresa:  
**DEMO COMPUTADORES LTDA (NIT 810000000)**  

Negocios:  
- 💻 Tienda de Tecnología  
- 🔧 Servicio Técnico  

📌 Configuración correcta:  

- DEMO COMPUTADORES LTDA → **Empresa**  
- Tienda y Servicio Técnico → **Unidades de negocio**  

👉 Todas operan de forma independiente, pero con el mismo NIT.  

#### 📌 Licenciamiento  

La cantidad de empresas depende de tu licencia:  

- 🔒 Una sola empresa  
- 🔓 Múltiples empresas  

📌 Las unidades de negocio no reemplazan este límite, dependen de la empresa creada.  


#### 💡 Recomendaciones  

- ✅ Usa **empresa** cuando el negocio tenga un NIT diferente  
- ✅ Usa **unidad de negocio** cuando todo pertenezca al mismo NIT  
- 📌 Mantén organizada la estructura según la realidad de tu negocio  

⚠️ Evita:  
- Mezclar muchas empresas y muchas unidades de negocio sin una estructura clara  

#### 📌 Conclusión  

- **Empresa** = entidad independiente con su propio NIT  
- **Unidad de negocio** = estructura independiente que comparte el mismo NIT  

Ambas operan de forma independiente en el sistema, pero la unidad de negocio se diferencia porque **no tiene NIT propio, sino que usa el de la empresa principal**.  
---





