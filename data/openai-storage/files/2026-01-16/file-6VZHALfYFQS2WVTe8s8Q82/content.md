# gm_nomina.md
> **Propósito:** Documentar procedimientos paso a paso del módulo **Nómina**, garantizando que Paty IA pueda explicar procesos con claridad y precisión.
> **Tipo de documento:** Guía de montaje (GM)
> **Función:** Procedimientos detallados 
> **Fecha:** 11/11/2025
> **Versión:** 1

---

# Guía de montaje

## NÓMINA

Esta guía lo orientará en el montaje de la nómina y reportes de nómina
electrónica. Su alcance se limita a llevar el control de las novedades y pagos
de nómina a los empleados por conceptos según su comportamiento, como
devengos, deducciones, prestaciones, aporte y provisiones a cargo de la
empresa.



##  Requisitos iniciales

Esta sección indica cuales son los requisitos que se deben cumplir previo al
montaje de una nómina.

## Realice el montaje del sistema básico

Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión.
Para más información consulte la Guía de montaje de sistema básico
[aquí](<../010 BS/\[GM\]\[10\] Guia de montaje modulo basico.html>).

## Realice el proceso de capacitación del módulo de nómina

Ver Curso de Nómina [aquí](<https://www.contapyme.com/capacitacion-virtual/#/CP40MOD094>).

##  Creación de cuentas de nómina

En esta sección se crean en el plan de cuentas, las cuentas auxiliares para el
registro de la nómina.

## Requisitos

Identificar las cuentas auxiliares que se requieren crear en el plan de
cuentas y que serán usadas en el registro de la nómina.

## Preparación de la información

Definir si dichas cuentas auxiliares pertenecen al grupo de gastos o de costos
para ser creadas en el respectivo grupo.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Plan de cuentas **\[Cinta de opciones: Pestaña
Contabilidad > Catálogos > Plan de cuentas\]**.


![ConfPlanCuentasPaso1.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfPlanCuentasPaso1.png)


Seleccione la cuenta o sub-cuenta a la cual va a pertenecer la cuenta auxiliar
a crear, ejemplo sub-cuenta **510506 Sueldos**.


![ConfPlanCuentasPaso2.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfPlanCuentasPaso2.png)


Cree la nueva cuenta auxiliar **\[Cinta de opciones > Crear\].**


![ConfPlanCuentasPaso3.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfPlanCuentasPaso3.png)


Indique el código que tendrá la cuenta auxiliar, ejemplo: 51050610.


![ConfPlanCuentasPaso4.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfPlanCuentasPaso4.png)


Realice las configuraciones correspondientes: Asigne nombre a la cuenta,
verifique que el tipo de cuenta sea de **"5-Egresos"** , que se encuentre
activa la opción **"Afectable directamente por el usuario"** , **"Disponible
en operaciones de gastos/ingresos"** , **"disponible para presupuesto”** ,
asigne como clase **"1-Normal"** , si maneja y exige tercero y si exige centro
de costos.


![ConfPlanCuentasPaso5.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfPlanCuentasPaso5.png)


##  Configuración de Tipo de entidad

En esta sección se configuran las entidades de nómina que trae el sistema por
defecto. Las entidades de nómina que el sistema trae por defecto corresponden
a los proveedores de servicios como: **Salud, pensión, ARL, caja de
compensación, entre otros**. Adicional permite crear más entidades de nómina
que el usuario requiera.

Los tipos de entidad permiten indicar un tercero del sistema que es usado de
forma general y que normalmente representa a una entidad.

**Ejemplo:**


Tipo de entidad: **CCF - Caja de Compensación Familiar**

Tercero del sistema: **60013570 - Caja de Compensación Familiar CAFAM**

Los tipos de entidad son útiles puesto que están referenciando a terceros ya
existentes y en caso de necesitar cambiar dicho tercero, el cambio solo se
realizaría en los tipos de entidad y no de forma general en cada concepto de
nómina.

## Requisitos

Tener creados en el sistema como terceros, las entidades a las cuales se
encuentra afiliado el empleado. Estas entidades se deben crear como tipo de
tercero proveedor, así: **Ingrese a la pestaña Datos proveedor y active la
opción:**"Proveedor entidad de nómina..."**. **


![ConfTiposEntidadReq.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTiposEntidadReq.png)


## Preparación de la información

Verificar las entidades a las cuales se encuentra afiliado el empleado y
requieran ser configuradas como entidades de nómina.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de tipo de entidad **\[Cinta de opciones: Pestaña Básico >
Desplegar el Menú: Catálogo de terceros > Tipos de entidad\]**.

Seleccione la entidad de nómina a configurar.

Ejemplo:

**\- CCF** – Caja de Compensación Familiar.


![ConfTiposEntidadPaso3.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTiposEntidadPaso3.png)

Seleccione del catálogo de terceros, el tercero por defecto al cual hace
referencia la entidad, ejemplo: CAFAM.


![ConfTiposEntidadPaso4.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTiposEntidadPaso4.png)

##  Configuración de conceptos de nómina

En esta sección se definen los conceptos de nómina que se calcularán al
momento de registrar el pago de nómina.

## Requisitos

Verificar los conceptos de nómina que maneja la empresa. Tener creadas y
configuradas las cuentas contables de nómina y los tipos de entidades.

## Preparación de la información

Defina la recurrencia, la forma de cálculo, el manejo contable con las cuentas
auxiliares a afectar y la entidad de nómina, que el sistema usará para generar
la imputación contable por cada concepto de nómina.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de conceptos de nómina **\[Cinta de opciones: Pestaña
Nómina > Conceptos de nómina\].**.

Seleccione el concepto a configurar.

Ejemplo:

**\- DTO\_SALUD** \- Aporte salud empleado


![ConfConpNomPaso2.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfConpNomPaso2.png)


Configure en el concepto seleccionado la información solicitada en la pestaña
definición, pago recurrente, la forma de cálculo, el manejo contable con las
cuentas auxiliares a afectar y la entidad de nómina, que el sistema usará para
generar la imputación contable por cada concepto de nómina y la vigencia.


![ConfConpNomPaso3.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfConpNomPaso3.png)


**Nota:** Tenga presente que la mayoría de los conceptos vienen con una
configuración por defecto en la pestaña **"forma de cálculo"**. Los campos
como valor, cantidad y porcentaje son formulados y de forma automática se
realizará el cálculo en el momento de hacer el pago.



##  Creación perfiles de contratos

En esta sección se configuran los perfiles de contratos que se cargarán en los
contratos de los empleados.

## Requisitos

Configurar los conceptos de nómina que aplican para la empresa.

## Preparación de la información

Defina los tipos de contratos, periodos de pagos, métodos de pago, clases de
riegos, tipos de salarios y conceptos de nómina que maneja la empresa para sus
empleados.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Perfiles de contratos **\[Cinta de opciones: Pestaña
nómina > Catálogo Perfiles de contratos\]**.

Seleccione el perfil a configurar y dé clic derecho modificar.

En la **Pestaña definición** , configure el tipo de contrato, periodo de pago,
forma de pago, método de pago, clase de riesgos, tipo de salario e intesidad
horaria que tendrán los empleados que se les configure este perfil de
contrato. Adicionalmente defina si este perfil va a manejar o no salario
basado en el mínimo, extranjeros que no cotizan pensión y colombiano en el
exterior.


![ConfPerfilNomPaso3.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfPerfilNomPaso3.png)


En la **Pestaña conceptos de nómina** , defina los conceptos que aplican para
el perfil de contrato según su comportamiento. Por ejemplo: **Devengos**
\(Sueldos, Auxilio de transporte…\), **Prestaciones** \(Prima,
Cesantías…\),**Deducciones** \(Aporte a salud, Aporte a pensión…\), **Costo
empresa** \(Aportes a salud empleador, Aportes ARL…\).


![ConfPerfilNomPaso4.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfPerfilNomPaso4.png)


##  Creación de los terceros empleados

En esta sección se crean en el catálogo de terceros, todos aquellos terceros
que tienen un contrato laboral con la empresa.

## Requisitos

Tener configurados los conceptos de nómina, perfiles de contratos y crear los
terceros entidad de nómina.

## Preparación de la información

Conocer toda la información relacionada con el empleado, datos de contacto,
tipo de contrato, entidades a las cuales se encuentra afiliado, entre otros.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Terceros **\[Cinta de opciones: Pestaña Básico >
Catálogo Terceros\]**.

Dé clic derecho sobre el catálogo y seleccione la opción **Crear** , o en la
cinta de opción clic en la opción **Crear**.


![ConfTercEmpPaso2.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTercEmpPaso2.png)


Seleccione el tipo de tercero **Empleado**.


![ConfTercEmpPaso3.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTercEmpPaso3.png)


En la pestaña **Datos empleado** , en la opción **Contratos** dé clic en
adicionar para crear el contrato del empleado.


![ConfTercEmpPaso4.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTercEmpPaso4.png)


En la opción crear **Datos de contratos** , configure el número de contrato,
el perfil de contrato, fecha de inicio y finalización del contrato, centro de
costos, tipos de salario, el jefe inmediato y demás información que solicite
el asistente.


![ConfTercEmpPaso5.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTercEmpPaso5.png)


En la opción **Conceptos de nómina asociados al contrato** , defina para el
empleado qué conceptos aplica según su comportamiento.


![ConfTercEmpPaso6.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTercEmpPaso6.png)


**Nota:** Al configurar un perfil de contrato se cargarán de forma automática
los conceptos de nómina asignado a dicho perfil. Se recomienda adicionar o
quitar los conceptos que apliquen para cada empleado según sea requerido.

En la opción **Entidades de nómina** defina para cada entidad el tercero
proveedor de nómina en que se encuentra afiliado el empleado.


![ConfTercEmpPaso7.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CConfTercEmpPaso7.png)


**Nota:** En caso de no indicar las entidades de nómina del empleado, el
sistema tomará por defecto el tercero referencia definido en el catálogo de
tipos de entidad.

En la pestaña **Cuenta bancaria** configure los datos de la cuenta del
empleado a la cual se realizarán los respectivos pagos de nómina.


##  Configuración del documento de soporte para Pago de nómina.

Esta sección indica cómo configurar el documento de soporte a usar en el
proceso de Pago de Nómina.

## Requisitos

No hay requisitos.

## Preparación de la información

Defina la máscara del documento para el pago de nómina. Para mas información
sobre la máscara, ver [aquí](<https://www.contapyme.com/capacitacion-virtual/#/CP40MOD094>).

**Nombre** | **Máscara**
---|---
Pago de nómina | NPG\#
Pago de nómina | NPG@@&&\#

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de documentos de soporte **\[Cinta de opciones: Pestaña
Básico > Doc. soporte\].**


![confDosopPagoPaso1.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CconfDosopPagoPaso1.png)


Ubicar el documento que tiene por nombre **“Pago de nómina”** y modificar su
información.
**\(Menú superior, opción: Modificar. O Clic derecho, opción: Modificar\)**


![confDosopPagoPaso2.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CconfDosopPagoPaso2.png)


Indicar en el encabezado la empresa que usará el documento y complemente el
registro de información de la pestaña **"Definición del documento"**.

Ingrese a la pestaña: **Definición del documento > Menú izquierdo, opción:
Numeración: **

    * Verificar el tipo de numeración: **“Automática”**.
    * **Numeración:** Registrar el prefijo, su consecutivo inicial y consecutivo final, fecha inicial y fecha final.

![confDosopPagoPaso3.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CconfDosopPagoPaso3.png)


Complementar el registro de información de Definición del documento:
**Acciones**.

**Pestaña:Definición del documento. Menú izquierdo, opción: Acciones.**

    * Verificar que esté activa la opción: **“Envío de email automático”**.
    * Verificar que esté activa la opción: **“Solicitar aprobación al finalizar”**.

![confDosopPagoPaso4.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CconfDosopPagoPaso4.png)


Complementar el registro de información en Impresión de documento.

**Pestaña: Impresión de documento.**

    * En documento de impresión por defecto y alterno, verificar que esté seleccionado el documento que tiene por nombre:**“Comprobante de pago de nómina”**.

![confDosopPagoPaso5.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CconfDosopPagoPaso5.png)


Complementar el registro de información en Envío de email.

**Pestaña: Envío de email.**

    * Verificar que esté configurado el envío de email con el encabezado de información de la empresa y la opción para enviar al cliente **\[Tercero\]**.
    * Verificar que en la opción “tipo de contenido” esté activa la opción Documento en HTML y configurado el código de documento HTML **“Comprobante de pago de nómina”**.

![confDosopPagoPaso6.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/.%5CconfDosopPagoPaso6.png)


Finalizar la configuración dando clic en la opción:**“Aceptar”**



##  Configuración del documento de soporte para novedad de nómina.

Esta sección indica cómo configurar el documento de soporte Novedad de nómina.

## Requisitos

No hay requisitos.

## Preparación de la información

Defina la máscara del documento Novedad de nómina según lo requiera.

**Nombre** | **Máscara**
---|---
Novedad de nómina | NN\#
Novedad de nómina | NN@@&&\#\#


### Requisitos

Tener activado la configuración **"Manejo de nómina electrónica"** en la empresa > Pestaña servicios electrónicos.

### Preparación de la información

Defina la máscara del documento para la novedad de nómina electrónica.

| **Nombre** | **Máscara** |
|------------|-------------|
| Novedad de nómina | NOV# |

### Procedimiento en [ContaPyme]

**Paso 1:** Ingrese al catálogo de documentos de soporte **[Cinta de opciones: Pestaña Básico > Doc. soporte]**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopPagoPaso1.png)

**Paso 2:** Ubicar el documento que tiene por nombre **"Novedad de nómina"** y modificar su información.  
*(Menú superior, opción: Modificar. O Clic derecho, opción: Modificar)*

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopNovPaso2.png)

