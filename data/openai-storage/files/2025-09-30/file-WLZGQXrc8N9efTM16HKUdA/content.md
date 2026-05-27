# Centro de costos para depreciaciones.

Centro de costos al que se le cargarán las depreciaciones y/o amortizaciones
del nuevo activo creado.

Observaciones

Centro de costos al cual se le aplicarán automáticamente los gastos por
depreciación, deterioro o pérdida del activo.

---

# Responsable

Permite indicar quién es el responsable del manejo o administración del
activo.

Observaciones

El código del tercero debe estar creado previamente en el "Catálogo de
terceros" del sistema \[ContaPyme\], para poderlo relacionar en este campo.

---

# Ícono

Icono que representará al nuevo activo creado dentro del explorador gráfico de
la empresa.

---

# Localización

Ubicación del activo dentro de la empresa, ciudad o zona.

Ejemplo

  * La orden de trabajo que permitió la fabricación de una bodega en la empresa, estará ubicada en la sede del sur.

Observaciones

La ubicación de un activo se puede utilizar cuando en la empresa no tienen
discriminadas las áreas o departamentos como centros de costos.

---

# Clasificadores

Palabra clave que sirve para etiquetar o agrupar un activo con otros, los
cuales pueden tener funcionalidades o características similares.

Observaciones

Un clasificador puede ser útil para hacer filtros en la búsqueda de
información de varios activos.
Ej. Conocer la depreciación acumulada de todos los activos cuyo clasificador
es: Muebles y Enseres \(útil para no tener que generar la consulta de manera
individual por cada activo\).
El clasificador también se puede usar si la empresa cuenta con el módulo de
costos indirectos de producción, para distribuir los costos de maquinaria y
equipo basados en el uso de los activos que están agrupados bajo un
clasificador en común.

---

# Descripción

Información relevante que desee documentar del activo.

Ejemplo

Ficha técnica del activo que puede estar descrita en el manual operativo,
marca, modelo, fecha de creación, etc.

Observaciones

La información que en este campo se indique, sirve para reconstruir una
historia completa del activo con datos adicionales a los que la contabilidad
reporta.

---

# Contabilización local

Datos de depreciación/amortización con los que se llevará la contabilización
local del activo.

---

# Grupo del activo

Permite relacionar el grupo al cual pertenece el activo creado.

Ejemplo

Se crea una oficina como activo, el grupo al cual se relaciona es:
Construcciones y edificaciones.

Observaciones

Dentro del grupo de activo se configuran las cuentas contables que el sistema
\[ContaPyme\] afecta automáticamente cuando se realizan operaciones con el
activo como: depreciación, revaluación, venta, baja, etc.

---

# Cuenta del activo

Cuenta del activo que se utiliza como guía al momento de hacer la asignación
de un activo en este grupo.

Ejemplo

Al activar una orden de trabajo que se destinó para la fabricación de una
bodega, éste activo se puede relacionar con el grupo "Construcciones y
edificaciones"; en cual presenta algunas opciones de cuenta \(según el plan de
cuentas para el sector comercial\) como:

  * **151605:** Edificios.
  * **151610:** Oficinas.
  * **151615:** Almacenes.
  * **151680:** Bodegas.
  * Etc.

Observaciones

Esta cuenta será la que el sistema debite automáticamente en la creación de un
activo asociado a este grupo.
Las opciones de cuentas dependen directamente de las cuentas auxiliares que se
tengan creadas en el catálogo de plan de cuentas de \[ContaPyme\].

---

# Tipo depreciación

Forma en la que se realizará la depreciación del nuevo activo.

Observaciones

La depreciación es la distribución sistemática del importe depreciable \(costo
del activo menos el valor residual\) a lo largo de su vida útil.
Los tipos de depreciación disponibles son:

  * No se deprecia: Un activo que no pierde su valor.
Ej. Terreno.

  * Mensual \(línea recta\): Un activo que se deprecia en proporciones iguales a lo largo de su vida últil.
Ej. Depreciación mes = Importe depreciable / Vida útil \(meses\).
**Nota:** \[ContaPyme\] maneja depreciación mensual línea recta para la
contabilidad local-fiscal, pero para las NIIF realiza depreciación lineal, la
cual consiste en una depreciación basada en días.

  * Por unidades de uso: Un activo que se deprecia por el tiempo de uso \(horas\).
Ej. Depreciación mes = Importe depreciable / Vida útil \(horas usadas\).

  * Por unidades de producción: Un activo que se deprecia por la cantidad de producción que genera en un período.
Ej. Depreciación mes = Importe depreciable / Vida útil \(unidades
producidas\).

  * Mensual acelerada: Un activo que se deprecia bajo un porcentaje de aceleración extra a la depreciación en línea recta.
Ej. Tasa depreciación acelerada = Tasa de depreciación por línea recta \*
Porcentaje de aceleración.
Depreciación mes = Importe depreciable \* Tasa de depreciación acelerada.

  * Depreciación decreciente: Un activo que se deprecia más en sus primeros años y presenta una disminución progresiva hacia los últimos años de la vida útil.
Ej. Depreciación decreciente = \(Vida útil / Suma dígitos de la vida últil\)
\* Importe depreciable.

---

# Centro de costos

Código del centro de costos que se va a activar, es decir, convertir en un
activo depreciable o amortizable.

Ejemplo

Mediante orden de trabajo OTR-1811001, se indica la creación de una bodega
para almacenamiento de mercancía al interior de la empresa. Por lo tanto el
código den centro de costos a activar será: **OTR-1811001**
Al activar este centro de costos, se creará un nuevo activo \(propiedad,
planta y equipo\) de construcciones y edificaciones que permitirá la
depreciación de los costos asociados a la creación de la bodega.

Observaciones

Para activar un centro de costos, éste se tuvo que haber creado como: "Orden
de trabajo de inversión".

---

# Cuenta diferido

Código de la cuenta del PUC donde se amortizará el ingreso o el gasto de forma
automática en cada acción de fin de mes.

Observaciones

Cuando se registra el activo diferido, el ingreso inicialmente se lleva al
pasivo y mes tras mes, se disminuye el pasivo y se registra el ingreso; o si
es un gasto inicialmente se lleva al activo y mes tras mes, se disminuye el
activo y se registra el gasto. Así durante toda la vida útil del activo
diferido..

---

# Dato depreciación

Unidad que se usa para medir la depreciación cuando es diferente a la mensual
en línea recta.

Ejemplo

Se tiene un vehículo y por políticas de la empresa no desean depreciarlo
mensual, sino por horas laboradas:

  * Tipo depreciación Unidades de uso, Dato depreciación: Horas.

Se tiene una fotocopiadora y por políticas de la empresa no desean depreciarla
mensual, sino por unidades producidas:

  * Tipo depreciación Unidades de producción, Dato depreciación: Fotocopias.

Observaciones

Este campo solo se activa cuando el tipo de depreciación es por unidades de
uso o unidades de producción.

---

# Valor residual

Valor final de un activo después de su depreciación y amortización, es decir,
al final de su vida útil.

Ejemplo

Se fabrica una oficina por $ 70.000.000 \(pesos Colombianos\), y se define
como política que el valor residual será el 10% del valor del activo; por lo
tanto en valor residual se registra: $ 7.000.000.
Esto quiere decir, que una vez depreciado todo el computador la empresa lo
podría vender por el valor residual indicado.

Observaciones

\[ContaPyme\] permite definir el valor residual del activo a través del
tiempo; para esto ingrese directamente al catálogo de activos y dentro del
activo, haga clic en el botón de referencia y seleccione la opción  "Modificar
valor a través del tiempo".
Esta opción es útil cuando al interior de la empresa, se realiza una revisión
del activo y detectan que el valor por el cual valoraban que se podía vender o
transferir el activo una vez se depreciara por completo cambió.
Recuerde: El valor residual forma parte del importe depreciable.

  * Importe depreciable es el costo del activo, menos su **valor residual.**
  * Depreciación es la distribución sistemática del importe depreciable de un activo a lo largo de su vida útil.

---

# Inicio depreciación

Fecha en la cual iniciará el proceso de depreciación o amortización del activo
creado en la orden de trabajo.

Observaciones

Normalmente corresponde a la fecha en la que se realiza la operación de
activación de la orden trabajo en la etapa de desarrollo.

---

# Meses estimados de vida útil

Tiempo que un activo está en funcionamiento operativo para la empresa.

Ejemplo

  * Una oficina se puede estimar con una vida útil: 20 años \(240 meses\).
  * Una máquina de producción se puede estimar con una vida útil: 20.000 horas.
  * Una fotocopiadora se puede estimar con una vida útil: 15.000 copias.

Observaciones

Según el tipo de depreciación se puede indicar la vida útil:
\- Mensual \(linea recta\): meses estimados de vida útil total del activo.
\- Unidades uso: unidades estimadas de uso de vida útil total del activo.
\- Unidades producción: producción estimada de vida útil total del activo.

---

# Valor de la activación

Suma de todos los valores imputados al centro de costos durante la etapa de
desarrollo, es decir, antes de la activación.

Observaciones

Este campo es de solo lectura y se origina de la suma de todos los valores que
en operaciones como movimientos contables, gastos, planillas se hayan
registrado con cargo al centro de costos.

---

# Contabilización NIIF

Datos de depreciación/amortización con los que se llevará la contabilización
NIIF del activo.

---

# Grupo del activo

Permite relacionar el grupo al cual pertenece el activo creado, el cual
afectará la contabilización bajo la norma internacional NIIF.

Ejemplo

Se crea una oficina como activo, el grupo al cual se relaciona es:
Construcciones y edificaciones.

Observaciones

Dentro del grupo de activo se configuran las cuentas contables que el sistema
\[ContaPyme\] afecta automáticamente cuando se realizan operaciones con el
activo como: depreciación, revaluación, venta, baja, deterioro, etc.

---

# Cuenta del activo

Cuenta NIIF del activo que se utiliza como guía al momento de hacer la
asignación de un activo en este grupo.

Ejemplo

Al activar una orden de trabajo que se destinó para la fabricación de una
bodega, éste activo se puede relacionar con el grupo "Construcciones y
edificaciones"; en cual presenta algunas opciones de cuenta \(según el plan de
cuentas para el sector comercial\) como:

  * **151605:** Edificios.
  * **151610:** Oficinas.
  * **151615:** Almacenes.
  * **151680:** Bodegas.
  * Etc.

Observaciones

Esta cuenta será la que el sistema debite automáticamente en la creación de un
activo asociado a este grupo.
Las opciones de cuentas dependen directamente de las cuentas auxiliares que se
tengan creadas en el catálogo de plan de cuentas NIIF de \[ContaPyme\].

---

# Tipo depreciación

Es la forma en la que se realizará la depreciación NIIF por el uso del activo.

Ejemplo

Los tipos de depreciación disponibles son: Los tipos de depreciación
disponibles son:

  * No se deprecia: Un activo que no pierde su valor.
Ej. Terreno.

  * Mensual \(línea recta\): Un activo que se deprecia en proporciones iguales a lo largo de su vida últil.
Ej. Depreciación mes = Importe depreciable / Vida útil \(meses\).
**Nota:** \[ContaPyme\] maneja depreciación mensual línea recta para la
contabilidad local-fiscal, pero para las NIIF realiza depreciación lineal, la
cual consiste en una depreciación basada en días.

  * Por unidades de uso: Un activo que se deprecia por el tiempo de uso \(horas\).
Ej. Depreciación mes = Importe depreciable / Vida útil \(horas usadas\).

  * Por unidades de producción: Un activo que se deprecia por la cantidad de producción que genera en un período.
Ej. Depreciación mes = Importe depreciable / Vida útil \(unidades
producidas\).

  * Mensual acelerada: Un activo que se deprecia bajo un porcentaje de aceleración extra a la depreciación en línea recta.
Ej. Tasa depreciación acelerada = Tasa de depreciación por línea recta \*
Porcentaje de aceleración.
Depreciación mes = Importe depreciable \* Tasa de depreciación acelerada.

  * Depreciación decreciente: Un activo que se deprecia más en sus primeros años y presenta una disminución progresiva hacia los últimos años de la vida útil.
Ej. Depreciación decreciente = \(Vida útil / Suma dígitos de la vida últil\)
\* Importe depreciable.

Observaciones

Este dato se asume directamente del grupo NIIF configurado para el activo.
Si el grupo NIIF del activo no tiene activada la opción "Es depreciable o
amortizable", este campo no se muestra.
La depreciación es la distribución sistemática del importe depreciable \(costo
del activo menos el valor residual\) a lo largo de su vida útil.

---

# Cuenta diferido

Código de la cuenta NIIF en el PUC donde se amortizará el ingreso o el gasto
de forma automática en cada acción de fin de mes.

Observaciones



Cuando se registra el activo diferido, el ingreso inicialmente se lleva al
pasivo y mes tras mes, se disminuye el pasivo y se registra el ingreso; o si
es un gasto inicialmente se lleva al activo y mes tras mes, se disminuye el
activo y se registra el gasto. Así durante toda la vida útil del activo
diferido..

---

# Dato depreciación

Unidad que se usa para medir la depreciación cuando es diferente a la lineal.

Ejemplo

Se tiene un vehículo y por políticas de la empresa no desean depreciarlo
linealmente, sino por horas laboradas:

  * Tipo depreciación Unidades de uso, Dato depreciación: Horas.

Se tiene una fotocopiadora y por políticas de la empresa no desean depreciarla
linealmente, sino por unidades producidas:

  * Tipo depreciación Unidades de producción, Dato depreciación: Fotocopias.

Observaciones

Este campo solo se activa cuando el tipo de depreciación es por unidades de
uso, unidades de producción o decreciente.

---

# Valor residual

Valor final de un activo después de su depreciación y amortización, es decir,
al final de su vida útil.

Ejemplo

Se fabrica una oficina por $ 70.000.000 \(pesos Colombianos\), y se define
como política que el valor residual será el 10% del valor del activo; por lo
tanto en valor residual se registra: $ 7.000.000.
Esto quiere decir, que una vez depreciado todo el computador la empresa lo
podría vender por el valor residual indicado.

Observaciones

\[ContaPyme\] permite definir el valor residual del activo a través del
tiempo; para esto ingrese directamente al catálogo de activos y dentro del
activo, haga clic en el botón de referencia y seleccione la opción  "Modificar
valor a través del tiempo".
Esta opción es útil cuando al interior de la empresa, se realiza una revisión
del activo y detectan que el valor por el cual valoraban que se podía vender o
transferir el activo una vez se depreciara por completo cambió.
Recuerde: El valor residual forma parte del importe depreciable.

  * Importe depreciable es el costo del activo, menos su **valor residual.**
  * Depreciación es la distribución sistemática del importe depreciable de un activo a lo largo de su vida útil.

---

# Inicio depreciación

Fecha en la cual iniciará el proceso de depreciación o amortización del activo
creado en la orden de trabajo.

Observaciones

Normalmente corresponde a la fecha en la que se realiza la operación de
activación de la orden trabajo en la etapa de desarrollo, aunque la norma
internacional \(NIIF\), permite que un activo que se adquiere o fabrica en una
fecha determinada, pueda iniciar de la depreciación o amortización en otra
fecha diferente.
Este manejo solo es permitido bajo las NIIF, pues ésta indica que la
depreciación de un activo comienza cuando está disponible para su uso, o
cuando se encuentra en la ubicación y condición deseada \(NIC 16\). Se debe
tener presente que la fecha de inicio de depreciación siempre debe ser igual o
superior a la fecha de compra o fabricación \(activación\) del activo.

---

# Vida útil asignada \(total/restante\)

Tiempo que un activo está en funcionamiento operativo para la empresa.

Ejemplo

  * Una oficina se puede estimar con una vida útil: 20 años \(240 meses\).
  * Una máquina de producción se puede estimar con una vida útil: 20.000 horas.
  * Una fotocopiadora se puede estimar con una vida útil: 15.000 copias.

Observaciones

Según el tipo de depreciación se puede indicar la vida útil:
\- Mensual \(linea recta\): meses estimados de vida útil total del activo.
\- Unidades uso: unidades estimadas de uso de vida útil total del activo.
\- Unidades producción: producción estimada de vida útil total del activo.

---

# Finalizar definitivamente el centro de costos al activarlo.

Indica si el centro de costos activado seguirá existiendo en etapa productiva
o si al activarlo la vigencia de éste debe finalizarse.

Observaciones

Al activar esta opción el centro de costos quedará sin vigencia, por lo tanto,
ya no se podrán realizar imputaciones contables a dicho centro de costos.
Si no se activa, el centro de costos seguirá vigente y disponible para que se
le asignen imputaciones contables en nuevos períodos, permitiendo así la
consulta actualizada de reportes financieros.

Configuración

Para configurar la funcionalidad de este campo como visible o solo lectura,
ver: **\[Operación: Orden de trabajo > Configurar operación > Campos de la
operación > Datos maestros de la operación\]**

---

# Finalización de depreciación

Fecha estimada en la que el activo se dejará de utilizar, bien sea, por que se
dará de baja, se venderá o no se obtendrán más beneficios económicos de él.

Ejemplo

La orden de trabajo para la fabricación de una bodega se activa el día
01-02-2018, y se estima que se va a utilizar por 8 años, por lo tanto la fecha
de finalización sería:

  * Fecha finalización depreciación = Fecha de compra \(o inicio de uso\) + Vida útil total estimada
  * Fecha finalización = \(01-02-2018 + 8 años\) = 01-02-2026

Observaciones

Las NIIF permiten re-expresar la fecha de finalización de depreciación del
activo, pues puede suceder que después de un peritaje técnico se indique que
el activo se puede usar por más tiempo del estimado inicialmente. Por lo
tanto, se debe hacer una operación de: "Reclasificación de activos" e indicar
la nueva vida útil del activo, lo que implica un cambio en la fecha de
finalización de la depreciación. Para esta operación de "Reclasificación de
activos" la empresa debe tener en su licenciamiento el módulo de "Activos".

---

# Valor de la activación

Suma de todos los valores imputados al centro de costos durante la etapa de
desarrollo, es decir, antes de la activación.

Observaciones

Este campo es de solo lectura y se origina de la suma de todos los valores que
en operaciones como movimientos contables, gastos, planillas se hayan
registrado con cargo al centro de costos.

---

# El centro de costos es destinado a la producción

Un centro de costos es destinado a la producción cuando produce productos que
posteriormente serán embodegados.
Una vez que el producto es embodegado, podrá ser consumido internamente en la
empresa o vendido como un producto terminado.
Para el manejo de costos la empresa debe tener en su licenciamiento el módulo
de "Costos de producción" e "Inventarios, compras y facturación" para realizar
los embodegamientos de productos.

---

# Cuenta producto en proceso

Cuenta que \[ContaPyme\] utiliza para trasladar los costos de producción desde
la cuenta 7 \(Costos de producción\) hacia la cuenta del inventario de
producto en proceso.

Observaciones

Para el manejo automático de los costos, se requiere tener el módulo de
"Costos de producción" para que \[ContaPyme\] realice en las acciones de fin
de mes el proceso de auto-activación de cuentas, es decir, cancelación de las
cuentas 7 de costos de producción contra la cuenta de producto en proceso.

---

# Código

Identificación asignada al nuevo activo que se crea al activar la orden de
trabajo.

Ejemplo

Al activar el centro de costos se creará un nuevo activo que será depreciado o
amortizado.

Configuración

Para configurar la funcionalidad de este campo como solo lectura, ver:
**\[Operación: Orden de trabajo > Configurar operación > Campos de la
operación > Datos maestros de la operación\]**

---

# Nombre

Nombre que se asigna al nuevo activo que se creará al procesar la operación.

---

# Centro de costos de la orden de trabajo

Identificación del centro de costos que se va a finalizar.

Observaciones

Finalizar un centro de costos implica que ya no estará vigente o disponible
para hacerle imputaciones contables.

---

# Cuenta de pérdidas

En esta cuenta se imputarán las pérdidas que hubiesen al finalizar la orden de
trabajo. Solo hay pérdidas, si se han imputado costos a la orden de trabajo
que está destinada a la producción y no se ha embodegado producto.

Observaciones

Para administrar una orden de trabajo que genera un proceso productivo, se
requiere tener en \[ContaPyme\] los módulos de "Costos de producción" e
"Inventarios, compras y facturación."

---

# Finalización

Finalizar un centro de costos implica que no estará disponible para nuevas
imputaciones contables \(se culmina la vigencia\).

Observaciones

Al finalizar un centro de costos, éste puede no mostrarse en el explorador
gráfico de la empresa, si se tiene configurado la visualización de centros de
costos que solo estén vigentes a la fecha de trabajo.

---

# Reinicialización

Reiniciar un centro de costos consiste en registrar la cancelación de los
valores acumulados en las cuentas de desarrollo y/o amortizables del centro de
costos, bien sea por pérdida por siniestro o por terminación de un ciclo
productivo.

---

# Cuenta pérdidas

Cuenta del gasto o costo en la que se imputarán las pérdidas que se den a
lugar, al finalizar una orden de trabajo productiva.
Solo hay pérdidas, si se han imputado costos a la orden de trabajo que estaba
destinada a la producción pero que no se han embodegado productos./div>

---

# Acción Cierre Costos

Observaciones

  * El cierre del ciclo de costos al final de un proceso productivo calcula el costo unitario real de cada unidad producida y ajusta los costos estimados que se generaron en el ciclo de producción.
  * Cuando el proceso productivo termina en una fecha diferente al fin de mes, es recomendable que el cierre de ciclo de costos se espere hasta después del cierre de mes, con el fin de que se apliquen los costos indirectos y luego se haga el cierre de ciclo de costos.
  * Se recomienda al final de cada mes hacer el "Cierre de mes" para luego hacer el "Cierre de ciclo de costos" de todos los procesos productivos que finalizaron durante el mes que se está cerrando.

---

# Tercero

Código del proveedor o tercero al cual se pagó el dinero por el gasto
diferido.

Ejemplo

Se registra el pago del servicio de energía eléctrica a la empresa Central
Hidroeléctrica S.A. \(identificada con còdigo 800300100\), así que en el campo
"Tercero", se indica código: **800300100**.

Observaciones

Si alguna cuenta de las registradas en la lista de gastos está marcada para
exigir tercero, se debe indicar este dato.

El tercero que se utiliza en el campo "Tercero", debe quedar registrado en el
catálogo de terceros ya que con la información de dicho tercero se puede:

  * Generar informes por terceros o informes de impuestos.
  * Calcular automáticamente impuestos en la transacción \(dependiendo de la clasificación tributaria indicada en el tercero\).

Se recomienda siempre indicar el tercero en el campo "Tercero", como requisito
para la presentación de información exógena.

Se recomienda que este campo siempre sea diligenciado, para poder tener la
trazabilidad de operaciones de gastos generadas con diferentes terceros.

Si la forma de pago del ingreso genera una cuenta por pagar, el sistema por
defecto asigna el tercero registrado en el campo **"Tercero"** , sin embrago
el tercero en cartera se podrá modificar.

En caso de requerir registrar múltiples gastos y terceros dentro de esta
transacción, se debe activar la opción: **"Permitir diferentes tipos de
documentos y terceros para cada ingreso"[Ver
más.](<\[120\]Chk_BShowSupportInfo \(NA\).html>)**

Puede predeterminar un tercero en la operación, para que al momento de
realizar el gasto este campo se cargue por defecto.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver: **\[Menú Operación > Configuración > Campos de la operación
> Datos maestros de la operación\].**

Para configurar el tipo de tercero ingrese por: **\[Pestaña: Básico > Catálogo
de terceros > Seleccionar tercero > Clic derecho: Modificar > Tipo de
Tercero\].**

Para configurar el tecero por defecto en la operación, ver: **\[Menú Operación
> Configuración > Campos de la operación > Datos maestros de la operación\].**

---

# Código del diferido

Código de identificación del activo diferido.
El código del activo diferido puede ser un código alfanúmerico de fácil
recordación de hasta 30 caracteres.

Este código hará parte de un código más completo a través del cual el sistema
\[ContaPyme\] se identificará el activo en el catálogo de activos.
El código del diferido en el catálogo de activos se compone de:

  * Dos primeros digitos del año.
  * Dos primeros digitos del mes.
  * Número del documento de soporte de la operación.
  * Código asignado al activo.

Ejemplo

El dia 12 de Julio de 2018, se realiza la compra de una póliza de seguro
contra incendios, soportada en el CE-01852 que será diferida a 12 meses.

El código asignado al activo en la operación es el código: "1".

Por tanto, el código del activo en el catálogo de activos quedaría asi:
**1207-CE-01852-1**
18 - Últimos dos digitos del año.
07 - Últimos dos digitos del mes
CE-01852 - Número del documento de soporte.
1 - Código del activo

Observaciones

Varios activos diferidos pueden tener el mismo código de identificación ya que
el código final del mismo incluira el número del documento de soporte de la
operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, valor por defecto\), ver: **\[Operación: Gastos diferidos >
Configurar operación > Campos de la operación > Lista de gastos diferidos >
Columnas del listado\].**

---

# Permitir diferentes tipos de documento y terceros por cada gasto

Al activar esta opción, se visualizan columnas adicionales que permiten
asignar un tipo de documento, número de documento, fecha y tercero distinto
para el renglón de cada gasto.

Ejemplo

Se requieren registrar los gastos de caja menor de la empresa de la primera
quincena del mes de abril, como este ingreso se realiza a diferentes terceros
con diferentes tipos de documento, se activa la opción **"Permitir diferentes
tipos de documento y terceros por cada gasto"** para poder registrar los datos
correspondientes de dichos gastos de la siguiente manera:

Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
519530 - Utiles, papelería y fotocopias | $ 50.000 | 132 -Comprobante de causación de engreso | CCE-000158 | 01/04/2018 | 800300700-Papelería y Más S.A.
519545 - Taxis y buses | $ 350.000 | 130 -Comprobante de engreso | CCE-000159 | 12/04/2018 | 800600200-Taxis express S.A
519565 - Parqueaderos | $ 280.000 | 132 -Comprobante de causación de engreso | CCE-000160 | 15/04/2018 | 75963256- Jorge Perez.


Observaciones

En este caso, la fecha debe estar dentro del mismo mes que la fecha de soporte
de la operación.

Al momento de procesar la operación el registro quedará con la información
registrada en cada una de las columnas y se podrá visualizar en los
exploradores e informes contables.

Configuración

Para configurar la funcionalidad de este campo \(visible o solo lectura\),
ver: **\[Menú Operación > Configuración > Campos de la operación > Datos
maestros de la operación > Permitir diferentes terceros c./renglón\].**

