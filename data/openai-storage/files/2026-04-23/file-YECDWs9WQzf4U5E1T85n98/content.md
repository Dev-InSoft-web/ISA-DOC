# gm_cartera_proveedores.md
> **Propósito:** Documentar procedimientos paso a paso del módulo **Cartera y Proveedores**, garantizando que Paty IA pueda explicar procesos con claridad y precisión.
> **Tipo de documento:** Guía de montaje (GM)
> **Función:** Procedimientos detallados 
> **Fecha:** 11/11/2025
> **Versión:** 1

---

# Guía de montaje

## CARTERA Y PROVEEDORES

Esta guía lo orientará en el montaje de un sistema de cuentas por cobrar y
cuentas por pagar en \[ContaPyme\]. Su alcance se limita a llevar control de
las cuentas por cobrar y pagar a través de diferentes informes y la creación y
cancelación de las cuentas por cobrar y por pagar.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de cartera y proveedores.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Para más información consulte la Guía de montaje de sistema básico
[aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de cartera y proveedores

Realice el proceso de capacitación del módulo de cartera y proveedores.
Ver Curso de Cartera y proveedores
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD080>).

## Ver acerca del módulo

Estudie el documento Acerca de cartera y proveedores, donde se explican todos
los conceptos necesarios para entender esta guía de montaje
[aquí](<?id=\[AD\]3010>).

##  Configuración de las cuentas de cartera y proveedores

Esta sección indica cómo configurar las cuentas de cartera y proveedores que
su empresa requiere en el plan de cuentas. \[ContaPyme\] trae configuradas por
defecto algunas cuentas de cartera y proveedores de acuerdo al catálogo de
plan de cuentas seleccionado en la creación del área de trabajo \(comercial,
solidario, agrícola, internacional\).
Se recomienda realizar esta configuración con el acompañamiento y asesoría del
contador de la empresa.

## Requisitos

Tener creadas las cuentas de cartera y proveedores.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas **\[Cinta de opciones: Pestaña contabilidad >
Plan de cuentas\]**.

Busque cada una de las cuentas de cartera y proveedores.

Dé clic en el botón "Modificar" y marque los atributos de "Controla cartera
y/o proveedores para informes", "Maneja tercero", "Discrimina por tercero" y
"Exige referencia".
Para conocer la descripción de cada campo del asistente consulte la ayuda
dando clic derecho sobre el nombre del campo.




##  Configuración de los terceros

Esta sección indica cómo configurar los terceros clientes y proveedores para
llevar un adecuado control de las cuentas por cobrar y por pagar.

## Requisitos

Tener creados los terceros.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de terceros **\[Cinta de opciones: Pestaña básico >
Terceros\]**.

Busque cada uno de los terceros clientes y proveedores.

Dé clic en el botón "Modificar" y busque para el tercero cliente la pestaña
"Datos cliente", luego la pestaña "Principal" y allí podrá bloquear los
créditos al tercero. Posteriormente, en la pestaña "Créditos" podrá definir el
plazo en días para las cuentas por cobrar, el cupo de crédito y activar la
opción para que el sistema no permita exceder dicho cupo de crédito.

Para el tercero proveedor busque la pestaña "Datos proveedor" y luego la
pestaña "Datos control".
Allí podrá definir datos como el plazo en días para las cuentas por pagar y la
opción de bloquear pagos. Para conocer la descripción de cada campo del
asistente consulte la ayuda dando clic derecho sobre el nombre del campo.




##  Registro de cargue inicial de cuentas por cobrar y por pagar

Esta sección indica cómo realizar el cargue inicial de cuentas por cobrar y
por pagar en \[ContaPyme\].

## Requisitos

Tenga creadas las cuentas auxiliares, los terceros y los centros de costos
como se indica en el montaje de sistema básico.

## Preparación de la información

Tenga a disposición el listado de las cuentas de cartera y proveedores,
discriminando el saldo de cada cuenta por tercero, número de referencia y
fecha de pago.

