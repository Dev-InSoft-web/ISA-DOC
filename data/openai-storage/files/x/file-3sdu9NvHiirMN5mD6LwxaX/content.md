# Capacitación Exógena DIAN AG 2024 con ContaPyme | Paso a Paso + Recomendaciones Clave
[Ver el video](https://www.youtube.com/watch?v=hVMJNvymBOU)
[hVMJNvymBOU]

## Tema principal
Presentación de la información exógena en ContaPyme.

## Resumen general
Este video explica cómo generar y presentar la información exógena a la DIAN utilizando ContaPyme. Se detallan los tres pasos clave: configuración de los conceptos por formato, generación de la información y obtención del archivo XML. Además, se abordan manejos especiales para los formatos 2276 (nómina) y 1010 (socios), destacando las automatizaciones que ofrece ContaPyme para facilitar el proceso y reducir errores. El video también muestra el proceso directamente en el sistema, explicando cómo utilizar las herramientas disponibles para la verificación y el ajuste de la información.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la información exógena?
#### Respuesta
La información exógena es un conjunto de datos contables y financieros sobre las operaciones que las empresas y personas naturales realizan con clientes, empleados y proveedores, y que deben reportar a la DIAN.

### ¿Quiénes están obligados a presentar la información exógena?
#### Respuesta
Están obligados a presentar la información exógena aquellos que tengan ingresos brutos totales superiores a 11,800 UVT en el año gravable 2024, o ingresos por rentas de capital y no laborales superiores a 2,400 UVT en el mismo período.

### ¿En qué formato se debe presentar la información exógena?
#### Respuesta
La información exógena debe presentarse en un archivo XML, siguiendo las especificaciones técnicas de la DIAN en cuanto a estructura, contenido y validaciones.

### ¿Cómo se generan los archivos para información exógena en ContaPyme?
#### Respuesta
El proceso para generar la información exógena en ContaPyme se realiza en tres pasos:
1.  **Revisar y configurar los conceptos por cada formato:** Identificar los formatos DIAN que se deben presentar y asociar las cuentas contables a cada concepto dentro de esos formatos. Esto se hace en la sección de **Contabilidad > Medios Magnéticos (Información Exógena)**, seleccionando el formato y modificando los campos correspondientes.
2.  **Generar la información:** Una vez configurados los conceptos, generar la información para que el sistema extraiga los datos de cada tercero, correspondientes a las cuentas asociadas. Esto se hace dentro del formato, dando clic en el botón **Generar**, indicando el año gravable (enero a diciembre del año correspondiente) y dando clic en **Aceptar**.
3.  **Generar el XML:** Después de verificar la información, generar el archivo XML que se subirá a la plataforma de la DIAN. Esto se realiza dando clic en el botón **Generar XML**, confirmando el año de envío y la versión del formato, luego dando clic en **Aceptar**.

### ¿Cómo puedo verificar la información generada en ContaPyme antes de generar el XML?
#### Respuesta
ContaPyme ofrece varias herramientas para verificar la información:
*   **Datos Fuente:** Esta herramienta, disponible directamente dentro del formato, muestra de dónde está extrayendo el sistema la información para cada concepto.
*   **Mayor y Balances con Terceros:** Este informe, ubicado en **Contabilidad > Libros Legales > Mayor y Balances**, permite verificar los saldos y movimientos por cuenta y tercero. La consulta del mayor y balances permite profundizar en el dato con la herramienta drill down.
*   **Explorador de Contabilidad:** Este informe personalizable permite adicionar, ocultar columnas, filtrar y agrupar información para una auditoría detallada.

### ¿Cómo se maneja el formato 2276 (nómina) en ContaPyme?
#### Respuesta
El formato 2276 tiene un manejo especial porque se integra con el módulo de nómina electrónica.
1.  Asocie las cuentas a los campos correspondientes dentro del formato.
2.  Algunos campos se alimentan automáticamente de la información registrada en la nómina electrónica (por ejemplo, cesantías e intereses de cesantías). En estos casos, no se solicita una cuenta contable.
3.  El promedio del ingreso laboral de los últimos 6 meses se calcula automáticamente a partir del IBC (Ingreso Base de Cotización) registrado en la nómina.
4.  Para la información del dependiente económico, se debe configurar previamente el tercero.

### ¿Dónde configuro la información del dependiente económico en ContaPyme para el formato 2276?
#### Respuesta
La información del dependiente económico se configura en el formulario del empleado:
1.  Dentro del formato 2276, utilice la opción **Terceros Reportados**.
2.  Seleccione el empleado y haga clic en **Modificar**.
3.  En el formulario del empleado, vaya a la pestaña **Datos Empleado** y luego a **Retención en la Fuente**.
4.  Indique el número de dependientes y complete la información del dependiente principal.
5.  Para que los cambios se reflejen en el formato 2276, debe generar nuevamente la información del formato.

### ¿Cómo se calcula el valor del ingreso promedio de los últimos 6 meses en el formato 2276?
#### Respuesta
ContaPyme calcula automáticamente el valor del ingreso promedio de los últimos 6 meses de la siguiente manera:
1.  Toma todos los conceptos que hacen parte del IBC (Ingreso Base de Cotización) del empleado durante los últimos 6 meses.
2.  Suma el valor total de esos conceptos.
3.  Divide ese total por el número de días reportados en esos 6 meses.
4.  Multiplica el resultado por 30 (considerando que cada mes tiene 30 días para cálculos de nómina).

### ¿Se pueden hacer ajustes manuales en el formato 2276?
#### Respuesta
Sí, se pueden hacer ajustes manuales en cualquier campo del formato 2276. Estos cambios se guardarán para la generación del XML, pero no afectarán la información base de datos ni los registros originales de nómina.

### ¿Cómo se maneja el formato 1010 (socios) en ContaPyme?
#### Respuesta
En el formato 1010, ContaPyme calcula automáticamente el porcentaje de participación de cada socio y la posición decimal de ese porcentaje, basándose en el valor nominal de la acción. Recuerde que con la resolución actual, se deben reportar todos los socios.

### ¿Cómo recalculo los porcentajes de participación en el formato 1010?
#### Respuesta
Dentro del formato 1010, de clic en el botón **Recalcular Porcentajes**, el sistema recalculará los porcentajes de participación basados en el valor nominal de la acción, asegurando que la sumatoria de todos los porcentajes sea igual a 100%.

### ¿Se pueden exportar los datos a Excel para trabajar la información exógena y luego importarla nuevamente a ContaPyme?
#### Respuesta
Sí, los datos de los formatos se pueden exportar a Excel para su edición y luego importarlos nuevamente a ContaPyme. Para exportar, haga clic derecho en el formato y seleccione **Exportar registros a Excel**. Después de trabajar en Excel, importe los registros a ContaPyme utilizando la opción **Utilidades > Importar registros**.

---

# Conciliación Bancaria Automática y Manual - Capacitación ContaPyme Junio 2017
[Ver el video](https://www.youtube.com/watch?v=D74L5Fj82Vs)
[D74L5Fj82Vs]

## Tema principal
Explicación y demostración del proceso de conciliación bancaria, tanto manual como automática, en ContaPyme.

## Resumen general
Este video de capacitación detalla cómo realizar conciliaciones bancarias manuales y automáticas en ContaPyme. Se cubren los objetivos del módulo, definiciones, tipos de movimientos bancarios, diferencias entre conciliación manual y automática, activación del módulo, creación de cuentas de conciliación, configuración de tipos de movimiento y el registro de la operación.  Se explican los pasos necesarios dentro del sistema, mostrando ejemplos prácticos y la configuración requerida para cada tipo de conciliación.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la conciliación bancaria y por qué es importante?
#### Respuesta
La conciliación bancaria es un proceso que permite comparar y ajustar las diferencias entre el saldo que aparece en el extracto bancario y los registros contables de la empresa en ContaPyme. Es importante para identificar errores, detectar ingresos o faltantes no registrados, y asegurar que la contabilidad refleje fielmente los movimientos bancarios.

### ¿Qué tipos de movimientos bancarios se pueden clasificar en ContaPyme?
#### Respuesta
Los movimientos bancarios se clasifican generalmente en dos tipos principales:
- **Movimientos de ingreso:** Cheques recibidos, depósitos o consignaciones, notas crédito.
- **Movimientos de retiro:** Cheques girados, transferencias o retiros, notas débito.

### ¿Cuál es la diferencia entre la conciliación bancaria manual y la automática en ContaPyme?
#### Respuesta
La conciliación bancaria manual requiere que el usuario compare cada registro contable con el extracto bancario de forma individual y marque manualmente los movimientos coincidentes. La conciliación automática, por otro lado, permite cargar el extracto bancario en formato digital y el sistema realiza la comparación y conciliación de forma automática, ajustando las diferencias según la configuración preestablecida.

### ¿Cómo se activa el módulo de conciliación bancaria en ContaPyme?
#### Respuesta
Para activar el módulo de conciliación bancaria, siga estos pasos:
1. Vaya a la pestaña **Contabilidad**.
2. Seleccione **Plan de Cuentas**.
3. Haga clic en **Configuración** (en la parte superior).
4. Seleccione el alcance de la configuración (para todos los usuarios, un perfil, o solo el usuario actual).
5. En la parte inferior izquierda, seleccione **Conciliación Bancaria**.
6. Active la opción **Realizar control de movimiento para la conciliación bancaria**.
7. Indique la **Fecha a partir de la cual se llevará el control de conciliación bancaria**.
8. Active la opción **Realizar control estricto de los tipos de movimiento bancario**.
9. Haga clic en **Aceptar**.

### ¿Cómo se crea una cuenta de conciliación en ContaPyme para conciliación manual?
#### Respuesta
Para crear una cuenta de conciliación para la conciliación manual, siga estos pasos:
1. Vaya a la pestaña **Contabilidad**.
2. Seleccione **Cuentas Conciliación**.
3. Haga clic en el botón **Crear** en la cinta de opciones.
4. En la ventana que se abre, busque la cuenta bancaria correspondiente desde la lupa, seleccionándola del Plan de Cuentas.
5. Ingrese la descripción de la cuenta (ej. Conciliación Cuenta [Número de cuenta], [Nombre del banco]).
6. Seleccione el tercero correspondiente al banco desde la lupa.
7. Haga clic en **Aceptar**.

### ¿Cómo se configura una cuenta de conciliación en ContaPyme para conciliación automática?
#### Respuesta
Para configurar una cuenta para conciliación automática, siga estos pasos:
1. Realice los pasos 1-6 de la pregunta anterior.
2. En la ventana Registro de cuenta para conciliación bancaria, haga clic en **Definir formato de importación de archivo del extracto bancario para esta cuenta**.
3. Ingrese la **Ubicación** donde se guardan los extractos bancarios (la ruta de la carpeta).
4. Seleccione el **Tipo de archivo** (CSV, XLS, TXT, etc.).
5. Indique el **Número de las filas de títulos** (si aplica, sino coloque cero).
6. Indique el **Número de la primera fila de datos**.
7. Opcionalmente, active **Cambiar el signo de los movimientos al importar el archivo del extracto bancario** si es necesario.
8. Active **Análisis de signo para el valor del movimiento** si los débitos y créditos están en la misma columna.
9. Haga clic en **Siguiente** y configure los nombres de los campos en el extracto bancario para que coincidan con los campos correspondientes en el sistema.
10. Haga clic en **Aceptar**.

### ¿Cuáles son los dos catálogos de tipos de movimiento bancario en ContaPyme y en qué se diferencian?
#### Respuesta
ContaPyme cuenta con dos catálogos de tipos de movimiento bancario:
- **Tipos de Movimiento Bancario Generales:** Se aplica a todas las cuentas bancarias, siempre y cuando no se hayan creado tipos de movimiento específicos. Se encuentra en **Contabilidad > Plan de Cuentas > Definición de tipos de movimiento bancario generales.**
- **Tipos de Movimiento Bancario Específicos:** Se aplica solo a una cuenta bancaria específica y no afecta a otras. Se accede dando clic derecho sobre la cuenta en el catálogo de conciliación y seleccionando "Definición de tipos de movimiento bancario."

### ¿Cómo se crea un tipo de movimiento bancario general en ContaPyme?
#### Respuesta
Para crear un tipo de movimiento bancario general, siga estos pasos:
1. Vaya a la pestaña **Contabilidad**.
2. Despliegue la flechita del **Plan de Cuentas** y seleccione **Definición de tipos de movimiento bancario generales**.
3. Haga clic en **Crear**.
4. Seleccione el **Tipo de acción bancaria** (Movimiento de ingreso o Movimiento de retiro).
5. Ingrese el **Código de tipo de movimiento**.
6. Ingrese la **Descripción**.
7. Elija un **Color de fondo** (opcional).
8. Defina un **mínimo de caracteres para el campo número** (opcional, entre 3 y 9).
9. Haga clic en **Aceptar**.

### ¿Cómo se crea un tipo de movimiento bancario específico para una cuenta en ContaPyme?
#### Respuesta
Para crear un tipo de movimiento bancario específico, siga estos pasos:
1. Vaya a la pestaña **Contabilidad**.
2. Seleccione **Cuentas Conciliación**.
3. Haga clic derecho sobre la cuenta bancaria específica.
4. Seleccione **Definición de tipos de movimiento bancario**.
5. Haga clic en **Crear**.
6. Seleccione el **Tipo de acción bancaria** (Movimiento de ingreso, Movimiento de retiro, Definición de movimiento a ignorar, o Definición de notas crédito/débito en el extracto).
7. Ingrese el **Código de tipo de movimiento**.
8. Ingrese la **Descripción**.
9. Elija un **Color de fondo** (opcional).
10. Defina un **mínimo de caracteres para el campo número** (opcional, entre 3 y 9).
11. Si selecciona **Definición de notas crédito/débito en el extracto bancario**, indique la **Cuenta de contrapartida para la cuenta de bancos** y el **Tipo de asiento** que genera (Débito o Crédito).
12. Ingrese el **Texto a buscar** en la columna de descripción del extracto bancario.
13. Haga clic en **Aceptar**.

### ¿Cómo se realiza la conciliación bancaria manual en ContaPyme?
#### Respuesta
Para realizar la conciliación bancaria manual, siga estos pasos:
1. Vaya al **Manejador de Operaciones** (en la barra de acceso rápido o por Básico).
2. Haga clic en **Más Operaciones**, luego en **Contabilidad** y seleccione **Conciliación Bancaria**.
3. Seleccione la opción **Manual**.
4. Indique el **Tipo de documento** (ej. Nota de Contabilidad).
5. Ingrese el **Detalle** (ej. Conciliación Banco [Nombre del banco] [Mes]).
6. Ingrese la **Fecha de la operación** y la **Fecha de conciliación**.
7. Seleccione la **Cuenta de conciliación** desde la lupa.
8. Ingrese el **Saldo del extracto bancario**.
9. Haga clic en **Siguiente**.
10. Compare cada movimiento en el sistema con el extracto bancario y marque los movimientos correctos (OK) con el check verde. Use los otros colores para marcar diferencias o errores.
11. Haga clic en **Siguiente** para realizar los ajustes contables necesarios.
12. Ingrese las cuentas correspondientes para los ajustes, indicando los débitos y créditos necesarios.
13. Indique el **Tipo de movimiento** para cada ajuste en la cuenta bancaria.
14. Una vez que el saldo contable ajustado coincida con el saldo del extracto bancario, haga clic en **Aceptar**.

### ¿Cómo se realiza la conciliación bancaria automática en ContaPyme?
#### Respuesta
Para realizar la conciliación bancaria automática, siga estos pasos:
1. Vaya al **Manejador de Operaciones**.
2. Haga clic en **Más Operaciones**, luego en **Contabilidad** y seleccione **Conciliación Bancaria**.
3. Seleccione la opción **Automática**.
4. Indique el **Tipo de documento** (ej. Nota de Contabilidad).
5. Ingrese el **Detalle** (ej. Conciliación Banco [Nombre del banco] [Mes]).
6. Ingrese la **Fecha de la operación** y la **Fecha de conciliación**.
7. Seleccione la **Cuenta de conciliación** desde la lupa.
8. Ingrese el **Saldo del extracto bancario**.
9. Haga clic en **Siguiente**.
10. Haga clic en el icono de la carpeta para cargar el archivo del extracto bancario.
11. Haga clic en el botón para **Sincronizar** los movimientos. El sistema automáticamente marcará los movimientos coincidentes en verde.
12. Revise los movimientos que no se concilian automáticamente y realice los ajustes necesarios (si es necesario).
13. Una vez que el saldo contable ajustado coincida con el saldo del extracto bancario, haga clic en **Aceptar**.

### ¿Dónde se configura el tipo de movimiento bancario en una operación de gasto o movimiento contable?
#### Respuesta
Cuando se realiza una operación de gasto o un movimiento contable que afecta a una cuenta bancaria creada en el catálogo de cuentas de conciliación, el sistema activa automáticamente el campo **Tipo de movimiento**. Este campo se encuentra en la línea de la cuenta bancaria dentro de la operación, y es obligatorio completarlo si se ha activado el control estricto de los tipos de movimiento bancario en la configuración del plan de cuentas.

---

# Contabilidad ContaPyme R8
[Ver el video](https://www.youtube.com/watch?v=JqL_2QjDzLY)

## Tema principal
Manejo del módulo de contabilidad en ContaPyme R8

## Resumen general
Este video explica el manejo del módulo de contabilidad en ContaPyme R8, incluyendo sus componentes principales, submódulos y operaciones. Se aprende a utilizar la operación de movimiento contable, la carga inicial de cuentas, y a generar diversos informes contables y estados financieros. También se exploran herramientas adicionales como medios magnéticos, conciliación bancaria manual y manejo de moneda extranjera.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los objetivos principales al utilizar el módulo de contabilidad de ContaPyme?
#### Respuesta
Los objetivos principales son:
- Conocer los componentes del módulo y sus rutas de acceso.
- Aprender a utilizar la operación de movimiento contable.
- Conocer los informes que ofrece el sistema, incluyendo estados financieros y libros mayores.
- Realizar ejercicios prácticos en el sistema.
- Conocer las utilidades y herramientas del módulo.

### ¿Qué componentes principales conforman el módulo de contabilidad en ContaPyme?
#### Respuesta
Los componentes principales son:
- Descripción general del módulo, componentes, submódulos y operaciones.
- Catálogo de plan de cuentas.
- Operación de carga inicial de cuentas.
- Operación de movimiento contable.
- Otras operaciones del módulo.
- Estados financieros e informes contables.

### ¿Qué beneficios ofrece el módulo de contabilidad de ContaPyme a las empresas?
#### Respuesta
El módulo ofrece:
- Agilizar los procesos operativos.
- Mantener la información ordenada y al día.
- Control completo de la información.
- Contabilización NIF al instante.
- Editor de comprobantes.
- Cálculo automático de impuestos.
- Sistema de auditoría.
- Tablas comparativas.
- Cierre y bloqueo de mes.
- Integración total con otros módulos.
- Generación de medios magnéticos.
- Gestión de políticas y revelaciones.

### ¿Qué tipos de planes de cuentas maneja ContaPyme por defecto?
#### Respuesta
ContaPyme maneja dos tipos de planes de cuentas por defecto:
- Plan de cuentas del sector comercial.
- Plan de cuentas del sector solidario.
Adicionalmente, permite que el usuario cree su propio plan de cuentas.

### ¿Cómo se accede al catálogo de cuentas en ContaPyme?
#### Respuesta
Se puede acceder al catálogo de cuentas de las siguientes maneras:
- A través del icono de plan de cuentas en la barra de botones rápido.
- A través de la pestaña **Contabilidad > Plan de cuentas**.

### ¿Cómo se crea una cuenta auxiliar en el plan de cuentas de ContaPyme?
#### Respuesta
Para crear una cuenta auxiliar:
1. Identificar la cuenta padre.
2. Seleccionar la cuenta padre en el plan de cuentas.
3. Hacer clic en el botón **Crear** en la barra de herramientas o dar clic derecho sobre la cuenta padre y seleccionar **Crear**.
4. Indicar dos dígitos adicionales para el código de la cuenta auxiliar.
5. Dar clic en **Aceptar**.
6. Cambiar el nombre de la cuenta.
7. Modificar observaciones si es necesario (ej. número de cuenta bancaria).
8. Revisar y ajustar los atributos de la cuenta si es necesario.
9. Dar clic en **Aceptar** para guardar la cuenta.

### ¿Qué significan los atributos de las cuentas en ContaPyme?
#### Respuesta
Los atributos de las cuentas determinan el comportamiento de las cuentas dentro del sistema y en las diferentes operaciones. Se dividen en dos tipos:
- **Datos generales:** Tipo de cuenta (débito/crédito), clase de cuenta y uso.
- **Datos requeridos:** Información que la cuenta requerirá dentro de una operación (ej. centro de costos, tercero).

### ¿Dónde se encuentra la guía de montaje en Contapyme y qué información provee?
#### Respuesta
La guía de montaje se encuentra en la pestaña **Contabilidad > Guías de montaje**.
La guía de montaje provee todos los pasos que el usuario debe seguir para poder cargar su información en Contapyme, incluyendo:
- Preparación de la información inicial.
- Creación y configuración de las cuentas contables.
- Registro del cargue inicial.
- Configuración de la operación de movimiento contable.

### ¿Qué tipo de documento de soporte se utiliza en la operación de carga inicial de cuentas?
#### Respuesta
El tipo de documento de soporte que se utiliza es el **990 de carga inicial de cuentas**. Este documento no se puede modificar dentro de la operación.

### ¿Cuándo se recomienda realizar el cargue inicial de cuentas en ContaPyme?
#### Respuesta
Se recomienda realizar el cargue inicial de cuentas:
- El último día del año anterior, si se inicia a principio de año.
- El último día del mes anterior, si se inicia en el transcurso del año.

### ¿Qué debe tenerse en cuenta al hacer un cargue inicial de cuentas en el transcurso del año?
#### Respuesta
Además de la información de las cuentas de activo, pasivo y patrimonio, se deben tener los datos de las cuentas de ingresos y egresos. La ecuación patrimonial debe considerar la utilidad generada hasta el momento.

### ¿Cómo se duplica una operación de carga inicial de cuentas en ContaPyme?
#### Respuesta
1. En el manejador de operaciones, seleccionar la operación a duplicar.
2. Hacer clic en el botón **Duplicar**.
3. Indicar el detalle de la nueva operación.
4. Verificar que el tipo de documento de soporte sea el mismo.
5. Organizar la fecha y desmarcar "Incrementar fecha" para que conserve la fecha de la operación original.
6. Hacer clic en **Aceptar**.

### ¿Cómo se cambia el tipo de contabilización de una operación de carga inicial de cuentas de local a NIF (o viceversa)?
#### Respuesta
1. Abrir la operación de carga inicial de cuentas.
2. Ir a la opción **Operación > Tipo de contabilización**.
3. Seleccionar el tipo de contabilización deseado (Local o NIF).
4. Guardar la operación.

### ¿Qué catálogos principales del sistema convergen en la operación de movimiento contable?
#### Respuesta
En la operación de movimiento contable convergen los siguientes catálogos:
- Plan de cuentas.
- Explorador gráfico de la empresa (centros de costos).
- Terceros.

### ¿Cómo se accede a la operación de movimiento contable en ContaPyme?
#### Respuesta
Se accede a la operación de movimiento contable a través de: **Básico > Manejador de operaciones > Más operaciones > Contabilidad > Movimiento contable**.

### ¿Cómo se utiliza el cálculo automático de impuestos en la operación de movimiento contable?
#### Respuesta
1. Ubicarse en el renglón de la cuenta que genera el impuesto.
2. Hacer clic en el botón de cálculo automático de impuestos (icono de calculadora).
3. Verificar que el sistema haya calculado correctamente el impuesto y cargado la cuenta correspondiente.

### ¿Cómo se afecta un renglón específico en la operación de movimiento contable a una contabilización local o NIIF?
#### Respuesta
1. Ubicarse en el renglón deseado.
2. Ir a la columna **Observaciones > Herramientas > Afectación de renglón actual en contabilidad**.
3. Seleccionar el tipo de contabilización deseado (Solo Local, Solo NIIF, o Local y NIIF).

### ¿Qué tipo de acciones se ejecutan en la operación de acciones automáticas de fin de mes?
#### Respuesta
Las acciones que se ejecutan son:
- Depreciaciones y amortizaciones.
- Traslados entre centros de costos.
- Causación de intereses.
- Ajustes por diferencia en cambio.
- Ajustes por inflación.
- Autoactivación de cuentas.
Es importante saber que estas acciones están amarradas a otros módulos del sistema y dependerá del licenciamiento contratado para su funcionamiento.

### ¿Qué módulos se requieren para que funcionen las acciones automáticas de fin de mes en ContaPyme?
#### Respuesta
- **Depreciaciones y amortizaciones:** Módulo de activos fijos.
- **Causación de intereses:** Módulo de cartera y proveedores.
- **Ajustes por diferencia en cambio:** Manejo activo de moneda extranjera.
- **Autoactivación de cuentas:** Módulo de costos de producción.

### ¿Cómo se accede a la operación de acciones automáticas de fin de mes?
#### Respuesta
Se accede a la operación de acciones automáticas de fin de mes a través de: **Básico > Manejador de operaciones > Más operaciones > Contabilidad > Acciones automáticas de fin de mes**.

### ¿Qué acciones realiza la operación de cierre de fin de año en ContaPyme?
#### Respuesta
La operación de cierre de fin de año realiza las siguientes acciones:
- Cancela las cuentas de ingresos, gastos y costos.
- Calcula la utilidad del ejercicio.
- Lleva la utilidad o pérdida del ejercicio a la cuenta de utilidad o pérdida del ejercicio anterior.

### ¿Dónde se configuran las acciones de cierre de fin de año en ContaPyme?
#### Respuesta
Las acciones de cierre de fin de año se configuran en: **Contabilidad > Plan de cuentas (desplegar flecha) > Acciones de cierre de año (icono de llave inglesa)**.

### ¿Cómo se accede a la operación de cierre de fin de año?
#### Respuesta
Se accede a la operación de cierre de fin de año a través de: **Básico > Manejador de operaciones > Más operaciones > Contabilidad > Cierre de fin de año**.

### ¿Cuáles son los estados financieros que ofrece el módulo de contabilidad en ContaPyme?
#### Respuesta
Los estados financieros que ofrece ContaPyme son:
- Estado de situación financiera (Balance General).
- Estado de resultados.
- Estado de flujos de efectivo.
- Estado de cambios en el patrimonio.

### ¿Qué otros informes contables ofrece ContaPyme además de los estados financieros?
#### Respuesta
Otros informes contables que ofrece ContaPyme son:
- Mayor y balances.
- Movimiento de cuentas auxiliares.
- Inventario y balances.
- Caja diario.

### ¿Dónde se encuentran los informes contables en ContaPyme?
#### Respuesta
Todos los informes contables se encuentran en la pestaña **Contabilidad**, divididos en secciones como Estados Financieros básicos, libros legales, otros reportes contables, etc.

### ¿Qué diferencia hay entre los informes en tipo consulta y tipo impresión?
#### Respuesta
- **Tipo consulta (pantalla):** Permite mover la información, hacer auditoría, verificar el origen de los saldos.
- **Tipo impresión:** Presentación lista para imprimir, mejor formateada, pero con menos opciones de manipulación en pantalla.

### ¿Qué información provee el explorador de contabilidad?
#### Respuesta
El explorador de contabilidad muestra todos los movimientos contables generados en un período determinado, incluyendo movimientos de todos los módulos del sistema, no solo del módulo de contabilidad. Permite filtrar por tipo de operación, fechas, cuentas, etc.

---

# Curso básico contabilidad
[Ver el video](https://www.youtube.com/watch?v=S2cbuXzpsiE)
Curso básico de contabilidad

## Tema principal
Introducción a la contabilidad, Plan Único de Cuentas (PUC) y estados financieros.

## Resumen general
Este video proporciona una introducción a la contabilidad, cubriendo su definición, objetivos, legalidad y categorías. Explica el Plan Único de Cuentas (PUC) y la clasificación de las cuentas (activos, pasivos, patrimonio, ingresos, gastos, costos de venta y costos de producción). Además, introduce los estados financieros básicos (balance general, estado de resultados, estado de cambios en el patrimonio, estado de flujos de efectivo), libros legales y conceptos de certificados y anexos tributarios. El video incluye ejemplos prácticos en Excel para ilustrar el registro contable de transacciones y culmina con la descripción de la tarea de construir un estado de resultados y un balance general.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la contabilidad?
#### Respuesta
La contabilidad es una disciplina que permite reflejar y analizar la actividad económica de una empresa. Se basa en procedimientos estandarizados y en un conjunto de reglas conocidas como los principios de contabilidad generalmente aceptados (PCGA), regulados inicialmente por el Decreto 2649 de 1993. Posteriormente, se incorporaron las Normas Internacionales de Información Financiera (NIF) bajo la Ley 1314 del 2009.

### ¿Para qué sirve la contabilidad?
#### Respuesta
La contabilidad sirve para:
- Tener la documentación organizada y saber de dónde provienen las entradas y salidas de dinero.
- Declarar impuestos ante las autoridades fiscales como la DIAN.
- Controlar las entradas y salidas de dinero y conocer el presupuesto de la empresa.
- Asegurar que el dinero esté en el lugar y momento correctos y que la empresa tenga fácil acceso a él.
- Analizar la situación de la empresa desde un punto de vista interno para la toma de decisiones y desde un punto de vista externo para proveer información a terceros interesados, como compradores potenciales, socios o entidades bancarias.

### ¿Cuáles son las características legales de la contabilidad?
#### Respuesta
La contabilidad debe ser:
- **Completa:** Basada en hechos reales y no en suposiciones.
- **Diaria:** Debe contabilizarse cada movimiento de acuerdo al día en que ocurrió.
- **Íntegra:** No se puede eliminar ningún movimiento registrado, y cada asiento debe tener su correspondiente recibo, factura o documento.

### ¿Cuáles son las categorías de la contabilidad?
#### Respuesta
Existen principalmente tres categorías de contabilidad:
- **Contabilidad Financiera:** Registra las operaciones en estados financieros como el balance general o estado de situación financiera, el estado de resultados, el estado de flujos de efectivo y el estado de cambios en el patrimonio. Se utiliza en empresas comerciales, del sector salud, cooperativas y de educación.
- **Contabilidad de Costos:** Acumula información relacionada con los costos dentro de una empresa, analizando, registrando y acumulando todo lo relacionado con la producción.
- **Contabilidad Pública:** Lleva un control de ingresos y gastos de las empresas que pertenecen al Estado.

### ¿Qué tipos de contabilidad se pueden llevar en ContaPyme y AgroWin?
#### Respuesta
En ContaPyme y AgroWin se pueden llevar la contabilidad financiera y la contabilidad de costos.

### ¿Qué es el Plan Único de Cuentas (PUC)?
#### Respuesta
El Plan Único de Cuentas (PUC) es un listado en el que se representan las cuentas necesarias para registrar los hechos en la contabilidad. Facilita la uniformidad en el registro de las transacciones y la transparencia de la información.

### ¿Cómo se clasifican las cuentas en el PUC?
#### Respuesta
Las cuentas en el Plan Único de Cuentas se clasifican en:
- **Clase:** Primer dígito (ej: 1 para activos).
- **Grupo:** Dos primeros dígitos.
- **Cuenta:** Cuatro primeros dígitos.
- **Subcuenta:** Seis primeros dígitos.

### ¿Cuáles son los códigos de clase en el PUC y qué representan?
#### Respuesta
- **1:** Activos
- **2:** Pasivos
- **3:** Patrimonio
- **4:** Ingresos
- **5:** Gastos
- **6:** Costos de Venta
- **7:** Costos de Producción
- **8 y 9:** Cuentas de Orden (solo bajo los principios generalmente aceptados, no bajo NIF)

### ¿Qué son los activos y cuál es su naturaleza?
#### Respuesta
Los activos son los bienes y derechos, tangibles o intangibles, que son propiedad de la empresa. La naturaleza de los activos es débito, lo que significa que aumentan por el lado del débito y disminuyen por el lado del crédito.

### ¿Qué son los pasivos y cuál es su naturaleza?
#### Respuesta
Los pasivos son las deudas y obligaciones contraídas por la empresa. La naturaleza de las cuentas del pasivo es crédito, lo que significa que aumentan por el lado del crédito y disminuyen por el lado del débito.

### ¿Qué es el patrimonio y cuál es su naturaleza?
#### Respuesta
El patrimonio es el resultado de restar los pasivos a los activos (Activo - Pasivo). Su naturaleza es crédito, lo que significa que aumenta por el lado del crédito y disminuye por el lado del débito.

### ¿Qué son los ingresos y cuál es su naturaleza?
#### Respuesta
Los ingresos son los beneficios operativos y financieros que la empresa recibe por su proceso comercial, principalmente por ventas. Su naturaleza es crédito, lo que significa que aumentan por el lado del crédito.

### ¿Qué son los gastos y cuál es su naturaleza?
#### Respuesta
Los gastos son los cargos operativos y financieros en los que la empresa tiene que incurrir para desarrollar su actividad normal. Su naturaleza es débito, lo que significa que aumentan por el lado del débito.

### ¿Qué son los costos de venta y cuál es su naturaleza?
#### Respuesta
Los costos de venta agrupan la acumulación de los costos directos e indirectos necesarios para prestar servicios o vender productos. Su naturaleza es débito, lo que significa que aumentan por el lado del débito y disminuyen por el lado del crédito.

### ¿Qué son los costos de producción y cuál es su naturaleza?
#### Respuesta
Los costos de producción agrupan todas las salidas de dinero asociadas directamente con la elaboración de un producto. Su naturaleza es débito, lo que significa que aumentan por el lado del débito y disminuyen por el lado del crédito.

### ¿Cómo se construye el balance general o estado de situación financiera?
#### Respuesta
El balance general o estado de situación financiera se construye utilizando las cuentas del activo, del pasivo y del patrimonio (cuentas 1, 2 y 3 del PUC).

### ¿Cómo se construye el estado de resultados?
#### Respuesta
El estado de resultados se construye utilizando las cuentas de ingresos, gastos, costos de venta y costos de producción (cuentas 4, 5, 6 y 7 del PUC).

### ¿Qué es la ecuación patrimonial?
#### Respuesta
La ecuación patrimonial establece que el Activo es igual al Pasivo más el Patrimonio (Activo = Pasivo + Patrimonio). Esta ecuación debe cumplirse al construir el balance general o estado de situación financiera.

### ¿Cómo se registran contablemente los aportes de los socios en efectivo?
#### Respuesta
1.  **Aumenta la cuenta de Caja (1105):** Se registra un débito por el valor del aporte.
2.  **Aumenta la cuenta de Aporte de Socios (3115):** Se registra un crédito por el mismo valor.

### ¿Cómo se registra contablemente el traslado de dinero de la caja al banco?
#### Respuesta
1.  **Disminuye la cuenta de Caja (1105):** Se registra un crédito por el valor trasladado.
2.  **Aumenta la cuenta de Bancos (1110):** Se registra un débito por el mismo valor.

### ¿Cómo se registra contablemente la compra de mercancía a crédito?
#### Respuesta
1.  **Aumenta la cuenta de Inventarios (14XX):** Se registra un débito por el costo de la mercancía.
2.  **Aumenta la cuenta de Cuentas por Pagar a Proveedores (2205):** Se registra un crédito por el mismo valor.

### ¿Cómo se registra contablemente la venta de mercancía en efectivo?
#### Respuesta
Se deben realizar cuatro registros:
1.  **Aumenta la cuenta de Caja (1105):** Se registra un débito por el precio de venta.
2.  **Disminuye la cuenta de Inventarios (14XX):** Se registra un crédito por el costo de la mercancía vendida.
3.  **Aumenta la cuenta de Costo de Ventas (6135):** Se registra un débito por el costo de la mercancía vendida.
4.  **Aumenta la cuenta de Ingresos por Ventas (4135):** Se registra un crédito por el precio de venta.

### ¿Cómo se registra contablemente la venta de mercancía a crédito?
#### Respuesta
Se deben realizar cuatro registros:
1.  **Aumenta la cuenta de Cuentas por Cobrar a Clientes (1305):** Se registra un débito por el precio de venta.
2.  **Disminuye la cuenta de Inventarios (14XX):** Se registra un crédito por el costo de la mercancía vendida.
3.  **Aumenta la cuenta de Costo de Ventas (6135):** Se registra un débito por el costo de la mercancía vendida.
4.  **Aumenta la cuenta de Ingresos por Ventas (4135):** Se registra un crédito por el precio de venta.

### ¿Cómo se registra contablemente el pago a un proveedor, mitad en efectivo y mitad por transferencia bancaria?
#### Respuesta
1.  **Disminuye la cuenta de Cuentas por Pagar a Proveedores (2205):** Se registra un débito por el valor total de la deuda pagada.
2.  **Disminuye la cuenta de Caja (1105):** Se registra un crédito por el 50% del valor pagado en efectivo.
3.  **Disminuye la cuenta de Bancos (1110):** Se registra un crédito por el 50% del valor pagado por transferencia bancaria.

### ¿Cómo se registra contablemente el pago de arrendamiento en efectivo?
#### Respuesta
1.  **Disminuye la cuenta de Caja (1105):** Se registra un crédito por el valor del arrendamiento pagado.
2.  **Aumenta la cuenta de Gastos de Arrendamiento (5XXX):** Se registra un débito por el mismo valor.

### ¿Qué es el costo promedio ponderado y cómo se calcula?
#### Respuesta
El costo promedio ponderado es un método de valoración de inventarios que calcula el costo promedio de los productos en el inventario. Se calcula dividiendo el costo total de los productos en el inventario entre la cantidad total de unidades en el inventario. En ContaPyme, este es el método de valoración de inventarios utilizado.
**Fórmula:** Costo Promedio Ponderado = (Costo Total de los Productos en el Inventario) / (Cantidad Total de Unidades en el Inventario)

### ¿Qué otros métodos de valoración de inventarios existen y por qué no se utilizan en ContaPyme?
#### Respuesta
Existen otros métodos como:
- **PEPS (Primeras en Entrar, Primeras en Salir):** El primer artículo que entra al inventario, es el primero que se vende.
- **UEPS (Últimas en Entrar, Primeras en Salir):** El último artículo que entra al inventario, es el primero que se vende.

Estos métodos no se utilizan en ContaPyme porque las NIF (Normas Internacionales de Información Financiera) establecen que el método aceptado para valorar los inventarios es el costo promedio ponderado.

### ¿Qué son los estados financieros?
#### Respuesta
Los estados financieros son una representación estructurada de la situación financiera y los rendimientos de una empresa. Su objetivo es suministrar información acerca de la situación financiera de la empresa, su rendimiento y sus flujos de efectivo.

### ¿Cuáles son los estados financieros?
#### Respuesta
Los estados financieros son:
1.  **Balance General o Estado de Situación Financiera:** Muestra la situación financiera de la empresa, analizando el activo, pasivo y patrimonio.
2.  **Estado de Resultados:** Muestra las pérdidas y ganancias, analizando los ingresos, gastos y costos.
3.  **Estado de Cambios en el Patrimonio:** Muestra la variación del patrimonio en un tiempo determinado.
4.  **Estado de Flujos de Efectivo:** Muestra cómo varía el estado de la caja o del banco.
5.  **Políticas, Notas y Revelaciones a los Estados Financieros:** Detalle descriptivo y cuantitativo para cada uno de los cuatro ejercicios anteriores.

### ¿Qué son los libros legales o contables?
#### Respuesta
Los libros legales son archivos o documentos donde se plasma información de la empresa. Pueden ser de carácter obligatorio o voluntario. Ejemplos de libros obligatorios son el caja diario y el libro de inventario y balances. Un ejemplo de libro voluntario es el mayor y balances.

### ¿Cuánto tiempo se deben conservar los libros contables y documentación?
#### Respuesta
Según el Código de Comercio, todos los empresarios deben conservar los libros contables y toda la documentación durante 6 años.

### ¿Qué son los certificados tributarios?
#### Respuesta
Los certificados tributarios son documentos que le indican a una persona los impuestos o cualquier otro monto con el que se involucró en obligaciones tributarias.

### ¿Qué son los anexos tributarios?
#### Respuesta
Un anexo tributario se utiliza para verificar todas las transacciones entre contribuyentes y permite analizar la relación de los registros generados con una empresa, cliente, proveedor o empleado para la declaración de impuestos.

---

# Cálculo automático de impuestos
[Ver el video](https://www.youtube.com/watch?v=4Ntl1p9jhrc)
Cálculo automático de impuestos.

## Tema principal
Configuración en ContaPyme para el cálculo automático de impuestos.

## Resumen general
Este video explica cómo configurar ContaPyme para que calcule automáticamente los impuestos en tus transacciones. Aprenderás a revisar y configurar la clasificación tributaria de tu empresa y tus terceros (clientes/proveedores), la configuración de las cuentas contables (ingresos/gastos) y los conceptos de liquidación de impuestos (IVA, retenciones, etc.). Al final, se muestra cómo realizar un ejercicio contable y verificar que los impuestos se calculen correctamente.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las cuatro configuraciones principales que debo revisar en ContaPyme para asegurar el cálculo automático correcto de impuestos?
#### Respuesta
Las cuatro configuraciones principales son:
1.  Clasificación legal de la empresa.
2.  Clasificación legal del tercero (cliente o proveedor).
3.  Configuración de la cuenta contable (ingreso o gasto).
4.  Configuración de los conceptos de liquidación (ingreso o egreso).

### ¿Cómo reviso la clasificación tributaria de mi empresa en ContaPyme?
#### Respuesta
Para revisar la clasificación tributaria de tu empresa, sigue estos pasos:

1.  Dirígete al **Menú Básico > Catálogo de Empresa > Explorador Gráfico de Empresas.**
2.  Ubícate sobre la empresa deseada y haz clic en **Modificar.**
3.  En la ventana que se abre, encontrarás la opción **Clasificación Tributaria.** Aquí puedes ver y modificar la información.

### ¿Dónde encuentro la clasificación tributaria de mis clientes o proveedores en ContaPyme?
#### Respuesta
Para revisar la clasificación tributaria de un tercero, sigue estos pasos:

1.  Ve al **Catálogo de Terceros.**
2.  Ubícate sobre el tercero deseado y abre el **formulario completo.**
3.  Dentro del formulario, selecciona la pestaña **Clasificación Tributaria.** Allí encontrarás la información.

### ¿Qué debo hacer si necesito actualizar la clasificación tributaria de un tercero?
#### Respuesta
Puedes obtener la información necesaria de las siguientes maneras:

1.  Solicita al tercero una copia de su **RUT (Registro Único Tributario)**.
2.  Pregunta directamente al tercero sobre su clasificación tributaria.

Luego, actualiza la información en el sistema siguiendo los pasos indicados en la pregunta anterior.

### ¿Cómo configuro una cuenta contable para que calcule impuestos automáticamente en ContaPyme?
#### Respuesta
Debes verificar que la cuenta tenga asignados los impuestos correspondientes. Los pasos son:

1.  Ingresa al **Plan Único de Cuentas.**
2.  Busca y selecciona la cuenta que deseas configurar.
3.  Verifica que en las opciones de la cuenta estén configurados los impuestos correspondientes (IVA, retenciones, etc.). Si la cuenta está configurada como de clase normal (4 o 5), aparecerán las opciones para indicar descuentos o impuestos.

### ¿Dónde encuentro los catálogos de conceptos de liquidación de impuestos en ContaPyme?
#### Respuesta
Los catálogos se encuentran en el siguiente menú:

**Contabilidad > Plan de Cuentas > Catálogos de Conceptos de Liquidación en Ingreso** (para cuentas 4) o **Catálogos de Conceptos de Liquidación en Egreso** (para cuentas 5).

### ¿Cómo reviso la configuración de un concepto de liquidación de impuestos específico (ej: IVA V19) en ContaPyme?
#### Respuesta
1.  Ve a **Contabilidad > Plan de Cuentas > Catálogos de Conceptos de Liquidación en Ingreso** (o Egreso, según corresponda).
2.  Busca el concepto de liquidación que deseas revisar (ej: IVA V16).
3.  Selecciona el concepto y haz clic en **Modificar**.

### ¿Qué significan los "hijos condicionados" dentro de la configuración de un concepto de liquidación agrupador como el IVA V16?
#### Respuesta
Los "hijos condicionados" son subnodos que definen las diferentes condiciones bajo las cuales aplica un concepto de liquidación agrupador. Por ejemplo, el IVA V16 puede tener hijos que especifiquen diferentes porcentajes de IVA según el año de vigencia o las características del contribuyente.

### ¿Cómo puedo ver las condiciones (aplica/no aplica) que determinan cuándo se calcula un impuesto en ContaPyme?
#### Respuesta
1.  Ingresa al concepto de liquidación deseado como se explicó anteriormente.
2.  Busca la sección de **Condiciones**.
3.  Allí verás dos secciones: "Aplicar a" y "No Aplicar a". En "Aplicar a" se definen las condiciones bajo las cuales el impuesto se calcula, y en "No Aplicar a" las condiciones en las que no se calcula. Las condiciones se basan en atributos de la empresa y del tercero.

### ¿Cómo hago para que ContaPyme calcule automáticamente los impuestos en un movimiento contable?
#### Respuesta
1.  Ve al **Manejador de Operaciones > Más Operaciones > Contabilidad > Movimiento Contable.**
2.  Completa la información general del movimiento (tipo de documento, fecha, detalle, etc.).
3.  Selecciona la cuenta contable, centro de costos y tercero.
4.  Ingresa el monto.
5.  Haz clic en el botón **Calcular Automáticamente Impuestos.**

### ¿Cómo hago para que ContaPyme calcule automáticamente los impuestos en una operación de gastos o ingresos?
#### Respuesta
El proceso es similar, pero la opción de calcular impuestos se encuentra en una sección diferente:

1.  Crea una operación de **Gastos** o **Ingresos**.
2.  Ingresa la información básica (tercero, cuenta, valor, etc.).
3.  Luego, busca la sección de **Conceptos de Liquidación (Impuestos)**.
4.  Dentro de esta sección, haz clic en **Calcular Automáticamente Impuestos.**

### Si la configuración de la empresa y del tercero son correctas, ¿por qué ContaPyme no calcula los impuestos automáticamente?
#### Respuesta
La causa más probable es que la cuenta contable que estás utilizando no tenga configurados los impuestos correspondientes. Revisa la configuración de la cuenta en el Plan Único de Cuentas y asegúrate de que tenga asignados los conceptos de liquidación de impuestos correctos (IVA, retenciones, etc.).

---

# Políticas, notas y revelaciones I - Comunidad ContaPyme
[Ver el video](https://www.youtube.com/watch?v=7hTjXU_oIiw)
[Políticas, notas y revelaciones I - Comunidad ContaPyme]

## Tema principal
Políticas contables, cambios en estimaciones, errores y revelaciones bajo NIIF.

## Resumen general
Este video presenta una introducción a las políticas contables, cambios en estimaciones, errores y revelaciones bajo las Normas Internacionales de Información Financiera (NIIF). El Dr. Hernán Buitrago explica la importancia de las políticas contables como directrices para el reconocimiento de hechos económicos y la preparación de estados financieros. Se aprende a diferenciar entre políticas y procedimientos contables, el tratamiento de cambios en estimaciones (prospectivo) y políticas (retroactivo), y la estructura de las notas a los estados financieros para una mejor comprensión de la información financiera.

## Preguntas Frecuentes (FAQ)

### ¿Qué son las políticas contables?
#### Respuesta
Las políticas contables son los principios, bases, convenciones, reglas y procedimientos específicos adoptados por una entidad para preparar y presentar sus estados financieros. Definen cómo se reconocen los hechos económicos dentro de la organización bajo los estándares internacionales.

### ¿Cuál es el objetivo fundamental de definir una política contable?
#### Respuesta
El objetivo fundamental es la preparación de un juego completo de estados financieros bajo las NIIF. Este juego completo incluye el Estado de Situación Financiera, el Estado de Resultados Integrales, el Estado de Cambios en el Patrimonio y el Estado de Flujos de Efectivo.

### ¿Quién debe preparar las políticas contables en una organización?
#### Respuesta
Si bien el departamento financiero puede liderar la elaboración, es crucial la participación de todas las áreas de la organización. Los líderes de cada área conocen sus procesos y pueden documentarlos adecuadamente en las políticas contables.

### ¿Qué elementos conforman los estados financieros y cómo se relacionan con las políticas contables?
#### Respuesta
Los elementos que conforman los estados financieros son el activo, el pasivo, el patrimonio, el ingreso, el gasto y el costo. Las políticas contables establecen las directrices para el reconocimiento de estos elementos al registrar los hechos económicos.

### ¿Cuáles son los cuatro aspectos fundamentales que se deben conjugar al definir políticas contables?
#### Respuesta
Se deben conjugar los principios, bases, convenios y reglas definidos para entender los estados financieros. El objetivo es elaborar y presentar estados financieros que respondan a las necesidades de la entidad y generen información adecuada para los usuarios.

### ¿Cuál es la diferencia entre una política contable y un procedimiento contable?
#### Respuesta
Las políticas contables son los principios generales que rigen el reconocimiento de los hechos económicos. Los procedimientos contables son la secuencia de pasos instructivos para registrar las transacciones. Los procedimientos pueden cambiar fácilmente, sin necesariamente implicar un cambio en la política contable.

### ¿Qué bases de aplicación del estándar internacional se deben tener en cuenta al definir las políticas contables?
#### Respuesta
Se deben tener en cuenta el reconocimiento, la medición inicial, la medición posterior, la presentación y la revelación.

### ¿Pueden los procedimientos contables ser parte integral del documento de políticas contables?
#### Respuesta
No es recomendable que los procedimientos sean una parte integral de la política. Es preferible referenciarlos como anexos, ya que los cambios en procedimientos no deberían implicar automáticamente cambios en las políticas.

### ¿Qué ocurre si se incluyen procedimientos contables en la política contable y un procedimiento se modifica?
#### Respuesta
Una modificación en un procedimiento podría ocasionar un cambio en una política contable, lo que podría llevar a una reexpresión de estados financieros, según la NIC 8 y la sección 10.

### ¿Qué significa la uniformidad en las políticas contables?
#### Respuesta
La uniformidad implica conservar el mismo lineamiento para el reconocimiento de hechos económicos similares. No significa que se deban tener los mismos criterios de medición para todos los hechos económicos, pero sí que los estados financieros se preparen bajo las mismas bases definidas en las políticas.

### ¿Qué es un cambio en una estimación contable y qué efecto tiene?
#### Respuesta
Un cambio en una estimación contable es un ajuste al importe en libros de un activo o pasivo debido a la evaluación de su situación actual (por ejemplo, un cambio en la vida útil de un activo). Tiene un efecto prospectivo, es decir, se aplica desde el momento del cambio hacia adelante, sin afectar los resultados de periodos anteriores.

### ¿Qué es un error en una política contable y qué efecto tiene?
#### Respuesta
Un error es una omisión o inexactitud en los estados financieros de uno o más periodos. Un error en la política contable tiene un efecto retroactivo, lo que significa que se debe corregir el error en el periodo en el que se detecta y reexpresar los estados financieros de los periodos anteriores afectados.

### ¿Qué fuentes se deben tener en cuenta al desarrollar y aplicar una política contable?
#### Respuesta
Se deben tener en cuenta las siguientes fuentes en orden descendente:
1.  Los requerimientos y guías establecidos en cada una de las NIIF, que traten cuestiones similares.
2.  Las definiciones y criterios de reconocimiento, medición inicial, medición posterior, presentación y revelación para el tratamiento de los elementos de los estados financieros.

### ¿Cuándo se puede cambiar una política contable?
#### Respuesta
Una política contable se puede cambiar solo en dos casos:
1.  Si el cambio es requerido por una modificación en una NIIF.
2.  Si el cambio resulta en que los estados financieros proporcionen información más fiable y relevante sobre los efectos de las transacciones.

### ¿Qué significa que un cambio en una política contable tenga una aplicación retroactiva?
#### Respuesta
Significa que la nueva política contable se aplica a las transacciones, sucesos y condiciones como si se hubiera aplicado siempre. Esto implica reexpresar la información comparativa en los estados financieros para reflejar los efectos de la nueva política en los periodos anteriores.

### ¿Qué implicaciones tiene contablemente un cambio en la política contable con aplicación retroactiva?
#### Respuesta
La transacción contable va a tener una contrapartida que directamente me va a afectar los resultados de los ejercicios anteriores, es decir, afecta la cuenta de utilidades acumuladas o retenidas en el patrimonio.

### ¿Qué se debe hacer si la corrección de un error es impracticable?
#### Respuesta
Si la corrección del error es impracticable, se reexpresarán los saldos iniciales más antiguos en los cuales tal reexpresión sea practicable.

### ¿Cuáles son los objetivos fundamentales de la estructura de las notas a los estados financieros?
#### Respuesta
Los objetivos fundamentales son:
1. Presentar información sobre las bases para la preparación de los estados financieros y sobre las políticas contables específicas utilizadas.
2. Revelar la información requerida por cada una de las NIIF, que no se presente en otro lugar de los estados financieros.
3. Proporcionar información adicional que no se presente en los estados financieros, pero que sea relevante para su comprensión.

### ¿Qué orden se sugiere para la presentación de las notas a los estados financieros?
#### Respuesta
Se sugiere el siguiente orden:
1. Declaración de que los estados financieros se han elaborado cumpliendo con las NIIF.
2. Resumen de las políticas contables más significativas de la organización.
3. Información de apoyo para las partidas presentadas en los estados financieros, en el mismo orden en que se presentan.
4. Cualquier otra información que se considere relevante y que forme parte importante del juego completo de los estados financieros.

---

# Programa contable ContaPyme - Movimiento contable generado por operaciones
[Ver el video](https://www.youtube.com/watch?v=Zgmxz3jmFNU)
Programa contable ContaPyme - Movimiento contable generado por operaciones

## Tema principal
Visualización del movimiento contable de operaciones en un periodo específico.

## Resumen general
Este video explica cómo generar un informe en ContaPyme que muestra el movimiento contable detallado de las operaciones realizadas durante un período de tiempo determinado. Aprenderás a configurar los filtros por fecha, tercero, cuenta y número de operación para obtener la información precisa que necesitas. El informe detalla cada operación, incluyendo la fecha, tipo de documento, número de documento, cuentas afectadas, terceros, centros de costo, valores débito y crédito, proporcionando una visión clara de la actividad contable.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de movimiento contable generado por operaciones?
#### Respuesta
El informe de movimiento contable generado por operaciones en ContaPyme permite visualizar el detalle de los movimientos contables asociados a cada operación realizada dentro de un rango de fechas específico.

### ¿Cómo puedo acceder al informe de movimiento contable generado por operaciones en ContaPyme?
#### Respuesta
Para generar el informe, debes seguir la siguiente ruta:
1. Ir a la pestaña **Contabilidad**.
2. Seleccionar **Otros Reportes Contables**.
3. Elegir **Movimiento Contable**.
4. Finalmente, seleccionar **Movimiento Contable Generado por Operaciones**.

### ¿Qué opciones de configuración están disponibles al generar el informe?
#### Respuesta
Al generar el informe, puedes configurar las siguientes opciones:
*   **Fecha inicial y fecha final:** Define el rango de fechas para el informe.
*   **Tercero desde y tercero hasta:** Define un tercero específico o un rango de terceros.
*   **Cuenta desde y cuenta hasta:** Define una cuenta específica o un rango de cuentas.
*   **Número de operación desde y número de operación hasta:** Especifica una operación en particular o un rango de operaciones.
*   **Tipo de documento:** Permite filtrar por tipo de documento.
*   **Filtro:** Permite realizar filtros personalizados.

### ¿Qué sucede si no especifico ningún valor en los campos de filtro (tercero, cuenta, número de operación)?
#### Respuesta
Si dejas los campos de filtro vacíos, el sistema incluirá **todas las operaciones, todas las cuentas y todos los terceros** en el informe generado.

### ¿Qué información se muestra en el informe de movimiento contable generado por operaciones?
#### Respuesta
El informe muestra las siguientes columnas para cada operación:
*   **Número de operación**
*   **Fecha de soporte**
*   **Tipo de documento**
*   **Número de documento**
*   **Clasificación**
*   **Detalle de la operación**
*   **Cuenta (código)**
*   **Tercero (código)**
*   **Centro de costos (código)**
*   **Detalle (descripción del movimiento)**
*   **Valor base** (si aplica)
*   **Débito**
*   **Crédito**
*   **Total de movimientos débito**
*   **Total de movimientos crédito**

### ¿Cómo puedo generar el informe para una operación específica?
#### Respuesta
Para generar el informe solo para una operación, debes ingresar el número de la operación en los campos **Número de operación desde** y **Número de operación hasta**, y luego hacer clic en "Ver Reporte".

### ¿Cómo puedo actualizar el informe después de realizar cambios en los filtros?
#### Respuesta
Después de realizar cambios en los filtros, haz clic en el botón "Recalcular" para que el sistema actualice el informe con la nueva información.

### ¿Dónde puedo ver los totales de los movimientos débito y crédito en el informe?
#### Respuesta
Los totales de los movimientos débito y crédito generados por todas las operaciones dentro del periodo de consulta se muestran al final del informe.

---

# Programa de contabilidad ContaPyme - Numeración de libros
[Ver el video](https://www.youtube.com/watch?v=klNBjP-1pyU)
[klNBjP-1pyU]

## Tema principal
Generación del informe de numeración de libros en ContaPyme para su posterior registro en la Cámara de Comercio.

## Resumen general
Este video explica cómo generar el informe de numeración de libros en ContaPyme, un proceso necesario para registrar los libros contables en la Cámara de Comercio y utilizarlos como soporte legal. El video muestra el paso a paso para acceder a la función de numeración de libros, configurar los parámetros como el nombre del libro y el rango de numeración, y cómo modificar estos datos si es necesario. Se aprende a generar el informe listo para ser impreso y presentado ante la Cámara de Comercio.

## Preguntas Frecuentes (FAQ)

### ¿Para qué sirve la numeración de libros en ContaPyme?
#### Respuesta
La numeración de libros en ContaPyme sirve para generar un informe que luego se registra en la Cámara de Comercio. Este registro permite utilizar los libros contables como prueba o soporte en investigaciones legales o penales.

### ¿Qué tipo de libros se pueden numerar en ContaPyme?
#### Respuesta
Los libros que se pueden numerar en ContaPyme son:
*   Libro Mayor y Balances
*   Libro de Inventario y Balances
*   Libro de Caja Diario

### ¿Cómo se genera el informe de numeración de libros en ContaPyme?
#### Respuesta
Para generar el informe de numeración de libros, siga estos pasos:

1.  Diríjase a la pestaña **Contabilidad**.
2.  Ubique el campo **Informes**.
3.  Seleccione **Otros Reportes Contables**.
4.  Despliegue la pestaña **Otros**.
5.  Haga clic en **Numeración de Libros**.

### ¿Qué información se debe ingresar en la ventana de numeración de libros?
#### Respuesta
En la ventana de numeración de libros, se debe ingresar la siguiente información:

*   Nombre del libro.
*   Numeración desde (página inicial).
*   Numeración hasta (página final).
*   Tamaño de la letra (por lo general se deja por defecto).
*   Márgenes horizontal y vertical (por lo general se dejan por defecto).

### ¿Cómo puedo cambiar el nombre o la numeración de un libro después de haber generado el informe?
#### Respuesta
Para cambiar el nombre o la numeración de un libro después de haber generado el informe, siga estos pasos:

1.  Dentro del informe generado, ubique la cinta de opciones.
2.  Haga clic en el campo **Ver Datos**.
3.  Se abrirá de nuevo la caja de diálogo inicial.
4.  Modifique el nombre del libro, la numeración o cualquier otro campo necesario.
5.  Haga clic en el botón **Recalcular**. El sistema aplicará los cambios automáticamente.

### ¿Cómo puedo codificar el libro de Inventarios y Balances al numerarlo?
#### Respuesta
Cuando genere la numeración del libro de Inventarios y Balances, en el campo "Nombre del libro" puede asignarle un código o abreviatura que lo identifique, por ejemplo "IIB".

---

# Programa de contabilidad ContaPyme - Tipos de cambios de moneda a usar
[Ver el video](https://www.youtube.com/watch?v=_eJ0fi3M9wE)
_eJ0fi3M9wE

## Tema principal
Configuración de tasas de cambio para manejo de moneda extranjera en ContaPyme.

## Resumen general
Este video explica las dos opciones disponibles en ContaPyme para el registro de tasas de cambio de moneda extranjera: tasa de cambio general y tasa de compra/venta. Describe cómo cada opción afecta la conversión de moneda en transacciones y el ajuste por diferencia en cambio. El video también explica cómo activar cada opción dentro de la configuración del sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué significa la tasa de cambio al manejar moneda extranjera en ContaPyme?
#### Respuesta
La tasa de cambio representa el valor de una moneda extranjera expresada en unidades de la moneda local.

### ¿Qué opciones ofrece ContaPyme para el registro de la tasa de cambio de moneda extranjera?
#### Respuesta
ContaPyme ofrece dos opciones:
1.  Una tasa de cambio general para cada moneda.
2.  Una tasa de compra y una tasa de venta para cada moneda.

### ¿Qué es la tasa de cambio general en ContaPyme?
#### Respuesta
La tasa de cambio general es una única tasa que se registra por cada moneda extranjera. El sistema utiliza esta tasa tanto para la conversión de moneda extranjera a moneda local en las transacciones, como para los ajustes por diferencia en cambio.

### ¿Dónde se configura la opción de tasa de cambio general en ContaPyme?
#### Respuesta
Para activar esta opción debes ingresar a la configuración del manejo de moneda extranjera, que se encuentra en la configuración del catálogo de cuentas.
Esta opción de tasa de cambio general es la que viene configurada en el sistema por defecto. No se proporciona la ruta exacta del menú en la transcripción.

### ¿Qué es la tasa de compra y tasa de venta en ContaPyme?
#### Respuesta
Esta opción permite registrar dos tasas diferentes para cada moneda: una tasa de compra y una tasa de venta.

### Cuando se usa la opción de tasa de compra y tasa de venta, ¿qué tasa se utiliza para la conversión de moneda extranjera a moneda local en las transacciones?
#### Respuesta
Siempre se utiliza la tasa de venta para convertir moneda extranjera a moneda local en las transacciones.

### Cuando se usa la opción de tasa de compra y tasa de venta, ¿qué tasa se utiliza para los ajustes por diferencia en cambio?
#### Respuesta
Depende del tipo de cuenta:
*   Las cuentas del activo se ajustan con base a la tasa de compra.
*   Las cuentas del pasivo se ajustan con base a la tasa de venta.

### ¿Dónde se activa la opción de tasa de compra y tasa de venta en ContaPyme?
#### Respuesta
Para activar esta opción debes ingresar a la configuración del manejo de moneda extranjera y activar la opción tasa de compra y tasa de venta, que se encuentra en la configuración del cambio de moneda a usar. No se proporciona la ruta exacta del menú en la transcripción.

---

# Sistema contable ContaPyme - Efecto del movimiento contable en los informes
[Ver el video](https://www.youtube.com/watch?v=Vnf5WYEVL7o)
Vnf5WYEVL7o

## Tema principal
Cómo los movimientos contables afectan los informes en ContaPyme.

## Resumen general
Este video explica cómo el procesamiento de una operación en ContaPyme genera movimientos contables que se reflejan automáticamente en los informes financieros. Se muestra un ejemplo práctico de cómo el pago de un arrendamiento afecta el saldo de las cuentas de gastos y bancos en el informe de Mayor y Balances. Además, se explica que al desprocesar una operación, los movimientos contables asociados se eliminan de los informes, restaurando los saldos anteriores.

## Preguntas Frecuentes (FAQ)

### ¿Qué sucede cuando se procesa una operación en ContaPyme?
#### Respuesta
Cuando se procesa una operación en ContaPyme, el sistema interpreta la información contenida en ella y la convierte en movimientos contables, movimientos de inventarios, de ejecución presupuestal, de activos o de costos, según el tipo de operación. Estos movimientos se cargan y se reflejan en los diferentes informes.

### ¿Qué tipo de cuentas se ven afectadas por una operación de pago de arrendamiento de oficina?
#### Respuesta
Una operación de pago de arrendamiento de oficina afecta las cuentas de gastos (arrendamiento), cuentas de impuestos (pasivo) y la cuenta del banco.

### ¿Qué informe se utiliza en el video para verificar el efecto de un movimiento contable?
#### Respuesta
Se utiliza el informe de Mayor y Balances para verificar el efecto de un movimiento contable en los saldos de las cuentas. Este informe muestra los saldos de las cuentas de balance y de resultado.

### ¿Cómo se actualizan los saldos en el informe después de procesar una operación?
#### Respuesta
Después de procesar una operación, es necesario refrescar el informe para ver los saldos actualizados. En la cinta de opciones del informe, se debe activar el botón de refrescar.

### ¿Qué sucede con los informes si se desprocesa una operación?
#### Respuesta
Si se desprocesa una operación, los movimientos contables asociados a esa operación desaparecen de los informes y los saldos de las cuentas vuelven a su estado anterior.

### ¿Cómo puedo revertir el efecto de una operación en los informes?
#### Respuesta
Para revertir el efecto de una operación en los informes, debes desprocesar la operación. Luego, debes regresar al informe y dar clic en el botón de refrescar que está en la cinta de opciones. Esto actualizará los saldos y mostrará los valores anteriores a la operación.

---

# Sistema contable ContaPyme - Encabezado de la operación
[Ver el video](https://www.youtube.com/watch?v=4B40cbJ_gt4)
[Sistema contable ContaPyme - Encabezado de la operación]

## Tema principal
Descripción y función del encabezado en las operaciones de ContaPyme.

## Resumen general
Este video explica la importancia y los campos que componen el encabezado de las operaciones en ContaPyme.  Se describe cómo el encabezado, siendo común a todas las operaciones independientemente del módulo, solicita información vital como el tipo y número de documento de soporte, centro de costos base, detalle de la operación, clase de operación y fecha de soporte. El video detalla la función de cada campo y cómo estos datos son cruciales para el registro adecuado de los hechos administrativos y para la gestión de la información en el sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una operación en ContaPyme?
#### Respuesta
Una operación es un asistente que el sistema ofrece para el registro de un hecho o evento administrativo que ocurre en la empresa. El sistema ofrece una variedad de operaciones, dependiendo del tipo de licenciamiento y del evento administrativo a registrar.

### ¿Qué información se solicita en el encabezado de una operación?
#### Respuesta
El encabezado de una operación solicita la siguiente información:
*   Tipo de documento de soporte.
*   Número del documento.
*   Centro de costos base (opcional).
*   Detalle de la operación.
*   Clase de operación (opcional).
*   Fecha de soporte.

### ¿Qué debo hacer si el documento de soporte que necesito no está en la lista?
#### Respuesta
Si el documento de soporte requerido no se encuentra en la lista, debe crearlo. Para mayor información sobre cómo hacerlo, consulte el video "Creación de un documento de soporte".

### ¿Cómo funciona el campo "Centro de costos base" en el encabezado de la operación?
#### Respuesta
El centro de costos base es un campo opcional que permite especificar un centro de costos que se usará como base para la digitación de los centros de costos en el cuerpo de la operación.

**Ejemplo:** Si se indica el código 1DA como centro de costos base para el departamento administrativo, al digitar los centros de costos en el cuerpo de la operación, solo se necesitará indicar el código de la sección (SA para administración, SP para personal, ST para tesorería), y el sistema completará el código con el centro de costos base (1DA).  Al seleccionar un centro de costos dando doble clic, el sistema mostrará solo los centros de costos hijos del centro de costos base.

### ¿Cuál es la importancia del "Detalle de la operación" en el encabezado?
#### Respuesta
El "Detalle de la operación" es importante porque registra información que estará visible en el manejador de operaciones.  Se utiliza para indicar el objetivo del registro de la operación y permite realizar búsquedas en el manejador de operaciones.

### ¿Para qué sirve la "Clase de operación" en el encabezado?
#### Respuesta
La "Clase de operación" es un campo opcional que se utiliza para clasificar las operaciones con diferentes objetivos. Uno de ellos es utilizar este campo como filtro en el manejador de operaciones o al generar informes. Por ejemplo, se puede usar para clasificar las operaciones por empresa cuando se lleva la contabilidad de varias empresas en una misma base de datos. Para mayor información sobre la configuración de las clases de operación, consulte el video "Clasificación de las operaciones".

### ¿Qué fecha se usa por defecto en la "Fecha de soporte" y cómo puedo cambiarla?
#### Respuesta
El sistema sugiere como fecha de soporte la fecha de trabajo configurada en el sistema. Sin embargo, el usuario puede cambiarla e indicar la fecha en la cual requiere que se carguen los movimientos que va a generar la operación.

### ¿Dónde puedo encontrar más información sobre el formato de numeración del documento de soporte?
#### Respuesta
Para mayor información sobre el formato de numeración del documento de soporte, consulte el video "Explicación de la definición de la máscara de un documento de soporte".

---

# Sistema contable ContaPyme - Selección de cuenta, cc y tercero
[Ver el video](https://www.youtube.com/watch?v=tSwBBOb4WJI)
Sistema contable ContaPyme - Selección de cuenta, cc y tercero

## Tema principal
Selección de cuenta contable, centro de costos y tercero en un movimiento contable dentro de ContaPyme.

## Resumen general
Este video explica cómo seleccionar cuentas contables, centros de costos y terceros al registrar un movimiento contable en ContaPyme. Se detallan tres métodos principales para realizar estas selecciones: digitando directamente el código si se conoce, utilizando el botón de referencia (icono de linterna) para abrir el catálogo correspondiente, o haciendo doble clic en la celda para acceder también al catálogo. El video también indica que algunas cuentas, como las de ingresos, gastos y costos, requieren la selección de un centro de costos.

## Preguntas Frecuentes (FAQ)

### ¿Dónde se seleccionan la cuenta contable, el centro de costos y el tercero en ContaPyme?
#### Respuesta
Estas selecciones se realizan en la operación de movimiento contable, en las columnas designadas para cada uno: cuenta, centro de costos y tercero.

### ¿Cómo puedo seleccionar una cuenta contable en ContaPyme si conozco su código?
#### Respuesta
Puedes digitar directamente el código de la cuenta en la columna correspondiente.

### ¿Qué hago si no recuerdo el código de la cuenta contable que necesito?
#### Respuesta
Puedes utilizar el catálogo de cuentas. Para acceder a él, tienes dos opciones:
1.  Dar clic en el botón de referencia (icono de la linterna) que se encuentra en la parte superior.
2.  Dar doble clic sobre la celda de la cuenta que deseas seleccionar.

Una vez abierto el catálogo, selecciona la cuenta deseada y haz clic en el botón "Seleccionar".

### ¿Cómo se selecciona un centro de costos?
#### Respuesta
Para seleccionar un centro de costos, puedes:
1. Digitar directamente el código del centro de costos si lo conoces.
2. Abrir el listado de centros de costos dando doble clic en la celda correspondiente o utilizando el botón de referencia. Luego, selecciona el centro de costos deseado y haz clic en el botón "Seleccionar".

### ¿Todas las cuentas requieren la selección de un centro de costos?
#### Respuesta
No, solo algunas cuentas requieren la selección de un centro de costos, como las de ingresos, gastos y costos.

### ¿Cómo se selecciona un tercero en ContaPyme?
#### Respuesta
Para seleccionar un tercero, puedes:
1. Digitar directamente el código del tercero si lo conoces.
2. Abrir el catálogo de terceros dando doble clic en la celda correspondiente o utilizando el botón de referencia. Luego, selecciona el tercero deseado y haz clic en el botón "Seleccionar".

### ¿Cuáles son las tres formas básicas de seleccionar la cuenta, el centro de costos y el tercero en ContaPyme?
#### Respuesta
Las tres formas básicas son:
1.  **Digitar directamente el código:** Si conoces el código de la cuenta, centro de costos o tercero, puedes escribirlo directamente en la celda correspondiente.
2.  **Doble clic en la celda:** Al hacer doble clic en la celda de la cuenta, centro de costos o tercero, se abrirá el catálogo correspondiente.
3.  **Botón de referencia:** Puedes dar clic en el botón de referencia (icono de la linterna) para abrir el catálogo correspondiente.

---

# Sistema de contabilidad ContaPyme - Estado de cambios en el patrimonio
[Ver el video](https://www.youtube.com/watch?v=6NjZZAWz5us)
[6NjZZAWz5us]

## Tema principal
Generación e interpretación del informe de Estado de Cambios en el Patrimonio en ContaPyme.

## Resumen general
Este video explica cómo generar el informe de Estado de Cambios en el Patrimonio dentro del sistema ContaPyme. Este informe financiero muestra la variación en las cuentas de patrimonio durante un período determinado, reflejando el saldo inicial, el movimiento y el saldo final de cada una de las partidas que lo conforman. El video guía al usuario a través de la configuración del asistente para la generación del informe y la interpretación de los resultados obtenidos.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de Estado de Cambios en el Patrimonio?
#### Respuesta
Es uno de los cinco estados financieros básicos que muestra la variación en las cuentas de patrimonio durante un período específico. Refleja el saldo inicial, el movimiento (aumentos o disminuciones) y el saldo final de cada una de las partidas que conforman el patrimonio, como el capital social, el superávit de capital, las reservas y las utilidades.

### ¿Cuándo se genera el informe de Estado de Cambios en el Patrimonio?
#### Respuesta
Este informe se genera al finalizar el año.

### ¿Cómo se genera el informe de Estado de Cambios en el Patrimonio en ContaPyme?
#### Respuesta
Para generar el informe, siga estos pasos:
1.  Diríjase a la pestaña **Contabilidad**.
2.  Seleccione **Estados Financieros Básicos**.
3.  Dentro de la sección **Otros**, haga clic en **Informe Estado de Cambios en el Patrimonio**.
4.  Se abrirá un asistente donde podrá configurar las opciones del informe.

### ¿Qué opciones de configuración están disponibles en el asistente para la generación del informe?
#### Respuesta
En el asistente, puede configurar lo siguiente:
*   **Fecha para los saldos anteriores:** Define la fecha inicial para calcular los saldos anteriores.
*   **Fecha final:** Define la fecha de corte del informe.
*   **Filtro:** Permite detallar el informe mediante una búsqueda específica.
*   **Nivel de detalle de las cuentas:** Define el nivel de detalle de las cuentas a mostrar en el informe.
*   **Calidad de borrador:** Genera el informe en un formato optimizado para impresoras de matriz de punto.
*   **Incluir un espacio para firmas:** Agrega un espacio para firmas al final del informe.
*   **Incluir un resumen financiero:** Muestra un resumen de los totales de las cuentas de patrimonio.
*   **Tener en cuenta la cancelación de las cuentas de los estados de resultados.**
*   **Visualizar el encabezado de página.**
*   **Visualizar la fecha y hora de generación del informe.**

### ¿Qué información se muestra en el informe generado?
#### Respuesta
El informe muestra:
*   **Encabezado:** Incluye el nombre de la empresa, el NIT y la dirección.
*   **Nombre del estado financiero:** Indica que es el Estado de Cambios en el Patrimonio.
*   **Fecha del período correspondiente:** Muestra el período cubierto por el informe.
*   **Cuentas auxiliares de la cuenta 3 (Patrimonio):** Lista las cuentas que componen el patrimonio.
*   **Descripción:** El nombre de cada cuenta.
*   **Saldo anterior:** El saldo final de la cuenta al inicio del período (por ejemplo, el saldo final del año anterior).
*   **Movimiento:** La variación (aumentos o disminuciones) que ha sufrido la cuenta durante el período consultado.
*   **Saldo final:** El saldo de la cuenta al final del período, teniendo en cuenta el movimiento.
*   **Resumen financiero:** Los totales de las cuentas de patrimonio al finalizar el informe.

### ¿Qué significa la opción "Calidad de borrador" en el asistente?
#### Respuesta
La opción "Calidad de borrador" permite generar el informe en un diseño especializado para las impresoras de matriz de punto.

### ¿Dónde puedo encontrar más información sobre las opciones de configuración del informe?
#### Respuesta
Para obtener más información sobre la configuración del informe, puede consultar el vídeo "Opciones para la obtención de reportes financieros", ubicado en el capítulo de "Informes".

---

# Sistema de contabilidad ContaPyme - Libro diario oficial
[Ver el video](https://www.youtube.com/watch?v=xbAua-kQjIU)
Libro diario oficial

## Tema principal
Generación y comprensión del informe de Libro Diario Oficial en ContaPyme.

## Resumen general
Este video explica qué es el Libro Diario Oficial, un informe contable obligatorio que muestra las transacciones de una empresa en orden cronológico. El video muestra cómo generar este informe dentro de ContaPyme, detallando las opciones de configuración como rango de fechas, cuentas, terceros y centros de costos. Además, describe la estructura del informe, incluyendo saldos iniciales, movimientos débito/crédito, saldos por movimiento y una descripción de cada transacción. Se destaca que el informe garantiza la ecuación contable (débitos = créditos).

## Preguntas Frecuentes (FAQ)

### ¿Qué es el Libro Diario Oficial?
#### Respuesta
El Libro Diario Oficial es un informe que muestra todas las transacciones o asientos realizados por una empresa durante un periodo determinado, ordenadas cronológicamente. Por cada cuenta, discrimina el número de documento de soporte registrado con su respectivo movimiento débito o crédito.

### ¿Quiénes están obligados a llevar el Libro Diario Oficial?
#### Respuesta
Toda empresa que esté obligada a llevar contabilidad debe generar el Libro Diario Oficial cada mes.

### ¿Cómo se genera el Libro Diario Oficial en ContaPyme?
#### Respuesta
Para generar el informe, sigue estos pasos:
1.  Dirígete a la pestaña **Contabilidad**.
2.  Selecciona **Libros Legales**.
3.  Haz clic en **Otros**.
4.  Selecciona la opción **Libro Diario Oficial**.

### ¿Qué opciones de configuración puedo encontrar al generar el Libro Diario Oficial?
#### Respuesta
Al generar el informe, encontrarás las siguientes opciones:
*   **Fecha inicial y fecha final:** Define el periodo para el cual se generará el informe.
*   **Cuenta desde y cuenta hasta:** Permite seleccionar una sola cuenta o un rango de cuentas para el informe. Si no se selecciona ninguna, se incluirán todas.
*   **Tercero desde y tercero hasta:** Permite seleccionar un tercero específico o un rango de terceros para el informe. Si se dejan vacíos, se incluirán todos los terceros.
*   **Centro de Costos:** Permite seleccionar un centro de costos específico para mostrar solo los movimientos relacionados con él.
*   **Filtro:** Permite realizar filtros personalizados para generar el informe.

### ¿Qué información se muestra en el informe del Libro Diario Oficial?
#### Respuesta
El informe muestra la siguiente información por cada cuenta:
*   Código de la cuenta.
*   Saldo inicial (saldo de la cuenta hasta un día antes de la fecha inicial del informe).
*   Fecha de soporte de cada documento (año, mes y día).
*   Tipo de documento de soporte.
*   Número de documento de soporte en el cual se realizó la imputación a la cuenta.
*   Movimientos débito y crédito por cada operación.
*   Saldo por cada movimiento (saldo anterior más débito menos crédito).
*   Descripción de cada movimiento.
*   Saldo total débito y saldo total crédito.
*   Saldo final de la cuenta hasta la fecha final del informe.

### ¿Cómo puedo ver una vista previa del Libro Diario Oficial antes de imprimirlo?
#### Respuesta
Después de configurar las opciones del informe, haz clic en el botón **Ver reporte** para visualizar una vista previa.

### ¿Cómo puedo verificar que la ecuación contable se cumple en el Libro Diario Oficial?
#### Respuesta
En la última página del informe, se muestra el saldo total de los débitos y el saldo total de los créditos de todas las cuentas. La suma de los débitos debe ser igual a la suma de los créditos.

---

# Sistema de contabilidad ContaPyme - Mis informes de movimiento contable
[Ver el video](https://www.youtube.com/watch?v=niWLKkyJ_pg)
[niWLKkyJ_pg]

## Tema principal
Creación y gestión de informes personalizados de movimiento contable.

## Resumen general
Este video explica cómo crear informes de movimiento contable personalizados en ContaPyme. Se aprende a acceder a la función "Mis Informes de Movimiento Contable", a crear nuevos informes especificando nombre, título, período (año, bimestre, mes de trabajo), rango de cuentas, tipo de documento y opciones de visualización. También se explica cómo modificar y eliminar informes existentes, permitiendo a los usuarios generar reportes de contabilidad adaptados a sus necesidades específicas.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la función "Mis Informes de Movimiento Contable" en ContaPyme?
#### Respuesta
Para acceder a la función, sigue esta ruta:
**Contabilidad > Otros Reportes Contables > Movimiento Contable > Mis Informes de Movimiento Contable.**

### ¿Cómo creo un nuevo informe de movimiento contable personalizado?
#### Respuesta
Sigue estos pasos:
1.  Accede a la ventana "Mis Informes de Movimiento Contable" (ver pregunta anterior).
2.  Haz clic en el botón **Nuevo**.
3.  En la ventana que se abre, completa los siguientes campos:
    *   **Nombre:** El nombre que le darás al informe.
    *   **Título para impresión:** El título que se mostrará en el informe al imprimirlo.
    *   **Periodo:** Selecciona el período para el cual quieres generar el reporte (Año de Trabajo, Último Bimestre o Mes de Trabajo).
    *   **Cuenta Desde y Cuenta Hasta:** (Opcional) Indica un rango específico de cuentas.
    *   **Tipo de Documento:** (Opcional) Selecciona un tipo de documento específico del listado que se abre al dar clic en el botón de **Referencia**.
    *   **Filtro:** (Opcional) Agrega una condición personalizada para el informe.
4.  Selecciona las opciones de visualización que desees:
    *   **Incluir Tabla.**
    *   **Resumen de Movimiento de Cuentas.**
    *   **Calidad de Borrador.**
    *   **Visualizar Fecha y Hora en el Pie de Página.**
5.  Haz clic en el botón **Grabar** para guardar el informe.

### ¿Qué opciones de período tengo disponibles al crear un informe?
#### Respuesta
Las opciones de período disponibles son:
*   **Año de Trabajo:** Muestra el informe con el movimiento generado durante el año de la fecha de trabajo.
*   **Último Bimestre:** Muestra el informe con el movimiento generado en los dos últimos meses.
*   **Mes de Trabajo:** Muestra el informe con el movimiento generado en el mes de la fecha de trabajo.

### ¿Cómo puedo filtrar el informe para que solo muestre el movimiento de un tipo de documento específico?
#### Respuesta
En la ventana de creación del informe, ubica el campo **Tipo de Documento** y da clic en el botón de **Referencia**. Selecciona el tipo de documento deseado de la lista que se muestra. El informe resultante solo mostrará el movimiento asociado a ese tipo de documento.

### ¿Cómo puedo modificar un informe de movimiento contable existente?
#### Respuesta
Sigue estos pasos:
1.  Accede a la ventana "Mis Informes de Movimiento Contable" (ver pregunta anterior).
2.  Selecciona el informe que deseas modificar de la lista.
3.  Haz clic en el botón **Modificar**.
4.  Realiza los cambios necesarios en la ventana de registro de información.
5.  Haz clic en el botón **Grabar** para guardar los cambios.

### ¿Cómo elimino un informe de movimiento contable?
#### Respuesta
Sigue estos pasos:
1.  Accede a la ventana "Mis Informes de Movimiento Contable" (ver pregunta anterior).
2.  Selecciona el informe que deseas eliminar de la lista.
3.  Haz clic en el botón **Eliminar**.
4.  Confirma la eliminación en la ventana de precaución haciendo clic en **Sí**.

---

# Sistema de contabilidad ContaPyme - ¿Cómo se crea una nueva moneda?
[Ver el video](https://www.youtube.com/watch?v=6XYVnR9KNNc)

## Tema principal
Creación de una nueva moneda en ContaPyme.

## Resumen general
Este video explica cómo crear una nueva moneda en ContaPyme cuando la empresa necesita operar con una moneda diferente a las predefinidas en el sistema.  Se detalla el proceso paso a paso, incluyendo la asignación de un código, la definición del nombre completo, la unidad, el símbolo, el nombre de las fracciones y la configuración de las cuentas de ingreso y egreso para los ajustes por diferencia en cambio. Al final, la moneda estará lista para usarse en las transacciones.

## Preguntas Frecuentes (FAQ)

### ¿Por qué necesito crear una nueva moneda en ContaPyme?
#### Respuesta
Necesitas crear una nueva moneda si tu empresa utiliza una moneda diferente a las que ya están predefinidas en ContaPyme.

### ¿Cómo inicio el proceso para crear una nueva moneda?
#### Respuesta
Dentro del catálogo de monedas, puedes iniciar el proceso de dos maneras:
1.  Haz **clic derecho** en cualquier parte del catálogo y selecciona la opción **"Crear una moneda"**.
2.  Desde la **cinta de opciones** del catálogo, selecciona la opción **"Crear moneda"**.

### ¿Qué es el código de la nueva moneda y cuáles son sus características?
#### Respuesta
El código de la nueva moneda es un identificador único para la moneda dentro del sistema. Puede ser un código numérico o alfanumérico y debe tener hasta 5 caracteres.

### ¿Qué información debo ingresar al registrar una nueva moneda en el asistente?
#### Respuesta
Debes ingresar la siguiente información:
1.  **Nombre de la moneda:** Es recomendable indicar el nombre completo de la moneda para evitar confusiones (por ejemplo, "Dólar estadounidense" en lugar de solo "Dólar").
2.  **Unidad de la moneda:** Este es el nombre que se utilizará en la impresión de cheques e informes, se recomienda indicarlo en plural (por ejemplo, "Libras esterlinas").
3.  **Símbolo de la moneda:** El símbolo que representa la moneda (por ejemplo, £ para la libra esterlina).
4.  **Nombre de los centavos o fracciones:** El nombre de las fracciones de la moneda (por ejemplo, "Peniques" para la libra esterlina).
5.  **Cuentas de ingreso y egreso:** Las cuentas contables que el sistema utilizará para registrar los ajustes por diferencia en cambio.

### ¿Por qué es importante especificar el nombre completo de la moneda?
#### Respuesta
Es importante especificar el nombre completo de la moneda porque existen diferentes tipos de la misma moneda (por ejemplo, diferentes tipos de dólares). Indicar el nombre completo ayuda a evitar confusiones y asegura la correcta identificación de la moneda.

### ¿Qué son las cuentas de ingreso y egreso que se solicitan al crear una moneda?
#### Respuesta
Las cuentas de ingreso y egreso son las cuentas contables que ContaPyme utilizará para registrar los ajustes por diferencia en cambio. Estos ajustes se realizan cuando la tasa de cambio de la moneda fluctúa y afecta el valor de las transacciones.

### ¿Cómo se realizan los ajustes por diferencia en cambio en ContaPyme?
#### Respuesta
Los ajustes por diferencia en cambio se pueden realizar de las siguientes maneras:
1.  Cuando se registra cada movimiento.
2.  Cuando se registra la tasa de cambio.
3.  Como una acción de fin de mes.

---

# Software contable ContaPyme - Ajuste inicial de conciliación bancaria
[Ver el video](https://www.youtube.com/watch?v=L9PbBdLm-_M)

## Tema principal
Cómo realizar los ajustes iniciales para la conciliación bancaria en ContaPyme.

## Resumen general
Este video explica cómo cargar correctamente los saldos iniciales de las cuentas bancarias en ContaPyme para la conciliación bancaria, asegurando que los saldos antiguos no afecten la conciliación del período actual.  Aprenderás cuándo y cómo usar el tipo de movimiento bancario "ajuste inicial de conciliación bancaria" para evitar errores en el proceso de conciliación. El video presenta dos escenarios diferentes y muestra cómo realizar el ajuste en el sistema.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es importante realizar un ajuste inicial al empezar la conciliación bancaria?
#### Respuesta
Es importante porque las cuentas bancarias a menudo tienen movimientos y saldos de periodos anteriores. Estos valores deben contabilizarse de manera especial para que no interfieran con la conciliación de los movimientos del período actual que se está evaluando.

### ¿Qué es el "ajuste inicial de conciliación bancaria"?
#### Respuesta
Es un tipo de movimiento bancario especial que se asigna a los saldos iniciales de la cuenta bancaria al comenzar a usar el módulo de conciliación. Este tipo de movimiento está configurado para ser ignorado durante el proceso de conciliación, lo que significa que no sumará ni restará a los movimientos dentro de la conciliación.

### ¿Cuándo debo usar el tipo de movimiento "ajuste inicial de conciliación bancaria"?
#### Respuesta
Debes usarlo cuando comienzas a utilizar el módulo de conciliación bancaria y necesitas cargar el saldo inicial de la cuenta. El momento exacto depende de cuándo empezaste tu contabilidad y cuándo activaste la conciliación bancaria.  Por ejemplo:

*   Si empezaste la contabilidad y activaste la conciliación bancaria al mismo tiempo, carga el saldo inicial con este tipo de movimiento.
*   Si la contabilidad comenzó antes de activar la conciliación bancaria, el saldo que tienes registrado hasta la fecha de activación de la conciliación será tomado automáticamente como el saldo inicial, y no necesitarás hacer un ajuste inicial.

### ¿Qué sucede si no marco el saldo inicial con el tipo de movimiento "ajuste inicial de conciliación bancaria"?
#### Respuesta
Si no lo marcas correctamente, el saldo inicial aparecerá en el listado de movimientos a conciliar, lo cual no es correcto, ya que no representa un movimiento real del período que estás conciliando.

### ¿Cómo cargo el saldo inicial de una cuenta bancaria con el tipo de movimiento "ajuste inicial de conciliación bancaria" en ContaPyme?
#### Respuesta
Para cargar el saldo inicial, sigue estos pasos:

1.  Ubícate en el **Manejador de Operaciones**.
2.  Identifica la operación de carga inicial de saldos (puedes usar una ya existente o crear una nueva).
3.  Haz clic derecho sobre la operación y selecciona **Modificar**.
4.  Selecciona la cuenta bancaria deseada.
5.  Digita el valor del saldo inicial en el campo débito (si es un saldo débito).
6.  En el campo **Tipo de Movimiento Bancario**, selecciona **Ajuste Inicial de Conciliación Bancaria**.
7.  Haz clic en el botón **Aceptar** para guardar la operación.

### ¿Por qué el campo "Tipo de Movimiento Bancario" se vuelve obligatorio al seleccionar una cuenta bancaria?
#### Respuesta
El campo "Tipo de Movimiento Bancario" se marca como obligatorio cuando la cuenta seleccionada es una cuenta de conciliación y el manejo de conciliación bancaria está activo. Esto asegura que asignes el tipo de movimiento correcto a cada transacción, incluyendo el ajuste inicial.

---

# Software contable ContaPyme - Ajuste por diferencia en cambio al procesar la oper de acciones mes
[Ver el video](https://www.youtube.com/watch?v=2o07SXWQIyE)
Ajuste por diferencia en cambio al procesar la operación de acciones automáticas de fin de mes

## Tema principal
Ajuste automático por diferencia en cambio al final del mes en ContaPyme.

## Resumen general
Este video explica cómo ContaPyme realiza ajustes por diferencia en cambio automáticamente al final del mes, específicamente cuando se procesa la operación de acciones automáticas de fin de mes.  El video muestra un ejemplo práctico donde se crea una cuenta por cobrar en dólares, se realiza un abono con una tasa de cambio diferente, generando un saldo negativo, y finalmente se ejecuta el ajuste automático para saldar la cuenta y registrar la diferencia en la cuenta de ingresos correspondiente. Se aprende cómo configurar el sistema para este tipo de ajustes y cómo verificar los movimientos contables resultantes.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los momentos en los que se pueden realizar ajustes por diferencia en cambio en ContaPyme?
#### Respuesta
Según lo mencionado al inicio del video, existen tres momentos en los cuales se pueden realizar los ajustes por diferencia en cambio. El video se centra en el ajuste que se realiza al momento de procesar la operación de acciones automáticas de fin de mes.

### ¿Qué configuraciones se deben verificar en ContaPyme antes de realizar el ajuste por diferencia en cambio al procesar las acciones automáticas de fin de mes?
#### Respuesta
Antes de realizar el ajuste, debes verificar que **NINGUNA** de las siguientes opciones de ajuste por diferencia en cambio esté activada en la configuración del manejo de moneda extranjera:
- Habilitar ajustes de diferencia en cambio cada que se realice un movimiento.
- Realizar ajustes cada que se procese la operación de registro de tasa de cambio.

### ¿Qué pasa si se abona a una cuenta por cobrar en moneda extranjera con una tasa de cambio diferente a la del momento de la creación de la cuenta?
#### Respuesta
Si se abona a una cuenta por cobrar en moneda extranjera con una tasa de cambio diferente a la del momento de la creación de la cuenta, puede generarse un saldo negativo en la cuenta por cobrar, es decir, un saldo a favor del cliente, si el valor del abono es mayor que el valor original de la cuenta por cobrar.

### ¿Cómo soluciona ContaPyme el saldo negativo que se genera al abonar con una tasa de cambio diferente?
#### Respuesta
ContaPyme soluciona este problema mediante la operación de acciones automáticas de fin de mes.  Esta operación identifica el saldo negativo y realiza un ajuste contable para cancelarlo.

### ¿Cuál es el ajuste contable que realiza ContaPyme para cancelar el saldo negativo en la cuenta por cobrar?
#### Respuesta
ContaPyme realiza el siguiente ajuste contable:

1.  Un **débito** a la cuenta por cobrar por el valor del saldo negativo.
2.  Un **crédito** a la cuenta de ingresos por diferencia en cambio por el mismo valor.

### ¿Qué se debe activar en la operación de acciones automáticas de fin de mes para que se realicen los ajustes por diferencia en cambio?
#### Respuesta
En la operación de acciones automáticas de fin de mes, se debe activar el proceso de ajustes por diferencia en cambio. Además, se debe indicar el centro de costos donde se cargarán dichos ajustes.

### ¿Cómo puedo verificar que el ajuste por diferencia en cambio se realizó correctamente en ContaPyme?
#### Respuesta
Después de procesar la operación de acciones automáticas de fin de mes, puedes verificar el ajuste de las siguientes maneras:

1.  **Consultar el movimiento contable generado:**  Verifica que el sistema haya realizado el débito a la cuenta por cobrar y el crédito a la cuenta de ingresos por diferencia en cambio.
2.  **Consultar un informe de cuentas por cobrar:**  Verifica que el saldo de la cuenta por cobrar sea de $0.

---

# Software contable ContaPyme - Ajuste por diferencia en cambio al procesar la oper de registro tc
[Ver el video](https://www.youtube.com/watch?v=Wvo9f244BJQ)
Ajuste por diferencia en cambio al procesar la operación de registro de tasas de cambio

## Tema principal
Ajuste automático de cuentas en moneda extranjera al registrar tasas de cambio.

## Resumen general
Este video explica cómo ContaPyme ajusta automáticamente las cuentas en moneda extranjera al procesar el registro de las tasas de cambio.  Muestra cómo activar esta funcionalidad en la configuración, luego explica cómo el sistema recalcula los saldos y realiza los ajustes contables necesarios en cuentas por cobrar cuando se registra una nueva tasa de cambio.  También ejemplifica cómo se cancela la cuenta por cobrar.

## Preguntas Frecuentes (FAQ)

### ¿Sobre qué tipo de cuentas se realiza el ajuste por diferencia en cambio?
#### Respuesta
El ajuste por diferencia en cambio se realiza sobre todas las cuentas que estén configuradas para el manejo de moneda extranjera.

### ¿Cuántos momentos existen para realizar ajustes por diferencia en cambio?
#### Respuesta
Existen tres momentos en los cuales se pueden realizar dichos ajustes, siendo uno de ellos al momento de procesar la operación de registro de tasas de cambio. El video se centra en este último.

### ¿Qué debo hacer antes de empezar a usar los ajustes por diferencia en cambio al registrar las tasas?
#### Respuesta
Antes de comenzar, debes ingresar a la configuración del manejo de moneda extranjera y verificar que la opción "habilitar ajustes de diferencia en cambio cada que se procese la operación de registro de tasas de cambio" esté activa.

### ¿Dónde encuentro la configuración del manejo de moneda extranjera?
#### Respuesta
El video no especifica la ruta exacta dentro de ContaPyme para encontrar la configuración del manejo de moneda extranjera.

### ¿Qué hace el sistema cuando se registra una nueva tasa de cambio?
#### Respuesta
El sistema detecta si la tasa de cambio de alguna moneda ha cambiado. Si es así, ajusta el saldo de las cuentas por cobrar asociadas a esa moneda. Calcula el nuevo saldo de la cuenta por cobrar basándose en la nueva tasa y realiza un ajuste contable.

### ¿Cómo se realiza el ajuste contable en la cuenta por cobrar?
#### Respuesta
El sistema realiza un débito o crédito sobre la cuenta por cobrar por la diferencia calculada y lo cruza contra una cuenta de ingresos o gastos por diferencia en cambio (según corresponda).

### ¿Se realizan ajustes por diferencia en cambio al abonar una cuenta por cobrar?
#### Respuesta
No, el abono a la cuenta por cobrar no realiza ningún ajuste por diferencia en cambio. Estos ajustes ya se han realizado al procesar la operación de registro de tasa de cambio.

### ¿Qué pasa si no se registran las tasas de cambio diariamente?
#### Respuesta
Si las tasas de cambio no se registran diariamente, los ajustes solo se realizarán periódicamente cada vez que se registre una operación de registro de tasas de cambio. Por lo tanto, los saldos no estarán completamente actualizados día a día.

---

# Software contable ContaPyme - Ajuste por diferencia en cambio al realizar un movimiento
[Ver el video](https://www.youtube.com/watch?v=YJDZcr2XabU)
Ajuste por diferencia en cambio al realizar un movimiento

## Tema principal
Ajuste automático por diferencia en cambio al realizar movimientos en cuentas configuradas para moneda extranjera.

## Resumen general
Este video explica cómo ContaPyme realiza ajustes automáticos por diferencia en cambio al registrar movimientos en cuentas que manejan moneda extranjera. Muestra un ejemplo práctico de una cuenta por cobrar en dólares, donde el sistema ajusta el valor en pesos al momento del abono, basándose en la tasa de cambio actualizada. El video detalla cómo se configura esta funcionalidad y cómo el sistema automáticamente realiza los asientos contables necesarios para reflejar la diferencia en cambio.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los momentos en los que se pueden realizar ajustes por diferencia en cambio en ContaPyme?
#### Respuesta
Los ajustes por diferencia en cambio se pueden realizar en tres momentos:
- Al realizar un movimiento sobre una cuenta configurada para el manejo de moneda extranjera.
- Al momento de procesar la operación de registro de tasas de cambio.
- Al procesar la operación de acciones automáticas de fin de mes.

### ¿Qué requisito previo es necesario para que ContaPyme realice ajustes por diferencia en cambio al realizar un movimiento?
#### Respuesta
Es necesario verificar que, en la configuración del manejo de moneda extranjera, se tenga activa la opción de habilitar ajustes de diferencia en cambio cada que se realice un movimiento.

### ¿Qué pasa si la tasa de cambio varía entre la creación de una cuenta por cobrar y su abono?
#### Respuesta
ContaPyme ajusta automáticamente el valor en moneda local al momento del abono, basándose en la tasa de cambio registrada en ese momento. Esto genera una diferencia que el sistema ajusta contablemente.

### ¿Cómo ajusta ContaPyme la diferencia en cambio cuando se abona una cuenta por cobrar en moneda extranjera?
#### Respuesta
ContaPyme realiza un ajuste contable debitando la cuenta por cobrar por el valor de la diferencia en cambio y acreditando la cuenta de ingresos por diferencia en cambio por el mismo valor. Esto deja la cuenta por cobrar con saldo en cero.

### ¿Cómo puedo ver el ajuste por diferencia en cambio generado por ContaPyme al abonar una cuenta por cobrar en moneda extranjera?
#### Respuesta
Después de procesar el abono a la cuenta por cobrar, puedes consultar el movimiento contable generado. Verás que el sistema ha realizado primero la conversión de moneda extranjera a moneda local y, luego, el ajuste sobre la cuenta por cobrar, debitando la cuenta por cobrar y acreditando la cuenta de ingresos por diferencia en cambio.

### ¿Dónde puedo consultar si el ajuste por diferencia en cambio se aplicó correctamente a la cuenta por cobrar?
#### Respuesta
Puedes consultar un informe de detalle de cuentas por cobrar para el tercero en cuestión. Encontrarás que el saldo de la cuenta por cobrar se encuentra totalmente cancelado después de que el sistema aplique el ajuste por diferencia en cambio.

---

# Software contable ContaPyme - Analizador de impresión de documentos
[Ver el video](https://www.youtube.com/watch?v=ARzbt44OE7E)
ARzbt44OE7E

## Tema principal
Identificar y controlar inconsistencias en la impresión de documentos dentro de ContaPyme.

## Resumen general
Este video explica cómo usar el analizador de impresión de documentos en ContaPyme para identificar inconsistencias que ocurren al imprimir documentos en un rango de fechas específico. Se aprende a generar un reporte que muestra si las operaciones fueron eliminadas después de ser impresas, si se imprimieron varias veces con diferente tipo o número de documento de soporte, o con diferente tercero principal. El video muestra cómo acceder a la herramienta, configurar las opciones de análisis y entender los resultados del reporte, incluyendo los comentarios, advertencias y errores detectados.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el analizador de impresión de documentos en ContaPyme?
#### Respuesta
Es una herramienta que permite identificar y controlar las inconsistencias que se presentaron al momento de imprimir un documento dentro de un rango de fecha determinado.

### ¿Qué tipo de inconsistencias puede detectar el analizador de impresión de documentos?
#### Respuesta
Puede detectar si las operaciones fueron eliminadas después de ser impresas, si se imprimieron varias veces con diferente tipo de documento de soporte, si se imprimieron varias veces con diferente número de documento, o si se imprimieron varias veces con diferente tercero principal.

### ¿Dónde se configura el análisis de registro de impresión para cada tipo de documento de soporte?
#### Respuesta
La configuración se realiza en el paso de análisis de registro de impresión de cada tipo de documento de soporte. Para mayor información, se puede consultar el video de análisis para el registro de impresión.

### ¿Cómo se accede al analizador de impresión de documentos en ContaPyme?
#### Respuesta
Para generar este reporte, sigue estos pasos:
1. Ve a la pestaña **Contabilidad**.
2. Selecciona **Control de documentos**.
3. Selecciona la opción **Analizador de impresión de documentos**.

### ¿Qué opciones de configuración están disponibles al generar el informe del analizador de impresión de documentos?
#### Respuesta
Se puede seleccionar si el análisis se realiza sobre la fecha en que se imprimió el documento o sobre la fecha de soporte del documento. También se debe especificar la fecha inicial y la fecha final del rango de análisis. Adicionalmente, se pueden activar las siguientes opciones:

1.  Visualizar las operaciones que fueron impresas pero ya no están en el sistema.
2.  Visualizar las operaciones que fueron impresas varias veces con diferentes tipos de documento de soporte.
3.  Visualizar las operaciones que fueron impresas varias veces con diferente número de documento.
4.  Visualizar las operaciones que fueron impresas varias veces con diferente tercero principal.

### ¿Cómo interpreta ContaPyme los resultados del análisis?
#### Respuesta
El sistema muestra los comentarios de color verde, las advertencias de color azul y los errores de color rojo. Además, indica el número de comentarios, advertencias y errores encontrados.

### ¿Qué significa el error "hay varios registros de impresión, en donde la operación correspondiente no existe en el manejador de operaciones"?
#### Respuesta
Este error indica que la operación fue eliminada del sistema después de haber sido impresa, siempre y cuando la opción de "visualizar en el informe las operaciones que fueron impresas pero ya no están en el sistema" haya sido activada en la configuración del informe.

### ¿Qué información se muestra en los datos del registro de impresión al detectar un error?
#### Respuesta
Se muestra la fecha y hora de impresión, el número de la operación, la fecha del documento de soporte, entre otros datos relevantes para revisar el motivo del error.

### ¿Qué significa el error "hay varios registros de impresión de la misma operación con diferente tipo de documento de soporte"?
#### Respuesta
Este error indica que la misma operación fue impresa con diferentes tipos de documentos de soporte, por ejemplo, primero como una factura de venta y luego como un comprobante de ingreso, siempre y cuando la opción correspondiente haya sido activada en la configuración del informe.

### ¿Qué significa el error "hay varios registros de impresión de la misma operación con diferente número de documento"?
#### Respuesta
Este error indica que la misma operación fue impresa con diferentes números de documento de soporte, por ejemplo, primero con la factura 7220 y luego con la nota de contabilidad 10 y 12, siempre y cuando la opción correspondiente haya sido activada en la configuración del informe.

### ¿Qué significa el error "ha detectado varios registros de impresión de la misma operación con diferente tercero principal"?
#### Respuesta
Este error indica que la misma operación fue impresa con diferentes terceros principales, por ejemplo, primero con Claudia Patricia Camelo y luego con Andrés Sandoval, siempre y cuando la opción correspondiente haya sido activada en la configuración del informe.

### ¿Qué significa el error "ha excedido el número de impresiones para el tipo de documento de soporte"?
#### Respuesta
Este error indica que el número de impresiones para ese tipo de documento de soporte ha excedido el número máximo permitido que se ha configurado en el sistema.

### ¿Qué significa el error "una operación fue impresa en una fecha diferente a la fecha de soporte del documento"?
#### Respuesta
Este error indica que la fecha de impresión de la operación no coincide con la fecha del documento de soporte. Para que el sistema muestre este tipo de inconsistencia, se debe configurar el tipo de documento de soporte del cual se desea realizar auditoría y control.

---

# Software contable ContaPyme - Atributos de las cuentas
[Ver el video](https://www.youtube.com/watch?v=V73acBnKiX4)
[V73acBnKiX4]

## Tema principal
Entendiendo y modificando los atributos de las cuentas en ContaPyme.

## Resumen general
Este video explica los diferentes atributos que se pueden configurar para cada cuenta en el software contable ContaPyme.  Aprenderás sobre el nombre y tipo de cuenta, la identificación alterna, las observaciones, y cómo modificar otros atributos como "afectable directamente por el usuario", "ajustar por inflación", "exige centro de costos", entre otros.  Además, el video cubre atributos relacionados con terceros, cartera, proveedores y la clase de cuenta, proporcionando una visión completa de las opciones de personalización disponibles.

## Preguntas Frecuentes (FAQ)

### ¿Qué son los atributos de las cuentas en ContaPyme y cómo puedo acceder a ellos?
#### Respuesta
Los atributos de las cuentas son características que definen el comportamiento y la función de una cuenta dentro del sistema contable.  Estos atributos se definen al crear la cuenta, pero se pueden modificar en cualquier momento. Para acceder al asistente de modificación de la cuenta, debes dirigirte a la cuenta que deseas modificar. El video no especifica la ruta exacta dentro de ContaPyme, pero menciona que cada atributo tiene una descripción accesible al ubicarte en el icono de la interrogación.

### ¿Por qué es importante modificar los atributos de las cuentas con la ayuda de un contador o auxiliar contable?
#### Respuesta
La modificación de los atributos de las cuentas debe realizarse con la asistencia de un contador o auxiliar contable porque requiere un entendimiento profundo del sistema contable y el impacto que los cambios pueden tener en los informes y la consistencia de los datos. Un error en la configuración de estos atributos podría afectar la integridad de la información financiera.

### ¿Qué significa que una cuenta hija hereda los atributos de la cuenta padre?
#### Respuesta
Cuando se crea una cuenta hija (subcuenta) dentro del catálogo de cuentas, automáticamente copia o "hereda" todos los atributos configurados en su cuenta padre (cuenta principal). Esto facilita la configuración y asegura la consistencia entre cuentas relacionadas. Sin embargo, el usuario puede modificar los atributos de la cuenta hija según sea necesario.

### ¿Qué es el campo de "Identificación Alterna" y para qué se utiliza?
#### Respuesta
El campo de "Identificación Alterna" permite establecer una equivalencia entre una cuenta en el plan de cuentas de ContaPyme y una cuenta en un plan de cuentas diferente, utilizado por otra empresa. Esto es útil cuando se necesita exportar datos para que sean compatibles con la estructura de cuentas de otra organización.

### ¿Qué implica que una cuenta sea "afectable directamente por el usuario"?
#### Respuesta
Que una cuenta sea "afectable directamente por el usuario" significa que el usuario puede realizar movimientos contables directamente en esa cuenta. Normalmente, todas las cuentas son afectables por el usuario.  Sin embargo, algunas cuentas son controladas automáticamente por otros módulos del sistema, y en esos casos, se puede configurar para que el sistema advierta al usuario sobre no modificarlas directamente.

### ¿Cómo funciona el atributo "Ajustar por inflación"?
#### Respuesta
Si el atributo "Ajustar por inflación" está activo para una cuenta, el sistema automáticamente ajustará el valor de esa cuenta por inflación durante las operaciones automáticas de fin de mes.  El sistema determinará las cuentas débito y crédito para el ajuste basándose en la tabla de rangos de ajustes por inflación configurada en ContaPyme.

### ¿Qué significa que una cuenta "exige centro de costos"?
#### Respuesta
Si una cuenta tiene activado el atributo "exige centro de costos", cada vez que se afecte esa cuenta mediante un movimiento contable, el sistema obligará a que se especifique el centro de costos correspondiente a esa transacción. Esto es común en cuentas de ingresos y egresos, pero también puede aplicarse a otras cuentas como las de producto en proceso o cultivo en desarrollo.

### ¿Qué significa que una cuenta "exige valor base"?
#### Respuesta
Si una cuenta tiene activado el atributo "exige valor base", cada vez que se afecte esa cuenta mediante un movimiento contable, el sistema obligará a que se especifique el valor base de la transacción. Esto es común en cuentas de impuestos, como retención en la fuente o IVA, donde se necesita registrar la base sobre la cual se calcula el impuesto.

### ¿Qué significa que una cuenta "exige activo"?
#### Respuesta
Si una cuenta tiene activado el atributo "exige activo", cada vez que se afecte esa cuenta mediante un movimiento contable, el sistema obligará a que se especifique el identificador del activo fijo al que se refiere la transacción. Esto está relacionado con el módulo de activos fijos y se utiliza para mantener la sincronización entre el módulo de activos y la contabilidad. Este atributo es común en cuentas como propiedad planta y equipo, ajustes por inflación, valorización de activos y depreciación.

### ¿Para qué sirve el atributo "Visible en selección"?
#### Respuesta
El atributo "Visible en selección" determina si una cuenta se mostrará en el asistente de selección de cuentas durante las diferentes operaciones en ContaPyme. Se puede utilizar para ocultar cuentas que no son necesarias en el trabajo diario, sin tener que eliminarlas del sistema.

### ¿Cómo influye el atributo "Disponible en gastos e ingresos" en las operaciones?
#### Respuesta
El atributo "Disponible en gastos e ingresos" indica si la cuenta será considerada como un concepto de gasto o ingreso y si será visible en operaciones de egresos y gastos, ingresos y recaudos, venta de productos, entre otras.

### ¿Cuándo y cómo se utiliza el atributo "Autoactivar"?
#### Respuesta
El atributo "Autoactivar" se activa en cuentas de costos de producción y solo tiene efecto cuando los centros de costos son de producción.  Si se aplican costos, durante la operación de acciones automáticas de fin de mes, el sistema trasladará todos los valores acumulados en las cuentas de costos de producción a la cuenta de producto en proceso.  Esta opción es propia del módulo de costos de producción.

### ¿Cuáles son las opciones para el manejo de terceros y qué significan?
#### Respuesta
Existen tres opciones para el manejo de terceros:

1.  **No maneja tercero:** No se registrará el tercero en el movimiento contable, incluso si se indica.
2.  **Maneja tercero:** Registrará el tercero en el movimiento contable si se indica, pero no es obligatorio.
3.  **Maneja y exige tercero:** Obliga a que siempre se indique el tercero en la transacción y lo registrará en el movimiento contable.

### ¿Qué efecto tiene el atributo "Discrimina por tercero"?
#### Respuesta
El atributo "Discrimina por tercero" afecta algunos reportes contables. Si está activo, el reporte de inventario y balances o movimiento de cuentas auxiliares mostrará el saldo de la cuenta, discriminándolo detalladamente por cada tercero. Es común activarlo en cuentas de cartera y algunas cuentas de gastos o ingresos (ej. gastos de personal).

### ¿Para qué sirve el atributo "Controla endeudamiento"?
#### Respuesta
El atributo "Controla endeudamiento" se activa cuando la cuenta se utiliza en el módulo de endeudamiento, para que se vea reflejada en los diferentes informes de este módulo. Ejemplos comunes son las cuentas por cobrar (clientes) o cuentas por pagar (proveedores).

### ¿Cómo funciona el atributo "Manejar referencias" en el contexto del endeudamiento?
#### Respuesta
Si el atributo "Manejar referencias" está activo, el cálculo del endeudamiento se basará en las referencias o documentos de soporte de las transacciones. Si no está activo, pero sí se controla el endeudamiento, se manejará el saldo total por cada tercero. Normalmente, solo las cuentas de cartera manejan referencias.

### ¿Cuáles son las clases de cuentas y cómo influyen en la configuración?
#### Respuesta
Existen cuatro clases de cuentas: normal, de efectivo, de impuestos y de ajustes por inflación.  Dependiendo de la clase de cuenta seleccionada, el sistema exigirá configuraciones especiales. El video no especifica cuáles son esas configuraciones.

---

# Software contable ContaPyme - Balance general en moneda extranjera
[Ver el video](https://www.youtube.com/watch?v=a2QXpL9tGY4)
a2QXpL9tGY4

## Tema principal
Generación de un Balance General en moneda extranjera en ContaPyme.

## Resumen general
Este video explica cómo generar un Balance General en ContaPyme y visualizarlo en una moneda extranjera diferente a la moneda local. Se muestra el proceso para seleccionar la moneda deseada, la fecha para la tasa de cambio, y las diferentes opciones de configuración disponibles. El video enfatiza que la tasa de cambio utilizada será la vigente a la fecha final del informe y explica cómo el sistema valida que exista una tasa de cambio registrada para la moneda seleccionada en esa fecha. Finalmente, se describe cómo se visualiza el informe con los valores convertidos y las opciones para imprimirlo o guardarlo en diferentes formatos.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipo de informes financieros puedo generar en moneda extranjera en ContaPyme?
#### Respuesta
Puedes generar los siguientes informes financieros en moneda extranjera: Balance General (en sus diferentes presentaciones), Estado de Resultados e Informe de Mayor y Balances.

### ¿Cómo accedo a la opción para generar un Balance General en ContaPyme?
#### Respuesta
Debes dirigirte a la pestaña **Contabilidad**, luego al grupo **Informes**, después a **Estados Financieros Básicos** y finalmente seleccionar **Balance General**. La ruta completa es: **Contabilidad > Informes > Estados Financieros Básicos > Balance General**.

### ¿Cuáles presentaciones del Balance General permiten imprimirse en moneda extranjera?
#### Respuesta
Todas las presentaciones del Balance General, a excepción de la consulta de Balance General, permiten imprimirse en moneda extranjera. Las presentaciones son: Balance General saldos, saldos a dos columnas, Balance General del período, comparativo y movimiento.

### ¿Cómo genero un Balance General en moneda extranjera?
#### Respuesta
Para generar un Balance General en moneda extranjera sigue estos pasos:

1.  Dirígete a **Contabilidad > Informes > Estados Financieros Básicos > Balance General**.
2.  Selecciona la presentación deseada, por ejemplo, **Balance General Saldos**.
3.  Indica la **fecha** a la cual se calcularán los saldos de las cuentas.
4.  Define el **filtro** que aplique y el **nivel de detalle** del informe.
5.  Activa la opción **"Mostrar valores monetarios en otra unidad de moneda"**.
6.  Selecciona la **moneda** deseada del catálogo de monedas.
7.  Haz clic en **"Ver reporte"**.

### ¿Qué tasa de cambio utiliza ContaPyme para convertir los valores al generar un Balance General en moneda extranjera?
#### Respuesta
ContaPyme utiliza la tasa de cambio registrada o vigente a la fecha final del informe para realizar la conversión a moneda extranjera. Es importante asegurarse de que exista una tasa de cambio registrada para la moneda seleccionada a la fecha de consulta del informe.

### ¿Qué información se muestra en el encabezado del Balance General generado en moneda extranjera?
#### Respuesta
En el encabezado del Balance General generado en moneda extranjera se muestra: el nombre del informe (Balance General), la fecha a la cual se calcularon los saldos, la moneda en la que se está mostrando el informe y la tasa de cambio utilizada para la conversión.

### ¿Qué valores del informe se reflejan en moneda extranjera?
#### Respuesta
Todos los valores del informe se reflejan en moneda extranjera, incluyendo los totales como el total activo, pasivo y patrimonio, así como la utilidad del ejercicio.

### ¿En qué formatos puedo guardar o exportar el Balance General generado en moneda extranjera?
#### Respuesta
El Balance General en moneda extranjera puede ser impreso normalmente o guardado en un archivo PDF, en un archivo RTF o enviado a Excel.

---

# Software contable ContaPyme - Catálogo de Flujos de efectivo
[Ver el video](https://www.youtube.com/watch?v=7O6WNYc5Ec4)
[7O6WNYc5Ec4]

## Tema principal
Configuración y uso del Catálogo de Conceptos de Flujos de Efectivo en ContaPyme.

## Resumen general
Este video explica cómo acceder, entender y configurar el Catálogo de Conceptos de Flujos de Efectivo en ContaPyme. Aprenderás sobre la estructura del catálogo, la codificación de los conceptos, cómo crear nuevos conceptos y cómo crear conceptos hijos dentro de la estructura jerárquica. El video también destaca la importancia de usar los conceptos correctos (fuentes o usos) según el tipo de actividad (operación, inversión o financiación) para reflejar con precisión la capacidad de la empresa para generar efectivo.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el Catálogo de Conceptos de Flujos de Efectivo?
#### Respuesta
Es una ventana especial dentro de ContaPyme que contiene los conceptos de fuentes y usos de efectivo. Permite determinar la capacidad de la empresa para generar el efectivo necesario para cumplir con sus obligaciones y proyectos.

### ¿Cuáles son las dos formas de acceder al Catálogo de Conceptos de Flujos de Efectivo en ContaPyme?
#### Respuesta
Puedes acceder al catálogo de dos maneras:
1.  **Pestaña Contabilidad > Flujos de Efectivo.**
2.  **Desplegando el menú de opciones del Plan de Cuentas** y seleccionando "Catálogo de Conceptos de Flujos de Efectivo".

### ¿Qué elementos se encuentran en el área de registro del Catálogo de Conceptos de Flujos de Efectivo?
#### Respuesta
En el área de registro se encuentran tres columnas:
*   **Código del Concepto:** Número que identifica el concepto de flujos de efectivo.
*   **Nombre del Concepto:** Descripción del concepto.
*   **Tipo de Concepto de Flujo:** Indica si es de tipo fuente (ingreso, en color verde) o uso (egreso, en color rojo).

### ¿Cómo se clasifican los conceptos en el Catálogo de Conceptos de Flujos de Efectivo?
#### Respuesta
Los conceptos se agrupan en tres tipos de actividades, según lo exige las NIIF:
*   **Actividades de Operación**
*   **Actividades de Inversión**
*   **Actividades de Financiación**
*   **Ajustes por diferencia en cambio** (cuando se trabaja con moneda extranjera).

### ¿Qué significan los colores verde y rojo en el Catálogo de Conceptos de Flujos de Efectivo?
#### Respuesta
El color **verde** indica que el concepto es de tipo **fuente** (ingreso de efectivo). El color **rojo** indica que el concepto es de tipo **uso** (egreso de efectivo).

### ¿Cómo se codifican los conceptos de flujos de efectivo y qué indica el primer dígito del código?
#### Respuesta
El primer dígito del código indica a qué tipo de actividad pertenece el concepto:
*   **1:** Actividades de Operación.
*   **2:** Actividades de Inversión.
*   **3:** Actividades de Financiación.

Los siguientes dígitos corresponden al consecutivo de la codificación.

### ¿Cómo se crea un nuevo concepto en el Catálogo de Conceptos de Flujos de Efectivo?
#### Respuesta
Para crear un nuevo concepto, sigue estos pasos:

1.  Ubica el tipo de actividad al que pertenece el concepto (Operación, Inversión o Financiación) y si es un tipo uso o fuente.
2.  Ubícate en el catálogo donde quieres que quede ubicado el nuevo concepto.
3.  Da clic derecho y selecciona **Crear Concepto**.
4.  Indica el código del concepto.
5.  Da clic en **Aceptar**.
6.  Indica el nombre del concepto.
7.  Indica el tipo de concepto (Uso o Fuente).
8.  Da clic en **Aceptar**.

### ¿Cómo se crea un concepto hijo dentro de un concepto existente en el Catálogo de Conceptos de Flujos de Efectivo?
#### Respuesta
Para crear un concepto hijo, sigue estos pasos:

1.  Ubica el concepto al cual le crearás el hijo.
2.  Da clic derecho sobre el concepto padre y selecciona **Crear hijo de concepto**.
3.  El sistema pondrá el código del concepto padre. Agrega un guión y el número del hijo que estás creando.
4.  Da clic en **Aceptar**.
5.  Indica el nombre del concepto hijo.
6.  Indica el tipo de concepto (Uso o Fuente).
7.  Da clic en **Aceptar**.

### ¿A qué tipo de conceptos se deben hacer las imputaciones contables en el Catálogo de Conceptos de Flujos de Efectivo?
#### Respuesta
Las imputaciones contables se hacen únicamente a los conceptos **hijos** (los que se ven en color rojo o verde), no a los conceptos padre (los que se ven en color negro).

---

# Software contable ContaPyme - Cierre definitivo mes
[Ver el video](https://www.youtube.com/watch?v=f9Tz8fSVGPg)
[f9Tz8fSVGPg]

## Tema principal
Proteger la información contable de un mes para evitar modificaciones no deseadas.

## Resumen general
Este video explica cómo utilizar la función de cierre definitivo de meses en ContaPyme para proteger la información contable de un mes ya finalizado. Aprenderás sobre las dos opciones disponibles: cierre de mes y bloqueo de mes, sus diferencias, y cómo activarlas y desactivarlas. También se demuestra cómo estas opciones afectan la capacidad de los usuarios para modificar, eliminar o añadir operaciones, dependiendo de sus permisos. El video te guiará para asegurar la integridad de tus datos contables.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el propósito del cierre definitivo de meses en ContaPyme?
#### Respuesta
El cierre definitivo de meses se utiliza para proteger la información contable de un mes específico una vez que todas las operaciones han sido registradas y verificadas. Esto evita que la información sea modificada, eliminada o que se añadan nuevas operaciones, garantizando la integridad de los datos.

### ¿Cuáles son las dos opciones disponibles para el cierre definitivo de meses y en qué se diferencian?
#### Respuesta
Las dos opciones son:

*   **Cierre de mes:** Impide que cualquier usuario, incluso aquellos con permisos de cierre, modifiquen, eliminen o añadan operaciones en el mes cerrado. Para realizar cambios, es necesario abrir el mes nuevamente.
*   **Bloqueo de mes:** Impide que los usuarios sin permisos de cierre modifiquen, eliminen o añadan operaciones en el mes bloqueado. Los usuarios con permisos de cierre aún pueden realizar cambios.

### ¿Cómo se accede a la opción de cierre definitivo de meses dentro de ContaPyme?
#### Respuesta
Para acceder a la opción de cierre definitivo de meses:
1. Ve a la pestaña **Básico**.
2. Abre el **Manejador de Operaciones**.
3. En la cinta de opciones, busca el icono con el símbolo del candado, que representa el **Cierre Definitivo de Mes**.

### ¿Es necesario cerrar los meses anteriores para poder cerrar o bloquear un mes específico?
#### Respuesta
No es estrictamente necesario cerrar los meses anteriores para cerrar o bloquear un mes específico, aunque es lo más recomendable para mantener un control ordenado de la información contable.

### ¿Puede un mes estar tanto bloqueado como cerrado simultáneamente?
#### Respuesta
Sí, un mes puede tener ambas opciones activas al mismo tiempo, es decir, puede estar bloqueado y cerrado.

### ¿Cómo se cierra o bloquea un mes en ContaPyme?
#### Respuesta
Para cerrar o bloquear un mes:
1.  Accede a la ventana de **Cierre Definitivo de Mes** (Básico > Manejador de Operaciones > Icono del candado).
2.  Ubícate en el mes que deseas cerrar o bloquear.
3.  Marca el check correspondiente a la opción **"Cerrar mes"** o **"Bloquear mes"**.
4.  Haz clic en el botón **"Aceptar"**.

### ¿Qué ocurre cuando un mes está cerrado y se intenta modificar una operación?
#### Respuesta
Si un mes está cerrado y se intenta modificar una operación, el sistema mostrará un mensaje de error indicando que la acción no es posible porque el mes ha sido cerrado o bloqueado.

### ¿Qué ocurre cuando un mes está bloqueado y se intenta modificar una operación con un usuario que tiene permisos de cierre o bloqueo de meses?
#### Respuesta
El sistema permitirá la modificación, eliminación o adición de operaciones, ya que el usuario cuenta con los permisos necesarios.

### ¿Cómo se abre o desbloquea un mes en ContaPyme?
#### Respuesta
Para abrir o desbloquear un mes:

1.  Accede a la ventana de **Cierre Definitivo de Mes** (Básico > Manejador de Operaciones > Icono del candado).
2.  Ubícate en el mes que deseas abrir o desbloquear.
3.  Desmarca el check correspondiente a la opción **"Cerrar mes"** o **"Bloquear mes"**.
4.  Haz clic en el botón **"Aceptar"**.

### ¿Qué tipo de usuario puede abrir o desbloquear un mes cerrado o bloqueado?
#### Respuesta
Solo los usuarios que cuentan con el permiso correspondiente pueden abrir o desbloquear un mes cerrado o bloqueado. Normalmente, este permiso se asigna al contador o al administrador del sistema.

---

# Software contable ContaPyme - Conceptos generales de Flujos de efectivo
[Ver el video](https://www.youtube.com/watch?v=fXr2pfPRyQM)
fXr2pfPRyQM

## Tema principal
Entendimiento de conceptos básicos para el módulo de flujos de efectivo en ContaPyme.

## Resumen general
Este video explica los conceptos fundamentales para entender y utilizar el módulo de flujos de efectivo en ContaPyme. Se definen los términos "efectivo y equivalente de efectivo", se diferencian las "fuentes y usos de efectivo" (también conocidos como ingresos y egresos), y se explican las tres clasificaciones de los flujos de efectivo según su actividad: operación, inversión y financiación. Esto ayuda a comprender cómo se registra y clasifica el movimiento del efectivo dentro de la empresa.

## Preguntas Frecuentes (FAQ)

### ¿Qué se considera "efectivo" según este video?
#### Respuesta
El efectivo se refiere al dinero disponible de inmediato para la operación de la empresa, ya sea en forma de monedas o billetes que son propiedad de la entidad. Ejemplos de efectivo son el dinero en caja menor y los depósitos en cuentas bancarias.

### ¿Qué son los "equivalentes de efectivo"?
#### Respuesta
Los equivalentes de efectivo son inversiones de corto plazo que se caracterizan por su alta liquidez, es decir, que se pueden convertir fácilmente en efectivo. Ejemplos de equivalentes de efectivo son las inversiones de corto plazo, los bonos y los Certificados de Depósito a Término Fijo (CDT) con una duración de entre 90 y 120 días.

### ¿Qué son las "fuentes de efectivo"?
#### Respuesta
Las fuentes de efectivo representan los ingresos de dinero que recibe la organización.  Estos ingresos pueden provenir de diversas actividades, como ventas, cobro de cuentas por cobrar o la venta de activos fijos. En resumen, es el dinero que entra a la empresa.

### ¿Qué son los "usos de efectivo"?
#### Respuesta
Los usos de efectivo se refieren a todas las salidas de dinero de la organización. Incluyen pagos a empleados, pagos a acreedores, préstamos a empleados o terceros, pago de dividendos y cualquier otro tipo de egreso de efectivo.

### ¿Qué otros nombres reciben las "fuentes y usos de efectivo"?
#### Respuesta
Los conceptos de fuentes y usos de efectivo también se conocen como ingresos y egresos.

### ¿Cuáles son las tres clasificaciones de los conceptos de flujos de efectivo según su actividad?
#### Respuesta
Las tres clasificaciones de los flujos de efectivo son:
1.  Actividades de Operación
2.  Actividades de Inversión
3.  Actividades de Financiación

### ¿Qué son las "actividades de operación"?
#### Respuesta
Las actividades de operación son aquellas relacionadas directamente con el desarrollo del objeto social de la empresa.  Por ejemplo, el dinero recibido por la venta de bienes o la prestación de servicios, el pago de servicios públicos, las cuentas por cobrar o por pagar, el pago de la nómina y los impuestos.

### ¿Qué son las "actividades de inversión"?
#### Respuesta
Las actividades de inversión se refieren a las inversiones que realiza la empresa en activos fijos, la compra de inversiones en otras empresas, en títulos valores o en la adquisición de propiedad, planta y equipo.

### ¿Qué son las "actividades de financiación"?
#### Respuesta
Las actividades de financiación se refieren a la adquisición de recursos para la empresa, ya sea de terceros o de sus socios.  Esto incluye obligaciones financieras, el cobro de préstamos, pagarés, bonos o hipotecas.

---

# Software contable ContaPyme - Configuraciones iniciales de Flujos de efectivo
[Ver el video](https://www.youtube.com/watch?v=xEaarbH3pVM)

## Tema principal
Configuración inicial del módulo de flujos de efectivo en ContaPyme.

## Resumen general
Este video explica cómo configurar ContaPyme para empezar a usar el módulo de flujos de efectivo. Detalla la configuración necesaria en las cuentas de efectivo dentro del plan de cuentas, la ruta para activar el módulo de flujos de efectivo, la importancia de la fecha de inicio del registro de flujos de efectivo y cómo verificar que la configuración se haya aplicado correctamente, obligando a registrar el concepto de flujo de efectivo al realizar movimientos en cuentas de efectivo.

## Preguntas Frecuentes (FAQ)

### ¿Qué configuración especial deben tener las cuentas de efectivo en ContaPyme?
#### Respuesta
Las cuentas de efectivo, dentro del plan de cuentas, deben tener configurada la clase "Dos de Efectivo" en el campo "Clase". Esto permite que ContaPyme las identifique como cuentas de efectivo para el control de flujos.

### ¿Cómo se activa el manejo de flujos de efectivo en ContaPyme?
#### Respuesta
Para activar el manejo de flujos de efectivo, sigue estos pasos:
1. Ve a la pestaña **Contabilidad > Plan de Cuentas**.
2. En la cinta de opciones del catálogo de plan de cuentas, haz clic en **Configuración**.
3. Selecciona a qué usuarios aplicará la configuración (por ejemplo, "Todos los usuarios").
4. En el menú de la izquierda, ve a **Configuraciones generales > Flujos de efectivo**.
5. Activa la opción **Habilitar el manejo de flujos de efectivo**.
6. Indica la **Fecha** a partir de la cual se registrarán los conceptos de flujo de efectivo.
7. Haz clic en **Aceptar** para guardar la configuración.

### ¿Por qué es importante la fecha al habilitar el manejo de flujos de efectivo?
#### Respuesta
La fecha indica a ContaPyme a partir de cuándo se debe exigir el registro de conceptos de flujo de efectivo. Si se intenta procesar una operación con una fecha anterior a la indicada, el sistema no solicitará el concepto de flujo de efectivo.

### ¿Es posible deshabilitar la exigencia de conceptos de flujo de efectivo? ¿Cuándo sería útil hacerlo?
#### Respuesta
Sí, se puede deshabilitar la exigencia de conceptos de flujo de efectivo. Esto puede ser útil al inicio del uso del módulo, mientras los usuarios se familiarizan con la necesidad de registrar el concepto en cada movimiento. Sin embargo, una vez que el uso del módulo se establezca de forma permanente, es recomendable mantener la exigencia habilitada para asegurar la consistencia de los informes.

### ¿Cómo se verifica si la configuración de flujos de efectivo se ha aplicado correctamente?
#### Respuesta
Para verificar la configuración, realiza un movimiento contable que afecte una cuenta de efectivo. El sistema debe mostrar un nuevo campo obligatorio en color blanco para indicar el concepto de flujos de efectivo correspondiente a esa transacción.

### ¿Qué ocurre si no se indica el concepto de flujo de efectivo cuando es obligatorio?
#### Respuesta
Si el sistema exige el concepto de flujo de efectivo y no se indica al realizar un movimiento en una cuenta de efectivo, ContaPyme mostrará un mensaje de error y no permitirá procesar la operación.

### En el ejemplo del video, ¿cómo se selecciona el concepto de flujo de efectivo en el movimiento contable?
#### Respuesta
Al realizar el movimiento contable y llegar al renglón de la cuenta de efectivo, se activa un campo en blanco que indica que el concepto de flujo de efectivo es obligatorio. Al hacer doble clic en ese campo, se despliega una lista de conceptos de flujo de efectivo disponibles, y se selecciona el que mejor se adapte a la transacción realizada.

---

# Software contable ContaPyme - Configuraciones iniciales del módulo de conciliación bancaria
[Ver el video](https://www.youtube.com/watch?v=I1jp7n6mYeY)

## Tema principal
Activar y configurar el módulo de conciliación bancaria en ContaPyme.

## Resumen general
Este video explica cómo activar el módulo de conciliación bancaria en ContaPyme, crear las cuentas de conciliación necesarias y verificar que la configuración funcione correctamente. Se aprende a activar el módulo para todos los usuarios, a crear cuentas de conciliación en un catálogo aparte, enlazándolas a las cuentas bancarias existentes en el plan de cuentas, y a confirmar que el sistema exige el tipo de movimiento bancario al registrar operaciones en esas cuentas.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la ruta en ContaPyme para activar el módulo de conciliación bancaria?
#### Respuesta
Para activar el módulo de conciliación bancaria, sigue estos pasos:
1.  Ve a la pestaña **Contabilidad**.
2.  Ingresa al **Plan de Cuentas**.
3.  Haz clic en el botón **Configuración** (en la cinta de opciones).
4.  Selecciona el alcance de la configuración (**Para todos los usuarios**, **Usuario activo**, o **Usuarios con el mismo perfil**).
5.  En la ventana de configuración del Plan de Cuentas, en el menú de la izquierda, ingresa a **Configuraciones Generales > Conciliación Bancaria**.
6.  Activa la opción **Realizar control de los movimientos para la conciliación**.
7.  Indica la **fecha** a partir de la cual el sistema controlará los tipos de movimientos bancarios.
8.  Opcionalmente, activa la opción **Realizar control estricto de los movimientos bancarios**.
9.  Haz clic en el botón **Aceptar** para guardar la configuración.

### ¿Cómo se crean las cuentas de conciliación bancaria en ContaPyme?
#### Respuesta
Para crear cuentas de conciliación bancaria, sigue estos pasos:
1.  Ve a la pestaña **Contabilidad**.
2.  En la cinta de opciones, haz clic en el acceso al **catálogo de cuentas de conciliación**.
3.  Haz clic en el botón **Crear** (en la cinta de opciones) o haz clic derecho sobre el catálogo y selecciona "Crear".
4.  En el cuadro de diálogo, ingresa el **código** de la cuenta de conciliación (puedes usar el seleccionador con F3 para buscar la cuenta bancaria existente en el Plan de Cuentas).
5.  Verifica la descripción (el nombre de la cuenta). Puedes cambiarlo si lo deseas.
6.  Selecciona el **tercero** que corresponde al banco.
7.  Haz clic en el botón **Aceptar**.

### ¿Por qué es importante que las cuentas de conciliación ya estén creadas en el catálogo de cuentas?
#### Respuesta
Es importante porque las cuentas de conciliación deben tener el mismo código que las cuentas ya creadas en el Plan de Cuentas. Esto permite que el sistema relacione las operaciones bancarias con las cuentas contables correctas para la conciliación.

### ¿Por qué las cuentas de conciliación se crean en un catálogo aparte?
#### Respuesta
Las cuentas de conciliación se crean en un catálogo aparte porque no es necesario conciliar todas las cuentas bancarias que una empresa tenga creadas en su Plan de Cuentas. Solo se crean como cuentas de conciliación aquellas que se van a conciliar.

### ¿Cómo se verifica que el módulo de conciliación bancaria está activado?
#### Respuesta
Para verificar que el módulo está activado, realiza una operación que involucre una cuenta de conciliación:
1.  Abre el **Manejador de Operaciones**.
2.  Crea una nueva operación de movimiento contable.
3.  En el registro, selecciona una cuenta que hayas creado como cuenta de conciliación.
4.  Verifica que la columna **Tipo de movimiento** cambie de color (de verde a blanco), indicando que es un campo obligatorio.

### ¿Qué ocurre si se intenta guardar una operación con una cuenta de conciliación sin indicar el tipo de movimiento bancario?
#### Respuesta
El sistema mostrará un error indicando que el dato del tipo de movimiento bancario es obligatorio. No se podrá guardar la operación hasta que se seleccione un tipo de movimiento.

### ¿Qué pasa si se registra una operación con una fecha anterior a la fecha de activación del control de movimientos bancarios?
#### Respuesta
El sistema no exigirá que se diligencie el campo de tipo de movimiento bancario. El control solo se aplica a operaciones con fechas posteriores o iguales a la fecha de activación.

### ¿Cómo afecta el valor (débito o crédito) en una cuenta de conciliación a los tipos de movimientos bancarios que se muestran?
#### Respuesta
Al seleccionar el campo "Tipo de Movimiento", el sistema filtra los tipos de movimientos bancarios según el valor asignado (débito o crédito):
*   Si el valor es **débito**, el sistema muestra solo los tipos de movimientos de **ingreso** a la cuenta.
*   Si el valor es **crédito**, el sistema muestra solo los tipos de movimientos de **retiro** de la cuenta.

### ¿Para qué sirve la opción "Realizar control estricto de los movimientos bancarios"?
#### Respuesta
Al activar esta opción, el sistema verifica que el tipo de movimiento bancario seleccionado en la operación esté creado en el catálogo de tipos de movimientos bancarios. Esto ayuda a mantener la integridad y consistencia de los datos.

### ¿Por qué es importante indicar el número de consignación en las operaciones de conciliación bancaria?
#### Respuesta
El número de consignación es de gran importancia para identificar los movimientos bancarios y facilitar la conciliación en la operación. Permite relacionar el movimiento registrado en ContaPyme con el movimiento real en el extracto bancario.

---

# Software contable ContaPyme - Configuración de las cuentas a presupuestar
[Ver el video](https://www.youtube.com/watch?v=98bkep8vQ6k)
ContaPyme - Configuración de las cuentas a presupuestar

## Tema principal
Configuración de cuentas en ContaPyme para la elaboración de presupuestos.

## Resumen general
Este video explica cómo configurar las cuentas en ContaPyme para su uso en la elaboración de presupuestos. Se identifican las cuentas que comúnmente se presupuestan, como las de ingresos, gastos y costos de producción, y se describe el proceso para marcar una cuenta como "de presupuesto" dentro del sistema. Esto permite realizar presupuestos sobre dichas cuentas y visualizarlas en los informes de ejecución presupuestal.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipos de cuentas se presupuestan normalmente en ContaPyme?
#### Respuesta
Generalmente, las cuentas que se presupuestan son las pertenecientes a los grupos de ingresos, gastos y costos de producción. Estas cuentas reciben imputaciones directas de las operaciones realizadas por el usuario.

### ¿Qué cuentas dentro de los grupos de ingresos y gastos no se deben presupuestar?
#### Respuesta
Se deben excluir las cuentas de ajustes por inflación, las cuentas de depreciaciones, y las cuentas de costos de ventas, ya que estas no reciben imputaciones directas sino que se actualizan mediante procesos automáticos del sistema.

### ¿Qué configuración se debe realizar a las cuentas que se van a presupuestar?
#### Respuesta
A cada cuenta que se va a presupuestar, ya sea de ingresos, gastos o costos de producción, se debe indicar que dicha cuenta es "de presupuesto" dentro de la configuración de la cuenta.

### ¿Cómo se marca una cuenta como "de presupuesto" en ContaPyme?
#### Respuesta
Para marcar una cuenta como "de presupuesto", siga estos pasos:

1.  Abra el catálogo del plan de cuentas.
2.  Ubíquese en la cuenta deseada (ej. una cuenta de ingresos como la 41355405, venta de equipos de cómputo, o una cuenta de gasto como 513505 Aseo y vigilancia).
3.  Haga clic derecho sobre la cuenta y seleccione "Modificar".
4.  En el menú de la parte izquierda, busque la opción "es de presupuesto".
5.  Seleccione la casilla "es de presupuesto".
6.  Haga clic en "Aceptar".

### ¿Después de marcar una cuenta como "de presupuesto", qué se puede hacer con ella?
#### Respuesta
Una vez que una cuenta ha sido marcada como "de presupuesto", podrá realizar presupuestos sobre esa cuenta y visualizarla en los informes de ejecución presupuestal.

---

# Software contable ContaPyme - Configuración de las cuentas que manejan moneda extranjera
[Ver el video](https://www.youtube.com/watch?v=w3x1bin2VqY)
w3x1bin2VqY

## Tema principal
Configuración de cuentas del catálogo para manejar moneda extranjera en ContaPyme.

## Resumen general
Este video explica cómo configurar cuentas específicas en el catálogo de cuentas de ContaPyme para que manejen moneda extranjera. Al configurar una cuenta para moneda extranjera, el sistema solicitará el valor en moneda extranjera cada vez que se registre una transacción en esa cuenta, utilizando la tasa de cambio registrada en el sistema. Estas cuentas también se verán afectadas por los ajustes por diferencia en cambio. El video guía paso a paso a través del proceso de configuración.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es importante configurar las cuentas que manejan moneda extranjera en ContaPyme?
#### Respuesta
Configurar las cuentas que manejan moneda extranjera le indica al sistema cuáles cuentas requieren un manejo especial, como el registro de transacciones en moneda extranjera y la aplicación de ajustes por diferencia en cambio.

### ¿Qué sucede cuando configuro una cuenta para manejar moneda extranjera?
#### Respuesta
Cuando configura una cuenta para manejar moneda extranjera, el sistema requerirá que ingrese el valor en moneda extranjera cada vez que registre una transacción en esa cuenta. Además, la cuenta se verá afectada por los ajustes por diferencia en cambio que el sistema realice.

### ¿Cómo configuro una cuenta para que maneje moneda extranjera en ContaPyme?
#### Respuesta
Para configurar una cuenta para el manejo de moneda extranjera, siga estos pasos:
1.  Ubíquese en el **catálogo de cuentas**.
2.  Encuentre la cuenta que desea configurar.
3.  Haga clic derecho sobre la cuenta y seleccione la opción **Modificar**.
4.  Active la opción **manejo de moneda extranjera**.
5.  Seleccione la moneda que manejará la cuenta desde el **catálogo de monedas**.
6.  Haga clic en el botón **Aceptar** para guardar la configuración.

### ¿Qué ocurre después de configurar una cuenta para manejar moneda extranjera?
#### Respuesta
Una vez configurada, cada vez que registre una transacción en esa cuenta, el sistema le pedirá el valor en moneda extranjera. Además, la cuenta se verá afectada por los ajustes de diferencia en cambio.

### ¿Dónde encuentro la opción para modificar una cuenta y activar el manejo de moneda extranjera?
#### Respuesta
Para modificar una cuenta, debe ingresar al **catálogo de cuentas**, seleccionar la cuenta deseada y hacer clic derecho sobre ella. Luego, seleccione la opción **Modificar** del menú contextual. Dentro de las opciones de la cuenta, encontrará la opción de **manejo de moneda extranjera**.

---

# Software contable ContaPyme - Configuración del formato del extracto bancario
[Ver el video](https://www.youtube.com/watch?v=IpF8rFYcVEQ)
IpF8rFYcVEQ

## Tema principal
Configuración del formato para la importación de extractos bancarios en ContaPyme.

## Resumen general
Este video explica cómo configurar el formato de los extractos bancarios dentro de ContaPyme para la conciliación bancaria automática. El proceso incluye la creación de la cuenta de conciliación, la definición de la ruta de los archivos, el tipo de formato del archivo (Excel, delimitado por comas, etc.) y la correspondencia de los campos del extracto con los campos del sistema. Se detalla cómo configurar las fechas, valores, números de documento y descripciones para que la información se importe correctamente al sistema.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un extracto bancario y para qué sirve configurarlo en ContaPyme?
#### Respuesta
Un extracto bancario es un documento que proporciona la entidad bancaria detallando todos los movimientos de una cuenta durante un período. Configurar el formato del extracto en ContaPyme permite que la información contenida en este documento se cargue de forma automática al sistema para realizar la conciliación bancaria de manera eficiente.

### ¿Cómo se crea una cuenta de conciliación en ContaPyme?
#### Respuesta
Para crear una cuenta de conciliación, sigue estos pasos:
1. Ve a la pestaña **Contabilidad**.
2. Haz clic en el acceso al **Catálogo de cuentas de conciliación**.
3. Da clic al botón **Crear** en la cinta de opciones.
4. El sistema te solicitará el código de la cuenta. Abre el seleccionador y elige la cuenta del **Plan de cuentas** que quieres usar como cuenta de conciliación. Recuerda que la cuenta debe existir previamente en el plan de cuentas.
5. En el campo **Tercero**, selecciona el banco correspondiente.

### ¿Dónde se define la ruta por defecto para guardar los extractos bancarios?
#### Respuesta
La ruta por defecto para guardar los extractos bancarios se define al crear o editar la cuenta de conciliación, después de activar la opción **Definir formato de importación del archivo del extracto bancario**. El primer botón que aparece al activar la opción permite seleccionar la ubicación donde quedarán guardados los extractos.

### ¿Qué tipos de formatos de archivo se pueden seleccionar para la importación del extracto bancario?
#### Respuesta
Se pueden seleccionar varios tipos de formatos, incluyendo archivos de Microsoft Excel, archivos delimitados por comas, archivos delimitados por tabulaciones, entre otros. El formato que selecciones dependerá del tipo de archivo que te envíe el banco.

### ¿Cómo se configura el número de fila de títulos en la configuración del extracto bancario?
#### Respuesta
En el campo **Número de fila de títulos**, debes indicar si en tu formato de extracto bancario hay filas que muestren, por ejemplo, el nombre de la columna, el nombre del banco, el número de la cuenta y otros datos informativos. Indica el número de la fila donde comienzan los datos informativos.

### ¿Cómo se configura el número de la primera fila de datos en la configuración del extracto bancario?
#### Respuesta
Debes indicar en qué fila empieza la información del extracto como tal. Si la información comienza en la tercera fila, debes colocar el número 3.

### ¿Para qué sirve la opción "Cambiar el signo de los movimientos al importar el archivo del extracto bancario"?
#### Respuesta
Esta opción se utiliza en caso de que los extractos bancarios tengan las consignaciones (entradas de dinero) con signo menos y los retiros (salidas de dinero) con signo más. Al activar esta opción, los signos se invertirán al cargar el extracto en la conciliación, dejando las consignaciones positivas y los retiros negativos.

### ¿Cuándo se debe activar la opción "Análisis de signo para el valor del movimiento"?
#### Respuesta
Esta opción se activa cuando los valores del extracto no tienen signo más ni menos, o no están separados por movimiento débito crédito, y el signo del movimiento viene expresado en otra columna del extracto, por ejemplo, con las letras D de débito y C de crédito.

### ¿Cómo se configuran los campos del extracto bancario que se van a cargar en la operación?
#### Respuesta
Para configurar los campos, sigue estos pasos:
1. En la columna **Nombre del campo en el extracto**, coloca el nombre de la columna tal y como aparece en el extracto bancario. Si el extracto no tiene nombres de columna, asigna uno relacionado con el dato que trae la columna.
2. En la columna **Nombre del campo en el sistema**, asigna a cada uno de los datos del extracto el campo del sistema al que corresponde. Por ejemplo, para la fecha, selecciona el formato de fecha correcto (día, mes, año; mes, día, año; etc.).
3. Si un campo del extracto no está relacionado con el sistema, márcalo con la opción **No aplica**.

### ¿Qué opciones se pueden seleccionar en el campo "Nombre del campo en el sistema" para el valor del movimiento?
#### Respuesta
Puedes seleccionar la opción **Valor del movimiento** cuando están definidos los signos del movimiento, o **Valor débito o crédito del movimiento** en el caso de que el extracto traiga definidas columnas separadas para los débitos y los créditos.

### ¿Para qué sirve la columna "Filtro" en la configuración de los campos del extracto bancario?
#### Respuesta
La columna **Filtro** se utiliza en caso de que necesites filtrar los movimientos a cargar. Por ejemplo, si el extracto contiene información de varias cuentas, puedes determinar qué cuentas se deben cargar.

---

# Software contable ContaPyme - Consulta de ejecución presupuestal
[Ver el video](https://www.youtube.com/watch?v=wiwF65yripM)
Consulta de ejecución presupuestal

## Tema principal
Consulta y análisis del informe de ejecución presupuestal en ContaPyme.

## Resumen general
Este video explica cómo utilizar el informe de Consulta de Ejecución Presupuestal en ContaPyme. Aprenderás qué es este informe, cómo acceder a él tanto para la empresa en general como para un centro de costos específico, y cómo interpretar los datos que presenta, incluyendo saldos, movimientos, valores presupuestados y porcentajes de ejecución. También se muestra cómo realizar una auditoría de los registros mediante el sistema drill-down para ver los documentos de soporte de las operaciones.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la consulta de ejecución presupuestal?
#### Respuesta
La consulta de ejecución presupuestal es un informe que permite verificar cómo se ha ejecutado el presupuesto de la empresa para un periodo determinado, comparando el total presupuestado con el total ejecutado. También permite realizar auditoría de los registros a través del sistema drill down.

### ¿Cómo accedo a la consulta de ejecución presupuestal general de la empresa?
#### Respuesta
Para acceder a la consulta de ejecución presupuestal general, sigue estos pasos:
1.  Ve a la pestaña **Adicionales**.
2.  Haz clic en el botón **Informes presupuesto**.
3.  En el menú desplegable, selecciona **Consulta ejecución presupuestal**.

### ¿Cómo accedo a la consulta de ejecución presupuestal de un centro de costos específico?
#### Respuesta
Para acceder a la consulta de ejecución presupuestal de un centro de costos, sigue estos pasos:
1.  Ingresa al **Explorador gráfico de la empresa**.
2.  Ubícate sobre el centro de costos deseado.
3.  Haz clic derecho sobre el centro de costos.
4.  Selecciona la opción **Informes**.
5.  Selecciona la opción **Ejecución presupuestal**.
6.  Selecciona la opción **Consulta ejecución presupuestal**.

### ¿Cómo realizo la consulta de ejecución presupuestal para un centro de costos específico?
#### Respuesta
Para realizar la consulta de ejecución presupuestal para un centro de costos, sigue estos pasos:
1.  Ingresa al **Explorador gráfico de la empresa**.
2.  Ubícate sobre el centro de costos deseado.
3.  Haz clic derecho sobre el centro de costos.
4.  Selecciona la opción **Informes**.
5.  Selecciona la opción **Ejecución presupuestal**.
6.  Selecciona la opción **Consulta ejecución presupuestal**.
7.  Selecciona si deseas consultar la información financiera solo del centro de costos seleccionado o del centro de costos y todos sus hijos.
8.  En la cinta de opciones, en la opción **Filtro**, indica el periodo sobre el cual realizarás la consulta, incluyendo la fecha de inicio, la fecha de fin y el saldo anterior del movimiento de las cuentas.

### ¿Qué información se muestra en la consulta de ejecución presupuestal?
#### Respuesta
El informe de consulta de ejecución presupuestal muestra la siguiente información:

*   **Código de la cuenta:** Código de la cuenta de presupuesto.
*   **Nombre de la cuenta:** Nombre de la cuenta de presupuesto.
*   **Saldo anterior:** Saldo de la cuenta al inicio del periodo consultado.
*   **Movimientos débitos y créditos:** Movimientos que ha tenido la cuenta durante el periodo consultado.
*   **Saldo actual:** Saldo de la cuenta al final del periodo consultado.
*   **Indicadores de variación:** Muestran si las cuentas de ingreso (verde) o gasto (rojo) han tenido una tendencia a incrementar. Las cuentas estables aparecen en color azul.
*   **Valor presupuestado:** Valor presupuestado para la cuenta al final del periodo consultado.
*   **Porcentaje de ejecución:** Porcentaje de ejecución de la cuenta respecto al valor presupuestado.

### ¿Cómo puedo ver las operaciones que generaron movimiento en una cuenta específica dentro de la consulta de ejecución presupuestal?
#### Respuesta
Para ver las operaciones que generaron movimiento en una cuenta específica, da doble clic en la columna **Saldo** de la cuenta deseada. Se abrirá un explorador de presupuesto mostrando las operaciones realizadas durante el periodo consultado.

### ¿Qué información se muestra en el explorador de presupuesto al hacer doble clic sobre el saldo de una cuenta?
#### Respuesta
El explorador de presupuesto muestra:

*   La fecha en la cual se realizó la operación.
*   El número del documento.
*   El código de la cuenta de presupuesto.
*   La información del tercero en transacción.
*   El centro de costos.
*   El valor del movimiento.

### ¿Cómo puedo ver el documento de soporte de una operación específica dentro del explorador de presupuesto?
#### Respuesta
Para ver el documento de soporte de una operación específica, da doble clic sobre la operación deseada en el explorador de presupuesto. Se abrirá el documento de soporte, como una factura de venta, con toda la información correspondiente.

### ¿Qué información se muestra en el resumen financiero que aparece en la parte inferior del informe?
#### Respuesta
En la parte inferior del informe, en el resumen financiero, se visualiza lo siguiente:
* El total de los ingresos menos el total de los egresos.
* El total presupuestado para cada uno de los grupos.
* El respectivo porcentaje de ejecución.
* Si hubo utilidad o pérdida del ejercicio, los respectivos valores y el porcentaje correspondiente.

---

# Software contable ContaPyme - Creación de presupuesto por centro de costos
[Ver el video](https://www.youtube.com/watch?v=8trX-l0TXw0)
[Creación de presupuesto por centro de costos]

## Tema principal
Registro de un presupuesto por centro de costos en ContaPyme.

## Resumen general
Este video explica cómo registrar un presupuesto asignado a un centro de costos específico dentro de ContaPyme. Aprenderás las dos rutas de acceso principales para iniciar el proceso de creación de presupuesto, ya sea a través de la pestaña de adicionales o directamente desde el explorador gráfico de la empresa.  El video también muestra cómo completar el registro del presupuesto, incluyendo la carga de cuentas, la asignación de valores mensuales y el uso de la función de carga automática de cuentas hijas.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las dos rutas de acceso para registrar un presupuesto en ContaPyme?
#### Respuesta
Existen dos maneras de acceder a la función de registro de presupuesto:

1.  A través de la pestaña **Adicionales > Catálogo de presupuestos**. Una vez en el editor de presupuestos, se debe indicar el centro de costos y el año a presupuestar.
2.  A través del explorador gráfico de la empresa. Se debe desplegar la estructura de la empresa, ubicarse en el centro de costos deseado, dar clic derecho y seleccionar la opción **Presupuesto**. En el editor de presupuestos, se indica el año a presupuestar.

### ¿Cómo se inicia el registro de un presupuesto para un centro de costos específico usando el explorador gráfico de la empresa?
#### Respuesta
Para registrar un presupuesto a través del explorador gráfico de la empresa:

1.  Despliega la estructura de tu empresa.
2.  Ubícate en el centro de costos al cual deseas asignar el presupuesto (por ejemplo, "Ventas").
3.  Haz clic derecho sobre el centro de costos.
4.  Selecciona la opción **Presupuesto**.
5.  En el editor de presupuestos, indica el año a presupuestar y da clic en **Aceptar**.

### ¿Qué información se visualiza en la ventana de registro de presupuesto?
#### Respuesta
La ventana de registro de presupuesto muestra la siguiente información:

*   Nombre de la empresa.
*   Nombre del centro de costos al que se está asignando el presupuesto.
*   El año que se está presupuestando.
*   El área del centro de costos (si aplica, por ejemplo, en el caso de lotes o cultivos).
*   Campos para indicar las cuentas que se van a presupuestar.
*   Columnas para cada mes del año, donde se deben ingresar los valores presupuestados para cada cuenta.
*   El total presupuestado para cada cuenta.

### ¿Cuáles son las opciones para cargar las cuentas a presupuestar?
#### Respuesta
Existen varias maneras de cargar las cuentas a presupuestar:

1.  **Selección individual:** Ubicado en la columna "Cuenta", da doble clic y selecciona las cuentas a presupuestar una por una desde el catálogo de cuentas.
2.  **Cargar cuentas hijas:** Utiliza la opción "Cargar cuentas" en la barra de botones. Selecciona una cuenta padre (por ejemplo, una cuenta de gasto) y el sistema cargará automáticamente todas sus cuentas hijas.
3.  **Copiar y pegar desde Excel:** Si tienes el presupuesto ya elaborado en un archivo de Excel, puedes copiar las cuentas y los valores correspondientes a cada mes y pegarlos directamente en el registro de presupuesto en ContaPyme.

### ¿Cómo se cargan automáticamente las cuentas hijas de una cuenta principal al registrar un presupuesto?
#### Respuesta
Para cargar automáticamente las cuentas hijas, sigue estos pasos:

1.  En la ventana de registro de presupuesto, ubícate en la cuenta principal de la cual deseas cargar las cuentas hijas (por ejemplo, la cuenta 5135 de servicios).
2.  Da clic en el botón **Cargar cuentas** en la barra de botones.
3.  El sistema cargará automáticamente todas las cuentas hijas de la cuenta seleccionada.
4.  Indica los valores correspondientes para cada cuenta en cada mes.

### ¿Cómo se copia y pega un presupuesto desde Excel a ContaPyme?
#### Respuesta
Para copiar y pegar un presupuesto desde Excel:

1.  En tu archivo de Excel, selecciona las celdas que contienen las cuentas a presupuestar.
2.  Copia las celdas seleccionadas (Ctrl+C).
3.  En ContaPyme, dentro de la ventana de registro de presupuesto, pega las cuentas en la columna "Cuenta".
4.  En Excel, selecciona las celdas que contienen los valores presupuestados para cada mes.
5.  Copia las celdas seleccionadas (Ctrl+C).
6.  En ContaPyme, pega los valores en las columnas correspondientes a cada mes.

---

# Software contable ContaPyme - Creación de presupuesto por empresa
[Ver el video](https://www.youtube.com/watch?v=UHIZhkcJaD8)
Creación de presupuesto por empresa

## Tema principal
Registrar un presupuesto por empresa en ContaPyme.

## Resumen general
Este video explica cómo registrar el presupuesto de una empresa en ContaPyme. Muestra dos formas de acceder al editor de presupuestos: a través del explorador gráfico de la empresa y mediante la pestaña de "Adicionales". Explica cómo importar la ejecución presupuestal del año anterior para generar el nuevo presupuesto, ajustar los valores a miles, decenas de miles o centenas y cómo ajustar el presupuesto en un porcentaje específico con respecto a la ejecución presupuestal anterior.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo acceder al editor de presupuesto en ContaPyme?
#### Respuesta
Existen dos maneras de acceder al editor de presupuesto:

1.  **A través del explorador gráfico de la empresa:**
    *   Ubícate en el nombre de la empresa.
    *   Haz clic derecho sobre el nombre de la empresa.
    *   Selecciona la opción **Presupuesto**.
2.  **A través de la pestaña Adicionales:**
    *   Ve a la pestaña **Adicionales**.
    *   Haz clic en el botón **Catálogo**.

### ¿Qué información debo ingresar al abrir el editor de presupuesto?
#### Respuesta
Debes ingresar la siguiente información:

*   **Nombre de la empresa:** El sistema lo muestra automáticamente.
*   **Centro de costos:** Deja la casilla vacía si el presupuesto es general para la empresa y no para un centro de costos específico.
*   **Año:** Indica el año para el cual vas a registrar el presupuesto y haz clic en **Aceptar**.

### ¿Cómo puedo registrar el presupuesto para la empresa?
#### Respuesta
Para registrar el presupuesto, se importa la ejecución presupuestal del año anterior:

1.  En la ventana de registro del presupuesto, haz clic en el botón **Importar ejecución presupuestal** (ubicado en la barra de botones).
2.  En el asistente de importación, indica los **datos fuente:**
    *   **Año:** Selecciona el año de la ejecución presupuestal que vas a importar (por ejemplo, 2013).
    *   **Fecha de vigencia de los centros de costos:** Déjala como está por defecto.
    *   **Empresa:** Selecciona la empresa desde la cual vas a importar la ejecución presupuestal. Puedes seleccionarla usando el ícono de la linterna si es una empresa diferente.
    *   **Centro de costos:** No indiques ningún dato en este campo.
3.  Indica los **datos para la generación del nuevo presupuesto:**
    *   **Ajustar a:** Selecciona la opción para ajustar los valores (miles, decenas de miles, centenas).
    *   **Ajustar presupuesto en un porcentaje:**
        *   Desactiva la casilla para importar la ejecución presupuestal al 100%.
        *   Activa la casilla para indicar un porcentaje de variación con respecto a la ejecución presupuestal del año anterior (por ejemplo, 120% para incrementarlo en un 20%).
4.  Haz clic en **Importar**.
5.  Haz clic en **Aceptar** en la ventana que te informa el valor importado.

### ¿Qué significa ajustar el presupuesto a miles, decenas de miles o centenas?
#### Respuesta
Ajustar el presupuesto a miles, decenas de miles o centenas permite redondear los valores del presupuesto. Por ejemplo, si ajustas a miles, el sistema redondeará los valores a la unidad de mil más cercana. La ventana del seleccionador te mostrará ejemplos de cómo quedarán registrados los valores con cada opción.

---

# Software contable ContaPyme - Creación de presupuesto por sede
[Ver el video](https://www.youtube.com/watch?v=xmG3jYGMqm4)
Creación de presupuesto por sede

## Tema principal
Cómo registrar un presupuesto para una sede específica de la empresa en ContaPyme.

## Resumen general
Este video explica el proceso para registrar un presupuesto asignado a una sede específica de una empresa dentro de ContaPyme. Se muestra cómo acceder al editor de presupuestos, seleccionar el centro de costos correspondiente a la sede, y cómo importar un presupuesto desde otra sede, ajustándolo por porcentaje para reflejar las necesidades específicas de la sede actual. El objetivo es permitir a los usuarios asignar presupuestos precisos a cada sede de su empresa.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la opción para registrar un presupuesto por sede en ContaPyme?
#### Respuesta
Puedes acceder de dos maneras:
1.  **Explorador gráfico:** Ubícate en la sede a la cual registrarás el presupuesto, da clic derecho y selecciona la opción **presupuesto**.
2.  **Pestaña Adicionales:** Ve a la pestaña **adicionales** y da clic en el botón **catálogo**.

### ¿Qué información debo ingresar en la ventana del editor de presupuestos?
#### Respuesta
Debes indicar:
1.  El **centro de costos** para el cual registrarás el presupuesto.
2.  El **año** a presupuestar.

### ¿Cómo lleno la información en el editor de presupuestos si voy a crear un presupuesto para la sede Pereira para el año 2014?
#### Respuesta
1.  En la ventana del editor de presupuestos, indica el **centro de costos** para el cual registrarás el presupuesto. En este caso, selecciona la **sede Pereira**.
2.  Indica el **año** a presupuestar, que será el **año 2014**.
3.  Da clic en **aceptar**.

### ¿Qué campos se encuentran en el encabezado del registro de presupuesto?
#### Respuesta
En el encabezado del registro de presupuesto encontrarás los siguientes campos:
*   Nombre de la **empresa**.
*   **Centro de costos** para el cual se registra el presupuesto.
*   **Año** que se va a presupuestar.
*   **Área** (Utilizado cuando el centro de costos pertenece a un lote o cultivo).

### ¿Cómo importo un presupuesto desde otra sede?
#### Respuesta
1.  En el editor de presupuestos, da clic en el botón **importar presupuesto**.
2.  Indica el **año del presupuesto a importar**.
3.  Verifica la **fecha de vigencia de los centros de costos**.
4.  Indica el nombre de la **empresa** en la cual se encuentra creada la sede desde donde importarás el presupuesto.
5.  Selecciona el **centro de costos** desde el cual importarás el presupuesto.

### ¿Cómo ajusto el presupuesto importado para que sea el 80% del presupuesto de la sede principal?
#### Respuesta
1.  Después de seleccionar la sede desde donde importarás el presupuesto, indica los datos para generar el nuevo presupuesto.
2.  Ajusta los valores a **miles**.
3.  Indícale al sistema que este presupuesto se va a ajustar por **porcentaje**.
4.  Establece el porcentaje en **80%**.
5.  Da clic en **importar**.

### ¿Qué significa que el presupuesto se ajuste por un porcentaje del 80%?
#### Respuesta
Significa que para la sede actual (por ejemplo, Pereira), el presupuesto tendrá un decremento del 20% en comparación con el presupuesto de la sede desde donde se importa la información (por ejemplo, la sede principal).

### Después de importar el presupuesto, ¿qué debo hacer?
#### Respuesta
Después de importar, el sistema te mostrará un mensaje informando la suma importada. Revisa la información y da clic en **aceptar** para finalizar el registro de este presupuesto.

---

# Software contable ContaPyme - Definición de nota débito o crédito en el extracto bancario
[Ver el video](https://www.youtube.com/watch?v=HB9mR3cr6ZY)
HB9mR3cr6ZY

## Tema principal
Configuración de notas débito y crédito del extracto bancario en ContaPyme.

## Resumen general
Este video explica cómo configurar las notas débito y crédito en el extracto bancario dentro de ContaPyme para cada cuenta de conciliación.  Enseña a personalizar los tipos de movimiento bancario para cada cuenta, incluyendo la creación de nuevos tipos de movimiento para notas débito, como gastos de chequera. También explica cómo el sistema identifica y contabiliza automáticamente estos movimientos durante la conciliación bancaria, optimizando el proceso de conciliación.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el propósito de configurar las notas débito y crédito en el extracto bancario dentro de ContaPyme?
#### Respuesta
Configurar las notas débito y crédito permite registrar aquellos valores que aparecen en el extracto bancario pero que aún no han sido contabilizados, como gastos bancarios o rendimientos financieros. Esto facilita el proceso de conciliación bancaria y, con la conciliación automática, el sistema puede contabilizar estos valores automáticamente.

### ¿Cómo se accede al catálogo de tipos de movimiento bancario particulares para cada cuenta de conciliación?
#### Respuesta
Para acceder al catálogo de tipos de movimiento bancario particulares:
1.  Dirígete a la pestaña **Contabilidad**.
2.  Selecciona el **Catálogo de Cuentas de Conciliación**.
3.  **Haz clic derecho** sobre la cuenta de conciliación específica que deseas configurar (por ejemplo, la cuenta 11100515 del Banco de Oro).
4.  Selecciona la opción **Catálogo de tipos de movimiento bancario particular para esta cuenta**.

### ¿Qué tipos de movimientos bancarios se pueden encontrar en el catálogo de tipos de movimiento bancario particular para cada cuenta?
#### Respuesta
Dentro de este catálogo, encontrarás:
*   Tipos de movimiento de **ingreso** y **retiro** de la cuenta.
*   Tipos de movimiento a **ignorar** en el extracto.
*   La definición de **notas débito y crédito**.

### ¿Es posible modificar los tipos de movimiento de nota débito o crédito preexistentes en ContaPyme?
#### Respuesta
Sí, puedes modificar los tipos de movimiento que el sistema ya trae creados por defecto o crear nuevos según tus necesidades.

### ¿Cómo se crea un nuevo tipo de movimiento bancario para definir una nota débito, como "gastos de chequera"?
#### Respuesta
Para crear un nuevo tipo de movimiento bancario para nota débito:
1.  Dentro del catálogo de tipos de movimiento bancario particular, da clic al botón **Crear** (ubicado en la cinta de opciones del catálogo, o clic derecho sobre el listado).
2.  Selecciona el tipo de acción **Definición de nota débito o crédito**.
3.  Indica un **código** alfanumérico de hasta cuatro dígitos (por ejemplo, "GCH" para gastos de chequera) y da clic en **Aceptar**.
4.  En el campo **Descripción**, escribe el nombre del tipo de movimiento (por ejemplo, "Gastos Chequera").
5.  Opcionalmente, define un **color** para el tipo de movimiento.
6.  Selecciona la **cuenta contable** que se moverá automáticamente al hacer el asiento (por ejemplo, la cuenta 53050505, gastos chequera).
7.  Indica el tipo de movimiento que se le hará a la cuenta seleccionada (**Débito** para gastos).
8.  En el campo **Texto a buscar**, agrega los textos que el sistema deberá buscar en la descripción del movimiento del extracto (por ejemplo, "gastos chequera").
9.  Si la cuenta contable exige centro de costos, selecciona el **centro de costos** correspondiente.
10. Indica el **concepto de flujo de efectivo** que aplica para este movimiento.
11. Da clic al botón **Aceptar**.

### ¿Qué significa definir un color para el tipo de movimiento bancario?
#### Respuesta
Definir un color para el tipo de movimiento bancario permite que este color sea visible en la operación de conciliación bancaria y se vea reflejado en el listado de movimientos del extracto bancario. Esto ayuda a distinguir visualmente entre los diferentes tipos de movimiento.

### ¿Por qué es importante indicar los textos a buscar en la descripción del movimiento del extracto?
#### Respuesta
Indicar los textos que el sistema debe buscar en la descripción del movimiento del extracto permite que el sistema identifique automáticamente el tipo de movimiento (por ejemplo, gastos bancarios o rendimientos financieros) y realice el asiento contable correspondiente durante la conciliación bancaria automática.

---

# Software contable ContaPyme - Descripción general del módulo de conciliación bancaria automática
[Ver el video](https://www.youtube.com/watch?v=SG-He5I65pk)

## Tema principal
Descripción general del módulo de conciliación bancaria automática en ContaPyme.

## Resumen general
Este video explica el objetivo, las características y las ventajas del módulo de conciliación bancaria automática en ContaPyme. Se aprende cómo este módulo ayuda a ajustar las diferencias entre el saldo del extracto bancario y los registros contables, automatiza la comparación y conciliación de movimientos, permite importar extractos bancarios y facilita el control de las cuentas bancarias, ofreciendo flexibilidad al usuario para configurarlo según sus necesidades.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo del módulo de conciliación bancaria automática?
#### Respuesta
El objetivo es permitir a los usuarios ajustar las diferencias existentes entre el saldo que aparece en el extracto bancario y el saldo que aparece en sus registros contables. Se comparan los movimientos de la cuenta de banco plasmados en el extracto bancario con los movimientos del banco que se han contabilizado en ContaPyme. El módulo realiza los ajustes necesarios para que ambos saldos concuerden.

### ¿Cómo afecta el módulo de conciliación bancaria automática a las operaciones del sistema?
#### Respuesta
El módulo se ve afectado directamente por todas las operaciones del sistema que impliquen en su forma de pago cualquier cuenta de banco que se marque para conciliar. Esto incluye:
- Operación de ingresos
- Operación de gastos
- Operación de abono a cuentas por cobrar y cuentas por pagar
- Operación de venta y compra
- Operación de venta de activos fijos y compra de activos fijos
- Operación de movimiento contable.

### ¿El módulo de conciliación bancaria automática utiliza el mismo plan de cuentas de la empresa?
#### Respuesta
No, cuenta con un catálogo de cuentas de conciliación independiente del plan de cuentas general. Esto permite crear y conciliar solo las cuentas bancarias que el usuario necesita, dándole mayor control.

### ¿Qué tipo de movimientos bancarios se pueden clasificar en el módulo?
#### Respuesta
El módulo dispone de un catálogo de tipos de movimiento bancario listo para usar, que permite clasificar los diferentes movimientos de las cuentas del banco, según sea de ingreso o egreso, en categorías como:
- Consignaciones
- Retiros
- Cheques recibidos
- Cheques girados
- Etc.

### ¿Se puede personalizar la visualización de los tipos de movimiento bancario?
#### Respuesta
Sí, el módulo dispone de un catálogo de tipos de movimiento bancario personalizado para cada cuenta de conciliación. Esto permite configurar un color diferente a cada tipo de movimiento bancario para facilitar su visualización en la operación de conciliación.

### ¿Se pueden configurar las cuentas y centros de costos a afectar en los ajustes de notas débito o crédito?
#### Respuesta
Sí, es posible configurar en las notas débito o crédito datos como la cuenta y el centro de costos a afectar en los ajustes.

### ¿Qué tipo de reporte ofrece el módulo de conciliación bancaria automática?
#### Respuesta
El módulo cuenta con un documento de impresión especial que muestra de forma detallada la información consignada en la operación de conciliación bancaria automática.

### ¿Qué ventajas ofrece la automatización de la conciliación bancaria?
#### Respuesta
Automatiza la conciliación de la cuenta bancaria, concentrando todos los movimientos contables de la cuenta y los movimientos del extracto bancario en un solo lugar, permitiendo, con un par de clics, comparar y conciliar ambos movimientos.

### ¿En qué formatos se pueden importar los extractos bancarios al sistema?
#### Respuesta
Se pueden importar los extractos bancarios directamente al sistema desde archivos externos en los siguientes formatos:
- Microsoft Excel (.xls, .xlsx)
- CSV (.csv)
- TXT (.txt)
También se pueden pegar los datos directamente desde Microsoft Excel.

### ¿Cómo maneja el módulo las notas débito y crédito del banco?
#### Respuesta
El módulo registra de forma automática las notas débito y crédito del banco, evitando la duplicidad de la información.

### ¿Es obligatorio utilizar el módulo de conciliación bancaria automática desde el inicio de las operaciones de la empresa?
#### Respuesta
No, el usuario puede configurar en el sistema la fecha a partir de la cual va a empezar a manejar el módulo de conciliación bancaria automática. No está obligado a utilizar este módulo desde que inicia el registro de las operaciones de la empresa, sino en el momento en que lo crea adecuado.

### ¿Cómo ayuda el módulo de conciliación bancaria automática a controlar las cuentas bancarias?
#### Respuesta
Permite llevar un mejor control sobre las cuentas de banco, ya que se pueden detectar fácilmente los posibles errores que se pueden cometer al digitar la información contable.

### ¿Con qué frecuencia se puede realizar la conciliación bancaria?
#### Respuesta
Permite realizar la conciliación bancaria con la periodicidad que el usuario desee, ya sea mensual, semanal, bimestral, etcétera.

---

# Software contable ContaPyme - Descripción general del módulo de Flujos de efectivo
[Ver el video](https://www.youtube.com/watch?v=JNYJh0rFlro)

## Tema principal
Descripción general del módulo de Flujos de Efectivo en ContaPyme.

## Resumen general
El video explica el módulo de Flujos de Efectivo en ContaPyme, su propósito de suministrar información clara sobre el manejo del efectivo (entradas y salidas) durante un período determinado. Se basa en un saldo inicial, mostrando las fuentes y usos del efectivo para llegar al saldo final. Se destaca su afectación por diversas operaciones del sistema, su cumplimiento con las NIIF (NIC 7 y Sección 7), la inclusión en el módulo de contabilidad, las ventajas de los informes especializados, la flexibilidad en la configuración y el catálogo especializado de conceptos.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo principal del módulo de Flujos de Efectivo en ContaPyme?
#### Respuesta
El módulo de Flujos de Efectivo tiene como objetivo suministrar de forma clara información sobre el manejo que se le ha dado al efectivo, es decir, las entradas y salidas de efectivo que se han dado en la entidad durante un período determinado.

### ¿Qué tipo de operaciones del sistema afectan directamente al módulo de Flujos de Efectivo?
#### Respuesta
El módulo de Flujos de Efectivo es afectado directamente por cualquier operación del sistema que implique cuentas que manejen flujos de efectivo o que impliquen entradas y salidas de efectivo, como:
- Operaciones de ingresos
- Operaciones de gastos
- Operaciones del módulo de cartera y proveedores (cuentas por cobrar o cuentas por pagar)
- Operaciones del módulo de inventarios (compras y ventas)
- Operaciones de activos fijos

### ¿El módulo de Flujos de Efectivo cumple con las normas internacionales de información financiera (NIIF)?
#### Respuesta
Sí, este módulo se ajusta a la normatividad internacional al cumplir la NIC 7 de las NIIF plenas y la sección 7 de las NIIF para PYMES llamada estado de flujos de efectivo.

### ¿Qué métodos ofrece el módulo de Flujos de Efectivo para el cálculo de los flujos de efectivo?
#### Respuesta
El módulo brinda dos métodos para el cálculo de los flujos de efectivo: el método directo y el método indirecto.

### ¿Si ya tengo el módulo de contabilidad, tengo que adquirir el módulo de Flujos de Efectivo por separado?
#### Respuesta
No, si se cuenta con el módulo de contabilidad, este incluye el módulo de flujos de efectivo. Solo debe ingresar a configurarlo para empezar a utilizarlo.

### ¿Qué ventajas ofrece el informe especializado de estado de flujos de efectivo?
#### Respuesta
El informe presenta de manera detallada cuáles fueron las fuentes y los usos de las cuentas de efectivo en un período determinado, siendo una herramienta para que la gerencia de la empresa comprenda el manejo que se le ha dado al efectivo. Esto permite crear estrategias para una utilización más eficiente de los recursos y analizar los conceptos de mayor gasto de efectivo.

### ¿Puedo generar informes de flujos de efectivo para un período específico?
#### Respuesta
Sí, el sistema tiene la posibilidad de generar el informe en el período que el usuario elija, indicando una fecha inicial y una fecha final. Se puede consultar por mes, por bimestre, por año o entre las fechas que el usuario necesite.

### ¿Qué niveles de detalle puedo elegir al generar un informe de flujos de efectivo?
#### Respuesta
El usuario tiene la posibilidad de mostrar el informe por diferentes niveles de detalle:
- Totalizado por concepto
- Totalizado por cuenta
- Detallado por cuenta

### ¿Puedo configurar en el sistema una fecha a partir de la cual comenzar a utilizar el manejo de los flujos de efectivo?
#### Respuesta
Sí, el usuario puede configurar en el sistema una fecha a partir de la cual van a empezar a utilizar el manejo de los flujos de efectivo.

### ¿El sistema cuenta con un catálogo de conceptos predefinidos para el manejo de flujos de efectivo?
#### Respuesta
Sí, cuenta con un catálogo especializado listo para usar, en el cual el sistema trae configurados los diferentes conceptos tanto de fuentes como de usos, agrupado por actividades.

### ¿Puedo agregar o modificar conceptos en el catálogo de flujos de efectivo?
#### Respuesta
Sí, en este catálogo, además de los conceptos básicos, podemos crear y configurar más conceptos de acuerdo a las necesidades de la empresa. El usuario puede crear estructuras dependiendo de qué tan detallada necesite la información.

---

# Software contable ContaPyme - Descripción general del módulo de presupuesto
[Ver el video](https://www.youtube.com/watch?v=8xkR0VJAR_A)

## Tema principal
Descripción general del módulo de ejecución presupuestal en ContaPyme.

## Resumen general
Este video ofrece una visión general del módulo de ejecución presupuestal en ContaPyme. Explica los objetivos del módulo, que incluyen el control de ingresos y egresos y el seguimiento de lo presupuestado. Describe las características del módulo, como la elaboración de presupuestos detallados, el seguimiento de la ejecución, la generación de informes y la integración con otros módulos. Finalmente, destaca las ventajas, incluyendo la carga de presupuestos desde Excel, la importación de ejecuciones presupuestales, las ayudas para cargar cuentas, la consulta de la ejecución presupuestal y la generación de informes comparativos.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son los objetivos principales del módulo de ejecución presupuestal?
#### Respuesta
Los objetivos principales del módulo de ejecución presupuestal son:
- Permitir al usuario tener un completo control sobre los ingresos y egresos de la compañía.
- Brindar al usuario la posibilidad de realizar seguimiento a lo presupuestado frente a la ejecución presupuestal, facilitando la toma de decisiones.

### ¿Qué características tiene el módulo de ejecución presupuestal?
#### Respuesta
El módulo de ejecución presupuestal tiene las siguientes características:
- Permite elaborar detallados presupuestos por centros de costos, por meses y por cuentas.
- Permite realizar seguimiento a la ejecución presupuestal.
- Cuenta con un amplio conjunto de informes tanto de impresión como de consulta.
- Permite generar diferentes tablas comparativas de ejecución presupuestal como por centros de costos, por años y meses, entre otras.
- Cuenta con una completa integración con otros módulos, como son el módulo de contabilidad y el módulo de inventarios.

### ¿Qué ventajas ofrece el módulo de ejecución presupuestal?
#### Respuesta
El módulo de ejecución presupuestal ofrece las siguientes ventajas:
- Permite cargar presupuestos ya elaborados en Excel, simplemente con copiar y pegar.
- Permite importar ejecuciones presupuestales o presupuestos ya elaborados de otros centros de costos o de otros años y proyectarlos en un porcentaje específico.
- Incluye ayudas para cargar las cuentas a presupuestar y facilita la distribución de cifras entre las casillas de varios meses.
- Permite consultar en pantalla la ejecución presupuestal ya sea de la empresa o de un centro de costos.
- Cuenta con un explorador de ejecución presupuestal permitiendo visualizar todos sus movimientos y exportarlos a Excel.
- Permite hacer drill down hasta llegar a los comprobantes que dieron origen a los movimientos.
- Permite obtener todos los informes a nivel de empresa o de un centro de costos en particular.
- Permite generar el informe de presupuesto comparándolo con la ejecución presupuestal del periodo.
- Las diferentes tablas comparativas pueden ser consultadas por diferentes categorías como por empresas, años, meses, semanas, centros de costos, actividades empresariales, entre otras y permite visualizarlas con los valores acumulados o sin acumular.

### ¿Puedo cargar información de presupuestos desde Excel al módulo de ContaPyme?
#### Respuesta
Sí, el módulo de ejecución presupuestal permite cargar presupuestos ya elaborados en Excel de forma sencilla, utilizando la función de copiar y pegar.

### ¿Puedo importar datos de ejecución presupuestal desde otros centros de costos u otros años?
#### Respuesta
Sí, el módulo permite importar ejecuciones presupuestales o presupuestos ya elaborados de otros centros de costos o de otros años, y también permite proyectarlos en un porcentaje específico.

### ¿El módulo de presupuesto se integra con otros módulos de ContaPyme?
#### Respuesta
Sí, el módulo de ejecución presupuestal cuenta con una completa integración con otros módulos, como el módulo de contabilidad y el módulo de inventarios.

---

# Software contable ContaPyme - Ejemplo 1 Configuración del formato del extracto bancario
[Ver el video](https://www.youtube.com/watch?v=2klAaX3XGcs)

## Tema principal
Configuración del formato del extracto bancario en ContaPyme para la conciliación bancaria automática.

## Resumen general
Este video explica cómo configurar el formato de un extracto bancario en ContaPyme, enfocándose en la creación de la cuenta de conciliación y la definición del formato de importación. Se detalla cómo seleccionar la cuenta bancaria, el tercero (banco), la ruta de los extractos, el tipo de archivo (plano delimitado por punto y coma), y la asignación de los campos del extracto a los campos correspondientes en el sistema. El video proporciona una guía paso a paso para que los usuarios puedan importar sus extractos bancarios correctamente y automatizar el proceso de conciliación.

## Preguntas Frecuentes (FAQ)

### ¿Cómo se crea una cuenta de conciliación en ContaPyme?
#### Respuesta
Para crear una cuenta de conciliación en ContaPyme, siga estos pasos:

1.  Vaya a la pestaña **Contabilidad**.
2.  Haga clic en el acceso al **Catálogo de cuentas de conciliación**.
3.  Dé clic en el botón **Crear** en la cinta de opciones.
4.  El sistema le pedirá el código de la cuenta. Utilice el seleccionador (lupa) para abrir el **Plan de cuentas**.
5.  Seleccione la cuenta bancaria deseada.
6.  Dé clic en el botón **Aceptar**.

### ¿Dónde se encuentra la opción para definir el formato de importación del archivo del extracto bancario?
#### Respuesta
La opción para definir el formato de importación del archivo del extracto bancario se encuentra activa en la ventana de creación o edición de la cuenta de conciliación, siempre y cuando cuente con el módulo de conciliación bancaria automática. Una vez creada la cuenta de conciliación y asignado el tercero (banco), verá la casilla **Definir formato de importación del archivo del extracto bancario**.

### ¿Cómo se define la ruta por defecto donde se guardarán los extractos bancarios?
#### Respuesta
Una vez activada la opción "Definir formato de importación del archivo del extracto bancario", puede definir la ruta por defecto siguiendo estos pasos:

1. Dé clic en el botón **Seleccionar la ubicación**.
2. Busque la carpeta en su equipo donde guardará los extractos bancarios enviados por el banco.
3. Dé clic en **Aceptar**.

### ¿Cómo determinar el tipo de formato del extracto bancario?
#### Respuesta
Para determinar el tipo de formato del extracto bancario, debe verificar el archivo del extracto. En el ejemplo del video, el extracto bancario es un archivo plano delimitado por puntos y comas. Por lo tanto, se debe seleccionar la opción **Archivo plano delimitado por punto y coma**.

### ¿Qué significa el campo "Número de filas de título" al configurar el formato del extracto?
#### Respuesta
El campo "Número de filas de título" se refiere a la cantidad de filas en el extracto bancario que contienen los encabezados o títulos de las columnas de datos. Si el extracto no tiene filas de título, es decir, los datos comienzan desde la primera fila, debe dejar este campo en cero.

### ¿Cuándo debo activar la casilla "Cambiar el signo de los movimientos al importar el archivo del extracto bancario"?
#### Respuesta
Active la casilla "Cambiar el signo de los movimientos al importar el archivo del extracto bancario" si los valores en su extracto bancario tienen los signos invertidos (por ejemplo, los débitos aparecen como créditos y viceversa). Si los valores del extracto no tienen signos negativos ni positivos, deje esta opción sin marcar.

### ¿Cuándo debo activar la casilla "Análisis de signo para el valor del movimiento" y cómo se usa?
#### Respuesta
Active la casilla "Análisis de signo para el valor del movimiento" si los valores en su extracto bancario no tienen signos positivos ni negativos y tampoco están separados por movimientos débito o crédito.  Si la activa, aparecerá una casilla donde debe colocar el signo o letra que se interpreta como negativo (por ejemplo, la letra "C" para indicar crédito).

### ¿Cómo se configuran los campos del extracto bancario en la configuración del formato?
#### Respuesta
Para configurar los campos del extracto, siga estos pasos:

1.  **Revise detenidamente su extracto bancario** para identificar la información contenida en cada columna.
2.  En la fila **Nombre del campo en el extracto**, coloque el nombre de cada columna tal como aparece en el extracto. Si el extracto no tiene nombres de columna, asigne un nombre a cada columna para identificarla fácilmente.  Los nombres de las columnas se deben llenar en forma vertical.
3.  En la columna **Nombre del campo en el sistema**, asigne a cada dato del extracto el campo correspondiente en el sistema. Por ejemplo:
    *   Fecha del movimiento se corresponde con **Fecha día mes año**.
    *   Número del movimiento se corresponde con **Número documento soporte cheque y de consignación**.
    *   Valor del movimiento se corresponde con **Valor del movimiento**.
    *   Signo del movimiento se corresponde con **Valor para signo**.
    *   Descripción del movimiento se corresponde con **Descripción del movimiento**.
4.  Para campos que no están relacionados con ningún campo del sistema, seleccione la opción **No aplica**.
5.  Dé clic en el botón **Aceptar** para guardar la configuración.

---

# Software contable ContaPyme - Ejemplo 1 Operación de conciliación bancaria automática
[Ver el video](https://www.youtube.com/watch?v=cM7s1Vyl0lc)

## Tema principal
Realización de una conciliación bancaria automática en ContaPyme.

## Resumen general
Este video explica cómo realizar una conciliación bancaria automática en ContaPyme. Se muestra el proceso paso a paso, desde la carga del extracto bancario hasta la contabilización automática de los ajustes necesarios como gastos bancarios e intereses. Aprenderás a sincronizar movimientos, relacionar movimientos con diferencias y a identificar aquellos movimientos que requieren ajustes manuales. También se explica cómo parametrizar las cuentas para que el sistema registre los ajustes automáticamente.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la función de conciliación bancaria en ContaPyme?
#### Respuesta
Para acceder a la función de conciliación bancaria, sigue la siguiente ruta dentro del manejador de operaciones:
1. Ingresa a **Más Operaciones**.
2. Selecciona **Contabilidad**.
3. Haz clic en **Conciliación Bancaria**.

### ¿Qué información debo tener a la mano antes de empezar la conciliación bancaria?
#### Respuesta
Antes de comenzar, ten a mano lo siguiente:
-   La fecha de la operación de conciliación.
-   El detalle o descripción de la conciliación.
-   La fecha de corte de la conciliación.
-   La cuenta bancaria a conciliar.
-   El extracto bancario, ya sea en formato digital o físico, con el saldo final.

### ¿Cómo cargo el extracto bancario en ContaPyme para la conciliación?
#### Respuesta
Para cargar el extracto bancario:
1.  Dentro de la operación de conciliación bancaria, haz clic en el botón **Cargar Extracto Bancario**.
2.  Selecciona la ubicación donde se encuentra guardado el extracto proporcionado por el banco. (Esta ubicación debe estar configurada previamente para cada cuenta).
3.  Selecciona el archivo del extracto y haz clic en **Abrir**. El sistema cargará automáticamente los movimientos del extracto.

### ¿Qué significa sincronizar los movimientos en la conciliación bancaria?
#### Respuesta
Sincronizar los movimientos significa que el sistema verificará, uno por uno, los movimientos contables y los movimientos del extracto bancario. Si encuentra coincidencias basadas en el número y el valor del movimiento, los marcará automáticamente como conciliados. Los movimientos que no coincidan se dejarán sin marcar.

### ¿Cuándo debo usar la opción de "Relacionar movimientos seleccionados"?
#### Respuesta
Usa la opción "Relacionar movimientos seleccionados" cuando encuentres movimientos que el sistema no marcó automáticamente porque tienen alguna diferencia, por ejemplo, en el número, pero sabes que corresponden al mismo movimiento.
**Pasos:**
1. Selecciona el movimiento contable.
2. Selecciona el movimiento correspondiente en el extracto bancario.
3. Haz clic en el botón **Relacionar Movimientos Seleccionados**.
El sistema marcará estos movimientos como conciliados, indicando que tienen alguna diferencia.

### ¿Qué debo hacer si encuentro un movimiento en la contabilidad que no aparece en el extracto bancario?
#### Respuesta
Si un movimiento aparece en la contabilidad pero no en el extracto (por ejemplo, una consignación reciente), es posible que el banco aún no lo haya registrado. Deja ese movimiento sin marcar en la conciliación actual. El sistema lo cargará automáticamente en la próxima conciliación bancaria para que puedas conciliarlo en ese momento.

### ¿Qué ocurre si encuentro movimientos en el extracto bancario que no están registrados en la contabilidad?
#### Respuesta
Los movimientos del extracto que no están en la contabilidad (como gastos bancarios o intereses pagados) deberán ser registrados como ajustes. El sistema puede registrar estos ajustes automáticamente si la opción "Autogenerar" está activada y si las cuentas y centros de costos correspondientes están parametrizados previamente.

### ¿Cómo puedo configurar las cuentas para que ContaPyme registre automáticamente los ajustes de la conciliación?
#### Respuesta
Para que el sistema registre automáticamente los ajustes (como gastos bancarios e intereses) debes parametrizar las cuentas y centros de costos que se deberán afectar. Esto se realiza en el catálogo de tipos de movimiento bancario, específico para cada cuenta de conciliación, en los movimientos de nota débito y crédito.

### ¿Cómo imprimo la conciliación bancaria en ContaPyme?
#### Respuesta
Para imprimir la conciliación bancaria, haz clic en el botón **Imprimir y Vista Previa**. Se mostrará un documento con la información de la conciliación, incluyendo saldos, notas de crédito, notas de débito y saldos ajustados. Una vez revisado, cierra la vista previa y haz clic en el botón **Aceptar** para guardar la operación.

---

# Software contable ContaPyme - Ejemplo 1 Operación de movimiento contable
[Ver el video](https://www.youtube.com/watch?v=OnZJqYWGwGg)

## Tema principal
Registro de una operación de movimiento contable que afecta tanto la contabilización local como la NIF.

## Resumen general
Este video explica cómo registrar una operación de movimiento contable en ContaPyme, mostrando un ejemplo práctico del pago de honorarios a un contador. Se detalla el proceso para seleccionar las cuentas contables, centros de costos, registrar los valores, calcular automáticamente los impuestos y retenciones, e imprimir el comprobante. El video también muestra cómo verificar el impacto de la operación tanto en la contabilización local como en la NIF.

## Preguntas Frecuentes (FAQ)

### ¿Cómo accedo a la función de movimiento contable en ContaPyme?
#### Respuesta
Para acceder a la función de movimiento contable, sigue estos pasos:
1. Ve a la pestaña **Básico**.
2. Abre el **Manejador de Operaciones**.
3. Haz clic en el botón **Más Operaciones**.
4. Dentro de la ventana, selecciona la pestaña **Contabilidad**.
5. Elige la opción **Operación de Movimiento Contable**.

### ¿Cómo se sustenta una operación de movimiento contable?
#### Respuesta
Una operación de movimiento contable se sustenta con un **comprobante de egreso**. Puedes abrir el seleccionador de documentos de soporte utilizando el comando **Shift + F1**. Luego, busca el comprobante de egreso deseado en la lista.

### ¿Cómo ingreso la fecha de soporte en la operación de movimiento contable?
#### Respuesta
Dentro de la operación de movimiento contable, ubica el campo **Fecha de Soporte** y selecciona la fecha correspondiente en el calendario. En el ejemplo del video, la fecha es el **16 de marzo de 2015**.

### ¿Dónde se ingresa la descripción de la operación de movimiento contable?
#### Respuesta
La descripción de la operación se ingresa en el campo **Detalle de la Operación**. Este detalle será visible en el manejador de operaciones. Por ejemplo, podrías escribir "Pago de honorarios a Alirio Carvajal".

### ¿Cómo selecciono la cuenta contable para el gasto en la operación de movimiento contable?
#### Respuesta
Para seleccionar la cuenta contable, sigue estos pasos:
1. Abre el **seleccionador** de cuentas.
2. Busca la cuenta correspondiente al gasto. En el ejemplo, se utiliza la cuenta **5110 3005 de Asesoría Financiera**.
3. Utiliza la tecla **Enter** para desplazarte a la siguiente columna.

### ¿Cómo se asigna un centro de costos a la imputación en la operación de movimiento contable?
#### Respuesta
Para asignar un centro de costos, sigue estos pasos:
1. Abre el **seleccionador** de centros de costos.
2. Busca el centro de costos deseado. En el ejemplo, se utiliza el centro de costos **Contabilidad y Tesorería**.

### ¿Cómo se calculan automáticamente los impuestos y retenciones en ContaPyme?
#### Respuesta
Para calcular automáticamente los impuestos y retenciones, haz clic en el botón **Calcular Impuestos**. El sistema calculará automáticamente el rete IVA, el IVA asumido y la retención por honorarios, asignando los valores base y el tercero de la transacción correspondientes.

### ¿Cómo se asigna la contrapartida en la operación de movimiento contable?
#### Respuesta
La contrapartida representa la forma de pago. Para asignarla, abre el **seleccionador** y busca la cuenta correspondiente. En el ejemplo, se utiliza la cuenta del **Banco Nacional**. Puedes digitar el valor crédito o utilizar el botón **Diferencia** para que el sistema asigne el valor restante de forma automática.

### ¿Cómo se imprime la operación de movimiento contable?
#### Respuesta
Para imprimir la operación, sigue estos pasos:
1. Haz clic en el botón **Imprimir**.
2. Selecciona el tipo de documento de impresión: **Comprobante de Egreso, Nota Débito**.
3. Haz clic en el botón **Vista Previa** para revisar el documento.
4. Si todo está correcto, cierra la vista previa y asegúrate de que el botón **Autoprocesar** esté encendido.
5. Haz clic en el botón **Aceptar** para guardar e imprimir la operación.

### ¿Cómo verifico el movimiento contable generado por la operación?
#### Respuesta
Para verificar el movimiento contable generado, haz clic en el botón del **Inspector de Datos** y luego haz clic en el botón **Cargar**. El sistema mostrará los iconos que representan los movimientos para la contabilización local y para la contabilización NIF. Al hacer clic en cada icono, verás los detalles de la operación, como la cuenta, el centro de costos, el detalle, los débitos y créditos, el valor base, el tercero y demás datos.

---

# Software contable ContaPyme - Ejemplos de conceptos de Flujos de efectivo
[Ver el video](https://www.youtube.com/watch?v=ok4APHcscsI)
ok4APHcscsI

## Tema principal
Explicación de las estructuras de conceptos de flujos de efectivo en ContaPyme.

## Resumen general
Este video explica cómo crear y entender las diferentes estructuras de conceptos de flujos de efectivo dentro de ContaPyme. Muestra ejemplos de estructuras simples, la estructura predeterminada que ofrece ContaPyme y una estructura personalizada con conceptos padre e hijo. El video destaca la importancia de estas estructuras para visualizar las actividades de operación, inversión y financiación, así como las fuentes y usos del efectivo.

## Preguntas Frecuentes (FAQ)

### ¿Qué es una estructura de conceptos de flujos de efectivo?
#### Respuesta
Es una lista organizada que muestra las diferentes actividades (operación, inversión y financiación) y sus respectivos conceptos, identificando las fuentes y usos del efectivo.

### ¿Qué tipos de estructuras de conceptos de flujos de efectivo se pueden crear?
#### Respuesta
Se pueden crear estructuras simples con fuentes y usos comunes, la estructura predeterminada de ContaPyme con conceptos más utilizados y estructuras totalmente personalizadas con conceptos padre e hijo.

### ¿Cómo se identifican las fuentes y usos del efectivo en la estructura de ContaPyme?
#### Respuesta
En la estructura predeterminada de ContaPyme, los conceptos de **fuentes de efectivo** se muestran en color **verde** y los conceptos de **usos de efectivo** se muestran en color **rojo**.

### ¿Qué actividades se discriminan en la estructura de conceptos de flujos de efectivo?
#### Respuesta
Las actividades que se discriminan son:
*   Actividades de Operación
*   Actividades de Inversión
*   Actividades de Financiación

### ¿Qué es un concepto padre y un concepto hijo en una estructura personalizada de flujos de efectivo?
#### Respuesta
En una estructura personalizada, un **concepto padre** es una categoría general que agrupa varios **conceptos hijos** más específicos.

### ¿Qué beneficios ofrece la estructura de conceptos de flujos de efectivo que trae ContaPyme por defecto?
#### Respuesta
La estructura predeterminada de ContaPyme trae los conceptos más utilizados y es de gran utilidad para una empresa que quiere llevar control de sus flujos de efectivo.

---

# Software contable ContaPyme - Empresa para el registro de tasas de cambio
[Ver el video](https://www.youtube.com/watch?v=XjnyKYzjuQo)
XjnyKYzjuQo

## Tema principal
Configuración de la empresa encargada de registrar las tasas de cambio en ContaPyme para múltiples empresas dentro de la misma área de trabajo.

## Resumen general
Este video explica cómo configurar una única empresa dentro de ContaPyme para que sea la responsable de registrar las tasas de cambio de moneda extranjera. Esto es útil cuando se tienen varias empresas creadas en la misma área de trabajo, ya que permite centralizar el registro de las tasas de cambio y evitar tener que ingresarlas individualmente en cada empresa. Al designar una empresa principal, las demás empresas consultarán automáticamente las tasas de cambio registradas por ésta, simplificando los ajustes y conversiones de moneda extranjera.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es útil designar una empresa para el registro de tasas de cambio en ContaPyme?
#### Respuesta
Designar una única empresa para el registro de tasas de cambio es útil cuando tienes varias empresas creadas en la misma área de trabajo en ContaPyme. Esto centraliza la gestión de las tasas de cambio, evitando que tengas que registrar las mismas tasas en cada empresa individualmente.

### ¿Qué ventajas ofrece el manejo de una sola empresa para el registro de tasas de cambio?
#### Respuesta
Las ventajas son:
-   Simplifica el proceso de registro de tasas de cambio.
-   Evita la duplicación de tareas al registrar las tasas en cada empresa.
-   Asegura la consistencia de las tasas de cambio utilizadas por todas las empresas en la misma área de trabajo.

### ¿Dónde se configura la empresa encargada del registro de tasas de cambio?
#### Respuesta
La configuración se encuentra en la configuración del manejo de moneda extranjera, dentro de la configuración del catálogo de cuentas.

### ¿Cómo se selecciona la empresa que registrará las tasas de cambio?
#### Respuesta
Para seleccionar la empresa encargada del registro de tasas de cambio, sigue estos pasos:

1.  Ubícate en la **configuración del manejo de moneda extranjera**, dentro de la configuración del catálogo de cuentas.
2.  En la opción **Empresa para el registro de tasas de cambio**, selecciona la empresa deseada del explorador gráfico.

### ¿Qué ocurre si solo tengo una empresa creada en ContaPyme?
#### Respuesta
Si solo tienes una empresa creada, el sistema la indicará por defecto como la encargada del registro de tasas de cambio.

---

# Software contable ContaPyme - Estado de resultados en moneda extranjera
[Ver el video](https://www.youtube.com/watch?v=7YdCxf2ZtYs)
[7YdCxf2ZtYs]

## Tema principal
Generación del Estado de Resultados en moneda extranjera.

## Resumen general
Este video explica cómo generar el Estado de Resultados en ContaPyme, mostrando los saldos en una moneda diferente a la local. Aprenderás a seleccionar el tipo de Estado de Resultados, indicar la fecha para el cálculo de saldos, elegir la moneda extranjera deseada y visualizar el informe con la información convertida según la tasa de cambio correspondiente. También muestra cómo cambiar la moneda del informe una vez generado.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el Estado de Resultados en moneda extranjera?
#### Respuesta
El Estado de Resultados en moneda extranjera es un informe financiero que muestra los resultados de una empresa en una moneda diferente a la moneda local en la que normalmente opera. Esto permite visualizar el desempeño financiero en términos de otra divisa.

### ¿Qué tipos de Estado de Resultados se pueden generar en moneda extranjera en ContaPyme?
#### Respuesta
Todas las presentaciones del Estado de Resultados se pueden generar en moneda extranjera, a excepción de la consulta de Estado de Resultados. Algunos ejemplos son:
- Estado de Resultados saldos
- Estado de Resultados saldos a dos columnas
- Estado de Resultados comparativo (saldo anterior débito crédito nuevo saldo)
- Estado de Resultados comparativo con la variación
- Estado de Resultados de movimiento del período

### ¿Cómo genero un Estado de Resultados en moneda extranjera en ContaPyme?
#### Respuesta
Para generar el Estado de Resultados en moneda extranjera, sigue estos pasos:

1.  Dirígete a la pestaña **Contabilidad**.
2.  Ve al grupo de informes **Estados Financieros Básicos**.
3.  Selecciona **Estado de Resultados**.
4.  Escoge el tipo de Estado de Resultados que deseas generar (por ejemplo, Estado de Resultados con saldos a dos columnas).
5.  Indica la fecha para el cálculo de los saldos de las cuentas. La conversión a moneda extranjera se realizará basándose en la tasa de cambio registrada o vigente para esta fecha.
6.  Aplica filtros si es necesario.
7.  Selecciona el nivel de detalle y otras configuraciones deseadas.
8.  Activa la opción **Mostrar valores monetarios en otra unidad de moneda**.
9.  Selecciona la moneda extranjera deseada de tu catálogo de monedas.
10. Haz clic en el botón **Ver Reporte**.

### ¿Dónde encuentro la tasa de cambio utilizada para la conversión a moneda extranjera en el Estado de Resultados?
#### Respuesta
La tasa de cambio utilizada para la conversión a moneda extranjera se muestra en el encabezado del reporte, junto con el nombre del informe, la fecha de cálculo de los saldos y la moneda en la que se presenta el informe.

### ¿Cómo puedo cambiar la moneda en la que se muestra el Estado de Resultados después de haberlo generado?
#### Respuesta
Para cambiar la moneda del Estado de Resultados una vez generado, sigue estos pasos:

1.  En la cinta de opciones del informe, haz clic en la opción **Ver datos**.
2.  Selecciona la nueva moneda en la que deseas ver el informe.
3.  Haz clic en el botón **Recalcular** para generar nuevamente el informe con la nueva moneda.

### ¿Qué información se muestra en el Estado de Resultados en moneda extranjera?
#### Respuesta
El Estado de Resultados en moneda extranjera muestra todos los valores del informe convertidos a la moneda extranjera seleccionada, incluyendo:
- Total de ingresos
- Total de egresos
- Utilidad del ejercicio

### ¿Qué puedo hacer con el Estado de Resultados generado en ContaPyme?
#### Respuesta
El informe generado puede ser:
- Impreso
- Guardado en diferentes formatos
- Enviado por email

---

# Software contable ContaPyme - Explicación barra de botones del editor de presupuestos
[Ver el video](https://www.youtube.com/watch?v=VvoHrpG6pX4)
VvoHrpG6pX4

## Tema principal
Funcionalidad de la barra de botones en el editor de presupuestos de ContaPyme.

## Resumen general
Este video explica la función de cada uno de los botones en la barra de herramientas del editor de presupuestos dentro de ContaPyme. Se explican tanto las funciones básicas (borrar, insertar, copiar, pegar) como las funciones especializadas para el cargue y formato de presupuestos (cargar cuentas, importar presupuesto, importar ejecución presupuestal, distribuir valor, ordenar, borrar, formato, fijar/liberar, color a filas, color a columnas, miles). El video muestra ejemplos prácticos de cómo utilizar cada botón para agilizar la creación y edición de presupuestos.

## Preguntas Frecuentes (FAQ)

### ¿Cómo puedo cargar rápidamente todas las cuentas hijas de una cuenta en el presupuesto?
#### Respuesta
Puedes usar el botón **Cargar cuentas**.

1.  Ubícate en la cuenta de la cual deseas cargar las cuentas hijas.
2.  Haz clic en el botón **Cargar cuentas**.

Esto cargará automáticamente todas las cuentas hijas de la cuenta seleccionada en el presupuesto, ahorrándote la tarea de seleccionarlas una por una desde el catálogo del plan de cuentas.

### ¿Cómo puedo importar un presupuesto de otro año, centro de costos o empresa?
#### Respuesta
Puedes usar el botón **Importar presupuesto**.

1.  Haz clic en el botón **Importar presupuesto**.
2.  En la ventana que se abre, indica los datos de origen:
    *   **Año del presupuesto a importar**.
    *   **Fecha de vigencia de los centros de costos**.
    *   **Empresa** desde la cual importarás el presupuesto (si tienes varias empresas creadas).
    *   **Centro de costos** desde el cual importarás el presupuesto (si no seleccionas ninguno, se importará el acumulado de todos los centros de costos).
3.  En los datos para generar el nuevo presupuesto, indica cómo ajustar los valores para cada mes (por decenas, centenas, miles, o no ajustarlos).
4.  Indica si deseas ajustar el nuevo presupuesto en un porcentaje. Si no activas esta casilla, el sistema importará el presupuesto al 100%.
5.  Haz clic en **Importar**.

### ¿Cómo puedo importar la ejecución presupuestal de un período anterior para crear un presupuesto más realista?
#### Respuesta
Puedes usar el botón **Importar ejecución presupuestal**.

1.  Haz clic en el botón **Importar ejecución presupuestal**.
2.  En la ventana que se abre, indica los datos de origen:
    *   **Año** de la ejecución presupuestal a importar.
    *   **Fecha de vigencia de los centros de costos**.
    *   **Empresa** desde la cual importarás la ejecución presupuestal (si tienes varias empresas creadas).
    *   **Centro de costos** desde el cual importarás la ejecución presupuestal.
3.  En los datos para generar el nuevo presupuesto, indica cómo ajustar los valores (a miles, etc.) y si deseas ajustar el presupuesto en un porcentaje.
4.  Haz clic en **Importar**.

### ¿Cómo puedo dividir un valor entre varias celdas seleccionadas en el presupuesto?
#### Respuesta
Puedes usar el botón **Distribuir valor**.

1.  Selecciona las celdas en las que deseas distribuir el valor.
2.  Haz clic en el botón **Distribuir valor**.
3.  Ingresa el valor a distribuir.
4.  Haz clic en **Aceptar**.

El valor se dividirá en la misma proporción entre las celdas seleccionadas.

### ¿Cómo puedo ordenar las cuentas del presupuesto de forma ascendente según su código?
#### Respuesta
Puedes usar el botón **Ordenar cuentas**. Simplemente haz clic en el botón y el sistema ordenará automáticamente las cuentas.

### ¿Cuál es la diferencia entre el botón "Borrar" y el botón "Borrar renglones"?
#### Respuesta
El botón **Borrar** borra solo la información de las celdas seleccionadas, pero los renglones permanecen. El botón **Borrar renglones** elimina completamente los renglones seleccionados.

### ¿Cómo puedo visualizar las cuentas en el editor de presupuesto por su nombre en lugar de su código?
#### Respuesta
Puedes usar el botón **Formato**. Al activarlo, se mostrarán los nombres de las cuentas en lugar de los códigos.

### ¿Cómo puedo fijar la primera columna (Cuenta) en el editor de presupuesto para que no se oculte al desplazarme horizontalmente?
#### Respuesta
Puedes usar el botón **Fijar/Liberar**. Al activar este botón, la primera columna quedará fija, permitiéndote desplazarte por las demás columnas sin perder de vista las cuentas.

### ¿Cómo puedo aplicar colores a las filas o columnas del editor de presupuesto?
#### Respuesta
*   Para aplicar color a las filas intermedias, usa el botón **Color a filas**.
*   Para aplicar color a las columnas de los meses, usa el botón **Color a columnas**.

### ¿Cómo puedo visualizar los valores en miles de pesos en el editor de presupuesto?
#### Respuesta
Puedes usar el botón **Miles**. Al activarlo, los valores se mostrarán en miles de pesos.

---

# Software contable ContaPyme - Explicación conceptual del ajuste por diferencia en cambio
[Ver el video](https://www.youtube.com/watch?v=RWY7ZAdO9dc)
Ajuste por diferencia en cambio

## Tema principal
Automatización de ajustes por diferencia en cambio en ContaPyme.

## Resumen general
Este video explica el concepto de ajustes por diferencia en cambio en ContaPyme, mostrando cómo el sistema automatiza este proceso para cuentas en moneda extranjera.  A través de un ejemplo práctico de una cuenta por cobrar, se detalla cómo el sistema calcula y ajusta las diferencias generadas por las fluctuaciones en las tasas de cambio, y cómo esto impacta los saldos en moneda local. Se aprende cómo el ajuste cancela los saldos a favor o en contra del cliente, realizando movimientos contables específicos.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el ajuste por diferencia en cambio en ContaPyme?
#### Respuesta
Es un proceso automatizado que permite ajustar los saldos de las cuentas en moneda extranjera debido a las fluctuaciones en las tasas de cambio.  Este ajuste busca cancelar los saldos a favor o en contra del cliente que surgen al convertir los montos de la moneda extranjera a la moneda local.

### ¿Cómo afecta la tasa de cambio a las cuentas por cobrar en moneda extranjera?
#### Respuesta
Cuando se crea una cuenta por cobrar en moneda extranjera, el sistema consulta la tasa de cambio del día para convertir el monto a moneda local. Cuando el cliente paga, el sistema usa la tasa de cambio del día del pago. Si la tasa de cambio ha variado, esto genera una diferencia al convertir nuevamente a moneda local, creando un saldo a favor o en contra del cliente.

### ¿Cómo se realiza el ajuste por diferencia en cambio cuando hay un saldo a favor del cliente?
#### Respuesta
El sistema suma el valor del saldo a favor a la cuenta por cobrar para cancelarlo. Esto se realiza a través de un movimiento contable: un débito a la cuenta por cobrar y un crédito a la cuenta de diferencia en cambio (ingreso).

### ¿Qué tipo de movimiento contable se realiza cuando el ajuste por diferencia en cambio genera un saldo en contra del cliente?
#### Respuesta
En este caso, el sistema cancela la cuenta por cobrar contra un gasto.

### ¿Qué cuentas contables se utilizan en los ajustes por diferencia en cambio?
#### Respuesta
Las cuentas que se utilizan son las configuradas para cada una de las monedas en el catálogo de monedas dentro de ContaPyme. Estas cuentas pueden ser de ingreso (cuando el saldo es a favor del cliente) o de gasto (cuando el saldo es en contra del cliente).

### ¿En qué momentos se pueden realizar los ajustes por diferencia en cambio en ContaPyme?
#### Respuesta
Los ajustes por diferencia en cambio se pueden realizar en tres momentos diferentes, dependiendo de la configuración seleccionada:
1.  Al procesar el movimiento.
2.  Al procesar la operación de registro de tasa de cambio.
3.  Al procesar la operación de acciones automáticas de fin de mes.
Para mayor información sobre las configuraciones acerca de los ajustes por diferencia en cambio, consulte los videos del capítulo configuración del manejo de moneda extranjera.

---

# Software contable ContaPyme - Explicación conceptual del módulo de conciliación bancaria automática
[Ver el video](https://www.youtube.com/watch?v=6i-zd9ulwaM)
[Software contable ContaPyme - Explicación conceptual del módulo de conciliación bancaria automática]

## Tema principal
Entendimiento general del módulo de conciliación bancaria automática en ContaPyme.

## Resumen general
Este video explica conceptualmente el módulo de conciliación bancaria automática en ContaPyme. Detalla la importancia de conciliar los movimientos bancarios registrados en la contabilidad con los extractos bancarios proporcionados por las entidades financieras. Explica cómo ContaPyme facilita este proceso mediante la clasificación de movimientos bancarios, la numeración de transacciones, la gestión de cuentas a conciliar y la importación de extractos bancarios digitales. El objetivo es proporcionar una visión general de los elementos y procesos involucrados en la conciliación bancaria automática dentro de ContaPyme.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un extracto bancario y cuál es su importancia en la conciliación?
#### Respuesta
Un extracto bancario es un documento proporcionado por el banco que muestra de forma detallada toda la información de una cuenta bancaria durante un periodo específico. Incluye el saldo inicial, los movimientos (ingresos y egresos) y el saldo final. Es crucial para la conciliación bancaria, ya que permite comparar los registros del banco con los registros contables de la empresa.

### ¿Por qué es importante clasificar los movimientos bancarios al registrarlos en la contabilidad?
#### Respuesta
Clasificar los movimientos bancarios (ingresos y egresos) al registrarlos en la contabilidad ayuda a que la conciliación sea más efectiva y correcta. Permite identificar rápidamente el tipo de transacción (consignación, transferencia, cheque, etc.) y facilita la comparación con el extracto bancario.

### ¿Dónde se configuran los tipos de movimiento bancario en ContaPyme?
#### Respuesta
En ContaPyme, la clasificación de los diferentes tipos de movimiento bancario se gestiona en el catálogo de tipos de movimiento bancario. Siempre que se realice un movimiento en una cuenta bancaria marcada para conciliar, se debe indicar el tipo de movimiento bancario correspondiente.

### ¿Se puede personalizar el catálogo de tipos de movimiento bancario en ContaPyme?
#### Respuesta
Sí, el catálogo de tipos de movimiento bancario puede personalizarse para cada cuenta a conciliar. Esto permite configurar movimientos específicos, como notas débito o crédito, con parámetros especiales que faciliten el proceso de conciliación.

### ¿Por qué es importante numerar las transacciones bancarias tanto en el extracto como en la contabilidad?
#### Respuesta
La numeración de las transacciones bancarias es esencial para la conciliación. Al tener un número único que identifica cada transacción tanto en el extracto bancario como en la contabilidad, se facilita la comparación y se asegura la correspondencia entre los registros del banco y los de la empresa.

### ¿Es obligatorio conciliar todas las cuentas bancarias en ContaPyme?
#### Respuesta
No, no es obligatorio conciliar todas las cuentas bancarias. Se puede indicar cuáles cuentas se van a conciliar mediante el catálogo de cuentas de conciliación. Esto permite administrar las cuentas que se desean conciliar.

### ¿Qué información se necesita para conciliar una cuenta bancaria en ContaPyme?
#### Respuesta
Se necesitan los siguientes elementos:
1.  **Tipo de movimiento bancario:** La clasificación del movimiento (consignación, transferencia, etc.).
2.  **Número del movimiento:** El número de identificación de la transacción.
3.  **Cuenta bancaria:** La cuenta a la cual se le realizó el movimiento.
4.  **Valor del movimiento:** El monto de la transacción.
5.  **Extracto bancario digital:** Un archivo digital con la información del extracto bancario.

### ¿Qué ventajas ofrece el módulo de conciliación bancaria automática en ContaPyme?
#### Respuesta
El módulo de conciliación bancaria automática permite:
1.  Cargar el extracto bancario en formato digital.
2.  Comparar y conciliar los movimientos bancarios de forma automatizada.
3.  Contabilizar automáticamente las notas débito o crédito que se encuentren en el extracto bancario y que no estén registradas en la contabilidad.
4.  Generar un documento impreso con el resumen de la conciliación, incluyendo saldos, notas débito/crédito, etc.

---

# Software contable ContaPyme - Explicación conceptual del módulo de Flujos de efectivo
[Ver el video](https://www.youtube.com/watch?v=ScOFcWJYRsg)
ScOFcWJYRsg

## Tema principal
Introducción conceptual al módulo de flujos de efectivo en ContaPyme.

## Resumen general
Este video ofrece una explicación general y conceptual del módulo de flujos de efectivo en ContaPyme.  Utiliza un ejemplo práctico con ingresos y egresos de una persona (María Pérez) para ilustrar cómo funciona el módulo. Se definen conceptos clave como saldo inicial, fuentes (ingresos), usos (egresos) y saldo final.  Además, explica cómo se clasifican las transacciones en conceptos de flujo de efectivo y la importancia del informe de Estado de Flujos de Efectivo para la toma de decisiones.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo principal del video?
#### Respuesta
El objetivo principal del video es proporcionar una comprensión general y conceptual del funcionamiento del módulo de flujos de efectivo en ContaPyme.

### ¿Qué son las "fuentes" en el contexto del módulo de flujos de efectivo?
#### Respuesta
Las "fuentes" se refieren a las entradas de dinero en efectivo que una persona o empresa recibe durante un período determinado. Son sinónimo de ingresos de efectivo.

### ¿Qué son los "usos" en el contexto del módulo de flujos de efectivo?
#### Respuesta
Los "usos" se refieren a las salidas de dinero en efectivo en las que una persona o empresa incurre durante un período determinado. Son sinónimo de egresos de efectivo.

### ¿Cómo se calcula el saldo final en el módulo de flujos de efectivo, según el ejemplo dado?
#### Respuesta
El saldo final se calcula de la siguiente manera:

**Saldo Final = Saldo Inicial + Entradas de Dinero - Salidas de Dinero**

### ¿Qué es el catálogo de conceptos de flujos de efectivo y para qué sirve?
#### Respuesta
El catálogo de conceptos de flujos de efectivo es una herramienta donde se crean y configuran los conceptos para clasificar las fuentes (entradas) y los usos (salidas) de efectivo.  Permite categorizar las transacciones para obtener informes detallados.

### ¿Cuándo solicita el sistema que se asigne un concepto de flujo de efectivo a una operación?
#### Respuesta
El sistema solicitará el concepto de flujo de efectivo en las operaciones a partir de la fecha en que se configure el manejo de flujos de efectivo en ContaPyme.

### ¿Qué tipo de informe se puede obtener con el módulo de flujos de efectivo y cuál es su utilidad?
#### Respuesta
Se puede obtener un informe detallado de las fuentes y los usos del dinero en efectivo en un período determinado, específicamente el informe **"Estado de flujos de efectivo por el método directo"**. Este informe es crucial para la toma de decisiones en las empresas, ya que permite conocer detalladamente los conceptos que originan el saldo de las cuentas de efectivo que se visualizan en el balance general.

### ¿Qué información proporciona el informe del Estado de Flujos de Efectivo?
#### Respuesta
El informe del Estado de Flujos de Efectivo proporciona información detallada sobre los conceptos por los cuales se está originando el saldo de las cuentas de efectivo que se ven en el balance general.

### ¿Qué otros temas relacionados con el módulo de flujos de efectivo se abordarán en videos posteriores?
#### Respuesta
En videos posteriores se estudiarán:

*   Conceptos relacionados con flujos de efectivo.
*   Las configuraciones para el manejo de flujos de efectivo en el sistema.
*   El catálogo de conceptos de flujos de efectivo.
*   Ejemplos de registro de operaciones manejando flujos de efectivo.
*   La composición del informe de flujos de efectivo.

---

# Software contable ContaPyme - Explicación conceptual del módulo de presupuesto
[Ver el video](https://www.youtube.com/watch?v=y-7ZT8q7kwY)
y-7ZT8q7kwY

## Tema principal
Descripción general del módulo de ejecución presupuestal en ContaPyme.

## Resumen general
Este video ofrece una introducción al módulo de ejecución presupuestal en ContaPyme. Explica cómo el registro del presupuesto permite controlar los ingresos y egresos de la compañía a nivel de sedes, centros de costos o general. Muestra un ejemplo de cómo registrar un presupuesto para un centro de costos y cómo utilizar el informe de consulta de ejecución presupuestal para comparar lo ejecutado con lo presupuestado, facilitando la toma de decisiones.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo principal del módulo de ejecución presupuestal en ContaPyme?
#### Respuesta
El objetivo principal es permitir al usuario tener un control sobre los ingresos y egresos de la compañía, ya sea a nivel de sedes, centros de costos, o general para la empresa.

### ¿Qué tipo de información puedo controlar con el registro del presupuesto en ContaPyme?
#### Respuesta
Puedes controlar los ingresos y egresos de la compañía.

### ¿A qué niveles se puede registrar el presupuesto en ContaPyme?
#### Respuesta
El presupuesto se puede registrar a nivel de sedes, centros de costos, o general para la empresa.

### ¿Qué tipo de informes ofrece el módulo de ejecución presupuestal?
#### Respuesta
El módulo ofrece un amplio conjunto de informes de ejecución presupuestal que permiten comparar lo ejecutado frente a lo presupuestado en tiempo real.

### ¿Qué beneficios obtengo al comparar lo ejecutado con lo presupuestado?
#### Respuesta
La comparación permite levantar alertas y tomar las medidas necesarias.

### ¿Qué cuentas se presupuestaron en el ejemplo mostrado en el video?
#### Respuesta
En el ejemplo se presupuestaron cuentas del grupo de ingresos (equipos de cómputo y computadores exentos) y del grupo de gastos (sueldos, acueducto y alcantarillado, energía eléctrica y telefonía).

### ¿Qué información puedo visualizar en el informe de Consulta de ejecución presupuestal?
#### Respuesta
En el informe se puede visualizar el saldo anterior de la ejecución presupuestal de las cuentas, los movimientos (débitos y créditos) de cada una de ellas, el saldo actual de las cuentas, el valor presupuestado para cada una y el correspondiente porcentaje de ejecución.

### ¿Qué permite el informe de Consulta de ejecución presupuestal?
#### Respuesta
Permite comparar lo que se ha ejecutado frente a lo que se tiene presupuestado para cada una de las cuentas.

### ¿Qué información financiera muestra el informe de Consulta de ejecución presupuestal al finalizar?
#### Respuesta
Al finalizar, el informe muestra la información financiera para el periodo consultado.

---

# Software contable ContaPyme - Explorador de contabilidad
[Ver el video](https://www.youtube.com/watch?v=8mTDTTON7co)
Explorador de Contabilidad

## Tema principal
Visualización y análisis de los asientos contables en ContaPyme a través del explorador de contabilidad.

## Resumen general
Este video explica cómo utilizar el explorador de contabilidad en ContaPyme. El explorador de contabilidad es un listado de todos los asientos contables realizados en el sistema durante un período determinado. El video muestra cómo acceder al explorador, filtrar información, personalizar la visualización, exportar datos, y analizar los movimientos contables para identificar errores o inconsistencias. Se explica cómo agrupar datos, aplicar filtros a las columnas y visualizar las operaciones que originaron los movimientos contables.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el explorador de contabilidad en ContaPyme?
#### Respuesta
El explorador de contabilidad es un listado completo de todos los asientos contables registrados en el sistema durante un período específico. Permite visualizar cada una de las cuentas con su respectiva imputación contable.

### ¿Para qué sirve el explorador de contabilidad?
#### Respuesta
El explorador de contabilidad sirve para:
- Buscar errores e inconsistencias.
- Realizar tareas de auditoría.
- Exportar datos a Excel u otros formatos.
- Generar reportes personalizados.
- Visualizar la información contable de cada operación registrada en el sistema.

### ¿Qué columnas se muestran por defecto en el explorador de contabilidad?
#### Respuesta
Por defecto, el explorador de contabilidad muestra las siguientes columnas:
- Fecha del documento
- Número del documento
- Secuencia del movimiento
- Código de la cuenta
- Nombre de la cuenta
- Código del tercero
- Nombre del tercero
- Centro de costos
- Débitos
- Créditos
- Saldo
- Detalle

### ¿Cómo accedo al explorador de contabilidad en ContaPyme?
#### Respuesta
Para acceder al explorador de contabilidad, sigue esta ruta:
1. Ve a la pestaña **Contabilidad**.
2. Haz clic en el icono del **Explorador de Contabilidad**.

### ¿Cómo puedo definir el rango de fechas para consultar la información en el explorador de contabilidad?
#### Respuesta
En la cinta de opciones del explorador de contabilidad, encontrarás los botones para definir:
1. La **fecha inicial**: Indica la fecha desde la cual se generarán los movimientos.
2. La **fecha final**: Indica la fecha hasta la cual se generarán los movimientos.

### ¿Cómo puedo añadir filtros al explorador de contabilidad?
#### Respuesta
1. Haz clic en el botón para **Añadir filtro** en la cinta de opciones.
2. En la ventana que se abre, puedes especificar:
    - Fecha inicial y fecha final.
    - Rango de cuentas.
    - Tercero específico.
    - Tipo de documento.
    - Filtros avanzados.
3. Haz clic en el botón **Aceptar** para aplicar los filtros.

### ¿Cómo puedo filtrar los movimientos por tipo de operación?
#### Respuesta
1. Haz clic en el botón **Tipo de Operación** en la cinta de opciones.
2. Selecciona el tipo de operación que deseas visualizar.
    *La cantidad de operaciones mostradas dependerá del tipo de licenciamiento.*

### ¿Cómo puedo exportar la información del explorador de contabilidad?
#### Respuesta
Haz clic en el botón para **Guardar** en la cinta de opciones. Podrás guardar el explorador en formato Excel, HTML, XML o TXT.

### ¿Cómo puedo imprimir la vista del explorador de contabilidad?
#### Respuesta
Haz clic en el botón para **Imprimir** en la cinta de opciones.

### ¿Cómo puedo copiar la información del explorador de contabilidad al portapapeles?
#### Respuesta
Haz clic en el botón para **Copiar** en la cinta de opciones.

### ¿Cómo puedo activar la línea de filtros en las columnas del explorador de contabilidad?
#### Respuesta
Haz clic en el botón **Filtro** en la cinta de opciones. Esto activará una línea de filtros en cada columna, permitiéndote filtrar datos específicos.

### ¿Cómo puedo buscar un dato específico dentro del explorador de contabilidad?
#### Respuesta
1. Ubícate en la columna donde deseas buscar el dato.
2. En el campo de búsqueda, indica el dato que deseas encontrar.
3. Presiona la tecla **Enter**. El sistema se ubicará en la primera celda que coincida con el dato de búsqueda.

### ¿Cuál es la diferencia entre el modo Lista y el modo Filtro en el explorador de contabilidad?
#### Respuesta
- **Modo Lista:** Muestra todos los movimientos existentes en el rango de fechas especificado. Para buscar un dato, debes ubicarte en la columna específica y digitar el dato en el campo "Buscar".
- **Modo Filtro:** Solo carga la información que coincide con los parámetros de búsqueda especificados en el filtro de la columna. Es recomendable cuando el listado de movimientos es muy grande.

### ¿Cómo puedo ver la contabilización local o NIF en el explorador de contabilidad?
#### Respuesta
Haz clic en el botón correspondiente a la **contabilización local** o a la **contabilización NIF** para que el sistema cargue los movimientos correspondientes.

### ¿Cómo puedo visualizar gráficamente el movimiento de las cuentas?
#### Respuesta
1. Haz clic en el botón para ver la información de forma **Gráfica**.
2. Selecciona la presentación que deseas visualizar.
3. Para regresar al explorador, haz clic en el botón **Tabla de Datos**.

### ¿Cómo puedo agrupar los totales por columna en el explorador de contabilidad?
#### Respuesta
1. Haz clic en el botón para ver los **Totales Agrupados**.
2. Selecciona la columna por la cual deseas agrupar los datos (ej. Tercero Código).
3. Con el botón **Pasar Campo**, indica el parámetro para agrupar.
4. Haz clic en el botón **Aceptar**.
    *El sistema abrirá una ventana aparte mostrando los totales agrupados por el parámetro seleccionado.*

### ¿Cómo puedo configurar las opciones de visualización del explorador de contabilidad?
#### Respuesta
Haz clic en el botón de **Configuración** para definir diferentes opciones, como opciones de visualización, valores por defecto, entre otras.

### ¿Cómo puedo ocultar o agregar columnas en el explorador de contabilidad?
#### Respuesta
Haz clic en el botón **Organizar**. Desde allí puedes ocultar las columnas que no deseas visualizar y agregar nuevas columnas al informe.

### ¿Cómo puedo guardar la presentación del informe en el explorador de contabilidad?
#### Respuesta
En el botón **Organizar**, puedes:
- **Guardar** la presentación actual del informe.
- **Restablecer** la presentación original del informe.
- **Guardar como** una nueva presentación para consultarla posteriormente.

### ¿Cómo puedo agrupar los movimientos arrastrando la columna al panel amarillo?
#### Respuesta
1. Da clic sostenido en el nombre de la columna que deseas agrupar (ej. Centro de Costos).
2. Arrastra la columna hasta el panel de color amarillo.
3. El sistema agrupará los movimientos por cada valor de la columna seleccionada.
   *Puedes usar el botón **Agrupar** para expandir o contraer la información. Para quitar la agrupación, arrastra la columna de vuelta a su posición original.*

### ¿Cómo puedo aplicar filtros directamente en las columnas del explorador?
#### Respuesta
1. Ubícate en la columna específica donde deseas aplicar el filtro.
2. Haz clic en el pequeño cuadro gris que aparece en la columna.
3. Selecciona el dato específico por el cual deseas filtrar la información.
   *El sistema cargará solo los movimientos coincidentes con el parámetro seleccionado.*

### ¿Dónde puedo ver el saldo total de los débitos y créditos en el explorador de contabilidad?
#### Respuesta
En la parte inferior del explorador, puedes visualizar el saldo total de los débitos, el saldo total de los créditos y, en caso de existir alguna diferencia, se mostrará en la columna Saldo.

### ¿Cómo puedo ver la operación que originó un movimiento contable en el explorador?
#### Respuesta
1. Ubícate en el renglón específico del movimiento.
2. Haz clic derecho.
3. Selecciona la opción **Ver Operación**.

### ¿Cómo puedo ver el documento de impresión de una operación desde el explorador de contabilidad?
#### Respuesta
Haz doble clic sobre cualquier registro en el explorador para visualizar el documento de impresión de la operación.

---

# Software contable ContaPyme - Flujos de efectivo en operaciones
[Ver el video](https://www.youtube.com/watch?v=jX8LfWdqRJA)
Registro de conceptos de flujos de efectivo en operaciones

## Tema principal
Asignación de conceptos de flujos de efectivo en diversas operaciones contables dentro de ContaPyme.

## Resumen general
Este video explica cómo asignar conceptos de flujos de efectivo al realizar diferentes tipos de operaciones en ContaPyme que involucran ingresos o egresos de dinero. Se muestra el proceso en tres escenarios: un movimiento contable (pago de servicios), una operación de gastos (pago por asistencia técnica) y una operación de facturación (venta de productos). En cada caso, se destaca cómo el sistema requiere la asignación del concepto de flujo de efectivo al afectar cuentas de efectivo.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipo de operaciones se cubren en el video para la asignación de conceptos de flujo de efectivo?
#### Respuesta
El video cubre tres tipos de operaciones:
- Movimiento contable.
- Operación de gastos.
- Operación de facturación.

### ¿Por qué ContaPyme solicita un concepto de flujo de efectivo al realizar ciertas operaciones?
#### Respuesta
ContaPyme requiere la asignación de un concepto de flujo de efectivo cada vez que una operación afecta una cuenta de efectivo. Esto permite un seguimiento preciso y una clasificación adecuada de los movimientos de efectivo para la gestión financiera.

### ¿Cómo se asigna un concepto de flujo de efectivo en un movimiento contable (ejemplo: pago de servicios)?
#### Respuesta
Para asignar un concepto de flujo de efectivo en un movimiento contable, siga estos pasos:

1.  Vaya a **Manejador de operaciones > Más operaciones > Contabilidad > Movimiento contable**.
2.  Seleccione el **tipo de documento** (por ejemplo, "Comprobante de Egreso").
3.  Complete el **detalle de la operación** (por ejemplo, "Pago servicios energía eléctrica").
4.  Registre la cuenta afectada (por ejemplo, **513530, servicios de energía eléctrica**).
5.  Seleccione el **centro de costos** (por ejemplo, "Gastos Generales").
6.  Ingrese el **valor** de la operación.
7.  Seleccione el **tercero en la transacción**.
8.  En la contrapartida, cuando afecte una **cuenta de efectivo** (por ejemplo, "11050510, Caja General"), el sistema le solicitará el **concepto de flujo de efectivo**.
9.  Seleccione el concepto adecuado (por ejemplo, "Pago a proveedores por servicios") y haga clic en **Aceptar**.

### ¿Cómo se asigna un concepto de flujo de efectivo en una operación de gastos (ejemplo: pago por asistencia técnica)?
#### Respuesta
Para asignar un concepto de flujo de efectivo en una operación de gastos, siga estos pasos:

1.  Vaya a **Manejador de operaciones > Más operaciones > Ingresos y gastos > Gastos**.
2.  Seleccione el **tipo de documento** (por ejemplo, "Comprobante de Egreso").
3.  Ingrese el **detalle** de la operación (por ejemplo, "Pago asistencia al señor Alberto García").
4.  Seleccione el **tercero**.
5.  Registre el movimiento contable cargando la cuenta correspondiente (por ejemplo, **513515, servicios por asistencia técnica**).
6.  Seleccione el **centro de costos** (por ejemplo, "Mantenimiento").
7.  Ingrese el **valor** de la operación y un detalle.
8.  Haga clic en **Siguiente**.
9.  Haga clic en **Cálculo automático de impuestos**.
10. Defina la **forma de pago** (por ejemplo, "Bancos"). El sistema cargará automáticamente la cuenta de bancos.
11. Cuando afecte una **cuenta de efectivo** (por ejemplo, "11100510, Banco Santander"), el sistema le solicitará el **concepto de flujo de efectivo**.
12. Seleccione el concepto adecuado (por ejemplo, "Pago a proveedores por servicios") y haga clic en **Aceptar**.

### ¿Cómo se asigna un concepto de flujo de efectivo en una operación de facturación (ejemplo: venta de productos)?
#### Respuesta
Para asignar un concepto de flujo de efectivo en una operación de facturación, siga estos pasos:

1.  Vaya a **Manejador de operaciones > Más operaciones > Ventas > Facturación y ventas**.
2.  Ingrese el **detalle** de la operación (por ejemplo, "Venta de partes al señor Fernando Ríos").
3.  Seleccione los **productos** que se están vendiendo.
4.  Haga clic en **Siguiente**. El sistema calculará automáticamente los impuestos.
5.  Seleccione la **forma de pago** (por ejemplo, "Caja"). El sistema cargará automáticamente la cuenta de efectivo.
6.  Cuando afecte una **cuenta de efectivo** (por ejemplo, "11050510, Caja General"), el sistema le solicitará el **concepto de flujo de efectivo**.
7.  Seleccione el concepto adecuado (por ejemplo, "Actividad de operación efectivo recibido de los clientes") y haga clic en **Aceptar**.

---

# Software contable ContaPyme - Informe ejecución presupuestal comparativo
[Ver el video](https://www.youtube.com/watch?v=f__koRHqnMQ)
f__koRHqnMQ

## Tema principal
Generación y comprensión del informe de ejecución presupuestal comparativo en ContaPyme.

## Resumen general
Este video explica qué es el informe de ejecución presupuestal comparativo, cómo acceder a él tanto para la empresa en general como para centros de costos específicos, y cómo generar el informe. Se detallan los elementos que componen el informe, como los saldos anteriores y nuevos, la variación en pesos y porcentaje, y el resumen financiero. El objetivo es que el usuario comprenda la utilidad de este informe para analizar la evolución del presupuesto en un periodo determinado.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de ejecución presupuestal comparativo?
#### Respuesta
El informe de ejecución presupuestal comparativo es un informe de tipo impresión que presenta un cuadro de ejecución presupuestal en un periodo determinado. Este informe compara los saldos de la ejecución del periodo actual con los saldos de la ejecución del periodo anterior, mostrando la variación entre ambos.

### ¿Cómo ingreso al informe de ejecución presupuestal comparativo para toda la empresa?
#### Respuesta
Para ingresar al informe de ejecución presupuestal comparativo para la empresa, sigue estos pasos:
1. Ve a la pestaña **Adicionales**.
2. En el botón **Informes presupuesto**, despliega el menú.
3. Selecciona la opción **Ejecución presupuestal comparativo**.

### ¿Cómo ingreso al informe de ejecución presupuestal comparativo para un centro de costos específico?
#### Respuesta
Para ingresar al informe de ejecución presupuestal comparativo para un centro de costos, sigue estos pasos:
1. Accede al **Explorador gráfico de la empresa**.
2. Ubícate sobre el centro de costos deseado.
3. Haz clic derecho sobre el centro de costos.
4. Selecciona la opción **Informes**.
5. En el listado de informes, selecciona **Ejecución presupuestal**.
6. Da clic en **Ejecución presupuestal comparativo**.

### ¿Cómo genero el informe de ejecución presupuestal comparativo para un centro de costos?
#### Respuesta
Para generar el informe, sigue estos pasos después de acceder a él como se explica en la pregunta anterior:
1.  En el **Explorador gráfico de la empresa**, selecciona el centro de costos.
2.  Haz clic derecho, selecciona **Informes**, luego **Ejecución presupuestal** y da clic en **Ejecución presupuestal comparativo**.
3.  Indica si deseas consultar la información financiera por el centro de costos y todos sus hijos.
4.  En la caja de **Filtro avanzado**, define el periodo del informe:
    *   **Fecha inicial:** Ingresa la fecha de inicio del periodo.
    *   **Fecha final:** Ingresa la fecha de fin del periodo.
    *   **Fecha sugerida para saldos anteriores:** El sistema sugiere una fecha, pero puedes modificarla.
5.  Selecciona el nivel de detalle de las cuentas (por ejemplo, nivel 5 para cuentas auxiliares).
6.  Configura las opciones adicionales de impresión que desees:
    *   Imprimir en calidad de borrador.
    *   Incluir espacio para firmas.
    *   Incluir resumen financiero.
    *   Visualizar encabezado de página.
    *   Visualizar fecha y hora en el pie de página.
7.  Si lo deseas, genera el informe en otra unidad de moneda activando la casilla correspondiente y seleccionando la moneda.
8.  Opcionalmente, asigna un título personalizado al reporte.
9.  Da clic en **Ver reporte**.

### ¿Qué información se muestra en el informe de ejecución presupuestal comparativo?
#### Respuesta
El informe muestra la siguiente información:
*   **Encabezado:** Incluye los datos de la empresa y los datos de filtro del informe (nombre, periodo y centro de costos).
*   **Código y nombre de la cuenta:** Muestra las cuentas configuradas como de presupuesto.
*   **Saldo anterior:** El saldo de la ejecución presupuestal a la fecha de saldos anteriores.
*   **Nuevo saldo:** El saldo de ejecución presupuestal a la fecha final del informe.
*   **Porcentaje:** El porcentaje equivalente a cada cuenta.
*   **Variación:** La diferencia entre el saldo anterior y el nuevo saldo, tanto en pesos como en porcentaje.
*   **Resumen financiero:** El resumen de cada uno de los saldos y el resumen de la variación, tanto en pesos como en porcentaje.

---

# Software contable ContaPyme - Informe ejecución presupuestal por año
[Ver el video](https://www.youtube.com/watch?v=84vtSHgfN4o)
Informe ejecución presupuestal por año

## Tema principal
Generación e interpretación del informe de ejecución presupuestal anual en ContaPyme.

## Resumen general
Este video explica cómo generar y entender el informe de ejecución presupuestal anual en ContaPyme. El informe muestra un comparativo entre lo presupuestado y lo ejecutado en un período determinado, tanto mensual como acumulado, incluyendo las variaciones y el total presupuestado para el año. Se explica cómo acceder al informe, tanto a nivel general para la empresa como para un centro de costos específico, y cómo interpretar la información que presenta, incluyendo ingresos, gastos, costos de ventas y el resumen financiero.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de ejecución presupuestal por año en ContaPyme?
#### Respuesta
Es un informe que muestra un cuadro comparativo de la ejecución presupuestal, presentando los presupuestos del mes, el acumulado del año y lo presupuestado para el año, junto con sus respectivas variaciones.

### ¿Cómo puedo acceder al informe de ejecución presupuestal por año general para toda la empresa?
#### Respuesta
Para acceder al informe general, sigue estos pasos:
1. Ve a la pestaña **Adicionales**.
2. Haz clic en el botón **Informes presupuesto**.
3. En el menú desplegable, selecciona **Ejecución presupuestal año**.

### ¿Cómo puedo acceder al informe de ejecución presupuestal por año para un centro de costos específico?
#### Respuesta
Para generar el informe para un centro de costos, sigue estos pasos:
1. Ubícate en el **explorador gráfico de la empresa**.
2. Selecciona el centro de costos deseado.
3. Haz clic derecho sobre el centro de costos.
4. Selecciona la opción **Informes**.
5. En el listado de informes, selecciona **Ejecución presupuestal**.
6. Finalmente, da clic en **Ejecución presupuestal año**.

### ¿Cómo genero un informe de ejecución presupuestal por año para un centro de costos?
#### Respuesta
Para generar el informe, sigue estos pasos:
1. Ubícate en el **explorador gráfico de la empresa**.
2. Selecciona el centro de costos deseado (por ejemplo, ventas).
3. Haz clic derecho sobre el centro de costos.
4. Selecciona la opción **Informes**.
5. En el listado de informes, selecciona **Ejecución presupuestal**.
6. Da clic en el informe **Ejecución presupuestal año**.
7. Indica si deseas consultar la información financiera del centro de costos y todos sus hijos.
8. En la caja de filtro avanzado, indica el periodo sobre el cual generarás el informe.
9. Indica el nivel de detalle de las cuentas que deseas visualizar.
10. Haz clic en **Ver reporte**.

### ¿Qué información puedo encontrar en el encabezado del informe?
#### Respuesta
En el encabezado del informe puedes encontrar:
*   El nombre de la empresa.
*   El NIT de la empresa.
*   La información de contacto de la empresa.
*   El nombre del informe (Ejecución Presupuestal Año).
*   El período de tiempo que cubre el informe.
*   El centro de costos sobre el cual se está generando el informe.

### ¿Qué información se muestra en el cuerpo del informe?
#### Respuesta
En el cuerpo del informe encontrarás:
*   El código de cada una de las cuentas configuradas como de presupuesto.
*   El nombre de cada una de las cuentas.
*   Lo ejecutado y lo presupuestado en el período seleccionado.
*   La variación en porcentaje entre lo ejecutado y lo presupuestado.
*   El acumulado del año (ejecutado y presupuestado) y su variación.
*   El total presupuestado para el año y el porcentaje de ejecución.

### ¿Qué información puedo encontrar en el resumen financiero del informe?
#### Respuesta
En el resumen financiero, puedes visualizar:
*   El total de los ingresos menos el saldo total de los egresos en el período.
*   El total de los ingresos menos el total de los egresos para el acumulado del año.
*   Tanto de lo ejecutado como de lo presupuestado.
*   El correspondiente porcentaje de variación.

### ¿Cómo puedo modificar la fecha para los saldos anteriores en el informe?
#### Respuesta
Después de indicar la fecha inicial y la fecha final, el sistema sugiere una fecha para los saldos anteriores. Para cambiarla, debes activar la casilla correspondiente y seleccionar la fecha deseada.

---

# Software contable ContaPyme - Informe ejecución presupuestal por periodo
[Ver el video](https://www.youtube.com/watch?v=O1VT2KWHA0Y)
Informe ejecución presupuestal por periodo

## Tema principal
Generación y comprensión del informe de ejecución presupuestal por periodo en ContaPyme.

## Resumen general
Este video explica qué es el informe de ejecución presupuestal por periodo en ContaPyme, cómo acceder a él tanto para la empresa en general como para centros de costos específicos, y cómo generar el informe para un centro de costos, interpretando la información que presenta sobre valores ejecutados, presupuestados y sus variaciones. El video muestra paso a paso el proceso de configuración y generación del informe, así como la interpretación de sus resultados.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de ejecución presupuestal por periodo?
#### Respuesta
Es un informe de tipo impresión que muestra un cuadro de ejecución presupuestal detallado. Este informe compara lo ejecutado con lo presupuestado en el mismo periodo, mostrando las variaciones entre ambos.

### ¿Cómo ingreso al informe de ejecución presupuestal por periodo general para la empresa?
#### Respuesta
Sigue estos pasos:
1.  Ve a la pestaña **Adicionales**.
2.  Haz clic en el botón **Informes presupuesto**.
3.  Despliega el menú y selecciona **Ejecución presupuestal periodo**.

### ¿Cómo ingreso al informe de ejecución presupuestal por periodo para un centro de costos específico?
#### Respuesta
Sigue estos pasos:
1.  Ubícate en el **explorador gráfico de la empresa** sobre el centro de costos deseado.
2.  Haz clic derecho sobre el centro de costos.
3.  Selecciona la opción **Informes**.
4.  En el listado de informes, selecciona la opción **Ejecución presupuestal**.
5.  Finalmente, haz clic en **Ejecución presupuestal periodo**.

### ¿Cómo genero el informe de ejecución presupuestal por periodo para un centro de costos?
#### Respuesta
Sigue estos pasos:
1. Ubícate en el **explorador gráfico de la empresa**.
2. Selecciona el centro de costos deseado (ejemplo: ventas).
3. Haz clic derecho y selecciona la opción **Informes**.
4. En el listado de informes, selecciona la opción **Ejecución presupuestal** y luego haz clic en **Ejecución presupuestal periodo**.
5. Indica cómo deseas consultar la información financiera (ej. "del centro de costos y todos sus hijos").
6. En la caja de filtro avanzado, indica:
    - **Fecha inicial** del periodo.
    - **Fecha final** del periodo.
    - **Fecha de saldos anteriores** (el sistema sugiere una fecha, pero puedes modificarla activando la casilla y seleccionando la fecha deseada).
7.  Opcionalmente, utiliza la opción **Filtro** para añadir filtros especiales.
8.  Selecciona el **nivel de detalle** de las cuentas a visualizar.
9.  Elige otras opciones si lo deseas:
    - Generar el informe en calidad de borrador.
    - Adicionar espacio para firmas.
    - Visualizar la fecha y hora en el pie de página.
10. Haz clic en **Ver reporte**.

### ¿Qué información se muestra en el encabezado del informe de ejecución presupuestal?
#### Respuesta
El encabezado muestra:
- El nombre de la empresa
- El NIT de la empresa
- La información de contacto de la empresa
- El nombre del informe
- El periodo de tiempo sobre el que se genera el informe
- El centro de costos sobre el que se genera el informe

### ¿Qué información muestra el informe en relación a los valores ejecutados y presupuestados?
#### Respuesta
El informe separa la información en valores ejecutados y valores presupuestados, mostrando:
- **Valores Ejecutados:**
    - Saldo anterior (saldo a la fecha indicada como "fecha de saldos anteriores").
    - Movimientos débito durante el periodo.
    - Movimientos crédito durante el periodo.
    - Saldo total a la fecha final del informe (saldo anterior + movimientos).
    - Porcentaje equivalente al saldo de cada cuenta.
- **Valores Presupuestados:**
    - Total presupuestado para cada cuenta hasta la fecha final del periodo.
- **Variación:**
    - Diferencia entre lo ejecutado y lo presupuestado (en pesos).
    - Porcentaje de ejecución del presupuesto.

### ¿Qué información se muestra en el resumen financiero del informe?
#### Respuesta
El resumen financiero muestra:
- El saldo total de los ingresos menos el saldo total de los gastos.
- El porcentaje correspondiente a cada saldo.
- El valor presupuestado tanto para los ingresos como para los gastos.
- El porcentaje ejecutado.
- La utilidad del periodo (ingresos totales - gastos totales).
- El porcentaje que representa la utilidad sobre el total presupuestado.

### ¿Cómo imprimo el informe una vez generado?
#### Respuesta
Una vez que visualizas el informe, haz clic en el botón **Imprimir**. Selecciona el dispositivo de impresión y haz clic en **OK**.

---

# Software contable ContaPyme - Informe Estado de flujos de efectivo
[Ver el video](https://www.youtube.com/watch?v=0s-cYs68-8g)
Informe Estado de flujos de efectivo

## Tema principal
Generación e interpretación del informe de Estado de flujos de efectivo en ContaPyme.

## Resumen general
Este video explica cómo generar e interpretar el informe de Estado de flujos de efectivo en ContaPyme. Se detalla la ruta para acceder al informe, se analiza la estructura interna del reporte (encabezado, saldos anteriores, análisis de conceptos, saldos consolidados) y se exploran las diferentes opciones de generación del reporte: totalizado por concepto, detallado por cuenta y detallado por movimiento.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es la ruta para consultar el informe de Estado de flujos de efectivo en ContaPyme?
#### Respuesta
La ruta para consultar el informe de Estado de flujos de efectivo en ContaPyme es:
1.  Ingresar al menú **Contabilidad**.
2.  Seleccionar la opción **Estados financieros básicos**.
3.  Dentro de esta sección, elegir la opción **Otros**.
4.  Finalmente, hacer clic en **Estado de flujos de efectivo método directo**.

### ¿Qué áreas se pueden identificar en la estructura del informe de Estado de flujos de efectivo?
#### Respuesta
Se pueden identificar las siguientes áreas:

*   **Área de encabezado:** Muestra los datos de la empresa, la información del reporte (si incluyó o no todas las cuentas de efectivo) y el periodo consultado.
*   **Área de saldos anteriores:** Presenta el saldo a un día anterior al periodo consultado, discriminado por cada cuenta de efectivo.
*   **Área de análisis de los conceptos registrados en el periodo:** Contiene las actividades de operación, inversión y financiación, con sus respectivos conceptos de flujos de efectivo. Muestra las fuentes (entradas) y usos (salidas) de dinero, así como el saldo por cada actividad.
*   **Área de saldos consolidados:** Muestra la sumatoria del saldo del periodo anterior más el saldo del movimiento del periodo consultado, presentando el saldo final y el detalle por cada cuenta de efectivo.

### ¿Qué información se encuentra en el "área de análisis de los conceptos registrados en el periodo"?
#### Respuesta
En esta área se encuentra la información relacionada con:

*   Las diferentes **actividades**: operación, inversión y financiación.
*   Los **conceptos de flujos de efectivo** que intervienen en cada actividad.
*   Las **fuentes o entradas de dinero** y los **usos o destinos del dinero** por cada concepto y actividad.
*   Los **totales de fuentes y usos** por cada actividad.
*   El **saldo** (diferencia entre fuentes y usos) por cada actividad.

### ¿Cómo se calcula el saldo de una actividad en el informe de Estado de flujos de efectivo?
#### Respuesta
El saldo de una actividad se calcula como la diferencia entre las fuentes (entradas de dinero) y los usos (salidas de dinero) de esa actividad. El saldo será positivo si las fuentes son mayores que los usos, y negativo en caso contrario.

### ¿Qué opciones ofrece ContaPyme para generar el informe de Estado de flujos de efectivo?
#### Respuesta
ContaPyme ofrece las siguientes opciones para generar el informe:

*   **Totalizado por concepto de flujo de efectivo:** Es la opción por defecto, muestra el reporte de forma resumida.
*   **Detallado por cuenta:** Muestra la discriminación del saldo por cada cuenta que generó el movimiento.
*   **Detallado por movimiento:** Muestra la auditoría del registro, incluyendo la fecha, el documento de soporte, la cuenta y el tercero afectado por el movimiento.

### ¿Varían los saldos finales del informe según la opción de generación elegida?
#### Respuesta
No, los saldos acumulados por actividad y el saldo final del periodo siempre serán los mismos, independientemente de si se elige la opción "Totalizado por concepto de flujo de efectivo", "Detallado por cuenta" o "Detallado por movimiento". Lo único que varía es la forma visual de presentar el reporte.

---

# Software contable ContaPyme - Manejo de moneda extranjera
[Ver el video](https://www.youtube.com/watch?v=p-4FCetxvHk)
p-4FCetxvHk

## Tema principal
Configuración y uso de moneda extranjera en ContaPyme 4.0.

## Resumen general
Este video explica cómo configurar y utilizar la funcionalidad de moneda extranjera en ContaPyme versión 4.0. Se detalla la creación y configuración de monedas, la activación del manejo de moneda extranjera, la configuración de cuentas en moneda extranjera, los tipos de cambio, la periodicidad del registro de tasas de cambio, la configuración de ajustes por diferencia en cambio y cómo generar informes financieros en moneda extranjera. El objetivo es permitir a los usuarios registrar transacciones y generar informes en diferentes monedas, además de la moneda local.

## Preguntas Frecuentes (FAQ)

### ¿Cómo ingreso al catálogo de monedas en ContaPyme?
#### Respuesta
Para ingresar al catálogo de monedas, sigue estos pasos:

1.  Dirígete a la pestaña **Contabilidad**.
2.  Selecciona **Plan de cuentas**.
3.  Dentro del menú Plan de cuentas, elige la opción **Monedas**.

### ¿Cómo creo una nueva moneda en el catálogo de monedas?
#### Respuesta
Para crear una nueva moneda, sigue estos pasos:

1.  Dentro del catálogo de monedas, haz **clic derecho** en cualquier parte del catálogo y selecciona la opción **Crear una moneda**. También puedes usar la opción **Crear moneda** en la cinta de opciones.
2.  En el asistente, ingresa un **código** para la moneda (máximo cinco caracteres alfanuméricos).
3.  Ingresa el **nombre** completo de la moneda para evitar confusiones (ej: Dólar Estadounidense).
4.  Indica la **unidad de la moneda** (ej: Dólares).
5.  Ingresa el **símbolo** de la moneda (ej: $).
6.  Indica el **nombre para los centavos o fracciones** (ej: Centavos).
7.  Indica las **cuentas para la diferencia en cambio**:
    *   Cuenta de **ingresos**: Selecciona la cuenta contable correspondiente a ingresos financieros por diferencia en cambio.
    *   Cuenta de **egresos**: Selecciona la cuenta contable correspondiente a gastos financieros por diferencia en cambio.
8.  Haz clic en el botón **Aceptar** para finalizar la creación de la moneda.

### ¿Cómo activo el manejo de moneda extranjera en ContaPyme?
#### Respuesta
Para activar el manejo de moneda extranjera, sigue estos pasos:

1.  Dirígete al **catálogo de cuentas** a través de la pestaña **Contabilidad**, **Plan de cuentas**, o usando la barra de acceso rápido.
2.  En el catálogo de cuentas, selecciona la opción **Configuración** en la cinta de opciones.
3.  El sistema te preguntará si la configuración es solo para el usuario activo o para todos los usuarios. Selecciona la opción deseada.
4.  Dentro de la configuración del catálogo de cuentas, ubícate en **Configuraciones generales** y busca la opción **Manejo de moneda extranjera**.
5.  **Habilita** la opción.
6.  Selecciona cuál es la **moneda local**.
7.  Indica si deseas registrar una **tasa de cambio general** o una **tasa de compra y una tasa de venta**.
8.  Indica si deseas registrar la **tasa de cambio diariamente**.
9.  Selecciona en qué momento realizar los **ajustes por diferencia en cambio**.
10. Indica si se desea modificar el valor que el sistema calcula automáticamente cuando se usan cuentas de moneda extranjera.
11. Indica la **empresa de trabajo** (si aplica).
12. Da clic en el botón **Aceptar** para aplicar las configuraciones.

### ¿Cómo configuro las cuentas que manejan moneda extranjera en ContaPyme?
#### Respuesta
Para configurar las cuentas que manejarán moneda extranjera, sigue estos pasos:

1.  Ingresa al **catálogo de cuentas** a través de la pestaña **Contabilidad**, **Plan de cuentas**, o usando la barra de acceso rápido.
2.  Ubica la **cuenta** que deseas configurar (ej: cuenta de banco, cuenta de cartera, cuenta de proveedores).
3.  Haz **clic derecho** sobre la cuenta y selecciona **Modificar**.
4.  Activa la opción que indica que la cuenta manejará moneda extranjera.
5.  Selecciona la **moneda** que utilizará la cuenta (ej: dólar, euro, libra esterlina).
6.  Haz clic en el botón **Aceptar** para guardar los cambios.

### ¿Cuáles son los tipos de cambio de moneda que puedo usar en ContaPyme?
#### Respuesta
El sistema ofrece dos opciones para el registro de la tasa de cambio:

1.  **Tasa de cambio general:** Se registra una única tasa de cambio por cada moneda.
2.  **Tasa de compra y tasa de venta:** Se registra una tasa de compra y una tasa de venta para cada moneda.

### ¿Cómo activo la opción de tasa de cambio de compra y venta?
#### Respuesta
Para activar la opción de tasa de compra y tasa de venta, sigue estos pasos:

1.  Dirígete a la **configuración del catálogo de cuentas**.
2.  Dentro de la configuración, activa la opción de **Tasa de compra y tasa de venta**.

### ¿Cómo influye la opción de tasa de compra y venta en los ajustes por diferencia en cambio?
#### Respuesta
Cuando se registra una tasa de compra y una tasa de venta:

*   Al momento de realizar una operación y que el sistema haga la conversión de moneda extranjera a moneda local, siempre tomará la **tasa de venta**.
*   Al momento de realizar los ajustes por diferencia en cambio, el sistema evaluará la cuenta que está ajustando:
    *   Si la cuenta es del **activo**, se ajustará con base a la **tasa de compra**.
    *   Si la cuenta es del **pasivo**, se ajustará con base a la **tasa de venta**.

### ¿Cuáles son las opciones de periodicidad para el registro de la tasa de cambio?
#### Respuesta
Existen dos opciones para la periodicidad del registro de la tasa de cambio:

1.  **Registro diario:** Se debe registrar la tasa de cambio de cada moneda diariamente.
2.  **Último registro:** El sistema utiliza el último registro de la tasa de cambio disponible. Para activar esta opción, desactiva la opción de "registrar tasa de cambio diariamente" en la configuración del manejo de moneda extranjera.

### ¿En qué momentos se pueden realizar los ajustes por diferencia en cambio?
#### Respuesta
Los ajustes automáticos por diferencia en cambio se pueden realizar en tres momentos:

1.  Al momento de **registrar una operación** con una cuenta que esté configurada para el manejo de moneda extranjera.
2.  Al momento de **registrar una operación de tasa de cambio**.
3.  Al momento de procesar la **operación de acciones automáticas de fin de mes**.

### ¿Cómo configuro para que los ajustes por diferencia en cambio se realicen al momento de registrar las operaciones con cuentas en moneda extranjera?
#### Respuesta
Para activar esta opción, sigue estos pasos:

1.  Dirígete a la **configuración del catálogo de cuentas**.
2.  Dentro de la configuración, **habilita** la opción de **Ajustes de diferencia en cambio cada que se realice un movimiento**.

### ¿Cómo configuro para que los ajustes por diferencia en cambio se realicen al momento de registrar la operación de tasa de cambio?
#### Respuesta
Para activar esta opción, sigue estos pasos:

1.  Dirígete a la **configuración del catálogo de cuentas**.
2.  Dentro de la configuración, **habilita** la opción de **Habilitar ajustes de diferencia en cambio cada que se procese la operación de registro de tasa de cambio**.

### ¿Cómo configuro para que los ajustes por diferencia en cambio se realicen al momento de procesar la operación de acciones automáticas de fin de mes?
#### Respuesta
Para activar esta opción, sigue estos pasos:

1.  Dirígete a la **configuración del catálogo de cuentas**.
2.  Dentro de la configuración, **deshabilita** las opciones de **Ajustes de diferencia en cambio cada que se realice un movimiento** y **Habilitar ajustes de diferencia en cambio cada que se procese la operación de registro de tasa de cambio**.
3.  Ingresa al **manejador de operaciones** y abre una operación de **acciones automáticas de fin de mes**.
4.  **Activa** la opción de **Realizar ajustes por diferencia en cambio**.

### ¿Cómo registro una operación de registro de tasas de cambio?
#### Respuesta
Para registrar una operación de registro de tasas de cambio, sigue estos pasos:

1.  Dirígete al **manejador de operaciones**.
2.  Ingresa por la pestaña de **Más operaciones**.
3.  Selecciona **Contabilidad** y elige la opción **Registro de tasas de cambio**.
4.  Indica la **fecha de la transacción**. Esta es la fecha a la cual quedarán registradas las tasas de cambio.
5.  En el cuerpo de la operación, el sistema lista las diferentes monedas que se encuentran configuradas para las cuentas de moneda. Si deseas agregar otras monedas, puedes hacerlo.
6.  Indica la **tasa de cambio** para cada moneda. Si estás trabajando con tasa de compra y tasa de venta, indica ambos valores.
7.  Da clic en el botón **Aceptar** para guardar la operación.

### ¿Cómo sé qué operaciones en ContaPyme se pueden registrar en moneda extranjera?
#### Respuesta
Para identificar qué operaciones pueden registrarse en moneda extranjera, abre el asistente de la operación y verifica si en la esquina superior derecha encuentras la opción **Moneda**. Si la encuentras, la operación puede registrarse en moneda extranjera.

### ¿Cómo registro una operación en moneda extranjera?
#### Respuesta
Para registrar una operación en moneda extranjera, sigue estos pasos:

1.  Abre la operación que deseas registrar.
2.  Verifica que la operación esté con la fecha en la que registraste la tasa de cambio.
3.  En el encabezado de la operación, en la esquina superior derecha, selecciona la **moneda** en la que vas a registrar los valores monetarios.
4.  Ingresa los datos de la operación, incluyendo los valores en la moneda extranjera seleccionada.
5.  Procesa la operación. El sistema realizará la conversión a moneda local automáticamente en el asiento contable.

### ¿Qué sucede si realizo una operación en moneda local sobre una cuenta configurada para moneda extranjera?
#### Respuesta
Si realizas una operación en moneda local (ej: pesos) sobre una cuenta que está configurada para el manejo de moneda extranjera (ej: dólares), el sistema no convertirá la operación a moneda extranjera para la contabilización, ya que siempre se realiza en la moneda local. Sin embargo, en el renglón de la cuenta configurada para moneda extranjera, el sistema mostrará el valor equivalente en la moneda extranjera correspondiente.

### ¿Cómo puedo ver los saldos de cuentas por cobrar en moneda extranjera?
#### Respuesta
Para ver los saldos de cuentas por cobrar en moneda extranjera, sigue estos pasos:

1.  Dirígete a **Consulta de saldos de cuentas por cobrar**
2.  Adiciona una columna que se llama **Saldo en moneda extranjera**.
3.  Dale clic en **Refrescar**.
4.  El informe mostrará el saldo de cada cuenta por cobrar tanto en moneda local como en moneda extranjera.

### ¿Puedo imprimir una factura en una moneda diferente a la moneda en la que se registró la operación?
#### Respuesta
Sí, algunas operaciones como la de facturación y venta tienen la opción de imprimir la factura en una moneda diferente a la moneda en la que se registró la operación.  Para habilitar la opción, verifica dentro de la operación de **facturación y venta** que este activa la opción de **usar otra moneda para imprimir la factura**.

### ¿Cómo puedo modificar el valor en moneda extranjera que el sistema calcula automáticamente?
#### Respuesta
Para modificar el valor que el sistema calcula automáticamente en moneda extranjera, sigue estos pasos:

1.  Dirígete a la **configuración del catálogo de cuentas**.
2.  Dentro de la configuración, **activa** la opción de **Permitir modificar el valor que calcula automáticamente el sistema de moneda extranjera en las operaciones cuando se usen cuentas de moneda extranjera**.
3.  Al ingresar nuevamente a la operación, aparecerá una opción que te permitirá activar o desactivar la edición del valor en moneda extranjera.

### ¿Qué función cumple la opción de "empresa para registro de tasas de cambio"?
#### Respuesta
Esta opción permite indicar cuál de las empresas existentes en una misma área de trabajo es la responsable de registrar las tasas de cambio. De esta manera, las demás empresas tomarán el registro de tasas de cambio de la empresa designada, evitando tener que registrar las tasas de cambio individualmente en cada empresa. Para usar esta opción, dirígete a la configuración del catálogo de cuentas y selecciona la empresa responsable del registro de tasas de cambio.

### ¿Qué informes se pueden imprimir en moneda extranjera?
#### Respuesta
No todos los informes se pueden imprimir en moneda extranjera. Los informes que tienen la opción de imprimirse en otra moneda son aquellos que, al ingresar al informe, en la parte inferior, tienen la opción que dice **Mostrar valores monetarios en otra unidad de moneda**.  Entre los informes que sí se pueden imprimir en moneda extranjera están:

*   Estados financieros básicos:
    *   Balance general (en sus diferentes presentaciones)
    *   Estado de resultados (en sus diferentes presentaciones)
*   Libros legales:
    *   Mayor y balances (en sus diferentes presentaciones)

---

# Software contable ContaPyme - Mayor y balances en moneda extranjera
[Ver el video](https://www.youtube.com/watch?v=E43yzdmgQcI)
E43yzdmgQcI

## Tema principal
Generación de informes de mayor y balances en moneda extranjera dentro de ContaPyme.

## Resumen general
Este video explica cómo generar informes de mayor y balances en moneda extranjera utilizando el software ContaPyme. Muestra el proceso para activar la opción de moneda extranjera y seleccionar la moneda deseada (por ejemplo, dólares) para visualizar los informes.  Se aprende a encontrar la opción dentro del menú de contabilidad y a interpretar la información mostrada en el informe, incluyendo el nombre del informe, las fechas, la moneda utilizada y la tasa de cambio.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el mayor y balances?
#### Respuesta
El mayor y balances es uno de los libros legales que permite mostrar sus valores monetarios en una moneda diferente a la local, siempre y cuando se tenga activo el manejo de moneda extranjera.

### ¿Dónde se encuentra la opción para generar el mayor y balances en ContaPyme?
#### Respuesta
Para generar un mayor y balances, debes ubicarte en la pestaña de **Contabilidad**, luego ir al grupo de **Informes**, después a **Libros legales** y finalmente a **Mayor y balances**.

### ¿Qué tipos de informes de mayor y balances se pueden generar en moneda extranjera?
#### Respuesta
Los siguientes informes pueden mostrar sus valores en otra unidad de moneda diferente a la local:
- Mayor y balances
- Mayor y balances comparativo
- Mayor y balances con movimientos
- Mayor y balances con terceros

### ¿Qué informe de mayor y balances NO se puede generar en moneda extranjera?
#### Respuesta
La consulta de mayor y balances NO se puede generar en moneda extranjera.

### ¿Cómo se genera el mayor y balances comparativo en moneda extranjera?
#### Respuesta
Para generar un mayor y balances comparativo en moneda extranjera, sigue estos pasos:
1. Ve a **Contabilidad > Informes > Libros legales > Mayor y balances.**
2. Selecciona la opción **Mayor y balances comparativo**.
3. Indica las fechas, tanto la de saldos anteriores como la fecha final.
4. Aplica el filtro que corresponda, si es necesario.
5. Configura el nivel de detalle y las demás opciones disponibles.
6. Activa la opción **Mostrar valores monetarios en otra unidad de moneda**.
7. Selecciona la moneda en la cual deseas ver el informe.
8. Da clic en la opción **Ver reporte**.

### ¿Qué información se muestra en el encabezado del informe de mayor y balances en moneda extranjera?
#### Respuesta
En el encabezado del informe se muestra:
- El nombre del informe.
- La fecha entre las cuales se están viendo los movimientos.
- La moneda en la cual se presenta el informe.
- La tasa de cambio utilizada.

### ¿Qué datos se reportan en la moneda extranjera seleccionada?
#### Respuesta
Todos los datos se reportan en la moneda extranjera seleccionada, incluyendo los totales tanto de las cuentas de balance como de las cuentas de resultado.

### ¿Cómo se genera el mayor y balances con movimientos en moneda extranjera?
#### Respuesta
Para generar un informe de mayor y balances con movimientos en moneda extranjera, debes:
1. Seleccionar la opción de **Mayor y balances con movimientos**.
2. Indicar la moneda en la que deseas ver el informe.
3. Dar clic en la opción **Ver reporte**.

---

# Software contable ContaPyme - Opciones para ajuste de diferencia en cambio
[Ver el video](https://www.youtube.com/watch?v=PucZolXjo0c)

## Tema principal
Ajustes automáticos por diferencia en cambio en ContaPyme.

## Resumen general
Este video explica las tres opciones disponibles en ContaPyme para realizar ajustes automáticos por diferencia en cambio cuando se trabaja con moneda extranjera. Estas opciones permiten mantener actualizados los saldos de las cuentas en moneda local según las fluctuaciones de las tasas de cambio. El video detalla en qué momento se realiza el ajuste con cada opción y cómo activar o desactivar cada una de ellas para elegir la que mejor se adapte a las necesidades del usuario.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las tres opciones que ofrece ContaPyme para realizar ajustes por diferencia en cambio?
#### Respuesta
ContaPyme ofrece tres opciones para realizar ajustes por diferencia en cambio:
1.  Al asentar un movimiento contable sobre una cuenta que maneja moneda extranjera.
2.  Al procesar la operación de registro de tasas de cambio.
3.  Al procesar la operación de acciones automáticas de fin de mes.

### ¿Cómo funciona el ajuste por diferencia en cambio al asentar un movimiento contable?
#### Respuesta
Esta opción ajusta cada cuenta configurada para el manejo de moneda extranjera, considerando cada tercero y cada referencia si aplica, actualizando el saldo de la cuenta en moneda local según la última tasa de cambio utilizada.

### ¿Cómo se activa el ajuste por diferencia en cambio al asentar un movimiento contable?
#### Respuesta
Para activar esta opción, se debe habilitar la opción "habilitar ajustes de diferencia en cambio" cada vez que se realice un movimiento. Esta opción se encuentra en la configuración del plan de cuentas, en la configuración del manejo de moneda extranjera.

### ¿Cómo funciona el ajuste por diferencia en cambio al procesar la operación de registro de tasas de cambio?
#### Respuesta
Esta opción ajusta a nivel general cada cuenta configurada para el manejo de moneda extranjera, pero solo lo hace al momento de procesar la operación donde se registran las tasas de cambio. Los ajustes se realizan diariamente si se registran tasas de cambio diariamente, o cada vez que se registre este tipo de operación.

### ¿Cómo se activa el ajuste por diferencia en cambio al procesar la operación de registro de tasas de cambio?
#### Respuesta
Para activar esta opción, se debe habilitar la opción "habilitar ajustes de diferencia en cambio" cada que se procese la operación de registro de tasas de cambio. Esta opción se encuentra en la configuración del manejo de moneda extranjera.

### ¿Cómo funciona el ajuste por diferencia en cambio al procesar la operación de acciones automáticas de fin de mes?
#### Respuesta
Esta opción realiza un único ajuste mensual sobre cada una de las cuentas configuradas para el manejo de moneda extranjera, cuando se activa la opción de ajustes por diferencia en cambio en la operación de acciones automáticas de fin de mes.

### ¿Cómo se configura ContaPyme para que realice los ajustes por diferencia en cambio al procesar la operación de acciones automáticas de fin de mes?
#### Respuesta
Esta opción viene configurada por defecto en el sistema. Para asegurarte de que se realicen los ajustes al final del mes, debes deshabilitar las otras dos opciones: "ajustes por diferencia en cambio, cada que se realice un movimiento" y "ajustes de diferencia en cambio, cada que se procese la operación de registro de tasas de cambio".

### ¿Con base en qué tasa de cambio se realizan los ajustes por diferencia en cambio?
#### Respuesta
Independientemente de la opción seleccionada, el ajuste por diferencia en cambio se realizará siempre con base en la tasa de cambio que se haya registrado.

---

# Software contable ContaPyme - Operación de conciliación bancaria automática
[Ver el video](https://www.youtube.com/watch?v=o3nMzlQeoeg)
o3nMzlQeoeg

## Tema principal
Conciliación bancaria automática en ContaPyme.

## Resumen general
Este video explica cómo realizar la conciliación bancaria automática en ContaPyme.  Se detalla el proceso de carga de movimientos desde el extracto bancario digital, la conciliación automática de los movimientos, y el registro automático de notas débito y crédito.  Además, se explica cómo revisar y ajustar la conciliación, imprimir el informe y verificar el movimiento contable generado. Se aprende a usar las funciones de sincronización y ajuste automático para facilitar el proceso de conciliación.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la conciliación bancaria automática y cuál es su objetivo en ContaPyme?
#### Respuesta
La conciliación bancaria automática es una funcionalidad en ContaPyme que permite cargar los movimientos del extracto bancario directamente a la operación de conciliación.  El sistema compara los valores y los marca como conciliados, registrando automáticamente las notas débito y crédito del banco. El objetivo es simplificar y acelerar el proceso de conciliación bancaria.

### ¿Cuáles son los requisitos mínimos para realizar la conciliación bancaria automática?
#### Respuesta
Los requisitos mínimos son:
- Tener el extracto bancario en formato digital.
- Tener todos los movimientos de la cuenta bancaria debidamente registrados y procesados en el sistema.

### ¿Cómo se accede a la operación de conciliación bancaria dentro de ContaPyme?
#### Respuesta
Para acceder a la operación de conciliación bancaria, siga esta ruta:
1.  Ir al **Manejador de Operaciones**.
2.  Seleccionar **Más Operaciones**.
3.  Seleccionar **Contabilidad**.
4.  Seleccionar **Conciliación Bancaria**.

### ¿Qué tipo de documento de soporte se utiliza para la operación de conciliación bancaria?
#### Respuesta
Se soporta la operación con el tipo de documento **Nota de Contabilidad**.

### ¿Dónde se selecciona el tipo de conciliación y qué opciones están disponibles?
#### Respuesta
En el campo **Tipo de Conciliación a Realizar**, puede seleccionar entre dos opciones:
-   **Manual:** Para realizar la conciliación de forma manual.
-   **Automática:** Para utilizar la funcionalidad de conciliación automática (disponible solo si se cuenta con el módulo de conciliación bancaria automática).

### ¿Cómo se define la fecha hasta la cual se tomará el saldo de la cuenta de banco en la conciliación?
#### Respuesta
En el campo **Fecha Conciliación**, se debe indicar la fecha de corte o fecha hasta la cual se tomará el saldo de la cuenta de banco.  Esta fecha es independiente de la fecha de soporte de la operación.

### ¿Cómo se selecciona la cuenta bancaria a conciliar?
#### Respuesta
En el campo **Cuenta Conciliación**, debe seleccionar la cuenta que va a conciliar. Al abrir el seleccionador, el sistema muestra el catálogo de cuentas de conciliación. La cuenta que desea conciliar debe estar previamente creada en dicho catálogo.

### ¿Dónde se ingresa el saldo final del extracto bancario?
#### Respuesta
En el campo **Saldo Extracto Bancario**, se debe ingresar el saldo final de la cuenta de banco que viene en el extracto bancario.

### ¿Qué información se muestra en la parte inferior de la operación y cómo se interpreta?
#### Respuesta
En la parte inferior de la operación se muestra:
-   **Saldo contable de la cuenta a la fecha de corte.**
-   **Saldo del extracto bancario a la fecha de corte.**
-   **Depósitos en tránsito:** Débitos de la cuenta de banco tomados de la contabilidad.
-   **Cheques pendientes de cobro:** Créditos de la cuenta de banco tomados de la contabilidad.
-   **Saldo del extracto ajustado.**
-   **Diferencia entre el saldo del extracto ajustado y el saldo del extracto.**
-   **Notas crédito:** Valores que suman a la cuenta de banco.
-   **Notas débito:** Valores que restan a la cuenta de banco.

### ¿Cuáles son las opciones para cargar los movimientos del extracto bancario en el segundo paso de la operación?
#### Respuesta
Existen varias opciones:
1.  **Cargar directamente el formato del extracto bancario digital:** Utilizando el primer icono de cargar movimiento.
2.  **Copiar y pegar desde un archivo de Excel:** Los datos deben estar organizados por columnas: fecha del movimiento, tipo de movimiento, número, y valor.
3.  **Ingresar los movimientos de forma manual:** Utilizando el botón **Insertar Renglón**.

### ¿Cómo funciona el botón "Sincronizar" y qué datos utiliza para relacionar los movimientos?
#### Respuesta
El botón **Sincronizar** relaciona de forma automática los movimientos de la contabilidad con los del extracto y los marca como movimiento conciliado. Para hacer dicha relación, el sistema toma el dato del **número del movimiento** y el **valor**. Si alguno de estos datos no coincide, el movimiento no será marcado como conciliado.

### ¿Para qué sirve el botón "Quitar relación"?
#### Respuesta
El botón **Quitar Relación** desmarca todos los movimientos que ya han sido marcados como conciliados.

### ¿Cómo se relaciona manualmente dos movimientos, uno de la contabilidad y otro del extracto bancario?
#### Respuesta
Seleccione un movimiento de la contabilidad y uno del extracto bancario y luego haga clic en el botón que permite relacionar dos movimientos seleccionados. Esta opción es útil cuando algunos movimientos no se relacionan automáticamente debido a diferencias en los datos.

### ¿Para qué sirve el botón "Recargar" en la columna del movimiento contable?
#### Respuesta
El botón **Recargar** sirve para que el sistema vuelva a cargar el movimiento de la cuenta de banco, en caso de que se haya hecho algún cambio o modificación sobre los movimientos.

### ¿Qué funcionalidad tiene el botón "Asignar clase" en la columna de los movimientos del extracto?
#### Respuesta
El botón **Asignar Clase** asigna de forma automática el tipo de movimiento según la descripción y parametrización que tengan los tipos de movimiento bancario específicos para cada cuenta.

### ¿Qué ocurre en el paso de ajustes y cómo se registran las notas débito y crédito automáticamente?
#### Respuesta
En el paso de ajustes, el sistema registra automáticamente los rendimientos financieros y los gastos bancarios como notas débito y crédito. Para que esto ocurra, las cuentas a afectar y el centro de costos deben estar parametrizadas previamente en el catálogo de tipos de movimiento bancario de la cuenta en particular.

### ¿En la operación de conciliación bancaria cómo se modifica el registro de las notas débito y crédito en el paso de ajustes?
#### Respuesta
Si necesita hacer algún cambio sobre el registro de las notas débito y crédito de una conciliación, puede desactivar el botón **Autogenerar**.  Esto permitirá editar los datos en modo edición.

### ¿Qué información muestra el documento de impresión de la conciliación bancaria?
#### Respuesta
El documento muestra:
-   Saldo del extracto bancario a la fecha de corte.
-   Saldo contable a la fecha de corte.
-   Cheques pendientes de cobro.
-   Saldo extracto ajustado (saldo del extracto bancario menos los cheques pendientes de cobro).
-   Notas débito y crédito (intereses pagados y gastos bancarios).
-   Saldo contable ajustado (saldo contable menos las notas débito y crédito).

### ¿Cómo se verifica el movimiento contable que registra la operación de conciliación bancaria?
#### Respuesta
Para verificar el movimiento contable, de clic al botón **Ver Movimiento Contable**. Esto mostrará el ajuste que hizo el sistema en el paso de ajustes, específicamente los rendimientos financieros y los gastos bancarios.

---

# Software contable ContaPyme - Operación de gastos (Conversión entre diferentes monedas)
[Ver el video](https://www.youtube.com/watch?v=QYtoPNJ_1AI)

## Tema principal
Registrar una operación de gastos en moneda extranjera en ContaPyme.

## Resumen general
Este video explica cómo registrar una operación de gastos en moneda extranjera dentro de ContaPyme. Muestra el proceso paso a paso, desde la selección de la moneda extranjera hasta la verificación del registro contable en moneda local y la impresión del comprobante de egreso. Se aprende a cómo el sistema realiza la conversión automática a la moneda local utilizando la tasa de cambio registrada y cómo visualizar los valores en la moneda extranjera en el comprobante.

## Preguntas Frecuentes (FAQ)

### ¿Cómo se registra una operación de gastos en moneda extranjera en ContaPyme?
#### Respuesta
Para registrar una operación de gastos en moneda extranjera, sigue estos pasos:

1.  Dirígete al **Manejador de Operaciones**.
2.  Ve a **Más Operaciones > Ingresos y Gastos > Operación de Gastos**.
3.  Verifica que el **Documento de Soporte** sea un comprobante de egreso.
4.  Ingresa el **Detalle de la Transacción**.
5.  Selecciona la **Moneda** en la esquina superior derecha, encima del campo fecha.
6.  Indica a quién se le está pagando el gasto.
7.  Ingresa el **Concepto del Gasto**.
8.  Selecciona el **Centro de Costos**.
9.  Ingresa el **Valor del Gasto** en la moneda extranjera.
10. Da clic en **Siguiente** para continuar.
11. Aplica impuestos si es necesario.
12. Indica de dónde salió el dinero para pagar el gasto (por ejemplo, el banco).
13. Selecciona la **Cuenta del Banco**.
14. Indica el **Tipo de Movimiento** (retiro o traslado) y el número del traslado.
15. Finaliza el registro de la operación.

### ¿En qué moneda se registra la operación en la contabilidad?
#### Respuesta
El registro en la contabilidad se realiza en la **moneda local**, que en el ejemplo es el peso colombiano. El sistema convierte automáticamente el valor en moneda extranjera a moneda local utilizando la tasa de cambio registrada en el sistema.

### ¿Dónde puedo ver la tasa de cambio utilizada para la conversión de la moneda extranjera a la moneda local?
#### Respuesta
La tasa de cambio utilizada es la **última tasa de cambio registrada en el sistema** para la moneda extranjera seleccionada. En el ejemplo, la tasa de cambio utilizada para convertir euros a pesos es de 2,250 pesos por euro.

### ¿Cómo puedo ver los valores en moneda extranjera en el comprobante de egreso?
#### Respuesta
Al imprimir el soporte de la operación (comprobante de egreso), el sistema muestra los datos del tercero y los **valores en la moneda extranjera** en la que se realizó el gasto.

### ¿Qué debo hacer si la cuenta bancaria desde la que se paga el gasto está configurada para el manejo de moneda extranjera?
#### Respuesta
Si la cuenta bancaria está configurada para el manejo de moneda extranjera, el sistema mostrará el **equivalente en la moneda configurada** para la cuenta (euros o dólares) en la parte inferior de la ventana.

---

# Software contable ContaPyme - Operación de movimiento contable - contabilización local - niif
[Ver el video](https://www.youtube.com/watch?v=zUf14tCuje4)
[zUf14tCuje4]

## Tema principal
Definición y uso de la operación de movimiento contable para afectar la contabilización local y/o NIIF en ContaPyme.

## Resumen general
Este video explica cómo utilizar la operación de movimiento contable en ContaPyme para realizar asientos que afecten tanto la contabilización local como la NIIF (Normas Internacionales de Información Financiera) a través de un solo registro. Muestra cómo configurar la operación para que afecte ambas contabilizaciones, solo la local o solo la NIIF, y presenta un ejemplo práctico de contabilización de un servicio de publicidad solo para la NIIF. Se aprende a configurar la operación, ingresar la información del comprobante, calcular impuestos y verificar los movimientos contables generados.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la operación de movimiento contable en ContaPyme?
#### Respuesta
Es una funcionalidad que permite realizar asientos contables afectando tanto la contabilización local como la NIIF (Normas Internacionales de Información Financiera) a través de un único registro.  Además, permite elegir manualmente si el asiento afectará ambas contabilizaciones, solo la local o solo la NIIF.

### ¿Cómo se define qué tipo de contabilización afectará la operación de movimiento contable?
#### Respuesta
Para definir el tipo de contabilización que afectará la operación, sigue estos pasos:
1.  Dentro de la operación de movimiento contable, da clic en el botón **Operación**.
2.  En el menú desplegado, selecciona la opción **Tipo de Contabilización**.
3.  Elige una de las tres opciones:
    *   **Contabilización según configuración:** Se activa automáticamente en años de transición (cuando se deben llevar ambas contabilizaciones).
    *   **Contabilización Local:** Se activa automáticamente si el año de trabajo está marcado para llevar solo contabilización local, pero se puede activar manualmente.
    *   **Contabilización NIIF:** Se activa automáticamente si el año de trabajo está marcado para llevar solo contabilización NIIF, pero se puede activar manualmente.

### ¿Cómo se activa manualmente la contabilización local o NIIF en la operación de movimiento contable?
#### Respuesta
Si deseas activar manualmente la contabilización local o NIIF, sigue estos pasos:
1.  Dentro de la operación de movimiento contable, da clic en el botón **Operación**.
2.  Selecciona la opción **Contabilización según la configuración**.
3.  Vuelve a dar clic en el botón **Operación**. Se activarán las opciones de Contabilización Local y Contabilización NIIF.
4.  Quita la selección de la contabilización que NO deseas afectar. Por ejemplo, si solo quieres afectar la contabilización NIIF, desmarca la casilla de Contabilización Local.

### ¿Qué sucede si no desactivo la Contabilización Local al querer afectar solo la Contabilización NIIF?
#### Respuesta
Si no desactivas la Contabilización Local, la operación afectará ambas contabilizaciones (Local y NIIF), ya que por defecto, la operación se abre con la opción "Contabilización según la configuración" activa, especialmente en años de transición.

### ¿Dónde se encuentra la opción de operación de movimiento contable dentro de ContaPyme?
#### Respuesta
Para acceder a la operación de movimiento contable, sigue estos pasos:
1.  Ve a la pestaña **Básico**.
2.  Abre el **Manejador de Operaciones**.
3.  Haz clic en el botón **Más Operaciones**.
4.  En el menú que se abre, selecciona **Contabilidad** y luego **Operación de Movimiento Contable**.

### ¿Cómo se sustenta la operación con un comprobante de causación de egreso?
#### Respuesta
Dentro de la operación de movimiento contable, sigue estos pasos:
1. Abre el seleccionador del campo **Comprobante**.
2. Busca y selecciona el comprobante de **Causación de Egreso**.

### ¿Cómo se calculan automáticamente los impuestos y retenciones en la operación?
#### Respuesta
Después de ingresar los datos necesarios en la operación de movimiento contable, da clic en el botón **Calcular Impuestos**. El sistema calculará automáticamente los impuestos y retenciones correspondientes.

### ¿Dónde puedo ver el tipo de movimiento contable que ha realizado la operación (local o NIIF)?
#### Respuesta
Una vez guardada la operación, sigue estos pasos:
1.  Da clic en el botón del **Inspector de Datos**.
2.  Luego, da clic en el botón **Cargar**.
3.  El sistema te ubicará en el botón que representa los movimientos de la contabilización local.
4.  Para ver la información de la contabilización NIIF, da clic en el botón correspondiente.
5.  Si quieres ver el movimiento contable detallado, da clic en el botón **Ver Movimiento Contable**.

### ¿Cómo ingreso el detalle de la operación para que sea visible en el manejador de operaciones?
#### Respuesta
En la operación de movimiento contable, escribe la descripción del detalle en el campo **Detalle de la operación**. Este detalle será visible en el manejador de operaciones.

---

# Software contable ContaPyme - Operación de movimiento contable
[Ver el video](https://www.youtube.com/watch?v=59IlmmATE_c)
Operación de movimiento contable

## Tema principal
Registrar un movimiento contable en moneda extranjera dentro de ContaPyme.

## Resumen general
El video explica cómo registrar una operación de movimiento contable en moneda extranjera utilizando ContaPyme. Muestra cómo seleccionar la moneda extranjera, ingresar los valores correspondientes, y cómo el sistema realiza la conversión a la moneda local utilizando la tasa de cambio registrada. También explica cómo la cuenta configurada para manejar moneda extranjera se ajusta con los ajustes por diferencia de cambio. Finalmente, muestra cómo se visualiza el comprobante en la moneda extranjera a pesar de que en la contabilidad se registra en la moneda local.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la operación de movimiento contable en ContaPyme?
#### Respuesta
La operación de movimiento contable en ContaPyme permite realizar imputaciones directas a las cuentas, realizar cruces, abonos y pagos, entre otras acciones.

### ¿Cómo se accede a la operación de movimiento contable en ContaPyme?
#### Respuesta
Para acceder a la operación de movimiento contable, debes estar en el manejador de operaciones y seguir esta ruta:
1.  **Más Operaciones**
2.  **Contabilidad**
3.  **Movimiento Contable**

### ¿Qué información se necesita para registrar un movimiento contable en moneda extranjera?
#### Respuesta
Se necesita:
1.  El documento de soporte de la transacción (ej. comprobante de egreso).
2.  El detalle de la transacción (ej. pago asistencia técnica).
3.  La fecha de la transacción.
4.  La moneda extranjera en la que se realiza la transacción.
5.  La cuenta contable a debitar.
6.  El centro de costos (si aplica).
7.  El valor en moneda extranjera.
8.  El tercero o empresa involucrada.
9.  La cuenta contable a acreditar.
10. La fecha de pago (si aplica).
11. La referencia (ej. número del documento de soporte).

### ¿Cómo se selecciona la moneda extranjera en la operación de movimiento contable?
#### Respuesta
En la esquina superior derecha de la pantalla de la operación de movimiento contable, encontrarás la opción para seleccionar la moneda que se usará para el registro de los valores de esta operación. Selecciona la moneda deseada del catálogo de monedas.

### ¿Cómo se ingresa el valor en moneda extranjera?
#### Respuesta
Después de seleccionar la cuenta contable y el centro de costos (si aplica), debes ingresar el valor en la moneda extranjera seleccionada. El sistema mostrará el símbolo de la moneda.

### ¿Cómo se copia la información del tercero de la fila superior en el asistente de movimiento contable?
#### Respuesta
Para copiar el dato del tercero del renglón superior, presiona las teclas **Control + A**.

### ¿Qué significa el campo "Valor en otra moneda" en el asistente de la operación de movimiento contable?
#### Respuesta
El campo "Valor en otra moneda" muestra el equivalente del valor ingresado en la moneda extranjera, calculado por el sistema.

### ¿Qué significa que una cuenta esté configurada para manejar moneda extranjera?
#### Respuesta
Significa que el saldo de esa cuenta se ajustará automáticamente cuando se realicen los ajustes por diferencia en cambio.

### ¿Cómo se guarda y procesa la operación de movimiento contable?
#### Respuesta
Una vez que hayas ingresado toda la información, verifica que la opción de "Autoprocesar" esté activa y luego haz clic en "Aceptar" para guardar y procesar la operación.

### ¿Cómo se calcula el valor en moneda local en la operación de movimiento contable?
#### Respuesta
El sistema convierte el valor en moneda extranjera a moneda local utilizando la tasa de cambio registrada en la última operación de registro de tasas de cambio.

### ¿Cómo se visualiza el comprobante de egreso generado por la operación de movimiento contable en moneda extranjera?
#### Respuesta
Al imprimir el soporte de la operación (ej. comprobante de egreso), este se mostrará en la moneda extranjera, aunque en la contabilidad se haya registrado en la moneda local.

---

# Software contable ContaPyme - Operación de registro de tasas de cambio (Tasa de cambio gral)
[Ver el video](https://www.youtube.com/watch?v=WLrRFmTb1uc)

## Tema principal
Registro de tasas de cambio general en ContaPyme.

## Resumen general
Este video explica cómo registrar las tasas de cambio general en el software ContaPyme.  Muestra cómo acceder a la operación de registro de tasas de cambio, entender el encabezado y el cuerpo de la operación, y cómo el sistema recuerda las últimas tasas registradas. También explica la importancia de la regularidad en el registro de tasas de cambio, dependiendo de si está activa la opción de registrar la tasa diariamente.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la operación de registro de tasas de cambio en ContaPyme?
#### Respuesta
La operación de registro de tasas de cambio es una función en ContaPyme que permite indicar la respectiva tasa de cambio para cada moneda extranjera, lo cual es esencial para el manejo de moneda extranjera en el sistema. Esta operación es necesaria independientemente de si se utiliza la opción de tasa de cambio general o la de tasa de compra y venta.

### ¿Cómo ingreso a la operación de registro de tasas de cambio en ContaPyme?
#### Respuesta
Para ingresar a la operación de registro de tasas de cambio, sigue estos pasos:
1. Ubícate en el **Manejador de Operaciones**.
2. Ingresa por la opción **Más Operaciones**.
3. Selecciona **Contabilidad**.
4. Selecciona **Registro de Tasas de Cambio**.

### ¿Qué información se encuentra en el encabezado de la operación de registro de tasas de cambio?
#### Respuesta
El encabezado de la operación muestra información importante sobre la transacción, como:
- El **documento** en el cual se soporta la transacción.
- El **detalle**.
- La **fecha**, que indica la fecha a la cual quedarán registradas las tasas de cambio.

### ¿Por qué no veo todas las monedas que he creado en la lista de monedas de la operación de registro de tasas de cambio?
#### Respuesta
Si no visualizas todas las monedas creadas en tu base de datos, es porque las monedas faltantes **no están configuradas a ninguna cuenta del catálogo de cuentas**.

### ¿Qué debo hacer en el cuerpo de la operación de registro de tasas de cambio?
#### Respuesta
En el cuerpo de la operación, debes indicar la **respectiva tasa de cambio por cada una de las monedas** que se encuentran listadas. Por ejemplo, la tasa de cambio del dólar, del euro y de la libra esterlina. Estos valores serán utilizados por el sistema para realizar las conversiones a moneda local y para los ajustes por diferencia en cambio.

### ¿Cómo guardo la operación de registro de tasas de cambio?
#### Respuesta
Para guardar la operación de registro de tasas de cambio, simplemente haz clic en el botón **Aceptar**. La operación quedará cargada en el sistema.

### ¿Qué pasa si registro una nueva operación de registro de tasas de cambio?
#### Respuesta
A partir de la segunda operación de registro de tasas de cambio, el sistema **recordará las últimas tasas de cambio registradas** por cada moneda. En este caso, solo necesitarás modificar aquellas tasas que hayan cambiado.

### ¿Con qué frecuencia debo crear la operación de registro de tasas de cambio?
#### Respuesta
La regularidad con la que debes crear la operación de registro de tasas de cambio depende de si tienes activa o no la opción de **registrar tasa de cambio diariamente**.
- Si está activa, debes registrar una operación de registro de tasas de cambio diariamente, o el sistema reportará errores al registrar transacciones en moneda extranjera.
- Si no está activa, el sistema buscará el último registro de tasas de cambio y trabajará con la información contenida en esa operación.

---

# Software contable ContaPyme - Operación de registro de tasas de cambio (Tasa de compra y venta)
[Ver el video](https://www.youtube.com/watch?v=A-jS2X4IDsM)

## Tema principal
Registro de tasas de cambio de compra y venta en ContaPyme.

## Resumen general
Este video explica cómo registrar las tasas de cambio de compra y venta en el software ContaPyme. Muestra cómo acceder a la operación de registro de tasas de cambio, dónde ingresar las tasas para cada moneda extranjera configurada y cómo el sistema utiliza estas tasas para la conversión a moneda local y los ajustes por diferencia en cambio. También explica cómo el sistema recuerda las últimas tasas registradas para facilitar actualizaciones futuras y remite a videos complementarios para mayor información.

## Preguntas Frecuentes (FAQ)

### ¿Cuáles son las opciones para registrar tasas de cambio en ContaPyme?
#### Respuesta
ContaPyme ofrece dos opciones para el registro de las tasas de cambio cuando se trabaja con moneda extranjera:
1.  Registrar una tasa de cambio general.
2.  Registrar una tasa de compra y una tasa de venta.

### ¿Cómo accedo a la operación de registro de tasas de cambio en ContaPyme?
#### Respuesta
Para acceder a la operación de registro de tasas de cambio, sigue estos pasos:

1.  Ubícate en el **manejador de operaciones**.
2.  Ve a **Más Operaciones > Contabilidad > Registro de tasas de cambio**.

### ¿Qué información se requiere en el encabezado de la operación de registro de tasas de cambio?
#### Respuesta
El encabezado de la operación de registro de tasas de cambio requiere la siguiente información:
*   El **documento de soporte** de la transacción.
*   El **detalle** de la transacción.
*   La **fecha** a la cual se cargarán las tasas de cambio.

### ¿Qué información se debe ingresar en el cuerpo de la operación de registro de tasas de cambio?
#### Respuesta
En el cuerpo de la operación, encontrarás un listado de las diferentes monedas configuradas a las cuentas de moneda extranjera. Por cada una de estas monedas, debes registrar la **tasa de compra** y la **tasa de venta**.

### ¿Cómo utiliza ContaPyme las tasas de compra y venta que registro?
#### Respuesta
El sistema utiliza las tasas de la siguiente manera:
*   **Tasa de Venta:** Se utiliza para la conversión de cada moneda extranjera a moneda local.
*   **Tasa de Compra y Venta:** Ambas tasas se utilizan para la realización de los ajustes por diferencia en cambio. La tasa de compra se utiliza para ajustar las cuentas del activo, y la tasa de venta para ajustar las cuentas del pasivo.

### ¿Cómo proceso la operación de registro de tasas de cambio?
#### Respuesta
Para procesar la operación, asegúrate de que la opción **Autoprocesar** esté activa y luego haz clic en el botón **Aceptar**.

### ¿Qué sucede si registro una segunda operación de registro de tasas de cambio?
#### Respuesta
Si registras una segunda operación de registro de tasas de cambio, el sistema recordará las últimas tasas registradas por cada moneda, lo que te permitirá modificar solo aquellas tasas que hayan cambiado.

### ¿Con qué frecuencia debo registrar la operación de registro de tasas de cambio?
#### Respuesta
La regularidad con la que debes crear esta operación depende de si tienes configurado el registro de tasas de cambio diariamente. Para mayor información sobre este tema, consulta el video ¿Cuándo se registra la tasa de cambio de cada moneda?

---

# Software contable ContaPyme - Otros informes
[Ver el video](https://www.youtube.com/watch?v=zvbIoAh96N4)
zvbIoAh96N4

## Tema principal
Visualización y generación de informes contables adicionales en ContaPyme.

## Resumen general
Este video muestra la variedad de informes que ContaPyme ofrece, más allá de los estados financieros básicos y libros legales. Explica cómo acceder a estos informes, incluyendo el libro diario oficial, el saldo de cuentas (por tercero y por cuenta), el movimiento contable generado por las operaciones y el control de documentos. Se detalla cómo configurar y generar cada informe, especificando datos como fechas, rangos de cuentas, terceros y tipos de contabilización.

## Preguntas Frecuentes (FAQ)

### ¿Qué tipo de informes adicionales ofrece ContaPyme además de los estados financieros básicos?
#### Respuesta
ContaPyme ofrece varios informes adicionales, incluyendo el libro diario oficial, el saldo de cuentas, el movimiento contable generado por las operaciones y el control de numeración de documentos.

### ¿Dónde puedo encontrar los informes adicionales en ContaPyme?
#### Respuesta
Los informes adicionales se encuentran en la pestaña **Contabilidad**. Dentro de esta pestaña, encontrarás los botones **Libros Legales**, **Otros Reportes Contables** y **Control de Documentos**.

### ¿Cómo puedo generar el libro diario oficial en ContaPyme?
#### Respuesta
Para generar el libro diario oficial, sigue estos pasos:
1.  Ve a la pestaña **Contabilidad**.
2.  Haz clic en el botón **Libros Legales**.
3.  Dentro de la pestaña "Otros", selecciona **Libro Diario Oficial**.
4.  En la ventana que aparece, indica la **fecha inicial**, la **fecha final**, el **rango de cuentas**, el **tercero**, el **centro de costos** y otros datos requeridos.
5.  Especifica el **tipo de contabilización** a utilizar (ej. local).
6.  Haz clic en el botón **Ver Reporte**.

### ¿Cómo puedo generar el informe de Saldo de Cuentas en ContaPyme?
#### Respuesta
Para generar el informe de Saldo de Cuentas, sigue estos pasos:
1.  Ve a la pestaña **Contabilidad**.
2.  Haz clic en el botón **Otros Reportes Contables**.
3.  Selecciona **Saldos de Cuentas**.
4.  Elige entre las dos presentaciones: **Saldo de cuenta por tercero** o **Saldo de tercero por cuenta**.
5.  En la ventana que se abre, indica la **fecha inicial**, la **fecha final**, especifica un **tercero**, un **rango de cuentas**, entre otros datos.
6.  Indica el **tipo de contabilización** a utilizar (ej. NIIF).
7.  Haz clic en el botón **Ver Reporte**.

### ¿Qué diferencia hay entre el informe de "Saldo de cuenta por tercero" y "Saldo de tercero por cuenta"?
#### Respuesta
*   **Saldo de cuenta por tercero:** Muestra, para cada tercero, el saldo de cada cuenta con la que tiene algún tipo de movimiento.
*   **Saldo de tercero por cuenta:** Muestra, para cada cuenta, los datos de los terceros con los cuales tiene algún tipo de saldo.

### ¿Cómo puedo generar el informe de Movimiento Contable Generado Por Las Operaciones?
#### Respuesta
Para generar este informe, sigue estos pasos:
1.  Ve a la pestaña **Contabilidad**.
2.  Haz clic en el botón **Otros Reportes Contables**.
3.  Selecciona **Movimiento Contable**.
4.  En la ventana que aparece, indica la **fecha inicial**, la **fecha final**, el **tercero**, el **rango de cuentas**, entre otros datos.
5.  Indica el **tipo de contabilización** a utilizar (ej. local).
6.  Haz clic en el botón **Ver Reporte**.

### ¿Qué información muestra el informe de Movimiento Contable Generado Por Las Operaciones?
#### Respuesta
Este informe muestra el movimiento contable de cada operación realizada durante un periodo determinado, incluyendo el número de documento y el detalle de las cuentas consignadas en cada operación.

### ¿Cómo puedo generar los reportes de documentos en ContaPyme?
#### Respuesta
Para generar los reportes de documentos, sigue estos pasos:
1.  Ve a la pestaña **Contabilidad**.
2.  Haz clic en el botón **Control de Documentos**.
3.  Selecciona el tipo de reporte de documento que deseas generar.
4.  En la ventana de diálogo, selecciona la **fecha inicial** y la **fecha final**.
5.  Opcionalmente, selecciona un **tercero específico**.
6.  Haz clic en el botón **Más Opciones** para indicar el **tipo de documento de soporte** (ej. factura de venta) y el **tipo de agrupación** para generar el informe.
7.  Haz clic en el botón **Ver Reporte**.

### ¿Qué tipo de información puedo encontrar en los reportes de documentos?
#### Respuesta
En los reportes de documentos, puedes encontrar los números de documento, la fecha del documento de soporte, el tercero con su código y nombre, el valor bruto, los impuestos y el valor total.

---

# Software contable ContaPyme - Permitir modificar valores en moneda extranjera
[Ver el video](https://www.youtube.com/watch?v=uCXlyY9C94s)
uCXlyY9C94s

## Tema principal
Permitir la edición manual del valor en moneda extranjera calculado automáticamente en las transacciones.

## Resumen general
Este video explica cómo activar la opción en ContaPyme para permitir la modificación manual del valor en moneda extranjera que el sistema calcula automáticamente al registrar transacciones. Por defecto, este valor no es editable, ya que se calcula dividiendo el valor en moneda local entre la tasa de cambio registrada. El video muestra, mediante ejemplos prácticos, cómo habilitar esta funcionalidad para poder ajustar el valor en moneda extranjera según sea necesario.

## Preguntas Frecuentes (FAQ)

### ¿Por qué el valor en moneda extranjera aparece en gris y no puedo modificarlo directamente en las operaciones?
#### Respuesta
Por defecto, ContaPyme calcula automáticamente el valor en moneda extranjera dividiendo el valor en moneda local entre la tasa de cambio registrada. El campo aparece en gris porque la opción que permite modificar manualmente este valor está deshabilitada en la configuración del manejo de moneda extranjera.

### ¿Cómo puedo habilitar la opción para modificar el valor en moneda extranjera calculado automáticamente por ContaPyme?
#### Respuesta
Para activar la opción de modificar el valor en moneda extranjera, sigue estos pasos:
1.  Dirígete a la configuración del manejo de moneda extranjera (la ruta exacta dentro del menú de ContaPyme no se especifica en el video).
2.  Busca la opción que dice "Permitir modificar el valor que calcula automáticamente el sistema de moneda extranjera en las operaciones".
3.  Activa esta opción.
4.  Haz clic en el botón "Aceptar" para guardar los cambios.

### ¿Cómo sé que la opción para modificar el valor en moneda extranjera se ha activado correctamente?
#### Respuesta
Después de activar la opción en la configuración, regresa a la operación donde estabas digitando la información. Ubica el campo "valor en otra moneda". Si la opción se activó correctamente, el color del campo habrá cambiado de gris a blanco, indicando que ahora es editable.

### ¿Qué tipo de cuentas deben estar configuradas para el manejo de moneda extranjera para que se muestre el valor equivalente en otra moneda?
#### Respuesta
Las cuentas que intervienen en la transacción y que están configuradas para el manejo de moneda extranjera mostrarán el valor equivalente en otra moneda. En los ejemplos del video, se mencionan cuentas de "clientes del exterior" y "proveedores del exterior" como ejemplos de cuentas que deben tener esta configuración.

### ¿Dónde puedo encontrar el campo que muestra el valor en dólares en las operaciones?
#### Respuesta
El campo que indica el valor en dólares (o la moneda extranjera configurada) se muestra en la parte final de la fila correspondiente a la cuenta en el movimiento contable o en la parte inferior, como en el caso de las formas de pago. El video no especifica la ubicación exacta dentro de cada tipo de operación, pero indica que siempre estará presente en operaciones que manejen moneda extranjera.

### ¿Qué pasa si no activo la opción para modificar el valor en moneda extranjera?
#### Respuesta
Si no activas la opción para modificar el valor en moneda extranjera, el sistema calculará automáticamente el valor en la moneda extranjera basándose en la tasa de cambio registrada, y no podrás editarlo manualmente. El campo permanecerá en color gris y no será editable.

---

# Software contable ContaPyme - Registro de tipos de movimiento bancario en las operaciones
[Ver el video](https://www.youtube.com/watch?v=8eGUQnleI2c)
Registro de tipos de movimiento bancario en las operaciones

## Tema principal
Registro y asignación de tipos de movimientos bancarios en operaciones de ContaPyme.

## Resumen general
Este video explica cómo registrar y asignar tipos de movimientos bancarios en diferentes operaciones dentro de ContaPyme, específicamente en movimientos contables, gastos y abonos a cuentas por cobrar. Se aprende que el sistema requiere la asignación del tipo de movimiento bancario correspondiente cuando se utilizan cuentas de conciliación, mostrando la obligatoriedad del campo en ciertos casos. El video guía al usuario a través de ejemplos prácticos, mostrando cómo seleccionar el tipo de movimiento adecuado y completar la información adicional requerida en cada operación.

## Preguntas Frecuentes (FAQ)

### ¿Cómo se asigna un tipo de movimiento bancario en una operación de movimiento contable en ContaPyme?
#### Respuesta
Para asignar un tipo de movimiento bancario en una operación de movimiento contable en ContaPyme, sigue estos pasos:
1.  Dirígete al **Manejador de Operaciones > Más Operaciones > Contabilidad > Movimiento Contable.**
2.  Cambia el tipo de documento de soporte (por ejemplo, a Comprobante de Egreso) usando **Shift + F1**.
3.  Ingresa el detalle de la operación (ej. Pago de arrendamiento local).
4.  En la zona de registro, selecciona la cuenta correspondiente (ej. Arrendamientos: 5120 1005).
5.  Indica el centro de costos.
6.  Ingresa el valor débito y el tercero correspondiente.
7.  Verifica los impuestos.
8.  En la forma de pago, selecciona la cuenta de banco.
9.  En el campo Tipo de Movimiento Bancario (que estará en blanco), abre el seleccionador.
10. Selecciona el tipo de movimiento bancario adecuado (ej. Cheques Girados).
11. Indica el número del cheque.
12. Haz clic en **Aceptar**.

### ¿Cómo se registra un tipo de movimiento bancario en una operación de gastos en ContaPyme?
#### Respuesta
Para registrar un tipo de movimiento bancario en una operación de gastos en ContaPyme, sigue estos pasos:
1.  Dirígete al **Manejador de Operaciones > Más Operaciones > Ingresos y Gastos > Gastos.**
2.  Deja o selecciona el tipo de documento de soporte (ej. Comprobante de Egreso).
3.  Ingresa el detalle de la operación (ej. Pago de honorarios).
4.  Selecciona el tercero respectivo usando **F3**.
5.  En la zona de registro, busca el concepto de pago (ej. 51101005).
6.  Indica el centro de costos.
7.  Ingresa el valor del gasto.
8.  Verifica los impuestos en la zona de liquidación usando el icono de la calculadora o **Control + Enter**.
9.  En la forma de pago, indica que será por banco.
10. Selecciona la cuenta de banco.
11. En el campo Tipo de Movimiento Bancario (que estará en blanco), abre el seleccionador.
12. Selecciona el tipo de movimiento bancario adecuado (ej. Transferencia y/o Retiro).
13. Indica el número de la transferencia.
14. Haz clic en **Aceptar**.

### ¿Cómo se registra un tipo de movimiento bancario en una operación de abono a cuentas por cobrar en ContaPyme?
#### Respuesta
Para registrar un tipo de movimiento bancario en una operación de abono a cuentas por cobrar en ContaPyme, sigue estos pasos:
1.  Dirígete al **Manejador de Operaciones > Más Operaciones > Cartera > Abono a Cuentas por Cobrar.**
2.  Deja o selecciona el tipo de documento de soporte (ej. Comprobante de Ingreso).
3.  Ingresa el detalle de la operación (ej. Abono de factura de venta).
4.  Selecciona el tercero respectivo.
5.  En la zona de registro, busca la cuenta a la cual se va a hacer el abono.
6.  Indica el valor abonado.
7.  Ve al paso siguiente usando **Control + Enter**.
8.  En la forma de pago, indica que será por banco.
9.  Selecciona la cuenta de banco.
10. En el campo Tipo de Movimiento Bancario (que estará en blanco), abre el seleccionador.
11. Selecciona el tipo de movimiento bancario adecuado (ej. Tarjeta de Crédito).
12. Indica el número de la transacción.
13. Haz clic en **Aceptar**.

### ¿Cuándo es obligatorio seleccionar el tipo de movimiento bancario en ContaPyme?
#### Respuesta
El campo Tipo de Movimiento Bancario es obligatorio cuando se utilizan cuentas de conciliación en las operaciones. El sistema indica que el campo es obligatorio mostrándolo en color blanco.

### ¿Qué indica el color verde en el campo de Tipo de Movimiento Bancario?
#### Respuesta
El color verde en el campo Tipo de Movimiento Bancario indica que este es un dato opcional.

---

# Software contable ContaPyme - Tabla comparativa de ejecucion presupuestal por cc
[Ver el video](https://www.youtube.com/watch?v=GBnfFM63qa4)
[Tabla comparativa de ejecución presupuestal por centros de costos.]

## Tema principal
Generación y comprensión de la tabla comparativa de ejecución presupuestal por centros de costos.

## Resumen general
Este video explica cómo generar y entender la tabla comparativa de ejecución presupuestal por centros de costos en ContaPyme. Se detalla la estructura de la tabla, que incluye el código y nombre de las cuentas presupuestales, los valores de los movimientos por cada centro de costo y el total acumulado. Además, se muestran los pasos para acceder a la tabla desde el menú y el explorador gráfico, cómo filtrar por fechas y centros de costos específicos, y cómo consultar la información detallada de las operaciones que originaron los movimientos. El video también explica cómo interpretar el resumen financiero que se presenta al final de la tabla.

## Preguntas Frecuentes (FAQ)

### ¿Qué información proporciona la tabla comparativa de ejecución presupuestal por centros de costos?
#### Respuesta
La tabla comparativa permite confrontar la ejecución del presupuesto para cada uno de los centros de costos en un período determinado. Muestra el código y nombre de las cuentas presupuestales, los valores de los movimientos para cada centro de costo y el total acumulado por cuenta.

### ¿Cómo puedo acceder a la tabla comparativa de ejecución presupuestal por centros de costos?
#### Respuesta
Hay dos maneras de acceder a la tabla comparativa:
1.  A través de la pestaña **Adicionales > Tablas comparativas > Ejecución presupuestal > Ejecución presupuestal centros de costos.**
2.  Desde el explorador gráfico de la empresa:
    *   **Clic derecho** sobre el nombre de la empresa.
    *   Seleccionar la opción **Informes.**
    *   Elegir **Tablas comparativas > Ejecución presupuestal > Ejecución presupuestal centros de costos.**

### ¿Cómo se define el periodo para el cual se genera la tabla comparativa?
#### Respuesta
Al acceder a la tabla comparativa, se abre una caja de filtro donde se debe indicar una **fecha inicial** y una **fecha final**. El informe se generará con la información correspondiente a este periodo.

### ¿Cómo puedo cambiar el periodo de la tabla comparativa sin tener que volver a generarla?
#### Respuesta
En la cinta de opciones de la tabla comparativa, se encuentra la opción **Filtro**, que muestra las fechas indicadas. Si se necesitan fechas diferentes, se pueden cambiar directamente en este filtro sin necesidad de salir de la tabla.

### ¿Cómo puedo cambiar el nivel de las cuentas que se muestran en la tabla?
#### Respuesta
En la cinta de opciones, en el recuadro **Opciones**, se encuentra la opción para cambiar el nivel de las cuentas. Por ejemplo, se puede elegir ver solo las cuentas principales (nivel 3) o las subcuentas (nivel 4).

### ¿Cómo puedo filtrar la tabla para comparar solo algunos centros de costos específicos?
#### Respuesta
1.  En la cinta de opciones, en el recuadro **Opciones**, dar clic en el botón **Columnas dinámicas.**
2.  Dar clic en el nuevo filtro de **centros de costos** que aparece.
3.  Desmarcar la opción **Mostrar todos**.
4.  Seleccionar solo los centros de costos que se desean comparar.

### ¿Cómo puedo ver la información detallada de las operaciones que dieron origen a los movimientos en un centro de costos?
#### Respuesta
Se puede dar clic en el valor de la cuenta para un centro de costos específico. Esto abrirá el explorador de presupuesto, donde se visualiza la fecha, número del documento, tercero en transacción, centro de costos y valor de cada una de las operaciones. Para ver información más detallada de una operación específica, se puede dar doble clic sobre ella para abrir el documento de soporte.

### ¿Qué información puedo encontrar en el resumen financiero que aparece en la parte inferior de la tabla?
#### Respuesta
En la parte inferior de la tabla se encuentra el resumen financiero, que muestra el total de los ingresos y egresos para cada uno de los centros de costos, el total acumulado y la utilidad del ejercicio.

---

# Software contable ContaPyme - Tabla comparativa ejecución presupuestal por años y meses
[Ver el video](https://www.youtube.com/watch?v=zCmxhJDeD_I)
Tabla comparativa de ejecución presupuestal por años y meses

## Tema principal
Generación y análisis de la tabla comparativa de ejecución presupuestal por años y meses en ContaPyme.

## Resumen general
Este video explica cómo generar y analizar la tabla comparativa de ejecución presupuestal por años y meses en ContaPyme. Aprenderás a acceder a la tabla, definir el periodo de análisis, entender su estructura (cuentas, años, acumulados), visualizar los movimientos mensuales, comparar meses específicos entre años, y examinar las operaciones que originan los movimientos presupuestales. También se explica cómo interpretar el resumen financiero que se presenta al final de la tabla.

## Preguntas Frecuentes (FAQ)

### ¿Qué información muestra la tabla comparativa de ejecución presupuestal por años y meses?
#### Respuesta
La tabla muestra el código y nombre de las cuentas configuradas como de presupuesto, los valores ejecutados para cada cuenta en cada año dentro del periodo seleccionado, y el total acumulado para cada cuenta. También incluye un resumen financiero con el total de ingresos y egresos por año, el total acumulado y la utilidad del ejercicio.

### ¿Cómo puedo acceder a la tabla comparativa de ejecución presupuestal por años y meses en ContaPyme?
#### Respuesta
Hay dos formas de acceder a la tabla:
1.  **A través del explorador gráfico de la empresa:**
    *   Ubícate en la empresa.
    *   Haz clic derecho.
    *   Selecciona **Informes**.
    *   En el listado de informes, selecciona la segunda opción de **Tablas Comparativas** correspondiente a **Ejecución Presupuestal**.
    *   Da clic en **Ejecución Presupuestal Años y Meses**.
2.  **A través de la pestaña Adicionales:**
    *   Ve a la pestaña **Adicionales**.
    *   Da clic en el botón **Tablas Comparativas**.
    *   Despliega el menú **Ejecución Presupuestal**.
    *   Selecciona **Ejecución Presupuestal Años y Meses**.

### ¿Cómo defino el periodo (fecha inicial y fecha final) para generar la tabla comparativa?
#### Respuesta
Después de acceder a la tabla comparativa, se abre una ventana donde debes indicar:
1.  **Fecha Inicial:** Ingresa el día, mes y año de inicio del periodo.
2.  **Fecha Final:** Ingresa el día, mes y año de finalización del periodo.
3.  Da clic en **Aceptar**.

### ¿Cómo puedo cambiar el nivel de detalle de las cuentas que se muestran en la tabla comparativa?
#### Respuesta
En la cinta de opciones, hay una opción para indicar el nivel deseado de las cuentas a visualizar. Puedes elegir entre mostrar solo las cuentas principales, las subcuentas o las cuentas auxiliares.

### ¿Cómo puedo ver los movimientos mensuales de cada año en la tabla comparativa?
#### Respuesta
Para ver los movimientos mensuales, da clic en el signo más (+) ubicado al lado del año que deseas verificar. Se desplegará la información de los movimientos para cada uno de los meses de ese año. Para ocultar la información, da clic en el signo menos (-).

### ¿Cómo puedo comparar el mismo mes de diferentes años en la tabla comparativa?
#### Respuesta
Para comparar el mismo mes de diferentes años:
1.  Da clic en la opción **Columnas Dinámicas**.
2.  En el filtro **Año**, selecciona los años que deseas comparar.
3.  En el filtro **Mes**, desmarca la opción **Mostrar Todos** y selecciona el mes que quieres comparar.
4.  Da clic en **OK**.
5.  Despliega los meses para cada año para verificar la información.

### ¿Cómo puedo ver las operaciones que dieron origen a los movimientos de un año en la tabla comparativa?
#### Respuesta
Da doble clic en el valor de la cuenta para el año que deseas verificar. Se abrirá un explorador de presupuesto que muestra la fecha de cada operación, el número de documento, el tercero en la transacción, el centro de costos y el valor de cada operación.

### ¿Cómo puedo ver información más detallada sobre una operación específica en el explorador de presupuesto?
#### Respuesta
Da doble clic sobre la operación en el explorador de presupuesto. El sistema abrirá el documento de soporte de esa operación.

---

# Software contable ContaPyme - Tipo contabilización local - NIIF
[Ver el video](https://www.youtube.com/watch?v=rz3GvX-dBOY)

## Tema principal
Configuración del tipo de contabilización (local y/o NIIF) por año en ContaPyme.

## Resumen general
Este video explica cómo configurar los tipos de contabilización (local y NIIF) en ContaPyme para diferentes años, basándose en los requerimientos normativos de la DIAN. Muestra cómo desprocesar operaciones de un año, habilitar la contabilización local para ese año, y luego reprocesar las operaciones para que afecten ambos tipos de contabilidad. Se aprende a ajustar la configuración según el grupo NIIF al que pertenezca la empresa y la importancia de realizar este proceso de forma oportuna.

## Preguntas Frecuentes (FAQ)

### ¿Cuál es el objetivo de marcar cada año para llevar contabilización local y/o NIIF en ContaPyme?
#### Respuesta
El objetivo es adecuar el sistema a las normativas contables vigentes, permitiendo que ContaPyme registre la información financiera tanto bajo las normas locales como bajo las NIIF, según los requerimientos de la DIAN y el grupo NIIF al que pertenezca la empresa.

### ¿Qué debo hacer antes de modificar el tipo de contabilización de un año en ContaPyme?
#### Respuesta
Antes de modificar el tipo de contabilización de un año, debes **desprocesar** las operaciones registradas en ese año. También debes verificar que no haya otros usuarios conectados trabajando en la base de datos.

### ¿Por qué es necesario desprocesar las operaciones antes de cambiar el tipo de contabilización de un año?
#### Respuesta
Es necesario desprocesar las operaciones porque, si el año no está marcado para contabilización local, el movimiento contable generado por las operaciones solo afectará la contabilización NIIF. Al desprocesar, permites que, al reprocesar, afecte ambas contabilizaciones si así lo configuras.

### ¿Cómo desproceso las operaciones de un año en ContaPyme?
#### Respuesta
Para desprocesar las operaciones de un año, sigue estos pasos:
1.  Asegúrate de estar en el **manejador de operaciones**.
2.  Verifica que la **fecha de trabajo** sea del año que deseas modificar (por ejemplo, 2016).
3.  Asegúrate de que esté **activo el filtro de año**.
4.  Da clic al botón **Desprocesar**, ubicado en la cinta de opciones.
5.  Confirma que las operaciones han quedado desprocesadas verificando que se encuentren en **color blanco** y que no tengan marcada la opción de **procesada**.

### ¿Cómo configuro un año para llevar tanto contabilización local como NIIF en ContaPyme?
#### Respuesta
Para configurar un año para llevar ambos tipos de contabilización, sigue estos pasos:
1.  Da clic en el **botón de aplicación de ContaPyme**.
2.  En la ventana que se despliega, da clic en el botón **Configuración**.
3.  En la ventana de Configuraciones generales del sistema, en el menú de la izquierda, selecciona **Configuración general de contabilidad** y luego **Tipo de contabilización local fiscal NIIF**.
4.  En la parte derecha, selecciona el **grupo NIIF** al que pertenece la empresa.
5.  En el listado de años, busca el año que deseas modificar y da clic en la casilla correspondiente al tipo de **contabilización local** para activarla.
6.  Da clic en el botón **Aceptar** para guardar la configuración.

### ¿Cómo añado un nuevo año para configurar el tipo de contabilización en ContaPyme?
#### Respuesta
Para añadir un nuevo año, después de ir a la ventana de "Tipo de contabilización local fiscal NIIF" (siguiendo los primeros 5 pasos de la pregunta anterior), da clic en el botón **Añadir dato**. Escribe el número del año (por ejemplo, 2017) y marca el tipo de contabilización a utilizar (local y/o NIIF). Finalmente, da clic en el botón **Aceptar** para guardar la configuración.

### ¿Cómo proceso nuevamente las operaciones después de haber configurado el tipo de contabilización de un año?
#### Respuesta
Después de configurar el tipo de contabilización de un año, regresa al manejador de operaciones y da clic al botón **Procesar**, ubicado en la cinta de opciones. Esto aplicará la configuración de contabilización local y/o NIIF a las operaciones del año seleccionado.

### ¿Cómo verifico que ambas contabilizaciones (local y NIIF) se están afectando después de procesar las operaciones?
#### Respuesta
Para verificarlo, selecciona una operación en el manejador de operaciones, abre el **inspector de datos** y verifica que el sistema haya cargado el movimiento contable tanto para la **contabilización local** como para la **contabilización NIIF**.

### ¿Qué consideraciones debo tener en cuenta al configurar los años según el grupo NIIF de mi empresa?
#### Respuesta
Debes tener en cuenta lo siguiente:
*   Para empresas del **grupo NIIF 1 y 3**, los años desde el **2015 al 2018** deben estar marcados para llevar la **contabilización local y NIIF**, y el año **2019** debe estar marcado solo para llevar **contabilización NIIF**.
*   Para empresas del **grupo NIIF 2**, los años del **2016 al 2019** deben estar marcados para llevar la **contabilización local y NIIF**, y el año **2020** debe estar marcado solo para llevar **contabilización NIIF**.

---

# Software contable ContaPyme - ¿Cómo habilitar el manejo de moneda extranjera?
[Ver el video](https://www.youtube.com/watch?v=iUCz6Cyk2pg)
[iUCz6Cyk2pg]

## Tema principal
Habilitar el manejo de moneda extranjera en ContaPyme.

## Resumen general
Este video explica cómo activar la funcionalidad de manejo de moneda extranjera en ContaPyme. Aprenderás a configurar las opciones necesarias dentro del catálogo de cuentas, como la moneda local, el tipo de tasa de cambio a registrar (general, compra y venta), la periodicidad del registro de la tasa de cambio, y cuándo realizar los ajustes por diferencia en cambio. También se muestra cómo verificar que la funcionalidad se ha activado correctamente al registrar una operación.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es necesario habilitar el manejo de moneda extranjera en ContaPyme?
#### Respuesta
Es necesario habilitar el manejo de moneda extranjera para poder registrar operaciones en una moneda diferente a la moneda local. Esto permite indicar la moneda en la que se registrarán los valores monetarios al momento de realizar una operación.

### ¿Dónde se encuentra la opción para habilitar el manejo de moneda extranjera?
#### Respuesta
Para habilitar el manejo de moneda extranjera, debes seguir estos pasos:

1.  Dirígete a la pestaña **Contabilidad**.
2.  Dentro del catálogo de cuentas, haz clic en la opción de **Configuración** (en la cinta de opciones).
3.  Dentro de la ventana de configuración, en **Configuraciones Generales**, busca la opción **Manejo de Moneda Extranjera**.

### ¿Cómo se elige si la configuración aplica a un solo usuario o a todos los usuarios?
#### Respuesta
Al ingresar a la configuración del catálogo de cuentas, el sistema te preguntará el alcance de la configuración.
- Si eliges **"Solo para el usuario activo"**, las configuraciones aplicarán únicamente al usuario con el que estás registrado en el sistema (por ejemplo, el usuario "admin").
- Si eliges **"Para todos los usuarios"**, las configuraciones aplicarán a todos los usuarios del sistema, incluido el usuario "admin".

### ¿Qué opciones de configuración debo establecer al habilitar el manejo de moneda extranjera?
#### Respuesta
Al habilitar el manejo de moneda extranjera, debes configurar lo siguiente:

1.  **Moneda Local:** Indicar cuál de las monedas existentes en el catálogo de monedas es la moneda local.
2.  **Tipo de Tasa de Cambio:** Elegir cómo se registrarán los movimientos de moneda extranjera:
    *   **Tasa de Cambio General:** Registrar una tasa de cambio única.
    *   **Tasa de Compra y Venta:** Registrar tasas de compra y venta separadas.
3.  **Registro Diario de la Tasa de Cambio:** Indicar si se registrará la tasa de cambio diariamente.
4.  **Ajustes por Diferencia en Cambio:** Determinar cuándo se realizarán los ajustes por diferencia en cambio:
    *   **Cada vez que realice un movimiento.**
    *   **Al registrar la operación de tasa de cambio.**
    *   Si ambas opciones están desactivadas, el ajuste se realizará como una acción de fin de mes.
5.  **Permitir Modificar el Valor Calculado:** Indicar si se permitirá modificar el valor que el sistema calcula automáticamente cuando se usan cuentas de moneda extranjera.
6.  **Empresa para el Registro de Tasas de Cambio:** Indicar la empresa en la cual se registrarán las tasas de cambio.

### ¿Cómo puedo verificar que el manejo de moneda extranjera ha sido habilitado?
#### Respuesta
La primera señal de que has habilitado el manejo de moneda extranjera es que al abrir el asistente de una operación, como la de movimiento contable, en el encabezado de la operación, en la esquina superior derecha, aparecerá activa la opción de **Moneda**. Por defecto, el sistema indicará la moneda local, pero podrás seleccionar cualquiera de las monedas configuradas en el catálogo de monedas.

### ¿Dónde configuro las diferentes monedas que voy a usar?
#### Respuesta
El video menciona que debes seleccionar la moneda local de entre las monedas existentes en el **Catálogo de Monedas**. El video no explica cómo crear o configurar el catálogo de monedas.

---

# Software contable ContaPyme - ¿Qué es la conciliación bancaria?
[Ver el video](https://www.youtube.com/watch?v=PswSsIq1iX8)

## Tema principal
Explicación del concepto de conciliación bancaria, su utilidad y ventajas dentro de ContaPyme.

## Resumen general
Este video explica qué es la conciliación bancaria, un proceso que permite comparar y conciliar los movimientos de las cuentas bancarias registrados en los extractos bancarios con los movimientos registrados en la contabilidad de ContaPyme. Se detallan las posibles diferencias entre el extracto y el registro contable, como cheques no cobrados, notas débito o crédito no registradas. Además, se resaltan las utilidades de la conciliación, como la detección de errores de digitación, faltantes o entradas de dinero no registradas. Finalmente, se explica la importancia de clasificar los movimientos bancarios para facilitar la conciliación.

## Preguntas Frecuentes (FAQ)

### ¿Qué es la conciliación bancaria?
#### Respuesta
La conciliación bancaria es una operación que permite confrontar y conciliar los movimientos de las cuentas del banco que se muestran en los extractos bancarios con los movimientos registrados en la contabilidad de ContaPyme.

### ¿Por qué es importante realizar la conciliación bancaria?
#### Respuesta
Es importante porque ayuda a confrontar, conciliar y ajustar la información de la cuenta bancaria. Adicionalmente, permite:
- Detectar errores al digitar la información contable.
- Detectar faltantes de dinero en la cuenta bancaria que aún no se han registrado en la contabilidad.
- Detectar entradas de dinero en la cuenta bancaria que no se han registrado en la contabilidad.

### ¿Cuáles son las posibles causas de diferencias entre el extracto bancario y los registros contables?
#### Respuesta
Las diferencias entre el extracto y el registro contable pueden deberse a:
- Cheques girados por la empresa que aún no han sido cobrados por el beneficiario.
- Notas débito que el banco carga a la cuenta, pero que aún no se registran en la contabilidad.
- Notas crédito que el banco abona a la cuenta, pero que aún no se registran en la contabilidad.

### ¿Cómo se deben clasificar los movimientos bancarios al registrarlos en la contabilidad?
#### Respuesta
Es de gran utilidad clasificar los movimientos bancarios al registrarlos en la contabilidad, para facilitar la comparación con los registros del extracto. Los movimientos se clasifican en:
- Movimientos de ingreso a la cuenta del banco: Por ejemplo, cheques recibidos, depósitos o consignaciones, notas débito, entre otros.
- Movimientos de retiro de la cuenta: Por ejemplo, cheques girados, transferencias o retiros, notas crédito, entre otros.

### ¿Cuál es la finalidad de la conciliación bancaria?
#### Respuesta
La finalidad de la conciliación bancaria es permitirnos comparar y ajustar el extracto bancario, verificando el saldo inicial de la cuenta, los movimientos de entrada y salida del dinero y el saldo final, para que coincidan con los registros contables, que también deben indicar: el saldo inicial, movimientos de entrada y salida de la cuenta, los ajustes a que haya lugar y un saldo final.

---

# Software contable ContaPyme - ¿Qué es un presupuesto?
[Ver el video](https://www.youtube.com/watch?v=9ol9bG2Hk74)

## Tema principal
Definición de presupuesto y ejecución presupuestal en el contexto empresarial.

## Resumen general
Este video explica qué es un presupuesto, definiéndolo como un conjunto de ingresos y gastos previstos para un periodo determinado, que permite el control de obligaciones y el establecimiento de metas. Además, se abordan los objetivos y ventajas de realizar un presupuesto, como la planeación de actividades y la medición de resultados. Finalmente, se define la ejecución presupuestal como la puesta en marcha de las actividades necesarias para cumplir con el presupuesto programado.

## Preguntas Frecuentes (FAQ)

### ¿Qué es un presupuesto?
#### Respuesta
Un presupuesto es el conjunto de los ingresos y gastos previstos en una empresa para un determinado periodo de tiempo. Permite establecer un control sobre las obligaciones financieras y brinda la posibilidad de fijar metas.

### ¿Cuál es la principal función de un presupuesto?
#### Respuesta
La principal función del presupuesto se relaciona con el control financiero de la empresa.

### ¿Qué es el control del presupuesto?
#### Respuesta
El control del presupuesto es el proceso de descubrir qué se está haciendo, comparando los resultados con los datos presupuestados, para verificar los logros o remediar las diferencias.

### ¿Cuáles son los objetivos de realizar un presupuesto?
#### Respuesta
La realización de un presupuesto tiene como objetivos:
- Planear todas las actividades que la empresa debe desarrollar en un periodo determinado.
- Medir los resultados cuantitativos y cualitativos.
- Fijar responsabilidades en las diferentes áreas de la empresa para lograr el cumplimiento de las metas previstas.

### ¿Cuáles son las ventajas de realizar un presupuesto?
#### Respuesta
Realizar un buen presupuesto permite:
- Tener el control sobre los gastos y egresos de la compañía.
- Establecer metas.
- Facilitar la utilización adecuada de los recursos.

### ¿Qué es la ejecución presupuestal?
#### Respuesta
Ejecución presupuestal es poner en marcha todas las actividades necesarias para cumplir con el presupuesto programado en la compañía para determinado periodo de tiempo.

---

# Software de contabilidad ContaPyme - Catálogo de monedas
[Ver el video](https://www.youtube.com/watch?v=7yWEOyhG8G0)
7yWEOyhG8G0

## Tema principal
Administración y funcionalidades del catálogo de monedas en ContaPyme.

## Resumen general
Este video explica qué es el catálogo de monedas en ContaPyme y cómo acceder a él. Describe su función como un listado donde se almacenan las monedas utilizadas para las transacciones e informes financieros de la empresa. El video muestra las opciones para crear, modificar, visualizar y eliminar monedas, así como las opciones de filtrado, agrupación y búsqueda dentro del catálogo.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el catálogo de monedas en ContaPyme?
#### Respuesta
Es un listado donde se almacenan todas las monedas que la empresa utilizará para registrar sus transacciones diarias y generar sus informes financieros.

### ¿Para qué sirve el catálogo de monedas?
#### Respuesta
Principalmente permite la creación y configuración de nuevas monedas, así como la modificación, visualización, recodificación y eliminación de las monedas existentes.

### ¿Cómo se accede al catálogo de monedas en ContaPyme?
#### Respuesta
Para ingresar al catálogo de monedas, sigue estos pasos:

1. Ve a la pestaña **Contabilidad**.
2. Dentro de Contabilidad, selecciona **Plan de Cuentas**.
3. Elige la opción **Monedas**.

### ¿Qué monedas vienen creadas por defecto en el sistema?
#### Respuesta
El sistema incluye por defecto tres tipos de monedas: el peso, el dólar y el euro.

### ¿Dónde se encuentran las acciones que se pueden realizar sobre las monedas en el catálogo?
#### Respuesta
Las acciones sobre las monedas se pueden encontrar de dos maneras:

*   Haciendo clic derecho sobre cualquier parte del catálogo.
*   En la cinta de opciones del catálogo de monedas.

### ¿Qué acciones de organización puedo realizar dentro del catálogo de monedas?
#### Respuesta
Dentro del catálogo de monedas puedes filtrar, agrupar y realizar búsquedas de alguna moneda en particular.

---

# Software de contabilidad ContaPyme - Consulta de inventario y balances
[Ver el video](https://www.youtube.com/watch?v=wI6cmMRs3uI)
Consulta de Inventario y Balances

## Tema principal
Generar y comprender el informe de Inventario y Balance en ContaPyme.

## Resumen general
Este video explica cómo generar el informe de Inventario y Balance en ContaPyme, un reporte crucial para conocer la situación patrimonial de la empresa. Se muestra cómo acceder al informe, configurar la fecha y entender la información presentada, incluyendo el detalle de activos, pasivos, patrimonio, la ecuación patrimonial y la utilidad del ejercicio. Este informe refleja los bienes, derechos y obligaciones de la empresa y se genera al menos una vez al año.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de Inventario y Balance?
#### Respuesta
El informe de Inventario y Balance es un documento que muestra de forma clara y completa la situación del patrimonio de la empresa, reflejando sus activos, pasivos y patrimonio.

### ¿Con qué frecuencia se debe generar el informe de Inventario y Balance?
#### Respuesta
El informe de Inventario y Balance se puede generar en cualquier momento, pero se recomienda generarlo al menos una vez al año.

### ¿Qué cuentas se reflejan en el informe de Inventario y Balance?
#### Respuesta
En el informe de Inventario y Balance se reflejan las cuentas de activo, pasivo y patrimonio de la empresa.

### ¿Cómo genero el informe de Inventario y Balance en ContaPyme?
#### Respuesta
Para generar el informe de Inventario y Balance, siga estos pasos:
1.  Diríjase a la pestaña **Contabilidad**.
2.  En el grupo de informes, seleccione la opción **Libros Legales**.
3.  Seleccione la opción **Inventario y Balance**.
4.  Elija la presentación deseada para el informe.
5.  Especifique la fecha hasta la cual desea consultar los saldos del informe.
6.  Haga clic en el botón **Ver Reporte**.

### ¿Qué información se muestra en el informe de Inventario y Balance?
#### Respuesta
El informe de Inventario y Balance muestra:
*   La información de la empresa.
*   El nombre del informe (Inventario y Balance).
*   La fecha hasta la cual se consultan los saldos.
*   Una columna de **Cuenta** con el código de cada cuenta.
*   Una columna de **Descripción** con el nombre de la cuenta.
*   Una columna de **Saldo** con el saldo final hasta la fecha especificada.
*   Un listado de insumos y activos fijos con su código, descripción, cantidad, precio y total.
*   Los saldos totalizados del activo, pasivo y patrimonio.
*   La suma del pasivo y el patrimonio.
*   La utilidad del ejercicio.

### ¿Qué puedo ver en el listado de insumos y activos fijos dentro del informe de inventario y balance?
#### Respuesta
En el listado de insumos y activos fijos se visualiza el código del producto, la descripción, la cantidad, el precio y el total.

### ¿Qué información puedo verificar al final del informe?
#### Respuesta
Al final del informe puede verificar:
*   Los saldos totalizados del activo, pasivo y patrimonio.
*   La suma del pasivo y el patrimonio para verificar que se cumpla la ecuación patrimonial.
*   La utilidad del ejercicio.

---

# Software de contabilidad ContaPyme - Informe Caja Diario
[Ver el video](https://www.youtube.com/watch?v=bJhNHufTVCU)
Informe Caja Diario

## Tema principal
Generación e interpretación del informe de Caja Diario en ContaPyme.

## Resumen general
Este video explica cómo generar y entender el informe de Caja Diario en ContaPyme. El informe permite consultar los movimientos registrados en las cuentas de caja, generados por ventas, abonos, compras, comprobantes de ingreso y egreso, entre otros. Se explica cómo acceder al informe, seleccionar las fechas y cuentas a consultar, y las opciones de visualización. Se muestran las dos presentaciones del informe: "Caja Diario Cuenta Documento" y "Caja Diario Documento Cuenta", explicando las diferencias en la forma en que se agrupan los datos.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de Caja Diario en ContaPyme?
#### Respuesta
El informe de Caja Diario permite consultar todos los movimientos registrados en las cuentas de caja, originados por operaciones de ventas, abonos, compras, comprobantes de ingreso, comprobantes de egreso y otros documentos.

### ¿Con qué frecuencia se puede generar el informe de Caja Diario?
#### Respuesta
La periodicidad para generar este informe es mensual.

### ¿Cómo accedo al informe de Caja Diario en ContaPyme?
#### Respuesta
Para acceder al informe, siga estos pasos:
1. Vaya a la pestaña **Contabilidad**.
2. Seleccione **Libros Legales**.
3. Haga clic en **Caja Diario**.

### ¿Cuáles son las dos presentaciones disponibles para el informe de Caja Diario?
#### Respuesta
Las dos presentaciones disponibles son:
*   Caja Diario Cuenta Documento
*   Caja Diario Documento Cuenta

### ¿Qué opciones tengo al consultar el informe de Caja Diario?
#### Respuesta
Al consultar el informe, tiene las siguientes opciones:
*   Indicar una fecha inicial y una fecha final para el rango de fechas a consultar.
*   Seleccionar una cuenta "Desde" y una cuenta "Hasta" para consultar varias cuentas de caja en el mismo informe.
*   Seleccionar un tipo de documento específico para filtrar la consulta.
*   Aplicar filtros para generar el informe de una manera más detallada.
*   Adicionar una tabla de resumen del movimiento de las cuentas.
*   Incluir un espacio para las firmas.
*   Visualizar el encabezado, la fecha y hora en la página.
*   Imprimir en calidad de borrador.
*   Diseño personalizado para ser impreso desde una impresora de matriz de punto.

### ¿Cómo selecciono las fechas para el informe de Caja Diario?
#### Respuesta
Dentro de las opciones del informe, encontrará campos para indicar la fecha inicial y la fecha final del período que desea consultar.  Simplemente ingrese las fechas en los campos correspondientes.

### ¿Cómo consulto los movimientos de una cuenta de caja específica en el informe?
#### Respuesta
Para consultar una cuenta específica, utilice el botón de búsqueda al lado del campo "Cuenta Desde" y seleccione la cuenta deseada. El sistema automáticamente indicará la misma cuenta en la opción "Cuenta Hasta".

### ¿Puedo consultar los movimientos de varias cuentas de caja en el mismo informe?
#### Respuesta
Sí, puede consultar los movimientos de un rango de cuentas seleccionando la cuenta inicial en el campo "Cuenta Desde" y la cuenta final en el campo "Cuenta Hasta".

### ¿Cómo puedo filtrar el informe por un tipo de documento específico?
#### Respuesta
Puede filtrar el informe por un tipo de documento específico utilizando el botón de búsqueda en la opción de tipo de documento y seleccionando el documento deseado (por ejemplo, comprobantes de ajustes, comprobantes de egreso, facturas, etc.).

### ¿Dónde puedo encontrar más información sobre los filtros en los informes?
#### Respuesta
Para obtener más información sobre los filtros en los informes, consulte el video "Filtro personalizado de consultas e informes" ubicado en el capítulo "Informes".

### ¿Qué significa la opción "Calidad de borrador" al generar el informe?
#### Respuesta
Al activar la opción "Calidad de borrador", el sistema genera el informe en un diseño más sencillo, personalizado para impresoras de matriz de punto. Este diseño no incluye el nombre de la empresa, el NIT ni el teléfono.

### ¿Cuál es la diferencia entre el informe "Caja Diario Cuenta Documento" y "Caja Diario Documento Cuenta"?
#### Respuesta
La diferencia principal radica en cómo se agrupan los datos:
*   **Caja Diario Cuenta Documento:** Agrupa los movimientos por la cuenta de caja y luego por el tipo de documento.
*   **Caja Diario Documento Cuenta:** Agrupa los movimientos por el tipo de documento y luego por la cuenta de caja.

### ¿Qué información muestra el informe "Caja Diario Cuenta Documento"?
#### Respuesta
Este informe muestra los movimientos débito y crédito por cada tipo de documento, totalizándolos e indicando los saldos de la cuenta. El informe agrupa primero los movimientos de la cuenta caja general y luego los tipos de documentos donde se ingresaron los registros.

### ¿Qué información muestra el informe "Caja Diario Documento Cuenta"?
#### Respuesta
Este informe agrupa cada uno de los movimientos de la cuenta caja general por el tipo del documento de soporte dado en las operaciones e igualmente, el saldo débito y crédito por cada uno de los documentos.

---

# Software de contabilidad ContaPyme - Saldos de cuentas por terceros
[Ver el video](https://www.youtube.com/watch?v=aOMs-nXSrVQ)
aOMs-nXSrVQ

## Tema principal
Consultar el saldo de las cuentas por cada tercero en un rango de fechas específico.

## Resumen general
Este video explica cómo generar un informe en ContaPyme que muestra los saldos de las cuentas por cada tercero en un rango de fechas determinado. Aprenderás a acceder al informe, configurar las opciones de fecha y tercero, y a interpretar la información que se muestra en el reporte, incluyendo el saldo anterior, los movimientos débito y crédito y el saldo actual. Se explica cómo generar el informe para todos los terceros o para un tercero específico y una cuenta específica.

## Preguntas Frecuentes (FAQ)

### ¿Qué es el informe de saldos de cuentas por terceros?
#### Respuesta
Es un informe que permite visualizar el saldo de cada cuenta por cada tercero en un rango de fechas determinado.

### ¿Cómo accedo al informe de saldos de cuentas por terceros en ContaPyme?
#### Respuesta
Sigue estos pasos:
1.  Ve a la pestaña **Contabilidad**.
2.  Selecciona la opción **Otros reportes contables**.
3.  Elige **Saldos de cuentas**.
4.  Haz clic en **Saldos de cuentas por tercero**.

### ¿Qué opciones de configuración puedo encontrar al generar el informe?
#### Respuesta
Al generar el informe, puedes configurar:
-   El rango de fechas para la consulta.
-   Si el informe debe incluir todos los terceros o un rango de terceros específico.
-   Si el informe debe incluir todas las cuentas o una cuenta específica.

### ¿Qué información se muestra en el informe de saldos de cuentas por terceros?
#### Respuesta
El informe muestra la siguiente información:
-   El tercero y su código.
-   El código de la cuenta que se está moviendo.
-   El nombre de la cuenta (detalle).
-   El saldo anterior.
-   Los movimientos débito.
-   Los movimientos crédito.
-   El saldo actual.

### ¿Cómo genero el informe incluyendo todos los terceros en un rango de fechas específico?
#### Respuesta
Sigue estos pasos:
1.  Accede al informe de saldos de cuentas por terceros (Contabilidad > Otros reportes contables > Saldos de cuentas > Saldos de cuentas por tercero).
2.  Indica el rango de fechas deseado (por ejemplo, del primero de enero del 2011 al 30 de junio del 2011).
3.  No selecciones ningún tercero específico.
4.  Haz clic en **Ver reporte**.

### ¿Cómo genero el informe para un tercero y una cuenta específicos en un rango de fechas específico?
#### Respuesta
Sigue estos pasos:
1.  Accede al informe de saldos de cuentas por terceros (Contabilidad > Otros reportes contables > Saldos de cuentas > Saldos de cuentas por tercero).
2.  Indica el rango de fechas deseado (por ejemplo, del primero de enero del 2011 al 30 de junio del 2011).
3.  Selecciona el tercero específico.
4.  Selecciona la cuenta específica.
5.  Haz clic en **Ver reporte**.

---

# Software de contabilidad ContaPyme - ¿Cuándo se registra la tasa de cambio?
[Ver el video](https://www.youtube.com/watch?v=KpnqMcTzzUU)

## Tema principal
Registro y uso de la tasa de cambio en ContaPyme para el manejo de moneda extranjera.

## Resumen general
Este video explica cómo y cuándo se debe registrar la tasa de cambio en ContaPyme para realizar correctamente las conversiones de moneda extranjera a moneda local. Se detallan dos opciones principales: el registro diario, que es la opción por defecto y más recomendada debido a la variación constante de las tasas, y el registro periódico, que requiere al menos un registro y utiliza la tasa más reciente para las conversiones.  Además, se menciona la importancia de registrar las tasas de cambio para los ajustes por variación en la tasa de cambio.

## Preguntas Frecuentes (FAQ)

### ¿Por qué es importante registrar la tasa de cambio en ContaPyme?
#### Respuesta
Es importante registrar la tasa de cambio para que el sistema pueda realizar la conversión de moneda extranjera a moneda local al momento de registrar una transacción en moneda extranjera. Esto permite tener el valor correcto en la moneda local. Además, es fundamental para realizar los ajustes por variación en la tasa de cambio.

### ¿Qué es la tasa de cambio?
#### Respuesta
La tasa de cambio es el valor de cada divisa o moneda extranjera expresada en unidades de moneda nacional. Es decir, cuánto vale una unidad de moneda extranjera en términos de la moneda local.

### ¿Qué ocurre si no se registra la tasa de cambio para la fecha de una operación en moneda extranjera?
#### Respuesta
Si no se ha registrado la tasa de cambio para la fecha de la operación, el sistema generará un error y no permitirá grabar la operación.

### ¿Cuál es la opción de registro de tasa de cambio que viene por defecto en ContaPyme?
#### Respuesta
La opción por defecto es el registro diario de tasas de cambio.

### ¿Cómo funciona la opción de registro diario de tasas de cambio?
#### Respuesta
Con esta opción, diariamente debes indicar la tasa de cambio para cada una de las monedas extranjeras que estés utilizando. Cuando el sistema realice una transacción, evaluará la fecha de la operación y buscará el registro de tasas de cambio para esa fecha. Con base en esas tasas de cambio, realizará las conversiones de moneda extranjera a moneda local.

### ¿Cuál es la principal ventaja del registro diario de tasas de cambio?
#### Respuesta
La principal ventaja es que, debido a la variación constante de las tasas de cambio, el sistema utiliza la tasa más actualizada para realizar las conversiones.

### ¿Cómo se activa la segunda opción de registro de tasa de cambio, que no requiere el registro diario?
#### Respuesta
Para activar esta opción, debes deshabilitar el registro diario de la tasa de cambio en la configuración del plan de cuentas. La ruta exacta dentro de ContaPyme para realizar esta configuración es: **Configuración del plan de cuentas**.

### ¿Cómo funciona la segunda opción de registro de tasa de cambio (no diario)?
#### Respuesta
Cuando se realiza una operación en moneda extranjera, el sistema evalúa la fecha de la operación y busca en el registro de tasas de cambio la tasa más reciente a la fecha de la operación. Toma entonces estas tasas de cambio como base para realizar las conversiones de moneda extranjera a moneda local.

### ¿Cuál es la desventaja de la segunda opción de registro de tasa de cambio?
#### Respuesta
La principal desventaja es que las conversiones se realizan con tasas de cambio desactualizadas, ya que no se registran diariamente.

### Si se utiliza la segunda opción de registro de tasa de cambio, ¿con qué frecuencia se recomienda registrar las tasas de cambio?
#### Respuesta
Se recomienda registrar las tasas de cambio como mínimo una vez a la semana.

### ¿De qué depende la elección entre las dos opciones de registro de tasa de cambio?
#### Respuesta
La elección depende directamente de las necesidades y requerimientos de la empresa.

### ¿Para qué más sirve el registro de las tasas de cambio, además de la conversión de moneda extranjera a moneda local?
#### Respuesta
El registro de las tasas de cambio también es necesario para realizar los ajustes por variación en la tasa de cambio. Para mayor información acerca de este tema, consulta los videos del capítulo Ajustes por diferencia en cambio.