**Paso 3:** Indicar en el encabezado la empresa que usará el documento y complemente el registro de información de la pestaña **"Definición del documento"**.

**Paso 3.1:** Ingrese a la pestaña: **Definición del documento > Menú izquierdo, opción: Numeración:**

- Verificar el tipo de numeración: **"Automática"**.
- **Numeración:** Registrar el prefijo, su consecutivo inicial y consecutivo final, fecha inicial y fecha final.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopNovPaso3.png)

Finalizar la configuración dando clic en la opción: "Aceptar"

---

## Configuración del documento de soporte para Reporte de nómina

Esta sección indica cómo configurar el documento de soporte a usar en el proceso de Reporte pago de nómina electrónica.

### Requisitos

Tener activado la configuración **"Manejo de nómina electrónica"** en la empresa > Pestaña servicios electrónicos.

### Preparación de la información

Defina la máscara del documento para el reporte de nómina electrónica.

| **Nombre** | **Máscara** |
|------------|-------------|
| Reporte de nómina electrónica | RNE# |

### Procedimiento en [ContaPyme]

**Paso 1:** Ingrese al catálogo de documentos de soporte **[Cinta de opciones: Pestaña Básico > Doc. soporte]**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopPagoPaso1.png)

**Paso 2:** Ubicar el documento que tiene por nombre **"Reporte de nómina electrónica"** y modificar su información.  
*(Menú superior, opción: Modificar. O Clic derecho, opción: Modificar)*

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepNomPaso2.png)

