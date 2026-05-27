# gm_inventarios.md
> **Propósito:** Documentar procedimientos paso a paso del módulo **Inventarios**, garantizando que Paty IA pueda explicar procesos con claridad y precisión.
> **Tipo de documento:** Guía de montaje (GM)
> **Función:** Procedimientos detallados 
> **Fecha:** 11/11/2025
> **Versión:** 1

---

# Guía de montaje

##  VENTA DE SERVICIOS

Esta guía lo orientará en el montaje para el registro de venta de servicios en
el programa \[ContaPyme\].




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje de venta de servicios.

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico.

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).

## Realice el proceso de capacitación de inventarios gestión comercial,
tratamiento de servicios.

Ver Curso de inventarios gestión comercial
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD140>).

## Realice una lista de los servicios que presta la empresa, indicando la
unidad de medida del servicio.

Una empresa se dedica a prestar servicios contables y jurídicos, define que
los servicios a facturar son:

Servicio | Unidad
---|---
Servicios de contabilidad | Horas
Servicios de cumplimiento tributario | Horas
Revisoría fiscal | Horas
Asesoría y consultoría laboral | Horas
Asesoría y consultoría comercial | Horas



##  Creación de grupos de inventario para servicios

En esta sección se indica cómo definir los grupos de inventario de servicios y
su creación en \[ContaPyme\].

## Requisitos

Defina el comportamiento contable, \(ingresos\) y de impuestos que se dará a
cada servicio.

## Preparación de la información

Agrupe cada uno de los servicios a prestar:

Grupo | Servicios
---|---
Asesorías contables |  Servicios de contabilidad
Servicios de cumplimiento tributario
Revisoría fiscal
Asesorías legales | Asesoría y consultoría derecho laboral
Asesoría y consultoría derecho comercial

Defina el uso y comportamiento contable de cada uno de los grupos, es decir
como servicio y las cuentas a afectar cuando se registre una venta del
servicio prestado:

Grupo | Cuenta de ingresos
---|---
Asesorías contables | 41503005
Asesorías legales | 41503010

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Grupos de inventario **\[Cinta de opciones: Pestaña
Inventarios > Grupos inventario\].**

Dé clic derecho sobre el catálogo y seleccione la opción Crear.

En esta pestaña ejecute el “Asistente de configuración inicial del catálogo de
grupos de inventario”.

Asigne el código al grupo.

En la pestaña General en “En inventario” desmarque la opción “Controlar
cantidad en inventario y en “Uso” seleccione “Es servicio”.

Seleccione la cuenta contable de ingresos para el grupo de inventario.


##  Creación del elemento de inventario tipo servicio

En esta sección se indica cómo crear los elementos de inventario tipo servicio
en \[ContaPyme\].

## Requisitos

Previo a la creación de los elementos de inventario tipo servicio, se deben
definir los grupos de inventario como se indica en la sección 2 de esta guía.

## Preparación de la información

Asocie cada uno de los elementos tipo servicio, listados inicialmente con los
grupos de inventario creados en la sección 2 de esta guía.

Servicio | Grupo de inventario
---|---
Servicios de contabilidad | ASESCONT – Asesoría Contable
Servicios de cumplimiento tributario | ASESCONT – Asesoría Contable
Revisoría fiscal | ASESCONT – Asesoría Contable
Asesoría y consultoría laboral | ASESLEGA – Asesoría Legal
Asesoría y consultoría comercial | ASESLEGA – Asesoría Legal


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de elementos de inventario **\[Cinta de opciones: Pestaña
Inventarios > Catálogo de elementos de inventario\].**

En esta pestaña ejecute el “Asistente de configuración inicial del catálogo de
elementos de inventario”.

Cree cada servicio a prestar como un elemento de inventario.

Asigne el grupo de inventario correspondiente, según los grupos creados en la
sección 2 de esta guía de montaje.

Para agilizar el proceso de facturación se recomienda configurar la lista de
precios a cada elemento de inventario tipo de servicio.


##  Configuración del documento de soporte para facturación

En esta sección se indica cómo configurar el documento de soporte para la
operación de facturación.

## Requisitos

Contar con la resolución de facturación.

Si se cuenta con diferentes resoluciones de facturación, es necesario crear un
documento de soporte por cada resolución.


## Preparación de la información

Defina la máscara del documento de soporte para la factura según lo indicado
en la resolución de facturación.

Resolución | Máscara
---|---
Resolución 187652xxxxxxx de 2017/02/01. Habilita rango FC-25000 – FC-35000 | FC-\#\#\#\#\#
Resolución 56892xxxxx de 2017/12/16. Habilita rango FV1200 – FV2000 | FV-\#\#\#\#


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de documentos de soporte **\[Cinta de opciones: Pestaña
Básico > Documento soporte\].**

En esta pestaña ejecute el “Asistente de configuración inicial del catálogo de
documentos de soporte”.

Adicione los documentos de soporte **\[Cinta de opciones del catálogo: Opción
Crear\].**

Código | Nombre  | Máscara | Comenzar en
---|---|---|---
10 | Factura de venta contado | FV-\# | 5001
105 | Factura de venta crédito | FVC-\# | 2001


##  Configuración del documento de impresión para facturación

En esta sección se indica cómo configurar el documento de impresión para la
operación de facturación.

## Requisitos

Configure el documento de soporte para la operación de facturación, como se
indica en la sección 4 de esta guía de montaje.

Si se cuenta con diferentes resoluciones de facturación, es necesario crear un
documento de impresión por cada resolución.


## Preparación de la información

No hay preparación de la información.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de documentos de impresión **\[Cinta de opciones: Pestaña
Básico > Documento impresión\].**

En esta pestaña ejecute el “Asistente de configuración inicial del catálogo de
documentos de impresión”.

Adicione los documentos de impresión **\[Cinta de opciones del catálogo:
Opción Crear\].**

Configure el número de copias que se van a imprimir de la factura de venta y
en las observaciones indique la resolución de facturación.

Código | Nombre  | Número de copias  | Observaciones y parámetros
---|---|---|---
10 | Factura de venta contado | 3 | Resolución 187652xxxxxxx de 2017/02/01. Habilita rango FC-25000 – FC-35000


##  Configuración de la operación de ventas

Esta sección indica cómo configurar la operación de ventas para agilizar el
proceso de facturación.

## Requisitos

Realice las todas las configuraciones indicadas en las secciones anteriores de
esta guía de montaje.

## Preparación de la información

No se requiere preparación de información.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\].**

Ingrese a la operación de facturación y ventas **\[Más operaciones > Ventas >
Facturación y ventas\].**

En esta operación ejecute el Asistente de configuración inicial de la factura
de venta”.


## Guías relacionadas

  * [Guía de montaje de Inventarios básico](<?id=\[GM\]8010>)
  * [Guía de montaje de listas de precios](<?id=\[GM\]8030>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]8080>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  INVENTARIOS BÁSICO

Esta guía lo orientará en el montaje de un sistema de control de inventarios
básico. Su alcance se limita a controlar existencias basadas en operaciones de
compra, venta y consumo.
Recuerde que en los módulos, catálogos y operaciones podrá encontrar las
siguientes ayudas:
1\. Botón de videos.
2\. Botón de ayudas.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que cumplir previamente al
montaje del módulo de inventarios básico.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte, documentos de
impresión y políticas empresariales en especial del manejo de inventarios\).
Ver Guía de montaje del sistema básico [aquí](<?id=\[GM\]1010>).

## Capacitación del módulo

Realice el proceso de capacitación del módulo de inventarios básico
Ver Curso de inventarios básico
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD130>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo de inventarios, donde se explican todos
los conceptos necesarios para entender esta guía de montaje.
Ver Acerca del módulo de inventarios básico [aquí](<?id=\[AD\]8020>).

## Listar elementos que va a controlar

Realice una lista de los elementos que va a controlar en inventarios
especificando la unidad de medida de cada elemento, la cantidad actual, el
costo por unidad y su precio de venta.

Ejemplo:

Una empresa que se dedica a la comercialización de partes y equipos de cómputo
define que va a controlar los siguientes elementos de inventario:

Elemento | Unidad | Cantidad | Costo unidad | Precio de venta
---|---|---|---|---
MICROFONO/AUDIFONO LOGITECH H390 COMFORT USB | Und | 3 | $ 82.500 | $ 110.000
TELEFONO CELULAR MOTO G7 PLUS 3.4P-64GB INDIGO | Und | 2 | $ 637.500 | $ 850.000
COMPUTADOR AIO LENOVO CI3 21P-4G-1TB | Und  | 1 | $ 1’198.500 | $ 1’598.000
COMPUTADOR COR SERVIDOR LENOVO TS150 | Und | 1 | $ 2’910.000 | $ 3’880.000
IMPRESORA INYEC EPSON MULTIFUNCION L575  | Und  | 1 | $ 667.500 | $ 890.000
MEMORIA RAM DDR4 32GB 2666MHZ HP SERVIDOR | Und | 3 | $ 1’665.000 | $ 2’220.000
MEMORIA RAM PORTATIL DDR4 16GB 2400MHZ | Und | 1 | $ 487.500 | $ 650.000
DISCO DURO 480GB SOLIDO SU630 ADATA  | Und | 1 | $ 198.750 | $ 265.000
COMPUTADOR PORTATIL LENOVO CE 14P 4-1TB S145 | Und | 2 | $ 615.000 | $ 820.000
COMPUTADOR COR PORTATIL LENOVO E480 CI7 14-4G WP | Und | 1 | $ 3’037.500 | $ 4’050.000
MANTENIMIENTO PREVENTIVO | Und |  |  | $ 150.000
FORMATEO Y REINSTALACIÓN | Und |  |  | $ 300.000

## Solicitar resolución

Si va a facturar solicitar la resolución de facturación ante la entidad
respectiva.

##  Definición de grupos de inventario

Esta sección indica cómo definir los grupos de inventario y su creación en
\[ContaPyme\].

## Requisitos

  * **Defina el comportamiento contable:** Defina el comportamiento contable \(ingresos, gastos, costos\) y de impuestos que dará a cada elemento de inventario: Por grupos de inventarios o por elementos de inventario.
  * **Personalización a nivel de grupos de inventario \(Recomendado\):** Los elementos se agrupan según su manejo contable \(cuentas de ingresos, costo de ventas y consumos\), se establece la configuración contable para el grupo y todos los elementos que pertenezcan a este grupo tendrán igual manejo contable. Este es el comportamiento contable definido por defecto.
  * **Personalización a nivel de elementos de inventario:** Se utiliza cuando el manejo contable de los elementos es muy particular.

**IMPORTANTE:** Esta guía está diseñada para manejar personalización de los
elementos a nivel de grupos de inventario.

## Preparación de la información

Agrupar lista de elementos

Agrupe la lista de elementos realizada anteriormente según el uso de los
elementos \(materia prima, producto terminado, mercancía para la venta,
servicio\) y según el manejo contable que requieren.


Ejemplo:

Grupo  |  Elemento
---|---
ACCESORIOS | MICROFONO/AUDIFONO LOGITECH H390 COMFORT USB
CELULARES | TELEFONO CELULAR MOTO G7 PLUS 3.4P-64GB INDIGO
EQUIPOS | COMPUTADOR AIO LENOVO CI3 21P-4G-1TB
COMPUTADOR COR SERVIDOR LENOVO TS150
IMPRESORAS | IMPRESORA INYEC EPSON MULTIFUNCION L575
PARTES PC |  MEMORIA RAM DDR4 32GB 2666MHZ HP SERVIDOR
MEMORIA RAM PORTATIL DDR4 16GB 2400MHZ
DISCO DURO 480GB SOLIDO SU630 ADATA
PORTATILES | COMPUTADOR PORTATIL LENOVO CE 14P 4-1TB S145
COMPUTADOR COR PORTATIL LENOVO E480 CI7 14-4G WP
MANTENIMIENTO | MANTENIMIENTO PREVENTIVO
FORMATEO Y REINSTALACIÓN



Defina el comportamiento contable de cada grupo

  * Los elementos de todos los grupos son destinados para la venta.
  * Los elementos del grupo PARTES PC también pueden ser de consumo interno de la empresa.
  * Los elementos del grupo MANTENIMIENTO son servicios.

Grupo | Control Existencias | Consumo | Venta | Producto | Servicio
---|---|---|---|---|---
ACCESORIOS | X |  | X |  |
CELULARES | X |  | X |  |
EQUIPOS | X |  | X |  |
IMPRESORAS | X |  | X |  |
PARTES PC | X | X | X |  |
PORTATILES | X |  | X |  |
MANTENIMIENTO |  |  | X |  | X

Se entiende por comportamiento contable las cuentas se deben afectar al
momento de realizar ventas, consumos, devoluciones, entre otras.

Grupo | Cuenta Ingresos | Cuenta Costo Ventas | Cuenta Consumo
---|---|---|---
ACCESORIOS | 41355405 – Venta accesorios | 61355405 – Venta accesorios |
CELULARES | 41355410 – Venta celulares | 61355410 – Venta celulares |
EQUIPOS | 41355415 – Venta equipos  | 61355410 – Venta celulares |
IMPRESORAS | 41355420 – Venta impresoras | 61355420 – Venta impresoras |
PARTES PC | 41355425 – Venta partes pc | 61355425 – Venta partes pc | 514525 – Mantenimiento equipos
PORTATILES | 41355430 – Venta portátiles | 61355430 – Venta portátiles |
MANTENIMIENTO | 415540 – Mantenimiento maquinaria ofic  |  |



**IMPORTANTE:** Las cuentas por definir a cada grupo dependen del uso que se
vaya a dar a los elementos:

  * Para consumo.
  * Mercancía para la venta.
  * Es de producción interna \(es producto\).
  * Es servicio.



Codifique los grupos de inventario

Establezca un modelo de codificación de los grupos e inventario que permita du
fácil identificación.
El código puede ser alfanumérico de hasta 10 caracteres.

Para obtener información acerca de la codificación de los grupos de inventario
consulte la ventana de **Más Información** acerca del código.
Código | Grupo
---|---
ACC | ACCESORIOS
CEL | CELULARES
EQP | EQUIPOS
IMP | IMPRESORAS
PAR | PARTES PC
POR | PORTATILES
MAN | MANTENIMIENTO


