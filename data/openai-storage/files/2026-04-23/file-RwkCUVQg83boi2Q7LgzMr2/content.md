# pf_nomina.md
> **Propósito:** Reunir las preguntan frecuentes del módulo **Nómina**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntan frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2025/11/14

## CONTRATOS

### ¿Cómo configurar un contrato de trabajo?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo registrar un contrato a término fijo o indefinido en ContaPyme?    
- ¿Por qué es importante configurar los días laborales en el contrato?  
- ¿Cómo parametrizar empleados con condiciones laborales especiales?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el contrato de trabajo es uno de los aspectos más importantes de la nómina: allí se definen las condiciones laborales del empleado y, a partir de él, el sistema calcula automáticamente los devengos, deducciones, aportes y prestaciones sociales.  

La correcta configuración de un contrato no solo asegura que los cálculos estén bien hechos, sino que también garantiza el cumplimiento de la **normativa laboral colombiana**.  

Antes de crear un contrato de trabajo es indispensable que ya se tengan configurados correctamente los conceptos de nómina que se utilizan en la empresa y también los perfiles de contrato a utilizar para poderlos asignar al momento de crear los contratos respectivos. 

Por ello, antes de crear los contratos, dirígete a la pestaña "Nómina" y abre el catálogo de **Perfiles de contrato** para verificar que estén configurados según los requerimientos de tu empresa. 

✅ Si aún no has realizado este paso, modifíca los perfiles de contrato que usarás en tu empresa. Por ejemplo: **Contratos a término indefinido de pago mensual.**

En el perfil se definirá el tipo de contrato del empleado y la periodicidad en la cual se efectuarán los pagos de nómina. Es decir, se determinará si el contrato será a término fijo, indefinido, por obra o labor, aprendizaje, etc y si se pagará de forma mensual, quincenal, etc.

En la pestaña **Días laborales e intensidad horaria**, establece:  
- Días de la semana que el empleado trabaja.  
- Si trabaja o no en días festivos.  
- Intensidad horaria diaria.  

⚠️ Estos datos son de suma relevancia para garantizar que el cálculo de conceptos como vacaciones disfrutadas, horas extras, recargos, entre otros, se calculen de forma correcta.

Una vez garantices que tienes correctamente configurados los perfiles de contrato, puedes continuar con la creación de contratos de tus empleados, con unos sencillos pasos, así:

**1.** Ingresa al manejador de operaciones y en la sección "nómina", selecciona la operación de  **creación de contratos**.  
**2.** Verifica que ya tengas creado el empleado. Si aún no lo tienes creado, puedes crearlo desde la misma operación de creación de contrato dando clic en el botón "más", ubicado junto al campo "empleado".

Una vez tengas la información básica, asigna el empleado para crearle su respectivo contrato.

**3.** Completa la información obligatoria: 

- **Fecha de inicio** y (si aplica) **fecha de finalización**.
- **Centro de costos** (importante para imputar los asientos contables) y **centro de trabajo** (indispensable para asignar adecuadamente la clase de riesgo según el centro de trabajo y el nivel de riesgo)

- Asigna el **perfil de contrato** (por ejemplo, término indefinido pago mensual). Al realizar este paso, el sistema asignará automáticamente los conceptos de nómina (prestaciones sociales, seguridad social, deducciones, etc.) que apliquen según el tipo de contrato.

- Asigna el **Cargo** y **jefe inmediato**. 
💡 Estos datos podrían servirte para aplicar filtros en informes o planillas para pagos de nómina.

- **Tipo de trabajador:** dependiente, aprendiz, cotizante 51 (tiempo parcial), entre otros.  
- **Tipo de salario:** fijo, variable o integral.  

**4.** Define el **salario base** y, si aplica, los factores adicionales como auxilio de transporte.  
 
**6.** Verifica que se carguen los conceptos de **entidades de seguridad social** (EPS, pensión, ARL, caja de compensación, cesantías).  
**7.**  Documenta cláusulas y observaciones al contrato para tu consulta posterior y carga datos adjuntos si lo requieres.
**8.** Guarda el contrato.  

**Recomendaciones:**  
- ✅ Usa **perfiles de contrato** para estandarizar configuraciones y evitar errores.  
- ✅ Revisa siempre que el **salario mínimo y auxilio de transporte** estén actualizados según el año vigente.  
- 📌 Si el empleado cuenta con un tipo de **salario integral**, asegúrate de marcarlo correctamente, pues cambia la forma en que se liquidan prestaciones.  
- ⚠️ Un error en el contrato (tipo de salario, jornada, entidades) generará cálculos incorrectos en todas las liquidaciones posteriores.  
- 💡 Si el empleado tiene varias modalidades de trabajo, documenta y refleja esto en el contrato para que los cálculos de nómina sean consistentes.  

