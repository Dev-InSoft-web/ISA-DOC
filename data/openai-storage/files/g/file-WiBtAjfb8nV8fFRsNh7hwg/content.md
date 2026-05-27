# pf_contabilidad.md
> **Propósito:** Reunir las preguntas frecuentes del módulo **contabilidad**, permitiendo que Paty IA brinde respuestas rápidas, exactas y estandarizadas.  
> **Tipo de documento:** Preguntas frecuentes (PF)  
> **Función:** Base funcional para consultas de usuarios  
> **Versión:** 1.0  
> **Fecha:** 2026/26/01

---

## moneda extranjera

### ¿como se puede configurar un area de trabajo para manejarla en dolares?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- se requiere que en un area de trabajo se maneje en dólares
- ¿como se puede configurar un area de trabajo para manejarla en dolares?
- ¿Cómo configurar un área de trabajo en dólares?
- ¿Cómo poner un área de trabajo para que maneje dólares?
- ¿Cómo parametrizar un área de trabajo en moneda dólar?
- ¿Cómo dejar un área de trabajo configurada en USD?
- ¿Cómo trabajar la contabilidad en dólares en ContaPyme

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE --> 
Para que un área de trabajo en ContaPyme maneje los registros contables en una moneda diferente a la local, como dólares (USD), es necesario realizar una configuración dentro del plan de cuentas.

 #### ⚙️ **Pasos para configurar la moneda del área de trabajo**

1️⃣ Ingresar al Plan de Cuentas

Dirígete a la pestaña Contabilidad y selecciona la opción Plan de Cuentas.

2️⃣ Acceder a la configuración avanzada

Una vez dentro del catálogo del plan de cuentas, ingresa a la opción de Configuración avanzada.

![configuración avanzada del plan de cuentas](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_configuracion_plan_de_cuentas.png)

🔎 Se recomienda que esta configuración se realice para todos los usuarios, con el fin de asegurar que el área de trabajo mantenga un manejo uniforme de la moneda en las contabilizaciones.

3️⃣ Definir la moneda por defecto

Ubica el campo Moneda local por defecto.

Allí podrás seleccionar la moneda en la que el sistema realizará las contabilizaciones del área de trabajo, por ejemplo: USD – Dólar.

![configuración moneda local por defecto](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_moneda_local_defecto.png)

✅ Resultado

Después de realizar esta configuración, el área de trabajo quedará parametrizada para que las operaciones contables se registren en la moneda seleccionada.

---

## Impuestos, anexos y certificados tributarios

### ¿Cómo generar el Certificado 220 en ContaPyme?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- COMO GENERAR CERTIFICADO 220
- ¿Cómo se genera el Certificado 220 en el sistema?
- ¿Cómo puedo generar el certificado 220 para un empleado?
- ¿Cuál es el proceso para generar el Certificado 220?
- ¿Cómo saco el Certificado 220 en ContaPyme?
- ¿Cómo generar el formato 220 para un trabajador?
- ¿Cómo obtengo el certificado de ingresos y retenciones del trabajador?

#### Respuesta:

**Descripción:** 
<!-- DESCRIPCION_NO_RESUMIBLE --> 
El Certificado 220 es el documento que expide el empleador en Colombia para informar a la DIAN y al trabajador los pagos laborales realizados durante el año (salarios, prestaciones, comisiones, entre otros), así como las retenciones en la fuente practicadas.
Este certificado sirve como soporte para que el trabajador pueda elaborar su declaración de renta y para que la DIAN verifique la información tributaria reportada por el empleador.

#### ⚙️ Pasos para generar el Certificado 220 en ContaPyme

1️⃣ Ingresar al informe

Dirígete a la pestaña Nómina → Informes ContaExcel → Certificado 220.

![ruta certificado 220](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_ruta_certificado_220.png)

2️⃣ Abrir el informe en ContaExcel

En el visualizador de hojas de cálculo, selecciona la opción**Abrir informe en ContaExce**.

![abrir certificado 220 en contaexcel](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_abrir_certificado_220.png)

Esta opción abre una hoja de cálculo desarrollada por ContaPyme para la generación del Certificado 220.

3️⃣ Conectar la hoja de cálculo con el sistema