Asocie cada uno de los elementos de inventario con el código del respectivo
grupo de inventario al que pertenece.

## Procedimiento en \[ContaPyme\]

Ingrese a \[ContaPyme\].

Vaya a la pestaña Inventarios.

En esta pestaña ejecute el “Configurador del módulo de inventarios”.

Ingrese al catálogo de grupos de inventario**\[Cinta de opciones: Pestaña
Inventarios > Catálogo de grupos de inventario\]**.

En esta pestaña ejecute el “Asistente de configuración inicial del catálogo de
grupos de inventario”.

Con la información definida anteriormente adicione los grupos de inventario
necesarios **\[Cinta de opciones del catálogo: Opción Crear\]**.


##  Definición de departamentos o líneas

Esta sección indica cómo definir los departamentos o líneas y su creación en
\[ContaPyme\].

## Requisitos

Previo a la definición de los departamentos o líneas deben estar definidos los
grupos de inventario como lo indica la sección 2 de esta guía.

## Preparación de la información

Agrupe la lista de elementos realizada anteriormente por líneas de productos.

Una línea o departamento es un agrupador de productos que están estrechamente
relacionados, ya sea porque satisfacen una necesidad o porque se usan
conjuntamente.


**IMPORTANTE:** Al clasificar los elementos por departamentos o líneas se debe
indicar el “Tipo de gravamen” que permite que al generar el "Comprobante
informe diario de ventas" se totalicen los valores de las ventas según los
elementos estén gravados, exentos, excluidos y no gravados.


Tenga presente que si los elementos manejan “Tipo de gravamen” diferente deben
pertenecer a departamentos o líneas diferentes.

Depto o línea | Elemento
---|---
ACCESORIOS | MICROFONO/AUDIFONO LOGITECH H390 COMFORT USB
TELEFONÍA MÓVIL | TELEFONO CELULAR MOTO G7 PLUS 3.4P-64GB INDIGO
EQUIPOS CÓMPUTO | COMPUTADOR AIO LENOVO CI3 21P-4G-1TB
COMPUTADOR COR SERVIDOR LENOVO TS150
IMPRESORA INYEC EPSON MULTIFUNCION L575
MEMORIA RAM DDR4 32GB 2666MHZ HP SERVIDOR
MEMORIA RAM PORTATIL DDR4 16GB 2400MHZ
DISCO DURO 480GB SOLIDO SU630 ADATA
COMPUTADOR PORTATIL LENOVO CE 14P 4-1TB S145
COMPUTADOR COR PORTATIL LENOVO E480 CI7 14-4G WP
MANTENIMIENTO | MANTENIMIENTO PREVENTIVO
FORMATEO Y REINSTALACIÓN



Codifique los departamentos o líneas

El código puede ser alfanumérico de hasta 10 caracteres.
Para obtener información acerca de la codificación de los departamentos o
líneas consulte la ventana de **Más Información** acerca del código.

Código | Departamento o línea
---|---
001 | ACCESORIOS
002 | TELEFONÍA MÓVIL
003 | EQUIPOS CÓMPUTO
004 | MANTENIMIENTO



Asocie cada uno de los elementos de inventario con el código del respectivo
departamento o línea a la que pertenece.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo departamentos o líneas **\[Cinta de opciones: Pestaña:
Inventarios > Catálogo de departamentos o líneas\]**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de departamentos o líneas”**.

Adicione los departamentos o líneas necesarios. **\[Cinta de opciones del
catálogo: Opción Crear\]**.


**IMPORTANTE:** Recuerde detallar en cada departamento o línea el “Tipo de
gravamen”.



##  Creación de elementos de inventario

Esta sección indica cómo crear los elementos de inventario en \[ContaPyme\].

## Requisitos

  * Previo a la creación de elementos de inventario deben estar definidos los grupos de inventario como indica la sección 2 de esta guía y los departamento o líneas como indica la sección 3 de esta guía.
  * El listado de elementos de inventario inicial debe tener por cada elemento de inventario asociado el código del respectivo grupo de inventario y departamento o línea al que pertenece.



## Preparación de la información

Establezca un esquema de codificación para los elementos de inventario:

  * **Codificación Externa:** Cuando los elementos de inventario son comprados y el proveedor ya los tiene codificados \(generalmente por medio de código de barras\), se recomienda crear los elementos de inventario con esa misma codificación.
  * **Codificación Interna:** Cuando la empresa elabora o vende elementos y quiere llevar una codificación propia. Debe garantizar que todos los elementos puedan ser identificados inequívocamente, con el fin de evitar confusiones y así poder llevar un control estricto y preciso de las cantidades en inventario.


En este caso es evidente la necesidad de administrar técnicamente un proceso
de codificación y nomenclatura, que permita clasificar los elementos de
inventario acorde a características comunes o propias, como: finalidad,
material, tamaño, forma, peso, entre otras.

Generalmente se maneja:

* Codificación según la finalidad y clasificación.
* Codificación según especificaciones del producto.

Para obtener información acerca de la codificación de elementos de inventario
consulte la ventana de **Más Información** acerca del código.

Código | Elemento
---|---
ACC020 | MICROFONO/AUDIFONO LOGITECH H390 COMFORT USB
CEL015 | TELEFONO CELULAR MOTO G7 PLUS 3.4P-64GB INDIGO
EQP005 | COMPUTADOR AIO LENOVO CI3 21P-4G-1TB
EQP010 | COMPUTADOR COR SERVIDOR LENOVO TS150
IMP005 | IMPRESORA INYEC EPSON MULTIFUNCION L575
PAR020 | MEMORIA RAM DDR4 32GB 2666MHZ HP SERVIDOR
PAR035 | MEMORIA RAM PORTATIL DDR4 16GB 2400MHZ
PAR050 | DISCO DURO 480GB SOLIDO SU630 ADATA
POR005 | COMPUTADOR PORTATIL LENOVO CE 14P 4-1TB S145
POR010 | COMPUTADOR COR PORTATIL LENOVO E480 CI7 14-4G WP
MAN005 | MANTENIMIENTO PREVENTIVO
MAN010 | FORMATEO Y REINSTALACIÓN

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de elementos de inventario **\[Cinta de opciones: Pestaña:
Inventarios > Catálogo de elementos de inventario\]**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de elementos de inventario”.**

Adicione los elementos de inventario **\[Cinta de opciones del catálogo:
Opción Crear\]**.

Código | Elemento | Und | Grupo Inventario | Departamento o línea
---|---|---|---|---
ACC020 | MICROFONO/AUDIFONO LOGITECH H390 COMFORT USB | Und | ACC | 001
CEL015 | TELEFONO CELULAR MOTO G7 PLUS 3.4P-64GB INDIGO | Und | CEL | 002
EQP005 | COMPUTADOR AIO LENOVO CI3 21P-4G-1TB | Und | EQP | 003
EQP010 | COMPUTADOR COR SERVIDOR LENOVO TS150 | Und | EQP | 003
IMP005 | IMPRESORA INYEC EPSON MULTIFUNCION L575  | Und | IMP | 003
PAR020 | MEMORIA RAM DDR4 32GB 2666MHZ HP SERVIDOR | Und | PAR | 003
PAR035 | MEMORIA RAM PORTATIL DDR4 16GB 2400MHZ | Und | PAR | 003
PAR050 | DISCO DURO 480GB SOLIDO SU630 ADATA  | Und | PAR | 003
POR005 | COMPUTADOR PORTATIL LENOVO CE 14P 4-1TB S145 | Und | POR | 003
POR010 | COMPUTADOR COR PORTATIL LENOVO E480 CI7 14-4G WP | Und | POR | 003
MAN005 | MANTENIMIENTO PREVENTIVO | Und | MAN | 004
MAN010 | FORMATEO Y REINSTALACIÓN | Und | MAN | 004


ContaPyme cuenta con una utilidad para cargar elemento de inventario en bloque
desde Ms-Excel.

Puede generar una “Plantilla básica de importación \(Excel\)”: **Pestaña:
Inventarios > Catálogo de elementos de inventario > Clic derecho sobre el
catálogo: Generar plantilla básica de importación \(Excel\).**

Y tomar la información que se ha recopilado en las secciones anteriores de
esta guía para alimentar la plantilla y posteriormente “Importar” los
elementos de inventario.




##  Creación de bodegas

Esta sección indica cómo definir las bodegas y su creación en \[ContaPyme\].

## Requisitos

Defina las cuentas de inventario que se manejarán en la empresa:


* 140505 Materias primas
* 141005 Producto en proceso
* 143005 Producto terminado
* 143505 Mercancía no fabricada por la empresa.


Si es necesario mayor detalle en las cuentas, deben crearse las cuentas
auxiliares en el catálogo de plan de cuentas **\[Cinta de opciones: Pestaña
Contabilidad > Catálogo de plan de cuentas\].**

La cuenta de inventarios se afecta al momento de registrar ingresos o salidas
de elementos al inventario. Tenga en cuenta que los productos que se ingresan
a una misma bodega manejarán la misma cuenta de inventarios.



## Preparación de la información

Ingrese al catálogo de bodegas **\[Cinta de opciones: Pestaña Inventarios >
Catálogo de bodegas\].**

Consulte la configuración de las bodegas existentes en \[ContaPyme\], para
determinar si son suficientes para el manejo de los elementos de inventario de
la empresa.


**IMPORTANTE:** Si los elementos de inventario van a ser almacenados en sedes
o ubicaciones diferentes, sin importar que manejen la misma cuenta de
inventarios deben crearse bodegas diferentes.
Para consultar ejemplos de bodegas, ver la ventana de **Más Información
“Acerca de bodegas”.**


En caso de requerir crear nuevas bodegas defina por cada una de ellas la
siguiente información:

Bodega | Cuenta inventario | Cuenta ajuste | Cuenta devoluciones
---|---|---|---
Ingresos | Pérdida | Compra | Venta
Bodega Centro | 143505 – Mercancía no fabricada por la empresa | 425050 – Reintegro de otros costos y gastos | 539595 – Gastos diversos - Otros | 622501 – Devoluciones en compras | 417501 – Devoluciones en ventas


* La cuenta de inventario es particular para cada bodega.
* Las cuentas de ajustes y devoluciones son generales para todas las bodegas.
* Pueden existir varias bodegas con la misma configuración de cuentas.



## Procedimiento en \[ContaPyme\]

a. Ingrese al catálogo de bodegas **\[Cinta de opciones: Pestaña Inventarios >
Catálogo de bodegas\]**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de bodegas”.**

Modifique la configuración de las bodegas existentes o adicione las bodegas
que sean necesarias. **\[Cinta de opciones del catálogo: Opción Crear\]**.

Para obtener información acerca de la codificación de las bodegas consulte la
ventana de Más Información acerca del código [aquí](<?id=1148020>).




##  Registro del cargue inicial de inventarios

Esta sección indica cómo realizar el cargue inicial de inventarios.

## Requisitos

Para realizar el cargue inicial de inventarios es necesario:

La creación de los elementos de inventario, como se indica la sección 4 de
esta guía.

La creación de las bodegas, como se indica la sección 5 de esta guía.



## Preparación de la información

Tenga a disposición la lista de los elementos que va a manejar en inventarios
especificando la unidad de medida de cada elemento, la cantidad actual y el
costo por unidad, tal como se detalla en la sección 1 de esta guía.

Elemento | Unidad | Cantidad | Costo unidad
---|---|---|---
MICROFONO/AUDIFONO LOGITECH H390 COMFORT USB | Und | 3 | $ 82.500
TELEFONO CELULAR MOTO G7 PLUS 3.4P-64GB INDIGO | Und | 2 | $ 637.500
COMPUTADOR AIO LENOVO CI3 21P-4G-1TB | Und  | 1 | $ 1’198.500
COMPUTADOR COR SERVIDOR LENOVO TS150 | Und | 1 | $ 2’910.000
IMPRESORA INYEC EPSON MULTIFUNCION L575  | Und  | 1 | $ 667.500
MEMORIA RAM DDR4 32GB 2666MHZ HP SERVIDOR | Und | 3 | $ 1’665.000
MEMORIA RAM PORTATIL DDR4 16GB 2400MHZ | Und | 1 | $ 487.500
DISCO DURO 480GB SOLIDO SU630 ADATA  | Und | 1 | $ 198.750
COMPUTADOR PORTATIL LENOVO CE 14P 4-1TB S145 | Und | 2 | $ 615.000
COMPUTADOR COR PORTATIL LENOVO E480 CI7 14-4G WP | Und | 1 | $ 3’037.500
MANTENIMIENTO PREVENTIVO | Und |  |
FORMATEO Y REINSTALACIÓN | Und |  |

Indique por cada elemento de inventario el código de la bodega donde se
ingresar las existencias.


**IMPORTANTE:** Si un elemento de inventario tiene existencias en varias
bodegas debe indicarse el elemento tantas veces como bodegas donde vaya a
ingresar las existencias, detallando por cada una el saldo.



Bodega | Elemento | Unidad | Cantidad | Costo unidad
---|---|---|---|---
1 – Bodega principal | MICROFONO/AUDIFONO LOGITECH H390 COMFORT USB | Und | 3 | $ 82.500
1 – Bodega principal | TELEFONO CELULAR MOTO G7 PLUS 3.4P-64GB INDIGO | Und | 2 | $ 637.500
1 – Bodega principal | COMPUTADOR AIO LENOVO CI3 21P-4G-1TB | Und  | 1 | $ 1’198.500
1 – Bodega principal | COMPUTADOR COR SERVIDOR LENOVO TS150 | Und | 1 | $ 2’910.000
1 – Bodega principal | IMPRESORA INYEC EPSON MULTIFUNCION L575  | Und  | 1 | $ 667.500
1 – Bodega principal | MEMORIA RAM DDR4 32GB 2666MHZ HP SERVIDOR | Und | 3 | $ 1’665.000
1 – Bodega principal | MEMORIA RAM PORTATIL DDR4 16GB 2400MHZ | Und | 1 | $ 487.500
1 – Bodega principal | DISCO DURO 480GB SOLIDO SU630 ADATA  | Und | 1 | $ 198.750
2 – Bodega centro | COMPUTADOR PORTATIL LENOVO CE 14P 4-1TB S145 | Und | 2 | $ 615.000
2 – Bodega centro | COMPUTADOR COR PORTATIL LENOVO E480 CI7 14-4G WP | Und | 1 | $ 3’037.500
| MANTENIMIENTO PREVENTIVO | Und |  |
| FORMATEO Y REINSTALACIÓN | Und |  |