**Paso 3:** Indicar en el encabezado la empresa que usará el documento y complemente el registro de información de la pestaña **"Definición del documento"**.

**Paso 3.1:** **Pestaña: Definición del documento. Menú izquierdo, opción: Numeración:**

- **Activar la opción:** "Hace parte de nómina electrónica".
- Verificar el tipo de numeración: **"Automática"**
- **Numeración:** Registrar el prefijo, su consecutivo inicial y consecutivo final.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepNomPaso3.png)

**Paso 4:** Complementar el registro de información de Definición del documento: **Acciones**.

**Paso 4.1:** **Pestaña: Definición del documento. Menú izquierdo, opción: Acciones.**

- Verificar que esté activa la opción: **"Envío de email automático"**.
- Verificar que esté activa la opción: **"Solicitar aprobación al finalizar"**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepNomPaso4.png)

**Paso 5:** Complementar el registro de información en Nómina electrónica.

**Paso 5.1:** **Pestaña: Nómina electrónica.**

- Seleccionar al proveedor tecnológico correspondiente, por ejemplo: **"Cadena"**
- Verificar que tipo de documento sea: **"Nómina electrónica"**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepNomPaso5.png)

Finalizar la configuración dando clic en la opción: "Aceptar"

---

## Configuración del documento de soporte para Reporte de ajuste de nómina

