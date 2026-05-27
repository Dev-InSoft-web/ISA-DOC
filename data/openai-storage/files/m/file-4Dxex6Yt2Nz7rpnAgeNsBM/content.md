# Contabilización Local

Active esta casilla para que el sistema realice el cierre de año, bajo la
contabilización Local.

Ejemplo

La empresa CMB Muebles requere realizar la operación de cierre de año,
únicamente bajo la contabilización Local, para este caso activa la opción
**"Contabilización Local"**

---

# Nivel

Código u orden de ejecución de la acción de cierre de año.

Ejemplo

Al ejecutar la operación de cierre de año 2015, el sistema realizará las
acciones de cierre en el orden, según el código indicado en el campo NIVEL.

A continuación, se muestra una imagen con el orden de ejecución según el
código NIVEL.

![Orden de ejecución según código numérico del campo
NIVEL.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Acciones%20de%20cierre%20de%20anio/%5B11690%5D%20FrmCntCierreAnio/imagen10.png)  

Observaciones

El código sólo admite caracteres numéricos.  
  
Si va a crear una nueva acción, se recomienda continuar con el consecutivo de
10 en 10.

---

# Contabilización NIIF

Active esta casilla para que el sistema realice el cierre de año, bajo la
contabilización NIIF.

Ejemplo

La empresa CMB Muebles requere realizar la operación de cierre de año,
únicamente bajo la contabilización NIIF, para este caso activa la opción
**"Contabilización NIIF"**

---

# Conservar CC Destino

Centro de costos que tendrá el movimiento de contrapartida de la cancelación
del saldo en la cuenta de resultado.

Observaciones

Se conserva el centro de costos original del saldo, siempre y cuando la cuenta
destino exija Centro de Costos.  
  
Si no se se activa esta opción, el saldo pasa sin centro de costos.

---

# Conservar tercero en destino

Tercero que tendrá el movimiento de contrapartida de la cancelación del saldo
en la cuenta de resultado.

Observaciones

Se conserva el tercero original del saldo, siempre y cuando la cuenta destino
exija tercero.  
  
Si no se se activa esta opción, el saldo pasa con el tercero indicado.

---

# Nombre

Nombre o descripción que tendrá la acción de cierre de año.

Ejemplo

Se requiere realizar para el cierre de año 2015 el Cálculo de utilidades del
año, asi que en el campo descripción indique **"Cálculo de utilidades del
año"**

---

# Cuenta desde

Indique o seleccione la cuenta desde la cual se evaluará la acción de cierre
de año.  

Ejemplo

Al realizar el cierre de año, en la acción orden 10 **"Cálculo de utilidaddes
del año"** , el sistema tomará las cuentas **"desde"** la cuenta 4, \(toda la
cuenta de ingresos\),esto significa que el sistema cancelará los saldos desde
la cuentas 4, hasta el rango de cuentas que se indique en el campo "cuenta
hasta".

Observaciones

Para seleccionar los rangos de cuentas bastará con abrir el seleccionador del
plan de cuentas.  
  
Cómo se indicará un rango de cuentas "desde y hasta",la cuenta no tiene que
existir.

---

# Cuenta hasta

Indique o seleccione la cuenta hasta la cual se evaluará la acción de cierre
de año.  

Ejemplo

Al realizar el cierre de año, en la acción orden 10 **"Cálculo de utilidaddes
del año"** , el sistema tomará las cuentas indicadas en el campo **"hasta"**
799999, \(todas las cuentas de costos de producción\),lo que significa que el
sistema cancelará los saldos hasta el rango de cuentas que se indique en el
campo "cuenta hasta".

Observaciones

Para seleccionar los rangos de cuentas bastará con abrir el seleccionador del
plan de cuentas.  
  
Cómo se indicará un rango de cuentas "desde y hasta",la cuenta no tiene que
existir.

---

# Año relativo

Fecha en la cual el sistema asentará los registros.  
  
**Año de cierre:** es básicamente la fecha de soporte de la operación de
cierre de año, normalmente es el 31 de diciembre.  
**Primer día año siguiente:** Sería el primer día del año siguiente a la fecha
de soporte del cierre de año, que tomando el caso anterior sería el primero de
enero.

Ejemplo

Normalmente las acciones de cierre de fin de año que llevan como año relativo
**"el año de cierre"** son el cálculo de la utilidad que cancela las cuentas
de resultado y asienta el valor en la cuenta de ganancias y pérdidas.  
  
Las acciones que llevan como **"año relativo el primer día del año
siguiente"** , son entre otras, son el paso de la utilidad o pérdida del
ejercicio anterior que cancela la cuenta de utilidad o pérdida del ejercicio y
la pasa a la cuenta de utilidades o pérdidas acumuladas, y las acciones para
la cancelación de impuestos.

Observaciones

Si año relativo es cero, el asiento, tanto de cancelación de las cuentas como
el de asiento de la contrapartida quedarán en la misma fecha de soporte del
cierre de año.  
  
Si el año relativo es uno \(1\), el asiento quedará con la fecha del primer
día del año siguiente al de la fecha de soporte de cierre de año.

---

# Cuenta destino positivo

Cuenta de contrapartida que se debe acreditar en el caso de que haya habido
utilidades, es decir la suma de créditos menos débitos es positiva.  

Ejemplo

Tenemos los siguientes saldos:  Cuenta | Saldo  
---|---  
Ingresos | **$282.795.650**  
Gastos | **$75.818.325**  
Costos | **$169.395.399**  
  
Si realizamos la cancelación de estas cuentas, el resultado será un crédito
por **$37.581.926.**  
En este caso, el sistema primero evalúa si durante la cancelación, la
sumatoria de los ingresos menos los egresos dan positivo o negativo. Si hay
ganancias, la contrapartida es crédito y el asiento se hará en la cuenta
establecida en **"cuenta destino positivo".**

Observaciones

El sistema primero evaluará si durante la cancelación la sumatoria de los
ingresos menos los egresos dan positivo o negativo.  
  
Si hay ganancias, la contrapartida es crédito y el asiento se hará en la
cuenta establecida en **"Cuenta destino positivo"** y si hay pérdidas, la
contrapartida es débito, el asiento se hará en la cuenta establecida en
**"Cuenta destino negativo"**

---

# Cuenta destino negativo

Indique la cuenta de contrapartida que se debe debitar en caso de que haya
habido pérdidas, es decir la suma de créditos menos débitos sea negativa.

Ejemplo

Tenemos los siguientes saldos:  Cuenta | Saldo  
---|---  
Ingresos | **$282.795.650**  
Gastos | **$150.818.325**  
Costos | **$189.395.399**  
  
Si realizamos la cancelación de estas cuentas, el resultado será un débito por
**$57.418.074.**  
En este caso, el sistema primero evalúa si durante la cancelación, la
sumatoria de los ingresos menos los egresos dan positivo o negativo. Si hay
perdidas, la contrapartida es dédito y el asiento se hará en la cuenta
establecida en **"cuenta destino negativo".**

Observaciones

El sistema primero evaluará si durante la cancelación la sumatoria de los
ingresos menos los egresos dan positivo o negativo.  
  
Si hay ganancias, la contrapartida es crédito y el asiento se hará en la
cuenta establecida en **"Cuenta destino positivo"** y si hay pérdidas, la
contrapartida es débito, el asiento se hará en la cuenta establecida en
**"Cuenta destino negativo"**

---

# Tercero cuenta destino

Tercero que se usará en la cuenta destino.

Ejemplo

Al realizar el cierre de año, se requiere que el saldo de las cuentas de
impuestos incluidas en la acción "Impuestos de industria y comercio por pagar"
pasen co tercero DIAN.

Observaciones

Este dato es opcional.  
  
En las cuentas de impuestos se pude configurar el tercero DIAN.  
  
Sólo se activa está opción, si la cuenta destino tiene el atrubuto de "exige
centro de costos"

---

# Vigencia del concepto

Active esta casilla para especificar el mes a partir del cual estará vigente
este concepto.  
  
Normalmente, los conceptos vienen marcados con el año a partir del cual
empezarán a regir, pero en algunos casos se hace necesario indicar un mes
específico del año, para que solo a apartir de ese mes el concepto se tenga en
cuenta en el cálculo automático de impuestos.  
  
Cuando de un año a otro o de un mes a otro el mismo concepto sufre algún
cambio en su porcentaje o valor, se puede duplicar dicho concepto y cambiar el
año de vigencia o activar el mes de vigencia. En este caso, el concepto
quedará creado dos veces con el mismo código, esto con el fin de no tener que
ingresar a los diferentes catálogos del sistema donde se utilizan los
conceptos y tener que cambiarlo por el nuevo concepto. Esto permite que se
respete el año y mes de trabajo y así al registrar las diferentes operaciones
del sistema, se cargará el concepto con su valor o porcentaje correspondiente,
dependiendo de la fecha de soporte de la operación.

Ejemplo

La empresa CMB Muebles y Hogar tiene el concepto de liquidación IVAV16VL
correspondiente al IVA liquidado del 16%. A partir del año 2017,
específicamente del mes de febrero, todos los establecimientos de comercio
deben empezar a manejar un IVA liquidado del 19%. En este caso, se debe
duplicar el concepto IVAV16VL, cambiar el año de vigencia al 2017 y activar la
opción para especificar el mes e indicar el mes 2. Así, el nuevo concepto solo
se calculará cuando la operación tenga fecha de soporte desde el 1 de febrero
de 2017 y si se realiza una operación con fecha del año 2016 o con fecha de
enero de 2017, el sistema calculará el concepto que se encuentre vigente para
esa fecha.

---

#  Tipo de cálculo del impuesto, descuento o cargo

Valor...

Ejemplo

El...

Observaciones

El...

Configuración

Para activar impuesto saludable..., ver:**\[Pestaña...\]**

---

# Valor

Valor que se calculará para el cargo, impuesto o descuento.  
  
Cuando se realice el cálculo automático de los impuestos en las diferentes
operaciones, el sistema cargará el valor indicado en esta casilla y este se
convertirá en el valor del impuesto o cargo, siempre y cuando cumpla con las
demás condiciones que solicita el concepto como por ejemplo el valor base
mínimo y los atributos de la empresa y del tercero.

Ejemplo

El impuesto al consumo supone un cobro específico a cada producto vendido, el
cual depende de las características del mismo. En este caso, en el concepto de
liquidación se debe colocar dicho valor a calcular cuando se realice la venta
de ese producto.

Observaciones

El valor para el concepto también puede depender de las cantidades que se
cargan en las operaciones de Facturación y ventas y POS. En ese caso, se
tomará el valor del concepto y se multiplicará por la cantidad de producto
indicado en dichas operaciones.

---

# Porcentaje

Porcentaje que se utilizará para calcular el cargo, impuesto o descuento.  
  
Cuando se realice el cálculo automático de los impuestos en las diferentes
operaciones, el sistema tomará el valor base de la operación y lo multiplicará
por el porcentaje indicado en esta casilla. El resultado se convertirá en el
valor del impuesto o cargo, siempre y cuando cumpla con las demás condiciones
que solicita el concepto como por ejemplo el valor base mínimo y los atributos
de la empresa y del tercero.

Ejemplo

El impuesto sobre el valor agregado IVA supone un cobro del 19% sobre el valor
de venta de cada producto. En este caso, en el concepto de liquidación se debe
colocar dicho porcentaje para que el sistema tome el valor de venta del
producto y calcule este porcentaje.

---

# Suma para valor base

Active esta casilla para que, al calcularse este concepto, se sumen las bases
para formar la base de devoluciones.  
  
Esta opción sirve para tener presente los valores de las bases para realizar
la devolución de los 2 puntos del IVA.

Ejemplo

La empresa CMB Muebles y Hogar necesita que las bases del concepto de
liquidación del IVA se sumen para formar la base de las devoluciones. En este
caso, debe activar esta opción para que el sistema tenga en cuenta todas las
bases de las operaciones en las que se utilice el concepto de IVA.

Observaciones

Esta opción solo aparece en los conceptos de liquidación de ingreso y cuando
el área de trabajo es de Colombia.  
  
La devolución del IVA de los dos \(2\) puntos fue establecida en el artículo
33 de la Ley 863 de 2003 y reglamentada con el decreto 428 del 12 de febrero
de 2004.

---

# Valor base mínimo

Valor base mínimo sobre el cual se calculará el cargo, impuesto o descuento.  
  
Cuando se realice el cálculo automático de impuestos en las diferentes
operaciones, el sistema evaluará si el valor base para calcular los impuestos
es igual o superior al valor base mínimo. Si este valor está por debajo del
valor base mínimo, el concepto no se calculará.  
  
Si el valor base mínimo es cero, el cargo, impuesto o descuento se calculará
sin tener en cuenta un valor base, siempre y cuando cumpla con las demás
condiciones que solicita el concepto como por ejemplo el valor base mínimo y
los atributos de la empresa y del tercero.

Ejemplo

Conceptos de liquidación que aplican valor base mínimo: concepto para
Retención en la fuente, de retención de ICA, etc.

---

# Cómo afectará el ingreso a la empresa

Afectación que tendrá el concepto dentro de la operación.  
  
Este campo indica las posibles acciones que se pueden realizar en el concepto
con el valor calculado.  
  
  
**Sumar al total** | Impuesto de IVA   
**Restar al total** | Impuesto de Retención  
**Ni sumar ni restar al total** | Autorretención especial a título de renta \(Impuesto CREE\)  
  
Ejemplo

La empresa CMB Muebles y Hogar tiene creado el concepto de impuesto sobre el
valor agregado \(IVA\), al cual le realiza la siguiente configuración:  
  
Tipo de movimiento | Cómo afectará el ingreso a la empresa  
---|---  
Generar una cuenta por pagar | Suma al total a ingresar.  
  
Observaciones

Las opciones disponibles en este campo dependen directamente del Tipo de
movimiento seleccionado.[Ver más.](<\[290\]LblIAccion.html>)  
  
Cuando se realice el cálculo automático de impuestos en las diferentes
operaciones del sistema, se realizará de forma automática la acción indicada
aquí.

---

# Tipo de movimiento

Tipo de movimiento que generará el concepto de forma automática al procesar la
operación.  
  
Valores disponibles:  

  * **Generar una cuenta por cobrar**
  * **Generar una cuenta por pagar**
  * **Llevar al gasto**
  * **Llevar al ingreso**
  * **Generar un asiento de activos**

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar el concepto de impuesto
sobre el valor agregado \(IVA\), para ello seleccionar el siguiente tipo de
movimiento:

**Tipo de movimiento** | Generar una cuenta por pagar  
---|---  
  

Observaciones

El sistema creará de forma automática la cuenta por cobrar o pagar al tercero
que se especifique en la casilla 'Identificación o alias del tercero'. [Ver
más](<\[360\]LblINitCxX.html>)  
  
El asiento contable se realizará de forma automática en la cuenta que se
determine en el campo cuenta por pagar o cobrar. [Ver
más](<\[300\]LblICuenta.html>)  
  
Para el tipo de movimiento "generar un asiento de activos", éste sólo aplicará
en los descuentos o cargos para ingresos.

---

# Cuenta por pagar \(Cr\)

Cuenta por cobrar o por pagar a la que llevará el valor del concepto, impuesto
o cargo.

Ejemplo

La empresa CMB Muebles y Hogar tiene creado el concepto de impuesto sobre el
valor agregado \(IVA\), al cual le realiza la siguiente configuración:  
  
Tipo de movimiento | Cuenta por pagar que afectará el movimiento  
---|---  
Generar una cuenta por pagar | 24080119  
  

Observaciones

El tercero asociado a la cuenta por pagar, será el que se especifique en la
casilla 'Identificación o alias del tercero'. [Ver
más](<\[290\]LblIAccion.html>)

---

# Cuenta devolución IVA

Cuenta a la que se llevará el valor calculado al hacer una devolución de IVA.  
  
Si no se indica una cuenta, se asumirá la misma cuenta de IVA imputada en la
cuenta por pagar del concepto.

Ejemplo

La empresa CMB Muebles y Hogar tiene creado el concepto de impuesto sobre el
valor agregado \(IVA\), al cual le realiza la siguiente configuración:  
  
  
**Cuenta por pagar imputada en la venta** |  24080119 \(Ingresos con IVA 19%\)  
**Cuenta devolución IVA** | 24080290 \(IVA descontable por devoluciones en venta\)  
  

Observaciones

La impuatción contable de esta cuenta, sólo se calcula de forma automática en
la operación de devolución del módulo de inventarios.

---

# Cuenta Ingreso

Cuenta a la que se llevará el valor calculado del cargo, impuesto o concepto.  
  
Este campo será requerido cuando:  

* Se indique el tipo de movimiento "Llevar al gasto" o "Llevar al ingreso": en este caso se debe determinar la cuenta de egresos o ingresos que se afectará al procesar la operación.  

* La forma como afectará el concepto a la empresa es "No suma ni resta al total": en este caso se debe determinar la cuenta que se debe afectar en contrapartida a la cuenta determinada.  
  
Esto es porque al calcular este descuento, no se afectará el total a pagar en
la operación y por tanto, se debe determinar una cuenta para realizar un
asiento contrario al que se realice en la cuenta seleccionada en el campo
cuenta por pagar.  

Ejemplo

La empresa CMB Muebles y Hogar tiene creado el concepto de Autorretención
especial a título de renta \(Impuesto CREE\), al cual le realiza la siguiente
configuración:  
  
  
**Tipo de movimiento** | Generar una cuenta por pagar   
**Cuenta por cobrar** | 13559003 \(Autorretención especial a título de renta \(CREE 0.4%\)\)  
**Cuenta de ingreso** | 23659003 \(Autorretención especial a título de renta \(CREE 0.4%\)\)  
  
Observaciones

Se puede usar el signo igual \(=\) para indicar al sistema que la cuenta a
afectar será la misma que originó el cálculo del concepto.

---

# Activo

Código del activo al cual se imputará el ingreso o el gasto.  
  
Este campo es requerido cuando el tipo de movimiento seleccionado sea "Generar
un asiento de activos".

Ejemplo

La empresa CMB Muebles y Hogar realiza la compra de un activo y requiere que
el IVA haga parte del valor de compra. En este caso debe indicar el código del
activo correspondiente.

Observaciones

Se puede usar el signo igual \(=\) para indicar al sistema que el activo a
afectar será el mismo que originó el cálculo del concepto, es decir el activo
que se está utilizando en la operación.

---

# Centro de costos a afectar

Código del centro de costos al cual se cargará el ingreso o gasto calculado
por el concepto.  
  
El centro de costos se debe cargar si el tipo de movimiento seleccionado es
"Llevar al gasto" o "Llevar al ingreso" o cuando la forma como afectará el
concepto a la empresa sea "No suma ni resta al total".

Ejemplo

La empresa CMB Muebles y hogar ha creado un concepto de descuento por pronto
pago, la configuración del concepto es la siguiente:  
  
  
**Tipo de movimiento** | Llevar al gasto   
**Cuenta de egreso** | 530535 \(Descuentos comerciales condicionados\)  
**Centro de costos a afectar** |  1DPC \(Departamento comercial\)  
  
Observaciones

Se puede usar el signo igual \(=\) para indicar al sistema que el centro de
costos a afectar será el mismo que originó el cálculo del concepto, es decir,
el centro de costos que se afectó en la transacción.

---

# Tabla de definición de fechas de pagos a usar

Tabla que define la fecha estimada en la que se cancelará la cuenta por cobrar
o por pagar.  
  
La tabla de definición de fechas de pago permite definir las fechas de pago
para los periodos en que se cause la transacción. Cada tabla "programa" el
vencimiento de la cuenta por pagar o por cobrar dependiendo de la fecha de
soporte de la operación en la cual se use el concepto.  
  
![imagen1.png](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen1.png)  
  
El sistema cuenta con un catálogo de tablas de definición de fechas de pagos
desde el cual se puede seleccionar la tabla que corresponda de acuerdo al tipo
de concepto. Este campo sólo está disponible cuando el tipo de movimiento en
el concepto es "Generar una cuenta por pagar" o "Generar una cuenta por
cobrar".

Ejemplo

Tipo de concepto de liquidación | Tabla a usar  
---|---  
Concepto de IVA | IVA  
Concepto de retención en la fuente | RETENCION  
Concepto de cesantías | CESANTIAS  
Concepto de vacaciones | VACACIONES  
Conceptos de EPS, ARL, pensión | EPS,ARP,PENSION  
  
Configuración

Para ingresar al catálogo de tablas de definición de fechas de pago,
ver:**\[Pestaña contabilidad > despliega la flecha hacia abajo del Ícono de
Plan de cuentas > Tablas de fecha de pagos\]**

---

# Identificación o alias del tercero

Tercero o alias de tercero sobre el cual se generará el asiento contable del
concepto de liquidación \(cuenta por cobrar, cuenta por pagar, gasto o
ingreso\).  
  
Los alias de tercero permiten indicar un tercero del sistema que es usado de
forma general y que normalmente representa a una entidad. Los alias de tercero
son útiles puesto que están referenciados a terceros ya existentes y en caso
de necesitar cambiar dicho tercero, el cambio solo se realizaría en el alias y
no de forma general en los conceptos de liquidación.

Ejemplo

Tipo de concepto de liquidación | Alias de tercero a usar  
---|---  
Concepto de IVA | \[ADMINIMP\]  
Concepto de retención de ICA | \[ADMMPAL\]  
Concepto de cesantías | \[CESANTIAS\]  
Concepto de vacaciones | \[TERCEROOPR\]  
Conceptos de aportes de salud trabajador | \[EPS\]  
  
Observaciones

Si no desea seleccionar un alias de tercero para el concepto de liquidación,
puede indicar directamente un código de tercero ya existente en el sistema,
simplemente debe indicar entre corchetes \[ \] el código del tercero.

Configuración

Para ingresar al catálogo de alias de terceros, ver:**\[Pestaña básico >
despliega la flecha hacia abajo del Ícono de Terceros > Alias de terceros\]**

---

# Marcar el IVA como mayor valor

Active esta casilla si desea que el IVA generado por este concepto se sume
como un mayor valor del gasto o de la transacción.  
  
De esta forma el IVA se calculará sobre la cuenta indicada en el concepto, que
normalmente corresponde a la cuenta principal de la operación.  
  
El IVA como mayor valor es usado por aquellas empresas que pertenecen al
régimen simplificado o no son responsables de IVA, con el fin de poder llevar
un control de ese impuesto, llevándolo a la misma cuenta principal de la
operación y teniendo dicho valor discriminado.

Ejemplo

Conceptos marcados como la opción de IVA mayor valor: en todos los conceptos
relacionados con IVA, se crea un concepto hijo marcado como IVA como mayor
valor para discriminar allí los valores relacionados al IVA que se lleva en la
misma cuenta del gasto. También en las transacciones de activos fijos el IVA
se lleva como un mayor valor del bien adquirido y se toma como base para
depreciaciones.

Observaciones

Para que el IVA como mayor valor sea llevado a la misma cuenta del gasto o
cuenta principal de la transacción, en el campo "Cuenta egreso \(Db\)" se
colocará el signo igual = para que el sistema lleve el valor a la cuenta
principal de la trasacción.

---

# Usar el tercero o alias en el asiento de la cuenta de contrapartida

Active esta casilla si desea que al procesar la operación en la que se utilice
este concepto, el asiento en la cuenta de contrapartida asigne al tercero o
alias definido en el concepto.  
  
Si esta casilla se encuentra desactivada, el asiento para la cuenta de
contrapartida se llevará al tercero principal de la operación.  
  
Esta opción sólo está disponible cuando el tipo de movimiento en el concepto
es "Generar una cuenta por pagar" o "Generar una cuenta por cobrar" y cuando
la afectación del pago del tercero está activada como "No suma ni resta al
total".

Ejemplo

Conceptos en los que se lleva la contrapartida al tercero alias o definido en
el concepto: concepto de aportes de pensión patrono. En este caso, la cuenta
de contrapartida que es una cuenta del gasto, llevará como tercero principal a
la entidad de pensión y no al empleado.

---

# Nombre

Nombre del concepto de liquidación.  
  
Es muy recomendable que asigne un nombre descriptivo y preciso.  
  
Este nombre será usado para mostrarlo en todo el sistema, catálogos,
exploradores, informes, reportes, etc.

Ejemplo

Código del concepto | Nombre  
---|---  
IVAV05 | IVA 5%  
RETCOMPGL1 | Retención por compras en general - declarantes  
RETXICAC | Retención ICA Compras

---

# Atributos del tercero

Listado de atributos que se pueden seleccionar para el tercero.  
  
En este listado se mostrarán todos los posibles atributos legales que puede
tener el tercero con el que se realiza una transacción.  
  
Se puede seleccionar uno o varios atributos para relacionarlo con los
atributos de la empresa y al final determinar si el concepto se aplica o no
cuando se cumpla la condición.

Ejemplo

La empresa CMB Muebles y Hogar necesita que se aplique el concepto de IVA del
19% en una transacción de forma automática. Para ello, realiza la siguiente
configuración al concepto de liquidación, teniendo en cuenta los atributos de
clasificación tributaria:  
  

A continuación, se muestra una imagen con la configuración de un concepto de
IVA automático usando los atributos del tercero.

![Configuración de concepto de IVA del 19% basada en atributos tributarios del
tercero.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen3.png)  

Observaciones

Es muy importante indicar de forma correcta, la clasificación tributaria y
legal de los terceros al momento de la creación, para que se pueda realizar el
calculo automático de impestos en las distintas operaciones del sistema.

---

# Aplica a

Listado de atributos a los que aplica el concepto de liquidación.  
  
Determine los atributos de la clasificación tributaria que debe cumplir la
empresa y el tercero para que este concepto les aplique en una transacción y
pueda ser calculado dentro de la operación de forma automática.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar el concepto de liquidación
del IVA del 19% para este se calcule si la empresa es régimen común. Para ello
realiza la siguiente configuración:  
  

A continuación, se muestra una imagen con la configuración del concepto de
liquidación aplicada al régimen común.

![Configuración del concepto de IVA del 19% según el régimen tributario de la
empresa.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen2.png)  
  

Observaciones

Después de determinar una relación entre los atributos de la empresa y del
tercero, se debe hacer click sobre el botón **"Adicionar"** para indicar que
el concepto se aplicará cuando se cumpla la condición.

---

# No aplica a

Listado de atributos a los que no aplica el concepto de liquidación.  
  
Después de determinar la relación entre los atributos de la empresa y del
tercero, para establecer las condiciones del concepto de liquidación, se debe
hacer click sobre el botón **"Adicionar"** para indicar que el concepto **NO**
se aplicará cuando se cumpla la condición.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar el concepto de liquidación
del IVA del 19% para este no se calcule si el tercero es persona extranjera.
Para ello realiza la siguiente configuración:  
  

A continuación, se muestra una imagen con la configuración para que el
concepto de liquidación no se aplique a personas extranjeras.

![Configuración del concepto de IVA del 19% para excluir a terceros
extranjeros.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen5.png)  

Observaciones

Los conceptos de liquidación están basados en reglas que pueden ser
modificadas o ampliadas de acuerdo a los requerimientos y necesidades de la
empresa.

---

# Activar

Activa todos los atributos de la empresa.  

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar el concepto de retención
por ventas para que se calcule de forma automática, para todos los terceros.
Para ello, realiza la siguiente configuración activando todos los atributos de
la empresa:  
  

A continuación, se muestra una imagen con la configuración del concepto de
retención aplicable a todos los atributos de la empresa.

![Configuración para activar todos los atributos de la empresa en un concepto
de
retención.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen6.png)  

Observaciones

Si requiere desactivar todos los atributos de la empresa, utilice la opción
**"Desactivar"**  
  
Al activar todos los atributos de la empresa para la condición, el sistema los
representará con un \(\*\).

---

# Desactivar

Desactiva todos los atributos de la empresa.  

Ejemplo

A continuación, se muestra una imagen con la opción de desactivar todos los
atributos de la empresa en la configuración del concepto.

![Configuración para desactivar todos los atributos de la empresa en un
concepto.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen9.png)  

Observaciones

Si requiere activar todos los atributos de la empresa, utilice la opción
**"Activar"**  
  
Al activar todos los atributos de la empresa para la condición, el sistema los
representará con un \(\*\).

---

# Activar

Activa todos los atributos del tercero.  

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar el concepto de liquidación
del IVA del 19% para que se calcule de forma automática, para todos los
terceros. Para ello, realiza la siguiente configuración activando todos los
atributos del tercero:  
  

A continuación, se muestra una imagen con la activación de todos los atributos
del tercero para aplicar el un concepto de liquidación automáticamente.

![Configuración para activar todos los atributos del tercero en un concepto de
liquidación.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen7.png)

Observaciones

Si requiere desactivar todos los atributos del tercero, utilice la opción
**"Desactivar"**  
  
Al activar todos los atributos del tercero para la condición, el sistema los
representará con un \(\*\).

---

# Desactivar

Desactiva todos los atributos del tercero.  

Ejemplo

A continuación, se muestra una imagen con la opción de desactivar todos los
atributos del tercero en la configuración del concepto de liquidación.

![Configuración para desactivar todos los atributos del tercero en un concepto
de
liquidación.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12210%5D%20FrmConceptoDescuento/imagen8.png)  

Observaciones

Si requiere activar todos los atributos del tercero, utilice la opción
**"Activar"**

---

# Adicionar

Agrega una nueva condición a la que aplica el concepto.  
  
Para adicionar una nueva condición, primero debe seleccionar los atributos
relacionados tanto de la empresa como del tercero.

Ejemplo

La empresa CMB Muebles y Hogar necesita agregar una condición para el cálculo
del concepto de IVA generado. En este caso, debe primero seleccionar los
atributos tributarios de la empresa y del tercero y luego dar clic a esta
opción.

---

# Eliminar

Elimina una condición a la que aplica el concepto.

Ejemplo

La empresa CMB Muebles y Hogar necesita eliminar una condición para el cálculo
del concepto de IVA generado. En este caso, debe seleccionar dicha condición y
luego dar clic a esta opción.

---

# Adicionar

Agrega una nueva condición a la que no aplica el concepto.  
  
Para adicionar una nueva condición, primero debe seleccionar los atributos
relacionados tanto de la empresa como del tercero.

Ejemplo

La empresa CMB Muebles y Hogar necesita agregar una condición para que el
concepto de IVA generado no se calcule. En este caso, debe primero seleccionar
los atributos tributarios de la empresa y del tercero y luego dar clic a esta
opción.

---

# Eliminar

Elimina una condición a la que no aplica el concepto.

Ejemplo

La empresa CMB Muebles y Hogar necesita eliminar una condición de las que no
aplican al concepto de IVA generado. En este caso, debe seleccionar dicha
condición y luego dar clic a esta opción.

---

# Acerca de ventana

## CATÁLOGO DE CONCEPTO DE LIQUIDACIÓN

##  Objetivo

Esta ventana tiene como finalidad la creación o modificación de la información
de un concepto de liquidación. Los datos a registrar se encuentran agrupados
por pestañas y por secciones, las cuales se activan o desactivan según los
requerimientos de la empresa.  
  

## Ejemplo de información a registrar

Los datos principales de un concepto de liquidación son: código, nombre, fecha
desde la cual estará vigente, porcentaje o valor y valor base mínimo.  
  

Ejemplo:

Código | Nombre | Año de inicio | Mes de inicio | % | Valor base mínimo  
---|---|---|---|---|---  
IVAV16VL | IVA liquidado | 2017 | 2 | 19% | -  
INCBP01 | INC bolsas plásticas | 2018 | 1 | 30% | -  
RANPEPS | Aportes a salud trabajador | 2014 | - | 6% | -  
RETSERG1 | Retención por servicios en general | 2018 | - | 4% | 133.000  
  
## Definición de conceptos

**¿Qué son los conceptos de liquidación?**  
  
Los conceptos de liquidación son un conjunto de reglas que se basan en unas
condiciones para calcular los impuestos que se generan en las entradas y
salidas de dinero que genera la empresa. Además de calcular impuestos,
permiten otros cálculos automáticos como por ejemplo descuentos condicionados
en las ventas.  
  
A continuación se describen las pestañas \(pasos\) y diferentes opciones para
configurar en los conceptos de liquidación.  

## Secciones

## Sección general

La vigencia permite definir desde qué fecha empezará a calcularse el concepto.
Esta vigencia permite definir año y mes. Al definirse la vigencia, si un
concepto tiene el mismo código que otro, el sistema calculará el concepto que
se encuentre vigente según la fecha de la transacción.

## Sección forma de cálculo

Al activar esta opción, el sistema permitirá definir el porcentaje o valor a
calcular por parte del concepto y permitirá definir un valor base mínimo a
partir del cual el impuesto será calculado. Si esta opción está apagada, el
usuario tendrá que cargar de forma manual en la operación el valor del
impuesto.

## Sección tipo de asiento a generar

En esta pestaña se debe definir el tipo de movimiento que generará el impuesto
al calcularse. Ya sea cuenta por cobrar, cuenta por pagar, llevar al ingreso o
llevar al gasto. Dependiendo del tipo de movimiento generado, el sistema
habilitará otras opciones para indicar la cuenta a la que se llevará el
impuesto o cargo, el tercero a afectar, centro de costos, entre otros.

## Sección condiciones \(avanzado\)

Entre las condiciones y reglas a configurar en cada concepto, se encuentran
las relacionadas con la clasificación legal y tributaria tanto de la empresa
como del tercero. De allí se desprende un tema legal del cual dependerá que el
impuesto sea calculado. La clasificación legal y tributaria de la empresa y
del tercero deberá estar previamente cargada.

## Sección blindar

El usuario podrá proteger las configuraciones y condiciones cargadas al
concepto, para que al aplicarse una actualización al sistema, esta no realice
cambios a dichas configuraciones. También se podrá marcar el concepto como
obsoleto cuando este ya no aplique.

---

# Concepto padre

Código del concepto de liquidación padre.  
  
Este código pertenece al concepto de liquidación padre del cual se creará un
concepto de liquidación hijo y su código se heradará al nuevo concepto.  
  
Este código es de solo lectura y no puede ser editado desde esta ventana.

Ejemplo

Código del concepto padre | Nombre del concepto padre | Código del concepto hijo | Nombre del concepto hijo  
---|---|---|---  
IVAV | IVA | IVAV19V | IVA base reteiva - compras  
RAN | RETENCIONES Y APORTES DE NÓMINA | RANEPS | Aportes a Entidades promotoras de salud - EPS  
RETCOMPG | Retención por compras en general | RETCOMPGL1 | Retención por compras en general - declarantes

---

# Nuevo concepto

Código del concepto de liquidación a crear.  
  
El código es la identificación del concepto de liquidación en el catálogo de
conceptos de liquidación y en las diferentes operaciones del sistema.  
  
Cuando se crea un nuevo concepto, este por defecto hereda en su código el
código del concepto padre y a este código se le deben agregar 1 o más
caracteres o números adicionales.  
  

A continuación, se muestra una imagen con el ejemplo de creación de un nuevo
concepto, heredando y ampliando el código del concepto padre.

![Interfaz para definir el código de un nuevo concepto de liquidación basado
en un concepto
padre.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Conceptos%20de%20liquidacion/%5B12220%5D%20FrmInputNewConceptoDescuento/imagen1.png)  
  