Los elementos que son servicios no se incluyen en el cargue inicial ya que no
manejan saldos.


## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de cargue inicial de inventarios **\[Más operaciones >
Cargue inicial > Cargue inicial de inventarios\]**.

Diligencie la operación indicando la información solicitada por cada elemento.
Si desea puede copiar y pegar la información desde Ms-Excel.

Realice la contrapartida contable, a través de una operación de cargue inicial
de cuentas **\[Más operaciones > Cargue inicial > Cargue inicial de
cuentas\]**.




##  Configuración de listas de precios

Antes de iniciar el registro de operaciones de facturación y venta remitirse a
la **Guía de montaje de listas de precios.**

##  Configuración del documento de soporte para facturación

Esta sección indica cómo configurar el documento factura de venta.

## Requisitos

Tenga a disposición la resolución de facturación.

Si requiere activar facturación electrónica remítase a la Guía de montaje de
facturación electrónica.



## Preparación de la información

Defina la máscara del documento de factura según lo indicado en la resolución
de facturación:

Resolución  | Máscara
---|---
Resolución 56892xxxxx de 2017/12/16. Habilita rango FV1200 – FV2000 | FV\#\#\#\#



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de documentos de **\[Cinta de opciones: Pestaña Básico >
Doc. soporte\]**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de documentos de soporte”.**

Modifique o adicione los documentos de soporte necesarios **\[Cinta de
opciones del catálogo: Opción Crear\]**.

Para obtener información acerca de la codificación de los documentos de
soporte consulte la ventana de Más Información acerca del código.

Código | Nombre  | Máscara | Comenzar en
---|---|---|---
10 | Factura de venta  | FV-\# | 1201




##  Configuración del documento de impresión para facturación

Esta sección indica cómo configurar la impresión del documento factura de
venta.

## Requisitos

Tenga configurado el documento de soporte - factura de venta, como se indica
la sección 8 de esta guía.

Si requiere activar facturación electrónica remítase a la Guía de montaje de
facturación electrónica.




## Preparación de la información

No se requiere preparar información.



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de documentos de impresión **\[Cinta de opciones: Pestaña
Básico > Doc. impresión\]**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de documentos de impresión”.**

Modifique o adicione los documentos de impresión **\[Cinta de opciones del
catálogo: Opción Crear\].**

Para obtener información acerca de la codificación de los documentos de
impresión consulte la ventana de Más Información acerca del código.

Indique el número de copias que se van a imprimir de la factura y en las
observaciones indique la resolución de facturación.

Código | Nombre  | Número de copias  | Observaciones y parámetros
---|---|---|---
10 | Factura de venta  | 3 | Resolución 56892xxxxx de 2017/12/16. Habilita rango FV1200 – FV2000

##  Configuración de la operación de ventas

Esta sección indica cómo configurar la operación de ventas para que el proceso
de facturación sea más ágil y oportuno.

## Requisitos

Realice todas las configuraciones requeridas en las secciones anteriores de
esta guía.



## Preparación de la información

No se requiere preparar información.



## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\]**.

Ingrese a la operación de facturación y ventas **\[Más operaciones > Ventas>
Facturación y ventas\]**.

En esta operación ejecute el **“Asistente de configuración inicial de la
factura de venta”.**




## Guías relacionadas

  * [Guía de montaje para venta de servicios.](<?id=\[GM\]80100>)
  * [Guía de montaje de listas de precios.](<?id=\[GM\]8030>)
  * [Guía de montaje de punto de venta POS.](<?id=\[GM\]8040>)
  * [Guía de montaje de series.](<?id=\[GM\]8060>)
  * [Guía de montaje de lotes.](<?id=\[GM\]80130>)
  * [Guía de montaje de elementos compuestos.](<?id=\[GM\]8070>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]80100>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)

¡Y listo\! Podrá empezar a registrar operaciones de inventarios



# Guía de montaje

##  FACTURACIÓN CONTINGENCIA \(CADENA\)

Esta guía lo orientará en la configuración y montaje de los componentes
principales y requeridos para el funcionamiento de la facturación por
contingencia en \[ContaPyme\] por medio de la integración con el proveedor
tecnológico CADENA.

Se recomienda realizar este proceso en compañía del contacto de facturación
electrónica indicado en el contrato que se envió a InSoft, el contador y en lo
posible con la persona encargada de sistemas.




##  Preparación de información inicial

Esta sección indica cuáles son los pasos previos para activar el proceso de
facturación electrónica.

## 1\. Requisitos

Tener acceso a internet para:

  * Realizar el registro ante los servidores del InSoft y del proveedor tecnológico de la información \(número de resolución, fechas de vigencia de la resolución, prefijo y rango de numeración de la factura de venta\) de la empresa que va a emitir documentos electrónicos.


  * Realizar verificaciones de adquisición \(activación, vigencia y consumo\) de documentos electrónicos adquiridos ante InSoft.


  * Enviar al proveedor tecnológico los documentos electrónicos, para que éste proceda con el envío de dichos documentos tanto al adquiriente \(representación gráfica y XML\) como a la DIAN \(XML\).