Esta sección indica cómo configurar el documento de soporte a usar en el proceso de Reporte de ajuste de nómina electrónica.

### Requisitos

Tener activado la configuración **"Manejo de nómina electrónica"** en la empresa > Pestaña servicios electrónicos.

### Preparación de la información

Defina la máscara del documento para el reporte de ajuste de nómina electrónica.

| **Nombre** | **Máscara** |
|------------|-------------|
| Reporte de nómina electrónica | RNA# |

### Procedimiento en [ContaPyme]

**Paso 1:** Ingrese al catálogo de documentos de soporte **[Cinta de opciones: Pestaña Básico > Doc. soporte]**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopPagoPaso1.png)

**Paso 2:** Ubicar el documento que tiene por nombre **"Reporte de ajuste de nómina electrónica"** y modificar su información.  
*(Menú superior, opción: Modificar. O Clic derecho, opción: Modificar)*

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDocRepAjPaso2.png)

**Paso 3:** Indicar en el encabezado la empresa que usará el documento y complemente el registro de información de la pestaña **"Definición del documento"**.

**Paso 3.1:** **Pestaña: Definición del documento. Menú izquierdo, opción: Numeración:**

- **Activar la opción:** "Hace parte de nómina electrónica".
- Verificar el tipo de numeración: **"Automática"**
- **Numeración:** Registrar el prefijo, su consecutivo inicial y consecutivo final.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDocRepAjPaso3.png)

