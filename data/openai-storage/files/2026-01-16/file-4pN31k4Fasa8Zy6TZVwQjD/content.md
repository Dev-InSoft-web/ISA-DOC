# ad_cartera_proveedores.md
> **Propósito:** Explicar el funcionamiento del módulo **Cartera y Proveedores**, detallando ventanas, campos, opciones y comportamientos del sistema.
> **Tipo de documento:** Conocimiento base (AD)
> **Función:** Descripción técnica y funcional del módulo
> **Versión:** 1.0
> **Fecha:** 14/11/2025

---

# Acerca del módulo

##

## CARTERA Y PROVEEDORES

## Explicación conceptual

El módulo de cartera y proveedores es un módulo especializado que permite al
usuario tener un completo control de la cartera y de los proveedores, permite
crear las cuentas por cobrar \(CxC\) y cuentas por pagar \(CxP\) como también
realizar abonos o cruces de cuentas.

El módulo de cartera y proveedores brinda al usuario la posibilidad de conocer
el estado actualizado de su cartera y sus deudas, permite hacer seguimiento a
la cartera por edades, cuenta con una herramienta especializada para la
programación de pagos a empleados y proveedores y también ofrece al usuario un
asistente especializado para el registro del deterioro de cartera.

El módulo de cartera y proveedores cuenta con la operación de movimiento
contable, por medio de la cual se pueden crear las cuentas por cobrar y
cuentas por pagar y realizar los respectivos abonos, pero este módulo también
se puede se ver afectado por una gran cantidad de operaciones de otros módulos
como lo son: Contabilidad, automatización de documentos, inventarios y
facturación, activos fijos, entre otros.

Aunque el módulo de cartera y proveedores cuenta con la operación de
movimiento contable, su especialidad es la generación de informes tanto para
cuentas por cobrar como para cuentas por pagar.

Estos informes se pueden filtrar por tercero, cuenta, categoría y
clasificación y permite reconocer fácilmente los plazos que tiene cada cuenta
por cobrar y cuenta por pagar como también las cuentas que estén vencidas.

También nos permite ver gráficamente, en forma de cronograma, el
comportamiento de la cartera, representando con colores los plazos de cada
documento y los abonos realizados dentro y fuera de los plazos establecidos.

## Relación con otros módulos

El módulo de cartera y proveedores se relaciona con otros módulos del sistema,
ya que cada uno de los registros de creación o abono de cxc o cxp, se
registran de forma automática en la contabilidad sin que sea necesario el uso
de interfaces. Igualmente, las operaciones de otros módulos tan pronto se
procesan afectan de forma automática los informes de cartera y proveedores.


Ejemplo:

A través de la operación de facturación y ventas del módulo de inventarios y
facturación se pueden crear la cuenta por cobrar o cruces de cuentas cuando se
tienen registrados anticipos para el cliente y a través de la operación de
abono a cuenta por cobrar del módulo de automatización de documentos se pueden
realizar abonos o cancelaciones de las cuentas por cobrar pendientes.
La afectación a estas cuentas se verá reflejada en el informe de cartera por
edades, saldos de cuentas por cobrar, movimientos de las cuentas por cobrar,
cartera por clasificadores, entre otros informes; todos estos informes propios
del módulo de cartera y proveedores.

## Manejos que incluye el módulo

El módulo de cartera y proveedores incluye otros 2 sub módulos, los cuales se
describen a continuación:

## Deterioro de cartera

Esta herramienta permite aplicar de forma automática el deterioro a la cartera
utilizando cualquiera de los métodos de deterioro con los que cuenta el
sistema, e incluso aplicando los tres métodos simultáneamente de ser
necesario, como los son:

  * Método del deterioro por probabilidad.
  * Método de los flujos futuros.
  * Método del costo amortizado.


También cuenta con una operación que permite aplicar la reversión de deterioro
a la cartera de forma manual, permitiendo a los usuarios cargar las cuentas ya
deterioradas que requieren la reversión y restringiendo la aplicación de
reversión de deterioro a cuentas no deterioradas. Igualmente controla que la
reversión del deterioro sobrepase el valor ya deteriorado.

## Programación de pagos

Esta herramienta permite programar el pago de las cuentas por pagar con
proveedores o empleados y de forma automática generar el movimiento contable
de la programación para que afecte la contabilidad. También generar el archivo
de pago para ser subido al banco.

## Operaciones que incluye el módulo

## Operación de movimiento contable

La operación de movimiento contable permitirá al usuario realizar asientos
débitos y créditos sobre las cuentas contenida en el catálogo de cuentas,
podrá crear cuentas por cobrar, cuentas por pagar y sus respectivos abonos con
cargo a cualquier tercero, referencia y centros de costos.

##  Informes, consultas y exploradores del módulo

El módulo de cartera y proveedores brinda la posibilidad de generar informes
en diferentes presentaciones que permiten analizar el movimiento y estado de
cuentas por cobrar y cuentas por pagar de la empresa.

## Consulta de cuentas por cobrar o cuentas por pagar por edades

El informe de consulta de cuentas por cobrar o de cuentas por pagar por
edades, nos permite consultar a una fecha determinada las cuentas por cobrar o
por pagar de cada uno de los terceros indicando el plazo del pago y los abonos
realizados dentro y fuera del plazo de pago estipulado.

## Consulta de saldos de cuentas por cobrar o cuentas por pagar

El informe consulta de saldos de cuentas por cobrar o cuentas por pagar es un
informe de tipo consulta que nos permite visualizar a una fecha determinada
los saldos de las CxC o CXP que tiene la empresa, mostrando cada tercero con
los respectivos documentos referencia y el valor que adeuda por cada
documento.

## Detalle de cuentas por cobrar o cuentas por pagar

El informe de detalle de cuentas por cobrar o cuentas por pagar es un informe
de tipo impresión, que nos permite visualizar a una fecha determinada los
documentos referencia con los cuales se generaron las deudas a los diferentes
terceros con su respectivo saldo.

## Movimiento de cuentas por cobrar o cuentas por pagar

El informe de movimiento de cuentas por cobrar o de cuentas por pagar es un
informe de tipo impresión, que nos permite visualizar en un rango de fechas
determinado el reporte detallado de un crédito, es decir el documento que dio
origen a la CxC o de la CXP y cada uno de los abonos que se le han registrado;
indicando la fecha del movimiento, el número del documento, el valor, el
detalle, la fecha de pago, el plazo y la edad cartera.

## Explorador de cuentas por cobrar o de cuentas por pagar

El explorador de cuentas por cobrar o cuentas por pagar es un listado de todos
los movimientos de cartera y proveedores en un período, en el cual podemos
visualizar tanto la creación de las CxC o CxP y los abonos registrados durante
el periodo indicado.

Los exploradores de Cartera y proveedores, nos permiten realizar labores de
auditoria, buscar y solucionar posibles errores e inconsistencias, guardar la
información en Excel u otros formatos y también nos permite graficar la
información del explorador entre otras tareas.

## Vencimientos diarios en cuentas por cobrar o en cuentas por pagar

El reporte vencimientos diarios en cuentas por cobrar o cuentas por pagar es
un informe de tipo impresión que nos permite visualizar para cada día las
deudas u obligaciones que se deben cancelar, mostrando en color rojo aquellas
deudas que a la fecha de referencia se encuentran vencidas y en color negro
aquellas que aún tienen plazo para ser canceladas.

## Informe estado de cuentas cobrar o por pagar por clasificadores

El Informe estado de cuentas cobrar o por pagar por clasificadores básicamente
nos va a mostrar todos los saldos clasificados según el concepto que el
usuario requiera, se puede clasificar el informe por vendedor, por cliente,
por ciudad, por país, por los campos de valores. Este informe mostrará cada
referencia, la fecha de creación, la fecha de vencimiento, el saldo, si aún
está vigente y cuanto se tiene pendiente a 30 días, a 60 días y más de 90 días
y al final nos muestra total de la cartera.

Este informe es bastante completo, me permite manejar hasta 3 clasificadores,
es decir podrá filtrar por ejemplo en el primero clasificador por ciudad,
dentro de ese podríamos filtrar por vendedor y dentro de este
cliente/proveedor.

## Informe estado de cuentas cobrar o por pagar por clasificadores

El Informe estado de cuentas cobrar o por pagar por clasificadores básicamente
nos va a mostrar todos los saldos clasificados según el concepto que el
usuario requiera, se puede clasificar el informe por vendedor, por cliente,
por ciudad, por país, por los campos de valores. Este informe mostrará cada
referencia, la fecha de creación, la fecha de vencimiento, el saldo, si aún
está vigente y cuanto se tiene pendiente a 30 días, a 60 días y más de 90 días
y al final nos muestra total de la cartera.

Este informe es bastante completo, me permite manejar hasta 3 clasificadores,
es decir podrá filtrar por ejemplo en el primero clasificador por ciudad,
dentro de ese podríamos filtrar por vendedor y dentro de este
cliente/proveedor.

## Saldos de cartera a archivo plano

Esta herramienta se utiliza mucho cuando se requieren subir los saldos de
cartera y proveedores a otro programa, se genera todo el informe en un archivo
plano \(txt\) y ya la otra aplicación hará uso de ese archivo.



# Acerca de módulo

## INTERESES

Este módulo tiene como finalidad realizar el manejo de los intereses generados
por las ventas, prestamos, anticipos, entre otras, que la empresa genere en
sus actividades económicas.



## Explicación conceptual

El módulo de intereses está compuesto por una serie de catálogos y asistentes
que le permitirán a la empresa realizar una acertada implementación del manejo
de intereses en sus créditos, según las necesidades que esta tenga. A
continuación se explicará gráficamente cómo está constituido el módulo, y qué
relación tienen cada uno de los catálogos y procesos:


![AD_CX_1.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_1.png)

## Manejos que incluye el módulo

## Catálogo de tipos de créditos

La finalidad de los tipos de créditos es agilizar la creación de una cuenta
por cobrar, allí se definen las tasas de interés, la periodicidad, sistema de
amortización, cuentas, entre otras, según el criterio que tenga la empresa.
El catálogo de tipos de crédito se puede encontrar en:**\[Pestaña cartera >
Tipos de crédito\]**

Ejemplo:

A sus empleados se les cobrará un interés del 0,5 % en sus préstamos, pero
desea que a sus clientes se les cobre un 1% en las ventas realizadas a
crédito, de esta manera no tendrá que definirlo cada vez que esté creando la
cuenta por cobrar, sino que únicamente debe seleccionar el tipo de crédito que
se ajuste a sus necesidades.

**NOTA:** Este catálogo solo se podrá visualizar si en la empresa está
habilitado el manejo de intereses.



**INTERESES POR MORA:** Si se desa manejar intereses por mora debe tener en
cuenta que estos se deben facturar, por lo tanto se debe contar con el
**módulo de inventarios y/o de automatización** para poder registrar la
respectiva operación de ingresos.



## Operaciones que incluye el módulo

## Registro de tasas máximas de interés por mora

La finalidad de este registro es tener en el sistema las tasas máximas de mora
o tasas de usura vigentes en determinado rango de fechas, las cuales son
publicadas periódicamente por la **Superintendencia Financiera de Colombia** o
la entidad correspondiente a su país.
Estas tasas son utilizadas cuando en el tipo de crédito se indica que se
aplicará la tasa máxima de usura en caso de que una cuota tenga mora.

Este registro se realiza por medio de la operación **“Registro de tasa máximas
de interés por mora”** y también podrán ser consultadas en el Explorador de
tasas de mora aquí

Esta operación la podrá encontrar en: **\[Manejador de operaciones > Cartera
\(CxC\) > Registro de tasa máxima de interés por mora\]**


## Registro del crédito

El registro de un crédito se podrá realizar desde cualquier operación que
tenga disponible el manejo de formas de cobro.
Cada vez que se realice un crédito a cuotas y esté habilitado el manejo de
intereses en la empresa, se tendrá la posibilidad de seleccionar cual tipo de
crédito aplica para dicho caso.

![AD_CX_7.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_7.png)



##  Acciones automáticas de fin de mes \(Causación de intereses\)

La causación de los intereses tiene como finalidad que los ingresos por
intereses sean registrados en la contabilidad en el periodo al que realmente
corresponden dichos ingresos.
Esta se realiza por medio de la operación de acciones automáticas de fin de
mes, seleccionando la opción **“Causación de intereses”**.

Ejemplo:

La empresa le presta al señor Juan López un monto de $500.000 a 3 cuotas
mensuales con un interés del 1% el día 15 de Junio de 2018.
El señor Julio ya ha pagado una cuota y la próxima es para el día 15 de agosto
de 2018.

Como podemos visualizar la segunda cuota comprende las fechas del 16 de julio
2018 hasta 15 de agosto 2018 por lo tanto una parte de los intereses hacen
parte del mes de Julio y otra parte del mes de Agosto.



|
![AD_CX_8.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_8.png)
---|---

Para que nuestros informes de estados financieros estén correctamente, el día
31 de julio de 2018 se debe realizar la causación de los intereses
correspondientes a dicho mes así no se haya pagado la deuda, con el fin de que
los ingresos por intereses queden correctamente registrados en el mes en que
realmente se obtuvo el ingreso.

**NOTA:** Esta opción solo se podrá visualizar si en la empresa está
habilitado el manejo de intereses.




## Abono a cuenta por cobrar. \(CxC\)

Cuando el usuario va a realizar los pagos de sus créditos, estos se deben
registrar por medio de la operación de **“Abono a cuentas por cobrar”.** [ver
información de la operación.](<?id=\[AD\]14190>)

A continuación se mostrará gráficamente las posibles acciones que se pueden
realizar desde la operación de abono a cuentas por cobrar con respecto al
manejo de intereses :

![AD_CX_11.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_11.png)

Esta operación será la encargada de realizar el cálculo respectivo de los
intereses corrientes o por mora que el cliente debe pagar, además ofrece **dos
funcionalidades más** , siempre y cuando se tenga habilitado el manejo de
intereses en la empresa:


Abonos a capital

Estos son abonos extraordinarios que el cliente desea hacer a su deuda con dos
posibles finalidades, disminuir el plazo de la deuda o disminuir el valor de
las cuotas.
Se debe tener en cuenta que este hará un abono a capital, por lo tanto **no se
cobran intereses**.



Abonos parciales con intereses

La operación de abonos a cuentas por cobrar le ofrecerá al usuario un
asistente para repartir un monto entre el capital y el interés de una cuota.

Ejemplo:

El señor Juan López debe pagar una cuota con un valor de $340.022 de los
cuales $30.000 son de intereses, el señor se acerca a realizar el pago pero
indica que solo puede pagar una parte de la cuota ya que cuenta únicamente con
$150.000.

En este caso la persona que vaya a registrar el abono debe repartir los
$150.000 entre la parte que corresponde a capital y la parte de intereses
siendo esta la que se paga primero.
Por lo tanto con esta herramienta la operación realizará un ingreso por
intereses de $30.000 y un abono al capital por $120.000.
---





**NOTA:** Si no se utiliza esta herramienta el usuario definiría que el abono
será de $150.000 pero de igual forma se cobrarían los intereses por $30.000
para un total de $180.000.



![AD_CX_10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_10.png)

##  Informes, consultas y exploradores del módulo

## Estado de crédito

Este informe de impresión le será muy útil al momento de que un cliente le
consulte cual es el estado de las cuentas por cobrar que tiene con la empresa.
En este se podrá visualizar las condiciones originales del crédito como tasas
de interés, periodicidad, entre otras, además podrá saber cuál es la próxima
cuota y cuáles son los movimientos que se le han registrado al crédito.
![AD_CX_12.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_12.png)


## Explorador de créditos

En el explorador de créditos se podrán consultar todas las cuentas por cobrar
que la empresa ha generado, en este se mostrará detalladamente el estado de
cada una de las cuotas y que saldos quedan aún por pagar.
![AD_CX_13.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_13.png)


## Explorador de tasas por mora

En el explorador de créditos se podrán consultar todas las cuentas por cobrar
que la empresa ha generado, en este se mostrará detalladamente el estado de
cada una de las cuotas y que saldos quedan aún por pagar.**\[Pestaña cartera >
Créditos > Explorador de tasas por mora\]**

## Documento de impresión \(Tabla de amortización\)

El manejador de impresión “Tabla de amortización” en los documentos de
impresión del sistema, le permitirá imprimir como su nombre lo indica la tabla
de amortización generada por un crédito hecho ya sea desde una factura de
venta, préstamos, anticipos, entre otros.
![AD_CX_14.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/AD_CX_14.png)



# Acerca de la ventana

## TIPOS DE CRÉDITO

Este catálogo permite realizar la configuración de los diferentes tipos de
créditos que deseamos manejar en nuestra empresa.

En este asistente usted podrá definir datos cómo:

  * Tasas de interés.
  * Periodicidad de pago.
  * Cuentas que se afectarán.
  * Método con el cuál se realizará el cálculo del monto de las cuotas.
  * Entre otros.

Estos tipos de créditos son utilizados para agilizar la creación de una cuenta
por cobrar y le permite definir un comportamiento diferente según el tercero u
otro factor que indique que los créditos serán diferentes.


Ejemplo:

Sus empleados se les cobrará un interés del 0,5 % en sus préstamos, pero desea
que a sus clientes se les cobre un 1% en las ventas realizadas a crédito, de
esta manera no tendrá que definirlo cada vez que esté creando la cuenta por
cobrar, sino que únicamente debe seleccionar el tipo de crédito que se ajuste
a sus necesidades.

**Nota** : Los tipos de créditos sólo se podrán asignar a una cuenta por
cobrar si está habilitado el manejo de intereses en la empresa. Para realizar
esta configuración diríjase a: **\[Editor de empresa > Pestaña cartera y
proveedores > Activar manejo de intereses a cuentas por cobrar\]**



## Explicación conceptual

El siguiente diagrama explica conceptualmente cuál es la finalidad de los
tipos de créditos, y cómo afecta las diferentes cuentas por cobrar que se
creen asociadas a estos:

![concepto.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/concepto.png)

Una empresa puede clasificar sus diferentes tipos de créditos según las
necesidades que esta tenga, por ejemplo créditos para sus empleados, clientes
mayoristas, o créditos mayores a determinado monto, entre otros, cada uno con
la definición de las tasas de interés que se cobrarán, la periodicidad de
pago, plazos máximos, y más.

Todos estos créditos son generados por ventas, préstamos, anticipos entre
otros, los cuales debe haber sido financiados en cuotas para poder asociarles
un tipo de crédito.

Al momento de realizar un abono a cada una de estas cuentas por cobrar se
realizará el cálculo de intereses con la definición del tipo de crédito que
esta tenga asociado.

## Ejemplo de información a registrar

Los datos más importantes a registrar para un tipo de crédito serían, entre
otros:

**Código del tipo de crédito** | 0001
---|---
**Nombre** | Crédito para empleados
**Periodicidad de pago** | Mensual
**Sistema de amortización** | Método francés
**Tasa de interés** | 1%
**Tasa de interés por mora** | 1.5%
**Plazo máximo** | 12 meses

## Definición conceptos

  * **Amortizar** : Pagar el total o parte de una deuda.
  * **Sistema de amortización** : Un sistema de amortización es la forma cómo se espera realizar el pago del crédito, este define por ejemplo si las cuotas serán fijas, si el interés será simple o compuesto, entre otros.
Existen diferentes tipos de amortización, ContaPyme hasta el momento tiene
implementado el **método francés** el cual indica que se cobrará una cuota
fija durante todo el plazo del préstamo, que el interés irá disminuyendo y que
la amortización aumentando.

## Secciones

## Sección intereses corrientes

En esta sección se define la tasa de interés corriente que se le aplicará al
crédito, el sistema de amortización que se utilizará para calcular las cuotas
y las cuentas que se afectarán al recibir estos ingresos.

## Sección intereses por mora

En esta sección se define la tasa de interés por mora que se aplicará en caso
de que en algún momento el tercero se atrase con una cuota del crédito, además
podrá indicarse después de cuantos días se cobrará este interés y si es
posible perdonarlo o no al momento de realizar el pago de la deuda.





# Acerca de ventana

## OPERACIÓN DE TASA MÁXIMA DE INTERÉS POR MORA

##  Objetivo

La operación de registro de tasas máximas de interés por mora permite definir
la tasa de mora que estará vigente entre un rango de fechas.

## Ejemplo de información a registrar

Los datos que se deben ingresar al momento de realizar la operación son los
siguientes:

**Fecha inicio** | 01/08/2018
---|---
**Fecha fin** | 30/08/2018
**Tasa máxima** | 29,91%



## Definición de conceptos

**¿Dónde se utilizan estas tasas?**

El siguiente diagrama explica conceptualmente cómo se debe utilizar la
operación **"Registro de tasas máximas de interés por mora"** y cómo afecta al
momento de realizar el cálculo del monto de mora de una cuenta por cobrar
vencida:

![tasamaxima.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/tasamaxima.png)


## Secciones

## Publicación de la entidad financiera

Periódicamente la Superintendencia financiera publica las tasas de usura para
las diferentes modalidades de préstamo que estarán vigentes en un rango de
fechas.

## Registro en el sistema

Estas tasas deben ser ingresadas al sistema para que este pueda estar
actualizado y aplicar la tasa correspondiente a las diferentes cuentas por
cobrar vencidas.

Para consultar el histórico de tasas registradas, diríjase a: **\[Pestaña
cartera > Explorador de tasas por mora\]**.

## Calculo al realizar el abono

Al momento de registrar el abono de una CxC se verificará si esta tiene días
en mora y si el tipo de crédito con el que fue creado aplica la tasa máxima de
intereses por mora.
De esta manera el sistema consultará si hay una tasa vigente para el periodo
en el que se esté realizando el pago, y en caso de no encontrar una el sistema
sacará un error y no permitirá realizar el pago.



## Para Colombia

**Para Colombia** estas tasas son definidas por la superintendencia financiera
de Colombia. Puede consultar la tasa de usura para las diferentes modalidades
de préstamo en la página web de la [Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), sección
**"indicadores económicos"** :

![indicador.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/indicador.png)


**Recuerde**

**La tasa de usura no puede ser mayor al 1.5 del interés corriente, exceder
esta tasa es un delito cuya pena puede estar entre dos \(2\) a cinco \(5\)
años de cárcel** y multas desde cincuenta \(50\) hasta doscientos \(200\)
salarios mínimos legales mensuales vigentes.
Para más información consulte el **artículo 305** de la [ley 599 de
2000](<http://www.suin-juriscol.gov.co/viewDocument.asp?id=1663230>).



# Acerca de ventana

## ABONO A CUENTAS POR PAGAR



## Objetivo

Esta ventana tiene como finalidad el registro de los abonos a cuentas por
pagar que tiene la empresa.

La operación de abonos a cuentas por pagar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente la empresa con un tercero. También
permite en una misma operación realizar abonos a múltiples terceros activando
la opción “Permitir hacer abonos a múltiples terceros”.

En la operación de abonos a cuentas por pagar se podrán detallar los
diferentes costos financieros que se han causado por motivo del crédito, como:
impuestos, intereses y comisiones desde el paso “Detalle de otros costos
financieros”.

Esta operación es de gran ayuda para los usuarios no contadores que conocen la
información básica de la transacción pero no tienen suficientes bases para el
manejo de la contabilidad.

## Ejemplo de información a registrar

Registrar el abono de $600.000 pesos a la cuenta por pagar que se tiene
pendiente con el proveedor ASB LTDA correspondiente a la factura de compra
FC-00256.

La información relevante para registrar el abono a cuentas por pagar es:

  * El tercero al cual se le hará el abono.
  * El código de la cuenta por pagar o referencia a la que se le realizará el abono.
  * Valor a abonar.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de egreso, este tipo de documento se
puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También es necesario identificar la fecha de soporte y el tercero a quien se
está realizando el abono a la cuenta por pagar.

## Registro

Se selecciona la cuenta por pagar a la cual se realizará el abono y el valor
abonado que corresponda por cada renglón.

\[Contapyme\] automáticamente muestra el saldo actual y el nuevo saldo de la
cuenta por pagar a la fecha que tenga la operación y según el valor abonado.

Si no se ha especificado un tercero, el seleccionador presentará todas las
cuentas por pagar a terceros, de tal manera que al seleccionarse una,
automáticamente se llenarán los campos del tercero e identificación de la
cuenta.

## Totales registrados

Muestra los totales del saldo y abonos de las cuentas por pagar registradas en
la operación.

## Detalle de los ingresos financieros

En este paso se puede detallar los diferentes costos financieros que se han
causado por motivo del crédito, como: impuestos, intereses, comisiones, etc.

La información relevante para registrar en este paso es:

  * Centro de costos al cual se le cargará el gasto.
  * Concepto de egresos \(Cuenta\).
  * Valor del gasto financiero.

## Liquidación

Registro de los descuentos, cargos o impuestos causados en el abono a la
cuenta por pagar.

## Forma de pago

Forma como se cancelará el pago del abono a la cuenta por pagar y demás cargos
o descuentos relacionados en esta operación:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXP\).
  * Cruce \(cruce con CXC al tercero\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Impresión de soportes

La operación de abono a cuentas por pagar permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de abono a CxP.
  * Comprobante de egreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Disminuyendo o cancelando la cuenta por pagar al tercero o muchas cuentas por pagar para el caso de cuotas pendientes y un abono que las cubre.
  * Llevando al gasto los costos financieros, si los hay.
  * Procesando los descuentos o cargos.
  * Procesando la forma de pago.





# Acerca de ventana

## ABONO A CUENTAS POR COBRAR



## Objetivo

Esta ventana tiene como finalidad el registro de los abonos a cuentas por
cobrar.

La operación de abonos a cuentas por cobrar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente un tercero con la empresa. También
permite en una misma operación realizar abonos a múltiples terceros activando
la opción “Permitir hacer abonos a múltiples terceros”.

En la operación de abonos a cuentas por cobrar se podrán detallar los
diferentes costos financieros que se han causado por motivo del crédito, como:
impuestos, intereses y comisiones, esto desde el paso “Detalle de los ingresos
financieros”.

Esta operación es de gran ayuda para los usuarios no contadores que conocen la
información básica de la transacción pero no tienen suficientes bases para el
manejo de la contabilidad.

## Ejemplo de información a registrar

Registrar el abono de $500.000 pesos a la cuenta por cobrar que tiene
pendiente el cliente María Isabel Ortega, correspondiente a la factura de
venta No. FV-00150.

La información relevante para registrar en el abono a cuentas por cobrar es:

  * El tercero que realiza el abono.
  * El código o referencia a la que se le realizará el abono.
  * Valor a abonar.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de ingreso o recibo de caja,
este tipo de documento se puede definir por defecto, y el sistema
automáticamente asignará el consecutivo correspondiente según su
configuración.

También es necesario identificar la fecha de soporte, el tercero que está
realizando el abono a la cuenta por cobrar y el vendedor o recaudador de la
misma.

## Sección registro

En la sección de registro se deben seleccionar las cuentas por cobrar a las
cuales se realizará el abono y el valor abonado que corresponda por cada
renglón.

\[Contapyme\] automáticamente muestra el saldo actual y el nuevo saldo de la
cuenta por cobrar a la fecha que tenga la operación y según el valor abonado.

Si no se ha especificado un tercero, el seleccionador mostrará todas las
cuentas por cobrar a terceros, de tal manera que al seleccionarse una,
automáticamente se llenarán los campos de tercero e identificación de la
cuenta.

## Sección totales registrados

Muestra los totales del saldo y abonos de las cuentas por cobrar registradas
en la operación.

## Sección detalle de los ingresos financieros

En este paso se puede detallar los diferentes ingresos por conceptos
financieros que se han causado por motivo del crédito, como: impuestos,
intereses, comisiones, etc.

También se pueden registrar los descuentos financieros condicionados, es
decir, los que dependen del cumplimiento con que se hagan los abonos.

La información relevante para registrar en este paso es:

  * Centro de costos al cual se le cargará el ingreso.
  * Concepto de ingresos \(Cuenta\).
  * Valor del ingreso financiero.

## Sección liquidación

Registro de los descuentos, cargos o impuestos causados en el abono a la
cuenta por cobrar.

## Sección forma de pago

El sistema permite definir la forma como el tercero cancelará el abono a la
cuenta por cobrar y demás cargos o descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(cruce con CXP al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección liquidación de comisiones

Si se encuentra activo el manejo de comisiones por recaudo, se adicionará un
paso a la operación de abono a cuenta por cobrar donde el sistema mostrará el
cálculo automático que ha realizado de la comisión por recaudo para el
vendedor indicado en el abono a cuentas por cobrar.

Las comisiones por recaudo se configuran por perfiles de vendedores.

Se puede calcular comisión por recaudo basado en:

  * Porcentaje fijo.
  * Por línea o producto.
  * Por monto de ventas y/o recaudo.

En este paso se puede detallar el vendedor que va a comisionar, el perfil de
vendedor, el porcentaje y valor de la comisión.

## Sección impresión de soportes

La operación de abono a cuentas por cobrar permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de abono a CxC.
  * Recibo de caja.
  * Recibo de caja en tirilla texto.
  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Disminuyendo o cancelando la cuenta por cobrar al tercero o muchas cuentas por cobrar para el caso de cuotas por cobrar pendientes y un abono que las cubre.
  * Llevando al ingreso los cargos financieros, si los hay.
  * Procesando los descuentos o cargos.
  * Procesando la forma de cobro o ingreso.





# Acerca de ventana

## OPERACIÓN CREAR CRÉDITO O ANTICIPO \(CXP\)



## Objetivo

Esta ventana tiene como finalidad el registro de un crédito o anticipo cuando
un tercero le ha hecho a la empresa un préstamo o un anticipo. Es decir, en la
contabilidad quedará registrado como una cuenta que se le debe pagar a un
tercero.

Este asistente permite que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar estos registros, solo digitando
información básica de la operación.

## Ejemplo de información a registrar

La empresa realizó un préstamo con el Banco Nacional, por valor de $5.000.000
de pesos, para pagarlo en 12 cuotas, el cual quedó respaldado con el
comprobante de ingreso No. CI-00150.

Se recibe un anticipo de un cliente por valor de $500.000 pesos, el cual quedó
respaldado con el comprobante de ingreso No CI-000151. Este anticipo
posteriormente se cruzará con la factura de venta.
La información relevante para registrar la operación crear crédito o anticipo
\(CXP\) es:

  * El tercero al que se le deberá crear la cuenta por pagar.
  * La cuenta a la que se llevará el crédito.
  * Valor del crédito o anticipo.
  * ¿A dónde entró el dinero?

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de ingreso. Este tipo de documento
se puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También se debe definir la fecha del documento e indicar la referencia que
tendrá la cuenta por pagar, diferente al número del documento soporte de la
operación. Si no se especifica este dato, la referencia del crédito o anticipo
será el número de documento dado para la operación.

## Sección registro

Se debe especificar el valor del crédito o anticipo e identificar el tercero
al que se le deberá crear la cuenta por pagar.

Se puede especificar el pago en varias cuotas.

## Sección forma de pago

Se debe especificar ¿A dónde entró el dinero?:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(Amortización con CXP\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de crear crédito o anticipo \(CXP\) permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Comprobante de egreso
  * Comprobante de caja.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes y con la
información registrada el sistema tendrá toda la información necesaria para
crear la cuenta por pagar con el tercero en el módulo de cartera y proveedores
y en la contabilidad.





# Acerca de ventana

## Operación crear préstamo o anticipo \(CXC\) OPERACIÓN CREAR PRESTAMO O
ANTICIPO \(CXC\)



## Objetivo

Esta ventana tiene como finalidad el registro de un préstamo o anticipo que la
empresa le hace a un tercero. Es decir, en la contabilidad quedará registrado
como una cuenta que la empresa le debe cobrar a un tercero \(CxC\).

Este asistente permite que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar estos registros, solo digitando
alguna información simple.

## Ejemplo de información a registrar

La empresa le realizó un préstamo a uno de los socios, el Sr. Carlos Cardona,
por valor de $1.600,000, el cual quedó respaldado con el comprobante de egreso
No. CE-00350.

La empresa le realizó un préstamo a unos de sus empleados por valor de
$800.000, el cual quedó respaldado con el comprobante de egreso No. CE-00351,
para pagar en 8 cuotas y ser descontado en la nómina del empleado.

La empresa realizó un anticipo a proveedores por valor de $1.000.000, por
compra de materia prima, el cual quedó respaldado con el comprobante de egreso
No CE-00352.

La información relevante para registrar la operación crear préstamo o anticipo
\(CXC\) es:

  * El tercero al que se le realizará el préstamo y se le deberá crear la cuenta por cobrar.
  * La cuenta a la que se llevará el crédito.
  * Valor del préstamo o anticipo.
  * ¿De dónde salió el dinero del prestado o anticipo?

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de egreso, este tipo de documento se
puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También se debe definir la fecha del documento e indicar la referencia que
tendrá la cuenta por cobrar, diferente al número documento soporte de la
operación. Si no se especifica este dato, la referencia del crédito será el
número de documento dado para la operación.

## Sección registro

Se debe especificar el valor del préstamo o anticipo e identificar el tercero
al que se le deberá crear la cuenta por cobrar.

Se puede especificar el pago en varias cuotas.

## Sección forma de pago

Se debe especificar ¿de dónde salió el dinero?:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por pagar \(CXP\).
  * Cruce \(cruce con CXC al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de crear préstamo o anticipo \(CXC\) permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de egreso
  * Comprobante de caja.
  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes y con la
información registrada el sistema tendrá toda la información necesaria para
crear la cuenta por cobrar con el tercero en el módulo de cartera y
proveedores y en la contabilidad.





============================================================

## Tipo: Catálogo

### Cuentas empresariales

#### [17590] FrmEmpCuenta

﻿

# Número de cuenta.

Número de la cuenta bancaria que esta creando.

Ejemplo

La empresa MP EJEMPLO maneja 2 cuentas bancarias, una la maneja la sede de Manizales y la otra se maneja para la sede Medellín.  Empresa | Sede | Banco | Número de cuenta
---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562
1- MP EJEMPLO | 12 - Medellín | 51 - Banco Davivienda | 645 456 4123

En el campo **"Número de cuenta"** el asistente muestra el número de cuenta
bancaria que se esta creando.: **897 456 4562**.


Observaciones

Las cuentas empresariales son propias de cada empresa y cada sede.

Este dato es de solo lectura y es asignado por el usuario al momento de dar
clic en crear cuenta empresarial.

Este dato se utilizará cuando se realice el registro para la programación de
un pago \(CXP\) y quedará registrado automáticamente en el archivo plano de
pago que se sube al banco.





﻿

# Nombre cuenta.

Digite el nombre de la cuenta bancaria que esta creando.



Ejemplo

La empresa MP EJEMPLO maneja 2 cuentas bancarias, una la maneja la sede de Manizales y la otra se maneja para la sede Medellín.  Empresa | Sede | Banco | Número de cuenta | Nombre cuenta
---|---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562 | Cuenta corriente Bancolombia
1- MP EJEMPLO | 12 - Medellín | 51 - Banco Davivienda | 645 456 4123 | Cuenta corriente Davivienda
En el campo **"Nombre cuenta"** debe digitar el nombre que corresponde a la
cuenta bancaria que se esta creando: **Cuenta corriente Bancolombia**.




﻿

# Tipo de cuenta

Tipo de cuenta bancaria que se esta creando.

Ejemplo

La empresa MP EJEMPLO maneja 2 cuentas bancarias, una la maneja la sede de Manizales y la otra se maneja para la sede Medellín.  Empresa | Sede | Banco | Número de cuenta | Nombre cuenta | Tipo de cuenta
---|---|---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562 | Cuenta corriente Bancolombia | 02 - Cuenta corriente
1- MP EJEMPLO | 12 - Medellín | 51 - Banco Davivienda | 645 456 4123 | Cuenta de nomina Davivienda | 05 - Cuenta de nómina

En el campo **"Tipo de cuenta"** debe seleccionar el tipo de cuenta que
corresponde a la cuenta bancaria que se esta creando: **Cuenta corriente
Bancolombia**.


Observaciones

\[ContaPyme\] presenta un listado con todos los tipos de cuenta creados en el
catálogo de tipos de cuentas bancarias.

Configuración

Para crear el listado de tipos de cuentas bancarias que maneja la empresa,
ver: **\[Pestaña: Básico > Menú: Títulos > tipos de cuentas bancarias\]**.





﻿

# Tipo documento

Tipo de documento del titular de la cuenta bancaria que se esta creando.



Ejemplo

La empresa MP EJEMPLO maneja una cuenta corriente Bancolombia para el pago de
las cuentas por pagar a proveedores.

**Información de la cuenta** Banco | Número cuenta | Tipo cuenta
---|---|---
007 - Bancolombia | 897 456 4562 | 02 - Cuenta corriente

**Información del titular de la cuenta** Tipo de documento | Documento | Nombre | 31 - NIT | 900.256.456 | MP EJEMPLO
---|---|---
En el campo **"Tipo documento"** debe seleccionar el tipo de documento del
titular de la cuenta bancaria que se esta creando: **31 - NIT**.


Observaciones

\[ContaPyme\] presenta un listado con todos los tipos de documentos creados en
el catálogo de tipos de documentos.

Estos datos son informativos.

Configuración

Para crear el listado de tipos de documentos que maneja la empresa, ver:
**\[Pestaña: Básico > Menú: Títulos > tipos de documentos\]**.





﻿

# Documento

Número de identificación del titular de la cuenta que se esta creando.

Ejemplo

La empresa MP EJEMPLO maneja una cuenta corriente Bancolombia para el pago de
las cuentas por pagar a proveedores.

**Información de la cuenta** Banco | Número cuenta | Tipo cuenta
---|---|---
007 - Bancolombia | 897 456 4562 | 02 - Cuenta corriente

**Información del titular de la cuenta** Tipo de documento | Documento | Nombre | 31 - NIT | 900.256.456 | MP EJEMPLO
---|---|---

En el campo **"Documento"** debe digitar el número de identificación del
titular de la cuenta bancaria que se esta creando: **900.256.456**.

Observaciones

Estos datos son para complementar la información de las cuentas bancarias que
se están creando.



﻿

# Nombre

Nombre del titular de la cuenta.

Ejemplo

La empresa MP EJEMPLO maneja una cuenta corriente Bancolombia para el pago de
las cuentas por pagar a proveedores.

**Información de la cuenta** Banco | Número cuenta | Tipo cuenta
---|---|---
007 - Bancolombia | 897 456 4562 | 02 - Cuenta corriente

**Información del titular de la cuenta** Tipo de documento | Documento | Nombre | 31 - NIT | 900.256.456 | MP EJEMPLO
---|---|---

En el campo **"Nombre"** debe digitar el nombre del titular de la cuenta
bancaria que se esta creando: **MP EJEMPLO**.

Observaciones

Estos datos son informativos para complementar la información de las cuentas
bancarias que se están creando.



﻿

# Cuenta

Cuenta del plan de cuentas que va a manejar la cuenta bancaria que se esta
creando.

Ejemplo

La empresa tiene creada una cuenta contable por cada cuenta bancaria que
maneja.

Cuentas bancarias que maneja la empresa | Cuenta del catálogo plan de cuentas
---|---
Cuenta de ahorros Bancolombia No 4561 8956 8989 | 11100501 - Cuenta ahorros Bancolombia No 4561 8956 8989
Cuenta de nómina Bancolombia No 5645 7545 4551 | 11100502 - Cuenta de nómina Bancolombia No 5645 7545 4551
Cuenta Corriente Davivienda No 4561 7879 4656  | 11100503 - Cuenta Corriente Davivienda No 4561 7879 4656

En el campo **"Cuenta"** de información adicional debe relacionar la cuenta
creada en el catálogo del plan de cuentas correspondiente a la cuenta bancaria
que se esta creando: **11100503 - Cuenta Corriente Davivienda No 4561 7879
4656**.

Observaciones

\[ContaPyme\] presenta un listado con todas las cuentas creadas en el catálogo
de plan de cuentas, por lo tanto, la cuenta que requiere relacionar a la
cuenta bancaria ya debe estar creada.

Para crear una cuenta en el catálogo de plan de cuentas, ver:**\[Pestaña:
Básico > Contasbilidad > Plan de cuentas\].**

Esta cuenta permite automatizar la generación de movimiento contable a través
de la generación de pagos.



﻿

# Empresa

Código de la empresa a la cual pertenece la cuenta empresarial.

Observaciones

Las cuentas empresariales son propias de cada empresa y de cada sede.

Este dato es de solo lectura y es asignado directamente por el sistema
dependiendo de la empresa sobre la cual se está creando la cuenta empresarial.



﻿

# Sede

Código de la sede a la cual pertenece la cuenta empresarial.

Ejemplo

La empresa MP EJEMPLO tiene una cuenta bancaria para cada una de sus sedes:  Empresa | Sede | Banco | Número de cuenta
---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562
1- MP EJEMPLO | 12 - Medellín | 51 - Davivienda | 645 456 4123

En el campo **"SEDE"** debe seleccionar la sede en la cual se requiere
registrar la cuenta empresarial: **11 - Manizales**.


Observaciones

Las cuentas empresariales son propias de cada empresa y cada sede.

Este dato es de solo lectura y es asignado por el usuario al momento de dar
clic en crear cuenta empresarial.





﻿

# Banco

Código de compensación que le corresponde a cada banco de la cuenta
empresarial que se esta creando.

Ejemplo

La empresa MP EJEMPLO maneja 2 cuentas bancarias, una la maneja la sede de Manizales y la otra se maneja para la sede Medellín.  Empresa | Sede | Banco | Número de cuenta
---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562
1- MP EJEMPLO | 12 - Medellín | 51 - Banco Davivienda | 645 456 4123

En el campo **"Banco"** el asistente muestra código de compensación que le
corresponde a cada banco de la cuenta empresarial que se esta creando: **007 -
Bancolombia**.


Observaciones

Las cuentas empresariales son propias de cada empresa y cada sede.

Este dato es de solo lectura y es asignado por el usuario al momento de dar
clic en crear cuenta empresarial.



Configuración

Para crear el listado de bancos que maneja la empresa, ver: **\[Pestaña:
Básico > Menú: Títulos > Bancos\]**.





---

#### [17610] FrmInputNewEmpCuenta

﻿

# Empresa

Código de la empresa a la cual pertenece la cuenta empresarial.

Observaciones

Las cuentas empresariales son propias de cada empresa y de cada sede.

Este dato es de solo lectura y es asignado directamente por el sistema
dependiendo de la empresa sobre la cual se está creando la cuenta empresarial.

Si requiere que la cuenta empresarial pertenezca a otra empresa diferente a la
aquí indicada, debe modificar la empresa de trabajo seleccionada en
\[ContaPyme\].

Configuración

Para modificar la empresa de trabajo seleccionada en \[ContaPyme\] ver:
**\[Barra de estado: Empresa de trabajo\]**.



﻿

# Sede

Seleccione la sede a la cual pertenece la cuenta empresarial.

Ejemplo

La empresa MP EJEMPLO tiene una cuenta bancaria para cada una de sus sedes:  Empresa | Sede | Banco | Número de cuenta
---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562
1- MP EJEMPLO | 12 - Medellín | 51 - Banco Davivienda | 645 456 4123

En el campo **"SEDE"** debe seleccionar la sede en la cual se requiere
registrar la cuenta empresarial: **11 - Manizales**.


Observaciones

Las cuentas empresariales son propias de cada empresa y cada sede.

\[ContaPyme\] presenta un seleccionador donde filtra las sedes que se tenga
creadas en cada una de las empresas.

Configuración

Para crear las sedes de cada empresa registradas en \[ContaPyme\] ver:
**\[Pestaña: Básico > Explorador gráfico de empresa\]**.



﻿

# Banco

Seleccione el banco al cual pertenece la cuenta empresarial que se esta
creando.

Ejemplo

La empresa MP EJEMPLO tiene 2 cuentas bancarias, una la maneja la sede de Manizales y la otra se maneja para la sede Medellín.  Empresa | Sede | Banco | Número de cuenta
---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562
1- MP EJEMPLO | 12 - Medellín | 51 - Banco Davivienda | 645 456 4123

En el campo **"Banco"** debe seleccionar el banco en la cual se requiere
registrar la cuenta empresarial: **007 - Bancolombia**.


Observaciones

Es un campo de registro obligatorio.

Al seleccionar el banco \[ContaPyme\] el asistente muestra código de
compensación que le corresponde a cada banco: **007** \- Bancolombia

\[ContaPyme\] presenta un listado con todos los bancos creados en el catálogo
de bancos del sistema.

Configuración

Para crear el listado de bancos que maneja la empresa, ver: **\[Pestaña:
Básico > Menú: Títulos > Bancos\]**.



﻿

# Número de cuenta.

Digite el número de la cuenta que esta creando.

La empresa MP EJEMPLO tiene 2 cuentas bancarias, una la maneja la sede de Manizales y la otra se maneja para la sede Medellín.  Empresa | Sede | Banco | Número de cuenta
---|---|---|---
1- MP EJEMPLO | 11 - Manizales | 007 - Bancolombia | 897 456 4562
1- MP EJEMPLO | 12 - Medellín | 51 - Banco Davivienda | 645 456 4123

En el campo **"Número de cuenta"** Se debe digitar el número de cuenta
bancaria que se esta creando.: **897 456 4562**.


Observaciones



Es un campo de registro obligatorio.

El código de la cuenta empresarial puede ser numérico o alfanumérico y se
admiten hasta 20 caracteres.

Este dato se utilizará cuando se realice el registro para la programación de
un pago \(CXP\) y quedará registrado automáticamente en el archivo plano de
pago que se sube al banco.





---

### Programacion de pagos

#### [17670] FrmProgPago

﻿

# Fecha

Fecha y hora de registro de programación de pagos

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los empleados del mes de octubre de 2018.

![10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/10.png)
En el campo **Fecha** se muestra la fecha y hora de creación de programación
de pagos, esta fecha y hora la toma del equipo.

![10A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/10A.png)
De esta manera poder identificar la fecha-hora y el tipo de registro que se
realizó desde el catálogo de programación de pagos.



﻿

# Cód - Centro de costos

Código del centro de costo asociado a la cuenta de proveedores.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/120.png)

La columna **"Cód - Centro de costos"** se muestra el código del centro de
costo con el cual se registró la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por centro de costo.

Es un campo informativo, si requiere cambiar el centro de costo se debe
realizar desde la operación donde registró la cuenta por pagar.

Es importante tener en cuenta que el asistente trae la información del centro
de costo desde que la cuenta contable tenga la configuración de **"Exige
centro de costo"** y este es dado en la operación donde se creo la cuenta por
pagar.

Para configurar el manejo de centros de costos en la cuenta de proveedores.
[Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)



﻿

# Centro de costos

Nombre del centro de costo asociado a la cuenta de proveedores.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![130.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/130.png)

La columna **"Centro de costos"** muestra el nombre del centro de costo con el
cual se registró la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por nombre de centro
de costo.

Es un campo informativo, si requiere cambiar el nombre del centro de costo se
debe realizar desde el explorador gráfico de empresa.

Es importante tener en cuenta que el asistente trae la información del centro
de costo desde que la cuenta contable tenga la configuración de **"Exige
centro de costo"** y este es dado en la operación donde se creo la cuenta por
pagar.

Para configurar el manejo de centros de costos en la cuenta de proveedores.
[Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)



﻿

# Número de documento

Número de documento o referencia con la que quedó registrada la cuenta por
pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/140.png)

La columna **"Número de documento"** muestra el número de documento o
referencia con la que quedó registrada la operación con la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por número de
documento.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cuenta

Número de la cuenta contable con la que se registro la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/150.png)

La columna **"Cuenta"** muestra el número de la cuenta contable con la cual se
registro la cuenta por pagar al tercero.

Observaciones

En la columna es posible realizar filtros personalizados por cuenta.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante que la cuenta tenga la configuración de cartera y proveedores,
es decir, la configuración de **"Exige tercero, Controla endeudamiento y
maneja referencias"** para obtener los datos necesarios para la generación del
archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Código tercero

Número de identificación del tercero al cual se le registro la cuenta por
pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/160.png)

La columna **"Código de tercero"** muestra el número de identificación del
tercero con el cual se registro la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por código de
tercero.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde el catálogo de terceros.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de **"Exige
tercero, Controla endeudamiento y maneja referencias"** , de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# D.V

Active esta opción, si requiere agregar el dígito de verificación del tercero
en el archivo de pago.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![170.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/170.png)
La columna **"D.V"** se activa para aquellos terceros que requiere agregar el
dígito de verificación en el archivo de pago.

![170A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/170A.png)
Al activar esta opción se agrega en el campo **"Código de tercero" el número
de dígito de verificación del tercero y será incluido en el archivo de pago.**

Observaciones

Esta opción se activa dependiendo de como tenga registrado el tercero en el
portal del banco, es decir, si tiene o no registrado el tercero con dígito de
verificación.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de **"Exige
tercero, Controla endeudamiento y maneja referencias"** , de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Tercero

Nombre del tercero al cual se le resgistro la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![190.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/190.png)

La columna **"Tercero"** muestra el nombre del tercero con el cual se registro
la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por nombre del
tercero.

Es un campo informativo, si requiere cambiar la información del tercero se
debe realizar desde el catálogo de terceros.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de **"Exige
tercero, Controla endeudamiento y maneja referencias"** , de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha

Fecha de soporte en la que se registro la cuenta por pagar en \[Contapyme\]

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![200.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/200.png)

La columna **"Fecha"** muestra la fecha de soporte en la que se registrado la
cuenta por pagar al tercero.

Observaciones



En la columna es posible realizar filtros personalizados por fecha de soporte.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Descripción

Descripción dado al registro de programación de pagos

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los empleados del mes de Octubre 2018.
![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/20.png)
En el campo **Descripción** se puede especificar el tipo de programación de
pagos que se esta registrando: **"Pago nómina empleados"**

![20A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/20A.png)
De esta manera poder identificar el tipo de registro que se realizó desde el
catálogo de programación de pagos.



﻿

# Fecha de vencimiento

Fecha de vencimiento de la cuenta por pagar que se registro en \[Contapyme\]

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![210.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/210.png)

La columna **"Fecha de vencimiento"** muestra la fecha de vencimiento que se
registro en la creación de la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por fecha de
vencimiento.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Total a pagar

Valor total de la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![220.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/220.png)

La columna **"Total a pagar"** muestra el valor registrado en la cuenta por
pagar de cada uno de los terceros y referencia.

Observaciones

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Pagar

Active esta opción a las cuentas por pagar a las cual requiere que se genere
el archivo de pago.


Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![230.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/230.png)

La columna **"Pagar"** se activa solo a las cuentas por pagar que requiere
realizar el pago y generar el archivo de pago para el banco.

Observaciones

En la columna es posible realizar filtros personalizados; por ejemplo, filtar
solo las cuentas por pagar que tengan activada la ocpión **"pagar"**.

Al activar la opción **"pagar"** automáticamente se carga la información del
saldo por pagar, fecha a pagar y la información del banco origen de la cuenta
por pagar.



﻿

# Saldo a pagar

Valor a pagar de cada una de las cuentas por pagar.

Al activar la opción **"Pagar"** , automáticamente se obtiene el dato **"saldo
a pagar"** que se registro en la operación origen, este dato se puede cambiar
manualmente en caso de que se requiera pagar solo una parte de la deuda
actual.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![240.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/240.png)
En la columna **"Saldo a pagar"** se puede digitar el valor que requiere pagar
para cada una de las cuentas por pagar.

Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha a pagar

Fecha en la que se requiere realizar el pago de la deuda.

Al activar la opción **"Pagar"** , automáticamente se obetiene el dato que se
registro en el campo **"Fecha de pago por defecto"**.
Para seleccionar una fecha a pagar diferente, debe dar clic en la columna
**"Fecha a pagar"** y posteriormente clic en el botón que se habilita para su
selección.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![250.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/250.png)
En la columna **"Fecha a pagar"** se indica la fecha en que se requiere
realizar el pago para cada cuenta por pagar pendiente y será registrado en el
archivo de pago.

Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cuenta

Número de cuenta bancaria de donde sale el dinero.

El asistente trae automáticamente la cuenta empresarial que se tiene asignada
por configuraciones del catálogo de programación de pagos.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Para seleccionar la cuenta bancaria, debe dar clic en la columna **"Cuenta"**
, posteriormente clic en el botón que se habilita para su selección.

![260.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/260.png)
En la columna **"Cuenta origen"** se debe seleccionar la cuenta bancaria de
donde sale el dinero para el archivo de pago.

Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Las cuentas de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales,
ver:**\[Pestaña: Cartera > Cuentas empresariales\].**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**
Para configurar una cuenta banacaria por defecto, ver: **\[Pestaña: Cartera >
programación de pagos> Cinta opciones: Configuración > opciones generales >
Configuración general"\].**



﻿

# Banco

Nombre de la cuenta bancaria de donde sale el dinero

El asistente trae automáticamente el nombre de la cuenta bancaria que tiene
configurada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![270.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/270.png)
La columna **"Banco origen"** muestra el nombre de cuenta bancaria de donde
sale el dinero para el pago de la cuenta por pagar y que será registrada en el
archivo de pago para el banco.


Observaciones

Las cuentas de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales, ver:
**\[Pestaña: Cartera > Cuentas empresariales\]. **

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**
Para configurar una cuenta banacaria por defecto, ver: **\[Pestaña: Cartera >
programación de pagos> Cinta opciones: Configuración > opciones generales >
Configuración general"\].**



﻿

# Tipo de cuenta

Tipo de cuenta bancaria de donde sale el dinero
El asistente trae automáticamente por defecto el tipo de cuenta bancaria que
se tiene asignada al número de cuenta origen seleccionada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![280.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/280.png)
La columna **"Tipo de cuenta origen"** muestra el tipo de cuenta bancaria que
tiene configurada la cuenta empresarial seleccionada.


Observaciones

Las cuentas de banco destino, se configuran en cada tercero, ver: **\[Pestaña:
Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho modificar >
Pestaña: Cuenta bancaria\].**

El tipo de cuenta de cada banco se configura en la creación de las cuentas
empresariales de la empresa. Para crear y configurar la información de las
cuentas empresariales, ver: **\[Pestaña: Cartera > Cuentas empresariales\].

** Es importante tener en cuenta que el asistente trae toda la información de
la cuenta por pagar \(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta
contable tenga las configuraciones de cartera, es decir, la configuración de
"Exige tercero, Controla endeudamiento y maneja referencias", de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**
Para configurar el tipo de cuenta banacaria por defecto, ver: **\[Pestaña:
Cartera > programación de pagos> Cinta opciones: Configuración > opciones
generales > Configuración general"\].**



﻿

# Cuenta

Número de cuenta bancaria en donde entra el dinero.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Para seleccionar la cuenta bancaria, debe dar clic en la columna **"Cuenta"**
, posteriormente clic en el botón que se habilita para su selección.

![290.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/290.png)
En la columna **"Cuenta destino"** se debe seleccionar la cuenta bancaria del
tercero donde va a ingresar el dinero.


Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Las cuentas de banco destino, se configuran en cada tercero, ver: **\[Pestaña:
Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho modificar >
Pestaña: Cuentas de banco\]. **

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Banco

Nombre del banco donde entrará el dinero.

El asistente trae automáticamente el nombre de cuenta bancaria que tiene
asignada al número de cuenta destino seleccionada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![300.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/300.png)
La columna **"Banco destino"** muestra el nombre de la cuenta bancaria que
tiene configurada tercero al que se le realizará el pago.

Observaciones

El nombre de las cuentas de banco destino, se configuran en cada tercero, ver:
**\[Pestaña: Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho
modificar > Pestaña: Cuenta bancaria\].**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha de pago por defecto

Indique la fecha de pago que tomará las cuentas por pagar por defecto.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los empleados del mes de enero.
![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/30.png)

En el campo **Fecha de pago por defecto** se indica la fecha que pago que
requiere que tome por defecto todas las cuentas por pagar del listado.



﻿

# Tipo movimiento

Tipo de movimiento bancario que se esta realizando.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Para seleccionar el tipo de movimiento bancario, debe dar clic en la columna
**"Tipo de movimiento"** , posteriormente clic en el botón que se habilita
para su selección.

![310.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/310.png)
En la columna **"Tipo movimiento"** Se asigna el tipo de movimiento bancario
que se esta realizando: **CE- Transferencia y/o retiro**

Observaciones

\[ContaPyme\], cuenta con un catálogo con los tipos movimientos bancarios que
puede manejar una empresa.

Para configurar los tipos de movimiento bancario que maneja la empresa, ver:
**\[Pestaña: Contabilidad > Tipo de movimientos\].**

Para configurar un tipo de movimiento bancario por defecto, ver: **\[Pestaña:
Cartera > Programación de pagos > Configuración > Opciones generales >
Configuración general > Tipo de movimiento por defecto.\]**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Número

Indique el número de cheque o de transacción del movimiento.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![310.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/310.png)
En la columna **"Número"** digite el número de cheque o de transacción que
corresponde para le tipo de movimiento.

Observaciones

Para configurar los tipos de movimiento bancario que maneja la empresa, ver:
**\[Pestaña: Contabilidad > Tipo de movimientos\].**

Para configurar un tipo de movimiento bancario por defecto, ver: **\[Pestaña:
Cartera > Programación de pagos > Configuración > Opciones generales >
Configuración general > Tipo de movimiento por defecto.\]**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Tipo de cuenta

Tipo de cuenta bancaria donde entrará el dinero.

El asistente trae automáticamente el tipo de cuenta bancaria que tiene
asignada el número de cuenta destino seleccionada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![330.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/330.png)
La columna **"Tipo de cuenta"** muestra el tipo de cuenta bancaria que tiene
configurada el tercero al que se le realizará el pago: **Cuenta corriente**

Observaciones

Las cuentas de banco destino, se configuran en cada tercero, ver: \[Pestaña:
Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho modificar >
Pestaña: Cuenta bancaria\].

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Motivo de pago

Indique el motivo del pago a la deuda.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![340.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/340.png)
La columna **"Motivo de pago"** puede digitar una observación sobre el pago de
la cuenta por pagar.

Observaciones

El asisten asigna una observación automáticamente, pero es de libre definición
del usuario.



﻿

# Referencia

Referencia con la que quedó registrada la cuenta por pagar.

Este campo esta disponible en caso de que la referencia sea diferente al
número de documento con la que quedó registrada la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![350.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/350.png)

La columna **"Referencia"** muestra el la Referencia con la que quedó
registrada la operación con la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por referencia.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Transferencia

Información sobre el estado de la cuenta por pagar.

\[ContaPyme\], automáticamente asigna un estado a la cuenta por pagar después
de generar el archivo de pago, informando la fecha en que se genero el archivo
de pago y el driver seleccionado.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![360.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/360.png)




﻿

# Movimiento contable

Información sobre el estado del movimiento contable de los registros a los
cuales se les genero el archivo de pago.

\[ContaPyme\], automáticamente asigna un estado del movimiento contable que se
generó sobre la cuenta por pagar después de activar el botón **"Generar
movimiento contable"** , informando el documento de soporte y referencia con
la que quedó registrada la trasancción contable.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![370.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/370.png)

Observaciones

El asiento contable queda registrado automáticamente en \[ContaPyme\] por
medio de la operación de movimientos contable, realizando un débito a la
cuenta por pagar y crédito a su contrapartida \(Cuenta de banco\).

La cuenta de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales, ver:
**\[Pestaña: Cartera > Cuentas empresariales\].**

Desde las configuraciones especiales del catálogo se pueden configurar la
cuenta empresarial por defecto, su tipo de movimiento bancario por defecto, el
tipo de documento de soporte por defecto para la generación del movimiento
contable automático.

También se puede activar unas opciones especiales para la generación del
movimiento contable automático, tales como:
\- Totalizar saldos por tercero.
\- Totalizar movimiento contable.
\- Generar el movimiento contable por cada registro.

Configuración

Para ingresar a las configuraciones especiales del catálogo, ver: **\[Pestaña:
Cartera > Prog. pagos > Cinta de opciones: Configuración > Opciones
generales"\].**



﻿

# Valor1

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Agregar cuentas por pagar

Esta acción nos muestra un formulario donde podemos especificar los parámetros
para obtener las cuentas por pagar que tenemos pendientes.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente con el proveedor Proveequipos en el mes de enero.

![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/40.png)

Observaciones

Se puede realizar filtros entre un rango de fechas, por un tercero en
específico y se pueden utilizar las categorías o clasificaciones que se tenga
asignados a los terceros.



﻿

# Dato1

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Dato2

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Valor2

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Generar Archivo

Esta acción nos muestra el formulario para generar el archivo de pago que
contiene las cuentas por pagar agregadas a la lista.

Ejemplo

De forma automática se carga la información de la cuenta bancaria y tipo de
movimiento que se realizaron previamente en la configuración de dicho
catálogo, por último se cuenta con la opción de poder seleccionar el driver
que se va a utilizar para generar el archivo.

![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/50.png)

Una vez se genere el archivo de pago se muestra un log donde se indica los
errores o advertencias que surgieron a la hora de generar el archivo.

![50A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/50A.png)


Observaciones

Al momento de cerrar el log el sistema pide que el archivo sea guardado en el
disco duro del computador, una vez guardado el archivo de pago, a cada
registro se le agrega una descripción la cual indica la fecha en que fue
generado el archivo de pago y que driver fue utilizado para generar dicho
archivo.



﻿

# Copiar

Permite copiar los registros de la grid en el clipboard para luego pegarlos
por ejemplo en un archivo XLS.



﻿

# Generar movimiento contable

Una vez generado el archivo de pago y que cada uno de los registros tenga la
descripción de la generación del archivo, se puede generar el movimiento
contable, este se genera con base a los datos que se realizaron en las
configuraciones espeaciales del catálogo y en la creación de la cuenta
empresarial.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Se activa el botón **"Generar movimiento contable"** para que \[Contapyme\]
automáticamente genere el movimiento contable sobre el pago de las cuentas por
pagar.

una vez se genere el movimiento contable a cada registro se le agrega la
descripción con información de la operación.

![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/70.png)



Observaciones

El asiento contable queda registrado automáticamente en \[ContaPyme\] por
medio de la operación de movimientos contable, realizando un débito a la
cuenta por pagar y crédito a su contrapartida \(Cuenta de banco\).

La cuenta de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales, ver:
**\[Pestaña: Cartera > Cuentas empresariales\].**

Desde las configuraciones especiales del catálogo se pueden configurar la
cuenta empresarial por defecto, su tipo de movimiento bancario por defecto, el
tipo de documento de soporte por defecto para la generación del movimiento
contable automático.

También se puede activar unas opciones especiales para la generación del
movimiento contable automático, tales como:
\- Totalizar saldos por tercero.
\- Totalizar movimiento contable.
\- Generar el movimiento contable por cada registro.

Configuración

Para ingresar a las configuraciones especiales del catálogo, ver: **\[Pestaña:
Cartera > Prog. pagos > Cinta de opciones: Configuración > Opciones
generales"\].**





﻿

# Previsualizar archivo

Acción que permite visualizar en formato HTML el archivo de pago que se
generó.

Ejemplo

Se selecciona el archivo generado, se selecciona el driver con el cual se
generó el archivo de pago y de manera opcional la ruta donde se quiere guardar
el archivo HTML.

![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/80.png)

Una vez seleccionados los parámetros se da clic en aceptar y se abre el
navegador con el archivo en formato HTML.

![80A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programacion%20de%20pagos/%5B17670%5D%20FrmProgPago/80A.png)



---

### Programaci¾n de pagos

#### [17670] FrmProgPago

﻿

# Fecha

Fecha y hora de registro de programación de pagos

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los empleados del mes de octubre de 2018.

![10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/10.png)
En el campo **Fecha** se muestra la fecha y hora de creación de programación
de pagos, esta fecha y hora la toma del equipo.

![10A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/10A.png)
De esta manera poder identificar la fecha-hora y el tipo de registro que se
realizó desde el catálogo de programación de pagos.



﻿

# Cód - Centro de costos

Código del centro de costo asociado a la cuenta de proveedores.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/120.png)

La columna **"Cód - Centro de costos"** se muestra el código del centro de
costo con el cual se registró la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por centro de costo.

Es un campo informativo, si requiere cambiar el centro de costo se debe
realizar desde la operación donde registró la cuenta por pagar.

Es importante tener en cuenta que el asistente trae la información del centro
de costo desde que la cuenta contable tenga la configuración de **"Exige
centro de costo"** y este es dado en la operación donde se creo la cuenta por
pagar.

Para configurar el manejo de centros de costos en la cuenta de proveedores.
[Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)



﻿

# Centro de costos

Nombre del centro de costo asociado a la cuenta de proveedores.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![130.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/130.png)

La columna **"Centro de costos"** muestra el nombre del centro de costo con el
cual se registró la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por nombre de centro
de costo.

Es un campo informativo, si requiere cambiar el nombre del centro de costo se
debe realizar desde el explorador gráfico de empresa.

Es importante tener en cuenta que el asistente trae la información del centro
de costo desde que la cuenta contable tenga la configuración de **"Exige
centro de costo"** y este es dado en la operación donde se creo la cuenta por
pagar.

Para configurar el manejo de centros de costos en la cuenta de proveedores.
[Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)



﻿

# Número de documento

Número de documento o referencia con la que quedó registrada la cuenta por
pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/140.png)

La columna **"Número de documento"** muestra el número de documento o
referencia con la que quedó registrada la operación con la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por número de
documento.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cuenta

Número de la cuenta contable con la que se registro la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/150.png)

La columna **"Cuenta"** muestra el número de la cuenta contable con la cual se
registro la cuenta por pagar al tercero.

Observaciones

En la columna es posible realizar filtros personalizados por cuenta.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante que la cuenta tenga la configuración de cartera y proveedores,
es decir, la configuración de **"Exige tercero, Controla endeudamiento y
maneja referencias"** para obtener los datos necesarios para la generación del
archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Código tercero

Número de identificación del tercero al cual se le registro la cuenta por
pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/160.png)

La columna **"Código de tercero"** muestra el número de identificación del
tercero con el cual se registro la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por código de
tercero.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde el catálogo de terceros.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de **"Exige
tercero, Controla endeudamiento y maneja referencias"** , de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# D.V

Active esta opción, si requiere agregar el dígito de verificación del tercero
en el archivo de pago.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![170.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/170.png)
La columna **"D.V"** se activa para aquellos terceros que requiere agregar el
dígito de verificación en el archivo de pago.

![170A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/170A.png)
Al activar esta opción se agrega en el campo **"Código de tercero" el número
de dígito de verificación del tercero y será incluido en el archivo de pago.**

Observaciones

Esta opción se activa dependiendo de como tenga registrado el tercero en el
portal del banco, es decir, si tiene o no registrado el tercero con dígito de
verificación.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de **"Exige
tercero, Controla endeudamiento y maneja referencias"** , de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Tercero

Nombre del tercero al cual se le resgistro la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![190.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/190.png)

La columna **"Tercero"** muestra el nombre del tercero con el cual se registro
la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por nombre del
tercero.

Es un campo informativo, si requiere cambiar la información del tercero se
debe realizar desde el catálogo de terceros.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de **"Exige
tercero, Controla endeudamiento y maneja referencias"** , de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha

Fecha de soporte en la que se registro la cuenta por pagar en \[Contapyme\]

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![200.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/200.png)

La columna **"Fecha"** muestra la fecha de soporte en la que se registrado la
cuenta por pagar al tercero.

Observaciones



En la columna es posible realizar filtros personalizados por fecha de soporte.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Descripción

Descripción dado al registro de programación de pagos

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los empleados del mes de Octubre 2018.
![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/20.png)
En el campo **Descripción** se puede especificar el tipo de programación de
pagos que se esta registrando: **"Pago nómina empleados"**

![20A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/20A.png)
De esta manera poder identificar el tipo de registro que se realizó desde el
catálogo de programación de pagos.



﻿

# Fecha de vencimiento

Fecha de vencimiento de la cuenta por pagar que se registro en \[Contapyme\]

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![210.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/210.png)

La columna **"Fecha de vencimiento"** muestra la fecha de vencimiento que se
registro en la creación de la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por fecha de
vencimiento.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Total a pagar

Valor total de la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![220.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/220.png)

La columna **"Total a pagar"** muestra el valor registrado en la cuenta por
pagar de cada uno de los terceros y referencia.

Observaciones

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Pagar

Active esta opción a las cuentas por pagar a las cual requiere que se genere
el archivo de pago.


Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![230.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/230.png)

La columna **"Pagar"** se activa solo a las cuentas por pagar que requiere
realizar el pago y generar el archivo de pago para el banco.

Observaciones

En la columna es posible realizar filtros personalizados; por ejemplo, filtar
solo las cuentas por pagar que tengan activada la ocpión **"pagar"**.

Al activar la opción **"pagar"** automáticamente se carga la información del
saldo por pagar, fecha a pagar y la información del banco origen de la cuenta
por pagar.



﻿

# Saldo a pagar

Valor a pagar de cada una de las cuentas por pagar.

Al activar la opción **"Pagar"** , automáticamente se obtiene el dato **"saldo
a pagar"** que se registro en la operación origen, este dato se puede cambiar
manualmente en caso de que se requiera pagar solo una parte de la deuda
actual.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![240.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/240.png)
En la columna **"Saldo a pagar"** se puede digitar el valor que requiere pagar
para cada una de las cuentas por pagar.

Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha a pagar

Fecha en la que se requiere realizar el pago de la deuda.

Al activar la opción **"Pagar"** , automáticamente se obetiene el dato que se
registro en el campo **"Fecha de pago por defecto"**.
Para seleccionar una fecha a pagar diferente, debe dar clic en la columna
**"Fecha a pagar"** y posteriormente clic en el botón que se habilita para su
selección.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![250.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/250.png)
En la columna **"Fecha a pagar"** se indica la fecha en que se requiere
realizar el pago para cada cuenta por pagar pendiente y será registrado en el
archivo de pago.

Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cuenta

Número de cuenta bancaria de donde sale el dinero.

El asistente trae automáticamente la cuenta empresarial que se tiene asignada
por configuraciones del catálogo de programación de pagos.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Para seleccionar la cuenta bancaria, debe dar clic en la columna **"Cuenta"**
, posteriormente clic en el botón que se habilita para su selección.

![260.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/260.png)
En la columna **"Cuenta origen"** se debe seleccionar la cuenta bancaria de
donde sale el dinero para el archivo de pago.

Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Las cuentas de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales,
ver:**\[Pestaña: Cartera > Cuentas empresariales\].**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**
Para configurar una cuenta banacaria por defecto, ver: **\[Pestaña: Cartera >
programación de pagos> Cinta opciones: Configuración > opciones generales >
Configuración general"\].**



﻿

# Banco

Nombre de la cuenta bancaria de donde sale el dinero

El asistente trae automáticamente el nombre de la cuenta bancaria que tiene
configurada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![270.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/270.png)
La columna **"Banco origen"** muestra el nombre de cuenta bancaria de donde
sale el dinero para el pago de la cuenta por pagar y que será registrada en el
archivo de pago para el banco.


Observaciones

Las cuentas de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales, ver:
**\[Pestaña: Cartera > Cuentas empresariales\]. **

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**
Para configurar una cuenta banacaria por defecto, ver: **\[Pestaña: Cartera >
programación de pagos> Cinta opciones: Configuración > opciones generales >
Configuración general"\].**



﻿

# Tipo de cuenta

Tipo de cuenta bancaria de donde sale el dinero
El asistente trae automáticamente por defecto el tipo de cuenta bancaria que
se tiene asignada al número de cuenta origen seleccionada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![280.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/280.png)
La columna **"Tipo de cuenta origen"** muestra el tipo de cuenta bancaria que
tiene configurada la cuenta empresarial seleccionada.


Observaciones

Las cuentas de banco destino, se configuran en cada tercero, ver: **\[Pestaña:
Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho modificar >
Pestaña: Cuenta bancaria\].**

El tipo de cuenta de cada banco se configura en la creación de las cuentas
empresariales de la empresa. Para crear y configurar la información de las
cuentas empresariales, ver: **\[Pestaña: Cartera > Cuentas empresariales\].

** Es importante tener en cuenta que el asistente trae toda la información de
la cuenta por pagar \(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta
contable tenga las configuraciones de cartera, es decir, la configuración de
"Exige tercero, Controla endeudamiento y maneja referencias", de esta manera,
poder obtener los datos necesarios para la generación del archivo y el
movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**
Para configurar el tipo de cuenta banacaria por defecto, ver: **\[Pestaña:
Cartera > programación de pagos> Cinta opciones: Configuración > opciones
generales > Configuración general"\].**



﻿

# Cuenta

Número de cuenta bancaria en donde entra el dinero.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Para seleccionar la cuenta bancaria, debe dar clic en la columna **"Cuenta"**
, posteriormente clic en el botón que se habilita para su selección.

![290.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/290.png)
En la columna **"Cuenta destino"** se debe seleccionar la cuenta bancaria del
tercero donde va a ingresar el dinero.


Observaciones

Es un campo necesario para la generación del archivo de pago que se generará
para subir al banco.

Las cuentas de banco destino, se configuran en cada tercero, ver: **\[Pestaña:
Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho modificar >
Pestaña: Cuentas de banco\]. **

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Banco

Nombre del banco donde entrará el dinero.

El asistente trae automáticamente el nombre de cuenta bancaria que tiene
asignada al número de cuenta destino seleccionada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![300.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/300.png)
La columna **"Banco destino"** muestra el nombre de la cuenta bancaria que
tiene configurada tercero al que se le realizará el pago.

Observaciones

El nombre de las cuentas de banco destino, se configuran en cada tercero, ver:
**\[Pestaña: Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho
modificar > Pestaña: Cuenta bancaria\].**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha de pago por defecto

Indique la fecha de pago que tomará las cuentas por pagar por defecto.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los empleados del mes de enero.
![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/30.png)

En el campo **Fecha de pago por defecto** se indica la fecha que pago que
requiere que tome por defecto todas las cuentas por pagar del listado.



﻿

# Tipo movimiento

Tipo de movimiento bancario que se esta realizando.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Para seleccionar el tipo de movimiento bancario, debe dar clic en la columna
**"Tipo de movimiento"** , posteriormente clic en el botón que se habilita
para su selección.

![310.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/310.png)
En la columna **"Tipo movimiento"** Se asigna el tipo de movimiento bancario
que se esta realizando: **CE- Transferencia y/o retiro**

Observaciones

\[ContaPyme\], cuenta con un catálogo con los tipos movimientos bancarios que
puede manejar una empresa.

Para configurar los tipos de movimiento bancario que maneja la empresa, ver:
**\[Pestaña: Contabilidad > Tipo de movimientos\].**

Para configurar un tipo de movimiento bancario por defecto, ver: **\[Pestaña:
Cartera > Programación de pagos > Configuración > Opciones generales >
Configuración general > Tipo de movimiento por defecto.\]**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Número

Indique el número de cheque o de transacción del movimiento.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![310.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/310.png)
En la columna **"Número"** digite el número de cheque o de transacción que
corresponde para le tipo de movimiento.

Observaciones

Para configurar los tipos de movimiento bancario que maneja la empresa, ver:
**\[Pestaña: Contabilidad > Tipo de movimientos\].**

Para configurar un tipo de movimiento bancario por defecto, ver: **\[Pestaña:
Cartera > Programación de pagos > Configuración > Opciones generales >
Configuración general > Tipo de movimiento por defecto.\]**

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Tipo de cuenta

Tipo de cuenta bancaria donde entrará el dinero.

El asistente trae automáticamente el tipo de cuenta bancaria que tiene
asignada el número de cuenta destino seleccionada.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![330.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/330.png)
La columna **"Tipo de cuenta"** muestra el tipo de cuenta bancaria que tiene
configurada el tercero al que se le realizará el pago: **Cuenta corriente**

Observaciones

Las cuentas de banco destino, se configuran en cada tercero, ver: \[Pestaña:
Básico > Catálogo de tercero > Seleccionar tercero: Clic derecho modificar >
Pestaña: Cuenta bancaria\].

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar \(Número de documento, Código de tercero, Nombre del tercero,
fecha de soporte, fecha de pago, Total a pagar\), desde que la cuenta contable
tenga las configuraciones de cartera, es decir, la configuración de "Exige
tercero, Controla endeudamiento y maneja referencias", de esta manera, poder
obtener los datos necesarios para la generación del archivo y el movimiento
contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Motivo de pago

Indique el motivo del pago a la deuda.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![340.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/340.png)
La columna **"Motivo de pago"** puede digitar una observación sobre el pago de
la cuenta por pagar.

Observaciones

El asisten asigna una observación automáticamente, pero es de libre definición
del usuario.



﻿

# Referencia

Referencia con la que quedó registrada la cuenta por pagar.

Este campo esta disponible en caso de que la referencia sea diferente al
número de documento con la que quedó registrada la cuenta por pagar.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![350.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/350.png)

La columna **"Referencia"** muestra el la Referencia con la que quedó
registrada la operación con la cuenta por pagar.

Observaciones

En la columna es posible realizar filtros personalizados por referencia.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por pagar.

Es importante tener en cuenta que el asistente trae toda la información de la
cuenta por pagar _\(Número de documento, Código de tercero, Nombre del
tercero, fecha de soporte, fecha de pago Total a pagar\)_ , desde que la
cuenta contable tenga las configuraciones de cartera, es decir, la
configuración de **"Exige tercero, Controla endeudamiento y maneja
referencias"** , de esta manera, poder obtener los datos necesarios para la
generación del archivo y el movimiento contable del pago.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Transferencia

Información sobre el estado de la cuenta por pagar.

\[ContaPyme\], automáticamente asigna un estado a la cuenta por pagar después
de generar el archivo de pago, informando la fecha en que se genero el archivo
de pago y el driver seleccionado.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![360.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/360.png)




﻿

# Movimiento contable

Información sobre el estado del movimiento contable de los registros a los
cuales se les genero el archivo de pago.

\[ContaPyme\], automáticamente asigna un estado del movimiento contable que se
generó sobre la cuenta por pagar después de activar el botón **"Generar
movimiento contable"** , informando el documento de soporte y referencia con
la que quedó registrada la trasancción contable.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

![370.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/370.png)

Observaciones

El asiento contable queda registrado automáticamente en \[ContaPyme\] por
medio de la operación de movimientos contable, realizando un débito a la
cuenta por pagar y crédito a su contrapartida \(Cuenta de banco\).

La cuenta de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales, ver:
**\[Pestaña: Cartera > Cuentas empresariales\].**

Desde las configuraciones especiales del catálogo se pueden configurar la
cuenta empresarial por defecto, su tipo de movimiento bancario por defecto, el
tipo de documento de soporte por defecto para la generación del movimiento
contable automático.

También se puede activar unas opciones especiales para la generación del
movimiento contable automático, tales como:
\- Totalizar saldos por tercero.
\- Totalizar movimiento contable.
\- Generar el movimiento contable por cada registro.

Configuración

Para ingresar a las configuraciones especiales del catálogo, ver: **\[Pestaña:
Cartera > Prog. pagos > Cinta de opciones: Configuración > Opciones
generales"\].**



﻿

# Valor1

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Agregar cuentas por pagar

Esta acción nos muestra un formulario donde podemos especificar los parámetros
para obtener las cuentas por pagar que tenemos pendientes.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente con el proveedor Proveequipos en el mes de enero.

![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/40.png)

Observaciones

Se puede realizar filtros entre un rango de fechas, por un tercero en
específico y se pueden utilizar las categorías o clasificaciones que se tenga
asignados a los terceros.



﻿

# Dato1

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Dato2

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Valor2

Datos o valores adicionales que se desean o se requieren adicionar al momento
de realizar el registro de cada pago.

En estos datos se deben tener en cuenta unas validaciones para cada uno de los
bancos desde el cual se desea realizar el pago.

Ejemplo

**\- Banco de occidente:** Si se desea realizar el pago con este banco se debe
tener en cuenta que el dato1 y dato2 son obligatorios, dato 1 con la etiqueta
“comprobante” y dato2 con la etiqueta “concepto”.

**\- Bancomer:** Si se desea realizar el pago con este banco se debe tener en
cuenta que el valor1 es obligatorio, y se le debe asignar la etiqueta “IVA”.
Nota: SOLO en caso de que la transferencia sea interbancaria.

**\- Banco BBVA:** Si se desea realizar el pago con este banco se debe tener
en cuenta que el dato1 es obligatorio, configurándolo como un campo de tabla
de usuario de forma de pago y se le debe asignar la etiqueta “Forma de pago”.

Observaciones

Para configurar la visibilidad y la lista de selecciona de estos campos
adicionales, ver: **\[Pestaña: Cartera > Programación de pagos > Configuración
> Opciones generales > Datos adicionales\].**



﻿

# Generar Archivo

Esta acción nos muestra el formulario para generar el archivo de pago que
contiene las cuentas por pagar agregadas a la lista.

Ejemplo

De forma automática se carga la información de la cuenta bancaria y tipo de
movimiento que se realizaron previamente en la configuración de dicho
catálogo, por último se cuenta con la opción de poder seleccionar el driver
que se va a utilizar para generar el archivo.

![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/50.png)

Una vez se genere el archivo de pago se muestra un log donde se indica los
errores o advertencias que surgieron a la hora de generar el archivo.

![50A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/50A.png)


Observaciones

Al momento de cerrar el log el sistema pide que el archivo sea guardado en el
disco duro del computador, una vez guardado el archivo de pago, a cada
registro se le agrega una descripción la cual indica la fecha en que fue
generado el archivo de pago y que driver fue utilizado para generar dicho
archivo.



﻿

# Copiar

Permite copiar los registros de la grid en el clipboard para luego pegarlos
por ejemplo en un archivo XLS.



﻿

# Generar movimiento contable

Una vez generado el archivo de pago y que cada uno de los registros tenga la
descripción de la generación del archivo, se puede generar el movimiento
contable, este se genera con base a los datos que se realizaron en las
configuraciones espeaciales del catálogo y en la creación de la cuenta
empresarial.

Ejemplo

Se requiere generar el archivo de pago de las cuentas por pagar que se tiene
pendiente a los proveedores del mes de enero.

Se activa el botón **"Generar movimiento contable"** para que \[Contapyme\]
automáticamente genere el movimiento contable sobre el pago de las cuentas por
pagar.

una vez se genere el movimiento contable a cada registro se le agrega la
descripción con información de la operación.

![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/70.png)



Observaciones

El asiento contable queda registrado automáticamente en \[ContaPyme\] por
medio de la operación de movimientos contable, realizando un débito a la
cuenta por pagar y crédito a su contrapartida \(Cuenta de banco\).

La cuenta de banco se configura en la creación de cada cuenta empresarial.
Para crear y configurar la información de las cuentas empresariales, ver:
**\[Pestaña: Cartera > Cuentas empresariales\].**

Desde las configuraciones especiales del catálogo se pueden configurar la
cuenta empresarial por defecto, su tipo de movimiento bancario por defecto, el
tipo de documento de soporte por defecto para la generación del movimiento
contable automático.

También se puede activar unas opciones especiales para la generación del
movimiento contable automático, tales como:
\- Totalizar saldos por tercero.
\- Totalizar movimiento contable.
\- Generar el movimiento contable por cada registro.

Configuración

Para ingresar a las configuraciones especiales del catálogo, ver: **\[Pestaña:
Cartera > Prog. pagos > Cinta de opciones: Configuración > Opciones
generales"\].**





﻿

# Previsualizar archivo

Acción que permite visualizar en formato HTML el archivo de pago que se
generó.

Ejemplo

Se selecciona el archivo generado, se selecciona el driver con el cual se
generó el archivo de pago y de manera opcional la ruta donde se quiere guardar
el archivo HTML.

![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/80.png)

Una vez seleccionados los parámetros se da clic en aceptar y se abre el
navegador con el archivo en formato HTML.

![80A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Programaci%C2%BEn%20de%20pagos/%5B17670%5D%20FrmProgPago/80A.png)



---

### Tipos de credito

#### [18680] FrmTipoCredito

﻿

# Cálculo de intereses

En el ejemplo anterior al señor Juan López se le hizo el préstamo de $500.000
a una tasa efectiva mensual del 1%.
A continuación veremos como se calcula el valor del interés que debe pagar el
cliente cuando vaya a realizar el pago de una cuota:

1\) Se debe convertir la tasa del interés efectiva mensual a diaria:
Para convertir la tasa se usará la siguiente fórmula:
**TED=\(\(1+TEM\)^\(1/P\)-1\)**
TED= Tasa efectiva diaria
TEM = Tasa efectiva mensual \(1%\)
P = Número de periodos \(30 días del mes\)

**TED= \(\(1,01\)^\(1/30\)-1\)** = 0,000332%

2\) Se calcula la tasa equivalente a los días que se cobrará el interés.
Recordemos que el señor Juan pagará su primera cuota después de 15 días de
realizarle el préstamo:
Para calcular la tasa se usará la siguiente fórmula:
**Tasa =\(\(1+TED\)^\(D\)-1\)**
TED= Tasa efectiva diaria
D = Número de días \(15\)
**Tasa= \(\(1+ 0,000332% \)^\(15\)-1\)** = 0,4988%

Total interés = Saldo actual \* %tasa

## Total interés a pagar = $ 500.000 \* 0,00498% = **$ 2,488**



﻿

# Código

Código del tipo de crédito a crear.

Los tipos de crédito se identifican por medio de un código único, que debe ser
númerico entre 1 y 32.767.
Se recomienda manejar un consecutivo y un número no muy extenso, fácil de
recordar.

La finalidad de los tipos de créditos es agilizar la creación de una cuenta
por cobrar, allí se definen las tasas de interés, la periodicidad, sistema de
amortización, cuentas, entre otras, según el criterio que tenga la empresa.

Ejemplo

Se crea un tipo de crédito especial para los préstamos a los empleados,
indicando que el pago sea mensual y que se cobre el 1% de interés.

Observaciones

El tipo de crédito se podrá seleccionar en la forma de cobro de una operación
cuando se registra una cuenta por cobrar y se financiará a cuotas.

Los tipos de créditos solo se podrán seleccionar si está habilitado el manejo
de interéses en la empresa: **\[Editor de empresa > Pestaña cartera y
proveedores > Activar manejo de intereses en las cuentas por cobrar\]**



﻿

# Manejar intereses corrientes

Active esta opción si desea manejar intereses corrientes en este tipo de
crédito.
Al activarla, al momento de registrar una cuenta por cobrar con este tipo de
crédito se le aplicará la tasa de interés que se defina a las respectivas
cuotas en las que se vaya a financiar.

Ejemplo

La empresa desea que a todas las ventas realizadas a crédito se les aplique un
tasa de interés del 1%.

Observaciones

Al momento de registrar la cuenta por cobrar este interés será obligatorio y
no podrá ser condonado.



﻿

# Manejar intereses por mora

Active esta opción si desea manejar intereses por mora en este tipo de
crédito.
Al activarla, al momento de registrar el abono de una cuenta por cobrar con
este tipo de crédito, se verificará si la cuota tiene días en mora y cuál tasa
es la que se debe aplicar.

Es importante tener en cuenta que los intereses por mora deben ser facturados,
por lo tanto una vez se registre el abono, también se realizará el registro
automático del ingreso por estos intereses.

Ejemplo

La empresa desea que a todos los préstamos que se le realicen a los empleados
no se les aplique ningún interés corriente, pero en caso de que se atrasen en
sus cuotas, se les aplique una tasa del 1.5%.

Observaciones

Si se desea manejar intereses por mora se debe tener en cuenta que estos se
deben facturar, por lo tanto se **debe contar con el módulo de inventarios o
de automatización** para poder registrar el respectivo ingreso, además el
usuario encargado de realizar el registro del abono **debe contar con los
permisos necesarios para registrar dicha operación**.



﻿

# Sistema de amortización

Indica el metódo de amortización que se utilizará en este tipo de crédito para
calcular el monto de la cuotas y su interés al momento de registrar el
crédito.

## Método francés

El método francés indica que todas las cuotas serán fijas, las cuales están
compuestas de la siguiente manera:

  * Una cantidad destinada a devolver el préstamo \(Abono a capital\)
  * Y otra cantidad destinada a pagar los intereses.

Los intereses se calcularán sobre el capital pendiente e irán disminuyendo a
medida que se vayan realizando los pagos, ya que en cada uno de estos el
capital pendiente es menor. _\(Solo en caso de que tenga beneficio por pago
anticipado\)_


Ejemplo

Se le realiza el préstamo de **$20.000.000** al señor Andrés Parra para pagar
a 6 cuotas mensuales con un interés del 1% utilizando el método francés de
amortización.

Al momento de realizar el cálculo del valor de la cuota para los 6 meses, se
establece una cuota fija de **$ 3.450.967**

Saldo | Interés | Abono a capital | Cuota
---|---|---|---
$ 20.000.000 | $ 200.000 |  $ 3.250.967 |  $ 3.450.967
$ 16.749.032,67  |  $ 167.490  |  $ 3.283.477  |  $ 3.450.967
$ 13.465.555,66  |  $ 134.656  |  $ 3.316.312  |  $ 3.450.967
$ 10.149.243,88  |  $ 101.492  |  $ 3.349.475  |  $ 3.450.967
$ 6.799.768,99  |  $ 67.998  |  $ 3.382.970  |  $ 3.450.967
$ 3.416.799,34  |  $ 34.168  |  $ 3.416.799  |  $ 3.450.967
TOTAL: |  $ 705.804  |  **$ 20.000.000** |  $ 20.705.804

Observaciones

**Fórmula**
La siguiente fórmula se utiliza para calcular el valor de la cuota que se
deberá pagar con el método francés:
\( I \* \(1+I\) ^ N\)
**Valor de la cuota** = M \* \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
\( \(1+I\) ^ N - 1\)

**M** = Total del préstamo
**I** = Intereses
**N** = Número de cuotas



﻿

# Intereses

Indica el porcentaje de interés corriente que se aplicará a la cuenta por
cobrar.
**Este interés se registra como efectivo mensual**.

Ejemplo

La señora Catalina García hace un préstamo de **$200.000** para pagarlo a 2
cuotas mensuales con un interés del **2%**.

Al realizar el cálculo del valor final que debe pagar se generan las
siguientes cuotas:

Saldo | Interés \(2%\) | Abono a capital | Cuota
---|---|---|---
$ 200.000 | $ 4.000 |  $ 99.010 |  $ 103.010
$ 100.990  |  $ 2.020  |  $ 100.990  |  $ 103.010
TOTAL: | **$ 6.020** | $ 200.000 | $ 206.020



﻿

# Aplicar beneficio por pago anticipado

Active esta opción si se desea que cuando el cliente realice el pago de sus
cuotas antes de la fecha pactada se vea beneficiado en la reducción del valor
final de su crédito.
Si esta opción no esta habilitada, no importa si el cliente paga antes, el
valor de las cuotas siempre será el mismo.

Ejemplo

Se le realiza un préstamo al señor Juan López por un monto de **$500.000** el
día 1 de mayo de 2019, para pagarlo mensualmente a 3 cuotas y con una tasa de
interés de 1%.
A continuación visualizaremos la tabla de amortización original del crédito:

Fecha de pago | Saldo inicial | Interés \(1%\) | Abono a capital | Cuota | Saldo final
---|---|---|---|---|---
1 de junio 2019 |  $ 500.000 |  $ 5.000 |  $ 165.011 |  $ 170.011 |  $ 334.989
1 de julio 2019 |  $ 334.989  |  $ 3.350  |  $ 166.661  |  $ 170.011 |  $ 168.328
1 de agosto 2019 |  $ 168.328 |  $ 1.683  |  $ 168.328  |  $ 170.011 |  $ 0.00
TOTAL: | $ 10.033 | $ 500.000 | **$ 510.033** |

El señor Juan lópez desea realizar el pago de su primera cuota el día 16 de
mayo de 2019, **15 días transcurridos** desde la fecha en la que se le realizó
el préstamo.

La cuota que debe pagar el señor es por un valor de **$ 170.011** de los
cuales $ 5.000 corresponden a interés y $ 165.011 para abonar a capital.


## Pago con beneficio

A continuación veremos como se afecta su crédito si tiene beneficio:

Se calcula interés solo por 15 días que han transcurrido desde que se le
prestó el dinero:
**Intereses por 15 días** = $ 2,488
Si desea ver cómo se calculó el valor del interés haga clic
[aquí](<ExplicacionCalculoInteres.html>).

El señor Juan pagará igualmente los **$ 170.011** pero ahora se repartirán de
la siguiente manera:
**Intereses** = $ 2,488
**Abono a capital** = $ 165,011
**Ajuste\*** = $ 2.512 \(Abono a capital por pago anticipado\)

\*Los ajustes son la diferencia entre el interés pagado y el interés que
hubiera pagado en la fecha acordada.
Estos pasan directamente como abono a capital.

|
![ejemplodeuda.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/ejemplodeuda.png)
---|---
Ahora veremos como quedará su crédito despúes de realizar este pago anticipado
y suponiendo que las siguientes cuotas las pagará en la fecha pactada:

Fecha | Días | Saldo inicial | Interés \(1%\) | Abono a capital | Cuota | Saldo final
---|---|---|---|---|---|---
16/05/2019 |  15 |  $ 500.000 |  $ 2.488 |  $ 165.011 **\+ $2.512** |  $ 170.011 |  $ 332.477
01/07/2019 |  45 |  $ 332.477  |  $ 4.963  |  $ 166.661 **\- $ 1.613** |  $ 170.011 |  $ 167.429
01/08/2019 |  30 |  $ 167.429 |  $ 1.666  |  $ 167.429  |  $ 169.095 |  $ 0.00
TOTAL: | $ 9.117 | $ 500.000 | **$ 509.117** |

Como vemos el señor Juan tuvo un ahorro en el valor final de su crédito al
realizar este pago con beneficio.

Observaciones

\- Si esta opción está activa no se podrán definir periodos de gracia o
periodos muertos ya que el interés puede ser variable.
\- En caso de que el cliente haga un abono parcial no se realizarán los
respectivos ajustes hasta que termine de pagar la cuota.
\- Si el cliente realiza el pago de 2 o más cuotas simultáneas y tiene activa
esta opción, el interés solo se calcula sobre el saldo total de la deuda, no
sobre cada cuota.



﻿

# Permitir periodo de gracia

Los periodos de gracia son aquellas cuotas por las que solo se paga interés.
Active esta opción si desea que al momento de registrar un nuevo crédito o
CxC, se tenga la posibilidad de definir cuáles cuotas tendrán periodo de
gracia.

Ejemplo

La señora Catalina García hace un préstamo de **$500.000** el día 1 de enero
para pagarlo mensualmente a 5 cuotas con un interés del **1%** , pero solicita
que se le dé un plazo de 2 meses para empezar a pagar su deuda, además indica
que pagará el interés que corresponda de dichos meses.

Al realizar el registro del crédito se deberá indicar que el monto se
financiará a 7 cuotas de las cuales dos corresponden a periodo de gracia:

Saldo | Interés \(1%\) | Abono a capital | Cuota
---|---|---|---
$ 500.000 | $ 5.000 |  $ 0.00 |  $ 5.000
$ 500.000 | $ 5.000 |  $ 0.00 |  $ 5.000
$ 500.000 | $ 5.000 |  $ 98.020 |  $ 103.020
$ 401.980 | $ 4.020 |  $ 99.000 |  $ 103.020
$ 302.980 | $ 3.030 |  $ 99.990 |  $ 103.020
$ 202.990 | $ 2.030 |  $ 100.990 |  $ 103.020
$ 102.000  |  $ 1.020  |  $ 102.000  |  $ 103.020
TOTAL: | $ 25.099 | $ 500.000 | $ 525.099

## Asientos contables al crear el crédito

Los intereses del las cuotas con periodo de gracia se causarán automáticamente
al crear el crédito:

| De donde saldrá el dinero
---
Débito | Crédito
| $ 500.000
| Cuenta por cobrar
---
Débito | Crédito
$ 500.000 |
| Cuenta ingresos por intereses
Configurada en el tipo de crédito
---
Débito | Crédito
| $ 10.000
| Intereses por cobrar
Configurada en el tipo de crédito
---
Débito | Crédito
$ 10.000 |



﻿

# Permitir periodo muerto

Los periodos muertos son aquellas cuotas en las que se acumulan intereses al
capital, pero no se realiza ningún pago.
Active esta opción si desea que al momento de registrar un nuevo crédito o
CxC, se tenga la posibilidad de definir cuáles cuotas tendrán periodo muerto.

Ejemplo

La señora Catalina García hace un préstamo de **$500.000** el día 1 de enero
para pagarlo mensualmente a 5 cuotas con un interés del **1%** , pero solicita
que se le dé un plazo de 2 meses para empezar a pagar su deuda.
Se tiene en cuenta que durante esas 2 cuotas el interés se estará sumando al
capital de la deuda.

Al realizar el registro del crédito se deberá indicar que el monto se
financiará a 7 cuotas de las cuales dos corresponden a periodo muerto:

Saldo | Interés \(1%\) | Abono a capital | Cuota
---|---|---|---
$ 500.000 | $ 5.000 |  \- $ 5.000 |  $ 0.00
$ 505.000 | $ 5.050 | \- $ 5.050 |  $ 0.00
$ 510.050 | $ 5.101 |  $ 99.990 |  $ 105.091
$ 410.060 | $ 4.101 |  $ 100.990 |  $ 105.091
$ 309.070 | $ 3.091 |  $ 102.000 |  $ 105.091
$ 207.070 | $ 2.071 |  $ 103.020 |  $ 105.091
$ 104.050  |  $ 1.041  |  $ 104.050  |  $ 105.091
TOTAL: | $ 25.453 | $ 500.000 | $ 525.453

## Asientos contables al crear el crédito

Los intereses del las cuotas con periodo muerto se causarán automáticamente al
crear el crédito, llevándolos a la cuenta por cobrar de la deuda:

| De donde saldrá el dinero
---
Débito | Crédito
| $ 500.000


| Cuenta por cobrar
---
Débito | Crédito
$ 500.000
$ 10.050 |
| Cuenta ingresos por intereses
Configurada en el tipo de crédito
---
Débito | Crédito
| $ 10.050




﻿

# Cuenta de intereses

Permite identificar el código de la cuenta donde se realizará el ingreso de
los intereses del préstamo.

Observaciones

  * Esta cuenta debe tener habilitado el manejo de referencias.
  * Si esta cuenta es modificada y ya hay CxC registradas con este tipo de crédito, estas no se verán afectadas.



﻿

# Centro de costos

Permite identificar el código del centro de costos donde se imputarán los
intereses obtenidos por este crédito.

Observaciones

Si este centro de costos es modificado y ya hay CxC registradas con este tipo
de crédito, estas no se verán afectadas.



﻿

# Cuenta para causación

Permite identificar el código de la cuenta de cartera donde se realizarán los
asientos de la causación de intereses por medio de la operación de "Acciones
automáticas de fin de mes".

La causación de los intereses tiene como finalidad que los ingresos por
intereses sean registrados en la contabilidad en el periodo al que realmente
corresponden dichos ingresos.

Al momento de realizar el abono a un crédito, se cargarán las causaciones que
se le han realizado y estas deberán ser pagadas obligatoriamente.

Ejemplo

El 15 de enero se le realiza un préstamo de **$500.000** a la señora Natalia
Cortés con un interés del **1%** a 5 cuotas, y su primera cuota será el 15 de
febrero.

![causacion.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/causacion.png)
En este caso hay una parte de los intereses que corresponden al mes de enero y
no se puede esperar hasta el 15 de febrero a contabilizarlos.

Al registrar la operación de **"Acciones automáticas de fin de mes"** se
realiza la causación de los intereses que corresponden al mes de enero y el 15
de febrero cuando se pague la cuota se cancelará esta causación y se
ingresarán los intereses correspondientes al mes de febrero.

Observaciones

Esta causación se realiza con la finalidad de que en los informes financieros
quede correctamente registrado el ingreso por intereses correspondiente a cada
mes.

Esta cuenta tambien es utilizada al momento de registrar los ingresos por
intereses de mora, cuando se crea la operación de ingresos se crea una cuenta
por cobrar a esta cuenta.
Para más información ver [Manejo de intereses por mora](<?id=18680116>).

Configuración

En la operación de **"Acciones automáticas de fin de mes"** estará disponible
esta opción solo si está habilitado el manejo de intereses: **\[Editor de
empresa > Pestaña cartera y proveedores > Habilitar manejo de intereses\]**



﻿

# Interés por mora

Indica el porcentaje de interés por mora que se aplicará a las cuotas vencidas
del crédito.
**Este interés es efectivo mensual**.

Ejemplo

El día 1 de mayo de 2018 la señora Catalina García hace un préstamo de
**$200.000** para pagarlo a 2 cuotas mensuales con un interés corriente del
**1.5%** y un interés por mora del **2%** , en este caso mensual.

Al realizar el cálculo del préstamo se generan las siguientes cuotas:

\# | Fecha | Saldo | Interés \(1.5%\) | Abono a capital | Cuota
---|---|---|---|---|---
1 | 01/06/2018 | $ 200.000 | $ 3.000 |  $ 99.256 |  $ 102.256
2 | 01/07/2018 |  $ 100.744  |  $ 1.511  |  $ 100.744  |  $ 102.256
TOTAL: | $ 4.511  | **$ 200.000** | $ 204.511
La señora Catalina pagó su primera cuota cumplidamente pero en la segunda se
retrasa 5 días.
Para calcular el valor de la mora se debe realizar el siguiente proceso:

1\) Se debe convertir la tasa del interés efectiva mensual a diaria:
Para convertir la tasa se usará la siguiente fórmula:
**TED=\(\(1+TEM\)^\(1/P\)-1\)**
TED= Tasa efectiva diaria
TEM = Tasa efectiva mensual \(2%\)
P = Número de periodos \(30 días del mes\)

**TED= \(\(1 + 2%\)^\(1/30\)-1\)** = 0,0660%

2\) Se calcula la tasa equivalente a los días que se cobrará el interés por
mora.
Para calcular la tasa se usará la siguiente fórmula:
**Tasa =\(\(1+TED\)^\(D\)-1\)**
TED= Tasa efectiva diaria
D = Número de días \(5\)
**Tasa= \(\(1+ 0,0660%\)^\(5\)-1\)** = 0,3306%

**Valor de la mora** = \($ 102.256 \* 0,3306%\) = **$338**
**Valor total a pagar** = $ 102.594  Observaciones

## IMPORTANTE

El porcentaje de interés por mora no puede superar en 1.5 veces el interés
corriente establecido por la Superintendencia Financiera de Colombia.
**Exceder la tasa de usura es un delito cuya pena puede estar entre dos \(2\)
a cinco \(5\) años de cárcel** y multas desde cincuenta \(50\) hasta
doscientos \(200\) salarios mínimos legales mensuales vigentes.
Para más información consulte el **artículo 305** de la [ley 599 de
2000](<http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=6388>).

**Nota:** Si este valor se define como **0** , se entenderá que no se
realizará cobro de interés por mora.



﻿

# Nombre

Nombre con el que se identificará el tipo de crédito.

Ejemplo

Crédito para empleados

Observaciones

Este nombre será visible en el seleccionador de tipos de créditos cuando se
vaya a crear una cuenta por cobrar a cuotas.



﻿

# Calcular con la tasa máxima de interés

Esta opción indica que el porcentaje de interés por mora se calculará con base
al que se haya registrado en la operación **"Registro de tasa máxima de
interés por mora".**

En esta operación se registra la tasa de interés por mora que estará vigente
en un rango de fechas.


Ejemplo

El día 1 de mayo de 2018 la señora Catalina García hace un préstamo de
**$200.000** para pagarlo a 2 cuotas mensuales con un interés corriente del
**1.5%** y el interés por mora será el máximo establecido.

Al realizar el cálculo del préstamo se generan las siguientes cuotas:

\# | Fecha | Saldo | Interés \(1.5%\) | Abono a capital | Cuota
---|---|---|---|---|---
1 | 01/07/2018 | $ 200.000 | $ 3.000 |  $ 99.256 |  $ 102.256
2 | 01/08/2018 |  $ 100.744  |  $ 1.511  |  $ 100.744  |  $ 102.256
TOTAL: | $ 4.511  | **$ 200.000** | $ 204.511
La señora Catalina pagó su primera cuota cumplidamente pero en la segunda se
retrasa 5 días.
Para calcular el valor de la mora se consulta si hay una tasa de mora vigente
para esta fecha y se aplica dicho interés.

Supongamos que entre el 1 de junio de 2018 y el 1 de noviembre la tasa de mora
vigente es de **25% efectivo anual** , en este caso el valor de cuota será la
siguiente:

**1.** Primero se debe convertir la tasa efectiva anual a diaria:
**TED** = \(\(1+ TEA\)^ \(1/360\)\)-1 **=** \(\(1+ 25%\)^ \(1/360\)\)-1
**TED** = 0,0620%

**2.** Se debe obtener la tasa equivalente a los días de mora:
**Tasa mora** = \(\(1+ TED\)^ \(Días mora\)\)-1 **=** \(\(1+ 0,0620%\)^
\(5\)\)-1
**Tasa mora** = 0,3104%

**Valor de la mora** = \($ 102.256 \* 0,3104%\) = **$317**
**Valor total a pagar** = $ 102.573  Para más información sobre el cálculo de
la tasa máxima de interés por mora haga clic [aquí](<?id=1873010>)



﻿

# Días de mora

Indica después de cuántos días **hábiles** se cobrará un interés por mora
sobre las cuotas vencidas.

Ejemplo

Se configura que se cobrará mora a partir de **10 días hábiles**.

El señor David Castro debía pagar el día 5 de febrero la segunda cuota de su
préstamo por un valor de $150.000, pero **se retrasa 5 días**.
En este caso aún no se cobrará mora ya que tiene plazo de 10 días para poder
pagar su cuota.

Observaciones

Si se asigna **0** la mora se cobrará al día siguiente de vencida.

Configuración

Para modificar la configuración de días hábiles de trabajo vaya a:
**\[\[CONTAPYME\] > Botón redondo > Configuración > Configuración general del
sistema > Días hábiles de trabajo\]**



﻿

# Permite condonar el cobro de interés por mora

Indica si al momento de realizar el pago de una cuota que tiene mora, el
interés por mora puede ser condonado o no.

Al momento de realizar el abono, cuando se finalice esta operación, el sistema
mostrará la siguiente ventana indicando si desea condonar o no los intereses:

![condonarint.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/condonarint.png)

Observaciones

Si no se activa esta opción el pago por mora será obligatorio y se facturará
automáticamente.



﻿

# Cuenta de intereses

Indique las cuentas donde se contabilizará el ingreso de los intereses por
mora del crédito.
Debe tener en cuenta que este interés en algunos casos debe estar gravado con
IVA.
Para más claridad vea el siguiente ejemplo:

Ejemplo

El siguiente ejemplo explica el cálculo que se realiza al momento de cobrar la
mora de una venta a crédito gravada con IVA:

![moraIVA.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/moraIVA.png)

Cuentas que se afectarían:
![moraIVA_movun.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/moraIVA_movun.png)

**NOTA:** Si Helena vuelve a atrasarse en otra cuota los intereses se
imputarán solamente en la cuenta de intereses por mora gravados ya que ya se
pagó todo el IVA.

Observaciones

**La cuenta de intereses por mora gravados** debe tener configurado el
impuesto de IVA para que este pueda ser calculado.



﻿

# Operación para facturación de intereses por mora

Indique la operación con la que se facturarán los intereses por mora de las
cuentas por cobrar asociadas a este tipo de crédito.
Al momento de registrar el abono el sistema mostrará una ventana como la
siguiente, indicando los intereses que se facturarán al momento de procesar el
abono:

![facturacionintmora.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/facturacionintmora.png)

Observaciones

\- Tenga en cuenta que el usuario encargado de registrar el abono debe tener
permisos para registrar la operación que seleccione.
\- Se generará una operación por cada tercero y por cada diferente tipo de
crédito que tengan las cuentas por cobrar.



﻿

# Doc. soporte

Indique el documento de soporte con el que se generará la operación de ingreso
al momento de facturar los intereses por mora.



﻿

# Periodicidad

Indica la periodicidad en la que se va a realizar el pago de las cuotas de la
cuenta por cobrar que tenga este tipo de crédito.

Observaciones

Dependiendo de esta periodicidad al momento de crear la cuenta por cobrar se
solicitarán los siguientes datos:

**Mensual :** Al seleccionar periodicidad mensual, se deberá indicar el día
del mes en el que se va a realizar el pago.

**Quincenal :** Al seleccionar periodicidad quincenal, se deberá indicar la
quincena en la que se va a realizar el pago.

**Semanal :** Al seleccionar periodicidad semanal, se deberá indicar el día de
la semana en la que se va a realizar el pago



﻿

# Plazo mínimo

Indica el plazo o número de cuotas mínimas que debe tener el préstamo.

Observaciones

Si se define este dato como **0** , el sistema omitirá este valor y se
entenderá que no hay un plazo mínimo.



﻿

# Plazo máximo

Indica el plazo o número de cuotas máximas que debe tener el préstamo según la
periodicidad definida.

Ejemplo

La empresa desea que los préstamos a sus empleados sean pagaderos cada mes y
que los créditos se difieran máximo a 12 meses.

Observaciones

Si se define este dato como **0** , el sistema omitirá este valor y se
entenderá que no hay un plazo máximo.



# Acerca de la ventana

## TIPOS DE CRÉDITO

Este catálogo permite realizar la configuración de los diferentes tipos de
créditos que deseamos manejar en nuestra empresa.

En este asistente usted podrá definir datos cómo:

  * Tasas de interés.
  * Periodicidad de pago.
  * Cuentas que se afectarán.
  * Método con el cuál se realizará el cálculo del monto de las cuotas.
  * Entre otros.

Estos tipos de créditos son utilizados para agilizar la creación de una cuenta
por cobrar y le permite definir un comportamiento diferente según el tercero u
otro factor que indique que los créditos serán diferentes.


Ejemplo:

Sus empleados se les cobrará un interés del 0,5 % en sus préstamos, pero desea
que a sus clientes se les cobre un 1% en las ventas realizadas a crédito, de
esta manera no tendrá que definirlo cada vez que esté creando la cuenta por
cobrar, sino que únicamente debe seleccionar el tipo de crédito que se ajuste
a sus necesidades.

**Nota** : Los tipos de créditos sólo se podrán asignar a una cuenta por
cobrar si está habilitado el manejo de intereses en la empresa. Para realizar
esta configuración diríjase a: **\[Editor de empresa > Pestaña cartera y
proveedores > Activar manejo de intereses a cuentas por cobrar\]**



## Explicación conceptual

El siguiente diagrama explica conceptualmente cuál es la finalidad de los
tipos de créditos, y cómo afecta las diferentes cuentas por cobrar que se
creen asociadas a estos:

![concepto.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20credito/%5B18680%5D%20FrmTipoCredito/concepto.png)

Una empresa puede clasificar sus diferentes tipos de créditos según las
necesidades que esta tenga, por ejemplo créditos para sus empleados, clientes
mayoristas, o créditos mayores a determinado monto, entre otros, cada uno con
la definición de las tasas de interés que se cobrarán, la periodicidad de
pago, plazos máximos, y más.

Todos estos créditos son generados por ventas, préstamos, anticipos entre
otros, los cuales debe haber sido financiados en cuotas para poder asociarles
un tipo de crédito.

Al momento de realizar un abono a cada una de estas cuentas por cobrar se
realizará el cálculo de intereses con la definición del tipo de crédito que
esta tenga asociado.

## Ejemplo de información a registrar

Los datos más importantes a registrar para un tipo de crédito serían, entre
otros:

**Código del tipo de crédito** | 0001
---|---
**Nombre** | Crédito para empleados
**Periodicidad de pago** | Mensual
**Sistema de amortización** | Método francés
**Tasa de interés** | 1%
**Tasa de interés por mora** | 1.5%
**Plazo máximo** | 12 meses

## Definición conceptos

  * **Amortizar** : Pagar el total o parte de una deuda.
  * **Sistema de amortización** : Un sistema de amortización es la forma cómo se espera realizar el pago del crédito, este define por ejemplo si las cuotas serán fijas, si el interés será simple o compuesto, entre otros.
Existen diferentes tipos de amortización, ContaPyme hasta el momento tiene
implementado el **método francés** el cual indica que se cobrará una cuota
fija durante todo el plazo del préstamo, que el interés irá disminuyendo y que
la amortización aumentando.

## Secciones

## Sección intereses corrientes

En esta sección se define la tasa de interés corriente que se le aplicará al
crédito, el sistema de amortización que se utilizará para calcular las cuotas
y las cuentas que se afectarán al recibir estos ingresos.

## Sección intereses por mora

En esta sección se define la tasa de interés por mora que se aplicará en caso
de que en algún momento el tercero se atrase con una cuota del crédito, además
podrá indicarse después de cuantos días se cobrará este interés y si es
posible perdonarlo o no al momento de realizar el pago de la deuda.





---

#### [18690] FrmInputNewITDCredito

﻿

# Empresa a la que pertenece el tipo de crédito

Código de la empresa a la cual pertenece el tipo de crédito.

Los tipos de crédito son propios de cada empresa y al momento de crear el tipo
de crédito, el sistema tomará la empresa de trabajo que se encuentre
seleccionada.

Si requiere que el tipo de crédito pertenezca a otra empresa diferente a la
aquí indicada, debe modificar la empresa de trabajo seleccionada en
\[ContaPyme\].

Configuración



Para modificar la empresa de trabajo seleccionada en \[ContaPyme\] ver:
**\[Barra de estado: Empresa de trabajo\]**.



---

### Tipos de crÚdito

#### [18680] FrmTipoCredito

﻿

# Cálculo de intereses

En el ejemplo anterior al señor Juan López se le hizo el préstamo de $500.000
a una tasa efectiva mensual del 1%.
A continuación veremos como se calcula el valor del interés que debe pagar el
cliente cuando vaya a realizar el pago de una cuota:

1\) Se debe convertir la tasa del interés efectiva mensual a diaria:
Para convertir la tasa se usará la siguiente fórmula:
**TED=\(\(1+TEM\)^\(1/P\)-1\)**
TED= Tasa efectiva diaria
TEM = Tasa efectiva mensual \(1%\)
P = Número de periodos \(30 días del mes\)

**TED= \(\(1,01\)^\(1/30\)-1\)** = 0,000332%

2\) Se calcula la tasa equivalente a los días que se cobrará el interés.
Recordemos que el señor Juan pagará su primera cuota después de 15 días de
realizarle el préstamo:
Para calcular la tasa se usará la siguiente fórmula:
**Tasa =\(\(1+TED\)^\(D\)-1\)**
TED= Tasa efectiva diaria
D = Número de días \(15\)
**Tasa= \(\(1+ 0,000332% \)^\(15\)-1\)** = 0,4988%

Total interés = Saldo actual \* %tasa

## Total interés a pagar = $ 500.000 \* 0,00498% = **$ 2,488**



﻿

# Código

Código del tipo de crédito a crear.

Los tipos de crédito se identifican por medio de un código único, que debe ser
númerico entre 1 y 32.767.
Se recomienda manejar un consecutivo y un número no muy extenso, fácil de
recordar.

La finalidad de los tipos de créditos es agilizar la creación de una cuenta
por cobrar, allí se definen las tasas de interés, la periodicidad, sistema de
amortización, cuentas, entre otras, según el criterio que tenga la empresa.

Ejemplo

Se crea un tipo de crédito especial para los préstamos a los empleados,
indicando que el pago sea mensual y que se cobre el 1% de interés.

Observaciones

El tipo de crédito se podrá seleccionar en la forma de cobro de una operación
cuando se registra una cuenta por cobrar y se financiará a cuotas.

Los tipos de créditos solo se podrán seleccionar si está habilitado el manejo
de interéses en la empresa: **\[Editor de empresa > Pestaña cartera y
proveedores > Activar manejo de intereses en las cuentas por cobrar\]**



﻿

# Manejar intereses corrientes

Active esta opción si desea manejar intereses corrientes en este tipo de
crédito.
Al activarla, al momento de registrar una cuenta por cobrar con este tipo de
crédito se le aplicará la tasa de interés que se defina a las respectivas
cuotas en las que se vaya a financiar.

Ejemplo

La empresa desea que a todas las ventas realizadas a crédito se les aplique un
tasa de interés del 1%.

Observaciones

Al momento de registrar la cuenta por cobrar este interés será obligatorio y
no podrá ser condonado.



﻿

# Manejar intereses por mora

Active esta opción si desea manejar intereses por mora en este tipo de
crédito.
Al activarla, al momento de registrar el abono de una cuenta por cobrar con
este tipo de crédito, se verificará si la cuota tiene días en mora y cuál tasa
es la que se debe aplicar.

Es importante tener en cuenta que los intereses por mora deben ser facturados,
por lo tanto una vez se registre el abono, también se realizará el registro
automático del ingreso por estos intereses.

Ejemplo

La empresa desea que a todos los préstamos que se le realicen a los empleados
no se les aplique ningún interés corriente, pero en caso de que se atrasen en
sus cuotas, se les aplique una tasa del 1.5%.

Observaciones

Si se desea manejar intereses por mora se debe tener en cuenta que estos se
deben facturar, por lo tanto se **debe contar con el módulo de inventarios o
de automatización** para poder registrar el respectivo ingreso, además el
usuario encargado de realizar el registro del abono **debe contar con los
permisos necesarios para registrar dicha operación**.



﻿

# Sistema de amortización

Indica el metódo de amortización que se utilizará en este tipo de crédito para
calcular el monto de la cuotas y su interés al momento de registrar el
crédito.

## Método francés

El método francés indica que todas las cuotas serán fijas, las cuales están
compuestas de la siguiente manera:

  * Una cantidad destinada a devolver el préstamo \(Abono a capital\)
  * Y otra cantidad destinada a pagar los intereses.

Los intereses se calcularán sobre el capital pendiente e irán disminuyendo a
medida que se vayan realizando los pagos, ya que en cada uno de estos el
capital pendiente es menor. _\(Solo en caso de que tenga beneficio por pago
anticipado\)_


Ejemplo

Se le realiza el préstamo de **$20.000.000** al señor Andrés Parra para pagar
a 6 cuotas mensuales con un interés del 1% utilizando el método francés de
amortización.

Al momento de realizar el cálculo del valor de la cuota para los 6 meses, se
establece una cuota fija de **$ 3.450.967**

Saldo | Interés | Abono a capital | Cuota
---|---|---|---
$ 20.000.000 | $ 200.000 |  $ 3.250.967 |  $ 3.450.967
$ 16.749.032,67  |  $ 167.490  |  $ 3.283.477  |  $ 3.450.967
$ 13.465.555,66  |  $ 134.656  |  $ 3.316.312  |  $ 3.450.967
$ 10.149.243,88  |  $ 101.492  |  $ 3.349.475  |  $ 3.450.967
$ 6.799.768,99  |  $ 67.998  |  $ 3.382.970  |  $ 3.450.967
$ 3.416.799,34  |  $ 34.168  |  $ 3.416.799  |  $ 3.450.967
TOTAL: |  $ 705.804  |  **$ 20.000.000** |  $ 20.705.804

Observaciones

**Fórmula**
La siguiente fórmula se utiliza para calcular el valor de la cuota que se
deberá pagar con el método francés:
\( I \* \(1+I\) ^ N\)
**Valor de la cuota** = M \* \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
\( \(1+I\) ^ N - 1\)

**M** = Total del préstamo
**I** = Intereses
**N** = Número de cuotas



﻿

# Intereses

Indica el porcentaje de interés corriente que se aplicará a la cuenta por
cobrar.
**Este interés se registra como efectivo mensual**.

Ejemplo

La señora Catalina García hace un préstamo de **$200.000** para pagarlo a 2
cuotas mensuales con un interés del **2%**.

Al realizar el cálculo del valor final que debe pagar se generan las
siguientes cuotas:

Saldo | Interés \(2%\) | Abono a capital | Cuota
---|---|---|---
$ 200.000 | $ 4.000 |  $ 99.010 |  $ 103.010
$ 100.990  |  $ 2.020  |  $ 100.990  |  $ 103.010
TOTAL: | **$ 6.020** | $ 200.000 | $ 206.020



﻿

# Aplicar beneficio por pago anticipado

Active esta opción si se desea que cuando el cliente realice el pago de sus
cuotas antes de la fecha pactada se vea beneficiado en la reducción del valor
final de su crédito.
Si esta opción no esta habilitada, no importa si el cliente paga antes, el
valor de las cuotas siempre será el mismo.

Ejemplo

Se le realiza un préstamo al señor Juan López por un monto de **$500.000** el
día 1 de mayo de 2019, para pagarlo mensualmente a 3 cuotas y con una tasa de
interés de 1%.
A continuación visualizaremos la tabla de amortización original del crédito:

Fecha de pago | Saldo inicial | Interés \(1%\) | Abono a capital | Cuota | Saldo final
---|---|---|---|---|---
1 de junio 2019 |  $ 500.000 |  $ 5.000 |  $ 165.011 |  $ 170.011 |  $ 334.989
1 de julio 2019 |  $ 334.989  |  $ 3.350  |  $ 166.661  |  $ 170.011 |  $ 168.328
1 de agosto 2019 |  $ 168.328 |  $ 1.683  |  $ 168.328  |  $ 170.011 |  $ 0.00
TOTAL: | $ 10.033 | $ 500.000 | **$ 510.033** |

El señor Juan lópez desea realizar el pago de su primera cuota el día 16 de
mayo de 2019, **15 días transcurridos** desde la fecha en la que se le realizó
el préstamo.

La cuota que debe pagar el señor es por un valor de **$ 170.011** de los
cuales $ 5.000 corresponden a interés y $ 165.011 para abonar a capital.


## Pago con beneficio

A continuación veremos como se afecta su crédito si tiene beneficio:

Se calcula interés solo por 15 días que han transcurrido desde que se le
prestó el dinero:
**Intereses por 15 días** = $ 2,488
Si desea ver cómo se calculó el valor del interés haga clic
[aquí](<ExplicacionCalculoInteres.html>).

El señor Juan pagará igualmente los **$ 170.011** pero ahora se repartirán de
la siguiente manera:
**Intereses** = $ 2,488
**Abono a capital** = $ 165,011
**Ajuste\*** = $ 2.512 \(Abono a capital por pago anticipado\)

\*Los ajustes son la diferencia entre el interés pagado y el interés que
hubiera pagado en la fecha acordada.
Estos pasan directamente como abono a capital.

|
![ejemplodeuda.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20cr%C3%9Adito/%5B18680%5D%20FrmTipoCredito/ejemplodeuda.png)
---|---
Ahora veremos como quedará su crédito despúes de realizar este pago anticipado
y suponiendo que las siguientes cuotas las pagará en la fecha pactada:

Fecha | Días | Saldo inicial | Interés \(1%\) | Abono a capital | Cuota | Saldo final
---|---|---|---|---|---|---
16/05/2019 |  15 |  $ 500.000 |  $ 2.488 |  $ 165.011 **\+ $2.512** |  $ 170.011 |  $ 332.477
01/07/2019 |  45 |  $ 332.477  |  $ 4.963  |  $ 166.661 **\- $ 1.613** |  $ 170.011 |  $ 167.429
01/08/2019 |  30 |  $ 167.429 |  $ 1.666  |  $ 167.429  |  $ 169.095 |  $ 0.00
TOTAL: | $ 9.117 | $ 500.000 | **$ 509.117** |

Como vemos el señor Juan tuvo un ahorro en el valor final de su crédito al
realizar este pago con beneficio.

Observaciones

\- Si esta opción está activa no se podrán definir periodos de gracia o
periodos muertos ya que el interés puede ser variable.
\- En caso de que el cliente haga un abono parcial no se realizarán los
respectivos ajustes hasta que termine de pagar la cuota.
\- Si el cliente realiza el pago de 2 o más cuotas simultáneas y tiene activa
esta opción, el interés solo se calcula sobre el saldo total de la deuda, no
sobre cada cuota.



﻿

# Permitir periodo de gracia

Los periodos de gracia son aquellas cuotas por las que solo se paga interés.
Active esta opción si desea que al momento de registrar un nuevo crédito o
CxC, se tenga la posibilidad de definir cuáles cuotas tendrán periodo de
gracia.

Ejemplo

La señora Catalina García hace un préstamo de **$500.000** el día 1 de enero
para pagarlo mensualmente a 5 cuotas con un interés del **1%** , pero solicita
que se le dé un plazo de 2 meses para empezar a pagar su deuda, además indica
que pagará el interés que corresponda de dichos meses.

Al realizar el registro del crédito se deberá indicar que el monto se
financiará a 7 cuotas de las cuales dos corresponden a periodo de gracia:

Saldo | Interés \(1%\) | Abono a capital | Cuota
---|---|---|---
$ 500.000 | $ 5.000 |  $ 0.00 |  $ 5.000
$ 500.000 | $ 5.000 |  $ 0.00 |  $ 5.000
$ 500.000 | $ 5.000 |  $ 98.020 |  $ 103.020
$ 401.980 | $ 4.020 |  $ 99.000 |  $ 103.020
$ 302.980 | $ 3.030 |  $ 99.990 |  $ 103.020
$ 202.990 | $ 2.030 |  $ 100.990 |  $ 103.020
$ 102.000  |  $ 1.020  |  $ 102.000  |  $ 103.020
TOTAL: | $ 25.099 | $ 500.000 | $ 525.099

## Asientos contables al crear el crédito

Los intereses del las cuotas con periodo de gracia se causarán automáticamente
al crear el crédito:

| De donde saldrá el dinero
---
Débito | Crédito
| $ 500.000
| Cuenta por cobrar
---
Débito | Crédito
$ 500.000 |
| Cuenta ingresos por intereses
Configurada en el tipo de crédito
---
Débito | Crédito
| $ 10.000
| Intereses por cobrar
Configurada en el tipo de crédito
---
Débito | Crédito
$ 10.000 |



﻿

# Permitir periodo muerto

Los periodos muertos son aquellas cuotas en las que se acumulan intereses al
capital, pero no se realiza ningún pago.
Active esta opción si desea que al momento de registrar un nuevo crédito o
CxC, se tenga la posibilidad de definir cuáles cuotas tendrán periodo muerto.

Ejemplo

La señora Catalina García hace un préstamo de **$500.000** el día 1 de enero
para pagarlo mensualmente a 5 cuotas con un interés del **1%** , pero solicita
que se le dé un plazo de 2 meses para empezar a pagar su deuda.
Se tiene en cuenta que durante esas 2 cuotas el interés se estará sumando al
capital de la deuda.

Al realizar el registro del crédito se deberá indicar que el monto se
financiará a 7 cuotas de las cuales dos corresponden a periodo muerto:

Saldo | Interés \(1%\) | Abono a capital | Cuota
---|---|---|---
$ 500.000 | $ 5.000 |  \- $ 5.000 |  $ 0.00
$ 505.000 | $ 5.050 | \- $ 5.050 |  $ 0.00
$ 510.050 | $ 5.101 |  $ 99.990 |  $ 105.091
$ 410.060 | $ 4.101 |  $ 100.990 |  $ 105.091
$ 309.070 | $ 3.091 |  $ 102.000 |  $ 105.091
$ 207.070 | $ 2.071 |  $ 103.020 |  $ 105.091
$ 104.050  |  $ 1.041  |  $ 104.050  |  $ 105.091
TOTAL: | $ 25.453 | $ 500.000 | $ 525.453

## Asientos contables al crear el crédito

Los intereses del las cuotas con periodo muerto se causarán automáticamente al
crear el crédito, llevándolos a la cuenta por cobrar de la deuda:

| De donde saldrá el dinero
---
Débito | Crédito
| $ 500.000


| Cuenta por cobrar
---
Débito | Crédito
$ 500.000
$ 10.050 |
| Cuenta ingresos por intereses
Configurada en el tipo de crédito
---
Débito | Crédito
| $ 10.050




﻿

# Cuenta de intereses

Permite identificar el código de la cuenta donde se realizará el ingreso de
los intereses del préstamo.

Observaciones

  * Esta cuenta debe tener habilitado el manejo de referencias.
  * Si esta cuenta es modificada y ya hay CxC registradas con este tipo de crédito, estas no se verán afectadas.



﻿

# Centro de costos

Permite identificar el código del centro de costos donde se imputarán los
intereses obtenidos por este crédito.

Observaciones

Si este centro de costos es modificado y ya hay CxC registradas con este tipo
de crédito, estas no se verán afectadas.



﻿

# Cuenta para causación

Permite identificar el código de la cuenta de cartera donde se realizarán los
asientos de la causación de intereses por medio de la operación de "Acciones
automáticas de fin de mes".

La causación de los intereses tiene como finalidad que los ingresos por
intereses sean registrados en la contabilidad en el periodo al que realmente
corresponden dichos ingresos.

Al momento de realizar el abono a un crédito, se cargarán las causaciones que
se le han realizado y estas deberán ser pagadas obligatoriamente.

Ejemplo

El 15 de enero se le realiza un préstamo de **$500.000** a la señora Natalia
Cortés con un interés del **1%** a 5 cuotas, y su primera cuota será el 15 de
febrero.

![causacion.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20cr%C3%9Adito/%5B18680%5D%20FrmTipoCredito/causacion.png)
En este caso hay una parte de los intereses que corresponden al mes de enero y
no se puede esperar hasta el 15 de febrero a contabilizarlos.

Al registrar la operación de **"Acciones automáticas de fin de mes"** se
realiza la causación de los intereses que corresponden al mes de enero y el 15
de febrero cuando se pague la cuota se cancelará esta causación y se
ingresarán los intereses correspondientes al mes de febrero.

Observaciones

Esta causación se realiza con la finalidad de que en los informes financieros
quede correctamente registrado el ingreso por intereses correspondiente a cada
mes.

Esta cuenta tambien es utilizada al momento de registrar los ingresos por
intereses de mora, cuando se crea la operación de ingresos se crea una cuenta
por cobrar a esta cuenta.
Para más información ver [Manejo de intereses por mora](<?id=18680116>).

Configuración

En la operación de **"Acciones automáticas de fin de mes"** estará disponible
esta opción solo si está habilitado el manejo de intereses: **\[Editor de
empresa > Pestaña cartera y proveedores > Habilitar manejo de intereses\]**



﻿

# Interés por mora

Indica el porcentaje de interés por mora que se aplicará a las cuotas vencidas
del crédito.
**Este interés es efectivo mensual**.

Ejemplo

El día 1 de mayo de 2018 la señora Catalina García hace un préstamo de
**$200.000** para pagarlo a 2 cuotas mensuales con un interés corriente del
**1.5%** y un interés por mora del **2%** , en este caso mensual.

Al realizar el cálculo del préstamo se generan las siguientes cuotas:

\# | Fecha | Saldo | Interés \(1.5%\) | Abono a capital | Cuota
---|---|---|---|---|---
1 | 01/06/2018 | $ 200.000 | $ 3.000 |  $ 99.256 |  $ 102.256
2 | 01/07/2018 |  $ 100.744  |  $ 1.511  |  $ 100.744  |  $ 102.256
TOTAL: | $ 4.511  | **$ 200.000** | $ 204.511
La señora Catalina pagó su primera cuota cumplidamente pero en la segunda se
retrasa 5 días.
Para calcular el valor de la mora se debe realizar el siguiente proceso:

1\) Se debe convertir la tasa del interés efectiva mensual a diaria:
Para convertir la tasa se usará la siguiente fórmula:
**TED=\(\(1+TEM\)^\(1/P\)-1\)**
TED= Tasa efectiva diaria
TEM = Tasa efectiva mensual \(2%\)
P = Número de periodos \(30 días del mes\)

**TED= \(\(1 + 2%\)^\(1/30\)-1\)** = 0,0660%

2\) Se calcula la tasa equivalente a los días que se cobrará el interés por
mora.
Para calcular la tasa se usará la siguiente fórmula:
**Tasa =\(\(1+TED\)^\(D\)-1\)**
TED= Tasa efectiva diaria
D = Número de días \(5\)
**Tasa= \(\(1+ 0,0660%\)^\(5\)-1\)** = 0,3306%

**Valor de la mora** = \($ 102.256 \* 0,3306%\) = **$338**
**Valor total a pagar** = $ 102.594  Observaciones

## IMPORTANTE

El porcentaje de interés por mora no puede superar en 1.5 veces el interés
corriente establecido por la Superintendencia Financiera de Colombia.
**Exceder la tasa de usura es un delito cuya pena puede estar entre dos \(2\)
a cinco \(5\) años de cárcel** y multas desde cincuenta \(50\) hasta
doscientos \(200\) salarios mínimos legales mensuales vigentes.
Para más información consulte el **artículo 305** de la [ley 599 de
2000](<http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=6388>).

**Nota:** Si este valor se define como **0** , se entenderá que no se
realizará cobro de interés por mora.



﻿

# Nombre

Nombre con el que se identificará el tipo de crédito.

Ejemplo

Crédito para empleados

Observaciones

Este nombre será visible en el seleccionador de tipos de créditos cuando se
vaya a crear una cuenta por cobrar a cuotas.



﻿

# Calcular con la tasa máxima de interés

Esta opción indica que el porcentaje de interés por mora se calculará con base
al que se haya registrado en la operación **"Registro de tasa máxima de
interés por mora".**

En esta operación se registra la tasa de interés por mora que estará vigente
en un rango de fechas.


Ejemplo

El día 1 de mayo de 2018 la señora Catalina García hace un préstamo de
**$200.000** para pagarlo a 2 cuotas mensuales con un interés corriente del
**1.5%** y el interés por mora será el máximo establecido.

Al realizar el cálculo del préstamo se generan las siguientes cuotas:

\# | Fecha | Saldo | Interés \(1.5%\) | Abono a capital | Cuota
---|---|---|---|---|---
1 | 01/07/2018 | $ 200.000 | $ 3.000 |  $ 99.256 |  $ 102.256
2 | 01/08/2018 |  $ 100.744  |  $ 1.511  |  $ 100.744  |  $ 102.256
TOTAL: | $ 4.511  | **$ 200.000** | $ 204.511
La señora Catalina pagó su primera cuota cumplidamente pero en la segunda se
retrasa 5 días.
Para calcular el valor de la mora se consulta si hay una tasa de mora vigente
para esta fecha y se aplica dicho interés.

Supongamos que entre el 1 de junio de 2018 y el 1 de noviembre la tasa de mora
vigente es de **25% efectivo anual** , en este caso el valor de cuota será la
siguiente:

**1.** Primero se debe convertir la tasa efectiva anual a diaria:
**TED** = \(\(1+ TEA\)^ \(1/360\)\)-1 **=** \(\(1+ 25%\)^ \(1/360\)\)-1
**TED** = 0,0620%

**2.** Se debe obtener la tasa equivalente a los días de mora:
**Tasa mora** = \(\(1+ TED\)^ \(Días mora\)\)-1 **=** \(\(1+ 0,0620%\)^
\(5\)\)-1
**Tasa mora** = 0,3104%

**Valor de la mora** = \($ 102.256 \* 0,3104%\) = **$317**
**Valor total a pagar** = $ 102.573  Para más información sobre el cálculo de
la tasa máxima de interés por mora haga clic [aquí](<?id=1873010>)



﻿

# Días de mora

Indica después de cuántos días **hábiles** se cobrará un interés por mora
sobre las cuotas vencidas.

Ejemplo

Se configura que se cobrará mora a partir de **10 días hábiles**.

El señor David Castro debía pagar el día 5 de febrero la segunda cuota de su
préstamo por un valor de $150.000, pero **se retrasa 5 días**.
En este caso aún no se cobrará mora ya que tiene plazo de 10 días para poder
pagar su cuota.

Observaciones

Si se asigna **0** la mora se cobrará al día siguiente de vencida.

Configuración

Para modificar la configuración de días hábiles de trabajo vaya a:
**\[\[CONTAPYME\] > Botón redondo > Configuración > Configuración general del
sistema > Días hábiles de trabajo\]**



﻿

# Permite condonar el cobro de interés por mora

Indica si al momento de realizar el pago de una cuota que tiene mora, el
interés por mora puede ser condonado o no.

Al momento de realizar el abono, cuando se finalice esta operación, el sistema
mostrará la siguiente ventana indicando si desea condonar o no los intereses:

![condonarint.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20cr%C3%9Adito/%5B18680%5D%20FrmTipoCredito/condonarint.png)

Observaciones

Si no se activa esta opción el pago por mora será obligatorio y se facturará
automáticamente.



﻿

# Cuenta de intereses

Indique las cuentas donde se contabilizará el ingreso de los intereses por
mora del crédito.
Debe tener en cuenta que este interés en algunos casos debe estar gravado con
IVA.
Para más claridad vea el siguiente ejemplo:

Ejemplo

El siguiente ejemplo explica el cálculo que se realiza al momento de cobrar la
mora de una venta a crédito gravada con IVA:

![moraIVA.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20cr%C3%9Adito/%5B18680%5D%20FrmTipoCredito/moraIVA.png)

Cuentas que se afectarían:
![moraIVA_movun.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20cr%C3%9Adito/%5B18680%5D%20FrmTipoCredito/moraIVA_movun.png)

**NOTA:** Si Helena vuelve a atrasarse en otra cuota los intereses se
imputarán solamente en la cuenta de intereses por mora gravados ya que ya se
pagó todo el IVA.

Observaciones

**La cuenta de intereses por mora gravados** debe tener configurado el
impuesto de IVA para que este pueda ser calculado.



﻿

# Operación para facturación de intereses por mora

Indique la operación con la que se facturarán los intereses por mora de las
cuentas por cobrar asociadas a este tipo de crédito.
Al momento de registrar el abono el sistema mostrará una ventana como la
siguiente, indicando los intereses que se facturarán al momento de procesar el
abono:

![facturacionintmora.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Cats/Tipos%20de%20cr%C3%9Adito/%5B18680%5D%20FrmTipoCredito/facturacionintmora.png)

Observaciones

\- Tenga en cuenta que el usuario encargado de registrar el abono debe tener
permisos para registrar la operación que seleccione.
\- Se generará una operación por cada tercero y por cada diferente tipo de
crédito que tengan las cuentas por cobrar.



﻿

# Doc. soporte

Indique el documento de soporte con el que se generará la operación de ingreso
al momento de facturar los intereses por mora.



﻿

# Periodicidad

Indica la periodicidad en la que se va a realizar el pago de las cuotas de la
cuenta por cobrar que tenga este tipo de crédito.

Observaciones

Dependiendo de esta periodicidad al momento de crear la cuenta por cobrar se
solicitarán los siguientes datos:

**Mensual :** Al seleccionar periodicidad mensual, se deberá indicar el día
del mes en el que se va a realizar el pago.

**Quincenal :** Al seleccionar periodicidad quincenal, se deberá indicar la
quincena en la que se va a realizar el pago.

**Semanal :** Al seleccionar periodicidad semanal, se deberá indicar el día de
la semana en la que se va a realizar el pago



﻿

# Plazo mínimo

Indica el plazo o número de cuotas mínimas que debe tener el préstamo.

Observaciones

Si se define este dato como **0** , el sistema omitirá este valor y se
entenderá que no hay un plazo mínimo.



﻿

# Plazo máximo

Indica el plazo o número de cuotas máximas que debe tener el préstamo según la
periodicidad definida.

Ejemplo

La empresa desea que los préstamos a sus empleados sean pagaderos cada mes y
que los créditos se difieran máximo a 12 meses.

Observaciones

Si se define este dato como **0** , el sistema omitirá este valor y se
entenderá que no hay un plazo máximo.



---

#### [18690] FrmInputNewITDCredito

﻿

# Empresa a la que pertenece el tipo de crédito

Código de la empresa a la cual pertenece el tipo de crédito.

Los tipos de crédito son propios de cada empresa y al momento de crear el tipo
de crédito, el sistema tomará la empresa de trabajo que se encuentre
seleccionada.

Si requiere que el tipo de crédito pertenezca a otra empresa diferente a la
aquí indicada, debe modificar la empresa de trabajo seleccionada en
\[ContaPyme\].

Configuración



Para modificar la empresa de trabajo seleccionada en \[ContaPyme\] ver:
**\[Barra de estado: Empresa de trabajo\]**.



---

============================================================

## Tipo: Operaciones

### CAR1 - Deterioro de cartera

#### [14030] FrmDlgOprCar1

﻿

# Tasa Nominal Diaria\*

Tasa nominal diaria que se aplica para el cálculo del costo amortizado

Este método solo debe ser utilizado por aquellos usuarios que están llevando
el costo amortizado de sus activos financieros, específicamente de sus cuentas
por cobrar.
Para activar este método, debemos ir a la configuración del plan de cuentas y
allí activar el manejo de costo amortizado.
Luego en la cuenta contable de cartera a la cual vayamos a activar el método
de costo amortizado, debemos indicar la tasa efectiva anual o nominal diaria
con la cual se calculará el costo amortizado de la cuenta.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego se verifican los días en
vencimiento y la tasa de interés configurada en cada cuenta.
2\. Posteriormente el sistema actualiza el valor en libros de la deuda y resta
a este valor el saldo en libros.

De allí se calcula el deterioro.

![100.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/100.png)

Si por ejemplo, tenemos una cuenta por cobrar por valor de $800.000 y cuenta
con 75 días de vencimiento tal como lo muestra la imagen. Vamos a utilizar una
tasa efectiva anual del 10%.
Esa tasa el sistema la convertirá en nominal diaria **"0.0261157%"** y
contando la cantidad de días de vencimiento actualizará el valor de la deuda
utilizando la fórmula del valor futuro.
En este caso el valor actualizado de la deuda es de $815.821.8. Entonces a
este valor se le resta el valor contabilizado de la deuda, es decir los
$800.000 y de esta resta sale el valor del deterioro, que en este caso sería
de **$15.821,8.**

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de costo amortizado, ver: **\[Pestaña: Contabilidad >
Plan de cuentas > Configuración > Configuraciones generales > Deterioro de
cartera NIIF\].**



﻿

# Valor

Valor que se aplicará para deteriorar la deuda por el método de costo
amortizado.

Este método solo debe ser utilizado por aquellos usuarios que están llevando
el costo amortizado de sus activos financieros, específicamente de sus cuentas
por cobrar.
Para activar este método, debemos ir a la configuración del plan de cuentas y
allí activar el manejo de costo amortizado.
Luego en la cuenta contable de cartera a la cual vayamos a activar el método
de costo amortizado, debemos indicar la tasa efectiva anual o nominal diaria
con la cual se calculará el costo amortizado de la cuenta.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego se verifican los días en
vencimiento y la tasa de interés configurada en cada cuenta.
2\. Posteriormente el sistema actualiza el valor en libros de la deuda y resta
a este valor el saldo en libros.

De allí se calcula el deterioro.

![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/110.png)

Si por ejemplo, tenemos una cuenta por cobrar por valor de $800.000 y cuenta
con 75 días de vencimiento tal como lo muestra la imagen. Vamos a utilizar una
tasa efectiva anual del 10%.
Esa tasa el sistema la convertirá en nominal diaria y contando la cantidad de
días de vencimiento actualizará el valor de la deuda utilizando la fórmula del
valor futuro.
En este caso el valor actualizado de la deuda es de $815.821.8. Entonces a
este valor se le resta el valor contabilizado de la deuda, es decir los
$800.000 y de esta resta sale el valor del deterioro, que en este caso sería
de **$15.821,8.**

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de costo amortizado, ver:**\[Pestaña: Contabilidad >
Plan de cuentas > Configuración > Configuraciones generales > Deterioro de
cartera NIIF\].**



﻿

# Deterioro flujos futuros Valor

Valor que se aplicará para deteriorar la deuda por valor en libros - valor
presente de los flujos futuros.

Para activar este método, basta con ir a la configuración de la cuenta de
cartera sobre la cual se aplicará el deterioro y allí activar la opción.
Luego en la operación de deterioro se activará un botón a través del cual
deberemos indicar los datos de los flujos futuros.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego de indicar el valor de los
flujos futuros y de la fecha estimada en la que se recibirán dichos flujos, se
debe indicar la tasa de interés con la cual se calculará el valor presente de
dichos flujos futuros.
2\. Luego de que el sistema calcula el valor presente de los flujos futuros,
este valor se resta al valor actual de la deuda y de allí se calcula el
deterioro.

![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/120.png)

Si por ejemplo, el cliente Luis Carlos Trujillo Sánchez tienen una cuenta
vencida desde el 30/10/2018 por valor de $2.000.000 y esperamos recibir el
total del valor adeudado en 91 días, tomando una tasa de interés del 10% en el
mercado.
El sistema utilizará la fórmula del valor presente para traer al día de hoy
esos $2.000.000 que esperamos recibir en 91 días. En este caso el valor
presente es de $1.953.035.67.
Luego este valor es restado el valor actual del crédito, es decir, los
$2.000.000 y de allí sale el valor del deterioro, que en este caso es de
**$46.964.33.**

![120a.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/120a.png)

Observaciones

El asistente para el calculo del deteriorio de flujos futuros se habilita si
la cuenta de cartera sobre la cual estamos aplicando del deterioro, tiene
habilitado el manejo de deterioro por flujos futuros.

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de deteriorio por flujos futuros, ver: **\[Pestaña:
Contabilidad > Plan de cuentas > Clic derecho sobre la cuenta > Modificar >
Opción: Deterioro de cartera .**



﻿

# Deterioro por probabilidad de no pago % prob. no pago

Porcentaje de probabilidad de no pago que aplica para la deuda. Este método es
el más sencillo y de utilizar y el más recomendable.
Para activarlo basta con ir a la configuración de la cuenta de cartera sobre
la cual se aplicará el deterioro, y allí debemos indicar los días de
vencimiento y el porcentaje de probabilidad de no pago para cada rango de
días.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y se verifica la cantidad de días
de vencimiento que tiene la cuenta a la fecha de aplicación del deterioro.
2\. Según esta cantidad de días, el sistema verificará la tabla de días y
según el porcentaje configurado en la cuenta para los días de vencida, se
calculará sobre ese saldo de la cuenta el nuevo deterioro.


![130.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130.png)

Si por ejemplo, tenemos una cuenta por valor de $1.000.000 y a la fecha de
aplicación de deterioro tiene 31 días de vencida, el sistema consultará la
tabla de vencimientos y porcentajes.


![130A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130A.png)

En este caso, aplicará un porcentaje de deterioro del 10%, que equivale a
$100.000. Entonces este será el valor del deterioro aplicado a esta cuenta.

Observaciones



Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración



Para configurar la tabla de vencimientos y porcentajes para el manejo del
deterioro por probabilidad de no pago, ver: **\[Pestaña: Contabilidad > Plan
de cuentas > Clic derecho sobre la cuenta > Modificar > Opción: Deterioro de
cartera .**



﻿

# Valor

Valor que se aplicará para deteriorar la deuda por el método de probabilidad
de no pago. Este método es el más sencillo y de utilizar y el más
recomendable.
Para activarlo basta con ir a la configuración de la cuenta de cartera sobre
la cual se aplicará el deterioro, y allí debemos indicar los días de
vencimiento y el porcentaje de probabilidad de no pago para cada rango de
días.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y se verifica la cantidad de días
de vencimiento que tiene la cuenta a la fecha de aplicación del deterioro.
2\. Según esta cantidad de días, el sistema verificará la tabla de días y
según el porcentaje configurado en la cuenta para los días de vencida, se
calculará sobre ese saldo de la cuenta el nuevo deterioro.


![130.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130.png)

Si por ejemplo, tenemos una cuenta por valor de $1.000.000 y a la fecha de
aplicación de deterioro tiene 31 días de vencida, el sistema consultará la
tabla de vencimientos y porcentajes.


![130A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130A.png)

En este caso, aplicará un porcentaje de deterioro del 10%, que equivale a
**$100.000.** Entonces este será el valor del deterioro aplicado a esta
cuenta.

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para configurar la tabla de vencimientos y porcentajes para el manejo del
deterioro por probabilidad de no pago, ver: **\[Pestaña: Contabilidad > Plan
de cuentas > Clic derecho sobre la cuenta > Modificar > Opción: Deterioro de
cartera .**



﻿

# Observaciones

Observaciones sobre el deterioro registrado para las cuentas por cobrar

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente **30.456.123 - Luis Carlos Trujillo Sánchez** correspondiente al
pago de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero
de 2019 cuenta con un vencimiento de 30 días.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/150.png)

En la columna **"Observaciones"** se digita información sobre la cuenta por
cobrar a la cual se le esta registrando el deterioro:**Deterioro CxC Prob. no
pago: 5,00 %, cuenta de Luis Carlos Trujillo Sánchez.**

Observaciones

El sistema trae una observación de forma automática pero es de libre
definición para el usuario

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Configuración de columnas de deterioro >
Observaciones\].**



﻿

# Centro de costos

Centro de costos al cual se cargará el gasto por pérdida de deterioro.

Ejemplo



Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente Luis Carlos Trujillo Sánchez correspondiente al pago de la FV-16,
por valor de $2.900.000 la cual a la fecha del 28 de noviembre de 2019 cuenta
con un vencimiento de 92 días.


![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/160.png)

En el campo **"Centro de costos"** se selecciona el centro de costos que se
cargará a la cuenta de gasto por pérdida por deterioro.

Observaciones

El seleccionador trae el listado de todos los centros de costos vigentes a la
fecha.

Tenga presente que, si la cuenta por cobrar a la que se le está registrando el
deterioro tiene asignado un centro de costos, este se cargará automáticamente
a la cuenta de gasto.

Para que el centro de costos quede relacionado con la cuenta de gasto, la
cuenta debe tener la configuración **"Exige centro de costo"**. Normalmente
las cuentas de ingreso y egreso ya vienen con esta configuración.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
gasto, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta:
Clic derecho modificar > Pestaña datos requeridos > Activar opción: "Exige
centro de costo"\].**

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Datos maestros de la operación > Centro
de costos\].**



﻿

# Cargar cuentas a deteriorar

Carga las cuentas por cobrar vencidas según un filtro que se puede
especificar.
Se tiene la opción de seleccionar un tercero en particular, un rango de
cuentas de cartera a la que se aplicará el deterioro, también se podrá
seleccionar los vencimientos entre un rango de fechas o los vencimientos en
cantidad de días.

Ejemplo

Se requiere aplicar el deterioro de cartera a todas las cuentas de clientes
nacionales que tengan entre 1 y 90 días de vencidas.

![180.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/180.png)

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
cuenta por cobrar del renglón actual.

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente Luis Carlos Trujillo Sánchez correspondiente al pago de la P-0016,
por valor de $2.900.000 la cual a la fecha del 31 de Enero de 2019 cuenta con
un vencimiento de 30 días.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el deterioro, puede dar clic en el botón**"Visualizar el documento
impreso"** , y el sistema le muestra una vista previa del documento con toda
su información.

![190.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/190.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el deterioro, debe estar ubicado en la referencia antes de dar clic
en la opción **"Visualizar el documento impreso".**

El documento de impresión defecto es el mismo que tiene configurado la
operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Recalcular

Recalcula los deterioros con base en las condiciones actuales de cada deuda a
la fecha.



﻿

# Cód. Tercero

Identificación del tercero deudor al cual se registra el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de enero de
2019 cuenta con un vencimiento de 30 días.

![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/20.png)

La columna **"Cód. Tercero"** se carga el código del tercero para todas las
cuentas de clientes nacionales que tengan entre 1 y 90 días de
vencidas:**30.456.123 - Luis Carlos Trujillo Sánchez**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cod. tercero** se cargarán la identificación de los terceros
deudores según las condiciones que se indiquen en la opción **"Cargar cuentas
a deteriorar"** , donde podrá cargar las cuentas a las que desea aplicar el
deterioro de cartera, entre las opciones que nos ofrece el asistente tenemos
la opción de seleccionar un tercero en particular, un rango de cuentas de
cartera a la que se aplicará el deterioro, también podremos seleccionar los
vencimientos entre un rango de fechas o los vencimientos en cantidad de días.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Calcular deterioro especificando flujos futuros

Abre una ventana que permite calcular el deterioro para la cuenta por cobrar
actual, con base en la diferencia entre el valor en libros y la sumatoria del
valor presente de los pagos futuros, traídos a la fecha a una tasa específica.
Al final se asignará este valor en la columna correspondiente.

Ejemplo

Tenemos una cuenta por valor de **$2.000.000** y esperamos recibir el total
del valor adeudado en **91 días** , tomando una tasa de interés del **10%** en
el mercado.
El sistema utilizará la fórmula del valor presente para traer al día de hoy
**$2.000.000** que esperamos recibir en **91 días.** En este caso el valor
presente es de **$1.953.035.67.**
Luego este valor es restado el valor actual del crédito, es decir, los
**$2.000.000** y de allí sale el valor del deterioro, que en este caso es de
**$46.964.33.**

![210.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/210.png)

Observaciones

El asistente para el cálculo de deterioro especificando flujos futuros, se
habilita si la cuenta de cartera sobre la cual estamos aplicando del
deterioro, tiene habilitado el manejo de deterioro por flujos futuros.

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de deterioro por flujos futuros, ver: **\[Pestaña:
Contabilidad > Plan de cuentas > Clic derecho sobre la cuenta > Modificar >
Pestaña general > Activar opción: "Controla cartera y/o proveedores para
informes" .**



﻿

# Cód. deuda

Identificación de la cuenta de cartera al cual se registrará el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/30.png)

La columna **"Cód. deuda"** se carga el número de referencia para todas las
cuentas por cobrar que tengan entre 1 y 90 días de vencidas:**P-0016**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cód. deuda** se cargarán los números de referencia a las cual
se les registrará el deterioro según las condiciones que se indiquen en la
opción **"Cargar cuentas a deteriorar"** , donde podrá cargar las cuentas a
las que desea aplicar el deterioro de cartera, entre las opciones que nos
ofrece el asistente tenemos la opción de seleccionar un tercero en particular,
un rango de cuentas de cartera a la que se aplicará el deterioro, también
podremos seleccionar los vencimientos entre un rango de fechas o los
vencimientos en cantidad de días.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera que se va a
deteriorar

Ejemplo

Vamos a registrar el deterioro de cartera a las cuentas por cobrar con un
vencimiento de 30 días, la cartera se tiene registrada por cada sede, la cual
se tienen creados como centros de costos.

![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/40.png)

En La columna **"Centro de costos"** se muestra el centro de costos asociado a
la cuenta de cartera que se va a deteriorar.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Centro de costos** se cargarán los centros de costos asociados
a la cuenta por cobrar la cual se les registrará el deterioro según las
condiciones que se indiquen en la opción **"Cargar cuentas a deteriorar"** ,
donde podrá cargar las cuentas a las que desea aplicar el deterioro de
cartera, entre las opciones que nos ofrece el asistente tenemos la opción de
seleccionar un tercero en particular, un rango de cuentas de cartera a la que
se aplicará el deterioro, también podremos seleccionar los vencimientos entre
un rango de fechas o los vencimientos en cantidad de días.

Para el manejo de centros de costos en las cuentas de cartera, la cuenta debe
tener la configuración **"Exige centro de costos"**. Para que el sistema
cargue la información de las cuentas a deteriorar la operación origen de la
deuda debe estar procesada.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
cartera, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar
cuenta: Clic derecho modificar > Activar opciones: "Exige centro de
costos"\].**



﻿

# Saldo actual

Saldo actual de la deuda a la cual se va a registrar el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/50.png)

La columna **"Saldo actual"** muestra el saldo actual para todas las cuentas
por cobrar que tengan entre 1 y 90 días de vencidas:**$2.900.000**

Observaciones

Este campos es informativo, no puede ser modificado por el usuario.

El saldo actual que trae  para las cuenta por cobrar depende de la fecha que
tenga registrada la operación. Para que el sistema  cargue la información de
las cuentas a deteriorar la operación origen de la deuda debe estar procesada
y la cuenta contable debe tener la configuración de **"Maneja tercero, maneja
referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha vencim.

Fecha de vencimiento de la deuda a la cual se va a registrar el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/60.png)

La columna **"Fecha vencim."** se carga la fecha de vencimiento que tiene
registrada las cuentas por cobrar a las cuales se va a registrar el
deterioro:**01/01/2019**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema  cargue la información de las cuentas a deteriorar, la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Días vencida

Días que lleva vencida la deuda a la cual se le va a registrar el deterioro.

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/70.png)

La columna **"Días vencida"** se carga los días de vencido que tienen las
cuentas por cobrar a las cuales se va a registrar el deterioro:**30** días.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

La edad de cartera que calcula el sistema depende de la fecha de vencimiento
que tiene la cuenta por cobrar y la fecha en la que se está registrando el
deterioro.

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.


Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha último deterioro

Fecha en que se registro el último deterioro de la deuda.

Ejemplo



Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/80.png)
La columna **"Fecha último deterioro"** se carga la fecha del último registro
de deterioro que tenga la deuda.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema \[ContaPyme\] cargue la información de las cuentas a
deteriorar, la operación origen de la deuda y los deterioros registrados deben
estar procesadas. Sólo se deteriora cartera vencida.



﻿

# Días a deteriorar

Días que se va a deteriorar la deuda cuando el metodo es por costo amortizado.

Este método solo debe ser utilizado por aquellos usuarios que están llevando
el costo amortizado de sus activos financieros, específicamente de sus cuentas
por cobrar.
Para activar este método, debemos ir a la configuración del plan de cuentas y
allí activar el manejo de costo amortizado.
Luego en la cuenta contable de cartera a la cual vayamos a activar el método
de costo amortizado, debemos indicar la tasa efectiva anual o nominal diaria
con la cual se calculará el costo amortizado de la cuenta.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego se verifican los días en
vencimiento y la tasa de interés configurada en cada cuenta.
2\. Posteriormente el sistema actualiza el valor en libros de la deuda y resta
a este valor el saldo en libros.

De allí se calcula el deterioro.

![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/90.png)

Si por ejemplo, tenemos una cuenta por cobrar por valor de $800.000 y cuenta
con 75 días de vencimiento tal como lo muestra la imagen. Vamos a utilizar una
tasa efectiva anual del 10%.
Esa tasa el sistema la convertirá en nominal diaria y contando la cantidad de
días de vencimiento actualizará el valor de la deuda utilizando la fórmula del
valor futuro.
En este caso el valor actualizado de la deuda es de $815.821.8. Entonces a
este valor se le resta el valor contabilizado de la deuda, es decir los
$800.000 y de esta resta sale el valor del deterioro, que en este caso sería
de $15.821,8.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.
Los días a deteriorar que asigna \[ContaPyme\] depende de la fecha de
vencimiento que tiene la cuenta por cobrar y la fecha en la que se está
registrando el deterioro.
Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de costo amortizado, ver:**\[Pestaña: Contabilidad >
Plan de cuentas > Configuración > Configuraciones generales > Deterioro de
cartera NIIF\].**



---

### CAR2 - Reversion de deterioro de cartera

#### [14060] FrmDlgOprCar2

﻿

# Vr. deterioro acum.

Valor acumulado de deterioro para cada deuda hasta la fecha.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![100.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/100.png)

En la columna **"Vr. deterioro acum."** se muestra el acumulado de los valores
deteriorados para cada una de las referencias: **$200.000**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor acumulado de los deterioros de cartera
para cada referencia, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro de costos

Indique el centro de costo que se cargará a la cuenta de gasto.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/10.png)

En el campo **"Centro de costos"** se selecciona el centro de costo que se
cargará a la cuenta de gasto por reversión de deterioro. **DC-Deterioro de
cartera.**

Observaciones

El seleccionador trae el listado de todos los centros de costos vigentes a la
fecha.

Tenga presente que si la cuenta por cobrar a la que se le está registrando el
deterioro tiene asignado un centro de costos, se cargará automáticamente a la
cuenta de gasto.

Para que el centro de costo quede relacionado con la cuenta de gasto, la
cuenta debe tener la configuración **"Exige centro de costo"**. Normalmente
las cuetas de ingreso y egreso ya vienen con esta configuración.

Configuración

Para realizar la configuración de **"Exige centro de costo"** a la cuenta de
gasto, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta:
Clic derecho modificar > Activar opciones: "Exige centro de costo"\].**

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Datos maestros de la operación > Centro
de costos\].**



﻿

# Valor reversión

Valor a revertir sobre la deuda.




Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/110.png)

La columna **"Valor reversión"** se debe digitar el valor que vamos a
revertir. Como el cliente nos va a cancelar la totalidad de la deuda,
realizaremos la reversión del total del deterioro aplicado, en este caso
son:**$200.000** pesos.

Observaciones

El valor a revertir se debe digitar de forma manual por el usuario.

\[ContaPyme\]No se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado. Para que el sistema \[ContaPyme>\] cargue la información de las
cuentas a la cual se le va a registrar la reversión de deteriorar la operación
origen de la deuda debe estar procesada y la cuenta contable debe tener la
configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Observaciones

Observaciones sobre la reversión del deterioro para las cuentas por cobrar

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/120.png)

En la columna **"Observaciones"** se digita información sobre la cuenta por
cobrar a la cual se le esta registrando la reversión del deterioro:**Reversión
deterioro de cartera Yenny Espinosa a la factura P-0001**

Observaciones

El sistema trae una observación de forma automática pero es de libre
definición para el usuario

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Reversion deterioro de cartera >
Configurar operación > Campos de la operación > Configuración de columnas de
deterioro > Observaciones\].**



﻿

# Reversión de deterioro en distinto periodo

Esta opción permite indicar al sistema si la reversión al deterioro es en el
mismo periodo en que se registró el deterioro \(desactivado\), o si es en otro
periodo diferente \(activado\).

Cuando la reversión al deterioro es en el mismo periodo, se acredita la cuenta
de gastos. Cuando es en otro periodo, se acredita una cuenta de ingresos.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Como la reversión del deterioro se esta registrando en un periodo diferente se
debe activar la opción **"Reversión de deterioro en distinto periodo"** , esto
con el fin de indicarle al sistema que al realizarse la reversión en un
periodo diferente, la cuenta sobre la cual se debe contabilizar la reversión
ya no será una cuenta del gasto sino una cuenta de ingresos, ya que la cuenta
de gastos ha sido cancelada al cerrarse el año 2018.


![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/140.png)


Observaciones

Las cuentas que el sistema imputará automáticamente al realizarse el deterioro
y la reversión de deterioro se configuran en la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Opción: "Deterioro cartera"\].** .



﻿

# Cargar cuentas a deteriorar

Carga las cuentas por cobrar que ya han sido deterioradas, según un filtro que
se puede especificar
Se tiene la opción de seleccionar un tercero en particular, un rango de
cuentas de cartera a la que se aplicará el deterioro, también se prodrá
seleccionar la referencia a la cual se requiere realizar la reversión.

Ejemplo

Se requiere aplicar la reversión de deterioro a la referencia P-0001 del
cliente Yenny Espinosa, desde la opción "Cargar cuentas a
deteriorar",seleccionamos la referencia sobre la cual realizará la reversión
del deterioro. Seleccionaremos la referecnia **P-0001**.
Luego damos clic al botón aceptar.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/150.png)

Posteriormente el \[ContaPyme\] carga toda la información de la cuenta
deteriorada, como el código del tercero, el saldo actual y demás datos de cada
cuenta. También Caraga la fecha del último deterioro y el último valor del
deterioro además del acumulado de los valores deteriorados.

Observaciones

En \[ContaPyme\] no se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado.

Para que el sistema \[ContaPyme>\] cargue la información de las cuentas a la
cual se le va a registrar la reversión de deteriorar la operación origen de la
deuda debe estar procesada y la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Visualizar el documento impreso

Visualiza el documento impreso asociado a la cuenta por cobrar del renglón
actual

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Si se requiere ver el documento impreso asociado a la cuenta por cobrar damos
clic en la opcion "Visualizar el documento impreso".

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/160.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando la reversión, debe estar ubicado en la referencia antes de dar clic
en la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Recalcular

Recalcula los datos de los registros con base en las condiciones actuales de
cada deuda a la fecha.



﻿

# Cód. Tercero

Identificación del tercero deudor al cual se registra la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/20.png)

La columna **"Cód. Tercero"** se carga el código del tercero para todas las
cuentas a las cuales se les aplicará la reversión de
deterioro:**10345678-Yenny Espinosa**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cod. tercero** se cargarán la identificación de los terceros
deudores según las condiciones que se indiquen en la opción **"Cargar cuentas
a deteriorar"** , donde podrá cargar las cuentas a las que desea aplicar el
deterioro de cartera, entre las opciones que nos ofrece el asistente tenemos
la opción de seleccionar un tercero en particular, un rango de cuentas de
cartera a la que se aplicará la reversión de deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cód. deuda

Identificación de la cuenta de cartera al cual se registrará la reversión de
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/30.png)

La columna **"Cód. deuda"** se carga el número de referencia para todas las
cuentas por cobrar a las que se les va aplicar el deterioro**P-0001**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cód. deuda** se cargarán los números de referencia a las cual
se les registrará la reversión de deterioro según las condiciones que se
indiquen en la opción **"Cargar cuentas a deteriorar"** , donde podrá cargar
las cuentas a las que desea aplicar el deterioro de cartera, entre las
opciones que nos ofrece el asistente tenemos la opción de seleccionar un
tercero en particular, un rango de cuentas de cartera a la que se aplicará el
deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a la cual se le va a
registrar la reversión de deteriorar la operación origen de la deuda debe
estar procesada y la cuenta contable debe tener la configuración de **"Maneja
tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera que se va a
reversar.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/40.png)

En La columna **"Centro de costos"** se muestra el centro de costo asociado a
la cuenta de cartera que se va a realizar la reversión de deterioro.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Centro de costos** se cargarán los centros de costos asociados
a la cuenta por cobrar la cual se les registrará la reversión deterioro según
las condiciones que se indiquen en la opción **"Cargar cuentas a deteriorar"**
, donde podrá cargar las cuentas a las que desea aplicar el deterioro de
cartera, entre las opciones que nos ofrece el asistente tenemos la opción de
seleccionar un tercero en particular, un rango de cuentas de cartera a la que
se aplicará el deterioro y la referencia.

Tenga presente que si la cuenta por cobrar a la que se le está registrando la
reversión de deterioro tiene asignado un centro de costos, se cargará
automáticamente a la cuenta de gasto.

Para el manejo de centros de costos en las cuentas de cartera, la cuenta debe
tener la configuración **"Exige centro de costo"**. Para que el sistema
cargue la información de las cuentas en la reversion de deterioro la operación
origen de la deuda debe estar procesada.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
cartera, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar
cuenta: Clic derecho modificar > Activar opciones: "Exige centro de
costos"\].**



﻿

# Saldo actual

Saldo actual de la deuda a la cual se va a registrar la reversión de deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/50.png)

La columna **"Saldo actual"** muestra el saldo actual para todas las cuentas
por cobrar a la cual se va a registrar la reversión:**$2.000.000**

Observaciones

Este campos es informativo, no puede ser modificado por el usuario.

El saldo actual que trae  para las cuenta por cobrar depende de la fecha que
tenga registrada la operación. Para que el sistema  cargue la información de
las cuentas a reversar, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha vencim.

Fecha de vencimiento de la deuda a la cual se va a registrar la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/60.png)

La columna **"Fecha vencim."** se carga la fecha de vencimiento que tiene
registrada las cuentas por cobrar a las cuales se va a registrar la reversión
del deterioro:**27/07/2018**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema  cargue la información de las cuentas a reversar, la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Días vencida

Días que lleva vencida la deuda a la cual se le va a registrar la reversión
del deterioro.

Ejemplo



>El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/70.png)

La columna **"Días vencida"** se carga los días de vencido que tienen las
cuentas por cobrar a las cuales se va a registrar la reversión del
deterioro:**161** días.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

La edad de cartera que calcula el sistema depende de la fecha de vencimiento
que tiene la cuenta por cobrar y la fecha en la que se está registrando la
reversión del deterioro.

Para que el sistema realice la reversión de deterioro de cartera, las cuentas
deben tener activa la opción de 'Controla endeudamiento' y la casilla para
afectar contabilización NIIF.


Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha ult. deter.

Fecha en que se registro el último deterioro de la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/80.png)

La columna **"Fecha último deterioro"** se carga la fecha del último registro
de deterioro que tenga la deuda:**31/12/2018**.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema \[ContaPyme\] cargue la información de las cuentas a
reversar, la operación origen de la deuda y los deterioros registrados deben
estar procesadas.



﻿

# Vr. últ. deterioro

Valor del último deterioro registrado para la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/90.png)

En la columna **"Vr. últ. deterioro"** se muestra el último deterioro
registrado para la deuda según la fecha indicada en la operación, para este
casi son: **$200.000** pesos.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor del último deterioro registrado para cada
referencia, la operación origen de la deuda y de deterioro debe estar
procesada, como también la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



---

### CAR2 - Reversi¾n de deterioro de cartera

#### [14060] FrmDlgOprCar2

﻿

# Vr. deterioro acum.

Valor acumulado de deterioro para cada deuda hasta la fecha.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![100.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/100.png)

En la columna **"Vr. deterioro acum."** se muestra el acumulado de los valores
deteriorados para cada una de las referencias: **$200.000**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor acumulado de los deterioros de cartera
para cada referencia, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro de costos

Indique el centro de costo que se cargará a la cuenta de gasto.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/10.png)

En el campo **"Centro de costos"** se selecciona el centro de costo que se
cargará a la cuenta de gasto por reversión de deterioro. **DC-Deterioro de
cartera.**

Observaciones

El seleccionador trae el listado de todos los centros de costos vigentes a la
fecha.

Tenga presente que si la cuenta por cobrar a la que se le está registrando el
deterioro tiene asignado un centro de costos, se cargará automáticamente a la
cuenta de gasto.

Para que el centro de costo quede relacionado con la cuenta de gasto, la
cuenta debe tener la configuración **"Exige centro de costo"**. Normalmente
las cuetas de ingreso y egreso ya vienen con esta configuración.

Configuración

Para realizar la configuración de **"Exige centro de costo"** a la cuenta de
gasto, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta:
Clic derecho modificar > Activar opciones: "Exige centro de costo"\].**

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Datos maestros de la operación > Centro
de costos\].**



﻿

# Valor reversión

Valor a revertir sobre la deuda.




Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/110.png)

La columna **"Valor reversión"** se debe digitar el valor que vamos a
revertir. Como el cliente nos va a cancelar la totalidad de la deuda,
realizaremos la reversión del total del deterioro aplicado, en este caso
son:**$200.000** pesos.

Observaciones

El valor a revertir se debe digitar de forma manual por el usuario.

\[ContaPyme\]No se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado. Para que el sistema \[ContaPyme>\] cargue la información de las
cuentas a la cual se le va a registrar la reversión de deteriorar la operación
origen de la deuda debe estar procesada y la cuenta contable debe tener la
configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Observaciones

Observaciones sobre la reversión del deterioro para las cuentas por cobrar

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/120.png)

En la columna **"Observaciones"** se digita información sobre la cuenta por
cobrar a la cual se le esta registrando la reversión del deterioro:**Reversión
deterioro de cartera Yenny Espinosa a la factura P-0001**

Observaciones

El sistema trae una observación de forma automática pero es de libre
definición para el usuario

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Reversion deterioro de cartera >
Configurar operación > Campos de la operación > Configuración de columnas de
deterioro > Observaciones\].**



﻿

# Reversión de deterioro en distinto periodo

Esta opción permite indicar al sistema si la reversión al deterioro es en el
mismo periodo en que se registró el deterioro \(desactivado\), o si es en otro
periodo diferente \(activado\).

Cuando la reversión al deterioro es en el mismo periodo, se acredita la cuenta
de gastos. Cuando es en otro periodo, se acredita una cuenta de ingresos.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Como la reversión del deterioro se esta registrando en un periodo diferente se
debe activar la opción **"Reversión de deterioro en distinto periodo"** , esto
con el fin de indicarle al sistema que al realizarse la reversión en un
periodo diferente, la cuenta sobre la cual se debe contabilizar la reversión
ya no será una cuenta del gasto sino una cuenta de ingresos, ya que la cuenta
de gastos ha sido cancelada al cerrarse el año 2018.


![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/140.png)


Observaciones

Las cuentas que el sistema imputará automáticamente al realizarse el deterioro
y la reversión de deterioro se configuran en la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Opción: "Deterioro cartera"\].** .



﻿

# Cargar cuentas a deteriorar

Carga las cuentas por cobrar que ya han sido deterioradas, según un filtro que
se puede especificar
Se tiene la opción de seleccionar un tercero en particular, un rango de
cuentas de cartera a la que se aplicará el deterioro, también se prodrá
seleccionar la referencia a la cual se requiere realizar la reversión.

Ejemplo

Se requiere aplicar la reversión de deterioro a la referencia P-0001 del
cliente Yenny Espinosa, desde la opción "Cargar cuentas a
deteriorar",seleccionamos la referencia sobre la cual realizará la reversión
del deterioro. Seleccionaremos la referecnia **P-0001**.
Luego damos clic al botón aceptar.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/150.png)

Posteriormente el \[ContaPyme\] carga toda la información de la cuenta
deteriorada, como el código del tercero, el saldo actual y demás datos de cada
cuenta. También Caraga la fecha del último deterioro y el último valor del
deterioro además del acumulado de los valores deteriorados.

Observaciones

En \[ContaPyme\] no se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado.

Para que el sistema \[ContaPyme>\] cargue la información de las cuentas a la
cual se le va a registrar la reversión de deteriorar la operación origen de la
deuda debe estar procesada y la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Visualizar el documento impreso

Visualiza el documento impreso asociado a la cuenta por cobrar del renglón
actual

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Si se requiere ver el documento impreso asociado a la cuenta por cobrar damos
clic en la opcion "Visualizar el documento impreso".

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/160.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando la reversión, debe estar ubicado en la referencia antes de dar clic
en la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Recalcular

Recalcula los datos de los registros con base en las condiciones actuales de
cada deuda a la fecha.



﻿

# Cód. Tercero

Identificación del tercero deudor al cual se registra la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/20.png)

La columna **"Cód. Tercero"** se carga el código del tercero para todas las
cuentas a las cuales se les aplicará la reversión de
deterioro:**10345678-Yenny Espinosa**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cod. tercero** se cargarán la identificación de los terceros
deudores según las condiciones que se indiquen en la opción **"Cargar cuentas
a deteriorar"** , donde podrá cargar las cuentas a las que desea aplicar el
deterioro de cartera, entre las opciones que nos ofrece el asistente tenemos
la opción de seleccionar un tercero en particular, un rango de cuentas de
cartera a la que se aplicará la reversión de deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cód. deuda

Identificación de la cuenta de cartera al cual se registrará la reversión de
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/30.png)

La columna **"Cód. deuda"** se carga el número de referencia para todas las
cuentas por cobrar a las que se les va aplicar el deterioro**P-0001**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cód. deuda** se cargarán los números de referencia a las cual
se les registrará la reversión de deterioro según las condiciones que se
indiquen en la opción **"Cargar cuentas a deteriorar"** , donde podrá cargar
las cuentas a las que desea aplicar el deterioro de cartera, entre las
opciones que nos ofrece el asistente tenemos la opción de seleccionar un
tercero en particular, un rango de cuentas de cartera a la que se aplicará el
deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a la cual se le va a
registrar la reversión de deteriorar la operación origen de la deuda debe
estar procesada y la cuenta contable debe tener la configuración de **"Maneja
tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera que se va a
reversar.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/40.png)

En La columna **"Centro de costos"** se muestra el centro de costo asociado a
la cuenta de cartera que se va a realizar la reversión de deterioro.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Centro de costos** se cargarán los centros de costos asociados
a la cuenta por cobrar la cual se les registrará la reversión deterioro según
las condiciones que se indiquen en la opción **"Cargar cuentas a deteriorar"**
, donde podrá cargar las cuentas a las que desea aplicar el deterioro de
cartera, entre las opciones que nos ofrece el asistente tenemos la opción de
seleccionar un tercero en particular, un rango de cuentas de cartera a la que
se aplicará el deterioro y la referencia.

Tenga presente que si la cuenta por cobrar a la que se le está registrando la
reversión de deterioro tiene asignado un centro de costos, se cargará
automáticamente a la cuenta de gasto.

Para el manejo de centros de costos en las cuentas de cartera, la cuenta debe
tener la configuración **"Exige centro de costo"**. Para que el sistema
cargue la información de las cuentas en la reversion de deterioro la operación
origen de la deuda debe estar procesada.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
cartera, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar
cuenta: Clic derecho modificar > Activar opciones: "Exige centro de
costos"\].**



﻿

# Saldo actual

Saldo actual de la deuda a la cual se va a registrar la reversión de deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/50.png)

La columna **"Saldo actual"** muestra el saldo actual para todas las cuentas
por cobrar a la cual se va a registrar la reversión:**$2.000.000**

Observaciones

Este campos es informativo, no puede ser modificado por el usuario.

El saldo actual que trae  para las cuenta por cobrar depende de la fecha que
tenga registrada la operación. Para que el sistema  cargue la información de
las cuentas a reversar, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha vencim.

Fecha de vencimiento de la deuda a la cual se va a registrar la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/60.png)

La columna **"Fecha vencim."** se carga la fecha de vencimiento que tiene
registrada las cuentas por cobrar a las cuales se va a registrar la reversión
del deterioro:**27/07/2018**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema  cargue la información de las cuentas a reversar, la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Días vencida

Días que lleva vencida la deuda a la cual se le va a registrar la reversión
del deterioro.

Ejemplo



>El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/70.png)

La columna **"Días vencida"** se carga los días de vencido que tienen las
cuentas por cobrar a las cuales se va a registrar la reversión del
deterioro:**161** días.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

La edad de cartera que calcula el sistema depende de la fecha de vencimiento
que tiene la cuenta por cobrar y la fecha en la que se está registrando la
reversión del deterioro.

Para que el sistema realice la reversión de deterioro de cartera, las cuentas
deben tener activa la opción de 'Controla endeudamiento' y la casilla para
afectar contabilización NIIF.


Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha ult. deter.

Fecha en que se registro el último deterioro de la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/80.png)

La columna **"Fecha último deterioro"** se carga la fecha del último registro
de deterioro que tenga la deuda:**31/12/2018**.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema \[ContaPyme\] cargue la información de las cuentas a
reversar, la operación origen de la deuda y los deterioros registrados deben
estar procesadas.



﻿

# Vr. últ. deterioro

Valor del último deterioro registrado para la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/90.png)

En la columna **"Vr. últ. deterioro"** se muestra el último deterioro
registrado para la deuda según la fecha indicada en la operación, para este
casi son: **$200.000** pesos.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor del último deterioro registrado para cada
referencia, la operación origen de la deuda y de deterioro debe estar
procesada, como también la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



---

### CAR3 - Registro de tasa maxima de interes por mora

#### [18730] FrmDlgOprCar3

﻿

# Tasa máxima de interés

Define la tasa máxima de interés por mora o tasa de usura que se le aplicará a
una cuenta por cobrar vencida en determinado rango de fechas.
En Colombia esta tasa máxima es definida por la **Superintendencia financiera
de Colombia.**

Para mayor información sobre como consultar la tasa máxima de interes en un
periodo, diríjase a la sección de observaciones.

Ejemplo

Se define que entre el 15/05/2018 y el 15/06/2018 la tasa máxima de interés
por mora será del 56,33% **EFECTIVO ANUAL**.

![ejemplo_tasa.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_tasa.png)


## Ejemplo práctico

El día 1 de mayo de 2018 el señor Andrés Parra realiza el préstamo de
$1.000.000 para pagarlo a 2 cuotas mensuales y se establece que se aplicará la
tasa máxima de interés por mora.

El dia 5 de junio de 2018 se dispone a pagar su primera cuota por un valor de
**$500.000** pero a esta fecha tiene 4 días en mora por lo cual deberá pagar
la suma de **$502.488**.

![ejemplo_practico.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_practico.png)

Este cálculo se realizó de la siguiente manera:

Inicialmente se convierte la tasa efectiva anual a diaria con la siguiente
fórmula:
![ecuacion_TM.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_TM.png)
**TED:** Tasa efectiva diaria
**TEA:** Tasa efectiva anual vigente \(56,33%\)
**P :** Periodos \(360 Días\)
**% Tasa mora diaria:** 0.1242%

Luego se calcula la tasa equivalente a los días de mora:
![ecuacion_M.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_M.png)
**TED:** Tasa de interés diaria \(0.1242%\)
**D :** Días por mora \(4 Días\)
**Tasa interés:** 0.4977%

Ahora se calcula el valor del interés que se debe pagar por los 4 días de
mora:
**Total de interés por mora:** \($500.000 \* 0.4977%\) = 2.488
**Total de la cuota:** $502.488


Observaciones

## ¿Cómo consultar la tasa máxima de interés por mora actual?

Puede consultar la tasa de usura para las diferentes modalidades de préstamo
en la página web de la [Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), sección
“indicadores económicos”

![Indicadores-
economicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
economicos.png)

## Recuerde

**Exceder la tasa de usura es un delito cuya pena puede estar entre dos \(2\)
a cinco \(5\) años de cárcel** y multas desde cincuenta \(50\) hasta
doscientos \(200\) salarios mínimos legales mensuales vigentes.
Para más información consulte el artículo 305 de la [ley 599 de
2000](<http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=6388>).



﻿

# Vigencia

Defina la fecha inicial y la fecha final desde la cual estará vigente la tasa
máxima por mora.
De esta manera al calcular la mora de un prestamo el sistema buscará la tasa
máxima vigente a esa fecha.

Observaciones

En Colombia estas fechas deben ser consultadas en la página web de la
[Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), costado
derecho, sección “indicadores económicos”

![Indicadores-
economicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
economicos.png)



# Acerca de ventana

## OPERACIÓN DE TASA MÁXIMA DE INTERÉS POR MORA

##  Objetivo

La operación de registro de tasas máximas de interés por mora permite definir
la tasa de mora que estará vigente entre un rango de fechas.

## Ejemplo de información a registrar

Los datos que se deben ingresar al momento de realizar la operación son los
siguientes:

**Fecha inicio** | 01/08/2018
---|---
**Fecha fin** | 30/08/2018
**Tasa máxima** | 29,91%



## Definición de conceptos

**¿Dónde se utilizan estas tasas?**

El siguiente diagrama explica conceptualmente cómo se debe utilizar la
operación **"Registro de tasas máximas de interés por mora"** y cómo afecta al
momento de realizar el cálculo del monto de mora de una cuenta por cobrar
vencida:

![tasamaxima.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/tasamaxima.png)


## Secciones

## Publicación de la entidad financiera

Periódicamente la Superintendencia financiera publica las tasas de usura para
las diferentes modalidades de préstamo que estarán vigentes en un rango de
fechas.

## Registro en el sistema

Estas tasas deben ser ingresadas al sistema para que este pueda estar
actualizado y aplicar la tasa correspondiente a las diferentes cuentas por
cobrar vencidas.

Para consultar el histórico de tasas registradas, diríjase a: **\[Pestaña
cartera > Explorador de tasas por mora\]**.

## Calculo al realizar el abono

Al momento de registrar el abono de una CxC se verificará si esta tiene días
en mora y si el tipo de crédito con el que fue creado aplica la tasa máxima de
intereses por mora.
De esta manera el sistema consultará si hay una tasa vigente para el periodo
en el que se esté realizando el pago, y en caso de no encontrar una el sistema
sacará un error y no permitirá realizar el pago.



## Para Colombia

**Para Colombia** estas tasas son definidas por la superintendencia financiera
de Colombia. Puede consultar la tasa de usura para las diferentes modalidades
de préstamo en la página web de la [Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), sección
**"indicadores económicos"** :

![indicador.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/indicador.png)


**Recuerde**

**La tasa de usura no puede ser mayor al 1.5 del interés corriente, exceder
esta tasa es un delito cuya pena puede estar entre dos \(2\) a cinco \(5\)
años de cárcel** y multas desde cincuenta \(50\) hasta doscientos \(200\)
salarios mínimos legales mensuales vigentes.
Para más información consulte el **artículo 305** de la [ley 599 de
2000](<http://www.suin-juriscol.gov.co/viewDocument.asp?id=1663230>).



---

### CAR3 - Registro de tasa mßxima de interÚs por mora

#### [18730] FrmDlgOprCar3

﻿

# Tasa máxima de interés

Define la tasa máxima de interés por mora o tasa de usura que se le aplicará a
una cuenta por cobrar vencida en determinado rango de fechas.
En Colombia esta tasa máxima es definida por la **Superintendencia financiera
de Colombia.**

Para mayor información sobre como consultar la tasa máxima de interes en un
periodo, diríjase a la sección de observaciones.

Ejemplo

Se define que entre el 15/05/2018 y el 15/06/2018 la tasa máxima de interés
por mora será del 56,33% **EFECTIVO ANUAL**.

![ejemplo_tasa.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_tasa.png)


## Ejemplo práctico

El día 1 de mayo de 2018 el señor Andrés Parra realiza el préstamo de
$1.000.000 para pagarlo a 2 cuotas mensuales y se establece que se aplicará la
tasa máxima de interés por mora.

El dia 5 de junio de 2018 se dispone a pagar su primera cuota por un valor de
**$500.000** pero a esta fecha tiene 4 días en mora por lo cual deberá pagar
la suma de **$502.488**.

![ejemplo_practico.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_practico.png)

Este cálculo se realizó de la siguiente manera:

Inicialmente se convierte la tasa efectiva anual a diaria con la siguiente
fórmula:
![ecuacion_TM.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_TM.png)
**TED:** Tasa efectiva diaria
**TEA:** Tasa efectiva anual vigente \(56,33%\)
**P :** Periodos \(360 Días\)
**% Tasa mora diaria:** 0.1242%

Luego se calcula la tasa equivalente a los días de mora:
![ecuacion_M.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_M.png)
**TED:** Tasa de interés diaria \(0.1242%\)
**D :** Días por mora \(4 Días\)
**Tasa interés:** 0.4977%

Ahora se calcula el valor del interés que se debe pagar por los 4 días de
mora:
**Total de interés por mora:** \($500.000 \* 0.4977%\) = 2.488
**Total de la cuota:** $502.488


Observaciones

## ¿Cómo consultar la tasa máxima de interés por mora actual?

Puede consultar la tasa de usura para las diferentes modalidades de préstamo
en la página web de la [Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), sección
“indicadores económicos”

![Indicadores-
económicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
econ%C3%B3micos.png)

## Recuerde

**Exceder la tasa de usura es un delito cuya pena puede estar entre dos \(2\)
a cinco \(5\) años de cárcel** y multas desde cincuenta \(50\) hasta
doscientos \(200\) salarios mínimos legales mensuales vigentes.
Para más información consulte el artículo 305 de la [ley 599 de
2000](<http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=6388>).



﻿

# Vigencia

Defina la fecha inicial y la fecha final desde la cual estará vigente la tasa
máxima por mora.
De esta manera al calcular la mora de un prestamo el sistema buscará la tasa
máxima vigente a esa fecha.

Observaciones

En Colombia estas fechas deben ser consultadas en la página web de la
[Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), costado
derecho, sección “indicadores económicos”

![Indicadores-
económicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
econ%C3%B3micos.png)



---

### MOV3 - Abono a CxP

#### [14170] FrmDlgOprMov3

﻿

# Vr. otra moneda

Valor abonado en moneda extranjera.

En esta columna se puede especificar el valor del abono equivalente en moneda
extranjera.

Esta columna solamente se habilita para edición, en caso que la cuenta se
maneje en moneda extranjera y además, la configuración para el manejo de
moneda extranjera permita la edición de este valor.

Observaciones

Normalmente solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se debería habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
proveedores.

Configuración

  * Para ingresar a la configuración de manejo de moneda extranjera, ingrese a **\[Catálogo Plan de Cuentas > Configuración > Configuraciones generales > Valor de moneda automático.\]**



﻿

# Tercero

Corresponde al código o identificación del tercero con el cual se tiene la
cuenta por pagar y del cual se va a realizar el abono.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura FC-000140 por una compra de materia prima por valor de $2.500.000
pesos al proveedor **900852956 - Provee ABS** , así que en el campo
**"Tercero"** indique el código o identificación del tercero al cual se tiene
asociada la cuenta por pagar: **900852956 - Provee ABS**

Observaciones

El tercero ya debe estar creado en la base de datos.

Al indicar el código o identificador del tercero, el sistema filtra
automáticamente todas las cuentas por pagar que se tienen registradas para ese
tercero.

Para que \[ContaPyme\] filtre las cuentas por pagar que se tienen para cada
tercero, la cuenta contable debe tener la configuración de **"Maneja y exije
tercero, controla endeudamiento y maneja referencia"**.

\[ContaPyme\] muestra las cuentas por pagar pendientes con cada tercero hasta
la fecha que tenga configurada la operación de abono a CXP.

También se tiene la posibilidad de realizar abonos a CXP para múltiples
terceros, para ello se debe activar la columna tercero, ver:**\[Operación
Abono CXP > Menú: Opciones > Activar opción: Permitir hacer abonos a múltiples
terceros\].**



﻿

# Total saldos

Valor total de los saldos que trae cada una las referencias registradas en la
operación

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , Se realiza un abono por valor de $500.000 pesos a la factura
**FC-000140** y para la factura **FV-000160** Se realiza un abono de $600.000
pesos.

![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV3%20-%20Abono%20a%20CxP/%5B14170%5D%20FrmDlgOprMov3/110.png)

En el campo **"Total saldos"** el sistema muestra el valor total del saldo
actual que trae cada una las referencias registradas en la
operación:**$4.100.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Total abonos

Valor total de los abonos realizados a cada una de las referencias registradas
en al operación.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956 -
Provee ABS** , Se realiza un abono por valor de $500.000 pesos a la factura
**FC-000140** y para la factura **FV-000160** Se realiza un abono de $600.000
pesos.

![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV3%20-%20Abono%20a%20CxP/%5B14170%5D%20FrmDlgOprMov3/120.png)

En el campo **"Total abonos"** el sistema muestra el valor total de los abonos
realizados en cada una las referencias registradas en la
operación:**$1.100.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Cód. deuda

Si el abono a la cuenta por pagar genera impuestos, intereses, comisiones,
etc., se debe seleccionar la referencia de la cuenta por pagar a la cual
quedarán asignados estos costos financieros.

Ejemplo

Se realiza un abono de $800.000 pesos, el abono se debe registrar a la
referencia FC-000150, para la cual se requiere registrar los intereses del
abono realizado a la referencia registrada.

En este caso en el campo "Cód. deuda" se indica la referencia FC-000150 para
que el registro de los intereses quede registrado a la referencia
correspondiente.

Observaciones

En este campo se cargan automáticamente las referencias registradas en el
primer paso de la operación.

Este dato se puede visualizar en el explorador de contabilidad.



﻿

# Concepto de pago

Corresponde a la cuenta o concepto de los costos financieros, a la cual se
realiza la imputación contable.

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta a la cual se va a registrar el costo o gasto financiero.**530520-
Intereses**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de gastos.

Se pueden registrar tantos conceptos de gastos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

El concepto de pago que se registre se verá reflejado en el documento de
impresión de la operación.

Si se indica un detalle y observación en el renglón, este reemplazará el
nombre del concepto \(Nombre de la cuenta\) por el detalle registrado en la
impresión del documento.



﻿

# CC. a cargar

Código del Centro de costos al que se le carga el costo/gasto financiero de
cada renglón

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.
Para estos movimientos se tienen creado un centro de costos para el manejo de
los intereses de proveedores.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Cc. a cargar"** se debe indicar el identificador del centro de
costos a la cual se va a registrar el costo/gasto financiero.**INT- Intereses
CXP proveedores**

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

Este dato se puede incluir en el documento de impresión de la operación.



﻿

# Valor

Aquí se debe indicar el valor que corresponde por el concepto del costo/gasto
financiero que se está registrando

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Valor"** se debe indicar el valor que corresponde por el
concepto del costo financiero que se está registrando por cada
renglón:**$10.000 pesos**

Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.



﻿

# Concepto de gastos/costos

Permite especificar una descripción u observación corta para el registro del
costo/gasto que se está realizando.

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Detalle"** se puede indicar una descripción u observación que
requiera para el costo/gasto financiero registrado para cada
renglón:**Intereses del 2% sobre el valor abonado cuota No 2 de la referencia
FC-000140.**

Observaciones

Esta información se podrá visualizar como descripción, en la impresión del
documento, de lo contrario, muestra el nombre de la cuenta que se este
registrando.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por pagar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
costos finan. > Detalle\].**



﻿

# Tipo de documento

Identificador del tipo de documento de soporte con el cual se requiere
soportar la transacción.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y número de factura, en
este caso activamos la opción **"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** , De esta manera, registrar el tercero, fecha de
soporte y el número de documento o referencia requerida para cada costo/gasto
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Número documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Tipo de documento"** debe indicar la identificación del
documento de soporte con el que requiere soportar cada costo/gasto financiero
registrado: **110- FACTURA DE COMPRA**

Observaciones

\[ContaPyme\] tiene pre-configurados múltiples documentos de soporte, para
seleccionar el indicado basta con dar doble clic sobre el campo o usar la
tecla F3.



﻿

# Cód. Tercero

Identificación del tercero al cual se va a registrar el abono por cada
renglón.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS que consolida el pago de 2 facturas,
Este proveedor tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene
registrada la cuenta por pagar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Se activa la opción **"Permitir hacer abonos a múltiples terceros"** para
realiza el registro de este abono. De esta manera, se nos activa la columna
adicional "Tercero" para registrar el tercero requerido de cada referencia.

Tercero: 900852956-7 - Provee ABS
---
Cód. tercero | Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
900852956/MAN - Provee ABS sede Manizales | FC-000140 | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS
900852956/PER - Provee ABS sede Pereira | FC-000160 | $1.600.000 | $600.000 | $1.000.000 | Abono a FC-000160 - CxP \(10/05/2018\) a Provee ABS

En el campo**"Código tercero"** se debe indicar el identificador del tercero
con el cual se va a registrar el abono en cada renglón: **900852956/MAN -
Provee ABS sede Manizales**

Observaciones

Para seleccionar el tercero puede dar doble clic en la columna **"Tercero"** o
con el comando **F5**.

El tercero ya debe estar creado en el catálogo de terceros.

Para que \[ContaPyme\] muestre en el seleccionador las cuentas por pagar que
tiene cada tercero, la cuenta de proveedores debe tener la configuración de
**"Maneja y exige tercero, controla endeudamiento y maneja referencia"**.

\[ContaPyme\] muestra las cuentas por pagar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono a CXP.

Para visualizar y cargar el abono a las cuentas por PAGAR del tercero la
operación donde se registró la deuda debe estar procesada.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)




﻿

# Número documento

Número del documento de soporte con el que requiere soportar los costos/gastos
financieros de cada renglón.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y número de factura, en
este caso activamos la opción **"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** , De esta manera, registrar el tercero, fecha de
soporte y el número de documento o referencia requerida para cada costo/gasto
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Número documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Número documento"** debe indicar la referencia o número del
documento de soporte que sustenta cada costo/gasto financiero registrado, de
esta manera, por medio de los informes se podrá consultar el interés
registrado por cada referencia.




﻿

# Fecha

Específique la fecha de soporte para la contabilización por renglón de cada
registro

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y número de factura, en
este caso activamos la opción**"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** De esta manera, registrar el tercero, fecha de
soporte y el número de documento o referencia requerida para cada costo/gasto
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Fecha"** debe indicar la fecha de soporte con la cual requiere
registrar cada costo/gasto financiero registrado.

Observaciones

La fecha debe estar dentro del mismo mes que la fecha de soporte de la
operación de abono a CXP.



﻿

# Tercero

Código o identificación del tercero con el cual se registra el costo/gasto
financiero por cada renglón.

Ejemplo



Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal, en este caso activamos la
opción **"Permitir diferentes tipo de documentos y terceros para cada
ingreso"** , De esta manera, se nos activa la columna adicional **"Tercero"**
para registrar el tercero requerido de cada costo/gasto financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Tercero"** debe indicar la identificación del tercero que
corresponde para cada costo/gasto financiero registrado.

Observaciones

Si alguna cuenta de las registradas en la lista de "Detalle de los costos
financieros" está marcada para exigir tercero, el dato "Tercero" será
obligatorio.



﻿

# Diferente información de soporte por cada egreso

Al activar esta opción, se visualizarán las columnas adicionales que permite
asignar un tipo de documento, número de documento, fecha y tercero distinto
para cada renglón.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y factura de compra, en
este caso activamos la opción **"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** , De esta manera, se activan las columnas
adicionales de: **tipo de documento, número de documento, fecha y tercero**
para cada renglón y así registrar los datos requerido para cada costo/gasto
financiero registrado.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Número documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

Observaciones

En este caso, la fecha debe estar dentro del mismo mes que la fecha de soporte
de la operación.

Al momento de procesar la operación la información de los costos financieros
quedará registrada con los datos que se indiquen en cada una de las columnas y
se podrá visualizar el los exploradores e informes contables.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)




﻿

# Permite hacer abonos mayores a los saldos?

Active esta opción si requiere realizar un abono mayor al saldo de la
referencia registrada en la operación.

Ejemplo

Se tiene pendiente una cuenta por pagar con el Proveedor Provee ABS de la
factura FC-000150 por valor de 380.000 pesos, el cliente realiza un abono a la
factura por valor de $400.000 pesos.

Como el valor del abono es mayor al saldo de la cuenta por pagar se activa la
opción **"Permite hacer abonos mayores a los saldos"**.

Al procesar la operación quedarían registrados los $20.000 pesos sobrantes en
negativo para la cuenta por pagar seleccionada en la operación, para luego
poder realizar un cruce entre cuentas por ejemplo contra la cuenta de
efectivo.

Observaciones



Este dato se puede consultar en los informes de cartera y proveedores.



﻿

# Cargar todas las cuentas

Carga todas las cuentas por pagar pendientes para el tercero seleccionado.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos. Se emite un cheque por
valor de **$3.500.000 de pesos** para cancelar las cuentas por pagar que se
tienen pendientes con el proveedor.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por pagar registradas para el tercero seleccionado y realizar el
respectivo abono.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $2.500.000 |
FC-000160 | $1.000.000 | $1.000.000 |

Observaciones

Este botón carga por defecto todas las cuentas por cobrar pendientes del
tercero seleccionado a la fecha que tienen la operación de abono a CXC.



﻿

# Abonar monto

Permite abonar un monto dado a cuentas por pagar al tercero.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos. Se emite un cheque por
valor de **$1.600.000 de pesos** para realizar un abono a las cuentas por
pagar que se tienen pendientes con el proveedor.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por pagar registradas para el tercero seleccionado.

Luego, se da clic en el botón **"Abonar monto"** Para indicar el valor de
**$1.600.000 de pesos** que se está abonando a las cuentas por pagar
pendientes con el proveedor.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $800.000 | $1.700.000
FC-000160 | $1.000.000 | $800.000 | $200.000

Observaciones

El monto dado en la opción **"Abonar monto"** , \[ContaPyme\] reparte de forma
equitativa el valor abonando para cada referencia seleccionada en la
operación. Para este caso asigno el valor de **$800.000 pesos** en la columna
**"valor abono"** para cada una de las referencias seleccionadas.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos.
Para este caso se realiza un abono a la cuota número 2 de la factura
**FC-000140** por valor de $500.000 pesos.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el abono puede clic el botón **"Visualizar el documento impreso"**
, y el sistema le muestra una vista previa del documento con toda su
información.

.
![290.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV3%20-%20Abono%20a%20CxP/%5B14170%5D%20FrmDlgOprMov3/290.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por pagar.



﻿

# Permite hacer abonos a múltiples terceros

Active esta opción si requiere registrar abonos a diferentes terceros en el
mismo comprobante.

Ejemplo

Se emite un cheque por valor de **$1.000.000** de pesos parar realizar un
abono a las cuentas por pagar pendientes con el proveedor **900852956 - Provee
ABS** , este proveedor tiene 2 sucursales para lo cual en **\[ContaPyme\]** se
tiene registrada la cuenta por pagar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal, en este caso activamos la
opción **"Permitir diferentes tipo de documentos y terceros para cada
ingreso"** , De esta manera, se nos activa la columna adicional "Tercero" para
registrar el tercero requerido de cada costo/gasto financiero.



﻿

# Cuenta por pagar

Identificación o referencia de la cuenta por pagar a la cual se va a realizar
el abono.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos.
Para este caso se realiza un abono a la cuota número 2 de la factura
**FC-000140** por valor de $500.000 pesos.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
FC-000140 | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS

En el campo **"Cuenta por pagar"** debe seleccionar la referencia a la cual se
requiere registrar el abono: **FC-000140**.

Observaciones

Para indicar la referencia a la cual va a realizar el abono debe dar doble
clic sobre la columna **"Cuenta por pagar"** o con el comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero, y se podrá visualizar información
como:**La fecha de soporte, la fecha de vencimiento, el saldo actual, entre
otra información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por pagar registrada para el tercero con su saldo, la cuenta de cartera
debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda.
De lo contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**"N/D no definido".**

**Ejemplo:**
Para la cuenta de proveedores no se tiene la configuración **"Maneja y exige
tercero, controla endeudamiento" y "maneja referencia"**.

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura la factura **FC-000140** por valor de $2.500.000
pesos y la factura **FV-000160** por valor de $1.000.000 de pesos.

En este caso las cuentas por pagar para este tercero se muestra de la
siguiente forma:

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
N/D | $3.500.000 | $500.000 | $3.000.000
Si se requiere realizar un abono a la factura **FV-000140** y se necesita
saber cuál es su saldo, no se podrá visualizar ya que el \[ContaPyme\] al
verificar que la cuenta no tiene la configuración de **"Maneja y exige
tercero, controla endeudamiento" y "maneja referencia"** como referencia
asigna la identificación **N/D** , es decir **"No definida"** y como saldo
muestra el total de todas las cuentas por pagar registradas para ese tercero.

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] muestra las cuentas por pagar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono CXP.




Configuración

Para realizar a configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de proveedores, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de proveedores a la que se va
a registrar el abono.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura FC-000140 por una compra de materia prima por valor de $2.500.000
pesos al proveedor 900852956-7 - Provee ABS, y se necesita registrar de que
sede es la cartera.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo | Observaciones
FC-000140 | 1PROV- Pago CXP sede centro | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS

En el campo **"Centro de costos"** debe indicar el identificador del centro de
costo de la cuenta por pagar seleccionada: **1PROV** \- Pago CXP sede centro.

Observaciones

El centro de costos/nodo puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por pagar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda,
Normalmente para que se cruce el abono se indica el mismo centro de costo con
el que se originó la deuda.

Para el manejo de centros de costos la cuenta de proveedores debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)



Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por pagar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Centros de costos\].**



﻿

# Saldo actual

Saldo actual de la cuenta por cobrar seleccionada a la fecha registrada en la
operación.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura de compra FC-000140 por una compra de materia prima por valor de
$2.500.000 pesos al proveedor 900852956-7 - Provee ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $500.000 | $2.000.000

En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por pagar seleccionada en el renglón:**$2.500.000**.

Observaciones

Al seleccionar la cuenta por pagar el sistema trae automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Saldo\].**



﻿

# Valor abono

Valor abonado a la cuenta/cuota por pagar de la referencia seleccionada.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura de compra FC-000140 por una compra de materia prima por valor de
$2.500.000 pesos al proveedor 900852956-7 - Provee ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $500.000 | $2.000.000
En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
pagar selecionada en el renglón:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original por cada tercero y referencia la cuenta
contable debe tener el manejo **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"**.

El valor abonado que se registre para cada cuenta por cobrar se podrá
visualizar en los informes de proveedores.

Configuración

Para realizar a configuración de **"controla endeudamiento" y "maneja
referencia"** a la cuenta de cartera, ver: **\[Pestaña: Contabilidad > Plan de
cuentas > Seleccionar cuenta: Clic derecho modificar > Activar opciones:
"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"\].**



﻿

# Nuevo saldo

Nuevo saldo de la cuenta por pagar después de registrar el valor abonado.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura de compra FC-000140 por una compra de materia prima por valor de
$2.500.000 pesos al proveedor 900852956-7 - Provee Equipos ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $500.000 | $2.000.000

En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por pagar después de registrar el valor abonado por
cada renglón:**$2.000.000**.

Observaciones

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y nos muestra el nuevo saldo con el que quedará la deuda después
de procesar la operación.

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original por cada tercero, por cada referencia y nos
muestre el nuevo saldo, la cuenta contable debe tener configurado de:
**"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"** ,
ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic
derecho modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

El valor del nuevo saldo de las cuentas por pagar se podrá visualizar en los
informes de proveedores.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Nuevo saldo\].**



﻿

# Observaciones

Observaciones sobre la cuenta por pagar que se está cancelando o registrando
un abono.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura FC-000140 por una compra de materia prima por valor de $2.500.000
pesos al proveedor 900852956-7 - Provee ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
FC-000140 | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS

En el campo **"Observaciones"** Se debe indicar la información que requiere
registrar para la cuenta por pagar del renglón:**"Abono a FC-000140 - CxP
\(10/05/2018\) a Provee ABS"**.

Observaciones

Al seleccionar la cuenta por pagar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo el sistema la toma como descripción
de la cuenta por pagar para el documento de impresión y los informes de
proveedores.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Observaciones\].**



# Acerca de ventana

## ABONO A CUENTAS POR PAGAR



## Objetivo

Esta ventana tiene como finalidad el registro de los abonos a cuentas por
pagar que tiene la empresa.

La operación de abonos a cuentas por pagar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente la empresa con un tercero. También
permite en una misma operación realizar abonos a múltiples terceros activando
la opción “Permitir hacer abonos a múltiples terceros”.

En la operación de abonos a cuentas por pagar se podrán detallar los
diferentes costos financieros que se han causado por motivo del crédito, como:
impuestos, intereses y comisiones desde el paso “Detalle de otros costos
financieros”.

Esta operación es de gran ayuda para los usuarios no contadores que conocen la
información básica de la transacción pero no tienen suficientes bases para el
manejo de la contabilidad.

## Ejemplo de información a registrar

Registrar el abono de $600.000 pesos a la cuenta por pagar que se tiene
pendiente con el proveedor ASB LTDA correspondiente a la factura de compra
FC-00256.

La información relevante para registrar el abono a cuentas por pagar es:

  * El tercero al cual se le hará el abono.
  * El código de la cuenta por pagar o referencia a la que se le realizará el abono.
  * Valor a abonar.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de egreso, este tipo de documento se
puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También es necesario identificar la fecha de soporte y el tercero a quien se
está realizando el abono a la cuenta por pagar.

## Registro

Se selecciona la cuenta por pagar a la cual se realizará el abono y el valor
abonado que corresponda por cada renglón.

\[Contapyme\] automáticamente muestra el saldo actual y el nuevo saldo de la
cuenta por pagar a la fecha que tenga la operación y según el valor abonado.

Si no se ha especificado un tercero, el seleccionador presentará todas las
cuentas por pagar a terceros, de tal manera que al seleccionarse una,
automáticamente se llenarán los campos del tercero e identificación de la
cuenta.

## Totales registrados

Muestra los totales del saldo y abonos de las cuentas por pagar registradas en
la operación.

## Detalle de los ingresos financieros

En este paso se puede detallar los diferentes costos financieros que se han
causado por motivo del crédito, como: impuestos, intereses, comisiones, etc.

La información relevante para registrar en este paso es:

  * Centro de costos al cual se le cargará el gasto.
  * Concepto de egresos \(Cuenta\).
  * Valor del gasto financiero.

## Liquidación

Registro de los descuentos, cargos o impuestos causados en el abono a la
cuenta por pagar.

## Forma de pago

Forma como se cancelará el pago del abono a la cuenta por pagar y demás cargos
o descuentos relacionados en esta operación:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXP\).
  * Cruce \(cruce con CXC al tercero\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Impresión de soportes

La operación de abono a cuentas por pagar permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de abono a CxP.
  * Comprobante de egreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Disminuyendo o cancelando la cuenta por pagar al tercero o muchas cuentas por pagar para el caso de cuotas pendientes y un abono que las cubre.
  * Llevando al gasto los costos financieros, si los hay.
  * Procesando los descuentos o cargos.
  * Procesando la forma de pago.





---

### MOV4 -Abono a CxC

#### [14190] FrmDlgOprMov4

﻿

# Vr. otra moneda

Valor abonado en moneda extranjera.

En esta columna se puede especificar el valor del abono equivalente en moneda
extranjera.

Esta columna solamente se habilita para edición, en caso de que la cuenta se
maneje en moneda extranjera y además, la configuración para el manejo de
moneda extranjera permita la edición de este valor.

Observaciones

Normalmente, solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se debería habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
cartera.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Catálogo Plan de Cuentas > Configuración > Configuraciones generales >
Valor de moneda automático\].**



﻿

# Tercero

Corresponde al código o identificación del tercero con el cual se tiene la
cuenta por cobrar y del cual se va a recibir el abono.

Ejemplo

El cliente PC-Madrigal realiza un abono de **$500.000 pesos** a la deuda que
tiene con la factura **FV-000235** por valor de **$1.500.000 pesos** , así que
en el campo **"Tercero"** indique el código o identificación del tercero al
cual se tiene asociada la cuenta por cobrar: **900852956 -PC-Madrigal**

Observaciones

El tercero ya debe estar creado en la base de datos. Al indicar el código o
identificador del tercero, el sistema filtra automáticamente todas las cuentas
por cobrar que ese tercero tenga registradas.

Para que \[ContaPyme\] filtre las cuentas por cobrar que tiene cada tercero,
la cuenta contable debe tener la configuración de **"Maneja y exije tercero,
controla endeudamiento y maneja referencia"**.

ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta la
fecha que tenga configurada la operación de abono a CXC.

También se tiene la posibilidad de realizar abonos a CXC para múltiples
terceros, para ello se debe activar la columna tercero, ver:**\[Operación
Abono CXC > Menú: Opciones > Activar opción: Permitir hacer abonos a múltiples
terceros\].**



﻿

# Referencia

Seleccione el perfil del vendedor o la referencia de castigo y/o bonificación
que requiere aplicar para la comisión del vendedor del recaudo.

Ejemplo



El vendedor: 14856296 - MANUELA RENDON tiene configurado un perfil de
comisiones que le otorga un 5% de comisión por recaudo, pero en algunos
recaudos se otorga una comisión adicional especial del 2% o bajo ciertas
situaciones se tiene que el vendedor pierda el 4% de las comisiones del
recuado.

Perfil del vendedor | Referencia | Aplica a | Tipo de cálculo | % a aplicar | PGR | \[ESPECIAL\] | Recaudos | Aumentar porcentaje comisión en el porcentaje dado.  | 2%
---|---|---|---|---
PGR | \[CASTIGO\] | Recaudos | Disminuir porcentaje comisión en el porcentaje dado. | 4%

Para que al realizar el abono a la cuenta por cobrar se liquide esa comisión
especial debe seleccionar la referencia **\[ESPECIAL\]** , previamente
configurada en el perfil del vendedor, aumentando así la comisión del 5% al
7%.

Observaciones

Un vendedor puede manejar varios perfiles y por medio de este botón se puede
seleccionar que perfil del vendedor y referencia de castigo o bonificación se
va a manejar para la liquidación de comisiones del vendedor en el recaudo.

Después de seleccionar el perfil y la referencia de castigo y/o bonificación
el sistema lo aplicará automáticamente en las comisiones del vendedor de cada
recaudo y se puede visualizar desde el paso de liquidación de comisiones de la
operación.

Configuración

Para definir las referencias de castigos o bonificaciones en el perfil de
vendedor, ver: **\[Pestaña: Básico > Catálogo terceros > Clic derecho:
Catálogos asociados > Perfiles de vendedores > Seleccionar el perfil > Clic
derecho: Modificar > Pestaña: Castigos y/o bonificaciones\].**

Para definir al vendedor los perfiles de vendedor que va a manejar, ver:
**\[Pestaña: Básico > Catálogo terceros > Clic derecho: Catálogos asociados >
Perfiles de vendedores > Seleccionar el perfil > Clic derecho: Modificar >
Pestaña: Castigos y/o bonificaciones\].**



﻿

# Vendedor

Vendedor de la cuenta por cobrar que está recaudando la cartera.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal | Vendedor: 25576890- Patricia Quintero
---|---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Vendedor"** se debe indicar el identificador del tercero
correspondiente del abono.**25576890- Patricia Quintero**.

Observaciones

Este dato se puede incluir en el documento de impresión de la operación.

En los exploradores de cartera se tienen la posibilidad de agregar la columna
vendedor con el que se realizó el abono a cuentas por cobrar.

Si este gana comisiones por recaudo, se calculan y se generan automáticamente
al procesar la operación.

El botón "ref." se puede usar para asignar otro perfil de vendedor y aplicar
referencias que modifiquen el cálculo de comisiones. Para mayor información
[Ver más](<\[300\]GridComisionesRcdo_Col002>)


Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Datos maestros de la operación
> Vendedor\].**



﻿

# Recaudador

Persona responsable de cobrar o recibir el abono.

Ejemplo

Se recibe un abono de **$500.000 pesos** , el abono se debe realizar a la
factura **FV-000235** que realizó el vendedor **Patricia Quintero** al cliente
PC-Madrigal.
Aunque la venta la realizó el vendedor **Patricia Quintero** no es la
responsable del recaudo, el responsable del recaudo es un empleado del área de
cartera: **Carlos Osorio.**

Tercero: 900852956-7 - PC-Madrigal | Vendedor: 25576890- Patricia Quintero | Recaudador: 1054789562- Carlos Osorio
---|---|---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Recaudador"** se debe indicar el identificador del tercero que
realizó el cobro o recaudo de la deuda.**1054789562- Carlos Osorio**.

Observaciones

Existen empresas donde manejan el vendedor de las ventas como responsables de
recaudar la cartera, pero cuando las empresas tienen un departamento de
cartera el responsable de recuadar la cartera no es el mismo que el vendedor
que realiza la venta. En este caso se tiene la posibilidad de indicar el
vendedor de la factura de venta y el responsable de recaudar la cartera.

Si el tercero recaudador gana comisiones por recaudo, se calculan y se generan
automáticamente al procesar la operación.

Este dato se puede incluir en el documento de impresión de la operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Datos maestros de la operación
> Recaudador\].**



﻿

# Fecha de referencia para comisiones

Corresponde a la fecha que se usará para la liquidación de comisiones en
recaudo y la aplicación de castigos que correspondan.

Ejemplo

El vendedor: 14856296 - Manuela Rendon tiene configurado un perfil de
comisiones que le otorga un 5% de comisión por recaudo y un castigo del 1% por
mora en los pagos de 30 días y 2% por mora en los pagos de 60 días en
adelante.

En la empresa para las comisiones en recaudo que se castigan según la fecha de
pago. Se tiene la política para que no se tome la fecha del recibo o del abono
a CXC sino la fecha real en que entro el dinero. Esa fecha se puede configurar
en el campo **"Fecha de referencia para comisiones".**

Observaciones

Por defecto esta fecha es la misma de la operación, pero puede ser modificada
según el criterio del usuario.



﻿

# Total saldos

Valor total del saldo que trae cada una las referencias registradas en la
operación

Ejemplo

Se recibe un abono de una cartera que tiene pendiente el cliente PC-Madrigal,
realizó un abono de $500.000 pesos para la referencia FV-000235 que tiene un
saldo por valor de $1.500.000 pesos y realizó un abono por valor de $300.000
pesos para la referencia FV-000255 que tiene un saldo de $800.000 pesos.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/150.png)

En el campo **"Total saldos"** el sistema muestra el valor total del saldo
actual que trae cada una las referencias registradas en la
operación:**$2.300.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Total abonos

Valor total de los abonos realizados a cada una de las referencias registradas
en al operación.

Ejemplo

Se realiza un abono de unas cuentas por pagar que tiene pendiente el cliente
PC-Madrigal, realizó un abono de $500.000 pesos para la referencia FV-000235
que tiene un saldo por valor de $1.500.000 pesos y realizó un abono por valor
de $300.000 pesos para la referencia FV-000315 que tiene un saldo de $800 000
pesos.

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/160.png)

En el campo **"Total abonos"** el sistema muestra el valor total de los abonos
realizados en cada una las referencias registradas en la
operación:**$800.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Cód. deuda

Si el abono a la cuenta por cobrar genera impuestos, intereses, comisiones,
etc., se debe seleccionar la referencia de la cuenta por cobrar a la cual
quedarán asignados estos costos financieros.

Aquí también se pueden registrar los descuentos financieros condicionados, es
decir, los que dependen del cumplimiento con que se hagan los abonos.

Ejemplo



Se recibe un abono de $600.000 pesos, el abono se debe registrar a las
referencias FV-000235 y FV-000243, para la cual se requiere registrar el
descuento por pronto pago del abono realizado a la factura FV-000243.

En este caso en el campo "Cód. deuda" se indica la referencia FV-000243 para
que el registro del descuento por pronto pago quede registrado a la referencia
correspondiente.

Observaciones

En este campo se cargan automáticamente las referencias registradas en el
primer paso de la operación.

Este dato se puede visualizar en el explorador de contabilidad.



﻿

# Concepto de pago

Corresponde a la cuenta o concepto del ingreso financiero, a la cual se
realiza la imputación contable.

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235 para la cual se requiere registrar los intereses
financieros que corresponden al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Intereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta a la cual se va a registrar el ingreso financiero.**421005- Intereses**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de ingresos.

Se pueden registrar tantos conceptos de ingresos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

El concepto de pago que se registre se verá reflejado en el documento de
impresión de la operación.

Si se indica un detalle y observación en el renglón, este reemplazará el
nombre del concepto \(Nombre de la cuenta\) por el detalle registrado en la
impresión del documento.



﻿

# Cód. Tercero

Identificación del tercero con el cual se va a registrar el abono por cada
renglón.

Ejemplo

Se recibe un cheque por valor de **$1.000.000** de pesos de la empresa **PC-
Madrigal** que consolida el pago de 2 facturas. Este cliente tiene 2
sucursales para lo cual en \[ContaPyme\] se tiene registrada la cuenta por
cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de
**$400.000** pesos para la factura **FV-000300** de la sucursal de Pereira, y
se realizó un abono de **$600.000** pesos para la factura **FV-000235** de la
sucursal de Manizales.

Se activa la opción **"Permitir hacer abonos a múltiples terceros"** para
realiza el registro de este abono. De esta manera, se nos activa la columna
adicional **"Tercero"** para registrar el tercero requerido de cada
referencia.

Cód. tercero | Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
---|---|---|---|---
900852956-7/PER - PC-Madrigal sede Pereira | FV-000300 | $800.000 | $400.000 | $400.000
900852956-7/MAN - PC-Madrigal sede Manizales | FV-000235 | $1.500.000 | $600.000 | $900.000
En el campo**"Código tercero"** se debe indicar el identificador del tercero
con el cual se va a registrar el abono en cada renglón: **900852956-7/MAN -
PC-Madrigal sede Manizales.**

Observaciones

Para seleccionar el tercero puede dar doble clic en la columna **"Tercero"** o
con el comando **F5**.

El tercero ya debe estar creado en el catálogo de terceros.

Para que \[ContaPyme\] muestre en el seleccionador las cuentas por cobrar que
tiene cada tercero, la cuenta de cartera debe tener la configuración de
**"Maneja y exige tercero, controla endeudamiento y maneja referencia"**.

\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono a CXC.

Para visualizar y cargar el abono a las cuentas por cobrar del tercero la
operación donde se registró la deuda debe estar procesada.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)




﻿

# CC. a cargar

Código del Centro de costos al que se le carga el ingreso financiero de cada
renglón

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235 para la cual se requiere registrar los intereses
financieros.

Para estos movimientos se tienen creado un centro de costos para el manejo de
los intereses de cartera.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Itereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Cc. a cargar"** se debe indicar el identificador del centro de
costos a la cual se va a registrar el ingreso financiero.**INT- Itereses
cartera**

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

Este dato se puede incluir en el documento de impresión de la operación.



﻿

# Valor

Aquí se debe indicar el valor que corresponde por el concepto del ingreso
financiero que se está registrando.

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235, para la cual se requiere registrar los intereses
financieros que corresponden al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Itereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Valor"** se debe indicar el valor que corresponde por el
concepto del ingreso financiero que se está registrando por cada
renglón:**$10.000 pesos**

Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.




﻿

# Concepto de ingresos

Permite especificar una descripción u observación corta para el registro del
ingreso que se está realizando.

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235 para la cual se requiere registrar los intereses
financieros que corresponden al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Itereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Detalle"** se puede indicar una descripción u observación que
requiera para el ingreso financiero registrado para cada renglón:**Intereses
del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.**

Observaciones

Esta información se podrá visualizar como descripción, en la impresión del
documento, de lo contrario, muestra el nombre de la cuenta que se este
registrando.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
costos finan. > Detalle\].**



﻿

# Tipo de documento

Identificador del tipo de documento de soporte con el cual se requiere
soportar la transacción.

Ejemplo

Se recibe un abono de $100.000.000 pesos de la empresa PC-Madrigal, Este
cliente tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene registrada
la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura FV-000235 de la sucursal de Manizales, y se realizó un
abono de $600.000 pesos para la factura FV-000300 de la sucursal de Pereira.

Para el registro de los intereses financieros, se requiere detallar el interés
del abono que se realizó para cada tercero y número de factura, en este caso
activamos la opción **"Permitir diferentes tipo de documentos y terceros para
cada ingreso"** , De esta manera, registrar los tipos de documento de soporte
y el número de documento o referencia requerida para cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 10- Factura de venta | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 10- Factura de venta | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Tipo de documento"** debe indicar la identificación del
documento de soporte con el que requiere soportar cada ingreso financiero
registrado: 10- Factura de venta

Observaciones

\[ContaPyme\] tiene pre-configurados múltiples documentos de soporte, para
seleccionar el indicado basta con dar doble clic sobre el campo o usar la
tecla F3.



﻿

# Número documento

Número del documento de soporte con el que requiere soportar los ingresos
financieros de cada renglón.

Ejemplo

Se recibe un abono de **$100.000.000 pesos** de la empresa PC-Madrigal, Este
cliente tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene registrada
la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura **FV-000235** de la sucursal de Manizales, y se realizó
un abono de $600.000 pesos para la factura **FV-000300** de la sucursal de
Pereira.

Para el registro de los intereses financieros, se requiere detallar el interés
del abono que se realizó para cada tercero y número de factura, en este caso
activamos la opción **"Permitir diferentes tipo de documentos y terceros para
cada ingreso"** , De esta manera, registrar el tercero, fecha de soporte y el
número de documento o referencia requerida para cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 10- Factura de venta | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 10- Factura de venta | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Documento"** debe indicar la referencia o número del documento
de soporte que sustenta cada ingreso financiero registrado, de esta manera,
por medio de los informes se podrá consultar el interés registrado por cada
factura.




﻿

# Fecha

Específique la fecha de soporte para la contabilización por renglón de cada
registro.

Ejemplo



Se recibe un abono de **$1.000.000 pesos** de la empresa **PC-Madrigal** ,
Este cliente tiene 2 sucursales para lo cual en **\[ContaPyme\]** se tiene
registrada la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de **$400.000
pesos** para la factura **FV-000235** de la sucursal de Manizales, y se
realizó un abono de **$600.000 pesos** para la factura **FV-000300** de la
sucursal de Pereira.

Para el registro de los intereses financieros, se requiere detallar el interés
del abono que se realizó para cada tercero y número de factura, en este caso
activamos la opción**"Permitir diferentes tipo de documentos y terceros para
cada ingreso"** , De esta manera, registrar el tercero, fecha de soporte y el
número de documento o referencia requerida para cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 10- Factura de venta | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 10- Factura de venta | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Fecha"** debe indicar la fecha de soporte con la cual requiere
registrar cada ingreso financiero registrado.

Observaciones

La fecha debe estar dentro del mismo mes que la fecha de soporte de la
operación de abono a CXC.



﻿

# Tercero

Código o identificación del tercero con el cual se registra el ingreso
financiero por cada renglón.

Ejemplo

Se recibe un abono de **$1.000.000** de pesos de la empresa PC-Madrigal, Este
cliente tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene registrada
la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura **FV-000235** de la sucursal de Manizales, y se realizó
un abono de $600.000 pesos para la factura **FV-000300** de la sucursal de
Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero, en este caso activamos la opción
**"Permitir diferentes tipo de documentos y terceros para cada ingreso"** , De
esta manera, se nos activa la columna adicional **"Tercero"** para registrar
el tercero requerido en cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 130- Comprobante de ingreso | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 130- Comprobante de ingreso | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Tercero"** debe indicar la identificación del tercero que
corresponde para cada ingreso financiero registrado.

Observaciones

Si alguna cuenta de las registradas en la lista de "Detalle de los ingresos
financieros" está marcada para exigir tercero, el dato "Tercero" será
obligatorio.



﻿

# Permitir diferentes tipo de documentos y terceros para cada ingreso

Al activar esta opción, se visualizarán las columnas adicionales que
permitirán asignar un tipo de documento, número de documento, fecha y tercero
distinto para cada renglón.

Ejemplo

Se recibe un abono de 1 millón de la empresa PC-Madrigal, este cliente tiene 2
sucursales para lo cual en \[ContaPyme\] se tiene registrada la cuenta por
cobrar de cada sucursal.

El abono se registró de la siguiente manera: se realizó un abono de $400.000
pesos para la factura FV-000235 de la sucursal de Manizales, y se realizó un
abono de $600.000 pesos para la factura FV-000300 de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero y referencia, en este caso
activamos la opción **"Permitir diferentes tipos de documentos y terceros para
cada ingreso"** , de esta manera, se activan las columnas adicionales de:
**tipo de documento, número de documento, fecha y tercero** para cada renglón
y así registrar el tercero y referencia requerida para cada ingreso
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Intereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 130- Comprobante de ingreso | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Intereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 130- Comprobante de ingreso | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira


Observaciones

En este caso, la fecha debe estar dentro del mismo mes que la fecha de soporte
de la operación.

Al momento de procesar la operación la información de otros ingresos
financieros quedará registrada con los datos que se indiquen en cada una de
las columnas y se podrá visualizar en los exploradores e informes contables.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)

**NOTA:** Esta opción se habilitará automáticamente en caso de que este
habilitado el manejo de intereses para CxC.
Para habilitar el manejo de intereses diríjase a **\[ Módulo de cartera >
Configuración > Asistente de configuración del módulo de cartera y proveedores
> Habilitar manejo de intereses \]**



﻿

# Ref. \#

Referencia del crédito o número de factura a la cual se está abonando.

Ejemplo

El vendedor 14856296 - Manuela Rendón realiza un recaudo de 2 facturas de
venta, en el campo "Ref. \#" se muestra el número de referencia o número de la
factura para la cual se está realizando el abono y se está aplicando la
comisión para el vendedor.

![300.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/300.png)



﻿

# Cuenta por cobrar

Identificación o referencia de la cuenta por cobrar a la cual se va a
registrar el abono.

Ejemplo

El cliente **900852956 - PC-Madrigal** tiene 2 facturas pendientes por pagar,
la factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $800.000 pesos.

Para este caso el cliente se realiza un abono a la cuota número 2 de la
factura **FV-000235** por valor de $500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000
En el campo **"Cuenta por cobrar"** debe seleccionar la referencia a la cual
se requiere registrar el abono: **FV-000235**.

Observaciones

Para indicar la referencia a la cual va a realizar el abono debe dar doble
clic sobre la columna **"Cuenta por cobrar"** o con el comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero, y se podrá visualizar información
como:**La fecha de soporte, la fecha de vencimiento, el saldo actual, entre
otra información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por cobrar registrada para el tercero con su saldo, la cuenta de
cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda.

De lo contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**"N/D no definido".**
**Ejemplo:**
Para la cuenta de cartera no se tiene la configuración **"Maneja y exige
tercero, controla endeudamiento" y "maneja referencia"**.

El cliente **900852956-7 - PC-Madrigal** tiene 2 facturas pendientes por
pagar, la factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $800.000 pesos.

En este caso las cuentas por cobrar para este tercero se muestra de la
siguiente forma:

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
N/D | $2.300.000 | $500.000 | $1.800.000
Si el cliente requiere realizar un abono a la factura **FV-000235** y se
necesita saber cuál es su saldo, no se podrá visualizar ya que el
\[ContaPyme\] al verificar que la cuenta no tiene la configuración de
**"Maneja y exige tercero, controla endeudamiento" y "maneja referencia"**
como referencia asigna la identificación **N/D** , es decir **"No definida"**
y como saldo muestra el total de todas las cuentas por cobrar registradas para
ese tercero.

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono CXC.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Perfil vendedor

Código de identificación del perfil de comisión asignado al vendedor
relacionado en esta operación.

El perfil del vendedor define las especificaciones para el cálculo de
comisiones por venta y/o recaudo.

Ejemplo

La empresa Tecnología y Espacios tiene establecidos los siguientes perfiles
para vendedores:

Código Perfil | Nombre Perfil | Comisión por venta | Comisión por recaudo | PGR | Comisión por recaudo |  | 5%
---|---|---|---
PGV | Comisión por venta al por mayor | 3% |

Al vendedor **14856296- Manuela Rendon** se le ha asignado el perfil:**PGR -
Comisión por recaudo**. Por tanto, al momento de realizar el abono a cuentas
por cobrar el sistema indicará como "Perfil vendedor" el identificador:
**PGR**.

![310.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/310.png)



Observaciones

Un vendedor puede tener asignados diferentes perfiles de vendedores.

El perfil del vendedor debe estar previamente configurado en el catálogo de
perfiles de vendedores, ver: **\[Pestaña: Básico > Catálogo de terceros > Clic
derecho: Catálogos asociados > Perfiles de vendedores\].**

Para asignar a un tercero un perfil de vendedor, ver: **\[Pestaña: Básico >
Catálogo de terceros > Seleccionar tercero > Pestaña: Datos vendedor\].**

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Número de autorización

Número de autorización con la cual se asignó al vendedor el perfil de vendedor
relacionado en esta operación.

Ejemplo

La empresa Tecnología y Espacios cuenta con dos vendedores, que tienen
asignados los siguientes perfiles:

Identificación vendedor | Nombre vendedor | Autorización | Perfil | 75098562 | Rogelio Duque | A-15300 | PGV
---|---|---|---
14856296 | Manuela Rendon | A-1051 | PGR

Al momento de realizar la liquidación de comisiones en el recaudo para el
vendedor: 14856296 - Manuela Rendon, el sistema indicará como "Perfil
vendedor" el identificador: **PGR** y "No. Autorización": **A-1051**.

![320.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/320.png)



﻿

# Cód. vendedor

Código de identificación del tercero \(vendedor\) al que se liquidará la
comisión por recaudo.

Ejemplo

Si el vendedor del recaudo es el tercero: 14856296 - Manuela Rendon. En la
liquidación de comisiones, en el campo "Código vendedor" el sistema indicará
el código: **14856296**.

![330.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/330.png)



﻿

# Tipo vend.

Tipo de vendedor \(Principal/Asociado\).

El vendedor principal es quien participa del proceso de venta y/o recaudo y a
quien se liquida la comisión inicialmente.

El vendedor asociado es quien gana comisión por la venta y/o recaudo realizado
por otros vendedores.

Ejemplo

![340.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/340.png)

Observaciones

Los vendedores asociados se configuran en el perfil del vendedor, ver:
**\[Pestaña: Básico > Catálogo de terceros > Clic derecho: Catálogos asociados
> Perfiles de vendedores\].**



﻿

# Centro de costos

Código del centro de costos de donde se cargará el gasto por la comisión del
vendedor.

Este centro de costos se encuentra configurado en los datos del vendedor al
momento de la asignación del perfil de comisiones.

Ejemplo



La empresa Tecnología y Espacios cuenta con dos vendedores, que tienen
asignados los siguientes perfiles:

Identificación vendedor | Nombre vendedor | Autorización | Perfil | Centro de costos | 75098562 | Rogelio Duque | A-1530 | PGV | 110 - Ventas Especiales
---|---|---|---|---
14856296 | Manuela Rendon | A-1050 | PGR | 130 - Departamento de recaudo

Al momento de realizar la liquidación de comisiones en el recaudo para el
vendedor: 14856296 - Manuela Rendon, el sistema indicará como "Centro de
costos" el identificador: **130**.

![350.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/350.png)

Configuración



Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Vr. abonado

Valor abonado por cada referencia registrada en la operación.


Ejemplo



Se realiza un recaudo de la siguiente factura de venta FV-00247

Cliente: 75654153- Andrea Martinez | Vendedor: 14856296- Manuela Rendon
---|---
Referencia | Descripción  | Valor abonado | Nuevo saldo
FV-00247 | Cuenta de cartera FV-00247 | $ 400.000 | $ 459.660

  * **Valor abonado: $400.000**

![360.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/360.png)

Observaciones



Para configurar la base para el cálculo de comisiones, ver: **\[Pestaña:
Básico > Catálogo de terceros > Clic derecho: Catálogos asociados > Perfiles
de vendedores\].**



﻿

# Vr. abono priorit.

Valor prioritario que debe abonarse antes de obtener la base de comisiones.

Si la base para el cálculo de comisiones en recaudo es **"Abono
comisionable"** , el abono prioritario se debe saldar primero antes de
calcular las comisiones en recaudo.

El **Valor abono prioritario** es el valor pendiente por pagar de los
elementos de inventario que no generan comisión a vendedores, los impuestos
cobrados al cliente y los ingresos adicionales \(Fletes\) de la factura.

Ejemplo

Se realiza la siguiente factura de venta:

FACTURA No. FV-00247
---
Elemento | Cantidad | Valor unitario | Valor total | DPC-002 - Impresora Inyección de tinta | 3 unid | $ 238.000 | $ 714.000

|  | Facturado sin impuestos | $ 714.000
---|---|---|---
|  | IVA | $ 135.660
|  | FLETES | $10.000
|  | Facturado con impuestos | $ 859.660


Se realiza un recaudo de la factura de venta anterior FV-00247

Cliente: 75654153- Andrea Martinez | Vendedor: 14856296- Manuela Rendon
---|---
Referencia | Descripción  | Valor abonado | Nuevo saldo
FV-00247 | Cuenta de cartera FV-00247 | $ 400.000 | $ 459.660

Según los anteriores datos el valor abono prioritario podría ser:

  * **Valor abono prioritario** : $145.660
Valor flete - Valor IVA: \($ 135.660 + $10.000 \)


  * Cuando el valor base de comisión es **"Abono comisionable"** , \[ContaPyme\] le resta al valor abonado, el valor prioritario para asignar la base para la comisión del vendedor.
**Abono comisionable** : $254.340
Valor abono - Abono prioritario: \($400.000 - \($ 135.660 + $10.000 \)\)


![370.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/370.png)



Observaciones

Si el valor abonado por el cliente en un momento dado no supera el valor del
abono prioritario, simplemente disminuye el abono prioritario que se tendrán
en cuenta para el siguiente recaudo.

Para configurar la base para el cálculo de comisiones, ver: **\[Pestaña:
Básico > Catálogo de terceros > Clic derecho: Catálogos asociados > Perfiles
de vendedores\].**

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Vr. base comisiones

Valor base sobre la cual se liquida la comisión al vendedor.

El valor base de comisiones depende de la configuración del perfil del
vendedor, que puede ser:

  * **Total abonado:** Valor total de abono
  * **Abono comisionable:** Es la resta del valor total abonado y el **valor no comisionable** que no ha sido cancelado, es decir, el abono cubrirá prioritariamente el valor no comisionable de la factura; una vez esté saldado dicho valor, se calcula la base comisionable del abono.

**Valor no comisionable:** Es el valor total de la factura menos los productos
que no generan comisión a vendedores, los impuestos y los ingresos adicionales
a la factura \(Fletes\). Tenga en cuenta que los ingresos adicionales a la
factura \(Flete\) no se manejan como un elemento de inventario, por lo tanto,
no se tendrá en cuenta para la comisión del vendedor

Sobre el valor base de comisiones se aplica el % de comisión respectivo.

Ejemplo

Se realiza la siguiente factura de venta:

FACTURA No. FV-00247
---
Elemento | Cantidad | Valor unitario | Valor total | DPC-002 - Impresora Inyección de tinta | 3 unid | $ 238.000 | $ 714.000

|  | Facturado sin impuestos | $ 714.000
---|---|---|---
|  | IVA | $ 135.660
|  | FLETES | $10.000
|  | Facturado con impuestos | $ 859.660


Se realiza un recaudo de la factura de venta anterior FV-00247:

Cliente: 75654153- Andrea Martinez | Vendedor: 14856296- Manuela Rendon
---|---
Referencia | Descripción  | Valor abonado | Nuevo saldo
FV-00247 | Cuenta de cartera FV-00247 | $ 400.000 | $ 459.660

Según los anteriores datos el valor base de comisiones podría ser:

  * **Total abonado** : $400.000
  * **Abono comisionable** : $254.340
\($400.000 - \($ 135.660 + $10.000 \)\)

![380.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/380.png)



Observaciones

Para configurar la base para el cálculo de comisiones, ver: **\[Pestaña:
Básico > Catálogo de terceros > Clic derecho: Catálogos asociados > Perfiles
de vendedores\].**



﻿

# Recaudo % Comisión

Porcentaje de comisión por recaudo que se liquida para el vendedor.

Ejemplo

Si el perfil del vendedor tiene configurado el **5%** de comisión por recaudo.
Al momento de realizar el abono a cuentas por cobrar, en el campo **"Recaudo %
Comisión"** , el sistema indicará: **5%**.

![390.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/390.png)

Observaciones

El % comisión por recaudo se encuentra definido en el perfil del vendedor de
la operación de abono CXC.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# % Castigo

Porcentaje de castigo que se aplica a la comisión por recaudo según la edad
del recaudo.

Cuando se establecen comisiones por recaudo, también es posible definir si la
comisión se va a castigar por la edad del recaudo.

La edad del recaudo se puede calcular basado en:

  * Basado en la fecha de facturación
  * Basado en la fecha de pago

Una vez establecido en que tipo de fecha se calculará la edad del recaudo, se
debe indicar el porcentaje de castigo para cada edad \(en días\).

Ejemplo

El vendedor: 14856296 - Manuela Rendón tiene configurado un perfil de
comisiones que le otorga un 5% de comisión por recaudo y se tiene configurado
los porcentajes de castigos según la edad del recaudo como se muestra en la
siguiente tabla:

Edad | % de castigo | Descripción
---|---|---
15 a 29 días | 10% | Recaudo entre los 15 y los 29 días de edad tendrán un castigo del 10% de la comisión.
30 a 59 días | 30% | Recaudo entre los 30 y los 59 días de edad tendrán un castigo del 30% de la comisión.
60 días en adelante | 100% | Recaudos posteriores a los 60 días de edad tendrán un castigo del 100% de la comisión.

Si el vendedor obtiene una comisión por recuado por ejemplo de $12.717, el
recaudo se realiza entre los 30 y 59 días de edad, en este caso la comisión se
disminuye en un 30%, es decir, la comisión queda en $8.901,9.

![400.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/400.png)

Observaciones

Los castigos de comisión por edades para el recuado se definen en el perfil de
vendedor, ver: **\[Pestaña: Básico > Catálogo terceros > Clic derecho:
Catálogos asociados > Perfiles de vendedores > Clic derceho sobre el perfil >
Pestaña: Castigos y/o bonificaciones\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera a la que se va a
registrar el abono.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | 1VEC- Cartera sede centro | $1.500.000 | $500.000 | $1.000.000

En el campo **"Centro de costos"** debe indicar el identificador del centro de
costo de la cuenta por cobrar seleccionada: **1VEC- Cartera sede centro**.

Observaciones

El centro de costos/nodo puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por cobrar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda,
normalmente para que se cruce el abono se indica el mismo centro de costo con
el que se originó la deuda.

Para el manejo de centros de costos la cuenta de cartera debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Centros de costos\].**



﻿

# Vr. Comisión

Valor de comisión por recaudo que se liquida para el vendedor en los abonos a
cuentas por cobrar.

El valor de la comisión se calcula automáticamente multiplicando el % comisión
por el valor base de comisiones.

Ejemplo

Se realiza un recuado donde el valor base de comisiones es : **$ 254.340** y
el % comisión en venta es: **5%** ; el "Vr. Comisión" calculado por el sistema
es de: **$ 12.717**

![410.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/410.png)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Referencias

Identificador de la referencia que modifica el cálculo de la comisión en el
abono.

Ejemplo

El vendedor: 14856296 Manuela Rendón tiene configurado un perfil de comisiones
que le otorga un 5% de comisión por recaudo, pero en algunos recaudos se
otorga una comisión adicional especial del 3%.

Para que al realizar el recaudo se liquide esa comisión especial debe
indicarse la referencia \[ESPECIAL\], previamente configurada en el perfil del
vendedor, aumentando el valor de la comisión al porcentaje dado del 3 %.

Como podemos visualizar en la imagen el valor de la comisión en venta es de
**$ 20.347,2** = \($ 254.340 \* 5%\) + \($ 254.340 \* 3%\) y en el detalle se
especifica el aumento del 3% al valor de la comisión.

![420.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/420.png)



Observaciones

Las referencias se definen en el perfil de vendedor, ver: **\[Pestaña: Básico
> Catálogo terceros > Clic derecho: Catálogos asociados > Perfiles de
vendedores > Clic derecho sobre el perfil > Pestaña: Castigos y/o
bonificaciones\].**

El manejo de referencias no afecta el % de comisión definido en el perfil del
vendedor, pero si afecta el valor de la comisión calculada.



﻿

# Detalle

Descripción resumida de la forma de cálculo de la comisión

Ejemplo

En el abono a cuentas por cobrar se liquidó al vendedor una comisión por
recaudo del 5% y una comisión adicional del 2% por ser una recaudo especial.
Por tanto, en el detalle de la comisión se indica una descripción de la
comisión.

![430.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/430.png)



﻿

# Total comisión por recaudo

Valor total de las comisiones en recaudo liquidadas en el abono a cuentas por
cobrar.

Ejemplo

![440.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/440.png)

Observaciones

El valor de las comisiones en el abono a cuentas por cobrar se debita de la
cuenta del gasto y se acredita a la cuenta por pagar configurada en el perfil
del vendedor.

Configuración

Para consultar el perfil del vendedor, ver: **\[Pestaña: Básico > Catálogo
terceros > Clic derecho: Catálogos asociados > Perfiles de vendedores \].**



﻿

# Cargar todas las cuentas

Carga todas las cuentas por cobrar pendientes para el tercero seleccionado.

Ejemplo

El cliente 900852956-7 - PC-Madrigal tiene 2 facturas pendientes por pagar, la
factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $500.000 pesos, el cliente emite un cheque por
**$2.000.0000 de pesos** para cancelar todas las cuentas que tiene pendientes
por pagar.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por cobrar registradas para el tercero seleccionado.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000400 | $500.000 | $500.000 |
FV-000235 | $1.500.000 | $1.500.000 |



Observaciones

Este botón carga por defecto todas las cuentas por pagar pendientes con el
tercero seleccionado a la fecha que tienen la operación de abono a CXP.





﻿

# Abonar monto

Permite abonar un monto dado a las cuentas por cobrar del tercero.

Ejemplo

El cliente 900852956-7 - PC-Madrigal tiene 2 facturas pendientes por pagar, la
factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $500.000 pesos, el cliente gira un cheque por
$1000.0000 de pesos para abonar a todas las cuentas por cobrar que tiene
pendientes.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por cobrar registradas para el tercero seleccionado.

Luego, se da clic en el botón **"Abonar monto"** Para indicar el valor de
**$1.000.000 de pesos** que está abonando el cliente a sus facturas.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000400 | $500.000 | $500.000 |
FV-000235 | $1.500.000 | $500.000 | $1.000.000

Observaciones

El monto dado en la opción **"Abonar monto"** , \[ContaPyme\] reparte de forma
equitativa el valor abonando para cada referencia seleccionada en la
operación. Para este caso asigno el valor de **$500.000 pesos** en la columna
**"Valor abono"** para cada una de las referencias seleccionadas.



﻿

# Abono parcial a un crédito

Este asistente permite realizar el abono de un monto indicado teniendo en
cuenta capital e intereses del crédito, siendo estos últimos tomados como
abono prioritario.
La diferencia principal con realizar un abono directamente sobre el listado,
es que este abono primero se realiza sobre el capital y luego se calculan los
intereses que se deben pagar hasta la fecha.

Ejemplo

El cliente 900852956-7 - PC-Madrigal tiene un crédito por $1.000.000 a un
interés de 1%, el cual fue financiado a tres cuotas de aproximadamente
$340.000 mensuales, de los cuales ya realizó el pago de su primera cuota.

\# Cuota | Saldo actual | Abono a capital | Intereses | Valor cuota
---|---|---|---|---
1 | $1.00.000 | $330.022 | $10.000 | $340.022
2 | $669.978 | $333.322 | $6.700 | $340.022
3 | $336.655 | $336.655 | $3.366 | $340.022

El cliente recibe un dinero adicional y desea hacer un abono parcial al
crédito por un monto de **$200.000**. Supongamos que a la fecha del abono ya
se debía **$2.500** de intereses, por lo tanto el abono se comportaría de al
siguiente manera:

| Abono sin asistente | Abono con asistente
---|---|---
Abono a capital | $200.000 | $197.500
Abono a intereses | $2.500 | $2.500
Total abono | $202.500 | $200.000

Observaciones

Este asistente permite realizar un abono parcial a un crédito que maneje
intereses corrientes y que no tenga beneficio por pago anticipado.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

El cliente 900852956 - PC-Madrigal tiene 2 facturas pendientes por pagar, la
factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $800.000 pesos.

Para este caso el cliente se realiza un abono a la cuota número 2 de la
factura **FV-000235** por valor de $500.000 pesos.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el abono puede clic el botón **"Visualizar el documento impreso"**
, y el sistema le muestra una vista previa del documento con toda su
información.

.
![470.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/470.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Saldo actual

Saldo actual de la cuenta por cobrar seleccionada a la fecha registrada en la
operación.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000
En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por cobrar seleccionada en el renglón:**$1.500.000**.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.

Al seleccionar la cuenta por cobrar el sistema trae automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación de abono.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Saldo\].**



﻿

# Auto-calcular comisiones

Esta opción permite el cálculo automático de las comisiones por recaudo que
apliquen para el vendedor especificado en el abono a cuentas por cobrar.

La opción se encuentra activa por defecto, impidiendo la modificación del
cálculo de comisiones indicado.

Cuando se desactiva esta opción es posible la modificación manual de la
liquidación realizada y se activa la opción " Calcular comisiones".

Observaciones

Para modificar las comisiones liquidadas en la operación de abono a cuentas
por cobrar, se debe activar la opción en el perfil de seguridad del usuario,
ver: **\[Pestaña: Básico > Catálogo de perfiles de seguridad para clientes
desktop > Clic derecho sobre el perfil: Modificar > Módulo: Inventarios,
compras y facturación > Opciones > Sistema de liquidación de comisiones\].**



﻿

# Calcular comisiones

Esta opción permite que el sistema realice el cálculo de las comisiones por
recaudo que apliquen para el vendedor especificado en el abono a cuentas por
cobrar.
La opción se puede usar cuando se desactiva la opción "Auto-calcular
comisiones" y permite la modificación manual de la liquidación realizada por
el sistema.

Observaciones

Para modificar las comisiones liquidadas en la operación de abono a cuentas
por cobrar, se debe activar la opción en el perfil de seguridad del usuario,
ver: **\[Pestaña: Básico > Catálogo de perfiles de seguridad para clientes
desktop > Clic derecho sobre el perfil: Modificar > Módulo: Inventarios,
compras y facturación > Opciones > Sistema de liquidación de comisiones\].**



﻿

# Vendedor

Vendedor de la cuenta por cobrar que está recaudando la cartera.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal | Vendedor: 25576890- Patricia Quintero
---|---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Vendedor"** se debe indicar el identificador del tercero
correspondiente del abono.**25576890- Patricia Quintero**.

Observaciones

Este dato se puede incluir en el documento de impresión de la operación.

En los exploradores de cartera se tienen la posibilidad de agregar la columna
vendedor con el que se realizó el abono a cuentas por cobrar.

Si este gana comisiones por recaudo, se calculan y se generan automáticamente
al procesar la operación.

El botón "ref." se puede usar para asignar otro perfil de vendedor y aplicar
referencias que modifiquen el cálculo de comisiones. Para mayor información
[Ver más](<\[300\]GridComisionesRcdo_Col002>)


Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Datos maestros de la operación
> Vendedor\].**



﻿

# Permite hacer abonos mayores a los saldos

Active esta opción si requiere realizar un abono mayor al saldo de la
referencia registrada en la operación.

Ejemplo

Se tiene pendiente una cuenta por cobrar con el cliente 900852956 - PC-
Madrigal de la factura FV-000235 por valor de 180.000 pesos, el cliente
realiza un abono a la factura por valor de $200.000 pesos.

Como el valor del abono es mayor al saldo de la cuenta por cobrar se activa la
opción **"Permite hacer abonos mayores a los saldos"**.

Al procesar la operación quedarían registrados los $20.000 pesos sobrantes en
negativo para la cuenta por cobrar seleccionada en la operación, para luego
poder realizar un cruce entre cuentas por ejemplo contra la cuenta de
efectivo.

Observaciones

Este dato se puede consultar en los informes de cartera y proveedores.



﻿

# Permite hacer abonos a múltiples terceros

Active esta opción si requiere registrar abonos a diferentes terceros en el
mismo comprobante.

Ejemplo

Se recibe un cheque por valor de $1.000.000 de pesos de la empresa **PC-
Madrigal** que consolida el pago de 2 facturas, Este cliente tiene 2
sucursales para lo cual en **\[ContaPyme\]** se tiene registrada la cuenta por
cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura **FV-000300** de la sucursal de **Pereira** , y se
realizó un abono de $600.000 pesos para la factura **FV-000235** de la
sucursal de **Manizales.**

Se activa la opción **"Permitir hacer abonos a múltiples terceros"** para
realiza el registro de este abono. De esta manera, se nos activa la columna
adicional **"Tercero"** y así registrar el tercero de la sucursal requerido de
cada referencia.



﻿

# Valor abono

Valor abonado a la cuenta por cobrar seleccionada.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000
En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
cobrar selecionada:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original por cada tercero y referencia la cuenta
contable debe tener el manejo **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"**.

El valor abonado que se registre para cada cuenta por cobrar se podrá
visualizar en los informes de cartera.

Configuración

Para realizar la configuración de **"controla endeudamiento" y "maneja
referencia"** a la cuenta de cartera, ver: **\[Pestaña: Contabilidad > Plan de
cuentas > Seleccionar cuenta: Clic derecho modificar > Activar opciones:
"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"\].**



﻿

# Nuevo saldo

Nuevo saldo de la cuenta por cobrar después de registrar el valor abonado.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por cobrar después de registrar el valor abonado por
cada renglón:**$1.000.000**.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y nos muestra el nuevo saldo con el que quedará la deuda después
de procesar la operación.
Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original por cada tercero, por cada referencia y nos
muestre el nuevo saldo, la cuenta contable debe tener la configuración de:
**"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"** ,
ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic
derecho modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

El valor del nuevo saldo de las cuentas por cobrar se podrá visualizar en los
informes de cartera.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Nuevo saldo\].**



﻿

# Cód. vendedor

Tercero responsable con el que se registró inicialmente la cuenta por cobrar.

Ejemplo

Se recibe un abono de **$500.000 pesos** , el abono se debe realizar a la
factura **FV-000235** que realizó el vendedor **Patricia Quintero** al cliente
PC-Madrigal.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Código vendedor
FV-000235 | $1.500.000 | $500.000 | $1.000.000 | 25576890- Patricia Quintero
En el campo **"Código vendedor"** el sistema muestra el identificador del
vendedor con el que se registró inicialmente la cuenta por cobrar: **25576890-
Patricia Quintero.**

Observaciones

El sistema trae de forma automática el tercero vendedor con el que
inicialmente se registró la cuenta por cobrar, en caso de que el tercero que
recaudo la cartera sea diferente al tercero vendedor que realizo la factura,
se puede indicar el tercero en el campo **"Recaudador"** que se encuentra en
la parte superior.

Este dato se puede incluir en el documento de impresión de la operación.

Si éste gana comisiones por recaudo, se calculan y se generan automáticamente
al procesar la operación.

Este campo es informativo, no puede ser modificado por el usuario.



﻿

# Observaciones

Observaciones sobre la cuenta por cobrar que se está cancelando o registrando
un abono.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000 | Abono a FV-000235 - CxC \(10/05/2018\) a PC-Madrigal

En el campo **"Observaciones"** Se debe indicar la información que requiere
registrar para la cuenta por cobrar del renglón:**"Abono a FV-000235 - CxC
\(10/05/2018\) a PC-Madrigal"**.

Observaciones

Al seleccionar la cuenta por cobrar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo el sistema la toma como descripción
de la cuenta por cobrar para el documento de impresión y los informes de
cartera.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Observaciones\].**



# Acerca de ventana

## ABONO A CUENTAS POR COBRAR



## Objetivo

Esta ventana tiene como finalidad el registro de los abonos a cuentas por
cobrar.

La operación de abonos a cuentas por cobrar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente un tercero con la empresa. También
permite en una misma operación realizar abonos a múltiples terceros activando
la opción “Permitir hacer abonos a múltiples terceros”.

En la operación de abonos a cuentas por cobrar se podrán detallar los
diferentes costos financieros que se han causado por motivo del crédito, como:
impuestos, intereses y comisiones, esto desde el paso “Detalle de los ingresos
financieros”.

Esta operación es de gran ayuda para los usuarios no contadores que conocen la
información básica de la transacción pero no tienen suficientes bases para el
manejo de la contabilidad.

## Ejemplo de información a registrar

Registrar el abono de $500.000 pesos a la cuenta por cobrar que tiene
pendiente el cliente María Isabel Ortega, correspondiente a la factura de
venta No. FV-00150.

La información relevante para registrar en el abono a cuentas por cobrar es:

  * El tercero que realiza el abono.
  * El código o referencia a la que se le realizará el abono.
  * Valor a abonar.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de ingreso o recibo de caja,
este tipo de documento se puede definir por defecto, y el sistema
automáticamente asignará el consecutivo correspondiente según su
configuración.

También es necesario identificar la fecha de soporte, el tercero que está
realizando el abono a la cuenta por cobrar y el vendedor o recaudador de la
misma.

## Sección registro

En la sección de registro se deben seleccionar las cuentas por cobrar a las
cuales se realizará el abono y el valor abonado que corresponda por cada
renglón.

\[Contapyme\] automáticamente muestra el saldo actual y el nuevo saldo de la
cuenta por cobrar a la fecha que tenga la operación y según el valor abonado.

Si no se ha especificado un tercero, el seleccionador mostrará todas las
cuentas por cobrar a terceros, de tal manera que al seleccionarse una,
automáticamente se llenarán los campos de tercero e identificación de la
cuenta.

## Sección totales registrados

Muestra los totales del saldo y abonos de las cuentas por cobrar registradas
en la operación.

## Sección detalle de los ingresos financieros

En este paso se puede detallar los diferentes ingresos por conceptos
financieros que se han causado por motivo del crédito, como: impuestos,
intereses, comisiones, etc.

También se pueden registrar los descuentos financieros condicionados, es
decir, los que dependen del cumplimiento con que se hagan los abonos.

La información relevante para registrar en este paso es:

  * Centro de costos al cual se le cargará el ingreso.
  * Concepto de ingresos \(Cuenta\).
  * Valor del ingreso financiero.

## Sección liquidación

Registro de los descuentos, cargos o impuestos causados en el abono a la
cuenta por cobrar.

## Sección forma de pago

El sistema permite definir la forma como el tercero cancelará el abono a la
cuenta por cobrar y demás cargos o descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(cruce con CXP al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección liquidación de comisiones

Si se encuentra activo el manejo de comisiones por recaudo, se adicionará un
paso a la operación de abono a cuenta por cobrar donde el sistema mostrará el
cálculo automático que ha realizado de la comisión por recaudo para el
vendedor indicado en el abono a cuentas por cobrar.

Las comisiones por recaudo se configuran por perfiles de vendedores.

Se puede calcular comisión por recaudo basado en:

  * Porcentaje fijo.
  * Por línea o producto.
  * Por monto de ventas y/o recaudo.

En este paso se puede detallar el vendedor que va a comisionar, el perfil de
vendedor, el porcentaje y valor de la comisión.

## Sección impresión de soportes

La operación de abono a cuentas por cobrar permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de abono a CxC.
  * Recibo de caja.
  * Recibo de caja en tirilla texto.
  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Disminuyendo o cancelando la cuenta por cobrar al tercero o muchas cuentas por cobrar para el caso de cuotas por cobrar pendientes y un abono que las cubre.
  * Llevando al ingreso los cargos financieros, si los hay.
  * Procesando los descuentos o cargos.
  * Procesando la forma de cobro o ingreso.





---

### MOV5 - Crear credito o anticipo

#### [14210] FrmDlgOprMov5

﻿

# Referencia

Referencia que tendrá la cuenta por pagar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
créditos o anticipos registrados. sin embargo, el anticipo de los clientes
debe estar soportadas con el consecutivo del pedido realizadas al cliente por
lo tanto en el campo "Referencia" se indica el número de pedido
correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado en la operación.



# Acerca de ventana

## OPERACIÓN CREAR CRÉDITO O ANTICIPO \(CXP\)



## Objetivo

Esta ventana tiene como finalidad el registro de un crédito o anticipo cuando
un tercero le ha hecho a la empresa un préstamo o un anticipo. Es decir, en la
contabilidad quedará registrado como una cuenta que se le debe pagar a un
tercero.

Este asistente permite que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar estos registros, solo digitando
información básica de la operación.

## Ejemplo de información a registrar

La empresa realizó un préstamo con el Banco Nacional, por valor de $5.000.000
de pesos, para pagarlo en 12 cuotas, el cual quedó respaldado con el
comprobante de ingreso No. CI-00150.

Se recibe un anticipo de un cliente por valor de $500.000 pesos, el cual quedó
respaldado con el comprobante de ingreso No CI-000151. Este anticipo
posteriormente se cruzará con la factura de venta.
La información relevante para registrar la operación crear crédito o anticipo
\(CXP\) es:

  * El tercero al que se le deberá crear la cuenta por pagar.
  * La cuenta a la que se llevará el crédito.
  * Valor del crédito o anticipo.
  * ¿A dónde entró el dinero?

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de ingreso. Este tipo de documento
se puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También se debe definir la fecha del documento e indicar la referencia que
tendrá la cuenta por pagar, diferente al número del documento soporte de la
operación. Si no se especifica este dato, la referencia del crédito o anticipo
será el número de documento dado para la operación.

## Sección registro

Se debe especificar el valor del crédito o anticipo e identificar el tercero
al que se le deberá crear la cuenta por pagar.

Se puede especificar el pago en varias cuotas.

## Sección forma de pago

Se debe especificar ¿A dónde entró el dinero?:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(Amortización con CXP\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de crear crédito o anticipo \(CXP\) permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Comprobante de egreso
  * Comprobante de caja.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes y con la
información registrada el sistema tendrá toda la información necesaria para
crear la cuenta por pagar con el tercero en el módulo de cartera y proveedores
y en la contabilidad.





---

### MOV5 - Crear crÚdito o anticipo

#### [14210] FrmDlgOprMov5

﻿

# Referencia

Referencia que tendrá la cuenta por pagar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
créditos o anticipos registrados. sin embargo, el anticipo de los clientes
debe estar soportadas con el consecutivo del pedido realizadas al cliente por
lo tanto en el campo "Referencia" se indica el número de pedido
correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado en la operación.



---

### MOV6 - Crear prestamo o anticipo

#### [14230] FrmDlgOprMov6

﻿

# Referencia

Referencia que tendrá la cuenta por cobrar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
préstamos o anticipos registrados. sin embargo, el anticipo a proveedores debe
estar soportadas con el consecutivo de la ordenes de compra realizadas al
proveedor por lo tanto en el campo "Referecia" se indica el número de orden de
compra correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado para la operación



# Acerca de ventana

## Operación crear préstamo o anticipo \(CXC\) OPERACIÓN CREAR PRESTAMO O
ANTICIPO \(CXC\)



## Objetivo

Esta ventana tiene como finalidad el registro de un préstamo o anticipo que la
empresa le hace a un tercero. Es decir, en la contabilidad quedará registrado
como una cuenta que la empresa le debe cobrar a un tercero \(CxC\).

Este asistente permite que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar estos registros, solo digitando
alguna información simple.

## Ejemplo de información a registrar

La empresa le realizó un préstamo a uno de los socios, el Sr. Carlos Cardona,
por valor de $1.600,000, el cual quedó respaldado con el comprobante de egreso
No. CE-00350.

La empresa le realizó un préstamo a unos de sus empleados por valor de
$800.000, el cual quedó respaldado con el comprobante de egreso No. CE-00351,
para pagar en 8 cuotas y ser descontado en la nómina del empleado.

La empresa realizó un anticipo a proveedores por valor de $1.000.000, por
compra de materia prima, el cual quedó respaldado con el comprobante de egreso
No CE-00352.

La información relevante para registrar la operación crear préstamo o anticipo
\(CXC\) es:

  * El tercero al que se le realizará el préstamo y se le deberá crear la cuenta por cobrar.
  * La cuenta a la que se llevará el crédito.
  * Valor del préstamo o anticipo.
  * ¿De dónde salió el dinero del prestado o anticipo?

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de egreso, este tipo de documento se
puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También se debe definir la fecha del documento e indicar la referencia que
tendrá la cuenta por cobrar, diferente al número documento soporte de la
operación. Si no se especifica este dato, la referencia del crédito será el
número de documento dado para la operación.

## Sección registro

Se debe especificar el valor del préstamo o anticipo e identificar el tercero
al que se le deberá crear la cuenta por cobrar.

Se puede especificar el pago en varias cuotas.

## Sección forma de pago

Se debe especificar ¿de dónde salió el dinero?:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por pagar \(CXP\).
  * Cruce \(cruce con CXC al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de crear préstamo o anticipo \(CXC\) permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de egreso
  * Comprobante de caja.
  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes y con la
información registrada el sistema tendrá toda la información necesaria para
crear la cuenta por cobrar con el tercero en el módulo de cartera y
proveedores y en la contabilidad.





---

### MOV6 - Crear prÚstamo o anticipo

#### [14230] FrmDlgOprMov6

﻿

# Referencia

Referencia que tendrá la cuenta por cobrar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
préstamos o anticipos registrados. sin embargo, el anticipo a proveedores debe
estar soportadas con el consecutivo de la ordenes de compra realizadas al
proveedor por lo tanto en el campo "Referecia" se indica el número de orden de
compra correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado para la operación



---

### MOV8 - Replanteamiento CxC y CxP

#### [14250] FrmDlgOprMov8

﻿

# Vr. otra moneda

Valor abonado en moneda extranjera.

En esta columna se puede especificar el valor del abono equivalente en moneda
extranjera.

Esta columna solamente se habilita para edición, en caso de que la cuenta se
maneje en moneda extranjera y además, la configuración para el manejo de
moneda extranjera permita la edición de este valor.

Observaciones

Normalmente, solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se debería habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
cartera.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Catálogo Plan de Cuentas > Configuración > Configuraciones generales >
Valor de moneda automático\].**



﻿

# Cód. Tercero

Hace referencia al código del tercero con el cual se tiene la cuenta por
cobrar/pagar que se va a replantear.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Observaciones

El tercero ya debe estar creado en la base de datos.
Al indicar el código o identificador del tercero, el sistema filtra
automáticamente todas las cuentas por cobrar que ese tercero tenga
registradas.
Para que \[ContaPyme\] filtre las cuentas por cobrar que tiene cada tercero,
la cuenta contable debe tener la configuración de **"Maneja y exije tercero,
controla endeudamiento y maneja referencia"**.
\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada en la operación.



﻿

# Total a replantear

En este campo se visualizará la suma del saldo de las cuentas o cuotas
seleccionadas en la columna cuenta por cobrar.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/110.png)

En el campo **"Total a replantear"** muestra el valor total que se va a
replantear con las nuevas condiciones:**$1.800.000**.

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.

Es importante que la cuenta tenga la configuración de cartera y proveedores,
es decir, la configuración de **"Exige tercero, Controla endeudamiento y
maneja referencias"** para obtener los datos necesarios para la generación del
replanteamiento.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Referencia

En este campo puede especificar la referencia que tendrá la nueva cuenta por
cobrar/pagar.

Si no se especifica este dato, la referencia del crédito será el número de
documento dado para la operación.



﻿

# Deshacer

Esta opción deshace los último cambios registrados en la operación.



﻿

# Cargar todas las cuentas

Carga todas las cuentas por cobrar/pagar pendientes para el tercero
seleccionado.

Ejemplo

El cliente 30.456.465 - Adriana Bedoya tiene 2 facturas pendientes por pagar,
la factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $500.000 pesos, el cliente emite un cheque por
**$2.000.0000 de pesos** para cancelar todas las cuentas que tiene pendientes
por pagar.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por cobrar registradas para el tercero seleccionado.

![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/140.png)

Observaciones

Este botón carga por defecto todas las cuentas por cobrar/pagar pendientes con
el tercero seleccionado a la fecha que tienen la operación.





﻿

# Replantear un monto

Permite indicar el monto a replantear para las referencias seleccionadas en la
operación.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar por valor de 3.000.000 de pesos a una sola cuota con fecha
de pago en el mes de dicimebre, el cliente solicita a la empresa separar las
cuotas, va a cancelar la mitad con las condiciones actualuaes y la otra mitad
extender el plazo del prestamo a 3 cuotas para pagar cuotas mas bajas y poder
cumplir con el pago de la deuda.

En la opción **"Abonar monto"** se digita el valor que se requiere replantear
para la cuenta por cobrar/pagar seleccionada, en este caso:**$1.500.000** y el
sistema automáticamente se lo asigna a las referencias seleccionadas

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/150.png)

![150B.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/150B.png)

De esta manera, la factura **FV-000215** queda con 1.500.000 por pagar con las
condiciones actuales y el restante quedaría con las nuevas condiones, 3 cuotas
por favor del $500.000 de pesos cada una.

Observaciones

El monto dado en la opción **"Abonar monto"** , \[ContaPyme\] reparte de forma
equitativa el valor abonando para cada referencia seleccionada en la
operación.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está replanteando.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el deterioro puede clic el botón**"Visualizar el documento
impreso"** , y el sistema le muestra una vista previa del documento con toda
su información.

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/160.png)


Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el replanteamiento, debe estar ubicado en la referencia antes de
dar clic en la opción **"Visualizar el documento impreso".**

El documento de impresión por defecto es el mismo que tiene configurado la
operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Cód. Tercero

Hace referencia al código del tercero con el cual se tiene la cuenta por
cobrar/pagar que se va a replantear.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Observaciones

El tercero ya debe estar creado en la base de datos.
Al indicar el código o identificador del tercero, el sistema filtra
automáticamente todas las cuentas por cobrar que ese tercero tenga
registradas.
Para que \[ContaPyme\] filtre las cuentas por cobrar que tiene cada tercero,
la cuenta contable debe tener la configuración de **"Maneja y exije tercero,
controla endeudamiento y maneja referencia"**.
\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada en la operación.



﻿

# Cuenta por cobrar

Identificación de las cuentas de cartera a la cual requiere realizar el
replanteamiento del crédito.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/30.png)

En la columna **"Cuenta por cobrar"** se selecciona el listado de referencias
a las cual requiere realizar el replanteamiento de crédito.

Observaciones

Para indicar la referencia a la cual va a realizar el replanteamiento debe dar
doble clic sobre la columna **"Cuenta por cobrar"** o con el comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero, y se podrá visualizar información
como:**La fecha de soporte, la fecha de vencimiento, el saldo actual, entre
otra información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por cobrar registrada para el tercero con su saldo, la cuenta de
cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda.

De lo contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**"N/D no definido".**

Para poder visualizar y cargar cada referencia, la operación donde se registró
la deuda debe estar procesada.

\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada la operación.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera a la que se va a
registrar el replanteamiento del crédito.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Tercero: 30.456.465 - Adriana Bedoya
---
Cuenta por cobrar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo
130505:01;FV-000215 | 1VEC- Cartera sede centro | $600.000 | $600.000 | $600.000
130505:02;FV-000215 | 1VEC- Cartera sede centro | $600.000 | $600.000 | $600.000
130505:03;FV-000215 | 1VEC- Cartera sede centro | $600.000 | $600.000 | $600.000

En la columna **"Centro de costos"** se muestra indicar el identificador del
centro de costo de la cuenta por cobrar seleccionada para realizar el
replanteamiento: **1VEC- Cartera sede centro**.



﻿

# Saldo actual

Saldo actual de la cuenta por cobrar a la fecha registrada en la operación.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/50.png)

La columna **"Saldo actual"** muestra el saldo que actualmente tiene la cuenta
por cobrar seleccionada en el renglón:**$600.000**.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.
Al seleccionar la cuenta por cobrar la cual requiere replantear el sistema
trae automáticamente el saldo actual de la deuda según la fecha que tenga
registra la operación.



﻿

# Valor abono

Valor que requiere replantear del la cuenta por cobrar/pagar seleccionada.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar por valor de 3.000.000 de pesos a una sola cuota con fecha
de pago en el mes de dicimebre, el cliente solicita a la empresa separar las
cuotas, va a cancelar la mitad con las condiciones actualuaes y la otra mitad
extender el plazo del prestamo a 3 cuotas para pagar cuotas mas bajas y poder
cumplir con el pago de la deuda.

![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/60.png)

En este caso en el campo **"Valor abono"** se digita el valor que se requiere
replantear para la cuenta por cobrar/pagar seleccionada:**$1.500.000**.

De esta manera, la factura **FV-000215** queda con 1.500.000 por pagar con las
condiciones actuales y el restante quedaría con las nuevas condiones, 3 cuotas
por favor del $500.000 de pesos cada una.

Observaciones

Para que el sistema reste el valor abonado a la deuda original por cada
tercero y referencia la cuenta contable debe tener el manejo **"Maneja y exige
tercero", "Controla endeudamiento" y "Maneja referencia"**.

El valor abonado que se registre para cada cuenta por cobrar se podrá
visualizar en los informes de cartera y movimiento contable de la operación.

Configuración

Para realizar la configuración de **"controla endeudamiento" y "maneja
referencia"** a la cuenta de cartera, ver: **\[Pestaña: Contabilidad > Plan de
cuentas > Seleccionar cuenta: Clic derecho modificar > Activar opciones:
"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"\].**



﻿

# Nuevo saldo

Saldo actual de la cuenta por cobrar/pagar a la fecha registrada en la
operación.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar por valor de 3.000.000 de pesos a una sola cuota con fecha
de pago en el mes de dicimebre, el cliente solicita a la empresa separar las
cuotas, va a cancelar la mitad con las condiciones actualuaes y la otra mitad
extender el plazo del prestamo a 3 cuotas para pagar cuotas mas bajas y poder
cumplir con el pago de la deuda.

![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/70.png)

La columna **"Nuevo saldo"** muestra el nuevo valor con el que quedará la
nueva cuenta por cobrar/pagar:**$1.500.000**.

De esta manera, la factura **FV-000215** queda con 1.500.000 por pagar con las
condiciones actuales y el restante quedaría con las nuevas condiones, 3 cuotas
por favor del $500.000 de pesos cada una.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.

Al seleccionar la cuenta por cobrar/pagar el sistema trae automáticamente el
saldo actual de la deuda según la fecha que tenga registra la operación.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por cobrar/pagar.

Es importante que la cuenta tenga la configuración de cartera y proveedores,
es decir, la configuración de **"Exige tercero, Controla endeudamiento y
maneja referencias"** para obtener los datos de cartera necesarios para
realizar el replanteamiento.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Observaciones

Observaciones sobre la cuenta por cobrar a la cual se le esta realizando el
replanteamiento del crédito.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/90.png)

a columna **"Observaciones** Se puede indicar la información que requiere
registrar para la cuenta por cobrar de cada renglón:**Extensión del plazo del
prestamo de 3 cuotas a 6 cuotas**.

Observaciones

Al seleccionar la cuenta por cobrar a la cual requiere realizar el
replanteamiento el sistema le asigna una observación de forma automática, pero
el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo el sistema la toma como descripción
de la cuenta por cobrar que se esta replanteando para el documento de
impresión y los informes de cartera.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: replanteamiento de un prestamos o
anticipo \(CXC\) > Configurar operación > Campos de la operación > Datos
maestros de la operación > Observaciones\].**



---

## Tipo: Configuraciones

### CAR1 - Deterioro de cartera

#### [14030] FrmDlgOprCar1

﻿

# Tasa Nominal Diaria\*

Tasa nominal diaria que se aplica para el cálculo del costo amortizado

Este método solo debe ser utilizado por aquellos usuarios que están llevando
el costo amortizado de sus activos financieros, específicamente de sus cuentas
por cobrar.
Para activar este método, debemos ir a la configuración del plan de cuentas y
allí activar el manejo de costo amortizado.
Luego en la cuenta contable de cartera a la cual vayamos a activar el método
de costo amortizado, debemos indicar la tasa efectiva anual o nominal diaria
con la cual se calculará el costo amortizado de la cuenta.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego se verifican los días en
vencimiento y la tasa de interés configurada en cada cuenta.
2\. Posteriormente el sistema actualiza el valor en libros de la deuda y resta
a este valor el saldo en libros.

De allí se calcula el deterioro.

![100.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/100.png)

Si por ejemplo, tenemos una cuenta por cobrar por valor de $800.000 y cuenta
con 75 días de vencimiento tal como lo muestra la imagen. Vamos a utilizar una
tasa efectiva anual del 10%.
Esa tasa el sistema la convertirá en nominal diaria **"0.0261157%"** y
contando la cantidad de días de vencimiento actualizará el valor de la deuda
utilizando la fórmula del valor futuro.
En este caso el valor actualizado de la deuda es de $815.821.8. Entonces a
este valor se le resta el valor contabilizado de la deuda, es decir los
$800.000 y de esta resta sale el valor del deterioro, que en este caso sería
de **$15.821,8.**

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de costo amortizado, ver: **\[Pestaña: Contabilidad >
Plan de cuentas > Configuración > Configuraciones generales > Deterioro de
cartera NIIF\].**



﻿

# Valor

Valor que se aplicará para deteriorar la deuda por el método de costo
amortizado.

Este método solo debe ser utilizado por aquellos usuarios que están llevando
el costo amortizado de sus activos financieros, específicamente de sus cuentas
por cobrar.
Para activar este método, debemos ir a la configuración del plan de cuentas y
allí activar el manejo de costo amortizado.
Luego en la cuenta contable de cartera a la cual vayamos a activar el método
de costo amortizado, debemos indicar la tasa efectiva anual o nominal diaria
con la cual se calculará el costo amortizado de la cuenta.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego se verifican los días en
vencimiento y la tasa de interés configurada en cada cuenta.
2\. Posteriormente el sistema actualiza el valor en libros de la deuda y resta
a este valor el saldo en libros.

De allí se calcula el deterioro.

![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/110.png)

Si por ejemplo, tenemos una cuenta por cobrar por valor de $800.000 y cuenta
con 75 días de vencimiento tal como lo muestra la imagen. Vamos a utilizar una
tasa efectiva anual del 10%.
Esa tasa el sistema la convertirá en nominal diaria y contando la cantidad de
días de vencimiento actualizará el valor de la deuda utilizando la fórmula del
valor futuro.
En este caso el valor actualizado de la deuda es de $815.821.8. Entonces a
este valor se le resta el valor contabilizado de la deuda, es decir los
$800.000 y de esta resta sale el valor del deterioro, que en este caso sería
de **$15.821,8.**

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de costo amortizado, ver:**\[Pestaña: Contabilidad >
Plan de cuentas > Configuración > Configuraciones generales > Deterioro de
cartera NIIF\].**



﻿

# Deterioro flujos futuros Valor

Valor que se aplicará para deteriorar la deuda por valor en libros - valor
presente de los flujos futuros.

Para activar este método, basta con ir a la configuración de la cuenta de
cartera sobre la cual se aplicará el deterioro y allí activar la opción.
Luego en la operación de deterioro se activará un botón a través del cual
deberemos indicar los datos de los flujos futuros.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego de indicar el valor de los
flujos futuros y de la fecha estimada en la que se recibirán dichos flujos, se
debe indicar la tasa de interés con la cual se calculará el valor presente de
dichos flujos futuros.
2\. Luego de que el sistema calcula el valor presente de los flujos futuros,
este valor se resta al valor actual de la deuda y de allí se calcula el
deterioro.

![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/120.png)

Si por ejemplo, el cliente Luis Carlos Trujillo Sánchez tienen una cuenta
vencida desde el 30/10/2018 por valor de $2.000.000 y esperamos recibir el
total del valor adeudado en 91 días, tomando una tasa de interés del 10% en el
mercado.
El sistema utilizará la fórmula del valor presente para traer al día de hoy
esos $2.000.000 que esperamos recibir en 91 días. En este caso el valor
presente es de $1.953.035.67.
Luego este valor es restado el valor actual del crédito, es decir, los
$2.000.000 y de allí sale el valor del deterioro, que en este caso es de
**$46.964.33.**

![120a.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/120a.png)

Observaciones

El asistente para el calculo del deteriorio de flujos futuros se habilita si
la cuenta de cartera sobre la cual estamos aplicando del deterioro, tiene
habilitado el manejo de deterioro por flujos futuros.

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de deteriorio por flujos futuros, ver: **\[Pestaña:
Contabilidad > Plan de cuentas > Clic derecho sobre la cuenta > Modificar >
Opción: Deterioro de cartera .**



﻿

# Deterioro por probabilidad de no pago % prob. no pago

Porcentaje de probabilidad de no pago que aplica para la deuda. Este método es
el más sencillo y de utilizar y el más recomendable.
Para activarlo basta con ir a la configuración de la cuenta de cartera sobre
la cual se aplicará el deterioro, y allí debemos indicar los días de
vencimiento y el porcentaje de probabilidad de no pago para cada rango de
días.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y se verifica la cantidad de días
de vencimiento que tiene la cuenta a la fecha de aplicación del deterioro.
2\. Según esta cantidad de días, el sistema verificará la tabla de días y
según el porcentaje configurado en la cuenta para los días de vencida, se
calculará sobre ese saldo de la cuenta el nuevo deterioro.


![130.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130.png)

Si por ejemplo, tenemos una cuenta por valor de $1.000.000 y a la fecha de
aplicación de deterioro tiene 31 días de vencida, el sistema consultará la
tabla de vencimientos y porcentajes.


![130A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130A.png)

En este caso, aplicará un porcentaje de deterioro del 10%, que equivale a
$100.000. Entonces este será el valor del deterioro aplicado a esta cuenta.

Observaciones



Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración



Para configurar la tabla de vencimientos y porcentajes para el manejo del
deterioro por probabilidad de no pago, ver: **\[Pestaña: Contabilidad > Plan
de cuentas > Clic derecho sobre la cuenta > Modificar > Opción: Deterioro de
cartera .**



﻿

# Valor

Valor que se aplicará para deteriorar la deuda por el método de probabilidad
de no pago. Este método es el más sencillo y de utilizar y el más
recomendable.
Para activarlo basta con ir a la configuración de la cuenta de cartera sobre
la cual se aplicará el deterioro, y allí debemos indicar los días de
vencimiento y el porcentaje de probabilidad de no pago para cada rango de
días.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y se verifica la cantidad de días
de vencimiento que tiene la cuenta a la fecha de aplicación del deterioro.
2\. Según esta cantidad de días, el sistema verificará la tabla de días y
según el porcentaje configurado en la cuenta para los días de vencida, se
calculará sobre ese saldo de la cuenta el nuevo deterioro.


![130.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130.png)

Si por ejemplo, tenemos una cuenta por valor de $1.000.000 y a la fecha de
aplicación de deterioro tiene 31 días de vencida, el sistema consultará la
tabla de vencimientos y porcentajes.


![130A.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/130A.png)

En este caso, aplicará un porcentaje de deterioro del 10%, que equivale a
**$100.000.** Entonces este será el valor del deterioro aplicado a esta
cuenta.

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para configurar la tabla de vencimientos y porcentajes para el manejo del
deterioro por probabilidad de no pago, ver: **\[Pestaña: Contabilidad > Plan
de cuentas > Clic derecho sobre la cuenta > Modificar > Opción: Deterioro de
cartera .**



﻿

# Observaciones

Observaciones sobre el deterioro registrado para las cuentas por cobrar

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente **30.456.123 - Luis Carlos Trujillo Sánchez** correspondiente al
pago de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero
de 2019 cuenta con un vencimiento de 30 días.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/150.png)

En la columna **"Observaciones"** se digita información sobre la cuenta por
cobrar a la cual se le esta registrando el deterioro:**Deterioro CxC Prob. no
pago: 5,00 %, cuenta de Luis Carlos Trujillo Sánchez.**

Observaciones

El sistema trae una observación de forma automática pero es de libre
definición para el usuario

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Configuración de columnas de deterioro >
Observaciones\].**



﻿

# Centro de costos

Centro de costos al cual se cargará el gasto por pérdida de deterioro.

Ejemplo



Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente Luis Carlos Trujillo Sánchez correspondiente al pago de la FV-16,
por valor de $2.900.000 la cual a la fecha del 28 de noviembre de 2019 cuenta
con un vencimiento de 92 días.


![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/160.png)

En el campo **"Centro de costos"** se selecciona el centro de costos que se
cargará a la cuenta de gasto por pérdida por deterioro.

Observaciones

El seleccionador trae el listado de todos los centros de costos vigentes a la
fecha.

Tenga presente que, si la cuenta por cobrar a la que se le está registrando el
deterioro tiene asignado un centro de costos, este se cargará automáticamente
a la cuenta de gasto.

Para que el centro de costos quede relacionado con la cuenta de gasto, la
cuenta debe tener la configuración **"Exige centro de costo"**. Normalmente
las cuentas de ingreso y egreso ya vienen con esta configuración.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
gasto, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta:
Clic derecho modificar > Pestaña datos requeridos > Activar opción: "Exige
centro de costo"\].**

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Datos maestros de la operación > Centro
de costos\].**



﻿

# Cargar cuentas a deteriorar

Carga las cuentas por cobrar vencidas según un filtro que se puede
especificar.
Se tiene la opción de seleccionar un tercero en particular, un rango de
cuentas de cartera a la que se aplicará el deterioro, también se podrá
seleccionar los vencimientos entre un rango de fechas o los vencimientos en
cantidad de días.

Ejemplo

Se requiere aplicar el deterioro de cartera a todas las cuentas de clientes
nacionales que tengan entre 1 y 90 días de vencidas.

![180.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/180.png)

Observaciones

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
cuenta por cobrar del renglón actual.

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente Luis Carlos Trujillo Sánchez correspondiente al pago de la P-0016,
por valor de $2.900.000 la cual a la fecha del 31 de Enero de 2019 cuenta con
un vencimiento de 30 días.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el deterioro, puede dar clic en el botón**"Visualizar el documento
impreso"** , y el sistema le muestra una vista previa del documento con toda
su información.

![190.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/190.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el deterioro, debe estar ubicado en la referencia antes de dar clic
en la opción **"Visualizar el documento impreso".**

El documento de impresión defecto es el mismo que tiene configurado la
operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Recalcular

Recalcula los deterioros con base en las condiciones actuales de cada deuda a
la fecha.



﻿

# Cód. Tercero

Identificación del tercero deudor al cual se registra el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de enero de
2019 cuenta con un vencimiento de 30 días.

![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/20.png)

La columna **"Cód. Tercero"** se carga el código del tercero para todas las
cuentas de clientes nacionales que tengan entre 1 y 90 días de
vencidas:**30.456.123 - Luis Carlos Trujillo Sánchez**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cod. tercero** se cargarán la identificación de los terceros
deudores según las condiciones que se indiquen en la opción **"Cargar cuentas
a deteriorar"** , donde podrá cargar las cuentas a las que desea aplicar el
deterioro de cartera, entre las opciones que nos ofrece el asistente tenemos
la opción de seleccionar un tercero en particular, un rango de cuentas de
cartera a la que se aplicará el deterioro, también podremos seleccionar los
vencimientos entre un rango de fechas o los vencimientos en cantidad de días.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Calcular deterioro especificando flujos futuros

Abre una ventana que permite calcular el deterioro para la cuenta por cobrar
actual, con base en la diferencia entre el valor en libros y la sumatoria del
valor presente de los pagos futuros, traídos a la fecha a una tasa específica.
Al final se asignará este valor en la columna correspondiente.

Ejemplo

Tenemos una cuenta por valor de **$2.000.000** y esperamos recibir el total
del valor adeudado en **91 días** , tomando una tasa de interés del **10%** en
el mercado.
El sistema utilizará la fórmula del valor presente para traer al día de hoy
**$2.000.000** que esperamos recibir en **91 días.** En este caso el valor
presente es de **$1.953.035.67.**
Luego este valor es restado el valor actual del crédito, es decir, los
**$2.000.000** y de allí sale el valor del deterioro, que en este caso es de
**$46.964.33.**

![210.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/210.png)

Observaciones

El asistente para el cálculo de deterioro especificando flujos futuros, se
habilita si la cuenta de cartera sobre la cual estamos aplicando del
deterioro, tiene habilitado el manejo de deterioro por flujos futuros.

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de deterioro por flujos futuros, ver: **\[Pestaña:
Contabilidad > Plan de cuentas > Clic derecho sobre la cuenta > Modificar >
Pestaña general > Activar opción: "Controla cartera y/o proveedores para
informes" .**



﻿

# Cód. deuda

Identificación de la cuenta de cartera al cual se registrará el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/30.png)

La columna **"Cód. deuda"** se carga el número de referencia para todas las
cuentas por cobrar que tengan entre 1 y 90 días de vencidas:**P-0016**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cód. deuda** se cargarán los números de referencia a las cual
se les registrará el deterioro según las condiciones que se indiquen en la
opción **"Cargar cuentas a deteriorar"** , donde podrá cargar las cuentas a
las que desea aplicar el deterioro de cartera, entre las opciones que nos
ofrece el asistente tenemos la opción de seleccionar un tercero en particular,
un rango de cuentas de cartera a la que se aplicará el deterioro, también
podremos seleccionar los vencimientos entre un rango de fechas o los
vencimientos en cantidad de días.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera que se va a
deteriorar

Ejemplo

Vamos a registrar el deterioro de cartera a las cuentas por cobrar con un
vencimiento de 30 días, la cartera se tiene registrada por cada sede, la cual
se tienen creados como centros de costos.

![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/40.png)

En La columna **"Centro de costos"** se muestra el centro de costos asociado a
la cuenta de cartera que se va a deteriorar.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Centro de costos** se cargarán los centros de costos asociados
a la cuenta por cobrar la cual se les registrará el deterioro según las
condiciones que se indiquen en la opción **"Cargar cuentas a deteriorar"** ,
donde podrá cargar las cuentas a las que desea aplicar el deterioro de
cartera, entre las opciones que nos ofrece el asistente tenemos la opción de
seleccionar un tercero en particular, un rango de cuentas de cartera a la que
se aplicará el deterioro, también podremos seleccionar los vencimientos entre
un rango de fechas o los vencimientos en cantidad de días.

Para el manejo de centros de costos en las cuentas de cartera, la cuenta debe
tener la configuración **"Exige centro de costos"**. Para que el sistema
cargue la información de las cuentas a deteriorar la operación origen de la
deuda debe estar procesada.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
cartera, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar
cuenta: Clic derecho modificar > Activar opciones: "Exige centro de
costos"\].**



﻿

# Saldo actual

Saldo actual de la deuda a la cual se va a registrar el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/50.png)

La columna **"Saldo actual"** muestra el saldo actual para todas las cuentas
por cobrar que tengan entre 1 y 90 días de vencidas:**$2.900.000**

Observaciones

Este campos es informativo, no puede ser modificado por el usuario.

El saldo actual que trae  para las cuenta por cobrar depende de la fecha que
tenga registrada la operación. Para que el sistema  cargue la información de
las cuentas a deteriorar la operación origen de la deuda debe estar procesada
y la cuenta contable debe tener la configuración de **"Maneja tercero, maneja
referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha vencim.

Fecha de vencimiento de la deuda a la cual se va a registrar el deterioro

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/60.png)

La columna **"Fecha vencim."** se carga la fecha de vencimiento que tiene
registrada las cuentas por cobrar a las cuales se va a registrar el
deterioro:**01/01/2019**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema  cargue la información de las cuentas a deteriorar, la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Días vencida

Días que lleva vencida la deuda a la cual se le va a registrar el deterioro.

Ejemplo

Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/70.png)

La columna **"Días vencida"** se carga los días de vencido que tienen las
cuentas por cobrar a las cuales se va a registrar el deterioro:**30** días.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

La edad de cartera que calcula el sistema depende de la fecha de vencimiento
que tiene la cuenta por cobrar y la fecha en la que se está registrando el
deterioro.

Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.


Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha último deterioro

Fecha en que se registro el último deterioro de la deuda.

Ejemplo



Vamos a registrar el deterioro de cartera a la CxC que se tiene pendiente con
el cliente 30.456.123 - Luis Carlos Trujillo Sánchez correspondiente al pago
de la P-0016, por valor de $2.900.000 la cual a la fecha del 31 de Enero de
2019 cuenta con un vencimiento de 30 días.

![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/80.png)
La columna **"Fecha último deterioro"** se carga la fecha del último registro
de deterioro que tenga la deuda.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema \[ContaPyme\] cargue la información de las cuentas a
deteriorar, la operación origen de la deuda y los deterioros registrados deben
estar procesadas. Sólo se deteriora cartera vencida.



﻿

# Días a deteriorar

Días que se va a deteriorar la deuda cuando el metodo es por costo amortizado.

Este método solo debe ser utilizado por aquellos usuarios que están llevando
el costo amortizado de sus activos financieros, específicamente de sus cuentas
por cobrar.
Para activar este método, debemos ir a la configuración del plan de cuentas y
allí activar el manejo de costo amortizado.
Luego en la cuenta contable de cartera a la cual vayamos a activar el método
de costo amortizado, debemos indicar la tasa efectiva anual o nominal diaria
con la cual se calculará el costo amortizado de la cuenta.

Ejemplo

Bajo este método, el deterioro de cartera se calcula de la siguiente manera:

1\. Se toma el valor en libros de la deuda y luego se verifican los días en
vencimiento y la tasa de interés configurada en cada cuenta.
2\. Posteriormente el sistema actualiza el valor en libros de la deuda y resta
a este valor el saldo en libros.

De allí se calcula el deterioro.

![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR1%20-%20Deterioro%20de%20cartera/%5B14030%5D%20FrmDlgOprCar1/90.png)

Si por ejemplo, tenemos una cuenta por cobrar por valor de $800.000 y cuenta
con 75 días de vencimiento tal como lo muestra la imagen. Vamos a utilizar una
tasa efectiva anual del 10%.
Esa tasa el sistema la convertirá en nominal diaria y contando la cantidad de
días de vencimiento actualizará el valor de la deuda utilizando la fórmula del
valor futuro.
En este caso el valor actualizado de la deuda es de $815.821.8. Entonces a
este valor se le resta el valor contabilizado de la deuda, es decir los
$800.000 y de esta resta sale el valor del deterioro, que en este caso sería
de $15.821,8.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.
Los días a deteriorar que asigna \[ContaPyme\] depende de la fecha de
vencimiento que tiene la cuenta por cobrar y la fecha en la que se está
registrando el deterioro.
Sólo se deteriora cartera vencida.

Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.

Configuración

Para activar el manejo de costo amortizado, ver:**\[Pestaña: Contabilidad >
Plan de cuentas > Configuración > Configuraciones generales > Deterioro de
cartera NIIF\].**



---

### CAR2 - Reversion de deterioro de cartera

#### [14060] FrmDlgOprCar2

﻿

# Vr. deterioro acum.

Valor acumulado de deterioro para cada deuda hasta la fecha.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![100.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/100.png)

En la columna **"Vr. deterioro acum."** se muestra el acumulado de los valores
deteriorados para cada una de las referencias: **$200.000**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor acumulado de los deterioros de cartera
para cada referencia, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro de costos

Indique el centro de costo que se cargará a la cuenta de gasto.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/10.png)

En el campo **"Centro de costos"** se selecciona el centro de costo que se
cargará a la cuenta de gasto por reversión de deterioro. **DC-Deterioro de
cartera.**

Observaciones

El seleccionador trae el listado de todos los centros de costos vigentes a la
fecha.

Tenga presente que si la cuenta por cobrar a la que se le está registrando el
deterioro tiene asignado un centro de costos, se cargará automáticamente a la
cuenta de gasto.

Para que el centro de costo quede relacionado con la cuenta de gasto, la
cuenta debe tener la configuración **"Exige centro de costo"**. Normalmente
las cuetas de ingreso y egreso ya vienen con esta configuración.

Configuración

Para realizar la configuración de **"Exige centro de costo"** a la cuenta de
gasto, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta:
Clic derecho modificar > Activar opciones: "Exige centro de costo"\].**

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Datos maestros de la operación > Centro
de costos\].**



﻿

# Valor reversión

Valor a revertir sobre la deuda.




Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/110.png)

La columna **"Valor reversión"** se debe digitar el valor que vamos a
revertir. Como el cliente nos va a cancelar la totalidad de la deuda,
realizaremos la reversión del total del deterioro aplicado, en este caso
son:**$200.000** pesos.

Observaciones

El valor a revertir se debe digitar de forma manual por el usuario.

\[ContaPyme\]No se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado. Para que el sistema \[ContaPyme>\] cargue la información de las
cuentas a la cual se le va a registrar la reversión de deteriorar la operación
origen de la deuda debe estar procesada y la cuenta contable debe tener la
configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Observaciones

Observaciones sobre la reversión del deterioro para las cuentas por cobrar

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/120.png)

En la columna **"Observaciones"** se digita información sobre la cuenta por
cobrar a la cual se le esta registrando la reversión del deterioro:**Reversión
deterioro de cartera Yenny Espinosa a la factura P-0001**

Observaciones

El sistema trae una observación de forma automática pero es de libre
definición para el usuario

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Reversion deterioro de cartera >
Configurar operación > Campos de la operación > Configuración de columnas de
deterioro > Observaciones\].**



﻿

# Reversión de deterioro en distinto periodo

Esta opción permite indicar al sistema si la reversión al deterioro es en el
mismo periodo en que se registró el deterioro \(desactivado\), o si es en otro
periodo diferente \(activado\).

Cuando la reversión al deterioro es en el mismo periodo, se acredita la cuenta
de gastos. Cuando es en otro periodo, se acredita una cuenta de ingresos.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Como la reversión del deterioro se esta registrando en un periodo diferente se
debe activar la opción **"Reversión de deterioro en distinto periodo"** , esto
con el fin de indicarle al sistema que al realizarse la reversión en un
periodo diferente, la cuenta sobre la cual se debe contabilizar la reversión
ya no será una cuenta del gasto sino una cuenta de ingresos, ya que la cuenta
de gastos ha sido cancelada al cerrarse el año 2018.


![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/140.png)


Observaciones

Las cuentas que el sistema imputará automáticamente al realizarse el deterioro
y la reversión de deterioro se configuran en la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Opción: "Deterioro cartera"\].** .



﻿

# Cargar cuentas a deteriorar

Carga las cuentas por cobrar que ya han sido deterioradas, según un filtro que
se puede especificar
Se tiene la opción de seleccionar un tercero en particular, un rango de
cuentas de cartera a la que se aplicará el deterioro, también se prodrá
seleccionar la referencia a la cual se requiere realizar la reversión.

Ejemplo

Se requiere aplicar la reversión de deterioro a la referencia P-0001 del
cliente Yenny Espinosa, desde la opción "Cargar cuentas a
deteriorar",seleccionamos la referencia sobre la cual realizará la reversión
del deterioro. Seleccionaremos la referecnia **P-0001**.
Luego damos clic al botón aceptar.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/150.png)

Posteriormente el \[ContaPyme\] carga toda la información de la cuenta
deteriorada, como el código del tercero, el saldo actual y demás datos de cada
cuenta. También Caraga la fecha del último deterioro y el último valor del
deterioro además del acumulado de los valores deteriorados.

Observaciones

En \[ContaPyme\] no se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado.

Para que el sistema \[ContaPyme>\] cargue la información de las cuentas a la
cual se le va a registrar la reversión de deteriorar la operación origen de la
deuda debe estar procesada y la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Visualizar el documento impreso

Visualiza el documento impreso asociado a la cuenta por cobrar del renglón
actual

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Si se requiere ver el documento impreso asociado a la cuenta por cobrar damos
clic en la opcion "Visualizar el documento impreso".

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/160.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando la reversión, debe estar ubicado en la referencia antes de dar clic
en la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Recalcular

Recalcula los datos de los registros con base en las condiciones actuales de
cada deuda a la fecha.



﻿

# Cód. Tercero

Identificación del tercero deudor al cual se registra la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/20.png)

La columna **"Cód. Tercero"** se carga el código del tercero para todas las
cuentas a las cuales se les aplicará la reversión de
deterioro:**10345678-Yenny Espinosa**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cod. tercero** se cargarán la identificación de los terceros
deudores según las condiciones que se indiquen en la opción **"Cargar cuentas
a deteriorar"** , donde podrá cargar las cuentas a las que desea aplicar el
deterioro de cartera, entre las opciones que nos ofrece el asistente tenemos
la opción de seleccionar un tercero en particular, un rango de cuentas de
cartera a la que se aplicará la reversión de deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cód. deuda

Identificación de la cuenta de cartera al cual se registrará la reversión de
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/30.png)

La columna **"Cód. deuda"** se carga el número de referencia para todas las
cuentas por cobrar a las que se les va aplicar el deterioro**P-0001**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cód. deuda** se cargarán los números de referencia a las cual
se les registrará la reversión de deterioro según las condiciones que se
indiquen en la opción **"Cargar cuentas a deteriorar"** , donde podrá cargar
las cuentas a las que desea aplicar el deterioro de cartera, entre las
opciones que nos ofrece el asistente tenemos la opción de seleccionar un
tercero en particular, un rango de cuentas de cartera a la que se aplicará el
deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a la cual se le va a
registrar la reversión de deteriorar la operación origen de la deuda debe
estar procesada y la cuenta contable debe tener la configuración de **"Maneja
tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera que se va a
reversar.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/40.png)

En La columna **"Centro de costos"** se muestra el centro de costo asociado a
la cuenta de cartera que se va a realizar la reversión de deterioro.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Centro de costos** se cargarán los centros de costos asociados
a la cuenta por cobrar la cual se les registrará la reversión deterioro según
las condiciones que se indiquen en la opción **"Cargar cuentas a deteriorar"**
, donde podrá cargar las cuentas a las que desea aplicar el deterioro de
cartera, entre las opciones que nos ofrece el asistente tenemos la opción de
seleccionar un tercero en particular, un rango de cuentas de cartera a la que
se aplicará el deterioro y la referencia.

Tenga presente que si la cuenta por cobrar a la que se le está registrando la
reversión de deterioro tiene asignado un centro de costos, se cargará
automáticamente a la cuenta de gasto.

Para el manejo de centros de costos en las cuentas de cartera, la cuenta debe
tener la configuración **"Exige centro de costo"**. Para que el sistema
cargue la información de las cuentas en la reversion de deterioro la operación
origen de la deuda debe estar procesada.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
cartera, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar
cuenta: Clic derecho modificar > Activar opciones: "Exige centro de
costos"\].**



﻿

# Saldo actual

Saldo actual de la deuda a la cual se va a registrar la reversión de deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/50.png)

La columna **"Saldo actual"** muestra el saldo actual para todas las cuentas
por cobrar a la cual se va a registrar la reversión:**$2.000.000**

Observaciones

Este campos es informativo, no puede ser modificado por el usuario.

El saldo actual que trae  para las cuenta por cobrar depende de la fecha que
tenga registrada la operación. Para que el sistema  cargue la información de
las cuentas a reversar, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha vencim.

Fecha de vencimiento de la deuda a la cual se va a registrar la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/60.png)

La columna **"Fecha vencim."** se carga la fecha de vencimiento que tiene
registrada las cuentas por cobrar a las cuales se va a registrar la reversión
del deterioro:**27/07/2018**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema  cargue la información de las cuentas a reversar, la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Días vencida

Días que lleva vencida la deuda a la cual se le va a registrar la reversión
del deterioro.

Ejemplo



>El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/70.png)

La columna **"Días vencida"** se carga los días de vencido que tienen las
cuentas por cobrar a las cuales se va a registrar la reversión del
deterioro:**161** días.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

La edad de cartera que calcula el sistema depende de la fecha de vencimiento
que tiene la cuenta por cobrar y la fecha en la que se está registrando la
reversión del deterioro.

Para que el sistema realice la reversión de deterioro de cartera, las cuentas
deben tener activa la opción de 'Controla endeudamiento' y la casilla para
afectar contabilización NIIF.


Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha ult. deter.

Fecha en que se registro el último deterioro de la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/80.png)

La columna **"Fecha último deterioro"** se carga la fecha del último registro
de deterioro que tenga la deuda:**31/12/2018**.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema \[ContaPyme\] cargue la información de las cuentas a
reversar, la operación origen de la deuda y los deterioros registrados deben
estar procesadas.



﻿

# Vr. últ. deterioro

Valor del último deterioro registrado para la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversion%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/90.png)

En la columna **"Vr. últ. deterioro"** se muestra el último deterioro
registrado para la deuda según la fecha indicada en la operación, para este
casi son: **$200.000** pesos.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor del último deterioro registrado para cada
referencia, la operación origen de la deuda y de deterioro debe estar
procesada, como también la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



---

### CAR2 - Reversi¾n de deterioro de cartera

#### [14060] FrmDlgOprCar2

﻿

# Vr. deterioro acum.

Valor acumulado de deterioro para cada deuda hasta la fecha.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![100.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/100.png)

En la columna **"Vr. deterioro acum."** se muestra el acumulado de los valores
deteriorados para cada una de las referencias: **$200.000**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor acumulado de los deterioros de cartera
para cada referencia, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro de costos

Indique el centro de costo que se cargará a la cuenta de gasto.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/10.png)

En el campo **"Centro de costos"** se selecciona el centro de costo que se
cargará a la cuenta de gasto por reversión de deterioro. **DC-Deterioro de
cartera.**

Observaciones

El seleccionador trae el listado de todos los centros de costos vigentes a la
fecha.

Tenga presente que si la cuenta por cobrar a la que se le está registrando el
deterioro tiene asignado un centro de costos, se cargará automáticamente a la
cuenta de gasto.

Para que el centro de costo quede relacionado con la cuenta de gasto, la
cuenta debe tener la configuración **"Exige centro de costo"**. Normalmente
las cuetas de ingreso y egreso ya vienen con esta configuración.

Configuración

Para realizar la configuración de **"Exige centro de costo"** a la cuenta de
gasto, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta:
Clic derecho modificar > Activar opciones: "Exige centro de costo"\].**

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Deterioro de cartera > Configurar
operación > Campos de la operación > Datos maestros de la operación > Centro
de costos\].**



﻿

# Valor reversión

Valor a revertir sobre la deuda.




Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/110.png)

La columna **"Valor reversión"** se debe digitar el valor que vamos a
revertir. Como el cliente nos va a cancelar la totalidad de la deuda,
realizaremos la reversión del total del deterioro aplicado, en este caso
son:**$200.000** pesos.

Observaciones

El valor a revertir se debe digitar de forma manual por el usuario.

\[ContaPyme\]No se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado. Para que el sistema \[ContaPyme>\] cargue la información de las
cuentas a la cual se le va a registrar la reversión de deteriorar la operación
origen de la deuda debe estar procesada y la cuenta contable debe tener la
configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Observaciones

Observaciones sobre la reversión del deterioro para las cuentas por cobrar

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/120.png)

En la columna **"Observaciones"** se digita información sobre la cuenta por
cobrar a la cual se le esta registrando la reversión del deterioro:**Reversión
deterioro de cartera Yenny Espinosa a la factura P-0001**

Observaciones

El sistema trae una observación de forma automática pero es de libre
definición para el usuario

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Reversion deterioro de cartera >
Configurar operación > Campos de la operación > Configuración de columnas de
deterioro > Observaciones\].**



﻿

# Reversión de deterioro en distinto periodo

Esta opción permite indicar al sistema si la reversión al deterioro es en el
mismo periodo en que se registró el deterioro \(desactivado\), o si es en otro
periodo diferente \(activado\).

Cuando la reversión al deterioro es en el mismo periodo, se acredita la cuenta
de gastos. Cuando es en otro periodo, se acredita una cuenta de ingresos.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Como la reversión del deterioro se esta registrando en un periodo diferente se
debe activar la opción **"Reversión de deterioro en distinto periodo"** , esto
con el fin de indicarle al sistema que al realizarse la reversión en un
periodo diferente, la cuenta sobre la cual se debe contabilizar la reversión
ya no será una cuenta del gasto sino una cuenta de ingresos, ya que la cuenta
de gastos ha sido cancelada al cerrarse el año 2018.


![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/140.png)


Observaciones

Las cuentas que el sistema imputará automáticamente al realizarse el deterioro
y la reversión de deterioro se configuran en la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Opción: "Deterioro cartera"\].** .



﻿

# Cargar cuentas a deteriorar

Carga las cuentas por cobrar que ya han sido deterioradas, según un filtro que
se puede especificar
Se tiene la opción de seleccionar un tercero en particular, un rango de
cuentas de cartera a la que se aplicará el deterioro, también se prodrá
seleccionar la referencia a la cual se requiere realizar la reversión.

Ejemplo

Se requiere aplicar la reversión de deterioro a la referencia P-0001 del
cliente Yenny Espinosa, desde la opción "Cargar cuentas a
deteriorar",seleccionamos la referencia sobre la cual realizará la reversión
del deterioro. Seleccionaremos la referecnia **P-0001**.
Luego damos clic al botón aceptar.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/150.png)

Posteriormente el \[ContaPyme\] carga toda la información de la cuenta
deteriorada, como el código del tercero, el saldo actual y demás datos de cada
cuenta. También Caraga la fecha del último deterioro y el último valor del
deterioro además del acumulado de los valores deteriorados.

Observaciones

En \[ContaPyme\] no se permite aplicar reversión de deterioro a cuentas no
deterioradas o que esa reversión del deterioro sobrepase el valor ya
deteriorado.

Para que el sistema \[ContaPyme>\] cargue la información de las cuentas a la
cual se le va a registrar la reversión de deteriorar la operación origen de la
deuda debe estar procesada y la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Visualizar el documento impreso

Visualiza el documento impreso asociado a la cuenta por cobrar del renglón
actual

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.

Si se requiere ver el documento impreso asociado a la cuenta por cobrar damos
clic en la opcion "Visualizar el documento impreso".

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/160.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando la reversión, debe estar ubicado en la referencia antes de dar clic
en la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Recalcular

Recalcula los datos de los registros con base en las condiciones actuales de
cada deuda a la fecha.



﻿

# Cód. Tercero

Identificación del tercero deudor al cual se registra la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![20.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/20.png)

La columna **"Cód. Tercero"** se carga el código del tercero para todas las
cuentas a las cuales se les aplicará la reversión de
deterioro:**10345678-Yenny Espinosa**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cod. tercero** se cargarán la identificación de los terceros
deudores según las condiciones que se indiquen en la opción **"Cargar cuentas
a deteriorar"** , donde podrá cargar las cuentas a las que desea aplicar el
deterioro de cartera, entre las opciones que nos ofrece el asistente tenemos
la opción de seleccionar un tercero en particular, un rango de cuentas de
cartera a la que se aplicará la reversión de deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a deteriorar la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Cód. deuda

Identificación de la cuenta de cartera al cual se registrará la reversión de
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/30.png)

La columna **"Cód. deuda"** se carga el número de referencia para todas las
cuentas por cobrar a las que se les va aplicar el deterioro**P-0001**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Cód. deuda** se cargarán los números de referencia a las cual
se les registrará la reversión de deterioro según las condiciones que se
indiquen en la opción **"Cargar cuentas a deteriorar"** , donde podrá cargar
las cuentas a las que desea aplicar el deterioro de cartera, entre las
opciones que nos ofrece el asistente tenemos la opción de seleccionar un
tercero en particular, un rango de cuentas de cartera a la que se aplicará el
deterioro y la referencia.

Para que el sistema  cargue la información de las cuentas a la cual se le va a
registrar la reversión de deteriorar la operación origen de la deuda debe
estar procesada y la cuenta contable debe tener la configuración de **"Maneja
tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera que se va a
reversar.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![40.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/40.png)

En La columna **"Centro de costos"** se muestra el centro de costo asociado a
la cuenta de cartera que se va a realizar la reversión de deterioro.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

En la columna **Centro de costos** se cargarán los centros de costos asociados
a la cuenta por cobrar la cual se les registrará la reversión deterioro según
las condiciones que se indiquen en la opción **"Cargar cuentas a deteriorar"**
, donde podrá cargar las cuentas a las que desea aplicar el deterioro de
cartera, entre las opciones que nos ofrece el asistente tenemos la opción de
seleccionar un tercero en particular, un rango de cuentas de cartera a la que
se aplicará el deterioro y la referencia.

Tenga presente que si la cuenta por cobrar a la que se le está registrando la
reversión de deterioro tiene asignado un centro de costos, se cargará
automáticamente a la cuenta de gasto.

Para el manejo de centros de costos en las cuentas de cartera, la cuenta debe
tener la configuración **"Exige centro de costo"**. Para que el sistema
cargue la información de las cuentas en la reversion de deterioro la operación
origen de la deuda debe estar procesada.

Configuración

Para realizar la configuración de **"Exige centro de costos"** a la cuenta de
cartera, ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar
cuenta: Clic derecho modificar > Activar opciones: "Exige centro de
costos"\].**



﻿

# Saldo actual

Saldo actual de la deuda a la cual se va a registrar la reversión de deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/50.png)

La columna **"Saldo actual"** muestra el saldo actual para todas las cuentas
por cobrar a la cual se va a registrar la reversión:**$2.000.000**

Observaciones

Este campos es informativo, no puede ser modificado por el usuario.

El saldo actual que trae  para las cuenta por cobrar depende de la fecha que
tenga registrada la operación. Para que el sistema  cargue la información de
las cuentas a reversar, la operación origen de la deuda y de deterioro debe
estar procesada, como también la cuenta contable debe tener la configuración
de **"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha vencim.

Fecha de vencimiento de la deuda a la cual se va a registrar la reversión del
deterioro

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/60.png)

La columna **"Fecha vencim."** se carga la fecha de vencimiento que tiene
registrada las cuentas por cobrar a las cuales se va a registrar la reversión
del deterioro:**27/07/2018**

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema  cargue la información de las cuentas a reversar, la
operación origen de la deuda debe estar procesada y la cuenta contable debe
tener la configuración de **"Maneja tercero, maneja referencia y controla
endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Días vencida

Días que lleva vencida la deuda a la cual se le va a registrar la reversión
del deterioro.

Ejemplo



>El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/70.png)

La columna **"Días vencida"** se carga los días de vencido que tienen las
cuentas por cobrar a las cuales se va a registrar la reversión del
deterioro:**161** días.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

La edad de cartera que calcula el sistema depende de la fecha de vencimiento
que tiene la cuenta por cobrar y la fecha en la que se está registrando la
reversión del deterioro.

Para que el sistema realice la reversión de deterioro de cartera, las cuentas
deben tener activa la opción de 'Controla endeudamiento' y la casilla para
afectar contabilización NIIF.


Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Fecha ult. deter.

Fecha en que se registro el último deterioro de la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![80.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/80.png)

La columna **"Fecha último deterioro"** se carga la fecha del último registro
de deterioro que tenga la deuda:**31/12/2018**.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema \[ContaPyme\] cargue la información de las cuentas a
reversar, la operación origen de la deuda y los deterioros registrados deben
estar procesadas.



﻿

# Vr. últ. deterioro

Valor del último deterioro registrado para la deuda.

Ejemplo

El día 31 de diciembre de 2018 se aplicó deterioro a la cuenta de la señora
Yenny Espinosa, la cual venía vencida desde el 27/07/2018, y cuyo valor era de
$2.000.000. El día 4 de enero de 2019, la señora Yenny se ha acercado a
nosotros para cancelar la totalidad de la cuenta, por lo que debemos aplicar
la respectiva reversión del deterioro.


![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR2%20-%20Reversi%C2%BEn%20de%20deterioro%20de%20cartera/%5B14060%5D%20FrmDlgOprCar2/90.png)

En la columna **"Vr. últ. deterioro"** se muestra el último deterioro
registrado para la deuda según la fecha indicada en la operación, para este
casi son: **$200.000** pesos.

Observaciones

Es un campo informativo, no puede ser modificado por el usuario.

Para que el sistema muestre el valor del último deterioro registrado para cada
referencia, la operación origen de la deuda y de deterioro debe estar
procesada, como también la cuenta contable debe tener la configuración de
**"Maneja tercero, maneja referencia y controla endeudamiento."**

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



---

### CAR3 - Registro de tasa maxima de interes por mora

#### [18730] FrmDlgOprCar3

﻿

# Tasa máxima de interés

Define la tasa máxima de interés por mora o tasa de usura que se le aplicará a
una cuenta por cobrar vencida en determinado rango de fechas.
En Colombia esta tasa máxima es definida por la **Superintendencia financiera
de Colombia.**

Para mayor información sobre como consultar la tasa máxima de interes en un
periodo, diríjase a la sección de observaciones.

Ejemplo

Se define que entre el 15/05/2018 y el 15/06/2018 la tasa máxima de interés
por mora será del 56,33% **EFECTIVO ANUAL**.

![ejemplo_tasa.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_tasa.png)


## Ejemplo práctico

El día 1 de mayo de 2018 el señor Andrés Parra realiza el préstamo de
$1.000.000 para pagarlo a 2 cuotas mensuales y se establece que se aplicará la
tasa máxima de interés por mora.

El dia 5 de junio de 2018 se dispone a pagar su primera cuota por un valor de
**$500.000** pero a esta fecha tiene 4 días en mora por lo cual deberá pagar
la suma de **$502.488**.

![ejemplo_practico.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_practico.png)

Este cálculo se realizó de la siguiente manera:

Inicialmente se convierte la tasa efectiva anual a diaria con la siguiente
fórmula:
![ecuacion_TM.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_TM.png)
**TED:** Tasa efectiva diaria
**TEA:** Tasa efectiva anual vigente \(56,33%\)
**P :** Periodos \(360 Días\)
**% Tasa mora diaria:** 0.1242%

Luego se calcula la tasa equivalente a los días de mora:
![ecuacion_M.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_M.png)
**TED:** Tasa de interés diaria \(0.1242%\)
**D :** Días por mora \(4 Días\)
**Tasa interés:** 0.4977%

Ahora se calcula el valor del interés que se debe pagar por los 4 días de
mora:
**Total de interés por mora:** \($500.000 \* 0.4977%\) = 2.488
**Total de la cuota:** $502.488


Observaciones

## ¿Cómo consultar la tasa máxima de interés por mora actual?

Puede consultar la tasa de usura para las diferentes modalidades de préstamo
en la página web de la [Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), sección
“indicadores económicos”

![Indicadores-
economicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
economicos.png)

## Recuerde

**Exceder la tasa de usura es un delito cuya pena puede estar entre dos \(2\)
a cinco \(5\) años de cárcel** y multas desde cincuenta \(50\) hasta
doscientos \(200\) salarios mínimos legales mensuales vigentes.
Para más información consulte el artículo 305 de la [ley 599 de
2000](<http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=6388>).



﻿

# Vigencia

Defina la fecha inicial y la fecha final desde la cual estará vigente la tasa
máxima por mora.
De esta manera al calcular la mora de un prestamo el sistema buscará la tasa
máxima vigente a esa fecha.

Observaciones

En Colombia estas fechas deben ser consultadas en la página web de la
[Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), costado
derecho, sección “indicadores económicos”

![Indicadores-
economicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
economicos.png)



# Acerca de ventana

## OPERACIÓN DE TASA MÁXIMA DE INTERÉS POR MORA

##  Objetivo

La operación de registro de tasas máximas de interés por mora permite definir
la tasa de mora que estará vigente entre un rango de fechas.

## Ejemplo de información a registrar

Los datos que se deben ingresar al momento de realizar la operación son los
siguientes:

**Fecha inicio** | 01/08/2018
---|---
**Fecha fin** | 30/08/2018
**Tasa máxima** | 29,91%



## Definición de conceptos

**¿Dónde se utilizan estas tasas?**

El siguiente diagrama explica conceptualmente cómo se debe utilizar la
operación **"Registro de tasas máximas de interés por mora"** y cómo afecta al
momento de realizar el cálculo del monto de mora de una cuenta por cobrar
vencida:

![tasamaxima.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/tasamaxima.png)


## Secciones

## Publicación de la entidad financiera

Periódicamente la Superintendencia financiera publica las tasas de usura para
las diferentes modalidades de préstamo que estarán vigentes en un rango de
fechas.

## Registro en el sistema

Estas tasas deben ser ingresadas al sistema para que este pueda estar
actualizado y aplicar la tasa correspondiente a las diferentes cuentas por
cobrar vencidas.

Para consultar el histórico de tasas registradas, diríjase a: **\[Pestaña
cartera > Explorador de tasas por mora\]**.

## Calculo al realizar el abono

Al momento de registrar el abono de una CxC se verificará si esta tiene días
en mora y si el tipo de crédito con el que fue creado aplica la tasa máxima de
intereses por mora.
De esta manera el sistema consultará si hay una tasa vigente para el periodo
en el que se esté realizando el pago, y en caso de no encontrar una el sistema
sacará un error y no permitirá realizar el pago.



## Para Colombia

**Para Colombia** estas tasas son definidas por la superintendencia financiera
de Colombia. Puede consultar la tasa de usura para las diferentes modalidades
de préstamo en la página web de la [Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), sección
**"indicadores económicos"** :

![indicador.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20maxima%20de%20interes%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/indicador.png)


**Recuerde**

**La tasa de usura no puede ser mayor al 1.5 del interés corriente, exceder
esta tasa es un delito cuya pena puede estar entre dos \(2\) a cinco \(5\)
años de cárcel** y multas desde cincuenta \(50\) hasta doscientos \(200\)
salarios mínimos legales mensuales vigentes.
Para más información consulte el **artículo 305** de la [ley 599 de
2000](<http://www.suin-juriscol.gov.co/viewDocument.asp?id=1663230>).



---

### CAR3 - Registro de tasa mßxima de interÚs por mora

#### [18730] FrmDlgOprCar3

﻿

# Tasa máxima de interés

Define la tasa máxima de interés por mora o tasa de usura que se le aplicará a
una cuenta por cobrar vencida en determinado rango de fechas.
En Colombia esta tasa máxima es definida por la **Superintendencia financiera
de Colombia.**

Para mayor información sobre como consultar la tasa máxima de interes en un
periodo, diríjase a la sección de observaciones.

Ejemplo

Se define que entre el 15/05/2018 y el 15/06/2018 la tasa máxima de interés
por mora será del 56,33% **EFECTIVO ANUAL**.

![ejemplo_tasa.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_tasa.png)


## Ejemplo práctico

El día 1 de mayo de 2018 el señor Andrés Parra realiza el préstamo de
$1.000.000 para pagarlo a 2 cuotas mensuales y se establece que se aplicará la
tasa máxima de interés por mora.

El dia 5 de junio de 2018 se dispone a pagar su primera cuota por un valor de
**$500.000** pero a esta fecha tiene 4 días en mora por lo cual deberá pagar
la suma de **$502.488**.

![ejemplo_practico.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ejemplo_practico.png)

Este cálculo se realizó de la siguiente manera:

Inicialmente se convierte la tasa efectiva anual a diaria con la siguiente
fórmula:
![ecuacion_TM.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_TM.png)
**TED:** Tasa efectiva diaria
**TEA:** Tasa efectiva anual vigente \(56,33%\)
**P :** Periodos \(360 Días\)
**% Tasa mora diaria:** 0.1242%

Luego se calcula la tasa equivalente a los días de mora:
![ecuacion_M.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/ecuacion_M.png)
**TED:** Tasa de interés diaria \(0.1242%\)
**D :** Días por mora \(4 Días\)
**Tasa interés:** 0.4977%

Ahora se calcula el valor del interés que se debe pagar por los 4 días de
mora:
**Total de interés por mora:** \($500.000 \* 0.4977%\) = 2.488
**Total de la cuota:** $502.488


Observaciones

## ¿Cómo consultar la tasa máxima de interés por mora actual?

Puede consultar la tasa de usura para las diferentes modalidades de préstamo
en la página web de la [Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), sección
“indicadores económicos”

![Indicadores-
económicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
econ%C3%B3micos.png)

## Recuerde

**Exceder la tasa de usura es un delito cuya pena puede estar entre dos \(2\)
a cinco \(5\) años de cárcel** y multas desde cincuenta \(50\) hasta
doscientos \(200\) salarios mínimos legales mensuales vigentes.
Para más información consulte el artículo 305 de la [ley 599 de
2000](<http://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=6388>).



﻿

# Vigencia

Defina la fecha inicial y la fecha final desde la cual estará vigente la tasa
máxima por mora.
De esta manera al calcular la mora de un prestamo el sistema buscará la tasa
máxima vigente a esa fecha.

Observaciones

En Colombia estas fechas deben ser consultadas en la página web de la
[Superintendencia Financiera de
Colombia](<https://www.superfinanciera.gov.co/jsp/index.jsf>), costado
derecho, sección “indicadores económicos”

![Indicadores-
económicos.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/CAR3%20-%20Registro%20de%20tasa%20m%C3%9Fxima%20de%20inter%C3%9As%20por%20mora/%5B18730%5D%20FrmDlgOprCar3/Indicadores-
econ%C3%B3micos.png)



---

### MOV3 - Abono a CxP

#### [14170] FrmDlgOprMov3

﻿

# Vr. otra moneda

Valor abonado en moneda extranjera.

En esta columna se puede especificar el valor del abono equivalente en moneda
extranjera.

Esta columna solamente se habilita para edición, en caso que la cuenta se
maneje en moneda extranjera y además, la configuración para el manejo de
moneda extranjera permita la edición de este valor.

Observaciones

Normalmente solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se debería habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
proveedores.

Configuración

  * Para ingresar a la configuración de manejo de moneda extranjera, ingrese a **\[Catálogo Plan de Cuentas > Configuración > Configuraciones generales > Valor de moneda automático.\]**



﻿

# Tercero

Corresponde al código o identificación del tercero con el cual se tiene la
cuenta por pagar y del cual se va a realizar el abono.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura FC-000140 por una compra de materia prima por valor de $2.500.000
pesos al proveedor **900852956 - Provee ABS** , así que en el campo
**"Tercero"** indique el código o identificación del tercero al cual se tiene
asociada la cuenta por pagar: **900852956 - Provee ABS**

Observaciones

El tercero ya debe estar creado en la base de datos.

Al indicar el código o identificador del tercero, el sistema filtra
automáticamente todas las cuentas por pagar que se tienen registradas para ese
tercero.

Para que \[ContaPyme\] filtre las cuentas por pagar que se tienen para cada
tercero, la cuenta contable debe tener la configuración de **"Maneja y exije
tercero, controla endeudamiento y maneja referencia"**.

\[ContaPyme\] muestra las cuentas por pagar pendientes con cada tercero hasta
la fecha que tenga configurada la operación de abono a CXP.

También se tiene la posibilidad de realizar abonos a CXP para múltiples
terceros, para ello se debe activar la columna tercero, ver:**\[Operación
Abono CXP > Menú: Opciones > Activar opción: Permitir hacer abonos a múltiples
terceros\].**



﻿

# Total saldos

Valor total de los saldos que trae cada una las referencias registradas en la
operación

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , Se realiza un abono por valor de $500.000 pesos a la factura
**FC-000140** y para la factura **FV-000160** Se realiza un abono de $600.000
pesos.

![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV3%20-%20Abono%20a%20CxP/%5B14170%5D%20FrmDlgOprMov3/110.png)

En el campo **"Total saldos"** el sistema muestra el valor total del saldo
actual que trae cada una las referencias registradas en la
operación:**$4.100.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Total abonos

Valor total de los abonos realizados a cada una de las referencias registradas
en al operación.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956 -
Provee ABS** , Se realiza un abono por valor de $500.000 pesos a la factura
**FC-000140** y para la factura **FV-000160** Se realiza un abono de $600.000
pesos.

![120.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV3%20-%20Abono%20a%20CxP/%5B14170%5D%20FrmDlgOprMov3/120.png)

En el campo **"Total abonos"** el sistema muestra el valor total de los abonos
realizados en cada una las referencias registradas en la
operación:**$1.100.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Cód. deuda

Si el abono a la cuenta por pagar genera impuestos, intereses, comisiones,
etc., se debe seleccionar la referencia de la cuenta por pagar a la cual
quedarán asignados estos costos financieros.

Ejemplo

Se realiza un abono de $800.000 pesos, el abono se debe registrar a la
referencia FC-000150, para la cual se requiere registrar los intereses del
abono realizado a la referencia registrada.

En este caso en el campo "Cód. deuda" se indica la referencia FC-000150 para
que el registro de los intereses quede registrado a la referencia
correspondiente.

Observaciones

En este campo se cargan automáticamente las referencias registradas en el
primer paso de la operación.

Este dato se puede visualizar en el explorador de contabilidad.



﻿

# Concepto de pago

Corresponde a la cuenta o concepto de los costos financieros, a la cual se
realiza la imputación contable.

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta a la cual se va a registrar el costo o gasto financiero.**530520-
Intereses**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de gastos.

Se pueden registrar tantos conceptos de gastos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

El concepto de pago que se registre se verá reflejado en el documento de
impresión de la operación.

Si se indica un detalle y observación en el renglón, este reemplazará el
nombre del concepto \(Nombre de la cuenta\) por el detalle registrado en la
impresión del documento.



﻿

# CC. a cargar

Código del Centro de costos al que se le carga el costo/gasto financiero de
cada renglón

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.
Para estos movimientos se tienen creado un centro de costos para el manejo de
los intereses de proveedores.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Cc. a cargar"** se debe indicar el identificador del centro de
costos a la cual se va a registrar el costo/gasto financiero.**INT- Intereses
CXP proveedores**

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

Este dato se puede incluir en el documento de impresión de la operación.



﻿

# Valor

Aquí se debe indicar el valor que corresponde por el concepto del costo/gasto
financiero que se está registrando

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Valor"** se debe indicar el valor que corresponde por el
concepto del costo financiero que se está registrando por cada
renglón:**$10.000 pesos**

Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.



﻿

# Concepto de gastos/costos

Permite especificar una descripción u observación corta para el registro del
costo/gasto que se está realizando.

Ejemplo

se realiza un abono a la cuota número 2 de la factura **FC-000140** por valor
de $500.000 pesos, para la cual se requiere registrar los intereses
financieros del 2% que corresponde al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $10.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FC-000140.

En el campo **"Detalle"** se puede indicar una descripción u observación que
requiera para el costo/gasto financiero registrado para cada
renglón:**Intereses del 2% sobre el valor abonado cuota No 2 de la referencia
FC-000140.**

Observaciones

Esta información se podrá visualizar como descripción, en la impresión del
documento, de lo contrario, muestra el nombre de la cuenta que se este
registrando.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por pagar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
costos finan. > Detalle\].**



﻿

# Tipo de documento

Identificador del tipo de documento de soporte con el cual se requiere
soportar la transacción.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y número de factura, en
este caso activamos la opción **"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** , De esta manera, registrar el tercero, fecha de
soporte y el número de documento o referencia requerida para cada costo/gasto
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Número documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Tipo de documento"** debe indicar la identificación del
documento de soporte con el que requiere soportar cada costo/gasto financiero
registrado: **110- FACTURA DE COMPRA**

Observaciones

\[ContaPyme\] tiene pre-configurados múltiples documentos de soporte, para
seleccionar el indicado basta con dar doble clic sobre el campo o usar la
tecla F3.



﻿

# Cód. Tercero

Identificación del tercero al cual se va a registrar el abono por cada
renglón.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS que consolida el pago de 2 facturas,
Este proveedor tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene
registrada la cuenta por pagar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Se activa la opción **"Permitir hacer abonos a múltiples terceros"** para
realiza el registro de este abono. De esta manera, se nos activa la columna
adicional "Tercero" para registrar el tercero requerido de cada referencia.

Tercero: 900852956-7 - Provee ABS
---
Cód. tercero | Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
900852956/MAN - Provee ABS sede Manizales | FC-000140 | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS
900852956/PER - Provee ABS sede Pereira | FC-000160 | $1.600.000 | $600.000 | $1.000.000 | Abono a FC-000160 - CxP \(10/05/2018\) a Provee ABS

En el campo**"Código tercero"** se debe indicar el identificador del tercero
con el cual se va a registrar el abono en cada renglón: **900852956/MAN -
Provee ABS sede Manizales**

Observaciones

Para seleccionar el tercero puede dar doble clic en la columna **"Tercero"** o
con el comando **F5**.

El tercero ya debe estar creado en el catálogo de terceros.

Para que \[ContaPyme\] muestre en el seleccionador las cuentas por pagar que
tiene cada tercero, la cuenta de proveedores debe tener la configuración de
**"Maneja y exige tercero, controla endeudamiento y maneja referencia"**.

\[ContaPyme\] muestra las cuentas por pagar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono a CXP.

Para visualizar y cargar el abono a las cuentas por PAGAR del tercero la
operación donde se registró la deuda debe estar procesada.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)




﻿

# Número documento

Número del documento de soporte con el que requiere soportar los costos/gastos
financieros de cada renglón.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y número de factura, en
este caso activamos la opción **"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** , De esta manera, registrar el tercero, fecha de
soporte y el número de documento o referencia requerida para cada costo/gasto
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Número documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Número documento"** debe indicar la referencia o número del
documento de soporte que sustenta cada costo/gasto financiero registrado, de
esta manera, por medio de los informes se podrá consultar el interés
registrado por cada referencia.




﻿

# Fecha

Específique la fecha de soporte para la contabilización por renglón de cada
registro

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y número de factura, en
este caso activamos la opción**"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** De esta manera, registrar el tercero, fecha de
soporte y el número de documento o referencia requerida para cada costo/gasto
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Fecha"** debe indicar la fecha de soporte con la cual requiere
registrar cada costo/gasto financiero registrado.

Observaciones

La fecha debe estar dentro del mismo mes que la fecha de soporte de la
operación de abono a CXP.



﻿

# Tercero

Código o identificación del tercero con el cual se registra el costo/gasto
financiero por cada renglón.

Ejemplo



Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal, en este caso activamos la
opción **"Permitir diferentes tipo de documentos y terceros para cada
ingreso"** , De esta manera, se nos activa la columna adicional **"Tercero"**
para registrar el tercero requerido de cada costo/gasto financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

En el campo **"Tercero"** debe indicar la identificación del tercero que
corresponde para cada costo/gasto financiero registrado.

Observaciones

Si alguna cuenta de las registradas en la lista de "Detalle de los costos
financieros" está marcada para exigir tercero, el dato "Tercero" será
obligatorio.



﻿

# Diferente información de soporte por cada egreso

Al activar esta opción, se visualizarán las columnas adicionales que permite
asignar un tipo de documento, número de documento, fecha y tercero distinto
para cada renglón.

Ejemplo

Se realiza un abono a las cuentas por pagar pendientes de **$1.000.000** de
pesos al proveedor 900852956 - Provee ABS, Este proveedor tiene 2 sucursales
para lo cual en \[ContaPyme\] se tiene registrada la cuenta por pagar de cada
sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal y factura de compra, en
este caso activamos la opción **"Permitir diferentes tipo de documentos y
terceros para cada ingreso"** , De esta manera, se activan las columnas
adicionales de: **tipo de documento, número de documento, fecha y tercero**
para cada renglón y así registrar los datos requerido para cada costo/gasto
financiero registrado.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Número documento | Fecha | Tercero
---|---|---|---|---|---|---|---
530520- Intereses | INT- Intereses CXP proveedores | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000140. | 110- FACTURA DE COMPRA | FC-000140 | 11/05/2018 | 900852956/MAN - Provee ABS sede Manizales
530520- Intereses | INT- Intereses CXP proveedores | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000160. | 110- FACTURA DE COMPRA | FC-000160 | 11/05/2018 | 900852956/PER - Provee ABS sede Pereira

Observaciones

En este caso, la fecha debe estar dentro del mismo mes que la fecha de soporte
de la operación.

Al momento de procesar la operación la información de los costos financieros
quedará registrada con los datos que se indiquen en cada una de las columnas y
se podrá visualizar el los exploradores e informes contables.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)




﻿

# Permite hacer abonos mayores a los saldos?

Active esta opción si requiere realizar un abono mayor al saldo de la
referencia registrada en la operación.

Ejemplo

Se tiene pendiente una cuenta por pagar con el Proveedor Provee ABS de la
factura FC-000150 por valor de 380.000 pesos, el cliente realiza un abono a la
factura por valor de $400.000 pesos.

Como el valor del abono es mayor al saldo de la cuenta por pagar se activa la
opción **"Permite hacer abonos mayores a los saldos"**.

Al procesar la operación quedarían registrados los $20.000 pesos sobrantes en
negativo para la cuenta por pagar seleccionada en la operación, para luego
poder realizar un cruce entre cuentas por ejemplo contra la cuenta de
efectivo.

Observaciones



Este dato se puede consultar en los informes de cartera y proveedores.



﻿

# Cargar todas las cuentas

Carga todas las cuentas por pagar pendientes para el tercero seleccionado.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos. Se emite un cheque por
valor de **$3.500.000 de pesos** para cancelar las cuentas por pagar que se
tienen pendientes con el proveedor.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por pagar registradas para el tercero seleccionado y realizar el
respectivo abono.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $2.500.000 |
FC-000160 | $1.000.000 | $1.000.000 |

Observaciones

Este botón carga por defecto todas las cuentas por cobrar pendientes del
tercero seleccionado a la fecha que tienen la operación de abono a CXC.



﻿

# Abonar monto

Permite abonar un monto dado a cuentas por pagar al tercero.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos. Se emite un cheque por
valor de **$1.600.000 de pesos** para realizar un abono a las cuentas por
pagar que se tienen pendientes con el proveedor.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por pagar registradas para el tercero seleccionado.

Luego, se da clic en el botón **"Abonar monto"** Para indicar el valor de
**$1.600.000 de pesos** que se está abonando a las cuentas por pagar
pendientes con el proveedor.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $800.000 | $1.700.000
FC-000160 | $1.000.000 | $800.000 | $200.000

Observaciones

El monto dado en la opción **"Abonar monto"** , \[ContaPyme\] reparte de forma
equitativa el valor abonando para cada referencia seleccionada en la
operación. Para este caso asigno el valor de **$800.000 pesos** en la columna
**"valor abono"** para cada una de las referencias seleccionadas.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos.
Para este caso se realiza un abono a la cuota número 2 de la factura
**FC-000140** por valor de $500.000 pesos.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el abono puede clic el botón **"Visualizar el documento impreso"**
, y el sistema le muestra una vista previa del documento con toda su
información.

.
![290.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV3%20-%20Abono%20a%20CxP/%5B14170%5D%20FrmDlgOprMov3/290.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por pagar.



﻿

# Permite hacer abonos a múltiples terceros

Active esta opción si requiere registrar abonos a diferentes terceros en el
mismo comprobante.

Ejemplo

Se emite un cheque por valor de **$1.000.000** de pesos parar realizar un
abono a las cuentas por pagar pendientes con el proveedor **900852956 - Provee
ABS** , este proveedor tiene 2 sucursales para lo cual en **\[ContaPyme\]** se
tiene registrada la cuenta por pagar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura de compra **FC-000140** de la sucursal de Manizales, y
se realizó un abono de $600.000 pesos para la factura de compra **FC-000160**
de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero sucursal, en este caso activamos la
opción **"Permitir diferentes tipo de documentos y terceros para cada
ingreso"** , De esta manera, se nos activa la columna adicional "Tercero" para
registrar el tercero requerido de cada costo/gasto financiero.



﻿

# Cuenta por pagar

Identificación o referencia de la cuenta por pagar a la cual se va a realizar
el abono.

Ejemplo

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura **FC-000140** por valor de $2.500.000 pesos y la
factura **FV-000160** por valor de $1.000.000 de pesos.
Para este caso se realiza un abono a la cuota número 2 de la factura
**FC-000140** por valor de $500.000 pesos.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
FC-000140 | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS

En el campo **"Cuenta por pagar"** debe seleccionar la referencia a la cual se
requiere registrar el abono: **FC-000140**.

Observaciones

Para indicar la referencia a la cual va a realizar el abono debe dar doble
clic sobre la columna **"Cuenta por pagar"** o con el comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero, y se podrá visualizar información
como:**La fecha de soporte, la fecha de vencimiento, el saldo actual, entre
otra información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por pagar registrada para el tercero con su saldo, la cuenta de cartera
debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda.
De lo contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**"N/D no definido".**

**Ejemplo:**
Para la cuenta de proveedores no se tiene la configuración **"Maneja y exige
tercero, controla endeudamiento" y "maneja referencia"**.

Se tienen 2 facturas pendientes por pagar con el proveedor **900852956-7 -
Provee ABS** , la factura la factura **FC-000140** por valor de $2.500.000
pesos y la factura **FV-000160** por valor de $1.000.000 de pesos.

En este caso las cuentas por pagar para este tercero se muestra de la
siguiente forma:

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
N/D | $3.500.000 | $500.000 | $3.000.000
Si se requiere realizar un abono a la factura **FV-000140** y se necesita
saber cuál es su saldo, no se podrá visualizar ya que el \[ContaPyme\] al
verificar que la cuenta no tiene la configuración de **"Maneja y exige
tercero, controla endeudamiento" y "maneja referencia"** como referencia
asigna la identificación **N/D** , es decir **"No definida"** y como saldo
muestra el total de todas las cuentas por pagar registradas para ese tercero.

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] muestra las cuentas por pagar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono CXP.




Configuración

Para realizar a configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de proveedores, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de proveedores a la que se va
a registrar el abono.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura FC-000140 por una compra de materia prima por valor de $2.500.000
pesos al proveedor 900852956-7 - Provee ABS, y se necesita registrar de que
sede es la cartera.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo | Observaciones
FC-000140 | 1PROV- Pago CXP sede centro | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS

En el campo **"Centro de costos"** debe indicar el identificador del centro de
costo de la cuenta por pagar seleccionada: **1PROV** \- Pago CXP sede centro.

Observaciones

El centro de costos/nodo puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por pagar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda,
Normalmente para que se cruce el abono se indica el mismo centro de costo con
el que se originó la deuda.

Para el manejo de centros de costos la cuenta de proveedores debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)



Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por pagar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Centros de costos\].**



﻿

# Saldo actual

Saldo actual de la cuenta por cobrar seleccionada a la fecha registrada en la
operación.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura de compra FC-000140 por una compra de materia prima por valor de
$2.500.000 pesos al proveedor 900852956-7 - Provee ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $500.000 | $2.000.000

En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por pagar seleccionada en el renglón:**$2.500.000**.

Observaciones

Al seleccionar la cuenta por pagar el sistema trae automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Saldo\].**



﻿

# Valor abono

Valor abonado a la cuenta/cuota por pagar de la referencia seleccionada.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura de compra FC-000140 por una compra de materia prima por valor de
$2.500.000 pesos al proveedor 900852956-7 - Provee ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $500.000 | $2.000.000
En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
pagar selecionada en el renglón:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original por cada tercero y referencia la cuenta
contable debe tener el manejo **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"**.

El valor abonado que se registre para cada cuenta por cobrar se podrá
visualizar en los informes de proveedores.

Configuración

Para realizar a configuración de **"controla endeudamiento" y "maneja
referencia"** a la cuenta de cartera, ver: **\[Pestaña: Contabilidad > Plan de
cuentas > Seleccionar cuenta: Clic derecho modificar > Activar opciones:
"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"\].**



﻿

# Nuevo saldo

Nuevo saldo de la cuenta por pagar después de registrar el valor abonado.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura de compra FC-000140 por una compra de materia prima por valor de
$2.500.000 pesos al proveedor 900852956-7 - Provee Equipos ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo
FC-000140 | $2.500.000 | $500.000 | $2.000.000

En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por pagar después de registrar el valor abonado por
cada renglón:**$2.000.000**.

Observaciones

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y nos muestra el nuevo saldo con el que quedará la deuda después
de procesar la operación.

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original por cada tercero, por cada referencia y nos
muestre el nuevo saldo, la cuenta contable debe tener configurado de:
**"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"** ,
ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic
derecho modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

El valor del nuevo saldo de las cuentas por pagar se podrá visualizar en los
informes de proveedores.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Nuevo saldo\].**



﻿

# Observaciones

Observaciones sobre la cuenta por pagar que se está cancelando o registrando
un abono.

Ejemplo

Se realiza un abono de $500.000 pesos a la deuda que se tiene por pagar de la
factura FC-000140 por una compra de materia prima por valor de $2.500.000
pesos al proveedor 900852956-7 - Provee ABS.

Tercero: 900852956-7 - Provee ABS
---
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
FC-000140 | $2.500.000 | $500.000 | $2.000.000 | Abono a FC-000140 - CxP \(10/05/2018\) a Provee ABS

En el campo **"Observaciones"** Se debe indicar la información que requiere
registrar para la cuenta por pagar del renglón:**"Abono a FC-000140 - CxP
\(10/05/2018\) a Provee ABS"**.

Observaciones

Al seleccionar la cuenta por pagar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo el sistema la toma como descripción
de la cuenta por pagar para el documento de impresión y los informes de
proveedores.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxP\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxP > Observaciones\].**



# Acerca de ventana

## ABONO A CUENTAS POR PAGAR



## Objetivo

Esta ventana tiene como finalidad el registro de los abonos a cuentas por
pagar que tiene la empresa.

La operación de abonos a cuentas por pagar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente la empresa con un tercero. También
permite en una misma operación realizar abonos a múltiples terceros activando
la opción “Permitir hacer abonos a múltiples terceros”.

En la operación de abonos a cuentas por pagar se podrán detallar los
diferentes costos financieros que se han causado por motivo del crédito, como:
impuestos, intereses y comisiones desde el paso “Detalle de otros costos
financieros”.

Esta operación es de gran ayuda para los usuarios no contadores que conocen la
información básica de la transacción pero no tienen suficientes bases para el
manejo de la contabilidad.

## Ejemplo de información a registrar

Registrar el abono de $600.000 pesos a la cuenta por pagar que se tiene
pendiente con el proveedor ASB LTDA correspondiente a la factura de compra
FC-00256.

La información relevante para registrar el abono a cuentas por pagar es:

  * El tercero al cual se le hará el abono.
  * El código de la cuenta por pagar o referencia a la que se le realizará el abono.
  * Valor a abonar.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de egreso, este tipo de documento se
puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También es necesario identificar la fecha de soporte y el tercero a quien se
está realizando el abono a la cuenta por pagar.

## Registro

Se selecciona la cuenta por pagar a la cual se realizará el abono y el valor
abonado que corresponda por cada renglón.

\[Contapyme\] automáticamente muestra el saldo actual y el nuevo saldo de la
cuenta por pagar a la fecha que tenga la operación y según el valor abonado.

Si no se ha especificado un tercero, el seleccionador presentará todas las
cuentas por pagar a terceros, de tal manera que al seleccionarse una,
automáticamente se llenarán los campos del tercero e identificación de la
cuenta.

## Totales registrados

Muestra los totales del saldo y abonos de las cuentas por pagar registradas en
la operación.

## Detalle de los ingresos financieros

En este paso se puede detallar los diferentes costos financieros que se han
causado por motivo del crédito, como: impuestos, intereses, comisiones, etc.

La información relevante para registrar en este paso es:

  * Centro de costos al cual se le cargará el gasto.
  * Concepto de egresos \(Cuenta\).
  * Valor del gasto financiero.

## Liquidación

Registro de los descuentos, cargos o impuestos causados en el abono a la
cuenta por pagar.

## Forma de pago

Forma como se cancelará el pago del abono a la cuenta por pagar y demás cargos
o descuentos relacionados en esta operación:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXP\).
  * Cruce \(cruce con CXC al tercero\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Impresión de soportes

La operación de abono a cuentas por pagar permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de abono a CxP.
  * Comprobante de egreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Disminuyendo o cancelando la cuenta por pagar al tercero o muchas cuentas por pagar para el caso de cuotas pendientes y un abono que las cubre.
  * Llevando al gasto los costos financieros, si los hay.
  * Procesando los descuentos o cargos.
  * Procesando la forma de pago.





---

### MOV4 -Abono a CxC

#### [14190] FrmDlgOprMov4

﻿

# Vr. otra moneda

Valor abonado en moneda extranjera.

En esta columna se puede especificar el valor del abono equivalente en moneda
extranjera.

Esta columna solamente se habilita para edición, en caso de que la cuenta se
maneje en moneda extranjera y además, la configuración para el manejo de
moneda extranjera permita la edición de este valor.

Observaciones

Normalmente, solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se debería habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
cartera.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Catálogo Plan de Cuentas > Configuración > Configuraciones generales >
Valor de moneda automático\].**



﻿

# Tercero

Corresponde al código o identificación del tercero con el cual se tiene la
cuenta por cobrar y del cual se va a recibir el abono.

Ejemplo

El cliente PC-Madrigal realiza un abono de **$500.000 pesos** a la deuda que
tiene con la factura **FV-000235** por valor de **$1.500.000 pesos** , así que
en el campo **"Tercero"** indique el código o identificación del tercero al
cual se tiene asociada la cuenta por cobrar: **900852956 -PC-Madrigal**

Observaciones

El tercero ya debe estar creado en la base de datos. Al indicar el código o
identificador del tercero, el sistema filtra automáticamente todas las cuentas
por cobrar que ese tercero tenga registradas.

Para que \[ContaPyme\] filtre las cuentas por cobrar que tiene cada tercero,
la cuenta contable debe tener la configuración de **"Maneja y exije tercero,
controla endeudamiento y maneja referencia"**.

ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta la
fecha que tenga configurada la operación de abono a CXC.

También se tiene la posibilidad de realizar abonos a CXC para múltiples
terceros, para ello se debe activar la columna tercero, ver:**\[Operación
Abono CXC > Menú: Opciones > Activar opción: Permitir hacer abonos a múltiples
terceros\].**



﻿

# Referencia

Seleccione el perfil del vendedor o la referencia de castigo y/o bonificación
que requiere aplicar para la comisión del vendedor del recaudo.

Ejemplo



El vendedor: 14856296 - MANUELA RENDON tiene configurado un perfil de
comisiones que le otorga un 5% de comisión por recaudo, pero en algunos
recaudos se otorga una comisión adicional especial del 2% o bajo ciertas
situaciones se tiene que el vendedor pierda el 4% de las comisiones del
recuado.

Perfil del vendedor | Referencia | Aplica a | Tipo de cálculo | % a aplicar | PGR | \[ESPECIAL\] | Recaudos | Aumentar porcentaje comisión en el porcentaje dado.  | 2%
---|---|---|---|---
PGR | \[CASTIGO\] | Recaudos | Disminuir porcentaje comisión en el porcentaje dado. | 4%

Para que al realizar el abono a la cuenta por cobrar se liquide esa comisión
especial debe seleccionar la referencia **\[ESPECIAL\]** , previamente
configurada en el perfil del vendedor, aumentando así la comisión del 5% al
7%.

Observaciones

Un vendedor puede manejar varios perfiles y por medio de este botón se puede
seleccionar que perfil del vendedor y referencia de castigo o bonificación se
va a manejar para la liquidación de comisiones del vendedor en el recaudo.

Después de seleccionar el perfil y la referencia de castigo y/o bonificación
el sistema lo aplicará automáticamente en las comisiones del vendedor de cada
recaudo y se puede visualizar desde el paso de liquidación de comisiones de la
operación.

Configuración

Para definir las referencias de castigos o bonificaciones en el perfil de
vendedor, ver: **\[Pestaña: Básico > Catálogo terceros > Clic derecho:
Catálogos asociados > Perfiles de vendedores > Seleccionar el perfil > Clic
derecho: Modificar > Pestaña: Castigos y/o bonificaciones\].**

Para definir al vendedor los perfiles de vendedor que va a manejar, ver:
**\[Pestaña: Básico > Catálogo terceros > Clic derecho: Catálogos asociados >
Perfiles de vendedores > Seleccionar el perfil > Clic derecho: Modificar >
Pestaña: Castigos y/o bonificaciones\].**



﻿

# Vendedor

Vendedor de la cuenta por cobrar que está recaudando la cartera.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal | Vendedor: 25576890- Patricia Quintero
---|---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Vendedor"** se debe indicar el identificador del tercero
correspondiente del abono.**25576890- Patricia Quintero**.

Observaciones

Este dato se puede incluir en el documento de impresión de la operación.

En los exploradores de cartera se tienen la posibilidad de agregar la columna
vendedor con el que se realizó el abono a cuentas por cobrar.

Si este gana comisiones por recaudo, se calculan y se generan automáticamente
al procesar la operación.

El botón "ref." se puede usar para asignar otro perfil de vendedor y aplicar
referencias que modifiquen el cálculo de comisiones. Para mayor información
[Ver más](<\[300\]GridComisionesRcdo_Col002>)


Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Datos maestros de la operación
> Vendedor\].**



﻿

# Recaudador

Persona responsable de cobrar o recibir el abono.

Ejemplo

Se recibe un abono de **$500.000 pesos** , el abono se debe realizar a la
factura **FV-000235** que realizó el vendedor **Patricia Quintero** al cliente
PC-Madrigal.
Aunque la venta la realizó el vendedor **Patricia Quintero** no es la
responsable del recaudo, el responsable del recaudo es un empleado del área de
cartera: **Carlos Osorio.**

Tercero: 900852956-7 - PC-Madrigal | Vendedor: 25576890- Patricia Quintero | Recaudador: 1054789562- Carlos Osorio
---|---|---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Recaudador"** se debe indicar el identificador del tercero que
realizó el cobro o recaudo de la deuda.**1054789562- Carlos Osorio**.

Observaciones

Existen empresas donde manejan el vendedor de las ventas como responsables de
recaudar la cartera, pero cuando las empresas tienen un departamento de
cartera el responsable de recuadar la cartera no es el mismo que el vendedor
que realiza la venta. En este caso se tiene la posibilidad de indicar el
vendedor de la factura de venta y el responsable de recaudar la cartera.

Si el tercero recaudador gana comisiones por recaudo, se calculan y se generan
automáticamente al procesar la operación.

Este dato se puede incluir en el documento de impresión de la operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Datos maestros de la operación
> Recaudador\].**



﻿

# Fecha de referencia para comisiones

Corresponde a la fecha que se usará para la liquidación de comisiones en
recaudo y la aplicación de castigos que correspondan.

Ejemplo

El vendedor: 14856296 - Manuela Rendon tiene configurado un perfil de
comisiones que le otorga un 5% de comisión por recaudo y un castigo del 1% por
mora en los pagos de 30 días y 2% por mora en los pagos de 60 días en
adelante.

En la empresa para las comisiones en recaudo que se castigan según la fecha de
pago. Se tiene la política para que no se tome la fecha del recibo o del abono
a CXC sino la fecha real en que entro el dinero. Esa fecha se puede configurar
en el campo **"Fecha de referencia para comisiones".**

Observaciones

Por defecto esta fecha es la misma de la operación, pero puede ser modificada
según el criterio del usuario.



﻿

# Total saldos

Valor total del saldo que trae cada una las referencias registradas en la
operación

Ejemplo

Se recibe un abono de una cartera que tiene pendiente el cliente PC-Madrigal,
realizó un abono de $500.000 pesos para la referencia FV-000235 que tiene un
saldo por valor de $1.500.000 pesos y realizó un abono por valor de $300.000
pesos para la referencia FV-000255 que tiene un saldo de $800.000 pesos.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/150.png)

En el campo **"Total saldos"** el sistema muestra el valor total del saldo
actual que trae cada una las referencias registradas en la
operación:**$2.300.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Total abonos

Valor total de los abonos realizados a cada una de las referencias registradas
en al operación.

Ejemplo

Se realiza un abono de unas cuentas por pagar que tiene pendiente el cliente
PC-Madrigal, realizó un abono de $500.000 pesos para la referencia FV-000235
que tiene un saldo por valor de $1.500.000 pesos y realizó un abono por valor
de $300.000 pesos para la referencia FV-000315 que tiene un saldo de $800 000
pesos.

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/160.png)

En el campo **"Total abonos"** el sistema muestra el valor total de los abonos
realizados en cada una las referencias registradas en la
operación:**$800.000**

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.



﻿

# Cód. deuda

Si el abono a la cuenta por cobrar genera impuestos, intereses, comisiones,
etc., se debe seleccionar la referencia de la cuenta por cobrar a la cual
quedarán asignados estos costos financieros.

Aquí también se pueden registrar los descuentos financieros condicionados, es
decir, los que dependen del cumplimiento con que se hagan los abonos.

Ejemplo



Se recibe un abono de $600.000 pesos, el abono se debe registrar a las
referencias FV-000235 y FV-000243, para la cual se requiere registrar el
descuento por pronto pago del abono realizado a la factura FV-000243.

En este caso en el campo "Cód. deuda" se indica la referencia FV-000243 para
que el registro del descuento por pronto pago quede registrado a la referencia
correspondiente.

Observaciones

En este campo se cargan automáticamente las referencias registradas en el
primer paso de la operación.

Este dato se puede visualizar en el explorador de contabilidad.



﻿

# Concepto de pago

Corresponde a la cuenta o concepto del ingreso financiero, a la cual se
realiza la imputación contable.

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235 para la cual se requiere registrar los intereses
financieros que corresponden al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Intereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta a la cual se va a registrar el ingreso financiero.**421005- Intereses**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de ingresos.

Se pueden registrar tantos conceptos de ingresos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

El concepto de pago que se registre se verá reflejado en el documento de
impresión de la operación.

Si se indica un detalle y observación en el renglón, este reemplazará el
nombre del concepto \(Nombre de la cuenta\) por el detalle registrado en la
impresión del documento.



﻿

# Cód. Tercero

Identificación del tercero con el cual se va a registrar el abono por cada
renglón.

Ejemplo

Se recibe un cheque por valor de **$1.000.000** de pesos de la empresa **PC-
Madrigal** que consolida el pago de 2 facturas. Este cliente tiene 2
sucursales para lo cual en \[ContaPyme\] se tiene registrada la cuenta por
cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de
**$400.000** pesos para la factura **FV-000300** de la sucursal de Pereira, y
se realizó un abono de **$600.000** pesos para la factura **FV-000235** de la
sucursal de Manizales.

Se activa la opción **"Permitir hacer abonos a múltiples terceros"** para
realiza el registro de este abono. De esta manera, se nos activa la columna
adicional **"Tercero"** para registrar el tercero requerido de cada
referencia.

Cód. tercero | Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
---|---|---|---|---
900852956-7/PER - PC-Madrigal sede Pereira | FV-000300 | $800.000 | $400.000 | $400.000
900852956-7/MAN - PC-Madrigal sede Manizales | FV-000235 | $1.500.000 | $600.000 | $900.000
En el campo**"Código tercero"** se debe indicar el identificador del tercero
con el cual se va a registrar el abono en cada renglón: **900852956-7/MAN -
PC-Madrigal sede Manizales.**

Observaciones

Para seleccionar el tercero puede dar doble clic en la columna **"Tercero"** o
con el comando **F5**.

El tercero ya debe estar creado en el catálogo de terceros.

Para que \[ContaPyme\] muestre en el seleccionador las cuentas por cobrar que
tiene cada tercero, la cuenta de cartera debe tener la configuración de
**"Maneja y exige tercero, controla endeudamiento y maneja referencia"**.

\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono a CXC.

Para visualizar y cargar el abono a las cuentas por cobrar del tercero la
operación donde se registró la deuda debe estar procesada.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)




﻿

# CC. a cargar

Código del Centro de costos al que se le carga el ingreso financiero de cada
renglón

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235 para la cual se requiere registrar los intereses
financieros.

Para estos movimientos se tienen creado un centro de costos para el manejo de
los intereses de cartera.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Itereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Cc. a cargar"** se debe indicar el identificador del centro de
costos a la cual se va a registrar el ingreso financiero.**INT- Itereses
cartera**

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/Cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

Este dato se puede incluir en el documento de impresión de la operación.



﻿

# Valor

Aquí se debe indicar el valor que corresponde por el concepto del ingreso
financiero que se está registrando.

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235, para la cual se requiere registrar los intereses
financieros que corresponden al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Itereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Valor"** se debe indicar el valor que corresponde por el
concepto del ingreso financiero que se está registrando por cada
renglón:**$10.000 pesos**

Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.




﻿

# Concepto de ingresos

Permite especificar una descripción u observación corta para el registro del
ingreso que se está realizando.

Ejemplo

Se recibe un abono de $500.000 pesos, el abono se debe realizar a la cuota No.
1 de la factura FV-000235 para la cual se requiere registrar los intereses
financieros que corresponden al abono realizado.

Concepto de pago | Cc. a cargar | Valor | Detalle
---|---|---|---
421005- Intereses | INT- Itereses cartera | $10.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.

En el campo **"Detalle"** se puede indicar una descripción u observación que
requiera para el ingreso financiero registrado para cada renglón:**Intereses
del 2% sobre el valor abonado cuota No 1 de la referencia FV-000235.**

Observaciones

Esta información se podrá visualizar como descripción, en la impresión del
documento, de lo contrario, muestra el nombre de la cuenta que se este
registrando.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
costos finan. > Detalle\].**



﻿

# Tipo de documento

Identificador del tipo de documento de soporte con el cual se requiere
soportar la transacción.

Ejemplo

Se recibe un abono de $100.000.000 pesos de la empresa PC-Madrigal, Este
cliente tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene registrada
la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura FV-000235 de la sucursal de Manizales, y se realizó un
abono de $600.000 pesos para la factura FV-000300 de la sucursal de Pereira.

Para el registro de los intereses financieros, se requiere detallar el interés
del abono que se realizó para cada tercero y número de factura, en este caso
activamos la opción **"Permitir diferentes tipo de documentos y terceros para
cada ingreso"** , De esta manera, registrar los tipos de documento de soporte
y el número de documento o referencia requerida para cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 10- Factura de venta | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 10- Factura de venta | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Tipo de documento"** debe indicar la identificación del
documento de soporte con el que requiere soportar cada ingreso financiero
registrado: 10- Factura de venta

Observaciones

\[ContaPyme\] tiene pre-configurados múltiples documentos de soporte, para
seleccionar el indicado basta con dar doble clic sobre el campo o usar la
tecla F3.



﻿

# Número documento

Número del documento de soporte con el que requiere soportar los ingresos
financieros de cada renglón.

Ejemplo

Se recibe un abono de **$100.000.000 pesos** de la empresa PC-Madrigal, Este
cliente tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene registrada
la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura **FV-000235** de la sucursal de Manizales, y se realizó
un abono de $600.000 pesos para la factura **FV-000300** de la sucursal de
Pereira.

Para el registro de los intereses financieros, se requiere detallar el interés
del abono que se realizó para cada tercero y número de factura, en este caso
activamos la opción **"Permitir diferentes tipo de documentos y terceros para
cada ingreso"** , De esta manera, registrar el tercero, fecha de soporte y el
número de documento o referencia requerida para cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 10- Factura de venta | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 10- Factura de venta | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Documento"** debe indicar la referencia o número del documento
de soporte que sustenta cada ingreso financiero registrado, de esta manera,
por medio de los informes se podrá consultar el interés registrado por cada
factura.




﻿

# Fecha

Específique la fecha de soporte para la contabilización por renglón de cada
registro.

Ejemplo



Se recibe un abono de **$1.000.000 pesos** de la empresa **PC-Madrigal** ,
Este cliente tiene 2 sucursales para lo cual en **\[ContaPyme\]** se tiene
registrada la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de **$400.000
pesos** para la factura **FV-000235** de la sucursal de Manizales, y se
realizó un abono de **$600.000 pesos** para la factura **FV-000300** de la
sucursal de Pereira.

Para el registro de los intereses financieros, se requiere detallar el interés
del abono que se realizó para cada tercero y número de factura, en este caso
activamos la opción**"Permitir diferentes tipo de documentos y terceros para
cada ingreso"** , De esta manera, registrar el tercero, fecha de soporte y el
número de documento o referencia requerida para cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 10- Factura de venta | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 10- Factura de venta | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Fecha"** debe indicar la fecha de soporte con la cual requiere
registrar cada ingreso financiero registrado.

Observaciones

La fecha debe estar dentro del mismo mes que la fecha de soporte de la
operación de abono a CXC.



﻿

# Tercero

Código o identificación del tercero con el cual se registra el ingreso
financiero por cada renglón.

Ejemplo

Se recibe un abono de **$1.000.000** de pesos de la empresa PC-Madrigal, Este
cliente tiene 2 sucursales para lo cual en \[ContaPyme\] se tiene registrada
la cuenta por cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura **FV-000235** de la sucursal de Manizales, y se realizó
un abono de $600.000 pesos para la factura **FV-000300** de la sucursal de
Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero, en este caso activamos la opción
**"Permitir diferentes tipo de documentos y terceros para cada ingreso"** , De
esta manera, se nos activa la columna adicional **"Tercero"** para registrar
el tercero requerido en cada ingreso financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Itereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 130- Comprobante de ingreso | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Itereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 130- Comprobante de ingreso | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira

En el campo **"Tercero"** debe indicar la identificación del tercero que
corresponde para cada ingreso financiero registrado.

Observaciones

Si alguna cuenta de las registradas en la lista de "Detalle de los ingresos
financieros" está marcada para exigir tercero, el dato "Tercero" será
obligatorio.



﻿

# Permitir diferentes tipo de documentos y terceros para cada ingreso

Al activar esta opción, se visualizarán las columnas adicionales que
permitirán asignar un tipo de documento, número de documento, fecha y tercero
distinto para cada renglón.

Ejemplo

Se recibe un abono de 1 millón de la empresa PC-Madrigal, este cliente tiene 2
sucursales para lo cual en \[ContaPyme\] se tiene registrada la cuenta por
cobrar de cada sucursal.

El abono se registró de la siguiente manera: se realizó un abono de $400.000
pesos para la factura FV-000235 de la sucursal de Manizales, y se realizó un
abono de $600.000 pesos para la factura FV-000300 de la sucursal de Pereira.

Para el registro de los intereses financieros se requiere detallar el interés
del abono que se realizó para cada tercero y referencia, en este caso
activamos la opción **"Permitir diferentes tipos de documentos y terceros para
cada ingreso"** , de esta manera, se activan las columnas adicionales de:
**tipo de documento, número de documento, fecha y tercero** para cada renglón
y así registrar el tercero y referencia requerida para cada ingreso
financiero.

Concepto de pago | Cc. a cargar | Valor | Detalle | Tipo de documento | Documento | Fecha | Tercero
---|---|---|---|---|---|---|---
421005- Intereses | INT- Intereses cartera | $8.000 | Intereses del 2% sobre el valor abonado cuota No 2 de la referencia FV-000235. | 130- Comprobante de ingreso | FV-000235 | 11/05/2018 | 900852956-7/MAN - PC-Madrigal sede Manizales
421005- Intereses | INT- Intereses cartera | $12.000 | Intereses del 2% sobre el valor abonado cuota No 1 de la referencia FV-000300. | 130- Comprobante de ingreso | FV-000300 | 11/05/2018 | 900852956-7/PER - PC-Madrigal sede Pereira


Observaciones

En este caso, la fecha debe estar dentro del mismo mes que la fecha de soporte
de la operación.

Al momento de procesar la operación la información de otros ingresos
financieros quedará registrada con los datos que se indiquen en cada una de
las columnas y se podrá visualizar en los exploradores e informes contables.

Para saber sobre el manejo de sucursales en \[ContaPyme\]. [Ver
más](<../../../../010 BS/Cats/Terceros/\[11370\]
FrmTerceros/\[40\]CBox_BSucursales.html>)

**NOTA:** Esta opción se habilitará automáticamente en caso de que este
habilitado el manejo de intereses para CxC.
Para habilitar el manejo de intereses diríjase a **\[ Módulo de cartera >
Configuración > Asistente de configuración del módulo de cartera y proveedores
> Habilitar manejo de intereses \]**



﻿

# Ref. \#

Referencia del crédito o número de factura a la cual se está abonando.

Ejemplo

El vendedor 14856296 - Manuela Rendón realiza un recaudo de 2 facturas de
venta, en el campo "Ref. \#" se muestra el número de referencia o número de la
factura para la cual se está realizando el abono y se está aplicando la
comisión para el vendedor.

![300.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/300.png)



﻿

# Cuenta por cobrar

Identificación o referencia de la cuenta por cobrar a la cual se va a
registrar el abono.

Ejemplo

El cliente **900852956 - PC-Madrigal** tiene 2 facturas pendientes por pagar,
la factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $800.000 pesos.

Para este caso el cliente se realiza un abono a la cuota número 2 de la
factura **FV-000235** por valor de $500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000
En el campo **"Cuenta por cobrar"** debe seleccionar la referencia a la cual
se requiere registrar el abono: **FV-000235**.

Observaciones

Para indicar la referencia a la cual va a realizar el abono debe dar doble
clic sobre la columna **"Cuenta por cobrar"** o con el comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero, y se podrá visualizar información
como:**La fecha de soporte, la fecha de vencimiento, el saldo actual, entre
otra información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por cobrar registrada para el tercero con su saldo, la cuenta de
cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda.

De lo contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**"N/D no definido".**
**Ejemplo:**
Para la cuenta de cartera no se tiene la configuración **"Maneja y exige
tercero, controla endeudamiento" y "maneja referencia"**.

El cliente **900852956-7 - PC-Madrigal** tiene 2 facturas pendientes por
pagar, la factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $800.000 pesos.

En este caso las cuentas por cobrar para este tercero se muestra de la
siguiente forma:

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
N/D | $2.300.000 | $500.000 | $1.800.000
Si el cliente requiere realizar un abono a la factura **FV-000235** y se
necesita saber cuál es su saldo, no se podrá visualizar ya que el
\[ContaPyme\] al verificar que la cuenta no tiene la configuración de
**"Maneja y exige tercero, controla endeudamiento" y "maneja referencia"**
como referencia asigna la identificación **N/D** , es decir **"No definida"**
y como saldo muestra el total de todas las cuentas por cobrar registradas para
ese tercero.

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada la operación de abono CXC.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Perfil vendedor

Código de identificación del perfil de comisión asignado al vendedor
relacionado en esta operación.

El perfil del vendedor define las especificaciones para el cálculo de
comisiones por venta y/o recaudo.

Ejemplo

La empresa Tecnología y Espacios tiene establecidos los siguientes perfiles
para vendedores:

Código Perfil | Nombre Perfil | Comisión por venta | Comisión por recaudo | PGR | Comisión por recaudo |  | 5%
---|---|---|---
PGV | Comisión por venta al por mayor | 3% |

Al vendedor **14856296- Manuela Rendon** se le ha asignado el perfil:**PGR -
Comisión por recaudo**. Por tanto, al momento de realizar el abono a cuentas
por cobrar el sistema indicará como "Perfil vendedor" el identificador:
**PGR**.

![310.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/310.png)



Observaciones

Un vendedor puede tener asignados diferentes perfiles de vendedores.

El perfil del vendedor debe estar previamente configurado en el catálogo de
perfiles de vendedores, ver: **\[Pestaña: Básico > Catálogo de terceros > Clic
derecho: Catálogos asociados > Perfiles de vendedores\].**

Para asignar a un tercero un perfil de vendedor, ver: **\[Pestaña: Básico >
Catálogo de terceros > Seleccionar tercero > Pestaña: Datos vendedor\].**

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Número de autorización

Número de autorización con la cual se asignó al vendedor el perfil de vendedor
relacionado en esta operación.

Ejemplo

La empresa Tecnología y Espacios cuenta con dos vendedores, que tienen
asignados los siguientes perfiles:

Identificación vendedor | Nombre vendedor | Autorización | Perfil | 75098562 | Rogelio Duque | A-15300 | PGV
---|---|---|---
14856296 | Manuela Rendon | A-1051 | PGR

Al momento de realizar la liquidación de comisiones en el recaudo para el
vendedor: 14856296 - Manuela Rendon, el sistema indicará como "Perfil
vendedor" el identificador: **PGR** y "No. Autorización": **A-1051**.

![320.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/320.png)



﻿

# Cód. vendedor

Código de identificación del tercero \(vendedor\) al que se liquidará la
comisión por recaudo.

Ejemplo

Si el vendedor del recaudo es el tercero: 14856296 - Manuela Rendon. En la
liquidación de comisiones, en el campo "Código vendedor" el sistema indicará
el código: **14856296**.

![330.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/330.png)



﻿

# Tipo vend.

Tipo de vendedor \(Principal/Asociado\).

El vendedor principal es quien participa del proceso de venta y/o recaudo y a
quien se liquida la comisión inicialmente.

El vendedor asociado es quien gana comisión por la venta y/o recaudo realizado
por otros vendedores.

Ejemplo

![340.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/340.png)

Observaciones

Los vendedores asociados se configuran en el perfil del vendedor, ver:
**\[Pestaña: Básico > Catálogo de terceros > Clic derecho: Catálogos asociados
> Perfiles de vendedores\].**



﻿

# Centro de costos

Código del centro de costos de donde se cargará el gasto por la comisión del
vendedor.

Este centro de costos se encuentra configurado en los datos del vendedor al
momento de la asignación del perfil de comisiones.

Ejemplo



La empresa Tecnología y Espacios cuenta con dos vendedores, que tienen
asignados los siguientes perfiles:

Identificación vendedor | Nombre vendedor | Autorización | Perfil | Centro de costos | 75098562 | Rogelio Duque | A-1530 | PGV | 110 - Ventas Especiales
---|---|---|---|---
14856296 | Manuela Rendon | A-1050 | PGR | 130 - Departamento de recaudo

Al momento de realizar la liquidación de comisiones en el recaudo para el
vendedor: 14856296 - Manuela Rendon, el sistema indicará como "Centro de
costos" el identificador: **130**.

![350.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/350.png)

Configuración



Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Vr. abonado

Valor abonado por cada referencia registrada en la operación.


Ejemplo



Se realiza un recaudo de la siguiente factura de venta FV-00247

Cliente: 75654153- Andrea Martinez | Vendedor: 14856296- Manuela Rendon
---|---
Referencia | Descripción  | Valor abonado | Nuevo saldo
FV-00247 | Cuenta de cartera FV-00247 | $ 400.000 | $ 459.660

  * **Valor abonado: $400.000**

![360.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/360.png)

Observaciones



Para configurar la base para el cálculo de comisiones, ver: **\[Pestaña:
Básico > Catálogo de terceros > Clic derecho: Catálogos asociados > Perfiles
de vendedores\].**



﻿

# Vr. abono priorit.

Valor prioritario que debe abonarse antes de obtener la base de comisiones.

Si la base para el cálculo de comisiones en recaudo es **"Abono
comisionable"** , el abono prioritario se debe saldar primero antes de
calcular las comisiones en recaudo.

El **Valor abono prioritario** es el valor pendiente por pagar de los
elementos de inventario que no generan comisión a vendedores, los impuestos
cobrados al cliente y los ingresos adicionales \(Fletes\) de la factura.

Ejemplo

Se realiza la siguiente factura de venta:

FACTURA No. FV-00247
---
Elemento | Cantidad | Valor unitario | Valor total | DPC-002 - Impresora Inyección de tinta | 3 unid | $ 238.000 | $ 714.000

|  | Facturado sin impuestos | $ 714.000
---|---|---|---
|  | IVA | $ 135.660
|  | FLETES | $10.000
|  | Facturado con impuestos | $ 859.660


Se realiza un recaudo de la factura de venta anterior FV-00247

Cliente: 75654153- Andrea Martinez | Vendedor: 14856296- Manuela Rendon
---|---
Referencia | Descripción  | Valor abonado | Nuevo saldo
FV-00247 | Cuenta de cartera FV-00247 | $ 400.000 | $ 459.660

Según los anteriores datos el valor abono prioritario podría ser:

  * **Valor abono prioritario** : $145.660
Valor flete - Valor IVA: \($ 135.660 + $10.000 \)


  * Cuando el valor base de comisión es **"Abono comisionable"** , \[ContaPyme\] le resta al valor abonado, el valor prioritario para asignar la base para la comisión del vendedor.
**Abono comisionable** : $254.340
Valor abono - Abono prioritario: \($400.000 - \($ 135.660 + $10.000 \)\)


![370.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/370.png)



Observaciones

Si el valor abonado por el cliente en un momento dado no supera el valor del
abono prioritario, simplemente disminuye el abono prioritario que se tendrán
en cuenta para el siguiente recaudo.

Para configurar la base para el cálculo de comisiones, ver: **\[Pestaña:
Básico > Catálogo de terceros > Clic derecho: Catálogos asociados > Perfiles
de vendedores\].**

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Vr. base comisiones

Valor base sobre la cual se liquida la comisión al vendedor.

El valor base de comisiones depende de la configuración del perfil del
vendedor, que puede ser:

  * **Total abonado:** Valor total de abono
  * **Abono comisionable:** Es la resta del valor total abonado y el **valor no comisionable** que no ha sido cancelado, es decir, el abono cubrirá prioritariamente el valor no comisionable de la factura; una vez esté saldado dicho valor, se calcula la base comisionable del abono.

**Valor no comisionable:** Es el valor total de la factura menos los productos
que no generan comisión a vendedores, los impuestos y los ingresos adicionales
a la factura \(Fletes\). Tenga en cuenta que los ingresos adicionales a la
factura \(Flete\) no se manejan como un elemento de inventario, por lo tanto,
no se tendrá en cuenta para la comisión del vendedor

Sobre el valor base de comisiones se aplica el % de comisión respectivo.

Ejemplo

Se realiza la siguiente factura de venta:

FACTURA No. FV-00247
---
Elemento | Cantidad | Valor unitario | Valor total | DPC-002 - Impresora Inyección de tinta | 3 unid | $ 238.000 | $ 714.000

|  | Facturado sin impuestos | $ 714.000
---|---|---|---
|  | IVA | $ 135.660
|  | FLETES | $10.000
|  | Facturado con impuestos | $ 859.660


Se realiza un recaudo de la factura de venta anterior FV-00247:

Cliente: 75654153- Andrea Martinez | Vendedor: 14856296- Manuela Rendon
---|---
Referencia | Descripción  | Valor abonado | Nuevo saldo
FV-00247 | Cuenta de cartera FV-00247 | $ 400.000 | $ 459.660

Según los anteriores datos el valor base de comisiones podría ser:

  * **Total abonado** : $400.000
  * **Abono comisionable** : $254.340
\($400.000 - \($ 135.660 + $10.000 \)\)

![380.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/380.png)



Observaciones

Para configurar la base para el cálculo de comisiones, ver: **\[Pestaña:
Básico > Catálogo de terceros > Clic derecho: Catálogos asociados > Perfiles
de vendedores\].**



﻿

# Recaudo % Comisión

Porcentaje de comisión por recaudo que se liquida para el vendedor.

Ejemplo

Si el perfil del vendedor tiene configurado el **5%** de comisión por recaudo.
Al momento de realizar el abono a cuentas por cobrar, en el campo **"Recaudo %
Comisión"** , el sistema indicará: **5%**.

![390.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/390.png)

Observaciones

El % comisión por recaudo se encuentra definido en el perfil del vendedor de
la operación de abono CXC.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# % Castigo

Porcentaje de castigo que se aplica a la comisión por recaudo según la edad
del recaudo.

Cuando se establecen comisiones por recaudo, también es posible definir si la
comisión se va a castigar por la edad del recaudo.

La edad del recaudo se puede calcular basado en:

  * Basado en la fecha de facturación
  * Basado en la fecha de pago

Una vez establecido en que tipo de fecha se calculará la edad del recaudo, se
debe indicar el porcentaje de castigo para cada edad \(en días\).

Ejemplo

El vendedor: 14856296 - Manuela Rendón tiene configurado un perfil de
comisiones que le otorga un 5% de comisión por recaudo y se tiene configurado
los porcentajes de castigos según la edad del recaudo como se muestra en la
siguiente tabla:

Edad | % de castigo | Descripción
---|---|---
15 a 29 días | 10% | Recaudo entre los 15 y los 29 días de edad tendrán un castigo del 10% de la comisión.
30 a 59 días | 30% | Recaudo entre los 30 y los 59 días de edad tendrán un castigo del 30% de la comisión.
60 días en adelante | 100% | Recaudos posteriores a los 60 días de edad tendrán un castigo del 100% de la comisión.

Si el vendedor obtiene una comisión por recuado por ejemplo de $12.717, el
recaudo se realiza entre los 30 y 59 días de edad, en este caso la comisión se
disminuye en un 30%, es decir, la comisión queda en $8.901,9.

![400.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/400.png)

Observaciones

Los castigos de comisión por edades para el recuado se definen en el perfil de
vendedor, ver: **\[Pestaña: Básico > Catálogo terceros > Clic derecho:
Catálogos asociados > Perfiles de vendedores > Clic derceho sobre el perfil >
Pestaña: Castigos y/o bonificaciones\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera a la que se va a
registrar el abono.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | 1VEC- Cartera sede centro | $1.500.000 | $500.000 | $1.000.000

En el campo **"Centro de costos"** debe indicar el identificador del centro de
costo de la cuenta por cobrar seleccionada: **1VEC- Cartera sede centro**.

Observaciones

El centro de costos/nodo puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por cobrar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda,
normalmente para que se cruce el abono se indica el mismo centro de costo con
el que se originó la deuda.

Para el manejo de centros de costos la cuenta de cartera debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Centros de costos\].**



﻿

# Vr. Comisión

Valor de comisión por recaudo que se liquida para el vendedor en los abonos a
cuentas por cobrar.

El valor de la comisión se calcula automáticamente multiplicando el % comisión
por el valor base de comisiones.

Ejemplo

Se realiza un recuado donde el valor base de comisiones es : **$ 254.340** y
el % comisión en venta es: **5%** ; el "Vr. Comisión" calculado por el sistema
es de: **$ 12.717**

![410.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/410.png)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar > Configurar
operación > Campos de la operación > Configuración de columnas en comisiones
por rcdo\].**



﻿

# Referencias

Identificador de la referencia que modifica el cálculo de la comisión en el
abono.

Ejemplo

El vendedor: 14856296 Manuela Rendón tiene configurado un perfil de comisiones
que le otorga un 5% de comisión por recaudo, pero en algunos recaudos se
otorga una comisión adicional especial del 3%.

Para que al realizar el recaudo se liquide esa comisión especial debe
indicarse la referencia \[ESPECIAL\], previamente configurada en el perfil del
vendedor, aumentando el valor de la comisión al porcentaje dado del 3 %.

Como podemos visualizar en la imagen el valor de la comisión en venta es de
**$ 20.347,2** = \($ 254.340 \* 5%\) + \($ 254.340 \* 3%\) y en el detalle se
especifica el aumento del 3% al valor de la comisión.

![420.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/420.png)



Observaciones

Las referencias se definen en el perfil de vendedor, ver: **\[Pestaña: Básico
> Catálogo terceros > Clic derecho: Catálogos asociados > Perfiles de
vendedores > Clic derecho sobre el perfil > Pestaña: Castigos y/o
bonificaciones\].**

El manejo de referencias no afecta el % de comisión definido en el perfil del
vendedor, pero si afecta el valor de la comisión calculada.



﻿

# Detalle

Descripción resumida de la forma de cálculo de la comisión

Ejemplo

En el abono a cuentas por cobrar se liquidó al vendedor una comisión por
recaudo del 5% y una comisión adicional del 2% por ser una recaudo especial.
Por tanto, en el detalle de la comisión se indica una descripción de la
comisión.

![430.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/430.png)



﻿

# Total comisión por recaudo

Valor total de las comisiones en recaudo liquidadas en el abono a cuentas por
cobrar.

Ejemplo

![440.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/440.png)

Observaciones

El valor de las comisiones en el abono a cuentas por cobrar se debita de la
cuenta del gasto y se acredita a la cuenta por pagar configurada en el perfil
del vendedor.

Configuración

Para consultar el perfil del vendedor, ver: **\[Pestaña: Básico > Catálogo
terceros > Clic derecho: Catálogos asociados > Perfiles de vendedores \].**



﻿

# Cargar todas las cuentas

Carga todas las cuentas por cobrar pendientes para el tercero seleccionado.

Ejemplo

El cliente 900852956-7 - PC-Madrigal tiene 2 facturas pendientes por pagar, la
factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $500.000 pesos, el cliente emite un cheque por
**$2.000.0000 de pesos** para cancelar todas las cuentas que tiene pendientes
por pagar.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por cobrar registradas para el tercero seleccionado.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000400 | $500.000 | $500.000 |
FV-000235 | $1.500.000 | $1.500.000 |



Observaciones

Este botón carga por defecto todas las cuentas por pagar pendientes con el
tercero seleccionado a la fecha que tienen la operación de abono a CXP.





﻿

# Abonar monto

Permite abonar un monto dado a las cuentas por cobrar del tercero.

Ejemplo

El cliente 900852956-7 - PC-Madrigal tiene 2 facturas pendientes por pagar, la
factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $500.000 pesos, el cliente gira un cheque por
$1000.0000 de pesos para abonar a todas las cuentas por cobrar que tiene
pendientes.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por cobrar registradas para el tercero seleccionado.

Luego, se da clic en el botón **"Abonar monto"** Para indicar el valor de
**$1.000.000 de pesos** que está abonando el cliente a sus facturas.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000400 | $500.000 | $500.000 |
FV-000235 | $1.500.000 | $500.000 | $1.000.000

Observaciones

El monto dado en la opción **"Abonar monto"** , \[ContaPyme\] reparte de forma
equitativa el valor abonando para cada referencia seleccionada en la
operación. Para este caso asigno el valor de **$500.000 pesos** en la columna
**"Valor abono"** para cada una de las referencias seleccionadas.



﻿

# Abono parcial a un crédito

Este asistente permite realizar el abono de un monto indicado teniendo en
cuenta capital e intereses del crédito, siendo estos últimos tomados como
abono prioritario.
La diferencia principal con realizar un abono directamente sobre el listado,
es que este abono primero se realiza sobre el capital y luego se calculan los
intereses que se deben pagar hasta la fecha.

Ejemplo

El cliente 900852956-7 - PC-Madrigal tiene un crédito por $1.000.000 a un
interés de 1%, el cual fue financiado a tres cuotas de aproximadamente
$340.000 mensuales, de los cuales ya realizó el pago de su primera cuota.

\# Cuota | Saldo actual | Abono a capital | Intereses | Valor cuota
---|---|---|---|---
1 | $1.00.000 | $330.022 | $10.000 | $340.022
2 | $669.978 | $333.322 | $6.700 | $340.022
3 | $336.655 | $336.655 | $3.366 | $340.022

El cliente recibe un dinero adicional y desea hacer un abono parcial al
crédito por un monto de **$200.000**. Supongamos que a la fecha del abono ya
se debía **$2.500** de intereses, por lo tanto el abono se comportaría de al
siguiente manera:

| Abono sin asistente | Abono con asistente
---|---|---
Abono a capital | $200.000 | $197.500
Abono a intereses | $2.500 | $2.500
Total abono | $202.500 | $200.000

Observaciones

Este asistente permite realizar un abono parcial a un crédito que maneje
intereses corrientes y que no tenga beneficio por pago anticipado.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

El cliente 900852956 - PC-Madrigal tiene 2 facturas pendientes por pagar, la
factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $800.000 pesos.

Para este caso el cliente se realiza un abono a la cuota número 2 de la
factura **FV-000235** por valor de $500.000 pesos.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el abono puede clic el botón **"Visualizar el documento impreso"**
, y el sistema le muestra una vista previa del documento con toda su
información.

.
![470.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV4%20-Abono%20a%20CxC/%5B14190%5D%20FrmDlgOprMov4/470.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra por defecto es que se tenga configurado
en la operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Saldo actual

Saldo actual de la cuenta por cobrar seleccionada a la fecha registrada en la
operación.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000
En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por cobrar seleccionada en el renglón:**$1.500.000**.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.

Al seleccionar la cuenta por cobrar el sistema trae automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación de abono.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Saldo\].**



﻿

# Auto-calcular comisiones

Esta opción permite el cálculo automático de las comisiones por recaudo que
apliquen para el vendedor especificado en el abono a cuentas por cobrar.

La opción se encuentra activa por defecto, impidiendo la modificación del
cálculo de comisiones indicado.

Cuando se desactiva esta opción es posible la modificación manual de la
liquidación realizada y se activa la opción " Calcular comisiones".

Observaciones

Para modificar las comisiones liquidadas en la operación de abono a cuentas
por cobrar, se debe activar la opción en el perfil de seguridad del usuario,
ver: **\[Pestaña: Básico > Catálogo de perfiles de seguridad para clientes
desktop > Clic derecho sobre el perfil: Modificar > Módulo: Inventarios,
compras y facturación > Opciones > Sistema de liquidación de comisiones\].**



﻿

# Calcular comisiones

Esta opción permite que el sistema realice el cálculo de las comisiones por
recaudo que apliquen para el vendedor especificado en el abono a cuentas por
cobrar.
La opción se puede usar cuando se desactiva la opción "Auto-calcular
comisiones" y permite la modificación manual de la liquidación realizada por
el sistema.

Observaciones

Para modificar las comisiones liquidadas en la operación de abono a cuentas
por cobrar, se debe activar la opción en el perfil de seguridad del usuario,
ver: **\[Pestaña: Básico > Catálogo de perfiles de seguridad para clientes
desktop > Clic derecho sobre el perfil: Modificar > Módulo: Inventarios,
compras y facturación > Opciones > Sistema de liquidación de comisiones\].**



﻿

# Vendedor

Vendedor de la cuenta por cobrar que está recaudando la cartera.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal | Vendedor: 25576890- Patricia Quintero
---|---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Vendedor"** se debe indicar el identificador del tercero
correspondiente del abono.**25576890- Patricia Quintero**.

Observaciones

Este dato se puede incluir en el documento de impresión de la operación.

En los exploradores de cartera se tienen la posibilidad de agregar la columna
vendedor con el que se realizó el abono a cuentas por cobrar.

Si este gana comisiones por recaudo, se calculan y se generan automáticamente
al procesar la operación.

El botón "ref." se puede usar para asignar otro perfil de vendedor y aplicar
referencias que modifiquen el cálculo de comisiones. Para mayor información
[Ver más](<\[300\]GridComisionesRcdo_Col002>)


Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Datos maestros de la operación
> Vendedor\].**



﻿

# Permite hacer abonos mayores a los saldos

Active esta opción si requiere realizar un abono mayor al saldo de la
referencia registrada en la operación.

Ejemplo

Se tiene pendiente una cuenta por cobrar con el cliente 900852956 - PC-
Madrigal de la factura FV-000235 por valor de 180.000 pesos, el cliente
realiza un abono a la factura por valor de $200.000 pesos.

Como el valor del abono es mayor al saldo de la cuenta por cobrar se activa la
opción **"Permite hacer abonos mayores a los saldos"**.

Al procesar la operación quedarían registrados los $20.000 pesos sobrantes en
negativo para la cuenta por cobrar seleccionada en la operación, para luego
poder realizar un cruce entre cuentas por ejemplo contra la cuenta de
efectivo.

Observaciones

Este dato se puede consultar en los informes de cartera y proveedores.



﻿

# Permite hacer abonos a múltiples terceros

Active esta opción si requiere registrar abonos a diferentes terceros en el
mismo comprobante.

Ejemplo

Se recibe un cheque por valor de $1.000.000 de pesos de la empresa **PC-
Madrigal** que consolida el pago de 2 facturas, Este cliente tiene 2
sucursales para lo cual en **\[ContaPyme\]** se tiene registrada la cuenta por
cobrar de cada sucursal.

El abono se realizó de la siguiente manera: se realizó un abono de $400.000
pesos para la factura **FV-000300** de la sucursal de **Pereira** , y se
realizó un abono de $600.000 pesos para la factura **FV-000235** de la
sucursal de **Manizales.**

Se activa la opción **"Permitir hacer abonos a múltiples terceros"** para
realiza el registro de este abono. De esta manera, se nos activa la columna
adicional **"Tercero"** y así registrar el tercero de la sucursal requerido de
cada referencia.



﻿

# Valor abono

Valor abonado a la cuenta por cobrar seleccionada.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000
En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
cobrar selecionada:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original por cada tercero y referencia la cuenta
contable debe tener el manejo **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"**.

El valor abonado que se registre para cada cuenta por cobrar se podrá
visualizar en los informes de cartera.

Configuración

Para realizar la configuración de **"controla endeudamiento" y "maneja
referencia"** a la cuenta de cartera, ver: **\[Pestaña: Contabilidad > Plan de
cuentas > Seleccionar cuenta: Clic derecho modificar > Activar opciones:
"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"\].**



﻿

# Nuevo saldo

Nuevo saldo de la cuenta por cobrar después de registrar el valor abonado.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000

En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por cobrar después de registrar el valor abonado por
cada renglón:**$1.000.000**.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y nos muestra el nuevo saldo con el que quedará la deuda después
de procesar la operación.
Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original por cada tercero, por cada referencia y nos
muestre el nuevo saldo, la cuenta contable debe tener la configuración de:
**"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"** ,
ver: **\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic
derecho modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

El valor del nuevo saldo de las cuentas por cobrar se podrá visualizar en los
informes de cartera.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Nuevo saldo\].**



﻿

# Cód. vendedor

Tercero responsable con el que se registró inicialmente la cuenta por cobrar.

Ejemplo

Se recibe un abono de **$500.000 pesos** , el abono se debe realizar a la
factura **FV-000235** que realizó el vendedor **Patricia Quintero** al cliente
PC-Madrigal.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Código vendedor
FV-000235 | $1.500.000 | $500.000 | $1.000.000 | 25576890- Patricia Quintero
En el campo **"Código vendedor"** el sistema muestra el identificador del
vendedor con el que se registró inicialmente la cuenta por cobrar: **25576890-
Patricia Quintero.**

Observaciones

El sistema trae de forma automática el tercero vendedor con el que
inicialmente se registró la cuenta por cobrar, en caso de que el tercero que
recaudo la cartera sea diferente al tercero vendedor que realizo la factura,
se puede indicar el tercero en el campo **"Recaudador"** que se encuentra en
la parte superior.

Este dato se puede incluir en el documento de impresión de la operación.

Si éste gana comisiones por recaudo, se calculan y se generan automáticamente
al procesar la operación.

Este campo es informativo, no puede ser modificado por el usuario.



﻿

# Observaciones

Observaciones sobre la cuenta por cobrar que se está cancelando o registrando
un abono.

Ejemplo

El cliente 900852956-7 - PC-Madrigal realiza un abono de $500.000 pesos a la
deuda que tiene con la factura FV-000235 por valor de $1.500.000 pesos.

Tercero: 900852956-7 - PC-Madrigal
---
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
130505;FV-000235 | $1.500.000 | $500.000 | $1.000.000 | Abono a FV-000235 - CxC \(10/05/2018\) a PC-Madrigal

En el campo **"Observaciones"** Se debe indicar la información que requiere
registrar para la cuenta por cobrar del renglón:**"Abono a FV-000235 - CxC
\(10/05/2018\) a PC-Madrigal"**.

Observaciones

Al seleccionar la cuenta por cobrar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo el sistema la toma como descripción
de la cuenta por cobrar para el documento de impresión y los informes de
cartera.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Abono a cuentas por cobrar \(CxC\) >
Configurar operación > Campos de la operación > Configuración de columnas en
abonos a CxC > Observaciones\].**



# Acerca de ventana

## ABONO A CUENTAS POR COBRAR



## Objetivo

Esta ventana tiene como finalidad el registro de los abonos a cuentas por
cobrar.

La operación de abonos a cuentas por cobrar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente un tercero con la empresa. También
permite en una misma operación realizar abonos a múltiples terceros activando
la opción “Permitir hacer abonos a múltiples terceros”.

En la operación de abonos a cuentas por cobrar se podrán detallar los
diferentes costos financieros que se han causado por motivo del crédito, como:
impuestos, intereses y comisiones, esto desde el paso “Detalle de los ingresos
financieros”.

Esta operación es de gran ayuda para los usuarios no contadores que conocen la
información básica de la transacción pero no tienen suficientes bases para el
manejo de la contabilidad.

## Ejemplo de información a registrar

Registrar el abono de $500.000 pesos a la cuenta por cobrar que tiene
pendiente el cliente María Isabel Ortega, correspondiente a la factura de
venta No. FV-00150.

La información relevante para registrar en el abono a cuentas por cobrar es:

  * El tercero que realiza el abono.
  * El código o referencia a la que se le realizará el abono.
  * Valor a abonar.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de ingreso o recibo de caja,
este tipo de documento se puede definir por defecto, y el sistema
automáticamente asignará el consecutivo correspondiente según su
configuración.

También es necesario identificar la fecha de soporte, el tercero que está
realizando el abono a la cuenta por cobrar y el vendedor o recaudador de la
misma.

## Sección registro

En la sección de registro se deben seleccionar las cuentas por cobrar a las
cuales se realizará el abono y el valor abonado que corresponda por cada
renglón.

\[Contapyme\] automáticamente muestra el saldo actual y el nuevo saldo de la
cuenta por cobrar a la fecha que tenga la operación y según el valor abonado.

Si no se ha especificado un tercero, el seleccionador mostrará todas las
cuentas por cobrar a terceros, de tal manera que al seleccionarse una,
automáticamente se llenarán los campos de tercero e identificación de la
cuenta.

## Sección totales registrados

Muestra los totales del saldo y abonos de las cuentas por cobrar registradas
en la operación.

## Sección detalle de los ingresos financieros

En este paso se puede detallar los diferentes ingresos por conceptos
financieros que se han causado por motivo del crédito, como: impuestos,
intereses, comisiones, etc.

También se pueden registrar los descuentos financieros condicionados, es
decir, los que dependen del cumplimiento con que se hagan los abonos.

La información relevante para registrar en este paso es:

  * Centro de costos al cual se le cargará el ingreso.
  * Concepto de ingresos \(Cuenta\).
  * Valor del ingreso financiero.

## Sección liquidación

Registro de los descuentos, cargos o impuestos causados en el abono a la
cuenta por cobrar.

## Sección forma de pago

El sistema permite definir la forma como el tercero cancelará el abono a la
cuenta por cobrar y demás cargos o descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(cruce con CXP al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección liquidación de comisiones

Si se encuentra activo el manejo de comisiones por recaudo, se adicionará un
paso a la operación de abono a cuenta por cobrar donde el sistema mostrará el
cálculo automático que ha realizado de la comisión por recaudo para el
vendedor indicado en el abono a cuentas por cobrar.

Las comisiones por recaudo se configuran por perfiles de vendedores.

Se puede calcular comisión por recaudo basado en:

  * Porcentaje fijo.
  * Por línea o producto.
  * Por monto de ventas y/o recaudo.

En este paso se puede detallar el vendedor que va a comisionar, el perfil de
vendedor, el porcentaje y valor de la comisión.

## Sección impresión de soportes

La operación de abono a cuentas por cobrar permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de abono a CxC.
  * Recibo de caja.
  * Recibo de caja en tirilla texto.
  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Disminuyendo o cancelando la cuenta por cobrar al tercero o muchas cuentas por cobrar para el caso de cuotas por cobrar pendientes y un abono que las cubre.
  * Llevando al ingreso los cargos financieros, si los hay.
  * Procesando los descuentos o cargos.
  * Procesando la forma de cobro o ingreso.





---

### MOV5 - Crear credito o anticipo

#### [14210] FrmDlgOprMov5

﻿

# Referencia

Referencia que tendrá la cuenta por pagar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
créditos o anticipos registrados. sin embargo, el anticipo de los clientes
debe estar soportadas con el consecutivo del pedido realizadas al cliente por
lo tanto en el campo "Referencia" se indica el número de pedido
correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado en la operación.



# Acerca de ventana

## OPERACIÓN CREAR CRÉDITO O ANTICIPO \(CXP\)



## Objetivo

Esta ventana tiene como finalidad el registro de un crédito o anticipo cuando
un tercero le ha hecho a la empresa un préstamo o un anticipo. Es decir, en la
contabilidad quedará registrado como una cuenta que se le debe pagar a un
tercero.

Este asistente permite que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar estos registros, solo digitando
información básica de la operación.

## Ejemplo de información a registrar

La empresa realizó un préstamo con el Banco Nacional, por valor de $5.000.000
de pesos, para pagarlo en 12 cuotas, el cual quedó respaldado con el
comprobante de ingreso No. CI-00150.

Se recibe un anticipo de un cliente por valor de $500.000 pesos, el cual quedó
respaldado con el comprobante de ingreso No CI-000151. Este anticipo
posteriormente se cruzará con la factura de venta.
La información relevante para registrar la operación crear crédito o anticipo
\(CXP\) es:

  * El tercero al que se le deberá crear la cuenta por pagar.
  * La cuenta a la que se llevará el crédito.
  * Valor del crédito o anticipo.
  * ¿A dónde entró el dinero?

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de ingreso. Este tipo de documento
se puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También se debe definir la fecha del documento e indicar la referencia que
tendrá la cuenta por pagar, diferente al número del documento soporte de la
operación. Si no se especifica este dato, la referencia del crédito o anticipo
será el número de documento dado para la operación.

## Sección registro

Se debe especificar el valor del crédito o anticipo e identificar el tercero
al que se le deberá crear la cuenta por pagar.

Se puede especificar el pago en varias cuotas.

## Sección forma de pago

Se debe especificar ¿A dónde entró el dinero?:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(Amortización con CXP\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de crear crédito o anticipo \(CXP\) permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Comprobante de egreso
  * Comprobante de caja.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes y con la
información registrada el sistema tendrá toda la información necesaria para
crear la cuenta por pagar con el tercero en el módulo de cartera y proveedores
y en la contabilidad.





---

### MOV5 - Crear crÚdito o anticipo

#### [14210] FrmDlgOprMov5

﻿

# Referencia

Referencia que tendrá la cuenta por pagar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
créditos o anticipos registrados. sin embargo, el anticipo de los clientes
debe estar soportadas con el consecutivo del pedido realizadas al cliente por
lo tanto en el campo "Referencia" se indica el número de pedido
correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado en la operación.



---

### MOV6 - Crear prestamo o anticipo

#### [14230] FrmDlgOprMov6

﻿

# Referencia

Referencia que tendrá la cuenta por cobrar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
préstamos o anticipos registrados. sin embargo, el anticipo a proveedores debe
estar soportadas con el consecutivo de la ordenes de compra realizadas al
proveedor por lo tanto en el campo "Referecia" se indica el número de orden de
compra correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado para la operación



# Acerca de ventana

## Operación crear préstamo o anticipo \(CXC\) OPERACIÓN CREAR PRESTAMO O
ANTICIPO \(CXC\)



## Objetivo

Esta ventana tiene como finalidad el registro de un préstamo o anticipo que la
empresa le hace a un tercero. Es decir, en la contabilidad quedará registrado
como una cuenta que la empresa le debe cobrar a un tercero \(CxC\).

Este asistente permite que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar estos registros, solo digitando
alguna información simple.

## Ejemplo de información a registrar

La empresa le realizó un préstamo a uno de los socios, el Sr. Carlos Cardona,
por valor de $1.600,000, el cual quedó respaldado con el comprobante de egreso
No. CE-00350.

La empresa le realizó un préstamo a unos de sus empleados por valor de
$800.000, el cual quedó respaldado con el comprobante de egreso No. CE-00351,
para pagar en 8 cuotas y ser descontado en la nómina del empleado.

La empresa realizó un anticipo a proveedores por valor de $1.000.000, por
compra de materia prima, el cual quedó respaldado con el comprobante de egreso
No CE-00352.

La información relevante para registrar la operación crear préstamo o anticipo
\(CXC\) es:

  * El tercero al que se le realizará el préstamo y se le deberá crear la cuenta por cobrar.
  * La cuenta a la que se llevará el crédito.
  * Valor del préstamo o anticipo.
  * ¿De dónde salió el dinero del prestado o anticipo?

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente es comprobante de egreso, este tipo de documento se
puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También se debe definir la fecha del documento e indicar la referencia que
tendrá la cuenta por cobrar, diferente al número documento soporte de la
operación. Si no se especifica este dato, la referencia del crédito será el
número de documento dado para la operación.

## Sección registro

Se debe especificar el valor del préstamo o anticipo e identificar el tercero
al que se le deberá crear la cuenta por cobrar.

Se puede especificar el pago en varias cuotas.

## Sección forma de pago

Se debe especificar ¿de dónde salió el dinero?:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por pagar \(CXP\).
  * Cruce \(cruce con CXC al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de crear préstamo o anticipo \(CXC\) permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Comprobante de egreso
  * Comprobante de caja.
  * Comprobante de ingreso.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes y con la
información registrada el sistema tendrá toda la información necesaria para
crear la cuenta por cobrar con el tercero en el módulo de cartera y
proveedores y en la contabilidad.





---

### MOV6 - Crear prÚstamo o anticipo

#### [14230] FrmDlgOprMov6

﻿

# Referencia

Referencia que tendrá la cuenta por cobrar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para los
préstamos o anticipos registrados. sin embargo, el anticipo a proveedores debe
estar soportadas con el consecutivo de la ordenes de compra realizadas al
proveedor por lo tanto en el campo "Referecia" se indica el número de orden de
compra correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado para la operación



---

### MOV8 - Replanteamiento CxC y CxP

#### [14250] FrmDlgOprMov8

﻿

# Vr. otra moneda

Valor abonado en moneda extranjera.

En esta columna se puede especificar el valor del abono equivalente en moneda
extranjera.

Esta columna solamente se habilita para edición, en caso de que la cuenta se
maneje en moneda extranjera y además, la configuración para el manejo de
moneda extranjera permita la edición de este valor.

Observaciones

Normalmente, solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se debería habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
cartera.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Catálogo Plan de Cuentas > Configuración > Configuraciones generales >
Valor de moneda automático\].**



﻿

# Cód. Tercero

Hace referencia al código del tercero con el cual se tiene la cuenta por
cobrar/pagar que se va a replantear.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Observaciones

El tercero ya debe estar creado en la base de datos.
Al indicar el código o identificador del tercero, el sistema filtra
automáticamente todas las cuentas por cobrar que ese tercero tenga
registradas.
Para que \[ContaPyme\] filtre las cuentas por cobrar que tiene cada tercero,
la cuenta contable debe tener la configuración de **"Maneja y exije tercero,
controla endeudamiento y maneja referencia"**.
\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada en la operación.



﻿

# Total a replantear

En este campo se visualizará la suma del saldo de las cuentas o cuotas
seleccionadas en la columna cuenta por cobrar.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![110.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/110.png)

En el campo **"Total a replantear"** muestra el valor total que se va a
replantear con las nuevas condiciones:**$1.800.000**.

Observaciones

Este campo no es modificable por el usuario y se actualiza automáticamente.

Es importante que la cuenta tenga la configuración de cartera y proveedores,
es decir, la configuración de **"Exige tercero, Controla endeudamiento y
maneja referencias"** para obtener los datos necesarios para la generación del
replanteamiento.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Referencia

En este campo puede especificar la referencia que tendrá la nueva cuenta por
cobrar/pagar.

Si no se especifica este dato, la referencia del crédito será el número de
documento dado para la operación.



﻿

# Deshacer

Esta opción deshace los último cambios registrados en la operación.



﻿

# Cargar todas las cuentas

Carga todas las cuentas por cobrar/pagar pendientes para el tercero
seleccionado.

Ejemplo

El cliente 30.456.465 - Adriana Bedoya tiene 2 facturas pendientes por pagar,
la factura **FV-000235** por valor de $1.500.0000 pesos y la factura
**FV-000400** por valor de $500.000 pesos, el cliente emite un cheque por
**$2.000.0000 de pesos** para cancelar todas las cuentas que tiene pendientes
por pagar.

Se da clic en este botón **"Cargar todas las cuentas"** para cargar todas las
cuentas por cobrar registradas para el tercero seleccionado.

![140.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/140.png)

Observaciones

Este botón carga por defecto todas las cuentas por cobrar/pagar pendientes con
el tercero seleccionado a la fecha que tienen la operación.





﻿

# Replantear un monto

Permite indicar el monto a replantear para las referencias seleccionadas en la
operación.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar por valor de 3.000.000 de pesos a una sola cuota con fecha
de pago en el mes de dicimebre, el cliente solicita a la empresa separar las
cuotas, va a cancelar la mitad con las condiciones actualuaes y la otra mitad
extender el plazo del prestamo a 3 cuotas para pagar cuotas mas bajas y poder
cumplir con el pago de la deuda.

En la opción **"Abonar monto"** se digita el valor que se requiere replantear
para la cuenta por cobrar/pagar seleccionada, en este caso:**$1.500.000** y el
sistema automáticamente se lo asigna a las referencias seleccionadas

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/150.png)

![150B.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/150B.png)

De esta manera, la factura **FV-000215** queda con 1.500.000 por pagar con las
condiciones actuales y el restante quedaría con las nuevas condiones, 3 cuotas
por favor del $500.000 de pesos cada una.

Observaciones

El monto dado en la opción **"Abonar monto"** , \[ContaPyme\] reparte de forma
equitativa el valor abonando para cada referencia seleccionada en la
operación.



﻿

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está replanteando.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Si requiere visualizar el documento de impresión de la referencia que le está
realizando el deterioro puede clic el botón**"Visualizar el documento
impreso"** , y el sistema le muestra una vista previa del documento con toda
su información.

![160.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/160.png)


Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el replanteamiento, debe estar ubicado en la referencia antes de
dar clic en la opción **"Visualizar el documento impreso".**

El documento de impresión por defecto es el mismo que tiene configurado la
operación con la que se realizó inicialmente la cuenta por cobrar.



﻿

# Cód. Tercero

Hace referencia al código del tercero con el cual se tiene la cuenta por
cobrar/pagar que se va a replantear.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Observaciones

El tercero ya debe estar creado en la base de datos.
Al indicar el código o identificador del tercero, el sistema filtra
automáticamente todas las cuentas por cobrar que ese tercero tenga
registradas.
Para que \[ContaPyme\] filtre las cuentas por cobrar que tiene cada tercero,
la cuenta contable debe tener la configuración de **"Maneja y exije tercero,
controla endeudamiento y maneja referencia"**.
\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada en la operación.



﻿

# Cuenta por cobrar

Identificación de las cuentas de cartera a la cual requiere realizar el
replanteamiento del crédito.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![30.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/30.png)

En la columna **"Cuenta por cobrar"** se selecciona el listado de referencias
a las cual requiere realizar el replanteamiento de crédito.

Observaciones

Para indicar la referencia a la cual va a realizar el replanteamiento debe dar
doble clic sobre la columna **"Cuenta por cobrar"** o con el comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero, y se podrá visualizar información
como:**La fecha de soporte, la fecha de vencimiento, el saldo actual, entre
otra información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por cobrar registrada para el tercero con su saldo, la cuenta de
cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda.

De lo contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**"N/D no definido".**

Para poder visualizar y cargar cada referencia, la operación donde se registró
la deuda debe estar procesada.

\[ContaPyme\] muestra las cuentas por cobrar pendientes de cada tercero hasta
la fecha que tenga configurada la operación.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Centro costos

Código del centro de costos asociado a la cuenta de cartera a la que se va a
registrar el replanteamiento del crédito.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

Tercero: 30.456.465 - Adriana Bedoya
---
Cuenta por cobrar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo
130505:01;FV-000215 | 1VEC- Cartera sede centro | $600.000 | $600.000 | $600.000
130505:02;FV-000215 | 1VEC- Cartera sede centro | $600.000 | $600.000 | $600.000
130505:03;FV-000215 | 1VEC- Cartera sede centro | $600.000 | $600.000 | $600.000

En la columna **"Centro de costos"** se muestra indicar el identificador del
centro de costo de la cuenta por cobrar seleccionada para realizar el
replanteamiento: **1VEC- Cartera sede centro**.



﻿

# Saldo actual

Saldo actual de la cuenta por cobrar a la fecha registrada en la operación.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![50.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/50.png)

La columna **"Saldo actual"** muestra el saldo que actualmente tiene la cuenta
por cobrar seleccionada en el renglón:**$600.000**.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.
Al seleccionar la cuenta por cobrar la cual requiere replantear el sistema
trae automáticamente el saldo actual de la deuda según la fecha que tenga
registra la operación.



﻿

# Valor abono

Valor que requiere replantear del la cuenta por cobrar/pagar seleccionada.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar por valor de 3.000.000 de pesos a una sola cuota con fecha
de pago en el mes de dicimebre, el cliente solicita a la empresa separar las
cuotas, va a cancelar la mitad con las condiciones actualuaes y la otra mitad
extender el plazo del prestamo a 3 cuotas para pagar cuotas mas bajas y poder
cumplir con el pago de la deuda.

![60.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/60.png)

En este caso en el campo **"Valor abono"** se digita el valor que se requiere
replantear para la cuenta por cobrar/pagar seleccionada:**$1.500.000**.

De esta manera, la factura **FV-000215** queda con 1.500.000 por pagar con las
condiciones actuales y el restante quedaría con las nuevas condiones, 3 cuotas
por favor del $500.000 de pesos cada una.

Observaciones

Para que el sistema reste el valor abonado a la deuda original por cada
tercero y referencia la cuenta contable debe tener el manejo **"Maneja y exige
tercero", "Controla endeudamiento" y "Maneja referencia"**.

El valor abonado que se registre para cada cuenta por cobrar se podrá
visualizar en los informes de cartera y movimiento contable de la operación.

Configuración

Para realizar la configuración de **"controla endeudamiento" y "maneja
referencia"** a la cuenta de cartera, ver: **\[Pestaña: Contabilidad > Plan de
cuentas > Seleccionar cuenta: Clic derecho modificar > Activar opciones:
"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"\].**



﻿

# Nuevo saldo

Saldo actual de la cuenta por cobrar/pagar a la fecha registrada en la
operación.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar por valor de 3.000.000 de pesos a una sola cuota con fecha
de pago en el mes de dicimebre, el cliente solicita a la empresa separar las
cuotas, va a cancelar la mitad con las condiciones actualuaes y la otra mitad
extender el plazo del prestamo a 3 cuotas para pagar cuotas mas bajas y poder
cumplir con el pago de la deuda.

![70.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/70.png)

La columna **"Nuevo saldo"** muestra el nuevo valor con el que quedará la
nueva cuenta por cobrar/pagar:**$1.500.000**.

De esta manera, la factura **FV-000215** queda con 1.500.000 por pagar con las
condiciones actuales y el restante quedaría con las nuevas condiones, 3 cuotas
por favor del $500.000 de pesos cada una.

Observaciones

Este campo es informativo, no puede ser modificado por el usuario.

Al seleccionar la cuenta por cobrar/pagar el sistema trae automáticamente el
saldo actual de la deuda según la fecha que tenga registra la operación.

Es un campo informativo, si requiere cambiar la información se debe realizar
desde la operación en la que se registro la cuenta por cobrar/pagar.

Es importante que la cuenta tenga la configuración de cartera y proveedores,
es decir, la configuración de **"Exige tercero, Controla endeudamiento y
maneja referencias"** para obtener los datos de cartera necesarios para
realizar el replanteamiento.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**



﻿

# Observaciones

Observaciones sobre la cuenta por cobrar a la cual se le esta realizando el
replanteamiento del crédito.

Ejemplo

El cliente **30.456.465 - Adriana Bedoya** tiene la factura **FV-000215**
pediente por pagar en 3 cuotas por valor de $600.000 pesos cada una, el
cliente solicita a la empresa extender el plazo del prestamo para pagar cuotas
mas bajas y poder cumplir con el pago de la deuda.

![90.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/030%20CX/Oprs/MOV8%20-%20Replanteamiento%20CxC%20y%20CxP/%5B14250%5D%20FrmDlgOprMov8/90.png)

a columna **"Observaciones** Se puede indicar la información que requiere
registrar para la cuenta por cobrar de cada renglón:**Extensión del plazo del
prestamo de 3 cuotas a 6 cuotas**.

Observaciones

Al seleccionar la cuenta por cobrar a la cual requiere realizar el
replanteamiento el sistema le asigna una observación de forma automática, pero
el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo el sistema la toma como descripción
de la cuenta por cobrar que se esta replanteando para el documento de
impresión y los informes de cartera.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: replanteamiento de un prestamos o
anticipo \(CXC\) > Configurar operación > Campos de la operación > Datos
maestros de la operación > Observaciones\].**



---
