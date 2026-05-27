# gm_contabilidad.md
> **Propósito:** Documentar procedimientos paso a paso del módulo **Contabilidad**, garantizando que Paty IA pueda explicar procesos con claridad y precisión.
> **Tipo de documento:** Guía de montaje (GM)
> **Función:** Procedimientos detallados 
> **Fecha:** 11/11/2025
> **Versión:** 1

---

# Guía de montaje

##  CONCILIACIÓN BANCARIA MANUAL

Esta guía lo orientará en el montaje de un sistema de conciliación bancaria
manual en \[ContaPyme\]. Su alcance se limita a llevar el control de los
diferentes movimientos bancarios que se contabilicen y la opción de poderlos
conciliar uno a uno, realizando la comparación manual con el extracto
bancario.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que cumplir previamente al
montaje del módulo de conciliación bancaria manual.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Capacitación del módulo

Realice el proceso de capacitación del módulo de conciliación bancaria manual.
Ver Curso de Conciliación bancaria manual.
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD020>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje.
Ver Acerca del módulo de Conciliación bancaria manual
[aquí](<?id=\[AD\]2010>).

##  Activación del manejo de conciliación bancaria

En esta sección se explica cómo activar en \[ContaPyme\] el manejo de
conciliación bancaria. Cuando se activa el manejo de conciliación bancaria el
sistema empieza a realizar control sobre los movimientos bancarios a partir de
una fecha específica.

## Requisitos

No se requiere.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas **\[Cinta de opciones: Pestaña contabilidad >
Plan de cuentas\]**

Dé clic al botón “Configuración” ubicado en la cinta de opciones.

En la ventana de configuración busque en el menú del lado izquierdo la opción
“Conciliación bancaria” y proceda a activar la opción “Realizar control de
movimientos para la conciliación bancaria”, ubicada al lado derecho del menú

Luego de activar la opción, debe indicar la fecha de inicio de control de los
movimientos de conciliación bancaria y adicionalmente puede activar la opción
“Realizar control estricto de los tipos de movimiento bancario”, para que el
sistema verifique que los tipos de movimiento bancario indicados en las
transacciones sean válidos.

En esta pestaña ejecute el “Asistente de configuración inicial del catálogo de
grupos de inventario”.


##  Creación de cuentas de conciliación

Esta sección indica cómo crear las cuentas a las cuales se les realizará
control de los movimientos bancarios para luego realizar la conciliación de
los mismos.

## Requisitos

Tenga creadas las cuentas auxiliares de banco en el catálogo de cuentas.

Tenga creados en el catálogo de terceros a los bancos correspondientes a cada
cuenta.


## Preparación de la información

Realice un listado de las cuentas a las cuales desea realizarles control de
los movimientos bancarios, discriminando el código de la cuenta con la que
está creada en \[ContaPyme\] y el tercero banco al que corresponde la cuenta.


Ejemplo:

Código de la cuenta | Nombre de la cuenta | Banco
---|---|---
11100505 | Cta. Cte. Banco de Colombia | Banco de Colombia
11100510 | Cta. Cte. Banco Nacional | Banco Nacional
11100515 | Cta. Cte. Banco del Pacífico | Banco del Pacífico

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas de conciliación **\[Cinta de opciones: Pestaña
contabilidad > Cuentas conciliación\]**.

Dé clic en el botón “Crear” ubicado en la cinta de opciones y proceda a
digitar el código de la cuenta; o si lo prefiere, puede buscar la cuenta
abriendo el seleccionador de cuentas. Una vez ubicada la cuenta, dé clic al
botón aceptar.

En el campo “Tercero” digite el código del tercero banco, o si lo prefiere,
puede buscar el tercero abriendo el seleccionador de terceros. Una vez ubicado
el tercero, dé clic al botón aceptar.


##  Revisión de los tipos de movimiento bancario generales

Esta sección indica cómo revisar los tipos de movimiento bancario generales y
cómo crear un nuevo tipo de movimiento bancario

## Requisitos

No se requiere.

## Preparación de la información

Liste los principales tipos de movimientos bancarios que maneja. Puede
asignarles un código libre.


Ejemplo:

CÓDIGO DEL MOVIMIENTO BANCARIO | TIPO DE MOVIMIENTO BANCARIO
---|---
CH | Cheques recibidos a la fecha
CI | Depósitos bancarios y consignaciones
CE | Transferencia y/o retiro



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de tipos de movimiento bancario **\[Cinta de opciones:
Pestaña Contabilidad > Plan de cuentas, despliegue la flecha hacia abajo >
Definición de tipos de movimiento bancario generales\]**.