#### 📌 Recursos adicionales  
- [Video: Configuración de empleados en ContaPyme](https://www.youtube.com/watch?v=odih11uAX-w)  
- [Video: Configuración inicial del módulo de Nómina](hhttps://www.youtube.com/watch?v=kdZahQfWK3A)  
- [Video: Opciones y funciones de los contratos](https://www.youtube.com/watch?v=28gCMt93gGg)
- [Video complementario: Configuración de beneficiario adicional](https://www.youtube.com/watch?v=73CitrjP79U)  

---

### ¿Cómo modificar un contrato?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo actualizar el tipo de contrato de un trabajador?  
- ¿Dónde corrijo una fecha mal registrada en el contrato?   
- ¿Qué hacer si necesito cambiar el centro de costos de un empleado?  
- ¿Cómo modificar un contrato o corregir una fecha mal registrada?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, los contratos de trabajo pueden ser **modificados** para reflejar cambios en las condiciones laborales de un empleado, como salario, fechas, jornada laboral, tipo de contrato o centro de costos.  
La operación de **Modificar contrato** permite hacer estos ajustes de forma segura, garantizando que los cálculos de nómina, seguridad social y prestaciones sociales se mantengan actualizados.  

**Pasos para modificar un contrato:**  
**1.** Ingresa al **Manejador de Operaciones**.  
**2.** En el grupo de **Nómina**, selecciona la operación **Modificación de contrato individual** (para un empleado) o **en bloque** (para varios empleados).  
**3.** Escoge el empleado y el contrato que deseas modificar.  
**4.** Realiza los cambios requeridos, por ejemplo:  
- Salario.  
- Tipo de salario (fijo, variable, integral).  
- Fechas de inicio o fin.  
- Jornada laboral o intensidad horaria.  
- Centro de costos o centro de trabajo.  
- Tipo de contrato (fijo, indefinido, obra o labor).  
**5.** Guarda los cambios y valida en un informe de consulta de contratos que los cambios se hayan aplicado correctamente.  

**Recomendaciones:**  
- ✅ Si el cambio es de **salario**, realiza la modificación antes de la próxima liquidación para que se refleje correctamente.  
- ✅ Para varios empleados (ej. ajuste de salario mínimo), usa la opción de **modificación en bloque**.   
- ⚠️ Si el contrato ya tiene registros de nómina liquidados, las modificaciones aplicarán hacia adelante, no de forma retroactiva.  
- 💡 Documenta siempre el motivo de la modificación para control interno y trazabilidad.  

#### 📌 Recursos adicionales  
- [Video: Modificación individual de contratos](https://www.youtube.com/watch?v=yTJdtTL586o&t=4s)  
- [Video: Modificación de contratos en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk&t=1s)  

---

### ¿Cómo corregir una fecha mal registrada en el contrato?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo cambio la fecha de ingreso de un empleado?  
- ¿Dónde puedo corregir una fecha en el contrato?  
- ¿Qué hago si me equivoqué en la fecha del contrato?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En el módulo de nómina tienes la operación de **Modificar contrato**, que te permite corregir fechas mal registradas en el contrato, como la fecha de ingreso, fecha de retiro (si aplica) o fecha de modificación.

1. Ingresa al **Manejador de Operaciones** y dale clic al botón **+** en el grupo de nómina. Selecciona **Modificación de contrato individual** (para un solo empleado) o **en bloque** (para varios empleados).

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Pantalla donde seleccionas Modificación de contrato individual o en bloque](https://www.contapyme.com/conocimientocontapyme/045_NO/ruta_modificacion_contrato.png)

2. Ejemplo: Si a María Gómez le registraste mal la fecha de ingreso como 01/03/2025 en vez de 01/02/2025, puedes entrar, corregirla y guardar. Así, en la próxima liquidación ya quedará con la fecha correcta.

3. Recuerda que cambiar fechas puede afectar antigüedad, provisiones, vacaciones, seguridad social y reportes. Es importante que informes a contabilidad si es un cambio relevante.

👉 Para orientarte mejor, revisa los [videos de Modificación de contrato individual o en bloque](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680), donde te mostramos los pasos detallados.

#### 📌 Recursos adicionales  
- [Video: Modificación individual de contratos](https://www.youtube.com/watch?v=yTJdtTL586o&t=4s)  
- [Video: Modificación de contratos en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk&t=1s)  

---

### ¿Cómo configurar un nuevo empleado? 

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Dónde creo un contrato de trabajo en ContaPyme?  
- ¿Cómo ingresar correctamente un nuevo empleado?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, cada empleado se registra como un **tercero** en el sistema y se le asocia un **contrato**, que contiene toda la información laboral y salarial necesaria para el cálculo de la nómina.  

Configurar correctamente a un empleado es indispensable para que sus devengos, deducciones, aportes y prestaciones sociales se liquiden de forma automática y precisa.  

**A continuación te detallaremos los pasos para configurar un nuevo empleado:**  
**1.** Ingresa al menú **Catálogo de terceros > Empleados**.  
**2.** Haz clic en **Nuevo empleado** y registra la información básica:  
- Nombre completo, tipo y número de documento.  
- Dirección, correo electrónico y teléfono.  
- Datos de contacto y demás información personal relevante.  
**3.** En la pestaña de **Entidades**, registra la afiliación del empleado a:  
- EPS  
- Fondo de pensiones  
- ARL  
- Caja de compensación familiar  
- Fondo de cesantías  
**4.** Configura la **cuenta bancaria** del empleado para configurar la herramienta de pago por bancos para transferir automáticamente el dinero a la cuenta bancaria del empleado. 

⚠️ Ten en cuenta que esta opción sólo estará disponible si cuentas con el módulo de cartera y proveedores.

**5.** Crea un **contrato laboral**:  
- Ingresa al manejador de operaciones. Dirígete a la sección "Nómina" y selecciona la operación de creación de contrato de trabajo y define los datos básicos para el empleado.
- Define el **tipo de contrato** (fijo, indefinido, obra o labor, etc.).  
- Selecciona el **tipo de salario** (fijo, variable o integral).  
- Configura la **fecha de ingreso** y demás condiciones.  

**6.** Asigna los **conceptos de nómina** al contrato (salario, auxilio de transporte, prestaciones sociales, seguridad social, etc.).  
**7.** Guarda y valida la información. El empleado ya estará listo para ser incluido en la liquidación de nómina.  

**Recomendaciones:**  
- ✅ Asegúrate de asignar el **perfil de contrato** adecuado para que se carguen automáticamente los conceptos de nómina.  
- 📌 Configura correctamente la información básica al crear el empleado para garantizar que se envíen de forma adecuada en el reporte de nómina electrónica.
- ⚠️ Si omites registrar entidades (EPS, pensión, ARL, etc.), el sistema no podrá generar correctamente la planilla PILA.  

#### 📌 Recursos adicionales  
- [Video: Configuración del empleado en ContaPyme](https://www.youtube.com/watch?v=odih11uAX-w&t=283s)  
- [Video: Creación de contratos en ContaPyme](https://www.youtube.com/watch?v=yTJdtTL586o&embeds_referring_euri=https%3A%2F%2Fwww.contapyme.com%2F&source_ve_path=MzY4NDIsMjg2NjY)  

---

### ¿Cómo modificar el estado de un practicante SENA?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo pasar a un aprendiz del SENA de lectiva a productiva en ContaPyme?  
- ¿Qué diferencias hay entre un aprendiz en etapa lectiva y productiva en la nómina?  
- ¿Por qué al aprendiz no se le generan aportes en la PILA?  
- ¿Cómo actualizar el apoyo económico del aprendiz al cambiar de etapa?  
- ¿Se puede modificar el estado de varios aprendices SENA al mismo tiempo?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, los practicantes del **SENA** tienen un tratamiento especial dentro de la nómina, ya que su remuneración y aportes dependen de la **etapa en la que se encuentren,** ya sea lectiva o productiva.   

Cuando un aprendiz pasa de la etapa lectiva a la productiva, es necesario **modificar su contrato en el sistema** para reflejar el nuevo estado y garantizar que los cálculos automáticos sean correctos.  

**Pasos para modificar el estado de un practicante SENA:**  
**1.** Ingresa al **Manejador de Operaciones**.  
**2.** Selecciona la operación **Modificar contrato individual** y abre el contrato del practicante.  
**3.** Cambia el campo de **tipo de trabajador/estado** de **Aprendiz SENA lectiva** a **Aprendiz SENA productiva**.  
**4.** Ajusta, si es necesario, el **valor del apoyo económico** según corresponda a la nueva etapa.  
**5.** Guarda los cambios.  

📌 Si deseas actualizar a **varios aprendices al mismo tiempo**, utiliza la operación de **Modificación de contratos en bloque**. Allí podrás seleccionar a todos los aprendices que pasan de lectiva a productiva y realizar el cambio de manera masiva, ahorrando tiempo y evitando inconsistencias.  

**Recomendaciones:**  
- ✅ Verifica que el contrato tenga asignados los **conceptos correctos** para la etapa productiva (apoyo económico, aportes a salud, ARL, etc).  
- 📌 El cambio de estado impactará en la **planilla PILA**, por lo que es indispensable hacerlo antes de liquidar el mes.  
- ⚠️ Si no actualizas el estado, la nómina y los aportes a seguridad social se calcularán de manera incorrecta.  
- 💡 Usa perfiles de contrato diferenciados para aprendices en etapa lectiva y productiva; así el cambio será más ágil y menos propenso a errores.  

#### 📌 Recursos adicionales  
- [Video: Modificación individual](https://www.youtube.com/watch?v=yTJdtTL586o&t=4s)  
- [Video: Modificación en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk&t=1s)  

---

### ¿Qué debo tener en cuenta si el trabajador es estudiante (tipo 23)?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué perfil de nómina usar para tipo 23?  
- ¿Cómo ajustar aportes para trabajadores estudiantes?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando un trabajador es estudiante (tipo 23), la configuración del contrato en ContaPyme es clave para que el sistema liquide correctamente la nómina y aplique las consideraciones legales correspondientes.

Pasos para configurar el contrato:

1. **Asigna el tipo de trabajador y subtipo:**  
   - Ingresa al **Menú:Manejador de operaciones > Nómina > Creación de Contrato**.  
   - Selecciona **Tipo de trabajador: Estudiante que sólo realiza aporte a ARL (tipo 23)**.  
   - Si aplica, define el **subtipo** según la normativa vigente.  

   https://www.contapyme.com/conocimientocontapyme/045_NO/empleado_tipo23.png  
   *Imagen: configuración del contrato y tipo de trabajador.*

2. **Configura el perfil de nómina:**  
   - Asigna el perfil adecuado para estudiantes o aprendices, que incluyen reglas específicas para aportes, prestaciones y deducciones.  
   - Este perfil determina cómo se calculan los conceptos en la liquidación.  

3. **Revisa los conceptos asociados:**  
   - Verifica los **devengos**, **deducciones**, **prestaciones** y **costos de empresa**.  
   - Ajusta los conceptos según las condiciones del contrato (por ejemplo, si no aplica aporte a pensión).  

   ✅ Ejemplo: Un estudiante puede tener deducciones reducidas y no generar ciertos aportes, según la normativa.

**¿Qué hace el sistema automáticamente?**
Una vez configurado el contrato correctamente, el sistema se encarga de aplicar las reglas en la liquidación de nómina, evitando errores en aportes y cálculos.

👉 **Importante:** Revisa siempre las consideraciones específicas del contrato de cada empleado, ya que pueden variar según acuerdos internos o normativas.

#### 📌 Recursos adicionales  
- [Video: Configuración de empleados y contratos en ContaPyme](https://www.youtube.com/watch?v=odih11uAX-w)  
- [Video: Opciones y funciones de los contratos](https://www.youtube.com/watch?v=28gCMt93gGg)

---

### ¿Qué hacer si el sistema no permite editar datos del contrato?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no puedo cambiar la información del contrato?  
- ¿Cómo ajustar la periodicidad del contrato después de liquidar nóminas?  
- ¿Por qué no me deja cambiar el tipo de trabajador o perfil?  
- ¿Cómo corregir un contrato sin afectar los pagos ya realizados?
- ¿Qué hacer si el sistema bloquea el proceso por datos vinculados?   

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, cuando el sistema **no permite editar los datos de un contrato**, normalmente se debe a que **ya existen pagos de nómina procesados** asociados a ese contrato. Esta restricción está diseñada para **mantener la integridad de la información histórica**, evitando inconsistencias en las liquidaciones, reportes y registros contables. Las Causas más comunes por las que no se puede editar un contrato:

- El empleado **ya tiene pagos de nómina contabilizados** o aprobados con la información actual del contrato.  
- El contrato **ya fue utilizado en reportes de Nómina Electrónica (NE)** enviados a la DIAN.  
- La nómina correspondiente **ya fue publicada en la Plataforma de Documentos** (comprobante de pago).  
- El contrato está **vinculado a operaciones cerradas o contabilizadas**, y el sistema bloquea la edición para preservar la trazabilidad.  

**Pasos recomendados para corregir la información:**

1️⃣ **Valida los pagos relacionados con el contrato:**  
   - Abre el **Manejador de Operaciones → Pagos de Nómina**.  
   - Identifica si existen pagos **contabilizados o publicados** que utilicen el contrato.  

2️⃣ **Desprocesa los pagos si es posible:**  
   - Si aún **no se han enviado reportes NE a la DIAN**, puedes **anular los pagos** o **revertirlos** temporalmente.  
   - Una vez anulados, el sistema **habilitará la edición** del contrato.  
   - Realiza los cambios necesarios (por ejemplo, salario, tipo de contrato, periodicidad, centro de costos, etc.).  
   - En caso de realizar este proceso, no olvides recalcular el pago de nómina para evitar novedades de cálculo debido a los cambios que hayas realizado en el contrato, ya que ContaPyme se basa principalmente en esta información para liquidar la nómina.

3️⃣ **Si ya existen reportes enviados a la DIAN o pagos publicados:**  
   - ⚠️ **No se recomienda editar directamente el contrato.**  
   - En este caso, utiliza la operación **“Modificación de Contratos”**, disponible en el **módulo de Nómina**, para registrar los ajustes sin alterar los históricos.  
   - Esta operación crea un registro controlado del cambio, manteniendo trazabilidad y consistencia en los cálculos futuros.  

4️⃣ **Verifica después de modificar:**  
   - Genera una **liquidación de nómina** para comprobar que los nuevos valores (salario, tipo de contrato, perfil, etc.) están siendo reconocidos correctamente.  
   - Si el contrato tiene prestaciones o liquidaciones automáticas, revisa que los conceptos estén bien asignados.  

**💡 Recomendaciones:**  
- ✅ Antes de hacer cualquier modificación, **verifica si el contrato ya tiene pagos contabilizados o reportados.**  
- ✅ Si los pagos ya fueron reportados a la DIAN, **usa la operación de modificación de contratos** para conservar la trazabilidad y cumplir con los estándares de auditoría.   
- 📌 Documenta internamente los cambios realizados y guarda una copia de los contratos antes y después de la modificación. Agrega observaciones en la operación de modificación para tener presente toda la trazabilidad.

#### 📌 Recursos adicionales  
- [Video: Modificación de contrato individual](https://www.youtube.com/watch?v=yTJdtTL586o)  
- [Video: Modificación de contrato en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk)   

---

### ¿Qué hacer si un empleado pasa de contrato fijo a indefinido?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo cambiar un contrato fijo a indefinido en ContaPyme?  
- ¿Es necesario crear un nuevo contrato cuando cambia la modalidad?  
- ¿Qué pasa con las prestaciones acumuladas al pasar de fijo a indefinido?  
- ¿Cómo se modifica el perfil de contrato en estos casos?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, cuando un empleado pasa de un contrato **a término fijo** a uno **a término indefinido**, existen dos formas de manejarlo:  

1. **Opción recomendada (buena práctica):**  
   - **Termina el contrato fijo** en el sistema y liquídalo con todos sus conceptos (cesantías, intereses, vacaciones, prima, etc.).  
   - Paga al empleado todos los conceptos que se deben a la fecha, incluyendo comisiones, bonificaciones, etc.
   - Posteriormente, **crea un nuevo contrato** a término indefinido con las condiciones actuales del empleado.  
   - ✅ Ventaja: se conserva la trazabilidad legal y contable, ya que cada contrato refleja claramente su vigencia y prestaciones.  

2. **Opción alternativa (funcionalidad de ContaPyme):**  
   - Ingresa al contrato existente y realiza una **modificación de contrato**.  
   - En la modificación puedes:  
     - Cambiar el **perfil de nómina** si aplica.  
     - Eliminar la **fecha de terminación** para que quede como indefinido.  
   - ✅ Ventajas: 
     a) más práctico en algunos casos, aunque no refleja la liquidación del contrato anterior.  
     b) permite acumular los conceptos de prestaciones sociales, ya que no se pagan al empleado.

**Recomendaciones:**  
- ✅ Si el cambio implica **liquidación de prestaciones acumuladas**, usa la primera opción (terminar y crear uno nuevo).  
- ✅ Si el empleado continúa sin interrupción y se desea mantener la historia en un solo contrato, la segunda opción es válida.  
- 📌 Siempre valida que el perfil de contrato esté actualizado (conceptos, periodicidad, tipo de salario).  
- ⚠️ Recuerda que en términos legales, un cambio de contrato fijo a indefinido normalmente implica una **liquidación previa**.  

#### 📌 Recursos adicionales  
- [Video: Modificación de contrato individual](https://www.youtube.com/watch?v=yTJdtTL586o)  
- [Video: Modificación de contrato en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk)   

---

## SALARIOS

### ¿Cómo se modifica el salario de un empleado en el contrato?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Dónde cambio el salario base de un empleado?  
- ¿Cómo actualizar el salario para la próxima nómina?  
- ¿Qué operación permite modificar el sueldo de un trabajador?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En el módulo de nómina tienes una operación llamada **Modificar contrato**, que te permite hacer cambios en el contrato de un empleado, como fechas, centro de trabajo, tipo de salario (fijo, variable o integral), tipo de trabajador y, por supuesto, el salario.

1. Ingresa al **Manejador de Operaciones** y dale clic al botón **+** en el grupo de nómina. Ahí vas a encontrar la opción **Modificación de contrato individual** (si es solo para un empleado) o **en bloque** (si necesitas cambiar el salario a varios empleados al tiempo).

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde seleccionas Modificación de contrato individual o en bloque](https://www.contapyme.com/conocimientocontapyme/045_NO/ruta_modificacion_contrato.png)  
 
2. Ejemplo: Si Juan Pérez tenía un salario de $1.200.000 y lo actualizas a $1.400.000, ese nuevo valor se tendrá en cuenta en la próxima liquidación.

3. Ten en cuenta que este cambio impacta aportes, retenciones, provisiones, reportes electrónicos, y es importante que informes a contabilidad para mantener todo actualizado.

👉 Para que tengas toda la información, puedes consultar los [videos de Modificación de contrato individual o en bloque](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680), donde te explicamos cómo hacerlo paso a paso.

#### 📌 Recursos adicionales  
- [Video: Modificación individual de contratos](https://www.youtube.com/watch?v=yTJdtTL586o&t=4s)  
- [Video: Modificación de contratos en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk&t=1s)  


---

### ¿Cómo actualizar masivamente el salario mínimo y auxilio?
#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Esta herramienta de **modificación de contratos en bloque** es muy poderosa y versátil, ya que no solo te sirve para actualizar el salario mínimo y el auxilio de transporte, sino que también te permite aplicar **aumentos salariales** de forma masiva y modificar otros atributos de los contratos de tus empleados en cuestión de minutos.

**¿Cómo actualizar masivamente el salario mínimo y auxilio?**

Cada año, cuando el Gobierno Nacional decreta el nuevo **salario mínimo legal vigente** y el **auxilio de transporte**, es necesario ajustar los contratos de los empleados en el sistema.

En ContaPyme, este proceso puede hacerse de forma **masiva** gracias a la operación **Modificación de contratos en bloque**, la cual permite modificar atributos de varios contratos a la vez, sin necesidad de editarlos uno por uno.

Si tienes empleados cuyo salario está parametrizado en su contrato con la opción de "Salario basado en el mínimo", esta actualización es aún más fácil.

Para este último caso, el sistema identificará cuáles empleados están parametrizados con la variable "salario mínimo* y actualizará de forma automática para el año siguiente, el valor del salario mínimo mensual, legal vigente definido por el gobierno nacional. Al actualizar el salario mínimo de forma automática, el sistema automáticamente recalcula y asigna el nuevo valor a todos los empleados que tienen esta configuración sin requerir hacer modificaciones de contrato masivas.

Esto también elimina la necesidad de calcular manualmente el nuevo salario para cada empleado con salarios superiores al mínimo pero que están definidos como un múltiplo de este (por ejemplo, 1.5 o 2 salarios mínimos).

**Pasos para actualizar masivamente el salario mínimo y auxilio:**

**1.** Ingresa al **Manejador de Operaciones**.
**2.** En el grupo de operaciones de nómina, selecciona **Modificación de contratos en bloque**.
**3.** El sistema abrirá una ventana donde debes escoger si deseas modificar un atributo del contrato o un concepto de nómina. Posteriormente deberás escoger:

  - 📌 **Listado de empleados:** selecciona los empleados a los que aplicarás la actualización (puede ser toda la nómina o solo un grupo específico según el filtro que escojas).
  - 📌 **Concepto a modificar:** elige si deseas actualizar el **Salario básico**, el **Auxilio de transporte** u otro concepto definido en el contrato.
  - 📌 **Nuevo valor:** digita el nuevo valor definido por ley o el que corresponda según la política de la empresa.

**4.** Aplica la modificación. El sistema actualizará de manera inmediata todos los contratos seleccionados a la fecha que hayas realizado la operación.
**5.** Guarda y valida que los cambios se reflejen correctamente en los contratos de cada empleado.

**Versatilidad de la herramienta: Aplicando aumentos salariales y modificando atributos**

La herramienta de **Modificación de contratos en bloque** va mucho más allá de la actualización anual del salario mínimo. Puedes utilizarla para:

  - **Aumentos salariales basados en el salario mínimo o el IPC:** El gobierno no solo decreta el salario mínimo, sino que también anuncia el **Índice de Precios al Consumidor (IPC)**. Esto te da dos bases para realizar aumentos. Puedes utilizar la herramienta para ajustar los salarios con base en el nuevo mínimo o para aplicar un aumento general por un **porcentaje específico** (por ejemplo, el porcentaje del IPC) a todos tus colaboradores.
  - **Cambio de atributos:** Puedes modificar de forma masiva cualquier otro atributo de los contratos, como por ejemplo:
      - Cambiar el **centro de costos** o **centro de trabajo** de un grupo de empleados que se trasladaron de departamento o sede.
      - Actualizar la **fecha de finalización** de los contratos a término fijo que se van a renovar.
      - Asignar un **nuevo jefe inmediato** a un grupo de empleados si hubo un cambio en la estructura jerárquica de la empresa.
      - Actualizar cualquier otro campo predefinido en los contratos.

Esto te permite gestionar grandes cambios de forma eficiente, ahorrando tiempo y minimizando la posibilidad de errores manuales.

**Recomendaciones:**

  - ⚠️ Ten en cuenta que la operación afectará solo a los contratos activos en la fecha de ejecución.
  - 📌 Después de la actualización, revisa un informe de **consulta de contratos** para confirmar que los valores estén correctos.

#### 📌 Recursos adicionales
  - [Video: Modificación de contratos en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk)
  -[Video: Aumento de salarios en bloque](https://www.youtube.com/watch?v=-nCBERjXd8I)
  -[Video: Salario basado en el mínimo](https://www.youtube.com/watch?v=Iqj_uFr4BSk&t=139s)

#### Variantes de la pregunta (aplicación canónica):

  - ¿Cómo cambiar de manera masiva el salario de los empleados?
  - ¿Cómo actualizar el auxilio de transporte a todos los contratos?
  - ¿Qué operación me permite modificar atributos de varios contratos a la vez?
  - ¿Cómo ajustar en ContaPyme los cambios de salario mínimo o IPC decretados por el Gobierno?
  - Necesito hacer aumentos de salario
  - actualizar salario base y auxilio de transporte

---

### ¿Por qué al modificar el salario no se actualiza correctamente el pago?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué el salario actualizado no se refleja en la nómina?  
- ¿Cómo hacer que el cambio de salario afecte el cálculo del pago?  
- ¿Por qué el aumento no aparece en la liquidación?  
- ¿Cómo corregir un salario mal aplicado en nómina?  
- ¿Qué pasa si cambio el salario directamente en el contrato?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, cuando se realiza un cambio en el salario de un empleado y este **no se refleja correctamente en el pago de nómina**, normalmente se debe a una configuración o procedimiento incompleto o incorrecto al momento de registrar la **modificación del contrato**.

El sistema toma los valores del salario con base en la **vigencia** del contrato, por lo que si no se define correctamente la fecha de inicio del nuevo salario o no se procesó la operación adecuadamente, la liquidación seguirá utilizando el valor anterior.

⚠️ **A continuación te detallamos las causas más frecuentes de este inconveniente**

1. **No se procesó la operación de modificación de contrato**  
   - El cambio del salario fue realizado, pero no se procesó la operación de modificación en el **Manejador de Operaciones**.  
   - En ContaPyme, los cambios que afectan valores (como el salario) deben realizarse a través de la operación **“Modificación de contrato individual”** o **“Modificación de contratos en bloque”**, para que el sistema los reconozca como un evento histórico y los aplique a la liquidación, sin embargo, si la operación no se encuentra procesada, no se tomará el cambio hasta que esta sea procesada.

2. **No se definió correctamente la fecha de inicio del nuevo salario**  
   - Si la modificación no tiene una fecha efectiva o esta queda fuera del rango del periodo de nómina que se liquida, el sistema seguirá calculando con el salario anterior.  
   - Ejemplo: si el cambio aplica desde el 1/10/2025 pero la nómina se liquida del 01/09/2025 al 30/09/2025, no se verá reflejado.

3. **La nómina ya había sido liquidada o contabilizada antes del cambio**  
   - Si el cambio se realiza después de haber generado los pagos, el sistema no recalcula automáticamente; debe rehacerse el proceso ya que las fórmulas identifican si ya se pagó el salario en dicho período.

**Recomendaciones para aplicar correctamente la modificación del salario**

**✅ 1. Usa el Manejador de Operaciones adecuadamente:**  
   - Ingresa a **Manejador de Operaciones > +operaciones > Modificación de contrato individual** (o *en bloque* si aplica a varios empleados).  
   - Selecciona el contrato, indica el **nuevo salario** y define la **fecha desde la cual debe aplicarse**.

**✅ 2. Revisa el rango de fechas de la modificación:**  
   - Asegúrate de que la fecha de inicio del nuevo salario **coincida con el periodo de nómina** en que se debe pagar.

**✅ 3. Verifica el historial del contrato:**  
   - En el informe de detalle de contratos puedes consultar el histórico para confirmar que el sistema registró la modificación y su fecha efectiva.

**✅ 4. Vuelve a generar el pago de nómina:**  
   - Si la nómina ya había sido calculada, recalcula la planilla o el pago para que tome el nuevo valor.

**✅ 5. Mantén el control de versiones del contrato:**  
   - Si se hacen múltiples cambios seguidos, documenta las fechas exactas de cada ajuste salarial para evitar confusiones en reportes o auditorías.


📌 **Ejemplo práctico**
Si a un empleado se le cambia el salario de $1.300.000 a $1.500.000 desde el **1 de octubre de 2025**, y se liquida la nómina del 01 al 30 de septiembre, el sistema **no reflejará el aumento** porque aún no ha llegado la fecha efectiva del nuevo salario.  
En la siguiente nómina (septiembre), el cambio sí se verá aplicado automáticamente.

#### 📌 Recursos adicionales
  - [Video: Modificación de contratos en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk)
  -[Video: Aumento de salarios en bloque](https://www.youtube.com/watch?v=-nCBERjXd8I)
  -[Video: Salario basado en el mínimo](https://www.youtube.com/watch?v=Iqj_uFr4BSk&t=139s)

---

### ¿Cómo ajustar retroactivamente un salario que quedó mal liquidado?  
#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, si un salario quedó mal liquidado en nóminas anteriores, no es necesario modificar las liquidaciones ya cerradas. El sistema permite realizar **ajustes retroactivos** para corregir la diferencia y garantizar que el empleado reciba el valor correcto.  

El ajuste consiste en registrar la diferencia del salario en una **nómina posterior** mediante un concepto específico, de manera que el empleado reciba el valor faltante o se descuente lo que fue pagado de más.  

**📌 Pasos generales para hacer el ajuste:**  
1. Revisa el contrato del empleado y actualiza el salario correctamente (si aún no lo has hecho).  
2. Identifica la diferencia entre lo que se pagó y lo que realmente se debía pagar.  
3. Usa un **concepto de ajuste salarial** para los casos en los que debes pagar un valor adicional, u **otras deducciones o descuento por mayor valor pagado en horas extrar** en caso de requerir descontarle un valor al empleado.
4. Registra el ajuste en una operación de novedad de nómina para que se vea reflejado en la siguiente nómina del empleado, ya sea como valor adicional (si se pagó menos) o como descuento (si se pagó de más).  
5. Verifica que el ajuste impacte correctamente aportes a seguridad social, provisiones y aportes parafiscales.  

**💡 Recomendaciones:**  
- Nunca borres ni modifiques liquidaciones anteriores ya procesadas, ya que forman parte del historial laboral, contable y de la nómina electrónica reportada a la DIAN.
- Usa siempre un concepto de ajuste identificado, para que quede claro en reportes y auditorías por qué se hizo la corrección.  
- Documenta el ajuste en un soporte administrativo (acta, correo, memorando) para evitar inconvenientes legales.  
- Informa al área contable de los cambios, ya que impactan provisiones, pagos y reportes electrónicos.  
- Si el ajuste es significativo, revisa cómo afecta liquidaciones de seguridad social, retenciones y prestaciones.  

#### 📌 Recursos adicionales
  - [Video: Modificación de contratos en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk)
  -[Video: Aumento de salarios en bloque](https://www.youtube.com/watch?v=-nCBERjXd8I)
  -[Video: Salario basado en el mínimo](https://www.youtube.com/watch?v=Iqj_uFr4BSk&t=139s)

**👉 También aplica si preguntan:**  
- ¿Cómo realizar ajustes de salario?  
- ¿Cómo pagarle correctamente al empleado si me equivoqué en nóminas anteriores?  
- ¿Cómo corregir un salario mal registrado sin borrar la nómina?  
- ¿Qué hacer si al empleado se le pagó menos o más en la nómina anterior?  

---

### ¿Por qué el auxilio de transporte aparece diferente al esperado al pagar con salario mínimo?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no se está pagando auxilio de transporte a un trabajador con salario mínimo?  
- ¿Cómo ajustar el auxilio de transporte cuando la nómina es quincenal?  
- ¿Qué hacer si el auxilio de transporte sale en cero en el pago de nómina?  
- ¿Cómo verificar que el concepto de auxilio esté actualizado con el nuevo incremento anual?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El **auxilio de transporte** en Colombia aplica para los trabajadores que devengan hasta **dos (2) salarios mínimos mensuales vigentes (SMMLV)**, y su valor es definido anualmente por el Gobierno.  

En **ContaPyme**, este valor puede verse diferente al esperado por **configuración del contrato, el valor del salario o la configuración del concepto de nómina**.  

**Posibles causas:**  
- ⚠️ El contrato del empleado tiene marcada la opción de que el trabajador **no recibe auxilio de transporte**.  
- ⚠️ El salario registrado en el contrato está **mal digitado** (ejemplo: con un decimal, espacio o error de valor), por lo que el sistema lo interpreta fuera del rango.  
- ⚠️ El auxilio de transporte está configurado con **periodicidad diferente** a la del contrato (ejemplo: mensual vs quincenal).  
- ⚠️ El concepto de auxilio de transporte fue **modificado manualmente** en el catálogo de variables de nómina y ya no corresponde al valor oficial definido por el Gobierno.  

**Pasos para revisar y corregir:**  
**1.** Verifica en el contrato del empleado que:  
   - El salario esté bien registrado (ej. $1.423.000 o el SMMLV vigente).  
   - Verifica que no esté marcada la casilla de **“No Aplica auxilio de transporte”**en los atributos del contrato.  

**2.** Valida que el **concepto de auxilio de transporte** en el catálogo tenga el valor actualizado según decreto anual y que su periodicidad coincida con el contrato (quincenal o mensual)o según la configuración que deseas.  

**Recomendaciones:**  
- ✅ Mantén actualizado tu sistema ContaPyme para que se actualice adecuadamente el **SMMLV** y el valor del auxilio.  
- ✅ Usa la opción de **modificación de contratos en bloque** si necesitas actualizar masivamente el salario de los empleados y el auxilio corresponda al vigente. 
- ⚠️ Si el empleado gana más de dos salarios mínimos, el sistema automáticamente **no le liquida auxilio** (no es un error, es la norma).  

---

## PRESTACIONES

### ¿Cómo realizar el pago de la prima de forma automática en ContaPyme?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Puedo **pagar la prima antes** de diciembre o **proyectarla para otra fecha** (por ejemplo 30 de noviembre)?  
- ¿Cómo **configurar la fecha de pago** para que el sistema **proyecte automáticamente** la prima?  
- ¿Se puede **pagar la prima junto con la segunda quincena** o **solo la prima** en planilla/pago individual?  
- ¿Por qué **no se está cargando la prima** en algunos empleados?  
- ¿Los **conceptos no salariales** cuentan para el **promedio de la prima**?  
- ¿Cómo **incluir variables salariales** (comisiones, horas extras, recargos) en el promedio para la prima legal?  
- ¿Cómo **descargar el comprobante** de pago de prima por empleado?  
- El cálculo de la prima **no coincide**, ¿qué debo revisar?
- Tengo errores con el calculo de la prima


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
La **prima de servicios** es una prestación social en Colombia que corresponde a **15 días de salario por cada semestre trabajado**, y debe pagarse en dos momentos: en junio y en diciembre.  
Le corresponde a todos los trabajadores vinculados mediante contrato laboral, excepto en casos especiales donde la ley lo excluye.  

Su importancia radica en que hace parte de las obligaciones legales del empleador y constituye un derecho fundamental para los trabajadores, pues reconoce el aporte que realizan al desarrollo de la empresa.  

En **ContaPyme**, este pago se realiza de manera **automática** dentro del pago de nómina, sin necesidad de procesos manuales de cálculo.  
El sistema liquida el valor correspondiente con base en:  
- **Días laborados en el semestre.**  
- **Salario base fijo** o **promedio del salario variable** (comisiones, horas extras y recargos, si están configurados como salariales).  
- **Fechas de ingreso y retiro** del empleado.  

📌 Importante: Los **conceptos no salariales** (ejemplo: auxilios no constitutivos de salario, viáticos no salariales, bonificaciones ocasionales) **no se incluyen** en el cálculo de la prima.  

**📌 Opciones de pago de la prima en ContaPyme:**  
- Se puede incluir la prima junto con los **devengos de la nómina del mes** (ejemplo: en la segunda quincena de junio o diciembre). Bastará con indicar qué conceptos se desean pagar en el pago de nómina con el asistente diseñado para ello cuando se inicia la creación del pago. 
- También se puede generar un **pago de nómina individual o en planilla** indicando que se desea pagar específicamente la prima como prestación independiente. (seleccionando únicamente "prestaciones" y desactivando devengos y novedades) 

📌 Adicional: En ContaPyme puedes **configurar la fecha de pago de la prima** para que el sistema proyecte el cálculo automáticamente.  
Por ejemplo, si decides pagarla el **30 de noviembre** en lugar de diciembre, el sistema tomará los días laborados hasta esa fecha y generará la liquidación correspondiente asumiendo que el empleado trabajará todo el semestre completo.

Si decides hacer esto para empleados con salarios variables, no debes olvidar usar el concepto de **"ajuste de prima"** para la diferencia que queda pendiente cuando se conoce lo efectivamente devengado por el empleado al final del mes de Junio o Diciembre ya que se debe reconocer la totalidad de los devengos percibidos realmente por el empleado, no sólo lo proyectado.

**Pasos generales para liquidar la prima automáticamente:**  
1. Verifica que los contratos de los empleados estén con salario actualizado, fechas correctas y las novedades de nómina del semestre estén correctamente registradas y procesadas.
👉 No olvides los aumentos salariales aplicados en el semestre, ya que estos también afectarán el pago de la prima.
👉 Te recomendamos generar un explorador de conceptos de nómina por el semestre a pagar y revisa las novedades generadas por los empleados y cómo podrían afectar la liquidación de la prima. Por ejemplo, revisa si el empleado tuvo ausencias injustificadas, comisiones, bonificaciones salariales, etc.

2. Ingresa al **Manejador de Operaciones > Pago de Nómina (individual o en planilla)**.  
3. Selecciona el periodo de liquidación correspondiente (junio o diciembre).  
4. El sistema calculará automáticamente la prima con base en los días laborados y promedios salariales (cuando aplique).  
5. Genera el pago de nómina:  
   - **En conjunto con la nómina regular**, o  
   - **Como pago individual/planilla de prestación específica**.  
6. Revisa el comprobante contable y los reportes de prima antes de contabilizar. 
7. Procesa y guarda la operación.  

**💡 Recomendaciones:**  
- Revisa que todos los empleados tengan contratos activos y correctamente configurados.  
- Para salarios variables (comisiones, horas extras, recargos), confirma que estén marcados como **salariales** en el catálogo de conceptos, para que el sistema los incluya en el promedio.  
- Antes de pagar, revisa la **liquidación de prima** para auditar los valores y detectar inconsistencias o información faltante.  
- Identifica las diferencias por ausencias injustificadas, aumentos de salario o retiros, ya que impactan directamente el cálculo.  

**👉 Preguntan frecuentes relacionadas:**  

- **¿Cómo se contabiliza el pago de la prima en el sistema?**  
  La prima se paga desde la misma operación para el pago, y el sistema genera automáticamente el comprobante contable asociado. Sólo necesitas seleccionar que deseas pagar las prestaciones sociales en el período evaluado.

- **¿Se puede pagar la prima junto con la nómina mensual?**  
  ✅ Sí. Se puede liquidar y pagar en la segunda quincena de junio y diciembre junto a los devengos del mes. Sin embargo, no olvides los plazos máximos establecidos por la normatividad para el pago de esta prestación.

- **¿Es posible pagar solo la prima sin la nómina completa?**  
  ✅ Sí, desde el pago de nómina en planilla o individual puedes seleccionar únicamente la prima como prestación a cancelar.  

- **El cálculo de la prima no me coincide, ¿qué revisar?**  
  - Salario base o promedio del semestre.  
  - Fechas de ingreso y retiro.  
  - Conceptos de nómina marcados como salariales (comisiones, recargos, horas extras).  
  - Novedades no registradas (ausencias, licencias, etc).  

- **¿Por qué no se está cargando la prima en algunos empleados?**  
  ⚠️ Revisa que tengan contrato activo, fechas correctas y que pertenezcan a un perfil de nómina con la prestación configurada.  
  ⚠️ Revisa si ya se realizó otro pago de prima para el mismo empleado en la misma fecha.

**📌 Consideraciones finales:**  
- Los **conceptos no salariales nunca harán parte del promedio** para prima.  
- Guarda soporte de la liquidación, ya que la prima es un derecho laboral fundamental en Colombia y suele revisarse en auditorías.  

#### 📌 Recursos adicionales  
- [Video: Prima legal en ContaPyme](https://www.youtube.com/watch?v=3jS2h3-mhdo)  
- [Video: Prima legal en ContaPyme: Ejemplo práctico 1](https://www.youtube.com/watch?v=anRXIyguEOI)  
- [Video: Prima legal en ContaPyme: Ejemplo práctico 2](https://www.youtube.com/watch?v=inZCX71dBJI)  
- [Video: Exploradores de nómina: Podrás aprender a revisar la información que afecta el pago de la prima de los empleados](https://www.youtube.com/watch?v=t0mzOnNVMb0)  

---

### ¿Cómo realizar el cálculo de la prima de un empleado tiempo parcial o cotizante 51?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo calcular la prima de un empleado de medio tiempo?  
- ¿Los cotizantes 51 reciben prima de servicios?  
- ¿Debo hacer un proceso especial para liquidar la prima de un tiempo parcial?  
- ¿Debo pagar prima a los empleados de tiempo parcial o cotizante 51?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, el cálculo de la prima para un empleado con contrato de **tiempo parcial** o clasificado como **cotizante 51** se realiza de manera automática, exactamente igual que para un empleado dependiente.  

No se requiere ninguna configuración adicional en el sistema. La diferencia está en que el valor de la prima se determina según lo que indica la normativa laboral vigente para este tipo de cotizantes, considerando:  
- ✅ El salario realmente devengado por el empleado.  
- ✅ Los días efectivamente laborados durante el semestre.  
- ✅ Si aplica, el promedio de ingresos variables (comisiones, recargos, horas extras) marcados como salariales.  

📌 El sistema toma la información del contrato y de los conceptos salariales registrados, y con ello liquida la prima automáticamente de acuerdo con las reglas definidas por la ley para este tipo de empleados.  

**Recomendaciones:**  
- Asegúrate de que el contrato del empleado esté correctamente configurado con la **clasificación de cotizante 51**.  
- Verifica que los conceptos que hagan parte del salario (comisiones, recargos, horas extras) estén parametrizados como **salariales**, para que entren en el promedio.  

---

### ¿Cómo puedo calcular o liquidar las prestaciones sociales en diciembre?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo liquido cesantías e intereses de cesantías?  
- ¿Cómo pagar las prestaciones sociales de fin de año?
- ¿Qué configuraciones se deben tener en cuenta para reportar las prestaciones sociales a diciembre?
- Necesito liquidar la nomina en diciembre con las prestaciones sociales 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Recuerda que las **prestaciones sociales** se pueden pagar en diciembre siempre y cuando los **conceptos de nómina** se encuentren correctamente configurados con la **periodicidad adecuada**, es decir, para ser liquidados y pagados en diciembre.  

Esto se puede verificar en el **Catálogo de conceptos de nómina**, ya que es allí donde se configura exactamente la fecha donde se desean pagar las prestaciones sociales (cesantías, primas e intereses de cesantías).

Por defecto, **ContaPyme** sugiere que las **cesantías, intereses de cesantías y prima** se paguen en estas fechas, por lo cual **no es necesario modificar nada**, a menos de que algún usuario haya cambiado esta configuración en algún momento.

1. Ingresa al **Manejador de Operaciones** y haz clic en el botón más operaciones > **Nómina**.

2. Selecciona la operación de **Pago de nómina o pago de nómina en planilla** y define el **periodo donde realizarás el cálculo** (en este caso, diciembre)  
   Puedes seleccionar qué conceptos deseas pagar en esta fecha. Es decir, incluir prestaciones, devengos y novedades, o también puedes pagar únicamente las prestaciones. El sistema tomará automáticamente la información del contrato del empleado y calculará:
   - **Cesantías**
   - **Intereses de cesantías**
   - **Prima de servicios**

3. Verifica que los empleados tengan:
   - **Contrato activo**
   - **Salario correctamente actualizado**
   - **Tipo de salario** (fijo, variable o integral) bien configurado  

   Esto es fundamental para que el cálculo sea correcto.

4. Revisa el **detalle del pago** antes de confirmar la operación. Allí podrás validar los valores liquidados por cada concepto de prestación social.

5. Una vez confirmada la operación, **ContaPyme** realizará automáticamente la **contabilización** de cada una de las prestaciones de cada empleado.

💡 **Importante:**  
Si notas que algún concepto no se liquida, revisa el **Catálogo de conceptos de nómina** y valida que su **periodicidad de pago** esté configurada para diciembre.

#### 📌 Recursos adicionales  
- [Video: Pago de cesantías](https://www.youtube.com/watch?v=JB0-WadYRh4)  
- [Video: Pago de intereses de cesantías](https://www.youtube.com/watch?v=Do5Qwz-6Nts)
- [Video: Pago de prima de servicios](https://www.youtube.com/watch?v=3jS2h3-mhdo&t=859s)
- [Video: Ejemplo práctico # 1 de pago de prima de servicios](https://www.youtube.com/watch?v=3jS2h3-mhdo&t=859s)
- [Video: Ejemplo práctico # 2 de pago de prima de servicios](https://www.youtube.com/watch?v=inZCX71dBJI)

---

### ¿Cómo registrar vacaciones compensadas en dinero?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo pagar vacaciones no disfrutadas al momento de retiro?  
- ¿Qué diferencia hay entre vacaciones disfrutadas y compensadas?  
- ¿Cómo se registran vacaciones en dinero en ContaPyme?  


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Las **vacaciones compensadas en dinero** son aquellas que no se disfrutan en tiempo, sino que se pagan directamente al trabajador como parte de su liquidación de prestaciones. Esto ocurre cuando el empleado informa explícitamente que no desea disfrutar sus vacaciones en tiempo o en las situaciones en las cuales se pacta con el empleador que se compensarán de esta forma.

**Pasos para registrarlas:**  
**1.** Ingresa al **Manejador de Operaciones**.  
**2.** Selecciona la operación de **Registro de novedades de nómina**, elige el empleado y elige el concepto de nómina de vacaciones de **Compensadas en dinero**.  
**3.** Realiza el pago de nómina al empleado y verifica que el sistema cargue adecuadamente la novedad de nómina y calcule el valor de las vacaciones compensadas, aplicadas sobre el salario base o promedio (según corresponda).  
**4.** Guarda y contabiliza el pago, lo cual generará los registros contables y soportes correspondientes.  

**Recomendaciones y tips:**  
- 📌 Asegúrate de que el contrato del empleado esté correctamente configurado con fecha de ingreso, salario y tipo de trabajador, ya que estos datos impactan directamente en el cálculo.  
- ✅ Revisa que no existan días de vacaciones ya liquidados para evitar duplicados.  
- ⚠️ Ten en cuenta que **los conceptos no salariales** (ej. auxilios no salariales) **no se incluyen** en la base para vacaciones.  
- ⚠️ Ten en cuenta que las vacaciones compensadas son diferentes de las vacaciones liquidadas, ya que estas últimas serán las que se paguen al empleado al momento de su retiro, es decir, en su liquidación de contrato si hay días pendientes por disfrutar.

#### 📌 Recursos adicionales   
- [Video: Ejemplo práctico: Vacaciones compensadas en dinero](https://www.youtube.com/watch?v=vTjoG2oXq7A)  

---

### ¿Cómo registrar una novedad de vacaciones?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Dónde registro los días de vacaciones en ContaPyme?  
- ¿Cómo afecta una novedad de vacaciones la nómina?  
- ¿Cómo se descuentan los días de vacaciones disfrutados?  
- ¿Cómo se actualiza el libro de vacaciones de un empleado?
- ¿Cómo registrar en el módulo de nómina los días de las vacaciones disfrutadas por un trabajador? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme, las **novedades de vacaciones** permiten registrar las fechas en que un empleado disfruta de este derecho laboral, para que el sistema realice el cálculo de la cantidad de días y el valor a pagar efectivamente en la nómina y el reporte a PILA de manera correcta.  

El sistema solicita un **rango de fechas** (inicio y fin de las vacaciones) y automáticamente calcula los días hábiles y no hábiles involucrados. Con esta información, genera:  
- El pago de nómina correspondiente a los días disfrutados.  
- El descuento de esos días en el **libro de vacaciones**, que es el historial de vacaciones acumuladas, disfrutadas y pendientes por cada empleado.  

**Pasos para registrar la novedad:**  
**1.** Ingresa al **Manejador de Operaciones**.  
**2.** Selecciona la opción **Novedad de vacaciones** ubicada en las operaciones de nómina.  
**3.** Indica la **fecha inicial** y la **fecha final** de las vacaciones.  
**4.** El sistema calculará los días hábiles y no hábiles automáticamente.  
**5.** Guarda la novedad para que se refleje en la nómina y posteriormente en el libro de vacaciones. 

- ⚠️ Importante: En los **perfiles de contrato**, en la pestaña **“Días laborales e intensidad horaria”**, puedes configurar qué días se consideran laborales y cuáles no, e incluso si los empleados trabajan en días feriados.  
Esto garantiza que, al registrar una novedad de vacaciones, ContaPyme utilice correctamente el calendario de días hábiles y no hábiles, evitando errores en la liquidación y en el libro de vacaciones. 

**Recomendaciones y tips:**  
- ✅ Ingresa las fechas con exactitud para evitar diferencias en la liquidación de nómina y en el cálculo de aportes a seguridad social, aportes parafiscales, etc. 
- ⚠️ Un error en las fechas puede alterar el **libro de vacaciones**, que es la fuente oficial de control sobre días disfrutados y pendientes.  
- 📌 Si el empleado disfruta vacaciones en varias fracciones, registra cada rango de fechas por separado.
- 💡 Genera periódicamente el **informe del libro de vacaciones** para validar que los registros sean consistentes. 

#### 📌 Recursos adicionales  
- [Video: Cómo registrar vacaciones en ContaPyme](https://www.youtube.com/watch?v=nE59t4pMJzM&t=264s)  

---

### ¿Cómo consolidar las prestaciones en diciembre?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- ¿Por qué no aparecen las prestaciones pagadas en el reporte NE?  
- ¿Qué diferencia hay entre reportar pago y abono en cuenta?  
- ¿Qué pasa si cambio el método de reporte de prestaciones en enero?  
- Necesito reportarle a la DIAN la informacion de las prestaciones sociales hasta diciembre
- ¿Qué configuraciones se deben tener en cuenta para reportar las prestaciones sociales a diciembre?
- Necesito consolidar las prestaciones en diciembre
- Necesito enviar el acumulado de las prestaciones sociales en diciembre
- Necesito enviar a la DIAN lo acumulado en las cuentas por pagar 
- Necesito reportarle a la DIAN la informacion de las prestaciones sociales hasta diciembre

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, las **prestaciones sociales y vacaciones** pueden reportarse ante la **DIAN** de dos maneras válidas según la normativa vigente:  
1️⃣ **Cuando se efectúa el pago al empleado o a la entidad.**  
2️⃣ **Cuando se realiza el abono en cuenta (provisión mensual).**

Ambas opciones son correctas ante la DIAN, pero **tienen efectos distintos en la forma en que se reporta y consolida la información** durante y al final del año.  
La elección de una u otra depende de la **política contable y fiscal** de la empresa, y debe definirse con precaución antes del cierre de diciembre.

**Recomendaciones prácticas antes de consolidar diciembre**  

- ✅ Define **desde inicios del año** cómo se reportarán las prestaciones y vacaciones.  
- ✅ Si vas a cambiar el esquema (de provisión a pago o viceversa), **hazlo antes de procesar las nóminas de diciembre.**  
- ✅ Revisa los conceptos de prestaciones en el catálogo de nómina; estos **vienen configurados para liquidarse en diciembre** por defecto. (cesantías, intereses y prima).  
- ✅ Si tu empresa paga cesantías en febrero o intereses en enero, **ajuste la periodicidad del concepto**:  
  - Ruta: **Catálogo → Conceptos de Nómina → Selecciona el concepto → Pestaña “Periodicidad del pago”.**  


#### 📌 Recursos adicionales   
- [Video: Reporte de nómina de los abonos en cuenta de prestaciones sociales y vacaciones](https://www.youtube.com/watch?v=KQ6QyPcq6Vg)  
- [Video: Reporte de nómina de los pagos de prestaciones sociales y vacaciones](https://www.youtube.com/watch?v=06QIgzZtvxo) 

---

### ¿Cómo configurar en el sistema el envio a la DIAN de las provisiones mes a mes?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.
 
- Quiero enviar lo provisionado en la nómina electrónica
- Cómo enviar las provisiones en la nómina electrónica
- ¿Cómo reportar cada mes las provisiones?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, las **prestaciones sociales y vacaciones** pueden reportarse ante la **DIAN** de dos maneras válidas según la normativa vigente:  
1️⃣ **Cuando se efectúa el pago al empleado o a la entidad.**  
2️⃣ **Cuando se realiza el abono en cuenta (provisión mensual).**

Ambas opciones son correctas ante la DIAN, pero **tienen efectos distintos en la forma en que se reporta y consolida la información** durante y al final del año.  
La elección de una u otra depende de la **política contable y fiscal** de la empresa, y debe definirse con precaución antes del cierre de diciembre.

**¿Cómo definir la forma de consolidar las prestaciones en ContaPyme?**  

1️⃣ **Indica al sistema cómo se desea reportar las prestaciones y vacaciones:**  
   - Ruta: **Configuración de la empresa → Nómina → Reporte DIAN:.**  
   - Allí encontrarás las dos opciones disponibles:  
     - **Reportar al abonar en cuenta (provisión).**  
     - **Reportar al pagar al empleado o a la entidad.**

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde seleccionas cómo reportar las prestaciones sociales a la DIAN](https://www.contapyme.com/conocimientocontapyme/045_NO/envio_prestaciones.png)  

1. Reportar prestaciones y vacaciones cuando se hace el **abono en cuenta (provisión)**  

✅ Esta opción envía a la DIAN los valores **provisionados mensualmente**, no los pagados.  
✅ Es ideal cuando la empresa realiza cierres mensuales contables con provisiones automáticas.

**Ejemplo:**  
El empleado **Mario Quintero** disfrutó 5 días de vacaciones en junio.  
Sin embargo, si la empresa reporta bajo el esquema de **provisión**, el reporte de Nómina Electrónica **no reflejará los 5 días disfrutados**, sino **solo el valor provisionado** para vacaciones y demás prestaciones durante el mes.  

📊 En el pago de nómina:  
Se ve reflejado el pago efectivo de vacaciones y prima.  

📈 En el reporte NE:  
Se reflejan únicamente los valores **provisionados** para las prestaciones sociales, no los pagados.


2. Reportar prestaciones y vacaciones cuando se hace el **pago al empleado o a la entidad**  

✅ Esta opción viene **activada por defecto** en ContaPyme.  
✅ Reporta a la DIAN los conceptos de prestaciones **cuando se pagan realmente**.  

**Ejemplo:**  
La empleada **Viviana Márquez** recibe el pago de **intereses de cesantías** en enero.  
Al reportar bajo el esquema “efectivamente pagado”, en el reporte NE de enero se incluirá **el valor de los intereses de cesantías comunes pagados**.  

📊 En el pago de nómina:  
Se refleja el desembolso del valor de intereses.  

📈 En el reporte NE:  
Se enviará ese pago a la DIAN como parte del período correspondiente.


**Observaciones y precauciones**

- ⚠️ Esta configuración **solo puede modificarse una vez por año.**  
  Una vez guardada, no podrá cambiarse hasta el siguiente año.  
- ⚠️ Antes de realizar cualquier cambio, asegúrate de que **todas las nóminas del año anterior hayan sido reportadas a la DIAN.**  
  De lo contrario, podrías generar **reportes duplicados** en prestaciones sociales o vacaciones.  
- ⚠️ Si realiza el cambio sin haber cerrado correctamente el año anterior, **la DIAN podría recibir doble información (provisión + pago)** de las mismas prestaciones.  

**Recomendaciones normativas importantes**  

📌 Según la **DIAN**, para el cumplimiento del **Documento Soporte de Nómina Electrónica** se debe tener en cuenta:  

1. **El contribuyente debe determinar qué ocurrió primero:** el **pago** o el **abono en cuenta**.  
   - El hecho primero es el que **determina el momento del reporte.**  
2. En el **anexo técnico de la NE**, los **abonos en cuenta** no están explícitamente definidos, por lo que deben reportarse en el campo **“otros conceptos”**, bajo la **responsabilidad exclusiva del contribuyente.**  
3. El **Documento Soporte de Nómina Electrónica no es un desprendible de pago.**  
   - El **pago de nómina** genera los movimientos contables y deducciones reales.  
   - El **reporte NE** solo incluye los conceptos exigidos por la DIAN.  
4. Evita **reportar dos veces** los conceptos de prestaciones o vacaciones (una por provisión y otra por pago).  

**Recomendaciones prácticas antes de consolidar diciembre**  

- ✅ Define **desde inicios del año** cómo se reportarán las prestaciones y vacaciones.  
- ✅ Si vas a cambiar el esquema (de provisión a pago o viceversa), **hazlo antes de procesar las nóminas de diciembre.**  
- ✅ Revisa los conceptos de prestaciones en el catálogo de nómina; estos **vienen configurados para liquidarse en diciembre** por defecto. (cesantías, intereses y prima).  
- ✅ Si tu empresa paga cesantías en febrero o intereses en enero, **ajuste la periodicidad del concepto**:  
  - Ruta: **Catálogo → Conceptos de Nómina → Selecciona el concepto → Pestaña “Periodicidad del pago”.**  
- 📌 Haz una copia de seguridad antes de cambiar configuraciones globales.  
- ⚠️ Si tienes dudas sobre la política fiscal adecuada, consulta con tu contador o revisor fiscal antes de modificar parámetros.

#### 📌 Recursos adicionales  
- [Video: Cumplimiento normativo y responsabilidad del contribuyente](https://www.youtube.com/watch?v=zV0VUn02m68)  
- [Video: ¿Pago o abono en cuenta? Consideraciones](https://www.youtube.com/watch?v=TukI8TPVtms)  
- [Video: Reporte de nómina de los abonos en cuenta de prestaciones sociales y vacaciones](https://www.youtube.com/watch?v=KQ6QyPcq6Vg)  
- [Video: Reporte de nómina de los pagos de prestaciones sociales y vacaciones](https://www.youtube.com/watch?v=06QIgzZtvxo) 
- [+Info: Reporte de prestaciones sociales y vacaciones](en ContaPyme, dirígete al explorador gráfico de la empresa > modifcar empresa > Nómina > Reporte DIAN > Haz clic derecho sobre las opciones disponibles para conocer +Información)

---

## NOVEDADES
### ¿Cómo registrar una licencia de maternidad o paternidad?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo se registra la **licencia de paternidad** en ContaPyme?  
- ¿Cómo impacta la licencia de maternidad o paternidad en la PILA?  
- ¿Cuál es la diferencia entre la licencia de maternidad y paternidad en ContaPyme? 


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Las **licencias de maternidad y paternidad** son derechos reconocidos a los trabajadores en Colombia que garantizan un periodo de descanso **remunerado y protegido** por la ley, con el fin de asegurar el bienestar de la familia y del recién nacido. Durante este tiempo, la empresa paga al empleado el valor correspondiente en la nómina y posteriormente gestiona el reembolso ante la EPS.

En ambos casos, el pago lo asume inicialmente la empresa y luego lo reconoce la EPS.  
En **ContaPyme**, no se requieren conceptos distintos: **la maternidad y la paternidad se registran bajo el mismo concepto de nómina**, ya que el sistema las calcula de la misma manera.  

👉 El paso clave es indicar correctamente el **rango de fechas de inicio y fin** en la operación de novedades de nómina. Esto garantiza no solo el cálculo en nómina, sino también que en la **planilla PILA** se genere la novedad automática ante la EPS.

**Pasos para registrar la licencia:**  
**1.** Ingresa al **Manejador de Operaciones** y selecciona la operación **Novedades de nómina**.  
**2.** Elige el empleado y selecciona el concepto **Licencia de maternidad/paternidad**.  
**3.** Registra el **rango de fechas exacto** de la licencia.  
**4.** Guarda la novedad. El sistema calculará los días correspondientes en la nómina.  
**5.** Genera el **pago de nómina** y valida que los valores sean correctos y verifica que se cargue la novedad previamente registrada.
**6.** Al elaborar la **planilla PILA**, ContaPyme reportará la novedad automáticamente en el archivo plano que se genera para subir al operador PILA.

**Recomendaciones:**  
- ✅ Revisa que el concepto de **licencia de maternidad/paternidad** esté creado para que lo puedas utilizar en las operaciones. Además revisa el manejo contable para verificar que se impute la cuenta que deseas.
- ✅ Ingresa las fechas con precisión, pues de esto depende la correcta **novedad en la PILA**.  
- 📌 Durante la licencia, no se paga auxilio de transporte, por lo tanto, verás una disminución en la cantidad de días de auxilio de transporte en el pago de nómina para el empleado (cuando aplique el pago de auxilio de transporte)
- 💡 Si la licencia empieza en mitad del periodo, ContaPyme ajustará automáticamente los días trabajados y los días de licencia.  

#### 📌 Recursos adicionales 
- [Video: Creación y configuración de conceptos de nómina](https://www.youtube.com/watch?v=kdZahQfWK3A&t=444s)  

---

### ¿Cómo generar un préstamo a un empleado?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo registrar un préstamo en la cuenta de un empleado?  
- ¿Dónde veo los abonos y saldo de un préstamo de nómina?  
- ¿Cómo configurar descuentos automáticos de préstamos en ContaPyme?  
- ¿Qué diferencia hay entre manejar préstamos en cartera o en nómina?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, los préstamos a empleados pueden manejarse de diferentes formas según los módulos que la empresa tenga licenciados.  
El objetivo es registrar la deuda y facilitar el control de abonos y descuentos en la nómina.  

**Formas de generar un préstamo a un empleado en ContaPyme:**  

1. **Con el módulo de contabilidad**  
   - Se registra el préstamo mediante un **movimiento contable**.  
   - Ejemplo: Débito a la cuenta de préstamos a empleados (activo) y crédito a caja o bancos.  
   - Los descuentos posteriores pueden realizar a través del pago de nómina y de esta forma se amortiza la deuda.

2. **Con el módulo de Cartera**  
   - Se utiliza la operación de **Creación de préstamo de cartera**.  
   - Permite controlar abonos, cuotas y saldos pendientes de manera más detallada.  
   - Los descuentos posteriores también se pueden realizar a través del pago de nómina y de esta forma se amortiza la deuda.

3. **Con el módulo de Nómina**  
   - Se registra directamente como una **deuda del empleado** en su contrato o como un **concepto de deducción** en una novedad de nómina que se podrá cargar al pago. 
   - De esta forma, el sistema descuenta automáticamente el valor de la cuota en cada liquidación de nómina, hasta cubrir el total del préstamo.  

**Recomendaciones:**  
- ✅ Define desde el inicio cómo se controlará el préstamo: contable, cartera o nómina, según el módulo que utlices para este manejo. Aún así, recuerda que ContaPyme es muy flexible y permite que generes los préstamos desde cualquier herramienta disponible y puedes cambiarla si en algún momento lo necesitas.  

#### 📌 Recursos adicionales   
- [Video: Creación de préstamos a través de novedades en nómina](https://www.youtube.com/watch?v=nE59t4pMJzM)  
- [Video: Creación de préstamos a través de movimiento contable](https://www.youtube.com/watch?v=aWSyGcr4-Tg&t=108s)  
- [Video: Creación de préstamos a través de la operación de Creación de préstamos o anticipos](https://www.youtube.com/watch?v=0e-H1m2F_2g)  

---

### ¿Cómo modificar o anular una novedad ya contabilizada?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo eliminar una novedad que ya está en el pago de nómina?  
- ¿Por qué no me deja modificar una novedad de nómina?  
- ¿Cómo corregir una novedad mal registrada después de contabilizar?  
- ¿Qué hacer si necesito quitar una novedad que se volvió a liquidar automáticamente?  
- ¿Cómo evitar que una novedad vuelva a aparecer en las próximas nóminas?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, las novedades de nómina pueden **anularse o modificarse**, pero el procedimiento dependerá de si la novedad **ya fue contabilizada o no**, y si está **vinculada a un pago de nómina**.  
Esto es importante porque el sistema protege la trazabilidad y consistencia contable, evitando que se modifiquen valores que ya impactaron otras operaciones.  

**Casos y formas de hacerlo:**  

**1️⃣ Si la novedad ya fue contabilizada y se desea anular:**  
- Primero se debe **anular el pago de nómina** en el cual se utilizó la novedad.  
- Una vez anulado el pago, podrás **anular la operación de novedades** donde fue creada.  
- Si en esa misma operación hay novedades de **otros empleados** que ya tienen sus pagos procesados, el sistema no permitirá anular todo el documento. En ese caso, deberás **anular solo el renglón correspondiente** al empleado afectado.  

💡 Para hacerlo:  
Haz clic en el **renglón de la novedad → botón “Eliminar renglón”**.  
El sistema mostrará una advertencia indicando si deseas **anular esa novedad específica**.  
Confirma, y la novedad quedará anulada sin afectar a los demás empleados incluidos en la operación.  


La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde anulas una novedad de nómina](https://www.contapyme.com/conocimientocontapyme/045_NO/anulacion_novedades.png) 

**2️⃣ Si la novedad no ha sido contabilizada (ni se piensa contabilizar):**  (normalmente sucede con novedades registradas de años pasados pero que aún se siguen cargando en pagos de nómina actuales.)
- Ingresa a la operación **“Novedades de nómina”** desde el **Manejador de Operaciones**.  
- En el menú superior selecciona **Opciones → Habilitar paso de anulación de novedades**.  
- Desde allí podrás **anular la novedad** para que no se cargue en futuros pagos de nómina.  

⚠️ Esto es útil cuando se detectan errores en valores o conceptos antes de contabilizar la nómina.  

**3️⃣ Si se necesita modificar una novedad ya contabilizada:**  
El sistema **no permite modificar** una novedad que ya impactó un pago o fue contabilizada.  
Por tanto, el proceso correcto es:  
**a.** Anular el **pago de nómina** que contiene la novedad.  
**b.** Modificar la novedad en la operación correspondiente.  
**c.** Volver a recalcular y procesar el pago de nómina.  

📌 *Nota:* Si la novedad ya fue reportada a la DIAN (nómina electrónica), podría ser necesario **realizar un ajuste de nómina electrónica** para reflejar el cambio correctamente.  

**💡 Recomendaciones:**  
- ✅ Antes de anular, verifica si la novedad ya está vinculada a un pago o reporte.  
- ⚠️ No borres operaciones sin revisar su impacto contable. Anular preserva el consecutivo y deja trazabilidad para auditoría.  
- 📌 Usa la **anulación de renglón** cuando solo un empleado requiere corrección, sin afectar a los demás.  
- 💡 Mantén un registro de quién realiza anulaciones o modificaciones, para control interno.  
- ❌ Evita eliminar directamente operaciones desde la base de datos; siempre hazlo desde el sistema.  

---


## LIQUIDACION_CONTRATO
### ¿Cómo realizar la liquidación de contrato de un empleado?

La liquidación de contrato en ContaPyme se realiza mediante una operación diseñada para calcular automáticamente todas las obligaciones pendientes al finalizar el vínculo laboral. Esta herramienta consolida prestaciones sociales, novedades pendientes, cuentas por cobrar y posibles indemnizaciones, evitando errores manuales y asegurando un cierre correcto del contrato.  

👉 Pasos para realizar la liquidación de contrato

1. **Accede al manejador de operaciones**  
   Ve a **Operaciones → Operaciones de Nómina → Liquidación de contrato**.

2. **Selecciona el empleado**  
   - Busca el empleado en la lista de terceros.
   - Confirma que su información esté actualizada.  
   💡 *Asegúrate de que todas las novedades previas ya hayan sido reportadas.*

3. **Ingresa la fecha de terminación y el motivo**  
   - Define la **fecha de retiro**.  
   - Selecciona el **motivo de terminación del contrato**.  
   ⚠️ *Si el retiro es sin justa causa, el sistema calculará automáticamente la indemnización.*

4. **Revisa la liquidación generada por el sistema**  
   - Prestaciones sociales acumuladas.  
   - Novedades pendientes por liquidar.  
   - Cuentas por cobrar u otros descuentos.  
   - Indemnización (cuando aplica).  
   👉 Verifica los valores antes de confirmar.

5. **Guarda y finaliza la operación**  
   - Una vez confirmada, la liquidación queda lista para nómina y contabilidad.  

**Recomendaciones**

- ⚠️ Revisa si el empleado tiene vacaciones pendientes o anticipadas antes de liquidar.  
- 👉 Confirma que las novedades del último período estén registradas para evitar pagos incompletos.  
- 💡 Guarda un soporte en PDF de la liquidación para archivo interno.  
- ⚠️ Valida el motivo de retiro: esto impacta directamente indemnizaciones y cálculos finales.

#### 📌 Recursos adicionales
- [Video: liquidación de contratos en ContaPyme](https://www.youtube.com/watch?v=Y8FWMlG5XKs&t=4s)

#### Variantes de la pregunta (aplicación canónica):

- ¿Cómo liquidar prestaciones sociales al finalizar contrato?
- ¿Cómo hacer el retiro de un empleado en ContaPyme? 
- ¿Cómo calcular indemnización por despido sin justa causa?  
- ¿Cómo cerrar el contrato de un colaborador en nómina?
- ¿Cómo puedo realizar la terminacion de un contrato laboral?

---


## LIQUIDACION_NOMINA/PAGO_NOMINA

### ¿Cómo evitar errores al liquidar conceptos por fuera de nómina?

En **ContaPyme**, cualquier pago realizado a un empleado debe registrarse **siempre dentro del proceso de nómina**, incluso si corresponde a conceptos extraordinarios como bonificaciones, auxilios o ajustes. Esto se debe a que todos los pagos deben reportarse en la **Nómina Electrónica** según la normativa vigente. Liquidar valores por fuera de nómina puede generar **omisiones en el reporte oficial**, lo que implica riesgos legales y contables.

**Pasos para hacerlo correctamente**
✅ **1. Incluye todos los pagos en la nómina**  
👉 Ingresa al menú **Manejador de operaciones → Operaciones de nómina → Novedades de nómina**.  
👉 Agrega el concepto correspondiente (bonificación, auxilio, etc.) que requieras adicionar a un empleado en el pago de nómina del período específico.  
👉 Realiza el pago de nómina y el reporte de nómina electrónica.

✅ **2. Evita operaciones externas**  
👉 No uses operaciones por fuera de nómina para pagos a empleados, ya que esto no se reflejará en el reporte oficial.

✅ **3. Confirma el reporte electrónico**  
👉 Genera el archivo de **Nómina Electrónica** y valida que incluya todos los conceptos liquidados.

**Recomendaciones**
💡 **Todo pago a empleados debe pasar por nómina**, sin excepción.  
⚠️ **Omitir conceptos en la nómina electrónica puede generar sanciones** y problemas con la DIAN.  
💡 **Si tienes dudas**, crea un tiquete al equipo de soporte técnico con el tema **“Nómina”** para recibir orientación.

#### Variantes de la pregunta (aplicación canónica):
- ¿Se pueden liquidar conceptos por fuera de la nómina?
- ¿Puedo realizar la nómina por un movimiento contable?

---

### ¿Cómo eliminar una liquidación?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo reversar una liquidación ya contabilizada?  
- ¿Por qué no puedo eliminar una operación enviada a la DIAN?  
- ¿Cómo anular una nómina o liquidación de contrato?  
- ¿Qué pasa si elimino por error una nómina ya reportada?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, eliminar una liquidación significa borrar definitivamente el registro del sistema, lo cual puede afectar consecutivos, trazabilidad y auditoría. Por eso, **la mejor práctica es anularla**, no eliminarla.  
Cuando se **anula**, el documento queda inactivo pero el registro histórico se conserva, asegurando la integridad contable y el cumplimiento normativo.  

**💡 Diferencia clave:**  
- ✅ **Anular:** mantiene el consecutivo y deja trazabilidad del documento.  
- ❌ **Eliminar:** borra el registro completamente y no puede recuperarse.  

**Pasos para eliminar una liquidación (solo si es estrictamente necesario):**  
**1.** Ingresa al **Manejador de Operaciones** del módulo correspondiente (por ejemplo, Nómina o Contabilidad).  
**2.** Localiza la **operación o liquidación** que deseas eliminar.  
**3.** Selecciona el botón **“Eliminar”**.  
**4.** Confirma la eliminación solo si estás completamente seguro.  

⚠️ **Importante:**  
- Si el documento ya fue **enviado a la DIAN** (para el caso de reportes electrónicos) **no podrá eliminarse**. En ese caso, no se permite realizar acciones como eliminar o anular. Se tendrá que realizar un reporte de ajuste de nómina electrónica.
- Si el documento ya fue **publicado en la Plataforma de Documentos**,(para el caso de los pagos de nómina) **no podrá eliminarse**.  
  En ese caso, únicamente se podrá **anular** desde el mismo **Manejador de Operaciones**.   
- Antes de eliminar cualquier registro, se recomienda generar una **copia de seguridad** y verificar dependencias contables o de nómina.  

**Recomendaciones:**  
- 📌 Prefiere siempre **anular** antes que eliminar, para conservar la evidencia y trazabilidad.  
- 💡 Revisa que no existan **documentos relacionados** (por ejemplo: pagos, contabilizaciones, reportes NE).  
- ⚠️ Este proceso solo debe ejecutarlo el **usuario ADMIN** o un perfil con permisos avanzados.  
- ✅ Genera copias de seguridad antes de cualquier acción irreversible.  

---

### ¿Qué pasos seguir si olvidé liquidar un mes anterior?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué pasa si no liquidé la nómina de un mes anterior?  
- ¿Puedo recalcular la nómina de meses siguientes si olvidé una anterior?  
- ¿Cómo ajustar la nómina electrónica si la base de cálculo cambió?  
- ¿Qué pasa si la nómina quedó fuera de secuencia?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme** no existen restricciones para realizar liquidaciones fuera de orden cronológico (por ejemplo, registrar una nómina de marzo antes de febrero). Sin embargo, es **altamente recomendable mantener el orden lógico** para conservar la coherencia de la información contable y de nómina.  

Si olvidaste liquidar un mes anterior, puedes hacerlo sin problema, pero ten en cuenta los siguientes puntos clave 👇  

**Pasos recomendados:**  
**1.** Verifica que el **consecutivo de las operaciones** (en el manejador de operaciones) sea coherente y no se salten periodos.  
**2.** Liquida primero el mes olvidado, asegurándote de registrar correctamente las **novedades**, **devengos** y **deducciones**.  
**3.** Si ya habías liquidado meses posteriores, realiza un **reajuste o recalculo** de esos meses, especialmente si manejas **salarios variables** o **conceptos dependientes de promedios** (como vacaciones, cesantías, intereses de cesantías o primas).  
**4.** Si ya se enviaron reportes a la **DIAN** (nómina electrónica) y los valores del mes siguiente se ven afectados, debes realizar un **ajuste de nómina electrónica** para corregir la información enviada.  
**5.** Una vez validada la coherencia, puedes continuar con las liquidaciones siguientes sin necesidad de eliminar las existentes.  

**💡 Claves importantes:**  
- **ContaPyme no impide** que registres información de meses posteriores sin haber cerrado o liquidado los anteriores.  
- No obstante, debes garantizar la **coherencia contable y salarial** para que las fórmulas de nómina operen correctamente.  
- Los cálculos automáticos (por ejemplo, de **promedios de variables o prestaciones**) pueden variar si faltan liquidaciones previas.  

**Recomendaciones:**  
- ✅ Mantén un **orden cronológico** en tus liquidaciones de nómina.  
- ⚠️ Si existen valores variables o retroactivos, **liquida primero el mes anterior** y recalcula los periodos siguientes.  
- 💡 Documenta los ajustes y conserva copia de los reportes enviados a la **DIAN**.  
- 📌 Si ya reportaste a la DIAN con valores incorrectos, **no borres la nómina**: genera un **ajuste de Nómina electrónica** en el periodo correspondiente.  

---

### ¿Cómo generar los comprobantes de nómina?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo enviar comprobantes de nómina por correo?  
- ¿Cómo habilitar que los empleados consulten su comprobante en línea?  
- ¿Qué hacer si un comprobante no llega al correo del empleado?  
- ¿Se pueden generar comprobantes en HTML en vez de PDF?  
- ¿Cómo generar colillas de pago y reportes consolidados? 
- ¿Cómo realizar la nómina en contapyme?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, antes de poder generar los comprobantes de nómina es indispensable que el módulo esté correctamente configurado. Esto incluye:  
- Creación de la **empresa** (con su configuración básica, actividades económicas, tipo de aportante, centros de trabajo, sedes, centros de costo, etc)
- Configuración de **conceptos de nómina**.  
- Definición de **perfiles de contrato**.  
- Registro de **proveedores y entidades de nómina**.  
- Creación de **empleados y contratos**.  

Una vez configurado:  
1. Registra las **novedades de nómina** del periodo (horas extra, comisiones, licencias, etc.).  
2. Realiza el **pago de nómina**, ya sea individual o en planilla.  
3. Con la nómina procesada, accede al **Manejador de operaciones** donde podrás:  
   - Generar los comprobantes en **PDF**.  
   - Enviarlos directamente por **correo electrónico** a cada empleado.  

**💡 Funcionalidad destacada:**  
ContaPyme ofrece la integración con la **Plataforma de Documentos**, que permite publicar los comprobantes de nómina para que cada empleado:  
- Los consulte desde la web.  
- Apruebe el documento.  
- Solicite soporte (ej. pedir una llamada).  
- Visualice el comprobante en formato **HTML** con una presentación más clara y atractiva.  

**A continuación te detallamos los pasos para habilitar la plataforma de documentos:**  
**1.** Ingresa a la configuración de la empresa:  
   - Activa el uso de la **Plataforma de Documentos**.  

**2.** Configura el **documento soporte de nómina**:  
   - Ve a **Documentos de soporte** en la pestaña "Básico"
   - Modifica el documento de soporte de pago de nómina
   - En la ruta: "Definición del documento > Acciones > Publicación en plataforma de documentos" > Marca la opción que habilita el envío de comprobantes por la plataforma. 
   - Para la aprobación del documento indica si deseas que esta se apruebe automáticamente al finalizar la operación de pago, si deseas que ContaPyme te pregunte si deseas aprobar el documento o si por el contrario, deseas aprobar manualmente el documento desde el manejador de operaciones.
   - En la pestaña "Publicación del documento" realiza los siguientes pasos adicionales:
    
    > General: 
      ✅ Indica a partir de qué fecha deseas habilitar la publicación del documento
      ✅ Asocia la plantilla de comprobante en PDF o HTML (es decir, el formato en el cual se publicará el documento en la plataforma)
      ✅ Define quién será el responsable del documento
      ✅ Establece qué archivos adicionales deseas adjuntar

    > Acciones:
      ✅ Escoge todas las acciones que estarán permitidas para el empleado dentro de la plataforma de documentos, por ejemplo, leer el documento, aprobarlo, rechazarlo, enviar mensaje, solicitar llamada, descargar, entre otros.
      ✅ Define si deseas que se notifique al responsable según la acción que parametrices.
      ✅ Configura el medio de notificación y el tiempo entre notificaciones.
    
    > Notificaciones:
      ✅ Defineas notificaciones que se generarán a quien recibe el documento, en este caso, el empleado. 

**3.** Publica los comprobantes:  
   - Después de realizar la planilla de pago de nómina debes aprobar el documento (ya sea que se realice de forma automática, al finalizar la operación o manualmente)
   - Al aprobar la planilla de nómina en el **Manejador de operaciones**, selecciona la opción de **publicar en plataforma**.  
   - Automáticamente, los comprobantes estarán disponibles en línea para cada empleado y se enviará una notificación al correo del mismo, indicando que su comprobante está listo para ser consultado.

**Recomendaciones:**  
- ✅ Verifica que los correos electrónicos de los empleados estén correctos en el sistema.  
- ✅ Usa la opción de previsualización antes de publicar en plataforma.  
- 📌 Si tu empresa maneja gran cantidad de empleados, la **planilla de pago de nómina** optimiza tiempos.  
- ⚠️ Recuerda que la publicación en plataforma requiere tener el servicio activo en la empresa.

#### 📌 Recursos adicionales  
 
- [Video: ¿Cómo funciona el módulo de Nómina de ContaPyme?](https://www.youtube.com/watch?v=0kkzow8C134) 
- [Video: Configuraciones iniciales del módulo de Nómina](https://www.youtube.com/watch?v=kdZahQfWK3A) 
- [Video: Pagos de nómina en planilla](https://www.youtube.com/watch?v=t6E8KmTJGRk) 
- [Video: Uso de la Plataforma de Documentos](https://www.youtube.com/watch?v=_2unyNPBjeI&t=381s) 

---


### ¿Qué debo hacer si se están cargando novedades de nómina que no se deben incluir en la liquidación o pago de nómina?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué se están cargando vacaciones anteriores?
- ¿Por qué me salen novedades de meses anteriores?
- ¿Qué hacer si se están cargando unas vacaciones que no fueron otorgadas al empleado?
- ¿Qué debo realizar si hay una novedad de meses anteriores que no quiero que siga apareciendo en los pagos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si se están cargando novedades que no corresponden en la liquidación o pago, generalmente es porque **fueron registradas previamente pero no se gestionaron (aplicaron o anularon) correctamente**.

**¿Cómo solucionarlo?**

Existen las siguientes alternativas:

**1. Anular novedades desde una nueva operación**  
- Ingresa a **Novedades de nómina**.  
- Ve a **Opciones de la operación**.  
- Activa el paso **“Anulación de novedades”**.  
- Selecciona la novedad que deseas eliminar y procede a anularla.  

**2. Modificar o anular la novedad directamente**  
- Ubica la **novedad específica** que se está cargando incorrectamente.  
- Si el sistema lo permite, **modifícala** para corregir la información.  
- En caso contrario, procede a **anularla directamente** desde la misma operación, anulando el renglón para ese empleado que tiene el inconveniente. Para hacerlo, da clic en el botón "eliminar renglón" y el sistema te preguntará si deseas anular la novedad de ese empleado.

**Recomendación:**

- ⚠️ Antes de generar la nómina, valida las novedades pendientes para evitar que se incluyan valores no deseados en la liquidación de contrato o pago de nómina.

---

## ENTIDADES_DE_NÓMINA/ PROVEEDORES_DE_NOMINA

### ¿Qué es una entidad de nómina y para qué sirve?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué diferencia hay entre una entidad de nómina y un proveedor?  
- ¿Para qué se usan las entidades de nómina en el sistema?  
- ¿Cómo se clasifican los aportes de nómina?  
- ¿Qué significa EPS como entidad en el sistema?  
- ¿Cuál es la función de una entidad en la nómina?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En el sistema, una entidad de nómina es una categoría general que clasifica los diferentes tipos de aportes y pagos derivados de la nómina.

Estas entidades agrupan conceptos como:
- EPS (salud)  
- Fondo de pensión  
- ARL (riesgos laborales)  
- Caja de compensación  
- ICBF  
- SENA  
- Fondo de cesantías, entre otros

Es importante tener claro que la entidad de nómina no es la empresa a la que le pagas directamente, sino el tipo de obligación.  
Por ejemplo, el sistema sabe que debe calcular un aporte para EPS, pero no sabe a cuál EPS específica hasta que le indiques el proveedor.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Lista de entidades de nómina](https://www.contapyme.com/conocimientocontapyme/045_NO/lista_entidades_nomina.png)  

*Imagen: Vista del catálogo donde se muestran las entidades de nómina clasificadas (EPS, pensión, ARL, etc.).*

**¿Y qué son los proveedores de nómina?**  
En el sistema, los proveedores de nómina son las empresas específicas que reciben esos aportes.

Ejemplo práctico:
- Entidad ➡ EPS / Proveedor ➡ Sanitas, Sura, Salud Total  
- Entidad ➡ Fondo de pensión / Proveedor ➡ Colpensiones, Protección, Porvenir  
- Entidad ➡ ARL / Proveedor ➡ Sura, Colpatria

Es decir, la entidad define qué tipo de aporte es, y el proveedor define a qué empresa se le paga ese aporte.

**¿Para qué sirve esta clasificación?**  
- Garantiza que los cálculos de nómina se hagan correctamente según cada tipo de aporte  
- Permite generar las cuentas por pagar a cada proveedor  
- Ayuda a organizar reportes electrónicos y soportes contables  
- Permite configurar un proveedor por defecto para cada entidad, o personalizarlo por empleado si tiene un proveedor distinto al general

👉 Para que lo tengas más claro, revisa el [video de entidades de nómina](https://www.youtube.com/watch?v=rQAt8neSby0&t=5s), donde te mostramos cómo configurarlas en el sistema.

#### 📌 Recursos adicionales  
- [Video: Entidades de nómina](https://www.youtube.com/watch?v=rQAt8neSby0&t=5s)  
- [Video: Proveedores de nómina](https://www.youtube.com/watch?v=snLC7eIEkKg)  

---

### ¿Cuál es la diferencia entre un proveedor de nómina y una entidad de nómina?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué diferencia hay entre proveedor y entidad de nómina?  
- ¿Qué significa entidad EPS y proveedor Sanitas?  
- ¿Por qué hay que configurar entidad y proveedor por separado?  
- ¿Para qué sirve tener tipos de entidad y proveedores distintos?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El **tipo de entidad** de nómina define para qué es (EPS, pensión, ARL, etc.), mientras que el **proveedor de nómina** es la empresa específica.

Ejemplo práctico:  
- Tipo de entidad ➡ EPS  
- Proveedor ➡ Sanitas, Salud Total, Sura...  
- Tipo de entidad ➡ Fondo de pensión  
- Proveedor ➡ Colpensiones, Protección, Porvenir

La entidad es la categoría general, y el proveedor es a quién específicamente le pagas.

👉 Para completar tus conocimientos, te recomendamos ingresar a la [plataforma de capacitación de nómina](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680), en la sesión PILA, donde encontrarás los tutoriales sobre **Proveedores de nómina**, **Catálogo de tipos de entidades** y **Cómo realizar traslados entre entidades de nómina**.

#### 📌 Recursos adicionales  
- [Video: Entidades de nómina](https://www.youtube.com/watch?v=rQAt8neSby0&t=5s)  
- [Video: Proveedores de nómina](https://www.youtube.com/watch?v=snLC7eIEkKg)  
- [Video: ¿Cómo realizar traslados entre entidades de nómina?](https://www.youtube.com/watch?v=p6VxSfzSOO0) 
- [Plataforma de capacitación: Nómina - sesión PILA](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680)

---

### ¿Cómo configuro un tipo de entidad?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo se crean las entidades en nómina?  
- ¿Dónde configuro las EPS, pensiones y cajas de compensación?  
- ¿Qué pasos debo seguir para crear entidades y proveedores?  
- ¿Cómo asocio una EPS a un empleado?  
- ¿Dónde se configura el proveedor por defecto en nómina?  
- ¿Cómo hacer que un empleado tenga una EPS diferente?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En el sistema, configurar correctamente los tipos de entidad y sus proveedores es fundamental para que los aportes de nómina queden bien calculados, se generen las cuentas por pagar correctamente y se construya el archivo para PILA de forma adecuada.

Primero defines **qué tipo de entidad es** (EPS, pensión, ARL, etc.), y luego asocias el **proveedor**, que es la empresa específica a la que le vas a pagar.

1. Ingresa al **Menu: Catálogo de terceros > Entidades de nómina**.  
La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Catálogo entidades](https://www.contapyme.com/conocimientocontapyme/045_NO/catalogo_entidades.png)  
   *Imagen: Pantalla del catálogo mostrando las entidades clasificadas por EPS, pensión, ARL, SENA, ICBF, entre otras.*

2. Configura un **proveedor de nómina por defecto** para cada entidad.  
   Esto sirve para que, al generar los pagos, el sistema cree automáticamente las cuentas por pagar a ese proveedor general y asocie correctamente los datos en el archivo para PILA.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Proveedor por defecto](https://www.contapyme.com/conocimientocontapyme/045_NO/proveedor_por_defecto.png)  
   *Imagen: Pantalla donde seleccionas el proveedor predeterminado para cada entidad.*

   ✅ Ejemplo: Si la mayoría de tus empleados están afiliados a Nueva EPS, lo recomendable es configurar Salud Total como proveedor por defecto para la entidad EPS.

3. Personaliza proveedores específicos para empleados que lo necesiten:  
   - Ve a **Catálogo de terceros > Modificar empleado > Pestaña Entidades**.  
   - En la entidad correspondiente (como EPS), selecciona el proveedor específico solo para ese empleado.  
   Así, el sistema no usará el proveedor general, sino el que personalizaste para ese caso particular.

 La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Proveedor personalizado por empleado](https://www.contapyme.com/conocimientocontapyme/045_NO/proveedor_personalizado_empleado.png)  
   *Imagen: Pantalla donde seleccionas el proveedor para cada empleado.*

👉 **Importante:** Esta personalización es clave para garantizar que, al generar el archivo para PILA, cada aporte quede asociado al proveedor correcto y evites rechazos o errores al cargarlo.

Para completar tus conocimientos, te recomendamos ingresar a la [plataforma de capacitación de nómina](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680), en la sesión PILA, donde encontrarás los tutoriales sobre **Proveedores de nómina**, **Catálogo de tipos de entidades** y **Cómo realizar traslados entre entidades de nómina**.

#### 📌 Recursos adicionales  
- [Video: Entidades de nómina](https://www.youtube.com/watch?v=rQAt8neSby0&t=5s)  
- [Video: Proveedores de nómina](https://www.youtube.com/watch?v=snLC7eIEkKg)  
- [Video: ¿Cómo realizar traslados entre entidades de nómina?](https://www.youtube.com/watch?v=p6VxSfzSOO0) 
- [Plataforma de capacitación: Nómina - sesión PILA](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680)

---

### ¿Cómo configurar la ARL?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo asignar un nivel de riesgo a cada empleado?  
- ¿Cuál es la diferencia entre centro de costo y centro de trabajo?  
- ¿Por qué no se liquida el aporte de ARL en la nómina?  
- ¿Qué hacer si la empresa tiene varias sedes con diferentes riesgos?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, la configuración de la **ARL (Administradora de Riesgos Laborales)** permite que el sistema liquide correctamente los aportes de seguridad social según la actividad económica de la empresa y el nivel de riesgo de cada empleado.  
Este proceso se basa en tres elementos clave:  
- La **actividad económica** registrada en la empresa.  
- Los **centros de trabajo**, que determinan los niveles de riesgo.  
- La asignación de cada empleado a su respectivo centro de trabajo.  

**Pasos para configurar la ARL:**  
**1.** Define la **actividad económica principal** de la empresa (según el código CIIU).  
   - Esta actividad determina el nivel de riesgo general con el que la empresa está registrada. 
   - Para crear la actividad económica puedes hacerlo en la ruta: Pestaña Básico > empresa > modificar empresa > clasificación tributaria > actividades económicas > adicionar actividad económica.

**2.** Crea los **centros de trabajo**:  
   - Representan las sedes o áreas físicas donde se desempeñan los empleados.  
   - Cada centro de trabajo se asocia a un nivel de riesgo entre 1 y 5, dependiendo de la actividad que se realice allí.  
   - Para adicionar un nuevo centro de trabajo, podrás hacerlo en el mismo renglón en donde creas las actividades económicas principales y secundarias de tu empresa (según el paso anterior)

**3.** ¿Cuál es la diferencia entre **centro de trabajo** y **centro de costo**: ? 
   - 📌 *Centro de trabajo*: define el riesgo laboral asociado a la ubicación o área física (impacta directamente la ARL).  
   - 📌 *Centro de costo*: se utiliza solo con fines contables y de análisis financiero (no afecta el cálculo de aportes) y no necesariamente es un lugar físico, ya que podría usarse para llevar el control de los ingresos, costos y gastos de un proyecto.

**4.** Asigna el **centro de trabajo** a cada empleado en su contrato:  
   - Al crear el contrato de trabajo el sistema te solicitará un centro de trabajo.
   - Esto es relevante ya que según el nivel de riesgo asociado, el sistema aplicará automáticamente el **porcentaje de cotización ARL** correspondiente en la nómina.  

**5.** Valida que los datos estén correctos antes de liquidar la nómina:  
   - Una vez configurados, el sistema incluirá los aportes de ARL en la liquidación y en la planilla PILA.  

**Recomendaciones:**  
- ✅ Si la empresa tiene varias áreas con diferente nivel de riesgo (ejemplo: oficina vs. planta), crea varios **centros de trabajo** y asigna cada empleado al que corresponda.  
- ✅ Mantén actualizada la **actividad económica** en caso de cambios en el objeto social o la apertura de nuevas actividades.  
- ⚠️ Si asignas mal el nivel de riesgo, el sistema calculará un aporte equivocado. 
- 💡 Verifica en los reportes de novedades de seguridad social que el **porcentaje de ARL** coincida con el esperado según el centro de trabajo.  

#### 📌 Recursos adicionales  
- [Video: Configuración de la empresa](https://www.youtube.com/watch?v=yTJdtTL586o&t=480s)  
- [Video: Configuración de centros de trabajo y ARL en el contrato](https://link-mas-info)  
- [Video: Conceptos básicos de PILA](https://www.youtube.com/watch?v=WQVNZIyjdp8&t=491s)  

---

## PILA
### ¿Cómo reportar las novedades en PILA?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo reporto incapacidades en la PILA?  
- ¿Cómo aparecen las licencias de maternidad o paternidad en la planilla PILA?  
- ¿Qué debo hacer cuando un empleado cambia de EPS o pensión?  
- ¿Cómo reportar un ingreso o retiro en la PILA?  
- ¿Es necesario digitar manualmente novedades en el operador PILA?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, todas las novedades de los empleados se reflejan automáticamente en la **planilla PILA**.  
No es necesario entrar al operador de PILA a digitar datos manualmente, ya que el sistema genera el archivo plano con todas las novedades listas para cargar.  
Esto representa un **ahorro significativo de tiempo** y minimiza errores en el pago de aportes de seguridad social.  

**Tipos de novedades que se reportan en PILA:**  

1. **Novedades transitorias**  
   - Ejemplos: incapacidades, licencias (maternidad, paternidad, no remuneradas), vacaciones.  
   - Se registran en la **nómina** como novedades, indicando el rango de fechas.  

2. **Novedades permanentes o administrativas**  
   - Ejemplos: ingreso de un nuevo trabajador, retiro, traslados de EPS, fondo de pensión, ARL o caja de compensación.  
   - Se registran en el **contrato del empleado**, en la pestaña de entidades o fechas.  

3. **Valores de nómina**  
   - Salario, auxilios, horas extra, recargos, comisiones y demás conceptos devengados o deducidos.  
   - Se toman directamente de la liquidación de nómina.  

**Cómo funciona en ContaPyme:**  
- Al registrar una **novedad en nómina** o un **cambio en el contrato**, el sistema guarda automáticamente la información.  
- Cuando generas la planilla, ContaPyme incorpora todas las novedades en el archivo **PILA plano** con los códigos normativos exigidos.  
- Solo debes cargar el archivo en tu operador de PILA para realizar el pago, sin digitación manual adicional.  

**Recomendaciones:**  
- ✅ Registra a tiempo las novedades en el sistema para que se reflejen en la planilla del mismo mes.  
- 📌 Valida en la **Planilla PILA** de ContaPyme antes de exportar, para asegurarte de que todos los movimientos estén incluidos.  
- ⚠️ Si un empleado cambia de EPS, fondo o ARL, actualiza la entidad en su contrato antes de generar la planilla.  
- 💡 Usa la **planilla pago de nómina** para confirmar que incapacidades, licencias, vacaciones y demás novedades estén registradas correctamente.  

#### 📌 Recursos adicionales  
- [Curso de PILA completo para su funcionamiento automático](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680)  

---

## REPORTES_DE_NÓMINA_ELECTRÓNICA

### ¿Cómo se reporta correctamente la nómina electrónica a la DIAN?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo habilito la nómina electrónica en ContaPyme?  
- ¿Qué debo configurar para reportar la nómina a la DIAN?  
- ¿Se pueden enviar los reportes de nómina en planilla?  
- ¿Cómo asigno el proveedor tecnológico en ContaPyme?  
- ¿Por qué no me está generando el reporte de nómina electrónica?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El reporte de nómina electrónica es un requisito obligatorio de la DIAN en Colombia, y su objetivo principal es que las empresas puedan deducir los costos asociados a la nómina de sus empleados para el impuesto de renta y complementarios. Este proceso no solo es una obligación legal, sino que también permite a la autoridad fiscal conocer con precisión los ingresos y las deducciones de cada empleado, asegurando transparencia y control en los procesos contables.

**¿Qué se reporta específicamente en el RNE (nómina electrónica)?**  
- **Empleador y trabajador:** NIT y razón social del empleador; tipo y número de documento del empleado, nombres y apellidos.  
- **Periodo de nómina:** fecha inicial y final del periodo, y **fecha de pago**.  
- **Devengos salariales:** salario básico, horas extra, recargos, comisiones, viáticos salariales, bonificaciones salariales, etc.  
- **Devengos no salariales:** auxilio de transporte, viáticos no salariales y otros **no constitutivos de salario**.  
- **Deducciones:** salud, pensión, fondo de solidaridad, libranzas, anticipos, embargos, retenciones, etc.  
- **Totales:** **total devengado**, **total deducido** y **neto a pagar**.  
- **Datos del documento electrónico:** prefijo y consecutivo, **CUNE**, notas y (si aplica) referencia al **ajuste** del documento original.

💡 **Tips rápidos:**  
- Asegúrate de mapear cada **concepto** al tipo DIAN correcto (**devengo/deducción** y **salarial/no salarial**); una clasificación errada puede generar **rechazos**.  
- Verifica que todos los empleados tengan **tipo y número de documento**; campos incompletos bloquean el envío.  
- Si debes corregir un reporte enviado, usa **Ajuste de nómina electrónica** referenciando el documento original ya que no se podrá eliminar un reporte electrónico enviado.

En ContaPyme, hemos optimizado este proceso para que se pueda realizar fácilmente y de forma masiva. Para activarlo, solo necesitas dos cosas:
1. Realizar una única configuración inicial. Esto prepara el sistema para el envío de los documentos.
2. Contar con un plan de documentos para envío electrónico de reportes con InSoft, que además requiere tener un proveedor tecnológico asignado y un plan de documentos electrónicos activo.

Una vez que estos requisitos se cumplen, se podrá realizar la operación de reporte de nómina electrónica para cumplir con los requerimientos DIAN.

**Pasos para reportar la nómina electrónica en ContaPyme:**  

**1. Habilitar la nómina electrónica en la empresa.**  
- La empresa debe estar inscrita en el sistema de nómina electrónica de la DIAN.  
- En ContaPyme debes tener contratado el plan de documentos para reportes electrónicos con InSoft.  

**2. Configurar la empresa en ContaPyme.**  
- Ingresa al **Catálogo de la empresa** y valida que la información tributaria esté completa (RUT, responsabilidades, etc). En esta sección también podrás escoger cómo deseas reportar las prestaciones sociales y vacaciones en la nómina electrónica (**pago o abono en cuenta**).

- Antes de realizar alguna modificación en la sección de nómina electrónica para el reporte de prestaciones, sugerimos que revises muy bien las implicaciones de hacer algún cambio en este apartado para evitar inconvenientes futuros con tus reportes o duplicidad de la información en la DIAN.

**3. Configurar el documento soporte de nómina electrónica.**  
- En el catálogo de **documentos**, crea o edita el documento de nómina electrónica.  
- Asigna el proveedor tecnológico autorizado. 

**4. Registra y crea tus empleados y sus contratos.**  
- En el catálogo de terceros crea cada uno de tus empleados. 
- Crea sus contratos. 

Es importante que la información sea precisa ya que todos los datos serán enviados en el reporte de nómina electrónica a la DIAN.

**5. Registrar las novedades y pagos de nómina.**  
- Ingresa las novedades (horas extras, ausencias, licencias, comisiones, etc.).  
- Ejecuta la operación de **pago de nómina** (individual o en planilla según el licenciamiento).  

**6. Generar y enviar el RNE (Reporte de Nómina Electrónica).**  
- Una vez calculada y contabilizada la nómina, ingresa a la operación de **Reporte de Nómina Electrónica**.  
- Genera la operación electrónica y realiza el envío automático a la DIAN.  
- El envío puede hacerse **empleado por empleado** o en **bloque (planilla)** dependiendo del licenciamiento adquirido.  

**Recomendaciones y tips:**  
- ✅ Verifica que todos los empleados tengan correctamente registrados datos como: tipo de documento, número de cédula, otros datos relevantes del contrato. 
- 📌 Antes de enviar, revisa los reportes preliminares de nómina para validar que los valores coincidan.  
- ⚠️ Si un empleado no tiene configurados sus datos obligatorios, el sistema bloqueará el envío hasta que completes la información o si utilizas datos incorrectos o no permitidos según el anexo técnico de nómina electrónica. Por ejemplo: un porcentaje no permitido por la normatividad en las horas extras y recargos y/o de horas extras.
- 💡 Realiza siempre pruebas de envío en un periodo de nómina de control antes de iniciar la operación oficial.  
- ✅ Guarda y revisa el acuse de recibo que genera la DIAN para efectos de soporte en la declaración de renta. 
- ⚠️  Recuerda que si por algún motivo te equivocas con algún dato al momento de transmitir la nómina electrónica tendrás que realizar un ajuste de nómina electrónica o un reporte de anulación de nómina electrónica (para los casos en los que el empleado ya no trabajaba en la empresa y aún así se reportó la nómina)

#### 📌 Recursos adicionales  
- [Video: Reporte de Nómina Electrónica](https://www.youtube.com/watch?v=YkB6pLa6IpU)  
- [Video: ¿Cómo generar el reporte de Nómina Electrónica en planilla? en ContaPyme](https://www.youtube.com/watch?v=tX6F_jzSlw4)  
-- [Video: ¿Pago o abono en cuenta? Consideraciones](https://www.youtube.com/watch?v=TukI8TPVtms)  

---

### ¿Cómo realizar un ajuste de nómina electrónica?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué hago si la nómina electrónica fue reportada con errores?  
- ¿Cómo corrijo un reporte de nómina ya enviado a la DIAN?  
- ¿Qué diferencia hay entre anular y ajustar la nómina electrónica?  
- ¿Cómo validar que el ajuste fue aceptado por la DIAN?  
- Envié mal la nómina
- Necesito corregir la nómina electrónica enviada
- Envié la nómina incorrecta a la DIAN

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El **ajuste de nómina electrónica** es un documento que se genera cuando ya se reportó una nómina a la DIAN y posteriormente se detecta un error o es necesario corregir valores.  
Su función es garantizar que la información enviada coincida con la realidad contable y laboral de la empresa y del empleado. 

Se utiliza, por ejemplo, cuando:  
- 📌 Se omitió una novedad o un pago en la nómina ya reportada.  
- 📌 Se registraron valores incorrectos (ejemplo: devengos, deducciones, aportes).  
- 📌 Es necesario corregir datos de identificación de un empleado en el reporte enviado.  

**Pasos para realizar el ajuste en ContaPyme:**  

⚠️ Primero anula el pago de nómina realizado previamente, corrige las novedades que apliquen realmente al empleado y realiza nuevamente el pago de nómina para el período.

Posteriormente, sigue los siguientes pasos:

**1.** Ingresa al **Manejador de Operaciones**.  
**2.** En la pestaña nómina, selecciona la operación de **Ajuste de nómina electrónica**.  
**3.** Escoge el documento o periodo de nómina que deseas ajustar.  (documento referencia)
**4.** Revisa los valores correctos (el sistema generará un documento de ajuste).  
**5.** Envía el nuevo reporte a la DIAN, que quedará vinculado al reporte inicial.

La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Reporte de ajuste de nómina electrónica](https://www.contapyme.com/conocimientocontapyme/045_NO/reporte_ajuste_nomina_electronica.png)

Algunos casos y preguntan frecuentes sobre los reportes de ajuste de nómina electrónica son:

- **¿Cómo se hace un ajuste de NE por cierre de año?**  
  Cuando realizas cierres contables y necesitas que la nómina quede correctamente registrada, puedes ajustar el último periodo reportado del año. Normalmente esto aplica si después del cierre detectas que no se incluyeron provisiones de prestaciones sociales o se registraron en conceptos equivocados. El ajuste se hace referenciando la nómina de diciembre.

- **¿Qué hacer si me equivoqué con una nómina electrónica?**  
  Si el error es en un documento puntual (ejemplo: pagaste $2.000.000 y reportaste $200.000), se hace un **ajuste sobre esa nómina específica** corrigiendo el valor y enviando toda la nómina nuevamente. No debes borrar el documento; el sistema no permite eliminar reportes enviados.

- **¿Cómo corregir un reporte ya enviado a la DIAN?**  
  Usa la opción de **Ajuste de NE**, selecciona el documento original y haz la corrección necesaria. Esto aplica tanto para errores de valores como de clasificación de conceptos (ejemplo: marcaste un auxilio como salarial cuando era no salarial).

- **¿Qué hacer si no se reflejan correctamente cesantías, vacaciones o primas en NE?**  
  Generalmente este error se debe a una configuración inadecuada del concepto de nómina en el sistema (ejemplo: el concepto de prima no estaba marcado como “prestación social”) o cuando no se ha parametrizado cómo se desean reportar las prestaciones sociales y vacaciones en la nómina electrónica. Ajusta la configuración del concepto, revisa la configuración en la empresa (revisa muy bien las implicaciones de hacer los cambios ya que tiene implicacioones importantes sobre cómo se visualiza la información en la DIAN) y luego realiza el **ajuste de NE** para reportar correctamente esos valores a la DIAN.

**Recomendaciones y tips:**  
- ✅ Antes de enviar un ajuste, revisa los reportes preliminares para validar que todos los cambios estén correctos.  
- ⚠️ No elimines ni intentes reemplazar el reporte original; la DIAN exige que se haga mediante un **ajuste vinculado**.  
- 📌 Conserva el acuse de recibo tanto del reporte original como del ajuste para efectos de auditoría.  
- 💡 Si los ajustes son frecuentes, revisa tus procesos de registro de novedades y pagos para reducir errores en la nómina inicial. 
- ⚠️ Para equivocaciones en los valores enviados se debe utilizar el reporte de ajuste de nómina electrónica. Un reporte de anulación se utiliza principalmente cuando realizas por equivocación el envío de una nómina electrónica de un empleado que ya no labora en la empresa.

#### 📌 Recursos adicionales  
- [Video: Ajustes de nómina electrónica en ContaPyme](https://www.youtube.com/watch?v=mrfGfcIPcFc)  

---

### ¿Cómo descargar un reporte RNE en Excel?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo puedo validar la información del RNE antes de enviarlo?  
- ¿Cómo conciliar lo reportado a la DIAN con la nómina liquidada en ContaPyme?  
- ¿Cómo revisar qué empleados se incluyeron en el RNE?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el **Reporte de Nómina Electrónica (RNE)** se puede descargar a formato Excel para validar, revisar y controlar la información enviada a la DIAN. Esto es especialmente útil para comparar valores con la nómina liquidada y detectar inconsistencias antes o después del envío.  

**Pasos para descargar el RNE en Excel:**  

**1.** Ingresa al **Manejador de Operaciones**   
**2.** Filtra por tipo de documento o por la operación **“Reporte de nómina electrónica (RNE)”**.  
**3.** Filtra por rango de fechas, empleados, operación de reporte de nómina electrónica invidivual o en planilla para encontrar la información fácilmente.
**4.** Cuando utilizas la operación de reporte individual, podrás copiar la información seleccionando los renglones de la operación y usando la opción "copiar" de la operación o con el atajo del teclado (Ctrl + C). 

Si estás usando la operación de reporte en planilla, podrás utilizar el botón "copiar al portapapeles" de la operación o también podrás seleccionar la información y usar el atajo del teclado. 

Finalmente traslada la información a excel con la opción "pegar".

**5.** Guarda el archivo en tu equipo y ábrelo para revisar el detalle.  

**¿Qué información incluye el RNE en Excel?**   
- Conceptos devengados y deducciones (clasificados según la normativa DIAN).  
- Totales por empleado y por planilla.  
- Recuerda que los costos de empresa no se reportan en la nómina electrónica. Únicamente se verán reflejados los devengos y las deducciones. Si requieres ver los costos de empresa, podrás verlos en la planilla de pago de nómina, en un explorador de conceptos de nómina o en un informe de detalle de pagos.
  
**Recomendaciones:**  
- ✅ Descarga el reporte **antes del envío** para validar que los conceptos están clasificados correctamente.  
- ✅ Usa el archivo para **conciliar** la información de la nómina contra lo que se reportará a la DIAN.  
- ⚠️ Si un valor en el Excel no coincide, revisa el **contrato del empleado**, la configuración del **concepto de nómina** y los conceptos incluidos en las novedades y pagos de nómina. 
- 💡 Guarda los reportes Excel como evidencia de auditoría y para soporte en caso de inconsistencias con la DIAN.  

#### 📌 Recursos adicionales  
- [Video: Reporte de nómina electrónica en ContaPyme](https://www.youtube.com/watch?v=tX6F_jzSlw4&t=399s)  

---

### ¿Cómo cargar correctamente los conceptos en el reporte de nómina electrónica?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no aparecen todos los conceptos en el reporte de nómina electrónica?  
- ¿Qué pasa si los valores en el RNE no coinciden con mi pago de nómina?  
- ¿Por qué no me salen algunos empleados en la planilla de NE?  
- ¿Qué hago si el reporte de NE carga vacío o incompleto?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el **Reporte de Nómina Electrónica (RNE)** —ya sea individual o en planilla— **carga automáticamente** la información previamente registrada en los **pagos de nómina**.  
Este reporte incluye únicamente los **devengos** y **deducciones**, ya que los **costos de empresa** (como aportes patronales) **no se reportan a la DIAN**.  

**Puntos clave a tener en cuenta:**  
- 📌 El campo **“Mes a reportar”** es fundamental.  
  - Este filtro determina la información que el sistema toma de cada empleado para construir el reporte.  
  - Si el mes no está bien indicado, la planilla puede cargarse incompleta o con datos errados.  

- ✅ Cuando todo está configurado correctamente, ContaPyme carga automáticamente conceptos como:  
  - **Devengos:** salario, horas extras, recargos, comisiones, bonificaciones salariales, primas, vacaciones, etc.  
  - **Deducciones:** salud, pensión, retenciones en la fuente, libranzas, etc.  

**Si la información no se carga como esperabas, revisa:**  
**1.** Que el **pago de nómina** del mes correspondiente esté correctamente registrado y contabilizado.  
**2.** Que los **conceptos de nómina** estén parametrizados con su **clasificación adecuada** (salarial / no salarial, deducción, devengo).  
**3.** Que el **contrato del empleado** tenga configurados:  
   - Salario, auxilio de transporte y demás devengos.  
   - Deducciones correspondiente.
   - Perfil de contrato adecuado (según periodicidad, etc)
**4.** Que no existan **errores en novedades** (incapacidades, licencias, vacaciones) que alteren el reporte.  
**5.** Que en la planilla hayas seleccionado el **mes correcto a reportar**.  

**Recomendaciones:**  
- ✅ Antes de enviar, revisa todos los conceptos de nómina que se cargan a todos los empleados, corroborando que todo está correcto.
- ⚠️ No intentes ajustar manualmente los valores en el reporte ya que no será posible, siempre debes corregir los pagos de nómina y recalcular los reportes de nómina electrónica para recargar nuevamente los conceptos.
- 💡 Si cambiaste datos (contratos, conceptos, pagos), recuerda **liquidar nuevamente y generar** el reporte de nómina para que se actualicen todos los cambios realizados.

#### 📌 Recursos adicionales  
- [Video: Reporte de nómina electrónica en planilla](https://www.youtube.com/watch?v=tX6F_jzSlw4&t=399s)  
- [Video: Reporte de nómina electrónica individual](https://www.youtube.com/watch?v=YkB6pLa6IpU) 

---

### ¿Cómo reportar las cesantías e intereses en la NE correctamente?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no aparecen las cesantías en el reporte de nómina electrónica?  
- ¿Cómo hacer que los intereses de cesantías se reporten en la DIAN?  
- Cómo reportar en la nómina electrónica las cesantías e intereses de cesantías.
- Necesito reportar cesantías consignadas al fondo

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, las **cesantías** y sus **intereses** se reportan a la DIAN dentro del **Reporte de Nómina Electrónica (NE)** como conceptos de **prestaciones sociales**. El sistema los toma automáticamente siempre que estén **correctamente configurados** en los conceptos de nómina y asociados a los pagos de nómina de los empleados.  

**Claves para que se reporten correctamente:**  

- ✅ Los conceptos de **cesantías** e **intereses de cesantías** deben existir en el catálogo de conceptos de nómina con su respectiva periodicidad de pago y manejo contable.

- ✅ Estos conceptos deben tener asignado el **concepto base correcto** para que se reporten exitosamente a la DIAN, por ejemplo:

     -**Cesantías consignadas al fondo:** Se utiliza para reportar a la DIAN la consignación anual de las cesantías del empleado.
     -**Cesantías pagadas al trabajador** Se utiliza cuando se realiza una liquidación de contrato **antes** de consignar las cesantías al fondo, lo que requiere que se paguen directamente al empleado.
     -**Cesantías pagadas al trabajador acumuladas a la fecha** Se utiliza cuando se realiza una liquidación de contrato en los meses de diciembre, enero o febrero y las cesantías no han sido consignadas al fondo. Este concepto acumulará el valor del año anterior más lo acumulado del año vigente.

     -**Intereses de cesantías común:** Se utiliza para reportar a la DIAN el pago anual de los intereses sobre cesantías del empleado.
     -**Intereses de cesantías anticipadas** Se utiliza cuando se realiza una liquidación de contrato **antes** de pagar los intereses de cesantías al empleado.
     -**Intereses de cesantías acumuladas a la fecha** Se utiliza cuando se realiza una liquidación de contrato en los meses de diciembre o enero y los intereses no han sido pagados al empleado. Este concepto acumulará el valor del año anterior más lo acumulado del año vigente.


- ✅ En los **perfiles de contrato** deben estar asociados como prestaciones sociales, para facilitar la creación de los contratos de trabajo de los empleados.

- ✅ Los contratos de los empleados deben tener el perfil de contrato asignado para que, al liquidar, el sistema calcule automáticamente.  
- 📌 Por defecto, en ContaPyme:  
  - **Cesantías** ➡ configuradas para liquidarse en **diciembre**.  
  - **Intereses de cesantías** ➡ configurados para liquidarse en **diciembre**.  
  
  Si la empresa paga en otra fecha (ejemplo: cesantías en febrero), se debe ajustar la **periodicidad del concepto** en:  
  ` Nómina > Catálogo de Conceptos de nómina > [Modificar concepto] > Pestaña pago recurrente`.  

- ✅ Una vez se tengan correctamente configurados los conceptos de nómina, estos serán cargados en los pagos de nómina y por consiguiente en los reportes de nómina electrónica.

**Errores comunes que causan problemas en el reporte de nómina electrónica (NE):**  
- ❌ Conceptos de cesantías o intereses creados pero con **el concepto base de nómina errado** o en la periodicidad que no corresponde para la empresa.
- ❌ Contratos de empleados sin las prestaciones sociales (no se cargan automáticamente en los pagos de nómina).  
- ❌ Reportar un mes equivocado en el campo **Mes a reportar** al generar el RNE.  

**Recomendaciones:**  
- ✅ Siempre revisa que los **pagos de nómina** incluya las prestaciones que pagarás antes de generar el reporte de Nómina Electrónica (NE).  
- ✅ Verifica que los valores del reporte electrónico coincidan con lo liquidado en nómina.  

#### 📌 Recursos adicionales  
- [Video: Pago de cesantías](https://www.youtube.com/watch?v=JB0-WadYRh4)  
- [Video: Pago de intereses de cesantías](https://www.youtube.com/watch?v=Do5Qwz-6Nts)
- [Video: Diferencia entre conceptos de cesantías](https://www.youtube.com/watch?v=phzY1ZiBqD0)

---

### ¿Cómo reportar ante la DIAN las cesantías e intereses de cesantías en diciembre, aunque se paguen en enero o febrero?

Dado que no puedes reportar dos veces (diciembre y luego enero/febrero), ContaPyme permite ajustar la **periodicidad del concepto** para que las cesantías e intereses **se liquiden** y se reporten a la DIAN en el mes que escogiste para el reporte electrónico.

Pasos:

1. **Revisa la periodicidad del concepto**  
   Ruta: **Catálogo → Conceptos de Nómina → Selecciona el concepto → Pestaña “Periodicidad del pago”**.

2. **Ajusta la periodicidad**  
   - Los conceptos de **cesantías** e **intereses de cesantías** vienen configurados por defecto para calcularse en **diciembre**.  
   - Solo los usuarios que quieran pagarlas en enero (fecha máxima para pagar los intereses) o febrero (fecha máxima para pagar las cesantías) deben cambiar esa periodicidad.
   - También se puede cambiar la periodicidad de estos conceptos para que se paguen, liquiden y reporten en enero si se desea. Sólo bastará con ajustar la periodicidad.

3. **Calcula la nómina de diciembre**  
   - El sistema incluirá cesantías e intereses en diciembre, dejándolos listos para ser **reportados a la DIAN** bajo el esquema de “lo pagado” en ese mismo mes.  

⚠️ **No puedes reportar cesantías en diciembre y volver a hacerlo en enero o febrero.** Sólo se debe reportar una sola vez en la nómina electrónica.

#### 📌 Recursos adicionales
- [Video: Creación y configuración de conceptos de nómina](https://www.youtube.com/watch?v=kdZahQfWK3A&t=444s)  

**También aplica si preguntan**
- Cómo evitar errores en la DIAN cuando las cesantías se pagan en febrero.
- Cómo cambiar la periodicidad de las cesantías e intereses para enero o febrero
- Quiero cambiar las fechas de las cesantías
- Quiero cambiar las fechas para los intereses de cesantías

---

### ¿Qué hacer si no permite emitir la nómina electrónica?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué hago si no se envía la nómina electrónica?  
- ¿Por qué rechaza la DIAN el reporte de nómina?  
- ¿Cómo corregir errores de configuración en conceptos de nómina electrónica?  
- ¿Qué significa un rechazo por dirección inválida?  
- Al enviar la nómina sale un mensaje indicando que no se puede enviar por falta de autorización

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si al intentar enviar la nómina electrónica a la DIAN el sistema no lo permite o recibes un error, generalmente está relacionado con **problemas de configuración en el sistema o validaciones de la DIAN**.  

Esto puede deberse a:  
⚠️ **Proceso de nómina electrónica no habilitado en ContaPyme:** la empresa no tiene activo el manejo de nómina electrónica dentro del sistema o no se encuentra habilitado, lo que impide el envío.
⚠️ **Sin saldo disponible para el envío:** la empresa no cuenta con saldo suficiente para generar la transmisión del reporte. Si no cuentas con saldo disponible en tu paquete de documentos electrónicos podrás tener inconvenientes al tratar de enviar reportes de nómina.
- ❌ **Errores en la configuración de empleados**: falta de tipo de documento, número de documento incompleto, caracteres inválidos en el NIT, entre otros.  
- ❌ **Conceptos de nómina mal empleados en los pagos**: Verifica que no estés enviando valores negativos ni usando conceptos configurados en unidad “días” con valores decimales. Por ejemplo, registrar 1.5 días de vacaciones no es válido según el anexo técnico DIAN.
- ❌  **Errores en direcciones**: uso de caracteres especiales en ocasiones son rechazados por la DIAN.
- ❌ **Errores en porcentajes**: conceptos con valores que no cumplen las validaciones (ejemplo: aportes a salud diferentes al 4% u horas extras con un porcentaje diferente al permitido en el anexo técnico).  
- 📡 **Intermitencias de la DIAN**: el sistema de recepción puede estar caído; en ese caso se recomienda **reintentar después de algunos minutos**.  
- 📡 **Intermitencias del proveedor tecnológico**: ocasionalmente puede haber retrasos en la comunicación con la DIAN.  

**Pasos para resolverlo:**  
1. Verifica los datos del empleado en el catálogo de terceros: tipo de documento, número, dirección y demás datos básicos.
2. Revisa la configuración de conceptos de nómina en el catálogo de conceptos:
Asegúrate de que los porcentajes y clasificaciones estén alineados con el anexo técnico DIAN.
3. Si el error hace referencia a un campo específico (ejemplo: dirección o nombre), corrige el dato y vuelve a generar el reporte.
4. Valida la habilitación del proceso de nómina electrónica en el sistema.
5. Confirma que la empresa tenga saldo disponible para realizar el envío.
6. Si todo está correcto y el error persiste, espera y reintenta: puede tratarse de una intermitencia de la DIAN o del proveedor.
7. Si el problema continúa, abre un tiquete en el portal de clientes para soporte especializado. 

💡 **Recomendaciones:**  
- ✅ Antes de enviar, genera la **previsualización del RNE** para validar los datos.  
- ✅ Ten actualizada la **clasificación tributaria de la empresa y de los terceros**.  
- ✅ Valida que la empresa esté correctamente habilitada y con saldo en el paquete de documentos electrónicos.
- ❌ Evita caracteres especiales en nombres, direcciones o conceptos.   
- ⚠️ Si la DIAN o el proveedor tienen intermitencias, no intentes modificar nada en la empresa: solo espera y reintenta más tarde.  

---

## CONFIGURACION

### ¿Cómo modificar o anular una novedad ya contabilizada?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo eliminar una novedad que ya está en el pago de nómina?  
- ¿Por qué no me deja modificar una novedad de nómina?  
- ¿Cómo corregir una novedad mal registrada después de contabilizar?  
- ¿Qué hacer si necesito quitar una novedad que se volvió a liquidar automáticamente?  
- ¿Cómo evitar que una novedad vuelva a aparecer en las próximas nóminas?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, las novedades de nómina pueden **anularse o modificarse**, pero el procedimiento dependerá de si la novedad **ya fue contabilizada o no**, y si está **vinculada a un pago de nómina**.  
Esto es importante porque el sistema protege la trazabilidad y consistencia contable, evitando que se modifiquen valores que ya impactaron otras operaciones.  

**Casos y formas de hacerlo:**  

**1️⃣ Si la novedad ya fue contabilizada y se desea anular:**  
- Primero se debe **anular el pago de nómina** en el cual se utilizó la novedad.  
- Una vez anulado el pago, podrás **anular la operación de novedades** donde fue creada.  
- Si en esa misma operación hay novedades de **otros empleados** que ya tienen sus pagos procesados, el sistema no permitirá anular todo el documento. En ese caso, deberás **anular solo el renglón correspondiente** al empleado afectado.  

💡 Para hacerlo:  
Haz clic en el **renglón de la novedad → botón “Eliminar renglón”**.  
El sistema mostrará una advertencia indicando si deseas **anular esa novedad específica**.  
Confirma, y la novedad quedará anulada sin afectar a los demás empleados incluidos en la operación.  


La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
![Ejemplo donde anulas una novedad de nómina](https://www.contapyme.com/conocimientocontapyme/045_NO/anulacion_novedades.png) 

**2️⃣ Si la novedad no ha sido contabilizada (ni se piensa contabilizar):**  (normalmente sucede con novedades registradas de años pasados pero que aún se siguen cargando en pagos de nómina actuales.)
- Ingresa a la operación **“Novedades de nómina”** desde el **Manejador de Operaciones**.  
- En el menú superior selecciona **Opciones → Habilitar paso de anulación de novedades**.  
- Desde allí podrás **anular la novedad** para que no se cargue en futuros pagos de nómina.  

⚠️ Esto es útil cuando se detectan errores en valores o conceptos antes de contabilizar la nómina.  

**3️⃣ Si se necesita modificar una novedad ya contabilizada:**  
El sistema **no permite modificar** una novedad que ya impactó un pago o fue contabilizada.  
Por tanto, el proceso correcto es:  
**a.** Anular el **pago de nómina** que contiene la novedad.  
**b.** Modificar la novedad en la operación correspondiente.  
**c.** Volver a recalcular y procesar el pago de nómina.  

📌 *Nota:* Si la novedad ya fue reportada a la DIAN (nómina electrónica), podría ser necesario **realizar un ajuste de nómina electrónica** para reflejar el cambio correctamente.  

**💡 Recomendaciones:**  
- ✅ Antes de anular, verifica si la novedad ya está vinculada a un pago o reporte.  
- ⚠️ No borres operaciones sin revisar su impacto contable. Anular preserva el consecutivo y deja trazabilidad para auditoría.  
- 📌 Usa la **anulación de renglón** cuando solo un empleado requiere corrección, sin afectar a los demás.  
- 💡 Mantén un registro de quién realiza anulaciones o modificaciones, para control interno.  
- ❌ Evita eliminar directamente operaciones desde la base de datos; siempre hazlo desde el sistema.  

---

### ¿Cómo configurar en el sistema el envío a la DIAN de las provisiones mes a mes?

Para que ContaPyme reporte a la DIAN las **provisiones mensuales** de prestaciones sociales y vacaciones, es necesario definir la forma en que el sistema enviará esta información: **por pago** o **por abono en cuenta (provisión)**.  
La DIAN permite ambas modalidades, pero la empresa debe escoger **una sola** por año fiscal. ContaPyme incluye una configuración específica para esto.

👉 Pasos para configurar el envío mensual de provisiones a la DIAN

1. **Accede a la configuración de la empresa**  
   Ruta: **Explorador Gráfico → Modificar Empresa → Nómina → Reporte DIAN**.

2. **Selecciona la forma de reporte a la DIAN**  
   Encontrarás dos opciones:  
   - **Reportar al abonar en cuenta (provisión)**  
   - **Reportar al pagar al empleado o a la entidad**  
   👉 Para que la DIAN reciba las provisiones mes a mes, activa **“Abono en cuenta (provisión)”**.

3. **Guarda la configuración**  
   ⚠️ Esta selección solo se puede cambiar una vez al año.  
   Después de guardarla, queda fija hasta el próximo periodo fiscal.

4. **Confirma que los conceptos estén habilitados para liquidarse mensualmente**  
   - Revisa en el menú: **Catálogo → Conceptos de Nómina**.  
   - Verifica que los conceptos de prestaciones tengan definida su periodicidad correcta.  
   💡 Si la empresa provisiona cada mes, estos conceptos deben estar marcados para liquidación mensual (o en cada pago)

5. **Procesa las nóminas de forma habitual**  
   Con esta configuración activa, ContaPyme enviará en el **Documento Soporte de Nómina Electrónica** los valores **provisionados** durante cada mes, no los pagados.

**Recomendaciones**

- ⚠️ Antes de activar el reporte por provisión, confirma que **todas las nóminas del año anterior** ya fueron enviadas a la DIAN.  
- 👉 No cambies el método a mitad del año: puede generar duplicados (provisión + pago).  
- 💡 Haz una copia de seguridad antes de modificar la configuración DIAN.  
- ⚠️ Si tienes dudas sobre la política fiscal adecuada, consulta al revisor fiscal: la DIAN exige coherencia entre la política contable y el método de reporte.

#### 📌 Recursos adicionales

- [Video: Cumplimiento normativo y responsabilidad del contribuyente](https://www.youtube.com/watch?v=zV0VUn02m68)  
- [Video: ¿Pago o abono en cuenta? Consideraciones](https://www.youtube.com/watch?v=TukI8TPVtms)  
- [Video: Reporte de nómina de los abonos en cuenta de prestaciones sociales y vacaciones](https://www.youtube.com/watch?v=KQ6QyPcq6Vg)  
- [Video: Reporte de nómina de los pagos de prestaciones sociales y vacaciones](https://www.youtube.com/watch?v=06QIgzZtvxo) 
- [+Info: Reporte de prestaciones sociales y vacaciones](en ContaPyme, dirígete al explorador gráfico de la empresa > modifcar empresa > Nómina > Reporte DIAN > Haz clic derecho sobre las opciones disponibles para conocer +Información)

#### Variantes de la pregunta (aplicación canónica):

- Cómo hacer que la DIAN reciba las prestaciones mes a mes.  
- Cómo reportar las cesantías e intereses bajo abono en cuenta.  
- Cómo configurar el reporte de provisiones en Nómina Electrónica.  
- Cómo evitar que la DIAN reciba valores duplicados de prestaciones. 
- Necesito enviar el acumulado de las prestaciones sociales en diciembre. 

---

### ¿Cómo parametrizar las cesantías e intereses de cesantías de un empleado?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué conceptos hacen parte de la base para calcular cesantías?  
- ¿Por qué a un empleado no le calcula intereses de cesantías?  
- ¿Cómo cambiar la fecha de pago de las cesantías o intereses?  
- ¿Por qué aparecen valores diferentes en las cesantías de empleados con salario variable?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, las cesantías y sus intereses se calculan de forma **automática**, siempre que estén bien configurados los conceptos en el contrato del empleado.  
Estas prestaciones hacen parte de los derechos laborales que por ley deben reconocerse, y el sistema las liquida en función del **salario base** y del **tiempo efectivamente laborado**.  

**Conceptos que hacen base para el cálculo:**  
- ✅ **Salario básico** configurado en el contrato.  
- ✅ **Conceptos salariales variables** como horas extra, recargos, comisiones (cuando el salario es variable, estos promedian).  
- ✅ **Auxilio de transporte**, constituye base para las cesantías e intereses si en el valor base del semestre, el empleado no supera dos salarios mínimos. Esto garantiza su correcta liquidación. 
- ❌ **Conceptos no salariales** (viáticos no constitutivos, auxilios no salariales, bonificaciones no salariales) no hacen parte de la base.  

📌 ContaPyme ya tiene en cuenta automáticamente estos conceptos para calcular las cesantías e intereses. **No es necesario hacer procesos manuales adicionales**: basta con garantizar que los conceptos estén bien configurados.  

**Pasos para parametrizar las cesantías e intereses:**  

**1.** Revisa en el catálogo de conceptos de nómina:  
- Que estén definidos como **prestación social**.  
- Que tengan la **forma de cálculo automática**.  
- Que afecten la **contabilización correcta** 

**Periodicidad del pago en ContaPyme:**  
Por defecto, los conceptos de **cesantías** e **intereses de cesantías** están configurados para liquidarse en **diciembre**.  
Si la empresa desea pagar en fechas diferentes (ejemplo: **cesantías en febrero** e **intereses en enero**), es necesario modificar la **periodicidad del concepto**:

👉 **Ruta:**  
**Cinta de opciones > Nómina > Catálogo de conceptos de nómina > Seleccionar el concepto (cesantías o intereses) > Pestaña pago recurrente**  

Allí se puede ajustar la fecha de liquidación según la política de la empresa. 

**2.** Después de confirmar que los conceptos están creados, valida que estén incluidos en los **perfiles de contrato** y, a su vez, en los **contratos de los empleados** que correspondan.  

En la pestaña de **Prestaciones sociales**, de los conceptos de nómina del contrato y del perfil, valida que estén asignados los conceptos de:  
- **Cesantías consignadas al fondo**  
- **Intereses de cesantías**  

**3.** Guarda los cambios. El sistema calculará automáticamente estas prestaciones en la liquidación anual o en la liquidación de contrato.  
 
**4.** Ingresa al manejador de operaciones y procede a realizar los pagos de nómina.

Y listo! El sistema los calculará por ti.

**Recomendaciones:**  
- ✅ Asegúrate de que los conceptos de nómina estén en los **perfiles de contrato** y asignados en los contratos de cada empleado.  
- ✅ Clasifica los conceptos correctamente como **salariales** o **no salariales** para que la base sea correcta.  
- 📌 Revisa la **periodicidad del concepto** de acuerdo a la política de pagos de tu empresa.
- ⚠️ Recuerda que los empleados con **salario integral** no generan cesantías, prima, ni intereses.  
- 💡 Usa el **explorador de conceptos de nómina** para verificar qué conceptos pueden afectar el acumulado de cesantías e intereses antes de contabilizar o pagar. (Por ejemplo: si el empleado tuvo ausencias injustificadas, comisiones, licencias, etc.)
- El reporte de nómina electrónica carga de forma automática la información del pago de nómina generado para cada empleado. Por lo tanto, si algún concepto no aparece en el reporte, es importante revisar primero el pago de nómina, y de ser necesario corregirlo y recargar el reporte nuevamente para garantizar el envío adecuado de la información..


#### 📌 Recursos adicionales  
- [Video: Configuraciones iniciales del módulo](https://www.youtube.com/watch?v=kdZahQfWK3A)  
- [Video: Pago de cesantías](https://link-mas-info)  
- [Video: Pago de intereses de cesantías](https://www.youtube.com/watch?v=Do5Qwz-6Nts)  

---

### ¿Qué hacer si las cesantías aparecen duplicadas?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué me salen las cesantías dos veces en la liquidación de contrato?  
- ¿Cómo evitar duplicados en prestaciones sociales?  
- ¿Qué pasa si configuré cesantías en perfil y también en contrato?  
- ¿Cómo corregir el acumulado de cesantías en un pago?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si en **ContaPyme** las cesantías aparecen duplicadas en una liquidación de contrato o pago de nómina, normalmente se debe a una **configuración duplicada** de los conceptos o a que se está cargando más de una vez el mismo concepto por alguno de los siguientes motivos:  

- ⚠️ El contrato del empleado tiene asignados **dos conceptos de cesantías** en lugar de uno.  
- ⚠️ Se crearon conceptos adicionales de cesantías en el catálogo y ambos están activos en el contrato. 
- ⚠️ Se creó una novedad de nómina para cargar el concepto de cesantías en el pago o liquidación. Sin embargo, este paso no es necesario ya que ContaPyme los carga de forma automática cuando aplica. 

**Pasos para revisar y corregir:**  
**1.** Ingresa al contrato del empleado en el catálogo de terceros.
**2.** En la pestaña de **Prestaciones sociales**, verifica que solo exista **un concepto de cesantías** activo.  
**3.** Valida que en el **perfil de contrato** también haya un único concepto de cesantías configurado.  
**4.** Revisa en el **catálogo de conceptos de nómina** que no existan conceptos duplicados para cesantías (con diferente código pero mismo fin).  
**5.** Si se requiere pagar en una fecha distinta a diciembre, asegúrate de modificar únicamente la **periodicidad del concepto existente**, no de crear uno nuevo.   
**6.** Si se realizó una novedad de nómina realiza la corrección, elimina el registro o anúlalo.

**Recomendaciones:**  
- ✅ Evita crear conceptos de nómina adicionales para prestaciones que ya existen en el sistema.  
- ✅ Administra siempre las prestaciones sociales desde los **conceptos por defecto** de ContaPyme.  
- 📌 Usa el **perfil de contrato** como base, y evita asignar manualmente los mismos conceptos otra vez en cada contrato.   
- ✅ Recuerda que ContaPyme calcula las prestaciones sociales por ti y no es necesario registrar novedades de nómina adicionales.

--- 

### ¿Por qué no se calculan correctamente las cesantías y los intereses de cesantías?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué un empleado no acumula cesantías en la liquidación?  
- ¿Qué hacer si los intereses de cesantías no aparecen?  
- ¿Cómo corregir que las cesantías salgan con valor cero?  
- ¿Por qué el cálculo de intereses no coincide con el 12% anual proporcional?  
- ¿Cómo liquidar correctamente solo las cesantías del año en curso? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, las cesantías y los intereses se calculan automáticamente siempre que estén bien configurados los **conceptos de nómina y contratos** y según las novedades del período. 
Si el valor no coincide con lo esperado, casi siempre se debe a un problema de **configuración** o de **información previamente registrada en la nómina**.  

**Posibles causas y cómo solucionarlas:**  

1. **El contrato está mal configurado**  
   - ❌ El empleado aparece con tipo de salario integral (estos contratos no generan cesantías ni intereses).  
   - ✅ Solución: Revisa el **tipo de salario** y corrige si debía ser fijo o variable.  

2. **Los conceptos no están asignados al contrato**  
   - ❌ Los conceptos de **cesantías** e **intereses de cesantías** no se incluyeron en el perfil o en el contrato del empleado.  
   - ✅ Solución: Verifica **el contrato** y confirma que estén activos.  

3. **Forma de cálculo incorrecta**  
   - ❌ El concepto no está parametrizado como **prestación social** o tiene una forma de cálculo manual.  
   - ✅ Solución: Ingresa al **Catálogo de conceptos de nómina** y revisa que tengan **cálculo automático** y el concepto base adecuado.

4. **Base salarial mal definida o calculada**  
   - ❌ El salario o los promedios de variables (comisiones, horas extra) no están registrados correctamente o estás omitiendo conceptos que sí deben hacer base para el cálculo de las prestaciones sociales. 
   - ✅ Solución: Verifica que el contrato tenga el **salario correcto** y que los conceptos variables estén marcados como **salariales**.  Además, revisa todas las novedades que ocurrieron en el periodo para garantizar que se están incluyendo cada uno de ellos en el cálculo que estás realizando.

5. **Periodicidad no corresponde**  
   - ❌ El concepto está configurado para liquidarse en diciembre, pero deseas calcular en febrero (cesantías) o en enero (intereses).  
   - ✅ Solución: Ingresa a **Catálogo de conceptos → modifica el concepto en la pestaña de periodicidad** y ajusta la **fecha** en la que deseas realizar el pago de la prestación, ya que ContaPyme por defecto sugiere el mes de diciembre como fecha de pago de todas las prestaciones sociales.  

**Recomendaciones:**  
- ✅ Asegúrate de que los conceptos estén **creados, activos y asignados** en el contrato del empleado.  
- 📌 Verifica siempre en la **preliquidación de prestaciones sociales** para confirmar acumulados antes de liquidar.  
- ⚠️ Te recomendamos utilizar los conceptos que ya trae el sistema por defecto.  
- 💡 Recuerda: la base de cálculo son los **salarios y conceptos salariales devengados**, no incluyen conceptos no salariales.  

---

### ¿Qué es un perfil de contrato y cómo se configura?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo asignar prestaciones sociales y aportes a un contrato automáticamente?  
- ¿Por qué algunos conceptos no se cargan en el contrato del empleado?  
- ¿Cómo estandarizar la configuración de contratos en la empresa?  
- ¿Cómo configurar la intensidad horaria, días laborales y días hábiles de vacaciones en la nómina?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, un **perfil de contrato** es el que define **qué conceptos de nómina se aplican automáticamente** a los contratos de los empleados.  
Su objetivo es estandarizar configuraciones, evitar errores manuales y ahorrar tiempo, especialmente cuando se manejan muchos empleados con condiciones similares.  

Además, el perfil permite establecer la jornada laboral y la intensidad horaria específica para los empleados vinculados.

Esta configuración es fundamental, ya que determina los días hábiles que el sistema descontará para el cálculo del libro de vacaciones. Asimismo, la intensidad horaria es el parámetro base para liquidar correctamente el valor de las horas extra y los recargos. Una configuración precisa en este punto garantiza la exactitud de los cálculos legales y prestacionales.

Por ejemplo, en un perfil de contrato puedes definir que a todos los empleados se les apliquen:  
- Salario básico.  
- Auxilio de transporte.  
- Prestaciones sociales (cesantías, intereses, prima, vacaciones).  
- Aportes a seguridad social (salud, pensión, ARL, caja de compensación).  
- Retenciones o deducciones fijas.  
- Horario laboral e intensidad horaria
- Tipo de salario (fijo, variable o integral)
- Tipo de contratación (término fijo, indefinido, obra, aprendizaje)

Así, cada vez que creas un contrato y le asignas un perfil, el sistema **carga automáticamente** todos esos conceptos sin necesidad de hacerlo manualmente, lo cual ahorra significativamente el tiempo de configuración de un contrato de un empleado. 

**Pasos para configurar un perfil de contrato:**  
**1.** Ingresa a la pestaña Nómina  > Perfiles de contrato**.  
**2.** Verifica los perfiles existentes y modifica los perfiles que utilizarás (ejemplo: *Contrato indefinido de pago mensual*).  

💡 ContaPyme por defecto tiene configurado diversos perfiles de contrato que ya están listos para usar, lo más importante es que revises cuáles son los que utilizarás para tu empresa y realices los ajustes pertinentes, si aplica. También tendrás la opción de crear un nuevo perfil con todas las condiciones que desees personalizar.

**3.** Define los conceptos que deben incluirse en el perfil:  
- **Devengos:** salario, auxilio de transporte, etc.  
- **Prestaciones sociales:** cesantías, intereses, prima, vacaciones.  
- **Deducciones:** Salud, pensión, fondo de solidaridad y de subsistencia, retención en la fuente, entre otros. 
- **Costos de empresa:** salud, pensión, ARL, caja, provisiones, etc.  
**4.** Guarda el perfil.  
**5.** Al crear o modificar un contrato, selecciona el perfil para que el sistema cargue automáticamente esos conceptos y demás configuraciones que se manejan por defecto. 

**Recomendaciones:**  
- ✅ Define diferentes perfiles según el **tipo de trabajador**: empleados dependientes, tiempo parcial, salario integral, aprendices, etc.  
- ✅ Usa nombres claros y estandarizados para los perfiles.
- 📌 Revisa periódicamente los perfiles para asegurarte de que están actualizados con cambios de ley. Ejemplo: cambios en las condiciones de los aprendices SENA.
- ⚠️ Siempre debearás asignar un perfil de contrato al crear un nuevo contrato, por lo tanto, es indispensable que se encuentren correctamente configurados.
- 💡 Puedes modificar los contratos individuales después de asignar un perfil, pero lo ideal es que los perfiles cubran la mayoría de casos para evitar inconsistencias.  
- ⚠️ Ten presente que el cálculo de los conceptos de nómina como recargos, horas extras, entre otros, dependerán directamente de la configuración del perfil de contrato, su intensidad horaria, días laborales, etc.

#### 📌 Recursos adicionales  
- [Video: Perfiles de contrato](https://www.youtube.com/watch?v=kdZahQfWK3A) 
- [Video: Creación y modificación de contratos](https://www.youtube.com/watch?v=yTJdtTL586o) 

---

### ¿Cómo configurar un nuevo empleado?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Dónde creo un contrato de trabajo en ContaPyme?  
- ¿Cómo ingresar correctamente un nuevo empleado?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, cada empleado se registra como un **tercero** en el sistema y se le asocia un **contrato**, que contiene toda la información laboral y salarial necesaria para el cálculo de la nómina.  

Configurar correctamente a un empleado es indispensable para que sus devengos, deducciones, aportes y prestaciones sociales se liquiden de forma automática y precisa.  

**A continuación te detallaremos los pasos para configurar un nuevo empleado:**  
**1.** Ingresa al menú **Catálogo de terceros > Empleados**.  
**2.** Haz clic en **Nuevo empleado** y registra la información básica:  
- Nombre completo, tipo y número de documento.  
- Dirección, correo electrónico y teléfono.  
- Datos de contacto y demás información personal relevante.  
**3.** En la pestaña de **Entidades**, registra la afiliación del empleado a:  
- EPS  
- Fondo de pensiones  
- ARL  
- Caja de compensación familiar  
- Fondo de cesantías  
**4.** Configura la **cuenta bancaria** del empleado para configurar la herramienta de pago por bancos para transferir automáticamente el dinero a la cuenta bancaria del empleado. 

⚠️ Ten en cuenta que esta opción sólo estará disponible si cuentas con el módulo de cartera y proveedores.

**5.** Crea un **contrato laboral**:  
- Ingresa al manejador de operaciones. Dirígete a la sección "Nómina" y selecciona la operación de creación de contrato de trabajo y define los datos básicos para el empleado.
- Define el **tipo de contrato** (fijo, indefinido, obra o labor, etc.).  
- Selecciona el **tipo de salario** (fijo, variable o integral).  
- Configura la **fecha de ingreso** y demás condiciones.  

**6.** Asigna los **conceptos de nómina** al contrato (salario, auxilio de transporte, prestaciones sociales, seguridad social, etc.).  
**7.** Guarda y valida la información. El empleado ya estará listo para ser incluido en la liquidación de nómina.  

**Recomendaciones:**  
- ✅ Asegúrate de asignar el **perfil de contrato** adecuado para que se carguen automáticamente los conceptos de nómina.  
- 📌 Configura correctamente la información básica al crear el empleado para garantizar que se envíen de forma adecuada en el reporte de nómina electrónica.
- ⚠️ Si omites registrar entidades (EPS, pensión, ARL, etc.), el sistema no podrá generar correctamente la planilla PILA.  

#### 📌 Recursos adicionales  
- [Video: Configuración del empleado en ContaPyme](https://www.youtube.com/watch?v=odih11uAX-w&t=283s)  
- [Video: Creación de contratos en ContaPyme](https://www.youtube.com/watch?v=yTJdtTL586o&embeds_referring_euri=https%3A%2F%2Fwww.contapyme.com%2F&source_ve_path=MzY4NDIsMjg2NjY)  

---

### ¿Cómo configurar el módulo de nómina?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo configurar la nómina en ContaPyme?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El **módulo de nómina** en **ContaPyme** se basa en la correcta configuración inicial.  Si los pasos se hacen bien, el sistema calculará automáticamente **salarios, prestaciones sociales, aportes, deducciones, provisiones e informes**, sin necesidad de procesos manuales.  

La configuración se hace siguiendo una ruta lógica:  
**Empresa → Proveedores → Entidades → Conceptos de nómina → Perfiles de contrato → Empleados → Contratos**  

**1. Configuración de la Empresa**  
- Ingresa a la pestaña Básico > **Explorador gráfico de Empresa**.  
- Registra la información general de la compañía: razón social, NIT, dirección, teléfono, correo electrónico.  
- Activa el manejo de nómina electrónica en la pestaña "servicios electrónicos" para garantizar el funcionamiento y el envío de los reportes de nómina electrónica a la DIAN.
- Configura la **clasificación tributaria** de la empresa, pues impactará en retenciones e impuestos.  
- Configura la actividad económica, centros de trabajo y nivel de riesgo para cada uno de estos.
- En la sección "Nómina", revisa las entidades a las cuales está afiliada la empresa, indica si se encuentra exonerada de aportes a salud, Sena e ICBF y por último indica el tipo de aportante. 

**2. Proveedores**  
- Ingresa a **Catálogo de terceros → Proveedores**.  
- Registra los proveedores de seguridad social y parafiscales: EPS, fondos de pensión, ARL, cajas de compensación, fondos de cesantías.  
- Esto permitirá que al pagar nómina se generen automáticamente las cuentas por pagar a cada proveedor.
- Verifica el **código PILA** asignado a cada uno de ellos en la pestaña "Datos proveedor > entidades de nómina" y valida que sea el correcto.  

**3. Entidades de Nómina**  
- Ingresa a **Catálogo de terceros → Entidades de nómina**.  
- Verifica las entidades por defecto que manejará la empresa en las entidades de nómina, por ejemplo: EPS, pensión, ARL, caja, cesantías, SENA, ICBF.  
- Asigna el **proveedor correspondiente** a cada entidad.  

💡 Puedes asignar si deseas que este dato de entidad se solicite en el empleado o en la empresa. 
    Cuando indicas que este dato se solicite en la empresa, significa que **todos** los empleados están asignados a la misma entidad, de lo contrario, si indicas que se solicite el dato en el empleado, podrás personalizarlo para cada uno de ellos)

📌 Ejemplo: 
    
    ✅ Entidad EPS → Proveedor Sura EPS como entidad por defecto. 
      [Solicitar dato en el empleado] Significa que en cada uno de los empleados se podrá indicar la EPS. A pesar de que el sistema sugerirá por defecto a SURA como EPS, podrás modificarlo en caso de que el empleado se encuentre afiliado a una entidad diferente.
    
    ✅ Entidad ARL → Proveedor Colmena ARL como entidad por defecto. 
       [Solicitar dato en la empresa] Significa que no se preguntará esta entidad en los empleados, ya que todos están asignados en la misma entidad y por lo tanto, se configura directamente en la empresa.

**4. Conceptos de Nómina**  
- Ingresa a **Catálogo de conceptos de nómina**.  
- Configura cada concepto con su forma de cálculo, clasificación y cuentas contables:  
  - **Devengos:** salario, auxilio de transporte, comisiones, horas extra.  
  - **Prestaciones sociales:** cesantías, intereses, prima, vacaciones.  
  - **Deducciones:** salud, pensión, retenciones, préstamos, embargos.  
  - **Provisiones:** provisión de prestaciones sociales, provisión de vacaciones.  
- Asigna la **periodicidad** (mensual, quincenal, anual).  
📌 Ejemplo: Cesantías → periodicidad anual - pago en febrero (o diciembre si se paga antes).  

**5. Perfiles de Contrato**  
- Ingresa a la pestaña Nómina > **Catálogo de Perfiles de contrato**.  
- Crea perfiles prestablecidos con las configuraciones base que podrás usar al momento de crear el contrato del empleado según su tipo de contrato. 
- Define los días laborales e intensidad horaria (indicar si trabaja en festivos o media jornada).  

  - Ejemplo: *Empleado dependiente salario fijo*, *Aprendiz SENA lectiva*, *Salario Integral administrativo*.  
- Al asignar un perfil, el contrato se llena automáticamente con los conceptos de nómina y demás configuraciones definidas.

**6. Empleados**  
- Ingresa a **Catálogo de terceros → Empleados**.  
- Registra cada empleado con sus datos personales (nombre, documento, dirección, contacto).  
- Asigna las entidades de seguridad social y de cesantías (EPS, pensión, ARL, caja, cesantías). 

**7. Contratos**  
- Ingresa al manejador de operaciones, específicamente en la sección de operaciones de nómina y utiliza la operación **Creación de Contratos**.  
-Selecciona el empleado al cual le realizarás la creación del contrato.
- Define las condiciones laborales:  
  - Asigna un **perfil de contrato** para que se carguen automáticamente los conceptos de nómina.  
  - Tipo de contrato: fijo, indefinido, obra/labor, aprendizaje.  
  - Tipo de trabajador: dependiente, aprendiz, cotizante 51.  
  - Tipo de salario: fijo, variable o integral.  
  - Salario base y fecha de inicio (y fin si aplica).  
  - Indica algunas cláusulas y observaciones al contrato si aplica.

**Recomendaciones clave:**  
- ✅ Sigue el **orden sugerido de configuración** (empresa → proveedores → entidades → conceptos → perfiles → empleados → contratos) para evitar retrocesos. 
- ✅ Verifica que todos los conceptos tengan **cuentas contables asignadas**, de lo contrario, podrás tener inconvenientes en tus informes contables.
- ⚠️ No mezcles configuraciones: si un concepto ya está en el perfil, no lo agregues manualmente al contrato.   

#### 📌 Recursos adicionales  
- [Video: ¿Cómo funciona el módulo de nómina?](https://www.youtube.com/watch?v=0kkzow8C134&t=578s)  
- [Video: Términos y definiciones de nómina](https://www.youtube.com/watch?v=AO4qvr8Znog&t=331s)  
- [Video: Configuraciones iniciales del módulo de Nómina](https://www.youtube.com/watch?v=kdZahQfWK3A)
- [Video: Configuración de proveedores de nómina](https://www.youtube.com/watch?v=snLC7eIEkKg&t=180s)  
-[Video: Configuración de entidades de nómina](https://www.youtube.com/watch?v=rQAt8neSby0)

---

### ¿Cómo configurar la nómina quincenal?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, la periodicidad de la nómina (mensual, quincenal o semanal) se define en el **perfil de nómina**.  
Al configurar el perfil que se usará en el contrato del empleado como quincenal, el sistema liquidará en dos periodos al mes (generalmente los días 15 y 30), distribuyendo correctamente los salarios, aportes y conceptos recurrentes.  

**📌 Pasos para configurar la nómina quincenal:**  
1. Ingresa a **Catálogo de perfiles de nómina**.  
2. Crea un nuevo perfil o modifica uno existente.  
3. En el campo **Periodicidad**, selecciona **Quincenal**.  
4. Asocia este perfil a los contratos de los empleados que corresponda.  
5. Guarda los cambios y realiza un pago de nómina de prueba para verificar que en cada quincena se liquiden los conceptos de nómina con la cantidad de días adecuada en cada uno de ellos. (15 días o proporcional según la fecha de inicio de contrato o los días de ausencia.)

**💡 Recomendaciones importantes:**  
- Configura la **periodicidad de los conceptos de nómina** (auxilio de transporte, deducciones, bonificaciones, préstamos, etc.).  
  - Ejemplo: Puedes definir que el auxilio de transporte se pague automáticamente en los dos pagos de nómina (auxilio proporcional por cada quincena), o que una deducción se descuente solo en la primera o segunda quincena. (ejemplo aportes a salud y pensión o retención en la fuente)
- Revisa que los empleados tengan asociado el perfil correcto antes de liquidar.  
- Si cambias la periodicidad de un empleado de mensual a quincenal, valida cómo afecta los cálculos de seguridad social y provisiones.  
- Usa conceptos diferenciados cuando algunas deducciones solo deban aplicarse una vez al mes (ejemplo: retenciones, aportes voluntarios).   

#### 📌 Recursos adicionales  
- [Configuraciones iniciales del módulo de Nómina](https://www.youtube.com/watch?v=kdZahQfWK3A&t=1s) 
- [Ejemplo práctico: Pago de nómina quincenal](https://www.youtube.com/watch?v=YmAKfzQ6VHw)  

**👉 También aplica si preguntan:**  
- ¿Cómo cambiar un empleado de nómina mensual a quincenal?  
- ¿Dónde configuro la periodicidad de la nómina?    
- ¿Qué hacer cuando la nómina no liquida quincenal? 
- ¿ContaPyme permite usar la nómina quincenal?

---

### ¿Cómo crear un nuevo concepto de nómina?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Dónde creo un **auxilio nuevo** en nómina?  
- ¿Cómo crear un concepto de **deducción**?  
- ¿Cómo asignar un concepto de nómina a la **cuenta contable** correcta?  
- ¿Cómo configurar un concepto para que sea **no salarial**?  
- ¿Cómo cambiar la **forma de cálculo** de un concepto existente? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme** los **conceptos de nómina** son los que definen cómo se liquidan y contabilizan los diferentes rubros en la nómina: salarios, prestaciones, deducciones, aportes, provisiones, entre otros.  

Cada concepto tiene una configuración propia que determina:  
- Si es un **devengo**, **deducción** o **costo de empresa**.  
- Si es **salarial** o **no salarial**.  
- Su **forma de cálculo** (fijo, porcentaje, fórmula, valor manual, etc.).  
- La **cuenta contable** a la cual se afecta.  

**Pasos para crear un nuevo concepto:**  
**1.** Ingresa a **Catálogo de conceptos de nómina**  
👉 Ruta: **Cinta de opciones > Nómina > Conceptos de nómina**.  

**2.** Haz clic en **Crear** y define:  
- **Código del concepto** (ejemplo: `BONO_NAV`).  
- **Nombre del concepto** (ejemplo: “Bono de navidad).  
- Asigna el concepto base. Esta configuración es una de las más importantes, pues definirá si el concepto de nómina será un **devengo, una deducción o costo de empresa**. Además, determinará si dicho concepto es salarial o no salarial. (El nombre del concepto lo indicará explícitamente como salarial o como no salarial)

Por ejemplo, para este concepto de nómina, puedes usar el concepto base de bonificación (salarial / no salarial) según las políticas de tu empresa.

**3.** Configura en las pestañas del catálogo:  
- **Periodicidad:** define si se liquida **mensual** o **quincenal**, útil para auxilios o deducciones específicas. O no indiques una periodicidad si no será un pago recurrente.
- **Forma de cálculo:** indica cómo se liquida (por ejemplo, porcentaje sobre el salario, valor fijo por empleado, valor manual en novedades).  
- **Contabilización:** asigna la cuenta contable a usar (gasto, pasivo, etc.).  
  
**4.** Guarda y el concepto quedará disponible para ser usado en contratos, novedades y pagos de nómina.  

**Recomendaciones:**  
- ✅ Usa una **nomenclatura clara** en los códigos para identificar fácilmente cada concepto.  
- ✅ Clasifica bien si es **salarial o no salarial**: esto afecta vacaciones, cesantías, primas, seguridad social y el reporte a la DIAN.  
- ✅ Antes de liquidar, revisa que la **cuenta contable** asociada esté correcta (gasto, provisión o pasivo).   

#### 📌 Recursos adicionales  
- [Video: Creación y configuración de conceptos de nómina](https://www.youtube.com/watch?v=kdZahQfWK3A&t=444s)  
- [Video: ¿Qué es una bonificación no salarial?](https://www.youtube.com/watch?v=tLn5AzFdCzk&t=107s) 

---

### ¿Cómo parametrizar las cuentas contables de la nómina?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo se contabiliza automáticamente el manejo contable en los pagos de nómina?  
- ¿Cómo configurar las cuentas contables de seguridad social en ContaPyme?  
- ¿Qué pasa si dejo un concepto sin cuenta contable?  
- ¿Cómo configurar las cuentas contables de prestaciones sociales?
- ¿Cómo configurar el manejo contable de la nómina?
- ¿Cómo configurar las cuentas contables de los parafiscales?
- ¿Cómo cambiar las cuentas contables de la nómina?
- ¿Cómo cambiar las cuentas contables de las provisiones?
- La nómina se está contabilizando de forma errada
- Los pagos están tomando las cuentas que no son


#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, la contabilización de la nómina se hace automáticamente siempre que estén bien configuradas las **cuentas contables** en los conceptos de nómina.  
Esto garantiza que cada devengo, deducción, prestación social o provisión se registre en la cuenta correcta de gasto, pasivo o contra partida que se desea.  

Cuando se procesa la operación de **pago de nómina**, el sistema tomará esas cuentas automáticamente para generar el asiento contable, para cada uno de los empleados.

**Pasos para parametrizar las cuentas contables de nómina:**  

Dirígete a la pestaña "Nómina" en ContaPyme:
**1.** Ingresa al menú **Catálogo de conceptos de nómina**.  
**2.** Visualiza o modifica el concepto a verificar (ejemplo: salario, auxilio de transporte, cesantías, aporte a salud, aporte a pensión, etc.).  
**3.** En la pestaña de **Manejo contable**, asigna las cuentas que correspondan:  
Ejemplo: **Cuenta de gasto** (ejemplo: 510506 sueldos).  

Ten en cuenta que algunas cuentas requieren contrapartida, por ejemplo, las cuentas de provisiones de prestaciones sociales, vacaciones, seguridad social, entre otras y por lo tanto, será necesario configurar la cuenta egreso y la cuenta de contrapartida

Ejemplo
- **Cuenta de gasto** (510569 aportes a entidades promotoras de salud).
- **Cuenta por pagar/pasivo** (ejemplo 237005 aportesa a entidades promotodas de salud).  
**4.** Guarda los cambios.  

Si necesitas crear una cuenta auxiliar o una cuenta nueva para asignarla a un concepto de nómina puedes hacerlo desde el PUC en la ruta: Pestaña Contabilidad > Plan de cuentas > Crear cuenta auxiliar.

O también podrás crearla directamente desde el concepto de nómina en la pestaña de manejo contable; basta con dar clic en el botón "más" que se encuentra ubicado junto a la cuenta contable de dicha pestaña.

**Recomendaciones:**  
- ✅ Revisa que todos los **conceptos** tengan cuentas asignadas (tanto el gasto, como el pasivo cuando aplique)
- 📌 Si un concepto no tiene cuenta o cuenta con un dato inválido, el sistema no podrá generar correctamente el asiento.  
- 💡 Asigna en los conceptos de nómina el manejo por clases de centros de costos  si tu empresa lo requiere, para facilitar la contabilización por áreas de la empresa. Este manejo por centros de costos agilizará la configuración y montaje y te ayudará a garantizar que se usen las cuentas adecuadas según el centro de costos en el cual esté asignado el empleado (ejemplo: gastos de ventas, gastos administrativos, planta de producción, etc.).  

#### 📌 Recursos adicionales  
- [Video: Creación y configuración de conceptos de nómina](https://www.youtube.com/watch?v=kdZahQfWK3A&t=444s)  

---

### ¿Cómo asignarle permisos a los usuarios de ContaPyme?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo crear o modificar un **perfil de seguridad**?  
- ¿Cómo evitar que un usuario **elimine documentos o registros**?  
- ¿Cómo **limitar el acceso a módulos específicos**?  
- ¿Qué hacer si un usuario **no puede ingresar o ver un módulo**?  
- ¿Cómo asignar **permisos de solo lectura** a un empleado?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, los permisos de acceso y seguridad se administran a través de dos componentes principales:  

1. **Catálogo de usuarios:** donde se crean los usuarios del sistema.  
2. **Catálogo de perfiles de seguridad:** donde se definen los permisos o restricciones específicas.  

Esta estructura permite tener **control total sobre quién puede consultar, modificar o eliminar información** en cada módulo o acción del sistema.

Esta configuración cobra mucha relevancia en el sistema ya que se utiliza principalmente para garantizar la privacidad, concistencia y seguridad de la información contable, financiera, etc.

**Para asignar permisos a los usuarios sigue los siguientes pasos:**

**1. Configurar o revisar el perfil de seguridad**
- Ingresa al menú: **Catálogos → Usuarios > Perfiles de seguridad**.  
- Crea un nuevo perfil o modifica uno existente.  
- En la pestaña de **Permisos**, marca las acciones que puede realizar:  
  - Acceso a módulos (contabilidad, cartera, nómina, inventarios, etc.)  
  - Permisos específicos (crear, modificar, eliminar, imprimir, consultar).  
  - Restricciones por acciones o grupo de acciones.
- Guarda el perfil.

**2. Crear o verificar el usuario**
- Ingresa a la pestaña básico y dirígete a **Catálogos → Usuarios del sistema**.  
- Crea un nuevo usuario (si no existe) o selecciona uno existente.  
- Define sus datos básicos (nombre, usuario, contraseña, etc.).  
- Asigna un perfil de seguridad (ejemplo: aux contable, contador, etc).
- Guarda los cambios.

A partir de ese momento, el usuario solo podrá acceder a las áreas y operaciones que su perfil de seguridad le permita.


**💡 Recomendaciones importantes:**
- ✅ Crea **perfiles de seguridad por rol**, por ejemplo: Contador, Asesor comercial, Jefe de nómina, Auxiliar administrativo, etc.  
- ✅ Revisa periódicamente los perfiles activos y **actualiza los permisos** si cambian las funciones del usuario.  
- ⚠️ Evita dar permisos globales a todos los módulos; limita el acceso a la **información sensible o financiera**.  
- ⚠️ Los perfiles administrativos deben estar **restringidos a personal de confianza** (dirección, auditoría o administración).  
- 📌 Si se requiere acceso temporal (por ejemplo, un practicante o externo), **crea un perfil provisional** y elimínalo o inactívalo al finalizar su uso.  
- 💡 Usa nombres descriptivos para los perfiles, como “Contabilidad_Jefe” o “Ventas_Consulta”, para facilitar su administración.

**Casos prácticos comunes:**
- 👩‍💻 Un **auxiliar contable** necesita consultar movimientos, pero no modificarlos → crear perfil con permisos **solo de consulta**.  
- 🧾 Un **vendedor** debe registrar facturas, pero no ver información contable → asignar permisos al módulo de ventas únicamente.  
- 🧍‍♂️ Un **administrador** debe tener control total del sistema → asignar perfil con **todos los permisos**.  

#### 📌 Recursos adicionales  
- [Acerca de: Módulo básico](Dentro de ContaPyme dirígete a la pestaña Básico > Acerca de > Módulo básico > Busca la sección "Catálogo de usuarios")  
- [Video: Creación de perfiles de seguridad en ContaPyme](https://www.youtube.com/watch?v=4n1bT01hryA)  

---

### ¿Cómo parametrizar usuarios para que no vean documentos de nómina?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo evitar que otros usuarios vean los comprobantes de pago de nómina?  
- ¿Cómo restringir el acceso a reportes de nómina?  
- ¿Dónde se configuran los permisos para ocultar la nómina a ciertos usuarios?  
- ¿Cómo hacer que un usuario solo tenga acceso a facturación o contabilidad?  
- ¿Cómo proteger la información salarial y de empleados en ContaPyme? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, puedes restringir el acceso de los usuarios a la información sensible de **nómina**, como comprobantes, reportes o transacciones contables, a través del **catálogo de usuarios** y los **perfiles de seguridad**.

Esto garantiza que solo las personas autorizadas (por ejemplo, el área contable o de talento humano) puedan visualizar, modificar o generar documentos relacionados con nómina.

**Pasos para configurar usuarios sin acceso a nómina**

**1. Abre el Catálogo de Usuarios**  
Ruta:  
👉 **Pestaña Básico > Catálogo de usuarios**

Allí encontrarás el listado de todos los usuarios que pueden ingresar a ContaPyme.

**2. Revisa o crea el perfil de seguridad**  
Cada usuario está asociado a un **perfil de seguridad**, donde se definen los permisos de acceso por módulo y por tipo de operación.

Ruta:  
👉 **Básico > Usuarios > perfiles de seguridad**

Selecciona el perfil que deseas ajustar (por ejemplo, *Auxiliar contable* o *Facturación*) o modifícalo según lo requieras.

**3. Edita los permisos del perfil**  
Dentro del perfil, ubica el grupo de operaciones o módulos relacionados con **Nómina** y realiza lo siguiente:

- ❌ **Desactiva** los permisos de:
  - Creación, modificación o eliminación de documentos de nómina.  
  - Consulta o generación de reportes de nómina.  
  - Explorador de nómina y movimientos contables asociados.  

- ✅ **Deja activos** únicamente los módulos o procesos que el usuario necesita (por ejemplo, contabilidad, facturación, inventarios, etc.).

💡 Puedes usar el buscador dentro del perfil para ubicar rápidamente los módulos que contengan palabras clave como *nómina*, *novedades de nómina*, *pagos de nómina*, etc.

**4. Asigna el perfil al usuario**  
Regresa al **Catálogo de usuarios**, selecciona al usuario correspondiente y en el campo **Perfil de seguridad**, asigna el perfil que acabas de ajustar.

Guarda los cambios.

**5. (Opcional) Bloquea el acceso a reportes o manejadores específicos**  
Si manejas usuarios con funciones mixtas (por ejemplo, contabilidad + tesorería), puedes restringir el acceso solo a los informes de nómina:  
👉 Desde el perfil de seguridad, ubica **Reportes > Nómina**, y desactiva las opciones de visualización o exportación.

**Recomendaciones adicionales**

- 🔒 **Solo el usuario ADMIN** puede crear o modificar perfiles de seguridad.  
- ✅ Diseña **perfiles de seguridad por rol** (ejemplo: Facturación, Tesorería, Nómina, Contabilidad).  
- ⚠️ No otorgues permisos de acceso global a “Todos los módulos”, ya que anularía cualquier restricción.   
- 📌 Si usas la **plataforma de documentos** para los pagos de nómina, también puedes controlar quién puede publicar, ver o aprobar comprobantes de pago de nómina.  

#### 📌 Recursos adicionales  
- [Acerca de: Módulo básico](Dentro de ContaPyme dirígete a la pestaña Básico > Acerca de > Módulo básico > Busca la sección "Catálogo de usuarios")  
- [Video: Creación de perfiles de seguridad en ContaPyme](https://www.youtube.com/watch?v=4n1bT01hryA)  

---


### ¿Cómo configurar un concepto de nómina para cálculo manualmente?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo puedo manejar un concepto de forma manual? 
- ¿Puedo manejar las prestaciones o deducciones con cálculo manual?
- Quiero ingresar manualmente el valor de un concepto de nómina.

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En ContaPyme es posible configurar un concepto de nómina para que su cantidad y/o valor se ingresen de forma manual.

Para hacerlo, ve al catálogo de conceptos de nómina, edita el concepto requerido y, en la pestaña “Forma de cálculo”, selecciona si deseas manejar la cantidad y el valor de forma manual o automática.

Ten en cuenta que, al configurar un concepto como manual, el sistema no realizará el cálculo automáticamente. Por lo tanto, será necesario registrar una novedad de nómina indicando el valor correspondiente para que el concepto se incluya en la nómina del empleado.

**A continuación te contamos algunas recomendaciones si vas a manejar un concepto de nómina de forma manual:**  
⚠️ - **Valida la necesidad del manejo manual:** revisa por qué el valor no coincide con el cálculo automático del sistema antes de cambiar la configuración.
⚠️ - **Evita modificar conceptos por defecto:** si necesitas manejar un concepto manual, se recomienda duplicar uno existente y configurar el nuevo concepto, en lugar de alterar el original.
⚠️ - **Apóyate en la documentación:** si tienes dudas sobre los cálculos del sistema, consulta la sección “Acerca de conceptos de nómina” dentro del módulo de nómina o contacta al departamento de soporte para una asesoría sobre los cálculos del concepto que requieras.

#### 📌 Recursos adicionales  
- [Video: Creación y configuración de conceptos de nómina](https://www.youtube.com/watch?v=kdZahQfWK3A&t=444s)  

---

## CORRECIONES_OPERATIVAS

### ¿Por qué aparece el error "DocumentosNoReportadosEnRango"?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué la DIAN me rechaza el reporte con el mensaje “DocumentosNoReportadosEnRango”?  
- ¿Qué significa error de rango en nómina electrónica?  
- ¿Por qué no puedo enviar la nómina electrónica con fecha anterior?  
- ¿Qué hago si la DIAN rechaza la nómina por error en fechas o DV?  
- ¿Qué hacer si la nómina aparece validada pero no reportada correctamente?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El error **“DocumentosNoReportadosEnRango”** se presenta cuando los **reportes de nómina electrónica enviados a la DIAN** no corresponden al mismo **rango de fechas** o **periodo de pago** en el que fueron contabilizados los documentos de nómina en ContaPyme.  

Generalmente, este error ocurre cuando:  
- Se intenta **reportar un documento con una fecha anterior** a la **fecha de contabilización o soporte** registrada en el sistema.  
- Existe **una diferencia entre la fecha del soporte (ejemplo: 31/08/2025)** y la fecha indicada en el reporte electrónico (**ejemplo: 30/08/2025**).  
- O bien, cuando la DIAN detecta **documentos dentro del rango que no han sido reportados previamente**, lo que interrumpe la secuencia de reportes del mes.


**💡 Ejemplo práctico:**  
Si la nómina fue contabilizada con **fecha de soporte 31/08/2025**, pero el usuario intenta generar el reporte RNE con **fecha 30/08/2025**, la DIAN devuelve el error porque detecta una **inconsistencia temporal** entre el documento y el rango que se pretende reportar.

**Otros rechazos comunes relacionados con la nómina electrónica:**  

1. ⚠️ **Datos del tercero incompletos o incorrectos**  
   - Ausencia o error en el **DV (dígito de verificación)**.  
   - NIT mal digitado o diferente al que está registrado en la DIAN.  
   - Tipo de documento no permitido según el **anexo técnico de nómina electrónica**.  

2. ⚠️ **Fechas fuera del rango permitido**  
   - Reportar con fecha anterior a la contabilización o fuera del mes de liquidación.  

3. ⚠️ **Errores en porcentajes o conceptos no alineados con la DIAN**  
   - Conceptos configurados con **porcentajes no válidos** (ej. horas extra, recargos, aportes).  
   - Devengos o deducciones con **claves incorrectas o sin equivalencia** en el anexo técnico.  

4. ⚠️ **Caracteres no permitidos o símbolos especiales**  
   - En nombres, direcciones o correos de empleados.  
   - En algunos casos, también en los nombres de archivo del documento soporte.  

5. ⚠️ **Problemas de comunicación**  
   - Intermitencias del **proveedor tecnológico** o **de la DIAN**, que pueden ocasionar errores temporales de envío o validación.  

**✅ Recomendaciones para evitar el error:**

- Verifica que la **fecha del soporte contable** y la **fecha del reporte electrónico** correspondan al **mismo periodo de nómina**.  
- Comprueba que **todos los documentos del rango anterior estén reportados y aceptados por la DIAN** antes de enviar los nuevos.  
- Revisa los **datos del empleador y los empleados** (NIT, DV, tipo de documento, dirección, correo, municipio).  
- Confirma que los **conceptos de nómina estén asociados al código DIAN correcto** según el anexo técnico.  
- En caso de error por fecha, ajusta la **fecha del reporte** para garantizar coherencia.  
- Si el problema persiste, intenta el envío más tarde (puede ser una **intermitencia de la DIAN o del proveedor tecnológico**).

---

### ¿Por qué los reportes muestran valores negativos o incompletos?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué el reporte de nómina no muestra todos los valores?  
- ¿Cómo corregir valores negativos en informes de nómina?  
- ¿Qué hacer si el informe no refleja la liquidación completa?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Los reportes, exploradores e informes del módulo de nómina en ContaPyme reflejan la información registrada en las operaciones de nómina. Si observas valores negativos o incompletos, esto puede deberse a la configuración de conceptos, filtros aplicados o al estado de las liquidaciones.

**Posibles causas y soluciones:**

1. **Valores negativos en el reporte:**
   - Normalmente corresponden a **deducciones** (por ejemplo, aportes a seguridad social, retenciones).
   - Verifica si el valor corresponde a un **devengo**, **deducción** o **costo de empresa**.
   - Revisa la operación que genera el valor negativo para confirmar que esté correctamente parametrizada o si así se calculó en el pago y valida el por qué.

2. **Información incompleta:**
   - Puede deberse a **filtros aplicados** en el reporte:
     - Rango de fechas incorrecto.
     - Centro de costos no seleccionado.
     - Empleado no incluido en el filtro.
   - Ajusta los filtros y vuelve a generar el informe. (o recalcúlalo sin necesidad de abrirlo nuevamente)

3. **Liquidaciones pendientes:**
   - Si el reporte no muestra valores esperados, confirma que la **liquidación de nómina** o **contrato** esté registrada y contabilizada.
   - Los reportes solo muestran información que ya está en las operaciones.

Recomendaciones:
- **Visualiza la operación origen:** Antes de concluir que el reporte está mal, revisa la operación que genera el dato.
- **Verifica conceptos:** Asegúrate de que los conceptos de nómina estén correctamente configurados (devengos, deducciones, costos).
- **Revisa filtros:** Comprueba el rango de fechas, centro de costos y empleados seleccionados.
- **Consulta exploradores:** Usa los exploradores de nómina para validar los movimientos antes de generar reportes consolidados.

👉 **Importante:** Si después de revisar todo persiste el problema, solicita asistencia técnica para validar la configuración de conceptos y la información registrada en la nómina.

#### 📌 Recursos adicionales  
- [Video: Exploradores e informes de nómina ](https://www.youtube.com/watch?v=t0mzOnNVMb0)  

---

### ¿Por qué no funciona el módulo de nómina ni aparecen los módulos de pago?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no puedo ver el módulo de nómina?  
- ¿Por qué no me salen las operaciones de pago de nómina?  
- ¿Cómo activar el módulo de nómina en mi usuario?  
- ¿Por qué no puedo crear o modificar nóminas?  
- ¿Qué hacer si tengo la licencia pero no me muestra las opciones?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si el **módulo de nómina** o los **módulos de pago** no aparecen en **ContaPyme**, normalmente se debe a alguno de estos dos factores principales:  

1. **❌ Problemas con el licenciamiento instalado.**  
2. **⚙️ Falta de permisos en el usuario actual.**  


**1️⃣ Verifica el licenciamiento:**  
El módulo de nómina y sus operaciones (contratos, pagos individuales, planilla PILA, liquidación de contrato, reportes electrónicos, etc.) dependen de que la **licencia de nómina** esté **activa, instalada y asignada al usuario**.  

**Pasos para revisar:**  
- Ingresa a **Botón aplicación de ContaPyme > Catálogo de licencias > Listado de licencias**.  
- Confirma que todas las licencias estén activas.
- Confirma que el **módulo de nómina** en el segundo paso, aparezca como **activo** o en estado de edición.  
- Si el licenciamiento está correcto pero el módulo no aparece, revisa si el usuario tiene **licencias asignadas** desde el **Catálogo de usuarios** o directamente desde el catálogo de licencias (desde el botón inspector.)

💡 *Solo los usuarios con el licenciamiento asignado podrán visualizar y operar los módulos correspondientes.*  

**2️⃣ Revisa los permisos de usuario:**  
Si el licenciamiento está bien, el problema puede ser **de seguridad**.  
Cada usuario tiene un **perfil de seguridad**, y este perfil define qué módulos puede ver y qué operaciones puede ejecutar.  

**Pasos para revisar:**  
- Ingresa al **Catálogo de perfiles de seguridad**.  
- Verifica que el perfil tenga **permisos para acceder a Nómina** y a las **operaciones de pago** y demás operaciones del módulo.  
- Asegúrate de que el usuario esté **asociado a ese perfil** desde el **Catálogo de usuarios**.  

📌 *Si un usuario no tiene permisos de creación o modificación sobre operaciones de nómina, el sistema no mostrará las opciones relacionadas.*  

**💡 Recomendaciones:**  
- ✅ Si recientemente se reinstaló el sistema, confirma que el licenciamiento esté **vigente y correctamente instalado**.  
- ⚠️ No compartas usuarios administrativos; cada persona debe tener su propio usuario con permisos específicos.  
- 📌 Si el módulo desapareció después de una reinstalación o migración, solicita la **reactivación del licenciamiento** con el área de soporte técnico.  
- 💡 Crea un **perfil restringido** para usuarios que solo consultan información, sin acceso a pagos ni parametrización.  

#### 📌 Recursos adicionales  
- [Acerca de: Módulo básico](Dentro de ContaPyme dirígete a la pestaña Básico > Acerca de > Módulo básico > Busca la sección "Catálogo de usuarios")  
- [Video: Creación de perfiles de seguridad en ContaPyme](https://www.youtube.com/watch?v=4n1bT01hryA)  

---

### ¿Cómo corregir los errores de PILA?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Qué hacer si a un empleado no le aparece EPS en la planilla?  
- ¿Cómo corregir el error de tipo de trabajador en la PILA?  
- ¿Qué significa cuando la PILA marca fechas de ingreso o retiro erradas?  

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, la **planilla PILA** se genera de forma automática a partir de la información registrada en contratos, novedades de nómina, pagos de nómina y entidades de seguridad social.  
Si aparece un error en la generación o validación, casi siempre se debe a un problema de configuración previa.  

**Si la planilla PILA no puede ser procesada por errores, acá te mencionamos los errores más comunes en PILA y cómo corregirlos:**  

1. **Entidad mal configurada o sin código PILA**  
   - ❌ El empleado tiene EPS, fondo de pensión o ARL asignado, pero la entidad no tiene definido el **código PILA**.  
   - ✅ Solución: Ingresa al **Catálogo de terceros > Proveedores> Modificar proveedor >Datos proveedor> Entidad de nómina> Código PILA** y revisa que cada entidad tenga su código PILA correcto.  
   - ⚠️ Este paso es muy importante ya que el código PILA garantiza que se realice el aporte a la entidad de nómina correcta.

2. **Entidades de nómina incompletas o mal configurado**  
   - ❌ El empleado no tiene definidas las entidades de seguridad social o el tipo de trabajador no corresponde a la realidad del empleado.
   - ✅ Solución: Modifica el empleado y completa la pestaña **Entidades** 

3. **Tipo de trabajador incorrecto**  
   - ❌ Se asignó un tipo de trabajador que no corresponde (ejemplo: dependiente configurado como cotizante 51, o aprendiz SENA sin su clasificación).  
   - ✅ Solución: Corrige el campo en el contrato y vuelve a generar la PILA.  

4. **Fechas mal registradas**  
   - ❌ La fecha de ingreso o de retiro no corresponde con el periodo reportado en PILA.  
   - ✅ Solución: Ajusta las fechas en el contrato. El sistema recalculará automáticamente el reporte.  

5. **Tipo de salario mal configurados**  
   - ❌ El sistema calcula el aporte a seguridad social sobre el 70% de la base total.
   - ✅ Solución: Revisa si el empleado tiene marcado el tipo de salario como integral.  


**Recomendaciones:**  
- ✅ Antes de subir el archivo plano al operador PILA, revisa la **planilla PILA** en ContaPyme para detectar inconsistencias.  
- 📌 Haz pruebas con **un solo empleado** si estás corrigiendo un error recurrente, antes de regenerar la planilla completa.  
- ⚠️ No edites manualmente los archivos planos de PILA; los ajustes deben hacerse en la **configuración del sistema** para ahorrar tiempo en próximos meses.
- 💡 Documenta qué errores fueron frecuentes en la empresa para que no se repitan en periodos siguientes.  

#### 📌 Recursos adicionales  
- [Curso para curso de PILA en ContaPyme](https://www.contapyme.com/capacitacion-virtual/#/CP40MOD680) 

--- 

### ¿Por qué no se genera la contrapartida en cesantías?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Cómo configurar la contrapartida de las cesantías?  
- ¿Cómo configurar el movimiento contable de las cesantías?  
- No cuadra el saldo de las cesantías 
- No se crea correctamente la CxP de las cesantías
- No se están cruzando la provisiones de cesantías con el pago a la entidad).  
- Tengo problemas al pagar las cesantías y el saldo sale negativo

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Si no se está generando la **contrapartida** en las cesantías, casi siempre se debe a la **configuración contable del concepto de nómina**. En ContaPyme, **cada concepto** (cesantías consignadas al fondo, cesantías pagadas al trabajador y cesantías pagadas al trabajador acumuladas a la fecha) puede tener un manejo contable distinto. Por eso, si la contrapartida no aparece o aparece en una cuenta incorrecta, revisa y ajustar la configuración del **movimiento contable del concepto**.

**Diferencia entre conceptos de cesantías (clave para configurar):**

1. **Cesantías consignadas al fondo**  
   - **Piden cuenta crédito y cuenta débito.**  
   - **Sugerencia de cuentas:**  
     - Crédito: `23803001` (Cuentas por pagar – Fondo de cesantías)  
     - Débito: `261005` (Provisión de cesantías)  
   - **Lógica:** Cancela la provisión y **crea una nueva cuenta por pagar** al fondo del empleado.

2. **Cesantías pagadas al trabajador acumuladas a la fecha**  
   - **Solo maneja cuenta crédito.**  
   - **Sugerencia:** Crédito `261005` (cruce contra provisión)  
   - **Lógica:** Se **cruza el pasivo con la provisión** ya causada. No se crea cuenta por pagar a fondo.

3. **Cesantías pagadas al trabajador**  
   - **Solo maneja cuenta crédito.**  
   - **Sugerencia:** Crédito `261005`  
   - **Lógica:** Igual que el anterior, **no se consignan** al fondo; se paga al empleado y se cruza con la provisión.

**Importante:** 
1. Las dos modalidades “pagadas al trabajador” **no** generan cuenta por pagar al fondo; por eso **no verás contrapartida de CxP** a un tercero (fondo) y **sí** verás el cruce con el pasivo (provisión).
2. Las cuentas que se sugirieron anteriormente son una base para el sector comercial, sin embargo, es responsabilidad de cada usuario verificar que esas son las cuentas que efectivamente se usan según el sector o política interna.

¿Cómo configurar la contrapartida de las cesantías e intereses?

1. **Ubica el concepto en nómina:**  
   - Ve a **Nómina > Catálogo de conceptos** y busca:  
     - *Cesantías consignadas al fondo*  
     - *Cesantías pagadas al trabajador acumuladas a la fecha*  
     - *Cesantías pagadas al trabajador*  
     - (y si aplica) *Intereses a las cesantías*

2. **Abre la ficha contable del concepto:**  
   - **Pestaña Manejo contable**  
   - Define las cuentas según el **tipo de concepto** (ver sección anterior).  

3. **Configura las cuentas por naturaleza del movimiento:**  
   - **Cesantías consignadas al fondo:**  
     - **Débito:** `261005` (provisión)  
     - **Crédito:** `23803001` (CxP Fondo de cesantías / tercero = fondo del empleado)  
   - **Pagadas al trabajador (ambas):**  
     - **Crédito:** `261005` (cruce de provisión)  
     - La **contrapartida de pago** ocurrirá en el comprobante de egreso (banco/caja) cuando se pague al trabajador.

4. **Asocia el tercero correcto cuando aplique:**  
   - Para **Cesantías consignadas al fondo**, en el movimiento crédito a `23803001`, el **tercero debe ser el fondo de cesantías** del empleado (el sistema lo toma de las **entidades** del empleado; verifica esa asociación).

**Casos comunes y cómo solucionarlos**

1. **No genera contrapartida en “consignadas al fondo”:**  
   - **Causa típica:** Falta la **cuenta crédito** `23803001` o estás esperando un resultado diferente al que debe aplicarse en la base de datos según el concepto que se está utilizando.
   - **Solución:** Asigna `Crédito = 23803001`, `Débito = 261005` o revisa la documentación acerca de los conceptos de nómina como te lo explicamos anteriormente.

2. **Se crea una cuenta por pagar al fondo pero realmente se pagó al trabajador:**  
   - **Causa:** Usaste el concepto equivocado (consignadas al fondo).  
   - **Solución:** Usa **“Cesantías pagadas al trabajador (o acumuladas a la fecha)”** para que cruce contra la provisión (`261005`) y **no cree** una cuenta por pagar al fondo.


**Buenas prácticas y recomendaciones**

- **Homologa tu plan de cuentas:** Adapta `23803001` y `261005` a tu **PUC** si difiere, manteniendo la **lógica** (CxP al fondo de cesantías vs provisión contable).  
- **Prueba en ambiente controlado:** Antes de cerrar mes/año, simula la liquidación y **visualiza el asiento** desde la operación de pago.  
- **Vincula terceros correctamente:** Fondos de cesantías deben estar **configurados como entidades** y asociados al empleado.  
- **Separación por conceptos:** No mezcles “consignadas” con “pagadas al trabajador”; usa **conceptos distintos** ya que se utilizan en contextos diferentes.
- **Cierre contable ordenado:** Primero genera la nómina, luego **contabiliza**, y finalmente **paga** (fondo o trabajador) con la operación correspondiente.  
- **Auditoría:** Revisa el **comprobante contable** generado por la nómina para validar débito/crédito, terceros y CC.

#### 📌 Recursos adicionales  
- [Video: Creación y configuración de conceptos de nómina](https://www.youtube.com/watch?v=kdZahQfWK3A&t=444s)  

---

### ¿Qué hacer si las vacaciones no cruzan con los saldos contables?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué la cuenta de vacaciones por pagar no coincide con el libro de vacaciones?  
- ¿Cómo verificar si las provisiones se están contabilizando?  
- ¿Por qué en el balance aparece doble gasto de vacaciones?  
- ¿Cómo eliminar un asiento duplicado de provisión de vacaciones?  
- ¿Por qué no se refleja el gasto de vacaciones en el estado de resultados?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando las **vacaciones no cruzan con los saldos contables** en **ContaPyme**, esto suele deberse a **diferencias entre la información de nómina (provisión y pago)** y los **registros contables automáticos** generados en la contabilidad.  
Es decir, el sistema puede estar calculando correctamente los días o valores de vacaciones en nómina, pero los asientos contables no reflejan lo mismo por **configuración, duplicidad o ausencia de movimientos contables.**

**Causas más frecuentes**  

1️⃣ **Configuración incorrecta de las cuentas contables del concepto “Vacaciones”.**  
   - En el catálogo de conceptos, el concepto de **vacaciones disfrutadas** o **vacaciones liquidadas** debe tener asignadas las **cuentas contables de gasto y pasivo** correctas.  
   - Si no hay cuentas asociadas o se asignan erróneas, el gasto no se reflejará contablemente.  
   - 👉 Revisa:  
     **Catálogo → Conceptos de nómina → Vacaciones → pestaña Cuentas contables.**

2️⃣ **Errores en la parametrización del contrato o perfil.**  
   - Si el **perfil de contrato** o el **contrato del empleado** no tienen asignado correctamente el concepto de vacaciones, el sistema no genera la provisión de forma adecuada.  

3️⃣ **No se ha contabilizado la provisión mensual de vacaciones.**  
   - Las provisiones deben realizarse con la operación **Pago de nómina”**, que genera automáticamente los registros contables.  
   - Si no se hace cada mes, el saldo contable quedará desactualizado frente a los valores pagados en nómina de prestaciones sociales.

4️⃣ **Anulaciones o ajustes no replicados en contabilidad.**  
   - Si se anula una operación de vacaciones o se hace un ajuste manual en nómina y no se vuelve a realizar correctamente, el saldo contable quedará incongruente.  
   - ✅ Siempre que anules una nómina o novedad, **verifica en el módulo contable** si el asiento se reversó correctamente.  

5️⃣ **Duplicidad en la contabilización.**  
   - Ocurre cuando se registra dos veces la misma provisión o pago (por ejemplo, al ejecutar dos veces la provisión mensual).  
   - ⚠️ Revisa los informes contables de movimiento de cuentas de gasto y pasivo para validar si existen asientos repetidos.  
   - En caso afirmativo, anula el duplicado desde el **manejador de operaciones.**

**Pasos para corregir diferencias**  

**1.** Genera un **informe de conceptos de nómina o de detalle de pagos por empleado** desde el módulo de nómina.
**2.** En contabilidad, genera el **movimiento de cuentas** de vacaciones (cuentas 2505 y 5105).  
**3.** Compara los valores:  
   - El gasto de vacaciones (5105) debe coincidir con el valor causado o provisionado.  
   - El pasivo (2505) debe coincidir con las vacaciones pendientes por pagar.  
**4.** Si hay diferencias:  
   - Verifica si faltan provisiones → realiza una **provisión de nómina**.  
   - Si hay exceso → revisa si existen **duplicados** y anúlalos.  
**5.** Contabiliza nuevamente las operaciones corregidas.  

**Recomendaciones**  

- ✅ Realiza **provisiones mensuales** de nómina para evitar desfases entre contabilidad y nómina.  
- ✅ Verifica que los **conceptos automáticos** (vacaciones, cesantías, prima, etc.) estén correctamente parametrizados con sus **cuentas contables.**  
- ⚠️ Evita realizar **asientos manuales** sobre las cuentas de vacaciones (2505 o 5105); usa siempre las operaciones del módulo de nómina para mantener la trazabilidad.  
- 📌 Antes de los cierres mensuales o anuales, compara los informes de nómina con el **estado de resultados**.  
- 💡 Si trabajas con varias empresas en la misma área de trabajo, revisa que cada una tenga sus **cuentas y centros de costos** correctamente asignados.

---

### ¿Cómo ajustar diferencias que me generan las cuentas por pagar de prestaciones?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no me cuadran las provisiones de prestaciones con el pago?  
- ¿Cómo ajusto diferencias en las provisiones de las cesantías, intereses, prima o vacaciones?  
- ¿Cómo dejar en cero las cuentas por pagar de prestaciones?  
- ¿Qué hago si las provisiones no coinciden con la liquidación real?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Es común que se presenten **diferencias en las cuentas por pagar de prestaciones sociales**, ya que la **causación de las provisiones** corresponde a una **proyección contable**, mientras que el **pago real** se calcula con base en la información definitiva del empleado.

Estas diferencias suelen generarse cuando:
- El empleado **no labora el año completo**
- Existen **novedades de nómina** como licencias, incapacidades, suspensiones, variaciones salariales u otros conceptos que afectan la base de cálculo.

En **ContaPyme**, estas diferencias se pueden ajustar de dos formas, dependiendo de cómo desees manejar el proceso:

1. **Ajuste manual por Movimiento contable**  
   Puedes realizar el ajuste directamente desde la operación **Movimiento contable**, registrando el valor necesario para cuadrar las cuentas por pagar de prestaciones frente al valor real liquidado y pagado.

   Esta opción es útil cuando deseas un **control puntual y detallado** del ajuste, sin embargo, suele ser un proceso manual y demorado si cuentas con muchos empleados con la misma situación.

2. **Ajuste automático de fin de mes**  
   También puedes usar la operación **Acciones automáticas de fin de mes**, seleccionando la opción:  
   **“Cruce de referencias y ajuste a cero”**.

   Esta operación permite:
   - Cruzar los valores provisionados contra los valores reales
   - Ajustar automáticamente las pequeñas diferencias pendientes en las cuentas relacionadas.

💡 **Importante:**  
Aunque esta operación facilita el proceso, es fundamental **entender bien su funcionamiento**, ya que puede afectar varias cuentas contables de forma automática.

🙌🏽 **Recomendación:**  

1. Puedes revisar e identificar rápidamente las diferencias a través de un explorador de conceptos o explorador contable, son útiles para comparar conceptos o cuentas contables y garantizar la integridad de la información contable y validar los valores esperados.

2. Para mayor claridad y seguridad en este ajuste, se sugiere **solicitar apoyo al equipo de soporte de ContaPyme**, quienes podrán explicarte el alcance exacto de la operación de **acciones automáticas de fin de mes** y validar que se aplique correctamente en tu empresa.

👉 Puedes generar un tiquete de soporte aquí: https://www.contapyme.com/portal-clientes/

---

### ¿Por qué al liquidar la nómina me duplica el salario?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué me sale el salario dos veces en la liquidación de nómina?  
- ¿Qué hago si se están acumulando novedades antiguas en la nómina?  
- ¿Por qué a un empleado le está generando doble salario en el pago?  
- ¿Cómo evitar que el sistema duplique conceptos de salario? 

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, el salario de un empleado normalmente se liquida una sola vez según lo definido en su contrato.  
Si al generar la nómina se está duplicando, la causa suele estar en la configuración del contrato o en las novedades registradas.  

**Causas más comunes y cómo resolverlas:**  

1. **Configuración errónea del contrato**  
   - ❌ El salario se registró directamente en el contrato **y además** se configuró como novedad en el mismo periodo.  
   - ✅ Solución: Mantén el valor solo en el contrato y elimina la novedad duplicada.  

2. **Novedades acumuladas de periodos anteriores**  
   - ❌ Se arrastran novedades de nóminas anteriores que siguen afectando el cálculo.  
   - ✅ Solución: Verifica el historial de novedades. Si corresponde al mismo periodo, corrige la novedad; si corresponde a un periodo ya cerrado, usa la herramienta para **“anulación de novedades”**.  (Esta herramienta la encuentras en la operación de novedades de nómina > menú de opciones > habilitar paso de anulación de novedades)

3. **Cargar el salario como concepto independiente**  
   - ❌ El usuario agregó manualmente un concepto adicional de “salario básico” en la nómina, duplicando el pago.  
   - ✅ Solución: No registres el salario como concepto manual; este se toma automáticamente desde el contrato.  

4. **Errores de periodicidad**  
   - ❌ El contrato está configurado con salario mensual, pero además se registran conceptos de salario quincenal o adicional.  
   - ✅ Solución: Ajusta la **periodicidad del contrato** y la de los conceptos de nómina para que no se crucen.  

**Recomendaciones:**  
- ✅ Revisa siempre que el salario esté correctamente definido en el **contrato** y no duplicado en novedades.  
- 📌 Usa la herramienta de **anulación de novedades** si un valor de un periodo anterior está interfiriendo en el cálculo actual.  
- ⚠️ Si un empleado cambia de condiciones laborales, modifica el contrato existente en lugar de crear uno nuevo.  
- 💡 Define reglas claras en tu catálogo de conceptos para evitar que existan dos con la misma función de salario básico.  


---

### ¿Por qué la nómina se está calculando con un valor diferente al esperado?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué la liquidación de la nómina está mal?  
- ¿Por qué el valor de seguridad social no coincide?  
- ¿Por qué a un empleado le sale un pago diferente?  
- ¿Cómo corrijo cálculos erróneos en la nómina?  
- ¿Cómo corregir errores al liquidar la nómina? 
- ¿Cómo configurar correctamente los comprobantes de nómina para que arrojen valores reales? 
- ¿Cómo corregir diferencias en la liquidación automática de la nómina? 
- ¿Cómo solucionar errores de liquidación con conceptos duplicados o faltantes?
- ¿Cómo validar que los valores del resumen coincidan con los pagos reales?

#### Respuesta:
**Descripción:** 
En **ContaPyme**, cuando la nómina no coincide con el valor esperado suele deberse a configuraciones incorrectas o a datos desactualizados en los contratos, empleados o en los conceptos de nómina utilizados.  
El sistema liquida con base en la información que tiene configurada, por lo que cualquier detalle omitido o mal parametrizado puede alterar el cálculo.  

**📌 Causas más comunes:**  
1. **Contrato del empleado con salario desactualizado:**  
   - El salario en el contrato no coincide con el último ajuste pactado.  
   - ⚠️ Esto impacta directamente los cálculos de devengos, deducciones y provisiones.  

2. **Configuración de conceptos de nómina incorrecta:**  
   - Por ejemplo: el auxilio de transporte, recargos, horas extras o retenciones mal parametrizados.

3. **Días laborados o fechas de ingreso/retiro mal registradas:**  
   - Si el empleado no trabajó el mes completo, el sistema ajusta proporcionalmente.  

4. **Novedades de nómina no registradas o mal aplicadas:**  
   - Ejemplo: ausencias injustificadas, incapacidades, licencias o bonificaciones que no se registraron o se aplicaron con un concepto equivocado.  

**✅ Ejemplo 1:**  
Un empleado tenía un salario de $1.500.000, pero el contrato aún mostraba $1.200.000.  
- **Resultado:** El sistema liquida con base en $1.200.000, generando un pago menor.  
- **Solución:** Modificar el contrato con el salario actualizado.  

**✅ Ejemplo 2:**  
No se calculó la nómina con auxilio de transporte, aunque el empleado no gana más de dos salarios mínimos.  
- **Resultado:** El sistema no incluyó $162.000 de auxilio que sí se debía calcular.  
- **Solución:** Revisa el salario del empleado y los conceptos variables que se tienen durante el mes como comisiones o bonificaciones, ya que estas pueden alterar el cálculo. También podrías verificar si por error se indicó en el contrato que al empleado "no aplica auxilio de transporte". (recuerda que este check se utiliza cuando el empleado vive en las instalaciones de la empresa, cuando la empresa presta el servicio de transporte o cuando el empleado vive cerca a la empresa)

**✅ Ejemplo 3:**  
Un empleado ingresó el día 15 del mes y en el contrato quedó registrado desde el primer día del mes.  
- **Resultado:** El sistema liquida todo el mes en lugar de medio mes.  
- **Solución:** Corregir la fecha real de ingreso en el contrato y recalcular el pago de la nómina

**💡 Recomendaciones:**  
- Antes de liquidar, valida que todos los contratos tengan salarios, fechas y condiciones correctas.  
- Verifica la configuración de los conceptos de nómina en el catálogo, incluyendo manejo contable, periodicidad y forma de cálculo.  
- Registra todas las novedades (incapacidades, licencias, bonificaciones, descuentos) antes de generar la nómina ya que esto impactará de forma significativa los cálculos.
- Documenta los cambios realizados en contratos o conceptos para futuras auditorías.  

**👉 Nota importante:**  
El sistema siempre liquida la nómina con base en la información configurada en contratos, conceptos y novedades.  
Si el cálculo no coincide con lo esperado, normalmente se debe a una parametrización incompleta o a datos desactualizados que requieren revisión.  

---

### ¿Cómo ajustar retroactivamente un salario que quedó mal liquidado?  
#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, si un salario quedó mal liquidado en nóminas anteriores, no es necesario modificar las liquidaciones ya cerradas. El sistema permite realizar **ajustes retroactivos** para corregir la diferencia y garantizar que el empleado reciba el valor correcto.  

El ajuste consiste en registrar la diferencia del salario en una **nómina posterior** mediante un concepto específico, de manera que el empleado reciba el valor faltante o se descuente lo que fue pagado de más.  

**📌 Pasos generales para hacer el ajuste:**  
1. Revisa el contrato del empleado y actualiza el salario correctamente (si aún no lo has hecho).  
2. Identifica la diferencia entre lo que se pagó y lo que realmente se debía pagar.  
3. Usa un **concepto de ajuste salarial** para los casos en los que debes pagar un valor adicional, u **otras deducciones o descuento por mayor valor pagado en horas extrar** en caso de requerir descontarle un valor al empleado.
4. Registra el ajuste en una operación de novedad de nómina para que se vea reflejado en la siguiente nómina del empleado, ya sea como valor adicional (si se pagó menos) o como descuento (si se pagó de más).  
5. Verifica que el ajuste impacte correctamente aportes a seguridad social, provisiones y aportes parafiscales.  

**💡 Recomendaciones:**  
- Nunca borres ni modifiques liquidaciones anteriores ya procesadas, ya que forman parte del historial laboral, contable y de la nómina electrónica reportada a la DIAN.
- Usa siempre un concepto de ajuste identificado, para que quede claro en reportes y auditorías por qué se hizo la corrección.  
- Documenta el ajuste en un soporte administrativo (acta, correo, memorando) para evitar inconvenientes legales.  
- Informa al área contable de los cambios, ya que impactan provisiones, pagos y reportes electrónicos.  
- Si el ajuste es significativo, revisa cómo afecta liquidaciones de seguridad social, retenciones y prestaciones.  

#### 📌 Recursos adicionales
  - [Video: Modificación de contratos en bloque](https://www.youtube.com/watch?v=xNBtkDaBrrk)
  -[Video: Aumento de salarios en bloque](https://www.youtube.com/watch?v=-nCBERjXd8I)
  -[Video: Salario basado en el mínimo](https://www.youtube.com/watch?v=Iqj_uFr4BSk&t=139s)

**👉 También aplica si preguntan:**  
- ¿Cómo realizar ajustes de salario?  
- ¿Cómo pagarle correctamente al empleado si me equivoqué en nóminas anteriores?  
- ¿Cómo corregir un salario mal registrado sin borrar la nómina?  
- ¿Qué hacer si al empleado se le pagó menos o más en la nómina anterior?  

---

### ¿Qué hacer si la nómina se genera sin saldo por pagar?
**Respuesta**
Cuando al generar una nómina en ContaPyme el sistema no muestra valores pendientes por pagar, esto puede deberse a varias situaciones relacionadas con la configuración de conceptos o con la liquidación misma.  

**Posibles causas**
- ✅ **Conceptos de prestaciones**: algunos conceptos no afectan el neto a pagar, especialmente el concepto de cesantías consignadas al fondo, el cual se reporta en la nómina electrónica pero no suma al total de los devengos recibidos por el empleado.  
- ✅ **Novedades sin aplicar**: el sistema puede estar cargando novedades que no se han aplicado correctamente a pagos anteriores y esto puede estar afectando el total devengado o el total deducido al empleado.
- ✅ **Configuración del contrato**: errores en el salario básico, periodicidad o descuentos automáticos.  
- ✅ **Deducciones iguales a los devengos**: si los descuentos cubren todo lo devengado, el saldo será cero.  

**Recomendaciones**
1. 📌 **Revisar el comprobante de nómina**: validar los conceptos incluidos (devengos y deducciones).  
2. 📌 **Confirmar la configuración del contrato** del empleado (salario, periodicidad, beneficios).  
3. 📌 **Verificar conceptos automáticos** que puedan estar afectando el cálculo (ejemplo: descuentos masivos).  
4. 📌 **Revisar pagos previos**: si se liquidó nómina anticipada, puede que no exista saldo por pagar.  
5. 💡 **Usar el explorador de novedades** para identificar novedades mal aplicadas o sin aplicar. En caso de requerir anular novedades de nómina, recuerda que puedes usar la operación de novedades para ello, a través de la herramienta "activar paso de anulación de novedades"

**¿Cómo contabilizar la nómina a la cuenta de salarios por pagar?**
Si el problema es que la nómina **no aparece en los informes de cuentas por pagar (CxP)**, la causa más común es que no se está registrando correctamente una **cuenta del pasivo** en la causación del pago de nómina.
- 📌 Verifica que la **forma de pago** esté asociado a la cuenta correcta de salarios por pagar.  
- 📌 Al realizar el **pago de nómina**, asegúrate de usar la **forma de pago adecuada** (Banco, Caja, cxp.) para que se contabilice correctamente según lo requerido. 
- 💡 Si se lleva a una cuenta diferente (ejemplo: banco), el saldo no aparecerá en los informes de CxP.  

**Nota importante**
👉 Que una nómina no muestre saldo por pagar **no significa que esté mal calculada**.  
Puede reflejar que:  
- El empleado ya recibió pagos anticipados.  
- Las deducciones (seguridad social, préstamos, embargos, retenciones) compensan todo el valor devengado por el empleado. 
- Se está cargando al comprobante el concepto de cesantías consignadas al fondo y este concepto no suma ni resta al total a pagar.  

Siempre es recomendable **revisar contrato, conceptos y comprobante generado** antes de procesar pagos. 

**También aplica si preguntan…**
- ¿Por qué la nómina no aparece en los informes de CxP?  
- ¿Por qué el valor de nómina se llevó al banco pero no a pasivo?  
- ¿Qué pasa si en el pago de nómina uso una forma de pago distinta a la configurada?  
- ¿Cómo verificar que los conceptos afectan el neto a pagar?  

---

### ¿Por qué el auxilio de transporte aparece diferente al esperado al pagar con salario mínimo?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué no se está pagando auxilio de transporte a un trabajador con salario mínimo?  
- ¿Cómo ajustar el auxilio de transporte cuando la nómina es quincenal?  
- ¿Qué hacer si el auxilio de transporte sale en cero en el pago de nómina?  
- ¿Cómo verificar que el concepto de auxilio esté actualizado con el nuevo incremento anual?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
El **auxilio de transporte** en Colombia aplica para los trabajadores que devengan hasta **dos (2) salarios mínimos mensuales vigentes (SMMLV)**, y su valor es definido anualmente por el Gobierno.  

En **ContaPyme**, este valor puede verse diferente al esperado por **configuración del contrato, el valor del salario o la configuración del concepto de nómina**.  

**Posibles causas:**  
- ⚠️ El contrato del empleado tiene marcada la opción de que el trabajador **no recibe auxilio de transporte**.  
- ⚠️ El salario registrado en el contrato está **mal digitado** (ejemplo: con un decimal, espacio o error de valor), por lo que el sistema lo interpreta fuera del rango.  
- ⚠️ El auxilio de transporte está configurado con **periodicidad diferente** a la del contrato (ejemplo: mensual vs quincenal).  
- ⚠️ El concepto de auxilio de transporte fue **modificado manualmente** en el catálogo de variables de nómina y ya no corresponde al valor oficial definido por el Gobierno.  

**Pasos para revisar y corregir:**  
**1.** Verifica en el contrato del empleado que:  
   - El salario esté bien registrado (ej. $1.423.000 o el SMMLV vigente).  
   - Verifica que no esté marcada la casilla de **“No Aplica auxilio de transporte”**en los atributos del contrato.  

**2.** Valida que el **concepto de auxilio de transporte** en el catálogo tenga el valor actualizado según decreto anual y que su periodicidad coincida con el contrato (quincenal o mensual)o según la configuración que deseas.  

**Recomendaciones:**  
- ✅ Mantén actualizado tu sistema ContaPyme para que se actualice adecuadamente el **SMMLV** y el valor del auxilio.  
- ✅ Usa la opción de **modificación de contratos en bloque** si necesitas actualizar masivamente el salario de los empleados y el auxilio corresponda al vigente. 
- ⚠️ Si el empleado gana más de dos salarios mínimos, el sistema automáticamente **no le liquida auxilio** (no es un error, es la norma).  

---

### ¿Qué hacer si en un pago de nómina se generan conceptos duplicados?  

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Por qué la nómina me liquida doble una prestación o deducción?  
- ¿Por qué la seguridad social sale duplicada?  
- ¿Cómo eliminar conceptos repetidos en la nómina?  
- ¿Qué hacer si un concepto de nómina aparece dos veces en el comprobante?  
- ¿Cómo evitar duplicidades en los conceptos automáticos de nómina? 
- ¿Cómo corregir los aportes que salen duplicados en la nómina de los empleados?

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
Cuando un contrato en **ContaPyme** genera **conceptos duplicados** durante la liquidación de nómina, generalmente se debe a una **configuración errónea** en el contrato o en los **conceptos de nómina** asociados.  

Esto puede causar que el sistema liquide **dos veces el mismo concepto**, afectando cálculos de prestaciones, deducciones o aportes.  

**A continuación te contaremos las causas más comunes que generan este inconveniente:**  

**1️⃣ El concepto ya estaba configurado en el contrato y se volvió a cargar por una operación de novedad.**  
Esto ocurre con frecuencia en conceptos **automáticos**, como:  
- Prestaciones sociales (prima, cesantías, intereses, vacaciones).  
- Seguridad social (salud, pensión).  
- Aportes adicionales (Fondo de solidaridad, subsistencia, retención en la fuente).  

💡 *Ejemplo:*  
Si el contrato ya tiene configurado el concepto de retención en la fuente y además se carga manualmente una novedad con ese mismo concepto, el sistema lo liquidará doble.  

**2️⃣ Existen conceptos con el mismo código y vigencia.**  
Si en el catálogo de conceptos hay **dos registros con el mismo código interno** o **vigencias que se cruzan**, el sistema puede identificar ambos y liquidarlo dos veces.  

📌 *Verifica en:*  
`Catálogo de conceptos de nómina → Código del concepto → Vigencia y tipo de cálculo.`   

**¿Cómo corregirlo?:**  

**1.** Verifica en el **Catálogo de conceptos** que no existan dos conceptos con el mismo código durante la misma vigencia.  
**2.** Revisa la configuración del **contrato del empleado**, pestaña **Conceptos**, y elimina los que no correspondan o estén duplicados.  
**3.** Si la duplicidad proviene de una **novedad**, utiliza la opción **Anular novedad** desde el **Manejador de operaciones** o corrige el registro de la misma.  
**4.** Realiza una **planilla de pago de nómina** para validar que el cálculo ya sea correcto.  

**Recomendaciones:**  
- 💡 En conceptos automáticos, **no los cargues manualmente**; deja que el sistema los genere de acuerdo con la configuración del perfil.  
- ✅ Antes de liquidar, revisa que **no existan conceptos repetidos** en contrato o en novedades.   

---

### ¿Cómo editar una nómina después de procesada?

CANONICAL_ID: PF_NOMINA
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.

- ¿Puedo modificar una nómina ya contabilizada?  
- ¿Cómo corregir una nómina antes del envío electrónico?  
- ¿Qué pasa si me equivoqué en los valores de una nómina ya procesada?   

#### Respuesta:
**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->
En **ContaPyme**, una nómina **procesada** es aquella que ya fue **calculada y contabilizada**, pero **no necesariamente enviada a la DIAN** ni publicada en la **Plataforma de Documentos**.  

Por lo tanto, **sí es posible editar una nómina procesada** mientras **no se hayan ejecutado acciones posteriores** como:  
- Publicación de comprobantes en la **Plataforma de Documentos**, o  
- **Envío del reporte de Nómina Electrónica (RNE)** a la DIAN.  

Una vez realizadas estas acciones, el sistema bloquea cualquier modificación para garantizar la **integridad contable y fiscal**.

**Pasos para editar una nómina procesada (cuando aún no se ha reportado):**

1️⃣ **Verifica el estado del reporte electrónico:**  
   - Dirígete al **Manejador de Operaciones → Pagos de Nómina**.  
   - Comprueba que **no tenga estado “Enviado a la DIAN” ni “Publicado”**.  
   - Si está “Procesado”, aún puedes editarla.  

2️⃣ **Desprocesa temporalmente (si deseas editar valores contables):**  
   - Desde el Manejador de Operaciones, selecciona la nómina.  
   - Usa la opción **“Anular** para revertir los asientos sin eliminar la operación.  
   - Esto te permitirá ajustar novedades, conceptos o valores.  

3️⃣ **Edita los valores o novedades necesarias:**  
   - Corrige datos de empleados, conceptos, deducciones o devengos.  
   - Si necesitas cambiar fechas o parámetros de cálculo, asegúrate de no alterar información ya reportada.  

4️⃣ **Vuelve a procesar la nómina:**  
   - Una vez realizados los ajustes, selecciona la nómina y usa **recalcular nuevamente”** para recalcular los valores y regenerar los asientos contables.  


**⚠️ Si la nómina ya fue enviada a la DIAN o publicada:**  
- No podrá ser editada. 
- En estos casos se debe realizar una anulación del pago, realizar uno nuevo y posteriormente realizar el envío de una **“Nómina Electrónica de Ajuste”**, que corrige los valores reportados, manteniendo trazabilidad y cumplimiento normativo.  
- Si fue publicada en la Plataforma de Documentos, se debe **anular y volver a publicar** con los datos corregidos (si aplica).  

**💡 Recomendaciones:**  
- ✅ **Verifica siempre el estado** antes de intentar editar o anular una nómina.  
- ✅ Realiza las correcciones **antes del envío electrónico o publicación**, para evitar inconsistencias o rechazos de la DIAN.   
- 📌 Conserva evidencia interna (capturas, reportes o consecutivos) de los cambios realizados, útil para auditoría o seguimiento interno.  

#### 📌 Recursos adicionales  
- [Video: Pago de nómina en planilla](https://www.youtube.com/watch?v=t6E8KmTJGRk)  
- [Video: Pago de nómina individual](https://www.youtube.com/watch?v=f--kxODMkkk)  
- [Video: Reporte de ajuste de nómina electrónica](https://www.youtube.com/watch?v=mrfGfcIPcFc)  

---

### ¿Por qué las provisiones no concuerdan con lo esperado?

#### Respuesta:
**Descripción:** La diferencia entre lo provisionado y lo pagado es una situación muy común en la gestión de nómina. La diferencia entre el valor provisionado y el pago final no es un error de cálculo, sino que se debe a la naturaleza de las provisiones ya que estas **son una estimación**, mientras que la liquidación final es un cálculo exacto que se ajusta a la realidad laboral del empleado y a la normatividad Colombiana.

Es importante tener en cuenta que tanto la provisión como el pago de las prestaciones sociales y vacaciones se calculan con el promedio de todas las variaciones salariales, incluyendo bonificaciones, comisiones y recargos que haya recibido el empleado.

**👉 ¿Pero cuáles son los factores clave que generan la diferencia?:** 

⚠️ Las provisiones se registran mensualmente con un porcentaje fijo para ayudarte a proyectar el gasto. Sin embargo, al momento de pagar las cesantías y sus intereses, el sistema realiza un cálculo más preciso que considera varios factores que impactaron el salario real del empleado durante el año.

⚠️ **Los días efectivamente laborados:** El cálculo final es proporcional a los días que el empleado realmente trabajó durante el año. Licencias, ausencias o la fecha de ingreso influyen directamente en este valor.

⚠️ **En resumen:** Al momento de pagar las cesantías y los intereses de cesantías, se realiza una validación considerando:
 - Promedio salarial del año, que incluye el salario base y auxilio de transporte cuando aplica.
 - El cálculo final es proporcional a los días que el empleado realmente trabajó durante el año. Licencias, ausencias o la fecha de ingreso influyen directamente en este valor.
 - La fórmula tomará los valores de forma proporcional al período trabajado:

**Cesantías:** (Promedio salarial + auxilio de transporte (si aplica) x días laborados)/360
**Intereses:** (cesantías x días laborados x 0.12)/360

**Recomendaciones:** ❌⚠️ 👉
✅ **Confirma los datos:** Verifica el histórico de salarios y los días laborados del empleado para entender cómo se llegó al valor final de la liquidación.

✅ **No tomes la provisión como un valor exacto:** Recuerda que es solo una estimación que te sirve para proyectar y controlar el flujo de caja, pero el pago final es el valor real que se debe pagar.

#### Variantes de la pregunta (aplicación canónica):
- ¿Por qué el pago de cesantías es menor a lo provisionado?
- ¿Por qué las provisiones de nómina no cuadran?
- ¿Qué factores afectan la provisión de cesantías e intereses?
- ¿Cómo ajustar diferencias que me generan las cuentas por pagar de prestaciones?



---