En cuanto al licenciamiento de la empresa que va a emitir documentos
electrónicos:

  * El área de trabajo donde se encuentra ubicada la empresa debe ser: Colombia.


  * Debe tener el módulo de “Inventarios, compras y facturación” el cual permite facturar tanto productos como servicios \(más información: >[aquí.](<https://www.\[ContaPyme\].com/soluciones/modulos/inventarios-compras-facturacion>)\) o el módulo de “Automatización de documentos” que permite facturar servicios \(más información: [aquí.](<https://www.\[ContaPyme\].com/soluciones/modulos/automatizacion-documentos>)\)

## 2\. Procedimiento en la DIAN

Pasos abreviados ante la DIAN:

Estar registrado ante la DIAN como facturador electrónico..

Ingresar al portal MUISCA de la DIAN.

Ingresar a la opción: “Solicitar numeración de facturación”.

Ingresar a la opción “Autorizar rangos” y registrar el prefijo y rango de
numeración para facturación por contingencia. \(Tipo de facturación: Factura
de talonario o papel\).

Firmar el formato borrador “1302” y generar el definitivo “1876”.

Ingresar al portal “Facturando electrónicamente” en la DIAN.

Gestionar la asociación del prefijo de numeración por contingencia con el
proveedor tecnológico CADENA.

Puede ver el paso a paso completo para la generación y configuración de
resolución de contingencia en la DIAN dando clic:
[aquí.](<https://contapyme.com/contapyme/2022/09-septiembre/docs/Configuraci%C3%B3n-DIAN-
Resoluci%C3%B3n-de-Contingencia-PT-Cadena.pdf>)


## 3\. Procedimiento en \[ContaPyme\]

Pasos ante InSoft:

Tener contratado el servicio de documentos electrónicos según volumen de
facturas de venta, notas crédito y notas débito realizadas en promedio al año.


##  Configuración en \[ContaPyme\] en el catálogo de documentos de soporte.

Esta sección indica cómo configurar el documento de soporte a usar en el
proceso de facturación electrónica, especialmente la configuración de: factura
de venta en contingencia.

## 1\. Requisitos

No hay requisitos.


## 2\. Preparación de la información

Disponer del formato 1876 “Autorización numeración de facturación” para
conocer el rango, prefijo, resolución y fechas de vigencia de la facturación
de contingencia “Talonario o papel”.
Ej.
![Conting01.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting01.png)

Este formato 1876 contiene la información necesaria para configurar en el
sistema \[ContaPyme\] el documento de soporte usado como factura de
contingencia.

  * \# Resolución.
  * Prefijo.
  * Rango inicial.
  * Rango final.
  * Fecha inicial.
  * Fecha final.

## 3\. Procedimiento en \[ContaPyme\]

## _3.1 Ingresar por menú: Básico > Doc. Soporte_

![Conting02.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting02.png)


## _3.2 Ubicar el documento que tiene por nombre “Factura de venta talonario
\(contingencia\)” y modificar su información.
\(Menú superior, opción: Modificar. O Clic derecho, opción: Modificar\)_

![Conting03.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting03.png)


## _3.3 Complementar el registro de información de Definición del documento:
Numeración._

Indicar en el encabezado la **empresa** que usará el documento.
**Pestaña: Definición del documento. Menú izquierdo, opción: Numeración:**

  * **Activar** la opción: “Hace parte de facturación electrónica”.
  * Verificar el tipo de numeración: “Tipo factura de venta”
  * **Registrar** el prefijo que generó ante la DIAN \(en la resolución - formato 1876\).

![Conting04.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting04.png)


## _3.4 Complementar el registro de información de Definición del documento:
Resoluciones._

**Pestaña: Definición del documento. Menú izquierdo, opción: Resoluciones.**
Teniendo a la mano la resolución de facturación de contingencia generada en la
DIAN \(formato 1876\) registrar la información en un nuevo renglón:

  * Resolución.
  * Consecutivo inicial – Consecutivo final.
  * Fecha inicial – Fecha final.

![Conting05.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting05.png)


## _3.5 Complementar el registro de información de Definición del documento:
Acciones._

**Pestaña: Definición del documento. Menú izquierdo, opción: Acciones.**

  * Verificar que esté activa la opción: “Envío de email automático”.
  * Verificar que esté activa la opción: “Aprobar manualmente”.

![Conting06.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting06.png)


## _3.6 Complementar el registro de información en Impresión de documento._

**Pestaña: Impresión de documento.**
En documento de impresión por defecto y alterno, verificar que esté
seleccionado el documento que tiene por nombre: “Factura de venta talonario o
papel \(contingencia\)”
![Conting07.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting07.png)


## _3.7 Complementar el registro de información en Envío de email._

**Pestaña: Envío de email.**

  * Verificar que esté configurado el envío de email con el encabezado de información de la empresa y la opción para enviar al cliente \[Tercero\].
  * Verificar que esté configurado el código de plantilla “Notificación de documento electrónico”.
  * **Activar** los adjuntos XML y PDF con la opción comprimidos en un archivo .zip

![Conting08.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting08.png)


## _3.8 Complementar el registro de información en Facturación electrónica._

**Pestaña: Facturación electrónica.**

  * Seleccionar al proveedor tecnológico: **“Cadena”**.
  * Verificar que tipo de documento sea: “Factura electrónica”.

**Importante**

  * **Activar** la opción: “Documento de contingencia”

Finalizar la configuración dando clic en la opción: **“Aceptar”**
![Conting09.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting09.png)




##  Manejador de operaciones.

Esta sección indica cómo se identifican las facturas de venta en contingencia
antes de ser enviadas a la DIAN y también enviadas a la DIAN una vez superada
la contingencia.

## 1\. Requisitos

Tener el servicio de facturación electrónica activado y contratado con InSoft.


## 2\. Preparación de la información

No hay preparación de información, solo basta con haber realizado los pasos
anteriores.

## 3\. Procedimiento en \[ContaPyme\]

Para enviar facturas en contingencia debe hacer lo siguiente:

## _3.1 Ingresar a la operación que normalmente usa para emitir facturas
\(según licenciamiento contratado con InSoft\), cambiar el tipo de documento
de soporte por: “Factura de venta talonario \(contingencia\)” y realizar la
operación de venta como siempre lo realiza._

![Conting10.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting10.png)


## _3.2 Visualización de facturas de contingencia sin enviar a la DIAN._

En el manejador de operaciones, dichas facturas quedarán en estado de
documento sin acciones ejecutadas y en color amarillo o azul \(no verde\), es
decir, que no se han ejecutado acciones de envío ya que se tiene una
contingencia. Las acciones de envío aún no se han realizado puesto que el
documento de soporte está configurado con aprobación manual según lo indicado
en la sección 2, numeral 3.5.
![Conting11.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting11.png)


## _3.3 Impresión de factura de contingencia._

Se puede imprimir para entregar al cliente el documento físico de la factura
de venta por contingencia, documento totalmente válido ante la DIAN para el
sustento de la transacción comercial.
El formato impreso, no tendrá datos como CUFE \(código único de la factura
electrónica\), ni fechas de emisión y validación de la DIAN. Debido a que
dicho documento aún no se ha reportado a esta entidad pues el facturador está
reportando una contingencia en el envío del documento electrónico para su
validación previa.
![Conting12.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting12.png)


## _3.4 Transmisión de facturas de contingencia a la DIAN._

Una vez superada la contingencia, se puede en el manejador de operaciones \(de
manera manual\) aprobar y ejecutar acciones de envío de las facturas de
contingencia para que queden reportadas a la DIAN.
![Conting13.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting13.png)


## _3.5 Visualización de facturas de contingencia enviadas a la DIAN._

Al aprobar y ejecutar acciones de envío de las facturas de contingencia, estas
quedarán en color verde y en acciones plenamente ejecutadas, esto indica que
las facturas ya fueron transmitidas al proveedor tecnológico y por ende a la
DIAN.
![Conting14.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting14.png)


## _3.6 Impresión de factura de contingencia transmitida a la DIAN
\(Opcional\)._

Una vez ya se ejecutaron las acciones de envío de la factura y este documento
fue validado por la DIAN, se puede verificar de nuevo el formato impreso en el
cual ya se podrán ver los datos como CUFE \(código único de la factura
electrónica\), las fechas de emisión y validación de la DIAN.
Al ejecutarse las acciones al cliente final le llegará un correo con el
archivo comprimido en formato .Zip que incluye el PDF y XML de la factura de
contingencia validada por la DIAN.
![Conting15.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting15.png)


## _3.7 Identificación del estado de los documentos electrónicos por medio de
colores._

Las operaciones que generan documentos electrónicos dentro del sistema
\[ContaPyme\] pueden tener diferentes estados que indican si ya fueron
autorizadas o no para envío al proveedor tecnológico o si ya fueron enviadas
al proveedor tecnológico; estos estados se verán reflejados mediante los
siguientes colores:

**Verde:** Indica que el documento electrónico ya fue autorizado y enviado al
proveedor tecnológico y a la DIAN \(en modo producción\).

**Amarillo:** Indica que el documento electrónico no ha sido autorizado y no
ha sido enviado al proveedor tecnológico. Se debe autorizar el envío de forma
manual \(clic derecho > Autorizar envío de documento electrónico\).
Si la operación no está procesada, al hacer \(clic derecho > Autorizar envío
de documento electrónico\) se cambia a color azul; lo cual significa que al
procesar la operación se enviará de forma automática al proveedor tecnológico.
Si la operación está procesada, al hacer \(clic derecho > Autorizar envío de
documento electrónico\) se envía inmediatamente al proveedor tecnológico y
cambia a color verde.

**Azul:** Indica que el documento electrónico ha sido autorizado y está
pendiente de envío al proveedor tecnológico; este color solo aplica si la
operación no está procesada y ya está autorizada, al momento de procesar la
operación ésta se envía al proveedor tecnológico y cambia a color verde.

![factelect33.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/factelect33.jpg)


##  Marco normativo de la factura de contingencia.

**Resolución 0012** de febrero 2021, indica los inconvenientes tecnológicos
**Num. 12.1** : “Por parte del facturador electrónico – Tipo 03”.
Implican lo siguiente:


  * Por el tiempo en que dure la contingencia expedir factura de venta de talonario o de papel, la cual se podrá generar para su expedición de forma manual o a través de sistemas informáticos electrónicos.
  * El facturador electrónico deberá generar una carta declarando el inconveniente tecnológico o superación del misma, la cual debe ir firmada por el representante legal de la compañía o quien haga de sus veces y remitirla al correo electrónico contingencia.facturadorvp@dian.gov.co con lo siguiente:
    * Asunto: Nit de la empresa separado con un guion el dígito de verificación; Nombre de la empresa.
    * Adjunto: PDF de la carta donde se declare en contingencia con la firma del representante legal o quien haga de sus veces.
    * Cuerpo del correo: Datos de contacto \(Nombres, teléfono/Celular de contacto\).
Nota: Este correo únicamente será para la recepción de correos de los
facturadores electrónicos para informar el inconveniente tecnológico o
superación de este.

  * Una vez el facturador electrónico superé el inconveniente tecnológico deberá transmitir sus documentos electrónicos, los cuales deberán expedir dentro de las 48 horas siguientes al momento en que se supere el inconveniente.

## Guías relacionadas

  * [Guía de montaje de instalación y configuración inicial.](<?id=\[GM\]>)
  * [Guía de montaje del módulo de inventarios, compras y facturación.](<?id=\[GM\]8010>) \(si la empresa va a generar facturas electrónicas por medio de la operación de “Ventas”, para facturación de servicios o productos\).

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  ACTUALIZACIÓN Y CAMBIO DE RESOLUCIÓN

Esta guía indica que es lo que se debe hacer al momento de actualizar una
resolución de facturación electrónica, documento de soporte o factura de
contingencia ante la DIAN y en el sistema \[ContaPyme\].
Se recomienda realizar este proceso en compañía del contacto de facturación
electrónica indicado en el contrato que se envió a InSoft, el contador y en lo
posible con la persona encargada de sistemas.




##  Preparación de información inicial

Esta sección indica cuáles son los pasos previos para activar el proceso de
facturación electrónica.

## 1\. Requisitos

Tener acceso a internet para:

  * Realizar el registro ante los servidores del InSoft y del proveedor tecnológico de la información \(número de resolución, fechas de vigencia de la resolución, prefijo y rango de numeración de la factura de venta\) de la empresa que va a emitir documentos electrónicos.


  * Realizar verificaciones de adquisición \(activación, vigencia y consumo\) de documentos electrónicos adquiridos ante InSoft.


  * Enviar al proveedor tecnológico los documentos electrónicos, para que éste proceda con el envío de dichos documentos tanto al adquiriente \(representación gráfica y XML\) como a la DIAN \(XML\).


En cuanto al licenciamiento de la empresa que va a emitir documentos
electrónicos:

  * El área de trabajo donde se encuentra ubicada la empresa debe ser: Colombia.


  * Debe tener el módulo de “Inventarios, compras y facturación” el cual permite facturar tanto productos como servicios \(más información: >[aquí.](<https://www.\[ContaPyme\].com/soluciones/modulos/inventarios-compras-facturacion>)\) o el módulo de “Automatización de documentos” que permite facturar servicios \(más información: [aquí.](<https://www.\[ContaPyme\].com/soluciones/modulos/automatizacion-documentos>)\)

## 2\. Procedimiento en la DIAN

Pasos abreviados ante la DIAN:

Estar registrado ante la DIAN como facturador electrónico..

Ingresar al portal MUISCA de la DIAN.

Ingresar a la opción: “Solicitar numeración de facturación”.

Ingresar a la opción “Autorizar rangos” y registrar el prefijo y el nuevo
rango de numeración para el tipo de documento a ampliar.

Firmar el formato borrador “1302” y generar el definitivo “1876”.

Ingresar al portal “Facturando electrónicamente” en la DIAN.

Gestionar la asociación del prefijo de numeración con el proveedor
tecnológico.

Puede ver el paso a paso completo para la generación y configuración de
resolución en la DIAN dando clic:
[aquí.](<https://contapyme.com/contapyme/2022/09-septiembre/docs/Actualizacion-
de-resolucion-en-la-DIAN.pdf>)


## 3\. Procedimiento en \[ContaPyme\]

Pasos ante InSoft:

Tener contratado el servicio de documentos electrónicos según volumen de
facturas de venta, notas crédito y notas débito realizadas en promedio al año.


##  Configuración en \[ContaPyme\] en el catálogo de documentos de soporte.

Esta sección indica cómo configurar en el documento de soporte en
\[ContaPyme\] el cambio de resolución al documento electrónico.

## 1\. Requisitos

No hay requisitos.


## 2\. Preparación de la información

Disponer del formato 1876 “Autorización numeración de facturación” para
conocer el nuevo rango, prefijo, resolución y fechas de vigencia del documento
electrónico.
Este formato 1876 contiene la información necesaria para configurar en el
sistema \[ContaPyme\] el documento.

  * \# Resolución.
  * Prefijo.
  * Rango inicial.
  * Rango final.
  * Fecha inicial.
  * Fecha final.

## 3\. Procedimiento en \[ContaPyme\]

## _3.1 Ingresar por menú: Básico > Doc. Soporte_

![Conting02.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Conting02.png)


## _3.2 Ubicar el documento electrónico al cual se le va a modificar su
información \(resolución\)._

\(Menú superior, opción: Modificar. O Clic derecho, opción: Modificar\)

![Actu01.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Actu01.png)


## _3.3 Actualizar resolución._

**Pestaña: Definición del documento. Menú izquierdo, opción: Resoluciones.**
En este paso \[ContaPyme\] muestra los datos de la resolución actual, de los
cuales el consecutivo final o la fecha final están vencidos o próximos a
vencer y es por esto que se generó una nueva resolución.
![Actu02.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Actu02.png)


## _3.4 Adicionar la nueva resolución._

Se debe dar clic en la opción "Adicionar resolución".
![Actu03.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Actu03.png)


## _3.5 Registrar datos de la nueva resolución._

Teniendo a la mano la resolución generada en la DIAN \(formato 1876\) se debe
adicionar la nueva información en un nuevo renglón y por último se debe dar
clic en el botón “Aceptar” en el documento de soporte para que se guarde la
información actualizada.
Registro de datos:

  * Resolución.
  * Consecutivo inicial – Consecutivo final.
  * Fecha inicial – Fecha final.

![Actu04.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/080%20IN/Actu04.png)


##  Configuración de resolución en plataforma del proveedor tecnológico.

Esta sección indica cómo configurar ante el proveedor tecnológico el cambio de
la resolución.
Por favor realice la configuración según la indicación del proveedor
tecnológico con el cual tenga contratado el servicio de documentos
electrónicos ante InSoft.

## 1\. Proveedor tecnológico: CADENA.

Con este proveedor no es necesario realizar configuraciones adicionales a los
anteriores pasos.


## 2\. Proveedor tecnológico: CENET.

Al momento de realizar la configuración del documento de soporte en el sistema
\[ContaPyme\], \(según lo indicado en la sección 2 numeral 3.5 de este
instructivo\), automáticamente se crea un tiquete de soporte al área de Back
Office de InSoft \(tema tiquete: Resoluciones Cenet\), en el cual se registran
todos los nuevos datos que el usuario modificó en su sistema.

Con este tiquete, el asesor de Back Office de InSoft ingresa al portal del
proveedor tecnológico Cenet y en los datos de la empresa, indica “Sincronizar”
resolución para que quede sincronizado el portal del proveedor tecnológico con
la información que se registró tanto en la DIAN como en \[ContaPyme\]. Una vez
realizada con éxito la sincronización, el asesor de Back Office de InSoft se
comunicará con usted para indicarle que el documento de soporte con la nueva
resolución ya puede ser usado en el envío de nuevos documentos electrónicos.


## Guías relacionadas

  * [Guía de montaje de instalación y configuración inicial.](<?id=\[GM\]>)
  * [Guía de montaje del módulo de inventarios, compras y facturación.](<?id=\[GM\]8010>) \(si la empresa va a generar facturas electrónicas por medio de la operación de “Ventas”, para facturación de servicios o productos\).

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  LISTAS DE PRECIOS

Esta guía lo orientará en el montaje de listas de precios para elementos de
inventario. Su alcance se limita a la creación y asignación de listas de
precios.

Recuerde que en los módulos, catálogos y operaciones podrá encontrar las
siguientes ayudas:

  * Botón de videos.
  * Botón de ayudas.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que cumplir previamente al
montaje de listas de precios.

## Realice el montaje del módulo de inventarios básico

\(creación de bodegas, grupos de inventarios y elementos de inventario\).
Ver Guía de montaje del módulo de inventarios básico [aquí](<?id=\[GM\]8010>).

## Capacitación del módulo

Realice el proceso de capacitación del módulo de inventarios comercial,
específicamente el tema de listas de precios.
Ver Curso de inventarios comercial.
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD140>).

## Ver acerca del módulo

Estudie el documento Acerca del módulo de inventarios, donde se explican todos
los conceptos necesarios para entender esta guía de montaje.
Ver Acerca del módulo de de inventarios [aquí](<?id=\[AD\]8020>).

## Identifique las diferentes listas de precios que manejan los elementos de
inventario destinados a la venta

  * Lista de precios sin IVA.
  * Lista de precios con IVA incluido.
  * Lista de precios para mayoristas.
  * Lista de precios especial.




##  Configuración de los métodos de cálculo

Esta sección indica cómo configurar los métodos de cálculo necesarios para
configurar las listas de precios.

## Requisitos

Haber identificado las listas de precios manejadas por los elementos de
inventario que son para la venta.

## Preparación de la información

Identifique por cada lista de precios el método de cálculo a utilizar.


Ejemplo:

Lista de precios | Método de cálculo
---|---
Lista de precios sin IVA | Manual \(precio asignado por el usuario\)
Lista de precios con IVA incluido | Manual \(precio asignado por el usuario\)
Lista de precios para mayoristas | Basado último precio de compra
Lista de precios especial | Basado costo promedio ponderado



**Importante:** Recuerde que el método de cálculo es una serie de reglas
definidas que determinan la forma como se actualizarán los precios de los
elementos de inventario.

En el método de cálculo se definen las siguientes reglas:

  * Precio en el cual se basará la actualización.
  * Tipo de incremento.
  * Decimales a manejar para redondear valores.
  * Actualización en línea o en bloque.


Para consultar los diferentes métodos de cálculo de las listas de precios ver:
**\[Pestaña: Inventarios > Listas de precios > Métodos de cálculo\].**

Revise la configuración de los métodos del cálculo a usar. Solo excluya el
método: Manual \(precio asignado por el usuario\).

Indique el tipo de incremento y porcentaje, forma de redondeo y forma de
actualización.

Método de cálculo  | Tipo de incremento | Porcentaje | Forma de redondeo | Forma de actualización
---|---|---|---|---
Basado último precio de compra | Porcentaje constante | 15% | Decenas | Actualizar precios en bloque
Basado costo promedio ponderado | Margen constante  | 10% | Cincuenta | Actualizar precios en bloque


**Importante:** La forma de actualización más utilizada es la “Actualización
en bloque” que permite actualizar los precios solo cuando el usuario lo
requiera.
La “Actualización en línea” calcula el precio cada vez que se realice una
transacción del sistema y puede ocasionar que dichas transacciones tarden más
tiempo.

## Procedimiento en \[ContaPyme\]

Ingrese a \[ContaPyme\].

Vaya a la pestaña Inventarios.

Ingrese al catálogo de métodos de cálculo **\[Cinta de opciones: Pestaña
Inventarios > Listas de precios >Métodos de cálculo\].**

Verifique que cada método de cálculo tenga la configuración definida en el
punto anterior.


**Importante:** \[ContaPyme\] tiene definidos unos métodos de cálculo estándar
que el usuario puede modificar o crear nuevos métodos.

##  Creación y configuración de las listas de precios

Esta sección indica cómo crear las listas de precios en \[ContaPyme\].

## Requisitos

Previo a la creación, las listas deben estar definidas como indica la sección
1 de esta guía.

  * Lista de precios sin IVA.
  * Lista de precios con IVA incluido.
  * Lista de precios para mayoristas.
  * Lista de precios especial.

## Preparación de la información

Asigne a cada lista de precios a crear un código que debe ser numérico entre 1
y 32.767 dígitos. Se recomienda manejar un consecutivo.


**Importante:** \[ContaPyme\] tiene ya creadas unas listas de precios que el
usuario puede modificar según sus necesidades o si requiere puede crear nuevas
listas.


Código | Nombre
---|---
1 | Lista de precios sin IVA
2 | Lista de precios con IVA incluido
3 | Lista de precios para mayoristas
4 | Lista de precios especial

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de listas de precios **\[Cinta de opciones: Pestaña:
Inventarios > Catálogo de listas de precios\]**.

Adicione o modifique las listas de precios definidas en el punto anterior
**\[Cinta de opciones del catálogo: Opción Crear o Modificar\]**.


**Importante:** Las listas de precios que tienen IVA incluido deben tener
activada la opción “Precios IVA incluido”.


Si alguna lista de precios se maneja en una moneda diferente a la local, se
debe indicar la moneda a utilizar que debe estar previamente creada en el
catálogo de monedas **\[Pestaña: Contabilidad > Opciones Plan de cuentas >
Monedas\]**.


##  Registro de precios

Esta sección indica cómo registrar a cada elemento de inventario los
diferentes precios.

## Requisitos

Realizar la configuración de los métodos de cálculo de las listas de precios
tal como se indica en la sección 2 de esta guía.

Realizar la creación y configuración de las listas de precios tal como lo
indica la sección 3 de esta guía.


## Preparación de la información

Genere un listado de los elementos de inventarios destinados para la venta a
los cuales va a indicar precios en las diferentes listas.


**Importante:** Puede exportar el listado de elementos de inventario
directamente desde \[ContaPyme\] a través de la opción “Exportar registros”
**\[Pestaña: Inventarios > Catálogo de elementos de inventario > Clic derecho:
Utilidades > Exportar registros\]**.



Realizar la creación y configuración de las listas de precios tal como lo
indica la sección 3 de esta guía.


**Importante:** Tenga presente que solo las listas de precios con método de
cálculo manual requieren que se indique el precio. Las listas que usen otros
métodos de cálculo como basado en precio de compra o costo promedio ponderado
se calculan automáticamente.


Elemento | Lista de precios sin IVA | Lista de precios con IVA incluido | Lista de precios para mayorista | Lista de precios especial
---|---|---|---|---
Leche entera pack x 6 | $ 18.000 | $ 21.420 | Cálculo aut | Cálculo aut
Leche saborizada Alpin | $ 2.500 | $ 2.975 | Cálculo aut | Cálculo aut
Huevo AAA | $ 10.000 | $ 11.900 | Cálculo aut | Cálculo aut
Huevo AA x 12 | $ 4.800 | $ 5.712 | Cálculo aut | Cálculo aut
Arroz 500 Gr | $ 2.000 | $ 2.380 | Cálculo aut | Cálculo aut
Frijol 1 Kg | $ 3.700 | $ 4.403 | Cálculo aut | Cálculo aut
Spaguetti 500 Gr | $ 2.300 | $ 2.737 | Cálculo aut | Cálculo aut
Pasta Lasagna 200 Gr | $ 4.000 | $ 4.760 | Cálculo aut | Cálculo aut
Desinfectante | $ 19.700 | $ 23.443 | Cálculo aut | Cálculo aut
Jabón líquido antibacterial | $ 25.000 | $ 29.750 | Cálculo aut | Cálculo aut



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de elementos de inventario **\[Cinta de opciones: Pestaña
Inventarios > Catálogo de elementos de inventario\]**.

Seleccione cada uno de los elementos de inventario contenidos en la lista e
ingrese a modificar su información \[Clic derecho: Modificar\].

Ubique la pestaña “Listas de precios” y a cada una de las listas seleccione el
método de cálculo respectivo e indique el precio para aquellas cuyo método sea
“Manual \(precios asignados por el usuario\)”.
Las listas de precios cuyo método de cálculo sea basado el algún dato del
sistema se calcularán automáticamente.

Elemento: Leche entera pack x 6
---
Lista de precios | Método de cálculo | Precio | Vigencia |
Lista de precios sin IVA | Manual precio asignado por el usuario | $ 18.000 |
Lista de precios IVA incluido | Manual precio asignado por el usuario | $ 21.400 |
Lista de precios para mayoristas | Basado último precio de compra | Cálculo automático  |
Lista de precios especial | Basado costo promedio ponderado | Cálculo automático | 31/10/2019


**Importante:** Los precios asignados a las listas de precios pueden tener una
fecha de vigencia, que se puede configurar en la columna respectiva.



\[ContaPyme\] ofrece un asistente para “Asignación de métodos de cálculo” que
permite seleccionar un conjunto de elementos de inventario y asignar un método
de cálculo especifico. Esta utilidad se recomienda cuando se manejan métodos
de cálculos diferentes al “Manual”. Para consultar el asistente ver:
**\[Pestaña: Inventarios > Catálogo de elementos de inventario > Cinta de
opciones: Listas de precios > Asignar método de cálculo\]**.



##  Configuración de la lista de precios por defecto en la factura

Esta sección indica cómo configurar la lista de precios por defecto en la
factura de venta.

## Requisitos

Realizar las secciones 1, 2, 3 y 4 de esta guía.


## Preparación de la información

No aplica.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Pestaña Básico > Manejador de
operaciones\]**.

Active el asistente de la operación “Facturación y ventas” **\[Operaciones >
Ventas > Facturación y ventas\]**.

En el campo Lista de precios, seleccione la lista de precios que se va a
sugerir por defecto en esta operación.

Al lado de la lista de precios seleccionada, active la opción “Fijar” para que
esta lista de precios siga pareciendo por defecto en la operación de
facturación y ventas.


**Importante:** Si el cliente al cual se realiza la factura tiene asignada una
lista de precios por defecto y es diferente a la configurada en la operación,
la lista de precios de la operación será reemplazada por la configurada para
el cliente.



##  Asignación de una lista de precios a un cliente

Esta sección indica cómo asignar una lista de precios por defecto a un
cliente.

## Requisitos

Realizar las secciones 1, 2, 3 y 4 de esta guía.

## Preparación de la información

No aplica.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de terceros **\[Pestaña: Básico > Catálogo de
terceros\]**.

Ubique en el catálogo el cliente al cual configurar la lista de precios.

Selecciona la opción modificar el tercero **\[Ubicado en el tercero: Clic
derecho: Modificar\]**.

Ubique la pestaña “Datos cliente” y el subgrupo “Ventas”.
Si el subgrupo “Ventas” no esta activo, es porque el cliente tiene configurado
un perfil de clientes donde esta configurada la lista de precios por defecto.
Si el subgrupo “Ventas” si esta activo, seleccione la lista de precios a
asignar al cliente en el campo “Lista de precios por def.”

De ahora en adelante cada que realice una factura de venta a este cliente, el
sistema cargará automáticamente la lista de precios configurada al tercero.

##  Actualización de precios

Una vez asignados los precios a los elementos de inventario, periódicamente o
según las necesidades del cliente se hace necesario “Actualizar precios”, para
lo cual \[ContaPyme\] pone a disposición asistentes de actualización, que
podrá encontrar en: **\[Pestaña: Inventarios > Catálogo de elementos de
inventario > Cinta de opciones: Listas de precios > Actualizar precios con
base en método de cálculo y actualizar precios \(cálculo manual\)\]**.

## Guías relacionadas

  * [Guía de montaje para venta de servicios.](<?id=\[GM\]80100>)
  * [Guía de montaje de listas de precios.](<?id=\[GM\]8030>)
  * [Guía de montaje de punto de venta POS.](<?id=\[GM\]8040>)
  * [Guía de montaje de series.](<?id=\[GM\]8060>)
  * [Guía de montaje de lotes.](<?id=\[GM\]80130>)
  * [Guía de montaje de elementos compuestos.](<?id=\[GM\]8070>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]8080>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)
  * [Guía de montaje para cargar elementos de inventario en bloque.](<?id=\[GM\]>)
  * [Guía de montaje de actualización de precios.](<?id=\[GM\]>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  INVENTARIOS PUNTO DE VENTA POS

Esta guía lo orientará en el montaje del punto de venta \(POS\). Su alcance se
limita en conocer las configuraciones que se pueden realizar en el sistema de
punto de venta \(POS\) y la información que se puede predeterminar para el
fácil y rápido registro de la facturación de la empresa.




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo punto de venta \(POS\).

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).

## Realice el montaje del módulo de inventario comercial

\(creación y configuración de los métodos de cálculo y listas de precios para
los elementos de inventario, departamentos o líneas, perfil de clientes\).
Ver Guía de montaje del módulo de inventario comercial.
[aquí](<?id=\[AD\]8020>).

## Realice el proceso de capacitación del módulo punto de venta \(POS\)

Ver Curso de punto de venta \(POS\).
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD150>).