Valide que los tipos de movimiento bancario que va a utilizar estén creados en
el listado.

Para crear un nuevo tipo de movimiento bancario dé clic al botón “Crear” y
diligencie el asistente de creación de tipos de movimiento bancario.



##  Revisión de los tipos de movimiento bancario específicos

Esta sección indica cómo revisar los tipos de movimiento bancario específicos
para cada cuenta de conciliación y cómo crear un nuevo tipo de movimiento
bancario específico.

## Requisitos

Tener creadas las cuentas de conciliación en el catálogo de cuentas de
conciliación bancaria.


## Preparación de la información

Liste los tipos de movimientos bancarios específicos que maneja cada cuenta de
conciliación bancaria. Puede asignarles un código libre.


Ejemplo:

CÓDIGO DEL MOVIMIENTO BANCARIO | TIPO DE MOVIMIENTO BANCARIO
---|---
GB | Gastos bancarios
IN | Intereses pagados
CM | Comisiones



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas de conciliación **\[Cinta de opciones: Pestaña
Contabilidad > Cuentas conciliación\].**

Dé clic derecho sobre la cuenta a la cual desea revisarle los tipos de
movimiento bancario y seleccione la opción “Definición de tipos de movimiento
bancario”.

Valide que los tipos de movimiento bancario específicos que va a utilizar
estén creados en el sistema.

Para crear un nuevo tipo de movimiento bancario dé clic al botón “Crear” y
diligencie el asistente de creación de tipos de movimiento bancario.




##  Ajuste inicial de conciliación bancaria

Esta sección indica cómo realizar el ajuste inicial de los saldos de las
cuentas de conciliación bancaria y los parámetros que se deben tener en cuenta
para este ajuste.

## Requisitos

Tener creadas las cuentas de conciliación en el catálogo de cuentas de
conciliación bancaria.


## Preparación de la información

Liste los saldos contables que tienen las cuentas bancarias que manejarán
conciliación. Debe tener presente la fecha en la cual realizará el ajuste
inicial.

Ejemplo:

CÓDIGO DE LA CUENTA | SALDO CONTABLE AL 31/12/2018
---|---
11100505 | $20.000.000
11100510 | $15.000.000
11100515 | $12.000.000



## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de cargue inicial de cuentas **\[Más operaciones >
Cargue inicial > Cargue inicial de cuentas\]**.

Diligencie la operación indicando por cada cuenta la siguiente información:

Cuenta | Centro de costos  | Débito o crédito  | Tipo de movimiento bancario
---|---|---|---
11100505 | N/A | $20.000.000 | 99
11100510 | N/A | $15.000.000 | 99
11100515 | N/A | $12.000.000 | 99

Realice la cantidad de cargues de cuentas que considere necesarios, teniendo
en cuenta que todos deben tener la misma fecha de soporte y en su conjunto
deben igualar débitos y créditos. Para conocer la descripción de cada campo
del asistente, consulte la ayuda dando clic derecho sobre el nombre del campo.


##  Configuración de la operación de conciliación bancaria

Esta sección indica cómo configurar la operación de conciliación bancaria para
que el proceso de ingreso de la información sea más ágil y oportuno.

## Requisitos

Realice todas las configuraciones requeridas en las secciones anteriores de
esta guía.


## Preparación de la información

No se requiere.


## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de conciliación bancaria **\[Más operaciones >
Contabilidad> Conciliación bancaria\]**.

En esta operación ejecute el **“Asistente de configuración inicial de la
operación de conciliación bancaria”.**