Ejemplo:

![GM_CX_1.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/GM_CX_1.png)
![GM_CX_2.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/GM_CX_2.png)

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de cargue inicial de cuentas **\[Más operaciones >
Cargue inicial > Cargue inicial de cuentas\]**.

Diligencie la operación indicando por cada cuenta la siguiente información:

Cuenta | Centro de costos | Débito o crédito | Valor base | Tercero en transacción | Tercero en cartera | Fecha de pago | Referencia
---|---|---|---|---|---|---|---
13050505 | N/A | 850.000 | N/A | 102536925 | 102536925 | 1/2/18 | FV501
13050505 | N/A | 270.000 | N/A | 30259874 | 30259874 | 15/2/18 | FV521
22050105 | N/A | 520.000 | N/A | 900256996 | 900256996 | 23/3/18 | FC15425
22050105 | N/A | 1.300.000 | N/A | 75896000 | 75896000 | 10/1/18 | FC125

Realice la cantidad de cargues de cuentas que considere necesarios, teniendo
en cuenta que todos deben tener la misma fecha de soporte y en su conjunto
deben igualar débitos y créditos.
Para conocer la descripción de cada campo del asistente, consulte la ayuda
dando clic derecho sobre el nombre del campo.



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

Ingrese a la operación de movimiento contable **\[Más operaciones >
Contabilidad> Movimiento contable\]**.

En esta operación ejecute el **"Asistente de configuración inicial de la
operación de movimiento contable"**.