Para configurar que esta opción esté activada por defecto, ver: **\[Menú
Operación > Configuración operación > Configuración de campos > Permitir
diferentes terceros\].**

---

# Nombre

Cógido del activo al cual se realiza el registro de información.

Ejemplo

Se tiene un catálogo con el siguiente listado de activos:  Activo Código | Activo Nombre
---|---
VEH001 | Vehículo Ford KII-735
COM001 | Computador Dell 1580
COM002 | Computador portátil Acer 1025

Se requiere hacer el cargue inicial de información para el activo con código
COM001, por lo tanto en el campo "Nombre", se visualiza: **Computador Dell
1580**.

Observaciones

Este campo es de solo lectura, quiere decir, que la información que presenta
no se puede modificar, pues el nombre está asociado al código del activo
seleccionado.

Configuración

Este campo se puede configurar como visible o no. Para esto puede ingresar
por: **\[Menú Operación > Configurar operación > Campos de la operación >
Columnas del cargue de activos\]**

---

# Concepto de pago

Cuenta o concepto de la cuenta de gasto, a la cual se realiza la imputación.

Ejemplo

Se va a registrar un gasto por el servicio de energía eléctrica, para la sede
centro por valor de $250.000
Concepto de pago  |  Cc. a cargar  |  Valor
---|---|---
**513530 - Energía eléctrica** |  SD01- Sede centro  |  $250.000

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta de gasto que se requiere registrar. Ejemplo: **513530 - Energía
eléctrica**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de gastos.

Se pueden registrar tantos conceptos de gastos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto \(nombre de la cuenta contable\)en la impresión del
documento. [Ver más.](<\[60\]GridIngresosEgresos_TDETALLE \(NA\).html>)

---

# CC. a cargar

Código del centro de costos al que se le va a cargar o a imputar el gasto
registrado.

Ejemplo

Se va a registrar un gasto por el servicio de energía eléctrica, para la sede centro por valor de $250.000  Concepto de pago | Cc. a cargar | Valor
---|---|---
513530 - Energía eléctrica | **SD01- Sede Centro** | $250.000

En el campo **"Cc. a cargar"** se debe indicar identificador del centro de
costo que tenemos previamente creado desde el explorador gráfico de empresas:
**SD01- Sede Centro**.

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

Puede determinar el código del centro de costos por defecto que se usará en
cada renglón de la operación para imputar el gasto correspondiente.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

Para configurar el centro de costos por defecto, ingrese a: **\[Menú Operación
> Configuración > Campos operación > Lista de elementos > Centro de costos por
defecto\]. **

---

# Valor

Valor total a pagar por el concepto de egreso que se está registrando.

Ejemplo

Se registra el pago del servicio de energía eléctrica del mes de abril, a la
empresa Central Hidroeléctrica S.A., por valor de $130.000.

Concepto de pago  |  Cc. a cargar  |  Valor
---|---|---
513530 - Energía eléctrica  |  AD01- Administrativos  |  **$130.000**

En el campo **"Valor"** se debe indicar el valor de ingreso que corresponde al
renglón: **$130.000**.


Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.

---

# Detalle

Permite especificar una descripción u observación corta para el registro del
egreso que se está realizando.

Ejemplo

El concepto de egreso que se registra es 513550 \(Transportes, fletes y
acarreos\), pero en la impresión se necesita detallar a que corresponde este
servicio de fletes, Ej.:"Servicio de flete y transporte de mercancía para la
Ruta: Manizales - Bogotá".
Concepto de pago  |  Cc. a cargar  |  Valor  |  Detalle
---|---|---|---
513550 - Transportes, fletes y acarreos  |  OP01- Operacionales  |  $450.000  |  **Servicio de flete y transporte de mercancía para la Ruta: Manizales - Bogotá.**

En el campo **"Detalle"** se debe indicar el detalle del ingreso adicional que
requiere que salga en el documento de impresión: Ejemplo: **Servicio de
transporte de mercancía para la sede principal del cliente, Ruta: Manizales -
Bogotá.**

Observaciones

La información indicada en este campo podrá consultarse en los exploradores de
contabilidad, asi como también en los informes de movimiento de cuentas
auxiliares.

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto de pago \(nombre de la cuenta contable\) en la
impresión del documento.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Configurar operación > Campos de la
operación > Configuración de columnas en gastos > Detalle\]**.

---

# Tipo de documento

Tipo de documento de soporte que sustenta la transacción registrada del
renglón.

Ejemplo

Se requieren registrar los gastos de servicios públicos del mes de abril,
soportados en diferentes terceros y tipos de documento soporte de la siguiente
manera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
513530 - Energía eléctrica | $ 200.000 | **130 -Comprobante de engreso** | CE-000138 | 05/04/2018 | 800300100-Central Hidroeléctrica S.A.
513525 - Acueducto y alcantarillado | $ 350.000 | **132 -Comprobante de causación de engreso** | CCE-000159 | 05/04/2018 | 800200100-Aguas de Caldas S.A.S
513535 - Teléfono | $ 280.000 | **130 -Comprobante de engreso** | CE-000140 | 05/04/2018 | 800400500-Empresas de Telefonía S.A.

En el campo **"Tipo de documento"** se debe indicar el identificador del tipo
de documento con el cual se requiere soportar el gasto del renglón: Ejemplo:
**132 - Comprobante de causación de engreso**

Observaciones

Este campo es requerido en la operación.

\[ContaPyme\] trae pre-configurados múltiples documentos de soporte listos
para usar. Para seleccionar el tipo de documento soporte requerido basta con
dar doble clic sobre el campo o usar la tecla F3.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

---

# Número documento

Número del documento de soporte que sustenta la transacción registrada del
renglón.

Se requieren registrar los gastos de servicios públicos de la empresa del mes
de abril, soportados en diferentes terceros y tipos de documento soporte de la
siguiente manera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
513530 - Energía eléctrica | $ 200.000 | 130 -Comprobante de engreso | **CE-000138** | 05/04/2018 | 800300100-Central Hidroeléctrica S.A.
513525 - Acueducto y alcantarillado | $ 350.000 | 132 -Comprobante de causación de engreso | **CCE-000159** | 05/04/2018 | 800200100-Aguas de Caldas S.A.S
513535 - Teléfono | $ 280.000 | 130 -Comprobante de engreso | **CE-000140** | 05/04/2018 | 800400500-Empresas de Telefonía S.A.

En el campo **"Número de docuemnto"** se debe indicar la referencia con el
cual se requiere soportar el gasto del renglón: **Ejemplo: CCE-000159**

Observaciones

En la impresión del documento, sólo se mostrará el número de documento de la
operación, no el del renglón.

Regularmente el número de documento corresponde a la factura, recibo o
comprobante que envía directamente el proveedor que presta el servicio.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

---

# Fecha

Fecha de soporte específica para la contabilización por renglón de cada
registro.

Ejemplo

Se va a registrar la causación de caja menor de la empresa de la primera
quincena del mes de abril, de la siguiente manera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
519530 - Utiles, papelería y fotocopias | $ 50.000 | 132 -Comprobante de causación de engreso | CCE-000158 | **01/04/2018** | 800300700-Papelería y Más S.A.
519545 - Taxis y buses | $ 350.000 | 132 -Comprobante de causación de engreso | CCE-000159 | **12/04/2018** | 800600200-Taxis express S.A
519565 - Parqueaderos | $ 280.000 | 132 -Comprobante de causación de engreso | CCE-000160 | **15/04/2018** | 75963256- Jorge Perez.

En el campo **"Fecha"** se debe indicar la fecha con la cual se requiere
soportar el gasto del renglón: Ejemplo: **15/04/2018**

Observaciones

La fecha debe estar dentro del mismo mes que la fecha de soporte de la
operación.

Puede configurar que la fecha de soporte de la operación NO pueda ser
modificada.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

Para configurar que la fecha de soporte de la operación NO pueda ser
modificada, ver: **\[Menú Operación > Configuración > Campos de la operación >
Datos de encabezado > Clase y fecha operación\].**

---

# Tercero

Código o identificación del tercero con el cual se registra el gasto por cada
renglón.

Ejemplo

Se va a registrar la causación de caja menor de la empresa del mes la primera
quincena del mes de abril, de la siguiente menera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
519530 - Utiles, papelería y fotocopias | $ 50.000 | 132 -Comprobante de causación de engreso | CCE-000158 | 01/04/2018 | **800300700-Papelería y Más S.A.**
519545 - Taxis y buses | $ 350.000 | 132 -Comprobante de causación de engreso | CCE-000159 | 12/04/2018 | **800600200-Taxis express S.A**
519565 - Parqueaderos | $ 280.000 | 132 -Comprobante de causación de engreso | CCE-000160 | 15/04/2018 | **75963256- Jorge Perez.**

En el campo **"Tercero"** Se debe indicar el código del tercero con la cual se
requiere soportar el gasto del renglón: Ejemplo: **800300700-Papelería y Más
S.A.**

Observaciones

Si alguna cuenta de las registradas está marcada para exigir tercero, el dato
"Tercero" será obligatorio.

Generalmente este campo es utilizado cuando el tercero del ingreso por
renglón, es diferente al tercero principal de la operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

---

# Nombre del activo diferido

Nombre que se asignará al activo diferido.

El nombre del activo se mostrará en el campo descripción al imprimir el
"Comprobante de egreso".

Ejemplo

La empresa CMB Muebles realiza la compra de una póliza de seguro contra
incendios, soportada con el comprobante de egreso CE-01852, que será diferida
a 12 meses.

En la columna **"Nombre diferido"** se detalla el gasto diferido. **Ej. Póliza
de seguro contra incendios.**

Observaciones

El nombre del activo permite la busqueda del activo en el catálogo de activos.

---

# Valor base

Valor base de cálculo con el cual se determinó el valor de la operación.
Generamente este valor es requerido para las cuentas de impuestos como IVA,
retención, ICA, etc.

Ejemplo

Se registra la cuenta 24080102 \(Ingresos con IVA 19%\) con un valor de
$19.000 correspondiente a un IVA del 19%, asi que el valor base es de
$100.000.

Observaciones

Esta casilla se activa cuando la cuenta tenga activado el atributo de "exigir
valor base". Para las cuentas que no lo tengan activado, este campo no será
editable dentro del renglón de registro de la operación.

Configuración

Texto de configuración **\[Operación: Gastos diferidos > Configurar operación
> Campos de la operación > Configuración de columnas en gastos\].**

---

# Borrar renglones \(Ctrl+L\)

Elimina los renglones seleccionados.

Observaciones

Para eliminar los renglones seleccionados, puede hacerlo por medio de este
botón o seleccionando las teclas \(Ctrl-L\)

---

# Insertar renglones

Inserta renglones según la selección.

---

# Arrastrar datos \(Ctrl-A\)

Copia el contenido del renglón superior en las celdas seleccionadas

Ejemplo

![Arrastar.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Arrastar.jpg)



Observaciones

Si selecciona varias columnas, la opción arrastrar copiará el contenido de la
fila previa a la selección de igual manera.

---

# Duplicar renglones \(Ctrl-D\)

Duplica la información de los renglones superiores en las celdas
seleccionadas.

Ejemplo

Duplicar 1 renglón:

![Duplicar.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Duplicar.jpg)

![Duplicar2.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Duplicar2.jpg)

Duplicar múltiples renglones:

![Duplicar3.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Duplicar3.jpg)

![Duplicar4.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Duplicar4.jpg)

---

# Copiar

Copia el contenido de la\(s\) celda\(s\) seleccionada\(s\) al portapapeles
\(Ctrl-C\)

Ejemplo

![Copiar.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Copiar.jpg)

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

![Pegar.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Pegar.jpg)

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
que se esté haciendo referencia.


Ejemplo

Al salir del modo de edición, el sistema podrá presentar en la celda el nombre
\(al que corresponde el código\) o el código mismo, según el estado de esta
opción:

## Opción activada

Cuando está; activada la opción "Formato a celdas y la columna es
suficientemente ancha se visualiza el nombre interpretado de los códigos.

![Formato_celdas.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Formato_celdas.jpg)


## Opción desactivada

Cuando está desactivada la opción "Formato a celdas ó

Cuando la columna es muy estrecha, se visualizan los códigos.

![Formato_celdas2.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Formato_celdas2.jpg)

El ancho de una columna se modifica posicionando el mouse sobre el límite
derecho del encabezado de la columna y arrastrando con el botón izquierdo del
mouse.

![Formato_celdas3.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Formato_celdas3.jpg)

Observaciones

Si tiene mucha información en una tabla y experimenta algo de lentitud, puede
ser conveniente desactivar esta opción.

Configuración

Para guardar el ancho de las columnas, entre por: **\[Menú: Operación >
Guardar la presentación\].**

---

# Deshacer

Deshace el último cambio realizado sobre el listado de egresos \(Ctrl-Z\).
Permite deshacer hasta 100 modificaciones, sin incluir eliminación o inserción
de renglones completos.

---

# Color a renglones

Le pone color a los renglones pares.
Al activar esta opción, el sistema colorea los renglones alternos para
facilitar la ubicación y el análisis de los datos en un registro específico.

Ejemplo

![Color_Rows.jpg](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/COM3%20-%20Gastos%20diferidos/%5B13600%5D%20FrmDlgOprCOM3/Color_Rows.jpg)



Observaciones

Si la opción está desactivada, el sistema colorea con el color de fondo
predeterminado, todos los renglones editables.

---

# Gasto a diferir

Valor del activo diferido \(ofrecido por el proveedor\) al momento de su
adquisición.

Ejemplo

Diferido | Valor de compra
---|---
Seguro contra Incendios | $ 11.700.000 | Seguro terremotos | $ 12.800.000

Observaciones

Este valor forma parte fundamental del costo del activo, el cual se utiliza
para generar el importe depreciable y así calcular la depreciación mensual.

Configuración

Para configurar este campo como visible, solo lectura o requerido, puede
ingresar por: **\[Menú operación > Configurar operación > Campos de la
operación > Configuración de columnas en cargues de activos\]**

---

# Grupo

Código del grupo del gasto diferido

Ejemplo

  * Se crea un vehículo como activo, el grupo al cual se relaciona es: Flota y equipo de transporte.
  * Se crea un computador como activo, el grupo al cual se relaciona es: Equipo de cómputo y comunicaciones.
  * Se crea una oficina como activo, el grupo al cual se relaciona es: Construcciones y edificaciones.

Observaciones

  * Recuerde que dentro del grupo de activo se configuran las cuentas contables que el sistema \[ContaPyme\] afecta automáticamente cuando se realizan operaciones con el activo como: depreciación, revaluación, venta, baja, etc.
  * Si el activo tiene movimiento contable procesado, este campo estará en modo de solo lectura. Para poder cambiar el activo de grupo, deberá hacerlo por medio de la operación de reclasificación de activos o deberá desprocesar las operaciones que referencian a este activo.

Configuración

Para conocer o modificar la configuración de un grupo de activos, ingrese por:
**Menú Adicionales > Grupos de activos**

---

# Cuenta en el activo

Cuenta del activo donde \[ContaPyme\] se amortizará el diferido de forma
automática cuando se realiza la operación "acciones automáticas de fin de mes"
y se selecciona la opción de "Amortizaciones".

Ejemplo

Cada grupo de activo tiene una cuenta de depreciación \(crédito\) relacionada
en el plan de cuentas.
Algunas opciones de cuenta \(según el plan de cuentas para el sector
comercial\) pueden ser:

  * **159210:** Maquinaria y equipo.
  * **159215:** Equipo de oficina.
  * **159220:** Equipo de cómputo y comunicaciones.
  * **159235:** Flota y equipo de transporte.
  * Etc.

Se realiza la depreciación de un vehículo por valor de $ 450.000. El vehículo
está relacionado con el grupo "Flota y equipo de transporte".

Cuenta | Nombre cuenta | Débito | Crédito
---|---|---|---
**159235** | Depreciación flota y equipo de transporte |  | **$ 450.000**
516035 | Gasto por depreciación | $ 450.000 |

Observaciones

Cuando se realizan operaciones como venta o baja de un activo, esta cuenta de
depreciación se cancela, pues \[ContaPyme\] debe reversar todo el registro
contable asociado a las depreciaciones acumuladas.
Si el registro contable se debe realizar sobre la misma cuenta guía del
activo, se puede escribir el texto =ICuentaActivo.
El registro contable de la depreciación acumulada se refleja cada mes en el
"Estado de situación financiera."

---

# Amortizar gasto a Cuenta Diferido

Cuenta del gasto donde \[ContaPyme\] lleva las depreciaciones en forma
automática en cada acción de cierre de fin de mes.

Ejemplo

Cada grupo de activo tiene una cuenta de depreciación \(débito\) relacionada
en el plan de cuentas.
Algunas opciones de cuenta \(según el plan de cuentas para el sector
comercial\) pueden ser:

  * **516010:** Maquinaria y equipo.
  * **516015:** Equipo de oficina.
  * **516020:** Equipo de cómputo y comunicaciones.
  * **516035:** Flota y equipo de transporte.
  * Etc.

Se realiza la depreciación de un vehículo por valor de $ 450.000. El vehículo
está relacionado con el grupo "Flota y equipo de transporte".

Cuenta | Nombre cuenta | Débito | Crédito
---|---|---|---
159235 | Depreciación flota y equipo de transporte |  | $ 450.000
**516035** | Gasto por depreciación | **$ 450.000** |

Observaciones

El registro contable asignado al gasto se refleja cada mes en el "Estado de
resultados."

---

# Centro de Costos

Centro de costos al cual se le aplicarán automáticamente los gastos por
depreciación, deterioro o pérdida del activo.

Ejemplos

  * Se compra un computador para que el área de contabilidad realice su trabajo diario, en este caso el centro de costos asociado al activo es el departamento de contabilidad, pues es el área responsable del uso y administración del activo.
  * Se compra un vehículo para que se realicen las entregas de los productos vendidos, en este caso el centro de costos asociado al activo es el departamento comercial.

Observaciones

\[ContaPyme\] permite definir el centro de costos del activo a través del
tiempo; para esto haga clic en el botón de referencia en la opción "Modificar
valor a través del tiempo".
Esta opción es útil cuando un activo en el tiempo, pasa de una ubicación a
otra. \(Ejm: un vehículo que lo usaba la gerencia y luego se entregó al área
comercial\).

---

# Periodo amortización

Vida útil del gasto diferido

Ejemplo

Se realiza la compra de un seguro contra incendios para la empresa por valor
de $ 15.000.000, el cual se requiere diferir en 12 meses.

Observaciones

El número de meses indicado, será el numero de periodos de amortización del
diferido el cual se realizará de forma automática en las acciones de fin de
mes.

---

# Detalle

Permite especificar una descripción u observación corta para el registro del
egreso que se está realizando.

Ejemplo

El concepto de egreso que se registra es 513550 \(Transportes, fletes y
acarreos\), pero en la impresión se necesita detallar a que corresponde este
servicio de fletes, Ej.:"Servicio de flete y transporte de mercancía para la
Ruta: Manizales - Bogotá".
Concepto de pago  |  Cc. a cargar  |  Valor  |  Detalle
---|---|---|---
513550 - Transportes, fletes y acarreos  |  OP01- Operacionales  |  $450.000  |  **Servicio de flete y transporte de mercancía para la Ruta: Manizales - Bogotá.**

En el campo **"Detalle"** se debe indicar el detalle del ingreso adicional que
requiere que salga en el documento de impresión: Ejemplo: **Servicio de
transporte de mercancía para la sede principal del cliente, Ruta: Manizales -
Bogotá.**

Observaciones

La información indicada en este campo podrá consultarse en los exploradores de
contabilidad, asi como también en los informes de movimiento de cuentas
auxiliares.

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto de pago \(nombre de la cuenta contable\) en la
impresión del documento.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Configurar operación > Campos de la
operación > Configuración de columnas en gastos > Detalle\]**.

---

# Tercero

Código o identificación del tercero con el cual se registra el gasto por cada
renglón.

Ejemplo

Se va a registrar la causación de caja menor de la empresa del mes la primera
quincena del mes de abril, de la siguiente menera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
519530 - Utiles, papelería y fotocopias | $ 50.000 | 132 -Comprobante de causación de engreso | CCE-000158 | 01/04/2018 | **800300700-Papelería y Más S.A.**
519545 - Taxis y buses | $ 350.000 | 132 -Comprobante de causación de engreso | CCE-000159 | 12/04/2018 | **800600200-Taxis express S.A**
519565 - Parqueaderos | $ 280.000 | 132 -Comprobante de causación de engreso | CCE-000160 | 15/04/2018 | **75963256- Jorge Perez.**

En el campo **"Tercero"** Se debe indicar el código del tercero con la cual se
requiere soportar el gasto del renglón: Ejemplo: **800300700-Papelería y Más
S.A.**

Observaciones

Si alguna cuenta de las registradas está marcada para exigir tercero, el dato
"Tercero" será obligatorio.

Generalmente este campo es utilizado cuando el tercero del ingreso por
renglón, es diferente al tercero principal de la operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

---

# Gasto ha sido pagado a

Código del proveedor o tercero al cual se pagó el dinero.

Ejemplo

Se registra el pago del servicio de energía eléctrica a la empresa Central
Hidroeléctrica S.A. \(identificada con còdigo 800300100\), así que en el campo
Gasto ha sido pagado a, se indica código: **800300100**.

Observaciones

Si alguna cuenta de las registradas en la lista de gastos está marcada para
exigir tercero, se debe indicar este dato.

El tercero que se utiliza en el campo "Gasto ha sido pagado a", debe quedar
registrado en el catálogo de terceros ya que con la información de dicho
tercero se puede:

  * Generar informes por terceros o informes de impuestos.
  * Calcular automáticamente impuestos en la transacción \(dependiendo de la clasificación tributaria indicada en el tercero\).

Se recomienda siempre indicar el tercero en el campo "Gasto ha sido pagado a",
como requisito para la presentación de información exógena.

Se recomienda que este campo siempre sea diligenciado, para poder tener la
trazabilidad de operaciones de gastos generadas con diferentes terceros.

Si la forma de pago del ingreso genera una cuenta por pagar, el sistema por
defecto asigna el tercero registrado en el campo **"Gasto ha sido pagado a"**
, sin embrago el tercero en cartera se podrá modificar.

En caso de requerir registrar múltiples gastos y terceros dentro de esta
transacción, se debe activar la opción: **"Permitir diferentes tipos de
documentos y terceros para cada ingreso"[Ver
más.](<\[120\]Chk_BShowSupportInfo \(NA\).html>)**

Puede predeterminar un tercero en la operación, para que al momento de
realizar el gasto este campo se cargue por defecto.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver: **\[Menú Operación > Configuración > Campos de la operación
> Datos maestros de la operación\].**

Para configurar el tipo de tercero ingrese por: **\[Pestaña: Básico > Catálogo
de terceros > Seleccionar tercero > Clic derecho: Modificar > Tipo de
Tercero\].**

Para configurar el tecero por defecto en la operación, ver: **\[Menú Operación
> Configuración > Campos de la operación > Datos maestros de la operación\].**

---

# Permitir diferentes tipos de documento y terceros por cada gasto

Al activar esta opción, se visualizan columnas adicionales que permiten
asignar un tipo de documento, número de documento, fecha y tercero distinto
para el renglón de cada gasto.

Ejemplo

Se requieren registrar los gastos de caja menor de la empresa de la primera
quincena del mes de abril, como este ingreso se realiza a diferentes terceros
con diferentes tipos de documento, se activa la opción **"Permitir diferentes
tipos de documento y terceros por cada gasto"** para poder registrar los datos
correspondientes de dichos gastos de la siguiente manera:

Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
519530 - Utiles, papelería y fotocopias | $ 50.000 | 132 -Comprobante de causación de engreso | CCE-000158 | 01/04/2018 | 800300700-Papelería y Más S.A.
519545 - Taxis y buses | $ 350.000 | 130 -Comprobante de engreso | CCE-000159 | 12/04/2018 | 800600200-Taxis express S.A
519565 - Parqueaderos | $ 280.000 | 132 -Comprobante de causación de engreso | CCE-000160 | 15/04/2018 | 75963256- Jorge Perez.


Observaciones

En este caso, la fecha debe estar dentro del mismo mes que la fecha de soporte
de la operación.

Al momento de procesar la operación el registro quedará con la información
registrada en cada una de las columnas y se podrá visualizar en los
exploradores e informes contables.

Configuración

Para configurar la funcionalidad de este campo \(visible o solo lectura\),
ver: **\[Menú Operación > Configuración > Campos de la operación > Datos
maestros de la operación > Permitir diferentes terceros c./renglón\].**

Para configurar que esta opción esté activada por defecto, ver: **\[Menú
Operación > Configuración operación > Configuración de campos > Permitir
diferentes terceros\].**

---

# Referencia

Referencia que tendrá la cuenta por pagar, diferente al número documento
soporte de la operación.

Ejemplo

La empresa CMB Muebles Ltda, lleva control interno de la numeración para el
documento de las facturas de compra, sin embargo las cuentas por pagar deben
estar soportadas con el consecutivo de la factura que envía el proveedor, asi
que en el campo **"Referecia"** se indica el número de la factura de compra
correspondiente.

Observaciones

Si no se especifica este dato, la referencia del crédito será el número de
documento dado para la operación.

---

# Concepto de pago

Cuenta o concepto de la cuenta de gasto, a la cual se realiza la imputación.

Ejemplo

Se va a registrar un gasto por el servicio de energía eléctrica, para la sede
centro por valor de $250.000
Concepto de pago  |  Cc. a cargar  |  Valor
---|---|---
**513530 - Energía eléctrica** |  SD01- Sede centro  |  $250.000

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta de gasto que se requiere registrar. Ejemplo: **513530 - Energía
eléctrica**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de gastos.

Se pueden registrar tantos conceptos de gastos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto \(nombre de la cuenta contable\)en la impresión del
documento. [Ver más.](<\[60\]GridIngresosEgresos_TDETALLE \(NA\).html>)

---

# CC. a cargar

Código del centro de costos al que se le va a cargar o a imputar el ingreso
registrado.

Ejemplo

Se va a registrar un gasto por el servicio de energía eléctrica, para la sede centro por valor de $250.000  Concepto de pago | Cc. a cargar | Valor
---|---|---
513530 - Energía eléctrica | **SD01- Sede Centro** | $250.000
En el campo **"Cc. a cargar"** se debe indicar identificador del centro de
costo que tenemos previamente creado desde el explorador gráfico de empresas:
**SD01- Sede Centro**.

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