## Guías relacionadas

  * [Guía de montaje de contabilidad.](<?id=\[GM\]2030>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  CONTABILIDAD BÁSICO

Esta guía lo orientará en el montaje de un sistema contable básico en
\[ContaPyme\]. Su alcance se limita a llevar control de la contabilización de
las cuentas contenidas en el PUC y a la generación de los estados financieros
básicos y otros informes contables.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de contabilidad básico.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Capacitación del módulo

Realice el proceso de capacitación del módulo de contabilidad básico.
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD020>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje.
Ver Acerca del módulo de de contabilidad. [aquí](<?id=\[AD\]2010>).

##  Creación y configuración de las cuentas contables

Esta sección indica cómo crear y configurar las cuentas auxiliares que su
empresa requiere en el plan de cuentas. \[ContaPyme\] trae configurado por
defecto el catálogo de plan de cuentas seleccionado en la creación del área de
trabajo \(comercial, solidario, agrícola, internacional\).

## Requisitos

No hay requisitos.

## Preparación de la información

Realice un listado de las cuentas auxiliares que serán creadas en el Plan de
cuentas, las cuales serán usadas posteriormente en el registro de las
transacciones en el sistema.

Ejemplo:

Tipo | Nombre cuenta | Número cuenta
---|---|---
Cuentas de caja \(1105XXXX\) | Caja almacén | 11050505
| Caja administración | 11050510
Cuentas de bancos \(1110XXXX\) | Banco Nacional | 11100505
| Banco Santander | 11100510
| Banco Davivienda | 11100515
Cuentas de clientes \(1305XXXX\) | Clientes mostrador  | 13050505
| Clientes institucionales | 13050510
Cuentas de proveedores \(2205XXXX\) | Proveedores nacionales | 22050505

## Procedimiento en \[ContaPyme\]

Creación de las cuentas

Ingrese al catálogo de cuentas **\[Cinta de opciones: Pestaña contabilidad >
Plan de cuentas\]**.

Ejecute el “Asistente de configuración del catálogo de cuentas”.

Dé clic en el botón “Crear” y registre la información que le solicita el
asistente. Para conocer la descripción de cada campo del asistente consulte la
ayuda dando clic derecho sobre el nombre del campo.


Verificación de cuentas existentes

Ingrese al catálogo de cuentas **\[Cinta de opciones: Pestaña contabilidad >
Plan de cuentas\]**.

Ubíquese sobre la cuenta que desea consultar o editar y dé clic en el botón
“Modificar” que se encuentra en la cinta de opciones.

En la pestaña “General” valide la información de atributos, impuestos,
descuentos o cargos aplicables, realice las modificaciones pertinentes de
acuerdo con las necesidades de la empresa y dé clic en el botón “Aceptar” para
guardar los cambios.


##  Registro de cargue inicial de cuentas

Esta sección indica cómo realizar el cargue inicial de cuentas en
\[ContaPyme\].

## Requisitos

Tenga creadas las cuentas auxiliares, los terceros y los centros de costos
como se indica en el montaje de sistema básico.

## Preparación de la información

Tenga a disposición el mayor y balances con terceros, en donde se especifique
el saldo de cada cuenta por tercero y por cada referencia. Igualmente, para
las cuentas que apliquen, el saldo por centro de costos.

Ejemplo:

![contbasico1.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/020%20CN/contbasico1.jpg)
![contbasico2.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/020%20CN/contbasico2.jpg)

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de cargue inicial de cuentas**\[Más operaciones >
Cargue inicial > Cargue inicial de cuentas\]**.

Diligencie la operación indicando por cada cuenta la siguiente información:
Cuenta | Centro de costos | Débito o crédito | Valor base | Tercero en transacción | Tercero en cartera | Fecha de pago | Referencia
---|---|---|---|---|---|---|---
11100505 | N/A | 5.000.000 | N/A | N/A | N/A | N/A | N/A
13050505 | N/A | 850.000 | N/A | 102536925 | 102536925 | 1/2/18 | FV-501
13050505 | N/A | 270.000 | N/A | 30259874 | 30259874 | 15/2/18 | FV-521

Realice la cantidad de cargues de cuentas que considere necesarios, teniendo
en cuenta que todos deben tener la misma fecha de soporte y en su conjunto
deben igualar débitos y créditos. Para conocer la descripción de cada campo
del asistente, consulte la ayuda dando clic derecho sobre el nombre del campo.


##  Configuración de la operación de movimiento contable

Esta sección indica cómo configurar la operación de movimiento contable para
que el proceso de ingreso de la información sea más ágil y oportuno.

## Requisitos

Realice todas las configuraciones requeridas en las secciones anteriores de
esta guía.


## Preparación de la información

No se requiere.


## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de movimiento contable**\[Más operaciones >
Contabilidad> Movimiento contable\]**.

En esta operación ejecute el **“Asistente de configuración inicial de la
operación de movimiento contable”.**


