=AtributoActivo \( \)

Descripción

\*Esta función es utilizada para conocer cualquier atributo de un activo según
el código dado. Tenga en cuenta que los atributos son características dadas a
cada activo y se configuran desde el catálogo de activos de ContaPyme®.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoActivo  |  \(** NAtributo; IActivo; IEmp\*; Fecha\*: BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.  |  Valor Requerido
Iactivos
\(Requerido\)  |  Alfanumérico  |  Código de un activo creado en el catálogo de activos de ContaPyme®.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea consultar el atributo determinado.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * A continuación se visualizan unos atributos de algunos activos creados en el catálogo de activos de ContaPyme®.

Código activo  |  Nombre activo  |  Fecha Combra  |  Cód. tipo de activo  |  Cuenta activo
---|---|---|---|---
COM001  |  Computador Dell 1580  |  30/04/2018  |  Propiedad planta y equipo  |  152805
LOC001  |  Local centro  |  1/04/2016  |  Propiedad planta y equipo  |  152405
1604-CE-000044-1  |  Papeleria  |  30/04/2016  |  Diferido  |  171032

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.

|  =AtributoActivo  |  \(** NAtributo; IActivo; IEmp\*; Fecha\*: BLocal\* ** \)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre del activos COM001  |  =AtributoActivo \( "NActivo"**;** "COM001" \)  |  Computador Dell 1580
Cúal es la cuenta afectada por el activo 1604-CE-000044-1  |  =AtributoActivo \( "ICUENTAACTIVO"**;** "1604-CE-000044-1" \)  |  171032
Cúal fue la fecha de compra del activo LOC001  |  =AtributoActivo \( "FCOMPRA"**;** "LOC001"**;** "1"**;** **;** "T" \)  |  1/04/2016


\*\[ATRIBUTOS:Activos\]\*

---

=CantidadUsoActivo \( \)

Descripción

Esta función suma los usos de un activo en las unidades configuradas por el
usuario entre un periodo de tiempo.

Para consultar el uso del activo se recomienda tener presente la configuración
del método de depreciación indicado por el usuario en dicho activo \(unidades
de uso, unidades de producción\).

Tenga en cuenta que esta función es basada en las operaciones de "Planilla de
uso de maquinaria y equipo".


Otras aplicaciones

Con esta función también podrá:

  * Calcular el uso de varios activos en un periodo de tiempo determinado.
  * Calcular el uso de los activos utilizados en una misma labor.
  * Calcular el uso de los activos utilizados en un centro de costos determinado.

Sintáxis

|  =CantidadUsoActivo  |  \(** ListaActivos; ILabor\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ListaActivos
\(Opcional\)  |  Alfanumérico  |  Código de uno o más activos del catálogo de activos de ContaPyme® a los cuales se desea consultar el uso.  |  Valor requerido
ILabor\*
\(Opcional\)  |  Alfanumérico  |  Código de una o varias labores, las cuales son imputadas en el uso del activo.  |  Toma el valor de todas las labores creadas en ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Determina el periodo en que se calculará el uso de uno o más activos.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan el uso de un activo.  |  Calcula el uso de los activos imputados a todos los centros de costos creados en el explorador gráfico de el explorador gráfico de ContaPyme®.
Blocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadUsoActivo\( "COM001","TRAC001"**;** "0,1"**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** "1010"**;** "F"\)

Ejemplos

  * La empresa 1, CMB Muebles, tienen una impresora multifuncional HP y el tipo de depreciación del activo es por unidades de uso.

Desde ContaPyme® se realizó el registro del uso de la impresora de la
siguiente manera:

####  IMP001 - Impresora multifuncional HP

Fecha de compra: 15/Jun/2016
Valor de compra: $6.000.000
Vida Util: 5.200 Impresiones
Unidades de Uso: Impresiones

---
Fecha de uso  |  Labor en que se utilizó el activo  |  CC que utilizó el activo  |  Cantidad uso
25/Jun/2016  |  0 - Labores generales  |  1010 - Departamento administrativo  |  150
16/Jul/2016  |  0 - Labores generales  |  1010 - Departamento administrativo  |  80
2/Dic/2016  |  0 - Labores varial  |  1020 - Departamento comercial  |  60
3/May/2017  |  1 - Labores varias  |  1010 - Departamento administrativo  |  75
5/Abril/2017  |  0 - Labores generales  |  1010 - Departamento administrativo  |  265
7/Ago/2017  |  0 - Labores generales  |  1030 - Departamento financiero  |  189
25/Nov/2017  |  1 - Labores varias  |  1030 - Departamento financiero  |  146

|  =CantidadUsoActivo  |  \(** ListaActivos; ILabor\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál ha sido el uso de la impresora en todo el año 2016?.  |  =CantidadUsoActivo\( "IMP001" **;** Fecha\(2016;1;1\)**;** Fecha\(2016;12;31\)\)  |  290
Determinar ¿cuál ha sido el uso de la impresora para la labor 0 - labores generales en el año 2017?.  |  =CantidadUsoActivo\( "IMP001"**;** 0**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\) \)  |  454
Determinar ¿cuál ha sido el uso de la impresora por el centros de costos, 1010 - Departamento administrativo?.  |  =CantidadUsoActivo\( "IMP001"**;** **;** **;** Fecha\(2018;1;1\)**;** 1**;** "1020"\)  |  570

---

=CantidadUsoActivoFiltro \( \)

Descripción

Esta función calcula la cantidad de veces que se ha utilizado un activo con un
filtro determinado.

Tenga en cuenta que esta función es basada en las operaciones de "Planilla de
uso de maquinaria y equipo".

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Calcular la cantidad de veces que se ha utilizado varios activos en un periodo determinado.
  * Calcular la cantidad de veces que se ha utilizado un activo en una labor determinada.

Sintaxis

|  =CantidadUsoActivoFiltro  |  \(** Filtro\*; ListaActivos; ILabor\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **IRESPONSABLE='800500236'**

Ver algunos filtros.  |  No se realiza ningún filtro en la función
ListaActivos
\(Requerido\)  |  Alfanumérico  |  Código de uno o más activos del catálogo de activos de ContaPyme® a los cuales se desea consultar su uso.  |  Valor requerido
ILabor\*
\(Opcional\)  |  Alfanumérico  |  Código de una o varias labores, las cuales han sido registradas con el uso del activo.  |  Toma el valor de todas las labores creadas en ContaPyme®, las cuales han sido utilizadas con el activo usado en la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Determina el periodo en que se calculará el uso del activo.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadUsoActivoFiltro\( Filtro\(\)**;** "COM1","LOC1"**;**
"100,,200"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1**;**
"12,13"\)

Ejemplos

  * La empresa 1, CMB Muebles, tiene diferentes activos donde el modelo de depreciación de algunos de ellos es por unidades de uso.

Desde ContaPyme® se realizó el registro del uso de los activos bajo la
operación: "Planilla uso de maquinaria y equipo" de la siguiente manera:

Fecha de uso  |  Cód. Responsable activo  |  Cód. Activo  |  Labor en que se utilizó el activo  |  CC que utilizó el activo  |  Cantidad uso
---|---|---|---|---|---
25/Jun/2016  |  89654215  |  IMP002  |  0 - Labores generales  |  1010 - Departamento administrativo  |  150
16/Jul/2016  |  564793215  |  COM002  |  0 - Labores generales  |  1010 - Departamento administrativo  |  80
2/Dic/2016  |  56485213  |  IMP001  |  0 - Labores varial  |  1020 - Departamento comercial  |  60
3/Mar/2017  |  89654215  |  IMP002  |  1 - Labores varias  |  1010 - Departamento administrativo  |  75
5/Abr/2017  |  56485213  |  TRA001  |  0 - Labores generales  |  1010 - Departamento administrativo  |  265
7/Ago/2017  |  789562845  |  IMP001  |  0 - Labores generales  |  1030 - Departamento financiero  |  189
25/Nov/2017  |  56485213  |  VEH002  |  1 - Labores varias  |  1030 - Departamento financiero  |  146

  * Con los datos registrados se utilizó la fórmula de la siguiente manera:


=CantidadUsoActivoFiltro \( Filtro\* **;** ListaActivos**;** ILabor\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuánto ha sido el uso de los activos asociados al responsable identificado con código 56485213?  |  =CantidadUsoActivoFiltro\( "IRESPONSABLE='56485213'" "IMP001,TRA001,VEH002" \)  |  471
Determinar ¿cuánto ha sido el uso del activo IMP002 cuyo responsable es el código 89654215?  |  =CantidadUsoActivoFiltro\( "IRESPONSABLE='89654215'"**;** "IMP002" \)  |  396


También se pueden utilizar los atributos asociados a un activo como filtros
**Ej.**

=CantidadUsoActivoFiltro\( "NPROVEEDOR='80050062'"**;** "IMP001" \)

\*\[ATRIBUTOS:Activos\]\*

---

=CostoHistoricoActivo \( \)

Descripción

Esta función muestra el costo de un activo en una fecha determina. Tenga en
cuenta que el costo del activo es un valor que se registra al momento de la
compra o del cargue inicial del activo en la contabilidad.

Otras aplicaciones

Con esta función también podrá:

  * Determinar el costo de un activo según la empresa donde se encuentra.

Sintáxis

|  =CostoHistoricoActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IActivo
\(Requerido\)  |  Alfanumérico  |  Código del activo que se desea conocer su costo.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar el costo histórico del activo.  |  Establece el código de la empresa de trabajo configurada en el momento.
**Fecha\***
\(Opcional\)  |  Fecha  |  Determina la fecha en la que se desea consultar el costo histórico del activo indicado.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
Blocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó la consulta de activos el 1/07/2018 desde ContaPyme®, la cual arrojó los siguientes datos:

Cód activo  |  Nombre activo  |  Fecha de compra  |  Valor de compra  |  Valor Depreciado  |  Vida útil \(meses\)  |  Vida restante \(meses\)  |  Valor a hoy \(1/Jul/2018\)
---|---|---|---|---|---|---|---
COM001  |  Computador Dell 1580  |  12/Jun/2013  |  $4.000.000  |  $\(4.000.000\)  |  36  |  0  |  $0.0
IMP001  |  Impresora Dell  |  01/may/2015  |  $6.000.000  |  $\(5.700.000\)  |  40  |  2  |  $300.000
LOC002  |  Oficina 13 Av. Santander  |  1/Ene/2018  |  $240,000,000  |  $\(6.000.000\)  |  240  |  234  |  $234.000.000
VEH003  |  Furgoneta KII-537  |  28/Dic/2014  |  $81,000,000  |  $\(56,700,000\)  |  60  |  18  |  $24,300,000

|  =CostoHistoricoActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál fue el costo por obterner el activo COM001?.  |  =CostoHistoricoActivo\( "COM001" \)  |  $4.000.000
Determinar ¿cuánto fue el valor de compra del activo VEH003?.  |  =CostoHistoricoActivo\( "VEH003"**;** 1**;** Fecha\(2018;12;31\)**;** "T"\)  |  $ 81.000.000

---

=DepreciacionActivo \( \)

Descripción

Esta función calcula la depreciación de un activo a una fecha determina. Tenga
en cuenta que la depreciación de un activo es generada cada mes, al ejecutar
la operación de acciones automáticas de fin de mes.

El valor de la depreciación depende del método configurado en el activo.

Otras aplicaciones

Con esta función también podrá:

  * Determinar la depreciación de un activo según la empresa donde se encuentra.

Sintáxis

|  =DepreciacionActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IActivo
\(Requerido\)  |  Alfanumérico  |  Código del activo que se desea conocer la depreciación.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la depreciación del activo.  |  Establece el código de la empresa de trabajo configurada en el momento.
**Fecha\***
\(Opcional\)  |  Fecha  |  Determina la fecha en la que se desea consultar la depreciación del activo indicado.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
Blocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó la consulta de activos el 1/07/2018 desde ContaPyme®, la cual arrojó los siguientes datos:

Cód activo  |  Nombre activo  |  Fecha de compra  |  Valor de compra  |  Valor Depreciado  |  Vida útil \(meses\)  |  Vida restante \(meses\)  |  Valor a hoy \(1/Jul/2018\)
---|---|---|---|---|---|---|---
COM001  |  Computador Dell 1580  |  12/Jun/2013  |  $4.000.000  |  $\(4.000.000\)  |  36  |  0  |  $0.0
IMP001  |  Impresora Dell  |  01/may/2015  |  $6.000.000  |  $\(5.700.000\)  |  40  |  2  |  $300.000
LOC002  |  Oficina 13 Av. Santander  |  1/Ene/2018  |  $240,000,000  |  $\(6.000.000\)  |  240  |  234  |  $234.000.000
VEH003  |  Furgoneta KII-537  |  28/Dic/2014  |  $81,000,000  |  $\(56,700,000\)  |  60  |  18  |  $24,300,000

|  =DepreciacionActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál fue la depreciación del activo COM001 al 1/jul/2018?.  |  =DepreciacionActivo\( "COM001" Fecha\(2018;07;1\) \)  |  $ \(4.000.000\)
Determinar ¿cuánto fue la depreciación del activo VEH003 al 1/jul/2018?.  |  =DepreciacionActivo\( "VEH003"**;** 1**;** Fecha\(2018;07;1\)**;** "T"\)  |  $ \(56.700.000\)
Determinar ¿cuánto fue la depreciación del activo VEH003 al 1/ Jun/ 2015?. _5 meses transcurridos desde la fecha de compra._ |  =DepreciacionActivo\( "VEH003"**;** 1**;** Fecha\(2015;06;1\)**;** "T"\)  |  $ \(6.750.000\)

---

=FaltaPorDepreciarActivo \( \)

Descripción

Esta función calcula el tiempo en meses que a un activo le falta por
depreciar. Tenga en cuenta que la depreciación de un activo es generada cada
mes, al ejecutar la operación de acciones automáticas de fin de mes.

Para conocer el valor depreciado de un activo, vea la función
**DepreciacionActivo**

Otras aplicaciones

Con esta función también podrá:

  * Determinar cuántos meses le faltan por depreciar a un activo según la empresa donde se encuentra.

Sintáxis

|  =FaltaPorDepreciarActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IActivo
\(Requerido\)  |  Alfanumérico  |  Código del activo que se desea conocer el tiempo que le falta por depreciar.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar lo que le falta por depreciar un activo.  |  Establece el código de la empresa de trabajo configurada en el momento.
**Fecha\***
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer la depreciación del activo.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
Blocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización.

**"T"** =Realiza cálculos con la Contabilización Local y muestra el resultado
en meses.

**"F"** =Realiza cálculos con la Contabilización NIIF y muestra el resultado en días.  |  Por defecto toma el valor **"T"** , realizando los cálculos con la contabilización Local y mostrando el resultado en meses.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó la consulta de activos el 1/07/2018 desde ContaPyme®, la cual arrojó los siguientes datos:

Cód activo  |  Nombre activo  |  Fecha de compra  |  Valor de compra  |  Valor Depreciado  |  Vida útil \(meses\)  |  Vida restante \(meses\)  |  Valor a hoy \(1/Jul/2018\)
---|---|---|---|---|---|---|---
COM001  |  Computador Dell 1580  |  12/Jun/2013  |  $4.000.000  |  $\(4.000.000\)  |  36  |  0  |  $0.0
IMP001  |  Impresora Dell  |  01/may/2015  |  $6.000.000  |  $\(5.700.000\)  |  40  |  2  |  $300.000
LOC002  |  Oficina 13 Av. Santander  |  1/Ene/2018  |  $240,000,000  |  $\(6.000.000\)  |  240  |  234  |  $234.000.000
VEH003  |  Furgoneta KII-537  |  28/Dic/2014  |  $81,000,000  |  $\(56,700,000\)  |  60  |  18  |  $24,300,000

|  =FaltaPorDepreciarActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántos meses le faltan por depreciar al activo COM001 tomando de referencia el 1/jul/2018?.  |  =FaltaPorDepreciarActivo \( "COM001" Fecha\(2018;07;1\) \)  |  0
Determinar ¿cuántos meses le faltan por depreciar al activo VEH003 tomando de referencia el 1/jul/2018?.  |  =FaltaPorDepreciarActivo \( "VEH003"**;** 1**;** Fecha\(2018;01;1\)**;** "T"\)  |  18
Determinar ¿cuántos meses le faltan por depreciar al activo VEH003 tomando de referencia el 1/May/2016?.  |  =FaltaPorDepreciarActivo \( "VEH003"**;** 1**;** Fecha\(2016;05;1\)**;** "T"\)  |  44

---

=ValorHoyActivo \( \)

Descripción

Esta función calcula el valor en libros que tiene a hoy un activo.

Otras aplicaciones

Con esta función también podrá:

  * Determinar cuál fue el valor de un activo a una fecha determinada.
  * Determinar cuál es el valor de un activo que se encuentra en una empresa determinada.

Sintáxis

|  =ValorHoyActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IActivo
\(Requerido\)  |  Alfanumérico  |  Código del activo al que se le desea conocer el valor en libros.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información del activo.  |  Establece el código de la empresa de trabajo configurada en el momento.
**Fecha\***
\(Opcional\)  |  Fecha  |  Indica la fecha en la que se desea consultar el valor en libros del activo indicado.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
Blocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * En la empresa 1, CMB Muebles, desde ContaPyme® se realizó la consulta de activos al 1/07/2018, la cual arrojó los siguientes datos:

Cód activo  |  Nombre activo  |  Fecha de compra  |  Valor de compra  |  Valor Depreciado  |  Vida útil \(meses\)  |  Vida restante \(meses\)  |  Valor a hoy \(1/Jul/2018\)
---|---|---|---|---|---|---|---
COM001  |  Computador Dell 1580  |  12/Jun/2013  |  $4.000.000  |  $\(4.000.000\)  |  36  |  0  |  $0.0
IMP001  |  Impresora Dell  |  01/may/2015  |  $6.000.000  |  $\(5.700.000\)  |  40  |  2  |  $300.000
LOC002  |  Oficina 13 Av. Santander  |  1/Ene/2018  |  $240,000,000  |  $\(6.000.000\)  |  240  |  234  |  $234.000.000
VEH003  |  Furgoneta KII-537  |  28/Dic/2014  |  $81,000,000  |  $\(56,700,000\)  |  60  |  18  |  $24,300,000

|  =ValorHoyActivo  |  \(** IActivo; IEmp\*; Fecha\*; BLocal\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es el valor a hoy del activo COM001?.  |  =ValorHoyActivo\( "COM001"**;** Fecha\(2018;07;1\) \)  |  $0.0
Determinar ¿cuál es el valor a hoy del activo VEH003?.  |  =ValorHoyActivo\( "VEH003"**;** 1**;** Fecha\(2018;1;1\)**;** "T"\)  |  $ 24.300.000
Determinar cuál fue el valor del activo VEH003 al inicio del año 2018 _\(Meses transcurridos 36\)._ |  =ValorHoyActivo\( "VEH003"**;** 1**;** Fecha\(2018;1;1\)**;** "T"\)  |  $ 48.600.000

---

Atributos

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
NACTIVO  |  Nombre activo  |  Indica el nombre del activo
ICODIGOALTERNO  |  Cód. alterno  |  Indica el código alterno del activo
BLOCAL  |  Contabilización local  |  Indica si el activo realiza cálculos en contabilización local.
BNIIF  |  Contabilización NIIF  |  Indica si el activo realiza cálculos en contabilización NIIF.
ITDACTIVO  |  Cód Tipo de activo  |  Indica el código del tipo del activo al que pertenece.
ITDACTIVOLOCAL  |  Cód Tipo de activo local  |  Indica el código del tipo del activo en contabilización local al que pertenece.
ITDACTIVONIIF  |  Cód Tipo de activo NIIF  |  Indica el código del tipo del activo en contabilización NIIF al que pertenece.
IGRUPOACT  |  Cód. grupo activo  |  Indica cód. del grupo al que pertenece el activo.
$IGRUPOACT  |  Nombre grupo activo  |  Indica el nombre del grupo al que pertenece el activo \(igual para Local y NIIF\).
IGRUPOACTLOCAL  |  Grupo activo local  |  Indica el grupo al que pertenece el activo en contabilización local.
IGRUPOACTNIIF  |  Grupo activo  |  Indica el grupo al que pertenece el activo en contabilización NIIF.
IRESPONSABLE  |  Cód. responsable  |  Indica cód. del responsable del activo.
$IRESPONSABLE  |  Nombre responsable  |  Indica el nombre del responsable del activo.
QPOTENCIA  |  Potencia  |  Indica la potencia o capacidad del activo.
TDESCRIP  |  Descripción  |  Indica la descripción dada por el usuario al activo.
NLOCALIZ  |  Localización  |  Indica la localización configurada para el activo
SCLASIFICADORES  |  Clasificador  |  Indica la clasificación dada por el usuario al activo.
NPROVEEDOR  |  Nombre proveedor  |  Indica el nombre del proveedor al cual se le realizó la compra del activo.
IPROVEEDOR  |  Código proveedor  |  Indica el código del proveedor al cual se le realizó la compra del activo.
FCOMPRA  |  Fecha compra  |  Indica la fecha de compra del activo.
FINIDEPRECHISTORICANIIF  |  Inicio depreciación  |  Indica la fecha en que se empezó a depreciar el activo en contabilización NIFF.
ICC  |  Código CC  |  Indica el cód. del centro de costos al cual fue dirigido el activo.
$ICC  |  Nombre CC  |  Indica el nombre del centro de costos al cual fue dirigido el activo.
MVALORCOMP  |  Valor compra  |  Indica el valor de la compra del activo.
MVALORCOMPLOCAL  |  Valor compra local  |  Indica el valor de la compra del activo en contabilización local.
MVALORCOMPNIIF  |  Valor compra NIIF  |  Indica el valor de la compra del activo en contabilización NIIF.
MCSTAJUSTES  |  Ajustes por inflación compra  |  Indica el valor de los ajustes por inflación compra del activo.
MCSTAJUSTESLOCAL  |  Ajustes por inflación compra local  |  Indica el valor de los ajustes por inflación compra del activo en contabilización local.
MCSTAJUSTESNIIF  |  Ajustes por inflación compra NIIF  |  Indica el valor de los ajustes por inflación compra del activo en contabilización NIIF.
MDEPACUM  |  Depreciación acumulada  |  Indica la depreciación acumulada del activo.
MDEPACUMLOCAL  |  Depreciación acumulada local  |  Indica la depreciación acumulada del activo en contabilización local.
MDEPACUMNIIF  |  Depreciación acumulada NIIF  |  Indica la depreciación acumulada del activo en contabilización NIIF.
MAJDEP  |  Ajustes por inflación depreciación  |  Indica el valor de los ajustes por inflación depreciación del activo.
MAJDEPLOCAL  |  Ajustes por inflación depreciación local  |  Indica el valor de los ajustes por inflación depreciación del activo en contabilización local.
MAJDEPNIIF  |  Ajustes por inflación depreciación NIIF  |  Indica el valor de los ajustes por inflación depreciación del activo en contabilización NIIF.
MVALORHOY  |  Valor hoy  |  Indica el valor a hoy del activo.
MVALORHOYLOCAL  |  Valor hoy local  |  Indica el valor a hoy del activo en contabilización local.
MVALORHOYNIIF  |  Valor hoy NIIF  |  Indica el valor a hoy del activo en contabilización NIIF.
ITDDEPREC  |  Tipo depreciación  |  Indica el código del tipo de depreciación del activo.
ITDDEPRECLOCAL  |  Tipo depreciación Local  |  Indica el código del tipo de depreciación del activo en contabilización local.
ITDDEPRECNIIF  |  Tipo depreciación NIIF  |  Indica el código del tipo de depreciación del activo en contabilización NIIF.
ICUENTAACTIVO  |  Cód. cuenta activo  |  Indica el cód. de la cuenta del PUC que es afectada al realizar operaciones con el activo.
$ICUENTAACTIVO  |  Nombre cuenta activo  |  Indica de la cuenta la cuenta del PUC que es afectada al realizar operaciones con el activo \(igual para local y NIIF\).
ICUENTAACTIVOLOCAL  |  Cuenta activo local  |  Indica la cuenta del PUC que es afectada al realizar operaciones en contabilización local con el activo.
ICUENTAACTIVONIIF  |  Cuenta activo NIIF  |  Indica la cuenta del PUC que es afectada al realizar operaciones en contabilización NIFF con el activo.
ICUENTADIFERIDO  |  Cuenta diferido  |  Indica la cuenta del PUC que es afectada al realizar operaciones con el diferido.
ICUENTADIFERIDOLOCAL  |  Cuenta diferido local  |  Indica la cuenta del PUC que es afectada al realizar operaciones en contabilización local con el diferido.
ICUENTADIFERIDONIIF  |  Cuenta diferido NIIF  |  Indica la cuenta del PUC que es afectada al realizar operaciones en contabilización NIFF con el diferido.
QVIDAUTIL  |  Vida útil  |  Indíca la vida util del activo en días con la contabilización local.
QVIDAUTILLOCAL  |  Vida útil local  |  Indíca la vida útil del activo en meses.
QVIDAUTILNIIF  |  Vida útil NIIF  |  Indica la vida útil del activo en días.
QVIDAUTILRESTANTE  |  Vida útil restante  |  indica la vida útil que le resta al activo, tenga en cuenta que segun la contabilización el resultado será en meses o días.
QVIDAUTILRESTANTELOCAL  |  Vida útil restante local  |  indica la vida útil que le resta al activo en meses.
QVIDAUTILRESTANTENIIF  |  Vida útil restante NIIF  |  Indica la vida útil que le resta al activo en días.
QUSODEPRECIADO  |  Cantida uso  |  Indica las cantidad de veces que se ha utilizado un activo y a la ves se ha depreciado por el uso.
QUSOMES  |  Cantida uso mes  |  Indica las cantidad de veces que se ha utilizado un activo en un mes determinado.
ITDRECONOCINICIAL  |  Cód método de reconocimiento  |  Indica el método de reconocimiento inicial del activo.
MVALORSALV  |  Valor residual  |  Indica el valor residual o de salvamento del activo.
MVALORSALVLOCAL  |  Valor residual local  |  Indica el valor residual o de salvamento del activo en contabilización local.
MVALORSALVNIIF  |  Valor residual NIIF  |  Indica el valor residual o de salvamento del activo en contabilización NIIF.
FFINALIZACIONDEPRECIACION  |  Fin depreciación  |  Indica el momento en que se finalizó la depreciación del activo en contabilización local.
FFINALIZACIONDEPRECIACIONNIIF  |  Fin depreciación  |  Indica el momento en que se finalizó la depreciación del activo en contabilización NIIF.
FINICIODEPRECIACIONLOCAL  |  Inicio depreciación Local  |  Indica el momento en que se empezó a depreciar el activo en contabilización local.
FINICIODEPRECIACIONNIIF  |  Inicio depreciación NIIF  |  Indica el momento en que se empezó a depreciar el activo en contabilización NIIF.
BBAJA  |  Dado de baja  |  Indica si el activo fue dado de baja.

---

\*\[ATRIBUTOS:AtributosCC=15\]\*

---

\*\[ATRIBUTOS:AtributosCC=1\]\*

---

\*\[ATRIBUTOS:AtributosCC=3\]\*

---

\*\[ATRIBUTOS:AtributosCC=2\]\*

---

\*\[ATRIBUTOS:AtributosCC=13\]\*

---

\*\[ATRIBUTOS:AtributosCC=14\]\*

---

\*\[ATRIBUTOS:AtributosCC=12\]\*

---

\*\[ATRIBUTOS:AtributosCC=7\]\*

---

\*\[ATRIBUTOS:AtributosCC=6\]\*

---

\*\[ATRIBUTOS:AtributosCC=5\]\*

---

\*\[ATRIBUTOS:AtributosCC=4\]\*

---

\*\[ATRIBUTOS:AtributosCC=16\]\*

---

\*\[ATRIBUTOS:AtributosCC=18\]\*

---

\*\[ATRIBUTOS:AtributosCC=17\]\*

---

Atributos

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
IEMP  |  Código empresa  |  Indica el código de la empresa. al cual pertenece el centro de costos.
NNODE  |  Nombre del CC  |  Indica el nombre del centro de costos.
ISEDE  |  Código sede  |  Indica el código de la sede al que pertenece el centro de costos.
NNODETREE  |  Nombre nodo del CC  |  Indica el nombre con el nodo del centro de costos.
FINI  |  Fecha inicial del CC  |  Indica fecha de inicio de vigencia del centro de costos.
FFIN  |  Fecha final del CC  |  Indica la fecha de finalización de vigencia del centro de costos
ICC  |  Código CC  |  Indica el código del CC padre al que pertenece el centro de costos.
ICCPADRE  |  Código CC padre  |  Indica el código del CC padre al que pertenece el centro de costos.
NCORTO  |  Nombre corto del CC  |  Indica el nombre corto del centro de costos.
IACTIVIDAD  |  Código de la actividad  |  Indica la actividad a la que se dedica el centro de costos indicado.
$IACTIVIDAD  |  Nombre de la actividad  |  Indica la actividad a la que se dedica el centro de costos indicado.
INITRESP  |  Responsable CC  |  Indica el código del tercero el cual es responsable del centro de costos.
$INITRESP  |  Responsable CC  |  Indica el nombre del tercero el cual es responsable del centro de costos.
QUNIDADES  |  Cantidad de población  |  Indica la cantidad de población en las unidades configuradas por el usuario.
NUNIDAD  |  Unidades de la población  |  Indica las unidades en que se encuentra medida la población.
ITDCC  |  Clase de centro de costos  |  Indica la clase del centro de costos indicado.

1 Gastos
2 Ventas
3 Producción
4 No operacional


QAREAUN  |  Cantidad área  |  Indica la cantidad de área en las unidades configuradas por el usuario del Centro de costos indicado.
IUN  |  Código unidad  |  Indica el código de la unidad del área que se encuentra configurado un centro de costos indicado.

1 Hectárias
2 Cuandras
3 Acres
4 Yardas cuadradas
5 Caballerizas
6 Manzanas
7 Metros cuadrados
8 Plaza
9 Fanega


QAREA  |  Cantidad área m2  |  Indica la cantidad de área en las metros cuadrados del Centro de costos indicado.
SCLASIFICADORES  |  Clasificador CC  |  Indica el clasificador del centro de costos, el cual es configurado por el usuario desde la configuración de cada centro de costos.
SGRUPO  |  Grupo CC  |  Indica el grupo del centro de costos, el cual es configurado por el usuario desde la configuración de cada centro de costos.
BACTIVARGASTOS  |  CC de gastos  |  Indica si el centro de costos solicita la cuenta de producto en proceso para imputación de los costos y gastos del centro de costos.
SVALORADIC1  |  Valor adicional 1  |  Indica el valor adicional 1, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC2  |  Valor adicional 2  |  Indica el valor adicional 2, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC3  |  Valor adicional 3  |  Indica el valor adicional 3, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC4  |  Valor adicional 4  |  Indica el valor adicional 4, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC5  |  Valor adicional 5  |  Indica el valor adicional 5, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC6  |  Valor adicional 6  |  Indica el valor adicional 6, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC7  |  Valor adicional 7  |  Indica el valor adicional 7, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC8  |  Valor adicional 8  |  Indica el valor adicional 8, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC9  |  Valor adicional 9  |  Indica el valor adicional 9, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC10  |  Valor adicional 10  |  Indica el valor adicional 10, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC11  |  Valor adicional 11  |  Indica el valor adicional 11, el cual fue configurado por el usuario al centro de costos indicado.
SVALORADIC12  |  Valor adicional 12  |  Indica el valor adicional 12, el cual fue configurado por el usuario al centro de costos indicado.
FECHA1ADIC  |  Fecha 1 adicional  |  Indica una fecha 1 adicional, la cual fue configurada por el usuario al centro de costos indicado.
FECHA2ADIC  |  Fecha 2 adicional  |  Indica una fecha 2 adicional, la cual fue configurada por el usuario al centro de costos indicado.
FECHA3ADIC  |  Fecha 3 adicional  |  Indica una fecha 3 adicional, la cual fue configurada por el usuario al centro de costos indicado.
ICUENTADESARROLLO  |  Cuenta desarrollo  |  Indica el código de la cuenta donde se imputan los gastos o costos del producto en proceso
ICUENTAPRODPROC  |  Cuenta producto en proceso  |  Indica el código de la cuenta donde se imputan los gastos o costos del producto en proceso
ICUENTAPRODPROCDEF  |  Cuenta producto en proceso defecto  |  Indica el código de la cuenta que está por defecto donde se imputan los costos del producto en proceso direccionados al centro de costos dado.
ICUENTAPERDBAJADEF  |  Cuenta pérdidas defecto  |  Indica el código de la cuenta que está por defecto donde se imputan las pérdidas direccionados al centro de costos dado.
QVIDAREST  |  Vida restante  |  Indica la vida restante del centro de costos.
IETAPA  |  Etapa de CC  |  Indica la etapa en que se encuentra el centro de costos
IESTADO  |  Estado de CC  |  Atributo para uso futuro
ICUENTAPRODPROC\_V  |  Cuenta producto en proceso  |  Indica el código de la cuenta donde se imputan los gastos o costos del producto en proceso
IETAPASUBCC  |  Etapa de un sub-CC  |  Indica la etapa en que se encuentra el sub-centro de costos.
BDISTRIBAUTO  |  Distribución automática  |  Indica si el centro de costos tiene activada la opción de distribución automática durante el proceso de cierre de mes.
BENE  |  Distribución automática en enero  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de enero.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BFEB  |  Distribución automática en febrero  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de febrero.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BMAR  |  Distribución automática en marzo  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de marzo.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BABR  |  Distribución automática en abril  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de abril.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BMAY  |  Distribución automática en mayo  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de mayo.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BJUN  |  Distribución automática en junio  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de junio.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BJUL  |  Distribución automática en julio  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de julio.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BAGO  |  Distribución automática en agosto  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de agosto.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BSEP  |  Distribución automática en septiembre  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de septiembre.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BOCT  |  Distribución automática en octubre  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de octubre.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BNOV  |  Distribución automática en noviembre  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de noviembre.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
BDIC  |  Distribución automática en diciembre  |  Indica si el centro de costos tiene activada la opción de distribución automática en el mes de diciembre.

Al estar marcada la opción, la distribución se procesará en el cierre de este
mes.
TTELEFONO  |  Teléfono  |  Indica el número de télefono de la empresa. o sede.
TFAX  |  Teléfono  |  Indica el número de fax de la empresa. o sede.
TCELULAR  |  Celular  |  Indica el número de celular de la empresa. o sede.
SDIRECCION  |  Dirección  |  Indica la dirección donde se encuentra la empresa o sede.
CODCIUDAD  |  Código ciudad  |  Indica el código de la ciudad donde se encuentra la empresa o sede.
IMUN  |  Código Municipio  |  Indica el código del municipio donde se encuentra la empresa o sede.
SCIUDAD  |  Ciudad  |  Indica la ciudad donde se encuentra la empresa o sede.
CODDEPARTAMENTO  |  Código departamento  |  Indica el departamento donde se encuentra la empresa o sede.
IDEP  |  Código departamento  |  Indica el departamento donde se encuentra la empresa o sede.
SDEP  |  Departamento  |  Indica el departamento donde se encuentra la empresa o sede.
CODPAIS  |  Código país  |  Indica el código del país donde se encuentra la empresa o sede.
IPAIS  |  Código país  |  Indica el código del país donde se encuentra la empresa o sede.
SPAIS  |  Páis  |  Indica el país donde se encuentra la empresa o sede.
SCODIGOPOSTAL  |  Código postal  |  Indica el código postal donde se encuentra la empresa o sede.
SWWW  |  Página Web  |  Indica la dirección web de la página de la empresa. o sede.
SEMAIL  |  Email  |  Indica el email de la empresa. o sede.
SMSN  |  Msn  |  Indica el msn de la empresa. o sede.
SSKYPE  |  SKype  |  Indica el skype de la empresa. o sede.
BACTIVIDADES  |  Actividad  |  Indica si la sede o empresa usa el módulo de actividades empresariales.
BAREA  |  Área  |  Indica si la sede o empresa requiere el registros de área en cada uno de los centros de costos creados.
BPOBLACION  |  POBLACIÓN  |  Indica si la sede o empresa requiere el registros de población en cada uno de los centros de costos creados.
QNUMCICLO  |  Número de ciclos de CC  |  Indica los ciclos de vida que tiene el centro de costos
FINIABS  |  Fecha inicial absoluta del CC  |  Indica la fecha de inicio de vigencia de la primer etapa del centro de costos
FFINABS  |  Fecha final absoluta del CC  |  Indica la fecha de finalización de vigencia de la última etapa del centro de costos  |  ICUENTADESARROLLO\_V  |  Código cuenta desarrollo  |  Indica la cuanto a la cuál se imputaran los ingresos por desarrollo al centro de costos.
NEMP  |  Nombre empresa  |  Indica el nombre de la empresa.
NRESP  |  Responsable  |  Indica el responsable de la empresa.
STELEFONO  |  Teléfono  |  Indica el teléfono de la empresa.
IDPTO  |  Código departamento  |  Indica el departamento de la empresa.
INITEMP  |  Nit Empresa  |  Indica el número de documento de la empresa.
IDIGCHEQUEO  |  Dígito de verificación  |  Indica el dígito de verificación del nit de la empresa.
ITDDOCUM  |  Código tipo de documento  |  Indica el código del documento usado por la empresa, este tipo de documento es configurado desde el catálogo de "tipos de documento"
ICLASEDECLARA  |  Clase de declaración  |  Indica la clase de declaración descrita para la empresa.
NREPRESENTANTE  |  Representante legal  |  Indica el nombre del representante legal de la empresa.
IREPRESENTANTE  |  Documento representante legal  |  Indica el número documento del representante legal de la empresa.
NCONTADOR  |  Contador  |  Indica el nombre del contador de la empresa.
ICONTADOR  |  Documento contador  |  Indica el número de documento del contador de la empresa.
NREVISORFISCAL  |  Revisor fiscal  |  Indica el nombre del revisor fiscal de la empresa.
IREVISORFISCAL  |  Documento revisor fiscal  |  Indica el número de documento del revisor fiscal de la empresa.
IADMONIMP  |  Código administración de impuesto  |  Indica el código de la administración de impuesto descrito por el usuario.
IACTDIAN  |  Actividad económica  |  Indica el código de la actividad económica descrita por el usuario.
SCLASIFLEGAL  |  Clasificación legal  |  Indica las clasificaciones legales de la empresa.
QDIASPLAZOCXC  |  Plazo CxC  |  Indica los días configurados para el pago de las cuentas por cobrar establecidas para la empresa.
QDIASPLAZOCXP  |  Plazo CxP  |  Indica los días configurados para el pago de las cuentas por pagar establecidas para la empresa.
ITDSHOWROTULO  |  Tipo de rótulo  |  Indica el tipo de rótulo para los informes usado en la empresa

0 - Muestra el rótulo 1 - Muestra el logotipo 2 - No muestra ninguno


ROTULORPT  |  Rótulo  |  Indica todos los campos descritos en la pestaña de rótulo de la empresa
SROTULORPT1  |  Título  |  Indíca el título que aparecerá en los reportes en ContaPyme®.
QFONTSIZEROTULO1  |  Tamaño título  |  Indica el tamaño del título que aparecerá en los reportes en ContaPyme®.
ICOLORROTULO1 |  Código Color título  |  Indica el código del color del título que aparecerá en los reportes en ContaPyme®.
SROTULORPT2  |  Subtítulo  |  Indíca el súb-título el cual aparecerá en los reportes en ContaPyme®.
QFONTSIZEROTULO2  |  Tamaño sub-título  |  Indíca el tamaño del sub-título que aparecerá en los reportes en ContaPyme®.
ICOLORROTULO2  |  Código color sub-título  |  Indica el código del color del sub-título que aparecerá en los reportes en ContaPyme®.
SROTULORPT3  |  Detalle  |  Indica el detalle que aparecerá en los reportes en ContaPyme®.
QFONTSIZEROTULO3  |  Tamaño detalle  |  Indica el tamaño del detalle que aparecerá en los reportes en ContaPyme®.
ICOLORROTULO3  |  Código color detalle  |  Indica el color del detalle que aparecerá en los reportes en ContaPyme®.
SINFOPIEPAGINA  |  Pie página  |  Indica el pie de página que aparecerá en los reportes en ContaPyme®.
IACTIVIDADPROD  |  Actividad  |  Indica la actividad de producción a la cual se dedica el centro de costos.
ITDDISTRIBUCION  |  Tipo de distribución  |  Indica el tipo de distribución del centro de costos.

1 - Por área de los cc
2 - Por población cc
3 - Por partes iguales
4 - Por producción
5 - Por movimiento cuenta
6 - Por uso de Maq. y equipo
7 - Por embodegamiento
8 - Por tasa de asignación CIF
9 - Por venta


ATTRDISTRIBUCION  |  Atributos de la distribución  |  Indica los atributos más importantes del tipo de distribución escogido.
ICUENTA  |  Código cuenta  |  Indica la cuenta configurada para el tipo de distribución por movimiento cuenta.
IACTIVO  |  Código activo  |  Indica la cuenta configurada para el tipo de distribución por uso de maquinaria y equipo.
IRECURSO  |  Producto  |  Indica el producto o servicio configurado para el tipo de distribución por venta.

---

Atributos para cuenta

  * Tenga presente que si desea obtener el nombre de un atributo, solo debe anteponer el símbolo **"$"**. Esta opción solo es para los atributos marcados con tiene nombre.
Ej. **"ITDCuenta"**. La fórmula mostrará el nombre del tipo de cuenta a la
cual está asociada la cuenta filtrada en la función.

Cód. Atributo  |  Atributo  |  Descripción  |  Tiene nombre
---|---|---|---
Atributos generales
IPADRE  |  Cuenta padre  |  Indica el código de la cuenta padre.  |
ITDCUENTA  |  Tipo de la cuenta  |  Indica el tipo de la cuenta.

1\. Activo
2\. Pasivo
3\. Patrimonio
4\. Ingresos
5\. Egresos
6\. De orden deudora
7\. De Orden acreedora

|  Sí
$ITDCUENTA  |  Nombre Tipo de la cuenta  |  Indica el nombre del tipo de la cuenta.  |
ICUENTAALTERNA  |  Cuenta alterna.  |  Indica la identificación alterna de la cuenta.  |
BAFECTABLEUSR  |  Afectable directamente por el usuario.  |  Indica si una cuenta podrá ser afectada por el usuario en los movimientos de cuentas.  |
BEXIGEICC  |  Exige centro de costos  |  Indica si la cuenta requiere centro de costos. Normalmente las cuentas que exigen centro de costos son las de ingresos y egresos que afectan presupuesto.  |
BSEDEXDEFECTO  |  Asignar sede como centro de costos por defecto  |  Indica si la cuenta tiene asignada la sede en la que esté trabajando como centro de costos por defecto.  |
BEXIGEBASE  |  Exige valor base  |  Indica que cuando se use la cuenta por medio del movimiento contable, esta exigirá que se especifique el valor base de la transacción.  |
BEXIGEACTIVO  |  Exige activo/diferido  |  Indica que cuando se afecte la cuenta por medio de movimiento contable el sistema exigirá el identificador del activo y/o diferido.  |
BPPTO  |  Es de presupuesto  |  Indica si la cuenta es de presupuesto. Los movimientos con esta cuenta aparecerán el explorador de presupuestos y serán visualizadas en el informe presupuestal.  |
BAJUSTAXINF  |  Ajustar por inflación  |  Indica si una cuenta se debe ajustar por inflación de forma automática en los cierres de mes.  |
BMANEJAOTRAMONEDA  |  Manejo de moneda extranjera  |  Indica que cuando se afecte una operación con esta cuenta, el sistema solicitará el valor en la otra unidad de moneda.  |
IMONEDA  |  Tipo de moneda  |  Indica el código del tipo de moneda de una cuenta que maneja moneda extranjera.

10\. Pesos
20\. Dolar
30\. Euro

El catálogo de monedas es configurable por el usuario desde el PUC de ContaPyme®.  |  Sí
BVISIBLE  |  Visible en selección  |  Determina si la cuenta será visible en el asistente de selección de cuentas de ContaPyme®.  |
BDISPONIBLEGI  |  Disponible gastos/ingresos  |  Indica que la cuenta será considerada como concepto de gastos o de ingresos y será visible en las operaciones de "Egresos y gastos", "Ingresos y recaudos" y "Venta de productos".  |
BAUTOACTIVAR  |  Autoactivación  |  Sólo es aplicable para empresas con centros de costos destinados a la producción e indica que se trasladarán todos los valores de costos de producción al cerrar el mes, a la cuenta de producto en proceso correspondiente.  |
BEXIGETERCERO  |  Manejo de terceros  |  Indica el tipo de tercero en transacción.

0\. No maneja tercero
1\. Maneja tercero
2\. Maneja y exige tercero

|
BMANEJATERCERO  |  Discrimina por tercero  |  Indica si la cuenta está discriminando por tercero. En los reportes de "Inventario y balances" y de "Movimiento de cuentas auxiliares", mostrarán el saldo de la cuenta discriminándolo en forma detallada por cada tercero de transacción  |
BMANEJACUOTAS  |  Maneja referencias  |  Indica si el módulo de cartera deberá manejar el endeudamiento basado en sub-documentos de soporte o no. Así mismo, habilita o no la cuenta para el manejo de créditos en varias cuotas.  |
BCONTROLACXX  |  Controla endeudamiento  |  Indica que la cuenta manejará cartera.  |
ICLASE  |  Cód. clase de la cuenta  |  Indica la clase de la cuenta.

1\. Cuenta normal
2\. Cuenta de efectivo
3\. Cuenta de impuestos
4\. Cuenta de ajuste por inflación
5\. Cuenta de nómina contable

|
$ICLASE  |  Nombre Clase de la cuenta  |  Indica el nombre la clase de la cuenta.  |
ISUBCLASE  |  Cód. sub-Clase  |  Indica el código del tipo de impuesto de una cuenta.  |
$ISUBCLASE  |  Nombre sub-Clase  |  Indica el nombre del tipo de impuesto de una cuenta.  |
IDESC\_CARGO1  |  Cód. impuesto, descuentos y cargos
IVA  |  La cuenta debe ser de clase normal, e indica el código del concepto de iva definido por el usuario, el cual se imputa a la cuenta.  |  Sí
$IDESC\_CARGO1  |  Nombre impuesto, descuentos y cargos
IVA  |  Nombre del concepto \(igual para los demás conceptos\).  |
IDESC\_CARGO2  |  Impuesto, descuentos y cargos
RETENCIÓN  |  La cuenta debe ser de clase normal, e indica el código del concepto de retención definido por el usuario, el cual se imputa a la cuenta.  |  Sí
IDESC\_CARGO3  |  Impuesto, descuentos y cargos
RETE-ICA  |  La cuenta debe ser de clase normal, e indica el código del concepto de rete-ica definido por el usuario, el cual se imputa a la cuenta. |  Sí
IDESC\_CARGO4  |  Impuesto, descuentos y cargos
OTRO  |  La cuenta debe ser de clase normal, e indica otro concepto definido por el usuario, el cual se imputa a la cuenta. |  Sí
IDESC\_CARGO5  |  Impuesto, descuentos y cargos
IMPUESTO CREE  |  La cuenta debe ser de clase normal, e indica el código del concepto de impuesto del cree definido por el usuario, el cual se imputa a la cuenta.  |  Sí
IDESC\_CARGO6  |  Impuesto, descuentos y cargos
OTRO2  |  La cuenta debe ser de clase normal, e indica otro concepto definido por el usuario, el cual se imputa a la cuenta.  |  Sí
Otros Atributos
NCUENTA  |  Nombre cuenta  |  Indica el nombre de la cuenta en contabilización local  |
BLOCAL  |  Cuenta BLOCAL  |  Indica si cuenta hace parte de la contabilización local  |
BNIIF  |  Cuenta NIIF  |  Indica si cuenta hace parte de la contabilización NIIF  |
ICUENTANIIF  |  Cuenta NIIF equivalente  |  Indica, que la cuenta en contabilización Local tiene una equivalente en la contabilización NIIF, por lo tanto si la cuenta local es afectada, también se afectará la cuenta equivalente en NIIF.  |
SOBSERV  |  Observaciones  |  Indica las observaciones creadas por el usuario en la cuenta, desde el plan de cuentas de ContaPyme®.  |

---

\*\[ATRIBUTOS:AtributosCC=8\]\*

---

\*\[ATRIBUTOS:AtributosCC=10\]\*

---

Atributos para las bodegas

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
NINVENTARIO  |  Descripción de la bodega  |  Indica la descripción de la bodega.
NRESP  |  Responsable  |  Indica el responsable configurado para la bodega indicada.
NLOCALIZ  |  Localización  |  Indica la localización configurada para la bodega indicada.
QPRECISION  |  Precisión decimales  |  Indica la precisión de decimales en el manejo de invetario configurado para la bodega indicada.
BINVENTARIOESTIMADO  |  Uso inventario estimado  |  Indica si la bodega egresa los productos secuencialmente de cada casilla hasta agotarla o todas las casillas en forma proporcional a sus existencias.

T =Proporcional
F =Secuencial


ICCDEFAULT  |  CC por defecto  |  Indica el centro de costos por defecto para embodegamientos y traslados de la bodega.
BLABORPROD  |  Labor de producción  |  Indica si la labor es de producción
ICUENTA  |  Cuenta de inventarios  |  Indica la cuenta del activo a debitar cuando se realicen compras o embodegamientos a la bodega indicada.
$ICUENTA  |  Nombre cuenta de inventarios  |  Indica el nombre de la cuenta \(igual para las demás cuentas\).
ICUENTAING  |  Cuenta de ingresos por ajustes  |  Indica la cuenta donde se acreditarán los ingresos en caso de que se realicen ajustes de inventarios a favor de la empresa.
ICUENTAPERD  |  Cuenta de pérdida por ajustes  |  Indica la cuenta donde se debitarán las pérdidas en caso de que se realicen ajustes de inventarios en contra de la empresa.
ICUENTADEVCOMPRA  |  Cuenta de devolución en compras  |  Indica la cuenta donde se imputarán las utilidades o pérdidas al momento de efectuar una devolución de productos comprados.
ICUENTADEVVENTA  |  Cuenta de devolución en ventas  |  Indica la cuenta donde se debitarán los ingresos cuando un cliente devuelva productos que anteriormente se les ha vendido.

---

Atributos para los elementos del inventario

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
NELEMENTO  |  Nombre elemento  |  Indica el nombre del elemento.
NUNIDAD  |  Unidad de venta  |  Indica la unidad de venta del elemento.
IGRUPOINV  |  Grupo elemento  |  Indica el grupo del elemento.
BESALIAS  |  Elemento alias  |  Indica si el elemento es un alias de otro elemento.
IRECURSOBASE  |  Código elemento base  |  Indica el código del elemento base, tenga en cuenta que el elemento debe ser alias de otro elemento.
BCONTROLINV  |  Controla inventario  |  Indica si el elemento controla cantidad en inventario.
BCONSUMO  |  Elemento de Consumo  |  Indica si el elemento es utilizado para consumo interno de la empresa.
BVENTA  |  Mercancía para la venta  |  Indica si el elemento es mercancía para la venta.
BPRODUCTO  |  Producción interna  |  Indica si el elemento es de producción interna
BSERVICIO  |  Servicio  |  Indica si el elemento es un servicio.
BCODBARRAS  |  Código de barras  |  Indica si el elemento imprime en el listado de código de barra.
BVISIBLE  |  Visible en selección  |  Indica si el elemento es visible en selección
BVISIBLEINTERNET  |  Visible en internet  |  Indica si el elemento es visible en internet, esto quiere decir que es visible con los demás programas que se conectan a la misma área de trabajo desde otros lugares.
BDESCFINANCIERO  |  Aplica descuento  |  Indica si el elemento aplica con descuento condicionado.
BESCOMISIONABLE  |  Genera comisión  |  Indica si el elemento genera comisión para vendedores.
BCONTEOUNDFISICA  |  Conteo unidades físicas  |  Indica si el elemento está incluido en el conteo de unidades físicas.
DESCRIPCION  |  Descripción elemento  |  Indica la descripción del elemento.
NUNIDADCOMPRA  |  Unidad compra  |  Indica el nombre de la unidad en que se realiza la compra del elemento.
QFACTOR  |  Factor conversión compra  |  Indica a cuántas unidades de uso o venta equivale la unidad de compra del elemento.
BUNIDADVENTA  |  Usar unidad venta  |  Indica si está activa la unidad de presentación o empaque.
NUNIDADVENTA  |  Unidad venta  |  Indica el nombre de la unidad en que se realiza la venta del elemento.
BFACTORUNIDADVENTA  |  Factor de conversión venta  |  Indica si esta activado el factor de unidad de venta del elemento.
QFACTORUNIDADVENTA  |  Factor conversión venta  |  Indica el factor de conversión de la unidad de uso a la unidad de venta.
BALQUILER  |  Elemento alquiler  |  Indica si el elemento es para alquilar.
ITDTIEMPO  |  Tiempo alquilado  |  Indica el tiempo que fue alquilado el elemento.
NUNIDADQPESO  |  Unidad peso  |  Indica el nombre de la unidad de peso en que se encuentra el elemento.
QPESO  |  Peso  |  Indica el peso del elemento.
NUNIDADQVOLUMEN  |  Unidad volumen  |  Indica el nombre de la unidad de volumen en que se encuentra el elemento.
QVOLUMEN  |  Volumen  |  Indica el volumen del elemento.
SREFFABRICANTE  |  Referencia fabricante  |  Indica la referencia del elemento dada por el fabricante.
SMARCA  |  Marca Elemento  |  Indica la marca del elemento.
IDEPINV  |  Departamento/Línea  |  Indica el departamento o línea a la que pertenece el elemento.
CLASE1  |  Clase1 elemento  |  Indica la clase 1 del elemento, tenga en cuenta que este atributo es configurable por el usuario.
CLASE2  |  Clase2 elemento  |  Indica la clase 2 del elemento, tenga en cuenta que este atributo es configurable por el usuario.
TIPO1  |  Tipo1 elemento  |  Indica el tipo 1 del elemento, tenga en cuenta que este atributo es configurable por el usuario.
TIPO2  |  Tipo2 elemento  |  Indica el tipo 2 del elemento, tenga en cuenta que este atributo es configurable por el usuario.
DATO1  |  Dato1 elemento  |  Indica el dato 1 del elemento, tenga en cuenta que este atributo es configurable por el usuario.
DATO2  |  Dato2 elemento  |  Indica el dato 2 del elemento, tenga en cuenta que este atributo es configurable por el usuario.
DATO3  |  Dato3 elemento  |  Indica el dato 3 del elemento, tenga en cuenta que este atributo es configurable por el usuario.
BCOMPUESTO  |  Elemento compuesto  |  Indica si el elemento es compuesto.
BCUENTAINV  |  Personaliza cuenta inventario  |  Indica si en la configuración del elemento se está personalizando la cuenta del inventario
ICUENTAINV  |  Cuenta inventario  |  Indica la cuenta del activo a debitar cuando se realicen compras o embodegamientos del elemento indicado.
BCUENTADEVCOMPRA  |  Personaliza cuenta de devolución en compras  |  Indica si en la configuración del elemento se está personalizando la cuenta de devolución en compras
ICUENTADEVCOMPRA  |  Cuenta de devolución en compras  |  Indica la cuenta donde se imputarán las utilidades o pérdidas al momento de efectuar una devolución del elemento comprado.
BCUENTADEVVENTA  |  Personaliza cuenta de devolución en ventas  |  Indica si en la configuración del elemento se está personalizando la cuenta de devolución en ventas.
ICUENTADEVVENTA  |  Cuenta de devolución en ventas  |  Indica la cuenta donde se debitarán los ingresos cuando un cliente devuelva el elemento indicado.
BCUENTACOSTOS  |  Personaliza cuenta de costos  |  Indica si en la configuración del elemento se está personalizando la cuenta de costos.
ICUENTACOSTOS  |  Cuenta de costos  |  Indica la cuenta de costos de ventas para el elemento.
BCUENTAEGR  |  Personaliza cuenta egresos  |  Indica si en la configuración del elemento se está personalizando la cuenta de las salidas del elemento.
ICUENTAEGR  |  Cuenta egresos  |  Indica la cuenta que es afectada al realizar salidas del elemento.
BICUENTASPORCLASEEGR  |  Configurar la cuenta según clase contable del centro de costos  |  Indica si el elemento tiene activa la opción que permite personalizar las cuentas de egreso destino, según las diferentes clases contables de los centro de costos.

Esta opción se habilita en el sistema cuando se activa "Personalizar cuenta de
egresos".
BCUENTAVTA  |  Personaliza cuenta ingresos  |  Indica si en la configuración del elemento se está personalizando la cuenta de ingresos del elemento.
ICUENTAVTA  |  Cuenta ingresos  |  Indica la cuenta que es afectada al realizar ventas del elemento.
BICUENTASPORCLASEING  |  Cuenta venta según clase contable  |  Indica si el elemento personaliza la cuenta según clase contable del Centro de Costos.
BCONCEPTOCOMPRA  |  Impuestos en Compra  |  Indica si el elemento personaliza los impuestos en compras.
ICONCEPTOCOMPRA1  |  IVA  |  Indica el concepto de IVA que tiene configurado el elemento.
ICONCEPTOCOMPRA2  |  Retención  |  Indica el concepto de retención que tiene configurado el elemento.
ICONCEPTOCOMPRA3  |  Rete-ICA  |  Indica el concepto de Rete-ICA que tiene configurado el elemento.
ICONCEPTOCOMPRA4  |  Impuesto CREE  |  Indica el concepto de impuesto CREE que tiene configurado el elemento.
ICONCEPTOCOMPRA5  |  Otro  |  Indica otro concepto que tiene configurado el elemento.
ICONCEPTOCOMPRA6  |  Otro 2  |  Indica el concepto otro2 que tiene configurado el elemento.
BCONCEPTOVENTA  |  Impuestos ventas  |  Indica si el elemento personaliza los impuestos en ventas.
BCONCEPTOVENTA1  |  IVA  |  Indica el concepto de IVA que tiene configurado el elemento.
BCONCEPTOVENTA2  |  Retención  |  Indica el concepto de retención que tiene configurado el elemento.
BCONCEPTOVENTA3  |  Rete-ICA  |  Indica el concepto de Rete-ICA que tiene configurado el elemento.
BCONCEPTOVENTA4  |  Impuesto CREE  |  Indica el concepto de impuesto CREE que tiene configurado el elemento.

---

Atributos para precios de un elemento

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
IMETODO  |  Método de cálculo  |  Indica el código del metodo de cálculo, tenga en cuenta que el método de cálculo es módificado en el módulo de inventarios, desde el catálogo "Métodos de cálculo de listas de precios".
FASIGNACION  |  Fecha Asignación  |  Indica la fecha en que fue asignado el precio de un elemento del inventario de ContaPyme®.
FVIGENCIAHASTA  |  Fecha vigencia  |  Indica la fecha de vigencia de un elemento del inventario de ContaPyme®.

---

Atributos para las actividades

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
NACTIVIDAD  |  Nombre actividad  |  Indica el nombre de la actividad indicada.
ITDACTIVIDAD  |  Tipo de actividad  |  Indica el tipo de la actividad indicada.

1 Construcción
2 Empresarial
3 Industria y manufactura
4 Investigación y desarrollo
5 Enseñanza
6 Servicios
7 Agrícola
8 Pecuaria
9 Otro

Tenga en cuenta que el tipo de la actividad es configurable desde el catálogo
"Tipos de actividades empresariales"
NCORTO  |  Nombre corto actividad  |  Indica el nombre corto de la actividad indicada.
QDURACIONLABORESDEF  |  Duración labores  |  Indica la duración promedio de las labores de la actividad indicada.
NUNIDAD  |  Unidad población  |  Indica la unidad de la población en la que se encuentra configurada la actividad indicada.
SGRUPO  |  Grupo actividad  |  Indica el grupo al cual pertenece la actividad indicada.
STIPO  |  Tipo actividad  |  Indica el tipo al cual pertenece la actividad indicada.

---

Atributos para las labores

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
NLABOR  |  Nombre labor  |  Indica el nombre de la labor indicada.
NCORTO  |  Nombre corto labor  |  Indica el nombre corto de la labor indicada.
NUNIDAD  |  Unidad labor  |  Indica la unidad de la labor en que se encuentra configurada.
ITDCLCREND  |  Tipo de cálculo para el rendimiento  |  Indica el tipo de cálculo para el rendimiento de las labores.
SGRUPO  |  Grupo labor  |  Indica el grupo al cual pertenece la labor indicada.
STIPO  |  Tipo labor  |  Indica el tipo al cual pertenece la labor indicada.
Atributos labores de producción
BLABORPROD  |  Labor de producción  |  Indica si la labor es de producción
NPRODUCTO  |  Nombre producto  |  Indica el nombre del producto que se produce al realizar la labor, tenga en cuenta que estas labores deben ser de producción.
BAUTOEMBODEGA  |  Autoembodegable  |  Indica si la labor auto embodega el producto elaborado, tenga en cuenta que estas labores deben ser de producción.
ICUENTA  |  Código cuenta  |  Indica el código de la cuenta la cual es afectada al usar la labor en un registro de planilla de labores.

---

\*\[ATRIBUTOS:AtributosCC=11\]\*

---

\*\[ATRIBUTOS:AtributosCC=9\]\*

---

Atributos para terceros

Cód. Atributo  |  Atributo  |  Descripción
---|---|---
Atributos generales
DIGVERIFICACION  |  Dígito verificación  |  Indica el dígito de verificación del tercero, generalmente es el número encontrado al final del RUT.
NTERCERO  |  Nombre tercero  |  Indica los nombres y apellidos del tercero.
BEMPRESA  |  Es empresa  |  Indica si el tercero es una empresa.
BVISIBLE  |  Visible en selección  |  Indica si el tercero es visible en selección.
NTERCERONAPELLIDO  |  Nombre - Apellido  |  Indica el nombre y el apellido del tercero en el orden descrito.
NAPELLIDONTERCERO  |  Apellido - Nombre  |  Indica el apellido y el nombre del tercero en el orden descrito.
NCOMERCIAL  |  Nomvbre comercial  |  Indica el nombre comercial del tercero.
ITDDOCUM  |  Cód. tipo de documento  |  Indica el código del tipo de documento usado por el tercero.
$ITDDOCUM  |  Nombre tipo de documento  |  Nombre del tipo de documento usado por el tercero.
ITDDOCUM\_ABR  |  Tipo de documento  |  Indica el documento usado por el tercero.
NRAZONSOCIAL  |  Razón social  |  Cuando el tercero es una empresa, indica la razón social del tercero.-
NOMBRE  |  Nombre tercero  |  Indica solamente los nombres del tercero.
NTERCERO1  |  Nombre 1 tercero  |  Indica el primer nombre del tercero.
NTERCERO2  |  Nombre 2 tercero  |  Indica el segundo nombre del tercero.
NAPELLIDO  |  Apellido tercero  |  Indica solamente los apellidos del tercero.
NAPELLIDO1  |  Apellido 1 tercero  |  Indica el primer Apellido del tercero.
NAPELLIDO2  |  Apellido 2 tercero  |  Indica el segundo Apellido del tercero.
Atributos tipo de tercero
BPROVEEDOR  |  Es proveedor  |  Indica si el tercero es proveedor.
BEMPLEADO  |  Es empleado  |  Indica si el tercero es empleado.
BVENDEDOR  |  Es vendedor  |  Indica si el tercero es vendedor.
BCLIENTE  |  Es cliente  |  Indica si el tercero es cliente.
Atributos datos personales
ISEXO  |  Sexo  |  Indica el sexo del tercero.

M =Masculino
F =Femenino


FNACIMIENTO  |  Fecha nacimiento  |  Indica la fecha de nacimiento del tercero.
STRATAMIENTO  |  Tratamiento  |  Indica el tratamiento que se le debe dar al tercero.
PROFESION  |  Profesión  |  Indica la profesión del tercero.
CARGO  |  Cargo  |  Indica el cargo en la empresa que tiene el tercero.
PAGWEB  |  Página Web  |  Indica la página web del tercero.
EMAIL  |  Email  |  Indica el email principal del tercero.
CODPAIS  |  Código país  |  Indica el código del país del cual es el tercero.
PAIS  |  País  |  Indica el país del cual es el tercero.
CODDEPARTAMENTO  |  Código departamento  |  Indica el código del departamento del cual es el tercero.
DEPARTAMENTO  |  Departamento  |  Indica el departamento del cual es el tercero.
CODCIUDAD  |  Código ciudad  |  Indica el código de la ciudad de donde es el tercero.
CIUDAD  |  Ciudad  |  Indica la ciudad de donde es el tercero.
CODDEPCIUDAD  |  Cód. Departamento-Ciudad  |  Indica el código del departamento unido con el código de la ciudad donde es tercero.
DIRECCION  |  Dirección  |  Indica la dirección del tercero.
DIRECCION\_AZ09  |  Dirección2  |  Indica la dirección del tercero sin carácteres especiales.
ZONA  |  Zona  |  Indica la zona del tercero
TELEFONO  |  Teléfono  |  Indica el Teléfono del tercero.
TELEFONO2  |  Teléfono 2  |  Indica el teléfono 2 del tercero.
TELEFONO3  |  Teléfono 3  |  Indica el teléfono 3 del tercero.
CELULAR  |  Celular  |  Indica el celular del tercero.
FAX  |  Fax  |  Indica el fax del tercero.
Atributos clasificación del tercero
VALOR1  |  Valor1 tercero  |  Indica el valor 1 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
VALOR2  |  Valor2 tercero  |  Indica el valor 2 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
VALOR3  |  Valor3 tercero  |  Indica el valor 3 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
VALOR4  |  Valor4 tercero  |  Indica el valor 4 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
FECHA1  |  Fecha1 tercero  |  Indica la fecha 1 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
FECHA2  |  Fecha2 tercero  |  Indica la fecha 2 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
FECHA3  |  Fecha3 tercero  |  Indica la fecha 3 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
FECHA4  |  Fecha4 tercero  |  Indica la fecha 4 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
FECHA5  |  Fecha5 tercero  |  Indica la fecha 5 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
FECHA6  |  Fecha6 tercero  |  Indica la fecha 6 del tercero, tenga en cuenta que este atributo es configurable por el usuario.
ITDCATEGORIA  |  Categoría  |  Indica la Categoría del tercero, tenga en cuenta que este atributo es configurable por el usuario.
ITDTERCERO  |  Clasificación  |  Indica la Clasificación del tercero, tenga en cuenta que este atributo es configurable por el usuario.
Atributos datos tercero cliente
ITIPONEGOCIO  |  Tipo negocio  |  Indica el tipo de negocio del tercero.
ILISTAPRECIOS  |  Lista de precios  |  Lista de precios asignada al cliente por defecto
$ILISTAPRECIOS  |  Nombre lista de precios  |  Nombre de la lista de precios asignada al cliente por defecto
Atributos datos tercero empleado
ICCEMPLEADO  |  CC empleado  |  Indica el centro de costos por defecto del tercero, tenga en cuenta que este atributo es para el tipor de tercero empleado.
Atributos datos tercero proveedor
QDIASPLAZOCXP  |  Plazo CxP  |  Indica el plazo para realizarle el pago al tercero,tenga en cuenta que el atributo es para el tipo de tercero proveedor.
Atributos datos cuenta bancaria
ICTATIPO  |  Tipo de cuenta  |  Indica el tipo de cuenta que tiene configurado el tercero.
ICTATIPO2  |  Tipo de cuenta2  |  Indica el tipo de cuenta2 que tiene configurado el tercero.

---

Tipos de operaciones

Cód. Tipo de operación  |  Operación  |  Descripción
---|---|---
ING3 | Ingresos | Ingresos y recaudos por conceptos diferentes a venta de productos terminados
ING2 | Ingresos recibidos por anticipado | Ingresos recibidos por anticipado amortizados mensualmente
COM5 | Gastos | Gastos con cargo a un centro de costos
COM3 | Gastos diferidos | Gastos diferidos amortizados mensualmente
CAR1 | Deterioro de cartera | Deterioro de cartera
MOV2 | Traslado de fondos | Permite mover dinero entre cuentas de banco, caja, tarjetas y terceros.
MOV1 | Movimiento contable | Operación para grabación de movimiento contable.
MOV9 | Conciliación bancaria | Permite registrar la conciliación bancaria
CIE1 | Acciones automáticas de fin de mes | Acciones automáticas de fin de mes
CIE9 | Cierre de fin de año | Cierre de fin de año.
MOV5 | Crear crédito o anticipo \(CxP\) | Permite registrar préstamos que le hacen a la finca.
MOV3 | Abono a cuentas por pagar. \(CxP\) | Permite registrar el abono a una cuenta por pagar o su cancelación definitiva.
MOV8 | Replanteamiento de un crédito o anticipo \(CxP\) | Operación para replantear el financiamiento de una cuenta por pagar
MOV6 | Crear préstamo o anticipo \(CxC\) | Permite registrar los préstamos que la empresa hace.
MOV4 | Abono a cuentas por cobrar. \(CxC\) | Permite registrar el abono o cancelación de cuentas por cobrar a terceros.
CAR2 | Reversión de deterioro de cartera | Reversión de deterioro de cartera
MOV8 | Replanteamiento de un préstamo o anticipo \(CxC\) | Operación para replantear el financiamiento de una cuenta por cobrar
ACT2 | Compra/Mayor valor activos e inversiones | Compra/Mayor valor de activos de la finca.
ACT4 | Venta de activos | Venta de activos fijos.
ACT6 | Revaluación de activos | Revaluación de activos de propiedad planta y equipo
ACT8 | Baja de activos e inversiones | Dar de baja a un activo.
PLA7 | Planilla uso de maquinaria y equipo | Planilla para registrar el uso de maquinaria y equipos \(activos\)
COM1 | Compras | Operación para registrar la compra de productos
ING1 | Facturación y ventas | Facturación y venta de mercancías y/o productos
PLA2 | Planilla uso y/o consumos | Planilla de uso y/o consumos de elementos y materias primas
ING5 | Punto de venta | Facturación y venta con Punto de venta
COM2 | Ajustes de inventario | Ajustes de inventario de bodega
KAR1 | Embodegamiento de productos | Embodegamiento de productos
KAR2 | Traslado entre bodegas | Traslado de recursos entre bodegas
KAR4 | Transformación de productos | Transformación de productos
KAR5 | Traslado de productos entre procesos | Traslado de productos entre procesos de la empresa
ING4 | Devolución en compras | Devolución en compras de productos o insumos
COM4 | Devolución en ventas | Devolución en ventas de productos terminados
KAR3 | Movimiento universal de inventario | Operación para movimiento universal de inventario
ORD4 | Cotización al cliente | Operación para crear una cotización
ORD1 | Pedido de un cliente | Permite crear un pedido del cliente
ORD9 | Cerrar documentos | Cerrar docuemntos abiertos
ORD2 | Remisión al cliente \(guia de despacho\) | Permite crear una remisión al cliente \(guia de despacho\)
OR66 | Devolución de productos remitidos | Permite hacer una devolución de materiales a un proveedor
ORD3 | Requisición interna | Permite crear una requisición interna
ORD5 | Orden de compra al proveedor | Permite crear una orden de compra al proveedor
ORD6 | Recepción de materiales | Permite crear una recepción de materiales
OR22 | Devolución de materiales recibidos | Permite hacer una devolución de productos por un cliente
ORD9 | Cerrar documentos | Cerrar docuemntos abiertos
OP1  | Orden de producción | Operación para crear nuevas órdenes de producción
OT1  | Orden de trabajo | Operación para crear nuevas órdenes de trabajo
CC26 | Activar orden de trabajo en desarrollo | Permite activar una orden de trabajo que está en desarrollo
CC25 | Finalización orden de trabajo | Permite finalizar una orden de trabajo
CC1  | Activación de un centro de costos | Activación de un centro de costos en construcción o maquinaria y equipo en montaje
CC2  | Finalización centro de costos | Permite finalizar o reinicializar un centro de costos
CIE3 | Cierre del ciclo de costos | Cierre del ciclo de costos de centros de costos en producción
CC11 | Activación de un cultivo perenne en desarrollo | Permite activar un cultivo en fase de desarrollo
CC21 | Zoca o erradicación de un cultivo perenne | Permite registrar la zoca o erradicación de un cultivo perenne.
CC23 | Erradicación/recolección de un cultivo transitorio | Permite registrar erradicación/recolección de un cultivo transitorio.
CC24 | Finalización orden de producción | Permite finalizar una orden de producción
ORD7 | Contrato de labores | Permite crear un contrato de labores
OR91 | Finalización de contratos | Permite finalizar contratos civiles de obra
NOM1 | Pago de empleados | Permite realizar un pago a un empleado de la finca
PLA5 | Planilla de labores | Planilla de labores
MOV0 | Cargue inicial cuentas | Operación para la grabación de cargue inicial de saldos contables.
ACT0 | Cargue histórico de activos | Operación para el cargue histórico de los activos
ACT1 | Cargue de saldos actualizados de activos | Cargue inicial de activos fijos e inversiones
KAR0 | Cargue inicial inventarios | Operación de cargue inicial de inventarios
TASA | Registro de tasas de cambio | Registro de tasas de cambio para monedas extranjeras
NOM2 | Nómina contable | Nómina contable para el pago de empleados
COM6 | Pagos | Pagos con cargo a un centro de costos
NOM3 | Novedades de nómina contable | Novedades de nómina contable para el pago de empleados
KAR6 | Deterioro de inventarios | Deterioro o reversión del deterioro de inventarios
ACT3 | Conversión de activos a NIIF | Operación para la conversión de activos a NIIF
ACT7 | Deterioro de activos | Deterioro de activos de propiedad planta y equipo
ACT5 | Reclasificación de activos | Reclasificación de activos
CAR3 | Registro de tasa máxima de interés por mora | Permite el registro de un tasa máxima de interés por mora en determinado periodo.
COM7 | Nota crédito de ingresos | Nota crédito a factura realizada con operación de ingresos
ING6 | Nota débito de ingresos | Nota débito a factura realizada con operación de ingresos
GEN1 | Novedad de productos | Registrar novedades de productos para operaciones en bloque
GEN2 | Novedad de ingresos | Registrar novedades de ingresos para operaciones en bloque
GEN3 | Novedad de gastos | Registrar novedades de gastos para operaciones en bloque
GEN4 | Novedad de movimiento contable | Registrar novedades de movimiento contable para operaciones en bloque
ING7 | Nota crédito de ventas | Nota crédito a factura realizada con operación de ventas o punto de venta
ING8 | Nota débito de ventas | Nota débito a factura realizada con operación de ventas o punto de venta

---

=CarteraPorEdad \( \)

Descripción

Esta función calcula el saldo de las cuentas por cobrar que se vencen en un
periodo determinado y a la fecha actual no se han cancelado.

Tenga en cuenta que el periodo determinado en esta función filtra las cuentas
por pagar según la fecha estimada de pago y no según la fecha de creación del
documento.

Otras aplicaciones

Con esta función también podrá:

  * Calcular las cuentas por pagar que se vencen en un periodo determinado y que aún no están canceladas.

Sintaxis

|  =CarteraPorEdad  |  \(** ICuenta\*; ITercero\*; ICxX\*; FechaIni\*; FechaFin\*; IEmp\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar o por pagar del PUC de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar o por pagar de todos los terceros del catálogo de terceros de ContaPyme®.
ICxX\*
\(Opcional\)  |  Alfanumérico  |  Tipo de cuenta por la cual se desea filtrar.

**"CxC"** =Trae el valor de todas las cuentas por cobrar según los filtros.
**"CxP"** =Trae el valor de todas las cuentas por pagar según los filtros.  |  Calcula el valor obtenido de restarle todas las CxP a las CxC.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha estimada de pago** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece el primer día del año de la fecha de trabajo
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa por la cual se desea filtrar, basado en el explorador gráfico de empresas de ContaPyme®.  |  Establece el código de la empresa de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CarteraPorEdad\( "130505","130510"**;** "85647758","4586125"**;**
"CxP"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** "F"\)

Ejemplos

Para los ejemplos de esta función, se tendrá como base la siguiente
información:

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Fecha estimada de pago  |  Cód. cuenta  |  Cód. tercero
---|---|---|---|---|---|---
Préstamo  |  CE-00001  |  5/Ene/2017  |  $ 35.000  |  5/Feb/2017  |  133015  |  8005033
Factura crédito  |  FV-00005  |  25/Ene/2017  |  $ 75.000  |  25/Feb/2017  |  130505  |  9865321
Abono  |  CE-00001  |  2/Feb/2017  |  $ 35.000  |  |  133015  |  8005033
Factura crédito  |  FV-00006  |  3/Feb/2017  |  $ 100.000  |  3/Mar/2017  |  130510  |  9985604
Abono  |  FV-00005  |  1/Mar/2017  |  $ 25.000  |  |  130505  |  9865321
Abono  |  FV-00006  |  3/Mar/2017  |  $ 30.000  |  |  130510  |  9985604


Con los datos registrados en ContaPyme® descritos anteriormente, veamos
algunos ejemplos usando la fórmula CarteraPorEdad.

Tenga en cuenta que:

  * la función siempre toma como referencia la fecha de hoy, para el ejemplo \( 4 de marzo de 2017\)
  * La función realiza los cálculos filtrando por la **fecha estimada de pago** y no por la fecha de creación del documento.

=CarteraPorEdad \( ICuenta\* **;** ITercero\* **;** ICxX\* **;** FechaIni\*
**;** FechaFin\* **;** IEmp\* **;** BLocal\*\)

Ejemplo  |  Fórmula  |  Respuesta  |  Explicación
---|---|---|---
De las cuentas por cobrar registradas en la cuenta 130505, ¿Cuanto aún no me han pagado?  |  =CarteraPorEdad \( 130510\)  |  $ 50.000  |  En este ejemplo, como solo se está dando la cuenta, la función calculará todas las cuentas por cobrar registradas en la cuenta 130505 cuya fecha estimada de pago es inferior a la fecha de trabajo y que aún tienen saldo pendiente por pagar \(FV-00005 y FV-00006\).
¿Cuánto me está debiendo hoy el cliente Paolo González \(9985604\)?  |  =CarteraPorEdad \( 130510**;** 9985604\)  |  $ 70.000  |  Con estos datos, la función calculará la cuentas por cobrar del cliente Paolo González registradas en la cuenta 130510, cuya fecha estimada de pago es menor a hoy y aún no están canceladas.
Saldo de las cuentas por cobrar del mes de enero que a hoy se encuentran vencidas.  |  =CarteraPorEdad \( **;** **;** "CxC"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)**;** 1\)  |  $ 0.0  |  Como la CarteraPorEdad se basa en la **fecha estimada de pago** y no en la fecha de creación de la cuenta por cobrar, a pesar de que la cuenta está creada en el periodo indicado no se tiene en cuenta para el cálculo porque la fecha estimada de pago no cumple el filtro de fecha.
Saldo de las cuentas por cobrar del mes de febrero que a hoy no se han cancelado.  |  =CarteraPorEdad \( **;** **;** "CxC"**;** Fecha\(2017;02;1\)**;** Fecha\(2017;02;28\)**;** 1\)  |  $ 50.000  |  Tenga en cuenta que todos los abonos realizados hasta hoy intervienen en el cálculo así la fecha del abono no esté comprendida en el periodo especificado, debido a que la fórmula calcula **el saldo sin cancelar a hoy** de la deuda.
¿Cuánto aún me están debiendo del mes de Marzo?.  |  =CarteraPorEdad \( **;** **;** "CxC"**;** Fecha\(2017;03;1\)**;** Fecha\(2017;03;31\)**;** 1\)  |  $ 70.000  |  Recuerde que en la CarteraPorEdad se consideran todos los abonos realizados a la deuda hasta hoy para hallar el saldo de la misma, sin importar que los abonos se hayan creado por fuera del periodo especificado en la fórmula.
¿Cuánto me deben desde el 1/ene/2017 al 4/mar/2017 y a hoy la deuda no ha sido cancelada?.  |  =CarteraPorEdad \( **;** **;** "CxC"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;03;04\)**;** 1\)  |  $ 120.000  |  La CarteraPorEdad calculará todas las cuentas por cobrar que a hoy tienen saldo sin cancelar.
Saldo de las cuentas por cobrar del cliente Paolo Gonzalez entre el 1/ene/2017 y el 4/mar/2017 que el día de hoy no se han cancelado. |  =CarteraPorEdad \( **;** 9985604**;** "CxC"**;** Fecha\(2017;01;1\)**;** Fecha\(2017;03;4\)**;** 1\)  |  $ 70.000  |  Tenga en cuenta que la CarteraPorEdad calcula todas las cuentas que a hoy tenga la deuda vigente solamente del tercero por el cual se filtró la CarteraPorEdad.
Saldo de las cuentas por cobrar desde el 1/ene/2017 hasta el 28/Feb/2017 que a hoy en la cuenta deudores nacionales no se ha cancelado.  |  =CarteraPorEdad \( 130510**;** **;** "CxC"**;** **;** Fecha\(2017;02;28\)**;** 1\)  |  $ 50.000  |  Tenga en cuenta que la CarteraPorEdad calcula todas las deudas que se imputaron a la cuenta, teniendo en cuenta los abonos realizados que no se encuentren entre la FechaIni y la FechaFin.

---

=MovCarteraTercero \( \)

Descripción

Esta función calcula el movimiento dédito o crédito de la cartera de un
tercero en un periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el movimiento dédito o crédito de una cuenta por pagar a un periodo de tiempo determinado.
  * Calcular el saldo de las cuenta por cobrar o por pagar de un tercero en un periodo determinado y según los argumentos indicados.

Sintaxis

|  =MovCarteraTercero  |  \(** ICuenta\*; ITercero\*; IDebCred\*; FechaIni\*; FechaFin\*; IEmp\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Calcula el valor obtenido de restarle todas las CxP a las CxC.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar y por pagar de todos los terceros del catálogo de terceros de ContaPyme®.
IDebCred\*
\(Opcional\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCarteraTercero\( "130505","130510"**;** "852164","256483"**;**
"S"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** "F"\)

Ejemplos

Para los ejemplos de esta función, se tendrá como base la siguiente
información:

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Fecha estimada de pago  |  Cód. Cuenta  |  Cód. tercero
---|---|---|---|---|---|---
Préstamo  |  CE-00001  |  5/Ene/2017  |  $ 35.000  |  5/Feb/2017  |  130505  |  8005033
Factura crédito  |  FV-00005  |  25/Ene/2017  |  $ 75.000  |  25/Feb/2017  |  130505  |  9865321
Abono  |  CE-00001  |  2/Feb/2017  |  $ 35.000  |  |  130505  |  8005033
Factura crédito  |  FV-00006  |  3/Feb/2017  |  $ 100.000  |  3/Mar/2017  |  130510  |  9985604
Abono  |  FV-00005  |  1/Mar/2017  |  $ 25.000  |  |  130505  |  9865321
Abono  |  FV-00006  |  3/Mar/2017  |  $ 30.000  |  |  130510  |  9985604


Con los datos registrados en ContaPyme® descritos anteriormente, veamos
algunos ejemplos usando la fórmula MovCarteraTercero.

Tenga en cuenta que:

  * Se toma como la fecha de hoy el 4 de marzo de 2017.
  * La función realiza los cálculos filtrando por la **fecha de soporte de la operación.**

=MovCarteraTercero \( ICuenta\* **;** ITercero\* **;** IDebCred\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp\* **;** BLocal\* \)

Ejemplo  |  Fórmula  |  Respuesta  |  Explicación
---|---|---|---
En enero, ¿Cuánto le presté al cliente Juan Pérez \(8005033\)?  |  =MovCarteraTercero\( 130515**;** 8005033**;** "D"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)\)  |  $ 35.000  |  La función traerá la suma de todos los movimientos débitos registrados en enero en la cuenta 130515 con el cliente Juan Pérez.
En marzo, ¿Cuánto ha abonado Paolo González a sus deudas?  |  =MovCarteraTercero\( 130510**;** 9985604**;** "C"**;** Fecha\(2017;3;1\)**;** Fecha\(2017;3;31\)\)  |  $ 30.000  |  La función traerá la suma de todos los movimientos créditos registrados en la cuenta 130510 con el cliente Paolo González.
¿Cuánto es el saldo del cliente María López \(9865321\) al final del mes de marzo de 2017?  |  =MovCarteraTercero\( **;** 9865321**;** "S"**;** **;** Fecha\(2017;3;31\)\)  |  $ 50.000  |  La función traerá el saldo de los movimientos registrados con el cliente María López desde el inicio de los tiempos hasta el 31 de marzo de 2017.

---

=MovCarteraTerceroFiltro \( \)

Descripción

Esta función calcula el movimiento dédito o crédito de la cartera de un
tercero con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el movimiento dédito o crédito de una cuenta por cobrar en un periodo de tiempo determinado.
  * Calcular el movimiento dédito o crédito de una cuenta por pagar a un periodo determinado y según los argumentos indicados.
  * Calcular el saldo de las cuenta por cobrar o por pagar de un tercero en un periodo determinado y según los argumentos indicados.

Sintaxis

|  =MovCarteraTerceroFiltro  |  \(** Filtro\*; ITercero\*; IDebCred\*; FechaIni\*; FechaFin\*; IEmp\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro por el cual desea filtrar la función

Ej. **FiltroMovCont\_Cuenta\("130505"\)**

Ver algunos filtros.  |  No filtra la función por ningún filtro.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar y por pagar de todos los terceros del catálogo de terceros de ContaPyme®.
IDebCred\*
\(Opcional\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCarteraTerceroFiltro\( "130505","130510"**;**
"852164","256483"**;** "S"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Débito  |  Crédito  |  Cód. tercero
---|---|---|---|---|---|---|---
Préstamo  |  1  |  5/Ene/2017  |  $ 35.000  |  130505  |  $ 35.000  |  |  8005033
Préstamo  |  2  |  25/Ene/2017  |  $ 75.000  |  130505  |  $ 75.000  |  |  9865321
Abono  |  1  |  2/Feb/2017  |  $ 35.000  |  130505  |  |  $ 35.000  |  8005033
Préstamo  |  3  |  3/Feb/2017  |  $ 100.000  |  130510  |  $ 100.000  |  |  9985604
Abono  |  2  |  1/Mar/2017  |  $ 25.000  |  130505  |  |  $ 25.000  |  9865321
Abono  |  3  |  3/Mar/2017  |  $ 30.000  |  130510  |  |  $ 30.000  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente maneras


=MovCarteraTerceroFiltro \( Filtro\* **;** ITercero\* **;** IDebCred\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuántos fueron los movimientos débitos en el mes de enero de 2017?.  |  =MovCarteraTerceroFiltro\( FiltroMovCont\_ClaseOperacion\("0"\)**;** **;** **;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)\)  |  $ 120.000
¿Cuántos fueron los movimientos créditos de la cuenta 130505 entre el mes de enero y marzo de 2017?.  |  =MovCarteraTerceroFiltro\( FiltroMovCont\_Cuenta\("130505"\)**;** **;** "C"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;3;31\)\)  |  $ 60.000
¿Cuánto es el saldo del el cliente con código 9865321 a el final del mes de Marzo de 2017?.  |  =MovCarteraTerceroFiltro\( FiltroMovCont\_Tercero\("9865321"\)**;** **;** "S"**;** **;** Fecha\(2017;3;31\)\)  |  $ 50.000



\*\[FILTROS: 46,32,33,95,72\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=SaldoCarteraTercero \( \)

Descripción

Esta función calcula el saldo de la cartera de un tercero a una fecha en
específico. Tenga en cuenta que el saldo es la resta de los créditos a los
débitos.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el saldo de las cuenta por pagar a una fecha en específico y según los argumentos indicados.

Sintaxis

|  =SaldoCarteraTercero  |  \(** ICuenta\*; ITercero\*; IDebCred\*; FechaFin\*; IEmp\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Calcula el valor obtenido de restarle todas las CxP a las CxC.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar y por pagar de todos los terceros del catálogo de terceros de ContaPyme®.
IDebCred\*
\(Opcional\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Determina el momento al que se desea traer el saldo de la cuenta por cobrar o por pagar.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCarteraTercero\( "130505,130510"**;** "852164,256483"**;**
"S"**;** Fecha\(2015;12;31\)**;** 1**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Débito  |  Crédito  |  Cód. tercero
---|---|---|---|---|---|---|---
Préstamo  |  1  |  5/Ene/2017  |  $ 35.000  |  130505  |  $ 35.000  |  |  8005033
Préstamo  |  2  |  25/Ene/2017  |  $ 75.000  |  130505  |  $ 75.000  |  |  9865321
Abono  |  1  |  2/Feb/2017  |  $ 35.000  |  130505  |  |  $ 35.000  |  8005033
Préstamo  |  3  |  3/Feb/2017  |  $ 100.000  |  130510  |  $ 100.000  |  |  9985604
Abono  |  2  |  1/Mar/2017  |  $ 25.000  |  130505  |  |  $ 25.000  |  9865321
Abono  |  3  |  3/Mar/2017  |  $ 30.000  |  130510  |  |  $ 30.000  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCarteraTercero \( ICuenta\* **;** ITercero\* **;** IDebCred\* **;**
FechaFin\* **;** IEmp\* **;** BLocal\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto me están debiendo al final del mes de marzo de 2017?.  |  =SaldoCarteraTercero\( **;** **;** "S"**;** Fecha\(2017;3;31\)\)  |  $ 120.000
¿Cuánto me debe el cliente con código 9865321 al final del mes de enero de 2017?.  |  =SaldoCarteraTercero\( **;** 9865321**;** **;** Fecha\(2017;1;31\)\)  |  $ 75.000
¿Cuál es la cartera a febrero de 2017?.  |  =SaldoCarteraTercero\( **;** **;** **;** Fecha\(2017;2;28\)\)  |  $ 50.000

---

=SaldoCarteraTerceroFiltro \( \)

Descripción

Esta función calcula el saldo de la cartera de un tercero a una fecha en
específico con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Esta función calcula el saldo de las cuenta por cobrar a una fecha en específico y según los argumentos indicados.
  * Calcular el saldo de las cuenta por pagar a una fecha en específico y según los argumentos indicados.

Sintaxis

|  =SaldoCarteraTerceroFiltro  |  \(** Filtro\*; ITercero\*; IDebCred\*; FechaFin\*; IEmp\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro por el cual desea filtrar la función

Ej. **FiltroMovCont\_Cuenta\("130505"\)**

Ver algunos filtros.  |  No filtra la función por ningún filtro.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar y por pagar de todos los terceros del catálogo de terceros de ContaPyme®.
IDebCred\*
\(Opcional\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el saldo de la cuenta por cobrar o por pagar.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCarteraTerceroFiltro\( "130505","130510"**;**
"852164","256483"**;** "S"**;** Fecha\(2015;12;31\)**;** 1**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Débito  |  Crédito  |  Cód. tercero
---|---|---|---|---|---|---|---
Préstamo  |  1  |  5/Ene/2017  |  $ 35.000  |  130505  |  $ 35.000  |  |  8005033
Préstamo  |  2  |  25/Ene/2017  |  $ 75.000  |  130505  |  $ 75.000  |  |  9865321
Abono  |  1  |  2/Feb/2017  |  $ 35.000  |  130505  |  |  $ 35.000  |  8005033
Préstamo  |  3  |  3/Feb/2017  |  $ 100.000  |  130510  |  $ 100.000  |  |  9985604
Abono  |  2  |  1/Mar/2017  |  $ 25.000  |  130505  |  |  $ 25.000  |  9865321
Abono  |  3  |  3/Mar/2017  |  $ 30.000  |  130510  |  |  $ 30.000  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCarteraTerceroFiltro \( Filtro\* **;** ITercero\* **;** IDebCred\* **;**
FechaFin\* **;** IEmp\* **;** BLocal\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto me debe el cliente con código 9865321 al final del mes de enero de 2017?.  |  =SaldoCarteraTerceroFiltro\( FiltroMovCont\_Tercero\("9865321"\)**;** **;** **;** Fecha\(2017;1;31\)\)  |  $ 75.000
¿Cuál es la cartera de la cuenta 130505 a febrero de 2017?.  |  =SaldoCarteraTerceroFiltro\( FiltroMovCont\_Cuenta\("130505"\)**;** **;** **;** Fecha\(2017;2;28\)\)  |  $ 50.000



\*\[FILTROS: 46,32,33,95,72\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CarteraPorEdadFecha \( \)

Descripción

Esta función calcula el saldo de las cuentas por cobrar que se vencen en un
periodo determinado y que a una fecha en específico no se han cancelado.

Tenga en cuenta que el periodo determinado en los parámetros FechaIni\* y
FechaFin\*, filtra según la fecha estimada de pago de la operación y no según
la fecha de creación del documento.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el saldo de las cuentas por pagar que se vencen en un periodo determinado y que a una fecha en específico no se han cancelado.

Sintaxis

|  =CarteraPorEdadFecha  |  \(** ICuenta\*; ITercero\*; ICxX\*; FechaIni\*; FechaFin\*; Fecha\*; IEmp\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar o por pagar del PUC de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de todas las cuentas por cobrar o por pagar de todos los terceros del catálogo de terceros de ContaPyme®.
ICxX\*
\(Opcional\)  |  Alfanumérico  |  Tipo de cuenta por la cual se desea filtrar.

**"CxC"** =Trae el valor de todas las cuentas por cobrar según los filtros.
**"CxP"** =Trae el valor de todas las cuentas por pagar según los filtros.  |  Calcula el valor obtenido de restarle todas las CxP a las CxC.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha estimada de pago** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece el primer día del año de la fecha de trabajo
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento hasta donde se calculan los saldos según los abonos realizados a la deuda. Se recomienda utilizar la función fecha para este argumento, así se evitan confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha del primer día del año de la FechaFin.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa por la cual se desea filtrar, basado en el explorador gráfico de empresas de ContaPyme®.  |  Establece el código de la empresa de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CarteraPorEdadFecha\( "130505","130510"**;**
"85647758","4586125"**;** "CxP"**;** Fecha\(2017;1;1\)**;**
Fecha\(2017;12;31\)**;** Fecha\(2017;12;31\)**;** 1**;** "F"\)

Ejemplos

Para los ejemplos de esta función, se tendrá como base la siguiente
información:

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Fecha estimada de pago  |  Cód. cuenta  |  Cód. tercero
---|---|---|---|---|---|---
Préstamo  |  CE-00001  |  5/Ene/2017  |  $ 35.000  |  5/Feb/2017  |  133015  |  8005033
Factura crédito  |  FV-00005  |  25/Ene/2017  |  $ 75.000  |  25/Feb/2017  |  130505  |  9865321
Abono  |  CE-00001  |  2/Feb/2017  |  $ 35.000  |  |  133015  |  8005033
Factura crédito  |  FV-00006  |  3/Feb/2017  |  $ 100.000  |  3/Mar/2017  |  130510  |  9985604
Abono  |  FV-00005  |  1/Mar/2017  |  $ 25.000  |  |  130505  |  9865321
Abono  |  FV-00006  |  3/Mar/2017  |  $ 30.000  |  |  130510  |  9985604


Con los datos registrados en ContaPyme® descritos anteriormente, veamos
algunos ejemplos usando la fórmula CarteraPorEdadFecha.

Tenga en cuenta que:

  * La función realiza los cálculos filtrando por la **fecha estimada de pago** y no por la fecha de creación del documento.

=CarteraPorEdadFecha \( ICuenta\* **;** ITercero\* **;** ICxX\* **;**
FechaIni\* **;** FechaFin\* **;** Fecha\* **;** IEmp\* **;** BLocal\*\)

Ejemplo  |  Fórmula  |  Respuesta  |  Explicación
---|---|---|---
¿Cuál es el saldo de las cuentas por cobrar al 4 de marzo de 2017, que fueron imputadas a la cuenta 130505 y con fecha estimada de pago entre el 1 de enero y el 31 de marzo del 2017?.  |  =CarteraPorEdadFecha\(** 130505; ; "CxC"; Fecha\(2017;01;1\); Fecha\(2017;12;31\); Fecha\(2017;03;4\)**\)  |  $ 50.000  |  Tenga en cuenta que todos los abonos realizados hasta el 4 de marzo de 2017 van a intervenir en el cálculo.
¿Cuál es el saldo de las cuentas con fecha de pago estimada entre el 1 de enero y el 31 de marzo del 2017, fueron imputadas a la cuenta 130505 y al 28 de febrero de 2017 no se habían cancelado?.  |  =CarteraPorEdadFecha\(** 130510; ; "CxC"; Fecha\(2017;01;1\); Fecha\(2017;12;31\); Fecha\(2017;02;28\)**\)  |  $ 100.000  |  Tenga en cuenta que la función calcula las cuentas por cobrar creadas hasta el 28 de febrero de 2017 con los abonos realizados hasta esta fecha.
¿De las cuentas por cobrar creadas en el 2017 al cliente Paolo González \(9985604\), cuanto me está debiendo al 5 de febrero de 2017?  |  =CarteraPorEdadFecha \( **; 9985604; "CxC"; Fecha\(2017;01;1\); Fecha\(2017;12;31\); Fecha\(2017;02;5\)**\)  |  $ 100.000  |  Tenga en cuenta que la función calcula las cuentas por cobrar creadas hasta el 5 de febrero de 2017 con los abonos realizados hasta esta fecha.
¿Cuánto me debía el cliente Paolo González \(9985604\) al 4 de marzo de 2017?  |  =CarteraPorEdadFecha \( **; 9985604; "CxC"; Fecha\(2017;01;1\); Fecha\(2017;03;4\); Fecha\(2017;03;4\)**\)  |  $ 70.000  |  Tenga en cuenta que la función calcula las cuentas por cobrar creadas hasta el 4 de marzo de 2017 con los abonos realizados hasta esta fecha.
Saldo de las cuentas por cobrar del mes de enero que al 4 de marzo aún no se han cancelado.  |  =CarteraPorEdadFecha \( **;** **;** "CxC"**;** Fecha\(2017;01;1\)**;** Fecha\(2017;01;31\)**;** Fecha\(2017;03;4\)\)  |  $ 0.0  |  Como la función se basa en la **fecha estimada de pago** y no en la fecha de creación de la cuenta por cobrar, el resultado es $0.0.
Saldo de las cuentas por cobrar del mes de febrero que al 28 de febrero de 2017 no se habían cancelado.  |  =CarteraPorEdadFecha \( **;** **;** "CxC"**;** Fecha\(2017;02;1\)**;** Fecha\(2017;02;28\)**;** Fecha\(2017;03;1\)\)  |  $ 75.000  |  Tenga en cuenta que todos los abonos realizados hasta el 4 de marzo de 2017 intervienen en el cálculo.
Saldo de las cuentas por cobrar del mes de febrero que al 4 de marzo de 2017 no se habían cancelado.  |  =CarteraPorEdadFecha \( **;** **;** "CxC"**;** Fecha\(2017;02;1\)**;** Fecha\(2017;02;28\)**;** Fecha\(2017;03;4\)\)  |  $ 50.000  |  Tenga en cuenta que todos los abonos realizados hasta el 4 de marzo de 2017 intervienen en el cálculo.
¿Cuánto me deben desde el 1/ene/2017 al 4/mar/2017 y que al 31 de marzo de 2017 no se habían cancela la deuda no ha sido cancelada?.  |  =CarteraPorEdadFecha \( **;** **;** "CxC"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;03;04\)**;** Fecha\(2017;03;31\)\)  |  $ 120.000  |  La CarteraPorEdadFecha calculará todas las cuentas por cobrar que al 31 de marzo de 2017 tienen saldo sin cancelar.
Saldo de las cuentas por cobrar desde el 1/ene/2017 hasta el 28/Feb/2017 que al 31 de marzo de 2017 en la cuenta deudores nacionales no se habían cancelado.  |  =CarteraPorEdadFecha \( 130510**;** **;** "CxC"**;** **;** Fecha\(2017;02;28\)**;** Fecha\(2017;03;31\)\)  |  $ 50.000  |  Tenga en cuenta que la CarteraPorEdadFecha calcula todas las deudas que se imputaron a la cuenta, teniendo en cuenta los abonos realizados que no se encuentren entre la FechaIni y la FechaFin.

---

=AtributoCC \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de un centro de
costos según el código dado. Tenga en cuenta que los atributos son
características dadas a cada centro de costos y se configuran desde el
explorador gráfico de empresas de ContaPyme®.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoCC  |  \( ** NAtributo; IEmp\*; ICC\*; Fecha\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.

|  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de el explorador gráfico de ContaPyme®.
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea consultar el atributo determinado del centro de costos.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.

Ejemplos

  * A continuación se visualizan algunos atributos de unos centros de costos creados en ContaPyme®.

Código CC  |  Nombre CC  |  Nombre corto CC
---|---|---
1010  |  Centro de costos \[agrupador\]  |  CCAgrup
|  10101  |  Gastos empresariales generales \[bás\]  |  GastosEmp
|  10102  |  Departamento Administrativo \[bás\]  |  DepAdmin
|  10103  |  Departamento Comercial \[bás\]  |  DepComer
1020  |  Costos indirectos de fabricación \[agrupador\]  |  IndirecFab
|  10201  |  Servicios indirectos \[bás -> 1030D1\]  |  ServIndirec
11050  |  Centro de costos de producción \[prd\]  |  Produc1

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoCC \( NAtributo**;** IEmp\* **;** ICC\* **;** Fecha\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre del centro de costos con código 1020.  |  =AtributoCC \( "NNODE"**;** 1 **;** "1020" \)  |  Costos indirectos de fabricación
Cúal es el nombre corto del centro de costos 11050.  |  =AtributoCC \( "NCORTO"**;** 1 **;** "11050" \)  |  Produc1
Cúal es el código padre del centro de costos 10201  |  =AtributoCC \( "IPADRE"**;** 1 **;** "10201" \)  |  1020


True =Verdadero, la cuenta cumple con el atributo dado
False =Falso, la cuenta no cumple con el atributo dado


A continuación se muetran los atributos de un **centro de costos básico o de
explotación** , si desea ver los atributos de otro tipo de centro de costos,
vuelva al menú principal, ingrese a atributos y vea la tabla de atributos del
tipo de centro de costos que desea.


\*\[ATRIBUTOS:AtributosCC=1\]\*

---

=AtributoEmpresa \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de una empresa según
el código dado.

Tenga en cuenta que los atributos son características dadas a cada empresa y
se configuran desde el explorador gráfico de empresas de ContaPyme®.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoEmpresa  |  \( ** NAtributo; IEmp\*; Fecha\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.

|  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de empresas de ContaPyme® de la cual se desea conocer sus atributos.  |  Valor Requerido
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea consultar el atributo determinado del centro de costos.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.

Ejemplos

  * A continuación se visualiza una empresa creada en ContaPyme® con algunos de sus artibutos.

1 - DEMO COMPUTADORES LTDA
---
Nombre Corto  |  DEMO PC
Nit  |  81000630-9
País  |  Colombia  |  Ciudad  |  Manizales
Teléfono  |  8856485  |  Fax  |  8851256
Dirección  |  CRA 25 \# 65 - 42

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoEmpresa \( NAtributo**;** IEmp\* **;** Fecha\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre de la empresa 1.  |  =AtributoEmpresa \( "NNODE"**;** 1 **;** \)  |  DEMO COMPUTADORES LTDA
Cúal es el nombre corto de la empresa 1.  |  =AtributoEmpresa \( "NCORTO"**;** 1 \)  |  DEMO PC
Cúal es el teléfono de la empresa 1.  |  =AtributoEmpresa \( "TTELEFONO"**;** 1 \)  |  8856485


True =Verdadero, la empresa cumple con el atributo dado
False =Falso, la empresa no cumple con el atributo dado


A continuación se muetran los atributos de una **empresa** , si desea ver los
atributos de una finca, vuelva al menú principal, ingrese a atributos, empresa
y vea la tabla de atributos de una finca.


\*\[ATRIBUTOS:AtributosCC=8\]\*

---

=AtributoSede \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de una sede creada
en ContaPyme®.

Tenga en cuenta que los atributos son características dadas a cada sede y se
configuran desde el explorador gráfico de empresas de ContaPyme®.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoSede  |  \( ** NAtributo; IEmp\*; ISede; Fecha\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.

|  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ISede
\(Requerido\)  |  Alfanumérico  |  Código de una sede del explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Valor requerido
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea consultar el atributo determinado.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.

Ejemplos

  * A continuación se visualizan las sedes creadas en ContaPyme® con algunos de sus artibutos.

11 - Sede centro
---
Nombre Corto  |  SedeC
País  |  Colombia  |  Ciudad  |  Manizales
Teléfono  |  8856485  |  Fax  |  8851256
Dirección  |  CRA 25 \# 65 - 42
12 - Sede norte
Nombre Corto  |  SedeN
País  |  Colombia  |  Ciudad  |  Bogota
Teléfono  |  9852114  |  Fax  |  8456215
Dirección  |  CALLE 117 \# 86 - 35

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoSede \( NAtributo**;** IEmp\* **;** ISede**;** Fecha\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre de al sede con código 12.  |  =AtributoSede \( "NNODE"**;** 1 **;** 12 \)  |  Sede norte
Cúal es el nombre corto de la sede con código 11.  |  =AtributoSede \( "NCORTO"**;** 1 **;** 11 \)  |  SedeC
Cúal es el teléfono de la sede del norte.  |  =AtributoSede \( "TTELEFONO"**;** 1 **;** 12 \)  |  9852114


True =Verdadero, la sede cumple con el atributo dado
False =Falso, la sede no cumple con el atributo dado


A continuación se muetran los atributos de una **sede empresa** , si desea ver
los atributos de una sede finca, vuelva al menú principal, ingrese a
atributos, sede y vea la tabla de atributos de una sede finca.


\*\[ATRIBUTOS:AtributosCC=9\]\*

---

=CantidadAreaM2CC \( \)

Descripción

Esta función muestra el área en metros cuadrados de determinada empresa, según
una fecha establecida.


Sintaxis

|  =CantidadAreaM2CC  |  \(** IEmp\*; ICC\*; Fecha\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC
\(Requerido\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  No trae ningún valor ya que el campo es obligatorio
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea consultar el área en metros cuadrados de determinado centro de costos.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.

Ejemplos

  * La empresa 1, CMB Muebles, ha tenido un crecimiento físico en los últimos 10 años en diferentes centros de costos de la empresa, Este crecimiento fue registrado en ContaPyme® en metros cuadros, A continuación se muestra el respectivo registro.

Centro de costos  |  Fecha Inicial  |  Fecha Final  |  Unidad de medida  |  Ãrea
---|---|---|---|---
1010  |  1/Ene/2010  |  30/Jun/2016  |  Hectáreas  |  1
1015  |  1/Ene/2010  |  1/Ene/2014  |  Metros cuadrados  |  1.200
1010  |  30/Jun/2016  |  |  Hectarias  |  1.5
1015  |  1/Ene/2014  |  |  Metros cuadrados  |  3.600

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadAreaM2CC \( IEmp\* **;** ICC**;** Fecha\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Ãrea en metros cuadrados del centro de costos 1010 en la empresa 1 para el día 30 de junio de 2015.  |  =CantidadAreaM2CC \( 1**;** 1010**;** Fecha\(2017;1;1\) \)  |  10.000 m2
Ãrea en metros cuadrados del centro de costos 1015 en la empresa 1 para el día 1 de enero de 2012.  |  =CantidadAreaM2CC \( 1**;** 1015**;** Fecha\(2017;1;1\) \)  |  1.200 m2
Ãrea en metros cuadrados del centro de costos 1010 en la empresa 1 a hoy.  |  =CantidadAreaM2CC \( 1**;** 1015**;** \)  |  15.000 m2

---

=CantidadAreaUnidadCC \( \)

Descripción

Esta función muestra el área de la unidad que por defecto está configurado el
centro de costos de la empresa creada en el explorador gráfico de ContaPyme® a
una fecha determinada.

Para conocer la unidad del área de la empresa vea la función **UnidadAreaCC**

Si desea ver el área de la empresa en metros cuadrados vea la función
**CantidadAreaM2CC**

Sintaxis

|  =CantidadAreaUnidadCC  |  \(** IEmp\*; ICC\*; Fecha\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC
\(Requerido\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  No trae ningún valor ya que el campo es obligatorio
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea consultar el área en metros cuadrados de determinado centro de costos.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.

Ejemplos

  * La empresa 1, CMB Muebles, ha tenido un crecimiento físico en los últimos 10 años en diferentes centros de costos de la empresa, Este crecimiento fue registrado en ContaPyme® en metros cuadros, A continuación se muestra el respectivo registro.

Centro de costos  |  Fecha Inicial  |  Fecha Final  |  Unidad de medida  |  Ãrea
---|---|---|---|---
1010  |  1/Ene/2010  |  30/Jun/2016  |  Hectáreas  |  1
1015  |  1/Ene/2010  |  1/Ene/2014  |  Metros cuadrados  |  1.200
1010  |  30/Jun/2016  |  |  Hectarias  |  1.5
1015  |  1/Ene/2014  |  |  Metros cuadrados  |  3.600

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadAreaUnidadCC \( IEmp\* **;** ICC**;** Fecha\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Ãrea del centro de costos 1010 en la empresa 1 para el día 30 de junio de 2015.  |  =CantidadAreaUnidadCC \( 1**;** 1010**;** Fecha\(2017;1;1\) \)  |  1 Ha
Ãrea del centro de costos 1015 en la empresa 1 para el día 1 de enero de 2012.  |  =CantidadAreaUnidadCC \( 1**;** 1015**;** Fecha\(2017;1;1\) \)  |  1.200 m2
Ãrea del centro de costos 1010 en la empresa 1 a hoy.  |  =CantidadAreaUnidadCC \( 1**;** 1015**;** \)  |  1.5 Ha

---

=NombreCC \( \)

Descripción

Esta función es utilizada para conocer el nombre de un centro de costos
registrado en el explorador gráfico de ContaPyme®.

Sintaxis

|  =NombreCC  |  \(** IEmp\*; ICC\*; BNombreLargo\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme®. del cual se desea conocer el nombre.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos del cual se quiere conocer el nombre.  |  La función muestra el nombre de la empresa con el código del argumento IEmp.
BNombreLargo\*
\(Opcional\)  |  Alfanumérico  |  Determina si trae el nombre completo del centro de costos.

**"T"** =Muestra el nombre completo del centro de costos.
**"F"** =Muestra el nombre abreviado del centro de costos.  |  Por defecto toma el valor **"F"** , mostrando el nombre abreviado del centro de costos.

Ejemplos

  * A continuación se visualiza una empresa con sus centros de costos registrados en ContaPyme®.

DEMO COMPUTADORES LTDA.
---
1010  |  Centro de costos \[agrupador\]
|  10101  |  Gastos empresariales generales \[bás\]
|  10102  |  Departamento Administrativo \[bás\]
|  10103  |  Departamento Comercial \[bás\]
1020  |  Costos indirectos de fabricación \[agrupador\]
|  10201  |  Servicios indirectos \[bás -> 1030D1\]
11050  |  Centro de costos de producción \[prd\]

=NombreCC \( IEmp\* **;** ICC\* **;** BNombreLargo\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el nombre abreviado de centros de costos 10101 de la empresa 1.  |  =NombreCC \( 1**;** 10101****\)  |  G. Gen
Determinar cuál es el nombre del centros de costos 10201 de la empresa 1.  |  =NombreCC \( 1**;** 10201**;** "T" \)  |  Servicios indirectos

---

=NombreEmpresa \( \)

Descripción

Esta función es utilizada para conocer el nombre de una empresa registrada en
el explorador gráfico de ContaPyme®.

Sintaxis

|  =NombreEmpresa  |  \( ** IEmp\*; BNombreLargo\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa del cual se desea conocer el nombre, basado en el explorador gráfico de empresas de ContaPyme®.  |  Establece el código de la empresa de trabajo configurada en el momento.
BNombreLargo\*
\(Opcional\)  |  Alfanumérico  |  Determina si trae el nombre completo de la empresa.

**"T"** =Muestra el nombre completo de la empresa
**"F"** =Muestra el nombre abreviado de la empresa  |  Por defecto toma el valor **"F"** , mostrando el nombre abreviado de la empresa.

Ejemplos

  * A continuación se visualizan las empresas de trabajo registradas en ContaPyme®.

Código empresa  |  Nombre completo empresa  |  Nombre abreviado empresa
---|---|---
1  |  DEMO COMPUTADORES S.A.  |  DEMO COMP
2  |  CMB-MUEBLES LTDA  |  CMB
3  |  INDUSTRIAS METALICAS JUANDA  |  INDUS JUANDA

=NombreEmpresa \( IEmp\* **;** BNombreLargo\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el nombre de empresa con código 1.  |  =NombreEmpresa \( 1 \)  |  DEMO COMP
Determinar cuál es el nombre completo de empresa con código 2.  |  =NombreEmpresa \( 2**;** "T" \)  |  CMB-MUEBLES LTDA

---

=PoblacionCC \( \)

Descripción

Esta función determina cuanta población se encuentra en un centro de costos
determinado. Tenga en cuenta que la población de un centro de costos es
configurada desde ContaPyme® en el explorador gráfico de empresas.

Para conocer la unidad de la población de un CC vea la función
**UnidadPoblacionCC**

Sintaxis

|  =NombreCC  |  \(** IEmp\*; ICC\*; Fecha\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme®. por el cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos del cual se quiere la cantidad de población.  |  Valor requerido
Fecha\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el número de población de determinado centro de costos. |  Establece la fecha de trabajo configurada en el momento.

Ejemplos

  * En la empresa DEMO COMPUTADORES LTDA se realizó el registro histórico en ContaPyme® de cantidad de población en los siguientes centros de costos.

Fecha  |  Población
---|---
1010 - Sede principal
10/Feb/2014  |  101
15/Sep/2015  |  150
3/Jul/2016  |  235
1020 - Sede centro
28/Feb/2019  |  86

=PoblacionCC \( IEmp\* **;** ICC**;** Fecha\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es la población del centro de costos 1010 al 31/Dic/2015  |  =PoblacionCC \( 1**;** 1010**;** Fecha\(2015;12;31\)\)  |  150
Determinar cuál es la población del centro de costos 1010 al 31/Dic/2015  |  =PoblacionCC \( 1**;** 1020**;** Fecha\(2015;12;31\) \)  |  86

---

=UnidadAreaCC \( \)

Descripción

Esta función muestra la unidad del área de una empresa. Tenga en cuenta que
esta unidad es configurable desde el explorador gráfico de ContaPyme®.

Para conocer el área de la empresa vea la función **CantidadAreaUnidadCC**

Sintaxis

|  =UnidadAreaCC  |  \(** IEmp\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa a la cual se desea conocer la unidad del área predeterminada.  |  Establece el código de la empresa de trabajo configurada en el momento.

Unidades de área

Unidades
---
1  |  Hectáreas
2  |  Cuadras
3  |  Acres
4  |  Yardas Cuadradas
5  |  Caballerizas
6  |  Metros cuadrados
7  |  Manzanas

Ejemplos

=UnidadAreaCC \( IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es la unidad del área de la empresa 1 - DEMO COMPUTADORES LTDA.  |  =UnidadAreaCC \( 1 \)  |  Metros cuadrados

---

=UnidadPoblacionCC \( \)

Descripción

Esta función muestra la unidad de la población de un centro de costos. tenga
en cuenta que esta unidad la puede configurar desde el explorador gráfico de
ContaPyme®

Para conocer la cantidad de la población de un CC vea la función
**PoblacionCC**

Sintaxis

|  =UnidadAreaCC  |  \(** IEmp\*; ICC **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme®. por el cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos del cual se quiere conocer la unidad configurada para la población.  |  Valor requerido

Ejemplos

  * En la empresa DEMO COMPUTADORES LTDA se tiene el registro histórico en ContaPyme® de la cantidad de población de los siguientes centros de costos.

Fecha  |  Población  |  Unidad Población
---|---|---
1010 - Sede principal
10/Feb/2014  |  101  |  Empleados
15/Sep/2015  |  150
3/Jul/2016  |  235
1020 - Sede centro
28/Feb/2019  |  86  |  Unidades

=UnidadPoblacionCC \( IEmp\* **;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es la unidad de la población del centro de costos 1010.  |  =UnidadPoblacionCC \( 1**;** 1010 \)  |  Empleados

---

=ContarAsientosEjecPptalFiltro \( \)

Descripción

Esta función calcula la cantidad de movimientos de las cuentas marcadas "es de
presupuesto" con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =ContarAsientosEjecPptalFiltro  |  \( Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("110505"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =ContarAsientosEjecPptalFiltro\( Filtro\(\)**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. Documento  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Es cuenta de presupuesto  |  Cód. centro de costos imputado
---|---|---|---|---|---|---
2-Factura Venta  |  1  |  5/Ene/2017  |  $ 35.000  |  413568  |  ok  |
2-Factura Venta  |  1  |  15/Mar/2017  |  $ 125.000  |  413572  |  ok  |  1010
15-Pago transporte  |  1  |  17/Jun/2017  |  $ 75.000  |  614505  |  |
2-Factura Venta  |  1  |  30/Ago/2017  |  $ 120.000  |  413572  |  ok  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=ContarAsientosEjecPptalFiltro \( Filtro\* **;** FechaIni\* **;** FechaFin\*
**;** IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuántos movimientos de ejecución presupuestal se han realizado con el tipo de operación 2, Factura de venta en el año 2017?.  |  =ContarAsientosEjecPptalFiltro\( FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;01;1\)**;** Fecha\(2017;12;31\)\)  |  3
¿Cuántos movimientos de ejecución presupuestal se han realizado en la cuenta 413572 en el primer semestre del año 2017?.  |  =ContarAsientosEjecPptalFiltro\( FiltroMovCont\_Cuenta\(413572\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;06;30\)**;** 1\)  |  2



\*\[FILTROS: 46,49,6,47,95,28\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovEjecPptal \( \)

Descripción

Esta función calcula los movimientos de las cuentas marcadas "es de
presupuesto" entre un periodo de tiempo determinado.

Sintaxis

|  =MovEjecPptal  |  \( ICuenta; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovEjecPptal\( "413568,413572"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. Documento  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Es cuenta de presupuesto  |  Cód. centro de costos imputado
---|---|---|---|---|---|---
Factura Venta  |  1  |  5/Ene/2017  |  $ 35.000  |  413568  |  ok  |
Factura Venta  |  1  |  15/Mar/2017  |  $ 125.000  |  413572  |  ok  |  1010
Pago transporte  |  1  |  17/Jun/2017  |  $ 75.000  |  614505  |  |
Factura Venta  |  1  |  30/Ago/2017  |  $ 120.000  |  413572  |  ok  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovEjecPptal \( ICuenta**;** FechaIni\* **;** FechaFin\* **;** IEmp**;**
ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál fue el movimiento de las cuentas presupuestales del año 2017.  |  =MovEjecPptal\( **;** Fecha\(2017;01;1\)**;** Fecha\(2017;12;31\)\)  |  $ 280.000
Cuál fue el movimiento de las cuentas presupuestales entre el 15 de enero de 2017 y el 15 de junio de 2017.  |  =MovEjecPptal\( **;** Fecha\(2017;1;15\)**;** Fecha\(2017;06;15\)**;** 1\)  |  $ 125.000

---

=MovEjecPptalFiltro \( \)

Descripción

Esta función calcula los movimientos de las cuentas marcadas "es de
presupuesto" con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =MovEjecPptalFiltro  |  \( Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("Cuenta1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovEjecPptalFiltro\( "413568,413572"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. Documento  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Es cuenta de presupuesto  |  Cód. centro de costos imputado
---|---|---|---|---|---|---
2-Factura Venta  |  1  |  5/Ene/2017  |  $ 35.000  |  413568  |  ok  |
2-Factura Venta  |  1  |  15/Mar/2017  |  $ 125.000  |  413572  |  ok  |  1010
16-Pago transporte  |  1  |  17/Jun/2017  |  $ 75.000  |  614505  |  |
2-Factura Venta  |  1  |  30/Ago/2017  |  $ 120.000  |  413572  |  ok  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovEjecPptalFiltro \( Filtro\* **;** FechaIni\* **;** FechaFin\* **;**
IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el valor de los movimientos de ejecución presupuestal se han realizado con el tipo de operación 2, Factura de venta en el año 2017?.  |  =MovEjecPptalFiltro\( FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;01;1\)**;** Fecha\(2017;12;31\)\)  |  $ 280.000
¿Cuánto es el valor de los movimientos de ejecución presupuestal se han realizado en la cuenta 413572 en el primer semestre del año 2017?.  |  =MovEjecPptalFiltro\( FiltroMovCont\_Cuenta\(413572\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;06;30\)**;** 1\)  |  $ 125.000

\*\[FILTROS: 46,49,6,47,95,28\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=SaldoEjecPptal \( \)

Descripción

Esta función calcula los saldos de las cuentas marcadas "es de presupuesto"
entre un periodo de tiempo determinado..

Sintaxis

|  =Presupuesto  |  \( ICuenta; FechaFin\*; IEmp\*; ICC\*; BLocal\*; \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoEjecPptal\( "130505,130510"**;** Fecha\(2015;12;31\)**;** 1**;**
1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. Documento  |  Fecha de creación  |  Saldo  |  Cód. Cuenta  |  Es cuenta de presupuesto  |  Cód. centro de costos imputado
---|---|---|---|---|---|---
Factura Venta  |  1  |  5/Ene/2017  |  $ 35.000  |  413568  |  ok  |
Factura Venta  |  1  |  15/Mar/2017  |  $ 125.000  |  413572  |  ok  |
Pago transporte  |  1  |  17/Jun/2017  |  $ 75.000  |  614505  |  |
Factura Venta  |  1  |  30/Ago/2017  |  $ 120.000  |  413572  |  ok  |  1010

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoEjecPptal \( ICuenta**;** FechaIni\* **;** FechaFin\* **;** IEmp**;**
ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el saldo de las cuentas presupuestales del año 2017?.  |  =SaldoEjecPptal\( **;** Fecha\(2017;12;31\)****\)  |  $ 280.000
¿Cuál es el saldo de las cuentas presupuestales al 15 de junio de 2017?.  |  =SaldoEjecPptal\( **;** Fecha\(2017;06;15\)**;** 1\)  |  $ 160.000

---

=SaldoEjecPptalFiltro \( \)

Descripción

Esta función calcula los saldos de las cuentas marcadas "es de presupuesto"
con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =Presupuesto  |  \( Filtro\*; FechaFin\*; IEmp\*; ICC\*; BLocal\*; \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("110505"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoEjecPptalFiltro\( "130505,130510"**;** Fecha\(2015;12;31\)**;**
1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. Documento  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Es cuenta de presupuesto  |  Cód. centro de costos imputado
---|---|---|---|---|---|---
2-Factura Venta  |  1  |  5/Ene/2017  |  $ 35.000  |  413568  |  ok  |
2-Factura Venta  |  1  |  15/Mar/2017  |  $ 125.000  |  413572  |  ok  |
16-Pago transporte  |  1  |  17/Jun/2017  |  $ 75.000  |  614505  |  |
2-Factura Venta  |  1  |  30/Ago/2017  |  $ 120.000  |  413572  |  ok  |  1010

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoEjecPptalFiltro \( Filtro\* **;** FechaIni\* **;** FechaFin\* **;**
IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el saldo de las ejecuciones presupuestales que se han realizado con el tipo de operación 2, 2-Factura de venta en el año 2017?.  |  =SaldoEjecPptalFiltro\( FiltroMovInv\_TipoSoporte\("2"\)**;** Fecha\(2017;01;1\)**;** Fecha\(2017;12;31\)\)  |  $ 280.000
¿Cuánto el saldo de las ejecuciones presupuestales que se han realizado con la cuenta 413572 en el primer semestre del año 2017?.  |  =SaldoEjecPptalFiltro\( FiltroMovCont\_Cuenta\(413572\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;06;30\)**;** 1\)  |  $ 125.000



\*\[FILTROS: 46,49,6,47,95,28\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=AtributoCuenta \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de una cuenta según
el código dado. Tenga en cuenta que los atributos son características dadas a
cada cuenta y se configuran desde el PUC de ContaPyme®.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoCuenta  |  \( ** NAtributo; ICuenta ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.

Para obtener el nombre del atributo, debe anteponer el símbolo "$"
Ej. **"$ICUENTA"** |  Valor Requerido
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una cuenta del plan de cuentas de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos atributos de unas cuentas del PUC de ContaPyme®.

Código cuenta  |  Nombre de la cuenta  |  Discrimina por tercero  |  Controla endeudamiento  |  Afectable directamente por el usuario  |  Id tipo de cuenta
---|---|---|---|---|---
110505  |  Caja general  |  |  |  True  |  1
210510  |  Pagarés  |  True  |  True  |  |  2
510548  |  Bonificaciones  |  True  |  |  True  |  5
612086  |  Fabricación de muebles  |  |  |  True  |  5

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoCuenta \( NAtributo**;** ICuenta \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el tipo de tercero en transacción de la cuenta 210510.  |  =AtributoCuenta \( "BEXIGETERCERO"**;** 210510 \)  |  2
Determinar si la cuenta 510548 está discriminando por tercero  |  =AtributoCuenta \( "BMANEJATERCERO"**;** 510548 \)  |  T
Determinar cuál es el tipo de la cuenta 612086.  |  =AtributoCuenta \( "ITDCUENTA"**;** 612086 \)  |  5
Determinar el nombre del tipo de la cuenta 612086.  |  =AtributoCuenta \( "$ITDCUENTA"**;** 612086 \)  |  Egresos
Determinar si la cuenta 210510 es afectable por el usuario.  |  =AtributoCuenta \( "BAFECTABLEUSR"**;** 210510 \)  |  F


True \(T\) = Verdadero, la cuenta cumple con el atributo dado.
False \(F\) = Falso, la cuenta no cumple con el atributo dado.

\*\[ATRIBUTOS:Cuentas\]\*

---

=ContarAsientosContablesFiltro \( \)

Descripción

Esta función calcula el número de asientos contables con un filtro
determinado.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Esta función calcula el número de asientos contables en un periodo de tiempo determinado.

Sintaxis

|  =ContarAsientosContablesFiltro  |  \(** Filtro\*; FechaIni\*; FechaFin\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Débito  |  Crédito  |  Cód. tercero
---|---|---|---|---|---|---|---
Préstamo  |  1  |  5/Ene/2017  |  $ 35.000  |  130505  |  $ 35.000  |  |  8005033
Préstamo  |  2  |  25/Ene/2017  |  $ 75.000  |  130505  |  $ 75.000  |  |  9865321
Abono  |  1  |  2/Feb/2017  |  $ 35.000  |  130505  |  |  $ 35.000  |  8005033
Préstamo  |  3  |  3/Feb/2017  |  $ 100.000  |  130510  |  $ 100.000  |  |  9985604
Abono  |  2  |  1/Mar/2017  |  $ 25.000  |  130505  |  |  $ 25.000  |  9865321
Abono  |  3  |  3/Mar/2017  |  $ 30.000  |  130510  |  |  $ 30.000  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=ContarAsientosContablesFiltro \( Filtro\* **;** FechaIni\* **;** FechaFin\*
**;** BLocal\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuántos asientos contables se han realizado en el año 2017 a la cuenta 130505.  |  =ContarAsientosContablesFiltro\( FiltroMovCont\_Cuenta\("130505"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\) \)  |  4
Determinar cuántos asientos contables se han realizado en el año 2017 con el tercero 8005033.  |  =ContarAsientosContablesFiltro\( FiltroMovCont\_Tercero\("8005033"\)**;** **;** **;** Fecha\(2017;2;28\)\)  |  2



\*\[FILTROS: 46,47,49,56,58\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=ContarCuentasFiltro \( \)

Descripción

Esta función es utilizada para contar las cuentas según un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =ContarCuentasFiltro  |  \(** ICuenta\*; Filtro\*; **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o varias cuentas por las que se desea filtrar  |  Calcula con todos los terceros del catálogo de terceros de ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroCuenta\_SoloManejaTercero\(\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.

Ejemplos

  * A continuación se visualizan algunos atributos de unas cuentas del PUC de ContaPyme®.

Código cuenta  |  Nombre de la cuenta  |  Maneja tercero  |  Controla endeudamiento  |  Maneja cuotas  |  Id tipo de cuenta
---|---|---|---|---|---
130505  |  Deudores nacionales  |  True  |  |  True  |  1
210510  |  Pagarés  |  True  |  True  |  True  |  2
510548  |  Bonificaciones  |  True  |  |  |  5
612086  |  Fabricación de muebles  |  |  |  True  |  5

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=ContarCuentasFiltro \( ICuenta\* **;** Filtro\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántas cuentas están manejando tercero?.  |  =ContarCuentasFiltro \( **;** FiltroCuenta\_SoloManejaTercero\(\) \)  |  3
Determinar ¿cuántas cuentas están manejando cuotas?.  |  =ContarCuentasFiltro \( **;** FiltroCuenta\_SoloManejaCuotas\(\) \)  |  3



\*\[FILTROS: 3,5,6,7,8,9,10,11,12,13,14,15,16,17,18\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=IdCuenta \( \)

Descripción

Dada la identificación alterna de una cuenta, la función muestra el código de
la cuenta del PUC de ContaPyme®.

Sintaxis

|  =IdCuenta  |  \( ** IdCuentaAlterna ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IdCuentaAlterna
\(Requerido\)  |  Alfanumérico  |  Identificación alterna de una cuenta, configurada desde el PUC de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunas cuentas del PUC de ContaPyme®.

Código Cuenta  |  Nombre de la Cuenta contabilización Local  |  Nombre de la Cuenta contabilización NIIF  |  Identificación alterna de la cuenta
---|---|---|---
11  |  Disponible  |  Efectivo y equivalentes al efectivo  |  Efec1
413595  |  Venta de otros productos  |  Venta de otros productos  |  4565

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=IdCuenta \( IdCuentaAlterna \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el código de la cuenta que tiene como identificador alterno Efec1  |  =IdCuenta \( "Efec1" \)  |  11
Determinar cuál es el código de la cuenta que tiene como identificador alterno 4565  |  =IdCuenta \( 4565 \)  |  413595

---

=IdCuentaAlterna \( \)

Descripción

Esta función es utilizada para conocer la identificación alterna de una
cuenta. Tenga en cuenta que la identificación alterna es configurable para
cada cuenta desde el PUC de ContaPyme®.

Sintaxis

|  =IdCuentaAlterna  |  \( ** ICuenta ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una cuenta del plan de cuentas de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunas cuentas del PUC de ContaPyme®.

Código Cuenta  |  Nombre de la Cuenta contabilización Local  |  Nombre de la Cuenta contabilización NIIF  |  Identificación alterna de la cuenta
---|---|---|---
11  |  Disponible  |  Efectivo y equivalentes al efectivo  |  Efec1
413595  |  Venta de otros productos  |  Venta de otros productos  |  4565

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=IdCuentaAlterna \( IdCuentaAlterna \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar la identificación alterna de la cuenta 11  |  =IdCuentaAlterna \( 11 \)  |  Efec1
Determinar la identificación alterna de la cuenta 413595  |  =IdCuentaAlterna \( 413595 \)  |  4565

---

=IdTipoCuenta \( \)

Descripción

Esta función es utilizada para conocer cuál es el Id del tipo de una cuenta
determinada.

Sintaxis

|  =IdTipoCuenta  |  \( ** ICuenta ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una cuenta del plan de cuentas de ContaPyme®.  |  Valor Requerido

Id tipos de cuenta

Id tipo de cuenta  |  Tipo de cuenta
---|---
1  |  Activo
2  |  Pasivo
3  |  Patrimonio
4  |  Ingresos
5  |  Egresos
6  |  De orden deudoras
7  |  De orden acreedoras

Ejemplos

=IdTipoCuenta \( ICuenta \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar a que tipo de cuenta está asociada la cuenta 860101  |  =IdTipoCuenta \( 860101 \)  |  6
Determinar a que tipo de cuenta está asociada la cuenta 413595  |  =IdTipoCuenta \( 413595 \)  |  4

---

=ManejaValorBase \( \)

Descripción

Dado el código de la cuenta, la función determina si la cuenta maneja valor
base. Tenga en cuenta que el valor base es el valor sobre el cual se
calcularán los impuestos.

Sintaxis

|  =ManejaValorBase  |  \( ** ICuenta ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una cuenta del plan de cuentas de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunas cuentas del PUC de ContaPyme®.

Código Cuenta  |  Nombre de la Cuenta  |  Maneja valor base
---|---|---
11  |  Disponible  |
135590  |  Autorretención especial a título de renta \(CREE\)  |  TRUE
413595  |  Venta de otros productos  |  TRUE
617065  |  Zonas francas  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=ManejaValorBase \( ICuenta \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar si la cuenta 11 maneja valor base.  |  =ManejaValorBase
\( 135590 \)  |  TRUE
Determinar si la cuenta 413595 maneja valor base.  |  =ManejaValorBase
\( 413595 \)  |  FALSE

---

=NaturalezaCuenta \( \)

Descripción

Esta función es utilizada para conocer la naturaleza de una cuenta, débito o
crédito, según el código dado.

Sintaxis

|  =NaturalezaCuenta  |  \( ** ICuenta ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una cuenta del plan de cuentas de ContaPyme®.  |  Valor Requerido

Naturaleza de las cuentas

Naturaleza  |  Valor mostrado
---|---
Débito  |  1
Crédito  |  -1

Ejemplos

  * A continuación se visualizan algunas cuentas del PUC de ContaPyme®.

Código Cuenta  |  Nombre de la Cuenta  |  Naturaleza
---|---|---
110505  |  Caja general  |  Débito
233505  |  Gastos financieros  |  Crédito
413595  |  Venta de otros productos  |  Crédito
839925  |  Cargos diferidos  |  Débito

=NaturalezaCuenta \( ICuenta \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar la naturaleza de la cuenta Caja general \(110505\).  |  =NaturalezaCuenta \( 110505 \)  |  1
Determinar la naturaleza de la cuenta 413595  |  =NaturalezaCuenta \( 413595 \)  |  -1

---

=NombreCuenta \( \)

Descripción

Esta función es utilizada para conocer el nombre de una cuenta según el código
dado.

Otras aplicaciones

Con esta función también podrá:

  * Determinar el nombre de una cuenta en contabilidad Local o NIIF, según el código dado.

Sintaxis

|  =NombreCuenta  |  \( ** ICuenta; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una cuenta del plan de cuentas de ContaPyme®.  |  Valor Requerido
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * A continuación se visualizan algunas cuentas del PUC de ContaPyme®.

Código Cuenta  |  Nombre Contabilización Local  |  Nombre Contabilización NIIF
---|---|---
11  |  Disponible  |  Efectivo y equivalentes al efectivo
413595  |  Venta de otros productos  |  Venta de otros productos
510506  |  Sueldos  |  Sueldos

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NombreCuenta \( ICuenta**;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el nombre de la cuenta 11 en contabilización NIIF  |  =NombreCuenta \( 11**;** "F" \)  |  Efectivo y equivalentes al efectivo
Determinar cuál es el nombre de la cuenta 413595 en contabilización Local  |  =NombreCuenta \( 413595 \)  |  Venta de otros productos

---

=NombreCuentaAlterna \( \)

Descripción

Dada la identificación alterna de una cuenta, la función muestra el nombre de
la cuenta del PUC de ContaPyme® en contabilización local o NIIF.

Sintaxis

|  =NombreCuentaAlterna  |  \( ** ICuenta; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IdCuentaAlterna
\(Requerido\)  |  Alfanumérico  |  Identificación alterna de una cuenta, configurada desde el PUC de ContaPyme®.  |  Valor Requerido
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * A continuación se visualizan algunas cuentas del PUC de ContaPyme®.

Código Cuenta  |  Nombre de la Cuenta contabilización Local  |  Nombre de la Cuenta contabilización NIIF  |  Nombre alterno de la cuenta
---|---|---|---
11  |  Disponible  |  Efectivo y equivalentes al efectivo  |  Efec1
413595  |  Venta de otros productos  |  Venta de otros productos  |  4565

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NombreCuentaAlterna \( IdCuentaAlterna \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el nombre de la cuenta en contabilización NIIF con el identificador alterno Efec1  |  =NombreCuentaAlterna
\( "Efec1"**;** "F" \)  |  Efectivo y equivalentes al efectivo
Determinar cuál es el nombre de la cuenta en contabilización Local con el identificador alterno 4565  |  =NombreCuentaAlterna
\( 4565 \)  |  Venta de otros productos

---

=NombreTipoCuenta \( \)

Descripción

Esta función es utilizada para conocer a que tipo de cuenta se encuentra
asociada una determinada cuenta, según el código dado.

Sintaxis

|  =NombreTipoCuenta  |  \( ** ICuenta ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una cuenta del plan de cuentas de ContaPyme®.  |  Valor Requerido

Tipos de cuenta

Id Tipo cuenta  |  Tipo cuenta
---|---
1  |  Activo
2  |  Pasivo
3  |  Patrimonio
4  |  Ingresos
5  |  Egresos
6  |  De orden deudoras
7  |  De orden acreedoras

Ejemplos

=NombreTipoCuenta \( ICuenta \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar a qué tipo de cuenta está asociada la cuenta 860101  |  =NombreTipoCuenta \( 860101 \)  |  De orden deudora
Determinar a qué tipo de cuenta está asociada la cuenta 413595  |  =NombreTipoCuenta \( 413595 \)  |  Ingresos

---

=MovContabilidadDCFiltro \( \)

Descripción

Esta función calcula los movimientos contables débitos y/o créditos de una o
varias cuentas con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

=MovContabilidadDCFiltro  |  \( ** Filtro\*; IDebCred\*; FechaIni\*; FechaFin\*; BLocal\* ** \)
---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("11050510"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
IDebCred\*
\(Opcional\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento débito o crédito.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos de la cuenta 110505 \(Caja general\) del PUC de ContaPyme®.

Tipo de operación  |  Fecha operación  |  Cód. cuenta  |  Débito  |  Crédito
---|---|---|---|---
2-Venta  |  5/Ene/2017  |  110505  |  $35.000  |
1-Compra mercancías  |  25/Mar/2017  |  110505  |  |  $75.000
2-Venta  |  2/Jun/2017  |  110505  |  $85.000  |
2-Venta  |  3/Jul/2017  |  110505  |  $100.000  |
3-Préstamo  |  15/Jul/2017  |  110505  |  |  $35.000
4-Abono préstamo  |  3/Nov/2017  |  110505  |  $30.000  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovContabilidadDCFiltro \( Filtro\* **;** IDebCred\* **;** FechaIni\* **;**
FechaFin\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántos fueron los movimientos débitos de la cuenta 110505 en el mes de julio?.  |  =MovCuenta\( FiltroMovCont\_Cuenta\("110505"\)**;** "D"**;** Fecha\(2017;7;1\)**;** Fecha\(2017;7;31\)\)  |  $ 100.000
Determinar ¿cuáles son los movimientos con el tipo de operación venta del año 2017?.  |  =MovCuenta\( FiltroMovCont\_TipoSoporte\("2"\)**;** "S"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)\)  |  $ 220.000



\*\[FILTROS: 46,47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovContabilidadFiltro \( \)

Descripción

Esta función calcula los movimientos contables de una o varias cuentas con un
filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el movimiento contable de una o varias cuentas entre un periodo de tiempo determinado.

Sintaxis

|  =MovContabilidadFiltro  |  \( ** Filtro\*; FechaIni\*; FechaFin\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("110505"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos de la cuenta 110505 \(Caja general\) del PUC de ContaPyme®.

Tipo de operación  |  Fecha operación  |  Cód. cuenta  |  Débito  |  Crédito
---|---|---|---|---
2-Venta  |  5/Ene/2017  |  110505  |  $35.000  |
1-Compra mercancías  |  25/Mar/2017  |  110505  |  |  $75.000
2-Venta  |  2/Jun/2017  |  110505  |  $85.000  |
2-Venta  |  3/Jul/2017  |  110505  |  $100.000  |
3-Préstamo  |  15/Jul/2017  |  110505  |  |  $35.000
4-Abono préstamo  |  3/Nov/2017  |  110505  |  $30.000  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovContabilidadFiltro \( Filtro\* **;** FechaIni\* **;** FechaFin\* **;**
BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántos fueron los débitos de los movimientos de la cuenta 110505 en el mes de julio?.  |  =MovContabilidadFiltro\( FiltroMovCont\_Cuenta\("110505"\)**;** Fecha\(2017;7;1\)**;** Fecha\(2017;7;31\)\)  |  $ 100.000
Determinar ¿cuáles son los movimientos con el tipo de operación factura de venta del año 2017?.  |  =MovContabilidadFiltro\( FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)\)  |  $ 220.000



\*\[FILTROS: 46,47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovCuenta \( \)

Descripción

Esta función calcula el movimiento contable de una cuenta entre un periodo de
tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el movimiento contable de una o varias cuentas que entre un periodo de tiempo que fueron imputadas a un centro de costos definido.

Sintaxis

|  =MovCuenta  |  \( ** ICuenta; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuenta\( "130505","130510"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos de la cuenta 110505 \(Caja general\) del PUC de ContaPyme®.

Tipo de operación  |  Fecha operación  |  Cód. cuenta  |  Débito  |  Crédito
---|---|---|---|---
Venta  |  5/Ene/2017  |  110505  |  $35.000  |
Compra mercancías  |  25/Mar/2017  |  110505  |  |  $75.000
Venta  |  2/Jun/2017  |  110505  |  $85.000  |
Venta  |  3/Jul/2017  |  110505  |  $100.000  |
Préstamo  |  15/Jul/2017  |  110505  |  |  $35.000
Abono préstamo  |  3/Nov/2017  |  110505  |  $30.000  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuenta \( ICuenta**;** FechaIni\* **;** FechaFin\* **;** IEmp**;**
ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuáles son los movimientos de la cuenta 110505 del mes de julio.  |  =MovCuenta\( 110505**;** Fecha\(2017;7;1\)**;** Fecha\(2017;7;31\)\)  |  $ 65.000
Cuáles son los movimientos de la cuenta 110505 desde el 1 de enero de 2017 al final del mes de Marzo de 2017  |  =MovCuenta\( 110505**;** Fecha\(2017;1;31\)**;** Fecha\(2017;3;31\)**;** 1 \)  |  $ - 40.000
Cuáles son los movimientos de la cuenta 110505 desde el 1 de enero hasta el 30 de junio de 2017  |  =MovCuenta\( 110505**;** Fecha\(2017;1;1\)**;** Fecha\(2017;6;30\)\)  |  $ 45.000

---

=MovCuentaDC \( \)

Descripción

Esta función calcula los movimiento débitos y/o créditos de una o varias
cuentas, entre un periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el saldo de una o varias cuentas entre un periodo de tiempo determinado.
  * Calcular los movimiento débitos, créditos o saldo de una o varias cuentas, entre un periodo de tiempo y un centro de costos determinado.

Sintaxis

|  =MovCuentaDC  |  \( ** ICuenta; IDebCred\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
IDebCred\*
\(Opcional\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea calcular los movimientos o saldo de las cuentas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el movimiento o saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaDC\( "130505","130510"**;** "S"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos de la cuenta 110505 \(Caja general\) del PUC de ContaPyme®.

Tipo de operación  |  Fecha operación  |  Cód. cuenta  |  Débito  |  Crédito
---|---|---|---|---
Venta  |  5/Ene/2017  |  110505  |  $35.000  |
Compra mercancías  |  25/Mar/2017  |  110505  |  |  $75.000
Venta  |  2/Jun/2017  |  110505  |  $85.000  |
Venta  |  3/Jul/2017  |  110505  |  $100.000  |
Préstamo  |  15/Jul/2017  |  110505  |  |  $35.000
Abono préstamo  |  3/Nov/2017  |  110505  |  $30.000  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaDC \( ICuenta\* **;** IDebCred\* **;** FechaIni\* **;** FechaFin\*
**;** IEmp\* **;** ICC\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuánto fueron los movimientos débitos de la cuenta 110505 en el mes de julio.  |  =MovCuenta\( 110505**;** "D"**;** Fecha\(2017;7;1\)**;** Fecha\(2017;7;31\)**;** 1\)  |  $ 100.000
Cuáles son los movimientos de la cuenta 110505 desde el 1 de enero hasta el 30 de junio de 2017.  |  =MovCuenta\( 110505**;** "S"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;6;30\)\)  |  $ 45.000
Cuáles son los movimientos de la cuenta 110505 al final del mes de Marzo de 2017.  |  =MovCuenta\( 110505**;** **; ;** Fecha\(2017;3;31\)**;** 1 \)  |  \- $ 40.000

---

=MovCuentaDCFiltro \( \)

Descripción

Esta función calcula los movimientos débitos o créditos de una o más cuentas
con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el saldo de los movimientos de una cuenta con un filtro determinado.

Sintaxis

|  =MovCuentaDCFiltro  |  \( ** ICuenta\*; IDebCred\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Resta todos los créditos a los débitos, de las transacciones realizadas con el tercero por el cual se filtra la función.
IDebCred\*
\(Requerido\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Tercero\("CódTer1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los ingresos por ventas, por los cuales se desea filtrar  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaDCFiltro\( "130505","130510"**;** "S"**;** Filtro\(\)**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** "1010","1020"**;**
"F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Débito  |  Crédito  |  Cód. tercero
---|---|---|---|---|---|---|---
1-Préstamo  |  1  |  5/Ene/2017  |  $ 35.000  |  130505  |  $ 35.000  |  |  8005033
1-Préstamo  |  2  |  25/Ene/2017  |  $ 75.000  |  130505  |  $ 75.000  |  |  9865321
2-Abono  |  1  |  2/Feb/2017  |  $ 35.000  |  130505  |  |  $ 35.000  |  8005033
1-Préstamo  |  3  |  3/Feb/2017  |  $ 100.000  |  130510  |  $ 100.000  |  |  9985604
2-Abono  |  2  |  1/Mar/2017  |  $ 25.000  |  130505  |  |  $ 25.000  |  9865321
2-Abono  |  3  |  3/Mar/2017  |  $ 30.000  |  130510  |  |  $ 30.000  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaDCFiltro \( ICuenta\* **;** IDebCred\* **;** Filtro\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp**;** ICC\* **;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuáles son los movimientos de las cuentas relacionadas al tercero 8005033 en el mes de enero de 2017?.  |  =MovCuentaDCFiltro\( **;** "S"**;** FiltroMovCont\_Tercero\("8005033"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)\)  |  $ 35.000
¿Cuáles son los movimientos con el tipo de operacion préstamo en el año 2017?.  |  =MovCuentaDCFiltro\( **;** "S"**;** FiltroMovCont\_TipoSoporte\("1"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)\)  |  $ 210.000



\*\[FILTROS: 46,47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovCuentaFiltro \( \)

Descripción

Esta función calcula el saldo de los movimientos de una o más cuentas con un
filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =MovCuentaFiltro  |  \( ** ICuenta\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Resta todos los créditos a los débitos, de las transacciones realizadas con el tercero por el cual se filtra la función.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Tercero\("CódTer1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los ingresos por ventas, por los cuales se desea filtrar  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaFiltro\( "130505","130510"**;** "S"**;** Filtro\(\)**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** "1010","1020"**;**
"F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. CxC  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Débito  |  Crédito  |  Cód. tercero
---|---|---|---|---|---|---|---
1-Préstamo  |  1  |  5/Ene/2017  |  $ 35.000  |  130505  |  $ 35.000  |  |  8005033
1-Préstamo  |  2  |  25/Ene/2017  |  $ 75.000  |  130505  |  $ 75.000  |  |  9865321
2-Abono  |  1  |  2/Feb/2017  |  $ 35.000  |  130505  |  |  $ 35.000  |  8005033
1-Préstamo  |  3  |  3/Feb/2017  |  $ 100.000  |  130510  |  $ 100.000  |  |  9985604
2-Abono  |  2  |  1/Mar/2017  |  $ 25.000  |  130505  |  |  $ 25.000  |  9865321
2-Abono  |  3  |  3/Mar/2017  |  $ 30.000  |  130510  |  |  $ 30.000  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaFiltro \( ICuenta\* **;** Filtro\* **;** FechaIni\* **;** FechaFin\*
**;** IEmp**;** ICC\* **;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuáles son los movimientos de las cuentas relacionadas al tercero 8005033 en el mes de enero de 2017?.  |  =MovCuentaFiltro\( **;** FiltroMovCont\_Tercero\("8005033"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)\)  |  $ 35.000
¿Cuáles son los movimientos con el tipo de operacion préstamo en el año 2017?.  |  =MovCuentaFiltro\( **;** FiltroMovCont\_TipoSoporte\("1"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)\)  |  $ 210.000



\*\[FILTROS: 46,47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovCuentaMonedaExtranjera \( \)

Descripción

Esta función calcula los movimientos contable realizados en moneda extrajera
entre un periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el movimiento contable realizados en moneda extrajera entre un periodo de tiempo y un centro de costos definido.

Sintaxis

|  =MovCuentaMonedaExtranjera  |  \( ** ICuenta\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaMonedaExtranjera\( "130505","130510"**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Documento \#  |  Fecha de creación  |  Cód. Cuenta  |  Moneda  |  Valor  |  Cód. centro de costos
---|---|---|---|---|---|---
Factura de Venta  |  FV-00001  |  5/Ene/2017  |  11100515  |  Dolar  |  120  |  1030
Factura de venta  |  FV-00002  |  25/Ene/2017  |  11100515  |  Dolar  |  300  |  1020
Factura de Venta  |  FV-00003  |  1/Feb/2017  |  11100520  |  Euro  |  1.200  |  1010
Factura de Venta  |  FV-00004  |  3/Feb/2017  |  11100515  |  Dolar  |  800  |  1010

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaMonedaExtranjera \( ICuenta**;** FechaIni\* **;** FechaFin\* **;**
IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuáles son los movimientos en moneda extranjera de la cuenta 11100515 en el año 2017?.  |  =MovCuentaMonedaExtranjera\( 11100515**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)\)  |  1.220
¿Cuáles son los movimientos en moneda extranjera de la cuenta 11100515 en el mes de enero de 2017?  |  =MovCuentaMonedaExtranjera\( 11100520**;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)**;** 1\)  |  420
¿Cuáles son los movimientos en moneda extranjera de la cuenta 11100520 generados al centro de costos 1010 en el año 2017?.  |  =MovCuentaMonedaExtranjera\( 11100520**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** 1010\)  |  1.200

---

=MovCuentaMonedaExtranjeraFiltro \( \)

Descripción

Esta función calcula los movimientos contable realizados en moneda extrajera
con un filtro determinado.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el movimiento contable realizados en moneda extrajera entre un periodo de tiempo, un centro de costos definido y un filtro determinado.

Sintaxis

|  =MovCuentaMonedaExtranjeraFiltro  |  \( ** ICuenta\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Calcula con todas las cuentas del PUC de ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("11050510"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaMonedaExtranjeraFiltro\( "130505","130510"**;**
Filtro\(\)**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;**
1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. tercero  |  Fecha de creación  |  Cód. Cuenta  |  Moneda  |  Valor  |  Cód. centro de costos
---|---|---|---|---|---|---
2-Factura de Venta  |  134589621  |  5/Ene/2017  |  11100515  |  Dolar  |  120  |  1030
2-Factura de venta  |  289215965  |  25/Ene/2017  |  11100515  |  Dolar  |  300  |  1020
2-Factura de Venta  |  5648215633  |  1/Feb/2017  |  11100520  |  Euro  |  1.200  |  1010
2-Factura de Venta  |  94385127  |  3/Feb/2017  |  11100515  |  Dolar  |  800  |  1010

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaMonedaExtranjeraFiltro \( ICuenta**;** Filtro**;** FechaIni\* **;**
FechaFin\* **;** IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuáles son los movimientos en moneda extranjera de la cuenta 11100515 con el tercero 94385127 en el año 2017?.  |  =MovCuentaMonedaExtranjeraFiltro\( 11100515**;** FiltroMovCont\_Tercero\("94385127"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)\)  |  800
¿Cuáles son los movimientos en moneda extranjera de la cuenta 11100520 y que están soportado en una factura de venta en el año 2017?.  |  =MovCuentaMonedaExtranjeraFiltro\( 11100520**;** FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** 1010\)  |  1.200



\*\[FILTROS: 47,49,7,8\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovCuentaTercero \( \)

Descripción

Esta función calcula los movimientos de una cuenta en un periodo de tiempo y
que se le han imputado a un tercero determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el movimiento débito o crédito de varias cuentas en un periodo y con un tercero determinado.
  * Calcular el saldo de varias cuentas y varios terceros en específico.

Sintaxis

|  =MovCuentaTercero  |  \( ** ICuenta\*; ITercero; IDebCred\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Resta todos los créditos a los débitos, de las transacciones realizadas con el tercero por el cual se filtra la función.
ITercero\*
\(Requerido\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Valor requerido.
IDebCred\*
\(Opcional\)  |  Alfanumérico  |  Determina si el cálculo arrojado es un saldo o un movimiento.

**"S"** =Calcula el saldo
**"D"** =Calcula los movimientos débito
**"C"** =Calcula los movimientos crédito
|  Por defecto toma el valor **"S"** , calculando un saldo.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los ingresos por ventas, por los cuales se desea filtrar  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaTercero\( "130505","130510"**;** "852164,256483"**;**
"S"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;**
"1010,1020"**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en sistema al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Referencia CxC  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Débito  |  Crédito  |  Cód. tercero
---|---|---|---|---|---|---|---
Préstamo  |  CE-00001  |  5/Ene/2017  |  $ 35.000  |  130505  |  $ 35.000  |  |  8005033
Préstamo  |  CE-00002  |  25/Ene/2017  |  $ 75.000  |  130505  |  $ 75.000  |  |  9865321
Abono  |  CE-00001  |  2/Feb/2017  |  $ 35.000  |  130505  |  |  $ 35.000  |  8005033
Factura a crédito  |  FV-00005  |  3/Feb/2017  |  $ 100.000  |  130510  |  $ 100.000  |  |  9985604
Abono  |  CE-00002  |  1/Mar/2017  |  $ 25.000  |  130505  |  |  $ 25.000  |  9865321
Abono  |  FV-00005  |  3/Mar/2017  |  $ 30.000  |  130510  |  |  $ 30.000  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaTercero \( ICuenta\* **;** ITercero\* **;** IDebCred\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp**;** ICC\* **;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuáles son los movimientos de las cuentas relacionadas al tercero 8005033 en el mes de enero de 2017?.  |  =MovCuentaTercero\( **;** 8005033**;** "S"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)\)  |  $ 35.000
¿Cuáles son los movimientos de las cuentas relacionadas al tercero 8005033 en el segundo semestre del año 2017?.  |  =MovCuentaTercero\( **;** 8005033**;** **;** Fecha\(2017;6;1\)**;** Fecha\(2017;12;31\)\)  |  $\[\[:alnum:\]\].0
¿Cuáles son los movimientos contables del cliente con código 9865321 al final del mes de Marzo de 2017?.  |  =MovCuentaTercero\( **;** 9865321**;** "S"**;** **;** Fecha\(2017;3;31\)\)  |  $ 50.000

---

=MovCuentaValor1 \( \)

Descripción

Esta función suma los valores de la columna valor 1 de todas las operaciones
de movimiento contable entre un periodo de tiempo determinado.

Tenga en cuenta que la columna valor 1 es configurada por el usuario desde el
catálogo de plan de cuentas de ContaPyme® y ésta puede ser exigida solo en la
operación "movimiento contable".

Para exigir el valor 1 en la operación, debe ingresar a las configuraciones de
la cuenta que dese hacer el movimiento, en información adicional, activar el
campo exige valor 1.


Otras aplicaciones

Con esta función también podrá:

  * Sumar los valores 1 del movimiento contable de una o varias cuentas entre un periodo de tiempo y un centro de costos definido.

Sintaxis

|  =MovCuentaValor1  |  \( ** ICuenta\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas de las cuales se desea sumar los valores 1.  |  Valor requerido.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaValor1\( "130505","130510"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Documento \#  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Valor 1  |  Cód. centro de costos
---|---|---|---|---|---|---
Factura Venta  |  FV-00001  |  5/Ene/2017  |  $ 35.000  |  110505  |  10  |  1020
Factura de compra  |  FC-00005  |  25/Ene/2017  |  $ 75.000  |  110505  |  -5  |
Factura Venta  |  FV-00002  |  2/Feb/2017  |  $ 35.000  |  110505  |  15  |  1020
Factura Venta  |  FV-00003  |  13/Feb/2017  |  $ 100.000  |  110510  |  3  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaValor1 \( ICuenta**;** FechaFin\* **;** IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es la suma de los valores 1 desde el 1 de enero hasta el 5 de febrero de 2017  |  =MovCuentaValor1\( **;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;5\)\)  |  20
Cuál es la suma de los valores 1 imputados a la cuenta 110510 desde el 1 de enero hasta el 20 de febrero de 2017  |  =MovCuentaValor1\( 110510**;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;20\)**;** 1\)  |  3
Cuál es la suma de los valores 1 imputados a la cuenta 110505 en el año 2017 para el centro de costo 1020  |  =MovCuentaValor1\( 110505**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** 1020\)  |  25

---

=MovCuentaValor1Filtro \( \)

Descripción

Esta función suma los valores de la columna valor 1 de todas las operaciones
de movimiento contable teniendo en cuenta un filtro determinado.

Tenga en cuenta que la columna valor 1, es configurada por el usuario desde el
catálogo del plan de cuentas en ContaPyme® y puede ser exigida solo en la
operación "movimiento contable".

Para exigir el valor 1 en la operación, debe ingresar a las configuraciones de
la cuenta que desea hacer el movimiento, en información adicional, activar el
campo exige valor 1.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Sumar los valores 1 del movimiento contable de una o varias cuentas entre un periodo de tiempo.

Sintaxis

|  =MovCuentaValor1Filtro  |  \( ** ICuenta\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Calcula con todas las cuentas del PUC de ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("11050510"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaValor1Filtro\( "130505","130510"**;** Filtro\(\);
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. tercero  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Valor 1  |  Cód. centro de costos
---|---|---|---|---|---|---
Factura de Venta  |  86452197  |  5/Ene/2017  |  $ 35.000  |  110505  |  10  |  1020
Factura de Compra  |  26971354  |  25/Ene/2017  |  $ 75.000  |  110505  |  -5  |
Factura de Venta  |  86452197  |  2/Feb/2017  |  $ 35.000  |  110505  |  15  |
Factura de Venta  |  46972354  |  13/Feb/2017  |  $ 100.000  |  110510  |  3  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaValor1Filtro \( ICuenta\* **;** Filtro\* **;** FechaFin\* **;**
IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es la suma de los valores 1 desde el 1 de enero hasta el 5 de febrero de 2017 con el tercero 86452197?.  |  =MovCuentaValor1Filtro\( **;** FiltroMovCont\_Tercero\("86452197"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;5\)\)  |  25
Determinar ¿cuál es la suma de los valores 1 imputados a la cuenta 110510 y que están soportados con tipo de operación factura de venta, desde el 1 de enero hasta el 20 de febrero de 2017?.  |  =MovCuentaValor1Filtro\( 110510**;** MovFiltroCont\_TipoSoporte\("2"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;20\)**;** 1\)  |  3



\*\[FILTROS: 47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovCuentaValor2 \( \)

Descripción

Esta función suma los valores de la columna valor 2 de todas las operaciones
de movimiento contable entre un periodo de tiempo determinado.

Tenga en cuenta que la columna valor 2 es configurada por el usuario desde el
catálogo de plan de cuentas de ContaPyme® y ésta puede ser exigida solo en la
operación "movimiento contable".

Para exigir el valor 2 en la operación, debe ingresar a las configuraciones de
la cuenta que dese hacer el movimiento, en información adicional, activar el
campo exige valor 2.


Otras aplicaciones

Con esta función también podrá:

  * Sumar los valores 2 del movimiento contable de una o varias cuentas entre un periodo de tiempo y un centro de costos definido.

Sintaxis

|  =MovCuentaValor2  |  \( ** ICuenta\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaValor2\( "130505","130510"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Documento \#  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  Valor 2  |  Cód. centro de costos
---|---|---|---|---|---|---
Factura Venta  |  FV-00001  |  5/Ene/2017  |  $ 35.000  |  110505  |  10  |  1020
Factura de compra  |  FC-00005  |  25/Ene/2017  |  $ 75.000  |  110505  |  -5  |
FacturaVenta  |  FV-00002  |  2/Feb/2017  |  $ 35.000  |  110505  |  15  |  1020
FacturaVenta  |  FV-00003  |  13/Feb/2017  |  $ 100.000  |  110510  |  3  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaValor2 \( ICuenta**;** FechaFin\* **;** IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es la suma de los valores 2 desde el 1 de enero hasta el 5 de febrero de 2017?.  |  =MovCuentaValor2\( **;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;5\)\)  |  20
¿Cuál es la suma de los valores 2 imputados a la cuenta 110510 desde el 1 de enero hasta el 20 de febrero de 2017?.  |  =MovCuentaValor2\( 110510**;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;20\)**;** 1\)  |  3
¿Cuál es la suma de los valores 1 imputados a la cuenta 110505 en el año 2017 para el centro de costo 1020?.  |  =MovCuentaValor2\( 110505**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** 1020\)  |  25

---

=MovCuentaValor2Filtro \( \)

Descripción

Esta función suma los valores de la columna valor 2 de todas las operaciones
de movimiento contable teniendo en cuenta un filtro determinado.

Tenga en cuenta que la columna valor 2, es configurada por el usuario desde el
catálogo del plan de cuentas en ContaPyme® y puede ser exigida solo en la
operación "movimiento contable".

Para exigir el valor 2 en la operación, debe ingresar a las configuraciones de
la cuenta que desea hacer el movimiento, en información adicional, activar el
campo exige valor 2.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Sumar los valores 2 del movimiento contable de una o varias cuentas entre un periodo de tiempo.

Sintaxis

|  =MovCuentaValor2Filtro  |  \( ** ICuenta\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Calcula con todas las cuentas del PUC de ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("11050510"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaValor2Filtro\( "130505","130510"**;** Filtro\(\);
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. tercero  |  Fecha de creación  |  Valor  |  Cód. Cuenta  |  valor 2  |  Cód. centro de costos
---|---|---|---|---|---|---
Factura de Venta  |  86452197  |  5/Ene/2017  |  $ 35.000  |  110505  |  10  |  1020
Factura de Compra  |  26971354  |  25/Ene/2017  |  $ 75.000  |  110505  |  -5  |
Factura de Venta  |  86452197  |  2/Feb/2017  |  $ 35.000  |  110505  |  15  |
Factura de Venta  |  46972354  |  13/Feb/2017  |  $ 100.000  |  110510  |  3  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaValor2Filtro \( ICuenta\* **;** Filtro\* **;** FechaFin\* **;**
IEmp\* **;** ICC\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es la suma de los valores 2 desde el 1 de enero hasta el 5 de febrero de 2017 con el tercero 86452197?.  |  =MovCuentaValor2Filtro\( **;** FiltroMovCont\_Tercero\("86452197"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;5\)\)  |  25
Determinar ¿cuál es la suma de los valores 2 imputados a la cuenta 110510 y que están soportados con tipo de operación factura de venta, desde el 1 de enero hasta el 20 de febrero de 2017?.  |  =MovCuentaValor2Filtro\( 110510**;** MovFiltroCont\_TipoSoporte\("2"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;2;20\)**;** 1\)  |  3



\*\[FILTROS: 47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=MovCuentaValorBase \( \)

Descripción

Esta función calcula los movimientos de las cuentas marcadas con la opción
exige valor base. Tenga en cuenta que el valor base es el valor sobre el cual
se calcularán los impuestos.

Para configurar la opción exige valor base, debe ingresar a las
configuraciones de la cuenta desde el catálogo de plan de cuentas de
ContaPyme®.

Sintaxis

|  =MovCuentaValorBase  |  \( ** ICuenta\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Calcula el valor de todas las cuentas marcadas con valor base.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Calcula el valor de todas las cuentas marcadas con valor base relacionadas a todos los terceros del catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Calcula el valor de todas las cuentas marcadas con valor base relacionadas a todos los centros de costos del explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =MovCuentaValorBase\( "24080116","236540"**;** "85456,98745"**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Documento \#  |  Fecha de creación  |  Valor operación  |  Valor base  |  Cód. Cuenta impuesto  |  Cód. tercero
---|---|---|---|---|---|---
Factura Venta  |  FV-00001  |  5/Ene/2017  |  $ 35.000  |  $ 29.412  |  24080219  |  8005033
Factura de compra  |  FC-00005  |  25/Ene/2017  |  $ 75.000  |  $ 75.000  |  236540  |  9865321
FacturaVenta  |  FV-00002  |  2/Feb/2017  |  $ 105.000  |  $ 88.235  |  24080219  |  8005033
FacturaVenta  |  FV-00003  |  3/Feb/2017  |  $ 100.000  |  $ 84.034  |  24080219  |  9985604

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=MovCuentaValorBase\( ICuenta\* **;** ITercero\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es el valor base de los movimientos contables en el mes de enero de la cuenta 24080219?.  |  =MovCuentaValorBase\( 24080219**;** **;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)****\)  |  $ 29.412
Determinar ¿cuál es el valor base de los movimientos contables relacionados al proveedor 9865321 en el mes febrero?.  |  =MovCuentaValorBase\( **;** 9865321**;** Fecha\(2017;2;1\)**;** Fecha\(2017;2;28\)\)  |  $ 75.000
Determinar ¿cuál es el valor base de todos movimientos contables registrados?.  |  =MovCuentaValorBase\( **;** ********\)  |  $ 276.681

---

=Presupuesto \( \)

Descripción

Esta función determina el presupuesto de las cuentas a una fecha en
específico. Este presupuesto se configurable por cuenta y es cargado desde el
catálogo de presupuestos de ContaPyme®.

Sintaxis

|  =Presupuesto  |  \( ICuenta; FechaFin\*; IEmp\*; ICC\*; \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el presupuesto de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =Presupuesto\( "130505","130510"**;** Fecha\(2015;12;31\)**;** 1**;**
1010 \)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó el presupuesto en ContaPyme® de la cuenta 413595 \(Venta otros productos\) para el año 2018, del respectivo registro surgió la siguiente tabla:

Cód. cuenta  |  Mes  |  Presupuesto
---|---|---
413595  |  Enero  |  $5.000.000
413595  |  Febrero  |  $8.000.000
413595  |  Mayo  |  $ 13.000.000
413595  |  Julio  |  $6.000.000
413595  |  Octubre  |  $5.000.000
413595  |  Diciembre  |  $ 12.000.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=Presupuesto \( ICuenta**;** FechaFin\* **;** IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el presupuesto de la cuenta 413595 para el 31 de enero de 2018?.  |  =Presupuesto\( 413595**;** Fecha\(2018;1;31\)\)  |  $5.000.000
¿Cuál es el presupuesto de la cuenta 413595 para el 30 de Abril de 2018?.  |  =Presupuesto\( 413595**;** Fecha\(2018;4;30\)**;** 1\)  |  $13.000.000
¿Cuál es el presupuesto de la cuenta 413595 para todo el año 2018?.  |  =Presupuesto\( 413595**;** Fecha\(2018;12;31\)**;** 1\)  |  $49.000.000

---

=PresupuestoFiltro \( \)

Descripción

Esta función determina el presupuesto de una cuenta aplicando un filtro
determinado. Tenga en cuenta que este presupuesto es cargado desde el catálogo
de presupuesto de ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =PresupuestoFiltro  |  \( ICuenta\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Realiza los cálculos con todas las cuentas presupuestadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("4"\)**

Ver algunos filtros.  |  No aplica ningun filtro en la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo por el cual se realiza la consulta, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =PresupuestoFiltro\( "130505,130510"**;** Filtro\(\)**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1010 \)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó el presupuesto de la cuenta 413595 \(Venta otros productos\) para el año 2018, del respectivo registro surgió la siguiente tabla:

Cód. cuenta  |  Mes  |  PresupuestoFiltro
---|---|---
413595  |  Enero  |  $5.000.000
413595  |  Febrero  |  $8.000.000
413595  |  Mayo  |  $ 13.000.000
413595  |  Julio  |  $6.000.000
413595  |  Octubre  |  $5.000.000
413595  |  Diciembre  |  $ 12.000.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=PresupuestoFiltro \( ICuenta\* **;** Filtro\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el Presupuesto de la cuenta 413595 para del mes de enero de 2018?.  |  =PresupuestoFiltro\( 413595**; ; ;** Fecha\(2018;1;31\)****\) |  $5.000.000
¿Cuál es el Presupuesto de la cuenta 413595 para el 30 de Abril de 2018?.  |  =PresupuestoFiltro\( 413595**; ; ;** Fecha\(2018;4;30\)**;** 1\)  |  $13.000.000
¿Cuál es el Presupuesto de la cuenta 413595 para todo el año 2018?.  |  =PresupuestoFiltro\( 413595**;** Fecha\(2018;12;31\)**;** 1\)  |  $49.000.000



\*\[FILTROS:\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=PresupuestoPeriodo \( \)

Descripción

Esta función determina el presupuesto de las cuentas en un periodo de tiempo
determinado. Este presupuesto se configurable por cada cuenta y es cargado
desde el catálogo de presupuestos de ContaPyme®.

Sintaxis

|  =PresupuestoPeriodo  |  \( ICuenta\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\*; \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
FechaIni\*
\(Opcional\)  |  Fecha  |  Determina el momento en que se desea traer el presupuesto de las cuentas indicadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2018;12;31\)** |  Establece la fecha de inicio de los tiempo \(1\)2/31/1899\)
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =PresupuestoPeriodo\( "130505,130510"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010 \)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó el Presupuesto en ContaPyme® de la cuenta 413595 \(Venta otros productos\) para el año 2018, del respectivo registro surgió la siguiente tabla:

Cód. cuenta  |  Mes  |  Presupuesto
---|---|---
413595  |  Enero  |  $5.000.000
413595  |  Febrero  |  $8.000.000
413595  |  Mayo  |  $13.000.000
413595  |  Julio  |  $6.000.000
413595  |  Octubre  |  $5.000.000
413595  |  Diciembre  |  $12.000.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=PresupuestoPeriodo \( ICuenta\* **;** FechaIni\* **;** FechaFin\* **;**
IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el Presupuesto de la cuenta 413595 entre el 31 de enero de 2018 y el 30 de junio de 2018.?  |  =PresupuestoPeriodo\( 413595**;** Fecha\(2018;1;31\)**;** Fecha\(2018;6;30\)\)  |  $ 26.000.000
¿Cuál es el Presupuesto de la cuenta 413595 para el segundo semestre del año 2018?.  |  =PresupuestoPeriodo\( 413595**;** Fecha\(2018;6;1\)**;** Fecha\(2018;12;31\)**;** 1\)  |  $ 23.000.000
¿Cuál es el Presupuesto de la cuenta 413595 para el año 2018?.  |  =PresupuestoPeriodo\( 413595**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1\)  |  $ 49.000.000

---

=SaldoContabilidadFiltro \( \)

Descripción

Esta función determina el saldo de las operaciones contables con un filtro
determinado. Tenga en cuenta que el saldo de una operación se calcula restando
los créditos de los débitos.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =SaldoContabilidadFiltro  |  \( ** Filtro\*; FechaFin\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("13"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina la fecha en que se desea consultar el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos de la cuenta 110505 \(Caja general\) del PUC de ContaPyme®.

Tipo de operación  |  Fecha operación  |  Cód. cuenta  |  Cód. tercero  |  Débito  |  Crédito
---|---|---|---|---|---
2-Venta  |  5/Ene/2017  |  110505  |  46268632  |  $35.000  |
1-Compra mercancías  |  25/Mar/2017  |  110505  |  54454151  |  |  $75.000
2-Venta  |  2/Jun/2017  |  110505  |  46268632  |  $85.000  |
2-Venta  |  3/Jul/2017  |  110505  |  65987525  |  $100.000  |
6-Préstamo  |  15/Jul/2017  |  110505  |  65987525  |  |  $35.000
5-Abono préstamo  |  3/Nov/2017  |  110505  |  98525470  |  $30.000  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoContabilidadFiltro \( Filtro\* **;** FechaFin\* **;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el saldo de la cuenta 110505 al final del mes de junio que en la operación esté involucrado el tercero 46268632?.  |  =SaldoContabilidadFiltro\( FiltroMovCont\_Tercero\("46268632"\)**;** Fecha\(2017;6;31\)\)  |  $ 120.000
¿Cuál es el saldo de la cuenta 110505 que fueron realizados con la operación 2, ventas, al final del año 2017?.  |  =SaldoContabilidadFiltro\( FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;12;31\) \)  |  $ 220.000



\*\[FILTROS: 46,47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=SaldoCuenta \( \)

Descripción

Esta función determina el saldo de una o más cuentas a una fecha en
específico. Tenga en cuenta que el saldo contable se calcula restando los
créditos de los débitos.

Sintaxis

|  =SaldoCuenta  |  \( ** ICuenta; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina la fecha en que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función _fecha_ para este argumento, así se evitan
confusiones con el formato de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Numérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos en el que se calculará el saldo.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuenta\( "130505","130510"**;** Fecha\(2017;12;31\)**;** 1**;**
1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos de las cuentas 110505 y 513515 del PUC de ContaPyme®.

Fecha operación  |  Cód. cuenta  |  Cód. CC  |  Débito  |  Crédito
---|---|---|---|---
5/Ene/2017  |  513515  |  14001  |  $35.000  |
25/Mar/2017  |  110505  |  |  |  $75.000
2/Jun/2017  |  513515  |  12005  |  $85.000  |
3/Jul/2017  |  110505  |  |  $150.000  |
15/Jul/2017  |  110505  |  |  |  $35.000
3/Nov/2017  |  110505  |  |  $30.000  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuenta \( ICuenta**;** FechaFin\* **;** IEmp\* **;** ICC\* **;**
BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el saldo de la cuenta 110505 al final del mes de julio?.  |  =SaldoCuenta\( 110505**;** Fecha\(2017;7;31\)**;** 1 \)  |  $ 40.000
¿Cuál es el saldo de la cuenta 513515, para el centro de costos 14001 al final del año 2017?.  |  =SaldoCuenta\( 513515**;** Fecha\(2017;12;31\)**;** **;** 14001**;** "F" \)  |  $ 35.000

---

=SaldoCuentaFiltro \( \)

Descripción

Esta función determina el saldo de una o más cuentas con un filtro
determinado. Tenga en cuenta que el saldo contable se calcula restandole los
créditos a los débitos.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =SaldoCuentaFiltro  |  \( ** ICuenta; Filtro\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Tercero\("1030623059"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina la fecha en que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos en el que se calculará el saldo.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuentaFiltro\( "130505","130510"**;** Filtro\(\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos de la cuenta 110505 \(Caja general\) del PUC de ContaPyme®.

Tipo de operación  |  Fecha operación  |  Cód. cuenta  |  Cód. tercero  |  Débito  |  Crédito
---|---|---|---|---|---
2-Venta  |  5/Ene/2017  |  110505  |  46268632  |  $35.000  |
1-Compra mercancías  |  25/Mar/2017  |  110505  |  54454151  |  |  $75.000
2-Venta  |  2/Jun/2017  |  110505  |  46268632  |  $85.000  |
2-Venta  |  3/Jul/2017  |  110505  |  65987525  |  $100.000  |
6- Préstamo  |  15/Jul/2017  |  110505  |  65987525  |  |  $35.000
5-Abono préstamo  |  3/Nov/2017  |  110505  |  98525470  |  $30.000  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuentaFiltro \( ICuenta**;** Filtro\* **;** FechaFin\* **;** IEmp\*
**;** ICC\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el saldo de la cuenta 110505 al final del mes de julio para el tercero 46268632?.  |  =SaldoCuentaFiltro\( 110505**;** FiltroMovCont\_Tercero\("46268632"\)**;** Fecha\(2017;7;31\)\)  |  $ 120.000
¿Cuál es el saldo de la cuenta 110505 que fueron realizados con la operación 2-ventas, al final del año 2017?.  |  =SaldoCuentaFiltro\( 110505**;** FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;12;31\)**;** 1 \)  |  $ 220.000



\*\[FILTROS: 47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=SaldoCuentaMonedaExtranjera \( \)

Descripción

Esta función determina el saldo en moneda extranjera de una cuenta o más
cuentas a una fecha determinada. Tenga en cuenta que el saldo contable se
calcula restando los créditos de los débitos.

La cuenta para la cual se realiza la consulta debe estar configurada para el
manejo de moneda extranjera.

Sintaxis

|  =SaldoCuentaMonedaExtranjera  |  \( ** ICuenta; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina la fecha en que se desea consultar el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el explorador gráfico de empresas de ContaPyme® por el cual se desea filtrar.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuentaMonedaExtranjera\( "130505","130510"**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. Documento  |  Fecha de creación  |  Cód. Cuenta  |  Moneda  |  Valor Moneda Extranjera  |  Cód. centro de costos
---|---|---|---|---|---|---
2-Factura venta  |  1  |  5/Ene/2017  |  11100515  |  Dolar  |  120  |
2-Factura venta  |  2  |  25/Ene/2017  |  11100515  |  Dolar  |  300  |  1020
2-Factura venta  |  3  |  1/Feb/2017  |  11100520  |  Euro  |  1.200  |  1010
2-Factura venta  |  4  |  3/Feb/2017  |  11100515  |  Dolar  |  800  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuentaMonedaExtranjera \( ICuenta**;** FechaFin\* **;** IEmp\* **;**
ICC\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el saldo en moneda extranjera de la cuenta 11100515 a 31 de marzo de 2017.?  |  =SaldoCuentaMonedaExtranjera\( 11100515**;** Fecha\(2017;3;31\)\)  |  1.220
¿Cuál es el saldo de los movimientos en moneda extranjera de la cuenta 11100520 a final del mes de enero de 2017?.  |  =SaldoCuentaMonedaExtranjera\( 11100520**;** Fecha\(2017;1;31\)****\)  |  0
¿Cuál es el saldo en moneda extranjera de la cuenta 11100520 imputados al centro de costos 1010 a febrero de 2017?.  |  =SaldoCuentaMonedaExtranjera\( 11100520**;** Fecha\(2017;2;28\)**;** 1**;** 1010\)  |  1.200

---

=SaldoCuentaMonedaExtranjeraFiltro \( \)

Descripción

Esta función determina el saldo en moneda extranjera de una cuenta o más
cuentas a una fecha y con un filtro determinado. Tenga en cuenta que el saldo
contable se calcula restando los créditos de los débitos.

La cuenta para la cual se realiza la consulta debe estar configurada para el
manejo de moneda extranjera.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =SaldoCuentaMonedaExtranjeraFiltro  |  \( ** ICuenta; Filtro\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("13"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina la fecha en que se desea consultar el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos del cual se calculará el saldo  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuentaMonedaExtranjeraFiltro\( "130505","130510"**;**
Filtro\(\)**;** Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Cód. tercero  |  Fecha de creación  |  Cód. Cuenta  |  Moneda  |  Valor  |  Cód. centro de costos
---|---|---|---|---|---|---
2-Factura de Venta  |  2536232  |  5/Ene/2017  |  11100515  |  Dolar  |  120  |
2-Factura de venta  |  26626523  |  25/Ene/2017  |  11100515  |  Dolar  |  300  |  1020
2-Factura de Venta  |  38626560  |  1/Feb/2017  |  11100520  |  Euro  |  1.200  |  1010
2-Factura de Venta  |  4000055  |  3/Feb/2017  |  11100515  |  Dolar  |  800  |

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuentaMonedaExtranjeraFiltro \( ICuenta**;** Filtro\* **;** FechaFin\*
**;** IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el saldo en moneda extranjera de la cuenta 11100515 a el 31 de marzo de 2017 que en la operación esté involucrado el tercero 4000055.?  |  =SaldoCuentaMonedaExtranjeraFiltro\( 11100515**;** FiltroMovCont\_Tercero\("4000055"\)**;** Fecha\(2017;3;31\)\)  |  800
¿Cuál es el saldo de los movimientos en moneda extranjera de la cuenta 11100515, que fueron realizados con el tipo de operación "2", al final del mes de enero de 2017?  |  =SaldoCuentaMonedaExtranjeraFiltro\( 11100520**;** FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;1;31\)**;** 1\)  |  420



\*\[FILTROS: 47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=SaldoCuentaValor1 \( \)

Descripción

Esta función suma los valores de la columna valor 1 en todas las operaciones
de movimiento contable a una fecha determinada.

Tenga en cuenta que la columna se encuentra en la operación de movimiento
contable, para habitarla debe ingresar a las configuraciones de la cuenta en
el plan de cuentas y en información adicional activar el campo exige valor 1.

Sintaxis

|  =SaldoCuentaValor1  |  \( ** ICuenta; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el que se calculará el saldo.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuentaValor1\( "130505","130510"**;** Fecha\(2015;12;31\)**;**
1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Fecha de operación  |  Cód. cuenta  |  Valor  |  Valor 1
---|---|---|---
25/Ene/2017  |  110505  |  $35.000  |  15
12/Feb/2017  |  110505  |  $75.000  |  -28
3/Mar/2017  |  110505  |  $123.000  |  -45
8/Abr/2017  |  110510  |  $100.000  |  50

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuentaValor1 \( ICuenta**;** FechaFin\* **;** IEmp\* **;** ICC\* **;**
BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es la suma de los datos registrados en "Valor 1" al 28 de febrero de 2017.?  |  =SaldoCuentaValor1\( **;** Fecha\(2017;2;28\)\)  |  -13
¿Cuál es la suma de los datos registrados en "Valor 1" imputados a la cuenta 110510 al 30 de junio de 2017?.  |  =SaldoCuentaValor1\( 110510**;** Fecha\(2017;6;30\)**;** 1\)  |  50

---

=SaldoCuentaValor1Filtro \( \)

Descripción

Esta función suma los valores de la columna valor 1 en todas las operaciones
de movimiento contable con un filtro determinado.

Tenga en cuenta que la columna se encuentra en la operación de movimiento
contable, para habitarla debe ingresar a las configuraciones de la cuenta en
el plan de cuentas y en información adicional activar el campo exige valor 1.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =SaldoCuentaValor1Filtro  |  \( ** ICuenta\*; Filtro\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("13"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos para el cual se calculará el saldo.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuentaValor1Filtro\( "130505,130510"**;** Filtro\(\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Fecha de creación  |  Cód. Cuenta  |  Cód. tercero  |  Valor  |  valor 1
---|---|---|---|---|---
2-Factura Venta  |  25/Ene/2017  |  110505  |  2458615  |  $35.000  |  15
1-Factura compra  |  12/Feb/2017  |  110505  |  26987462  |  $75.000  |  -22
2-Factura venta  |  3/Mar/2017  |  110505  |  2458615  |  $123.000  |  -45
2-Factura venta  |  8/Abr/2017  |  110510  |  459784563  |  $100.000  |  60
2-Factura venta  |  15/Jun/2017  |  110505  |  35624895  |  $20.000  |  50

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuentaValor1Filtro \( ICuenta**;** Filtro\* **;** FechaFin\* **;**
IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es la suma de los datos registrados en "valor 1" al 15 de marzo de 2017, que en la operación esté involucrado el tercero 2458615?.  |  =SaldoCuentaValor1Filtro\( **;** FiltroMovCont\_Tercero\("2458615"\)**;** Fecha\(2017;3;15\)\)  |  -30
¿Cuál es la suma de los datos registrados en "valor 1" imputados a la cuenta 110505 que fuerón realizado con la operación "2", a 30 de junio de 2017?.  |  =SaldoCuentaValor1Filtro\( 110505**;** FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;6;30\)**;** 1\)  |  20



\*\[FILTROS: 47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=SaldoCuentaValor2 \( \)

Descripción

Esta función suma los valores de la columna valor 2 en todas las operaciones
de movimiento contable a una fecha determinada.

Tenga en cuenta que la columna se encuentra en la operación de movimiento
contable, para habitarla debe ingresar a las configuraciones de la cuenta en
el plan de cuentas y en información adicional activar el campo exige valor 2.

Sintaxis

|  =SaldoCuentaValor2  |  \( ** ICuenta; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos creado en el que se calculará el saldo.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuentaValor2\( "130505","130510"**;** Fecha\(2015;12;31\)**;**
1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Fecha de operación  |  Cód. cuenta  |  Valor  |  Valor 2
---|---|---|---
25/Ene/2017  |  110505  |  $35.000  |  15
12/Feb/2017  |  110505  |  $75.000  |  -28
3/Mar/2017  |  110505  |  $123.000  |  -45
8/Abr/2017  |  110510  |  $100.000  |  50

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuentaValor2 \( ICuenta**;** FechaFin\* **;** IEmp\* **;** ICC\* **;**
BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es la suma de los datos registrados en "Valor 2" al 28 de febrero de 2017.?  |  =SaldoCuentaValor2\( **;** Fecha\(2017;2;28\)\)  |  -13
¿Cuál es la suma de los datos registrados en "Valor 2" imputados a la cuenta 110510 al 30 de junio de 2017?.  |  =SaldoCuentaValor2\( 110510**;** Fecha\(2017;6;30\)**;** 1\)  |  50

---

=SaldoCuentaValor2Filtro \( \)

Descripción

Esta función suma los valores de la columna valor 2 en todas las operaciones
de movimiento contable con un filtro determinado.

Tenga en cuenta que la columna se encuentra en la operación de movimiento
contable, para habitarla debe ingresar a las configuraciones de la cuenta en
el plan de cuentas y en información adicional activar el campo exige valor 2.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =SaldoCuentaValor2Filtro  |  \( ** ICuenta\*; Filtro\*; FechaFin\*; IEmp\*; ICC\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ICuenta
\(Requerido\)  |  Alfanumérico  |  Código de una o más cuentas del plan de cuentas de ContaPyme® por las cuales se desea filtrar.  |  Valor requerido.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovCont\_Cuenta\("13"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaFin\*
\(Opcional\)  |  Fecha  |  Determina el momento que se desea traer el saldo de la cuenta según los parámetros indicados.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en el orden de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa en la que se calculará el saldo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código de una sede o centro de costos para el cual se calculará el saldo.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.  |  BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =SaldoCuentaValor2Filtro\( "130505,130510"**;** Filtro\(\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1010**;** "F"\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes operaciones en ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Tipo de operación  |  Fecha de creación  |  Cód. Cuenta  |  Cód. tercero  |  Valor  |  valor 2
---|---|---|---|---|---
2-Factura Venta  |  25/Ene/2017  |  110505  |  2458615  |  $35.000  |  15
1-Factura compra  |  12/Feb/2017  |  110505  |  26987462  |  $75.000  |  -22
2-Factura venta  |  3/Mar/2017  |  110505  |  2458615  |  $123.000  |  -45
2-Factura venta  |  8/Abr/2017  |  110510  |  459784563  |  $100.000  |  60
2-Factura venta  |  15/Jun/2017  |  110505  |  35624895  |  $20.000  |  50

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SaldoCuentaValor2Filtro \( ICuenta**;** Filtro\* **;** FechaFin\* **;**
IEmp**;** ICC**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es la suma de los datos registrados en "valor 2" al 15 de marzo de 2017, que en la operación esté involucrado el tercero 2458615?.  |  =SaldoCuentaValor2Filtro\( **;** FiltroMovCont\_Tercero\("2458615"\)**;** Fecha\(2017;3;15\)\)  |  -30
¿Cuál es la suma de los datos registrados en "valor 2" imputados a la cuenta 110505 que fuerón realizado con la operación "2", a 30 de junio de 2017?.  |  =SaldoCuentaValor2Filtro\( 110505**;** FiltroMovCont\_TipoSoporte\("2"\)**;** Fecha\(2017;6;30\)**;** 1\)  |  20



\*\[FILTROS: 47,48,49,50,51\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=TasaCambio \( \)

Descripción

Esta función es utilizada para mostrar la tasa de cambio de una moneda en
específico. Tenga en cuenta que la tasa de cambio es registrada desde la
operación "Registro de tasas de cambio".

Sintaxis

|  =TasaCambio  |  \(** IMoneda; Fecha\*; BTasaCompra\*; IEmp\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  IMoneda si vacío
---|---|---|---
IMoneda
\(Requerido\)  |  Alfanumérico  |  Código de la moneda que se requiere.  |  Valor requerido.
Fecha\*
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea consultar el atributo determinado.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
BTasaCompra\*
\(Opcional\)  |  Alfanumérico  |  Determina el valor de la tasa de cambio para la compra o venta de la moneda.

**"T"** =Compra
**"F"** =Venta  |  Por defecto toma el valor **"F"** , mostrando la tasa de cambio para la venta de la moneda.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.

Ejemplos

El 10 de febrero de 2018 en la empresa 1, se realizó la operación de "Registro
de tasas de cambio" de la cual surgió la siguiente tabla:

Código moneda  |  MonedaTasa de cambio a pesos venta  |  Tasa de cambio a pesos compra  |  Tasa de cambio a pesos venta
---|---|---|---
10  |  Dolar  |  $2.785  |  $3.000
20  |  Euro  |  $3.476  |  $3.000

=TasaCambio \( IMoneda**;** Fecha\* **;** BTasaCompra\* **;** IEmp\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es la tasa de cambio del dolar en la venta a la fecha 15 de febrero de 2018?.  |  =TasaCambio \( "10"**;** Fecha\(2018;02;15\)**;** "T"**;** 1\)  |  $3.000
Determinar ¿cuál es la tasa de cambio del dolar en la venta a la fecha 5 de febrero de 2018?.  |  =TasaCambio \( "10"**;** Fecha\(2018;02;05\)**;** "T"\)  |  $ 0.0
Determinar ¿cuál es la tasa de cambio para la compra del euro?.  |  =TasaCambio \( "20" \)  |  $3.476

---

=MontoEscrito \( \)

Descripción

Esta función es utilizada para mostrar el texto de un número escrito.

Otras aplicaciones

Con esta función también podrá:

  * Añadir al texto del monto escrito la moneda que desee.

Sintaxis

|  =MontoEscrito  |  \(** Valor; NMoneda\*; NCentavos\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Valor
\(Requerido\)  |  Entero  |  Monto del cual se quiere conocer en texto.  |  Valor requerido
NMoneda\*
\(Opcional\)  |  Alfanumérico  |  Nombre de la moneda que se requiere.  |  Por defecto toma el valor **pesos** , mostrando al final del texto del valor determinado por el usuario.
NCentavos\*
\(Opcional\)  |  Alfanumérico  |  |  No toma ningún valor.

Ejemplos

=MontoEscrito \( Valor**;** NMoneda\* **;** NCentavos\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cómo es el texto del monto $ 250.500  |  =MontoEscrito \( 250500 \)  |  doscientos cincuenta mil quinientos pesos
Determinar el texto del monto 325.682 en dolares  |  =MontoEscrito \( 325682**;** Dolares \)  |  trescientos veinticinco mil seiscientos ochenta y dos Dolares

---

=Descuento3Contratos \( \)

Descripción

Esta función calcula el total de los descuentos pagados por ReteFuente de los
contratos realizados en un periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el total de los descuentos pagados por ReteFuente de un contrato en específico.
  * Calcular el total de los descuentos pagados por ReteFuente de un tercero en específico.

Sintaxis

|  =Descuento3Contratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Requerido\)  |  Alfanumérico  |  Código del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de un o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información del descuento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =Descuento3Contratos\( "1","2"**;** "CCO-1706001"**;**
"852164","256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron los siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Descuento salud  |  Descuento pensión  |  Descuento ReteFuente  |  Otro descuento  |  Total pagado
---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramirez  |  1  |  $4.000  |  |  $2.000  |  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  $1.000  |  $600  |  |  $300  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  $3.000  |  $2.000  |  |  $800  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  |  |  $2.300  |  $1.500  |  $45.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=Descuento3Contratos \( ITDContrato\* **;** IContrato\* **;** ITercero\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el total de los descuentos pagados por ReteFuente de los contratos realizados en el mes de enero?.  |  =Descuento3Contratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $4.300
¿Cuánto fue el total de los descuentos pagados por ReteFuente del contrato CCO-1801006?.  |  =Descuento3Contratos\( **;** "CCO-1801006"\)  |  $2.300
¿Cuánto fue el total por de los descuentos pagados por ReteFuente del tercero 9852864 y con el tipo de contrato 3?.  |  =Descuento3Contratos\( "3"**;** **;** "9852864" \)  |  $0.0
¿Cuánto fue el total de los descuentos pagados por ReteFuente con el tipo de contrato 1?.  |  =Descuento3Contratos\( "1" \)  |  $4.300
¿Cuánto fue el total de los descuentos pagados por ReteFuente con el tipo de contrato 2?.  |  =Descuento3Contratos\( "2" \)  |  $0.0

---

=Descuento4Contratos \( \)

Descripción

Esta función calcula el total pagado por otros descuentos de los contratos
realizados en un periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el total por otros descuentos de un contrato en específico.
  * Calcular el total por otros descuentos de un tercero en específico.

Sintaxis

|  =Descuento4Contratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Requerido\)  |  Alfanumérico  |  Código del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de un o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información del descuento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =Descuento4Contratos\( "1","2"**;** "CCO-1706001"**;**
"852164","256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes contratos en ContaPyme® en el mes de enero del año 2018, del respectivo registro surgió la siguiente tabla:

Cód Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Descuento salud  |  Descuento pensión  |  Descuento ReteFuente  |  Otro descuento  |  Total pagado
---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramirez  |  1  |  $4.000  |  |  $2.000  |  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  $1.000  |  $600  |  |  $400  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  $3.000  |  $2.000  |  |  $800  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  |  |  $2.300  |  $1.500  |  $45.000

  * Con los datos registrados se utilizó la fórmula de las siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=Descuento4Contratos \( ITDContrato\* **;** IContrato\* **;** ITercero\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el total pagado por otros descuentos de los contratos realizados en el mes de enero?.  |  =Descuento4Contratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $2.700
¿Cuánto fue el total pagado por otros descuentos del contrato CCO-1801006?.  |  =Descuento4Contratos\( **;** "CCO-1801006"\)  |  $1.500
¿Cuánto fue el total por pagado por otros descuentos del tercero 9852864 y con el tipo de contrato 3?.  |  =Descuento4Contratos\( "3"**;** **;** "9852864" \)  |  $ 300
¿Cuánto fue el total pagado por otros descuentos con el tipo de contrato 1?.  |  =Descuento4Contratos\( "1" \)  |  $1.500
¿Cuánto fue el total pagado por otros descuentos con el tipo de contrato 2?.  |  =Descuento4Contratos\( "2" \)  |  $ 800

---

=TotalAPagarContratos \( \)

Descripción

Esta función calcula el total a pagar por los contratos realizados en un
periodo de tiempo determinad.

Tenga en cuenta que el total a pagar es el valor que se paga por los
contratos, descontando los descuentos.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el total pagado de un contrato en específico.
  * Calcular el total pagado por contratos a un tercero en específico.

Sintaxis

|  =TotalAPagarContratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Opcional\)  |  Alfanumérico  |  Código o número del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros del catálogo de terceros de ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =TotalAPagarContratos\( "1","2"**;** "CCO-1801003"**;**
"852164","256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron las siguientes contratos en ContaPyme® en el mes de enero del año 2018, del respectivo registro surgió la siguiente tabla:

Fecha contrato  |  Tipo contrato  |  Cód Contrato  |  Cód. trabajador  |  Cant. Labor pagada  |  Cant. mano de obra pagada  |  Descuento 1  |  Descuento 2  |  Costo total  |  Total pagado
---|---|---|---|---|---|---|---|---|---
5/Ene/2018  |  1  |  CCO-1801001  |  45893114  |  30  |  |  $5.700  |  |  $85.700  |  $80.000
12/Ene/2018  |  3  |  CCO-1801003  |  9852864  |  |  1 Jor  |  |  $12.000  |  $36.000  |  $24.000
21/Ene/2018  |  2  |  CCO-1801005  |  56851896  |  |  8 Hora  |  |  $35.000  |  $205.000  |  $170.000
28/Ene/2018  |  1  |  CCO-1801006  |  5468215  |  20  |  |  $15.000  |  |  $95.000  |  $80.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=TotalAPagarContratos \( ITDContrato\* **;** IContrato\* **;** ITercero\*
**;** FechaIni\* **;** FechaFin\* **;** IEmp\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el total pagado por los contratos realizados en el mes de enero?.  |  =TotalAPagarContratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $ 354.000
¿Cuánto se debe pagar por el contrato CCO-1801001?.  |  =TotalAPagarContratos\( **;** "CCO-1801001"\)  |  $ 80.000
¿Cuánto es el total a pagar por la cantidad de obra laborada del tercero 9852864 y con el tipo de contrato 3?.  |  =TotalAPagarContratos\( "3"**;** **;** "9852864" \)  |  $ 24.000
¿Cuánto es el total a pagar de la cantidad laborada con el tipo de contrato 1?.  |  =TotalAPagarContratos\( "1"**** \)  |  $ 160.000

---

=CantidadDeObraPagadaContratos \( \)

Descripción

Esta función calcula la cantidad de obra o labor pagada en un periodo de
tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular la cantidad de obra o labor pagada en un contrato en específico.
  * Calcular la cantidad de obra o labor pagada a un tercero en específico.

Sintaxis

|  =CantidadDeObraPagadaContratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Opcional\)  |  Alfanumérico  |  Código o número del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadDeObraPagadaContratos\( "1","2"**;** "CCO-1801003"**;**
"852164","256483"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron los siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Cant. labor pagada  |  Cant. mano de obra pagada  |  Costo total cantidad labor  |  Costo total mano de obra  |  Costo total  |  Total pagado
---|---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramírez  |  1  |  30  |  |  $69.000  |  |  $69.000  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  |  1 Jor  |  |  $25.000  |  $25.000  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  |  8 Hora  |  |  $35.000  |  $35.000  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  20  |  |  $45.000  |  |  $45.000  |  $45.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=CantidadDeObraPagadaContratos \( ITDContrato\* **;** IContrato\* **;**
ITercero\* **;** FechaIni\* **;** FechaFin\* **;** IEmp**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánta cantidad de labor se ha pagado en el mes de enero?.  |  =CantidadDeObraPagadaContratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  50
¿Cuánto fue la cantidad laborada del contrato CCO-1801006?.  |  =CantidadDeObraPagadaContratos\( **;** "CCO-2001001"\)  |  20
¿Cuánto fue la cantidad laborada por el tercero 45893114 y con el tipo de contrato 1?.  |  =CantidadDeObraPagadaContratos\( "1"**;** **;** "45893114"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\) \)  |  30
¿Cuánto fue la cantidad laborada con el tipo de contrato 1?.  |  =CantidadDeObraPagadaContratos\( "1"**** \)  |  50
Cuánto fue la cantidad de labor realizada con el tipo de contrato 2.  |  =CantidadDeObraPagadaContratos\( "2"**** \)  |  0

---

=CantidadManoDeObraPagadaContratos \( \)

Descripción

Esta función calcula la cantidad de mano de obra pagada en un periodo de
tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular la cantidad de mano de obra pagada de un contrato en específico.
  * Calcular la cantidad de mano de obra pagada a un tercero en específico.

Sintaxis

|  =CantidadManoDeObraPagadaContratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Opcional\)  |  Alfanumérico  |  Código o número del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadManoDeObraPagadaContratos\( "1","2"**;** "CCO-1801003"**;**
"852164","256483"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron los siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Cant. labor pagada  |  Cant. mano de obra pagada  |  Costo total cantidad labor  |  Costo total mano de obra  |  Costo total  |  Total pagado
---|---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramírez  |  1  |  30  |  |  $69.000  |  |  $69.000  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  |  1 Jor  |  |  $25.000  |  $25.000  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  |  8 Hora  |  |  $35.000  |  $35.000  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  20  |  |  $45.000  |  |  $45.000  |  $45.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=CantidadManoDeObraPagadaContratos \( ITDContrato\* **;** IContrato\* **;**
ITercero\* **;** FechaIni\* **;** FechaFin\* **;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánta cantidad de mano de obra que se ha pagado en el mes de enero?.  |  =CantidadManoDeObraPagadaContratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  9
¿Cuánto fue la cantidad de mano de obra laborada del contrato CCO-1801003?.  |  =CantidadManoDeObraPagadaContratos\( **;** "CCO-1801003"\)  |  1
¿Cuánto fue la cantidad de mano de obra laborada por el tercero 56851896 y con el tipo de contrato 2?.  |  =CantidadManoDeObraPagadaContratos\( "2"**;** **;** "56851896" \)  |  8
¿Cuánto fue la cantidad laborada con el tipo de contrato 1?.  |  =CantidadManoDeObraPagadaContratos\( "1"**** \)  |  0  |  ¿Cuánto fue la cantidad laborada con el tipo de contrato 3?.  |  =CantidadManoDeObraPagadaContratos\( "3"**** \)  |  1

---

=CostoCantidadDeObraPagadaContratos \( \)

Descripción

Esta función calcula el costo por la cantidad de obra pagada en un periodo de
tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el costo por la cantidad obra pagada de un contrato en específico.
  * Calcular el costo por la cantidad de obra pagada a un tercero en específico.

Sintaxis

|  =CostoCantidadDeObraPagadaContratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Opcional\)  |  Alfanumérico  |  Código o número del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros del catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoCantidadDeObraPagadaContratos\( "1","2"**;** "CCO-1706001"**;**
"852164","256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron los siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Cant. labor pagada  |  Cant. mano de obra pagada  |  Costo total cantidad labor  |  Costo total mano de obra  |  Costo total  |  Total pagado
---|---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramirez  |  1  |  30  |  |  $69.000  |  |  $69.000  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  |  1 Jor  |  |  $25.000  |  $25.000  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  |  8 Hora  |  |  $35.000  |  $35.000  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  20  |  |  $45.000  |  |  $45.000  |  $45.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=CostoCantidadDeObraPagadaContratos \( ITDContrato\* **;** IContrato\* **;**
ITercero\* **;** FechaIni\* **;** FechaFin\* **;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el costo por la cantidad de obra que se ha pagado en el mes de enero?.  |  =CostoCantidadDeObraPagadaContratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $ 114.000
¿Cuánto fue el costo por la cantidad de labor realizada del contrato CCO-1801003?.  |  =CostoCantidadDeObraPagadaContratos\( **;** "CCO-1801003"\)  |  $ 69.000
¿Cuánto fue el costo por la cantidad de labor realizada por el tercero 5468215 y con el tipo de contrato 1?.  |  =CostoCantidadDeObraPagadaContratos\( "1"**;** **;** "5468215" \)  |  $ 45.000
¿Cuánto fue el costo de la cantidad de labor realizada con el tipo de contrato 1?.  |  =CostoCantidadDeObraPagadaContratos\( "1" \)  |  $ 114.000  |  ¿Cuánto fue el costo de la cantidad de labor realizada con el tipo de contrato 3?.  |  =CostoCantidadDeObraPagadaContratos\( "2" \)  |  0

---

=CostoManoDeObraPagadaContratos \( \)

Descripción

Esta función calcula el costo de mano de obra pagada en un periodo de tiempo
determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el costo de mano de obra pagada de un contrato en específico.
  * Calcular el costo de mano de obra pagada a un tercero en específico.

Sintaxis

|  =CostoManoDeObraPagadaContratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Requerido\)  |  Alfanumérico  |  Código o número del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoManoDeObraPagadaContratos\( "1","2"**;** "CCO-1706001"**;**
"852164","256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron las siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Cant. labor pagada  |  Cant. mano de obra pagada  |  Costo total cantidad  |  Costo total Mano de obra  |  Costo total  |  Total pagado
---|---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramirez  |  1  |  30  |  |  $69.000  |  |  $69.000  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  |  1 Jor  |  |  $25.000  |  $25.000  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  |  8 Hora  |  |  $35.000  |  $35.000  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  20  |  |  $45.000  |  |  $45.000  |  $45.000

  * Con los datos registrados se utilizó la fórmula de las siguientes maneras, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=CostoManoDeObraPagadaContratos \( ITDContrato\* **;** IContrato\* **;**
ITercero\* **;** FechaIni\* **;** FechaFin\* **;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto fue el costo de la mano de obra se ha pagado en el mes de enero?.  |  =CostoManoDeObraPagadaContratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $ 60.000
¿Cuánto fue el costo de la mano de obra laborada del contrato CCO-1801003?.  |  =CostoManoDeObraPagadaContratos\( **;** "CCO-1801003"\)  |  $ 25.000
¿Cuánto fue el costo de la mano de obra laborada por el tercero 56851896 y con el tipo de contrato 2?.  |  =CostoManoDeObraPagadaContratos\( "2"**;** **;** "56851896" \)  |  $ 35.000
Cuánto fue el costo por las contratos con el tipo de contrato 2.  |  =CostoManoDeObraPagadaContratos\( "2" \)  |  $ 35.000  |  ¿Cuánto fue el costo de la mano deobra laborada con el tipo de contrato 2?.  |  =CostoManoDeObraPagadaContratos\( "2" \)  |  $0.0

---

=CostoTotalPagadoContratos \( \)

Descripción

Esta función calcula el costo pagado por los contratos realizados en un
periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el costo pagado de un contrato en específico.
  * Calcular el costo pagado de un contrato a un tercero en específico.

Sintaxis

|  =CostoTotalPagadoContratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Opcional\)  |  Alfanumérico  |  Código o número del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoTotalPagadoContratos\( "1","2"**;** "CCO-180001"**;**
"852164","256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron los siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Cant. labor pagada  |  Cant. mano de obra pagada  |  Costo total cantidad  |  Costo total Mano de obra  |  Costo total  |  Total pagado
---|---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramirez  |  1  |  30  |  |  $69.000  |  |  $69.000  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  |  1 Jor  |  |  $25.000  |  $25.000  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  |  8 Hora  |  |  $35.000  |  $35.000  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  20  |  |  $45.000  |  |  $45.000  |  $45.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=CostoTotalPagadoContratos \( ITDContrato\* **;** IContrato\* **;** ITercero\*
**;** FechaIni\* **;** FechaFin\* **;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el costo pagado por los contratos realizados en el mes de enero?.  |  =CostoTotalPagadoContratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $ 174.000
¿Cuánto fue el costo pagado por la cantidad de labor realizada del contrato CCO-1801001?.  |  =CostoTotalPagadoContratos\( **;** "CCO-1801001"\)  |  $ 69.000
¿Cuánto fue el costo pagado por la cantidad de mano de obra laborada por el tercero 9852864 y con el tipo de contrato 3?.  |  =CostoTotalPagadoContratos\( "3"**;** **;** "9852864" \)  |  $ 25.000
¿Cuánto fue el costo pagado por la cantidad de labor con el tipo de contrato 1?.  |  =CostoTotalPagadoContratos\( "1"**** \)  |  $ 114.000
¿Cuánto fue el total pagado por la cantidad de labor con el tipo de contrato 3?.  |  =CostoTotalPagadoContratos\( "3"**** \)  |  $ 25.000

---

=Descuento1Contratos \( \)

Descripción

Esta función calcula el total de los descuentos pagados por salud de los
contratos realizados en un periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el total de los descuentos pagados por salud de un contrato en específico.
  * Calcular el total de los descuentos pagados por salud de un tercero en específico.

Sintaxis

|  =Descuento1Contratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Requerido\)  |  Alfanumérico  |  Código del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de un o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información del descuento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =Descuento1Contratos\( "1","2"**;** "CCO-1801003"**;**
"852164,256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron los siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Descuento salud  |  Descuento pensión  |  Descuento ReteFuente  |  Otro descuento  |  Total pagado
---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramirez  |  1  |  $4.000  |  |  $2.000  |  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  $1.000  |  $600  |  |  $300  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  $3.000  |  $2.000  |  |  $800  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  |  |  $2.300  |  $1.500  |  $45.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=Descuento1Contratos \( ITDContrato\* **;** IContrato\* **;** ITercero\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el total de los descuentos pagados por salud de los contratos realizados en el mes de enero?.  |  =Descuento1Contratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $ 8.000
¿Cuánto fue el total de los descuentos pagados por salud del contrato CCO-1801006?.  |  =Descuento1Contratos\( **;** "CCO-1801006"****\)  |  $ 0.0
¿Cuánto fue el total por de los descuentos pagados por salud del tercero 9852864 y con el tipo de contrato 3?.  |  =Descuento1Contratos\( "3"**;** **;** "9852864" \)  |  $ 1.000
¿Cuánto fue el total de los descuentos pagados por salud con el tipo de contrato 1?.  |  =Descuento1Contratos\( "1" \)  |  $ 4.000
¿Cuánto fue el total de los descuentos pagados por salud con el tipo de contrato 2?.  |  =Descuento1Contratos\( "2" \)  |  $ 3.000

---

=Descuento2Contratos \( \)

Descripción

Esta función calcula el total de los descuentos pagados por pensión de los
contratos realizados en un periodo de tiempo determinado.

Otras aplicaciones

Con esta función también podrá:

  * Calcular el total de los descuentos pagados por pensión de un contrato en específico.
  * Calcular el total de los descuentos pagados por pensión de un tercero en específico.

Sintaxis

|  =Descuento2Contratos  |  \( ** ITDContrato\*; IContrato\*; ITercero\*; FechaIni\*; FechaFin\*; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITDContrato\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de contrato por el cual se desea filtrar.  |  Calcula con todos los tipos de contratos creados en ContaPyme®.
IContrato\*
\(Requerido\)  |  Alfanumérico  |  Código del contrato por el cual se quiere filtrar.  |  Calcula con todos los contratos creados en ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de un o varios terceros por los cuales se desea filtrar la función.  |  Calcula con todos los terceros de catálogo de terceros de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la información del descuento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =Descuento2Contratos\( "1","2"**;** "CCO-1706001"**;**
"852164","256483"**;** Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1\)

Ejemplos

  * En la empresa 1 CMB Muebles, se realizaron los siguientes contratos en ContaPyme® en el mes de enero del año 2018. Del respectivo registro surgió la siguiente tabla:

Cód. Contrato  |  Cód. trabajador  |  Nombre trabajador  |  Tipo contrato  |  Descuento salud  |  Descuento pensión  |  Descuento ReteFuente  |  Otro descuento  |  Total pagado
---|---|---|---|---|---|---|---|---
CCO-1801001  |  45893114  |  Juan Ramirez  |  1  |  $4.000  |  |  $2.000  |  |  $69.000
CCO-1801003  |  9852864  |  Felipe Rojas  |  3  |  $1.000  |  $600  |  |  $300  |  $25.000
CCO-1801005  |  56851896  |  Juliana Toro  |  2  |  $3.000  |  $2.000  |  |  $800  |  $35.000
CCO-1801006  |  5468215  |  Andres Jimenez  |  1  |  |  |  $2.300  |  $1.500  |  $45.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera, tenga en cuenta que la fecha de trabajo es el 1 de febrero de 2018.


=Descuento2Contratos \( ITDContrato\* **;** IContrato\* **;** ITercero\* **;**
FechaIni\* **;** FechaFin\* **;** IEmp\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánto es el total de los descuentos pagados por pensión de los contratos realizados en el mes de enero?.  |  =Descuento2Contratos\( **;** **;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)\)  |  $2.600
¿Cuánto fue el total de los descuentos pagados por pensión del contrato CCO-1801006?.  |  =Descuento2Contratos\( **;** "CCO-1801006"\)  |  $0.0
¿Cuánto fue el total por de los descuentos pagados por pensión del tercero 9852864 y con el tipo de contrato 3?.  |  =Descuento2Contratos\( "3"**;** **;** "9852864" \)  |  $ 600
¿Cuánto fue el total de los descuentos pagados por pensión con el tipo de contrato 1?.  |  =Descuento2Contratos\( "1" \)  |  $0.0
¿Cuánto fue el total de los descuentos pagados por pensión con el tipo de contrato 2?.  |  =Descuento2Contratos\( "2" \)  |  $2.000

---

=EmpresaTrabajoActiva \( \)

Descripción

Esta función es utilizada para conocer el código de la empresa activa en el
momento.

Sintaxis

=EmpresaTrabajoActiva \( \)

Ejemplo

  * A continuación se visualizan las empresas de trabajo registradas en ContaPyme®.

Código empresa  |  Nombre empresa
---|---
1  |  DEMO COMPUTADORES S.A.
2  |  CMB-MUEBLES LTDA
3  |  INDUSTRIAS METALICAS JUANDA

=EmpresaTrabajoActiva \( \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es la empresa de trabajo que se encuentra activa en el momento?.  |  =EmpresaTrabajoActiva \( \)  |  1

---

=FechaTrabajo \( \)

Descripción

Esta función es utilizada para conocer la fecha de trabajo configurada en el
momento. Esta fecha se encuentra en la parte inferior izquierda de ContaExcel.

Sintaxis

=FechaTrabajo \( \)

Ejemplo



Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es la fecha de trabajo que se encuentra activa en el momento.  |  =FechaTrabajo\( \)  |
26/10/2017
Esta fecha varía según configuración de ContaExcel y la puede encontrar en la
parte inferior izquierda del programa.

---

=NombreAreaTrabajoActiva \( \)

Descripción

Esta función es utilizada para conocer el nombre del área de trabajo activa en
el momento.

Sintaxis

=NombreAreaTrabajoActiva \( \)

Ejemplo

  * A continuación se visualizan las áreas de trabajo registradas en ContaPyme®.

Área de trabajo
---
Empresa 1
Empresa 2
Empresa 3

=NombreAreaTrabajoActiva \( \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es el nombre del área de trabajo que se encuentra activa en el momento?.  |  =NombreAreaTrabajoActiva \( \)  |  Empresa 1

---

=NombreEmpresaTrabajoActiva \( \)

Descripción

Esta función es utilizada para conocer el nombre completo de la empresa activa
en el momento.

Sintaxis

=NombreEmpresaTrabajoActiva \( \)

Ejemplo

  * A continuación se visualizan las empresas de trabajo registradas en ContaPyme®.

Código empresa  |  Nombre completo empresa
---|---
1  |  DEMO COMPUTADORES S.A.
2  |  CMB-MUEBLES LTDA
3  |  INDUSTRIAS METALICAS JUANDA

=NombreEmpresaTrabajoActiva \( \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es la empresa de trabajo que se encuentra activa en el momento?.  |  =NombreEmpresaTrabajoActiva \( \)  |  DEMO COMPUTADORES S.A.

---

=Edad \( \)

Descripción

Esta función muestra la diferencia entre dos fechas indicadas. " FechaFin -
FechaIni "

Sintaxis

|  =Edad  |  \( FechaIni\*; FechaFin\*; BIncluyeTexto\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo que se va a calcular.

Se recomienda utilizar la función fecha para este argumento, así se evitan confusiones entre fechas. Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo que se encuentre configurada en el momento.
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo que se encuentre configurada en el momento.
BIncluyeTexto\*
\(Opcional\)  |  Alfanumérico  |  Determina si trae el texto de la diferencia entre las fechas indicadas.

**"T"** =Muestra el Texto
**"F"** =Muestra solo diferencia.  |  Por defecto toma el valor **"F"** , mostrando solo la diferencia.

Ejemplos

=Edad \( FechaIni\* **;** FechaFin\* **;** BIncluyeTexto\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar la diferencia que hay entre las fechas 10/Feb/1993 y 16/Jun/2017  |  =Edad \( FECHA\(1993;02;10\)**;** FECHA\(2017;06;16\) \)  |  24
Determinar la diferencia que hay entre las fechas 10/Feb/1993 y 16/Jun/2017  |  =Edad \( FECHA\(1993;02;10\)**;** FECHA\(2017;06;16\)**;** "T" \)  |  24 años y 4 meses

---

=FechaInicioSemana \( \)

Descripción

Dando el número de la semana, la función determina la fecha en que inicia tal
semana.

Otras aplicaciones

Con esta función también podrá:

  * Determinar la fecha en que inicia una semana, dando el número de la semana y un año de referencia.

Sintaxis

|  =FechaInicioSemana  |  \( Semana\*; Año\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Semana\*
\(Opcional\)  |  Número  |  Número de la semana con la cual la función realizará el cálculo.  |  Establece la semana de la fecha de trabajo que se encuentre configurada en el momento.
Año\*
\(Opcional\)  |  Número  |  Año con el cual la función realizará el cálculo.  |  Establece el año de la fecha de trabajo que se encuentre configurada en el momento.

Ejemplos

=FechaInicioSemana \( Semana\* **;** Año\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el día que inicia la semana 10 del año 1993  |  =FechaInicioSemana \( 6**;** 1993 \)  |  8/Feb/1993
Determinar el día que inicia la semana 72 tomando como referencia el año 2019  |  =FechaInicioSemana \( 72**;** 2019 \)  |  18/may/20

---

=FechaLunes \( \)

Descripción

Indicando una fecha, la función muestra la fecha del día lunes, basándose en
la misma semana de la fecha indicada.

Sintaxis

|  =FechaLunes  |  \( Fecha\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Fecha\*
\(Opcional\)  |  Fecha  |  Fecha con la cual la función realizará el cálculo.  |  Establece la fecha de trabajo que se encuentre configurada en el momento.

Ejemplos

=FechaLunes \( Fecha\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el día lunes de la semana del 10 de febrero de 1993  |  =FechaLunes \( FECHA\(1993;02;10\) \)  |  8/Feb/1993
Determinar el día lunes de la semana del 25 de Agosto de 2019  |  =FechaLunes \( FECHA\(2019;08;25\) \)  |  19/Ago/2019

---

=NombreMes \( \)

Descripción

Dada la identificación del mes, la función muestra el nombre del mes. El
usuario podrá determinar si quiere que el nombre del mes se muestre completo o
abreviado.

Sintaxis

|  =NombreMes  |  \( IMes; BNombreLargo\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IMes
\(Requerido\)  |  Número  |  Código del mes que mostrará la función.  |  Establece la semana de la fecha de trabajo que se encuentre configurada en el momento.
BNombreLargo\*
\(Opcional\)  |  Número  |  Determina si el nombre del mes es mostrado completo o abreviado.

**"T"** =Muestra el nombre del mes completo.
**"F"** =Muestra el nombre del mes abreviado.  |  Establece **"F"** , mostrando el valor abreviado.

Meses del año

Identificador mes  |  Nombre mes abreviado  |  Nombre mes Completo
---|---|---
1  |  Ene  |  Enero
2  |  Feb  |  Febrero
3  |  Mar  |  Marzo
4  |  Abr  |  Abril
5  |  May  |  Mayo
6  |  Jun  |  Junio
7  |  Jul  |  Julio
8  |  Ago  |  Agosto
9  |  Sep  |  Septiembre
10  |  Oct  |  Octubre
11  |  Nov  |  Noviembre
12  |  Dic  |  Diciembre

Ejemplos

=NombreMes \( IMes**;** BNombreLargo\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre del mes 2.  |  =NombreMes \( 6 \)  |  Feb
Cuál es el nombre completo del mes 2.  |  =NombreMes \( 2**;** "T" \)  |  Febrero
Cuál es el nombre completo del mes 8.  |  =NombreMes \( 8**;** "T" \)  |  Agosto

---

=NumeroSemana \( \)

Descripción

Dada una fecha, la función determina el número de la semana del año al que
pertenece.

Otras aplicaciones

Con esta función también podra:

  * Determinar el número de la semana de una fecha, indicando el año donde empezará el conteo.

Sintaxis

|  =NumeroSemana  |  \( Fecha\*; AñoReferencia\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Fecha\*
\(Opcional\)  |  Fecha  |  Fecha con la cual la función realizará el cálculo.  |  Establece la fecha de inicio de los tiempo 31/12/1899
AñoReferencia\*
\(Opcional\)  |  Número  |  Año donde iniciará el conteo de las semanas.  |  Establece el año del primer árgumento.

Ejemplos

=NumeroSemana \( Fecha\* **;** AñoReferencia\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál fue la semana del día 10/Feb/1993 respesto al mismo año  |  =NumeroSemana \( FECHA\(1993;02;10\) \)  |  6
Determinar cuál fue la semana del día 20/Jun/2018 respecto al año 2017  |  =NumeroSemana \( FECHA\(2018;6;20\)**;** 2017 \)  |  77

---

=PrimerDiaMes \( \)

Descripción

Esta función determina la fecha en que inicia un mes, basándose en una fecha
de referencia.

Otras aplicaciones

Con esta función también podrá:

  * Determinar la fecha donde inicia un mes, indicandole una fecha y sumándole años y/o meses.
  * Determinar la fecha donde inicia un mes, indicandole una fecha y restándole años y/o meses.

Sintaxis

|  =PrimerDiaMes  |  \( Fecha\*; NumMeses\*; NumAños\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Fecha\*
\(Opcional\)  |  Fecha  |  Fecha donde se empezará a realizar el cálculo.

Se recomienda utilizar la función fecha para este argumento, así se evitarán confusiones entre fechas. Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo que se encuentre configurada en el momento.
NumMeses\*
\(Opcional\)  |  Número  |  Número de meses que se le quiere sumar o restar al argumento Fecha.  |  Por defecto no suma ningún valor.
NumAños\*
\(Opcional\)  |  Número  |  Número de años que se le quiere sumar o restar al argumento Fecha.  |  Por defecto no suma ningún valor.


**Nota:** Para restarle meses o años a la fecha de referencia, solo debe
ingresar el número con el signo negativo al comienzo.
**Ej.** =UltimoDiaMes \( FECHA\(2015;1;1\)**;** -6**;** -1 \) =**31/jul/2013**

Ejemplos

=PrimerDiaMes \( Fecha\* **;** NumMeses\* **;** NumAños\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el primer día del mes de la fecha 10/Feb/1993  |  =PrimerDiaMes \( FECHA\(1993;02;10\) \)  |  1/Feb/1993
Determinar el primer día del mes de la fecha 10/Feb/1993 adicionandole 5 meses y 3 años  |  =PrimerDiaMes \( FECHA\(1993;02;10\)**;** 5**;** 3 \)  |  1/Jul/1996

---

=UltimoDiaMes \( \)

Descripción

Esta función determina la fecha en que termina un mes, basándose en una fecha
de referencia.

Otras aplicaciones

Con esta función también podrá:

  * Determinar la fecha donde termina un mes, indicandole una fecha y sumándole años y/o meses.
  * Determinar la fecha donde termina un mes, indicandole una fecha y restándole años y/o meses.

Sintaxis

|  =UltimoDiaMes  |  \( Fecha\*; NumMeses\*; NumAños\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Fecha\*
\(Opcional\)  |  Fecha  |  Establece la fecha donde se empezará a realizar el cálculo.

Se recomienda utilizar la función fecha para este argumento, así se evitarán confusiones entre fechas. Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo que se encuentre configurada en el momento.
NumMeses\*
\(Opcional\)  |  Número  |  Número de meses que se le quiere sumar o restar al argumento Fecha.  |  Por defecto no suma ningún valor.
NumAños\*
\(Opcional\)  |  Número  |  Número de meses que se le sumarán o restarán al argumento Fecha. |  Por defecto no suma ningún valor.


**Nota:** Para restarle meses o años a la fecha de referencia, solo debe
ingresar el número con el signo negativo al comienzo.
**Ej.** =UltimoDiaMes \( FECHA\(2015;1;1\)**;** -6**;** -1 \) =**31/jul/2013**

Ejemplos

=UltimoDiaMes \( Fecha\* **;** NumMeses\* **;** NumAños\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el último día del mes de la fecha 10/Feb/1993  |  =UltimoDiaMes \( FECHA\(1993;02;10\) \)  |  28/Feb/1993
Determinar el último día del mes de la fecha 10/Feb/1993 adicionandole 5 meses y 3 años  |  =UltimoDiaMes \( FECHA\(1993;02;10\)**;** 5**;** 3 \)  |  31/Jul/1996

---

\*\[FILTROS: 107,108,109,110,111\]\*

---

\*\[FILTROS:
46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72\]\*

---

\*\[FILTROS: 74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93\]\*

---

\*\[FILTROS: 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18\]\*

---

\*\[FILTROS:
19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39\]\*

---

\*\[FILTROS: 95,96,97,98,99,100,101,102,103,104,105\]\*

---

\*\[FILTROS: 41,411,42,43,44\]\*

---

Lista de filtros

Filtro  |  Parámetros  |  Descripción  |  Ejemplo
---|---|---|---
Plan de cuentas
FiltroCuenta\_Clase  |  \(Clase; SubClase\)  |  Filtra una función con la clase y subclase de la cuenta indicada.

**Clases y subclases**

1-Normal

1 IVA
2 Retención
3 Rete-ICA
4 Impuesto Cree
5 Otro
6 Otro 2

2 De efectivo

1 De efectivo

3 De impuestos

1 IVA
2 IVAASUMIDO
3 RETEIVA
4 RETENCION
5 RETEICA
6 OTRO

4 De ajuste por inflación

1 De ajuste por inflación

5 De nómina contable

1 Concepto1
2 Concepto2
3 ...

|  Cómo sería el filtro si se quiere filtrar una función solo por la clase de
cuenta 2 y su subclase.

**FiltroCuenta\_Clase\(2;1\)**





Cómo sería el filtro si se quiere filtrar una función solo por la clase de
cuenta 3 y la subclase 4.

**FiltroCuenta\_Clase\(3;4\)**
FiltroCuenta\_Identificador  |  \(listaId\)  |  Filtra una función en las cuentas que se deseen.

Para tomar una cuenta y todas su hijas, se debe poner el signo %.  |  Cómo sería el filtro si se quiere filtrar una función por la 11 y sus hijas.

**FiltroCuenta\_Identificador \("11%"\)**



Cómo sería el filtro si se quiere filtrar una función por la 11050510 y
11050520.

**FiltroCuenta\_Identificador \("11050510;11050520"\)**
FiltroCuenta\_Tipo  |  \(ListaTipos\)  |  Filtra una función con el tipo de la cuenta indicada.

1\. Activo
2\. Pasivo
3\. Patrimonio
4\. Ingresos
5\. Egresos
6\. De orden deudora
7\. De Orden acreedora

|  Cómo sería el filtro si se quiere filtrar una función por los tipo de
cuenta 1 y 3.

**FiltroCuenta\_Tipo\("1,3"\)**


FiltroCuenta\_SoloManejaTercero  |  |  Filtra una función por las cuentas que maneja terceros.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que solo manejan terceros.

**FiltroCuenta\_SoloManeja Tercero\(\)**
FiltroCuenta\_SoloManeja OtraMoneda  |  |  Filtra una función por las cuentas que manejan otra moneda.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que manejan otra moneda.

**FiltroCuenta\_SoloManeja OtraMoneda\(\)**
FiltroCuenta\_SoloManejaCuotas  |  |  Filtra una función por las cuentas que manejan referencias, esto indica si el módulo de cartera deberá manejar el endeudamiento basado en sub-documentos de soporte o no. Así mismo, habilita o no la cuenta para el manejo de créditos en varias cuotas.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que manejan referencias.

**FiltroCuenta\_SoloManeja OtraMoneda\(\)**
FiltroCuenta\_SoloManejaCartera  |  |  Filtra una función por las cuentas que manejan cartera.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que manejan carera.

**FiltroCuenta\_SoloManeja Cartera\(\)**
FiltroCuenta\_SoloExigeBase  |  |  Filtra una función por las cuentas que exigen valor base.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que exigen valor base.

**FiltroCuenta\_SoloExige Base\(\)**
FiltroCuenta\_SoloExigeActivo  |  |  Filtra una función por las cuentas que exigen activo.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que exigen activo.

**FiltroCuenta\_SoloExige Activo\(\)**
FiltroCuenta\_SoloAutoActivables  |  |  Filtra una función por las cuentas que son afectables directamente por el usuario.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que pueden ser afectables por el usuario.

**FiltroCuenta\_Auto Activables\(\)**
FiltroCuenta\_SoloAjustesxInf  |  |  Filtra una función por las cuentas que son ajustadas por inflación.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que son ajustadas por inflación.

**FiltroCuenta\_Solo AjustesxInf\(\)**
FiltroCuenta\_SoloExigeValor1  |  |  Filtra una función por las cuentas que exigen el valor 1, este valor es configurado por el usuario desde el PUC de ContaPyme®.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que exigen valor 1.

**FiltroCuenta\_SoloExige Valor1\(\)**
FiltroCuenta\_SoloExigeValor2  |  |  Filtra una función por las cuentas que exigen el valor 2, este valor es configurado por el usuario desde el PUC de ContaPyme®.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que exigen valor 2.

**FiltroCuenta\_SoloExige Valor2\(\)**
FiltroCuenta\_SoloExigeClase1  |  |  Filtra una función por las cuentas que exigen la clase 1, esta clase es configurada por el usuario desde el PUC de ContaPyme®.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que exigen clase 1.

**FiltroCuenta\_SoloExige Clase1\(\)**
FiltroCuenta\_SoloExigeClase2  |  |  Filtra una función por las cuentas que exigen la clase 2, esta clase es configurada por el usuario desde el PUC de ContaPyme®.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas que exigen clase 2.

**FiltroCuenta\_SoloExige Clase2\(\)**
Terceros
FiltroTercero\_Identificador  |  \(Lista Identificadores\)  |  Filtra una función por los terceros que se le indiquen.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros 8564845 y 78995624

**FiltroTercero\_Identificador \("8564845,78995624"\)**


FiltroTercero\_Zona  |  \(ListaZonas\)  |  Filtra una función por los terceros que tengan las zonas determinadas.

Tenga en cuenta que esta zona es configurada por el usuario en la configuración de cada tercero.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros que están en la zona COL50.

**FiltroTercero\_Zona \("COL50"\)**



Cómo sería el filtro si se quiere filtrar una función por los terceros que
están en las zonas COL50 y VEN36.

**FiltroTercero\_Zona\("COL50, VEN36"\)**
FiltroTercero\_Vendedor  |  \(Lista Vendedores\)  |  Filtra una función por los terceros que sean de tipo vendedor.

Tenga en cuenta que el filtro recibe una lista de códigos se filtrará solo por los que son vendedores, y debe ser usado en la función.  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros vendedor con los siguientes códigos:

115623654, vendedor
458652154, cliente
985621458, vendedor


**FiltroTercero\_Vendedor \("115623654,458652154, 985621458"\)**
FiltroTercero\_TipoVendedor  |  \(sListaTipos\)  |  Filtra una función por los terceros que sean de tipo vendedor.

Tenga en cuenta que el tipo de tercero vendedor tiene el código 5, y debe ser
usado en la función.

Los código de tipos de terceros pueden ser configurable por el usuario desde la tabla de títulos "Tipos de terceros".  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros vendedor.

**FiltroTercero\_Vendedor\(5\)**
FiltroTercero\_TipoProveedor  |  \(sListaTipos\)  |  Filtra una función por los terceros que sean de tipo proveedor.

Tenga en cuenta que el tipo de tercero proveedor tiene el código 1, y debe ser
usado en la función.

Los código de tipos de terceros pueden ser configurable por el usuario desde la tabla de títulos "Tipos de terceros".  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros proveedor.

**FiltroTercero\_Tipo Proveedor\(1\)**
FiltroTercero\_TipoEmpleado  |  \(sListaTipos\)  |  Filtra una función por los terceros que sean de tipo empleado.

Tenga en cuenta que el tipo de tercero empleado tiene el código 4, y debe ser
usado en la función.

Los código de tipos de terceros pueden ser configurable por el usuario desde la tabla de títulos "Tipos de terceros".  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros empleados.

**FiltroTercero\_TipoEmpleado\("4"\)**
FiltroTercero\_TipoCliente  |  \(sListaTipos\)  |  Filtra una función por los terceros que sean de tipo cliente.

Tenga en cuenta que existen dos tipos de terceros para este filtro, cliente y
cliente vip, sus respectivos códigos son 2 y 3 y almenos uno debe ser usado en
la función.

Los código de tipos de terceros pueden ser configurable por el usuario desde la tabla de títulos "Tipos de terceros".  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros empleados.

**FiltroTercero\_TipoCliente\("4"\)**
FiltroTercero\_TipoDocumento  |  \(nListaTipos\)  |  Filtra una función por los terceros con un tipo de documento determinado.

Los código de tipos de terceros pueden ser configurable por el usuario desde la tabla de títulos "Tipos de documento".  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con tipo de documento NIT. El código del tipo de documento correspondiente a NIT es 31.

**FiltroTercero\_TipoDocumento \("31"\)**
FiltroTercero\_Perfil  |  ListaPerfiles  |  Filtra una función por los terceros con un perfíl determinado.

Tenga en cuenta que el perfíl de un tercero es configurable por el usuario en la configuración de cada tercero.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con el perfíl PGC, perfíl general del cliente.

**FiltroTercero\_Perfil\("PGC"\)**
FiltroTercero\_Pais  |  \(ListaPaises\)  |  Filtra una función por los terceros provenientes de un país determinado.

Tenga en cuenta que los códigos de los países pueden ser configurables por el usuario en el catálogo de "Países, departamentos y ciudades".  |  Cómo sería el filtro si se quiere filtrar una función por los terceros provenientes de Colombia. El código del país es 169.

**FiltroTercero\_Pais\("169"\)**
FiltroTercero\_Departamento  |  \(Lista Departamentos\)  |  Filtra una función por los terceros provenientes de un departamento determinado.

Tenga en cuenta que los código de los departamento pueden ser configurable por el usuario en el catálogo de "Países, departamentos y ciudades".  |  Cómo sería el filtro si se quiere filtrar una función por los terceros provenientes de Caldas. El código del departamento es 17.

**FiltroTercero\_Tipo Departamentos\("17"\)**
FiltroTercero\_Ciudad  |  \(ListaCiudades\)  |  Filtra una función por los terceros provenientes de una ciudad determinada.

Tenga en cuenta que el código de las ciudades pueden ser configurable por el usuario en el catálogo de "Países, departamentos y ciudades".  |  Cómo sería el filtro si se quiere filtrar una función por los terceros provenientes de Manizales. El código de la cidudad es 001.

**FiltroTercero\_Ciudad\("001"\)**
FiltroTercero\_ClasificacionLegal  |  \(Lista Clasificaciones\)  |  Filtra una función por los terceros con determinada clasificación legal

Tenga en cuenta que la clasificación legal de los terceros es configurada por cada tercero.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con clasificación legal PN, Persona natural.

**FiltroTercero\_ClasificacionLegal \("PN"\)**
FiltroTercero\_Clasificacion  |  \(Lista Clasificaciones\)  |  Filtra una función por los terceros con determinada clasificación, ésta es asignada a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con clasificación "CLAS1".

**FiltroTercero\_Clasificacion \("CLAS1"\)**
FiltroTercero\_Categoria  |  \(ListaCategorias\)  |  Filtra una función por los terceros con determinada categoría, ésta es asignada a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con la categoría "CAT1".

**FiltroTercero\_ Categoria\("CAT1"\)**
FiltroTercero\_Dato1  |  \(ListaDatos\)  |  Filtra una función por los terceros con determinado dato 1, éste es asignado a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con el dato 1, "DAT1".

**FiltroTercero\_Dato1\("DAT1"\)**
FiltroTercero\_Dato2  |  \(ListaDatos\)  |  Filtra una función por los terceros con determinado dato 2, éste es asignado a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con el dato 2, "DAT2".

**FiltroTercero\_Dato2\("DAT2"\)**
FiltroTercero\_Clase1  |  \(sListaClases\)  |  Filtra una función por los terceros con determinada clase 1, ésta es asignada a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con clase 1, "CLAS1".

**FiltroTercero\_Clase1 \("CLAS1"\)**
FiltroTercero\_Clase2  |  \(sListaClases\)  |  Filtra una función por los terceros con determinada clase 2, ésta es asignada a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con clase 1, "CLAS2".

**FiltroTercero\_Clase2 \("CLAS2"\)**
FiltroTercero\_Valor1  |  \(Operador;Valor\)  |  Filtra una función por los terceros con determinado valor 1, éste es asignado a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con el valor 1, "VAL1".

**FiltroTercero\_Valor1\( ; "VAL1"\)**
FiltroTercero\_Valor2  |  \(Operador; Valor\)  |  Filtra una función por los terceros con determinado valor 2, éste es asignado a cada tercero desde la configuración del mismo.  |  Cómo sería el filtro si se quiere filtrar una función por los terceros con el valor 2, "VAL2".

**FiltroTercero\_Valor2\( ; "VAL2"\)**
Tipos de tercero
FiltroTercero\_SoloVendedores  |  |  Filtra una función por los tipos de terceros que son vendedores.  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros que son vendedores.

**FiltroCuenta\_Solo Vendedores\(\)**


FiltroTercero\_SoloEmpleados  |  |  Filtra una función por los tipos de terceros que son empleados.  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros que son empleados.

**FiltroCuenta\_Solo Empleados\(\)**


FiltroTercero\_SoloProveedores  |  |  Filtra una función por los tipos de terceros que son proveedores.  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros que son proveedores.

**FiltroCuenta\_Solo Proveedores\(\)**


FiltroTercero\_SoloClientes  |  |  Filtra una función por los tipos de terceros que son clientes.  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros que son clientes.

**FiltroCuenta\_SoloClientes\(\)**


FiltroTercero\_SoloPersonas Juridicas  |  |  Filtra una función por los terceros que tienen clasificación legal PN, personas jurídicas.  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de terceros que tienen clasificación legal PN, personas jurídicas.

**FiltroCuenta\_SoloPersonas Juridicas\(\)**


Movimiento contable
FiltroMovCont\_Cuenta  |  \(ListaCuentas\)  |  Filtra una función por las cuentas determinadas.

Tenga en cuenta que las cuentas pueden ser configuradas desde el PUC de
ContaPyme®.

Si desea filtrar por una cuenta y sus hijas, coloque el signo % al final de la
cuenta

|  Cómo sería el filtro si se quiere filtrar una función por la cuenta 130505.

**FiltroMovCont\_Cuenta\("130505"\)**

Cómo sería el filtro si se quiere filtrar una función por la cuenta 2 y sus
hijas.

**FiltroMovCont\_Cuenta\("2%"\)**


FiltroMovCont\_Tercero  |  \(ListaTerceros\)  |  Filtra una función por los terceros determindados.  |  Cómo sería el filtro si se quiere filtrar una función por los siguientes terceros:

  * 8945672
  * 5656821
  * 8965424
  * 7658453

**FiltroMovCont\_Tercero\("8945672",
"5656821","8965424","7658453"\)**


FiltroMovCont\_ClaseOperacion  |  \(nListaClases\)  |  Filtra una función según la naturaleza de la operación.

**Clases de operacion**
0 Naturaleza débito
1 Naturaleza crédito  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones con naturaleza débito.

**FiltroMovCont\_Clase Operacion\("0"\)

**
FiltroMovCont\_TipoSoporte  |  \(nListaTipos\)  |  Filtra una función por el documento en que se encuentra soportado.

Tenga en cuenta que los documentos de soporte son configurados por el usuario desde el catálogo "Doc. soporte".  |  Cómo sería el filtro si se quiere filtrar una función por el documento de soporte 2 Factura de venta.

**FiltroMovCont\_TipoSoporte\("2"\)**


FiltroMovCont\_TerceroCartera  |  \(ListaTerceros\)  |  Filtra una función por las cuentas por cobrar o por pagar según los terceros dados.

Tenga en cuenta que si un tercero tiene cuentas por cobrar y por pagar, éstas serán cruzadas en el momento del cálculo.  |  Cómo sería el filtro si se quiere filtrar una función por las cuentas por cobrar y pagar del tercero 8945672

**FiltroMovCont\_TerceroCartera \("8945672"\)**


FiltroMovCont\_Documento Referencia  |  \(ListaDocumentos\)  |  Filtra una función por los documentos de referencia en los cuales está soportada la operación.  |  Cómo sería el filtro si se quiere filtrar una función por el documento FV-0001

**FiltroMovCont\_Documento Referencia\("FV-0001"\)**


FiltroMovCont\_Año  |  \(ListaAños\)  |  Filtra una función por las operaciones realizadas en un año en específico.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
realizadas en el año 2019.

**FiltroMovCont\_Año\("2019"\)**
FiltroMovCont\_Mes  |  \(ListaMeses\)  |  Filtra una función por las operaciones realizadas en un mes en específico.

Tenga en cuenta que el filtro realizará las operaciones con todos los meses de los años en que se encuentren las fechas de la función.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones realizadas en el mes de febrero.

**FiltroMovCont\_Mes\("2"\)**
FiltroMovCont\_Semana  |  \(ListaSemanas\)  |  Filtra una función por las operaciones realizadas en el número de una semana en específica.

Tenga en cuenta que el filtro realizará las operaciones con todas las semanas de los años en que se encuentren las fechas de la función.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones realizadas en la semana 9.

**FiltroMovCont\_Semana\("9"\)**
FiltroMovCont\_Dia  |  \(ListaDias\)  |  Filtra una función por las operaciones realizadas en un día en específico.

Tenga en cuenta que el filtro realizará las operaciones con todos los días de los años y meses en que se encuentren las fechas de la función.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones realizadas en los días 16.

**FiltroMovCont\_Dia\("16"\)**
FiltroMovCont\_Empresa  |  \(ListaEmpresas\)  |  Filtra una función por las operaciones realizadas en una empresa en específica.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
realizadas en la empresa 1.

**FiltroMovCont\_Empresa\("1"\)**
FiltroMovCont\_Sede  |  \(ListaSedes\)  |  Filtra una función por las operaciones realizadas en una sede de la empresa en específica.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
realizadas en la sede 2.

**FiltroMovCont\_Sede\("2"\)**
FiltroMovCont\_CentroDeCostos  |  \(ListaCentros DeCostos\)  |  Filtra una función por las operaciones a las que fue imputado un centro de costos determinado.  |  Cómo sería el filtro si se quiere filtrar una función por las imputaciones al centro de costos 10103.

**FiltroMovCont\_CentroDe Costos\("10103"\)**


FiltroMovCont\_CentroDe CostosOrigen  |  \(ListaCentros DeCostos\)  |  Filtra una función por las operaciones con productos elaborados en un centro de costos de producción específico.

|  Cómo sería el filtro si se quiere filtrar una función por el centro de
costos de producción 1325.

**FiltroMovCont\_CentroDe CostosOrigen\("1325"\)**
FiltroMovCont\_Flujo  |  \(ListaFlujo\)  |  Filtra una función según el tipo de flujo de efectivo que ha sido utilizado en la operación.

Tenga en cuenta que los tipos de flujo de efectivo son configurables por el usuario desde el catálogo "Flujos de efectivo"  |  Cómo sería el filtro si se quiere filtrar una función por los tipos de efectivo 310, Producto de préstamo.

**FiltroMovCont\_Flujo\("310"\)**
FiltroMovCont\_Numero CicloDeCostos  |  \(ListaCiclos\)  |  Filtra una función por el número del ciclo productivo en el que se encuentra el centro de costos.

Este filtro es usado en el módulo de costos y aplica esencialmente para AgroWin.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones que se realizaron en los centros de costos con el ciclo 2.

**FiltroMovCont\_Numero CicloDeCostos\("2"\)**
FiltroMovCont\_Etapa  |  \(ListaEtapas\)  |  Filtra una función por la etapa en que se encuentra el centro de costos.

Este filtro es usado en el módulo de costos y aplica esencialmente para AgroWin.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones que se realizaron en los centros de costos con la etapa 2.

**FiltroMovCont\_Etapa\("2"\)**
FiltroMovCont\_Estado  |  \(ListaEstados\)  |  Filtra una función por estado en que se encuentra el centro de costos.

Este filtro es usado en el módulo de costos y aplica esencialmente para AgroWin.  |  Para uso futuro.
FiltroMovCont\_Cuenta Presupuesto  |  \(ListaCuentas\)  |  Filtra una función con las operaciones en donde se imputan cuentas de presupuesto

|  Cómo sería el filtro si se quiere filtrar una función con las cuentas de
presupuesto de las cuentas de ingresos.

**FiltroMovCont\_Cuenta Presupuesto\("4%"\)**

Recuerde que el simbolo %, trae una cuenta padre y sus hijos.
FiltroMovCont\_CuentaFuente  |  \(ListaCuentas\)  |  Filtra una función con las cuentas que han sido afectadas por la operación de cierre de mes

|  Cómo sería el filtro si se quiere filtrar una función con las cuentas de
pasivo que fueron afectadas por un cierre de mes.

**FiltroMovCont\_Cuenta Fuente\("2%"\)**

Recuerde que el simbolo %, trae una cuenta padre y sus hijos.
FiltroMovCont\_Clase1  |  sListaClases  |  Filtra una función con las cuentas que exigen clase 1, tenga en cuenta que esta exigencia es determinada por el usuario desde la configuración de una cuenta.

|  Cómo sería el filtro si se quiere filtrar una función con las cuentas que
exigen la clase 1 "CLAS1"

**FiltroMovCont\_Clase1\("CLAS1"\)**


FiltroMovCont\_Clase2  |  sListaClases  |  Filtra una función con las cuentas que exigen clase 2, tenga en cuenta que esta exigencia es determinada por el usuario desde la configuración de una cuenta.

|  Cómo sería el filtro si se quiere filtrar una función con las cuentas que
exigen la clase 2 "CLAS2"

**FiltroMovCont\_Clase2\("CLAS2"\)**


FiltroMovCont\_Banco  |  \(ListaBancos\)  |  Filtra una función con uno o más bancos determinados por el usuario, tenga en cuenta que el sistema cuenta con un catalogo de bancos el cual es configurado por el usuario.  |  Cómo sería el filtro si se quiere filtrar una función con el banco con código 1, CityBank.

**FiltroMovCont\_Banco\("1"\)**

Cómo sería el filtro si se quiere filtrar una función con los bancos con
código 1, CityBank y 2, Bancolombia.

**FiltroMovCont\_Banco\("1,2"\)**


FiltroMovCont\_Activo  |  ListaActivos  |  Filtra una función con uno o más activos determinados por el usuario.

|  Cómo sería el filtro si se quiere filtrar una función con el activo TRAC001

**FiltroMovCont\_Activo \("TRAC001"\)**


Cómo sería el filtro si se quiere filtrar una función con los activos TRAC001
y LOC001

**FiltroMovCont\_Activo\("TRAC001, LOC001"\)**


FiltroMovCont\_Actividad  |  \(Lista Actividades\)  |  Filtra una función con una o más actividades determinadas por el usuario.

|  Cómo sería el filtro si se quiere filtrar una función con la actividad 1,
producción de naranja.

**FiltroMovCont\_Actividad \("1"\)**


Cómo sería el filtro si se quiere filtrar una función con la actividad 1,
producción de naranja y 2 producción de manzana.

**FiltroMovCont\_Actividad \("1,2"\)**


FiltroMovCont\_Periodo  |  \(FechaIni; FechaFin\)  |  Filtra una función por la fecha de creación de la operación realizada.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
hechas el mes de enero de 2019.

**FiltroMovCont\_Periodo \(Fecha\(2019;1;1\); Fecha\(2019;1;31\)\)**


FiltroMovCont\_PeriodoFecha Pago  |  \(FechaIni; FechaFin\)  |  Filtra una función por la fecha de pago de una cuenta por cobrar o por pagar.

|  Cómo sería el filtro si se quiere filtrar una función por la fecha de pago
de las cuentas por cobrar o por pagar del mes de enero de 2019

**FiltroMovCont\_PeriodoFecha Pago\(Fecha\(2019;1;1\); Fecha\(2019;1;31\)\)**


FiltroMovCont\_AccionesMes  |  \(Lista tipos de movimientos auxiliares\)  |  Filtra una función excluyendo los movimientos generados por las acciones automáticas de fin de mes.

Tenga en cuenta que los códigos de movimientos de acciones de fin de mes son:

• 106: Movimiento auxiliar por causación de intereses en cierres de mes

• 201: Movimiento auxiliar de cierre de año

• 600: Movimiento auxiliar de traslado de saldos entre CCs

• 800: Movimiento auxiliar de autoactivación  |  Cómo sería el filtro si se quiere filtrar una función excluyendo todas las acciones de fin de mes:

**CNTMOVUN.ITDMOVAUX NOT IN \(201,600,800,106\)**


Movimiento de inventario
FiltroMovInv\_Empresa  |  \(ListaEmpresas\)  |  Filtra una función por las operaciones realizadas en una empresa en específico.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
realizadas en la empresa 1.

**FiltroMovInv\_Empresa\("1"\)**


FiltroMovInv\_Bodega  |  \(ListaBodegas\)  |  Filtra una función por las operaciones realizadas en una o varias bodegas en específico.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
realizadas en la bodega 3.

**FiltroMovInv\_Bodega\("3"\)**


FiltroMovInv\_Elemento  |  \(ListaElementos\)  |  Filtra una función por las operaciones realizadas con uno o varios elementos en específico.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
realizadas con el elemento "ELE1"

**FiltroMovInv\_Elemento\("ELE1"\)**


FiltroMovInv\_Tercero  |  \(ListaTeceros\)  |  Filtra una función por los terceros a los que se les vendió un elemento del inventario.

|  Cómo sería el filtro si se quiere filtrar una función por los terceros que
se les ha vendido algún producto y su código comienza en 1.

**FiltroMovInv\_Tercero\("1%"\)**

El simbolo % hace referencia a que puede ir cualquier valor despues de éste.


FiltroMovInv\_Vendedor  |  \(Lista Vendedores\)  |  Filtra una función por los terceros los cuales realizaron las ventas de algún elemento del inventario.  |  Cómo sería el filtro si se quiere filtrar una función por el vendedor 5425612

**FiltroMovInv\_Vendedor \("5425612"\)**


FiltroMovInv\_Vendedor2  |  \(Lista Vendedores\)  |  Filtra una función por los terceros que colaboraron en las ventas de algún elemento del inventario.

|  Cómo sería el filtro si se quiere filtrar una función por el vendedor2 con
código 5621452

**FiltroMovInv\_Vendedor2 \("5621452"\)**


FiltroMovInv\_PorcentajeIVA  |  \(Lista Porcentajes\)  |  Filtra una función por las operaciones en que se determine un porcentaje para el IVA.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones que se registro un porcentaje de iva de 8%

**FiltroMovInv\_PorcentajeIVA \("8"\)**


FiltroMovInv\_Porcentaje Descuento  |  \(Lista Porcentajes\)  |  Filtra una función por las operaciones en que se determine un porcentaje de descuento.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones que se les dió un porcentaje de descuento del 10%

**FiltroMovInv\_Porcentaje Descuento\("10"\)**


FiltroMovInv\_TipoProducto  |  \(sListaTipos\)  |  Filtra una función por el tipo de producto.

Tenga en cuenta que el tipo de producto es dado por el usuario al registrar la operación.  |  Cómo sería el filtro si se quiere filtrar una función por tipo de producto 1

**FiltroMovInv\_TipoProducto\("1"\)**


FiltroMovInv\_TipoSoporte  |  \(nListaTipos\)  |  Filtra una función por el documento en que se encuentra soportado.

Tenga en cuenta que los documento de soporte son configurados por el usuario desde el catálogo "Doc. soporte".  |  Cómo sería el filtro si se quiere filtrar una función por el documento de soporte 2 Factura de venta.

**FiltroMovInv\_TipoSoporte\("2"\)**


FiltroMovInv\_ClaseOperacion  |  \(nListaClases\)  |  Filtra una función según la naturaleza de la operación.

**Clases de operacion**
0 Naturaleza débito
1 Naturaleza crédito  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones con naturaleza débito.

**FiltroMovInv\_ClaseOperacion \("0"\)

**
FiltroMovInv\_Numero CicloDeCostos  |  \(ListaCiclos\)  |  Filtra una función por el número del ciclo productivo en el que se encuentra el centro de costos.

Este filtro es usado en el módulo de costos y aplica esencialmente para AgroWin.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones que se realizaron en los centros de costos con el ciclo 2.

**FiltroMovCont\_Numero CicloDeCostos\("2"\)**
FiltroMovInv\_Estado  |  \(ListaEstados\)  |  Filtra una función por estado en que se encuentra el centro de costos.

Este filtro es usado en el módulo de costos y aplica esencialmente para AgroWin.  |  Para uso futuro.
FiltroMovInv\_Etapa  |  \(ListaEtapas\)  |  Filtra una función por la etapa en que se encuentra el centro de costos.

Este filtro es usado en el módulo de costos y aplica esencialmente para AgroWin.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones que se realizaron en los centros de costos con la etapa 2.

**FiltroMovCont\_Etapa\("2"\)**
FiltroMovInv\_PorMesa  |  \(ListaMesas\)  |  Filtra una función por la mesa en la cual se está generando una factura.  |  Cómo sería el filtro si se quiere filtrar una función con la mesa 1,

**FiltroMovInv\_PorMesa\("1"\)**


Cómo sería el filtro si se quiere filtrar una función con la mesa 1 y 2,

**FiltroMovInv\_PorMesa\("1,2"\)**


FiltroMovInv\_Actividad  |  \(Lista Actividades\)  |  Filtra una función con una o más actividades determinadas por el usuario.

|  Cómo sería el filtro si se quiere filtrar una función con la actividad 1,
producción de naranja.

**FiltroMovInv\_Actividad\("1"\)**


Cómo sería el filtro si se quiere filtrar una función con la actividad 1,
producción de naranja y 2 producción de manzana.

**FiltroMovInv\_Actividad\("1,2"\)**


FiltroMovInv\_Año  |  \(ListaAños\)  |  Filtra una función por las operaciones realizadas en un año en específico.

|  Cómo sería el filtro si se quiere filtrar una función por las operaciones
realizadas en el año 2019.

**FiltroMovInv\_Año\("2019"\)**
FiltroMovInv\_Mes  |  \(ListaMeses\)  |  Filtra una función por las operaciones realizadas en un mes en específico.

Tenga en cuenta que el filtro realizará las operaciones con todos los meses de los años en que se encuentren las fechas de la función.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones realizadas en el mes de febrero.

**FiltroMovInv\_Mes\("2"\)**
FiltroMovInv\_Semana  |  \(ListaSemanas\)  |  Filtra una función por las operaciones realizadas en el número de una semana en específica.

Tenga en cuenta que el filtro realizará las operaciones con todas las semanas de los años en que se encuentren las fechas de la función.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones realizadas en la semana 9.

**FiltroMovInv\_Semana\("9"\)**
FiltroMovInv\_Dia  |  \(ListaDia\)  |  Filtra una función por las operaciones realizadas en un día en específico.

Tenga en cuenta que el filtro realizará las operaciones con todos los días de los años y meses en que se encuentren las fechas de la función.  |  Cómo sería el filtro si se quiere filtrar una función por las operaciones realizadas en los días 16.

**FiltroMovInv\_Dia\("16"\)**
Tipos de movimiento de inventario
FiltroSoloVentas  |  |  Filtra una función por solo las operaciones con el tipo de movimiento en el inventario Mov. de venta de producto.  |  Cómo sería el filtro si se quiere filtrar una función por solo las facturas de venta.

**FiltroSoloVentas\(\)**


FiltroSoloSaldosIniciales  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de inicialización de saldos de bodega/inventario.  |  Cómo sería el filtro si se quiere filtrar una función por solo los cargues iniciales de saldo.

**FiltroSoloSaldosIniciales\(\)**


FiltroSoloIngresosPorTraslados  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de ingresos de producto por traslado.  |  Cómo sería el filtro si se quiere filtrar una función por solo los ingresos de productos con concepto de traslado.

**FiltroSoloIngresosPor Traslados\(\)**


FiltroSoloIngresosPor DevolucionesEnVentas  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de ingresos de producto por devoluciones en venta.  |  Cómo sería el filtro si se quiere filtrar una función por solo los ingresos de productos con concepto de devolución en ventas.

**FiltroSoloIngresosPor DevolucionesEnVentas\(\)**


FiltroSoloIngresosPorAjustes  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de ajuste ingreso en bodega/inventario.  |  Cómo sería el filtro si se quiere filtrar una función por solo los ingresos de productos con concepto de ajuste.

**FiltroSoloIngresosPorAjustes\(\)**


FiltroSoloEmbodegamientos  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de ingreso de producto por embodegamiento.  |  Cómo sería el filtro si se quiere filtrar una función por solo los ingresos de productos con concepto de embodegamiento.

**FiltroSoloEmbodegamientos\(\)**


FiltroSoloEgresosPor DevolucionesEnCompras  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de egresos de producto por devoluciones en compras.  |  Cómo sería el filtro si se quiere filtrar una función por solo los egresos de productos con concepto de devolución en compras.

**FiltroSoloEgresosPor DevolucionesEnCompras\(\)**


FiltroSoloEgresosPorAjustes  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de ajuste egresos en bodega/inventario.  |  Cómo sería el filtro si se quiere filtrar una función por solo los egresos de productos con concepto de ajuste.

**FiltroSoloEgresosPorAjustes\(\)**


FiltroSoloEgresos  |  |  Filtra una función por dos tipos de movimiento de inventario:

Mov. de egreso de elementos y Mov. de egresos de elementos para consumo.  |  Cómo sería el filtro si se quiere filtrar una función por solo las salidas de productos en la empresa.

**FiltroSoloEgresos\(\)**


FiltroSoloConsumos  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario Mov. de egresos de elementos para consumo.  |  Cómo sería el filtro si se quiere filtrar una función por solo los consumos hechos en la empresa.

**FiltroSoloConsumos\(\)**


FiltroSoloCompras  |  |  Filtra una función por solo las operaciones con el tipo de movimiento de inventario: "Mov. de ingreso de productos por compra".  |  Cómo sería el filtro si se quiere filtrar una función por solo las compras realizadas en la empresa.

**FiltroSolocompras\(\)**


Especializados
FechaParaFiltros  |  \(Fecha\)  |  Filtra una función por la fecha hasta donde se van a realizar los cálculos.

Se recomienda utilizar la función fecha, así se evitan confusiones entre meses
y días.

Ej. **Fecha\(2020;02;28\)** |  Cómo sería el filtro si se quiere que una función realice los cálculos hasta el 10/Feb/2020.

**FechaParaFiltros\(Fecha\(2020;02; 10\)\)**


Filtros\_OR  |  \( Filtro1; Filtro2; Filtro3; ... \)  |  Filtra una función con más de un filtro, realizando los cálculos con almenos un filtro.  |  Cómo filtrar una función para que tenga en cuenta los terceros de colombia o sean terceros con un perfíl "PERF1".

**Filtros\_OR\( FiltroTercero\_Pais\("169"\) ;
FiltroTercero\_Perfil\("PERF1"\)\) **
Filtros\_AND  |  \( Filtro1; Filtro2; Filtro3; ... \)  |  Filtra una función con más de un filtro, realizando los cálculos con todos los filtros.  |  Cómo filtrar una función para que solo tenga en cuenta los terceros de colombia y realice los cálculo hasta el 10 de feb de 2018.

**Filtros\_AND\( FiltroTercero\_Pais\("169"\) ;
FechaParaFiltros\(fecha\(2018;02; 10\)\)\) **
Filtro\_GrupoActividad  |  \(ListaGrupos\)  |  Filtra una función por el agrupador de varias actividades.  |  Cómo sería el filtro para filtrar una función en un grupo determinado de actividades.

**Filtro\_GrupoActividad\("GACT1"\)**


Filtro\_GrupoCentroDeCostos  |  \(ListaGrupos\)  |  Filtra una función por el agrupador de varios centros de costos.  |  Cómo sería el filtro para filtrar una función en el agrupador de varios centros de costos

**Filtro\_GrupoActividad \("CCAGRUPADOR1"\)**

---

ContaExcel 2.0

¿Qué es?

Es un programa de hojas de cálculo el cual permite realizar operaciones
relacionadas en cualquier ámbito de trabajo.

ContaExcel 2.0 contiene más de 250 funciones que permiten trabajar en hojas de
cálculo con los registros hechos en ContaPyme® gracias a una conexión estable
entre ellos, con esto se podrá obtener gran variedad de cálculos para crear
informes, estadísticas y/o análisis personalizados.


Entorno de ContaExcel 2.0

Conectar con el sistema

Para empezar a realizar los cálculos con los datos registrados en ContaPyme®
es necesario realizar la conexión a la base de datos, solo es necesario seguir
los siguientes pasos:

1 - Ingresar a la pestaña ContaPyme® ubicada en la parte superior del
programa.
2 - Realizar la conexión a la base de datos desde el botón "Conectar con
ContaPyme"
3 - Llenar los datos solicitados para la conexión

    * Servidor de datos
    * Usuario
    * Contraseña
    * En caso de tener diferentes áreas de trabajo
      * Área de trabajo
      * Licencia

4 - Listo, ya podrá utilizar los datos registrados en ContaPyme® desde
ContaExcel 2.0

Entorno

Luego de realizar la conexión con el sistema es muy importante verificar el
entorno en que se encuentra la base de datos, de ser necesario se podrá
realizar los cambios requeridos por el usuario.

Área de trabajo

Inicialmente ContaExcel 2.0, tomará el área de trabajo configurada en
ContaPyme®, pero ésta puede ser configurada si se desea.

Para verificar el área de trabajo activa, se debe dirigirse a la pestaña
"Contapyme" y en la parte inferior del botón "Cambiar de área de trabajo"
podrá ver el área activa de trabajo, además desde el botón podrá configurarla
el área deseada.

Empresa de trabajo

Inicialmente ContaExcel 2.0, tomará la empresa de trabajo configurada en
ContaPyme®, pero ésta puede ser configurada si se desea. Tenga en cuenta que
todas las funciones a las que no se les especifique el argumento IEmp,
asumirán la empresa de trabajo configurada del momento.

Para verificar la empresa de trabajo solamente debe dirigirse a la parte
inferior izquierda del programa, allí podra verificar y de ser necesario
configurar la empresa de trabajo deseada.

Fecha de trabajo

Inicialmente ContaExcel 2.0, tomará la fecha de trabajo configurada en
ContaPyme®, pero ésta puede ser configurada si se desea. Tenga en cuenta que
todas las funciones que tienen el argumento FechaFin opcional, asumirán la
fecha de trabajo configurada del momento.

Para verificar la fecha de trabajo solamente debe dirigirse a la parte
inferior izquierda del programa, allí podra verificar y de ser necesario
configurarla.

---

Tips

Formulas de ContaExcel 2.0

En ContaExcel podrá encontrar todas las fórmulas en la pestaña "FÓRMULAS",
allí podrá insertar en la hoja de cálculo la fórmula que desee, tanto las
estandar como las de conexión con el sistema.


Las funciones se encuentran divididas en
categorías, al seleccionar la fórmula que se desea, inmediatamente se añadirá
a la celda que esté seleccionada, si usted tiene la ayuda visible, ésta
mostrará la función que acaba de insertar.

Tenga en cuenta que la ayuda debe estar visible para mostrar la fórmula que se
inserta, además si selecciona una fórmula estandar, es necesario tener
internet, ya que la información proporcionada para la ayuda de estas funciones
es elaborada por Microsoft Excel.

Elaborar una función

Para empezar a fórmular en ContaExcel 2.0, solo debe ingresar el signo igual
\(=\) al comienzo de la celda que desea fórmular, solamente indicando igual
podrá elabora funciones dentro de cualquier celda.

|  A  |  B  |  C  |  D
---|---|---|---|---
1  |  |  |  |
2  |  |  5  |  2  |
3  |  |  |  |
4  |  |  Sumar  |  = B2 \+ C2 |  |
5  |  |  |  |

Seleccionar celda para el cálculo

En ContaExcel 2.0 debe seleccionar la celda que quiere utilizar para un
cálculo con el mouse, tenga en cuenta que si se mueve con las flechas del
teclado simplemente cambiará la celda en la que está posicionado y no tomará
ninguno celda para el cálculo.


Mover celdas seleccionadas

Para mover o cambiar las celdas que ya se han selecionado en una fórmula, se
debe realizar el cambio digitando la celda con el teclado o arrastrando la
celda que se desea cambiar, si se presiona clic fuera de la celda del calculo
o se precionan las flechas del teclado, simplemente se cambiara la celda de
selecciona y no podra realizar los cambios necesarios.

|  A  |  B  |  C  |  D
---|---|---|---|---
1  |  |  |  |
2  |  |  5  |  2  |
3  |  |  |  |
4  |  |  Sumar  |  = B2 \+ C2 |  |
5  |  |  |  |



Fijar celdas

Fijar la fila y columna de una celda

Para fijar completamente una celda, dejandola inmolizada para realizar los
cálculos que deseemos, solo hay que realizar los siguientes pasos:

1\. Determinar la celda donde deseamos realizar la fórmula
2\. Seleccionar la celda que queremos fijar
3\. Poner el signo pesos \($\) al comienzo de la letra y el número
identificador de la celda que queremos fijar


**Ejemplo**
A continuación se fija la fila de la celda C2, ya que se quiere determinar el
23% de todos los valores en la tabla.

|  A  |  B  |  C  |  D
---|---|---|---|---
1  |  |  |  |
2  |  |  Porcentaje  |  0.23  |
3  |  |  |  |
4  |  Valores  |  12.000  |  = B2 \+ $C$2 |
5  |  |  15.000  |  |
6  |  |  17.000  |  |
7  |  |  21.000  |  |
8  |  |  32.000  |  |
9  |  |  45.000  |  |
10  |  |  |  |

Luego de fijarla la celda se selecciona la celda donde se realizó la fórmula y
se arrastra para calcular todos los resultados.


Fijar solamente la columna de una celda

Para fijar la columna de una celda es muy sencillo, solo hay que realizar los
siguientes pasos:

1\. Determinar la celda donde deseamos realizar la fórmula
2\. Seleccionar la celda que queremos fijar
3\. Poner el signo pesos \($\) al comienzo del identificador de la celda que
queremos fijar

**Ejemplo**
A continuación se fija la columna de la celda C2

|  A  |  B  |  C  |  D
---|---|---|---|---
1  |  |  |  |
2  |  |  5  |  2  |
3  |  |  |  |
4  |  |  Sumar  |  = B2 \+ $C2 |
5  |  |  |  |

Fijar solamente la fila de una celda

Para fijar la fila de una celda hay que realizar los siguientes pasos:

1\. Determinar la celda donde deseamos realizar la fórmula
2\. Seleccionar la celda que queremos fijar
3\. Poner el signo pesos \($\) al comienzo del número identificador de la
celda que queremos fijar

**Ejemplo**
A continuación se fija la fila de la celda C2

|  A  |  B  |  C  |  D
---|---|---|---|---
1  |  |  |  |
2  |  |  5  |  2  |
3  |  |  |  |
4  |  |  Sumar  |  = B2 \+ C$2 |
5  |  |  |  |




Cálculo de las funciones

ContaExcel 2.0 cuenta con dos tipos de cálculo, automático y manual, el
usuario podrá habilitar el cálculo que se acomode a sus necesidades.

Para configurar el cálculo de las funciones debe dirigirse a la pestaña
fórmulas, en la parte superior derecha encontrará la opción "Cálculo
automatico" allí podra habilitar o deshabilitar la opción.

Cálculo automático

Al activar la opción de cálculo automático, ContaExcel realizará los cálculos
de forma inmediata en todas las funciones de la hoja de cálculo que se está
trabajando, se recomienda utilizar este tipo de cálculo cuando la formulación
de la hoja no es muy compleja y sus operaciones son sencillas.

Cálculo manual

Al activar la opción de cálculo manual, ContaExcel realizará los cálculos de
todas las funciones en la hoja de cálculo en que se está trabajando solo
cuando se le indique, se recomienda utilizar este tipo de cálculo cuando la
formulación de la hoja es compleja o se tienen muchas fórmulas para calcular,
esta opción evita demoras en el programa.

Para indicarle al sistema el momento de realizar los cálculos solo es
necesario presionar la tecla **F9** o también podrá indicarlo ubicándose en la
pestaña fórmulas y dirigiéndose a la parte superior derecha en la opción
"Recalcular fórmulas"

---

=CantidadConsumos \( \)

Descripción

Esta función determina la cantidad que se ha consumido un elemento en un
periodo de tiempo determinado, tenga en cuenta que esta función se basa en el
sistema de inventarios de ContaPyme®.

Si desea conocer el costo por concepto de consumo de un elemento, vea la
función **CostoConsumos**

Otras aplicaciones

Con esta función también podra:

  * Determinar la cantidad de consumos imputados a determinado centro de costos específico de la empresa.
  * Determinar la cantidad de consumos de los elementos de una bodega en específico.

Sintaxis

|  =CantidadConsumos  |  \(** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula los consumos registrados en todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Calcula los consumos registrados de todos los elementos del inventario de ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha que se registró el consumo**.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa a la cual pertenece el elemento del que se desea conocer la cantidad consumida.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula los consumos regsitrados en todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula los consumos registrados en todas las imputaciones a los centros de costos creados en ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadConsumos\( 1**;** "DSD-500","QWE-10"**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1020**;** 1010 \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de los siguientes consumos en el inventario:

\# de documento  |  Fecha del consumo  |  Cód Elemento  |  Bodega origen  |  Cód. Centro de Costos Destino  |  Cód. Centro de Costos Productor \(Origen\)  |  Cantidad Consumo
---|---|---|---|---|---|---
1  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  |  15
2  |  15/Ene/2017  |  QWE-10  |  2  |  1020  |  2020  |  25
1  |  10/Feb/2017  |  DSD-500  |  1  |  1020  |  |  12
1  |  28/Feb/2017  |  DSD-500  |  1  |  1010  |  |  8

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.

|  =CantidadConsumos  |  \(** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cantidad de consumos del producto DSD-500 desde el 1 de enero de 2017 al 30 de marzo de 2017.  |  =CantidadConsumos\( **;** "DSD-500"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;3;30\)**;** 1 \)  |  35
Cantidad de consumos del producto QWE-10 en el año 2017  |  =CantidadConsumos \( **;** "QWE-10"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1 \)  |  25
Cantidad de consumos salientes del centro de costos productor 2020 en el año 2017  |  =CantidadConsumos \( **;** **;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** 2020\)  |  23

---

=CantidadConsumosFiltro \( \)

Descripción

Esta función determina la cantidad de consumos de un elemento con un filtro
determinado, tenga en cuenta que esta función se basa en el sistema de
inventarios de ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podra:

  * Esta función determina la cantidad de consumos de un elemento del inventario en un periodo de tiempo determinado.
  * Determinar la cantidad de consumos imputados a determinado centro de costos de la empresa.
  * Determinar la cantidad de consumos de los elementos de una bodega determinada.

Sintaxis

|  =CantidadConsumosFiltro  |  \(** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el consumo de todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo por el cual se realiza la consulta, filtrando por la **fecha de registro del consumo**.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa a la cual pertenece el elemento del que se desea conocer la cantidad consumida.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula los consumos de todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula los consumos de todas las imputaciones a los centros de costos creados en ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadConsumosFiltro\( 1**;** Filtro\(\)**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1020**;** 1010 \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de los siguientes consumos en el inventario:

\# de documento  |  Fecha del consumo  |  Documento soporte  |  Cód Elemento  |  Bodega origen  |  Cód. Centro de Costos Destino  |  Tipo producto  |  Cantidad Consumo
---|---|---|---|---|---|---|---
1  |  5/Ene/2017  |  10 - Planilla consumo  |  DSD-500  |  1  |  1010  |  1  |  15
2  |  15/Ene/2017  |  10 - Planilla consumo  |  QWE-10  |  2  |  1020  |  4  |  25
1  |  10/Feb/2017  |  10 - Planilla consumo  |  DSD-500  |  1  |  1020  |  1  |  12
1  |  28/Feb/2017  |  10 - Planilla consumo  |  DSD-500  |  1  |  1010  |  1  |  8

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.

|  =CantidadConsumosFiltro  |  \(** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cantidad de consumos del producto DSD-500 desde el 1 de enero de 2017 al 30 de marzo de 2017.  |  =CantidadConsumosFiltro\( 1**;** FiltroMovInv\_Elemento\("DSD-500"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;3;30\)**;** 1 \)  |  35
Cantidad de consumos de los registros con el documento de soporte 10 - planilla de consumo en el año 2017.  |  =CantidadConsumosFiltro \( **;** FiltroMovInv\_TipoSoporte\("10"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1 \)  |  35
Cantidad de consumos salientes con el tipo de producto 4 en el año 2017.  |  =CantidadConsumosFiltro \( **;** FiltroMovInv\_TipoProducto\("4"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** **;** \)  |  25



\*\[FILTROS: 75,76,83,95,78\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CostoConsumos \( \)

Descripción

Esta función determina los costos de un elemento del inventario por concepto
de consumos en un periodo de tiempo determinado. Tenga en cuenta que la
función se basa en el sistema de inventarios de ContaPyme®.

Si desea conocer la cantidad consumida de un elemento de inventario vea la
función **CantidadConsumos**

Otras aplicaciones

Con esta función también podrá:

  * Determinar el costo de los consumos imputados a un centro de costos en específico de la empresa.
  * Determinar el costo del consumo de los elementos de inventario de una bodega en específico.

Sintaxis

|  =CostoConsumos  |  \(** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el costo de los consumos registrados de todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Calcula el costo de los consumos registrados de todos los elementos del inventario de ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de registro del consumo**.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa a la cual pertenece el elemento del que se desea conocer el costo de consumirlo.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula el costo de los consumos registrados de todos los centros de costos creados en el explorador gráfico de el explorador gráfico de ContaPyme®.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula el costo de los consumos registrados de todos los centros de costos productores del explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el cálculo.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoConsumos\( 1**;** "DSD-500","QWE-10"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1020**;** 1020**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de los siguientes consumos en el inventario:

\# de documento  |  Fecha del consumo  |  Cód Elemento  |  Bodega origen  |  Cód. Centro de Costos Destino  |  Cód. Centro de Costos Productor \(Origen\)  |  Cantidad Consumo  |  Costo Consumo
---|---|---|---|---|---|---|---
1  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  |  15  |  $ 210.000
2  |  15/Ene/2017  |  QWE-10  |  2  |  1020  |  2020  |  25  |  $ 350.000
1  |  10/Feb/2017  |  DSD-500  |  1  |  1020  |  |  12  |  $ 225.000
1  |  28/Feb/2017  |  DSD-500  |  1  |  1010  |  |  8  |  $ 180.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoConsumos \( IBodega\* **;** IElemento\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor**;** ICCDestino \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo por haber consumido el producto DSD-500 desde el 1 de enero de 2017 al 30 de marzo de 2017?.  |  =CostoConsumos\( **;** "DSD-500"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;3;30\)**;** 1\)  |  $ 615.000
¿Cuál es el costo por haber consumido el producto QWE-10 el 15/Ene/2017 de la bodega 2?.  |  =CostoConsumos \( 2**;** "QWE-10"**;** **;** Fecha\(2017;1;15\)**;** 1\)  |  $ 350.000
¿Cuál fue el costo de los consumos imputados al centro de costos 1010 en el mes de febrero de 2017?.  |  =CostoConsumos \( **;** **;** Fecha\(2017;2;1\)**;** Fecha\(2017;2;28\)**;** 1**;** 1010**;** \)  |  $ 180.000

---

=CostoConsumosFiltro \( \)

Descripción

Esta función determina los costo de consumidos de un elemento del inventario
con un filtro determinado.

Si desea conocer la cantidad de consumos vea la función **CantidadConsumos**

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Esta función determina los costo de consumidos de un elemento del inventario en un periodo de tiempo determinado.
  * Determinar el costo de los consumos imputados a determinado centro de costos de la empresa.
  * Determinar el costo consumido de los elementos de una bodega determinada.

Sintaxis

|  =CostoConsumosFiltro  |  \(** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el costo de los consumos registrados a todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha del consumo**.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula el costo de los consumos registrados a todos los centros de costos creados en el explorador gráfico de el explorador gráfico de ContaPyme®.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula el costo de los consumos registrados de todos los centros de costos productores del explorador gráfico de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el cálculo.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoConsumosFiltro\( 1**;** Filtro\(\)**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** 1020**;** 1020**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de los siguientes consumos en el inventario:

\# de documento  |  Tipo documento  |  Fecha del consumo  |  Cód Elemento  |  Cód. Centro de Costos Destino  |  Tipo producto  |  Cantidad Consumo  |  Costo Consumo
---|---|---|---|---|---|---|---
1  |  10 - planilla consumo  |  5/Ene/2017  |  DSD-500  |  1010  |  1  |  15  |  $ 210.000
2  |  10 - planilla consumo  |  15/Ene/2017  |  QWE-10  |  1020  |  4  |  25  |  $ 350.000
1  |  10 - planilla consumo  |  10/Feb/2017  |  DSD-500  |  1020  |  1  |  12  |  $ 225.000
1  |  10 - planilla consumo  |  28/Feb/2017  |  DSD-500  |  1010  |  1  |  8  |  $ 180.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoConsumosFiltro \( IBodega\* **;** Filtro\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor**;** ICCDestino \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el costo por haber consumido el producto DSD-500 desde el 1 de enero de 2017 al 30 de marzo de 2017.  |  =CostoConsumosFiltro\( **;** FiltroMovInv\_Elemento\("DSD-500"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;3;30\)**;** 1\)  |  $ 615.000
Cuál es el costo por haber consumido los elementos de la bodega 2 y que en su operación estan soportados por la planilla de consumo.  |  =CostoConsumosFiltro \( 2**;** FiltroMovInv\_TipoSoporte\("10"\)**;** **;** Fecha\(2017;1;15\)**;** 1\)  |  $ 350.000
Cuál fue el costo de los consumos imputados al centro de costos 1010 en el mes de febrero de 2017.  |  =CostoConsumosFiltro \( **;** **;** Fecha\(2017;2;1\)**;** Fecha\(2017;2;28\)**;** 1**;** 1010**;** \)  |  $ 180.000



\*\[FILTROS: 75,76,83,95,78\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CostoPromedioElemento \( \)

Descripción

Esta función determina el costo promedio ponderado de un elemento, a una fecha
determinada. Tenga en cuenta que esta función se basa en el sistema de
inventarios de ContaPyme®.

Si desea conocer el costo total de las entradas de un elemento, vea la función
**CostoEntradas**.

Sintaxis

|  =CostoPromedioElemento  |  \(** IBodega\*; IElemento\*; FechaFin\*; IEmp\*; ICCProductor\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Realiza los cálculos con todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Realiza los cálculos con todos los elementos del inventario de ContaPyme®.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Determina la fecha hasta donde realiza el cálculo.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa a la cual pertenece el elemento del que se desea conocer su costo promedio ponderado.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Realiza los cálculos con todos los centros de costos productores del explorador gráfico de empresas de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoPromedioElemento\( 1**;** "DSD-500","QWE-10"**;**
Fecha\(2015;12;31\)**;** 1**;** "1020,1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes compras.

\# de documento  |  Fecha del compra  |  Cód. Elemento  |  Bodega destino  |  Cód. CCProductor \(Origen\)  |  Cantidad  |  Costo unidad  |  Costo total
---|---|---|---|---|---|---|---
1  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  3  |  $2.500.000  |  $7.500.000
2  |  15/Ene/2017  |  QWE-10  |  2  |  1020  |  2  |  $1.200.000  |  $3.600.000
1  |  10/Feb/2017  |  EQP-007  |  1  |  1020  |  4  |  $6.100.000  |  $18.300.000
1  |  28/Feb/2017  |  DSD-500  |  1  |  1010  |  1  |  $2.600.000  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoPromedioElemento \( IBodega\* **;** IElemento\* **;** FechaFin\* **;**
IEmp\* **;** ICCProductor**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo promedio del elemento DSD-500 para el 10 de enero de 2017?.  |  =CostoPromedioElemento\( **;** "DSD-500"**;** Fecha\(2017;1;10\)**;** 1 \)  |  $\[\[:alnum:\]\].500.000
¿Cuál es el costo promedio del elemento DSD-500 para el 1 de marzo de 2017?.  |  =CostoPromedioElemento \( **;** "QWE-10"**;** Fecha\(2017;3;1\)**;** 1 \)  |  $\[\[:alnum:\]\].525.000
¿Cuál es el costo promedio del elemento EQP-007 ubicado en la bodega 1 para el 1 de marzo de 2017?.  |  =CostoPromedioElemento \( 1**;** "EQP-007"**;** Fecha\(2017;3;1\)**;** 1****\)  |  $\[\[:alnum:\]\].100.000

---

=CostoPromedioElementoFiltro \( \)

Descripción

Esta función determina el costo promedio de un elemento con un filtro
determinado. Tenga en cuenta que esta función se basa en el sistema de
inventarios de ContaPyme®.

Si desea conocer el costo total de las entradas de un elemento, vea la función
**CostoEntradas**.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =CostoPromedioElementoFiltro  |  \(** IBodega\*; Filtro\*; FechaFin\*; IEmp\*; ICCProductor\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Realiza los cálculos con todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se realiza el cálculo.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa a la cual pertenece el elemento del que se desea conocer su costo promedio ponderado.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Realiza los cálculos con todos los centros de costos productores del explorador gráfico de empresas de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoPromedioElementoFiltro\( 1**;** Filtro\(\)**;**
Fecha\(2015;12;31\)**;** 1**;** "1020,1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes compras.

\# de documento  |  Tipo documento  |  Fecha de la compra  |  Cód. Elemento  |  Tipo producto  |  Cantidad  |  Costo unidad  |  Costo total
---|---|---|---|---|---|---|---
1  |  1-Factura de compra  |  5/Ene/2017  |  DSD-500  |  1  |  3  |  $2.500.000  |  $7.500.000
2  |  1-Factura de compra  |  15/Ene/2017  |  QWE-10  |  2  |  2  |  $1.200.000  |  $2.400.000
1  |  1-Factura de compra  |  10/Feb/2017  |  EQP-007  |  1  |  4  |  $6.100.000  |  $24.400.000
1  |  1-Factura de compra  |  28/Feb/2017  |  DSD-500  |  1  |  1  |  $2.600.000  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoPromedioElementoFiltro \( IBodega\* **;** Filtro\* **;** FechaFin\*
**;** IEmp\* **;** ICCProductor**;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo promedio del elemento DSD-500 al 10 de enero de 2017?.  |  =CostoPromedioElementoFiltro\( **;** FiltroMovInv\_Elemento\("DSD-500"\)**;** Fecha\(2017;1;10\)**;** 1 \)  |  $2.500.000
¿Cuál es el costo promedio de los elementos con el documento de soporte 1 - factura de compra en el año 2017?.  |  =CantidadConsumosFiltro \( **;** FiltroMovInv\_TipoSoporte\("10"\)**;** Fecha\(2017;12;31\)**;** 1 \)  |  $3.690.000
¿Cuál es el costo promedio de los elementos con el tipo de producto 2 en el año 2017?.  |  =CantidadConsumosFiltro \( **;** FiltroMovInv\_TipoProducto\("2"\)**;** Fecha\(2017;12;31\)********\)  |  $1.200.000



\*\[FILTROS: 75,76,83,95,78\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CantidadEntradas \( \)

Descripción

Esta función determina la cantidad de entradas de un elemento del inventario,
registrados en el sistema de inventarios de ContaPyme®.

Otras aplicaciones

Con esta función también podrá:

  * Determinar las entradas de varios elementos de inventario en un periodo determinado.
  * Determinar las entradas de todos los elementos de inventario a determinada bodega o centro de costos de la empresa.

Sintaxis

|  =CantidadEntradas  |  \(** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula la cantidad de elementos que entran a todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Determina todos los elementos que entran al inventario de ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de la entrada** del elemento de inventario.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula la cantidad de elementos producidos por todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® que se indican como productor en las operaciones de embodegamiento, transformación de productos, entre otros.  |  Calcula la cantidad de elementos producido por todos los centros de costos productores creados en ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadEntradas\( 1**;** "DSD-500","QWE-10"**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1020**;** 1010 \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de la compra de los siguientes elementos del inventario.

\# de documento  |  Fecha del compra  |  Cód. Elemento  |  Bodega destino  |  Cód. CCProductor \(Origen\)  |  Cantidad  |  Costo total
---|---|---|---|---|---|---
1  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  35  |  $2.500.000
2  |  15/Ene/2017  |  QWE-10  |  1  |  |  28  |  $1.200.000
3  |  10/Feb/2017  |  EQP-007  |  1  |  1020  |  41  |  $6.100.000
4  |  28/Feb/2017  |  DSD-500  |  2  |  1010  |  17  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadEntradas \( IBodega\* **;** IElemento\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor\* **;** ICCDestino\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántas entradas del elemento DSD-500 se han generado en el año 2017?.  |  =CantidadEntradas \( **;** "DSD-500"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**** **** \)  |  52
Determinar ¿cuántas entradas del elemento "DSD-500" se han generado en el mes de febrero 2017?.  |  =CantidadEntradas \( **;** "DSD-500"**;** Fecha\(2017;2;1\)**;** Fecha\(2017;2;28\)**;** 1**** **** \)  |  17
Determinar ¿cuántas entradas se han generado en la bodega 1 en el mes de enero de 2017?.  |  =CantidadEntradas \( 1**;** **;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)**;** 1**** **** \)  |  104

---

=CantidadEntradasFiltro \( \)

Descripción

Esta función determina la cantidad de entradas de un elemento del inventario
con un filtro determinado, registrados en el sistema de inventarios de
ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Determinar las entradas de varios elementos de inventario en un periodo determinado.
  * Determinar las entradas de todos los elementos de inventario a determinada bodega o centro de costos de la empresa.

Sintaxis

|  =CantidadEntradasFiltro  |  \(** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula la cantidad de elementos que entran a todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No filtra la función por ningún filtro.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de la entrada** del elemento de inventario.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula la cantidad de elementos producido por todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® que se indican como productor en las operaciones de embodegamiento, transformación de productos, entre otros.  |  Calcula la cantidad de elementos producido por todos los centros de costos productores creados en ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadEntradasFiltro\( 1**;** Filtro\(\)**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** "1020","1010" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de la entrada de los siguientes elementos del inventario.

Tipo de movimiento  |  Fecha del compra  |  Cód. Elemento  |  Bodega destino  |  Cód. CCProductor \(Origen\)  |  Cantidad  |  Costo total
---|---|---|---|---|---|---
3010 Ingreso saldos  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  35  |  $2.500.000
3006 Compra  |  15/Ene/2017  |  QWE-10  |  1  |  |  28  |  $1.200.000
3006 Compra  |  10/Feb/2017  |  EQP-007  |  1  |  1020  |  41  |  $6.100.000
3010 Ingreso saldos  |  28/Feb/2017  |  DSD-500  |  2  |  1010  |  17  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadEntradasFiltro \( IBodega\* **;** Filtro\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor\* **;** ICCDestino\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuántas entradas del elemento DSD-500 se han generado en el año 2017.  |  =CantidadEntradasFiltro\( **;** FiltroMovInv\_Elemento\("DSD-500"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**** **** \)  |  52
Determinar cuántas entradas se han generado con el tipo de movimiento 3006 en el mes de febrero 2017  |  =CantidadEntradasFiltro \( **;** FiltroSolocompras\(\)**;** Fecha\(2017;2;1\)**;** Fecha\(2017;2;28\)**;** 1**** **** \)  |  41



\*\[FILTROS: 75,76,83,95,78,23\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CostoEntradas \( \)

Descripción

Esta función determina el costo de las entradas de un elemento del inventario,
a una fecha determinada. Esta función se basa en el sistema de inventarios de
ContaPyme®.

Para conocer el costo de solamente un elemento, vea la función
**CostoPromedioElemento**.

Otras aplicaciones

Con esta función tambien podrá:

  * Determinar el costo de las entradas a una bodega determinada.
  * Determinar el costo de las entradas, imputadas a un centros de costos productor determinado de la empresa.

Sintaxis

|  =CostoEntradas  |  \(** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el costo de los elementos que entran a todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Calcula el costo de todos los elementos que entran al inventario creado en ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo desde el cual se calculará el costo de las cantidades del elemento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula el costo de los elementos producidos por todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® que se indican como productor en las operaciones de embodegamiento, transformación de productos, entre otros.  |  Calcula el costo de los elementos producidos por todos los centros de costos productores creados en ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoEntradas\( 1**;** "DSD-500","QWE-10"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** **;** "1020","1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de la compra de los siguientes elementos del inventario.

\# de documento  |  Fecha del compra  |  Cód. Elemento  |  Bodega destino  |  Cód. CCProductor \(Origen\)  |  Cantidad  |  Costo unidad  |  Costo total
---|---|---|---|---|---|---|---
1  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  3  |  $2.500.000  |  $7.500.000
2  |  15/Ene/2017  |  QWE-10  |  2  |  1020  |  2  |  $1.200.000  |  $2.400.000
1  |  10/Feb/2017  |  EQP-007  |  1  |  1020  |  4  |  $6.100.000  |  $24.400.000
1  |  28/Feb/2017  |  DSD-500  |  1  |  1010  |  1  |  $2.600.000  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoEntradas \( IBodega\* **;** IElemento\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor\* **;** ICCProductor\* **;**
BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo de las entradas del elemento DSD-500 al 10 de enero de 2017?.  |  =CostoEntradas\( **;** "DSD-500"**;** **;** Fecha\(2017;1;1\)**** **** **** \)  |  $7.500.000
¿Cuál es el costo de las entradas del elemento DSD-500 desde el 1 de enero al 1 de marzo de 2017, en contabilización NIIF?.  |  =CostoEntradas \( **;** "DSD-500"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;3;1\)**;** 1**;** **;** **;** "F" \)  |  $ 10.100.000
¿Cuál es el costo de las entradas a la bodega 1 en el año 2017?.  |  =CostoEntradas \( 1**;** "DSD-500"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** **;** **;** "F" \)  |  $ 34.500.000

---

=CostoEntradasFiltro \( \)

Descripción

Esta función determina el costo de las entradas de un elemento del inventario,
a una fecha, con un filtro determinado. Tenga en cueta que esta función se
basa en el sistema de inventarios de ContaPyme®.

Para conocer el costo de solamente un elemento, vea la función
**CostoPromedioElemento**.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función tambien podrá:

  * Determinar el costo de las entradas de un elemento en un periodo de tiempo dado.
  * Determinar el costo de las entradas a una bodega determinada.
  * Determinar el costo de las entradas, imputadas a un centro de costos productor deteminado de la empresa.

Sintaxis

|  =CostoEntradasFiltro  |  \(** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el costo de los elementos que entran a todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo desde el cual se calculará el costo de las cantidades del elemento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula el costo de los elementos que entran a todos los centros de costos productores de ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® que se indican como productor en las operaciones de embodegamiento, transformación de productos, entre otros.  |  Calcula el costo de los elementos producidos por todos los centros de costos productores creados en ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoEntradasFiltro\( 1**;** Filtro\( \)**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** **;** "1020","1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® del ingreso de los siguientes elementos del inventario.

Tipo de documento  |  Tipo producto  |  Fecha  |  Cód. Elemento  |  Bodega destino  |  Cantidad  |  Costo unidad  |  Costo total
---|---|---|---|---|---|---|---
1-Factura compra  |  1  |  5/Ene/2017  |  DSD-500  |  1  |  3  |  $2.500.000  |  $7.500.000
7-Comprobante de ajuste  |  2  |  15/Ene/2017  |  QWE-10  |  2  |  2  |  $1.200.000  |  $2.400.000
1-Factura compra  |  1  |  10/Feb/2017  |  EQP-007  |  1  |  4  |  $6.100.000  |  $24.400.000
1-Factura compra  |  2  |  28/Feb/2017  |  DSD-500  |  1  |  1  |  $2.600.000  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoEntradasFiltro \( IBodega\* **;** Filtro\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor\* **;** ICCDestino\* **;** BLocal\*
\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo de las entradas del elemento DSD-500 al 10 de enero de 2017?.  |  =CostoEntradasFiltro\( **;** FiltroMovInv\_Elemento\("DSD-500"\)**;** **;** Fecha\(2017;1;1\)**** **** **** \)  |  $ 7.500.000
¿Cuál es el costo de las entradas de los elemento tipo de producto 2 en el año de 2017, en contabilización NIIF?.  |  =CostoEntradasFiltro\( **;** FiltroMovInv\_TipoProducto\("2"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** **;** **;** "F" \)  |  $ 5.000.000
¿Cuál es el costo de las entradas de los elementos con el docuemento de soporte 1 en el año 2017?.  |  =CostoEntradasFiltro\( **;** FiltroMovInv\_TipoSoporte\("1"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**** **** **** **** \)  |  $ 34.500.000



\*\[FILTROS: 75,76,83,95,78,23\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CantidadExistencias \( \)

Descripción

Esta función determina la cantidad de existencias disponibles de un elemento
del inventario a una fecha determinada. Tenga en cuenta que esta función se
basa en el sistema de inventarios de ContaPyme®.

Si desea conocer las cantidades de existencias físicas, vea la función
**CantidadExistenciasFisico**.

Otras aplicaciones

Con esta función también podrá:

  * Determinar las existencias de todos los elementos en una bodega determinada.
  * Determinar las existencias de todos los elementos creados por un centro de costos productor de la empresa.

Sintaxis

|  =CantidadExistencias  |  \(** IBodega\*; IElemento\*; FechaFin\*; IEmp\*; ICCProductor\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Suma las existencias que se encuentran en todas las bodegas creadas en el catálogo de inventarios de ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Suma las existencias de todos los elementos creados en el inventario de ContaPyme®.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha a la cual se calculará las existencias del elemento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Suma las existencias de todos los elementos producidos en todos los centros de costos productores del explorador gráfico de ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadExistencias\( 1**;** "DSD-500","QWE-10"**;**
Fecha\(2015;12;31\)**;** 1**;** "1020","1010" \)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó la consulta de saldos de inventario en ContaPyme® al 31 de diciembre de 2017, con los siguientes resultados:

Bodega  |  Elemento  |  Unidad  |  Cantidad disponible  |  Cantidad física
---|---|---|---|---
1  |  DSD-500  |  Und  |  20  |  20
1  |  GEN-001  |  Und  |  23  |  23
2  |  DSD-500  |  Und  |  15  |  16
2  |  MON-002  |  Und  |  18  |  18
1  |  PAP-001  |  Resma  |  3  |  3

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadExistencias \( IBodega\* **;** IElemento\* **;** FechaFin\* **;**
IEmp\* **;** ICCProductor \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánta existencia hay del elemento DSD-500 al 31 de diciembre de 2017?.  |  =CantidadExistencias\( **;** "DSD-500"**;** Fecha\(2017;12;31\)**;** 1 \)  |  35
¿Cuántos elementos hay en la bodega 1 al 31 de diciembre de 2017?.  |  =CantidadExistencias \( 1**;** **;** Fecha\(2017;12;31\)**;** 1 \)  |  46

---

=CantidadExistenciasFiltro \( \)

Descripción

Esta función determina la cantidad de existencias disponibles de un elemento
del inventario a una fecha y con un filtro determinado. Tenga en cuenta que
esta función se basa en el sistema de inventarios de ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Determinar las existencias de todos los elementos en una bodega determinada.
  * Determinar las existencias de todos los elementos creados en un centro de costos productor de la empresa.

Sintaxis

|  =CantidadExistenciasFiltro  |  \(** IBodega\*; Filtro\*; FechaFin\*; IEmp\*; ICCProductor\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Suma las existencias de los elementos en todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha a la cual se calculará las existencias del elemento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Suma las existencias de todos los elementos creados en todos los centros de costos productores del explorador gráfico de ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadExistenciasFiltro\( 1**;** Filtro\(\)**;**
Fecha\(2015;12;31\)**;** 1**;** "1020","1010" \)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó la consulta de saldos de inventario en ContaPyme® al 31 de diciembre de 2017, con los siguientes resultados:

Bodega  |  Elemento  |  Unidad  |  Tipo producto  |  Cantidad disponible
---|---|---|---|---
1  |  DID-001  |  Und  |  1  |  20
1  |  GEN-001  |  Und  |  3  |  23
2  |  DSD-500  |  Und  |  1  |  16
2  |  MON-002  |  Und  |  2  |  18
1  |  PAP-001  |  Resma  |  1  |  3

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadExistenciasFiltro \( IBodega\* **;** Filtro\* **;** FechaFin\* **;**
IEmp\* **;** ICCProductor\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánta existencia hay del elemento DSD-500 al 31 de diciembre de 2017?.  |  =CantidadExistenciasFiltro\( **;** FiltroMovInv\_Elemento\("DSD-500"\)**;** Fecha\(2017;12;31\)**** \)  |  16
¿Cuántos elementos de tipo producto "1" hay en la bodega 1 al 31 de diciembre de 2017?.  |  =CantidadExistenciasFiltro\( 1**;** FiltroMovInv\_TipoProducto\("1"\)**;** Fecha\(2017;12;31\)**** \)  |  39



\*\[FILTROS: 75,76,83,95,78,23\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CostoExistencias \( \)

Descripción

Esta función determina el costo de las existencias de un elemento de
inventario a una fecha determinada. Tenga en cuenta que esta función se basa
en el sistema de inventarios de ContaPyme®.

Si desea conocer la cantidad de existencias de un elemento, vea la función
**CantidadExistencias**.

Otras aplicaciones

Con esta función también podrá:

  * Determinar el costo de las existencias de todos los elementos en una bodega determinada.
  * Determinar el costo de todos los elementos creados por un centro de costos productor de la empresa.

Sintaxis

|  =CostoExistencias  |  \(** IBodega\*; IElemento\*; FechaFin\*; IEmp\*; ICCProductor\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Suma el costo de los elementos existentes en todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Calcula el costo de todos los elementos existentes del inventario de ContaPyme®.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se realiza el cálculo.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula el costo de las existencias de todos los elementos creados en todos los centros de costos productores registrados en ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoExistencias\( 1**;** "GEN-001","QWE-10"**;**
Fecha\(2015;12;31\)**;** 1**;** "1020","1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó la consulta de saldos de inventario en ContaPyme® aL 31 de diciembre de 2017, con los siguientes resultados:

Bodega  |  Elemento  |  Unidad  |  Cantidad  |  Costo Und.  |  Costo
---|---|---|---|---|---
1  |  DID-001  |  Und  |  20  |  $120.000  |  $2.400.000
1  |  GEN-001  |  Und  |  23  |  $135.000  |  $3.105.000
2  |  GEN-001  |  Und  |  15  |  $12.000  |  $180.000
2  |  MON-002  |  Und  |  18  |  $180.000  |  $3.240.000
1  |  PAP-001  |  Resma  |  3  |  $75.000  |  $225.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoExistencias \( IBodega\* **;** IElemento\* **;** FechaFin\* **;** IEmp\*
**;** ICCProductor\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo del elemento GEN-001 al 31 de diciembre de 2017?.  |  =CostoExistencias\( **;** "GEN-001"**;** Fecha\(2018;12;31\)**** \)  |  $3.285.000
¿Cuál es el costo de los elementos que se encuentran en la bodega 1 al 31 de diciembre de 2017?.  |  =CostoExistencias \( 1**;** **;** Fecha\(2018;12;31\)**** **** \)  |  $5.730.000

---

=CostoExistenciasFiltro \( \)

Descripción

Esta función determina el costo de las existencias de un elemento de
inventario a un fecha y con un filtro determinado. Tenga en cuenta que esta
función se basa en el sistema de inventarios de ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Determinar el costo de las existencias de todos los elementos en una bodega determinada.
  * Determinar el costo de todos los elementos creados por un centro de costos productor de la empresa.

Sintaxis

|  =CostoExistenciasFiltro  |  \(** IBodega\*; Filtro\*; FechaFin\*; IEmp\*; ICCProductor\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Suma el costo de los elementos existentes en todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se realiza el cálculo.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Suma el costo de las existencias de los elementos creados en todos los centros de costos productores registrados en ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoExistenciasFiltro\( 1**;** Filtro\(\)**;**
Fecha\(2015;12;31\)**;** 1**;** "1020","1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, generaron el reporte de saldos de inventario en ContaPyme® al 31 de diciembre de 2017, éste reflejó lo siguiente:

Bodega  |  Elemento  |  Tipo de producto  |  Cantidad  |  Costo Und.  |  Costo
---|---|---|---|---|---
1  |  DID-001  |  1  |  20  |  $120.000  |  $2.400.000
1  |  GEN-001  |  3  |  23  |  $135.000  |  $3.105.000
2  |  GEN-001  |  1  |  15  |  $12.000  |  $180.000
2  |  MON-002  |  2  |  18  |  $180.000  |  $3.240.000
1  |  PAP-001  |  1  |  3  |  $75.000  |  $225.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoExistenciasFiltro \( IBodega\* **;** Filtro\* **;** FechaFin\* **;**
IEmp\* **;** ICCProductor\* **;** BLocal\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo del elemento GEN-001 al 31 de diciembre de 2017?.  |  =CostoExistenciasFiltro\( **;** FiltroMovInv\_Elemento\("GEN-001"\)**;** Fecha\(2017;12;31\)**** \)  |  $3.285.000
¿Cuál es el costo de los elementos cuyo tipo de producto es 1 y están en la bodega 1 al 31 de diciembre de 2017?.  |  =CostoExistenciasFiltro \( 1**;** FiltroMovInv\_TipoProducto\("1"\)**;** Fecha\(2017;12;31\)**** **** \)  |  $2.805.000



\*\[FILTROS: 75,76,83,95,78,23\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CantidadExistenciasFisico \( \)

Descripción

Esta función determina la cantidad de existencias físicas de un elemento de
inventario a una fecha determinada. Tenga en cuenta que esta función se basa
en el sistema de inventarios de ContaPyme®.

Si desea conocer las existencias contables disponibles, vea la función
**CantidadExistencias**.

Otras aplicaciones

Con esta función también podrá:

  * Determinar las existencias físicas de los elementos en una bodega determinada.


Sintaxis

|  =CantidadExistenciasFisico  |  \(** IBodega\*; IElemento\*; FechaFin\*; IEmp\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Suma las existencias físicas de los elementos que se encuentran en todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Suma las existencias fisicas de todos los elementos del inventario de ContaPyme®.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se realiza el cálculo.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones en las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadExistenciasFisico\( 1**;** "DSD-500","QWE-10"**;**
Fecha\(2015;12;31\)**;** 1**;** "1020","1010" \)

Ejemplos

  * En la empresa 1, CMB Muebles, se realizó la consulta de saldos de inventario en ContaPyme® a 31 de diciembre de 2017, con los siguientes resultados:

Bodega  |  Elemento  |  Unidad  |  Cantidad disponible  |  Cantidad física
---|---|---|---|---
1  |  DID-001  |  Und  |  20  |  22
1  |  GEN-001  |  Und  |  23  |  23
2  |  DSD-500  |  Und  |  15  |  10
2  |  MON-002  |  Und  |  18  |  15
1  |  PAP-001  |  Resma  |  3  |  3

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadExistenciasFisico \( IBodega\* **;** IElemento\* **;** FechaFin\*
**;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánta existencia física hay del elemento DSD-500 al 31 de diciembre de 2017?.  |  =CantidadExistenciasFisico\( **;** "DSD-500"**;** Fecha\(2017;12;31\)**** \)  |  10
¿Cuántos elementos físicos hay en la bodega 1 al 31 de diciembre de 2017?.  |  =CantidadExistenciasFisico \( 1**;** **;** Fecha\(2017;12;31\)**;** 1 \)  |  48

---

=AtributoBodega \( \)

Descripción

Esta función es utilizada para conocer un atributo de una bodega según el
código dado. Tenga en cuenta que los atributos son características dadas a
cada bodega y se configuran en cada una de ellas.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoBodega  |  \( ** NAtributo; IBodega; IEmp\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.  |  Valor Requerido
IBodega
\(Requerido\)  |  Alfanumérico  |  Código de una bodega creada en el catálogo de bodegas de ContaPyme®.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de una empresa creada en el explorador gráfico de ContaPyme®.  |  Establece la empresa de trabajo configurada en el momento.

Ejemplos

  * A continuación se visualizan algunas bodegas creadas en ContaPyme®.

Código bodega  |  Descripción bodega  |  Responsable  |  Cuenta inventarios  |  Localización bodega
---|---|---|---|---
1  |  Principal  |  Monica Robledo  |  143501  |  Zona1
2  |  centro  |  Carlos Jiménez  |  143501  |  Zona2
3  |  Norte  |  Juan Rodriguez  |  143502  |  Zona1

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoBodega \( NAtributo**;** IBodega **;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es la descripción de la bodega 1.  |  =AtributoBodega \( "NINVENTARIO"**;** "1" \)  |  Principal
Determinar cual es la cuenta de inventarios que es afectada en la bodega 2  |  =AtributoBodega \( "ICUENTA"**;** "2" \)  |  143501
Determinar la localización de la bodega 3.  |  =AtributoBodega \( "NLOCALIZ"**;** "3" **;** 1 \)  |  Zona1


\*\[ATRIBUTOS:Bodegas\]\*

---

=NombreBodega \( \)

Descripción

Esta función es utilizada para conocer el nombre de una bodega registrada en
el catálogo de inventarios de ContaPyme®.

Sintaxis

|  =NombreBodega  |  \( IBodega\*; IEmp\* \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega
\(Requerido\)  |  Alfanumérico  |  Código de la bodega de la cual se desea conocer el nombre.  |  Valor requerido.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme®.  |  Establece el código de la empresa de trabajo configurada en el momento.

Ejemplos

  * A continuación se visualizan las bodegas registradas en ContaPyme® de la empresa 1, DEMO COMPUTADORES LTDA.

Código bodega  |  Nombre bodega
---|---
1  |  Bodega principal
2  |  Sede centro
3  |  Sede norte

=NombreBodega \( IBodega**;** IEmp\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es el nombre de bodega con código 1?.  |  =NombreBodega \( 1**** \)  |  Bodega principal
Determinar ¿cuál es el nombre completo de bodega con código 2?.  |  =NombreBodega \( 2**;** 1 \)  |  Sede centro

---

=AtributoElemento \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de un elemento según
el código dado. Tenga en cuenta que los atributos son características dadas a
cada elemento y se configuran desde el catálogo de elementos de inventario de
ContaPyme®.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoElemento  |  \( ** NAtributo; IElemento ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.  |  Valor Requerido
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del catálogo de elementos de inventario de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos atributos de algunos elementos creados en el catálogo de elementos de inventario de ContaPyme®.

Código elemento  |  Nombre elemento  |  Grupo de inventario  |  Unidad elemento  |  Peso  |  Elemento compuesto
---|---|---|---|---|---
GEN001  |  CDs  |  G0010  |  Und  |  8 gr  |  F
KIT001  |  KIT Computador 1  |  G0020  |  Und  |  30 kr  |  T
MEM001  |  Memorias usb  |  G0010  |  Und  |  8 gb  |  F

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoElemento \( NAtributo**;** IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre del elemento GEN001  |  =AtributoElemento \( "NELEMENTO"**;** "GEN001" \)  |  CDs
Determinar si el elemento KIT001 es un elemento compuesto.  |  =AtributoElemento \( "BCOMPUESTO"**;** "KIT001" \)  |  T
Cuál es el peso del elemento MEM001  |  =AtributoElemento \( "QPESO"**;** "MEM001" \)  |  8
Cuál es la unidade de peso del elemento MEM001  |  =AtributoElemento \( "NUNIDADQPESO"**;** "MEM001" \)  |  kg

T =Verdadero, la cuenta cumple con el atributo dado.
F =Falso, la cuenta no cumple con el atributo dado.


\*\[ATRIBUTOS:Elementos\]\*

---

=ContarElementosFiltro \( \)

Descripción

Esta función es utilizada para contar el número de elementos en el catálogo
"Elementos de inventario" con un filtro determinado .


Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Determinar la cantidad de elementos en el catálogo de elementos de inventario.

Sintaxis

|  =ContarElementosFiltro  |  \(** IElemento\*; Filtro\*; **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código del elemento de inventario por el que se desea filtrar.  |  Calcula con todos los elementos del catálogo "Elementos de inventario" de ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **BPRODUCTO='T'**

Ver algunos filtros.  |  No aplica ningún filtro a la función.

Ejemplos

  * A continuación se visualizan algunos atributos de algunos elementos creados en el catálogo de elementos de inventario de ContaPyme®.

Código elemento  |  Nombre elemento  |  Cód Grupo de inventario  |  Grupo de inventario  |  Unidad elemento  |  Peso  |  Elemento compuesto
---|---|---|---|---|---|---
GEN001  |  CDs  |  G0010  |  General  |  Und  |  8 gr  |  F
KIT001  |  KIT Computador 1  |  G0020  |  Compuesto  |  Und  |  30 kr  |  T
MEM001  |  Memorias usb  |  G0010  |  General  |  Und  |  8 gb  |  F

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=ContarElementosFiltro \( IElemento**;** Filtro \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuántos elementos existen en el catálogo de elementos de inventario con el grupo de inventario G0010?.  |  =ContarElementosFiltro \( **;** "IGRUPOINV='G0010'" \)  |  2
¿Cuántos elementos comuestos existen en el catálogo de elementos de inventario?.  |  =ContarElementosFiltro \( **;** "BCOMPUESTO='T'" \)  |  1


También se pueden utilizar los atributos asociados a un elemento como filtros
**Ej.**

=ContarElementosFiltro \( "BCONSUMO='T'"**;** "IMP001" \)

\*\[ATRIBUTOS:Elementos\]\*

---

=ContarMovimientosInventarioFiltro \( \)

Descripción

Esta función calcula el número de movimientos de inventario con un filtro
determinado.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Esta función calcula el número de movimientos de inventario en un periodo de tiempo determinado.

Sintaxis

|  =ContarMovimientosInventarioFiltro  |  \(** Filtro\*; FechaIni\*; FechaFin\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.

Ejemplos

  * En la empresa 1, CMB Muebles, se realizaron los siguientes movimientos en el inventarios de ContaPyme® al comienzo del año 2017, del respectivo registro surgió la siguiente tabla:

Fecha  |  Tipo movimiento  |  Comprado/vendido a  |  Bodega  |  Elemento  |  Precio Und. elemento
---|---|---|---|---|---
5/Ene/2017  |  3009-Consumo  |  8956124  |  1  |  Elem1  |  $ 35.000
25/Mar/2017  |  3010-Ingreso compra  |  586215  |  2  |  Elem2  |  $ 15.000
5/May/2017  |  3005-Salida venta  |  8956124  |  1  |  Elem1  |  $ 35.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=ContarMovimientosInventarioFiltro \( Filtro\* **;** FechaIni\* **;**
FechaFin\*\)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuántos movimientos de inventario se realizaron con el tipo de movimiento consumo en el año 2017.  |  =ContarMovimientosInventarioFiltro\( FiltroMovInv\_TipoSoporte\("3009"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\) \)  |  1
Determinar cuántos movimientos de inventario se realizaron con la bodega 1 en el año 2017.  |  =ContarMovimientosInventarioFiltro\( FiltroMovInv\_Bodega\("1"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\) \)  |  2
Determinar cuántos movimientos de inventario se realizaron con el tipo de movimiento de ventas en el año 2017.  |  =ContarMovimientosInventarioFiltro\( FiltroSoloVentas\(\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\) \)  |  1



\*\[FILTROS: 46,47,47,32,23\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=DescripcionElemento \( \)

Descripción

Esta función es utilizada para mostrar la descripción de un elemento del
inventario. Tenga en cuenta que esta descripción es configurable desde el
catálogo de inventarios de ContaPyme®.

Sintaxis

|  =DescripcionElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código del elemento en el inventario creado en ContaPyme® del cual se desea conocer la descripción.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos creados en el inventario de ContaPyme®.

Código elemento  |  Nombre del elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaño carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=DescripcionElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Qué descripción tiene el elemento CD's con código GEN001?.  |  =DescripcionElemento \( "GEN001" \)  |  CD virgen de 700 MB

---

=NombreElemento \( \)

Descripción

Esta función es utilizada para mostrar el nombre de un elemento del
inventario. Tenga en cuenta que el nombre de un elemento es configurable desde
el catálogo de inventarios de ContaPyme®.


Sintaxis

|  =NombreElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del inventario creado en ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos creados en el inventario de ContaPyme®.

Código elemento  |  Nombre del elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaño carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NombreElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el nombre del elemento con código DSD-500.  |  =NombreElemento \( "DSD-500" \)  |  Disco Duro

---

=PesoElemento \( \)

Descripción

Esta función es utilizada para mostrar el peso de un elemento del inventario.
Tenga en cuenta que el peso de un elemento es configurable desde el catálogo
de inventarios de ContaPyme®.

Si desea conocer la unidad del peso del elemento vea la función
**UnidadPesoElemento**

Sintaxis

|  =PesoElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del inventario de ContaPyme® del cual se quiere conocer su peso.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos creados en el inventario de ContaPyme®.

Código elemento  |  Nombre del elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaño carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=PesoElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el peso del elemento con código DSD-500.  |  =PesoElemento \( "DSD-500" \)  |  1,5

---

=StockMax \( \)

Descripción

Esta función es utilizada para mostrar el stock máximo de un elemento del
inventario. Tenga en cuenta que el stock de un elemento es configurable desde
el catálogo de elementos de inventario de ContaPyme®.

Si desea conocer el stock mínimo del elemento, vea la función **StockMin**

Otras aplicaciones

Con esta función también podrá:

  * Ver el stock máximo de un elemento por determinada empresa, tenga en cuenta que para configurar el stock máximo de un elemento por empresas, es necesario realizar la debida configuración en el módulo de inventarios de ContaPyme®.


  * Ver el stock máximo de un elemento por determinado centro de costos, tenga en cuenta que para configurar el stock máximo de un elemento por centros de costos, es necesario realizar la debida configuración en el módulo de inventarios de ContaPyme®.

Sintaxis

|  =StockMax  |  \( ** IElemento; IEmp\*; ICC\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código del elemento que se desea conocer el stock máximo.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa por la cual se desea filtrar.  |  Establece la empresa de trabajo configurada en el momento
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos por el cual se desea filtrar.  |  Si la configuración en ContaPyme® de los elementos del inventario esta asignada a centros de costos, este valor es requerido.

Ejemplos

  * A continuación se visualizan algunos elementos creados en el inventario de ContaPyme®.

Código elemento  |  Nombre elemento  |  Stock mínimo  |  Stock máximo
---|---|---|---
GEN001  |  CD's  |  20  |  500
EST005  |  Estuche CD  |  10  |  200
DSD-500  |  Disco Duro  |  3  |  15
PSP-500  |  Hojas A4  |  1.000  |  15.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


|  =StockMax  |  \( ** IElemento; IEmp\*; ICC\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el stock máximo del elemento con código GEN001  |  =StockMax \( "GEN001" \)  |  500

---

=StockMin \( \)

Descripción

Esta función es utilizada para mostrar el stock mínimo de un elemento del
inventario. Tenga en cuenta que el stock de un elemento es configurable desde
el catálogo de elementos de inventario de ContaPyme®.

Si desea conocer el stock máximo del elemento, vea la función **StockMax**

Otras aplicaciones

Con esta función también podrá:

  * Ver el stock mínimo de un elemento por determinada empresa, tenga en cuenta que para configurar el stock mínimo de un elemento por empresas, es necesario realizar la debida configuración en el módulo de inventarios de ContaPyme®.


  * Ver el stock mínimo de un elemento por determinado centro de costos, tenga en cuenta que para configurar el stock mínimo de un elemento por centros de costos, es necesario realizar la debida configuración en el módulo de inventarios de ContaPyme®.

Sintaxis

|  =StockMin  |  \( ** IElemento; IEmp\*; ICC\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código del elemento que se desea conocer el stock mínimo.  |  Valor Requerido
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa por la cual se desea filtrar.  |  Establece la empresa de trabajo configurada en el momento
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos por el cual se desea filtrar.  |  Si la configuración en ContaPyme® de los elementos del inventario esta asignada a centros de costos, este valor es requerido.

Ejemplos

  * A continuación se visualizan algunos elementos creados en el inventario de ContaPyme®.

Código elemento  |  Nombre elemento  |  Stock mínimo  |  Stock mínimo
---|---|---|---
GEN001  |  CD's  |  20  |  500
EST005  |  Estuche CD  |  10  |  200
DSD-500  |  Disco Duro  |  3  |  15
PSP-500  |  Hojas A4  |  1.000  |  15.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


|  =StockMin  |  \( ** IElemento IEmp\* ICC\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el stock mínimo del elemento con código GEN001  |  =StockMin \( "GEN001" \)  |  20

---

=UnidadCompraElemento \( \)

Descripción

Esta función es utilizada para mostrar la unidad de compra de un elemento de
inventario. Tenga en cuenta que la unidad de compra de un elemento es
configurable desde el catálogo de elementos de inventarios de ContaPyme®.

Si desea saber la unidad de venta del elemento vea la función
**UnidadElemento**

Sintaxis

|  =UnidadCompraElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código del elemento que se desea conocer su unidad de compra.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos creados en el inventario de ContaPyme®.

Código elemento  |  Nombre elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaño carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=UnidadCompraElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar la unidad de compra del elemento con código PSP-500  |  =UnidadCompraElemento \( "PSP-500" \)  |  Resmas

---

=UnidadElemento \( \)

Descripción

Esta función es utilizada para mostrar la unidad de venta o consumo de un
elemento de inventario. Tenga en cuenta que la unidad de un elemento es
configurable desde el catálogo de elementos de inventarios de ContaPyme®.

Si desea saber la unidad de compra del elemento vea la función
**UnidadCompraElemento**

Sintaxis

|  =UnidadElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código del elemento que se desea conocer su unidad de venta.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos creados en el inventario de ContaPyme®.

Código elemento  |  Nombre elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaÃ±o carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=UnidadElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar la unidad de venta o consumo del elemento con código DSD-500.  |  =UnidadElemento \( "DSD-500" \)  |  Und

---

<

=UnidadPesoElemento \( \)

Descripción

Esta función es utilizada para mostrar la unidad del peso de un elemento de
inventario. Tenga en cuenta que la unidad de peso de un elemento de
inventario, es configurable desde el catálogo de elementos de inventarios de
ContaPyme®.

Si desea conocer el peso del elemento vea la función **PesoElemento**

Sintaxis

|  =UnidadPesoElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del inventario de ContaPyme® del cual se quiere conocer la unidad de su peso.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos de inventario, creados en el catálogo de elementos de inventario de ContaPyme®.

Código elemento  |  Peso del elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaño carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=UnidadPesoElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar la unidad del peso del elemento con código DSD-500.  |  =UnidadPesoElemento \( "DSD-500" \)  |  Kg.

---

=UnidadVolumenElemento \( \)

Descripción

Esta función es utilizada para mostrar la unidad del volumen de un elemento
del inventario. Tenga en cuenta que la unidad del volumen de un elemento, es
configurable desde el catálogo de elementos de inventarios de ContaPyme®.

Si desea conocer el volumen del elemento vea la función **VolumenElemento**

Sintaxis

|  =UnidadVolumenElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del inventario creado en ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos de inventario, creados en el catálogo de elementos de inventario de ContaPyme®.

Código elemento  |  volumen del elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaño carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=UnidadVolumenElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar la unidad del volumen del elemento con código DSD-500.  |  =UnidadVolumenElemento \( "DSD-500" \)  |  cm3.

---

=VolumenElemento \( \)

Descripción

Esta función es utilizada para mostrar el volumen de un elemento del
inventario. Tenga en cuenta que el volumen de un elemento, es configurable
desde el catálogo de elementos de inventarios de ContaPyme®.

Si desea conocer la unidad del volumen del elemento vea la función
**UnidadVolumenElemento**

Sintaxis

|  =VolumenElemento  |  \( IElemento \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del inventario creado en ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos elementos de inventario, creados en el catálogo de elementos de inventario de ContaPyme®.

Código elemento  |  Nombre del elemento  |  Unidad  |  Peso  |  Volumen  |  Unidad de compra  |  Descripción del elemento
---|---|---|---|---|---|---
GEN001  |  CD's  |  Und  |  12gr  |  14,39cm3  |  Caja x 100  |  CD virgen de 700MB
EST005  |  Estuche CD  |  Und  |  1kg  |  2.500cm3  |  Caja x 50  |  Estuche para 15 CDs
DSD-500  |  Disco Duro  |  Und  |  1,5kg  |  900cm3  |  Und  |  Disco Duro de 500GB
PSP-500  |  Hojas A4  |  Und  |  0.01g  |  9,45cm3  |  Resmas  |  Hojas tamaño carta cuadriculadas

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=VolumenElemento \( IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el volumen del elemento con código DSD-500.  |  =VolumenElemento \( "DSD-500" \)  |  900

---

=AtributoPreciosElemento \( \)

Descripción

Esta función es utilizada para conocer los atributos del precio de un elemento
según el código dado.

Tenga en cuenta que los atributos son características dadas a cada elemento y
se configuran desde el catálogo de elementos de inventario de ContaPyme,
pestaña listas de precios.

Todos los atributos están descritos en la siguiente tabla. Ver tabla.

Sintaxis

|  =AtributoPreciosElemento  |  \( ** NAtributo; IElemento; IBodega; IEmp; ISede ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el nombre del atributo que desea obtener. Ver tabla atributos.  |  Valor Requerido
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del catálogo de elementos de inventario de ContaPyme.  |  Valor Requerido
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Actualmente no se usa este parámetro y es ignorado por el sistema.  |
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, no se requiere la empresa y si es dada, será ignorada.
\- Por empresa, debe indicar la empresa a la cual se le requiere obtener del
atributo de precios.
\- por empresa sede, debe indicar la empresa a la cual se le requiere obtener del atributo de precios.  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, como no se requiere, es ignorada.
\- Por empresa, si no es dado un valor, se usará la empresa de trabajo.
\- Por empresa y sede, si no es dado un valor, se usará la empresa de trabajo.
ISede\*
\(Opcional\)  |  Alfanumérico  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, no se requiere la sede y si es dada, será ignorada.
\- Por empresa, no se requiere la sede y si es dada, será ignorada.
\- por empresa sede, debe indicar la sede a la cual se le requiere obtener del atributo de precios.  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, como no se requiere, es ignorada.
\- Por empresa, como no se requiere, es ignorada.
\- Por empresa y sede, si no es dado un valor, se usará la sede de trabajo.

Ejemplos

  * A continuación se visualizan los atributos de los precios de algunos elementos creados en el catálogo de elementos de inventario de ContaPyme.

Código elemento  |  Nombre elemento  |  Lista de precios  |  Método de cálculo  |  Fecha de asignación  |  Fecha vigencia  |  Precio
---|---|---|---|---|---|---
GEN001  |  CDs  |  1  |  1 - Manual  |  10/Feb/2018  |  10/Feb/2019  |  $5.000
GEN001  |  CDs  |  2  |  1 - Manual  |  10/Feb/2018  |  10/Feb/2019  |  $5.500
KIT001  |  KIT Computador 1  |  1  |  2 - Basado último precio  |  10/Feb/2018  |  10/Feb/2019  |  $235.000
KIT001  |  KIT Computador 1  |  2  |  2 - Basado último precio  |  10/Feb/2018  |  10/Feb/2019  |  $265.000
MEM001  |  Memorias usb  |  1  |  3 - Por promedio  |  10/Feb/2018  |  10/Ago/2017  |  $22.000
MEM001  |  Memorias usb  |  2  |  3 - Por promedio  |  10/Feb/2018  |  10/Ago/2017  |  $23.800

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera, sabiendo que el nivel de precios es por área de trabajo.


=AtributoPreciosElemento \( NAtributo**;** IElemento \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el método de cálculo de la lista de precios 1 del elemento CDs.  |  =AtributoPreciosElemento \( "IMETODO1"**;** "GEN001" \)  |  1
Cuál es el método de cálculo de la lista de precios 2 del elemento Memorias usb.  |  =AtributoPreciosElemento \( "IMETODO2"**;** "GEN001" \)  |  3
Cuándo se le asignó a la lista 2 el precio al elemento KIT001 .  |  =AtributoPreciosElemento \( "FASIGNACION"**;** "KIT001" \)  |  10/02/2018
Cuál es el precio del la lista 1 del elemento MEM001  |  =AtributoPreciosElemento \( "MPRECIO1"**;** "MEM001" \)  |  22000
Cuál es el precio del la lista 2 del elemento MEM001  |  =AtributoPreciosElemento \( "MPRECIO1"**;** "MEM001" \)  |  238000


\*\[ATRIBUTOS:Precios elementos\]\*

---

=PrecioElemento \( \)

Descripción

Esta función es utilizada para mostrar el precio de venta de un elemento del
inventario según la lista de precios indicada.

Otras aplicaciones

Con esta función también podrá:

  * Ver el precio de venta de un elemento del inventario por determinada lista de precios.


  * Ver el precio de venta de un elemento del inventario por determinada empresa y lista de precios.
Debe tener configurado el nivel de manejo de listas de precios por empresa
\(ver configuración catálogo de inventarios de ContaPyme\).


  * Ver el precio de venta de un elemento del inventario por determinada empresa, sede y lista de precios.
Debe tener configurado el nivel de manejo de listas de precios por empresa y
sede \(ver configuración catálogo de inventarios de ContaPyme\).

Sintaxis

|  =PrecioElemento  |  \(** IElemento; ILista\*; IEmp\*; ISede\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IElemento
\(Requerido\)  |  Alfanumérico  |  Código de un elemento del inventario creado en ContaPyme del cual se desea conocer su precio.  |  Valor Requerido
ILista\*
\(Opcional\)  |  Alfanumérico  |  Código de la lista de precios de la cual desea trae el precio del elemento del inventario de ContaPyme.  |  Si no está dada, se utiliza la lista de precios por defecto.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, no se requiere la empresa y si es dada, será ignorada.
\- Por empresa, debe indicar la empresa a la cual se le requiere obtener del
atributo de precios.
\- por empresa sede, debe indicar la empresa a la cual se le requiere obtener del atributo de precios.  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, como no se requiere, es ignorada.
\- Por empresa, si no es dado un valor, se usará la empresa de trabajo.
\- Por empresa y sede, si no es dado un valor, se usará la empresa de trabajo.
ISede\*
\(Opcional\)  |  Alfanumérico  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, no se requiere la sede y si es dada, será ignorada.
\- Por empresa, no se requiere la sede y si es dada, será ignorada.
\- por empresa sede, debe indicar la sede a la cual se le requiere obtener del atributo de precios.  |  Depende del nivel de manejo de listas de precios:
\- Por áreá de trabajo, como no se requiere, es ignorada.
\- Por empresa, como no se requiere, es ignorada.
\- Por empresa y sede, si no es dado un valor, se usará la sede de trabajo.

Ejemplos

  * A continuación se visualizan algunos elementos creados en el catálogo de elementos de inventario de ContaPyme.

Código elemento  |  Nombre del elemento  |  Precios venta
---|---|---
Lista 1  |  Lista 2  |  Lista 3  |  Lista 4
GEN001  |  CD's  |  $1.200  |  $1.250  |  $1.500  |
EST005  |  Estuche CD  |  $12.000  |  $12.550  |  |  $16.000
DSD-500  |  Disco Duro  |  $130.000  |  $125.550  |  $145.000  |  $90.000
PSP-500  |  Hojas A4  |  $50  |  |  $75  |  $75

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


|  =PrecioElemento  |  \(** IElemento; ILista\*; IEmp\*; ISede\* **\)
---|---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el precio de venta del elemento con código GEN001 de la lista 2  |  =PrecioElemento \(** "GEN001"; 2 **\)  |  $1.250
Cuál es el precio de venta del elemento con código PSP-500 de la lista 4  |  =PrecioElemento \(** "PSP-500"; 4 **\)  |  $ 75
Cuál es el precio de venta del elemento con código EST005 de la lista 3  |  =PrecioElemento \(** "EST005"; 3 **\)  |  0
¿Cuál es el precio de venta del elemento con código DSD-500 de la lista 1?.  |  =PrecioElemento \(** "DSD-500" **\)  |  $ 130.000

---

=CantidadSalidas \( \)

Descripción

Esta función determina la cantidad de salidas de un elemento del inventario,
registrados en el sistema de inventarios de ContaPyme®.

Otras aplicaciones

Con esta función también podrá:

  * Determinar las salidas de varios elementos de inventario en un periodo determinado.
  * Determinar las salidas de todos los elementos de inventario a determinada bodega o centro de costos de la empresa.

Sintaxis

|  =CantidadSalidas  |  \(** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula la cantidad de elementos que salen a todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Calcula la cantidad de todos los elementos que salen del inventario de ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo desde el cual se calculará la cantidad de salidas del elemento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula la cantidad de elementos que salen de todos los centros de costos productores de ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula la cantidad de los elementos que salen y son imputados a todos los centros de costos de ContaPyme®.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadSalidas\( 1**;** "DSD-500","QWE-10"**;**
Fecha\(2015;1;1\)**;** Fecha\(2015;12;31\)**;** 1**;** 1020**;** 1010 \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de la venta de los siguientes elementos del inventario.

\# de documento  |  Fecha  |  Cód. Elemento  |  Bodega destino  |  Cód. CCProductor \(Origen\)  |  Cantidad  |  Costo total
---|---|---|---|---|---|---
1  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  35  |  $2.500.000
2  |  15/Ene/2017  |  QWE-10  |  1  |  |  28  |  $1.200.000
3  |  10/Feb/2017  |  EQP-007  |  1  |  1020  |  41  |  $6.100.000
4  |  28/Feb/2017  |  DSD-500  |  2  |  1010  |  17  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadSalidas \( IBodega\* **;** IElemento\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor\* **;** ICCDestino\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántas salidas del elemento DSD-500 se han generado en el año 2017?.  |  =CostoPromedioElemento\( **;** "DSD-500"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**** **** \)  |  52
Determinar ¿cuántas salidas del elemento "DSD-500" se han generado en el mes de febrero 2017?.  |  =CostoPromedioElemento \( **;** "DSD-500"**;** Fecha\(2017;2;1\)**;** Fecha\(2017;2;28\)**;** 1**** **** \)  |  17
Determinar ¿cuántas salidas se han generado en la bodega 1 en el mes de enero de 2017?.  |  =CostoPromedioElemento \( 1**;** **;** Fecha\(2017;1;1\)**;** Fecha\(2017;1;31\)**;** 1**** **** \)  |  63

---

=CantidadSalidasFiltro \( \)

Descripción

Esta función determina la cantidad de salidas de un elemento del inventario
con un filtro determinado, registrados en el sistema de inventarios de
ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Determinar las entradas de varios elementos de inventario en un periodo determinado.
  * Determinar las salidas de todos los elementos de inventario a determinada bodega o centro de costos de la empresa.

Sintaxis

|  =CantidadSalidasFiltro  |  \(** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula la cantidad de elementos que salen de todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de la salida** del elemento de inventario.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula la cantidad de elementos que salen y son creados en un centro de costos productor del explorador gráfico de ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula la cantidad de elementos que salen y se imputan a un centro de costos del explorador gráfico de ContaPyme®.

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de la salida de los siguientes elementos del inventario.

Tipo de movimiento  |  Fecha  |  Cód. Elemento  |  Bodega origen  |  Cód. CCProductor \(Origen\)  |  Cantidad  |  Costo total
---|---|---|---|---|---|---
3009 Consumo  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  35  |  $2.500.000
3005 Venta  |  15/Ene/2017  |  QWE-10  |  1  |  |  28  |  $1.200.000
3005 Venta  |  10/Feb/2017  |  EQP-007  |  1  |  1020  |  41  |  $6.100.000
3009 Consumo  |  28/Feb/2017  |  DSD-500  |  2  |  1010  |  17  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadSalidasFiltro \( IBodega\* **;** Filtro\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor\* **;** ICCDestino\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántas salidas del elemento DSD-500 se han generado en el año 2017?.  |  =CantidadSalidasFiltro\( **;** FiltroMovInv\_Elemento\("DSD-500"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**** **** \)  |  52
Determinar ¿cuántas salidas se han generado con el tipo de movimiento 3005 en el mes de febrero 2017?.  |  =CantidadSalidasFiltro \( **;** FiltroSoloVentas\(\)**;** Fecha\(2017;2;1\)**;** Fecha\(2017;2;28\)**;** 1**** **** \)  |  41



\*\[FILTROS: 75,76,83,95,78,23\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CostoSalidas \( \)

Descripción

Esta función determina el costo de salidas de un elemento del inventario,
registrados en el sistema de inventarios de ContaPyme®.

Para conocer el costo de solamente un elemento, vea la función
**CostoPromedioElemento**.

Otras aplicaciones

Con esta función tambien podrá:

  * Determinar el costo de las salidas a una bodega determinada.
  * Determinar el costo de las salidas, imputadas a un centros de costos deteminado de la empresa.

Sintaxis

|  =CostoSalidas  |  \(** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el costo de los elementos que salen de todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Calcula el costo de todos los elementos que salen del inventario de ContaPyme®.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo desde el cual se calculará el costo de las salidas del elemento..

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula el costo de los elementos que salen de todos los centros de costos productores de ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula el costo de los elementos que salen y son imputados a todos los centros de costos de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoSalidas\( 1**;** "DSD-500","QWE-10"**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** **;** "1020","1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de la compra de los siguientes elementos del inventario.

\# de documento  |  Fecha  |  Cód. Elemento  |  Bodega destino  |  Cód. CCProductor \(Origen\)  |  Cantidad  |  Costo unidad  |  Costo total
---|---|---|---|---|---|---|---
1  |  5/Ene/2017  |  DSD-500  |  1  |  1010  |  3  |  $2.500.000  |  $7.500.000
2  |  15/Ene/2017  |  QWE-10  |  2  |  1020  |  2  |  $1.200.000  |  $2.600.000
1  |  10/Feb/2017  |  EQP-007  |  1  |  1020  |  4  |  $6.100.000  |  $18.300.000
1  |  28/Feb/2017  |  DSD-500  |  1  |  1010  |  1  |  $2.600.000  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoSalidas \( IBodega\* **;** IElemento\* **;** FechaIni\* **;** FechaFin\*
**;** IEmp\* **;** ICCProductor\* **;** ICCDestino\* **;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo de las salidas del elemento DSD-500 al 10 de enero de 2017?.  |  =CostoSalidas\( **;** "DSD-500"**;** **;** Fecha\(2017;1;10\)**** **** **** \)  |  $7.500.000
¿Cuál es el costo de las salidas del elemento DSD-500 desde el 1 de enero al 1 de marzo de 2017, en contabilización NIIF?.  |  =CostoSalidas \( **;** "DSD-500"**;** Fecha\(2017;1;1\)**;** Fecha\(2017;3;1\)**;** 1**;** **;** **;** "F" \)  |  $ 10.100.000
¿Cuál es el costo de las salidas a la bodega 1 en el año 2017?.  |  =CostoSalidas \( 1**;** **;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** **;** **;** "F" \)  |  $ 28.400.000

---

=CostoSalidasFiltro \( \)

Descripción

Esta función determina el costo de salidas de un elemento del inventario con
un filtro determinado, registrados en el sistema de inventarios de ContaPyme®.

Para conocer el costo de solamente un elemento, vea la función
**CostoPromedioElemento**.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función tambien podrá:

  * Determinar el costo de las salidas de un elemento en un periodo de tiempo dado.
  * Determinar el costo de las salidas a una bodega determinada.
  * Determinar el costo de las salidas, imputadas a un centros de costos deteminado de la empresa.

Sintaxis

|  =CostoSalidasFiltro  |  \(** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; BLocal\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el costo de los elementos de todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo desde el cual se calculará el costo de las salidas del elemento.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, por los cuales se desea filtrar.  |  Calcula el costo de los elementos que entran a todos los centros de costos productores de ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos creados en ContaPyme® a los cuales se les imputan los consumos.  |  Calcula el costo de los elementos que salen y son imputados a todos los centros de costos de ContaPyme®.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoSalidasFiltro\( 1**;** Filtro\( \)**;** Fecha\(2015;1;1\)**;**
Fecha\(2015;12;31\)**;** 1**;** **;** "1020,1010"**;** "F" \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® del ingreso de los siguientes elementos del inventario.

Tipo de documento  |  Tipo producto  |  Fecha  |  Cód. Elemento  |  Bodega destino  |  Cantidad  |  Costo unidad  |  Costo total
---|---|---|---|---|---|---|---
1-Factura venta  |  1  |  5/Ene/2017  |  DSD-500  |  1  |  3  |  $2.500.000  |  $7.500.000
10-Planilla de consumo  |  2  |  15/Ene/2017  |  QWE-10  |  2  |  2  |  $1.200.000  |  $2.400.000
2-Factura venta  |  1  |  10/Feb/2017  |  EQP-007  |  1  |  4  |  $6.100.000  |  $ 18.300.000
2-Factura venta  |  2  |  28/Feb/2017  |  DSD-500  |  1  |  1  |  $2.600.000  |  $2.600.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoSalidasFiltro \( IBodega\* **;** Filtro\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** ICCProductor**;** ICCProductor\* **;** BLocal \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el costo de las salidas del elemento DSD-500 al 10 de enero de 2017?.  |  =CostoSalidasFiltro\( **;** FiltroMovInv\_Elemento\("DSD-500"\)**;** **;** Fecha\(2017;1;10\)**** **** **** \)  |  $ 7.500.000
Cuál es el costo de las salidas de los elemento tipo de producto 2 en el año de 2017, en contabilización NIIF.  |  =CostoSalidasFiltro \( **;** FiltroMovInv\_TipoProducto\("2"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** **;** **;** "F" \)  |  $ 5.000.000
Cuál es el costo de las salidas de los elementos con el docuemento de soporte 2 en el año 2017.  |  =CostoSalidasFiltro \( **;** FiltroMovInv\_TipoSoporte\("2"\)**;** Fecha\(2017;1;1\)**;** Fecha\(2017;12;31\)**;** 1**;** **;** **;** "F" \)  |  $ 28.400.000



\*\[FILTROS: 75,76,83,95,78,23\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CantidadVentas \( \)

Descripción

Esta función determina la cantidad de ventas de un elemento del inventario en
un periodo determinado. Se debe tener en cuenta que esta función se basa en la
operación de ventas del módulo de inventarios, compras y facturación de
ContaPyme®.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar la cantidad de ventas que son imputadas a un centro de costos determinado.
  * Determinar la cantidad de ventas de los elementos que se encuentren en una bodega determinada.
  * Determinar la cantidad de ventas de los elementos que fueron fabricados en un centros de costos productor determinado.

Sintaxis

|  =CantidadVentas  |  \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el número de ventas de los elementos que se vendieron que están en todas las bodegas creadas en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar.  |  Calcula el número de ventas de todos los elementos del inventario de ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, tiendo en cuenta la **fecha de soporte** de la operación de ventas.

Se recomienda utilizar la CantidadVentas fecha para este argumento, así se
evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa de la cual se desea consultar la cantidad de ventas.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, para las cuales se desea consultar la cantidad de ventas.  |  Calcula el número de ventas de los elementos creados en todos los centros de costos de producción del explorador gráfico de ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputaron los ingresos por la venta y se desea consultar la cantidad en ventas  |  Calcula el número de ventas de los elementos imputados a todos los centros de costos creados en el explorador gráfico de ContaPyme®.
Itercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar la cantidad de ventas.  |  Calcula el número de ventas de todos los terceros a los que se les vendió.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.**
=CantidadVentas\(** "1,2"; "QWE-10","DSD-500"; Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123,8956215"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas:

\#FV  |  Fecha venta  |  Cód. Elemento  |  Cód. Bodega origen  |  Cód. Centro de costos productor  |  Cód. Centro de costos destino  |  Cód Tercero Destino  |  Cantidad  |  Valor FV \(Sin IVA\)
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  |  1020  |  8564852  |  5  |  $ 30.000
02  |  15/Ago/2017  |  DSD-500  |  2  |  2020  |  1020  |  7786423  |  15  |  $ 90.000
01  |  25/Dic/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  8  |  $ 48.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadVentas \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*;
ICCProductor\*; ICCDestino\*; ITercero\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar el número de ventas del año 2017.  |  =CantidadVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;12;31\); 1** \)  |  -28
Determinar para todo el año 2017, el número de ventas de los elementos que se encontraban en la bodega 1.  |  =CantidadVentas \( ** 1; ; Fecha\(2017;1;1\); Fecha\(2017;12;31\) 1** \)  |  -13
Determinar el número de ventas del elemento QWE-10 en el segundo semestre del año 2017.  |  =CantidadVentas \( ** ; "QWE-10"; Fecha\(2017;6;30\); Fecha\(2017;12;31\) 1 ** \)  |  -8

---

=CantidadVentasFiltro \( \)

Descripción

Esta función determina la cantidad de ventas de un elemento del inventario con
un filtro determinado. Tenga en cuenta que esta función se basa en el sistema
de inventarios de ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar la cantidad de ventas que son imputadas a un centro de costos determinado.
  * Determinar la cantidad de ventas de los elementos que se encuentren en una bodega determinada.
  * Determinar la cantidad de ventas de los elementos que fueron fabricados en un centros de costos productor determinado.

Sintaxis

|  =CantidadVentasFiltro  |  \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® por las cuales se desea filtrar.  |  Calcula el número de ventas de los elementos que se vendieron que están en todas las bodegas creadas en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, tiendo en cuenta la **fecha de soporte** de la operación de ventas.

Se recomienda utilizar la CantidadVentas fecha para este argumento, así se
evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa de la cual se desea consultar la cantidad de ventas.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios centros de costos productores creados en ContaPyme®, para las cuales se desea consultar la cantidad de ventas.  |  Calcula el número de ventas de los elementos creados en todos los centros de costos de producción del explorador gráfico de ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputaron los ingresos por la venta y se desea consultar la cantidad en ventas  |  Calcula el número de ventas de los elementos imputados a todos los centros de costos creados en el explorador gráfico de ContaPyme®.
Itercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar la cantidad de ventas.  |  Calcula el número de ventas de todos los terceros a los que se les vendió.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CantidadVentasFiltro\(** "1","2"; Filtro\(\); Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123,8956215"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas:

FV\#  |  Fecha venta  |  Cód. Elemento  |  Cód. Bodega origen  |  Cód. vendedor  |  Cód. Centro de costos destino  |  Cód Tercero Destino  |  Cantidad  |  Valor FV \(Sin IVA\)
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  800565486  |  1020  |  8564852  |  5  |  $ 30.000
02  |  15/Ago/2017  |  DSD-500  |  2  |  900854585  |  1020  |  7786423  |  15  |  $ 90.000
01  |  25/Dic/2017  |  QWE-10  |  1  |  800565486  |  1030  |  8648915  |  8  |  $ 48.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadVentasFiltro \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*;
IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar las ventas del año 2017 realizadas por el vendedor 800565486.  |  =CantidadVentasFiltro \( ** ; FILTROMOVINV\_VENDEDOR\(800565486\); Fecha\(2017;1;1\); Fecha\(2017;12;31\); 1** \)  |  13
Determinar el número de ventas realizadas por el vendedor 900854585 al cliente 7786423.  |  =CantidadVentasFiltro \( ** ; FILTROMOVINV\_VENDEDOR\(900854585\); Fecha\(2017;1;1\); Fecha\(2017;12;31\); 1;  7786423** \)  |  15





\*\[FILTROS: 76,77,78,28,30\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CostoVentas \( \)

Descripción

Esta función determina el costo de venta de un elemento del inventario. Se
debe tener en cuenta que esta función se basa en la operación de ventas del
módulo de inventarios, compras y facturación de ContaPyme®.

Si desea conocer el valor base de los ingresos por ventas, vea la función
**IngresosVentas**.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar los costos de las ventas realizadas en un periodo determinado.
  * Determinar los costos de las ventas realizadas de un centro de costos determinado.
  * Determinar los costos de las ventas realizadas de los elementos fabricados en un centro de costos productor determinado.

Sintaxis

|  =CostoVentas  |  \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el costo aplicado por las ventas de todos los elementos del inventario creado en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario \(productos\) para los cuales se desea conocer el costo de ventas.  |  Calcula el costo aplicado por las ventas de todos los elementos del inventario creado en ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la CostoVentas fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor \(línea u orden de producción\) bajo el cual se desea consultar la información.  |  Calcula el valor del costo aplicado por las ventas de todos los elementos del inventario fabricados en todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó el costo de la venta.  |  Calcula el valor del costo aplicado por las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar el costo de ventas.  |  Calcula el valor del costo aplicado por las ventas de todos los terceros a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.**
=CostoVentas\(** "1,2"; "QWE-10","DSD-500"; Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123,8956215"; "F"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

FV \#  |  Fecha venta  |  Cód. Elemento  |  Cód. Bodega  |  Cód. CC Productor  |  Cód. CC Destino  |  Cód Tercero  |  Valor FV  |  Costo venta
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  |  1020  |  8564852  |  $30.000  |  $12.000
02  |  15/Mar/2017  |  DSD-500  |  2  |  2020  |  1020  |  7786423  |  $50.000  |  $33.000
03  |  25/Abr/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $120.000  |  $80.000
04  |  25/May/2017  |  DSD-510  |  1  |  |  1030  |  10234978  |  $80.000  |  $35.000
05  |  16/Jul/2017  |  GEN-001  |  1  |  |  1020  |  75090080  |  $100.000  |  $75.000
06  |  5/Sep/2017  |  PCS-500  |  2  |  2020  |  1030  |  75098620  |  $70.000  |  $45.000
07  |  10/Dic/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $150.000  |  $120.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoVentas \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*;
ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los costos de las ventas del mes de marzo de 2017.  |  =CostoVentas \( ** ; ; Fecha\(2017;3;1\); Fecha\(2017;3;31\); 1** \)  |  $ 45.000
Determinar todos los costos de las ventas de todo el año 2017.  |  =CostoVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;12;31\); 1** \)  |  $ 400.000
Determinar todos los costos de las ventas del elemento QWE-10 en el año 2017.  |  =CostoVentas \( ** ; "QWE-10"; Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 212.000
¿Cuáles fueron los costos en las ventas de los elementos imputados al centro de costos 1030 en el primer semestre del año 2017?.  |  =CostoVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\) 1; ; 1030 ** \)  |  $ 115.000
¿Cuáles son los costos por las ventas de los elementos hechos en el centro de costos 2020 y vendidos al cliente con código 7786423 en el primer semestre del año 2017?.  |  =CostoVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\) 1; 2020; ; 7786423**\)  |  $ 33.000

---

=CostoVentasFiltro \( \)

Descripción

Esta función determina el costo de venta de un elemento del inventario usando
un filtro determinado. Se debe tener en cuenta que esta función se basa en la
operación de ventas del módulo de inventarios, compras y facturación de
ContaPyme®.

Si desea conocer el valor base de los ingresos por ventas, vea la función
**IngresosVentas**.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar los costos de las ventas realizadas en un periodo determinado.
  * Determinar los costos de las ventas realizadas de un centro de costos determinado.
  * Determinar los costos de las ventas realizadas de los elementos fabricados en un centro de costos productor determinado.

Sintaxis

|  =CostoVentasFiltro  |  \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el costo aplicado por las ventas de todos los elementos del inventario creado en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la CostoVentasFiltro fecha para este argumento, así se
evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código del centros de costos productor por el cual se desea consultar la información.  |  Calcula el valor del costo aplicado por las ventas de todos los elementos del inventario fabricados en todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó el costo de la venta.  |  Calcula el valor del costo aplicado por las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Calcula el valor del costo aplicado por las ventas de todos los terceros a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =CostoVentasFiltro\(** "1","2"; Filtro\(\); Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123,8956215"; "F"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

FV \#  |  Fecha venta  |  Cód. Elemento  |  Cód. Bodega origen  |  Cód. Vendedor 1  |  Cód. CC destino  |  Cód Tercero  |  Valor FV  |  Costo venta
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  8569875  |  1020  |  8564852  |  $30.000  |  $12.000
02  |  15/Mar/2017  |  DSD-500  |  2  |  9874562  |  1020  |  7786423  |  $50.000  |  $33.000
03  |  25/Abril/2017  |  QWE-10  |  1  |  8569875  |  1030  |  8648915  |  $120.000  |  $80.000
04  |  25/May/2017  |  DSD-510  |  1  |  8569875  |  1030  |  10234978  |  $80.000  |  $35.000
05  |  16/Jul/2017  |  GEN-001  |  1  |  9874562  |  1020  |  75090080  |  $100.000  |  $75.000
06  |  5/Sep/2017  |  PCS-500  |  2  |  8569875  |  1030  |  75098620  |  $70.000  |  $45.000
07  |  10/Dic/2017  |  QWE-10  |  1  |  9874562  |  1030  |  8648915  |  $150.000  |  $120.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CostoVentasFiltro \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*;
ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los costos de las ventas del elemento QWE-10 en el año 2017.  |  =CostoVentasFiltro \( ** ; FiltroMovInv\_Elemento\("QWE-10"\); Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 212.000
Determinar todos los costos de las ventas realizadas por el vendedor 9874562.  |  =CostoVentasFiltro \( ** ; filtromovinv\_vendedor\("9874562"\); Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 228.000
¿Cuáles son los costos por las ventas imputadas al centro de costos 1030, vendidos por el vendedor 8569875 al cliente con código 10234978 en el primer semestre del año 2017?.  |  =CostoVentasFiltro \( ** ; filtromovinv\_vendedor\("8569875"\); Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1;  "10234978" **\)  |  $ 35.000





\*\[FILTROS: 76,77,78,28,30\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=DescuentoVentas \( \)

Descripción

Esta función determina el descuento en la venta de un elemento del inventario.
Se debe tener en cuenta que esta función se basa en la operación de ventas del
módulo de inventarios, compras y facturación de ContaPyme®.

Si desea conocer el valor base de los ingresos por ventas, vea la función
**IngresosVentas**.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar los descuentos aplicados a las ventas realizadas en un periodo determinado.
  * Determinar los descuentos aplicados a las ventas realizadas de un centro de costos determinado.
  * Determinar los descuentos aplicados a las ventas realizadas de los elementos fabricados en un centro de costos productor determinado.

Sintaxis

|  =DescuentoVentas  |  \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el descuento aplicado por las ventas de todos los elementos del inventario creado en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea filtrar el descuento aplicado.  |  Calcula el descuento aplicado por las ventas de todos los elementos del inventario creado en ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la DescuentoVentas fecha para este argumento, así se
evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código del costos productor bajo el cual se desea consultar la información.  |  Calcula el valor del descuento aplicado por los ingresos de las ventas de todos los elementos del inventario fabricados en todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó la venta.  |  Calcula el valor del descuento aplicado por los ingresos de las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Calcula el valor del descuento aplicado por los ingresos de las ventas de todos los terceros a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =DescuentoVentas\(** "1","2"; "QWE-10","DSD-500"; Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123","8956215"; "F"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

\# FV  |  Fecha Venta  |  Cód. Elemento  |  Cód. Bodega  |  Cód. CC Productor  |  Cód. CC Destino  |  Cód Tercero Destino  |  Valor FV  |  Descuento
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  |  1020  |  8564852  |  $30.000  |  $2.000
02  |  15/Mar/2017  |  DSD-500  |  2  |  2020  |  1020  |  7786423  |  $50.000  |  $3.000
03  |  25/Abr/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $120.000  |  $12.000
04  |  25/May/2017  |  DSD-510  |  1  |  |  1030  |  10234978  |  $80.000  |
05  |  16/Jul/2017  |  GEN-001  |  1  |  |  1020  |  75090080  |  $100.000  |
06  |  5/Sep/2017  |  PCS-500  |  2  |  2020  |  1030  |  75098620  |  $70.000  |  $7.000
07  |  10/Dic/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $150.000  |  $12.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=DescuentoVentas \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*;
ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los descuentos de las ventas del mes de marzo de 2017.  |  =DescuentoVentas \( ** ; ; Fecha\(2017;3;1\); Fecha\(2017;3;31\); 1** \)  |  $\[\[:alnum:\]\].000
Determinar todos los descuentos de las ventas de todo el año 2017.  |  =DescuentoVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;12;31\); 1** \)  |  $ 36.000
Determinar todos los descuentos de las ventas del elemento QWE-10 en el año 2017.  |  =DescuentoVentas \( ** ; "QWE-10"; Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 26.000
¿Cuáles fueron los descuentos en las ventas de los elementos imputados al centro de costos 1030 en el primer semestre del año 2017?.  |  =DescuentoVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1; ; 1030 ** \)  |  $ 12.000
¿Cuáles son los descuentos por las ventas de los elementos hechos en el centro de costos 2020 y vendidos al cliente con código 7786423 en el primer semestre del año 2017?.  |  =DescuentoVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1; 2020; ; 7786423** \)  |  $\[\[:alnum:\]\].000

---

=DescuentoVentasFiltro \( \)

Descripción

Esta función determina el descuento en la venta de un elemento del inventario
con un filtro determinado. Se debe tener en cuenta que esta función se basa en
la operación de ventas del módulo de inventarios, compras y facturación de
ContaPyme®.

Si desea conocer el valor base de los ingresos por ventas, vea la función
**IngresosVentas**.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar los descuentos aplicados a las ventas realizadas en un periodo determinado.
  * Determinar los descuentos aplicados a las ventas realizadas de un centro de costos determinado.
  * Determinar los descuentos aplicados a las ventas realizadas de los elementos fabricados en un centro de costos productor determinado.

Sintaxis

|  =DescuentoVentasFiltro  |  \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el descuento aplicado por las ventas de todos los elementos del inventario creado en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la DescuentoVentasFiltro fecha para este argumento, así
se evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código del costos productor por el cual se desea filtrar el descuento.  |  Calcula el valor del descuento aplicado por los ingresos de las ventas de todos los elementos del inventario fabricados en todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó la venta.  |  Calcula el valor del descuento aplicado por los ingresos de las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Calcula el valor del descuento aplicado por los ingresos de las ventas de todos los terceros a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.

**Ej.** =DescuentoVentasFiltro\(** "1","2"; Filtro\(\); Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123","8956215"; "F"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

\# FV  |  Fecha Venta  |  Cód. Elemento  |  Cód. Bodega  |  Cód. CC Productor  |  Cód. CC Destino  |  Cód. Tercero Destino  |  Valor FV  |  Descuento
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  |  1020  |  8564852  |  $30.000  |  $2.000
02  |  15/Mar/2017  |  DSD-500  |  2  |  2020  |  1020  |  7786423  |  $50.000  |  $3.000
03  |  25/Abr/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $120.000  |  $12.000
04  |  25/May/2017  |  DSD-510  |  1  |  |  1030  |  10234978  |  $80.000  |
05  |  16/Jul/2017  |  GEN-001  |  1  |  |  1020  |  75090080  |  $100.000  |
06  |  5/Sep/2017  |  PCS-500  |  2  |  2020  |  1030  |  75098620  |  $70.000  |  $7.000
07  |  10/Dic/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $150.000  |  $12.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=DescuentoVentasFiltro \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*;
IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los descuentos de las ventas del elemento QWE-10 en el año 2017.  |  =DescuentoVentasFiltro \( ** ; FiltroMovInv\_Elemento\("QWE-10"\); Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 26.000  |  ¿Cuáles son los descuentos por las ventas de los elementos hechos en el centro de costos 2020 y vendidos al cliente con código 7786423 en el primer semestre del año 2017?.  |  =DescuentoVentasFiltro \( ** ; FiltroMovInv\_Tercero\("7786423"\); Fecha\(2017;1;1\); Fecha\(2017;6;30\) 1; 2020**\)  |  $\[\[:alnum:\]\].000





\*\[FILTROS: 76,77,78,28,30\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=IngresosVentas \( \)

Descripción

Esta función determina el ingreso generado en la venta de un elemento del
inventario.
Se debe tener en cuenta que esta función se basa en la operación de ventas del
módulo de inventarios, compras y facturación de ContaPyme® y NO tiene en
cuenta el valor del IVA para reportarlo como ingreso.

Si desea conocer el valor del IVA de las ventas, vea la función **IVAVentas**.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar las ventas realizadas por un centro de costos determinado.
  * Determinar las ventas realizadas entre un periodo determinado.
  * Determinar las ventas realizadas de los elementos creados en un centro de costos productor determinado.

Sintaxis

=IngresosVentas  |  \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal ** \)
---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el valor de los ingresos de las ventas de todos los elementos del inventario de ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario de ContaPyme® por los cuales se desea conocer el ingreso generado.  |  Calcula el valor de los ingresos de las ventas de todos los elementos del inventario de ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la IngresosVentas fecha para este argumento, así se
evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor bajo el cual se desea consultar la información.  |  Toma el valor de los ingresos de las ventas de todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó el ingreso de la venta.  |  Toma el valor de los ingresos de las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de los ingresos por ventas de todos los terceros del catálogo de terceros de ContaPyme® a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.** =IngresosVentas\(** "1","2"; "QWE-10","DSD-500"; Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123","8956215"; "F"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

\# FV  |  Fecha Venta  |  Cód. Elemento  |  Cód. Bodega  |  Cód. CC Productor  |  Cód. CC Destino  |  Cód. Tercero Destino  |  Valor FV
\(Sin IVA\)
---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  |  1020  |  8564852  |  $ 30.000
02  |  15/Mar/2017  |  DSD-500  |  2  |  2020  |  1020  |  7786423  |  $ 50.000
03  |  25/Abr/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $ 120.000
04  |  25/May/2017  |  DSD-510  |  1  |  |  1030  |  10234978  |  $ 80.000
05  |  16/Jul/2017  |  GEN-001  |  1  |  |  1020  |  75090080  |  $ 100.000
06  |  5/Sep/2017  |  PCS-500  |  2  |  2020  |  1030  |  75098620  |  $ 70.000
07  |  10/Dic/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $ 150.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=IngresosVentas \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*;
ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los ingresos por ventas del mes de marzo de 2017.  |  =IngresosVentas \( ** ; ; Fecha\(2017;3;1\); Fecha\(2017;3;31\); 1** \)  |  $ 80.000
Determinar todos los ingresos por las ventas en el año 2017.  |  =IngresosVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;12;31\); 1** \)  |  $ 600.000
Determinar todos los ingresos por ventas del producto QWE-10 en el año 2017  |  =IngresosVentas \( ** ; "QWE-10"; Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 300.000
¿Cuáles son los ingresos por ventas imputados al centro de costos 1030 en el primer semestre del año 2017?.  |  =IngresosVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1; ; 1030; ITercero\*** \)  |  $ 200.000
¿Cuáles son los ingresos por ventas de los productos hechos en el centro de costos 2020 y vendidos al cliente con código 7786423 en el primer semestre del año 2017?.  |  =IngresosVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1; 2020; ; 7786423** \)  |  $ 50.000

---

=IngresosVentasFiltro \( \)

Descripción

Esta función determina los ingresos por ventas de un elemento del inventario
con un filtro determinado.

Tenga en cuenta que esta función, solo calcula los valores base, esto quiere
decir que NO toma en cuenta el valor del IVA.

Si desea conocer el valor del IVA de las ventas, vea la función **IVAVentas**.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar las ventas realizadas por un centro de costos determinado.
  * Determinar las ventas realizadas entre un periodo determinado.
  * Determinar las ventas realizadas de los elementos creados en un centro de costos productor determinado.

Sintaxis

=IngresosVentasFiltro  |  \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal ** \)
---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
IBodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el valor de los ingresos de las ventas de todos los elementos del inventario de ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la IngresosVentasFiltro fecha para este argumento, así
se evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor bajo el cual se desea consultar la información.  |  Toma el valor de los ingresos de las ventas de todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó el ingreso de la venta.  |  Toma el valor de los ingresos de las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar.  |  Toma el valor de los ingresos por ventas de todos los terceros del catálogo de terceros de ContaPyme® a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.

**Ej.** =IngresosVentasFiltro\(** "1","2"; "QWE-10","DSD-500";
Fecha\(2018;1;1\); Fecha\(2018;12;31\); 1; ; 1020; "8562123","8956215"; "F"**
\)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

\# FV  |  Fecha Venta  |  Cód. Elemento  |  Cód. Bodega  |  Cód. Vendedor  |  Cód. CC Destino  |  Cód. Tercero Destino  |  Valor FV
\(Sin IVA\)
---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  85642541  |  1020  |  8564852  |  $ 30.000
02  |  15/Mar/2017  |  DSD-500  |  2  |  85642541  |  1020  |  7786423  |  $ 50.000
03  |  25/Abril/2017  |  QWE-10  |  1  |  89564217  |  1030  |  8648915  |  $ 120.000
04  |  25/May/2017  |  DSD-510  |  1  |  85642541  |  1030  |  10234978  |  $ 80.000
05  |  16/Jul/2017  |  GEN-001  |  1  |  89564217  |  1020  |  75090080  |  $ 100.000
06  |  5/Sep/2017  |  PCS-500  |  2  |  89564217  |  1030  |  75098620  |  $ 70.000
07  |  10/Dic/2017  |  QWE-10  |  1  |  85642541  |  1030  |  8648915  |  $ 150.000

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=IngresosVentasFiltro \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*;
IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los ingresos por ventas del producto QWE-10 en el año 2017  |  =IngresosVentasFiltro \( ** ; FiltroMovInv\_Elemento\("QWE-10"\); Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 300.000  |  ¿Cuáles son los ingresos de las ventas realizadas por el vendedor 85642541 en el primer semestre del año 2017?.  |  =IngresosVentasFiltro \( ** ; FiltroMovInv\_Vendedor\("85642541"\); Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1; 2020** \)  |  $ 160.000





\*\[FILTROS: 76,77,78,28,30\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=IVAVentas \( \)

Descripción

Esta función determina el IVA generado por las ventas de un elemento del
inventario. Se debe tener en cuenta que esta función se basa en la operación
de ventas del módulo de inventarios, compras y facturación de ContaPyme®.

Si desea conocer el valor base de los ingresos por ventas, vea la función
**IngresosVentas**.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar el IVA generado por las ventas realizadas de un centro de costos determinado.
  * Determinar el IVA generado de las ventas realizadas en un periodo determinado.
  * Determinar el IVA generado de las ventas realizadas por los elementos creados en un centro de costos productor determinado.

Sintaxis

|  =IVAVentas  |  \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el IVA cobrado por las ventas de todos los elementos del inventario creado en ContaPyme®.
IElemento\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios elementos del inventario para los cuales se desea conocer el IVA generado en la venta.  |  Calcula el IVA cobrado por las ventas de todos los elementos del inventario creado en ContaPyme®.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la IVAVentas fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información..  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código de centro de costos productor bajo el cual se desea consultar la información.  |  Calcula el valor del IVA cobrado por los ingresos de las ventas de todos los elementos del inventario fabricados en todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó el IVA de la venta.  |  Calcula el valor del IVA cobrado por los ingresos de las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar el IVA de las ventas.  |  Calcula el valor del IVA cobrado por los ingresos de las ventas de todos los terceros a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.**
=IVAVentas\(** "1","2"; "QWE-10","DSD-500"; Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123","8956215"; "F"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

\# FV  |  Fecha Venta  |  Cód. Elemento  |  Cód. Bodega  |  Cód. CC productor  |  Cód. CC destino  |  Cód. Tercero Destino  |  Valor FV
\(Sin IVA\)  |  IVA
\(19%\)
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  |  1020  |  8564852  |  $30.000  |  $5.700
02  |  15/Mar/2017  |  DSD-500  |  2  |  2020  |  1020  |  7786423  |  $50.000  |  $9.500
03  |  25/Abr/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $120.000  |  $22.800
04  |  25/May/2017  |  DSD-510  |  1  |  |  1030  |  10234978  |  $80.000  |  $15.200
05  |  16/Jul/2017  |  GEN-001  |  1  |  |  1020  |  75090080  |  $100.000  |  $19.000
06  |  5/Sep/2017  |  PCS-500  |  2  |  2020  |  1030  |  75098620  |  $70.000  |  $13.300
07  |  10/Dic/2017  |  QWE-10  |  1  |  |  1030  |  8648915  |  $150.000  |  $28.500

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=IVAVentas \( ** IBodega\*; IElemento\*; FechaIni\*; FechaFin\*; IEmp\*;
ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los cobros por IVA de las ventas del mes de marzo de 2017.  |  =IVAVentas \( ** ; ; Fecha\(2017;3;1\); Fecha\(2017;3;31\); 1** \)  |  $ 15.200
Determinar todos los cobros por IVA de las ventas de todo el año 2017.  |  =IVAVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;12;31\); 1** \)  |  $ 114.000
Determinar todos los cobros por IVA de las ventas del elemento QWE-10 en el año 2017.  |  =IVAVentas \( ** ; "QWE-10"; Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 57.000
¿Cuáles fueron los cobros por IVA en las ventas de los elementos imputados al centro de costos 1030 en el primer semestre del año 2017?.  |  =IVAVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1; ; 1030 ** \)  |  $ 22.800
¿Cuáles son los cobros de IVA por las ventas de los elementos hechos en el centro de costos 2020 y vendidos al cliente con código 7786423 en el primer semestre del año 2017?.  |  =IVAVentas \( ** ; ; Fecha\(2017;1;1\); Fecha\(2017;6;30\); 1; 2020; ; 7786423** \)  |  $\[\[:alnum:\]\].500

---

=IVAVentasFiltro \( \)

Descripción

Esta función determina el IVA generado por las ventas de un elemento del
inventario. Se debe tener en cuenta que esta función se basa en la operación
de ventas del módulo de inventarios, compras y facturación de ContaPyme®.

Si desea conocer el valor base de los ingresos por ventas, vea la función
**IngresosVentas**.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función usted también podrá:

  * Determinar el IVA generado por las ventas realizadas de un centro de costos determinado.
  * Determinar el IVA generado de las ventas realizadas en un periodo determinado.
  * Determinar el IVA generado de las ventas realizadas por los elementos creados en un centro de costos productor determinado.

Sintaxis

|  =IVAVentasFiltro  |  \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICCProductor\*; ICCDestino\*; ITercero\*; BLocal ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
Ibodega\*
\(Opcional\)  |  Alfanumérico  |  Código de una o más bodegas creadas en ContaPyme® para las cuales se desea filtrar la consulta.  |  Calcula el IVA cobrado por las ventas de todos los elementos del inventario creado en ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ej. **FiltroMovInv\_Elemento\("Elemento1"\)**

Ver algunos filtros.  |  No aplica ningún filtro a la función.
FechaIni\*
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** del documento de ventas.

Se recomienda utilizar la IVAVentasFiltro fecha para este argumento, así se
evitan confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos 1/1/1900.
**FechaFin\***
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa para la cual se desea consultar la información.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICCProductor\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor bajo el cual se desea consultar la información.  |  Calcula el valor del IVA cobrado por los ingresos de las ventas de todos los elementos del inventario fabricados en todos los centros de costos productores creados en ContaPyme®.
ICCDestino\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos al cual se le imputó el IVA de la venta.  |  Calcula el valor del IVA cobrado por los ingresos de las ventas de todos los centros de costos creados en el explorador gráfico de ContaPyme®.
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros del catálogo de terceros de ContaPyme® por los cuales se desea filtrar el IVA de las ventas.  |  Calcula el valor del IVA cobrado por los ingresos de las ventas de todos los terceros a los que se les vendió.
BLocal\*
\(Opcional\)  |  Alfanumérico  |  Establece el tipo de contabilización a utilizar para el movimiento.

**"T"** =Realiza cálculos con la Contabilización Local
**"F"** =Realiza cálculos con la Contabilización NIIF  |  Toma el tipo de contabilización activa por defecto que tiene configurada el sistema.


**Nota:** Para filtrar por varios parámetros en el mismo argumento solo es
necesario separar con una coma.
**Ej.**
=IVAVentasFiltro\(** "1","2"; Filtro\(\); Fecha\(2018;1;1\);
Fecha\(2018;12;31\); 1; ; 1020; "8562123","8956215"; "F"** \)

Ejemplos

  * En la empresa 1, CMB Muebles, realizaron el registro en ContaPyme® de las siguientes ventas en el año 2017:

\# FV  |  Fecha Venta  |  Cód. Elemento  |  Cód. Bodega  |  Cód. CC productor  |  Cód. CC destino  |  Cód. Tercero Destino  |  Valor FV
\(Sin IVA\)  |  IVA
\(19%\)
---|---|---|---|---|---|---|---|---
01  |  3/Mar/2017  |  QWE-10  |  1  |  85642541  |  1020  |  8564852  |  $30.000  |  $5.700
02  |  15/Mar/2017  |  DSD-500  |  2  |  85642541  |  1020  |  7786423  |  $50.000  |  $9.500
03  |  25/Abr/2017  |  QWE-10  |  1  |  89564217  |  1030  |  8648915  |  $120.000  |  $22.800
04  |  25/May/2017  |  DSD-510  |  1  |  85642541  |  1030  |  10234978  |  $80.000  |  $15.200
05  |  16/Jul/2017  |  GEN-001  |  1  |  89564217  |  1020  |  75090080  |  $100.000  |  $19.000
06  |  5/Sep/2017  |  PCS-500  |  2  |  89564217  |  1030  |  75098620  |  $70.000  |  $13.300
07  |  10/Dic/2017  |  QWE-10  |  1  |  85642541  |  1030  |  8648915  |  $150.000  |  $28.500

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=IVAVentasFiltro \( ** IBodega\*; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*;
ICCProductor\*; ICCDestino\*; ITercero\*; BLocal\*** \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar todos los cobros por IVA de las ventas del elemento QWE-10 en el año 2017.  |  =IVAVentasFiltro \( ** ; FiltroMovInv\_Elemento\("QWE-10"\); Fecha\(2017;1;1\); Fecha\(2017;12;31\) ** \)  |  $ 57.000  |  ¿Cuánto fue el IVA generado por las ventas realizadas por el vendedor 85642541, al cliente con código 7786423, en el primer semestre del año 2017?.  |  =IVAVentasFiltro \( ** ; FiltroMovInv\_Vendedor\("85642541"\); Fecha\(2017;1;1\); Fecha\(2017;6;30\) 1; ; ; 7786423** \)  |  $\[\[:alnum:\]\].500





\*\[FILTROS: 76,77,78,28,30\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=AtributoActividad \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de una actividad
según el código dado. Tenga en cuenta que los atributos son características
dadas a cada actividad y se configuran en cada una de ellas.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoActividad  |  \( ** NAtributo; IActividad ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.  |  Valor Requerido
IActividad
\(Requerido\)  |  Alfanumérico  |  Código de una actividad creada en el módulo de actividad y labores de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunas actividades creadas en ContaPyme®.

Código actividad  |  Nombre de la actividad  |  Grupo actividad  |  Tipo actividad
---|---|---|---
1  |  Actividades generales  |  |  General
2  |  Producción de naranja  |  Producto Interno  |  Alimento
3  |  Producción de manzanas  |  Producto Interno  |  Alimento
4  |  Producción de canastas  |  Producto Interno  |

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoActividad \( NAtributo**;** IActividad \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre de la actividad 1.  |  =AtributoActividad \( "NACTIVIDAD"**;** 1 \)  |  Actividades generales
A qué grupo pertenece la actividad 3.  |  =AtributoActividad \( "SGRUPO"**;** 3 \)  |  Producto Interno
A qué tipo pertenece la actividad 2.  |  =AtributoActividad \( "STIPO"**;** 2 \)  |  Alimento


\*\[ATRIBUTOS:Actividades\]\*

---

=AtributoLabor \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de una labor según
el código dado. Tenga en cuenta que los atributos son características dadas a
cada labor y se configuran en cada una de ellas.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoLabor  |  \( ** NAtributo; ILabor; IActividad ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.  |  Valor Requerido
ILabor
\(Requerido\)  |  Alfanumérico  |  Código de una labor creada en el módulo de actividad y labores de ContaPyme®.  |  Valor Requerido
IActividad
\(Requerido\)  |  Alfanumérico  |  Código de una actividad creada en el módulo de actividad y labores de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunas labores creadas en ContaPyme®.

Código actividad  |  Código labor  |  Nombre labor  |  Grupo labor  |  Tipo labor  |  Labor de producción
---|---|---|---|---|---
1  |  100  |  Cultivo  |  Granja2  |  Zona1  |  F
1  |  200  |  Recolección  |  Granja1  |  Zona1  |  T
1  |  300  |  Pesaje  |  Granja1  |  Zona2  |  F
2  |  200  |  Recolección  |  Granja2  |  Zona3  |  T

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoLabor \( NAtributo**;** ILabor **;** IActividad \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre de la labor 200 que pertenece a la actividad 2.  |  =AtributoLabor \( "NLABOR"**;** "100"**;** 1 \)  |  Recolección
Determinar si la labor 200 de la actividad 1 es de producción.  |  =AtributoLabor \( "BLABORPROD"**;** "200"**;** 1 \)  |  T
A qué tipo pertenece la labor 300 de la actividad 1.  |  =AtributoLabor \( "STIPO"**;** "300" **;** 1 \)  |  Zona2

T =Verdadero, cumple con el atributo indicado.
F =Falso, no cumple con el atributo indicado.


\*\[ATRIBUTOS:Labores\]\*

---

=CantidadLabor \( \)

Descripción

Esta función calcula la cantidad de labor ejecutada de una actividad en
específico. Esta función es basada en ContaPyme® de actividades y labores por
lo que solo es utilizada en empresas con el módulo de costos de ContaPyme®.

Si desea conocer el tiempo de ejecución de la labor, vea la función
**CantidadManoDeObraLabor**

Otras aplicaciones

Con esta función también podrá:

  * Calcular la cantidad de labores en una actividad en específico.
  * Calcular la cantidad de labores imputados a un centro de costos productor.

Sintaxis

|  =CantidadLabor  |  \( ** ILabor; IActividad; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor\*
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se conocer la cantidad de labor ejecutada.  |  Valor requerido
IActividad
\(Requerido\)  |  Alfanumérico  |  Código de la actividad a la cual pertenece la labor utilizada en la función.  |  Valor requerido
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** de las labores realizadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos por el cuál se desea filtrar las labores realizadas.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha Labor  |  Cód. Labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad de labor  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  5 Hora  |  $24.870
1  |  13/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  1 Jor  |  $35.980
1  |  1/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  1.5 Jor  |  $42.820
1  |  10/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  9 Hora  |  $14.500
1  |  17/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  3 Hora  |  $32.100
1  |  25/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  8 Hora  |  $13.200
1  |  12/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadLabor \( ILabor**;** IActividad**;** FechaIni\* **;** FechaFin\*
**;** IEmp\* **;** ICC\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuántas hectárias de naranja fueron sembradas en el primer semestre del año 2018?.  |  =CantidadLabor\( 100**;** 1**;** Fecha\(2018;1;1\)**;** Fecha\(2018;6;30\)******** \)  |  2
¿Cuál fué el peso total de las naranjas recogidas en el año 2018?.  |  =CantidadLabor\( 200**;** 1**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1**;** 13 \)  |  220
¿Cuántas unidades de naranja fueron pesadas en todo el año de 2018?.  |  =CantidadLabor\( 300**;** 1**;** Fecha\(2018;12;31\)**;** Fecha\(2018;12;31\)**;** 1**;** 13 \)  |  55
¿Cuánta cantidad de labor de la actividad 1 fue realizada en todo el año 2018?.  |  =CantidadLabor\( **;** 1**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1\)  |  289

---

=CantidadLaborFiltro \( \)

Descripción

Esta función calcula la cantidad de labor ejecutada de una actividad en
específico teniendo en cuenta un filtro determinado. Tenga en cuenta que esta
función es basada en el sistema de actividades y labores por lo que solo es
utilizada en empresas con el módulo de costos de ContaPyme®.

Vea algunos filtros usados en esta función. Filtros.

Otras aplicaciones

Con esta función también podrá:

  * Calcular la cantidad de labores en una actividad en específico.
  * Calcular la cantidad de labores imputadas a un centro de costos específico.

Sintaxis

|  =CantidadLaborFiltro  |  \( ** ILabor; IActividad; Filtro\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor\*
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Valor requerido
IActividad
\(Requerido\)  |  Alfanumérico  |  Código de la actividad por la cual se desea filtrar.  |  Valor requerido
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ver algunos filtros.  |  No aplica ningún filtro a la función.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establece la fecha desde y hasta la cual se desea consultar la cantidad de labor realizada.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Código del centro de costos por el cuál se desea filtrar las labores realizadas.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos por el cuál se desea filtrar las labores realizadas.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de esta se realizaron las siguientes labores en el año 2018.

Cuenta afectada  |  Fecha labor  |  Cód. labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad realizada  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
720505  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  5 Hora  |  $24.870
720510  |  13/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  1 Jor  |  $35.980
720510  |  1/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  1.5 Jor  |  $42.820
720515  |  10/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  9 Hora  |  $14.500
720505  |  17/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  3 Hora  |  $32.100
720515  |  25/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  8 Hora  |  $13.200
720505  |  12/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadLaborFiltro \( ILabor**;** IActividad**;** Filtro\* **;** FechaIni\*
**;** FechaFin\* **;** IEmp\* **;** ICC\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuántas hectárias de naranja fueron sembrada en el primer semestre del año 2018 y la cuenta afectada fue la 720505?.  |  =CantidadLaborFiltroFiltro\( 100**;** 1**;** MovCont\_Cuenta\("720505"\)**;** Fecha\(2018;1;1\)**;** Fecha\(2018;6;30\)******** \)  |  2


\*\[FILTROS: 46,47,48,49,50\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=CantidadManoDeObraCC \( \)

Descripción

Esta función calcula el tiempo que fue usado para realizar las actividades
creadas en la empresa. Tenga en cuenta que esta función es basada en el
sistema de actividades y labores por lo que solo es utilizada en empresas con
el módulo de costos de ContaPyme®.

Si desea conocer el tiempo de ejecución de una labor específica, vea la
función **CantidadManoDeObraLabor**

Otras aplicaciones

Con esta función también podrá:

  * Calcular el tiempo utilizado en labores que se imputaron a un centro de costos determinado.

Sintaxis

|  =CantidadManoDeObraCC  |  \( ** NUnidadMdO; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NUnidadMdO
\(Requerido\)  |  Alfanumérico  |  Unidad de tiempo por la cuál desea filtrar

Ej1. **"HORA"**
Ej2. **"JOR"** |  Valor requerido
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** de las labores realizadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar las labores realizadas..  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha Labor  |  Cód. Labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad producida  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  5 Hora  |  $24.870
1  |  13/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  1 Jor  |  $35.980
1  |  1/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  1.5 Jor  |  $42.820
1  |  10/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  9 Hora  |  $14.500
1  |  17/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  3 Hora  |  $32.100
1  |  25/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  8 Hora  |  $13.200
1  |  12/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CantidadManoDeObraCC \( NUnidadMdO**;** FechaIni\* **;** FechaFin\* **;**
IEmp\* **;** ICC\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánta mano de obra en horas fue usada en la empresa 1, CMB muebles en el año 2018?.  |  =CantidadManoDeObraCC\( "HORA"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**** \)  |  33.5
Cuánta mano de obra en jornales fue usada en la empresa 1, CMB muebles en el año 2018?.  |  =CantidadManoDeObraCC\( "JOR"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)**;** 1 \)  |  2.5
¿Cuánta mano de obra en horas fue usada en la empresa 1, CMB muebles en el primer semestre del año 2018 por el centro de costos 13?.  |  =CantidadManoDeObraCC\( "HORA"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;6;30\)**;** 1**;** 13 \)  |  14

---

=CantidadManoDeObraLabor \( \)

Descripción

Esta función calcula el tiempo que fue usado para realizar una labor
determina. Tenga en cuenta que esta función es basada en el sistema de
actividades y labores por lo que solo es utilizada en empresas con el módulo
de costos de ContaPyme®.


Otras aplicaciones

Con esta función también podrá:

  * Calcular el tiempo que fue usado en todas las labores de una actividad determinada.
  * Calcular el tiempo utilizado por realizar una labor según el centro de costos a la que fue imputado.

Sintaxis

|  =CantidadManoDeObraLabor  |  \( ** ILabor\*; IActividad; NUnidadMdO\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor\*
\(Opcional\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Realiza los cálculos con todas las labores creadas para la actividad puesta en el argumento IActividad.
IActividad
\(Requerido\)  |  Alfanumérico  |  Código de la actividad por la cual se desea filtrar.  |  Valor requerido
NUnidadMdO\*
\(Opcional\)  |  Alfanumérico  |  Unidad de tiempo por la cuál desea filtrar

Ej1. **"HORA"**
Ej2. **"JOR"** |  Realiza los cálculos con todas las unidades de tiempo utilizadas en el módulo de actividades y labores.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** de las labores realizadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar las labores realizadas..  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha Labor  |  Cód. Labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad producida  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  5 Hora  |  $24.870
1  |  13/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  1 Jor  |  $35.980
1  |  1/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  1.5 Jor  |  $42.820
1  |  10/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  9 Hora  |  $14.500
1  |  17/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  3 Hora  |  $32.100
1  |  25/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  8 Hora  |  $13.200
1  |  12/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.

=CantidadManoDeObraLabor  |  \( ** ILabor\*; IActividad; NUnidadMdO\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuánta tiempo en horas fue invertido en la labor de siembra en el año 2018?.  |  =CantidadManoDeObraLabor\( 100**;** 1**;** "HORA"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;1;31\)**;** 1 \)  |  16.5
¿Cuánta tiempo fue invertido en la labor de recolección en el primer semestre del año 2018?.  |  =CantidadManoDeObraLabor\( 200**;** 1**;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;6;30\)**;** 1 \)  |  2.5
¿Cuánta mano de obra en jornales fue usada en la actividad 1 en el mes de febrero del año 2018 y imputado al centro de costos 13?.  |  =CantidadManoDeObraLabor\( **;** 1**;** "JOR"**;** Fecha\(2018;2;1\)**;** Fecha\(2018;2;28\)**;** 1**;** 13 \)  |  1

---

=CantidadProducida \( \)

Descripción

Esta función calcula la cantidad producida de un producto, en un periodo de
tiempo determinado

Tenga en cuenta que esta función es basada en ContaPyme® de actividades y
labores por lo que solo es utilizada en empresas con el módulo de costos de
ContaPyme®.


Otras aplicaciones

Con esta función también podrá:

  * Calcular la cantidad producida de un producto elaborado en un centro de costos determinado, en un periodo de tiempo dado.

Sintaxis

|  =CantidadProducida  |  \( ** NProducto; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NProducto
\(Requerido\)  |  Alfanumérico  |  Nombre del producto del cual se quiere conocer la cantidad producida.

Ej1. **"Clic"**
Ej2. **"Naranjas"** |  Valor requerido
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** de las labores realizadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar laos productos producidos.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha Labor  |  Cód. Labor  |  Labor  |  ¿Labor de producción?  |  Nombre producto  |  Cantidad producida  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  |  |  2 Hec  |  5 Hora  |  $24.870
1  |  13/02/2018  |  200  |  Recolección  |  Sí  |  Naranja  |  100 Kg  |  1 Jor  |  $35.980
1  |  1/04/2018  |  200  |  Recolección  |  Sí  |  Naranja  |  120 Kg  |  1.5 Jor  |  $42.820
1  |  10/06/2018  |  300  |  Pesaje  |  |  |  20 Und  |  9 Hora  |  $14.500
1  |  17/08/2018  |  100  |  Siembra  |  |  |  3 Hec  |  3 Hora  |  $32.100
1  |  25/11/2018  |  200  |  Recolección  |  Sí  |  Naranja  |  35 Und  |  8 Hora  |  $13.200
1  |  12/12/2018  |  100  |  Siembra  |  |  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.

=CantidadProducida  |  \( ** NProducto; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---

Descripción  |  Fórmula  |  Respuesta  |  Explicación
---|---|---|---
Determinar ¿cuánta naranja fue producida en el año 2018?.  |  =CantidadProducida\( "Naranja"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1 \)  |  255  |  Tenga en cuenta que la producción esta dada en Kilogramos, por lo tanto su respuesta también. Esto quiere decir que se han recogido 255kg en el año 2018.

---

=CostoLabor \( \)

Descripción

Esta función calcula el costo de realizar una labor determina. Tenga en cuenta
que esta función es basada en ContaPyme® de actividades y labores por lo que
solo es utilizada en empresas con el módulo de costos de ContaPyme®.


Otras aplicaciones

Con esta función también podrá:

  * Calcular el costo de las labores realizadas en un centro de costos determinado
  * Calcular el costo de las labores realizadas según el tipo de recurso utilizado.
1 - Mano de obra
2 - Elemento de control
3 - Uso de maquinaria

Sintaxis

|  =CostoLabor  |  \( ** ILabor\*; IActividad; ITipoRecurso\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor\*
\(Opcional\)  |  Alfanumérico  |  Código de la labor por la cual se conocer el costo de ejecutarla.  |  Realiza los cálculos con todas las labores creadas para la actividad puesta en el argumento IActividad.
IActividad
\(Requerido\)  |  Alfanumérico  |  Código de la actividad a la cual pertenece la labor utilizada en la función.  |  Valor requerido
ITipoRecurso\*
\(Opcional\)  |  Alfanumérico  |  Código del tipo de recurso por el cual se quiere filtrar.

1 - Mano de obra
2 - Elemento de control
3 - Uso de maquinaria

|  Realiza los cálculos con los tres tipos de recursos existentes.
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** de las labores realizadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Establece el código de la empresa de trabajo configurada en el momento.
ICC\*
\(Opcional\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar las labores realizadas.  |  Realiza los cálculos con todos los centros de costos creados en el explorador gráfico de ContaPyme®.

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha Labor  |  Cód. Labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad de labor  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  5 Hora  |  $24.870
1  |  13/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  1 Jor  |  $35.980
1  |  1/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  1.5 Jor  |  $42.820
1  |  10/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  9 Hora  |  $14.500
1  |  17/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  3 Hora  |  $32.100
1  |  25/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  8 Hora  |  $13.200
1  |  12/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.

=CostoLabor  |  \( ** ILabor\*; IActividad; ITipoRecurso\*; FechaIni\*; FechaFin\*; IEmp\*; ICC\* ** \)
---|---

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál fue el costo de la labor de recolección del primer semestre del año 2018?.  |  =CostoLabor\( 200**;** 1**;** **;** Fecha\(2018;1;1\)**;** Fecha\(2018;6;30\)**** \)  |  $ 78.800
¿Cuánto fue el costo por realizar las labores imputadas al centro de costo 13 en el segundo semestre del año 2018?.  |  =CostoLabor\( **;** 1**;** **;** Fecha\(2018;7;1\)**;** Fecha\(2018;12;31\)**;** 1 **;** 13 \)  |  $ 95.500
¿Determinar cuál fue el costo de las labores realizadas con el tipo de recurso mano de obra, en el año 2018?.  |  =CostoLabor\( **;** 1**;** "JOR"**;** Fecha\(2018;2;1\)**;** Fecha\(2018;2;28\)**;** 1**;** 13 \)  |  $ 213.670

---

=FechaFinUltimaVezLabor \( \)

Descripción

Esta función muestra la fecha del día domingo de la semana en que finalizó una
labor, según una fecha de referencia.

Tenga en cuenta que la función trae la fecha según las operaciones realizadas
desde el sistema con la operación planilla de labores.

Sintaxis

|  =FechaFinUltimaVezLabor  |  \( ** ILabor; Fecha\*; IEmp; ICC ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Valor requerido
**Fecha\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea traer la fecha en que se finalizó la última labor por la cual se filtró la función.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp
\(Requerido\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Valor requerido
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar las labores realizadas..  |  Valor requerido

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. actividad  |  Fecha inicio Labor  |  Cód. labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad realizada  |  Fecha de finalización
---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  21/01/2018
1  |  12/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  25/02/2018
1  |  2/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  12/04/2018
1  |  11/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  24/06/2018
1  |  20/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  2/09/2018
1  |  26/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  2/12/2018
1  |  10/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  23/12/2018

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=FechaFinUltimaVezLabor \( ILabor**;** Fecha\* **;** IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuándo fue la fecha de finalización de la última siembra que se hizo, si hoy es 28/06/2018?.  |  =FechaFinUltimaVezLabor\( "100"**;** Fecha\(2018;6;28\)**;** 1**;** 13\)  |  21/1/2018
¿Cuándo fue la fecha de finalización del último pesaje que se hizo, si hoy es 3/12/2018?.  |  =FechaFinUltimaVezLabor\( "300"**;** Fecha\(2018;12;3\)**;** 1 **;** 13 \)  |  2/12/2018
¿Cuándo fue la fecha de finalización de la labor recolección que se hizo, teniendo como fecha de referencia el 2/04/2018?.  |  =FechaFinUltimaVezLabor\( "200"**;** Fecha\(2018;04;2\)**;** 1 **;** 13 \)  |  15/04/2018

Tenga en cuenta que la fecha que trae la función es la del día domingo de la
semana en que finaliza la labor y no la fecha en que terminá la labor, tal
como se muestra en el último ejemplo.

---

=FechaIniUltimaVezLabor \( \)

Descripción

Esta función muestra la fecha del día lunes de la semana en que inició una
labor, según una fecha de referencia.

Tenga en cuenta que la función trae la fecha según las operaciones realizadas
desde el sistema con la operación planilla de labores.

Sintaxis

|  =FechaIniUltimaVezLabor  |  \( ** ILabor; Fecha\*; IEmp; ICC ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Valor requerido
**Fecha\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea traer la fecha en que se inició por última vez la labor por la cual se filtró la función.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp
\(Requerido\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Valor requerido
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos por el cuál se desea filtrar las labores realizadas.  |  Valor requerido

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha inicio labor  |  Cód. labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad realizada  |  Fecha de finalización
---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  21/01/2018
1  |  12/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  25/02/2018
1  |  4/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  15/04/2018
1  |  11/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  24/06/2018
1  |  20/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  2/09/2018
1  |  26/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  2/12/2018
1  |  10/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  23/12/2018

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=FechaIniUltimaVezLabor \( ILabor**;** Fecha\* **;** IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuándo fue que inició la última siembra que se hizo, si hoy es 28/06/2018?.  |  =FechaIniUltimaVezLabor\( "100"**;** Fecha\(2018;6;28\)**;** 1**;** 13\)  |  15/1/2018
¿Cuál fue la fecha de inicio del último pesaje que se hizo, si hoy es 1/12/2018?.  |  =FechaIniUltimaVezLabor\( "300"**;** Fecha\(2018;12;1\)**;** 1 **;** 13 \)  |  26/11/2018
¿Cuándo fue la fecha en que inició la labor de recolección, teniendo como fecha de referencia el 7/04/2018?.  |  =FechaFinUltimaVezLabor\( "200"**;** Fecha\(2018;04;7\)**;** 1 **;** 13 \)  |  2/04/2018

Tenga en cuenta que la fecha que trae la función es la del día lunes de la
semana en que inició la labor y no la fecha en que empieza la labor, tal como
se muestra en el último ejemplo.

---

=NumeroVecesLabor \( \)

Descripción

Esta función calcula la cantidad de veces que se ha realizado una labor según
la empresa, el centro de costos imputado y un periodo de tiempo determinado.

Tenga en cuenta que esta función está basada en ContaPyme® de actividades y
labores por lo que solo es utilizada en empresas con el módulo de costos de
ContaPyme®.

Sintaxis

|  =NumeroVecesLabor  |  \( ** ILabor; FechaIni\*; FechaFin\*; IEmp; ICC ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Valor requerido
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** de las labores realizadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp
\(Requerido\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Valor requerido
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar las labores realizadas.  |  Valor requerido

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha Labor  |  Cód. Labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad de labor  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  5 Hora  |  $24.870
1  |  13/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  1 Jor  |  $35.980
1  |  1/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  1.5 Jor  |  $42.820
1  |  10/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  9 Hora  |  $14.500
1  |  17/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  3 Hora  |  $32.100
1  |  25/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  8 Hora  |  $13.200
1  |  12/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NumeroVecesLabor \( ILabor**;** FechaIni\* **;** FechaFin\* **;** IEmp**;**
ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuántas veces se realizó la labor de recolección en el año 2018?.  |  =NumeroVecesLabor\( "200"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1**;** 13\)  |  2
¿Cuántas veces se realizó la labor de siembra en el centro de costos 13 el segundo semestre del año 2018?.  |  =NumeroVecesLabor\( "100"**;** Fecha\(2018;7;1\)**;** Fecha\(2018;12;31\)**;** 1 **;** 13 \)  |  2
¿Cuántas veces se realizó la labor de Pesaje en el centro de costos 13 en el año 2018?.  |  =NumeroVecesLabor\( "300"**;** Fecha\(2018;7;1\)**;** Fecha\(2018;12;31\)**;** 1 **;** 13 \)  |  2
¿Cuántas veces se realizó la labor de siembra en el centro de costos 13 en el año 2018?.  |  =NumeroVecesLabor\( "100"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1 **;** 13 \)  |  3

---

=FechaFinUltimaVezLabor \( \)

Descripción

Esta función muestra la fecha del día domingo de la semana en que finalizó una
labor, según una fecha de referencia.

Tenga en cuenta que la función trae la fecha según las operaciones realizadas
desde el sistema con la operación planilla de labores.

**Descontinuada**. Esta función ha sido reemplazada por
**FechaFinUltimaVezLaborActividad**.

Sintaxis

|  =FechaFinUltimaVezLabor  |  \( ** ILabor; Fecha\*; IEmp; ICC ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Valor requerido
**Fecha\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea traer la fecha en que se finalizó la última labor por la cual se filtró la función.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp
\(Requerido\)  |  Alfanumérico  |  Código de la empresa basado en el explorador gráfico de empresas de ContaPyme® por la cual se desea filtrar.  |  Valor requerido
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar las labores realizadas..  |  Valor requerido

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. actividad  |  Fecha inicio Labor  |  Cód. labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad realizada  |  Fecha de finalización
---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  21/01/2018
1  |  12/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  25/02/2018
1  |  2/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  12/04/2018
1  |  11/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  24/06/2018
1  |  20/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  2/09/2018
1  |  26/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  2/12/2018
1  |  10/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  23/12/2018

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=FechaFinUltimaVezLabor \( ILabor**;** Fecha\* **;** IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuándo fue la fecha de finalización de la última siembra que se hizo, si hoy es 28/06/2018?.  |  =FechaFinUltimaVezLabor\( "100"**;** Fecha\(2018;6;28\)**;** 1**;** 13\)  |  21/1/2018
¿Cuándo fue la fecha de finalización del último pesaje que se hizo, si hoy es 3/12/2018?.  |  =FechaFinUltimaVezLabor\( "300"**;** Fecha\(2018;12;3\)**;** 1 **;** 13 \)  |  2/12/2018
¿Cuándo fue la fecha de finalización de la labor recolección que se hizo, teniendo como fecha de referencia el 2/04/2018?.  |  =FechaFinUltimaVezLabor\( "200"**;** Fecha\(2018;04;2\)**;** 1 **;** 13 \)  |  15/04/2018

Tenga en cuenta que la fecha que trae la función es la del día domingo de la
semana en que finaliza la labor y no la fecha en que terminá la labor, tal
como se muestra en el último ejemplo.

---

=FechaIniUltimaVezLabor \( \)

Descripción

Esta función muestra la fecha del día lunes de la semana en que inició una
labor, según una fecha de referencia.

Tenga en cuenta que la función trae la fecha según las operaciones realizadas
desde el sistema con la operación planilla de labores.

**Descontinuada**. Esta función ha sido reemplazada por
**FechaIniUltimaVezLaborActividad**.

Sintaxis

|  =FechaIniUltimaVezLabor  |  \( ** ILabor; Fecha\*; IEmp; ICC ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Valor requerido
**Fecha\***
\(Opcional\)  |  Fecha  |  Establece el momento en que se desea traer la fecha en que se inició por última vez la labor por la cual se filtró la función.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp
\(Requerido\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Valor requerido
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos por el cuál se desea filtrar las labores realizadas.  |  Valor requerido

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha inicio labor  |  Cód. labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad realizada  |  Fecha de finalización
---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  21/01/2018
1  |  12/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  25/02/2018
1  |  4/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  15/04/2018
1  |  11/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  24/06/2018
1  |  20/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  2/09/2018
1  |  26/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  2/12/2018
1  |  10/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  23/12/2018

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=FechaIniUltimaVezLabor \( ILabor**;** Fecha\* **;** IEmp**;** ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuándo fue que inició la última siembra que se hizo, si hoy es 28/06/2018?.  |  =FechaIniUltimaVezLabor\( "100"**;** Fecha\(2018;6;28\)**;** 1**;** 13\)  |  15/1/2018
¿Cuál fue la fecha de inicio del último pesaje que se hizo, si hoy es 1/12/2018?.  |  =FechaIniUltimaVezLabor\( "300"**;** Fecha\(2018;12;1\)**;** 1 **;** 13 \)  |  26/11/2018
¿Cuándo fue la fecha en que inició la labor de recolección, teniendo como fecha de referencia el 7/04/2018?.  |  =FechaFinUltimaVezLabor\( "200"**;** Fecha\(2018;04;7\)**;** 1 **;** 13 \)  |  2/04/2018

Tenga en cuenta que la fecha que trae la función es la del día lunes de la
semana en que inició la labor y no la fecha en que empieza la labor, tal como
se muestra en el último ejemplo.

---

=NumeroVecesLabor \( \)

Descripción

Esta función calcula la cantidad de veces que se ha realizado una labor según
la empresa, el centro de costos imputado y un periodo de tiempo determinado.

Tenga en cuenta que esta función está basada en ContaPyme® de actividades y
labores por lo que solo es utilizada en empresas con el módulo de costos de
ContaPyme®.

**Descontinuada**. Esta función ha sido reemplazada por
**NumeroVecesLaborActividad**.

Sintaxis

|  =NumeroVecesLabor  |  \( ** ILabor; FechaIni\*; FechaFin\*; IEmp; ICC ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ILabor
\(Requerido\)  |  Alfanumérico  |  Código de la labor por la cual se desea filtrar.  |  Valor requerido
**FechaIni\***
\(Opcional\)  |  Fecha  |  Establecen el periodo de tiempo, filtrando por la **fecha de soporte** de las labores realizadas.

Se recomienda utilizar la función fecha para este argumento, así se evitan
confusiones entre fechas.

Ej. **FECHA\(2017;12;31\)** |  Establece la fecha desde el inicio de los tiempos \(1/1/1900\).
FechaFin\*
\(Opcional\)  |  Fecha  |  Establece la fecha de trabajo configurada en el momento.
IEmp
\(Requerido\)  |  Alfanumérico  |  Código de la empresa sobre la cual se realizará la consulta.  |  Valor requerido
ICC
\(Requerido\)  |  Alfanumérico  |  Código del centro de costos productor por el cuál se desea filtrar las labores realizadas.  |  Valor requerido

Ejemplos

  * En la empresa 1, Frutas & Verduras S.A., se tiene una actividad llamada naranja, de ésta se realizaron las siguientes labores en el año 2018.

Cód. Actividad  |  Fecha Labor  |  Cód. Labor  |  Labor  |  Tipo de recurso  |  Cód. CC  |  Cantidad de labor  |  Tiempo usado en la labor  |  Costo de la labor
---|---|---|---|---|---|---|---|---
1  |  15/01/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  2 Hec  |  5 Hora  |  $24.870
1  |  13/02/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  100 Kg  |  1 Jor  |  $35.980
1  |  1/04/2018  |  200  |  Recolección  |  Mano de obra  |  13  |  120 Kg  |  1.5 Jor  |  $42.820
1  |  10/06/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  20 Und  |  9 Hora  |  $14.500
1  |  17/08/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  3 Hec  |  3 Hora  |  $32.100
1  |  25/11/2018  |  300  |  Pesaje  |  Mano de obra  |  13  |  35 Und  |  8 Hora  |  $13.200
1  |  12/12/2018  |  100  |  Siembra  |  Mano de obra  |  13  |  9 Hec  |  8.5 Hora  |  $50.200

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NumeroVecesLabor \( ILabor**;** FechaIni\* **;** FechaFin\* **;** IEmp**;**
ICC \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuántas veces se realizó la labor de recolección en el año 2018?.  |  =NumeroVecesLabor\( "200"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1**;** 13\)  |  2
¿Cuántas veces se realizó la labor de siembra en el centro de costos 13 el segundo semestre del año 2018?.  |  =NumeroVecesLabor\( "100"**;** Fecha\(2018;7;1\)**;** Fecha\(2018;12;31\)**;** 1 **;** 13 \)  |  2
¿Cuántas veces se realizó la labor de Pesaje en el centro de costos 13 en el año 2018?.  |  =NumeroVecesLabor\( "300"**;** Fecha\(2018;7;1\)**;** Fecha\(2018;12;31\)**;** 1 **;** 13 \)  |  2
¿Cuántas veces se realizó la labor de siembra en el centro de costos 13 en el año 2018?.  |  =NumeroVecesLabor\( "100"**;** Fecha\(2018;1;1\)**;** Fecha\(2018;12;31\)**;** 1 **;** 13 \)  |  3

---

=NombreTipoDocumento \( \)

Descripción

Dado el código de un documento de soporte registrado en ContaPyme®, la función
muestra el nombre del documento de soporte.

Tenga en cuenta que el usuario puede crear o modificar documentos de soporte
desde su catálogo en ContaPyme®.

Sintaxis

|  =NombreTipoDocumento  |  \( ** ITipoDocumento\* ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITipoDocumento
\(Requerido\)  |  Numérico  |  Código de un documento de soporte registrado en ContaPyme®.  |  Valor requerido.

Documentos de soporte

Código documento  |  Tipo de documento
---|---
1  |  Factura de compra
2  |  Factura de venta
3  |  Recibo caja menor
4  |  Comprobante de ingreso
5  |  Comprobante de egreso
6  |  Factura de venta
7  |  Comprobante de ajuste
8  |  planilla de trabajo
9  |  Nota de embodegamiento
10  |  Planilla de eventos
11  |  Nota de eventos
12  |  Nota de contabilidad
13  |  Cierre de fin de mes
14  |  Cierre de fin de año
15  |  Nota débito
16  |  Nota crédito
17  |  Comprobante de consignación
18  |  Transacción cajero electrónico
19  |  Pagares banco
20  |  Letras de cambio
30  |  Remisión
41  |  Contrato civil de obra
990  |  Cargue inicial de saldos

Ejemplos

=NombreTipoDocumento \( \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el nombre del documento de soporte con código 1.  |  =NombreTipoDocumento \( 1 \)  |  Factura de venta
Determinar cuál es el nombre del documento de soporte con código 15.  |  =NombreTipoDocumento \( 15 \)  |  Nota débito

---

=ContarOprPorDocFiltro \( \)

Descripción

Esta función es utilizada para contar las operaciones que se han creado en
ContaPyme según los filtros dados en sus parámetros.

Permite principalmente filtrar las operaciones por el tipo documento soporte
con el cual fueron creadas.

Sintaxis

|  =ContarOprPorDocFiltro  |  \(** ITipoDocumento\*; FechaIni\*; FechaFin\*; IEmp\*; Filtro\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITipoDocumento\*
\(Opcional\)  |  Númerico  |  Código del tipo documento soporte con el cuál se han creado las operaciones y que será utilizado para aplicar el filtro.  |  No se aplicará algún filtro por tipo documento soporte.
FechaIni\*
\(Opcional\)  |  Fecha  |  Fecha desde la cuál se va a aplicar el filtro a las operaciones.

Se recomienda utilizar la función _Fecha_ para este argumento, así se evitan
confusiones con el formato de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Principio de los tiempos
FechaFin\*
\(Opcional\)  |  Fecha  |  Fecha hasta la cuál se va a aplicar el filtro a las operaciones.

Se recomienda utilizar la función _Fecha_ para este argumento, así se evitan
confusiones con el formato de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Numérico  |  Código de la empresa en la que se va a aplicar el filtro.  |  Establece el código de la empresa de trabajo configurada en el momento.
Filtro\*
\(Opcional\)  |  AlfaNumérico  |  Filtro adicional que se requiera aplicar la realizar el conteo.

Ej: **ICLASIFOP = 1** |  No aplica ningún filtro a la función.

Ejemplos

  * A continuación se visualizan algunos datos de ejemplo de operaciones registradas en ContaPyme®.

Tipo de operación
\(_Nombre tipo de operación_\)  |  Documento soporte
\(_Nombre documento soporte_\)  |  Documento número  |  Fecha soporte
---|---|---|---
ORD5
\(_Cotización al cliente_\)  |  33
\(_Cotización al cliente - Internacional_\)  |  CTC-IN-00009  |  02-ene-2019
ING1
\(_Factura de ventas_\)  |  2
\(_Factura de ventas_\)  |  FV-00150  |  04-ene-2019
ORD5
\(_Cotización al cliente_\)  |  33
\(_Cotización al cliente - Internacional_\)  |  CTC-IN-00010  |  04-ene-2019
MOV4
\(_Abono a cuentas por cobrar_\)  |  5
\(_Comprobante de ingreso_\)  |  CI-00011  |  08-ene-2019
ORD5
\(_Cotización al cliente_\)  |  32
\(_Cotización al cliente - Nacionales_\)  |  CTC-00030  |  08-ene-2019
ING1
\(_Factura de ventas_\)  |  2
\(_Factura de ventas_\)  |  FV-00151  |  15-ene-2019
ORD5
\(_Cotización al cliente_\)  |  33
\(_Cotización al cliente - Internacional_\)  |  CTC-IN-00011  |  20-ene-2019
ORD5
\(_Cotización al cliente_\)  |  32
\(_Cotización al cliente - Nacionales_\)  |  CTC-00031  |  29-ene-2019

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=ContarOprPorDocFiltro \( ITipoDocumento\* **;** FechaIni\* **;** FechaFin\*
**;** IEmp\* **;** Filtro\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántas cotizaciones se han realizado a clientes nacionales?.  _Estas cotizaciones se realizan con el documento soporte número**32** \(Cotización al cliente - Nacionales\) _ |  =ContarOprPorDocFiltro \( 32 \)  |  2
Determinar ¿cuántas cotizaciones se han realizado a clientes internacionales hasta el 15 de enero de 2019?.  _Estas cotizaciones se realizan con el documento soporte número**33** \(Cotización al cliente - Internacionales\) _ |  =ContarCuentasFiltro \( 33**;** Fecha\(2019; 1; 1\) **;** Fecha\(2019; 1; 15\) \)  |  2

---

=ContarOprPorOprTipoFiltro \( \)

Descripción

Esta función es utilizada para contar las operaciones que se han creado en
ContaPyme según los filtros dados en sus parámetros.

Permite principalmente filtrar las operaciones por su tipo, es decir, si son
operaciones o documentos de ingresos, gastos, abono a cuentas por cobrar,
facturas de venta, etc.

Sintaxis

|  =ContarOprPorOprTipoFiltro  |  \(** ITipoOperacion\*; FechaIni\*; FechaFin\*; IEmp\*; Filtro\* **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITipoOperacion\*
\(Opcional\)  |  Alfanúmerico  |  Código que identifica el tipo de operación a la que pertenece una operación.  Ver tipos de operaciones |  No se aplicará algún filtro por tipo de operación.
FechaIni\*
\(Opcional\)  |  Fecha  |  Fecha desde la cual se va a aplicar el filtro a las operaciones.

Se recomienda utilizar la función _Fecha_ para este argumento, así se evitan
confusiones con el formato de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Principio de los tiempos
FechaFin\*
\(Opcional\)  |  Fecha  |  Fecha hasta la cuál se va a aplicar el filtro a las operaciones.

Se recomienda utilizar la función _Fecha_ para este argumento, así se evitan
confusiones con el formato de las fechas.
Ej. **FECHA\(2017;12;31\)** |  Establece la fecha de trabajo configurada en el momento.
IEmp\*
\(Opcional\)  |  Numérico  |  Código de la empresa en la que se va a aplicar el filtro.  |  Establece el código de la empresa de trabajo configurada en el momento.
Filtro\*
\(Opcional\)  |  AlfaNumérico  |  Filtro adicional que se requiera aplicar la realizar el conteo.

Ej: **ICLASIFOP = 1** |  No aplica ningún filtro a la función.

Ejemplos

  * A continuación se visualizan algunos datos de ejemplo de operaciones registradas en ContaPyme®.

Tipo de operación
\(_Nombre tipo de operación_\)  |  Documento soporte
\(_Nombre documento soporte_\)  |  Documento número  |  Fecha soporte
---|---|---|---
ING1
\(_Factura de ventas_\)  |  2
\(_Factura de ventas_\)  |  FV-00150  |  05-ene-2019
MOV4
\(_Abono a cuentas por cobrar_\)  |  5
\(_Comprobante de ingreso_\)  |  CI-00010  |  07-ene-2019
MOV4
\(_Abono a cuentas por cobrar_\)  |  5
\(_Comprobante de ingreso_\)  |  CI-00011  |  15-ene-2019
ING1
\(_Factura de ventas_\)  |  2
\(_Factura de ventas_\)  |  FV-00151  |  15-ene-2019
ORD5
\(_Cotización al cliente_\)  |  32
\(_Cotización al cliente_\)  |  CTC-00031  |  20-ene-2019
MOV4
\(_Abono a cuentas por cobrar_\)  |  5
\(_Comprobante de ingreso_\)  |  CI-00012  |  22-ene-2019
ING1
\(_Factura de ventas_\)  |  2
\(_Factura de ventas_\)  |  FV-00152  |  07-feb-2019
ING1
\(_Factura de ventas_\)  |  2
\(_Factura de ventas_\)  |  FV-00153  |  11-feb-2019
MOV4
\(_Abono a cuentas por cobrar_\)  |  5
\(_Comprobante de ingreso_\)  |  CI-00013  |  11-feb-2019
ORD5
\(_Cotización al cliente - Nacionales_\)  |  32
\(_Cotización al cliente_\)  |  CTC-00030  |  12-feb-2019
MOV4
\(_Abono a cuentas por cobrar_\)  |  5
\(_Comprobante de ingreso_\)  |  CI-00014  |  15-feb-2019
MOV4
\(_Abono a cuentas por cobrar_\)  |  5
\(_Comprobante de ingreso_\)  |  CI-00015  |  16-feb-2019

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=ContarOprPorOprTipoFiltro \( ITipoOperacion\* **;** FechaIni\* **;**
FechaFin\* **;** IEmp\* **;** Filtro\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuántos abonos a cuentas por cobrar se han realizado?.  _Cuyo tipo de operación es: MOV4_ |  =ContarOprPorOprTipoFiltro \( "MOV4" \)  |  6
Determinar ¿cuántas facturas de venta se han realizado en el mes de enero?.  _Cuyo tipo de operación es: ING1_ |  =ContarOprPorOprTipoFiltro \( "ING1"**;** Fecha\(2019; 1; 1\) **;** Fecha\(2019; 1; 15\) \)  |  3

Tipos de operaciones

Cód. Tipo de operación  |  Operación  |  Descripción
---|---|---
Ingresos y Gastos | ING3 | Ingresos | Ingresos y recaudos por conceptos diferentes a venta de productos terminados
ING2 | Ingresos recibidos por anticipado | Ingresos recibidos por anticipado amortizados mensualmente
COM5 | Gastos | Gastos con cargo a un centro de costos
COM3 | Gastos diferidos | Gastos diferidos amortizados mensualmente
MOV2 | Traslado de fondos | Permite mover dinero entre cuentas de banco, caja, tarjetas y terceros.
NOM2 | Nómina contable | Nómina contable para el pago de empleados
NOM3 | Novedades de nómina contable | Novedades de nómina contable para el pago de empleados
COM6 | Pagos | Pagos con cargo a un centro de costos
COM7 | Nota crédito de ingresos | Nota crédito a factura realizada con operación de ingresos
ING6 | Nota débito de ingresos | Nota débito a factura realizada con operación de ingresos
Contabilidad | MOV1 | Movimiento contable | Operación para grabación de movimiento contable.
MOV9 | Conciliación bancaria | Permite registrar la conciliación bancaria
TASA | Registro de tasas de cambio | Registro de tasas de cambio para monedas extranjeras
CIE1 | Acciones automáticas de fin de mes | Acciones automáticas de fin de mes
CIE9 | Cierre de fin de año | Cierre de fin de año.
Novedades oprs. en bloque | GEN1 | Novedad de productos | Registrar novedades de productos para operaciones en bloque
GEN2 | Novedad de ingresos | Registrar novedades de ingresos para operaciones en bloque
GEN3 | Novedad de gastos | Registrar novedades de gastos para operaciones en bloque
GEN4 | Novedad de movimiento contable | Registrar novedades de movimiento contable para operaciones en bloque
Proveedores \(CxP\) | MOV5 | Crear crédito o anticipo \(CxP\) | Permite registrar préstamos que le hacen a la finca.
MOV3 | Abono a cuentas por pagar. \(CxP\) | Permite registrar el abono a una cuenta por pagar o su cancelación definitiva.
MOV8 | Replanteamiento de un crédito o anticipo \(CxP\) | Operación para replantear el financiamiento de una cuenta por pagar
Cartera \(CxC\) | MOV6 | Crear préstamo o anticipo \(CxC\) | Permite registrar los préstamos que la empresa hace.
MOV4 | Abono a cuentas por cobrar. \(CxC\) | Permite registrar el abono o cancelación de cuentas por cobrar a terceros.
MOV8 | Replanteamiento de un préstamo o anticipo \(CxC\) | Operación para replantear el financiamiento de una cuenta por cobrar
CAR1 | Deterioro de cartera | Deterioro de cartera
CAR2 | Reversión de deterioro de cartera | Reversión de deterioro de cartera
CAR3 | Registro de tasa máxima de interés por mora | Permite el registro de un tasa máxima de interés por mora en determinado periodo.
Activos | ACT2 | Compra/Mayor valor activos e inversiones | Compra/Mayor valor de activos de la finca.
ACT4 | Venta de activos | Venta de activos fijos.
ACT6 | Revaluación de activos | Revaluación de activos de propiedad planta y equipo
ACT7 | Deterioro de activos | Deterioro de activos de propiedad planta y equipo
ACT5 | Reclasificación de activos | Reclasificación de activos
ACT8 | Baja de activos e inversiones | Dar de baja a un activo.
PLA7 | Planilla uso de maquinaria y equipo | Planilla para registrar el uso de maquinaria y equipos \(activos\)
Inventarios | COM2 | Ajustes de inventario | Ajustes de inventario de bodega
KAR2 | Traslado entre bodegas | Traslado de recursos entre bodegas
KAR4 | Transformación de productos | Transformación de productos
KAR5 | Traslado de productos entre procesos | Traslado de productos entre procesos de la empresa
KAR6 | Deterioro de inventarios | Deterioro o reversión del deterioro de inventarios
KAR3 | Movimiento universal de inventario | Operación para movimiento universal de inventario
Compras | ORD5 | Orden de compra al proveedor | Permite crear una orden de compra al proveedor
COM1 | Compras | Operación para registrar la compra de productos
ING4 | Devolución en compras | Devolución en compras de productos o insumos
ORD6 | Recepción de materiales | Permite crear una recepción de materiales
OR22 | Devolución de materiales recibidos | Permite hacer una devolución de productos por un cliente
ORD3 | Requisición interna | Permite crear una requisición interna
PLA2 | Planilla uso y/o consumos | Planilla de uso y/o consumos de elementos y materias primas
ORD9 | Cerrar documentos | Cerrar docuemntos abiertos
Ventas | ORD4 | Cotización al cliente | Operación para crear una cotización
ORD1 | Pedido de un cliente | Permite crear un pedido del cliente
ING1 | Facturación y ventas | Facturación y venta de mercancías y/o productos
ING5 | Punto de venta | Facturación y venta con Punto de venta
COM4 | Devolución en ventas | Devolución en ventas de productos terminados
ING7 | Nota crédito de ventas | Nota crédito a factura realizada con operación de ventas o punto de venta
ING8 | Nota débito de ventas | Nota débito a factura realizada con operación de ventas o punto de venta
ORD2 | Remisión al cliente \(guia de despacho\) | Permite crear una remisión al cliente \(guia de despacho\)
OR66 | Devolución de productos remitidos | Permite hacer una devolución de materiales a un proveedor
KAR1 | Embodegamiento de productos | Embodegamiento de productos
ORD9 | Cerrar documentos | Cerrar docuemntos abiertos
Órdenes | OP1  | Orden de producción | Operación para crear nuevas órdenes de producción
CC24 | Finalización orden de producción | Permite finalizar una orden de producción
OT1  | Orden de trabajo | Operación para crear nuevas órdenes de trabajo
CC26 | Activar orden de trabajo en desarrollo | Permite activar una orden de trabajo que está en desarrollo
CC25 | Finalización orden de trabajo | Permite finalizar una orden de trabajo
Centros de costos | CC1  | Activación de un centro de costos | Activación de un centro de costos en construcción o maquinaria y equipo en montaje
CC2  | Finalización centro de costos | Permite finalizar o reinicializar un centro de costos
CIE3 | Cierre del ciclo de costos | Cierre del ciclo de costos de centros de costos en producción
Cultivos | CC11 | Activación de un cultivo perenne en desarrollo | Permite activar un cultivo en fase de desarrollo
CC21 | Zoca o erradicación de un cultivo perenne | Permite registrar la zoca o erradicación de un cultivo perenne.
CC23 | Erradicación/recolección de un cultivo transitorio | Permite registrar erradicación/recolección de un cultivo transitorio.
Labores | ORD7 | Contrato de labores | Permite crear un contrato de labores
OR91 | Finalización de contratos | Permite finalizar contratos civiles de obra
NOM1 | Pago de empleados | Permite realizar un pago a un empleado de la finca
PLA5 | Planilla de labores | Planilla de labores
Cargue Inicial | MOV0 | Cargue inicial cuentas | Operación para la grabación de cargue inicial de saldos contables.
KAR0 | Cargue inicial inventarios | Operación de cargue inicial de inventarios
ACT1 | Cargue de saldos actualizados de activos | Cargue inicial de activos fijos e inversiones
ACT3 | Conversión de activos a NIIF | Operación para la conversión de activos a NIIF
Obsoletas | ACT0 | Cargue histórico de activos | Operación para el cargue histórico de los activos

---

=AtributoTercero \( \)

Descripción

Esta función es utilizada para conocer cualquier atributo de un tercero según
el código dado. Tenga en cuenta que los atributos son características dadas a
cada tercero y se configuran desde el catálogo de terceros de ContaPyme®.

Todos los atributos están descritos en la siguiente tabla de atributos. Ver
tabla.

Sintaxis

|  =AtributoTercero  |  \( ** NAtributo; ITerceros ** \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
NAtributo
\(Requerido\)  |  Alfanumérico  |  Determina el tipo de atributo que desea obtener. Ver tabla atributos.  |  Valor Requerido
ITerceros
\(Requerido\)  |  Alfanumérico  |  Código de un tercero creado en el catálogo de Terceros en ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan unos atributos de algunos terceros creados en el catálogo de terceros de ContaPyme®.

Código tercero  |  Nombre tercero  |  Tipo de tercero  |  Cód tipo de documento  |  Tipo de documento  |  Pais del tercero
---|---|---|---|---|---
102226432  |  Mario Sanchez  |  Cliente  |  13  |  Cédula de ciudadanía  |  Colombia
10212121  |  Andrea Zapata  |  Proveedor  |  22  |  Cédula de extranjería  |  Nicaragua
987452315  |  Sergio Bermudez  |  Empleado  |  13  |  Cédula de ciudadanía  |  Colombia

  * Con los datos anteriores, se utilizó la fórmula de la siguiente manera.


=AtributoTercero \( NAtributo**;** ITerceros \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el nombre del tercero 10212121?.  |  =AtributoTercero \( "NTercero"**;** "10212121" \)  |  Andrea Zapata
¿Cúal es el código del tipo de documento que utiliza el tercero 10212121?.  |  =AtributoTercero \( "ITDDOCUM"**;** "10212121" \)  |  22
¿Cúal es el tipo de documento que utiliza el tercero 10212121?.  |  =AtributoTercero \( "ITDDOCUM\_ABR"**;** "10212121" \)  |  CC
Determinar si el tercero 102226432 es un proveedor de la empresa.  |  =AtributoTercero \( "BPROVEEDOR"**;** "102226432" \)  |  F

T =Verdadero, el tercero cumple con el atributo dado.
F =Falso, el tercero no cumple con el atributo dado.


\*\[ATRIBUTOS:Terceros\]\*

---

=CelularTercero \( \)

Descripción

Esta función es utilizada para mostrar el número de celular de un tercero,
según el código dado.

Sintaxis

|  =CelularTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código del tercero que se quiere conocer el celular.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Número de celular
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  3213862124
904002491  |  Juan David Quintero  |  3127858756

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CelularTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
¿Cuál es el número de celular del tercero con código 10212121?.  |  =CelularTercero
\( 10212121 \)  |  3213862124

---

=CiudadTercero \( \)

Descripción

Esta función es utilizada para mostrar la ciudad principal de un tercero,
según el código dado.

Sintaxis

|  =CiudadTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código del tercero que se quiere conocer la ciudad de donde proviene.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Ciudad principal
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  Manizales
904002491  |  Juan David Quintero  |  Bogotá

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=CiudadTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es la ciudad principal del tercero con código 10212121?.  |  =CiudadTercero
\( 10212121 \)  |  Manizales

---

=ContarTercerosFiltro \( \)

Descripción

Esta función es utilizada para contar los terceros según un filtro
determinado.

Vea algunos filtros usados en esta función. Filtros.

Sintaxis

|  =ContarTercerosFiltro  |  \(** ITercero\*; Filtro\*; **\)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero\*
\(Opcional\)  |  Alfanumérico  |  Código de uno o varios terceros por los que se desea filtrar  |  Calcula con todos los terceros del catálogo de terceros de ContaPyme®.
Filtro\*
\(Opcional\)  |  Alfanumérico  |  Filtro que se desea aplicar a la función

Ver algunos filtros.  |  No aplica ningún filtro a la función.

Ejemplos

  * A continuación se visualizan unos atributos de algunos terceros creados en el catálogo de terceros de ContaPyme®.

Código tercero  |  Nombre tercero  |  Tipo de tercero  |  Cód tipo de documento  |  Tipo de documento  |  Pais del tercero
---|---|---|---|---|---
102226432  |  Mario Sanchez  |  Cliente  |  13  |  Cédula de ciudadanía  |  Colombia
10212121  |  Andrea Zapata  |  Proveedor  |  22  |  Cédula de extranjería  |  Nicaragua
987452315  |  Sergio Bermudez  |  Empleado  |  13  |  Cédula de ciudadanía  |  Colombia
1030562154  |  Andres Gómez  |  Proveedor  |  13  |  Cédula de ciudadanía  |  Colombia
122254682  |  Juan García  |  Cliente  |  13  |  Cédula de ciudadanía  |  Colombia
896564125  |  Felipe Jiménez  |  Cliente  |  13  |  Cédula de ciudadanía  |  Colombia

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=ContarTercerosFiltro \( ITercero\* **;** Filtro\* \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuántos terceros tipo proveedor hay.  |  =AtributoTercero \( **;** FiltroTercero\_SoloProveedores\(\) \)  |  2
Determinar cuántos terceros tipo cliente hay.  |  =AtributoTercero \( **;** FiltroTercero\_TipoCliente\("4"\) \)  |  3



\*\[FILTROS: 19,20,23,28,41\]\*

**Si desea ver todos los filtros, vuelva al menú principal, ingrese a filtros
y vea la tabla filtros.**

---

=DireccionTercero \( \)

Descripción

Esta función es utilizada para mostrar la direccion de un tercero, según el
código dado.

Sintaxis

|  =DireccionTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código del tercero que se quiere conocer la dirección de residencia.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Dirección
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  Calle 32 \# 14 - 25
904002491  |  Juan David Quintero  |  Calle 52 \# 36 - 18

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=DireccionTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es la dirección del tercero con código 10212121?.  |  =DireccionTercero
\( 10212121 \)  |  Calle 32 \# 14 - 25

---

=EmailTercero \( \)

Descripción

Esta función es utilizada para mostrar el email de un tercero, según el código
dado.

Sintaxis

|  =EmailTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código del tercero que se quiere conocer el correo electrónico.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Email
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  JoseAlbeiroP@gmail.com
904002491  |  Juan David Quintero  |  JuanQuintero\_90@hotmail.com

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=EmailTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar ¿cuál es el email del tercero con código 10212121?.  |  =EmailTercero
\( 10212121 \)  |  JoseAlbeiroP@gmail.com

---

=NacimientoTercero \( \)

Descripción

Esta función es utilizada para determinar la fecha de nacimiento de un
tercero, según el código dado.

Sintaxis

|  =NacimientoTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Fecha de nacimiento
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  12/dic/1985
904002491  |  Juan David Quintero  |  15/jun/1993

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NacimientoTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es la fecha de nacimiento del tercero con código 10212121  |  =NacimientoTercero
\( 10212121 \)  |  12/dic/1985

---

=NombreComercialTercero \( \)

Descripción

Esta función es utilizada para determinar el nombre comercial de un tercero,
según el código dado.

Sintaxis

|  =NombreComercialTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Nombre comercial
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  Plasticos S.A.
904002491  |  Juan David Quintero  |  IngenieriaCivil Ltda.

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NombreComercialTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el nombre comercial del tercero con código 10212121  |  =NombreComercialTercero
\( 10212121 \)  |  Plasticos S.A.

---

=NombreTercero \( \)

Descripción

Esta función es utilizada para mostrar el nombre de un tercero, según el
código dado.

Sintaxis

|  =NombreTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero
---|---
10212121  |  José Albeiro Pulgarín
904002491  |  Juan David Quintero

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=NombreTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Cuál es el nombre del tercero con código 10212121  |  =NombreTercero
\( 10212121 \)  |  José Albeiro Pulgarín

---

=PaisTercero \( \)

Descripción

Esta función es utilizada para determinar el país de un tercero, según el
código dado.

Sintaxis

|  =PaisTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  País
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  Colombia
904002491  |  Juan David Quintero  |  Paraguay

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=PaisTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el país del tercero con código 10212121  |  =PaisTercero
\( 10212121 \)  |  Colombia

---

=SexoTercero \( \)

Descripción

Esta función es utilizada para determinar el sexo de un tercero, según el
código dado.

Sintaxis

|  =SexoTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Sexo
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  Masculino
904002491  |  Juan David Quintero  |  Masculino
65487921  |  Pilar Marin  |  Femenino

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=SexoTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el sexo del tercero con código 10212121  |  =SexoTercero
\( 10212121 \)  |  M

---

=TelefonoTercero \( \)

Descripción

Esta función es utilizada para determinar el teléfono principal de un tercero.

Sintaxis

|  =TelefonoTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Teléfono
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  8805694
904002491  |  Juan David Quintero  |  8965142
65487921  |  Pilar Marin  |  \(1\) 4378956

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=TelefonoTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el teléfono principal del tercero con código 10212121  |  =TelefonoTercero
\( 8805694 \)  |  8805694

---

=TipoDocumentoTercero \( \)

Descripción

Esta función es utilizada para mostrar el id del tipo de documento de un
tercero.

Tenga en cuenta que el usuario puede modificar el id del tipo de documento
desde la tabla de títulos "tipos de documentos".

Sintaxis

|  =TipoDocumentoTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Tipos de documento

Id Tipo de documento  |  Tipo de documento
---|---
11  |  Registro civil de nacimiento
12  |  Tarjeta de identidad
13  |  Cédula de ciudadanía
14  |  Certificado Registraduría, sucesión ilíqui personas sin doc.
15  |  Tipo documento sucesión ilíquida expedido por notaria/juzgad
21  |  Tarjeta de extranjería
22  |  Cédula de extranjería
31  |  Nit
33  |  Identificación de extranjeros diferente al NIT asignado DIAN
41  |  Pasaporte
42  |  Tipo de documento extranjero
43  |  Sin identificación del exterior o uso definido por la DIAN
44  |  Documento de identificación extranjero Persona Jurídica
46  |  Carné Diplomático: expedido por Ministerio de Relaciones Ext
99  |  Código interno

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Id tipo de documento  |  tipo de documento
---|---|---|---
10212121  |  Jose Albeiro Pulgarin  |  13  |  Cédula de ciudadanía
904002491  |  Juan David Quintero  |  31  |  Nit
65487921  |  Pilar Marin  |  42  |  Tipo de documento extranjero

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=TipoDocumentoTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el id del tipo de documento del tercero con código 10212121  |  =TipoDocumentoTercero
\( 10212121 \)  |  13

---

=TratamientoTercero \( \)

Descripción

Esta función es utilizada para mostrar cuál es el debido tratamiento para un
tercero, según el código dado.

Sintaxis

|  =TratamientoTercero  |  \( ITercero \)
---|---|---

Argumento  |  Formato  |  Descripción  |  Valor si vacío
---|---|---|---
ITercero
\(Requerido\)  |  Alfanumérico  |  Código de un tercero del catálogo de terceros de ContaPyme®.  |  Valor Requerido

Ejemplos

  * A continuación se visualizan algunos terceros del catálogo de terceros de ContaPyme®.

Código Tercero  |  Nombre del tercero  |  Tratamiento
---|---|---
10212121  |  Jose Albeiro Pulgarin  |  Señor
904002491  |  Juan David Quintero  |  Ingeniero

  * Con los datos registrados se utilizó la fórmula de la siguiente manera.


=TratamientoTercero \( ITercero \)

Descripción  |  Fórmula  |  Respuesta
---|---|---
Determinar cuál es el tratamiento que se le debe dar al tercero con código 10212121  |  =TratamientoTercero
\( 10212121 \)  |  Señor

---