Puede determinar el código del centro de costos por defecto que se usará en
cada renglón de la operación para imputar el gasto correspondiente.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

Para configurar el centro de costos por defecto, ingrese a: **\[Menú Operación
> Configuración > Campos operación > Lista de elementos > Centro de costos por
defecto\]. **

---

# Valor

Valor total a pagar por el concepto de egreso que se está registrando.

Ejemplo

Se registra el pago del servicio de energía eléctrica del mes de abril, a la
empresa Central Hidroeléctrica S.A., por valor de $130.000.

Concepto de pago  |  Cc. a cargar  |  Valor
---|---|---
513530 - Energía eléctrica  |  AD01- Administrativos  |  **$130.000**

En el campo **"Valor"** se debe indicar el valor de ingreso que corresponde al
renglón: **$130.000**


Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.

---

# Detalle

Permite especificar una descripción u observación corta para el registro del
egreso que se está realizando.

Ejemplo

El concepto de egreso que se registra es 513550 \(Transportes, fletes y
acarreos\), pero en la impresión se necesita detallar a que corresponde este
servicio de fletes, Ej.:"Servicio de flete y transporte de mercancía para la
Ruta: Manizales - Bogotá".
Concepto de pago  |  Cc. a cargar  |  Valor  |  Detalle
---|---|---|---
513550 - Transportes, fletes y acarreos  |  OP01- Operacionales  |  $450.000  |  **Servicio de flete y transporte de mercancía para la Ruta: Manizales - Bogotá.**

En el campo **"Detalle"** se debe indicar el detalle del ingreso adicional que
requiere que salga en el documento de impresión: Ejemplo: **Servicio de
transporte de mercancía para la sede principal del cliente, Ruta: Manizales -
Bogotá.**

Observaciones

La información indicada en este campo podrá consultarse en los exploradores de
contabilidad, asi como también en los informes de movimiento de cuentas
auxiliares.

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto de pago \(nombre de la cuenta contable\) en la
impresión del documento.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Configurar operación > Campos de la
operación > Configuración de columnas en gastos > Detalle\]**.

---

# Tipo de documento

Tipo de documento de soporte que sustenta la transacción registrada del
renglón.

Ejemplo

Se requieren registrar los gastos de servicios públicos del mes de abril,
soportados en diferentes terceros y tipos de documento soporte de la siguiente
manera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
513530 - Energía eléctrica | $ 200.000 | **130 -Comprobante de engreso** | CE-000138 | 05/04/2018 | 800300100-Central Hidroeléctrica S.A.
513525 - Acueducto y alcantarillado | $ 350.000 | **132 -Comprobante de causación de engreso** | CCE-000159 | 05/04/2018 | 800200100-Aguas de Caldas S.A.S
513535 - Teléfono | $ 280.000 | **130 -Comprobante de engreso** | CE-000140 | 05/04/2018 | 800400500-Empresas de Telefonía S.A.

En el campo **"Tipo de documento"** se debe indicar el identificador del tipo
de documento con el cual se requiere soportar el gasto del renglón: Ejemplo:
**132 - Comprobante de causación de engreso**

Observaciones

Este campo es requerido en la operación.

\[ContaPyme\] trae pre-configurados múltiples documentos de soporte listos
para usar. Para seleccionar el tipo de documento soporte requerido basta con
dar doble clic sobre el campo o usar la tecla F3.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

---

# Número documento

Número del documento de soporte que sustenta la transacción registrada del
renglón.

Se requieren registrar los gastos de servicios públicos de la empresa del mes
de abril, soportados en diferentes terceros y tipos de documento soporte de la
siguiente manera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
513530 - Energía eléctrica | $ 200.000 | 130 -Comprobante de engreso | **CE-000138** | 05/04/2018 | 800300100-Central Hidroeléctrica S.A.
513525 - Acueducto y alcantarillado | $ 350.000 | 132 -Comprobante de causación de engreso | **CCE-000159** | 05/04/2018 | 800200100-Aguas de Caldas S.A.S
513535 - Teléfono | $ 280.000 | 130 -Comprobante de engreso | **CE-000140** | 05/04/2018 | 800400500-Empresas de Telefonía S.A.

En el campo **"Número de docuemnto"** se debe indicar la referencia con el
cual se requiere soportar el gasto del renglón: **Ejemplo: CCE-000159**

Observaciones

En la impresión del documento, sólo se mostrará el número de documento de la
operación, no el del renglón.

Regularmente el número de documento corresponde a la factura, recibo o
comprobante que envía directamente el proveedor que presta el servicio.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

---

# Fecha

Fecha de soporte específica para la contabilización por renglón de cada
registro.

Ejemplo

Se va a registrar la causación de caja menor de la empresa de la primera
quincena del mes de abril, de la siguiente manera:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
519530 - Utiles, papelería y fotocopias | $ 50.000 | 132 -Comprobante de causación de engreso | CCE-000158 | **01/04/2018** | 800300700-Papelería y Más S.A.
519545 - Taxis y buses | $ 350.000 | 132 -Comprobante de causación de engreso | CCE-000159 | **12/04/2018** | 800600200-Taxis express S.A
519565 - Parqueaderos | $ 280.000 | 132 -Comprobante de causación de engreso | CCE-000160 | **15/04/2018** | 75963256- Jorge Perez.

En el campo **"Fecha"** se debe indicar la fecha con la cual se requiere
soportar el gasto del renglón: Ejemplo: **15/04/2018**

Observaciones

La fecha debe estar dentro del mismo mes que la fecha de soporte de la
operación.

Puede configurar que la fecha de soporte de la operación NO pueda ser
modificada.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en gastos\].**

Para configurar que la fecha de soporte de la operación NO pueda ser
modificada, ver: **\[Menú Operación > Configuración > Campos de la operación >
Datos de encabezado > Clase y fecha operación\].**

---

# Acerca de ventana

## OPERACIÓN DE GASTOS



## Objetivo

Esta ventana tiene como finalidad el registro de forma simple y rápida de los
egresos o salidas de dinero en los que incurre la empresa para la obtención de
un bien o servicio, permitiendo que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar dichos registros con solo indicar
datos básicos del documento \(¿qué?, ¿quién?, ¿cuánto?, etc.\), para que así
el sistema realice los asientos contables \(débitos y créditos\) que
correspondan en forma totalmente automática.

Adicionalmente permite imprimir el comprobante de egreso o factura de compra,
dependiendo de las necesidades de cada usuario, con todos los datos
registrados en la operación.

## Ejemplo de información a registrar

Se va a registrar un gasto por el servicio de energía eléctrica, para la sede
centro por valor de $250.000.

Se requiere registrar los gastos de caja menor de la empresa de la primera
quincena del mes de abril, realizados a diferentes terceros con diferentes
tipos de documento.

La información relevante para registrar el gasto o egreso es:

  * Código del tercero proveedor con el cual se registra el gasto.
  * Cuenta o concepto de la cuenta de gastos, a la cual se realiza la imputación.
  * Valor total a recibir por el concepto de gasto que se está registrando.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de egreso, comprobante de
causación de egreso o factura de compra, este tipo de documento se puede
definir por defecto y el sistema automáticamente asignará el consecutivo
correspondiente según su configuración.

También es necesario identificar la fecha de soporte y el tercero con quien se
está realizando el gasto por el concepto correspondiente.

## Sección registro

En la zona de registro hay diferentes columnas que permiten registrar la
información básica de la operación como: el concepto de pago del egreso, el
centro de costos, el valor del egreso y el detalle del egreso que se requiere
que salga en el documento de impresión.

El seleccionador de cuentas de la operación trae un filtro por defecto donde
sólo muestra las cuentas de gastos.

En caso de que requiera registrar el gasto de diferentes conceptos, con
diferentes terceros y tipos de documentos, debe activar la opción "Permitir
diferentes tipos de documento y terceros por cada gasto", y de esta forma se
visualizan columnas adicionales que le permiten asignar un tipo de documento,
número de documento, fecha y tercero distinto para el renglón de cada gasto.

## Sección liquidación

Registro de los descuentos, cargos o impuestos causados en el egreso a los que
aplique.

## Sección forma de pago

Permite definir la forma como se cancelará el egreso y demás cargos o
descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por pagar \(CXP\).
  * Cruce \(cruce con CXC al proveedor\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección la operación de gastos permite la impresión de los siguientes
documentos como soporte de la transacción

  * Comprobante de egreso con cheque.
  * Comprobante de compra.
  * Factura equivalente.
  * Comprobante de egreso.
  * Comprobante de egreso en tirilla.
  * Comprobante de caja menor.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección forma de pago

Permite definir la forma como se cancelará el egreso y demás cargos o
descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por pagar \(CXP\).
  * Cruce \(cruce con CXC al proveedor\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Genera el movimiento contable de los diferentes registros de la transacción.
  * Afecta los diferentes informes de proveedores, en caso de que la forma de pago se registre como cuenta por pagar.
  * Procesa los descuentos o cargos que apliquen en la operación.
  * Procesa la forma de pago o de egreso.

---

# Cliente

Código del tercero \(cliente\) que realiza la devolución del pago por los
servicios prestados.

Ejemplo



Si al momento de registrar la venta se indica como cliente al tercero:
**30402491 - Beatriz Duque** ; este mismo tercero deberá indicarse como
**"Cliente"** al momento de la devolución.

Observaciones



El cliente es necesario si se va a seleccionar como referencia de la
devolución una factura de venta, al igual que para el registro de algunas
formas de cobro \(cxc, cruce\).

Configuración



Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Nota crédito a ingresos > Configurar
operación > Campos de la operación > Datos maestros de la operación\].**

---

# Motivo

El motivo es la razón por la cual se debío realizar la nota crédito a
ingresos.

Ejemplo

En una empresa dedicada a la venta y soporte técnico de computadores, se
realiza la prestación de servicio técnico a un cliente por un valor de
$80.000, luego de facturado el servicio en la empresa se dieron cuenta que
estaba mal facturado ya que las horas invertidas en la revisión del computador
fueron menos de las que se habían facturado, debido a esto el valor real es de
$65.000 y en la empresa tuvieron que realizar la nota crédito a ingresos
mencionando en ella el valor que se había cobrado de mas al cliente en la
primera factura que realizaron.

En este caso el motivo de la nota es **Devolución parcial** ya que el valor
registrado anteriormente estaba incorrecto.

Observaciones

Recuerde que es importante llenar este campo ya que para la documentación en
la facturación electrónica enviada a la DIAN, se le debe hacer claridad en el
motivo por el cual se realizó la nota crédito a ingresos para que esta tenga
validez.

Los principales motivos que menciona la DIAN por los cuales se realiza una
nota crédito a ingresos son:

* Devolución parcial
* Anulación de factura electrónica
* Rebaja total aplicada
* Descuento total aplicado
* Rescisión

---

# Referencia

Número de la factura de venta, a la cual se realizará la nota crédito a
ingresos por los diferentes servicios prestados.

Si se indica la factura de venta, se cargará automáticamente el listado de
servicios vendidos y sus respectivos precios.

Ejemplo



Se registra la factura de venta **FV-20560** donde se detalla el siguiente
servicio:

Concepto de pago | CC. a cargar | Valor | Detalle | Mantenimiento y reparación de maquinaria y equipo | Servicios y reparaciones | $650.000 | Reparación de equipos de computo
---|---|---|---

Al momento de realizar la nota crédito a ingresos, se selecciona en el campo
referencia el documento **FV-20560** , el cual carga automáticamente el
servicio del listado anterior, con su respectivo valor y detalle.

Observaciones



Se puede seleccionar como referencia una o varias facturas de venta a la vez.

Es posible configurar para que la nota crédito a ingresos permita cargar datos
adicionales \(valor 1,2,3,...\) registrados en el documento referencia, ver:
**\[Operación: nota crédito a ingresos > Configurar operación > Campos de la
operación > Datos adicionales del documento referencia\].**

---

# Motivo

El motivo es la razón por la cual se debío realizar la nota crédito.

Ejemplo

En una empresa dedicada a la comercialización de accesorios para computador,
se venden 5 mouse por un valor de $30000 c/u, luego de facturados estos
productos en la empresa se dieron cuenta que estaban mal facturados ya que el
precio real de venta era de $25000 c/u, debido a esto debieron realizar la
nota crédito mencionando el valor que se cobro de mas en la primera factura
que había quedado mal realizada.

En este caso el motivo de la nota es **Devolución parcial** ya que el valor
registrado anteriormente estaba incorrecto.

Observaciones

Recuerde que es importante llenar este campo ya que para la documentación en
la facturación electrónica enviada a la DIAN, se le debe hacer claridad en el
motivo por el cual se realizó la nota crédito para que esta tenga validez.

Los principales motivos que menciona la DIAN por los cuales se realiza una
nota crédito son:

* Devolución parcial
* Anulación de factura electrónica
* Rebaja total aplicada
* Descuento total aplicado
* Rescisión

---

# Acerca de ventana

## OPERACIÓN NOTA CRÉDITO DE INGRESOS



## Objetivo

Esta ventana tiene como finalidad el registro de las notas crédito de ingresos
que se perciben en la empresa por facturación de conceptos o servicios de
forma simple y rápida, permitiendo que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar dichos registros con solo indicar
datos básicos del documento \(¿qué?, ¿quién?, ¿cuánto?, etc.\), para que así
el sistema realice los asientos contables \(débitos y créditos\) que
correspondan en forma totalmente automática.

Adicionalmente tendrá la posibilidad de poder imprimir el documento,
dependiendo de las necesidades de cada usuario, con todos los datos
registrados en la operación.

## Ejemplo de información a registrar

Se realizará una venta por prestación de servicio de alquiler de mobiliario el
día 14 de diciembre, a la señora Carolina Salgado, por valor de $750.000. El
pago se realizó en efectivo.

Se requiere registrar el ingreso por concepto de "Servicio de transporte por
carretera", por valor de $550.000 al cliente Transportes ABC, soportado en el
documento factura de venta.

La información relevante para registrar el ingreso es:

  * Código del cliente o tercero con el cual se registra el ingreso.
  * Cuenta o concepto de la cuenta de ingreso, a la cual se realiza la imputación.
  * Valor total a recibir por el concepto de ingreso que se está registrando.
  * Observaciones que aparecerán en la factura de venta impresa.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de ingreso o factura de
venta, este tipo de documento se puede definir por defecto, y el sistema
automáticamente asignará el consecutivo correspondiente según su
configuración.

También es necesario identificar la fecha de soporte, el cliente quien está
realizando el ingreso por el concepto correspondiente, al igual que un campo
para digitar el código de vendedor, en caso de que esté realizando un ingreso
por concepto de bienes o servicios.

## Sección registro

En la zona de registro hay diferentes columnas que permiten registrar la
información básica de la operación como: el concepto de pago del ingreso, el
centro de costos, el valor del ingreso y el detalle del ingreso que se
requiere que salga en el documento de impresión.

El seleccionador de cuentas de la operación trae un filtro por defecto donde
sólo muestra las cuentas de ingresos.

En caso de que requiera registrar el ingreso de diferentes conceptos, con
diferentes terceros y tipos de documentos, debe activar la opción "Permitir
diferentes tipos de documento y terceros por cada ingreso", y de esta forma se
visualizan columnas adicionales que le permiten asignar un tipo de documento,
número de documento, fecha y tercero distinto para el renglón de cada ingreso.

## Sección observaciones

Permite indicar las observaciones que aparecerán en la factura de venta
impresa o en algún otro documento que se imprima a partir de esta operación.

## Sección liquidación

Registro de los descuentos, cargos o impuestos causados en el ingreso a los
que aplique.

## Sección forma de pago

Permite definir la forma como el tercero cancelará el ingreso y demás cargos o
descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(cruce con CXP al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de ingresos permite la impresión de los siguientes documentos
como soporte de la transacción:

  * Cuenta de cobro.
  * Factura de venta.
  * Factura de venta en tirilla.
  * Recibo de caja.
  * Recibo de caja en tirilla texto.
  * Comprobante de ingreso.
  * Comprobante de ingreso en tirilla.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Genera el movimiento contable de los diferentes registros de la transacción.
  * Afecta los diferentes informes de cartera, en caso de que la forma de pago se registre como cuenta por cobrar.
  * Procesa los descuentos o cargos que apliquen en la operación.
  * Procesa la forma de cobro o de ingreso.

---

# Cliente

Código del tercero \(cliente\) que realiza la devolución del pago por los
servicios prestados.

Ejemplo



Si al momento de registrar la venta se indica como cliente al tercero:
**30402491 - Beatriz Duque** ; este mismo tercero deberá indicarse como
**"Cliente"** al momento de la devolución.

Observaciones



El cliente es necesario si se va a seleccionar como referencia de la
devolución una factura de venta, al igual que para el registro de algunas
formas de cobro \(cxc, cruce\).

Configuración



Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Nota crédito a ingresos > Configurar
operación > Campos de la operación > Datos maestros de la operación\].**

---

# Motivo

El motivo es la razón por la cual se debío realizar la nota crédito a
ingresos.

Ejemplo

En una empresa dedicada a la venta y soporte técnico de computadores, se
realiza la prestación de servicio técnico a un cliente por un valor de
$80.000, luego de facturado el servicio en la empresa se dieron cuenta que
estaba mal facturado ya que las horas invertidas en la revisión del computador
fueron menos de las que se habían facturado, debido a esto el valor real es de
$65.000 y en la empresa tuvieron que realizar la nota crédito a ingresos
mencionando en ella el valor que se había cobrado de mas al cliente en la
primera factura que realizaron.

En este caso el motivo de la nota es **Devolución parcial** ya que el valor
registrado anteriormente estaba incorrecto.

Observaciones

Recuerde que es importante llenar este campo ya que para la documentación en
la facturación electrónica enviada a la DIAN, se le debe hacer claridad en el
motivo por el cual se realizó la nota crédito a ingresos para que esta tenga
validez.

Los principales motivos que menciona la DIAN por los cuales se realiza una
nota crédito a ingresos son:

* Devolución parcial
* Anulación de factura electrónica
* Rebaja total aplicada
* Descuento total aplicado
* Rescisión

---

# Referencia

Número de la factura de venta, a la cual se realizará la nota crédito a
ingresos por los diferentes servicios prestados.

Si se indica la factura de venta, se cargará automáticamente el listado de
servicios vendidos y sus respectivos precios.

Ejemplo



Se registra la factura de venta **FV-20560** donde se detalla el siguiente
servicio:

Concepto de pago | CC. a cargar | Valor | Detalle | Mantenimiento y reparación de maquinaria y equipo | Servicios y reparaciones | $650.000 | Reparación de equipos de computo
---|---|---|---

Al momento de realizar la nota crédito a ingresos, se selecciona en el campo
referencia el documento **FV-20560** , el cual carga automáticamente el
servicio del listado anterior, con su respectivo valor y detalle.

Observaciones



Se puede seleccionar como referencia una o varias facturas de venta a la vez.

Es posible configurar para que la nota crédito a ingresos permita cargar datos
adicionales \(valor 1,2,3,...\) registrados en el documento referencia, ver:
**\[Operación: nota crédito a ingresos > Configurar operación > Campos de la
operación > Datos adicionales del documento referencia\].**

---

# Descripción

Descripción del ingreso diferido indicado en el renglón.

Ejemplo

En la venta realizada al señor Juan Ramírez por concepto de una póliza de
seguro para su auto, la descripción podría ser el detalle de la aseguradora
con la que se toma la póliza.

Observaciones

La descripción indicada en cada renglón reemplaza el nombre de la cuenta y se
puede visualizar en el documento de impresión "Comprobante de Ingreso"
generado por la operación.

---

# Recibido de

Código de identificación del tercero del cual se recibe el ingreso.

Ejemplo

Al señor Juan Ramírez identificado con cédula 75.089.256 se le ha realizado la
venta de una póliza de seguro, que será diferida a 12 meses.

En el campo **"Recibido de"** se debe seleccionar el tercero con código
**75.089.256**.

Observaciones

El tercero debe estar previamente creado en el catálogo de terceros.

Para seleccionar el tercero puede hacer uso de la tecla F5.

Al momento de seleccionar el tercero, el sistema mostrará los terceros que en
el catálogo de terceros esten marcados como tipo de tercero "Cliente".

La obligatoriedad de este campo depende de la configuración de la cuenta de
ingresos indicada en la operación.

Configuración

Puede configurarse un tercero por defecto como cliente.

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, valor por defecto\), ver: **\[Operación: Ingresos recibidos por
anticipado > Configurar operación > Campos de la operación > Datos maestros de
la operación\].**

---

# Permitir diferentes tipos de documento y terceros por cada ingreso.

Al activar esta opción, se visualizan columnas adicionales que permiten
asignar un tipo de documento, número de documento, fecha y tercero distinto
para el renglón de cada ingreso.

Ejemplo

Si requiere registrar ingresos para diferentes terceros con diferentes tipos
de documento, se activa la opción **"Permitir diferentes tipos de documento y
terceros por cada ingreso"** para poder registrar los datos correspondientes
de dichos ingresos de la siguiente manera:

Concepto de pago | CC a cargar | Valor | Tipo de documento  | Número documento | Fecha | Tercero
---|---|---|---|---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 200.000 | Comprobante de Ingreso | CI-00187 | 15/03/2018 | Juan Ramírez
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 120.000 | Comprobante de Ingreso | CI-00206 | 22/03/2018 | Rosa Gómez

Observaciones

En este caso, la fecha debe estar dentro del mismo mes que la fecha de soporte
de la operación.

Al momento de procesar la operación el registro quedará con la información
registrada en cada una de las columnas y se podrá visualizar en los
exploradores e informes contables.

Configuración

Para configurar la funcionalidad de este campo \(visible o solo lectura\),
ver: **\[Operación: Ingresos recibidos por anticipado > Configuración > Campos
de la operación > Datos maestros de la operación > Permitir diferentes
terceros c./renglón\].**

Para configurar que esta opción esté activada por defecto, ver: **\[Operación:
Ingresos recibidos por anticipado > Configurar operación > Configuración de
campos > Permitir diferentes terceros\].**

---

# Concepto de pago

Cuenta o concepto del ingreso, a la cual se realiza la imputación.

Ejemplo

Se va a registrar un ingreso adicional por el servicio asesoría jurídica, por
valor de $200.000.

Concepto de pago | Cc. a cargar | Valor
---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $200.000

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta del ingreso que se requiere registrar: **415550 - Actividades
empresariales de consultoria.**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de ingresos.

Se pueden registrar tantos conceptos de ingresos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto \(nombre de la cuenta contable\)en la impresión del
documento. [Ver más.](<\[60\]GridIngresosEgresos_TDETALLE \(NA\).html>)

---

# Centro de costos a cargar

Código del centro de costos al que se le va a cargar el ingreso registrado.

Ejemplo

Se va a registrar un ingreso adicional por el servicio asesoría jurídica, por
valor de $200.000.
Concepto de pago | Cc. a cargar | Valor
---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $200.000

En el campo **"Centro de costos a cargar"** se debe indicar el identificador
del centro de costos donde se va a cargar el ingreso: **Ej. SD01- Sede
centro.**

Observaciones

La exigencia del centro de costos depende de la configuración de la cuenta del
ingreso. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

---

# Valor

Valor del ingreso que se está registrando.

Ejemplo

Se va a registrar un ingreso adicional por el servicio asesoría jurídica, por
valor de $200.000.
Concepto de pago | Cc. a cargar | Valor
---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $200.000

En el campo **"Valor"** se debe indicar el valor del ingreso por concepto de
asesoría jurídica: **$ 200.000**

Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.

---

# Detalle

Detalle y observación del ingreso registrado.

Ejemplo



Se va a registrar un ingreso adicional por el servicio asesoría jurídica, por
valor de $200.000.
Concepto de pago | Cc. a cargar | Valor
---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $200.000

En el campo **"Detalle"** se puede especificar el tipo de asesoría recibida.
**Ej. Asesoría Siniestro 26028 - Placa vehículo GTH458.**

Observaciones

La descripción indicada en cada renglón reemplaza el nombre de la cuenta y se
puede visualizar en el documento de impresión "Comprobante de Ingreso"
generado por la operación.

---

# Tipo de documento

Tipo de documento de soporte que soporta la transacción registrada en el
renglón.

Ejemplo

Si requiere registrar los siguientes ingresos para diferentes terceros con
diferentes tipos de documento:

Concepto de pago | CC a cargar | Valor | Tipo de documento  | Número documento | Fecha | Tercero
---|---|---|---|---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 200.000 | Comprobante de Ingreso | CI-00187 | 15/03/2018 | Juan Ramírez
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 120.000 | Comprobante de Ingreso | CI-00206 | 22/03/2018 | Rosa Gómez

En el campo **"Tipo documento"** se debe seleccionar el documento que soporta
cada transacción. **Ej. Comprobante de ingreso.**

Observaciones

Este campo es requerido en la operación.

Se puede seleccionar el tipo de documento soporte usando a tecla F3.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Operación: Ingresos recibidos por anticipado > Configurar
operación > Campos de la operación > Configuración de columnas en
ingresos\].**

---

# Número documento

Número del documento de soporte que soporta la transacción registrada en el
renglón.

Ejemplo

Si requiere registrar los siguientes ingresos para diferentes terceros con
diferentes tipos de documento:

Concepto de pago | CC a cargar | Valor | Tipo de documento  | Número documento | Fecha | Tercero
---|---|---|---|---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 200.000 | Comprobante de Ingreso | CI-00187 | 15/03/2018 | Juan Ramírez
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 120.000 | Comprobante de Ingreso | CI-00206 | 22/03/2018 | Rosa Gómez

En el campo **"Número documento"** se debe indicar el número del documento que
soporta cada transacción. **Ej. CI-00187.**

Observaciones

En la impresión del documento "Comprobante de Ingreso", se mostrará el número
de documento de soporte de la operación en general, no el especificado en cada
renglón.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Operación: Ingresos recibidos por anticipado > Configurar
operación > Campos de la operación > Configuración de columnas en
ingresos\].**

---

# Fecha

Fecha de soporte de la transacción registrada en el renglón.

Ejemplo

Si requiere registrar los siguientes ingresos para diferentes terceros con
diferentes tipos de documento:
Concepto de pago | CC a cargar | Valor | Tipo de documento  | Número documento | Fecha | Tercero
---|---|---|---|---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 200.000 | Comprobante de Ingreso | CI-00187 | 15/03/2018 | Juan Ramírez
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 120.000 | Comprobante de Ingreso | CI-00206 | 22/03/2018 | Rosa Gómez