## Estudie el documento Acerca del módulo

Aqui se explican todos los conceptos necesarios para entender esta guía de
montaje.
Ver Guía de montaje del módulo de inventario
comercial.[aquí](<?id=\[AD\]8020>).



##  Configuración inicial operación punto de venta

En esta sección se determinan los datos iniciales por defecto para la
operación punto de venta \(POS\).

## Requisitos

Tener previamente creado las listas de precios, bodegas, cliente genérico,
centro de costo y cuenta de caja que requiere configurar por defecto en la
operación de punto de venta \(POS\).

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Básico >
Operaciones\].**

Ingrese a la operación de punto de ventas POS **\[Más operaciones > Ventas>
Punto de venta\].**

Al ingresar por primera vez a la operación el sistema va a solicitar por medio
de un asistente las configuraciones iniciales de la operación de punto de
venta \(Pos\):

  * Cliente por defecto.
  * Bodega.
  * Centro de costo.
  * Cuenta de caja.
  * Procesar automáticamente al grabar la operación.

El sistema usará esta información como valores por defecto para las nuevas
operaciones que se registren.

Para volver a ingresar a este asistente de configuración, ingrese en una
operación de punto de venta a**\[Menú operación > Configuración inicial de
punto de venta.\]**


##  Configuración de ventanas para pago rápido

En esta sección se determinan las cuentas que se usarán para la generación de
los movimientos contables por concepto del pago en efectivo, banco, a crédito
o con bono, que el cliente hace a la empresa por la venta de productos.

## Requisitos

Tener previamente creadas las cuentas que se definirán en las formas de cobro:

  * 11050501 Caja general
  * 11100501 Bancolombia
  * 11100502 Banco Davivienda
  * 13050501 Clientes

La cuenta se afecta al momento de registrar la operación de punto de venta y
seleccionar la forma de pago correspondiente.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Básico >
Operaciones\]**.

Ingrese a la operación de punto de venta POS **\[Más operaciones > Ventas>
Punto de venta\]**.

Ingrese a las configuraciones de la operación a **\[Menú operación >
Configurar operación > Campos de la operación > Liquidación y forma de
cobro.\]**.

Adicione las formas de cobro y defina su configuración contable, tipo de
movimiento bancario, tercero y centro de costo por defecto.


##  Configuraciones de visualización de datos maestros de la operación y
columnas de productos vendidos

En esta sección se determina el comportamiento de los campos y columnas de la
operación punto de venta \(Requeridos, solo lectura, visibles\).

## Requisitos

No hay requisitos.

## Preparación de la información

No se requiere

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Básico >
Operaciones\]**.

Ingrese a la operación de punto de venta POS **\[Más operaciones > Ventas>
Punto de venta\].**

Ingrese a las configuraciones de la operación a **\[Menú: operación >
Configurar operación > Campos de la operación > Datos maestros de la
operación.\]**

Determine que campos requiere que sean visibles, requeridos o solo lectura en
la operación; se pueden configurar los campos como:

  * Lista de precios, Bodega general, Cód. vendedor. Y si van a tener un valor por defecto.
  * Configuración de las opciones “registro de precios unitarios o totales” de forma manual.
  * Configuración de las columnas visibles en la operación: Cód. bodega, Unidad, % desc., %IVA, Valor IVA, CC ingreso, tipo, entre otros.



##  Permisos adicionales de la operación

En esta sección se debe configurar los permisos adicionales que pueden tener
los usuarios en la operación punto de venta, como por ejemplo: poder registrar
descuentos para los elementos de inventario, exigir el cliente y vendedor,
visualizar el margen de negociación de los elementos, entre otros permisos.

## Requisitos

No hay requisitos.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Pestaña Básico > Manejador de
operaciones\]**.

Ingrese a la operación de punto de venta POS **\[Más operaciones > Ventas>
Punto de venta\]**.

Ingrese a las configuraciones de la operación **\[Menú operación > Configurar
operación > Otras configuraciones > Permisos adicionales para la
operación.\]**

Active los permisos que puede tener un usuario en el registro de la operación
punto de venta; se pueden configurar permisos como:

  * Permitir el registro de descuentos en ventas.
  * Permitir cambiar el modo de registro de precios \(Precio o total\).
  * Exigir cliente en ventas.
  * Exigir vendedor en ventas.
  * Permitir definir el nombre del cliente en lugar de seleccionar un cliente existente.
  * Permitir al operador visualizar el panel de margen de utilidad de ventas.
  * Permitir la apertura del cajón monedero en cualquier momento.



##  Configuración de interfaz y funcionalidad

En esta sección se configuran las opciones de interfaz y funcionalidad de la
operación de ventas, como por ejemplo: documento por defecto para imprimir,
ver barra de acceso rápido de funciones, tipo de forma de pago \(por
defecto\), tipo de encabezado a ver en la operación, modo de imprimir,
procesar automáticamente al grabar la operación? y demás configuraciones.

## Requisitos

No hay requisitos.

## Preparación de la información

No se requiere

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Básico >
Operaciones\]**.

Ingrese a la operación de punto de venta POS **\[Más operaciones > Ventas>
Punto de venta\]**.

Ingrese a las configuraciones de la operación a:


  * **\[Menú operación > Modo de imprimir\]: ** Permite determinar la forma como se imprimirán las operaciones.


  * **\[Menú operación > Configurar operación > Campos de la operación > Datos de encabezado > Tipo de doc. Soporte por defecto\]: ** Permite determinar el documento de soporte por defecto en el punto de venta, esta configuración se puede realizar por usuario o perfil de usuario.


  * **\[Menú operación > Configurar operación > Opciones descontinuadas > Tipo de doc. de impresión por defecto\]: ** Permite determinar el tipo de documento de impresión por defecto que se usará al imprimir las facturas.


  * **\[Menú operación > Configurar operación > Lista de elementos > centro de costo por defecto para ingresos\]: ** Permite determinar el código del centro de costo por defecto que se usará en cada renglón de la operación, para imputar el ingreso correspondiente.


  * **\[Menú operación > Configurar operación > Liquidación y forma de cobro > Tipo de forma de pago \(por defecto\)\]: ** Permite determinar cuál será la forma o medio de pago por defecto que se usará para registrar el pago de los clientes.


  * **\[Menú operación > Configurar operación > Visualización de la operación > Tipo de encabezado para la operación\]: ** Permite determinar qué tipo de encabezado de datos se visualizará en la operación punto de ventas y si desea, en lugar del logo, mostrar el rótulo de la empresa.


  * **Menú operación > Configurar operación > Visualización de la operación > Barra de acceso rápido a funciones \(POS\)\]: ** Permite determinar si se mostrará o no la barra de botones para las funciones especiales para punto de venta.