Dentro de la hoja de cálculo, en la parte superior, ubica la opción ContaPyme/AgroWin y haz clic en**Conectar con ContaPyme/AgroWin**.

![conexión del sistema con la hoja de calculo de contaexcel](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_conectar_cp_con_contaexcel.png)

Luego:

Ingresa nuevamente tu usuario y contraseña.

Este proceso permite conectar la hoja de cálculo con el área de trabajo del sistema para traer la información automáticamente.

4️⃣ Diligenciar los datos requeridos

Una vez realizada la conexión:

Regresa a la pestaña Inicio.

Ubícate en la hoja de cálculo.

Diligencia los campos resaltados en color amarillo, por ejemplo:

- Código de la empresa
- Documento del empleado
- Año gravable
- Cuentas contables

![ calculos certificado 220](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_calculos_certificado_220.png)

El sistema tomará automáticamente los valores de las cuentas configuradas y alimentará la hoja correspondiente al Formato 220.

#### Tips
**Recomendaciones y buenas prácticas**

- Verifica que la información de nómina del año gravable esté completamente liquidada antes de generar el certificado.
- Confirma que las cuentas contables estén correctamente parametrizadas, ya que de ellas se toman los valores reportados.
- Revisa cuidadosamente los datos del trabajador (documento, nombres y período) antes de entregar el certificado.
- Si realizas correcciones en nómina, vuelve a actualizar la información en la hoja de ContaExcel para que el certificado refleje los cambios.
- Lee la hoja de**Instructivo** incluida en el archivo, ya que allí se explica el significado de cada casilla y cómo debe diligenciarse correctamente el informe.

---

### ¿Cómo generar los certificados de retención en ContaPyme?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- Como sacar certificados de retención
- ¿Cómo se generan los certificados de retención en ContaPyme?
- ¿Cuál es el proceso para sacar certificados de retención en ContaPyme?
- ¿Dónde puedo generar certificados de retención dentro de ContaPyme?
- ¿Cómo expedir un certificado de retención desde ContaPyme?
- ¿Qué pasos debo seguir para obtener un certificado de retención en ContaPyme?
- ¿Cómo descargar certificados de retención en el sistema ContaPyme?
- ¿Cómo emitir certificados de retención a terceros en ContaPyme?
- ¿De qué manera se elaboran los certificados de retención en ContaPyme?
- ¿Cómo consultar y generar certificados de retención en ContaPyme?
- ¿Cómo obtengo un certificado de retención para un tercero en ContaPyme?

#### Respuesta:

**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE --> 
Los certificados de retención son documentos que la empresa expide a una persona natural o jurídica para informar los valores retenidos por concepto de impuestos u otras obligaciones tributarias, derivados de su relación comercial o laboral.
Estos certificados detallan:
- La naturaleza del impuesto
- La cuantía retenida
- Los pagos realizados
- El período de tiempo al que corresponde la información

Sirven como soporte para el cumplimiento de obligaciones tributarias ante la DIAN u otras entidades fiscales.

 #### 🧭 Pasos para generar certificados de retención en ContaPyme

1️⃣ Ingresar al sistema

Dentro del sistema, dirígete a la pestaña: Contabilidad → Certificados

![ruta de certificados](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_ruta_certificados.png)

2️⃣ Configurar la información del certificado

Selecciona el certificado que necesitas generar y diligencia los siguientes datos:
- Tercero (persona o empresa a la que se le expedirá el certificado)
- Rango de fechas a certificar
- Rango de cuentas contables a incluir

El sistema tomará la información registrada en la contabilidad para construir el certificado.

3️⃣ Exportar el certificado

Una vez generado, utiliza la opción**Guardar como** para descargar el archivo.

El certificado se puede exportar en los siguientes formatos:
- Word
- Excel
- PDF

![opciones para exportar los certificados](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_exportar_certificados.png)

🧾 Tipos de certificados disponibles en ContaPyme

El sistema permite generar los siguientes certificados:
- Certificado de Retención en la Fuente
- Certificado de Ingresos
- Certificado de Retención de IVA
- Certificado de Retefuente y ReteIVA
- Certificado de Retención de Industria y Comercio (ICA)
- Certificado de Retención de Impuesto para la Equidad – CREE

#### Tips