En el campo **"Fecha"** se debe indicar la fecha en la cual se realizó cada
transacción. **Ej. 15/03/2018.**

Observaciones

La fecha debe estar dentro del mismo mes que la fecha de soporte de la
operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Operación: Ingresos recibidos por anticipado > Configurar
operación > Campos de la operación > Configuración de columnas en
ingresos\].**

---

# Tercero

Código o identificación del tercero con el cual se registra el ingreso por
cada renglón.

Ejemplo

Si requiere registrar los siguientes ingresos para diferentes terceros con
diferentes tipos de documento:
Concepto de pago | CC a cargar | Valor | Tipo de documento  | Número documento | Fecha | Tercero
---|---|---|---|---|---|---
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 200.000 | Comprobante de Ingreso | CI-00187 | 15/03/2018 | Juan Ramírez
415550 - Actividades empresariales de consultoria. | SD01- Sede centro | $ 120.000 | Comprobante de Ingreso | CI-00206 | 22/03/2018 | Rosa Gómez

En el campo **"Tercero"** se debe seleccionar o indicar el código del tercero
con el cual se realizó cada transacción. **Ej. 75826956- Juan Ramírez.**

Observaciones

La exigencia del tercero depende de la configuración de la cuenta a la que se
esta realizando la imputación.

Generalmente este campo es utilizado cuando el tercero del ingreso por
renglón, es diferente al tercero principal de la operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Operación: Ingresos recibidos por anticipado > Configurar
operación > Campos de la operación > Configuración de columnas en
ingresos\].**

---

# Código del diferido

Código de identificación del activo diferido.
El código del activo diferido puede ser un código alfanúmerico de fácil
recordación de hasta 30 caracteres.

Este código hará parte de un código más completo a través del cual el sistema
\[ContaPyme\] se identificará el activo en el catálogo de activos.
El código del diferido en el catálogo de activos se compone de:

  * Dos primeros digitos del año.
  * Dos primeros digitos del mes.
  * Número del documento de soporte de la operación.
  * Código asignado al activo.

Ejemplo

El dia 18 de octubre de 2018, se realiza el comprobante de ingreso CI-01859,
en el cual el señor Juan Ramírez realiza la compra de una póliza de seguro,
que será diferida a 12 meses.

El código asignado al activo en la operación es el código: "100".

Por tanto, el código del activo en el catálogo de activos quedaría asi:
**1810-CI-01859-100**
18 - Últimos dos digitos del año.
10 - Últimos dos digitos del mes
CI-01859 - Número del documento de soporte.
100 - Código del activo

Observaciones

Varios activos diferidos pueden tener el mismo código de identificación ya que
el código final del mismo incluira el número del documento de soporte de la
operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, valor por defecto\), ver: **\[Operación: Ingresos recibidos por
anticipado > Configurar operación > Campos de la operación > Configuración de
columnas en ingresos recibidos por anticipado\].**

---

# Valor base

Valor base de cálculo con el cual se determinó el valor de la operación.
Generamente este valor es requerido para las cuentas de impuestos como IVA,
retención, ICA, etc.

Ejemplo

Se registra la cuenta 24080102 \(Ingresos con IVA 19%\) con un valor de
$19.000 correspondiente a un IVA del 19%, asi que el valor base es de
$100.000.

Observaciones

Esta casilla se activa cuando la cuenta tenga activado el atributo de "exigir
valor base". Para las cuentas que no lo tengan activado, este campo no será
editable dentro del renglón de registro de la operación.

Configuración

Texto de configuración **\[Operación: Ingresos recibidos por anticipado >
Configurar operación > Campos de la operación > Configuración de columnas en
ingresos\].**

---

# Nombre del activo diferido

Nombre que se asignará al activo diferido.

El nombre del activo se mostrará en el campo descripción al imprimir el
"Comprobante de ingreso".

Ejemplo

A través del comprobante de ingreso CI-01859, el señor Juan Ramírez realiza la
compra de una póliza de seguro, que será diferida a 12 meses.

En la columna **"Nombre diferido"** se detalla el ingreso diferido. **Ej.
Póliza de seguro Auto JJB125.**

Observaciones

El nombre del activo permite la busqueda del activo en el catálogo de activos.

---

# Ingreso a diferir

Valor por el cual se registrará el ingreso recibido por anticipado.

Ejemplo

A través del comprobante de ingreso CI-01859, el señor Juan Ramírez realiza la
compra de una póliza de seguro para su auto, por valor de $1.500.000.

En la columna **"Ingreso a diferir"** se indica el valor total del ingreso
pagado por el señor Ramírez: **$1.500.000.**

Observaciones

El valor indicado en este campo no debe incluir impuestos, ya que estos se
detallan en el paso de "Liquidación".

---

# Grupo

Código de identificación del grupo de activos al cual pertenece el activo
diferido.
El grupo del activo determina el manejo contable y la forma de amortización
tanto en contabilización local como NIIF del activo diferido.

Ejemplo

En el caso de ingresos recibidos por anticipado se debe seleccionar el grupo
"27", especificamente "2705 - Ingreso diferidos".

Observaciones

Al abrir el seleccionador de grupos, solo se mostrarán los grupos de activos
relacionados con diferidos. Si requiere seleccionar otro grupo debe quitar el
filtro "Adicional" que se indica en la parte inferior de la ventana de
selección.

Configuración

Para configurar un grupo de activo por defecto para la operación, ver:
**\[Operación: Ingresos recibidos por anticipado > Configurar operación >
Grupo y cuenta por defecto en ingresos diferidos\].**

Para conocer o modificar la configuración del grupo de activos "Ingresos
Diferidos", ver: **\[Pestaña: Adicionales > Grupos de activos\].**

---

# Cuenta en el pasivo

Código de la cuenta del PUC donde se cargará el pasivo generado por el ingreso
recibido.

Independiente de la forma de pago registrada para la transacción, el valor del
ingreso diferido se llevará a una cuenta del pasivo que se amortizará mes tras
mes.

Al crear el ingreso diferido, la cuenta del pasivo se acredita y cada mes
cuando se realice la amortización, se registrará un débito a la cuenta del
pasivo y un crédito al ingreso.

Ejemplo

En el caso de ingresos recibidos por anticipado se debe seleccionar una cuenta
auxiliar de la 2705, según el tipo de ingreso recibido:

  * 270505 - Intereses.
  * 270510 - Comisiones.
  * 270515 - Arrendamientos.
  * 270520 - Honorarios.
  * 270525 - Servicios técnicos.
  * 270595 - Otros.

Observaciones

Al abrir el seleccionador de cuentas, solo se mostrarán las cuentas auxiliares
de la cuenta 2705. Si requiere seleccionar otra cuenta debe quitar el filtro
"Adicional" que se indica en la parte inferior de la ventana de selección.

Para configurar una cuenta del pasivo por defecto para la operación, ver:
**\[Operación: Ingresos recibidos por anticipado > Configurar operación >
Grupo y cuenta por defecto en ingresos diferidos\].**

---

# Cuenta del ingreso donde se amortiza el diferido.

Código de la cuenta del PUC donde se amortizará el ingreso mensualmente.

La característica fundamental del ingreso recibido por anticipado radica en
que el ingreso no se registra en su totalidad al momento de registrar la
transacción.

Cuando se registra el ingreso inicialmente, se lleva al pasivo y mes tras mes,
se disminuye el pasivo y se registra el ingreso. Así durante toda la vida útil
del activo diferido.

Ejemplo



En la venta realizada al señor Juan Ramírez por concepto de una póliza de
seguro para su auto, la empresa indica la cuenta 413595 - Venta de otros
productos.



Observaciones



\[ContaPyme\] sugiere la cuenta del ingreso configurada en el grupo de activo,
pero puede ser modificada por el usuario.



Configuración

Para conocer o modificar la configuración del grupo de activos "Ingresos
Diferidos", ver: **\[Pestaña: Adicionales > Grupos de activos\].**

---

# Centro de costos donde cargar el ingreso

Código de identificación del centro de costos donde mes tras mes se cargará el
ingreso.

Ejemplo

En la venta realizada al señor Juan Ramírez por concepto de una póliza de
seguro para su auto, se indica que el ingreso se cargará mensualmente al
centro de costos "VEN0152 - Depto comercial, sede centro".

Observaciones

El centro de costos debe estar previamente creado en el Explorador gráfico de
la empresa. Para crear o consultar los centros de costos de la empresa, ver:
**\[Pestaña: Básico > Empresa > Explorador gráfico de la empresa y centros de
costos\].**

---

# Periodo de amortización

Vida útil del activo diferido.

Número de meses durante los cuales se va a diferir el ingreso recibido por
anticipado.

Ejemplo

En el caso de ingresos recibidos por anticipado generalmente se amortizan a 12
meses, pero el tiempo de amortización puede ser modificado por el usuario
según sus requerimientos.

Observaciones

\[ContaPyme\] sugiere el periodo de amortización configurado en el grupo de
activo, pero puede ser modificada por el usuario.

Configuración

Para conocer o modificar la configuración del grupo de activos "Ingresos
Diferidos", ver: **\[Pestaña: Adicionales > Grupos de activos\].**

---

# Acerca de ventana

## OPERACIÓN DE INGRESOS RECIBIDOS POR ANTICIPADO



## Objetivo

Esta ventana tiene como finalidad el registro de una operación de ingresos
recibidos por anticipado.

La operación de ingresos recibidos por anticipado se realiza para registrar un
ingreso que se desea no se cargue en su totalidad al ingreso tan pronto se
registre la operación.

Ejemplo:

  * Prestación de servicios.
  * Intereses.
  * Comisiones.
  * Arrendamientos.
  * Honorarios.
  * Entre otros.

La operación de ingresos recibidos por anticipado toma el valor del ingreso y
lo convierte en un activo, que se amortizará mensualmente causando el
respectivo ingreso mes tras mes.

La operación de ingresos recibidos por anticipado realiza un crédito a la
cuenta del pasivo correspondiente a ingresos recibidos por anticipado \(2705\)
y un débito a la cuenta de la forma de pago \(caja, bancos o cuentas por
cobrar\).

Mensualmente es necesario realizar la operación "Acciones automáticas de fin
de mes" para realizar el proceso de "Depreciaciones y
amortizaciones/diferido". Este proceso realiza un débito a la cuenta del
pasivo y un crédito a la cuenta del ingreso.

Para ingresar a la operación de "Acciones automáticas de fin de mes",
ver:**\[Pestaña: Básico > Catálogo de manejador de operaciones > Operaciones >
Contabilidad\]**.

## Ejemplo de información a registrar

El señor Juan Ramírez realiza la compra de una póliza de seguro para su auto,
por valor de $1.500.000.

El valor de la póliza se manejará como un ingreso recibido por anticipado que
se debe diferir a 12 meses.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite registrar el tipo de documento en el cual se soportará la operación,
que por defecto es:

  * Comprobante de ingreso y el número de dicho documento, que generalmente es un consecutivo interno manejado por \[ContaPyme\].

De forma opcional o a veces obligatoria se debe indicar el código o
identificación del tercero del cual se recibe el ingreso.

La exigencia o no de este dato depende de la configuración de la cuenta de
ingreso que se vaya a afectar.

## Sección datos del ingreso

Identificación del activo diferido que será creado con el valor del ingreso.

El nuevo activo se debe identificar con un código de hasta 30 caracteres.

El activo debe pertenecer a un grupo de activos especial que normalmente es el
27 – Ingresos diferidos.

El grupo del activo determina el manejo contable y la forma de amortización
tanto en contabilización local como NIIF del activo diferido.

También es necesario indicar la cuenta del pasivo y la cuenta del ingreso que
se afectará mensualmente.

Se debe indicar el centro de costos donde se imputará mes tras mes el ingreso
y por último el periodo de amortización que es el número de meses durante los
cuales se va a diferir el ingreso recibido por anticipado.

Toda la información detallada anteriormente se debe indicar por cada uno de
los ingresos recibidos por anticipado que se vayan a registrar.

## Sección otros ingresos

Lista de los otros ingresos generados en la operación.

Ejemplo:

Asesoría legal.

## Sección liquidación

Impuestos, descuentos y cargos que aplican al momento del registro del
ingreso:

  * IVA.
  * Impuesto al consumo.
  * Retención ICA.

Los impuestos se calculan automáticamente a través de la herramienta de
cálculo automático de impuestos.

## Sección forma de pago

Forma como el cliente cancelará el ingreso:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(cruce con CXP al cliente\).

Permite fijar una forma de pago por defecto para este tipo de operación y
consultar las cxc y cxp pendientes con el cliente

## Sección impresión de soportes

La operación de ingresos recibidos por anticipado permite la impresión de los
siguientes documentos como soporte de la transacción:

  * Cuenta de cobro.
  * Factura de venta.
  * Factura de venta en tirilla.
  * Recibo de caja.
  * Recibo de caja en tirilla texto.
  * Comprobante de ingreso.
  * Comprobante de ingreso en tirilla.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

---

# Tercero

Código o identificación del tercero con el cual se registra el ingreso por
cada renglón.

Ejemplo

Se realiza el registro de un servicio adicional por concepto de trasporte en
la factura de venta.
Concepto de pago | Valor | Tipo documento | Número documento | Fecha | Tercero
---|---|---|---|---|---
423510 - Servicio de transporte | $ 200.000 | 5 - Comprobante de ingreso | CI-000238 | 13/03/2018 | **800987678- Transportes ABS SAS**

En el campo **"Tercero"** se debe indicar el identificador del tercero para el
ingreso adicional del renglón correspondiente: **800987678- Transportes ABS
SAS**

Observaciones

Si alguna cuenta de las registradas está marcada para exigir tercero, el dato
"Tercero" será obligatorio.

Generalmente este campo es utilizado cuando el tercero del ingreso por
renglón, es diferente al tercero principal de la operación.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en ingresos\].**

---

# Recibido de

Código del cliente o tercero con el cual se registra el ingreso.

Ejemplo

Se registra un servicio de consultoría informática a la empresa Inversiones
ABC \(identificada con còdigo 800100200\), así que en el campo Recibido de, se
indica código: **800100200**.

Observaciones

Si alguna cuenta de las registradas en la lista de ingresos está marcada para
exigir tercero, se debe indicar este dato.

Al momento de seleccionar el tercero, se visualizarán aquellos terceros
configurados con el tipo de tercero **"Cliente"**.

El tercero que se utiliza en el campo Recibido de, debe quedar registrado en
el catálogo de terceros ya que con la información de dicho tercero se puede:

  * Generar informes por terceros o informes de impuestos.
  * Calcular automáticamente impuestos en la transacción \(dependiendo de la clasificación tributaria indicada en el tercero\).

Se recomienda siempre indicar el tercero en el campo "Recibido de", como
requisito para la presentación de información exógena.

Se recomienda que este campo siempre sea diligenciado, para poder tener la
trazabilidad de operaciones de ingresos generadas con diferentes terceros.

Si la forma de pago del ingreso genera una cuenta por cobrar, el sistema por
defecto asigna el tercero registrado en el campo **"Recibido de"** , sin
embrago el tercero en cartera se podrá modificar.

En caso de requerir registrar múltiples ingresos y terceros dentro de esta
transacción, se debe activar la opción: **"Permitir diferentes tipos de
documentos y terceros para cada ingreso"[Ver
más.](<\[130\]Chk_BShowSupportInfo \(NA\).html>)**

Puede predeterminar un tercero en la operación, para que al momento de
realizar el ingreso este campo se cargue por defecto.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver:**\[Menú Operación > Configuración > Campos de la
operación > Datos maestros de la operación\].**

Para configurar el tipo de tercero ingrese por: **\[Pestaña: Básico > Catálogo
de terceros > Seleccionar tercero > Clic derecho: Modificar > Tipo de
Tercero\].**

Para configurar el tercero por defecto en la operación, ver: **\[Menú
Operación > Configuración > Campos de la operación > Datos maestros de la
operación\].**

---

# Cód. Vendedor

Código del vendedor encargado de concretar la venta o el ingreso.

Ejemplo

Se registra un ingreso del vendedor Pablo Cardona, quien realizó la
negociación de la venta del servicio de transporte de mercancía, en este caso
debe indicar en el campo el código del vendedor 75687546.

Cliente: 800987678- Transportes ABS SAS | **Vendedor: 75687546- Pablo Cardona**
---|---
**CONCEPTO DE PAGO** | **VALOR**
414505 - Servicio de transporte por carretera | $ 200.000


Observaciones

El dato indicado en este campo se verá reflejado en el documento de impresión
de la operación y podrá consultarse en los informes y exploradores de
contabilidad y cartera.

Al momento de seleccionar el vendedor, se visualizan aquellos terceros
configurados con el tipo de tercero **"Vendedor"**.

Puede predeterminar el vendedor en la operación, para que al momento de
realizar la venta este campo se cargue por defecto.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver:**\[Menú Operación > Configuración > Campos de la
operación > Datos maestros de la operación\].**

Para configurar el vendedor por defecto en la operación, ver: **\[Menú
Operación > Configuración > Campos de la operación > Datos maestros de la
operación\].**

---

# Permitir diferentes tipos de documento y terceros por cada ingreso

Al activar esta opción, se visualizan columnas adicionales que permiten
asignar un tipo de documento, número de documento, fecha y tercero distinto
para el renglón de cada ingreso.

Ejemplo

Se requiere registrar el ingreso de diferentes servicios para el transporte de
mercancía, como este ingreso se realiza a diferentes terceros con diferentes
tipos de documento, se activa la opción **"Permitir diferentes tipos de
documento y terceros por cada ingreso"** para poder registrar los datos
correspondientes de dichos ingresos de la siguiente manera:

CONCEPTO DE PAGO | VALOR | DETALLE | FECHA:  | FACTURA No  | TERCERO
---|---|---|---|---|---
414505 - Transporte por carretera | $ 250.000 | Transporte de mercancía por carretera | 15/03/2018 | FV-00187 | Transportadora ABS SAS
414535 - Almacenamiento y depósito | $ 180.000 | Almacenamiento y depósito de mercancía  | 15/03/2018 | CI-00123 | MultiTransportadora SAS
Observaciones En este caso, la fecha debe estar dentro del mismo mes que la
fecha de soporte de la operación.

Al momento de procesar la operación el registro quedará con la información
registrada en cada una de las columnas y se podrá visualizar en los
exploradores e informes contables.
Configuración Para configurar la funcionalidad de este campo \(visible o solo
lectura\), ver: **\[Menú Operación > Configuración > Campos de la operación >
Datos maestros de la operación > Permitir diferentes terceros c./renglón\].**

Para configurar que esta opción esté activada por defecto, ver: **\[Menú
Operación > Configuración operación > Configuración de campos > Permitir
diferentes terceros\].**

---

# Términos Internacionales de Comercio\(INCOTERMS\)

Términos de comercio para la factura de venta de exportación.
Los "Incoterms" son términos, de tres letras cada uno, que reflejan las normas
de aceptación voluntaria por las dos partes "comprador y vendedor", acerca de
las condiciones de entrega de las mercancías y/o productos.

Ejemplo

Una empresa de Colombia realiza una factura de venta por concepto de servicio
de transporte de mercancía internacional para la empresa de México, por lo
cual es necesario exportar el servicio. Utilizando el término comercial CIF
"Cost - Insurance and Freight" \(coste, seguro y flete\), establecieron lo
siguiente:

  * La empresa colombiana realizará la entrega y el despacho de exportación de las mercancías en el puerto de embarque de Barranquilla. Del mismo modo, contratará el transporte principal y seguro hasta el puerto de Altamira del estado de Tamaulipas, México.
  * La empresa mexicana realizará el despacho aduanero a la importación, asumiendo el riesgo de pérdida y daño de la mercancía desde el lugar de entrega.

En este caso en el campo **"INCOTERMS"** se seleccina el término comercial:
**CIF**.

Observaciones

El término que seleccione será incluido en la información de la factura que se
envía en el formato XML estándar establecido por la DIAN.

---

# Observaciones para la factura

Indique las observaciones que aparecerán en la factura de venta impresa o en
algún otro documento que se imprima a partir de esta operación.

Ejemplo

Se realiza una factura de venta de un Servicio de transporte de mercancía. Se
requiere indicar en las observaciones de la factura la garantía que cubre el
servicio y las cuentas bancarias donde se puede realizar la consignación.

![150.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/ING3%20-%20Ingresos/%5B13790%5D%20FrmOprIng3/150.png)

Observaciones

Las observaciones son de libre uso y definición del usuario, puede indicar la
información que se desee visualizar en el documento impreso. Por Ejemplo:

  * Condiciones sobre la entrega de los productos.
  * Formas de pago.

Configuración

Para configurar este campo como no visible, ver: **\[Menú Operación >
Configuración > Visualización de la operación > Pasos en el asistente > Datos
adicionales para la factura\].**

---

# Concepto de pago

Cuenta o concepto de la cuenta de ingreso, a la cual se realiza la imputación.

Ejemplo

Se va a registrar un Ingreso por el servicio de consultoría informática, para
la sede centro por valor de $200.000
Concepto de pago  |  Cc. a cargar  |  Valor
---|---|---
**415530 - Consultoría en equipo y programas de informática** |  SD01- Sede centro  |  $200.000

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta del ingreso que se requiere registrar: **415530 - Consultoría en equipo
y programas de informática**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de ingresos.

Se pueden registrar tantos conceptos de ingresos sean necesarios, con cargo a
distintos centros de costos y distintos terceros.

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto \(nombre de la cuenta contable\)en la impresión del
docuemnto. [Ver más.](<\[60\]GridIngresosEgresos_TDETALLE \(NA\).html>)

---

# CC. a cargar

Código del centro de costos al que se le va a cargar o a imputar el ingreso
registrado.

Ejemplo

Se registra un ingreso por la prestación de un servicio de consultoría informática a la empresa Inversiones ABC en la sede centro:  Concepto de pago  |  Cc. a cargar  |  Valor
---|---|---
415530 - Consultoría en equipo y programas de informática  |  **SD01- Sede Centro** |  $300.000

En el campo **"Cc. a cargar"** se debe indicar identificador del centro de
costo que tenemos previamente creado desde el explorafor gráfico de empresas:
**SD01- Sede Centro**.

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

Puede determinar el código del centro de costos por defecto que se usará en
cada renglón de la operación para imputar el ingreso correspondiente.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en ingresos\].**

Para configurar el centro de costos por defecto, ingrese a: **\[Menú Operación
> Configuración > Campos operación > Lista de elementos > Centro de costos por
defecto\]. **

---

# Valor

Valor total a recibir por el concepto de ingreso que se está registrando.

Ejemplo

Se va a registrar un ingreso por valor de $200.000 pesos por el servicio de
transporte:

Concepto de pago  |  Cc. a cargar  |  Valor
---|---|---
414505 - Servicio de transporte por carretera  |  SD01- Otros ingresos  |  **$200.000**

En el campo **"Valor"** se debe indicar el valor de ingreso que corresponde al
renglón: **$200.000**


Observaciones

Este valor es antes de aplicarle cualquier descuento o impuesto como Retención
y/o IVA.

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.

---

# Detalle

Permite especificar una descripción u observación corta para el registro del
ingreso que se está realizando.

Ejemplo

El concepto de ingreso que se registra es la cuenta 414505 \(Servicio de
transporte por carretera\), pero en la impresión se necesita detallar a que
corresponde el servicio, Ej.:"Servicio de transporte de mercancía para la sede
principal del cliente, Ruta: Manizales - Bogotá".

Concepto de pago  |  Cc. a cargar  |  Valor  |  Detalle
---|---|---|---
414505 - Servicio de transporte por carretera  |  SD01- Otros ingresos  |  $450.000  |  **Servicio de transporte de mercancía para la sede principal del cliente, Ruta: Manizales - Bogotá.**

En el campo **"Detalle"** se debe indicar el detalle del ingreso adicional que
se requiere que salga en el documento de impresión.: **Servicio de transporte
de mercancía para la sede principal del cliente, Ruta: Manizales - Bogotá.**

Observaciones

Esta información se podrá visualizar como descripción en la impresión del
documento.

El dato indicado en este campo podrá consultarse en los exploradores de
contabilidad y de cartera, asi como también en los informes de movimiento de
cuentas auxiliares.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Menú Operación > Configuración > Campos de la
operación > Datos maestros de la operación\]. **

---

# Tipo de documento

Tipo de documento de soporte que sustenta la transacción registrada del
renglón.

Ejemplo

Se requiere registrar el ingreso de diferentes servicios para el transporte de
mercancía, el Servicio de transporte soportado en el documento 10-Factura de
venta y el Servicio de almacenamiento y depósito, soportado con el documento
5-Comprobante de ingreso el día 05/02/2018:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha
---|---|---|---|---
414505 - Transporte por carretera | $ 250.000 | **10 -Fcatura de venta** | FV-2538 | 05/02/2018
414535 - Almacenamiento y depósito | $ 180.000 | **5 -Comprobante de ingreso** | CI-000238 | 05/02/2018
En el campo **"Tipo de documento"** se debe indicar el identificador del tipo
de documento con el cual se requiere soportar el ingreso adicional: **5 -
Comprobante de ingreso** Observaciones Este campo es requerido en la operación

\[ContaPyme\] trae pre-configurados múltiples documentos de soporte listos
para usar. Para seleccionar el tipo de documento soporte requerido basta con
dar doble clic sobre el campo o usar la tecla F3.. Configuración Para
configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver **\[Menú Operación > Configuración > Campos de la operación >
Configuración de columnas en ingresos\].**

---

# Número documento

Número del documento de soporte que sustenta la transacción registrada del
renglón.

Ejemplo

Se requiere registrar el ingreso de diferentes servicios para el transporte de
mercancía, el Servicio de transporte soportado en el documento 10-Factura de
venta y el Servicio de almacenamiento y depósito, soportado con el documento
5-Comprobante de ingreso el día 05/02/2018:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha
---|---|---|---|---
414505 - Transporte por carretera | $ 250.000 | 10 -Fcatura de venta | **FV-2538** | 05/02/2018
414535 - Almacenamiento y depósito | $ 180.000 | 5 -Comprobante de ingreso | **CI-000238** | 05/02/2018
Observaciones En la impresión del documento, sólo se mostrará el número de
documento de la operación, no el del renglón. Configuración Para configurar la
funcionalidad de este campo \(visible, solo lectura, requerido\), ver **\[Menú
Operación > Configuración > Campos de la operación > Configuración de columnas
en ingresos\].**

---

# Fecha