##  Configuración periféricos

En esta sección se realizan las configuraciones necesarias de los periféricos
que tiene el cliente para el punto de venta POS \(impresora, cajón monedero,
lector de código de barras, datáfono\).

## Requisitos

Tener instalados los periféricos.

Para el datáfono debe tener el archivo CAJA.EXE que entrega el proveedor
Redeban.


## Preparación de la información

No se requiere

## Procedimiento en \[ContaPyme\]

**Impresora:** Definir la configuración de la letra de la impresora.


  * Ingrese al manejador de operaciones **\[Cinta de opciones: Básico > Operaciones\].**


  * Ingrese a la operación de punto de venta POS **\[Más operaciones > Ventas> Punto de venta\].**


  * Ingrese a las configuraciones de la operación a **\[Menú operación > Config. operación > Config. de periféricos > letra para impresora\]**


**Cajón monedero:** Determinar a qué dispositivo estará conectado el cajón
monedero \(equipo o impresora\), cuál es el comando para abrirlo y si desea
abrir el cajón monedero automáticamente al imprimir la factura.


  * Ingrese al manejador de operaciones **\[Cinta de opciones: Básico > Operaciones\].**


  * Ingrese a la operación de punto de venta POS **\[Más operaciones > Ventas> Punto de venta\].**


  * Ingrese a las configuraciones de la operación a **\[Menú operación > Config. operación > Config. de periféricos > apertura de cajón monedero\]**


**Código de barras:** Definir el campo donde se encuentra almacenado el código
de barras dentro de la información del producto; por ejemplo, se puede guardar
en el campo “Referencia de fabricante”.


  * Ingrese al manejador de operaciones **\[Cinta de opciones: Básico > Operaciones\].**


  * Ingrese a las configuraciones generales del catálogo **\[Configuración > Config. de periféricos > Lector de código de barras\].**


**Datáfono:** Activar la interfaz con el datáfono Redeban y configurar la
ubicación donde se tiene almacenado el archivo ejecutable “cajas.exe”.


  * Ingrese al manejador de operaciones **\[Cinta de opciones: Básico > Operaciones\].**


  * Ingrese a la operación de punto de venta POS **\[Más operaciones > Ventas> Punto de venta\].**


  * Ingrese a las configuraciones de la operación a **\[Menú operación > Config. operación > Config. de periféricos > letra para impresora\]**



##  Configuración del documento de soporte para facturación

Esta sección indica cómo configurar el documento factura de venta.

## Requisitos

Tenga a disposición la resolución de facturación.

Si tiene diferentes resoluciones de facturación \(contado y crédito\) deberá
definir un documento de soporte por cada resolución.


## Preparación de la información

Defina la máscara del documento de factura según lo indicado en la resolución
de facturación:

Resolución | Máscara
---|---
Resolución 187652xxxxxxx de 2017/02/01. Habilita rango PS-25000 – PS-35000 | PS-\#\#\#\#\#
Resolución 56892xxxxx de 2017/12/16. Habilita rango FV1200 – FV2000 | FV\#\#\#\#



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de documentos de soporte **\[Cinta de opciones: Pestaña
Básico > Doc. soporte\].**

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de documentos de soporte”.**

Adicione los documentos de soporte **\[Cinta de opciones del catálogo: Opción
Crear\].**

Para obtener información acerca de la codificación de los documentos de
soporte consulte la ventana de **Más Información** acerca del código.
Código | Nombre | Máscara | Comenzar en
---|---|---|---
10 | Factura de venta contado | FV-\# | 5001
105 | Factura de venta crédito | FVC-\# | 2001





##  Configuración del documento de impresión para facturación

Esta sección indica cómo configurar la impresión del documento factura de
venta.

## Requisitos

Tenga configurado el documento de soporte - factura de venta, como se indica
la sección 5 de esta guía.

Si tiene diferentes resoluciones de facturación \(contado y crédito\) deberá
definir un documento de impresión por cada resolución.


## Preparación de la información

No se requiere.


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de documentos de impresión **\[Cinta de opciones: Pestaña
Básico > Doc. soporte\].**

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de documentos de impresión”.**

Adicione los documentos de impresión **\[Cinta de opciones del catálogo:
Opción Crear\].**
Para obtener información acerca de la codificación de los documentos de
impresión consulte la ventana de **Más Información** acerca del código.

Indique el número de copias que se van a imprimir de la factura y en las
observaciones indique la resolución de facturación.

Código | Nombre | Máscara | Comenzar en
---|---|---|---
22 | Factura de venta tirilla | 3 | Resolución 187652xxxxxxx de 2017/02/01. Habilita rango PS-25000 – PS-35000



##  Creación y configuración Usuario cajero

En esta sección se realiza la creación y configurar los usuarios cajero de la
empresa.

## Requisitos

No hay requisitos.

## Preparación de la información

Realice un listado de los usuarios que podrán ingresar al sistema a registrar
y consultar información como usuarios cajeros.

Ejemplo:

Identificación | Nombre | Perfil | Licencia
---|---|---|---
Cajero1 | Laura Rojas | Facturación | CAZ-XXXX-XXX
Cajero2 | Daniel Villa | Facturación | CAZ-XXXX-XXX



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de usuarios **\[Cinta de opciones: Pestaña básico >
Usuarios\].**

Dé clic en el botón “Crear” y registre la información que le solicita el
asistente. Para conocer la descripción de cada campo del asistente consulte la
ayuda dando clic derecho sobre el nombre del campo.

Desde la pestaña Configuración del asistente debe activar la opción “Este
usuarios es cajero por turnos” y si desea filtrar operaciones, es decir, que
los usuarios solo puedan visualizar las operaciones que registran en sus
turnos.

Para configurar los permisos para el usuario cajero puede ingresar al perfil
de usuario que tiene asignado.


## Guías relacionadas

  * [Guía de montaje inventarios básico.](<?id=\[GM\]8010>)
  * [Guía de montaje para venta de servicios.](<?id=\[GM\]80100>)
  * [Guía de montaje de listas de precios.](<?id=\[GM\]8030>)
  * [Guía de montaje de series.](<?id=\[GM\]8060>)
  * [Guía de montaje de lotes.](<?id=\[GM\]80130>)
  * [Guía de montaje de elementos compuestos.](<?id=\[GM\]8070>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]80100>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  MANEJO DE MÚLTIPLES CUENTAS PENDIENTES POR FACTURAR

Esta guía lo orientará en el montaje de múltiples cuentas pendientes por
facturar \(Mesas, Cuentas,..\). Su alcance se limita en conocer las
configuraciones que se pueden realizar en el sistema de punto de venta \(POS\)
para el manejo de múltiples cuentas pendientes por facturar.




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que cumplir previamente al
montaje del manejo de múltiples cuentas pendientes por facturar del módulo
punto de venta \(POS\).

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).

## Realice el montaje del módulo de inventario comercial

\(creación y configuración de los métodos de cálculo y listas de precios para
los elementos de inventario, departamentos o líneas, perfil de clientes\).
Ver Guía de montaje del módulo de inventario comercial.
[aquí](<?id=\[AD\]8020>).

## Realice el montaje del módulo de punto de venta POS

\(Configuraciones iniciales de la operación POS, Configuraciones generales,
configuraciones de dispositivos \(Impresora, lector de código de barras,
Datáfono, cajón monedero, configuración usuario cajero\).
Ver Guía de montaje del módulo de punto de venta POS.
[aquí](<?id=\[GM\]8040>).

## Realice el proceso de capacitación de múltiples cuentas pendientes por
facturar del módulo punto de venta \(POS\)

Ver Curso múltiple cuentas pendientes por facturar del módulo de punto de
venta \(POS\) [aquí](<https://www.contapyme.com/Capacitacion-
Virtual/#/CP40MOD150>).



##  Configuración inicial operación punto de venta

En esta sección se determina la configuración inicial para el manejo de
múltiples cuentas pendientes por facturar.

## Requisitos

Defina el número de cuentas pendientes por facturar que requiere manejar en la
operación punto de venta POS.

Ejemplo:

Para ilustrar un caso, vamos a considerar un restaurante con cuentas de mesas
que permanecen sin facturar hasta el momento del pago. Ahora se determina el
tamaño de la tabla o cuadrícula para manejar las cuentas pendientes por
facturar.

El sistema creará una tabla de botones de acuerdo al número de columnas y
filas que se defina. Para este caso, se creará una tabla de mesas de 9
botones, es decir, para manejar 9 mesas.

MESA \#1 | MESA \#2 | MESA \#3
---|---|---
MESA \#4 | MESA \#5 | MESA \#6
MESA \#7 | MESA \#8 | MESA \#9

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Básico >
Operaciones\].**

Ingrese a la operación de punto de ventas POS **\[Más operaciones > Ventas>
Punto de venta\].**

Ingrese a las configuraciones de la operación a **\[Menú: operación >
Configurar operación > Otras configuraciones > Múltiples cuentas pendientes
por facturar.\]**

Active la opción “Habilitar el manejo de cuentas pendientes por facturar”.

Determine el nombre para las cuentas pendientes por facturar, por ejemplo:
mesas, habitaciones, cuentas, turnos, entre otros.

Defina el número de columnas y el número de filas para obtener el número de
cuentas para facturar que requiere manejar.

Defina el código de la cuenta para facturar por defecto para ventas por
registradora.

Defina el documento de impresión por defecto para las cuentas pendientes por
facturar.


## Otras configuraciones de inventarios.

  * [Guía de montaje para venta de servicios.](<?id=\[GM\]80100>)
  * [Guía de montaje de listas de precios.](<?id=\[GM\]8030>)
  * [Guía de montaje de punto de venta POS.](<?id=\[GM\]8040>)
  * [Guía de montaje de series.](<?id=\[GM\]8060>)
  * [Guía de montaje de lotes.](<?id=\[GM\]80130>)
  * [Guía de montaje de elementos compuestos.](<?id=\[GM\]8070>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]8080>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  SERIES

Esta guía lo orientará en el montaje del submódulo de series, el cual permite
tener un control estricto de cada elemento de inventario, por medio de un
código único. Su alcance se limita en conocer las configuraciones que se deben
realizar en el sistema ContaPyme, para la implementación del submódulo y la
información que se puede predeterminar para el fácil y rápido registro de la
facturación.




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del submódulo de series.

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).



##  Configuración de los grupos de inventario

En esta sección se explica cómo configurar los grupos de inventario que
tendrán manejo de series.

## Requisitos

Tener definidos los grupos de inventario que manejarán series.

## Preparación de la información

Agrupe la lista de elementos que pertenecerán al grupo de inventarios que
tendrá el manejo de series.
Grupo | Elemento
---|---
Equipos de cómputo | Computador Portátil Asus CI3
Computador Portátil HP
Monitor 24P LED Samsung


## Procedimiento en \[ContaPyme\]

Vaya a la pestaña Inventarios.

En esta pestaña ejecute el “Configurador del módulo de inventarios”.
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este módulo.
  * Botón de ayudas acerca de este módulo.

Ingrese al catálogo de grupos de inventario **\[Cinta de opciones: Inventarios
> Grupos de inventario\].**

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de grupos de inventario”.**
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este catálogo.
  * Botón de ayudas acerca de este catálogo.

Adicione los grupos de inventario necesarios **\[Cinta de opciones del
catálogo: Crear\].**

Active en el grupo de inventario el manejo de series.



##  Configuración de manejo de series en entradas

En esta sección se determina la configuración de los campos que se van a
exigir en el registro de las entradas de la serie.

## Requisitos

Tener creado el grupo de inventario y activada la opción de series.

## Preparación de la información

Debe conocer toda la Información que tendrán las etiquetas y valores por
defecto en las entradas para el manejo de las series.
COLUMNA | VISIBLE | ETIQUETA | REQUERIDO | VALOR POR DEFECTO
---|---|---|---|---
SERIE | Si | Serie | Si |
FECHA 1 | Si | Fecha Vencimiento | Si | \[FSOPORT\]


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de grupos de inventario **\[Cinta de opciones: Inventarios
> Grupos de inventario\].**

Ingrese a la pestaña “Manejo series”.

Indique la fecha a partir de qué momento el sistema deberá llevar registro y
control la trazabilidad o del manejo de series.

Indique si se exigirán datos de trazabilidad en las entradas de los productos.

Indique la etiqueta para cada columna que requiera utilizar en la información
de la serie. La columna de etiqueta se utiliza en caso de que requiera
cambiarle el nombre que la columna trae por defecto, es decir si no desea que
se llame fecha 1 si no “fecha de vencimiento”.

Indique si la columna será requerida o no, es decir, cuales campos van hacer
exigencia, para que al momento de realizar la entrada de la serie verifique
que para el campo esté dado el valor solicitado.

Indique un valor por defecto para cada columna si aplica, tales como:

  * Código de la empresa
  * Número de la operación
  * Tipo de documento soporte
  * Numero de documento
  * Código de bodega/inventario
  * Código del centro de costos
  * Código del tercero
  * Fecha de soporte
  * Entre otros


Es decir, que el sistema trae la información automáticamente según el campo
que se configure. Por ejemplo si en fecha 1 se requiere que al momento de
realizar la entrada del producto automáticamente ponga la fecha de soporte de
la operación.

Indique el detalle que se debe incluir debajo de cada producto trazable en
documentos y reportes, por ejemplo \[SERIE/LOTE\], \[ENTRADAS.FECHA1\].


##  Configuración de manejo de series en salidas

En esta sección se determina la configuración de los campos que se van a
exigir en el registro de las salidas de la serie.

## Requisitos

Tener creado el grupo de inventario y activada la opción de series.

## Preparación de la información

Debe conocer toda la Información que tendrán las etiquetas y valores por
defecto en las salidas para el manejo de las series.