⚠️ **Importante tener en cuenta**

Los certificados se generan directamente con base en la contabilidad.
Por lo tanto:
- Diferencias en documentos
- Errores en cuentas contables
- Fechas mal registradas

👉 Se reflejarán automáticamente en el resultado del certificado.

Antes de generarlo, se recomienda validar que la información contable esté correcta.

---

### ¿Cómo se actualiza la UVT en el sistema?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- ¿Cómo se actualiza el valor de la UVT en ContaPyme?
- ¿De qué manera se actualiza la UVT dentro del sistema?
- ¿El sistema actualiza automáticamente la UVT?
- ¿Qué debo hacer para tener la UVT actualizada en el sistema?
- ¿Cómo verificar si la UVT está actualizada en ContaPyme?
- ¿Dónde se configura o actualiza la UVT en el sistema?
- ¿Cómo consultar la UVT vigente en ContaPyme?
- ¿Cómo se cargan los nuevos valores de la UVT en el sistema?
- ¿Qué se necesita para que el sistema actualice la UVT automáticamente?
- ¿Cómo validar que el valor de la UVT corresponde al año actual?
- Cómo se actualiza la UVT para 2026?

#### Respuesta:

**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE --> 
La UVT (Unidad de Valor Tributario) es una medida de valor establecida por la DIAN en Colombia, la cual se actualiza cada año con base en la inflación.
Se utiliza para unificar y facilitar el cálculo de obligaciones tributarias como:
- Impuestos
- Sanciones
- Retenciones en la fuente
- Topes para declarar renta

En lugar de expresar estos valores en pesos, la norma los define en UVT, lo que permite que se ajusten automáticamente cada año sin necesidad de modificar todas las leyes tributarias.

🔄 **Actualización de la UVT en ContaPyme**

A partir de la actualización 25.40, ContaPyme realiza la actualización automática de la UVT.

El sistema consulta el valor oficial desde el servidor y lo descarga automáticamente, permitiendo que se use en todos los cálculos relacionados con indicadores legales y tributarios.

⚠️ **Importante:**

Debes tener la póliza vigente, ya que el sistema necesita este requisito para poder realizar la consulta y descargar los valores actualizados.

Cuando exista una actualización de la UVT u otras variables legales, al ingresar al sistema se mostrará un mensaje informando los nuevos valores actualizados.

![mensaje de actualización UVT](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_actualización_uvt.png)

📌 **Algunos cálculos que dependen de la UVT**

- Bases de impuestos y retenciones
- INC de bolsas plásticas
- Referencias relacionadas con el salario mínimo
- Auxilio legal de transporte
- Impuesto a bebidas azucaradas (IBUA)

👀 **¿Dónde consultar el valor de la UVT en el sistema?**

Para ver el valor actual y el histórico de la UVT, sigue esta ruta:

Botón de Aplicación → Configuración → Indicadores generales del sistema → Unidad de Valor Tributario (UVT)

![Ruta para consultar el valor de la UVT](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_ruta_consulta_uvt1.png)

![Ruta para consultar el valor de la UVT 2](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_ruta_consulta_uvt2.png)

Allí podrás visualizar:
- El valor de la UVT vigente
- El histórico de valores de UVT por año

 #### 💡Tips importantes

✔️ Verifica que tu póliza esté vigente, de lo contrario el sistema no podrá consultar los valores oficiales.

✔️ Revisa el valor de la UVT al inicio de cada año fiscal, especialmente antes de realizar cálculos de retenciones o topes tributarios.

✔️ Si notas inconsistencias en cálculos tributarios, valida primero que el valor de la UVT corresponda al año gravable correcto.

✔️ Evita modificar manualmente estos indicadores, salvo que soporte técnico lo indique.

---