Fecha de soporte específica para la contabilización por renglón de cada
registro.

Ejemplo

Se requiere registrar el ingreso de diferentes servicios para el transporte de
mercancía, el Servicio de transporte soportado en el documento 10-Factura de
venta y el Servicio de almacenamiento y depósito, soportado con el documento
5-Comprobante de ingreso el día 05/02/2018:
Concepto de pago | Valor | Tipo documento | Número documento | Fecha
---|---|---|---|---
414505 - Transporte por carretera | $ 250.000 | 10 -Fcatura de venta | FV-2538 | **05/02/2018**
414535 - Almacenamiento y depósito | $ 180.000 | 5 -Comprobante de ingreso | CI-000238 | **05/02/2018**
En el campo **"Fecha"** se debe indicar la fecha correspondiente del renglón
para el ingreso que se esta registrando: **05/02/2018.** Observaciones La
fecha debe estar dentro del mismo mes que la fecha de soporte de la operación.

Puede configurar que la fecha de soporte de la operación NO pueda ser
modificada. Configuración Para configurar la funcionalidad de este campo
\(visible, solo lectura, requerido\), ver **\[Menú Operación > Configuración >
Campos de la operación > Configuración de columnas en ingresos\].**

Para configurar que la fecha de soporte de la operación NO pueda ser
modificada, ver: **\[Menú Operación > Configuración > Campos de la operación >
Datos de encabezado > Clase y fecha operación\].**

---

# Acerca de ventana

## OPERACIÓN DE INGRESOS



## Objetivo

Esta ventana tiene como finalidad el registro de los ingresos que se perciben
en la empresa por facturación de conceptos o servicios de forma simple y
rápida, permitiendo que aquellos usuarios que cuentan con pocos conocimientos
contables, puedan realizar dichos registros con solo indicar datos básicos del
documento \(¿qué?, ¿quién?, ¿cuánto?, etc.\), para que así el sistema realice
los asientos contables \(débitos y créditos\) que correspondan en forma
totalmente automática.

Adicionalmente tendrá la posibilidad de poder imprimir el comprobante de
ingreso o factura de venta, dependiendo de las necesidades de cada usuario,
con todos los datos registrados en la operación.

## Ejemplo de información a registrar

Se realizará una venta por prestación de servicio de alquiler de mobiliario el
día 14 de diciembre, a la señora Carolina Salgado, por valor de $750.000. El
pago se realizó en efectivo.

Se requiere registrar el ingreso por concepto de "Servicio de transporte por
carretera", por valor de $550.000 al cliente Transportes ABC, soportado en el
documento factura de venta.

La información relevante para registrar el ingreso es:

  * Código del cliente o tercero con el cual se registra el ingreso.
  * Cuenta o concepto de la cuenta de ingreso, a la cual se realiza la imputación.
  * Valor total a recibir por el concepto de ingreso que se está registrando.
  * Observaciones que aparecerán en la factura de venta impresa.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de ingreso o factura de
venta, este tipo de documento se puede definir por defecto, y el sistema
automáticamente asignará el consecutivo correspondiente según su
configuración.

También es necesario identificar la fecha de soporte, el cliente quien está
realizando el ingreso por el concepto correspondiente, al igual que un campo
para digitar el código de vendedor, en caso de que esté realizando un ingreso
por concepto de bienes o servicios.

## Sección registro

En la zona de registro hay diferentes columnas que permiten registrar la
información básica de la operación como: el concepto de pago del ingreso, el
centro de costos, el valor del ingreso y el detalle del ingreso que se
requiere que salga en el documento de impresión.

El seleccionador de cuentas de la operación trae un filtro por defecto donde
sólo muestra las cuentas de ingresos.

En caso de que requiera registrar el ingreso de diferentes conceptos, con
diferentes terceros y tipos de documentos, debe activar la opción "Permitir
diferentes tipos de documento y terceros por cada ingreso", y de esta forma se
visualizan columnas adicionales que le permiten asignar un tipo de documento,
número de documento, fecha y tercero distinto para el renglón de cada ingreso.

## Sección observaciones

Permite indicar las observaciones que aparecerán en la factura de venta
impresa o en algún otro documento que se imprima a partir de esta operación.

## Sección liquidación

Registro de los descuentos, cargos o impuestos causados en el ingreso a los
que aplique.

## Sección forma de pago

Permite definir la forma como el tercero cancelará el ingreso y demás cargos o
descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(cruce con CXP al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de ingresos permite la impresión de los siguientes documentos
como soporte de la transacción:

  * Cuenta de cobro.
  * Factura de venta.
  * Factura de venta en tirilla.
  * Recibo de caja.
  * Recibo de caja en tirilla texto.
  * Comprobante de ingreso.
  * Comprobante de ingreso en tirilla.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Genera el movimiento contable de los diferentes registros de la transacción.
  * Afecta los diferentes informes de cartera, en caso de que la forma de pago se registre como cuenta por cobrar.
  * Procesa los descuentos o cargos que apliquen en la operación.
  * Procesa la forma de cobro o de ingreso.

---

# Cliente

Código del tercero \(cliente\) al que se le realizará la nota débito a
ingresos.

Ejemplo



Si al momento de registrar la venta se indica como cliente al tercero:
**30402491 - Beatriz Duque** ; este mismo tercero deberá indicarse como
**"Cliente"** al momento de la nota débito a ingresos.

Observaciones



El cliente es necesario si se va a seleccionar como referencia de una factura
de venta, al igual que para el registro de algunas formas de cobro \(cxc,
cruce\).

Configuración



Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Nota débito a ingresos > Configurar
operación > Campos de la operación > Datos maestros de la operación\].**

---

# Motivo

El motivo es la razón por la cual se debío realizar la nota débito a ingresos.

Ejemplo

En una empresa dedicada a la venta y soporte técnico de computadores, se
realiza la prestación de servicio técnico a un cliente por un valor de
$80.000, luego de facturado el servicio en la empresa se dieron cuenta que
estaba mal facturado ya que las horas invertidas en la revisión del computador
fueron mas de las que se habían facturado, debido a esto el valor real es de
$95.000 y en la empresa tuvieron que realizar la nota débito a ingresos
mencionando en ella el valor que se encontraba faltante en la primera factura
que realizaron.

En este caso el motivo de la nota es **cambio de valor** ya que el valor
registrado anteriormente estaba incorrecto.

Observaciones

Recuerde que es importante llenar este campo ya que para la documentación en
la facturación electrónica enviada a la DIAN, se le debe hacer claridad en el
motivo por el cual se realizo la nota débito a ingresos para que esta tenga
validez.

Los principales motivos que menciona la DIAN por los cuales se realiza una
nota débito a ingresos son:

* Intereses
* Gastos por cobrar
* Cambio del valor

---

# Referencia

Número de la factura de venta, a la cual se realizará la nota débito a
ingresos por los diferentes servicios prestados.

Si se indica la factura de venta, se cargará automáticamente el listado de
servicios vendidos y sus respectivos precios.

Ejemplo



Se registra la factura de venta **FV-20560** donde se detalla el siguiente
servicio:

Concepto de pago | CC. a cargar | Valor | Detalle | Mantenimiento y reparación de maquinaria y equipo | Servicios y reparaciones | $650.000 | Reparación de equipos de computo
---|---|---|---

Al momento de realizar la nota débito a ingresos, se selecciona en el campo
referencia el documento **FV-20560** , el cual carga automáticamente el
servicio del listado anterior, con su respectivo valor y detalle.

Observaciones



Se puede seleccionar como referencia una o varias facturas de venta a la vez.

Es posible configurar para que la nota crédito a ingresos permita cargar datos
adicionales \(valor 1,2,3,...\) registrados en el documento referencia, ver:
**\[Operación: nota débito a ingresos > Configurar operación > Campos de la
operación > Datos adicionales del documento referencia\].**

---

# Motivo

El motivo es la razón por la cual se debío realizar la nota crédito.

Ejemplo

En una empresa dedicada a la comercialización de accesorios para computador,
se venden 5 mouse por un valor de $30000 c/u, luego de facturados estos
productos en la empresa se dieron cuenta que estaban mal facturados ya que el
precio real de venta era de $25000 c/u, debido a esto debieron realizar la
nota crédito mencionando el valor que se cobro de mas en la primera factura
que había quedado mal realizada.

En este caso el motivo de la nota es **Devolución parcial** ya que el valor
registrado anteriormente estaba incorrecto.

Observaciones

Recuerde que es importante llenar este campo ya que para la documentación en
la facturación electrónica enviada a la DIAN, se le debe hacer claridad en el
motivo por el cual se realizó la nota crédito para que esta tenga validez.

Los principales motivos que menciona la DIAN por los cuales se realiza una
nota crédito son:

* Devolución parcial
* Anulación de factura electrónica
* Rebaja total aplicada
* Descuento total aplicado
* Rescisión

---

# Acerca de ventana

## OPERACIÓN NOTA DÉBITO DE INGRESOS



## Objetivo

Esta ventana tiene como finalidad el registro de las notas débito de ingresos
que se perciben en la empresa por facturación de conceptos o servicios de
forma simple y rápida, permitiendo que aquellos usuarios que cuentan con pocos
conocimientos contables, puedan realizar dichos registros con solo indicar
datos básicos del documento \(¿qué?, ¿quién?, ¿cuánto?, etc.\), para que así
el sistema realice los asientos contables \(débitos y créditos\) que
correspondan en forma totalmente automática.

Adicionalmente tendrá la posibilidad de poder imprimir el documento,
dependiendo de las necesidades de cada usuario, con todos los datos
registrados en la operación.

## Ejemplo de información a registrar

Se realizará una venta por prestación de servicio de alquiler de mobiliario el
día 14 de diciembre, a la señora Carolina Salgado, por valor de $750.000. El
pago se realizó en efectivo.

Se requiere registrar el ingreso por concepto de "Servicio de transporte por
carretera", por valor de $550.000 al cliente Transportes ABC, soportado en el
documento factura de venta.

La información relevante para registrar el ingreso es:

  * Código del cliente o tercero con el cual se registra el ingreso.
  * Cuenta o concepto de la cuenta de ingreso, a la cual se realiza la imputación.
  * Valor total a recibir por el concepto de ingreso que se está registrando.
  * Observaciones que aparecerán en la factura de venta impresa.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de ingreso o factura de
venta, este tipo de documento se puede definir por defecto, y el sistema
automáticamente asignará el consecutivo correspondiente según su
configuración.

También es necesario identificar la fecha de soporte, el cliente quien está
realizando el ingreso por el concepto correspondiente, al igual que un campo
para digitar el código de vendedor, en caso de que esté realizando un ingreso
por concepto de bienes o servicios.

## Sección registro

En la zona de registro hay diferentes columnas que permiten registrar la
información básica de la operación como: el concepto de pago del ingreso, el
centro de costos, el valor del ingreso y el detalle del ingreso que se
requiere que salga en el documento de impresión.

El seleccionador de cuentas de la operación trae un filtro por defecto donde
sólo muestra las cuentas de ingresos.

En caso de que requiera registrar el ingreso de diferentes conceptos, con
diferentes terceros y tipos de documentos, debe activar la opción "Permitir
diferentes tipos de documento y terceros por cada ingreso", y de esta forma se
visualizan columnas adicionales que le permiten asignar un tipo de documento,
número de documento, fecha y tercero distinto para el renglón de cada ingreso.

## Sección observaciones

Permite indicar las observaciones que aparecerán en la factura de venta
impresa o en algún otro documento que se imprima a partir de esta operación.

## Sección liquidación

Registro de los descuentos, cargos o impuestos causados en el ingreso a los
que aplique.

## Sección forma de pago

Permite definir la forma como el tercero cancelará el ingreso y demás cargos o
descuentos:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por cobrar \(CXC\).
  * Cruce \(cruce con CXP al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de ingresos permite la impresión de los siguientes documentos
como soporte de la transacción:

  * Cuenta de cobro.
  * Factura de venta.
  * Factura de venta en tirilla.
  * Recibo de caja.
  * Recibo de caja en tirilla texto.
  * Comprobante de ingreso.
  * Comprobante de ingreso en tirilla.
  * Nota de contabilidad.
  * Nota débito.
  * Nota crédito.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la operación generará
automáticamente los movimientos contables correspondientes:

  * Genera el movimiento contable de los diferentes registros de la transacción.
  * Afecta los diferentes informes de cartera, en caso de que la forma de pago se registre como cuenta por cobrar.
  * Procesa los descuentos o cargos que apliquen en la operación.
  * Procesa la forma de cobro o de ingreso.

---

# Cliente

Código del tercero \(cliente\) al que se le realizará la nota débito a
ingresos.

Ejemplo



Si al momento de registrar la venta se indica como cliente al tercero:
**30402491 - Beatriz Duque** ; este mismo tercero deberá indicarse como
**"Cliente"** al momento de la nota débito a ingresos.

Observaciones



El cliente es necesario si se va a seleccionar como referencia de una factura
de venta, al igual que para el registro de algunas formas de cobro \(cxc,
cruce\).

Configuración



Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Nota débito a ingresos > Configurar
operación > Campos de la operación > Datos maestros de la operación\].**

---

# Motivo

El motivo es la razón por la cual se debío realizar la nota débito a ingresos.

Ejemplo

En una empresa dedicada a la venta y soporte técnico de computadores, se
realiza la prestación de servicio técnico a un cliente por un valor de
$80.000, luego de facturado el servicio en la empresa se dieron cuenta que
estaba mal facturado ya que las horas invertidas en la revisión del computador
fueron mas de las que se habían facturado, debido a esto el valor real es de
$95.000 y en la empresa tuvieron que realizar la nota débito a ingresos
mencionando en ella el valor que se encontraba faltante en la primera factura
que realizaron.

En este caso el motivo de la nota es **cambio de valor** ya que el valor
registrado anteriormente estaba incorrecto.

Observaciones

Recuerde que es importante llenar este campo ya que para la documentación en
la facturación electrónica enviada a la DIAN, se le debe hacer claridad en el
motivo por el cual se realizo la nota débito a ingresos para que esta tenga
validez.

Los principales motivos que menciona la DIAN por los cuales se realiza una
nota débito a ingresos son:

* Intereses
* Gastos por cobrar
* Cambio del valor

---

# Referencia

Número de la factura de venta, a la cual se realizará la nota débito a
ingresos por los diferentes servicios prestados.

Si se indica la factura de venta, se cargará automáticamente el listado de
servicios vendidos y sus respectivos precios.

Ejemplo



Se registra la factura de venta **FV-20560** donde se detalla el siguiente
servicio:

Concepto de pago | CC. a cargar | Valor | Detalle | Mantenimiento y reparación de maquinaria y equipo | Servicios y reparaciones | $650.000 | Reparación de equipos de computo
---|---|---|---

Al momento de realizar la nota débito a ingresos, se selecciona en el campo
referencia el documento **FV-20560** , el cual carga automáticamente el
servicio del listado anterior, con su respectivo valor y detalle.

Observaciones



Se puede seleccionar como referencia una o varias facturas de venta a la vez.

Es posible configurar para que la nota crédito a ingresos permita cargar datos
adicionales \(valor 1,2,3,...\) registrados en el documento referencia, ver:
**\[Operación: nota débito a ingresos > Configurar operación > Campos de la
operación > Datos adicionales del documento referencia\].**

---

# Empleado

Código del tercero empleado al cual se registra la nómina.

Ejemplo

Se registra el pago de la nómina del empleado Jorge Carvajal \(identificado
con còdigo 12365478\), así que en el campo Empleado, se indica código:
**12365478**.

Observaciones

Al momento de seleccionar el empelado, se visualizarán aquellos terceros
configurados con el tipo de tercero **"Empleado"**.

Se recomienda siempre indicar el tercero en el campo "Empleado", como
requisito para la presentación de información exógena. Al seleccionar el
empleado, el sistema cargará automáticamente todas las novedades causadas por
pagar para ese tercero.

Se cargarán todos los préstamos o cuentas por cobrar vendicos del empleado a
la fecha de la operación de forma automática.

Sólo se cargan las cuentas cuya fecha de pago sea menor o igual al último día
del mes de la fecha de soporte.

Si la forma de pago de la nómina genera una cuenta por pagar, el sistema por
defecto asigna como tercero en cartera, el tecrero registrado en el campo
**"Empleado"** , sin embrago el tercero en cartera se podrá modificar.

Si la empresa sólo lleva el registro de la nómina de un sólo empleado, puede
predeterminarlo en la operación para que al momento de realizar la operación,
este campo se cargue por defecto.

El sistema cargará auntomáticamente los conceptos con sus valores y el centro
de costo predetreminados en la configuración del tercero, en la pestaña "Datos
empleado".

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver: **\[Menú Operación > Configuración > Campos de la operación
> Datos maestros de la operación\].**

Para configurar el tipo de tercero ingrese por: **\[Pestaña: Básico > Catálogo
de terceros > Seleccionar tercero > Clic derecho: Modificar > Tipo de
Tercero\].**

Para configurar y predeterminar los conceptos, valores y el centro de costos
del tercero empleado, ingrese por: **\[Pestaña: Básico > Catálogo de terceros
> Seleccionar tercero > Clic derecho: Modificar > Pestaña "Datos
empleado"\].**

Para configurar el tercero por defecto en la operación, ver: **\[Menú
Operación > Configuración > Campos de la operación > Datos maestros de la
operación\].**

---

# Cuenta por pagar

Identificación o referencia de la cuenta por pagar a la cual se va a realizar
el abono al momento de causar la nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos.
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00852 | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Cuenta por pagar"** debe seleccionar la referencia a la cual se
requiere registrar el abono: **CE-00852**.

Observaciones

Para seleccionar la referencia a la cual se va a realizar el abono debe dar
doble clic sobre la columna **"Cuenta por pagar"** o puede utilizar el comando
F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero empleado, donde podrá visualizar
información como:**La fecha de soporte, la fecha de vencimiento, el saldo
actual, e información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por pagar registrada para el tercero empleado con su saldo, la cuenta
de cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda. De lo
contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**N/D "No definido".**

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] carga automáticamente las cuentas por pagar vencidas del tercero
empleado a la fecha de la operación de nómina.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de proveedores, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

---

# Centro costos

Código del centro de costos asociado a la cuenta de proveedores a la que se va
a registrar el abono en la operación de nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | **AD01-Administración.** | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"centro de costos"** se debe indicar el centro de costo que
tenemos previamente creado desde el explorafor gráfico de empresas y al cual
se requiere registrar el abono en la nómina: Ejemplo: **AD01-Administración.**

Observaciones

El centro de costos puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por pagar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda.

Para que se cruce el abono realizado, en los informes de cartera y proveedores
se debe indicar el mismo centro de costo con el que se originó la deuda.

Para el manejo de centros de costos la cuenta de proveedores debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en novedades por pagar> Centros de costos\].**

---

# Saldo actual

Saldo actual de la cuenta por pagar seleccionada a la fecha registrada en la
operación.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | **AD01-Administración.** | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por pagar seleccionada a la fecha de la operación:
Ejemplo:**$500.000**.

Observaciones

Al seleccionar la cuenta por pagar el sistema traerá automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en novedades por pagar > Saldo\].**

---

# Valor abono

Valor abonado a la cuenta o cuota por pagar de la referencia seleccionada.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | **AD01-Administración.** | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
pagar selecionada en el renglón:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original de la referencia seleccionada, la cuenta
contable debe tener activado el manejo de **"Maneja y exige tercero",
"Controla endeudamiento" y "Maneja referencia".**

El valor abonado que se registre para cada cuenta por pagar, se podrá
visualizar en los informes y exploradores de proveedores.

---

# Nuevo saldo

Nuevo saldo de la cuenta por pagar después de registrar el valor abonado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $300.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | Centro de costos | Saldo actual | Valor abono | **Nuevo saldo** | Observaciones
---|---|---|---|---|---
CE-00852 | AD01-Administración. | $500.000 | $300.000 | **$200.000** | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por pagar después de registrar el valor abonado por
cada renglón:**$200.000**.

Observaciones

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y muestra el nuevo saldo con el que quedará la deuda después de
procesar la operación.

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original de la referencia seleccionada y muestre el
nuevo saldo, la cuenta de proveedores debe tener configurado: **"Maneja y
exige tercero", "Controla endeudamiento" y "Maneja referencia"**. El valor del
nuevo saldo de las cuentas por pagar se podrá visualizar en los informes de
proveedores.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en novedades por pagar > Nuevo saldo\].**

---

# Observaciones

Observaciones sobre la cuenta por pagar que se está cancelando o registrando
un abono.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $300.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | AD01-Administración. | $500.000 | $300.000 | $200.000 | **Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez**

En el campo **"Observaciones"** Se debe indicar la información que desea
registrar para la cuenta por pagar del renglón: Ejemplo: **"Abono a CE-00852 -
CxP \(30/04/2018\) a Jorge Ramirez"**.

Observaciones

Al seleccionar la cuenta por pagar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo, el sistema la tomará como
descripción de la cuenta por pagar para el documento de impresión y los
exploradores e informes de proveedores.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura o
requerido\), ver: **\[Operación: Configuración operación > Campos de la
operación > Configuración de columnas en novedades por pagar >
Observaciones\].**

---

# Vr. otra moneda

Valor abonado en moneda extranjera. En esta columna se puede especificar el
valor del abono equivalente en moneda extranjera.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de la cuenta
por pagar que se había realizado al trabajador, por concepto de biaticos para
el viaje a Canadá, por valor de USD 36 soportada con el comprobante de egreso
CE-00672.
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones | Vr. otra moneda
---|---|---|---|---|---
CE-00672 | $100.800 | $100.800 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez | **U$ 36**

En el campo **"Vr. otra moneda"** debe indicar el valor abonado en moneda
extranjera a la cuenta por pagar selecionada en el renglón: Ejemplo **USD 36**

Observaciones

Esta columna solamente se habilita para edición, cuando la cuenta maneje
moneda extranjera y en la configuración para el manejo de moneda extranjera,
esté habilitada la opción que permita la edición de este valor.

Normalmente solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se recomienda habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
proveedores.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Contabilidad > Configuración > Asistente de configuración de moneda
extranjera.\]**

---

# Cuenta por cobrar

Identificación o referencia de la cuenta por cobrar a la cual se va a realizar
el abono al momento de causar la nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $100.000 | $100.000 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Cuenta por cobrar"** debe seleccionar la referencia a la cual
se requiere registrar el abono: **CE-00672**.

Observaciones

Para seleccionar la referencia a la cual se va a realizar el abono debe dar
doble clic sobre la columna **"Cuenta por cobrar"** o puede utilizar el
comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero empleado, donde podrá visualizar
información como:**La fecha de soporte, la fecha de vencimiento, el saldo
actual, e información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por cobrar registrada para el tercero empleado con su saldo, la cuenta
de cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda. De lo
contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**N/D "No definido".**

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] carga automáticamente las cuentas por cobrar **vencidas** del
tercero empleado a la fecha de la operación de nómina.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

---

# Centro costos

Código del centro de costos asociado a la cuenta de cartera a la que se va a
registrar el abono en la operación de nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos, para el
centro de costos **Administración**.
Cuenta por cobrar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00672 | **AD01-Administración.** | $100.000 | $100.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"centro de costos"** se debe indicar el centro de costo que
tenemos previamente creado desde el explorafor gráfico de empresas y al cual
se requiere registrar el abono en la nómina: Ejemplo: **AD01-Administración.**

Observaciones

El centro de costos puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por cobrar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda.

Para que se cruce el abono realizado, en los informes de cartera y proveedores
se debe indicar el mismo centro de costo con el que se originó la deuda.

Para el manejo de centros de costos la cuenta de proveedores debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en abono a préstamos> Centros de costos\].**

---

# Saldo actual

Saldo actual de la cuenta por cobrar seleccionada a la fecha registrada en la
operación.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | **$100.000** | $100.000 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por cobrar seleccionada, a la fecha de la operación:
Ejemplo:**$500.000**.

Observaciones

Al seleccionar la cuenta por cobrar el sistema traerá automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en abono a préstamos > Saldo\].**

---

# Valor abono

Valor abonado a la cuenta o cuota por cobrar de la referencia seleccionada.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | $100.000 | **$100.000** | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
cobrar selecionada en el renglón:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original de la referencia seleccionada, la cuenta
contable debe tener activado el manejo de **"Maneja y exige tercero",
"Controla endeudamiento" y "Maneja referencia".**

El valor abonado que se registre para cada cuenta por cobrar, se podrá
visualizar en los informes y exploradores de cartera.

---

# Nuevo saldo

Nuevo saldo de la cuenta por cobrar después de registrar el valor abonado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $50.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | $100.000 | $50.000 | **$50.000** | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez
En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por cobrar después de registrar el valor abonado por
cada renglón:**$50.000**.

Observaciones

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y muestra el nuevo saldo con el que quedará la deuda después de
procesar la operación.

Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original por cada tercero, por cada referencia y
muestre el nuevo saldo, la cuenta de proveedores debe tener configurado:
**"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"**.
El valor del nuevo saldo de las cuentas por cobrar se podrá visualizar en los
informes de proveedores.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en abono a préstamos > Nuevo saldo\].**

---

# Observaciones

Observaciones sobre la cuenta por cobrar que se está cancelando o registrando
un abono.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | $100.000 | $100.000 | **$0** | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Observaciones"** Se debe indicar la información que desea
registrar para la cuenta por cobrar del renglón: Ejemplo: **"Abono a CE-00852
- CxC \(30/04/2018\) a Jorge Ramirez"**.

Observaciones

Al seleccionar la cuenta por cobrar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo, el sistema la tomará como
descripción de la cuenta por cobrar para el documento de impresión y los
exploradores e informes de proveedores.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura o
requerido\), ver: **\[Operación: Configuración operación > Campos de la
operación > Configuración de columnas en abono a préstamos >
Observaciones\].**

---

# Vr. otra moneda

Valor abonado en moneda extranjera. En esta columna se puede especificar el
valor del abono equivalente en moneda extranjera.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de la cuenta
por cobrar que se había realizado al trabajador, por concepto de biaticos
pendientes por relacionar del viaje a Canadá, por valor de USD 36 soportada
con el comprobante de egreso CE-00672.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones | Vr. otra moneda
---|---|---|---|---|---
CE-00672 | $100.800 | $100.800 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez | **U$ 36**

En el campo **"Vr. otra moneda"** debe indicar el valor abonado en moneda
extranjera a la cuenta por cobrar selecionada en el renglón: Ejemplo **USD
36**.

Observaciones