COLUMNA | VISIBLE | ETIQUETA | REQUERIDO | VALOR POR DEFECTO
---|---|---|---|---
SERIE | Si | Serie | Si |
FECHA 1 | Si | Fecha Vencimiento | Si | \[FSOPORT\]


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de grupos de inventario **\[Cinta de opciones: Inventarios
> Grupos de inventario\]**.

Ingrese a la pestaña “Manejo series”.

indique la etiqueta para cada columna que requiera utilizar en la información
de la serie. La columna de etiqueta se utiliza en caso de que requiera
cambiarle el nombre que la columna trae por defecto, es decir si no desea que
se llame fecha 1 si no “fecha de vencimiento”.

Indique si la columna será requerida o no, es decir, cuales campos van hacer
exigencia, para que al momento de realizar la entrada de la serie verifique
que para el campo esté dado el valor solicitado.

Indique un valor por defecto para cada columna si aplica, tales como:>

  * Código de la empresa
  * Número de la operación
  * Tipo de documento soporte
  * Numero de documento
  * Código de bodega/inventario
  * Código del centro de costos
  * Código del tercero
  * Fecha de soporte
  * Entre otros


Es decir, que el sistema trae la información automáticamente según el campo
que se configure. Por ejemplo si en fecha 1 se requiere que al momento de
realizar la entrada del producto automáticamente ponga la fecha de soporte de
la operación.

Indique el detalle que se debe incluir debajo de cada producto trazable en
documentos y reportes, por ejemplo \[SERIE/LOTE\], \[ENTRADAS.FECHA1\].


##  Configuración en la operación de ventas

En esta sección se debe configurar la impresión de series en la operación de
venta.

## Requisitos

Haber realizado las configuraciones en los grupos de inventario para el manejo
de series.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Pestaña Básico > Manejador de
operaciones\]**.

Ingrese a la operación de Facturación y ventas **\[Más operaciones > Ventas>
Facturación y ventas\]**.

Ingrese a las configuraciones de la operación **\[Menú: operación > Configurar
operación > Configuraciones para impresión de documentos > Configuración para
la impresión de series/lotes.\]**

Active como cargar la información de series/lotes:

  * Como renglones de ítems bajo el producto u observación \(según parámetros del documento de impresión\).
  * Como conjunto de datos independiente para cada producto \( se debe ajustar el diseño del documento\).



## Guías relacionadas

  * [Guía de montaje para venta de servicios.](<?id=\[GM\]80100>)
  * [Guía de montaje de listas de precios.](<?id=\[GM\]8030>)
  * [Guía de montaje de punto de venta POS.](<?id=\[GM\]8040>)
  * [Guía de montaje de lotes.](<?id=\[GM\]80130>)
  * [Guía de montaje de elementos compuestos.](<?id=\[GM\]8070>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]80100>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  LOTES

Esta guía lo orientará en el montaje de lotes para el módulo de inventarios,
la cual permite el registro de lotes de elementos de inventario \(código único
para representar un grupo de elementos que han sido procesados en condiciones
uniformes y homogéneas y que permite identificar el elemento en caso de ser
necesario retirarlo del mercado\). Su alcance se limita en conocer las
configuraciones que se pueden realizar en el sistema y la información que se
puede predeterminar para el fácil y rápido registro de la facturación con
lotes de la empresa.




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del submódulo de lotes.

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico.

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).

## Realice el proceso de capacitación del módulo de lotes

Ver acerca del módulo [aquí](<?id=\[AD\]8020>).



##  Configuración de los grupos de inventario

En esta sección se explica cómo configurar los grupos de inventario que
tendrán manejo de lotes.

## Requisitos

Tener definidos los grupos de inventario que manejarán lotes.

## Preparación de la información

Agrupe la lista de elementos que pertenecerán al grupo de inventarios que
tendrá el manejo de lotes.
Grupo | Elemento
---|---
Medicamentos | Acetaminofén Tabletas por 500mg
Ibuprofeno por 800 mg


## Procedimiento en \[ContaPyme\]

Vaya a la pestaña Inventarios.

En esta pestaña ejecute el “Configurador del módulo de inventarios”.
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este módulo.
  * Botón de ayudas acerca de este módulo.

Ingrese al catálogo de grupos de inventario **\[Cinta de opciones: Inventarios
> Grupos de inventario\].**

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de grupos de inventario”.**
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este catálogo.
  * Botón de ayudas acerca de este catálogo.

Adicione los grupos de inventario necesarios **\[Cinta de opciones del
catálogo: Crear\].**

Active en el grupo de inventario el manejo de lotes.



##  Configuración de manejo de lotes en entradas

En esta sección se determina la configuración de los campos que se van a
exigir en el registro de las entradas de los lotes.

## Requisitos

Tener creado el grupo de inventario y activada la opción de lotes.

## Preparación de la información

Debe conocer toda la Información que tendrán las etiquetas y valores por
defecto en las entradas para el manejo de los lotes.
COLUMNA | VISIBLE | ETIQUETA | REQUERIDO | VALOR POR DEFECTO
---|---|---|---|---
LOTE | Si | Lote | Si |
FECHA 1 | Si | Fecha Vencimiento | Si | \[FSOPORT\]


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de grupos de inventario **\[Cinta de opciones: Inventarios
> Grupos de inventario\].**

Ingrese a la pestaña “Manejo lotes”.

Indique la fecha a partir de qué momento el sistema deberá llevar registro y
control la trazabilidad o del manejo de lotes.

Indique si se exigirán datos de trazabilidad en las entradas de los productos.

Indique la etiqueta para cada columna que requiera utilizar en la información
de los lotes. La columna de etiqueta se utiliza en caso de que requiera
cambiarle el nombre que la columna trae por defecto, es decir si no desea que
se llame fecha 1 si no “fecha de vencimiento”.

Indique si la columna será requerida o no, es decir, cuales campos van hacer
exigencia, para que al momento de realizar la entrada de los lotes verifique
que para el campo esté dado el valor solicitado.

Indique un valor por defecto para cada columna si aplica, tales como:

  * Código de la empresa
  * Número de la operación
  * Tipo de documento soporte
  * Numero de documento
  * Código de bodega/inventario
  * Código del centro de costos
  * Código del tercero
  * Fecha de soporte
  * Entre otros


Es decir, que el sistema trae la información automáticamente según el campo
que se configure. Por ejemplo si en fecha 1 se requiere que al momento de
realizar la entrada del producto automáticamente ponga la fecha de soporte de
la operación.

Indique el detalle que se debe incluir debajo de cada producto trazable en
documentos y reportes, por ejemplo \[SERIE/LOTE\], \[ENTRADAS.FECHA1\].


##  Configuración de manejo de lotes en salidas

En esta sección se determina la configuración de los campos que se van a
exigir en el registro de las salidas de los lotes.

## Requisitos

Tener creado el grupo de inventario y activada la opción de lotes.

## Preparación de la información

Debe conocer toda la Información que tendrán las etiquetas y valores por
defecto en las salidas para el manejo de los lotes.

COLUMNA | VISIBLE | ETIQUETA | REQUERIDO | VALOR POR DEFECTO
---|---|---|---|---
LOTE | Si | Lote | Si |
FECHA 1 | Si | Fecha Vencimiento | Si | \[FSOPORT\]


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de grupos de inventario **\[Cinta de opciones: Inventarios
> Grupos de inventario\]**.

Ingrese a la pestaña “Manejo lotes”.

Indique la etiqueta para cada columna que requiera utilizar en la información
de los lotes. La columna de etiqueta se utiliza en caso de que requiera
cambiarle el nombre que la columna trae por defecto, es decir si no desea que
se llame fecha 1 si no “fecha de vencimiento”.

Indique si la columna será requerida o no, es decir, cuales campos van hacer
exigencia, para que al momento de realizar la entrada de los lotes verifique
que para el campo esté dado el valor solicitado.

Indique un valor por defecto para cada columna si aplica, tales como:>

  * Código de la empresa
  * Número de la operación
  * Tipo de documento soporte
  * Numero de documento
  * Código de bodega/inventario
  * Código del centro de costos
  * Código del tercero
  * Fecha de soporte
  * Entre otros


Es decir, que el sistema trae la información automáticamente según el campo
que se configure. Por ejemplo si en fecha 1 se requiere que al momento de
realizar la entrada del producto automáticamente ponga la fecha de soporte de
la operación.

Indique el detalle que se debe incluir debajo de cada producto trazable en
documentos y reportes, por ejemplo \[SERIE/LOTE\], \[ENTRADAS.FECHA1\].


##  Configuración en la operación de ventas

En esta sección se debe configurar la impresión de lotes en la operación de
venta.

## Requisitos

Haber realizado las configuraciones en los grupos de inventario para el manejo
de lotes.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Pestaña Básico > Manejador de
operaciones\]**.

Ingrese a la operación de Facturación y ventas **\[Más operaciones > Ventas>
Facturación y ventas\]**.

Ingrese a las configuraciones de la operación **\[Menú: operación > Configurar
operación > Configuraciones para impresión de documentos > Configuración para
la impresión de series/lotes.\]**

Active como cargar la información de series/lotes:

  * Como renglones de ítems bajo el producto u observación \(según parámetros del documento de impresión\).
  * Como conjunto de datos independiente para cada producto \( se debe ajustar el diseño del documento\).



## Guías relacionadas

  * [Guía de montaje para venta de servicios.](<?id=\[GM\]80100>)
  * [Guía de montaje de listas de precios.](<?id=\[GM\]8030>)
  * [Guía de montaje de punto de venta POS.](<?id=\[GM\]8040>)
  * [Guía de montaje de series.](<?id=\[GM\]8060>)
  * [Guía de montaje de elementos compuestos.](<?id=\[GM\]8070>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]80100>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  ELEMENTOS COMPUESTOS

Esta guía lo orientará en el montaje de elementos compuestos, el cual le
permitirá controlar un elemento de inventario que se compone de cantidades ya
establecidas de otros elementos de inventario. Su alcance se limita en conocer
las configuraciones que se deben realizar en el sistema \[ContaPyme\], para la
implementación del manejo de elementos compuestos y la información que se
puede predeterminar para el fácil y rápido registro de la facturación y el
control del inventario.




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del manejo de elementos compuestos.

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).

## Realice el proceso de capacitación de inventarios gestión comercial,
elementos compuestos

Ver Curso de inventarios gestión comercial
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD140>).


## Lista de los elementos compuestos que tiene la empresa

Realice una lista de los elementos compuestos que tiene la empresa, indicando
la unidad de medida de cada uno.

Una empresa que se dedica a la comercialización de productos de la canasta
familiar:
Elemento | Unidad
---|---
Leche entera pack x 6 | Und
Yogurt Alpina 1.750 Gr | Und
Leche saborizada Alpin | Und
Arroz 500 Gr | Und
Frijol 1 Kg | Und
Spaguetti 500 Gr | Und



##  Configuración de los grupos de inventario

En esta sección se explica cómo configurar los grupos de inventario que
tendrán manejo de series.

## Requisitos

Tener definidos los grupos de inventario que manejarán elementos compuestos.

## Preparación de la información

Agrupe la lista de elementos que pertenecerán al grupo de inventarios que
tendrá el manejo de elementos compuestos.
Grupo | Elemento
---|---
Kits | Kit de lácteos
Kit de Granos


## Procedimiento en \[ContaPyme\]

Vaya a la pestaña Inventarios.

En esta pestaña ejecute el “Configurador del módulo de inventarios”.
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este módulo.
  * Botón de ayudas acerca de este módulo.

Ingrese al catálogo de grupos de inventario **\[Cinta de opciones: Inventarios
> Grupos de inventario\].**

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de grupos de inventario”.**
En este punto cuenta con las siguientes ayudas:

  * Botón de videos acerca de este catálogo.
  * Botón de ayudas acerca de este catálogo.

Adicione los grupos de inventario necesarios **\[Cinta de opciones del
catálogo: Crear\].**


##  Activación del manejo de elementos compuestos

En esta sección se explica cómo activar en \[ContaPyme\] el manejo de
elementos compuestos.

## Requisitos

No se requiere.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de elementos de inventario **\[Cinta de opciones: Pestaña
Inventarios > Catálogo de elementos de inventario\].**

Dé clic al botón “Configuración” ubicado en la cinta de opciones.

En la ventana de configuración busque en el menú del lado izquierdo la opción
“Elementos de inventarios compuestos” y active la opción “Permitir la
definición de elementos de inventario compuestos”, ubicada al lado derecho del
menú.

Luego de activar la opción, debe indicar la cantidad de decimales que se usará
al registrar la cantidad de las partes que componen un elemento compuesto.


##  Creación de elementos compuestos

En esta sección se determina como realizar la creación y configuración del
elemento compuesto.

## Requisitos

Tener creado los grupos de inventario.

## Preparación de la información

Debe definir el manejo en el inventario que tendrá el elemento compuesto:

  * Que controle cantidad en inventario
  * Que no controle cantidad en inventario.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de elementos de inventario **\[Cinta de opciones: Pestaña
Inventarios > Elementos de inventario\].**.

En esta pestaña ejecute el **“Asistente de configuración inicial del catálogo
de elementos de inventario”.**

Adicione los elementos de inventario **\[Cinta de opciones del catálogo:
Opción Crear\].**

Active la opción de “Controlar cantidad en inventario”

Ingrese a la pestaña “Compuesto”.

Active la opción “Este elemento de inventario es compuesto”.


##  Configuración de los elementos compuestos \(Tipo de comportamiento y
partes que lo componen\)

En esta sección se determina la configuración del tipo de comportamiento y la
lista de partes que se van a cargar al momento de crear un elemento compuesto.

## Requisitos

Haber activado la opción “Este elemento de inventario es compuesto”.

Indicar si el elemento compuesto va a controlar o no cantidad en inventario.


## Preparación de la información

Debe definir:

  * Que comportamiento tendrán en el inventario las partes que conforman el elemento compuesto cuando este sea usado en operaciones como la de facturación y ventas.


  * La forma como aparecerá el elemento compuesto al momento de la impresión de la factura y la cotización.


  * Las partes que componen el elemento compuesto y las cantidades de cada una de ellas.


## Procedimiento en \[ContaPyme\]

Ingrese a la pestaña “Compuesto” en el elemento de inventario.

En el campo tipo, indique el tipo de comportamiento que tendrá el elemento
compuesto de esta forma:

Cuando configure el elemento compuesto para que **NO** controle cantidades en
inventario tiene la posibilidad de seleccionar tres diferentes opciones de
comportamiento para las partes como:

  * Combo egreso
  * Combo descriptivo de partes
  * Combo plantilla para ventas


Cuando configure el elemento compuesto para que este **SI** controle
cantidades en inventario, sólo tendrá la opción “Combo descriptivo de partes.

Adicionalmente, si el elemento compuesto controla cantidades en inventario y
tiene configurado “Es de producción interna” también activará la opción “En
embodegamiento causa consumo de sus partes”.


**Nota:** Debe tener presente que algunos de estos tipos pueden no estar
disponibles en la lista de selección, ya que dependen de las opciones de
comportamiento del primer paso del asistente de elementos de inventario "tipo
de inventario".



Configure la forma como aparecerá el elemento compuesto en la impresión de las
facturas de venta:

  * Facturar solamente el elemento compuesto
  * Facturar el elemento compuesto discriminando sus partes con precio.
  * Facturar el elemento compuesto discriminando sus partes sin precio.
  * Facturar el elemento compuesto discriminando en observaciones sus partes.
  * Facturar solamente las partes del elemento compuesto.


Configure la forma como aparecerá el elemento compuesto en la impresión de las
cotización:

  * Cotizar solamente el elemento compuesto
  * Cotizar el elemento compuesto discriminando sus partes con precio.
  * Cotizar el elemento compuesto discriminando sus partes sin precio.
  * Cotizar el elemento compuesto discriminando en observaciones sus partes.
  * Cotizar solamente las partes del elemento compuesto.


En la pestaña “lista de partes”, defina los elementos o partes que conforman
el elemento compuesto, por cada parte debe indicar:

  * Elemento o parte.
  * Cantidad.


Elemento compuesto | Lista de partes | Unidad
---|---|---
Kit de lácteos | Leche entera pack x 6  | 1
Yogurt Alpina 1.750 Gr | 2
Leche saborizada Alpin | 5


Seleccione el costo base que desea usar para el cálculo del "costo und." de
cada parte \(este costo es sólo informativo\).

  * Costo promedio ponderado ingresos de inventario
  * Costo promedio ponderado
  * Ultimo costo de embodegamiento
  * Ultimo precio de compra




## Guías relacionadas

  * [Guía de montaje para venta de servicios.](<?id=\[GM\]80100>)
  * [Guía de montaje de listas de precios.](<?id=\[GM\]8030>)
  * [Guía de montaje de punto de venta POS.](<?id=\[GM\]8040>)
  * [Guía de montaje de series.](<?id=\[GM\]8060>)
  * [Guía de montaje de lotes.](<?id=\[GM\]80130>)
  * [Guía de montaje de facturación en moneda extranjera.](<?id=\[GM\]2050>)
  * [Guía de montaje de comisiones por venta y recaudo.](<?id=\[GM\]8080>)
  * [Guía de montaje de perfiles de clientes.](<?id=\[GM\]8090>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  INVENTARIOS COMISIONES

Esta guía lo orientará en el montaje de un sistema de comisiones de vendedores
en \[ContaPyme\]. Su alcance se limita a calcular comisiones en venta y en
recaudo teniendo en cuenta diferentes condiciones para dicho cálculo como son
porcentajes fijos, comisiones por venta de ciertos productos y también permite
calcular comisiones a vendedores asociados.




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje del módulo de inventarios comisiones.

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).

## Realice el proceso de capacitación del módulo de Inventarios comisiones

Ver Curso de Inventarios comisiones
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD140>).

## Estudie el documento Acerca del módulo

Estudie el documento Acerca del módulo, donde se explican todos los conceptos
necesarios para entender esta guía de montaje. [aquí](<?id=\[AD\]8020>).



##  Activación del manejo de comisiones

En esta sección se explica cómo activar en \[ContaPyme\] el manejo de
comisiones a vendedores. Cuando se activa el manejo de comisiones el sistema
empieza a realizar el cálculo de las comisiones a los vendedores, ya sea en la
venta o en el recaudo.

## Requisitos

No se requiere.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de terceros **\[Cinta de opciones: Pestaña básico >
Terceros\].**

Dé clic al botón “Configuración” ubicado en la cinta de opciones.

En la ventana de configuración busque en el menú del lado izquierdo la opción
“Configuraciones generales”; “Vendedores”, “Activar manejo de comisiones” y
proceda a activar la opción “Activar el manejo de comisiones a vendedores”,
ubicada al lado derecho del menú.

Luego de activar la opción, debe indicar la fecha a partir de la cual desea
que se empiecen a calcular las comisiones.


##  Configuración para el cálculo de comisiones

Esta sección indica cómo configurar la forma en la que se calcularán las
comisiones a los vendedores y las cuentas contables que el sistema utilizará
para llevar los valores correspondientes al cálculo.

## Requisitos

Tenga creadas las cuentas contables a utilizar para la cuenta por pagar, los
egresos y la cuenta por cobrar por devolución en ventas.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de terceros **\[Cinta de opciones: Pestaña básico >
Terceros\].**

Dé clic al botón “Configuración” ubicado en la cinta de opciones.

En la ventana de configuración busque en el menú del lado izquierdo la opción
“Configuraciones generales”; “Vendedores”, “Configuración para el cálculo de
comisiones” y seleccione tanto en la opción “En ventas” como en la opción “En
recaudo” el tipo de valor base que el sistema utilizará para calcular las
comisiones.

Luego, busque en la parte izquierda la opción “Cuentas por defecto para
comisiones” y proceda a configurar las cuentas de cuenta por pagar, egreso y
cuenta por cobrar para las comisiones por venta; y las cuentas de cuenta por
pagar y egresos para las comisiones en recaudo.

Finalmente dé clic al botón aceptar.


##  Creación de los perfiles de vendedores

Esta sección indica cómo crear los perfiles de vendedores a los cuales se les
indicará la forma de calcular las comisiones y las condiciones adicionales
para dicho cálculo.

## Requisitos

Tener activo el cálculo de comisiones.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de perfiles de vendedores **\[Cinta de opciones: Pestaña
Básico > Terceros, despliegue la flecha hacia abajo > Perfil de
vendedores\].**

Para crear un nuevo perfil de vendedor dé clic al botón “Crear” y diligencie
el asistente de creación de perfiles de vendedor.


##  Asignación de los perfiles de vendedor a los vendedores

Esta sección indica cómo asignar los perfiles de vendedor a cada uno de los
terceros vendedores.

## Requisitos

Tener creados los terceros vendedores y los perfiles de vendedores.

## Preparación de la información

Liste cada uno de los terceros vendedores, teniendo en cuenta el tipo de
perfil que le asignará a cada uno.

Ejemplo:

NOMBRE DEL VENDEDOR | PERFIL PARA ASIGNAR
---|---
Juan Pérez | Comisión recaudo 3%
Ana García | Comisión venta 2,5%
Andrés Ramírez | Comisión monto ventas > $5.000.000

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de terceros **\[Cinta de opciones: Pestaña Básico >
Terceros\].**

Busque al tercero vendedor al cual desea asignarle el perfil de vendedor, dé
clic derecho modificar, busque la pestaña “Datos vendedor” y en la zona de
registro diligencia los datos de autorización, fechas de validez, centro de
costos que afecta y en la columna perfil seleccione el perfil a asignar.

Dé clic al botón aceptar.


##  Active los permisos para visualizar los cálculos de las comisiones

Esta sección indica cómo activar los permisos para poder visualizar los
cálculos que el sistema realiza de las comisiones, tanto en las ventas como en
los abonos o recaudos.

## Requisitos

No se requiere.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de perfiles de seguridad **\[Cinta de opciones: Pestaña
Básico > Usuarios, despliegue la flecha hacia abajo > Perfiles de seguridad
para clientes desktop\].**

Seleccione el perfil del o de los usuarios a los cuales desea darles permisos
para visualizar los cálculos de las comisiones en venta y en recaudo y dé clic
al botón modificar.

En la ventana de edición del perfil, busque al lado derecho la opción
“Inventarios, compras, facturación y punto de venta” y al lado derecho busque
la pestaña “Opciones”. Allí podrá encontrar el listado de permisos en el
apartado de “Sistema de liquidación de comisiones” y podrá activar permisos
para ver, modificar y/o cambiar las comisiones calculadas tanto en la
operación de facturación y ventas como en la operación de recaudo \(abono a
cuentas por cobrar\).

Dé clic al botón aceptar.


##  Active el paso para visualización/modificación de comisiones calculadas en
la venta

Esta sección indica cómo activar en la operación de ventas, el paso donde se
visualizarán o se podrán modificar algunos datos de los valores calculados de
comisiones.

## Requisitos

No se requiere.

## Preparación de la información

No se requiere.

## Procedimiento en \[ContaPyme\]

Ingrese al manejador de operaciones **\[Cinta de opciones: Pestaña Básico >
Operaciones\].**

Ingrese a la operación de facturación y ventas **\[Más operaciones > Ventas >
Facturación y ventas.\] **

Ingrese a la opción “Operación”, “Configuración”. En la ventana de
configuración busque en el menú del lado izquierdo la opción “Visualización de
pasos en el asistente” y al lado derecho active la opción “Liquid. de
comisiones a vended.”

Dé clic al botón aceptar.


## Guías relacionadas

  * [Guía de montaje de Inventarios básico](<?id=\[GM\]8010>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].



# Guía de montaje

##  PERFILES DE CLIENTES

Esta guía lo orientará en el montaje para la creación y asignación de perfiles
de clientes en el programa \[ContaPyme\] para manejar los tipos de descuento,
plazos en días para cuentas por cobrar y asignación de listas de precio.




##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje de los perfiles de clientes.

## Realice el montaje del sistema básico

\(creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Ver Guía de montaje del módulo de sistema básico [aquí](<?id=\[GM\]1010>).

## Realice el montaje del módulo de inventario básico

\(creación y configuración de las bodegas, grupos de inventario, elementos de
inventario\).
Ver Guía de montaje del módulo de inventario básico [aquí](<?id=\[GM\]8010>).

## Realice el montaje de inventarios comercial

\(definición de listas de precios, asignación de listas de precios,
actualización de listas de precios\).
Para más información consulte la Guía de montaje de inventario comercial\)[
aquí](<?id=\[GM\]>).

## Realice el proceso de capacitación

Realice el proceso de capacitación de inventarios gestión comercial, perfiles
de clientes.
Ver Curso de inventarios gestión comercial
[aquí](<https://www.\[ContaPyme\].com/Capacitacion-Virtual/#/CP40MOD140>).

## Defina los perfiles de clientes a crear y las características de cada uno
de ellos

Perfiles de clientes
---
Perfil general de clientes
Perfil clientes VIP
Perfil clientes mayoristas
Perfil clientes minoristas



##  Creación de perfiles de clientes

En esta sección se indica cómo crear los perfiles de clientes en
\[ContaPyme\].

## Requisitos

Defina las características que tendrá el perfil de clientes: lista de precios,
centro de costos, cupo de crédito, días de plazo y tipo de descuento a
aplicar.

## Preparación de la información

No hay preparación de información

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Perfiles de clientes **\[Cinta de opciones: Pestaña
Básico > Menú Terceros > Perfiles de clientes\].**

Dé clic derecho sobre el catálogo y seleccione la opción Crear.

En esta pestaña ejecute el “Asistente de configuración inicial del catálogo de
perfiles de clientes”.

Asigne la identificación del perfil de clientes.

Asigne las características al perfil del clientes: Lista de precios, centro de
costos, cupo de crédito, días de plazo en cuentas por cobrar, y tipo de
descuento que se hace.


##  Manejo de descuentos comerciales

En esta sección se indica cómo crear los diferentes descuentos comerciales
para ser asignados en los perfiles de clientes en \[ContaPyme\].

## Requisitos

No hay requisitos.

## Preparación de la información

Defina el tipo de descuento comercial a aplicar en el perfil de clientes.

Tipo de descuento que se hace
---
No aplica
Porcentaje fijo
Por línea o producto
Por monto de ventas

Los descuentos comerciales son excluyentes, esto significa que solo se puede
seleccionar una opción en el perfil de clientes, no se pueden seleccionar
varias.

Tipo de descuento que se hace
---
No aplica |
Porcentaje fijo | <10%
Por línea o producto |
Por monto de ventas |


Tipo de descuento que se hace
---
No aplica |  |
Porcentaje fijo |  |
Por línea o producto | Computador toto en Uno HP | 5%
Por monto de ventas |  |


Tipo de descuento que se hace
---
No aplica |  |
Porcentaje fijo |  |
Por línea o producto |  |
Por monto de ventas | Monto mínimo: 1.000.000 | 3%



## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Perfiles de **\[Cinta de opciones: Pestaña Básico >
Menú Terceros > Perfiles de clientes\].**

En la opción Tipo de descuento que se hace, seleccione el descuento que tendrá
el perfil de clientes.

Indique como se aplicará el descuento según la opción seleccionada, el
porcentaje fijo, la línea o producto sobre la cual aplica el descuento o el
monto de ventas mínimo.


##  Manejo de descuentos financieros \(condicionado\)

En esta sección se indica cómo asignar a un perfil de clientes descuentos
financieros por pronto pago en \[ContaPyme\].

## Requisitos

No hay requisitos.

## Preparación de la información

Defina las condiciones a cumplir para asignar al perfil de clientes los
descuentos condicionados: días de pago y los descuentos a aplicar según los
días de pago.

Días de pago | % de descuento
---|---
0-30 días | 10%
31-60 días | 5%

Defina el nombre del descuento condicionado para mostrar en la factura.


## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Perfiles de clientes **\[Cinta de opciones: Pestaña
Básico > Menú Terceros > Perfiles de clientes\].**

En la pestaña descuento financiero por pronto pago indique: días de pago y
porcentaje de descuento, nombre del descuento condicionado para mostrar en la
factura.


## Guías relacionadas

  * [Guía de montaje de Inventarios básico](<?id=\[GM\]8010>)
  * [Guía de montaje de inventarios comercial](<?id=\[GM\]>)
  * [Guía de montaje de listas de precios](<?id=\[GM\]8030>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].