### ¿Cómo actualizo los valores de las retenciones y autorretenciones dentro del sistema?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- ¿Cómo actualizo los valores de las retenciones?
- ¿Cómo actualizo las autorretenciones en el Sistema?
- ¿Cómo se actualizan las retenciones y autorretenciones en ContaPyme?
- ¿De qué manera el sistema actualiza los valores de retención automáticamente?
- ¿Cómo puedo verificar que las retenciones estén actualizadas en el sistema?
- ¿Dónde se configuran los valores mínimos de retención en UVT?
- ¿Cómo revisar la base mínima en UVT de un concepto de retención?
- ¿Cómo validar los valores de autorretención dentro del sistema?
- ¿Qué debo hacer para que el sistema actualice las retenciones automáticamente?
- ¿Cómo consultar los parámetros de cálculo de retención en ContaPyme?
- ¿Dónde puedo ver la configuración de retenciones y autorretenciones?
- ¿Cómo confirmar que los conceptos de retención tienen la vigencia correcta?

#### Respuesta:

**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE --> 
En ContaPyme, los valores base para el cálculo de retenciones y autorretenciones se actualizan de forma automática, siempre que el sistema cuente con la póliza vigente.
Desde la actualización 25.40 de ContaPyme y AgroWin, el sistema incorporó nuevos conceptos que ya cuentan con la parametrización de cálculos definidos en UVT (Unidad de Valor Tributario), lo que permite que los topes se ajusten automáticamente cuando cambia el valor de la UVT.

🔄 **¿Cómo funciona la actualización?**

El sistema consulta los valores vigentes desde el servidor de ContaPyme cuando la póliza se encuentra vigente,
con esta consulta se actualizan automáticamente los parámetros necesarios para el cálculo de impuestos.

Se actualizan específicamente los conceptos de retención y autorretención dentro de los:
- Catálogos de conceptos de liquidación en ingreso
- Catálogos de conceptos de liquidación en egreso

Los valores mínimos de cálculo quedan expresados en UVT, lo que permite que se ajusten cada año sin necesidad de realizar cambios manuales en cada concepto.

#### 🔍¿Cómo validar la configuración de un concepto?

Sigue estos pasos para revisar que un concepto esté configurado correctamente:

1️⃣ **Ingresar al catálogo de conceptos**

Ruta:
Contabilidad → Plan de cuentas (flecha) → Conceptos de liquidación en ingreso
o
Contabilidad → Plan de cuentas (flecha) → Conceptos de liquidación en egreso

![Ruta para consultar los catalogos de ingreso y egreso](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_ruta_consulta_catalogo_impuestos.png)

2️⃣ **Abrir el concepto a revisar**

Puedes modificar o visualizar el concepto de retención o autorretención que necesites validar.

3️⃣ **Revisar la forma de cálculo**

Dentro del concepto, dirígete a la pestaña:

Forma de cálculo

![forma de calculo de los impuestos](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_forma_de_cálculo_impuestos.png)

Aquí podrás verificar que:

- El tipo de valor esté configurado como Base mínima en UVT
- El sistema tenga un valor asignado en UVT para el cálculo mínimo

#### 💡Tips importantes

✔️ Evita cambiar los valores a pesos si el concepto está parametrizado en UVT, porque se perdería la actualización automática anual del valor.

✔️ Revisa al inicio de cada año que los conceptos clave de retención estén correctamente configurados.

✔️ Si un cálculo no se está aplicando, valida primero la forma de cálculo antes de hacer ajustes contables manuales.


---

## Informes contables, estados financieros, libros legales y movimientos auxiliares de cuentas

### ¿como generar un informe por centro de costos y terceros?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- Cliente solicita soporte para validar informes por centros de costos que incluyan los terceros
- ¿Cómo generar un informe por centro de costos y terceros en ContaPyme?
- ¿Cómo obtener un informe contable por centro de costos y por tercero en ContaPyme?
- ¿De qué manera puedo generar un reporte que incluya centros de costos y terceros?
- ¿Dónde se consulta un informe contable discriminado por tercero y centro de costos?
- ¿Cómo sacar un reporte de movimientos contables por terceros y centros de costos?
- ¿Qué informe debo usar para ver cuentas contables por centro de costos y tercero?
- ¿Cómo ver los saldos contables clasificados por tercero y por centro de costos?
- ¿Cómo generar un reporte detallado de cuentas auxiliares por terceros y centros de costos?
- ¿Cómo consultar movimientos contables filtrados por centro de costos y terceros?
- ¿Cómo emitir un informe contable organizado por tercero y centro de costos?
- ¿Qué pasos debo seguir para generar un informe por terceros y centros de costos en ContaPyme?

#### Respuesta:

**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE --> 
En ContaPyme es posible generar informes contables que permiten analizar los saldos de las cuentas de forma detallada, ya sea por terceros o por centros de costos.
Estos reportes son clave para el control financiero, la auditoría y el análisis de la información contable de la empresa.

#### ✅Pasos para generar el informe

1️⃣ Ingresar a la ruta del informe

Dentro del sistema dirígete a la pestaña de
Contabilidad → Otros reportes contables →

- Movimiento de cuentas auxiliares por centro de costos

- Movimiento de cuentas auxiliares por tercero

Selecciona el informe según el tipo de análisis que necesites realizar.

2️⃣ Configurar los filtros del informe

Antes de generar el reporte, debes definir:

- 📅 Rango de fechas a consultar

- 📘 Rango de cuentas contables

- 👤 Tercero (si se requiere filtrar uno específico)

- 🏢 Centro de costos (si se requiere un área específica)

Luego de definir los filtros, genera el informe.

📄 **¿Qué muestra cada informe?**

🔹 Movimiento de cuentas auxiliares por terceros

Este informe organiza la información en el siguiente orden:
Tercero → Centro de costos → Cuenta contable

![informe de movimiento de cuentas auxiliar por tercero](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_mov_ctas_aux_tercero.png)

Permite analizar los movimientos contables asociados a cada tercero.

🔹 Movimiento de cuentas auxiliares por centro de costos

Este informe organiza la información así:
Centro de costos → Cuenta contable → Tercero

![informe de movimiento de cuentas auxiliar por centro de costos](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_mov_ctas_aux_centro_costos.png)

Facilita el análisis financiero por áreas, proyectos o dependencias de la empresa.

#### 💡 Tips importantes

✔️ Verifica que los centros de costos estén correctamente asignados en los comprobantes contables, de lo contrario el informe no reflejará la información completa.

✔️ Si necesitas un análisis detallado, exporta el informe a Excel para aplicar filtros, tablas dinámicas o cruces de información.

✔️ Usa rangos de fechas cortos cuando el volumen de información sea muy alto, esto hará que el reporte cargue más rápido.

✔️ Si un tercero o centro de costos no aparece, revisa que sí tenga movimientos contables dentro del período consultado.

---


## Catálogo del plan de cuentas

### ¿Cómo puedo corregir una cuenta de orden?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- Cómo corregir cuentas de orden
- ¿Cómo corregir un error en una cuenta de orden?
- ¿Qué debo hacer si una cuenta de orden está mal registrada?
- ¿Cómo ajustar un registro incorrecto en cuentas de orden?
- ¿Cuál es el procedimiento para corregir una cuenta de orden en el sistema?
- ¿Cómo solucionar una novedad en una cuenta de orden?
- ¿Qué pasos seguir para modificar una cuenta de orden con errores?
- ¿Cómo hacer un ajuste contable en cuentas de orden?
- ¿Qué hacer cuando una cuenta de orden tiene información incorrecta?
- ¿Cómo validar y corregir movimientos en cuentas de orden?
- ¿Cómo se realiza la corrección de registros en cuentas de orden?

#### Respuesta:

**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE --> 
Las cuentas de orden se utilizan para llevar control de información contable que no afecta directamente los estados financieros, pero que sí es importante para la gestión y seguimiento de la empresa.
Si detectas una novedad o error en estas cuentas, puedes seguir las siguientes recomendaciones.

 #### ✅Pasos para corregir una cuenta de orden

1️⃣ Identificación del error

Primero, identifica con claridad qué información es incorrecta en la cuenta de orden.
El error puede estar en:
- Montos registrados
- Fechas del movimiento
- Operaciones registradas
- Configuración o atributos de la cuenta contable

2️⃣ Análisis de la causa

Determina por qué ocurrió el error. Algunas causas comunes pueden ser:

- Registro contable mal digitado
- Uso incorrecto de la cuenta contable
- Error en la parametrización o configuración de la cuenta
- Selección equivocada de terceros, centros de costos o documentos relacionados

3️⃣ Corrección del registro

Una vez identificado el error y su causa, realiza la corrección correspondiente. Esto puede implicar:

- Ajustar los valores registrados
- Modificar la fecha del movimiento
- Corregir la información de la operación
- Ajustar la configuración o atributos de la cuenta (si aplica)

4️⃣ Revisión de documentos relacionados

Verifica que los documentos asociados al a cuenta también estén correctos, por ejemplo:

- Facturas
- Recibos
- Comprobantes contables
- Documentos internos de control

Esto asegura que la información contable y los soportes coincidan.

5️⃣ Validación de la corrección

Después de realizar los ajustes:

- Revisa nuevamente el movimiento de la cuenta
- Genera los informes contables relacionados
- Confirma que la información ya se refleje de forma correcta

#### 💡Tips importantes

✔️ Evita eliminar registros contables ya contabilizados; es mejor hacer ajustes que dejen trazabilidad.

✔️ Antes de corregir, revisa si el error proviene de la configuración de la cuenta, ya que si no se corrige desde la base, el problema puede repetirse.

✔️ Documenta internamente el motivo del ajuste para futuras revisiones contables o auditorías.

✔️ Si el error afecta varios períodos, valida el impacto antes de hacer correcciones masivas.

📩 Si después de estas revisiones no logras solucionar la novedad, te recomiendo generar un tiquete al área de soporte técnico, para que uno de nuestros expertos pueda revisar tu caso puntual y orientarte en la corrección adecuada.


---

### ¿Cómo se puede realizar el cierre de las cuentas de impuestos?

CANONICAL_ID: PF_CONTABILIDAD
TYPE: FAQ_CANONICA
ALLOW_REWRITE: FALSE
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.
No deben generar respuestas parciales, resumidas ni alternativas.


- como hago el cierre de las cuentas de impuestos
- ¿Cómo se realiza el cierre de las cuentas de impuestos?
- ¿Cuál es el procedimiento para cerrar las cuentas de impuestos en contabilidad?
- ¿Cómo hacer el cierre contable de los impuestos al final del período?
- ¿De qué forma se saldan las cuentas de impuestos en el sistema?
- ¿Cómo puedo dejar en cero las cuentas de impuestos al cierre del año?
- ¿Qué pasos debo seguir para cerrar las cuentas de IVA, retenciones e ICA?
- ¿Cómo se trasladan los saldos de las cuentas de impuestos al cierre contable?
- ¿Cómo realizar el ajuste final de las cuentas de impuestos?
- ¿Cómo hacer el proceso de cierre fiscal de las cuentas de impuestos?
- ¿Cómo se ejecuta el cierre de impuestos en ContaPyme?

#### Respuesta:

**Descripción:**
<!-- DESCRIPCION_NO_RESUMIBLE --> 
El cierre de cuentas de impuestos es el proceso contable que se realiza al finalizar un período para conciliar, ajustar y dejar saldadas las cuentas relacionadas con obligaciones tributarias como:

- IVA
- Retenciones en la fuente
- ICA
- Otros impuestos por pagar o a favor

Su objetivo es que los valores contables coincidan con los montos declarados y pagados ante las entidades fiscales, evitando arrastrar diferencias al nuevo período.

🔄 Formas de realizar el cierre en ContaPyme

En ContaPyme, este proceso se puede hacer de dos maneras:

1️⃣ De forma automática desde las acciones de cierre de fin de año
2️⃣ De forma manual mediante un comprobante contable

✅ Opción 1: Cierre automático desde fin de año

Para usar esta opción, primero debes revisar cómo están configuradas las acciones de cierre.

📍 Ruta: Contabilidad → Flecha del Catálogo de Plan de Cuentas → Acciones de cierre de fin de año

![Ruta para las acciones de cierre de fin de año](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/cn_ruta_acciones_cierre_año.png)


Allí encontrarás acciones de cierre de impuestos creadas por defecto.

🔎 ¿Qué debes verificar?

- Que el rango de cuentas corresponda a las cuentas de impuestos que usa la empresa
- Que el destino positivo y negativo esté configurado correctamente
- Que el año relativo sea el adecuado para el cierre

Si es necesario, puedes crear o modificar acciones de cierre teniendo en cuenta:

- Rango de cuentas a cerrar
- Cuenta destino del saldo
- Naturaleza del traslado (positivo o negativo)

Estas acciones permitirán que el sistema realice automáticamente los movimientos contables al ejecutar el proceso de cierre de fin de año.