Esta columna solamente se habilita para edición, cuando la cuenta maneje
moneda extranjera y en la configuración para el manejo de moneda extranjera,
esté habilitada la opción que permita la edición de este valor.

Normalmente solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se recomienda habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
proveedores.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Contabilidad > Configuración > Asistente de configuración de moneda
extranjera.\]**

---

# Concepto de pago

Concepto de la cuenta de nómina, a la cual se realiza la imputación.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
**510506 - Sueldos** | AD01-Administración | $ 781.242
**510527 - Auxilio de transporte** | AD01-Administración | $ 88.211

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta, en este caso del gasto que se requiere registrar: Ejemplo:**510506 -
Sueldos**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de gastos y de costos de producción.

Se pueden registrar tantos conceptos de nómina sean necesarios, como horas
extras, auxilio de transporte, bonificaciones entre otros.

La operación trae configurados unos conceptos de nómina por defecto como: el
sueldo, horas extras, auxilio de transporte y bonificaciones.

El sistema cargará automáticamente los conceptos de pago predeterminados en la
configuración del tercero empleado, en la pestaña "Datos empleado".

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto \(nombre de la cuenta contable\)en la impresión del
docuemnto. [Ver más.](<\[60\]GridIngresosEgresos_TDETALLE
\(NA\)\(Detalle\).html>)

Configuración

Para configurar las cuentas y valores por defecto en la operación, ver
**\[Menú Operación > Configuración > Configuración de cuentas y valores por
defecto\].**

Para configurar y predeterminar los conceptos y valores del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Cargar cuentas y valores por defecto

Carga los conceptos y sus valores predeterminados para el tercero empleado.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A
,tiene un salario fijo de $781.242 y auxilio de transsporte por $88.211.

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
510506 - Sueldos | AD01-Administración | $ 781.242
510527 - Auxilio de transporte | AD01-Administración | $ 88.211

Al dar clic en el botón "**Cargar cuentas y valores por defecto** , el sistema
cargará los datos que se encuentren predefinidos para el tercero empleado, en
este caso cargará por defecto: **el concepto "510506 - Sueldos" con valor $
781.242 y el "510527 - Auxilio de transporte" por valor de $ 88.211.**

Observaciones

El sistema cargará automáticamente los conceptos de pago con sus valores,
predeterminados en la configuración del tercero empleado en la pestaña "Datos
empleado".


Configuración

Para configurar y predeterminar los conceptos y valores del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Cargar todas las cuentas

Carga todas las cuentas por cobrar pendientes para el tercero seleccionado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de préstamos
que se habían generado al trabajador por concepto de anticipos de meses
anteriores, soportados con los comprobantes de egreso CE-00672 por valor de
$80.000, el CE-00683 por valor de $70.000 pesos y el CE-00695 por valor de
$100.000 pesos.

Al dar clic en el botón **"Cargar todas las cuentas"** se cargarán todas las
cuentas por cobrar que estén vencidas para el tercero empleado Jorge Ramirez,
para poder realizar el respectivo abono.

Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $80.000 | $80.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $20.000 | $50.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez
**CE-00683** | $100.000 | $0 | $100.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez


Observaciones

Al utilizar esta opción, se cargarán por defecto todas las cuentas por cobrar
pendientes del tercero empleado a la fecha que tienen la operación de nómina.

---

# Abonar monto

Permite abonar un monto dado a las cuentas por cobrar vencidas del tercero
empleado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono a préstamos
por valor de **$80.000** de 2 anticipos que se habían realizado al trabajador
a inicios del mes, soportados con los comprobantes de egreso **CE-00672** por
valor de $50.000 y **CE-00683** por valor de $70.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $50.000 | $50.000 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $30.000 | $40.000 | Abono a CE-00683 - CxC \(30/04/2018\) a Jorge Ramirez

Al dar clic en el botón **"Abonar monto"** Se indica el valor de $80.000
pesos, de esta forma el sistema abonará **$50.000 pesos** a la referencia
**"CE-00672"** , y $30.000 pesos a la **CE-00683**.

Observaciones

\[ContaPyme\] reparte el valor que se indique en la opción **"Abonar monto"**
de forma automática sobre las cuentas por cobrar **vencidas** del tercero,
cancelando primero a las CxC con fecha más antigua.

---

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de préstamos
que se habían generado al trabajador por concepto de anticipos de meses
anteriores, soportados con los comprobantes de egreso CE-00672 por valor de
$80.000 y el CE-00249 por valor de $100.000 pesos.

Si requiere visualizar el documento de impresión de la referencia **CE-00249**
, a la cual se está realizando el abono puede dar clic el botón **"Visualizar
el documento impreso"** , y el sistema le muestra una vista previa del
documento con toda la información de la operación.

.
![360.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/NOM2%20-%20Nomina/%5B14290%5D%20FrmOprNOM2/360.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra la visualización, es el que esté
configurado por defecto en la operación con la que se realizó la cuenta por
cobrar.

Configuración

Texto de configuración **Ruta configuración**

---

# Cargar todas las cuentas

Carga todas las cuentas por pagar pendientes para el tercero seleccionado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de novedades
causadas por pagar por concepto de bonificaciones pendientes del mes anterior
que se habían generado al trabajador, soportados con los comprobantes de
egreso CE-00672 por valor de $80.000, el CE-00683 por valor de $70.000 pesos y
el CE-00695 por valor de $100.000 pesos.

Al dar clic en el botón **"Cargar todas las cuentas"** se cargarán todas las
cuentas por pagar vencidas registradas para el tercero empleado Jorge Ramirez,
para poder realizar el respectivo abono.

Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $80.000 | $80.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $20.000 | $50.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez
**CE-00683** | $100.000 | $0 | $100.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez


Observaciones

Al utilizar esta opción, se cargarán por defecto todas las cuentas por cobrar
pendientes del tercero empleado a la fecha que tienen la operación de nómina.

---

# Abonar monto

Permite abonar un monto dado a las cuentas por pagar vencidas del tercero
empelado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de novedades
causadas por pagar por valor de **$100.000** por concepto de bonificaciones
pendientes del mes anterior que se habían generado al trabajador, soportados
con los comprobantes de egreso **CE-00672** por valor de $80.000 y
**CE-00683** por valor de $70.000 pesos.
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $80.000 | $80.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $20.000 | $50.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez

Al dar clic en el botón **"Abonar monto"** Se indica el valor de $100.000
pesos, de esta forma el sistema abonará **$80.000** pesos a la referencia
**"CE-00672"** , y **$20.000** pesos a la **CE-00683**.

Observaciones

\[ContaPyme\] reparte el valor que se indique en la opción **"Abonar monto"**
de forma automática sobre las cuentas por pagar **vencidas** del tercero
empleado, cancelando primero a las CxP con fecha más antigua.

---

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire registrar también el abono de la bonificación pendiente
por pagar del mes anterior, soportada con el comprobante de egreso
**CE-00250** por valor de $100.000 pesos.

Si requiere visualizar el documento de impresión de la referencia **CE-00250**
, a la cual se está realizando el abono puede dar clic el botón **"Visualizar
el documento impreso"** , y el sistema le muestra una vista previa del
documento con toda la información de la operación.

.
![390.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/NOM2%20-%20Nomina/%5B14290%5D%20FrmOprNOM2/390.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra la visualización, es el que esté
configurado por defecto en la operación con la que se realizó la cuenta por
pagar.

Configuración

Texto de configuración **Ruta configuración**

---

# CC. a cargar

Código del centro de costos al cual se va a registrar la imputación del egreso
en la operación de nómina.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
510506 - Sueldos | **AD01-Administración** | $ 781.242
510527 - Auxilio de transporte | **AD01-Administración** | $ 88.211

En el campo **"Cc. a cargar"** se debe indicar identificador del centro de
costo que tenemos previamente creado desde el explorafor gráfico de empresas:
Ejemplo: **AD01-Administración**.

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

El centro de costos también puede ser predefinido en cada tercero empleado, en
la pestaña "Datos empleado" y se cargará automáticamente en la operación de
nómina que se realice con dicho empleado.

Configuración

Para configurar las cuentas y valores por defecto en la operación, ver
**\[Menú Operación > Configuración > Configuración de cuentas y valores por
defecto\].**

Para configurar y predeterminar el centro de costos del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Valor

Valor total a pagar por el concepto de nómina que se está registrando.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
**510506 - Sueldos** | AD01-Administración | **$ 781.242**
**510527 - Auxilio de transporte** | AD01-Administración | **$ 88.211**

En el campo **"Valor"** se debe indicar el valor del concepto de pago que se
requiere registrar: Ejemplo: Para el concepto de pago de sueldos**781.242**

Observaciones

Este valor será el que el sistema tome como base para calcular automáticamente
los conceptos de retenciones y aportes de nómina configurados previamente en
la cuenta del gasto para la clase 5 "De nómina contable" [Ver
más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[250\]LblICase.html>)

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.

El sistema cargará auntomáticamente los valores predetreminados en la
configuración del tercero, en la pestaña "Datos empleado".

Si en la operación no se registra el valor, el renglón será omitido al momento
de grabarse.

Configuración

Para configurar las cuentas y valores por defecto en la operación, ver
**\[Menú Operación > Configuración > Configuración de cuentas y valores por
defecto\].**

Para configurar y predeterminar los conceptos y valores del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Detalle

Permite especificar una descripción u observación corta para el registro del
concepto de pago de nómina que se esté realizando.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |  |
---|---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor** | **Detalle**
510506 - Sueldos | AD01-Administración | $ 781.242 | **Pago de la primera quincena del mes de abril.******

En el campo **"Detalle"** se debe indicar el detalle del concepto de pago que
requiere que salga en el documento de impresión: Ejemplo:**Pago de la primera
quincena del mes de abril.**

Observaciones

Esta información se podrá visualizar como descripción en la impresión del
documento.

El dato indicado en este campo podrá consultarse en los exploradores de
contabilidad y de cartera, asi como también en los informes de movimiento de
cuentas auxiliares.

La información indicada en este campo, reemplazará el nombre de la cuenta que
se haya indicado en la columna **concepto de pago** , al momento de la
impresión del documento.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Configurar operación > Campos de la
operación > Configuración de columnas en pagos > Detalle\]**.

---

# Acerca de ventana

## OPERACIÓN DE NÓMINA CONTABLE



## Objetivo

Esta ventana tiene como finalidad agilizar el registro de la nómina contable,
liquidar automáticamente los aportes y provisiones de cada empleado y liquidar
las novedades de nómina que se presenten, así como también cancelar las
cuentas por cobrar o cuentas por pagar que tenga pendientes el empleado al
momento de liquidar la nómina.

Los registros de esta operación afectan directamente la contabilidad y los
informes de cartera y proveedores.

La operación de nómina contable se encuentran incluidas en el módulo de
automatización de documentos.

## Ejemplo de información a registrar

Ejemplos:

Registrar el pago de la nómina del empleado Jorge Carvajal para la primera
quincena del me de abril de 2018.

Liquidar la nómina contable para el empleado Norma Rocío Rodríguez con quien
la empresa tiene pendientes varias cuentas por cobrar de un préstamo
realizado.

Realizar la operación de nómina, con las novedades registradas para el
empleado Alberto López en el mes de abril.

La información relevante para registrar la operación de nómina es:

  * Código del tercero empleado al cual se registra la nómina.
  * Concepto de la cuenta de nómina, a la cual se realiza la imputación.
  * Valor total a pagar por el concepto de nómina que se está registrando.
  * Novedades causadas por pagar.
  * Abono a préstamos o créditos.
  * Forma de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser comprobante de pago de nómina, este tipo
de documento se puede definir por defecto, y el sistema automáticamente
asignará el consecutivo correspondiente según su configuración.

También es necesario identificar la fecha de soporte y el empleado a quien se
está registrando la nómina.

## Sección registro

En la zona de registro hay diferentes columnas que permiten registrar la
información básica de la operación como: el concepto de pago de nómina como
sueldo, auxilio de transporte, bonificaciones, el centro de costos, el valor
total a pagar por el concepto de nómina registrado. Con estos datos
registrados, el sistema evaluará los valores para liquidar los aportes y las
provisiones necesarias. También se puede indicar por cada renglón el detalle
que se requiere que salga en el documento de impresión.

El seleccionador de cuentas de la operación trae un filtro por defecto donde
sólo muestra las cuentas de gastos.

## Sección novedades causadas por pagar

Permite indicar las cuentas pendientes por pagar que la empresa tiene con el
empleado y que se puedan sumar al pago de la nómina contable.

Ejemplo:

Una cuenta por pagar de viáticos.

Adicionalmente la operación cuenta con el paso de abono a préstamo, estas son
cuentas por cobrar que tiene la empresa con el empleado y en este caso estas
se restarán del pago, por ejemplo un préstamo que la empresa realizó al
empleado.

Tanto las CxP como las CxC ya deben estar causadas o creadas en la
contabilidad para que el sistema las pueda cargar al momento de liquidar la
nómina contable.

## Sección liquidación

Se cargarán los conceptos de liquidación como: aportes a salud del trabajador,
aportes a pensiones tanto del trabajador como del patrono, aportes a la ARP y
los demás conceptos y los demás conceptos.

Se debe tener presente que estos son los conceptos de retenciones y aportes de
nómina que se configuraron a las cuentas de nómina que se indican al empleado.

Se pueden adicionar otros conceptos utilizando la tecla F3, de esta forma el
sistema abre el catálogo de conceptos de liquidación en egreso, para
seleccionar el que se requiera.

## Sección forma de pago

Permite definir la forma como se realizará el pago de la nómina:

  * Efectivo \(caja\).
  * Bancos.
  * Generar cuenta por pagar \(CXP\).
  * Cruce \(cruce con CXC al cliente\).

El sistema permite fijar una forma de pago por defecto para este tipo de
operación.

## Sección impresión de soportes

La operación de ingresos permite la impresión de los siguientes documentos
como soporte de la transacción:

  * Comprobante de pago de nómina.
  * Nota de contabilidad simple.

Los diferentes documentos se pueden imprimir en formato media hoja u hoja
completa.

## Sección proceso de la operación

Una vez aceptada la información, el proceso de la información generará
automáticamente los movimientos contables correspondientes:

  * Genera el movimiento contable de los diferentes registros de la transacción.
  * Afecta los diferentes informes de cartera, en caso de que la forma de pago se registre como cuenta por pagar.
  * Procesa los descuentos o cargos que apliquen en la operación.
  * Procesa la forma de pago.

---

# Empleado

Código del tercero empleado al cual se registra la nómina.

Ejemplo

Se registra el pago de la nómina del empleado Jorge Carvajal \(identificado
con còdigo 12365478\), así que en el campo Empleado, se indica código:
**12365478**.

Observaciones

Al momento de seleccionar el empelado, se visualizarán aquellos terceros
configurados con el tipo de tercero **"Empleado"**.

Se recomienda siempre indicar el tercero en el campo "Empleado", como
requisito para la presentación de información exógena. Al seleccionar el
empleado, el sistema cargará automáticamente todas las novedades causadas por
pagar para ese tercero.

Se cargarán todos los préstamos o cuentas por cobrar vendicos del empleado a
la fecha de la operación de forma automática.

Sólo se cargan las cuentas cuya fecha de pago sea menor o igual al último día
del mes de la fecha de soporte.

Si la forma de pago de la nómina genera una cuenta por pagar, el sistema por
defecto asigna como tercero en cartera, el tecrero registrado en el campo
**"Empleado"** , sin embrago el tercero en cartera se podrá modificar.

Si la empresa sólo lleva el registro de la nómina de un sólo empleado, puede
predeterminarlo en la operación para que al momento de realizar la operación,
este campo se cargue por defecto.

El sistema cargará auntomáticamente los conceptos con sus valores y el centro
de costo predetreminados en la configuración del tercero, en la pestaña "Datos
empleado".

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido\), ver: **\[Menú Operación > Configuración > Campos de la operación
> Datos maestros de la operación\].**

Para configurar el tipo de tercero ingrese por: **\[Pestaña: Básico > Catálogo
de terceros > Seleccionar tercero > Clic derecho: Modificar > Tipo de
Tercero\].**

Para configurar y predeterminar los conceptos, valores y el centro de costos
del tercero empleado, ingrese por: **\[Pestaña: Básico > Catálogo de terceros
> Seleccionar tercero > Clic derecho: Modificar > Pestaña "Datos
empleado"\].**

Para configurar el tercero por defecto en la operación, ver: **\[Menú
Operación > Configuración > Campos de la operación > Datos maestros de la
operación\].**

---

# Cuenta por pagar

Identificación o referencia de la cuenta por pagar a la cual se va a realizar
el abono al momento de causar la nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos.
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00852 | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Cuenta por pagar"** debe seleccionar la referencia a la cual se
requiere registrar el abono: **CE-00852**.

Observaciones

Para seleccionar la referencia a la cual se va a realizar el abono debe dar
doble clic sobre la columna **"Cuenta por pagar"** o puede utilizar el comando
F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero empleado, donde podrá visualizar
información como:**La fecha de soporte, la fecha de vencimiento, el saldo
actual, e información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por pagar registrada para el tercero empleado con su saldo, la cuenta
de cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda. De lo
contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**N/D "No definido".**

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] carga automáticamente las cuentas por pagar vencidas del tercero
empleado a la fecha de la operación de nómina.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de proveedores, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

---

# Centro costos

Código del centro de costos asociado a la cuenta de proveedores a la que se va
a registrar el abono en la operación de nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | **AD01-Administración.** | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"centro de costos"** se debe indicar el centro de costo que
tenemos previamente creado desde el explorafor gráfico de empresas y al cual
se requiere registrar el abono en la nómina: Ejemplo: **AD01-Administración.**

Observaciones

El centro de costos puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por pagar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda.

Para que se cruce el abono realizado, en los informes de cartera y proveedores
se debe indicar el mismo centro de costo con el que se originó la deuda.

Para el manejo de centros de costos la cuenta de proveedores debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en novedades por pagar> Centros de costos\].**

---

# Saldo actual

Saldo actual de la cuenta por pagar seleccionada a la fecha registrada en la
operación.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | **AD01-Administración.** | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por pagar seleccionada a la fecha de la operación:
Ejemplo:**$500.000**.

Observaciones

Al seleccionar la cuenta por pagar el sistema traerá automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en novedades por pagar > Saldo\].**

---

# Valor abono

Valor abonado a la cuenta o cuota por pagar de la referencia seleccionada.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $500.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | **AD01-Administración.** | $500.000 | $500.000 | $0 | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
pagar selecionada en el renglón:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original de la referencia seleccionada, la cuenta
contable debe tener activado el manejo de **"Maneja y exige tercero",
"Controla endeudamiento" y "Maneja referencia".**

El valor abonado que se registre para cada cuenta por pagar, se podrá
visualizar en los informes y exploradores de proveedores.

---

# Nuevo saldo

Nuevo saldo de la cuenta por pagar después de registrar el valor abonado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $300.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | Centro de costos | Saldo actual | Valor abono | **Nuevo saldo** | Observaciones
---|---|---|---|---|---
CE-00852 | AD01-Administración. | $500.000 | $300.000 | **$200.000** | Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por pagar después de registrar el valor abonado por
cada renglón:**$200.000**.

Observaciones

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y muestra el nuevo saldo con el que quedará la deuda después de
procesar la operación.

Para que el sistema realice la cancelación de la cuenta por pagar o reste el
valor abonado a la deuda original de la referencia seleccionada y muestre el
nuevo saldo, la cuenta de proveedores debe tener configurado: **"Maneja y
exige tercero", "Controla endeudamiento" y "Maneja referencia"**. El valor del
nuevo saldo de las cuentas por pagar se podrá visualizar en los informes de
proveedores.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en novedades por pagar > Nuevo saldo\].**

---

# Observaciones

Observaciones sobre la cuenta por pagar que se está cancelando o registrando
un abono.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire realizar el abono de la bonificación pendiente por pagar
del mes anterior, soportada con el comprobante de egreso **CE-00852** por
valor de $300.000 pesos, para el centro de costos **Administración**.
Cuenta por pagar | Centro de costos | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00852 | AD01-Administración. | $500.000 | $300.000 | $200.000 | **Abono a CE-00852 - CxP \(30/04/2018\) a Jorge Ramirez**

En el campo **"Observaciones"** Se debe indicar la información que desea
registrar para la cuenta por pagar del renglón: Ejemplo: **"Abono a CE-00852 -
CxP \(30/04/2018\) a Jorge Ramirez"**.

Observaciones

Al seleccionar la cuenta por pagar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo, el sistema la tomará como
descripción de la cuenta por pagar para el documento de impresión y los
exploradores e informes de proveedores.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura o
requerido\), ver: **\[Operación: Configuración operación > Campos de la
operación > Configuración de columnas en novedades por pagar >
Observaciones\].**

---

# Vr. otra moneda

Valor abonado en moneda extranjera. En esta columna se puede especificar el
valor del abono equivalente en moneda extranjera.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de la cuenta
por pagar que se había realizado al trabajador, por concepto de biaticos para
el viaje a Canadá, por valor de USD 36 soportada con el comprobante de egreso
CE-00672.
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones | Vr. otra moneda
---|---|---|---|---|---
CE-00672 | $100.800 | $100.800 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez | **U$ 36**

En el campo **"Vr. otra moneda"** debe indicar el valor abonado en moneda
extranjera a la cuenta por pagar selecionada en el renglón: Ejemplo **USD 36**

Observaciones

Esta columna solamente se habilita para edición, cuando la cuenta maneje
moneda extranjera y en la configuración para el manejo de moneda extranjera,
esté habilitada la opción que permita la edición de este valor.

Normalmente solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se recomienda habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
proveedores.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Contabilidad > Configuración > Asistente de configuración de moneda
extranjera.\]**

---

# Cuenta por cobrar

Identificación o referencia de la cuenta por cobrar a la cual se va a realizar
el abono al momento de causar la nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $100.000 | $100.000 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Cuenta por cobrar"** debe seleccionar la referencia a la cual
se requiere registrar el abono: **CE-00672**.

Observaciones

Para seleccionar la referencia a la cual se va a realizar el abono debe dar
doble clic sobre la columna **"Cuenta por cobrar"** o puede utilizar el
comando F3.

\[ContaPyme\] presenta un seleccionador donde filtra las referencias
previamente registradas para el tercero empleado, donde podrá visualizar
información como:**La fecha de soporte, la fecha de vencimiento, el saldo
actual, e información de la deuda.**

Para que \[ContaPyme\] muestre en el seleccionador las referencia de cada
cuenta por cobrar registrada para el tercero empleado con su saldo, la cuenta
de cartera debe tener la configuración de **"controla endeudamiento" y "maneja
referencia"** , para tener una fácil identificación de cada deuda. De lo
contrario, el sistema como identificador para la cuenta por cobrar
mostrará:**N/D "No definido".**

Para poder visualizar y cargar el abono de cada referencia, la operación donde
se registró la deuda debe estar procesada.

\[ContaPyme\] carga automáticamente las cuentas por cobrar **vencidas** del
tercero empleado a la fecha de la operación de nómina.

Configuración

Para realizar la configuración de **"Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"** a la cuenta de cartera, ver:
**\[Pestaña: Contabilidad > Plan de cuentas > Seleccionar cuenta: Clic derecho
modificar > Activar opciones: "Maneja y exige tercero", "Controla
endeudamiento" y "Maneja referencia"\].**

---

# Centro costos

Código del centro de costos asociado a la cuenta de cartera a la que se va a
registrar el abono en la operación de nómina.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos, para el
centro de costos **Administración**.
Cuenta por cobrar | **Centro de costos** | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---|---
CE-00672 | **AD01-Administración.** | $100.000 | $100.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez

En el campo **"centro de costos"** se debe indicar el centro de costo que
tenemos previamente creado desde el explorafor gráfico de empresas y al cual
se requiere registrar el abono en la nómina: Ejemplo: **AD01-Administración.**

Observaciones

El centro de costos puede ser digitado directamente en la celda o
seleccionarse usando la ventana de selección de centros de costos y nodos.

Al seleccionar la cuenta por cobrar el sistema trae automáticamente el centro
de costos registrado desde la operación inicial con la que se creó la deuda.

Para que se cruce el abono realizado, en los informes de cartera y proveedores
se debe indicar el mismo centro de costo con el que se originó la deuda.

Para el manejo de centros de costos la cuenta de proveedores debe tener la
configuración **"Exige centro de costos"**. [Ver más](<../../../../020
CN/Cats/Plan de Cuentas/\[10970\] FrmCuenta/\[60\]EdBExigeICC.html>)

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en abono a préstamos> Centros de costos\].**

---

# Saldo actual

Saldo actual de la cuenta por cobrar seleccionada a la fecha registrada en la
operación.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | **$100.000** | $100.000 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Saldo actual"** el sistema muestra el saldo que actualmente
tiene la cuenta por cobrar seleccionada, a la fecha de la operación:
Ejemplo:**$500.000**.

Observaciones

Al seleccionar la cuenta por cobrar el sistema traerá automáticamente el saldo
actual de la deuda según la fecha que tenga registra la operación.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en abono a préstamos > Saldo\].**

---

# Valor abono

Valor abonado a la cuenta o cuota por cobrar de la referencia seleccionada.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | $100.000 | **$100.000** | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Valor abono"** debe indicar el valor abonado a la cuenta por
cobrar selecionada en el renglón:**$500.000**.

Observaciones

Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original de la referencia seleccionada, la cuenta
contable debe tener activado el manejo de **"Maneja y exige tercero",
"Controla endeudamiento" y "Maneja referencia".**

El valor abonado que se registre para cada cuenta por cobrar, se podrá
visualizar en los informes y exploradores de cartera.

---

# Nuevo saldo

Nuevo saldo de la cuenta por cobrar después de registrar el valor abonado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $50.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | $100.000 | $50.000 | **$50.000** | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez
En el campo **"Nuevo saldo"** el sistema muestra automáticamente cual es el
nuevo saldo de la cuenta por cobrar después de registrar el valor abonado por
cada renglón:**$50.000**.

Observaciones

Después de indicar el valor abonado el sistema automáticamente lo resta del
saldo actual y muestra el nuevo saldo con el que quedará la deuda después de
procesar la operación.

Para que el sistema realice la cancelación de la cuenta por cobrar o reste el
valor abonado a la deuda original por cada tercero, por cada referencia y
muestre el nuevo saldo, la cuenta de proveedores debe tener configurado:
**"Maneja y exige tercero", "Controla endeudamiento" y "Maneja referencia"**.
El valor del nuevo saldo de las cuentas por cobrar se podrá visualizar en los
informes de proveedores.