## Guías relacionadas

  * [Guía de montaje de moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de flujos de efectivo.](<?id=\[GM\]2040>)
  * [Guía de montaje de conciliación bancaria manual](<?id=\[GM\]2020>)
  * [Guía de montaje de medios magnéticos.](<?id=\[GM\]2090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  FLUJOS DE EFECTIVO

Esta guía lo orientará en el montaje del sub módulo de flujos de efectivo. Su
alcance se limita en conocer las configuraciones que se pueden realizar en el
sub módulo de flujos de efectivo, el cual tiene como objetivo suministrar de
forma clara información sobre el manejo que se le ha dado al efectivo, es
decir, las entradas y salidas de efectivo que se han dado en la empresa
durante un periodo determinado y de esta forma realizar la visualización de
informe por el método directo.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de moneda extranjera.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Capacitación del módulo

Realice el proceso de capacitación del módulo de contabilidad básico.
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD020>).

## Capacitación del sub módulo

Estudie el documento Acerca del sub módulo, donde se explican todos los
conceptos de flujos de efectivo
Ver curso de conceptos de flujos de efectivo
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD050>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje.
Ver Acerca del módulo de contabilidad. [aquí](<?id=\[AD\]2010>).

##  Activación del manejo de flujos de efectivo

En esta sección se determina las configuraciones iniciales para el manejo de
flujos de efectivo.

## Requisitos

Tenga creada la empresa, las cuentas auxiliares, como se indica en el montaje
de sistema básico.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de plan de cuentas **\[Cinta de opciones: Contabilidad >
Plan de cuentas\]**.

Ingrese a la cuenta a la cual se le va activar la clase de efectivo**\[Clic
derecho sobre la cuenta auxiliar > Modificar > Clase: “2- De efectivo”\]**.

Configure la fecha a partir de la cual se llevará control del flujo de
efectivo

Active la opción “Exigir flujos de efectivo en cuentas de efectivo”.


##  Configuración de las cuentas que manejan flujo de efectivo

En esta sección se determina cuáles de las cuentas contenidas en el catálogo
de cuentas, serán las que manejen flujos de efectivo.

## Requisitos

Tener previamente creadas las cuentas auxiliares a las que se le definirán el
manejo de flujos de efectivo.

  * 110505 Caja general.
  * 111005 Moneda nacional.
  * 111010 Moneda extranjera.


## Preparación de la información

No se requiere.


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de plan de cuentas **\[Cinta de opciones: Contabilidad >
Plan de cuentas\]**.

Ingrese a la cuenta a la cual se le va activar la clase de efectivo **\[Clic
derecho sobre la cuenta auxiliar > Modificar > Clase: “2- De efectivo”\]**.


##  Creación de conceptos de flujos de efectivo

En esta sección se determina el listado de conceptos de flujo de efectivo que
la empresa tendrá disponibles para registrar sus transacciones diarias y para
generar el informe de flujo de efectivo por el método directo.

## Requisitos

No hay requisitos.

## Preparación de la información

Realice un listado de los conceptos tanto de fuentes como de usos, los cuales
serán usados posteriormente en el registro de las transacciones en el sistema
y consulta de informes.
Una estructura simple de conceptos de flujos de efectivo podría simplemente
contener un listado de las fuentes y usos más comunes.

Ejemplo:

Fuentes | Usos
---|---
Efectivo recibido de los clientes | Pago a proveedores
Venta de activos fijos | Pago a empleados
Cobro de préstamos  | Pago de préstamos

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de flujos de efectivo **\[Cinta de opciones: Contabilidad
> Menú: Flujos de efectivo\]**.

Dé clic en el botón “Crear” y registre la información que le solicita el
asistente. Para conocer la descripción de cada campo del asistente consulte la
ayuda dando clic derecho sobre el nombre del campo.


## Guías relacionadas

  * [Guía de montaje de Contabilidad.](<?id=\[GM\]2030>)
  * [Guía de montaje de moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de conciliación bancaria manual.](<?id=\[GM\]2020>)
  * [Guía de montaje de medios magnéticos.](<?id=\[GM\]2090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  MONEDA EXTRANJERA

Esta guía lo orientará en el montaje del sub módulo de moneda extranjera. Su
alcance se limita en conocer las configuraciones que se pueden realizar en el
sub módulo de moneda extranjera para el registro de información en diferentes
monedas, ajustes por diferencia en cambio y visualización de informes.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de moneda extranjera.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Capacitación del módulo

Realice el proceso de capacitación del módulo de contabilidad básico.
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD020>).

## Capacitación del sub módulo

Estudie el documento Acerca del sub módulo, donde se explican todos los
conceptos de moneda extranjera.
Ver Acerca del módulo de moneda extranjera.
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD075>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje.
Ver Acerca del módulo de de contabilidad. [aquí](<?id=\[AD\]2010>).