El código del concepto de liquidación puede ser numérico o alfanumérico y
admite hasta 10 caracteres.

Ejemplo

Código del concepto padre | Nombre del concepto padre | Código adicional para el concepto | Código asignado al concepto | Nombre del concepto  
---|---|---|---|---  
IVAV | IVA | 19V | IVAV19V | IVA base reteiva - compras  
RAN | RETENCIONES Y APORTES DE NÓMINA | EPS | RANEPS | Aportes a Entidades promotoras de salud - EPS  
RETCOMPG | Retención por compras en general | L1 | RETCOMPGL1 | Retención por compras en general - declarantes  
  
Observaciones

Al código del concepto de liquidación se le pueden agregar uno o varios
caracteres, siempre y cuando no exceda de 10 caracteres en total.

---

# Explorar la ubicación

Seleccione esta opción para abrir la ubicación y explorar la ruta en el
equipo. Desde este botón no es posible seleccionar la ruta por defecto, donde
se deben seguir almacenando los extractos enviados por la entidad bancaria.

Ejemplo

Se crea una carpeta en el disco D, para almacenar los diferentes extractos
enviados por la entidad bancaria mensualmente; se desea validar desde la
ventana de configuración del extracto bancrio, si efectivamente la carpeta que
se necesita seleccionar, está creada en dicha ruta. Para ello se puede
explorar la ruta con este botón y luego desde el botón **"Seleccionar
ubicación" predefinir la ruta**

Observaciones

Este botón es solo de consulta, no es posible predefinir la ruta

---

# Tipo de archivo

Seleccione el tipo de archivo que contiene la información del extracto, tenga
muy presente el caracter separador de campos.

Ejemplo

Se descarga de la plataforma de BANCOLOMBIA el extracto bancario en formato
XLS, por tanto en este campo debe seleccionar la opción: **"Microsoft excel 97
y posteriores \(xls\)"**  
  
Se descarga de la plataforma de DAVIVIENDA el extracto bancario en formato CSV
delimitado por comas; por tanto en este campo debe seleccionar la opción:
**"Archivo plano delimitado por comas \(csv\)"**  

Observaciones

El sistema cuenta con los siguientes tipos de archivos:  
  
**Tipo de archivo**  
---  
Microsoft excel 97 y posteriores \(xls\) | Archivo plano delimitado por comas \(csv\)  
Archivo plano delimitado por tabulaciones  
Archivo plano delimitado por punto y coma  
Archivo plano delimitado por pipes  
Archivo plano delimitado por guiones

---

# Número de la fila de títulos

Indique la cantidad de filas de títulos que contienen datos solo informativos
y que no son necesarios para realizar la conciliación bancaria automática.
Algunos bancos tienen un amplio encabezado, con títulos que no son relevantes
a la hora de conciliar de forma automática, pues estos datos no se tienen en
cuenta para la sincronización  
Si en el archivo de extracto bancario no hay filas de títulos, indique cero y
el sistema tomará la información desde la primera fila.  

Ejemplo

El extracto bancario descargado de la plataforma de BANCOLOMBIA, tiene en una
primera fila el nombre del banco, en la segunda tiene número de la cuenta; en
una tercera fila tiene el saldo anterior y en la cuarta el nombre de las
columnas de la información que se requiere para realizar la conicliación
bancaria. Todas estas filas que se encuentran en el encabezado del extracto
son solo informativas y no son necesaria para conciliar el banco de forma
automática. Los datos relevantes son los que muestran los movimientos del mes,
que se registran en la fila siguiente. Por tanto, en este campo se debe
indicar el número 4.

Observaciones

Si el extracto bancario digital que le envió el banco no tiene fila de
títulos, debe indicar en este campo el número cero

---

# Número de 1a. fila de datos

Indique la fila en la que inician los datos del movimiento del extracto
bancario en el archivo.

Ejemplo

El extracto bancario descargado de la plataforma de BANCOLOMBIA, tiene en una
primera fila el nombre del banco, en la segunda tiene número de la cuenta; en
una tercera fila tiene el saldo anterior y en la cuarta el nombre de las
columnas. Por tanto, en este campo se debe indicar el número 5, fila donde
empiezan los movimientos del extracto bancario.

Observaciones

Si no hay fila de títulos, la fila de datos será 1.  
Si hay fila de títulos, generalmente la fila de datos será uno más.

---

# Cambiar signo

Active esta casilla para que el sistema importe los movimientos con el signo
adecuado. Generalmente los extractos bancarios tienen el signo correcto
\(consignaciones positivos y retiros negativo\) en caso de que el extracto
bancario tenga los signos invertidos debe tener activa esta opción.  

Ejemplo

El extracto bancario descargado de la plataforma de BANCOLOMBIA, tiene los
movimientos inventidos \(Consignaciones negativas y retiros positivos\). En
este caso se debe activar esta casilla para que los movimientos sean
conicliados correctamente.

Observaciones

Si los movimientos registrados en el extracto bancario tienen los signos
correctos, esta opción debe quedar desactivada.

---

# Análisis de signo para el valor del movimiento

Active esta casilla, si los valores créditos y débitos del movimiento bancario
están en la misma columna y no tienen signo, pero el signo del movimiento está
dado por el valor de otra columna. Si activa esta casilla, deberá especificar
el valor que se interpretará como un movimiento débito \(negativo\) y en el
siguiente paso deberá anexar en el campo del sistema "Valor para Signo".

Ejemplo

El extracto bancario descargado de la plataforma de BANCOLOMBIA, tiene una
columna adicional para determinar el signo del valor; por tanto, se debe
activar esta opción e indicar que el valor para el signo negativo es "D"  
  
\(C para Créditos y D para Débitos\)

Observaciones

Esta casilla solo se activa si el extracto bancario tiene una columna
adicional para definir el signo, de lo contrario, se deja desactivada.

---

# Valor para mov. negativo

Los movimientos que tengan el valor especificado en este campo \( no importa
si está en mayúscula o minúscula\), se considerarán como movimientos negativos
\(restan al saldo bancario\).  
Los demás movimientos se considerarán como movimientos positivos \(suman al
saldo bancario\).

Ejemplo

Valor para movimiento negativo: "C"

Observaciones

Siempre el valor indicado en este campo se considera negativo, resta al saldo
bancario.

---

# Nombre del campo en extracto

Nombre de la columna tal y como viene en el extracto bancario.  
Todos los formatos de extracto bancario traen el nombre de cada columna. Estos
nombres deben ser colocados exactamente de la misma manera.

Ejemplo

El extracto bancario descargado de la plataforma de BANCOLOMBIA, tiene las siguientes columnas:  **Fecha** | **Cuenta** | **Tipo de movimiento** | **Número** | **Valor** | **Detalle**  
---|---|---|---|---|---  
  
Por tanto, estos son los nombres que se deben indicar en este campo.

Observaciones

Los nombres de las columnas se deben diligenciar de forma vertical.

---

# Nombre del campo en sistema

Asignar a cada uno de los datos del extracto, el campo del sistema al que
corresponde. Al abrir el seleccionador, el sistema muestra una lista de campos
por defecto, que se pueden relacionar con los contenidos en el extracto
bancario.

Ejemplo

Para la columna **FECHA** , se tienen varias alternativas; fecha del
movimiento día mes año, mes día año, año mes día, día solamente. Son 4
posibles formatos de fecha que se pueden relacionar. Simplemente se debe
verificar cuál es el formato de fecha que trae el extracto bancario. En este
ejemplo se va a seleccionar: **día mes año**.

Observaciones

Es necesario seleccionar una opción del listado que se encuentra por defecto
en el sistema.

---

# Filtro

Filtro opcional, para limitar los registros a cargar. Se utiliza en el caso de
necesitar filtrar los movimientos a cargar

Ejemplo

Si el extracto contiene información de varias cuentas, se puede determinar que
cuentas debe cargar; por ejemplo la cuenta **11100515 del Banco de Oro**

Observaciones

El campo de filtro es opcional, por tanto, en caso de no requerirlo, se puede
dejar en blanco.

---

# Cuenta

Indique o seleccione el código de la cuenta que desea conciliar, la cual debe
estar previamente creada en el plan de cuentas.

Ejemplo

Se va a conciliar la cuenta del Banco Nacional \(11100505\)  **Código cuenta** | **Nombre cuenta**  
---|---  
11100505 | Banco Nacional  
  
Observaciones

Las cuentas de banco que se van a crear como cuentas de conciliación, deben
estar creadas en el catálogo de cuentas.  
Las cuentas de conciliación deben quedar con el mismo código que tienen las
cuentas creadas en el plan de cuentas

---

# Descripción

Indique el nombre de la cuenta que va a conciliar. El sistema asigna un nombre
de forma automática que incluye el código y nombre que tiene la cuenta en el
PUC, sin embargo este campo puede ser modificado de forma manual.

Ejemplo

Se está creando la cuenta de conciliación 11100505 - Banco Nacional. Por defecto en el campo descripción, el sistema asigna por defecto: **"Conciliación cuenta 11100505 - Banco Nacional"** **Código cuenta** | **Descripción**  
---|---  
11100505 | Conciliación cuenta 11100505 - Banco Nacional  
  
Observaciones

El sistema siempre asigna una descripción automática; pero el usuario puede
modificarla si lo requiere.

---

# Tercero

Indique o seleccione el código del tercero que corresponde al banco que desea
conciliar. este debe estar creado previamente en el catálogo de terceros.

Ejemplo

Se va a conciliar la cuenta del Banco Nacional \(11100505\)  **Código cuenta** | **Nombre cuenta** | **Código tercero** | **Tercero**  
---|---|---|---  
11100505 | Banco Nacional | 800210540 | Banco Nacional  
  
Observaciones

Los terceros que se van a asociar a las cuentas de conciliación, deben estar
creados en el catálogo de terceros  
Cada banco que se va a conciliar, debe estar creado como tercero, desde el
catálogo correspondiente  
Los terceros asociados a las cuentas de conciliación deben quedar con el mismo
código que tienen en el catálogo de terceros.

---

# Definir formato de importación del archivo de extracto bancario para esta
cuenta

Active esta casilla para configurar el formato del archivo de extracto
bancario suministrado por el banco correspondiente en caso de tener el módulo
de conciliación bancaria automatica. Al activar esta opción, el sistema
solicita los datos para poder configurar el extracto bancario, el cual será
cargado en la operación de conciliación bancaria.  
  
En caso de no tener el módulo de conicliación bancaria auntomática, ni el
extracto bancario de forma digital para extraer los datos de las columnas,
deje esta opción desactivada.

Ejemplo

Se cuenta con el extracto bancario digital de BANCOLOMBIA y se desea realizar
conciliación bancaria automática, para ello se deben extraer los datos que
registran en el extracto bancario, para luego cargarlo en la operación y
sincronizarlo de forma automática con los movimientos contables del sistema.  
  
El siguiente es una muestra de extracto bancario y datos necesarios para
configurar el archivo del extracto bancario:  

A continuación, se muestra una imagen del extracto bancario necesario para
configurar la conciliación automática.

![Ejemplo de extracto bancario digital con los datos requeridos para la
conciliación
automática.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Cuentas%20de%20conciliacion/%5B11730%5D%20FrmCntConciliacion/Ejemplo-
extracto.png)  

Observaciones

Para poder activar esta opción, es necesario tener instalado en el sistema el
módulo de conciliación bancaria automática  
Para realizar conicliación bancaria automática, es necesario tener el extracto
bancario de forma digital y no impreso.

---

# Color de letra

Asigne un color a la letra para cada uno de los niveles de las cuentas en al
plan de cuentas

Ejemplo

  

Se define en la empresa que en el plan de cuentas, la letra de las cuentas de
cada nivel tendrá los siguientes colores:  
Nivel Código | Nombre | Color de letra  
---|---|---  
1 | Clase de cuenta | **Negro**  
2 | Grupo de cuenta | **Azúl oscuro**  
3 | Cuenta | **Naranja**  
  
Observaciones

El color de la letra para las cuentas de cada nivel en el plan de cuentas es
de libre definición del usuario.  
  
Asignar diferentes colores a las cuentas en su estructura, permite al usuario
diferenciar en el plan de cuentas los diferentes niveles de forma visual.

---

# Nivel

Posición de la cuenta en el plan de cuentas dependiendo de la cantidad de
códigos que tenga y función a cumplir.

Ejemplo

El plan de cuentas de \[ContaPyme\] presenta con los siguientes niveles de
cuentas:  
Nivel | Nombre  
---|---  
1 | Clase de cuenta  
2 | Grupo de cuenta  
3 | Cuenta  
4 | Sub-Cuenta  
5 | Auxiliar general  
6 | Auxiliar general 1  
  
Observaciones

La estructura del plan de cuentas en \[ContaPyme\] ya se encuentra pre-
configurada, si el usuario requiere crear otros niveles lo puede hacer.

---

# Nombre

Nombre con el cual se identificará el nivel de la cuenta.

Ejemplo

El plan de cuentas de \[ContaPyme\] presenta los siguientes niveles de cuentas y sus nombres son:  Nivel | Nombre  
---|---  
1 | Clase de cuenta  
2 | Grupo de cuenta  
3 | Cuenta  
4 | Sub-Cuenta  
5 | Auxiliar general  
6 | Auxiliar general 1  
  
Observaciones

La estructura del plan de cuentas en \[ContaPyme\] ya se encuentra pre-
configurada, si el usuario requiere crear otros niveles lo puede hacer.

---

# Longitud

Cantidad de dígitos o letras que tendrán las cuentas del plan de cuentas que
pertenezcan a este nivel.  
El tamaño en caracteres de un nivel, debe ser mayor al tamaño del nivel
anterior y menor al tamaño del nivel posterior.

Ejemplo

Texto del ejemplo

El plan de cuentas de \[ContaPyme\] presenta los siguientes niveles de cuentas, con sus nombres y losngitudes:  Nivel | Nombre | Longitud  
---|---|---  
1 | Clase de cuenta | 1  
2 | Grupo de cuenta | 2  
3 | Cuenta | 4  
4 | Sub-Cuenta | 6  
5 | Auxiliar general | 8  
6 | Auxiliar general 1 | 10  
  
Observaciones

La estructura del plan de cuentas en \[ContaPyme\] ya se encuentra pre-
configurada, si el usuario requiere crear otros niveles lo puede hacer.  
  
La longitud de las cuentas auxiliares que pertenecen a cada nivel de cuentas
es de libre definición del usuario.

---

# Texto en negrilla

Active esta opción si se desea visualizar en el plan de cuentas, el código de
la cuenta de este nivel en negrilla para que resalte.

Ejemplo

Si este campo se encuentra activo el código y el nombre de la cuenta de este nivel se verá así:  Cuenta Código | Nombre  
---|---  
**1** | **Activo**  
  
Si este campo no se encuentra activo activo el código y el nombre de la cuenta de este nivel se verá así:  Cuenta Código | Nombre  
---|---  
1 | Activo  
  
Observaciones

El usuario puede definir la forma en la cual se visualizarán las cuentas en el
plan de cuentas.

---

# Tamaño letra

Medida que tendrá la letra de la cuenta que pertenece a este nivel en el
catálogo de plan de cuentas.

Ejemplo

Se define en la empresa que las cuentas de los diferentes niveles tendrán los siguientes tamaños:  Nivel Código | Nombre | Tamaño letra  
---|---|---  
1 | Clase de cuenta | 14  
2 | Grupo de cuenta | 12  
3 | Cuenta | 10  
  
Observaciones

El tamaño de la letra para las cuentas de cada nivel, en el catálogo de plan
de cuentas es de libre definición del usuario.  
  
Asignar diferentes tamaños a las cuentas en su estructura, permite al usuario
diferenciar en el plan de cuentas los diferentes niveles de forma visual.

---

# Alto de la fila

Medida en altura que tendrá la fila de la cuenta que pertenece a este nivel en
el catálogo de plan de cuentas.

Ejemplo

Se define en la empresa que en el plan de cuentas, las filas de las cuentas tendrán la siguiente altura dependiendo del nivel al cual pertenece:  Nivel Código | Nombre | Alto de fila  
---|---|---  
1 | Clase de cuenta | 43  
2 | Grupo de cuenta | 38  
3 | Cuenta | 33  
  
Observaciones

La altura de las filas para las cuentas de cada nivel, en el catálogo de plan
de cuentas es de libre definición del usuario.  
  
Asignar diferentes alturas a las cuentas en su estructura, permite al usuario
diferenciar en el plan de cuentas los diferentes niveles de forma visual.

---

# Nombre

Nombre del concepto de flujo de efectivo.

Ejemplo

La empresa MP computadores desea controlar los egresos de dinero en efectivo
por concepto de pago a proveedores, en el nombre del concepto podría indicar:
Pago a proveedores locales.

Observaciones

El nombre del concepto debe ser claro, preciso y de fácil entendimiento, para
que así, al momento de usarlo en el registro de las operaciones, el usuario
sepa fácilmente a qué hace referencia.

---

# Tipo de concepto de flujos de efectivo

Seleccione el tipo de concepto de flujos de efectivo, de acuerdo con las
siguientes opciones:

  * **Fuente del efectivo \(Ingreso dinero\):** Las fuentes de efectivo se representan por los ingresos en efectivo que llegan a la empresa, producto de: ventas, cuentas por cobrar o cualquier otro tipo de ingreso que tenga la organización.
  

  * **Uso del efectivo \(Egreso dinero\):** Los usos de efectivo, al contrario de las fuentes, se refieren a todas las salidas de efectivo de la empresa. En esta categoría de usos se encuentran: los pagos a acreedores, los préstamos a empleados o a otro tipo de terceros, pago de dividendos y cualquier otro tipo de salida de dinero de la organización.

Ejemplo

La empresa MP Computadores desea controlar el efectivo que se recibe de los
clientes por concepto de venta de productos o servicios, para ello, debe
seleccionar el tipo de concepto "Fuente del efectivo".  
  
La empresa MP Computadores desea controlar los préstamos de dinero en efectivo
que realiza a sus empleados, para ello, debe seleccionar el tipo de concepto
"Uso del efectivo".

Observaciones

En el catálogo de conceptos de flujos de efectivo, los conceptos de tipo
"Fuente del efectivo" aparecerán de color verde y los conceptos de tipo "Uso
del efectivo" de color rojo.

---

# Empresa

Código de la empresa sobre la cual se está trabajando y a la que quedará
asociado el concepto de flujo de efectivo.

Ejemplo

El usuario Juan Pérez tiene configurado como su entorno de trabajo la empresa
MP Computadores, en este campo se mostrará el código "1" que corresponde a
dicha empresa.

Observaciones

Este campo es de solo lectura y no podrá ser modificado por el usuario.  
  
Si el usuario requiere cambiar la empresa a la que quedará asociado el
concepto de flujo de efectivo, deberá asignar la respectiva empresa como
empresa de trabajo, así: **Barra inferior del programa > Esquina inferior
izquierda > Empresa de trabajo**

---

# Concepto padre

Código que identifica al concepto que está en el nivel inmediatamente anterior
al concepto que se está creando, éste es conocido como concepto padre.

Ejemplo

A continuación, se muestra una imagen con el código del concepto padre cargado
automáticamente por el sistema.

![Visualización del código del concepto padre al crear un nuevo
concepto.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Flujos%20de%20efectivo/%5B11050%5D%20FrmInputNewFlujoEfectivo/ConceptoPadre.png)

Observaciones

Este dato es de solo lectura y el sistema lo carga automáticamente dependiendo
del registro en el que se esté ubicado al momento de dar clic en el botón
"Crear".

---

# Concepto efectivo

Código que identifica al concepto de flujos de efectivo. El esquema de
codificación incluye el código del concepto padre, seguido del consecutivo
único del concepto.

Ejemplo

A continuación, se muestra una imagen con un ejemplo del código del concepto
efectivo, que incluye el código del concepto padre y su consecutivo.

![Visualización del código de un concepto de flujo de efectivo con estructura
jerárquica.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Flujos%20de%20efectivo/%5B11050%5D%20FrmInputNewFlujoEfectivo/Concepto.png)

Observaciones

Se recomienda conservar la secuencia del consecutivo para que el listado se
presente de forma ordenada.  
  
La codificación de los conceptos se maneja de forma jerárquica, es decir,
existe unos conceptos generales \(padres\) y otros de detalle \(hijos\).

---

# Código

Código del formato.

Ejemplo

Código | Edición | Nombre  
---|---|---  
**1001** | 10 | Pagos o abonos en cuenta a terceros y retenciones practicadas  
**2276** | 10 | Información certificado de ingresos y retenciones para personas naturales empleados  
**1005** <| 10 | Impuesto a las ventas - Descontable  
**1008** | 10 | Saldo de cuentas por cobrar  
  
En el campo código, debe indicar 1001.

Observaciones

Este código es el establecido para cada formato por la DIRECCIÓN DE IMPUESTOS
Y ADUANAS NACIONALES - DIAN.

---

# Tipo saldo

Indique el tipo de saldo que se debe calcular a la cuenta indicada.

Ejemplo

Para el formato 1001, concepto 5001 - Honorarios, se requiere que el saldo de
la cuenta, se calcule con "Saldo a 31 dic"  

Observaciones

Puede seleccionar alguno de los siguientes tipo de saldo: S= Saldo a 31 dic.
A= Saldo a 31 dic. año anterior D= Débito del periodo. C= Crédito del periodo.
P= Crédito - débito del periodo. T= Débito - crédito del periodo.

---

# Blindar este formato.

Active ésta opción para que al actualizar la aplicación a un nuevo release el
sistema respete los cambios que usted ha realizado en este registro, ya que
los registros que no tengan activada está opción serán actualizados a la
legislación vigente y los demás podrían ser eliminados.

---

# Activar la definición de columnas y configuración del archivo XML

Activa dos pasos adicionales, uno, para definir las columnas \(campos\) que
conformarán el formato y otro, para definir la configuración del archivo XML a
generar.

---

# Filtro

El filtro por cada concepto permite filtrar los movimientos que deben entrar o
no en el cálculo del total de cada concepto.

Ejemplo

Para el caso de las compras de los activos movibles, si se manejan inventarios
permanente, no se deben reportar todos los débitos de la cuenta, ya que se
incluirían las devoluciones.  
En estos casos el filtro se usa para indicarle al sistema que sólo tenga las
en cuenta los movimientos cuyo tipo de soporte es factura de compra \(código
1\); el filtro quedaría de la siguiente forma: \(ITDSop=1\).

Observaciones

Utilice la lupa para construir el filtro.

---

# Archivo XSD

Este corresponde al archivo Schema del formato PRUEBA, el cual permite validar
la información grabada en el archivo de salida XML.  
  
En caso que requiera reemplazar este archivo por una actualización, deberá
copiarlo en la carpeta: C:\ProgramData\InSoft\Datos
V4\AgroWin\CLIENTE\System\ES\XSD\

---

# Etiqueta para detalle

Esta etiqueta, se utiliza para especificar el nombre de cada elemento en el
archivo de salida XML.  
  
Por ejemplo: El valor para la etiqueta está definida en el archivo XSD, en la
definición **"element name"**.

---

# Controlador \(Driver\)

Este controlador, corresponde al archivo que generará la información del
formato \[PRUEBA\], aplicando las reglas de mayores valores, régimen de
transferencia y demás que apliquen al formato.  
Generalemnte el nombre del controlador tiene el código del formato y la
edición.  
  
Por ejemplo: **IsFrmPRUEBA\_05.dll**

---

# Parámetros adicionales

Permite especificar parámetros adicionales al proceso de cálculo de datos del
formato.  
  
Por ejemplo: \[NOCUANTIASMENORES\] para que no se incluyan registros
informando las cuantías menores al tope especificado.

---

# Cuentas que no aplican

Cuentas que no aplican para el concepto, de el total que se está configurando.  
Si desea revisar la configuración que corresponde al "Total", en el último
paso de éste asistente, presione el botón "Activar la definición de columnas".  

Ejemplo

Si en la lista de cuentas que incluye se relaciona una cuenta, como por
ejemplo la "28", pero una sub-cuenta de ésta no aplica o va a otro concepto,
como la "2820", entonces debe relacionar en la lista de cuentas que **no
aplican** la cuenta "2820".

---

# Cuentas que incluye el concepto

En esta lista se deben relacionar todas las cuentas que se reportan por cada
concepto y definiendo el tipo de saldo a calcular en cada cuenta.  
  
Si todas las hijas de una cuenta van al mismo formato-concepto, puede indicar
en cuenta el código de la cuenta mayor, para no tener que detallar cada
subcuenta.  
  
Si en la columna cuenta aparece un asterisco "\*", este deberá ser reemplazado
por la cuenta o cuentas correspondientes y en caso de que el concepto no
aplique a su empresa, deberá eliminar el concepto o eliminar el "\*".  

Ejemplo

Formato 1001, concepto 5001 - Salarios, prestaciones sociales y demás pagos
laborales  
  
Cálculo: Pagos o abonos en cuenta.  
  
Cuentas que incluye:  
Este concepto incluye normalmente las cuentas 5105, 5205 y 72.

---

# Definición de conceptos

Debe indicar el código, nombre y tipo de tope que aplican al formato.  
En caso de que el formato no tenga conceptos, coloque en código 0, para poder
especificar las cuentas que aplican.  

Ejemplo

Código | Nombre concepto | Tope  
---|---|---  
5001 | Salarios, prestaciones sociales y demás pagos laborales | No aplica ningún tope \(0\)  
5002 | Honorarios | Tope para pagos o abonos en cuenta 2015 \(11\)  
  
Configuración

Si desea modificar la configuración del tope, sobre el catálogo de formatos:
**\[Clic derecho > configuración avanzada > Tipos de tope para conceptos de
formatos\].**

---

# Edición \(AG - año gravable\) :

Código interno que utliza \[ContaPyme\] para la numeración del formato.  
Para el caso de los formatos de información exógena a presentar a la DIAN, se
asignará como edición el año gravable - AG.

Ejemplo

Código | Edición | Nombre  
---|---|---  
1001 | **2020** | Pagos o abonos en cuenta a terceros y retenciones practicadas  
**2276** | **2020** | Información certificado de ingresos y retenciones para personas naturales empleados  
**1005** | **2020** | Impuesto a las ventas - Descontable  
**1008** | **2020** | Saldo de cuentas por cobrar  
  
Observaciones

Este código está establecido por \[ContaPyme\], y no tiene que ver con la
versión del formato.

---

# Grupo

Permite separar los formatos de medios megnéticos en grupos.  

Ejemplo

Formatos DIAN, Formatos Bogotá, Otros formatos, etc.  

Observaciones

A los formatos que no se les especifique grupo, se mostrarán en "Otros
formatos".  
  
En la cinta de opciones: \[Contabilidad > Medio magnéticos\], mostrará un ítem
de menú por cada grupo.

---

# Nombre

Nombre del formato.  
  
Es muy recomendable que asigne un nombre descriptivo y preciso que oriente
acerca del formato.

Ejemplo

Código | Edición | Nombre  
---|---|---  
1001 | **2020** | Pagos o abonos en cuenta a terceros y retenciones practicadas  
**2276** | **2020** | Información certificado de ingresos y retenciones para personas naturales empleados  
**1005** | **2020** | Impuesto a las ventas - Descontable  
**1008** | **2020** | Saldo de cuentas por cobrar

---

# Nombre

Fuente de datos a usar para obtener totales 14, 15 y 29  
  
Módulo de nómina \(totales se obtienen de conceptos pagados por nómina\)  
Módulo de contabilidad \(totales se obtienen de movimientos contables, debe
defir cuentas\)

---

# Código - cpt

Código para el concepto.  
El código que se indica en este campo, varía según el formato que esté
configurando.

Ejemplo

Código | Nombre | Tope  
---|---|---  
**5001** | Salarios, prestaciones sociales y demás pagos laborales | No aplica ningún tope  
**5002** | Honorarios | Tope para pagos o abonos en cuenta 2017  
**5003** | Comisiones | Tope para pagos o abonos en cuenta 2017  
**5049** | Autorretenciones por ventas | No aplica ningún tope  
  
Observaciones

Este código está establecido para cada formato por la DIRECCIÓN DE IMPUESTOS Y
ADUANAS NACIONALES - DIAN.

---

# Nombre concepto - ncpt

Nombre para el concepto.  
El nombre que se indica en este campo, se asigna según el formato que esté
configurando.

Ejemplo

Código | Nombre | Tope  
---|---|---  
5001 | **Salarios, prestaciones sociales y demás pagos laborales** | No aplica ningún tope  
5002 | **Honorarios** | Tope para pagos o abonos en cuenta 2017  
5003 | **Comisiones** | Tope para pagos o abonos en cuenta 2017  
5049 | **Autorretenciones por ventas** | No aplica ningún tope  
  
Observaciones

Este nombre está establecido para cada formato por la DIRECCIÓN DE IMPUESTOS Y
ADUANAS NACIONALES - DIAN.

---

# Tope

Tipo de tope que se va a aplicar al concepto del formato.

Ejemplo

  

Código | Nombre | Tope  
---|---|---  
5001 | Salarios, prestaciones sociales y demás pagos laborales | **No aplica ningún tope**  
5002 | Honorarios | **Tope para pagos o abonos en cuenta 2017**  
5003 | Comisiones | **Tope para pagos o abonos en cuenta 2017**  
5049 | Autorretenciones por ventas | **No aplica ningún tope**  
  
Observaciones

Los topes ya están establecidos para cada formato, por cada concepto, por la
DIRECCIÓN DE IMPUESTOS Y ADUANAS NACIONALES - DIAN.

---

# Observaciones del concepto

Observaciones del concepto del renglón seleccionado.

Ejemplo

Formato 1001, concepto 5002 - Honorarios:  
Observaciones del concepto\[5002\], renglón 2  
  
**"Los honorarios que se informan en este concepto son los pagos o abonos
hechos por este concepto durante el año."**

---

# Nombre para centavos

Nombre para los centavos o fracciones de la moneda.

Ejemplo

Moneda | Centavos  
---|---  
Libra Esterlina | Peniques  
  
Observaciones

Texto de de observaciones

---

# Código

Código o identificación de la moneda, con el cual será reconocida al momento
de ser usada en algún catálogo u operación del sistema.

Ejemplo

\[ContaPyme\] cuenta con un catálogo monedas, preconfigurado:

Código | Nombre  
---|---  
10 | Peso  
20 | Dolar  
30 | Euro  
  
Observaciones

Aunque \[ContaPyme\] ya cuenta con una catálogo monedas pre configurado, el
usuario puede crear tantas monedas como requiera o modificar aquellas que ya
tiene el sistema.

---

# Ingresos

Cuenta de ingreso por ajuste de diferencia en cambio.

Ejemplo

Supongamos ahora un crédito en un banco del exterior \(pasivo\), por un valor
también de 1.000 dólares. Cuando se adquirió el crédito, el dólar estaba en
$2.000 por tanto el monto del pasivo en moneda nacional fue de $2.000.000.
Vamos a suponer que al realizar el cierre contable, el dólar estaba igualmente
a $1.900 por tanto, el pasivo en moneda Colombiana será de 1.900.000. En la
contabilidad, el pasivo, sin haberse pagado un solo dólar se ha disminuido en
$100.000 lo cual constituyen un ingreso para la empresa, ingreso que se debe
contabilizar en la cuenta 421020. Si suponemos el caso contrario, esto es que
al cierre contable el dólar estaba a $2.100, el valor del pasivo en moneda
nacional será de $2.100.000. Aquí vemos que como por arte de magia nuestra
deuda se ha incrementado en $100.000, valor que debemos contabilizar como un
gasto en la cuenta 530525.

Observaciones

cuando el valor del dólar aumenta, se presenta un ingreso en relación a los
activos representados en moneda extranjera, y un gasto en relación con los
pasivos representados en moneda extranjera. En cambio, cuando el dólar
disminuye de precio, estamos frente a un gasto en relación con los activos en
moneda extranjera, y ante un ingreso en relación con los pasivos representados
en moneda extranjera.

Configuración

Texto de configuración **Ruta configuración**

---

# Egresos

Cuenta de egresos por ajuste de diferencia en cambio

Ejemplo

Supongamos una inversión en una empresa en el exterior \(activo\) por un valor
de 1.000 dólares. Supongamos también que al momento de adquirir la inversión
el dólar estaba a $2.000, luego, en su momento el registro contable debió ser
por $2.000.000. Supongamos ahora que al cierre del ejercicio el dólar estaba a
$1.900, luego el valor de la inversión será de $1.900.000, $100.000 por debajo
del valor en libros, por lo que hay que llevar esa diferencia como un gasto a
la cuenta 530525, ya que nuestra inversión traducida a pesos ha perdido valor.
Si al contrario, el valor del dólar estaba en $2.100 el valor de la inversión
será de $2.100.000, $100.000 por encima de su valor en libros, lo cual
constituyen un ingreso por diferencia en cambio, contabilizado en la cuenta
421020, debido a que nuestra inversión convertida en pesos se ha valorado por
efecto de aumento del precio del dólar.

Observaciones

cuando el valor del dólar aumenta, se presenta un ingreso en relación a los
activos representados en moneda extranjera, y un gasto en relación con los
pasivos representados en moneda extranjera. En cambio, cuando el dólar
disminuye de precio, estamos frente a un gasto en relación con los activos en
moneda extranjera, y ante un ingreso en relación con los pasivos representados
en moneda extranjera.

Configuración

Texto de configuración **Ruta configuración**

---

# Nombre

Nombre de la moneda, se usará en los seleccionadores de moneda.

Ejemplo

Código | Nombre  
---|---  
10 | Peso  
20 | Dolar  
30 | Euro  
  
Observaciones

Es muy recomendable que indique el nombre completo de la moneda, para evitar
futuras confusiones.

---

# Unidad

Nombre de la unidad de moneda.

Ejemplo

Por ejemplo: Dólares, euros, pesos, etc.

Observaciones

Este nombre se usará en la impresión de cheques, informes, etc. por tanto se
recomienda indicarlo en plural.

---

# Símbolo

Símbolo monetario gráfico, utilizado por diferentes monedas

Ejemplo

Moneda | Símbolo  
---|---  
Peso | $  
Dolar | U$  
Euro | €  
  
Observaciones

El sistema por por defecto tiene creadas tres monedas con su respectivo
símbolo: Peso, Dólar, Euro.  
Se pueden crear el número de monedas que se requiera.

---

# Abreviatura

Código de moneda de tres letras.

Ejemplo

Moneda | Abreviatura  
---|---  
Peso | COP  
Dolar | USD  
Euro | EUR  
  
Observaciones

Esta es la identificación de la unidad monetaria nacional que se utiliza de
acuerdo con la norma ISO 4217: las dos primeras letras definen el país y la
tercera, el nombre de la moneda.

---

# Disponible para presupuesto

Active esta casilla para crear presupuestos con esta cuenta y que las
imputaciones contables realizadas afecten el módulo de presupuesto.  
  
El módulo de presupuesto y ejecución presupuestal cuenta con un editor de
presupuestos que permite crear presupuestos por centro de costos y por
cuentas. Cuando se crean presupuestos para las cuentas, sus imputaciones
contables se ven reflejadas en los informes de ejecución presupuestal.  

Ejemplo

