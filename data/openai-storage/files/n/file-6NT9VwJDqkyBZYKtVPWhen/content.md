# ContaExcel Add In Sesión Práctica - 16/05/2014
[Ver el video](https://www.youtube.com/watch?v=oV_IGu6ssrc)
ContaExcel Add In Sesión Práctica - 16/05/2014

## Tema principal
Conectar Excel con ContaPyme/Agrowin para generar informes personalizados.

## Resumen general
Este video explica cómo usar ContaExcel Add-in para crear informes personalizados en Excel utilizando datos de ContaPyme o Agrowin. Se demuestran cuatro ejemplos completos: Balance General, Cartera por Edades, Inventarios y Ventas, y Estado de Resultados NIF. El objetivo es mostrar cómo extraer información directamente desde la base de datos de ContaPyme/Agrowin hacia Excel, permitiendo a los usuarios personalizar la presentación de los datos y agregar información adicional que no se puede obtener directamente desde ContaPyme. Se aprende a usar funciones de ContaExcel, funciones de Excel y formatos condicionales para crear informes útiles y visualmente atractivos.

## Preguntas Frecuentes (FAQ)

### ¿Qué es ContaExcel y qué permite hacer?
#### Respuesta
ContaExcel es un Add-in para Excel que permite conectar Excel con la base de datos de ContaPyme o Agrowin. Esto te permite escribir funciones en Excel que extraen información directamente de tu base de datos contable y crear informes personalizados.

### ¿Qué tipo de informes se pueden generar con ContaExcel?
#### Respuesta
Se pueden generar diversos informes, como:
- Balance General
- Cartera por Edades
- Inventarios y Ventas
- Estado de Resultados (NIF)

### ¿Cómo se escribe una fecha en Excel para evitar errores al usar ContaExcel?
#### Respuesta
Se recomienda utilizar la función `FECHA(año, mes, día)` de Excel para asegurar que la fecha se interprete correctamente, independientemente de la configuración regional del equipo.

### ¿Cómo se obtiene el nombre de una empresa usando ContaExcel?
#### Respuesta
Se utiliza la función `NombreEmpresa(identificador_empresa)`. Esta función devuelve el nombre de la empresa asociado al identificador especificado. Por ejemplo, si la empresa con identificador "1" es "MP Computadores", la función `NombreEmpresa(1)` devolverá "MP Computadores".

### ¿Cómo se obtiene el nombre de una cuenta contable?
#### Respuesta
Se utiliza la función `NombreCuenta(codigo_cuenta)`. Esta función retorna el nombre o descripción de la cuenta según el plan de cuentas de ContaPyme.

### ¿Cómo se calcula el saldo de una cuenta en una fecha específica?
#### Respuesta
Se utiliza la función `SaldoCuenta(identificador_cuenta, fecha_final, empresa, centro_costos, manejo_NIF)`. Los parámetros son:
1.  **identificador_cuenta:** El código de la cuenta.
2.  **fecha_final:** La fecha hasta la cual se calculará el saldo.
3.  **empresa:** El identificador de la empresa.
4.  **centro_costos:** (Opcional) El centro de costos.
5.  **manejo_NIF:** (Opcional) Parámetro para manejo NIF.

    Ejemplo: `=SaldoCuenta(A1,B1,C1)` donde A1 contiene el código de la cuenta, B1 la fecha final y C1 el identificador de la empresa.

### ¿Cómo se obtienen los débitos o créditos de una cuenta en un periodo determinado?
#### Respuesta
Se utiliza la función `MobCuentaDC(identificador_cuenta, identificador_debito_credito, fecha_inicial, fecha_final, empresa, centro_costos, manejo_NIF)`. Los parámetros son:
1.  **identificador_cuenta:** El código de la cuenta.
2.  **identificador_debito_credito:** "D" para débitos o "C" para créditos.
3.  **fecha_inicial:** La fecha de inicio del período.
4.  **fecha_final:** La fecha de fin del período.
5.  **empresa:** El identificador de la empresa.
6.  **centro_costos:** (Opcional) El centro de costos.
7.  **manejo_NIF:** (Opcional) Parámetro para manejo NIF.

    Ejemplo: `=MobCuentaDC(A1,"D",B1,C1,D1)` donde A1 es la cuenta, "D" indica débitos, B1 la fecha inicial, C1 la fecha final y D1 el identificador de la empresa.

### ¿Cómo se calcula el saldo de varias cuentas simultáneamente?
#### Respuesta
Se puede pasar una lista de cuentas separadas por comas a la función `SaldoCuenta`. Por ejemplo, `SaldoCuenta("4,5,6", fecha, empresa)` calculará el saldo combinado de las cuentas 4, 5 y 6.

### ¿Qué consideraciones especiales se deben tener al trabajar con la cuenta 3 (Patrimonio) en ContaExcel?
#### Respuesta
A diferencia de otras cuentas, la cuenta 3 en ContaPyme incluye la utilidad del ejercicio calculada por separado. En ContaExcel, se debe calcular la utilidad del ejercicio por separado (sumando los saldos de las cuentas 4, 5 y 6) y luego sumarla al saldo de la cuenta 3 para obtener el valor correcto del patrimonio.

### ¿Cómo se calcula la Cartera por Edades con ContaExcel?
#### Respuesta
Se utiliza la función `CarteraPorEdad(identificador_cuenta, tercero, CxC_CxP, fecha_inicial, fecha_final, empresa)`. Los parámetros son:
1.  **identificador_cuenta:** El código de la cuenta de cartera. Dejar vacío para todas las cuentas.
2.  **tercero:** El identificador del tercero. Dejar vacío para todos los terceros.
3.  **CxC_CxP:** "CxC" para cuentas por cobrar, "CxP" para cuentas por pagar.
4.  **fecha_inicial:** La fecha de inicio del período.
5.  **fecha_final:** La fecha de fin del período.
6.  **empresa:** El identificador de la empresa.

### ¿Cómo se obtienen los elementos de inventario en ContaExcel?
#### Respuesta
Se puede acceder a los elementos de inventario mediante los "seleccionadores" de ContaExcel. Para ello:

1.  Ubícate en la celda donde deseas que aparezca el primer elemento.
2.  Ve a la pestaña **ContaExcel** en la cinta de opciones de Excel.
3.  Haz clic en **Elementos de Inventario**.
4.  Selecciona los elementos deseados de la lista que aparece.
5.  Haz clic en el botón **Seleccionar**.

### ¿Cómo se obtiene el nombre de un elemento de inventario usando ContaExcel?
#### Respuesta
Se utiliza la función `NombreElemento(codigo_elemento)`. Esta función retorna el nombre del elemento de inventario según su código.

### ¿Cómo se calcula la cantidad de ventas de un elemento de inventario?
#### Respuesta
Se utiliza la función `CantidadVentas(bodega, elemento, fecha_inicial, fecha_final, empresa)`. Los parámetros son:

1.  **bodega:** El código de la bodega.
2.  **elemento:** El código del elemento de inventario.
3.  **fecha_inicial:** La fecha de inicio del período.
4.  **fecha_final:** La fecha de fin del período.
5.  **empresa:** El identificador de la empresa.

### ¿Cómo se calcula el costo de ventas de un elemento de inventario?
#### Respuesta
Se utiliza la función `CostoDeVentas(bodega, elemento, fecha_inicial, fecha_final, empresa)`. Los parámetros son los mismos que para la función `CantidadVentas`.

### ¿Cómo se calculan los ingresos por venta de un elemento de inventario?
#### Respuesta
Se utiliza la función `IngresosPorVenta(bodega, elemento, fecha_inicial, fecha_final, empresa)`. Los parámetros son los mismos que para las funciones `CantidadVentas` y `CostoDeVentas`.

### ¿Cómo se convierte un valor negativo a positivo en Excel?
#### Respuesta
Se pueden utilizar dos métodos:
1.  Multiplicar el valor por -1 (Ej: `=A1*-1`).
2.  Usar la función `ABS(valor)` (Ej: `=ABS(A1)`).

### ¿Cómo se crea un estado de resultados por función (NIF) en Excel con ContaExcel?
#### Respuesta

1.  **Estructura del informe:** Define las columnas fijas: Cuenta, Nombre de la Cuenta y Movimiento.
2.  **Encabezado:** Incluye la empresa, nombre de la empresa, año de referencia, fecha inicial y fecha final.
3.  **Ingresos Operacionales:** Usa la cuenta 41.
4.  **Costo de las Ventas:** Usa las cuentas 61 y 62.
5.  **Utilidad Bruta:** Suma los ingresos operacionales y el costo de las ventas.
6.  **Gastos de Administración y Generales:** Usa la cuenta 51.
7.  **Gastos de Venta:** Usa la cuenta 52.
8.  **Utilidad o Pérdida Operacional:** Resta los gastos de administración y generales y los gastos de venta a la utilidad bruta.
9.  **Ingresos No Operacionales:** Usa la cuenta 42.
10. **Gastos No Operacionales:** Usa la cuenta 53.
11. **Utilidad o Pérdida No Operacional:** Suma los ingresos no operacionales y los gastos no operacionales.
12. **Utilidad o Pérdida Antes de Impuestos:** Suma la utilidad o pérdida operacional y la utilidad o pérdida no operacional.
13. **Impuesto a las Ganancias:** Ingresa este valor manualmente.
14. **Utilidad o Pérdida del Ejercicio:** Resta el impuesto a las ganancias a la utilidad o pérdida antes de impuestos.
15. **Ganancia por Acción:** Divide la utilidad o pérdida del ejercicio entre la cantidad de acciones.

### ¿Cómo se crea un estado de resultados por naturaleza (NIF) en Excel con ContaExcel?
#### Respuesta

1.  **Partir del estado de resultados por función:** Utiliza el mismo formato y estructura.
2.  **Desglosar las cuentas:** Inserta filas adicionales para cada auxiliar de las cuentas principales (41, 61, 62, 51, 52, etc.).
3.  **Seleccionar las cuentas auxiliares:** Utiliza el selector de cuentas de ContaExcel para seleccionar todas las cuentas auxiliares de cada cuenta principal.
4.  **Copiar el nombre de la cuenta:** Copia el nombre de cada cuenta auxiliar en su respectiva fila.
5.  **Formular las celdas:** Usa la función `MobCuenta` para cada cuenta auxiliar en el rango de fechas especificado.
6.  **Sumar los auxiliares:** En la fila de la cuenta principal, suma los valores de todas sus cuentas auxiliares.
7.  **Repetir:** Repite este proceso para todas las cuentas principales hasta completar el informe.
8.  **Verificar:** Asegúrate de que el resultado final sea idéntico al del estado de resultados por función.

### ¿Cómo se usa la función `MobCuenta`?
#### Respuesta
Se utiliza la función `MobCuenta(cuenta, fecha_inicial, fecha_final, empresa, centro_costos, manejo_NIF)`.
1.  **cuenta:** El código de la cuenta.
2.  **fecha_inicial:** La fecha de inicio del período.
3.  **fecha_final:** La fecha de fin del período.
4.  **empresa:** El identificador de la empresa.
5.  **centro_costos:** (Opcional) El centro de costos.
6.  **manejo_NIF:** (Opcional) Parámetro para manejo NIF.

---

# ContaExcel con conexión a ContaPyme
[Ver el video](https://www.youtube.com/watch?v=Izq7nXlKbM0)
Conta Excel 2.0 con conexión a ContaPyme

## Tema principal
Conexión, funcionalidades y uso de ContaExcel 2.0 conectado a ContaPyme.

## Resumen general
Este video explica cómo conectar ContaExcel 2.0 a ContaPyme, lo que permite aprovechar las ventajas de consultar información directamente desde la base de datos. Se detallan los pasos para establecer la conexión, se describen las diferentes secciones y funcionalidades disponibles en la pestaña ContaPyme, incluyendo los seleccionadores de catálogos y el sistema de ayuda. Además, se explican los tres tipos de funciones de ContaPyme (valores, atributos y filtro) y cómo acceder a ellas, así como el uso del sistema de ayuda integrado para cada función.

## Preguntas Frecuentes (FAQ)

### ¿Cómo me conecto a ContaPyme desde ContaExcel 2.0?
#### Respuesta
Para conectarte a ContaPyme desde ContaExcel 2.0, sigue estos pasos:

1.  Abre la aplicación ContaExcel 2.0 (icono de hoja verde).
2.  Ve a la pestaña **ContaPyme**.
3.  Haz clic en la opción **Conectar con ContaPyme**.
4.  Ingresa los datos de conexión:
    *   Servidor de datos
    *   Usuario
    *   Contraseña
    *   Área de trabajo
    *   Licencia
5.  Haz clic en **Conectar**. El sistema realizará una copia de seguridad de la base de datos de ContaPyme.

### ¿Qué información se muestra una vez conectado a ContaPyme en ContaExcel 2.0?
#### Respuesta
Una vez que te has conectado correctamente a ContaPyme, en la parte inferior de la ventana de ContaExcel 2.0 podrás ver la siguiente información:

*   La empresa a la que te has conectado
*   La fecha de trabajo
*   El usuario actual
*   La versión de ContaExcel

### ¿Qué opciones encuentro en la pestaña ContaPyme una vez que estoy conectado a la base de datos?
#### Respuesta
Una vez conectado a la base de datos, la pestaña ContaPyme se modifica y muestra tres secciones principales:

*   **Conexión:** Permite desconectar ContaExcel de la base de datos o cambiar de área de trabajo.
*   **Seleccionadores:** Contiene accesos directos a los principales catálogos de ContaPyme (terceros, cuentas, elementos de inventario, centros de costos, actividades, labores).
*   **Ayuda:** Ofrece acceso al panel de ayuda y a un visor de errores.

### ¿Cómo me desconecto de la base de datos de ContaPyme desde ContaExcel 2.0?
#### Respuesta
Para desconectarte de la base de datos de ContaPyme, ve a la pestaña **ContaPyme** y haz clic en el botón **Desconectar** dentro de la sección **Conexión**.  ContaExcel volverá a funcionar como una hoja de cálculo normal.

### ¿Cómo cambio de área de trabajo en ContaExcel 2.0 sin cerrar la conexión a ContaPyme?
#### Respuesta
Para cambiar de área de trabajo sin cerrar la conexión, ve a la pestaña **ContaPyme**, y haz clic en la opción **Cambiar área de trabajo** que está en la sección **Conexión**. Se abrirá nuevamente la ventana de conexión a ContaPyme, donde podrás seleccionar el área de trabajo deseada.

### ¿Para qué sirven los seleccionadores en la pestaña ContaPyme?
#### Respuesta
Los seleccionadores te permiten acceder rápidamente a los catálogos de ContaPyme, como el de terceros, cuentas, elementos de inventario, etc.  Puedes seleccionar elementos de estos catálogos y cargarlos en tu hoja de cálculo.

### ¿Cómo selecciono un tercero desde el seleccionador de terceros en ContaExcel 2.0?
#### Respuesta
Para seleccionar un tercero:

1.  En la pestaña **ContaPyme**, haz clic en el botón **Seleccionador de terceros**.
2.  En el listado que se abre, selecciona el tercero deseado.
3.  Haz clic en el botón **Seleccionar**.  El código del tercero se cargará en la celda de ContaExcel.

### ¿Cómo selecciono un rango de cuentas en el seleccionador de cuentas de ContaExcel 2.0?
#### Respuesta
Para seleccionar un rango de cuentas:

1.  En la pestaña **ContaPyme**, haz clic en el botón **Seleccionador de cuentas**.
2.  Selecciona la primera cuenta del rango.
3.  Mantén presionada la tecla **Shift** y usa las flechas de desplazamiento para seleccionar las demás cuentas del rango.
4.  Haz clic en el botón **Seleccionar**. El listado de cuentas se cargará en la celda de ContaExcel.

### ¿Cómo accedo a la ayuda de ContaExcel 2.0?
#### Respuesta
Para acceder a la ayuda de ContaExcel 2.0, puedes hacer clic en el botón para activar el panel de ayuda dentro de la sección de **Ayuda** en la pestaña **ContaPyme**, o puedes presionar la tecla **F1**.

### ¿Qué tipo de información puedo encontrar en la ayuda de ContaExcel 2.0?
#### Respuesta
En la ayuda de ContaExcel 2.0, encontrarás información sobre:

*   Cómo iniciar con ContaExcel
*   Ayuda de las funciones clásicas de Excel (financieras, de lógica, de texto, matemáticas)
*   Ayuda específica de las funciones de ContaPyme (contabilidad, cartera, inventarios, activos, labores, contratos, terceros, centros de costos, entorno, fecha, operaciones, filtros)

### ¿Cuáles son los tipos de funciones de ContaPyme disponibles en ContaExcel 2.0?
#### Respuesta
Existen tres tipos de funciones de ContaPyme:

*   **Funciones de valores:** Permiten consultar datos y valores en general (ej: saldo de una cuenta).
*   **Funciones de atributo:**  Traen datos informativos de registros (ej: nombre de un tercero).
*   **Funciones de filtro:** Permiten realizar consultas más específicas (ej: valor de las ventas por un vendedor).

### ¿Cómo accedo a las funciones de ContaPyme en ContaExcel 2.0?
#### Respuesta
Para acceder a las funciones de ContaPyme, ve a la pestaña **Fórmulas** y busca la sección **Funciones de ContaPyme**. Las funciones están organizadas por módulos (contabilidad, cartera, inventarios, activos, labores, contratos, terceros, centros de costos, entorno, fecha, operaciones y filtros).

### ¿Cómo obtengo ayuda sobre una función específica de ContaPyme en ContaExcel 2.0?
#### Respuesta
Para obtener ayuda sobre una función específica, selecciónala en la pestaña **Fórmulas**.  Si no indicas ningún parámetro y das Enter, la función se cargará mostrando cada uno de sus parámetros. Ubícate sobre la fórmula y presiona la tecla **F1**. Se abrirá la ayuda específica de esa función.

### ¿Qué información contiene la ayuda específica de cada función de ContaPyme?
#### Respuesta
La ayuda de cada función contiene:

*   La descripción de la función
*   La sintaxis (parámetros que requiere la función)
*   Una tabla que describe cada argumento (formato, descripción, resultado si se deja vacío)
*   Un ejemplo del uso de la función con toda la explicación necesaria

---

# ContaExcel sin conexión a ContaPyme
[Ver el video](https://www.youtube.com/watch?v=T9Zp-y6wnY0)
ContaExcel sin conexión a ContaPyme

## Tema principal
Usar Contaxtel 2.0 como hoja de cálculo sin conexión a ContaPyme.

## Resumen general
Este video explica cómo utilizar Contaxtel 2.0 como una hoja de cálculo independiente, sin necesidad de conexión a ContaPyme. Se detallan las funcionalidades básicas de la interfaz, el uso de funciones y fórmulas, la inserción y eliminación de celdas, la fijación de celdas y el formato condicional. El objetivo es demostrar cómo Contaxtel puede ser una herramienta útil para el manejo de datos y cálculos, aprovechando sus similitudes con Microsoft Excel.

## Preguntas Frecuentes (FAQ)

### ¿Cómo ingreso a Contaxtel 2.0?
#### Respuesta
Para ingresar a Contaxtel 2.0, busca el ícono en el escritorio que se identifica como una hoja de color verde. Haz doble clic sobre el ícono para abrir la aplicación.

### ¿Qué opciones encuentro en la pestaña "Inicio" de Contaxtel 2.0?
#### Respuesta
En la pestaña "Inicio" de Contaxtel 2.0, encuentras las opciones básicas de:
- Fuente
- Alineación
- Formato para número
- Formato condicional
- Insertar y eliminar celdas
- Modificar y buscar.

### ¿Qué puedo insertar desde la pestaña "Insertar" en Contaxtel 2.0?
#### Respuesta
Desde la pestaña "Insertar", puedes insertar:
- Imágenes
- Formas
- Hipervínculos.

### ¿Qué puedo hacer en la pestaña "Diseño de página" de Contaxtel 2.0?
#### Respuesta
En la pestaña "Diseño de página" puedes realizar la configuración de la página para la impresión.

### ¿Qué funciones se encuentran en la pestaña "Fórmulas" de Contaxtel 2.0?
#### Respuesta
En la pestaña "Fórmulas", encuentras:
- La biblioteca de funciones propias de Contaxtel.
- Las funciones propias de ContaPyme (que se utilizan cuando hay conexión directa a la base de datos de ContaPyme).
- La opción del cálculo de fórmulas.

### ¿Qué opciones ofrece la pestaña "Datos" en Contaxtel 2.0?
#### Respuesta
En la pestaña "Datos" encuentras opciones para:
- Ordenar
- Hacer agrupación
- Definir tablas para aplicar filtros.

### ¿Qué funciones puedo realizar en la pestaña "Revisar" de Contaxtel 2.0?
#### Respuesta
En la pestaña "Revisar" puedes:
- Ingresar comentarios
- Proteger el libro o la hoja.

### ¿Qué opciones tengo disponibles en la pestaña "Vista" de Contaxtel 2.0?
#### Respuesta
En la pestaña "Vista", puedes:
- Mostrar las cuadrículas y títulos.
- Hacer zoom sobre la hoja.
- Inmovilizar paneles.
- Exportar a PDF.
- Cambiar la apariencia de Contaxtel.

### ¿Qué puedo hacer desde la pestaña "ContaPyme" en Contaxtel 2.0?
#### Respuesta
Desde la pestaña "ContaPyme", puedes:
- Conectar a ContaPyme.
- Acceder al panel de ayudas (también accesible con la tecla F1).

### ¿Qué tipo de funciones puedo usar en Contaxtel?
#### Respuesta
Contaxtel ofrece una gran variedad de funciones, incluyendo:
- Funciones básicas (suma, promedio, contar).
- Funciones financieras.
- Funciones de fecha y hora.
- Funciones de texto.
- Funciones matemáticas y trigonométricas.

### ¿Cómo uso las funciones en Contaxtel?
#### Respuesta
Para usar cualquier función, sigue estos pasos:
1.  Ubícate en la celda donde quieres que aparezca el resultado.
2.  Coloca el símbolo igual (=).
3.  Escribe la función (si la conoces) o insértala desde el menú **Fórmulas > Insertar función**.
4.  Selecciona con el mouse las celdas que intervendrán en la operación. **Importante**: No uses las flechas de desplazamiento para seleccionar las celdas dentro de la fórmula.
5.  Presiona Enter.

### ¿Cómo puedo insertar una celda en Contaxtel?
#### Respuesta
Para insertar una celda, sigue estos pasos:
1. Ubícate en la fila donde deseas insertar la celda.
2. Haz clic derecho y selecciona la opción "Insertar".
También puedes usar el comando **Control + (+)**.

### ¿Cómo puedo eliminar una celda en Contaxtel?
#### Respuesta
Para eliminar una celda, sigue estos pasos:
1. Ubícate en la fila que deseas eliminar.
2. Haz clic derecho y selecciona la opción "Eliminar".
También puedes usar el comando **Control + (-)**.

### ¿Qué es el "cálculo automático" y cómo afecta las fórmulas en Contaxtel?
#### Respuesta
El "cálculo automático" es una opción que permite que las fórmulas se recalculen constantemente cada vez que se modifica un dato. Si esta opción está activada, Contaxtel recalculará las fórmulas automáticamente. Si está desactivada, debes usar el botón "Recalcular fórmulas" para actualizar los resultados.

### ¿Cuándo es recomendable tener activada la opción de cálculo automático?
#### Respuesta
Es recomendable tener activa la opción de cálculo automático si tienes libros con fórmulas livianas y poca información.

### ¿Cuándo es recomendable desactivar la opción de cálculo automático?
#### Respuesta
Si tienes muchas fórmulas con gran cantidad de datos, es recomendable no tener activa esta opción, ya que puede causar lentitud. En este caso, es mejor utilizar la opción "Recalcular fórmulas" cuando necesites actualizar los resultados.

### ¿Cómo copio una fórmula en Contaxtel a otras celdas?
#### Respuesta
Para copiar una fórmula a otras celdas, sigue estos pasos:
1. Ubícate en la celda que contiene la fórmula que deseas copiar.
2.  Posiciona el cursor en la esquina inferior derecha de la celda hasta que aparezca una cruz de color negro.
3. Haz clic y arrastra la cruz hacia las celdas donde deseas copiar la fórmula.

### ¿Cómo fijo una celda en una fórmula en Contaxtel?
#### Respuesta
Para fijar una celda en una fórmula (para que no se modifique al copiar la fórmula a otras celdas), sigue estos pasos:
1. Ubícate en la celda que contiene la fórmula que deseas modificar.
2. Presiona la tecla **F2** para editar la fórmula.
3. Ubícate dentro de la fórmula en la referencia a la celda que deseas fijar (ejemplo: E10).
4. Agrega el signo de pesos ($) antes de la letra de la columna y antes del número de la fila. Por ejemplo, E10 se convierte en $E$10.
5. Presiona Enter.

### ¿Cómo uso el formato condicional en Contaxtel?
#### Respuesta
Para usar el formato condicional, sigue estos pasos:
1. Selecciona las celdas a las que deseas aplicar el formato condicional.
2. Ve a la pestaña "Inicio".
3. Haz clic en "Formato condicional".
4. Elige la opción que desees utilizar (escala de color, barra de datos, iconos de tendencia, reglas de superior e inferior, o reglas avanzadas).
5. Sigue las instrucciones para configurar el formato condicional según tus necesidades.

---

# Duplicación Operaciones en Bloque R8
[Ver el video](https://www.youtube.com/watch?v=7ixdRhlaMXY)

## Tema principal
Duplicación masiva de operaciones en ContaPyme.

## Resumen general
Este video explica cómo utilizar la funcionalidad de duplicación en bloque de operaciones en ContaPyme. Permite duplicar múltiples transacciones simultáneamente, filtrándolas por fecha, tipo de documento o tipo de operación. Se aprende a seleccionar las operaciones a duplicar, ajustar las fechas de las copias y asignar un detalle común a todas ellas, simplificando la gestión de transacciones repetitivas como nóminas o pagos.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la duplicación en bloque de operaciones en ContaPyme?
#### Respuesta
Es una funcionalidad que permite duplicar múltiples operaciones o transacciones simultáneamente en ContaPyme. En lugar de duplicar cada operación individualmente, puedes seleccionar un conjunto de operaciones basadas en criterios de filtro y duplicarlas todas a la vez.

### ¿En qué parte de ContaPyme se encuentra la opción de duplicación en bloque?
#### Respuesta
La opción de duplicación en bloque se encuentra en el **Manejador de Operaciones**. Dentro de este menú, verás la opción tradicional de "Duplicar operación" y, junto a ella, la nueva opción "Duplicar en bloque".

### ¿La funcionalidad de duplicación en bloque está disponible para todas las operaciones del sistema?
#### Respuesta
Sí, la duplicación en bloque está disponible para todas las operaciones dentro de tu licenciamiento de ContaPyme. No depende de módulos específicos o licenciamiento adicional.

### ¿Qué filtros puedo aplicar al usar la duplicación en bloque?
#### Respuesta
Puedes filtrar las operaciones por:
- **Fecha inicial y fecha final:** Define un rango de fechas para seleccionar las operaciones a duplicar.
- **Tipo de documento:** Elige un tipo de documento específico (ej., comprobante de egreso, recibo de caja) para filtrar las operaciones.
- **Tipo de operación:** Selecciona un tipo de operación específico (ej., nómina contable) para duplicar.

### ¿Cómo se aplican los filtros en la duplicación en bloque?
#### Respuesta
1.  Navega al **Manejador de Operaciones > Duplicar en bloque**.
2.  En la sección de **Filtros**, selecciona la fecha inicial, fecha final, el tipo de documento o el tipo de operación que desees.
3.  Haz clic en **Aplicar filtro**.

### ¿Qué información se muestra después de aplicar los filtros?
#### Respuesta
Después de aplicar los filtros, el sistema mostrará una lista detallada de las operaciones que cumplen con los criterios seleccionados. Podrás ver cuáles operaciones están procesadas y elegir cuáles duplicar.

### ¿Cómo elijo qué operaciones duplicar de la lista filtrada?
#### Respuesta
Cada operación en la lista tendrá una casilla de verificación. Habilita la casilla junto a las operaciones que deseas duplicar. Si la casilla está habilitada, la operación se duplicará; si está deshabilitada, no se duplicará.

### ¿Qué acciones puedo realizar en cuanto a las fechas de las operaciones duplicadas?
#### Respuesta
Puedes elegir entre las siguientes opciones para ajustar las fechas de las operaciones duplicadas:
- **Incrementar en una fecha específica.**
- **Incrementar en una semana.**
- **No incrementar la fecha.**
- **Incrementar en un número específico de días.**
- **Asignar una fecha específica.**

### ¿Cómo asigno una fecha específica a las operaciones duplicadas?
#### Respuesta
1. Navega al **Manejador de Operaciones > Duplicar en bloque**.
2. Aplica los filtros necesarios.
3. En la sección de **Acciones**, selecciona la opción "Asignar una fecha en especial".
4. Introduce la fecha deseada en el campo provisto.
5. Haz clic en **Aceptar** para iniciar la duplicación.

### ¿Puedo asignar un detalle específico a las operaciones duplicadas?
#### Respuesta
Sí, puedes asignar un detalle en especial que se aplicará a todas las operaciones duplicadas.

### ¿Cómo asigno un detalle a las operaciones duplicadas?
#### Respuesta
1. Navega al **Manejador de Operaciones > Duplicar en bloque**.
2. Aplica los filtros necesarios.
3. En la sección de **Acciones**, introduce el detalle deseado en el campo de texto correspondiente.
4. Haz clic en **Aceptar** para iniciar la duplicación.

### ¿Qué debo hacer después de duplicar las operaciones?
#### Respuesta
Una vez que las operaciones se han duplicado, debes procesar las transacciones. A partir de ahí, las operaciones quedan registradas.

### ¿Qué pasa si necesito modificar datos en las operaciones duplicadas?
#### Respuesta
Después de duplicar y procesar las operaciones, puedes modificar los datos de cada operación individualmente. Por ejemplo, si necesitas cambiar información de un empleado en una nómina, puedes editar esa operación específica.

---

# Funciones con filtro
[Ver el video](https://www.youtube.com/watch?v=jfY-nwym894)
Funciones con filtro

## Tema principal
Uso de funciones con filtro en ContaPyme para obtener información específica.

## Resumen general
Este video explica cómo utilizar las funciones con filtro en ContaPyme para realizar consultas más específicas sobre la información contable y de inventario. Se aprende a aplicar filtros a funciones de saldo de cuenta e ingresos por ventas, utilizando tanto la digitación directa de los parámetros como la referencia a celdas con información del catálogo. Finalmente, se muestra cómo armar un informe de ingresos y gastos por vendedor usando estas funciones.

## Preguntas Frecuentes (FAQ)

### ¿Qué son las funciones tipo filtro en ContaPyme?
#### Respuesta
Las funciones tipo filtro permiten determinar un filtro de información que puede ser usado en las funciones de valores para hacer consultas más específicas.

### ¿Dónde puedo encontrar la lista de filtros disponibles en ContaPyme?
#### Respuesta
Los filtros se encuentran en la pestaña **Fórmulas > Filtros**. Allí se pueden encontrar filtros generales, de movimiento contable, de movimiento de inventario, de plan de cuentas, de terceros, de tipo de movimiento de inventario y de tipo de terceros.

### ¿Qué tipos de filtros puedo aplicar en las funciones de valor?
#### Respuesta
ContaPyme ofrece una variedad de filtros, incluyendo:
*   Filtros generales
*   Filtros de movimiento contable
*   Filtros de movimiento de inventario
*   Filtros de plan de cuentas
*   Filtros de terceros
*   Filtros de tipo de movimiento de inventario
*   Filtros de tipo de terceros

### ¿Cómo puedo utilizar la función "Saldo Cuenta Filtro"?
#### Respuesta
La función "Saldo Cuenta Filtro" determina el saldo de una o más cuentas con un filtro específico. Para utilizarla, sigue estos pasos:

1.  Abre la ayuda de la función para ver los parámetros requeridos.
2.  Ingresa el identificador de la cuenta.
3.  Ingresa el filtro que deseas aplicar.
4.  Ingresa la fecha final.
5.  Ingresa el identificador de la empresa.
6.  Ingresa el identificador del centro de costos.
7.  Ingresa el tipo de contabilización.

### ¿Cómo puedo encontrar el filtro correcto para usar en la función "Saldo Cuenta Filtro"?
#### Respuesta
Puedes encontrar los filtros en **Fórmulas > Filtros**. Busca el filtro que corresponda al tipo de información que deseas filtrar (por ejemplo, "Movimiento Contable Tercero" para filtrar por tercero).

### ¿Cómo debo insertar los parámetros dentro del filtro?
#### Respuesta
Los parámetros dentro del filtro deben estar insertados con comillas dobles si los vas a digitar directamente dentro del filtro. Por ejemplo: `“Número de identificación del tercero”`.

### ¿Qué otra forma tengo de ingresar los valores de un filtro?
#### Respuesta
Puedes referenciar una celda que contenga el valor que deseas usar en el filtro. Por ejemplo, si tienes el código del tercero en la celda A1, puedes referenciar esa celda en el filtro.

### ¿Cómo puedo utilizar la función "Ingresos Ventas Filtro"?
#### Respuesta
La función "Ingresos Ventas Filtro" determina los ingresos por venta del elemento de inventario con un filtro determinado. Recuerda que esta función solo calcula los valores base (sin IVA).

### ¿Dónde encuentro el filtro para aplicar a la función Ingresos Ventas Filtro?
#### Respuesta
Debes buscar un filtro por movimiento de inventario en **Fórmulas > Filtros**. Un ejemplo es el filtro "MOV Inventario Vendedor".

### ¿Cómo puedo filtrar los ingresos por ventas por vendedor utilizando la función "Ingresos Ventas Filtro"?
#### Respuesta
1.  Ubícate en la celda donde debe ir el parámetro de filtro en la función "Ingresos Ventas Filtro".
2.  Dirígete a **Fórmulas > Filtros** y busca el filtro "MOV Inventario Vendedor".
3.  Ingresa el código del vendedor dentro del filtro, ya sea digitándolo entre comillas dobles o referenciando una celda que contenga el código del vendedor.

---

# Funciones de Cartera
[Ver el video](https://www.youtube.com/watch?v=MhD1wssgi0k)
MhD1wssgi0k

## Tema principal
Uso de funciones de ContaPyme para análisis e informes de cartera.

## Resumen general
Este video explica el uso de tres funciones principales en ContaPyme para analizar y generar informes de cartera: `saldo cartera tercero`, `mov cartera tercero` y `cartera por edad fecha`.  Muestra cómo usar cada función, la importancia de sus parámetros, y cómo combinarlas para crear un informe completo de cartera por tercero, permitiendo el análisis de saldos, movimientos y vencimientos en un período de tiempo determinado.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la función `saldo cartera tercero` y para qué se utiliza?
#### Respuesta
La función `saldo cartera tercero` calcula el saldo de la cartera de un tercero a una fecha específica. Su propósito es determinar el valor adeudado o a favor de un tercero en una fecha determinada, restando las cuentas por pagar a las cuentas por cobrar.

### ¿Cómo se utiliza la función `saldo cartera tercero`?
#### Respuesta
Para utilizar la función `saldo cartera tercero`, sigue estos pasos:
1.  Coloca la función en una celda: `=saldo cartera tercero()`
2.  La función mostrará los parámetros requeridos: `i cuenta`, `i tercero`, `i débito crédito`, `fecha fin`, `i empresa`, `i b local`.
3.  Ingresa los valores de cada parámetro, separándolos con punto y coma (;). Puedes referenciar celdas que contengan los valores de los parámetros.
4.  Es recomendable indicar la mayor cantidad posible de parámetros para obtener información más precisa.

### ¿Qué parámetros requiere la función `saldo cartera tercero`?
#### Respuesta
La función `saldo cartera tercero` requiere los siguientes parámetros:
*   **i cuenta:**  Código de la cuenta contable.
*   **i tercero:** Código del tercero.
*   **i débito crédito:** Indica si se consultan débitos, créditos o el saldo.
*   **fecha fin:** Fecha hasta la cual se calcula el saldo.
*   **i empresa:** Código de la empresa (opcional, asume la empresa de trabajo por defecto).
*   **i b local:**  Indica si es local (opcional).

### ¿Qué pasa si no indico algunos parámetros en la función `saldo cartera tercero`?
#### Respuesta
Si no se indican algunos parámetros, el sistema asume valores por defecto. Por ejemplo:
*   En **i débito crédito** asume por defecto el saldo.
*   En **i empresa** asume por defecto la empresa de trabajo.
*   Si no se indica la **fecha fin**, la función realiza la consulta a la fecha de trabajo.

### ¿Cómo puedo ingresar la fecha correctamente en la función `saldo cartera tercero`?
#### Respuesta
Para evitar problemas con la sintaxis de la fecha, utiliza la función `fecha`. Por ejemplo: `=fecha(año, mes, día)`.

### ¿Qué es la función `mov cartera tercero` y en qué se diferencia de `saldo cartera tercero`?
#### Respuesta
La función `mov cartera tercero` calcula el movimiento débito o crédito de la cartera de un tercero en un período de tiempo determinado. La diferencia principal con `saldo cartera tercero` es que permite definir una fecha inicial, mostrando solo el movimiento entre un rango de tiempo específico, mientras que `saldo cartera tercero` trae el saldo desde el inicio de los tiempos hasta la fecha indicada.

### ¿Cómo puedo consultar los parámetros de la función `mov cartera tercero`?
#### Respuesta
Para consultar los parámetros de la función `mov cartera tercero`, párate en la celda donde está la función y presiona la tecla **F1** para acceder a la ayuda.

### ¿Qué parámetros requiere la función `mov cartera tercero`?
#### Respuesta
La función `mov cartera tercero` requiere los siguientes parámetros: `i cuenta`, `i tercero`, `i débito crédito`, `fecha inicial`, `fecha final`, `i empresa`, `i b local`.

### ¿Qué es la función `cartera por edad fecha` y para qué se utiliza?
#### Respuesta
La función `cartera por edad fecha` calcula el saldo de las cuentas por cobrar o por pagar que se vencen en un período determinado y que a una fecha específica no se han cancelado. Permite determinar qué cuentas están vencidas a una fecha de referencia.

### ¿Qué parámetros tiene la función `cartera por edad fecha` que son diferentes a las otras funciones?
#### Respuesta
La función `cartera por edad fecha` tiene dos parámetros diferentes:
*   **i c x x:** Permite definir si se consultan cuentas por cobrar (c x c) o cuentas por pagar (c x p).
*   **fecha:**  Corresponde a una fecha de referencia, no tiene indicación de fecha inicial o final.

### ¿Cómo debo interpretar las fechas en la función `cartera por edad fecha`?
#### Respuesta
En la función `cartera por edad fecha`:
*   **Fecha inicial** y **Fecha final** definen el rango de vencimientos de la cartera.
*   **Fecha** define la fecha de referencia para consultar la información, es decir, las cuentas que fueron creadas hasta esa fecha.

### ¿Qué significa el valor que arroja la función `cartera por edad fecha`?
#### Respuesta
El valor que arroja la función `cartera por edad fecha` es el saldo de la cartera que tenía fecha de vencimiento entre la fecha inicial y la fecha final, a la fecha de referencia indicada en el parámetro "fecha".

### ¿Cómo se puede construir un informe completo de cartera utilizando las funciones explicadas?
#### Respuesta
Se puede construir un informe completo de cartera utilizando las funciones `saldo cartera tercero`, `mov cartera tercero` y `cartera por edad fecha`.  Este informe puede discriminar las creaciones de crédito, los abonos, el saldo y verificar si las deudas están vigentes a una fecha específica. Para esto, se deben definir datos de referencia como la cuenta, el tercero, el tipo de cálculo (cuentas por cobrar o por pagar), el tipo de contabilización y el año de consulta, y luego aplicar las funciones a diferentes períodos de tiempo.

### ¿Cómo puedo actualizar el informe de cartera para un nuevo período?
#### Respuesta
Para actualizar el informe de cartera para un nuevo período, simplemente cambia la fecha inicial y la fecha final en las celdas correspondientes, y el informe se recalculará automáticamente.  También se puede modificar la fecha de referencia para la función `cartera por edad fecha`.

### ¿Cómo puedo saber si una cartera está vencida o vigente en el informe?
#### Respuesta
En el ejemplo del video, para determinar si la cartera está vencida o vigente, se utiliza la función `SI` en combinación con la fecha de referencia. Esto permite que el sistema indique automáticamente si la cartera está vencida o vigente según la fecha actual o la fecha de referencia que se defina.

---

# Funciones de Contabilidad
[Ver el video](https://www.youtube.com/watch?v=Rwizhixmugw)
[Funciones de contabilidad]

## Tema principal
Uso de funciones de ContaPyme en ContaExcel para consultas contables e informes personalizados.

## Resumen general
Este video explica cómo utilizar diversas funciones de ContaPyme dentro de ContaExcel para realizar consultas contables y crear informes personalizados. Se detallan funciones como SaldoCuenta, MovCuenta, MovCuentaDC y MovCuentaTercero, mostrando cómo obtener información específica de la base de datos de ContaPyme y cómo sincronizar los cambios realizados en ContaPyme con ContaExcel. Se muestra también la creación de un informe completo que muestra movimientos de cuentas en un rango de tiempo, aplicando variables como tercero y centro de costos, y se destaca la utilidad de estas funciones para el análisis contable.

## Preguntas Frecuentes (FAQ)

### ¿Qué calcula la función SaldoCuenta?
#### Respuesta
La función SaldoCuenta determina el saldo de una o más cuentas a una fecha específica. El saldo contable se calcula restando los créditos de los débitos.

### ¿Cuáles son las dos formas de cargar la función SaldoCuenta en una celda?
#### Respuesta
Las dos formas son:
1.  Cargar la función directamente desde las funciones de ContaPyme. Ruta: **Pestaña Contabilidad > Saldos > Saldo Cuenta.**
2.  Escribir directamente la función colocando el signo igual (=) y escribiendo el nombre de la función.

### ¿Dónde se puede encontrar la ayuda para la función SaldoCuenta en ContaExcel?
#### Respuesta
Para acceder a la ayuda de la función SaldoCuenta, se puede abrir el panel de ayuda presionando la tecla **F1** mientras se está trabajando con la función en ContaExcel.

### ¿Qué información se encuentra en la ayuda de la función SaldoCuenta?
#### Respuesta
En la ayuda de la función SaldoCuenta se encuentra:
- Descripción de la función
- Sintaxis (icuenta, fecha fin, código de la empresa, código del centro de costos y el tipo de contabilización)
- Tabla con los argumentos de cada parámetro, su formato (alfanumérico, numérico, de fecha), la descripción y el valor si está vacío.
- Un ejemplo totalmente explicado de cómo se puede utilizar la función.

### ¿Qué significa que un parámetro tenga un asterisco en la ayuda de la función SaldoCuenta?
#### Respuesta
Significa que es un parámetro opcional. Si no se indica, el sistema asume un valor por defecto. Por ejemplo, en la fecha fin, si no se especifica, se utiliza la fecha de trabajo configurada.

### ¿Cómo se referencian los parámetros dentro de la función SaldoCuenta?
#### Respuesta
Cada uno de los parámetros se debe referenciar seleccionando la celda correspondiente con el mouse, y cada parámetro va separado por punto y coma (;).

### ¿Qué hace la función Atributo Nombre Cuenta?
#### Respuesta
La función Atributo Nombre Cuenta trae el nombre específico de una cuenta contable.

### ¿Qué parámetros solicita la función Nombre Cuenta?
#### Respuesta
Esta función solicita:
- El identificador de la cuenta (obligatorio)
- El tipo de contabilización

### ¿Cómo se puede llamar una cuenta directamente desde el seleccionador de cuentas en ContaExcel?
#### Respuesta
1.  Ir a la pestaña de **ContaPyme > Cuentas.**
2.  Buscar y seleccionar la cuenta deseada.

### ¿Qué hace la función Nombre Empresa?
#### Respuesta
La función Nombre Empresa trae el nombre de la empresa.

### ¿Qué parámetros necesita la función Nombre Empresa?
#### Respuesta
Esta función necesita:
- El código de la empresa
- Si se desea el nombre largo (T) o el nombre corto (F). Si se deja este atributo sin marcar, el sistema asume por defecto F (nombre corto).

### ¿Cómo se define una fecha en ContaExcel usando la función fecha?
#### Respuesta
Se utiliza la función fecha indicando primero el año, luego el mes y luego el día. Por ejemplo: `=FECHA(2020;4;30)` para el 30 de abril de 2020.

### ¿Qué hace la función MovCuenta?
#### Respuesta
La función MovCuenta calcula el movimiento contable de una cuenta en un período de tiempo determinado.

### ¿Qué parámetros solicita la función MovCuenta?
#### Respuesta
La sintaxis de esta función solicita:
- El identificador de la cuenta (icuenta)
- Fecha inicial
- Fecha final
- Empresa
- Centro de costos
- Tipo de contabilización

### ¿Qué fecha inicial asume la función MovCuenta si no se indica ninguna?
#### Respuesta
Si no se indica ninguna fecha inicial, el sistema asume el primero de enero de 1900.

### ¿Qué hace la función MovCuentaDC?
#### Respuesta
La función MovCuentaDC calcula los movimientos débito y/o crédito de una o varias cuentas entre un período determinado.

### ¿Cómo se especifica si se quieren obtener los débitos o los créditos con la función MovCuentaDC?
#### Respuesta
- Para traer los débitos, se indica la letra "D".
- Para los créditos, se indica la letra "C".
- Si se deja el parámetro vacío, traerá el saldo.

### ¿Qué hace la función MovCuentaTercero?
#### Respuesta
La función MovCuentaTercero calcula los movimientos de una cuenta en un período de tiempo y que se le han imputado a un tercero determinado.

### ¿Qué parámetros adicionales solicita la función MovCuentaTercero en comparación con MovCuentaDC?
#### Respuesta
Adicionalmente solicita el parámetro del tercero.

### ¿Cómo se carga un tercero en la función MovCuentaTercero?
#### Respuesta
Se utiliza el seleccionador de terceros:
1. Se abre el seleccionador de terceros.
2. Se busca el tercero deseado.
3. Se da doble clic para cargarlo en la función.

### ¿Cómo se obtiene el nombre de un tercero en ContaExcel?
#### Respuesta
Se utiliza la función "NombreTercero" y se referencia la celda que contiene el código del tercero.

### ¿Cómo se fija una columna o una fila en una función para poder arrastrarla en ContaExcel?
#### Respuesta
Se utiliza el signo de pesos ($) antes de la letra de la columna o del número de la fila que se desea fijar. Por ejemplo:
- `$A1` fija la columna A.
- `A$1` fija la fila 1.
- `$A$1` fija tanto la columna A como la fila 1.

### ¿Cómo se recalculan las fórmulas en ContaExcel después de realizar cambios en ContaPyme?
#### Respuesta
Se da clic al botón "Recalcular" de la sección "Fórmulas" en la cinta de opciones de Excel.

---

# Funciones de inventarios
[Ver el video](https://www.youtube.com/watch?v=xlaAO6nBHLo)
xlaAO6nBHLo

## Tema principal
Consulta de información de inventarios, existencias y costos en ContaPyme.

## Resumen general
Este video explica cómo utilizar las funciones de ContaPyme para consultar información relevante del inventario, como la cantidad de existencias (contables y físicas) y el costo promedio ponderado de los productos. Se muestra cómo usar estas funciones individualmente y cómo combinarlas para generar un informe completo de inventario, permitiendo visualizar las existencias y costos a diferentes fechas y por bodega. Esto facilita la toma de decisiones y el control del inventario en la empresa.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la función "Cantidad de Existencias" y para qué sirve?
#### Respuesta
La función "Cantidad de Existencias" determina la cantidad de existencias disponibles de un elemento de inventario en una fecha específica. Su cálculo se basa en el sistema de inventarios de ContaPyme, considerando todas las operaciones que afectan el inventario contable, como compras, ventas, planillas de consumo y ajustes.

### ¿Qué datos necesita la función "Cantidad de Existencias" para funcionar?
#### Respuesta
La función "Cantidad de Existencias" requiere los siguientes datos:
- Bodega
- Elemento de inventario
- Fecha final
- Empresa
- Centro de costos productor

### ¿Cómo puedo especificar el elemento de inventario que quiero consultar en la función "Cantidad de Existencias"?
#### Respuesta
Para especificar el elemento de inventario, debes:
1. Ubicarte en la celda correspondiente al parámetro "Elemento de inventario".
2. Abrir el seleccionador.
3. Seleccionar el producto que deseas consultar (ej., Impresora HP 1606).

### ¿Cómo puedo consultar la cantidad de existencias para una bodega específica?
#### Respuesta
Debes indicar el código de la bodega en el parámetro correspondiente dentro de la función "Cantidad de Existencias". Por ejemplo, si quieres consultar la bodega principal (Bodega 2), debes ingresar el código "2".

### ¿Qué diferencia hay entre el inventario contable y el inventario físico en ContaPyme?
#### Respuesta
- **Inventario Contable:** Se ve afectado por todas las operaciones del módulo de inventarios, como compras, ventas, planillas de consumo y ajustes de inventario.
- **Inventario Físico:** Se afecta por las mismas operaciones que el inventario contable, pero adicionalmente por las remisiones al cliente y las recepciones de materiales.

### ¿Para qué sirve la función "Cantidad de Existencias Físico"?
#### Respuesta
La función "Cantidad de Existencias Físico" determina la cantidad de existencias físicas de un elemento de inventario en una fecha determinada.  Consulta el inventario afectado por las operaciones de inventario (compras, ventas, etc.) más las operaciones de recepciones y remisiones (inventarios Plus).

### ¿Cómo puedo comparar las existencias contables y físicas de un producto?
#### Respuesta
Puedes utilizar la función "Cantidad de Existencias" para consultar las existencias contables y la función "Cantidad de Existencias Físico" para consultar las existencias físicas.  Luego, puedes comparar los resultados para identificar diferencias entre ambos tipos de inventario.

### ¿Qué es la función "Costo Promedio Elemento" y qué información me proporciona?
#### Respuesta
La función "Costo Promedio Elemento" determina el costo promedio ponderado de un elemento de inventario en una fecha determinada. Esta función es útil para conocer el valor promedio de un producto en el inventario.

### ¿Qué parámetros necesita la función "Costo Promedio Elemento"?
#### Respuesta
La función "Costo Promedio Elemento" requiere los siguientes parámetros:
- Bodega
- Elemento de inventario
- Fecha final
- Empresa
- Centro de costos productor
- Tipo de contabilización

### ¿Cómo puedo saber el costo promedio de un producto en una bodega específica?
#### Respuesta
Debes ingresar el código de la bodega deseada en el parámetro "Bodega" de la función "Costo Promedio Elemento".  El resultado mostrará el costo promedio ponderado del producto en esa bodega específica.

### ¿Por qué el costo promedio de un mismo producto puede variar entre diferentes bodegas?
#### Respuesta
ContaPyme maneja el costo promedio ponderado de forma independiente para cada bodega. Por lo tanto, el costo promedio de un producto puede ser diferente en cada bodega, dependiendo de las compras y salidas de inventario que se hayan realizado en cada una.

### ¿Cómo puedo crear un informe completo de inventarios con las funciones explicadas?
#### Respuesta
Puedes combinar las funciones "Cantidad de Existencias", "Cantidad de Existencias Físico" y "Costo Promedio Elemento" para crear un informe que muestre:
- Un listado de elementos de inventario.
- La cantidad contable de cada elemento.
- La cantidad física de cada elemento.
- El costo unitario de cada elemento.
- El costo total de cada elemento.

### ¿Qué ventajas tiene usar estas funciones para crear informes de inventario?
#### Respuesta
Estas funciones permiten crear informes de inventario de forma rápida y eficiente, facilitando la consulta de existencias y costos en pocos minutos. Esto ayuda a visualizar ambos tipos de inventario (contable y físico) y a tomar decisiones informadas sobre la gestión del inventario.

---

# Funciones de ventas
[Ver el video](https://www.youtube.com/watch?v=bBo6IGK96Q4)
Funciones de ventas

## Tema principal
Consultar ingresos y cantidades de ventas por producto usando funciones de ContaPyme.

## Resumen general
Este video explica cómo utilizar las funciones "Ingresos Ventas" y "Cantidad Ventas" en ContaPyme para analizar las ventas de productos. Aprenderás a calcular los ingresos generados y la cantidad de unidades vendidas por producto dentro de un período específico. También se muestra cómo combinar estas funciones para crear un informe completo de ventas, incluyendo IVA y porcentajes de participación, además de aplicar formatos condicionales para visualizar mejor los datos.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el propósito de la función "Ingresos Ventas" en ContaPyme?
#### Respuesta
La función "Ingresos Ventas" determina el ingreso generado por la venta de un elemento de inventario específico. Es importante tener en cuenta que su cálculo se basa en las operaciones de ventas del módulo de inventarios, compras y facturación de ContaPyme, y no incluye el valor del IVA.

### ¿Qué datos necesita la función "Ingresos Ventas" para calcular el ingreso?
#### Respuesta
La función "Ingresos Ventas" necesita los siguientes datos:
- Código de la bodega
- Código del elemento de inventario
- Fecha inicial
- Fecha final
- Empresa
- Centro de costos productor
- Centro de costos destino
- Tercero
- Tipo de contabilización

### ¿Cómo puedo consultar los ingresos por ventas de un producto en un período específico usando la función "Ingresos Ventas"?
#### Respuesta
Para consultar los ingresos por ventas en un período específico, debes definir las fechas inicial y final dentro de los parámetros de la función. Por ejemplo, si deseas consultar los ingresos de abril de 2020, la fecha inicial sería el 1 de abril de 2020 y la fecha final el 30 de abril de 2020.

### ¿Qué información proporciona la función "Cantidad Ventas" en ContaPyme?
#### Respuesta
La función "Cantidad Ventas" determina la cantidad de unidades vendidas de un elemento de inventario en un período específico. Al igual que la función "Ingresos Ventas", se basa en las operaciones de ventas del módulo de inventarios, compras y facturación de ContaPyme.

### ¿Qué parámetros requiere la función "Cantidad Ventas"?
#### Respuesta
La función "Cantidad Ventas" requiere parámetros similares a la función "Ingresos Ventas", que incluyen:
- Bodega
- Elemento de inventario
- Fecha inicial
- Fecha final
- Empresa
- Centro de costos productor
- Centro de costos destino
- Tercero

### ¿Por qué la función "Cantidad Ventas" muestra un valor negativo y cómo puedo cambiarlo a positivo?
#### Respuesta
La función "Cantidad Ventas" muestra un valor negativo porque representa la salida de productos del inventario. Para mostrar el valor como positivo, puedes utilizar la función "ABS" (valor absoluto) antes de la función "Cantidad Ventas". Por ejemplo: =ABS(CantidadVentas(...)).

### ¿Cómo puedo construir un informe completo de ventas utilizando las funciones "Ingresos Ventas" y "Cantidad Ventas"?
#### Respuesta
Para construir un informe completo de ventas, puedes seguir estos pasos:
1.  Utiliza la función "Cantidad Ventas" (con la función "ABS" si deseas valores positivos) para determinar la cantidad de unidades vendidas de cada producto.
2.  Utiliza la función "Ingresos Ventas" para determinar el valor de los ingresos por ventas de cada producto (sin IVA).
3.  Utiliza la función "IVA Ventas" para determinar el valor del IVA de las ventas de cada producto.
4.  Suma los ingresos sin IVA y el IVA para obtener el total de ingresos por producto.
5.  Calcula el porcentaje de participación de cada producto en las ventas totales, dividiendo los ingresos sin IVA de cada producto entre los ingresos totales y fijando este último valor con el signo de pesos ($) para poder arrastrar la fórmula.
6.  Calcula el porcentaje de participación de cada producto en las cantidades totales, dividiendo la cantidad vendida de cada producto entre las cantidades totales.

### ¿Cómo puedo aplicar formato condicional a mi informe de ventas para visualizar mejor los datos?
#### Respuesta
Puedes aplicar formato condicional para resaltar los productos con mayor participación en ventas o cantidades vendidas. Para hacer esto:
1.  Selecciona las celdas del porcentaje de participación de los ingresos por ventas.
2.  Ve a **Inicio > Formato Condicional > Escala de Color** y elige una escala de color.
3.  Selecciona las celdas del porcentaje de participación en cantidades.
4.  Ve a **Inicio > Formato Condicional > Barras** y elige un estilo de barra.

---

# Indicadores
[Ver el video](https://www.youtube.com/watch?v=Qr4CKNcCBP8)
[Qr4CKNcCBP8]

## Tema principal
Funcionamiento y tipos de indicadores en ContaPyme.

## Resumen general
Este video explica cómo utilizar el módulo de indicadores en ContaPyme para medir y analizar datos importantes de la empresa. Se describen los seis tipos diferentes de indicadores que ofrece la herramienta: comparativo anual, comparativo de cuentas, series históricas de cuentas, gráfico, gráfico histórico y plantillas básicas de Contaexcel. El video explica las características de cada indicador y muestra ejemplos prácticos de cómo configurarlos y utilizarlos para tomar decisiones basadas en datos. Se aprende a crear indicadores para comparar ventas, ingresos, gastos, y la gestión de cartera, entre otros.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un indicador y para qué sirve?
#### Respuesta
Un indicador es una característica específica, observable y medible, que se usa para mostrar los cambios y progresos hacia el logro de un resultado específico. Sirve para medir el estado actual de una organización, tomar decisiones, hacer crecer el negocio y colaborar, todo ello basado en datos.

### ¿Cuántos tipos de indicadores ofrece Contapyme?
#### Respuesta
Contapyme ofrece seis tipos diferentes de indicadores:
- Indicador comparativo anual
- Indicador comparativo de cuentas
- Indicador de series históricas de cuentas
- Indicador de gráfico
- Gráfico histórico
- Indicador de plantillas básicas de Contaexcel

### ¿Dónde se encuentra la herramienta de indicadores en ContaPyme?
#### Respuesta
La herramienta de indicadores se encuentra en la pestaña **Básico**.

### ¿El módulo de indicadores es un módulo adicional que se debe comprar aparte en ContaPyme?
#### Respuesta
No, el módulo de indicadores pertenece al sistema básico de ContaPyme. Esto significa que cualquier licenciamiento puede utilizar esta herramienta.

### ¿Cómo se crea un nuevo indicador en ContaPyme?
#### Respuesta
Para crear un nuevo indicador:
1.  Dirígete a la pestaña **Básico** y haz clic en **Indicadores**.
2.  Haz clic en el botón **Más (+)**.
3.  Selecciona el tipo de indicador que deseas crear (comparativo anual, comparativo de cuentas, series históricas de cuentas, gráfico, gráfico histórico, plantillas básicas de Contaexcel).
4.  Especifica un código para el indicador y haz clic en **Aceptar**.
5.  Completa la información solicitada en las pestañas correspondientes (General, Series, Presentación, Privacidad).

### ¿Qué permite hacer el indicador comparativo anual?
#### Respuesta
El indicador comparativo anual permite analizar una o varias cuentas a través del tiempo. Se puede seleccionar una periodicidad (diaria, mensual, trimestral) y ver movimientos acumulados y saldos.

### ¿Qué permite hacer el indicador comparativo de cuentas?
#### Respuesta
El indicador comparativo de cuentas sirve para comparar varias cuentas en un período determinado (hoy, ayer, mes actual, etc.). También permite seleccionar el tipo de gráfico (pastel, barras, etc.) para visualizar los datos.

### ¿Qué permite hacer el indicador de series históricas de cuentas?
#### Respuesta
El indicador de series históricas de cuentas permite comparar varias cuentas a través del tiempo, con periodicidad diaria, mensual o trimestral. Se puede mostrar el saldo, el acumulado o el movimiento, y seleccionar el tipo de gráfico.

### ¿Qué son las series en la configuración de un indicador?
#### Respuesta
Las series son los datos con los que el sistema construye la información del indicador.

### ¿Qué tipo de conocimientos se necesitan para usar los indicadores de gráfico, gráfico histórico y plantillas básicas de Contaexcel?
#### Respuesta
Para utilizar los indicadores de gráfico, gráfico histórico y plantillas básicas de Contaexcel, es necesario tener conocimientos básicos en el funcionamiento de Contaexcel, ya que se configuran a través de funciones que traen información de la base de datos.

### ¿Qué es Contaexcel?
#### Respuesta
Contaexcel es una aplicación de hojas de cálculo que permite hacer una conexión a Contapyme y consultar información del sistema a través de funciones.

### ¿Qué permite hacer el indicador de gráfico?
#### Respuesta
El indicador de gráfico sirve para comparar hasta cinco series de datos creadas por el usuario y permite usar cualquier función de Contaexcel.

### ¿Qué permite hacer el indicador de gráfico histórico?
#### Respuesta
El indicador de gráfico histórico sirve para comparar hasta cinco series de datos creadas por el usuario a través del tiempo, utilizando datos históricos relativos a la fecha de trabajo.

### ¿Cuál es la principal diferencia entre el indicador gráfico y el gráfico histórico?
#### Respuesta
La principal diferencia es que el gráfico histórico usa datos históricos relativos a la fecha de trabajo, lo que permite que la información se actualice automáticamente a medida que cambia la fecha de trabajo.

### ¿Qué permite hacer el indicador de plantillas básicas de Contaexcel?
#### Respuesta
El indicador de plantillas básicas de Contaexcel sirve para realizar cualquier tipo de indicador que sea de semáforo, de tabla, mapa de calor, entre otros. Se puede usar cualquier función de Contaexcel y formatos condicionales.

### ¿Qué son los parámetros en los indicadores de gráfico y gráfico histórico?
#### Respuesta
Los parámetros son datos que se pueden usar como filtro al momento de generar el indicador. Se pueden configurar hasta tres parámetros por indicador.

### ¿Cómo se aplica un parámetro a una función en Contaexcel dentro de un indicador?
#### Respuesta
Dentro de la pestaña de **Formulación**, en la función de Contaexcel, se agrega un punto y coma (;) después del último parámetro requerido y se selecciona el espacio correspondiente al parámetro deseado.

---

# Operaciones en Bloque R8
[Ver el video](https://www.youtube.com/watch?v=peIgDnxP4-E)
peIgDnxP4-E

## Tema principal
Automatización de la generación de transacciones contables periódicas en ContaPyme.

## Resumen general
Este video explica en detalle la funcionalidad de "Operaciones en Bloque" en ContaPyme R8, una herramienta diseñada para automatizar y facilitar el registro de transacciones contables recurrentes. Se exploran los objetivos, el alcance y los pasos necesarios para configurar y utilizar esta funcionalidad, incluyendo la configuración de conceptos en terceros, el registro de novedades, la generación de operaciones en bloque y la verificación y control de las operaciones generadas. El video también presenta ejemplos prácticos, como la administración de propiedades horizontales y el cobro de mensualidades, para ilustrar el uso de esta herramienta y su impacto en la eficiencia del registro contable.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los objetivos de las operaciones en bloque en ContaPyme R8?
#### Respuesta
Los objetivos principales de las operaciones en bloque son:
- Facilitar la interacción del usuario con el software.
- Automatizar el registro de información constante.
- Permitir la generación rápida de transacciones contables.
- Configurar conceptos y criterios para generar periódicamente hechos o transacciones contables en bloque.

### ¿Para qué tipos de operaciones se pueden usar las operaciones en bloque?
#### Respuesta
Las operaciones en bloque se pueden utilizar para:
- Facturación y venta
- Ingresos
- Gastos
- Movimientos contables

### ¿Cuál es la diferencia entre operaciones en bloque y duplicación en bloque?
#### Respuesta
- Las **operaciones en bloque** aplican para operaciones específicas: facturación y venta, ingresos, gastos y movimientos contables.
- La **duplicación en bloque** funciona para todas las operaciones que el cliente posea dentro de su licenciamiento, es decir, para todos los módulos y operaciones.

### ¿Cuáles son los pasos básicos para trabajar con las operaciones en bloque?
#### Respuesta
Los pasos básicos son:
1.  **Configurar conceptos:** Se realiza en el catálogo de terceros para la generación de las diferentes operaciones.
2.  **Registrar novedades:** Conceptos extraordinarios que se registran para la generación de las operaciones en bloque del periodo a liquidar.
3.  **Generar la operación:** Se utiliza el asistente para generar la operación en bloque, que crea en forma masiva las operaciones según los conceptos configurados y las novedades registradas.
4.  **Verificar y controlar:** Se utiliza el explorador de generación de operaciones en bloque para chequear y auditar la información de las operaciones generadas.

### ¿Dónde se configura los conceptos para las operaciones en bloque?
#### Respuesta
La configuración de conceptos se realiza en el **catálogo de terceros**.

### ¿Cómo se definen los clasificadores y criterios para las operaciones en bloque?
#### Respuesta
Dentro del catálogo de terceros, se pueden reetiquetar los clasificadores de datos adicionales (clase 1, clase 2, dato 1, dato 2, valor 1, valor 2) para personalizarlos y adaptarlos a las necesidades de clasificación de la empresa. Por ejemplo, se pueden renombrar como "concepto", "edificio", "torre", "piso", "área del apartamento".

*   **Ruta:** `Catálogo de terceros / Asistentes de configuración avanzada / Requerimiento de datos por pestaña / Pestaña de datos adicionales`

### ¿Cómo se asignan los conceptos a los terceros de forma individual o masiva?
#### Respuesta
Hay dos opciones dentro del catálogo de terceros:
*   **Asignación individual:** Clic derecho sobre el tercero y seleccionar "Operaciones en bloque" y luego "Programar conceptos al tercero".
*   **Asignación masiva:** Clic derecho dentro del catálogo y seleccionar "Operaciones en bloque" y luego "Programar conceptos a múltiples terceros".

### ¿Cómo se habilita la opción de operaciones en bloque para un tercero?
#### Respuesta
Dentro del catálogo de terceros, en la opción "Programar conceptos al tercero" (tras hacer clic derecho), se debe activar el check que dice "Habilitar operaciones en bloque". Una vez habilitado, se pueden seleccionar los conceptos a habilitar (facturar productos, ingresos, gastos, movimiento contable), dependiendo del licenciamiento que se tenga.

### ¿Qué información se debe registrar al programar conceptos a un tercero?
#### Respuesta
Al programar conceptos al tercero, se deben completar las siguientes áreas:
1.  **Encabezado:** Tipo de documento de soporte, clase de operación y detalle.
2.  **Pago:** Cuenta por cobrar y concepto de cobro (para la causación en cartera y proveedores).
3.  **Conceptos:** Esta área varía según el tipo de operación seleccionada (ingresos, gastos, movimiento contable, ventas). Por ejemplo, para ingresos se solicita la cuenta de ingreso, el centro de costos y el valor.
4.  **Programación:** Fecha de inicio, fecha final, periodicidad (mensual, bimestral, etc.) y acciones a realizar en días no hábiles.

### ¿Qué son las novedades en las operaciones en bloque?
#### Respuesta
Las novedades son conceptos extraordinarios o eventualidades que se registran para generar las operaciones en bloque de un periodo específico. Estas novedades pueden afectar a un tercero en particular o a un grupo de terceros.

### ¿Cómo se registran las novedades en las operaciones en bloque?
#### Respuesta
Las novedades se registran a través de operaciones especiales en el manejador de operaciones, dependiendo de los módulos que se tengan: novedad de productos, de ingresos, de gastos o de movimiento contable.

### ¿Cómo se registran novedades para múltiples terceros?
#### Respuesta
Dentro de la operación de novedad (ingresos, gastos, etc.) hay un asistente para obtener terceros según un filtro. Este asistente permite seleccionar los terceros a los que se asignará la novedad, utilizando los clasificadores definidos en el catálogo de terceros.

### ¿Las novedades generan algún registro contable al ser creadas?
#### Respuesta
No, las novedades no generan ningún registro contable al ser creadas. Solo representan un dato o un concepto adicional que se incluirá en la generación de las operaciones en bloque.

### ¿Cómo se generan las operaciones en bloque una vez configurados los conceptos y registradas las novedades?
#### Respuesta
Dentro del manejador de operaciones, se selecciona "Operaciones en bloque" y luego "Generar operaciones en bloque". Se debe indicar el tipo de operación a generar (ingresos, gastos, etc.), el periodo y los filtros a aplicar (si se desea). Luego, se puede obtener una vista previa de las operaciones a generar y finalmente generar las operaciones en bloque.

### ¿Qué opciones hay para controlar y verificar las operaciones generadas en bloque?
#### Respuesta
Se utiliza el "Explorador de generación de operaciones en bloque", al cual se accede desde el manejador de operaciones. Este explorador permite analizar la información de las operaciones generadas, aplicar filtros y verificar el historial de las transacciones.

### ¿Qué significan las opciones "Incluir conceptos pendientes" e "Incluir conceptos descartados" al generar operaciones en bloque?
#### Respuesta
-   **Incluir conceptos pendientes:** Incorpora en la generación actual las transacciones que no se generaron en periodos anteriores y que fueron dejadas como "pendientes".
-   **Incluir conceptos descartados:** Permite incluir en la generación actual aquellas transacciones que habían sido marcadas como "descartadas" en periodos anteriores.

### ¿Qué ocurre si no se activan las opciones "Incluir conceptos pendientes" o "Incluir conceptos descartados" y existen operaciones pendientes o descartadas de periodos anteriores?
#### Respuesta
El sistema mostrará una ventana de advertencia indicando que se han detectado operaciones no generadas en periodos anteriores, permitiendo al usuario ver el detalle de estas operaciones y decidir si incluirlas o continuar sin ellas.

### ¿Qué acciones se pueden configurar para los días no hábiles en las operaciones en bloque?
#### Respuesta
Se puede configurar que la operación se genere en el primer día hábil siguiente, el último día hábil anterior, o se puede dejar pendiente hasta el día hábil correspondiente.

### ¿Dónde se configuran los días hábiles e inhábiles?
#### Respuesta
La configuración de días hábiles e inhábiles se realiza en la configuración general del sistema.

*   **Ruta:**  Botón de Aplicación (esquina superior izquierda) / Configuraciones

### ¿Qué es la "alerta para periodos no generados" y qué opciones tiene?
#### Respuesta
Es una opción que se configura al asignar conceptos y que permite controlar qué ocurre si una operación no se genera en un periodo determinado. Tiene dos opciones:
-   **Mostrar error:** No permite continuar con la generación de operaciones en bloque hasta que se incluyan o se registren las transacciones de los periodos anteriores.
-   **Mostrar advertencia:** Muestra un comentario o advertencia indicando que hay operaciones pendientes de periodos anteriores, pero permite continuar con la generación.

### ¿Se puede modificar o eliminar una novedad después de que ha sido incluida en una operación generada en bloque?
#### Respuesta
No, una vez que una novedad ha sido incluida en una operación generada en bloque, no se puede desprocesar, eliminar ni modificar.

### ¿En qué tipo de operaciones se debe tener especial cuidado con la configuración de débitos y créditos?
#### Respuesta
En las operaciones en bloque de tipo **movimiento contable**, se debe asegurar que los débitos y créditos estén correctamente balanceados para que la operación sea válida.

### ¿Cómo se puede remover conceptos asignados a múltiples terceros?
#### Respuesta
En el catálogo de terceros, clic derecho y seleccionar "Operaciones en bloque" y luego "Remover conceptos a múltiples terceros". Se debe indicar el concepto a remover y aplicar los filtros correspondientes para seleccionar los terceros afectados.

---

# Programa de contabilidad ContaPyme - Como instalar ContaExcel add in
[Ver el video](https://www.youtube.com/watch?v=q4y9DQPDVaE)

## Tema principal
Instalación del complemento ContaXLadín para Microsoft Excel.

## Resumen general
Este video explica cómo instalar el complemento ContaXLadín en Microsoft Excel.  Muestra paso a paso el proceso de instalación, desde la ejecución del instalador hasta la confirmación de que el complemento se ha instalado correctamente y se puede acceder desde Excel. El video enfatiza la importancia de aceptar el contrato de licencia y seguir la ruta de instalación predeterminada para asegurar una instalación exitosa.

## Preguntas Frecuentes (FAQ)

### ¿Qué es ContaXLadín?
#### Respuesta
ContaXLadín es un complemento de Microsoft Excel que se instala y ejecuta dentro del entorno de trabajo de Excel.

### ¿Cómo inicio la instalación de ContaXLadín?
#### Respuesta
Para iniciar la instalación, debes dar doble clic al icono del instalador llamado "Instalar ContaXLadín versión 4".

### ¿Qué debo hacer después de ejecutar el instalador?
#### Respuesta
Después de ejecutar el instalador, se abrirá una ventana que te guiará a través de los pasos necesarios para la instalación.

### ¿Qué información se muestra en la ventana de bienvenida?
#### Respuesta
La ventana de bienvenida te confirma que vas a instalar ContaXLadín y que este quedará habilitado para ser usado desde Excel.

### ¿Qué debo hacer después de la ventana de bienvenida?
#### Respuesta
Debes dar clic en el botón "Siguiente".

### ¿Qué se muestra en el contrato de licencia?
#### Respuesta
En el contrato de licencia se muestran todas las cláusulas de cumplimiento dispuestas para ContaXLadín.

### ¿Qué debo hacer con el contrato de licencia?
#### Respuesta
Debes marcar la opción "Acepto los términos del contrato de licencia" y luego dar clic en el botón "Siguiente".

### ¿Qué se muestra en la ventana de la ruta de instalación?
#### Respuesta
Se muestra la ruta en la cual se va a instalar ContaXLadín.  El asistente de instalación proporciona una ruta por defecto.

### ¿Debo cambiar la ruta de instalación?
#### Respuesta
No, lo más recomendable es dejar la ruta que el sistema muestra por defecto.

### ¿Qué se muestra en la ventana de configuración actual?
#### Respuesta
Se muestra la configuración actual con la que se realizará la instalación, incluyendo el tipo de instalación (Cliente Contapyme), la ruta de instalación e información del usuario.

### ¿Qué debo hacer después de verificar la configuración de instalación?
#### Respuesta
Después de verificar que la configuración de instalación es correcta, debes dar clic en el botón "Instalar".

### ¿Cómo sé que ContaXLadín se instaló correctamente?
#### Respuesta
El asistente mostrará una ventana que confirma que ContaXLadín versión 4 se instaló correctamente.  Luego, debes dar clic en el botón "Finalizar".

### ¿Cómo compruebo que ContaXLadín se instaló como un complemento de Excel?
#### Respuesta
Para comprobarlo, ejecuta Excel y verifica que en la barra de menú se haya agregado una nueva pestaña llamada "Contaxil".

---

# Qué es ContaExcel
[Ver el video](https://www.youtube.com/watch?v=cMuzkipTxo4)
[cMuzkipTxo4]

## Tema principal
Introducción a ContaExcel 2.0 y sus funcionalidades.

## Resumen general
Este video presenta ContaExcel 2.0, una herramienta que permite a los usuarios de Contapyme crear informes personalizados utilizando una hoja de cálculo. Explica que ContaExcel 2.0 se conecta en tiempo real con la información de Contapyme, ofreciendo funciones contables, de cartera, inventarios y más. Además, menciona las ventajas de la herramienta, como su compatibilidad con Microsoft Excel, la actualización en tiempo real de la información y un panel de ayudas con la explicación de más de 150 funciones. Se destaca que la herramienta se instala automáticamente con la actualización R8 y que su uso completo depende de tener una póliza vigente.

## Preguntas Frecuentes (FAQ)

### ¿Qué es ContaExcel 2.0?
#### Respuesta
ContaExcel 2.0 es una aplicación de hojas de cálculo que permite a los usuarios de Contapyme crear y personalizar sus propios informes. Se conecta en tiempo real con la información de Contapyme y ofrece funciones para crear informes, estadísticas o consultas.

### ¿Qué tipo de herramientas y funciones ofrece ContaExcel 2.0?
#### Respuesta
ContaExcel 2.0 posee muchas de las herramientas de Excel, como funciones matemáticas, financieras, de texto, de fecha y hora, manejo de formato condicional e incluso la opción de inmovilizar paneles. También incluye funciones específicas para contabilidad, cartera y proveedores, activos fijos, inventarios y facturación, entorno, fechas, centros de costos y actividades y labores.

### ¿Cuáles son las ventajas de usar ContaExcel 2.0?
#### Respuesta
ContaExcel 2.0 ofrece varias ventajas:
- Cuenta con las funciones más genéricas de una hoja de cálculo.
- Es compatible con hojas de cálculo conocidas como Microsoft Excel.
- Permite la conexión a la base de datos de Contapyme y tener la información actualizada en tiempo real.
- Ofrece un panel de ayudas con la explicación de más de 150 funciones.

### ¿Cómo se instala ContaExcel 2.0?
#### Respuesta
ContaExcel 2.0 se instala automáticamente al instalar la actualización R8 de Contapyme o al realizar la migración de R7 a R8.

### ¿Qué necesito para usar ContaExcel 2.0 y conectarme a la base de datos de Contapyme?
#### Respuesta
Para usar ContaExcel 2.0 y conectarte a la base de datos de Contapyme, necesitas tener una póliza vigente. Si no tienes una póliza vigente, podrás usar la hoja de cálculo, pero no podrás conectarte a la base de datos.

### ¿Cómo puedo consultar los ingresos por ventas en ContaExcel 2.0?
#### Respuesta
Para consultar los ingresos por ventas en ContaExcel 2.0:
1.  Conéctate a Contapyme.
2.  Ubícate en una celda de la hoja de cálculo.
3.  Llama la función "Ingresos Ventas".
4.  Ingresa los parámetros requeridos por la función para realizar la consulta a la base de datos.
5.  Presiona Enter. La función traerá la información directamente desde Contapyme y mostrará el resultado.

---

# Sistema contable ContaPyme - Explicación cinta de opciones ContaExcel
[Ver el video](https://www.youtube.com/watch?v=0fmF3XLQuA8)
ContaPyme - Explicación cinta de opciones ContaExcel

## Tema principal
Explicación de las funciones y herramientas disponibles en la cinta de opciones de ContaExcel.

## Resumen general
Este video explica la cinta de opciones "ContaExcel" que aparece en Microsoft Excel después de instalar el Addin ContaExcel y conectarse a ContaPyme. Se describen las diferentes opciones disponibles en la cinta, incluyendo: cambio de área de trabajo y empresa, recálculo de resultados, modificación de la fecha de trabajo, borrado de caché, activación de refresh y caché, y el uso de los seleccionadores de terceros, cuentas, elementos de inventario y centros de costos. El objetivo es comprender cómo utilizar estas herramientas para interactuar con los datos de ContaPyme desde Excel.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a las funciones de ContaExcel dentro de Microsoft Excel?
#### Respuesta
Después de instalar ContaExcel Addin y conectar con Contapyme, al abrir Microsoft Excel, se crea una nueva pestaña en la cinta de opciones llamada "ContaExcel". Esta pestaña contiene todas las herramientas para trabajar con ContaExcel.

### ¿Cómo cambio el área de trabajo en ContaExcel?
#### Respuesta
Para cambiar el área de trabajo, sigue estos pasos:
1.  Haz clic en la opción **Áreas de Trabajo** en la cinta de opciones de ContaExcel.
2.  En la ventana de conexión, busca la opción **Área de trabajo** en la parte inferior.
3.  Haz clic en la flecha hacia abajo para desplegar el listado de áreas de trabajo disponibles.
4.  Selecciona el área de trabajo deseada.
5.  Elige la licencia que utilizarás para la conexión.
6.  Haz clic en el botón **Conectar**.

### ¿Cómo cambio la empresa de trabajo en ContaExcel?
#### Respuesta
Para cambiar la empresa de trabajo, sigue estos pasos:
1.  Haz clic en la opción **Empresa de Trabajo** en la cinta de opciones de ContaExcel.
2.  En la nueva ventana, selecciona la empresa a la que deseas cambiarte (si el área de trabajo activa posee varias empresas).
3.  Haz clic en el botón **Seleccionar**.

### ¿Cuándo debo usar la opción "Recalcular" en ContaExcel?
#### Respuesta
Debes usar la opción **Recalcular** cuando cambias alguna de las variables de entorno después de haber obtenido un resultado de una consulta. Cualquier cambio en las variables de entorno afecta los resultados mostrados en pantalla, por lo que es necesario recalcular.

### ¿Cómo puedo cambiar la fecha de trabajo en ContaExcel?
#### Respuesta
Para cambiar la fecha de trabajo, sigue estos pasos:
1.  Haz clic en el icono del calendario en la opción **Fecha de trabajo** en la cinta de opciones de ContaExcel.
2.  En la ventana que se abre, puedes cambiar la fecha directamente o utilizar las flechas para navegar:
    *   La primera flecha del lado izquierdo te lleva al último día del año anterior.
    *   La siguiente flecha te lleva al último día del mes anterior.
    *   La siguiente flecha te lleva al último día del mes siguiente.
    *   La última flecha te lleva al último día del año siguiente.

### ¿Qué hace la opción "Borrar caché" en ContaExcel?
#### Respuesta
La opción **Borrar caché** elimina los datos que han sido calculados y guardados en la memoria de ContaExcel. Al usarla, se remueven los datos del caché del sistema y los próximos cálculos se almacenarán nuevamente en caché para aumentar la velocidad de procesamiento.

### ¿Qué hacen las opciones "Activar refresh" y "Activar caché" en ContaExcel?
#### Respuesta
*   **Activar refresh:** Actualiza automáticamente los resultados presentados en pantalla cuando se realiza un cambio en alguna variable de entorno.
*   **Activar caché:** Permite almacenar siempre en memoria los datos obtenidos de los cálculos que se realizan en el sistema.

### ¿Cómo utilizo los seleccionadores de Terceros, Cuentas, Elementos de Inventario y Centros de Costos en ContaExcel?
#### Respuesta
Los seleccionadores te permiten interactuar con los registros de ContaPyme. Para usar un seleccionador, por ejemplo, el de Terceros, sigue estos pasos:
1.  Haz clic en el seleccionador deseado (por ejemplo, **Terceros**) en la cinta de opciones de ContaExcel.
2.  En la ventana que se abre, encontrarás un listado de los registros disponibles en Contapyme (en este caso, todos los terceros).
3.  Selecciona uno o varios registros.
4.  Haz clic en el botón **Seleccionar**.
5.  El código de los registros seleccionados se cargará en Excel para que puedas usarlos en las funciones de ContaExcel.

---

# Sistema contable ContaPyme - Introducción a la función saldo cuenta
[Ver el video](https://www.youtube.com/watch?v=q_H1tvkbt7U)
[q_H1tvkbt7U]

## Tema principal
Consulta de saldos de cuentas contables utilizando la función "Saldo Cuenta" en ContaPyme a través de Excel y Contexcel Addin.

## Resumen general
Este video tutorial explica cómo utilizar la función "Saldo Cuenta" en ContaPyme, a través del complemento Contexcel Addin en Excel, para consultar los saldos de las cuentas contables. Se cubren aspectos como la consulta de saldos de cuentas de diferentes niveles, el uso de variables de entorno, la referencia a celdas, la copia de fórmulas, la definición de parámetros (como fecha y empresa), el uso de referencias a celdas absolutas y relativas para la creación de informes, y la graficación de los saldos. Aprenderás a construir consultas de saldo dinámicas y a generar informes personalizados.

## Preguntas Frecuentes (FAQ)

### ¿Cómo consulto el saldo de una cuenta en ContaPyme usando Excel?
#### Respuesta
Para consultar el saldo de una cuenta en ContaPyme usando Excel, debes usar la función "Saldo Cuenta" provista por Contexcel Addin. Escribe la función en la celda donde quieres que aparezca el saldo. La función se comunicará con la base de datos de ContaPyme y mostrará el saldo. Recuerda que la consulta tomará en cuenta la fecha de trabajo activa y el área de trabajo (empresa) a la cual te has conectado en ContaPyme.

### ¿Puedo consultar el saldo de cuentas que no sean de primer nivel?
#### Respuesta
Sí, la función "Saldo Cuenta" permite consultar el saldo de cuentas de cualquier nivel. Solo debes especificar el código de la cuenta que deseas consultar dentro de los paréntesis de la función.

### ¿Cómo puedo sumar los saldos de varias cuentas?
#### Respuesta
Después de consultar los saldos de varias cuentas utilizando la función "Saldo Cuenta", puedes utilizar la función "SUMA" de Excel para obtener el total. Por ejemplo, si tienes los saldos de caja, banco y ahorros en las celdas B2, B3 y B4, puedes usar la fórmula `=SUMA(B2:B4)` en la celda donde quieres que aparezca el total.

### ¿Cómo afectan las variables de entorno a la consulta de saldos?
#### Respuesta
Las variables de entorno, como la fecha de trabajo activa y el área de trabajo (empresa), influyen en la consulta de saldos. Si no defines parámetros específicos en la función "Saldo Cuenta", el sistema realizará la consulta utilizando la fecha de trabajo activa y el área de trabajo a la que estás conectado.

### ¿Cómo puedo consultar el saldo de una cuenta a una fecha específica?
#### Respuesta
Puedes definir la fecha a la cual deseas realizar la consulta del saldo como un parámetro dentro de la función "Saldo Cuenta".

### ¿Cómo hago referencia a una celda que contiene el código de la cuenta en la función "Saldo Cuenta"?
#### Respuesta
En lugar de escribir el código de la cuenta directamente en la función "Saldo Cuenta", puedes hacer referencia a una celda que contenga el código. Por ejemplo, si el código de la cuenta está en la celda A1, puedes escribir la función como `=SaldoCuenta(A1)`. Luego, puedes cambiar el código en la celda A1 para consultar el saldo de diferentes cuentas.

### ¿Cómo puedo copiar la fórmula "Saldo Cuenta" para consultar el saldo de varias cuentas diferentes?
#### Respuesta
Si tienes la fórmula "Saldo Cuenta" en una celda, puedes copiarla a otras celdas para consultar el saldo de diferentes cuentas. Asegúrate de que la fórmula haga referencia a la celda correcta que contiene el código de la cuenta correspondiente.

### ¿Qué parámetros puedo definir en la función "Saldo Cuenta"?
#### Respuesta
Puedes definir varios parámetros en la función "Saldo Cuenta", incluyendo:
- Código de la cuenta.
- Fecha a la cual deseas consultar el saldo.
- Empresa (código de la empresa).
- Centro de costos (si deseas una consulta más específica).

### ¿Cómo puedo usar el asistente de Excel para definir parámetros en la función "Saldo Cuenta"?
#### Respuesta
Puedes utilizar la opción "Insertar función" de Excel para abrir el asistente para la definición de parámetros de la función "Saldo Cuenta". Esto te permite seleccionar los parámetros y sus valores de forma más visual e intuitiva.

### ¿Qué son las celdas absolutas y cómo las uso en la función "Saldo Cuenta"?
#### Respuesta
Las celdas absolutas se utilizan para fijar la referencia a una celda específica en una fórmula, de manera que al copiar la fórmula a otras celdas, la referencia a la celda absoluta no cambie. Para fijar una fila, se coloca un signo pesos ($) antes del número de fila. Para fijar una columna, se coloca un signo pesos ($) antes de la letra de la columna. Por ejemplo, `$A1` fija la columna A, `A$1` fija la fila 1 y `$A$1` fija tanto la columna A como la fila 1.

### ¿Cómo puedo crear un informe de saldos para diferentes cuentas y fechas utilizando una sola fórmula?
#### Respuesta
Para crear un informe de saldos para diferentes cuentas y fechas utilizando una sola fórmula, necesitas usar referencias a celdas absolutas y relativas. Primero, identifica qué parte de la referencia (columna o fila) debe permanecer fija al arrastrar la fórmula. Luego, coloca el signo pesos ($) antes de la letra de la columna o el número de la fila que deseas fijar.

### ¿Cómo puedo crear un gráfico del saldo de diferentes cuentas en ContaPyme?
#### Respuesta
Para graficar el saldo de diferentes cuentas, primero debes obtener los saldos utilizando la función "Saldo Cuenta". Luego, selecciona las celdas que contienen los nombres de las cuentas y sus saldos correspondientes. Ve a la pestaña "Insertar" en Excel y elige el tipo de gráfico que desees. Excel creará automáticamente el gráfico con los datos seleccionados.

---

# Software contable ContaPyme - Configuración de los perfiles de seguridad para clientes móviles
[Ver el video](https://www.youtube.com/watch?v=h5D-FMCM3ps)
Software contable ContaPyme - Configuración de los perfiles de seguridad para clientes móviles

## Tema principal
Configuración de perfiles de seguridad para usuarios de ContaPyme móvil.

## Resumen general
Este video explica cómo configurar los perfiles de seguridad para usuarios que acceden a ContaPyme desde dispositivos móviles. Se muestra cómo definir qué acciones y datos puede ver o modificar cada usuario, basándose en su perfil (ej., Asistente Contable, Vendedor). Se detalla el proceso para activar o desactivar permisos específicos para cada perfil, tanto en el módulo financiero-contable como en el de vendedor, y cómo aplicar estos cambios reiniciando el sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los perfiles de seguridad para clientes móviles en ContaPyme?
#### Respuesta
Los perfiles de seguridad para clientes móviles en ContaPyme permiten establecer restricciones o permisos específicos para cada usuario que accede al sistema desde dispositivos móviles. Esto te permite controlar qué información, reportes y operaciones puede realizar cada usuario, asegurando la integridad y confidencialidad de los datos.

### ¿Dónde se configuran los perfiles de seguridad para clientes móviles en ContaPyme?
#### Respuesta
Para configurar los perfiles de seguridad para clientes móviles, sigue estos pasos:
1.  Dirígete a la pestaña **Básico**.
2.  Haz clic en el botón **Móvil**.
3.  Selecciona la opción **Perfiles de seguridad para clientes móviles**.

### ¿Los perfiles de seguridad para clientes móviles son diferentes a los de la versión de escritorio?
#### Respuesta
Si bien los perfiles (ej., Asistente Contable, Vendedor) son los mismos que en la versión de escritorio de ContaPyme, la diferencia radica en los permisos y acciones específicas que se configuran para cada uno en el entorno móvil. Es decir, puedes tener un perfil "Vendedor" con permisos diferentes para la versión de escritorio y la versión móvil.

### ¿Cómo se configuran los permisos dentro de un perfil de seguridad para clientes móviles?
#### Respuesta
Para configurar los permisos dentro de un perfil de seguridad, sigue estos pasos:
1.  En el catálogo de perfiles de seguridad, **haz doble clic** sobre el perfil que deseas modificar (ej., Asistente Contable).
2.  Se abrirá el asistente de configuración de permisos.
3.  Verás las acciones disponibles según el tipo de licenciamiento (Cliente Móvil Financiero y Contable, o Cliente Móvil Vendedor).
4.  **Activa o desactiva** las casillas correspondientes a las acciones que deseas permitir o restringir para ese perfil. Por ejemplo, puedes impedir que un Asistente Contable acceda al catálogo de elementos de inventario o consulte estados financieros específicos.
5.  Haz clic en el botón **Aceptar** para guardar los cambios.

### ¿Qué tipos de licenciamiento impactan la configuración de los perfiles de seguridad para clientes móviles?
#### Respuesta
Los tipos de licenciamiento que impactan la configuración de los perfiles de seguridad para clientes móviles son:
*   **Licencia Cliente Móvil Financiero y Contable:** Define los permisos relacionados con la información financiera y contable.
*   **Licencia Cliente Móvil Vendedor:** Define los permisos relacionados con las actividades de venta.

### ¿Qué tipo de acciones puedo restringir a través de los perfiles de seguridad?
#### Respuesta
Puedes restringir el acceso a catálogos (como el de elementos de inventario o el plan de cuentas), la visualización de informes (como el balance general o el estado de resultados), y la ejecución de operaciones (como desprocesar pedidos). La disponibilidad de estas opciones dependerá del tipo de licenciamiento (financiero-contable o vendedor) y del perfil que estés configurando.

### ¿Qué debo hacer para que los cambios en los perfiles de seguridad se apliquen?
#### Respuesta
Después de guardar los cambios en la configuración de un perfil de seguridad, el sistema te indicará que debes **reiniciar el sistema** para que los cambios se hagan efectivos.

---

# Software contable ContaPyme - Configuración de los usuarios móviles
[Ver el video](https://www.youtube.com/watch?v=nuXExva2Z1I)
nuXExva2Z1I

## Tema principal
Configuración de usuarios en ContaPyme para acceso desde dispositivos móviles.

## Resumen general
Este video explica cómo configurar usuarios en ContaPyme para que puedan acceder y trabajar desde dispositivos móviles. El proceso implica asignar una licencia móvil, registrar un correo electrónico único y definir una contraseña para cada usuario. Se muestran los pasos para habilitar la conexión móvil en el catálogo de usuarios del sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué configuraciones son necesarias para que un usuario pueda conectarse a ContaPyme desde un dispositivo móvil?
#### Respuesta
Para que un usuario pueda conectarse a ContaPyme desde un dispositivo móvil, es necesario:
1.  Asignarle una licencia móvil.
2.  Registrar un correo electrónico único para la conexión.
3.  Definir una contraseña de acceso.

### ¿Cómo se habilita un usuario para que pueda acceder a ContaPyme desde un dispositivo móvil?
#### Respuesta
Para habilitar un usuario para el acceso móvil, siga estos pasos:

1.  Ingrese al catálogo de usuarios del sistema.
2.  Elija el usuario que se conectará desde dispositivos móviles.
3.  Dé clic en el botón **Modificar**.
4.  En la pestaña **General**, defina la contraseña de acceso.
5.  En la pestaña **Conexión Cliente Móvil**, active la opción "**Este usuario se puede conectar al sistema por medio del cliente móvil**".
6.  Elija la licencia que el usuario utilizará.
7.  En la pestaña **Plataforma Web**, defina el correo electrónico que el usuario utilizará para la conexión.
8.  Dé clic en el botón **Aceptar** para guardar los datos.

### ¿Dónde se define la contraseña de acceso para un usuario móvil en ContaPyme?
#### Respuesta
La contraseña de acceso para un usuario móvil se define en la pestaña **General** al modificar el usuario dentro del catálogo de usuarios del sistema. Esta contraseña es obligatoria para poder acceder desde dispositivos móviles.

### ¿Dónde se selecciona la licencia móvil que utilizará un usuario en ContaPyme?
#### Respuesta
La licencia móvil se selecciona en la pestaña **Conexión Cliente Móvil**, activando la opción "**Este usuario se puede conectar al sistema por medio del cliente móvil**".

### ¿En qué parte de la configuración del usuario se define el correo electrónico que se utilizará para la conexión móvil?
#### Respuesta
El correo electrónico que el usuario utilizará para la conexión móvil se define en la pestaña **Plataforma Web** dentro de la configuración del usuario.

---

# Software contable ContaPyme - Consulta de estados financieros
[Ver el video](https://www.youtube.com/watch?v=ZWroL7unf70)
Consulta estados financieros desde ContaPyme Móvil

## Tema principal
Consulta de estados financieros en tiempo real a través de la aplicación móvil ContaPyme.

## Resumen general
El video explica cómo utilizar la herramienta de consulta de estados financieros en ContaPyme Móvil para acceder a la información financiera de la empresa en tiempo real. Se muestra cómo visualizar los saldos de las cuentas, comparar periodos, acceder a cuentas hijas, generar gráficos y consultar los documentos que generaron los saldos. La aplicación permite a los usuarios mantenerse al tanto de la situación financiera de la empresa desde cualquier lugar.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la opción de estados financieros en ContaPyme Móvil?
#### Respuesta
Para acceder a la opción de estados financieros, primero debes iniciar sesión en ContaPyme Móvil. Luego, en el menú **Consultas**, selecciona la opción **Estados Financieros**.

### ¿Qué información se muestra por defecto al ingresar a la sección de estados financieros?
#### Respuesta
Por defecto, se muestran todas las cuentas de primer nivel con sus respectivos saldos en formato de datos (texto).

### ¿Cómo puedo ver los saldos de las cuentas en formato gráfico?
#### Respuesta
En la barra superior de la página de estados financieros, haz clic sobre el botón **Gráficos**. Esto mostrará un gráfico con el saldo de las cuentas de primer nivel. Para volver a la información en formato texto, haz clic en el botón **Datos**.

### ¿Qué opciones de visualización tengo disponibles para el estado de una cuenta?
#### Respuesta
En la parte inferior de la pantalla, puedes elegir entre las siguientes opciones de visualización:
- **Movimientos:** Muestra los movimientos de la cuenta.
- **Saldos:** Muestra el valor acumulado de las cuentas.
- **Comparativo:** Presenta el saldo del mes anterior, los débitos y créditos del periodo actual, el nuevo saldo y el porcentaje de variación entre los dos periodos.

### ¿Cómo puedo ver las cuentas hijas de una cuenta principal?
#### Respuesta
Para visualizar las cuentas hijas de una cuenta principal, simplemente haz clic sobre el nombre de la cuenta principal. Se desplegarán las cuentas hijas correspondientes. Puedes seguir desagregando la cuenta dando clic sobre las cuentas hijas.

### ¿Cómo vuelvo al listado de las cuentas de primer nivel desde una cuenta interna?
#### Respuesta
En la parte superior derecha de la pantalla, encontrarás un botón llamado **Inicio**. Al hacer clic en este botón, serás redirigido al listado de las cuentas de primer nivel.

### ¿Cómo puedo cambiar el mes de consulta para ver información de periodos anteriores?
#### Respuesta
En cualquier momento, puedes cambiar el mes de consulta seleccionando un mes diferente en la opción correspondiente (por ejemplo, "marzo del 2013"). La información se actualizará automáticamente para mostrar los datos del mes seleccionado.

### ¿Qué información puedo encontrar al dar clic en el icono de menú al final de cada renglón de la cuenta?
#### Respuesta
Al dar clic en el icono de menú, se despliegan las siguientes opciones:
- **Movimiento diario:** Muestra el movimiento de la cuenta en cada día del mes.
- **Movimiento mensual:** Muestra el movimiento de la cuenta en cada mes del año.
- **Movimiento Bimestral:** Muestra el saldo de la cuenta cada dos meses.
- **Movimiento Trimestral:** Muestra el saldo de la cuenta cada tres meses.
- **Movimiento Semestral:** Muestra el saldo de la cuenta cada seis meses.
- **Movimiento anual:** Muestra el movimiento de la cuenta en cada año.
- **Resumen mes:** Muestra los datos de movimientos, variaciones y saldos de la cuenta tanto del mes actual como del año actual.
- **Agregar a favoritos:** Permite agregar la cuenta a una lista de favoritos financieros (esta opción se explica en detalle en otro video).

### ¿Cómo puedo ver el movimiento de la cuenta en cada día del mes y compararlo con otros meses?
#### Respuesta
Sigue estos pasos:
1.  En la lista de cuentas, haz clic en el icono de menú (tres puntos) al final del renglón de la cuenta que deseas consultar.
2.  Selecciona la opción **Movimiento diario**.
3.  Para hacer comparativos, busca la opción de comparar con otros meses y selecciona el mes que desees.
4.  Opcionalmente, puedes generar gráficos para visualizar mejor los valores haciendo clic en el botón **Gráficos**.

### ¿Qué tipo de documentos puedo consultar al dar clic sobre el nombre de una cuenta?
#### Respuesta
Cuando estás en cuentas de último nivel y das clic sobre el nombre de la cuenta, el sistema presenta un listado de los documentos que generaron el saldo de la cuenta. Estos documentos pueden incluir facturas de venta, comprobantes de ingreso, comprobantes de egreso, facturas de compra, entre otros.

### ¿Cómo puedo visualizar el documento que generó el saldo de la cuenta?
#### Respuesta
Después de dar clic en el nombre de la cuenta y ver el listado de documentos, haz clic sobre el documento que te interesa. Se mostrará el documento de impresión de la operación en formato PDF. Puedes usar las opciones de zoom para aumentar el tamaño del informe y verlo con mayor detalle.

---

# Software contable ContaPyme - Consulta de información financiera por tercero
[Ver el video](https://www.youtube.com/watch?v=jiyHWdzP4Aw)
jiyHWdzP4Aw

## Tema principal
Consulta de información financiera de terceros en ContaPyme Móvil.

## Resumen general
Este video explica cómo consultar información financiera relacionada con los terceros (clientes, vendedores, etc.) desde la aplicación ContaPyme Móvil. Muestra cómo acceder al catálogo de terceros, seleccionar un tercero específico y visualizar su información financiera, como cuentas por cobrar, ventas, ingresos, etc. Además, explica cómo interpretar los saldos presentados y cómo cambiar el formato de visualización de la información. El video resalta la utilidad de esta herramienta para mantenerse informado sobre la situación financiera de los terceros de la empresa.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipo de información financiera puedo consultar por tercero en ContaPyme Móvil?
#### Respuesta
Puedes consultar información como cuentas por cobrar, cuentas por pagar, gastos, ingresos recibidos y sueldos, entre otros, dependiendo de la configuración realizada en ContaPyme de escritorio.

### ¿Dónde se configura qué información financiera se puede consultar por cada tipo de tercero?
#### Respuesta
La configuración de las cuentas de las cuales se obtendrá el saldo y el tipo de tercero al que aplicará, se realiza en la versión de escritorio de ContaPyme. Para más detalles, consulta el video "Configuración de información financiera por tipo de tercero".

### ¿Cómo accedo a la información financiera de un tercero en ContaPyme Móvil?
#### Respuesta
Para acceder a la información financiera de un tercero:
1. Inicia sesión en ContaPyme Móvil.
2. Ingresa al catálogo de terceros.
3. Selecciona el tercero del cual deseas obtener la información financiera.
4. En la ficha del tercero, en la parte inferior, da clic en la opción **Información Financiera**.

### ¿Qué información se muestra al acceder a la sección "Información Financiera" de un tercero?
#### Respuesta
Se presenta una nueva página con los "favoritos financieros" creados para ese tipo de tercero. En cada favorito, se muestra el saldo correspondiente al tercero. Por ejemplo, para el favorito "Cuentas por Cobrar Clientes", se muestra el saldo que el cliente adeuda a la empresa.

### ¿Cómo puedo ver el detalle de las operaciones que generaron un saldo en un favorito financiero?
#### Respuesta
Para ver el detalle de las operaciones, da clic sobre el saldo del favorito financiero. Esto mostrará la ficha de detalle con información como el número y fecha del documento, fecha de pago, saldo y descripción.

### ¿Puedo cambiar la forma en que se presenta la información del saldo en la ficha de detalle?
#### Respuesta
Sí, puedes cambiar el formato de presentación del saldo dando clic en el menú desplegable que se encuentra en la zona de título de la ficha de detalle. Las opciones disponibles dependen de la configuración del favorito.

### ¿Qué tipos de formatos de presentación de saldo puedo encontrar en la ficha de detalle?
#### Respuesta
Algunos formatos de presentación de saldo que puedes encontrar son:
- **Movimiento Mensual:** Presenta mes a mes los saldos.
- **Saldos Mensuales:** Muestra mes a mes el acumulado de las cuentas.
- **Ficha según tipo de operación:** Muestra las operaciones configuradas en la ficha que generaron el saldo.
- **Ficha detalle de vencimientos de Cuentas por Cobrar:** Muestra los vencimientos y plazos de las cuentas por cobrar.

### ¿Dónde puedo cambiar el año que se muestra en las fichas de "Movimiento Mensual" y "Saldos Mensuales"?
#### Respuesta
Puedes cambiar el año utilizando el menú desplegable que se encuentra en la barra de título de la ficha.

### ¿Qué tipo de información se muestra en la "Ficha detalle de vencimientos de Cuentas por Cobrar"?
#### Respuesta
Esta ficha muestra los vencimientos y los plazos de las cuentas por cobrar, indicando si hay saldos vencidos y por cuánto tiempo.

### ¿Es la misma información financiera la que se muestra para todos los tipos de terceros?
#### Respuesta
No, los favoritos financieros que se muestran dependen del tipo de tercero. Por ejemplo, los favoritos financieros para un cliente serán distintos a los que se muestran para un vendedor.

---

# Software contable ContaPyme - Consulta de listas de precios en ContaPyme móvil
[Ver el video](https://www.youtube.com/watch?v=e1iuWmZn994)
Consulta de listas de precios en ContaPyme móvil

## Tema principal
Consulta de precios de productos en diferentes listas de precios desde la aplicación móvil de ContaPyme.

## Resumen general
Este video explica cómo los vendedores pueden consultar los precios de los productos en diferentes listas de precios utilizando la aplicación móvil de ContaPyme. Se define y diferencia entre la lista de precios por defecto y las listas de precios permitidas. Se muestra cómo configurar estas listas desde la versión de escritorio de ContaPyme y cómo acceder y cambiar entre las diferentes listas de precios en la aplicación móvil para visualizar los precios actualizados de los productos.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la "lista de precios por defecto"?
#### Respuesta
La lista de precios por defecto es el listado de precios que se asigna a un vendedor para que, al visualizar los productos en la aplicación móvil, se muestren los precios de esa lista específica.

### ¿Qué son las "listas de precios permitidas"?
#### Respuesta
Las listas de precios permitidas son los listados adicionales que se asignan a un vendedor, además de la lista de precios por defecto. Esto le da la posibilidad de consultar los precios de los productos en otros listados alternativos desde la aplicación móvil.

### ¿Cómo se asignan las listas de precios a los usuarios desde ContaPyme Escritorio?
#### Respuesta
Para asignar las listas de precios a un usuario en ContaPyme Escritorio, sigue estos pasos:
1.  Ve a la pestaña **Básico**.
2.  Ingresa al catálogo de **Usuarios**.
3.  Selecciona el usuario al cual le vas a asignar las listas de precios y haz **doble clic** sobre él.
4.  Ubícate en la pestaña **Listas de precios**.
5.  En el campo **Lista de precios por defecto**, selecciona la lista de precios que se utilizará para mostrar los precios de los productos.
6.  En el campo **Listas de precios permitidas para el usuario**, asigna las listas de precios adicionales que el vendedor podrá consultar.
7.  Haz clic en el botón **Aceptar** para guardar la configuración.

### ¿Qué ocurre si no se asignan listas de precios permitidas a un usuario?
#### Respuesta
Si no se asignan listas de precios permitidas a un usuario, el sistema asumirá que la única lista permitida es la lista de precios que se asignó por defecto.

### ¿Qué ocurre si no se define ni la lista de precios por defecto ni las listas de precios permitidas para un usuario?
#### Respuesta
Si no se define ninguna lista de precios, ni por defecto ni permitidas, el sistema asumirá que el usuario tiene acceso a todas las listas de precios existentes en el sistema. Podrá ver los precios de los productos en todas las listas disponibles.

### ¿Cómo se consultan los precios de los productos desde ContaPyme Móvil?
#### Respuesta
Para consultar los precios de los productos desde ContaPyme Móvil, sigue estos pasos:
1.  Inicia sesión en la aplicación.
2.  En el menú, da clic a la opción **Precios** dentro de **Consultas**.
3.  Selecciona una opción para ingresar al catálogo de productos (por ejemplo, **Ver Todos**).
4.  En el listado, se mostrará el precio de cada producto según la lista de precios por defecto.

### ¿Cómo se cambia la lista de precios en ContaPyme Móvil para ver los precios en otras listas?
#### Respuesta
Para cambiar la lista de precios y consultar los precios en otras listas en ContaPyme Móvil, sigue estos pasos:
1.  Dentro de la sección de **Precios**, da clic en el botón de **Configuración** (esquina superior derecha).
2.  Da clic en el campo **Lista de precios**. Se mostrarán las listas de precios permitidas para el usuario.
3.  Selecciona la lista de precios que deseas consultar.
4.  Da clic en el botón **Aceptar**. Los precios mostrados en el listado se actualizarán según la lista de precios seleccionada.

### ¿Cómo se puede acceder a la información detallada de un producto en ContaPyme Móvil?
#### Respuesta
Para acceder a la información detallada de un producto en ContaPyme Móvil, da clic sobre el renglón del producto en el listado de precios. Se mostrará una ficha técnica con información como imagen, datos principales y datos adicionales, incluyendo la lista de partes (si es un elemento compuesto) y las listas de precios. Para volver al listado, da clic en el botón **Atrás**.

---

# Software contable ContaPyme - Consulta de todas las operaciones de la empresa
[Ver el video](https://www.youtube.com/watch?v=n82n4mI1-n4)
[Software contable ContaPyme - Consulta de todas las operaciones de la empresa]

## Tema principal
Auditoría y control de las operaciones de la empresa desde Contapyme móvil.

## Resumen general
Este video explica cómo realizar un seguimiento y control de las operaciones de la empresa utilizando la aplicación móvil Contapyme. Muestra cómo acceder al listado de operaciones, filtrar por diferentes criterios, procesar o desprocesar operaciones en lote, y visualizar detalles de cada operación individualmente, como facturas, pedidos y cotizaciones. Se aprende a identificar el estado de las operaciones (procesadas o sin procesar) y a reconocer si existen errores o advertencias asociadas a cada una.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo acceder a la consulta de operaciones en ContaPyme móvil?
#### Respuesta
Para acceder a la consulta de operaciones, debes seguir estos pasos:

1.  **Iniciar sesión** en ContaPyme móvil.
2.  En el **menú principal**, dar clic en la opción **Consulta Operaciones** del menú catálogos.

### ¿Cómo están ordenadas las operaciones en la lista?
#### Respuesta
Las operaciones se muestran ordenadas por **fecha** de realización.

### ¿Cuántos registros de operaciones se muestran por página? ¿Cómo puedo navegar entre las páginas?
#### Respuesta
El sistema muestra **20 registros** por página. Puedes navegar entre las páginas utilizando los iconos ubicados en la parte **superior e inferior** de la página.

### ¿Cómo puedo buscar operaciones específicas en la lista?
#### Respuesta
Puedes buscar operaciones de dos maneras:

1.  **Búsqueda por código, código de tercero o descripción:** Ingresa el parámetro de búsqueda en la caja de texto y da clic en el botón **Buscar**. Para cerrar el filtro, da clic en el icono de la **X**.
2.  **Filtros avanzados:** Da clic en el botón **Filtro**. En el formulario que se carga, define los parámetros de búsqueda (por ejemplo, operaciones de un mes específico con un estado determinado) y da clic en el botón **Buscar**.

### ¿Cómo puedo procesar o desprocesar múltiples operaciones a la vez?
#### Respuesta
Puedes procesar o desprocesar operaciones en lote siguiendo estos pasos:

1.  Da clic en la opción **Procesar** o **Desprocesar** (ubicada en la parte superior e inferior de la página).
2.  Selecciona una de las opciones disponibles:
    *   Procesar/Desprocesar operaciones del día.
    *   Procesar/Desprocesar operaciones del mes.
    *   Procesar/Desprocesar operaciones de la página.
    *   Procesar/Desprocesar operaciones resultado de un filtro.
3.  Da clic sobre la opción deseada. El sistema ejecuta el proceso.
4.  Al finalizar, el sistema indicará cuántas operaciones se procesaron/desprocesaron correctamente y cuántas no. Da clic en el botón **Aceptar**.

### ¿Cómo puedo identificar el estado de una operación en la lista?
#### Respuesta
El estado de la operación (procesada o sin procesar) se muestra en la columna correspondiente a cada operación. Además, el color del renglón indica el estado:

*   **Azul:** Operación procesada.
*   **Blanco:** Operación sin procesar.

### ¿Cómo puedo saber si una operación tiene errores o advertencias?
#### Respuesta
Si una operación tiene errores o advertencias, se mostrará un indicador al frente del estado de la operación:

*   **Errores:** El número de errores seguido de la letra **"e"** en color **rojo**.
*   **Advertencias:** El número de advertencias seguido de la letra **"a"** en color **azul**.

### ¿Qué acciones puedo realizar sobre una operación individual?
#### Respuesta
Para realizar acciones sobre una operación individual:

1.  Da clic en el **icono de menú** (tres puntos) al final del renglón de la operación.
2.  Selecciona la acción deseada:
    *   Procesar la operación.
    *   Verificar la operación.
    *   Anular la operación.

### ¿Cómo puedo ver los detalles de una operación?
#### Respuesta
Para ver los detalles de una operación, da clic sobre el renglón de la operación en la lista. El sistema mostrará el documento de impresión en formato PDF. Puedes usar el zoom para visualizar los detalles del documento. Luego da clic en el botón **Atrás** para regresar al listado de operaciones.

---

# Software contable ContaPyme - ContaExcel Add In - Cómo obtener ayuda en ContaExcel Add In
[Ver el video](https://www.youtube.com/watch?v=neZUjfzc3TM)

## Tema principal
Obtener ayuda sobre las funciones del asistente ContaExcel Add In.

## Resumen general
Este video explica cómo acceder a la ayuda disponible dentro del asistente ContaExcel Add In para entender y utilizar correctamente las funciones. Se muestran dos métodos principales: utilizar el botón FX para el asistente de funciones y acceder a la ayuda escrita detallada que proporciona Insoft, incluyendo descripciones de parámetros, ejemplos y conceptos relacionados. El video destaca la importancia de esta ayuda para comprender y aplicar las funciones de manera efectiva.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo obtener ayuda sobre una función específica en ContaExcel Add In?
#### Respuesta
Puedes obtener ayuda sobre una función utilizando el asistente o accediendo a la ayuda escrita.

### ¿Cuál es el primer paso para obtener ayuda sobre una función usando el asistente?
#### Respuesta
El primer paso es escribir el nombre de la función, seguido de un paréntesis. Por ejemplo, si quieres ayuda con la función "saldo cuenta", debes escribir "=saldo cuenta(".

### ¿Qué botón debo seleccionar para acceder al asistente de funciones?
#### Respuesta
Después de escribir el nombre de la función y abrir el paréntesis, debes seleccionar el botón "FX". Este botón abre el asistente de la función.

### ¿Qué información me proporciona el asistente de funciones?
#### Respuesta
El asistente de funciones te muestra los parámetros que la función requiere, en qué orden deben ser ingresados y una breve descripción de cada uno. Por ejemplo, para la función "saldo cuenta", te indicará que primero debes ingresar la identificación de la cuenta, luego la fecha de finalización, y opcionalmente, el código de la empresa y el código del centro de costos.

### ¿Cómo puedo ingresar el valor de un parámetro en el asistente de funciones?
#### Respuesta
Puedes ingresar el valor directamente o marcar la celda que contiene el valor deseado. Luego, haz clic en el botón correspondiente en el asistente para que el valor sea evaluado.

### ¿Cómo accedo a la ayuda escrita detallada sobre una función?
#### Respuesta
1.  Escribe el nombre de la función seguido de un paréntesis (por ejemplo, =saldo cuenta().
2.  Haz clic en el botón "FX".
3.  En la parte inferior izquierda del asistente que aparece, busca y haz clic en el texto que dice "ayuda sobre esta función".

### ¿Qué tipo de información puedo encontrar en la ayuda escrita?
#### Respuesta
La ayuda escrita proporciona información detallada sobre la función, incluyendo:
-   El nombre de la función.
-   Los parámetros que requiere (indicando cuáles son opcionales con corchetes).
-   Una descripción de la función.
-   Una explicación detallada de cada argumento o parámetro.
-   Notas especiales.
-   Ejemplos de uso.
-   Conceptos preliminares sobre ContaPyme y ContaExcel.

### ¿Quién desarrolló la ayuda escrita disponible en ContaExcel Add In?
#### Respuesta
La ayuda escrita fue desarrollada por el ingeniero Hernán Arango, desarrollador líder del proyecto ContaExcel Add In.

### ¿Qué tipo de ejemplos se encuentran en la ayuda escrita?
#### Respuesta
La ayuda escrita contiene muchos ejemplos prácticos para facilitar el aprendizaje y la aplicación de las funciones.

### ¿Cómo puedo ver todas las funciones disponibles en ContaExcel Add In?
#### Respuesta
Dentro de la ayuda escrita, puedes navegar a través de las funciones por categorías (por ejemplo, funciones de contabilidad) o ir directamente a una función específica.

---

# Software Contable ContaPyme - ContaExcel Add In - Ej. Movimiento cuenta - empresa - cc
[Ver el video](https://www.youtube.com/watch?v=gx8q82kwhoc)

## Tema principal
Obtención de movimientos contables por cuenta, empresa y centro de costos utilizando la función Movimiento Cuenta en ContaPyme con ContaExcel Add-in.

## Resumen general
El video explica cómo utilizar la función "Movimiento Cuenta" en ContaPyme, a través del add-in ContaExcel, para obtener información detallada de los movimientos contables.  Se enfoca en la extracción de datos específicos filtrando por cuenta, rango de fechas, empresa y centro de costos.  Muestra cómo construir la fórmula en Excel, utilizando referencias a celdas para facilitar el cambio de parámetros y la actualización automática de los resultados.  También explica cómo obtener el nombre del centro de costos utilizando la función Nombre CC.

## Preguntas Frecuentes (FAQ)

### ¿Cómo se usa la función Movimiento Cuenta en ContaPyme con ContaExcel Add-in?
#### Respuesta
La función Movimiento Cuenta se utiliza en Excel con el Add-in ContaExcel para obtener los movimientos de una cuenta contable específica. La función tiene varios parámetros, algunos de los cuales son opcionales. La sintaxis general es: `MovCuenta(cuenta, fecha_inicial, fecha_final, empresa, centro_costos)`.

### ¿Qué parámetros son obligatorios y cuáles son opcionales en la función Movimiento Cuenta?
#### Respuesta
*   **Obligatorios:** El código de la cuenta contable.
*   **Opcionales:** Fecha inicial, fecha final, código de la empresa, código del centro de costos.  Los parámetros opcionales se indican con corchetes en la documentación de la función, pero estos corchetes no se deben incluir en la fórmula de Excel.

### ¿Qué sucede si no se especifica la fecha inicial o final en la función Movimiento Cuenta?
#### Respuesta
Si no se especifica la fecha inicial, el sistema considera el inicio de los tiempos (1 de enero de 1900). Si no se especifica la fecha final, el sistema toma la fecha de trabajo actual en ContaPyme.

### ¿Qué sucede si no se especifica la empresa o el centro de costos en la función Movimiento Cuenta?
#### Respuesta
Si no se especifica el código de la empresa, el sistema toma la empresa de trabajo configurada en ContaPyme. Si no se especifica el centro de costos, el sistema considera todos los centros de costos.

### ¿Cómo puedo obtener los ingresos mensuales para un centro de costos específico utilizando la función Movimiento Cuenta?
#### Respuesta
Para obtener los ingresos mensuales para un centro de costos específico, siga estos pasos:
1.  En Excel, cree una celda para el mes y otra para el año.
2.  Calcule la fecha inicial del mes con la fórmula `=FECHA(año, mes, 1)`, donde "año" y "mes" son las celdas que contienen el año y el mes deseados.
3.  Calcule la fecha final del mes con la fórmula `=FIN.MES(fecha_inicial, 0)`, donde "fecha\_inicial" es la celda que contiene la fecha inicial calculada en el paso anterior.
4.  Utilice la función `MovCuenta` de la siguiente manera: `=MovCuenta(cuenta, fecha_inicial, fecha_final, empresa, centro_costos)`. Reemplace los argumentos con las celdas correspondientes.

    *   `cuenta`: La celda que contiene el código de la cuenta de ingresos.
    *   `fecha_inicial`: La celda que contiene la fecha inicial calculada.
    *   `fecha_final`: La celda que contiene la fecha final calculada.
    *   `empresa`: (Opcional) Si desea especificar una empresa diferente a la empresa de trabajo, ingrese el código de la empresa. De lo contrario, deje este campo vacío.
    *   `centro_costos`: La celda que contiene el código del centro de costos. Asegúrese de fijar esta celda con `F4` si va a copiar la fórmula a otras celdas.
5.  Copie la fórmula a las celdas correspondientes a las demás cuentas de ingresos.

### ¿Cómo puedo obtener el nombre del centro de costos en Excel?
#### Respuesta
Puede utilizar la función `NombreCC` para obtener el nombre del centro de costos. La sintaxis es: `NombreCC(codigo_empresa, codigo_centro_costos, [nombre_largo])`.

1.  `codigo_empresa`: El código de la empresa. Puede ser la empresa de trabajo.
2.  `codigo_centro_costos`: El código del centro de costos.
3.  `[nombre_largo]`: (Opcional) Un valor lógico (VERDADERO o FALSO) que indica si se desea el nombre largo o corto del centro de costos. Si se omite, se asume el nombre corto.

---

# Software contable ContaPyme - ContaExcel Add In - Ejemplo - Función Nombre Cuenta
[Ver el video](https://www.youtube.com/watch?v=8dlH2CX1Gas)
8dlH2CX1Gas

## Tema principal
Uso de la función "Nombre Cuenta" en ContaPyme Add-in para Excel para obtener nombres de cuentas y construir un balance.

## Resumen general
Este video explica cómo utilizar la función "Nombre Cuenta" del Add-in ContaPyme para Excel. Esta función permite obtener el nombre de una cuenta contable directamente desde ContaPyme, utilizando su código. El video muestra cómo usar esta función para automatizar la creación de un balance, obteniendo los nombres y saldos de las cuentas y calculando la utilidad. Se aprende cómo referenciar celdas en Excel para dinamizar la función y cómo interpretar el resultado del cálculo de la utilidad.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo obtener el nombre de una cuenta en Excel usando el código de la cuenta en ContaPyme?
#### Respuesta
Puedes usar la función "Nombre Cuenta" del Add-in ContaPyme para Excel. Solo necesitas ingresar el código de la cuenta, y la función te devolverá el nombre correspondiente.

### ¿Cómo uso la función "Nombre Cuenta" en una celda de Excel?
#### Respuesta
1.  En la celda donde deseas que aparezca el nombre de la cuenta, escribe: `=NombreCuenta(`
2.  Indica la celda donde se encuentra el código de la cuenta o escribe el código directamente entre comillas. Por ejemplo, si el código está en la celda A19, escribe: `=NombreCuenta(A19)` o si el código es 110505 escribe: `=NombreCuenta("110505")`
3.  Presiona Enter. La celda mostrará el nombre de la cuenta asociada al código ingresado.

### ¿Cómo puedo crear un balance en Excel usando las funciones "Nombre Cuenta" y "Saldo Cuenta" de ContaPyme Add-in?
#### Respuesta
1.  En una columna, ingresa los códigos de las cuentas que deseas incluir en el balance.
2.  En la columna adyacente, usa la función "Nombre Cuenta" para obtener el nombre de cada cuenta, referenciando la celda donde está el código de la cuenta. Por ejemplo: `=NombreCuenta(A1)`.
3.  En otra columna, usa la función "Saldo Cuenta" para obtener el saldo de cada cuenta, referenciando la celda donde está el código de la cuenta. Por ejemplo: `=SaldoCuenta(A1)`.
4.  Para calcular la utilidad, suma los saldos de las cuentas correspondientes. Asegúrate de considerar la naturaleza de las cuentas (débito o crédito) al sumar.

### ¿Cómo interpreta el signo del resultado al calcular la utilidad usando los saldos de las cuentas?
#### Respuesta
El signo del resultado indica si hay utilidad o pérdida. Si el resultado es positivo, significa que hay utilidad. Esto se debe a que la función conserva la naturaleza de las cuentas al realizar el cálculo.

### ¿Qué debo hacer si quiero que el saldo de la cuenta se obtenga a una fecha diferente a la fecha de trabajo actual?
#### Respuesta
El video no explica cómo obtener el saldo de la cuenta a una fecha diferente a la fecha de trabajo actual.

---

# Software contable ContaPyme - ContaExcel Add In - Ejemplo - Función Saldo Cuenta
[Ver el video](https://www.youtube.com/watch?v=uOy6XiXI2PY)

## Tema principal
Uso de la función "Saldo Cuenta" de ContaPyme en Excel para extraer información contable.

## Resumen general
Este video explica cómo utilizar la función "Saldo Cuenta" de ContaPyme dentro de Microsoft Excel. Esta función permite extraer saldos de cuentas contables directamente desde la base de datos de ContaPyme a una hoja de cálculo de Excel. El video muestra un ejemplo práctico de cómo construir un balance simple utilizando esta función, enfatizando la importancia de la fecha de trabajo en ContaPyme, ya que si no se especifica una fecha en la función, el sistema tomará la fecha de trabajo actual para calcular los saldos. También explica cómo el sistema toma la empresa activa y el área de trabajo de ContaPyme si no se especifica en la función.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la función "Saldo Cuenta" en ContaExcel Add-in?
#### Respuesta
La función "Saldo Cuenta" es una función adicional que se integra a Microsoft Excel a través del Add-in ContaExcel. Permite extraer el saldo de una cuenta contable específica directamente desde la base de datos de ContaPyme.

### ¿Cómo se utiliza la función "Saldo Cuenta" en Excel?
#### Respuesta
Para utilizar la función "Saldo Cuenta", sigue estos pasos:
1.  Posiciónate en la celda donde quieres que aparezca el saldo.
2.  Escribe "=SaldoCuenta(" seguido del código de la cuenta contable entre comillas, por ejemplo: "=SaldoCuenta("1")".
3.  Presiona "Enter".
    Excel se conectará a ContaPyme y mostrará el saldo de la cuenta.

### ¿Qué significa que el saldo de una cuenta aparezca en negativo al usar la función "Saldo Cuenta"?
#### Respuesta
Que el saldo de una cuenta aparezca en negativo indica que la naturaleza de esa cuenta es crédito. Las cuentas de pasivo y patrimonio generalmente tienen naturaleza crédito.

### ¿Qué sucede si no se especifica la fecha al utilizar la función "Saldo Cuenta"?
#### Respuesta
Si no se especifica la fecha dentro de la función "Saldo Cuenta", el sistema tomará la fecha de trabajo configurada en ContaPyme para calcular el saldo. Es crucial verificar que la fecha de trabajo sea la correcta, ya que esto afectará los resultados.

### ¿Qué fecha de trabajo debo tener en cuenta para el cálculo de los saldos?
#### Respuesta
Es importante recordar que la fecha de trabajo afecta los saldos calculados.  Si no especificas la fecha en la función Saldo Cuenta, el sistema usará la fecha de trabajo actual en ContaPyme. Para modificar la fecha de trabajo, debes hacerlo directamente en ContaPyme.

### ¿Qué empresa y área de trabajo se utilizan para calcular el saldo si no se especifican en la función?
#### Respuesta
Si no se especifica la empresa y el área de trabajo dentro de la función "Saldo Cuenta", el sistema utilizará la empresa activa y el área de trabajo seleccionada en ContaPyme en ese momento. Asegúrate de que la empresa y el área de trabajo sean las correctas para obtener los saldos deseados.

### ¿Cómo afecta cambiar la fecha de trabajo en ContaPyme los valores calculados con la función "Saldo Cuenta" en Excel?
#### Respuesta
Al cambiar la fecha de trabajo en ContaPyme, los valores calculados con la función "Saldo Cuenta" en Excel se actualizarán automáticamente para reflejar los saldos correspondientes a esa nueva fecha. Si te devuelves un mes, los valores mostrados cambiarán, y si avanzas, también.

---

# Software Contable ContaPyme - ContaExcel Add In - Ejemplo - Manejo de fechas
[Ver el video](https://www.youtube.com/watch?v=7JOMUAGuudc)
ContaExcel Add In - Ejemplo - Manejo de fechas

## Tema principal
Cálculo de fechas de inicio y finalización de mes utilizando fórmulas en ContaExcel.

## Resumen general
Este video explica cómo obtener las fechas de inicio y finalización de cada mes utilizando fórmulas en ContaExcel. Se muestra cómo usar la función `FECHA` para calcular la fecha inicial y la función `FIN.MES` para calcular la fecha final. El video destaca la importancia de estas fórmulas para la creación de cuadros históricos e indicadores comunes en ContaExcel.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo calcular la fecha inicial de un mes en ContaExcel?
#### Respuesta
Puedes utilizar la función `FECHA` para calcular la fecha inicial de un mes. Debes proporcionar el año, el mes y el día (siempre será 1 para el inicio de mes). Por ejemplo, si quieres la fecha inicial de enero de 2012, la fórmula sería: `=FECHA(2012,1,1)`.

### ¿Cómo puedo fijar el año en la fórmula para que no cambie al copiarla a otras celdas?
#### Respuesta
Para fijar el año en la fórmula, utiliza la tecla F4 después de seleccionar la celda que contiene el año. Esto agregará símbolos de dólar ($) antes de la letra de la columna y el número de la fila, indicando que esa referencia es absoluta. Por ejemplo, si el año está en la celda A1, selecciona A1 en la fórmula y presiona F4 para que se convierta en `$A$1`.

### ¿Cómo puedo obtener la fecha del último día de un mes en ContaExcel?
#### Respuesta
Puedes utilizar la función `FIN.MES` (o `EOMONTH` en inglés) para obtener la fecha del último día de un mes. Esta función toma como argumento una fecha y devuelve el último día del mes correspondiente.
**Ejemplo:** Si la fecha de inicio de un mes está en la celda B2, la fórmula sería: `=FIN.MES(B2,0)`. El "0" indica que quieres el último día del mismo mes.

### ¿Por qué es importante el manejo de fechas en ContaExcel?
#### Respuesta
El manejo de fechas es fundamental para crear cuadros históricos e indicadores, que son muy comunes en ContaExcel. Permite analizar datos a lo largo del tiempo y realizar comparaciones entre diferentes periodos.

---

# Software Contable ContaPyme - ContaExcel Add In - Ejemplo - Saldo cuenta y Nombre cuenta
[Ver el video](https://www.youtube.com/watch?v=USu1DX168zI)

## Tema principal
Obtener el saldo de una cuenta a una fecha específica utilizando la función "saldo cuenta" en ContaPyme.

## Resumen general
Este video explica cómo utilizar la función "saldo cuenta" en el complemento ContaExcel de ContaPyme para obtener el saldo de una cuenta a una fecha específica, en lugar de la fecha de trabajo actual. Se explica cómo ingresar el código de la cuenta y la fecha deseada en la fórmula, y cómo usar referencias absolutas y relativas en las celdas de Excel para facilitar el cálculo de saldos en diferentes fechas y para múltiples cuentas. El video ejemplifica cómo analizar la evolución de los saldos de cuentas de efectivo durante un período determinado.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo obtener el saldo de una cuenta a una fecha diferente a la fecha de trabajo en ContaPyme?
#### Respuesta
Puedes utilizar la función "saldo cuenta" en el complemento ContaExcel. Esta función te permite especificar tanto el código de la cuenta como la fecha para la cual deseas conocer el saldo.

### ¿Qué parámetros debo ingresar en la función "saldo cuenta" para obtener el saldo a una fecha específica?
#### Respuesta
Debes ingresar dos parámetros:
1.  **Código de la cuenta:** El código de la cuenta cuyo saldo deseas conocer.
2.  **Fecha:** La fecha específica para la cual quieres obtener el saldo.

### ¿Cómo se escribe la fórmula de "saldo cuenta" para una fecha específica?
#### Respuesta
La fórmula se escribe de la siguiente manera: `=saldo cuenta(código de la cuenta; fecha)`.  Recuerda que debes reemplazar "código de la cuenta" con la celda que contiene el código de la cuenta y "fecha" con la celda que contiene la fecha deseada.

### ¿Cómo puedo obtener el nombre de la cuenta asociado a un código en ContaPyme?
#### Respuesta
Puedes utilizar la función "nombre cuenta" en el complemento ContaExcel. Debes ingresar el código de la cuenta como parámetro en la fórmula.  Por ejemplo, si el código de la cuenta está en la celda A2, la fórmula sería: `=nombre cuenta(A2)`.

### ¿Cómo puedo crear una tabla que muestre los saldos de varias cuentas en diferentes fechas en ContaPyme?
#### Respuesta
Para crear una tabla con saldos de cuentas en diferentes fechas, sigue estos pasos:
1.  En las columnas, coloca las fechas para las cuales deseas obtener los saldos (ej: 31 de enero de 2012, 29 de febrero de 2012, 31 de marzo de 2012).
2.  En las filas, coloca los códigos de las cuentas que deseas analizar.
3.  En la celda donde quieres calcular el primer saldo, utiliza la función "saldo cuenta", referenciando la celda del código de la cuenta y la celda de la fecha.
4.  Fija la columna del código de la cuenta (con el símbolo `$`) y la fila de la fecha (también con el símbolo `$`) para que, al copiar la fórmula a las demás celdas, las referencias se ajusten correctamente. Por ejemplo, si el código de la cuenta está en la columna A y la fecha en la fila 1, la fórmula sería `=saldo cuenta($A2;B$1)`.
5.  Copia la fórmula a las demás celdas de la tabla.

---

# Software Contable ContaPyme - ContaExcel Add In - Ejemplo Análisis de mov de cuentas
[Ver el video](https://www.youtube.com/watch?v=XchZEhcxS98)

## Tema principal
Análisis de movimientos de una cuenta contable utilizando el Add-In ContaExcel de ContaPyme, incluyendo la visualización gráfica de los datos.

## Resumen general
Este video muestra cómo realizar un análisis de los movimientos de una cuenta contable específica dentro de ContaPyme utilizando el Add-In ContaExcel. Se explica cómo seleccionar la cuenta, definir el rango de fechas a analizar (incluso varios años), generar una tabla de datos con los meses y años correspondientes, y finalmente, crear un gráfico comparativo de ingresos, gastos y utilidad para visualizar el comportamiento de la cuenta a lo largo del tiempo. Se destaca la combinación de las funcionalidades de Excel y ContaExcel para el análisis y la presentación de la información contable.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo analizar solo una cuenta contable en ContaExcel?
#### Respuesta
Para analizar solo una cuenta, puedes borrar las demás cuentas que estén previamente seleccionadas en la hoja de cálculo de ContaExcel y luego indicar el número de la cuenta que deseas analizar. Después, recalcula la hoja para que se muestren los datos solo de esa cuenta.

### ¿Cómo puedo analizar varios años de información contable en ContaExcel?
#### Respuesta
Para analizar varios años, debes definir el rango de meses que quieres analizar. Por ejemplo, si quieres analizar 4 años, selecciona 48 meses (12 meses/año * 4 años = 48 meses).  Luego, recalcula la hoja de cálculo para que se actualicen los datos.

### ¿Cómo puedo agregar el nombre del mes y el año a la serie de datos para que aparezcan en el gráfico?
#### Respuesta
Para agregar el nombre del mes y el año, sigue estos pasos:

1.  Utiliza la función `Nombre Mes` para obtener el nombre del mes a partir de la fecha. Por ejemplo: `=Nombre Mes(celda_con_la_fecha)`.
2.  Utiliza la función `AÑO` para obtener el año de la fecha. Por ejemplo: `=AÑO(celda_con_la_fecha)`.
3.  Combina el nombre del mes y el año utilizando la función de concatenación. Por ejemplo, en Excel, puedes usar la siguiente fórmula: `=F2&"/"&AÑO(celda_con_la_fecha)`, donde `F2` es la celda que contiene el nombre del mes.

### ¿Cómo puedo graficar los datos de ingresos, gastos y utilidad en Excel después de haberlos obtenido con ContaExcel?
#### Respuesta
Para graficar los datos, sigue estos pasos:

1.  Selecciona los datos que deseas graficar, incluyendo las etiquetas de los meses y años, así como los valores de ingresos, gastos y utilidad.
2.  Ve a la pestaña **Insertar** en Excel.
3.  Selecciona el tipo de gráfico que deseas utilizar. En el ejemplo, se utiliza un gráfico de líneas.
4.  Ajusta el formato del gráfico según tus preferencias, como el ancho de las líneas, los colores, etc.

### ¿Cómo puedo cambiar la escala del gráfico para que los valores más altos de gastos se muestren en rojo y los más bajos en verde?
#### Respuesta
La transcripción indica que se va a hacer el análisis de la escala de los 48 meses, indicando que los grafique al revés, los más altos rojos y los más bajitos verdes, sin especificar los pasos en el programa.

### ¿Cómo calculo la utilidad a partir de los ingresos y gastos en Excel?
#### Respuesta
Para calcular la utilidad, simplemente resta los gastos a los ingresos. En una celda de Excel, escribe la fórmula `=celda_con_ingresos - celda_con_gastos`, donde `celda_con_ingresos` es la celda que contiene el valor de los ingresos y `celda_con_gastos` es la celda que contiene el valor de los gastos.

---

# Software Contable ContaPyme - ContaExcel Add In - Ejemplo completo con funciones
[Ver el video](https://www.youtube.com/watch?v=kJNOnKsAIIY)
[kJNOnKsAIIY]

## Tema principal
Análisis de datos contables en Excel utilizando el Add-in ContaExcel.

## Resumen general
Este video muestra cómo utilizar el Add-in ContaExcel para extraer información contable de ContaPyme y analizarla en Excel. Se explica cómo obtener saldos de cuentas por mes, concatenar valores, aplicar formatos condicionales para identificar tendencias, crear gráficos y agregar líneas de tendencia para visualizar el comportamiento de las ventas a lo largo del tiempo. Se aprende a generar informes personalizados y a identificar patrones en los datos contables.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo obtener el nombre de una cuenta contable en Excel usando el Add-in ContaExcel?
#### Respuesta
Para obtener el nombre de una cuenta contable, puedes utilizar la función `nombre.cuenta` del Add-in ContaExcel. Debes proporcionar el código de la cuenta como argumento. Por ejemplo, si el código de la cuenta está en la celda A1, la fórmula sería `=nombre.cuenta(A1)`.

### ¿Cómo puedo obtener los movimientos de ingresos de una cuenta contable en Excel por cada mes utilizando el Add-in ContaExcel?
#### Respuesta
Puedes utilizar la función `mov.cuenta` del Add-in ContaExcel. Esta función te permite obtener los movimientos de una cuenta entre dos fechas. Para obtener los movimientos mensuales, debes especificar la fecha inicial y la fecha final de cada mes.

1.  **Ingresa el código de la cuenta:** En una celda, ingresa el código de la cuenta que deseas analizar.
2.  **Define la fecha inicial y final del mes:** En celdas separadas, calcula la fecha inicial (primer día del mes) y la fecha final (último día del mes) utilizando las funciones de Excel. Por ejemplo, para enero de 2011, la fecha inicial sería "01/01/2011" y la fecha final "31/01/2011".
3.  **Utiliza la función `mov.cuenta`:** En una celda, ingresa la función `=mov.cuenta(código_cuenta, fecha_inicial, fecha_final)`. Reemplaza `código_cuenta` con la celda que contiene el código de la cuenta, `fecha_inicial` con la celda que contiene la fecha inicial y `fecha_final` con la celda que contiene la fecha final.

### ¿Cómo concatenar valores en Excel?
#### Respuesta
Puedes usar el operador Ampersan (&) para concatenar valores en Excel. Por ejemplo, si quieres unir el contenido de la celda A1 con el contenido de la celda B1, la fórmula sería `=A1&B1`. Si quieres agregar un espacio entre los valores, puedes usar `" "&`. Por ejemplo, `=A1&" "&B1`.

### ¿Cómo puedo aplicar formato condicional en Excel para resaltar los meses con mejores y peores ingresos?
#### Respuesta
Puedes usar el formato condicional para resaltar automáticamente las celdas que cumplen ciertos criterios.
1.  **Selecciona el rango de celdas** que deseas analizar.
2.  Ve a la pestaña **Inicio** y haz clic en **Formato Condicional**.
3.  Selecciona **Nueva Regla...**.
4.  Elige un tipo de regla. Por ejemplo, puedes usar "**Aplicar formato únicamente a las celdas que contengan**" y establecer condiciones como "Mayor que" o "Menor que" un valor específico.  También puedes usar "**Barra de datos**" o "**Escala de color**" para representar visualmente los valores.
5.  Define el formato que deseas aplicar a las celdas que cumplen la condición (por ejemplo, color de relleno, color de fuente).
6.  Haz clic en **Aceptar**.

### ¿Cómo puedo insertar un gráfico en Excel para visualizar el comportamiento de las ventas a lo largo del tiempo?
#### Respuesta
Para crear un gráfico en Excel:

1.  **Selecciona los datos** que deseas incluir en el gráfico, incluyendo los títulos de las columnas y filas.
2.  Ve a la pestaña **Insertar** y elige el tipo de gráfico que deseas utilizar (por ejemplo, gráfico de barras, gráfico de líneas).
3.  Haz clic en el gráfico deseado.
4.  Excel insertará automáticamente el gráfico en la hoja de cálculo. Puedes personalizar el gráfico (títulos, etiquetas, colores) utilizando las herramientas de diseño y formato disponibles en Excel.

### ¿Cómo agregar una línea de tendencia a un gráfico en Excel para visualizar la tendencia de las ventas?
#### Respuesta
Para agregar una línea de tendencia a un gráfico en Excel:

1.  **Selecciona el gráfico**.
2.  Haz clic derecho sobre la serie de datos a la que quieres agregar la línea de tendencia.
3.  Selecciona **Agregar línea de tendencia...**.
4.  En el panel de formato de la línea de tendencia, elige el tipo de tendencia que deseas utilizar (por ejemplo, lineal, exponencial, polinómica).
5.  Personaliza la apariencia de la línea de tendencia (color, grosor, tipo de línea).
6. Cierra el panel de formato.

---

# Software Contable ContaPyme - ContaExcel Add In - Ejemplo Movimiento cuenta por cc
[Ver el video](https://www.youtube.com/watch?v=cdzDXauCEy0)

## Tema principal
Uso de la función Movimiento Cuenta en ContaPyme con centros de costos en Excel.

## Resumen general
Este video explica cómo utilizar la función Movimiento Cuenta en ContaPyme, integrada con Excel, para analizar ingresos y gastos por centro de costos. Muestra cómo configurar una tabla en Excel que permita calcular automáticamente los movimientos de una cuenta contable para diferentes centros de costos en un rango de fechas específico. El video enseña a usar referencias absolutas y relativas en las fórmulas para facilitar la copia y el cálculo automático de la información, así como a transponer datos entre horizontal y vertical en Excel.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo mostrar el nombre de la cuenta contable en mi tabla de Excel?
#### Respuesta
Para mostrar el nombre de la cuenta contable, utiliza la función `nombre cuenta` en la celda correspondiente. Introduce el código de la cuenta, y la función mostrará el nombre asociado.

### ¿Cómo hago para que se calculen automáticamente la fecha inicial y final en mi tabla de Excel?
#### Respuesta
1.  Utiliza la función `fecha` para calcular la fecha inicial. Por ejemplo: `=fecha(año, mes, 1)` donde "año" y "mes" son celdas que contienen el año y el mes deseados.
2.  Utiliza la función `último día mes` para calcular la fecha final. Por ejemplo: `=último día mes(celda_fecha_inicial)`.
3.  Aplica formato de fecha a ambas celdas.

### ¿Cómo puedo transponer datos de vertical a horizontal (o viceversa) en Excel?
#### Respuesta
1.  Selecciona los datos que deseas transponer.
2.  Copia los datos (Ctrl+C).
3.  Haz clic derecho en la celda donde quieres pegar los datos transpuestos.
4.  Selecciona la opción de pegado especial y elige "Transponer".

### ¿Cómo uso la función `nombre CC` para mostrar el nombre del centro de costos?
#### Respuesta
1.  En la celda donde deseas que aparezca el nombre del centro de costos, escribe: `=nombre CC(ID_empresa, código_centro_costos)`.
2.  Reemplaza `ID_empresa` con la celda que contiene el ID de la empresa.  Fija la celda de la empresa con `F4` para que no cambie al copiar la fórmula.
3.  Reemplaza `código_centro_costos` con la celda que contiene el código del centro de costos.
4.  Asegúrate de que la referencia al código del centro de costos sea relativa para que se ajuste al copiar la fórmula a otras celdas.

### ¿Cómo utilizo la función `Mov Cuenta` para obtener el movimiento de una cuenta por centro de costos?
#### Respuesta
1.  En la celda donde deseas el resultado, escribe: `=Mov Cuenta(cuenta, fecha_inicial, fecha_final, empresa, centro_costos)`.
2.  Reemplaza `cuenta` con la celda que contiene el código de la cuenta contable. Fija la columna de la cuenta para que no cambie al copiar la fórmula a la derecha (ej: `$A1`).
3.  Reemplaza `fecha_inicial` con la celda que contiene la fecha inicial. Fija completamente la celda (ej: `$B$1`).
4.  Reemplaza `fecha_final` con la celda que contiene la fecha final. Fija completamente la celda (ej: `$C$1`).
5.  Reemplaza `empresa` con la celda que contiene el ID de la empresa. Fija completamente la celda (ej: `$D$1`).
6.  Reemplaza `centro_costos` con la celda que contiene el código del centro de costos. Fija la fila de la celda (ej: `E$1`).

### ¿Por qué es importante fijar columnas y filas en las fórmulas de Excel al usar la función `Mov Cuenta`?
#### Respuesta
Fijar columnas y filas (usando el símbolo `$`) permite que, al copiar la fórmula a otras celdas, las referencias a ciertas celdas (como la fecha inicial o el ID de la empresa) permanezcan fijas, mientras que otras (como el código del centro de costos) se ajusten de manera relativa. Esto evita tener que reescribir la fórmula para cada celda.

### ¿Qué debo hacer si al aplicar la función `Mov Cuenta` en Excel tarda mucho en calcular los resultados?
#### Respuesta
La función `Mov Cuenta` realiza consultas a la base de datos de ContaPyme para cada celda, lo cual puede llevar tiempo, especialmente con grandes cantidades de datos. Ten paciencia mientras Excel realiza los cálculos.

### ¿Qué tipo de identificador espera la función `Mov Cuenta` para el centro de costos?
#### Respuesta
La función `Mov Cuenta` espera el **código** del centro de costos, no el nombre. Asegúrate de ingresar el código correcto para obtener los resultados deseados.

---

# Software Contable ContaPyme - ContaExcel Add In - Funciones básicas de elementos de inventario
[Ver el video](https://www.youtube.com/watch?v=5qMWw5gTOjo)

## Tema principal
Acceder a la información de inventario de ContaPyme a través de ContaExcel utilizando funciones básicas.

## Resumen general
Este video explica cómo utilizar el complemento ContaExcel para acceder a la información de inventario almacenada en ContaPyme. Muestra cómo extraer datos como el nombre, la unidad y la descripción de un elemento de inventario usando funciones específicas de ContaExcel. El video también enfatiza la importancia de la seguridad y las restricciones de acceso a la información, garantizando que los usuarios solo puedan ver los datos a los que están autorizados según su configuración en ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Qué se puede hacer con el módulo de inventarios en ContaExcel?
#### Respuesta
Con el módulo de inventarios en ContaExcel, puedes calcular y analizar series de datos relacionados con los inventarios de tu empresa. Esto incluye acceder a información específica de cada elemento del inventario.

### ¿Qué tipo de información de un elemento de inventario se puede obtener con las funciones básicas en ContaExcel?
#### Respuesta
Puedes obtener información como el nombre, la unidad, la descripción, el precio, el costo, el peso y el volumen de un elemento de inventario.

### ¿Cómo se obtiene el nombre de un elemento de inventario en ContaExcel?
#### Respuesta
Para obtener el nombre de un elemento de inventario, utiliza la función **"=nombre elemento"** y proporciona el código del elemento como argumento. Por ejemplo, si el código del elemento es 1100, la fórmula sería **"=nombre elemento(1100)"**.

### ¿Cómo se obtiene la unidad de un elemento de inventario en ContaExcel?
#### Respuesta
Para obtener la unidad de un elemento de inventario, utiliza la función **"=unidad elemento"** y proporciona el código del elemento como argumento. Por ejemplo, si el código del elemento es 4150, la fórmula sería **"=unidad elemento(4150)"**.

### ¿Cómo se obtiene la descripción de un elemento de inventario en ContaExcel?
#### Respuesta
Para obtener la descripción de un elemento de inventario, utiliza la función **"=descripción elemento"** y proporciona el código del elemento como argumento. Por ejemplo, si el código del elemento es 1100, la fórmula sería **"=descripción elemento(1100)"**.

### ¿El acceso a la información de inventario en ContaExcel es irrestricto?
#### Respuesta
No. El acceso a la información en ContaExcel está limitado por las restricciones de seguridad configuradas en ContaPyme. Un usuario solo podrá ver la información para la cual tiene permisos asignados en ContaPyme. Por ejemplo, si un usuario solo tiene acceso a las cuentas de gastos, no podrá ver información de las cuentas de activo, patrimonio, pasivo e ingresos.

---

# Software contable ContaPyme - ContaExcel Add In - Funciones ContaExcel Add In
[Ver el video](https://www.youtube.com/watch?v=GC4EWyDmrmc)
GC4EWyDmrmc

## Tema principal
Funciones del Add-In ContaExcel para ContaPyme

## Resumen general
Este video introductorio describe las diferentes categorías de funciones disponibles en el Add-In ContaExcel para ContaPyme. Explica que estas funciones permiten trabajar con datos de ContaPyme directamente desde hojas de cálculo de Excel, abarcando áreas como contabilidad, cartera, presupuesto, inventario, activos, actividades, centros de costos y terceros.  El video destaca que el curso cubrirá las funciones principales de cada categoría para enseñar a los usuarios a trabajar eficazmente con ContaExcel.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipos de funciones de fecha y hora están disponibles en ContaExcel?
#### Respuesta
ContaExcel incluye funciones de fecha y hora que permiten manipular y trabajar con fechas y horas al diseñar hojas electrónicas y tablas.

### ¿Qué tipo de funciones contables ofrece ContaExcel?
#### Respuesta
ContaExcel ofrece funciones contables para obtener información como:
- El saldo de una cuenta.
- El movimiento de una cuenta entre dos fechas.
- El movimiento de una cuenta de un tercero.

### ¿Qué funcionalidades relacionadas con cartera están disponibles en ContaExcel?
#### Respuesta
ContaExcel ofrece funciones relacionadas con la gestión de cartera.

### ¿Qué tipo de funciones de presupuesto ofrece ContaExcel?
#### Respuesta
ContaExcel ofrece funciones para gestionar presupuestos y su ejecución.

### ¿Qué información sobre inventario se puede obtener con las funciones de ContaExcel?
#### Respuesta
Con las funciones de inventario disponibles en ContaExcel, se puede obtener información como:
- La cantidad existente de un elemento determinado.
- El número de ventas realizadas.
- El número de consumos realizados.
- El número de embodegamientos realizados de un producto.

### ¿Qué se puede hacer con las funciones de activos en ContaExcel?
#### Respuesta
ContaExcel ofrece funciones para gestionar información relacionada con los activos.

### ¿Qué información se puede obtener sobre actividades y labores con ContaExcel?
#### Respuesta
Con las funciones de actividades y labores en ContaExcel, se puede obtener información como:
- Qué labores se han desarrollado en la semana.
- Qué cantidades se han obtenido.
- Qué rendimientos se han generado.

### ¿Qué tipo de funciones relacionadas con centros de costos ofrece ContaExcel?
#### Respuesta
ContaExcel ofrece funciones para la gestión de centros de costos.

### ¿Qué tipo de funciones relacionadas con terceros ofrece ContaExcel?
#### Respuesta
ContaExcel ofrece funciones para la gestión de la información de terceros.

---

# Software Contable ContaPyme - ContaExcel Add In - Funciones de inventarios
[Ver el video](https://www.youtube.com/watch?v=KgTKM_u5CFY)

## Tema principal
Uso de funciones de inventario en ContaPyme Add-in para Excel, como cantidad de entradas, salidas y consumos, con ejemplos prácticos.

## Resumen general
Este video explica cómo usar las funciones de inventario del Add-in ContaExcel de ContaPyme para analizar las entradas, salidas y consumos de productos en una bodega. Se muestra cómo calcular estas cantidades para un período específico, utilizando fechas iniciales y finales. Además, se presenta un ejemplo práctico con datos de una finca real, mostrando cómo se pueden analizar los movimientos de insumos y cómo crear gráficos dinámicos seleccionando diferentes productos a través de un control de formulario en Excel.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipos de movimientos incluye la función "cantidad de entradas"?
#### Respuesta
La función "cantidad de entradas" no solo considera las compras, sino también otros factores que pueden incrementar el inventario de un elemento en una bodega, como embargos y traslados.

### ¿Qué tipos de movimientos considera la función "cantidad de salidas"?
#### Respuesta
La función "cantidad de salidas" considera las disminuciones en el inventario de un elemento en una bodega debido a ventas, consumos internos para procesos de la empresa, y traslados a otras bodegas.

### ¿Qué información necesito para usar las funciones de cantidad de entradas, salidas y consumos?
#### Respuesta
Necesitas la siguiente información:
1.  **Bodega:** La bodega específica donde se están registrando los movimientos.
2.  **Elemento (Insumo/Producto):** El código del elemento del cual se quiere consultar el movimiento.
3.  **Fecha Inicial:** La fecha de inicio del período que se quiere analizar.
4.  **Fecha Final:** La fecha de finalización del período que se quiere analizar.

### ¿Cómo puedo obtener el nombre de un elemento a partir de su código?
#### Respuesta
Puedes utilizar la función "Nombre Elemento" en ContaPyme Add-in para Excel. Simplemente debes ingresar el código del elemento y la función te devolverá su nombre. Por ejemplo: `=Nombre Elemento(CódigoDelElemento)`.

### ¿Cómo puedo obtener la descripción de un elemento a partir de su código?
#### Respuesta
Puedes utilizar la función "Descripción Elemento" en ContaPyme Add-in para Excel. Ingresa el código del elemento y la función mostrará su descripción. Por ejemplo: `=Descripción Elemento(CódigoDelElemento)`.

### ¿Cómo puedo mostrar la unidad de medida de un elemento junto con la etiqueta de entradas o salidas?
#### Respuesta
Puedes concatenar el texto "Entradas" o "Salidas" con la unidad de medida del elemento usando la función "Unidad Elemento" y el operador "&" (ampersand). Por ejemplo:

`="Entradas (" & Unidad Elemento(CódigoDelElemento) & ")"`

### ¿Cómo puedo crear una lista desplegable para seleccionar un elemento y que automáticamente se actualicen los datos en mi análisis?
#### Respuesta
Puedes usar un control de formulario de tipo "cuadro combinado" o "lista desplegable" en Excel. Para hacerlo:
1.  **Activa la pestaña Programador:** Si no la ves, ve a Archivo > Opciones > Personalizar cinta de opciones y marca la casilla "Programador".
2.  **Inserta el control:** En la pestaña "Programador", ve a "Insertar" y selecciona un control de formulario (por ejemplo, "Cuadro combinado").
3.  **Configura el control:**
    *   Haz clic derecho en el control y selecciona "Formato de control".
    *   En la pestaña "Control", especifica:
        *   **Rango de entrada:** El rango de celdas que contiene los nombres de los elementos que quieres mostrar en la lista desplegable.
        *   **Vincular con la celda:** Una celda donde se guardará el índice del elemento seleccionado en la lista desplegable.
    *   Haz clic en "Aceptar".
4.  **Usa la función BUSCAR:** En la celda donde quieres que aparezca el código del elemento seleccionado, usa la función BUSCAR para buscar el código correspondiente al índice almacenado en la celda vinculada:
    *   Crea una columna auxiliar con los números de índice (1, 2, 3, etc.)correspondientes a cada elemento en tu lista.
    *   Usa la función BUSCAR: `=BUSCAR(CeldaVinculada, RangoDeIndices, RangoDeCodigos)`. Donde:
        *   `CeldaVinculada` es la celda que vinculaste al control de formulario (donde se guarda el índice).
        *   `RangoDeIndices` es el rango de celdas que contiene los números de índice.
        *   `RangoDeCodigos` es el rango de celdas que contiene los códigos de los elementos.

---

# Software Contable ContaPyme - ContaExcel Add In - Funciones para datos de trabajo
[Ver el video](https://www.youtube.com/watch?v=3Es5CAvC5Xc)
ContaExcel Add In - Funciones para datos de trabajo

## Tema principal
Uso de funciones de ContaExcel para obtener información del entorno de trabajo (área, empresa y fecha).

## Resumen general
El video explica cómo usar las funciones de ContaExcel para acceder a información clave del entorno de trabajo en ContaPyme directamente desde una hoja de cálculo de Excel. Se aprende a obtener el nombre del área de trabajo, el nombre y código de la empresa activa, y la fecha de trabajo, utilizando funciones específicas de ContaExcel. Esta información se actualiza dinámicamente al cambiar los parámetros en ContaPyme, permitiendo crear informes y presentaciones con datos siempre actualizados.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo mostrar el nombre del área de trabajo activa en una celda de Excel usando ContaExcel?
#### Respuesta
Para mostrar el nombre del área de trabajo activa, usa la función `NombreAreaTrabajoActiva`.
1.  Selecciona la celda donde quieres que aparezca el nombre del área de trabajo.
2.  Escribe la fórmula `=NombreAreaTrabajoActiva()`.
3.  Presiona Enter. La celda mostrará el nombre del área de trabajo activa en ContaPyme.

### ¿Cómo puedo obtener el nombre de la empresa de trabajo activa en Excel con ContaExcel?
#### Respuesta
Utiliza la función `NombreEmpresaTrabajoActiva` para mostrar el nombre de la empresa activa.
1.  Selecciona la celda donde quieres que aparezca el nombre de la empresa.
2.  Escribe la fórmula `=NombreEmpresaTrabajoActiva()`.
3.  Presiona Enter. La celda mostrará el nombre de la empresa activa en ContaPyme.

### ¿Cómo puedo mostrar el nombre de una empresa específica dado su código en ContaExcel?
#### Respuesta
Para mostrar el nombre de una empresa en función de su código, usa la función `NombreEmpresa` junto con la celda que contiene el código de la empresa.
1.  En una celda (por ejemplo, A1), escribe el código de la empresa.
2.  En otra celda donde quieras que aparezca el nombre, escribe la fórmula `=NombreEmpresa(A1)` (reemplaza A1 con la celda que contiene el código).
3.  Presiona Enter. La celda mostrará el nombre de la empresa correspondiente al código ingresado en A1.
4.  Si cambias el código en la celda A1, debes recalcular la hoja de cálculo para que se actualice el nombre de la empresa. Puedes hacerlo con el botón de recalcular en ContaExcel.

### ¿Cómo puedo mostrar la fecha de trabajo activa en una celda de Excel?
#### Respuesta
Usa la función `FechaTrabajo` para mostrar la fecha de trabajo activa.
1.  Selecciona la celda donde quieres que aparezca la fecha.
2.  Escribe la fórmula `=FechaTrabajo()`.
3.  Presiona Enter.
4.  Si la celda muestra un número en lugar de una fecha, debes cambiar el formato de la celda a "Fecha". Selecciona la celda, haz clic derecho, elige "Formato de celdas", selecciona la categoría "Fecha" y elige el formato deseado.

### ¿Qué debo hacer si cambio el área de trabajo, la empresa o la fecha en ContaPyme para que se refleje en mi hoja de Excel?
#### Respuesta
Después de cambiar el área de trabajo, la empresa o la fecha de trabajo en ContaPyme, debes recalcular la hoja de cálculo en Excel para que las funciones de ContaExcel se actualicen. Para hacer esto, puedes usar el botón de "Recalcular" en el Add-in de ContaExcel.

### ¿Cuál es la diferencia entre las funciones `EmpresaTrabajoActiva` y `NombreEmpresaTrabajoActiva`?
#### Respuesta
Ambas funciones están relacionadas con la empresa de trabajo activa, pero retornan información diferente:
*   `EmpresaTrabajoActiva()` devuelve el **código** de la empresa de trabajo activa.
*   `NombreEmpresaTrabajoActiva()` devuelve el **nombre** de la empresa de trabajo activa.

---

# Software Contable ContaPyme - ContaExcel Add In - Funciones para el manejo de fechas
[Ver el video](https://www.youtube.com/watch?v=pFalO6f-ohg)

## Tema principal
Convertir datos de año, mes y día en una fecha utilizando la función "fecha" en ContaPyme.

## Resumen general
Este video explica cómo utilizar la función "fecha" en ContaPyme para convertir datos de año, mes y día en una fecha válida. Esta función toma el número del año, el número del mes y el número del día como entrada, y los convierte en un número que representa el número de días transcurridos desde 1900. Este número puede luego ser formateado como una fecha legible. El video muestra un ejemplo práctico donde se ingresan el año, el mes y el día en diferentes celdas y luego se utiliza la función "fecha" para combinarlos en una fecha.  Esta función es fundamental para crear indicadores y tablas dinámicas.

## Preguntas Frecuentes (FAQ)

### ¿Qué hace la función "fecha" en ContaPyme?
#### Respuesta
La función "fecha" toma el año, el mes y el día (en formato numérico) y los convierte en un número que representa el número de días transcurridos desde el 1 de enero de 1900. Este número puede ser formateado como una fecha.

### ¿Cómo puedo usar la función "fecha" en ContaPyme?
#### Respuesta
Para utilizar la función "fecha", debes proporcionar el año, el mes y el día como argumentos.  Por ejemplo, `=FECHA(año, mes, día)`.

### ¿Qué tipo de datos debo ingresar en la función "fecha"?
#### Respuesta
Debes ingresar números que representen el año, el mes y el día. Por ejemplo:
*   Año: 2023
*   Mes: 10
*   Día: 26

### ¿Cómo puedo mostrar el resultado de la función "fecha" como una fecha legible?
#### Respuesta
Después de aplicar la función "fecha", el resultado inicial será un número. Debes cambiar el formato de la celda a formato de fecha. En Excel, esto se hace seleccionando la celda, haciendo clic derecho, eligiendo "Formato de celdas" y seleccionando un formato de fecha de la lista.

### ¿Por qué es útil la función "fecha" en ContaPyme?
#### Respuesta
La función "fecha" es útil porque permite combinar datos separados de año, mes y día en una sola fecha. Esto es fundamental para realizar cálculos, crear indicadores y generar tablas dinámicas basadas en fechas.

### ¿Qué pasa si cambio los valores del año, mes o día después de usar la función "fecha"?
#### Respuesta
Si cambias los valores del año, mes o día, la función "fecha" se recalculará automáticamente y mostrará la nueva fecha resultante. Esto permite crear hojas de cálculo dinámicas donde las fechas se actualizan en función de los datos ingresados.

---

# Software Contable ContaPyme - ContaExcel Add In - Funciones para ventas
[Ver el video](https://www.youtube.com/watch?v=S3KilDX_2UQ)
[S3KilDX_2UQ]

## Tema principal
Uso de funciones de ContaPyme en Excel para analizar ventas por elemento.

## Resumen general
Este video muestra cómo utilizar el complemento ContaExcel de ContaPyme para analizar las ventas de un elemento específico a lo largo del tiempo. Aprenderás a usar funciones como `cantidad ventas`, `ingresos ventas`, `costo ventas` para extraer información de ContaPyme directamente a una hoja de cálculo de Excel. Además, muestra cómo calcular la utilidad bruta y el costo promedio por unidad vendida. El video también explica cómo usar formato condicional para visualizar los datos y cómo crear gráficos sencillos basados en la información extraída.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo obtener la cantidad vendida de un elemento en un período específico usando ContaExcel?
#### Respuesta
Puedes usar la función `cantidad ventas`. Esta función requiere la bodega, el elemento, la fecha inicial y la fecha final como parámetros.

### ¿Cuáles son los parámetros requeridos por la función `cantidad ventas`?
#### Respuesta
La función `cantidad ventas` requiere los siguientes parámetros:
- Bodega
- Elemento
- Fecha inicial
- Fecha final
- Empresa
- Centro de costos origen

### ¿Cómo puedo obtener los ingresos por ventas de un elemento en un período específico?
#### Respuesta
Utiliza la función `ingresos ventas`. Necesitarás especificar la bodega, el elemento, la fecha inicial y la fecha final.

### ¿Qué parámetros necesita la función `ingresos ventas`?
#### Respuesta
La función `ingresos ventas` requiere los siguientes parámetros:
- Bodega
- Elemento
- Fecha inicial
- Fecha final

### ¿Cómo puedo calcular el costo de ventas de un elemento específico?
#### Respuesta
Usa la función `costo ventas`. Debes proporcionar la bodega, el elemento y el rango de fechas (fecha inicial y fecha final).

### ¿Qué parámetros se requieren para usar la función `costo ventas`?
#### Respuesta
Los parámetros requeridos para la función `costo ventas` son:
- Bodega
- Elemento
- Fecha inicial
- Fecha final

### ¿Cómo puedo mostrar los valores de ventas como positivos si ContaPyme los muestra como negativos debido a que representan salidas de almacén?
#### Respuesta
Simplemente agrega un signo menos delante de la función de ContaExcel en la fórmula de Excel. Por ejemplo, en lugar de `=cantidad ventas(...)`, usa `=-cantidad ventas(...)`.

### ¿Cómo puedo encontrar la descripción y los parámetros de una función de ContaExcel dentro de Excel?
#### Respuesta
1.  Escribe la función en una celda, por ejemplo `=ingresos ventas(`.
2.  Haz clic en el botón **Insertar función** (fx) que está al lado de la barra de fórmulas.
3.  En la ventana que aparece, puedes ver los parámetros que necesita la función y una breve descripción.  También puedes buscar ayuda adicional sobre las funciones de inventario de ContaPyme.

### ¿Cómo puedo calcular la utilidad bruta en Excel usando los datos de ContaPyme?
#### Respuesta
La utilidad bruta se calcula restando el costo de ventas a los ingresos por ventas. En Excel, puedes crear una fórmula que reste el resultado de la función `costo ventas` al resultado de la función `ingresos ventas`.  Ten en cuenta que ContaPyme internamente maneja los ingresos como negativos (crédito) y los costos como positivos (débito), pero para el caso de inventarios, el costo de ventas lo muestra negativo y los ingresos positivos.

### ¿Cómo puedo calcular el costo promedio por unidad vendida?
#### Respuesta
Divide los ingresos totales por ventas entre la cantidad total de unidades vendidas. En Excel, puedes crear una fórmula que divida el resultado de la función `ingresos ventas` entre el resultado de la función `cantidad ventas`.

### ¿Cómo puedo usar formato condicional para resaltar las celdas con mayores ingresos?
#### Respuesta
1.  Selecciona el rango de celdas que contienen los datos de ingresos.
2.  Ve a la pestaña **Inicio** en Excel.
3.  Haz clic en **Formato condicional**.
4.  Selecciona **Escalas de color** y elige una escala donde los valores más altos tengan un color más intenso (por ejemplo, verde).

### ¿Cómo puedo crear un gráfico para visualizar las ventas de un elemento a lo largo del tiempo?
#### Respuesta
1.  Selecciona los datos que deseas graficar, incluyendo los meses y las cantidades vendidas.
2.  Ve a la pestaña **Insertar** en Excel.
3.  Selecciona el tipo de gráfico que desees usar (por ejemplo, un gráfico de columnas o de líneas).
4.  Excel creará automáticamente un gráfico basado en los datos seleccionados.

### ¿Cómo puedo obtener las tres primeras letras del nombre de un mes en Excel?
#### Respuesta
Puedes usar la función `IZQUIERDA` combinada con la función `NOMBREMES`. Primero, usa `NOMBREMES` para obtener el nombre completo del mes. Luego, usa `IZQUIERDA` para extraer las tres primeras letras de ese nombre. Por ejemplo: `=IZQUIERDA(NOMBREMES(A1);3)` donde A1 contiene el número del mes.

### ¿Cómo fijo la fila o columna en una fórmula de Excel para que no cambie al copiar la fórmula?
#### Respuesta
Usa el símbolo `$` para fijar una fila o columna en una referencia de celda. Por ejemplo, `$A1` fija la columna A, `A$1` fija la fila 1, y `$A$1` fija tanto la columna A como la fila 1. Puedes presionar la tecla `F4` para alternar entre las diferentes opciones de fijado. Al usar las funciones de ContaPyme es importante que fijes (F4) las celdas que contienen la bodega y el elemento, pero solo la fila de las celdas que contienen la fecha inicial y final.

---

# Software Contable ContaPyme - ContaExcel Add In - Funciones Último día mes, Primer día mes
[Ver el video](https://www.youtube.com/watch?v=AwYwUko-kqA)

## Tema principal
Funciones de ContaExcel para calcular el primer y último día del mes a partir de una fecha, y para extraer el año, mes y día de una fecha.

## Resumen general
Este video explica cómo usar las funciones "Último día mes" y "Primer día mes" en ContaExcel para obtener el primer y último día de un mes a partir de una fecha dada. También muestra cómo extraer el año, mes y día de una fecha utilizando las funciones correspondientes. Esto facilita la manipulación y el análisis de fechas en hojas de cálculo.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo calcular el último día del mes a partir de una fecha en ContaExcel?
#### Respuesta
Puedes usar la función "último día mes" de ContaExcel. Solo debes ingresar la fecha en la fórmula y te devolverá el último día de ese mes. Por ejemplo, si tienes la fecha "13 de julio de 2011", la función te devolverá "31 de julio de 2011". La sintaxis es: `=último día mes(fecha)`.

### ¿Cómo puedo obtener el primer día del mes a partir de una fecha en ContaExcel?
#### Respuesta
Puedes usar la función "primer día mes" de ContaExcel. Debes ingresar la fecha en la fórmula y te devolverá el primer día de ese mes. Por ejemplo, si tienes la fecha "13 de julio de 2011", la función te devolverá "1 de julio de 2011". La sintaxis es: `=primer día mes(fecha)`. Asegúrate de que la celda que contiene la fecha tenga formato de fecha.

### ¿Cómo puedo extraer el año de una fecha en ContaExcel?
#### Respuesta
Para extraer el año de una fecha, utiliza la función `año(fecha)`. Por ejemplo, si la fecha es "16 de marzo de 2009", la función `=año(fecha)` devolverá 2009.

### ¿Cómo puedo extraer el mes de una fecha en ContaExcel?
#### Respuesta
Para extraer el mes de una fecha, utiliza la función `mes(fecha)`. Por ejemplo, si la fecha es "16 de marzo de 2009", la función `=mes(fecha)` devolverá 3.

### ¿Cómo puedo extraer el día de una fecha en ContaExcel?
#### Respuesta
Para extraer el día de una fecha, utiliza la función `día(fecha)`. Por ejemplo, si la fecha es "16 de marzo de 2009", la función `=día(fecha)` devolverá 16.

---

# Software Contable ContaPyme - ContaExcel Add In - Función - Cantidad de consumos de inventario
[Ver el video](https://www.youtube.com/watch?v=mn_MdSNSppY)
ContaExcel Add-in - Función Cantidad de Consumos de Inventario

## Tema principal
Cálculo de la cantidad de consumos de un elemento de inventario utilizando el Add-in ContaExcel de ContaPyme.

## Resumen general
Este video explica cómo utilizar la función "Cantidad de Consumos" en el Add-in ContaExcel de ContaPyme para determinar cuántos elementos de inventario se han consumido durante un período específico. Se demuestra cómo definir las fechas inicial y final para el cálculo, y cómo aplicar la fórmula a múltiples elementos para obtener los consumos totales por cada uno. El video resalta la importancia de fijar correctamente filas y columnas en Excel para copiar la fórmula sin errores.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el propósito de la función "Cantidad de Consumos" en el Add-in ContaExcel de ContaPyme?
#### Respuesta
La función "Cantidad de Consumos" permite calcular la cantidad total de un elemento de inventario que ha sido consumido durante un período de tiempo definido. Esto ayuda a tener un control sobre el movimiento de inventario y conocer la demanda de cada producto.

### ¿Qué datos necesito para utilizar la función "Cantidad de Consumos"?
#### Respuesta
Necesitas los siguientes datos:
-   **Bodega:** La bodega de donde se consumieron los elementos.
-   **Elemento:** El código o nombre del elemento del cual se desea conocer la cantidad consumida.
-   **Fecha Inicial:** La fecha de inicio del período que se va a analizar.
-   **Fecha Final:** La fecha de finalización del período que se va a analizar.

### ¿Cómo defino la fecha inicial y final para calcular los consumos de todo un año?
#### Respuesta
Para definir la fecha inicial y final para calcular los consumos de todo un año, puedes utilizar la función `DATE` de Excel. Por ejemplo, si quieres calcular los consumos del año 2024, la fórmula sería:

-   **Fecha Inicial:** `=DATE(2024, 1, 1)` (1 de enero de 2024)
-   **Fecha Final:** `=DATE(2024, 12, 31)` (31 de diciembre de 2024)

### ¿Cuál es la sintaxis correcta para utilizar la función "Cantidad de Consumos" en Excel?
#### Respuesta
La sintaxis correcta para la función "Cantidad de Consumos" es:

`=CantidadConsumos(Bodega, Elemento, Fecha Inicial, Fecha Final)`

### ¿Cómo puedo aplicar la función "Cantidad de Consumos" a varios elementos de inventario simultáneamente?
#### Respuesta
Para aplicar la función a varios elementos, es importante fijar correctamente las filas y columnas en la fórmula de Excel:

1.  Escribe la fórmula `=CantidadConsumos(Bodega, Elemento, Fecha Inicial, Fecha Final)` en la primera celda.
2.  Fija la celda de la **Bodega** con `F4` para que no cambie al copiar la fórmula (ej: `$A$1`).
3.  Fija solo la columna del **Elemento** y deja libre la fila, para que al copiar hacia abajo se ajuste al elemento correspondiente (ej: `B$1`).
4.  Fija las celdas de la **Fecha Inicial** y **Fecha Final** con `F4` (ej: `$C$1`, `$D$1`).
5.  Copia la fórmula a las demás celdas.

### ¿Qué significa el signo negativo que aparece en el resultado de la función "Cantidad de Consumos"?
#### Respuesta
El signo negativo indica que el valor representa una salida o un consumo del elemento de inventario.

---

# Software Contable ContaPyme - ContaExcel Add In - Función - Cantidad de existencias en inventario
[Ver el video](https://www.youtube.com/watch?v=4cZ7joCTwsc)
ContaExcel Add In - Función - Cantidad de existencias en inventario

## Tema principal
Obtener la cantidad de existencias en inventario utilizando la función "Cantidad de Existencias" en el Add-In ContaExcel para ContaPyme.

## Resumen general
Este video explica cómo utilizar la función "Cantidad de Existencias" del Add-In ContaExcel para obtener el saldo de inventario de un elemento en una fecha específica. Se detalla la información requerida por la función: código de la bodega, código del elemento y la fecha. Además, se muestra cómo integrar esta función en una hoja de cálculo de Excel para crear un sistema automatizado que muestre el nombre, la unidad, la cantidad en existencias y el costo de los elementos, permitiendo el análisis y valoración del inventario. Se hace una demostración práctica y se corrige un error común en la aplicación de la fórmula para asegurar la correcta actualización de los datos al copiarla.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el propósito de la función "Cantidad de Existencias" en el Add-In ContaExcel?
#### Respuesta
La función "Cantidad de Existencias" te permite obtener la cantidad de un elemento específico que tienes en inventario, en una bodega determinada y a una fecha específica. Esto es útil para conocer el saldo de inventario en un momento dado.

### ¿Qué información necesito proporcionar a la función "Cantidad de Existencias"?
#### Respuesta
Necesitas proporcionar los siguientes datos:
- El código de la bodega.
- El código del elemento.
- La fecha a la cual quieres conocer el saldo de las existencias.
Opcionalmente, puedes incluir la empresa y el centro de costos.

### ¿Cómo puedo utilizar la función "Cantidad de Existencias" en Excel?
#### Respuesta
1.  En una celda de Excel, escribe `=cantidad_existencias(`.
2.  Ingresa el código de la bodega, separándolo con una coma.
3.  Ingresa el código del elemento, separándolo con una coma.
4.  Ingresa la fecha final a la que deseas conocer las existencias, separándola con una coma.
5.  Cierra el paréntesis `)`.
6.  Presiona Enter.

    Ejemplo: `=cantidad_existencias(A1,B1,C1)` donde A1 contiene el código de la bodega, B1 el código del elemento y C1 la fecha.

### ¿Qué pasa si quiero obtener el nombre y la unidad del elemento junto con la cantidad en existencias?
#### Respuesta
Puedes utilizar las funciones "Nombre Elemento" y "Unidad Elemento" del Add-In ContaExcel para obtener esta información.

1.  Para el nombre: `=nombre_elemento(código del elemento)`
2.  Para la unidad: `=unidad_elemento(código del elemento)`
3.  Para la cantidad en existencias: `=cantidad_existencias(código de la bodega, código del elemento, fecha)`

### ¿Cómo puedo obtener el costo de las existencias de un elemento?
#### Respuesta
Puedes utilizar la función "Costo Existencias" del Add-In ContaExcel, proporcionando el código de la bodega, el código del elemento y la fecha.

1.  En una celda de Excel, escribe `=costo_existencias(`.
2.  Ingresa el código de la bodega, separándolo con una coma.
3.  Ingresa el código del elemento, separándolo con una coma.
4.  Ingresa la fecha final a la que deseas conocer el costo de las existencias, separándola con una coma.
5.  Cierra el paréntesis `)`.
6.  Presiona Enter.

    Ejemplo: `=costo_existencias(A1,B1,C1)` donde A1 contiene el código de la bodega, B1 el código del elemento y C1 la fecha.

### ¿Por qué es útil usar el Add-In ContaExcel en lugar de solo los informes de ContaPyme?
#### Respuesta
Aunque ContaPyme genera informes, el Add-In ContaExcel permite realizar análisis más profundos y personalizados en Excel. Puedes crear indicadores, formatear los datos de manera específica y generar reportes a la medida de tus necesidades.

### ¿Qué debo tener en cuenta al copiar la fórmula de "Cantidad de Existencias" en Excel para evitar errores?
#### Respuesta
Al copiar la fórmula, debes tener cuidado con las referencias de las celdas. Si necesitas que una referencia permanezca fija (por ejemplo, la celda que contiene la fecha), debes fijarla utilizando el símbolo `$`. Si la referencia debe cambiar al copiar la fórmula (por ejemplo, la celda que contiene el código del elemento), no debes fijarla.

    Ejemplo: Si la fecha está en la celda `C1` y no quieres que cambie al copiar la fórmula, debes escribir `$C$1`. Si el código del elemento está en la celda `B2` y quieres que cambie al copiar la fórmula a la celda de abajo, debes escribir `B2`.

### ¿Puedo usar la función "Cantidad de Existencias" para obtener información de un centro de costos específico?
#### Respuesta
Sí, puedes especificar un centro de costos al utilizar la función "Cantidad de Existencias". Esto te permite obtener la cantidad de elementos que provienen de un centro de costos específico, como una finca agrícola o un lote de producción.

---

# Software Contable ContaPyme - ContaExcel Add In - Función movimiento cuenta - Débitos y Créditos
[Ver el video](https://www.youtube.com/watch?v=MQSAZ5NSBko)

## Tema principal
Obtención de información detallada de débitos, créditos y saldos de una cuenta contable utilizando la función "Movimiento Cuenta DC" en ContaPyme.

## Resumen general
Este video explica cómo utilizar la función "Movimiento Cuenta DC" en ContaPyme para obtener información detallada sobre los movimientos débito, crédito y el saldo de una cuenta específica dentro de un rango de fechas. Se muestra cómo ingresar la fórmula en ContaExcel Add In, especificando el código de la cuenta, el tipo de movimiento (débito, crédito o saldo), la fecha inicial y la fecha final. Además, se compara el resultado con la función "Movimiento Cuenta" estándar, resaltando la utilidad de la función "Movimiento Cuenta DC" para un análisis más profundo de las transacciones contables.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la diferencia entre la función "Movimiento Cuenta" y la función "Movimiento Cuenta DC" en ContaPyme?
#### Respuesta
La función "Movimiento Cuenta" calcula el movimiento de una cuenta como la diferencia entre los débitos y los créditos (débitos menos créditos), mientras que la función "Movimiento Cuenta DC" permite obtener los movimientos de débito, crédito o el saldo de una cuenta por separado.

### ¿Cómo se usa la función "Movimiento Cuenta DC" en ContaPyme?
#### Respuesta
La función "Movimiento Cuenta DC" se utiliza en ContaExcel Add In.  Debes ingresar la fórmula especificando el código de la cuenta, el tipo de movimiento (débito, crédito o saldo), la fecha inicial y la fecha final.

### ¿Cuál es la sintaxis correcta para usar la función "Movimiento Cuenta DC"?
#### Respuesta
La sintaxis correcta para la función "Movimiento Cuenta DC" es: `=MovCuentaDC(código de la cuenta, indicador de débito/crédito/saldo, fecha inicial, fecha final)`.

### ¿Qué valores puedo usar para el indicador de débito/crédito/saldo en la función "Movimiento Cuenta DC"?
#### Respuesta
Para el indicador de débito/crédito/saldo, puedes usar:
*   `D` para obtener el movimiento débito.
*   `C` para obtener el movimiento crédito.
*   `S` para obtener el saldo.
*   `B` para obtener el valor base.

### ¿Cómo puedo obtener ayuda sobre la función "Movimiento Cuenta DC" mientras la estoy editando?
#### Respuesta
Cuando estés editando la función, puedes presionar el botón `FX` (insertar función) para que aparezca el asistente de funciones de Excel. Desde allí puedes obtener ayuda específica sobre la función "Movimiento Cuenta DC" y ver el formato correcto de los parámetros.

### ¿Qué significa el valor base (B) en la función "Movimiento Cuenta DC"?
#### Respuesta
El valor base (B) se refiere al valor que se ha introducido en la cuenta en el débito o en el crédito.

---

# Software Contable ContaPyme - ContaExcel Add In - Función Movimiento cuenta - Ej Balance
[Ver el video](https://www.youtube.com/watch?v=6NzJytaPf5I)
[ContaExcel Add In - Función Movimiento cuenta - Ej Balance]

## Tema principal
Creación de un balance general y mayor con la función `SaldoCuenta` en ContaPyme utilizando el Add-in de Excel.

## Resumen general
Este video explica cómo utilizar el Add-in de ContaPyme en Excel para generar un balance general dinámico y un mayor de cuentas. Se muestra cómo obtener el saldo anterior, los débitos, los créditos y el nuevo saldo de una cuenta en un período específico, usando la función `SaldoCuenta` y otras funciones relacionadas. Se enfatiza la importancia del manejo de fechas para obtener resultados precisos y se comprueba la exactitud de los cálculos comparando los resultados con la función `SaldoCuenta`.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo obtener el nombre de una cuenta en Excel usando el Add-in de ContaPyme?
#### Respuesta
Puedes usar la función `NombreCuenta` del Add-in de ContaPyme. Simplemente escribe `=NombreCuenta` y dentro del paréntesis, ingresa el número de la cuenta entre comillas (ej. "=NombreCuenta("1234567")").

### ¿Cómo calcular el saldo anterior de una cuenta a una fecha específica?
#### Respuesta
1.  **Determina la fecha de corte:** Define la fecha hasta la cual deseas calcular el saldo anterior. Por ejemplo, 31 de diciembre de 2011.
2.  **Calcula el primer día del mes anterior:** Utiliza la fórmula `=FIN.MES(fecha_corte;-1)+1` para obtener el primer día del mes anterior a la fecha de corte. Esto te dará el punto de inicio para calcular el saldo anterior.
3.  **Usa la función `SaldoCuenta`:** Escribe `=SaldoCuenta(numero_de_cuenta;fecha)` y reemplaza `numero_de_cuenta` con la celda que contiene el número de la cuenta y `fecha` con la celda que contiene el primer día del mes anterior (calculado en el paso 2).

### ¿Cómo obtener los débitos y créditos de una cuenta para un mes determinado?
#### Respuesta
1.  **Calcula el primer día del mes:** Utiliza la función `=FIN.MES(fecha_corte;-1)+1` para obtener el primer día del mes.
2.  **Calcula el último día del mes:** Utiliza la función `=FIN.MES(fecha_corte;0)` para obtener el último día del mes.
3.  **Usa la función `MoCuentaDC`:** Para obtener los débitos, escribe `=MoCuentaDC(numero_de_cuenta;"D";fecha_inicial;fecha_final)`. Para obtener los créditos, escribe `=MoCuentaDC(numero_de_cuenta;"C";fecha_inicial;fecha_final)`. Reemplaza `numero_de_cuenta` con la celda que contiene el número de la cuenta, `fecha_inicial` con la celda del primer día del mes y `fecha_final` con la celda del último día del mes.

### ¿Cómo calcular el nuevo saldo de una cuenta a partir del saldo anterior, los débitos y los créditos?
#### Respuesta
El nuevo saldo se calcula sumando el saldo anterior, los débitos y restando los créditos. La fórmula en Excel sería: `=saldo_anterior + debitos - creditos`.  Ten en cuenta la naturaleza de la cuenta (débito o crédito) al realizar el cálculo, ya que algunas cuentas de naturaleza crédito se deben restar.

### ¿Cómo puedo obtener el nombre de la empresa activa en ContaPyme dentro de Excel?
#### Respuesta
Utiliza la función `=NombreEmpresaTrabajoActiva()`. Esta función mostrará el nombre de la empresa con la que estás trabajando actualmente en ContaPyme.

### ¿Cómo puedo recalcular los valores en Excel después de cambiar la fecha o las cuentas?
#### Respuesta
Presiona la tecla `F9` en Excel. Esto forzará el recalculo de todas las fórmulas en la hoja, actualizando los saldos y movimientos con la nueva información.

### ¿Cómo crear un balance general o un mayor en Excel utilizando la información de ContaPyme?
#### Respuesta
1.  **Define las columnas:** Crea columnas para el número de cuenta, nombre de la cuenta, saldo anterior, débitos, créditos y nuevo saldo.
2.  **Extrae la información de las cuentas:** Utiliza las funciones explicadas anteriormente (`NombreCuenta`, `SaldoCuenta`, `MoCuentaDC`) para llenar las columnas con los datos correspondientes de ContaPyme.
3.  **Calcula el nuevo saldo:** Utiliza la fórmula `saldo_anterior + debitos - creditos` para calcular el nuevo saldo de cada cuenta.
4.  **Copia las fórmulas:** Una vez que hayas configurado la primera fila, copia las fórmulas hacia abajo para aplicar los cálculos a todas las cuentas que desees incluir en el balance o mayor.
5.  **Recalcula la hoja:** Presiona `F9` para actualizar todos los valores.

### ¿Cómo verificar si los cálculos de saldos en Excel son correctos comparados con ContaPyme?
#### Respuesta
Utiliza la función `SaldoCuenta` directamente a la fecha final del periodo que estás calculando y compara el resultado con el nuevo saldo que calculaste en Excel (saldo anterior + débitos - créditos). Si ambos valores coinciden, significa que tus cálculos son correctos.

---

# Software Contable ContaPyme - ContaExcel Add In - Función Movimiento cuenta con múltiples cuentas
[Ver el video](https://www.youtube.com/watch?v=CjcrsJ3vJW8)

## Tema principal
Utilizar listas de códigos de cuentas en lugar de un solo código en las funciones de ContaPyme Add-In para Excel.

## Resumen general
Este video explica cómo utilizar la funcionalidad de lista de códigos de cuentas en lugar de un solo código en las funciones de movimiento y saldo de cuenta en ContaPyme Add-In para Excel. Permite obtener el movimiento o saldo consolidado de varias cuentas simultáneamente, facilitando el análisis de información contable. El video demuestra cómo aplicar esta función y muestra la diferencia entre el movimiento y el saldo de las cuentas de resultado.

## Preguntas Frecuentes (FAQ)

### ¿Puedo obtener el movimiento de varias cuentas simultáneamente en ContaPyme Add-In para Excel?
#### Respuesta
Sí, la función de Movimiento Cuenta permite ingresar una lista de códigos de cuentas en lugar de un solo código, obteniendo el movimiento total de esas cuentas.

### ¿Cómo se usa la función Movimiento Cuenta con una lista de códigos de cuentas?
#### Respuesta
En lugar de ingresar un solo código de cuenta, puedes ingresar una lista de códigos separados por comas en el campo del código de la cuenta dentro de la función.  Por ejemplo: 41, 42, 43.  Al recalcular, el sistema calculará el movimiento consolidado de todas las cuentas en la lista.

### ¿Aparecerá el nombre de la cuenta al usar una lista de códigos en la función Movimiento Cuenta?
#### Respuesta
No. Cuando se utiliza una lista de códigos, el nombre de la cuenta no se mostrará, aunque la función esté presente en la fórmula.

### ¿Puedo usar la función Saldo Cuenta con una lista de códigos de cuentas?
#### Respuesta
Sí, la función Saldo Cuenta también permite utilizar una lista de códigos de cuentas para obtener el saldo consolidado de esas cuentas.

### ¿Cómo uso la función Saldo Cuenta con una lista de códigos?
#### Respuesta
La sintaxis es similar a la de Movimiento Cuenta. En el campo donde normalmente se ingresaría un único código de cuenta, ingresa una lista de códigos separados por comas. Luego, ingresa la fecha final para la cual deseas obtener el saldo.

### ¿Por qué el movimiento y el saldo me dan el mismo resultado?
#### Respuesta
Esto ocurre cuando se consulta desde el inicio del ejercicio contable (por ejemplo, desde el primero de enero para cuentas de resultado). Las cuentas de resultado comienzan con saldo cero al inicio del año, por lo que el movimiento acumulado desde enero hasta una fecha dada será igual al saldo a esa fecha.

### ¿Cómo puedo ver la diferencia entre el movimiento y el saldo de las cuentas de resultado?
#### Respuesta
Para ver la diferencia entre el movimiento y el saldo, debes consultar el movimiento desde una fecha posterior al inicio del ejercicio contable. Por ejemplo, si consultas el movimiento desde el primero de febrero, obtendrás el movimiento solo de ese mes, mientras que el saldo mostrará el acumulado desde el inicio del año hasta la fecha final especificada.

---

# Software Contable ContaPyme - ContaExcel Add In - Función movimiento cuenta por tercero
[Ver el video](https://www.youtube.com/watch?v=QA4Th9CK2fA)
ContaExcel Add In - Función movimiento cuenta por tercero

## Tema principal
Consultar movimientos contables de una cuenta específica para un tercero en un rango de fechas usando ContaPyme y ContaExcel.

## Resumen general
Este video explica cómo usar la función "Movimiento Cuenta por Tercero" en la integración de ContaPyme con ContaExcel. Esta función permite extraer información detallada sobre los movimientos de una cuenta específica para un tercero en particular, dentro de un rango de fechas definido. Se demuestra cómo construir la fórmula en Excel, fijar las celdas necesarias y analizar los resultados para obtener información valiosa sobre la contabilidad de la empresa. Esta información es útil para el análisis financiero, la detección de errores y la toma de decisiones.

## Preguntas Frecuentes (FAQ)

### ¿Qué información puedo obtener con la función "Movimiento Cuenta por Tercero"?
#### Respuesta
La función "Movimiento Cuenta por Tercero" te permite obtener el valor total de los movimientos (débitos o créditos) de una cuenta específica, asociado a un tercero particular, dentro de un rango de fechas determinado.

### ¿Qué datos necesito para usar la función "Movimiento Cuenta por Tercero" en ContaExcel?
#### Respuesta
Necesitas los siguientes datos:
1.  **Código de la cuenta contable:** El código de la cuenta que deseas analizar.
2.  **Identificación del tercero:** El número de identificación del tercero asociado a los movimientos.
3.  **Débito o crédito (D/C):** Indicar si quieres consultar los débitos ("D") o los créditos ("C").
4.  **Fecha inicial:** La fecha de inicio del rango de fechas que quieres analizar.
5.  **Fecha final:** La fecha de fin del rango de fechas que quieres analizar.
6.  **Empresa**
7.  **Centro de Costos**

### ¿Cómo se usa la función "Movimiento Cuenta por Tercero" en Excel?
#### Respuesta
1.  Ubica la celda donde quieres que aparezca el resultado.
2.  Escribe la fórmula: `=Mov_Cuenta_Tercero(cuenta, tercero, debito_credito, fecha_inicial, fecha_final, empresa, centro_costos)`.
3.  Reemplaza los argumentos con las referencias a las celdas que contienen los datos correspondientes:
    *   `cuenta`: Celda que contiene el código de la cuenta.
    *   `tercero`: Celda que contiene la identificación del tercero.
    *   `debito_credito`: Celda que contiene "D" (para débitos) o "C" (para créditos).
    *   `fecha_inicial`: Celda que contiene la fecha inicial.
    *   `fecha_final`: Celda que contiene la fecha final.
    *   `empresa`: Celda que contiene la información de la empresa.
    *   `centro_costos`: Celda que contiene la información del centro de costos.

### ¿Cómo puedo aplicar la fórmula "Movimiento Cuenta por Tercero" a varias cuentas o terceros?
#### Respuesta
Para aplicar la fórmula a varias celdas sin tener que reescribirla, debes "fijar" las referencias a las celdas que no deben cambiar al arrastrar la fórmula.  Utiliza el símbolo `$` para fijar filas o columnas.

1.  **Fija las celdas necesarias:** En la fórmula original, agrega el símbolo `$` antes de la letra de la columna y/o el número de la fila de las celdas que no deben cambiar al copiar la fórmula. Por ejemplo, si la celda con la identificación del tercero es `B2` y no quieres que cambie, escribe `$B$2`.
2.  **Arrastra la fórmula:** Después de fijar las celdas, arrastra la fórmula a las celdas adyacentes para aplicarla a las otras cuentas o terceros.

### ¿Qué significa el resultado que me da la función "Movimiento Cuenta por Tercero"?
#### Respuesta
El resultado que muestra la función es la suma total de todos los movimientos (ya sean débitos o créditos, según lo especificado en la fórmula) registrados en la cuenta especificada, para el tercero indicado, dentro del rango de fechas establecido. Este valor está en la moneda utilizada en ContaPyme.

---

# Software Contable ContaPyme - ContaExcel Add In - Función movimiento cuenta valor 1
[Ver el video](https://www.youtube.com/watch?v=5dT3g6sWU00)

## Tema principal
Uso de valores adicionales (valor uno, clase uno, etc.) en los movimientos contables dentro de ContaPyme.

## Resumen general
Este video explica cómo utilizar los valores adicionales (valor uno, clase uno, valor dos, clase dos) en los movimientos contables de ContaPyme. Estos valores permiten registrar información extra asociada a cada movimiento de cuenta, como número de horas de capacitación o unidades. El video muestra cómo configurar una cuenta para que exija estos valores adicionales y cómo ingresarlos durante la creación de un movimiento contable. También explica cómo borrar la caché del sistema para que los cambios en la configuración se reflejen correctamente.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los valores "valor uno" y "clase uno" en ContaPyme?
#### Respuesta
Son parámetros adicionales que se pueden asignar a los movimientos de las cuentas en ContaPyme. Estos valores permiten añadir información específica y complementaria a cada movimiento contable.

### ¿Para qué sirven los valores adicionales como "valor uno" y "clase uno"?
#### Respuesta
Sirven para registrar información adicional en los movimientos contables. Por ejemplo, para una cuenta de capacitaciones, se podría registrar el número de horas de capacitación en "valor uno" y la unidad (horas) en "clase uno". Esta información puede ser útil para realizar cálculos y análisis específicos en ContaExcel.

### ¿Cómo configuro una cuenta para que exija los valores adicionales (valor uno, clase uno, etc.)?
#### Respuesta
Para configurar una cuenta y exigir valores adicionales:
1.  Dirígete a **Plan de Cuentas**.
2.  Selecciona la cuenta que deseas modificar (por ejemplo, "capacitaciones y auditorías").
3.  Haz doble clic sobre la cuenta para editarla.
4.  Haz clic en el botón **Información Adicional**.
5.  Marca las casillas correspondientes a los valores que deseas exigir (por ejemplo, "Exige Clase Uno" y "Exige Valor Uno").
6.  Indica si quieres que se marquen como visibles.
7.  Guarda los cambios.

### ¿Cómo ingreso los valores adicionales (valor uno, clase uno, etc.) en un movimiento contable?
#### Respuesta
1.  Dirígete a **Manejador de Operaciones** y crea un nuevo movimiento contable.
2.  Selecciona la cuenta que configuraste para exigir valores adicionales (por ejemplo, "capacitaciones y auditorías").
3.  Aparecerán columnas adicionales (Valor Uno, Clase Uno, etc.) en la pantalla.
4.  Ingresa los valores correspondientes en las columnas correspondientes.

### ¿Por qué no aparecen los valores adicionales (valor dos, clase dos, etc.) en el movimiento contable después de configurarlos en el plan de cuentas?
#### Respuesta
Es posible que el sistema esté utilizando la caché. Para solucionar esto:

1.  Cierra el **Manejador de Operaciones** (o cualquier ventana donde no se reflejen los cambios).
2.  Dirígete a la opción para **Borrar los Cachés** (la ruta específica no se menciona, pero está dentro de la configuración del sistema).
3.  Selecciona la opción **Borrar los Cachés y Refrescar Ventanas Abiertas**.
4.  Espera a que el sistema complete el proceso.
5.  Vuelve a abrir el **Manejador de Operaciones** y crea un nuevo movimiento contable. Los valores adicionales deberían aparecer ahora.

### ¿Puedo darle nombres a las columnas de los valores adicionales?
#### Respuesta
Sí, es posible asignar nombres a las columnas de los valores adicionales (Valor Uno, Clase Uno, etc.). La configuración para esto se encuentra dentro de la configuración del plan de cuentas, aunque la ruta exacta no se especifica en el video.

---

# Software Contable ContaPyme - ContaExcel Add In - Función movimiento cuenta valor base
[Ver el video](https://www.youtube.com/watch?v=3Uay3IUN2l0)
ContaExcel Add In - Función movimiento cuenta valor base

## Tema principal
Consultar el movimiento del valor base de una cuenta contable, ya sea para todos los terceros o para un tercero específico.

## Resumen general
Este video explica cómo utilizar la función "movimiento cuenta valor base" en ContaPyme para consultar los movimientos del valor base de una cuenta. Se detalla la sintaxis de la función y los parámetros necesarios, incluyendo la identificación de la cuenta, el tercero (opcional), las fechas inicial y final, la empresa y el centro de costos (este último también opcional). Se muestra cómo obtener el movimiento total del valor base para todos los terceros y cómo filtrarlo para un tercero específico.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la función "movimiento cuenta valor base" en ContaPyme?
#### Respuesta
Es una función dentro del complemento ContaExcel que permite consultar el valor base que se ha movido en una cuenta contable en un periodo determinado.

### ¿Qué parámetros se necesitan para usar la función "movimiento cuenta valor base"?
#### Respuesta
Se necesitan los siguientes parámetros:
- Identificación de la cuenta contable.
- Identificación del tercero (opcional). Si se omite, se tomarán todos los terceros.
- Fecha inicial del período a consultar.
- Fecha final del período a consultar.
- Empresa (opcional, asume la empresa de trabajo si se omite).
- Centro de costos (opcional).

### ¿Qué tipo de cuentas requieren valor base?
#### Respuesta
Cuentas como las de IVA y retención en la fuente (retefuente) requieren valor base.

### ¿Cómo puedo obtener el movimiento del valor base de una cuenta para todos los terceros?
#### Respuesta
Para obtener el movimiento del valor base para todos los terceros, debes dejar vacío el parámetro correspondiente al tercero en la función. Por ejemplo: `=mov cuenta valor base(2408, "", "01/01/2011", "31/12/2011")` donde "" indica que se deben tomar todos los terceros.

### ¿Cómo puedo obtener el movimiento del valor base de una cuenta para un tercero específico?
#### Respuesta
Debes proporcionar la identificación del tercero en el parámetro correspondiente de la función. Por ejemplo: `=mov cuenta valor base(2408, 35491720, "01/01/2011", "31/12/2011")` donde `35491720` es la identificación del tercero.

### ¿Cómo se interpreta el resultado de la función "movimiento cuenta valor base"?
#### Respuesta
El resultado es el valor total del movimiento del valor base en la cuenta especificada, durante el período especificado, ya sea para todos los terceros o para el tercero específico que se haya indicado. Por ejemplo, si el resultado es 1094 millones, significa que hubo un movimiento de 1094 millones en el valor base de la cuenta durante ese período.

---

# Software Contable ContaPyme - ContaExcel Add In - Función Movimiento cuenta
[Ver el video](https://www.youtube.com/watch?v=hVMfVu51VZc)
hVMfVu51VZc

## Tema principal
Obtener el movimiento de una cuenta contable en ContaPyme utilizando la función Movimiento Cuenta.

## Resumen general
Este video explica cómo utilizar la función "Movimiento Cuenta" en el complemento ContaExcel de ContaPyme para obtener el movimiento contable de una cuenta específica entre dos fechas. Se detalla el uso de los parámetros de la función: código de la cuenta, fecha inicial y fecha final. Además, muestra cómo calcular el movimiento mensual de una cuenta durante un año, utilizando tanto celdas auxiliares para calcular las fechas de inicio y fin de mes, como una fórmula única que integra el cálculo de las fechas directamente en la función "Movimiento Cuenta".

## Preguntas Frecuentes (FAQ)

### ¿Qué es la función "Movimiento Cuenta" en ContaPyme?
#### Respuesta
La función "Movimiento Cuenta" es una herramienta dentro del complemento ContaExcel de ContaPyme que permite obtener el movimiento contable de una cuenta específica entre dos fechas dadas. El resultado se calcula restando los créditos a los débitos en el rango de fechas especificado.

### ¿Cuáles son los parámetros que requiere la función "Movimiento Cuenta"?
#### Respuesta
La función "Movimiento Cuenta" requiere tres parámetros:
1.  **Código de la cuenta:** El código de la cuenta contable que se desea analizar.
2.  **Fecha inicial:** La fecha de inicio del período que se va a analizar.
3.  **Fecha final:** La fecha de finalización del período que se va a analizar.

### ¿Cómo se utiliza la función "Movimiento Cuenta" en una hoja de cálculo?
#### Respuesta
Para utilizar la función "Movimiento Cuenta", sigue estos pasos:
1.  En una celda de la hoja de cálculo, escribe la fórmula: `=MovCuenta(codigo_cuenta, fecha_inicial, fecha_final)`
2.  Reemplaza `codigo_cuenta` con la celda que contiene el código de la cuenta contable.
3.  Reemplaza `fecha_inicial` con la celda que contiene la fecha de inicio.
4.  Reemplaza `fecha_final` con la celda que contiene la fecha de finalización.
5.  Presiona "Enter" para obtener el resultado.

### ¿Cómo puedo obtener el movimiento mensual de una cuenta durante un año?
#### Respuesta
Hay dos maneras de obtener el movimiento mensual de una cuenta:

**Opción 1: Usando celdas auxiliares para calcular las fechas de inicio y fin de mes**

1.  En una columna, lista los números de los meses del año (1 al 12).
2.  En una columna adyacente, calcula la fecha de inicio de cada mes utilizando la función `FECHA`. Por ejemplo: `=FECHA(año_fijo, mes, 1)`, donde `año_fijo` es la celda que contiene el año (fijada con `F4`) y `mes` es la celda que contiene el número del mes.
3.  En otra columna, calcula la fecha final de cada mes utilizando la función `ULTIMODIAMES`. Por ejemplo: `=ULTIMODIAMES(fecha_inicio)`, donde `fecha_inicio` es la celda que contiene la fecha de inicio del mes.
4.  En una columna adicional, utiliza la función "Movimiento Cuenta" para calcular el movimiento de la cuenta para cada mes: `=MovCuenta(codigo_cuenta_fijo, fecha_inicio, fecha_fin)`, donde `codigo_cuenta_fijo` es la celda que contiene el código de la cuenta (fijada con `F4`), `fecha_inicio` es la celda que contiene la fecha de inicio del mes, y `fecha_fin` es la celda que contiene la fecha final del mes.

**Opción 2: Usando una sola fórmula sin celdas auxiliares**

1.  En una celda, escribe la siguiente fórmula: `=MovCuenta(codigo_cuenta_fijo, FECHA(año_fijo, mes, 1), ULTIMODIAMES(FECHA(año_fijo, mes, 1)))`, donde `codigo_cuenta_fijo` es la celda que contiene el código de la cuenta (fijada con `F4`), `año_fijo` es la celda que contiene el año (fijada con `F4`), y `mes` es la celda que contiene el número del mes (fijando la columna `A` para que no se modifique al copiar la fórmula a la derecha).
2.  Copia la fórmula para los demás meses.

### ¿Cómo puedo obtener el movimiento mensual de varias cuentas durante un año?

#### Respuesta
Para obtener el movimiento mensual de varias cuentas durante un año puedes seguir estos pasos:

1.  Escribe los meses (1 al 12) de manera horizontal en una fila.
2.  En la primera columna, lista los códigos de las cuentas que deseas analizar.
3.  En la celda donde quieres calcular el movimiento de la primera cuenta en el primer mes, escribe la fórmula `MovCuenta` combinando la función `FECHA` y `ULTIMODIAMES`. Recuerda fijar las celdas correspondientes para el código de cuenta (fijar la columna) y para el año (fijar fila y columna).  Por ejemplo: `=MovCuenta($A2,FECHA($B$1,B2,1),ULTIMODIAMES(FECHA($B$1,B2,1)))`. Asumiendo que los códigos de cuenta están en la columna `A`, los meses en la fila `1` y el año en la celda `B1`.
4.  Arrastra la fórmula a través de las filas y columnas para replicar el cálculo a lo largo de las cuentas y los meses.
5.  Recalcula la hoja de cálculo para ver los resultados. Presiona **Shift + F9**.

### ¿Qué significa que el valor del "código de la cuenta" se debe fijar?
#### Respuesta
Cuando se habla de "fijar" una celda en una fórmula de Excel, significa que la referencia a esa celda no cambiará cuando copies la fórmula a otras celdas. Esto se hace usando el símbolo "$" antes de la letra de la columna y/o del número de la fila.  Por ejemplo, `$A1` fija la columna `A`, `A$1` fija la fila `1`, y `$A$1` fija tanto la columna como la fila.

### ¿Cómo se recalcula la hoja de cálculo en ContaPyme?
#### Respuesta
Para recalcular la hoja de cálculo en ContaPyme, puedes presionar la combinación de teclas **Shift + F9**.

---

# Software Contable ContaPyme - ContaExcel Add In - Función Nombre mes
[Ver el video](https://www.youtube.com/watch?v=1CXId3EuwlM)
1CXId3EuwlM

## Tema principal
Uso de la función "Nombre mes" en el Add-In de ContaPyme para Excel.

## Resumen general
Este video explica cómo utilizar la función "Nombre mes" del Add-In ContaExcel en ContaPyme. Esta función convierte un número de mes (del 1 al 12) en el nombre del mes correspondiente. Se muestra cómo ingresar el número directamente o referenciar una celda que contenga el número del mes y cómo copiar la fórmula para generar una lista de nombres de meses automáticamente.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la función que se explica en el video?
#### Respuesta
La función que se explica en el video es "Nombre mes".

### ¿Qué hace la función "Nombre mes"?
#### Respuesta
La función "Nombre mes" convierte un número (del 1 al 12) en el nombre del mes correspondiente (enero, febrero, marzo, etc.).

### ¿Cómo se usa la función "Nombre mes"?
#### Respuesta
Para usar la función "Nombre mes", escribe `=NombreMes()` en una celda de Excel y dentro del paréntesis coloca el número del mes que deseas convertir en nombre, o la referencia a una celda que contiene el número del mes. Por ejemplo: `=NombreMes(1)` mostrará "enero".

### ¿Cómo puedo generar una lista de nombres de meses usando la función "Nombre mes"?
#### Respuesta
Para generar una lista de nombres de meses, sigue estos pasos:

1.  Escribe el número del primer mes (por ejemplo, 1) en una celda.
2.  En la celda adyacente, escribe la fórmula `=NombreMes(celda_con_el_número_del_mes)`. Por ejemplo, si el número 1 está en la celda A1, la fórmula sería `=NombreMes(A1)`.
3.  Copia la fórmula a las celdas siguientes para los demás meses. Excel recalculará automáticamente la fórmula, mostrando el nombre de cada mes.

### ¿Puedo usar una celda como referencia para el número del mes en la función "Nombre mes"?
#### Respuesta
Sí, puedes usar una celda como referencia. En lugar de escribir directamente el número del mes dentro de la función, puedes referenciar una celda que contenga el número. Esto permite que la función se actualice automáticamente si el número en la celda referenciada cambia.

---

# Software contable ContaPyme - ContaExcel Add In - Generalidades
[Ver el video](https://www.youtube.com/watch?v=7qcODo-8PXk)
ContaExcel Add In

## Tema principal
Descripción general de ContaExcel Add In como complemento para Microsoft Excel.

## Resumen general
Este video explica ContaExcel Add In, un complemento para Microsoft Excel que extiende la funcionalidad de Excel para usuarios como contadores, gerentes y analistas. Se enfoca en la creación de hojas de análisis e informes financieros, de ventas, comerciales y de costos, así como indicadores empresariales y planillas de impuestos. Lo más importante es que lee información directamente de las bases de datos de Agrowin y ContaPyme y permite el trabajo multiusuario y el acceso a través de internet.

## Preguntas Frecuentes (FAQ)

### ¿Qué es ContaExcel Add In?
#### Respuesta
ContaExcel Add In es un complemento para Microsoft Excel que añade nuevas funcionalidades para facilitar la creación de hojas de análisis e informes especializados para contadores, gerentes, analistas y otros profesionales. No es una competencia para Excel, sino una herramienta que se integra con él.

### ¿Para qué sirve ContaExcel Add In?
#### Respuesta
Sirve para:
- Generar hojas de análisis.
- Hacer informes financieros, de ventas, comerciales y de costos.
- Crear indicadores empresariales.
- Elaborar planillas de impuestos (IVA, retención).

### ¿Cuál es la principal ventaja de ContaExcel Add In?
#### Respuesta
Su mayor potencial reside en que puede leer información directamente de los bancos de datos de Agrowin y ContaPyme, utilizando funciones especializadas para extraer y presentar la información en las celdas de Excel que se deseen.

### ¿ContaExcel Add In permite el trabajo multiusuario?
#### Respuesta
Sí, permite que múltiples usuarios trabajen simultáneamente. Mientras se están grabando facturas, comprobantes de egresos o planillas de labores, otros usuarios pueden consultar y analizar la información en línea a través de hojas electrónicas.

### ¿Se puede acceder a ContaExcel Add In a través de internet?
#### Respuesta
Sí, ContaExcel Add In puede ser accedido a través de internet, permitiendo a los usuarios consultar indicadores y analizar información desde ubicaciones remotas, como desde casa.

### ¿Con qué versiones de Microsoft Excel es compatible ContaExcel Add In?
#### Respuesta
Es compatible con Microsoft Excel 2007 y 2010.

### ¿Cuántas áreas de trabajo se pueden acceder simultáneamente en ContaExcel Add In?
#### Respuesta
Se puede trabajar con un área de trabajo a la vez. Sin embargo, dentro de esa área de trabajo, se pueden acceder una, dos o múltiples empresas desde la misma hoja electrónica.

### ¿ContaExcel Add In se integra con ContaPyme y Agrowin?
#### Respuesta
Sí, se integra perfectamente con ContaPyme y Agrowin.

---

# Software Contable ContaPyme - ContaExcel Add In - Manejo básico de fechas
[Ver el video](https://www.youtube.com/watch?v=8-RUwqm0g2o)

## Tema principal
Entendiendo el manejo de fechas en Excel como números para facilitar la creación de fórmulas en ContaPyme.

## Resumen general
Este video explica cómo Excel maneja las fechas internamente como números, representando el número de días transcurridos desde el 1 de enero de 1900. Comprender este concepto es fundamental para crear fórmulas con fechas en ContaPyme, ya que Excel realiza cálculos con estos números internos y luego los formatea para mostrar fechas legibles. El video muestra ejemplos de cómo ingresar números y convertirlos a fechas, y cómo sumar días a una fecha existente.

## Preguntas Frecuentes (FAQ)

### ¿Cómo almacena Excel las fechas internamente?
#### Respuesta
Excel almacena las fechas internamente como números. Cada número representa la cantidad de días que han transcurrido desde el 1 de enero de 1900.

### ¿Qué representa el número 1 cuando se formatea como fecha en Excel?
#### Respuesta
El número 1, cuando se formatea como fecha en Excel, representa el 1 de enero de 1900.

### ¿Qué ocurre si escribo el número 2 en una celda con formato de fecha?
#### Respuesta
Excel mostrará el 2 de enero de 1900.

### ¿Por qué Excel utiliza números para representar las fechas internamente?
#### Respuesta
Excel utiliza números para representar las fechas internamente porque es más fácil y eficiente realizar cálculos con números que con formatos de fecha complejos.

### ¿Qué pasa si sumo 1 a una celda que contiene una fecha?
#### Respuesta
Si sumas 1 a una celda que contiene una fecha, Excel incrementará la fecha en un día. Por ejemplo, si la celda contenía el 1 de enero de 2012, el resultado será el 2 de enero de 2012.

### ¿Cómo puedo convertir un número a formato de fecha en Excel?
#### Respuesta
Para convertir un número a formato de fecha en Excel, selecciona la celda que contiene el número, luego ve a la sección de formato (generalmente en la pestaña "Inicio") y selecciona el formato "Fecha".

### ¿Qué representa el número 365 en formato de fecha?
#### Respuesta
El número 365 en formato de fecha representa el 30 de diciembre del año 1900.

### ¿Qué representa el número 367 en formato de fecha?
#### Respuesta
El número 367 en formato de fecha representa el 1 de enero de 1901.

### ¿Cuál es la importancia de entender cómo Excel maneja las fechas como números?
#### Respuesta
Entender cómo Excel maneja las fechas como números es crucial para poder crear fórmulas que involucren fechas de manera correcta y eficiente en ContaPyme. Al saber que las fechas son números, puedes realizar operaciones aritméticas con ellas para calcular diferencias de días, sumar o restar períodos de tiempo, y otras tareas relacionadas con fechas.

---

# Software Contable ContaPyme - ContaExcel Add In - Manejo de fechas - Inicio y fin de un mes
[Ver el video](https://www.youtube.com/watch?v=suPOXupMZgo)
[suPOXupMZgo]

## Tema principal
Manejo de fechas en ContaPyme con el Add-in de Excel, enfocándose en obtener el inicio y fin de un mes para cálculos.

## Resumen general
El video explica cómo trabajar con fechas en Excel utilizando el Add-in de ContaPyme para obtener rangos de fechas, saldos y movimientos entre cuentas.  Se muestran métodos para calcular automáticamente las fechas de inicio y fin de mes, incluyendo el uso de la función `FECHA` y la función `FIN.MES` de Excel. El video destaca la importancia de las fechas absolutas y relativas para automatizar el cálculo de fechas en ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es importante obtener las fechas de inicio y fin de mes en ContaPyme?
#### Respuesta
Es importante para poder definir rangos de fechas específicos y así obtener saldos o movimientos entre cuentas de manera precisa.

### ¿Cómo puedo obtener el saldo de una cuenta a una fecha específica en ContaPyme usando Excel?
#### Respuesta
Puedes usar la función `saldo cuenta` del Add-in de ContaPyme en Excel. Necesitarás especificar la cuenta y la fecha a la que deseas obtener el saldo.  La sintaxis general es: `=saldo cuenta(celda_con_la_cuenta; celda_con_la_fecha)`.

### ¿Cómo puedo generar automáticamente el primer día de cada mes en Excel?
#### Respuesta
Puedes usar la función `FECHA` de Excel.
1.  Primero, define el año en una celda (ej: A1) y los números de los meses (1, 2, 3...) en otra fila (ej: B1, C1, D1...).
2.  Luego, en la celda donde quieres que aparezca la fecha, escribe la fórmula `=FECHA(A1;B1;1)`.
3.  Para fijar la celda del año, usa F4 al seleccionar la celda del año en la formula, para que al copiar la formula a la derecha, siempre use el mismo año.
4.  Copia la fórmula a las celdas adyacentes para obtener el primer día de cada mes.

### ¿Cómo se usa la función FECHA con referencias absolutas y relativas?
#### Respuesta
Las referencias absolutas (fijadas con el signo `$`) mantienen una celda fija al copiar la fórmula, mientras que las referencias relativas cambian según la posición de la celda copiada.
Por ejemplo, si tienes el año en la celda A1 y los meses en las celdas B1, C1, D1, etc., la fórmula `=FECHA($A$1;B1;1)` fijará la celda del año (A1) pero permitirá que la celda del mes (B1) cambie al copiar la fórmula horizontalmente.

### ¿Por qué no puedo simplemente sumar 31 días a cada fecha para obtener el fin de mes?
#### Respuesta
Porque los meses tienen diferente cantidad de días. Al sumar 31 días a una fecha que está cerca del final de un mes más corto (como febrero), podrías terminar en el mes siguiente, obteniendo una fecha incorrecta.

### ¿Cómo puedo obtener el último día de un mes restando un día al primer día del mes siguiente?
#### Respuesta
1.  Calcula el primer día del mes siguiente usando la función `FECHA` como se explicó anteriormente.
2.  Resta 1 a esa fecha. Por ejemplo, si el primer día de marzo está en la celda A1, escribe `=A1-1` en otra celda.  El resultado será el último día de febrero.

### ¿Cómo puedo obtener el último día del mes usando la función `FIN.MES`?
#### Respuesta
La función `FIN.MES` facilita encontrar el último día de un mes.
1.  Ingresa la fecha de referencia en una celda (ej: A1).
2.  Escribe la fórmula `=FIN.MES(A1;0)` en otra celda. El primer argumento es la fecha inicial, y el segundo argumento es el número de meses a sumar (0 para el mismo mes).
3.  La celda mostrará el último día del mes de la fecha ingresada.

---

# Software Contable ContaPyme - ContaExcel Add In - Nomenclatura de las funciones
[Ver el video](https://www.youtube.com/watch?v=5Zkoj89SGwc)
ContaExcel Add In - Nomenclatura de las funciones

## Tema principal
Entender la nomenclatura de las funciones en ContaExcel para interpretar correctamente las ayudas y utilizar las funciones de manera eficiente.

## Resumen general
Este video explica la nomenclatura utilizada en las ayudas de ContaExcel Add-In, específicamente en la función "Saldo Cuenta". Se detalla el significado de los corchetes en la sintaxis de las funciones, que indican argumentos opcionales. Se aprende cómo omitir argumentos, qué valores por defecto asume el sistema en esos casos (fecha de trabajo, empresa de trabajo, centro de costos vacío), y cómo saltarse argumentos manteniendo la estructura de la función. También se explica la nomenclatura para identificar los diferentes tipos de argumentos, como identificadores (I), fechas (F), empresas (Iem) y centros de costos (ICC).

## Preguntas Frecuentes (FAQ)

### ¿Qué significan los corchetes en la sintaxis de una función en ContaExcel?
#### Respuesta
Los corchetes en la sintaxis de una función indican que el argumento o parámetro encerrado entre ellos es opcional. Esto significa que no es obligatorio proporcionarlo al usar la función.

### Si omito un argumento opcional en una función, ¿qué valor usa ContaExcel?
#### Respuesta
ContaExcel asume valores por defecto para los argumentos opcionales que se omiten:
- **Fecha de finalización:** Asume la fecha de trabajo actual.
- **Identificación de la empresa:** Asume la empresa de trabajo actual.
- **Identificación del centro de costos:** Asume el centro de costos vacío (todos los centros de costos).
- **Identificación de la cuenta:** Asume todas las cuentas.

### ¿Cómo puedo omitir un argumento opcional específico en una función sin omitir los siguientes?
#### Respuesta
Para omitir un argumento opcional específico, debes dejar el espacio correspondiente al parámetro usando un punto y coma (;) para indicar que ese parámetro se está omitiendo. Por ejemplo:
`=SaldoCuenta(1105;;1)`  En este ejemplo, se proporciona el código de la cuenta (1105) y el código de la empresa (1), pero se omite la fecha de finalización.

### ¿Qué significa "I Cuenta" en la nomenclatura de los argumentos?
#### Respuesta
"I Cuenta" significa "Identificador de la Cuenta". La letra "I" al principio indica que se trata de un identificador, y "Cuenta" especifica que es el identificador de la cuenta contable.

### ¿Qué significan "F Fin" e "Iem" en la nomenclatura de los argumentos?
#### Respuesta
- "F Fin" significa "Fecha de Finalización". La letra "F" al principio indica que se trata de una fecha.
- "Iem" significa "Identificador de la Empresa". La letra "I" al principio indica que se trata de un identificador.

### ¿Qué significa "ICC" en la nomenclatura de los argumentos?
#### Respuesta
"ICC" significa "Identificador del Centro de Costos". La letra "I" al principio indica que se trata de un identificador, y "CC" es la abreviatura común para "Centro de Costos".

### ¿Qué pasa si uso la función Saldo Cuenta sin ningún parámetro?
#### Respuesta
Si usas la función `SaldoCuenta()` sin ningún parámetro, ContaExcel asume que quieres el saldo de todas las cuentas, a la fecha de trabajo, para la empresa de trabajo, y para todos los centros de costos. Esto puede usarse para verificar si el balance general está cuadrado, ya que debería dar cero.

### ¿Cómo puedo ver la ayuda de una función en ContaExcel?
#### Respuesta
Para acceder a la ayuda de una función en ContaExcel, puedes hacer lo siguiente:
1. Escribe la función en una celda (por ejemplo, `=SaldoCuenta()`).
2. Haz clic en el botón "FX" (Insertar función) en la barra de fórmulas.
3. Aparecerá una ventana con los parámetros de la función. Puedes hacer clic en "Ayuda sobre esta función" para obtener una descripción detallada de cada parámetro y ejemplos de uso.

### ¿En la función Saldo Cuenta, qué significa que el identificador de la cuenta sea un valor opcional?
#### Respuesta
Que el identificador de la cuenta sea un valor opcional significa que se puede llamar la función `SaldoCuenta()` sin especificar ningún número de cuenta. En este caso el sistema va a tomar como referencia **todas** las cuentas.

---

# Software Contable ContaPyme - ContaExcel Add In - Otras funciones de fecha
[Ver el video](https://www.youtube.com/watch?v=SyDuReY4Gog)
[SyDuReY4Gog]

## Tema principal
Uso de funciones de fecha en ContaPyme para calcular fechas de inicio y fin de semana, y obtener el número de semana correspondiente a una fecha.

## Resumen general
El video explica cómo utilizar funciones de fecha en ContaPyme para manipular fechas relacionadas con semanas. Se aprende a calcular la fecha del lunes anterior a una fecha dada, la fecha de inicio de una semana dado su número y año, y la fecha de finalización de una semana. También se muestra cómo obtener el número de semana correspondiente a una fecha específica, lo cual es útil para análisis semanales de ventas, ingresos o labores.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo obtener la fecha del lunes anterior a una fecha específica en ContaPyme?
#### Respuesta
Puedes usar la función "fecha lunes" en ContaPyme. Debes indicar la fecha de la cual quieres obtener el lunes anterior. Por ejemplo: `=fecha lunes(fecha)`.

### ¿Cómo puedo encontrar la fecha de inicio de una semana dado el número de semana y el año?
#### Respuesta
Para encontrar la fecha de inicio de una semana (el lunes de esa semana) dado el número de semana y el año, debes usar la función "fecha inicio semana". La sintaxis es: `=fecha inicio semana(número de semana, año)`.

### ¿Cómo puedo obtener la fecha de finalización (domingo) de una semana, una vez que tengo la fecha de inicio (lunes)?
#### Respuesta
Una vez que tienes la fecha de inicio de la semana (el lunes), puedes obtener la fecha de finalización (el domingo) sumándole 7 días a la fecha de inicio. Por ejemplo: `=celda_con_fecha_de_inicio + 7`.

### ¿Cómo puedo obtener el número de semana correspondiente a una fecha específica?
#### Respuesta
Puedes utilizar la función "número semana" en ContaPyme. Debes indicar la fecha y el año. La sintaxis es: `=número semana(fecha, año)`. Esta función te devolverá el número de semana correspondiente a esa fecha dentro del año especificado.

---

# Software Contable ContaPyme - ContaExcel Add In - Repaso - Referencia absoluta a celdas
[Ver el video](https://www.youtube.com/watch?v=GV8ThEKG7uI)
[Software Contable ContaPyme - ContaExcel Add In - Repaso - Referencia absoluta a celdas]

## Tema principal
Uso de referencias absolutas a celdas en Excel para crear fórmulas repetitivas.

## Resumen general
Este video explica cómo usar referencias absolutas a celdas en Excel. La referencia absoluta permite fijar una celda específica en una fórmula, de manera que, al copiar la fórmula a otras celdas, siempre haga referencia a la celda fijada. Se muestra cómo fijar tanto la columna como la fila de una celda usando el signo de pesos ($) en la fórmula. Esto es útil para crear tablas y fórmulas repetitivas que hacen referencia a un valor específico.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una referencia absoluta a celdas en Excel?
#### Respuesta
Una referencia absoluta a celdas en Excel es una forma de fijar una celda específica en una fórmula, de manera que, al copiar la fórmula a otras celdas, siempre haga referencia a esa celda fijada.

### ¿Cómo se fija una celda como referencia absoluta en Excel?
#### Respuesta
Para fijar una celda como referencia absoluta, se utiliza el signo de pesos ($) antes de la letra de la columna y antes del número de la fila en la fórmula. Por ejemplo, si quieres fijar la celda B71, la referencia absoluta sería $B$71.

### ¿Qué significa el signo de pesos ($) en una referencia de celda?
#### Respuesta
El signo de pesos ($) en una referencia de celda indica que la columna o la fila (o ambas) están fijas. Si el signo de pesos está antes de la letra de la columna ($B), la columna está fija. Si está antes del número de la fila (B$71), la fila está fija. Si está antes de ambos ($B$71), tanto la columna como la fila están fijas.

### ¿Por qué es útil usar referencias absolutas en Excel?
#### Respuesta
Las referencias absolutas son útiles para crear tablas y fórmulas repetitivas donde necesitas que una fórmula siempre haga referencia a una celda específica, independientemente de dónde se copie la fórmula. Esto evita tener que modificar manualmente la fórmula cada vez que se copia a una nueva celda.

### ¿Qué pasa si copio una fórmula con referencia relativa a una celda a otra ubicación?
#### Respuesta
Si copias una fórmula con referencia relativa, las referencias a las celdas se ajustarán automáticamente según la nueva ubicación. Por ejemplo, si tienes la fórmula `=B71+1` en la celda C71 y la copias a la celda C72, la fórmula se ajustará a `=B72+1`.

### ¿Cómo puedo combinar referencias relativas y absolutas en una misma fórmula?
#### Respuesta
Puedes combinar referencias relativas y absolutas en la misma fórmula. Por ejemplo, si quieres que solo la columna esté fija y la fila sea relativa, puedes usar `$B71`. Si quieres que solo la fila esté fija y la columna sea relativa, puedes usar `B$71`.

---

# Software contable ContaPyme - ContaExcel Add In - Repaso - Referencia relativa a celdas
[Ver el video](https://www.youtube.com/watch?v=RuF3Drcld4U)
ContaExcel Add In - Repaso - Referencia relativa a celdas

## Tema principal
Explicación del concepto de referencia relativa a celdas en hojas de cálculo y cómo se aplica al copiar fórmulas.

## Resumen general
Este video explica cómo las referencias relativas a celdas funcionan al copiar fórmulas en una hoja de cálculo. Se muestra cómo al copiar una fórmula, las referencias a las celdas se ajustan automáticamente en función de la posición relativa de la fórmula original. A través de ejemplos como la creación de tablas de multiplicar y la suma de valores, se ilustra cómo Excel mantiene la relación entre la fórmula y las celdas referenciadas al copiarla a nuevas ubicaciones. Además, se presenta la función de rastreo de precedentes para identificar las celdas que influyen en el resultado de una fórmula.

## Preguntas Frecuentes (FAQ)

### ¿Qué significa hacer referencia a celdas de manera relativa?
#### Respuesta
Significa que al utilizar una celda en una fórmula, Excel no guarda la dirección exacta de la celda, sino su posición en relación con la celda que contiene la fórmula. Cuando se copia la fórmula a otra celda, Excel ajusta automáticamente las referencias para mantener la misma relación posicional.

### ¿Cómo puedo crear una tabla de multiplicar usando referencias relativas?
#### Respuesta
Puedes crear una tabla de multiplicar ingresando los números del 1 al 9 en una fila, luego el número que quieres usar como multiplicador en otra celda. Después, puedes usar la siguiente fórmula y copiarla:
1.  En la celda donde quieras el resultado de la multiplicación, escribe **= (celda del número) * (celda del multiplicador)**. Por ejemplo, si los números del 1 al 9 están en las celdas B53 a J53 y el multiplicador (6) está en la celda C53, la fórmula sería **=B53*C53**.
2.  Copia esta fórmula a las celdas adyacentes. Excel ajustará automáticamente las referencias relativas para calcular las siguientes multiplicaciones.

### ¿Qué sucede cuando copio una fórmula que contiene referencias relativas?
#### Respuesta
Cuando copias una fórmula con referencias relativas, Excel ajusta automáticamente las referencias de celda en la fórmula copiada para que coincidan con la nueva posición relativa. Es decir, si la fórmula original hacía referencia a una celda dos columnas a la izquierda, la copia de la fórmula seguirá haciendo referencia a una celda dos columnas a la izquierda de su nueva ubicación.

### ¿Cómo puedo copiar una fórmula rápidamente a varias celdas?
#### Respuesta
Puedes copiar una fórmula rápidamente usando las siguientes opciones:
*   **Control C y Control V:** Selecciona la celda con la fórmula, presiona Control + C para copiar, luego selecciona el rango de celdas donde quieres copiar la fórmula y presiona Control + V para pegar.
*   **Arrastrar el controlador de relleno:** Selecciona la celda que contiene la fórmula, ubica el cursor en la esquina inferior derecha de la celda (aparecerá una cruz negra), haz clic y arrastra para copiar la fórmula a las celdas adyacentes.

### ¿Qué es "rastrear precedentes" y cómo puedo usarlo?
#### Respuesta
"Rastrear precedentes" es una función que muestra visualmente las celdas que proporcionan datos a una fórmula específica. Para usarlo:
1.  Selecciona la celda que contiene la fórmula.
2.  Ve a la pestaña **Fórmulas** en la cinta de opciones.
3.  Haz clic en el botón **Rastrear precedentes**.  Excel mostrará flechas que conectan la celda de la fórmula con las celdas que utiliza para sus cálculos.

### ¿Qué ocurre con las referencias relativas si muevo una celda que contiene una fórmula?
#### Respuesta
Si mueves una celda que contiene una fórmula, las referencias relativas dentro de la fórmula se mantienen iguales, es decir, seguirán apuntando a las mismas celdas a las que apuntaban antes de mover la fórmula, siempre y cuando las celdas referenciadas también se muevan con la fórmula. Si mueves solo la fórmula, las referencias se ajustarán a las nuevas posiciones relativas.

---

# Software Contable ContaPyme - ContaExcel Add In - Repaso de funciones matemáticas
[Ver el video](https://www.youtube.com/watch?v=g7dlQwIK5zk)
[g7dlQwIK5zk]

## Tema principal
Repaso de las funciones matemáticas básicas y la precedencia de operaciones en Excel.

## Resumen general
Este video ofrece un repaso sobre cómo realizar operaciones matemáticas en Excel, cubriendo desde las operaciones fundamentales como suma, resta, multiplicación y división, hasta la potenciación y la raíz cuadrada. Se explica la importancia del uso de paréntesis para agrupar operandos y la precedencia de las operaciones para asegurar que los cálculos se realicen en el orden correcto, evitando resultados inesperados. El video está dirigido tanto a usuarios con experiencia en Excel como a aquellos que necesitan refrescar sus conocimientos.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las operaciones matemáticas fundamentales que se pueden realizar en Excel?
#### Respuesta
Las operaciones matemáticas fundamentales que se pueden realizar en Excel son: suma, resta, multiplicación y división.

### ¿Cómo se realiza la potenciación en Excel?
#### Respuesta
Para realizar la potenciación en Excel, se utiliza el operador "^". Por ejemplo, para elevar 2 al cubo, se escribe la fórmula `=2^3`.

### ¿Cómo se calcula la raíz cuadrada en Excel?
#### Respuesta
Para calcular la raíz cuadrada en Excel, se utiliza la función `RAIZ()`. Por ejemplo, para calcular la raíz cuadrada de 4, se escribe la fórmula `=RAIZ(4)`.

### ¿Por qué es importante usar paréntesis en las fórmulas de Excel?
#### Respuesta
Es importante usar paréntesis para agrupar los operandos y especificar el orden en que se deben realizar las operaciones. Esto evita que Excel interprete la fórmula de manera incorrecta y produzca resultados inesperados.

### ¿Cuál es la precedencia de las operaciones en Excel?
#### Respuesta
La precedencia de las operaciones en Excel es la siguiente:
1.  Paréntesis
2.  Potenciación y raíces
3.  Multiplicación y división
4.  Suma y resta

Si hay operaciones del mismo nivel, se evalúan de izquierda a derecha.

### ¿Qué ocurre si no estoy seguro del resultado de una operación en Excel?
#### Respuesta
Si no estás seguro del resultado de una operación, es recomendable utilizar paréntesis para asegurar que Excel la interprete correctamente, incluso si la operación pudiera considerarse redundante.

### En la fórmula =2*3^2/2-1, ¿cuál es el orden en que Excel realiza las operaciones?
#### Respuesta
Excel realiza las operaciones en el siguiente orden:
1.  Potenciación: 3 al cuadrado (3^2) = 9
2.  Multiplicación: 2 * 9 = 18
3.  División: 18 / 2 = 9
4.  Resta: 9 - 1 = 8

### ¿Qué pasa si tengo una multiplicación y una división en la misma fórmula sin paréntesis?
#### Respuesta
Si tienes una multiplicación y una división en la misma fórmula sin paréntesis, Excel las evalúa de izquierda a derecha, debido a que tienen la misma precedencia.

---

# Software contable ContaPyme - ContaExcel Add In - Repaso de fórmulas en Excel
[Ver el video](https://www.youtube.com/watch?v=ytosRKfc-1M)

## Tema principal
Repaso del uso de fórmulas en Excel con referencia a celdas.

## Resumen general
Este video explica cómo realizar cálculos en Excel utilizando fórmulas que se actualizan automáticamente al cambiar los valores de las celdas referenciadas. En lugar de ingresar valores directamente en la fórmula, se utilizan referencias a celdas que contienen los datos.  El video demuestra cómo crear fórmulas usando referencias a celdas y cómo Excel recalcula automáticamente los resultados cuando los valores de estas celdas cambian. También muestra cómo usar el ratón para crear las referencias a celdas en la fórmula.

## Preguntas Frecuentes (FAQ)

### ¿Cómo se calcula el área de un rectángulo en Excel?
#### Respuesta
Para calcular el área de un rectángulo en Excel, se multiplica la base por la altura. En lugar de ingresar los valores directamente en la fórmula, se utilizan referencias a las celdas que contienen la base y la altura.

### ¿Por qué es útil usar referencias a celdas en las fórmulas de Excel?
#### Respuesta
El uso de referencias a celdas permite que la fórmula se actualice automáticamente cuando cambian los valores en las celdas referenciadas. De esta manera, no es necesario modificar la fórmula cada vez que se cambian los datos.

### ¿Cómo se crea una fórmula en Excel utilizando referencias a celdas?
#### Respuesta
1.  Selecciona la celda donde quieres que aparezca el resultado.
2.  Escribe el signo igual (=).
3.  Haz clic en la primera celda que quieres incluir en la fórmula (por ejemplo, la celda que contiene el valor de la base). Excel insertará la referencia de la celda en la fórmula.
4.  Escribe el operador matemático (por ejemplo, el símbolo de multiplicación *).
5.  Haz clic en la segunda celda que quieres incluir en la fórmula (por ejemplo, la celda que contiene el valor de la altura). Excel insertará la referencia de la celda en la fórmula.
6.  Presiona la tecla Enter para completar la fórmula.

### ¿Qué significa que una celda se llame "C40"?
#### Respuesta
La celda "C40" se refiere a la celda que se encuentra en la columna C y la fila 40 de la hoja de cálculo de Excel.

### ¿Cómo puedo ver las celdas a las que hace referencia una fórmula?
#### Respuesta
1. Selecciona la celda que contiene la fórmula.
2. Presiona la tecla F2. Excel mostrará la fórmula y resaltará las celdas a las que hace referencia con diferentes colores. Cada color corresponde a una celda referenciada en la fórmula.

---

# Software contable ContaPyme - ContaExcel Add In - Reseña histórica de las hojas electrónicas
[Ver el video](https://www.youtube.com/watch?v=7NjwUXftm7I)

## Tema principal
Historia de las hojas electrónicas y la evolución hasta ContaExcel Add-In.

## Resumen general
Este video presenta una reseña histórica de las hojas electrónicas, desde su invención con Visical en 1979 hasta la creación de ContaExcel Add-In. Se explora la evolución de los programas de hojas de cálculo, incluyendo Supercalc, Multiplan, Lotus 123 y Excel, destacando cómo revolucionaron la computación personal y profesional. También se menciona la limitación de las patentes de software en sus inicios y cómo esto afectó a los creadores de Visical. Finalmente, se introduce ContaExcel Add-In como un complemento para Excel que permite la conexión con ContaPyme y Agrowin para la extracción de datos.

## Preguntas Frecuentes (FAQ)

### ¿Quiénes fueron los creadores de la primera hoja de cálculo electrónica?
#### Respuesta
Los creadores de la primera hoja de cálculo electrónica, Visical, fueron Dan Bricklin y Bob Frankston, de la Universidad de Harvard.

### ¿Cómo se llamaba la empresa que comercializó Visical?
#### Respuesta
Inicialmente la empresa se llamaba Software Arts, luego cambió su nombre a Visicorp.

### ¿En qué computadora funcionaba inicialmente Visical?
#### Respuesta
Visical funcionaba en los computadores Apple II.

### ¿Qué problema legal enfrentaron los creadores de Visical?
#### Respuesta
En 1979, no existían patentes de software en Estados Unidos, por lo que solo pudieron obtener un registro de derechos de autor, que protege la forma del software, pero no la idea subyacente.

### ¿Qué implicaciones tuvo la falta de patentes para los creadores de Visical?
#### Respuesta
La falta de patentes significó que, aunque vendieron muchas copias de Visical, pronto surgieron clones mejorados que eventualmente superaron a su producto original.

### ¿Cuándo salió al mercado Lotus 1-2-3 y qué importancia tuvo?
#### Respuesta
Lotus 1-2-3 salió al mercado en 1983 y fue el rey de las hojas de cálculo durante la época del sistema operativo DOS.

### ¿Cuándo lanzó Microsoft Excel para Macintosh y para Windows?
#### Respuesta
Microsoft lanzó Excel para Macintosh en 1985 y Excel para Windows 2 en 1987.

### ¿Cuál era la ventaja de ContaExcel cuando Insoft la lanzó en 2003?
#### Respuesta
La ventaja de ContaExcel era su capacidad para conectarse a las bases de datos de ContaPyme y Agrowin.

### ¿Qué es ContaExcel Add-In?
#### Respuesta
ContaExcel Add-In es un complemento para Microsoft Excel 2007 y 2010 que permite a estas hojas electrónicas conectarse con ContaPyme y Agrowin para extraer información.

---

# Software contable ContaPyme - ContaExcel Add In - Seleccionadores de ContaExcel Add In
[Ver el video](https://www.youtube.com/watch?v=yU4L22fmyaA)

## Tema principal
Uso de los botones de selección en ContaExcel Add-In para terceros, cuentas, inventario y centros de costo.

## Resumen general
Este video explica cómo usar los botones de selección en el Add-In de ContaExcel para seleccionar rápidamente códigos de terceros, cuentas contables, elementos de inventario y centros de costos directamente desde Excel, sin necesidad de cambiar a ContaPyme o Growin. Esto agiliza la digitación de información y evita errores al buscar los códigos manualmente. El Add-In permite seleccionar un único elemento o múltiples elementos de cada categoría.

## Preguntas Frecuentes (FAQ)

### ¿Para qué sirven los botones de selección de terceros, cuentas, inventario y centros de costos en ContaExcel Add-In?
#### Respuesta
Estos botones permiten seleccionar rápidamente códigos de terceros (NIT), cuentas contables, elementos de inventario y centros de costos directamente desde una hoja de Excel, sin necesidad de buscar los códigos en ContaPyme o Growin. Esto agiliza la digitación y reduce errores.

### ¿Cómo puedo seleccionar el código de un tercero usando el Add-In de ContaExcel si no recuerdo su NIT?
#### Respuesta
1.  Haz clic en el botón de **Terceros** dentro del Add-In de ContaExcel.
2.  Se abrirá el catálogo de terceros de ContaPyme.
3.  Busca y selecciona el tercero deseado, ya sea con **doble clic** sobre el registro o seleccionando el registro y haciendo clic en el botón **Seleccionar**.
4.  El código del tercero se insertará automáticamente en la celda de Excel.

### ¿Puedo seleccionar varios terceros a la vez con el Add-In de ContaExcel?
#### Respuesta
Sí, el Add-In de ContaExcel permite seleccionar múltiples terceros simultáneamente.  Después de hacer clic en el botón **Terceros**, puedes seleccionar varios registros del catálogo de terceros y luego hacer clic en el botón **Seleccionar**.  Los códigos de los terceros seleccionados se insertarán en celdas consecutivas.

### ¿Cómo selecciono cuentas contables desde el Add-In de ContaExcel?
#### Respuesta
1.  Asegúrate de estar en la pestaña de **ContaExcel** dentro de Excel.
2.  Haz clic en el botón de **Cuentas**.
3.  Se abrirá el catálogo de cuentas contables de ContaPyme.
4.  Selecciona las cuentas deseadas.
5.  Haz clic en el botón **Seleccionar**.
6.  Los códigos de las cuentas se insertarán automáticamente en las celdas de Excel.

### ¿Cómo puedo seleccionar elementos de inventario usando el Add-In de ContaExcel?
#### Respuesta
1.  Asegúrate de estar en la pestaña de **ContaExcel** dentro de Excel.
2.  Haz clic en el botón de **Elementos de Inventario**.
3.  Se abrirá el catálogo de elementos de inventario de ContaPyme.
4.  Selecciona los elementos deseados.
5.  Haz clic en el botón **Seleccionar**.
6.  Los códigos de los elementos de inventario se insertarán automáticamente en las celdas de Excel.

### ¿Cómo selecciono centros de costos desde el Add-In de ContaExcel?
#### Respuesta
1.  Asegúrate de estar en la pestaña de **ContaExcel** dentro de Excel.
2.  Haz clic en el botón de **Centros de Costos**.
3.  Se abrirá el catálogo de centros de costos de ContaPyme.
4.  Selecciona los centros de costos deseados.
5.  Haz clic en el botón **Seleccionar**.
6.  Los códigos de los centros de costos se insertarán automáticamente en las celdas de Excel.

### ¿Es necesario cambiar entre ContaPyme y Excel para obtener los códigos de terceros, cuentas, inventario o centros de costos?
#### Respuesta
No, con el Add-In de ContaExcel, la selección de códigos de terceros, cuentas, inventario y centros de costos se realiza directamente desde Excel. Los botones de selección en el Add-In permiten acceder a los catálogos de ContaPyme sin salir de Excel.

---

# Software contable ContaPyme - Creación básica y consulta de favoritos financieros
[Ver el video](https://www.youtube.com/watch?v=ydUjJq6V9B4)
ydUjJq6V9B4

## Tema principal
Creación y consulta de favoritos financieros para acceder rápidamente a cuentas específicas en ContaPyme móvil.

## Resumen general
Este video explica cómo crear y consultar favoritos financieros en la aplicación móvil de ContaPyme. Permite a los usuarios agrupar las cuentas que consultan con mayor frecuencia en categorías personalizadas, lo que facilita el acceso a sus saldos y movimientos. El video demuestra el proceso de agregar cuentas a favoritos, crear categorías y consultar la información de estas cuentas de manera rápida y eficiente. Esto optimiza el seguimiento de las finanzas de la empresa.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los favoritos financieros en ContaPyme móvil?
#### Respuesta
Los favoritos financieros son una función que te permite crear accesos directos a las cuentas que consultas con mayor frecuencia. De esta manera, puedes acceder a sus saldos y movimientos rápidamente, sin necesidad de navegar a través del plan de cuentas completo.

### ¿Cómo agrego una cuenta a favoritos en ContaPyme móvil?
#### Respuesta
Para agregar una cuenta a favoritos, sigue estos pasos:
1.  Dentro de ContaPyme móvil, ve a **Estados Financieros**.
2.  Haz clic sobre la cuenta que deseas agregar a favoritos.
3.  Haz clic en el **icono de menú** de la cuenta.
4.  Selecciona la opción **Agregar a favoritos**.
5.  Si es el primer favorito, define el nombre de la categoría en la caja de texto. Si ya tienes una categoría creada, selecciona la categoría deseada.
6.  Haz clic en el botón **Ok** para guardar el favorito.

### ¿Cómo creo una categoría para mis favoritos financieros?
#### Respuesta
Al agregar una cuenta a favoritos por primera vez, el sistema te pedirá que definas el nombre de la categoría en la caja de texto. Simplemente escribe el nombre deseado para la categoría y continúa con el proceso de agregar la cuenta a favoritos.

### ¿Puedo agregar la misma cuenta a varias categorías de favoritos?
#### Respuesta
No se especifica si una cuenta puede pertenecer a varias categorías de favoritos financieros.

### ¿Dónde puedo consultar los favoritos financieros que he creado?
#### Respuesta
Para consultar los favoritos financieros que has creado, sigue estos pasos:
1.  Dirígete al **menú principal** de ContaPyme móvil.
2.  Haz clic en la opción **Favoritos Financieros** dentro del menú **Consultas**.
3.  Se mostrará la categoría que has creado. Haz clic sobre ella.
4.  Aparecerán las cuentas que has asociado a esta categoría.

### ¿Qué puedo hacer con las cuentas que he agregado a favoritos?
#### Respuesta
Una vez que has accedido a una cuenta a través de la sección de favoritos, puedes realizar las mismas acciones que realizarías si accedieras a ella desde la opción de estados financieros, como:
*   Cambiar de mes para ver el saldo actualizado.
*   Ver los documentos que afectaron la cuenta.
*   Ver gráficos del comportamiento de la cuenta.
*   Ver saldos o comparativos.

### ¿Qué tipo de cuentas puedo agregar a favoritos financieros?
#### Respuesta
Puedes agregar cualquier tipo de cuenta a favoritos financieros, bien sean cuentas de ingresos, gastos, costos, o cualquier otra cuenta a la que le hagas seguimiento constante.

### ¿Qué es el botón "avanzado" al crear un favorito financiero?
#### Respuesta
El botón "avanzado" te permite agregar más datos al favorito, como más cuentas, centros de costos o clase de operación. Esta creación avanzada de favoritos se explica en el video "creación de favoritos financieros de múltiples cuentas y filtros".

---

# Software contable ContaPyme - Creación de favoritos financieros de múltiples cuentas y filtros
[Ver el video](https://www.youtube.com/watch?v=5eu2E7fktNQ)
Creación de favoritos financieros de múltiples cuentas y filtros

## Tema principal
Crear favoritos financieros agrupando varias cuentas para consultar sus saldos de forma consolidada, aplicando filtros por clase de operación y centro de costos.

## Resumen general
Este video explica cómo crear favoritos financieros en ContaPyme Móvil para agrupar cuentas contables y facilitar la consulta de saldos consolidados. Se aprende a agregar cuentas a un favorito, definir la categoría del mismo, establecer un orden de visualización y aplicar filtros por clase de operación y centro de costos. El video muestra cómo consultar el saldo agrupado de las cuentas incluidas en el favorito y cómo realizar acciones como consultar movimientos, saldos y comparativos.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los favoritos financieros de múltiples cuentas en ContaPyme?
#### Respuesta
Los favoritos financieros de múltiples cuentas son una funcionalidad que permite agrupar varias cuentas contables para que, al consultar los saldos, estos se muestren agrupados y totalizados como un solo concepto. Esto facilita el seguimiento y monitoreo de cuentas relacionadas.

### ¿Cómo se crea un nuevo favorito financiero en ContaPyme Móvil?
#### Respuesta
Para crear un nuevo favorito financiero en ContaPyme Móvil, sigue estos pasos:

1.  Inicia sesión en ContaPyme Móvil.
2.  Ingresa a la opción **Favoritos Financieros** del menú **Consultas**.
3.  Da clic en el botón **Nuevo Favorito** (esquina superior derecha).
4.  Completa el formulario:
    *   **Nombre:** Ingresa el nombre del favorito (ej: Venta de Impresoras).
    *   **Cuentas a adicionar:** Agrega las cuentas relacionadas. Puedes usar la lupa para buscar la cuenta o ingresar el código directamente. Después de seleccionar la cuenta, da clic en el botón **Más** para agregarla a la lista de cuentas a consultar.
    *   **Categoría:** Define el nombre de la categoría a la que pertenece el favorito (ej: Venta de Impresoras).
    *   **Orden:** Define la posición en la que quieres que aparezca el favorito dentro de la categoría.
    *   **Clase de Operación:** Opcionalmente, define una clase de operación para filtrar el saldo.
    *   **Centro de Costos:** Opcionalmente, agrega centros de costos para filtrar el saldo.  Da clic sobre el icono de la lupa y elige el centro de costos que deseas agregar.  Para agregarlo al listado, da clic en el botón **Más**.
5.  Da clic en el botón **OK** (barra inferior o superior) para guardar los datos.

### ¿Cómo se agregan cuentas a un favorito financiero?
#### Respuesta
Hay dos formas de agregar cuentas a un favorito financiero:

1.  **Usando la lupa:** Da clic en el icono de la lupa en el campo **Cuentas a adicionar**. En el listado que se presenta, busca la cuenta deseada y da clic sobre ella para agregarla al campo.
2.  **Digitando el código:** Si conoces el código de la cuenta, puedes digitarlo directamente en la caja de texto del campo **Cuentas a adicionar**.

Después de seleccionar o digitar la cuenta, da clic en el botón **Más** para agregarla a la lista de cuentas a consultar.

### ¿Para qué sirve el campo "Categoría" al crear un favorito financiero?
#### Respuesta
El campo "Categoría" sirve para definir el nombre de la categoría a la que pertenece el favorito. Este nombre es el que aparece en el listado principal de categorías y actúa como agrupador de cuentas favoritas.

### ¿Cómo se define el orden en que aparece un favorito dentro de una categoría?
#### Respuesta
El orden en que aparece un favorito dentro de una categoría se define en el campo **Orden** al crear el favorito. Este campo permite establecer la posición en la que se mostrará el favorito dentro del listado de la categoría.

### ¿Para qué sirven los campos "Clase de Operación" y "Centro de Costos" al crear un favorito financiero?
#### Respuesta
*   **Clase de Operación:** Permite definir una clase de operación para que se aplique como filtro en la obtención del saldo de las cuentas definidas.
*   **Centro de Costos:** Permite agregar centros de costos para filtrar el saldo de las cuentas por un determinado centro de costos o grupo de centros de costos. Esto es útil para obtener saldos de cuentas por sucursales o distribuidores, siempre y cuando estén creados como centros de costos.

### ¿Qué acciones se pueden realizar sobre un favorito financiero una vez creado?
#### Respuesta
Una vez creado un favorito financiero, se pueden realizar las siguientes acciones:

*   Consultar movimientos
*   Consultar saldos
*   Realizar comparativos
*   Ver los saldos mediante gráficos

---

# Software contable ContaPyme - Ejemplo de consulta de un reporte de Cartera
[Ver el video](https://www.youtube.com/watch?v=t-2HYrwIkec)
[t-2HYrwIkec]

## Tema principal
Generación y consulta de un reporte de cartera en ContaPyme móvil.

## Resumen general
Este video explica cómo generar y consultar un reporte de cartera en la aplicación móvil de ContaPyme. Muestra cómo acceder a los reportes de cartera, seleccionar el reporte de detalle de cuentas por cobrar, filtrar la información por fecha, tercero y cuenta, y cómo utilizar opciones adicionales para personalizar el reporte. También enseña cómo enviar el reporte por correo electrónico y cómo se puede consultar la información de todos los terceros o de uno específico, así como ordenar los resultados y ver solo las cuentas vencidas.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a los reportes de cartera en ContaPyme móvil?
#### Respuesta
Para acceder a los reportes de cartera, sigue estos pasos:
1.  Inicia sesión en ContaPyme móvil.
2.  Da clic en la opción **cartera** del menú **reportes**.
3.  Elige nuevamente la opción **cartera**.

### ¿Qué tipo de reporte de cartera se muestra como ejemplo en el video?
#### Respuesta
En el video se muestra el reporte de **detalle de cuentas por cobrar**.

### ¿Qué datos debo ingresar para generar el reporte de detalle de cuentas por cobrar?
#### Respuesta
El sistema solicita los siguientes datos:
*   **Fecha de referencia:** La fecha a la cual deseas conocer las cuentas por cobrar.
*   **Tercero (código del tercero):** El código del tercero del cual quieres consultar sus cuentas por cobrar (opcional, puedes dejarlo vacío para ver todos).
*   **Cuenta:** Una cuenta específica si deseas obtener las cuentas por cobrar asociadas a ella (opcional).

### ¿Cómo filtro el reporte para ver solo las cuentas vencidas?
#### Respuesta
Para filtrar el reporte y ver solo las cuentas vencidas, sigue estos pasos:
1.  Ingresa a la pantalla de generación del reporte de detalle de cuentas por cobrar.
2.  Da clic en el botón **más opciones**.
3.  Activa la opción **ver solo cuentas vencidas**.
4.  Da clic sobre el botón **ver reporte**.

### ¿Cómo envío el reporte de cartera por correo electrónico?
#### Respuesta
Una vez generado el reporte, da clic en la opción **enviar por email** que se encuentra en la esquina superior derecha de la pantalla.

### ¿Cómo puedo obtener las cuentas por cobrar de todos los terceros en el reporte?
#### Respuesta
Para obtener las cuentas por cobrar de todos los terceros, deja vacío el campo **tercero (código del tercero)** al generar el reporte.

### ¿Cómo puedo ordenar el reporte por el nombre del tercero?
#### Respuesta
Al generar el reporte, elige la opción para ordenar las cuentas por cobrar por el nombre del tercero.

### ¿Los reportes de ContaPyme móvil son iguales a los de la versión de escritorio?
#### Respuesta
Sí, los reportes generados en ContaPyme móvil son los mismos que los generados en la versión de escritorio de ContaPyme. Esto significa que si generas el reporte de detalle de cuentas por cobrar en ambas plataformas, encontrarás los mismos datos.

---

# Software contable ContaPyme - Ejemplo de consulta de un reporte de Ventas
[Ver el video](https://www.youtube.com/watch?v=D8hAPJJFcPY)

## Tema principal
Generación y consulta de un reporte de ventas por factura en ContaPyme.

## Resumen general
Este video explica cómo generar un reporte de ventas por factura en ContaPyme. Muestra la ruta para acceder al menú de reportes de ventas, cómo seleccionar el reporte de ventas por factura, y cómo definir parámetros como el rango de fechas, cliente o vendedor para filtrar la información. También explica cómo visualizar y enviar el reporte generado.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la sección de reportes de ventas en ContaPyme móvil?
#### Respuesta
Debes iniciar sesión en ContaPyme móvil y luego dar clic en la opción "inventarios" dentro del menú "reportes".

### ¿Qué opciones de reportes de ventas puedo encontrar en ContaPyme?
#### Respuesta
Dentro del menú de reportes de ventas, puedes encontrar diferentes opciones. Para este caso, se muestra el reporte de "ventas y facturación".

### ¿Qué información muestra el reporte de ventas por factura?
#### Respuesta
El reporte de ventas por factura muestra las facturas realizadas en un periodo, incluyendo información como el cliente, el producto, la cantidad, el valor unitario y el valor total.

### ¿Qué parámetros puedo definir para generar un reporte de ventas por factura?
#### Respuesta
Puedes definir los siguientes parámetros:
- Fecha inicial
- Fecha final
- Cliente (opcional, para un cliente específico)
- Vendedor (opcional, para un vendedor específico)

### ¿Dónde encuentro las opciones adicionales para filtrar el reporte de ventas?
#### Respuesta
Para encontrar las opciones adicionales, da clic en el botón "más opciones" en el formulario de generación del reporte. Allí encontrarás opciones para filtrar por tipo de documento o grupos de inventario.

### ¿Cómo puedo filtrar el reporte de ventas por un vendedor específico?
#### Respuesta
Sigue estos pasos:
1. Accede al reporte de "Ventas y Facturación" dentro de los reportes de "Inventarios".
2. Da clic en el botón "más opciones".
3. Selecciona el vendedor deseado en la opción de filtro de "Vendedor".
4. Da clic en el botón "ver reporte".

### ¿Cómo puedo visualizar mejor la información del reporte?
#### Respuesta
Puedes hacer zoom en el reporte para visualizar mejor la información.

### ¿Cómo puedo enviar el reporte de ventas por correo electrónico?
#### Respuesta
En la esquina superior derecha del reporte, encontrarás la opción para enviarlo por email.

---

# Software contable ContaPyme - Explicación de la arquitectura de la aplicación Móvil
[Ver el video](https://www.youtube.com/watch?v=Xv4KGaGHKYo)
Xv4KGaGHKYo

## Tema principal
Arquitectura de la aplicación móvil ContaPyme.

## Resumen general
Este video explica la arquitectura de la aplicación móvil ContaPyme. Describe cómo la aplicación móvil se conecta a la base de datos central de ContaPyme a través de un agente de servicios web y el protocolo REST.  También menciona el sistema de clientes interno de Insof y la interfaz amigable de la aplicación móvil para dispositivos como smartphones y tablets. El video busca dar una visión general de cómo la aplicación móvil se integra con la versión de escritorio de ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Con qué estándares está desarrollada la aplicación ContaPyme para dispositivos móviles?
#### Respuesta
La aplicación ContaPyme para dispositivos móviles está desarrollada bajo los más altos estándares de calidad y utilizando las mejores y más revolucionarias tecnologías tanto para el desarrollo de aplicaciones de escritorio como para aplicaciones web.

### ¿Qué funcionalidad aprovecha la aplicación ContaPyme móvil?
#### Respuesta
La aplicación ContaPyme móvil aprovecha y potencializa toda la funcionalidad de ContaPyme de escritorio.

### ¿Dónde se instala el agente de servicios web de ContaPyme?
#### Respuesta
El agente de servicios web se instala en el mismo equipo donde se encuentra instalado ContaPyme, ya sea el servidor o el cliente de la aplicación.

### ¿Cuál es la función del agente de servicios web?
#### Respuesta
El agente de servicios web permite la conexión desde dispositivos móviles a la base de datos central y proporciona todas las herramientas necesarias para poder trabajar vía internet.

### ¿Qué tipo de peticiones expone el agente de servicios web?
#### Respuesta
El agente de servicios web expone un sinnúmero de peticiones que permiten a la aplicación ContaPyme Móvil y a aplicaciones de terceros acceder a toda la información que se encuentra centralizada en el servidor de datos de ContaPyme.

### ¿Qué protocolo se utiliza para las peticiones realizadas por el agente de servicios web?
#### Respuesta
Las peticiones se realizan mediante el protocolo REST.

### ¿Cuál es la función del sistema de clientes interno de Insof en la arquitectura de la aplicación móvil?
#### Respuesta
El sistema de clientes interno de Insof se utiliza para realizar labores de consulta y de redireccionamiento de los usuarios que se conectan desde su dispositivo móvil.

### ¿Desde qué tipo de dispositivos puede el usuario interactuar con la aplicación ContaPyme Móvil?
#### Respuesta
El usuario puede interactuar con la aplicación desde un smartphone, una tablet o un computador.

---

# Software contable ContaPyme - Ingreso a ContaPyme móvil
[Ver el video](https://www.youtube.com/watch?v=Xzc5GWB85h0)
Xzc5GWB85h0

## Tema principal
Acceso a la aplicación móvil de ContaPyme.

## Resumen general
Este video explica cómo acceder a la aplicación móvil de ContaPyme para gestionar los datos del servidor central.  Se muestra el formulario de inicio de sesión y se describen los campos que se deben completar: correo electrónico, agente y contraseña.  Además, explica cómo guardar los datos de inicio de sesión para futuros accesos y cómo se presenta el menú de acciones según la configuración del perfil del usuario.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a ContaPyme móvil?
#### Respuesta
Puedes acceder a ContaPyme móvil de dos maneras:
- Dando clic sobre el icono de la aplicación si la tienes instalada en tu dispositivo.
- Accediendo a través del navegador web.

### ¿Qué información necesito para iniciar sesión en ContaPyme móvil?
#### Respuesta
Necesitas los siguientes datos:
1.  El correo electrónico con el cual estás registrado en ContaPyme.
2.  El agente al cual te vas a conectar.
3.  La contraseña de acceso al agente (la misma que usas en ContaPyme de escritorio).

### ¿Qué debo hacer si no veo el agente al que me quiero conectar en la lista de agentes disponibles?
#### Respuesta
Asegúrate de que el agente esté iniciado y en línea, y que estés creado en ese agente con el mismo correo electrónico que usaste al registrarte.

### ¿Cómo guardo mis datos de inicio de sesión en ContaPyme móvil?
#### Respuesta
Marca la opción "registrar usuario en este equipo" en el formulario de inicio de sesión antes de dar clic en el botón "conectar". Esto guardará tus datos para que no tengas que volver a digitarlos en los próximos ingresos.

### ¿Qué hago si olvidé mi contraseña para acceder a ContaPyme móvil?
#### Respuesta
Debes usar la misma contraseña que utilizas para acceder a ContaPyme de escritorio. Si la olvidaste, debes recuperarla desde la versión de escritorio.

### ¿Qué ocurre después de iniciar sesión correctamente en ContaPyme móvil?
#### Respuesta
Después de iniciar sesión satisfactoriamente, se presenta el menú con las acciones que puedes realizar. Estas acciones se habilitarán de acuerdo a la configuración del perfil que tienes asignado.

### ¿Qué debo hacer para poder usar ContaPyme móvil?
#### Respuesta
Para poder acceder desde ContaPyme móvil, debes tener habilitado tu usuario y tener una licencia móvil asignada.

### ¿Dónde puedo aprender más sobre cómo configurar los usuarios móviles en ContaPyme?
#### Respuesta
Puedes consultar el video "Configuración de los usuarios móviles".

### ¿Dónde puedo encontrar más información sobre las acciones que puedo realizar en ContaPyme móvil?
#### Respuesta
Puedes consultar el video correspondiente a cada una de las acciones disponibles en el menú principal.

---

# Software contable ContaPyme - Login de ContaExcel Add In a ContaPyme
[Ver el video](https://www.youtube.com/watch?v=T1YFEZ8HE0U)
Login de ContaXeladdin a ContaPyme

## Tema principal
Conexión de ContaXeladdin a la base de datos de ContaPyme desde Excel.

## Resumen general
Este video explica cómo conectar el complemento ContaXeladdin de Excel con la base de datos de ContaPyme. Muestra cómo acceder a la pestaña ContaXel en Excel después de la instalación del complemento, configurar la conexión al servidor de datos de ContaPyme (ya sea monousuario o externo), ingresar las credenciales de usuario y seleccionar el área de trabajo y la licencia. Finalmente, se explica cómo la conexión exitosa habilita nuevas opciones en la pestaña ContaXel y crea una nueva pestaña llamada ContaPyme, permitiendo el acceso a los catálogos de ContaPyme directamente desde Excel.

## Preguntas Frecuentes (FAQ)

### ¿Qué es ContaXeladdin y cómo se instala?
#### Respuesta
ContaXeladdin es un complemento de Excel que permite conectar con la base de datos de ContaPyme. El video no explica el proceso de instalación, pero asume que ya está instalado.

### ¿Cómo sé que ContaXeladdin está instalado en Excel?
#### Respuesta
Una vez instalado ContaXeladdin, al abrir Excel, verás una nueva pestaña en la barra de menú llamada "ContaXel".

### ¿Dónde encuentro la opción para conectar ContaXeladdin a ContaPyme?
#### Respuesta
Dentro de Excel, haz clic en la pestaña "ContaXel". Allí encontrarás el botón "Conectar a ContaPyme".

### ¿Qué información necesito para configurar la conexión a ContaPyme?
#### Respuesta
Necesitarás la siguiente información:
- **Servidor de Datos:** La dirección del servidor al que te vas a conectar (puede ser monousuario o un servidor externo).
- **Usuario:** Tu nombre de usuario para acceder a ContaPyme.
- **Contraseña:** Tu contraseña para acceder a ContaPyme.
- **Área de Trabajo:** El área de trabajo a la que te quieres conectar dentro de ContaPyme.
- **Licencia:** La licencia que vas a utilizar.

### ¿Cómo cambio el Servidor de Datos al que me voy a conectar?
#### Respuesta
1. En la ventana de conexión, haz clic en el icono del computador que se encuentra al lado del campo "Servidor de Datos".
2. En la nueva ventana, digita el nombre del servidor de datos, la dirección IP o la dirección URL para acceder a él.
3. Elige la opción deseada (en el ejemplo, se elige "Serverink").
4. Haz clic en el botón "Conectar".

### ¿Qué ocurre después de hacer clic en "Conectar" en la ventana de conexión?
#### Respuesta
Si la conexión es exitosa, el contenido de la pestaña "ContaXel" cambiará. Se añadirán nuevas opciones a la barra de herramientas, permitiéndote trabajar con ContaXel y acceder a la información de la base de datos de ContaPyme. Además, se creará una nueva pestaña llamada "ContaPyme".

### ¿Para qué sirve la pestaña "ContaPyme" que se crea después de la conexión?
#### Respuesta
Desde la pestaña "ContaPyme", podrás acceder a los catálogos de ContaPyme y trabajar sobre ellos como si estuvieras directamente en el sistema.

---

# Software contable ContaPyme - Manejo del catálogo de elementos de inventario
[Ver el video](https://www.youtube.com/watch?v=bplAuaXBwOc)

## Tema principal
Acceso y manejo del catálogo de elementos de inventario en ContaPyme móvil.

## Resumen general
Este video explica cómo acceder y utilizar el catálogo de elementos de inventario en la aplicación móvil de ContaPyme. Muestra cómo filtrar, buscar, crear y modificar elementos del inventario, así como consultar existencias, disponibilidad y visualizar imágenes de los productos. También se explican las opciones de consolidación, recodificación y eliminación de elementos, y se menciona la importancia de configurar los perfiles de seguridad para los usuarios móviles. En resumen, el video proporciona una guía completa para gestionar el inventario desde dispositivos móviles utilizando ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo al catálogo de elementos de inventario en ContaPyme móvil?
#### Respuesta
Para acceder al catálogo de elementos de inventario en ContaPyme móvil, sigue estos pasos:
1.  Inicia sesión en la aplicación ContaPyme móvil.
2.  En el menú **Catálogos**, da clic en la opción **Elementos de Inventario**.

### ¿Qué tipo de elementos puedo ver en el catálogo de inventario en ContaPyme móvil?
#### Respuesta
Puedes acceder a la información de productos, servicios, insumos y materiales de la empresa que estén marcados como visibles en Internet en el programa Agente.

### ¿Cómo puedo filtrar los elementos del inventario en ContaPyme móvil?
#### Respuesta
Puedes filtrar los elementos del inventario de las siguientes maneras:
*   **Por tipo de elemento:** Por ejemplo, puedes filtrar para ver solo los productos.
*   **Por nombre o identificación:** Ingresa el nombre o la identificación en la barra de búsqueda y da clic en el botón **Buscar**.
*   **Por letra:** Ingresa una letra para mostrar todos los elementos que comiencen con esa letra.
*   **Filtros avanzados:** Da clic en el botón de filtro para buscar elementos que cumplan con parámetros específicos, como la marca.

### ¿Cómo realizo una búsqueda avanzada de elementos de inventario?
#### Respuesta
Sigue estos pasos para realizar una búsqueda avanzada:
1.  Da clic en el botón de **Filtro**.
2.  Define los parámetros de búsqueda deseados (por ejemplo, la marca del producto).
3.  Da clic en el botón **Buscar**.

### ¿Cómo creo un nuevo elemento de inventario en ContaPyme móvil?
#### Respuesta
Para crear un nuevo elemento de inventario:
1.  En el listado principal de elementos, da clic en el botón **Crear** (esquina superior derecha).
2.  Ingresa la identificación del nuevo producto.
3.  Da clic en el botón **Ok**.
4.  Completa la información en las pestañas de los formularios que se muestran, tal como lo harías en la versión de escritorio de ContaPyme.

### ¿Cómo puedo ver la información detallada de un elemento de inventario?
#### Respuesta
Da clic sobre el elemento en el listado para ver su información detallada a manera de ficha, incluyendo la foto del producto si está disponible.

### ¿Qué opciones tengo disponibles al ver la información detallada de un elemento de inventario?
#### Respuesta
Cuando ves la información detallada de un elemento, tienes las siguientes opciones:
*   **Existencias:** Consulta la cantidad existente del producto en las diferentes bodegas.
*   **Disponibilidad:** Permite conocer si un producto estará o no disponible a una fecha determinada.
*   **Galería de imágenes:** Visualiza las imágenes asociadas al producto.
*   **Modificar:** Editar la información del producto.

### ¿Cómo modifico la información de un elemento de inventario?
#### Respuesta
Sigue estos pasos:
1.  Da clic sobre el elemento que deseas modificar en el listado.
2.  Da clic en el botón **Modificar**.
3.  Selecciona la pestaña con la información que deseas cambiar.
4.  Realiza los cambios necesarios.
5.  Da clic en el botón **Atrás** para guardar los cambios localmente y volver al listado de pestañas.
6.  Da clic en el botón **Ok** (esquina superior derecha) para guardar los datos en la base de datos.

### ¿Qué significan los colores en los campos de los formularios de edición de la información del elemento?
#### Respuesta
Los colores en los campos de los formularios tienen el siguiente significado:
*   **Blanco:** Campos obligatorios.
*   **Verde:** Campos opcionales.
*   **Gris:** Campos de solo lectura.

### ¿Qué función tiene el botón "Atrás" en los formularios de edición?
#### Respuesta
El botón **Atrás** almacena de forma local los datos que hayas diligenciado en el formulario.

### ¿Qué función tiene el botón "Cancelar" en los formularios de edición?
#### Respuesta
El botón **Cancelar** descarta los cambios que hayas realizado.

### ¿Qué acciones puedo realizar desde el listado de pestañas al modificar un elemento?
#### Respuesta
Desde el listado de pestañas, puedes realizar las siguientes acciones:
*   **Consolidar elemento:** Fusiona la información de dos elementos en uno solo.
*   **Recodificar elemento:** Asigna un nuevo código al elemento.
*   **Eliminar elemento:** Elimina el elemento de la base de datos.
*   **Ok:** Guarda los cambios realizados en el elemento.
*   **Cancelar:** Cancela la edición del elemento.

### ¿Cómo puedo consolidar dos elementos de inventario?
#### Respuesta
Da clic en la acción **Consolidar elemento**. Esta opción fusiona la información de dos elementos, útil cuando el mismo producto existe dos veces.

### ¿Cómo puedo recodificar un elemento de inventario?
#### Respuesta
Da clic en la acción **Recodificar elemento**. Esto te permite asignar un nuevo código al elemento, reemplazando el código anterior en todos los registros donde aparezca.

### ¿Cómo puedo eliminar un elemento de inventario?
#### Respuesta
Da clic en la acción **Eliminar elemento**. Esto elimina el elemento de la base de datos. Ten cuidado al usar esta opción.

### ¿Puedo restringir el acceso a las acciones del catálogo de elementos de inventario para ciertos usuarios?
#### Respuesta
Sí, puedes restringir o habilitar las acciones del catálogo de elementos de inventario para usuarios específicos configurando los perfiles de seguridad para clientes móviles.

---

# Software contable ContaPyme - Manejo del catálogo de Plan de Cuentas
[Ver el video](https://www.youtube.com/watch?v=VKqPGrBuB_o)
[VKqPGrBuB_o]

## Tema principal
Manejo del catálogo del plan de cuentas en ContaPyme móvil.

## Resumen general
Este video explica cómo acceder, visualizar y modificar el plan de cuentas dentro de la aplicación móvil de ContaPyme. Se muestra cómo navegar por las cuentas de diferentes niveles, visualizar la información detallada de cada cuenta, editar sus datos y entender los campos obligatorios, opcionales y de solo lectura. También se explican las funciones de consolidar, recodificar y eliminar cuentas, así como la importancia de los perfiles de seguridad para controlar el acceso a estas funciones.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo al catálogo del plan de cuentas en ContaPyme móvil?
#### Respuesta
Para acceder al catálogo del plan de cuentas, debes:
1.  Iniciar sesión en ContaPyme móvil.
2.  Ir al menú **Catálogos**.
3.  Seleccionar la opción **Plan de Cuentas**.

### ¿Cómo puedo ver las cuentas hijas de una cuenta en el plan de cuentas?
#### Respuesta
En la página principal del Plan de Cuentas, cada cuenta de primer nivel muestra un icono de punta de flecha al final de su renglón. Al dar clic sobre este icono, se despliegan las cuentas hijas de la cuenta seleccionada. Puedes repetir este proceso para navegar a través de los diferentes niveles del plan de cuentas.

### ¿Cómo visualizo la información detallada de una cuenta?
#### Respuesta
Para ver la información detallada de una cuenta, simplemente da clic sobre el nombre de la cuenta en el catálogo. El sistema mostrará la información de la cuenta a manera de ficha.

### ¿Cómo modifico la información de una cuenta en ContaPyme móvil?
#### Respuesta
Para modificar la información de una cuenta, sigue estos pasos:

1.  Visualiza la información de la cuenta dando clic en su nombre.
2.  Da clic en el botón **Modificar**. Este botón se encuentra en la esquina superior derecha o en la esquina inferior derecha.
3.  Se mostrará un formulario donde podrás editar los datos de la cuenta. Los campos blancos son obligatorios, los verdes son opcionales y los grises son de solo lectura.
4.  Una vez que hayas realizado los cambios, da clic en el botón **OK** (esquina superior derecha) para guardar los cambios. Para descartar los cambios, da clic en el botón **Cancelar**.

### ¿Qué significan los colores en el formulario de edición de cuentas?
#### Respuesta
Los colores en el formulario de edición de cuentas tienen el siguiente significado:
*   **Blanco:** Campos obligatorios.
*   **Verde:** Campos opcionales.
*   **Gris:** Campos de solo lectura.

### ¿Qué hace la opción "Consolidar Cuenta"?
#### Respuesta
La opción **Consolidar Cuenta** permite fusionar la información de dos cuentas en un solo registro. Esta función trabaja de la misma manera que en la versión de escritorio de ContaPyme.

### ¿Para qué sirve la opción "Recodificar Cuenta"?
#### Respuesta
La opción **Recodificar Cuenta** permite asignar un nuevo código a una cuenta. Al utilizar esta función, el sistema reemplazará el código anterior de la cuenta por el nuevo código en todos los registros donde aparezca.

### ¿Cómo puedo eliminar una cuenta en ContaPyme móvil?
#### Respuesta
Para eliminar una cuenta, debes dar clic en la opción **Eliminar Cuenta**, ubicada en la parte inferior de la página de información de la cuenta. Sin embargo, el sistema verifica si es posible realizar la eliminación antes de proceder. Si la cuenta está asociada a operaciones ya procesadas, no se podrá eliminar.

### ¿Puedo restringir el acceso a las funciones del catálogo del plan de cuentas para ciertos usuarios?
#### Respuesta
Sí, todas las acciones que se pueden realizar en el catálogo del plan de cuentas pueden ser restringidas o habilitadas para un determinado usuario o grupo de usuarios. Esto se hace configurando los perfiles de seguridad para clientes móviles. Para más información sobre este tema, consulta el video Configuración de los perfiles de seguridad para clientes móviles.

---

# Software contable ContaPyme - Manejo del catálogo de terceros en ContaPyme móvil
[Ver el video](https://www.youtube.com/watch?v=bMxS1bpKsrg)
Manejo del catálogo de terceros en ContaPyme móvil

## Tema principal
Gestionar la información de terceros (clientes, proveedores, etc.) en ContaPyme móvil.

## Resumen general
Este video explica cómo acceder y gestionar el catálogo de terceros en la aplicación móvil de ContaPyme. Se aprende a buscar, filtrar, crear, modificar y eliminar terceros, así como a consultar información relacionada con ellos. También se describen las opciones de llamadas, correo electrónico y consolidación de terceros, junto con la importancia de los perfiles de seguridad para controlar el acceso a estas funciones.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo al catálogo de terceros en ContaPyme móvil?
#### Respuesta
Para acceder al catálogo de terceros en ContaPyme móvil:
1.  Inicia sesión en ContaPyme móvil.
2.  En el menú "Catálogos", da clic en la opción "Terceros".
3.  Luego selecciona el tipo de tercero al que deseas acceder, por ejemplo, "Clientes".

### ¿Cómo puedo buscar un tercero específico en el catálogo?
#### Respuesta
Puedes buscar un tercero por nombre o identificación:
1.  En el listado principal de terceros, utiliza la barra de búsqueda.
2.  Ingresa el nombre o identificación del tercero.
3.  Da clic en el botón "Buscar".
4.  Para cerrar el filtro y ver todos los terceros nuevamente, da clic en el icono de la "X".

### ¿Cómo puedo filtrar el listado de terceros por letra?
#### Respuesta
Puedes buscar terceros que comiencen con una letra específica:
1.  En el listado principal de terceros, selecciona la letra por la cual deseas filtrar.
2.  El sistema mostrará los terceros cuyos nombres comienzan con la letra seleccionada.

### ¿Cómo puedo realizar filtros avanzados en el catálogo de terceros?
#### Respuesta
Puedes realizar filtros avanzados para buscar terceros que cumplan con criterios específicos:
1.  En el listado principal de terceros, da clic en el botón "Filtro".
2.  Define los parámetros del filtro, por ejemplo, la ciudad.
3.  Da clic en el botón "Buscar".
4.  El sistema mostrará los terceros que cumplen con los parámetros del filtro.

### ¿Cómo creo un nuevo tercero en ContaPyme móvil?
#### Respuesta
Para crear un nuevo tercero:
1.  En el listado principal de terceros, da clic en el botón "Crear" (esquina superior derecha).
2.  Ingresa la identificación del nuevo tercero.
3.  Da clic en el botón "Ok".
4.  Completa los formularios con el resto de la información del tercero.
    *   Recuerda que los campos en blanco son obligatorios, los campos en verde son opcionales y los campos en gris son de solo lectura.

### ¿Cómo visualizo la información detallada de un tercero?
#### Respuesta
Para visualizar la información de un tercero:
1.  En el listado principal de terceros, da clic sobre el tercero que deseas ver.
2.  Se mostrará una ficha con la información del tercero, incluyendo opciones como "Modificar", "Información financiera", "Operaciones", "Llamar" y "Enviar email".

### ¿Qué opciones tengo disponibles al visualizar la información de un tercero?
#### Respuesta
Al visualizar la información de un tercero, tienes las siguientes opciones:
*   **Modificar:** Permite actualizar los datos del tercero.
*   **Información financiera:** Permite consultar la información financiera relacionada con el tercero (requiere ver el video "Consulta de información financiera por tercero").
*   **Operaciones:** Permite consultar las operaciones en las que está relacionado el tercero (requiere ver el video "Consulta de las operaciones de un tercero").
*   **Llamar:** Permite llamar al tercero (disponible en dispositivos móviles).
*   **Enviar email:** Permite enviar un correo electrónico al tercero.

### ¿Cómo modifico la información de un tercero?
#### Respuesta
Para modificar la información de un tercero:
1.  Visualiza la información del tercero.
2.  Da clic en el botón "Modificar".
3.  Se cargarán las pestañas con los formularios para editar los datos.
4.  Realiza los cambios necesarios.
5.  Da clic en el botón "Ok" (esquina superior derecha) para guardar los cambios en la base de datos.

### ¿Qué debo tener en cuenta al editar la información de un tercero?
#### Respuesta
Al editar la información de un tercero, ten en cuenta:
*   Los campos en blanco son obligatorios, los campos en verde son opcionales y los campos en gris son de solo lectura.
*   El botón "Atrás" guarda los datos localmente en el formulario, mientras que el botón "Cancelar" descarta los cambios.
*   Para guardar los cambios en la base de datos, da clic en el botón "Ok" (esquina superior derecha).
*   Para cancelar la edición, da clic en el botón "Cancelar" de la página de pestañas.

### ¿Qué significa "Consolidar tercero" y cuándo debo usar esta opción?
#### Respuesta
"Consolidar tercero" permite fusionar la información de dos terceros en un solo registro. Utiliza esta opción cuando el mismo tercero existe dos veces en la base de datos.

### ¿Qué significa "Recodificar tercero" y cómo funciona?
#### Respuesta
"Recodificar tercero" permite asignar un nuevo código a un tercero. El nuevo código reemplazará el código anterior en todos los registros donde aparezca el tercero.

### ¿Cómo elimino un tercero en ContaPyme móvil?
#### Respuesta
Para eliminar un tercero:
1.  Visualiza la información del tercero.
2.  Da clic en "Modificar".
3.  Da clic en la opción "Eliminar tercero".

El sistema verificará si es posible eliminar el tercero. Si el tercero está asociado a operaciones ya procesadas, no se podrá eliminar.

### ¿Puedo restringir el acceso a las funciones del catálogo de terceros para ciertos usuarios?
#### Respuesta
Sí, las acciones que se pueden realizar en el catálogo de terceros pueden ser restringidas o habilitadas para usuarios o grupos de usuarios específicos. Esto se configura mediante los perfiles de seguridad para clientes móviles. Consulta el video de configuración de los perfiles de seguridad para clientes móviles para más información.

---

# Software contable ContaPyme - Obtención de reportes desde ContaPyme móvil
[Ver el video](https://www.youtube.com/watch?v=Hj2hxzbvwAo)
Obtención de reportes desde ContaPyme Móvil

## Tema principal
Generación y consulta de reportes desde la aplicación móvil ContaPyme.

## Resumen general
Este video explica cómo generar y consultar diversos reportes desde la aplicación móvil de ContaPyme, permitiendo a los usuarios acceder a información financiera y de inventario en tiempo real desde sus dispositivos móviles. Se muestra cómo navegar por los menús, seleccionar reportes, definir parámetros de generación y enviar los reportes por correo electrónico. El video detalla el proceso para generar un balance general y un informe de saldos de inventario como ejemplos.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipo de reportes puedo generar desde ContaPyme Móvil?
#### Respuesta
Puedes generar más de cien reportes diferentes desde ContaPyme Móvil, incluyendo reportes de balance general, estado de resultados, informes de cartera e informes de ventas, entre otros.

### ¿Dónde encuentro la opción para generar reportes en ContaPyme Móvil?
#### Respuesta
Una vez que inicias sesión en ContaPyme Móvil, en el menú principal encontrarás un submenú llamado "Reportes".

### ¿Cómo navego para encontrar un reporte específico?
#### Respuesta
Dentro del submenú "Reportes", verás un listado de módulos del sistema. Al ingresar a cada módulo, encontrarás los reportes disponibles para ese módulo. Por ejemplo, en el módulo de "Contabilidad" encontrarás los reportes contables.

### ¿Cómo genero un reporte de Balance General en ContaPyme Móvil?
#### Respuesta
Para generar un reporte de Balance General, sigue estos pasos:
1. Ve al menú principal y selecciona **Reportes**.
2. Ingresa al módulo de **Contabilidad**.
3. Selecciona **Estados Financieros Básicos**.
4. Elige la opción **Balance General**.
5. Selecciona la presentación deseada, por ejemplo, **Balance General Saldos Fin Año**.
6. Define los parámetros para la generación del reporte, como la fecha final, filtro y nivel de detalle.
7. Opcionalmente, puedes dar clic en el botón **Más opciones** para configurar opciones adicionales como espacio para firmas o incluir resumen financiero.
8. Da clic en el botón **Ver Reporte**.

### ¿Qué parámetros debo definir para generar un reporte en ContaPyme Móvil?
#### Respuesta
Los parámetros varían según el reporte, pero generalmente incluyen:
*   **Fecha final:** La fecha hasta la cual se desea obtener el reporte.
*   **Filtro:** Condiciones adicionales para la generación del reporte (puedes usar el asistente de filtros de ContaPyme de escritorio).
*   **Nivel de detalle:** El máximo nivel de desagregación de las cuentas.
*   **Más opciones:** Opciones adicionales como espacio para firmas, incluir resumen financiero, entre otros.

### ¿Cómo envío un reporte por correo electrónico desde ContaPyme Móvil?
#### Respuesta
Una vez que el reporte se ha generado, da clic en la opción **Enviar por Email**. Completa los datos solicitados en el formulario y da clic en el botón **Enviar**.

### ¿Cómo genero un informe de saldos de inventario en ContaPyme Móvil?
#### Respuesta
Para generar un informe de saldos de inventario, sigue estos pasos:
1. Ve al menú principal y selecciona **Reportes**.
2. Ingresa al módulo de **Inventarios**.
3. Selecciona la opción **Inventarios**.
4. Elige el informe de **Saldos de Inventario**.
5. Define la **Fecha de Referencia**.
6. Elige la **Bodega**.
7. Opcionalmente, puedes definir otras opciones dando clic en el botón **Más Opciones**.
8. Da clic en el botón **Ver Reporte**.

### ¿Puedo personalizar los reportes generados en ContaPyme Móvil?
#### Respuesta
Sí, puedes personalizar los reportes definiendo diferentes parámetros como la fecha, filtros, nivel de detalle, e incluso opciones adicionales como incluir espacio para firmas.

---

# Software contable ContaPyme - Qué es ContaExcel Add In
[Ver el video](https://www.youtube.com/watch?v=jNe8cW0MUYw)
jNe8cW0MUYw

## Tema principal
Descripción general de ContaExcel Add In, un complemento para Microsoft Excel que se integra con ContaPyme.

## Resumen general
Este video explica qué es ContaExcel Add In, un complemento para Microsoft Excel que permite acceder y trabajar con la información almacenada en ContaPyme directamente desde Excel.  A través de más de 200 funciones personalizadas, los usuarios pueden crear informes, indicadores, gráficos y tablas dinámicas, aprovechando las funcionalidades de Excel y manteniendo la seguridad de los datos de ContaPyme. También se puede gestionar información de terceros, cuentas, inventario y centros de costos, incluso crear, consultar, modificar y eliminar registros.

## Preguntas Frecuentes (FAQ)

### ¿Qué es ContaExcel Add In?
#### Respuesta
ContaExcel Add In es un complemento para Microsoft Excel que permite acceder a la información almacenada en ContaPyme.  A través de más de 200 funciones personalizadas, se pueden crear informes e indicadores a la medida, realizar gráficos y tablas dinámicas, entre otras funcionalidades.

### ¿Cuántas funciones personalizadas ofrece ContaExcel Add In?
#### Respuesta
ContaExcel Add In ofrece más de 200 funciones personalizadas.

### ¿Qué tipo de información de ContaPyme puedo acceder desde Excel con ContaExcel Add In?
#### Respuesta
Se puede acceder a información de los módulos de contabilidad, cartera y proveedores, activos fijos, inventarios, centros de costos, actividades y labores. También se pueden manejar variables de entorno como la fecha de trabajo, el nombre del área de trabajo activa y el nombre de la empresa.

### ¿Qué tipo de interacciones permite ContaExcel Add In con los datos de ContaPyme?
#### Respuesta
Se pueden crear, consultar, modificar y eliminar registros de terceros, cuentas, elementos de inventario y centros de costos, como si se estuviera directamente en ContaPyme.

### ¿Qué se puede crear con ContaExcel Add In y las utilidades de Excel?
#### Respuesta
Se pueden crear reportes dinámicos, diseñar indicadores personalizados y construir gráficos dinámicos que se actualizan en la medida en que la información se actualiza en ContaPyme.

### ¿Cómo se actualiza la información en Excel cuando se realizan operaciones en ContaPyme?
#### Respuesta
La información se actualiza automáticamente. Por ejemplo, si se modifica el saldo de una cuenta en ContaPyme, al actualizar el saldo desde Excel, se verá reflejado directamente.

### ¿Cómo funciona la interacción entre Excel y ContaPyme al solicitar información?
#### Respuesta
Al solicitar información desde Excel, por ejemplo, el saldo de una cuenta, la petición se realiza a la base de datos de ContaPyme, la cual procesa y totaliza los registros y retorna una respuesta que es presentada en Excel.

---

# Software contable ContaPyme - ¿Dónde instalar el Agente de Servicios web?
[Ver el video](https://www.youtube.com/watch?v=sMaK01cMGuQ)
sMaK01cMGuQ

## Tema principal
Ubicación de instalación del Agente de Servicios web de ContaPyme.

## Resumen general
Este video explica dónde se puede instalar el Agente de Servicios web de ContaPyme. Se aclara que puede ser instalado en cualquier equipo de la red que tenga alguna modalidad de ContaPyme o Agrowin instalada (servidor, cliente o monousuario). Se mencionan consideraciones importantes como políticas de la empresa, especificaciones del servidor y el impacto en el rendimiento.

## Preguntas Frecuentes (FAQ)

### ¿En qué equipos de la red puedo instalar el Agente de Servicios web de ContaPyme?
#### Respuesta
El Agente de Servicios web se puede instalar en cualquier equipo de la red que tenga instalado previamente alguna de las modalidades de instalación de ContaPyme o Agrowin, ya sea ContaPyme servidor, ContaPyme cliente o ContaPyme monousuario.

### ¿A partir de qué versión de ContaPyme está disponible el Agente de Servicios web?
#### Respuesta
El Agente de Servicios web está disponible a partir del release 6 de la versión 4 de ContaPyme y Agrowin.

### ¿Qué debo tener en cuenta si mi empresa tiene restricciones para instalar programas en el servidor?
#### Respuesta
Si la empresa tiene políticas o restricciones con respecto a la instalación de programas en el servidor, el Agente de Servicios web se puede instalar en cualquier otro cliente de la red.

### ¿Cuándo es recomendable instalar el Agente de Servicios web en un equipo cliente en lugar del servidor?
#### Respuesta
Dependiendo de las especificaciones del servidor y de la cantidad de usuarios que se conectan al servidor de ContaPyme, se recomienda instalar el Agente en un equipo cliente. Esto ayuda a que no se vea afectado el rendimiento de la aplicación, tanto para los usuarios que trabajan en ContaPyme de escritorio como para los usuarios que trabajan desde dispositivos móviles.

### ¿Cuándo es conveniente instalar el Agente de Servicios web en el servidor?
#### Respuesta
Si la empresa no tiene restricciones en el servidor y sus especificaciones técnicas lo permiten, el Agente se puede instalar en el servidor. Esto permite tener centralizado todo lo relacionado con ContaPyme o Agrowin.

### ¿Qué factores pueden afectar el desempeño del Agente de Servicios web?
#### Respuesta
El desempeño y rendimiento del Agente de Servicios web puede cambiar debido a las especificaciones técnicas del equipo cliente o de los dispositivos de red.

---

# Software contable ContaPyme - ¿Qué es el Agente de Servicios web de ContaPyme?
[Ver el video](https://www.youtube.com/watch?v=VEy1QOi8QNg)

## Tema principal
Explicación del Agente de Servicios Web de ContaPyme y su función.

## Resumen general
Este video explica qué es el Agente de Servicios Web de ContaPyme.  Se describe como un programa adicional que se instala en el equipo donde está ContaPyme (o Agrowin) y permite la conexión desde dispositivos móviles a un área de trabajo específica. El agente actúa como intermediario entre el sistema móvil y el servidor de datos central, poniendo a disposición la información almacenada. Se destaca que un agente es necesario por cada área de trabajo y se explican los beneficios de que se registre como un servicio de Windows.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el Agente de Servicios Web de ContaPyme?
#### Respuesta
El Agente de Servicios Web es un programa adicional que se instala en el equipo donde está instalado ContaPyme (o Agrowin). Permite la conexión desde dispositivos móviles a un área de trabajo determinada.

### ¿Dónde se puede instalar el Agente de Servicios Web?
#### Respuesta
El agente se puede instalar en el equipo que tiene instalado el servidor de ContaPyme o en un equipo que tenga el cliente de ContaPyme.

### ¿Cuál es la función principal del Agente de Servicios Web?
#### Respuesta
El agente de servicios web pone a disposición de los clientes móviles la información almacenada en el sistema ContaPyme o Agrowin. Actúa como medio de comunicación entre el sistema móvil y el servidor de datos central.

### ¿Cuántos Agentes de Servicios Web necesito si tengo varias áreas de trabajo?
#### Respuesta
Por cada área de trabajo que se desee consultar desde dispositivos móviles, debe existir un Agente de Servicios Web que se conecta a ella de forma individual.

### ¿Qué significa que el Agente de Servicios Web se registra como un servicio de Windows?
#### Respuesta
Al crear un Agente de Servicios Web, este se registra automáticamente como un servicio de Windows, lo cual ofrece los siguientes beneficios:

1.  **Inicio automático:** Se inicia automáticamente cuando el computador se enciende.
2.  **No requiere inicio de sesión:** No hay necesidad de iniciar sesión de usuario. Con solo estar encendido el equipo, el agente puede responder a las peticiones que se realicen desde dispositivos móviles.
3.  **Ejecución invisible:** Se ejecuta de manera invisible para el usuario por no tener interfaz gráfica.

### ¿El Agente de Servicios Web reemplaza a ContaPyme o Agrowin de escritorio?
#### Respuesta
No, el Agente de Servicios Web es un programa adicional y complementario de ContaPyme y Agrowin de escritorio.

---

# ¿Cómo agregar el complemento de ContaPyme para Excel?
[Ver el video](https://www.youtube.com/watch?v=3saTO2XNK68)

## Tema principal
Instalación y configuración del complemento de ContaPyme para Excel.

## Resumen general
Este video explica cómo instalar y configurar el complemento de ContaPyme para Excel. El complemento permite conectar Excel con ContaPyme para consultar datos y generar informes. Se detalla el proceso de búsqueda e instalación del complemento desde Excel y la configuración de la conexión utilizando los datos del agente de servicios creado previamente en ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un complemento de Excel?
#### Respuesta
Un complemento de Excel es una herramienta que amplía las funciones de Excel. En el caso del complemento de ContaPyme, permite conectar Excel con ContaPyme para consultar datos y generar informes, indicadores y gráficos. Este complemento ofrece más de 200 funciones para traer datos de ContaPyme y utilizarlos en Excel.

### ¿Qué versiones de Excel son compatibles con el complemento de ContaPyme?
#### Respuesta
El complemento de ContaPyme para Excel es compatible con versiones de Excel 2016 en adelante, incluyendo Excel para Microsoft 365, tanto en su versión de escritorio como en la nube.

### ¿Cómo se agrega el complemento de ContaPyme a Excel?
#### Respuesta
Para agregar el complemento de ContaPyme a Excel, sigue estos pasos:

1.  Ve a la pestaña **Inicio** en Excel.
2.  Busca y haz clic en la opción **Complementos** en la cinta de opciones.
3.  En la ventana que se abre, ve a **Buscar complementos** y busca "Contapyme para Excel".
4.  Selecciona el complemento **Contapyme para Excel** y haz clic en **Agregar**.
5.  Después de la instalación, verás una nueva pestaña llamada **Contapyme para Excel**.

### ¿Cómo se conecta el complemento de ContaPyme a la cuenta de ContaPyme?
#### Respuesta
Para conectar el complemento de ContaPyme a tu cuenta de ContaPyme, sigue estos pasos:

1.  Haz clic en la pestaña **Contapyme para Excel**.
2.  Haz clic en el botón **Conectar a Contapyme**.
3.  Ingresa el **correo electrónico** del usuario con el que creaste el agente de servicios en ContaPyme.
4.  Selecciona el **agente de servicios** que creaste en ContaPyme.
5.  Ingresa la **contraseña** del usuario del agente de servicios.
6.  Haz clic en **Conectar**.
7.  Aparecerá un mensaje indicando que el inicio de sesión es exitoso.

### ¿Qué tipo de información puedo consultar con el complemento de ContaPyme?
#### Respuesta
Una vez conectado, el complemento de ContaPyme para Excel te permite acceder a funciones de contabilidad, inventarios, cartera, activos, y otras funcionalidades disponibles en ContaPyme.

### ¿Cómo me desconecto del complemento de ContaPyme?
#### Respuesta
Si no vas a seguir trabajando con el complemento de ContaPyme para Excel, puedes desconectarte haciendo clic en el botón **Desconectar** dentro de la pestaña **Contapyme para Excel**. Esto te regresará a la pantalla de conexión.

---

# ¿Qué son los agentes de servicios en ContaPyme?
[Ver el video](https://www.youtube.com/watch?v=mQ35bLjNbzk)
[mQ35bLjNbzk]

## Tema principal
Explicación y configuración de los agentes de servicios en ContaPyme para la comunicación con otras aplicaciones.

## Resumen general
Este video explica qué son los agentes de servicios en ContaPyme, describiéndolos como "ayudantes invisibles" que facilitan la comunicación entre ContaPyme y otras aplicaciones como ContaPyme Móvil, ContaPyme para Excel y API. El video detalla los dos pasos necesarios para instalar un agente de servicios: la creación de un usuario en ContaPyme con permisos API habilitados y la creación del agente de servicios, incluyendo la selección del tipo de conexión (automático, manual o red local) según el uso previsto. Se aprende a configurar un usuario con los permisos necesarios y a instalar y verificar el estado del agente de servicios.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un agente de servicios en ContaPyme?
#### Respuesta
Un agente de servicios en ContaPyme es un componente que funciona en segundo plano, actuando como un puente de comunicación entre ContaPyme y otras aplicaciones, como ContaPyme Móvil, ContaPyme para Excel o API. Es como un asistente invisible que escucha las solicitudes de otras aplicaciones y responde a ellas.

### ¿Para qué se necesita instalar un agente de servicios en ContaPyme?
#### Respuesta
Se necesita instalar un agente de servicios para permitir la comunicación entre ContaPyme y otras aplicaciones como ContaPyme Móvil, ContaPyme para Excel y API. El agente de servicios actúa como un puente que facilita el intercambio de información entre estas aplicaciones.

### ¿Cuáles son los dos pasos principales para instalar un agente de servicios?
#### Respuesta
Los dos pasos principales son:
1.  **Crear un usuario en ContaPyme**: Configurar el nombre, correo electrónico y contraseña del usuario, habilitar la opción "Habilitar por medio de API" y asociar la licencia correspondiente.
2.  **Crear el agente de servicios**: Crear un nuevo agente y configurar el tipo de conexión (automático, manual o red local).

### ¿Cómo se crea un usuario en ContaPyme para el agente de servicios?
#### Respuesta
Para crear un usuario en ContaPyme para el agente de servicios, sigue estos pasos:
1.  Ve a la pestaña **Básico**.
2.  Ingresa al catálogo de **Usuarios**.
3.  Crea un nuevo usuario haciendo clic en **Nuevo**.
4.  Completa la información del usuario: nombre, apellido y perfil (por ejemplo, Administrador del Sistema).
5.  Ve a la pestaña **Definición**, sección **General** y asigna una contraseña (mínimo 8 caracteres).
6.  En la pestaña **Definición**, sección **Conectividad**, habilita la opción **Habilitar por medio de API**.
7.  Ve a la pestaña **Datos de Usuario** e indica el correo electrónico (que no esté asociado a otro usuario) y define el rol (por ejemplo, Administrador del Sistema).
8.  En la pestaña **Licencias**, asocia la licencia correspondiente al usuario, tanto en la licencia principal como en la licencia móvil.
9.  Haz clic en **Aceptar** para guardar los cambios.

### ¿Qué debo hacer si aparece un mensaje de precaución al guardar el usuario creado?
#### Respuesta
Si al guardar el usuario aparece un mensaje de precaución indicando que se han cambiado datos del contacto, y preguntando si deseas actualizar esta información en el portal de clientes de Insof, da clic en **Sí**.

### ¿Cómo se crea el agente de servicios en ContaPyme?
#### Respuesta
Para crear el agente de servicios, sigue estos pasos:

1.  Ve a la pestaña **Básico**.
2.  En la cinta de opciones, haz clic en **Servicios** (dentro de la sección Complementos).
3.  Si aparece una ventana de permisos, da clic en **Sí**.
4.  En la ventana del instalador de servicios, haz clic en **Nuevo** (en la cinta de opciones o clic derecho y seleccionar Nuevo).
5.  Deja la opción por defecto **Instalar un agente de servicios web** y haz clic en **Siguiente**.
6.  Si los datos de conexión al área de trabajo muestran el usuario "admin", da clic en **Cambiar datos de conexión**.
7.  Selecciona el usuario que creaste para el agente de servicios e ingresa la contraseña.
8.  Haz clic en **Conectar**.
9.  Haz clic en **Siguiente**.
10. Selecciona el tipo de conexión (Automático, Manual o Red Local).
11. Haz clic en **Finalizar** (o **Aceptar** si no tienes el módulo API).

### ¿Cuáles son los tipos de conexión disponibles para el agente de servicios y cuándo se recomienda cada uno?
#### Respuesta
Los tipos de conexión son:

*   **Automático**: Se recomienda si vas a utilizar ContaPyme Móvil o ContaPyme para Excel. No requiere abrir puertos ni configuraciones adicionales en el módem o router.  El sistema asigna un puerto aleatorio.
*   **Manual**: Permite asociar un puerto específico.  Requiere configuraciones adicionales, como abrir un puerto en el router y contactar al proveedor de internet.
*   **Red Local**:  Se utiliza si vas a trabajar solo localmente, sin salir a internet, por ejemplo, para móvil o para el mismo API.

### ¿Por qué no es recomendado el método automático para API?
#### Respuesta
No se recomienda el método automático para API porque el puerto asignado aleatoriamente puede cambiar constantemente. Esto podría causar problemas si tienes un desarrollo específico que dependa de un puerto fijo.

### ¿Cómo puedo saber si el agente de servicios se instaló correctamente?
#### Respuesta
El estado del agente debe indicar "Servicio iniciado en línea" y el icono debe estar en verde. Si está en rojo o gris, significa que no se instaló correctamente.

### ¿Qué debo hacer si necesito modificar un agente de servicios existente?
#### Respuesta
Si necesitas modificar un agente de servicios, primero debes bajarlo (desactivarlo) y luego realizar las modificaciones. La opción de modificar no estará disponible mientras el agente esté en línea.

### ¿Qué pasa si tengo varias áreas de trabajo en ContaPyme?
#### Respuesta
Si tienes varias áreas de trabajo, debes crear un agente de servicios por cada área de trabajo.