##  Activación del manejo de moneda extranjera

En esta sección se determina las configuraciones iniciales para el manejo de
moneda extranjera.

## Requisitos

Tenga creada la empresa, las cuentas auxiliares, como se indica en el montaje
de sistema básico.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de plan de cuentas **\[Cinta de opciones: Contabilidad >
Plan de cuentas\]**.

Ingrese a las configuraciones del catálogo **\[Catálogo de plan de cuentas >
Configuraciones > Configuraciones generales > Manejo de moneda extranjera > Y
active la opción “Habilitar el manejo de moneda extrajera”\]**.

Posteriormente configure las opciones que solicita el asistente:

  * La moneda local de la empresa.
  * La moneda a usar para el cambio \(Si la tasa de cambio es general TRM o tasa de compra y tasa de venta.
  * Si requiere que la tasa de cambio se registre diariamente.
  * Si requiere habilitar los ajustes de diferencia en cambio cada vez que se realice un movimiento.
  * Si requiere habilitar ajustes de diferencia en cambio cada que se procese la operación de registro de tasa de cambio.
  * Configuré la empresa donde se van a mantener actualizadas las tasas de cambio por medio de la operación “registro de tasa de cambio”.


##  Configuración de las cuentas que manejan moneda extranjera

En esta sección se determina cuáles de las cuentas contenidas en el catálogo
de cuentas, serán que manejen moneda extranjera.

## Requisitos

Tener previamente creadas las cuentas auxiliares a las que se le definirán el
manejo de moneda extranjera.

  * 111010 Banco del exterior.
  * 130510 Cartera clientes del exterior.
  * 221001 Proveedores del exterior.


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de plan de cuentas **\[Cinta de opciones: Contabilidad >
Plan de cuentas\]**.

Ingrese a la cuenta a la cual se le va activar el manejo de moneda extranjera
**\[Clic derecho sobre la cuenta auxiliar > Modificar > Activar la opción:
“Manejo de moneda extranjera”\]**.

Posteriormente seleccione la moneda que manejará la cuenta.


##  Creación de monedas

En esta sección se determina el listado de monedas que la empresa tendrá
disponibles para registrar sus transacciones diarias y para generar sus
informes financieros en moneda extranjera.

## Requisitos

No hay requisitos.

## Preparación de la información

Realice un listado de las monedas que serán creadas en el catálogo de monedas,
las cuales serán usadas posteriormente en el registro de las transacciones en
el sistema y consulta de informes.

Ejemplo:

Código | Nombre Moneda | Unidad | Símbolo | Abreviatura
---|---|---|---|---
10 | Peso | Pesos | $ | COP
20 | Dólar | Dólares | U$ | USD
30 | Euro | Euros | € | EUR

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de monedas **\[Cinta de opciones: Contabilidad > Menú:
Plan de cuentas > Monedas\]**.

Dé clic en el botón “Crear” y registre la información que le solicita el
asistente. Para conocer la descripción de cada campo del asistente consulte la
ayuda dando clic derecho sobre el nombre del campo.


## Guías relacionadas

  * [Guía de montaje de Contabilidad.](<?id=\[GM\]2030>)
  * [Guía de montaje de flujos de efectivo.](<?id=\[GM\]2040>)
  * [Guía de montaje de conciliación bancaria manual.](<?id=\[GM\]2020>)
  * [Guía de montaje de medios magnéticos.](<?id=\[GM\]2090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  MEDIOS MAGNÉTICOS

Esta guía lo orientará en el montaje de un sistema de generación de
información exógena en \[ContaPyme\]. Su alcance se limita a generar la
información contable consolidada y los principales formatos de medios
magnéticos para subirlos a la plataforma de la DIAN.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de medios magnéticos.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Montaje del módulo de contabilidad básico

Realice el montaje del módulo de contabilidad básico \(cargue inicial de
cuentas y configuración de la operación de movimiento contable\).
Ver Guía de montaje de contabilidad. [aquí](<?id=\[GM\]2030>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje.
Ver Acerca del módulo de de contabilidad. [aquí](<?id=\[AD\]2010>).

##  Configuración de los formatos

Esta sección indica cómo configurar los formatos para generar información
exógena en \[ContaPyme\].

## Requisitos

Tenga creadas las cuentas auxiliares como se indica en el montaje de sistema
básico.

## Preparación de la información

Tenga a disposición los códigos de las cuentas y el tipo de saldo que manejará
para cada concepto y para cada total. Igualmente tenga el listado de las
cuentas que deberán ser excluidas.


Ejemplo:

Cód. concepto | Nombre concepto | Cuenta | Tipo saldo | Cuenta no aplica
---|---|---|---|---
5001 | Salarios, prestaciones sociales y demás pagos laborales | 5105, 5205 | S \(saldo\) | 510530, 510533, 510539, 510551, 510554, 510559
5008 | Compra de activos fijos  | 1504, 1506, 1508 | D \(débito\) |
5010 | Aportes parafiscales  | 237010 | D \(débito\) |

## Procedimiento en ContaPyme

Ingrese al catálogo de medios magnéticos **\[Cinta de opciones: Pestaña
Contabilidad > Medios magnéticos\].**.

Ingrese a cada uno de los formatos y en la pestaña “Definición de conceptos”
encontrará los siguientes campos:

  * Conceptos: es el listado de cada uno los conceptos de los formatos, en los cuales encontrará código, nombre y tope que aplica.
  * Total: es cada uno de los totales para los cuales aplica cada concepto y por cada total podrá definir las cuentas que incluye y las cuentas que no aplican.
  * Cuentas que incluye: es el listado de las cuentas contables y el tipo de saldo con las cuales se calculará el valor para el concepto y el total correspondiente.
  * Cuentas que no aplican: es el listado de cuentas que no se tendrán en cuenta para el cálculo del concepto.
  * Filtro: a cada total se le puede agregar un filtro avanzado para incluir o excluir otros parámetros como por ejemplo tipos de documentos de soporte, centros de costos, terceros, etc.

![medmagnt1.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/020%20CN/medmagnt1.jpg)
.

Una vez ha realizado la parametrización de cada total y cada concepto, dé clic
al botón aceptar.


##  Generación de los formatos

Esta sección indica cómo generar los formatos una vez se han configurado.

## Requisitos

Realice todas las configuraciones en cada uno de los formatos.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de medios magnéticos **\[Cinta de opciones: Pestaña
Contabilidad > Medios magnéticos\]**.

Seleccione el formato a generar y dé clic al botón “Generar” ubicado en la
cinta de opciones. En la ventana que el sistema genera, debe indicar si desea
consolidar la información de todas las empresas del área de trabajo,
seleccionar la fecha inicial y final entre la cual se generará la información
y si dicha información se tomará de la contabilización local o NIIF.
Finalmente dé clic al botón aceptar.
![medmagnt2.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/020%20CN/medmagnt2.jpg)
.

Luego de generada la información, debe verificar cada uno de los valores y
totales. Si necesita cambiar algún dato puede hacerlo en el listado, pero este
no quedará guardado en la base de datos de la información. Es recomendable
realizar las correcciones directamente en los registros del sistema y
posteriormente volver a generar el formato..

Una vez la información ha sido revisada y se encuentra correcta, dé clic al
botón “Generar XML” ubicado en la cinta de opciones. En la ventana que el
sistema genera, encontrará la siguiente información:

  * Año de envío: es el año en el cual se hará el envío de la información generada.
  * Concepto: es el concepto de envío del formato, ya sea si es nuevo o si es un remplazo.
  * Código del formato: es el código de identificación del formato.
  * Versión del formato: es la versión en cual se encuentra el formato, esta versión es dada por la DIAN.
  * Número de envío: es el número de veces que el formato ha sido enviado.
  * Fecha de envío: indica la fecha y hora en la que se está generado el formato.
  * Fecha inicial: es la fecha inicial desde la cual se tomó la información para la generación del formato.
  * Fecha final: es la fecha final hasta la cual se tomó la información para la generación del formato.
![medmagnt3.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/020%20CN/medmagnt3.jpg)
Luego de revisar cada uno de los datos allí consignados, dé clic al botón
aceptar.

.

El sistema abrirá una nueva ventana en la cual mostrará la ruta en la cual ha
quedado el formato generado en archivo XML y desde allí podrá acceder a la
carpeta donde se encuentra dicho archivo. Ese archivo será que el usted deberá
subir a la página de la DIAN.
![medmagnt4.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/020%20CN/medmagnt4.jpg).


## Guías relacionadas

  * [Guía de montaje de Contabilidad.](<?id=\[GM\]2030>)
  * [Guía de montaje de flujos de efectivo.](<?id=\[GM\]2040>)
  * [Guía de montaje de conciliación bancaria manual.](<?id=\[GM\]2020>)
  * [Guía de montaje de moneda extranjera.](<?id=\[GM\]2050>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].