✅ Opción 2: Cierre manual por la operación de movimiento contable

También puedes realizar el cierre mediante una operación de movimiento contable, generalmente con fecha 31 de diciembre del año que se va a cerrar.

📌 ¿Cómo se hace?

Se realiza una operación de movimiento contable donde se tienen en cuenta las cuentas de impuestos y los valores correspondientes, para efectuar el traslado de los saldos hacia las cuentas definidas por la empresa, como:

- Impuestos por pagar
- Saldos a favor
- Cuentas de control contable

#### 💡Tips importantes

✔️ Antes de hacer el cierre, verifica que todas las declaraciones de impuestos estén correctamente contabilizadas.

✔️ Revisa que no existan saldos en cuentas de impuestos que ya fueron pagados, para evitar duplicidades.

✔️ Si usas el cierre automático, valida previamente las acciones de cierre, ya que una mala configuración puede generar traslados incorrectos.

✔️ Genera un balance de prueba antes y después del cierre para confirmar que los saldos quedaron correctamente trasladados.

---

### Al procesar una operación aparece un error por descuadre en cargues iniciales (NIIF o local), ¿cómo se puede solucionar?

**Otras formas de preguntar:**  
- ¿Por qué no me deja procesar una operación por cargues iniciales descuadrados?  
- ¿Qué significa que la contabilidad NIIF o local está descuadrada?  
- ¿Por qué una operación no genera contabilización en ContaPyme?  
- ¿Cómo corregir un error de descuadre en cargues iniciales?  
- Se han procesado operaciones de cargue inicial de saldos que han dejado la contabilidad descuadrada

**Respuesta:**  
Este error aparece cuando existen **cargues iniciales de saldos descuadrados**, es decir, que la suma de **débitos y créditos no coincide** en la contabilidad **local o NIIF**.  

Por esta razón, ContaPyme **bloquea el procesamiento de nuevas operaciones**, ya que no puede generar contabilización mientras existan inconsistencias.

#### 📌 ¿Por qué ocurre este error?

Los cargues iniciales deben cumplir una regla clave:

👉 **La suma total de débitos y créditos debe ser igual (cuadrada)**

Esto puede no cumplirse cuando:

- Se registra un cargue (ej: inventarios) solo con débitos  
- No se realiza el cargue correspondiente para el crédito  
- Existen diferencias entre contabilidad **local y NIIF**  

#### 🧾 Ejemplo práctico

Supongamos que realizas:

- 📦 **Cargue inicial de inventarios**  
  - Afecta: Inventarios (Débito)

En este caso:
- ❌ No hay cuenta que compense el crédito en esa misma operación  
- 🔴 Queda descuadrado

#### ✔ ¿Cómo se soluciona?

Debes realizar otro cargue:

- 💰 **Cargue inicial de cuentas (contrapartida)**  
  - Afecta: Cuenta contable (Crédito)

📌 **Ambos cargues deben:**
- Estar en la **misma fecha**
- Sumar entre sí **diferencia cero (débitos = créditos)**

⚙️ Paso 1: Revisar los cargues iniciales

1. Ubica las operaciones de **cargue inicial de saldos**.
2. Verifica:
   - Débitos
   - Créditos
   - Fecha
3. Identifica si hay diferencias.

🔄 Paso 2: Completar el cargue faltante

Si encuentras un cargue descuadrado:

- Realiza un **nuevo cargue** que compense el valor faltante.
- Asegúrate de que:
  - Sea por el valor exacto
  - Quede en la misma fecha
  - Cuadre completamente


🧩 Paso 3: Validar tipo de contabilización (Local y NIIF)

Ten en cuenta lo siguiente:

- 📌 El **cargue inicial de cuentas** solo puede ser:
  - Local **o** NIIF (no ambos al tiempo)

- 📌 Otros cargues (como inventarios) sí pueden ser:
  - Local y NIIF al mismo tiempo

✔ Ejemplo correcto:

Si haces un cargue de inventarios en:
- Local + NIIF  

Entonces debes hacer:
- Un cargue de cuentas en **Local**
- Otro cargue de cuentas en **NIIF**

⚙️ Paso 4: Verificar o cambiar el tipo de contabilización