## Guías relacionadas

  * [Guía de montaje de programación de pagos.](<?id=\[GM\]3050>)
  * [Guía de montaje de deterioro de cartera.](<?id=\[GM\]3040>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

## DETERIORO DE CARTERA

Esta guía lo orientará en el montaje de un sistema de cálculo de deterioro de
cartera a través de tres métodos: por flujos futuros, costo amortizado y/o
porcentaje de probabilidad de no pago. Su alcance se limita a calcular el
valor a deteriorar para la cartera por uno o varios de los métodos, realizar
la respectiva contabilización y poder contabilizar las reversiones de
deterioro a que haya lugar.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de medios magnéticos.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte, documentos de
impresión y políticas empresariales en especial del manejo de inventarios\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de contabilidad básico

\(cargue inicial de cuentas y configuración de la operación de movimiento
contable\).
Para más información consulte la Guía de montaje de contabilidad
[aquí](<?id=\[GM\]2030>).

## Realice el montaje del módulo de cartera

\(configuración de las cuentas de cartera, configuración de los terceros,
cargue inicial de cuentas por cobrar y por pagar\).
Para más información consulte la Guía de montaje de cartera
[aquí](<?id=\[GM\]3030>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje [aquí](<?id=\[AD\]3010>).

##  Configuración de las cuentas de cartera para deterioro de cartera por
método de flujos futuros

Esta sección indica cómo configurar las cuentas de cartera para que manejen el
método de deterioro de flujos futuros.

## Requisitos

Tenga creadas y configuradas las cuentas de cartera como se indica en el
montaje de sistema básico y cartera.

## Preparación de la información

Liste las cuentas de cartera que vayan a aplicar el método de deterioro de
cartera por flujos futuros y adicionalmente, por cada cuenta, indique cuál
será la cuenta puente para los valores del deterioro, la cuenta del gasto por
deterioro y la cuenta de reversión del deterioro en periodo diferente.

Ejemplo:

Cód. cuenta | Nombre cuenta | Cuenta puente | Cuenta gasto deterioro | Cuenta reversión deterioro
---|---|---|---|---
130505 | Clientes nacionales | 139905 | 519910 | 429590
136505 | Cuentas por cobrar a trabajadores - vivienda | 139960 | 519910 | 429590
136515 | Cuentas por cobrar a trabajadores – educación | 139960 | 519910 | 429590

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas **\[Cinta de opciones: Pestaña Contabilidad >
Plan de cuentas\]**.

Busque las cuentas de cartera que manejará para deterioro de cartera por
método de flujos futuros.
Ingrese a la cuenta y dé clic a la opción "Deterioro cartera".

Active la opción "Activar el cálculo manual de flujo futuro en la operación de
deterioro de cartera".

Configure las cuentas puente, de gasto por deterioro y de ingresos para
reversión de deterioro. Dé clic al botón aceptar.



##  Configuración de las cuentas de cartera para deterioro de cartera por
método de probabilidad de no pago

Esta sección indica cómo configurar las cuentas de cartera para que manejen el
método de deterioro por probabilidad de no pago.

## Requisitos

Tenga creadas y configuradas las cuentas de cartera como se indica en el
montaje de sistema básico y cartera.

## Preparación de la información

Liste las cuentas de cartera que vayan a aplicar el método de deterioro de
cartera por probabilidad de no pago y adicionalmente, por cada cuenta, indique
cuál será la cuenta puente para los valores del deterioro, la cuenta del gasto
por deterioro y la cuenta de reversión del deterioro en periodo diferente.

Ejemplo:

Cód. cuenta | Nombre cuenta | Cuenta puente | Cuenta gasto deterioro | Cuenta reversión deterioro
---|---|---|---|---
130510 | Clientes del exterior | 139905 | 519910 | 429590
136510 | Cuentas por cobrar a trabajadores - vehículo | 139960 | 519910 | 429590
136520 | Cuentas por cobrar a trabajadores - médico | 139960 | 519910 | 429590

Defina por cada cuenta, los rangos de días y los porcentajes de probabilidad
de no pago de la cartera.


Ejemplo:

Rango de días | Probabilidad de no pago
---|---
1 - 90 días | 10%
91 - 180 días | 30%
181 - 360 días | 70%
361 – 9999 días | 100%

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas **\[Cinta de opciones: Pestaña Contabilidad >
Plan de cuentas\]**.

Busque las cuentas de cartera que manejará para deterioro de cartera por
método de probabilidad de no pago.
Ingrese a la cuenta y dé clic a la opción "Deterioro cartera".

Active la opción "Calcular automáticamente la probabilidad de no pago en la
operación de deterioro de cartera, basado en la siguiente tabla".

En la tabla que se activa en la parte de abajo, indique renglón por renglón el
rango de días y el porcentaje por cada rango, sin agregar el signo %.

![GM_DC_1.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/GM_DC_1.png)

Configure las cuentas puente, de gasto por deterioro y de ingresos para
reversión de deterioro. De clic al botón aceptar.



##  Configuración de las cuentas de cartera para deterioro de cartera por
método de costo amortizado

Esta sección indica cómo configurar las cuentas de cartera para que manejen el
método de deterioro por costo amortizado.

## Requisitos

Tenga creadas y configuradas las cuentas de cartera como se indica en el
montaje de sistema básico y cartera.

## Preparación de la información

Liste las cuentas de cartera que vayan a aplicar el método de deterioro de
cartera por probabilidad de no pago y adicionalmente, por cada cuenta, indique
cuál será la cuenta puente para los valores del deterioro, la cuenta del gasto
por deterioro y la cuenta de reversión del deterioro en periodo diferente.

Ejemplo:

Cód. cuenta | Nombre cuenta | Cuenta puente | Cuenta gasto deterioro | Cuenta reversión deterioro
---|---|---|---|---
136595 | Cuentas por cobrar a trabajadores - otros | 139965 | 519910 | 429590
138095 | Otros deudores | 139980 | 519910 | 429590

Defina por cada cuenta, la tasa efectiva anual o la nominal diaria con la cual
se calcularán los valores del deterioro.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas **\[Cinta de opciones: Pestaña Contabilidad >
Plan de cuentas\]**.

Dé clic al botón "Configuración" ubicado en la cinta de opciones.

En la ventana de configuración busque en el menú del lado izquierdo la opción
"Deterioro de cartera NIIF" y proceda a activar la opción "Habilitar cálculo
en los costos de amortización de una deuda", ubicada al lado derecho del menú.
Finalmente dé clic al botón aceptar.

Busque las cuentas de cartera que manejará para deterioro de cartera por
método de costo amortizado.
Ingrese a la cuenta y dé clic a la opción "Deterioro cartera".

Active la opción "Calcular costo amortizado para un periodo parcial" e indique
la tasa efectiva anual o nominal diaria.

![GM_DC_2.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/GM_DC_2.png)

Configure las cuentas puente, de gasto por deterioro y de ingresos para
reversión de deterioro. De clic al botón aceptar.



##  Configuración de la operación de deterioro de cartera

Esta sección indica cómo configurar la operación de deterioro de cartera para
que el proceso de ingreso de la información sea más ágil y oportuno.

## Requisitos

Realice todas las configuraciones requeridas en las secciones anteriores de
esta guía.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de deterioro de cartera **\[Más operaciones > Cartera >
Deterioro de cartera\]**.

En esta operación ejecute el **"Asistente de configuración inicial de la
operación de deterioro de cartera"**.



##  Configuración de la operación de reversión de deterioro de cartera

Esta sección indica cómo configurar la operación de reversión de deterioro de
cartera para que el proceso de ingreso de la información sea más ágil y
oportuno.

## Requisitos

Realice todas las configuraciones requeridas en las secciones anteriores de
esta guía.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de deterioro de cartera **\[Más operaciones > Cartera >
Reversión de deterioro de cartera\]**.

En esta operación ejecute el **"Asistente de configuración inicial de la
operación de reversión de deterioro de cartera"**.



## Guías relacionadas

  * [Guía de montaje de cartera y proveedores.](<?id=\[GM\]3030>)
  * [Guía de montaje de programación de pagos.](<?id=\[GM\]3050>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

## PROGRAMACIÓN DE PAGOS

Esta guía lo orientará en el uso de la herramienta de programación de pagos,
que tiene como finalidad planear los pagos de las cuentas por pagar que
presenta la empresa con sus terceros.
Esta herramienta permite generar un archivo de texto plano con todas estas
transacciones de las cuentas por pagar. Su alcance se limita a las
configuraciones necesarias que se deben realizar para programar el pago de las
cuentas por pagar \(CXP\) con los terceros.



##  Preparación de información inicial

Esta sección indica los requisitos que se deben cumplir previamente para
utilizar la herramienta de programación de pagos

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte, documentos de
impresión y políticas empresariales en especial del manejo de inventarios\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Ver acerca del módulo

Realice el proceso de capacitación de la herramienta de programación de pagos.
Ver Curso de Cartera a proveedores, sección programación de pagos
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD080>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje [aquí](<?id=\[AD\]3010>).

##  Verificación de bancos

Esta sección indica cómo verificar en el sistema \[ContaPyme\] los bancos por
defecto y cómo crear uno nuevo en caso de no encontrarlo en el listado.

## Requisitos

No se requiere

## Preparación de la información

Averigüe el código del banco que va a consultar o crear, este es asignado por
la propia entidad financiera.

Ejemplo:

NOMBRE DEL BANCO | CÓDIGO DEL BANCO
---|---
BANCOLOMBIA | 007
BANCO DE BOGOTÁ | 1
BANCO POPULAR | 2

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de bancos **\[Cinta de opciones: Pestaña Básico > Títulos
> Bancos\]**.

Valide que el banco que va a utilizar esté creado en el listado.

Para crear un nuevo banco dé clic al botón “Crear” de la cinta de opciones y
diligencie el asistente de creación del nuevo banco.



##  Verificar tipos de cuentas bancarias

Esta sección indica cómo verificar en el sistema \[ContaPyme\] los tipos de
cuentas bancarias por defecto y cómo crear un nuevo tipo de cuenta en caso de
no encontrarlo en el listado.

## Requisitos

No se requiere

## Preparación de la información

Averigüe el código del tipo de cuenta bancaria que va a consultar o crear,
este es asignado por la propia entidad financiera.

Ejemplo:

TIPO DE CUENTA | CÓDIGO DEL TIPO DE CUENTA
---|---
CUENTA DE AHORRO | 01
CUENTA CORRIENTE | 02
CUENTA DE AHORRO AFC | 03

## Procedimiento en \[ContaPyme\]

Ingrese al catálogos de tipos de cuentas bancarias **\[Cinta de opciones:
Pestaña Básico > Títulos > Tipos de cuentas bancarias\]**.

Valide que el tipo de cuenta bancaria que va a utilizar esté creada en el
listado.

Para crear un nuevo tipo de cuenta bancaria dé clic al botón “Crear” y
diligencie el asistente de creación de tipos de cuentas bancarias.



##  Configuración de cuentas empresariales

Esta sección indica cómo crear en el sistema \[ContaPyme\] las cuentas
empresariales, las cuales son necesarias para el catálogo de programación de
pagos, ya que con estas se indica de qué cuenta será debitado el saldo a la
hora de generar el archivo plano.

## Requisitos

Tenga creados los bancos que va a seleccionar en el catálogo correspondiente.

## Preparación de la información

Tenga a disposición la información de la cuenta que está creando \(Nombre,
número, banco, etc\).

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de cuentas empresariales **\[Cinta de opciones: Pestaña
Cartera > Cuentas empresariales\]**.

Para crear una nueva cuenta empresarial dé clic al botón "Crear" y diligencie
el asistente de creación de la nueva cuenta.

Asocie la información del titular de la cuenta, banco, tipo de cuenta y demás
datos de importancia.



##  Configuración de terceros

Esta sección indica cómo configurar en el sistema \[ContaPyme\] la información
de los terceros, con el fin de efectuar el pago por la herramienta de
programación de pagos.

## Requisitos

Tenga creados los terceros en el catálogo de terceros.

## Preparación de la información

Tenga a disposición los datos de la cuenta bancaria titular y/o adicional del
tercero \(Nombre, número, banco, etc.\).

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de terceros **\[Cinta de opciones: Pestaña Básico >
Terceros\]**.

Seleccione el tercero y dé clic al botón "Modificar" de la cinta de opciones,
luego clic en la pestaña "Cuenta bancaria" y diligencie los campos de
información de la cuenta.



## Guías relacionadas

  * [Guía de montaje de cartera y proveedores.](<?id=\[GM\]3030>)
  * [Guía de montaje de deterioro de cartera.](<?id=\[GM\]3040>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

## INTERESES

Esta guía lo orientará en el montaje del manejo de intereses a cuentas por
cobrar en \[ContaPyme\]. Este módulo tiene como finalidad realizar el manejo
de los intereses generados por las ventas, prestamos, anticipos, entre otras,
que la empresa genere en sus actividades económicas.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de cartera y proveedores.

## Realice el montaje del módulo de cartera y proveedores

Realice el proceso de capacitación del módulo de cartera y proveedores.
Ver Curso de Cartera y proveedores
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD080>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo de intereses, donde se explican todos
los conceptos necesarios para entender esta guía de montaje
[aquí](<?id=\[AD\]3020>).

##  Activación del manejo de intereses

En esta sección se explica cómo activar en ContaPyme el manejo de intereses en
la empresa.
Cuando se activa el manejo de intereses, el sistema permitirá registrar
cuentas por cobrar con intereses a partir de una fecha específica.

## Requisitos

No se requiere.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al editor de la empresa **\[Cinta de opciones: Pestaña básico >
Explorador gráfico de empresas\]**.

Active la opción de manejo de intereses, dirijiendose a: **\[Pestaña cartera y
proveedores > Activar manejo de intereses en las cuentas por cobrar\]**



##  Creación de tipos de crédito

Esta sección indica cómo crear los diferentes tipos de crédito que se desean
manejar en la empresa.
La finalidad de los tipos de créditos es agilizar la creación de una cuenta
por cobrar, allí se definen las tasas de interés, la periodicidad, sistema de
amortización, cuentas, entre otras, según el criterio que tenga la empresa.

## Requisitos

No hay requisitos.

## Preparación de la información

Realice un listado de los tipos de crédito que desea implementar en la
empresa, según las actividades económicas que allí se tengan.

Ejemplo:

Código | Nombre | Periodicidad | Interés corrientes | Aplica tasa máxima mora | Interés por mora
---|---|---|---|---|---
001 | Crédito sin intereses | Mensual | 0% | NO | 0%
001 | Crédito solo con intereses corrientes | Mensual | 1% | NO | 0%
001 | Crédito solo con intereses por mora | Mensual | 0% | NO | 2%
001 | Crédito para empleados | Quincenal | 1% | NO | 2%
001 | Crédito ventas a por mayor | Semanal | 1% | SÍ | 0%


## Procedimiento en ContaPyme

Ingrese al catálogo de tipos de crédito **\[Cinta de opciones: Pestaña cartera
> Tipos de créditos\]**.

Dé clic en el botón “Crear” y registre la información que le solicita el
editor de creación. Para conocer la descripción de cada campo del editor,
consulte la ayuda dando clic derecho sobre el nombre del campo.


**NOTA:** Recuerde que este catálogo solo se podrá visualizar si en la empresa
está habilitado el manejo de intereses.



##  Definición de tipos de créditos por defecto a terceros

En esta sección se explica definir a cada tercero, un tipo de crédito por
defecto. Esto permitirá que al momento de registrarle una cuenta por cobrar al
tercero, el sistema cargue automaticamente el tipo de crédito definido.

## Requisitos

Registrar los tipos de créditos que se utilizarán en la empresa.

## Preparación de la información

En caso de que desee definir un tipo de crédito por perfil de cliente, elabore
una lista de los tipos de créditos que aplicarán para cada uno de estos:
Perfil cliente | Tipo de crédito
---|---
Clientes generales | Crédito clientes
Clientes VIP | Crédito solo con intereses por mora
Clientes mayoristas | Crédito ventas a por mayor


## Procedimiento en \[ContaPyme\]



Asignación de forma individual a cada tercero

Ingrese al catálogo de terceros **\[Cinta de opciones: Pestaña básico >
Terceros\]**.

Asigne en tipo de crédito por defecto **\[Pestaña datos clientes >
Créditos\]**

Dé clic en el botón "Aceptar" y continue con los demás terceros a los cuales
desea asignarles un tipo de crédito.


Asignación por perfil de cliente

Ingrese al catálogo de tipos de tercero **\[Cinta de opciones: Pestaña básico
> Perfiles de clientes\]**.

Asigne en tipo de crédito por defecto **\[Pestaña general > Créditos\]**

Dé clic en el botón "Aceptar" y continue con los demás perfiles a los cuales
desea asignarles un tipo de crédito.



##  Registro de tasas máximas de interés por mora

En esta sección se explica cómo registrar la tasas máximas de interés por mora
vigentes en un rango de fechas.
Estas tasas son utilizadas cuando en el tipo de crédito se indica que se
aplicará la tasa máxima de usura en caso de que una cuota tenga mora.

## Requisitos

No se requiere.

## Preparación de la información

Consulte la página de la **Superintendencia Financiera de Colombia** o la
entidad correspondiente a su país, allí se publicarán las tasas de usura
vigentes para un rango de fechas.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña básico >
Operaciones\]**.

Ingrese a la operación de registro de tasa máxima de interes por mora **\[Más
operaciones > Cartera \(CxC\) > Registro de tasa máxima de interes por mora
\]**

Diligencie la operación indicado la tasa de usura y la fecha de vigencia.

Consulte las diferentes tasas de usura registradas en el sistema **\[Cinta de
opciones: Pestaña cartera > Créditos > Explorador de tasas por mora\]** .
