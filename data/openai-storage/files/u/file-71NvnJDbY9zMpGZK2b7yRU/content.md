# Cierre de ciclo de costos: Validaciones
[Ver el video](https://www.youtube.com/watch?v=TZR430U01zk)
TZR430U01zk

## Tema principal
Validaciones importantes a realizar durante el cierre de ciclo de costos para garantizar la integridad de la información en ContaPyme.

## Resumen general
Este video explica las validaciones esenciales que se deben realizar al cerrar el ciclo de costos en ContaPyme. Aborda la importancia de verificar cantidades y costos positivos, asegurar la concordancia entre el inventario y la contabilidad, y la necesidad de cerrar y bloquear el mes después del cierre de costos. También se advierte sobre el uso de la operación de movimiento universal, especialmente cuando se trabaja con costos de producción y productos compuestos, destacando cómo un uso incorrecto puede generar inconsistencias y errores en el inventario y en el cierre de ciclo de costos. El video enfatiza la necesidad de solucionar cualquier descuadre antes de avanzar al cierre del mes siguiente.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipo de valores debo verificar que no existan durante el cierre del ciclo de costos?
#### Respuesta
Es fundamental verificar que no existan cantidades negativas ni costos sin cantidades (ya sean positivas o negativas). Lo habitual es tener cantidades y costos positivos.

### ¿Por qué es importante revisar el costo del producto terminado después del cierre?
#### Respuesta
Es importante revisar el costo del producto terminado después del cierre para verificar que sea el adecuado. A veces, el costo cambia significativamente después del cierre, lo que indica que es necesario revisar todo el ciclo de costos para entender por qué el sistema calculó el costo de esa manera.

### ¿Qué debo hacer si el costo de mi producto terminado cambia drásticamente después del cierre del ciclo de costos?
#### Respuesta
Si el costo del producto terminado cambia significativamente, es necesario revisar todo el ciclo de costos para identificar la causa. Esto incluye revisar las cantidades, los costos y las operaciones que afectaron el cálculo del costo del producto.

### ¿Qué relación debe existir entre los saldos de inventario y la contabilidad?
#### Respuesta
Los saldos de inventario deben ser iguales a los saldos en la contabilidad. Es crucial que este cuadre se mantenga durante todo el ciclo de costos y en general en el manejo del sistema cuando se usan inventarios y contabilidad.

### ¿Qué debo hacer después de realizar el cierre del ciclo de costos al final del mes?
#### Respuesta
Después de realizar el cierre del ciclo de costos, es muy importante proceder a hacer un cierre y bloqueo de mes en ContaPyme. Esto evita que se desprocesen accidentalmente operaciones de ese mes, lo que podría requerir volver a correr el cierre y generar ajustes inesperados.

### ¿Por qué es importante cerrar y bloquear el mes después del cierre del ciclo de costos?
#### Respuesta
Cerrar y bloquear el mes después del cierre del ciclo de costos es crucial para evitar que otros usuarios modifiquen accidentalmente operaciones del mes ya cerrado, lo que podría generar inconsistencias y obligar a reprocesar el cierre de costos. Esto es especialmente importante si ya se han presentado estados financieros.

### ¿Qué pasos debo seguir para verificar que el saldo de inventario coincide con la contabilidad?
#### Respuesta
Para verificar que el saldo de inventario coincide con la contabilidad, debes realizar los siguientes pasos:
1.  Obtener el saldo del inventario directamente desde el sistema de inventario de ContaPyme.
2.  Obtener el saldo de la cuenta general de inventario en la contabilidad.
3.  Restar el valor del producto en proceso (si aplica) al saldo de la cuenta general de inventario.
4.  Comparar el resultado con el saldo del inventario obtenido en el paso 1. Los valores deben ser iguales.

### ¿Qué debo hacer si las validaciones de cierre de ciclo de costos no se cumplen?
#### Respuesta
Si alguna de las validaciones recomendadas no se cumple, no debes avanzar con los cierres del mes siguiente. Debes revisar y corregir todo lo necesario para garantizar que las validaciones se cumplan antes de continuar.

### ¿Qué pasa si ignoro los problemas detectados durante el cierre de ciclo de costos de un mes y procedo con el cierre del mes siguiente?
#### Respuesta
Si ignoras los problemas detectados en un mes y procedes con el cierre del mes siguiente, el problema se incrementará. Los problemas de un mes se arrastran y se acumulan, haciendo más difícil la corrección posterior. Es crucial solucionar cualquier problema en el mes en que se detecta.

### ¿Qué es la operación de movimiento universal y cómo puede afectar el cierre de ciclo de costos?
#### Respuesta
La operación de movimiento universal es una función especial que permite mover el inventario sin afectar la contabilidad. Su uso puede causar problemas en el cierre del ciclo de costos, ya que este último mueve tanto el inventario como la contabilidad. Un uso incorrecto del movimiento universal puede generar inconsistencias y descuadres.

### ¿Qué cuidados debo tener con la operación de movimiento universal cuando trabajo con costos de producción?
#### Respuesta
Cuando trabajas con costos de producción, debes usar la operación de movimiento universal con mucho cuidado. Es importante asegurarse de afectar la contabilidad por medio de otra operación para compensar el movimiento en el inventario. También debes tener en cuenta el centro de costos y el productor del producto, para evitar descuadres.

### ¿Qué ocurre si saco un producto terminado del inventario por movimiento universal antes de hacer el cierre de ciclo de costos?
#### Respuesta
Si sacas un producto terminado del inventario por movimiento universal antes de realizar el cierre de ciclo de costos, se puede generar un costo sin cantidad en el inventario. El cierre de ciclo de costos no detectará la salida del producto (ya que el movimiento universal no afecta la contabilidad) y realizará un ajuste que resultará en un producto sin cantidad pero con costo asignado.

### ¿Qué pasa si uso la operación de movimiento universal con un producto terminado compuesto?
#### Respuesta
Si usas la operación de movimiento universal con un producto terminado compuesto, se pueden generar inconsistencias en el inventario. Cuando un producto compuesto se ingresa normalmente, el sistema consume las partes según la fórmula. Si se ingresa por movimiento universal, las partes no se consumen. De manera similar, si se saca un producto compuesto por movimiento universal, las partes no se devuelven al inventario cuando se desembodea.

---

# Cierre de ciclo de costos
[Ver el video](https://www.youtube.com/watch?v=oE864jiKQ54)
[oE864jiKQ54]

## Tema principal
Explicación del proceso de cierre de ciclo de costos en ContaPyme, incluyendo su funcionamiento, consideraciones y verificaciones necesarias.

## Resumen general
Este video explica el proceso de cierre de ciclo de costos, tanto para órdenes de producción como para líneas de producción, enfocándose en la importancia de registrar todos los costos y la producción antes de realizar el cierre. Se detalla el impacto contable del cierre, cómo afecta las cuentas de producto en proceso, producto terminado y costo de ventas.  Además, se incluye un ejercicio práctico manual para comprender mejor cómo el sistema realiza el cierre. Finalmente, se presentan las validaciones que se deben realizar antes y después del cierre de ciclo para garantizar la correcta gestión de los costos.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las dos condiciones necesarias para que una unidad productiva sea funcional en el contexto del cierre de ciclo de costos?
#### Respuesta
Las dos condiciones son:
1.  Tener costos acumulados relacionados con materias primas, mano de obra y costos indirectos cargados a la unidad productiva. No es obligatorio tener los tres tipos de costos, pero sí los que correspondan al modelo de negocio.
2.  Haber registrado el embodegamiento de producto terminado, que es el que finalmente va a asumir los costos que fueron imputados.

### ¿Cómo se inicia el ciclo de costos para una orden de producción y cuánto dura?
#### Respuesta
El ciclo de costos para una orden de producción inicia en el momento en que se crea la orden. La duración del ciclo depende del tiempo necesario para registrar la totalidad de los costos y la producción, pudiendo durar desde un mes hasta varios meses.

### ¿Cada cuánto tiempo se debe hacer un cierre de ciclo de costos en líneas de producción?
#### Respuesta
La frecuencia del cierre de ciclo de costos en líneas de producción depende de la frecuencia con la que se registran los costos y la producción. Si los costos y la producción se registran mensualmente, se pueden hacer cierres mensuales. Si se registran cada dos o tres meses, se debe esperar a tener la totalidad de la información registrada para hacer el cierre. Lo importante es tener la totalidad de los costos registrados y la totalidad de la producción registrada.

### ¿Qué revisa el cierre de ciclo de costos y qué acciones realiza?
#### Respuesta
El cierre de ciclo de costos revisa si la unidad productiva que se va a cerrar tiene costos en la cuenta siete (costos de producción). Si los tiene, hace una autoactivación. Luego, totaliza los costos de producción, totaliza los embodegamientos del periodo, calcula el costo real de producción, ajusta y cancela la cuenta de producto en proceso, hace los ajustes al producto terminado y, si ya se registraron ventas, ajusta el costo de ventas.

### ¿Qué implicaciones tiene no realizar la distribución de indirectos antes del cierre de ciclo de costos?
#### Respuesta
Si no se realiza la distribución de indirectos antes del cierre de ciclo de costos, la línea u orden quedará cerrada sin esos costos indirectos, ya que el cierre de ciclo de costos no valida que se haya realizado la distribución de indirectos.

### ¿Qué significa que la cuenta de producto en proceso (1410) deba quedar en cero después del cierre de ciclo de costos?
#### Respuesta
Significa que todos los costos asociados a la producción de esa unidad productiva han sido transferidos al producto terminado o al costo de ventas. Lo normal es que la cuenta 1410 quede en cero para esa unidad productiva.

### ¿Qué validaciones se deben realizar antes de hacer un cierre de ciclo de costos?
#### Respuesta
Antes de hacer el cierre de ciclo de costos, es necesario realizar las siguientes validaciones:

1.  **Todos los costos deben estar cargados:** Asegurarse de que todas las planillas de insumos, la nómina y los costos indirectos estén registrados.
2.  **Se deben tener todos los embodegamientos registrados:**  No se debe realizar el cierre si faltan embodegamientos por registrar.
3.  **Haber realizado el traslado entre centros de costos:** Haber realizado las acciones automáticas de fin de mes, incluyendo la distribución de indirectos.
4.  **Haber hecho un recosteo de inventarios:** Para calcular nuevamente los costos de los consumos de materia prima.
5.  **Verificar la secuencia de cierre entre líneas de producción:** Si lo que se consume es producido por otra línea, esa línea debe haber sido cerrada antes.

### ¿Qué cuenta se debe utilizar como alarma en el cierre de ciclo de costos y por qué?
#### Respuesta
Se debe utilizar la cuenta de pérdidas sugerida por el sistema (ej., 53 1095) como cuenta de alarma. Si al hacer el cierre, los costos se cargan a esta cuenta, significa que la línea u orden tiene un problema: o le faltan embodegamientos o le faltan costos de producción. No se debe reemplazar esta cuenta por una cuenta 61 (costo de ventas) para evitar perder la alerta sobre posibles problemas en la línea u orden.

### ¿Qué significa si al momento de hacer el cierre de ciclo de costos se cargan valores a la cuenta que el sistema sugiere de forma predeterminada?
#### Respuesta
Significa que esa línea o esa orden que se está cerrando tiene un problema. Puede ser que no tenga embodegamientos registrados o que no tenga costos imputados.

### ¿Qué no modifica el cierre de ciclo de costos?
#### Respuesta
El cierre de ciclo de costos NO modifica el costo de los embodegamientos ni el costo de las ventas ya registradas. En cambio, realiza un ajuste contable en las cuentas contables a la fecha del cierre.

### ¿Cuándo se refleja el ajuste contable realizado por el cierre de ciclo de costos?
#### Respuesta
El ajuste contable se refleja a nivel contable en el momento del cierre. Por ejemplo, si se realizó un embodegamiento el 5 y una venta el 8, y el cierre se hizo el 30, el ajuste se reflejará a nivel contable el 30, no se devolverá ni hará un ajuste al 5 ni a la fecha de la factura.

---

# Costos de maquinaria y equipo
[Ver el video](https://www.youtube.com/watch?v=tg9MuaZU-fs)
tg9MuaZU-fs

## Tema principal
Gestión de costos de maquinaria y equipo en ContaPyme.

## Resumen general
Este video explica cómo gestionar los costos de maquinaria y equipo en ContaPyme, integrándolos a los costos indirectos. Se aprende a configurar centros de costos específicos para estos activos, registrar el uso de la maquinaria mediante planillas, y distribuir los costos a las unidades productivas utilizando diferentes criterios, incluyendo el uso, la potencia y la capacidad instalada de los activos. El video también muestra cómo esta información se refleja en los informes de costos de producción.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es importante tener configurado el módulo de activos fijos antes de gestionar los costos de maquinaria y equipo?
#### Respuesta
Para costear la maquinaria y equipo, es esencial tener configurado el módulo de activos fijos, ya que se requiere un listado de todos los activos de la empresa (equipo de cómputo, maquinaria, vehículos, etc.) para poder seleccionar aquellos a los que se les va a llevar control de gastos y costos.

### ¿Qué tipo de activos son candidatos ideales para llevar un control detallado de gastos y costos?
#### Respuesta
Los activos que incurren en costos y gastos representativos más allá de la depreciación, como mantenimiento, repuestos, mano de obra y combustible, son candidatos ideales. Por ejemplo, un tractor John Deere sería un buen candidato, mientras que un computador Lenovo, cuyo principal costo es la depreciación, podría no justificar un manejo particular.

### ¿Cuál es el objetivo de llevar un control de gastos y costos de la maquinaria y equipo?
#### Respuesta
El objetivo es poder realizar análisis detallados de los costos y gastos asociados a cada activo. Esto permite tomar decisiones informadas, como determinar si es más económico alquilar un tractor en lugar de tener uno propio, o si es necesario reemplazar un activo que está generando demasiados gastos.

### ¿Cómo se deben manejar las guadañas dentro de la gestión de costos de maquinaria y equipo?
#### Respuesta
En lugar de crear un centro de costos para cada guadaña individual, se recomienda crear un único centro de costos llamado "Guadañas" que lleve el control de gastos y costos de todas las guadañas que tenga la empresa.

### ¿Qué tipo de centro de costos se debe crear para los activos a los que se les llevará control de gastos y costos?
#### Respuesta
Se debe crear un centro de costos indirecto específico para cada activo, utilizando la clase especial de "centros de costos de maquinaria y equipo." En este centro de costos se acumularán todos los costos y gastos asociados al activo (mantenimiento, combustible, mano de obra, repuestos y depreciación).

### ¿Cómo se configura el activo fijo para que la depreciación se vaya al centro de costos de maquinaria y equipo?
#### Respuesta
Una vez creado el centro de costos para el activo, debes ir a la configuración del activo en el sistema y especificar que la depreciación se registre en ese centro de costos. Generalmente, esto se configura en la pestaña de "adicionales" del activo.

### ¿Cómo se distribuyen los costos acumulados en los centros de costos de maquinaria y equipo?
#### Respuesta
Los costos acumulados en los centros de costos de maquinaria y equipo se distribuyen a las unidades productivas a través de un distribuidor, de manera similar a como se distribuyen los costos indirectos. La distribución se puede realizar utilizando diversos criterios, como área, población, partes iguales, producción, ventas, o el uso de los activos.

### ¿Qué es una planilla de uso de activos y cuándo es útil utilizarla?
#### Respuesta
Una planilla de uso de activos es un registro que indica en qué centro de costos (línea de producción, orden de producción, cultivo) se utilizó cada activo y cuántas horas se utilizó. Esta planilla es útil cuando se desea distribuir los costos de maquinaria y equipo en función del uso real de los activos.

### ¿Cómo se crea un centro de costos de maquinaria y equipo en ContaPyme?
#### Respuesta
Para crear un centro de costos de maquinaria y equipo, sigue estos pasos:

1.  Ingresa al **Explorador Gráfico**.
2.  Busca el agrupador llamado "Maquinaria y Equipo".
3.  Haz clic derecho sobre el agrupador y selecciona la opción **Crear Centros de Costos**.
4.  Selecciona la opción **Centro de Costos de Maquinaria y Equipo**.
5.  Ingresa el código y el nombre del centro de costos.
6.  Opcionalmente, puedes cambiar el icono y configurar otros parámetros como área, potencia, clasificadores, distribución y vigencia.
7.  Haz clic en **Aceptar** para guardar el centro de costos.

### ¿Cómo se configura un activo fijo para que la depreciación se asigne al centro de costos de maquinaria y equipo correspondiente?
#### Respuesta
Para configurar un activo fijo, sigue estos pasos:

1.  Ingresa al módulo de **Activos Fijos**.
2.  Busca y selecciona el activo que deseas configurar.
3.  Edita el activo.
4.  Ve a la pestaña **Adicionales**.
5.  En el campo **Centro de Costos**, selecciona el centro de costos de maquinaria y equipo que corresponde a ese activo.
6.  Guarda los cambios.

### ¿Cómo se crea un distribuidor por uso de maquinaria y equipo en ContaPyme?
#### Respuesta
Para crear un distribuidor por uso de maquinaria y equipo, sigue estos pasos:

1.  Ingresa al módulo de **Contabilidad**.
2.  Ve a la sección de **Distribuidores**.
3.  Crea un nuevo distribuidor (Distribuidor por Criterio).
4.  En el campo **Alcance**, selecciona la opción "Lista de Centros de Costos" e indica las líneas de producción a las cuales se va a distribuir el costo.
5.  En el campo **Criterio**, selecciona la opción "Por Uso de Maquinaria y Equipo".
6.  Selecciona si la distribución se hará "Según un Activo", "Según un Clasificador de Activo" o "Según un Activo o Clasificador definido en el Centro de Costos de Maquinaria y Equipo".
7.  Indica si el cálculo se hará basándose solo en las horas de uso o en las horas de uso por la potencia.
8.  Configura el período de evaluación y qué hacer si no hay peso.
9.  Guarda el distribuidor.

### ¿Cómo se configura el centro de costos de maquinaria y equipo para que utilice el distribuidor creado?
#### Respuesta
Para configurar el centro de costos, sigue estos pasos:

1.  Ingresa al **Explorador Gráfico**.
2.  Busca y selecciona el centro de costos de maquinaria y equipo que deseas configurar.
3.  Modifica el centro de costos.
4.  En la pestaña **Distribución**, activa la distribución.
5.  En el campo **Traslado**, selecciona el distribuidor creado en el paso anterior.
6.  Indica que se trasladen los movimientos desde la última distribución.
7.  Indica el porcentaje a trasladar (generalmente el 100%).
8.  Guarda los cambios.

### ¿Cómo se registra una planilla de uso de maquinaria y equipo en ContaPyme?
#### Respuesta
Para registrar una planilla de uso de maquinaria y equipo, sigue estos pasos:

1.  Ingresa al módulo de **Activos Fijos**.
2.  Ve a la opción **Planilla de Uso de Maquinaria y Equipo**.
3.  Crea una nueva planilla.
4.  Indica la fecha de la planilla.
5.  Para cada uso, indica el centro de costos (línea de producción, orden de producción, cultivo) en el que se utilizó el activo.
6.  Selecciona el activo utilizado.
7.  Indica la cantidad de horas de uso.
8.  Guarda la planilla.

### ¿Cómo se ejecutan las acciones automáticas de fin de mes para distribuir los costos de maquinaria y equipo?
#### Respuesta
Para ejecutar las acciones automáticas de fin de mes y distribuir los costos, sigue estos pasos:

1.  Ingresa al módulo de **Contabilidad**.
2.  Ve a la opción **Acciones Automáticas de Fin de Mes**.
3.  Selecciona solo la opción de **Traslado**.
4.  Ejecuta el proceso.

### ¿Cómo se verifica el movimiento de uso de un activo después de registrar la planilla de uso de maquinaria y equipo?
#### Respuesta
El movimiento de uso de un activo se verifica en el **Explorador de Movimiento de Empresas**, no en el módulo de activos fijos.

### ¿Cómo se distribuyen los costos de maquinaria y equipo según el clasificador del activo?
#### Respuesta
En el distribuidor, en lugar de seleccionar un activo específico, selecciona la opción "Según clasificador del activo".  Previamente, debes haber asignado un clasificador a los activos (fileteadora, cortadora, etc.) en el módulo de Activos Fijos.

### ¿Qué diferencia hay entre configurar el activo o clasificador en el distribuidor versus configurarlo en el centro de costos de maquinaria y equipo?
#### Respuesta
- **En el Distribuidor:** El distribuidor se vuelve muy específico, sirviendo casi exclusivamente para la fileteadora o los activos con un clasificador.
- **En el Centro de Costos:** Se puede usar un único distribuidor para varios centros de costos de maquinaria y equipo, ya que el dato específico (activo o clasificador) se define a nivel del centro de costos. Es más flexible para gestionar múltiples activos.

### ¿Cómo se distribuyen los costos de maquinaria y equipo considerando la potencia del activo?
#### Respuesta
1.  Asegúrate de que cada activo tenga configurada su potencia en la descripción dentro del módulo de Activos Fijos.
2.  Al configurar el distribuidor, selecciona la opción "Según horas por potencia de uso del activo".
3.  ContaPyme multiplicará las horas de uso registradas en la planilla por la potencia del activo para calcular la distribución.

### ¿Cómo funciona la distribución de costos considerando la capacidad instalada del activo?
#### Respuesta
1.  En el centro de costos de maquinaria y equipo, en la pestaña de **Traslado**, configura la capacidad instalada del mes en horas.
2.  ContaPyme calculará el porcentaje de uso real del activo (horas de uso registradas en la planilla / capacidad instalada).
3.  Distribuirá los costos solo según ese porcentaje. Si el activo no se utiliza a su máxima capacidad, parte de los costos se quedarán en el centro de costos sin distribuir.

### ¿Dónde se configura la capacidad instalada del activo?
#### Respuesta
La capacidad instalada se configura en el centro de costos de maquinaria y equipo, en la pestaña de **Traslado**.

---

# Costos indirectos
[Ver el video](https://www.youtube.com/watch?v=ELyE5V06o4E)
ELyE5V06o4E

## Tema principal
Configuración y manejo de costos indirectos en ContaPyme.

## Resumen general
Este video explica cómo trabajar con costos indirectos en ContaPyme, diferenciando entre costos directos e indirectos y los modelos de costos parciales y totales. Se detalla cómo crear centros de costos indirectos, configurar distribuidores y realizar la distribución de los costos a las unidades productivas. Además, se muestra cómo definir el alcance y el criterio de distribución para cada costo indirecto y cómo configurar las cuentas contables correspondientes. Se aprende a realizar la distribución a final de mes y a solucionar problemas comunes que pueden surgir durante el proceso.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los costos directos y cuáles son ejemplos comunes?
#### Respuesta
Los costos directos son aquellos que se pueden identificar claramente con la unidad productiva o con el producto que los consume. Los dos principales ejemplos son los insumos y la materia prima, y la mano de obra.

### ¿Qué son los costos indirectos y cómo se diferencian de los costos directos?
#### Respuesta
Los costos indirectos son aquellos que, por su naturaleza o forma de aplicación, no se pueden identificar directamente con ninguna unidad productiva en particular. Un ejemplo es la nómina del jefe de planta, que supervisa todas las líneas de producción.

### ¿Cuáles son los dos modelos de costos que existen y en qué se diferencian?
#### Respuesta
Existen dos modelos de costos:
- **Costos Parciales:** Solo tienen en cuenta los costos directos, llevando los indirectos al gasto.
- **Costos Totales:** Tienen en cuenta tanto los costos directos como los indirectos.

### ¿Cuándo es recomendable utilizar el modelo de costos parciales y cuándo el modelo de costos totales?
#### Respuesta
- **Costos Parciales:** Se recomienda cuando los costos indirectos no son muy representativos en el costo total.
- **Costos Totales:** Se recomienda cuando los costos indirectos son muy representativos y pueden hacer la diferencia en el costo final del producto.

### ¿Qué se debe hacer con los costos indirectos que no se pueden cargar directamente a las unidades productivas?
#### Respuesta
Se debe crear un centro de costos donde se acumulará el costo indirecto y luego se configurará un distribuidor o un concepto de distribución para llevarlo a las unidades productivas o a los productos.

### ¿Cuáles son los métodos de costos totales que existen?
#### Respuesta
Existen diferentes métodos de costos totales:
- Costos por Absorción.
- Método de Secciones Homogéneas.
- Costos ABC.

### ¿Con qué método de costos totales se va a trabajar en ContaPyme o Agrowin?
#### Respuesta
En el caso de ContaPyme o Agrowin se trabajará con el método de costos por absorción.

### ¿Qué dos variables se deben definir para todo costo indirecto?
#### Respuesta
Se deben definir dos variables:
- **Alcance:** Los centros de costos sobre los que se va a distribuir el costo indirecto.
- **Criterio:** La variable que se va a evaluar para hacer la distribución.

### ¿Qué ejemplos de criterios se pueden evaluar para distribuir los costos indirectos?
#### Respuesta
Se pueden evaluar criterios como:
- Producción.
- Costo de los insumos.
- Área (en un cultivo).
- Ventas.
- Partes iguales.

### ¿Qué proceso se debe seguir para trabajar con los costos indirectos en ContaPyme?
#### Respuesta
El proceso a seguir es:
1.  **Definir el listado de costos indirectos.**
2.  **Definir el alcance y el criterio** para cada costo indirecto.
3.  **Crear una cuenta en la 73** por cada uno de los costos indirectos (opcional, pero recomendado).
4.  **Crear los centros de costos indirectos.**
5.  **Programar la distribución** a través de los distribuidores de costos.

### ¿Qué tipos de distribuidores de costos existen?
#### Respuesta
Existen diferentes tipos de distribuidores de costos:
- Distribuidores por peso.
- Distribuidores por criterio.
- Distribuidores avanzados.

### ¿Cómo se configura un distribuidor por criterio en ContaPyme para distribuir costos indirectos por partes iguales entre las líneas de producción?
#### Respuesta
Para configurar un distribuidor por criterio, siga estos pasos:

1.  **Vaya a "Explorador".**
2.  **Ubique el "Agrupador de Indirectos".**
3.  **Cree un nuevo distribuidor por criterio:** Asigne un número y nombre descriptivo (ej: "Distribuidor por partes iguales").
4.  **Defina el "Alcance":** Seleccione el agrupador de las líneas de producción.
5.  **Defina el "Criterio":** Seleccione "Por partes iguales".
6.  **Indique qué hacer si no se puede hacer la distribución:** Se recomienda dejar los costos pendientes para la siguiente distribución.
7.  **Acepte para guardar la configuración.**

### ¿Cómo se activa la distribución para un costo indirecto y se relaciona con un distribuidor específico?
#### Respuesta
Para activar la distribución y relacionarla con un distribuidor, siga estos pasos:

1.  **Vaya al costo indirecto** dentro del "Agrupador de Indirectos".
2.  **Seleccione "Modificar".**
3.  **En la pestaña "Costos Empresariales", active la "Distribución".**
4.  **En la pestaña "Traslado de valores entre centros de costos", configure lo siguiente:**
    - **Distribuidor:** Seleccione el distribuidor que va a utilizar.
    - **Saldo a distribuir:** Seleccione "Movimientos desde la última distribución" o "Movimientos del mes" (si la distribución es mensual, cualquiera de los dos sirve).
    - **Porcentaje a trasladar:** Indique el porcentaje que se va a trasladar (100% si se usa un único distribuidor).
5.  **Acepte para guardar la configuración.**

### ¿Cómo se crea un distribuidor por peso y cómo se configura?
#### Respuesta
Para crear un distribuidor por peso, siga estos pasos:

1.  **Vaya a "Explorador".**
2.  **Ubique el "Agrupador de Indirectos".**
3.  **Cree un nuevo distribuidor por peso:** Asigne un número y nombre descriptivo (ej: "Distribuidor camisas 60% pantalones 40%").
4.  **Detalle los centros de costos:** Especifique cada centro de costo al que se va a distribuir (ej: "Camisas" y "Pantalones").
5.  **Indique el peso de distribución** para cada centro de costo (ej: 60 para camisas y 40 para pantalones).
6.  **Acepte para guardar la configuración.**

### ¿Cómo se realiza una prueba de distribución para verificar que la configuración es correcta?
#### Respuesta
Para realizar una prueba de distribución, siga estos pasos:

1.  **Ubíquese en la empresa** dentro del "Explorador".
2.  **Seleccione "Probar Distribución".**
3.  **Seleccione "Probar Centro de Costos Programado".**
4.  **Seleccione el centro de costos indirecto** que desea probar.
5.  **Ingrese el valor** que desea distribuir.
6.  **Seleccione "Generar Distribución"** para ver el resultado.

### ¿Cómo se cargan costos a los centros de costos indirectos?
#### Respuesta
Para cargar costos a los centros de costos indirectos, siga estos pasos:

1.  **Ingrese al "Manejador de Operaciones".**
2.  **Cree una nueva operación.**
3.  **Seleccione la cuenta contable** correspondiente al costo (ej: servicios de acueducto y alcantarillado).
4.  **Ingrese el valor** del costo.
5.  **Seleccione el centro de costos indirecto** al que se va a cargar el costo (ej: servicios públicos).
6.  **Finalice la operación.**

### ¿Cómo se realiza la distribución de costos a final de mes?
#### Respuesta
Para realizar la distribución de costos a final de mes, siga estos pasos:

1.  **Ingrese al "Manejador de Operaciones".**
2.  **Cree una nueva operación de "Acciones Automáticas de Fin de Mes".**
3.  **Active la opción "Traslados" y "Autoactivación".**
4.  **Dé "Siguiente" y luego "Finalizar".**

### ¿Qué es la cuenta destino y cuándo se utiliza?
#### Respuesta
La cuenta destino se utiliza para convertir una cuenta 51 (gastos) a una cuenta 73 (costos de producción) al momento de hacer la distribución. Se utiliza cuando la empresa registra inicialmente los costos indirectos en una cuenta de gastos (51) y luego desea llevarlos a las unidades productivas como costos de producción (73).

### ¿Qué se debe hacer si no se quiere convertir de una cuenta cinco a una siete?
#### Respuesta
Si no se quiere convertir de una cuenta cinco a una siete, desde el principio se debe cargar el costo indirecto en una cuenta 73. En este caso, se deben crear cuentas auxiliares en la 73 para cada tipo de costo indirecto (ej: 730101 para acueducto y alcantarillado, 730102 para energía eléctrica, etc.).

### ¿Para qué sirve el paso de traslado de valores entre centros de costos en las acciones automáticas de fin de mes?
#### Respuesta
Este paso permite trasladar la totalidad de lo que se tiene en un centro de costos y llevarlo a otro de forma manual, sin necesidad de configurar un distribuidor. Es útil para trasladar valores monetarios específicamente, no para unidades productivas.

### ¿Cómo se pueden distribuir los costos indirectos según diferentes cuentas contables utilizando cuenta inicial y final en el distribuidor?
#### Respuesta
Se pueden utilizar las columnas "Cuenta Inicial" y "Cuenta Final" en la configuración del distribuidor para especificar qué rango de cuentas se va a distribuir con un distribuidor específico. Por ejemplo, se puede decir que los valores que lleguen por la cuenta 71 se distribuyan con un distribuidor y los que lleguen por la cuenta 72 se distribuyan con otro.

### ¿Qué sucede si un centro de costos acumula saldos en cuentas diferentes a la siete y se quiere distribuir solo lo que hay en la cuenta siete?
#### Respuesta
En la configuración del centro de costos, se puede especificar que solo se distribuya lo que está en la cuenta siete, indicando en la cuenta inicial 7 y en la cuenta final 799999. De esta manera, el sistema omitirá los saldos que estén en otras cuentas al momento de hacer la distribución.

### ¿Qué proceso se debe realizar antes de hacer los traslados entre centros de costos en ContaPyme?
#### Respuesta
Para poder hacer los traslados, el sistema exige que se haya realizado el proceso de recosteo.

---

# Cultivos perennes - Parte 1
[Ver el video](https://www.youtube.com/watch?v=vVPQ9m0IATY)
[vVPQ9m0IATY]

## Tema principal
Explicación de la etapa de desarrollo de los cultivos perennes en ContaPyme y su activación.

## Resumen general
Este video explica las diferencias entre cultivos perennes y transitorios, enfocándose en la etapa de desarrollo de los cultivos perennes dentro de ContaPyme. Se describe cómo los costos imputados durante esta etapa se manejan contablemente de manera diferente a los costos de producción, acumulándose en una cuenta de activo (1564 para contabilización local y 1830 para NIIF). Además, se detalla el proceso de activación del cultivo, que convierte los costos acumulados en un activo amortizable, afectando la etapa de producción. Se aprende a crear lotes y cultivos en Agrowin, registrar costos en la etapa de desarrollo y activar el cultivo para iniciar la etapa de producción.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los dos tipos de cultivos que existen en el tema agrícola?
#### Respuesta
Existen dos tipos de cultivos: los cultivos perennes y los cultivos transitorios.

### ¿Qué significa que un cultivo sea perenne?
#### Respuesta
La palabra perenne significa que el cultivo dura largamente, generalmente más de dos años, tiene varias cosechas, una etapa de desarrollo y una etapa de producción.

### ¿Cuándo inicia el ciclo de un cultivo perenne?
#### Respuesta
El ciclo de un cultivo perenne inicia desde el momento en el que se crea el cultivo en el sistema. Por defecto, al crearse, el cultivo inicia en la etapa de desarrollo.

### ¿Qué tipos de costos se cargan durante la etapa de desarrollo de un cultivo perenne?
#### Respuesta
Durante la etapa de desarrollo, se cargan costos de materia prima (insumos), costos de mano de obra y costos indirectos.

### ¿Hasta cuándo dura la etapa de desarrollo de un cultivo perenne?
#### Respuesta
La etapa de desarrollo de un cultivo perenne dura hasta que se realiza la activación del cultivo. En ese momento, se sube el cultivo a la etapa de producción.

### ¿Cómo funciona la etapa de producción de un cultivo perenne?
#### Respuesta
La etapa de producción de un cultivo perenne funciona por ciclos, similar a una línea de producción. A partir de la activación del cultivo, inicia el primer ciclo. Cuando se presenta la primera cosecha y se han imputado todos los costos, se realiza el primer cierre de ciclo de costos. Automáticamente inicia el segundo ciclo y así sucesivamente.

### ¿Cuándo se cierra un ciclo de costos en la etapa de producción de un cultivo perenne?
#### Respuesta
Un ciclo de costos se cierra cuando la cosecha se ha registrado en su totalidad. En ese momento, se procede a realizar el cierre e inmediatamente inicia el siguiente ciclo.

### ¿Cómo se imputan los costos en la etapa de desarrollo de un cultivo perenne?
#### Respuesta
Los costos se imputan utilizando las cuentas 71 (insumos), 72 (mano de obra) y 73 (costos indirectos).

### ¿Cómo se reflejan contablemente los costos imputados en la etapa de desarrollo, a pesar de ser imputados por la cuenta siete?
#### Respuesta
Contablemente, los costos no se reflejan en la cuenta siete, sino en una cuenta del activo: la 1564 para contabilización local y la 1830 para contabilización NIIF. Esto se debe a que los costos de desarrollo se consideran una inversión.

### ¿Qué sucede cuando se realiza la activación de un cultivo perenne?
#### Respuesta
Cuando se activa un cultivo, la totalidad de los costos de desarrollo acumulados en la cuenta 1564 o 1830 se convierten en un activo que se amortiza mensualmente durante la etapa de producción. La etapa de producción asume los costos de desarrollo del cultivo a través de esta amortización.

### ¿Por qué se convierte la totalidad de los costos de desarrollo en un activo al activar el cultivo?
#### Respuesta
Se convierte en un activo para que se amortice mensualmente sobre toda la etapa de producción. La etapa de producción debe asumir los costos de desarrollo del cultivo.

### ¿Dónde se puede ver el valor por el que se activó el cultivo, la depreciación y demás información del activo?
#### Respuesta
Se puede ver en el catálogo de activos. El activo funciona exactamente igual que cualquier otro activo dentro del sistema.

### ¿Por qué es importante entender las dos etapas del cultivo perenne (desarrollo y producción)?
#### Respuesta
Es crucial entender que las dos etapas funcionan de forma diferente. Si el cultivo ya está en producción, se debe activar para que el sistema no asuma que los costos son de desarrollo, que tienen un funcionamiento contable diferente. Es importante para no confundirse a nivel del efecto contable que tienen las transacciones dependiendo de la etapa en la que se realicen.

### ¿Cómo se crea un lote agrícola en Agrowin?
#### Respuesta
Para crear un lote agrícola, sigue estos pasos:

1.  Ubícate en el agrupador de lotes agrícolas dentro del explorador gráfico.
2.  Haz clic derecho y selecciona **Crear centros de costos > Crear lote agrícola**.
3.  Ingresa el código y el nombre del lote (ej: L2, Lote Rosales 2).
4.  Selecciona la actividad del lote.
5.  Opcionalmente, carga una foto del lote e ingresa el área en hectáreas.
6.  Completa la información técnica del lote (material parental, pendiente, textura de suelo, topografía, etc.) si la tienes disponible.
7.  Haz clic en **Aceptar**.

### ¿Cómo se crea un cultivo perenne dentro de un lote en Agrowin?
#### Respuesta
Para crear un cultivo perenne dentro de un lote, sigue estos pasos:

1.  Ubícate en el lote donde deseas crear el cultivo.
2.  Haz clic derecho y selecciona **Crear centro de costo > Cultivos perennes**.
3.  Ingresa el código y el nombre del cultivo.
4.  Verifica que la actividad agrícola sea la misma del lote.
5.  Ingresa el área y la población del cultivo (número de plantas o árboles).
6.  Selecciona la variedad y la procedencia del cultivo.
7.  Ingresa la fecha de inicio del ciclo de costos actual (fecha de inicio de la etapa de desarrollo).
8.  Selecciona la cuenta de cultivos en desarrollo local, que debe tener una cuenta equivalente en NIIF.
9.  Selecciona los clasificadores y el grupo.
10. Haz clic en **Aceptar**.

### ¿Qué significan las letras "Per" y "D" que aparecen junto al nombre del cultivo perenne creado?
#### Respuesta
"Per" significa que el cultivo es perenne y la letra "D" indica que está en etapa de desarrollo.

### ¿Qué se debe hacer si al crear el cultivo perenne este ya está en producción?
#### Respuesta
Si el cultivo ya está en producción, se debe crear e inmediatamente activarlo para que inicie su etapa de producción.

### ¿Cómo se verifica la cuenta de egresos de un insumo antes de procesar una planilla de consumo?
#### Respuesta
Para verificar la cuenta de egresos de un insumo:
1. Ve a **Elemento de inventario**
2. Ubica el insumo específico
3. Verifica el grupo al que pertenece (ej: fertilizantes edáficos)
4. Verifica la cuenta de egreso asociada a ese grupo (ej: 711035)

### ¿Cómo se puede discriminar cuánto fue de mano de obra, cuánto fue de materia prima (insumos) y cuántos fueron los indirectos en la etapa de desarrollo?
#### Respuesta
Aunque contablemente todo se vaya a la misma cuenta (1564 o 1830), al consultar un informe a nivel del cultivo, se puede ver discriminado por la cuenta siete en la que inicialmente debería haberse registrado. Para esto, se debe solicitar un informe de costos de desarrollo desde el cultivo.

### ¿Dónde se encuentra el informe de costos de desarrollo?
#### Respuesta
Para acceder al informe de costos de desarrollo, ubícate en el cultivo y selecciona la opción de informe de costos de desarrollo. Recuerda que si el cultivo está en desarrollo, debes solicitar un informe de costos de desarrollo; si pides un informe de costos de producción, saldrá vacío.

### ¿Qué información muestra el informe de costos de desarrollo?
#### Respuesta
Muestra los costos de desarrollo que se han cargado al cultivo, discriminados por la cuenta siete. Muestra el resumen de planillas de labores de mano de obra y las planillas de insumos y materiales.

### ¿Qué muestra un informe de mayor y balances de un cultivo en etapa de desarrollo?
#### Respuesta
Muestra todo reflejado en la cuenta 1830 en NIIF o 1564 para local.

### ¿En qué momento se realiza la activación de un cultivo perenne?
#### Respuesta
La activación se realiza cuando el cultivo está próximo a empezar la cosecha, no cuando ya comenzó. Algunos cultivos tienen procesos biológicos que indican la proximidad de la cosecha, como la floración en el café. También puede ser un cambio de fertilizante a uno propio para la producción.

### ¿Dónde se encuentra la operación para activar un cultivo perenne en desarrollo?
#### Respuesta
La operación para activar un cultivo perenne se encuentra en los asistentes de cultivos, dentro de los **Asistentes de cultivos > Activación de un cultivo perenne en desarrollo**.

### ¿Qué información se debe ingresar al activar un cultivo perenne?
#### Respuesta
Debes ingresar:

1.  La fecha de activación. A partir de esta fecha, iniciará la etapa de producción.
2.  Seleccionar el cultivo a activar.
3.  El sistema crea un nuevo activo, generalmente con el mismo código. Se puede agregar más información en el nombre para evitar confusiones.
4.  Indicar el centro de costos al que se cargará la depreciación (idealmente, el mismo centro de costos, pero en etapa de producción).
5.  Verificar el grupo de activo (156430) tanto en contabilización NIIF como en local.
6.  Indicar la fecha de inicio de la depreciación y los meses estimados de vida útil (dependiendo de la duración de la etapa de producción).

### ¿Cómo se determina la vida útil del activo creado al activar el cultivo?
#### Respuesta
La vida útil del activo depende de la duración de la etapa de producción. Si la etapa de producción dura 10 años, serían 120 meses. Si dura 5 años, serían 60 meses. Esta información la proporciona el agrónomo. Se puede ajustar la vida útil según la conveniencia, para que las primeras cosechas asuman la totalidad de los costos de desarrollo, o amortizar en un período más corto.

### ¿Qué sucede contablemente al activar el cultivo?
#### Respuesta
Los costos se mueven de la cuenta de cultivos en desarrollo (1564 o 1830) a la cuenta de plantaciones agrícolas amortizables. Adicionalmente, se crea un activo en el módulo de activos.

### ¿Cómo se realiza la depreciación o amortización del activo creado al activar el cultivo?
#### Respuesta
Se realiza al final de cada mes, a través del proceso de depreciaciones y amortizaciones del sistema.

### ¿Cómo cambia el icono del cultivo en el explorador gráfico después de la activación?
#### Respuesta
El icono cambia de una plantita a un grano de café (en el ejemplo) y la letra "D" (desarrollo) cambia a "P" (producción).

### ¿Qué tipos de informes se pueden sacar después de activar el cultivo?
#### Respuesta
Después de la activación, se pueden sacar dos tipos de informes: el informe de costos de desarrollo (para ver los costos hasta la fecha de activación) y el informe de costos de producción (que inicialmente estará vacío hasta que se registren los costos de producción).

### ¿Cuándo se puede solicitar el informe de costos de producción de un cultivo?
#### Respuesta
Se puede solicitar un día después de la activación del cultivo.

---

# Cultivos perennes - Parte 2
[Ver el video](https://www.youtube.com/watch?v=BWDyK1508zE)
[BWDyK1508zE]

## Tema principal
Manejo de la etapa de producción de cultivos perennes en ContaPyme, incluyendo el cierre de ciclos de costos, la soca y la erradicación.

## Resumen general
Este video explica cómo manejar la etapa de producción de cultivos perennes en ContaPyme. Se detalla el proceso de imputación de costos, el registro de cosechas y embodegamientos, y el cierre de ciclos de costos.  Además, se explican y demuestran los procedimientos para realizar la soca (renovación del cultivo) y la erradicación (eliminación del cultivo) dentro del sistema, resaltando las diferencias contables y operativas entre ambos procesos. Se aprende a interpretar los informes de costos de producción y a utilizar las herramientas de ContaPyme para una gestión eficiente de los cultivos perennes.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las etapas de un cultivo perenne y cómo se diferencian?
#### Respuesta
Los cultivos perennes tienen dos etapas principales:

1.  **Etapa de desarrollo:** Esta etapa finaliza con la activación del cultivo, marcando el inicio de la etapa de producción.
2.  **Etapa de producción:** Se maneja por ciclos de costos, similar a una línea de producción, e inicia a partir de la activación del cultivo.

### ¿Cómo se maneja la etapa de producción de un cultivo perenne?
#### Respuesta
La etapa de producción se maneja por ciclos de costos. Durante cada ciclo se registran:

1.  Costos de **insumos**.
2.  Costos de **mano de obra**.
3.  Costos **indirectos**.

Este registro se realiza hasta la primera cosecha. Después de la cosecha y el embodegamiento, se realiza el cierre del ciclo de costos. Este proceso se repite en cada ciclo posterior hasta que se realiza una soca o erradicación del cultivo.

### ¿Cuándo se debe realizar el cierre de ciclo de costos en la etapa de producción?
#### Respuesta
El cierre de ciclo de costos se debe realizar una vez que se haya garantizado que:

1.  Se registró la **totalidad de la cosecha**.
2.  Se registraron la **totalidad de los costos** correspondientes a ese ciclo.

### ¿Qué sucede si se realiza el cierre de ciclo de costos antes de registrar todos los costos o la cosecha?
#### Respuesta
Si se realiza el cierre de ciclo de costos antes de registrar la totalidad de la cosecha o los costos, los elementos faltantes se registrarán en el ciclo siguiente, lo que puede distorsionar los costos de cada ciclo.

### ¿Cómo se realiza el cierre de ciclo de costos en Agrowin?
#### Respuesta
El cierre de ciclo de costos se realiza de manera similar al cierre de las líneas de producción en Agrowin, utilizando una operación específica de cierre de ciclo de costos.

### ¿Qué implicaciones tiene no realizar el cierre de ciclo de costos después de cada cosecha?
#### Respuesta
Si no se realiza el cierre de ciclo de costos después de cada cosecha, el ciclo se alarga y puede terminar asumiendo costos y producción de varias cosechas, lo que dificulta el análisis preciso de la rentabilidad de cada ciclo.

### ¿Qué significa que un cultivo esté en etapa de desarrollo o producción en Agrowin?
#### Respuesta
En Agrowin, la etapa del cultivo se identifica visualmente y con una letra:

*   **D:** Indica que el cultivo está en etapa de desarrollo.
*   **P:** Indica que el cultivo está en etapa de producción.

### ¿Cómo se imputan los costos en la etapa de producción en Agrowin?
#### Respuesta
Las imputaciones de costos en la etapa de producción se realizan de la misma manera que en la etapa de desarrollo. La diferencia es que el sistema identifica automáticamente la etapa en la que se encuentra el cultivo y aplica los registros contables correspondientes.

### ¿Cómo se puede verificar el efecto de las transacciones en Agrowin durante la etapa de producción?
#### Respuesta
Después de procesar una planilla de consumo de insumos o labores, se puede verificar el efecto contable consultando el informe de costos de producción.  Se accede a este informe desde el menú principal de Agrowin.

### ¿Dónde se encuentra el informe de costos de producción en Agrowin?
#### Respuesta
El informe de costos de producción está disponible una vez que el cultivo está en etapa de producción. También se puede consultar el informe de costos de desarrollo, si es necesario.

### ¿Cómo interpreta Agrowin las labores de producción al registrar planillas de labores?
#### Respuesta
Si se registra una labor marcada como "labor de producción" en una planilla de labores, el sistema registra la cantidad de producto cosechado. Este registro de producción es independiente del registro de embodegamiento.

### ¿Cuál es la diferencia entre el registro de producción y el embodegamiento en Agrowin?
#### Respuesta
*   El **registro de producción** se realiza al registrar planillas de labores marcadas como labores de producción y proporciona una estimación de la cantidad cosechada.
*   El **embodegamiento** es el registro de entrada del producto terminado a la bodega y es el dato fundamental para costear.

### ¿Por qué es importante registrar tanto la producción como el embodegamiento?
#### Respuesta
Registrar tanto la producción como el embodegamiento permite comparar ambos datos y detectar posibles mermas o diferencias entre la cantidad cosechada y la cantidad que realmente ingresa a la bodega. Esto ayuda a identificar posibles problemas en el proceso productivo.

### ¿Cómo afectan las acciones automáticas de fin de mes a los costos del cultivo en Agrowin?
#### Respuesta
Las acciones automáticas de fin de mes, como la depreciación y la autoactivación de cuentas, cargan los costos de amortización de la etapa de desarrollo y discriminan los costos en las cuentas correspondientes.

### ¿Cuál es el dato verdaderamente relevante para costear en Agrowin cuando se trata de cultivos perennes?
#### Respuesta
Aunque el dato de producción es relevante para comparar con el embodegamiento, el dato verdaderamente relevante para costear es el embodegamiento, ya que es el que representa la entrada del producto terminado a la bodega.

### ¿Qué es el soqueo y qué hace en Agrowin?
#### Respuesta
La soca es la renovación de un cultivo perenne mediante el corte del tronco o tallos, dejando una parte para estimular el crecimiento. En Agrowin, la soca realiza las siguientes acciones:

1.  **Cierra el ciclo de costos** productivo actual.
2.  **Da de baja el activo** donde se acumulan los costos de desarrollo.
3.  Vuelve a poner el cultivo en **etapa de desarrollo**.

### ¿Qué es la erradicación y qué hace en Agrowin?
#### Respuesta
La erradicación es la eliminación completa de la plantación, incluyendo las raíces. En Agrowin, la erradicación realiza las siguientes acciones:

1.  **Da de baja el activo** donde se acumulan los costos de desarrollo.
2.  Finaliza la **vigencia del cultivo**, dejándolo inactivo.
3.  **NO** vuelve a poner el cultivo en etapa de desarrollo.
4.  **NO** hace cierre de ciclo de costos.

### ¿Cuál es la diferencia entre soca y erradicación en Agrowin?
#### Respuesta
La principal diferencia es que la **soca** renueva el cultivo y lo devuelve a la etapa de desarrollo, mientras que la **erradicación** elimina el cultivo por completo, requiriendo la creación de un nuevo cultivo si se desea volver a sembrar. Adicionalmente la soca hace cierre de ciclo de costos y la erradicación NO.

### ¿Cómo se realizan las operaciones de soca y erradicación en Agrowin?
#### Respuesta
Ambas operaciones se realizan desde el menú de **Asistentes de cultivos** en Agrowin, utilizando la opción "Soca o erradicación de un cultivo perenne". Se debe seleccionar la fecha, el cultivo y el tipo de operación (soca o erradicación).

### ¿Qué sucede con los costos acumulados de desarrollo al realizar una soca o erradicación?
#### Respuesta
Tanto en la soca como en la erradicación, los costos de desarrollo acumulados en el activo se dan de baja y se envían a una cuenta de pérdidas, que por defecto es la 531030.

### ¿Por qué es importante realizar el cierre de mes antes de erradicar un cultivo?
#### Respuesta
Es importante realizar el cierre de mes antes de erradicar un cultivo para asegurar que todos los costos pendientes se registren correctamente, incluyendo la amortización de los costos de desarrollo y la activación de cuentas. Si hay costos en el ciclo sin embodegamientos, el sistema los enviará a la cuenta de pérdidas (531030) al realizar el cierre.

---

# Cultivos transitorios
[Ver el video](https://www.youtube.com/watch?v=X6M3Fpp4BEk)
[X6M3Fpp4BEk]

## Tema principal
Manejo y creación de cultivos transitorios en ContaPyme, incluyendo la asignación de costos, registro de la producción, embodecamiento y erradicación.

## Resumen general
Este video explica cómo manejar cultivos transitorios en ContaPyme. Se define qué son los cultivos transitorios y cómo se diferencian de los perennes.  Aprenderás a crear un cultivo transitorio, a registrar costos (insumos, mano de obra, costos indirectos), a registrar la producción, a realizar el embodecamiento y, finalmente, a erradicar el cultivo, proceso que cierra el ciclo de costos. El video enfatiza la importancia de realizar las acciones automáticas de fin de mes y el recosteo para un correcto manejo de los costos.

## Preguntas Frecuentes (FAQ)

### ¿Qué se considera un cultivo transitorio?
#### Respuesta
Los cultivos transitorios son aquellos que duran menos de dos años, algunos incluso menos de un año o pocos meses. Se caracterizan por tener una etapa de desarrollo muy corta, que se asume dentro de la etapa de producción.

### ¿Cómo se diferencia el manejo de costos entre cultivos transitorios y perennes en ContaPyme?
#### Respuesta
En los cultivos transitorios, la etapa de desarrollo es muy corta y se asume dentro de la etapa de producción. Por lo tanto, no es necesario hacer una activación del cultivo como se hace en los cultivos perennes. Los costos se cargan directamente a la etapa de producción y se reflejan en la cuenta 7 contablemente.

### ¿Es necesario activar un cultivo transitorio al crearlo en ContaPyme?
#### Respuesta
No. A diferencia de los cultivos perennes, los cultivos transitorios inician directamente en la etapa de producción, por lo que no se requiere una activación inicial.

### ¿Cuántas cosechas tiene generalmente un cultivo transitorio?
#### Respuesta
Generalmente, los cultivos transitorios tienen una sola cosecha, después de la cual el cultivo es erradicado.

### ¿Cómo se crea un lote agrícola para un cultivo transitorio en ContaPyme?
#### Respuesta
Para crear un lote agrícola sigue estos pasos:
1.  Ve a **Lotes agrícolas**.
2.  Haz clic en **Crear centro de costos**.
3.  Selecciona **Crear lote agrícola**.
4.  Ingresa el código y nombre del lote (por ejemplo, Rosales 3).
5.  Selecciona la actividad transitoria.
6.  Ingresa la información adicional como la foto del lote y el área en hectáreas.
7.  Haz clic en **Aceptar**.

### ¿Cómo se crea un cultivo transitorio en ContaPyme después de tener el lote?
#### Respuesta
Para crear el cultivo transitorio sobre el lote:
1.  En el explorador gráfico, ubícate sobre el lote creado.
2.  Selecciona **Crear cultivo**.
3.  Ingresa el código y nombre del cultivo (por ejemplo, tomate).
4.  Selecciona la actividad correspondiente (por ejemplo, tomate).
5.  Ingresa el área.
6.  Ingresa la población (cantidad de plantas por hectárea) y la unidad de medida.
7.  Haz clic en **Siguiente**.
8.  Ingresa la fecha de siembra.
9.  Selecciona la cuenta de producto en proceso (1410).
10. Selecciona los clasificadores y haz clic en **Aceptar**.

### ¿Cómo se registran los costos de insumos en un cultivo transitorio en ContaPyme?
#### Respuesta
Los costos de insumos se registran a través de una planilla de uso y consumo de insumos en el módulo de inventarios. Debes seleccionar los insumos utilizados, el centro de costos (el cultivo de tomate), la labor y las cantidades. Al procesar la planilla, el sistema consume el inventario y lo lleva a la cuenta de costos correspondiente.

### ¿Qué tipo de informe de costos ofrece ContaPyme para cultivos transitorios?
#### Respuesta
ContaPyme ofrece un informe de costos de producción para cultivos transitorios, ya que no hay una etapa de desarrollo separada. Este informe muestra los costos incurridos durante el ciclo del cultivo, desde la siembra hasta la cosecha.

### ¿Por qué aparecen "costos sin activar" en el informe de costos de producción de un cultivo transitorio?
#### Respuesta
Los costos aparecen como "sin activar" porque aún no se han realizado las acciones automáticas de fin de mes, que incluyen la autoactivación de cuentas. Este proceso cancela la cuenta 7 y la traslada al producto en proceso.

### ¿Cómo se registran la producción y el embodecamiento en ContaPyme para un cultivo transitorio?
#### Respuesta
1.  **Producción:** Se registra a través de una planilla de labores con una labor marcada como "labor de producción". Esto registra la cantidad total recolectada.
2.  **Embodecamiento:** Se registra a través de una operación de embodecamiento, donde se especifican los productos obtenidos (por ejemplo, tomate de primera y tomate de segunda), las cantidades y los costos estimados de embodecamiento.  El sistema distribuye los costos totales entre los productos embodegados con base en estos costos estimados.

### ¿Por qué es importante el costo estimado de embodecamiento al registrar el embodecamiento de un cultivo transitorio en ContaPyme?
#### Respuesta
El costo estimado de embodecamiento es crucial cuando se registran diferentes productos (ej., tomate de primera y segunda) del mismo cultivo. El sistema utiliza este costo para distribuir los costos totales del cultivo entre los diferentes productos embodegados.

### ¿Cuál es el proceso para erradicar un cultivo transitorio en ContaPyme?
#### Respuesta
Para erradicar un cultivo transitorio:
1.  Ve a **Asistentes**.
2.  Selecciona **Cultivos**.
3.  Elige la operación **Erradicación o recolección de un cultivo transitorio**.
4.  Selecciona el cultivo a erradicar.
5.  Revisa la cuenta de pérdidas (cuenta 53).
6.  Haz clic en **Siguiente**.
7.  Elige si deseas hacer el cierre de ciclo de costos de inmediato o dejarlo pendiente para fin de mes. Si estás a mitad de mes, es mejor dejarlo pendiente. Si estás a fin de mes, puedes hacerlo de inmediato.
8.  Haz clic en **Finalizar**.

### ¿Qué ocurre cuando se erradica un cultivo transitorio en ContaPyme?
#### Respuesta
La erradicación de un cultivo transitorio realiza el cierre de ciclo de costos y finaliza el cultivo. El cultivo deja de estar vigente como centro de costos. Si se desea sembrar el mismo cultivo nuevamente, se debe crear un nuevo cultivo como centro de costos.

### ¿Qué pasa si al momento de erradicar un cultivo transitorio hay costos pero no hay embodecamentos registrados?
#### Respuesta
Si hay costos y no hay embodecamentos, la operación de erradicación afectará la cuenta de pérdidas (cuenta 53), lo que indica un problema en el cierre de ciclo. Esto puede indicar que hay costos registrados sin la correspondiente producción y embodecamiento.

### ¿Qué acciones se deben realizar de forma mensual para un correcto manejo de cultivos transitorios en ContaPyme?
#### Respuesta
Es fundamental realizar las siguientes acciones mensuales:
1.  **Recosteo:** Ajustar los costos para reflejar la realidad económica del cultivo.
2.  **Acciones automáticas de fin de mes:** Trasladar los costos a producto en proceso y activar las cuentas.

---

# Distribuidores de Costos
[Ver el video](https://www.youtube.com/watch?v=cfgLz62YUiI)
[cfgLz62YUiI]

## Tema principal
Configuración y uso de distribuidores de costos en ContaPyme.

## Resumen general
Este video explica cómo configurar y utilizar distribuidores de costos en ContaPyme para asignar costos indirectos a las unidades productivas. Se describen los tres tipos de distribuidores: por peso, por criterio y avanzado, detallando sus características, alcances y criterios. Además, se explica el concepto de proporcionalidad del tiempo de vigencia y se muestran ejemplos prácticos de configuración en el sistema, abordando situaciones comunes y las limitaciones de cada tipo de distribuidor.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los distribuidores de costos y cuál es su función?
#### Respuesta
Los distribuidores de costos son herramientas en ContaPyme que permiten asignar los costos indirectos acumulados en un centro de costos a las unidades productivas, como líneas de producción, órdenes o cultivos, reflejándose en el costo de los productos. El distribuidor define sobre quiénes y en qué proporción se realiza la distribución.

### ¿Cuáles son las dos variables clave que se deben tener en cuenta al configurar un distribuidor de costos?
#### Respuesta
Las dos variables clave son:
*   **Alcance:** El listado de los centros de costos sobre los cuales se va a realizar la distribución.
*   **Criterio:** La variable que se va a evaluar para hacer la distribución, como área, población, producción, venta, etc.

### ¿Cuáles son los tres tipos de distribuidores de costos que existen en ContaPyme?
#### Respuesta
Existen tres tipos de distribuidores:
*   **Por Peso:** Distribuidor sencillo con alcance fijo y criterios de distribución fijos.
*   **Por Criterio:** Distribuidor con alcance y criterio variables, aplica proporcionalidad de tiempo de vigencia y permite redireccionar o dejar pendiente en caso de no haber criterio de distribución.
*   **Avanzado:** Se utiliza cuando los otros dos no son suficientes. Requiere conocimiento del origen de los datos para programar el alcance y el criterio.

### ¿Cuál es la característica principal del distribuidor por peso y en qué situaciones se recomienda su uso?
#### Respuesta
La característica principal del distribuidor por peso es que tiene un alcance fijo y criterios de distribución fijos. Se recomienda su uso cuando la distribución siempre se realiza sobre las mismas unidades productivas y con los mismos porcentajes. También se utiliza cuando un distribuidor distribuye un costo sobre dos o más distribuidores nuevos.

### ¿Qué significa que el distribuidor por criterio tiene un alcance variable?
#### Respuesta
Significa que el listado de centros de costos sobre los cuales se realiza la distribución puede cambiar automáticamente. Por ejemplo, si se distribuye sobre las líneas de producción y se crea una nueva línea, el sistema la incluirá automáticamente en el alcance de la distribución sin necesidad de modificar el distribuidor.

### ¿Qué significa la proporcionalidad de tiempo de vigencia y cómo afecta la distribución de costos?
#### Respuesta
La proporcionalidad de tiempo de vigencia es una característica que permite evaluar no solo el criterio de distribución, sino también la fecha de creación de los centros de costos. El centro de costos que tenga más tiempo de vigencia recibirá mayores costos, incluso si su criterio es menor que el de otro centro de costos con menos tiempo. Por ejemplo, un lote de cultivo con menos área pero más días de vigencia puede recibir más costos que un lote con mayor área pero menos días de vigencia.

### ¿Qué opciones existen en caso de no haber criterio de distribución al utilizar un distribuidor por criterio?
#### Respuesta
Se pueden realizar dos acciones:
1.  **Redireccionar:** Mandar los costos a otro centro de costos que tenga una distribución diferente.
2.  **Dejar Pendiente:** Dejar los costos pendientes para la siguiente distribución, donde el sistema considerará los costos anteriores y los costos del mes actual para realizar la distribución.

### ¿Cuándo se recomienda utilizar un distribuidor avanzado?
#### Respuesta
Se recomienda utilizar un distribuidor avanzado cuando no se puede utilizar ni el distribuidor por peso ni el distribuidor por criterio debido a sus limitaciones. El distribuidor avanzado requiere conocimiento del origen de los datos para programar el alcance y el criterio.

### ¿Cómo se crea un distribuidor por criterio en ContaPyme para distribuir la nómina del jefe de planta por partes iguales entre las líneas de producción?
#### Respuesta
Para crear un distribuidor por criterio, siga estos pasos:

1.  Ubíquese en el agrupador o categoría de distribuidores.
2.  Haga clic derecho y seleccione **Crear Centro de Costos > Nodo Distribuidor por Criterio**.
3.  Ingrese un código y nombre para el distribuidor (ej. Distribuidor por partes iguales).
4.  En la sección **Actividad**, si no va a distribuir basado en actividades, déjelo en blanco.
5.  En la sección **Alcance**, seleccione **Lista de centros de costos y nodos** y elija el agrupador de **Líneas de Producción**. Active la opción **Incluir en el conjunto de centros de costos los hijos de esta**.
6.  En la sección **Criterio**, seleccione **Por Partes Iguales**.
7.  Indique qué hacer en caso de no haber criterio de distribución (Redireccionar o Dejar pendiente).
8.  Haga clic en **Siguiente**, indique la fecha de vigencia y haga clic en **Aceptar**.

### ¿Cómo se relaciona un costo indirecto con un distribuidor en ContaPyme?
#### Respuesta
Para relacionar un costo indirecto con un distribuidor, siga estos pasos:

1.  Ubíquese en el centro de costos indirecto y haga clic en **Modificar**.
2.  Vaya a la pestaña **Costos Empresariales**.
3.  Active la opción **Distribución**.
4.  Vaya a la pestaña **Traslado de valores entre centros de costos**.
5.  Seleccione el distribuidor que va a utilizar.
6.  Seleccione el saldo que se va a distribuir (Movimiento del mes o Movimientos desde la última distribución).
7.  Ingrese el porcentaje que se va a trasladar (100%).
8.  Haga clic en **Aceptar**.

### ¿Cómo se prueba la configuración de un distribuidor en ContaPyme?
#### Respuesta
Para probar la configuración de un distribuidor, siga estos pasos:

1.  Vaya al menú de distribuidores.
2.  Seleccione **Probar Centro de Costos Programado**.
3.  Indique el centro de costos indirecto y el distribuidor que desea probar.
4.  Ingrese un valor de prueba.
5.  Haga clic en **Generar Distribución**.
6.  El sistema mostrará cómo se distribuiría el valor entre los centros de costos de destino.

### ¿Cómo se crea un distribuidor avanzado para distribuir los servicios públicos sobre las líneas de producción por embovedamiento?
#### Respuesta
Para crear un distribuidor avanzado, siga estos pasos:

1.  Ubíquese en el agrupador o categoría de distribuidores.
2.  Haga clic derecho y seleccione **Crear Centro de Costos > Nodo Distribuidor Avanzado**.
3.  Ingrese un código y nombre para el distribuidor (ej. Distribuidor por embotellamiento).
4.  En la sección **Alcance**, defina la fuente de datos. En este caso, seleccione **Centros de Costos de Producción**.
5.  Para especificar que son las líneas de producción, en la sección **Nombre del campo**, seleccione **Padre**, operador **Es igual a**, y el código del agrupador de **Líneas de Producción**.
6.  En la sección **Criterio**, defina la fuente de datos. En este caso, seleccione **Explorador de Movimiento de Inventarios**.
7.  Seleccione la operación a realizar: **Sumar**.
8.  Seleccione la variable a sumar: **Cantidad**.
9.  Agregue filtros para especificar que son solo las cantidades que entran por embotellamiento.
    *   **Tipo de Documento** igual a **150** (Embotellamiento).
    *   **Tipo de Movimiento** igual a **3001** (Movimiento de Ingreso de Productos por Embotellamiento).
    *   Asegúrese de que ambos filtros tengan el mismo conjunto (el mismo número) para que se cumplan las dos condiciones.
10. Indique qué hacer en caso de no haber criterio de distribución (Redireccionar o Dejar pendiente).
11. Haga clic en **Aceptar**.

### ¿Qué consideraciones se deben tener al configurar un distribuidor avanzado para cultivos?
#### Respuesta
Al configurar un distribuidor avanzado para cultivos, tenga en cuenta que los cultivos no son hijos directos del agrupador de cultivos, sino de los lotes. Por lo tanto, al definir el alcance, debe seleccionar **Lotes Agrícolas** y especificar que sean hijos del agrupador de cultivos.

### ¿Qué se debe tener en cuenta al usar un distribuidor avanzado por movimiento de una cuenta?
#### Respuesta
Se debe tener en cuenta que el tipo de movimiento a evaluar depende de si se está utilizando el **explorador de movimiento de inventarios** o el **explorador de movimiento contable**. En el caso del explorador de contabilidad, el tipo de movimiento es **2001**. Además, en el **explorador de movimiento contable** para que el distribuidor funcione de forma correcta se debe ingresar la **Cuenta Imputada** de forma completa y detallada, ejemplo: 71010101.

### ¿Qué signo se debe usar para que el sistema coja una cuenta y todas sus hijas?
#### Respuesta
Se debe usar el signo: 71 (signo)

### ¿Qué implicaciones tiene configurar el periodo de evaluación en un distribuidor por criterio con la opción "Desde la última distribución"?
#### Respuesta
Si se configura el periodo de evaluación como "Desde la última distribución", no se podrán realizar imputaciones directas al distribuidor. Las imputaciones deberán realizarse al centro de costos indirecto para que se distribuyan en las acciones automáticas de fin de mes.

---

# Informes de costos
[Ver el video](https://www.youtube.com/watch?v=eOhtEivuM1Y)
Informes de costos

## Tema principal
Revisión de los diferentes informes de costos disponibles en ContaPyme para el análisis de la producción.

## Resumen general
Este video explica los diferentes tipos de informes de costos disponibles en ContaPyme, tanto específicos para unidades productivas (líneas, órdenes, cultivos) como generales que consolidan información de varias unidades. Se describen informes como costos de producción, estado de la producción, producción por período, costos de desarrollo (para cultivos perennes), consulta de mayor y balances, saldos de inventario por centros de costos, exploradores de inventarios y contabilidad, explorador de labores y tablas comparativas de costos. El video enfatiza la importancia de entender y utilizar estos informes para un control efectivo de los costos de producción y la toma de decisiones.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipos de informes de costos están disponibles en ContaPyme?
#### Respuesta
ContaPyme ofrece varios tipos de informes de costos, incluyendo:
- Informes específicos para cada unidad productiva: costos de producción, estado de la producción, producción por período y costos de desarrollo (para cultivos perennes).
- Informes contables y de inventarios: consulta de mayor y balances, saldos de inventario por centros de costos.
- Exploradores: explorador de inventarios, explorador de contabilidad y explorador de labores.
- Informes generales: costos de producción por actividad, producción y ventas semanales, y tablas comparativas de costos.

### ¿En qué unidades productivas está disponible el informe de costos de producción?
#### Respuesta
El informe de costos de producción está disponible en líneas de producción, órdenes de producción, cultivos perennes y cultivos transitorios.

### ¿En qué unidades productivas está disponible el informe de estado de la producción?
#### Respuesta
El informe de estado de la producción está disponible en líneas de producción, órdenes de producción, cultivos perennes y cultivos transitorios.

### ¿En qué unidades productivas está disponible el informe de producción por período?
#### Respuesta
El informe de producción por período está disponible en líneas de producción y cultivos perennes y transitorios. No está disponible en órdenes de producción.

### ¿Qué tipo de unidades productivas tienen un informe de costos de desarrollo?
#### Respuesta
Los cultivos perennes tienen un informe de costos de desarrollo, que considera la etapa inicial de desarrollo del cultivo.

### ¿Cuál es la diferencia entre el informe de costos de desarrollo y el informe de costos de producción en cultivos perennes?
#### Respuesta
El informe de costos de desarrollo muestra los costos incurridos durante la etapa de desarrollo inicial del cultivo perenne. El informe de costos de producción muestra los costos incurridos durante la etapa productiva del cultivo.

### ¿Por qué es útil la consulta de mayor y balances?
#### Respuesta
La consulta de mayor y balances es útil porque permite utilizar la herramienta "drill down", que al darle doble clic sobre un valor, muestra el origen de los datos. Es útil para verificar cierres de mes, saldos de cuentas y validación de inventarios contra la contabilidad.

### ¿Cuál es la ventaja del informe de saldos de inventarios por centros de costos?
#### Respuesta
Este informe muestra el centro de costos (unidad productiva) que produjo cada uno de los productos. Además, identifica novedades en los inventarios, como productos con cantidades negativas, costos negativos, o productos con costo y sin cantidad.

### ¿Para qué sirve el explorador de inventarios?
#### Respuesta
El explorador de inventarios es útil para revisar los embodegamientos que se realizaron sobre un cultivo o unidad productiva, las planillas de consumo y las ventas.

### ¿Para qué sirve el explorador de contabilidad?
#### Respuesta
El explorador de contabilidad se utiliza para sacar saldos de cuentas (ej: 1430), revisar cuentas de presupuesto y demás información contable.

### ¿Qué información proporciona el explorador de labores?
#### Respuesta
El explorador de labores une las planillas de consumo y las planillas de mano de obra. Permite ver los consumos imputados en cada unidad productiva, la labor realizada cuando se hizo el consumo del insumo, el detalle de las planillas de labores y los costos de los insumos y la mano de obra.

### ¿Dónde se encuentran los informes de costos generales en ContaPyme?
#### Respuesta
Los informes de costos generales se encuentran en la pestaña de **Costos** y luego en **Informes de Costos**.

### ¿Qué muestra el informe de costos de producción por actividad?
#### Respuesta
Este informe consolida los costos de producción de todas las unidades productivas que pertenezcan a una misma actividad (ej: todos los lotes de cítricos).

### ¿Qué muestra el informe de producción y ventas semanales?
#### Respuesta
Este informe muestra la producción y las ventas semanales, comparando costos contra ingresos y mostrando la utilidad.

### ¿Para qué sirven las tablas comparativas de costos?
#### Respuesta
Las tablas comparativas de costos permiten comparar los costos de producción entre diferentes centros de costos, cultivos, actividades u órdenes de producción.

### ¿Cómo generar un informe de costos de desarrollo para un cultivo perenne?
#### Respuesta
Para generar un informe de costos de desarrollo para un cultivo perenne, siga estos pasos:
1.  Ubíquese en el lote del cultivo perenne en ContaPyme.
2.  Haga clic derecho sobre el lote.
3.  Seleccione **Informes > Costos, producción y ventas**.
4.  Seleccione el informe de **Costos de Desarrollo**.
5.  Defina las fechas de inicio y fin del período a consultar.
6.  Seleccione las opciones deseadas (incluir planillas, tipo de contabilización).
7.  Haga clic en **Ver reporte**.

### ¿Cómo generar un informe de costos de producción para una línea o cultivo?
#### Respuesta
Para generar un informe de costos de producción, siga estos pasos:
1. Ubíquese en la línea de producción o cultivo deseado.
2. Haga clic derecho sobre la línea o cultivo.
3. Seleccione **Informes > Costos, producción y ventas**.
4. Seleccione el informe de **Costos de Producción**.
5. Seleccione el ciclo de costos que desea consultar (especialmente importante para líneas y cultivos perennes).
6. Defina las fechas de inicio y fin del período a consultar.
7. Seleccione las opciones deseadas (incluir planillas, tipo de contabilización).
8. Haga clic en **Ver reporte**.

### ¿Cómo acceder al explorador de labores?
#### Respuesta
Para acceder al explorador de labores, siga estos pasos:
1. Vaya a la pestaña de **Costos**.
2. Seleccione **Exploradores**.
3. Seleccione **Actividades y Labores**.
4. Seleccione **Explorador de Labores**.

### ¿Cómo generar un informe de costos de producción por actividad agrícola?
#### Respuesta
Para generar un informe de costos de producción por actividad agrícola, siga estos pasos:
1. Vaya a la pestaña de **Costos**.
2. Seleccione **Informes de Costos**.
3. Seleccione **Costos de Producción por Actividad Agrícola**.
4. Indique la actividad que desea ver (ej: naranja).
5. Defina las fechas de inicio y fin del período a consultar.
6. Haga clic en **Ver reporte**.

### ¿Cómo generar una tabla comparativa de costos de producción por cultivo?
#### Respuesta
Para generar una tabla comparativa de costos de producción por cultivo, siga estos pasos:
1. Vaya a la pestaña de **Costos**.
2. Seleccione **Informes de Costos**.
3. Seleccione **Tabla Comparativa de Costos de Producción por Cultivo**.
4. Defina las fechas de inicio y fin del período a consultar.
5. (Opcional) Filtre por una actividad específica para facilitar la interpretación del informe.
6. Haga clic en **Ver reporte**.

---

# Introducción a costos de producción
[Ver el video](https://www.youtube.com/watch?v=NgfYGX5km9A)
NgfYGX5km9A

## Tema principal
Conceptos básicos y clasificación de los costos de producción.

## Resumen general
Este video proporciona una introducción a los costos de producción, definiendo qué es la producción y el concepto de costo. Explica la clasificación de los costos según su función (costos de producción y gastos empresariales) y según su relación con el producto (costos directos e indirectos). Además, detalla la importancia del plan de cuentas y la configuración adecuada de las cuentas contables en ContaPyme y AgroWIN para llevar un control efectivo de los costos de producción.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la producción?
#### Respuesta
La producción es el proceso de transformar materias primas e insumos, utilizando mano de obra y herramientas/maquinaria, para obtener un producto útil que se venderá.

### ¿Qué es el costo, según la definición del video?
#### Respuesta
El costo es la valoración económica de los recursos sacrificados o dejados de percibir para la obtención de un fin productivo.

### ¿Cuáles son las tres partes principales de la definición de costo?
#### Respuesta
Las tres partes principales son:
1.  **Valoración económica:** El valor monetario de los recursos consumidos.
2.  **Recursos sacrificados o dejados de percibir:** Insumos o mano de obra que no pueden retornar a su estado original, o el valor de un recurso que podría generar ingresos si no se usara en la producción.
3.  **Fin productivo:** El objetivo o centro de costos al que se destina el recurso, como líneas de producción, órdenes de producción o cultivos.

### ¿Qué se entiende por "recursos sacrificados"?
#### Respuesta
Son los insumos o la mano de obra que, una vez utilizados en la producción, no pueden ser retornados a su condición original. Por ejemplo, la tela cortada para fabricar camisas o la energía eléctrica consumida por las máquinas.

### ¿Qué son los "recursos dejados de percibir"?
#### Respuesta
Son recursos que, aunque no impliquen una salida directa de dinero, representan un costo porque podrían estar generando ingresos si se utilizaran de otra manera. Por ejemplo, usar un tractor propio y depreciado en la finca en lugar de alquilarlo.

### ¿Cómo se clasifican los costos según su función?
#### Respuesta
Según su función, los costos se clasifican en:
1.  **Costos de producción:** Valoración de los recursos destinados a transformar la materia prima y la mano de obra en productos para la venta.
2.  **Gastos empresariales:** Erogaciones necesarias para mantener el funcionamiento de la empresa, pero no directamente relacionadas con la producción (administrativos, logísticos, etc.).

### ¿Cuál es la diferencia clave entre costos de producción y gastos empresariales?
#### Respuesta
Los gastos empresariales se incurren independientemente de si hay producción, mientras que los costos de producción están directamente relacionados con la actividad productiva.

### ¿Cómo se clasifican los costos según su relación con el producto?
#### Respuesta
Según su relación con el producto, los costos se clasifican en:
1.  **Costos directos:** Aquellos que se pueden identificar con precisión para un fin productivo específico.
2.  **Costos indirectos:** Aquellos que afectan a más de un fin productivo y no se pueden asignar directamente a uno solo.

### ¿Qué es el prorrateo y cuándo se utiliza?
#### Respuesta
El prorrateo es un sistema para distribuir los costos indirectos entre los diferentes fines productivos, ya que no se pueden asignar directamente. Se puede hacer proporcional al área, a la población, por partes iguales, o utilizando otras variables.

### ¿Por qué es importante tener clara la diferencia entre gasto empresarial, costo de producción, costo directo y costo indirecto?
#### Respuesta
Para evitar confusiones y controversias al clasificar los diferentes gastos de la empresa, especialmente aquellos que podrían considerarse tanto costos como gastos según su naturaleza y destino.

### ¿Cuáles son los tres tipos de gastos empresariales?
#### Respuesta
Los tres tipos de gastos empresariales son:
1.  Gastos operacionales de administración (cuenta 51)
2.  Gastos operacionales de ventas (cuenta 52)
3.  Gastos no operacionales

### ¿Qué son los costos por órdenes de trabajo o de fabricación?
#### Respuesta
Son los costos que corresponden a las empresas que elaboran sus productos acorde a los pedidos o a las órdenes de producción.

### ¿Qué son los costos por procesos?
#### Respuesta
Son para empresas de producción masiva o continua de artículos similares.

### ¿Qué son los costos por actividades?
#### Respuesta
Lo que se hace es como clasificar los costos de acuerdo a la actividad.

### ¿Cuáles son las tres cuentas necesarias para trabajar costos de producción en ContaPyme y AgroWIN?
#### Respuesta
Las tres cuentas son:
1.  Cuentas de costos de producción (cuenta 7): 71 (Materia prima), 72 (Mano de obra directa) y 73 (Costos indirectos de producción).
2.  Cuenta de producto en proceso (1410).
3.  Cuenta de productos manufacturados o productos agrícolas (1430).

### ¿Qué características de configuración deben tener las cuentas de costos de producción (cuenta 7)?
#### Respuesta
Las cuentas siete deben tener las siguientes características:
1.  Pertenecer al tipo de cuenta 5 (egresos).
2.  Autoactivarse.
3.  Estar disponibles en las operaciones de gastos e ingresos.
4.  Exigir centro de costos.
5.  Manejar tercero.

### ¿Qué características de configuración debe tener la cuenta de producto en proceso (1410)?
#### Respuesta
La cuenta 1410 debe tener las siguientes características:
1.  Ser de tipo de cuenta 1 (activo).
2.  No autoactivarse.
3.  No estar disponible en operaciones de gastos e ingresos.
4.  Exigir centro de costos.
5.  Manejar tercero.

### ¿Qué características de configuración debe tener la cuenta de productos manufacturados o productos agrícolas (1430)?
#### Respuesta
La cuenta 1430 debe tener las siguientes características:
1.  Ser de tipo de cuenta 1 (activo).
2.  No autoactivarse.
3.  No estar disponible en operaciones de gastos e ingresos.
4.  No exigir centro de costos.
5.  Manejar tercero.

---

# Mano de obra - Parte 1
[Ver el video](https://www.youtube.com/watch?v=0tSkXLgiZDk)
[0tSkXLgiZDk]

## Tema principal
Costeo de mano de obra a través del módulo de actividades y labores en ContaPyme y Agrowin.

## Resumen general
Este video explica cómo costear la mano de obra utilizando el módulo de actividades y labores en ContaPyme y Agrowin. Se definen conceptos clave como actividades (empresariales o agropecuarias), labores (tareas para cumplir la actividad), tipos de cálculo de rendimiento (cómo se mide el rendimiento de una labor) y tipos de contratación (formas de pago de la mano de obra). Se muestra cómo crear actividades y labores en ambos sistemas, cómo configurar los tipos de contratación y cómo registrar planillas de labores, mostrando el efecto contable y los informes disponibles.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una actividad empresarial o agropecuaria en ContaPyme?
#### Respuesta
Una actividad es la actividad económica principal a la que se dedica la empresa. En el caso de actividades agropecuarias, se recomienda crear una actividad por cada tipo de cultivo. Por ejemplo, si una finca tiene café, plátano y aguacate, se crean tres actividades separadas: café, plátano y aguacate.

### ¿Qué es una labor y cómo se diferencia de una actividad?
#### Respuesta
Una labor es la tarea o las tareas específicas que se deben realizar para cumplir con una actividad. Por ejemplo, si la actividad es producción textil, las labores pueden ser: diseño del patrón, escalado del patrón, corte del molde, fileteada de las piezas, confección, planchado, empacado y marquillado. La actividad es el macro y las labores son las tareas que permiten cumplir con la actividad.

### ¿Qué variables se deben considerar para definir el rendimiento de una labor?
#### Respuesta
Para determinar el rendimiento de una labor, se deben definir cuatro variables:
- La unidad en la que se mide la labor.
- La unidad en la que se mide el recurso que se sacrifica para cumplir esa labor.
- La población del centro de costos donde se aplica la labor.
- El área del centro de costos donde se aplica la labor.

### ¿Cómo se calcula el rendimiento de una labor?
#### Respuesta
El rendimiento se calcula comparando dos variables. Algunos ejemplos son:
- Unidad de labor sobre unidad de recurso.
- Unidad de labor sobre el área.
- Unidad de labor sobre la población.

### ¿Quién define cómo se debe medir el rendimiento de una labor?
#### Respuesta
El cliente define cómo se debe medir el rendimiento de las labores. En el agro, generalmente lo define el agrónomo. En manufactura, lo determina el jefe de producción o el jefe de bodega.

### ¿Es obligatorio calcular el rendimiento de todas las labores?
#### Respuesta
No, no es obligatorio. Si no se desea calcular el rendimiento de una labor, se puede configurar el tipo de cálculo de rendimiento como "no aplica".

### ¿Qué son los tipos de contratación en el módulo de actividades y labores?
#### Respuesta
Los tipos de contratación son las diferentes formas en que se paga la mano de obra. Los tipos de contratación son:
- Pago por cantidad de labor.
- Pago por cantidad de mano de obra.
- Contratista.
- Pago administrativo.
Este módulo está diseñado para trabajadores que no están en nómina.

### ¿Cómo se diferencia el pago por cantidad de labor del pago por cantidad de mano de obra?
#### Respuesta
- **Pago por cantidad de labor:** Se paga a la persona por la cantidad de unidades que realice. Por ejemplo, en la recolección, se paga por cada kilo recolectado.
- **Pago por cantidad de mano de obra:** Se paga a la persona por la cantidad de horas o jornales trabajados, sin importar cuánta labor realizó.

### ¿Qué es un contratista en el contexto del módulo de actividades y labores?
#### Respuesta
Es un trabajador con el cual se acuerda para que realice determinada cantidad de labor y se determina un valor que se le va a pagar. No se calcula ni cuántas horas se gastó, ni cuánta labor realizó.

### ¿Qué significa definir una tarifa por labor o una tarifa por tipo de contratación?
#### Respuesta
- **Tarifa por labor:** Se define una tarifa específica para cada labor. Por ejemplo, 1200 pesos por cada kilo recolectado.
- **Tarifa por tipo de contratación:** Se define un valor por hora o por jornal en el tipo de contratación.

### ¿Cómo se crea una actividad en ContaPyme?
#### Respuesta
**Ruta:** Costos > Catálogos > Actividades Empresariales
1.  Click derecho y seleccionar "Crear" o hacer click en el botón "Crear" en la cinta de opciones.
2.  Asignar un código a la actividad.
3.  Ingresar el nombre de la actividad.
4.  Seleccionar el tipo de actividad (empresarial, servicios, agrícola, pecuaria).
5.  (Opcional) Ingresar la unidad de población.
6.  Ingresar el nombre corto.
7.  (Opcional) Seleccionar iconos para cuando está en desarrollo y en producción.
8.  (Opcional) En la pestaña de clasificación, asignar grupo y tipo a la actividad.
9.  Ingresar el número de semanas promedio que duran las labores de esta actividad.
10. Dar click en Aceptar.

### ¿Cómo se importan actividades predefinidas en Agrowin?
#### Respuesta
**Ruta:** Costos > Catálogos > Actividades Empresariales
1.  Click derecho y seleccionar "Utilidades" > "Importar actividad al área de trabajo".
2.  Seleccionar el tipo de cultivo deseado de la lista.
3.  Asignar un código a la actividad.
4.  Dar click en Aceptar.

### ¿Cómo se crea una labor en ContaPyme?
#### Respuesta
**Ruta:** Costos > Catálogos > Actividades Empresariales. Seleccionar la actividad deseada > Click derecho > Catálogo de Labores.
1. Click derecho y seleccionar "Crear".
2. Asignar un código a la labor.
3. Ingresar el nombre de la labor.
4. Ingresar la unidad en la que se mide la labor.
5. Ingresar el nombre corto.
6. (Opcional) Ingresar la descripción de la labor.
7. Seleccionar el tipo de cálculo para el rendimiento.
8. (Opcional) Ingresar las tarifas por unidad de labor o por cantidad de mano de obra.
9. (Opcional) En la pestaña de clasificación, asignar grupos o tipos de labores.
10. En la pestaña de Cuenta de Manejo, seleccionar la cuenta contable (72) a la que se cargará el costo de la labor.
11. Dar click en Aceptar.

### ¿Cómo se importan labores desde otra actividad en Agrowin?
#### Respuesta
**Ruta:** Costos > Catálogos > Actividades Empresariales. Seleccionar la actividad deseada > Click derecho > Catálogo de Labores.
1. Estando en el Catálogo de Labores, click derecho y seleccionar "Utilidades" > "Importar labores desde otra actividad".
2. Seleccionar la actividad desde la cual se importarán las labores.
3. Dar click en "Seleccionar".
4. Dar click en "Refrescar".

### ¿Dónde se configuran los tipos de contratación en ContaPyme?
#### Respuesta
**Ruta:** Costos > Catálogos > Tipos de Contratación

### ¿Cómo se registra una planilla de labores en ContaPyme?
#### Respuesta
**Ruta:** Asistentes de las Operaciones > Planilla de Labores.
1. Indicar la fecha de la planilla.
2. (Opcional) Agregar un detalle de las labores realizadas.
3. Seleccionar la cuenta de caja o banco (si el tipo de contrato no genera cuenta por pagar).
4. Seleccionar si el total de la planilla se pagará a un tercero.
5. Seleccionar si se va a costear según la tarifa definida en la labor o según la tarifa diaria definida en el tipo de contrato.
6. Seleccionar el tipo de contrato.
7. Seleccionar el trabajador.
8. Discriminar por cada día de la semana el centro de costos o unidad productiva donde trabajó y la labor realizada.
9. Indicar la cantidad de horas trabajadas o la cantidad de unidades realizadas, según el tipo de contratación.
10. (Opcional) Ingresar descuentos.
11. (Opcional) Ingresar el número de cheque.
12. Dar click en "Siguiente".
13. (Opcional) Revisar el reporte de finalización de labores.
14. Dar click en "Finalizar".

### ¿Cómo se modifica el valor de una labor en una planilla sin modificar la tarifa estándar de la labor?
#### Respuesta
En el paso "Costear las labores según los tipos de contrato" de la planilla de labores, se puede modificar el valor estándar definido en la labor para esa planilla específica. El cambio no afectará la tarifa definida en la labor para futuras planillas.

### ¿Cómo se configura ContaPyme para que discrimine día a día la información registrada en la planilla de labores?
#### Respuesta
En la pestaña de configuraciones, activar la opción "Sentar planilla detallando día a día de la semana".

### ¿Qué tipos de informes están disponibles en ContaPyme para el módulo de actividades y labores?
#### Respuesta
- Semanal de labores.
- Estadísticas por centros de costos.
- Consulta de observación de labores.
- Informes por planillas.
- Planilla de pago de trabajadores.
- Explorador de labores.

---

# Mano de obra - Parte 2
[Ver el video](https://www.youtube.com/watch?v=cnRxtgdJo3Q)
[cnRxtgdJo3Q]

## Tema principal
Integración del módulo de nómina con el módulo de actividades y labores en ContaPyme.

## Resumen general
Este video explica cómo integrar el módulo de nómina con el módulo de actividades y labores en ContaPyme para costear la mano de obra en diferentes escenarios empresariales. Se presentan tres casos: empresas que solo usan el módulo de nómina, empresas que combinan nómina y planillas de labores con tipos de contrato de pago administrativo, y empresas que usan planillas de labores para generar novedades en la nómina. Se aprende cómo configurar el plan de cuentas, los conceptos de nómina, los perfiles de contrato y los tipos de contratación para distribuir correctamente los costos de la mano de obra a las unidades productivas.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la diferencia entre el módulo de actividades y labores y el módulo de nómina en ContaPyme?
#### Respuesta
El módulo de actividades y labores permite costear la mano de obra directamente a las unidades productivas, pero no incluye las funcionalidades completas del módulo de nómina, como provisiones de vacaciones, primas, cesantías, descuentos de salud y pensión, y aportes del empleador. El módulo de nómina es el que cumple con los requerimientos de ley de la nómina electrónica y permite registrar todos los descuentos, provisiones y demás costos y devengos del empleado.

### ¿Por qué algunas empresas no utilizan el módulo de actividades y labores?
#### Respuesta
Algunas empresas no tienen la información detallada necesaria para discriminar cada una de las labores que realizan sus empleados y cuánto tiempo dedican a cada una. Esto dificulta la creación del catálogo de labores y el registro preciso de las planillas.

### ¿Qué debo hacer si mi empresa solo utiliza el módulo de nómina y necesito llevar el costo de la mano de obra a las unidades productivas?
#### Respuesta
Debes duplicar la estructura de la cuenta 5105 (gastos de personal) en la cuenta 72 (costos de producción), configurar los conceptos de nómina con las nuevas cuentas 72, crear un perfil de contrato para los empleados de producción, y luego configurar un centro de costos indirecto para recibir los costos de la nómina y distribuirlos a las unidades productivas.

### ¿Cómo se duplica la estructura de la cuenta 5105 a la 7205?
#### Respuesta
**Pasos:**
1.  Ingresa al **Plan de Cuentas**.
2.  Si no existe, crea la cuenta principal **7205 Costos de Personal**.
3.  Duplica cada subcuenta de la **5105** (ej., 510506 Salarios) en la **7205** (ej., 720506 Salarios).  Asegúrate de que cada cuenta tenga la misma configuración que su contraparte en la 5105.

### ¿Cómo se configuran los conceptos de nómina con la cuenta 72?
#### Respuesta
**Pasos:**
1.  Ingresa a **Nómina > Conceptos de Nómina**.
2.  Selecciona un concepto de nómina existente (ej., Salario Básico).
3.  Duplica el concepto y agrega una letra distintiva (ej., "C") al final del nombre (ej., Salario Básico C).
4.  En la pestaña de **Manejo Contable**, configura la cuenta 72 correspondiente (ej., 720506 Salarios).
5.  Desactiva la opción que valida la carga directa a unidades productivas.
6.  Repite este proceso para todos los conceptos de nómina relevantes.

### ¿Cómo se crea un perfil de contrato para empleados de producción?
#### Respuesta
**Pasos:**
1.  Ingresa a **Nómina > Perfiles de Contrato**.
2.  Duplica un perfil de contrato existente (ej., Término Indefinido, Pago Mensual).
3.  Agrega un distintivo al nombre del perfil (ej., "Costos").
4.  En la sección de **Conceptos de Nómina**, reemplaza los conceptos con las cuentas 5105 por los nuevos conceptos con las cuentas 72 creados en el paso anterior.
5.  Guarda el nuevo perfil de contrato.

### ¿Por qué es necesario un centro de costos indirecto para la nómina de producción?
#### Respuesta
Si los empleados trabajan en diferentes unidades productivas, no es correcto cargar toda la nómina a una sola unidad. El centro de costos indirecto recibe todos los costos de la nómina y luego se distribuye a las diferentes unidades productivas según un criterio definido.

### ¿Cómo se configura un centro de costos indirecto para la nómina de producción?
#### Respuesta
1.  Ingresa a **Configuración > Centros de Costos**.
2.  Crea un centro de costos básico (no agrupador ni de producción) llamado, por ejemplo, "Nómina Producción".
3.  Su función es recibir toda la nómina y luego distribuirla.

### ¿Qué criterios se pueden utilizar para distribuir la nómina desde el centro de costos indirecto a las unidades productivas?
#### Respuesta
Se pueden utilizar varios criterios, como:
*   Unidades producidas.
*   Costos de insumos (la línea que más consume insumos recibe mayores costos de nómina).
*   Distribución en partes iguales.
*   Área o población (para cultivos).
*   Distribución fija (porcentaje fijo a cada línea).

### ¿Cómo se configura un distribuidor por criterio para la nómina?
#### Respuesta
**Pasos:**
1.  Ingresa a **Configuración > Distribuidores**.
2.  Crea un nuevo distribuidor por criterio.
3.  Define el **Alcance**: selecciona las líneas de producción (ej., los hijos del agrupador 16).
4.  Define el **Criterio**:
    *   **Por movimiento de la cuenta**: selecciona la cuenta 71 (costos de materia prima e insumos).
    *   **Tener en cuenta**: débitos.
    *   **Basados en el movimiento de**: ejecución presupuestal.
    *   **Desde la última distribución**: dejar pendiente para la siguiente distribución.

### ¿Cómo se relaciona el centro de costos de nómina con el distribuidor?
#### Respuesta
**Pasos:**
1.  Ingresa a **Configuración > Centros de Costos**.
2.  Modifica el centro de costos de "Nómina Producción".
3.  Activa la opción **Distribución**.
4.  En **Traslado Valores**, selecciona el distribuidor creado.
5.  Indica que tome los movimientos acumulados desde la última distribución y que se distribuya al 100%.

### ¿Cómo se prueba la configuración del distribuidor de nómina?
#### Respuesta
**Pasos:**
1.  Ubícate en la empresa.
2.  Haz clic derecho y selecciona **Probar Distribución de Centros de Costos**.
3.  Selecciona **Probar centro de costos programado**.
4.  Indica el centro de costos (ej., 121) y el distribuidor (ej., 141).
5.  Ingresa un valor a distribuir (ej., 100,000 pesos).
6.  Haz clic en **Generar Distribución**.
7.  Verifica que los porcentajes de distribución sean correctos.

### ¿Cómo se verifica si la nómina se cargó correctamente al centro de costos y se distribuyó a las unidades productivas?
#### Respuesta
**Pasos:**
1.  Realiza el pago de la nómina.
2.  Verifica el movimiento contable generado: asegúrate de que no haya imputación a la cuenta 5 (gastos), sino a la 72 (costos).
3.  Genera un informe de **Mayor y Balances** del centro de costos de nómina (ej., 121) para confirmar que el saldo sea cero después de la distribución.
4.  Genera un informe de **Mayor y Balances** de una de las líneas de producción para verificar que haya recibido costos de personal.
5.  También puedes generar un informe de costos en la línea de producción y constatar los costos de materia prima y los costos de personal.

### ¿Qué son las acciones automáticas de fin de mes y cómo se utilizan en este contexto?
#### Respuesta
Las acciones automáticas de fin de mes son operaciones que se realizan en ContaPyme para ejecutar diferentes procesos, como depreciación, activación, traslados y cruce de provisiones. En este caso, se utiliza la operación de **Traslado entre centros de costos** para distribuir la nómina desde el centro de costos indirecto a las unidades productivas. La operación se encuentra en el **Manejador de Operaciones**.

### ¿Qué debo hacer si trabajo con nómina y planillas de labores al mismo tiempo y no quiero duplicar el costo de la mano de obra?
#### Respuesta
Puedes utilizar los tipos de contrato de pago administrativo en las planillas de labores. Este modelo permite cargar la nómina a un centro de costos y luego, a través de las planillas, sacar el costo de ese centro de costos y llevarlo a las unidades productivas.

### ¿Cómo se configura un tipo de contrato de pago administrativo?
#### Respuesta
**Pasos:**
1.  Ingresa a **Configuración > Tipos de Contratación**.
2.  Selecciona un tipo de contrato de pago administrativo (ej., "Pago administrativo por costeo de mano de obra").
3.  En la pestaña de **Comportamiento**, verifica que afecte estadísticas, rendimientos y producción.
4.  En la pestaña de **Cuenta de Manejo**, indica:
    *   La cuenta de cancelación (ej., 720599).
    *   El centro de costos donde se acumula la nómina (ej., 121).
5.  En la pestaña de **Precios para los días de la semana**, configura el valor por cada día. Este valor debe ser el costo real diario del empleado, incluyendo todos los componentes de la nómina.

### ¿Cómo se registra una planilla con un tipo de contrato de pago administrativo?
#### Respuesta
**Pasos:**
1.  Ingresa al módulo de **Actividades y Labores**.
2.  Crea una nueva planilla.
3.  Selecciona el tipo de contrato de pago administrativo.
4.  Selecciona el empleado.
5.  Indica la línea de producción en la que trabajó.
6.  Indica el número de jornales trabajados.
7.  Procesa la planilla.

### ¿Cómo funciona el modelo de planillas de labores que generan novedad de nómina?
#### Respuesta
En este modelo, las planillas de labores no se costean directamente, sino que generan una novedad en la nómina. Al procesar el pago de nómina, se tienen en cuenta los valores reportados en las planillas para liquidar los descuentos, provisiones y demás conceptos.

### ¿Cómo se configura un tipo de contrato para generar novedad de nómina?
#### Respuesta
**Pasos:**
1.  Ingresa a **Configuración > Tipos de Contratación**.
2.  Selecciona el tipo de contrato "Pago por cantidad de mano de obra".
3.  En la pestaña de **Comportamiento**, activa la opción **Generar novedad de nómina**.
4.  Selecciona el concepto de nómina donde se acumularán los valores de la planilla (ej., "Salario básico planilla de labores").
5.  Indica si se va a usar la cuenta definida en el concepto de nómina o la cuenta definida en la labor.
6.  En la pestaña de **Precios para los días de la semana**, configura el valor por cada día. En este caso, solo se debe tener en cuenta el valor del salario, sin incluir otros componentes.

### ¿Cómo se configura el concepto de nómina que recibirá la novedad generada por la planilla?
#### Respuesta
**Pasos:**
1.  Ingresa a **Nómina > Conceptos de Nómina**.
2.  Selecciona el concepto de nómina configurado en el tipo de contrato (ej., "Salario básico planilla de labores").
3.  En la **Forma de Cálculo**, tanto la cantidad como el valor deben estar configurados como **Manual**.

### ¿Qué consideraciones debo tener en cuenta al usar planillas de labores para generar novedad de nómina al momento de generar la nómina electrónica?
#### Respuesta
Es importante registrar los 30 días del mes en la planilla, incluso si el empleado no trabajó todos los días. Esto se puede lograr registrando tarifas para los sábados y domingos. Adicionalmente, el centro de costos configurado en el empleado afectará el cálculo de los componentes de la nómina, por lo que se debe tener cuidado de no duplicar costos.

---

# Materias Primas
[Ver el video](https://www.youtube.com/watch?v=Csh7NoeE6Vs)
[Csh7NoeE6Vs]

## Tema principal
Configuración y manejo de costos de materias primas e insumos en ContaPyme, incluyendo la creación de cuentas, grupos de inventario, elementos y el registro de transacciones.

## Resumen general
Este video explica cómo configurar ContaPyme para el manejo de costos de materias primas e insumos, diferenciando entre ambos conceptos. Enseña cómo crear un listado de insumos y materias primas en Excel, definir unidades de compra y consumo con sus equivalencias, y establecer categorías. Luego, muestra cómo trasladar esta información a ContaPyme creando cuentas contables, grupos de inventario y elementos, además de cómo registrar compras y consumos. Finalmente, aborda casos especiales como el manejo de productos terminados compuestos, el reintegro de materia prima y la transformación de productos.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la diferencia entre un insumo y una materia prima?
#### Respuesta
Un **insumo** es un elemento que ya ha sido procesado y que ayuda a desarrollar un producto o servicio final. Una **materia prima**, en cambio, es un material que se extrae principalmente de la naturaleza y que constituye la base de un producto. Por ejemplo, en la elaboración de calzado, las suelas, plantillas y tacones son insumos, mientras que el cuero es la materia prima.

### ¿Cómo debo empezar a configurar el manejo de materias primas en ContaPyme?
#### Respuesta
**1. Crear un listado en Excel:** Define una tabla con cada insumo y materia prima, incluyendo:
    *   **Nombre**
    *   **Unidad de Compra**
    *   **Unidad de Consumo**
    *   **Equivalencia** (entre unidad de compra y consumo)
    *   **Categoría**

**2. Identificar categorías únicas:** Copia la columna de categorías a una nueva hoja de Excel y elimina los duplicados para obtener una lista de categorías únicas.

### ¿Cómo creo las cuentas contables para las categorías de materias primas en ContaPyme?
#### Respuesta
Debes crear una cuenta **71** en el plan de cuentas de ContaPyme por cada categoría de materia prima que hayas definido.

**Pasos:**

1.  Ingresa al **Plan de Cuentas** en ContaPyme.
2.  Ubica la cuenta **71** (Materia Prima).
3.  Si ya existe la cuenta 710101, modifícala o crea una nueva con **clic derecho > Crear**.
4.  Asigna un nombre a la cuenta (ej: 710101 Telas).
5.  Asegúrate de que la configuración sea la siguiente:
    *   **Tipo Cuenta:** 5 (Egresos)
    *   **Clase:** Normal
    *   **Afectable directamente por el usuario:** Activado
    *   **Disponible en operaciones de gastos e ingresos:** Activado
    *   **Autoactivar:** Activado (Solo para cuentas 7)
    *   **Datos requeridos:** Exige centro de costos y maneja tercero.
6.  Si aplica, configura los impuestos correspondientes en la sección **Impuestos, Descuentos y Cargos**.
7.  Guarda la configuración.

### ¿Cómo creo los grupos de inventario para las materias primas en ContaPyme?
#### Respuesta
Crea un grupo de inventario por cada categoría de materia prima.

**Pasos:**

1.  Ingresa a **Inventarios > Grupos de Inventario**.
2.  Haz clic en **Crear**.
3.  Asigna un **código** (por ejemplo, las tres primeras letras del nombre de la categoría: TEL para telas).
4.  Ingresa el **Nombre** del grupo (ej: Telas).
5.  Selecciona **Control de Existencias**.
6.  Selecciona **Uso para Consumo** (desactiva "Mercancía para la Venta" y "Producto de Elaboración Interna" si no aplica).
7.  Ve a la pestaña **Manejo Contable** y configura:
    *   **Cuenta de Egresos:** Selecciona la cuenta 71 correspondiente a esa categoría (ej: 710101 Telas).
    *   **Cuentas de Deterioro:** Selecciona las cuentas de deterioro y reversión.
    *   **Impuestos en Compra:** Selecciona el concepto de liquidación correspondiente si aplica IVA en la compra.  Evalúa si el IVA se debe manejar como mayor valor del inventario (si el producto final está exento de IVA).
8.  Haz clic en **Aceptar**.

### ¿Cómo creo los elementos de inventario para las materias primas en ContaPyme?
#### Respuesta
Crea un elemento de inventario para cada materia prima o insumo.

**Pasos:**

1.  Ingresa a **Inventarios > Elementos de Inventario**.
2.  Haz clic en **Crear**.
3.  Ingresa el **Código** del elemento (ej: TEL001).
4.  Ingresa el **Nombre** del elemento (ej: Tela La Fallet).
5.  Selecciona la **Unidad de Consumo**.
6.  Selecciona el **Grupo de Inventario** correspondiente (ej: Telas).
7.  Activa el control de existencias y uso para consumo.
8.  En la pestaña **Manejo de Inventarios**, activa la opción **Maneja Unidad de Compra diferente a la unidad general**.
9.  Selecciona la **Unidad de Compra** y la **Equivalencia** (cantidad de unidades de consumo por unidad de compra).
10. Guarda la configuración.

### ¿Cómo activo la opción para manejar unidad de compra diferente a la unidad de consumo?
#### Respuesta
**Pasos:**

1.  Ingresa a **Inventarios > Elementos de Inventario**.
2.  Haz clic en **Configuración**.
3.  Selecciona **Configuración Avanzada**.
4.  Selecciona **Configuración todos los usuarios**.
5.  Busca la opción **Unidad de medida para compras** y actívala.
6.  Haz clic en **Aceptar**.

### ¿Cómo registro una compra de materias primas en ContaPyme?
#### Respuesta
**Pasos:**

1.  Ingresa al **Manejador de Operaciones**.
2.  Selecciona la fecha de la compra.
3.  Crea una nueva compra.
4.  Indica el número de documento (factura) del proveedor (incluye el prefijo en el detalle si es necesario).
5.  Selecciona el proveedor.
6.  Indica la bodega a la que ingresará el producto.
7.  Selecciona los productos que se van a comprar.
8.  Ingresa la **cantidad** (en unidad de compra) y el **costo por unidad** (costo de la unidad de compra).
9.  Verifica si se trabaja con IVA como mayor valor.
10. Ingresa otros gastos si aplica.
11. Liquida los impuestos.
12. Indica la forma de pago y la fecha de pago.
13. Finaliza la operación.

### ¿Cómo registro el consumo de materias primas en ContaPyme?
#### Respuesta
El consumo se registra a través de una **Planilla de Uso y Consumo**.

**Pasos:**

1.  Ingresa al **Manejador de Operaciones**.
2.  Selecciona la fecha del consumo (debe ser posterior a la compra del insumo).
3.  Crea una nueva **Planilla de Uso y Consumo** (ubicada en Compras).
4.  Indica la bodega de la cual se consume el producto.
5.  Selecciona el producto que se va a consumir.
6.  Indica el **Centro de Costos Destino** (línea de producción, orden de producción, cultivo transitorio o perenne).
7.  Selecciona la **Labor** realizada (se relaciona con las planillas de labores).
8.  Indica la **Cantidad** a consumir (en la unidad de consumo).
9.  Finaliza la operación.

### ¿Cómo hago un reintegro de materia prima a la bodega en ContaPyme?
#### Respuesta
El reintegro de materia prima se realiza a través de un **Embodegamiento de Productos**.

**Pasos:**

1.  Ingresa al **Manejador de Operaciones**.
2.  Selecciona la fecha del reintegro.
3.  Crea un nuevo **Embodegamiento de Productos**.
4.  Activa la opción **Devolución o reintegro de materia prima o productos elaborados**.
5.  Indica la bodega a la que ingresará la materia prima.
6.  Selecciona el producto que se va a reintegrar.
7.  Indica la cantidad a reintegrar.
8.  Indica el productor (línea, orden o cultivo) del cual se está reintegrando.
9.  Indica el **Costo Estimado** (debe ser el mismo costo al que se consumió inicialmente).
10. Finaliza la operación.

### ¿Qué sucede cuando trabajo con producto terminado compuesto?
#### Respuesta
Cuando un producto terminado se configura como un **elemento compuesto**, el consumo de los insumos que lo componen se realiza automáticamente en el momento en que se **embodega** el producto terminado. No es necesario registrar una planilla de consumo separada.

### ¿Qué sucede cuando registro una transformación de productos?
#### Respuesta
La operación de **Transformación de Productos** permite convertir un producto en otro. Al registrar una transformación, el sistema automáticamente realiza un **consumo** de los elementos origen y un **embodegamiento** del elemento destino.  No es necesario registrar una planilla de consumo separada.

---

# Registro de producción
[Ver el video](https://www.youtube.com/watch?v=hA5Nzydlye4)
[Registro de producción]

## Tema principal
Registro de la producción en ContaPyme mediante planillas de labores y embodegamientos.

## Resumen general
Este video explica cómo registrar la producción en ContaPyme, diferenciando entre el registro de producción por planilla de labores y el registro de producción por embodegamiento. Se aprende a configurar labores de producción, registrar la producción por planilla de labores, y la importancia de los costos estimados en los embodegamientos.  También se explica el uso de embodegamientos de productos compuestos y otras operaciones relacionadas.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es importante registrar la producción en ContaPyme?
#### Respuesta
Es importante registrar la producción porque, si la unidad productiva no registra el producto terminado, los costos asociados a la producción terminarán contabilizándose como pérdida. El registro adecuado permite convertir los costos de producción (materias primas, mano de obra, costos indirectos) en producto terminado.

### ¿Qué son las labores de producción y cómo se configuran en ContaPyme?
#### Respuesta
Las labores de producción son actividades específicas que generan producto terminado. Para configurarlas en ContaPyme, sigue estos pasos:
1. Ve a **Actividades**.
2. Selecciona la actividad (ej. Café, Confección).
3. Dentro del listado de labores, identifica la(s) labor(es) que representan la producción (ej. Recolección, Planchar y Empacar).
4. Dale doble clic a la labor y en la clasificación, marca la labor como **Labor de Producción**.
5. Asigna un nombre al producto, que se verá en el informe de costos.

### ¿Es obligatorio registrar la producción por planilla de labores en ContaPyme?
#### Respuesta
No, el registro de producción por planilla de labores no es obligatorio. Es útil en ciertos escenarios, como en el sector agrícola donde se necesita diferenciar entre la cantidad recolectada y la cantidad embodegada. Sin embargo, en manufactura, a menudo se omite este paso.

### ¿Cómo se registra la producción a través de planillas de labores en ContaPyme?
#### Respuesta
Para registrar la producción a través de planillas de labores, sigue estos pasos:
1. Ve al **Manejador de Operaciones**.
2. Crea una nueva **Planilla de Labores**.
3. Selecciona el tipo de contrato, el trabajador, la línea de producción y la labor de producción previamente configurada.
4. Ingresa la cantidad de jornales trabajados (si aplica).
5. Ingresa la cantidad producida en la labor de producción.
6. Procesa la planilla.

### ¿Qué ocurre si se especifica una labor de producción en una planilla de labores, pero no se indica la cantidad producida?
#### Respuesta
ContaPyme mostrará un error indicando que se especificó una labor de producción, pero no se ingresó la cantidad producida. Es necesario registrar la cantidad producida para que la planilla se procese correctamente.

### ¿Cuál es la diferencia entre registrar la producción por planilla de labores y registrarla por embodegamiento?
#### Respuesta
El registro por planilla de labores indica la producción que se ha registrado, pero no implica necesariamente el ingreso del producto a la bodega. El embodegamiento, por otro lado, es el proceso obligatorio para registrar el ingreso del producto terminado a la bodega, permitiendo posteriormente su venta.

### ¿Qué es el embodegamiento y por qué es obligatorio en ContaPyme?
#### Respuesta
El embodegamiento es el proceso de registrar el ingreso del producto terminado a la bodega en ContaPyme. Es obligatorio porque es la única forma de que el sistema reconozca el producto como disponible para la venta y asigne correctamente los costos asociados.

### ¿Qué es el costo estimado de embodegamiento y por qué es importante?
#### Respuesta
El costo estimado de embodegamiento es el costo que se asigna al producto al momento de registrar su ingreso a la bodega. Es importante porque influye en el cálculo del costo por unidad producida y en el valor del inventario. Debe ser un valor lo más cercano posible al costo real de producción para evitar grandes ajustes al cierre del ciclo de costos.

### ¿Cuáles son las recomendaciones para determinar el costo estimado de embodegamiento?
#### Respuesta
Se recomienda utilizar:
- Los costos del ciclo anterior.
- Un costo calculado manualmente.
- Un costo del mercado.
Lo importante es que **siempre** se registre un costo y que este sea lo más cercano posible al costo real para evitar grandes ajustes al cierre del ciclo de costos.

### ¿Qué sucede si se realiza un embodegamiento a costo cero en ContaPyme?
#### Respuesta
Si se realiza un embodegamiento a costo cero, los costos de producción no se asignarán a los productos, y no se calculará el costo por unidad embodegada. Esto afecta negativamente el cierre de ciclo de costos.

### ¿Cómo se realiza un embodegamiento en ContaPyme?
#### Respuesta
Para registrar un embodegamiento, sigue estos pasos:
1. Ve al **Manejador de Operaciones**.
2. Crea un nuevo **Embodegamiento**.
3. Ingresa la fecha.
4. Selecciona la bodega a la que ingresará el producto (ej. Producto Terminado).
5. Selecciona el o los productos a embodegar.
6. Ingresa la cantidad de cada producto.
7. Ingresa el costo estimado de embodegamiento para cada producto.
8. En el centro de costos productor, selecciona la línea, la orden o el cultivo del cual se está registrando la producción.
9. Finaliza la operación.

### ¿Cómo distribuye ContaPyme los costos cuando se embodegan varios productos en una misma operación?
#### Respuesta
ContaPyme distribuye los costos en función del costo de embodegamiento asignado a cada producto. Multiplica la cantidad de cada producto por su costo de embodegamiento. Luego, calcula un porcentaje de participación para cada producto basándose en el total de los costos de embodegamiento. Finalmente, aplica estos porcentajes a los costos acumulados para determinar la asignación de costos a cada producto.

### ¿Cómo puedo ver el informe de inventarios en ContaPyme?
#### Respuesta
Para ver el informe de inventarios:
1. Ve a **Informes**.
2. Selecciona **Inventarios**.
3. Selecciona **Saldos de Inventario**.
4. Filtra por la bodega deseada y/o el centro de costos productor para ver el inventario de una línea específica.

### ¿Cómo afecta el costo de embodegamiento al costo de ventas en ContaPyme?
#### Respuesta
Al realizar una venta, el costo de ventas se registra al costo estimado de embodegamiento. Si el costo real de producción difiere significativamente del costo estimado, el sistema realizará un ajuste al costo de ventas durante el cierre de ciclo de costos.

### ¿Cómo configurar ContaPyme para que sugiera un costo al embodegar?
#### Respuesta
Para configurar la sugerencia de costo al embodegar:
1. Ve a **Configuración**.
2. Busca la configuración de la **Operación de Embodegamiento**.
3. Define el tipo de costo a sugerir por producto: **Último Costo de Embodegamiento** o **Costo Promedio Ponderado**.
   * **No** selecciones "No sugerir ningún costo".

### ¿Qué es el embodegamiento de producto terminado compuesto y cómo funciona en ContaPyme?
#### Respuesta
El embodegamiento de producto terminado compuesto se utiliza cuando el producto terminado tiene una fórmula fija de componentes. Al realizar el embodegamiento, ContaPyme automáticamente consume los insumos y la materia prima especificados en la fórmula, y a su vez embodega el producto terminado.

### ¿Qué requisitos debe cumplir un producto para poder utilizar el embodegamiento de producto terminado compuesto?
#### Respuesta
El producto debe tener una fórmula fija de componentes, es decir, siempre que se produzca el producto terminado, se consumirán los mismos insumos y materias primas en las mismas cantidades.

### ¿Qué es el reintegro de materia prima en el embodegamiento?
#### Respuesta
El reintegro de materia prima en el embodegamiento permite devolver materia prima o productos elaborados a la bodega. Al marcar esta opción, ContaPyme revierte el consumo anterior, acreditando la cuenta del costo y volviendo a ingresar el producto a la cuenta de materias primas.

### ¿Qué es el "desembodegamiento" y cómo se produce en ContaPyme?
#### Respuesta
El "desembodegamiento" ocurre cuando se consume un producto que previamente se había embodegado en la misma línea de producción. En este caso, ContaPyme lo interpreta como una reversión del embodegamiento, debitando el producto en proceso y acreditando el producto terminado.

### ¿Qué es la transformación de productos en ContaPyme y cómo se relaciona con el embodegamiento?
#### Respuesta
La transformación de productos es una operación que combina un consumo y un embodegamiento en un solo paso. Permite transformar ciertos elementos origen en un producto destino. Es útil cuando la fórmula del producto no es fija y varía en cada producción.

---

# Ruta contable de costos
[Ver el video](https://www.youtube.com/watch?v=-jUwunqQr4U)
Ruta contable de los costos de producción en ContaPyme

## Tema principal
Explicación del flujo contable de costos de producción desde la compra de insumos hasta el costo de ventas.

## Resumen general
Este video explica la ruta contable de costos de producción, comenzando con la compra de insumos, pasando por el consumo, la planilla de labores, los costos indirectos, la autoactivación, el embogamiento y finalmente la facturación y ventas. Se aprende cómo cada operación afecta las diferentes cuentas contables y cómo interpretarlas para comprender el estado de los costos de producción. Se destaca la importancia de la autoactivación y el embogamiento para una correcta valoración del costo de ventas.

## Preguntas Frecuentes (FAQ)

### ¿Qué cuentas se afectan al realizar la compra de insumos?
#### Respuesta
Al comprar insumos, se genera un débito en la cuenta **1405 (materia prima)** y un crédito en la cuenta de la **forma de pago** (proveedores, banco o caja). Además, se registra la entrada del producto al inventario con sus cantidades y costo por unidad.

### ¿Cómo se realiza el consumo de insumos y qué cuentas se afectan?
#### Respuesta
El consumo de insumos se puede realizar de dos maneras:
1.  **Planilla de uso y consumo:** Genera un crédito al inventario de materia prima (disminuyendo el saldo en la bodega configurada para ese producto) y un débito a la cuenta **71 (costos de materia prima)**.
2.  **Operación de gastos:** Carga el costo directamente a la cuenta **71** y el centro de costos sería la orden, la línea o el cultivo correspondiente.

El consumo de insumos se realiza al costo promedio ponderado.

### ¿Dónde se configura la cuenta 71?
#### Respuesta
La cuenta **71** está configurada en el grupo de inventario al cual pertenece el insumo.

### ¿Qué cuentas se afectan al registrar la planilla de labores (o nómina)?
#### Respuesta
La planilla de labores genera un débito a la cuenta **72 (mano de obra directa)** y un crédito a la forma de pago (bancos, caja o cuenta por pagar al trabajador).

### ¿Dónde se configura la cuenta 72?
#### Respuesta
La cuenta **72** se configura en las diferentes labores. A cada labor se le debe configurar una cuenta **72**. En el caso de la nómina, la cuenta **72** estaría configurada en los diferentes conceptos de nómina.

### ¿Qué cuentas se afectan al registrar los costos indirectos?
#### Respuesta
Los costos indirectos generan un débito en la cuenta **73 (costos indirectos de fabricación)**. La contrapartida sería la forma de pago de la factura (caja, banco o cuenta por pagar). Este cargo a la cuenta **73** puede ser directo o a través de una distribución.

### ¿Qué es la autoactivación de costos y qué cuentas se afectan?
#### Respuesta
La autoactivación de costos es un proceso que cancela cada una de las cuentas **7 (71, 72 y 73)** y traslada sus saldos a la cuenta de **producto en proceso (1410)**. Se realiza mediante:
-   Un crédito a la cuenta **71** y un débito a la cuenta **1410**.
-   Un crédito a la cuenta **72** y un débito a la cuenta **1410**.
-   Un crédito a la cuenta **73** y un débito a la cuenta **1410**.

### ¿Cuándo funciona la autoactivación de costos?
#### Respuesta
La autoactivación solo funciona cuando los costos están cargados sobre unidades productivas (líneas, órdenes o cultivos). Si los costos están cargados en centros de costos que no son unidades productivas, la autoactivación no se realiza.

### ¿Cuál es el orden recomendado para las acciones de fin de mes?
#### Respuesta
El orden recomendado para las acciones de fin de mes es:
1.  Depreciaciones
2.  Traslados (de costos desde centros de costos indirectos a unidades productivas)
3.  Autoactivación

Es importante verificar, después de la autoactivación, que las cuentas **7** hayan quedado en cero y que todos los costos se hayan trasladado al producto en proceso.

### ¿Cómo se interpretan los movimientos de las cuentas 71, 72 y 73?
#### Respuesta
-   **Débitos:**
    -   **71:** Planillas de consumo o imputación directa por operación de gastos.
    -   **72:** Planillas de labores o nómina.
    -   **73:** Distribución de costos indirectos o costos imputados directamente por una operación de gastos.
-   **Créditos:** Autoactivación.

### ¿Qué es el embogamiento y qué cuentas se afectan?
#### Respuesta
El embogamiento es la operación a través de la cual se registra la producción generada por cada una de las unidades productivas. Genera un crédito a la cuenta de **producto en proceso (1410)** y un débito a la cuenta de **producto terminado (1430)**. Los embogamientos se realizan a costo estimado.

### ¿Qué indica un saldo débito en la cuenta 1410 después del embogamiento?
#### Respuesta
Un saldo débito en la cuenta **1410** indica que los costos que ha recibido esa unidad productiva son más altos que los costos a los que se han realizado los embogamientos. Esto puede significar que faltan embogamientos por realizar o que se está embogando por debajo del costo real.

### ¿Qué indica un saldo crédito en la cuenta 1410 después del embogamiento?
#### Respuesta
Un saldo crédito en la cuenta **1410** indica que los costos de embogamiento son más altos que los costos de producción que se han activado hasta el momento.

### ¿Qué cuentas se afectan al realizar la facturación y ventas?
#### Respuesta
La facturación y ventas afecta las siguientes cuentas:
-   **Costo:** Un crédito a la cuenta de **producto terminado (1430)** y un débito a la cuenta **61 (costo de ventas)**.
-   **Ingreso:** Un crédito al ingreso y un débito a la forma de pago (caja, banco o cuenta por cobrar).

### ¿Por qué el costo de ventas es estimado hasta que se realiza el cierre de ciclo de costos?
#### Respuesta
El costo de ventas es estimado porque viene de los embogamientos, y los embogamientos se realizan a costo estimado.

### ¿Cómo se realiza el consumo de insumos en ContaPyme?
#### Respuesta
El consumo se realiza a través de la operación de **Planilla de Uso y Consumo**:
1.  Ir a la opción: [Ruta del menú no especificada en la transcripción]
2.  Indicar la bodega.
3.  Indicar el producto que se va a consumir.
4.  Seleccionar la unidad productiva en la que se va a consumir.
5.  Seleccionar la labor que se está realizando.
6.  Indicar la cantidad que se va a consumir.

El sistema realizará el consumo al costo promedio ponderado, generando un crédito a la cuenta de materia prima y los débitos a la cuenta 71 por cada uno de los centros de costos.

### ¿Cómo se puede afectar directamente una cuenta 71 sin pasar por inventario?
#### Respuesta
Se puede afectar directamente una cuenta **71** a través de una **operación de gastos**. De esta forma, si un fertilizante no va a ingresar al inventario, sino que se va a consumir inmediatamente, se puede cargar directamente al lote donde se va a consumir. Es importante cargarlo directo a una unidad productiva o a un centro de costos indirecto para que a fin de mes se haga la distribución.

### ¿Cómo se configuran los traslados y la autoactivación en ContaPyme?
#### Respuesta
En ContaPyme se pueden realizar en una sola operación o por separado. Si se realizan por separado:
1.  Primero se realizan las depreciaciones.
2.  Después se realizan los traslados (de costos desde centros de costos indirectos a unidades productivas).
3.  Luego se realiza la autoactivación de cuentas.

### ¿Cómo se puede hacer seguimiento del costo en la cuenta 1410 (producto en proceso)?
#### Respuesta
Se puede activar la cuenta presupuesto. En el plan de cuentas, se activa la opción **Disponible para Presupuesto** en la cuenta **71, 72, y 73**. Luego, al consultar la cuenta **1410**, se puede ver el origen del costo (de qué cuenta **7** venía).

### ¿Cómo se valida que la cuenta 7 haya quedado en cero al final del mes?
#### Respuesta
Se genera un mayor y balances para validar que la cuenta **7** haya quedado en cero. Si queda algún saldo, es necesario revisar si se cargó algún costo a un centro de costos que no es una unidad productiva. Para verificar el detalle del saldo, se hace clic derecho sobre la cuenta **7** y se selecciona **Ver Movimiento Contable**. Se agrupa por centro de costos para identificar el centro de costos con el saldo.

### ¿Qué ocurre si se realizan embogamientos a costo cero?
#### Respuesta
Si se realizan embogamientos a costo cero, el sistema no podrá distribuir los costos sobre los diferentes productos de cada una de las unidades productivas. Por lo tanto, siempre se debe indicar un costo de embogamiento (costo estimado).

### ¿Dónde se configuran las cuentas de producto terminado y costo de ventas?
#### Respuesta
-   La cuenta de producto terminado está configurada en la bodega donde se ingresó el producto cuando se hizo el embogamiento.
-   La cuenta del costo de ventas está configurada en el grupo de inventario al que pertenece el elemento.

---

# Unidades productivas
[Ver el video](https://www.youtube.com/watch?v=0i6-6PySFIQ)
[0i6-6PySFIQ]

## Tema principal
Identificación y creación de unidades productivas (órdenes, líneas y cultivos) en ContaPyme y Agrowin.

## Resumen general
Este video explica qué son las unidades productivas dentro de ContaPyme y Agrowin, diferenciando entre órdenes de producción, líneas de producción (en el ámbito de manufactura) y cultivos transitorios y perennes (en el ámbito agrícola).  Se detalla cuándo es apropiado usar cada tipo de unidad productiva y cómo se crean dentro de los sistemas, resaltando la importancia de una estructura organizada para el manejo de costos.  Además, enfatiza la necesidad de considerar la forma en que se controla la materia prima y la mano de obra al decidir qué tipo de unidad productiva implementar.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una unidad productiva?
#### Respuesta
Una unidad productiva es el centro de costos que genera los productos o servicios finales de una empresa. En el contexto de producción y manufactura, las unidades productivas pueden ser órdenes de producción o líneas de producción. En Agrowin (para el sector agrícola), las unidades productivas son los cultivos.

### ¿Cuál es la diferencia entre una orden de producción y una línea de producción?
#### Respuesta
- **Órdenes de Producción:** Generalmente se utilizan cuando el costeo se basa en pedidos específicos de los clientes. Se crea una orden por cada pedido, controlando las cantidades pedidas versus las producidas. La orden se cierra una vez que el pedido se ha embodegado.
- **Líneas de Producción:** Se utilizan cuando la producción es independiente de los pedidos de los clientes. No controlan cantidades pedidas versus producidas y no necesitan ser cerradas tan pronto los pedidos están listos, sino que se realizan cierres periódicos.

### ¿Cuándo debo usar órdenes de producción en lugar de líneas de producción?
#### Respuesta
Si tiene la capacidad de separar cada pedido y detallar el consumo de materia prima correspondiente a cada orden, es recomendable usar órdenes de producción. Si es difícil detallar tanto la información, es preferible utilizar líneas de producción.  Algunas empresas usan ambos modelos, con líneas de producción para la producción general y órdenes de producción específicas para pedidos particulares.

### ¿Cómo funciona el ciclo de una orden de producción?
#### Respuesta
El ciclo de una orden de producción consta de los siguientes pasos:
1.  **Creación de la orden:** Se crea la orden de producción específicamente.
2.  **Registro de costos:** Se registran los costos asociados a la orden (materias primas, mano de obra, costos indirectos).
3.  **Registro de la producción:** Una vez que los productos están listos, se registran como producción embodegada con cargo a la orden de producción.
4.  **Cierre de la orden:** Cuando la producción está completa y el pedido ha sido cumplido, se cierra la orden.

### ¿Cómo funciona el ciclo de una línea de producción?
#### Respuesta
El ciclo de una línea de producción consta de los siguientes pasos:
1.  **Creación de la línea:** La línea de producción se crea como un centro de costos de producción.
2.  **Registro de costos:** Se registran los costos asociados a la línea (materias primas, mano de obra, costos indirectos).
3.  **Registro de la producción:** Se registra la producción obtenida de la línea.
4.  **Cierre de ciclo:** Se realiza un cierre de ciclo, teniendo en cuenta que para poder realizarlo deben existir costos registrados y producción registrada.
Una vez cerrado el primer ciclo, inmediatamente se inicia el siguiente ciclo repitiendo los pasos 2, 3 y 4.

### ¿Qué son los cultivos transitorios y perennes en Agrowin?
#### Respuesta
En Agrowin, los cultivos son las unidades productivas, y se clasifican en:
- **Cultivos Transitorios:** Son cultivos de un solo ciclo, es decir, tienen una única cosecha, similar a una orden de producción. Después de la cosecha se cierra y erradica el cultivo.
- **Cultivos Perennes:** Son cultivos con múltiples ciclos, es decir, tienen varias cosechas, similar a una línea de producción.  Tienen etapas de desarrollo y producción, con un cierre después de cada cosecha y una erradicación final después de muchas cosechas.

### ¿Cómo se crea una línea de producción en ContaPyme?
#### Respuesta
Las líneas de producción se crean en el explorador gráfico como un centro de costos de producción.
1.  Diríjase al **Explorador gráfico**.
2.  Seleccione el agrupador donde desea crear la línea de producción (ej. Líneas de Producción).
3.  Haga clic derecho y seleccione **Nuevo Centro de Costos**.
4.  Elija el tipo de centro de costos: **Centro de Costos de Producción**.
5.  Ingrese el código y el nombre de la línea de producción.
6.  Seleccione la cuenta de **Producto en Proceso** (1410).
7.  Complete los demás campos según sea necesario (Costos empresariales, actividad, área, población, clasificadores, vigencia).
8.  Guarde la información.

### ¿Cómo se crea una orden de producción en ContaPyme?
#### Respuesta
Las órdenes de producción se crean a través de una operación en el sistema.
1.  Diríjase al **Manejador de Operaciones**.
2.  Busque y seleccione la operación para crear órdenes de producción.
3.  Ingrese la información requerida:
    *   **Cliente:** El cliente al que se le está montando la orden.
    *   **Productos:** El producto y la cantidad que se deben producir.
    *   **Planeación de la orden:** Fechas estimadas de entrega.
    *   **Centro de costos padre:** El agrupador donde se colgará la orden en el explorador gráfico.
    *   **Bodega:** La bodega donde entrarán los productos cuando se hagan los embodegamientos.
    *   **Cuenta de Producto en Proceso.**
4.  Procese la operación.

### ¿Qué estructura de centros de costos es recomendable utilizar para costos de producción?
#### Respuesta
Se recomienda una estructura organizada por agrupadores:
*   **Empresa/Finca:**
    *   Agrupador para centros de costos de gastos e ingresos (nómina administrativa, servicios públicos, etc.).
    *   Agrupador para centros de costos indirectos (energía eléctrica, mano de obra del jefe de producción, etc.).
    *   Agrupador para maquinaria y equipo (si se desea costear las máquinas).
    *   Agrupador para distribuidores de costos (para distribuir los costos indirectos).
    *   Agrupador para órdenes de producción.
    *   Agrupador para líneas de producción.
    *   Agrupador para lotes (en el caso de fincas).

### ¿Cómo se crean los cultivos en Agrowin?
#### Respuesta
Los cultivos se crean a través del explorador, dentro del lote correspondiente.
1.  En el **Explorador**, ubique el lote donde se creará el cultivo.
2.  Haga clic derecho sobre el lote.
3.  Seleccione **Crear Cultivo Perenne** o **Crear Cultivo Transitorio**, según corresponda.
4.  Ingrese la información solicitada (nombre, código, cuenta de costos de desarrollo).
5.  Guarde la información.

---

# Órdenes de trabajo
[Ver el video](https://www.youtube.com/watch?v=FENdWP_Zy6M)
FENdWP_Zy6M

## Tema principal
Explicación del uso y configuración de órdenes de trabajo como centros de costos en ContaPyme.

## Resumen general
El video explica cómo utilizar las órdenes de trabajo en ContaPyme, diferenciando entre órdenes de costos y gastos y órdenes de inversión. Se aprende a crear y configurar órdenes de trabajo, imputar costos y gastos, y realizar la activación de órdenes de inversión para convertirlas en activos depreciables. Se destacan las implicaciones contables de cada tipo de orden y cómo manejar la depreciación según se utilicen cuentas de gastos (cuenta 5) o cuentas de costos indirectos (cuenta 7).

## Preguntas Frecuentes (FAQ)

### ¿Qué es una orden de trabajo en ContaPyme?
#### Respuesta
En ContaPyme, una orden de trabajo es un tipo especial de centro de costos que permite acumular todos los costos incurridos en la elaboración de una tarea o proyecto. A diferencia de los centros de costos básicos, una orden de trabajo de inversión puede convertirse en un activo una vez finalizada.

### ¿Cuáles son los dos tipos de órdenes de trabajo que existen en ContaPyme?
#### Respuesta
Existen dos tipos de órdenes de trabajo:
1.  **Órdenes de trabajo de costos y gastos:** Acumulan costos y gastos, pero no se convierten en activos.
2.  **Órdenes de trabajo de inversión:** Se convierten en activos una vez finalizadas y activadas.

### ¿Cómo se crea una orden de trabajo en ContaPyme?
#### Respuesta
A diferencia de otros centros de costos, las órdenes de trabajo no se crean directamente desde el explorador gráfico. Se crean a través de una operación en el manejador de operaciones. Sigue estos pasos:
1.  Asegúrate de tener un agrupador específico para las órdenes de trabajo en la estructura de tu empresa.
2.  Ve al **Manejador de Operaciones**.
3.  Ingresa por los **Asistentes de las Operaciones** y en la sección **Órdenes** selecciona **Orden de Trabajo**.
4.  Indica la fecha a partir de la cual existirá la orden de trabajo.
5.  Completa el detalle, el responsable (si aplica), la referencia (si aplica) y las instrucciones.
6.  Indica la fecha de inicio y la fecha estimada de entrega.
7.  Selecciona el **Centro de Costos Padre**, que debe ser tu agrupador de órdenes de trabajo.
8.  Indica la actividad (si vas a usar planillas de labores) y la clase de centro de costos (generalmente de gastos).
9.  Selecciona si la orden de trabajo actuará como una orden de costos y gastos o como una orden de inversión.
10. Dale **Finalizar**.

### ¿Cómo se imputan costos y gastos a una orden de trabajo de costos y gastos?
#### Respuesta
Las imputaciones a órdenes de trabajo de costos y gastos deben hacerse a través de cuentas de la clase 5 (gastos). Si se cargan saldos por la cuenta 7, estos no se activarán a final de mes y causarán problemas. La finalización de este tipo de orden de trabajo se realiza a través de una operación específica, que la marca como fuera de vigencia.

### ¿Cómo se imputan costos y gastos a una orden de trabajo de inversión?
#### Respuesta
En las órdenes de trabajo de inversión, los costos y gastos se pueden imputar a través de cuentas de la clase 5 o 7. Contablemente, todos los costos se reflejarán en una cuenta de construcciones en curso (normalmente la 1508).

### ¿Cómo se visualizan los costos imputados a una orden de trabajo?
#### Respuesta
Para visualizar los costos, párate en la orden de trabajo y a través de **Informes** solicita un **Informe de Costos**.

### ¿Qué pasa cuando se activa una orden de trabajo de inversión?
#### Respuesta
Cuando se activa una orden de trabajo de inversión, todos los costos acumulados en la cuenta 1508 (construcciones en curso) se convierten en un activo. Este activo se amortizará mensualmente, y esa amortización se cargará a un centro de costos.

### ¿Qué se debe tener en cuenta al momento de activar la orden de trabajo de inversión?
#### Respuesta
Al activar la orden de trabajo, debes definir si la depreciación se manejará por una cuenta 5 (gasto) o una cuenta 7 (costo indirecto). Si es por la cuenta 5, se lleva a un centro de costos de gastos. Si es por la cuenta 7, se debe llevar a un centro de costos indirecto o a una unidad productiva.

### ¿Cómo se realiza la activación de una orden de trabajo de inversión?
#### Respuesta
Sigue estos pasos:
1.  Ve al **Manejador de Operaciones**.
2.  Ingresa por los **Asistentes de las Operaciones** y en la sección **Órdenes** selecciona **Activación de orden de trabajo en desarrollo**.
3.  Indica la fecha de activación.
4.  Selecciona la orden de trabajo a activar.
5.  El sistema te preguntará si quieres finalizarla definitivamente como centro de costos; lo ideal es finalizarla.
6.  Crea un nuevo activo, asignándole un código y nombre.
7.  Especifica a qué centro de costos se le cargará la depreciación.
8.  Selecciona el grupo de activo (ej., construcción y edificación) y el tiempo de depreciación.
9.  Verifica el valor de la activación y dale **Finalizar**.

### ¿Qué sucede contablemente cuando se activa una orden de trabajo de inversión?
#### Respuesta
La cuenta de construcciones en curso (1508) se cancela, y se debita la cuenta de propiedad, planta y equipo correspondiente al activo creado.

### ¿Cómo se configura la cuenta de depreciación de un activo proveniente de una orden de trabajo de inversión?
#### Respuesta
Para configurar la cuenta de depreciación, sigue estos pasos:
1.  Edita el grupo de activos al cual pertenece el activo creado durante la activación de la orden de trabajo (ej., 15 16).
2.  En el manejo contable del grupo de activos, especifica la cuenta de depreciación.
    *   Si quieres que la depreciación se vaya por una cuenta 5, selecciona una cuenta de gastos de depreciación.
    *   Si quieres que se vaya por una cuenta 7, selecciona una cuenta de costos indirectos.

### ¿Qué se debe hacer si se lleva la depreciación a una cuenta 7 después de la activación?
#### Respuesta
Si la depreciación se lleva a una cuenta 7, asegúrate de que el centro de costos al que se imputa sea un centro de costos indirecto o una unidad productiva. Esto es importante para evitar problemas al hacer la autoactivación de cuentas a fin de mes.