La empresa CMB Muebles y Hogar necesita crear presupuestos para sus ingresos y
gastos. Para ello, debe configurar las cuentas de ingresos y gastos para que
tengan activado el atributo "Es de presupuesto". De esta forma, podrá crear
presupuestos a estas cuentas a través del editor de presupuesto y podrá
obtener diferentes informes de ejecución presupuestal para estas cuentas.

---

# Código

Código asignado a la cuenta.[ Ver más.](<../\[10990\]
FrmInputNewCuenta/\[30\]LblICuenta.html>)

---

# Ajustar por inflación

Active esta casilla para que el sistema realice de forma automática los
ajustes por inflación al realizarse la accion de "Ajustes por inflación" por
medio de la operación de acciones automáticas de fin de mes.  
  
El sistema tomará el saldo de las cuentas marcadas con este atributo y lo
multiplicará por el porcentaje del PAAG.  
  

A continuación, se muestra una imagen con el formulario para ingresar los
datos necesarios para calcular los ajustes por inflación, incluyendo el
porcentaje PAAG y el centro de costos a imputar.

![Formulario de datos para ajustes por inflación con campos de año, mes,
porcentaje PAAG e imputación al centro de
costos.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Plan%20de%20Cuentas/%5B10970%5D%20FrmCuenta/imagen2.png)

Ejemplo

La empresa CMB Muebles y Hogar necesita realizar ajustes por inflación. Para
ello, debe configurar las cuentas relacionadas con los ajustes por inflación
para que tengan activado el atributo "Ajustar por inflación". De esta forma,
cuando realice la operación de "Acciones automáticas de fin de mes" y dentro
de la operación active la opción "Ajustes por inflación" el sistema realizará
este proceso a las cuentas marcadas con este atributo.

Observaciones

Para que el sistema realice los ajustes por inflación de forma automática, el
área de trabajo debe tener activada la opción "La economía del país es
altamente inflacionaria?"

Configuración

Para activar la opción "La economía del país es altamente inflacionaria?",
ver: **\[Botón de aplicación > Configuración general del sistema >
Configuración general de contabilidad\]**  
Para ingresar al catálogo de Rangos de ajustes por inflación, ver: **\[Pestaña
contabilidad > despliega la flecha hacia abajo del Ícono de Plan de cuentas >
Rangos de ajustes por inflación\]**

---

# Manejo de moneda extranjera

Active esta casilla si la cuenta va a manejar valores en una moneda diferente
a la moneda local.  
  
Las cuentas pueden manejar imputaciones contables en la moneda local y en una
moneda adicional. Cuando se activa esta casilla, se habilita la opción para
seleccionar la moneda extranjera en la que la cuenta también recibirá
imputaciones contables.[ Ver más.](<\[130\]LblIMoneda.html>)

Ejemplo

La empresa CMB Muebles y Hogar necesita llevar los valores de uno de sus
bancos en dólares. Para ello, debe configurar la cuenta de este banco para que
tengan activado el atributo "Manejo de moneda extranjera" y luego seleccionar
la moneda "Dólar". De esta forma, cada vez que realice una imputación contable
con esta cuenta de banco, el sistema llevará el registro en moneda local y en
dólares.

Observaciones

Cada cuenta solo puede manejar una moneda extranjera. El sistema siempre
realizará las imputaciones contables en la moneda local y adicionalmente en la
moneda extranjera seleccionada.

Configuración

Para activar el manejo de moneda extranjera, ver: **\[Catálogo de plan de
cuentas < Configuración < Configuraciones generales\]**

---

# No realizar ajuste por diferencia en cambio

Active esta casilla únicamente en aquellos casos en los que se requiere que el
sistema no realice ajuste por diferencia en cambio, por ejemplo, cuando se
utilice la contabilidad de coberturas o cuando se trate de una partida
monetaria que forme parte de la inversión neta de un negocio en el extranjero.
\(Consejo técnico de la Contaduría Pública\)

Observaciones

Se recomienda que se active esta opción únicamente en los casos en los que la
norma así lo señala.  
Según radicado 1-2021-002346 del 2021 emitido por el Consejo Técnico de la
Contaduría Pública, "todos los activos y pasivos monetarios mantenidos en
moneda extranjera deben expresarse en el estado de situación financiera a la
tasa de cambio de cierre, dicha diferencia por actualización a la tasa de
cambio de cierre, se reconocerá en el estado de resultados a menos que se
utilice la contabilidad de coberturas, o se trate de una partida monetaria que
forme parte de la inversión neta de un negocio en el extranjero".  
  
Antes de aplicar este cambio sobre la base de datos, consulte con su contador
o revisor fiscal el manejo de este tipo de configuraciones, ya que puede
afectar la generación de su información financiera.

Configuración

Para revisar la configuración en el manejo de moneda extranjera, ver:
**\[Catálogo de plan de cuentas < Configuración < Configuraciones
generales\]**

---

# Moneda

Moneda adicional en la que la cuenta manejará sus imputaciones contables.

Ejemplo

Código moneda | Nombre moneda  
---|---  
10 | Peso  
20 | Dólar  
30 | Euro  
  
Observaciones

El sistema cuenta con un catálogo en el cual se pueden crear y configurar las
diferentes monedas que se vayan a manejar.

Configuración

Para ingresar al catálogo de monedas, ver:**\[Pestaña contabilidad > despliega
la flecha hacia abajo del Ícono de Plan de cuentas > Monedas\]**

---

# Visible en selección

Active esta casilla para que la cuenta sea visible y se pueda seleccionar en
los diferentes catálogos y operaciones del sistema.  
  
Por defecto, todas las cuentas del catálogo vienen con esta opción activada.

Ejemplo

La empresa CMB Muebles y Hogar tiene creada una cuenta de bancos que ya no
utiliza y desea que dicha cuenta ya no aparezca en en seleccionador de cuentas
en las diferentes operaciones. Para ello, debe configurar esta cuenta de banco
para que tengan desactivado el atributo "Visible en selección". De esta forma,
la cuenta permanecerá en la base de datos para temas de trazabilidad, pero no
será visible en las operaciones.

Observaciones

Debe tener en cuenta que aunque la cuenta no esté marcada como visible en
selección, la podrá seguir utilizando en las operaciones y catálogos, bastará
con digitar el código para llamarla.

---

# Disponible en operaciones de gastos/ingresos

Active esta casilla para que la cuenta pueda ser seleccionada como concepto de
gasto o ingreso en las operaciones de Gastos, Pagos e Ingresos.

Ejemplo

La empresa CMB Muebles y Hogar factura a través de la operación de "Ingresos".
En este caso, a todas las cuentas que utiliza para facturar debe configurarlas
para que tengan activo el atributo "Disponible ingresos/gastos. De esta forma,
en la operación el seleccionador de cuentas le mostrará las cuentas de
ingresos para seleccionarlas.

Observaciones

Si la cuenta no está marcada como disponible para gastos/ingresos, no
aparecerá en el seleccionador de cuentas de las operaciones anteriormente
mencionadas, pero al ser digitada manualmente se podrá utilizar en estas
operaciones.

---

# Auto activar

Active esta casilla para que los saldos de esta cuenta sean llevados
automáticamente a las cuentas del activo, al realizarse la acción de "Auto
activación de cuentas" por medio de la operación de acciones automáticas de
fin de mes.  
  
La autoactivación de cuentas es el proceso por medio del cual el sistema toma
los saldos de las cuentas marcadas para auto activar y cuyos saldos se
encuentren en un centro de costos de producción, y los lleva directamente a
una cuenta del activo \(cuenta de producto en proceso\) la cual es configurada
directamente en el centro de costos productor.  
  

A continuación, se muestra una imagen tipo cuentas T que ejemplifica el
proceso de autoactivación contable, trasladando saldos desde cuentas de costos
de producción a cuentas del activo, y de cuentas de gasto al estado de
pérdidas y ganancias.

![Ejemplo gráfico de cuentas tipo T que muestra cómo el sistema realiza la
autoactivación de cuentas
contables.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Plan%20de%20Cuentas/%5B10970%5D%20FrmCuenta/imagen1.png)  
  
Los costos de producción se consideran una inversión para la empresa, por lo
cual no deben afectar directamente el Estado de Resultados sino que deben ser
llevados al balance, afectando la cuenta de producto en proceso, esperando que
dichos costos se conviertan finalmente en producto terminado.  

Ejemplo

La empresa CMB Muebles y Hogar necesita que los valores de una cuenta
específica de gastos sean tratados como costos de producción y sus valores
sean llevados a producto en proceso. Para ello, debe configurar dicha cuenta
para que tengan activado el atributo "Auto activar". De esta forma, cuando
realice la operación de "Acciones automáticas de fin de mes" y en la operación
active el atributo "Auto activación de cuentas", el sistema cancelará los
valores de dicha cuenta, cuando estos se encuentren cargados a un centro de
costos de producción y los llevará a cuenta de producto en proceso configurada
en el centro de costos.

Observaciones

Esta opción solo aplica cuando se tiene el módulo de Costos de producción.

---

# Maneja tercero

Active esta casilla si desea que al cargar un movimiento a esta cuenta el
sistema solicite que se asocie un tercero.  
  
Al activar esta opción, el sistema mostrará otras dos opciones en manejo de
tercero:  
  
\- Exige tercero.[ Ver más.](<\[195\]CBoxBExigeTercero.html>)  
\- Discrimina por tercero.[ Ver más.](<\[220\]EdBManejaTercero.html>)  

Ejemplo

La empresa CMB Muebles y Hogar necesita controlar sus gastos por cada tercero
con el que se realizan. Para ello, debe configurar las cuentas de gastos para
que tengan activado el atributo "Maneja tercero". De esta forma, cada vez que
utilice las cuentas en una operación, el sistema le permitirá indicar el
tercero al cual se cargará la imputación contable.

Observaciones

Las cuentas que controlan endeudamiento manejan dos tipos de tercero: tercero
en transacción y tercero en cartera. La configuración de obligatoriedad para
el tercero en cartera es la misma que se configura para el tercero en
transacción.

---

# Exige tercero

Active esta casilla si desea que el sistema exija colocar un tercero cada vez
que realice un movimiento a esta cuenta.  

Ejemplo

La empresa CMB Muebles y Hogar necesita controlar sus cuentas por cobrar por
cada tercero con el que se realizan. Para ello, debe configurar las cuentas de
cartera para que tengan activado el atributo "Exige tercero". De esta forma,
cada vez que utilice las cuentas en una operación, el sistema exigirá que
indique el tercero al cual se cargará la imputación contable.

Observaciones

Las cuentas que controlan endeudamiento manejan dos tipos de tercero: tercero
en transacción y tercero en cartera. La configuración de obligatoriedad para
el tercero en cartera es la misma que se configure para el tercero en
transacción.

---

# Maneja referencias

Active esta casilla para que las imputaciones contables realizadas a la cuenta
conserven el número de referencia o de documento de soporte con el cual se ha
realizado cada movimiento.  
  
Este atributo normalmente se maneja en conjunto con el atributo de “Controla
endeudamiento” para conservar este dato y manejar deudas dividas en cuotas.
Cuando ambos atributos se encuentran activados, los informes de cartera y
proveedores se mostrarán de la siguiente forma:  
  

A continuación, se muestra una imagen del explorador de cartera cuando el
atributo 'Maneja referencias' está activado.