**Paso 4:** Complementar el registro de información de Definición del documento: **Acciones**.

**Paso 4.1:** **Pestaña: Definición del documento. Menú izquierdo, opción: Acciones.**

- Verificar que esté activa la opción: **"Envío de email automático"**.
- Verificar que esté activa la opción: **"Solicitar aprobación al finalizar"**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDocRepAjPaso4.png)

**Paso 5:** Complementar el registro de información en Nómina electrónica.

**Paso 5.1:** **Pestaña: Nómina electrónica.**

- Seleccionar al proveedor tecnológico correspondiente, por ejemplo: **"Cadena"**
- Verificar que tipo de documento sea: **"Ajuste nómina electrónica"**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDocRepAjPaso5.png)

Finalizar la configuración dando clic en la opción: **"Aceptar"**

---

## Configuración del documento de soporte para Reporte de anulación de nómina

Esta sección indica cómo configurar el documento de soporte a usar en el proceso de Reporte de anulación de nómina electrónica.

### Requisitos

Tener activado la configuración **"Manejo de nómina electrónica"** en la empresa > Pestaña servicios electrónicos.

### Preparación de la información

Defina la máscara del documento para el reporte de ajuste de nómina electrónica.

| **Nombre** | **Máscara** |
|------------|-------------|
| Reporte de nómina electrónica | RNB# |

### Procedimiento en [ContaPyme]

**Paso 1:** Ingrese al catálogo de documentos de soporte **[Cinta de opciones: Pestaña Básico > Doc. soporte]**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopPagoPaso1.png)

**Paso 2:** Ubicar el documento que tiene por nombre **"Reporte de anulación nómina electrónica"** y modificar su información.  
*(Menú superior, opción: Modificar. O Clic derecho, opción: Modificar)*

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepAnuPaso2.png)

**Paso 3:** Indicar en el encabezado la empresa que usará el documento y complemente el registro de información de la pestaña **"Definición del documento"**.

**Paso 3.1:** **Pestaña: Definición del documento. Menú izquierdo, opción: Numeración:**

- **Activar la opción:** "Hace parte de nómina electrónica".
- Verificar el tipo de numeración: **"Automática"**
- **Numeración:** Registrar el prefijo, su consecutivo inicial y consecutivo final.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepAnuPaso3.png)

**Paso 4:** Complementar el registro de información de Definición del documento: **Acciones**.

**Paso 4.1:** **Pestaña: Definición del documento. Menú izquierdo, opción: Acciones.**

- Verificar que esté activa la opción: **"Solicitar aprobación al finalizar"**.

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepAnuPaso4.png)

**Paso 5:** Complementar el registro de información en Nómina electrónica.

**Paso 5.1:** **Pestaña: Nómina electrónica.**

- Seleccionar al proveedor tecnológico correspondiente, por ejemplo: "Cadena"
- Verificar que tipo de documento sea: "Ajuste nómina electrónica".

![](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/045%20NO/confDosopRepAnuPaso5.png)

Finalizar la configuración dando clic en la opción: **"Aceptar"**

---

## Guías relacionadas

- [Guía de montaje sistema básico](../010%20BS/[GM][10]%20Guia%20de%20montaje%20modulo%20basico.html)

---

**¡Y listo!** Podrá empezar a registrar operaciones de pago de nómina y novedades de nómina.