Este campo es informativo, no puede ser modificado por el usuario.

Configuración

Para configurar la funcionalidad de este campo \(visible\), ver:
**\[Operación: Configuración operación > Campos de la operación >
Configuración de columnas en abono a préstamos > Nuevo saldo\].**

---

# Observaciones

Observaciones sobre la cuenta por cobrar que se está cancelando o registrando
un abono.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono del anticipo
que se había realizado al trabajador, con fecha del 15/04/2018, soportada con
el comprobante de egreso **CE-00672** por valor de $100.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
CE-00672 | $100.000 | $100.000 | **$0** | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez

En el campo **"Observaciones"** Se debe indicar la información que desea
registrar para la cuenta por cobrar del renglón: Ejemplo: **"Abono a CE-00852
- CxC \(30/04/2018\) a Jorge Ramirez"**.

Observaciones

Al seleccionar la cuenta por cobrar el sistema asigna una observación de forma
automática, pero el usuario tiene la posibilidad de cambiar la observación.

La información que registre en este campo, el sistema la tomará como
descripción de la cuenta por cobrar para el documento de impresión y los
exploradores e informes de proveedores.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura o
requerido\), ver: **\[Operación: Configuración operación > Campos de la
operación > Configuración de columnas en abono a préstamos >
Observaciones\].**

---

# Vr. otra moneda

Valor abonado en moneda extranjera. En esta columna se puede especificar el
valor del abono equivalente en moneda extranjera.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de la cuenta
por cobrar que se había realizado al trabajador, por concepto de biaticos
pendientes por relacionar del viaje a Canadá, por valor de USD 36 soportada
con el comprobante de egreso CE-00672.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones | Vr. otra moneda
---|---|---|---|---|---
CE-00672 | $100.800 | $100.800 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez | **U$ 36**

En el campo **"Vr. otra moneda"** debe indicar el valor abonado en moneda
extranjera a la cuenta por cobrar selecionada en el renglón: Ejemplo **USD
36**.

Observaciones

Esta columna solamente se habilita para edición, cuando la cuenta maneje
moneda extranjera y en la configuración para el manejo de moneda extranjera,
esté habilitada la opción que permita la edición de este valor.

Normalmente solo a algunas cuentas de caja, bancos, cartera o proveedores, se
les puede habilitar el manejo de moneda extranjera. No se recomienda habilitar
este manejo en las cuentas de gastos, ingresos o costos.

Este dato se puede visualizar en los exploradores de contabilidad y de
proveedores.

Configuración

Para ingresar a la configuración de manejo de moneda extranjera, ingrese a
**\[Contabilidad > Configuración > Asistente de configuración de moneda
extranjera.\]**

---

# Concepto de pago

Concepto de la cuenta de nómina, a la cual se realiza la imputación.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
**510506 - Sueldos** | AD01-Administración | $ 781.242
**510527 - Auxilio de transporte** | AD01-Administración | $ 88.211

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta, en este caso del gasto que se requiere registrar: Ejemplo:**510506 -
Sueldos**

Observaciones

El catálogo de cuentas, trae un filtro por defecto donde sólo muestra las
cuentas de gastos y de costos de producción.

Se pueden registrar tantos conceptos de nómina sean necesarios, como horas
extras, auxilio de transporte, bonificaciones entre otros.

La operación trae configurados unos conceptos de nómina por defecto como: el
sueldo, horas extras, auxilio de transporte y bonificaciones.

El sistema cargará automáticamente los conceptos de pago predeterminados en la
configuración del tercero empleado, en la pestaña "Datos empleado".

Si se registra información en el campo detalle del renglón, este reemplazará
el nombre del concepto \(nombre de la cuenta contable\)en la impresión del
docuemnto. [Ver más.](<\[60\]GridIngresosEgresos_TDETALLE
\(NA\)\(Detalle\).html>)

Configuración

Para configurar las cuentas y valores por defecto en la operación, ver
**\[Menú Operación > Configuración > Configuración de cuentas y valores por
defecto\].**

Para configurar y predeterminar los conceptos y valores del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Cargar cuentas y valores por defecto

Carga los conceptos y sus valores predeterminados para el tercero empleado.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A
,tiene un salario fijo de $781.242 y auxilio de transsporte por $88.211.

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
510506 - Sueldos | AD01-Administración | $ 781.242
510527 - Auxilio de transporte | AD01-Administración | $ 88.211

Al dar clic en el botón "**Cargar cuentas y valores por defecto** , el sistema
cargará los datos que se encuentren predefinidos para el tercero empleado, en
este caso cargará por defecto: **el concepto "510506 - Sueldos" con valor $
781.242 y el "510527 - Auxilio de transporte" por valor de $ 88.211.**

Observaciones

El sistema cargará automáticamente los conceptos de pago con sus valores,
predeterminados en la configuración del tercero empleado en la pestaña "Datos
empleado".


Configuración

Para configurar y predeterminar los conceptos y valores del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Cargar todas las cuentas

Carga todas las cuentas por cobrar pendientes para el tercero seleccionado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de préstamos
que se habían generado al trabajador por concepto de anticipos de meses
anteriores, soportados con los comprobantes de egreso CE-00672 por valor de
$80.000, el CE-00683 por valor de $70.000 pesos y el CE-00695 por valor de
$100.000 pesos.

Al dar clic en el botón **"Cargar todas las cuentas"** se cargarán todas las
cuentas por cobrar que estén vencidas para el tercero empleado Jorge Ramirez,
para poder realizar el respectivo abono.

Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $80.000 | $80.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $20.000 | $50.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez
**CE-00683** | $100.000 | $0 | $100.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez


Observaciones

Al utilizar esta opción, se cargarán por defecto todas las cuentas por cobrar
pendientes del tercero empleado a la fecha que tienen la operación de nómina.

---

# Abonar monto

Permite abonar un monto dado a las cuentas por cobrar vencidas del tercero
empleado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono a préstamos
por valor de **$80.000** de 2 anticipos que se habían realizado al trabajador
a inicios del mes, soportados con los comprobantes de egreso **CE-00672** por
valor de $50.000 y **CE-00683** por valor de $70.000 pesos.
Cuenta por cobrar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $50.000 | $50.000 | $0 | Abono a CE-00672 - CxC \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $30.000 | $40.000 | Abono a CE-00683 - CxC \(30/04/2018\) a Jorge Ramirez

Al dar clic en el botón **"Abonar monto"** Se indica el valor de $80.000
pesos, de esta forma el sistema abonará **$50.000 pesos** a la referencia
**"CE-00672"** , y $30.000 pesos a la **CE-00683**.

Observaciones

\[ContaPyme\] reparte el valor que se indique en la opción **"Abonar monto"**
de forma automática sobre las cuentas por cobrar **vencidas** del tercero,
cancelando primero a las CxC con fecha más antigua.

---

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de préstamos
que se habían generado al trabajador por concepto de anticipos de meses
anteriores, soportados con los comprobantes de egreso CE-00672 por valor de
$80.000 y el CE-00249 por valor de $100.000 pesos.

Si requiere visualizar el documento de impresión de la referencia **CE-00249**
, a la cual se está realizando el abono puede dar clic el botón **"Visualizar
el documento impreso"** , y el sistema le muestra una vista previa del
documento con toda la información de la operación.

.
![360.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/NOM2%20-%20N%C2%BEmina/%5B14290%5D%20FrmOprNOM2/360.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra la visualización, es el que esté
configurado por defecto en la operación con la que se realizó la cuenta por
cobrar.

Configuración

Texto de configuración **Ruta configuración**

---

# Cargar todas las cuentas

Carga todas las cuentas por pagar pendientes para el tercero seleccionado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de novedades
causadas por pagar por concepto de bonificaciones pendientes del mes anterior
que se habían generado al trabajador, soportados con los comprobantes de
egreso CE-00672 por valor de $80.000, el CE-00683 por valor de $70.000 pesos y
el CE-00695 por valor de $100.000 pesos.

Al dar clic en el botón **"Cargar todas las cuentas"** se cargarán todas las
cuentas por pagar vencidas registradas para el tercero empleado Jorge Ramirez,
para poder realizar el respectivo abono.

Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $80.000 | $80.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $20.000 | $50.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez
**CE-00683** | $100.000 | $0 | $100.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez


Observaciones

Al utilizar esta opción, se cargarán por defecto todas las cuentas por cobrar
pendientes del tercero empleado a la fecha que tienen la operación de nómina.

---

# Abonar monto

Permite abonar un monto dado a las cuentas por pagar vencidas del tercero
empelado.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril. Así mismo, dentro de la nómina se requiere hacer el abono de novedades
causadas por pagar por valor de **$100.000** por concepto de bonificaciones
pendientes del mes anterior que se habían generado al trabajador, soportados
con los comprobantes de egreso **CE-00672** por valor de $80.000 y
**CE-00683** por valor de $70.000 pesos.
Cuenta por pagar | Saldo actual | Valor abono | Nuevo saldo | Observaciones
---|---|---|---|---
**CE-00672** | $80.000 | $80.000 | $0 | Abono a CE-00672 - CxP \(30/04/2018\) a Jorge Ramirez | **CE-00683** | $70.000 | $20.000 | $50.000 | Abono a CE-00683 - CxP \(30/04/2018\) a Jorge Ramirez

Al dar clic en el botón **"Abonar monto"** Se indica el valor de $100.000
pesos, de esta forma el sistema abonará **$80.000** pesos a la referencia
**"CE-00672"** , y **$20.000** pesos a la **CE-00683**.

Observaciones

\[ContaPyme\] reparte el valor que se indique en la opción **"Abonar monto"**
de forma automática sobre las cuentas por pagar **vencidas** del tercero
empleado, cancelando primero a las CxP con fecha más antigua.

---

# Visualizar el documento impreso

Active esta opción si requiere visualizar el documento impreso asociado a la
referencia que se está abonando.

Ejemplo

Se realiza la causación de la nómina del empleado Jorge Ramirez del mes de
abril, y se requeire registrar también el abono de la bonificación pendiente
por pagar del mes anterior, soportada con el comprobante de egreso
**CE-00250** por valor de $100.000 pesos.

Si requiere visualizar el documento de impresión de la referencia **CE-00250**
, a la cual se está realizando el abono puede dar clic el botón **"Visualizar
el documento impreso"** , y el sistema le muestra una vista previa del
documento con toda la información de la operación.

.
![390.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/NOM2%20-%20N%C2%BEmina/%5B14290%5D%20FrmOprNOM2/390.png)

Observaciones

Para visualizar el documento de impresión de la referencia a la cual le está
realizando el abono, debe estar ubicado en la referencia antes de dar clic en
la opción **"Visualizar el documento impreso".**

El documento de impresión que muestra la visualización, es el que esté
configurado por defecto en la operación con la que se realizó la cuenta por
pagar.

Configuración

Texto de configuración **Ruta configuración**

---

# CC. a cargar

Código del centro de costos al cual se va a registrar la imputación del egreso
en la operación de nómina.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
510506 - Sueldos | **AD01-Administración** | $ 781.242
510527 - Auxilio de transporte | **AD01-Administración** | $ 88.211

En el campo **"Cc. a cargar"** se debe indicar identificador del centro de
costo que tenemos previamente creado desde el explorafor gráfico de empresas:
Ejemplo: **AD01-Administración**.

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

El centro de costos también puede ser predefinido en cada tercero empleado, en
la pestaña "Datos empleado" y se cargará automáticamente en la operación de
nómina que se realice con dicho empleado.

Configuración

Para configurar las cuentas y valores por defecto en la operación, ver
**\[Menú Operación > Configuración > Configuración de cuentas y valores por
defecto\].**

Para configurar y predeterminar el centro de costos del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Valor

Valor total a pagar por el concepto de nómina que se está registrando.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |
---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor**
**510506 - Sueldos** | AD01-Administración | **$ 781.242**
**510527 - Auxilio de transporte** | AD01-Administración | **$ 88.211**

En el campo **"Valor"** se debe indicar el valor del concepto de pago que se
requiere registrar: Ejemplo: Para el concepto de pago de sueldos**781.242**

Observaciones

Este valor será el que el sistema tome como base para calcular automáticamente
los conceptos de retenciones y aportes de nómina configurados previamente en
la cuenta del gasto para la clase 5 "De nómina contable" [Ver
más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[250\]LblICase.html>)

También puede utilizar el botón de referencia que abre la calculadora para
ingresar el valor.

El sistema cargará auntomáticamente los valores predetreminados en la
configuración del tercero, en la pestaña "Datos empleado".

Si en la operación no se registra el valor, el renglón será omitido al momento
de grabarse.

Configuración

Para configurar las cuentas y valores por defecto en la operación, ver
**\[Menú Operación > Configuración > Configuración de cuentas y valores por
defecto\].**

Para configurar y predeterminar los conceptos y valores del tercero empleado,
ingrese por: **\[Pestaña: Básico > Catálogo de terceros > Seleccionar tercero
> Clic derecho: Modificar > Pestaña "Datos empleado"\].**

---

# Detalle

Permite especificar una descripción u observación corta para el registro del
concepto de pago de nómina que se esté realizando.

Ejemplo

Se va a registrar la nómina del empleado Jorge Carvajal Arenas del mes de
abril, el cual pertenece al área administrativa de la empresa CMB Muebles S.A:

Empelado: 12365478- Jorge Carvajal Arenas |  |  |
---|---|---|---
**Concepto de pago** | **Cc. a cargar** | **Valor** | **Detalle**
510506 - Sueldos | AD01-Administración | $ 781.242 | **Pago de la primera quincena del mes de abril.******

En el campo **"Detalle"** se debe indicar el detalle del concepto de pago que
requiere que salga en el documento de impresión: Ejemplo:**Pago de la primera
quincena del mes de abril.**

Observaciones

Esta información se podrá visualizar como descripción en la impresión del
documento.

El dato indicado en este campo podrá consultarse en los exploradores de
contabilidad y de cartera, asi como también en los informes de movimiento de
cuentas auxiliares.

La información indicada en este campo, reemplazará el nombre de la cuenta que
se haya indicado en la columna **concepto de pago** , al momento de la
impresión del documento.

Configuración

Para configurar la funcionalidad de este campo \(visible, solo lectura,
requerido, etc.\), ver: **\[Operación: Configurar operación > Campos de la
operación > Configuración de columnas en pagos > Detalle\]**.

---

# Empleado

Código del tercero empleado para el cual se registra la novedad

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas\(identificado
con còdigo 12365478\), por concepto de horas extras diurnas, con fecha de pago
el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | **12365478 - Jorge Carvajal Arenas** | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | $ 13.020 | 30/04/2018 | Horas extras diurnas proyecto nuevo
---|---|---|---|---|---|---|---

En el campo **"Empleado"** se debe indicar el código **12365478**

Observaciones

El sistema cargará auntomáticamente el centro de costo predetreminados en la
configuración del tercero, en la pestaña "Datos empleado".

Puede registrar novedades para diferentes terceros empleados en la misma
operación.

---

# Concepto de pago

Código de la cuenta que se imputará al pagar la novedad de nómina

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), por concepto de horas extras diurnas,
con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | **510515 - Horas extras y recargos** | AD01-Administración | $ 3255 | 4 | $ 13020 | 30/04/2018 | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta, en este caso del gasto que se requiere registrar: Ejemplo: **510515 -
Horas extras y recargos**

Observaciones

Puede indicar novedades como horas extra, bonificaciones, comisiones y demás
conceptos que son variables cada mes o como corresponda su liquidación.

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

Puede registrar tantos conceptos de pago requiera, en la misma operación.

---

# CC. a cargar

Código del Centro de costos al que se le carga la novedad

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de horas extras diurnas, con fecha
de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | **AD01-Administración** | $ 3255 | 4 | $ 13020 | 30/04/2018 | Horas extras diurnas proyecto nuevo
---|---|---|---|---|---|---|---

En el campo **"Cc. a cargar"** se debe indicar identificador del centro de
costo que tenemos previamente creado desde el explorafor gráfico de empresas:
Ejemplo: **AD01-Administración**.

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

El centro de costos también puede ser predefinido en cada tercero empleado, en
la pestaña "Datos empleado" y se cargará automáticamente en la operación de
novedad de nómina contable que se realice con dicho empleado.

---

# Valor unitario

Valor unitario para la novedad

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | **$ 3.255** | 4 | $ 13.020 | 30/04/2018 | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Valor unitario"** se debe indicar el valor de la hora extra que
se registrará en la novedad del empleado: Ejemplo: **$3.255**.

Observaciones

El sistema no calcula automáticamente el valor equivalente a las horas extras
del empleado, este cálculo lo debe hacer el usuario de forma manual.

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

El valor unitario indicado, será el valor por el cual se multiplicará la
cantidad.

---

# Cantidad

Cantidad por la cual se multiplicará el valor unitario.

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3255> | **4** | $ 13020 | 30/04/2018 | Horas extras diurnas proyecto nuevo
---|---|---|---|---|---|---|---

En el campo **"Cantidad"** se debe indicar la cantidad de horas extras que se
registrarán en la novedad para el empleado: Ejemplo: **4**.

Observaciones

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

---

# Valor total

Valor total que se pagará por el concepto registrado de la novedad de nómina.

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | **$ 13.020** | 30/04/2018 | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Valor Total"** el sistema mostrará el resultado de multiplicar
el valor unitario por la cantidad, en este caso **$13.020**

Observaciones

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

---

# Fecha de pago

Fecha en la cual se aplicará el pago de la novedad.

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | $ 13.020 | **30/04/2018** | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Fecha de pago"** se debe indicar la fecha en la cual se
registrará el pago de la novedad registrada para el empleado: Ejemplo:
**30/04/2018**.

Observaciones

La fecha de pago debe ser igual o inferior a la fecha de liquidación de la
nómina, para que la novedad sea incluida al momento de liquidar la nómina
contable de este empleado.

Por defecto el sistema asigna como fecha de pago, la misma fecha de la
operación de las novedades de nómina. La novedad de nómina, no generará ningún
movimiento contable hasta tanto no sea cargada y pagada con la operación de
nómina contable.

---

# Descripción

Descripción de la novedad de nómina.

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | $ 13.020 | 30/04/2018 | **Horas extras diurnas**
---|---|---|---|---|---|---|---

En el campo **"Descripción"** se debe indicar indicar el detalle de la
novedad: Ejemplo: **Horas extras diurnas**.

Observaciones

La descripción indicada en este campo, será la que se mostrará en el
comprobante de pago de nómina.

---

# Acerca de ventana

## OPERACIÓN DE NOVEDADES DE NÓMINA



## Objetivo

Esta ventana tiene como finalidad el registro de las registradas durante el
periodo, como horas extra, bonificaciones, comisiones y demás conceptos que
son variables cada mes o como corresponda su liquidación.

Siempre que se presenten novedades, la operación debe registrarse antes de que
se genere la operación de nómina contable, ya que aunque esta operación no
genera ningún tipo de movimiento contable, si registra las novedades y luego
las carga en la liquidación de la operación de nómina.

La operación de novedades de nómina también pertenece al módulo de
automatización de documentos.

## Ejemplo de información a registrar

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con código 12365478\), por concepto de horas extras diurnas,
con fecha de pago el 30/04/2018.

La información relevante para registrar la operación de nómina es:

  * Código del tercero empleado para el cual se registra la novedad.
  * Concepto de la cuenta de nómina, a la cual se realiza la imputación.
  * Centro de costos.
  * Valor unitario a pagar por el concepto de nómina que se está registrando.
  * Cantidad.
  * Fecha de pago.

## Secciones

Secciones de la operación:

## Sección encabezado

Permite seleccionar el tipo de documento con el cual se soportará la
operación, que normalmente puede ser novedad de nómina, este tipo de documento
se puede definir por defecto, y el sistema automáticamente asignará el
consecutivo correspondiente según su configuración.

También se debe indicar la fecha en la cual se registraran las novedades, esta
puede ser la misma fecha en que se liquida la nómina o una fecha anterior,
pero siempre debe estar registrada y procesada en el sistema antes de ir a
liquidar la nómina contable.

## Sección registro

En la zona de registro hay diferentes columnas que permiten registrar la
información básica de la operación como: código del tercero empleado para el
cual se registra la novedad, concepto de la cuenta de nómina, a la cual se
realiza la imputación, como horas extras o bonificaciones, centro de costos,
valor unitario y cantidad del concepto registrado, así como la fecha en la
cual se aplicará el pago de la novedad.

El sistema permite registrar tantas novedades de nómina como sean necesarias,
para diferentes empelados.

## Sección impresión de soportes

N/A

## Sección proceso de la operación

Una vez procesada la información, el sistema guardará los registros y estos se
cargarán en la próxima operación de nómina contable.

---

# Empleado

Código del tercero empleado para el cual se registra la novedad

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas\(identificado
con còdigo 12365478\), por concepto de horas extras diurnas, con fecha de pago
el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | **12365478 - Jorge Carvajal Arenas** | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | $ 13.020 | 30/04/2018 | Horas extras diurnas proyecto nuevo
---|---|---|---|---|---|---|---

En el campo **"Empleado"** se debe indicar el código **12365478**

Observaciones

El sistema cargará auntomáticamente el centro de costo predetreminados en la
configuración del tercero, en la pestaña "Datos empleado".

Puede registrar novedades para diferentes terceros empleados en la misma
operación.

---

# Concepto de pago

Código de la cuenta que se imputará al pagar la novedad de nómina

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), por concepto de horas extras diurnas,
con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | **510515 - Horas extras y recargos** | AD01-Administración | $ 3255 | 4 | $ 13020 | 30/04/2018 | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Concepto de pago"** se debe indicar el identificador de la
cuenta, en este caso del gasto que se requiere registrar: Ejemplo: **510515 -
Horas extras y recargos**

Observaciones

Puede indicar novedades como horas extra, bonificaciones, comisiones y demás
conceptos que son variables cada mes o como corresponda su liquidación.

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

Puede registrar tantos conceptos de pago requiera, en la misma operación.

---

# CC. a cargar

Código del Centro de costos al que se le carga la novedad

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de horas extras diurnas, con fecha
de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | **AD01-Administración** | $ 3255 | 4 | $ 13020 | 30/04/2018 | Horas extras diurnas proyecto nuevo
---|---|---|---|---|---|---|---

En el campo **"Cc. a cargar"** se debe indicar identificador del centro de
costo que tenemos previamente creado desde el explorafor gráfico de empresas:
Ejemplo: **AD01-Administración**.

Observaciones

Las cuentas que exigen centro de costos dependen de la configuración de la
cuenta. [Ver más](<../../../../020 CN/cats/Plan de Cuentas/\[10970\]
FrmCuenta/\[60\]EdBExigeICC.html>)

El centro de costos también puede ser predefinido en cada tercero empleado, en
la pestaña "Datos empleado" y se cargará automáticamente en la operación de
novedad de nómina contable que se realice con dicho empleado.

---

# Valor unitario

Valor unitario para la novedad

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | **$ 3.255** | 4 | $ 13.020 | 30/04/2018 | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Valor unitario"** se debe indicar el valor de la hora extra que
se registrará en la novedad del empleado: Ejemplo: **$3.255**.

Observaciones

El sistema no calcula automáticamente el valor equivalente a las horas extras
del empleado, este cálculo lo debe hacer el usuario de forma manual.

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

El valor unitario indicado, será el valor por el cual se multiplicará la
cantidad.

---

# Cantidad

Cantidad por la cual se multiplicará el valor unitario.

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3255> | **4** | $ 13020 | 30/04/2018 | Horas extras diurnas proyecto nuevo
---|---|---|---|---|---|---|---

En el campo **"Cantidad"** se debe indicar la cantidad de horas extras que se
registrarán en la novedad para el empleado: Ejemplo: **4**.

Observaciones

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

---

# Valor total

Valor total que se pagará por el concepto registrado de la novedad de nómina.

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | **$ 13.020** | 30/04/2018 | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Valor Total"** el sistema mostrará el resultado de multiplicar
el valor unitario por la cantidad, en este caso **$13.020**

Observaciones

La novedad de nómina, no generará ningún movimiento contable hasta tanto no
sea cargada y pagada con la operación de nómina contable.

---

# Fecha de pago

Fecha en la cual se aplicará el pago de la novedad.

Ejemplo

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | $ 13.020 | **30/04/2018** | Horas extras diurnas
---|---|---|---|---|---|---|---

En el campo **"Fecha de pago"** se debe indicar la fecha en la cual se
registrará el pago de la novedad registrada para el empleado: Ejemplo:
**30/04/2018**.

Observaciones

La fecha de pago debe ser igual o inferior a la fecha de liquidación de la
nómina, para que la novedad sea incluida al momento de liquidar la nómina
contable de este empleado.

Por defecto el sistema asigna como fecha de pago, la misma fecha de la
operación de las novedades de nómina. La novedad de nómina, no generará ningún
movimiento contable hasta tanto no sea cargada y pagada con la operación de
nómina contable.

---

# Descripción

Descripción de la novedad de nómina.

Se registra novedad de nómina del empleado Jorge Carvajal Arenas
\(identificado con còdigo 12365478\), el cual pertenece al área administrativa
de la empresa CMB Muebles S.A por concepto de 4 horas extras diurnas, el valor
de la hora diurna es de $3.255 con fecha de pago el 30/04/2018.
**Empleado** | **Concepto de pago** | **Cc. a cargar** | **Valor unitario** | **Cantidad** | **Valor total** | **Fecha de pago** | **Descripción** | 12365478 - Jorge Carvajal Arenas | 510515 - Horas extras y recargos | AD01-Administración | $ 3.255 | 4 | $ 13.020 | 30/04/2018 | **Horas extras diurnas**
---|---|---|---|---|---|---|---

En el campo **"Descripción"** se debe indicar indicar el detalle de la
novedad: Ejemplo: **Horas extras diurnas**.

Observaciones

La descripción indicada en este campo, será la que se mostrará en el
comprobante de pago de nómina.

---

# Responsable

Empleado responsable de realizar la orden de trabajo.

Observaciones

Si la empresa tiene dentro del licenciamiento de \[ContaPyme\], el módulo de
órdenes de trabajo y de producción, podrá consultar un explorador de órdenes y
filtrar estos documentos por cada responsable y analizar la efectividad de
entrega en cada uno de ellos.

---

# Referencia

Permite indicar el código del pedido que origina la orden de trabajo.

Ejemplo