![Explorador de cartera con documento de referencia visible al activar el
atributo 'Maneja
referencias'.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Plan%20de%20Cuentas/%5B10970%5D%20FrmCuenta/imagen3.png)  
  
Si no se activa el atributo de "Maneja referencias", los informes de cartera y
proveedores se mostrarán de la siguiente forma:  
  

A continuación, se muestra una imagen del explorador de cartera cuando el
atributo 'Maneja referencias' no está activado.

![Explorador de cartera sin documento de referencia al no activar el atributo
'Maneja
referencias'.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Plan%20de%20Cuentas/%5B10970%5D%20FrmCuenta/imagen4.png)

Ejemplo

La empresa CMB Muebles y Hogar necesita controlar su cartera de modo que pueda
saber cuáles son los documentos relacionados con las deudas de sus clientes.
Para ello, debe configurar las cuentas de clientes para que tengan activado el
atributo "Maneja referencias". De esta forma, los informes de cartera
mostrarán el documento referencia de la deuda.

---

# Tipo de cuenta

Tipo de cuenta asignado.  
  
El sistema maneja 7 tipos diferentes de cuenta: activo, pasivo, patrimonio,
ingresos, egresos, de orden deudora y de orden acreedora.  
  
El tipo de cuenta permite definir la naturaleza de cada cuenta y en qué
informes serán visibles sus saldos y movimientos.  
  
Los tipos de cuenta son:  
  
Tipos de cuenta | Naturaleza | Informes donde se muestran  
---|---|---  
Activo | Débito | Estado de situación financiera  
Pasivo | Crédito | Estado de situación financiera  
Patrimonio | Crédito | Estado de situación financiera  
Ingresos | Crédito | Estado de resultados  
Egresos | Débito | Estado de resultados  
De orden deudora | Débito | Estado de situación financiera  
De orden acreedora | Crédito | Estado de situación financiera  
  
Ejemplo

La empresa CMB Muebles y Hogar necesita crear una cuenta auxiliar para bancos.
En este caso, dicha cuenta debe marcarse de tipo "Activo" para que su
naturaleza sea de tipo débito y su información se vea reflejada en el "Estado
de situación financiera".

---

# Información adicional

Esta opción activa una pestaña donde podrá definir qué información adicional
se podrá digitar para esta cuenta en la operación de movimiento contable.  
  
La pestaña de información adicional cuenta con cuatro campos, dos para datos
de tipo texto y dos para datos numéricos.

Ejemplo

La empresa CMB Muebles y Hogar solo cuenta con el módulo de contabilidad y
necesita digitar un dato adicional para algunas cuentas. En este caso, debe
activar los campos de información adicional para que en la operación de
movimiento contable pueda digitar esta información.

Observaciones

Estos campos aparecen en la operación de movimiento contable como columnas
adicionales y sólo aparecerán habilitados para aquellas cuentas que los tengan
activados.  
  
La información de los campos adicionales podrá ser consultada posteriormente
en el explorador de contabilidad. También se puede visualizar en el documento
impreso de la operación.

---

# Discrimina por tercero

Active esta casilla para que las imputaciones contables de esta cuenta sean
diferenciadas por el tercero de transacción en los informes de "Inventario y
balances" y "Movimiento de cuentas auxiliares".

Ejemplo

La empresa CMB Muebles y Hogar necesita que en el informe de movimiento de
cuentas auxiliares, el sistema discrimine para la cuenta de clientes, los
valores por cada tercero. Para ello, debe configurar las cuentas de clientes
para que tengan activado el atributo "Discrimina por tercero". De esta forma,
el informe de cuentas auxiliares mostrará los movimientos por cada tercero
utilizado.

---

# Controla cartera y/o proveedores para informes

Active esta casilla para que las imputaciones contables realizadas a la cuenta
se vean reflejadas en los diferentes informes de cartera y proveedores.  
  
Este atributo normalmente se maneja en conjunto con el atributo de “Maneja
referencia” para conservar este dato y manejar deudas dividas en cuotas.
Cuando ambos atributos se encuentran activados, los informes de cartera y
proveedores se mostrarán de la siguiente forma:  
  

A continuación, se muestra una imagen del explorador de cartera cuando se
activan los atributos 'Controla cartera y/o proveedores' y 'Maneja
referencias'.

![Explorador de cartera con información detallada al activar 'Controla cartera
y/o proveedores' y 'Maneja
referencias'.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Plan%20de%20Cuentas/%5B10970%5D%20FrmCuenta/imagen3.png)  
  
Si no se activa el atributo de "Maneja referencias", los informes de cartera y
proveedores se mostrarán de la siguiente forma:  
  

A continuación, se muestra una imagen del explorador de cartera cuando no está
activado el atributo 'Maneja referencias'.

![Explorador de cartera sin detalle de documento cuando 'Maneja referencias'
no está
activo.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Plan%20de%20Cuentas/%5B10970%5D%20FrmCuenta/imagen4.png)

Ejemplo

La empresa CMB Muebles y Hogar necesita controlar sus cuentas por pagar y
conocer a través de diferentes informes, el estado de sus deudas. Para ello,
debe configurar las cuentas de proveedores para que tengan activado el
atributo "Controla endeudamiento". De esta forma, los informes de proveedores
mostrarán las diferentes imputaciones contables hechas a estas cuentas,
adicionando información como fecha de pago, días de vencimiento, entre otros.

Observaciones

Si desea manejar deterioro de cartera, este atributo debe estar activo, así se
activará la ventana de configuración de métodos de deterioro de cartera.
Igualmente, la cuenta debe estar marcada como cuenta de contabilización NIIF.

Configuración

Para configurar los métodos de deterioro de cartera, ingrese a la pestaña
"Deterioro de cartera" que se habilita en la ventana de edición de la cuenta.

---

# Deterioro cartera

Esta opción activa una pestaña donde podrá definir los métodos de deterioro de
cartera a utilizar para la cuenta.  
  
Esta opción aparece activa siempre y cuando la cuenta esté marcada como cuenta
de contabilización NIIF y tenga activado el atributo de "Controla
endeudamiento".

Ejemplo

La empresa CMB Muebles y Hogar necesita aplicar deterioro de cartera a sus
cuentas por cobrar. En este caso, debe seleccionar el o los métodos de
deterioro que necesite manejar para sus cuentas por cobrar.

Observaciones

El sistema maneja tres métodos de deterioro de cartera y cada cuenta puede
manejar los tres métodos al mismo tiempo.

---

# Clase

Clase a la que pertenece la cuenta. El sistema maneja 5 clases diferentes de
cuentas: normal, de efectivo, de impuestos, de ajuste por inflación y de
nómina contable.  
  
La clase de cuenta permiten manejos especiales en cuanto al cálculo de
impuestos, descuentos, asignación de conceptos y que aparezcan en algunos
informes específicos.  
  
Las clases de cuentas son:  
  
\- Normal: esta clase se asigna a aquellas cuentas que en su uso calculen
algún impuesto o descuento como IVA, retenciones, etc., y que no requieran
algún manejo específico por ejemplo para informes. Adicionalmente, se deben
especificar los cargos o descuentos a calcular.[ Ver
más.](<\[280\]LblImpuestos.html>)  
\- De efectivo: esta clase se asigna a aquellas cuentas que manejen efectivo y
que por su naturaleza sea necesario mostrarlas en el Estado de Flujos de
Efectivo y requieran la exigencia de conceptos de flujos de efectivo.  
\- De impuestos: esta clase se asigna a aquellas cuentas que manejan el valor
de los impuestos, es decir, que en ellas se contabiliza el débito o crédito de
los impuestos. Adicionalmente, se debe especificar el tipo de impuesto al que
corresponde la cuenta. [ Ver más.](<\[260\]LblISubClase.html>)  
\- De ajuste por inflación: esta clase se asigna a aquellas cuentas que
manejan el valor de los ajustes por inflación, es decir, que en ellas se
contabiliza el débito o crédito de los ajustes por inflación.  
\- De nómina contable: esta clase se asigna a aquellas cuentas que en su uso
calculen algún descuento o cargo de nómina contable como descuentos por salud,
por pensión, ARL, etc. Adicionalmente, se deben especificar los cargos o
descuentos a calcular. [ Ver más.](<\[350\]LblDConc.html>)  

Ejemplo

Cuenta | Clase | Detalles  
---|---|---  
Normal | Clientes, proveedores, ingresos, gastos, etc. | La mayoría de las cuentas son de clase normal. A estas cuentas se les puede configurar el manejo de impuestos o simplemente dejar la parte de impuestos en blanco  
De efectivo | Caja, bancos, etc. | Manejan conceptos de flujo de efectivo  
De impuestos | IVA, retención en la fuente, etc. | A estas cuentas es necesario indicarles el tipo de impuesto que manejan  
De nómina | Sueldos, horas extras, etc | A estas cuentas es necesario indicarles los conceptos de aportes y retenciones de nómina que se les deben calcular  
  

Observaciones

Las cuentas ya vienen con una clasificación específica asignada, depeniendo de
su comportamiento en la contabilidad. Este atributo puede ser cambiado si el
usuario lo requiere.

---

# Tipo impuesto

Tipo de impuesto al que pertenece la cuenta.  
  
El sistema cuenta con un catálogo desde el cual se puede seleccionar el tipo
de impuesto que se asignará a la cuenta y por defecto encontrará 6 tipos de
impuestos pero, de ser necesario, podrá crear más tipos de impuestos.

Ejemplo

Tipo de impuesto | Ejemplo de cuenta  
---|---  
IVA | Cuenta de ingresos con IVA, cuenta de Pagados con IVA, cuenta de IVA generado por devoluciones  
IVAASUMIDO | Cuenta de IVA asumido  
RETEIVA | Cuenta de IVA retenido a régimen simplificado, cuenta de IVA retenido a régimen común  
RETENCION | Cuenta de retención por honorarios, cuenta de retención por servicios en general  
RETEICA | Cuenta de impuesto de industria y comercio retenido  
OTRO | Cuenta de impuesto nacional al consumo de bolsas plásticas  
  

Configuración

Para crear o modificar los tipos de impuestos, ver: **\[Pestaña contabilidad >
despliega la flecha hacia abajo del Ícono de Plan de cuentas > Tipos de
impuestos\]**

---

# Impuestos, descuentos y cargos

Listado de impuestos, descuentos o cargos que se pueden cargar a la cuenta.  
  
El sistema permite relacionar hasta 6 conceptos de impuesto para cada cuenta.
Estos conceptos se crean y configuran en los catálogos de conceptos de
liquidación en ingreso y egreso. Cuando se realice una operación con esta
cuenta, el sistema calculará los impuestos que se hayan configurado, siempre y
cuando se cumpla con los parámetros y requisitos establecidos en el concepto
de liquidación del impuesto.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar las cuentas de ingresos y
gastos para que en las operaciones, al utilizar estas cuentas, se calcule de
forma automática el IVA, la retención en la fuente, el Reteica y otros
impuestos. Para ello, puede configurar en cada uno de los campos para
impuestos, los conceptos de liquidación relacionados con impuestos.

Observaciones

La operación de facturación y ventas permite configurar del listado de
impuestos, cuáles se pueden calcular y cuáles no.

Configuración

Para personalizar las etiquetas de los impuestos, ver:**\[Catálogo de
conceptos de liquidación > Configuración > Etiquetas para impuestos\]**

---

# Impuesto 1

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de ingresos, el
concepto de IVA para calcularse de forma automática en las operaciones. Para
ello puede utilizar este campo y allí cargar el concepto de IVA.

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Impuesto 2

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de gastos por
honorarios, el concepto de Retención en la fuente para calcularse de forma
automática en las operaciones. Para ello puede utilizar este campo y allí
cargar el concepto de Retención en la fuente.

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Cuenta alterna

Código adicional o alterno para la cuenta.  
  
Este código puede ser usado en caso de manejar otro sistema de cuentas en el
cual el código de la cuenta sea diferente al código que maneja \[ContaPyme\].
En este caso, al exportar la información se conservaría el código manejado en
\[ContaPyme\] y se conservaría para la integración el código manejado en el
sistema adicional.

Ejemplo

Código cuenta | Nombre cuenta | Código alterno  
---|---|---  
111005 | Banco Nacional | 111001  
111010 | Banco del Caribe | 111005  
  

Observaciones

En las operaciones y catálogos, el sistema reconocerá la cuenta por su código
de creación, anque es posible agregar en el seleccionador de cuentas la
columna para que se muestre el código alterno.

---

# Impuesto 3

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de ingresos, el
concepto de ReteICA para calcularse de forma automática en las operaciones.
Para ello puede utilizar este campo y allí cargar el concepto de ReteICA.  

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Impuesto 5

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de ingresos, el
concepto de ReteCREE o Auto retención especial a título de renta para
calcularse de forma automática en las operaciones. Para ello puede utilizar
este campo y allí cargar el concepto de ReteCREE o Auto retención especial a
título de renta.

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Impuesto 4

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de ingresos, el
concepto de impuesto nacional al consumo de bolsas plásticas para calcularse
de forma automática en las operaciones. Para ello puede utilizar este campo y
allí cargar el concepto de impuesto nacional al consumo de bolsas plásticas.

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Impuesto 6

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de ingresos, el
concepto para manejar un descuento especial en ventas para calcularse de forma
automática en las operaciones. Para ello puede utilizar este campo y allí
cargar el concepto de descuento.

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Impuesto 7

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de ingresos, el
concepto para manejar un descuento especial en ventas para calcularse de forma
automática en las operaciones. Para ello puede utilizar este campo y allí
cargar el concepto de descuento.

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Impuesto 7

Impuesto o descuento a calcular para esta cuenta.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar a la cuenta de ingresos, el
concepto para manejar un descuento especial en ventas para calcularse de forma
automática en las operaciones. Para ello puede utilizar este campo y allí
cargar el concepto de descuento.

Configuración

Para personalizar la etiqueta de este campo, ver:**\[Catálogo de conceptos de
liquidación > Configuración > Etiquetas para impuestos\]**

---

# Conceptos de nómina contable

Lista de conceptos de descuento y cargos relacionados con la nómina contable.  
  
El sistema cuenta con un catálogo de conceptos de liquidación en egreso desde
el cual se pueden seleccionar todos los cargos y descuentos que se calcularán
de forma automática cuando la cuenta sea usada en una operación.  

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar las cuentas de sueldos y
horas extras para que en las operaciones, al utilizar estas cuentas, se
calcule de forma automática los descuentos y cargos relacionados con la nómina
contable. Para ello, puede configurar en este listado, los diferentes
conceptos que se deben calcular al utilizar estas cuentas.

Configuración

Para crear o modificar los conceptos de liquidación en egreso, ver:
**\[Pestaña contabilidad > despliega la flecha hacia abajo del Ícono de Plan
de cuentas > Concepto de liquidación en egreso\]**

---

# Exige clase 1

Active esta casilla si desea que en la operación de Movimiento Contable se
registre información adicional al llamar la cuenta.  
  
Cuando se activa este campo, en la operación de Movimiento contable se
activará una columna adicional la cual estará en modo edición solo para los
renglones de aquellas cuentas que tengan activada esta opción.  
  
Este campo permitirá registrar información numérica o alfa numérica.  
  
La información registrada en este campo, se podrá consultar desde el
explorador de movimiento contable.

Ejemplo

La empresa CMB Muebles y Hogar requiere registrar en las cuentas de gastos por
transportes y fletes la ciudad de la cual se recibió el despacho. En este
caso, debe activar en la cuenta la opción de exigir el campo clase 1 para
poder registrar allí dicha información.

Observaciones

La información digitada en este campo también podrá agregarse al diseño de los
documentos basados en la nota de contabilidad simple y la nota de contabilidad
ampliada.

Configuración

Para cambiar las etiquetas de las columnas adicionales y configurar si serán
visibles, ver:**\[Catálogo Plan de cuentas > Configuración del catálogo >
Columnas adicionales en la operación de movimiento contable\].**

---

# Exige clase 2

Active esta casilla si desea que en la operación de Movimiento Contable se
registre información adicional al llamar la cuenta.  
  
Cuando se activa este campo, en la operación de Movimiento contable se
activará una columna adicional la cual estará en modo edición solo para los
renglones de aquellas cuentas que tengan activada esta opción.  
  
Este campo permitirá registrar información numérica o alfa numérica.  
  
La información registrada en este campo, se podrá consultar desde el
explorador de movimiento contable.

Ejemplo

La empresa CMB Muebles y Hogar requiere registrar en la cuenta de gastos por
pasajes aéreos el número del tiquete aéreo adquirido. En este caso, debe
activar en la cuenta la opción de exigir el campo clase 2 para poder registrar
allí dicha información.

Observaciones

La información digitada en este campo también podrá agregarse al diseño de los
documentos basados en la nota de contabilidad simple y la nota de contabilidad
ampliada.

Configuración

Para cambiar las etiquetas de las columnas adicionales y configurar si serán
visibles, ver:**\[Catálogo Plan de cuentas > Configuración del catálogo >
Columnas adicionales en la operación de movimiento contable\].**

---

# Observaciones

Observaciones generales relacionadas con la cuenta.

Ejemplo

Código cuenta | Nombre cuenta | Observaciones  
---|---|---  
111005 | Banco Nacional | Cuenta corriente Nª 123456789  
112005 | Banco Nacional | Cuenta de ahorros Nª 777878000  
  
Configuración

Para visualizar este campo desde el explorador de contabilidad
ver:**\[Explorador de contabilidad >Configuración > Información disponible de
cuentas\].**

---

# Exige valor 1

Active esta casilla si desea que en la operación de Movimiento Contable se
registre información adicional al llamar la cuenta.  
  
Cuando se activa este campo, en la operación de Movimiento contable se
activará una columna adicional la cual estará en modo edición solo para los
renglones de aquellas cuentas que tengan activada esta opción.  
  
Este campo permitirá registrar numérica.  
  
La información registrada en este campo, se podrá consultar desde el
explorador de movimiento contable.

Ejemplo

La empresa CMB Muebles y Hogar requiere registrar en la cuenta de ingresos por
servicios de capacitación la cantidad de horas de capacitación dictadas al
cliente. En este caso, debe activar en la cuenta la opción de exigir el campo
valor 1 para poder registrar allí dicha información.

Observaciones

La información digitada en este campo también podrá agregarse al diseño de los
documentos basados en la nota de contabilidad simple y la nota de contabilidad
ampliada.

Configuración

Para cambiar las etiquetas de las columnas adicionales y configurar si serán
visibles, ver:**\[Catálogo Plan de cuentas > Configuración del catálogo >
Columnas adicionales en la operación de movimiento contable\].**

---

# Exige valor 2

Active esta casilla si desea que en la operación de Movimiento Contable se
registre información adicional al llamar la cuenta.  
  
Cuando se activa este campo, en la operación de Movimiento contable se
activará una columna adicional la cual estará en modo edición solo para los
renglones de aquellas cuentas que tengan activada esta opción.  
  
Este campo permitirá registrar numérica.  
  
La información registrada en este campo, se podrá consultar desde el
explorador de movimiento contable.

Ejemplo

La empresa CMB Muebles y Hogar requiere registrar en la cuenta de costos de
mano de obra la cantidad de horas trabajadas por cada empleado. En este caso,
debe activar en la cuenta la opción de exigir el campo valor 2 para poder
registrar allí dicha información.

Observaciones

La información digitada en este campo también podrá agregarse al diseño de los
documentos basados en la nota de contabilidad simple y la nota de contabilidad
ampliada.

Configuración

Para cambiar las etiquetas de las columnas adicionales y configurar si serán
visibles, ver:**\[Catálogo Plan de cuentas > Configuración del catálogo >
Columnas adicionales en la operación de movimiento contable\].**

---

# Calcular costo amortizado para un periodo parcial

Active esta casilla si desea utilizar el método del costo amortizado para
realizar el cáculo del deterio de cartera.  
  
El método del costo amortizado toma el valor actualizado de la cuenta por
cobrar y resta el valor presente. Este método solo aplica para aquellas
empresas que estén llevando a cabo el costo amortizado de los activos
financieros por el método del interés efectivo.  
  
Este método solicita que se indique la tasa efectiva anual.

Ejemplo

La empresa CMB Muebles y Hogar tiene una cuenta vencida con el señor Juan
Pérez desde el 17/08/2017 por valor de $800.000. El día 31 de agosto deben
presentar informes, por lo que deben aplicar deterioro de cartera. Para
aplicar el deterioro por el método del costo amortizado tenemos los siguientes
datos:

Valor de la deuda | 800.000  
---|---  
Cantidad de días a deteriorar | 14  
Tasa interés efectivo | 10%  
Tasa nominal diaria | 0,02612%  
  

Con los datos anteriores calculamos el valor del deterioro a aplicar sobre la
cuenta y el asiento contable sería el siguiente:  
  
Código cuenta | Nombre cuenta | Débito | Crédito  
---|---|---|---  
13990505 | Deterioro clientes |  | 2.929,93  
51991005 | Deterioro Deudores | 2.929,93 |   
  
Observaciones

Las operaciones de deterioro y reversión de deterioro pertenecen al módulo de
cartera y proveedores.  
  
Sólo se deteriora cartera vencida.  
  
Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.  
  
Antes de realizar la configuración en las cuentas, se debe activar la opción
para el cálculo por costo amortizado y opcionalmente indicar la tasa efectiva
anual de mercado para operaciones comerciales.

Configuraciones

Para activar la opción del costo amortizado, ver:**\[Catálogo plan de cuentas
> Configuración > Configuraciones generales > Deterioro de cartera NIIF\]**

---

# Afectable directamente por el usuario

Active esta casilla si desea realizar imputaciones contables a la cuenta a
través de las diferentes operaciones con las que cuenta el sistema y que
permiten la selección manual de cuentas.  
  
Normalmente todas las cuentas del sistema son afectables por el usuario, sin
embargo hay ciertas cuentas que son controladas por otros módulos en forma
automática. Al desactivar esta casilla, el sistema mostrará una advertencia
cuando esta cuenta sea utilizada en la operación de Movimiento Contable. Esta
advertencia tiene como finalidad indicarle al usuario que no debe realizarle
imputaciones contables a la cuenta de forma manual puesto que el sistema
podría perder su consistencia.  

Ejemplo

Cuenta | Afectable o no afectable | Detalles  
---|---|---  
Cuentas de impuestos \(IVA, Retención en la fuente, etc.\) | No afectable | Estas cuentas deben ser afectadas solo por el cálculo automático de impuestos  
Cuentas de inventario \(Materias primas, producto en proceso, producto terminado, etc.\) | No afectable | Si tiene el módulo de inventarios y facturación, el sistema realizará los movimientos a estas cuentas de forma automática a través de las diferentes operaciones del módulo  
Cuentas de activos fijos \(Construcciones y edificaciones, maquinaria y equipo, etc.\) | No afectable | Si tiene el módulo de activos fijos, el sistema realizará los movimientos a estas cuentas de forma automática a través de las diferentes operaciones del módulo  
Cuentas de efectivo \(Caja, bancos, etc.\) | Afectable | Estas cuentas son de uso frecuente y se les realizan diferentes imputaciones contables, dependiendo de la transacción  
  
Configuración

Para configurar que se muestre error o advertencia al realizar una imputación
contable a una cuenta no afectable directamente por el usuario,
ver:**\[Manejador de operaciones > Operación de movimiento contable
>Configuración operación > Opciones varias de la operación\].**

---

# EA: Tasa Efectiva Anual

Active la casilla "EA: Tasa Efectiva Anual" para indicar la tasa efectiva
anual. O active la casilla "ND: Tasa Nominal Diaria" para indicar la tasa
nominal diaría.  
  
Al indicar una de las tasas, el sistema convertirá automáticamente la otra
tasa al valor correspondiente. Cualquiera sea la tasa indicada, el deterioro
se realizará con la tasa nominal diaria.

Ejemplo:

Tasa EA | Tasa ND  
---|---  
10% | 0,0261157%  
12% | 0,0310537%  
9,5% | 0,0248673%  
  

Observaciones

Las tasas efectiva anual y nominal diaria solo se utilizan para el método de
deterioro por costo amortizado.

---

# Activar el cálculo manual de flujo futuro en la operación de deterioro de
cartera

Active esta casilla si desea utilizar el método de flujos futuros para
realizar el cáculo del deterio de cartera.  
  
El método de flujos futuros utiliza la fórmula del valor presente. Toma el
valor en libros de la cuenta por cobrar y resta el valor presente de los
flujos de efectivo futuros estimados, descontados utilizando la tasa de
interés efectivo. Al registrarse la operación de deterioro de cartera, se debe
indicar cuáles son los flujos de efectivo o pagos futuros estimados al igual
que la tasa de interés a aplicar.

Ejemplo:

La empresa CMB Muebles y Hogar tiene una cuenta vencida con la señora María
Sánchez desde el 25/07/2017 por valor de $2.000.000. La señora Sánchez estima
que podrá pagar toda la deuda el 31/03/2018. El día 31 de agosto de 2017
presentarán informes, por lo que se debe aplicar deterioro. Para aplicar el
deterioro por el método de flujos futuros tenemos los siguientes datos:

Valor de la deuda | 800.000  
---|---  
Cantidad de días a deteriorar | 213  
Tasa interés efectivo | 10%  
Tasa nominal diaria | 0,02612%  
  
  
Con los datos anteriores calculamos el valor del deterioro a aplicar sobre la
cuenta y el asiento contable sería el siguiente:  
  
Código cuenta | Nombre cuenta | Débito | Crédito  
---|---|---|---  
13990505 | Deterioro clientes |  | 108.201,78  
51991005 | Deterioro Deudores | 108.201,78 |   
  
Observaciones

Las operaciones de deterioro y reversión de deterioro pertenecen al módulo de
cartera y proveedores.  
  
Sólo se deteriora cartera vencida.  
  
Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.  
  
En la operación de deterioro de cartera, el sistema activará una ventana para
registrar los flujos futuros esperados y las fechas estimadas, al igual que la
tasa efectiva anual con la que se descontarán dichos valores.

---

# Calcular automáticamente la probabilidad de no pago en la operación de
deterioro de cartera, basado en la siguiente tabla

Active esta casilla si desea utilizar el método de probabilidad de no pago
para realizar el cáculo del deterio de cartera.  
  
El método de probabilidad de no pago toma el valor de la deuda y lo multiplica
por el porcentaje de probabilidad de no pago, según la cantidad de días de
vencimiento que tenga la deuda.  
  
A continuación se explica cada uno de los campos de la lista de probabilidad
de no pago:

  * **Rango días:** Rango de días de vencimiento.
  * **Probabilidad de no pago:** Porcentaje de probabilidad de que la deuda no sea cancelada, de acuerdo a la cantidad de días de vencimiento.

Ejemplo

La empresa CMB Muebles y Hogar tiene una cuenta vencida con la señora Sandra
García desde el 31/07/2017, por valor de $1.000.000. El día 31 de agosto de
2017 presentarán informes, por lo que deben aplicar deterioro. Para aplicar el
deterioro por el método de probabilidad de no pago tenemos los siguientes
datos:  
  
Valor de la deuda | 1.000.000  
---|---  
Cantidad de días a deteriorar | 30  
Probabilidad de no pago | 10%  
  
  
Con los datos anteriores calculamos el valor del deterioro a aplicar:  
  
1.000.000 \* 10% = 100.000  
  
El asiento contable sería el siguiente:  

Código cuenta | Nombre cuenta | Débito | Crédito  
---|---|---|---  
13990505 | Deterioro clientes |  | 100.000  
51991005 | Deterioro Deudores | 100.000 |   
  
Observaciones

Las operaciones de deterioro y reversión de deterioro pertenecen al módulo de
cartera y proveedores.  
  
Sólo se deteriora cartera vencida.  
  
Para que el sistema realice el deterioro de cartera, las cuentas deben tener
activa la opción de 'Controla endeudamiento' y la casilla para afectar
contabilización NIIF.  
  
Se pueden utilizar simultáneamente los tres métodos de deterioro.

---

# Probabilidad de no pago, según días de vencimiento de la cartera:

Listado de rango de días y porcentaje para deterioro por probabilidad de no
pago.  
  
Indique en esta ventana el rango de días de vencimiento y la probabilidad de
no pago dependiendo de los días indicados. Entre más días de vencimiento tiene
la cuenta menos probabilidad hay de que la cancelen.

Ejemplo

Rango días | Probabilidad de no pago  
---|---  
1 a 90 | 10%  
91 a 180 | 30%  
181 a 999 | 70%  
  

Observaciones

Al realizar la configuración del rango de días y la probabilidad de no pago,
no es necesario indicar el signo % en la probabilidad, ya que el sistema
automáticamente lo trae.

---

# Adicionar renglón

Agregar un nuevo renglón para el registro.

Ejemplo

La empresa CMB Muebles y Hogar necesita manejar varios rangos de vencimientos
y probabilidades de no pago, por lo cual necesita agregar un nuevo renglón por
cada rango de fechas para poder definir en cada rango la probabilidad de que
la cuenta por cobrar no sea cancelada. Para ello debe clic a esta opción.

---

# Exige Centro de costos

Active esta casilla para que al momento de realizar una imputación contable a
la cuenta, el sistema exija que se especifique el centro de costos al que se
cargará el movimiento.  
  
Cuando se activa esta casilla, también se activa la opción "Asignar sede como
centro de costos por defecto".[ Ver más.](<\[70\]EdBSEDEXDEFECTO.html>)  

Ejemplo

La empresa CMB Muebles y Hogar necesita llevar control de los diferentes
gastos que se llevan en las dos sedes que la empresa tiene. Para ello, debe
configurar las cuentas de gastos para que tengan activado el atributo "Exige
centro de costos". De esta forma, todas las imputaciones contables que realice
con dichas cuentas, exigirán indicar el centro de costos al cual se cargará el
gasto y de esta forma podrá generar diferentes informes que especificarán los
gastos cargados a cada centro de costos y/o sede de la empresa.

Observaciones

Si esta opción está desactivada y se carga un centro de costos en el
movimiento, el sistema mostrará una advertencia indicando que el centro de
costos indicado no se tendrá en cuenta, ya que la cuenta no lo exige.

---

# Eliminar el ítem seleccionado

Elimina todo el renglón seleccionado.

Ejemplo

La empresa CMB Muebles y Hogar necesita eliminar uno de los rangos adicionados
ya que la información quedó errada. Para ello, debe ubicarse en el renglón
errado y dar clic a esta opción.

---

# Cuenta puente para deterioro de cartera:

Cuenta sobre la cual se contabilizan los créditos del deterioro de cartera o
débitos en caso de realizarse reversión del deterioro de cartera.  
  
Para efectos de control sobre la deuda original y sobre los deterioros
aplicados, se recomienda que esta cuenta sea diferente a la cuenta de cartera
sobre la cual se manejan los saldos normales de la cuenta \(creación de la
deuda y abonos\).

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar la cuenta a la que serán
llevados los valores calculados en el deterioro de cartera. Para ello, debe
cargar en esta opción la cuenta puente a manejar.

Observaciones

Por defecto, el sistema sugiere una cuenta como cuenta puente del deterioro,
pero esta cuenta puede ser cambiada.

---

# Cuenta de gastos para deterioro de cartera y reversión en el mismo período:

Cuenta sobre la cual se contabilizan los débitos del deterioro de cartera o
créditos en caso de realizarse reversión del deterioro de cartera dentro del
mismo periodo contable.  

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar la cuenta del gasto a la
que serán llevados los valores calculados en el deterioro y en la reversión
del deterioro en el mismo periodo contable. Para ello, debe cargar en esta
opción la cuenta de gastos a manejar.

Observaciones

Por defecto, el sistema sugiere una cuenta como cuenta para el gasto por
deterioro, pero esta cuenta puede ser cambiada.  
  
El sistema considera dentro de un mismo periodo contable a todas las
transacciones realizadas en el mismo año.  
  
Si el deterioro y la reversión del deterioro se realizan en años diferentes,
el sistema imputará el deterioro a esta cuenta y la reversión por deterior a
la cuenta configurada en el campo "Cuenta para reversión de deterioro en un
periodo diferente". La explicación es que al finalizar el año, las cuentas de
resultado se cancelan, por lo cual no se podría revertir sobre la misma cuenta
el valor anteriormente contabilizado.

---

# Cuenta de ingresos para reversión de deterioro de cartera, cuando es en un
período contable posterior:

Cuenta sobre la cual se contabilizan los créditos de la reversión del
deterioro de cartera cuando esta se realiza en un perioro contable diferente
al perioro en el cual se realizó el deterioro.

Ejemplo

La empresa CMB Muebles y Hogar necesita configurar la cuenta a la que serán
llevados los valores calculados en la reversión de deterioro de cartera, hecha
en un periodo contable diferente. Para ello, debe cargar en esta opción la
cuenta a manejar.

Observaciones

Por defecto, el sistema sugiere una cuenta como cuenta para la reversión del
deterioro en un periodo diferente, pero esta cuenta puede ser cambiada.  
  
El sistema considera dentro de un mismo periodo contable a todas las
transacciones realizadas en el mismo año.  
  
Si el deterioro y la reversión del deterioro se realizan en años diferentes,
el sistema imputará el deterioro a la cuenta de gasto por deterioro y la
reversión por deterior a esta cuenta. La explicación es que al finalizar el
año, las cuentas de resultado se cancelan, por lo cual no se podría revertir
sobre la misma cuenta el valor anteriormente contabilizado.

---

# Cuenta local

Active esta casilla, para que al realizar imputaciones a esta cuenta, los
movimientos contables generados afecten la contabilización local.

Ejemplo

La empresa CMB Muebles y Hogar necesita que la cuenta de valorizaciones solo
sea afectada en la contabilización local. Para ello debe activar esta opción a
la cuenta y asegurarse que la opción "Cuenta NIIF?" no se encuentre marcada.

Observaciones

Esta opción permite llevar los movimientos de la contabilización local de
manera independiente a los movimientos de la contabilización NIIF. Esto
incluye movimientos de inventarios, de activos fijos y cualquier otro
movimiento realizado en el sistema.

---

# Cuenta NIIF

Active esta casilla, para que al realizar imputaciones a esta cuenta, los
movimientos contables generados afecten la contabilización NIIF.  
  
Cuando esta opción se encuentra desactivada, el sistema habilita la casilla
"Cuenta NIIF equivalente".[ Ver más.](<\[700\]LblICuentaNIIF.html>)

Ejemplo

La empresa CMB Muebles y Hogar necesita que la cuenta de adopción por primera
vez solo sea afectada en la contabilización NIIF. Para ello debe activar esta
opción a la cuenta y asegurarse que la opción "Cuenta local?" no se encuentre
marcada.

Observaciones

Si activa esta opción quiere decir que se llevará la contabilidad bajo
normatividad NIIF de manera independiente de la contabilidad local, incluyendo
los costos de productos en inventarios, las depreciaciones y amortizaciones de
activos, entre otros.

---

# Cuenta NIIF equivalente:

Cuenta a la que se llevarán las imputaciones contables bajo contabilización
NIIF.  
  
Cuando la cuenta está marcada como "Cuenta local?" pero no como "Cuenta
NIIF?", el sistema solicita que se indique a qué otra cuenta se llevarán las
imputaciones realizadas a esta cuenta, cuando se realicen las diferentes
operaciones del sistema en las que los movimientos son automáticos. La mayoría
de las cuentas están marcadas como cuentas locales y cuentas NIIF, pero en
aquellos casos en los que una cuenta es solo local, es necesario indicar cuál
es la cuenta equivalente en NIIF a la cual se llevarán de forma automática las
imputaciones realizadas a esta cuenta. Si esta casilla se deja en blanco, el
sistema solo generará movimiento para la cuenta local.

Ejemplo

La empresa CMB Muebles y Hogar tiene la cuenta 156405 que corresponde en la
contabilidad LOCAL a "Cultivos en desarrollo", como en NIIF no existe esta
cuenta, debe indicar la "Cuenta NIIF equivalente" para afectar contabilización
LOCAL y NIIF, en este caso sería la cuenta 18301001 que equivale a
"Plantaciones agrícolas en desarrollo", la cual es solamente NIIF.

Observaciones

La cuenta equivalente debe tener los mismos atributos que tiene la cuenta solo
local, esto con el fin de garantizar que el momento de realizar una imputación
contable a la cuenta local, en la contabilización NIIF tenga los mismos
efectos.

---

# Asignar sede como centro de costos por defecto

Active esta casilla para que se asigne automáticamente la sede de trabajo como
centro de costos, cuando la cuenta "exige centro de costos" y no fue
especificado en la operación.

Ejemplo

La empresa CMB Muebles y Hogar tiene 3 sedes diferentes y al registrar los
gastos e ingresos, es necesario que el centro de costos imputado sea la sede
de trabajo. En este caso se debe activar la opción de asignar sede como centro
de costos por defecto.

Observaciones

Si no tiene creadas sedes en el explorador gráfico de la empresa, no se
asignará centro de costos al movimiento y será necesario indicarlo de forma
manual.

---

# Exige valor base

Active esta casilla para que cuando se realice una imputación contable a la
cuenta, se exija especificar el valor base de la transacción.  

Ejemplo

La empresa CMB Muebles y Hogar necesita indicar el valor base con el cual se
calcula el IVA. Para ello, debe configurar a las cuentas de IVA para que
tengan activado el atributo "Exige valor base". De esta forma, cuando realice
el cálculo automático de impuestos en las operaciones, el sistema exigirá que
se indique el valor base con el cual se calculará el impuesto.

Observaciones

En las operaciones donde se utiliza el cálculo automático de impuestos, el
sistema coloca de forma automática el valor base con el cual se calcula el
impuesto.

---

# Exige activo/diferido

Active esta casilla para que al momento de realizar una imputación contable a
la cuenta, el sistema exija que se especifique el activo fijo o diferido al
que se cargará el movimiento.  
  
El módulo de activos fijos tiene operaciones especiales para efectuar casi
cualquier operación sobre los activos y en forma automática guarda una
sincronización entre el módulo de activos y la contabilidad. Sin embargo,
cuando es necesario hacer algún movimiento que afecte alguna de las cuentas
que tienen que ver con activos, será necesario especificar el activo fijo para
el cual se está haciendo el movimiento.  

Ejemplo

La empresa CMB Muebles y Hogar necesita llevar control de los activos fijos y
las diferentes imputaciones contables que se realicen sobre estos. Para ello,
debe configurar las cuentas de propiedad, planta y equipo y las cuentas de
depreciaciones para que tengan activado el atributo "Exige activo/diferido".
De esta forma, cada vez que realice una imputación contable con estas cuentas,
el sistema exigirá que indique el código del activo fijo para el cual se
cargará dicha imputación.

Observaciones

Esta opción solo aplica cuando se tiene el módulo de Activos fijos y/o el
módulo de Automatización de documentos.

---

# Acerca de ventana

## CATÁLOGO DE CUENTAS

##  Objetivo

Esta ventana tiene como finalidad la creación o modificación de la información
de una cuenta contable. Los datos a registrar se encuentran agrupados por
pestañas y por secciones, las cuales se activan o desactivan según los
requerimientos de la empresa.  
  

## Ejemplo de información a registrar

Los datos principales de una cuenta son: código y nombre.  
  

Ejemplo:

Código | Nombre  
---|---  
11050501 | Caja general Sede Principal  
11100501 | Banco Nacional  
11100502 | Banco del Estado  
11200501 | Banco de Colombia  
  
## Definición de conceptos

**¿Qué son las cuentas contables?**  
  
Las cuentas contables son un listado de códigos con un orden específico, los
cuales llevan un nombre y poseen una naturaleza contable definida. Estas
cuentas les permiten a los usuarios llevar sus registros contables de manera
ordenada. Las cuentas contables representan el valor de bienes, derechos y
obligaciones de los que disponen los usuarios.  
  

## Secciones

A continuación se describen las pestañas \(pasos\) y diferentes opciones para
configurar en la cuenta.  

## Sección general

Los atributos de las cuentas permiten definir usos que tendrán las cuentas
dentro del sistema, en las operaciones y en los diferentes informes contables.
Algunos atributos importantes de las cuentas son:  

  * Afectable directamente por el usuario
  * Disponible para presupuesto
  * Controla cartera y/o proveedores para informes
  * Manejo de moneda extranjera
  * Visible en selección
  * Disponible en operaciones de gastos/ingresos
  * Auto activar

## Sección datos requeridos

Se definen los datos que van a ser requeridos en la operación y los datos
adicionales que la operación podria tener. ALgunos datos requeridos en la
operación son:  

  * Exige centro de costos
  * Exige valor base
  * Exige activo/diferido
  * Maneja tercero
  * Exige referencia

---

# Cuenta

Código de la cuenta a crear.  
  
El código es la identificación de la cuenta en el catálogo de cuentas, en las
diferentes operaciones del sistema y en los exploradores, consultas y reportes
de manejo contable.  
  
Cuando se crea una nueva cuenta, esta por defecto hereda en su código el
código de la cuenta padre y a este código se le deben agregar 2 caracteres o
números adicionales.  
  

A continuación, se muestra una imagen con el formulario para crear una nueva
cuenta contable, heredando el código de la cuenta padre y añadiendo dos
caracteres adicionales.

![Formulario de creación de cuenta contable que muestra el código heredado de
la cuenta
padre.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Plan%20de%20Cuentas/%5B10990%5D%20FrmInputNewCuenta/imagen1.png)  
  
El código de la cuenta puede ser numérico o alfanumérico y admite hasta 30
caracteres.

Ejemplo

Código cuenta padre | Nombre de la cuenta padre | Código adicional para la cuenta | Código asignado a la cuenta | Nombre de la cuenta  
---|---|---|---|---  
111005 | Moneda nacional | 01 | 11100501 | Banco Nacional  
236801 | Impuesto de industria y comercio retenido \*\* 1 a la 98 \*\* | 05 | 23680105 | ICA Bogotá  
710101 | Materia prima \*\* 1 a la 98 \*\* | 10 | 71010110 | Materiales de empaque  
  
Observaciones

El código de la cuenta exige por defecto dos dígitos adicionales al código
heredado de la cuenta padre, pero se puede cambiar esta regla en el catálogo
de estructura del plan de cuentas.

Configuración

Para ingresar al catálogo de estructura de plan de cuentas, ver:**\[Pestaña
contabilidad > despliega la flecha hacia abajo del Ícono de Plan de cuentas >
Estructura del plan de cuentas\].**

---

# Aplica a informe de notas

Active esta opción si desea que la política sea visible en el informe de notas
a los estados financieros.

Ejemplo

El contador de la empresa MP Computadores define la política de manejo de los
inventarios, por considerarla una política tan importante y que ayuda a
comprender mejor los estados financieros, activa la opción de aplicar al
informe de notas a los estados financieros.

Observaciones

Lo ideal es que las políticas más relevantes de la empresa y que ayudan en la
comprensión de los estados financieros, sean marcadas para que apliquen al
informe de notas.

---

# Obsoleta

Active esta opción si desea marcar la política como obsoleta.  
Una política puede ser marcada como obsoleta cuando se presenten cambios en la
normatividad vigente o cuando la empresa genere una nueva política que permita
que la información que se presente sea más fiable y relevante.

Ejemplo

La empresa MP Computadores tenía a 31 de diciembre de 2016 la política de
inventarios "PI001", pero por disposición de las directivas de la compañía
deciden no manejar más los inventarios bajo esa política, por lo tanto,
generan la politíca PI002 \(la cual rige desde 1 de enero de 2017\) y marcan
como obsoleta la política PI001.

Observaciones

Al marcar una política como obsoleta el sistema conservará el historial que se
manejó con dicha política, el cual podría ser necesario al momento de hacer
auditorias o comparaciones en el tiempo.  
  
Al marcar una política contable como obsoleta, su implicación está
directamente relacionada con el informe de políticas contables y con el
informe de notas a los estados financieros, ya que ambos informes muestran las
políticas contables creadas en el sistema. Por ejemplo, el informe de
políticas contables permite establecer un filtro para ver solo las políticas
contables obsoletas. Por su parte, el informe de notas a los estados
financieros mostrará las políticas contables que se encuentren vigentes entre
las fechas de generación del mismo.

---

# A partir de

Fecha a partir de la cual la política queda como obsoleta, es decir, no estará
vigente en el sistema.

Ejemplo

La empresa MP Computadores cambia la política de inventarios a final del año
2017, por lo cual establece como fecha a partir de la cual estará obsoleta la
política anterior el día 31 de diciembre de 2017.

Observaciones

Definir la fecha desde la cual una política es marcada como obsoleta, permite
dejar una marca en el tiempo, para que al momento de realizar auditoría se
sepan las fechas entre las cuales aplicó determinada política.

---

# Descripción

Texto que describe la política con información sobre el objetivo de la misma.

Ejemplo

La empresa MP Computadores define como una de sus **políticas de inventarios**
, la siguiente:  
"Las existencias se registran al costo o a su valor neto de realización, el
que resulte menor. El costo se determina usando el método de promedio
ponderado. El valor neto de realización es el valor de uso estimado en el
curso normal de las operaciones."

Observaciones

Para establecer las políticas contables de la empresa, se debe tener en cuenta
la reglamentación vigente y su definición debe ser clara y precisa, sin dar
lugar a interpretaciones erróneas.

---

# Núm. autorización

Número con el cual se autorizó la adopción de la política contable en la
empresa.

Ejemplo

La empresa MP Computadores maneja internamente un formato para autorizar
procedimientos internos de la compañía, la autorización de la política de
inventarios PI001 quedó bajo el número: A-15751.

Observaciones

Este campo es opcional y depende de cada empresa su estándar de manejo, se
recomienda llevar un control de autorización de las políticas contables, para
que éstas sean usadas solo cuando hayan sido revisadas y aprobadas.

---

# Nombre

Nombre de la política contable de acuerdo con su finalidad y objeto.

Ejemplo

La empresa MP Computadores nombra una de sus políticas generales así:
**"Moneda funcional y moneda de presentación"** , con la cual pretende definir
la moneda bajo la que se realizará la presentación de los estados financieros.

Observaciones

Se recomienda que el nombre de la política sea claro, preciso y alusivo al
objetivo de la política.

---

# Rige desde

Fecha desde la cual se hace adopción de la política contable en la empresa.

Ejemplo

La empresa MP Computadores define su política de inventarios a final del año
2016 y establece que ésta rige desde enero 1 de 2017.

Observaciones

Esta fecha se utiliza para establecer filtros en el informe de políticas
contables, por ejemplo, es posible visualizar sólo las políticas que
estuvieron vigentes en un período de tiempo.

---

# Cuenta

Cuenta a la que aplica la política, esta cuenta sirve para agrupar o
clasificar las políticas en el informe de políticas contables.

Ejemplo

La empresa MP Computadores tiene varias políticas aplicables a Inventarios y
Activos, por lo tanto asocia la cuenta 14 a las políticas de inventarios y la
cuenta 15 a las políticas de activos.

Observaciones

Si no se indica una cuenta, la política será tomada como una política general
y no quedará ligada a ninguna cuenta.  
  
Para la generación del informe de políticas contables, es posible filtrar y
visualizar el informe por una determinada cuenta.

---

# Código política

Código que identifica a la política contable, el cual puede ser numérico o
alfanumérico y puede contener hasta 20 caracteres.

Ejemplo

La empresa MP Computadores define como estándar de codificación de sus
políticas, la combinación de letras y números, por ejemplo:  

  * Las políticas generales se identificarán como PG y seguido el consecutivo, así: **PG001**
  * Las políticas de inventarios se identificarán como PI y seguido el consecutivo, así: **PI001**

Observaciones

La empresa puede definir libremente el esquema de codificación de las
políticas contables, pero se recomienda manejar letras y números que permitan
identificar el tipo de política y su respectivo consecutivo.

---

# Empresa

Código y nombre de la empresa en la cual se está trabajando.

Ejemplo

Se está trabajando en la empresa DEMO COMPUTADORES LTDA, que tiene el código
1; por tanto se verá de la siguiente manera:

Observaciones

Este campo no es editable; el sistema toma por defecto la empresa en la que se
está trabajando.

---

# Centro de costos

Código y nombre del centro de costos al cual se le va a registrar el
presupuesto.

Ejemplo

El usuario desea realizar un presupuesto específico para el centro de costos
"Departamento administrativo" que tiene el código 120; por tanto se debe
seleccionar propiamente ese centro de costos:

A continuación, se muestra una imagen donde se selecciona un centro de costos
específico para asociar el presupuesto, en este caso, el Departamento
administrativo.

![Selección del centro de costos 'Departamento administrativo' con código 120
para registrar el
presupuesto.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12180%5D%20FrmGetFAnioPpto/c.c.jpg)  
  

Observaciones

Un presupuesto se puede realizar por toda la empresa o propiamente por un
centro de costos específico.  
  
Este campo es editable; el usuario puede seleccionar el centro de costos que
requiera, desde el catálogo correspondiente.

---

# Año a presupuestar

Año sobre el cual se va a realizar el presupuesto en el sistema

Ejemplo

El usuario desea realizar un presupuesto del año 2019, por tanto este año es
el que se debe indicar en el campo:  

A continuación, se muestra una imagen con el campo donde se debe indicar el
año para el cual se realiza el presupuesto, como en este ejemplo para el año
2019.

![Campo para ingresar el año a presupuestar, en este caso se indica
2019.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12180%5D%20FrmGetFAnioPpto/ano.jpg)  

Observaciones

En un año solamente se puede realizar un presupuesto.

---

# Abril

Presupuesto para el mes de Abril.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de abril el
ingreso por este concepto es de $5.500.000.  
![abril.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/abril.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Empresa

Código y nombre de la empresa en la cual se está trabajando.

Ejemplo

Se está trabajando en la empresa DEMO COMPUTADORES LTDA, que tiene el código
1; por tanto se verá de la siguiente manera:  

Observaciones

Este campo no es editable; el sistema toma por defecto la empresa en la que se
está trabajando.

---

# Mayo

Presupuesto para el mes de Mayo.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de mayo el
ingreso por este concepto es de $5.700.000.  
![mayo.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/mayo.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Junio

Presupuesto para el mes de Junio.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de junio el
ingreso por este concepto es de $6.000.000.  
![junio.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/junio.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Julio

Presupuesto para el mes de Julio.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de julio el
ingreso por este concepto es de $6.500.000.  
![julio.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/julio.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Agosto

Presupuesto para el mes de Agosto.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de agosto
el ingreso por este concepto es de $6.600.000.  
![agosto.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/agosto.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Septiembre

Presupuesto para el mes de Septiembre.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de
septiembre el ingreso por este concepto es de $6.800.000.  
![septiembre.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/septiembre.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Octubre

Presupuesto para el mes de Octubre.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de octubre
el ingreso por este concepto es de $7.000.000.  
![octubre.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/octubre.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Noviembre

Presupuesto para el mes de Noviembre.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de
noviembre el ingreso por este concepto es de $6.500.000.  
![noviembre.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/noviembre.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Diciembre

Presupuesto para el mes de Diciembre.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de
diciembre el ingreso por este concepto es de $4.500.000.  
![diciembre.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/diciembre.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Total año

Valor total presupuestado para el año.

Ejemplo

Para el año 2019, la empresa MP Computadores realiza un presupuesto mensual de
$7.500.000, por tanto, transcurridos los 12 meses del año, el sistema en esta
casilla asigna el valor total, que en este caso sería: $90.000.000  

Observaciones

El valor registrado en esta columna, el sistema lo carga de forma automática.

---

# Cargar cuentas

Carga al presupuesto todas las cuentas auxiliares que son hijas de la cuenta
seleccionada.

Ejemplo

La empresa MP Computadores, requiere realizar un presupuesto de las cuentas de
gasto de viaje, hijas de la cuenta 5255; por tanto, al seleccionar el botón
"Cargar cuentas"  
se abre el catálogo de cuentas y basta con seleccionar simplemente la cuenta
principal, en este caso, la cuenta 5255. De esta forma cargarán todas las
cuentas hijas.  
![cargarcuentas.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/cargarcuentas.jpg)  

Observaciones

Utilizar este botón, evita que cuando se deba cargar todas las cuentas de un
mismo grupo, se tenga que selccionar una a una del catálogo de plan de
cuentas.

---

# Año

Año sobre el cual se va a realizar el presupuesto en el sistema

Ejemplo

El usuario desea realizar un presupuesto del año 2019, por tanto en el editor
de presupuesto ya indicó dicho año. En esta ventana registra de la siguiente
manera:  
![ano.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/ano.jpg)  

Observaciones

Este campo es solo informativo y no se puede modificar desde el registro de
presupuesto.

---

# Importar presupuesto

Permite importar el presupuesto de otro año, de otro centro de costos o de
otra empresa y cargarlo en el que se está generando.  
Se debe especificar los datos de origen de la información a importar y la
forma en la cual se va a generar el nuevo presupuesto.

Ejemplo

La empresa MP Computadores registró en el sistema el presupuesto del año 2018
y requiere generar ese mismo presupuesto para la empresa en el año 2019; para
ello, utiliza la opción de "Importar Presupuesto" y el sistema arrastra el
presupuesto del año 2018.  

Observaciones

El presupuesto a importar se puede incrementar o decrementar en algún
porcentaje, tendiendo en cuenta que el 100% es dejar el presupuesto igual al
que se desea importar.

---

# Importar la ejecución presupuestal

Permite importar la ejecución presupuestal de otro año, de otro centro de
costos o de otra empresa.  

Ejemplo

La empresa MP Computadores registró en el sistema el presupuesto del año 2018
y lo ejecutó durante mes a mes. Requiere generar el presupuesto del 2019
basandose en lo que ejecutó durante el año anterior; para ello, utiliza la
opción de "Importar la ejecución presupuestal" y el sistema arrastra lo
ejecutado en el año 2018.

Observaciones

La ejecución presupuestal a importar se puede incrementar o decrementar en
algún porcentaje, tendiendo en cuenta que el 100% es dejar el presupuesto
igual al que se desea importar.

---

# Distribuir valor

Distribuye un valor entre las celdas seleccionadas.  
Este botón permite dividir un valor en la misma proporción para varias celdas.

Ejemplo

La empresa MP Computadores realiza un presupuesto para la cuenta 510572 y
desea distribuir $200.000 entre los meses de enero, febrero y marzo.  
Se deben seleccionar las celdas y dar clic en distribuir valor, el sistema
solicita que se indique cual es el valor a distribuir, luego de indicado  
el valor y al dar clic en ok, los valores cambian para cada uno de los meses,
quedando cada uno con un valor de $66.666.  
![distribuir.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/distribuir.jpg)  

Observaciones

Seleccione el rango de celdas \(meses y/o cuentas\), luego de clic en
"Distribuir valor" e indique el valor a distribuir.

---

# Ordenar

Ordenar el presupuesto ascendentemente por el código de la cuenta.  

Ejemplo

La empresa MP Computadores registra en el sistema el presupuesto del año 2018
y al finalizar, se da cuenta que las cuentas no quedaron  
en órden, pues primero aparecen las cuentas de gastos y después las de
ingresos; por tanto, basta con dar clic en el botón "Ordenar"  
y el sistema automáticamente las ordenará en forma ascendente dependiendo del
código.

---

# Centro de costos

Código y nombre del centro de costos al cual se le va a registrar el
presupuesto.

Ejemplo

El usuario desea realizar un presupuesto específico para el centro de costos
"Departamento administrativo" que tiene el código 120; por tanto lo indicó en
el editor de presupuesto. En esta ventana solo queda el centro de costos de
manera informativa de la siguiente manera:  
![centrocostos.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/centrocostos.jpg)  

Observaciones

Un presupuesto se puede realizar por toda la empresa o propiamente por un
centro de costos específico.

---

# Area

Área del centro de costos, que se utiliza cuando el centro de costos es de un
lote o un cultivo.

Ejemplo

En el sistema ContaPyme, normalmente no se indica área; pero por defecto, este
campo trae el dato de: 1,00 m2  
![area.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/area.jpg)  

Observaciones

Los lotes o cultivos se crean en el sistema AgrWin, por tanto en ContaPyme
solo es un dato informativo.

---

# Cuenta

Código de la cuenta que se va a presupuestar

Ejemplo

El usuario desea presupuestar sus ingresos del año 2019; por ejemplo la
cuenta: **413554** de venta de equipos de computo.  
![cuenta.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/cuenta.jpg)  

Observaciones

La cuenta puede ser digitada directamente en la celda o seleccionarse usando
la ventana de selección del plan de cuentas.

---

# Enero

Presupuesto para el mes de enero.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de enero el
ingreso por este concepto es menor a los meses posteriores; por ello,
presupuesta el ingreso de enero en $2.500.000.  
![enero.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/enero.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Febrero

Presupuesto para el mes de Febrero.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de febrero
el ingreso por este concepto es de $4.000.000.  
![febrero.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/febrero.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Marzo

Presupuesto para el mes de Marzo.  
  
Hay distintos periodos de tiempo para los que se puede hacer un presupuesto.
Normalmente, se hacen con una base anual, semestral o trimestral; es decir,
con un plan para los próximos 3 o 6 meses o para el próximo año, aunque
algunas empresas prefieren hacer un presupuesto continuo.

Ejemplo

La empresa MP Computadores, realiza un presupuesto para el año 2019 de la
cuenta de ingresos 413554, de venta de maquinaria, equipo de oficina y
programas de computador.  
El presupuesto lo realiza al año por $66.600.000, distribuidos de forma
continua, mes por mes; por tanto, la empresa calcula que en el mes de febrero
el ingreso por este concepto es de $4.000.000.  
![febrero.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Cats/Presupuesto/%5B12200%5D%20FrmPpto/febrero.jpg)  

Observaciones

El sistema \[ContaPyme\] permite manejar presupuesto mensual, trimestral,
semestral, anual; según el manejo que requiera la empresa que va a realizar el
presupuesto.

---

# Num. documento

Numero de documento de la operación desde la cual se creo la revelación.

Ejemplo

El contador de la empresa MP Computadores registró una revelación desde una
operación de movimiento contable, cuyo número de documento era "NT-0000152".

---

# Descripción

Texto que describe la nota o revelación con información sobre el objetivo de
la misma.

Ejemplo

La empresa MP Computadores registra una revelación relacionada con **reservas
legales** , el texto de esta revelación es el siguiente:  
"De acuerdo con la ley comercial colombiana, 10% de la ganancia neta de cada
año debe apropiarse como reserva legal, hasta que el saldo de esta sea
equivalente por lo menos a 50% del capital suscrito. De acuerdo con los
estatutos, la Compañía lleva su reserva legal hasta 100% del capital
suscrito".

Observaciones

La empresa puede definir libremente las notas o revelaciones de acuerdo con
sus necesidades, con el fin de complementar y ayudar a los usuarios a entender
las cifras registradas en los diferentes estados financieros.

---

# Nombre

Nombre de la nota o revelación de acuerdo con su finalidad y objeto.

Ejemplo

La empresa MP Computadores nombra una de sus revelaciones así: **"Cambio en el
método de valoración de inventarios"** , con la cual pretende aclarar el
motivo de la adopción de un nuevo método de valoración de los inventarios.

Observaciones

Se recomienda que el nombre de la nota o revelación sea claro, preciso y
alusivo al objetivo de la misma.

---

# Fecha

Fecha en la que se registra la nota o revelación.

Ejemplo

El día 15 de diciembre de 2016 la empresa MP Computadores encontró que debía
aclarar por medio de una nota a sus estados financieros, la reclasificación de
un activo, el cual se encontraba en el grupo de propiedad, planta y equipo y
se cambió al grupo NIIF propiedades de inversión; en este campo de fecha se
debe indicar 15/12/2018.

Observaciones

Esta fecha se utiliza para establecer filtros en el informe de notas a los
estados financieros, por ejemplo, es posible visualizar sólo las revelaciones
que se hayan realizado durante un año en particular.

---

# Aplica a informe de notas

Active esta opción si desea que la revelación sea visible en el informe de
notas a los estados financieros.

Ejemplo

El contador de la empresa MP Computadores registra una revelación sobre la
cuenta 150210 Propiedades de inversión, relacionada con la reclasificación de
un activo; por considerarla una relevación tan importante y que ayuda a
comprender mejor los estados financieros, activa la opción de aplicar al
informe de notas a los estados financieros.

Observaciones

Se recomienda que todas las revelaciones que son relevantes y que ayuden en la
comprensión de los estados financieros, sean marcadas para que apliquen al
informe de notas, de esta manera se podrá ver claramente en el informe qué
revelaciones se han hecho sobre cada cuenta.

---

# Cuenta

Cuenta a la que aplica la nota o revelación.

Ejemplo

El contador de la empresa MP Computadores requiere registrar una revelación
relacionada con la corrección de un error en la depreciación del periodo
anterior, para ello selecciona la **cuenta de depreciaciones:** 159235.

Observaciones

Este campo es obligatorio, pues toda nota o revelación debe estar asociada a
una cuenta en particular.

---

# Tabla de pagos

Código de la tabla de pagos y con el cual será reconocido al momento de ser
usado.

Ejemplo

\[ContaPyme\] cuenta con un catálogo de tablas de fechas pagos
preconfiguradas, entre ellas:  Tabla de pago  
---  
CESANTIAS  
INTCESANTIAS  
IVA  
RETENCION  
  
Observaciones

  

El catálogo de tablas de fechas de pago ya cuenta unas definidas por defecto,
el usuario deberá validar su configuración.  
  
Si lo requiere, el usuario puede crear tantas tablas de fechas de pagos como
necesite.  
  
El código para la tabla de pagos puede ser numérico o alfanumérico y admite
hasta 20 caracteres.

---

# Requiere que se especifique el año

Se activa esta casilla cuando el periodo de pago para la tabla de pagos varia
cada año, se requiere \[día/mes/año\].

Ejemplo

En la tabla de fechas de pagos CESANTIAS esta opción se deja desactivada, pues
los periodos de pago no varian con los años.

Observaciones

Si esta casilla se activa, se requiere definir en la tabla de fechas de pago
\[día/mes/año\].  
  
Si el periodo de pago que está definiendo, no varia con los años solo se
requiere \[día/mes\], esta casilla no se activa.

---

# Fecha inicial

Fecha en la cual inicia el periodo de pago para la tabla de pagos.  

Ejemplo

Dependiendo de como se va a usar la tabla de fechas de pago, esta puede tener solo una fecha de inicio o varias:  Tabla de pago | Fecha inicial  
---|---  
CESANTIAS | 1/1  
INTCESANTIAS | 1/1  
  
Tabla de pago | Fecha de pago 1 | Fecha de pago 2 | Fecha de pago 3  
---|---|---|---  
IVA | 1/1 | 1/3 | 1/5  
RETENCION | 1/1 | 1/2 | 1/3  
  
Observaciones

Si la tabla de fechas de pago tiene activa la casilla "Requiere que se
especifique el año", se debe de indicar le fecha completa \[dia/mes/año\], de
lo contrario solo se debe especificar \[día/mes\].

---

# Fecha final

Fecha en la cual finaliza el periodo de pago para la tabla de pagos.

Ejemplo

Dependiendo de como se va a usar la tabla de fechas de pago, esta puede tener solo una fecha final o varias:  Tabla de pago | Fecha final  
---|---  
CESANTIAS | 31/12  
INTCESANTIAS | 31/12  
  
Tabla de pago | Fecha de pago 1 | Fecha de pago 2 | Fecha de pago 3  
---|---|---|---  
IVA | 28/2 | 30/4 | 30/6  
RETENCION | 31/1 | 28/2 | 31/3  
  
Observaciones

Si la tabla de fechas de pago tiene activa la casilla "Requiere que se
especifique el año", se debe de indicar le fecha completa \[dia/mes/año\], de
lo contrario solo se debe especificar \[día/mes\].

---

# Requiere que se especifique el año

Se activa esta casilla cuando la fecha de pago para la tabla de pagos varia
cada año.

Ejemplo

En la tabla de fechas de pagos CESANTIAS esta opción se deja desactivada, pues
los periodos de pago no varian con los años.

Observaciones

Si esta casilla se activa, se requiere definir en la tabla de fechas de pago
\[día/mes/año\].  
  
Si el periodo de pago que está definiendo, no varia con los años solo se
requiere \[día/mes\], esta casilla no se activa.

---

# Fecha de pago

Fecha en la cual se estimada para realizar el pago del concepto.

Ejemplo

Dependiendo de como se va a usar la tabla de fechas de pago, esta puede tener solo una fecha de inicio o varias:  Tabla de pago | Fecha inicial | Fecha final | Fecha de pago  
---|---|---|---  
CESANTIAS | 1/1 | 31/12 | 14/2  
INTCESANTIAS | 1/1 | 31/12 | 31/1  
  
Tabla de pago | Fecha de pago 1 | Fecha de pago 2 | Fecha de pago 3  
---|---|---|---  
IVA | 1/1 | 1/3 | 1/5  
RETENCION | 1/1 | 1/2 | 1/3  
  
Observaciones

Si la tabla de fechas de pago tiene activa la casilla "Requiere que se
especifique el año", se debe de indicar le fecha completa \[dia/mes/año\], de
lo contrario solo se debe especificar \[día/mes\].

---

# Precisión de decimales en precio de compra/costo embodegamiento

Al registrar el precio de un producto en la operación de compras o el costo de
entrada en la operación de embodegamiento, el sistema redondeará el valor al
número de digistos definidos en esta configuración. En caso de que se ingrese
una cifra con una cantidad mayor de decimales a los configurados, se realizará
una aproximación matemática.  
  

Ejemplo de aproximación matemática

Precisión decimal | Cantidad indicada | Aproximación realizada  
---|---|---  
2 | 5,758 | 5,76  
3 | 12,251 | 12,251  
  
Observaciones

Existen otras configuraciones específicas que en determinadas partes del
sistema toman relevancia sobre la configuración general de decimales:

  * En la configuración general del sistema, se puede realizar la configuración general de decimales para valores monetarios, ver:[ Ayuda Manejo general de decimales](<..\\..\\..\\..\\010 BS\\Cfgs\\Cats\\\[16380\]FrmConfigUsr\\\[99\]LblMasInfoDecimales.html>)
  * En la configuración del plan de cuentas, se puede configurar la precisión de decimales para realizar los cálculos de liquidación de un ingreso o egreso \(IVA, retenciones u otros\), ver:[ Ayuda Precisión de decimales para el cálculo del IVA y retención ](<..\\..\\..\\..\\020 CN\\Cfgs\\Cats\\\[10940\]FrmConfigPlanCuentas\\\[99\]LblMasInfoDecimalesLiquid.html>)
  * En el asistente de creación o modificación de bodegas se puede definir la precisión de decimales que se puede indicar al momento de registrar la cantidad de elementos que ingresa o egresa de la bodega, ver:[ Ayuda Precisión de decimales en el manejo de inventario ](<..\\..\\..\\..\\080 IN\\Cats\\Bodegas\\\[12970\] FrmInventario\\\[70\]LblQPrecision.html>)  

  * En la configuración del catálogo de elementos de inventario, se pueden realizar dos configuraciones respecto a la definición de decimales, la precisión de decimales para redondear las cantidades de los elementos compuestos, la precisión de decimales configurada por el usuario para el costo de elementos en inventario y el precio de venta, ver:[ Ayuda Precisión de decimales en elementos de inventario compuesto ](<..\\..\\..\\..\\080 IN\\Cfgs\\Cats\\\[12520\]FrmConfigElementosControl\\\[97\]LblMasInfoDecimalesCompuestos.html>) Véase también [ Ayuda Precisión de decimales en precio de compra/costo embodegamiento ](<..\\..\\..\\..\\080 IN\\Cfgs\\Cats\\\[12520\]FrmConfigElementosControl\\\[99\]LblMasInfoDecimalesCosto.html>)  

  * En la configuración de la operación acciones automáticas de cierre de fin de mes, se puede configurar la precisión de decimales para el cálculo de ajustes por inflación, ver:[ Ayuda precisión de decimales para los ajustes por inflación ](<..\\..\\..\\..\\010 BS\\Cfgs\\Oprs\\\[13470\]FrmConfigOprCIE1\\\[99\]LblMasInfoDecimalesAjxInf.html>) Esta configuración estará disponible solo si está activa la opción "La economía del país es altamente inflacionaria", ver \[Cinta de opciones > Menú principal \(botón redondo\) > Configuración > Tipo de contabilización\]

  

Configuración

Para configurar la precisión del precio de compra/costo embodegamiento,
ver:**\[Pestaña inventarios > Elementos de inventario > Precisión del precio
de compra/costo embodegamiento\]**.

---

# Datos para ajustes por inflación

Información con la que el sistema realizará los ajustes por inflación.  
  
Entre los datos necesarios para aplicar los ajustes por inflación, el sistema
solicita que se indique el Porcentaje de ajuste de año gravable PAAG y el
centro de costos a imputar.

---

# Año

Año de aplicación de los ajustes por inflación.

Observaciones

El año es un campo de solo lectura y el sistema lo toma de la fecha de soporte
de la operación.

---

# Mes

Mes de aplicación de los ajustes por inflación.

Observaciones

El mes es un campo de solo lectura y el sistema lo toma de la fecha de soporte
de la operación, indicando el mes siguiente al mes de soporte si la fecha de
soporte es igual o superior al día 16 del mes.

---

# Inflación \(% PAAG mes siguiente\)

Porcentaje de Ajustes del Año Gravable con el que se realizarán los ajustes
por inflación.  
  
El PAAG mensual es el porcentaje de ajuste del mes, el cual será equivalente a
la variación porcentual del IPC de ingresos medios, registrado en el mes
inmediatamente anterior y el mes objeto del ajuste.

Ejemplo

Tabla de porcentaje mensual de PAAG para el año gravable 2007.  

Año-mes | Porcentaje IPC mes | Aplica mes | Porcentaje PAAG mensual  
---|---|---|---  
Diciembre 2006 | 0,21 | Enero 2007 | 0,21  
Enero 2007 | 0,80 | Febrero 2007 | 0,80  
Febrero 2007 | 1,27 | Marzo 2007 | 1,27  
Marzo 2007 | 1,16 | Abril 2007 | 1,16  
Abril 2007 | 0,88 | Mayo 2007 | 0,88  
  

Observaciones

El porcentaje PAAG mensual es un dato obligatorio para poder aplicar los
ajustes por inflación.

---

# Centro de costos para imputar Aj. x Inf.

Centro de costos al cual se imputarán los ajustes por inflación.

Observaciones

El centro de costos es un dato obligatorio para poder aplicar los ajustes por
inflación.

---

# Traslado valores entre centros de costos

En este paso puede definir el listado de centros de costos, cuentas, tipo de
saldo y porcentaje a trasladar de un listado de centros de costos a otros.
Este proceso se llevará a cabo una vez procesada la operación.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. Estos saldos se deden trasladar de acuerdo a un porcentaje, donde
el 70% del valor para la sede principal y el 30% para la sede del Cable. Con
esta información, se deben cargar los datos de la siguiente manera:  

Centro de costos fuente | Cuenta inicial | Cuenta final | Qué saldo? | Porcentaje a trasladar | Centro de costos destino | Cuenta destino | Observación  
---|---|---|---|---|---|---|---  
GG - Gastos generales | 511010 Honorarios | 511010 Honorarios | Movimiento mes \(Débitos - Créditos\) | 70% | 11GG Gastos Sede Principal |  | Gastos correspondientes a revisoría fiscal, 70%  
GG - Gastos generales | 511010 Honorarios | 511010 Honorarios | Movimiento mes \(Débitos - Créditos\) | 100% | 21GG Gastos Sede Cable |  | Gastos correspondientes a revisoría fiscal, 30%  
  

Observaciones

Este paso solo se activa si está activada la opción "Traslados entre CCs".  
  
Este paso permite definir manualmente los traslados entre centros de costos.
Si cuenta con el módulo de costos de producción podrá programar centros de
costos para distribuciones automáticas.

---

# Centro de costos fuente

Centro de costos desde el cual se trasladarán los saldos contables.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. En este caso, el centro de costos fuente sería el de Gastos
generales de la empresa.

---

# Cuenta inicial

Cuenta inicial desde la cual se trasladarán los saldos contables desde el
centro de costos fuente.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. En este caso, la cuenta inicial sería la 511010 de Revisoría
fiscal.  

Observaciones

Si la cuenta inicial se deja vacía, se trasladarán los saldos de todas las
cuentas del centro de costos fuente.

---

# Cuenta final

Cuenta final hasta la cual se trasladarán los saldos contables desde el centro
de costos fuente.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. En este caso, la cuenta final sería la 511010 de Revisoría fiscal.  

Observaciones

Si la cuenta final se deja vacía, se trasladarán los saldos de todas las
cuentas del centro de costos fuente.

---

# ¿Qué saldo?

Tipo de saldo que se trasladará para las cuentas seleccionadas desde el centro
de costos fuente al centro de costos destino.  
  
Se puede seleccionar el tipo de saldo entre las siguientes dos opciones:  

  * **Movimientos desde la última distribución:** Toma los saldos \(débitos menos créditos\) de las cuentas indicadas para el centro de costos fuente, acumulados desde la última distribución que se haya realizado.
  * **Movimiento mes \(Débitos - Créditos\)** Toma los saldos \(débitos menos créditos\) de las cuentas indicadas para el centro de costos fuente, acumuladas en el mes en curso.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. En este caso, el tipo de saldo a seleccionar sería Movimiento mes,
ya que solo se mencionan los valores del mes de enero de 2018.  

Observaciones

Si selecciona la opción "Movimientos desde la última distribución" y nunca se
ha realizado una distribución, se tomarán los valores imputados al centro de
costos desde el inicio de los tiempos.

---

# Porcentaje a trasladar

Porcentaje del saldo que se trasladará para las cuentas seleccionadas desde el
centro de costos fuente al centro de costos destino.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. Estos saldos se deden trasladar de acuerdo a un porcentaje, donde
el 70% del valor para la sede principal y el 30% para la sede del Cable. En
este caso, el porcentaje a trasladar para el primer centro de costos destino
es del 70% y para el segundo centro de costos destino debe ser del 100%. Esto
debido a que al realizarse la primera distribución se tomaría el 70% del saldo
inicial y el saldo restante sería el 30% de ese saldo inicial. En esta caso,
se debe trasladar el 100% del valor restante después del primer traslado.  

Saldo inicial | Porcentaje a trasladar | Valor a trasladar | Saldo final  
---|---|---|---  
1.000.000 | 70% | 700.000 | 300.000  
300.000 | 100% | 300.000 | 0  
  

Observaciones

Por cada renglón que se configure, se debe indicar el porcentaje del saldo que
se trasladará. El último renglón siempre tendrá que llevar como porcentaje el
100% para garantizar que todo el saldo sea trasladado.

---

# Centro de costos destino

Centro de costos hacia el cual se trasladarán los saldos contables.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. En este caso, los centros de costos destino sería los centros de
costos de gastos de cada una de sus sedes.

---

# Cuenta destino

Cuenta sobre la cual se acumularán los saldos trasladados desde la cuenta
fuente.  
  
La cuenta destino se usa cuando es necesario que los saldos a trasladar al
centro de costos destino, afecten una cuenta diferente a la cuenta fuente.
Normalmente al realizarse el traslado, el saldo de la cuenta fuente es
cancelado sobre el centro de costos fuente y luego es imputado nuevamente
sobre la misma cuenta pero para el centro de costos destino. En este caso, la
cuenta destino reemplazará a la cuenta fuente en el centro de costos destino.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. Pero necesita que al trasladarse dicho saldo, este quede reconocido
en la cuenta 521010 de Revisoría fiscal en Gastos operacionles de ventsa. En
este caso, la cuenta destino sería la cuenta 521010 de Revisoría fiscal de
gastos operacionales de ventas.  

Observaciones

Si la cuenta destino se deja vacía, el saldo se trasladará sobre la misma
cuenta fuente al centro de costos destino.

---

# Observación

Observación relacionada con el traslado.

Ejemplo

La empresa CMB Muebles y Hogar necesita pasar los saldos contables del mes de
enero de 2018 de la cuenta 511010 de Revisoría fiscal imputados al centro de
costos de Gastos generales, a los centros de costos de gastos de cada una de
sus sedes. Estos saldos se deden trasladar de acuerdo a un porcentaje, donde
el 70% del valor para la sede principal y el 30% para la sede del Cable. En
este caso, en cada renglón la observación sería el porcentaje del valor que se
trasladará a cada centro de costos.

---

# Centro de costos a imputar dif. en cambio

Código del centro de costos al cual se imputarán las contrapartidas por los
ajustes de diferencias en cambio de moneda extranjera.  

Observaciones

El centro de costos es un dato obligatorio para poder aplicar los ajustes por
diferencia en cambio.  
  
Este campo solo se activa si en la operación se activa la casilla de "Ajustes
por diferencia en cambio".

---

# Causación de intereses

La causación de los intereses tiene como finalidad que los ingresos por
intereses sean registrados en la contabilidad en el periodo al que realmente
corresponden dichos ingresos.  

Ejemplo:

La empresa le presta al señor Juan López un monto de $500.000 a 3 cuotas
mensuales con un interés del 1% el día 15 de Junio de 2018.  
El señor Julio ya ha pagado una cuota y la próxima es para el día 15 de agosto
de 2018.  
  
Como podemos visualizar la segunda cuota comprende las fechas del 16 de julio
2018 hasta 15 de agosto 2018 por lo tanto una parte de los intereses hacen
parte del mes de Julio y otra parte del mes de Agosto.  
  
  
  
|
![AD_CX_8.png](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/030%20CX/AD_CX_8.png)  
---|---  
  
Para que nuestros informes de estados financieros estén correctamente, el día
31 de julio de 2018 se debe realizar la causación de los intereses
correspondientes a dicho mes así no se haya pagado la deuda, con el fin de que
los ingresos por intereses queden correctamente registrados en el mes en que
realmente se obtuvo el ingreso.  
  
Observaciones

Esta opción solo se podrá visualizar si en la empresa está habilitado el
manejo de intereses.

---

# Depreciaciones y amortizaciones/Diferidos

Active esta casilla para que el sistema realice de forma automática y al
procesar esta operación, las depreciaciones y amortizaciones de activos fijos
y diferidos bajo la contabilización local.  
  
Para calcular la depreciación/amortización en contabilización local el sistema
tomará el valor en libros del activo fijo y lo dividirá entre la vida útil
restante a la fecha del registro. El valor resultante será el asiento de
depreciación/amortización.  
  
Los asientos contables de la depreciación y amortización se generan de forma
automática y las cuentas utilizadas se configuran por cada grupo de activos y
cada activo fijo que se maneje.

Ejemplo

La empresa CMB Muebles y Hogar adquirió un activo fijo el día 10 de enero de
2018, por valor de $ 1.800.000. Dicho activo fijo pertenece al rubro de
"Equipos de cómputo y comunicación" y cuenta con una vida útil total de 36
meses contados a partir de la fecha de compra. Al día 31 de enero de 2018 se
registrará la depreciación respectiva de este activo.

Tipo de activo fijo | Equipo de cómputo y comunicación  
---|---  
Fecha de compra | 10/1/2018  
Valor de compra | $ 1.800.000  
Vida útil total | 36 meses  
  
  
La depreciación para el mes de enero se calcula de la siguiente forma:  
  
Valor en libros del activo | Vida útil restante | Operación | Resultado  
---|---|---|---  
$ 1.800.000 | 36 meses | 1.800.000/36 | $ 50.000  
  
El asiento contable de la depreciación sería el siguiente:

Código cuenta | Nombre cuenta | Débito | Crédito  
---|---|---|---  
159220 | Depreciación acumulada equipos de cómputo y comunicación |  | $ 50.000  
516020 | Depreciaciones equipos de cómputo y comunicación | $ 50.0000 |   
  

Observaciones

Esta opción solo es visible cuando se tiene el módulo de activos fijos o el
módulo de automatización de documentos.  
  
El sistema solo aplicará depreciación y/o amortización a aquellos activos
fijos que lleven por lo menos 15 días de haberse creado y contabilizado en el
sistema.  
  
El sistema aplica la depreciación por periodos de un mes, sin importar si al
día de la depreciación ya ha pasado un mes completo o solo una fracción,
siempre y cuando hayan pasado al menos 15 días desde el ingreso o compra del
activo fijo. Esta nota aplica para los activos fijos que manejan el método de
depreciación lineal.  
  
La depreciación en contabilización local se debe realizar cada mes ya que los
periodos no son acumulativos y si se salta algún mes, este no se acumulará
para la siguiente depreciación.  
  
El sistema solo depreciará y/o amortizará aquellos activos que se encuentren
marcados para depreciar, que tengan vida útil y que tengan valor en libros.  
  
Los asientos contables producto de las depreciaciones y/o amortizaciones
quedarán contabilizados a la fecha de soporte de la operación.  
  
Las depreciaciones/amortizaciones en contabilización local y NIIF se realizan
de forma separada ya que la normatividad local exige que cada mes se asiente
la depreciación de los activos fijos y la normatividad NIIF permite realizar
estos asientos por periodos diferentes a un mes, por ejemplo cada 15 días o
una vez al año.

Configuración

Para ingresar al catálogo de grupos de activos, ver:**\[Pestaña adicionales >
Botón Grupos de activos\]**  
Para ingresar al catálogo de activos fijos, ver:**\[Pestaña adicionales >
Botón Activos fijos\]**

---

# Ajustes por diferencia en cambio

Active esta casilla para que el sistema realice de forma automática y al
procesar esta operación, los ajustes por diferencia en cambio.  
  
Para calcular los ajustes por diferencia en cambio el sistema toma el valor
total de la cuenta en moneda extranjera y lo multiplica por la última tasa de
cambio registrada, este valor se compara con el valor actual en moneda local.
La diferencia entre ambos valores se convierte en los ajustes por diferencia
en cambio y dependiendo de la naturaleza de la cuenta, se contabilizarán cómo
pérdida o ingreso. Si la cuenta es de naturaleza débito y el nuevo valor es
mayor, la diferencia se llevará como un ingreso. Si la cuenta es de naturaleza
crédito y el nuevo valor es menor, la diferencia se llevará como ingreso.  
  
Los asientos contables de los ajustes por diferencia en cambio se generan de
forma automática y las cuentas utilizadas se configuran por cada moneda
extranjera que se maneje.

Ejemplo

La empresa CMB Muebles y Hogar tiene registrada una cuenta por cobrar por U$
2.000, al 1 de enero de 2018. La tasa de cambio a dicha fecha es de $2.800. Al
31 de enero de 2018 se realizan los ajustes por diferencia en cambio con una
tasa de cambio de $2.900.  
  
Código cuenta | 13051001  
---|---  
Nombre de la cuenta | Deudores del exterior  
Valor en dólares 1/1/2018 | U$ 2.000  
TRM al 1/1/2018 | $ 2.800  
Valor en pesos 1/1/2018 | $ 5.600.000  
TRM al 31/1/2018 | $ 2.900  
  
  
Los ajustes por diferencia en cambio para el mes de enero se calculan de la
siguiente forma:  
Valor actual en dólares | TRM al 31/1/2018 | Operación | Resultado | Valor actual en pesos | Operación | Resultado  
---|---|---|---|---|---|---  
U$ 2.000 | $ 2.900 | 2.000 \* 2.900 | $ 5.800.000 | $ 5.600.000 | 5.800.000 - 5.600.000 | $ 200.000  
  
  
El asiento contable de los ajustes por diferencia en cambio sería el
siguiente:

Código cuenta | Nombre cuenta | Débito | Crédito  
---|---|---|---  
13051001 | Deudores del exterior | $ 200.000 |   
421020 | Diferencia en cambio |  | $ 200.000  
  

Observaciones

Esta opción solo es visible cuando se tiene habilitado el manejo de moneda
extranjera.  
  
Los ajustes por diferencia en cambio se realizan con la última tasa de cambio
registrada a la fecha. Esta tasa puede ser obligatoria para registrarse cada
día o puede registrarse una sola tasa de cambio en todo el periodo.  
  
El sistema realiza los ajustes por diferencia en cambio por cuenta, por centro
de costos, por referencia, por tercero, por tipo de movimiento bancario y por
tipo de flujo de efectivo.  
  
Los ajustes por diferencia en cambio se realizan para todas las monedas
extranjeras utilizadas.  
  
El sistema solo ajustará los saldos de las cuentas que estén marcadas para
manejo de moneda extranjera.

Configuración

Para activar el manejo de moneda extranjera, ver: **\[Catálogo de plan de
cuentas < Configuración < Configuraciones generales\]**  
Para ingresar al catálogo de monedas, ver:**\[Pestaña contabilidad > despliega
la flecha hacia abajo del Ícono de Plan de cuentas > Monedas\]**

---

# Depreciaciones y amortizaciones/Diferidos \(NIIF\)

Active esta casilla para que el sistema realice de forma automática y al
procesar esta operación, las depreciaciones y amortizaciones de activos fijos
y diferidos bajo la contabilización NIIF  
  
Para calcular la depreciación/amortización en contabilización NIIF el sistema
tomará el valor en libros del activo fijo y lo dividirá entre la vida útil
restante asumida en cantidad de días, a la fecha del registro. El valor
resultante será el asiento de depreciación/amortización.  
  
Los asientos contables de la depreciación y amortización se generan de forma
automática y las cuentas utilizadas se configuran por cada grupo de activos y
cada activo fijo que se maneje.

Ejemplo

La empresa CMB Muebles y Hogar adquirió un activo fijo el día 10 de enero de
2018, por valor de $ 1.800.000. Dicho activo fijo pertenece al rubro de
"Equipos de cómputo y comunicación" y cuenta con una vida útil total de 36
meses contados a partir de la fecha de compra. Al día 31 de enero de 2018 se
registrará la depreciación respectiva de este activo.

Tipo de activo fijo | Equipo de cómputo y comunicación  
---|---  
Fecha de compra | 10/1/2018  
Valor de compra | $ 1.800.000  
Vida útil total en meses | 36 meses  
Fecha de finalización de depreciación | 10/1/2021  
Cantidad de días | 1096 días  
  
  
La depreciación para el mes de enero se calcula de la siguiente forma:  
  
Valor en libros del activo | Vida útil restante | Operación | Valor por día | Cantidad de días a depreciar | Operación | Resultado  
---|---|---|---|---|---|---  
$ 1.800.000 | 1096 días | 1.800.000/1096 | $ 1.642,3357 | 21 días | 1.642.33\*21 | $ 34.489,049  
  
El asiento contable de la depreciación sería el siguiente:

Código cuenta | Nombre cuenta | Débito | Crédito  
---|---|---|---  
159220 | Depreciación acumulada equipos de cómputo y comunicación |  | $ 34.489,049  
516020 | Depreciaciones equipos de cómputo y comunicación | $ 34.489,049 |   
  

Observaciones

Esta opción solo es visible cuando se tiene el módulo de activos fijos o el
módulo de automatización de documentos.  
  
El sistema solo aplicará depreciación y/o amortización a aquellos activos
fijos que lleven por lo menos 1 día de haberse creado y contabilizado en el
sistema.  
  
El sistema aplica la depreciación por días. De esta forma se vuelve
acumulativa y se puede realizar en cualquier fecha ya que el sistema tomará
los días acumulados desde la última depreciación. Esta nota aplica para los
activos fijos que manejan el método de depreciación lineal.  
  
La depreciación en contabilización NIIF se puede realizar con cualquier
periodicidad ya que se realiza por días.  
  
El sistema solo depreciará y/o amortizará aquellos activos que se encuentren
marcados para depreciar, que tengan vida útil y que tengan valor en libros.  
  
Los asientos contables producto de las depreciaciones y/o amortizaciones
quedarán contabilizados a la fecha de soporte de la operación.  
  
Las depreciaciones/amortizaciones en contabilización local y NIIF se realizan
de forma separada ya que la normatividad local exige que cada mes se asiente
la depreciación de los activos fijos y la normatividad NIIF permite realizar
estos asientos por periodos diferentes a un mes, por ejemplo cada 15 días o
una vez al año.

Configuración

Para ingresar al catálogo de grupos de activos, ver:**\[Pestaña adicionales >
Botón Grupos de activos\]**  
Para ingresar al catálogo de activos fijos, ver:**\[Pestaña adicionales >
Botón Activos fijos\]**

---

# Auto activación de cuentas

Active esta casilla para que el sistema realice de forma automática y al
procesar esta operación, la cancelación de saldos de las cuentas, llevando sus
valores a las cuentas del activo.  
  
Para realizar el proceso de auto activación de cuentas, el sistema toma los
saldos de las cuentas marcadas para "Auto activar" y que se encuentren
cargadas en centros de costos de producción, y lleva estos valores a la cuenta
de "Producto en proceso" configurada en el centro de costos productivo.  
  
Los asientos de la auto activación se generan de forma automática y las
cuentas imputadas pertenecen a la cuenta inicial cargada al centro de costos
productivo y a la cuenta de producto en proceso que se configura en el mismo
centro de costos.

Ejemplo

La empresa CMB Muebles y Hogar tiene un línea de producción para muebles de
oficina y dicha línea está creada en el sistema como un centro de costos de
producción. Al 31 de enero de 2018 tiene los siguientes saldos contables para
ese centro de costos:

Código de la cuenta | Nombre de la cuenta | Saldo  
---|---|---  
710101 | Materia prima | $ 5.000.000  
720101 | Mano de obra | $ 8.000.000  
512015 | Arrendamiento maquinaria y equipo | $ 2.000.000  
  
  
El centro de costos productivo para la línea de muebles de oficina tiene
configurada como cuenta de producto en proceso la cuenta 141001 de "Producto
en proceso".  
  

A continuación, en la siguiente imagen se muestra el campo para asignar la
cuenta 'Producto en proceso' en un centro de costos de producción.

![Campo de configuración de la cuenta 'Producto en proceso' en el formulario
de centro de
costos.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/Acciones%20auto%20fin%20mes/%5B13480%5D%20FrmDlgOprCie1/imagen1.png)  
  
De las cuentas que actualmente tienen saldo para este centro de costos, solo
las cuentas 7 de Costos de producción tienen activo el atributo "Auto
activar".  
  
El asiento contable de la auto activación sería el siguiente:

Código cuenta | Nombre cuenta | Débito | Crédito  
---|---|---|---  
710101 | Materia prima |  | $ 5.000.000  
720101 | Mano de obra |  | $ 8.000.000  
141001 | Producto en proceso | $ 5.000.000 |   
141001 | Producto en proceso | $ 8.000.000 |   
  

Observaciones

Esta opción solo es visible cuando se tiene el módulo de costos de producción
y se tiene activo el manejo de costos de producción.  
  
El sistema solo realiza la auto activación a aquellas cuentas que tengan
activo el atributo de "Auto activar" y cuyos valores se encuentren aplicados a
centros de costos de tipo producción. Igualmente se debe tener activa la
opción "Transformar las cuentas imputadas a centros de costos destinados a la
producción en cuentas del activo \(inventario de producto en proceso\)" y la
opción "Transformar a final de mes". Si se tiene activada la segunda opción
"Transformar inmediatamente" la auto activación se realizará al procesarse la
imputación contable sobre el centro de costos productor y no cuando se procese
la operación de acciones automáticas de fin de mes.  
  
Para realizar la auto activación todas las operaciones del mes deben estar
debidamente procesadas y el mes debe estar recosteado.  
  
Esta opción afecta simultáneamente la contabilización local y NIIF.

Configuración

Para activar el manejo de costos de producción, ver:**\[Botón de aplicación >
Configuración > Configuración general de costos de producción\]**  
Para activar la auto activación de cuentas, ver:**\[Pestaña contabilidad >
Catálogo de plan de cuentas > Configuración > Configuraciones generales\]**

---

# Traslados entre CCs y distribuciones automáticas

Active esta casilla para que el sistema realice de forma automática y al
procesar esta operación, los traslados de saldos de cuentas entre centros de
costos y las distribuciones automáticas programadas para los centros de
costos.  
  
A través de esta opción el sistema puede realizar dos tipos de distribuciones:
una manual y otra automática. Para la distribución manual, se activa el paso
"Traslado valores entre centros de costos" y allí se configuran los centros de
costos, cuentas, tipo de saldo y porcentajes a trasladar.[ Ver
más.](<\[180\]Label8 \(Traslado valores entre centros de costos\).html>) Para
la distribución automática, es necesario tener previamente programados los
centros de costos distribuidores.  
  
Para ambas distribuciones el sistema toma los saldos de las cuentas fuente,
sobre los centros de costos fuente y los traslada de acuerdo las instrucciones
y porcentajes dados, a los centros de costos destino, ya sea sobre la misma
cuenta fuente o sobre una cuenta destino diferente.  
  
Los asientos de los traslados entre centros de costos se generan de forma
automática y las cuentas imputadas pertenecen a aquellas configuradas en los
centros de costos CIF o acumuladores o a aquellas configuradas en el paso de
"Traslado valores entre centros de costos".

Ejemplo

La empresa CMB Muebles y Hogar maneja tres líneas de producción: una de
muebles para alcoba, una de muebles para sala y otra de muebles para oficina.
Igualmente la empresa maneja un esquema de costos indirectos de producción a
través del cual acumulan en unos centros de costos auxiliares \(CIF\) los
costos del mes para luego ser distribuidos entre sus líneas de producción
aplicando diferentes criterios, de acuerdo al tipo de costos indirecto. Para
el mes de enero de 2018 cuenta con la siguiente información de costos
indirectos:

Centro de costos | Código de la cuenta | Nombre de la cuenta | Saldo  
---|---|---|---  
Servicios públicos | 733530 | Energía eléctrica | $ 1.200.000  
Mantenimientos | 734515 | Maquinaria y equipo | $ 1.000.000  
  
  
Para realizar la distribución de los servicios públicos, el criterio utilizado
por la empresa es "Por partes iguales" y para la distribución de los
mantenimientos el criterio es por "Peso", para lo cual han asignado a cada
línea un peso, así:  
  
Línea de producción muebles para alcoba | 25%  
---|---  
Línea de producción muebles para sala | 35%  
Línea de producción muebles para oficina | 40%  
  
Con esta información, el asiento contable de los traslados o distribución
sería el siguiente:

Código cuenta | Nombre cuenta | Débito | Crédito | Centro de costos | Observación  
---|---|---|---|---|---  
733530 | Energía eléctrica |  | 1.200.000 | Servicios públicos | Cancela 100%  
733530 | Energía eléctrica | 400.000 |  | Línea muebles para sala | Traslado 33,33%  
733530 | Energía eléctrica | 400.000 |  | Línea muebles para oficina | Traslado 33,33%  
733530 | Energía eléctrica | 400.000 |  | Línea muebles para alcoba | Traslado 33,34%  
734515 | Maquinaria y equipo |  | 1.000.000 | Mantenimientos | Cancela 100%  
734515 | Maquinaria y equipo | 350.000 |  | Línea muebles para sala | Traslado 35%  
734515 | Maquinaria y equipo | 400.000 |  | Línea muebles para oficina | Traslado 40%  
734515 | Maquinaria y equipo | 250.000 |  | Línea muebles para alcoba | Traslado 25%  
  

Observaciones

Esta opción siempre se encuentra activa ya que es propia del módulo de
contabilidad.  
  
Para realizar los traslados automáticos o distribución es necesario contar con
el módulo de costos de producción, de lo contrario solo se podrá realizar
traslados con el paso de "Traslado valores entre centros de costos".  
  
Para realizar la los traslados entre centros de costos todas las operaciones
del mes deben estar debidamente procesadas y el mes debe estar recosteado.  
  
Esta opción afecta simultáneamente la contabilización local y NIIF.

---

# Ajustes por inflación

Active esta casilla para que el sistema realice de forma automática y al
procesar esta operación, los ajustes por inflación.  
  
Para realizar el proceso de ajustes por inflación el sistema toma los saldos
de las cuentas marcadas para "Ajustar por inflación" y lo multiplica por el
porcentaje del PAAG indicado en la operación.[ Ver más.](<\[\[160\]LblPAAG>)
El valor resultante se debitará o acreditará sobre la cuenta "Debitar en"
configurada en el rango de ajustes por inflación, dependiendo de si el saldo
de la cuenta es débito o crédito y la contrapartida se llevará a la cuenta
"Acreditar en" indicada en los rangos de ajustes por inflación.  
  
Los asientos de los ajustes por inflación se generan de forma automática y las
cuentas imputadas pertenecen a las cuentas indicadas en los rangos de ajustes
por inflación.

Ejemplo

La empresa CMB Muebles y Hogar tiene saldos contables en las siguientes
cuentas, al 31 de enero de 2018:

Código de la cuenta | Nombre de la cuenta | Saldo  
---|---|---  
120599 | Ajustes por inflación - Acciones | $ 1.000.000  
151699 | Ajustes por inflación - Construcciones y edificaciones | $ 5.000.000  
272599 | Ajustes por inflación - Impuestos diferidos | \- $ 200.000  
  
  
Para el rango de ajustes por inflación de la cuenta 120599, se tienen
configuradas como cuenta "Debitar en" la cuenta 120599 y como cuenta
"Acreditar en" la cuenta 470505.  
  
![Configuración del rango de ajustes por inflación con las cuentas 'Debitar
en' y 'Acreditar en'
asignadas.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/Acciones%20auto%20fin%20mes/%5B13480%5D%20FrmDlgOprCie1/imagen2.png)  
  
Para el rango de ajustes por inflación de la cuenta 151699, se tienen
configuradas como cuenta "Debitar en" la cuenta 151699 y como cuenta
"Acreditar en" la cuenta 470515 y para el rango de ajustes por inflación de la
cuenta 272599, se tienen configuradas como cuenta "Debitar en" la cuenta
470535 y como cuenta "Acreditar en" la cuenta 272599.  
  
Para realizar los ajustes por inflación, se han asignado en la operación los
siguientes datos:  
  
Porcentaje PAAG | 0.20%  
---|---  
Centro de costos | Administración  
  
Con esta información, el asiento contable de los ajustes por inflación sería
el siguiente:

Código cuenta | Nombre cuenta | Centro de costos | Débito | Crédito  
---|---|---|---|---  
120599 | Ajustes por inflación - Acciones |  | 2.000 |   
470505 | Ajustes por inflación - Inversiones \(cr\) | Administración |  | 2.000  
151699 | Ajustes por inflación - Construcciones y edificaciones |  | 10.000 |   
470515 | Ajustes por inflación - Propiedades, planta y equipos \(cr\) | Administración |  | 10.000  
470535 | Pasivo sujeto de ajuste | Administración | 400 |   
272599 | Ajustes por inflación - Impuestos diferidos |  |  | 400  
  

Observaciones

Esta opción solo es visible cuando se tiene activo el manejo de ajustes por
inflación. Para activar este manejo, ver: **\[Botón de aplicación >
Configuración > Configuración general de contabilidad\]**  
  
Esta opción afecta simultáneamente la contabilización local y NIIF.

Configuración

Para ingresar al catálogo de rangos de ajustes por inflación, ver:**\[Pestaña
Contabilidad > despliega la flecha hacia abajo del Ícono de Plan de cuentas >
Rangos de ajustes por inflación\]**

---

# Nodo padre para distribución

Nodo o centro de costos bajo el cual se realizará la distribución.  
  
Al seleccionar un nodo, el sistema solo realizará la distribución bajo los
centros de costos hijos de ese nodo. De esta forma se pueden controlar las
distribuciones y realizarlas en un orden específico.

Ejemplo

La empresa CMB Muebles y Hogar cuenta con la siguiente estructura de centros
de costos:  
  

A continuación, en la siguiente imagen se muestra la estructura jerárquica de
centros de costos con el nodo padre para la distribución.

![Estructura jerárquica de centros de costos que muestra el nodo padre y sus
centros de costos hijos para la
distribución.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/Acciones%20auto%20fin%20mes/%5B13480%5D%20FrmDlgOprCie1/imagen3.png)  
  
Para el mes de enero, la empresa necesita realizar solo la distribución de los
costos indirectos relacionados con maquinaria y equipo. En ese caso, debe
seleccionar como nodo padre de distribución el centro de costos "2 Costos de
maquinaria y equipo" que es el nodo que agrupa los centros de costos
indirectos de maquinaria y equipo.

Observaciones

Si no se especifica un nodo o centro de costos, el sistema realizará la
distribución bajo todos los centros de costos.

---

# Acerca de ventana

## ACCIONES AUTOMÁTICAS DE FIN DE MES

##  Objetivo

Esta operación tiene como finalidad ejecutar de forma automáticas procesos
contables como depreciaciones y amortizaciones de activos fijos y diferidos,
traslados de saldos entre centros de costos, distribuciones automáticas de
saldos, ajustes por diferencia en cambio, ajustes por inflación y auto
activación de cuentas. Todos estos procesos normalmente se realizan el último
día del mes.  
  

## Ejemplo de información a registrar

Las acciones que se pueden realizar a través de esta operación dependen de los
módulos adicionales con los que cuente, ya que a pesar de ser una operación
del módulo de contabilidad, las acciones que esta operación puede ejecutar
afectan otros módulos del sistema. De allí que algunas de estas acciones solo
se activen cuando el licenciamiento cuenta dichos módulos. Todos estos
procesos automáticos se pueden realizar de una sola vez o por separado,
realizando la misma operación pero indicando cada vez una acción diferente.  
  
Una vez procesada la operación, los movimientos generados por la misma
realizarán la respectiva afectación en los diferentes módulos del sistema, por
ejemplo, las depreciaciones afectarán el módulo de activos fijos, los ajustes
por diferencia en cambio afectarán el módulo de moneda extranjera y así con
cada una de las acciones.  
  

Ejemplo de uso:

La operación de acciones automáticas de fin de mes para registrar:  

  * Depreciaciones y/o amortizaciones
  * Distribución de saldos
  * Ajustes por diferencia en cambio, entre otros

## Secciones

## Sección encabezado de la operación

Tipo de documento de soporte

La operación de movimiento contable viene configurada por defecto con el tipo
de documento de soporte 280 Cierre fin de mes. Este documento puede ser
cambiado de ser necesario pero se recomienda utilizar el documento por defecto
para que los movimientos ejecutados por esta operación sean fácilmente
distinguibles.

Número de documento de soporte

El consecutivo generado por el tipo de documento de soporte 280 Cierre fin de
mes está programado para arrojar las letras “CM” y un consecutivo numérico
correspondiente a los dos últimos dígitos del año de soporte, los dos dígitos
del mes de soporte y 2 cifras numéricas. Este número de documento de soporte
puede ser cambiado de ser necesario pero se recomienda utilizar el consecutivo
por defecto.

Fecha de soporte de la operación

La fecha de soporte de la operación se recomienda que sea el último día del
mes en que se van a ejecutar las acciones. Los movimientos contables generados
por esta operación quedaran asentados al mismo día de la fecha de soporte.  
  

## Sección acciones automáticas de fin de mes

En este primer paso de la operación se debe activar la o las acciones que se
desea realice la operación. Al activar algunas acciones, como por ejemplo la
acciones de traslados entre centros de costos, se activa un segundo paso.  
  

## Sección traslado valores entre CC

Este paso solo se activa cuando en el primer paso se activa la acción
“Traslados entre CCs”. En este paso se debe listar los centros de costos,
cuentas y valores que se desea trasladar. Esto cuando el traslado no se
realizará por medio de centros de costos programados \(Costdrivers\).  
  

## Sección centro de costos para ajustes por diferencias en cambio

Este paso solo se activa cuando en el primer paso se activa la acción “Ajustes
por diferencia en cambio”. En este paso se debe indicar el centro de costos al
cual se cargará el ingreso o gasto por los ajustes en diferencia cambiaria  
  

## Documentos de impresión

La operación de acciones automáticas de fin de mes solo se puede imprimir con
los Driver de:  

  * Nota de contabilidad simple
  * Nota de contabilidad ampliada

---

# Año a cerrar

Año para el cual se realizará el cierre de cuentas.  
  
Para realizar el cierre de año el sistema toma las imputaciones contables
realizadas a las cuentas de resultado y las cancela dejando dichas cuentas en
cero, el valor resultante es enviado a la cuenta de "Ganancias y pérdidas" y
de allí pasa a la cuenta de "Utilidad del ejercicio" o "Pérdida del
ejercicio". Finalmente el valor resultante será asentado en la cuenta de
"Utilidades acumuladas" o "Pérdidas acumuladas".  
  
Los asientos contables del cierre de año se generan de forma automática y las
cuentas utilizadas se configuran en las acciones de cierre de año.

Ejemplo

La empresa CMB Muebles y Hogar desea realizar el cierre contable del año 2017.
Actualmente tiene los siguientes valores en las cuentas de resultado:  
  
Código de la cuenta | Nombre de la cuenta | Débitos | Créditos  
---|---|---|---  
412086 | Fabricación de muebles |  | $ 100.000.000  
510506 | Sueldos | $ 40.000.000 |   
512010 | Arrendamientos - Construcciones y edificaciones | $ 8.000.000 |   
612086 | Fabricación de muebles | $ 40.000.000 |   
  
El asiento contable del cierre de año 2017 sería el siguiente:

Código de la cuenta | Nombre de la cuenta | Débitos | Créditos  
---|---|---|---  
412086 | Fabricación de muebles | $ 100.000.000 |   
510506 | Sueldos |  | $ 40.000.000  
512010 | Arrendamientos - Construcciones y edificaciones |  | $ 8.000.000  
612086 | Fabricación de muebles |  | $ 40.000.000  
590505 | Ganancias y pérdidas |  | $ 12.000.000  
590505 | Ganancias y pérdidas | $ 12.000.000 |   
360501 | Utilidad del ejercicio |  | $ 12.000.000  
360501 | Utilidad del ejercicio | $ 12.000.000 |   
370501 | Utilidades acumuladas |  | $ 12.000.000  
  

Observaciones

El año a cerrar debe ser igual al año de soporte de la operación.

Configuración

Para ingresar al catálogo de acciones de cierre de año, ver:**\[Pestaña
Contabilidad > despliega la flecha hacia abajo del Ícono de Plan de Cuentas >
Acciones de cierre de año\]**

---

# Acerca de ventana

## CIERRE DE FIN DE AÑO

##  Objetivo

Esta operación tiene como finalidad ejecutar de forma automática la
cancelación de las cuentas de resultado, asentar la utilidad o pérdida del
ejercicio y posteriormente llevar dicha utilidad o pérdida a la
correspondiente cuenta del ejercicio anterior. Esta acciones se realiza
generalmente el último día del año y los asientos que genere son automáticos y
el sistema los lleva a la cuentas que se configuran en las acciones de cierre
de fin de año.  
  

## Ejemplo de información a registrar

La operación de cierre de fin de año se utiliza para realizar el cierre de las
cuentas de un año específico. Además de realizar el cierre de las cuenta de
resultado, esta operación puede utilizarse para realizar el cierre de otras
cuentas como por ejemplo las cuentas de impuestos.  
  

## Secciones

## Sección encabezado de la operación

  * **Tipo de documento de soporte**  
La operación de cierre de fin de año viene configurada por defecto con el tipo
de documento de soporte 290 Cierre fin de año. Este documento puede ser
cambiado de ser necesario pero se recomienda utilizar el documento por defecto
para que los movimientos ejecutados por esta operación sean fácilmente
distinguibles.

  

  * **Número de documento de soporte.**  
El consecutivo generado por el tipo de documento de soporte 290 Cierre fin de
año está programado para arrojar las letras “CA” y un consecutivo numérico
correspondiente al año de soporte. Este número de documento de soporte puede
ser cambiado de ser necesario pero se recomienda utilizar el consecutivo por
defecto.

  

  * **Fecha de soporte de la operación.**  
La fecha de soporte de la operación se recomienda que sea el último día del
año que se va a cerrar. Por ejemplo si se va a cerrar el año 2018, la fecha de
soporte de la operación se recomienda que sea el 31/12/2018. En todo caso, la
fecha de soporte de la operación deberá estar dentro del mismo año de cierre.
No se podrá indicar una fecha anterior o posterior al año de cierre. La
mayoría de los movimientos contables generados por la operación quedarán
asentados al mismo día de la fecha de soporte, pero otros quedarán asentados
al día siguiente de la fecha de soporte. Todo depende de las configuraciones
que se realicen en las acciones de cierre de fin de año.

## Sección cierre de fin de año

El sistema permite realizar el deterioro de la cartera por tres métodos En
este primer paso de la operación se debe indicar el año a cerrar. En este paso
adicionalmente se indican los procesos que realizará la operación y las reglas
que el sistema tiene en cuenta para realizar este proceso.

## Sección recomendaciones

En el segundo paso se listan una serie de recomendaciones que el usuario debe
tener en cuenta una vez a procesado la operación.

## Documentos de impresión

La operación de cierre de fin de año solo se puede imprimir con Driver de Nota
de contabilidad simple y Nota de contabilidad ampliada.

---

# Cuenta contrapartida

Código de la cuenta sobre la cual se cancelarán los saldos de las cuentas por
cobrar y/o por pagar.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar del
proveedor Proveequipos Ltda. a través de un cheque del Banco Nacional. En este
caso, debe seleccionar en el campo "Cuenta contrapartida" el código de la
cuenta correspondiente al Banco Nacional.  

Observaciones

Si deja este campo en blanco, el sistema no cargará ninguna cuenta para la
contrapartida y esta tendrá que ser seleccionada de forma manual en la
operación.

---

# Tipo de saldos a cargar

Tipo de saldo que el sistema cargará en la operación.  
  
Los tipos de saldos a cargar son los de cuentas por cobrar y/o cuentas por
pagar.

Ejemplo

La empresa CMB Muebles y Hogar desea cancelar honorarios al señor Roberto
García. Como la cuenta ya está causada, el tipo de saldo a seleccionar es el
de cuentas por pagar.  

Observaciones

Para el tipo de saldo se pueden seleccionar ambas opciones.  
  
Si no selecciona alguna de las dos opciones, por defecto el sistema cargará
los saldos de ambas opciones.

---

# Cargar sólo las cuentas vencidas

Active esta casilla para cargar sólo las cuentas por cobrar y/o por pagar que
se encuentren vencidas a la fecha de soporte de la operación.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar al 31 de enero de 2018 todas
las cuentas por pagar que se encuentren vencidas a esa fecha. En este caso,
debe activar la opción "Cargar sólo las cuentas vencidas?" para que el sistema
le traiga todas las cuentas vencidas al 31 de enero de 2018.  

Observaciones

Si desactiva esta opción, el sistema cargará todas las cuentas por cobrar y/o
por pagar sin importar si están vencidas o no.

---

# Categoría

Categoría del tercero o los tercero para los cuales se cargarán las cuentas
por cobrar y/o por pagar.  
  
Este campo se habilita cuando se activa la casilla "Por categoría de
tercero".[ Ver más.](<\[50\]RdOPorCategoria.html>)

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar
pendientes con todos los proveedores cuya categoría es "Proveedores del
exterior". En este caso, debe seleccionar en el campo "Categoría" la categoría
"Proveedores del exterior".  

Observaciones

La categoría de tercero es un campo de libre definición que se define en la
pestaña "Clasificación" del editor de terceros. Una vez se han definido
diferentes categorías de terceros, estas se cargan en el campo "Categoría"
para poder seleccionarlas.  
  
Si deja este campo en blanco, el sistema cargará la información de todos los
terceros sin importar su categoría.

---

# Tipo de transacción

Tipo de transacción o movimiento bancario asignado para la cuenta de
contrapartida.  
  
El tipo de transacción se asigna para la cuenta de contrapartida cuando esta
es una cuenta de banco.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar del
proveedor Proveequipos Ltda. a través de un cheque del Banco Nacional. En este
caso, debe seleccionar en el campo "Tipo de transacción" el tipo de movimiento
bancario correspondiente a cheques girados.  

Observaciones

Si deja este campo en blanco, el sistema no cargará ningún tipo de movimiento
bancario para la cuenta de contrapartida y si esta cuenta es de banco, tendrá
que seleccionar de forma manual en la operación el tipo de movimiento
bancario.

---

# Auto-numerar cheques

Active esta casilla para que el sistema asigne de forma automática un número
de cheque.  
  
La auto-numeración de cheques se asigna para la cuenta de contrapartida cuando
esta es una cuenta de banco.  
  
Al activar esta opción, el sistema mostrará una casilla en la cual podrá
indicar el número del primer cheque y apartir de este número se irá asignando
la numeración para los demás cheques.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar
pendientes con los proveedores Proveequipos Ltda, Compupartes SAS y Gabriel
Zapata, a través de cheques girados del Banco Nacional. En este caso, puede
activar la opción "Auto-numerar cheques" para que el sistema le permita
indicar el número del primer cheque y a partir de este se numeren los demás
cheques de forma automática.

---

# Iniciar en:

Número en el que inicia el primer cheque.  
  
La numeración se realizará automáticamente y se incrementará de uno en uno.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar
pendientes con los proveedores Proveequipos Ltda, Compupartes SAS y Gabriel
Zapata, a través de cheques girados del Banco Nacional, y necesita que los
cheques queden numerados consecutivamente. En este caso, debe activar la
opción "Auto-numerar cheques" y en el campo "Iniciar en" debe colocar el
número del primer cheque para que el sistema automáticamente asigne el
consecutivo de los demás cheques.

Observaciones

Si este campo se deja en blanco, no se asignará numeración para el cheque y
será necesario indicar el número de forma manual en la operación.

---

# Flujo de efectivo

Concepto de flujo de efectivo asignado para la cuenta de contrapartida.  
  
El flujo de efectivo se asigna para la cuenta de contrapartida cuando esta es
una cuenta de clase "Efectivo".

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar del
proveedor Proveequipos Ltda. a través de un cheque del Banco Nacional. En este
caso, debe seleccionar en el campo "Flujo de efectivo" el concepto de flujo de
efectivo correspondiente a pago a proveedores.  

Observaciones

Si deja este campo en blanco, el sistema no cargará ningún concepto de flujo
de efectivo para la cuenta de contrapartida y si esta cuenta es de efectvo,
tendrá que seleccionar de forma manual en la operación el concepto flujo de
efectivo.

---

# Auto-numerar para impresión

Active esta casilla para que el sistema incremente de forma automática el
consecutivo del documento de soporte, asignando por cada movimiento de tercero
un consecutivo diferente.  
  
La numeración automática para la impresión de comprobantes, usa el número de
documento de la operación y le adiciona un consecutivo, iniciando en 1. Esto
lo hace por cada conjunto de movimiento por tercero.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar
pendientes con los proveedores Proveequipos Ltda, Compupartes SAS y Gabriel
Zapata, a través de cheques girados del Banco Nacional. Igualmente necesita
que al imprimir el comprobante de egreso, se genere por cada tercero un
documento con diferente numeración. En este caso, puede activar la opción
"Auto-numerar para impresión" para que el sistema asigne un dígito adicional
al consecutivo, por cada movimiento de tercero. En este caso, los consecutivos
quedarían así:

Consecutivo original de la operación | CE-000114  
---|---  
Consecutivo en impresión para el tercero Proveequipos Ltda | CE-0001141  
Consecutivo en impresión para el tercero Compupartes SAS | CE-0001142  
Consecutivo en impresión para el tercero Gabriel Zapata | CE-0001143  
  

Observaciones

Esta opción solo cambia el consecutivo al momento de imprimir, pero la
operación conservará el consecutivo original.

---

# Cuentas por cobrar

Active esta casilla para cargar las cuentas por cobrar filtradas por tercero o
categoría de tercero, cuenta y vencimiento.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar en una sola operación, todas
las cuentas por cobrar a una fecha específica. En este caso, debe activar la
casilla de "Cuentas por cobrar".

---

# Cuentas por pagar

Active esta casilla para cargar las cuentas por pagar filtradas por tercero o
categoría de tercero, cuenta y vencimiento.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar en una sola operación, todas
las cuentas por pagar a una fecha específica. En este caso, debe activar la
casilla de "Cuentas por pagar".

---

# Por tercero

Active esta casilla para cargar las cuentas por cobrar y/o por pagar filtrando
por tercero.  
  
Al activar esta opción, el sistema mostrará una casilla en la cual podrá
seleccionar un tercero específico.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar
pendientes con el proveedor Proveequipos Ltda. En este caso, debe activar la
opción "Por tercero" para que el sistema le permita indicar el código del
tercero.

---

# Por categoría de tercero

Active esta casilla para cargar las cuentas por cobrar y/o por pagar filtrando
por categoría de tercero.  
  
Al activar esta opción, el sistema mostrará una casilla en la cual podrá
seleccionar una categoría de tercero en específico.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar
pendientes con todos los proveedores que pertenecen a la categoría
"Proveedores del exterior". En este caso, debe activar la opción "Por
categoría de tercero" para que el sistema le permita seleccionar la categoría
de tercero.

---

# Código tercero

Código del tercero para el cual se cargarán las cuentas por cobrar y/o por
pagar.  
  
Este campo se habilita cuando se activa la casilla "Por tercero".[ Ver
más.](<\[40\]RdOPorTercero.html>)

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar
pendientes con el proveedor Proveequipos Ltda. En este caso, debe seleccionar
en el campo "Código tercero" el código o NIT de Proveequipos Ltda.  

Observaciones

Si deja este campo en blanco, el sistema cargará la información de todos los
terceros.  
  
Para adicionar todas las sucursales de un tercero, se dede colocar un
asterisco \(\*\) luego del código, así el sistema incluirá todos los terceros
que tengan el mismo código y \(/\) con cualquier número o caracter posterior.

---

# Cuenta

Código de la cuenta de la cual se cargarán los saldos.

Ejemplo

La empresa CMB Muebles y Hogar necesita cancelar las cuentas por pagar de
servicios técnicos. En este caso, debe seleccionar en el campo "Cuenta" el
código de la cuenta 233530 de Servicios técnicos.  

Observaciones

Si deja este campo en blanco, el sistema cargará la información de todas las
cuentas.

---

# Acerca de ventana

## CARGAR CUENTAS POR COBRAR/PAGAR A UN TERCERO

##  Objetivo

Esta ventana tiene como finalidad cargar en la operación de movimiento
contable las cuentas por cobrar y/o por pagar pendientes con uno o varios
terceros, con el fin de realizar la respectiva cancelación de las mismas.  
  

## Ejemplo de información a registrar

Los datos principales que se deben indicar en esta ventana son: tipo de saldo
a cargar, por tercero o por categoría, cuenta, cuenta contrapartida.

Ejemplo:

Nombre del campo | Dato  
---|---  
Tipo de saldo a cargar | Cuentas por cobrar  
Por tercero | Juan García  
Cuenta  | 130505 – Clientes  
Cuenta contrapartida | 11100505 – Banco Nacional  
  
## Secciones

## Sección tipo de saldo a cargar

Se puede seleccionar que los valores que se carguen correspondan a las cuentas
por cobrar, a las cuentas por pagar o ambas.  

## Sección por tercero/por categoría de tercero

Se puede seleccionar que las cuentas que se carguen sean por un tercero
específico. Si se deja vacío se cargará para todos los terceros. O que se
carguen las cuentas por una categoría especifica de tercero.  

## Sección cuenta

Se puede indicar la cuenta específica del PUC para la cual se desea cargar las
cuentas por cobrar o por pagar. Si se deja vacío se cargarán los valores de
todas las cuentas por cobrar o pagar que tengan saldo.

---

# Cartera y Proveedores - Fecha pago

Fecha de pago estimada para la cuenta por cobrar/pagar. Esta se considerará
como la fecha de vencimiento de la deuda y será la que se use para calcular
los plazos.

---

#  Cuenta

Código de la cuenta que se afecta con el movimiento contable.  
  
La cuenta puede ser digitada directamente en la celda o seleccionarse usando
la ventana de selección del plan de cuentas.  
  

Ejemplo:

  
  

11050501, 51050601, 24080119, etc.

---

# Cartera y Proveedores - Referencia

No. de documento referencia para la cuenta por cobrar/pagar que se crea, se
abona o se registra un mayor valor.  
  
Este dato es de suma importancia para el sistema de cartera y proveedores, ya
que junto con la cuenta, tercero y centro de costos \(si la cuenta lo exige\),
conforma el identificador único de una CxC o CxP.  
  
La referencia puede ser el número de un documento existente como operación o
puede ser cualquier código alfanumérico de hasta 32 caracteres.

---

# Vendedor

Código del tercero vendedor responsable de la cuenta por cobrar. Este tercero
podrá usarse a nivel informativo en la operación de abono a cuentas por cobrar
y en los informes y consultas de saldos de cartera.

---

# Flujo de efectivo

Código del concepto de flujo de efectivo que se desea asignar para el
movimiento de la cuenta de caja o bancos.  
  
El concepto puede ser digitado directamente en la celda o seleccionarse usando
la ventana de selección del catálogo de conceptos de flujo de efectivo.

---

# MOVIMIENTO BANCO - Tipo mvto.

Código del tipo de movimiento bancario. Este dato determina si el movimiento
con la cuenta de bancos corresponde, por ejemplo, a una consignación, cheque,
pago con tarjeta débito, etc.  
  
El tipo de movimiento bancario es de suma importancia cuando se tiene
habilitado el control de conciliación bancaria y periodicamente se registra
operaciones de conciliación, facilitando el análisis de movimientos en el
sistema respecto a los del extracto bancario.  
  
El tipo de movimiento puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección del catálogo de tipos de
movimiento bancario generales, o si la cuenta es de conciliación, del catálogo
de tipos de movimiento bancario particulares para la cuenta.  

A continuación, se muestra una imagen con la celda para registrar el tipo de
movimiento bancario, como consignación, cheque o tarjeta débito.

![Campo para seleccionar el tipo de movimiento bancario en una
operación.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/col_ibanco2.jpg)  
  

Configuración

  

  * Para modificar la configuración general de conciliación bancaria, ingrese a **\[Plan de cuentas > Configuración > Conciliación bancaria\]**.
  

  * Para modificar los tipos de movimiento de conciliación bancaria generales, ingrese a **\[Pestaña Contabilidad > Plan de Cuentas para desplegar menú > Definición de tipos de movimiento bancario generales\]**
  

A continuación, se muestra una imagen con la ruta de acceso al catálogo de
tipos de movimiento bancario generales.

![Ventana de configuración de tipos de movimiento bancario generales o
particulares por
cuenta.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/col_ibanco.jpg)

---

# MOVIMIENTO BANCO - Número

Número del cheque, consignación, comprobante, número de aprobación o documento
referencia de la transacción bancaria.

---

# Activo

Código del activo fijo o inversión ya existente y para el cual se registra el
asiento contable que lo afecta.

---

# Comandos de impresión

En esta columna se podrá visualizar y modificar manualmente los comandos para
la impresión de documentos.  
  
Para adicionar un comando de impresión, ingrese a **\[Menú operación >
Herramientas > Insertar comandos para impresión\]**.  

A continuación, se muestra una imagen con la columna donde se configuran los
comandos de impresión utilizados en los formatos de documentos.

![Columna para ingresar o modificar manualmente comandos de impresión en
documentos del
sistema.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/col_ibanco2.jpg)  
Para más información sobre el propósito de cada comando, consulte la ayuda de
estas opciones.

---

# Valor en otra moneda

En esta columna se puede especificar el valor del asiento débito o crédito,
equivalente en moneda extranjera.  
  
Si el asiento registrado es débito, el valor en moneda extranjera debe ser
positivo. Si el asiento es crédito, el valor en moneda extranjera debe ser
negativo.  
  
Esta columna solamente se habilita para edición, en caso que la cuenta se
maneje en moneda extranjera y además, la configuración para el manejo de
moneda extranjera \(ver Configuración en la parte inferior\) permita la
edición de este valor.  
  
Normalmente solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se debería habilitar
este manejo en las cuentas de gastos, ingresos o costos.  
  

Configuración

  

  * Para ingresar a la configuración de manejo de moneda extranjera, ingrese a **\[Catálogo Plan de Cuentas > Configuración > Configuraciones generales > Manejo de moneda extranjera\]**

---

# Valor 1

Valor 1 \(numérico/monetario\) opcional que se registrará en el movimiento
contable generado por la operación la procesar. Este dato es de propósito
general y puede ser usado para almacenar cualquier dato numérico/monetario que
se requiera.  
  
Después de procesarse la operación, este dato puede ser consultado en un
explorador de movimiento contable, en el informe de movimiento de cuentas
auxiliares o en el libro diario oficial.

---

#  CC. cargar mvto.

Código del Centro de costos o nodo que se imputará con el movimiento
registrado en el renglón. Nodo hace referencia a un item imputable que puede
ser agrupador de varios centros de costos o un distribuidor especializado.
Para mayor información consulte la ayuda sobre Centros de costos y nodos.  
  
El centro de costos/nodo puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.  
  

Ejemplo:

  
  

1010, 120101, CCADM, etc.

---

# Valor 2

Valor 2 \(numérico/monetario\) opcional que se registrará en el movimiento
contable generado por la operación la procesar. Este dato es de propósito
general y puede ser usado para almacenar cualquier dato numérico/monetario que
se requiera.  
  
Después de procesarse la operación, este dato puede ser consultado en un
explorador de movimiento contable, en el informe de movimiento de cuentas
auxiliares o en el libro diario oficial.

---

# Clase 1

Clasificador 1 \(10 caracteres\) opcional que se registrará en el movimiento
contable generado por la operación al procesar.Este dato es de propósito
general y puede ser usado para almacenar cualquier dato alfanumérico que se
requiera.

---

# Clase 2

Clasificador 2 \(10 caracteres\) opcional que se registrará en el movimiento
contable generado por la operación al procesar.Este dato es de propósito
general y puede ser usado para almacenar cualquier dato alfanumérico que se
requiera.

---

# Motivo nota débito a factura

En este campo se debe especificar el código del motivo por el cual se registra
la nota débito para la factura de venta o de exportación. Este campo es
obligatorio para el envío de la nota débito de venta electrónica, ya que la
empresa tiene habilitada la facturación electrónica.  
  
  

Configuración

  
  

Si no desea que se solicite este dato o si este documento no hace parte del
sistema de facturación electrónica, se debe configurar el tipo de documento
soporte con el tipo de documento de facturación electrónica "00-No aplica en
facturación electrónica".

---

# Asignar diferencia \(Ctrl+E\)

Asigna la diferencia que existe entre el total de débitos y créditos, al
renglón actual del movimiento. El sistema sumará la diferencia a la casilla
débito o crédito, según si es negativa o positiva. Después de hacer esto, el
movimiento de la operación quedará cuadrado.

---

#  Detalle

Permite especificar una observación o descripción del movimiento contable del
renglón. Esta observación se guardará en el movimiento contable generado por
la operación y podrá consultarse posteriormente en los exploradores de
movimiento o informes detallados a nivel de movimiento.  
  

Ejemplo:

  
  

Anticipo compra de materiales.

---

# Calcular impuestos \(Ctrl+Q\)

Esta opción analiza la clasificación tributaria de la empresa, cada cuenta y
tercero del movimiento, para determinar qué impuestos aplican y adicionar
automáticamente los movimientos contables correspondientes.  
  
Si hay más de una celda seleccionada, se ejecuta sobre las cuentas de los
renglones seleccionados. Sino, se ejecuta sobre todas las cuentas de la
operación.  
  

Ejemplo:

  
  

Registro de movimiento contable para ingreso por intereses financieros  

A continuación, se muestra una imagen del movimiento contable inicial antes de
aplicar la función de cálculo automático de impuestos.

![Registro contable de ingreso por intereses financieros antes de calcular
impuestos.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/calculo_impuestos.jpg)  
Después de presionar el botón para calcular impuestos, se obtiene el siguiente
movimiento:  

A continuación, se muestra una imagen del movimiento contable generado
automáticamente después de usar la opción Calcular impuestos \(Ctrl+Q\).

![Resultado contable con impuestos aplicados automáticamente al presionar
Calcular
impuestos.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/calculo_impuestos2.jpg)

---

# Asiento Débito

Especifique el valor débito para el asiento contable. Este valor puede ser
dado en moneda local o en moneda extranjera según la moneda especificada en el
encabezado de la operación.

---

# Ordenar por tercero

Ordena el listado de movimientos por tercero transacción. Para que esta opción
funcione adecuadamente, todos los movimientos registrados en la operación
deben tener registrado el tercero.  
  
Al final, los movimientos quedarán agrupados por tercero separando cada grupo
por un renglón en blanco para mayor claridad.

---

# Buscar

Realiza la búsqueda de un dato en la columna donde se encuentra el cursor.  
  
Para buscar un dato que se encuentra varias veces, se puede presionar
Ctrl+Enter para seguir buscando el mismo dato en los demás renglones.  
  
  

Pasos para hacer una búsqueda

  
  

Para buscar un registro con base en un dato de una columna, se debe seguir los
siguientes pasos:  
  
1\. Seleccionar una celda de la columna sobre la cual se va a buscar.  

A continuación, se muestra una imagen con el primer paso para realizar una
búsqueda: seleccionar la celda dentro de la columna correspondiente.

![Selección de una celda de la columna donde se desea buscar un
dato.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/buscar.jpg)  
2\. Hacer clic sobre el botón "Buscar" y luego escribir el dato a buscar. Este
dato puede ser parcial o completo.  

A continuación, se muestra una imagen del segundo paso: ingreso del dato que
se desea buscar en la columna seleccionada.

![Ventana para ingresar el dato parcial o completo a
buscar.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/buscar2.jpg)  
3\. Clic en el botón "OK" para buscar la primera coincidencia.  

A continuación, se muestra una imagen del tercer paso: hacer clic en OK para
buscar la primera coincidencia del dato ingresado.

![Resultado después de indicar OK de la ventana de búsqueda para encontrar la
primera
coincidencia.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/buscar3.jpg)  
4\. Para buscar las siguientes coincidencias se puede presionar las teclas
Ctrl+Enter.  

A continuación, se muestra una imagen del cuarto paso: uso de Ctrl+Enter para
encontrar siguientes coincidencias del dato buscado.

![Navegación entre coincidencias de búsqueda usando el atajo
Ctrl+Enter.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/buscar4.jpg)

---

# Ver documento impreso

Visualiza el documento impreso asociado a la referencia especificada en el
movimiento del renglón actual.  

A continuación, La imagen muestra un movimiento contable con varias cuentas y
una referencia resaltada. Al seleccionar la fila, se puede visualizar el
documento impreso asociado a dicha referencia.

![Vista de un movimiento contable donde se destaca la referencia asociada para
visualizar el documento
impreso.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/visualizar_documento.jpg)  
Si la operación correspondiente al documento referencia ya fue impresa, se
muestra el último documento con el cual se imprimió. Si no ha sido impresa, se
muestra el documento predeterminado.  

A continuación, se muestra una imagen del documento impreso que el sistema
presenta, ya sea el último generado o el formato predeterminado si no se ha
impreso antes.

![Visualización del documento impreso previamente generado o predeterminado en
caso de no haberse impreso
aún.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/visualizar_documento2.jpg)

---

# Ver trazabilidad

Abre la herramienta para consultar la trazabilidad del documento referencia
del renglón seleccionado. Esta permite ver todas las operaciones en las cuales
se ha involucrado el documento o se ha hecho referencia a él.  
  
  

Ejemplo:

  
  

Se registra una operación de ventas con número de documento PRUE980339087.
Luego se registra un abono a esa factura con el documento CI-000171. Por
último se crea una operación de movimiento contable para registrar una nota
débito a esa factura. En esta última operación se consulta la trazabilidad
para el documento referencia, que en este caso es la factura.  

A continuación, se muestra una imagen con la trazabilidad del documento
referencia, donde se visualizan todas las operaciones en las que ha sido
utilizado, como facturas, abonos o notas débito.

![Pantalla de trazabilidad que muestra las operaciones vinculadas al documento
de referencia
seleccionado.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/trazabilidad_documento.jpg)

---

# Informes

Conjunto de opciones para consultar informes relevantes para la operación.

---

# Cargar Cuentas por Cobrar/Pagar a un tercero

Opción que abre la herramienta para cargar cuentas por cobrar/pagar para un
tercero o un listado de terceros que pertenecen a una categoría, donde se
cuenta con opciones como: filtrar por cuenta, asignar cuenta para el asiento
de contrapartida, cargar solo las cuentas vencidas, entre otras opciones.  
  

Para mayor información sobre esta herramienta, ver la ayuda de esa ventana.

---

# Cargar Saldos de cuentas para un tercero

Opción que abre la herramienta que permite cargar los saldos de una o varias
cuentas para múltiples terceros.  
  

Para mayor información sobre esta herramienta, ver la ayuda de esa ventana.

---

# Asistente para liquidación de contratos de labores de MdO

Opción que abre la herramienta que permite liquidar los contratos de labores
de mano de obra que haya realizado en la empresa.  
  

Para mayor información sobre esta herramienta, ver la ayuda de esa ventana.

---

# Insertar comandos

Este menú de opciones proporciona diferentes etiquetas que actuarán como
comandos para establecer diferentes comportamientos o consideraciones al
momento de imprimir o procesar la operación.  
  
Dentro del listado de comandos que se puede usar, están:  
  

* <FINDOC> Finalizar documento: etiqueta que indica al sistema que al procesar el renglón se finalizará el documento especificado en la columna referencia.
  
  

* <TOTALAPAGAR> Total a pagar: etiqueta que indica al sistema cuál es el renglón que contiene el valor total a pagar. Este dato se usa para la generación de comprobantes de egreso para múltiples terceros. Si el total a pagar se encuentra en un movimiento de una cuenta de efectivo, no es necesario indicar este comando.
  
  

* <\#XX> \# documento: esta etiqueta permite especificar el número de documento para la impresión de un conjunto de registros de movimiento contable, en comprobantes de egreso múltiples. Este dato se debe especificar a todos los registros. Ej: <\#NT-19060051>
  
  

* <\#REF> \# documento igual a referencia: permite indicarle al sistema que el número de documento para la impresión de comprobantes de egreso múltiples, será tomado de la referencia especificada en el renglón.

---

# Consulta mayor y balances

Opción que calcula y muestra en pantalla una Consulta de Mayor y Balances a la
fecha actual.

---

# Consulta de saldos de cuentas por pagar

Opción que calcula y muestra en pantalla una Consulta de Saldos de Cuentas por
Pagar a la fecha actual.

---

# Asiento Crédito

Especifique el valor crédito para el asiento contable. Este valor puede ser
dado en moneda local o en moneda extranjera según la moneda especificada en el
encabezado de la operación.

---

# Consulta saldo de cuentas por cobrar

Opción que calcula y muestra en pantalla una Consulta de Saldos de Cuentas por
Cobrar a la fecha actual.

---

# Explorador de movimiento contable

Opción que permite consultar un explorador de movimiento contable a la fecha
actual.

---

# Calcular retención trab. indep.

Abre la herramienta que permite calcular la retención en la fuente para
trabajadores independientes, según lo estipulado en el Decreto 0099 de
25-01-2013.  
  
  

Requisitos

  

Para poder usar esta herramienta se debe cumplir los siguientes requisitos:

  * Se debe haber especificado el valor de la UVT en la configuración general del sistema.
  * El tercero del renglón seleccionado debe tener activa la clasificación tributaria “TI – Empleado o trabajador independiente”.
  * El tercero debe ser empleado de la empresa o ser empleado de alguna otra empresa y además presente certificado de aportes a: Pensión, Salud y ARL. \(Según estado de las casillas en la información del tercero en el catálogo\).
  

A continuación, se muestra una imagen con la configuración necesaria en el
catálogo de terceros para aplicar retención a trabajadores independientes,
incluyendo clasificación tributaria TI y aportes obligatorios.

![Configuración del tercero con clasificación TI y casillas marcadas para
aportes a pensión, salud y
ARL.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/calculo_ret_trab_indep.jpg)  

  * Cuando se desee utilizar en el componente de liquidación de impuestos, el concepto del renglón seleccionado debe estar configurado para que en sus condiciones de aplicación, esté que aplique a “TI”.
  

A continuación, se muestra una imagen donde se configura un concepto de
liquidación para que aplique a terceros con clasificación tributaria TI.

![Configuración del concepto de liquidación con condición de aplicación a
clasificación
TI.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/calculo_ret_trab_indep2.jpg)

---

# Trasladar saldos de una cuenta a otra en contabilización NIIF

Abre un asistente donde se permite la selección de una cuenta para cancelar y
una cuenta de contrapartida \(ambas en contabilización NIIF\), la cual
finalmente quedará con los saldos. Luego el sistema adicionará los movimientos
necesarios al listado, de forma detallada \(por tercero, CC, activo, etc.\) o
totalizada según se indique.

---

# Cargar saldos de cargue inicial NIIF

Permite cargar los saldos de los movimientos contables NIIF generados por las
demás operaciones de cargue inicial, incluyendo de cuentas, inventarios y
activos.  
  
Los asientos cargados servirán de referencia y análisis para poder completar
los asientos de contrapartida. Estos renglones que se cargan no serán
guardados, impresos, verificados o procesados con los demás datos de la
operación, sólo se tendrán en pantalla mientras se modifica.  
  

A continuación, se muestra una imagen con la opción para cargar los saldos
NIIF derivados del cargue inicial de cuentas, inventarios y activos, utilizada
como referencia para completar asientos de contrapartida.

![Pantalla del sistema para cargar saldos contables NIIF desde operaciones de
cargue
inicial.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/cargar_saldos_cargue_niif.jpg)

---

# Valor Base

Valor base de cálculo con el cual se determinó el valor del asiento contable.
Generamente este valor es requerido para las cuentas de impuestos como IVA,
retención, ICA, etc.  
  
Para las cuentas que no requieran valor base, es posible indicarlo a nivel
informativo; sin embargo, este dato no pasará al movimiento contable generado
por la operación al procesar.  
  

Ejemplo:

  
  

En un movimiento contable con valor de $19.000 correspondiente a un IVA del
19%, el valor base es $100.000.

---

# Trasladar saldos de una cuenta a otra en contabilización local

Abre un asistente donde se permite la selección de una cuenta para cancelar y
una cuenta de contrapartida \(ambas en contabilización local\), la cual
finalmente quedará con los saldos. Luego el sistema adicionará los movimientos
necesarios al listado, de forma detallada \(por tercero, CC, activo, etc.\) o
totalizada según se indique.

---

# Cargue inicial local-NIIF \(No usa equivalencias\)

  
  

Ejemplo:

  
  

Texto del ejemplo  

  * Opción 1
  * Opción 2
  * Opción 3

  
  

Configuración

  

Texto de configuración

---

# Ocultar renglón

Adiciona un comando de impresión al asiento del renglón actual, que lo oculta
para la impresión de documentos.  
  
Al activarse la invisibilidad para un renglón, éste se colorea de gris claro;
así se puede reconocer fácilmente los asientos que no se van a imprimir.  

A continuación, se muestra una imagen con un asiento contable cuyo renglón ha
sido marcado como invisible, y por tanto no se imprimirá.

![Renglón contable marcado en gris claro indicando que ha sido ocultado para
la
impresión.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/renglon_invisible.jpg)  
  
Al generar el documento \(En este caso un comprobante de egreso\), los
renglones invisibles no se imprimen.  

A continuación, se muestra una imagen del documento impreso en el que no
aparece el renglón marcado como invisible en el asiento contable.

![Documento generado donde no se imprime el renglón previamente marcado como
invisible.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV1%20-%20Movimiento%20contable/%5B14130%5D%20FrmOprMOV1/renglon_invisible2.jpg)

---

# Mostrar renglón

Elimina el comando de impresión que oculta para impresión el asiento del
renglón actual, que había sido incorporado previamente con el botón "Ocultar
renglón".

---

# Tercero transacción

Código del tercero con el cual se hizo la transacción o al cual se quiere
asociar el asiento contable. Solamente si la cuenta exige o maneja tercero,
este dato pasará al movimiento contable generado por la operación la procesar.  
  
Generalmente el tercero transacción se especifica en los asientos para cuentas
de impuestos, gastos, ingresos, costos y patrimonio.

---

# Fecha soporte

Fecha de soporte para la contabilización del asiento contable. Generalmente
todos los asientos contables de una misma operación se registran con la misma
fecha de la operación, sin embargo es posible modificar las fechas de algunos
asientos en particular para que tengan fechas distintas a la de la operación,
siempre y cuando estén dentro del mismo mes.  
  

Ejemplo:

  
  

Si la fecha de la operación es 15/04/2017, se puede asignar una fecha distinta
a cada movimiento siempre que esté dentro del mes 04 de 2017.

---

# Cartera y Proveedores - Tercero

Código del tercero al cual quedará asignada una cuenta por pagar o por cobrar.
Este tercero generalmente es igual al tercero transacción, pero puede ser
diferente, por ejemplo, para el caso de las cuentas por pagar por impuestos;
en cuyo caso el tercero transacción es el cliente y el tercero cartera es la
administración de impuestos.  
  
En una cuenta por cobrar, el tercero cartera será el responsable por pagar la
deuda; mientras en una cuenta por pagar, el tercero cartera será al que se
deberá pagar la deuda.

---

# Acerca de ventana

## MOVIMIENTO CONTABLE

##  Objetivo

Esta operación tiene como finalidad permitir al usuario realizar asientos
débitos y créditos sobre cualquier cuenta contenida en el catálogo de cuentas,
con cargo a cualquier centro de costos y a cualquier tercero. Esta es la
principal operación del módulo de contabilidad.  
La operación de movimiento contable registra información para otros módulos
diferentes al de contabilidad, como por ejemplo el módulo de ejecución
presupuestal, activos fijos, cartera y proveedores, conciliación bancaria,
costos de producción, inventarios y facturación entre muchos otros. La
operación de movimiento contable realiza los asientos contables afectando
tanto la contabilización local como la contabilización NIIF, todo a través de
un solo registro.  
Igualmente cuenta con la ventaja de poder marcar manualmente si el asiento
afectará tanto la contabilización local y como la NIIF, si solo afectará la
contabilización local o si solo afectará la contabilización NIIF.  
  

## Ejemplo de información a registrar

**Ejemplo de uso**  
  
La operación de movimiento contable se utiliza para registrar:  

Ejemplo:

  * Comprobantes de ingreso
  * Comprobantes de egreso
  * Recibos de caja
  * Notas de contabilidad, entre otros. 

A través de esta operación se puede registrar prácticamente cualquier tipo de
asiento contable. Basta con indicar el código de la cuenta a afectar, el
centro de costos al cual se cargará el asiento, el valor débito o crédito y el
tercero.  
  

## Definición de conceptos

**Encabezado de la operación**

  * **Tipo de documento de soporte**  
La operación de movimiento contable viene configurada por defecto con el tipo
de documento de soporte 210 Nota de contabilidad. Este documento puede ser
cambiado de acuerdo al tipo de transacción que se vaya a realizar, ya que la
operación de movimiento contable permite registrar asientos sobre cualquier
cuenta.

  

  * **Número de documento de soporte**  
El consecutivo será generado dependiendo del tipo de documento de soporte que
se indique a la operación. Y su máscara dependerá de la configuración del
mismo.

  

  * **Fecha de soporte de la operación**  
La fecha de soporte de la operación será la fecha en la que se contabilizará
el movimiento. Esta fecha debe ser la misma que tenga el documento origen de
la transacción. Por ejemplo, si se registra una factura de compra, la fecha de
la operación debe ser igual a la fecha de la factura.

## Secciones

## Sección movimiento contable

La operación de movimiento contable solo tiene un paso, y en este paso se
registra toda la información de la transacción. En la primera columna se
indica la cuenta contable sobre la cual se realizará el asiento. En la segunda
columna se registra el centro de costos sobre el cual se realizará el asiento,
esto en caso de que la cuenta exija centro de costos. En la siguiente columna
se indica el detalle de la operación, el cual saldrá impreso en el documento.
Luego se indica el asiento débito o crédito, el tercero de la transacción. Y
si aplica, se podrán indicar datos de cartera, de movimientos bancarios,
flujos de efectivo y/o de activos fijos.

## Documentos de impresión

La operación de movimiento contable solo se puede imprimir con los Driver de:  

  * Nota de contabilidad simple
  * Nota de contabilidad ampliada
  * Comprobante de egreso múltiples
  * Cheque 
  * Nota contable con cheque

---

# Empleado

Código y nombre del trabajador.  
  
Este campo es de solo lectura y su información es cargada directamente desde
la operación, de la columna tercero.

Ejemplo

La empresa CMB Muebles y Hogar necesita causar un gasto por reparaciones al
señor Fabián Castillo por valor de $7.500.000. Al realizar la operación, el
tercero indicado es el señor Fabián. En este caso, el dato que el sistema
cargará en este campo es el tercero Fabián Castillo.

Observaciones

Para modificar este campo, será necesario cambiar al tercero directamente
desde la operación.

---

# Pagos o abonos en cuenta

Valor total del pago que se realizará al trabajador.  
  
En este campo se carga de forma automática el valor base calculado en la
operación para el cálculo de la retención. De ser necesario, se puede
modificar. Este valor será utilizado para calcular el valor de la retención.

Ejemplo

La empresa CMB Muebles y Hogar necesita causar un gasto por reparaciones al
señor Fabián Castillo por valor de $7.500.000. Al realizar la operación, el
valor indicado como valor base para la retención son los $7.500.000. En este
caso, el dato que el sistema cargará en este campo son los $7.500.000.

Observaciones

Si este valor es modificado, la retención se calculará con base al nuevo valor
dado pero no se modificará el valor base cargado en la operación

---

# Valor UVT

Valor actual de la Unidad de Valor Tributario UVT.  
  
Este campo es de solo lectura y su información es cargada directamente desde
el valor asignado a la UVT en la configuración general del sistema. Este valor
será utilizado para verificar si el trabajador supera el tope para calcular la
retención.

Ejemplo

Año | UVT  
---|---  
2015 | $ 28.279  
2016 | $ 29.753  
2017 | $ 31.859  
2018 | $ 33.156  
  
Observaciones

El valor de la UVT varía cada año y \[ContaPyme\] a través de las
actualizaciones modifica de forma automática este valor.

Configuración

Para ingresar a la configuración de la UVT, ver:**\[Botón de aplicación >
Configuración > Indicadores generales del sistema\]**

---

# Aportes a pensión

Valor de los aportes a pensión hechos por el trabajador.  
  
En este campo se debe indicar el valor total de los pagos por concepto de
pensión que el trabajador ha realizado. Este valor será utilizado para
calcular el valor de la retención.

Ejemplo

La empresa CMB Muebles y Hogar necesita causar un gasto por reparaciones al
señor Fabián Castillo por valor de $7.500.000. El señor Fabián canceló por
concepto de pensión la suma de $300.000. En este caso, se debe colocar en este
campo $300.000.

---

# Aportes voluntarios a pensión

Valor de los aportes voluntarios a pensión hechos por el trabajador.  
  
En este campo se debe indicar el valor total de los pagos por concepto de
aportes voluntarios a pensión que el trabajador ha realizado. Este valor será
utilizado para calcular el valor de la retención.

Ejemplo

La empresa CMB Muebles y Hogar necesita causar un gasto por reparaciones al
señor Fabián Castillo por valor de $7.500.000. El señor Fabián canceló por
concepto de aportes voluntarios a pensión la suma de $1.500.000. En este caso,
se debe colocar en este campo $1.500.000.

---

# Depósitos en cuentas AFC

Valor de los aportes a cuentas AFC hechos por el trabajador.  
  
En este campo se debe indicar el valor total de los pagos por concepto de
aportes a cuentas AFC que el trabajador ha realizado. Este valor será
utilizado para calcular el valor de la retención.

Ejemplo

La empresa CMB Muebles y Hogar necesita causar un gasto por reparaciones al
señor Fabián Castillo por valor de $7.500.000. El señor Fabián canceló por
concepto de aportes a cuentas AFC la suma de $910.000. En este caso, se debe
colocar en este campo $910.000.

---

# Aportes a ARL

Valor de los aportes a ARL hechos por el trabajador.  
  
En este campo se debe indicar el valor total de los pagos por concepto de
aportes a ARL que el trabajador ha realizado. Este valor será utilizado para
calcular el valor de la retención.

Ejemplo

La empresa CMB Muebles y Hogar necesita causar un gasto por reparaciones al
señor Fabián Castillo por valor de $7.500.000. El señor Fabián canceló por
concepto de aportes a ARL la suma de $20.000. En este caso, se debe colocar en
este campo $20.000.

---

# Aportes a Salud

Valor de los aportes a salud hechos por el trabajador.  
  
En este campo se debe indicar el valor total de los pagos por concepto de
aportes a salud que el trabajador ha realizado. Este valor será utilizado para
calcular el valor de la retención.

Ejemplo

La empresa CMB Muebles y Hogar necesita causar un gasto por reparaciones al
señor Fabián Castillo por valor de $7.500.000. El señor Fabián canceló por
concepto de aportes a salud la suma de $375.000. En este caso, se debe colocar
en este campo $375.000.

---

# Recordar datos para el tercero

Active esta casilla para que el sistema guarde los datos registrados en esta
ventana, para el tercero.  
  
Al activar esta casilla, el sistema recordará los datos registrados en esta
ventana para el tercero, a excepción del dato "Pagos o abonos en cuenta", ya
que este dato es variable y depende de la operación. De esta forma al ingresar
nuevamente a calcular la retención para este tercero, los datos serán cargados
automáticamente.

Ejemplo

La empresa CMB Muebles y Hogar realiza contratos por prestación de servicio de
forma regular con el señor Fabián Castillo y debe calcular la retención a
trabajadores independientes cada vez que liquida los contratos con él. En este
caso, es recomendable que el cliente active esta opción para que el sistema
cargue de forma automática los valores relacionados con los aportes que el
tercero realiza.

Observaciones

Si no se activa esta opción, será necesario cargar los datos de los aportes de
forma manual cada vez que se realice el cálculo de retención con el tercero.

---

# Acerca de ventana

## CÁLCULO DE RETENCIÓN EN LA FUENTE PARA TRABAJADOR INDEPENDIENTE

##  Objetivo

Esta ventana tiene como finalidad calcular la retención en la fuente para
trabajador independiente. En esta ventana se indican todos los valores
necesarios para que el sistema verifique si aplica o no retención en la
fuente, y si aplica la calcule.  
  

## Ejemplo de información a registrar

Los datos principales que se deben indicar en esta ventana son: pago o abonos
en cuenta, aportes a pensiones, aportes voluntarios a pensión, depósitos en
cuentas AFC, aportes a ARL, aportes a salud.

Ejemplo:

Nombre del campo | Dato  
---|---  
Pagos o abonos en cuentas | 7.500.000  
Aportes a pensiones | 300.000  
Aportes voluntarios a pensiones | 1.500.000  
Depósitos en cuentas AFC | 910.000  
Aportes a ARL | 20.000  
Aportes a salud | 375.000  
  
  * **¿A quiénes se considera trabajadores independientes?**  
Un trabajador independiente es la persona o contratista que está vinculado por
medio de un contrato de servicios, y que recibe como remuneración honorarios o
simplemente un pago por servicios, o compensación por servicios como lo ha
denominado la ley 1819 de 2016.

  

  * **¿Qué es la retención a trabajadores independientes?**  
La ley 1819 de 2016 creó la posibilidad muy excepcional de aplicar la tabla de
retención en la fuente por salarios a los pagos que reciban las personas
consideradas trabajadores independientes. Esta retención en la fuente por
salarios se aplica cuando el pago mensual supera los 95 UVT, una vez depurado
con lo que la ley permite detraer, en tanto que la retención por honorario se
aplica desde cualquier monto, y por servicios a partir de 4 UVT, lo que
permite disminuir considerablemente el monto de las retenciones.

## Secciones

A continuación se describen los campos que se deben diligenciar en la ventana
de cálculo de retención en la fuente para trabajador independiente.

## Sección pagos o abonos en cuentas

En este campo se carga el valor base calculado en la operación para el cálculo
de la retención. De ser necesario, se puede modificar. Este valor será
utilizado para calcular el valor de la retención.  

## Sección aportes a pensiones

En este campo se debe indicar el valor total de los pagos por concepto de
pensión que el trabajador ha realizado  

## Sección aportes voluntarios a pensiones

En este campo se debe indicar el valor total de los pagos por concepto de
aportes voluntarios a pensión que el trabajador ha realizado.

## Sección depósitos en cuentas AFC

En este campo se debe indicar el valor total de los pagos por concepto de
aportes a cuentas AFC que el trabajador ha realizado.

## Sección aportes a ARL

En este campo se debe indicar el valor total de los pagos por concepto de
aportes a ARL que el trabajador ha realizado.

## Sección aportes a salud

En este campo se debe indicar el valor total de los pagos por concepto de
aportes a salud que el trabajador ha realizado.

---

# Arrastrar datos \(Ctrl-A\)

Copia el contenido del renglón superior en las celdas seleccionadas

Ejemplo

A continuación, se muestra una imagen del uso de la función 'Arrastrar datos'
\(Ctrl-A\), que copia automáticamente el contenido del renglón anterior en las
celdas seleccionadas.

![Ejemplo visual de cómo se copian los datos del renglón superior a celdas
seleccionadas con la opción
Arrastrar.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Arrastar.jpg)

Observaciones

Si selecciona varias columnas, la opción arrastrar copiará el contenido de la
fila previa a la selección de igual manera.

---

# Duplicar renglones \(Ctrl-D\)

Duplica la información de los renglones superiores en las celdas
seleccionadas.

Ejemplo

Duplicar 1 renglón:  
  

A continuación, se muestra una imagen con un renglón seleccionado antes de
aplicar la opción 'Duplicar renglones' \(Ctrl-D\).

![Selección de un renglón antes de duplicarlo con la opción
Ctrl-D.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Duplicar.jpg)  
  

A continuación, se muestra el resultado después de duplicar el contenido de un
renglón, donde los datos se copian al renglón siguiente.

![Resultado de duplicar un renglón, copiando su contenido al
siguiente.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Duplicar2.jpg)  
  
Duplicar múltiples renglones:  
  

A continuación, se muestra la selección de múltiples renglones antes de
aplicar la función 'Duplicar renglones' \(Ctrl-D\) sobre un grupo.

![Selección de varios renglones antes de usar la opción de duplicación
múltiple.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Duplicar3.jpg)  
  

A continuación, se muestra la imagen del resultado final tras aplicar la
duplicación de varios renglones, donde cada uno copia el contenido del renglón
superior correspondiente.

![Resultado de duplicar múltiples renglones con
Ctrl-D.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Duplicar4.jpg)

---

# Deshacer

Deshace el último cambio realizado sobre el listado de movimientos \(Ctrl-Z\).

Ejemplo

Texto del ejemplo  

Observaciones

Permite deshacer hasta 100 modificaciones, sin incluir eliminación o inserción
de renglones completos.

---

# Copiar

Copia el contenido de la\(s\) celda\(s\) seleccionada\(s\) al portapapeles
\(Ctrl-C\)  

A continuación, se muestra una imagen con la opción de copiar al portapapeles
\(Ctrl-C\) el contenido de una o varias celdas seleccionadas, para luego
pegarlo en otras aplicaciones.

![Botón o comando para copiar al portapapeles las celdas seleccionadas en la
interfaz.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Copiar.jpg)

Ejemplo

Texto del ejemplo

Observaciones

Una vez la información se encuentra en el portapapeles, puede ser "Pegada"
\(Crtl+V\) en otro programa, como: Excel, ContaExcel, Word, etc.  
  
**Seleccionar varias celdas usando el teclado:**  
Ubique el cursor en la primer celda de la selección,  
Presione la tecla "Shift" y manténgala presionada,  
Desplace el cursor usando las flechas del teclado \(puede seleccionar bloques
de renglones usando la tecla "Página abajo"\),  
Finalmente suelte la tecla "Shift".

---

# Pegar

Pega en la posición actual, el contenido del portapapeles \(Ctrl-V\)

Ejemplo

A continuación, se muestra una imagen del uso de la función Pegar \(Ctrl-V\),
que inserta el contenido copiado previamente desde Excel u otro origen en la
posición actual seleccionada en la tabla.

![Pegar contenido desde el portapapeles en la posición actual de la
tabla.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Pegar.jpg)  
  
En el ejemplo anterior se han copiado previamente los dos primeros renglones
\(Ctrl+C\).  

Observaciones

Cuando los datos han sido copiados en Excel, tenga en cuenta que
ocasionalmente los valores numéricos y monetarios pueden tener un formato
especial, el cual \[CONTAPYME\] no logra adecuar, por tanto, es muy
recomendable que los copie sin formatos especiales.

---

# Formato a celdas

Activa o desactiva formato de celdas \(mas rápido sin formatos\).  
  
Las columnas de datos de las tablas pueden contener muy variada información.
Textos, números, fechas y códigos. Cuando se entra en modo de edición en las
columnas de códigos, el sistema siempre presentará el código del registro al
que se esté haciendo referencia. Al salir del modo de edición, el sistema
podrá presentar en la celda el nombre \(al que corresponde el código\) o el
código mismo, según el estado de esta opción:

## Opción activada

Cuando está activada la opción "Formato a celdas y la columna es
suficientemente ancha se visualiza el nombre interpretado de los códigos.  
  
![Formato_celdas.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Formato_celdas.jpg)  
  

## Opción desactivada

Cuando está desactivada la opción "Formato a celdas o

Cuando la columna es muy estrecha, se visualizan los códigos.  
  
![Formato_celdas2.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Formato_celdas2.jpg)  
  
El ancho de una columna se modifica posicionando el mouse sobre el límite
derecho del encabezado de la columna y arrastrando con el botón izquierdo del
mouse.  
  
![Formato_celdas3.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Formato_celdas3.jpg)

Ejemplo

Texto del ejemplo  

Observaciones

Si tiene mucha información en una tabla y experimenta algo de lentitud, puede
ser conveniente desactivar esta opción.

Configuración

Para guardar el ancho de las columnas, entre por: **\[Menú: Operación >
Guardar la presentación\].**

---

# Color a renglones

Le pone color a los renglones pares.  
Al activar esta opción, el sistema colorea los renglones alternos para
facilitar la ubicación y el análisis de los datos en un registro específico.  
  
![Color_Rows.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Color_Rows.jpg)

Ejemplo

Texto del ejemplo

Observaciones

Si la opción está desactivada, el sistema colorea con el color de fondo
predeterminado, todos los renglones editables.

---

# Generar mov. de ajuste

Genera el movimiento contable de ajuste, para igualar el extracto bancario con
la contabilidad del sistema.  
El sistema registra de forma automática los rendimientos financieros y los
gastos bancarios. Para que el sistema registre estos datos de forma
automática, algunos datos como las cuentas a afectar y centro de costos, deben
estar parametrizadas con anterioridad en el catálogo de tipos de movimiento
bancario de la cuenta en particular, específicamente en las notas débito y
crédito.

Ejemplo

El extracto bancario registra notas débito y crédito por $100.000, que son
intereses pagados y gastos bancarios, valores que aún no están contabilizados;
pero que por medio de esta opción, se podrá generar el movimiento contable.

---

# Autogenerar movimiento de ajuste

Genera el movimiento contable de ajuste automáticamente, para igualar el
extracto bancario con la contabilidad del sistema.  
El sistema registra de forma automática los rendimientos financieros y los
gastos bancarios. Para que el sistema registre estos datos de forma
automática, algunos datos como las cuentas a afectar y centro de costos, deben
estar parametrizadas con anterioridad en el catálogo de tipos de movimiento
bancario de la cuenta en particular, específicamente en las notas débito y
crédito.

Ejemplo

El extracto bancario registra notas débito y crédito por $100.000, que son
intereses pagados y gastos bancarios, valores que aún no están contabilizados;
pero que por medio de esta opción, de forma automática, se generará el
movimiento contable.

Observaciones

Si hay alguna celda en rojo, desactive el botón "Autogenerar" y haga la
corrección \(deje desactivo el botón autogenerar\).

---

# Dejar movimiento pendiente

Marca el movimiento seleccionado como "movimiento pendiente", es decir, no se
tendrá en cuenta para esta conciliación y se anexará automáticamente en la
próxima conciliación bancaria de la cuenta.

Ejemplo

En el extracto bancario aparece una consignación de un cliente que aún no se
ha identificado; esta debe quedar pendiente para la próxima conicliación.

---

# Cuenta de conciliación

Cuenta que se va a conciliar. Al abrir el seleccionador, el sistema
redirecciona al catálogo de cuentas de conciliación para elegir la cuenta
correspondiente.

Ejemplo

Se va a conciliar la cuenta del Banco Nacional \(11100505\)  **Código cuenta** | **Nombre cuenta**  
---|---  
11100505 | Banco Nacional  
  
Observaciones

Las cuentas de banco que se van a conciliar, deben estar creadas en el
catálogo de Plan de cuentas.  
  
Las cuentas de banco que se van a conciliar, deben estar creadas previamente
en el catálogo de cuentas de conciliación.

Configuración

Para crear la cuenta de conciliación bancaria, ver: **\[Contabilidad > Cuentas
de conciliación > Crear\]**

---

# Fecha

Fecha de soporte para la contabilización del asiento contable que genera la
conciliación bancaria. Generalmente todos los asientos contables de una misma
operación se registran con la misma fecha de la operación, sin embargo es
posible modificar las fechas de algunos asientos en particular en la ventana
de ajustes de conicliación, para que tengan fechas distintas a la de la
operación, siempre y cuando estén dentro del mismo mes.

Ejemplo:

Si se va a realizar la conciliación del mes de enero de 2018, en la fecha de
soporte se debe indicar el último día del mes a conicliaciliar. En este caso
31/01/2018.

---

# Tipo de conciliación bancaria a realizar

En el campo tipo de conciliación a realizar se encuentran dos opciones: manual
o automática. Solo cuando se cuenta con el módulo de conciliación bancaria
automática, aparece la opción de automática.

Ejemplo

Se descarga de la plataforma de BANCOLOMBIA el extracto bancario en formato
XLS, por tanto, se cuenta con el extracto de forma digital; adicional, se
cuenta con el módulo de conciliación bancaria automática. Basta con
seleccionar la opción de tipo de conicliación automática.

Observaciones

Para realizar la conciliación bancaria automática, se debe contar con el
módulo correspondiente.

---

# Tipo movimiento

Este dato determina si el movimiento con la cuenta de bancos corresponde, por
ejemplo, a una consignación, cheque, pago con tarjeta débito, etc.  
  
El tipo de movimiento bancario es de suma importancia cuando se tiene
habilitado el control de conciliación bancaria y periódicamente se registra
operaciones de conciliación, facilitando el análisis de movimientos en el
sistema respecto a los del extracto bancario.  
  
El tipo de movimiento puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección del catálogo de tipos de
movimiento bancario generales, o si la cuenta es de conciliación, del catálogo
de tipos de movimiento bancario particulares para la cuenta.  
  

A continuación, se muestra una imagen con el selector de tipos de movimiento
bancario, que permite elegir entre opciones como cheque, consignación o
tarjeta débito para operaciones contables.

![Ventana de selección de tipos de movimiento bancario como cheque,
consignación o tarjeta
débito.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/col_ibanco2.jpg)

Ejemplo

Se está realizando una operación de movimiento contable. Se indica la cuenta
de banco 11100505 de Bancolombia, si se tiene habilitada la configuración de
exigir tipo de movimiento bancario, se debe indicar el movimiento
correspondiente, en este caso se indica que es un Cheque.  

Configuración

Para modificar la configuración general de conciliación bancaria, ingrese a
**\[Plan de cuentas > Configuración > Conciliación bancaria\]**  
  
Para modificar los tipos de movimiento de conciliación bancaria generales,
ingrese a **\[Pestaña Contabilidad > Plan de Cuentas para desplegar menú >
Definición de tipos de movimiento bancario generales\]**

---

# Número

Número del cheque, consignación, comprobante, número de aprobación o documento
referencia de la transacción bancaria.

Ejemplo

El banco descuenta $25.000 por concepto de comisión interbancaria, en este
campo se indica el número de la transacción que trae por defecto, ejemplo:
10254

---

# Valor

Valor numérico del movimiento del banco que se carga automáticamente de la
operación registrada en el sistema.

Ejemplo

La empresa MP Computadores, descarga el extracto bancario para el mes de
enero, de la plataforma de BANCOLOMBIA. El extracto bancario tiene en su
estructura la columna de Valor, como por ejemplo:  
Cuenta del banco | Tipo de movimiento bancario | Valor  
---|---|---  
11050501 | CH | 250.000  
11050501 | CI | 350.000  
11050501 | TD | 300.000

---

# ILinea

Texto de la ayuda del control

Ejemplo

Texto del ejemplo  

Observaciones

Texto de de observaciones

Configuración

Texto de configuración **Ruta configuración**

---

# ILineaMov

Texto de la ayuda del control

Ejemplo

Texto del ejemplo  

Observaciones

Texto de de observaciones

Configuración

Texto de configuración **Ruta configuración**

---

# Descripción del movimiento contable seleccionado

Muestra todos los datos de la operación registrada en el sistema con la cuenta
del banco que se está conciliando.  
Al ubicarse sobre un renglón de los movimientos contables de la cuenta del
banco, el sitema le muestra en este campo el número de operación,  
fecha de operación, tipo de documento,número de documento, detalle de
movimiento,detalle de la operación, tercero, cuenta y débito de esa cuenta.  

Ejemplo

El 23 de junio de 2018, se registra en el el sistema un comprobante de egreso
con la cuenta de banco "11100510" por un crédito de $150.000.  
Por tanto en la descripción se va mostrar todo el detalle de este comprobante,
de la siguiente manera:  

A continuación, se muestra una imagen con la descripción automática que genera
el sistema para un movimiento contable seleccionado en la cuenta bancaria,
mostrando información como fecha, tipo de documento, valor y tercero asociado.

![Detalle del movimiento contable seleccionado, incluyendo número, fecha, tipo
de documento, cuenta y
tercero.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/descripcion.jpg)  
  

Observaciones

Los datos que muestra el sistema en el campo "Descripción del movimiento
contable seleccionado" son automáticos y los arrastra de la operación del
sistema

---

# Fecha

Fecha del movimiento que registra en el extracto bancario

Ejemplo

La empresa MP Computadores genera un comprobante de ingreso con la cuenta del
banco "11100510"  
del cliente Solucionespc S.a el día 22 de enero de 2018. Esta misma fecha es
recepcionada por el banco y se evidencia en el  
extracto bancario.  

Observaciones

La fecha el sistema la toma automáticamente del extracto bancario descargado
por el cliente de la plataforma del banco

---

# MOVIMIENTO BANCO - Tipo mvto.

Código del tipo de movimiento bancario registrado en el extracto bancario.
Este dato determina si el movimiento con la cuenta de bancos corresponde, por
ejemplo, a una consignación, cheque, pago con tarjeta débito, etc.  

A continuación, se muestra la ventana de selección para asignar el tipo de
movimiento bancario registrado en el extracto, como CH para cheque, CI para
consignación o TD para tarjeta débito.

![Selector del tipo de movimiento bancario utilizado en el extracto bancario,
como cheque o
consignación.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/col_ibanco2.jpg)  
  

Ejemplo

La empresa MP Computadores, descarga el extracto bancario para el mes de
enero, de la plataforma de BANCOLOMBIA. El extracto bancario tiene en su
estructura la columna de tipo de movimiento bancario, como por ejemplo:  
Código Tipo de movimiento bancario | Nombre Tipo de movimiento bancario  
---|---  
CH | Cheque  
CI | Depósitos bancarios y consignaciones  
TD | Tarjeta débito  
  
Observaciones

El tipo de movimiento bancario es de suma importancia cuando se tiene
habilitado el control de conciliación bancaria y periodicamente se registra
operaciones de conciliación, facilitando el análisis de movimientos en el
sistema respecto a los del extracto bancario.

---

# Número

Número del cheque, consignación, comprobante, número de aprobación o documento
referencia de la transacción bancaria.

Ejemplo

El banco BBVA, descuenta $25.000 por concepto de comisión interbancaria, en
este campo se muestra el número de la transacción, ejemplo: 10254

---

# Valor

Valor numérico del movimiento del banco que se importa automáticamente del
extracto bancario.

Ejemplo

La empresa MP Computadores, descarga el extracto bancario para el mes de
enero, de la plataforma de BANCOLOMBIA. El extracto bancario tiene en su
estructura la columna de Valor, como por ejemplo:  
Cuenta del banco | Tipo de movimiento bancario | Valor  
---|---|---  
11050501 | CH | 250.000  
11050501 | CI | 350.000  
11050501 | TD | 300.000

---

# Descripción

Muestra la descripción del movimiento del extracto bancario.

Ejemplo

Descripción o detalle del extracto bancario:  

A continuación, se muestra una imagen del área donde se visualiza la
descripción del movimiento dentro del extracto bancario, como referencia de la
transacción registrada por el banco.

![Campo que muestra la descripción o detalle del movimiento en el extracto
bancario.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/descripcion1.jpg)

Observaciones

Cuando la descripción no se muestra en una nueva columna, se puede visualizar
en la parte inferior de la ventana del movimiento del extracto bancario.

---

# Estado

Marca todos los movimientos de forma automática.  
Al utilizar los botones "Sincronizar" o "Relacionar los movimientos
seleccionados", el sistema de forma automática marca el estado, dependiendo de
tipo movimiento, y parametrización de tipos de movimientos de la cuenta de
conciliación.

Ejemplo

El sistema cuenta con cuatro estados que realaciona de forma automática:  

A continuación, se muestra una imagen con los estados que el sistema puede
asignar automáticamente al conciliar movimientos bancarios, y que también
pueden ser seleccionados manualmente si la conciliación no es automática.

![Listado de estados que pueden ser asignados automáticamente o seleccionados
manualmente en la conciliación
bancaria.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/estado.jpg)

Observaciones

Al realizar la operación de concilaición bancaria automática, el sistema no
permite seleccionar manualmente el estado.

---

# Descripción del movimiento del extracto seleccionado

Muestra el detalle o descripción del movimiento en el extracto bancario.

Ejemplo

El 23 de junio de 2018, se registra en el el sistema un pago con tarjeta de
crédito por $150.000.  
Por tanto en la "Descripción del movimiento del extracto seleccionado" se va
mostrar el detalle de este movimiento, según lo registrado en el extracto
bancario:  

A continuación, se muestra una imagen del detalle del movimiento seleccionado
en el extracto bancario, el cual es importado automáticamente por el sistema
para su visualización.

![Campo que muestra el detalle del movimiento importado desde el extracto
bancario.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/descripcion2.jpg)  

Observaciones

Los datos que muestra el sistema en el campo "Descripción del movimiento del
extracto seleccionado" son automáticos y el sistema los importa del extracto
bancario

---

# Fecha de conciliación

Fecha de corte o fecha hasta la cual se tomará el saldo de la cuenta de banco.
Normalmente se realiza a final de mes cuando el banco ha emitido el extracto
bancario con los respectivos valores del mes y el saldo final de la cuenta.

Ejemplo

Se va a realizar la conicliación bancaria automática del mes de enero de 2018;
por tanto, la fecha que se debe indicar es: **31/01/2018** y de esta manera
cargarán todos los movimientos del mes de enero de 2018.

Observaciones

Tenga en cuenta que el sistema carga el saldo de la cuenta de conciliación
hasta la fecha dada en esta casilla, la cual es independiente de la fecha de
la operación.

---

# Saldo extracto bancario

Saldo final de la cuenta de banco a la fecha de conciliación, que viene en el
extracto bancario.

Ejemplo

Se descarga de la plataforma de Bancolombia, el extracto bancario desde 31 de
marzo de 2016 a 30 de junio del mismo año.  

A continuación, se muestra una imagen de un extracto bancario descargado desde
la plataforma de Bancolombia, que incluye el saldo final al cierre del periodo
de conciliación.

![Vista del extracto bancario con el saldo final a la fecha de
conciliación.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/saldo.png)

Observaciones

Se debe tener en cuenta que los bancos pueden enviar el extracto bancario de
forma digital o también de forma física

---

# Asignar diferencia \(Ctrl+E

Asigna la diferencia al renglón actual del movimiento \(Ctrl-E\)  
  
Asigna la diferencia que existe entre el total de débitos y créditos, al
renglón actual del movimiento. El sistema sumará la diferencia a la casilla
débito o crédito, según si es negativa o positiva. Después de hacer esto, el
movimiento de la operación quedará cuadrado.

Ejemplo

Se está realizando un débito a la cuenta del banco 11050501 por $62.000, basta
con indicar en el renglón siguiente la cuenta de contrapartida, para este
ejemplo la 421005 y después dar clic en el botón "Asignar diferencia". De esta
manera, el sistema ajusta de forma autómática el crédito por $62.000.  

Observaciones

Se puede utilizar el botón "Asignar diferencia" para igualar débitos y
créditos de forma automática; pero también se puede realizar de forma manual.

---

# Moneda

Permite indicar el tipo de moneda con la cual se registrará la operación  
Al procesarse esta operación, el sistema convertirá todos los valores
monetarios a la unidad de moneda local, antes de asentar los movimientos; sin
embargo, esto no afecta los valores ingresados por el usuario en esta
operación.

Ejemplo

Código | Nombre  
---|---  
10 | Peso  
20 | Dolar  
30 | Euro  
  
Observaciones

Todos los valores monetarios de la operación deberán ser registrados en la
unidad de moneda especificada en este campo. Si no se usa una moneda
extranjera, se debe indicar en el campo la moneda local.

Configuración

Texto de configuración **Ruta configuración**

---

# Copiar

Permite copiar los movimientos seleccionados al portapapeles.

Ejemplo

La empresa MP Computadores recarga el movimiento contable en la operación de
Conciliación bancaria y desea corroborar la información desde excel, por
tanto, selecciona todos los movimientos y con el botón "Copiar" los guarda en
el portapapeles, para luego pegarlo en excel.  

A continuación, se muestra una imagen con la opción 'Copiar' que permite
enviar los movimientos seleccionados al portapapeles para pegarlos en
aplicaciones como Excel o Word.

![Botón 'Copiar' utilizado para copiar movimientos contables al portapapeles
desde la conciliación
bancaria.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Copia1.jpg)  

Observaciones

Una vez la información se encuentra en el portapapeles, puede ser "Pegada"
\(Crtl+V\) en otro programa, como: Excel, ContaExcel, Word, etc.

---

# Cargar extracto bancario

Carga el extracto bancario de un archivo externo \(XLS, CSV, o TXT\), según la
parametrización de la cuenta de conciliación.

Ejemplo

El empleado Juan Perez, de la empresa MP Computadores, descarga el extracto
bancario del mes de enero, desde la plataforma de Bancolombia, lo almacena en
una carpeta "Extractos" ubicada en el escritorio del computador. La ruta fue
parametrizada previamente en la cuenta de conciliación.  
Basta con dar clic en el botón "Cargar extracto bancario" y seleccionar el
archivo descargado y almacenado en la carpeta, para importar de forma
automática todos los movimientos del extracto.

Observaciones

Se puede cargar el formato digital de una ruta previamente establecida en la
configuración de la cuenta de conciliación o también se puede seleccionar la
ruta manualmente.

---

# Insertar renglones

Adiciona un movimiento al listado del extracto bancario.

Ejemplo

Texto del ejemplo

Observaciones

Las filas que se adicionan, siempre quedan al final del listado.

---

# Borrar renglones \(Ctrl+L\)

Elimina los movimientos bancarios seleccionados \(Ctrl-L\).

Ejemplo

Después de importar al sistema el extracto bancario descargado de la
plataforma de Bancolombia, se encontró un renglón adicional, con fecha pero
sin saldo, ni tipo de movimiento. En este caso se puede utilizar esta
herramienta para cortar ese renglón y poder realizar la sincronización.

Observaciones

Para eliminar los renglones seleccionados, puede hacerlo por medio de este
botón o seleccionando las teclas \(Ctrl-L\)

---

# Copiar

Copia el contenido de los movimientos seleccionados al portapapeles
\(Ctrl-C\).  

A continuación, se muestra una imagen del botón 'Copiar', utilizado para
enviar al portapapeles los movimientos contables seleccionados y pegarlos en
otras aplicaciones como Excel o Word.

![Botón de la interfaz que permite copiar movimientos contables seleccionados
al
portapapeles.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Copiar.jpg)

Ejemplo

Texto del ejemplo

Observaciones

Una vez la información se encuentra en el portapapeles, puede ser "Pegada"
\(Crtl+V\) en otro programa, como: Excel, ContaExcel, Word, etc.  
  
**Seleccionar varias celdas usando el teclado:**  
Ubique el cursor en la primer celda de la selección,  
Presione la tecla "Shift" y manténgala presionada,  
Desplace el cursor usando las flechas del teclado \(puede seleccionar bloques
de renglones usando la tecla "Página abajo"\),  
Finalmente suelte la tecla "Shift".

---

# Pegar

Permite pegar desde Exel el movimiento del extracto bancario \(Ctrl-V\) \(las
columnas deben corresponder en orden a las del extracto bancario\).

Ejemplo

A continuación, se muestra una imagen del proceso de pegado \(Ctrl+V\) de
renglones del extracto bancario previamente copiados desde Excel, respetando
el orden de columnas del sistema.

![Pegar movimientos del extracto bancario desde Excel al sistema, manteniendo
el orden de
columnas.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Pegar.jpg)  
En el ejemplo anterior se han copiado previamente los dos primeros renglones
\(Ctrl+C\).  

Observaciones

Cuando los datos han sido copiados en Excel, tenga en cuenta que
ocasionalmente los valores numéricos y monetarios pueden tener un formato
especial, el cual \[CONTAPYME\] no logra adecuar, por tanto, es muy
recomendable que los copie sin formatos especiales.

---

# Color a renglones

Le pone color a los renglones de los tipos de movimiento bancario, según la
parametrización de tipos de movimientos de la cuenta de conciliación.

Ejemplo

En el tipo de movimiento bancario: GB\(Gastos bancarios\), se definió el color
de fondo rojo; por tanto en la operación, los Gastos bancarios estarán
marcados con este color, si se tiene habilitada esta opción.

Configuración

Para modificar los tipos de movimiento de la cuenta de conciliación, ingrese
a: **\[Pestaña Contabilidad > cuentas de conciliación > Definicón de tipos de
movimiento bancario **

---

# Ver descripción

Muestra u oculta la descripción del movimiento del extracto bancario, en una
nueva columna.

Ejemplo

Se pretende visualizar la descripción de los movimientos del extracto
bancario, al lado del tipo de movimiento, número y valor. Para ello es
necesario activar esta opcón y así en una nueva columna registrará la
descripción, al frente de cada movimiento.

Observaciones

Cuando la descripción no se muestra en una nueva columna, se puede visualizar
en la parte inferior de la ventana del movimiento del extracto bancario.

---

# Exportar a excel

Genera a Excel los movimientos contables vs. los movimientos del extracto
bancario; lo que permite realizar un comparativo mas detallado y formulado,
desde una hoja de excel.

Ejemplo

La empresa MP Computadores, encuentra una diferencia de $500.000 entre el
saldo del movimiento contable y del extracto bancario. El auxiliar contable,
decide exportar los movimientos registrados en la contabilidad y en el
extracto bancario a excel, para realizar el comparativo detalladamente y
encontrar dicha diferencia; para ello, basta con dar clic en el icono de excel
y sistema le genera un archivo xls, que trae ambos movimientos.  

Observaciones

El sistema almacena por defecto el archivo de excel en la ruta dónde se
encuentra instalada la base de datos: "C:\ProgramData\InSoft\Datos
V4\ContaPyme\CLIENTE\AREAS\Documentos\Mis Archivos\Conciliación bancaria
Cuenta 11100510 a 31-Ene-2019"

---

# Formato Movimiento

Las columnas de datos de las tablas pueden contener muy variada información.
Textos, números, fechas y códigos.  
  
Cuando se entra en modo de edición en las columnas de códigos, el sistema
siempre presentará el código del registro al que se esté haciendo referencia.  
  
Al salir del modo de edición, el sistema podrá presentar en la celda el nombre
\(al que corresponde el código\) o el código mismo, según el estado de esta
opción:

## Opción activada

Cuando está activada la opción "Formato a celdas y la columna es
suficientemente ancha se visualiza el nombre interpretado de los códigos.  
  
**Nota:** Si tiene mucha información en una tabla y experimenta algo de
lentitud, puede ser conveniente desactivar esta opción.  
  

A continuación, se muestra una imagen con el formato activado, en el cual las
celdas despliegan los nombres asociados a los códigos cuando la columna es lo
suficientemente ancha.

![Vista de tabla con celdas mostrando nombres interpretados cuando la opción
de formato está
activada.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Formato_celdas.jpg)

## Opción desactivada

Cuando está desactivada la opción "Formato a celdas o

Cuando la columna es muy estrecha, se visualizan los códigos.  
  

A continuación, se muestra una imagen donde las celdas presentan solo los
códigos, debido a que la opción de formato está desactivada o la columna es
demasiado estrecha.

![Vista de tabla con códigos visibles cuando el formato está desactivado o la
columna es muy
estrecha.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Formato_celdas2.jpg)  
  
El ancho de una columna se modifica posicionando el mouse sobre el límite
derecho del encabezado de la columna y arrastrando con el botón izquierdo del
mouse.  
  

A continuación, se muestra una imagen del procedimiento para ajustar
manualmente el ancho de una columna, posicionando el mouse sobre el borde del
encabezado.

![Ajuste del ancho de una columna arrastrando el borde del encabezado con el
mouse.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/Formato_celdas3.jpg)  
  
Para guardar el ancho de las columnas, entre por **\[Menú: Operación > Guardar
la presentación\]**.

---

# Sincronizar

Relaciona de forma automática los movimientos de la contabilidad con los del
extracto bancario y los marca como movimientos conciliados.

Ejemplo

Después de tener los registros contables y movimientos del extracto bancario,
se relacionan de forma automática con la opción de **sincronizar**  

A continuación, se muestra una imagen del proceso de sincronización automática
que relaciona movimientos contables con los del extracto bancario y los marca
como conciliados, siempre que coincidan en número y valor.

![Vista del proceso de sincronización entre los movimientos contables y los
del extracto
bancario.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/sincronizar.png)

Observaciones

Para hacer dicha relación, el sistema toma el dato del número del movimiento y
el valor. Si alguno de estos datos no coincide, el movimiento no será marcado
como conciliado.

---

# Quitar relaciones

Quitar todas las relaciones de los movimientos. Esta opción, desmarca todos
los movimientos ya marcados como conciliados.

Ejemplo

Se sincroniza de forma automática los movimientos de la contabilidad con los
del extracto bancario; pero se encontró que es necesario ingresar alunos
movimientos al sistema y recragar, para luego realizar de nuevo la
sincronización. En este caso se puede quitar la realación, realizar la
modificación y luego volver a sincronizar.

A continuación, se muestra una imagen de la opción 'Quitar relaciones', que
permite eliminar todas las relaciones de conciliación para volver a cargar o
modificar movimientos antes de sincronizar nuevamente.

![Opción del sistema para quitar las relaciones de conciliación entre los
movimientos contables y
bancarios.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/quitarrelacion.png)  

Observaciones

Al aplicar esta opción, se quitan las relaciones de todos los movimientos, sin
excepción.

---

# Relacionar movimientos seleccionados

Permite relacionar un movimiento contable con uno o varios movimientos del
extracto o viceversa.

Ejemplo

Se contabiliza una consignación; pero se digita mal el número de la
transacción, se puede establecer la relación de ambos movimientos manualmente
por medio de esta opción. El movimiento quedará marcado como movimiento con
alguna diferencia pero igualmente será conciliado.  

Observaciones

Esta opción puede ser útil en el caso que después de haber hecho la relación
automática, hayan quedado algunos movimientos sin relacionar porque algunos de
los datos no coinciden.

---

# Quitar relación

Quitar la relación al movimiento contable seleccionado. Desmarca un movimiento
marcado como conciliado.

Ejemplo

A continuación, se muestra una imagen de la opción que permite quitar la
relación de conciliación únicamente del movimiento contable seleccionado.

![Opción para quitar la relación de conciliación del movimiento contable
seleccionado.](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/Oprs/MOV9%20-%20Conciliacion%20bancaria/%5B14270%5D%20FrmOprMOV9/relacion.png)

Observaciones

Al aplicar esta opción, se quita la relación solamente del movimiento
seleccionado.

---

# Borrar renglones \(Ctrl+L\)

Elimina los renglones seleccionados dentro de los movimientos del extracto
bancario.

Ejemplo

Después de importar al sistema el extracto bancario descargado de la
plataforma de Bancolombia, se encontró un renglón adicional, con fecha pero
sin saldo, ni tipo de movimiento. En este caso se puede utilizar esta
herramienta para cortar ese renglón y poder realizar la sincronización.  

Observaciones

Para eliminar los renglones seleccionados, puede hacerlo por medio de este
botón o seleccionando las teclas \(Ctrl-L\)

---

# Insertar renglones

Inserta renglones según la selección. Adiciona un movimiento al listado del
extracto bancario

Ejemplo

Texto del ejemplo  

Observaciones

Las filas que se adicionan, siempre quedan al final del listado.

---

# Cód. Moneda

Código o identificación de la moneda, con el cual será reconocida

Ejemplo

\[ContaPyme\] cuenta con un catálogo monedas, preconfigurado:

Código | Nombre  
---|---  
10 | Peso  
20 | Dolar  
30 | Euro  
  

Observaciones

Aunque \[ContaPyme\] ya cuenta con una catálogo monedas pre configurado, el
usuario puede crear tantas monedas como requiera o modificar aquellas que ya
tiene el sistema.

---

# Centro de costos para ajustes por diferencias en cambio

Centro de costos en el que el sistema ajusta el valor en moneda local de la
tasa de cambio actualizada.

Ejemplo

Texto del ejemplo

Observaciones

Por defecto la opción de centro de costos para ajustes, se encuentra
deshabilitada; sin embargo, desde la configuración del plan de cuentas puede
activarle al sistema que los ajustes se realicen en la operación de tasa de
cambio y de esta forma se activa el centro de costos a imputar en la operación
de tasa de cambio.

Configuración

Para activar la opción de ajustes por registro de tasa de cambio:**\[Catálogo
de Plan de cuentas > Configuración > Ajuste de diferencia por cambio de
moneda\]**

---

# Acerca de ventana

## REGISTRO DE TASAS DE CAMBIO

##  Objetivo

## Ejemplo de información a registrar

**Ejemplo de uso**  
  
La operación de registro de tasas de cambio se utiliza para registrar:  

Ejemplo:

## Definición de conceptos

**Encabezado de la operación**

## Secciones

##

## Documentos de impresión

---

# Acerca del módulo

## MÓDULO DE CONTABILIDAD

## Explicación conceptual

El módulo de contabilidad es uno de los principales módulos del sistema ya que
permite a los usuarios registrar todas las transacciones comerciales y
contables que se van generando a medida que van trabajando y desempeñando sus
labores y generar todos los informes contables necesarios para la empresa y su
entorno económico.  
  
El módulo de contabilidad permite agilizar los procesos operativos, mantener
ordenada y al día la información, llevar un completo control de dicha
información y realizar de forma fácil y a través de un solo registro los
asientos para la contabilización local y NIIF.  
  
Por medio de la operación de movimiento contable el usuario podrá registrar
cualquier tipo de asiento contable, con afectación a otros módulos del sistema
como por el módulo de ejecución presupuestal, activos fijos, cartera y
proveedores, conciliación bancaria, costos de producción, inventarios y
facturación entre muchos otros.  
  
Adicionalmente el módulo de contabilidad ofrece un sistema de cálculo
automático de impuestos inteligente, fácil y listo para usar, basado en reglas
las cuales el usuario puede configurar según sus requerimientos. Igualmente el
usuario podrá imprimir todos los soportes contables en cualquier impresora.  
  
Los usuarios podrán llevar el control de toda la información y realizar
procesos de auditoría y revisión a través de la herramienta Drill Down
incorporada en todos los informes de consulta con los que cuenta el sistema.
Con un solo clic el usuario podrá obtener todos los estados financieros,
libros legales y reportes necesarios para la correcta presentación de sus
obligaciones legales y financieras.

## Catálogo de plan de cuentas

El catálogo de plan de cuentas contiene el listado de las cuentas contables
del PUC y desde allí el usuario podrá crear y configurar las cuentas
auxiliares que posteriormente utilizará en los asientos contables.  
  
Es necesario crear las cuentas auxiliares adicionales a utilizar ya que el
plan de cuentas que proporciona el sistema se entrega con un nivel de detalle
de 6 dígitos. Para llevar un mayor nivel de detalle se recomienda crear
cuentas auxiliares.  
Código cuenta | Nombre cuenta  
---|---  
1110 | Bancos  
111001 | Banco Nacional  
111002 | Banco de Colombia  
111003 | Banco del Pueblo  
  
  

## Catálogo de conceptos de liquidación

El catálogo de conceptos de liquidación contiene un conjunto de reglas que se
basan en unas condiciones para calcular los impuestos que se generan en las
entradas y salidas de dinero que genera la empresa. Además de calcular
impuestos, permiten otros cálculos automáticos como por ejemplo descuentos
condicionados en las ventas.  
  
Es necesario configurar a cada concepto a utilizar, las cuentas contables a
las cuales serán llevados los impuestos. A pesar de que todos los conceptos de
liquidación ya tienen las cuentas configuradas, es necesario verificar que las
cuentas sean iguales a las que la empresa desea utilizar. El usuario también
podrá crear, de ser necesario, nuevos conceptos de liquidación para manejos
específicos.  
  
Código concepto | Nombre concepto | Cuenta a afectar  
---|---|---  
IVAV16VL | IVA liquidado | 24080119-Ingresos con IVA 19%  
RETCOMPGL1 | Retención por compras en general - declarantes | 23654005-Compras 2,5%  
RETCOMPGL | Retención por compras en general - no declarantes | 23654003-Compras 3,5%  
  
  
  

## Relación con otros módulos

El módulo de contabilidad se relaciona con otros módulos del sistema de modo
que desde la operación del módulo de contabilidad se pueden afectar los
módulos de ejecución presupuestal, activos fijos, cartera y proveedores,
conciliación bancaria, costos de producción, inventarios y facturación entre
muchos otros.  
  
Igualmente, otros módulos del sistema afectan los informes del módulo de
contabilidad, a través de sus propias operaciones. Por ejemplo, el módulo de
inventarios a través de la operación de facturación y ventas, afecta las
cuentas contables de inventarios, ingresos, costos de venta y efectivo o
cuenta por cobrar. La afectación a estas cuentas se verá reflejada en el
Estado de Situación Financiera, Estado de Resultados, Mayor y Balances y
Estado de Flujos de Efectivo; todos estos informes propios del módulo de
contabilidad.  
  

## Manejos que incluye el módulo

El módulo de contabilidad incluye otros 5 sub módulos, los cuales se describen
a continuación:

## Medios magnéticos

La herramienta de medios magnéticos le permite al usuario generar de forma
rápida y simple los formatos para la información exógena que exige la DIAN.
ContaPyme ofrece al usuario de manera pre configurada los formatos más
importantes a presentar. Con un solo clic el usuario podrá generar la
información de cada formato, realizar la respectiva revisión y generar el
archivo XML que se subirá a la página de la DIAN.

## Conciliación bancaria manual

La herramienta de conciliación bancaria manual permitirá al usuario realizar
de forma sencilla la comparación de los valores cargados a la cuentas de banco
contra la información registrada en los extractos bancario, pudiendo registrar
en la misma operación los valores faltantes en la contabilidad y que se
encuentren consignados en el extracto.

## Moneda extranjera

La herramienta de moneda extranjera permitirá a los usuarios registrar
transacciones en otras monedas diferentes a la moneda local, realizar de forma
automática los ajustes por diferencia cambiaria y generar estados financieros
en otras monedas diferentes a la moneda local. De igual forma, el usuario
podrá registrar la tasa de cambio con la cual el sistema registrará los
asientos contables.

## Flujos de efectivo

La herramienta de flujos de efectivo permitirá a los usuarios registrar en
cada transacción realizada con cuentas de efectivo, la fuente o uso de dicho
efectivo. El usuario podrá generar un informe de flujos de efectivo que
discriminará los saldos anteriores, las fuentes y usos dados a dicho efectivo
y los saldos finales. El usuario contará con un catálogo que le permitirá
discriminar, de acuerdo a sus necesidades, cada fuente y uso que maneje.

## Políticas, notas y revelaciones

La herramienta de políticas, notas y revelaciones permitirá a los usuarios
crear desde un catálogo, las políticas contables que rigen en sus empresas y
posteriormente podrán imprimir dichas políticas. Igualmente podrán crear tanto
desde un catálogo como desde las operaciones las notas y revelaciones y
posteriormente imprimir dicha información a través del informe de Notas a los
Estados Financieros.

## Operaciones que incluye el módulo

## Operación de movimiento contable

La operación de movimiento contable permitirá al usuario realizar asientos
débitos y créditos sobre cualquier cuenta contenida en el catálogo de cuentas,
con cargo a cualquier centro de costos y a cualquier tercero. Esta es la
principal operación del módulo de contabilidad. Con esta operación el usuario
podrá registrar: ingresos, egresos, notas contables, entre otros.

## Operación de acciones automáticas de fin de mes

La operación de acciones automáticas de fin de mes permitirá al usuario
ejecutar de forma automáticas procesos contables como depreciaciones y
amortizaciones de activos fijos y diferidos, traslados de saldos entre centros
de costos, distribuciones automáticas de saldos, ajustes por diferencia en
cambio, ajustes por inflación y auto activación de cuentas. Todos estos
procesos normalmente se realizan el último día del mes. Con esta operación el
usuario podrá registrar: depreciaciones, amortizaciones, ajustes por
diferencia en cambio, entre otros.

## Operación de cierre de fin de año

La operación de cierre de fin de año permitirá al usuario ejecutar de forma
automática la cancelación de las cuentas de resultado, asentar la utilidad o
pérdida del ejercicio y posteriormente llevar dicha utilidad o pérdida a la
correspondiente cuenta del ejercicio anterior. Esta acciones se realiza
generalmente el último día del año y los asientos que genere son automáticos y
el sistema los lleva a la cuentas que se configuran en las acciones de cierre
de fin de año. Con esta operación el usuario podrá registrar: cierre de
cuentas de resultado, cierre de cuentas de impuestos, ente otros.

## Operación de conciliación bancaria

La operación de conciliación bancaria permitirá al usuario confrontar y
conciliar los valores de la cuenta de banco que vienen en el extracto bancario
que el banco envía cada mes, con los valores que tiene contabilizados en la
contabilidad. Con esta operación el usuario podrá registrar: conciliación de
cuentas bancarias y asientos contables relacionados con la conciliación como
por ejemplo, valores cargados en el extracto bancario y que aún no se han
contabilizado.

## Operación de registro de tasas de cambio

La operación de registro de tasas de cambio permitirá al usuario registrar la
tasa de cambio de la o las monedas extranjeras con las cuales realiza
transacciones. Con esta operación el usuario podrá registrar: tasa de cambio
general \(TRM\), tasa de compra y tasa de venta.

##  Informes, consultas y exploradores del módulo

El módulo de contabilidad ofrece al usuario todos los estados financieros,
libros legales y diversidad de informes contables en diferentes
presentaciones.

## Estados financieros

El módulo de contabilidad permitirá al usuario generar todos los estados
financieros como el Estado de Situación Financiera, el Estado de resultados,
el Estado de cambios en el patrimonio, el Estado de Flujos de Efectivo y el
Informe de Notas a los Estados Financieros. El estado de situación Financiera
y el Estado de Resultados podrá generarlos en diferentes presentaciones, como
lo son las tipo consulta que permiten interacción con las cifras y auditoria
de información \(Drill Down\) y variadas presentaciones tipo impresión, las
cuales podrá generar en formato PDF, Word, Excel, enviar por correo
electrónico e imprimir.

## Libros legales

El módulo de contabilidad permitirá al usuario generar los libros legales como
son el Mayor y Balances, el Inventario y Balances, el Caja Diario, el Libro
Oficial y el Balance General Tributario. El Mayor y Balances y el Inventario y
balances podrá generarlos en diferentes presentaciones, como lo son las tipo
consulta que permiten interacción con las cifras y auditoria de información
\(Drill Down\) y variadas presentaciones tipo impresión, las cuales podrá
generar en formato PDF, Word, Excel, enviar por correo electrónico e imprimir.

## Otros reportes contables

El módulo de contabilidad permitirá al usuario generar diversidad de reportes
contables como movimientos de cuentas auxiliares, saldos de cuentas, informes
en moneda extranjera, numeración de libros y reportes de movimiento contable.
El movimiento de cuentas auxiliares podrá generarlo en diferentes
presentaciones, como lo son las tipo consulta que permiten interacción con las
cifras y auditoria de información \(Drill Down\) y variadas presentaciones
tipo impresión, las cuales podrá generar en formato PDF, Word, Excel, enviar
por correo electrónico e imprimir.

## Control de documentos

El módulo de contabilidad permitirá al usuario generar un listado de los
diferentes tipos de documentos generados, clasificados por el tipo de
documento de soporte, en el cual se listará cada consecutivo con el tercero de
las transacciones y los valores parciales, de impuestos y totales. Estos
informes podrán generarlos en formato PDF, Word, Excel, enviarlos por correo
electrónico e imprimirlos.

## Certificados y anexos

El módulo de contabilidad permitirá al usuario generar los certificados de
IVA, Retención en la fuente, ingresos e industria y comercio. Los certificados
podrán ser generados en PDF, Word, Excel, enviarlos por correo electrónico e
imprimirlos. Igualmente podrá generar los anexos tributarios que le permitirán
ampliar la información relacionada con la Retención en la fuente, el IVA, el
ReteIVA. Los anexos también se podrán generar en PDF, Word, Excel, enviarlos
por correo electrónico e imprimirlos.

## Otros informes

El módulo de contabilidad permitirá al usuario generar el Estado de Situación
Financiera por Función y por Naturaleza. Igualmente podrá generar el Estado de
Situación financiera. También da la posibilidad de armar nuevos informes,
basados en la estructura del mayor y balances.

## Tablas comparativas

El módulo de contabilidad permitirá al usuario generar tablas comparativas de
estado de situación financiera, mayor y balances y estado de resultados a
través de las cuales el usuario podrá comparar información por meses, años,
centros de costos, empresas, clase de operación entre otros datos. Las tablas
comparativas cuentan con la herramienta de Drill Down para que el usuario
pueda verificar el origen de cada una de las cifras.

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

---

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

![contbasico1.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/contbasico1.jpg)  
![contbasico2.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/contbasico2.jpg)

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

---

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

---

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

---

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
  
![medmagnt1.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/medmagnt1.jpg)
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
![medmagnt2.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/medmagnt2.jpg)
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
![medmagnt3.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/medmagnt3.jpg)  
Luego de revisar cada uno de los datos allí consignados, dé clic al botón
aceptar.

.  
  
El sistema abrirá una nueva ventana en la cual mostrará la ruta en la cual ha
quedado el formato generado en archivo XML y desde allí podrá acceder a la
carpeta donde se encuentra dicho archivo. Ese archivo será que el usted deberá
subir a la página de la DIAN.  

Contenido de prueba de data descript

![medmagnt4.jpg](https://www.contapyme.com/AyudasContaPyme/AyudasMasInfo/Ayudas/020%20CN/medmagnt4.jpg).  
  

## Guías relacionadas

  * [Guía de montaje de Contabilidad.](<?id=\[GM\]2030>)
  * [Guía de montaje de flujos de efectivo.](<?id=\[GM\]2040>)
  * [Guía de montaje de conciliación bancaria manual.](<?id=\[GM\]2020>)
  * [Guía de montaje de moneda extranjera.](<?id=\[GM\]2050>)

¡Y listo\! Podrá empezar a registrar toda la información en \[ContaPyme\].