Si necesitas ajustar el tipo de contabilización:

1. Ingresa a la operación de **cargue inicial**.
2. Haz clic en **Operación**.
![Tipo contabilización](https://www.contapyme.com/conocimientocontapyme/020_CN/contabilidad/tipo_contabilizacion.png)

3. Cambia el tipo:
   - Local
   - NIIF
4. Guarda los cambios.

## ✔ Validación final

1. Verifica que todos los cargues:
   - Estén en la misma fecha
   - Estén completamente cuadrados
2. Intenta procesar nuevamente la operación.
3. El sistema ya permitirá la contabilización sin errores.

#### 💡 Recomendaciones finales

- ✅ Siempre valida que los cargues iniciales queden en **cero (débitos = créditos)**.
- 📊 Revisa tanto la contabilidad **local como NIIF**.
- 🧾 Realiza los cargues por pares (débito y crédito).
- ⚠️ Si el error persiste después de cuadrar los cargues, comunícate con **soporte técnico de ContaPyme** para una revisión más detallada.

---

## Operación de ingresos

### ¿Por qué no veo la columna "Cuenta de ingresos" en la operación de ingresos?

CANONICAL_ID: PF_CONTABILIDAD 
TYPE: FAQ_CANONICA  
ALLOW_REWRITE: FALSE  
VARIANTS_TRIGGER: MUST_RETURN_FULL_CANONICAL_BLOCK  

#### Variantes de la pregunta (APLICACIÓN CANÓNICA – NO RESUMIR):

📌 Todas las siguientes variantes activan **EXACTAMENTE la misma respuesta completa** definida en esta pregunta principal.  
No deben generar respuestas parciales, resumidas ni alternativas.  

- No aparece la columna cuenta de ingresos  
- ¿Por qué no veo la cuenta en la operación de ingresos?  
- El sistema pide cuenta pero no aparece la columna en ingresos 
- No puedo ingresar la cuenta en ingresos  
- Falta columna cuenta en comprobante de ingreso  
- ¿Cómo habilitar la columna cuenta en ingresos?  

#### Respuesta:

**Descripción:**  
<!-- DESCRIPCION_NO_RESUMIBLE -->  
En la operación de **Ingresos** de ContaPyme, la columna **“Cuenta de ingresos”** puede estar oculta por configuración de visualización.  

Esto puede generar situaciones donde:

- ❌ No se visualiza la columna para ingresar la cuenta.  
- ⚠️ El sistema solicita la cuenta al intentar guardar, pero no hay dónde digitarla.  

Este comportamiento no corresponde a un error, sino a una opción de visualización que puede activarse o desactivarse manualmente.


**🔍 ¿Cómo habilitar la columna "Cuenta de ingresos"?**

Para visualizar la columna, sigue estos pasos:

1. Ubica la barra de herramientas dentro de la operación de ingresos.  
2. Haz clic en el ícono de organizador de columnas (como se muestra en la imagen).  

  La siguiente imagen corresponde a la pantalla del sistema relacionada con este punto:
        ![Visualizar columna cuenta en ingresos](https://www.contapyme.com/conocimientocontapyme/010_BS/visualizar_columna_cuenta_ingresos.png)

3. Activa la opción:  

   ✔️ **“Visualizar columna ‘Cuenta’”**  

📌 Al activar esta opción, la columna aparecerá inmediatamente en la grilla y podrás ingresar la cuenta correspondiente.


**⚠️ Consideraciones importantes**

- 📌 La visualización de esta columna depende de la configuración anterior.  
- 🔄 Puede activarse o desactivarse en cualquier momento según la necesidad.  
- 🧾 Si el sistema exige una cuenta, es obligatorio tener esta columna visible para completar la operación.  


**💡 Recomendación**

Si trabajas frecuentemente con la operación de ingresos, se recomienda mantener activa esta columna para evitar inconsistencias o errores al momento de guardar.


**📞 ¿Y si el problema continúa?**

Si después de habilitar la columna no puedes registrar la cuenta o el sistema sigue generando inconsistencias:

👉 Se recomienda **generar un tiquete (TK) al área de soporte técnico**, donde un asesor podrá revisar la configuración específica y ayudarte con la solución.  




