El cliente Pepito Pérez solicita que se le realice mantenimiento a un
servidor, por lo tanto se genera una cotización para dicho servicio y el
cliente lo aprueba haciendo el pedido PED-1805001.
Por lo tanto en el campo Referencia, se debe indicar **PED-1805001** , para
que quede la trazabilidad del proceso.

Observaciones

El pedido se debe tener registrado en el sistema \[ContaPyme\] por medio del
módulo de "Inventarios Plus" y la operación "Pedido de un cliente."

Configuración

Para configurar la funcionalidad de este campo como visible, solo lectura o
requerido, ver: **\[Operación: Orden de trabajo > Configurar operación >
Campos de la operación > Datos maestros de la operación\]**

---

# Datos adicionales

Información requerida para la creación y clasificación de la orden de trabajo.

---

# Clase de CC

Clase del centro de costos para el registro de cuentas de ingresos y egresos.

Observaciones

Originalmente a un centro de costos se le pueden realizar registros de
cualquier cuenta de ingresos y egresos, siempre y cuando estas cuentas estén
configuradas para exigir centro de costos, sin embargo, a través de las clases
de centros de costos se puede limitar las cuentas desde las cuales puede
recibir registros.
Por defecto el sistema tiene creadas 4 clases de centros de costos:

  * **Gastos:** Se utiliza cuando el centro de costos se va a crear con fines de acumular gastos.
  * **Ventas:** Se utiliza cuando el centro de costos se va a crear con fines de acumular ingresos.
  * **Producción:** Se utiliza cuando el centro de costos se va a crear con fines de acumular costos de producción \(cuando el usuario en su licenciamiento utiliza el módulo de costos de producción\).
  * **No operacional:** Se utiliza cuando el centro de costos se va a crear con fines de acumular ingresos y egresos no operacionales.

Por defecto las clases de centros de costos que ya están creadas, no tienen
limitante en cuanto a las cuentas que pueden afectar el centro de costos. Si
el usuario desea modificar las clases e indicarle al sistema qué debe hacer al
recibir imputaciones de otras cuentas distintas, es necesario que el usuario
modifique la configuración de cada una de las clases.
Para configurar o crear clases de centros de costos, ver:**\[ Pestaña Básico >
Menú desplegable del botón Empresa > Clases de centros de costos\].**

---

# CC padre

Código del centro de costos bajo el cual se creará la orden de trabajo.

Ejemplo

![130
ICCPadre.png](https://www.contapyme.com/ayudascontapyme/ayudasmasinfo/ayudas/040%20AD/Oprs/OT1%20-%20Orden%20de%20trabajo/%5B14510%5D%20FrmOprOT1/130%20ICCPadre.png)

Observaciones

En el explorador gráfico de empresa, se podrá visualizar la orden de trabajo
asociada como un nodo adicional del centro de costos padre.
El código de la orden de trabajo quedará formado por el centro de costos padre
+ número de documento de la operación con la que se creó la orden.

---

# Actividad

Actividad empresarial que se usará en la orden de trabajo.

Observaciones

\[ContaPyme\] tiene un módulo denominado "Actividades y labores empresariales"
que se utiliza para identificar labores de mano de obra propias de una
actividad productiva.
Si una empresa se dedica a la fabricación de camisas y también de zapatos,
cada proceso productivo se considera como "actividad", y cada uno tiene una
labores que permiten la fabricación del producto terminado.
Si la empresa no usa el módulo de "actividades y labores empresariales" este
campo se puede registrar con la actividad general que el sistema presenta.

Configuración

Para configurar la funcionalidad de este campo como visible, solo lectura o
requerido, ver: **\[Operación: Orden de trabajo > Configurar operación >
Campos de la operación > Datos maestros de la operación\]**

---

# Tasa de asignación CIF

Porcentaje de tasa de asignación para ser usado como criterio adicional en las
distribuciones de costos indirectos.

Observaciones

Este campo es útil cuando en la empresa se utiliza el módulo de distribuidores
de costos y se tienen centros de costos indirectos de producción que a fin de
mes deben ser distribuidos o prorrateados de manera automática a otros centros
de costos.

---

# Unidad

Unidad del servicio o producto que se va a realizar en la orden de trabajo.

---

# Población

Cantidad de unidades que se generarán en la orden de trabajo.

Observaciones

La cantidad registrada en este campo se puede utilizar como criterio de
distribución de los costos indirectos. Para esto es necesario que la empresa
tenga el módulo de "Distribuidores de costos" en el licenciamiento de
\[ContaPyme\].

---

# Grupo

Este atributo permite crear grupos de órdenes de trabajo para producir
informes consolidados y/o distribución de costos indirectos.

Observaciones

Para visualizar informes de costos asociados a una orden de trabajo la empresa
debe tener en el licenciamiento de \[ContaPyme\] el módulo de costos de
producción; y para poder realizar el proceso de distribución de costos de
producción se requiere tener en el licenciamiento de \[ContaPyme\] el módulo
de cost-drivers.

Configuración

Para configurar la funcionalidad de este campo como visible, solo lectura o
requerido, ver: **\[Operación: Orden de trabajo > Configurar operación >
Campos de la operación > Datos maestros de la operación\]**

---

# Clasificador

Los clasificadores son palabras clave que se pueden usar para establecer
criterios de distribución o para generar informes consolidados.

Observaciones

Para visualizar informes de costos asociados a una orden de trabajo la empresa
debe tener en el licenciamiento de \[ContaPyme\] el módulo de costos de
producción; y para poder realizar el proceso de distribución de costos de
producción se requiere tener en el licenciamiento de \[ContaPyme\] el módulo
de cost-drivers.

Configuración

Para configurar la funcionalidad de este campo como visible, solo lectura o
requerido, ver: **\[Operación: Orden de trabajo > Configurar operación >
Campos de la operación > Datos maestros de la operación\]**

---

# Quién lo ordena

Código del tercero que ordena el trabajo que se va a realizar.

Ejemplo

El tercero: 900852956-7 - Transportes Madrigal, solicita una orden de trabajo
la prestación de un servicio; así que en el campo "Quién lo ordena" se debe
indicar Nit del tercero Transportes Madrigal: **900852956**.

Configuración

Para configurar la funcionalidad de este campo como visible o no, ver:
**\[Operación: Orden de trabajo > Configurar operación > Campos de la
operación > Datos maestros de la operación\]**

---

# Ver documento impreso

Permite ver el documento impreso \(en formato PDF\) del pedido indicado en el
campo "Referencia".

---

# Instrucciones

Permite describir y detallar plenamente el trabajo que se debe realizar para
cumplir la orden de trabajo.

---

# Planeación de la orden

Especifique la estimación de días de trabajo hábiles para ejecutar esta orden,
o bien, la fecha planeada de entrega.

---

# Fecha de inicio

Fecha en la que comenzará la orden de trabajo.

Observaciones

Si la empresa tiene dentro del licenciamiento de \[ContaPyme\], el módulo de
órdenes de trabajo y de producción, podrá consultar un explorador de órdenes y
por medio de colores tipo semáforo analizará si una orden está vigente \(color
verde\), próxima a vencer \(color amarillo\) o vencida \(color rojo\). Estos
colores dependen de la fecha de inicio y la fecha de consulta del explorador.

---

# Días hábiles

Días hábiles que se disponen para realizar la orden de trabajo.

Observaciones

Si la empresa tiene dentro del licenciamiento de \[ContaPyme\], el módulo de
órdenes de trabajo y de producción, podrá consultar un explorador de órdenes y
por medio de colores tipo semáforo analizará si una orden está vigente \(color
verde\), próxima a vencer \(color amarillo\) o vencida \(color rojo\). Estos
colores dependen de la fecha de inicio más los días hábiles y la fecha de
consulta del explorador.

Configuración

Para configurar la funcionalidad de este campo como visible, solo lectura o
requerido, ver: **\[Operación: Orden de trabajo > Configurar operación >
Campos de la operación > Datos maestros de la operación\]**
Para configurar los días hábiles de trabajo y permitir que \[contaPyme\]
calcule la fecha estimada de entrega, ver: **\[Operación: Orden de trabajo >
Herramientas > Días hábiles de trabajo\]**

---

# Fecha estimada entrega

Fecha en la cual se estima finalizar la orden de trabajo.

Observaciones

La "Fecha estimada entrega" \[ContaPyme\] la calcula automáticamente, según la
fecha de inicio más los días hábiles indicados que se tendrán disponibles para
la realización de la orden de trabajo.

---

# Acerca del módulo

##

## AUTOMATIZACIÓN DE DOCUMENTOS

## Explicación conceptual

El módulo de automatización de documentos ofrece una serie de asistentes
fáciles de manejar que solicitarán información básica de la operación,
permitiendo que cualquier usuario pueda realizar dichas transacciones sin
tener grandes conocimientos contables.

Al registrar la transacción, se generará de forma automática el respectivo
asiento contable, afectando la contabilización local y la contabilización
NIIF, permitiendo al usuario ahorrar tiempo al no tener que realizar dobles
registros.

Todos los asistentes de ingresos y gastos, al igual que los asistentes de
cartera y proveedores incluyen el sistema de cálculo automático de impuestos,
que liquidarán IVA, RETEFUENTE, RETEICA, y demás impuestos que correspondan.
El sistema de cálculo automático de impuestos es completamente configurable a
las necesidades y requerimientos de cada país y cada empresa.

El usuario podrá imprimir el soporte físico de cada transacción, evitando así
el doble trabajo de hacer el comprobante y separadamente hacer la codificación
contable y la digitación en la contabilidad.

El módulo de automatización de documentos incluye un completo conjunto de
operaciones especializadas en cada tipo de documento; cada operación solicita
la información básica de cada transacción a través de un asistente simple,
donde al procesarse, genera en forma totalmente automática el documento
impreso y todos los movimientos contables, de ejecución presupuestal y de
cartera que correspondan.

Los asistentes de ingresos y gastos permiten programar fechas de pagos y
manejo de cuotas, así como registrar pagos en efectivo, cheque, CxP o CxC,
cruzar con anticipos, etc.

El módulo de automatización de documentos incluye un completo conjunto de
asistentes especializados para cada tipo de operación. Por ejemplo, permite la
facturación de conceptos y la facturación electrónica de servicios,
automatización contable de comprobantes de nómina \(cálculo automático de
parafiscales\), automatización de abonos a cartera clientes y proveedores
\(comprobantes de abono\), automatización de ingresos y gastos diferidos con
su respectiva amortización de forma automática.


## Relación con otros módulos

El módulo de automatización de documentos se integra totalmente con los demás
módulos del sistema, evitando la generación de interfaces que le quitarán
tiempo y le prevendrán de omitir o repetir información.

Cada asistente del módulo de automatización de documentos procesa la
información integrándola automáticamente a todos los módulos del sistema como
el módulo de contabilidad, cartera y proveedores, presupuesto, activos fijos,
entre otros.

## Manejos que incluye el módulo

El módulo de automatización incluye otros 2  módulos, los cuales se describen
a continuación:

## Nómina contable

El submódulo de nómina contable permite el registro y cancelación de la nómina
y el cálculo automático de las prestaciones sociales, parafiscales y
provisiones de los empleados de la empresa. También cuenta con un asistente
que permite registrar las novedades de nómina del periodo como horas extras,
bonificaciones, comisiones, etc., las cuales se cargarán de forma automática
al pago de nómina.

Adicionalmente se podrán cancelar en la nómina las cuentas por cobrar y
cuentas por pagar que el empleado tenga pendientes al momento de la
cancelación, sumando o restando estos valores al pago total.

## Ordenes de trabajo

Esta herramienta permite la creación de órdenes de trabajo, como centros de
costos, para poder acumular ingresos, gastos y costos y finalmente poderlas
convertir en activos fijos, las cuales serán amortizados en el periodo
indicado. Las ordenes de trabajo también podrán ser finalizadas para conocer
el valor total.

## Operaciones que incluye el módulo

Operaciones de ingresos y gastos

## Operación de ingreso

Esta operación permite registrar de forma simple y rápida los ingresos que se
perciben por conceptos de facturación de conceptos o servicios, sólo digitando
alguna información simple, como el tercero del cual se recibe el ingreso, el
concepto del ingreso, el centro de costos a afectar, el valor del ingreso, los
impuestos a que haya lugar y la forma de pago.

## Operación de gastos

Esta operación permite registrar de forma sencilla y rápida los gastos de la
empresa, permitiendo así a los usuarios que no tengan conocimientos contables
que puedan digitar la información.

## Operación de traslado de fondos

Esta operación permite registras los movimientos de dinero de la empresa, ya
sea de caja a banco, de banco a caja, de caja a caja o de banco a banco. El
movimiento de esta operación sacará el dinero de una cuenta y lo llevará a
otra. Adicionalmente podremos imprimir la nota de contabilidad con todos los
datos anteriormente mencionados.

## Operación de pagos

Esta operación permite registrar gastos y adicionalmente realizar en la misma
transacción la cancelación de cuentas por cobrar y cuentas por pagar
pendientes con el tercero del gastro, sumando o restando dichos valores.

## Operación de gastos diferidos

Esta operación se utiliza para el registro de los gastos pagados por
anticipado que realiza la empresa en el desarrollo de su actividad, los cuales
se deben amortizar durante el período en que se reciben los servicios o se
causen los costos o gastos.

## Operación de ingresos recibidos por anticipado

Permite el registro por concepto de recibir un ingreso por anticipado, es
decir, que no se ha realizado la prestación del servicio o entrega del
producto, por lo tanto, la empresa contrae con el tercero una obligación por
el dinero recibido por anticipado, lo cual se convierte en un pasivo diferido
que se deberá ir amortizando en la medida en que se vaya prestando el servicio
o entregando el producto.

Operaciones de Cartera

Operación de préstamo o anticipo de CXC

Esta operación tiene como finalidad el registro de un préstamo o anticipo que
la empresa le hace a un tercero. Es decir, en la contabilidad quedará
registrado como una cuenta que la empresa le debe cobrar a un tercero \(CxC\).

Operación de Abono de cuentas por cobrar

La operación de abonos a cuentas por cobrar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente un tercero con la empresa, así
como también permite en una misma operación realizar abonos a múltiples
terceros y realizar el cobro de valores adicionales como intereses.

Replanteamiento de créditos CXC

La operación de "replanteamiento de un crédito – cuentas por cobrar", se puede
utilizar cuando ya se ha creado un crédito y en un momento determinado se
decide por algún motivo, cambiar la forma de pago del crédito a más cuotas o a
menos cuotas.

Operaciones de Proveedores

Operación de crédito o anticipo de CXP

Esta operación tiene como finalidad el registro de un crédito o anticipo
cuando un tercero le ha hecho a la empresa un préstamo o un anticipo. Es
decir, en la contabilidad quedará registrado como una cuenta que se le debe
pagar a un tercero.

Operación de abono de cuentas por pagar

La operación de abonos a cuentas por pagar se utiliza para realizar el pago o
cancelación de la deuda que tiene pendiente la empresa con un tercero, pero a
su vez, también permite en una misma operación realizar abonos a múltiples
terceros y realizar el cobro de valores adicionales como intereses.

Replanteamiento de créditos CXP

La operación de "replanteamiento de un crédito – cuentas por pagar", se
utiliza cuando ya se ha creado un crédito y en un momento determinado se
decide por algún motivo, cambiar la forma de pago del crédito a más cuotas o a
menos cuotas.

Informes, consultas y exploradores

Control de documentos

Este informe permitirá al usuario generar un listado de los diferentes tipos
de documentos creados, clasificados por el tipo de documento de soporte, en el
cual se listará cada consecutivo con el tercero de las transacciones y los
valores parciales, de impuestos y totales. Estos informes podrán generarlos en
formato PDF, Word, Excel, enviarlos por correo electrónico e imprimirlos.

Comprobante informe diario

Este informe permite consultar los valores los valores diarios de venta que
han sido registrados a través de la operación de ingresos. En este informe el
usuario podrá visualizar los rangos de numeración de las facturas, los valores
por factura incluyendo los impuestos y medios de pago.

---

# Guía de montaje

## NÓMINA CONTABLE

Esta guía lo orientará en el montaje de una nómina contable. Su alcance se
limita a llevar el control de los pagos realizados a los empleados por
conceptos de sueldos y conceptos de retenciones y aportes de nómina.



##  Preparación de información inicial

Esta sección indica cuáles son los requisitos que debe cumplir previamente al
montaje de una nómina contable.

## Realice el montaje del sistema básico

\(Creación de la empresa y centros de costos, creación de terceros,
personalización del plan de cuentas, documentos de soporte y documentos de
impresión\).
Para más información consulte la Guía de montaje de sistema básico
[aquí](<?id=\[GM\]1010>).

## Realice el proceso de capacitación de nómina contable

Ver Curso de Cartera y proveedores
[aquí](<https://www.contapyme.com/Capacitacion-Virtual/#/CP40MOD093>).

##  Creación de los terceros empleados

En esta sección se crean en el catálogo de terceros, todos aquellos terceros
que tienen una relación laboral con la empresa.

## Requisitos

Seleccionar aquellos terceros quienes tienen una relación laboral con la
empresa o que cuentan con un contrato laboral.

## Preparación de la información

Conocer toda la información relacionada con el tercero, datos de contacto,
tipo de contrato, entidades a las cuales se encuentra afiliado.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Terceros **\[Cinta de opciones: Pestaña Básico >
Catálogo Terceros\]**.

Dé clic derecho sobre el catálogo y seleccione la opción Crear.

Seleccione el tipo de tercero Empleado.

En la pestaña Datos empleado en la opción Nómina contable configurar el centro
de costos por defecto para el empleado, los conceptos de nómina contable:
Sueldos, auxilio de transporte y las entidades a las cuales se encuentra
afiliado el empleado: caja de compensación, cesantías, EPS, pensión.

En la opción Datos de contratos configure los contratos que ha tenido el
empleado.

En la pestaña Cuenta bancaria configure los datos de la cuenta del empleado en
la cual se realizarán los respectivos pagos de nómina.



##  Creación de cuentas de nómina

En esta sección se crean en el PUC las cuentas auxiliares para el registro de
la nómina.

## Requisitos

Identificar las cuentas auxiliares que se requieren crear en el plan de
cuentas y que serán usadas en el registro de la nómina.

## Preparación de la información

Definir si dichas cuentas auxiliares, pertenecen al grupo de gastos o de
costos para ser creadas en el respectivo grupo.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de Plan de cuentas **\[Cinta de opciones: Pestaña
Contabilidad > Catálogos > Plan de cuentas\]**.

Seleccione la cuenta a la cual va a pertenecer la cuenta auxiliar a crear,
ejemplo 510506 Sueldos.

Cree la nueva cuenta auxiliar **\[Cinta de opciones > Crear\]**.

Indique el código que tendrá la cuenta auxiliar, ejemplo: 51050610.

Realice las configuraciones correspondientes: Asigne nombre a la cuenta,
Maneja y exige tercero, clase De nómina contable.

Registre los conceptos de nómina contable, es decir los conceptos que se
calcularán cuando la cuenta sea llamada en la operación de nómina contable.



##  Configuración de alias de terceros

En esta sección se configuran los alias de tercero que trae el sistema,
adicional permite crear los alias de terceros que el usuario requiera.

## Requisitos

Tener creados en el sistema como terceros, las entidades a las cuales se
encuentra afiliado el empleado.

## Preparación de la información

Verificar las entidades a las cuales se encuentra afiliado el empleado y
requieran la configuración del alias de tercero.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de alias de terceros **\[Cinta de opciones: Pestaña Básico
> Menú catálogo de terceros > Alias de terceros\]**.

Seleccione el alias de tercero a configurar.

Ejemplo:

CCF – Caja de Compensación Familiar.

Seleccione del catálogo de terceros, el terceo al cual hace referencia ese
alias, ejemplo: Confa.



##  Definición de conceptos de liquidación

En esta sección se definen los conceptos de nómina contable que se calcularan
al momento de registrar la operación.

## Requisitos

Verificar los conceptos de retenciones y aportes de nómina en egreso.

## Preparación de la información

Defina el tipo de movimiento contable a generar de cada concepto de
liquidación, las cuentas auxiliares a afectar y el alias de tercero para
generar la cuenta por pagar.

## Procedimiento en \[ContaPyme\]

Ingrese al catálogo de conceptos de liquidación en egreso **\[Cinta de
opciones: Pestaña Contabilidad > Menú Plan de cuentas > Concepto de
liquidación en egreso\]**.

Ubíquese en los conceptos de RETENCIONES Y APORTES DE NÓMINA.

Seleccione el concepto a configurar.

Ejemplo:

Aportes a salud trabajador.

Configure el concepto indicando por cada uno:

**Código** | **Inicio vigencia** | **Nombre** | **Porcentaje**
---|---|---|---
RANEPS | 01/01/2014 | Aportes a Entidades promotoras de salud - EPS |
RANPEPS | 01/01/2014 | Aportes a salud trabajador | 4
RANPEPSP | 01/01/2014 | Aportes a salud patrono | 8.5
RANERP | 01/01/2014 | Aportes a adm. de riesgos profesionales - ARP |
RANPERP | 01/01/2014 | Aportes a pensiones trabajador | 4
RANPERPAT | 01/01/2014 | Aportes a pensiones patrono | 12



##  Configuración del documento de soporte para nómina contable

Esta sección indica cómo configurar el documento de soporte Comprobante de
pago de nómina.

## Requisitos

No hay requisitos.

## Preparación de la información

Defina la máscara del documento de Comprobante de pago de nómina según lo
requiera

**Nombre** | **Máscara** /th>
---|---
Comprobante de pago de nómina | CP-@@&&\#\#</td> </tr> <tr> <td>Comprobante de pago de nómina</td> <td>CP-\#\#\#\#\#\#</td> </tr> </tbody> </table> </p> </div> <div class="subseccion"> <div class="subtitulo seccion">Procedimiento en \[ContaPyme\]</div> <p class="texto\_seccion"> <span class="paso">1</span>Ingrese al catálogo de documentos de soporte <span class="ruta\_config">\[Cinta de opciones: Pestaña Básico > Doc. soporte\]</span>.<br><br> <span class="paso">2</span>Ejecute el "Asistente de configuración inicial del catálogo de documentos de soporte".<br><br> <span class="paso">3</span>Adicione los documentos de soporte <span class="ruta\_config">\[Cinta de opciones del catálogo: Crear\].</span> Para obtener información acerca de la codificación de los documentos de soporte consulte la ventana de Más Información del código.<br> <a href="?id=1148020">aquí</a><br> <table> <tbody> <tr> <th><b>Código</b></th> <th><b>Nombre</b></th> <th><b>Máscara</b></th> </tr> <tr> <td>60</td> <td>Comprobante de pago de nómina \(aa/mm\)</td> <td>CP-@@&&\#\#</td> </tr> <tr> <td>601</td> <td>Comprobante de pago de nómina</td> <td>CP-\#\#\#\#\#\#</td> </tr> </tbody> </table> </p> </div> </p> <br> <div class="titulo seccion" id="cfgdocimp" iconindex="103"> <span class="paso">7</span><img class="imgseccion" ruta="ruta-imagenes" iconindex="71" imagelist="IMG32"> Configuración del documento de impresión para nómina contable </div> <p class="texto\_seccion"> Esta sección indica cómo configurar el documento de impresión del Comprobante de pago de nómina.<br> <div class="subseccion"> <div class="subtitulo seccion">Requisitos</div> <p class="texto\_seccion"> Tenga configurado el documento de soporte - Comprobante de pago de nómina, como se indica la sección 6 de esta guía. </p> </div> <div class="subseccion"> <div class="subtitulo seccion">Preparación de la información</div> <p class="texto\_seccion"> No hay requisitos. </p> </div> <div class="subseccion"> <div class="subtitulo seccion">Procedimiento en \[ContaPyme\]</div> <p class="texto\_seccion"> <span class="paso">1</span>Ingrese al catálogo de documentos de impresión <span class="ruta\_config">\[Cinta de opciones: Pestaña Básico > Doc. impresión\]</span>.<br><br> <span class="paso">2</span>Ejecute el "Asistente de configuración inicial del catálogo de documentos de soporte".<br><br> <span class="paso">3</span>Adicione los documentos de impresión <span class="ruta\_config">\[Cinta de opciones del catálogo: Crear\]</span>. Para obtener información acerca de la codificación de los documentos de impresión consulte la ventana de Más Información del código </p> </div> </p> <br> <div class="titulo seccion" id="cfgdocsopnom" iconindex="86"> <span class="paso">8</span><img class="imgseccion" ruta="ruta-imagenes" iconindex="114" imagelist="IMG32"> Configuración del documento de soporte para novedad de nómina </div> <p class="texto\_seccion"> Esta sección indica cómo configurar el documento de soporte Novedad de nómina.<br> <div class="subseccion"> <div class="subtitulo seccion">Requisitos</div> <p class="texto\_seccion"> No hay requisitos. </p> </div> <div class="subseccion"> <div class="subtitulo seccion">Preparación de la información</div> <p class="texto\_seccion"> Defina la máscara del documento Novedad de nómina según lo requiera<br><br> <table> <tbody> <tr> <th><b>Nombre</b></th> <th><b>Máscara</b></th> </tr> <tr> <td>Novedad de nómina</td> <td>NN-@@&&\#\#</td> </tr> <tr> <td>Novedad de nómina</td> <td>NN-\#\#\#\#\#\#</td> </tr> </tbody> </table> </p> </div> <div class="subseccion"> <div class="subtitulo seccion">Procedimiento en \[ContaPyme\]</div> <p class="texto\_seccion"> <span class="paso">1</span>Ingrese al catálogo de documentos de soporte <span class="ruta\_config">\[Cinta de opciones: Pestaña Básico > Doc. soporte\]</span>.<br><br> <span class="paso">2</span>Ejecute el "Asistente de configuración inicial del catálogo de documentos de soporte".<br><br> <span class="paso">3</span>Adicione los documentos de soporte <span class="ruta\_config">\[Cinta de opciones del catálogo: Crear\]</span>. Para obtener información acerca de la codificación de los documentos de soporte consulte la ventana de Más Información del código. </p> </div> </p> <br> <\!--- Guías de montaje relacionadas ---> <div class="texto\_relacionados"> <div class="titulo seccion" id="guiasrel" iconindex="8">Guías relacionadas</div> <ul> <li> <a href="?id=\[GM\]1010">Guía de montaje sistema básico</a></li> </ul> </div> <div class="final">¡Y listo\! Podrá empezar a registrar operaciones de nómina contable y novedades de nómina.</div> </div> </body>
